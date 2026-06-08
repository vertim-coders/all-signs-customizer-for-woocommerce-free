<template>
  <div class="asowp-colors-panel asowp-space-y-3">
    <template v-if="!isNewColor">
      <section class="asowp-card">
        <div class="asowp-card-inner asowp-flex asowp-items-center asowp-justify-between asowp-gap-4">
          <div>
            <h2 class="asowp-title">{{ __("Colors", "all-signs-options-pro") }}</h2>
            <p class="asowp-subtitle">{{ __("Manage the classic color records, then exclude them from materials when needed.", "all-signs-options-pro") }}</p>
          </div>
          <button type="button" @click="newColor" class="asowp-primary-button">
            <PlusIcon class="asowp-w-4 asowp-h-4" />
            {{ __("Add new color", "all-signs-options-pro") }}
          </button>
        </div>
      </section>

      <section class="asowp-card">
        <div class="asowp-card-inner">
          <h3 class="asowp-section-title">{{ __("Colors List", "all-signs-options-pro") }}</h3>
          <table class="asowp-colors-table asowp-w-full asowp-border-collapse">
            <thead class="asowp-bg-[#f3f3f3]">
              <tr>
                <th>{{ __("Preview", "all-signs-options-pro") }}</th>
                <th>{{ __("Name", "all-signs-options-pro") }}</th>
                <th>{{ __("Text color", "all-signs-options-pro") }}</th>
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
              <tr v-else-if="colors.allColors.length === 0">
                <td colspan="5" class="asowp-text-center asowp-py-8 asowp-text-[13px] asowp-text-[#616161]">
                  {{ __("No colors configured.", "all-signs-options-pro") }}
                </td>
              </tr>
              <tr v-for="(col, key) in colors.allColors" :key="key">
                <td>
                  <div class="asowp-color-preview" :style="getPreviewStyle(col)">
                    <img v-if="col.pattern?.active && col.pattern?.url" :src="col.pattern.url" :alt="col.name" />
                  </div>
                </td>
                <td class="asowp-row-strong">{{ col.name }}</td>
                <td>{{ col.textColor?.active ? col.textColor?.name || col.name : col.name }}</td>
                <td>
                  <div class="asowp-inline-flex asowp-items-center asowp-gap-2">
                    <span class="asowp-toggle-label">{{ __("No", "all-signs-options-pro") }}</span>
                    <button type="button" @click="!isLoading && selectDefault(key)" :class="['asowp-toggle', col.isDefault ? 'is-active' : '']"><span></span></button>
                    <span class="asowp-toggle-label">{{ __("Yes", "all-signs-options-pro") }}</span>
                  </div>
                </td>
                <td>
                  <div class="asowp-flex asowp-items-center asowp-gap-3">
                    <button type="button" @click="selectMaterialColor(key, col)" class="asowp-outline-button">
                      <Edit2Icon class="asowp-w-3.5 asowp-h-3.5" />
                      {{ __("Edit", "all-signs-options-pro") }}
                    </button>
                    <button type="button" @click="selectMaterialColor(key, col, true)" class="asowp-link-danger">
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
        <div class="asowp-card-inner">
          <h3 class="asowp-section-title asowp-mb-0">{{ __("Custom Colors", "all-signs-options-pro") }}</h3>
          <p class="asowp-subtitle asowp-mb-4">{{ __("Keep the same classic fields used for custom color settings.", "all-signs-options-pro") }}</p>

          <div class="asowp-setting-row asowp-border-t">
            <div>
              <h4 class="asowp-setting-title">{{ __("Enable custom colors", "all-signs-options-pro") }}</h4>
            </div>
            <div class="asowp-inline-flex asowp-items-center asowp-gap-2">
              <span class="asowp-toggle-label">{{ __("No", "all-signs-options-pro") }}</span>
              <button type="button" @click="handleChangeCustomColorsActive" :class="['asowp-toggle', colors.customColors.active ? 'is-active' : '']"><span></span></button>
              <span class="asowp-toggle-label">{{ __("Yes", "all-signs-options-pro") }}</span>
            </div>
          </div>

          <label class="asowp-block asowp-mt-3">
            <span class="asowp-form-label">{{ __("Label", "all-signs-options-pro") }}</span>
            <input v-model="colors.customColors.label" class="asowp-form-input" autocomplete="off" />
          </label>

          <label class="asowp-block asowp-mt-3">
            <span class="asowp-form-label">{{ __("Preview image", "all-signs-options-pro") }}</span>
            <div class="asowp-file-input">
              <button type="button" @click.prevent="selectCustomPrevImage" class="asowp-file-button">{{ __("Preview image", "all-signs-options-pro") }}</button>
              <input v-model="colors.customColors.prevImg" autocomplete="off" />
            </div>
            <span class="asowp-help-text">{{ __("Preview image for the custom colors option.", "all-signs-options-pro") }}</span>
          </label>

          <div class="asowp-flex asowp-justify-end asowp-mt-5">
            <button type="button" @click="updateMaterialColor" :disabled="isLoading" class="asowp-primary-button">
              {{ isLoading ? __("Saving...", "all-signs-options-pro") : __("Save settings", "all-signs-options-pro") }}
            </button>
          </div>
        </div>
      </section>
    </template>

    <template v-else>
      <section class="asowp-card">
        <div class="asowp-card-inner asowp-flex asowp-justify-end">
          <button type="button" @click="back" class="asowp-secondary-button">{{ __("Back to colors", "all-signs-options-pro") }}</button>
        </div>
        <div class="asowp-card-inner asowp-form-body">
          <div class="asowp-grid asowp-grid-cols-1 lg:asowp-grid-cols-2 asowp-gap-4">
            <label class="asowp-block">
              <span class="asowp-form-label">{{ __("Name", "all-signs-options-pro") }}</span>
              <input v-model.trim="color.name" class="asowp-form-input" autocomplete="off" />
              <span class="asowp-help-text">{{ __("Customer-facing color name.", "all-signs-options-pro") }}</span>
            </label>
            <label class="asowp-block">
              <span class="asowp-form-label">{{ __("Preview image", "all-signs-options-pro") }}</span>
              <div class="asowp-file-input">
                <button type="button" @click.prevent="selectColorPreviewImage" class="asowp-file-button">{{ __("Preview image", "all-signs-options-pro") }}</button>
                <input v-model="color.prevImg" autocomplete="off" />
              </div>
              <span class="asowp-help-text">{{ __("Optional preview image used for this color.", "all-signs-options-pro") }}</span>
            </label>
          </div>

          <div class="asowp-setting-row asowp-mt-4">
            <div>
              <h3 class="asowp-setting-title">{{ __("Pattern", "all-signs-options-pro") }}</h3>
              <p class="asowp-help-text asowp-m-0">{{ __("Choose between a flat background color or a pattern image.", "all-signs-options-pro") }}</p>
            </div>
            <div class="asowp-inline-flex asowp-items-center asowp-gap-2">
              <span class="asowp-toggle-label">{{ __("Flat color", "all-signs-options-pro") }}</span>
              <button type="button" @click="color.pattern.active = !color.pattern.active" :class="['asowp-toggle', color.pattern.active ? 'is-active' : '']"><span></span></button>
              <span class="asowp-toggle-label">{{ __("Pattern image", "all-signs-options-pro") }}</span>
            </div>
          </div>

          <label v-if="!color.pattern.active" class="asowp-block asowp-mt-3">
            <span class="asowp-form-label">{{ __("Material background color", "all-signs-options-pro") }}</span>
            <div class="asowp-color-input-row">
              <input type="color" v-model="color.pattern.codeHex" class="asowp-native-color" />
              <input v-model="color.pattern.codeHex" class="asowp-form-input" autocomplete="off" />
            </div>
          </label>
          <label v-else class="asowp-block asowp-mt-3">
            <span class="asowp-form-label">{{ __("Pattern image", "all-signs-options-pro") }}</span>
            <div class="asowp-file-input">
              <button type="button" @click.prevent="selectColorBackgroundImage" class="asowp-file-button">{{ __("Pattern image", "all-signs-options-pro") }}</button>
              <input v-model="color.pattern.url" autocomplete="off" />
            </div>
          </label>

          <div class="asowp-setting-row asowp-mt-4">
            <div>
              <h3 class="asowp-setting-title">{{ __("Text color", "all-signs-options-pro") }}</h3>
              <p class="asowp-help-text asowp-m-0">{{ __("Enable a dedicated text color for this color option.", "all-signs-options-pro") }}</p>
            </div>
            <div class="asowp-inline-flex asowp-items-center asowp-gap-2">
              <span class="asowp-toggle-label">{{ __("No", "all-signs-options-pro") }}</span>
              <button type="button" @click="color.textColor.active = !color.textColor.active" :class="['asowp-toggle', color.textColor.active ? 'is-active' : '']"><span></span></button>
              <span class="asowp-toggle-label">{{ __("Yes", "all-signs-options-pro") }}</span>
            </div>
          </div>

          <div v-if="color.textColor.active" class="asowp-grid asowp-grid-cols-1 lg:asowp-grid-cols-2 asowp-gap-4 asowp-mt-3">
            <label class="asowp-block">
              <span class="asowp-form-label">{{ __("Text color name", "all-signs-options-pro") }}</span>
              <input v-model="color.textColor.name" class="asowp-form-input" autocomplete="off" />
            </label>
            <label class="asowp-block">
              <span class="asowp-form-label">{{ __("Text color", "all-signs-options-pro") }}</span>
              <div class="asowp-color-input-row">
                <input type="color" v-model="color.textColor.codeHex" class="asowp-native-color" />
                <input v-model="color.textColor.codeHex" class="asowp-form-input" autocomplete="off" />
              </div>
            </label>
          </div>

          <div v-if="color.textColor.active" class="asowp-setting-row asowp-mt-4">
            <div>
              <h3 class="asowp-setting-title">{{ __("Use the same color for border", "all-signs-options-pro") }}</h3>
              <p class="asowp-help-text asowp-m-0">{{ __("Apply the text color to the border for this color option.", "all-signs-options-pro") }}</p>
            </div>
            <div class="asowp-inline-flex asowp-items-center asowp-gap-2">
              <span class="asowp-toggle-label">{{ __("No", "all-signs-options-pro") }}</span>
              <button type="button" @click="color.textColor.sameForBorder = !color.textColor.sameForBorder" :class="['asowp-toggle', color.textColor.sameForBorder ? 'is-active' : '']"><span></span></button>
              <span class="asowp-toggle-label">{{ __("Yes", "all-signs-options-pro") }}</span>
            </div>
          </div>

          <label class="asowp-block asowp-mt-3">
            <span class="asowp-form-label">{{ __("Additional price", "all-signs-options-pro") }}</span>
            <div class="asowp-price-input">
              <input type="number" v-model="color.additionalPrice" class="asowp-form-input" />
              <span>$</span>
            </div>
          </label>
        </div>
        <div class="asowp-form-footer">
          <button type="button" @click="back" class="asowp-secondary-button">{{ __("Cancel", "all-signs-options-pro") }}</button>
          <button type="button" @click="isEdit ? updateColorInMaterialColor() : addMaterialColor()" :disabled="isLoading || !color.name.trim()" class="asowp-primary-button">
            {{ isLoading ? __("Saving...", "all-signs-options-pro") : isEdit ? __("Update color", "all-signs-options-pro") : __("Save color", "all-signs-options-pro") }}
          </button>
        </div>
      </section>
    </template>

    <div v-if="openModal" class="asowp-fixed asowp-inset-0 asowp-z-[20000] asowp-flex asowp-items-center asowp-justify-center">
      <div class="asowp-absolute asowp-inset-0 asowp-bg-black/45" @click="closeModal"></div>
      <div class="asowp-delete-modal">
        <h3 class="asowp-text-[16px] asowp-font-[900] asowp-text-[#303030] asowp-mt-0 asowp-mb-2">{{ __("Delete color?", "all-signs-options-pro") }}</h3>
        <p class="asowp-text-[13px] asowp-text-[#616161] asowp-mt-0 asowp-mb-5">{{ sprintf(__('Are you sure you want to delete "%s"?', "all-signs-options-pro"), color.name) }}</p>
        <div class="asowp-flex asowp-justify-end asowp-gap-2">
          <button type="button" @click="closeModal" class="asowp-secondary-button">{{ __("Cancel", "all-signs-options-pro") }}</button>
          <button type="button" @click="deleteMaterialColor" :disabled="isLoading" class="asowp-danger-button">{{ __("Delete", "all-signs-options-pro") }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import api from "@/admin/Api/api";
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import toastMessage from "@/admin/utils/functions";
import { Edit2Icon, Loader2Icon, PlusIcon, Trash2Icon } from "lucide-vue-next";
import { __, sprintf } from "@wordpress/i18n";

const route = useRoute();
const props = defineProps({
  materialId: {
    type: [String, Number],
    default: 0,
  },
});
const configID = ref(route.params.configId);
const materialId = computed(() => props.materialId ?? route.query.materialIndex ?? route.params.materialId ?? 0);

const isFetching = ref(true);
const isNewColor = ref(false);
const isLoading = ref(false);
const isEdit = ref(false);
const openModal = ref(false);
const colorId = ref(null);

const defaultColors = () => ({
  customColors: { active: true, label: "Custom Colors", prevImg: "" },
  allColors: [],
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
  orange: "#f97316",
  red: "#dc2626",
  silver: "#c0c0c0",
  transparent: "#ffffff",
  white: "#ffffff",
  yellow: "#eab308",
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
  const textHex = String(item?.textColor?.codeHex || "").trim();
  const patternHex = String(item?.pattern?.codeHex || "").trim();
  const colorName = inferColorName(item).toLowerCase();
  if (!isTransparentValue(patternHex)) return patternHex;
  if (!isTransparentValue(textHex)) return textHex;
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

  if (!normalized.textColor.name && normalized.name) {
    normalized.textColor.name = normalized.name;
    changed = true;
  }

  return { color: normalized, changed };
};

const normalizeColors = (raw) => {
  const source = raw?.allColors ? raw : raw?.colors?.allColors ? raw.colors : defaultColors();
  let changed = false;
  const allColors = Array.isArray(source.allColors)
    ? source.allColors.map((item) => {
      const result = migrateLegacyColor(item);
      if (result.changed) changed = true;
      return result.color;
    })
    : [];
  return {
    changed,
    customColors: { ...defaultColors().customColors, ...(source.customColors || {}) },
    allColors,
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
      toastMessage(res?.message || __("Unable to save colors", "all-signs-options-pro"), "warning");
    }
  } finally {
    isLoading.value = false;
  }
};

const addMaterialColor = async () => {
  if (!color.value.name.trim()) return;
  colors.value.allColors.push({ ...color.value });
  await updateMaterialColor();
};

const updateColorInMaterialColor = async () => {
  if (!color.value.name.trim()) return;
  colors.value.allColors[colorId.value] = { ...color.value };
  await updateMaterialColor();
};

const deleteMaterialColor = async () => {
  colors.value.allColors.splice(colorId.value, 1);
  openModal.value = false;
  await updateMaterialColor();
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
  colors.value.allColors.forEach((item, index) => item.isDefault = index === key);
  await updateMaterialColor();
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
    button: { text: __("Select image", "all-signs-options-pro") },
    multiple: false,
  });
  uploader.on("select", () => {
    const attachment = uploader.state().get("selection").first()?.toJSON();
    if (attachment?.url) callback(attachment.url);
  });
  uploader.open();
};

