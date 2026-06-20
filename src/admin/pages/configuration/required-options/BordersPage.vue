<template>
  <div class="ascwo-borders-panel ascwo-space-y-3">
    <template v-if="!isNewBorder">
      <section class="ascwo-card">
        <div class="ascwo-card-inner ascwo-flex ascwo-items-center ascwo-justify-between ascwo-gap-4">
          <div>
            <h2 class="ascwo-title">{{ __("Borders", "all-signs-customizer-for-woocommerce-pro") }}</h2>
            <p class="ascwo-subtitle">{{ __("Manage the borders available in this config and exclude incompatible shapes.", "all-signs-customizer-for-woocommerce-pro") }}</p>
          </div>
          <div class="ascwo-flex ascwo-items-center ascwo-gap-2">
            <button type="button" @click="newBorder" class="ascwo-primary-button">
              <PlusIcon class="ascwo-w-4 ascwo-h-4" />
              {{ __("Add border", "all-signs-customizer-for-woocommerce-pro") }}
            </button>
            <button type="button" @click="goToManageBorders" class="ascwo-secondary-button">
              {{ __("Manage borders", "all-signs-customizer-for-woocommerce-pro") }}
            </button>
          </div>
        </div>
      </section>

      <section class="ascwo-card">
        <div class="ascwo-card-inner">
          <h3 class="ascwo-section-title">{{ __("Borders List", "all-signs-customizer-for-woocommerce-pro") }}</h3>
          <table class="ascwo-borders-table ascwo-w-full ascwo-border-collapse">
            <thead class="ascwo-bg-[#f3f3f3]">
              <tr>
                <th>{{ __("Preview", "all-signs-customizer-for-woocommerce-pro") }}</th>
                <th>{{ __("Label", "all-signs-customizer-for-woocommerce-pro") }}</th>
                <th>{{ __("Price", "all-signs-customizer-for-woocommerce-pro") }}</th>
                <th>{{ __("Default", "all-signs-customizer-for-woocommerce-pro") }}</th>
                <th>{{ __("Actions", "all-signs-customizer-for-woocommerce-pro") }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="isFetching">
                <td colspan="5" class="ascwo-text-center ascwo-py-8">
                  <Loader2Icon class="ascwo-w-7 ascwo-h-7 ascwo-text-[#007a72] ascwo-animate-spin ascwo-mx-auto" />
                </td>
              </tr>
              <tr v-else-if="borders.items.length === 0">
                <td colspan="5" class="ascwo-text-center ascwo-py-8 ascwo-text-[13px] ascwo-text-[#616161]">
                  {{ __("No borders configured.", "all-signs-customizer-for-woocommerce-pro") }}
                </td>
              </tr>
              <tr v-for="(bd, key) in borders.items" :key="`${bd.id}-${key}`">
                <td>
                  <div class="ascwo-preview-box">
                    <img v-if="getManagedBorder(bd)?.icon" :src="getManagedBorder(bd).icon" :alt="getManagedBorder(bd).name" />
                    <SquareIcon v-else class="ascwo-w-7 ascwo-h-7 ascwo-text-[#111827]" />
                  </div>
                </td>
                <td class="ascwo-row-strong">{{ getManagedBorder(bd)?.name || __("Unknown border", "all-signs-customizer-for-woocommerce-pro") }}</td>
                <td>{{ Number(bd.additionalPrice || 0) }}</td>
                <td>
                  <div class="ascwo-inline-flex ascwo-items-center ascwo-gap-2">
                    <span class="ascwo-toggle-label">{{ __("No", "all-signs-customizer-for-woocommerce-pro") }}</span>
                    <button type="button" :disabled="isLoading" @click="selectDefault(bd.id)" :class="['ascwo-toggle', bd.isDefault ? 'is-active' : '', defaultActionId === bd.id ? 'is-loading' : '']"><span></span></button>
                    <span class="ascwo-toggle-label">{{ __("Yes", "all-signs-customizer-for-woocommerce-pro") }}</span>
                  </div>
                </td>
                <td>
                  <div class="ascwo-flex ascwo-items-center ascwo-gap-3">
                    <button type="button" @click="selectMaterialBorder(bd.id, bd)" class="ascwo-outline-button">
                      <Edit2Icon class="ascwo-w-3.5 ascwo-h-3.5" />
                      {{ __("Edit", "all-signs-customizer-for-woocommerce-pro") }}
                    </button>
                    <button type="button" @click="selectMaterialBorder(bd.id, bd, true)" class="ascwo-link-danger">
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

      <section class="ascwo-card">
        <div class="ascwo-card-inner ascwo-form-body">
          <h3 class="ascwo-section-title">{{ __("Border Settings", "all-signs-customizer-for-woocommerce-pro") }}</h3>
          <p class="ascwo-subtitle ascwo-mb-4">{{ __("Control border width support and the border color palette shown in the configurator.", "all-signs-customizer-for-woocommerce-pro") }}</p>

          <div class="ascwo-flex ascwo-items-center ascwo-gap-8 ascwo-mb-4">
            <div class="ascwo-inline-flex ascwo-items-center ascwo-gap-2">
              <span class="ascwo-form-label ascwo-m-0">{{ __("Enable border width", "all-signs-customizer-for-woocommerce-pro") }}</span>
              <button type="button" @click="enableBorderWidth" :class="['ascwo-toggle', borders.settings.enableBorderWidth ? 'is-active' : '']"><span></span></button>
            </div>
            <div class="ascwo-inline-flex ascwo-items-center ascwo-gap-2">
              <span class="ascwo-form-label ascwo-m-0">{{ __("Enable border color", "all-signs-customizer-for-woocommerce-pro") }}</span>
              <button type="button" @click="enableBorderColor" :class="['ascwo-toggle', borders.settings.enableBorderColor ? 'is-active' : '']"><span></span></button>
            </div>
          </div>

          <div v-if="borders.settings.enableBorderColor" class="ascwo-settings-block">
            <div class="ascwo-grid ascwo-grid-cols-1 lg:ascwo-grid-cols-2 ascwo-gap-4">
              <label>
                <span class="ascwo-form-label">{{ __("Border colors label", "all-signs-customizer-for-woocommerce-pro") }}</span>
                <input type="text" v-model="borders.settings.borderColorsLabel" class="ascwo-form-input" />
              </label>
              <label>
                <span class="ascwo-form-label">{{ __("Custom color preview image", "all-signs-customizer-for-woocommerce-pro") }}</span>
                <div class="ascwo-file-input">
                  <button type="button" @click.prevent="selectCustomBorderColorPrevImage" class="ascwo-file-button">{{ __("Upload image", "all-signs-customizer-for-woocommerce-pro") }}</button>
                  <input v-model="borders.settings.customColorsPrevImg" autocomplete="off" />
                  <div class="ascwo-upload-preview">
                    <img v-if="borders.settings.customColorsPrevImg" :src="borders.settings.customColorsPrevImg" alt="" />
                  </div>
                </div>
              </label>
            </div>

            <h4 class="ascwo-section-title ascwo-mt-5">{{ __("Border Colors", "all-signs-customizer-for-woocommerce-pro") }}</h4>
            <div class="ascwo-colors-grid">
              <div
                v-for="(color, key) in borders.settings.colors"
                :key="key"
                :class="[
                  'ascwo-color-row',
                  colorDragIndex === key ? 'is-dragging' : '',
                  colorDropIndex === key && colorDragIndex !== key ? 'is-drop-target' : '',
                ]"
                :draggable="colorDragIndex === key"
                @dragover.prevent="setBorderColorDropTarget(key)"
                @dragenter.prevent="setBorderColorDropTarget(key)"
                @drop.prevent="dropBorderColor(key)"
              >
                <button
                  type="button"
                  class="ascwo-drag-button"
                  draggable="true"
                  @dragstart="startBorderColorDrag($event, key)"
                  @dragend="endBorderColorDrag"
                  :aria-label="__('Reorder color', 'all-signs-customizer-for-woocommerce-pro')"
                >
                  <GripVerticalIcon class="ascwo-drag-icon" />
                </button>
                <span class="ascwo-color-index">{{ key + 1 }}</span>
                <input type="color" v-model="color.codeHex" class="ascwo-color-swatch" :title="__('Choose color', 'all-signs-customizer-for-woocommerce-pro')" />
                <div class="ascwo-color-fields">
                  <input type="text" v-model="color.name" class="ascwo-form-input ascwo-color-input" :placeholder="__('Name', 'all-signs-customizer-for-woocommerce-pro')" />
                  <input type="text" v-model="color.codeHex" class="ascwo-form-input ascwo-color-input" />
                </div>
                <label class="ascwo-color-price">
                  <span>{{ __("Additional price", "all-signs-customizer-for-woocommerce-pro") }}</span>
                  <input type="number" v-model="color.additionalPrice" class="ascwo-form-input ascwo-color-input" />
                </label>
                <button type="button" @click="removeBordersColor(key)" class="ascwo-icon-danger">
                  <Trash2Icon class="ascwo-w-3.5 ascwo-h-3.5" />
                </button>
              </div>
            </div>
            <button type="button" @click="addNewColor" class="ascwo-secondary-button ascwo-mt-3">{{ __("Add color", "all-signs-customizer-for-woocommerce-pro") }}</button>
          </div>
        </div>
        <div class="ascwo-form-footer">
          <button type="button" @click="updateBorders" :disabled="isLoading" class="ascwo-primary-button">
            {{ isLoading ? __("Saving...", "all-signs-customizer-for-woocommerce-pro") : __("Save settings", "all-signs-customizer-for-woocommerce-pro") }}
          </button>
        </div>
      </section>
    </template>

    <section v-else class="ascwo-card">
      <div class="ascwo-card-inner ascwo-form-body">
        <h3 class="ascwo-section-title">{{ isEdit ? __("Edit border", "all-signs-customizer-for-woocommerce-pro") : __("Add border", "all-signs-customizer-for-woocommerce-pro") }}</h3>

        <label class="ascwo-field-block">
          <span class="ascwo-form-label">{{ __("Border", "all-signs-customizer-for-woocommerce-pro") }}</span>
          <select v-model="border.borderId" class="ascwo-form-input">
            <option v-for="option in availableManagedBorders" :key="option.value" :value="option.value">
              {{ option.name }}
            </option>
          </select>
        </label>

        <div class="ascwo-selected-preview">
          <div class="ascwo-preview-box ascwo-preview-box-lg">
            <img v-if="selectedManagedBorder?.icon" :src="selectedManagedBorder.icon" :alt="selectedManagedBorder.name" />
            <SquareIcon v-else class="ascwo-w-9 ascwo-h-9 ascwo-text-[#111827]" />
          </div>
          <div>
            <div class="ascwo-row-strong">{{ selectedManagedBorder?.name || __("None", "all-signs-customizer-for-woocommerce-pro") }}</div>
            <p class="ascwo-help-text ascwo-m-0">{{ selectedManagedBorder?.value || __("Preview of the border selected for this config.", "all-signs-customizer-for-woocommerce-pro") }}</p>
          </div>
        </div>

        <label class="ascwo-field-block">
          <span class="ascwo-form-label">{{ __("Additional price", "all-signs-customizer-for-woocommerce-pro") }}</span>
          <input type="number" v-model="border.additionalPrice" class="ascwo-form-input" />
        </label>

        <label class="ascwo-field-block">
          <span class="ascwo-form-label">{{ __("Exclude sizes", "all-signs-customizer-for-woocommerce-pro") }}</span>
          <Multiselect
            v-model="border.excludeSizes"
            mode="tags"
            :options="borderSizes"
            label="name"
            valueProp="value"
            trackBy="name"
            placeholder=""
          />
          <span class="ascwo-help-text">{{ __("Hide this border for selected sizes.", "all-signs-customizer-for-woocommerce-pro") }}</span>
          <span class="ascwo-help-text">{{ exclusionSummary(border.excludeSizes, __("No sizes excluded.", "all-signs-customizer-for-woocommerce-pro")) }}</span>
        </label>

        <label class="ascwo-field-block">
          <span class="ascwo-form-label">{{ __("Exclude shapes", "all-signs-customizer-for-woocommerce-pro") }}</span>
          <Multiselect
            v-model="border.excludeShapes"
            mode="tags"
            :options="borderShapes"
            label="name"
            valueProp="value"
            trackBy="name"
            placeholder=""
          />
          <span class="ascwo-help-text">{{ __("Hide this border for shapes that do not support it.", "all-signs-customizer-for-woocommerce-pro") }}</span>
          <span class="ascwo-help-text">{{ exclusionSummary(border.excludeShapes, __("No shapes excluded.", "all-signs-customizer-for-woocommerce-pro")) }}</span>
        </label>
      </div>
      <div class="ascwo-form-footer">
        <button type="button" @click="back" class="ascwo-secondary-button">{{ __("Back to borders", "all-signs-customizer-for-woocommerce-pro") }}</button>
        <button type="button" @click="isEdit ? updateMaterialBorders() : addBorders()" :disabled="isLoading || !border.borderId" class="ascwo-primary-button">
          {{ isLoading ? __("Saving...", "all-signs-customizer-for-woocommerce-pro") : __("Save border", "all-signs-customizer-for-woocommerce-pro") }}
        </button>
      </div>
    </section>

    <div v-if="openModal" class="ascwo-fixed ascwo-inset-0 ascwo-z-[20000] ascwo-flex ascwo-items-center ascwo-justify-center">
      <div class="ascwo-absolute ascwo-inset-0 ascwo-bg-black/45" @click="closeModal"></div>
      <div class="ascwo-delete-modal">
        <h3 class="ascwo-text-[16px] ascwo-font-[900] ascwo-text-[#303030] ascwo-mt-0 ascwo-mb-2">{{ __("Delete border?", "all-signs-customizer-for-woocommerce-pro") }}</h3>
        <p class="ascwo-text-[13px] ascwo-text-[#616161] ascwo-mt-0 ascwo-mb-5">{{ __("Are you sure you want to delete this border?", "all-signs-customizer-for-woocommerce-pro") }}</p>
        <div class="ascwo-flex ascwo-justify-end ascwo-gap-2">
          <button type="button" @click="closeModal" class="ascwo-secondary-button">{{ __("Cancel", "all-signs-customizer-for-woocommerce-pro") }}</button>
          <button type="button" @click="deleteBorders" :disabled="isLoading" class="ascwo-danger-button">{{ __("Delete", "all-signs-customizer-for-woocommerce-pro") }}</button>
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
import Multiselect from "@vueform/multiselect";
import { Edit2Icon, GripVerticalIcon, Loader2Icon, PlusIcon, SquareIcon, Trash2Icon } from "lucide-vue-next";
import { __ } from "@wordpress/i18n";

