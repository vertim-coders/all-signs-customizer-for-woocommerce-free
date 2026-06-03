<template>
  <div class="asowp-fonts-panel asowp-space-y-3">
    <template v-if="!showForm">
      <section class="asowp-bg-white asowp-rounded-xl asowp-border asowp-border-solid asowp-border-[#dfe3e8] asowp-shadow-sm">
        <div class="asowp-p-4 asowp-flex asowp-items-center asowp-justify-between asowp-gap-4">
          <div>
            <h2 class="asowp-text-[16px] asowp-leading-6 asowp-font-[900] asowp-text-[#303030] asowp-m-0">{{ __('Fonts', 'all-signs-options-pro') }}</h2>
            <p class="asowp-text-[12px] asowp-leading-4 asowp-text-[#616161] asowp-m-0">{{ __('These are the fonts available to customers in this config.', 'all-signs-options-pro') }}</p>
          </div>
          <div class="asowp-flex asowp-items-center asowp-gap-2">
            <span class="asowp-selected-badge">{{ sprintf(__('%s selected', 'all-signs-options-pro'), selectedFontRows.length) }}</span>
            <button
              @click="openAddForm"
              class="asowp-inline-flex asowp-items-center asowp-gap-2 asowp-px-3 asowp-py-1.5 asowp-bg-[#007a72] asowp-text-white asowp-text-[12px] asowp-leading-4 asowp-font-[900] asowp-border-none asowp-rounded-md asowp-cursor-pointer hover:asowp-bg-[#00645f]"
            >
              <PlusIcon class="asowp-w-4 asowp-h-4" />
              {{ __('Add fonts', 'all-signs-options-pro') }}
            </button>
            <button
              @click="goToManageFonts"
              class="asowp-inline-flex asowp-items-center asowp-px-3 asowp-py-1.5 asowp-bg-white asowp-border asowp-border-solid asowp-border-[#c9cccf] asowp-rounded-md asowp-text-[12px] asowp-leading-4 asowp-font-[900] asowp-text-[#303030] asowp-cursor-pointer hover:asowp-bg-[#f6f6f7]"
            >
              {{ __('Manage fonts', 'all-signs-options-pro') }}
            </button>
          </div>
        </div>
      </section>

      <section class="asowp-bg-white asowp-rounded-xl asowp-border asowp-border-solid asowp-border-[#dfe3e8] asowp-shadow-sm">
        <div class="asowp-p-4">
          <h3 class="asowp-text-[14px] asowp-font-[900] asowp-text-[#303030] asowp-mt-0 asowp-mb-3">{{ __('Fonts List', 'all-signs-options-pro') }}</h3>

          <div v-if="isFetching" class="asowp-table-loader-cell asowp-py-8 asowp-text-center">
            <Loader2Icon class="asowp-table-loader-icon asowp-w-7 asowp-h-7" />
          </div>

          <div v-else-if="selectedFontRows.length === 0" class="asowp-py-8 asowp-text-center asowp-border asowp-border-dashed asowp-border-[#dfe3e8] asowp-rounded-lg">
            <p class="asowp-text-[13px] asowp-font-[900] asowp-text-[#303030] asowp-m-0">{{ __('No fonts added to this config yet', 'all-signs-options-pro') }}</p>
            <p class="asowp-text-[12px] asowp-text-[#616161] asowp-mt-1 asowp-mb-3">{{ __('Add only the fonts this config should expose to customers.', 'all-signs-options-pro') }}</p>
            <button @click="openAddForm" class="asowp-inline-flex asowp-items-center asowp-gap-1 asowp-px-3 asowp-py-1.5 asowp-bg-white asowp-border asowp-border-solid asowp-border-[#c9cccf] asowp-rounded-md asowp-text-[12px] asowp-font-[900] asowp-cursor-pointer hover:asowp-bg-[#f6f6f7]">
              <PlusIcon class="asowp-w-4 asowp-h-4" />
              {{ __('Add fonts', 'all-signs-options-pro') }}
            </button>
          </div>

          <div v-else class="asowp-overflow-visible">
            <table class="asowp-fonts-list-table asowp-w-full asowp-border-collapse">
              <thead class="asowp-bg-[#f6f6f7]">
                <tr>
                  <th class="asowp-w-10 asowp-py-2 asowp-px-3"></th>
                  <th class="asowp-py-2 asowp-px-3 asowp-text-left asowp-text-[11px] asowp-font-bold asowp-text-[#6b7280]">{{ __('Preview', 'all-signs-options-pro') }}</th>
                  <th class="asowp-py-2 asowp-px-3 asowp-text-left asowp-text-[11px] asowp-font-bold asowp-text-[#6b7280]">{{ __('Label', 'all-signs-options-pro') }}</th>
                  <th class="asowp-py-2 asowp-px-3 asowp-text-center asowp-text-[11px] asowp-font-bold asowp-text-[#6b7280]">{{ __('Default', 'all-signs-options-pro') }}</th>
                  <th class="asowp-py-2 asowp-px-3 asowp-text-left asowp-text-[11px] asowp-font-bold asowp-text-[#6b7280]">{{ __('Actions', 'all-signs-options-pro') }}</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(font, index) in selectedFontRows"
                  :key="font.id"
                  class="asowp-border-b asowp-border-solid asowp-border-[#e5e7eb] hover:asowp-bg-[#f7f8fa]"
                  draggable="true"
                  @dragstart="dragStartFont(index)"
                  @dragover.prevent
                  @drop="dropFont(index)"
                >
                  <td class="asowp-py-2.5 asowp-px-3 asowp-text-[#6b7280]">
                    <GripVerticalIcon class="asowp-w-4 asowp-h-4 asowp-cursor-grab" />
                  </td>
                  <td class="asowp-py-2.5 asowp-px-3">
                    <div v-if="font.previewImg" class="asowp-font-preview-box">
                      <img :src="font.previewImg" :alt="font.label" class="asowp-w-full asowp-h-full asowp-object-cover asowp-rounded-md" />
                    </div>
                    <div v-else class="asowp-font-preview-box">
                      <span :style="{ fontFamily: getPreviewFamily(font) }" class="asowp-text-[20px] asowp-leading-5 asowp-text-[#303030]">Ag</span>
                    </div>
                  </td>
                  <td class="asowp-py-2.5 asowp-px-3 asowp-text-[13px] asowp-leading-5 asowp-font-[900] asowp-text-[#303030]">
                    {{ font.label }}
                  </td>
                  <td class="asowp-py-2.5 asowp-px-3 asowp-text-center">
                    <div class="asowp-inline-flex asowp-items-center asowp-gap-2">
                      <span class="asowp-text-[12px] asowp-text-[#616161]">{{ __('No', 'all-signs-options-pro') }}</span>
                      <button
                        @click="setDefaultFont(font.id)"
                        :class="['asowp-toggle', index === 0 ? 'is-active' : '']"
                        :aria-label="__('Set default font', 'all-signs-options-pro')"
                      >
                        <span></span>
                      </button>
                      <span class="asowp-text-[12px] asowp-text-[#616161]">{{ __('Yes', 'all-signs-options-pro') }}</span>
                    </div>
                  </td>
                  <td class="asowp-py-2.5 asowp-px-3 asowp-text-left">
                    <button @click="removeFont(font.id)" class="asowp-remove-button">
                      <TrashIcon class="asowp-w-4 asowp-h-4" />
                      {{ __('Remove', 'all-signs-options-pro') }}
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section class="asowp-bg-white asowp-rounded-xl asowp-border asowp-border-solid asowp-border-[#dfe3e8] asowp-shadow-sm">
        <div class="asowp-p-4">
          <h3 class="asowp-text-[14px] asowp-font-[900] asowp-text-[#303030] asowp-mt-0 asowp-mb-0">{{ __('Fonts Settings', 'all-signs-options-pro') }}</h3>
          <p class="asowp-text-[12px] asowp-leading-4 asowp-text-[#616161] asowp-mt-0 asowp-mb-3">{{ __('Keep the title and description used for the fonts section.', 'all-signs-options-pro') }}</p>
          <div class="asowp-space-y-3">
            <label class="asowp-block">
              <span class="asowp-form-label">{{ __('Title', 'all-signs-options-pro') }}</span>
              <input v-model="textSettings.fontsLabel" class="asowp-form-input" autocomplete="off" />
            </label>
            <label class="asowp-block">
              <span class="asowp-form-label">{{ __('Description', 'all-signs-options-pro') }}</span>
              <input v-model="textSettings.fontsDescription" class="asowp-form-input" autocomplete="off" />
            </label>
          </div>
          <div class="asowp-flex asowp-justify-end asowp-mt-4">
            <button @click="saveFonts" :disabled="isLoading" class="asowp-primary-button">
              {{ isLoading ? __('Saving...', 'all-signs-options-pro') : __('Save fonts', 'all-signs-options-pro') }}
            </button>
          </div>
        </div>
      </section>
    </template>

    <template v-else>
      <section class="asowp-bg-white asowp-rounded-xl asowp-border asowp-border-solid asowp-border-[#dfe3e8] asowp-shadow-sm">
        <div class="asowp-p-4 asowp-flex asowp-items-center asowp-justify-between asowp-gap-4">
          <div>
            <h2 class="asowp-text-[20px] asowp-leading-6 asowp-font-[900] asowp-text-[#303030] asowp-m-0">{{ __('Add Fonts', 'all-signs-options-pro') }}</h2>
            <p class="asowp-text-[12px] asowp-leading-4 asowp-text-[#616161] asowp-m-0">{{ __('Add an existing font from the shared library or create a new one here.', 'all-signs-options-pro') }}</p>
          </div>
          <button @click="resetForm" class="asowp-secondary-button">{{ __('Back to fonts', 'all-signs-options-pro') }}</button>
        </div>
      </section>

      <section class="asowp-bg-white asowp-rounded-xl asowp-border asowp-border-solid asowp-border-[#dfe3e8] asowp-shadow-sm">
        <div class="asowp-p-4 asowp-space-y-5">
          <div v-if="formMode !== 'edit'">
            <h3 class="asowp-text-[14px] asowp-font-[900] asowp-text-[#303030] asowp-mt-0 asowp-mb-3">{{ __('Add existing fonts', 'all-signs-options-pro') }}</h3>
            <label class="asowp-block">
              <span class="asowp-form-label">{{ __('Fonts', 'all-signs-options-pro') }}</span>
              <select v-model="selectedExistingFontId" class="asowp-form-input">
                <option value="">{{ __('Select fonts', 'all-signs-options-pro') }}</option>
                <option v-for="font in availableFontRows" :key="font.id" :value="font.id">{{ font.label }}</option>
              </select>
              <span class="asowp-help-text">{{ __('Add one or many fonts already available in your shared library.', 'all-signs-options-pro') }}</span>
            </label>
            <div class="asowp-flex asowp-justify-end asowp-mt-3">
              <button @click="addExistingFont" :disabled="selectedExistingFontId === ''" class="asowp-primary-button">{{ __('Add selected fonts', 'all-signs-options-pro') }}</button>
            </div>
          </div>

          <div :class="formMode !== 'edit' ? 'asowp-create-font-section' : ''">
            <h3 class="asowp-text-[14px] asowp-font-[900] asowp-text-[#303030] asowp-mt-0 asowp-mb-3">{{ formMode === 'edit' ? __('Font details', 'all-signs-options-pro') : __('Create and add a new font', 'all-signs-options-pro') }}</h3>
            <div class="asowp-space-y-3">
              <div class="asowp-flex asowp-items-center asowp-gap-5">
                <label class="asowp-inline-flex asowp-items-center asowp-gap-2 asowp-text-[13px] asowp-text-[#303030]">
                  {{ __('Google font', 'all-signs-options-pro') }}
                  <button @click="setAddMode('google')" :class="['asowp-toggle', fontForm.isGoogleFont ? 'is-active' : '']"><span></span></button>
                </label>
                <label class="asowp-inline-flex asowp-items-center asowp-gap-2 asowp-text-[13px] asowp-text-[#303030]">
                  {{ __('Upload font', 'all-signs-options-pro') }}
                  <button @click="setAddMode('upload')" :class="['asowp-toggle', !fontForm.isGoogleFont ? 'is-active' : '']"><span></span></button>
                </label>
              </div>
              <div v-if="fontForm.isGoogleFont" class="asowp-google-font-picker">
                <label class="asowp-block asowp-relative">
                  <div v-if="showGoogleDropdown" class="asowp-google-dropdown">
                    <button
                      v-for="font in filteredGoogleFonts"
                      :key="font.family"
                      @mousedown.prevent="selectGoogleFont(font)"
                      type="button"
                    >
                      {{ font.family }}
                    </button>
                    <div v-if="filteredGoogleFonts.length === 0" class="asowp-google-empty">
                      {{ __('No fonts found', 'all-signs-options-pro') }}
                    </div>
                  </div>
                  <span class="asowp-form-label">{{ __('Search Google Fonts', 'all-signs-options-pro') }}</span>
                  <div class="asowp-search-input">
                    <SearchIcon class="asowp-w-4 asowp-h-4 asowp-text-[#6b7280]" />
                    <input
                      v-model="googleFontSearch"
                      @focus="showGoogleDropdown = true"
                      :placeholder="__('Search font', 'all-signs-options-pro')"
                      autocomplete="off"
                    />
                  </div>
                </label>

                <label v-if="selectedGoogleFont?.variants?.length" class="asowp-block">
                  <span class="asowp-form-label">{{ __('Font Variant', 'all-signs-options-pro') }}</span>
                  <select v-model="selectedGoogleVariant" @change="applyGoogleVariant" class="asowp-form-input">
                    <option v-for="variant in selectedGoogleFont.variants" :key="variant" :value="variant">{{ variant }}</option>
                  </select>
                </label>
              </div>

              <label v-else class="asowp-block">
                <span class="asowp-form-label">{{ __('Upload font file', 'all-signs-options-pro') }}</span>
                <div class="asowp-file-input">
                  <button @click.prevent="selectFontFile" class="asowp-file-button">{{ __('Upload font file', 'all-signs-options-pro') }}</button>
                  <input v-model="fontForm.url" autocomplete="off" />
                </div>
                <span class="asowp-help-text">{{ __('.ttf or .otf font file.', 'all-signs-options-pro') }}</span>
              </label>
              <label class="asowp-block">
                <span class="asowp-form-label">{{ __('Label', 'all-signs-options-pro') }}</span>
                <input v-model="fontForm.label" class="asowp-form-input" autocomplete="off" />
              </label>
            </div>
            <div class="asowp-flex asowp-justify-end asowp-gap-2 asowp-mt-4">
              <button @click="saveFontForm" :disabled="isSavingFontForm || !fontForm.label.trim() || !fontForm.url.trim()" class="asowp-primary-button">
                {{
                  isSavingFontForm
                    ? __('Creating...', 'all-signs-options-pro')
                    : formMode === 'edit'
                      ? __('Update font', 'all-signs-options-pro')
                      : __('Create and add font', 'all-signs-options-pro')
                }}
              </button>
            </div>
          </div>
        </div>
      </section>
    </template>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import api from "@/admin/Api/api";
