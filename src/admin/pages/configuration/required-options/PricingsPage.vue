<template>
  <div class="asowp-pricing-page asowp-space-y-3">
    <template v-if="!showForm">
      <div class="asowp-pricing-header asowp-bg-white asowp-rounded-xl asowp-border asowp-border-solid asowp-border-[#dfe3e8] asowp-px-5 asowp-py-4 asowp-flex asowp-items-center asowp-justify-between">
        <div>
          <h2 class="asowp-text-[16px] asowp-leading-6 asowp-font-[900] asowp-text-[#303030] asowp-m-0">{{ __('Pricing', 'all-signs-options-pro') }}</h2>
          <p class="asowp-text-[12px] asowp-leading-4 asowp-text-[#6b7280] asowp-m-0">
            {{ __('Create pricing profiles for custom size rules only. Regular sizes keep their own pricing in the size records.', 'all-signs-options-pro') }}
          </p>
        </div>
        <button
          @click="addPricing"
          class="asowp-inline-flex asowp-items-center asowp-gap-2 asowp-px-3 asowp-py-1.5 asowp-bg-[#007a72] asowp-text-white asowp-text-[12px] asowp-leading-4 asowp-font-[900] asowp-border-none asowp-rounded-md asowp-cursor-pointer hover:asowp-bg-[#00645f]"
        >
          <PlusIcon class="asowp-w-3.5 asowp-h-3.5" />
          {{ __('Add new pricing', 'all-signs-options-pro') }}
        </button>
      </div>

      <div class="asowp-pricing-card asowp-bg-white asowp-rounded-xl asowp-border asowp-border-solid asowp-border-[#dfe3e8] asowp-p-5">
        <h3 class="asowp-text-[14px] asowp-font-[900] asowp-text-[#303030] asowp-mt-0 asowp-mb-3">{{ __('Pricing List', 'all-signs-options-pro') }}</h3>
        <div class="asowp-pricing-table-wrap">
          <table class="asowp-pricing-table asowp-w-full asowp-border-collapse">
            <thead>
              <tr class="asowp-bg-[#f3f3f3]">
                <th class="asowp-py-2 asowp-px-3 asowp-text-left asowp-text-[11px] asowp-font-bold asowp-text-[#6b7280]">{{ __('Label', 'all-signs-options-pro') }}</th>
                <th class="asowp-py-2 asowp-px-3 asowp-text-left asowp-text-[11px] asowp-font-bold asowp-text-[#6b7280]">{{ __('Shipping', 'all-signs-options-pro') }}</th>
                <th class="asowp-py-2 asowp-px-3 asowp-text-left asowp-text-[11px] asowp-font-bold asowp-text-[#6b7280]">{{ __('Actions', 'all-signs-options-pro') }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="isFetching">
                <td colspan="3" class="asowp-table-loader-cell asowp-p-8 asowp-text-center">
                  <Loader2Icon class="asowp-table-loader-icon asowp-w-7 asowp-h-7" />
                </td>
              </tr>
              <template v-else>
                <tr
                  v-for="(item, key) in pricingSettings.priceOptions"
                  :key="key"
                  class="asowp-pricing-row asowp-border-b asowp-border-solid asowp-border-[#eceff2] last:asowp-border-b-0"
                  @click="editPricing(key)"
                >
                  <td class="asowp-py-2.5 asowp-px-3">
                    <span class="asowp-text-[13px] asowp-font-[900] asowp-text-[#303030]">
                      {{ item.label || sprintf(__('Pricing %d', 'all-signs-options-pro'), key + 1) }}
                    </span>
                  </td>
                  <td class="asowp-py-2.5 asowp-px-3 asowp-text-[13px] asowp-text-[#303030]">
                    {{ item.customPricing.shippingMethod === 'per-weight' ? __('Weight', 'all-signs-options-pro') : __('Size-based', 'all-signs-options-pro') }}
                  </td>
                  <td class="asowp-py-2.5 asowp-px-3">
                    <div class="asowp-pricing-actions-menu" @click.stop>
                      <button @click="toggleActions(key)" class="asowp-ellipsis-button" :aria-label="__('Pricing actions', 'all-signs-options-pro')">
                        <MoreHorizontalIcon class="asowp-w-4 asowp-h-4" />
                      </button>
                      <div v-if="openActionIndex === key" class="asowp-actions-popover">
                        <button @click="editPricing(key)">
                          <Edit2Icon class="asowp-w-3.5 asowp-h-3.5" />
                          {{ __('Edit', 'all-signs-options-pro') }}
                        </button>
                        <button @click="duplicatePricing(key)">
                          <CopyIcon class="asowp-w-3.5 asowp-h-3.5" />
                          {{ __('Duplicate', 'all-signs-options-pro') }}
                        </button>
                        <button class="is-danger" @click="deletePricing(key)">
                          <Trash2Icon class="asowp-w-3.5 asowp-h-3.5" />
                          {{ __('Delete', 'all-signs-options-pro') }}
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
      </div>
    </template>

    <template v-else>
      <div class="asowp-pricing-card asowp-bg-white asowp-rounded-xl asowp-border asowp-border-solid asowp-border-[#dfe3e8] asowp-p-4">
        <div class="asowp-flex asowp-justify-end">
          <button @click="closeForm" class="asowp-secondary-button">{{ __('Back to pricings', 'all-signs-options-pro') }}</button>
        </div>
      </div>

      <div class="asowp-pricing-editor asowp-bg-white asowp-rounded-xl asowp-border asowp-border-solid asowp-border-[#dfe3e8] asowp-p-5">
        <div>
          <label>{{ __('Label', 'all-signs-options-pro') }}</label>
          <input type="text" v-model.trim="editingPricing.label">
          <p>{{ __('Internal name used to identify this pricing profile.', 'all-signs-options-pro') }}</p>
        </div>

        <div class="asowp-pricing-divider"></div>

        <section class="asowp-pricing-section">
          <div class="asowp-flex asowp-items-start asowp-justify-between asowp-gap-4">
            <div>
              <h3>{{ __('Custom size pricing', 'all-signs-options-pro') }}</h3>
              <p>{{ __('Define the pricing rules for custom size ranges.', 'all-signs-options-pro') }}</p>
            </div>
          </div>

          <div class="asowp-pricing-options-card">
            <div class="asowp-pricing-toggle-row">
              <div>
                <h4>{{ __('Per-unit pricing', 'all-signs-options-pro') }}</h4>
                <p>{{ sprintf(__('Charge per %s instead of a flat price for the whole range.', 'all-signs-options-pro'), surfaceUnitLabel) }}</p>
              </div>
              <div class="asowp-flex asowp-items-center asowp-gap-3">
                <span class="asowp-text-[12px] asowp-text-[#616161]">{{ __('No', 'all-signs-options-pro') }}</span>
                <div
                  @click="togglePerUnit"
                  :class="[
                    'asowp-w-9 asowp-h-5 asowp-rounded-full asowp-relative asowp-cursor-pointer asowp-transition-colors',
                    editingPricing.customPricing.rangePricingPerUnit ? 'asowp-bg-[#007a72]' : 'asowp-bg-[#d9dee8]'
                  ]"
                >
                  <div :class="['asowp-absolute asowp-top-0.5 asowp-w-4 asowp-h-4 asowp-rounded-full asowp-bg-white asowp-shadow asowp-transition-all', editingPricing.customPricing.rangePricingPerUnit ? 'asowp-right-0.5' : 'asowp-left-0.5']"></div>
                </div>
                <span class="asowp-text-[12px] asowp-text-[#616161]">{{ __('Yes', 'all-signs-options-pro') }}</span>
              </div>            </div>

            <div class="asowp-pricing-divider"></div>

            <div class="asowp-pricing-toggle-row">
              <div>
                <h4>{{ __('Weight-based shipping', 'all-signs-options-pro') }}</h4>
                <p>{{ __('Use volumetric weight instead of the size range value.', 'all-signs-options-pro') }}</p>
              </div>
              <div class="asowp-flex asowp-items-center asowp-gap-3">
                <span class="asowp-text-[12px] asowp-text-[#616161]">{{ __('No', 'all-signs-options-pro') }}</span>
                <div
                  @click="toggleWeightShipping"
                  :class="[
                    'asowp-w-9 asowp-h-5 asowp-rounded-full asowp-relative asowp-cursor-pointer asowp-transition-colors',
                    editingPricing.customPricing.shippingMethod === 'per-weight' ? 'asowp-bg-[#007a72]' : 'asowp-bg-[#d9dee8]'
                  ]"
                >
                  <div :class="['asowp-absolute asowp-top-0.5 asowp-w-4 asowp-h-4 asowp-rounded-full asowp-bg-white asowp-shadow asowp-transition-all', editingPricing.customPricing.shippingMethod === 'per-weight' ? 'asowp-right-0.5' : 'asowp-left-0.5']"></div>
                </div>
                <span class="asowp-text-[12px] asowp-text-[#616161]">{{ __('Yes', 'all-signs-options-pro') }}</span>
              </div>
            </div>
          </div>

          <p class="asowp-pricing-help">
            {{ sprintf(__('Each range applies from the previous size up to the current size. Surface is calculated automatically as size x size in %s.', 'all-signs-options-pro'), surfaceUnitLabel) }}
          </p>

          <div v-if="editingPricing.customPricing.shippingMethod === 'per-weight'" class="asowp-pricing-field">
            <label>{{ __('Volumetric divisor', 'all-signs-options-pro') }}</label>
            <input type="number" v-model.number="editingPricing.customPricing.divisorVolumetric">
            <p>{{ __('Used to convert parcel dimensions into volumetric weight for shipping.', 'all-signs-options-pro') }}</p>
          </div>

          <div class="asowp-space-y-3">
            <div
              v-for="(range, key) in editingPricing.customPricing.range"
              :key="key"
              class="asowp-pricing-range-card"
            >
              <div class="asowp-flex asowp-items-center asowp-justify-between asowp-gap-4">
                <h4>{{ sprintf(__('Range %d', 'all-signs-options-pro'), key + 1) }}</h4>
                <div class="asowp-flex asowp-items-center asowp-gap-2">
                  <button @click="openRangeModal(key)" class="asowp-action-button">
                    <Edit2Icon class="asowp-w-3.5 asowp-h-3.5" />
                    {{ __('Edit', 'all-signs-options-pro') }}
                  </button>
                  <button @click="removeRange(key)" class="asowp-delete-button">
                    <Trash2Icon class="asowp-w-3.5 asowp-h-3.5" />
                    {{ __('Delete', 'all-signs-options-pro') }}
                  </button>
                </div>
              </div>
              <p>
                {{ sprintf(__('Applied from %s to %s %s. Surface equivalent: %s to %s %s.', 'all-signs-options-pro'), rangeStart(key), range.size, measurementUnit, rangeSurfaceStart(key), rangeSurface(range.size), surfaceUnitLabel) }}
              </p>
              <p>
                {{ __('Base price:', 'all-signs-options-pro') }}
                {{ editingPricing.customPricing.rangePricingPerUnit ? `${range.basePrice} ${currencySymbol}/${surfaceUnitLabel}` : `${range.basePrice} ${currencySymbol}` }}
                · {{ __('Char price:', 'all-signs-options-pro') }} {{ range.charPrice }} {{ currencySymbol }}/char
              </p>
              <p>
                {{ __('Shipping:', 'all-signs-options-pro') }}
                {{ shippingLabel(range) }}
              </p>
            </div>
          </div>

          <button @click="openRangeModal()" class="asowp-secondary-button asowp-add-range-button asowp-mt-3">{{ __('Add range', 'all-signs-options-pro') }}</button>
        </section>

        <div class="asowp-pricing-actions">
          <button @click="closeForm" class="asowp-secondary-button">{{ __('Cancel', 'all-signs-options-pro') }}</button>
          <button @click="savePricing" :disabled="!canSavePricing || isLoading" class="asowp-primary-button">
            {{ isLoading ? __('Saving...', 'all-signs-options-pro') : __('Save pricing', 'all-signs-options-pro') }}
          </button>
        </div>
      </div>
    </template>

    <Teleport to="body">
      <div v-if="rangeModalOpen" class="asowp-range-modal-layer">
        <div class="asowp-range-modal-backdrop" @click="closeRangeModal"></div>
        <div class="asowp-range-modal">
          <div class="asowp-range-modal-header">
            <h3>{{ editingRangeIndex === null ? __('Add range', 'all-signs-options-pro') : sprintf(__('Edit range %d', 'all-signs-options-pro'), editingRangeIndex + 1) }}</h3>
            <button @click="closeRangeModal" type="button"><XIcon class="asowp-w-5 asowp-h-5" /></button>
          </div>
          <div class="asowp-range-modal-body">
            <div class="asowp-pricing-field">
              <label>{{ sprintf(__('Size (%s)', 'all-signs-options-pro'), measurementUnit) }}</label>
              <input type="number" v-model.number="rangeDraft.size">
              <p>{{ rangeHelpText }}</p>
            </div>
            <div class="asowp-pricing-field">
              <label>{{ editingPricing.customPricing.rangePricingPerUnit ? sprintf(__('Base price per %s', 'all-signs-options-pro'), surfaceUnitLabel) : __('Base price', 'all-signs-options-pro') }}</label>
              <input type="number" v-model.number="rangeDraft.basePrice">
            </div>
            <div class="asowp-pricing-field">
              <label>{{ __('Char price', 'all-signs-options-pro') }}</label>
              <input type="number" v-model.number="rangeDraft.charPrice">
            </div>
            <template v-if="editingPricing.customPricing.shippingMethod === 'per-weight'">
              <div class="asowp-pricing-field">
                <label>{{ sprintf(__('Width modifier (%s)', 'all-signs-options-pro'), measurementUnit) }}</label>
                <input type="number" v-model.number="rangeDraft.widthModifier">
              </div>
              <div class="asowp-pricing-field">
                <label>{{ sprintf(__('Height modifier (%s)', 'all-signs-options-pro'), measurementUnit) }}</label>
                <input type="number" v-model.number="rangeDraft.heightModifier">
              </div>
              <div class="asowp-pricing-field">
                <label>{{ sprintf(__('Length (%s)', 'all-signs-options-pro'), measurementUnit) }}</label>
                <input type="number" v-model.number="rangeDraft.length">
              </div>
            </template>
            <div class="asowp-pricing-field">
              <label>{{ shippingInputLabel }}</label>
              <input type="number" v-model.number="rangeDraft.shippingPrice">
            </div>
          </div>
          <div class="asowp-range-modal-actions">
            <button @click="closeRangeModal" class="asowp-secondary-button">{{ __('Cancel', 'all-signs-options-pro') }}</button>
            <button @click="saveRange" class="asowp-primary-button">{{ editingRangeIndex === null ? __('Add range', 'all-signs-options-pro') : __('Save changes', 'all-signs-options-pro') }}</button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import api from "@/admin/Api/api";
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import toastMessage from "@/admin/utils/functions";
import { CopyIcon, Edit2Icon, Loader2Icon, MoreHorizontalIcon, PlusIcon, Trash2Icon, XIcon } from "lucide-vue-next";
import { __, sprintf } from "@wordpress/i18n";

