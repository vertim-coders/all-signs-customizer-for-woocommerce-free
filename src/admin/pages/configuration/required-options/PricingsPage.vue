<template>
  <div class="ascwo-pricing-page ascwo-space-y-3">
    <template v-if="!showForm">
      <div class="ascwo-pricing-header ascwo-bg-white ascwo-rounded-xl ascwo-border ascwo-border-solid ascwo-border-[#dfe3e8] ascwo-px-5 ascwo-py-4 ascwo-flex ascwo-items-center ascwo-justify-between">
        <div>
          <h2 class="ascwo-text-[16px] ascwo-leading-6 ascwo-font-[900] ascwo-text-[#303030] ascwo-m-0">{{ __('Pricing', 'all-signs-customizer-for-woocommerce-pro') }}</h2>
          <p class="ascwo-text-[12px] ascwo-leading-4 ascwo-text-[#6b7280] ascwo-m-0">
            {{ __('Create pricing profiles for custom size rules only. Regular sizes keep their own pricing in the size records.', 'all-signs-customizer-for-woocommerce-pro') }}
          </p>
        </div>
        <button
          @click="addPricing"
          class="ascwo-inline-flex ascwo-items-center ascwo-gap-2 ascwo-px-3 ascwo-py-1.5 ascwo-bg-[#007a72] ascwo-text-white ascwo-text-[12px] ascwo-leading-4 ascwo-font-[900] ascwo-border-none ascwo-rounded-md ascwo-cursor-pointer hover:ascwo-bg-[#00645f]"
        >
          <PlusIcon class="ascwo-w-3.5 ascwo-h-3.5" />
          {{ __('Add new pricing', 'all-signs-customizer-for-woocommerce-pro') }}
        </button>
      </div>

      <div class="ascwo-pricing-card ascwo-bg-white ascwo-rounded-xl ascwo-border ascwo-border-solid ascwo-border-[#dfe3e8] ascwo-p-5">
        <h3 class="ascwo-text-[14px] ascwo-font-[900] ascwo-text-[#303030] ascwo-mt-0 ascwo-mb-3">{{ __('Pricing List', 'all-signs-customizer-for-woocommerce-pro') }}</h3>
        <div class="ascwo-pricing-table-wrap">
          <table class="ascwo-pricing-table ascwo-w-full ascwo-border-collapse">
            <thead>
              <tr class="ascwo-bg-[#f3f3f3]">
                <th class="ascwo-py-2 ascwo-px-3 ascwo-text-left ascwo-text-[11px] ascwo-font-bold ascwo-text-[#6b7280]">{{ __('Label', 'all-signs-customizer-for-woocommerce-pro') }}</th>
                <th class="ascwo-py-2 ascwo-px-3 ascwo-text-left ascwo-text-[11px] ascwo-font-bold ascwo-text-[#6b7280]">{{ __('Shipping', 'all-signs-customizer-for-woocommerce-pro') }}</th>
                <th class="ascwo-py-2 ascwo-px-3 ascwo-text-left ascwo-text-[11px] ascwo-font-bold ascwo-text-[#6b7280]">{{ __('Actions', 'all-signs-customizer-for-woocommerce-pro') }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="isFetching">
                <td colspan="3" class="ascwo-table-loader-cell ascwo-p-8 ascwo-text-center">
                  <Loader2Icon class="ascwo-table-loader-icon ascwo-w-7 ascwo-h-7" />
                </td>
              </tr>
              <template v-else>
                <tr
                  v-for="(item, key) in pricingSettings.items"
                  :key="getPricingItemId(item, key)"
                  class="ascwo-pricing-row ascwo-border-b ascwo-border-solid ascwo-border-[#eceff2] last:ascwo-border-b-0"
                  @click="editPricing(key)"
                >
                  <td class="ascwo-py-2.5 ascwo-px-3">
                    <span class="ascwo-text-[13px] ascwo-font-[900] ascwo-text-[#303030]">
                      {{ item.label || sprintf(__('Pricing %d', 'all-signs-customizer-for-woocommerce-pro'), key + 1) }}
                    </span>
                  </td>
                  <td class="ascwo-py-2.5 ascwo-px-3 ascwo-text-[13px] ascwo-text-[#303030]">
                    {{ item.customPricing.shippingMethod === 'per-weight' ? __('Weight', 'all-signs-customizer-for-woocommerce-pro') : __('Size-based', 'all-signs-customizer-for-woocommerce-pro') }}
                  </td>
                  <td class="ascwo-py-2.5 ascwo-px-3">
                    <div class="ascwo-pricing-actions-menu" @click.stop>
                      <button @click="toggleActions(key)" class="ascwo-ellipsis-button" :aria-label="__('Pricing actions', 'all-signs-customizer-for-woocommerce-pro')">
                        <MoreHorizontalIcon class="ascwo-w-4 ascwo-h-4" />
                      </button>
                      <div v-if="openActionIndex === key" class="ascwo-actions-popover">
                        <button @click="editPricing(key)">
                          <Edit2Icon class="ascwo-w-3.5 ascwo-h-3.5" />
                          {{ __('Edit', 'all-signs-customizer-for-woocommerce-pro') }}
                        </button>
                        <button @click="duplicatePricing(key)">
                          <CopyIcon class="ascwo-w-3.5 ascwo-h-3.5" />
                          {{ __('Duplicate', 'all-signs-customizer-for-woocommerce-pro') }}
                        </button>
                        <button class="is-danger" @click="deletePricing(key)">
                          <Trash2Icon class="ascwo-w-3.5 ascwo-h-3.5" />
                          {{ __('Delete', 'all-signs-customizer-for-woocommerce-pro') }}
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
      <div class="ascwo-pricing-card ascwo-bg-white ascwo-rounded-xl ascwo-border ascwo-border-solid ascwo-border-[#dfe3e8] ascwo-p-4">
        <div class="ascwo-flex ascwo-justify-end">
          <button @click="closeForm" class="ascwo-secondary-button">{{ __('Back to pricings', 'all-signs-customizer-for-woocommerce-pro') }}</button>
        </div>
      </div>

      <div class="ascwo-pricing-editor ascwo-bg-white ascwo-rounded-xl ascwo-border ascwo-border-solid ascwo-border-[#dfe3e8] ascwo-p-5">
        <div>
          <label>{{ __('Label', 'all-signs-customizer-for-woocommerce-pro') }}</label>
          <input type="text" v-model.trim="editingPricing.label">
          <p>{{ __('Internal name used to identify this pricing profile.', 'all-signs-customizer-for-woocommerce-pro') }}</p>
        </div>

        <div class="ascwo-pricing-divider"></div>

        <section class="ascwo-pricing-section">
          <div class="ascwo-flex ascwo-items-start ascwo-justify-between ascwo-gap-4">
            <div>
              <h3>{{ __('Custom size pricing', 'all-signs-customizer-for-woocommerce-pro') }}</h3>
              <p>{{ __('Define the pricing rules for custom size ranges.', 'all-signs-customizer-for-woocommerce-pro') }}</p>
            </div>
          </div>

          <div class="ascwo-pricing-options-card">
            <div class="ascwo-pricing-toggle-row">
              <div>
                <h4>{{ __('Per-unit pricing', 'all-signs-customizer-for-woocommerce-pro') }}</h4>
                <p>{{ sprintf(__('Charge per %s instead of a flat price for the whole range.', 'all-signs-customizer-for-woocommerce-pro'), surfaceUnitLabel) }}</p>
              </div>
              <div class="ascwo-flex ascwo-items-center ascwo-gap-3">
                <span class="ascwo-text-[12px] ascwo-text-[#616161]">{{ __('No', 'all-signs-customizer-for-woocommerce-pro') }}</span>
                <div
                  @click="togglePerUnit"
                  :class="[
                    'ascwo-w-9 ascwo-h-5 ascwo-rounded-full ascwo-relative ascwo-cursor-pointer ascwo-transition-colors',
                    editingPricing.customPricing.rangePricingPerUnit ? 'ascwo-bg-[#007a72]' : 'ascwo-bg-[#d9dee8]'
                  ]"
                >
                  <div :class="['ascwo-absolute ascwo-top-0.5 ascwo-w-4 ascwo-h-4 ascwo-rounded-full ascwo-bg-white ascwo-shadow ascwo-transition-all', editingPricing.customPricing.rangePricingPerUnit ? 'ascwo-right-0.5' : 'ascwo-left-0.5']"></div>
                </div>
                <span class="ascwo-text-[12px] ascwo-text-[#616161]">{{ __('Yes', 'all-signs-customizer-for-woocommerce-pro') }}</span>
              </div>            </div>

            <div class="ascwo-pricing-divider"></div>

            <div class="ascwo-pricing-toggle-row">
              <div>
                <h4>{{ __('Weight-based shipping', 'all-signs-customizer-for-woocommerce-pro') }}</h4>
                <p>{{ __('Use volumetric weight instead of the size range value.', 'all-signs-customizer-for-woocommerce-pro') }}</p>
              </div>
              <div class="ascwo-flex ascwo-items-center ascwo-gap-3">
                <span class="ascwo-text-[12px] ascwo-text-[#616161]">{{ __('No', 'all-signs-customizer-for-woocommerce-pro') }}</span>
                <div
                  @click="toggleWeightShipping"
                  :class="[
                    'ascwo-w-9 ascwo-h-5 ascwo-rounded-full ascwo-relative ascwo-cursor-pointer ascwo-transition-colors',
                    editingPricing.customPricing.shippingMethod === 'per-weight' ? 'ascwo-bg-[#007a72]' : 'ascwo-bg-[#d9dee8]'
                  ]"
                >
                  <div :class="['ascwo-absolute ascwo-top-0.5 ascwo-w-4 ascwo-h-4 ascwo-rounded-full ascwo-bg-white ascwo-shadow ascwo-transition-all', editingPricing.customPricing.shippingMethod === 'per-weight' ? 'ascwo-right-0.5' : 'ascwo-left-0.5']"></div>
                </div>
                <span class="ascwo-text-[12px] ascwo-text-[#616161]">{{ __('Yes', 'all-signs-customizer-for-woocommerce-pro') }}</span>
              </div>
            </div>
          </div>

          <p class="ascwo-pricing-help">
            {{ sprintf(__('Each range applies from the previous size up to the current size. Surface is calculated automatically as size x size in %s.', 'all-signs-customizer-for-woocommerce-pro'), surfaceUnitLabel) }}
          </p>

          <div v-if="editingPricing.customPricing.shippingMethod === 'per-weight'" class="ascwo-pricing-field">
            <label>{{ __('Volumetric divisor', 'all-signs-customizer-for-woocommerce-pro') }}</label>
            <input type="number" v-model.number="editingPricing.customPricing.divisorVolumetric">
            <p>{{ __('Used to convert parcel dimensions into volumetric weight for shipping.', 'all-signs-customizer-for-woocommerce-pro') }}</p>
          </div>

          <div class="ascwo-space-y-3">
            <div
              v-for="(range, key) in editingPricing.customPricing.range"
              :key="key"
              class="ascwo-pricing-range-card"
            >
              <div class="ascwo-flex ascwo-items-center ascwo-justify-between ascwo-gap-4">
                <h4>{{ sprintf(__('Range %d', 'all-signs-customizer-for-woocommerce-pro'), key + 1) }}</h4>
                <div class="ascwo-flex ascwo-items-center ascwo-gap-2">
                  <button @click="openRangeModal(key)" class="ascwo-action-button">
                    <Edit2Icon class="ascwo-w-3.5 ascwo-h-3.5" />
                    {{ __('Edit', 'all-signs-customizer-for-woocommerce-pro') }}
                  </button>
                  <button @click="removeRange(key)" class="ascwo-delete-button">
                    <Trash2Icon class="ascwo-w-3.5 ascwo-h-3.5" />
                    {{ __('Delete', 'all-signs-customizer-for-woocommerce-pro') }}
                  </button>
                </div>
              </div>
              <p>
                {{ sprintf(__('Applied from %s to %s %s.', 'all-signs-customizer-for-woocommerce-pro'), rangeStart(key), range.surface, surfaceUnitLabel) }}
              </p>
              <p>
                {{ __('Base price:', 'all-signs-customizer-for-woocommerce-pro') }}
                {{ editingPricing.customPricing.rangePricingPerUnit ? `${range.basePrice} ${currencySymbol}/${surfaceUnitLabel}` : `${range.basePrice} ${currencySymbol}` }}
                · {{ __('Char price:', 'all-signs-customizer-for-woocommerce-pro') }} {{ range.charPrice }} {{ currencySymbol }}/char
              </p>
              <p>
                {{ __('Shipping:', 'all-signs-customizer-for-woocommerce-pro') }}
                {{ shippingLabel(range) }}
              </p>
            </div>
          </div>

          <button @click="openRangeModal()" class="ascwo-secondary-button ascwo-add-range-button ascwo-mt-3">{{ __('Add range', 'all-signs-customizer-for-woocommerce-pro') }}</button>
        </section>

        <div class="ascwo-pricing-actions">
          <button @click="closeForm" class="ascwo-secondary-button">{{ __('Cancel', 'all-signs-customizer-for-woocommerce-pro') }}</button>
          <button @click="savePricing" :disabled="!canSavePricing || isLoading" class="ascwo-primary-button">
            {{ isLoading ? __('Saving...', 'all-signs-customizer-for-woocommerce-pro') : __('Save pricing', 'all-signs-customizer-for-woocommerce-pro') }}
          </button>
        </div>
      </div>
    </template>

    <Teleport to="body">
      <div v-if="rangeModalOpen" class="ascwo-range-modal-layer">
        <div class="ascwo-range-modal-backdrop" @click="closeRangeModal"></div>
        <div class="ascwo-range-modal">
          <div class="ascwo-range-modal-header">
            <h3>{{ editingRangeIndex === null ? __('Add range', 'all-signs-customizer-for-woocommerce-pro') : sprintf(__('Edit range %d', 'all-signs-customizer-for-woocommerce-pro'), editingRangeIndex + 1) }}</h3>
            <button @click="closeRangeModal" type="button"><XIcon class="ascwo-w-5 ascwo-h-5" /></button>
          </div>
          <div class="ascwo-range-modal-body">
            <div class="ascwo-pricing-field">
              <label>{{ sprintf(__('Surface (%s)', 'all-signs-customizer-for-woocommerce-pro'), surfaceUnitLabel) }}</label>
              <input type="number" v-model.number="rangeDraft.surface">
              <p>{{ rangeHelpText }}</p>
            </div>
            <div class="ascwo-pricing-field">
              <label>{{ editingPricing.customPricing.rangePricingPerUnit ? sprintf(__('Base price per %s', 'all-signs-customizer-for-woocommerce-pro'), surfaceUnitLabel) : __('Base price', 'all-signs-customizer-for-woocommerce-pro') }}</label>
              <input type="number" v-model.number="rangeDraft.basePrice">
            </div>
            <div class="ascwo-pricing-field">
              <label>{{ __('Char price', 'all-signs-customizer-for-woocommerce-pro') }}</label>
              <input type="number" v-model.number="rangeDraft.charPrice">
            </div>
            <template v-if="editingPricing.customPricing.shippingMethod === 'per-weight'">
              <div class="ascwo-pricing-field">
                <label>{{ sprintf(__('Width modifier (%s)', 'all-signs-customizer-for-woocommerce-pro'), measurementUnit) }}</label>
                <input type="number" v-model.number="rangeDraft.widthModifier">
              </div>
              <div class="ascwo-pricing-field">
                <label>{{ sprintf(__('Height modifier (%s)', 'all-signs-customizer-for-woocommerce-pro'), measurementUnit) }}</label>
                <input type="number" v-model.number="rangeDraft.heightModifier">
              </div>
              <div class="ascwo-pricing-field">
                <label>{{ sprintf(__('Length (%s)', 'all-signs-customizer-for-woocommerce-pro'), measurementUnit) }}</label>
                <input type="number" v-model.number="rangeDraft.length">
              </div>
            </template>
            <div class="ascwo-pricing-field">
              <label>{{ shippingInputLabel }}</label>
              <input type="number" v-model.number="rangeDraft.shippingPrice">
            </div>
          </div>
          <div class="ascwo-range-modal-actions">
            <button @click="closeRangeModal" class="ascwo-secondary-button">{{ __('Cancel', 'all-signs-customizer-for-woocommerce-pro') }}</button>
            <button @click="saveRange" class="ascwo-primary-button">{{ editingRangeIndex === null ? __('Add range', 'all-signs-customizer-for-woocommerce-pro') : __('Save changes', 'all-signs-customizer-for-woocommerce-pro') }}</button>
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
const configID = ref(route.params.configId);

