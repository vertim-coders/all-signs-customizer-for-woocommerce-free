<template>
  <section class="asowp-sign-part">
    <header class="asowp-sign-part-header">
      <h1>Sign Part</h1>
      <p>Configure double-sided sign behavior from Editor Setup while keeping the classic save location unchanged.</p>
    </header>

    <div class="asowp-sign-part-card">
      <div class="asowp-sign-part-card-head">
        <h2>Sign Part</h2>
        <p>Enable double-sided setup and define its pricing behavior.</p>
      </div>

      <div class="asowp-sign-part-body">
        <div class="asowp-sign-part-toggle-row">
          <strong>Enable SIGN Part</strong>
          <SwitchControl v-model="signPart.doublePart.active" />
        </div>

        <template v-if="signPart.doublePart.active">
          <div class="asowp-sign-part-field">
            <label>Label</label>
            <input v-model="signPart.doublePart.label" type="text" />
          </div>

          <div class="asowp-sign-part-grid asowp-sign-part-grid-2">
            <div class="asowp-sign-part-field">
              <label>Part 1</label>
              <input v-model="signPart.doublePart.part1" type="text" />
            </div>
            <div class="asowp-sign-part-field">
              <label>Part 2</label>
              <input v-model="signPart.doublePart.part2" type="text" />
            </div>
          </div>

          <div class="asowp-sign-part-toggle-row">
            <strong>Enable Copy design from side</strong>
            <SwitchControl v-model="signPart.doublePart.enableCopyDesignFromSide" />
          </div>

          <section class="asowp-sign-part-pricing">
            <h3>Double-sided pricing</h3>
            <p>When the customer activates double-sided in the configurator, the selected pricing is applied to the total price.</p>

            <div class="asowp-sign-part-grid asowp-sign-part-pricing-grid">
              <div class="asowp-sign-part-field">
                <label>Pricing type</label>
                <select v-model="signPart.doublePart.pricing.type">
                  <option value="additional">Additional price (+)</option>
                  <option value="multiplier">Multiplier (x)</option>
                </select>
              </div>

              <div v-if="signPart.doublePart.pricing.type === 'additional'" class="asowp-sign-part-field">
                <label>Additional price for double-sided</label>
                <div class="asowp-sign-part-prefix-field">
                  <span>+</span>
                  <input v-model="signPart.doublePart.pricing.additionalPrice" type="text" />
                </div>
                <p>This amount is added to the total price when the customer activates double-sided.</p>
              </div>

              <div v-else class="asowp-sign-part-field">
                <label>Multiplier for double-sided</label>
                <div class="asowp-sign-part-prefix-field">
                  <span>x</span>
                  <input v-model="signPart.doublePart.pricing.multiplier" type="text" />
                </div>
                <p>The total price is multiplied by this value when the customer activates double-sided.</p>
              </div>
            </div>
          </section>
        </template>
      </div>

      <div class="asowp-sign-part-save-row">
        <button type="button" class="asowp-sign-part-primary" :disabled="isLoading" @click="updateSignPartSettings">
          {{ isLoading ? 'Saving...' : 'Save Sign Part' }}
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import api from '@/admin/Api/api';
import toastMessage from '@/admin/utils/functions';
import { defineComponent, h, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const props = defineProps({
  data: Object,
  fetchSettings: Function,
});

const route = useRoute();
const configId = ref(route.params.configId);
const isLoading = ref(false);

const defaultSignPart = () => ({
  doublePart: {
    active: false,
    label: 'Switch Face',
    part1: 'Face A',
    part2: 'Face B',
    enableCopyDesignFromSide: true,
    pricing: {
      type: 'additional',
      additionalPrice: 0,
      multiplier: 1,
    },
  },
});

const signPart = ref(defaultSignPart());

const mergeSettings = (loaded = {}) => {
  const defaults = defaultSignPart();
  signPart.value = {
    ...defaults,
    ...loaded,
    doublePart: {
      ...defaults.doublePart,
      ...(loaded.doublePart || {}),
      pricing: {
        ...defaults.doublePart.pricing,
        ...(loaded.doublePart?.pricing || {}),
      },
    },
  };
};

watch(() => props.data, (data) => {
  mergeSettings(data || {});
}, {
  immediate: true,
});

const updateSignPartSettings = async () => {
  if (isLoading.value) return;
  isLoading.value = true;

  try {
    const result = await api.updateCustomizerSignsSignPart(configId.value, signPart.value);
    if (result.success) {
      await props.fetchSettings?.();
      toastMessage(result.message || 'Sign part settings updated successfully', 'success');
    } else {
      toastMessage(result.message || 'An error occurred', 'error');
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
          class: ['asowp-sign-part-switch', { 'is-on': componentProps.modelValue }],
          onClick: () => emit('update:modelValue', !componentProps.modelValue),
        },
        [h('span')],
      );
  },
});
</script>