const route = useRoute();
const props = defineProps({
  materialId: {
    type: [String, Number],
    default: 0,
  },
});
const configID = ref(route.params.configId);
const materialId = computed(() => props.materialId ?? route.query.materialIndex ?? route.params.materialId ?? 0);

const isFetching = ref(true);
const isLoading = ref(false);
const showForm = ref(false);
const editingIndex = ref(null);
const rangeModalOpen = ref(false);
const editingRangeIndex = ref(null);
const openActionIndex = ref(null);

const measurementUnit = ref("mm");
const currencySymbol = ref("$");
const materialSizes = ref({});
const pricingSettings = ref({ label: "Pricing", description: "", priceOptions: [] });

const emptyPricing = () => ({
  label: "",
  customPricing: {
    rangePricingPerUnit: false,
    shippingMethod: "per-surface",
    divisorVolumetric: 5000,
    unit: { surface: 0, basePrice: 0, charPrice: 0 },
    range: [],
  },
});

const editingPricing = ref(emptyPricing());
const rangeDraft = ref(emptyRange());

const surfaceUnitLabel = computed(() => `${measurementUnit.value}²`);
const canSavePricing = computed(() => editingPricing.value.label.trim().length > 0);

const rangeStart = (index) => index === 0 ? 0 : Number(editingPricing.value.customPricing.range[index - 1]?.size || 0);
const rangeSurface = (size) => Number(size || 0) * Number(size || 0);
const rangeSurfaceStart = (index) => rangeSurface(rangeStart(index));

