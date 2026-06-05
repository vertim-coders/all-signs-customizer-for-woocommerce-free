<template>
  <div v-if="isFetching" class="asowp-theme-loading-card">
    <img :src="loadingIcon" alt="" class="asowp-theme-loading-icon" />
  </div>

  <div v-else class="asowp-theme-page">
    <div class="asowp-theme-main">
      <section class="asowp-theme-hero">
        <h1>{{ __("Theme & Color", "all-signs-options-pro") }}</h1>
        <p>{{ __("Theme settings for classic configurations. Only classic fields are exposed here; no extra dark mode layer is added.", "all-signs-options-pro") }}</p>
      </section>

      <section id="theme-appearance" class="asowp-theme-card">
        <div class="asowp-theme-card-header">
          <div>
            <h2>{{ __("Appearance", "all-signs-options-pro") }}</h2>
            <p>{{ __("Choose the classic skin and edit the classic color groups.", "all-signs-options-pro") }}</p>
          </div>
        </div>

        <div class="asowp-theme-skins">
          <button
            v-for="skin in themeSkins"
            :key="skin.value"
            type="button"
            class="asowp-theme-skin"
            :class="{ 'is-active': themes.skin === skin.value }"
            @click="themes.skin = skin.value"
          >
            <img :src="skin.image" :alt="skin.title" />
            <span class="asowp-theme-skin-footer">
              <strong>{{ skin.title }}</strong>
              <span class="asowp-theme-skin-select">
                {{ __("Select", "all-signs-options-pro") }}
                <span class="asowp-theme-check" :class="{ 'is-checked': themes.skin === skin.value }">
                  <CheckIcon v-if="themes.skin === skin.value" />
                </span>
              </span>
            </span>
          </button>
        </div>
      </section>

      <section
        v-for="group in colorGroups"
        :id="sectionId(group.key)"
        :key="group.key"
        class="asowp-theme-card"
      >
        <div class="asowp-theme-card-header">
          <div>
            <h2>{{ group.title }}</h2>
            <p v-if="group.description">{{ group.description }}</p>
          </div>
          <button
            type="button"
            class="asowp-theme-disclosure"
            :aria-expanded="expanded[group.key]"
            @click="toggleGroup(group.key)"
          >
            {{ expanded[group.key] ? __("Show less", "all-signs-options-pro") : __("Show more", "all-signs-options-pro") }}
            <ChevronUpIcon v-if="expanded[group.key]" />
            <ChevronDownIcon v-else />
          </button>
        </div>

        <div v-show="expanded[group.key]" class="asowp-theme-color-grid">
          <label v-for="field in group.fields" :key="field.path" class="asowp-theme-color-field">
            <span>{{ field.label }}</span>
            <span class="asowp-theme-color-control">
              <input
                type="color"
                :value="getThemeValue(field.path)"
                @input="setThemeValue(field.path, $event.target.value)"
              />
              <input
                type="text"
                :value="getThemeValue(field.path)"
                @input="setThemeValue(field.path, $event.target.value)"
              />
            </span>
          </label>
        </div>
      </section>

      <section id="theme-custom-css" class="asowp-theme-card">
        <div class="asowp-theme-card-header">
          <div>
            <h2>{{ __("Custom CSS", "all-signs-options-pro") }}</h2>
            <p>{{ __("Optional CSS overrides stored in the classic themeColors.customCss field.", "all-signs-options-pro") }}</p>
          </div>
        </div>
        <label class="asowp-theme-textarea-field">
          <span>{{ __("Custom CSS", "all-signs-options-pro") }}</span>
          <textarea v-model="themes.customCSS" rows="8"></textarea>
        </label>
      </section>

      <div class="asowp-theme-actions">
        <button type="button" class="asowp-theme-secondary-button" :disabled="isSavingCss" @click="saveCustomCss">
          <Loader2Icon v-if="isSavingCss" class="asowp-theme-spin" />
          {{ __("Save Custom CSS", "all-signs-options-pro") }}
        </button>
        <button type="button" class="asowp-theme-primary-button" :disabled="isSavingTheme" @click="saveTheme">
          <Loader2Icon v-if="isSavingTheme" class="asowp-theme-spin" />
          {{ __("Save Theme", "all-signs-options-pro") }}
        </button>
      </div>
    </div>

    <aside class="asowp-theme-section-menu">
      <h2>{{ __("Section Menu", "all-signs-options-pro") }}</h2>
      <button
        v-for="item in sectionMenu"
        :key="item.id"
        type="button"
        @click="scrollToSection(item)"
      >
        {{ item.label }}
      </button>
    </aside>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { CheckIcon, ChevronDownIcon, ChevronUpIcon, Loader2Icon } from 'lucide-vue-next';