const route = useRoute();
const router = useRouter();
const configID = ref(route.params.configId);

const defaultSettings = () => ({
  borderColorsLabel: "Borders Colors",
  colors: [],
  enableBorderWidth: true,
  enableBorderColor: true,
  customColorsPrevImg: "",
});

const createBorder = (id = "", borderId = "") => ({
  id,
  borderId,
  additionalPrice: 0,
  excludeSizes: [],
  excludeShapes: [],
  isDefault: false,
});

const isFetching = ref(true);
const isNewBorder = ref(false);
const isLoading = ref(false);
const defaultActionId = ref("");
const isEdit = ref(false);
const openModal = ref(false);
const borderId = ref("");
const colorDragIndex = ref(null);
const colorDropIndex = ref(null);

const borders = ref({ settings: defaultSettings(), items: [] });
const manageBorders = ref([]);
const borderSizes = ref([]);
const borderShapes = ref([]);
const border = ref(createBorder());

const normalizeArray = (value) => Array.isArray(value) ? value : [];
const getManagedBorder = (bd) => manageBorders.value.find((item) => String(item?.id ?? item?.value ?? "") === String(bd?.borderId)) || null;

const selectedManagedBorder = computed(() => manageBorders.value.find((item) => String(item?.id ?? item?.value ?? "") === String(border.value.borderId)) || null);

