<template>
  <div class="ascwo-fixing-panel ascwo-space-y-3">
    <template v-if="!isNewFixing">
      <section class="ascwo-card">
        <div class="ascwo-card-inner ascwo-flex ascwo-items-center ascwo-justify-between ascwo-gap-4">
          <div>
            <h2 class="ascwo-title">{{ __("Fixing Methods", "all-signs-customizer-for-woocommerce-pro") }}</h2>
            <p class="ascwo-subtitle">{{ __("Manage the fixing methods available in this config.", "all-signs-customizer-for-woocommerce-pro") }}</p>
          </div>
          <div class="ascwo-flex ascwo-items-center ascwo-gap-2">
            <button type="button" @click="newFixing" class="ascwo-primary-button">
              <PlusIcon class="ascwo-w-4 ascwo-h-4" />
              {{ __("Add fixing method", "all-signs-customizer-for-woocommerce-pro") }}
            </button>
            <button type="button" @click="goToManageFixingMethods" class="ascwo-secondary-button">
              {{ __("Manage fixing methods", "all-signs-customizer-for-woocommerce-pro") }}
            </button>
          </div>
        </div>
      </section>

      <section class="ascwo-card">
        <div class="ascwo-card-inner">
          <h3 class="ascwo-section-title">{{ __("Fixing Methods List", "all-signs-customizer-for-woocommerce-pro") }}</h3>
          <table class="ascwo-fixing-table ascwo-w-full ascwo-border-collapse">
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
              <tr v-else-if="fixingMethods.length === 0">
                <td colspan="6" class="ascwo-text-center ascwo-py-8 ascwo-text-[13px] ascwo-text-[#616161]">
                  {{ __("No fixing methods configured.", "all-signs-customizer-for-woocommerce-pro") }}
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
                  <GripVerticalIcon class="ascwo-drag-icon" />
                </td>
                <td>
                  <div class="ascwo-preview-box">
                    <img v-if="getManagedMethod(fx)?.icon" :src="getManagedMethod(fx).icon" :alt="getManagedMethod(fx).name" />
                    <WrenchIcon v-else class="ascwo-w-6 ascwo-h-6 ascwo-text-[#616161]" />
                  </div>
                </td>
                <td class="ascwo-row-strong">{{ getManagedMethod(fx)?.name || __("Unknown method", "all-signs-customizer-for-woocommerce-pro") }}</td>
                <td>{{ Number(fx.additionalPrice || 0) }}</td>
                <td>
                  <div class="ascwo-inline-flex ascwo-items-center ascwo-gap-2">
                    <span class="ascwo-toggle-label">{{ __("No", "all-signs-customizer-for-woocommerce-pro") }}</span>
                    <button type="button" @click="!isLoading && selectDefault(key)" :class="['ascwo-toggle', fx.isDefault ? 'is-active' : '']"><span></span></button>
                    <span class="ascwo-toggle-label">{{ __("Yes", "all-signs-customizer-for-woocommerce-pro") }}</span>
                  </div>
                </td>
                <td>
                  <div class="ascwo-flex ascwo-items-center ascwo-gap-3">
                    <button type="button" @click="selectMaterialFixingMethod(key, fx)" class="ascwo-outline-button">
                      <Edit2Icon class="ascwo-w-3.5 ascwo-h-3.5" />
                      {{ __("Edit", "all-signs-customizer-for-woocommerce-pro") }}
                    </button>
                    <button type="button" @click="selectMaterialFixingMethod(key, fx, true)" class="ascwo-link-danger">
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
        <button type="button" @click="back" class="ascwo-secondary-button">{{ __("Back to fixing methods", "all-signs-customizer-for-woocommerce-pro") }}</button>
      </div>
      <div class="ascwo-card-inner ascwo-form-body">
        <h3 class="ascwo-section-title">{{ isEdit ? __("Edit fixing method", "all-signs-customizer-for-woocommerce-pro") : __("Add fixing method", "all-signs-customizer-for-woocommerce-pro") }}</h3>

        <div class="ascwo-field-block">
          <span class="ascwo-form-label">{{ __("Source", "all-signs-customizer-for-woocommerce-pro") }}</span>
          <div class="ascwo-flex ascwo-items-center ascwo-gap-5">
            <div class="ascwo-inline-flex ascwo-items-center ascwo-gap-2">
              <span class="ascwo-toggle-label">{{ __("Managed", "all-signs-customizer-for-woocommerce-pro") }}</span>
              <button type="button" class="ascwo-toggle is-active"><span></span></button>
            </div>
            <div class="ascwo-inline-flex ascwo-items-center ascwo-gap-2">
              <span class="ascwo-toggle-label">{{ __("Custom", "all-signs-customizer-for-woocommerce-pro") }}</span>
              <button type="button" class="ascwo-toggle" disabled><span></span></button>
            </div>
          </div>
        </div>

        <label class="ascwo-field-block">
          <span class="ascwo-form-label">{{ __("Fixing method", "all-signs-customizer-for-woocommerce-pro") }}</span>
          <select v-model="fixingMethod.fixingMethodId" class="ascwo-form-input">
            <option :value="-1">{{ __("None", "all-signs-customizer-for-woocommerce-pro") }}</option>
            <option v-for="option in availableManagedMethods" :key="option.value" :value="option.value">
              {{ option.name }}
            </option>
          </select>
          <span class="ascwo-help-text">{{ __("Choose a fixing method from your managed fixing methods library. If the option is missing, add it in `Manage fixing methods` first.", "all-signs-customizer-for-woocommerce-pro") }}</span>
        </label>

        <div class="ascwo-selected-preview">
          <div class="ascwo-preview-box ascwo-preview-box-lg">
            <img v-if="selectedManagedMethod?.icon" :src="selectedManagedMethod.icon" :alt="selectedManagedMethod.name" />
            <BanIcon v-else class="ascwo-w-9 ascwo-h-9 ascwo-text-[#111827]" />
          </div>
          <div>
            <div class="ascwo-row-strong">{{ selectedManagedMethod?.name || __("None", "all-signs-customizer-for-woocommerce-pro") }}</div>
            <p class="ascwo-help-text ascwo-m-0">{{ selectedManagedMethod?.description || __("Preview of the fixing method selected for this config.", "all-signs-customizer-for-woocommerce-pro") }}</p>
          </div>
        </div>

        <label class="ascwo-field-block">
          <span class="ascwo-form-label">{{ __("Additional price", "all-signs-customizer-for-woocommerce-pro") }}</span>
          <input type="number" v-model="fixingMethod.additionalPrice" class="ascwo-form-input" />
        </label>

        <div class="ascwo-field-block">
          <span class="ascwo-form-label">{{ __("Exclude sizes", "all-signs-customizer-for-woocommerce-pro") }}</span>
          <div class="ascwo-combobox" @click.stop>
            <button type="button" class="ascwo-combobox-control" @click="toggleExclusionPicker('sizes')">
              <span v-if="!normalizeArray(fixingMethod.excludeSizes).length" class="ascwo-combobox-placeholder">{{ __("Select excluded sizes", "all-signs-customizer-for-woocommerce-pro") }}</span>
              <span v-else class="ascwo-combobox-tags">
                <span v-for="item in selectedExclusionLabels('excludeSizes', 'sizes')" :key="`size-tag-${item.value}`" class="ascwo-combobox-tag">
                  {{ item.label }}
                  <span class="ascwo-combobox-remove" @click.stop="removeExclusion('excludeSizes', item.value)">x</span>
                </span>
              </span>
              <ChevronDownIcon class="ascwo-combobox-icon" />
            </button>
            <div v-if="openExclusionPicker === 'sizes'" class="ascwo-combobox-popover">
              <input v-model="exclusionSearch.sizes" type="search" class="ascwo-combobox-search" :placeholder="__('Search sizes', 'all-signs-customizer-for-woocommerce-pro')" />
              <button
                v-for="size in filteredExclusionOptions('sizes')"
                :key="`size-option-${size.value}`"
                type="button"
                :class="['ascwo-combobox-option', isExcluded(fixingMethod.excludeSizes, size.value) ? 'is-selected' : '']"
                @click="toggleExclusion('excludeSizes', size.value)"
              >
                {{ size.label }}
              </button>
            </div>
          </div>
          <span class="ascwo-help-text">{{ __("Hide this fixing method for selected sizes.", "all-signs-customizer-for-woocommerce-pro") }}</span>
          <span class="ascwo-help-text">{{ exclusionSummaryLabels('excludeSizes', 'sizes', __("No sizes excluded.", "all-signs-customizer-for-woocommerce-pro"), __("Excluded sizes:", "all-signs-customizer-for-woocommerce-pro")) }}</span>
        </div>

        <div class="ascwo-field-block">
          <span class="ascwo-form-label">{{ __("Exclude shapes", "all-signs-customizer-for-woocommerce-pro") }}</span>
          <div class="ascwo-combobox" @click.stop>
            <button type="button" class="ascwo-combobox-control" @click="toggleExclusionPicker('shapes')">
              <span v-if="!normalizeArray(fixingMethod.excludeShapes).length" class="ascwo-combobox-placeholder">{{ __("Select excluded shapes", "all-signs-customizer-for-woocommerce-pro") }}</span>
              <span v-else class="ascwo-combobox-tags">
                <span v-for="item in selectedExclusionLabels('excludeShapes', 'shapes')" :key="`shape-tag-${item.value}`" class="ascwo-combobox-tag">
                  {{ item.label }}
                  <span class="ascwo-combobox-remove" @click.stop="removeExclusion('excludeShapes', item.value)">x</span>
                </span>
              </span>
              <ChevronDownIcon class="ascwo-combobox-icon" />
            </button>
            <div v-if="openExclusionPicker === 'shapes'" class="ascwo-combobox-popover">
              <input v-model="exclusionSearch.shapes" type="search" class="ascwo-combobox-search" :placeholder="__('Search shapes', 'all-signs-customizer-for-woocommerce-pro')" />
              <button
                v-for="shape in filteredExclusionOptions('shapes')"
                :key="`shape-option-${shape.value}`"
                type="button"
                :class="['ascwo-combobox-option', isExcluded(fixingMethod.excludeShapes, shape.value) ? 'is-selected' : '']"
                @click="toggleExclusion('excludeShapes', shape.value)"
              >
                {{ shape.label }}
              </button>
            </div>
          </div>
          <span class="ascwo-help-text">{{ __("Hide this fixing method for selected shapes.", "all-signs-customizer-for-woocommerce-pro") }}</span>
          <span class="ascwo-help-text">{{ exclusionSummaryLabels('excludeShapes', 'shapes', __("No shapes excluded.", "all-signs-customizer-for-woocommerce-pro"), __("Excluded shapes:", "all-signs-customizer-for-woocommerce-pro")) }}</span>
        </div>
      </div>
      <div class="ascwo-form-footer">
        <button type="button" @click="back" class="ascwo-secondary-button">{{ __("Back to fixing methods", "all-signs-customizer-for-woocommerce-pro") }}</button>
        <button type="button" @click="isEdit ? updateMaterialFixingMethods() : addFixingMethods()" :disabled="isLoading || !fixingMethod.fixingMethodId || fixingMethod.fixingMethodId === -1" class="ascwo-primary-button">
          {{ isLoading ? __("Saving...", "all-signs-customizer-for-woocommerce-pro") : __("Save fixing method", "all-signs-customizer-for-woocommerce-pro") }}
        </button>
      </div>
    </section>

    <div v-if="openModal" class="ascwo-fixed ascwo-inset-0 ascwo-z-[20000] ascwo-flex ascwo-items-center ascwo-justify-center">
      <div class="ascwo-absolute ascwo-inset-0 ascwo-bg-black/45" @click="closeModal"></div>
      <div class="ascwo-delete-modal">
        <h3 class="ascwo-text-[16px] ascwo-font-[900] ascwo-text-[#303030] ascwo-mt-0 ascwo-mb-2">{{ __("Delete fixing method?", "all-signs-customizer-for-woocommerce-pro") }}</h3>
        <p class="ascwo-text-[13px] ascwo-text-[#616161] ascwo-mt-0 ascwo-mb-5">{{ __("Are you sure you want to delete this fixing method?", "all-signs-customizer-for-woocommerce-pro") }}</p>
        <div class="ascwo-flex ascwo-justify-end ascwo-gap-2">
          <button type="button" @click="closeModal" class="ascwo-secondary-button">{{ __("Cancel", "all-signs-customizer-for-woocommerce-pro") }}</button>
          <button type="button" @click="deleteFixingMethods" :disabled="isLoading" class="ascwo-danger-button">{{ __("Delete", "all-signs-customizer-for-woocommerce-pro") }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import api from "@/admin/Api/api";
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import toastMessage from "@/admin/utils/functions";
import { BanIcon, ChevronDownIcon, Edit2Icon, GripVerticalIcon, Loader2Icon, PlusIcon, Trash2Icon, WrenchIcon } from "lucide-vue-next";
import { __ } from "@wordpress/i18n";

const route = useRoute();
const router = useRouter();
const configID = ref(route.params.configId);

const fixingMethodSizes = ref([]);
const fixingMethodShapes = ref([]);
const isFetching = ref(true);
const isNewFixing = ref(false);
const isLoading = ref(false);
const isEdit = ref(false);
const openModal = ref(false);
const fixingMethodId = ref(null);
const draggedIndex = ref(null);
const openExclusionPicker = ref(null);
const exclusionSearch = ref({ sizes: "", shapes: "" });

const fixingMethods = ref([]);
const manageFixingMethods = ref([]);
const fixingMethod = ref({ isDefault: false, fixingMethodId: "", excludeSizes: [], excludeShapes: [], additionalPrice: 0 });

const normalizeArray = (value) => Array.isArray(value) ? value : [];

const managedMethodKey = (method) => String(method?.id ?? method?.type ?? "");

const resolveManagedMethodId = (value, methods = manageFixingMethods.value) => {
  const raw = String(value ?? "");
  if (!raw || raw === "-1") return "";

  const direct = methods.find((method) => managedMethodKey(method) === raw);
  if (direct) return managedMethodKey(direct);

  const index = Number(raw);
  if (Number.isInteger(index) && index >= 0 && methods[index]) {
    return managedMethodKey(methods[index]);
  }

  return raw;
};

const getManagedMethod = (fx) => {
  const resolvedId = resolveManagedMethodId(fx?.fixingMethodId);
  return manageFixingMethods.value.find((method) => managedMethodKey(method) === resolvedId) || null;
};

const selectedManagedMethod = computed(() => manageFixingMethods.value.find((method) => managedMethodKey(method) === resolveManagedMethodId(fixingMethod.value.fixingMethodId)) || null);

const availableManagedMethods = computed(() => manageFixingMethods.value
  .map((method, index) => ({ ...method, value: managedMethodKey(method) || String(index) }))
  .filter((method) => {
    if (String(method.value) === String(fixingMethod.value.fixingMethodId)) return true;
    return !fixingMethods.value.some((fx) => String(fx.fixingMethodId) === String(method.value));
  }));

const getExclusionOptions = (type) => (type === "sizes" ? fixingMethodSizes.value : fixingMethodShapes.value)
  .map((option) => ({
    label: option.name,
    value: option.value,
  }));

const filteredExclusionOptions = (type) => {
  const term = String(exclusionSearch.value[type] || "").toLowerCase().trim();
  const options = getExclusionOptions(type);
  if (!term) return options;
  return options.filter((option) => String(option.label || "").toLowerCase().includes(term));
};

const isExcluded = (items, value) => normalizeArray(items).some((item) => String(item) === String(value));

const toggleExclusionPicker = (type) => {
  openExclusionPicker.value = openExclusionPicker.value === type ? null : type;
};

const toggleExclusion = (field, value) => {
  const items = normalizeArray(fixingMethod.value[field]);
  fixingMethod.value[field] = isExcluded(items, value)
    ? items.filter((item) => String(item) !== String(value))
    : [...items, value];
};

const removeExclusion = (field, value) => {
  fixingMethod.value[field] = normalizeArray(fixingMethod.value[field]).filter((item) => String(item) !== String(value));
};

const selectedExclusionLabels = (field, type) => {
  const options = getExclusionOptions(type);
  return normalizeArray(fixingMethod.value[field]).map((value) => ({
    value,
    label: options.find((option) => String(option.value) === String(value))?.label || value,
  }));
};

const exclusionSummaryLabels = (field, type, fallback, prefix) => {
  const labels = selectedExclusionLabels(field, type).map((item) => item.label).filter(Boolean);
  return labels.length ? `${prefix} ${labels.join(", ")}` : fallback;
};

const fetchMaterialShapes = async () => {
  const res = await api.getRequiredOptionShapes(configID.value);
  if (!res.message && res.items) {
      fixingMethodShapes.value = res.items.map((shape) => ({
        name: res.manageShapes?.find?.((item) => String(item?.id ?? item?.value ?? "") === String(shape.shapeId))?.name || "Shape",
        value: shape.shapeId,
      }));
  }
};

const fetchMaterialFixingMethods = async () => {
  isFetching.value = true;
  try {
    const res = await api.getRequiredOptionFixingMethods(configID.value);
    const fixingMethodsData = res;
    fixingMethodSizes.value = (fixingMethodsData?.sizes || []).map((size, index) => ({ name: size.label, value: index }));
    if (!res.message && fixingMethodsData) {
      manageFixingMethods.value = (fixingMethodsData.manageFixingMethods || []).map((method) => ({
        ...method,
        id: managedMethodKey(method),
      }));
      fixingMethods.value = (fixingMethodsData.items || []).map((fx) => ({
        isDefault: Boolean(fx.isDefault),
        fixingMethodId: resolveManagedMethodId(fx.fixingMethodId, manageFixingMethods.value),
        excludeSizes: normalizeArray(fx.excludeSizes),
        excludeShapes: normalizeArray(fx.excludeShapes),
        additionalPrice: Number(fx.additionalPrice || 0),
      }));
    }
  } finally {
    isFetching.value = false;
  }
};

const updateFixingMethods = async () => {
  if (isLoading.value) return;
  isLoading.value = true;
  try {
    const res = await api.updateRequiredOptionFixingMethods(configID.value, fixingMethods.value);
    if (res?.success) {
      toastMessage(res.message);
      isNewFixing.value = false;
      isEdit.value = false;
      await fetchMaterialFixingMethods();
    } else {
      toastMessage(res?.message || __("Unable to save fixing methods", "all-signs-customizer-for-woocommerce-pro"), "warning");
    }
  } finally {
    isLoading.value = false;
  }
};

const addFixingMethods = async () => {
  isLoading.value = true;
  try {
    const payload = { ...fixingMethod.value, isDefault: !fixingMethods.value.length };
    const res = await api.addRequiredOptionFixingMethodItem(configID.value, payload);
    if (res?.success) {
      toastMessage(res.message);
      isNewFixing.value = false;
      isEdit.value = false;
      await fetchMaterialFixingMethods();
    } else {
      toastMessage(res?.message || __("Unable to add fixing method", "all-signs-customizer-for-woocommerce-pro"), "warning");
    }
  } finally {
    isLoading.value = false;
  }
};

const updateMaterialFixingMethods = async () => {
  if (fixingMethodId.value === null) return;
  isLoading.value = true;
  try {
    const res = await api.updateRequiredOptionFixingMethodItem(configID.value, fixingMethodId.value, { ...fixingMethod.value });
    if (res?.success) {
      toastMessage(res.message);
      isNewFixing.value = false;
      isEdit.value = false;
      await fetchMaterialFixingMethods();
    } else {
      toastMessage(res?.message || __("Unable to update fixing method", "all-signs-customizer-for-woocommerce-pro"), "warning");
    }
  } finally {
    isLoading.value = false;
  }
};

const deleteFixingMethods = async () => {
  openModal.value = false;
  if (fixingMethodId.value === null) return;
  isLoading.value = true;
  try {
    const res = await api.deleteRequiredOptionFixingMethodItem(configID.value, fixingMethodId.value);
    if (res?.success) {
      toastMessage(res.message);
      isNewFixing.value = false;
      isEdit.value = false;
      await fetchMaterialFixingMethods();
    } else {
      toastMessage(res?.message || __("Unable to delete fixing method", "all-signs-customizer-for-woocommerce-pro"), "warning");
    }
  } finally {
    isLoading.value = false;
  }
};

const selectMaterialFixingMethod = (id, fx, isDeleting = false) => {
  fixingMethodId.value = id;
  fixingMethod.value = JSON.parse(JSON.stringify({
    isDefault: Boolean(fx.isDefault),
    fixingMethodId: resolveManagedMethodId(fx.fixingMethodId),
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
  isLoading.value = true;
  try {
    const res = await api.setRequiredOptionDefault(configID.value, "fixing-methods", key);
    if (res?.success) {
      await fetchMaterialFixingMethods();
    } else {
      toastMessage(res?.message || __("Unable to update default fixing method", "all-signs-customizer-for-woocommerce-pro"), "warning");
    }
  } finally {
    isLoading.value = false;
  }
};

const newFixing = () => {
  const firstAvailable = availableManagedMethods.value[0];
  if (!firstAvailable) {
    toastMessage(__("No more fixing methods available", "all-signs-customizer-for-woocommerce-pro"), "warning");
    return;
  }
  fixingMethod.value = { isDefault: false, fixingMethodId: firstAvailable.value?.value || "", excludeSizes: [], excludeShapes: [], additionalPrice: 0 };
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

const goToManageFixingMethods = () => {
  router.push({ path: "/settings/fixing-method", query: { returnTo: route.fullPath } });
};

const closeExclusionPicker = () => {
  openExclusionPicker.value = null;
};

onMounted(async () => {
  document.addEventListener("click", closeExclusionPicker);
  await fetchMaterialShapes();
  await fetchMaterialFixingMethods();
});

onBeforeUnmount(() => {
  document.removeEventListener("click", closeExclusionPicker);
});
</script>

<style scoped>
.ascwo-fixing-panel {
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
  font-size: 16px;
  line-height: 22px;
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

.ascwo-fixing-table,
.ascwo-fixing-table thead,
.ascwo-fixing-table tbody,
.ascwo-fixing-table tr,
.ascwo-fixing-table th,
.ascwo-fixing-table td {
  border-left: 0 !important;
  border-right: 0 !important;
  outline: 0 !important;
  box-shadow: none !important;
}

.ascwo-fixing-table {
  border: 0 !important;
}

.ascwo-fixing-table th {
  padding: 9px 12px;
  border-top: 0 !important;
  border-bottom: 0 !important;
  color: #616161;
  font-size: 11px;
  line-height: 16px;
  font-weight: 700;
  text-align: left;
}

.ascwo-fixing-table td {
  padding: 8px 12px;
  border-top: 0 !important;
  border-bottom: 0 !important;
  color: #303030;
  font-size: 12px;
  line-height: 18px;
  text-align: left;
}

.ascwo-fixing-table tbody tr {
  border-bottom: 1px solid #e5e7eb !important;
}

.ascwo-fixing-table tbody tr:last-child {
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

.ascwo-combobox {
  position: relative;
}

.ascwo-combobox-control {
  box-sizing: border-box;
  width: 100%;
  min-height: 38px;
  padding: 5px 34px 5px 10px;
  border: 1px solid #8c9196;
  border-radius: 7px;
  background: #fff;
  color: #303030;
  font-size: 13px;
  line-height: 20px;
  text-align: left;
  cursor: pointer;
  position: relative;
}

.ascwo-combobox-control:focus {
  outline: 2px solid #005bd3;
  outline-offset: 1px;
}

.ascwo-combobox-placeholder {
  color: #6d7175;
}

.ascwo-combobox-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.ascwo-combobox-tag {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  max-width: 100%;
  padding: 2px 6px;
  border-radius: 7px;
  background: #e4e5e7;
  color: #202223;
  font-size: 12px;
  line-height: 16px;
}

.ascwo-combobox-remove {
  color: #5c5f62;
  font-weight: 900;
  cursor: pointer;
}

.ascwo-combobox-icon {
  position: absolute;
  right: 10px;
  top: 50%;
  width: 16px;
  height: 16px;
  color: #6d7175;
  transform: translateY(-50%);
}

.ascwo-combobox-popover {
  position: absolute;
  z-index: 30;
  left: 0;
  right: 0;
  top: calc(100% + 4px);
  max-height: 240px;
  overflow-y: auto;
  border: 1px solid #c9cccf;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
  padding: 6px;
}

.ascwo-combobox-search {
  box-sizing: border-box;
  width: 100%;
  height: 34px;
  margin-bottom: 4px;
  padding: 6px 9px;
  border: 1px solid #c9cccf;
  border-radius: 7px;
  font-size: 13px;
  line-height: 18px;
}

.ascwo-combobox-option {
  display: block;
  width: 100%;
  padding: 7px 9px;
  border: 0;
  border-radius: 6px;
  background: transparent;
  color: #303030;
  font-size: 13px;
  line-height: 18px;
  text-align: left;
  cursor: pointer;
}

.ascwo-combobox-option:hover,
.ascwo-combobox-option.is-selected {
  background: #f1f2f3;
}
</style>