const rangeHelpText = computed(() => {
  const start = editingRangeIndex.value === null
    ? Number(editingPricing.value.customPricing.range.at(-1)?.size || 0)
    : rangeStart(editingRangeIndex.value);
  return sprintf(
    __('This range applies from %s to %s %s. Surface equivalent: %s to %s %s.', 'all-signs-options-pro'),
    start,
    Number(rangeDraft.value.size || 0),
    measurementUnit.value,
    rangeSurface(start),
    rangeSurface(rangeDraft.value.size),
    surfaceUnitLabel.value
  );
});

const shippingInputLabel = computed(() => {
  if (editingPricing.value.customPricing.shippingMethod === "per-weight") {
    return __("Shipping price per kg", "all-signs-options-pro");
  }
  return editingPricing.value.customPricing.rangePricingPerUnit
    ? sprintf(__("Shipping per %s", "all-signs-options-pro"), surfaceUnitLabel.value)
    : __("Shipping price", "all-signs-options-pro");
});

function emptyRange(startSize = 0) {
  return {
    size: Number(startSize) + 1,
    basePrice: 0,
    charPrice: 0,
    shippingPrice: 0,
    widthModifier: 0,
    heightModifier: 0,
    length: 0,
  };
}

const toNumber = (value, fallback = 0) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const normalizeCustomPricing = (value = {}) => ({
  rangePricingPerUnit: Boolean(value.rangePricingPerUnit),
  shippingMethod: value.shippingMethod === "per-weight" ? "per-weight" : "per-surface",
  divisorVolumetric: toNumber(value.divisorVolumetric, 5000),
  unit: {
    surface: toNumber(value.unit?.surface, 0),
    basePrice: toNumber(value.unit?.basePrice, 0),
    charPrice: toNumber(value.unit?.charPrice, 0),
  },
  range: Array.isArray(value.range)
    ? value.range.map((item) => ({
        size: toNumber(item?.size ?? item?.surface, 0),
        basePrice: toNumber(item?.basePrice, 0),
        charPrice: toNumber(item?.charPrice, 0),
        shippingPrice: toNumber(item?.shippingPrice ?? item?.pricePerSqCm, 0),
        widthModifier: toNumber(item?.widthModifier, 0),
        heightModifier: toNumber(item?.heightModifier, 0),
        length: toNumber(item?.length, 0),
      }))
    : [],
});

