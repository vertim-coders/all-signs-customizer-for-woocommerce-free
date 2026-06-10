<template>
  <section class="asowp-component-editor">
    <header class="asowp-component-card asowp-component-hero">
      <div>
        <h1>Edit additional component</h1>
        <p>Define the component and the options customers can choose from.</p>
      </div>
    </header>

    <div class="asowp-component-card asowp-component-details">
      <div class="asowp-component-grid asowp-component-grid-2">
        <label class="asowp-component-field">
          <span>Title</span>
          <input v-model="additionalOption.title" type="text" />
        </label>
        <label class="asowp-component-field">
          <span>Group icon</span>
          <div class="asowp-component-upload">
            <button type="button" class="asowp-component-primary asowp-component-upload-button" @click="openMedia(additionalOption, 'icon', 'Select group icon')">Upload icon</button>
            <div class="asowp-component-upload-preview">
              <img v-if="additionalOption.icon" :src="additionalOption.icon" alt="" />
              <button v-if="additionalOption.icon" type="button" @click="additionalOption.icon = ''">x</button>
            </div>
          </div>
        </label>
      </div>
      <label class="asowp-component-field">
        <span>Description</span>
        <input v-model="additionalOption.description" type="text" />
      </label>
    </div>

    <div class="asowp-component-card asowp-component-options">
      <div>
        <h2>Options</h2>
        <p>Add the values available for this additional component.</p>
      </div>

      <div v-if="isFetching" class="asowp-component-empty asowp-table-loader-cell">
        <Loader2Icon class="asowp-table-loader-icon asowp-w-7 asowp-h-7" />
      </div>
      <article v-for="(item, index) in additionalOption.options" v-else :key="index" class="asowp-component-option">
        <header class="asowp-component-option-head">
          <div>
            <h3>{{ item.title || `Option ${index + 1}` }}</h3>
            <p>{{ optionSummary(item) }}</p>
          </div>
          <div class="asowp-component-option-actions">
            <span>Default</span>
            <button type="button" :class="['asowp-component-toggle', item.isDefault ? 'is-active' : '']" @click="setDefault(index)"><span></span></button>
            <button type="button" class="asowp-component-danger" @click="removeOption(index)">
              <Trash2Icon :size="14" />
              Remove
            </button>
            <button type="button" class="asowp-component-secondary" @click="toggleOption(index)">
              <ChevronUpIcon v-if="expandedOption === index" :size="14" />
              <ChevronDownIcon v-else :size="14" />
              {{ expandedOption === index ? 'Collapse' : 'Expand' }}
            </button>
          </div>
        </header>

        <div v-if="expandedOption === index" class="asowp-component-option-body">
          <div class="asowp-component-grid asowp-component-grid-2">
            <label class="asowp-component-field">
              <span>Title</span>
              <input v-model="item.title" type="text" />
            </label>
            <label class="asowp-component-field">
              <span>Description</span>
              <input v-model="item.description" type="text" />
            </label>
          </div>

          <div class="asowp-component-grid asowp-component-grid-2">
            <label class="asowp-component-field">
              <span>Option icon</span>
              <UploadControl :value="item.icon" label="Upload icon" @choose="openMedia(item, 'icon', 'Select option icon')" @clear="item.icon = ''" />
            </label>
            <label class="asowp-component-field">
              <span>Popup image</span>
              <UploadControl :value="item.popImg" label="Upload image" @choose="openMedia(item, 'popImg', 'Select popup image')" @clear="item.popImg = ''" />
            </label>
          </div>

          <div class="asowp-component-grid asowp-component-grid-2">
            <label class="asowp-component-field">
              <span>Preview image</span>
              <UploadControl :value="item.image" label="Upload preview" @choose="openMedia(item, 'image', 'Select preview image')" @clear="item.image = ''" />
            </label>
            <label class="asowp-component-field">
              <span>Additional price</span>
              <input v-model.number="item.additionalPrice" type="number" />
            </label>
          </div>

          <div class="asowp-component-grid asowp-component-grid-2">
            <label class="asowp-component-field">
              <span>Exclude colors</span>
              <select v-model="item.excludeColors" multiple>
                <option v-for="color in materialColors" :key="color.name" :value="color.name">{{ color.name }}</option>
              </select>
              <small>No color exclusion.</small>
            </label>
            <div class="asowp-component-surface">
              <div class="asowp-component-inline">
                <span>Enable pricing by surface</span>
                <button type="button" :class="['asowp-component-toggle', item.enablePricingBySurface ? 'is-active' : '']" @click="item.enablePricingBySurface = !item.enablePricingBySurface"><span></span></button>
              </div>
              <label class="asowp-component-field">
                <span>Surface</span>
                <input v-model.number="item.surface" type="number" :disabled="!item.enablePricingBySurface" />
              </label>
            </div>
          </div>
        </div>
      </article>

      <button type="button" class="asowp-component-secondary asowp-component-add-option" @click="addOption">
        <PlusIcon :size="14" />
        Add option
      </button>
    </div>

    <footer class="asowp-component-footer">
      <button type="button" class="asowp-component-secondary" :disabled="isLoading" @click="goBack">Back to additional components</button>
      <button type="button" class="asowp-component-primary" :disabled="isLoading" @click="saveComponent">
        {{ isLoading ? 'Saving...' : 'Save additional component' }}
      </button>
    </footer>
  </section>
