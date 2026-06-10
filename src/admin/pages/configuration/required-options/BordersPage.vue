<template>
  <div class="asowp-borders-panel asowp-space-y-3">
    <template v-if="!isNewBorder">
      <section class="asowp-card">
        <div class="asowp-card-inner asowp-flex asowp-items-center asowp-justify-between asowp-gap-4">
          <div>
            <h2 class="asowp-title">{{ __("Borders", "all-signs-options-pro") }}</h2>
            <p class="asowp-subtitle">{{ __("Manage the borders available in this config and exclude incompatible shapes.", "all-signs-options-pro") }}</p>
          </div>
          <div class="asowp-flex asowp-items-center asowp-gap-2">
            <button type="button" @click="newBorder" class="asowp-primary-button">
              <PlusIcon class="asowp-w-4 asowp-h-4" />
              {{ __("Add border", "all-signs-options-pro") }}
            </button>
            <button type="button" @click="goToManageBorders" class="asowp-secondary-button">
              {{ __("Manage borders", "all-signs-options-pro") }}
            </button>
          </div>
        </div>
      </section>

      <section class="asowp-card">
        <div class="asowp-card-inner">
          <h3 class="asowp-section-title">{{ __("Borders List", "all-signs-options-pro") }}</h3>
          <table class="asowp-borders-table asowp-w-full asowp-border-collapse">
            <thead class="asowp-bg-[#f3f3f3]">
              <tr>
                <th>{{ __("Preview", "all-signs-options-pro") }}</th>
                <th>{{ __("Label", "all-signs-options-pro") }}</th>
                <th>{{ __("Price", "all-signs-options-pro") }}</th>
                <th>{{ __("Default", "all-signs-options-pro") }}</th>
                <th>{{ __("Actions", "all-signs-options-pro") }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="isFetching">
                <td colspan="5" class="asowp-text-center asowp-py-8">
                  <Loader2Icon class="asowp-w-7 asowp-h-7 asowp-text-[#007a72] asowp-animate-spin asowp-mx-auto" />
                </td>
              </tr>
              <tr v-else-if="borders.items.length === 0">
                <td colspan="5" class="asowp-text-center asowp-py-8 asowp-text-[13px] asowp-text-[#616161]">
                  {{ __("No borders configured.", "all-signs-options-pro") }}
                </td>
              </tr>
              <tr v-for="(bd, key) in borders.items" :key="`${bd.manageBorderId}-${key}`">
                <td>
                  <div class="asowp-preview-box">
                    <img v-if="getManagedBorder(bd)?.icon" :src="getManagedBorder(bd).icon" :alt="getManagedBorder(bd).name" />
                    <SquareIcon v-else class="asowp-w-7 asowp-h-7 asowp-text-[#111827]" />
                  </div>
                </td>
                <td class="asowp-row-strong">{{ getManagedBorder(bd)?.name || __("Unknown border", "all-signs-options-pro") }}</td>
                <td>{{ Number(bd.additionalPrice || 0) }}</td>
                <td>
                  <div class="asowp-inline-flex asowp-items-center asowp-gap-2">
                    <span class="asowp-toggle-label">{{ __("No", "all-signs-options-pro") }}</span>
                    <button type="button" @click="!isLoading && selectDefault(key)" :class="['asowp-toggle', bd.isDefault ? 'is-active' : '']"><span></span></button>
                    <span class="asowp-toggle-label">{{ __("Yes", "all-signs-options-pro") }}</span>
                  </div>
                </td>
                <td>
                  <div class="asowp-flex asowp-items-center asowp-gap-3">
                    <button type="button" @click="selectMaterialBorder(key, bd)" class="asowp-outline-button">
                      <Edit2Icon class="asowp-w-3.5 asowp-h-3.5" />
                      {{ __("Edit", "all-signs-options-pro") }}
                    </button>
                    <button type="button" @click="selectMaterialBorder(key, bd, true)" class="asowp-link-danger">
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

      <section class="asowp-card">
        <div class="asowp-card-inner asowp-form-body">
          <h3 class="asowp-section-title">{{ __("Border Settings", "all-signs-options-pro") }}</h3>
          <p class="asowp-subtitle asowp-mb-4">{{ __("Control border width support and the border color palette shown in the configurator.", "all-signs-options-pro") }}</p>

          <div class="asowp-flex asowp-items-center asowp-gap-8 asowp-mb-4">
            <div class="asowp-inline-flex asowp-items-center asowp-gap-2">
              <span class="asowp-form-label asowp-m-0">{{ __("Enable border width", "all-signs-options-pro") }}</span>
              <button type="button" @click="enableBorderWidth" :class="['asowp-toggle', borders.settings.enableBorderWidth ? 'is-active' : '']"><span></span></button>
            </div>
            <div class="asowp-inline-flex asowp-items-center asowp-gap-2">
              <span class="asowp-form-label asowp-m-0">{{ __("Enable border color", "all-signs-options-pro") }}</span>
              <button type="button" @click="enableBorderColor" :class="['asowp-toggle', borders.settings.enableBorderColor ? 'is-active' : '']"><span></span></button>
            </div>
          </div>

          <div v-if="borders.settings.enableBorderColor" class="asowp-settings-block">
            <div class="asowp-grid asowp-grid-cols-1 lg:asowp-grid-cols-2 asowp-gap-4">
              <label>
                <span class="asowp-form-label">{{ __("Border colors label", "all-signs-options-pro") }}</span>
                <input type="text" v-model="borders.settings.borderColorsLabel" class="asowp-form-input" />
              </label>
              <label>
                <span class="asowp-form-label">{{ __("Custom color preview image", "all-signs-options-pro") }}</span>
                <div class="asowp-file-input">
                  <button type="button" @click.prevent="selectCustomBorderColorPrevImage" class="asowp-file-button">{{ __("Upload image", "all-signs-options-pro") }}</button>
                  <input v-model="borders.settings.customColorsPrevImg" autocomplete="off" />
                  <div class="asowp-upload-preview">
                    <img v-if="borders.settings.customColorsPrevImg" :src="borders.settings.customColorsPrevImg" alt="" />
                  </div>
                </div>
              </label>
            </div>

            <h4 class="asowp-section-title asowp-mt-5">{{ __("Border Colors", "all-signs-options-pro") }}</h4>
            <div class="asowp-colors-grid">
              <div
                v-for="(color, key) in borders.settings.colors"
                :key="key"
                :class="[
                  'asowp-color-row',
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
                  class="asowp-drag-button"
                  draggable="true"
                  @dragstart="startBorderColorDrag($event, key)"
                  @dragend="endBorderColorDrag"
                  :aria-label="__('Reorder color', 'all-signs-options-pro')"
                >
                  <GripVerticalIcon class="asowp-drag-icon" />
                </button>
                <span class="asowp-color-index">{{ key + 1 }}</span>
                <input type="color" v-model="color.codeHex" class="asowp-color-swatch" :title="__('Choose color', 'all-signs-options-pro')" />
                <div class="asowp-color-fields">
                  <input type="text" v-model="color.name" class="asowp-form-input asowp-color-input" :placeholder="__('Name', 'all-signs-options-pro')" />
                  <input type="text" v-model="color.codeHex" class="asowp-form-input asowp-color-input" />
                </div>
                <label class="asowp-color-price">
                  <span>{{ __("Additional price", "all-signs-options-pro") }}</span>
                  <input type="number" v-model="color.additionalPrice" class="asowp-form-input asowp-color-input" />
                </label>
                <button type="button" @click="removeBordersColor(key)" class="asowp-icon-danger">
                  <Trash2Icon class="asowp-w-3.5 asowp-h-3.5" />
                </button>
              </div>
            </div>
            <button type="button" @click="addNewColor" class="asowp-secondary-button asowp-mt-3">{{ __("Add color", "all-signs-options-pro") }}</button>
          </div>
        </div>
        <div class="asowp-form-footer">
          <button type="button" @click="updateBorders" :disabled="isLoading" class="asowp-primary-button">
            {{ isLoading ? __("Saving...", "all-signs-options-pro") : __("Save settings", "all-signs-options-pro") }}
          </button>
        </div>
      </section>
    </template>

    <section v-else class="asowp-card">
      <div class="asowp-card-inner asowp-form-body">
        <h3 class="asowp-section-title">{{ isEdit ? __("Edit border", "all-signs-options-pro") : __("Add border", "all-signs-options-pro") }}</h3>

        <label class="asowp-field-block">
          <span class="asowp-form-label">{{ __("Border", "all-signs-options-pro") }}</span>
          <select v-model.number="border.manageBorderId" class="asowp-form-input">
            <option v-for="option in availableManagedBorders" :key="option.value" :value="option.value">
              {{ option.name }}
            </option>
          </select>
        </label>

        <div class="asowp-selected-preview">
          <div class="asowp-preview-box asowp-preview-box-lg">
            <img v-if="selectedManagedBorder?.icon" :src="selectedManagedBorder.icon" :alt="selectedManagedBorder.name" />
            <SquareIcon v-else class="asowp-w-9 asowp-h-9 asowp-text-[#111827]" />
          </div>
          <div>
            <div class="asowp-row-strong">{{ selectedManagedBorder?.name || __("None", "all-signs-options-pro") }}</div>
            <p class="asowp-help-text asowp-m-0">{{ selectedManagedBorder?.value || __("Preview of the border selected for this config.", "all-signs-options-pro") }}</p>
          </div>
        </div>

        <label class="asowp-field-block">
          <span class="asowp-form-label">{{ __("Additional price", "all-signs-options-pro") }}</span>
          <input type="number" v-model="border.additionalPrice" class="asowp-form-input" />
        </label>

        <label class="asowp-field-block">
          <span class="asowp-form-label">{{ __("Exclude sizes", "all-signs-options-pro") }}</span>
          <Multiselect
            v-model="border.excludeSizes"
            mode="multiple"
            :options="borderSizes"
            label="name"
            valueProp="value"
            trackBy="name"
            placeholder=""
          />
          <span class="asowp-help-text">{{ __("Hide this border for selected sizes.", "all-signs-options-pro") }}</span>
          <span class="asowp-help-text">{{ exclusionSummary(border.excludeSizes, __("No sizes excluded.", "all-signs-options-pro")) }}</span>
        </label>

        <label class="asowp-field-block">
          <span class="asowp-form-label">{{ __("Exclude shapes", "all-signs-options-pro") }}</span>
          <Multiselect
            v-model="border.excludeShapes"
            mode="multiple"
            :options="borderShapes"
            label="name"
            valueProp="value"
            trackBy="name"
            placeholder=""
          />
          <span class="asowp-help-text">{{ __("Hide this border for shapes that do not support it.", "all-signs-options-pro") }}</span>
          <span class="asowp-help-text">{{ exclusionSummary(border.excludeShapes, __("No shapes excluded.", "all-signs-options-pro")) }}</span>
        </label>
      </div>
      <div class="asowp-form-footer">
        <button type="button" @click="back" class="asowp-secondary-button">{{ __("Back to borders", "all-signs-options-pro") }}</button>
        <button type="button" @click="isEdit ? updateMaterialBorders() : addBorders()" :disabled="isLoading || border.manageBorderId < 0" class="asowp-primary-button">
          {{ isLoading ? __("Saving...", "all-signs-options-pro") : __("Save border", "all-signs-options-pro") }}
        </button>
      </div>
    </section>

    <div v-if="openModal" class="asowp-fixed asowp-inset-0 asowp-z-[20000] asowp-flex asowp-items-center asowp-justify-center">
      <div class="asowp-absolute asowp-inset-0 asowp-bg-black/45" @click="closeModal"></div>
      <div class="asowp-delete-modal">
        <h3 class="asowp-text-[16px] asowp-font-[900] asowp-text-[#303030] asowp-mt-0 asowp-mb-2">{{ __("Delete border?", "all-signs-options-pro") }}</h3>
        <p class="asowp-text-[13px] asowp-text-[#616161] asowp-mt-0 asowp-mb-5">{{ __("Are you sure you want to delete this border?", "all-signs-options-pro") }}</p>
        <div class="asowp-flex asowp-justify-end asowp-gap-2">
          <button type="button" @click="closeModal" class="asowp-secondary-button">{{ __("Cancel", "all-signs-options-pro") }}</button>
          <button type="button" @click="deleteBorders" :disabled="isLoading" class="asowp-danger-button">{{ __("Delete", "all-signs-options-pro") }}</button>
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

const createBorder = (manageBorderId = -1) => ({
  manageBorderId,
  additionalPrice: 0,
  excludeSizes: [],
  excludeShapes: [],
  isDefault: false,
});

const isFetching = ref(true);
const isNewBorder = ref(false);
const isLoading = ref(false);
const isEdit = ref(false);
const openModal = ref(false);
const borderId = ref(null);
const colorDragIndex = ref(null);
const colorDropIndex = ref(null);

const borders = ref({ settings: defaultSettings(), items: [] });
const manageBorders = ref([]);
const borderSizes = ref([]);
const borderShapes = ref([]);
const border = ref(createBorder());

const normalizeArray = (value) => Array.isArray(value) ? value : [];
const getManagedBorder = (bd) => manageBorders.value[Number(bd?.manageBorderId)] || null;

const selectedManagedBorder = computed(() => manageBorders.value[Number(border.value.manageBorderId)] || null);

const availableManagedBorders = computed(() => manageBorders.value
  .map((item, index) => ({ ...item, value: index }))
  .filter((item) => {
    if (item.value === Number(border.value.manageBorderId)) return true;
    return !borders.value.items.some((bd) => Number(bd.manageBorderId) === item.value);
  }));

const normalizeBorder = (item) => ({
  ...createBorder(),
  ...item,
  manageBorderId: Number(item?.manageBorderId ?? -1),
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
      name: res.manageShapes?.[item.shapeId]?.name || "Shape",
      value: item.shapeId,
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
      borderSizes.value = (bordersData.sizes || []).map((item, index) => ({ name: item.label, value: index }));
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
      toastMessage(res?.message || __("Unable to save borders", "all-signs-options-pro"), "warning");
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
      toastMessage(res?.message || __("Unable to add border", "all-signs-options-pro"), "warning");
    }
  } finally {
    isLoading.value = false;
  }
};

