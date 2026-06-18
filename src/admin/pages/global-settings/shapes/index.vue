<template>
  <div class="ascwo-global-shapes ascwo-space-y-3">
    <template v-if="!isNewShapes">
      <section class="ascwo-card">
        <div class="ascwo-card-inner ascwo-flex ascwo-items-center ascwo-justify-between ascwo-gap-4">
          <div>
            <h2 class="ascwo-page-title">{{ __("Shapes", "all-signs-customizer-for-woocommerce-pro") }}</h2>
            <p class="ascwo-subtitle">{{ __("Manage the shapes available globally across configurations.", "all-signs-customizer-for-woocommerce-pro") }}</p>
          </div>
        </div>
      </section>

      <section class="ascwo-card">
        <div class="ascwo-card-inner">
          <h3 class="ascwo-section-title">{{ __("Shapes List", "all-signs-customizer-for-woocommerce-pro") }}</h3>
          <table class="ascwo-shapes-table ascwo-w-full ascwo-border-collapse">
            <thead class="ascwo-bg-[#f3f3f3]">
              <tr>
                <th>{{ __("Shape", "all-signs-customizer-for-woocommerce-pro") }}</th>
                <th>{{ __("Preview", "all-signs-customizer-for-woocommerce-pro") }}</th>
                <th>{{ __("Actions", "all-signs-customizer-for-woocommerce-pro") }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="isFetching">
                <td colspan="3" class="ascwo-text-center ascwo-py-10">
                  <Loader2Icon class="ascwo-w-7 ascwo-h-7 ascwo-text-[#007a72] ascwo-animate-spin ascwo-mx-auto" />
                </td>
              </tr>
              <tr v-else-if="manageShapes.length === 0">
                <td colspan="3" class="ascwo-empty">
                  <SearchIcon class="ascwo-w-14 ascwo-h-14 ascwo-text-[#8c9196]" />
                  <strong>{{ __("No shapes found", "all-signs-customizer-for-woocommerce-pro") }}</strong>
                  <span>{{ __("Create shapes to use them inside configurations.", "all-signs-customizer-for-woocommerce-pro") }}</span>
                </td>
              </tr>
              <tr v-for="(item, key) in manageShapes" :key="item.id || item.value || key">
                <td class="ascwo-row-strong">{{ item.name }}</td>
                <td>
                  <div class="ascwo-preview-box">
                    <img v-if="item.icon" :src="item.icon" :alt="item.name" />
                    <ShapesIcon v-else class="ascwo-w-7 ascwo-h-7 ascwo-text-[#111827]" />
                  </div>
                </td>
                <td>
                  <button type="button" @click="selectShapes(item.id || item.value || key, item)" class="ascwo-outline-button">
                    <Edit2Icon class="ascwo-w-3.5 ascwo-h-3.5" />
                    {{ __("Edit", "all-signs-customizer-for-woocommerce-pro") }}
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </template>

    <section v-else class="ascwo-card">
      <div class="ascwo-card-inner ascwo-flex ascwo-justify-end">
        <button type="button" @click="back" class="ascwo-secondary-button">{{ __("Back to shapes", "all-signs-customizer-for-woocommerce-pro") }}</button>
      </div>
      <div class="ascwo-card-inner ascwo-form-body">
        <h3 class="ascwo-section-title">{{ isEdit ? __("Edit Shape", "all-signs-customizer-for-woocommerce-pro") : __("Add new Shape", "all-signs-customizer-for-woocommerce-pro") }}</h3>

        <div class="ascwo-grid ascwo-grid-cols-1 lg:ascwo-grid-cols-2 ascwo-gap-4">
          <label class="ascwo-block">
            <span class="ascwo-form-label">{{ __("Name", "all-signs-customizer-for-woocommerce-pro") }}</span>
            <input v-model.trim="shape.name" class="ascwo-form-input" autocomplete="off" />
          </label>
          <label class="ascwo-block">
            <span class="ascwo-form-label">{{ __("Value", "all-signs-customizer-for-woocommerce-pro") }}</span>
            <input v-model.trim="shape.value" class="ascwo-form-input" autocomplete="off" />
          </label>
        </div>

        <label class="ascwo-block ascwo-mt-3">
          <span class="ascwo-form-label">{{ __("Upload icon", "all-signs-customizer-for-woocommerce-pro") }}</span>
          <div class="ascwo-file-input">
            <button type="button" @click.prevent="selectShapeIcon" class="ascwo-file-button">{{ __("Upload Icon", "all-signs-customizer-for-woocommerce-pro") }}</button>
            <input v-model="shape.icon" autocomplete="off" />
            <div class="ascwo-upload-preview">
              <img v-if="shape.icon" :src="shape.icon" :alt="shape.name" />
            </div>
          </div>
        </label>
      </div>
      <div class="ascwo-form-footer">
        <button type="button" @click="back" class="ascwo-secondary-button">{{ __("Cancel", "all-signs-customizer-for-woocommerce-pro") }}</button>
        <button type="button" @click="updateShape" :disabled="isLoading || !shape.name.trim()" class="ascwo-primary-button">
          {{ isLoading ? __("Saving...", "all-signs-customizer-for-woocommerce-pro") : __("Save shape", "all-signs-customizer-for-woocommerce-pro") }}
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
const shapeId = ref("");
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
  shapeId.value = String(id || "");
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
      toastMessage(result?.message || __("Unable to save shape", "all-signs-customizer-for-woocommerce-pro"), "warning");
    }
  } finally {
    isLoading.value = false;
  }
};