import toastMessage from "@/admin/utils/functions";
import { __, sprintf } from "@wordpress/i18n";
import {
  GripVerticalIcon,
  Loader2Icon,
  PlusIcon,
  SearchIcon,
  TrashIcon,
} from "lucide-vue-next";

const route = useRoute();
const router = useRouter();
const configID = ref(route.params.configId);

const isFetching = ref(true);
const isLoading = ref(false);
const isSavingFontForm = ref(false);
const showForm = ref(false);
const formMode = ref("add");
const editingFontId = ref(null);
const selectedExistingFontId = ref("");
const draggedFontIndex = ref(null);
const googleFonts = ref([]);
const googleFontSearch = ref("");
const showGoogleDropdown = ref(false);
const selectedGoogleFont = ref(null);
const selectedGoogleVariant = ref("");
let previewStyleElement = null;

const managedFonts = ref([]);
const textSettings = ref({
  selectedFonts: [],
  colorsLabel: "Texts Colors",
  colors: [],
  enableCustomColor: true,
  colorsPrevImg: "",
  enableFontSize: {
    active: true,
    minimumFontSize: 12,
    maximumFontSize: 50,
    defaultFontSize: 16,
  },
  enableBold: true,
  enableUnderline: true,
  enableOverline: true,
  enableStrike: true,
  enableItalic: true,
  enableOpacity: true,
  enableBorder: true,
  enableTextAlignment: true,
  enableCurvedUp: true,
  enableCurvedDown: true,
  textType: "normal",
  fontsLabel: "Fonts",
  fontsDescription: "",
});

