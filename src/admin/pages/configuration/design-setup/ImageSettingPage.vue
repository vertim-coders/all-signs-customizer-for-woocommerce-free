<template>
  <section class="ascwo-image-settings">
    <div v-if="isFetching" class="ascwo-editor-setup-loading" aria-live="polite"></div>
    <template v-else>
    <header class="ascwo-image-header">
      <div>
        <h1>Image Setup</h1>
        <p>Bring image configuration closer to the core flow, while keeping the same classic save location.</p>
      </div>
    </header>

    <SettingSection
      title="Image Access"
      description="Control whether customers can upload or download images in the editor."
    >
      <div class="ascwo-image-grid ascwo-image-grid-2">
        <ToggleField label="Enable Image" v-model="image.active" class="ascwo-image-span-2" />
        <ToggleField label="Enable Download Image" v-model="image.enableDownloadImage" />
        <ToggleField label="Enable upload Image" v-model="image.enableUploadImage" />
      </div>
    </SettingSection>

    <template v-if="image.active">
      <SettingSection
        title="Upload Script"
        description="Define the upload behavior, size limits and allowed extensions."
      >
        <div class="ascwo-image-stack">
          <div class="ascwo-image-inline-toggle">
            <strong>Normal</strong>
            <SwitchControl v-model="image.fileUploadScript.customWithGraphical" />
            <strong>Custom with graphical enchacements</strong>
          </div>

          <div>
            <div class="ascwo-image-inline-toggle">
              <strong>Restrict uploaded image sizes</strong>
              <span>No</span>
              <SwitchControl v-model="image.fileUploadScript.enableSizeRestriction" />
              <span>Yes</span>
            </div>
            <p class="ascwo-image-muted">Enable this to enforce minimum and maximum width on uploaded images.</p>
          </div>

          <div v-if="image.fileUploadScript.enableSizeRestriction" class="ascwo-image-grid ascwo-image-grid-2">
            <div class="ascwo-image-field">
              <label>Upload min width (px)</label>
              <input v-model.number="image.fileUploadScript.uploadMinWidth" type="number" />
            </div>
            <div class="ascwo-image-field">
              <label>Upload Max width (px)</label>
              <input v-model.number="image.fileUploadScript.uploadMaxWidth" type="number" />
            </div>
          </div>

          <div class="ascwo-image-field">
            <label>Select allow extension</label>
            <div class="ascwo-image-token-box">
              <span
                v-for="extension in image.fileUploadScript.allowedUploadsExtentions"
                :key="extension"
                class="ascwo-image-token"
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
        title="Scenes"
        description="Choose the background scenes used for image preview."
      >
        <div class="ascwo-image-stack">
          <div class="ascwo-image-actions-left">
            <button type="button" class="ascwo-image-primary ascwo-image-wide" @click="addImage">Choose scenes</button>
            <button type="button" class="ascwo-image-secondary" @click="useDefaultScenes">Use default scenes</button>
          </div>
          <div v-if="image.scenes.length" class="ascwo-image-scenes">
            <div v-for="(scene, index) in image.scenes" :key="`${scene}-${index}`" class="ascwo-image-scene">
              <img :src="resolveSceneUrl(scene)" alt="" />
              <button type="button" @click="deleteImage(index)">×</button>
            </div>
          </div>
        </div>
      </SettingSection>
    </template>

    <div class="ascwo-image-save-row">
      <button type="button" class="ascwo-image-primary" :disabled="isLoading" @click="updateImageSettings">
        {{ isLoading ? 'Saving...' : 'Save Image' }}
      </button>
    </div>
    </template>
  </section>
</template>

