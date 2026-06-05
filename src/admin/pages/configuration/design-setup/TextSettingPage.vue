<template>
  <div class="asowp-text-settings">
    <section class="asowp-card">
      <div class="asowp-card-body asowp-header-card">
        <div>
          <h1>{{ __("Text Setting", "all-signs-options-pro") }}</h1>
          <p>
            {{
              __(
                "Bring text configuration closer to the core setup, while keeping the same classic save location.",
                "all-signs-options-pro"
              )
            }}
          </p>
        </div>
      </div>
    </section>

    <section class="asowp-card">
      <div class="asowp-card-body">
        <div class="asowp-section-head">
          <div>
            <h2>{{ __("Text Access", "all-signs-options-pro") }}</h2>
            <p>{{ __("Decide whether this configuration should expose text customization.", "all-signs-options-pro") }}</p>
          </div>
          <button class="asowp-disclosure-button" type="button" @click="togglePanel('access')">
            {{ openPanels.access ? __("Show less", "all-signs-options-pro") : __("Show more", "all-signs-options-pro") }}
            <ChevronUpIcon v-if="openPanels.access" class="asowp-icon" />
            <ChevronDownIcon v-else class="asowp-icon" />
          </button>
        </div>
        <div v-if="openPanels.access" class="asowp-panel-content">
          <ToggleRow v-model="text.active" />
        </div>
      </div>
    </section>

    <section class="asowp-card">
      <div class="asowp-card-body">
        <div class="asowp-section-head">
          <div>
            <h2>{{ __("QR Code", "all-signs-options-pro") }}</h2>
            <p>{{ __("Control whether QR code customization is available in this configuration.", "all-signs-options-pro") }}</p>
          </div>
          <button class="asowp-disclosure-button" type="button" @click="togglePanel('qr')">
            {{ openPanels.qr ? __("Show less", "all-signs-options-pro") : __("Show more", "all-signs-options-pro") }}
            <ChevronUpIcon v-if="openPanels.qr" class="asowp-icon" />
            <ChevronDownIcon v-else class="asowp-icon" />
          </button>
        </div>
        <div v-if="openPanels.qr" class="asowp-panel-content">
          <ToggleRow v-model="text.enableQrCode" />
        </div>
      </div>
    </section>

    <template v-if="text.active">
      <section class="asowp-card">
        <div class="asowp-card-body">
          <div class="asowp-section-head">
            <div>
              <h2>{{ __("Text Type", "all-signs-options-pro") }}</h2>
              <p>{{ __("Choose the main text rendering mode used by the configurator.", "all-signs-options-pro") }}</p>
            </div>
            <button class="asowp-disclosure-button" type="button" @click="togglePanel('type')">
              {{ openPanels.type ? __("Show less", "all-signs-options-pro") : __("Show more", "all-signs-options-pro") }}
              <ChevronUpIcon v-if="openPanels.type" class="asowp-icon" />
              <ChevronDownIcon v-else class="asowp-icon" />
            </button>
          </div>
          <div v-if="openPanels.type" class="asowp-panel-content">
            <div class="asowp-text-type-grid">
              <button
                v-for="type in textTypeOptions"
                :key="type.value"
                class="asowp-type-card"
                type="button"
                @click="setTextType(type.value)"
              >
                <span class="asowp-type-left">
                  <img :src="type.image" :alt="type.label" />
                  <strong>{{ type.label }}</strong>
                </span>
                <span :class="['asowp-toggle', text.textType === type.value ? 'is-active' : '']">
                  <span></span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <section class="asowp-card">
        <div class="asowp-card-body">
          <div class="asowp-section-head">
            <div>
              <h2>{{ __("Text Colors", "all-signs-options-pro") }}</h2>
              <p>{{ __("Manage predefined text colors and the optional custom color flow.", "all-signs-options-pro") }}</p>
            </div>
            <button class="asowp-disclosure-button" type="button" @click="togglePanel('colors')">
              {{ openPanels.colors ? __("Show less", "all-signs-options-pro") : __("Show more", "all-signs-options-pro") }}
              <ChevronUpIcon v-if="openPanels.colors" class="asowp-icon" />
              <ChevronDownIcon v-else class="asowp-icon" />
            </button>
          </div>
          <div v-if="openPanels.colors" class="asowp-panel-content">
            <label class="asowp-field asowp-label-field">
              <span>{{ __("Label", "all-signs-options-pro") }}</span>
              <input v-model="text.colorsLabel" type="text" autocomplete="off" />
            </label>

            <div class="asowp-color-grid">
              <article v-for="(color, index) in text.colors" :key="`text-color-${index}`" class="asowp-color-card">
                <div class="asowp-color-card-head">
                  <strong>{{ sprintf(__("Color %s", "all-signs-options-pro"), index + 1) }}</strong>
                  <button type="button" class="asowp-icon-danger" @click="removeColor(index)">
                    <Trash2Icon class="asowp-icon" />
                  </button>
                </div>
                <div class="asowp-color-row">
                  <label class="asowp-field asowp-color-name">
                    <span class="asowp-sr-only">{{ __("Color name", "all-signs-options-pro") }}</span>
                    <input v-model="color.name" type="text" :placeholder="__('Name', 'all-signs-options-pro')" autocomplete="off" />
                  </label>
                  <label class="asowp-field asowp-color-code">
                    <span>{{ __("Color", "all-signs-options-pro") }}</span>
                    <span class="asowp-color-inputs">
                      <input v-model="color.codeHex" type="color" @input="normalizeColor(index)" />
                      <input v-model="color.codeHex" type="text" autocomplete="off" @blur="normalizeColor(index)" />
                    </span>
                  </label>
                </div>
              </article>
            </div>

            <button type="button" class="asowp-secondary-button asowp-small-button" @click="addNewColor">
              {{ __("Add text color", "all-signs-options-pro") }}
            </button>

            <div class="asowp-custom-color-row">
              <div class="asowp-custom-toggle">
                <strong>{{ __("Enable Custom color", "all-signs-options-pro") }}</strong>
                <ToggleRow v-model="text.enableCustomColor" />
              </div>
              <label class="asowp-field asowp-upload-field">
                <span>{{ __("Custom color preview image", "all-signs-options-pro") }}</span>
                <span class="asowp-file-control">
                  <button type="button" class="asowp-primary-button asowp-file-button" @click.prevent="selectColorPrevImage">
                    {{ __("upload image", "all-signs-options-pro") }}
                  </button>
                  <span class="asowp-file-preview">
                    <img v-if="text.colorsPrevImg" :src="text.colorsPrevImg" alt="" />
                    <button v-if="text.colorsPrevImg" type="button" @click="text.colorsPrevImg = ''">
                      <Trash2Icon class="asowp-icon" />
                    </button>
                  </span>
                </span>
              </label>
            </div>
          </div>
        </div>
      </section>

      <section class="asowp-card">
        <div class="asowp-card-body">
          <div class="asowp-section-head">
            <div>
              <h2>{{ __("Font Size", "all-signs-options-pro") }}</h2>
              <p>{{ __("Configure whether the customer can change size and define the allowed bounds.", "all-signs-options-pro") }}</p>
            </div>
            <button class="asowp-disclosure-button" type="button" @click="togglePanel('fontSize')">
              {{ openPanels.fontSize ? __("Show less", "all-signs-options-pro") : __("Show more", "all-signs-options-pro") }}
              <ChevronUpIcon v-if="openPanels.fontSize" class="asowp-icon" />
              <ChevronDownIcon v-else class="asowp-icon" />
            </button>
          </div>
          <div v-if="openPanels.fontSize" class="asowp-panel-content">
            <div class="asowp-block-toggle">
              <strong>{{ __("Enable font size", "all-signs-options-pro") }}</strong>
              <ToggleRow v-model="text.enableFontSize.active" />
            </div>
            <div v-if="text.enableFontSize.active" class="asowp-form-grid asowp-three-cols">
              <label class="asowp-field">
                <span>{{ __("Minimum font size", "all-signs-options-pro") }}</span>
                <input v-model="text.enableFontSize.minimumFontSize" type="number" />
              </label>
              <label class="asowp-field">
                <span>{{ __("Maximum font size", "all-signs-options-pro") }}</span>
                <input v-model="text.enableFontSize.maximumFontSize" type="number" />
              </label>
              <label class="asowp-field">
                <span>{{ __("Default size", "all-signs-options-pro") }}</span>
                <input v-model="text.enableFontSize.defaultFontSize" type="number" />
              </label>
            </div>
          </div>
        </div>
      </section>

      <section class="asowp-card">
        <div class="asowp-card-body">
          <div class="asowp-section-head">
            <div>
              <h2>{{ __("Text Options", "all-signs-options-pro") }}</h2>
              <p>{{ __("Enable or disable the formatting tools available to the customer.", "all-signs-options-pro") }}</p>
            </div>
            <button class="asowp-disclosure-button" type="button" @click="togglePanel('options')">
              {{ openPanels.options ? __("Show less", "all-signs-options-pro") : __("Show more", "all-signs-options-pro") }}
              <ChevronUpIcon v-if="openPanels.options" class="asowp-icon" />
              <ChevronDownIcon v-else class="asowp-icon" />
            </button>
          </div>
          <div v-if="openPanels.options" class="asowp-panel-content">
            <div class="asowp-options-row">
              <div v-for="option in textOptionControls" :key="option.key" class="asowp-option-control">
                <button type="button" :class="['asowp-option-icon', option.className]" @click="text[option.key] = !text[option.key]">
                  <span v-if="option.key !== 'enableTextAlignment'">{{ option.icon }}</span>
                  <span v-else class="asowp-align-icon"><i></i><i></i><i></i></span>
                </button>
                <span>{{ option.label }}</span>
                <button type="button" :class="['asowp-toggle', text[option.key] ? 'is-active' : '']" @click="text[option.key] = !text[option.key]">
                  <span></span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </template>

    <div class="asowp-save-row">
      <button type="button" class="asowp-primary-button" :disabled="isLoading" @click="updateTextSettings">
        <img v-if="isLoading" src="@/../assets/icons/ic_loading_gray.svg" alt="" />
        {{ isLoading ? __("Saving...", "all-signs-options-pro") : __("Save Text", "all-signs-options-pro") }}
      </button>
    </div>
  </div>