const availableManagedBorders = computed(() => manageBorders.value
  .map((item, index) => {
    const value = String(item?.id ?? item?.value ?? `border-${index + 1}`);
    return { ...item, value };
  })
  .filter((item) => {
    if (String(item.value) === String(border.value.borderId)) return true;
    return !borders.value.items.some((bd) => String(bd.borderId) === String(item.value));
  }));

const normalizeBorder = (item) => ({
  ...createBorder(),
  ...item,
  id: String(item?.id ?? ""),
  borderId: String(item?.borderId ?? ""),
  additionalPrice: Number(item?.additionalPrice || 0),
  isDefault: Boolean(item?.isDefault),
  excludeSizes: normalizeArray(item?.excludeSizes),
  excludeShapes: normalizeArray(item?.excludeShapes),
});

const normalizeSettings = (settings = {}) => ({
  ...defaultSettings(),
  ...settings,
  colors: normalizeArray(settings.colors),
  enableBorderWidth: settings.enableBorderWidth !== false,
  enableBorderColor: settings.enableBorderColor !== false,
});

const fetchMaterialShapes = async () => {
  const res = await api.getRequiredOptionShapes(configID.value);
  if (!res.message && res.items) {
    borderShapes.value = res.items.map((item) => ({
      name: res.manageShapes?.find?.((shape) => String(shape?.id ?? shape?.value ?? "") === String(item.shapeId))?.name || String(item.shapeId || "Shape"),
      value: String(item.shapeId),
    }));
  }
};