const normalizePricingOption = (item = {}) => ({
  label: String(item.label || ""),
  customPricing: normalizeCustomPricing(item.customPricing || item.customSizePricing || item.pricings || {}),
});

const buildFallbackPricing = () => ({
  label: "Default pricing",
  customPricing: normalizeCustomPricing(materialSizes.value?.customSize?.pricings || {}),
});

const normalizePricingSettings = () => {
  const stored = materialSizes.value?.pricing || {};
  const storedOptions = Array.isArray(stored.priceOptions) ? stored.priceOptions : [];
  pricingSettings.value = {
    label: String(stored.label || "Pricing"),
    description: String(stored.description || ""),
    priceOptions: storedOptions.length
      ? storedOptions.map(normalizePricingOption)
      : [buildFallbackPricing()],
  };
};

const fetchPricing = async () => {
  isFetching.value = true;
  try {
    const result = await api.getMaterialSimpleSizes(configID.value, materialId.value);
    if (result?.materialSizes) {
      materialSizes.value = result.materialSizes;
      measurementUnit.value = String(result.measurementUnit || "mm");
      normalizePricingSettings();
    }
  } finally {
    isFetching.value = false;
  }
};

const persistPricing = async () => {
  isLoading.value = true;
  try {
    const primary = pricingSettings.value.priceOptions[0] || buildFallbackPricing();
    const nextSizes = {
      ...materialSizes.value,
      customSize: {
        ...(materialSizes.value.customSize || {}),
        pricings: primary.customPricing,
      },
      pricing: {
        label: pricingSettings.value.label,
        description: pricingSettings.value.description,
        priceOptions: pricingSettings.value.priceOptions,
      },
    };
    const res = await api.updateMaterialSimpleSizes(configID.value, materialId.value, nextSizes);
    if (res?.success) {
      materialSizes.value = nextSizes;
      toastMessage(res.message);
    }
  } finally {
    isLoading.value = false;
  }
};