const fontForm = ref({
  label: "",
  url: "",
  previewImg: "",
  isGoogleFont: false,
});

const normalizeId = (value) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : value;
};

const getFontIdentity = (font) => {
  const url = String(font?.url || "").trim().toLowerCase();
  const label = String(font?.label || font?.name || "").trim().toLowerCase();
  return url || label;
};

const normalizeFontRow = (font, index) => font ? ({
    ...font,
    id: index,
    label: String(font?.label || font?.name || `Font ${index + 1}`),
    url: String(font?.url || ""),
    previewImg: String(font?.previewImg || font?.preview || ""),
    isGoogleFont: Boolean(font?.isGoogleFont),
  }) : null;

const fontRows = computed(() => {
  const seen = new Set();
  return managedFonts.value
    .map(normalizeFontRow)
    .filter(Boolean)
    .filter((font) => {
      const key = getFontIdentity(font);
      if (!key || seen.has(key)) return false;
      seen.add(key);
      return true;
    });
});

const selectedIds = computed(() =>
  Array.isArray(textSettings.value.selectedFonts)
    ? textSettings.value.selectedFonts.map(normalizeId)
    : []
);

const selectedFontRows = computed(() => {
  const seen = new Set();
  return selectedIds.value
    .map((id) => normalizeFontRow(managedFonts.value[Number(id)], Number(id)))
    .filter(Boolean)
    .filter((font) => {
      const key = getFontIdentity(font);
      if (!key || seen.has(key)) return false;
      seen.add(key);
      return true;
    });
});

