<template>
  <section class="ascwo-additional">
    <template v-if="!isNewAdditionalOptions">
      <header class="ascwo-additional-header">
        <div>
          <h1>Additional Components</h1>
          <p>Manage the reusable additional components offered in this configuration.</p>
        </div>
        <button type="button" class="ascwo-additional-primary" :disabled="isLoading" @click="newAdditionalOptions">
          <PlusIcon :size="15" />
          Add additional component
        </button>
      </header>

      <div class="ascwo-additional-card">
        <table class="ascwo-additional-table">
          <thead>
            <tr>
              <th>Icon</th>
              <th>Title</th>
              <th>Options</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="isFetching">
              <td colspan="4" class="ascwo-additional-empty ascwo-table-loader-cell">
                <Loader2Icon class="ascwo-table-loader-icon ascwo-w-7 ascwo-h-7" />
              </td>
            </tr>
            <tr v-else-if="additionalOptions.length === 0">
              <td colspan="4" class="ascwo-additional-empty">{{ noAdditionalOptionsFound || 'No additional components found' }}</td>
            </tr>
            <tr v-for="(additionalOption, key) in additionalOptions" :key="key">
              <td>
                <div class="ascwo-additional-icon-box">
                  <img v-if="additionalOption.icon" :src="additionalOption.icon" alt="" />
                  <span v-else>-</span>
                </div>
              </td>
              <td>
                <strong>{{ additionalOption.title }}</strong>
                <p>{{ additionalOption.description }}</p>
              </td>
              <td>
                <button type="button" class="ascwo-additional-pill" @click="openComponentEditor(key)">
                  {{ optionCount(additionalOption) }} options
                </button>
              </td>
              <td>
                <div class="ascwo-additional-actions">
                  <button type="button" class="ascwo-additional-secondary" @click="openComponentEditor(key)">
                    <PencilIcon :size="14" />
                    Edit
                  </button>
                  <button type="button" class="ascwo-additional-danger" @click="selectAdditionalOption(key, additionalOption, true)">
                    <Trash2Icon :size="14" />
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>

    <template v-else>
      <header class="ascwo-additional-header ascwo-additional-header-simple">
        <div>
          <h1>{{ isEdit ? 'Edit additional component' : 'Add additional component' }}</h1>
          <p>Define the component and the options customers can choose from.</p>
        </div>
      </header>

      <div class="ascwo-additional-card ascwo-additional-form-card">
        <div class="ascwo-additional-grid ascwo-additional-grid-2">
          <div class="ascwo-additional-field">
            <label>Title</label>
            <input v-model="additionalOption.title" type="text" :class="{ 'is-invalid': emptyLabel }" />
          </div>
          <div class="ascwo-additional-field">
            <label>Group icon</label>
            <UploadField :value="additionalOption.icon" button-label="Upload icon" @choose="selectAdditionalOptionsIcon" @clear="additionalOption.icon = ''" />
          </div>
        </div>

        <div class="ascwo-additional-field">
          <label>Description</label>
          <input v-model="additionalOption.description" type="text" />
        </div>
      </div>

      <div class="ascwo-additional-footer">
        <button type="button" class="ascwo-additional-secondary" :disabled="isLoading" @click="back">
          Back to additional components
        </button>
        <button
          v-if="isEdit"
          type="button"
          class="ascwo-additional-primary"
          :disabled="isLoading"
          @click="updateAdditionalOption"
        >
          {{ isLoading ? 'Saving...' : 'Save additional component' }}
        </button>
        <button
          v-else
          type="button"
          class="ascwo-additional-primary"
          :disabled="isLoading"
          @click="addAdditionalOption"
        >
          {{ isLoading ? 'Saving...' : 'Save additional component' }}
        </button>
      </div>
    </template>

    <div v-if="openModal" class="ascwo-additional-modal" @click.self="closeModal">
      <div class="ascwo-additional-dialog">
        <button type="button" class="ascwo-additional-close" @click="closeModal">x</button>
        <h2>Delete additional component?</h2>
        <p>{{ additionalOption.title }}</p>
        <div class="ascwo-additional-actions ascwo-additional-actions-end">
          <button type="button" class="ascwo-additional-secondary" :disabled="isLoading" @click="closeModal">Cancel</button>
          <button type="button" class="ascwo-additional-danger-button" :disabled="isLoading" @click="deleteAdditionalOption">
            {{ isLoading ? 'Deleting...' : 'Delete' }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import api from '@/admin/Api/api';
import { defineComponent, h, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import router from '@/admin/router';
import toastMessage from '@/admin/utils/functions';
import { Loader2Icon, PencilIcon, PlusIcon, Trash2Icon } from 'lucide-vue-next';

const route = useRoute();
const configID = ref(route.params.configId);

const isFetching = ref(true);
const isNewAdditionalOptions = ref(false);
const isLoading = ref(false);
const additionalOptions = ref([]);
const additionalOptionId = ref(null);
const isEdit = ref(false);
const openModal = ref(false);
const noAdditionalOptionsFound = ref('');
const additionalOption = ref({
  title: '',
  description: '',
  icon: '',
  options: [],
});
const emptyLabel = ref(false);

onMounted(async () => {
  isFetching.value = true;
  await fetchAdditionalOptions();
  isFetching.value = false;
});

const optionCount = (item) => Array.isArray(item?.options) ? item.options.length : 0;
const openComponentEditor = (id) => {
  router.push({
    name: 'Additional-Components-Options',
    params: {
      configId: configID.value,
      additionalOptionID: id,
    },
  });
};

const resetAdditionalOption = () => {
  additionalOption.value = {
    title: '',
    description: '',
    icon: '',
    options: [],
  };
};

const fetchAdditionalOptions = async () => {
  const result = await api.getAdditionalOptions(configID.value);
  if (!result.message) {
    additionalOptions.value = result;
  } else {
    additionalOptions.value = [];
    noAdditionalOptionsFound.value = result.message;
  }
};

const updateAdditionalOption = async () => {
  if (additionalOption.value.title.trim() === '') {
    emptyLabel.value = true;
    toastMessage('Title must not be empty', 'warning');
    return;
  }

  isLoading.value = true;
  emptyLabel.value = false;
  const result = await api.updateAdditionalOption(
    configID.value,
    additionalOptionId.value,
    additionalOption.value,
  );

  if (result.success) {
    await fetchAdditionalOptions();
    toastMessage(result.message);
    back();
  } else {
    toastMessage(result.message, 'error');
  }
  isLoading.value = false;
};

const selectAdditionalOption = (id, selected, isDeleting = false) => {
  additionalOptionId.value = id;
  additionalOption.value = {
    title: '',
    description: '',
    icon: '',
    options: [],
    ...selected,
  };

  if (isDeleting) {
    openModal.value = true;
  } else {
    isEdit.value = true;
    isNewAdditionalOptions.value = true;
  }
};

const addAdditionalOption = async () => {
  if (additionalOption.value.title.trim() === '') {
    emptyLabel.value = true;
    toastMessage('Title must not be empty', 'warning');
    return;
  }

  isLoading.value = true;
  emptyLabel.value = false;
  const result = await api.addAdditionalOption(configID.value, additionalOption.value);

  if (result.success) {
    await fetchAdditionalOptions();
    toastMessage(result.message);
    back();
  } else {
    toastMessage(result.message, 'error');
  }
  isLoading.value = false;
};

const deleteAdditionalOption = async () => {
  isLoading.value = true;
  const result = await api.deleteAdditionalOption(configID.value, additionalOptionId.value);
  if (result.success) {
    await fetchAdditionalOptions();
    toastMessage(result.message);
    openModal.value = false;
    resetAdditionalOption();
  } else {
    toastMessage(result.message, 'error');
  }
  isLoading.value = false;
};

const closeModal = () => {
  if (isLoading.value) return;
  openModal.value = false;
};

const newAdditionalOptions = () => {
  resetAdditionalOption();
  isEdit.value = false;
  additionalOptionId.value = null;
  isNewAdditionalOptions.value = true;
};

const back = () => {
  isNewAdditionalOptions.value = false;
  openModal.value = false;
  isEdit.value = false;
  additionalOptionId.value = null;
  emptyLabel.value = false;
  resetAdditionalOption();
};

const selectAdditionalOptionsIcon = async (event) => {
  event?.preventDefault?.();
  const uploader = wp.media({
    title: 'Select Additional Options Icon',
    button: { text: 'Select Icon' },
    multiple: false,
  });

  uploader.on('select', () => {
    const attachment = uploader.state().get('selection').first().toJSON();
    if (attachment.type === 'image') {
      additionalOption.value.icon = attachment.url;
    }
  });

  uploader.open();
};

const UploadField = defineComponent({
  props: {
    value: {
      type: String,
      default: '',
    },
    buttonLabel: {
      type: String,
      default: 'Upload image',
    },
  },
  emits: ['choose', 'clear'],
  setup(props, { emit }) {
    return () =>
      h('div', { class: 'ascwo-additional-upload' }, [
        h('button', { type: 'button', class: 'ascwo-additional-primary ascwo-additional-upload-button', onClick: (event) => emit('choose', event) }, props.buttonLabel),
        h('div', { class: 'ascwo-additional-upload-preview' }, [
          props.value ? h('img', { src: props.value, alt: '' }) : null,
          props.value ? h('button', { type: 'button', onClick: () => emit('clear') }, 'x') : null,
        ]),
      ]);
  },
});
</script>

<style>
.ascwo-additional {
  display: grid;
  gap: 12px;
  color: #202223;
  font-size: 13px;
}

.ascwo-additional-header,
.ascwo-additional-card {
  background: #fff;
  border: 1px solid #d8dee4;
  border-radius: 8px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.08);
}

.ascwo-additional-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  padding: 24px 28px;
}