const updateMaterialBorders = async () => {
  if (borderId.value === null) return;
  isLoading.value = true;
  try {
    const res = await api.updateRequiredOptionBorderItem(configID.value, borderId.value, normalizeBorder(border.value));
    if (res?.success) {
      toastMessage(res.message);
      isNewBorder.value = false;
      isEdit.value = false;
      await fetchMaterialBorders();
    } else {
      toastMessage(res?.message || __("Unable to update border", "all-signs-options-pro"), "warning");
    }
  } finally {
    isLoading.value = false;
  }
};

const deleteBorders = async () => {
  if (borderId.value === null) return;
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
      toastMessage(res?.message || __("Unable to delete border", "all-signs-options-pro"), "warning");
    }
  } finally {
    isLoading.value = false;
  }
};

const selectMaterialBorder = (id, bd, isDeleting = false) => {
  borderId.value = id;
  border.value = normalizeBorder(JSON.parse(JSON.stringify(bd)));
  if (isDeleting) {
    openModal.value = true;
    return;
  }
  isEdit.value = true;
  isNewBorder.value = true;
};

const selectDefault = async (key) => {
  isLoading.value = true;
  try {
    const res = await api.setRequiredOptionDefault(configID.value, "borders", key);
    if (res?.success) {
      await fetchMaterialBorders();
    } else {
      toastMessage(res?.message || __("Unable to update default border", "all-signs-options-pro"), "warning");
    }
  } finally {
    isLoading.value = false;
  }
};

