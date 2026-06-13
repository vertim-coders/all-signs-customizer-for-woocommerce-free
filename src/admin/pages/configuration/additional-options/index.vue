<template>
  <section class="ascwo-inputs">
    <template v-if="!news">
      <header class="ascwo-inputs-card ascwo-inputs-hero">
        <div>
          <h1>Inputs</h1>
          <p>Manage standalone customer inputs using the NCPC-style input builder.</p>
        </div>
        <button type="button" class="ascwo-inputs-primary" @click="newAdditionalOptions">
          <PlusIcon :size="15" />
          Add input
        </button>
      </header>

      <div class="ascwo-inputs-card ascwo-inputs-table-card">
        <table class="ascwo-inputs-table">
          <thead>
            <tr>
              <th>Label</th>
              <th>Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody ref="additionalsListTable">
            <tr v-if="isFetching">
              <td colspan="3" class="ascwo-inputs-empty ascwo-table-loader-cell">
                <Loader2Icon class="ascwo-table-loader-icon ascwo-w-7 ascwo-h-7" />
              </td>
            </tr>
            <tr v-else-if="additionals.length === 0">
              <td colspan="3" class="ascwo-inputs-empty">{{ noAdditionalsOptionsFound || 'No inputs found' }}</td>
            </tr>
            <tr v-for="(item, key) in additionals" v-else :key="key" :data-id="key">
              <td>
                <strong>{{ item.label || 'Untitled input' }}</strong>
                <p>{{ inputDescription(item) }}</p>
              </td>
              <td>
                <span class="ascwo-inputs-pill">{{ typeLabel(item.type) }}</span>
              </td>
              <td>
                <div class="ascwo-inputs-actions">
                  <button type="button" class="ascwo-inputs-secondary" @click="selectAdditionalOptions(item, key)">
                    <PencilIcon :size="14" />
                    Edit
                  </button>
                  <button type="button" class="ascwo-inputs-danger" @click="selectAdditionalOptions(item, key, true)">
                    <Trash2Icon :size="14" />
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div v-if="additionals.length > 1 && sortChanged" class="ascwo-inputs-sort">
          <button type="button" class="ascwo-inputs-primary" :disabled="isLoading" @click="updateSortOptions">
            {{ isLoading ? 'Saving...' : 'Save sort' }}
          </button>
        </div>
      </div>
    </template>

    <template v-else>
      <header class="ascwo-inputs-card ascwo-inputs-simple-head">
        <div>
          <h1>{{ edit ? 'Edit additional option' : 'Create new additional option' }}</h1>
        </div>
      </header>

      <section class="ascwo-inputs-card ascwo-inputs-types">
        <h2>1- Choose an Input Type</h2>
        <p>This text will display above the input options.</p>
        <div class="ascwo-inputs-type-grid">
          <button v-for="inputType in inputTypes" :key="inputType.value" type="button" :class="['ascwo-inputs-type', type === inputType.value ? 'is-active' : '']" @click="type = inputType.value">
            <component :is="inputType.icon" :size="22" />
            <span>{{ inputType.label }}</span>
          </button>
        </div>
      </section>

      <YesOrNo v-if="type === 'yes/no'" :action="edit" :data="additionals[additionalOptionId] ?? null" :id="additionalOptionId" :change-action="changeAction" :change-open="newAdditionnal" :change-additionals="changeAdditionals"/>
      <InputImage v-if="type === 'image-input'" :action="edit" :data="additionals[additionalOptionId] ?? null" :id="additionalOptionId" :change-action="changeAction" :change-open="newAdditionnal" :change-additionals="changeAdditionals"/>
      <DropdownType v-if="type === 'dropdown'" :action="edit" :data="additionals[additionalOptionId] ?? null" :id="additionalOptionId" :change-action="changeAction" :change-open="newAdditionnal" :change-additionals="changeAdditionals"/>
      <Note v-if="type === 'note'" :action="edit" :data="additionals[additionalOptionId] ?? null" :id="additionalOptionId" :change-action="changeAction" :change-open="newAdditionnal" :change-additionals="changeAdditionals"/>
      <IncludedType v-if="type === 'include-type'" :action="edit" :data="additionals[additionalOptionId] ?? null" :id="additionalOptionId" :change-action="changeAction" :change-open="newAdditionnal" :change-additionals="changeAdditionals"/>
    </template>

    <div v-if="openModal" class="ascwo-inputs-modal" @click.self="closeModal">
      <div class="ascwo-inputs-dialog">
        <button type="button" class="ascwo-inputs-close" @click="closeModal">x</button>
        <h2>Delete this input?</h2>
        <p>{{ additionals[additionalOptionId]?.label }}</p>
        <div class="ascwo-inputs-actions ascwo-inputs-actions-end">
          <button type="button" class="ascwo-inputs-secondary" :disabled="isLoading" @click="closeModal">Cancel</button>
          <button type="button" class="ascwo-inputs-danger-button" :disabled="isLoading" @click="deleteAdditional">
            {{ isLoading ? 'Deleting...' : 'Delete' }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import YesOrNo from './components/yes-or-no.vue';
import InputImage from './components/image-input.vue';
import DropdownType from './components/dropdown-type.vue';
import Note from './components/note.vue';
import IncludedType from './components/included-type.vue';
import api from '@/admin/Api/api';
import toastMessage from '@/admin/utils/functions';
import { CheckSquareIcon, ImageIcon, ListIcon, Loader2Icon, NotebookIcon, PackageCheckIcon, PencilIcon, PlusIcon, Trash2Icon } from 'lucide-vue-next';

const route = useRoute();
const configId = route.params.configId;
const news = ref(false);
const edit = ref(false);
const type = ref('yes/no');
const isFetching = ref(true);
const noAdditionalsOptionsFound = ref('');
const additionals = ref([]);
const additionalOptionId = ref(null);
const isLoading = ref(false);
const additionalsListTable = ref();
const sortable = ref(null);
const newIndexs = ref([]);
const originalIndexs = ref([]);
const openModal = ref(false);

const inputTypes = [
  { value: 'yes/no', label: 'Yes/No', icon: CheckSquareIcon },
  { value: 'image-input', label: 'Image Input', icon: ImageIcon },
  { value: 'dropdown', label: 'Dropdown', icon: ListIcon },
  { value: 'note', label: 'Note', icon: NotebookIcon },
  { value: 'include-type', label: 'Include Type', icon: PackageCheckIcon },
];

const sortChanged = computed(() => JSON.stringify(newIndexs.value) !== JSON.stringify(originalIndexs.value));

onMounted(async () => {
  isFetching.value = true;
  try {
    await fetchAdditionalOptions();
  } finally {
    isFetching.value = false;
  }

  if (window.Sortable && additionalsListTable.value) {
    sortable.value = window.Sortable.create(additionalsListTable.value, {
      group: 'sort-options',
      chosenClass: 'sortable-chosen',
      animation: 100,
      onEnd: (event) => {
        const next = [...newIndexs.value];
        const [moved] = next.splice(event.oldIndex, 1);
        next.splice(event.newIndex, 0, moved);
        newIndexs.value = next;
      },
    });
  }
});

const typeLabel = (value) => {
  const match = inputTypes.find(item => item.value === value);
  return match?.label?.toLowerCase() || value || 'text';
};

const inputDescription = (item) => item.description || item.descriptionText || item.helperText || ' ';

const fetchAdditionalOptions = async () => {
  const data = await api.getCustomAdditionals(configId);
  const items = extractAdditionalItems(data);
  noAdditionalsOptionsFound.value = items.length === 0 && data?.message ? data.message : '';
  additionals.value = items;
  const indexes = additionals.value.map((_, index) => index);
  newIndexs.value = indexes;
  originalIndexs.value = [...indexes];
};

const extractAdditionalItems = (data) => {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.items)) return data.items;
  if (Array.isArray(data?.inputs?.items)) return data.inputs.items;
  if (Array.isArray(data?.additionalOptions?.inputs?.items)) return data.additionalOptions.inputs.items;
  return [];
};

