<template>
  <div class="">
    <div class="asowp-space-y-1" v-if="!createTemplate">
      <div class="asowp-bg-[#F8F9FB]">
        <div class="asowp-flex asowp-justify-end asowp-items-center asowp-py-4">
          <div class="asowp-w-1/4">
            <button
              class="asowp-flex asowp-w-fit asowp-rounded asowp-bg-[#016464] asowp-px-4 asowp-space-x-2 asowp-p-1.5 asowp-border-none asowp-text-white asowp-opacity-90 hover:asowp-opacity-100 asowp-cursor-pointer asowp-h-[40px] asowp-flex asowp-items-center asowp-justify-center"
              @click="openModal = true"
            >
              <svg
                class="asowp-w-5 asowp-h-5"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="plus-lg">
                  <path
                    id="Vector"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M11 2.75C11.1823 2.75 11.3572 2.82243 11.4861 2.95136C11.6151 3.08029 11.6875 3.25516 11.6875 3.4375V10.3125H18.5625C18.7448 10.3125 18.9197 10.3849 19.0486 10.5139C19.1776 10.6428 19.25 10.8177 19.25 11C19.25 11.1823 19.1776 11.3572 19.0486 11.4861C18.9197 11.6151 18.7448 11.6875 18.5625 11.6875H11.6875V18.5625C11.6875 18.7448 11.6151 18.9197 11.4861 19.0486C11.3572 19.1776 11.1823 19.25 11 19.25C10.8177 19.25 10.6428 19.1776 10.5139 19.0486C10.3849 18.9197 10.3125 18.7448 10.3125 18.5625V11.6875H3.4375C3.25516 11.6875 3.08029 11.6151 2.95136 11.4861C2.82243 11.3572 2.75 11.1823 2.75 11C2.75 10.8177 2.82243 10.6428 2.95136 10.5139C3.08029 10.3849 3.25516 10.3125 3.4375 10.3125H10.3125V3.4375C10.3125 3.25516 10.3849 3.08029 10.5139 2.95136C10.6428 2.82243 10.8177 2.75 11 2.75Z"
                    fill="white"
                  />
                </g>
              </svg>
              <span>{{ __("Add Category", "all-signs-options-pro") }}</span>
            </button>
          </div>
        </div>
      </div>
      <div class="asowp-grid asowp-grid-cols-4 asowp-gap-4">
        <div
          v-for="(cat, key) in categories"
          :key="key"
          class="asowp-bg-white asowp-rounded-xl asowp-p-4 asowp-border asowp-border-solid asowp-border-[#E5E7EB]"
        >
          <div class="asowp-flex asowp-flex-col asowp-h-full">
            <div
              class="asowp-flex asowp-justify-between asowp-items-start asowp-mb-4"
            >
              <div class="asowp-bg-[#F3F4F6] asowp-p-2 asowp-rounded-lg">
                <svg
                  class="asowp-w-6 asowp-h-6 asowp-text-[#4B5563]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                  />
                </svg>
              </div>
              <div class="asowp-flex asowp-space-x-1">
                <button
                  @click="selectCategory(key, cat)"
                  class="asowp-p-1.5 hover:asowp-bg-gray-100 asowp-rounded-md asowp-transition-colors asowp-border-none asowp-bg-transparent asowp-cursor-pointer asowp-text-gray-500"
                  :title="__('Edit', 'all-signs-options-pro')"
                >
                  <svg
                    class="asowp-w-4 asowp-h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    />
                  </svg>
                </button>
                <button
                  @click="selectCategory(key, cat, true)"
                  class="asowp-p-1.5 hover:asowp-bg-red-50 asowp-rounded-md asowp-transition-colors asowp-border-none asowp-bg-transparent asowp-cursor-pointer asowp-text-red-400"
                  :title="__('Delete', 'all-signs-options-pro')"
                >
                  <svg
                    class="asowp-w-4 asowp-h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <h3
              class="asowp-text-sm asowp-font-semibold asowp-text-gray-900 asowp-mb-1"
            >
              {{ cat }}
            </h3>
            <p class="asowp-text-xs asowp-text-gray-500">
              {{ __("Template category", "all-signs-options-pro") }}
            </p>
          </div>
        </div>
      </div>

      <div
        v-if="Object.keys(categories).length === 0"
        class="asowp-flex asowp-flex-col asowp-items-center asowp-justify-center asowp-py-12 asowp-bg-white asowp-rounded-xl asowp-border asowp-border-dashed asowp-border-gray-300"
      >
        <div class="asowp-bg-gray-50 asowp-p-4 asowp-rounded-full asowp-mb-4">
          <svg
            class="asowp-w-8 asowp-h-8 asowp-text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
            />
          </svg>
        </div>
        <h3 class="asowp-text-sm asowp-font-medium asowp-text-gray-900">
          {{ __("No categories yet", "all-signs-options-pro") }}
        </h3>
        <p class="asowp-text-sm asowp-text-gray-500 asowp-mb-4">
          {{
            __(
              "Get started by creating your first template category.",
              "all-signs-options-pro",
            )
          }}
        </p>
        <button
          @click="openModal = true"
          class="asowp-text-[#016464] asowp-font-medium hover:asowp-underline asowp-bg-transparent asowp-border-none asowp-cursor-pointer"
        >
          {{ __("Create category", "all-signs-options-pro") }}
        </button>
      </div>
    </div>

    <div
      v-if="openModal && !isDelete"
      class="asowp-fixed asowp-inset-0 asowp-z-[1000] asowp-overflow-y-auto"
    >
      <div
        class="asowp-flex asowp-items-center asowp-justify-center asowp-min-h-screen asowp-px-4"
      >
        <div
          class="asowp-fixed asowp-inset-0 asowp-bg-gray-500 asowp-bg-opacity-75 asowp-transition-opacity"
        ></div>

        <div
          class="asowp-relative asowp-bg-white asowp-rounded-xl asowp-max-w-md asowp-w-full asowp-p-6 asowp-shadow-2xl"
        >
          <div class="asowp-mb-6">
            <h3 class="asowp-text-lg asowp-font-bold asowp-text-gray-900">
              {{
                isEdit
                  ? __("Update category", "all-signs-options-pro")
                  : __("Create new category", "all-signs-options-pro")
              }}
            </h3>
            <p class="asowp-text-sm asowp-text-gray-500 asowp-mt-1">
              {{
                isEdit
                  ? __(
                      "Change the name of your category below.",
                      "all-signs-options-pro",
                    )
                  : __(
                      "Give your new category a descriptive name.",
                      "all-signs-options-pro",
                    )
              }}
            </p>
          </div>

          <div class="asowp-space-y-4">
            <div>
              <label
                class="asowp-block asowp-text-sm asowp-font-medium asowp-text-gray-700 asowp-mb-1"
              >
                {{ __("Category Name", "all-signs-options-pro") }}
              </label>
              <input
                v-model="category"
                type="text"
                class="asowp-w-full asowp-rounded-lg asowp-border asowp-border-gray-300 asowp-px-4 asowp-py-2 focus:asowp-ring-2 focus:asowp-ring-[#016464] focus:asowp-border-transparent asowp-outline-none"
                :placeholder="__('e.g. Neon Signs', 'all-signs-options-pro')"
              />
            </div>
          </div>

          <div class="asowp-mt-8 asowp-flex asowp-justify-end asowp-space-x-3">
            <button
              @click="closeModal"
              class="asowp-px-4 asowp-py-2 asowp-text-sm asowp-font-medium asowp-text-gray-700 asowp-bg-white asowp-border asowp-border-gray-300 asowp-rounded-lg hover:asowp-bg-gray-50 asowp-cursor-pointer"
            >
              {{ __("Cancel", "all-signs-options-pro") }}
            </button>
            <button
              @click="isEdit ? updateCategory() : createCategory()"
              class="asowp-px-4 asowp-py-2 asowp-text-sm asowp-font-medium asowp-text-white asowp-bg-[#016464] asowp-rounded-lg asowp-border-none hover:asowp-opacity-90 asowp-cursor-pointer asowp-flex asowp-items-center"
              :disabled="isLoading"
            >
              <svg
                v-if="isLoading"
                class="asowp-animate-spin asowp-h-4 asowp-w-4 asowp-mr-2"
                viewBox="0 0 24 24"
              >
                <circle
                  class="asowp-opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="asowp-opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              {{
                isEdit
                  ? isLoading
                    ? __("Updating...", "all-signs-options-pro")
                    : __("Update Category", "all-signs-options-pro")
                  : isLoading
                  ? __("Creating...", "all-signs-options-pro")
                  : __("Create Category", "all-signs-options-pro")
              }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="isDelete"
      class="asowp-fixed asowp-inset-0 asowp-z-[1000] asowp-overflow-y-auto"
    >
      <div
        class="asowp-flex asowp-items-center asowp-justify-center asowp-min-h-screen asowp-px-4"
      >
        <div
          class="asowp-fixed asowp-inset-0 asowp-bg-gray-500 asowp-bg-opacity-75 asowp-transition-opacity"
        ></div>

        <div
          class="asowp-relative asowp-bg-white asowp-rounded-xl asowp-max-w-md asowp-w-full asowp-p-6 asowp-shadow-2xl"
        >
          <div
            class="asowp-flex asowp-items-center asowp-justify-center asowp-w-12 asowp-h-12 asowp-bg-red-100 asowp-rounded-full asowp-mb-4 asowp-mx-auto"
          >
            <svg
              class="asowp-w-6 asowp-h-6 asowp-text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>

          <div class="asowp-text-center asowp-mb-6">
            <h3 class="asowp-text-lg asowp-font-bold asowp-text-gray-900">
              {{ __("Delete Category", "all-signs-options-pro") }}
            </h3>
            <p class="asowp-text-sm asowp-text-gray-500 asowp-mt-2">
              {{
                __("Are you sure you want to delete", "all-signs-options-pro")
              }}
              <span class="asowp-font-semibold">{{ category }}</span
              >?
              {{
                __(
                  "This action cannot be undone and may affect templates in this category.",
                  "all-signs-options-pro",
                )
              }}
            </p>
          </div>

          <div class="asowp-flex asowp-justify-center asowp-space-x-3">
            <button
              @click="closeModal"
              class="asowp-px-4 asowp-py-2 asowp-text-sm asowp-font-medium asowp-text-gray-700 asowp-bg-white asowp-border asowp-border-gray-300 asowp-rounded-lg hover:asowp-bg-gray-50 asowp-cursor-pointer"
            >
              {{ __("Cancel", "all-signs-options-pro") }}
            </button>
            <button
              @click="deleteCategory"
              class="asowp-px-4 asowp-py-2 asowp-text-sm asowp-font-medium asowp-text-white asowp-bg-red-600 asowp-rounded-lg asowp-border-none hover:asowp-bg-red-700 asowp-cursor-pointer"
              :disabled="isLoading"
            >
              {{
                isLoading
                  ? __("Deleting...", "all-signs-options-pro")
                  : __("Delete Category", "all-signs-options-pro")
              }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import api from "@/admin/Api/api";
import { toastMessage } from "@/admin/utils/functions";
import { __ } from "@wordpress/i18n";
// Import du helper t

const categories = ref({});
const openModal = ref(false);
const category = ref("");
const isLoading = ref(false);
const isEdit = ref(false);
const category_id = ref("");
const isDelete = ref(false);

const normalizeCategories = (value) => {
  if (!value || typeof value !== "object") {
    return {};
  }
  return value;
};

onMounted(async () => {
  const res = await api.getAllCategories();
  categories.value = normalizeCategories(res);
});

const createCategory = async () => {
  isLoading.value = true;
  const res = await api.createCategory(category.value);
  if (res.success) {
    categories.value = normalizeCategories(res?.categories);
    isLoading.value = false;
    closeModal();
    toastMessage(res.message);
  } else {
    toastMessage(res.message, "error");
    isLoading.value = false;
  }
};

const updateCategory = async () => {
  isLoading.value = true;
  const update = await api.updateCategory(category_id.value, category.value);
  if (update.success) {
    categories.value = normalizeCategories(update?.categories);
    isLoading.value = false;
    closeModal();
    if (update.success == true) {
      toastMessage(update.message);
    } else {
      toastMessage(update.message, "warning");
    }
  } else {
    toastMessage(update.message, "error");
    isLoading.value = false;
    closeModal();
  }
};

const deleteCategory = async () => {
  isLoading.value = true;
  const del = await api.deleteCategory(category_id.value);
  if (del.success) {
    isLoading.value = false;
    categories.value = normalizeCategories(del?.categories);
    closeModal();
    toastMessage(del.message);
  } else {
    isLoading.value = false;
    toastMessage(del.message, "error");
    closeModal();
  }
};

const closeModal = () => {
  openModal.value = false;
  isEdit.value = false;
  isDelete.value = false;
  (category.value = ""), (category_id.value = "");
};

const selectCategory = (key, cat, del = false) => {
  category_id.value = key;
  category.value = cat;
  if (del) {
    isDelete.value = true;
  } else {
    isEdit.value = true;
  }
  openModal.value = true;
};
</script>