</template>

<script setup>
import { defineComponent, h, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import api from '@/admin/Api/api';
import toastMessage from '@/admin/utils/functions';
import { ChevronDownIcon, ChevronUpIcon, Loader2Icon, PlusIcon, Trash2Icon } from 'lucide-vue-next';

const route = useRoute();
const router = useRouter();
const configID = ref(route.params.configId);
const additionalOptionId = ref(route.params.additionalOptionID);

const isFetching = ref(true);
const isLoading = ref(false);
const expandedOption = ref(0);
const materialColors = ref([]);
const additionalOption = ref({
  title: '',
  description: '',
  icon: '',
  options: [],
});

onMounted(async () => {
  isFetching.value = true;
  await Promise.all([fetchColors(), fetchComponentOptions()]);
  isFetching.value = false;
});

const normalizeOption = (option = {}) => ({
  title: '',
  description: '',
  icon: '',
  image: '',
  popImg: '',
  excludeColors: [],
  isDefault: false,
  additionalPrice: 0,
  enablePricingBySurface: false,
  surface: 0,
  ...option,
});

const fetchComponentOptions = async () => {
  const result = await api.getAdditionalOptionItems(configID.value, additionalOptionId.value);
  additionalOption.value = {
    title: '',
    description: '',
    icon: '',
    options: [],
    ...result,
    options: Array.isArray(result?.options) ? result.options.map(normalizeOption) : [],
  };
};

const fetchColors = async () => {
  const result = await api.getRequiredOptionColors(configID.value);
  const items = Array.isArray(result?.items)
    ? result.items
    : (Array.isArray(result?.data?.colors?.items) ? result.data.colors.items : []);
  if (items.length) {
    materialColors.value = items.map(color => ({
      name: color.name || color.label || color.title || '',
      codeHex: color?.pattern?.codeHex || color?.codeHex || color?.hex || '#ffffff',
    }));
  }
};

const optionSummary = (item) => {
  const colorText = Array.isArray(item.excludeColors) && item.excludeColors.length ? `${item.excludeColors.length} color exclusions` : 'no color exclusion';
  const pricingText = item.enablePricingBySurface ? 'surface pricing' : 'flat pricing';
  return `${colorText} - ${pricingText}`;
};

const addOption = () => {
  additionalOption.value.options.push(normalizeOption({ title: `Option ${additionalOption.value.options.length + 1}` }));
  expandedOption.value = additionalOption.value.options.length - 1;
};

const removeOption = (index) => {
  additionalOption.value.options.splice(index, 1);
  if (expandedOption.value >= additionalOption.value.options.length) {
    expandedOption.value = Math.max(0, additionalOption.value.options.length - 1);
  }
};

const toggleOption = (index) => {
  expandedOption.value = expandedOption.value === index ? null : index;
};

const setDefault = (index) => {
  additionalOption.value.options = additionalOption.value.options.map((item, key) => ({
    ...item,
    isDefault: key === index ? !item.isDefault : false,
  }));
};

const openMedia = (target, field, title) => {
  const uploader = wp.media({
    title,
    button: { text: 'Select image' },
    multiple: false,
  });

  uploader.on('select', () => {
    const attachment = uploader.state().get('selection').first().toJSON();
    if (attachment.type === 'image') {
      target[field] = attachment.url;
    }
  });

  uploader.open();
};

const saveComponent = async () => {
  if (!additionalOption.value.title.trim()) {
    toastMessage('Title must not be empty', 'warning');
    return;
  }

  isLoading.value = true;
  const result = await api.updateAdditionalOption(
    configID.value,
    additionalOptionId.value,
    additionalOption.value,
  );
  isLoading.value = false;

  if (result.success) {
    toastMessage(result.message);
    return;
  }

  toastMessage(result.message, 'error');
};

const goBack = () => {
  router.push({
    name: 'Additional-Components',
    params: {
      configId: configID.value,
    },
  });
};

const UploadControl = defineComponent({
  props: {
    value: { type: String, default: '' },
    label: { type: String, default: 'Upload image' },
  },
  emits: ['choose', 'clear'],
  setup(props, { emit }) {
    return () =>
      h('div', { class: 'asowp-component-upload' }, [
        h('button', { type: 'button', class: 'asowp-component-primary asowp-component-upload-button', onClick: () => emit('choose') }, props.label),
        h('div', { class: 'asowp-component-upload-preview' }, [
          props.value ? h('img', { src: props.value, alt: '' }) : null,
          props.value ? h('button', { type: 'button', onClick: () => emit('clear') }, 'x') : null,
        ]),
      ]);
  },
});
</script>

<style>
.asowp-component-editor {
  display: grid;
  gap: 12px;
  color: #303030;
  font-size: 13px;
}

.asowp-component-card {
  background: #fff;
  border: 1px solid #d8dee4;
  border-radius: 8px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.08);
}

