<template>
  <div class="asowp-space-y-3">
    <section class="asowp-bg-white asowp-border asowp-border-solid asowp-border-[#d1d5db] asowp-rounded-xl asowp-shadow-sm asowp-px-5 asowp-py-4 asowp-flex asowp-items-center asowp-justify-between asowp-gap-4">
      <div class="asowp-flex asowp-items-center asowp-gap-3">
        <button type="button" @click="router.push({ name: 'managecliparts' })" class="asowp-bg-transparent asowp-border-none asowp-p-0 asowp-text-[14px] asowp-leading-5 asowp-font-[900] asowp-text-[#303030] asowp-cursor-pointer hover:asowp-text-[#303030]">
          {{ __('Clipart groups', 'all-signs-options-pro') }}
        </button>
        <ChevronRightIcon class="asowp-w-5 asowp-h-5 asowp-text-[#6b7280]" />
        <span class="asowp-text-[14px] asowp-leading-5 asowp-font-[700] asowp-text-[#616161]">{{ groupTitle }}</span>
      </div>
      <button type="button" @click="router.push({ name: 'managecliparts' })" class="asowp-h-8 asowp-px-3 asowp-rounded-lg asowp-bg-white asowp-border asowp-border-solid asowp-border-[#c9cccf] asowp-text-[#202223] asowp-text-[13px] asowp-font-[700] asowp-cursor-pointer hover:asowp-bg-[#f6f6f7] hover:asowp-text-[#202223]">
        {{ __('Back to clipart groups', 'all-signs-options-pro') }}
      </button>
    </section>

    <template v-if="!isNew">
      <section class="asowp-bg-white asowp-border asowp-border-solid asowp-border-[#d1d5db] asowp-rounded-xl asowp-shadow-sm asowp-px-5 asowp-py-4 asowp-flex asowp-items-center asowp-justify-between asowp-gap-4">
        <div>
          <h1 class="asowp-m-0 asowp-text-[20px] asowp-leading-6 asowp-font-[900] asowp-text-[#303030]">{{ __('Cliparts', 'all-signs-options-pro') }}</h1>
          <p class="asowp-m-0 asowp-mt-1 asowp-text-[13px] asowp-leading-4 asowp-text-[#616161]">{{ __('Manage the cliparts inside this group.', 'all-signs-options-pro') }}</p>
        </div>
        <button type="button" @click="goToCreateClipart" class="asowp-h-8 asowp-px-3 asowp-rounded-lg asowp-bg-[#00796b] asowp-border asowp-border-solid asowp-border-[#005f55] asowp-text-white asowp-text-[13px] asowp-font-[800] asowp-cursor-pointer hover:asowp-bg-[#00695f] hover:asowp-text-white asowp-inline-flex asowp-items-center asowp-gap-2">
          <PlusIcon class="asowp-w-4 asowp-h-4" />
          {{ __('Add new clipart', 'all-signs-options-pro') }}
        </button>
      </section>

      <section class="asowp-bg-white asowp-border asowp-border-solid asowp-border-[#d1d5db] asowp-rounded-xl asowp-shadow-sm asowp-px-5 asowp-py-4">
        <div v-if="isFetching" class="asowp-min-h-[200px] asowp-flex asowp-items-center asowp-justify-center asowp-text-[13px] asowp-text-[#616161]">
          {{ __('Loading...', 'all-signs-options-pro') }}
        </div>
        <div v-else-if="clipartGroups.length === 0" class="asowp-min-h-[220px] asowp-flex asowp-flex-col asowp-items-center asowp-justify-center asowp-text-center">
          <SearchIcon class="asowp-w-16 asowp-h-16 asowp-text-[#8c9196] asowp-mb-5" />
          <h2 class="asowp-m-0 asowp-text-[20px] asowp-leading-6 asowp-font-[900] asowp-text-[#303030]">{{ __('No Cliparts found', 'all-signs-options-pro') }}</h2>
          <p class="asowp-m-0 asowp-mt-3 asowp-text-[13px] asowp-text-[#616161]">{{ __('Try changing the filters or search term', 'all-signs-options-pro') }}</p>
        </div>
        <table v-else class="asowp-cliparts-table asowp-w-full asowp-border-collapse asowp-text-left">
          <thead class="asowp-bg-[#f6f6f7]">
            <tr>
              <th class="asowp-px-3 asowp-py-2.5 asowp-text-[12px] asowp-font-[800] asowp-text-[#616161]">{{ __('Title', 'all-signs-options-pro') }}</th>
              <th class="asowp-px-3 asowp-py-2.5 asowp-text-[12px] asowp-font-[800] asowp-text-[#616161]">{{ __('Image', 'all-signs-options-pro') }}</th>
              <th class="asowp-px-3 asowp-py-2.5 asowp-text-[12px] asowp-font-[800] asowp-text-[#616161]">{{ __('Additional Price', 'all-signs-options-pro') }}</th>
              <th class="asowp-px-3 asowp-py-2.5 asowp-text-[12px] asowp-font-[800] asowp-text-[#616161]">{{ __('Actions', 'all-signs-options-pro') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, key) in clipartGroups" :key="key" class="asowp-border-b asowp-border-solid asowp-border-[#e5e7eb]">
              <td class="asowp-px-3 asowp-py-2.5 asowp-text-[13px] asowp-font-[800] asowp-text-[#202223]">{{ item.title || '-' }}</td>
              <td class="asowp-px-3 asowp-py-3">
                <img v-if="item.url" :src="item.url" class="asowp-w-12 asowp-h-12 asowp-object-contain asowp-rounded-lg asowp-border asowp-border-solid asowp-border-[#d9dee3]" alt="">
                <span v-else>-</span>
              </td>
              <td class="asowp-px-3 asowp-py-2.5 asowp-text-[13px] asowp-text-[#303030]">{{ item.additionalPrice || 0 }} {{ currency_symbol }}</td>
              <td class="asowp-px-3 asowp-py-3">
                <div class="asowp-flex asowp-items-center asowp-gap-2">
                  <button type="button" @click="goToEditClipart(key)" class="asowp-h-7 asowp-px-2.5 asowp-rounded-lg asowp-bg-white asowp-border asowp-border-solid asowp-border-[#c9cccf] asowp-text-[13px] asowp-font-[700] asowp-cursor-pointer hover:asowp-bg-[#f6f6f7] hover:asowp-text-[#202223]">{{ __('Edit', 'all-signs-options-pro') }}</button>
                  <button type="button" @click="selectClipart(key, item, true)" class="asowp-h-7 asowp-px-2.5 asowp-rounded-lg asowp-bg-white asowp-border asowp-border-solid asowp-border-[#c9cccf] asowp-text-[#8a0f00] asowp-text-[13px] asowp-font-[700] asowp-cursor-pointer hover:asowp-bg-[#f6f6f7] hover:asowp-text-[#8a0f00]">{{ __('Delete', 'all-signs-options-pro') }}</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </template>

    <template v-else>
      <section class="asowp-bg-white asowp-border asowp-border-solid asowp-border-[#d1d5db] asowp-rounded-xl asowp-shadow-sm asowp-px-5 asowp-py-4">
        <h1 class="asowp-m-0 asowp-text-[20px] asowp-leading-6 asowp-font-[900] asowp-text-[#303030]">{{ isEdit ? __('Edit clipart', 'all-signs-options-pro') : __('Add clipart', 'all-signs-options-pro') }}</h1>
      </section>

      <section class="asowp-bg-white asowp-border asowp-border-solid asowp-border-[#d1d5db] asowp-rounded-xl asowp-shadow-sm asowp-px-5 asowp-py-4">
        <div class="asowp-flex asowp-items-center asowp-gap-3 asowp-mb-5">
          <span class="asowp-text-[13px] asowp-text-[#616161]">{{ __('Upload', 'all-signs-options-pro') }}</span>
          <label class="asowp-inline-flex asowp-items-center">
            <input type="checkbox" class="asowp-sr-only asowp-peer" v-model="useApi" :disabled="isEdit">
            <span class="asowp-w-10 asowp-h-6 asowp-rounded-full asowp-bg-[#00796b] asowp-relative asowp-cursor-pointer peer-checked:asowp-bg-[#d8dee9] after:asowp-content-[''] after:asowp-absolute after:asowp-top-0.5 after:asowp-left-0.5 after:asowp-w-5 after:asowp-h-5 after:asowp-rounded-full after:asowp-bg-white after:asowp-shadow after:asowp-transition-transform peer-checked:after:asowp-translate-x-4"></span>
          </label>
          <span class="asowp-text-[13px] asowp-text-[#616161]">{{ __('API', 'all-signs-options-pro') }}</span>
        </div>

        <div v-if="!useApi || isEdit" class="asowp-space-y-3">
          <div v-for="(row, key) in editableRows" :key="key" class="asowp-border asowp-border-solid asowp-border-[#d1d5db] asowp-rounded-xl asowp-p-4">
            <h2 class="asowp-m-0 asowp-mb-3 asowp-text-[14px] asowp-font-[900] asowp-text-[#303030]">{{ __('Clipart', 'all-signs-options-pro') }} {{ key + 1 }}</h2>
            <div class="asowp-grid md:asowp-grid-cols-2 asowp-gap-4">
              <label class="asowp-block asowp-text-[13px] asowp-text-[#303030]">
                {{ __('Label', 'all-signs-options-pro') }}
                <input v-model="row.title" type="text" class="asowp-mt-2 asowp-box-border asowp-w-full asowp-h-9 asowp-rounded-lg asowp-border asowp-border-solid asowp-border-[#8c9196] asowp-px-3 asowp-text-[13px] asowp-outline-none focus:asowp-border-[#008060]">
              </label>
              <label class="asowp-block asowp-text-[13px] asowp-text-[#303030]">
                {{ __('Additional price', 'all-signs-options-pro') }}
                <input v-model="row.additionalPrice" type="number" class="asowp-mt-2 asowp-box-border asowp-w-full asowp-h-9 asowp-rounded-lg asowp-border asowp-border-solid asowp-border-[#8c9196] asowp-px-3 asowp-text-[13px] asowp-outline-none focus:asowp-border-[#008060]">
              </label>
            </div>
            <label class="asowp-block asowp-mt-4 asowp-text-[13px] asowp-text-[#303030]">
              {{ __('Clipart image', 'all-signs-options-pro') }}
              <div class="asowp-mt-2 asowp-flex asowp-items-center asowp-justify-between asowp-h-10 asowp-rounded-lg asowp-border asowp-border-solid asowp-border-[#303030] asowp-overflow-hidden asowp-bg-white">
                <button type="button" @click="(event) => selectClipartImage(event, key)" class="asowp-ml-1 asowp-h-7 asowp-px-3 asowp-rounded-lg asowp-bg-[#00796b] asowp-border asowp-border-solid asowp-border-[#005f55] asowp-text-white asowp-text-[13px] asowp-font-[800] asowp-cursor-pointer hover:asowp-bg-[#00695f] hover:asowp-text-white">{{ __('Clipart image', 'all-signs-options-pro') }}</button>
                <div class="asowp-w-9 asowp-h-9 asowp-rounded-lg asowp-border-l asowp-border-solid asowp-border-[#e5e7eb] asowp-flex asowp-items-center asowp-justify-center asowp-overflow-hidden">
                  <img v-if="row.url" :src="row.url" class="asowp-w-full asowp-h-full asowp-object-cover" alt="">
                </div>
              </div>
            </label>
            <button v-if="!isEdit && editableRows.length > 1" type="button" @click="handleDeleteClipartSelected(key)" class="asowp-mt-4 asowp-h-7 asowp-px-2.5 asowp-rounded-lg asowp-bg-white asowp-border asowp-border-solid asowp-border-[#c9cccf] asowp-text-[#8a0f00] asowp-text-[13px] asowp-font-[700] asowp-cursor-pointer hover:asowp-bg-[#f6f6f7] hover:asowp-text-[#8a0f00]">{{ __('Remove', 'all-signs-options-pro') }}</button>
          </div>
          <button v-if="!isEdit" type="button" @click="handleAddClipart" class="asowp-h-7 asowp-px-2.5 asowp-rounded-lg asowp-bg-white asowp-border asowp-border-solid asowp-border-[#c9cccf] asowp-text-[13px] asowp-font-[700] asowp-cursor-pointer hover:asowp-bg-[#f6f6f7] hover:asowp-text-[#202223]">{{ __('Add clipart', 'all-signs-options-pro') }}</button>
        </div>

        <div v-else class="asowp-space-y-4">
          <div class="asowp-flex asowp-items-center asowp-gap-3">
            <select v-model="selectedCategory" class="asowp-h-8 asowp-rounded-lg asowp-border asowp-border-solid asowp-border-[#8c9196] asowp-px-3 asowp-text-[13px]">
              <option v-for="category in apiCategories" :key="category.value" :value="category.value">{{ category.label }}</option>
            </select>
            <button type="button" @click="getApiCliparts" class="asowp-h-8 asowp-px-3 asowp-rounded-lg asowp-bg-[#00796b] asowp-border asowp-border-solid asowp-border-[#005f55] asowp-text-white asowp-text-[13px] asowp-font-[800] asowp-cursor-pointer hover:asowp-bg-[#00695f] hover:asowp-text-white">{{ __('Get', 'all-signs-options-pro') }}</button>
          </div>
          <div class="asowp-grid asowp-grid-cols-8 asowp-gap-3">
            <label v-for="(apiClipart, key) in apiCliparts" :key="key" :class="['asowp-w-16 asowp-h-16 asowp-rounded-lg asowp-border asowp-border-solid asowp-border-[#d1d5db] asowp-bg-white asowp-flex asowp-items-center asowp-justify-center asowp-cursor-pointer', clipartsSelected[key] ? 'asowp-ring-2 asowp-ring-[#00796b]' : '']">
              <input type="checkbox" class="asowp-sr-only" @change="(event) => handleSelectClipart(event, key)">
              <img :src="apiClipart" class="asowp-w-12 asowp-h-12 asowp-object-contain" alt="">
            </label>
          </div>
          <button v-if="Object.keys(clipartsSelected).length" type="button" @click="displayAllChoice" class="asowp-h-8 asowp-px-3 asowp-rounded-lg asowp-bg-[#00796b] asowp-border asowp-border-solid asowp-border-[#005f55] asowp-text-white asowp-text-[13px] asowp-font-[800] asowp-cursor-pointer hover:asowp-bg-[#00695f] hover:asowp-text-white">{{ __('I made my choices', 'all-signs-options-pro') }}</button>
        </div>

        <div class="asowp-mt-6 asowp-flex asowp-justify-end asowp-gap-3">
          <button type="button" @click="back" class="asowp-h-8 asowp-px-3 asowp-rounded-lg asowp-bg-white asowp-border asowp-border-solid asowp-border-[#c9cccf] asowp-text-[#202223] asowp-text-[13px] asowp-font-[700] asowp-cursor-pointer hover:asowp-bg-[#f6f6f7] hover:asowp-text-[#202223]">{{ __('Back', 'all-signs-options-pro') }}</button>
          <button type="button" @click="isEdit ? updateClipart() : saveClipart()" :disabled="isLoading" class="asowp-h-8 asowp-px-3 asowp-rounded-lg asowp-bg-[#00796b] asowp-border asowp-border-solid asowp-border-[#005f55] asowp-text-white asowp-text-[13px] asowp-font-[800] asowp-cursor-pointer hover:asowp-bg-[#00695f] hover:asowp-text-white disabled:asowp-bg-[#d1d1d1] disabled:asowp-border-[#d1d1d1]">{{ isLoading ? __('Saving...', 'all-signs-options-pro') : __('Save', 'all-signs-options-pro') }}</button>
        </div>
      </section>
    </template>

    <div v-if="openModal" class="asowp-fixed asowp-inset-0 asowp-z-[20000] asowp-flex asowp-items-center asowp-justify-center">
      <div class="asowp-absolute asowp-inset-0 asowp-bg-black/40" @click="closeModal"></div>
      <div class="asowp-relative asowp-w-[min(460px,95vw)] asowp-bg-white asowp-rounded-xl asowp-shadow-2xl asowp-p-5">
        <h2 class="asowp-m-0 asowp-text-[20px] asowp-font-[900] asowp-text-[#303030]">{{ __('Delete clipart?', 'all-signs-options-pro') }}</h2>
        <p class="asowp-mt-3 asowp-text-[13px] asowp-text-[#616161]">{{ __('This action cannot be undone.', 'all-signs-options-pro') }}</p>
        <div class="asowp-mt-6 asowp-flex asowp-justify-end asowp-gap-3">
          <button type="button" @click="closeModal" class="asowp-h-8 asowp-px-3 asowp-rounded-lg asowp-bg-white asowp-border asowp-border-solid asowp-border-[#c9cccf] asowp-text-[13px] asowp-font-[700] asowp-cursor-pointer hover:asowp-bg-[#f6f6f7]">{{ __('Cancel', 'all-signs-options-pro') }}</button>
          <button type="button" @click="deleteClipart" :disabled="isLoading" class="asowp-h-8 asowp-px-3 asowp-rounded-lg asowp-bg-[#8a0f00] asowp-border-none asowp-text-white asowp-text-[13px] asowp-font-[800] asowp-cursor-pointer hover:asowp-bg-[#731000] hover:asowp-text-white">{{ __('Delete', 'all-signs-options-pro') }}</button>
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
const currency_symbol = ref(asowp_data.currencySymbol);
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
  { value: 'animals', label: __('Animals', 'all-signs-options-pro') },
  { value: 'arrows', label: __('Arrows', 'all-signs-options-pro') },
  { value: 'decorationFestivities', label: __('Decoration & Festivities', 'all-signs-options-pro') },
  { value: 'emojisFlags', label: __('Emojis & Flags', 'all-signs-options-pro') },
  { value: 'foodsDrinks', label: __('Foods & Drinks', 'all-signs-options-pro') },
  { value: 'healthcare', label: __('Healthcare', 'all-signs-options-pro') },
  { value: 'householdTools', label: __('Household Tools', 'all-signs-options-pro') },
  { value: 'mostPopular', label: __('Most Popular', 'all-signs-options-pro') },
  { value: 'peoples', label: __('Peoples', 'all-signs-options-pro') },
  { value: 'plantsNature', label: __('Plants & Nature', 'all-signs-options-pro') },
  { value: 'prohibitionsWarnings', label: __('Prohibitions & Warnings', 'all-signs-options-pro') },
  { value: 'shapes', label: __('Shapes', 'all-signs-options-pro') },
  { value: 'sportActivities', label: __('Sport & Activities', 'all-signs-options-pro') },
  { value: 'symbolsMarkings', label: __('Symbols & Markings', 'all-signs-options-pro') },
  { value: 'vehiclesTraffic', label: __('Vehicles & Traffic', 'all-signs-options-pro') },
  { value: 'others', label: __('Others', 'all-signs-options-pro') },
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
    const result = await axios.get("https://signsdesigner.us/app/asowp-cliparts/cliparts.json");
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
    title: __("Select Image", "all-signs-options-pro"),
    button: { text: __("Select Image", "all-signs-options-pro") },
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
.asowp-cliparts-table,
.asowp-cliparts-table thead,
.asowp-cliparts-table tbody,
.asowp-cliparts-table tr,
.asowp-cliparts-table th,
.asowp-cliparts-table td {
  border-left: 0 !important;
  border-right: 0 !important;
}

.asowp-cliparts-table th,
.asowp-cliparts-table td {
  border-top: 0 !important;
}

.asowp-cliparts-table thead tr {
  border-bottom: 1px solid #e5e7eb;
}

.asowp-cliparts-table tbody tr {
  border-bottom: 1px solid #e5e7eb !important;
}

.asowp-cliparts-table tbody tr:last-child {
  border-bottom: 0 !important;
}
</style>