const fetchMaterialBorders = async () => {
  isFetching.value = true;
  try {
    const res = await api.getRequiredOptionBorders(configID.value);
    if (res) {
      const bordersData = res;
      borders.value = {
        settings: normalizeSettings(bordersData.settings),
        items: normalizeArray(bordersData.items).map(normalizeBorder),
      };
      manageBorders.value = bordersData.manageBorders || [];
      borderSizes.value = (bordersData.sizes || []).map((item, index) => ({
        name: item.label,
        value: String(item?.id ?? item?.value ?? `size-${index + 1}`),
      }));
    }
  } finally {
    isFetching.value = false;
  }
};

const updateBorders = async () => {
  if (isLoading.value) return;
  isLoading.value = true;
  try {
    const res = await api.updateRequiredOptionBorders(configID.value, borders.value);
    if (res?.success) {
      toastMessage(res.message);
      isNewBorder.value = false;
      isEdit.value = false;
      await fetchMaterialBorders();
    } else {
      toastMessage(res?.message || __("Unable to save borders", "all-signs-customizer-for-woocommerce-pro"), "warning");
    }
  } finally {
    isLoading.value = false;
  }
};

const addBorders = async () => {
  isLoading.value = true;
  try {
    const payload = normalizeBorder(border.value);
    payload.isDefault = !borders.value.items.length;
    const res = await api.addRequiredOptionBorderItem(configID.value, payload);
    if (res?.success) {
      toastMessage(res.message);
      isNewBorder.value = false;
      isEdit.value = false;
      await fetchMaterialBorders();
    } else {
      toastMessage(res?.message || __("Unable to add border", "all-signs-customizer-for-woocommerce-pro"), "warning");
    }
  } finally {
    isLoading.value = false;
  }
};

