<template>
  <div class="ascwo-customizer-setup">
    <div v-if="isFetching" class="ascwo-customizer-card ascwo-customizer-loading">
      <img :src="loadingIcon" alt="" />
    </div>

    <div v-else class="ascwo-customizer-layout">
      <div class="ascwo-customizer-main">
        <header class="ascwo-customizer-card ascwo-customizer-hero">
          <h1>{{ __('Customizer Setup', 'all-signs-customizer-for-woocommerce') }}</h1>
          <p>{{ __('Configure the classic customizer behavior in one page, without switching between second-level settings tabs.', 'all-signs-customizer-for-woocommerce') }}</p>
        </header>

        <section id="ascwo-customizer-config-options" class="ascwo-customizer-card ascwo-customizer-section">
          <div class="ascwo-section-head">
            <div>
              <h2>{{ __('Config Options', 'all-signs-customizer-for-woocommerce') }}</h2>
              <p>{{ __('Show, hide and order configuration blocks displayed in the customizer.', 'all-signs-customizer-for-woocommerce') }}</p>
            </div>
            <button type="button" class="ascwo-collapse-button" @click="toggleSection('configOptions')">
              {{ openSections.configOptions ? __('Show less', 'all-signs-customizer-for-woocommerce') : __('Show more', 'all-signs-customizer-for-woocommerce') }}
              <ChevronUpIcon v-if="openSections.configOptions" />
              <ChevronDownIcon v-else />
            </button>
          </div>

          <div v-if="openSections.configOptions">
            <p class="ascwo-section-note">
              {{ __('The list order below is the display order used in the customizer. Move items up or down by dragging the rows, then save.', 'all-signs-customizer-for-woocommerce') }}
            </p>

            <div class="ascwo-config-options-list">
              <article
                v-for="(option, index) in configOptions"
                :key="option.type"
                class="ascwo-config-option-row"
                draggable="true"
                @dragstart="onDragStart(index)"
                @dragover.prevent
                @drop="onDrop(index)"
                @dragend="onDragEnd"
              >
                <div class="ascwo-config-option-left">
                  <button type="button" class="ascwo-drag-handle" :aria-label="__('Drag to reorder', 'all-signs-customizer-for-woocommerce')">
                    <GripVerticalIcon />
                  </button>
                  <component :is="optionIcon(option.type)" class="ascwo-option-icon" />
                  <div>
                    <h3>{{ optionLabel(option.type) }}</h3>
                    <p>{{ option.active ? __('Visible in the customizer', 'all-signs-customizer-for-woocommerce') : __('Hidden from the customizer', 'all-signs-customizer-for-woocommerce') }}</p>
                  </div>
                </div>
                <button type="button" class="ascwo-visibility-button" @click="toggleConfigOption(index)">
                  <EyeIcon v-if="option.active" />
                  <EyeOffIcon v-else />
                  {{ option.active ? __('Hide option', 'all-signs-customizer-for-woocommerce') : __('Show option', 'all-signs-customizer-for-woocommerce') }}
                </button>
              </article>
            </div>

            <div class="ascwo-save-row">
              <button type="button" class="ascwo-ui-button-primary ascwo-customizer-save" :disabled="savingSection === 'configOptions'" @click="saveConfigOptions">
                <Loader2Icon v-if="savingSection === 'configOptions'" class="ascwo-spin" />
                {{ __('Save Config Options', 'all-signs-customizer-for-woocommerce') }}
              </button>
            </div>
          </div>
        </section>

        <section id="ascwo-customizer-options" class="ascwo-customizer-card ascwo-customizer-section">
          <div class="ascwo-section-head">
            <div>
              <h2>{{ __('Customizer Options', 'all-signs-customizer-for-woocommerce') }}</h2>
              <p>{{ __('Measurement, layout and flow options for the classic customizer.', 'all-signs-customizer-for-woocommerce') }}</p>
            </div>
            <button type="button" class="ascwo-collapse-button" @click="toggleSection('customizerOptions')">
              {{ openSections.customizerOptions ? __('Show less', 'all-signs-customizer-for-woocommerce') : __('Show more', 'all-signs-customizer-for-woocommerce') }}
              <ChevronUpIcon v-if="openSections.customizerOptions" />
              <ChevronDownIcon v-else />
            </button>
          </div>

          <div v-if="openSections.customizerOptions" class="ascwo-options-grid">
            <label class="ascwo-field">
              <span>{{ __('Measurement Unit', 'all-signs-customizer-for-woocommerce') }}</span>
              <select v-model="customizerOptions.measurementUnit" class="ascwo-ui-input">
                <option value="cm">{{ __('Centimeters', 'all-signs-customizer-for-woocommerce') }}</option>
                <option value="in">{{ __('inches', 'all-signs-customizer-for-woocommerce') }}</option>
                <option value="mm">{{ __('Milimetres', 'all-signs-customizer-for-woocommerce') }}</option>
                <option value="m">{{ __('Mètre', 'all-signs-customizer-for-woocommerce') }}</option>
                <option value="ft">{{ __('Feet', 'all-signs-customizer-for-woocommerce') }}</option>
              </select>
            </label>

            <label class="ascwo-field">
              <span>{{ __('Show/hide Measurements', 'all-signs-customizer-for-woocommerce') }}</span>
              <select v-model="customizerOptions.showHideMeasurements" class="ascwo-ui-input">
                <option value="both">{{ __('show both width and height', 'all-signs-customizer-for-woocommerce') }}</option>
                <option value="none">{{ __('Do not show measurements', 'all-signs-customizer-for-woocommerce') }}</option>
                <option value="height">{{ __('show only height', 'all-signs-customizer-for-woocommerce') }}</option>
                <option value="width">{{ __('show only width', 'all-signs-customizer-for-woocommerce') }}</option>
              </select>
            </label>

            <label class="ascwo-field">
              <span>{{ __('Decimal Format of Measurements', 'all-signs-customizer-for-woocommerce') }}</span>
              <select v-model="customizerOptions.decimalFormatMeasurements" class="ascwo-ui-input">
                <option value="with-decimal">{{ __('with decimal', 'all-signs-customizer-for-woocommerce') }}</option>
                <option value="no-decimal">{{ __('No decimal', 'all-signs-customizer-for-woocommerce') }}</option>
              </select>
            </label>

            <label class="ascwo-field">
              <span>{{ __('Desktop Column Order', 'all-signs-customizer-for-woocommerce') }}</span>
              <select v-model="customizerOptions.desktopColumnOrder" class="ascwo-ui-input">
                <option value="right">{{ __('Right', 'all-signs-customizer-for-woocommerce') }}</option>
                <option value="left">{{ __('Left', 'all-signs-customizer-for-woocommerce') }}</option>
              </select>
            </label>

            <label class="ascwo-field">
              <span>{{ __('Finish button position', 'all-signs-customizer-for-woocommerce') }}</span>
              <select v-model="customizerOptions.finishButtonPosition" class="ascwo-ui-input">
                <option value="top">{{ __('Top', 'all-signs-customizer-for-woocommerce') }}</option>
                <option value="bottom">{{ __('Bottom', 'all-signs-customizer-for-woocommerce') }}</option>
              </select>
            </label>

            <label class="ascwo-field">
              <span>{{ __('Allow next button', 'all-signs-customizer-for-woocommerce') }}</span>
              <select :value="customizerOptions.allowNextButton ? 'yes' : 'no'" class="ascwo-ui-input" @change="customizerOptions.allowNextButton = $event.target.value === 'yes'">
                <option value="yes">{{ __('Yes', 'all-signs-customizer-for-woocommerce') }}</option>
                <option value="no">{{ __('No', 'all-signs-customizer-for-woocommerce') }}</option>
              </select>
            </label>

            <div class="ascwo-inline-toggle">
              <span>{{ __('Show thickness pricing labels in configurator', 'all-signs-customizer-for-woocommerce') }}</span>
              <label class="ascwo-switch"><input type="checkbox" v-model="customizerOptions.showThicknessPricing"><span></span></label>
            </div>

            <div class="ascwo-inline-toggle">
              <span>{{ __('Expand thickness by default in configurator', 'all-signs-customizer-for-woocommerce') }}</span>
              <label class="ascwo-switch"><input type="checkbox" v-model="customizerOptions.expandThicknessByDefault"><span></span></label>
            </div>

            <div class="ascwo-inline-toggle">
              <span>{{ __('Expand predefined sizes by default in configurator', 'all-signs-customizer-for-woocommerce') }}</span>
              <label class="ascwo-switch"><input type="checkbox" v-model="customizerOptions.expandPredefinedSizesByDefault"><span></span></label>
            </div>

            <div class="ascwo-save-row ascwo-options-save">
              <button type="button" class="ascwo-ui-button-primary ascwo-customizer-save" :disabled="savingSection === 'customizerOptions'" @click="saveCustomizerOptions">
                <Loader2Icon v-if="savingSection === 'customizerOptions'" class="ascwo-spin" />
                {{ __('Save Customizer Options', 'all-signs-customizer-for-woocommerce') }}
              </button>
            </div>
          </div>
        </section>
      </div>

      <div class="ascwo-section-menu-wrap">
        <aside class="ascwo-section-menu ascwo-customizer-card">
          <h2>{{ __('Section Menu', 'all-signs-customizer-for-woocommerce') }}</h2>
          <div class="ascwo-section-menu-links">
            <a v-for="item in sectionMenu" :key="item.id" :href="`#${item.id}`" @click.prevent="scrollToSection(item.id)">
              {{ item.label }}
            </a>
          </div>
        </aside>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import {
  BoxIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  CircleIcon,
  ComponentIcon,
  EyeIcon,
  EyeOffIcon,
  GripVerticalIcon,
  ImageIcon,
  LayersIcon,
  Loader2Icon,
  PaletteIcon,
  PenToolIcon,
  QrCodeIcon,
  RulerIcon,
  ShapesIcon,
  SquareIcon,
  TypeIcon,
  WrenchIcon,
} from 'lucide-vue-next';
import api from '@/admin/Api/api';
import toastMessage from '@/admin/utils/functions';
import { __ } from "@wordpress/i18n";

