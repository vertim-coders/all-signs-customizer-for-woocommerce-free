<template>
  <div class="ascwo-language-setup">
    <div v-if="isFetching" class="ascwo-language-card ascwo-language-loading">
      <img :src="loadingIcon" alt="" />
    </div>

    <div v-else class="ascwo-language-layout">
      <div class="ascwo-language-main">
        <header class="ascwo-language-card ascwo-language-hero">
          <h1>{{ __('Language & Images', 'all-signs-customizer-for-woocommerce') }}</h1>
          <p>{{ __('Configure upload texts, visualizer wording and system images in one page, without switching between legacy child screens.', 'all-signs-customizer-for-woocommerce') }}</p>
        </header>

        <section id="ascwo-language-upload-design" class="ascwo-language-card ascwo-language-section">
          <SectionHead
            :title="__('Upload Design', 'all-signs-customizer-for-woocommerce')"
            :description="__('Texts and help content used for the upload design flow.', 'all-signs-customizer-for-woocommerce')"
            :open="openSections.uploadDesign"
            @toggle="toggleSection('uploadDesign')"
          />

          <div v-show="openSections.uploadDesign" class="ascwo-section-body">
            <div class="ascwo-toggle-block">
              <div>
                <h3>{{ __('Enable custom design link', 'all-signs-customizer-for-woocommerce') }}</h3>
                <p>{{ __('Enable this to display a link redirecting customers to another page on your store for more complex design requests.', 'all-signs-customizer-for-woocommerce') }}</p>
              </div>
              <div class="ascwo-toggle-line">
                <span>{{ __('No', 'all-signs-customizer-for-woocommerce') }}</span>
                <label class="ascwo-switch">
                  <input type="checkbox" v-model="uploadDesign.activate" />
                  <span></span>
                </label>
                <span>{{ __('Yes', 'all-signs-customizer-for-woocommerce') }}</span>
              </div>
            </div>

            <div v-if="uploadDesign.activate" class="ascwo-form-grid ascwo-form-grid-single">
              <label class="ascwo-field">
                <span>{{ __('Custom Design Link', 'all-signs-customizer-for-woocommerce') }}</span>
                <input v-model="uploadDesign.link" type="text" class="ascwo-ui-input" :class="{ 'is-invalid': isUploadDesignLinkInvalid }" />
                <small>{{ isUploadDesignLinkInvalid ? __('Please enter a valid URL starting with http:// or https://.', 'all-signs-customizer-for-woocommerce') : __('URL to redirect customers on your store that will allow for more complex graphic design quote submissions.', 'all-signs-customizer-for-woocommerce') }}</small>
              </label>

              <label class="ascwo-field">
                <span>{{ __('Phrase for link to submit custom design page', 'all-signs-customizer-for-woocommerce') }}</span>
                <input v-model="uploadDesign.phraseSubmitCustom" type="text" class="ascwo-ui-input" />
              </label>
            </div>

            <div class="ascwo-field">
              <span>{{ __('Help content', 'all-signs-customizer-for-woocommerce') }}</span>
              <div class="ascwo-editor-wrap">
                <textarea id="ascwo-language-help-content"></textarea>
              </div>
            </div>

            <SectionSave
              :loading="savingSection === 'uploadDesign'"
              :label="__('Save Upload Design', 'all-signs-customizer-for-woocommerce')"
              @save="saveUploadDesign"
            />
          </div>
        </section>

        <section id="ascwo-language-visualizer" class="ascwo-language-card ascwo-language-section">
          <SectionHead
            :title="__('Visualizer', 'all-signs-customizer-for-woocommerce')"
            :description="__('Texts and labels used inside the visualizer interface.', 'all-signs-customizer-for-woocommerce')"
            :open="openSections.visualizer"
            @toggle="toggleSection('visualizer')"
          />

          <div v-show="openSections.visualizer" class="ascwo-section-body">
            <FieldGroup :title="__('Content Header', 'all-signs-customizer-for-woocommerce')" :fields="visualizerHeaderFields" :values="visualizer" @change="setVisualizerField" />
            <FieldGroup :title="__('Content Text', 'all-signs-customizer-for-woocommerce')" :fields="visualizerContentFields" :values="visualizer" @change="setVisualizerField" />
            <FieldGroup :title="__('Action on selected object in canvas', 'all-signs-customizer-for-woocommerce')" :fields="visualizerCanvasFields" :values="visualizer" @change="setVisualizerField" />
            <FieldGroup :title="__('Content Sidebar', 'all-signs-customizer-for-woocommerce')" :fields="visualizerSidebarFields" :values="visualizer" @change="setVisualizerField" />
            <FieldGroup :title="__('Button Options', 'all-signs-customizer-for-woocommerce')" :fields="visualizerOptionFields" :values="visualizer" @change="setVisualizerField" />

            <SectionSave
              :loading="savingSection === 'visualizer'"
              :label="__('Save Visualizer', 'all-signs-customizer-for-woocommerce')"
              @save="saveVisualizer"
            />
          </div>
        </section>

        <section id="ascwo-language-images" class="ascwo-language-card ascwo-language-section">
          <SectionHead
            :title="__('Images', 'all-signs-customizer-for-woocommerce')"
            :description="__('Icons and system images used across the configurator UI.', 'all-signs-customizer-for-woocommerce')"
            :open="openSections.images"
            @toggle="toggleSection('images')"
          />

          <div v-show="openSections.images" class="ascwo-section-body">
            <ImageGroup :title="__('Custom design link', 'all-signs-customizer-for-woocommerce')" :fields="imageCustomDesignFields" :values="images" @upload="selectImage" @clear="clearImage" />
            <ImageGroup :title="__('Side bar', 'all-signs-customizer-for-woocommerce')" :fields="imageSidebarFields" :values="images" @upload="selectImage" @clear="clearImage" />
            <ImageGroup :title="__('Menu', 'all-signs-customizer-for-woocommerce')" :fields="imageMenuFields" :values="images" @upload="selectImage" @clear="clearImage" />

            <SectionSave
              :loading="savingSection === 'images'"
              :label="__('Save Images', 'all-signs-customizer-for-woocommerce')"
              @save="saveImages"
            />
          </div>
        </section>
      </div>

      <div class="ascwo-section-menu-wrap">
        <aside class="ascwo-section-menu ascwo-language-card">
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
import { computed, defineComponent, h, nextTick, onBeforeUnmount, onMounted, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import { ChevronDownIcon, ChevronUpIcon, Loader2Icon, Trash2Icon } from 'lucide-vue-next';
import api from '@/admin/Api/api';
import toastMessage from '@/admin/utils/functions';
import { __ } from "@wordpress/i18n";

const loadingIcon = `${String(window?.ascwo_data?.assets_url || "").replace(/\/$/, "")}/icons/ic_loading.svg`;

const SectionHead = defineComponent({
  props: {
    title: { type: String, required: true },
    description: { type: String, required: true },
    open: { type: Boolean, required: true },
  },
  emits: ['toggle'],
  setup(props, { emit }) {
    return () => h('div', { class: 'ascwo-section-head' }, [
      h('div', null, [
        h('h2', props.title),
        h('p', props.description),
      ]),
      h('button', { type: 'button', class: 'ascwo-collapse-button', onClick: () => emit('toggle') }, [
        props.open ? __('Show less', 'all-signs-customizer-for-woocommerce') : __('Show more', 'all-signs-customizer-for-woocommerce'),
        h(props.open ? ChevronUpIcon : ChevronDownIcon),
      ]),
    ]);
  },
});

const SectionSave = defineComponent({
  props: {
    label: { type: String, required: true },
    loading: { type: Boolean, default: false },
  },
  emits: ['save'],
  setup(props, { emit }) {
    return () => h('div', { class: 'ascwo-save-row' }, [
      h('button', { type: 'button', disabled: props.loading, class: 'ascwo-ui-button-primary ascwo-language-save', onClick: () => emit('save') }, [
        props.loading ? h(Loader2Icon, { class: 'ascwo-spin' }) : null,
        props.label,
      ]),
    ]);
  },
});

const FieldGroup = defineComponent({
  props: {
    title: { type: String, required: true },
    fields: { type: Array, required: true },
    values: { type: Object, required: true },
  },
  emits: ['change'],
  setup(props, { emit }) {
    return () => h('div', { class: 'ascwo-field-group' }, [
      h('h3', props.title),
      h('div', { class: 'ascwo-form-grid' }, props.fields.map((field) => h('label', { class: 'ascwo-field', key: field.key }, [
        h('span', field.label),
        h('input', {
          class: 'ascwo-ui-input',
          type: 'text',
          value: props.values[field.key] || '',
          onInput: (event) => emit('change', field.key, event.target.value),
        }),
      ]))),
    ]);
  },
});

const ImageGroup = defineComponent({
  props: {
    title: { type: String, required: true },
    fields: { type: Array, required: true },
    values: { type: Object, required: true },
  },
  emits: ['upload', 'clear'],
  setup(props, { emit }) {
    return () => h('div', { class: 'ascwo-field-group ascwo-image-group' }, [
      h('h3', props.title),
      h('div', { class: 'ascwo-image-grid' }, props.fields.map((field) => h('div', { class: 'ascwo-image-field', key: field.key }, [
        h('span', field.title),
        h('div', { class: 'ascwo-image-control' }, [
          h('button', { type: 'button', class: 'ascwo-upload-button', onClick: () => emit('upload', field.key) }, __('Upload icon', 'all-signs-customizer-for-woocommerce')),
          h('div', { class: 'ascwo-image-preview' }, [
            props.values[field.key] ? h('img', { src: props.values[field.key], alt: '' }) : null,
            props.values[field.key] ? h('button', { type: 'button', class: 'ascwo-image-clear', onClick: () => emit('clear', field.key), 'aria-label': __('Remove image', 'all-signs-customizer-for-woocommerce') }, [h(Trash2Icon)]) : null,
          ]),
        ]),
      ]))),
    ]);
  },
});

const route = useRoute();
const configId = ref(route.params.configId);
const isFetching = ref(false);
const savingSection = ref('');

const defaultUploadDesign = () => ({
  activate: false,
  link: '',
  phraseSubmitCustom: 'Take a customization',
  helpContent: '',
});

const defaultVisualizer = () => ({
  textCanvasCenterH: 'Center H',
  textCanvasCenterV: 'Center V',
  textCanvasDelete: 'Delete',
  textCanvasEdit: 'Edit',
  textCanvasClone: 'Clone',
  textPosition: 'Position',
  textAngle: 'Angle',
  textWidth: 'Width',
  textHeight: 'Height',
  textRight: 'Right',
  textLeft: 'Left',
  textTop: 'Top',
  textBottom: 'Bottom',
  titleHeader: 'Plastic Signs',
  textButtonRefresh: 'Restart all',
  textButtonBack: 'Undo',
  textButtonNext: 'Redo',
  textBeforePrice: '',
  textAfterPrice: 'VAT Included',
  textButtonFinish: 'Finish',
  textAddToCart: 'Add To Cart',
  textPreview: 'Preview',
  textShare: 'Share',
  textImport: 'Import',
  textDownload: 'Download',
  textSave: 'Save',
  textHelp: 'Help',
  textMaterial: 'Material',
  textSize: 'Size',
  textShape: 'Shape',
  textFixingMethods: 'Fixing Methods',
  textColor: 'Color',
  textOptionText: 'Text',
  textBorder: 'Border',
  textProduct: 'Product',
  textImage: 'Image',
  phraseImageSizeRestrictionError: 'The image size must be between',
  customSize: 'Custom Size',
  customSizeButtonDone: 'Done',
  thickness: 'Thickness',
  textAdditonnalOptionsHeader: 'Additional Options',
  textButtonAdditonnalOptions: 'Add Option',
});

const defaultImages = () => ({
  resetAllIcon: '',
  undoIcon: '',
  redoIcon: '',
  cancelAnAction: '',
  changeIconHelp: '',
  changeIconPreview: '',
  changeIconImport: '',
  changeIconShare: '',
  changeIconSaveProject: '',
  changeIconShareSideBar: '',
  changeIconMaterial: '',
  changeIconShape: '',
  changeIconFixingMethod: '',
  changeIconProduct: '',
  changeIconSize: '',
  changeIconText: '',
  changeIconColor: '',
  changeIconDownload: '',
  changeIconBorder: '',
  changeIconImage: '',
});

const uploadDesign = ref(defaultUploadDesign());
const visualizer = ref(defaultVisualizer());
const images = ref(defaultImages());
const openSections = reactive({
  uploadDesign: true,
  visualizer: true,
  images: true,
});

const sectionMenu = [
  { id: 'ascwo-language-upload-design', label: 'Upload Design' },
  { id: 'ascwo-language-visualizer', label: 'Visualizer' },
  { id: 'ascwo-language-images', label: 'Images' },
];

const visualizerHeaderFields = [
  { key: 'titleHeader', label: 'Title header' },
  { key: 'textButtonRefresh', label: 'Text button refresh' },
  { key: 'textButtonBack', label: 'Text button back' },
  { key: 'textButtonNext', label: 'Text button next' },
  { key: 'textBeforePrice', label: 'Text before price' },
  { key: 'textAfterPrice', label: 'Text after price' },
  { key: 'textButtonFinish', label: 'Text button finish' },
  { key: 'textAddToCart', label: 'Text button Add to cart' },
];

const visualizerContentFields = [
  { key: 'textWidth', label: 'Text width' },
  { key: 'textHeight', label: 'Text height' },
  { key: 'textPosition', label: 'Text position' },
  { key: 'textAngle', label: 'Text angle' },
  { key: 'textTop', label: 'Text top' },
  { key: 'textBottom', label: 'Text bottom' },
  { key: 'textLeft', label: 'Text left' },
  { key: 'textRight', label: 'Text right' },
];

const visualizerCanvasFields = [
  { key: 'textCanvasEdit', label: 'Canvas selected object edit button' },
  { key: 'textCanvasDelete', label: 'Canvas selected object delete button' },
  { key: 'textCanvasCenterH', label: 'Canvas selected object centerH button' },
  { key: 'textCanvasCenterV', label: 'Canvas selected object centerV button' },
  { key: 'textCanvasClone', label: 'Canvas selected object clone button' },
];

const visualizerSidebarFields = [
  { key: 'textPreview', label: 'Preview text' },
  { key: 'textShare', label: 'Share text' },
  { key: 'textImport', label: 'Import text' },
  { key: 'textDownload', label: 'Download text' },
  { key: 'textSave', label: 'Save text' },
  { key: 'textHelp', label: 'Help text' },
];

const visualizerOptionFields = [
  { key: 'textMaterial', label: 'Text material' },
  { key: 'textSize', label: 'Text size' },
  { key: 'customSize', label: 'Text custom size' },
  { key: 'customSizeButtonDone', label: 'Text custom size button done' },
  { key: 'thickness', label: 'Text thickness' },
  { key: 'textShape', label: 'Text shape' },
  { key: 'textFixingMethods', label: 'Text fixing methods' },
  { key: 'textColor', label: 'Text color' },
  { key: 'textOptionText', label: 'Text option text' },
  { key: 'textBorder', label: 'Text border' },
  { key: 'textProduct', label: 'Text product' },
  { key: 'textImage', label: 'Text image' },
  { key: 'phraseImageSizeRestrictionError', label: 'Error message for image size restriction' },
  { key: 'textButtonAdditonnalOptions', label: 'Text additonnal options' },
  { key: 'textAdditonnalOptionsHeader', label: 'Text additonnal options header' },
];

const imageCustomDesignFields = [
  { key: 'resetAllIcon', title: 'Reset All' },
  { key: 'undoIcon', title: 'Change Undo icon' },
  { key: 'redoIcon', title: 'Change Redo icon' },
];

const imageSidebarFields = [
  { key: 'changeIconPreview', title: 'Change Icon preview' },
  { key: 'changeIconHelp', title: 'Change help icon' },
  { key: 'changeIconImport', title: 'Change Icon Import' },
  { key: 'changeIconShare', title: 'Change Icon share' },
  { key: 'changeIconSaveProject', title: 'Change Icon save project' },
  { key: 'changeIconShareSideBar', title: 'Change Icon Share Side bar' },
];

const imageMenuFields = [
  { key: 'changeIconMaterial', title: 'Change Icon Material' },
  { key: 'changeIconShape', title: 'Change Icon shape' },
  { key: 'changeIconFixingMethod', title: 'Change Icon fixing method' },
  { key: 'changeIconProduct', title: 'Change Icon Product' },
  { key: 'changeIconDownload', title: 'Change download' },
  { key: 'changeIconText', title: 'Change Icon Text' },
  { key: 'changeIconColor', title: 'Change Icon color' },
  { key: 'changeIconSize', title: 'Change Icon size' },
  { key: 'changeIconBorder', title: 'Change Icon border' },
  { key: 'changeIconImage', title: 'Change Icon image' },
];

const isUploadDesignLinkInvalid = computed(() => {
  if (!uploadDesign.value.activate) return false;
  const value = String(uploadDesign.value.link || '').trim();
  if (!value) return true;

  try {
    const parsed = new URL(value);
    return parsed.protocol !== 'http:' && parsed.protocol !== 'https:';
  } catch {
    return true;
  }
});

const normalizeBoolean = (value) => value === true || value === 1 || value === '1' || value === 'true' || value === 'yes';

const normalizeUploadDesign = (raw = {}) => ({
  ...defaultUploadDesign(),
  ...raw,
  activate: normalizeBoolean(raw.activate),
});

const fetchLanguageImageSettings = async () => {
  const result = await api.getLanguageImagesSettings(configId.value);
  if (result?.message) return;

  uploadDesign.value = normalizeUploadDesign(result.uploadDesign || {});
  visualizer.value = { ...defaultVisualizer(), ...(result.visualizer || result.main || {}) };
  images.value = { ...defaultImages(), ...(result.images || {}) };

  await nextTick();
  setTinyMCEContent(uploadDesign.value.helpContent);
};

const toggleSection = (key) => {
  openSections[key] = !openSections[key];
};

const scrollToSection = (id) => {
  window.requestAnimationFrame(() => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
};

const setVisualizerField = (key, value) => {
  visualizer.value = { ...visualizer.value, [key]: value };
};

const getTinyMCE = () => window.tinymce ?? null;
const getTinyMCEEditor = () => getTinyMCE()?.get('ascwo-language-help-content') ?? null;
const setTinyMCEContent = (content = '') => {
  getTinyMCEEditor()?.setContent(content || '');
};
const getTinyMCEContent = () => getTinyMCEEditor()?.getContent() ?? uploadDesign.value.helpContent ?? '';
const destroyTinyMCE = () => {
  getTinyMCEEditor()?.remove();
};
const initTinyMCE = (content = '') => {
  const editorApi = getTinyMCE();
  if (!editorApi) return;

  const existingEditor = getTinyMCEEditor();
  if (existingEditor) {
    existingEditor.setContent(content || '');
    return;
  }

  editorApi.init({
    selector: '#ascwo-language-help-content',
    plugins: 'wordpress paste link image media',
    toolbar: 'undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image media | code | wp_adv',
    relative_urls: false,
    remove_script_host: false,
    convert_urls: true,
    height: 230,
    width: '100%',
    branding: false,
    setup(editor) {
      editor.on('init', () => {
        editor.setContent(content || '');
      });
    },
  });
};

const handleSaveResponse = async (result) => {
  if (result?.success) {
    await fetchLanguageImageSettings();
    toastMessage(result.message, result.success === true ? 'success' : 'warning');
    return;
  }

  toastMessage(result?.message || __('Unable to save settings', 'all-signs-customizer-for-woocommerce'), 'error');
};

const saveUploadDesign = async () => {
  if (isUploadDesignLinkInvalid.value) {
    toastMessage(__('Please enter a valid custom design link.', 'all-signs-customizer-for-woocommerce'), 'error');
    return;
  }

  savingSection.value = 'uploadDesign';
  uploadDesign.value.helpContent = getTinyMCEContent();
  try {
    await handleSaveResponse(await api.updateLanguageImagesUploadDesign(configId.value, uploadDesign.value));
  } catch (error) {
    toastMessage(error?.response?.data?.message || __('Unable to save upload design settings', 'all-signs-customizer-for-woocommerce'), 'error');
  } finally {
    savingSection.value = '';
  }
};

const saveVisualizer = async () => {
  savingSection.value = 'visualizer';
  try {
    await handleSaveResponse(await api.updateLanguageImagesVisualizer(configId.value, visualizer.value));
  } catch (error) {
    toastMessage(error?.response?.data?.message || __('Unable to save visualizer settings', 'all-signs-customizer-for-woocommerce'), 'error');
  } finally {
    savingSection.value = '';
  }
};

const saveImages = async () => {
  savingSection.value = 'images';
  try {
    await handleSaveResponse(await api.updateLanguageImagesImgs(configId.value, images.value));
  } catch (error) {
    toastMessage(error?.response?.data?.message || __('Unable to save image settings', 'all-signs-customizer-for-woocommerce'), 'error');
  } finally {
    savingSection.value = '';
  }
};

const selectImage = (key) => {
  if (!window.wp?.media) {
    toastMessage(__('WordPress media library is not available.', 'all-signs-customizer-for-woocommerce'), 'error');
    return;
  }

  const uploader = window.wp.media({
    title: __('Select Image', 'all-signs-customizer-for-woocommerce'),
    button: { text: __('Select Image', 'all-signs-customizer-for-woocommerce') },
    multiple: false,
  });

  uploader.on('select', () => {
    const attachment = uploader.state().get('selection').first()?.toJSON();
    if (attachment?.type === 'image') {
      images.value = { ...images.value, [key]: attachment.url };
    }
  });

  uploader.open();
};

const clearImage = (key) => {
  images.value = { ...images.value, [key]: '' };
};

onMounted(async () => {
  isFetching.value = true;
  try {
    await fetchLanguageImageSettings();
  } finally {
    isFetching.value = false;
    await nextTick();
    initTinyMCE(uploadDesign.value.helpContent);
  }
});

onBeforeUnmount(() => {
  destroyTinyMCE();
});
</script>

<style>
.ascwo-language-setup {
  color: var(--ascwo-ui-text);
}

.ascwo-language-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 220px;
  gap: 20px;
  align-items: start;
}

.ascwo-language-main {
  display: grid;
  gap: 16px;
  min-width: 0;
}

.ascwo-language-card {
  background: var(--ascwo-ui-surface);
  border: 1px solid var(--ascwo-ui-border);
  border-radius: var(--ascwo-ui-radius-card);
  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.08);
}