const updateMaterialBorders = async () => {
  if (!borderId.value) return;
  isLoading.value = true;
  try {
    const res = await api.updateRequiredOptionBorderItem(configID.value, borderId.value, normalizeBorder(border.value));
    if (res?.success) {
      toastMessage(res.message);
      isNewBorder.value = false;
      isEdit.value = false;
      await fetchMaterialBorders();
    } else {
      toastMessage(res?.message || __("Unable to update border", "all-signs-customizer-for-woocommerce-pro"), "warning");
    }
  } finally {
    isLoading.value = false;
  }
};

const deleteBorders = async () => {
  if (!borderId.value) return;
  openModal.value = false;
  isLoading.value = true;
  try {
    const res = await api.deleteRequiredOptionBorderItem(configID.value, borderId.value);
    if (res?.success) {
      toastMessage(res.message);
      isNewBorder.value = false;
      isEdit.value = false;
      await fetchMaterialBorders();
    } else {
      toastMessage(res?.message || __("Unable to delete border", "all-signs-customizer-for-woocommerce-pro"), "warning");
    }
  } finally {
    isLoading.value = false;
  }
};

const selectMaterialBorder = (id, bd, isDeleting = false) => {
  borderId.value = String(id || "");
  border.value = normalizeBorder(JSON.parse(JSON.stringify(bd)));
  if (isDeleting) {
    openModal.value = true;
    return;
  }
  isEdit.value = true;
  isNewBorder.value = true;
};