const newBorder = () => {
  const firstAvailable = availableManagedBorders.value[0]?.value;
  if (firstAvailable === undefined) {
    toastMessage(__("No more borders available", "all-signs-options-pro"), "warning");
    return;
  }
  borderId.value = null;
  border.value = createBorder(firstAvailable);
  isEdit.value = false;
  isNewBorder.value = true;
};

const back = () => {
  isNewBorder.value = false;
  isEdit.value = false;
  borderId.value = null;
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
  return count ? `${count} ${__("excluded.", "all-signs-options-pro")}` : fallback;
};

const selectCustomBorderColorPrevImage = () => {
  if (!window.wp?.media) return;
  const uploader = window.wp.media({
    title: __("Select custom color preview", "all-signs-options-pro"),
    button: { text: __("Select image", "all-signs-options-pro") },
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
.asowp-borders-panel {
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

.asowp-borders-table,
.asowp-borders-table thead,
.asowp-borders-table tbody,
.asowp-borders-table tr,
.asowp-borders-table th,
.asowp-borders-table td {
  border-left: 0 !important;
  border-right: 0 !important;
  outline: 0 !important;
  box-shadow: none !important;
}

.asowp-borders-table {
  border: 0 !important;
}

.asowp-borders-table th {
  padding: 9px 12px;
  border-top: 0 !important;
  border-bottom: 0 !important;
  color: #616161;
  font-size: 11px;
  line-height: 16px;
  font-weight: 700;
  text-align: left;
}

.asowp-borders-table td {
  padding: 8px 12px;
  border-top: 0 !important;
  border-bottom: 0 !important;
  color: #303030;
  font-size: 12px;
  line-height: 18px;
  text-align: left;
}

.asowp-borders-table tbody tr {
  border-bottom: 1px solid #e5e7eb !important;
}

.asowp-borders-table tbody tr:last-child {
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

.asowp-multi-input {
  height: 38px;
}

.asowp-field-block {
  display: block;
  margin-top: 14px;
}

.asowp-form-body {
  padding-top: 6px;
}

.asowp-settings-block {
  padding-top: 14px;
  border-top: 1px solid #e5e7eb;
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

.asowp-colors-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.asowp-color-row {
  display: grid;
  grid-template-columns: 16px 22px 28px minmax(0, 1fr) minmax(120px, 0.7fr) 20px;
  align-items: center;
  gap: 8px;
  padding: 12px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  transition: background 120ms ease, border-color 120ms ease;
}

.asowp-color-row.is-dragging {
  background: #f6f6f7;
  border-color: #c9cccf;
  opacity: 0.72;
}

.asowp-color-row.is-drop-target {
  border-color: #007a72;
  box-shadow: inset 0 0 0 1px #007a72;
}

.asowp-drag-button {
  width: 18px;
  height: 22px;
  padding: 0;
  border: 0;
  background: transparent;
  color: #667085;
  cursor: grab;
}

.asowp-drag-button:active {
  cursor: grabbing;
}

.asowp-drag-icon {
  width: 16px;
  height: 16px;
  pointer-events: none;
}

.asowp-color-index,
.asowp-color-price span {
  color: #616161;
  font-size: 11px;
  line-height: 14px;
}

.asowp-color-swatch {
  width: 26px;
  height: 26px;
  padding: 0;
  border: 1px solid transparent;
  border-radius: 4px;
  background: transparent;
  cursor: pointer;
  transition: transform 120ms ease, border-color 120ms ease, box-shadow 120ms ease;
}

.asowp-color-swatch:hover {
  border-color: #8c9196;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.14);
  transform: translateY(-1px);
}

.asowp-color-fields,
.asowp-color-price {
  display: grid;
  gap: 4px;
}

.asowp-color-input {
  height: 28px;
  padding: 4px 8px;
  font-size: 11px;
  line-height: 14px;
}

.asowp-icon-danger {
  border: 0;
  background: transparent;
  color: #8e1f0b;
  cursor: pointer;
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

@media (max-width: 960px) {
  .asowp-colors-grid {
    grid-template-columns: 1fr;
  }
}
</style>