import { __ } from '@wordpress/i18n';
import api from '@/admin/Api/api';
import toastMessage from '@/admin/utils/functions';
import defaultSkinImage from '../../../../../../assets/images/skin-default.png';
import couffoSkinImage from '../../../../../../assets/images/skin-couffo.png';

const loadingIcon = `${String(window?.asowp_data?.assets_url || "").replace(/\/$/, "")}/icons/ic_loading.svg`;

const route = useRoute();
const configId = ref(route.params.configId);
const isFetching = ref(false);
const savingSection = ref('');

const DEFAULT_THEME_SETTINGS = {
  skin: 'default',
  colors: {
    canvas: {
      backgroundColor: '#f4f8fa',
      borderColor: '#c3cfd6',
    },
    bars: {
      titleColor: '#000000',
      backgroundColor: '#ffffff',
      reset: {
        textColor: '#000000',
        hoverTextColor: '#dd3232',
        backgroundColor: '#ffffff',
        hoverBackgroundColor: '#f4f8fa',
        borderColor: '#ffffff',
        hoverBorderColor: '#f4f8fa',
        modalBackgroundColor: '#000000',
        modalContainerBackground: '#ffffff',
        modalTextColor: '#000000',
        modalYesButtonBackgroundColor: '#f4f8fa',
        modalYesButtonTextColor: '#000000',
        modalNoButtonBackgroundColor: '#dc2626',
        modalNoButtonTextColor: '#ffffff',
      },
      undoRedo: {
        textColor: '#000000',
        hoverTextColor: '#016464',
        backgroundColor: '#ffffff',
        hoverBackgroundColor: '#f4f8fa',
        borderColor: '#ffffff',
        hoverBorderColor: '#f4f8fa',
        disabledBackgroundColor: '#ffffff',
        disabledTextColor: '#c3cfd6',
      },
      preview: {
        textColor: '#000000',
        hoverTextColor: '#016464',
        backgroundColor: '#ffffff',
        hoverBackgroundColor: '#f4f8fa',
        borderColor: '#ffffff',
        hoverBorderColor: '#f4f8fa',
      },
      help: {
        textColor: '#ffffff',
        hoverTextColor: '#ffffff',
        backgroundColor: '#016464',
        hoverBackgroundColor: '#016464',
        borderColor: '#016464',
        hoverBorderColor: '#016464',
      },
      price: {
        backgroundColor: '#ffffff',
        textColor: '#000000',
        textAfterColor: '#000000',
        textBeforeColor: '#000000',
      },
    },
    optionsSideBar: {
      backgroundColor: '#eef3f6',
      scrollButtonsBackgroundColor: '#4a4a4a',
      scrollButtonsHoverBackgroundColor: '#74848d',
      scrollButtonsTextColor: '#ffffff',
      scrollButtonsHoverTextColor: '#ffffff',
      options: {
        buttons: {
          backgroundColor: '#ffffff',
          hoverBackgroundColor: '#ffffff',
          textColor: '#000000',
          hoverTextColor: '#016464',
          hovertextColor: '#016464',
        },
        modals: {
          headerBackgroundColor: '#016464',
          headerTextColor: '#ffffff',
          textColor: '#000000',
          option: {
            textColor: '#000000',
            hoverBackgroundColor: '#eef3f6',
            hoverTextColor: '#000000',
            activeTextColor: '#016464',
          },
          buttons: {
            backgroundColor: '#016464',
            hoverBackgroundColor: '#028383',
            textColor: '#ffffff',
            hoverTextColor: '#ffffff',
          },
          backgroundColor: '#ffffff',
        },
      },
    },
    objectsOptions: {
      backgroundColor: '#ffffff',
      edit: {
        buttonColor: '#ffffff',
        hoverButtonColor: '#787878',
        textColor: '#000000',
        hoverTextColor: '#ffffff',
      },
      clone: {
        buttonColor: '#ffffff',
        hoverButtonColor: '#787878',
        textColor: '#000000',
        hoverTextColor: '#ffffff',
      },
      delete: {
        buttonColor: '#ffffff',
        hoverButtonColor: '#787878',
        textColor: '#dd3232',
        hoverTextColor: '#dd3232',
      },
      center: {
        buttonColor: '#ffffff',
        hoverButtonColor: '#787878',
        textColor: '#000000',
        hoverTextColor: '#ffffff',
      },
    },
    recaps: {
      headerBackgroundColor: '#058585',
      headerTextColor: '#ffffff',
      backgroundColor: '#ffffff',
      optionTextColor: '#000000',
      optionHoverBackgroundColor: '#eef3f6',
      optionHoverTextColor: '#000000',
      optionBorderColor: '#eef3f6',
      optionHoverBorderColor: '#eef3f6',
      buttonFinishBackgroundColor: '#febd52',
      buttonFinishTextColor: '#14213d',
      buttonFinishHoverBackgroundColor: '#fcac29',
      buttonFinishHoverTextColor: '#313e52',
      buttonAddToCartBackgroundColor: '#febd52',
      buttonAddToCartHoverBackgroundColor: '#fcac29',
      buttonAddToCartTextColor: '#14213d',
      buttonAddToCartHoverTextColor: '#313e52',
      buttonEditBackgroundColor: '#016464',
      buttonEditHoverBackgroundColor: '#058585',
      buttonEditTextColor: '#ffffff',
      buttonEditHoverTextColor: '#f4f8fa',
    },
  },
  customCSS: '',
};