const selectDefault = async (key) => {
  if (!key || isLoading.value) return;
  isLoading.value = true;
  defaultActionId.value = String(key);
  try {
    const res = await api.setRequiredOptionDefault(configID.value, "borders", key);
    if (res?.success) {
      toastMessage(res.message || __("Default border updated", "all-signs-customizer-for-woocommerce-pro"));
      await fetchMaterialBorders();
    } else {
      toastMessage(res?.message || __("Unable to update default border", "all-signs-customizer-for-woocommerce-pro"), "warning");
    }
  } finally {
    isLoading.value = false;
    defaultActionId.value = "";
  }
};

const newBorder = () => {
  const firstAvailable = availableManagedBorders.value[0]?.value;
  if (firstAvailable === undefined) {
    toastMessage(__("No more borders available", "all-signs-customizer-for-woocommerce-pro"), "warning");
    return;
  }
  borderId.value = "";
  border.value = createBorder("", firstAvailable);
  isEdit.value = false;
  isNewBorder.value = true;
};

const back = () => {
  isNewBorder.value = false;
  isEdit.value = false;
  borderId.value = "";
  border.value = createBorder();
};

const closeModal = () => openModal.value = false;
const addNewColor = () => borders.value.settings.colors.push({ name: "", codeHex: "#ffffff", additionalPrice: 0 });
const removeBordersColor = (key) => borders.value.settings.colors.splice(key, 1);
const startBorderColorDrag = (event, key) => {
  colorDragIndex.value = key;
  colorDropIndex.value = key;
  event.dataTransfer.effectAllowed = "move";
  event.dataTransfer.dropEffect = "move";
  event.dataTransfer.setData("text/plain", String(key));
};
const endBorderColorDrag = () => {
  colorDragIndex.value = null;
  colorDropIndex.value = null;
};
const setBorderColorDropTarget = (key) => {
  if (colorDragIndex.value !== null) {
    colorDropIndex.value = key;
  }
};
const dropBorderColor = (targetIndex) => {
  const sourceIndex = colorDragIndex.value;
  if (sourceIndex === null || sourceIndex === targetIndex) {
    endBorderColorDrag();
    return;
  }

  const colors = borders.value.settings.colors;
  const [movingColor] = colors.splice(sourceIndex, 1);
  colors.splice(targetIndex, 0, movingColor);
  endBorderColorDrag();
};
const enableBorderWidth = () => borders.value.settings.enableBorderWidth = !borders.value.settings.enableBorderWidth;
const enableBorderColor = () => borders.value.settings.enableBorderColor = !borders.value.settings.enableBorderColor;

const exclusionSummary = (items, fallback) => {
  const count = normalizeArray(items).length;
  return count ? `${count} ${__("excluded.", "all-signs-customizer-for-woocommerce-pro")}` : fallback;
};