const loadingIcon = `${String(window?.ascwo_data?.assets_url || "").replace(/\/$/, "")}/icons/ic_loading.svg`;

const route = useRoute();
const configId = ref(route.params.configId);
const isFetching = ref(false);
const savingSection = ref('');
const draggedIndex = ref(null);

const defaultConfigOptions = () => [
  { type: 'materials', active: true },
  { type: 'sizes', active: true },
  { type: 'shapes', active: true },
  { type: 'fixing-methodes', active: true },
  { type: 'borders', active: true },
  { type: 'colors', active: true },
  { type: 'texts', active: true },
  { type: 'qrcodes', active: true },
  { type: 'images', active: true },
  { type: 'additional-options', active: true },
  { type: 'additional-components', active: true },
];

const defaultCustomizerOptions = () => ({
  measurementUnit: 'mm',
  showHideMeasurements: 'both',
  decimalFormatMeasurements: 'with-decimal',
  desktopColumnOrder: 'left',
  finishButtonPosition: 'bottom',
  allowNextButton: false,
  showThicknessPricing: false,
  expandThicknessByDefault: false,
  expandPredefinedSizesByDefault: false,
});

const configOptions = ref(defaultConfigOptions());
const customizerOptions = ref(defaultCustomizerOptions());
const openSections = reactive({
  configOptions: true,
  customizerOptions: true,
});

