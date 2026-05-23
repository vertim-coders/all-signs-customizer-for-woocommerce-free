<template>
  <div class="asowp-template-category-module">
    <section class="asowp-template-category-toolbar">
      <div>
        <div class="asowp-template-category-title-row">
          <h1>{{ __("Template Categories", "all-signs-options-pro") }}</h1>
          <span class="asowp-template-category-count-pill">
            {{ filteredCategories.length }} {{ filteredCategories.length > 1 ? __("categories", "all-signs-options-pro") : __("category", "all-signs-options-pro") }}
          </span>
        </div>
        <p>{{ __("Organize templates with categories used across the templates module.", "all-signs-options-pro") }}</p>
      </div>

      <div class="asowp-template-category-actions">
        <label>
          <input v-model="search" type="search" :placeholder="__('Search categories', 'all-signs-options-pro')" />
        </label>
        <button type="button" @click="openCreateModal">
          <PlusIcon />
          {{ __("Add new category", "all-signs-options-pro") }}
        </button>
      </div>
    </section>

    <section class="asowp-template-category-list">
      <h2>{{ __("Categories List", "all-signs-options-pro") }}</h2>

      <div v-if="filteredCategories.length === 0" class="asowp-template-category-empty">
        <img :src="asoLogo" alt="" />
        <h3>{{ __("No categories found", "all-signs-options-pro") }}</h3>
        <p>{{ __("There is currently no category matching this search.", "all-signs-options-pro") }}</p>
        <button type="button" @click="openCreateModal">{{ __("Add new category", "all-signs-options-pro") }}</button>
      </div>

      <table v-else class="asowp-template-category-table">
        <thead>
          <tr>
            <th>{{ __("Name", "all-signs-options-pro") }}</th>
            <th>{{ __("Action", "all-signs-options-pro") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="cat in filteredCategories" :key="cat.value">
            <td>
              <button type="button" class="asowp-template-category-name" @click="selectCategory(cat.value, cat.name)">
                {{ cat.name }}
              </button>
            </td>
            <td>
              <div class="asowp-template-category-row-actions">
                <button type="button" @click="selectCategory(cat.value, cat.name)">
                  <PencilIcon />
                </button>
                <button type="button" @click="selectCategory(cat.value, cat.name, true)">
                  <Trash2Icon />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </section>

    <div v-if="openModal && !isDelete" class="asowp-template-category-modal-layer">
      <div class="asowp-template-category-backdrop" @click="closeModal"></div>
      <div class="asowp-template-category-modal">
        <header>
          <h2>{{ isEdit ? __("Update category", "all-signs-options-pro") : __("Create new category", "all-signs-options-pro") }}</h2>
          <button type="button" @click="closeModal"><XIcon /></button>
        </header>
        <div class="asowp-template-category-modal-body">
          <label>
            <span>{{ __("Name", "all-signs-options-pro") }}</span>
            <input v-model="category" type="text" />
          </label>
        </div>
        <footer>
          <button type="button" class="asowp-template-category-secondary" @click="closeModal">{{ __("cancel", "all-signs-options-pro") }}</button>
          <button type="button" class="asowp-template-category-primary" :disabled="isLoading" @click="isEdit ? updateCategory() : createCategory()">
            {{ isLoading ? __("Saving...", "all-signs-options-pro") : isEdit ? __("Save", "all-signs-options-pro") : __("Create", "all-signs-options-pro") }}
          </button>
        </footer>
      </div>
    </div>

    <div v-if="isDelete" class="asowp-template-category-modal-layer">
      <div class="asowp-template-category-backdrop" @click="closeModal"></div>
      <div class="asowp-template-category-modal">
        <header>
          <h2>{{ __("Delete category?", "all-signs-options-pro") }}</h2>
          <button type="button" @click="closeModal"><XIcon /></button>
        </header>
        <div class="asowp-template-category-modal-body">
          <p>{{ __("This action cannot be undone and may affect templates in this category.", "all-signs-options-pro") }}</p>
        </div>
        <footer>
          <button type="button" class="asowp-template-category-secondary" @click="closeModal">{{ __("Cancel", "all-signs-options-pro") }}</button>
          <button type="button" class="asowp-template-category-danger" :disabled="isLoading" @click="deleteCategory">
            {{ isLoading ? __("Deleting...", "all-signs-options-pro") : __("Delete", "all-signs-options-pro") }}
          </button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { PencilIcon, PlusIcon, Trash2Icon, XIcon } from "lucide-vue-next";
import api from "@/admin/Api/api";
import toastMessage from "@/admin/utils/functions";
import { __ } from "@wordpress/i18n";
import asoLogo from "../../../../assets/images/im_asowp-icon.png";

const categories = ref({});
const openModal = ref(false);
const category = ref("");
const isLoading = ref(false);
const isEdit = ref(false);
const category_id = ref("");
const isDelete = ref(false);
const search = ref("");

const normalizeCategories = (value) => {
  if (!value || typeof value !== "object") return {};
  return value;
};

const categoryList = computed(() =>
  Object.keys(categories.value || {}).map((key) => ({
    value: key,
    name: categories.value[key],
  })),
);

const filteredCategories = computed(() => {
  const term = search.value.trim().toLowerCase();
  if (!term) return categoryList.value;
  return categoryList.value.filter((item) => String(item.name || "").toLowerCase().includes(term));
});

onMounted(async () => {
  try {
    const res = await api.getAllCategories();
    categories.value = normalizeCategories(res);
  } catch (error) {
    toastMessage(__("Unable to load categories.", "all-signs-options-pro"), "error");
  }
});

const openCreateModal = () => {
  category.value = "";
  category_id.value = "";
  isEdit.value = false;
  isDelete.value = false;
  openModal.value = true;
};

const createCategory = async () => {
  if (!category.value.trim()) return;
  isLoading.value = true;
  try {
    const res = await api.createCategory(category.value);
    if (res.success) {
      categories.value = normalizeCategories(res?.categories);
      closeModal();
      toastMessage(res.message);
      return;
    }
    toastMessage(res.message, "error");
  } catch (error) {
    toastMessage(__("Unable to create category.", "all-signs-options-pro"), "error");
  } finally {
    isLoading.value = false;
  }
};

const updateCategory = async () => {
  if (!category.value.trim()) return;
  isLoading.value = true;
  try {
    const update = await api.updateCategory(category_id.value, category.value);
    if (update.success) {
      categories.value = normalizeCategories(update?.categories);
      closeModal();
      toastMessage(update.message, update.success === true ? undefined : "warning");
      return;
    }
    toastMessage(update.message, "error");
    closeModal();
  } catch (error) {
    toastMessage(__("Unable to update category.", "all-signs-options-pro"), "error");
  } finally {
    isLoading.value = false;
  }
};

const deleteCategory = async () => {
  isLoading.value = true;
  try {
    const del = await api.deleteCategory(category_id.value);
    if (del.success) {
      categories.value = normalizeCategories(del?.categories);
      closeModal();
      toastMessage(del.message);
      return;
    }
    closeModal();
    toastMessage(del.message, "error");
  } catch (error) {
    closeModal();
    toastMessage(__("Unable to delete category.", "all-signs-options-pro"), "error");
  } finally {
    isLoading.value = false;
  }
};

const closeModal = () => {
  openModal.value = false;
  isEdit.value = false;
  isDelete.value = false;
  category.value = "";
  category_id.value = "";
};

const selectCategory = (key, cat, del = false) => {
  category_id.value = key;
  category.value = cat;
  if (del) {
    isDelete.value = true;
    openModal.value = false;
    return;
  }
  isEdit.value = true;
  openModal.value = true;
};
</script>

<style>
.asowp-template-category-module {
  display: grid;
  gap: 16px;
}

.asowp-template-category-toolbar,
.asowp-template-category-list {
  background: #ffffff;
  border: 1px solid #dfe3e8;
  border-radius: 10px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.04);
}

.asowp-template-category-toolbar {
  padding: 24px 28px;
}

.asowp-template-category-list {
  min-height: 520px;
  padding: 24px 28px;
}

.asowp-template-category-title-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 14px;
}

