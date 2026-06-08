<template>
  <div class="asowp-shapes-panel asowp-space-y-3">
    <template v-if="!isNewShape">
      <section class="asowp-card">
        <div class="asowp-card-inner asowp-flex asowp-items-center asowp-justify-between asowp-gap-4">
          <div>
            <h2 class="asowp-title">{{ __("Shapes", "all-signs-options-pro") }}</h2>
            <p class="asowp-subtitle">{{ __("Manage the shapes available in this config.", "all-signs-options-pro") }}</p>
          </div>
          <div class="asowp-flex asowp-items-center asowp-gap-2">
            <button type="button" @click="newShape" class="asowp-primary-button">
              <PlusIcon class="asowp-w-4 asowp-h-4" />
              {{ __("Add shape", "all-signs-options-pro") }}
            </button>
            <button type="button" @click="goToManageShapes" class="asowp-secondary-button">
              {{ __("Manage shapes", "all-signs-options-pro") }}
            </button>
          </div>
        </div>
      </section>

      <section class="asowp-card">
        <div class="asowp-card-inner">
          <h3 class="asowp-section-title">{{ __("Shapes List", "all-signs-options-pro") }}</h3>
          <table class="asowp-shapes-table asowp-w-full asowp-border-collapse">
            <thead class="asowp-bg-[#f3f3f3]">
              <tr>
                <th class="asowp-w-10"></th>
                <th>{{ __("Preview", "all-signs-options-pro") }}</th>
                <th>{{ __("Label", "all-signs-options-pro") }}</th>
                <th>{{ __("Price", "all-signs-options-pro") }}</th>
                <th>{{ __("Default", "all-signs-options-pro") }}</th>
                <th>{{ __("Surface pricing", "all-signs-options-pro") }}</th>
                <th>{{ __("Actions", "all-signs-options-pro") }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="isFetching">
                <td colspan="7" class="asowp-text-center asowp-py-8">
                  <Loader2Icon class="asowp-w-7 asowp-h-7 asowp-text-[#007a72] asowp-animate-spin asowp-mx-auto" />
                </td>
              </tr>
              <tr v-else-if="shapes.length === 0">
                <td colspan="7" class="asowp-text-center asowp-py-8 asowp-text-[13px] asowp-text-[#616161]">
                  {{ __("No shapes configured.", "all-signs-options-pro") }}
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
                  <GripVerticalIcon class="asowp-drag-icon" />
                </td>
                <td>
                  <div class="asowp-preview-box">
                    <img v-if="getManagedShape(sh)?.icon" :src="getManagedShape(sh).icon" :alt="getManagedShape(sh).name" />
                    <ShapesIcon v-else class="asowp-w-7 asowp-h-7 asowp-text-[#111827]" />
                  </div>
                </td>
                <td class="asowp-row-strong">{{ getManagedShape(sh)?.name || __("Unknown shape", "all-signs-options-pro") }}</td>
                <td>{{ Number(sh.additionalPrice || 0) }}</td>
                <td>
                  <div class="asowp-inline-flex asowp-items-center asowp-gap-2">
                    <span class="asowp-toggle-label">{{ __("No", "all-signs-options-pro") }}</span>
                    <button type="button" @click="!isLoading && selectDefault(key)" :class="['asowp-toggle', sh.isDefault ? 'is-active' : '']"><span></span></button>
                    <span class="asowp-toggle-label">{{ __("Yes", "all-signs-options-pro") }}</span>
                  </div>
                </td>
                <td>{{ sh.enablePricingBySurface ? __("Yes", "all-signs-options-pro") : __("No", "all-signs-options-pro") }}</td>
                <td>
                  <div class="asowp-flex asowp-items-center asowp-gap-3">
                    <button type="button" @click="selectMaterialShape(key, sh)" class="asowp-outline-button">
                      <Edit2Icon class="asowp-w-3.5 asowp-h-3.5" />
                      {{ __("Edit", "all-signs-options-pro") }}
                    </button>
                    <button type="button" @click="selectMaterialShape(key, sh, true)" class="asowp-link-danger">
                      <Trash2Icon class="asowp-w-3.5 asowp-h-3.5" />
                      {{ __("Delete", "all-signs-options-pro") }}
                    </button>
                  </div>
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
        <h3 class="asowp-section-title">{{ isEdit ? __("Edit shape", "all-signs-options-pro") : __("Add shape", "all-signs-options-pro") }}</h3>

        <label class="asowp-field-block">
          <span class="asowp-form-label">{{ __("Shape", "all-signs-options-pro") }}</span>
          <select v-model.number="shape.shapeId" class="asowp-form-input">
            <option v-for="option in availableManagedShapes" :key="option.value" :value="option.value">
              {{ option.name }}
            </option>
          </select>
        </label>

        <div class="asowp-selected-preview">
          <div class="asowp-preview-box asowp-preview-box-lg">
            <img v-if="selectedManagedShape?.icon" :src="selectedManagedShape.icon" :alt="selectedManagedShape.name" />
            <ShapesIcon v-else class="asowp-w-9 asowp-h-9 asowp-text-[#111827]" />
          </div>
          <div>
            <div class="asowp-row-strong">{{ selectedManagedShape?.name || __("None", "all-signs-options-pro") }}</div>
            <p class="asowp-help-text asowp-m-0">{{ selectedManagedShape?.value || __("Preview of the shape selected for this config.", "all-signs-options-pro") }}</p>
          </div>
        </div>

        <label class="asowp-field-block">
          <span class="asowp-form-label">{{ __("Additional price", "all-signs-options-pro") }}</span>
          <input type="number" v-model="shape.additionalPrice" class="asowp-form-input" />
        </label>

        <div class="asowp-field-block asowp-flex asowp-items-center asowp-gap-2">
          <span class="asowp-form-label asowp-m-0">{{ __("Pricing by surface", "all-signs-options-pro") }}</span>
          <button type="button" @click="shape.enablePricingBySurface = !shape.enablePricingBySurface" :class="['asowp-toggle', shape.enablePricingBySurface ? 'is-active' : '']"><span></span></button>
        </div>

        <label v-if="shape.enablePricingBySurface" class="asowp-field-block">
          <span class="asowp-form-label">{{ __("Surface for this price", "all-signs-options-pro") }}</span>
          <input type="number" v-model="shape.surface" class="asowp-form-input" />
        </label>

        <div v-if="selectedManagedShape?.value === 'cut-to-shape'" class="asowp-cut-shape-fields">
          <label v-for="size in ['small', 'medium', 'large']" :key="size">
            <span class="asowp-form-label asowp-capitalize">{{ size }}</span>
            <input type="number" v-model="shape.shapeSize[size]" class="asowp-form-input" />
          </label>
        </div>
      </div>
      <div class="asowp-form-footer">
        <button type="button" @click="back" class="asowp-secondary-button">{{ __("Back to shapes", "all-signs-options-pro") }}</button>
        <button type="button" @click="isEdit ? updateMaterialShapes() : addShapes()" :disabled="isLoading || shape.shapeId < 0" class="asowp-primary-button">
          {{ isLoading ? __("Saving...", "all-signs-options-pro") : __("Save shape", "all-signs-options-pro") }}
        </button>
      </div>
    </section>

    <div v-if="openModal" class="asowp-fixed asowp-inset-0 asowp-z-[20000] asowp-flex asowp-items-center asowp-justify-center">
      <div class="asowp-absolute asowp-inset-0 asowp-bg-black/45" @click="closeModal"></div>
      <div class="asowp-delete-modal">
        <h3 class="asowp-text-[16px] asowp-font-[900] asowp-text-[#303030] asowp-mt-0 asowp-mb-2">{{ __("Delete shape?", "all-signs-options-pro") }}</h3>
        <p class="asowp-text-[13px] asowp-text-[#616161] asowp-mt-0 asowp-mb-5">{{ __("Are you sure you want to delete this shape?", "all-signs-options-pro") }}</p>
        <div class="asowp-flex asowp-justify-end asowp-gap-2">
          <button type="button" @click="closeModal" class="asowp-secondary-button">{{ __("Cancel", "all-signs-options-pro") }}</button>
          <button type="button" @click="deleteShapes" :disabled="isLoading" class="asowp-danger-button">{{ __("Delete", "all-signs-options-pro") }}</button>
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
const props = defineProps({
  materialId: {
    type: [String, Number],
    default: 0,
  },
});
const configID = ref(route.params.configId);
const materialId = computed(() => props.materialId ?? route.query.materialIndex ?? route.params.materialId ?? 0);

const isFetching = ref(true);
const isNewShape = ref(false);
const isLoading = ref(false);
const isEdit = ref(false);
const openModal = ref(false);
const shapeId = ref(null);
const draggedIndex = ref(null);

const shapes = ref([]);
const manageShapes = ref([]);
const shape = ref(createShape());

function createShape(shapeIdValue = -1) {
  return {
    isDefault: false,
    shapeId: shapeIdValue,
    additionalPrice: 0,
    enablePricingBySurface: false,
    surface: 0,
    shapeSize: { small: 20, medium: 40, large: 60 },
  };
}

const getManagedShape = (sh) => manageShapes.value[Number(sh?.shapeId)] || null;

const selectedManagedShape = computed(() => manageShapes.value[Number(shape.value.shapeId)] || null);

const availableManagedShapes = computed(() => manageShapes.value
  .map((item, index) => ({ ...item, value: index }))
  .filter((item) => {
    if (item.value === Number(shape.value.shapeId)) return true;
    return !shapes.value.some((sh) => Number(sh.shapeId) === item.value);
  }));

const normalizeShape = (item) => ({
  ...createShape(),
  ...item,
  isDefault: Boolean(item?.isDefault),
  shapeId: Number(item?.shapeId ?? -1),
  additionalPrice: Number(item?.additionalPrice || 0),
  enablePricingBySurface: Boolean(item?.enablePricingBySurface),
  surface: Number(item?.surface || 0),
  shapeSize: { small: 20, medium: 40, large: 60, ...(item?.shapeSize || {}) },
});

const fetchMaterialShapes = async () => {
  isFetching.value = true;
  try {
    const res = await api.getRequiredOptionShapes(configID.value);
    if (!res.message) {
      manageShapes.value = res.manageShapes || [];
      shapes.value = (res.materialShapes || []).map(normalizeShape);
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
      toastMessage(res?.message || __("Unable to save shapes", "all-signs-options-pro"), "warning");
    }
  } finally {
    isLoading.value = false;
  }
};

const addShapes = async () => {
  const nextShape = normalizeShape(shape.value);
  if (!shapes.value.length) nextShape.isDefault = true;
  shapes.value.push(nextShape);
  await updateShapes();
};

const updateMaterialShapes = async () => {
  if (shapeId.value === null) return;
  shapes.value[shapeId.value] = normalizeShape(shape.value);
  await updateShapes();
};

const deleteShapes = async () => {
  if (shapeId.value === null) return;
  shapes.value.splice(shapeId.value, 1);
  openModal.value = false;
  await updateShapes();
};

const selectMaterialShape = (id, sh, isDeleting = false) => {
  shapeId.value = id;
  shape.value = normalizeShape(JSON.parse(JSON.stringify(sh)));
  if (isDeleting) {
    openModal.value = true;
    return;
  }
  isEdit.value = true;
  isNewShape.value = true;
};

const selectDefault = async (key) => {
  shapes.value.forEach((sh, index) => {
    sh.isDefault = index === key;
  });
  await updateShapes();
};

const newShape = () => {
  const firstAvailable = availableManagedShapes.value[0]?.value;
  if (firstAvailable === undefined) {
    toastMessage(__("No more shapes available", "all-signs-options-pro"), "warning");
    return;
  }
  shapeId.value = null;
  shape.value = createShape(firstAvailable);
  isEdit.value = false;
  isNewShape.value = true;
};

const back = () => {
  isNewShape.value = false;
  isEdit.value = false;
  shapeId.value = null;
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
.asowp-shapes-panel {
  color: #303030;
}

.asowp-card {
  background: #fff;
  border: 1px solid #dfe3e8;
  border-radius: 10px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.08);
}

.asowp-card-inner {
  padding: 18px 20px;
}

.asowp-title {
  margin: 0;
  color: #303030;
  font-size: 20px;
  line-height: 26px;
  font-weight: 900;
}

.asowp-subtitle,
.asowp-help-text {
  display: block;
  margin: 0;
  color: #616161;
  font-size: 12px;
  line-height: 16px;
}

.asowp-section-title {
  margin: 0 0 12px;
  color: #303030;
  font-size: 14px;
  line-height: 20px;
  font-weight: 900;
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

.asowp-drag-icon {
  width: 16px;
  height: 16px;
  color: #667085;
  cursor: grab;
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

.asowp-preview-box-lg {
  width: 58px;
  height: 58px;
  flex: 0 0 58px;
}

.asowp-selected-preview {
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

.asowp-toggle-label {
  color: #616161;
  font-size: 12px;
  line-height: 16px;
}

.asowp-toggle {
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

.asowp-toggle span {
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

.asowp-toggle.is-active {
  background: #007a72;
}

.asowp-toggle.is-active span {
  transform: translateX(16px);
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

.asowp-field-block {
  display: block;
  margin-top: 14px;
}

.asowp-form-body {
  padding-top: 6px;
}

.asowp-form-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding: 14px 20px;
  border-top: 1px solid #e5e7eb;
}

.asowp-cut-shape-fields {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
  margin-top: 14px;
}

.asowp-primary-button,
.asowp-secondary-button,
.asowp-outline-button,
.asowp-danger-button {
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

.asowp-primary-button:disabled,
.asowp-danger-button:disabled {
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

.asowp-link-danger {
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

.asowp-danger-button {
  border: 0;
  background: #8e1f0b;
  color: #fff;
}

.asowp-delete-modal {
  position: relative;
  width: min(420px, 92vw);
  padding: 20px;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 18px 42px rgba(0, 0, 0, 0.2);
}
</style>