</template>

<script setup>
import api from "@/admin/Api/api";
import toastMessage from "@/admin/utils/functions";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  Trash2Icon,
} from "lucide-vue-next";
import { defineComponent, h, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { __, sprintf } from "@wordpress/i18n";
import textNormalImg from "@/../assets/images/text-types/text-normal.png";
import textNeonImg from "@/../assets/images/text-types/text-neon.png";
import text3dImg from "@/../assets/images/text-types/text-3d.png";

const ToggleRow = defineComponent({
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    return () =>
      h("span", { class: "asowp-toggle-row" }, [
        h("span", { class: "asowp-toggle-label" }, "No"),
        h(
          "button",
          {
            type: "button",
            class: ["asowp-toggle", props.modelValue ? "is-active" : ""],
            onClick: () => emit("update:modelValue", !props.modelValue),
          },
          [h("span")]
        ),
        h("span", { class: "asowp-toggle-label" }, "Yes"),
      ]);
  },
});

const props = defineProps({
  data: Object,
  fetchSettings: Function,
});

const route = useRoute();
const configId = ref(route.params.configId);
const isLoading = ref(false);

const openPanels = ref({
  access: true,
  qr: false,
  type: true,
  colors: true,
  fontSize: true,
  options: true,
});

const defaultTextColors = [
  { name: "Black", codeHex: "#000000" },
  { name: "White", codeHex: "#FFFFFF" },
  { name: "Blue", codeHex: "#004FB6" },
  { name: "Red", codeHex: "#C4271D" },
  { name: "Pink", codeHex: "#EB5377" },
  { name: "Green", codeHex: "#009251" },
  { name: "Yellow", codeHex: "#FFEE00" },
  { name: "Grey", codeHex: "#AF5758" },
  { name: "Orange", codeHex: "#E5610E" },
  { name: "Purple", codeHex: "#554585" },
  { name: "Brown", codeHex: "#523C2A" },
];