const addPricing = () => {
  editingIndex.value = null;
  editingPricing.value = emptyPricing();
  showForm.value = true;
};

const editPricing = (index) => {
  openActionIndex.value = null;
  editingIndex.value = index;
  editingPricing.value = JSON.parse(JSON.stringify(pricingSettings.value.priceOptions[index]));
  showForm.value = true;
};

const closeForm = () => {
  showForm.value = false;
  editingIndex.value = null;
  editingPricing.value = emptyPricing();
};

const savePricing = async () => {
  if (!canSavePricing.value) return;
  const next = normalizePricingOption(editingPricing.value);
  if (editingIndex.value === null) {
    pricingSettings.value.priceOptions.push(next);
  } else {
    pricingSettings.value.priceOptions[editingIndex.value] = next;
  }
  await persistPricing();
  closeForm();
};

const duplicatePricing = async (index) => {
  openActionIndex.value = null;
  const copy = JSON.parse(JSON.stringify(pricingSettings.value.priceOptions[index]));
  copy.label = copy.label ? `${copy.label} (copy)` : sprintf(__('Pricing %d', 'all-signs-options-pro'), pricingSettings.value.priceOptions.length + 1);
  pricingSettings.value.priceOptions.splice(index + 1, 0, copy);
  await persistPricing();
};

