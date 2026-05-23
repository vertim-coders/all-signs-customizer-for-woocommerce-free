<template>
  <div class="asowp-global-shapes asowp-space-y-3">
    <template v-if="!isNewShapes">
      <section class="asowp-card">
        <div class="asowp-card-inner asowp-flex asowp-items-center asowp-justify-between asowp-gap-4">
          <div>
            <h2 class="asowp-page-title">{{ __("Shapes", "all-signs-options-pro") }}</h2>
            <p class="asowp-subtitle">{{ __("Manage the shapes available globally across configurations.", "all-signs-options-pro") }}</p>
          </div>
        </div>
      </section>

      <section class="asowp-card">
        <div class="asowp-card-inner">
          <h3 class="asowp-section-title">{{ __("Shapes List", "all-signs-options-pro") }}</h3>
          <table class="asowp-shapes-table asowp-w-full asowp-border-collapse">
            <thead class="asowp-bg-[#f3f3f3]">
              <tr>
                <th>{{ __("Shape", "all-signs-options-pro") }}</th>
                <th>{{ __("Preview", "all-signs-options-pro") }}</th>
                <th>{{ __("Actions", "all-signs-options-pro") }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="isFetching">
                <td colspan="3" class="asowp-text-center asowp-py-10">
                  <Loader2Icon class="asowp-w-7 asowp-h-7 asowp-text-[#007a72] asowp-animate-spin asowp-mx-auto" />
                </td>
              </tr>
              <tr v-else-if="manageShapes.length === 0">
                <td colspan="3" class="asowp-empty">
                  <SearchIcon class="asowp-w-14 asowp-h-14 asowp-text-[#8c9196]" />
                  <strong>{{ __("No shapes found", "all-signs-options-pro") }}</strong>
                  <span>{{ __("Create shapes to use them inside configurations.", "all-signs-options-pro") }}</span>
                </td>
              </tr>
              <tr v-for="(item, key) in manageShapes" :key="key">
                <td class="asowp-row-strong">{{ item.name }}</td>
                <td>
                  <div class="asowp-preview-box">
                    <img v-if="item.icon" :src="item.icon" :alt="item.name" />
                    <ShapesIcon v-else class="asowp-w-7 asowp-h-7 asowp-text-[#111827]" />
                  </div>
                </td>
                <td>
                  <button type="button" @click="selectShapes(key, item)" class="asowp-outline-button">
                    <Edit2Icon class="asowp-w-3.5 asowp-h-3.5" />
                    {{ __("Edit", "all-signs-options-pro") }}
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </template>

    <section v-else class="asowp-card">
      <div class="asowp-card-inner asowp-flex asowp-justify-end">
        <button type="button" @click="back" class="asowp-secondary-button">{{ __("Back to shapes", "all-signs-options-pro") }}</button>
      </div>
      <div class="asowp-card-inner asowp-form-body">
        <h3 class="asowp-section-title">{{ isEdit ? __("Edit Shape", "all-signs-options-pro") : __("Add new Shape", "all-signs-options-pro") }}</h3>

        <div class="asowp-grid asowp-grid-cols-1 lg:asowp-grid-cols-2 asowp-gap-4">
          <label class="asowp-block">
            <span class="asowp-form-label">{{ __("Name", "all-signs-options-pro") }}</span>
            <input v-model.trim="shape.name" class="asowp-form-input" autocomplete="off" />
          </label>
          <label class="asowp-block">
            <span class="asowp-form-label">{{ __("Value", "all-signs-options-pro") }}</span>
            <input v-model.trim="shape.value" class="asowp-form-input" autocomplete="off" />
          </label>
        </div>

        <label class="asowp-block asowp-mt-3">
          <span class="asowp-form-label">{{ __("Upload icon", "all-signs-options-pro") }}</span>
          <div class="asowp-file-input">
            <button type="button" @click.prevent="selectShapeIcon" class="asowp-file-button">{{ __("Upload Icon", "all-signs-options-pro") }}</button>
            <input v-model="shape.icon" autocomplete="off" />
            <div class="asowp-upload-preview">
              <img v-if="shape.icon" :src="shape.icon" :alt="shape.name" />
            </div>
          </div>
        </label>
      </div>
      <div class="asowp-form-footer">
        <button type="button" @click="back" class="asowp-secondary-button">{{ __("Cancel", "all-signs-options-pro") }}</button>
        <button type="button" @click="updateShape" :disabled="isLoading || !shape.name.trim()" class="asowp-primary-button">
          {{ isLoading ? __("Saving...", "all-signs-options-pro") : __("Save shape", "all-signs-options-pro") }}
        </button>
      </div>
    </section>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import api from "@/admin/Api/api";
import toastMessage from "@/admin/utils/functions";
import { Edit2Icon, Loader2Icon, SearchIcon, ShapesIcon } from "lucide-vue-next";
import { __ } from "@wordpress/i18n";

const isFetching = ref(false);
const isLoading = ref(false);
const isEdit = ref(false);
const isNewShapes = ref(false);
const shapeId = ref(null);
const manageShapes = ref([]);
const shape = ref(emptyShape());

function emptyShape() {
  return { name: "", value: "", icon: "" };
}

const fetchShapes = async () => {
  isFetching.value = true;
  try {
    const result = await api.getGlobalShapes();
    manageShapes.value = result?.message ? [] : result;
  } finally {
    isFetching.value = false;
  }
};

const selectShapes = (id, item) => {
  shapeId.value = id;
  shape.value = JSON.parse(JSON.stringify({ ...emptyShape(), ...item }));
  isEdit.value = true;
  isNewShapes.value = true;
};

const updateShape = async () => {
  if (isLoading.value || !shape.value.name.trim()) return;
  isLoading.value = true;
  try {
    const result = await api.updateShapeInGlobalShapes(shapeId.value, shape.value);
    if (result?.success) {
      toastMessage(result.message);
      await fetchShapes();
      back();
    } else {
      toastMessage(result?.message || __("Unable to save shape", "all-signs-options-pro"), "warning");
    }
  } finally {
    isLoading.value = false;
  }
};

const selectShapeIcon = () => {
  if (!window.wp?.media) return;
  const uploader = window.wp.media({
    title: __("Select Shape icon", "all-signs-options-pro"),
    button: { text: __("Select Icon", "all-signs-options-pro") },
    multiple: false,
  });
  uploader.on("select", () => {
    const attachment = uploader.state().get("selection").first()?.toJSON();
    if (attachment?.type === "image" && attachment.url) {
      shape.value.icon = attachment.url;
    }
  });
  uploader.open();
};

const back = () => {
  isNewShapes.value = false;
  shapeId.value = null;
  shape.value = emptyShape();
  isEdit.value = false;
};

onMounted(fetchShapes);
</script>

<style scoped>
.asowp-card {
  background: #fff;
  border: 1px solid #dfe3e8;
  border-radius: 10px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.08);
}