const themeSkins = [
  { title: __('Default Skin', 'all-signs-options-pro'), value: 'default', image: defaultSkinImage },
  { title: __('Couffo Skin', 'all-signs-options-pro'), value: 'couffo', image: couffoSkinImage },
];

const colorGroups = [
  {
    key: 'canvas',
    title: __('Canvas, Header and Side Bars', 'all-signs-options-pro'),
    fields: [
      { label: __('Canvas background color', 'all-signs-options-pro'), path: 'colors.canvas.backgroundColor' },
      { label: __('Canvas border color', 'all-signs-options-pro'), path: 'colors.canvas.borderColor' },
      { label: __('Bars Background color', 'all-signs-options-pro'), path: 'colors.bars.backgroundColor' },
      { label: __('Bars title color', 'all-signs-options-pro'), path: 'colors.bars.titleColor' },
    ],
  },
  {
    key: 'price',
    title: __('Price Section', 'all-signs-options-pro'),
    fields: [
      { label: __('Background color', 'all-signs-options-pro'), path: 'colors.bars.price.backgroundColor' },
      { label: __('Text color', 'all-signs-options-pro'), path: 'colors.bars.price.textColor' },
      { label: __('Text before price', 'all-signs-options-pro'), path: 'colors.bars.price.textBeforeColor' },
      { label: __('Text after price', 'all-signs-options-pro'), path: 'colors.bars.price.textAfterColor' },
    ],
  },
  {
    key: 'reset',
    title: __('Reset button', 'all-signs-options-pro'),
    fields: [
      { label: __('Background color', 'all-signs-options-pro'), path: 'colors.bars.reset.backgroundColor' },
      { label: __('Hover background color', 'all-signs-options-pro'), path: 'colors.bars.reset.hoverBackgroundColor' },
      { label: __('Text color', 'all-signs-options-pro'), path: 'colors.bars.reset.textColor' },
      { label: __('Hover text color', 'all-signs-options-pro'), path: 'colors.bars.reset.hoverTextColor' },
      { label: __('Border color', 'all-signs-options-pro'), path: 'colors.bars.reset.borderColor' },
      { label: __('Hover border color', 'all-signs-options-pro'), path: 'colors.bars.reset.hoverBorderColor' },
      { label: __('Modal background color', 'all-signs-options-pro'), path: 'colors.bars.reset.modalBackgroundColor' },
      { label: __('Container modal color', 'all-signs-options-pro'), path: 'colors.bars.reset.modalContainerBackground' },
      { label: __('Modal text color', 'all-signs-options-pro'), path: 'colors.bars.reset.modalTextColor' },
      { label: __('Yes background color', 'all-signs-options-pro'), path: 'colors.bars.reset.modalYesButtonBackgroundColor' },
      { label: __('Yes text color', 'all-signs-options-pro'), path: 'colors.bars.reset.modalYesButtonTextColor' },
      { label: __('No background color', 'all-signs-options-pro'), path: 'colors.bars.reset.modalNoButtonBackgroundColor' },
      { label: __('No text color', 'all-signs-options-pro'), path: 'colors.bars.reset.modalNoButtonTextColor' },
    ],
  },
  {
    key: 'undoRedo',
    title: __('Undo and redo buttons', 'all-signs-options-pro'),
    fields: [
      { label: __('Background color', 'all-signs-options-pro'), path: 'colors.bars.undoRedo.backgroundColor' },
      { label: __('Hover background color', 'all-signs-options-pro'), path: 'colors.bars.undoRedo.hoverBackgroundColor' },
      { label: __('Text color', 'all-signs-options-pro'), path: 'colors.bars.undoRedo.textColor' },
      { label: __('Hover text color', 'all-signs-options-pro'), path: 'colors.bars.undoRedo.hoverTextColor' },
      { label: __('Border color', 'all-signs-options-pro'), path: 'colors.bars.undoRedo.borderColor' },
      { label: __('Hover border color', 'all-signs-options-pro'), path: 'colors.bars.undoRedo.hoverBorderColor' },
      { label: __('Disabled background color', 'all-signs-options-pro'), path: 'colors.bars.undoRedo.disabledBackgroundColor' },
      { label: __('Disabled text color', 'all-signs-options-pro'), path: 'colors.bars.undoRedo.disabledTextColor' },
    ],
  },
  {
    key: 'preview',
    title: __('Preview buttons', 'all-signs-options-pro'),
    fields: [
      { label: __('Background color', 'all-signs-options-pro'), path: 'colors.bars.preview.backgroundColor' },
      { label: __('Hover background color', 'all-signs-options-pro'), path: 'colors.bars.preview.hoverBackgroundColor' },
      { label: __('Text color', 'all-signs-options-pro'), path: 'colors.bars.preview.textColor' },
      { label: __('Hover text color', 'all-signs-options-pro'), path: 'colors.bars.preview.hoverTextColor' },
      { label: __('Border color', 'all-signs-options-pro'), path: 'colors.bars.preview.borderColor' },
      { label: __('Hover border color', 'all-signs-options-pro'), path: 'colors.bars.preview.hoverBorderColor' },
    ],
  },
  {
    key: 'help',
    title: __('Help buttons', 'all-signs-options-pro'),
    fields: [
      { label: __('Background color', 'all-signs-options-pro'), path: 'colors.bars.help.backgroundColor' },
      { label: __('Hover background color', 'all-signs-options-pro'), path: 'colors.bars.help.hoverBackgroundColor' },
      { label: __('Text color', 'all-signs-options-pro'), path: 'colors.bars.help.textColor' },
      { label: __('Hover text color', 'all-signs-options-pro'), path: 'colors.bars.help.hoverTextColor' },
      { label: __('Border color', 'all-signs-options-pro'), path: 'colors.bars.help.borderColor' },
      { label: __('Hover border color', 'all-signs-options-pro'), path: 'colors.bars.help.hoverBorderColor' },
    ],
  },
  {
    key: 'optionsSideBar',
    title: __('Options Sidebar', 'all-signs-options-pro'),
    fields: [
      { label: __('Background color', 'all-signs-options-pro'), path: 'colors.optionsSideBar.backgroundColor' },
      { label: __('Scroll button background color', 'all-signs-options-pro'), path: 'colors.optionsSideBar.scrollButtonsBackgroundColor' },
      { label: __('Scroll hover button background color', 'all-signs-options-pro'), path: 'colors.optionsSideBar.scrollButtonsHoverBackgroundColor' },
      { label: __('Scroll button text color', 'all-signs-options-pro'), path: 'colors.optionsSideBar.scrollButtonsTextColor' },
      { label: __('Scroll button text hover color', 'all-signs-options-pro'), path: 'colors.optionsSideBar.scrollButtonsHoverTextColor' },
      { label: __('Options button background color', 'all-signs-options-pro'), path: 'colors.optionsSideBar.options.buttons.backgroundColor' },
      { label: __('Options button hover background color', 'all-signs-options-pro'), path: 'colors.optionsSideBar.options.buttons.hoverBackgroundColor' },
      { label: __('Options button text color', 'all-signs-options-pro'), path: 'colors.optionsSideBar.options.buttons.textColor' },
      { label: __('Options button hover text color', 'all-signs-options-pro'), path: 'colors.optionsSideBar.options.buttons.hoverTextColor' },
    ],
  },
  {
    key: 'optionsModals',
    title: __('Options modals', 'all-signs-options-pro'),
    fields: [
      { label: __('Modal background color', 'all-signs-options-pro'), path: 'colors.optionsSideBar.options.modals.backgroundColor' },
      { label: __('Modal text color', 'all-signs-options-pro'), path: 'colors.optionsSideBar.options.modals.textColor' },
      { label: __('Modal header background color', 'all-signs-options-pro'), path: 'colors.optionsSideBar.options.modals.headerBackgroundColor' },
      { label: __('Modal header text color', 'all-signs-options-pro'), path: 'colors.optionsSideBar.options.modals.headerTextColor' },
      { label: __('Modal button background color', 'all-signs-options-pro'), path: 'colors.optionsSideBar.options.modals.buttons.backgroundColor' },
      { label: __('Modal button hover background color', 'all-signs-options-pro'), path: 'colors.optionsSideBar.options.modals.buttons.hoverBackgroundColor' },
      { label: __('Modal button text color', 'all-signs-options-pro'), path: 'colors.optionsSideBar.options.modals.buttons.textColor' },
      { label: __('Modal button hover text color', 'all-signs-options-pro'), path: 'colors.optionsSideBar.options.modals.buttons.hoverTextColor' },
    ],
  },
  {
    key: 'optionsInModals',
    title: __('Options in modals', 'all-signs-options-pro'),
    fields: [
      { label: __('Modal option text color', 'all-signs-options-pro'), path: 'colors.optionsSideBar.options.modals.option.textColor' },
      { label: __('Modal option hover text color', 'all-signs-options-pro'), path: 'colors.optionsSideBar.options.modals.option.hoverTextColor' },
      { label: __('Modal option hover background color', 'all-signs-options-pro'), path: 'colors.optionsSideBar.options.modals.option.hoverBackgroundColor' },
      { label: __('Modal option active text color', 'all-signs-options-pro'), path: 'colors.optionsSideBar.options.modals.option.activeTextColor' },
    ],
  },
  {
    key: 'objectsOptions',
    title: __('Objects options', 'all-signs-options-pro'),
    fields: [
      { label: __('Background color', 'all-signs-options-pro'), path: 'colors.objectsOptions.backgroundColor' },
      { label: __('Edit button color', 'all-signs-options-pro'), path: 'colors.objectsOptions.edit.buttonColor' },
      { label: __('Hover Edit button color', 'all-signs-options-pro'), path: 'colors.objectsOptions.edit.hoverButtonColor' },
      { label: __('Edit button text color', 'all-signs-options-pro'), path: 'colors.objectsOptions.edit.textColor' },
      { label: __('Hover Edit button text color', 'all-signs-options-pro'), path: 'colors.objectsOptions.edit.hoverTextColor' },
      { label: __('Clone button color', 'all-signs-options-pro'), path: 'colors.objectsOptions.clone.buttonColor' },
      { label: __('Hover Clone button color', 'all-signs-options-pro'), path: 'colors.objectsOptions.clone.hoverButtonColor' },
      { label: __('Clone button text color', 'all-signs-options-pro'), path: 'colors.objectsOptions.clone.textColor' },
      { label: __('Hover Clone button text color', 'all-signs-options-pro'), path: 'colors.objectsOptions.clone.hoverTextColor' },
      { label: __('Delete button color', 'all-signs-options-pro'), path: 'colors.objectsOptions.delete.buttonColor' },
      { label: __('Hover Delete button color', 'all-signs-options-pro'), path: 'colors.objectsOptions.delete.hoverButtonColor' },
      { label: __('Delete button text color', 'all-signs-options-pro'), path: 'colors.objectsOptions.delete.textColor' },
      { label: __('Hover Delete button text color', 'all-signs-options-pro'), path: 'colors.objectsOptions.delete.hoverTextColor' },
      { label: __('Center button color', 'all-signs-options-pro'), path: 'colors.objectsOptions.center.buttonColor' },
      { label: __('Hover Center button color', 'all-signs-options-pro'), path: 'colors.objectsOptions.center.hoverButtonColor' },
      { label: __('Center button text color', 'all-signs-options-pro'), path: 'colors.objectsOptions.center.textColor' },
      { label: __('Hover Center button text color', 'all-signs-options-pro'), path: 'colors.objectsOptions.center.hoverTextColor' },
    ],
  },
  {
    key: 'recaps',
    title: __('Recaps section', 'all-signs-options-pro'),
    fields: [
      { label: __('Background color', 'all-signs-options-pro'), path: 'colors.recaps.backgroundColor' },
      { label: __('Header background color', 'all-signs-options-pro'), path: 'colors.recaps.headerBackgroundColor' },
      { label: __('Header text color', 'all-signs-options-pro'), path: 'colors.recaps.headerTextColor' },
      { label: __('Recaps option hover background color', 'all-signs-options-pro'), path: 'colors.recaps.optionHoverBackgroundColor' },
      { label: __('Recaps option hover text color', 'all-signs-options-pro'), path: 'colors.recaps.optionHoverTextColor' },
      { label: __('Recaps option text color', 'all-signs-options-pro'), path: 'colors.recaps.optionTextColor' },
      { label: __('Recaps option border color', 'all-signs-options-pro'), path: 'colors.recaps.optionBorderColor' },
      { label: __('Recaps option border hover color', 'all-signs-options-pro'), path: 'colors.recaps.optionHoverBorderColor' },
      { label: __('Button Finish background color', 'all-signs-options-pro'), path: 'colors.recaps.buttonFinishBackgroundColor' },
      { label: __('Button Finish hover background color', 'all-signs-options-pro'), path: 'colors.recaps.buttonFinishHoverBackgroundColor' },
      { label: __('Button Finish text color', 'all-signs-options-pro'), path: 'colors.recaps.buttonFinishTextColor' },
      { label: __('Button Finish text hover color', 'all-signs-options-pro'), path: 'colors.recaps.buttonFinishHoverTextColor' },
      { label: __('Button AddToCart background color', 'all-signs-options-pro'), path: 'colors.recaps.buttonAddToCartBackgroundColor' },
      { label: __('Button AddToCart hover background color', 'all-signs-options-pro'), path: 'colors.recaps.buttonAddToCartHoverBackgroundColor' },
      { label: __('Button AddToCart text color', 'all-signs-options-pro'), path: 'colors.recaps.buttonAddToCartTextColor' },
      { label: __('Button AddToCart text hover color', 'all-signs-options-pro'), path: 'colors.recaps.buttonAddToCartHoverTextColor' },
      { label: __('Button Edit background color', 'all-signs-options-pro'), path: 'colors.recaps.buttonEditBackgroundColor' },
      { label: __('Button Edit hover background color', 'all-signs-options-pro'), path: 'colors.recaps.buttonEditHoverBackgroundColor' },
      { label: __('Button Edit text color', 'all-signs-options-pro'), path: 'colors.recaps.buttonEditTextColor' },
      { label: __('Button Edit text hover color', 'all-signs-options-pro'), path: 'colors.recaps.buttonEditHoverTextColor' },
    ],
  },
];

