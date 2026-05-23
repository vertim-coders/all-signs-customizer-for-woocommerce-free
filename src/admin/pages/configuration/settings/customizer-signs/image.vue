<template>
  <section class="asowp-image-settings">
    <header class="asowp-image-header">
      <div>
        <h1>Image Setup</h1>
        <p>Bring image configuration closer to the core flow, while keeping the same classic save location.</p>
      </div>
    </header>

    <SettingSection
      title="Image Access"
      description="Control whether customers can upload or download images in the editor."
    >
      <div class="asowp-image-grid asowp-image-grid-2">
        <ToggleField label="Enable Image" v-model="image.active" class="asowp-image-span-2" />
        <ToggleField label="Enable Download Image" v-model="image.enableDownloadImage" />
        <ToggleField label="Enable upload Image" v-model="image.enableUploadImage" />
      </div>
    </SettingSection>

    <template v-if="image.active">
      <SettingSection
        title="Image Colors"
        description="Manage predefined image colors and the optional custom color preview."
      >
        <div class="asowp-image-stack">
          <div class="asowp-image-field asowp-image-field-sm">
            <label>Label</label>
            <input v-model="image.colorsLabel" type="text" />
          </div>

          <div v-if="image.colors.length" class="asowp-image-color-grid">
            <div v-for="(color, index) in image.colors" :key="`image-color-${index}`" class="asowp-image-color-row">
              <div class="asowp-image-field">
                <label>Name</label>
                <input v-model="color.name" type="text" />
              </div>
              <label class="asowp-image-swatch-field">
                <span>Color</span>
                <input v-model="color.codeHex" type="color" />
              </label>
              <button type="button" class="asowp-image-icon-danger" @click="removeColor(index)" aria-label="Remove color">
                <Trash2Icon :size="15" />
              </button>
            </div>
          </div>

          <button type="button" class="asowp-image-secondary asowp-image-fit" @click="addColor">Add more colors</button>

          <div class="asowp-image-custom-color">
            <ToggleField label="Enable Custom color" v-model="image.enableCustomColor" />
            <div class="asowp-image-upload-field">
              <label>Custom color preview image</label>
              <div class="asowp-image-upload-control">
                <button type="button" class="asowp-image-primary" @click="selectColorPrevImage">upload image</button>
                <div class="asowp-image-upload-preview">
                  <img v-if="image.colorsPrevImg" :src="image.colorsPrevImg" alt="" />
                  <button v-if="image.colorsPrevImg" type="button" @click="image.colorsPrevImg = ''">×</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SettingSection>

      <SettingSection
        title="Upload Script"
        description="Define the upload behavior, size limits and allowed extensions."
      >
        <div class="asowp-image-stack">
          <div class="asowp-image-inline-toggle">
            <strong>Normal</strong>
            <SwitchControl v-model="image.fileUploadScript.customWithGraphical" />
            <strong>Custom with graphical enchacements</strong>
          </div>

          <div>
            <div class="asowp-image-inline-toggle">
              <strong>Restrict uploaded image sizes</strong>
              <span>No</span>
              <SwitchControl v-model="image.fileUploadScript.enableSizeRestriction" />
              <span>Yes</span>
            </div>
            <p class="asowp-image-muted">Enable this to enforce minimum and maximum width on uploaded images.</p>
          </div>

          <div v-if="image.fileUploadScript.enableSizeRestriction" class="asowp-image-grid asowp-image-grid-2">
            <div class="asowp-image-field">
              <label>Upload min width (px)</label>
              <input v-model.number="image.fileUploadScript.uploadMinWidth" type="number" />
            </div>
            <div class="asowp-image-field">
              <label>Upload Max width (px)</label>
              <input v-model.number="image.fileUploadScript.uploadMaxWidth" type="number" />
            </div>
          </div>

          <div class="asowp-image-field">
            <label>Select allow extension</label>
            <div class="asowp-image-token-box">
              <span
                v-for="extension in image.fileUploadScript.allowedUploadsExtentions"
                :key="extension"
                class="asowp-image-token"
              >
                {{ extension.toUpperCase() }}
                <button type="button" @click="removeExtension(extension)">×</button>
              </span>
              <select v-model="selectedExtension" @change="addExtension">
                <option value="">select extension</option>
                <option
                  v-for="extension in extensionOptions"
                  :key="extension.value"
                  :value="extension.value"
                  :disabled="image.fileUploadScript.allowedUploadsExtentions.includes(extension.value)"
                >
                  {{ extension.label }}
                </option>
              </select>
            </div>
          </div>
        </div>
      </SettingSection>

      <SettingSection
        title="Cutlines"
        description="Configure the first and second cutline only when they are enabled."
      >
        <div class="asowp-image-stack">
          <div class="asowp-image-field">
            <label>Cutline Type</label>
            <select v-model="image.selectedCutline">
              <option value="none">none</option>
              <option value="1x">1x</option>
              <option value="2x">2x</option>
            </select>
          </div>

          <div v-if="image.selectedCutline === '1x' || image.selectedCutline === '2x'" class="asowp-image-soft-card">
            <strong>First Cutline</strong>
            <div class="asowp-image-grid asowp-image-grid-2">
              <div class="asowp-image-field">
                <label>Border Size (for print ready file)</label>
                <input v-model.number="image.cutlines.first.borderSize" type="number" />
              </div>
              <label class="asowp-image-swatch-field asowp-image-top-label">
                <span>Color</span>
                <input v-model="image.cutlines.first.color" type="color" />
              </label>
            </div>
          </div>

          <div v-if="image.selectedCutline === '2x'" class="asowp-image-soft-card">
            <strong>Second Cutline</strong>
            <div class="asowp-image-grid asowp-image-grid-2">
              <div class="asowp-image-field">
                <label>Size between Two Cutlines border</label>
                <input v-model.number="image.cutlines.second.size" type="number" />
              </div>
              <label class="asowp-image-swatch-field asowp-image-top-label">
                <span>Color</span>
                <input v-model="image.cutlines.second.color" type="color" />
              </label>
              <div class="asowp-image-field">
                <label>Border Size (for print ready file)</label>
                <input v-model.number="image.cutlines.second.borderSize" type="number" />
              </div>
              <label class="asowp-image-swatch-field asowp-image-top-label">
                <span>Border Color</span>
                <input v-model="image.cutlines.second.borderColor" type="color" />
              </label>
            </div>
          </div>
        </div>
      </SettingSection>

      <SettingSection
        title="Filters"
        description="Control which image effects are available in the editor."
      >
        <div class="asowp-image-stack">
          <div class="asowp-image-inline-toggle">
            <strong>Filter</strong>
            <SwitchControl v-model="image.filter.active" />
          </div>

          <div v-if="image.filter.active" class="asowp-image-filter-row">
            <FilterItem label="Greyscale" v-model="image.filter.enableGreyscale" />
            <FilterItem label="Greenify" v-model="image.filter.enableGreenify" />
            <FilterItem label="Pinkify" v-model="image.filter.enablePinkify" />
            <FilterItem label="Orangeify" v-model="image.filter.enableOrangeify" />
            <FilterItem label="Blueify" v-model="image.filter.enableBlueify" />
            <FilterItem label="Opacity" v-model="image.filter.enableOpacity" />
            <FilterItem label="Blur" v-model="image.filter.enableBlur" />
            <FilterItem label="Sepia" v-model="image.filter.enableSepia" />
            <FilterItem label="sharpen" v-model="image.filter.enableSharpen" />
            <FilterItem label="Emboss" v-model="image.filter.enableEmbross" />
          </div>
        </div>
      </SettingSection>

      <SettingSection
        title="Scenes"
        description="Choose the background scenes used for image preview."
      >
        <div class="asowp-image-stack">
          <div class="asowp-image-actions-left">
            <button type="button" class="asowp-image-primary asowp-image-wide" @click="addImage">Choose scenes</button>
            <button type="button" class="asowp-image-secondary" @click="useDefaultScenes">Use default scenes</button>
          </div>
          <div v-if="image.scenes.length" class="asowp-image-scenes">
            <div v-for="(scene, index) in image.scenes" :key="`${scene}-${index}`" class="asowp-image-scene">
              <img :src="resolveSceneUrl(scene)" alt="" />
              <button type="button" @click="deleteImage(index)">×</button>
            </div>
          </div>
        </div>
      </SettingSection>
    </template>

    <div class="asowp-image-save-row">
      <button type="button" class="asowp-image-primary" :disabled="isLoading" @click="updateImageSettings">
        {{ isLoading ? 'Saving...' : 'Save Image' }}
      </button>
    </div>
  </section>