.asowp-template-category-title-row h1,
.asowp-template-category-list h2 {
  margin: 0;
  color: #202223;
  font-size: 20px;
  line-height: 28px;
  font-weight: 700;
}

.asowp-template-category-list h2 {
  font-size: 14px;
  line-height: 20px;
}

.asowp-template-category-count-pill {
  display: inline-flex;
  align-items: center;
  flex: 0 0 auto;
  height: 18px;
  padding: 0 8px;
  color: #0b4f8a;
  background: #d9ebff;
  border-radius: 9px;
  font-size: 11px;
  font-weight: 500;
  line-height: 18px;
}

.asowp-template-category-toolbar p {
  margin: 4px 0 0;
  color: #616161;
  font-size: 13px;
  line-height: 19px;
}

.asowp-template-category-actions {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 16px;
}

.asowp-template-category-actions label {
  width: 260px;
}

.asowp-template-category-actions input,
.asowp-template-category-modal-body input {
  width: 100%;
  height: 36px;
  padding: 0 12px;
  color: #202223;
  background: #ffffff;
  border: 1px solid #8c9196;
  border-radius: 6px;
  font-size: 13px;
  outline: none;
  box-shadow: none;
}

.asowp-template-category-actions button,
.asowp-template-category-empty button,
.asowp-template-category-primary,
.asowp-template-category-danger {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  min-height: 36px;
  padding: 7px 13px;
  color: #ffffff;
  background: #007a6f;
  border: 1px solid #006e52;
  border-radius: 6px;
  font-size: 13px;
  line-height: 18px;
  font-weight: 700;
  cursor: pointer;
}