const themes = ref(clone(DEFAULT_THEME_SETTINGS));
const expanded = ref({
  canvas: true,
  price: false,
  reset: false,
  undoRedo: false,
  preview: false,
  help: true,
  optionsSideBar: false,
  optionsModals: false,
  optionsInModals: false,
  objectsOptions: false,
  recaps: false,
});

const sectionMenu = computed(() => [
  { id: 'theme-appearance', label: __('Appearance', 'all-signs-options-pro') },
  ...colorGroups.map((group) => ({
    id: sectionId(group.key),
    label: group.title,
    groupKey: group.key,
  })),
  { id: 'theme-custom-css', label: __('Custom CSS', 'all-signs-options-pro') },
]);

const isSavingTheme = computed(() => savingSection.value === 'theme');
const isSavingCss = computed(() => savingSection.value === 'customCSS');

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function isPlainObject(value) {
  return value && typeof value === 'object' && !Array.isArray(value);
}

function deepMerge(base, override) {
  const output = clone(base);
  if (!isPlainObject(override)) {
    return output;
  }

  Object.entries(override).forEach(([key, value]) => {
    if (isPlainObject(value) && isPlainObject(output[key])) {
      output[key] = deepMerge(output[key], value);
      return;
    }
    output[key] = value;
  });

  return output;
}

