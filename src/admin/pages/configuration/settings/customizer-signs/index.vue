<template>
  <div class="asowp-customizer-setup">
    <div v-if="isFetching" class="asowp-customizer-card asowp-customizer-loading">
      <img src="../../../../../../assets/icons/ic_loading.svg" alt="" />
    </div>

    <div v-else class="asowp-customizer-layout">
      <div class="asowp-customizer-main">
        <header class="asowp-customizer-card asowp-customizer-hero">
          <h1>{{ __('Customizer Setup', 'all-signs-options-pro') }}</h1>
          <p>{{ __('Configure the classic customizer behavior in one page, without switching between second-level settings tabs.', 'all-signs-options-pro') }}</p>
        </header>

        <section id="asowp-customizer-config-options" class="asowp-customizer-card asowp-customizer-section">
          <div class="asowp-section-head">
            <div>
              <h2>{{ __('Config Options', 'all-signs-options-pro') }}</h2>
              <p>{{ __('Show, hide and order configuration blocks displayed in the customizer.', 'all-signs-options-pro') }}</p>
            </div>
            <button type="button" class="asowp-collapse-button" @click="toggleSection('configOptions')">
              {{ openSections.configOptions ? __('Show less', 'all-signs-options-pro') : __('Show more', 'all-signs-options-pro') }}
              <ChevronUpIcon v-if="openSections.configOptions" />
              <ChevronDownIcon v-else />
            </button>
          </div>

          <div v-if="openSections.configOptions">
            <p class="asowp-section-note">
              {{ __('The list order below is the display order used in the customizer. Move items up or down by dragging the rows, then save.', 'all-signs-options-pro') }}
            </p>

            <div class="asowp-config-options-list">
              <article
                v-for="(option, index) in configOptions"
                :key="option.type"
                class="asowp-config-option-row"
                draggable="true"
                @dragstart="onDragStart(index)"
                @dragover.prevent
                @drop="onDrop(index)"
                @dragend="onDragEnd"
              >
                <div class="asowp-config-option-left">
                  <button type="button" class="asowp-drag-handle" :aria-label="__('Drag to reorder', 'all-signs-options-pro')">
                    <GripVerticalIcon />
                  </button>
                  <component :is="optionIcon(option.type)" class="asowp-option-icon" />
                  <div>
                    <h3>{{ optionLabel(option.type) }}</h3>
                    <p>{{ option.active ? __('Visible in the customizer', 'all-signs-options-pro') : __('Hidden from the customizer', 'all-signs-options-pro') }}</p>
                  </div>
                </div>
                <button type="button" class="asowp-visibility-button" @click="toggleConfigOption(index)">
                  <EyeIcon v-if="option.active" />
                  <EyeOffIcon v-else />
                  {{ option.active ? __('Hide option', 'all-signs-options-pro') : __('Show option', 'all-signs-options-pro') }}
                </button>
              </article>
            </div>

            <div class="asowp-save-row">
              <button type="button" class="asowp-shopify-button-primary asowp-customizer-save" :disabled="savingSection === 'configOptions'" @click="saveConfigOptions">
                <Loader2Icon v-if="savingSection === 'configOptions'" class="asowp-spin" />
                {{ __('Save Config Options', 'all-signs-options-pro') }}
              </button>
            </div>
          </div>
        </section>

        <section id="asowp-customizer-options" class="asowp-customizer-card asowp-customizer-section">
          <div class="asowp-section-head">
            <div>
              <h2>{{ __('Customizer Options', 'all-signs-options-pro') }}</h2>
              <p>{{ __('Measurement, layout and flow options for the classic customizer.', 'all-signs-options-pro') }}</p>
            </div>
            <button type="button" class="asowp-collapse-button" @click="toggleSection('customizerOptions')">
              {{ openSections.customizerOptions ? __('Show less', 'all-signs-options-pro') : __('Show more', 'all-signs-options-pro') }}
              <ChevronUpIcon v-if="openSections.customizerOptions" />
              <ChevronDownIcon v-else />
            </button>
          </div>

          <div v-if="openSections.customizerOptions" class="asowp-options-grid">
            <label class="asowp-field">
              <span>{{ __('Measurement Unit', 'all-signs-options-pro') }}</span>
              <select v-model="customizerOptions.measurementUnit" class="asowp-shopify-input">
                <option value="cm">{{ __('Centimeters', 'all-signs-options-pro') }}</option>
                <option value="in">{{ __('inches', 'all-signs-options-pro') }}</option>
                <option value="mm">{{ __('Milimetres', 'all-signs-options-pro') }}</option>
                <option value="m">{{ __('Mètre', 'all-signs-options-pro') }}</option>
                <option value="ft">{{ __('Feet', 'all-signs-options-pro') }}</option>
              </select>
            </label>

            <label class="asowp-field">
              <span>{{ __('Show/hide Measurements', 'all-signs-options-pro') }}</span>
              <select v-model="customizerOptions.showHideMeasurements" class="asowp-shopify-input">
                <option value="both">{{ __('show both width and height', 'all-signs-options-pro') }}</option>
                <option value="none">{{ __('Do not show measurements', 'all-signs-options-pro') }}</option>
                <option value="height">{{ __('show only height', 'all-signs-options-pro') }}</option>
                <option value="width">{{ __('show only width', 'all-signs-options-pro') }}</option>
              </select>
            </label>

            <label class="asowp-field">
              <span>{{ __('Decimal Format of Measurements', 'all-signs-options-pro') }}</span>
              <select v-model="customizerOptions.decimalFormatMeasurements" class="asowp-shopify-input">
                <option value="with-decimal">{{ __('with decimal', 'all-signs-options-pro') }}</option>
                <option value="no-decimal">{{ __('No decimal', 'all-signs-options-pro') }}</option>
              </select>
            </label>

            <label class="asowp-field">
              <span>{{ __('Desktop Column Order', 'all-signs-options-pro') }}</span>
              <select v-model="customizerOptions.desktopColumnOrder" class="asowp-shopify-input">
                <option value="right">{{ __('Right', 'all-signs-options-pro') }}</option>
                <option value="left">{{ __('Left', 'all-signs-options-pro') }}</option>
              </select>
            </label>

            <label class="asowp-field">
              <span>{{ __('Finish button position', 'all-signs-options-pro') }}</span>
              <select v-model="customizerOptions.finishButtonPosition" class="asowp-shopify-input">
                <option value="top">{{ __('Top', 'all-signs-options-pro') }}</option>
                <option value="bottom">{{ __('Bottom', 'all-signs-options-pro') }}</option>
              </select>
            </label>

            <label class="asowp-field">
              <span>{{ __('Allow next button', 'all-signs-options-pro') }}</span>
              <select :value="customizerOptions.allowNextButton ? 'yes' : 'no'" class="asowp-shopify-input" @change="customizerOptions.allowNextButton = $event.target.value === 'yes'">
                <option value="yes">{{ __('Yes', 'all-signs-options-pro') }}</option>
                <option value="no">{{ __('No', 'all-signs-options-pro') }}</option>
              </select>
            </label>

            <div class="asowp-inline-toggle">
              <span>{{ __('Show thickness pricing labels in configurator', 'all-signs-options-pro') }}</span>
              <label class="asowp-switch"><input type="checkbox" v-model="customizerOptions.showThicknessPricing"><span></span></label>
            </div>

            <div class="asowp-inline-toggle">
              <span>{{ __('Expand thickness by default in configurator', 'all-signs-options-pro') }}</span>
              <label class="asowp-switch"><input type="checkbox" v-model="customizerOptions.expandThicknessByDefault"><span></span></label>
            </div>

            <div class="asowp-inline-toggle">
              <span>{{ __('Expand predefined sizes by default in configurator', 'all-signs-options-pro') }}</span>
              <label class="asowp-switch"><input type="checkbox" v-model="customizerOptions.expandPredefinedSizesByDefault"><span></span></label>
            </div>

            <div class="asowp-save-row asowp-options-save">
              <button type="button" class="asowp-shopify-button-primary asowp-customizer-save" :disabled="savingSection === 'customizerOptions'" @click="saveCustomizerOptions">
                <Loader2Icon v-if="savingSection === 'customizerOptions'" class="asowp-spin" />
                {{ __('Save Customizer Options', 'all-signs-options-pro') }}
              </button>
            </div>
          </div>
        </section>
      </div>

      <div class="asowp-section-menu-wrap">
        <aside class="asowp-section-menu asowp-customizer-card">
          <h2>{{ __('Section Menu', 'all-signs-options-pro') }}</h2>
          <div class="asowp-section-menu-links">
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
  { id: 'asowp-customizer-config-options', label: 'Config Options' },
  { id: 'asowp-customizer-options', label: 'Customizer Options' },
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
  templates: BoxIcon,
  'additional-components': ComponentIcon,
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
  toastMessage(result?.message || __('Unable to save settings', 'all-signs-options-pro'), 'error');
};