.asowp-template-category-actions svg {
  width: 16px;
  height: 16px;
}

.asowp-template-category-empty {
  min-height: 440px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.asowp-template-category-empty img {
  width: min(440px, 58vw);
  max-height: 280px;
  object-fit: contain;
  margin-bottom: 12px;
}

.asowp-template-category-empty h3 {
  margin: 0;
  color: #202223;
  font-size: 13px;
  font-weight: 700;
}

.asowp-template-category-empty p {
  margin: 4px 0 16px;
  color: #616161;
  font-size: 12px;
}

.asowp-template-category-table {
  width: 100%;
  margin-top: 16px;
  border-collapse: collapse;
  background: #ffffff;
}

.asowp-template-category-table th,
.asowp-template-category-table td {
  padding: 12px 10px;
  border-top: 1px solid #e1e3e5;
  color: #202223;
  font-size: 13px;
  text-align: left;
}

.asowp-template-category-table th:last-child,
.asowp-template-category-table td:last-child {
  width: 120px;
  text-align: center;
}

.asowp-template-category-name {
  padding: 0;
  color: #202223;
  background: transparent;
  border: 0;
  font-weight: 700;
  cursor: pointer;
}

.asowp-template-category-row-actions {
  display: inline-flex;
  gap: 6px;
}

.asowp-template-category-row-actions button {
  width: 30px;
  height: 28px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #5c5f62;
  background: #ffffff;
  border: 1px solid #dfe3e8;
  border-radius: 6px;
  cursor: pointer;
}

.asowp-template-category-row-actions svg {
  width: 14px;
  height: 14px;
}

.asowp-template-category-modal-layer {
  position: fixed;
  inset: 0;
  z-index: 20000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.asowp-template-category-backdrop {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
}

.asowp-template-category-modal {
  position: relative;
  width: min(480px, calc(100vw - 32px));
  overflow: hidden;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 20px 44px rgba(0, 0, 0, 0.24);
}

.asowp-template-category-modal header,
.asowp-template-category-modal footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 18px 22px;
  border-bottom: 1px solid #dfe3e8;
}

.asowp-template-category-modal footer {
  justify-content: flex-end;
  border-top: 1px solid #dfe3e8;
  border-bottom: 0;
}

.asowp-template-category-modal h2 {
  margin: 0;
  color: #202223;
  font-size: 18px;
  line-height: 24px;
}

.asowp-template-category-modal header button {
  width: 28px;
  height: 28px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #8c9196;
  background: transparent;
  border: 0;
  cursor: pointer;
}

.asowp-template-category-modal header svg {
  width: 20px;
  height: 20px;
}

.asowp-template-category-modal-body {
  padding: 22px;
}

.asowp-template-category-modal-body label {
  display: grid;
  gap: 8px;
  color: #202223;
  font-size: 14px;
}

.asowp-template-category-modal-body p {
  margin: 0;
  color: #616161;
  font-size: 15px;
  line-height: 22px;
}

.asowp-template-category-secondary {
  min-height: 34px;
  padding: 6px 14px;
  color: #202223;
  background: #ffffff;
  border: 1px solid #8c9196;
  border-radius: 6px;
  font-weight: 700;
  cursor: pointer;
}

.asowp-template-category-danger {
  background: #8e1f0b;
  border-color: #7a1a09;
}
</style>