<style>
.asowp-sign-part {
  display: grid;
  gap: 12px;
  color: #202223;
  font-size: 13px;
}

.asowp-sign-part-header,
.asowp-sign-part-card {
  background: #fff;
  border: 1px solid #d8dee4;
  border-radius: 8px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.08);
}

.asowp-sign-part-header {
  padding: 26px 28px;
}

.asowp-sign-part-header h1,
.asowp-sign-part-card h2,
.asowp-sign-part-pricing h3 {
  margin: 0;
  color: #303030;
  font-weight: 800;
  line-height: 1.25;
}

.asowp-sign-part-header h1 {
  font-size: 18px;
}

.asowp-sign-part-card h2,
.asowp-sign-part-pricing h3 {
  font-size: 14px;
}

.asowp-sign-part-header p,
.asowp-sign-part-card p {
  margin: 4px 0 0;
  color: #5f6368;
  font-size: 12px;
  line-height: 1.38;
}

.asowp-sign-part-card {
  padding: 22px 28px;
}

.asowp-sign-part-card-head {
  margin-bottom: 18px;
}

.asowp-sign-part-body {
  display: grid;
  gap: 18px;
}

.asowp-sign-part-toggle-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.asowp-sign-part-toggle-row strong {
  color: #303030;
  font-size: 12px;
  font-weight: 600;
}

.asowp-sign-part-grid {
  display: grid;
  gap: 16px 20px;
}

.asowp-sign-part-grid-2 {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.asowp-sign-part-pricing-grid {
  grid-template-columns: minmax(0, 260px) minmax(0, 260px);
  align-items: start;
}

.asowp-sign-part-field {
  display: grid;
  gap: 6px;
}

.asowp-sign-part-field label {
  color: #303030;
  font-size: 12px;
  font-weight: 500;
}

.asowp-sign-part-field input,
.asowp-sign-part-field select,
.asowp-sign-part-prefix-field {
  width: 100%;
  min-height: 34px;
  border: 1px solid #8c9196;
  border-radius: 6px;
  background: #fff;
  color: #303030;
  font-size: 13px;
}

.asowp-sign-part-field input,
.asowp-sign-part-field select {
  padding: 6px 10px;
}

.asowp-sign-part-field p {
  max-width: 340px;
  margin: 0;
  color: #5f6368;
  font-size: 12px;
  line-height: 1.35;
}

.asowp-sign-part-prefix-field {
  display: flex;
  align-items: center;
  overflow: hidden;
}

.asowp-sign-part-prefix-field span {
  flex: 0 0 28px;
  color: #303030;
  text-align: center;
  font-size: 13px;
}

.asowp-sign-part-prefix-field input {
  min-height: 32px;
  border: 0;
  border-radius: 0;
}

.asowp-sign-part-prefix-field input:focus {
  outline: none;
  box-shadow: none;
}

.asowp-sign-part-pricing {
  display: grid;
  gap: 14px;
  padding-top: 16px;
}

.asowp-sign-part-save-row {
  display: flex;
  justify-content: flex-end;
  padding-top: 16px;
}

.asowp-sign-part-switch,
.asowp-sign-part-primary {
  appearance: none;
  cursor: pointer;
  font-family: inherit;
}

.asowp-sign-part-switch {
  position: relative;
  width: 34px;
  height: 20px;
  padding: 0;
  border: 0;
  border-radius: 999px;
  background: #d8dee8;
  transition: background 0.15s ease;
}

.asowp-sign-part-switch span {
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

.asowp-sign-part-switch.is-on {
  background: #007a73;
}

.asowp-sign-part-switch.is-on span {
  transform: translateX(14px);
}

.asowp-sign-part-primary,
.asowp-sign-part-primary:hover,
.asowp-sign-part-primary:focus {
  min-height: 30px;
  padding: 6px 14px;
  border: 1px solid #006c67;
  border-radius: 7px;
  background: #007a73;
  color: #fff;
  font-size: 12px;
  font-weight: 800;
  line-height: 1;
  text-decoration: none;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.25);
}

.asowp-sign-part-primary:disabled {
  cursor: not-allowed;
  background: #d1d1d1;
  border-color: #d1d1d1;
}

@media (max-width: 900px) {
  .asowp-sign-part-grid-2,
  .asowp-sign-part-pricing-grid {
    grid-template-columns: 1fr;
  }
}
</style>