const saveConfigOptions = async () => {
  savingSection.value = 'configOptions';
  try {
    await handleSaveResponse(await api.updateCustomizerSignsConfigOptions(configId.value, configOptions.value));
  } catch (error) {
    toastMessage(error?.response?.data?.message || __('Unable to save config options', 'all-signs-options-pro'), 'error');
  } finally {
    savingSection.value = '';
  }
};

const saveCustomizerOptions = async () => {
  savingSection.value = 'customizerOptions';
  try {
    await handleSaveResponse(await api.updateCustomizerSignsCustomizer(configId.value, customizerOptions.value));
  } catch (error) {
    toastMessage(error?.response?.data?.message || __('Unable to save customizer options', 'all-signs-options-pro'), 'error');
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
.asowp-customizer-setup {
  color: var(--asowp-shopify-text);
}

.asowp-customizer-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 220px;
  gap: 20px;
  align-items: start;
}

.asowp-customizer-main {
  display: grid;
  gap: 16px;
  min-width: 0;
}

.asowp-customizer-card {
  background: var(--asowp-shopify-surface);
  border: 1px solid var(--asowp-shopify-border);
  border-radius: var(--asowp-shopify-radius-card);
  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.08);
}

.asowp-customizer-hero {
  padding: 16px 20px;
}