const availableFontRows = computed(() => {
  const selectedKeys = new Set(selectedFontRows.value.map(getFontIdentity).filter(Boolean));
  return fontRows.value.filter((font) => !selectedKeys.has(getFontIdentity(font)));
});

const filteredGoogleFonts = computed(() => {
  const term = googleFontSearch.value.trim().toLowerCase();
  const source = Array.isArray(googleFonts.value) ? googleFonts.value : [];
  if (!term) return source.slice(0, 200);
  return source
    .filter((font) => String(font?.family || "").toLowerCase().includes(term))
    .slice(0, 200);
});

const cssUrl = (url) => String(url || "").replace(/\\/g, "\\\\").replace(/'/g, "\\'");

const getPreviewFamilyName = (font) => `asowp_config_font_${font.id}`;

const getPreviewFamily = (font) => `'${getPreviewFamilyName(font)}'`;

const getFontFormatFromUrl = (url) => {
  const cleanUrl = String(url || "").split("?")[0].toLowerCase();
  if (cleanUrl.endsWith(".woff2")) return "woff2";
  if (cleanUrl.endsWith(".woff")) return "woff";
  if (cleanUrl.endsWith(".ttf")) return "truetype";
  if (cleanUrl.endsWith(".otf")) return "opentype";
  return "";
};

const fontPreviewCss = computed(() =>
  selectedFontRows.value
    .map((font) => {
      if (!font.url) return "";
      const format = getFontFormatFromUrl(font.url);
      const source = format
        ? `url('${cssUrl(font.url)}') format('${format}')`
        : `url('${cssUrl(font.url)}')`;
      return `@font-face{font-family:'${getPreviewFamilyName(font)}';src:${source};font-display:swap;font-style:normal;font-weight:400;}`;
    })
    .filter(Boolean)
    .join("\n")
);

const syncPreviewStyle = (css) => {
  if (!previewStyleElement) {
    previewStyleElement = document.createElement("style");
    previewStyleElement.setAttribute("data-asowp-font-preview", "simple-fonts");
    document.head.appendChild(previewStyleElement);
  }
  previewStyleElement.textContent = css || "";
};

const fetchFonts = async () => {
  const result = await api.getManagefonts();
  managedFonts.value = Array.isArray(result) ? result : [];
};

const fetchGoogleFonts = async () => {
  const result = await api.getGoogleFonts();
  const rows = Array.isArray(result) ? result : Array.isArray(result?.items) ? result.items : [];
  googleFonts.value = rows
    .map((font) => ({
      family: String(font?.family || "").trim(),
      variants: Array.isArray(font?.variants) ? font.variants.map(String) : [],
      files: font?.files && typeof font.files === "object" ? font.files : {},
    }))
    .filter((font) => font.family && font.variants.length > 0 && Object.keys(font.files).length > 0);
};

const fetchConfigFonts = async () => {
  const config = await api.getConfig(configID.value);
  const text = config?.data?.settings?.customizerSign?.text || config?.settings?.customizerSign?.text || {};
  textSettings.value = { ...textSettings.value, ...text };
};

const fetchData = async () => {
  isFetching.value = true;
  try {
    await Promise.all([fetchFonts(), fetchConfigFonts(), fetchGoogleFonts()]);
  } finally {
    isFetching.value = false;
  }
};

const saveFonts = async () => {
  isLoading.value = true;
  try {
    const result = await api.updateCustomizerSignsText(configID.value, textSettings.value);
    if (result?.success) {
      toastMessage(result.message || __("Fonts saved", "all-signs-options-pro"));
    } else {
      toastMessage(result?.message || __("Unable to save fonts", "all-signs-options-pro"), "warning");
    }
  } finally {
    isLoading.value = false;
  }
};

const openAddForm = () => {
  formMode.value = "add";
  editingFontId.value = null;
  selectedExistingFontId.value = "";
  googleFontSearch.value = "";
  showGoogleDropdown.value = false;
  selectedGoogleFont.value = null;
  selectedGoogleVariant.value = "";
  fontForm.value = { label: "", url: "", previewImg: "", isGoogleFont: false };
  showForm.value = true;
};

const resetForm = () => {
  showForm.value = false;
  formMode.value = "add";
  editingFontId.value = null;
  selectedExistingFontId.value = "";
  googleFontSearch.value = "";
  showGoogleDropdown.value = false;
  selectedGoogleFont.value = null;
  selectedGoogleVariant.value = "";
  fontForm.value = { label: "", url: "", previewImg: "", isGoogleFont: false };
};

const addExistingFont = async () => {
  if (selectedExistingFontId.value === "") return;
  const targetIndex = Number(selectedExistingFontId.value);
  const targetFont = normalizeFontRow(managedFonts.value[targetIndex], targetIndex);
  const targetKey = getFontIdentity(targetFont);
  if (!targetKey) return;
  textSettings.value.selectedFonts = [
    ...selectedIds.value
      .map((id) => Number(id))
      .filter((id) => {
        const row = normalizeFontRow(managedFonts.value[id], id);
        return row && getFontIdentity(row) !== targetKey;
      }),
    targetIndex,
  ];
  await saveFonts();
  resetForm();
};

const saveFontForm = async () => {
  if (isSavingFontForm.value) return;
  isSavingFontForm.value = true;
  const payload = {
    label: fontForm.value.label.trim(),
    url: fontForm.value.url.trim(),
    previewImg: fontForm.value.previewImg.trim(),
    isGoogleFont: Boolean(fontForm.value.isGoogleFont),
  };

  try {
    if (formMode.value === "edit") {
      const fontId = Number(editingFontId.value);
      const result = await api.updateManagefont(fontId, payload);
      if (result?.success) toastMessage(result.message);
      await fetchFonts();
      resetForm();
      return;
    }

    await fetchFonts();

    const payloadKey = getFontIdentity(payload);
    const existingIndex = managedFonts.value.findIndex((font, index) => {
      const row = normalizeFontRow(font, index);
      return getFontIdentity(row) === payloadKey;
    });

    let targetIndex = existingIndex;
    if (targetIndex < 0) {
      const result = await api.addManagefont({ many: false, font: payload });
      if (result?.success) toastMessage(result.message);
      await fetchFonts();
      targetIndex = managedFonts.value.findIndex((font, index) => {
        const row = normalizeFontRow(font, index);
        return getFontIdentity(row) === payloadKey;
      });
    }

    if (targetIndex >= 0) {
      const targetFont = normalizeFontRow(managedFonts.value[targetIndex], targetIndex);
      const targetKey = getFontIdentity(targetFont);
      const alreadySelected = selectedFontRows.value.some((font) => getFontIdentity(font) === targetKey);
      textSettings.value.selectedFonts = [
        ...selectedIds.value
          .map((id) => Number(id))
          .filter((id) => {
            const row = normalizeFontRow(managedFonts.value[id], id);
            return row && getFontIdentity(row) !== targetKey;
          }),
        targetIndex,
      ];
      await saveFonts();
      if (alreadySelected) {
        toastMessage(__("This font is already added to this configuration", "all-signs-options-pro"));
      }
      resetForm();
      return;
    }

    toastMessage(__("Unable to create this font", "all-signs-options-pro"), "error");
  } finally {
    isSavingFontForm.value = false;
  }
};

const editSelectedFont = (font) => {
  formMode.value = "edit";
  editingFontId.value = font.id;
  fontForm.value = {
    label: font.label,
    url: font.url,
    previewImg: font.previewImg,
    isGoogleFont: font.isGoogleFont,
  };
  showForm.value = true;
};

const removeFont = async (fontId) => {
  textSettings.value.selectedFonts = selectedIds.value.filter((id) => Number(id) !== Number(fontId));
  await saveFonts();
};

const setDefaultFont = async (fontId) => {
  const currentIds = selectedIds.value.map((id) => Number(id));
  if (currentIds[0] === Number(fontId)) return;
  textSettings.value.selectedFonts = [
    Number(fontId),
    ...currentIds.filter((id) => id !== Number(fontId)),
  ];
  await saveFonts();
};

const dragStartFont = (index) => {
  draggedFontIndex.value = index;
};

const dropFont = async (targetIndex) => {
  if (draggedFontIndex.value === null || draggedFontIndex.value === targetIndex) return;
  const orderedIds = selectedFontRows.value.map((font) => Number(font.id));
  const [moved] = orderedIds.splice(draggedFontIndex.value, 1);
  orderedIds.splice(targetIndex, 0, moved);
  draggedFontIndex.value = null;
  textSettings.value.selectedFonts = orderedIds;
  await saveFonts();
};

const setAddMode = (mode) => {
  fontForm.value.isGoogleFont = mode === "google";
  fontForm.value.url = "";
  googleFontSearch.value = "";
  showGoogleDropdown.value = mode === "google";
  selectedGoogleFont.value = null;
  selectedGoogleVariant.value = "";
};

const selectGoogleFont = (font) => {
  selectedGoogleFont.value = font;
  googleFontSearch.value = font.family;
  selectedGoogleVariant.value = font.variants?.[0] || "regular";
  fontForm.value.label = font.family;
  applyGoogleVariant();
  showGoogleDropdown.value = false;
};

const applyGoogleVariant = () => {
  const font = selectedGoogleFont.value;
  if (!font) return;
  const variant = selectedGoogleVariant.value || font.variants?.[0] || "regular";
  fontForm.value.url = String(font.files?.[variant] || font.files?.regular || Object.values(font.files || {})[0] || "");
};

const goToManageFonts = () => {
  router.push({ path: "/manage-fonts", query: { returnTo: route.fullPath } });
};

const selectFontFile = () => {
  if (!window.wp?.media) return;
  const uploader = window.wp.media({
    title: __("Upload font file", "all-signs-options-pro"),
    button: { text: __("Use font file", "all-signs-options-pro") },
    multiple: false,
  });

  uploader.on("select", () => {
    const attachment = uploader.state().get("selection").first()?.toJSON();
    if (!attachment?.url) return;
    fontForm.value.url = attachment.url;
    if (!fontForm.value.label.trim()) {
      fontForm.value.label = String(attachment.title || attachment.filename || "")
        .replace(/\.(ttf|otf|woff2?|eot)$/i, "")
        .trim();
    }
  });

  uploader.open();
};

const closeGoogleDropdown = (event) => {
  if (!event.target?.closest?.(".asowp-google-font-picker")) {
    showGoogleDropdown.value = false;
  }
};

onMounted(() => {
  fetchData();
  document.addEventListener("click", closeGoogleDropdown);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", closeGoogleDropdown);
  previewStyleElement?.remove();
  previewStyleElement = null;
});

watch(fontPreviewCss, syncPreviewStyle, { immediate: true });
</script>

<style scoped>
.asowp-fonts-panel {
  color: #303030;
}

.asowp-font-preview-box {
  width: 58px;
  height: 36px;
  border: 1px solid #d0d5dd;
  border-radius: 8px;
  background: #f8f9fb;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.asowp-fonts-list-table,
.asowp-fonts-list-table thead,
.asowp-fonts-list-table tbody,
.asowp-fonts-list-table tr,
.asowp-fonts-list-table th,
.asowp-fonts-list-table td {
  border-left: 0 !important;
  border-right: 0 !important;
  outline: 0 !important;
  box-shadow: none !important;
}

.asowp-fonts-list-table {
  border: 0 !important;
}

.asowp-fonts-list-table th,
.asowp-fonts-list-table td {
  border-top: 0 !important;
  border-bottom: 0 !important;
}

.asowp-fonts-list-table tbody tr {
  border-bottom: 1px solid #e5e7eb !important;
}

.asowp-fonts-list-table tbody tr:last-child {
  border-bottom: 0 !important;
}

.asowp-selected-badge {
  display: inline-flex;
  align-items: center;
  min-height: 20px;
  padding: 2px 8px;
  border-radius: 999px;
  background: #d9ecff;
  color: #005bd3;
  font-size: 11px;
  line-height: 14px;
  font-weight: 700;
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

.asowp-remove-button {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  min-height: 28px;
  padding: 5px 9px;
  border: 1px solid #c9cccf;
  border-radius: 6px;
  background: #fff;
  color: #8e1f0b;
  font-size: 12px;
  font-weight: 800;
  cursor: pointer;
}

.asowp-remove-button:hover {
  background: #f6f6f7;
  color: #8e1f0b;
}

.asowp-form-label {
  display: block;
  margin-bottom: 4px;
  font-size: 12px;
  line-height: 16px;
  color: #303030;
}

.asowp-create-font-section {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #e1e3e5;
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

.asowp-help-text {
  display: block;
  margin-top: 3px;
  color: #616161;
  font-size: 12px;
  line-height: 16px;
}

.asowp-file-input {
  box-sizing: border-box;
  width: 100%;
  max-width: 100%;
  height: 44px;
  border: 1px solid #8c9196;
  border-radius: 7px;
  display: flex;
  align-items: center;
  background: #fff;
  overflow: hidden;
}

.asowp-file-input input {
  box-sizing: border-box;
  flex: 1;
  min-width: 0;
  max-width: 100%;
  height: 100%;
  border: 0;
  padding: 6px 10px;
  box-shadow: none;
  font-size: 13px;
  background: transparent;
}

.asowp-file-input input:focus {
  outline: none;
  box-shadow: none;
}

.asowp-file-button {
  margin-left: 5px;
  min-height: 32px;
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

.asowp-file-button:hover {
  background: #00645f;
  color: #fff;
}

.asowp-search-input {
  box-sizing: border-box;
  width: 100%;
  max-width: 100%;
  height: 44px;
  border: 1px solid #8c9196;
  border-radius: 7px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 12px;
  background: #fff;
}

.asowp-search-input:focus-within {
  outline: 2px solid #005bd3;
  outline-offset: 1px;
}

.asowp-search-input input {
  box-sizing: border-box;
  flex: 1;
  min-width: 0;
  max-width: 100%;
  height: 100%;
  padding: 0;
  border: 0;
  background: transparent;
  box-shadow: none;
  font-size: 13px;
  color: #303030;
}

.asowp-search-input input:focus {
  outline: none;
  box-shadow: none;
}

.asowp-google-dropdown {
  box-sizing: border-box;
  position: absolute;
  left: 0;
  right: 0;
  top: auto;
  bottom: calc(100% + 5px);
  z-index: 30;
  max-height: 420px;
  overflow-y: auto;
  padding: 6px;
  border: 1px solid #dfe3e8;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.16);
}

.asowp-google-font-picker {
  width: 100%;
  max-width: 100%;
}

.asowp-google-dropdown button {
  width: 100%;
  display: block;
  padding: 9px 12px;
  border: 0;
  border-radius: 7px;
  background: #fff;
  color: #303030;
  font-size: 13px;
  line-height: 18px;
  text-align: left;
  cursor: pointer;
}

.asowp-google-dropdown button:hover,
.asowp-google-dropdown button:first-child {
  background: #e8e8e8;
  color: #303030;
}

.asowp-google-empty {
  padding: 10px 12px;
  color: #616161;
  font-size: 12px;
}

.asowp-primary-button,
.asowp-secondary-button {
  min-height: 32px;
  padding: 6px 12px;
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

.asowp-secondary-button {
  border: 1px solid #c9cccf;
  background: #fff;
  color: #303030;
}

.asowp-secondary-button:hover {
  background: #f6f6f7;
  color: #303030;
}
</style>