const selectColorBackgroundImage = () => openMedia(
  __("Select pattern image", "all-signs-options-pro"),
  (url) => color.value.pattern.url = url
);
const selectColorPreviewImage = () => openMedia(
  __("Select color preview image", "all-signs-options-pro"),
  (url) => color.value.prevImg = url
);
const selectCustomPrevImage = () => openMedia(
  __("Select custom color preview image", "all-signs-options-pro"),
  (url) => colors.value.customColors.prevImg = url
);

onMounted(fetchMaterialColors);
</script>

<style scoped>
.asowp-colors-panel {
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

.asowp-colors-table,
.asowp-colors-table thead,
.asowp-colors-table tbody,
.asowp-colors-table tr,
.asowp-colors-table th,
.asowp-colors-table td {
  border-left: 0 !important;
  border-right: 0 !important;
  outline: 0 !important;
  box-shadow: none !important;
}

.asowp-colors-table {
  border: 0 !important;
}

.asowp-colors-table th {
  padding: 9px 12px;
  border-top: 0 !important;
  border-bottom: 0 !important;
  color: #616161;
  font-size: 11px;
  line-height: 16px;
  font-weight: 700;
  text-align: left;
}

.asowp-colors-table td {
  padding: 8px 12px;
  border-top: 0 !important;
  border-bottom: 0 !important;
  color: #303030;
  font-size: 12px;
  line-height: 18px;
  text-align: left;
}

.asowp-colors-table tbody tr {
  border-bottom: 1px solid #e5e7eb !important;
}

.asowp-colors-table tbody tr:last-child {
  border-bottom: 0 !important;
}

.asowp-row-strong {
  font-weight: 900;
}

.asowp-color-preview {
  width: 32px;
  height: 32px;
  overflow: hidden;
  border: 1px solid #dfe3e8;
  border-radius: 7px;
  background: #fff;
}

.asowp-color-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
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

.asowp-file-input,
.asowp-color-input-row,
.asowp-price-input {
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

.asowp-file-input input,
.asowp-color-input-row .asowp-form-input,
.asowp-price-input .asowp-form-input {
  flex: 1;
  min-width: 0;
  height: 100%;
  border: 0;
  border-radius: 0;
  box-shadow: none;
}

.asowp-file-button {
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

.asowp-native-color {
  width: 44px;
  height: 30px;
  margin-left: 6px;
  padding: 3px;
  border: 1px solid #c9cccf;
  border-radius: 4px;
  background: #fff;
}

.asowp-price-input span {
  padding: 0 14px;
  color: #303030;
  font-size: 13px;
}

.asowp-setting-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding-top: 12px;
}

.asowp-setting-row.asowp-border-t {
  border-top: 1px solid #e5e7eb;
}

.asowp-setting-title {
  margin: 0;
  color: #303030;
  font-size: 13px;
  line-height: 18px;
  font-weight: 900;
}

.asowp-form-body {
  padding-top: 8px;
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
