<template>
  <div class="asowp-language-setup">
    <div v-if="isFetching" class="asowp-language-card asowp-language-loading">
      <img src="../../../../../../assets/icons/ic_loading.svg" alt="" />
    </div>

    <div v-else class="asowp-language-layout">
      <div class="asowp-language-main">
        <header class="asowp-language-card asowp-language-hero">
          <h1>{{ __('Language & Images', 'all-signs-options-pro') }}</h1>
          <p>{{ __('Configure upload texts, visualizer wording and system images in one page, without switching between legacy child screens.', 'all-signs-options-pro') }}</p>
        </header>

        <section id="asowp-language-upload-design" class="asowp-language-card asowp-language-section">
          <SectionHead
            :title="__('Upload Design', 'all-signs-options-pro')"
            :description="__('Texts and help content used for the upload design flow.', 'all-signs-options-pro')"
            :open="openSections.uploadDesign"
            @toggle="toggleSection('uploadDesign')"
          />

          <div v-show="openSections.uploadDesign" class="asowp-section-body">
            <div class="asowp-toggle-block">
              <div>
                <h3>{{ __('Enable custom design link', 'all-signs-options-pro') }}</h3>
                <p>{{ __('Enable this to display a link redirecting customers to another page on your store for more complex design requests.', 'all-signs-options-pro') }}</p>
              </div>
              <div class="asowp-toggle-line">
                <span>{{ __('No', 'all-signs-options-pro') }}</span>
                <label class="asowp-switch">
                  <input type="checkbox" v-model="uploadDesign.activate" />
                  <span></span>
                </label>
                <span>{{ __('Yes', 'all-signs-options-pro') }}</span>
              </div>
            </div>

            <div v-if="uploadDesign.activate" class="asowp-form-grid asowp-form-grid-single">
              <label class="asowp-field">
                <span>{{ __('Custom Design Link', 'all-signs-options-pro') }}</span>
                <input v-model="uploadDesign.link" type="text" class="asowp-shopify-input" :class="{ 'is-invalid': isUploadDesignLinkInvalid }" />
                <small>{{ isUploadDesignLinkInvalid ? __('Please enter a valid URL starting with http:// or https://.', 'all-signs-options-pro') : __('URL to redirect customers on your store that will allow for more complex graphic design quote submissions.', 'all-signs-options-pro') }}</small>
              </label>

              <label class="asowp-field">
                <span>{{ __('Phrase for link to submit custom design page', 'all-signs-options-pro') }}</span>
                <input v-model="uploadDesign.phraseSubmitCustom" type="text" class="asowp-shopify-input" />
              </label>
            </div>

            <div class="asowp-field">
              <span>{{ __('Help content', 'all-signs-options-pro') }}</span>
              <div class="asowp-editor-wrap">
                <textarea id="asowp-language-help-content"></textarea>
              </div>
            </div>

            <SectionSave
              :loading="savingSection === 'uploadDesign'"
              :label="__('Save Upload Design', 'all-signs-options-pro')"
              @save="saveUploadDesign"
            />
          </div>
        </section>

        <section id="asowp-language-visualizer" class="asowp-language-card asowp-language-section">
          <SectionHead
            :title="__('Visualizer', 'all-signs-options-pro')"
            :description="__('Texts and labels used inside the visualizer interface.', 'all-signs-options-pro')"
            :open="openSections.visualizer"
            @toggle="toggleSection('visualizer')"
          />

          <div v-show="openSections.visualizer" class="asowp-section-body">
            <FieldGroup :title="__('Content Header', 'all-signs-options-pro')" :fields="visualizerHeaderFields" :values="visualizer" @change="setVisualizerField" />
            <FieldGroup :title="__('Content Text', 'all-signs-options-pro')" :fields="visualizerContentFields" :values="visualizer" @change="setVisualizerField" />
            <FieldGroup :title="__('Action on selected object in canvas', 'all-signs-options-pro')" :fields="visualizerCanvasFields" :values="visualizer" @change="setVisualizerField" />
            <FieldGroup :title="__('Content Sidebar', 'all-signs-options-pro')" :fields="visualizerSidebarFields" :values="visualizer" @change="setVisualizerField" />
            <FieldGroup :title="__('Button Options', 'all-signs-options-pro')" :fields="visualizerOptionFields" :values="visualizer" @change="setVisualizerField" />

            <SectionSave
              :loading="savingSection === 'visualizer'"
              :label="__('Save Visualizer', 'all-signs-options-pro')"
              @save="saveVisualizer"
            />
          </div>
        </section>

        <section id="asowp-language-images" class="asowp-language-card asowp-language-section">
          <SectionHead
            :title="__('Images', 'all-signs-options-pro')"
            :description="__('Icons and system images used across the configurator UI.', 'all-signs-options-pro')"
            :open="openSections.images"
            @toggle="toggleSection('images')"
          />

          <div v-show="openSections.images" class="asowp-section-body">
            <ImageGroup :title="__('Custom design link', 'all-signs-options-pro')" :fields="imageCustomDesignFields" :values="images" @upload="selectImage" @clear="clearImage" />
            <ImageGroup :title="__('Side bar', 'all-signs-options-pro')" :fields="imageSidebarFields" :values="images" @upload="selectImage" @clear="clearImage" />
            <ImageGroup :title="__('Menu', 'all-signs-options-pro')" :fields="imageMenuFields" :values="images" @upload="selectImage" @clear="clearImage" />

            <SectionSave
              :loading="savingSection === 'images'"
              :label="__('Save Images', 'all-signs-options-pro')"
              @save="saveImages"
            />
          </div>
        </section>
      </div>

      <div class="asowp-section-menu-wrap">
        <aside class="asowp-section-menu asowp-language-card">
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
import { computed, defineComponent, h, nextTick, onBeforeUnmount, onMounted, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import { ChevronDownIcon, ChevronUpIcon, Loader2Icon, Trash2Icon } from 'lucide-vue-next';
import api from '@/admin/Api/api';
import toastMessage from '@/admin/utils/functions';
import { __ } from "@wordpress/i18n";

const SectionHead = defineComponent({
  props: {
    title: { type: String, required: true },
    description: { type: String, required: true },
    open: { type: Boolean, required: true },
  },
  emits: ['toggle'],
  setup(props, { emit }) {
    return () => h('div', { class: 'asowp-section-head' }, [
      h('div', null, [
        h('h2', props.title),
        h('p', props.description),
      ]),
      h('button', { type: 'button', class: 'asowp-collapse-button', onClick: () => emit('toggle') }, [
        props.open ? __('Show less', 'all-signs-options-pro') : __('Show more', 'all-signs-options-pro'),
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
    return () => h('div', { class: 'asowp-save-row' }, [
      h('button', { type: 'button', disabled: props.loading, class: 'asowp-shopify-button-primary asowp-language-save', onClick: () => emit('save') }, [
        props.loading ? h(Loader2Icon, { class: 'asowp-spin' }) : null,
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
    return () => h('div', { class: 'asowp-field-group' }, [
      h('h3', props.title),
      h('div', { class: 'asowp-form-grid' }, props.fields.map((field) => h('label', { class: 'asowp-field', key: field.key }, [
        h('span', field.label),
        h('input', {
          class: 'asowp-shopify-input',
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
    return () => h('div', { class: 'asowp-field-group asowp-image-group' }, [
      h('h3', props.title),
      h('div', { class: 'asowp-image-grid' }, props.fields.map((field) => h('div', { class: 'asowp-image-field', key: field.key }, [
        h('span', field.title),
        h('div', { class: 'asowp-image-control' }, [
          h('button', { type: 'button', class: 'asowp-upload-button', onClick: () => emit('upload', field.key) }, __('Upload icon', 'all-signs-options-pro')),
          h('div', { class: 'asowp-image-preview' }, [
            props.values[field.key] ? h('img', { src: props.values[field.key], alt: '' }) : null,
            props.values[field.key] ? h('button', { type: 'button', class: 'asowp-image-clear', onClick: () => emit('clear', field.key), 'aria-label': __('Remove image', 'all-signs-options-pro') }, [h(Trash2Icon)]) : null,
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
  { id: 'asowp-language-upload-design', label: 'Upload Design' },
  { id: 'asowp-language-visualizer', label: 'Visualizer' },
  { id: 'asowp-language-images', label: 'Images' },
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
const getTinyMCEEditor = () => getTinyMCE()?.get('asowp-language-help-content') ?? null;
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
    selector: '#asowp-language-help-content',
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

  toastMessage(result?.message || __('Unable to save settings', 'all-signs-options-pro'), 'error');
};

const saveUploadDesign = async () => {
  if (isUploadDesignLinkInvalid.value) {
    toastMessage(__('Please enter a valid custom design link.', 'all-signs-options-pro'), 'error');
    return;
  }

  savingSection.value = 'uploadDesign';
  uploadDesign.value.helpContent = getTinyMCEContent();
  try {
    await handleSaveResponse(await api.updateLanguageImagesUploadDesign(configId.value, uploadDesign.value));
  } catch (error) {
    toastMessage(error?.response?.data?.message || __('Unable to save upload design settings', 'all-signs-options-pro'), 'error');
  } finally {
    savingSection.value = '';
  }
};

const saveVisualizer = async () => {
  savingSection.value = 'visualizer';
  try {
    await handleSaveResponse(await api.updateLanguageImagesVisualizer(configId.value, visualizer.value));
  } catch (error) {
    toastMessage(error?.response?.data?.message || __('Unable to save visualizer settings', 'all-signs-options-pro'), 'error');
  } finally {
    savingSection.value = '';
  }
};

const saveImages = async () => {
  savingSection.value = 'images';
  try {
    await handleSaveResponse(await api.updateLanguageImagesImgs(configId.value, images.value));
  } catch (error) {
    toastMessage(error?.response?.data?.message || __('Unable to save image settings', 'all-signs-options-pro'), 'error');
  } finally {
    savingSection.value = '';
  }
};

const selectImage = (key) => {
  if (!window.wp?.media) {
    toastMessage(__('WordPress media library is not available.', 'all-signs-options-pro'), 'error');
    return;
  }

  const uploader = window.wp.media({
    title: __('Select Image', 'all-signs-options-pro'),
    button: { text: __('Select Image', 'all-signs-options-pro') },
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
.asowp-language-setup {
  color: var(--asowp-shopify-text);
}

.asowp-language-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 220px;
  gap: 20px;
  align-items: start;
}

.asowp-language-main {
  display: grid;
  gap: 16px;
  min-width: 0;
}

.asowp-language-card {
  background: var(--asowp-shopify-surface);
  border: 1px solid var(--asowp-shopify-border);
  border-radius: var(--asowp-shopify-radius-card);
  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.08);
}

.asowp-language-hero {
  padding: 16px 20px;
}

.asowp-language-hero h1,
.asowp-language-section h2,
.asowp-section-menu h2 {
  margin: 0;
  color: #303030;
  font-weight: 750;
  letter-spacing: 0;
}

.asowp-language-hero h1 {
  font-size: 22px;
  line-height: 28px;
}

.asowp-language-hero p,
.asowp-section-head p,
.asowp-toggle-block p,
.asowp-field small {
  margin: 6px 0 0;
  color: #616161;
  font-size: 14px;
  line-height: 22px;
}

.asowp-language-section {
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

.asowp-language-section h2 {
  font-size: 17px;
  line-height: 24px;
}

.asowp-section-body {
  display: grid;
  gap: 16px;
}

.asowp-collapse-button {
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
.asowp-collapse-button:focus {
  background: #ffffff;
  color: #202223;
  border-color: #babfc3;
  box-shadow: none;
  outline: none;
}

.asowp-collapse-button svg {
  width: 15px;
  height: 15px;
}

.asowp-toggle-block,
.asowp-field-group {
  padding: 16px;
  border: 1px solid #dfe3e8;
  border-radius: 10px;
  background: #ffffff;
}

.asowp-toggle-block {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  align-items: flex-start;
}

.asowp-toggle-block h3,
.asowp-field-group h3 {
  margin: 0 0 12px;
  color: #303030;
  font-size: 13px;
  line-height: 18px;
  font-weight: 750;
}

.asowp-toggle-line {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #616161;
  font-size: 13px;
}

.asowp-form-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  column-gap: 20px;
  row-gap: 14px;
}

.asowp-form-grid-single {
  grid-template-columns: 1fr;
}

.asowp-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.asowp-field > span,
.asowp-image-field > span {
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

.asowp-shopify-input.is-invalid {
  border-color: #d72c0d;
}

.asowp-editor-wrap {
  overflow: hidden;
  border: 1px solid #dfe3e8;
  border-radius: 10px;
  background: #ffffff;
}

.asowp-editor-wrap .mce-toolbar .mce-btn,
.asowp-editor-wrap .mce-toolbar .mce-btn:hover,
.asowp-editor-wrap .mce-toolbar .mce-btn:focus,
.asowp-editor-wrap .mce-toolbar .mce-btn:active,
.asowp-editor-wrap .mce-toolbar .mce-btn.mce-active,
.asowp-editor-wrap .mce-toolbar .mce-btn.mce-active:hover,
.asowp-editor-wrap .mce-toolbar .mce-btn.mce-active:focus {
  background: transparent !important;
  border-color: transparent !important;
  box-shadow: none !important;
  outline: none !important;
}

.asowp-editor-wrap .mce-toolbar .mce-btn button,
.asowp-editor-wrap .mce-toolbar .mce-btn button:hover,
.asowp-editor-wrap .mce-toolbar .mce-btn button:focus,
.asowp-editor-wrap .mce-toolbar .mce-btn button:active {
  min-width: 28px !important;
  height: 28px !important;
  padding: 4px 6px !important;
  background: transparent !important;
  border: 0 !important;
  border-radius: 3px !important;
  box-shadow: none !important;
  outline: none !important;
}

.asowp-editor-wrap .mce-toolbar .mce-btn:hover button,
.asowp-editor-wrap .mce-toolbar .mce-btn:focus button {
  background: #eef2f7 !important;
}

.asowp-editor-wrap .mce-toolbar .mce-btn.mce-active button,
.asowp-editor-wrap .mce-toolbar .mce-btn button[aria-pressed="true"] {
  background: #acd0f5 !important;
  color: #111827 !important;
  box-shadow: none !important;
}

.asowp-editor-wrap .mce-toolbar .mce-btn i,
.asowp-editor-wrap .mce-toolbar .mce-btn .mce-ico {
  color: #1f2937 !important;
  text-shadow: none !important;
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

.asowp-image-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px 18px;
}

.asowp-image-field {
  display: grid;
  gap: 6px;
}

.asowp-image-control {
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

.asowp-upload-button {
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

.asowp-upload-button:hover,
.asowp-upload-button:focus {
  background: #007a76;
  color: #ffffff;
  border-color: #005c5c;
  box-shadow: none;
  outline: none;
}

.asowp-image-preview {
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

.asowp-image-preview img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.asowp-image-clear {
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

.asowp-image-clear svg {
  width: 13px;
  height: 13px;
}

.asowp-save-row {
  display: flex;
  justify-content: flex-end;
  margin-top: 2px;
}

.asowp-language-save {
  min-height: 32px;
  padding: 6px 14px;
  font-size: 13px;
}

.asowp-language-save svg {
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

.asowp-language-loading {
  display: flex;
  min-height: 300px;
  align-items: center;
  justify-content: center;
}

.asowp-language-loading img {
  width: 140px;
  height: 140px;
}

.asowp-spin {
  animation: asowp-language-spin 800ms linear infinite;
}

@keyframes asowp-language-spin {
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 1200px) {
  .asowp-language-layout {
    grid-template-columns: 1fr;
  }

  .asowp-section-menu-wrap {
    position: static;
    order: -1;
  }
}

@media (max-width: 782px) {
  .asowp-language-hero,
  .asowp-language-section {
    padding: 20px;
  }

  .asowp-section-head,
  .asowp-toggle-block {
    flex-direction: column;
    align-items: stretch;
  }

  .asowp-form-grid,
  .asowp-image-grid {
    grid-template-columns: 1fr;
  }
}
</style>