const deletePricing = async (index) => {
  openActionIndex.value = null;
  pricingSettings.value.priceOptions.splice(index, 1);
  if (!pricingSettings.value.priceOptions.length) {
    pricingSettings.value.priceOptions.push(buildFallbackPricing());
  }
  await persistPricing();
};

const toggleActions = (index) => {
  openActionIndex.value = openActionIndex.value === index ? null : index;
};

const closeActions = () => {
  openActionIndex.value = null;
};

const togglePerUnit = () => {
  editingPricing.value.customPricing.rangePricingPerUnit = !editingPricing.value.customPricing.rangePricingPerUnit;
};

const toggleWeightShipping = () => {
  editingPricing.value.customPricing.shippingMethod =
    editingPricing.value.customPricing.shippingMethod === "per-weight" ? "per-surface" : "per-weight";
};

const switchClass = (active) => [
  "asowp-switch",
  active ? "is-active" : "",
];

const openRangeModal = (index = null) => {
  editingRangeIndex.value = index;
  if (index === null) {
    rangeDraft.value = emptyRange(editingPricing.value.customPricing.range.at(-1)?.size || 0);
  } else {
    rangeDraft.value = { ...editingPricing.value.customPricing.range[index] };
  }
  rangeModalOpen.value = true;
};

const closeRangeModal = () => {
  rangeModalOpen.value = false;
  editingRangeIndex.value = null;
  rangeDraft.value = emptyRange();
};