<script setup>
import api from '@/admin/Api/api';
import toastMessage from '@/admin/utils/functions';
import { adminImageUrl } from '@/admin/utils/admin-assets';
import { defineComponent, h, onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const props = defineProps({
  data: Object,
  fetchSettings: Function,
});

const route = useRoute();
const configId = ref(route.params.configId);
const isLoading = ref(false);
const isFetching = ref(true);
const selectedExtension = ref('');

const defaultImageSettings = () => ({
  active: true,
  enableUploadImage: true,
  enableDownloadImage: true,
  colorsLabel: 'Image Colors',
  colorsPrevImg: '',
  colors: [],
  enableCustomColor: false,
  fileUploadScript: {
    customWithGraphical: false,
    enableSizeRestriction: false,
    uploadMinWidth: 100,
    uploadMaxWidth: 200,
    allowedUploadsExtentions: ['png'],
  },
  enableClipart: { active: true, selectedClipartGroups: [] },
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
  (_item, index) => adminImageUrl(`aso_default_files/scenes/${index + 1}.webp`),
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
    enableClipart: {
      ...defaults.enableClipart,
      ...(loaded.enableClipart || {}),
    },
    enableCustomColor: false,
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

onMounted(async () => {
  isFetching.value = true;
  try {
    const result = await api.getCustomizerSignsSettings(configId.value);
    if (result && !result.message) {
      mergeSettings(result.images || {});
    }
  } catch (_error) {
    // keep the existing local state if the fetch fails
  } finally {
    isFetching.value = false;
  }
});

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
    return adminImageUrl(normalized);
  }
  return scene;
};

const updateImageSettings = async () => {
  if (isLoading.value) return;
  isLoading.value = true;

  try {
    const payload = {
      ...image.value,
      enableCustomColor: false,
    };
    const result = await api.updateCustomizerSignsImage(configId.value, payload);
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
          class: ['ascwo-image-switch', { 'is-on': componentProps.modelValue }],
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
    <div class="ascwo-image-toggle-field">
      <strong>{{ label }}</strong>
      <div class="ascwo-image-toggle-line">
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
    <section class="ascwo-image-card">
      <div class="ascwo-image-card-head">
        <div>
          <h2>{{ title }}</h2>
          <p>{{ description }}</p>
        </div>
        <button type="button" class="ascwo-image-show-btn" @click="isOpen = !isOpen">
          {{ isOpen ? 'Show less ^' : 'Show more v' }}
        </button>
      </div>
      <div v-show="isOpen" class="ascwo-image-card-body">
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
    <div class="ascwo-image-filter-item">
      <div class="ascwo-image-filter-icon"></div>
      <span>{{ label }}</span>
      <SwitchControl :model-value="modelValue" @update:model-value="$emit('update:modelValue', $event)" />
    </div>
  `,
});
</script>

<style>
.ascwo-image-settings {
  display: grid;
  gap: 12px;
  color: #202223;
  font-size: 13px;
}

.ascwo-image-header,
.ascwo-image-card {
  background: #fff;
  border: 1px solid #d8dee4;
  border-radius: 8px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.08);
}

.ascwo-image-header {
  padding: 18px 22px;
}

.ascwo-image-header h1,
.ascwo-image-card h2 {
  margin: 0;
  color: #303030;
  font-size: 15px;
  font-weight: 800;
  line-height: 1.25;
}

.ascwo-image-header h1 {
  font-size: 16px;
}

.ascwo-image-header p,
.ascwo-image-card p,
.ascwo-image-muted {
  margin: 3px 0 0;
  color: #5f6368;
  font-size: 12px;
  line-height: 1.35;
}

.ascwo-image-card {
  padding: 16px 22px;
}

.ascwo-image-card-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}

.ascwo-image-card-body {
  margin-top: 16px;
}

.ascwo-image-show-btn,
.ascwo-image-secondary,
.ascwo-image-primary,
.ascwo-image-token button,
.ascwo-image-scene button,
.ascwo-image-icon-danger {
  appearance: none;
  cursor: pointer;
  font-family: inherit;
}

.ascwo-image-show-btn {
  padding: 4px 8px;
  color: #303030;
  background: #fff;
  border: 1px solid #d8dee4;
  border-radius: 6px;
  font-size: 10px;
  font-weight: 600;
}

.ascwo-image-grid {
  display: grid;
  gap: 18px;
}

.ascwo-image-grid-2 {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.ascwo-image-span-2 {
  grid-column: 1 / -1;
}

.ascwo-image-stack {
  display: grid;
  gap: 14px;
}

.ascwo-image-field,
.ascwo-image-upload-field {
  display: grid;
  gap: 5px;
}

.ascwo-image-field-sm {
  max-width: 360px;
}

.ascwo-image-field label,
.ascwo-image-upload-field label,
.ascwo-image-swatch-field span {
  color: #303030;
  font-size: 12px;
  font-weight: 500;
}

.ascwo-image-field input,
.ascwo-image-field select,
.ascwo-image-token-box,
.ascwo-image-upload-control {
  width: 100%;
  min-height: 34px;
  border: 1px solid #8c9196;
  border-radius: 6px;
  background: #fff;
  color: #303030;
  font-size: 13px;
}

.ascwo-image-field input,
.ascwo-image-field select {
  padding: 6px 10px;
}

.ascwo-image-token-box {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 6px;
  padding: 5px 8px;
}

.ascwo-image-token-box select {
  flex: 1 1 160px;
  min-width: 120px;
  min-height: 24px;
  padding: 0;
  border: 0;
  outline: 0;
}

.ascwo-image-token {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 2px 7px;
  border-radius: 5px;
  background: #eef1f3;
  color: #303030;
  font-size: 12px;
}

.ascwo-image-token button {
  padding: 0;
  border: 0;
  background: transparent;
  color: #5f6368;
  line-height: 1;
}

.ascwo-image-toggle-field {
  display: grid;
  gap: 6px;
}

.ascwo-image-toggle-field strong,
.ascwo-image-inline-toggle strong {
  color: #303030;
  font-size: 12px;
  font-weight: 700;
}

.ascwo-image-toggle-line,
.ascwo-image-inline-toggle {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #5f6368;
  font-size: 12px;
}

.ascwo-image-switch {
  position: relative;
  width: 34px;
  height: 20px;
  padding: 0;
  border: 0;
  border-radius: 999px;
  background: #d8dee8;
  cursor: pointer;
  transition: background 0.15s ease;
}

.ascwo-image-switch span {
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

.ascwo-image-switch.is-on {
  background: #007a73;
}

.ascwo-image-switch.is-on span {
  transform: translateX(14px);
}

.ascwo-image-primary,
.ascwo-image-secondary {
  min-height: 30px;
  padding: 6px 14px;
  border-radius: 7px;
  font-size: 12px;
  font-weight: 800;
  line-height: 1;
  text-decoration: none;
  cursor: pointer;
}

.ascwo-image-primary,
.ascwo-image-primary:hover,
.ascwo-image-primary:focus {
  color: #fff;
  background: #007a73;
  border: 1px solid #006c67;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.25);
}

.ascwo-image-primary:disabled {
  cursor: not-allowed;
  background: #d1d1d1;
  border-color: #d1d1d1;
}

.ascwo-image-secondary,
.ascwo-image-secondary:hover,
.ascwo-image-secondary:focus {
  color: #111827;
  background: #fff;
  border: 1px solid #c9cccf;
}

.ascwo-image-fit {
  width: fit-content;
}

.ascwo-image-wide {
  padding-inline: 28px;
}

.ascwo-image-custom-color {
  display: grid;
  grid-template-columns: minmax(0, 220px) minmax(0, 1fr);
  gap: 18px;
  align-items: end;
}

.ascwo-image-upload-control {
  display: flex;
  align-items: center;
  overflow: hidden;
  padding: 0 0 0 5px;
}

.ascwo-image-upload-preview {
  position: relative;
  margin-left: auto;
  width: 44px;
  height: 30px;
  border-left: 1px solid #e1e3e5;
  background: #fff;
}

.ascwo-image-upload-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.ascwo-image-upload-preview button,
.ascwo-image-scene button {
  position: absolute;
  top: 0;
  right: 0;
  border: 0;
  background: #bf0711;
  color: #fff;
  border-radius: 0 0 0 5px;
}

.ascwo-image-color-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px 14px;
}

.ascwo-image-color-row {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 42px 24px;
  gap: 8px;
  align-items: end;
}

.ascwo-image-swatch-field {
  display: grid;
  gap: 5px;
}

.ascwo-image-swatch-field input[type='color'] {
  width: 34px;
  height: 34px;
  padding: 3px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  background: #fff;
}

.ascwo-image-top-label {
  align-self: end;
}

.ascwo-image-icon-danger {
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

.ascwo-image-soft-card {
  display: grid;
  gap: 12px;
  padding: 14px;
  border: 1px solid #d8dee4;
  border-radius: 8px;
  background: #fff;
}

.ascwo-image-filter-row {
  display: flex;
  flex-wrap: wrap;
  gap: 12px 18px;
  align-items: flex-start;
}

.ascwo-image-filter-item {
  display: grid;
  grid-template-columns: 28px auto 34px;
  align-items: center;
  gap: 5px;
  color: #5f6368;
  font-size: 10px;
}

.ascwo-image-filter-icon {
  width: 24px;
  height: 24px;
  border: 1px solid #b7c4d4;
  border-radius: 3px;
  background:
    linear-gradient(135deg, transparent 45%, #111 45%, #111 55%, transparent 55%),
    #f8fafc;
}

.ascwo-image-actions-left {
  display: flex;
  gap: 8px;
  align-items: center;
}

.ascwo-image-scenes {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.ascwo-image-scene {
  position: relative;
  width: 74px;
  height: 74px;
  overflow: hidden;
  border: 1px solid #d1d5db;
  border-radius: 8px;
}

.ascwo-image-scene img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.ascwo-image-save-row {
  display: flex;
  justify-content: flex-end;
  padding-top: 2px;
}

@media (max-width: 900px) {
  .ascwo-image-grid-2,
  .ascwo-image-custom-color,
  .ascwo-image-color-grid {
    grid-template-columns: 1fr;
  }

  .ascwo-image-span-2 {
    grid-column: auto;
  }
}
</style>