const isFetching = ref(true);
const isLoading = ref(false);
const showForm = ref(false);
const editingIndex = ref(null);
const editingPricingId = ref(null);
const rangeModalOpen = ref(false);
const editingRangeIndex = ref(null);
const openActionIndex = ref(null);

const measurementUnit = ref("mm");
const currencySymbol = ref("$");
const pricingSettings = ref({ label: "Pricing", description: "", items: [] });

const emptyPricing = () => ({
  label: "",
  customPricing: {
    type: "range",
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

const rangeStart = (index) => index === 0 ? 0 : Number(editingPricing.value.customPricing.range[index - 1]?.surface || 0);
const rangeSurface = (surface) => Number(surface || 0);
const rangeSurfaceStart = (index) => rangeSurface(rangeStart(index));

const rangeHelpText = computed(() => {
  const start = editingRangeIndex.value === null
    ? Number(editingPricing.value.customPricing.range.at(-1)?.surface || 0)
    : rangeStart(editingRangeIndex.value);
  return sprintf(
    __('This range applies from %s to %s %s. Surface equivalent: %s to %s %s.', 'all-signs-customizer-for-woocommerce-pro'),
    start,
        Number(rangeDraft.value.surface || 0),
        measurementUnit.value,
        rangeSurface(start),
        rangeSurface(rangeDraft.value.surface),
        surfaceUnitLabel.value
  );
});

const shippingInputLabel = computed(() => {
  if (editingPricing.value.customPricing.shippingMethod === "per-weight") {
    return __("Shipping price per kg", "all-signs-customizer-for-woocommerce-pro");
  }
  return editingPricing.value.customPricing.rangePricingPerUnit
    ? sprintf(__("Shipping per %s", "all-signs-customizer-for-woocommerce-pro"), surfaceUnitLabel.value)
    : __("Shipping price", "all-signs-customizer-for-woocommerce-pro");
});

function emptyRange(startSize = 0) {
  return {
    surface: Number(startSize) + 1,
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
  type: value.type === "unit" ? "unit" : "range",
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
        surface: toNumber(item?.surface ?? item?.size, 0),
        basePrice: toNumber(item?.basePrice, 0),
        charPrice: toNumber(item?.charPrice, 0),
        shippingPrice: toNumber(item?.shippingPrice ?? item?.pricePerSqCm, 0),
        widthModifier: toNumber(item?.widthModifier, 0),
        heightModifier: toNumber(item?.heightModifier, 0),
        length: toNumber(item?.length, 0),
      }))
    : [],
});