const defaultText = () => ({
  active: true,
  enableQrCode: false,
  selectedFonts: [],
  colorsLabel: "Text Colors",
  colors: defaultTextColors.map((color) => ({ ...color })),
  enableCustomColor: true,
  colorsPrevImg: "",
  enableFontSize: {
    active: true,
    minimumFontSize: 4,
    maximumFontSize: 100,
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
});

const normalizeTextColor = (color) => ({
  name: String(color?.name || ""),
  codeHex: formatHex(color?.codeHex || "#FFFFFF"),
  additionalPrice: color?.additionalPrice ?? 0,
});

const mergeTextData = (data) => {
  const defaults = defaultText();
  const loadedColors = Array.isArray(data?.colors) && data.colors.length > 0
    ? data.colors.map(normalizeTextColor)
    : defaults.colors;

  return {
    ...defaults,
    ...(data || {}),
    active: typeof data?.active === "boolean" ? data.active : defaults.active,
    enableQrCode: typeof data?.enableQrCode === "boolean" ? data.enableQrCode : defaults.enableQrCode,
    colors: loadedColors,
    enableFontSize: {
      ...defaults.enableFontSize,
      ...(data?.enableFontSize || {}),
    },
  };
};

const text = ref(defaultText());

const textTypeOptions = [
  { value: "normal", label: "NORMAL", image: textNormalImg },
  { value: "neon", label: "NEON", image: textNeonImg },
  { value: "3D", label: "3D", image: text3dImg },
];

const textOptionControls = [
  { key: "enableBold", label: "Bold", icon: "B", className: "is-bold" },
  { key: "enableUnderline", label: "Underline", icon: "U", className: "is-underline" },
  { key: "enableOverline", label: "Overline", icon: "O", className: "is-overline" },
  { key: "enableStrike", label: "Strike-through", icon: "S", className: "is-strike" },
  { key: "enableItalic", label: "Italic", icon: "I", className: "is-italic" },
  { key: "enableOpacity", label: "Opacity", icon: "O", className: "is-opacity" },
  { key: "enableBorder", label: "Bolder", icon: "B", className: "is-border" },
  { key: "enableTextAlignment", label: "Text Alignment", icon: "", className: "is-align" },
];

onMounted(() => {
  text.value = mergeTextData(props.data || {});
});

const togglePanel = (key) => {
  openPanels.value[key] = !openPanels.value[key];
};

const setTextType = (value) => {
  text.value.textType = value;
};

const formatHex = (value) => {
  let next = String(value || "").trim();
  if (!next) return "#FFFFFF";
  if (!next.startsWith("#")) next = `#${next}`;
  return next.toUpperCase();
};

const normalizeColor = (index) => {
  text.value.colors[index].codeHex = formatHex(text.value.colors[index].codeHex);
};

const addNewColor = () => {
  text.value.colors.push({ name: "", codeHex: "#FFFFFF", additionalPrice: 0 });
};

const removeColor = (index) => {
  text.value.colors.splice(index, 1);
};

const selectColorPrevImage = (event) => {
  event?.preventDefault?.();
  const uploader = wp
    .media({
      title: __("Select Custom Text Color Preview Image", "all-signs-options-pro"),
      button: {
        text: __("Select Image", "all-signs-options-pro"),
      },
      multiple: false,
    })
    .on("select", () => {
      const selection = uploader.state().get("selection");
      selection.map((attachment) => {
        const image = attachment.toJSON();
        if (image.type === "image") {
          text.value.colorsPrevImg = image.url;
        }
      });
    });

  uploader.open();
};

const updateTextSettings = async () => {
  if (isLoading.value) return;
  isLoading.value = true;

  try {
    const result = await api.updateCustomizerSignsText(configId.value, text.value);
    if (result?.success) {
      await props.fetchSettings?.();
      toastMessage(result.message || __("Text settings saved", "all-signs-options-pro"));
    } else {
      toastMessage(result?.message || __("Unable to save text settings", "all-signs-options-pro"), "error");
    }
  } finally {
    isLoading.value = false;
  }
};
</script>

<style>
.asowp-text-settings {
  display: grid;
  gap: 12px;
}

.asowp-card {
  background: #ffffff;
  border: 1px solid #dfe3e8;
  border-radius: 10px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.08);
}

