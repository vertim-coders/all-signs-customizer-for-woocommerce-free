<template>
  <div class="ascwo-space-y-3">
    <section class="ascwo-bg-white ascwo-border ascwo-border-solid ascwo-border-[#d1d5db] ascwo-rounded-xl ascwo-shadow-sm ascwo-px-5 ascwo-py-4 ascwo-flex ascwo-items-center ascwo-justify-between ascwo-gap-4">
      <div class="ascwo-flex ascwo-items-center ascwo-gap-3">
        <button type="button" @click="router.push({ name: 'managecliparts' })" class="ascwo-bg-transparent ascwo-border-none ascwo-p-0 ascwo-text-[14px] ascwo-leading-5 ascwo-font-[900] ascwo-text-[#303030] ascwo-cursor-pointer hover:ascwo-text-[#303030]">
          {{ __('Clipart groups', 'all-signs-customizer-for-woocommerce-pro') }}
        </button>
        <ChevronRightIcon class="ascwo-w-5 ascwo-h-5 ascwo-text-[#6b7280]" />
        <span class="ascwo-text-[14px] ascwo-leading-5 ascwo-font-[700] ascwo-text-[#616161]">{{ groupTitle }}</span>
      </div>
      <button type="button" @click="router.push({ name: 'managecliparts' })" class="ascwo-h-8 ascwo-px-3 ascwo-rounded-lg ascwo-bg-white ascwo-border ascwo-border-solid ascwo-border-[#c9cccf] ascwo-text-[#202223] ascwo-text-[13px] ascwo-font-[700] ascwo-cursor-pointer hover:ascwo-bg-[#f6f6f7] hover:ascwo-text-[#202223]">
        {{ __('Back to clipart groups', 'all-signs-customizer-for-woocommerce-pro') }}
      </button>
    </section>

    <template v-if="!isNew">
      <section class="ascwo-bg-white ascwo-border ascwo-border-solid ascwo-border-[#d1d5db] ascwo-rounded-xl ascwo-shadow-sm ascwo-px-5 ascwo-py-4 ascwo-flex ascwo-items-center ascwo-justify-between ascwo-gap-4">
        <div>
          <h1 class="ascwo-m-0 ascwo-text-[20px] ascwo-leading-6 ascwo-font-[900] ascwo-text-[#303030]">{{ __('Cliparts', 'all-signs-customizer-for-woocommerce-pro') }}</h1>
          <p class="ascwo-m-0 ascwo-mt-1 ascwo-text-[13px] ascwo-leading-4 ascwo-text-[#616161]">{{ __('Manage the cliparts inside this group.', 'all-signs-customizer-for-woocommerce-pro') }}</p>
        </div>
        <button type="button" @click="goToCreateClipart" class="ascwo-h-8 ascwo-px-3 ascwo-rounded-lg ascwo-bg-[#00796b] ascwo-border ascwo-border-solid ascwo-border-[#005f55] ascwo-text-white ascwo-text-[13px] ascwo-font-[800] ascwo-cursor-pointer hover:ascwo-bg-[#00695f] hover:ascwo-text-white ascwo-inline-flex ascwo-items-center ascwo-gap-2">
          <PlusIcon class="ascwo-w-4 ascwo-h-4" />
          {{ __('Add new clipart', 'all-signs-customizer-for-woocommerce-pro') }}
        </button>
      </section>

      <section class="ascwo-bg-white ascwo-border ascwo-border-solid ascwo-border-[#d1d5db] ascwo-rounded-xl ascwo-shadow-sm ascwo-px-5 ascwo-py-4">
        <div v-if="isFetching" class="ascwo-min-h-[200px] ascwo-flex ascwo-items-center ascwo-justify-center ascwo-text-[13px] ascwo-text-[#616161]">
          {{ __('Loading...', 'all-signs-customizer-for-woocommerce-pro') }}
        </div>
        <div v-else-if="clipartGroups.length === 0" class="ascwo-min-h-[220px] ascwo-flex ascwo-flex-col ascwo-items-center ascwo-justify-center ascwo-text-center">
          <SearchIcon class="ascwo-w-16 ascwo-h-16 ascwo-text-[#8c9196] ascwo-mb-5" />
          <h2 class="ascwo-m-0 ascwo-text-[20px] ascwo-leading-6 ascwo-font-[900] ascwo-text-[#303030]">{{ __('No Cliparts found', 'all-signs-customizer-for-woocommerce-pro') }}</h2>
          <p class="ascwo-m-0 ascwo-mt-3 ascwo-text-[13px] ascwo-text-[#616161]">{{ __('Try changing the filters or search term', 'all-signs-customizer-for-woocommerce-pro') }}</p>
        </div>
        <table v-else class="ascwo-cliparts-table ascwo-w-full ascwo-border-collapse ascwo-text-left">
          <thead class="ascwo-bg-[#f6f6f7]">
            <tr>
              <th class="ascwo-px-3 ascwo-py-2.5 ascwo-text-[12px] ascwo-font-[800] ascwo-text-[#616161]">{{ __('Title', 'all-signs-customizer-for-woocommerce-pro') }}</th>
              <th class="ascwo-px-3 ascwo-py-2.5 ascwo-text-[12px] ascwo-font-[800] ascwo-text-[#616161]">{{ __('Image', 'all-signs-customizer-for-woocommerce-pro') }}</th>
              <th class="ascwo-px-3 ascwo-py-2.5 ascwo-text-[12px] ascwo-font-[800] ascwo-text-[#616161]">{{ __('Additional Price', 'all-signs-customizer-for-woocommerce-pro') }}</th>
              <th class="ascwo-px-3 ascwo-py-2.5 ascwo-text-[12px] ascwo-font-[800] ascwo-text-[#616161]">{{ __('Actions', 'all-signs-customizer-for-woocommerce-pro') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, key) in clipartGroups" :key="key" class="ascwo-border-b ascwo-border-solid ascwo-border-[#e5e7eb]">
              <td class="ascwo-px-3 ascwo-py-2.5 ascwo-text-[13px] ascwo-font-[800] ascwo-text-[#202223]">{{ item.title || '-' }}</td>
              <td class="ascwo-px-3 ascwo-py-3">
                <img v-if="item.url" :src="item.url" class="ascwo-w-12 ascwo-h-12 ascwo-object-contain ascwo-rounded-lg ascwo-border ascwo-border-solid ascwo-border-[#d9dee3]" alt="">
                <span v-else>-</span>
              </td>
              <td class="ascwo-px-3 ascwo-py-2.5 ascwo-text-[13px] ascwo-text-[#303030]">{{ item.additionalPrice || 0 }} {{ currency_symbol }}</td>
              <td class="ascwo-px-3 ascwo-py-3">
                <div class="ascwo-flex ascwo-items-center ascwo-gap-2">
                  <button type="button" @click="goToEditClipart(key)" class="ascwo-h-7 ascwo-px-2.5 ascwo-rounded-lg ascwo-bg-white ascwo-border ascwo-border-solid ascwo-border-[#c9cccf] ascwo-text-[13px] ascwo-font-[700] ascwo-cursor-pointer hover:ascwo-bg-[#f6f6f7] hover:ascwo-text-[#202223]">{{ __('Edit', 'all-signs-customizer-for-woocommerce-pro') }}</button>
                  <button type="button" @click="selectClipart(key, item, true)" class="ascwo-h-7 ascwo-px-2.5 ascwo-rounded-lg ascwo-bg-white ascwo-border ascwo-border-solid ascwo-border-[#c9cccf] ascwo-text-[#8a0f00] ascwo-text-[13px] ascwo-font-[700] ascwo-cursor-pointer hover:ascwo-bg-[#f6f6f7] hover:ascwo-text-[#8a0f00]">{{ __('Delete', 'all-signs-customizer-for-woocommerce-pro') }}</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </template>

    <template v-else>
      <section class="ascwo-bg-white ascwo-border ascwo-border-solid ascwo-border-[#d1d5db] ascwo-rounded-xl ascwo-shadow-sm ascwo-px-5 ascwo-py-4">
        <h1 class="ascwo-m-0 ascwo-text-[20px] ascwo-leading-6 ascwo-font-[900] ascwo-text-[#303030]">{{ isEdit ? __('Edit clipart', 'all-signs-customizer-for-woocommerce-pro') : __('Add clipart', 'all-signs-customizer-for-woocommerce-pro') }}</h1>
      </section>

      <section class="ascwo-bg-white ascwo-border ascwo-border-solid ascwo-border-[#d1d5db] ascwo-rounded-xl ascwo-shadow-sm ascwo-px-5 ascwo-py-4">
        <div class="ascwo-flex ascwo-items-center ascwo-gap-3 ascwo-mb-5">
          <span class="ascwo-text-[13px] ascwo-text-[#616161]">{{ __('Upload', 'all-signs-customizer-for-woocommerce-pro') }}</span>
          <label class="ascwo-inline-flex ascwo-items-center">
            <input type="checkbox" class="ascwo-sr-only ascwo-peer" v-model="useApi" :disabled="isEdit">
            <span class="ascwo-w-10 ascwo-h-6 ascwo-rounded-full ascwo-bg-[#00796b] ascwo-relative ascwo-cursor-pointer peer-checked:ascwo-bg-[#d8dee9] after:ascwo-content-[''] after:ascwo-absolute after:ascwo-top-0.5 after:ascwo-left-0.5 after:ascwo-w-5 after:ascwo-h-5 after:ascwo-rounded-full after:ascwo-bg-white after:ascwo-shadow after:ascwo-transition-transform peer-checked:after:ascwo-translate-x-4"></span>
          </label>
          <span class="ascwo-text-[13px] ascwo-text-[#616161]">{{ __('API', 'all-signs-customizer-for-woocommerce-pro') }}</span>
        </div>

        <div v-if="!useApi || isEdit" class="ascwo-space-y-3">
          <div v-for="(row, key) in editableRows" :key="key" class="ascwo-border ascwo-border-solid ascwo-border-[#d1d5db] ascwo-rounded-xl ascwo-p-4">
            <h2 class="ascwo-m-0 ascwo-mb-3 ascwo-text-[14px] ascwo-font-[900] ascwo-text-[#303030]">{{ __('Clipart', 'all-signs-customizer-for-woocommerce-pro') }} {{ key + 1 }}</h2>
            <div class="ascwo-grid md:ascwo-grid-cols-2 ascwo-gap-4">
              <label class="ascwo-block ascwo-text-[13px] ascwo-text-[#303030]">
                {{ __('Label', 'all-signs-customizer-for-woocommerce-pro') }}
                <input v-model="row.title" type="text" class="ascwo-mt-2 ascwo-box-border ascwo-w-full ascwo-h-9 ascwo-rounded-lg ascwo-border ascwo-border-solid ascwo-border-[#8c9196] ascwo-px-3 ascwo-text-[13px] ascwo-outline-none focus:ascwo-border-[#008060]">
              </label>
              <label class="ascwo-block ascwo-text-[13px] ascwo-text-[#303030]">
                {{ __('Additional price', 'all-signs-customizer-for-woocommerce-pro') }}
                <input v-model="row.additionalPrice" type="number" class="ascwo-mt-2 ascwo-box-border ascwo-w-full ascwo-h-9 ascwo-rounded-lg ascwo-border ascwo-border-solid ascwo-border-[#8c9196] ascwo-px-3 ascwo-text-[13px] ascwo-outline-none focus:ascwo-border-[#008060]">
              </label>
            </div>
            <label class="ascwo-block ascwo-mt-4 ascwo-text-[13px] ascwo-text-[#303030]">
              {{ __('Clipart image', 'all-signs-customizer-for-woocommerce-pro') }}
              <div class="ascwo-mt-2 ascwo-flex ascwo-items-center ascwo-justify-between ascwo-h-10 ascwo-rounded-lg ascwo-border ascwo-border-solid ascwo-border-[#303030] ascwo-overflow-hidden ascwo-bg-white">
                <button type="button" @click="(event) => selectClipartImage(event, key)" class="ascwo-ml-1 ascwo-h-7 ascwo-px-3 ascwo-rounded-lg ascwo-bg-[#00796b] ascwo-border ascwo-border-solid ascwo-border-[#005f55] ascwo-text-white ascwo-text-[13px] ascwo-font-[800] ascwo-cursor-pointer hover:ascwo-bg-[#00695f] hover:ascwo-text-white">{{ __('Clipart image', 'all-signs-customizer-for-woocommerce-pro') }}</button>
                <div class="ascwo-w-9 ascwo-h-9 ascwo-rounded-lg ascwo-border-l ascwo-border-solid ascwo-border-[#e5e7eb] ascwo-flex ascwo-items-center ascwo-justify-center ascwo-overflow-hidden">
                  <img v-if="row.url" :src="row.url" class="ascwo-w-full ascwo-h-full ascwo-object-cover" alt="">
                </div>
              </div>
            </label>
            <button v-if="!isEdit && editableRows.length > 1" type="button" @click="handleDeleteClipartSelected(key)" class="ascwo-mt-4 ascwo-h-7 ascwo-px-2.5 ascwo-rounded-lg ascwo-bg-white ascwo-border ascwo-border-solid ascwo-border-[#c9cccf] ascwo-text-[#8a0f00] ascwo-text-[13px] ascwo-font-[700] ascwo-cursor-pointer hover:ascwo-bg-[#f6f6f7] hover:ascwo-text-[#8a0f00]">{{ __('Remove', 'all-signs-customizer-for-woocommerce-pro') }}</button>
          </div>
          <button v-if="!isEdit" type="button" @click="handleAddClipart" class="ascwo-h-7 ascwo-px-2.5 ascwo-rounded-lg ascwo-bg-white ascwo-border ascwo-border-solid ascwo-border-[#c9cccf] ascwo-text-[13px] ascwo-font-[700] ascwo-cursor-pointer hover:ascwo-bg-[#f6f6f7] hover:ascwo-text-[#202223]">{{ __('Add clipart', 'all-signs-customizer-for-woocommerce-pro') }}</button>
        </div>

        <div v-else class="ascwo-space-y-4">
          <div class="ascwo-flex ascwo-items-center ascwo-gap-3">
            <select v-model="selectedCategory" class="ascwo-h-8 ascwo-rounded-lg ascwo-border ascwo-border-solid ascwo-border-[#8c9196] ascwo-px-3 ascwo-text-[13px]">
              <option v-for="category in apiCategories" :key="category.value" :value="category.value">{{ category.label }}</option>
            </select>
            <button type="button" @click="getApiCliparts" class="ascwo-h-8 ascwo-px-3 ascwo-rounded-lg ascwo-bg-[#00796b] ascwo-border ascwo-border-solid ascwo-border-[#005f55] ascwo-text-white ascwo-text-[13px] ascwo-font-[800] ascwo-cursor-pointer hover:ascwo-bg-[#00695f] hover:ascwo-text-white">{{ __('Get', 'all-signs-customizer-for-woocommerce-pro') }}</button>
          </div>
          <div class="ascwo-grid ascwo-grid-cols-8 ascwo-gap-3">
            <label v-for="(apiClipart, key) in apiCliparts" :key="key" :class="['ascwo-w-16 ascwo-h-16 ascwo-rounded-lg ascwo-border ascwo-border-solid ascwo-border-[#d1d5db] ascwo-bg-white ascwo-flex ascwo-items-center ascwo-justify-center ascwo-cursor-pointer', clipartsSelected[key] ? 'ascwo-ring-2 ascwo-ring-[#00796b]' : '']">
              <input type="checkbox" class="ascwo-sr-only" @change="(event) => handleSelectClipart(event, key)">
              <img :src="apiClipart" class="ascwo-w-12 ascwo-h-12 ascwo-object-contain" alt="">
            </label>
          </div>
          <button v-if="Object.keys(clipartsSelected).length" type="button" @click="displayAllChoice" class="ascwo-h-8 ascwo-px-3 ascwo-rounded-lg ascwo-bg-[#00796b] ascwo-border ascwo-border-solid ascwo-border-[#005f55] ascwo-text-white ascwo-text-[13px] ascwo-font-[800] ascwo-cursor-pointer hover:ascwo-bg-[#00695f] hover:ascwo-text-white">{{ __('I made my choices', 'all-signs-customizer-for-woocommerce-pro') }}</button>
        </div>

        <div class="ascwo-mt-6 ascwo-flex ascwo-justify-end ascwo-gap-3">
          <button type="button" @click="back" class="ascwo-h-8 ascwo-px-3 ascwo-rounded-lg ascwo-bg-white ascwo-border ascwo-border-solid ascwo-border-[#c9cccf] ascwo-text-[#202223] ascwo-text-[13px] ascwo-font-[700] ascwo-cursor-pointer hover:ascwo-bg-[#f6f6f7] hover:ascwo-text-[#202223]">{{ __('Back', 'all-signs-customizer-for-woocommerce-pro') }}</button>
          <button type="button" @click="isEdit ? updateClipart() : saveClipart()" :disabled="isLoading" class="ascwo-h-8 ascwo-px-3 ascwo-rounded-lg ascwo-bg-[#00796b] ascwo-border ascwo-border-solid ascwo-border-[#005f55] ascwo-text-white ascwo-text-[13px] ascwo-font-[800] ascwo-cursor-pointer hover:ascwo-bg-[#00695f] hover:ascwo-text-white disabled:ascwo-bg-[#d1d1d1] disabled:ascwo-border-[#d1d1d1]">{{ isLoading ? __('Saving...', 'all-signs-customizer-for-woocommerce-pro') : __('Save', 'all-signs-customizer-for-woocommerce-pro') }}</button>
        </div>
      </section>
    </template>

    <div v-if="openModal" class="ascwo-fixed ascwo-inset-0 ascwo-z-[20000] ascwo-flex ascwo-items-center ascwo-justify-center">
      <div class="ascwo-absolute ascwo-inset-0 ascwo-bg-black/40" @click="closeModal"></div>
      <div class="ascwo-relative ascwo-w-[min(460px,95vw)] ascwo-bg-white ascwo-rounded-xl ascwo-shadow-2xl ascwo-p-5">
        <h2 class="ascwo-m-0 ascwo-text-[20px] ascwo-font-[900] ascwo-text-[#303030]">{{ __('Delete clipart?', 'all-signs-customizer-for-woocommerce-pro') }}</h2>
        <p class="ascwo-mt-3 ascwo-text-[13px] ascwo-text-[#616161]">{{ __('This action cannot be undone.', 'all-signs-customizer-for-woocommerce-pro') }}</p>
        <div class="ascwo-mt-6 ascwo-flex ascwo-justify-end ascwo-gap-3">
          <button type="button" @click="closeModal" class="ascwo-h-8 ascwo-px-3 ascwo-rounded-lg ascwo-bg-white ascwo-border ascwo-border-solid ascwo-border-[#c9cccf] ascwo-text-[13px] ascwo-font-[700] ascwo-cursor-pointer hover:ascwo-bg-[#f6f6f7]">{{ __('Cancel', 'all-signs-customizer-for-woocommerce-pro') }}</button>
          <button type="button" @click="deleteClipart" :disabled="isLoading" class="ascwo-h-8 ascwo-px-3 ascwo-rounded-lg ascwo-bg-[#8a0f00] ascwo-border-none ascwo-text-white ascwo-text-[13px] ascwo-font-[800] ascwo-cursor-pointer hover:ascwo-bg-[#731000] hover:ascwo-text-white">{{ __('Delete', 'all-signs-customizer-for-woocommerce-pro') }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import { ChevronRightIcon, PlusIcon, SearchIcon } from 'lucide-vue-next';
import api from '@/admin/Api/api';
import toastMessage from '@/admin/utils/functions';
import { __ } from "@wordpress/i18n";

const route = useRoute();
const router = useRouter();
const groupId = ref(route.params.groupId);
const clipartGroups = ref([]);
const apiCliparts = ref([]);
const cliparts = ref([{ title: "", url: "", additionalPrice: 0 }]);
const allCliparts = ref({});
const clipart = ref({ title: "", url: "", additionalPrice: 0 });
const makeChoice = ref(false);
const useApi = ref(false);
const selectedCategory = ref('animals');
const currency_symbol = ref(ascwo_data.currencySymbol);
const groupTitle = ref('');
const clipartId = ref(null);
const isFetching = ref(false);
const isLoading = ref(false);
const notFoundMessage = ref('');
const isNew = ref(false);
const isEdit = ref(false);
const openModal = ref(false);
const clipartsSelected = ref({});

const editableRows = computed(() => isEdit.value ? [clipart.value] : cliparts.value);
const apiCategories = [
  { value: 'animals', label: __('Animals', 'all-signs-customizer-for-woocommerce-pro') },
  { value: 'arrows', label: __('Arrows', 'all-signs-customizer-for-woocommerce-pro') },
  { value: 'decorationFestivities', label: __('Decoration & Festivities', 'all-signs-customizer-for-woocommerce-pro') },
  { value: 'emojisFlags', label: __('Emojis & Flags', 'all-signs-customizer-for-woocommerce-pro') },
  { value: 'foodsDrinks', label: __('Foods & Drinks', 'all-signs-customizer-for-woocommerce-pro') },
  { value: 'healthcare', label: __('Healthcare', 'all-signs-customizer-for-woocommerce-pro') },
  { value: 'householdTools', label: __('Household Tools', 'all-signs-customizer-for-woocommerce-pro') },
  { value: 'mostPopular', label: __('Most Popular', 'all-signs-customizer-for-woocommerce-pro') },
  { value: 'peoples', label: __('Peoples', 'all-signs-customizer-for-woocommerce-pro') },
  { value: 'plantsNature', label: __('Plants & Nature', 'all-signs-customizer-for-woocommerce-pro') },
  { value: 'prohibitionsWarnings', label: __('Prohibitions & Warnings', 'all-signs-customizer-for-woocommerce-pro') },
  { value: 'shapes', label: __('Shapes', 'all-signs-customizer-for-woocommerce-pro') },
  { value: 'sportActivities', label: __('Sport & Activities', 'all-signs-customizer-for-woocommerce-pro') },
  { value: 'symbolsMarkings', label: __('Symbols & Markings', 'all-signs-customizer-for-woocommerce-pro') },
  { value: 'vehiclesTraffic', label: __('Vehicles & Traffic', 'all-signs-customizer-for-woocommerce-pro') },
  { value: 'others', label: __('Others', 'all-signs-customizer-for-woocommerce-pro') },
];

onMounted(async () => {
  isFetching.value = true;
  await fetchCliparts();
  await fetchApiCliparts();
});

const isClipartEditRoute = () => route.name === "clipart-edit";

const syncClipartRouteState = () => {
  if (!isClipartEditRoute()) {
    isNew.value = false;
    isEdit.value = false;
    return;
  }

  const id = route.query.id;
  if (id === undefined || id === null || id === "") {
    addClipart();
    return;
  }

  const currentClipart = clipartGroups.value[Number(id)];
  if (currentClipart) {
    selectClipart(Number(id), currentClipart);
  }
};

const displayAllChoice = () => {
  cliparts.value = Object.keys(clipartsSelected.value).map(key => ({ title: '', url: clipartsSelected.value[key], additionalPrice: 0 }));
  makeChoice.value = true;
  useApi.value = false;
};

const getApiCliparts = () => {
  apiCliparts.value = allCliparts.value[selectedCategory.value] || [];
};

const fetchApiCliparts = async () => {
  try {
    const result = await axios.get("https://signsdesigner.us/app/ascwo-cliparts/cliparts.json");
    allCliparts.value = result.data || {};
    getApiCliparts();
  } catch (error) {
    allCliparts.value = {};
    apiCliparts.value = [];
  }
};

const handleSelectClipart = (event, key) => {
  if (event.target.checked) {
    clipartsSelected.value[key] = apiCliparts.value[key];
  } else {
    delete clipartsSelected.value[key];
  }
};

const fetchCliparts = async () => {
  const result = await api.getManageClipartItems(groupId.value);
  groupTitle.value = result.groupTitle;
  if (!result.notFoundMessage) {
    clipartGroups.value = Array.isArray(result.cliparts) ? result.cliparts : [];
  } else {
    notFoundMessage.value = result.notFoundMessage;
    clipartGroups.value = [];
  }
  isFetching.value = false;
  syncClipartRouteState();
};

const handleAddClipart = () => {
  cliparts.value.push({ title: "", url: "", additionalPrice: 0 });
};

const saveClipart = async () => {
  isLoading.value = true;
  const result = await api.addManageclipartItem(groupId.value, cliparts.value);
  isLoading.value = false;
  if (result.success) {
    await fetchCliparts();
    toastMessage(result.message);
    back();
  } else {
    toastMessage(result.message, 'error');
  }
};

const selectClipart = (id, currentClipart, isDeleting = false) => {
  clipartId.value = id;
  clipart.value = { ...currentClipart };
  if (isDeleting) {
    openModal.value = true;
    return;
  }
  isEdit.value = true;
  addClipart();
};

const goToCreateClipart = () => {
  router.push({ name: "clipart-edit", params: { groupId: groupId.value } });
};

const goToEditClipart = (id) => {
  router.push({ name: "clipart-edit", params: { groupId: groupId.value }, query: { id } });
};

const updateClipart = async () => {
  isLoading.value = true;
  const result = await api.updateManageClipartItem(groupId.value, clipartId.value, clipart.value);
  isLoading.value = false;
  if (result.success) {
    await fetchCliparts();
    toastMessage(result.message);
    back();
  } else {
    toastMessage(result.message, 'error');
  }
};

const deleteClipart = async () => {
  isLoading.value = true;
  const result = await api.deleteManageclipartItem(groupId.value, clipartId.value);
  isLoading.value = false;
  if (result.success) {
    await fetchCliparts();
    toastMessage(result.message);
    closeModal();
    back();
  } else {
    toastMessage(result.message, 'error');
  }
};

const closeModal = () => {
  openModal.value = false;
};

const selectClipartImage = async (event, key = -1) => {
  event.preventDefault();
  const uploader = wp.media({
    title: __("Select Image", "all-signs-customizer-for-woocommerce-pro"),
    button: { text: __("Select Image", "all-signs-customizer-for-woocommerce-pro") },
    multiple: false,
  }).on('select', () => {
    const selection = uploader.state().get('selection');
    selection.map((attachment) => {
      attachment = attachment.toJSON();
      if (attachment.type === "image") {
        if (isEdit.value) {
          clipart.value.url = attachment.url;
        } else {
          cliparts.value[key].url = attachment.url;
        }
      }
    });
  }).open();
};

const addClipart = () => {
  isNew.value = true;
};

const back = () => {
  isNew.value = false;
  isEdit.value = false;
  clipart.value = { title: "", url: "", additionalPrice: 0 };
  clipartsSelected.value = {};
  cliparts.value = [{ title: "", url: "", additionalPrice: 0 }];
  useApi.value = false;
  makeChoice.value = false;
  clipartId.value = null;
  if (isClipartEditRoute()) {
    router.push({ name: "cliparts", params: { groupId: groupId.value } });
  }
};

const handleDeleteClipartSelected = (key) => {
  cliparts.value.splice(key, 1);
  if (cliparts.value.length === 0) {
    cliparts.value = [{ title: "", url: "", additionalPrice: 0 }];
  }
};

watch(
  () => [route.name, route.query.id],
  () => syncClipartRouteState()
);
</script>

<style scoped>
.ascwo-cliparts-table,
.ascwo-cliparts-table thead,
.ascwo-cliparts-table tbody,
.ascwo-cliparts-table tr,
.ascwo-cliparts-table th,
.ascwo-cliparts-table td {
  border-left: 0 !important;
  border-right: 0 !important;
}

.ascwo-cliparts-table th,
.ascwo-cliparts-table td {
  border-top: 0 !important;
}

.ascwo-cliparts-table thead tr {
  border-bottom: 1px solid #e5e7eb;
}

.ascwo-cliparts-table tbody tr {
  border-bottom: 1px solid #e5e7eb !important;
}

.ascwo-cliparts-table tbody tr:last-child {
  border-bottom: 0 !important;
}
</style>
