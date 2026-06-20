<template>
  <div class="ascwo-shapes-panel ascwo-space-y-3">
    <template v-if="!isNewShape">
      <section class="ascwo-card">
        <div class="ascwo-card-inner ascwo-flex ascwo-items-center ascwo-justify-between ascwo-gap-4">
          <div>
            <h2 class="ascwo-title">{{ __("Shapes", "all-signs-customizer-for-woocommerce-pro") }}</h2>
            <p class="ascwo-subtitle">{{ __("Manage the shapes available in this config.", "all-signs-customizer-for-woocommerce-pro") }}</p>
          </div>
          <div class="ascwo-flex ascwo-items-center ascwo-gap-2">
            <button type="button" @click="newShape" class="ascwo-primary-button">
              <PlusIcon class="ascwo-w-4 ascwo-h-4" />
              {{ __("Add shape", "all-signs-customizer-for-woocommerce-pro") }}
            </button>
            <button type="button" @click="goToManageShapes" class="ascwo-secondary-button">
              {{ __("Manage shapes", "all-signs-customizer-for-woocommerce-pro") }}
            </button>
          </div>
        </div>
      </section>

      <section class="ascwo-card">
        <div class="ascwo-card-inner">
          <h3 class="ascwo-section-title">{{ __("Shapes List", "all-signs-customizer-for-woocommerce-pro") }}</h3>
          <table class="ascwo-shapes-table ascwo-w-full ascwo-border-collapse">
            <thead class="ascwo-bg-[#f3f3f3]">
              <tr>
                <th class="ascwo-w-10"></th>
                <th>{{ __("Preview", "all-signs-customizer-for-woocommerce-pro") }}</th>
                <th>{{ __("Label", "all-signs-customizer-for-woocommerce-pro") }}</th>
                <th>{{ __("Price", "all-signs-customizer-for-woocommerce-pro") }}</th>
                <th>{{ __("Default", "all-signs-customizer-for-woocommerce-pro") }}</th>
                <th>{{ __("Actions", "all-signs-customizer-for-woocommerce-pro") }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="isFetching">
                <td colspan="6" class="ascwo-text-center ascwo-py-8">
                  <Loader2Icon class="ascwo-w-7 ascwo-h-7 ascwo-text-[#007a72] ascwo-animate-spin ascwo-mx-auto" />
                </td>
              </tr>
              <tr v-else-if="shapes.length === 0">
                <td colspan="6" class="ascwo-text-center ascwo-py-8 ascwo-text-[13px] ascwo-text-[#616161]">
                  {{ __("No shapes configured.", "all-signs-customizer-for-woocommerce-pro") }}
                </td>
              </tr>
              <tr
                v-for="(sh, key) in shapes"
                :key="`${sh.shapeId}-${key}`"
                draggable="true"
                @dragstart="onDragStart(key)"
                @dragover.prevent
                @drop="onDrop(key)"
              >
                <td>
                  <GripVerticalIcon class="ascwo-drag-icon" />
                </td>
                <td>
                  <div class="ascwo-preview-box">
                    <img v-if="getManagedShape(sh)?.icon" :src="getManagedShape(sh).icon" :alt="getManagedShape(sh).name" />
                    <ShapesIcon v-else class="ascwo-w-7 ascwo-h-7 ascwo-text-[#111827]" />
                  </div>
                </td>
                <td class="ascwo-row-strong">{{ getManagedShape(sh)?.name || __("Unknown shape", "all-signs-customizer-for-woocommerce-pro") }}</td>
                <td>{{ Number(sh.additionalPrice || 0) }}</td>
                <td>
                  <div class="ascwo-inline-flex ascwo-items-center ascwo-gap-2">
                    <span class="ascwo-toggle-label">{{ __("No", "all-signs-customizer-for-woocommerce-pro") }}</span>
                    <button type="button" :disabled="isLoading" @click="selectDefault(sh.id)" :class="['ascwo-toggle', sh.isDefault ? 'is-active' : '', defaultActionId === sh.id ? 'is-loading' : '']"><span></span></button>
                    <span class="ascwo-toggle-label">{{ __("Yes", "all-signs-customizer-for-woocommerce-pro") }}</span>
                  </div>
                </td>
                <td>
                  <div class="ascwo-flex ascwo-items-center ascwo-gap-3">
                    <button type="button" @click="selectMaterialShape(sh.shapeId, sh)" class="ascwo-outline-button">
                      <Edit2Icon class="ascwo-w-3.5 ascwo-h-3.5" />
                      {{ __("Edit", "all-signs-customizer-for-woocommerce-pro") }}
                    </button>
                    <button type="button" @click="selectMaterialShape(sh.shapeId, sh, true)" class="ascwo-link-danger">
                      <Trash2Icon class="ascwo-w-3.5 ascwo-h-3.5" />
                      {{ __("Delete", "all-signs-customizer-for-woocommerce-pro") }}
                    </button>
                  </div>
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
        <h3 class="ascwo-section-title">{{ isEdit ? __("Edit shape", "all-signs-customizer-for-woocommerce-pro") : __("Add shape", "all-signs-customizer-for-woocommerce-pro") }}</h3>

        <label class="ascwo-field-block">
          <span class="ascwo-form-label">{{ __("Shape", "all-signs-customizer-for-woocommerce-pro") }}</span>
          <select v-model="shape.shapeId" class="ascwo-form-input">
            <option v-for="option in availableManagedShapes" :key="option.value" :value="option.value">
              {{ option.name }}
            </option>
          </select>
        </label>

        <div class="ascwo-selected-preview">
          <div class="ascwo-preview-box ascwo-preview-box-lg">
            <img v-if="selectedManagedShape?.icon" :src="selectedManagedShape.icon" :alt="selectedManagedShape.name" />
            <ShapesIcon v-else class="ascwo-w-9 ascwo-h-9 ascwo-text-[#111827]" />
          </div>
          <div>
            <div class="ascwo-row-strong">{{ selectedManagedShape?.name || __("None", "all-signs-customizer-for-woocommerce-pro") }}</div>
            <p class="ascwo-help-text ascwo-m-0">{{ selectedManagedShape?.value || __("Preview of the shape selected for this config.", "all-signs-customizer-for-woocommerce-pro") }}</p>
          </div>
        </div>

        <label class="ascwo-field-block">
          <span class="ascwo-form-label">{{ __("Additional price", "all-signs-customizer-for-woocommerce-pro") }}</span>
          <input type="number" v-model="shape.additionalPrice" class="ascwo-form-input" />
        </label>

        <div v-if="selectedManagedShape?.value === 'cut-to-shape'" class="ascwo-cut-shape-fields">
          <label v-for="size in ['small', 'medium', 'large']" :key="size">
            <span class="ascwo-form-label ascwo-capitalize">{{ size }}</span>
            <input type="number" v-model="shape.shapeSize[size]" class="ascwo-form-input" />
          </label>
        </div>
      </div>
      <div class="ascwo-form-footer">
        <button type="button" @click="back" class="ascwo-secondary-button">{{ __("Back to shapes", "all-signs-customizer-for-woocommerce-pro") }}</button>
        <button type="button" @click="isEdit ? updateMaterialShapes() : addShapes()" :disabled="isLoading || !shape.shapeId" class="ascwo-primary-button">
          {{ isLoading ? __("Saving...", "all-signs-customizer-for-woocommerce-pro") : __("Save shape", "all-signs-customizer-for-woocommerce-pro") }}
        </button>
      </div>
    </section>

    <div v-if="openModal" class="ascwo-fixed ascwo-inset-0 ascwo-z-[20000] ascwo-flex ascwo-items-center ascwo-justify-center">
      <div class="ascwo-absolute ascwo-inset-0 ascwo-bg-black/45" @click="closeModal"></div>
      <div class="ascwo-delete-modal">
        <h3 class="ascwo-text-[16px] ascwo-font-[900] ascwo-text-[#303030] ascwo-mt-0 ascwo-mb-2">{{ __("Delete shape?", "all-signs-customizer-for-woocommerce-pro") }}</h3>
        <p class="ascwo-text-[13px] ascwo-text-[#616161] ascwo-mt-0 ascwo-mb-5">{{ __("Are you sure you want to delete this shape?", "all-signs-customizer-for-woocommerce-pro") }}</p>
        <div class="ascwo-flex ascwo-justify-end ascwo-gap-2">
          <button type="button" @click="closeModal" class="ascwo-secondary-button">{{ __("Cancel", "all-signs-customizer-for-woocommerce-pro") }}</button>
          <button type="button" @click="deleteShapes" :disabled="isLoading" class="ascwo-danger-button">{{ __("Delete", "all-signs-customizer-for-woocommerce-pro") }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import api from "@/admin/Api/api";
import { computed, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import toastMessage from "@/admin/utils/functions";
import { Edit2Icon, GripVerticalIcon, Loader2Icon, PlusIcon, ShapesIcon, Trash2Icon } from "lucide-vue-next";
import { __ } from "@wordpress/i18n";

const route = useRoute();
const router = useRouter();
const configID = ref(route.params.configId);

const isFetching = ref(true);
const isNewShape = ref(false);
const isLoading = ref(false);
const defaultActionId = ref("");
const isEdit = ref(false);
const openModal = ref(false);
const shapeId = ref("");
const draggedIndex = ref(null);

const shapes = ref([]);
const manageShapes = ref([]);
const shape = ref(createShape());

function createShape(shapeIdValue = "") {
  return {
    isDefault: false,
    shapeId: shapeIdValue,
    additionalPrice: 0,
    surface: 0,
    shapeSize: { small: 20, medium: 40, large: 60 },
  };
}

const getManagedShape = (sh) => manageShapes.value.find((item) => String(item?.id ?? item?.value ?? "") === String(sh?.shapeId)) || null;

const selectedManagedShape = computed(() => manageShapes.value.find((item) => String(item?.id ?? item?.value ?? "") === String(shape.value.shapeId)) || null);

const availableManagedShapes = computed(() => manageShapes.value
  .map((item, index) => {
    const value = String(item?.id ?? item?.value ?? `shape-${index + 1}`);
    return { ...item, value };
  })
  .filter((item) => {
    if (String(item.value) === String(shape.value.shapeId)) return true;
    return !shapes.value.some((sh) => String(sh.shapeId) === String(item.value));
  }));

const normalizeShape = (item) => ({
  ...createShape(),
  ...item,
  isDefault: Boolean(item?.isDefault),
  shapeId: String(item?.shapeId ?? ""),
  additionalPrice: Number(item?.additionalPrice || 0),
  enablePricingBySurface: false,
  surface: Number(item?.surface || 0),
  shapeSize: { small: 20, medium: 40, large: 60, ...(item?.shapeSize || {}) },
});

const fetchMaterialShapes = async () => {
  isFetching.value = true;
  try {
    const res = await api.getRequiredOptionShapes(configID.value);
    if (!res.message) {
      manageShapes.value = res.manageShapes || [];
      shapes.value = (res.items || []).map(normalizeShape);
    }
  } finally {
    isFetching.value = false;
  }
};

const updateShapes = async () => {
  if (isLoading.value) return;
  isLoading.value = true;
  try {
    const res = await api.updateRequiredOptionShapes(configID.value, shapes.value);
    if (res?.success) {
      toastMessage(res.message);
      isNewShape.value = false;
      isEdit.value = false;
      await fetchMaterialShapes();
    } else {
      toastMessage(res?.message || __("Unable to save shapes", "all-signs-customizer-for-woocommerce-pro"), "warning");
    }
  } finally {
    isLoading.value = false;
  }
};

const addShapes = async () => {
  isLoading.value = true;
  try {
    const payload = normalizeShape(shape.value);
    delete payload.enablePricingBySurface;
    payload.isDefault = !shapes.value.length;
    const res = await api.addRequiredOptionShapeItem(configID.value, payload);
    if (res?.success) {
      toastMessage(res.message);
      isNewShape.value = false;
      isEdit.value = false;
      await fetchMaterialShapes();
    } else {
      toastMessage(res?.message || __("Unable to add shape", "all-signs-customizer-for-woocommerce-pro"), "warning");
    }
  } finally {
    isLoading.value = false;
  }
};

const updateMaterialShapes = async () => {
  if (!shapeId.value) return;
  isLoading.value = true;
  try {
    const payload = normalizeShape(shape.value);
    delete payload.enablePricingBySurface;
    const res = await api.updateRequiredOptionShapeItem(configID.value, shapeId.value, payload);
    if (res?.success) {
      toastMessage(res.message);
      isNewShape.value = false;
      isEdit.value = false;
      await fetchMaterialShapes();
    } else {
      toastMessage(res?.message || __("Unable to update shape", "all-signs-customizer-for-woocommerce-pro"), "warning");
    }
  } finally {
    isLoading.value = false;
  }
};

const deleteShapes = async () => {
  if (!shapeId.value) return;
  openModal.value = false;
  isLoading.value = true;
  try {
    const res = await api.deleteRequiredOptionShapeItem(configID.value, shapeId.value);
    if (res?.success) {
      toastMessage(res.message);
      isNewShape.value = false;
      isEdit.value = false;
      await fetchMaterialShapes();
    } else {
      toastMessage(res?.message || __("Unable to delete shape", "all-signs-customizer-for-woocommerce-pro"), "warning");
    }
  } finally {
    isLoading.value = false;
  }
};

const selectMaterialShape = (id, sh, isDeleting = false) => {
  shapeId.value = String(id || "");
  shape.value = normalizeShape(JSON.parse(JSON.stringify(sh)));
  if (isDeleting) {
    openModal.value = true;
    return;
  }
  isEdit.value = true;
  isNewShape.value = true;
};

const selectDefault = async (key) => {
  if (!key || isLoading.value) return;
  isLoading.value = true;
  defaultActionId.value = String(key);
  try {
    const res = await api.setRequiredOptionDefault(configID.value, "shapes", key);
    if (res?.success) {
      toastMessage(res.message || __("Default shape updated", "all-signs-customizer-for-woocommerce-pro"));
      await fetchMaterialShapes();
    } else {
      toastMessage(res?.message || __("Unable to update default shape", "all-signs-customizer-for-woocommerce-pro"), "warning");
    }
  } finally {
    isLoading.value = false;
    defaultActionId.value = "";
  }
};

const newShape = () => {
  const firstAvailable = availableManagedShapes.value[0]?.value;
  if (firstAvailable === undefined) {
    toastMessage(__("No more shapes available", "all-signs-customizer-for-woocommerce-pro"), "warning");
    return;
  }
  shapeId.value = "";
  shape.value = createShape(firstAvailable);
  isEdit.value = false;
  isNewShape.value = true;
};

const back = () => {
  isNewShape.value = false;
  isEdit.value = false;
  shapeId.value = "";
  shape.value = createShape();
};

const closeModal = () => openModal.value = false;

const onDragStart = (index) => {
  draggedIndex.value = index;
};

const onDrop = async (index) => {
  if (draggedIndex.value === null || draggedIndex.value === index) return;
  const rows = [...shapes.value];
  const [moved] = rows.splice(draggedIndex.value, 1);
  rows.splice(index, 0, moved);
  shapes.value = rows;
  draggedIndex.value = null;
  await updateShapes();
};

const goToManageShapes = () => {
  router.push({ path: "/settings/shape", query: { returnTo: route.fullPath } });
};

onMounted(fetchMaterialShapes);
</script>

<style scoped>
.ascwo-shapes-panel {
  color: #303030;
}

.ascwo-card {
  background: #fff;
  border: 1px solid #dfe3e8;
  border-radius: 10px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.08);
}

.ascwo-card-inner {
  padding: 18px 20px;
}

.ascwo-title {
  margin: 0;
  color: #303030;
  font-size: 20px;
  line-height: 26px;
  font-weight: 900;
}

.ascwo-subtitle,
.ascwo-help-text {
  display: block;
  margin: 0;
  color: #616161;
  font-size: 12px;
  line-height: 16px;
}

.ascwo-section-title {
  margin: 0 0 12px;
  color: #303030;
  font-size: 14px;
  line-height: 20px;
  font-weight: 900;
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

.ascwo-drag-icon {
  width: 16px;
  height: 16px;
  color: #667085;
  cursor: grab;
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

.ascwo-preview-box-lg {
  width: 58px;
  height: 58px;
  flex: 0 0 58px;
}

.ascwo-selected-preview {
  display: flex;
  align-items: center;
  gap: 12px;
  min-height: 72px;
  margin-top: 14px;
  padding: 10px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: #f7f7f7;
}

.ascwo-toggle-label {
  color: #616161;
  font-size: 12px;
  line-height: 16px;
}

.ascwo-toggle {
  width: 38px;
  height: 22px;
  padding: 0;
  border: 0;
  border-radius: 999px;
  background: #d9dee8;
  position: relative;
  cursor: pointer;
  transition: background 120ms ease;
}

.ascwo-toggle span {
  width: 18px;
  height: 18px;
  border-radius: 999px;
  background: #fff;
  position: absolute;
  left: 2px;
  top: 2px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.18);
  transition: transform 120ms ease;
}

.ascwo-toggle.is-active {
  background: #007a72;
}

.ascwo-toggle.is-active span {
  transform: translateX(16px);
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

.ascwo-field-block {
  display: block;
  margin-top: 14px;
}

.ascwo-form-body {
  padding-top: 6px;
}

.ascwo-form-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding: 14px 20px;
  border-top: 1px solid #e5e7eb;
}

.ascwo-cut-shape-fields {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
  margin-top: 14px;
}

.ascwo-primary-button,
.ascwo-secondary-button,
.ascwo-outline-button,
.ascwo-danger-button {
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

.ascwo-primary-button:disabled,
.ascwo-danger-button:disabled {
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

.ascwo-link-danger {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  border: 0;
  background: transparent;
  color: #8e1f0b;
  font-size: 12px;
  line-height: 16px;
  font-weight: 800;
  cursor: pointer;
}

.ascwo-danger-button {
  border: 0;
  background: #8e1f0b;
  color: #fff;
}

.ascwo-delete-modal {
  position: relative;
  width: min(420px, 92vw);
  padding: 20px;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 18px 42px rgba(0, 0, 0, 0.2);
}
</style>