.asowp-card-body {
  padding: 16px 18px;
}

.asowp-header-card h1,
.asowp-section-head h2 {
  margin: 0;
  color: #303030;
  font-size: 15px;
  line-height: 20px;
  font-weight: 900;
}

.asowp-header-card p,
.asowp-section-head p {
  margin: 2px 0 0;
  color: #616161;
  font-size: 11px;
  line-height: 15px;
}

.asowp-section-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}

.asowp-disclosure-button,
.asowp-secondary-button,
.asowp-primary-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  height: 30px;
  padding: 0 12px;
  border-radius: 7px;
  border: 1px solid #c9cccf;
  background: #ffffff;
  color: #303030;
  font-size: 12px;
  line-height: 16px;
  font-weight: 900;
  cursor: pointer;
  text-decoration: none;
}

.asowp-primary-button {
  border-color: #005f59;
  background: #007a72;
  color: #ffffff;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.25);
}

.asowp-primary-button:hover,
.asowp-primary-button:focus {
  background: #00645f;
  color: #ffffff;
}

.asowp-primary-button:disabled {
  border-color: #d1d1d1;
  background: #d4d4d4;
  color: #ffffff;
  cursor: default;
}

.asowp-secondary-button:hover,
.asowp-disclosure-button:hover {
  background: #f6f6f7;
  color: #303030;
}