.ascwo-additional-header-simple {
  align-items: flex-start;
}

.ascwo-additional-header h1 {
  margin: 0;
  color: #303030;
  font-size: 18px;
  font-weight: 800;
  line-height: 1.25;
}

.ascwo-additional-header p,
.ascwo-additional-card p {
  margin: 4px 0 0;
  color: #5f6368;
  font-size: 12px;
  line-height: 1.35;
}

.ascwo-additional-card {
  padding: 28px 34px;
}

.ascwo-additional-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

.ascwo-additional-table th {
  padding: 12px 14px;
  background: #f4f4f4;
  color: #5f6368;
  font-size: 12px;
  font-weight: 700;
}

.ascwo-additional-table td {
  padding: 8px 14px;
  border-bottom: 1px solid #e1e3e5;
  color: #303030;
  vertical-align: middle;
}

.ascwo-additional-table tr:last-child td {
  border-bottom: 0;
}

.ascwo-additional-table strong {
  display: block;
  color: #202223;
  font-size: 13px;
  font-weight: 800;
}

.ascwo-additional-icon-box {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 46px;
  height: 46px;
  overflow: hidden;
  border: 1px solid #d8dee4;
  border-radius: 8px;
  background: #f8fafc;
  color: #5f6368;
}

.ascwo-additional-icon-box img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.ascwo-additional-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.ascwo-additional-actions-end {
  justify-content: flex-end;
}