const saveRange = () => {
  const normalized = { ...emptyRange(), ...rangeDraft.value };
  if (editingRangeIndex.value === null) {
    editingPricing.value.customPricing.range.push(normalized);
  } else {
    editingPricing.value.customPricing.range[editingRangeIndex.value] = normalized;
  }
  closeRangeModal();
};

const removeRange = (index) => {
  editingPricing.value.customPricing.range.splice(index, 1);
};

const shippingLabel = (range) => {
  if (editingPricing.value.customPricing.shippingMethod === "per-weight") {
    return `${range.shippingPrice} ${currencySymbol.value}/kg`;
  }
  if (editingPricing.value.customPricing.rangePricingPerUnit) {
    return `${range.shippingPrice} ${currencySymbol.value}/${surfaceUnitLabel.value}`;
  }
  return `${range.shippingPrice} ${currencySymbol.value}`;
};

onMounted(() => {
  fetchPricing();
  document.addEventListener("click", closeActions);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", closeActions);
});
</script>

<style scoped>
.asowp-pricing-page {
  gap: 10px;
}

.asowp-pricing-header,
.asowp-pricing-card,
.asowp-pricing-editor {
  border-radius: 10px;
  border-color: #dfe3e8;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.04);
}

.asowp-pricing-header {
  min-height: 74px;
  padding: 14px 20px;
}

.asowp-pricing-header h2 {
  font-size: 15px;
  line-height: 20px;
  font-weight: 800;
}

.asowp-pricing-header p {
  max-width: 680px;
  font-size: 11px;
  line-height: 14px;
}

.asowp-pricing-header button {
  min-height: 28px;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 11px;
  line-height: 14px;
}

.asowp-pricing-card,
.asowp-pricing-editor {
  padding: 18px 20px;
}

.asowp-pricing-card h3,
.asowp-pricing-section h3 {
  font-size: 13px;
  line-height: 18px;
  font-weight: 800;
  color: #303030;
  margin: 0;
}

.asowp-pricing-table-wrap {
  overflow: visible;
}

.asowp-pricing-card thead th {
  padding: 8px 12px;
  font-size: 11px;
  line-height: 14px;
  font-weight: 700;
}

.asowp-pricing-card thead th:first-child {
  width: 56%;
}

.asowp-pricing-card thead th:nth-child(2) {
  width: 25%;
}

.asowp-pricing-card thead th:nth-child(3) {
  width: 19%;
}

.asowp-pricing-card tbody td {
  padding: 10px 12px;
  font-size: 13px;
  line-height: 18px;
  background: transparent;
}

.asowp-pricing-row {
  cursor: pointer;
  background: transparent;
  box-shadow: none;
}

.asowp-pricing-row:hover {
  background: #f7f8fa;
}

.asowp-pricing-row:hover .asowp-ellipsis-button {
  border-color: #aeb4b9;
}

.asowp-pricing-actions-menu {
  position: relative;
  display: inline-flex;
}

.asowp-ellipsis-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  padding: 0;
  color: #616161;
  background: #fff;
  border: 1px solid #c9cccf;
  border-radius: 9px;
  cursor: pointer;
}

.asowp-actions-popover {
  position: absolute;
  top: calc(100% + 6px);
  right: 0;
  z-index: 20;
  min-width: 136px;
  padding: 6px;
  border: 1px solid #dfe3e8;
  border-radius: 10px;
  background: #fff;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.14);
}

.asowp-actions-popover button {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  min-height: 30px;
  padding: 6px 8px;
  border: 0;
  border-radius: 7px;
  background: transparent;
  color: #303030;
  font-size: 12px;
  line-height: 16px;
  font-weight: 600;
  text-align: left;
  cursor: pointer;
}

.asowp-actions-popover button:hover {
  background: #f6f6f7;
}

.asowp-actions-popover button.is-danger {
  color: #8e1f0b;
}