const selectShapeIcon = () => {
  if (!window.wp?.media) return;
  const uploader = window.wp.media({
    title: __("Select Shape icon", "all-signs-customizer-for-woocommerce-pro"),
    button: { text: __("Select Icon", "all-signs-customizer-for-woocommerce-pro") },
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
  shapeId.value = "";
  shape.value = emptyShape();
  isEdit.value = false;
};

onMounted(fetchShapes);
</script>

<style scoped>
.ascwo-card {
  background: #fff;
  border: 1px solid #dfe3e8;
  border-radius: 10px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.08);
}

.ascwo-card-inner {
  padding: 18px 20px;
}

.ascwo-page-title {
  margin: 0;
  color: #303030;
  font-size: 20px;
  line-height: 26px;
  font-weight: 900;
}

.ascwo-section-title {
  margin: 0 0 12px;
  color: #303030;
  font-size: 14px;
  line-height: 20px;
  font-weight: 900;
}

.ascwo-subtitle {
  display: block;
  margin: 0;
  color: #616161;
  font-size: 12px;
  line-height: 16px;
}

.ascwo-shapes-table,
.ascwo-shapes-table thead,
.ascwo-shapes-table tbody,
.ascwo-shapes-table tr,
.ascwo-shapes-table th,
.ascwo-shapes-table td {
  border-left: 0 !important;
  border-right: 0 !important;
  outline: 0 !important;
  box-shadow: none !important;
}

.ascwo-shapes-table {
  border: 0 !important;
}

.ascwo-shapes-table th {
  padding: 9px 12px;
  border-top: 0 !important;
  border-bottom: 0 !important;
  color: #616161;
  font-size: 11px;
  line-height: 16px;
  font-weight: 700;
  text-align: left;
}

.ascwo-shapes-table td {
  padding: 8px 12px;
  border-top: 0 !important;
  border-bottom: 0 !important;
  color: #303030;
  font-size: 12px;
  line-height: 18px;
  text-align: left;
}

.ascwo-shapes-table tbody tr {
  border-bottom: 1px solid #e5e7eb !important;
}

.ascwo-shapes-table tbody tr:last-child {
  border-bottom: 0 !important;
}

.ascwo-row-strong {
  font-weight: 900;
}

.ascwo-preview-box {
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

.ascwo-preview-box img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.ascwo-empty {
  padding: 36px 16px !important;
  text-align: center !important;
  color: #616161;
}

.ascwo-empty strong,
.ascwo-empty span {
  display: block;
}

.ascwo-empty strong {
  margin-top: 10px;
  color: #303030;
  font-size: 18px;
  line-height: 24px;
  font-weight: 900;
}

.ascwo-empty span {
  margin-top: 6px;
  font-size: 13px;
  line-height: 18px;
}

.ascwo-form-body {
  padding-top: 6px;
}

.ascwo-form-label {
  display: block;
  margin-bottom: 4px;
  color: #303030;
  font-size: 12px;
  line-height: 16px;
}

.ascwo-form-input {
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

.ascwo-form-input:focus {
  outline: 2px solid #005bd3;
  outline-offset: 1px;
  border-color: #8c9196;
  box-shadow: none;
}

.ascwo-file-input {
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

.ascwo-file-input input {
  min-width: 0;
  border: 0 !important;
  box-shadow: none !important;
  outline: 0 !important;
  font-size: 13px;
}

.ascwo-file-button {
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

.ascwo-upload-preview {
  width: 34px;
  height: 30px;
  overflow: hidden;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  background: #fff;
}

.ascwo-upload-preview img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.ascwo-form-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding: 14px 20px;
  border-top: 1px solid #e5e7eb;
}

.ascwo-primary-button,
.ascwo-secondary-button,
.ascwo-outline-button {
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

.ascwo-primary-button {
  border: 0;
  background: #007a72;
  color: #fff;
}

.ascwo-primary-button:hover {
  background: #00645f;
  color: #fff;
}

.ascwo-primary-button:disabled {
  background: #d8d8d8;
  color: #fff;
  cursor: not-allowed;
}

.ascwo-secondary-button,
.ascwo-outline-button {
  border: 1px solid #c9cccf;
  background: #fff;
  color: #303030;
}

.ascwo-secondary-button:hover,
.ascwo-outline-button:hover {
  background: #f6f6f7;
  color: #303030;
}
</style>