const sectionMenu = [
  { id: 'ascwo-customizer-config-options', label: 'Config Options' },
  { id: 'ascwo-customizer-options', label: 'Customizer Options' },
];

const iconMap = {
  materials: LayersIcon,
  sizes: RulerIcon,
  shapes: ShapesIcon,
  'fixing-methodes': WrenchIcon,
  borders: SquareIcon,
  colors: PaletteIcon,
  texts: TypeIcon,
  qrcodes: QrCodeIcon,
  images: ImageIcon,
  'additional-options': PenToolIcon,
  'additional-components': ComponentIcon,
  templates: BoxIcon,
};

const optionIcon = (type) => iconMap[type] || CircleIcon;

const optionLabel = (type) => String(type || '').replace(/-/g, ' ').toUpperCase();

const normalizeShowHideMeasurements = (value) => {
  if (value === 'only-height') return 'height';
  if (value === 'only-width') return 'width';
  if (value === 'nothing') return 'none';
  return value || 'both';
};

const normalizeBoolean = (value) => value === true || value === 1 || value === '1' || value === 'true' || value === 'yes';

const normalizeCustomizerOptions = (raw = {}) => ({
  ...defaultCustomizerOptions(),
  ...raw,
  showHideMeasurements: normalizeShowHideMeasurements(raw.showHideMeasurements),
  desktopColumnOrder: raw.desktopColumnOrder || raw.destokColumnOrder || 'left',
  finishButtonPosition: raw.finishButtonPosition || 'bottom',
  allowNextButton: normalizeBoolean(raw.allowNextButton),
  showThicknessPricing: normalizeBoolean(raw.showThicknessPricing),
  expandThicknessByDefault: normalizeBoolean(raw.expandThicknessByDefault),
  expandPredefinedSizesByDefault: normalizeBoolean(raw.expandPredefinedSizesByDefault),
});