const getPricingItemId = (item = {}, index = 0) => String(item?.id || `pricing-${index + 1}`);

const normalizePricingOption = (item = {}, index = 0) => ({
  id: getPricingItemId(item, index),
  label: String(item.label || ""),
  customPricing: normalizeCustomPricing(item.customPricing || {}),
});

const normalizePricingSettings = (stored = {}) => {
  const storedOptions = Array.isArray(stored.items) ? stored.items : [];
  pricingSettings.value = {
    label: String(stored.label || "Pricings"),
    description: String(stored.description || ""),
    items: storedOptions.map((item, index) => normalizePricingOption(item, index)),
  };
};

const fetchPricing = async () => {
  isFetching.value = true;
  try {
    const result = await api.getRequiredOptionPricings(configID.value);
    if (result) {
      normalizePricingSettings(result);
    }
  } finally {
    isFetching.value = false;
  }
};

const addPricing = () => {
  editingIndex.value = null;
  editingPricingId.value = null;
  editingPricing.value = emptyPricing();
  showForm.value = true;
};

const normalizePricingIndex = (index) => {
  const parsed = Number(index);
  return Number.isInteger(parsed) && parsed >= 0 ? parsed : -1;
};

const editPricing = (itemIndex) => {
  openActionIndex.value = null;
  const index = normalizePricingIndex(itemIndex);
  if (index < 0) return;
  editingIndex.value = index;
  editingPricingId.value = index;
  editingPricing.value = JSON.parse(JSON.stringify(pricingSettings.value.items[index]));
  showForm.value = true;
};

