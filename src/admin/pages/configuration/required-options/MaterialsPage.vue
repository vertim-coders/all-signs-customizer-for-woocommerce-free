<template>
  <div class="asowp-materials-panel asowp-space-y-3">
    <template v-if="!isNewComponent">
      <div class="asowp-bg-white asowp-rounded-xl asowp-border asowp-border-solid asowp-border-[#dfe3e8] asowp-shadow-sm asowp-p-4">
        <div class="asowp-flex asowp-items-center asowp-justify-between asowp-gap-4">
          <div>
            <h2 class="asowp-text-[16px] asowp-leading-6 asowp-font-[900] asowp-text-[#303030] asowp-m-0">{{ __('Materials', 'all-signs-options-pro') }}</h2>
            <p class="asowp-text-[12px] asowp-leading-4 asowp-text-[#616161] asowp-m-0">{{ __('Manage the materials available in this config, assign the pricing used by each one and exclude components when needed.', 'all-signs-options-pro') }}</p>
          </div>
          <button type="button" @click="addComponent" class="asowp-inline-flex asowp-items-center asowp-gap-2 asowp-px-3 asowp-py-1.5 asowp-bg-[#007a72] asowp-text-white asowp-text-[12px] asowp-leading-4 asowp-font-[900] asowp-border-none asowp-rounded-md asowp-cursor-pointer hover:asowp-bg-[#00645f]">
            <PlusIcon class="asowp-w-4 asowp-h-4" />
            {{ __('Add new material', 'all-signs-options-pro') }}
          </button>
        </div>
      </div>

      <div class="asowp-bg-white asowp-rounded-xl asowp-border asowp-border-solid asowp-border-[#dfe3e8] asowp-shadow-sm asowp-p-4">
        <h3 class="asowp-text-[14px] asowp-font-[900] asowp-text-[#303030] asowp-mt-0 asowp-mb-3">{{ __('Materials List', 'all-signs-options-pro') }}</h3>
        <div class="asowp-materials-table-wrap">
          <table class="asowp-materials-table asowp-w-full asowp-border-collapse">
            <thead class="asowp-bg-[#f0f0f1]">
              <tr>
                <th class="asowp-py-2 asowp-px-3 asowp-text-left asowp-text-[11px] asowp-font-bold asowp-text-[#6b7280]">{{ __('Preview', 'all-signs-options-pro') }}</th>
                <th class="asowp-py-2 asowp-px-3 asowp-text-left asowp-text-[11px] asowp-font-bold asowp-text-[#6b7280]">{{ __('Label', 'all-signs-options-pro') }}</th>
                <th class="asowp-py-2 asowp-px-3 asowp-text-left asowp-text-[11px] asowp-font-bold asowp-text-[#6b7280]">{{ __('Price', 'all-signs-options-pro') }}</th>
                <th class="asowp-py-2 asowp-px-3 asowp-text-center asowp-text-[11px] asowp-font-bold asowp-text-[#6b7280]">{{ __('Default', 'all-signs-options-pro') }}</th>
                <th class="asowp-py-2 asowp-px-3 asowp-text-left asowp-text-[11px] asowp-font-bold asowp-text-[#6b7280]">{{ __('Actions', 'all-signs-options-pro') }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="isFetching">
                <td colspan="5" class="asowp-py-8 asowp-text-center">
                  <Loader2Icon class="asowp-w-7 asowp-h-7 asowp-text-[#007a72] asowp-animate-spin asowp-mx-auto" />
                </td>
              </tr>
              <tr v-else-if="materials.length === 0">
                <td colspan="5" class="asowp-py-8 asowp-text-center asowp-text-[13px] asowp-text-[#616161]">
                  {{ __('No materials found', 'all-signs-options-pro') }}
                </td>
              </tr>
              <tr
                v-for="(material, index) in materials"
                v-else
                :key="index"
                class="asowp-border-b asowp-border-solid asowp-border-[#e5e7eb] hover:asowp-bg-[#f7f8fa]"
              >
                <td class="asowp-py-2.5 asowp-px-3">
                  <div class="asowp-w-[54px] asowp-h-[54px] asowp-overflow-hidden asowp-border asowp-border-solid asowp-border-[#d1d5db] asowp-rounded-lg asowp-bg-[#f8fafc] asowp-flex asowp-items-center asowp-justify-center">
                    <img v-if="getMaterialPreview(material)" :src="getMaterialPreview(material)" :alt="getMaterialLabel(material)" class="asowp-w-full asowp-h-full asowp-object-contain" />
                  </div>
                </td>
                <td class="asowp-py-2.5 asowp-px-3 asowp-text-[13px] asowp-font-[900] asowp-text-[#303030]">{{ getMaterialLabel(material) }}</td>
                <td class="asowp-py-2.5 asowp-px-3 asowp-text-[13px] asowp-text-[#303030]">{{ Number(material?.additionalPrice || 0) }}</td>
                <td class="asowp-py-2.5 asowp-px-3 asowp-text-center">
                  <div class="asowp-inline-flex asowp-items-center asowp-gap-2">
                    <span class="asowp-text-[12px] asowp-text-[#616161]">{{ __('No', 'all-signs-options-pro') }}</span>
                    <button
                      type="button"
                      @click="!isLoading && selectDefault(index)"
                      :class="['asowp-toggle', material?.isDefault ? 'is-active' : '']"
                    >
                      <span></span>
                    </button>
                    <span class="asowp-text-[12px] asowp-text-[#616161]">{{ __('Yes', 'all-signs-options-pro') }}</span>
                  </div>
                </td>
                <td class="asowp-py-2.5 asowp-px-3">
                  <div class="asowp-flex asowp-items-center asowp-gap-2">
                    <button type="button" @click="editMaterial(index)" class="asowp-outline-button">
                      <Edit2Icon class="asowp-w-3.5 asowp-h-3.5" />
                      {{ __('Edit', 'all-signs-options-pro') }}
                    </button>
                    <button type="button" @click="selectDeleteMaterial(index)" class="asowp-link-danger">
                      <Trash2Icon class="asowp-w-3.5 asowp-h-3.5" />
                      {{ __('Delete', 'all-signs-options-pro') }}
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </template>

    <template v-else>
      <div class="asowp-bg-white asowp-rounded-xl asowp-border asowp-border-solid asowp-border-[#dfe3e8] asowp-shadow-sm asowp-p-4">
        <div class="asowp-flex asowp-justify-end">
          <button type="button" @click="back" class="asowp-secondary-button">{{ __('Back to materials', 'all-signs-options-pro') }}</button>
        </div>
      </div>

      <div class="asowp-bg-white asowp-rounded-xl asowp-border asowp-border-solid asowp-border-[#dfe3e8] asowp-shadow-sm asowp-p-4">
        <h2 class="asowp-text-[16px] asowp-font-[900] asowp-text-[#303030] asowp-mt-0 asowp-mb-4">{{ isEdit ? __('Edit material', 'all-signs-options-pro') : __('Add material', 'all-signs-options-pro') }}</h2>

        <div class="asowp-grid asowp-grid-cols-1 lg:asowp-grid-cols-2 asowp-gap-4">
          <label class="asowp-block">
            <span class="asowp-form-label">{{ __('Label', 'all-signs-options-pro') }}</span>
            <input v-model.trim="newMaterial.label" class="asowp-form-input" autocomplete="off" />
          </label>
          <label class="asowp-block">
            <span class="asowp-form-label">{{ __('Additional price', 'all-signs-options-pro') }}</span>
            <input v-model.number="newMaterial.additionalPrice" type="number" min="0" step="0.01" class="asowp-form-input" />
          </label>
        </div>

        <label class="asowp-block asowp-mt-3">
          <span class="asowp-form-label">{{ __('Description', 'all-signs-options-pro') }}</span>
          <input v-model.trim="newMaterial.description" class="asowp-form-input" autocomplete="off" />
        </label>

        <div class="asowp-grid asowp-grid-cols-1 lg:asowp-grid-cols-2 asowp-gap-4 asowp-mt-3">
          <label class="asowp-block">
            <span class="asowp-form-label">{{ __('Preview image', 'all-signs-options-pro') }}</span>
            <div class="asowp-file-input">
              <button type="button" @click.prevent="selectPreviewImage" class="asowp-file-button">{{ __('Preview image', 'all-signs-options-pro') }}</button>
              <input :value="displayFileName(newMaterial.previewImg || newMaterial.image)" readonly autocomplete="off" />
            </div>
            <p class="asowp-form-help">{{ __('Used in the list and option previews.', 'all-signs-options-pro') }}</p>
            <div v-if="newMaterial.previewImg" class="asowp-preview-thumb">
              <img :src="newMaterial.previewImg" :alt="newMaterial.label || 'preview'" />
            </div>
          </label>

          <label class="asowp-block">
            <span class="asowp-form-label">{{ __('Popup image', 'all-signs-options-pro') }}</span>
            <div class="asowp-file-input">
              <button type="button" @click.prevent="selectPopupImage" class="asowp-file-button">{{ __('Popup image', 'all-signs-options-pro') }}</button>
              <input :value="displayFileName(newMaterial.popupImage || newMaterial.popupImg)" readonly autocomplete="off" />
            </div>
            <p class="asowp-form-help">{{ __('Optional larger image for product details.', 'all-signs-options-pro') }}</p>
            <div v-if="newMaterial.popupImage || newMaterial.popupImg" class="asowp-preview-thumb">
              <img :src="newMaterial.popupImage || newMaterial.popupImg" :alt="`${newMaterial.label || 'material'} popup`" />
            </div>
          </label>
        </div>

        <label class="asowp-block asowp-mt-3">
          <span class="asowp-form-label">{{ __('Pricing used by this material', 'all-signs-options-pro') }}</span>
          <select v-model="newMaterial.pricingId" class="asowp-form-input">
            <option value="">{{ __('Select pricing', 'all-signs-options-pro') }}</option>
            <option v-for="pricing in pricingOptions" :key="pricing.id" :value="pricing.id">
              {{ pricing.label }}
            </option>
          </select>
          <p class="asowp-form-help">{{ __('This pricing profile is applied when this material is selected.', 'all-signs-options-pro') }}</p>
        </label>

        <div class="asowp-material-form-footer">
          <button type="button" @click="back" class="asowp-secondary-button">{{ __('Cancel', 'all-signs-options-pro') }}</button>
          <button type="button" @click="isEdit ? updateMaterial() : addMaterial()" :disabled="isLoading || !newMaterial.label.trim()" class="asowp-primary-button">
            {{ isLoading ? __('Saving...', 'all-signs-options-pro') : (isEdit ? __('Update material', 'all-signs-options-pro') : __('Save material', 'all-signs-options-pro')) }}
          </button>
        </div>
      </div>
    </template>

    <div v-if="openModal" class="asowp-fixed asowp-inset-0 asowp-z-[20000] asowp-flex asowp-items-center asowp-justify-center">
      <div class="asowp-absolute asowp-inset-0 asowp-bg-black/45" @click="closeModal"></div>
      <div class="asowp-delete-modal">
        <h3 class="asowp-text-[16px] asowp-font-[900] asowp-text-[#303030] asowp-mt-0 asowp-mb-2">{{ __('Delete material?', 'all-signs-options-pro') }}</h3>
        <p class="asowp-text-[13px] asowp-text-[#616161] asowp-mt-0 asowp-mb-5">{{ sprintf(__('Are you sure you want to delete "%s"?', 'all-signs-options-pro'), selectedMaterial?.label || selectedMaterial?.name || '') }}</p>
        <div class="asowp-flex asowp-justify-end asowp-gap-2">
          <button type="button" @click="closeModal" class="asowp-secondary-button">{{ __('Cancel', 'all-signs-options-pro') }}</button>
          <button type="button" @click="deleteMaterial" :disabled="isLoading" class="asowp-danger-button">{{ __('Delete', 'all-signs-options-pro') }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import api from "@/admin/Api/api";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import toastMessage from "@/admin/utils/functions";
import { Edit2Icon, Loader2Icon, PlusIcon, Trash2Icon } from "lucide-vue-next";
import { __, sprintf } from "@wordpress/i18n";

const route = useRoute();
const configID = ref(route.params.configId);

const isFetching = ref(true);
const isLoading = ref(false);
const isNewComponent = ref(false);
const isEdit = ref(false);
const openModal = ref(false);
const editingIndex = ref(null);

const materials = ref([]);
const selectedMaterial = ref(null);
const pricingOptions = ref([]);

const materialIdCounter = ref(0);

const newMaterial = ref({
  label: "",
  description: "",
  image: "",
  previewImg: "",
  popupImg: "",
  popupImage: "",
  pricingId: "",
  active: true,
  additionalPrice: 0,
  isDefault: false,
  sourceIndex: 0,
  excludeComponentIds: [],
});

const getMaterialPreview = (material) => material?.previewImg || material?.image || material?.icon || "";
const getMaterialLabel = (material) => material?.label || material?.name || material?.title || "";
const displayFileName = (value = "") => {
  const file = String(value || "").split("?")[0].split("#")[0];
  if (!file) return "";
  const parts = file.split("/");
  return parts[parts.length - 1] || file;
};

const fetchMaterials = async () => {
  isFetching.value = true;
  try {
    const rawMaterials = await api.getMaterials(configID.value);
    const items = Array.isArray(rawMaterials?.items) ? rawMaterials.items : [];
    materials.value = Array.isArray(items)
      ? items.map((m, index) => ({
          ...m,
          id: String(m?.id || m?.materialKey || `material-${index + 1}`),
          label: String(m?.label || m?.name || m?.title || ""),
          image: m?.image || m?.icon || m?.previewImg || "",
          previewImg: m?.previewImg || m?.image || m?.icon || "",
          popupImg: m?.popupImg || "",
          popupImage: m?.popupImage || "",
          pricingId: m?.pricingId || "",
          active: m?.active !== undefined ? Boolean(m?.active) : true,
          isDefault: Boolean(m?.isDefault),
          sourceIndex: Number(m?.sourceIndex ?? index),
          additionalPrice: Number(m?.additionalPrice || 0),
          excludeComponentIds: Array.isArray(m?.excludeComponentIds) ? m.excludeComponentIds : [],
        }))
      : [];
    materialIdCounter.value = materials.value.length;
  } finally {
    isFetching.value = false;
  }
};

const fetchPricingOptions = async () => {
  try {
    const pricingData = await api.getRequiredOptionPricings(configID.value);
    const items = Array.isArray(pricingData?.items)
      ? pricingData.items
      : Array.isArray(pricingData?.priceOptions)
        ? pricingData.priceOptions
        : Array.isArray(pricingData?.data?.pricings?.items)
          ? pricingData.data.pricings.items
          : Array.isArray(pricingData?.data?.pricing?.priceOptions)
            ? pricingData.data.pricing.priceOptions
            : [];
    pricingOptions.value = items.map((item, index) => ({
      id: String(item?.id || `pricing-${index + 1}`),
      label: String(item?.label || item?.title || `Pricing ${index + 1}`),
    }));
  } catch {
    pricingOptions.value = [];
  }
};

const addMaterial = async () => {
  if (!newMaterial.value.label.trim()) return;
  isLoading.value = true;
  try {
    const result = await api.addMaterial(configID.value, {
      ...newMaterial.value,
      previewImg: newMaterial.value.previewImg || newMaterial.value.image || "",
      popupImage: newMaterial.value.popupImage || "",
      isDefault: materials.value.length === 0,
    });
    if (result?.success) {
      await fetchMaterials();
      toastMessage(result.message || __("Material added", "all-signs-options-pro"));
      back();
      return;
    }
    toastMessage(result?.message || __("Unable to add material", "all-signs-options-pro"), "warning");
  } finally {
    isLoading.value = false;
  }
};

const updateMaterial = async () => {
  if (editingIndex.value === null || !newMaterial.value.label.trim()) return;
  isLoading.value = true;
  try {
    const current = materials.value[editingIndex.value] || {};
    const result = await api.updateMaterial(configID.value, editingIndex.value, {
      ...current,
      ...newMaterial.value,
      previewImg: newMaterial.value.previewImg || newMaterial.value.image || current.previewImg || current.image || "",
      popupImage: newMaterial.value.popupImage || current.popupImage || "",
    });
    if (result?.success || result?.success === "same") {
      await fetchMaterials();
      toastMessage(result.message || __("Material updated", "all-signs-options-pro"));
      back();
      return;
    }
    toastMessage(result?.message || __("Unable to update material", "all-signs-options-pro"), "warning");
  } finally {
    isLoading.value = false;
  }
};

const editMaterial = (index) => {
  editingIndex.value = index;
  const m = materials.value[index];
  newMaterial.value = {
    label: m?.label || m?.name || "",
    description: m?.description || "",
    image: m?.image || m?.previewImg || m?.icon || "",
    previewImg: m?.previewImg || m?.image || m?.icon || "",
    popupImg: m?.popupImg || "",
    popupImage: m?.popupImage || "",
    pricingId: m?.pricingId || "",
    active: m?.active !== undefined ? Boolean(m?.active) : true,
    additionalPrice: Number(m?.additionalPrice || 0),
    isDefault: Boolean(m?.isDefault),
    sourceIndex: Number(m?.sourceIndex ?? index),
    excludeComponentIds: Array.isArray(m?.excludeComponentIds) ? m.excludeComponentIds : [],
  };
  isEdit.value = true;
  isNewComponent.value = true;
};

const selectDeleteMaterial = (index) => {
  editingIndex.value = index;
  selectedMaterial.value = materials.value[index];
  openModal.value = true;
};

const deleteMaterial = async () => {
  if (editingIndex.value === null) return;
  isLoading.value = true;
  try {
    const result = await api.deleteMaterial(configID.value, editingIndex.value);
    if (result?.success) {
      openModal.value = false;
      await fetchMaterials();
      toastMessage(result.message || __("Material deleted", "all-signs-options-pro"));
      return;
    }
    toastMessage(result?.message || __("Unable to delete material", "all-signs-options-pro"), "warning");
  } finally {
    isLoading.value = false;
  }
};

const selectDefault = async (index) => {
  const current = materials.value[index];
  if (!current || current.isDefault || isLoading.value) return;
  isLoading.value = true;
  try {
    const result = await api.setDefaultMaterial(configID.value, current.id || index);
    if (result?.success || result?.success === "same") {
      await fetchMaterials();
      toastMessage(result.message || __("Default material updated", "all-signs-options-pro"));
      return;
    }
    toastMessage(result?.message || __("Unable to update default material", "all-signs-options-pro"), "warning");
  } finally {
    isLoading.value = false;
  }
};

const addComponent = () => {
  isEdit.value = false;
  editingIndex.value = null;
  newMaterial.value = {
    label: "",
    description: "",
    image: "",
    previewImg: "",
    popupImg: "",
    popupImage: "",
    pricingId: "",
    active: true,
    additionalPrice: 0,
    isDefault: false,
    sourceIndex: 0,
    excludeComponentIds: [],
  };
  isNewComponent.value = true;
};

const back = () => {
  isNewComponent.value = false;
  isEdit.value = false;
  editingIndex.value = null;
};

const closeModal = () => {
  openModal.value = false;
  selectedMaterial.value = null;
};

const selectPreviewImage = () => {
  if (!window.wp?.media) return;
  const uploader = window.wp.media({
    title: __("Select preview image", "all-signs-options-pro"),
    button: { text: __("Use image", "all-signs-options-pro") },
    multiple: false,
  });
  uploader.on("select", () => {
    const attachment = uploader.state().get("selection").first()?.toJSON();
    if (attachment?.url) {
      newMaterial.value.image = attachment.url;
      newMaterial.value.previewImg = attachment.url;
    }
  });
  uploader.open();
};

const selectPopupImage = () => {
  if (!window.wp?.media) return;
  const uploader = window.wp.media({
    title: __("Select popup image", "all-signs-options-pro"),
    button: { text: __("Use image", "all-signs-options-pro") },
    multiple: false,
  });
  uploader.on("select", () => {
    const attachment = uploader.state().get("selection").first()?.toJSON();
    if (attachment?.url) {
      newMaterial.value.popupImg = attachment.url;
      newMaterial.value.popupImage = attachment.url;
    }
  });
  uploader.open();
};

onMounted(async () => {
  await Promise.all([fetchMaterials(), fetchPricingOptions()]);
});
</script>

<style scoped>
.asowp-materials-panel { color: #303030; }
.asowp-toggle { width: 38px; height: 22px; padding: 0; border: 0; border-radius: 999px; background: #d9dee8; position: relative; cursor: pointer; transition: background 120ms ease; }
.asowp-toggle span { width: 18px; height: 18px; border-radius: 999px; background: #fff; position: absolute; left: 2px; top: 2px; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.18); transition: transform 120ms ease; }
.asowp-toggle.is-active { background: #007a72; }
.asowp-toggle.is-active span { transform: translateX(16px); }
.asowp-form-label { display: block; margin-bottom: 4px; color: #303030; font-size: 12px; line-height: 16px; }
.asowp-form-help { margin: 4px 0 0; color: #616161; font-size: 11px; line-height: 16px; }
.asowp-form-input { box-sizing: border-box; width: 100%; max-width: 100%; height: 38px; padding: 6px 10px; border: 1px solid #8c9196; border-radius: 7px; background: #fff; color: #303030; font-size: 13px; line-height: 20px; box-shadow: none; }
.asowp-form-input:focus { outline: 2px solid #005bd3; outline-offset: 1px; border-color: #8c9196; box-shadow: none; }
.asowp-file-input { box-sizing: border-box; width: 100%; max-width: 100%; height: 38px; border: 1px solid #8c9196; border-radius: 7px; display: flex; align-items: center; background: #fff; overflow: hidden; }
.asowp-file-input input { flex: 1; min-width: 0; height: 100%; border: 0; border-radius: 0; box-shadow: none; padding: 0 10px; font-size: 13px; background: transparent; }
.asowp-file-button { margin-left: 5px; min-height: 30px; padding: 6px 12px; border: 0; border-radius: 6px; background: #007a72; color: #fff; font-size: 12px; line-height: 16px; font-weight: 800; cursor: pointer; }
.asowp-preview-thumb { display: inline-flex; align-items: center; justify-content: center; width: 72px; height: 72px; margin-top: 10px; border: 1px solid #d1d5db; border-radius: 8px; overflow: hidden; background: #f8fafc; }
.asowp-preview-thumb img { width: 100%; height: 100%; object-fit: cover; }
.asowp-material-form-footer { display: flex; justify-content: flex-end; gap: 8px; margin-top: 16px; padding-top: 16px; border: 0 !important; border-top: 1px solid #e5e7eb !important; box-shadow: none !important; outline: 0 !important; }
.asowp-materials-table, .asowp-materials-table thead, .asowp-materials-table tbody, .asowp-materials-table tr, .asowp-materials-table th, .asowp-materials-table td { border-left: 0 !important; border-right: 0 !important; outline: 0 !important; box-shadow: none !important; }
.asowp-materials-table { border: 0 !important; }
.asowp-materials-table th { padding: 9px 12px; border-top: 0 !important; border-bottom: 0 !important; color: #616161; font-size: 11px; line-height: 16px; font-weight: 700; text-align: left; }
.asowp-materials-table td { padding: 8px 12px; border-top: 0 !important; border-bottom: 0 !important; color: #303030; font-size: 12px; line-height: 18px; text-align: left; }
.asowp-materials-table tbody tr { border-bottom: 1px solid #e5e7eb !important; }
.asowp-materials-table tbody tr:last-child { border-bottom: 0 !important; }
.asowp-outline-button, .asowp-secondary-button, .asowp-primary-button, .asowp-danger-button { display: inline-flex; align-items: center; justify-content: center; gap: 6px; min-height: 30px; padding: 6px 11px; border-radius: 7px; font-size: 12px; line-height: 16px; font-weight: 800; cursor: pointer; }
.asowp-primary-button { border: 0; background: #007a72; color: #fff; }
.asowp-primary-button:hover { background: #00645f; color: #fff; }
.asowp-primary-button:disabled { background: #d8d8d8; color: #fff; cursor: not-allowed; }
.asowp-secondary-button, .asowp-outline-button { border: 1px solid #c9cccf; background: #fff; color: #303030; }
.asowp-secondary-button:hover, .asowp-outline-button:hover { background: #f6f6f7; color: #303030; }
.asowp-link-danger { display: inline-flex; align-items: center; gap: 5px; border: 0; background: transparent; color: #8e1f0b; font-size: 12px; line-height: 16px; font-weight: 800; cursor: pointer; }
.asowp-danger-button { border: 0; background: #8e1f0b; color: #fff; }
.asowp-delete-modal { position: relative; width: min(420px, 92vw); padding: 20px; border-radius: 12px; background: #fff; box-shadow: 0 18px 42px rgba(0, 0, 0, 0.2); }
</style>