function sectionId(key) {
  return `theme-group-${key}`;
}

function toggleGroup(key) {
  expanded.value[key] = !expanded.value[key];
}

function getPathValue(source, path) {
  return path.split('.').reduce((current, key) => current?.[key], source);
}

function setPathValue(source, path, value) {
  const parts = path.split('.');
  let current = source;

  parts.slice(0, -1).forEach((part) => {
    if (!isPlainObject(current[part])) {
      current[part] = {};
    }
    current = current[part];
  });

  current[parts[parts.length - 1]] = value;
}

function normalizeColor(value) {
  const color = String(value || '').trim();
  if (!color) {
    return '#000000';
  }
  return color.startsWith('#') ? color : `#${color}`;
}

function getThemeValue(path) {
  return normalizeColor(getPathValue(themes.value, path));
}

function setThemeValue(path, value) {
  setPathValue(themes.value, path, normalizeColor(value));

  if (path === 'colors.optionsSideBar.options.buttons.hoverTextColor') {
    setPathValue(themes.value, 'colors.optionsSideBar.options.buttons.hovertextColor', normalizeColor(value));
  }
}

async function fetchThemesSettings() {
  const result = await api.getThemesSettings(configId.value);

  if (!result?.message) {
    const merged = deepMerge(DEFAULT_THEME_SETTINGS, result);
    merged.customCSS = result.customCSS ?? result.customCss ?? '';
    themes.value = merged;
  }
}