const closeForm = () => {
  showForm.value = false;
  editingIndex.value = null;
  editingPricingId.value = null;
  editingPricing.value = emptyPricing();
};

const savePricing = async () => {
  if (!canSavePricing.value) return;
  isLoading.value = true;
  try {
    const next = normalizePricingOption(editingPricing.value, editingIndex.value === null ? pricingSettings.value.items.length : editingIndex.value);
    const result = editingIndex.value !== null
      ? await api.updateRequiredOptionPricingItem(configID.value, editingIndex.value, next)
      : await api.addRequiredOptionPricingItem(configID.value, next);
    if (result?.success) {
      toastMessage(result.message);
      await fetchPricing();
      closeForm();
    } else {
      toastMessage(result?.message || __("Unable to save pricing", "all-signs-customizer-for-woocommerce-pro"), "warning");
    }
  } finally {
    isLoading.value = false;
  }
};

const duplicatePricing = async (itemIndex) => {
  openActionIndex.value = null;
  const index = normalizePricingIndex(itemIndex);
  if (index < 0) return;
  const copy = JSON.parse(JSON.stringify(pricingSettings.value.items[index]));
  delete copy.id;
  copy.label = copy.label ? `${copy.label} (copy)` : sprintf(__('Pricing %d', 'all-signs-customizer-for-woocommerce-pro'), pricingSettings.value.items.length + 1);
  isLoading.value = true;
  try {
    const result = await api.addRequiredOptionPricingItem(configID.value, copy);
    if (result?.success) {
      toastMessage(result.message);
      await fetchPricing();
    } else {
      toastMessage(result?.message || __("Unable to duplicate pricing", "all-signs-customizer-for-woocommerce-pro"), "warning");
    }
  } finally {
    isLoading.value = false;
  }
};