.asowp-small-button {
  width: fit-content;
  height: 28px;
  margin-top: 10px;
  padding: 0 10px;
}

.asowp-icon {
  width: 16px;
  height: 16px;
}

.asowp-panel-content {
  padding-top: 12px;
}

.asowp-toggle-row {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.asowp-toggle-label {
  color: #616161;
  font-size: 12px;
  line-height: 16px;
}

.asowp-toggle {
  position: relative;
  width: 40px;
  height: 22px;
  padding: 0;
  border: 0;
  border-radius: 999px;
  background: #d8dee9;
  cursor: pointer;
  transition: background 0.15s ease;
}

.asowp-toggle span {
  position: absolute;
  top: 3px;
  left: 3px;
  width: 16px;
  height: 16px;
  border-radius: 999px;
  background: #ffffff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.28);
  transition: transform 0.15s ease;
}

.asowp-toggle.is-active {
  background: #007a72;
}

.asowp-toggle.is-active span {
  transform: translateX(18px);
}

.asowp-text-type-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
}

.asowp-type-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  min-height: 64px;
  padding: 12px;
  border: 1px solid #dfe3e8;
  border-radius: 7px;
  background: #ffffff;
  color: #303030;
  cursor: pointer;
}

.asowp-type-left {
  display: inline-flex;
  align-items: center;
  gap: 12px;
}

.asowp-type-card img {
  width: 48px;
  height: 48px;
  object-fit: contain;
  border: 1px solid #dfe3e8;
  border-radius: 6px;
  background: #f7f8fa;
}

.asowp-type-card strong,
.asowp-block-toggle strong,
.asowp-custom-toggle strong {
  color: #303030;
  font-size: 12px;
  line-height: 16px;
  font-weight: 900;
}

.asowp-field {
  display: grid;
  gap: 4px;
  color: #303030;
  font-size: 12px;
  line-height: 16px;
}

.asowp-field > span:first-child {
  font-weight: 400;
}

.asowp-field input {
  width: 100%;
  min-height: 36px;
  margin: 0;
  padding: 7px 10px;
  border: 1px solid #8c9196;
  border-radius: 7px;
  background: #ffffff;
  color: #303030;
  font-size: 13px;
  line-height: 18px;
  box-shadow: none;
}