.asowp-customizer-hero h1,
.asowp-customizer-section h2,
.asowp-section-menu h2 {
  margin: 0;
  color: #303030;
  font-weight: 750;
  letter-spacing: 0;
}

.asowp-customizer-hero h1 {
  font-size: 22px;
  line-height: 28px;
}

.asowp-customizer-hero p,
.asowp-section-head p,
.asowp-section-note,
.asowp-config-option-row p {
  margin: 6px 0 0;
  color: #616161;
  font-size: 14px;
  line-height: 22px;
}

.asowp-customizer-section {
  padding: 20px;
  scroll-margin-top: 12px;
}

.asowp-section-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 18px;
}

.asowp-customizer-section h2 {
  font-size: 17px;
  line-height: 24px;
}

.asowp-collapse-button,
.asowp-visibility-button {
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

.asowp-collapse-button:hover,
.asowp-collapse-button:focus,
.asowp-visibility-button:hover,
.asowp-visibility-button:focus {
  background: #ffffff;
  color: #202223;
  border-color: #babfc3;
  box-shadow: none;
  outline: none;
}

.asowp-collapse-button svg,
.asowp-visibility-button svg {
  width: 15px;
  height: 15px;
}

.asowp-section-note {
  margin-bottom: 14px;
}

.asowp-config-options-list {
  display: grid;
  gap: 10px;
}

.asowp-config-option-row {
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

.asowp-config-option-left {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
}

.asowp-drag-handle {
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

.asowp-drag-handle svg,
.asowp-option-icon {
  width: 17px;
  height: 17px;
  color: #303030;
}

.asowp-config-option-row h3 {
  margin: 0;
  color: #303030;
  font-size: 13px;
  line-height: 18px;
  font-weight: 750;
  letter-spacing: 0;
}

.asowp-config-option-row p {
  font-size: 11px;
  line-height: 15px;
}

.asowp-options-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  column-gap: 30px;
  row-gap: 16px;
}

.asowp-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.asowp-field > span,
.asowp-inline-toggle > span {
  color: #303030;
  font-size: 13px;
  line-height: 18px;
  font-weight: 500;
}

.asowp-shopify-input {
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

.asowp-shopify-input:focus {
  border-color: #8c9196;
  box-shadow: none !important;
}

.asowp-inline-toggle {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 36px;
}

.asowp-switch {
  position: relative;
  display: inline-flex;
  width: 40px;
  height: 24px;
  flex: 0 0 auto;
  cursor: pointer;
}

.asowp-switch input {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

.asowp-switch span {
  position: absolute;
  inset: 0;
  border-radius: 999px;
  background: #d5dbe6;
  transition: background 160ms ease;
}

.asowp-switch span::after {
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

.asowp-switch input:checked + span {
  background: #007a76;
}

.asowp-switch input:checked + span::after {
  transform: translateX(16px);
}

.asowp-save-row {
  display: flex;
  justify-content: flex-end;
  margin-top: 18px;
}

.asowp-options-save {
  grid-column: 1 / -1;
}

.asowp-customizer-save {
  min-height: 32px;
  padding: 6px 14px;
  font-size: 13px;
}

.asowp-customizer-save svg {
  width: 14px;
  height: 14px;
}

.asowp-section-menu-wrap {
  position: sticky;
  top: 46px;
  align-self: start;
}

.asowp-section-menu {
  padding: 10px;
}

.asowp-section-menu h2 {
  margin: 0;
  font-size: 14px;
  line-height: 20px;
  font-weight: 650;
}

.asowp-section-menu-links {
  display: grid;
  gap: 8px;
  margin-top: 6px;
}

.asowp-section-menu a {
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

.asowp-section-menu a:hover,
.asowp-section-menu a:focus {
  background: #ffffff;
  color: #111827;
  border-color: #d1d5db;
  box-shadow: none;
  outline: none;
}

.asowp-customizer-loading {
  display: flex;
  min-height: 300px;
  align-items: center;
  justify-content: center;
}

.asowp-customizer-loading img {
  width: 140px;
  height: 140px;
}

.asowp-spin {
  animation: asowp-customizer-spin 800ms linear infinite;
}

@keyframes asowp-customizer-spin {
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 1200px) {
  .asowp-customizer-layout {
    grid-template-columns: 1fr;
  }

  .asowp-section-menu-wrap {
    position: static;
    order: -1;
  }
}

@media (max-width: 782px) {
  .asowp-customizer-hero,
  .asowp-customizer-section {
    padding: 20px;
  }

  .asowp-options-grid {
    grid-template-columns: 1fr;
  }

  .asowp-section-head,
  .asowp-config-option-row {
    flex-direction: column;
    align-items: stretch;
  }
}
</style>