async function saveSettings(section) {
  savingSection.value = section;

  const payload = {
    ...themes.value,
    customCss: themes.value.customCSS,
  };

  try {
    const result = await api.updateThemes(configId.value, payload);
    if (result.success === true) {
      toastMessage(result.message);
      return;
    }
    if (result.success === 'same') {
      toastMessage(result.message, 'warning');
      return;
    }
    toastMessage(result.message || __('Unable to save theme settings.', 'all-signs-options-pro'), 'error');
  } catch (error) {
    toastMessage(__('Unable to save theme settings.', 'all-signs-options-pro'), 'error');
  } finally {
    savingSection.value = '';
  }
}

function saveTheme() {
  saveSettings('theme');
}

function saveCustomCss() {
  saveSettings('customCSS');
}

function scrollToSection(item) {
  if (item.groupKey) {
    expanded.value[item.groupKey] = true;
  }

  window.setTimeout(() => {
    document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, item.groupKey ? 120 : 0);
}

onMounted(async () => {
  isFetching.value = true;
  try {
    await fetchThemesSettings();
  } finally {
    isFetching.value = false;
  }
});
</script>

<style>
.asowp-theme-page {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 220px;
  gap: 20px;
  align-items: start;
  color: #202223;
}

.asowp-theme-main {
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-width: 0;
}

.asowp-theme-loading-card,
.asowp-theme-hero,
.asowp-theme-card,
.asowp-theme-section-menu {
  background: #ffffff;
  border: 1px solid #dfe3e8;
  border-radius: 12px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.04);
}