.asowp-card-inner {
  padding: 18px 20px;
}

.asowp-page-title {
  margin: 0;
  color: #303030;
  font-size: 20px;
  line-height: 26px;
  font-weight: 900;
}

.asowp-section-title {
  margin: 0 0 12px;
  color: #303030;
  font-size: 14px;
  line-height: 20px;
  font-weight: 900;
}

.asowp-subtitle {
  display: block;
  margin: 0;
  color: #616161;
  font-size: 12px;
  line-height: 16px;
}

.asowp-shapes-table,
.asowp-shapes-table thead,
.asowp-shapes-table tbody,
.asowp-shapes-table tr,
.asowp-shapes-table th,
.asowp-shapes-table td {
  border-left: 0 !important;
  border-right: 0 !important;
  outline: 0 !important;
  box-shadow: none !important;
}

.asowp-shapes-table {
  border: 0 !important;
}

.asowp-shapes-table th {
  padding: 9px 12px;
  border-top: 0 !important;
  border-bottom: 0 !important;
  color: #616161;
  font-size: 11px;
  line-height: 16px;
  font-weight: 700;
  text-align: left;
}

.asowp-shapes-table td {
  padding: 8px 12px;
  border-top: 0 !important;
  border-bottom: 0 !important;
  color: #303030;
  font-size: 12px;
  line-height: 18px;
  text-align: left;
}