.ascwo-language-hero {
  padding: 16px 20px;
}

.ascwo-language-hero h1,
.ascwo-language-section h2,
.ascwo-section-menu h2 {
  margin: 0;
  color: #303030;
  font-weight: 750;
  letter-spacing: 0;
}

.ascwo-language-hero h1 {
  font-size: 22px;
  line-height: 28px;
}

.ascwo-language-hero p,
.ascwo-section-head p,
.ascwo-toggle-block p,
.ascwo-field small {
  margin: 6px 0 0;
  color: #616161;
  font-size: 14px;
  line-height: 22px;
}

.ascwo-language-section {
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

.ascwo-language-section h2 {
  font-size: 17px;
  line-height: 24px;
}

.ascwo-section-body {
  display: grid;
  gap: 16px;
}

.ascwo-collapse-button {
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
.ascwo-collapse-button:focus {
  background: #ffffff;
  color: #202223;
  border-color: #babfc3;
  box-shadow: none;
  outline: none;
}

.ascwo-collapse-button svg {
  width: 15px;
  height: 15px;
}

.ascwo-toggle-block,
.ascwo-field-group {
  padding: 16px;
  border: 1px solid #dfe3e8;
  border-radius: 10px;
  background: #ffffff;
}

.ascwo-toggle-block {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  align-items: flex-start;
}

.ascwo-toggle-block h3,
.ascwo-field-group h3 {
  margin: 0 0 12px;
  color: #303030;
  font-size: 13px;
  line-height: 18px;
  font-weight: 750;
}

.ascwo-toggle-line {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #616161;
  font-size: 13px;
}

.ascwo-form-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  column-gap: 20px;
  row-gap: 14px;
}

.ascwo-form-grid-single {
  grid-template-columns: 1fr;
}

.ascwo-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.ascwo-field > span,
.ascwo-image-field > span {
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

.ascwo-ui-input.is-invalid {
  border-color: #d72c0d;
}

.ascwo-editor-wrap {
  overflow: hidden;
  border: 1px solid #dfe3e8;
  border-radius: 10px;
  background: #ffffff;
}

.ascwo-editor-wrap .mce-toolbar .mce-btn,
.ascwo-editor-wrap .mce-toolbar .mce-btn:hover,
.ascwo-editor-wrap .mce-toolbar .mce-btn:focus,
.ascwo-editor-wrap .mce-toolbar .mce-btn:active,
.ascwo-editor-wrap .mce-toolbar .mce-btn.mce-active,
.ascwo-editor-wrap .mce-toolbar .mce-btn.mce-active:hover,
.ascwo-editor-wrap .mce-toolbar .mce-btn.mce-active:focus {
  background: transparent !important;
  border-color: transparent !important;
  box-shadow: none !important;
  outline: none !important;
}

.ascwo-editor-wrap .mce-toolbar .mce-btn button,
.ascwo-editor-wrap .mce-toolbar .mce-btn button:hover,
.ascwo-editor-wrap .mce-toolbar .mce-btn button:focus,
.ascwo-editor-wrap .mce-toolbar .mce-btn button:active {
  min-width: 28px !important;
  height: 28px !important;
  padding: 4px 6px !important;
  background: transparent !important;
  border: 0 !important;
  border-radius: 3px !important;
  box-shadow: none !important;
  outline: none !important;
}

.ascwo-editor-wrap .mce-toolbar .mce-btn:hover button,
.ascwo-editor-wrap .mce-toolbar .mce-btn:focus button {
  background: #eef2f7 !important;
}

.ascwo-editor-wrap .mce-toolbar .mce-btn.mce-active button,
.ascwo-editor-wrap .mce-toolbar .mce-btn button[aria-pressed="true"] {
  background: #acd0f5 !important;
  color: #111827 !important;
  box-shadow: none !important;
}

.ascwo-editor-wrap .mce-toolbar .mce-btn i,
.ascwo-editor-wrap .mce-toolbar .mce-btn .mce-ico {
  color: #1f2937 !important;
  text-shadow: none !important;
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

.ascwo-image-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px 18px;
}

.ascwo-image-field {
  display: grid;
  gap: 6px;
}

.ascwo-image-control {
  display: grid;
  grid-template-columns: minmax(116px, auto) 42px;
  gap: 0;
  align-items: center;
  width: 218px;
  min-height: 46px;
  padding: 4px;
  border: 1px solid #202223;
  border-radius: 5px;
  background: #ffffff;
  box-sizing: border-box;
}

.ascwo-upload-button {
  width: fit-content !important;
  min-width: 116px;
  min-height: 34px;
  padding: 6px 14px;
  border: 1px solid #005c5c;
  border-radius: 7px;
  background: #007a76;
  color: #ffffff;
  font-size: 13px;
  line-height: 16px;
  font-weight: 700;
  cursor: pointer;
  white-space: nowrap;
  box-shadow: none;
}

.ascwo-upload-button:hover,
.ascwo-upload-button:focus {
  background: #007a76;
  color: #ffffff;
  border-color: #005c5c;
  box-shadow: none;
  outline: none;
}

.ascwo-image-preview {
  position: relative;
  justify-self: end;
  width: 42px;
  height: 42px;
  overflow: hidden;
  border: 1px solid #e1e3e5;
  border-radius: 8px;
  background: #ffffff;
  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.05);
}

.ascwo-image-preview img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.ascwo-image-clear {
  position: absolute;
  right: 0;
  bottom: 0;
  display: inline-flex;
  width: 22px;
  height: 22px;
  align-items: center;
  justify-content: center;
  border: 0;
  border-radius: 6px 0 0 0;
  background: #007a76;
  color: #ffffff;
  cursor: pointer;
}

.ascwo-image-clear svg {
  width: 13px;
  height: 13px;
}

.ascwo-save-row {
  display: flex;
  justify-content: flex-end;
  margin-top: 2px;
}

.ascwo-language-save {
  min-height: 32px;
  padding: 6px 14px;
  font-size: 13px;
}

.ascwo-language-save svg {
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

.ascwo-language-loading {
  display: flex;
  min-height: 300px;
  align-items: center;
  justify-content: center;
}

.ascwo-language-loading img {
  width: 140px;
  height: 140px;
}

.ascwo-spin {
  animation: ascwo-language-spin 800ms linear infinite;
}

@keyframes ascwo-language-spin {
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 1200px) {
  .ascwo-language-layout {
    grid-template-columns: 1fr;
  }

  .ascwo-section-menu-wrap {
    position: static;
    order: -1;
  }
}

@media (max-width: 782px) {
  .ascwo-language-hero,
  .ascwo-language-section {
    padding: 20px;
  }

  .ascwo-section-head,
  .ascwo-toggle-block {
    flex-direction: column;
    align-items: stretch;
  }

  .ascwo-form-grid,
  .ascwo-image-grid {
    grid-template-columns: 1fr;
  }
}
</style>