.asowp-theme-loading-card {
  min-height: 280px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.asowp-theme-loading-icon {
  width: 160px;
  height: 160px;
}

.asowp-theme-hero {
  padding: 28px 36px;
}

.asowp-theme-hero h1,
.asowp-theme-card h2,
.asowp-theme-section-menu h2 {
  margin: 0;
  color: #202223;
  font-weight: 700;
  letter-spacing: 0;
}

.asowp-theme-hero h1 {
  font-size: 20px;
  line-height: 28px;
}

.asowp-theme-hero p,
.asowp-theme-card-header p {
  margin: 4px 0 0;
  color: #616161;
  font-size: 14px;
  line-height: 20px;
}

.asowp-theme-card {
  padding: 24px 28px;
  scroll-margin-top: 56px;
}

.asowp-theme-card-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 16px;
}

.asowp-theme-card h2,
.asowp-theme-section-menu h2 {
  font-size: 15px;
  line-height: 22px;
}

.asowp-theme-disclosure,
.asowp-theme-secondary-button,
.asowp-theme-primary-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  min-height: 28px;
  border-radius: 7px;
  font-size: 13px;
  line-height: 18px;
  font-weight: 700;
  cursor: pointer;
  transition: background 120ms ease, border-color 120ms ease;
  outline: none;
}

.asowp-theme-disclosure {
  flex-shrink: 0;
  padding: 4px 12px;
  color: #202223;
  background: #ffffff;
  border: 1px solid #c9cccf;
}

.asowp-theme-disclosure:hover,
.asowp-theme-disclosure:focus,
.asowp-theme-disclosure:active {
  color: #202223;
  background: #ffffff;
  border-color: #8c9196;
  box-shadow: none;
}

.asowp-theme-disclosure svg {
  width: 14px;
  height: 14px;
}

.asowp-theme-skins {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;
}

.asowp-theme-skin {
  position: relative;
  overflow: hidden;
  padding: 0;
  background: #ffffff;
  border: 1px solid #e1e3e5;
  border-radius: 8px;
  cursor: pointer;
  text-align: left;
}

.asowp-theme-skin:hover,
.asowp-theme-skin:focus,
.asowp-theme-skin:active {
  background: #ffffff;
  border-color: #c9cccf;
  outline: none;
  box-shadow: none;
}

.asowp-theme-skin.is-active {
  border-color: #008060;
}

.asowp-theme-skin img {
  display: block;
  width: 100%;
  height: 180px;
  object-fit: cover;
}