.asowp-shapes-table tbody tr {
  border-bottom: 1px solid #e5e7eb !important;
}

.asowp-shapes-table tbody tr:last-child {
  border-bottom: 0 !important;
}

.asowp-row-strong {
  font-weight: 900;
}

.asowp-preview-box {
  width: 54px;
  height: 54px;
  overflow: hidden;
  border: 1px solid #d1d5db;
  border-radius: 7px;
  background: #f8fafc;
  display: flex;
  align-items: center;
  justify-content: center;
}

.asowp-preview-box img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.asowp-empty {
  padding: 36px 16px !important;
  text-align: center !important;
  color: #616161;
}

.asowp-empty strong,
.asowp-empty span {
  display: block;
}

.asowp-empty strong {
  margin-top: 10px;
  color: #303030;
  font-size: 18px;
  line-height: 24px;
  font-weight: 900;
}

.asowp-empty span {
  margin-top: 6px;
  font-size: 13px;
  line-height: 18px;
}

.asowp-form-body {
  padding-top: 6px;
}

.asowp-form-label {
  display: block;
  margin-bottom: 4px;
  color: #303030;
  font-size: 12px;
  line-height: 16px;
}

.asowp-form-input {
  box-sizing: border-box;
  width: 100%;
  max-width: 100%;
  height: 38px;
  padding: 6px 10px;
  border: 1px solid #8c9196;
  border-radius: 7px;
  background: #fff;
  color: #303030;
  font-size: 13px;
  line-height: 20px;
  box-shadow: none;
}

.asowp-form-input:focus {
  outline: 2px solid #005bd3;
  outline-offset: 1px;
  border-color: #8c9196;
  box-shadow: none;
}

.asowp-file-input {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) 38px;
  align-items: center;
  gap: 6px;
  min-height: 38px;
  padding: 3px;
  border: 1px solid #8c9196;
  border-radius: 7px;
  background: #fff;
}

.asowp-file-input input {
  min-width: 0;
  border: 0 !important;
  box-shadow: none !important;
  outline: 0 !important;
  font-size: 13px;
}

.asowp-file-button {
  min-height: 30px;
  padding: 6px 11px;
  border: 0;
  border-radius: 6px;
  background: #007a72;
  color: #fff;
  font-size: 12px;
  line-height: 16px;
  font-weight: 800;
  cursor: pointer;
}

.asowp-upload-preview {
  width: 34px;
  height: 30px;
  overflow: hidden;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  background: #fff;
}

.asowp-upload-preview img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.asowp-form-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding: 14px 20px;
  border-top: 1px solid #e5e7eb;
}

.asowp-primary-button,
.asowp-secondary-button,
.asowp-outline-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  min-height: 30px;
  padding: 6px 11px;
  border-radius: 7px;
  font-size: 12px;
  line-height: 16px;
  font-weight: 800;
  cursor: pointer;
}

.asowp-primary-button {
  border: 0;
  background: #007a72;
  color: #fff;
}

.asowp-primary-button:hover {
  background: #00645f;
  color: #fff;
}

.asowp-primary-button:disabled {
  background: #d8d8d8;
  color: #fff;
  cursor: not-allowed;
}

.asowp-secondary-button,
.asowp-outline-button {
  border: 1px solid #c9cccf;
  background: #fff;
  color: #303030;
}

.asowp-secondary-button:hover,
.asowp-outline-button:hover {
  background: #f6f6f7;
  color: #303030;
}
</style>