const normalizeConfigOptions = (raw = []) => {
  const defaults = defaultConfigOptions();
  if (!Array.isArray(raw)) return defaults;

  const normalized = raw
    .filter((item) => item && item.type)
    .map((item) => ({ type: item.type, active: item.active !== false }));
  const missing = defaults.filter((item) => !normalized.some((option) => option.type === item.type));

  return [...normalized, ...missing];
};

const fetchCustomizerSignsSettings = async () => {
  const result = await api.getCustomizerSignsSettings(configId.value);
  if (result?.message) return;

  configOptions.value = normalizeConfigOptions(result.configOptions);
  customizerOptions.value = normalizeCustomizerOptions(result.customizerOptions || {});
};

const toggleSection = (key) => {
  openSections[key] = !openSections[key];
};

const scrollToSection = (id) => {
  window.requestAnimationFrame(() => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
};

const toggleConfigOption = (index) => {
  const next = [...configOptions.value];
  next[index] = { ...next[index], active: !next[index].active };
  configOptions.value = next;
};

const onDragStart = (index) => {
  draggedIndex.value = index;
};

const onDrop = (index) => {
  if (draggedIndex.value === null || draggedIndex.value === index) return;
  const next = [...configOptions.value];
  const [moved] = next.splice(draggedIndex.value, 1);
  next.splice(index, 0, moved);
  configOptions.value = next;
  draggedIndex.value = null;
};

const onDragEnd = () => {
  draggedIndex.value = null;
};

const handleSaveResponse = async (result) => {
  if (result?.success) {
    await fetchCustomizerSignsSettings();
    toastMessage(result.message);
    return;
  }
  toastMessage(result?.message || __('Unable to save settings', 'all-signs-customizer-for-woocommerce'), 'error');
};

const saveConfigOptions = async () => {
  savingSection.value = 'configOptions';
  try {
    await handleSaveResponse(await api.updateCustomizerSignsConfigOptions(configId.value, configOptions.value));
  } catch (error) {
    toastMessage(error?.response?.data?.message || __('Unable to save config options', 'all-signs-customizer-for-woocommerce'), 'error');
  } finally {
    savingSection.value = '';
  }
};

const saveCustomizerOptions = async () => {
  savingSection.value = 'customizerOptions';
  try {
    await handleSaveResponse(await api.updateCustomizerSignsCustomizer(configId.value, customizerOptions.value));
  } catch (error) {
    toastMessage(error?.response?.data?.message || __('Unable to save customizer options', 'all-signs-customizer-for-woocommerce'), 'error');
  } finally {
    savingSection.value = '';
  }
};

onMounted(async () => {
  isFetching.value = true;
  try {
    await fetchCustomizerSignsSettings();
  } finally {
    isFetching.value = false;
  }
});
</script>

<style scoped>
.ascwo-customizer-setup {
  color: var(--ascwo-ui-text);
}

.ascwo-customizer-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 220px;
  gap: 20px;
  align-items: start;
}