.asowp-label-field {
  max-width: 320px;
  margin-bottom: 12px;
}

.asowp-color-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}

.asowp-color-card {
  padding: 10px;
  border: 1px solid #dfe3e8;
  border-radius: 7px;
  background: #ffffff;
}

.asowp-color-card-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 8px;
}

.asowp-color-card-head strong {
  color: #303030;
  font-size: 11px;
  line-height: 14px;
  font-weight: 900;
}

.asowp-icon-danger {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  padding: 0;
  border: 0;
  background: transparent;
  color: #b42318;
  cursor: pointer;
}

.asowp-color-row {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 120px;
  align-items: end;
  gap: 8px;
}

.asowp-color-inputs {
  display: grid;
  grid-template-columns: 32px minmax(0, 1fr);
  gap: 6px;
}

.asowp-color-inputs input[type="color"] {
  min-height: 34px;
  padding: 3px;
  cursor: pointer;
}

.asowp-custom-color-row {
  display: grid;
  grid-template-columns: 210px minmax(0, 1fr);
  gap: 16px;
  align-items: end;
  margin-top: 12px;
}

.asowp-custom-toggle,
.asowp-block-toggle {
  display: grid;
  gap: 6px;
}

.asowp-file-control {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  align-items: stretch;
  min-height: 36px;
  border: 1px solid #8c9196;
  border-radius: 7px;
  background: #ffffff;
  overflow: hidden;
}

.asowp-file-button {
  height: 30px;
  margin: 3px;
}

.asowp-file-preview {
  position: relative;
  min-height: 34px;
}

.asowp-file-preview img {
  position: absolute;
  inset: 3px 38px auto auto;
  width: 44px;
  height: 28px;
  object-fit: cover;
  border-radius: 5px;
}

.asowp-file-preview button {
  position: absolute;
  right: 3px;
  top: 5px;
  width: 24px;
  height: 24px;
  padding: 0;
  border: 0;
  background: transparent;
  color: #b42318;
  cursor: pointer;
}

.asowp-form-grid {
  display: grid;
  gap: 14px;
  margin-top: 12px;
}

.asowp-three-cols {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.asowp-options-row {
  display: flex;
  flex-wrap: wrap;
  gap: 18px 24px;
  align-items: flex-start;
}

.asowp-option-control {
  display: grid;
  justify-items: center;
  gap: 4px;
  color: #303030;
  font-size: 9px;
  line-height: 12px;
  min-width: 64px;
}

.asowp-option-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 28px;
  height: 26px;
  padding: 0 8px;
  border: 1px solid #c9cccf;
  border-radius: 4px;
  background: #ffffff;
  color: #303030;
  font-size: 14px;
  line-height: 1;
  cursor: pointer;
}

.asowp-option-icon.is-bold {
  font-weight: 900;
}

.asowp-option-icon.is-underline {
  text-decoration: underline;
}

.asowp-option-icon.is-overline {
  text-decoration: overline;
}

.asowp-option-icon.is-strike {
  text-decoration: line-through;
}

.asowp-option-icon.is-italic {
  font-style: italic;
}

.asowp-option-icon.is-opacity span {
  opacity: 0.55;
}

.asowp-option-icon.is-border {
  -webkit-text-stroke: 0.5px #303030;
}

.asowp-align-icon {
  display: grid;
  gap: 3px;
  width: 18px;
}

.asowp-align-icon i {
  display: block;
  height: 2px;
  border-radius: 999px;
  background: #303030;
}

.asowp-align-icon i:nth-child(2) {
  width: 70%;
}

.asowp-save-row {
  display: flex;
  justify-content: flex-end;
  padding-top: 2px;
}

.asowp-save-row img {
  width: 14px;
  height: 14px;
}

.asowp-sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

@media (max-width: 1180px) {
  .asowp-color-grid,
  .asowp-text-type-grid,
  .asowp-three-cols {
    grid-template-columns: 1fr;
  }

  .asowp-custom-color-row {
    grid-template-columns: 1fr;
  }
}
</style>