const deletePricing = async (itemIndex) => {
  openActionIndex.value = null;
  const index = normalizePricingIndex(itemIndex);
  if (index < 0) return;
  isLoading.value = true;
  try {
    const result = await api.deleteRequiredOptionPricingItem(configID.value, index);
    if (result?.success) {
      toastMessage(result.message);
      await fetchPricing();
    } else {
      toastMessage(result?.message || __("Unable to delete pricing", "all-signs-customizer-for-woocommerce-pro"), "warning");
    }
  } finally {
    isLoading.value = false;
  }
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
  "ascwo-switch",
  active ? "is-active" : "",
];

const openRangeModal = (index = null) => {
  editingRangeIndex.value = index;
  if (index === null) {
    rangeDraft.value = emptyRange(editingPricing.value.customPricing.range.at(-1)?.surface || 0);
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
  editingPricing.value.customPricing.type = "range";
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
.ascwo-pricing-page {
  gap: 10px;
}

.ascwo-pricing-header,
.ascwo-pricing-card,
.ascwo-pricing-editor {
  border-radius: 10px;
  border-color: #dfe3e8;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.04);
}

.ascwo-pricing-header {
  min-height: 74px;
  padding: 14px 20px;
}

.ascwo-pricing-header h2 {
  font-size: 15px;
  line-height: 20px;
  font-weight: 800;
}

.ascwo-pricing-header p {
  max-width: 680px;
  font-size: 11px;
  line-height: 14px;
}

.ascwo-pricing-header button {
  min-height: 28px;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 11px;
  line-height: 14px;
}

.ascwo-pricing-card,
.ascwo-pricing-editor {
  padding: 18px 20px;
}

.ascwo-pricing-card h3,
.ascwo-pricing-section h3 {
  font-size: 13px;
  line-height: 18px;
  font-weight: 800;
  color: #303030;
  margin: 0;
}

.ascwo-pricing-table-wrap {
  overflow: visible;
}

.ascwo-pricing-card thead th {
  padding: 8px 12px;
  font-size: 11px;
  line-height: 14px;
  font-weight: 700;
}

.ascwo-pricing-card thead th:first-child {
  width: 56%;
}

.ascwo-pricing-card thead th:nth-child(2) {
  width: 25%;
}

.ascwo-pricing-card thead th:nth-child(3) {
  width: 19%;
}

.ascwo-pricing-card tbody td {
  padding: 10px 12px;
  font-size: 13px;
  line-height: 18px;
  background: transparent;
}

.ascwo-pricing-row {
  cursor: pointer;
  background: transparent;
  box-shadow: none;
}

.ascwo-pricing-row:hover {
  background: #f7f8fa;
}

.ascwo-pricing-row:hover .ascwo-ellipsis-button {
  border-color: #aeb4b9;
}

.ascwo-pricing-actions-menu {
  position: relative;
  display: inline-flex;
}

.ascwo-ellipsis-button {
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

.ascwo-actions-popover {
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

.ascwo-actions-popover button {
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

.ascwo-actions-popover button:hover {
  background: #f6f6f7;
}

.ascwo-actions-popover button.is-danger {
  color: #8e1f0b;
}

.ascwo-action-button,
.ascwo-delete-button,
.ascwo-secondary-button,
.ascwo-primary-button {
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

.ascwo-action-button,
.ascwo-secondary-button {
  color: #303030;
  background: #fff;
  border: 1px solid #c9cccf;
}

.ascwo-delete-button {
  color: #8e1f0b;
  background: transparent;
  border: 0;
}

.ascwo-primary-button {
  color: #fff;
  background: #007a72;
  border: 0;
}

.ascwo-primary-button:hover {
  color: #fff;
  background: #00645f;
}

.ascwo-primary-button:disabled {
  background: #d8d8d8;
  cursor: not-allowed;
}

.ascwo-add-range-button {
  width: auto;
  max-width: max-content;
  align-self: flex-start;
}

.ascwo-pricing-editor {
  display: grid;
  gap: 16px;
}

.ascwo-pricing-editor label,
.ascwo-pricing-field label {
  display: block;
  margin-bottom: 6px;
  color: #303030;
  font-size: 13px;
  line-height: 18px;
  font-weight: 400;
}

.ascwo-pricing-editor input,
.ascwo-pricing-field input {
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

.ascwo-pricing-editor input:focus,
.ascwo-pricing-field input:focus {
  border-color: #008060;
}

.ascwo-pricing-editor p,
.ascwo-pricing-section p,
.ascwo-pricing-field p {
  color: #6b7280;
  font-size: 12px;
  line-height: 18px;
  margin: 6px 0 0;
}

.ascwo-pricing-divider {
  height: 1px;
  background: #eceff2;
}

.ascwo-pricing-section {
  display: grid;
  gap: 12px;
}

.ascwo-pricing-options-card,
.ascwo-pricing-range-card {
  padding: 14px;
  border: 1px solid #dfe3e8;
  border-radius: 10px;
  background: #fff;
}

.ascwo-pricing-toggle-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.ascwo-pricing-toggle-row h4,
.ascwo-pricing-range-card h4 {
  margin: 0;
  color: #303030;
  font-size: 12px;
  line-height: 18px;
  font-weight: 800;
}

.ascwo-toggle-group {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #6b7280;
  font-size: 12px;
  line-height: 16px;
}

.ascwo-switch {
  position: relative;
  width: 36px;
  height: 20px;
  border: 0;
  border-radius: 999px;
  background: #d9dee8;
  cursor: pointer;
}

.ascwo-switch span {
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

.ascwo-switch.is-active {
  background: #007a72;
}

.ascwo-switch.is-active span {
  left: 18px;
}

.ascwo-pricing-help {
  margin: 0 !important;
}

.ascwo-pricing-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding-top: 16px;
  border-top: 1px solid #dfe3e8;
}

.ascwo-range-modal-layer {
  position: fixed;
  inset: 0;
  z-index: 100000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ascwo-range-modal-backdrop {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.48);
}

.ascwo-range-modal {
  position: relative;
  width: min(540px, 95vw);
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 0 0 1px rgba(0,0,0,0.05), 0 10px 30px rgba(0,0,0,0.1);
  overflow: hidden;
}

.ascwo-range-modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  background-color: #f4f4f4;
  border-bottom: 1px solid #d8dee4;
}

.ascwo-range-modal-header h3 {
  margin: 0;
  color: #202223;
  font-size: 16px;
  line-height: 20px;
  font-weight: 700;
}

.ascwo-range-modal-body {
  padding: 20px;
  max-height: calc(100vh - 200px);
  overflow-y: auto;
}

.ascwo-range-modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 16px 20px;
  background: #ffffff;
  border-top: 1px solid #d8dee4;
}

.ascwo-range-modal-actions button {
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
}
</style>