.asowp-component-hero {
  padding: 24px 28px;
}

.asowp-component-hero h1,
.asowp-component-options h2 {
  margin: 0;
  color: #303030;
  font-size: 18px;
  font-weight: 800;
  line-height: 1.25;
}

.asowp-component-hero p,
.asowp-component-options p,
.asowp-component-option p {
  margin: 4px 0 0;
  color: #5f6368;
  font-size: 12px;
  line-height: 1.35;
}

.asowp-component-details,
.asowp-component-options {
  display: grid;
  gap: 14px;
  padding: 24px 28px;
}

.asowp-component-grid {
  display: grid;
  gap: 14px 18px;
}

.asowp-component-grid-2 {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.asowp-component-field {
  display: grid;
  gap: 6px;
  margin: 0;
}

.asowp-component-field span,
.asowp-component-inline span {
  color: #303030;
  font-size: 12px;
  font-weight: 500;
}

.asowp-component-field input,
.asowp-component-field select {
  width: 100%;
  min-height: 34px;
  padding: 6px 10px;
  border: 1px solid #8c9196;
  border-radius: 6px;
  background: #fff;
  color: #303030;
  font-size: 13px;
}

.asowp-component-field select[multiple] {
  min-height: 34px;
}

.asowp-component-field input:disabled {
  border-color: #e1e3e5;
  background: #f4f4f4;
  color: #8c9196;
}

.asowp-component-field small {
  color: #5f6368;
  font-size: 11px;
}

.asowp-component-upload {
  display: flex;
  align-items: center;
  min-height: 34px;
  overflow: hidden;
  padding-left: 5px;
  border: 1px solid #8c9196;
  border-radius: 6px;
  background: #fff;
}

.asowp-component-upload-button {
  min-height: 26px;
  padding: 5px 12px;
}

.asowp-component-upload-preview {
  position: relative;
  width: 44px;
  height: 30px;
  margin-left: auto;
  border-left: 1px solid #e1e3e5;
}

.asowp-component-upload-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.asowp-component-upload-preview button {
  position: absolute;
  top: 0;
  right: 0;
  border: 0;
  background: #bf0711;
  color: #fff;
}

.asowp-component-option {
  border: 1px solid #d8dee4;
  border-radius: 8px;
  background: #fff;
  padding: 16px 20px;
}

.asowp-component-option-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}

.asowp-component-option h3 {
  margin: 0;
  color: #303030;
  font-size: 13px;
  font-weight: 800;
}

.asowp-component-option-actions,
.asowp-component-inline {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.asowp-component-option-actions > span {
  color: #5f6368;
  font-size: 11px;
}

.asowp-component-option-body {
  display: grid;
  gap: 14px;
  margin-top: 18px;
}

.asowp-component-surface {
  display: grid;
  gap: 8px;
  align-content: start;
}

.asowp-component-primary,
.asowp-component-secondary,
.asowp-component-danger {
  appearance: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  min-height: 30px;
  padding: 6px 14px;
  border-radius: 7px;
  font-family: inherit;
  font-size: 12px;
  font-weight: 800;
  line-height: 1;
  cursor: pointer;
  text-decoration: none;
}

.asowp-component-primary,
.asowp-component-primary:hover,
.asowp-component-primary:focus {
  color: #fff;
  background: #007a73;
  border: 1px solid #006c67;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.25);
}

.asowp-component-secondary,
.asowp-component-secondary:hover,
.asowp-component-secondary:focus {
  color: #111827;
  background: #fff;
  border: 1px solid #c9cccf;
}

.asowp-component-danger,
.asowp-component-danger:hover,
.asowp-component-danger:focus {
  color: #8a0f00;
  background: transparent;
  border: 0;
}

.asowp-component-add-option {
  justify-self: flex-start;
}

.asowp-component-toggle {
  position: relative;
  width: 40px;
  height: 22px;
  padding: 0;
  border: 0;
  border-radius: 999px;
  background: #d9dfe8;
  cursor: pointer;
  box-shadow: none;
}

.asowp-component-toggle span {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25);
  transition: transform 0.15s ease;
}

.asowp-component-toggle.is-active {
  background: #007a73;
}

.asowp-component-toggle.is-active span {
  transform: translateX(18px);
}

.asowp-component-footer {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}

.asowp-component-empty {
  padding: 40px;
  text-align: center;
  color: #5f6368;
}

@media (max-width: 900px) {
  .asowp-component-grid-2,
  .asowp-component-option-head {
    grid-template-columns: 1fr;
  }

  .asowp-component-option-head {
    display: grid;
  }
}
</style>
