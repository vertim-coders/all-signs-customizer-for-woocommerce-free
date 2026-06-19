<template>
  <div class="ascwo-colors-panel ascwo-space-y-3">
    <template v-if="!isNewColor">
      <section class="ascwo-card">
        <div class="ascwo-card-inner ascwo-flex ascwo-items-center ascwo-justify-between ascwo-gap-4">
          <div>
            <h2 class="ascwo-title">{{ __("Colors", "all-signs-customizer-for-woocommerce-pro") }}</h2>
            <p class="ascwo-subtitle">{{ __("Manage the classic color records, then exclude them from materials when needed.", "all-signs-customizer-for-woocommerce-pro") }}</p>
          </div>
          <button type="button" @click="newColor" class="ascwo-primary-button">
            <PlusIcon class="ascwo-w-4 ascwo-h-4" />
            {{ __("Add new color", "all-signs-customizer-for-woocommerce-pro") }}
          </button>
        </div>
      </section>

      <section class="ascwo-card">
        <div class="ascwo-card-inner">
          <h3 class="ascwo-section-title">{{ __("Colors List", "all-signs-customizer-for-woocommerce-pro") }}</h3>
          <table class="ascwo-colors-table ascwo-w-full ascwo-border-collapse">
            <thead class="ascwo-bg-[#f3f3f3]">
              <tr>
                <th>{{ __("Preview", "all-signs-customizer-for-woocommerce-pro") }}</th>
                <th>{{ __("Name", "all-signs-customizer-for-woocommerce-pro") }}</th>
                <th>{{ __("Background color", "all-signs-customizer-for-woocommerce-pro") }}</th>
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
              <tr v-else-if="colors.items.length === 0">
                <td colspan="5" class="ascwo-text-center ascwo-py-8 ascwo-text-[13px] ascwo-text-[#616161]">
                  {{ __("No colors configured.", "all-signs-customizer-for-woocommerce-pro") }}
                </td>
              </tr>
              <tr v-for="(col, key) in colors.items" :key="col.id || key">
                <td>
                  <div class="ascwo-color-preview" :style="getPreviewStyle(col)">
                    <img v-if="col.pattern?.active && col.pattern?.url" :src="col.pattern.url" :alt="col.name" />
                  </div>
                </td>
                <td class="ascwo-row-strong">{{ col.name }}</td>
                <td class="ascwo-font-mono">{{ inferColorHex(col) }}</td>
                <td>
                  <div class="ascwo-inline-flex ascwo-items-center ascwo-gap-2">
                    <span class="ascwo-toggle-label">{{ __("No", "all-signs-customizer-for-woocommerce-pro") }}</span>
                    <button type="button" @click="!isLoading && selectDefault(col.id || key)" :class="['ascwo-toggle', col.isDefault ? 'is-active' : '']"><span></span></button>
                    <span class="ascwo-toggle-label">{{ __("Yes", "all-signs-customizer-for-woocommerce-pro") }}</span>
                  </div>
                </td>
                <td>
                  <div class="ascwo-flex ascwo-items-center ascwo-gap-3">
                    <button type="button" @click="selectMaterialColor(col.id || key, col)" class="ascwo-outline-button">
                      <Edit2Icon class="ascwo-w-3.5 ascwo-h-3.5" />
                      {{ __("Edit", "all-signs-customizer-for-woocommerce-pro") }}
                    </button>
                    <button type="button" @click="selectMaterialColor(col.id || key, col, true)" class="ascwo-link-danger">
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
        <div class="ascwo-card-inner">
          <h3 class="ascwo-section-title ascwo-mb-0">{{ __("Custom Colors", "all-signs-customizer-for-woocommerce-pro") }}</h3>
          <p class="ascwo-subtitle ascwo-mb-4">{{ __("Keep the same classic fields used for custom color settings.", "all-signs-customizer-for-woocommerce-pro") }}</p>

          <div class="ascwo-setting-row ascwo-border-t">
            <div>
              <h4 class="ascwo-setting-title">{{ __("Enable custom colors", "all-signs-customizer-for-woocommerce-pro") }}</h4>
            </div>
            <div class="ascwo-inline-flex ascwo-items-center ascwo-gap-2">
              <span class="ascwo-toggle-label">{{ __("No", "all-signs-customizer-for-woocommerce-pro") }}</span>
              <button type="button" @click="handleChangeCustomColorsActive" :class="['ascwo-toggle', colors.customColors.active ? 'is-active' : '']"><span></span></button>
              <span class="ascwo-toggle-label">{{ __("Yes", "all-signs-customizer-for-woocommerce-pro") }}</span>
            </div>
          </div>

          <label class="ascwo-block ascwo-mt-3">
            <span class="ascwo-form-label">{{ __("Label", "all-signs-customizer-for-woocommerce-pro") }}</span>
            <input v-model="colors.customColors.label" class="ascwo-form-input" autocomplete="off" />
          </label>

          <label class="ascwo-block ascwo-mt-3">
            <span class="ascwo-form-label">{{ __("Preview image", "all-signs-customizer-for-woocommerce-pro") }}</span>
            <div class="ascwo-file-input">
              <button type="button" @click.prevent="selectCustomPrevImage" class="ascwo-file-button">{{ __("Preview image", "all-signs-customizer-for-woocommerce-pro") }}</button>
              <input v-model="colors.customColors.prevImg" autocomplete="off" />
            </div>
            <span class="ascwo-help-text">{{ __("Preview image for the custom colors option.", "all-signs-customizer-for-woocommerce-pro") }}</span>
          </label>

          <div class="ascwo-flex ascwo-justify-end ascwo-mt-5">
            <button type="button" @click="updateMaterialColor" :disabled="isLoading" class="ascwo-primary-button">
              {{ isLoading ? __("Saving...", "all-signs-customizer-for-woocommerce-pro") : __("Save settings", "all-signs-customizer-for-woocommerce-pro") }}
            </button>
          </div>
        </div>
      </section>
    </template>

    <template v-else>
      <section class="ascwo-card">
        <div class="ascwo-card-inner ascwo-flex ascwo-justify-end">
          <button type="button" @click="back" class="ascwo-secondary-button">{{ __("Back to colors", "all-signs-customizer-for-woocommerce-pro") }}</button>
        </div>
        <div class="ascwo-card-inner ascwo-form-body">
          <div class="ascwo-grid ascwo-grid-cols-1 lg:ascwo-grid-cols-2 ascwo-gap-4">
            <label class="ascwo-block">
              <span class="ascwo-form-label">{{ __("Name", "all-signs-customizer-for-woocommerce-pro") }}</span>
              <input v-model.trim="color.name" class="ascwo-form-input" autocomplete="off" />
              <span class="ascwo-help-text">{{ __("Customer-facing color name.", "all-signs-customizer-for-woocommerce-pro") }}</span>
            </label>
            <label class="ascwo-block">
              <span class="ascwo-form-label">{{ __("Preview image", "all-signs-customizer-for-woocommerce-pro") }}</span>
              <div class="ascwo-file-input">
                <button type="button" @click.prevent="selectColorPreviewImage" class="ascwo-file-button">{{ __("Preview image", "all-signs-customizer-for-woocommerce-pro") }}</button>
                <input v-model="color.prevImg" autocomplete="off" />
              </div>
              <span class="ascwo-help-text">{{ __("Optional preview image used for this color.", "all-signs-customizer-for-woocommerce-pro") }}</span>
            </label>
          </div>

          <div class="ascwo-setting-row ascwo-mt-4">
            <div>
              <h3 class="ascwo-setting-title">{{ __("Pattern", "all-signs-customizer-for-woocommerce-pro") }}</h3>
              <p class="ascwo-help-text ascwo-m-0">{{ __("Choose between a flat background color or a pattern image.", "all-signs-customizer-for-woocommerce-pro") }}</p>
            </div>
            <div class="ascwo-inline-flex ascwo-items-center ascwo-gap-2">
              <span class="ascwo-toggle-label">{{ __("Flat color", "all-signs-customizer-for-woocommerce-pro") }}</span>
              <button type="button" @click="color.pattern.active = !color.pattern.active" :class="['ascwo-toggle', color.pattern.active ? 'is-active' : '']"><span></span></button>
              <span class="ascwo-toggle-label">{{ __("Pattern image", "all-signs-customizer-for-woocommerce-pro") }}</span>
            </div>
          </div>

          <label v-if="!color.pattern.active" class="ascwo-block ascwo-mt-3">
            <span class="ascwo-form-label">{{ __("Material background color", "all-signs-customizer-for-woocommerce-pro") }}</span>
            <div class="ascwo-color-input-row">
              <input type="color" v-model="color.pattern.codeHex" class="ascwo-native-color" />
              <input v-model="color.pattern.codeHex" class="ascwo-form-input" autocomplete="off" />
            </div>
          </label>
          <label v-else class="ascwo-block ascwo-mt-3">
            <span class="ascwo-form-label">{{ __("Pattern image", "all-signs-customizer-for-woocommerce-pro") }}</span>
            <div class="ascwo-file-input">
              <button type="button" @click.prevent="selectColorBackgroundImage" class="ascwo-file-button">{{ __("Pattern image", "all-signs-customizer-for-woocommerce-pro") }}</button>
              <input v-model="color.pattern.url" autocomplete="off" />
            </div>
          </label>

          <div class="ascwo-setting-row ascwo-mt-4">
            <div>
              <h3 class="ascwo-setting-title">{{ __("Text color", "all-signs-customizer-for-woocommerce-pro") }}</h3>
              <p class="ascwo-help-text ascwo-m-0">{{ __("Enable a dedicated text color for this color option.", "all-signs-customizer-for-woocommerce-pro") }}</p>
            </div>
            <div class="ascwo-inline-flex ascwo-items-center ascwo-gap-2">
              <span class="ascwo-toggle-label">{{ __("No", "all-signs-customizer-for-woocommerce-pro") }}</span>
              <button type="button" @click="color.textColor.active = !color.textColor.active" :class="['ascwo-toggle', color.textColor.active ? 'is-active' : '']"><span></span></button>
              <span class="ascwo-toggle-label">{{ __("Yes", "all-signs-customizer-for-woocommerce-pro") }}</span>
            </div>
          </div>

          <div v-if="color.textColor.active" class="ascwo-grid ascwo-grid-cols-1 lg:ascwo-grid-cols-2 ascwo-gap-4 ascwo-mt-3">
            <label class="ascwo-block">
              <span class="ascwo-form-label">{{ __("Text color name", "all-signs-customizer-for-woocommerce-pro") }}</span>
              <input v-model="color.textColor.name" class="ascwo-form-input" autocomplete="off" />
            </label>
            <label class="ascwo-block">
              <span class="ascwo-form-label">{{ __("Text color", "all-signs-customizer-for-woocommerce-pro") }}</span>
              <div class="ascwo-color-input-row">
                <input type="color" v-model="color.textColor.codeHex" class="ascwo-native-color" />
                <input v-model="color.textColor.codeHex" class="ascwo-form-input" autocomplete="off" />
              </div>
            </label>
          </div>

          <div v-if="color.textColor.active" class="ascwo-setting-row ascwo-mt-4">
            <div>
              <h3 class="ascwo-setting-title">{{ __("Use the same color for border", "all-signs-customizer-for-woocommerce-pro") }}</h3>
              <p class="ascwo-help-text ascwo-m-0">{{ __("Apply the text color to the border for this color option.", "all-signs-customizer-for-woocommerce-pro") }}</p>
            </div>
            <div class="ascwo-inline-flex ascwo-items-center ascwo-gap-2">
              <span class="ascwo-toggle-label">{{ __("No", "all-signs-customizer-for-woocommerce-pro") }}</span>
              <button type="button" @click="color.textColor.sameForBorder = !color.textColor.sameForBorder" :class="['ascwo-toggle', color.textColor.sameForBorder ? 'is-active' : '']"><span></span></button>
              <span class="ascwo-toggle-label">{{ __("Yes", "all-signs-customizer-for-woocommerce-pro") }}</span>
            </div>
          </div>

          <label class="ascwo-block ascwo-mt-3">
            <span class="ascwo-form-label">{{ __("Additional price", "all-signs-customizer-for-woocommerce-pro") }}</span>
            <div class="ascwo-price-input">
              <input type="number" v-model="color.additionalPrice" class="ascwo-form-input" />
              <span>$</span>
            </div>
          </label>
        </div>
        <div class="ascwo-form-footer">
          <button type="button" @click="back" class="ascwo-secondary-button">{{ __("Cancel", "all-signs-customizer-for-woocommerce-pro") }}</button>
          <button type="button" @click="isEdit ? updateColorInMaterialColor() : addMaterialColor()" :disabled="isLoading || !color.name.trim()" class="ascwo-primary-button">
            {{ isLoading ? __("Saving...", "all-signs-customizer-for-woocommerce-pro") : isEdit ? __("Update color", "all-signs-customizer-for-woocommerce-pro") : __("Save color", "all-signs-customizer-for-woocommerce-pro") }}
          </button>
        </div>
      </section>
    </template>

    <div v-if="openModal" class="ascwo-fixed ascwo-inset-0 ascwo-z-[20000] ascwo-flex ascwo-items-center ascwo-justify-center">
      <div class="ascwo-absolute ascwo-inset-0 ascwo-bg-black/45" @click="closeModal"></div>
      <div class="ascwo-delete-modal">
        <h3 class="ascwo-text-[16px] ascwo-font-[900] ascwo-text-[#303030] ascwo-mt-0 ascwo-mb-2">{{ __("Delete color?", "all-signs-customizer-for-woocommerce-pro") }}</h3>
        <p class="ascwo-text-[13px] ascwo-text-[#616161] ascwo-mt-0 ascwo-mb-5">{{ sprintf(__('Are you sure you want to delete "%s"?', "all-signs-customizer-for-woocommerce-pro"), color.name) }}</p>
        <div class="ascwo-flex ascwo-justify-end ascwo-gap-2">
          <button type="button" @click="closeModal" class="ascwo-secondary-button">{{ __("Cancel", "all-signs-customizer-for-woocommerce-pro") }}</button>
          <button type="button" @click="deleteMaterialColor" :disabled="isLoading" class="ascwo-danger-button">{{ __("Delete", "all-signs-customizer-for-woocommerce-pro") }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import api from "@/admin/Api/api";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import toastMessage from "@/admin/utils/functions";
import { Edit2Icon, Loader2Icon, PlusIcon, Trash2Icon } from "lucide-vue-next";
import { __, sprintf } from "@wordpress/i18n";

const route = useRoute();
const configID = ref(route.params.configId);

const isFetching = ref(true);
const isNewColor = ref(false);
const isLoading = ref(false);
const isEdit = ref(false);
const openModal = ref(false);
const colorId = ref(null);

const defaultColors = () => ({
  customColors: { active: true, label: "Custom Colors", prevImg: "" },
  items: [],
});

const defaultColor = () => ({
  isDefault: false,
  name: "",
  textColor: { active: false, sameForBorder: false, name: "", codeHex: "#000000" },
  pattern: { active: false, codeHex: "#000000", url: "" },
  prevImg: "",
  additionalPrice: 0,
});

const colors = ref(defaultColors());
const color = ref(defaultColor());

const namedColorHex = {
  black: "#000000",
  blue: "#2563eb",
  gold: "#d4a000",
  gray: "#6b7280",
  green: "#16a34a",
  grey: "#6b7280",
  lime: "#65a30d",
  orange: "#f97316",
  pink: "#bc4077",
  red: "#dc2626",
  purple: "#554585",
  silver: "#c0c0c0",
  transparent: "#ffffff",
  white: "#ffffff",
  yellow: "#eab308",
  brown: "#523d2a",
  cyan: "#0891b2",
};

const isTransparentValue = (value) => {
  const normalized = String(value || "").trim().toLowerCase();
  return !normalized || normalized === "transparent" || normalized === "rgba(0,0,0,0)" || normalized === "rgba(0, 0, 0, 0)";
};

const inferColorName = (item) => {
  const candidates = [
    item?.textColor?.name,
    item?.name,
  ];
  return String(candidates.find((value) => {
    const normalized = String(value || "").trim().toLowerCase();
    return normalized && normalized !== "transparent";
  }) || "").trim();
};

const inferColorHex = (item) => {
  const patternHex = String(item?.pattern?.codeHex || "").trim();
  const colorName = inferColorName(item).toLowerCase();
  if (!isTransparentValue(patternHex) && patternHex !== "#eeeeee") return patternHex;
  return namedColorHex[colorName] || "#ffffff";
};

const migrateLegacyColor = (item) => {
  const normalized = {
    ...defaultColor(),
    ...item,
    pattern: { ...defaultColor().pattern, ...(item.pattern || {}) },
    textColor: { ...defaultColor().textColor, ...(item.textColor || {}) },
  };
  let changed = false;
  const inferredName = inferColorName(normalized);

  if (String(normalized.name || "").trim().toLowerCase() === "transparent" && inferredName) {
    normalized.name = inferredName;
    changed = true;
  }

  if (!normalized.pattern.active && isTransparentValue(normalized.pattern.codeHex)) {
    normalized.pattern.codeHex = inferColorHex(normalized);
    changed = true;
  }

  if (!normalized.pattern.active && String(normalized.pattern.codeHex || "").trim().toLowerCase() === "#eeeeee") {
    normalized.pattern.codeHex = inferColorHex(normalized);
    changed = true;
  }

  if (!normalized.textColor.name && normalized.name) {
    normalized.textColor.name = normalized.name;
    changed = true;
  }

  return { color: normalized, changed };
};

const normalizeColors = (raw) => {
  const source = raw?.items ? raw : raw?.colors?.items ? raw.colors : defaultColors();
  let changed = false;
  const items = Array.isArray(source.items)
    ? source.items.map((item) => {
      const result = migrateLegacyColor(item);
      if (result.changed) changed = true;
      return result.color;
    })
    : [];
  return {
    changed,
    customColors: { ...defaultColors().customColors, ...(source.customColors || {}) },
    items,
  };
};

const fetchMaterialColors = async () => {
  isFetching.value = true;
  try {
    const res = await api.getRequiredOptionColors(configID.value);
    const normalized = normalizeColors(res);
    const shouldPersistMigration = normalized.changed;
    delete normalized.changed;
    colors.value = normalized;
    if (shouldPersistMigration) {
      await api.updateRequiredOptionColors(configID.value, colors.value);
    }
  } finally {
    isFetching.value = false;
  }
};

const updateMaterialColor = async () => {
  if (isLoading.value) return;
  isLoading.value = true;
  try {
    const res = await api.updateRequiredOptionColors(configID.value, colors.value);
    if (res?.success) {
      toastMessage(res.message);
      isNewColor.value = false;
      isEdit.value = false;
    } else {
      toastMessage(res?.message || __("Unable to save colors", "all-signs-customizer-for-woocommerce-pro"), "warning");
    }
  } finally {
    isLoading.value = false;
  }
};

const addMaterialColor = async () => {
  if (!color.value.name.trim()) return;
  isLoading.value = true;
  try {
    const res = await api.addRequiredOptionColorItem(configID.value, color.value);
    if (res?.success) {
      toastMessage(res.message);
      isNewColor.value = false;
      isEdit.value = false;
      await fetchMaterialColors();
    } else {
      toastMessage(res?.message || __("Unable to add color", "all-signs-customizer-for-woocommerce-pro"), "warning");
    }
  } finally {
    isLoading.value = false;
  }
};

const updateColorInMaterialColor = async () => {
  if (!color.value.name.trim()) return;
  isLoading.value = true;
  try {
    const res = await api.updateRequiredOptionColorItem(configID.value, colorId.value, color.value);
    if (res?.success) {
      toastMessage(res.message);
      isNewColor.value = false;
      isEdit.value = false;
      await fetchMaterialColors();
    } else {
      toastMessage(res?.message || __("Unable to update color", "all-signs-customizer-for-woocommerce-pro"), "warning");
    }
  } finally {
    isLoading.value = false;
  }
};

const deleteMaterialColor = async () => {
  openModal.value = false;
  isLoading.value = true;
  try {
    const res = await api.deleteRequiredOptionColorItem(configID.value, colorId.value);
    if (res?.success) {
      toastMessage(res.message);
      isNewColor.value = false;
      isEdit.value = false;
      await fetchMaterialColors();
    } else {
      toastMessage(res?.message || __("Unable to delete color", "all-signs-customizer-for-woocommerce-pro"), "warning");
    }
  } finally {
    isLoading.value = false;
  }
};

const selectMaterialColor = (id, col, isDeleting = false) => {
  colorId.value = id;
  color.value = JSON.parse(JSON.stringify({ ...defaultColor(), ...col }));
  if (isDeleting) openModal.value = true;
  else {
    isEdit.value = true;
    isNewColor.value = true;
  }
};

const selectDefault = async (key) => {
  isLoading.value = true;
  try {
    const res = await api.setRequiredOptionDefault(configID.value, "colors", key);
    if (res?.success) {
      await fetchMaterialColors();
    } else {
      toastMessage(res?.message || __("Unable to update default color", "all-signs-customizer-for-woocommerce-pro"), "warning");
    }
  } finally {
    isLoading.value = false;
  }
};

const newColor = () => {
  isNewColor.value = true;
  isEdit.value = false;
  colorId.value = null;
  color.value = defaultColor();
};

const back = () => {
  isNewColor.value = false;
  isEdit.value = false;
};

const closeModal = () => openModal.value = false;
const handleChangeCustomColorsActive = () => colors.value.customColors.active = !colors.value.customColors.active;

const getPreviewStyle = (item) => {
  if (item.pattern?.active && item.pattern?.url) return {};
  return { backgroundColor: inferColorHex(item) };
};

const openMedia = (title, callback) => {
  if (!window.wp?.media) return;
  const uploader = window.wp.media({
    title,
    button: { text: __("Select image", "all-signs-customizer-for-woocommerce-pro") },
    multiple: false,
  });
  uploader.on("select", () => {
    const attachment = uploader.state().get("selection").first()?.toJSON();
    if (attachment?.url) callback(attachment.url);
  });
  uploader.open();
};

const selectColorBackgroundImage = () => openMedia(
  __("Select pattern image", "all-signs-customizer-for-woocommerce-pro"),
  (url) => color.value.pattern.url = url
);
const selectColorPreviewImage = () => openMedia(
  __("Select color preview image", "all-signs-customizer-for-woocommerce-pro"),
  (url) => color.value.prevImg = url
);
const selectCustomPrevImage = () => openMedia(
  __("Select custom color preview image", "all-signs-customizer-for-woocommerce-pro"),
  (url) => colors.value.customColors.prevImg = url
);

onMounted(fetchMaterialColors);
</script>

<style scoped>
.ascwo-colors-panel {
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

.ascwo-colors-table,
.ascwo-colors-table thead,
.ascwo-colors-table tbody,
.ascwo-colors-table tr,
.ascwo-colors-table th,
.ascwo-colors-table td {
  border-left: 0 !important;
  border-right: 0 !important;
  outline: 0 !important;
  box-shadow: none !important;
}

.ascwo-colors-table {
  border: 0 !important;
}

.ascwo-colors-table th {
  padding: 9px 12px;
  border-top: 0 !important;
  border-bottom: 0 !important;
  color: #616161;
  font-size: 11px;
  line-height: 16px;
  font-weight: 700;
  text-align: left;
}

.ascwo-colors-table td {
  padding: 8px 12px;
  border-top: 0 !important;
  border-bottom: 0 !important;
  color: #303030;
  font-size: 12px;
  line-height: 18px;
  text-align: left;
}

.ascwo-colors-table tbody tr {
  border-bottom: 1px solid #e5e7eb !important;
}

.ascwo-colors-table tbody tr:last-child {
  border-bottom: 0 !important;
}

.ascwo-row-strong {
  font-weight: 900;
}

.ascwo-color-preview {
  width: 32px;
  height: 32px;
  overflow: hidden;
  border: 1px solid #dfe3e8;
  border-radius: 7px;
  background: #fff;
}

.ascwo-color-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
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

.ascwo-file-input,
.ascwo-color-input-row,
.ascwo-price-input {
  box-sizing: border-box;
  width: 100%;
  height: 38px;
  border: 1px solid #8c9196;
  border-radius: 7px;
  display: flex;
  align-items: center;
  background: #fff;
  overflow: hidden;
}

.ascwo-file-input input,
.ascwo-color-input-row .ascwo-form-input,
.ascwo-price-input .ascwo-form-input {
  flex: 1;
  min-width: 0;
  height: 100%;
  border: 0;
  border-radius: 0;
  box-shadow: none;
}

.ascwo-file-button {
  margin-left: 5px;
  min-height: 30px;
  padding: 6px 12px;
  border: 0;
  border-radius: 6px;
  background: #007a72;
  color: #fff;
  font-size: 12px;
  line-height: 16px;
  font-weight: 800;
  cursor: pointer;
}

.ascwo-native-color {
  width: 44px;
  height: 30px;
  margin-left: 6px;
  padding: 3px;
  border: 1px solid #c9cccf;
  border-radius: 4px;
  background: #fff;
}

.ascwo-price-input span {
  padding: 0 14px;
  color: #303030;
  font-size: 13px;
}

.ascwo-setting-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding-top: 12px;
}

.ascwo-setting-row.ascwo-border-t {
  border-top: 1px solid #e5e7eb;
}

.ascwo-setting-title {
  margin: 0;
  color: #303030;
  font-size: 13px;
  line-height: 18px;
  font-weight: 900;
}

.ascwo-form-body {
  padding-top: 8px;
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
</style>