const newAdditionalOptions = () => {
  edit.value = false;
  additionalOptionId.value = null;
  type.value = 'yes/no';
  news.value = true;
};

const selectAdditionalOptions = (additional, index, isDelete = false) => {
  additionalOptionId.value = index;
  if (isDelete) {
    openModal.value = true;
    return;
  }

  edit.value = true;
  type.value = additional.type || 'yes/no';
  news.value = true;
};

const deleteAdditional = async () => {
  isLoading.value = true;
  const result = await api.deleteCustomAdditional(configId, additionalOptionId.value);
  if (result.success) {
    await fetchAdditionalOptions();
    toastMessage(result.message);
    closeModal();
  } else {
    toastMessage(result.message, 'error');
  }
  isLoading.value = false;
};

const updateSortOptions = async () => {
  isLoading.value = true;
  const newOrderOfCustomAdditionals = sortArrayByIndices(additionals.value, newIndexs.value);
  const result = await api.updateCustomAdditionals(configId, newOrderOfCustomAdditionals);
  if (result.success) {
    additionals.value = newOrderOfCustomAdditionals;
    originalIndexs.value = additionals.value.map((_, index) => index);
    newIndexs.value = [...originalIndexs.value];
    toastMessage(result.message);
  } else {
    toastMessage(result.message, 'error');
  }
  isLoading.value = false;
};

const sortArrayByIndices = (array, indices) => indices.map(index => array[index]).filter(Boolean);

const changeAdditionals = async (action, message) => {
  await fetchAdditionalOptions();
  edit.value = false;
  news.value = false;
  additionalOptionId.value = null;
  if (message) toastMessage(message, action === 'edit' || action === 'add' ? undefined : 'warning');
};