const selectCustomBorderColorPrevImage = () => {
  if (!window.wp?.media) return;
  const uploader = window.wp.media({
    title: __("Select custom color preview", "all-signs-customizer-for-woocommerce-pro"),
    button: { text: __("Select image", "all-signs-customizer-for-woocommerce-pro") },
    multiple: false,
  });
  uploader.on("select", () => {
    const attachment = uploader.state().get("selection").first()?.toJSON();
    if (attachment?.type === "image" && attachment.url) {
      borders.value.settings.customColorsPrevImg = attachment.url;
    }
  });
  uploader.open();
};

const goToManageBorders = () => {
  router.push({ path: "/settings/border", query: { returnTo: route.fullPath } });
};

onMounted(async () => {
  await fetchMaterialShapes();
  await fetchMaterialBorders();
});
</script>

<style scoped>
.ascwo-borders-panel {
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

.ascwo-borders-table,
.ascwo-borders-table thead,
.ascwo-borders-table tbody,
.ascwo-borders-table tr,
.ascwo-borders-table th,
.ascwo-borders-table td {
  border-left: 0 !important;
  border-right: 0 !important;
  outline: 0 !important;
  box-shadow: none !important;
}

.ascwo-borders-table {
  border: 0 !important;
}

.ascwo-borders-table th {
  padding: 9px 12px;
  border-top: 0 !important;
  border-bottom: 0 !important;
  color: #616161;
  font-size: 11px;
  line-height: 16px;
  font-weight: 700;
  text-align: left;
}

.ascwo-borders-table td {
  padding: 8px 12px;
  border-top: 0 !important;
  border-bottom: 0 !important;
  color: #303030;
  font-size: 12px;
  line-height: 18px;
  text-align: left;
}

.ascwo-borders-table tbody tr {
  border-bottom: 1px solid #e5e7eb !important;
}

.ascwo-borders-table tbody tr:last-child {
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

.ascwo-multi-input {
  height: 38px;
}

.ascwo-field-block {
  display: block;
  margin-top: 14px;
}

.ascwo-form-body {
  padding-top: 6px;
}

.ascwo-settings-block {
  padding-top: 14px;
  border-top: 1px solid #e5e7eb;
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

.ascwo-colors-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.ascwo-color-row {
  display: grid;
  grid-template-columns: 16px 22px 28px minmax(0, 1fr) minmax(120px, 0.7fr) 20px;
  align-items: center;
  gap: 8px;
  padding: 12px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  transition: background 120ms ease, border-color 120ms ease;
}

.ascwo-color-row.is-dragging {
  background: #f6f6f7;
  border-color: #c9cccf;
  opacity: 0.72;
}

.ascwo-color-row.is-drop-target {
  border-color: #007a72;
  box-shadow: inset 0 0 0 1px #007a72;
}

.ascwo-drag-button {
  width: 18px;
  height: 22px;
  padding: 0;
  border: 0;
  background: transparent;
  color: #667085;
  cursor: grab;
}

.ascwo-drag-button:active {
  cursor: grabbing;
}

.ascwo-drag-icon {
  width: 16px;
  height: 16px;
  pointer-events: none;
}

.ascwo-color-index,
.ascwo-color-price span {
  color: #616161;
  font-size: 11px;
  line-height: 14px;
}

.ascwo-color-swatch {
  width: 26px;
  height: 26px;
  padding: 0;
  border: 1px solid transparent;
  border-radius: 4px;
  background: transparent;
  cursor: pointer;
  transition: transform 120ms ease, border-color 120ms ease, box-shadow 120ms ease;
}

.ascwo-color-swatch:hover {
  border-color: #8c9196;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.14);
  transform: translateY(-1px);
}

.ascwo-color-fields,
.ascwo-color-price {
  display: grid;
  gap: 4px;
}

.ascwo-color-input {
  height: 28px;
  padding: 4px 8px;
  font-size: 11px;
  line-height: 14px;
}

.ascwo-icon-danger {
  border: 0;
  background: transparent;
  color: #8e1f0b;
  cursor: pointer;
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

@media (max-width: 960px) {
  .ascwo-colors-grid {
    grid-template-columns: 1fr;
  }
}
</style>