.ascwo-customizer-main {
  display: grid;
  gap: 16px;
  min-width: 0;
}

.ascwo-customizer-card {
  background: var(--ascwo-ui-surface);
  border: 1px solid var(--ascwo-ui-border);
  border-radius: var(--ascwo-ui-radius-card);
  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.08);
}

.ascwo-customizer-hero {
  padding: 16px 20px;
}

.ascwo-customizer-hero h1,
.ascwo-customizer-section h2,
.ascwo-section-menu h2 {
  margin: 0;
  color: #303030;
  font-weight: 750;
  letter-spacing: 0;
}

.ascwo-customizer-hero h1 {
  font-size: 22px;
  line-height: 28px;
}

.ascwo-customizer-hero p,
.ascwo-section-head p,
.ascwo-section-note,
.ascwo-config-option-row p {
  margin: 6px 0 0;
  color: #616161;
  font-size: 14px;
  line-height: 22px;
}

.ascwo-customizer-section {
  padding: 20px;
  scroll-margin-top: 12px;
}

.ascwo-section-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 18px;
}

.ascwo-customizer-section h2 {
  font-size: 17px;
  line-height: 24px;
}

.ascwo-collapse-button,
.ascwo-visibility-button {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-height: 31px;
  padding: 5px 12px;
  border: 1px solid #c9cccf;
  border-radius: 8px;
  background: #ffffff;
  color: #202223;
  font-size: 13px;
  line-height: 18px;
  font-weight: 650;
  cursor: pointer;
  white-space: nowrap;
}

.ascwo-collapse-button:hover,
.ascwo-collapse-button:focus,
.ascwo-visibility-button:hover,
.ascwo-visibility-button:focus {
  background: #ffffff;
  color: #202223;
  border-color: #babfc3;
  box-shadow: none;
  outline: none;
}

.ascwo-collapse-button svg,
.ascwo-visibility-button svg {
  width: 15px;
  height: 15px;
}

.ascwo-section-note {
  margin-bottom: 14px;
}

.ascwo-config-options-list {
  display: grid;
  gap: 10px;
}

.ascwo-config-option-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  min-height: 54px;
  padding: 12px 14px;
  border: 1px solid #dfe3e8;
  border-radius: 10px;
  background: #ffffff;
}

.ascwo-config-option-left {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
}

.ascwo-drag-handle {
  display: inline-flex;
  width: 32px;
  height: 32px;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  background: #ffffff;
  color: #6b7280;
  cursor: grab;
}

.ascwo-drag-handle svg,
.ascwo-option-icon {
  width: 17px;
  height: 17px;
  color: #303030;
}

.ascwo-config-option-row h3 {
  margin: 0;
  color: #303030;
  font-size: 13px;
  line-height: 18px;
  font-weight: 750;
  letter-spacing: 0;
}

.ascwo-config-option-row p {
  font-size: 11px;
  line-height: 15px;
}

