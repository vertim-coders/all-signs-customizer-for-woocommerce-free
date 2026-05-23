<template>
  <div class="asowp-fixing-panel asowp-space-y-3">
    <template v-if="!isNewFixing">
      <section class="asowp-card">
        <div class="asowp-card-inner asowp-flex asowp-items-center asowp-justify-between asowp-gap-4">
          <div>
            <h2 class="asowp-title">{{ __("Fixing Methods", "all-signs-options-pro") }}</h2>
            <p class="asowp-subtitle">{{ __("Manage the fixing methods available in this config.", "all-signs-options-pro") }}</p>
          </div>
          <div class="asowp-flex asowp-items-center asowp-gap-2">
            <button type="button" @click="newFixing" class="asowp-primary-button">
              <PlusIcon class="asowp-w-4 asowp-h-4" />
              {{ __("Add fixing method", "all-signs-options-pro") }}
            </button>
            <button type="button" @click="goToManageFixingMethods" class="asowp-secondary-button">
              {{ __("Manage fixing methods", "all-signs-options-pro") }}
            </button>
          </div>
        </div>
      </section>

      <section class="asowp-card">
        <div class="asowp-card-inner">
          <h3 class="asowp-section-title">{{ __("Fixing Methods List", "all-signs-options-pro") }}</h3>
          <table class="asowp-fixing-table asowp-w-full asowp-border-collapse">
            <thead class="asowp-bg-[#f3f3f3]">
              <tr>
                <th class="asowp-w-10"></th>
                <th>{{ __("Preview", "all-signs-options-pro") }}</th>
                <th>{{ __("Label", "all-signs-options-pro") }}</th>
                <th>{{ __("Price", "all-signs-options-pro") }}</th>
                <th>{{ __("Default", "all-signs-options-pro") }}</th>
                <th>{{ __("Actions", "all-signs-options-pro") }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="isFetching">
                <td colspan="6" class="asowp-text-center asowp-py-8">
                  <Loader2Icon class="asowp-w-7 asowp-h-7 asowp-text-[#007a72] asowp-animate-spin asowp-mx-auto" />
                </td>
              </tr>
              <tr v-else-if="fixingMethods.length === 0">
                <td colspan="6" class="asowp-text-center asowp-py-8 asowp-text-[13px] asowp-text-[#616161]">
                  {{ __("No fixing methods configured.", "all-signs-options-pro") }}
                </td>
              </tr>
              <tr
                v-for="(fx, key) in fixingMethods"
                :key="`${fx.fixingMethodId}-${key}`"
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
                    <img v-if="getManagedMethod(fx)?.icon" :src="getManagedMethod(fx).icon" :alt="getManagedMethod(fx).name" />
                    <WrenchIcon v-else class="asowp-w-6 asowp-h-6 asowp-text-[#616161]" />
                  </div>
                </td>
                <td class="asowp-row-strong">{{ getManagedMethod(fx)?.name || __("Unknown method", "all-signs-options-pro") }}</td>
                <td>{{ Number(fx.additionalPrice || 0) }}</td>
                <td>
                  <div class="asowp-inline-flex asowp-items-center asowp-gap-2">
                    <span class="asowp-toggle-label">{{ __("No", "all-signs-options-pro") }}</span>
                    <button type="button" @click="!isLoading && selectDefault(key)" :class="['asowp-toggle', fx.isDefault ? 'is-active' : '']"><span></span></button>
                    <span class="asowp-toggle-label">{{ __("Yes", "all-signs-options-pro") }}</span>
                  </div>
                </td>
                <td>
                  <div class="asowp-flex asowp-items-center asowp-gap-3">
                    <button type="button" @click="selectMaterialFixingMethod(key, fx)" class="asowp-outline-button">
                      <Edit2Icon class="asowp-w-3.5 asowp-h-3.5" />
                      {{ __("Edit", "all-signs-options-pro") }}
                    </button>
                    <button type="button" @click="selectMaterialFixingMethod(key, fx, true)" class="asowp-link-danger">
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
        <button type="button" @click="back" class="asowp-secondary-button">{{ __("Back to fixing methods", "all-signs-options-pro") }}</button>
      </div>
      <div class="asowp-card-inner asowp-form-body">
        <h3 class="asowp-section-title">{{ isEdit ? __("Edit fixing method", "all-signs-options-pro") : __("Add fixing method", "all-signs-options-pro") }}</h3>

        <div class="asowp-field-block">
          <span class="asowp-form-label">{{ __("Source", "all-signs-options-pro") }}</span>
          <div class="asowp-flex asowp-items-center asowp-gap-5">
            <div class="asowp-inline-flex asowp-items-center asowp-gap-2">
              <span class="asowp-toggle-label">{{ __("Managed", "all-signs-options-pro") }}</span>
              <button type="button" class="asowp-toggle is-active"><span></span></button>
            </div>
            <div class="asowp-inline-flex asowp-items-center asowp-gap-2">
              <span class="asowp-toggle-label">{{ __("Custom", "all-signs-options-pro") }}</span>
              <button type="button" class="asowp-toggle" disabled><span></span></button>
            </div>
          </div>
        </div>

        <label class="asowp-field-block">
          <span class="asowp-form-label">{{ __("Fixing method", "all-signs-options-pro") }}</span>
          <select v-model.number="fixingMethod.fixingMethodId" class="asowp-form-input">
            <option :value="-1">{{ __("None", "all-signs-options-pro") }}</option>
            <option v-for="option in availableManagedMethods" :key="option.value" :value="option.value">
              {{ option.name }}
            </option>
          </select>
          <span class="asowp-help-text">{{ __("Choose a fixing method from your managed fixing methods library. If the option is missing, add it in `Manage fixing methods` first.", "all-signs-options-pro") }}</span>
        </label>

        <div class="asowp-selected-preview">
          <div class="asowp-preview-box asowp-preview-box-lg">
            <img v-if="selectedManagedMethod?.icon" :src="selectedManagedMethod.icon" :alt="selectedManagedMethod.name" />
            <BanIcon v-else class="asowp-w-9 asowp-h-9 asowp-text-[#111827]" />
          </div>
          <div>
            <div class="asowp-row-strong">{{ selectedManagedMethod?.name || __("None", "all-signs-options-pro") }}</div>
            <p class="asowp-help-text asowp-m-0">{{ selectedManagedMethod?.description || __("Preview of the fixing method selected for this config.", "all-signs-options-pro") }}</p>
          </div>
        </div>

        <label class="asowp-field-block">
          <span class="asowp-form-label">{{ __("Additional price", "all-signs-options-pro") }}</span>
          <input type="number" v-model="fixingMethod.additionalPrice" class="asowp-form-input" />
        </label>

        <label class="asowp-field-block">
          <span class="asowp-form-label">{{ __("Exclude sizes", "all-signs-options-pro") }}</span>
          <select v-model="fixingMethod.excludeSizes" multiple class="asowp-form-input asowp-multi-input">
            <option v-for="size in MaterialSimpleSizes" :key="size.value" :value="size.value">{{ size.name }}</option>
          </select>
          <span class="asowp-help-text">{{ __("Hide this fixing method for selected sizes.", "all-signs-options-pro") }}</span>
          <span class="asowp-help-text">{{ exclusionSummary(fixingMethod.excludeSizes, __("No sizes excluded.", "all-signs-options-pro")) }}</span>
        </label>

        <label class="asowp-field-block">
          <span class="asowp-form-label">{{ __("Exclude shapes", "all-signs-options-pro") }}</span>
          <select v-model="fixingMethod.excludeShapes" multiple class="asowp-form-input asowp-multi-input">
            <option v-for="shape in MaterialSimpleShapes" :key="shape.value" :value="shape.value">{{ shape.name }}</option>
          </select>
          <span class="asowp-help-text">{{ __("Hide this fixing method for selected shapes.", "all-signs-options-pro") }}</span>
          <span class="asowp-help-text">{{ exclusionSummary(fixingMethod.excludeShapes, __("No shapes excluded.", "all-signs-options-pro")) }}</span>
        </label>
      </div>
      <div class="asowp-form-footer">
        <button type="button" @click="back" class="asowp-secondary-button">{{ __("Back to fixing methods", "all-signs-options-pro") }}</button>
        <button type="button" @click="isEdit ? updateMaterialFixingMethods() : addFixingMethods()" :disabled="isLoading || fixingMethod.fixingMethodId < 0" class="asowp-primary-button">
          {{ isLoading ? __("Saving...", "all-signs-options-pro") : __("Save fixing method", "all-signs-options-pro") }}
        </button>
      </div>
    </section>

    <div v-if="openModal" class="asowp-fixed asowp-inset-0 asowp-z-[20000] asowp-flex asowp-items-center asowp-justify-center">
      <div class="asowp-absolute asowp-inset-0 asowp-bg-black/45" @click="closeModal"></div>
      <div class="asowp-delete-modal">
        <h3 class="asowp-text-[16px] asowp-font-[900] asowp-text-[#303030] asowp-mt-0 asowp-mb-2">{{ __("Delete fixing method?", "all-signs-options-pro") }}</h3>
        <p class="asowp-text-[13px] asowp-text-[#616161] asowp-mt-0 asowp-mb-5">{{ __("Are you sure you want to delete this fixing method?", "all-signs-options-pro") }}</p>
        <div class="asowp-flex asowp-justify-end asowp-gap-2">
          <button type="button" @click="closeModal" class="asowp-secondary-button">{{ __("Cancel", "all-signs-options-pro") }}</button>
          <button type="button" @click="deleteFixingMethods" :disabled="isLoading" class="asowp-danger-button">{{ __("Delete", "all-signs-options-pro") }}</button>
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
import { BanIcon, Edit2Icon, GripVerticalIcon, Loader2Icon, PlusIcon, Trash2Icon, WrenchIcon } from "lucide-vue-next";
import { __ } from "@wordpress/i18n";

const route = useRoute();
const router = useRouter();
const configID = ref(route.params.configId);
const materialId = ref(route.params.materialId);

const MaterialSimpleSizes = ref([]);
const MaterialSimpleShapes = ref([]);
const isFetching = ref(false);
const isNewFixing = ref(false);
const isLoading = ref(false);
const isEdit = ref(false);
const openModal = ref(false);
const fixingMethodId = ref(null);
const draggedIndex = ref(null);

const fixingMethods = ref([]);
const manageFixingMethods = ref([]);
const fixingMethod = ref({ isDefault: false, fixingMethodId: -1, excludeSizes: [], excludeShapes: [], additionalPrice: 0 });

const normalizeArray = (value) => Array.isArray(value) ? value : [];

const getManagedMethod = (fx) => manageFixingMethods.value[Number(fx?.fixingMethodId)] || null;

const selectedManagedMethod = computed(() => manageFixingMethods.value[Number(fixingMethod.value.fixingMethodId)] || null);

const availableManagedMethods = computed(() => manageFixingMethods.value
  .map((method, index) => ({ ...method, value: index }))
  .filter((method) => {
    if (method.value === Number(fixingMethod.value.fixingMethodId)) return true;
    return !fixingMethods.value.some((fx) => Number(fx.fixingMethodId) === method.value);
  }));

const fetchMaterialShapes = async () => {
  const res = await api.getMaterialSimpleShapes(configID.value, materialId.value);
  if (!res.message && res.materialShapes) {
    MaterialSimpleShapes.value = res.materialShapes.map((shape) => ({
      name: res.manageShapes?.[shape.shapeId]?.name || "Shape",
      value: shape.shapeId,
    }));
  }
};

const fetchMaterialFixingMethods = async () => {
  isFetching.value = true;
  try {
    const res = await api.getMaterialSimpleFixingMethods(configID.value, materialId.value);
    MaterialSimpleSizes.value = (res.materialSizes || []).map((size, index) => ({ name: size.label, value: index }));
    if (!res.message) {
      fixingMethods.value = (res.materialFixingMethods || []).map((fx) => ({
        isDefault: Boolean(fx.isDefault),
        fixingMethodId: Number(fx.fixingMethodId ?? -1),
        excludeSizes: normalizeArray(fx.excludeSizes),
        excludeShapes: normalizeArray(fx.excludeShapes),
        additionalPrice: Number(fx.additionalPrice || 0),
      }));
      manageFixingMethods.value = res.manageFixingMethods || [];
    }
  } finally {
    isFetching.value = false;
  }
};

const updateFixingMethods = async () => {
  if (isLoading.value) return;
  isLoading.value = true;
  try {
    const res = await api.updateMaterialSimpleFixingMethods(configID.value, materialId.value, fixingMethods.value);
    if (res?.success) {
      toastMessage(res.message);
      isNewFixing.value = false;
      isEdit.value = false;
      await fetchMaterialFixingMethods();
    } else {
      toastMessage(res?.message || __("Unable to save fixing methods", "all-signs-options-pro"), "warning");
    }
  } finally {
    isLoading.value = false;
  }
};

const addFixingMethods = async () => {
  fixingMethods.value.push({ ...fixingMethod.value });
  await updateFixingMethods();
};

const updateMaterialFixingMethods = async () => {
  fixingMethods.value[fixingMethodId.value] = { ...fixingMethod.value };
  await updateFixingMethods();
};

const deleteFixingMethods = async () => {
  fixingMethods.value.splice(fixingMethodId.value, 1);
  openModal.value = false;
  await updateFixingMethods();
};

const selectMaterialFixingMethod = (id, fx, isDeleting = false) => {
  fixingMethodId.value = id;
  fixingMethod.value = JSON.parse(JSON.stringify({
    isDefault: Boolean(fx.isDefault),
    fixingMethodId: Number(fx.fixingMethodId ?? -1),
    excludeSizes: normalizeArray(fx.excludeSizes),
    excludeShapes: normalizeArray(fx.excludeShapes),
    additionalPrice: Number(fx.additionalPrice || 0),
  }));
  if (isDeleting) openModal.value = true;
  else {
    isEdit.value = true;
    isNewFixing.value = true;
  }
};

const selectDefault = async (key) => {
  fixingMethods.value.forEach((fx, index) => fx.isDefault = index === key);
  await updateFixingMethods();
};

const newFixing = () => {
  const firstAvailable = availableManagedMethods.value[0];
  if (!firstAvailable) {
    toastMessage(__("No more fixing methods available", "all-signs-options-pro"), "warning");
    return;
  }
  fixingMethod.value = { isDefault: false, fixingMethodId: firstAvailable.value, excludeSizes: [], excludeShapes: [], additionalPrice: 0 };
  fixingMethodId.value = null;
  isEdit.value = false;
  isNewFixing.value = true;
};

const back = () => {
  isNewFixing.value = false;
  isEdit.value = false;
  fixingMethodId.value = null;
};

const closeModal = () => openModal.value = false;

const onDragStart = (index) => {
  draggedIndex.value = index;
};

const onDrop = async (index) => {
  if (draggedIndex.value === null || draggedIndex.value === index) return;
  const rows = [...fixingMethods.value];
  const [moved] = rows.splice(draggedIndex.value, 1);
  rows.splice(index, 0, moved);
  fixingMethods.value = rows;
  draggedIndex.value = null;
  await updateFixingMethods();
};

const exclusionSummary = (items, fallback) => {
  const count = normalizeArray(items).length;
  return count ? `${count} ${__("excluded.", "all-signs-options-pro")}` : fallback;
};

const goToManageFixingMethods = () => {
  router.push({ path: "/global-settings/fixing-methods", query: { returnTo: route.fullPath } });
};

onMounted(async () => {
  await fetchMaterialShapes();
  await fetchMaterialFixingMethods();
});
</script>

<style scoped>
.asowp-fixing-panel {
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
  font-size: 16px;
  line-height: 22px;
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

.asowp-fixing-table,
.asowp-fixing-table thead,
.asowp-fixing-table tbody,
.asowp-fixing-table tr,
.asowp-fixing-table th,
.asowp-fixing-table td {
  border-left: 0 !important;
  border-right: 0 !important;
  outline: 0 !important;
  box-shadow: none !important;
}

.asowp-fixing-table {
  border: 0 !important;
}

.asowp-fixing-table th {
  padding: 9px 12px;
  border-top: 0 !important;
  border-bottom: 0 !important;
  color: #616161;
  font-size: 11px;
  line-height: 16px;
  font-weight: 700;
  text-align: left;
}

.asowp-fixing-table td {
  padding: 8px 12px;
  border-top: 0 !important;
  border-bottom: 0 !important;
  color: #303030;
  font-size: 12px;
  line-height: 18px;
  text-align: left;
}

.asowp-fixing-table tbody tr {
  border-bottom: 1px solid #e5e7eb !important;
}

.asowp-fixing-table tbody tr:last-child {
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

.asowp-multi-input {
  height: 38px;
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