</template>

<script setup>
import api from '@/admin/Api/api';
import toastMessage from '@/admin/utils/functions';
import { shopifyImageUrl } from '@/admin/utils/shopify-assets';
import { defineComponent, h, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { Trash2Icon } from 'lucide-vue-next';

const props = defineProps({
  data: Object,
  fetchSettings: Function,
});

const route = useRoute();
const configId = ref(route.params.configId);
const isLoading = ref(false);
const selectedExtension = ref('');

const defaultImageSettings = () => ({
  active: true,
  enableUploadImage: true,
  enableDownloadImage: true,
  colorsLabel: 'Image Colors',
  colorsPrevImg: '',
  colors: [],
  enableCustomColor: true,
  fileUploadScript: {
    customWithGraphical: false,
    enableSizeRestriction: false,
    uploadMinWidth: 100,
    uploadMaxWidth: 200,
    allowedUploadsExtentions: ['png'],
  },
  selectedCutline: 'none',
  cutlines: {
    first: { borderSize: 4, color: '#FFF10E' },
    second: {
      color: '#5EEC92',
      size: 10,
      borderColor: '#4A65F9',
      borderSize: 4,
    },
  },
  enableClipart: { active: true, selectedClipartGroups: [] },
  filter: {
    active: true,
    enableGreyscale: false,
    enableOpacity: true,
    enableEmbross: true,
    enableBlur: true,
    enableSepia: true,
    enableSharpen: true,
    enableGreenify: false,
    enablePinkify: false,
    enableOrangeify: false,
    enableBlueify: false,
  },
  scenes: [],
});

const image = ref(defaultImageSettings());

const extensionOptions = [
  { label: 'PNG', value: 'png' },
  { label: 'JPEG', value: 'jpeg' },
  { label: 'SVG', value: 'svg' },
  { label: 'WEBP', value: 'webp' },
  { label: 'GIF', value: 'gif' },
];

const defaultScenes = Array.from(
  { length: 7 },
  (_item, index) => shopifyImageUrl(`aso_default_files/scenes/${index + 1}.webp`),
);

const mergeSettings = (loaded = {}) => {
  const defaults = defaultImageSettings();
  image.value = {
    ...defaults,
    ...loaded,
    active: loaded.active ?? loaded.enableImage ?? defaults.active,
    fileUploadScript: {
      ...defaults.fileUploadScript,
      ...(loaded.fileUploadScript || {}),
      allowedUploadsExtentions: Array.isArray(loaded.fileUploadScript?.allowedUploadsExtentions)
        ? [...new Set(loaded.fileUploadScript.allowedUploadsExtentions)]
        : defaults.fileUploadScript.allowedUploadsExtentions,
    },
    cutlines: {
      first: {
        ...defaults.cutlines.first,
        ...(loaded.cutlines?.first || {}),
      },
      second: {
        ...defaults.cutlines.second,
        ...(loaded.cutlines?.second || {}),
      },
    },
    enableClipart: {
      ...defaults.enableClipart,
      ...(loaded.enableClipart || {}),
    },
    filter: {
      ...defaults.filter,
      ...(loaded.filter || {}),
    },
    colors: Array.isArray(loaded.colors) ? loaded.colors : defaults.colors,
    scenes: Array.isArray(loaded.scenes) ? loaded.scenes : defaults.scenes,
  };
};

watch(() => props.data, (data) => {
  if (data) {
    mergeSettings(data);
  }
}, {
  immediate: true,
});

const addColor = () => {
  image.value.colors.push({ name: '', codeHex: '#FFFFFF' });
};

const removeColor = (index) => {
  image.value.colors.splice(index, 1);
};

const addExtension = () => {
  if (selectedExtension.value && !image.value.fileUploadScript.allowedUploadsExtentions.includes(selectedExtension.value)) {
    image.value.fileUploadScript.allowedUploadsExtentions.push(selectedExtension.value);
  }
  selectedExtension.value = '';
};

const removeExtension = (extension) => {
  image.value.fileUploadScript.allowedUploadsExtentions = image.value.fileUploadScript.allowedUploadsExtentions.filter(
    (item) => item !== extension,
  );
};

const selectColorPrevImage = () => {
  const uploader = wp.media({
    title: 'Upload Image',
    button: { text: 'Use this image' },
    multiple: false,
  });

  uploader.on('select', () => {
    const attachment = uploader.state().get('selection').first().toJSON();
    image.value.colorsPrevImg = attachment.url;
  });

  uploader.open();
};

const addImage = () => {
  const uploader = wp.media({
    title: 'Upload background scenes images',
    button: { text: 'Use selected images' },
    multiple: true,
  });

  uploader.on('select', () => {
    const selection = uploader.state().get('selection').toJSON();
    const nextScenes = selection.map((attachment) => attachment.url).filter(Boolean);
    image.value.scenes = [...new Set([...image.value.scenes, ...nextScenes])];
  });

  uploader.open();
};

const deleteImage = (index) => {
  image.value.scenes.splice(index, 1);
};

const useDefaultScenes = () => {
  image.value.scenes = [...defaultScenes];
};

const resolveSceneUrl = (scene) => {
  if (!scene) return '';
  if (/^(https?:)?\/\//i.test(scene) || String(scene).startsWith('data:')) return scene;
  const normalized = String(scene).replace(/^\/+/, '');
  if (normalized.startsWith('aso_default_files/')) {
    return shopifyImageUrl(normalized);
  }
  return scene;
};

const updateImageSettings = async () => {
  if (isLoading.value) return;
  isLoading.value = true;

  try {
    const result = await api.updateCustomizerSignsImage(configId.value, image.value);
    if (result.success) {
      await props.fetchSettings?.();
      toastMessage('Settings saved successfully', 'success');
    } else {
      toastMessage('An error occurred', 'error');
    }
  } catch (_error) {
    toastMessage('An error occurred', 'error');
  } finally {
    isLoading.value = false;
  }
};

const SwitchControl = defineComponent({
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:modelValue'],
  setup(componentProps, { emit }) {
    return () =>
      h(
        'button',
        {
          type: 'button',
          class: ['asowp-image-switch', { 'is-on': componentProps.modelValue }],
          onClick: () => emit('update:modelValue', !componentProps.modelValue),
        },
        [h('span')],
      );
  },
});

const ToggleField = defineComponent({
  components: { SwitchControl },
  props: {
    label: {
      type: String,
      required: true,
    },
    modelValue: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:modelValue'],
  template: `
    <div class="asowp-image-toggle-field">
      <strong>{{ label }}</strong>
      <div class="asowp-image-toggle-line">
        <span>No</span>
        <SwitchControl :model-value="modelValue" @update:model-value="$emit('update:modelValue', $event)" />
        <span>Yes</span>
      </div>
    </div>
  `,
});

const SettingSection = defineComponent({
  props: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  setup() {
    const isOpen = ref(true);

    return {
      isOpen,
    };
  },
  template: `
    <section class="asowp-image-card">
      <div class="asowp-image-card-head">
        <div>
          <h2>{{ title }}</h2>
          <p>{{ description }}</p>
        </div>
        <button type="button" class="asowp-image-show-btn" @click="isOpen = !isOpen">
          {{ isOpen ? 'Show less ^' : 'Show more v' }}
        </button>
      </div>
      <div v-show="isOpen" class="asowp-image-card-body">
        <slot />
      </div>
    </section>
  `,
});

const FilterItem = defineComponent({
  components: { SwitchControl },
  props: {
    label: {
      type: String,
      required: true,
    },
    modelValue: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:modelValue'],
  template: `
    <div class="asowp-image-filter-item">
      <div class="asowp-image-filter-icon"></div>
      <span>{{ label }}</span>
      <SwitchControl :model-value="modelValue" @update:model-value="$emit('update:modelValue', $event)" />
    </div>
  `,
});
</script>

<style>
.asowp-image-settings {
  display: grid;
  gap: 12px;
  color: #202223;
  font-size: 13px;
}

.asowp-image-header,
.asowp-image-card {
  background: #fff;
  border: 1px solid #d8dee4;
  border-radius: 8px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.08);
}

.asowp-image-header {
  padding: 18px 22px;
}

.asowp-image-header h1,
.asowp-image-card h2 {
  margin: 0;
  color: #303030;
  font-size: 15px;
  font-weight: 800;
  line-height: 1.25;
}

.asowp-image-header h1 {
  font-size: 16px;
}

.asowp-image-header p,
.asowp-image-card p,
.asowp-image-muted {
  margin: 3px 0 0;
  color: #5f6368;
  font-size: 12px;
  line-height: 1.35;
}

.asowp-image-card {
  padding: 16px 22px;
}

.asowp-image-card-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}

.asowp-image-card-body {
  margin-top: 16px;
}

.asowp-image-show-btn,
.asowp-image-secondary,
.asowp-image-primary,
.asowp-image-token button,
.asowp-image-scene button,
.asowp-image-icon-danger {
  appearance: none;
  cursor: pointer;
  font-family: inherit;
}

.asowp-image-show-btn {
  padding: 4px 8px;
  color: #303030;
  background: #fff;
  border: 1px solid #d8dee4;
  border-radius: 6px;
  font-size: 10px;
  font-weight: 600;
}

.asowp-image-grid {
  display: grid;
  gap: 18px;
}

.asowp-image-grid-2 {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.asowp-image-span-2 {
  grid-column: 1 / -1;
}

.asowp-image-stack {
  display: grid;
  gap: 14px;
}

.asowp-image-field,
.asowp-image-upload-field {
  display: grid;
  gap: 5px;
}

.asowp-image-field-sm {
  max-width: 360px;
}

.asowp-image-field label,
.asowp-image-upload-field label,
.asowp-image-swatch-field span {
  color: #303030;
  font-size: 12px;
  font-weight: 500;
}

.asowp-image-field input,
.asowp-image-field select,
.asowp-image-token-box,
.asowp-image-upload-control {
  width: 100%;
  min-height: 34px;
  border: 1px solid #8c9196;
  border-radius: 6px;
  background: #fff;
  color: #303030;
  font-size: 13px;
}

.asowp-image-field input,
.asowp-image-field select {
  padding: 6px 10px;
}

.asowp-image-token-box {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 6px;
  padding: 5px 8px;
}

.asowp-image-token-box select {
  flex: 1 1 160px;
  min-width: 120px;
  min-height: 24px;
  padding: 0;
  border: 0;
  outline: 0;
}

.asowp-image-token {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 2px 7px;
  border-radius: 5px;
  background: #eef1f3;
  color: #303030;
  font-size: 12px;
}

.asowp-image-token button {
  padding: 0;
  border: 0;
  background: transparent;
  color: #5f6368;
  line-height: 1;
}

.asowp-image-toggle-field {
  display: grid;
  gap: 6px;
}

.asowp-image-toggle-field strong,
.asowp-image-inline-toggle strong {
  color: #303030;
  font-size: 12px;
  font-weight: 700;
}

.asowp-image-toggle-line,
.asowp-image-inline-toggle {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #5f6368;
  font-size: 12px;
}

.asowp-image-switch {
  position: relative;
  width: 34px;
  height: 20px;
  padding: 0;
  border: 0;
  border-radius: 999px;
  background: #d8dee8;
  transition: background 0.15s ease;
}

.asowp-image-switch span {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.25);
  transition: transform 0.15s ease;
}

.asowp-image-switch.is-on {
  background: #007a73;
}

.asowp-image-switch.is-on span {
  transform: translateX(14px);
}

.asowp-image-primary,
.asowp-image-secondary {
  min-height: 30px;
  padding: 6px 14px;
  border-radius: 7px;
  font-size: 12px;
  font-weight: 800;
  line-height: 1;
  text-decoration: none;
}

.asowp-image-primary,
.asowp-image-primary:hover,
.asowp-image-primary:focus {
  color: #fff;
  background: #007a73;
  border: 1px solid #006c67;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.25);
}

.asowp-image-primary:disabled {
  cursor: not-allowed;
  background: #d1d1d1;
  border-color: #d1d1d1;
}

.asowp-image-secondary,
.asowp-image-secondary:hover,
.asowp-image-secondary:focus {
  color: #111827;
  background: #fff;
  border: 1px solid #c9cccf;
}

.asowp-image-fit {
  width: fit-content;
}

.asowp-image-wide {
  padding-inline: 28px;
}

.asowp-image-custom-color {
  display: grid;
  grid-template-columns: minmax(0, 220px) minmax(0, 1fr);
  gap: 18px;
  align-items: end;
}

.asowp-image-upload-control {
  display: flex;
  align-items: center;
  overflow: hidden;
  padding: 0 0 0 5px;
}

.asowp-image-upload-preview {
  position: relative;
  margin-left: auto;
  width: 44px;
  height: 30px;
  border-left: 1px solid #e1e3e5;
  background: #fff;
}

.asowp-image-upload-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.asowp-image-upload-preview button,
.asowp-image-scene button {
  position: absolute;
  top: 0;
  right: 0;
  border: 0;
  background: #bf0711;
  color: #fff;
  border-radius: 0 0 0 5px;
}

.asowp-image-color-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px 14px;
}

.asowp-image-color-row {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 42px 24px;
  gap: 8px;
  align-items: end;
}

.asowp-image-swatch-field {
  display: grid;
  gap: 5px;
}

.asowp-image-swatch-field input[type='color'] {
  width: 34px;
  height: 34px;
  padding: 3px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  background: #fff;
}

.asowp-image-top-label {
  align-self: end;
}

.asowp-image-icon-danger {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 34px;
  padding: 0;
  border: 0;
  background: transparent;
  color: #bf0711;
}

.asowp-image-soft-card {
  display: grid;
  gap: 12px;
  padding: 14px;
  border: 1px solid #d8dee4;
  border-radius: 8px;
  background: #fff;
}

.asowp-image-filter-row {
  display: flex;
  flex-wrap: wrap;
  gap: 12px 18px;
  align-items: flex-start;
}

.asowp-image-filter-item {
  display: grid;
  grid-template-columns: 28px auto 34px;
  align-items: center;
  gap: 5px;
  color: #5f6368;
  font-size: 10px;
}

.asowp-image-filter-icon {
  width: 24px;
  height: 24px;
  border: 1px solid #b7c4d4;
  border-radius: 3px;
  background:
    linear-gradient(135deg, transparent 45%, #111 45%, #111 55%, transparent 55%),
    #f8fafc;
}

.asowp-image-actions-left {
  display: flex;
  gap: 8px;
  align-items: center;
}

.asowp-image-scenes {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.asowp-image-scene {
  position: relative;
  width: 74px;
  height: 74px;
  overflow: hidden;
  border: 1px solid #d1d5db;
  border-radius: 8px;
}

.asowp-image-scene img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.asowp-image-save-row {
  display: flex;
  justify-content: flex-end;
  padding-top: 2px;
}

@media (max-width: 900px) {
  .asowp-image-grid-2,
  .asowp-image-custom-color,
  .asowp-image-color-grid {
    grid-template-columns: 1fr;
  }

  .asowp-image-span-2 {
    grid-column: auto;
  }
}
</style>
