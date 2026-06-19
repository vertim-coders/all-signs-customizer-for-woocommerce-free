<template>
  <div class="ascwo-fonts-panel ascwo-space-y-3">
    <template v-if="!showForm">
      <section class="ascwo-bg-white ascwo-rounded-xl ascwo-border ascwo-border-solid ascwo-border-[#dfe3e8] ascwo-shadow-sm">
        <div class="ascwo-p-4 ascwo-flex ascwo-items-center ascwo-justify-between ascwo-gap-4">
          <div>
            <h2 class="ascwo-text-[16px] ascwo-leading-6 ascwo-font-[900] ascwo-text-[#303030] ascwo-m-0">{{ __('Fonts', 'all-signs-customizer-for-woocommerce-pro') }}</h2>
            <p class="ascwo-text-[12px] ascwo-leading-4 ascwo-text-[#616161] ascwo-m-0">{{ __('These are the fonts available to customers in this config.', 'all-signs-customizer-for-woocommerce-pro') }}</p>
          </div>
          <div class="ascwo-flex ascwo-items-center ascwo-gap-2">
            <span class="ascwo-selected-badge">{{ sprintf(__('%s selected', 'all-signs-customizer-for-woocommerce-pro'), selectedFontRows.length) }}</span>
            <button
              @click="openAddForm"
              class="ascwo-inline-flex ascwo-items-center ascwo-gap-2 ascwo-px-3 ascwo-py-1.5 ascwo-bg-[#007a72] ascwo-text-white ascwo-text-[12px] ascwo-leading-4 ascwo-font-[900] ascwo-border-none ascwo-rounded-md ascwo-cursor-pointer hover:ascwo-bg-[#00645f]"
            >
              <PlusIcon class="ascwo-w-4 ascwo-h-4" />
              {{ __('Add fonts', 'all-signs-customizer-for-woocommerce-pro') }}
            </button>
            <button
              @click="goToManageFonts"
              class="ascwo-inline-flex ascwo-items-center ascwo-px-3 ascwo-py-1.5 ascwo-bg-white ascwo-border ascwo-border-solid ascwo-border-[#c9cccf] ascwo-rounded-md ascwo-text-[12px] ascwo-leading-4 ascwo-font-[900] ascwo-text-[#303030] ascwo-cursor-pointer hover:ascwo-bg-[#f6f6f7]"
            >
              {{ __('Manage fonts', 'all-signs-customizer-for-woocommerce-pro') }}
            </button>
          </div>
        </div>
      </section>

      <section class="ascwo-bg-white ascwo-rounded-xl ascwo-border ascwo-border-solid ascwo-border-[#dfe3e8] ascwo-shadow-sm">
        <div class="ascwo-p-4">
          <h3 class="ascwo-text-[14px] ascwo-font-[900] ascwo-text-[#303030] ascwo-mt-0 ascwo-mb-3">{{ __('Fonts List', 'all-signs-customizer-for-woocommerce-pro') }}</h3>

          <div v-if="isFetching" class="ascwo-table-loader-cell ascwo-py-8 ascwo-text-center">
            <Loader2Icon class="ascwo-table-loader-icon ascwo-w-7 ascwo-h-7" />
          </div>

          <div v-else-if="selectedFontRows.length === 0" class="ascwo-py-8 ascwo-text-center ascwo-border ascwo-border-dashed ascwo-border-[#dfe3e8] ascwo-rounded-lg">
            <p class="ascwo-text-[13px] ascwo-font-[900] ascwo-text-[#303030] ascwo-m-0">{{ __('No fonts added to this config yet', 'all-signs-customizer-for-woocommerce-pro') }}</p>
            <p class="ascwo-text-[12px] ascwo-text-[#616161] ascwo-mt-1 ascwo-mb-3">{{ __('Add only the fonts this config should expose to customers.', 'all-signs-customizer-for-woocommerce-pro') }}</p>
            <button @click="openAddForm" class="ascwo-inline-flex ascwo-items-center ascwo-gap-1 ascwo-px-3 ascwo-py-1.5 ascwo-bg-white ascwo-border ascwo-border-solid ascwo-border-[#c9cccf] ascwo-rounded-md ascwo-text-[12px] ascwo-font-[900] ascwo-cursor-pointer hover:ascwo-bg-[#f6f6f7]">
              <PlusIcon class="ascwo-w-4 ascwo-h-4" />
              {{ __('Add fonts', 'all-signs-customizer-for-woocommerce-pro') }}
            </button>
          </div>

          <div v-else class="ascwo-overflow-visible">
            <table class="ascwo-fonts-list-table ascwo-w-full ascwo-border-collapse">
              <thead class="ascwo-bg-[#f6f6f7]">
                <tr>
                  <th class="ascwo-w-10 ascwo-py-2 ascwo-px-3"></th>
                  <th class="ascwo-py-2 ascwo-px-3 ascwo-text-left ascwo-text-[11px] ascwo-font-bold ascwo-text-[#6b7280]">{{ __('Preview', 'all-signs-customizer-for-woocommerce-pro') }}</th>
                  <th class="ascwo-py-2 ascwo-px-3 ascwo-text-left ascwo-text-[11px] ascwo-font-bold ascwo-text-[#6b7280]">{{ __('Label', 'all-signs-customizer-for-woocommerce-pro') }}</th>
                  <th class="ascwo-py-2 ascwo-px-3 ascwo-text-center ascwo-text-[11px] ascwo-font-bold ascwo-text-[#6b7280]">{{ __('Default', 'all-signs-customizer-for-woocommerce-pro') }}</th>
                  <th class="ascwo-py-2 ascwo-px-3 ascwo-text-left ascwo-text-[11px] ascwo-font-bold ascwo-text-[#6b7280]">{{ __('Actions', 'all-signs-customizer-for-woocommerce-pro') }}</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(font, index) in selectedFontRows"
                  :key="font.id"
                  class="ascwo-border-b ascwo-border-solid ascwo-border-[#e5e7eb] hover:ascwo-bg-[#f7f8fa]"
                  draggable="true"
                  @dragstart="dragStartFont(index)"
                  @dragover.prevent
                  @drop="dropFont(index)"
                >
                  <td class="ascwo-py-2.5 ascwo-px-3 ascwo-text-[#6b7280]">
                    <GripVerticalIcon class="ascwo-w-4 ascwo-h-4 ascwo-cursor-grab" />
                  </td>
                  <td class="ascwo-py-2.5 ascwo-px-3">
                    <div v-if="font.previewImg" class="ascwo-font-preview-box">
                      <img :src="font.previewImg" :alt="font.label" class="ascwo-w-full ascwo-h-full ascwo-object-cover ascwo-rounded-md" />
                    </div>
                    <div v-else class="ascwo-font-preview-box">
                      <span :style="{ fontFamily: getPreviewFamily(font) }" class="ascwo-text-[20px] ascwo-leading-5 ascwo-text-[#303030]">Ag</span>
                    </div>
                  </td>
                  <td class="ascwo-py-2.5 ascwo-px-3 ascwo-text-[13px] ascwo-leading-5 ascwo-font-[900] ascwo-text-[#303030]">
                    {{ font.label }}
                  </td>
                  <td class="ascwo-py-2.5 ascwo-px-3 ascwo-text-center">
                    <div class="ascwo-inline-flex ascwo-items-center ascwo-gap-2">
                      <span class="ascwo-text-[12px] ascwo-text-[#616161]">{{ __('No', 'all-signs-customizer-for-woocommerce-pro') }}</span>
                      <button
                        @click="setDefaultFont(index)"
                        :class="['ascwo-toggle', font.isDefault ? 'is-active' : '']"
                        :aria-label="__('Set default font', 'all-signs-customizer-for-woocommerce-pro')"
                      >
                        <span></span>
                      </button>
                      <span class="ascwo-text-[12px] ascwo-text-[#616161]">{{ __('Yes', 'all-signs-customizer-for-woocommerce-pro') }}</span>
                    </div>
                  </td>
                  <td class="ascwo-py-2.5 ascwo-px-3 ascwo-text-left">
                    <button @click="removeFont(index)" class="ascwo-remove-button">
                      <TrashIcon class="ascwo-w-4 ascwo-h-4" />
                      {{ __('Remove', 'all-signs-customizer-for-woocommerce-pro') }}
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section class="ascwo-bg-white ascwo-rounded-xl ascwo-border ascwo-border-solid ascwo-border-[#dfe3e8] ascwo-shadow-sm">
        <div class="ascwo-p-4">
          <h3 class="ascwo-text-[14px] ascwo-font-[900] ascwo-text-[#303030] ascwo-mt-0 ascwo-mb-0">{{ __('Fonts Settings', 'all-signs-customizer-for-woocommerce-pro') }}</h3>
          <p class="ascwo-text-[12px] ascwo-leading-4 ascwo-text-[#616161] ascwo-mt-0 ascwo-mb-3">{{ __('Keep the title and description used for the fonts section.', 'all-signs-customizer-for-woocommerce-pro') }}</p>
          <div class="ascwo-space-y-3">
            <label class="ascwo-block">
              <span class="ascwo-form-label">{{ __('Title', 'all-signs-customizer-for-woocommerce-pro') }}</span>
              <input v-model="textSettings.fontsLabel" class="ascwo-form-input" autocomplete="off" />
            </label>
            <label class="ascwo-block">
              <span class="ascwo-form-label">{{ __('Description', 'all-signs-customizer-for-woocommerce-pro') }}</span>
              <input v-model="textSettings.fontsDescription" class="ascwo-form-input" autocomplete="off" />
            </label>
          </div>
          <div class="ascwo-flex ascwo-justify-end ascwo-mt-4">
            <button @click="saveFonts" :disabled="isLoading" class="ascwo-primary-button">
              {{ isLoading ? __('Saving...', 'all-signs-customizer-for-woocommerce-pro') : __('Save fonts', 'all-signs-customizer-for-woocommerce-pro') }}
            </button>
          </div>
        </div>
      </section>
    </template>

    <template v-else>
      <section class="ascwo-bg-white ascwo-rounded-xl ascwo-border ascwo-border-solid ascwo-border-[#dfe3e8] ascwo-shadow-sm">
        <div class="ascwo-p-4 ascwo-flex ascwo-items-center ascwo-justify-between ascwo-gap-4">
          <div>
            <h2 class="ascwo-text-[20px] ascwo-leading-6 ascwo-font-[900] ascwo-text-[#303030] ascwo-m-0">{{ __('Add Fonts', 'all-signs-customizer-for-woocommerce-pro') }}</h2>
            <p class="ascwo-text-[12px] ascwo-leading-4 ascwo-text-[#616161] ascwo-m-0">{{ __('Add an existing font from the shared library or create a new one here.', 'all-signs-customizer-for-woocommerce-pro') }}</p>
          </div>
          <button @click="resetForm" class="ascwo-secondary-button">{{ __('Back to fonts', 'all-signs-customizer-for-woocommerce-pro') }}</button>
        </div>
      </section>

      <section class="ascwo-bg-white ascwo-rounded-xl ascwo-border ascwo-border-solid ascwo-border-[#dfe3e8] ascwo-shadow-sm">
        <div class="ascwo-p-4 ascwo-space-y-5">
          <div v-if="formMode !== 'edit'">
            <h3 class="ascwo-text-[14px] ascwo-font-[900] ascwo-text-[#303030] ascwo-mt-0 ascwo-mb-3">{{ __('Add existing fonts', 'all-signs-customizer-for-woocommerce-pro') }}</h3>
            <label class="ascwo-block">
              <span class="ascwo-form-label">{{ __('Fonts', 'all-signs-customizer-for-woocommerce-pro') }}</span>
              <select v-model="selectedExistingFontId" class="ascwo-form-input">
                <option value="">{{ __('Select fonts', 'all-signs-customizer-for-woocommerce-pro') }}</option>
                <option v-for="font in availableFontRows" :key="`${font.source || 'managed'}:${font.id}`" :value="`${font.source || 'managed'}:${font.source === 'google' ? font.key : font.id}`">
                  {{ font.label }}
                </option>
              </select>
              <span class="ascwo-help-text">{{ __('Add one or many fonts already available in your shared library.', 'all-signs-customizer-for-woocommerce-pro') }}</span>
            </label>
            <div class="ascwo-flex ascwo-justify-end ascwo-mt-3">
              <button @click="addExistingFont" :disabled="selectedExistingFontId === ''" class="ascwo-primary-button">{{ __('Add selected fonts', 'all-signs-customizer-for-woocommerce-pro') }}</button>
            </div>
          </div>

          <div :class="formMode !== 'edit' ? 'ascwo-create-font-section' : ''">
            <h3 class="ascwo-text-[14px] ascwo-font-[900] ascwo-text-[#303030] ascwo-mt-0 ascwo-mb-3">{{ formMode === 'edit' ? __('Font details', 'all-signs-customizer-for-woocommerce-pro') : __('Create and add a new font', 'all-signs-customizer-for-woocommerce-pro') }}</h3>
            <div class="ascwo-space-y-3">
              <div class="ascwo-flex ascwo-items-center ascwo-gap-5">
                <label class="ascwo-inline-flex ascwo-items-center ascwo-gap-2 ascwo-text-[13px] ascwo-text-[#303030]">
                  {{ __('Google font', 'all-signs-customizer-for-woocommerce-pro') }}
                  <button @click="setAddMode('google')" :class="['ascwo-toggle', fontForm.isGoogleFont ? 'is-active' : '']"><span></span></button>
                </label>
                <label class="ascwo-inline-flex ascwo-items-center ascwo-gap-2 ascwo-text-[13px] ascwo-text-[#303030]">
                  {{ __('Upload font', 'all-signs-customizer-for-woocommerce-pro') }}
                  <button @click="setAddMode('upload')" :class="['ascwo-toggle', !fontForm.isGoogleFont ? 'is-active' : '']"><span></span></button>
                </label>
              </div>
              <div v-if="fontForm.isGoogleFont" class="ascwo-google-font-picker">
                <label class="ascwo-block ascwo-relative">
                  <div v-if="showGoogleDropdown" class="ascwo-google-dropdown">
                    <button
                      v-for="font in filteredGoogleFonts"
                      :key="font.family"
                      @mousedown.prevent="selectGoogleFont(font)"
                      type="button"
                    >
                      {{ font.family }}
                    </button>
                    <div v-if="filteredGoogleFonts.length === 0" class="ascwo-google-empty">
                      {{ __('No fonts found', 'all-signs-customizer-for-woocommerce-pro') }}
                    </div>
                  </div>
                  <span class="ascwo-form-label">{{ __('Search Google Fonts', 'all-signs-customizer-for-woocommerce-pro') }}</span>
                  <div class="ascwo-search-input">
                    <SearchIcon class="ascwo-w-4 ascwo-h-4 ascwo-text-[#6b7280]" />
                    <input
                      v-model="googleFontSearch"
                      @focus="showGoogleDropdown = true"
                      :placeholder="__('Search font', 'all-signs-customizer-for-woocommerce-pro')"
                      autocomplete="off"
                    />
                  </div>
                </label>

                <label v-if="selectedGoogleFont?.variants?.length" class="ascwo-block">
                  <span class="ascwo-form-label">{{ __('Font Variant', 'all-signs-customizer-for-woocommerce-pro') }}</span>
                  <select v-model="selectedGoogleVariant" @change="applyGoogleVariant" class="ascwo-form-input">
                    <option v-for="variant in selectedGoogleFont.variants" :key="variant" :value="variant">{{ variant }}</option>
                  </select>
                </label>
              </div>

              <label v-else class="ascwo-block">
                <span class="ascwo-form-label">{{ __('Upload font file', 'all-signs-customizer-for-woocommerce-pro') }}</span>
                <div class="ascwo-file-input">
                  <button @click.prevent="selectFontFile" class="ascwo-file-button">{{ __('Upload font file', 'all-signs-customizer-for-woocommerce-pro') }}</button>
                  <input v-model="fontForm.url" autocomplete="off" />
                </div>
                <span class="ascwo-help-text">{{ __('.ttf or .otf font file.', 'all-signs-customizer-for-woocommerce-pro') }}</span>
              </label>
              <label class="ascwo-block">
                <span class="ascwo-form-label">{{ __('Label', 'all-signs-customizer-for-woocommerce-pro') }}</span>
                <input v-model="fontForm.label" class="ascwo-form-input" autocomplete="off" />
              </label>
            </div>
            <div class="ascwo-flex ascwo-justify-end ascwo-gap-2 ascwo-mt-4">
              <button @click="saveFontForm" :disabled="isSavingFontForm || !fontForm.label.trim() || !fontForm.url.trim()" class="ascwo-primary-button">
                {{
                  isSavingFontForm
                    ? __('Creating...', 'all-signs-customizer-for-woocommerce-pro')
                    : formMode === 'edit'
                      ? __('Update font', 'all-signs-customizer-for-woocommerce-pro')
                      : __('Create and add font', 'all-signs-customizer-for-woocommerce-pro')
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
    source: "managed",
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

const selectedIds = computed(() => {
  const fonts = textSettings.value.selectedFonts;
  if (!Array.isArray(fonts)) return [];
  return fonts.map((f) => (typeof f === 'object' && f !== null ? Number(f.id) : normalizeId(f)));
});

const selectedFontRows = ref([]);

const googleFontRows = computed(() => {
  return (Array.isArray(googleFonts.value) ? googleFonts.value : [])
    .map((font, index) => {
      const variants = Array.isArray(font?.variants) ? font.variants.map(String) : [];
      const files = font?.files && typeof font.files === "object" ? font.files : {};
      const firstUrl = String(files.regular || Object.values(files)[0] || "");
      return {
        id: index,
        source: "google",
        key: String(font?.family || "").trim(),
        label: String(font?.family || "").trim(),
        url: firstUrl,
        previewImg: "",
        isGoogleFont: true,
        variants,
        files,
      };
    })
    .filter((font) => font.label && font.url);
});

const availableFontRows = computed(() => {
  return fontRows.value;
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

const getPreviewFamilyName = (font) => `ascwo_config_font_${font.id}`;

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
    previewStyleElement.setAttribute("data-ascwo-font-preview", "simple-fonts");
    document.head.appendChild(previewStyleElement);
  }
  previewStyleElement.textContent = css || "";
};

const fetchFonts = async () => {
  const result = await api.getManagefonts();
  managedFonts.value = Array.isArray(result)
    ? result
    : Array.isArray(result?.items)
      ? result.items
      : Object.values(result || {}).filter((item) => item && typeof item === "object");
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
  const text = config?.settings?.customizerSign?.text || {};
  const fonts = config?.requiredOptions?.fonts || {};
  textSettings.value = {
    ...textSettings.value,
    ...text,
    fontsLabel: String(fonts.label ?? text.fontsLabel ?? textSettings.value.fontsLabel),
    fontsDescription: String(fonts.description ?? text.fontsDescription ?? textSettings.value.fontsDescription),
  };
};

const fetchSelectedFonts = async () => {
  const result = await api.getRequiredOptionFonts(configID.value);
  if (result) {
    const items = Array.isArray(result.items) ? result.items : Array.isArray(result.fontItems) ? result.fontItems : [];
    selectedFontRows.value = items.map((item) => {
      const mId = Number(item.managedFontId);
      const managed = managedFonts.value[mId] || {};
      return {
        ...item,
        id: item.id || mId,
        managedFontId: mId,
        label: item.label || managed.label || `Font ${mId}`,
        url: item.url || managed.url || '',
        previewImg: item.previewImg || managed.previewImg || managed.preview || '',
        isGoogleFont: Boolean(managed.isGoogleFont),
        isDefault: Boolean(item.isDefault),
      };
    });
  }
};

const fetchData = async () => {
  isFetching.value = true;
  try {
    await Promise.all([fetchFonts(), fetchGoogleFonts()]);
    await fetchConfigFonts();
    await fetchSelectedFonts();
  } finally {
    isFetching.value = false;
  }
};

const saveFonts = async () => {
  isLoading.value = true;
  try {
    const result = await api.updateRequiredOptionFonts(configID.value, {
      label: textSettings.value.fontsLabel,
      description: textSettings.value.fontsDescription,
      items: selectedFontRows.value.map((font, index) => ({
        id: font.id,
        label: font.label,
        managedFontId: Number(font.managedFontId ?? font.id),
        url: font.url || '',
        previewImg: font.previewImg || '',
        isGoogleFont: Boolean(font.isGoogleFont),
        isDefault: index === 0,
      })),
    });
    if (result?.success) {
      toastMessage(result.message || __("Fonts saved", "all-signs-customizer-for-woocommerce-pro"));
      await fetchSelectedFonts();
    } else {
      toastMessage(result?.message || __("Unable to save fonts", "all-signs-customizer-for-woocommerce-pro"), "warning");
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
  const [source, rawId] = String(selectedExistingFontId.value).split(":", 2);
  let targetIndex = Number(rawId);
  let targetFont = null;

  if (source === "managed") {
    targetFont = normalizeFontRow(managedFonts.value[targetIndex], targetIndex);
  } else if (source === "google") {
    const googleFont = googleFonts.value.find((font) => String(font?.family || "") === rawId);
    if (!googleFont) {
      toastMessage(__("Font not found", "all-signs-customizer-for-woocommerce-pro"), "warning");
      return;
    }

    const payload = {
      label: String(googleFont.family || rawId),
      url: String(googleFont.files?.regular || Object.values(googleFont.files || {})[0] || ""),
      previewImg: "",
      isGoogleFont: true,
    };

    const created = await api.addManagefont({ many: false, font: payload });
    if (!created?.success) {
      toastMessage(created?.message || __("Unable to add Google font to manage fonts", "all-signs-customizer-for-woocommerce-pro"), "warning");
      return;
    }

    await fetchFonts();
    targetIndex = managedFonts.value.findIndex((font, index) => {
      const row = normalizeFontRow(font, index);
      return getFontIdentity(row) === getFontIdentity(payload);
    });
    targetFont = targetIndex >= 0 ? normalizeFontRow(managedFonts.value[targetIndex], targetIndex) : null;
  }

  const targetKey = getFontIdentity(targetFont);
  if (!targetKey) return;
  const alreadySelected = selectedFontRows.value.some((font) => getFontIdentity(font) === targetKey);
  if (alreadySelected) {
    toastMessage(__("This font is already added to this configuration", "all-signs-customizer-for-woocommerce-pro"));
    resetForm();
    return;
  }

  const result = await api.addRequiredOptionFontItem(configID.value, targetIndex);
  if (result?.success) {
    toastMessage(result.message || __("Font successfully added", "all-signs-customizer-for-woocommerce-pro"));
  }
  await fetchSelectedFonts();
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
      if (alreadySelected) {
        toastMessage(__("This font is already added to this configuration", "all-signs-customizer-for-woocommerce-pro"));
        resetForm();
        return;
      }
      const result = await api.addRequiredOptionFontItem(configID.value, targetIndex);
      if (result?.success) {
        toastMessage(result.message || __("Font successfully added", "all-signs-customizer-for-woocommerce-pro"));
      }
      await fetchSelectedFonts();
      resetForm();
      return;
    }

    toastMessage(__("Unable to create this font", "all-signs-customizer-for-woocommerce-pro"), "error");
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

const removeFont = async (itemIndex) => {
  const result = await api.deleteRequiredOptionFontItem(configID.value, itemIndex);
  if (result?.success) {
    toastMessage(result.message || __("Font successfully deleted", "all-signs-customizer-for-woocommerce-pro"));
  }
  await fetchSelectedFonts();
};

const setDefaultFont = async (itemIndex) => {
  const result = await api.setRequiredOptionFontDefault(configID.value, itemIndex);
  if (result?.success) {
    toastMessage(result.message || __("Default font successfully updated", "all-signs-customizer-for-woocommerce-pro"));
    await fetchSelectedFonts();
  }
};

const dragStartFont = (index) => {
  draggedFontIndex.value = index;
};

const dropFont = async (targetIndex) => {
  if (draggedFontIndex.value === null || draggedFontIndex.value === targetIndex) return;
  const movedIndex = draggedFontIndex.value;
  draggedFontIndex.value = null;
  const result = await api.updateRequiredOptionFontItem(configID.value, movedIndex, targetIndex);
  if (result?.success) {
    toastMessage(result.message || __("Font successfully updated", "all-signs-customizer-for-woocommerce-pro"));
  }
  await fetchSelectedFonts();
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
  router.push({ path: "/manage-font", query: { returnTo: route.fullPath } });
};

const selectFontFile = () => {
  if (!window.wp?.media) return;
  const uploader = window.wp.media({
    title: __("Upload font file", "all-signs-customizer-for-woocommerce-pro"),
    button: { text: __("Use font file", "all-signs-customizer-for-woocommerce-pro") },
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
  if (!event.target?.closest?.(".ascwo-google-font-picker")) {
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
.ascwo-fonts-panel {
  color: #303030;
}

.ascwo-font-preview-box {
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

.ascwo-fonts-list-table,
.ascwo-fonts-list-table thead,
.ascwo-fonts-list-table tbody,
.ascwo-fonts-list-table tr,
.ascwo-fonts-list-table th,
.ascwo-fonts-list-table td {
  border-left: 0 !important;
  border-right: 0 !important;
  outline: 0 !important;
  box-shadow: none !important;
}

.ascwo-fonts-list-table {
  border: 0 !important;
}

.ascwo-fonts-list-table th,
.ascwo-fonts-list-table td {
  border-top: 0 !important;
  border-bottom: 0 !important;
}

.ascwo-fonts-list-table tbody tr {
  border-bottom: 1px solid #e5e7eb !important;
}

.ascwo-fonts-list-table tbody tr:last-child {
  border-bottom: 0 !important;
}

.ascwo-selected-badge {
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

.ascwo-remove-button {
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

.ascwo-remove-button:hover {
  background: #f6f6f7;
  color: #8e1f0b;
}

.ascwo-form-label {
  display: block;
  margin-bottom: 4px;
  font-size: 12px;
  line-height: 16px;
  color: #303030;
}

.ascwo-create-font-section {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #e1e3e5;
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

.ascwo-help-text {
  display: block;
  margin-top: 3px;
  color: #616161;
  font-size: 12px;
  line-height: 16px;
}

.ascwo-file-input {
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

.ascwo-file-input input {
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

.ascwo-file-input input:focus {
  outline: none;
  box-shadow: none;
}

.ascwo-file-button {
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

.ascwo-file-button:hover {
  background: #00645f;
  color: #fff;
}

.ascwo-search-input {
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

.ascwo-search-input:focus-within {
  outline: 2px solid #005bd3;
  outline-offset: 1px;
}

.ascwo-search-input input {
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

.ascwo-search-input input:focus {
  outline: none;
  box-shadow: none;
}

.ascwo-google-dropdown {
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

.ascwo-google-font-picker {
  width: 100%;
  max-width: 100%;
}

.ascwo-google-dropdown button {
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

.ascwo-google-dropdown button:hover,
.ascwo-google-dropdown button:first-child {
  background: #e8e8e8;
  color: #303030;
}

.ascwo-google-empty {
  padding: 10px 12px;
  color: #616161;
  font-size: 12px;
}

.ascwo-primary-button,
.ascwo-secondary-button {
  min-height: 32px;
  padding: 6px 12px;
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

.ascwo-secondary-button {
  border: 1px solid #c9cccf;
  background: #fff;
  color: #303030;
}

.ascwo-secondary-button:hover {
  background: #f6f6f7;
  color: #303030;
}
</style>