.ascwo-options-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  column-gap: 30px;
  row-gap: 16px;
}

.ascwo-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.ascwo-field > span,
.ascwo-inline-toggle > span {
  color: #303030;
  font-size: 13px;
  line-height: 18px;
  font-weight: 500;
}

.ascwo-ui-input {
  width: 100%;
  min-height: 36px;
  padding: 7px 10px;
  border: 1px solid #8c9196;
  border-radius: 8px;
  background: #ffffff;
  color: #303030;
  font-size: 13px;
  line-height: 18px;
  outline: none;
  box-sizing: border-box;
}

.ascwo-ui-input:focus {
  border-color: #8c9196;
  box-shadow: none !important;
}

.ascwo-inline-toggle {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 36px;
}

.ascwo-switch {
  position: relative;
  display: inline-flex;
  width: 40px;
  height: 24px;
  flex: 0 0 auto;
  cursor: pointer;
}

.ascwo-switch input {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

.ascwo-switch span {
  position: absolute;
  inset: 0;
  border-radius: 999px;
  background: #d5dbe6;
  transition: background 160ms ease;
}

.ascwo-switch span::after {
  content: "";
  position: absolute;
  top: 3px;
  left: 3px;
  width: 18px;
  height: 18px;
  border-radius: 999px;
  background: #ffffff;
  box-shadow: 0 2px 6px rgba(15, 23, 42, 0.26);
  transition: transform 160ms ease;
}

.ascwo-switch input:checked + span {
  background: #007a76;
}

.ascwo-switch input:checked + span::after {
  transform: translateX(16px);
}

.ascwo-save-row {
  display: flex;
  justify-content: flex-end;
  margin-top: 18px;
}

.ascwo-options-save {
  grid-column: 1 / -1;
}

.ascwo-customizer-save {
  min-height: 32px;
  padding: 6px 14px;
  font-size: 13px;
}

.ascwo-customizer-save svg {
  width: 14px;
  height: 14px;
}

.ascwo-section-menu-wrap {
  position: sticky;
  top: 46px;
  align-self: start;
}

.ascwo-section-menu {
  padding: 10px;
}

.ascwo-section-menu h2 {
  margin: 0;
  font-size: 14px;
  line-height: 20px;
  font-weight: 650;
}

.ascwo-section-menu-links {
  display: grid;
  gap: 8px;
  margin-top: 6px;
}

.ascwo-section-menu a {
  display: block;
  width: 100%;
  box-sizing: border-box;
  min-height: 36px;
  padding: 8px 10px;
  border: 1px solid #dfe3e8;
  border-radius: 10px;
  background: #ffffff;
  color: #111827;
  text-align: left;
  text-decoration: none;
  font-size: 13px;
  line-height: 1.2;
  font-weight: 600;
  cursor: pointer;
}

.ascwo-section-menu a:hover,
.ascwo-section-menu a:focus {
  background: #ffffff;
  color: #111827;
  border-color: #d1d5db;
  box-shadow: none;
  outline: none;
}

.ascwo-customizer-loading {
  display: flex;
  min-height: 300px;
  align-items: center;
  justify-content: center;
}

.ascwo-customizer-loading img {
  width: 140px;
  height: 140px;
}

.ascwo-spin {
  animation: ascwo-customizer-spin 800ms linear infinite;
}

@keyframes ascwo-customizer-spin {
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 1200px) {
  .ascwo-customizer-layout {
    grid-template-columns: 1fr;
  }

  .ascwo-section-menu-wrap {
    position: static;
    order: -1;
  }
}

@media (max-width: 782px) {
  .ascwo-customizer-hero,
  .ascwo-customizer-section {
    padding: 20px;
  }

  .ascwo-options-grid {
    grid-template-columns: 1fr;
  }

  .ascwo-section-head,
  .ascwo-config-option-row {
    flex-direction: column;
    align-items: stretch;
  }
}
</style>