.asowp-theme-skin-footer {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 10px 14px;
  background: rgba(255, 255, 255, 0.96);
  color: #202223;
  font-size: 13px;
  line-height: 18px;
}

.asowp-theme-skin-select {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: #008060;
  font-size: 12px;
  line-height: 16px;
}

.asowp-theme-check {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  border: 1px solid #c9cccf;
  border-radius: 999px;
  color: #ffffff;
  background: #ffffff;
}

.asowp-theme-check.is-checked {
  border-color: #008060;
  background: #007a6f;
}

.asowp-theme-check svg {
  width: 12px;
  height: 12px;
}

.asowp-theme-color-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px 20px;
}

.asowp-theme-color-field,
.asowp-theme-textarea-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
  color: #202223;
  font-size: 12px;
  line-height: 16px;
}

.asowp-theme-color-control {
  display: flex;
  align-items: center;
  width: 100%;
  height: 32px;
  overflow: hidden;
  background: #ffffff;
  border: 1px solid #c9cccf;
  border-radius: 4px;
}

.asowp-theme-color-control input[type='color'] {
  width: 32px;
  height: 30px;
  padding: 0;
  border: 0;
  background: transparent;
  cursor: pointer;
}

.asowp-theme-color-control input[type='text'] {
  flex: 1;
  min-width: 0;
  height: 30px;
  padding: 0 8px;
  color: #202223;
  border: 0;
  border-left: 1px solid #dfe3e8;
  border-radius: 0;
  background: #ffffff;
  font-size: 12px;
  line-height: 16px;
  outline: none;
  box-shadow: none;
}

.asowp-theme-color-control:focus-within {
  border-color: #8c9196;
  box-shadow: none;
}

.asowp-theme-textarea-field textarea {
  width: 100%;
  min-height: 180px;
  box-sizing: border-box;
  resize: vertical;
  padding: 10px 12px;
  color: #202223;
  border: 1px solid #c9cccf;
  border-radius: 4px;
  background: #ffffff;
  font-size: 13px;
  line-height: 18px;
  outline: none;
  box-shadow: none;
}

.asowp-theme-textarea-field textarea:focus {
  border-color: #8c9196;
  box-shadow: none;
}

.asowp-theme-actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}

.asowp-theme-secondary-button,
.asowp-theme-primary-button {
  padding: 6px 14px;
}

.asowp-theme-secondary-button {
  color: #202223;
  background: #ffffff;
  border: 1px solid #c9cccf;
}

.asowp-theme-secondary-button:hover,
.asowp-theme-secondary-button:focus,
.asowp-theme-secondary-button:active {
  color: #202223;
  background: #ffffff;
  border-color: #8c9196;
  box-shadow: none;
}

.asowp-theme-primary-button {
  color: #ffffff;
  background: #008060;
  border: 1px solid #006e52;
}

.asowp-theme-primary-button:hover,
.asowp-theme-primary-button:focus,
.asowp-theme-primary-button:active {
  color: #ffffff;
  background: #006e52;
  border-color: #005c45;
  box-shadow: none;
}

.asowp-theme-secondary-button:disabled,
.asowp-theme-primary-button:disabled {
  cursor: default;
  opacity: 0.75;
}

.asowp-theme-spin {
  width: 14px;
  height: 14px;
  animation: asowp-theme-spin 800ms linear infinite;
}

.asowp-theme-section-menu {
  position: sticky;
  top: 46px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 14px;
  align-self: start;
}

.asowp-theme-section-menu h2 {
  margin-bottom: 2px;
}

.asowp-theme-section-menu button {
  width: 100%;
  min-height: 34px;
  padding: 8px 10px;
  color: #111827;
  background: #ffffff;
  border: 1px solid #dfe3e8;
  border-radius: 10px;
  font-size: 12px;
  line-height: 16px;
  font-weight: 700;
  text-align: left;
  cursor: pointer;
  outline: none;
  box-shadow: none;
}

.asowp-theme-section-menu button:hover,
.asowp-theme-section-menu button:focus,
.asowp-theme-section-menu button:active {
  color: #111827;
  background: #ffffff;
  border-color: #c9cccf;
  box-shadow: none;
}

@keyframes asowp-theme-spin {
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 1100px) {
  .asowp-theme-page {
    grid-template-columns: 1fr;
  }

  .asowp-theme-section-menu {
    position: static;
    order: -1;
  }
}

@media (max-width: 900px) {
  .asowp-theme-color-grid,
  .asowp-theme-skins {
    grid-template-columns: 1fr;
  }
}
</style>