const newAdditionnal = () => {
  news.value = !news.value;
};

const changeAction = (value) => {
  edit.value = value;
  additionalOptionId.value = null;
  type.value = 'yes/no';
};

const closeModal = () => {
  if (isLoading.value) return;
  openModal.value = false;
};
</script>

<style>
.ascwo-inputs {
  display: grid;
  gap: 12px;
  color: #303030;
  font-size: 13px;
}

.ascwo-inputs-card {
  background: #fff;
  border: 1px solid #d8dee4;
  border-radius: 8px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.08);
}

.ascwo-inputs-hero,
.ascwo-inputs-simple-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  padding: 24px 28px;
}

.ascwo-inputs-hero h1,
.ascwo-inputs-simple-head h1,
.ascwo-inputs-types h2 {
  margin: 0;
  color: #303030;
  font-size: 18px;
  font-weight: 800;
  line-height: 1.25;
}

.ascwo-inputs-hero p,
.ascwo-inputs-types p,
.ascwo-inputs-table p {
  margin: 4px 0 0;
  color: #5f6368;
  font-size: 12px;
  line-height: 1.35;
}

.ascwo-inputs-table-card {
  padding: 28px 34px;
}

.ascwo-inputs-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

.ascwo-inputs-table th {
  padding: 12px 14px;
  background: #f4f4f4;
  color: #5f6368;
  font-size: 12px;
  font-weight: 700;
}

.ascwo-inputs-table td {
  padding: 10px 14px;
  border-bottom: 1px solid #e1e3e5;
  color: #303030;
  vertical-align: middle;
}

.ascwo-inputs-table tr:last-child td {
  border-bottom: 0;
}

.ascwo-inputs-table strong {
  display: block;
  color: #202223;
  font-size: 13px;
  font-weight: 800;
}

.ascwo-inputs-pill {
  display: inline-flex;
  align-items: center;
  min-height: 22px;
  padding: 3px 10px;
  border-radius: 999px;
  background: #f1f2f3;
  color: #5f6368;
  font-size: 12px;
  font-weight: 600;
}

.ascwo-inputs-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.ascwo-inputs-actions-end {
  justify-content: flex-end;
}

.ascwo-inputs-primary,
.ascwo-inputs-secondary,
.ascwo-inputs-danger,
.ascwo-inputs-danger-button {
  appearance: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  min-height: 30px;
  padding: 6px 14px;
  border-radius: 7px;
  font-family: inherit;
  font-size: 12px;
  font-weight: 800;
  line-height: 1;
  cursor: pointer;
  text-decoration: none;
}

.ascwo-inputs-primary,
.ascwo-inputs-primary:hover,
.ascwo-inputs-primary:focus {
  color: #fff;
  background: #007a73;
  border: 1px solid #006c67;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.25);
}

.ascwo-inputs-secondary,
.ascwo-inputs-secondary:hover,
.ascwo-inputs-secondary:focus {
  color: #111827;
  background: #fff;
  border: 1px solid #c9cccf;
}

.ascwo-inputs-danger,
.ascwo-inputs-danger:hover,
.ascwo-inputs-danger:focus {
  color: #8a0f00;
  background: transparent;
  border: 0;
}

.ascwo-inputs-danger-button {
  color: #fff;
  background: #bf0711;
  border: 1px solid #a80d12;
}

.ascwo-inputs-empty {
  height: 120px;
  text-align: center;
  color: #5f6368;
}

.ascwo-inputs-sort {
  display: flex;
  justify-content: flex-end;
  margin-top: 14px;
}

.ascwo-inputs-types {
  display: grid;
  gap: 12px;
  padding: 24px 28px;
}

.ascwo-inputs-type-grid {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 12px;
}

.ascwo-inputs-type {
  display: grid;
  place-items: center;
  gap: 8px;
  min-height: 86px;
  border: 1px solid #d8dee4;
  border-radius: 7px;
  background: #fff;
  color: #303030;
  font-size: 12px;
  font-weight: 800;
  cursor: pointer;
}

.ascwo-inputs-type.is-active {
  border-color: #5b7fff;
  box-shadow: inset 0 0 0 1px #5b7fff;
}

.ascwo-inputs-modal {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.45);
}

.ascwo-inputs-dialog {
  position: relative;
  width: min(420px, calc(100vw - 32px));
  padding: 22px;
  border-radius: 10px;
  background: #fff;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.25);
}

.ascwo-inputs-dialog h2 {
  margin: 0;
  font-size: 16px;
  font-weight: 800;
}

.ascwo-inputs-close {
  position: absolute;
  top: 10px;
  right: 10px;
  border: 0;
  background: transparent;
  color: #6b7280;
  cursor: pointer;
}

@media (max-width: 1000px) {
  .ascwo-inputs-type-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