.ascwo-additional-primary,
.ascwo-additional-secondary,
.ascwo-additional-danger,
.ascwo-additional-pill,
.ascwo-additional-danger-button {
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

.ascwo-additional-primary,
.ascwo-additional-primary:hover,
.ascwo-additional-primary:focus {
  color: #fff;
  background: #007a73;
  border: 1px solid #006c67;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.25);
}

.ascwo-additional-secondary,
.ascwo-additional-secondary:hover,
.ascwo-additional-secondary:focus {
  color: #111827;
  background: #fff;
  border: 1px solid #c9cccf;
}

.ascwo-additional-danger,
.ascwo-additional-danger:hover,
.ascwo-additional-danger:focus {
  padding-inline: 4px;
  color: #8a0f00;
  background: transparent;
  border: 0;
}

.ascwo-additional-danger-button {
  color: #fff;
  background: #bf0711;
  border: 1px solid #a80d12;
}

.ascwo-additional-pill {
  min-height: 22px;
  padding: 4px 10px;
  color: #5f6368;
  background: #f1f2f3;
  border: 0;
  border-radius: 999px;
  font-weight: 600;
}

.ascwo-additional-empty {
  height: 120px;
  text-align: center;
  color: #5f6368;
}

.ascwo-additional-grid {
  display: grid;
  gap: 14px 18px;
}

.ascwo-additional-grid-2 {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.ascwo-additional-form-card {
  display: grid;
  gap: 14px;
}

.ascwo-additional-field {
  display: grid;
  gap: 6px;
}

.ascwo-additional-field label {
  color: #303030;
  font-size: 12px;
  font-weight: 500;
}

.ascwo-additional-field input {
  width: 100%;
  min-height: 34px;
  padding: 6px 10px;
  border: 1px solid #8c9196;
  border-radius: 6px;
  background: #fff;
  color: #303030;
  font-size: 13px;
}

.ascwo-additional-field input.is-invalid {
  border-color: #d72c0d;
  background: #fff4f4;
}

.ascwo-additional-upload {
  display: flex;
  align-items: center;
  min-height: 34px;
  overflow: hidden;
  border: 1px solid #8c9196;
  border-radius: 6px;
  background: #fff;
  padding-left: 5px;
}

.ascwo-additional-upload-button {
  min-height: 26px;
  padding: 5px 12px;
}

.ascwo-additional-upload-preview {
  position: relative;
  margin-left: auto;
  width: 44px;
  height: 30px;
  border-left: 1px solid #e1e3e5;
}

.ascwo-additional-upload-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.ascwo-additional-upload-preview button {
  position: absolute;
  top: 0;
  right: 0;
  border: 0;
  background: #bf0711;
  color: #fff;
}

.ascwo-additional-footer {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}

.ascwo-additional-modal {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.45);
}

.ascwo-additional-dialog {
  position: relative;
  width: min(420px, calc(100vw - 32px));
  padding: 22px;
  border-radius: 10px;
  background: #fff;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.25);
}

.ascwo-additional-dialog h2 {
  margin: 0;
  font-size: 16px;
  font-weight: 800;
}

.ascwo-additional-close {
  position: absolute;
  top: 10px;
  right: 10px;
  border: 0;
  background: transparent;
  color: #6b7280;
  cursor: pointer;
}

@media (max-width: 900px) {
  .ascwo-additional-header,
  .ascwo-additional-grid-2 {
    grid-template-columns: 1fr;
  }

  .ascwo-additional-header {
    display: grid;
  }
}
</style>