.asowp-action-button,
.asowp-delete-button,
.asowp-secondary-button,
.asowp-primary-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  min-height: 28px;
  padding: 5px 10px;
  border-radius: 6px;
  font-size: 11px;
  line-height: 14px;
  font-weight: 800;
  cursor: pointer;
}

.asowp-action-button,
.asowp-secondary-button {
  color: #303030;
  background: #fff;
  border: 1px solid #c9cccf;
}

.asowp-delete-button {
  color: #8e1f0b;
  background: transparent;
  border: 0;
}

.asowp-primary-button {
  color: #fff;
  background: #007a72;
  border: 0;
}

.asowp-primary-button:hover {
  color: #fff;
  background: #00645f;
}

.asowp-primary-button:disabled {
  background: #d8d8d8;
  cursor: not-allowed;
}

.asowp-add-range-button {
  width: auto;
  max-width: max-content;
  align-self: flex-start;
}

.asowp-pricing-editor {
  display: grid;
  gap: 16px;
}

.asowp-pricing-editor label,
.asowp-pricing-field label {
  display: block;
  margin-bottom: 6px;
  color: #303030;
  font-size: 13px;
  line-height: 18px;
  font-weight: 400;
}

.asowp-pricing-editor input,
.asowp-pricing-field input {
  box-sizing: border-box;
  width: 100%;
  height: 38px;
  border: 1px solid #8c9196;
  border-radius: 8px;
  background: #fff;
  color: #303030;
  font-size: 13px;
  line-height: 18px;
  padding: 0 12px;
  outline: none;
}

.asowp-pricing-editor input:focus,
.asowp-pricing-field input:focus {
  border-color: #008060;
}

.asowp-pricing-editor p,
.asowp-pricing-section p,
.asowp-pricing-field p {
  color: #6b7280;
  font-size: 12px;
  line-height: 18px;
  margin: 6px 0 0;
}

.asowp-pricing-divider {
  height: 1px;
  background: #eceff2;
}

.asowp-pricing-section {
  display: grid;
  gap: 12px;
}

.asowp-pricing-options-card,
.asowp-pricing-range-card {
  padding: 14px;
  border: 1px solid #dfe3e8;
  border-radius: 10px;
  background: #fff;
}

.asowp-pricing-toggle-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.asowp-pricing-toggle-row h4,
.asowp-pricing-range-card h4 {
  margin: 0;
  color: #303030;
  font-size: 12px;
  line-height: 18px;
  font-weight: 800;
}

.asowp-toggle-group {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #6b7280;
  font-size: 12px;
  line-height: 16px;
}

.asowp-switch {
  position: relative;
  width: 36px;
  height: 20px;
  border: 0;
  border-radius: 999px;
  background: #d9dee8;
  cursor: pointer;
}

.asowp-switch span {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 16px;
  height: 16px;
  border-radius: 999px;
  background: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.18);
  transition: left 120ms ease;
}

.asowp-switch.is-active {
  background: #007a72;
}

.asowp-switch.is-active span {
  left: 18px;
}

.asowp-pricing-help {
  margin: 0 !important;
}

.asowp-pricing-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding-top: 16px;
  border-top: 1px solid #dfe3e8;
}

.asowp-range-modal-layer {
  position: fixed;
  inset: 0;
  z-index: 100000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.asowp-range-modal-backdrop {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.48);
}

.asowp-range-modal {
  position: relative;
  width: min(540px, 95vw);
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 0 0 1px rgba(0,0,0,0.05), 0 10px 30px rgba(0,0,0,0.1);
  overflow: hidden;
}

.asowp-range-modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  background-color: #f4f4f4;
  border-bottom: 1px solid #d8dee4;
}

.asowp-range-modal-header h3 {
  margin: 0;
  color: #202223;
  font-size: 16px;
  line-height: 20px;
  font-weight: 700;
}

.asowp-range-modal-body {
  padding: 20px;
  max-height: calc(100vh - 200px);
  overflow-y: auto;
}

.asowp-range-modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 16px 20px;
  background: #ffffff;
  border-top: 1px solid #d8dee4;
}

.asowp-range-modal-actions button {
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
}
</style>