<template>
  <div class="ascwo-space-y-3">
    <template v-if="!isAddingGroup">
      <section class="ascwo-bg-white ascwo-border ascwo-border-solid ascwo-border-[#d1d5db] ascwo-rounded-xl ascwo-shadow-sm ascwo-px-5 ascwo-py-4 ascwo-flex ascwo-items-center ascwo-justify-between ascwo-gap-4">
        <div>
          <h1 class="ascwo-m-0 ascwo-text-[20px] ascwo-leading-6 ascwo-font-[900] ascwo-text-[#303030]">{{ __('Cliparts', 'all-signs-customizer-for-woocommerce') }}</h1>
          <p class="ascwo-m-0 ascwo-mt-1 ascwo-text-[13px] ascwo-leading-4 ascwo-text-[#616161]">
            {{ __('Select existing clipart groups for this config or create a new group and save it into Manage cliparts.', 'all-signs-customizer-for-woocommerce') }}
          </p>
        </div>
        <div class="ascwo-flex ascwo-items-center ascwo-gap-3 ascwo-shrink-0">
          <button type="button" @click="goToManageCliparts" class="ascwo-h-8 ascwo-px-3 ascwo-rounded-lg ascwo-bg-white ascwo-border ascwo-border-solid ascwo-border-[#c9cccf] ascwo-text-[#202223] ascwo-text-[13px] ascwo-font-[700] ascwo-cursor-pointer hover:ascwo-bg-[#f6f6f7] hover:ascwo-text-[#202223]">
            {{ __('Manage cliparts', 'all-signs-customizer-for-woocommerce') }}
          </button>
          <button type="button" @click="openAddGroup" class="ascwo-h-8 ascwo-px-3 ascwo-rounded-lg ascwo-bg-[#00796b] ascwo-border ascwo-border-solid ascwo-border-[#005f55] ascwo-text-white ascwo-text-[13px] ascwo-font-[800] ascwo-cursor-pointer hover:ascwo-bg-[#00695f] hover:ascwo-text-white ascwo-inline-flex ascwo-items-center ascwo-gap-2">
            <PlusIcon class="ascwo-w-4 ascwo-h-4" />
            {{ __('Add clipart group', 'all-signs-customizer-for-woocommerce') }}
          </button>
        </div>
      </section>

      <section class="ascwo-bg-white ascwo-border ascwo-border-solid ascwo-border-[#d1d5db] ascwo-rounded-xl ascwo-shadow-sm ascwo-px-5 ascwo-py-4">
        <h2 class="ascwo-m-0 ascwo-mb-3 ascwo-text-[14px] ascwo-leading-5 ascwo-font-[900] ascwo-text-[#303030]">{{ __('Selected groups', 'all-signs-customizer-for-woocommerce') }}</h2>
        <table class="ascwo-cliparts-table ascwo-w-full ascwo-border-collapse ascwo-text-left">
          <thead class="ascwo-bg-[#f6f6f7]">
            <tr>
              <th class="ascwo-px-3 ascwo-py-2.5 ascwo-text-[12px] ascwo-font-[800] ascwo-text-[#616161]">{{ __('Preview', 'all-signs-customizer-for-woocommerce') }}</th>
              <th class="ascwo-px-3 ascwo-py-2.5 ascwo-text-[12px] ascwo-font-[800] ascwo-text-[#616161]">{{ __('Title', 'all-signs-customizer-for-woocommerce') }}</th>
              <th class="ascwo-px-3 ascwo-py-2.5 ascwo-text-[12px] ascwo-font-[800] ascwo-text-[#616161]">{{ __('Cliparts', 'all-signs-customizer-for-woocommerce') }}</th>
              <th class="ascwo-px-3 ascwo-py-2.5 ascwo-text-[12px] ascwo-font-[800] ascwo-text-[#616161]">{{ __('Actions', 'all-signs-customizer-for-woocommerce') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="isFetching">
              <td colspan="4" class="ascwo-table-loader-cell ascwo-px-3 ascwo-py-5 ascwo-text-center">
                <Loader2Icon class="ascwo-table-loader-icon ascwo-w-7 ascwo-h-7" />
              </td>
            </tr>
            <tr v-else-if="selectedGroups.length === 0" class="ascwo-border-b ascwo-border-solid ascwo-border-[#e5e7eb]">
              <td class="ascwo-px-3 ascwo-py-3">
                <div class="ascwo-w-12 ascwo-h-12 ascwo-rounded-lg ascwo-border ascwo-border-solid ascwo-border-[#d9dee3] ascwo-bg-[#f7f8fa] ascwo-flex ascwo-items-center ascwo-justify-center ascwo-text-[#616161]">-</div>
              </td>
              <td class="ascwo-px-3 ascwo-py-3"></td>
              <td class="ascwo-px-3 ascwo-py-2.5 ascwo-text-[13px] ascwo-text-[#303030]">0</td>
              <td class="ascwo-px-3 ascwo-py-3">
                <div class="ascwo-flex ascwo-items-center ascwo-gap-2">
                  <button type="button" disabled class="ascwo-h-7 ascwo-px-2.5 ascwo-rounded-lg ascwo-bg-white ascwo-border ascwo-border-solid ascwo-border-[#c9cccf] ascwo-text-[13px] ascwo-font-[700] ascwo-opacity-60">{{ __('Manage', 'all-signs-customizer-for-woocommerce') }}</button>
                  <button type="button" disabled class="ascwo-h-7 ascwo-px-2.5 ascwo-rounded-lg ascwo-bg-white ascwo-border ascwo-border-solid ascwo-border-[#c9cccf] ascwo-text-[#8a0f00] ascwo-text-[13px] ascwo-font-[700] ascwo-opacity-60 ascwo-inline-flex ascwo-items-center ascwo-gap-1">
                    <Trash2Icon class="ascwo-w-4 ascwo-h-4" />
                    {{ __('Remove', 'all-signs-customizer-for-woocommerce') }}
                  </button>
                </div>
              </td>
            </tr>
            <tr v-for="group in selectedGroups" :key="group.id" class="ascwo-border-b ascwo-border-solid ascwo-border-[#e5e7eb]">
              <td class="ascwo-px-3 ascwo-py-3">
                <div class="ascwo-w-12 ascwo-h-12 ascwo-rounded-lg ascwo-border ascwo-border-solid ascwo-border-[#d9dee3] ascwo-bg-[#f7f8fa] ascwo-flex ascwo-items-center ascwo-justify-center ascwo-overflow-hidden">
                  <img v-if="group.preview" :src="group.preview" class="ascwo-w-full ascwo-h-full ascwo-object-cover" alt="">
                  <span v-else>-</span>
                </div>
              </td>
              <td class="ascwo-px-3 ascwo-py-2.5 ascwo-text-[13px] ascwo-font-[800] ascwo-text-[#303030]">{{ group.title || '-' }}</td>
              <td class="ascwo-px-3 ascwo-py-2.5 ascwo-text-[13px] ascwo-text-[#303030]">{{ group.count || 0 }}</td>
              <td class="ascwo-px-3 ascwo-py-3">
                <div class="ascwo-flex ascwo-items-center ascwo-gap-2">
                  <button type="button" @click="manageGroup(group)" class="ascwo-h-7 ascwo-px-2.5 ascwo-rounded-lg ascwo-bg-white ascwo-border ascwo-border-solid ascwo-border-[#c9cccf] ascwo-text-[13px] ascwo-font-[700] ascwo-cursor-pointer hover:ascwo-bg-[#f6f6f7] hover:ascwo-text-[#202223]">{{ __('Manage', 'all-signs-customizer-for-woocommerce') }}</button>
                  <button type="button" @click="removeGroup(group)" class="ascwo-h-7 ascwo-px-2.5 ascwo-rounded-lg ascwo-bg-white ascwo-border ascwo-border-solid ascwo-border-[#c9cccf] ascwo-text-[#8a0f00] ascwo-text-[13px] ascwo-font-[700] ascwo-cursor-pointer hover:ascwo-bg-[#f6f6f7] hover:ascwo-text-[#8a0f00] ascwo-inline-flex ascwo-items-center ascwo-gap-1">
                    <Trash2Icon class="ascwo-w-4 ascwo-h-4" />
                    {{ __('Remove', 'all-signs-customizer-for-woocommerce') }}
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      <section class="ascwo-bg-white ascwo-border ascwo-border-solid ascwo-border-[#d1d5db] ascwo-rounded-xl ascwo-shadow-sm ascwo-px-5 ascwo-py-4">
        <div class="ascwo-flex ascwo-items-start ascwo-justify-between ascwo-gap-4">
          <div>
            <h2 class="ascwo-m-0 ascwo-text-[14px] ascwo-leading-5 ascwo-font-[900] ascwo-text-[#303030]">{{ __('Clipart settings', 'all-signs-customizer-for-woocommerce') }}</h2>
            <p class="ascwo-m-0 ascwo-mt-1 ascwo-text-[13px] ascwo-leading-4 ascwo-text-[#616161]">{{ __('Enable or disable cliparts for this config.', 'all-signs-customizer-for-woocommerce') }}</p>
          </div>
          <label class="ascwo-flex ascwo-items-center ascwo-gap-2 ascwo-text-[13px] ascwo-text-[#616161]">
            <span>{{ __('No', 'all-signs-customizer-for-woocommerce') }}</span>
            <input type="checkbox" class="ascwo-sr-only ascwo-peer" v-model="clipartSettings.active">
            <span class="ascwo-w-10 ascwo-h-6 ascwo-rounded-full ascwo-bg-[#d8dee9] ascwo-relative ascwo-cursor-pointer peer-checked:ascwo-bg-[#00796b] after:ascwo-content-[''] after:ascwo-absolute after:ascwo-top-0.5 after:ascwo-left-0.5 after:ascwo-w-5 after:ascwo-h-5 after:ascwo-rounded-full after:ascwo-bg-white after:ascwo-shadow after:ascwo-transition-transform peer-checked:after:ascwo-translate-x-4"></span>
            <span>{{ __('Yes', 'all-signs-customizer-for-woocommerce') }}</span>
          </label>
        </div>
        <div class="ascwo-mt-5 ascwo-flex ascwo-justify-end">
          <button type="button" @click="saveSettings" :disabled="isSaving" class="ascwo-h-8 ascwo-px-3 ascwo-rounded-lg ascwo-bg-[#00796b] ascwo-border ascwo-border-solid ascwo-border-[#005f55] ascwo-text-white ascwo-text-[13px] ascwo-font-[800] ascwo-cursor-pointer hover:ascwo-bg-[#00695f] hover:ascwo-text-white disabled:ascwo-bg-[#d1d1d1] disabled:ascwo-border-[#d1d1d1]">
            {{ isSaving ? __('Saving...', 'all-signs-customizer-for-woocommerce') : __('Save settings', 'all-signs-customizer-for-woocommerce') }}
          </button>
        </div>
      </section>
    </template>

    <section v-else class="ascwo-bg-white ascwo-border ascwo-border-solid ascwo-border-[#d1d5db] ascwo-rounded-xl ascwo-shadow-sm ascwo-px-5 ascwo-py-4">
      <h1 class="ascwo-m-0 ascwo-mb-4 ascwo-text-[14px] ascwo-leading-5 ascwo-font-[900] ascwo-text-[#303030]">{{ __('Add clipart group', 'all-signs-customizer-for-woocommerce') }}</h1>

      <div class="ascwo-flex ascwo-items-center ascwo-gap-3 ascwo-mb-5">
        <span class="ascwo-text-[13px] ascwo-text-[#616161]">{{ __('Existing', 'all-signs-customizer-for-woocommerce') }}</span>
        <button type="button" @click="setCreateNew(false)" :class="toggleClass(!createNewGroup)" aria-label="Existing"></button>
        <span class="ascwo-text-[13px] ascwo-text-[#616161]">{{ __('Create new', 'all-signs-customizer-for-woocommerce') }}</span>
        <button type="button" @click="setCreateNew(true)" :class="toggleClass(createNewGroup)" aria-label="Create new"></button>
      </div>

      <template v-if="!createNewGroup">
        <label class="ascwo-block ascwo-text-[13px] ascwo-text-[#303030]">
          {{ __('Clipart group', 'all-signs-customizer-for-woocommerce') }}
          <select v-model="selectedExistingGroupId" class="ascwo-mt-2 ascwo-box-border ascwo-w-full ascwo-h-9 ascwo-rounded-lg ascwo-border ascwo-border-solid ascwo-border-[#8c9196] ascwo-px-3 ascwo-text-[13px] ascwo-bg-white ascwo-outline-none focus:ascwo-border-[#008060]">
            <option v-for="group in availableGroups" :key="group.id" :value="group.id">
              {{ group.title || '-' }} ({{ group.count || 0 }})
            </option>
          </select>
        </label>
        <p class="ascwo-m-0 ascwo-mt-4 ascwo-text-[13px] ascwo-text-[#616161]">{{ __('Reuse an existing group from Manage cliparts.', 'all-signs-customizer-for-woocommerce') }}</p>
      </template>

      <template v-else>
        <div class="ascwo-grid md:ascwo-grid-cols-2 ascwo-gap-4 ascwo-mb-5">
          <label class="ascwo-block ascwo-text-[13px] ascwo-text-[#303030]">
            {{ __('Group title', 'all-signs-customizer-for-woocommerce') }}
            <input v-model="newGroup.title" type="text" class="ascwo-mt-2 ascwo-box-border ascwo-w-full ascwo-h-9 ascwo-rounded-lg ascwo-border ascwo-border-solid ascwo-border-[#8c9196] ascwo-px-3 ascwo-text-[13px] ascwo-outline-none focus:ascwo-border-[#008060]">
          </label>
          <label class="ascwo-block ascwo-text-[13px] ascwo-text-[#303030]">
            {{ __('Description', 'all-signs-customizer-for-woocommerce') }}
            <input v-model="newGroup.description" type="text" class="ascwo-mt-2 ascwo-box-border ascwo-w-full ascwo-h-9 ascwo-rounded-lg ascwo-border ascwo-border-solid ascwo-border-[#8c9196] ascwo-px-3 ascwo-text-[13px] ascwo-outline-none focus:ascwo-border-[#008060]">
          </label>
        </div>

        <div class="ascwo-flex ascwo-items-center ascwo-gap-3 ascwo-mb-5">
          <span class="ascwo-text-[13px] ascwo-text-[#616161]">{{ __('Upload', 'all-signs-customizer-for-woocommerce') }}</span>
          <button type="button" :class="toggleClass(!useApiSource)" @click="useApiSource = false" aria-label="Upload"></button>
          <span class="ascwo-text-[13px] ascwo-text-[#616161]">{{ __('API', 'all-signs-customizer-for-woocommerce') }}</span>
          <button type="button" :class="toggleClass(useApiSource)" @click="useApiSource = true" aria-label="API"></button>
        </div>

        <h2 class="ascwo-m-0 ascwo-mb-3 ascwo-text-[14px] ascwo-font-[900] ascwo-text-[#303030]">{{ __('Cliparts', 'all-signs-customizer-for-woocommerce') }}</h2>
        <div v-if="!useApiSource" class="ascwo-space-y-3">
          <div v-for="(clipart, index) in newCliparts" :key="index" class="ascwo-border ascwo-border-solid ascwo-border-[#d1d5db] ascwo-rounded-xl ascwo-p-4">
            <h3 class="ascwo-m-0 ascwo-mb-3 ascwo-text-[14px] ascwo-font-[900] ascwo-text-[#303030]">{{ __('Clipart', 'all-signs-customizer-for-woocommerce') }} {{ index + 1 }}</h3>
            <div class="ascwo-grid md:ascwo-grid-cols-2 ascwo-gap-4">
              <label class="ascwo-block ascwo-text-[13px] ascwo-text-[#303030]">
                {{ __('Title', 'all-signs-customizer-for-woocommerce') }}
                <input v-model="clipart.title" type="text" class="ascwo-mt-2 ascwo-box-border ascwo-w-full ascwo-h-9 ascwo-rounded-lg ascwo-border ascwo-border-solid ascwo-border-[#8c9196] ascwo-px-3 ascwo-text-[13px] ascwo-outline-none focus:ascwo-border-[#008060]">
              </label>
              <label class="ascwo-block ascwo-text-[13px] ascwo-text-[#303030]">
                {{ __('Additional price', 'all-signs-customizer-for-woocommerce') }}
                <input v-model="clipart.additionalPrice" type="number" class="ascwo-mt-2 ascwo-box-border ascwo-w-full ascwo-h-9 ascwo-rounded-lg ascwo-border ascwo-border-solid ascwo-border-[#8c9196] ascwo-px-3 ascwo-text-[13px] ascwo-outline-none focus:ascwo-border-[#008060]">
              </label>
            </div>
            <label class="ascwo-block ascwo-mt-4 ascwo-text-[13px] ascwo-text-[#303030]">
              {{ __('Clipart image', 'all-signs-customizer-for-woocommerce') }}
              <div class="ascwo-mt-2 ascwo-flex ascwo-items-center ascwo-justify-between ascwo-h-10 ascwo-rounded-lg ascwo-border ascwo-border-solid ascwo-border-[#303030] ascwo-overflow-hidden ascwo-bg-white">
                <button type="button" @click="event => selectClipartImage(event, index)" class="ascwo-ml-1 ascwo-h-7 ascwo-px-3 ascwo-rounded-lg ascwo-bg-[#00796b] ascwo-border ascwo-border-solid ascwo-border-[#005f55] ascwo-text-white ascwo-text-[13px] ascwo-font-[800] ascwo-cursor-pointer hover:ascwo-bg-[#00695f] hover:ascwo-text-white">{{ __('Clipart image', 'all-signs-customizer-for-woocommerce') }}</button>
                <div class="ascwo-w-9 ascwo-h-9 ascwo-rounded-lg ascwo-border-l ascwo-border-solid ascwo-border-[#e5e7eb] ascwo-flex ascwo-items-center ascwo-justify-center ascwo-overflow-hidden">
                  <img v-if="clipart.url" :src="clipart.url" class="ascwo-w-full ascwo-h-full ascwo-object-cover" alt="">
                </div>
              </div>
            </label>
            <p class="ascwo-m-0 ascwo-mt-2 ascwo-text-[13px] ascwo-text-[#616161]">{{ __('This image will be saved into the new clipart group.', 'all-signs-customizer-for-woocommerce') }}</p>
          </div>
          <button type="button" @click="addClipartRow" class="ascwo-h-7 ascwo-px-2.5 ascwo-rounded-lg ascwo-bg-white ascwo-border ascwo-border-solid ascwo-border-[#c9cccf] ascwo-text-[13px] ascwo-font-[700] ascwo-cursor-pointer hover:ascwo-bg-[#f6f6f7] hover:ascwo-text-[#202223]">{{ __('Add clipart', 'all-signs-customizer-for-woocommerce') }}</button>
        </div>
        <p v-else class="ascwo-m-0 ascwo-text-[13px] ascwo-text-[#616161]">{{ __('API clipart creation will use the managed clipart library.', 'all-signs-customizer-for-woocommerce') }}</p>
      </template>

      <div class="ascwo-mt-6 ascwo-flex ascwo-justify-end ascwo-gap-3">
        <button type="button" @click="backToCliparts" class="ascwo-h-8 ascwo-px-3 ascwo-rounded-lg ascwo-bg-white ascwo-border ascwo-border-solid ascwo-border-[#c9cccf] ascwo-text-[#202223] ascwo-text-[13px] ascwo-font-[700] ascwo-cursor-pointer hover:ascwo-bg-[#f6f6f7] hover:ascwo-text-[#202223]">{{ __('Back to cliparts', 'all-signs-customizer-for-woocommerce') }}</button>
        <button type="button" @click="submitGroup" :disabled="isSaving || !canSubmitGroup" class="ascwo-h-8 ascwo-px-3 ascwo-rounded-lg ascwo-bg-[#00796b] ascwo-border ascwo-border-solid ascwo-border-[#005f55] ascwo-text-white ascwo-text-[13px] ascwo-font-[800] ascwo-cursor-pointer hover:ascwo-bg-[#00695f] hover:ascwo-text-white disabled:ascwo-bg-[#d1d1d1] disabled:ascwo-border-[#d1d1d1] disabled:ascwo-cursor-not-allowed">
          {{ isSaving ? __('Saving...', 'all-signs-customizer-for-woocommerce') : createNewGroup ? __('Create group and add', 'all-signs-customizer-for-woocommerce') : __('Add group', 'all-signs-customizer-for-woocommerce') }}
        </button>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { __ } from '@wordpress/i18n';
import { Loader2Icon, PlusIcon, Trash2Icon } from 'lucide-vue-next';
import api from '@/admin/Api/api';
import toastMessage from '@/admin/utils/functions';

const props = defineProps({
  data: { type: Object, default: () => ({}) },
  fetchSettings: { type: Function, default: null },
});

const route = useRoute();
const router = useRouter();
const groups = ref([]);
const isFetching = ref(true);
const isSaving = ref(false);
const isAddingGroup = ref(false);
const createNewGroup = ref(false);
const useApiSource = ref(false);
const selectedExistingGroupId = ref('');
const newGroup = ref({ title: '', description: '' });
const newCliparts = ref([{ title: '', url: '', additionalPrice: 0 }]);
const clipartSettings = ref({ active: true, selectedClipartGroups: [] });

const toggleClass = (active) => [
  'ascwo-w-10 ascwo-h-6 ascwo-rounded-full ascwo-border-none ascwo-relative ascwo-cursor-pointer ascwo-transition-colors after:ascwo-content-[\'\'] after:ascwo-absolute after:ascwo-top-0.5 after:ascwo-w-5 after:ascwo-h-5 after:ascwo-rounded-full after:ascwo-bg-white after:ascwo-shadow after:ascwo-transition-all',
  active
    ? 'ascwo-bg-[#00796b] after:ascwo-left-[18px]'
    : 'ascwo-bg-[#d8dee9] after:ascwo-left-0.5',
];

const normalizeSettings = (data) => {
  const source = data?.enableClipart || {};
  clipartSettings.value = {
    active: source.active ?? true,
    selectedClipartGroups: Array.isArray(source.selectedClipartGroups) ? [...source.selectedClipartGroups] : [],
  };
};

const selectedIds = computed(() => clipartSettings.value.selectedClipartGroups.map(String));
const selectedGroups = computed(() => groups.value.filter(group => selectedIds.value.includes(String(group.id))));
const availableGroups = computed(() => groups.value.filter(group => !selectedIds.value.includes(String(group.id))));
const canSubmitGroup = computed(() => {
  if (createNewGroup.value) return newGroup.value.title.trim() !== '';
  return Boolean(selectedExistingGroupId.value);
});

const normalizeGroup = (group, index) => ({
  ...group,
  id: group.id ?? index,
  count: group.clipartsCount ?? group.cliparts_count ?? group.items_count ?? group.items?.length ?? 0,
  preview: group.preview ?? group.icon ?? group.image ?? group.url ?? '',
});

const fetchGroups = async () => {
  isFetching.value = true;
  try {
    const result = await api.getManageCliparts();
    const rows = Array.isArray(result?.data) ? result.data : [];
    groups.value = rows.map(normalizeGroup);
    if (!selectedExistingGroupId.value || !availableGroups.value.some(group => String(group.id) === String(selectedExistingGroupId.value))) {
      selectedExistingGroupId.value = availableGroups.value[0]?.id ?? '';
    }
  } finally {
    isFetching.value = false;
  }
};

const goToManageCliparts = () => router.push({ name: 'managecliparts' });
const manageGroup = (group) => router.push({ name: 'cliparts', params: { groupId: group.id } });

const openAddGroup = () => {
  isAddingGroup.value = true;
  createNewGroup.value = false;
  selectedExistingGroupId.value = availableGroups.value[0]?.id ?? '';
};

const backToCliparts = () => {
  isAddingGroup.value = false;
  createNewGroup.value = false;
  useApiSource.value = false;
  selectedExistingGroupId.value = availableGroups.value[0]?.id ?? '';
  newGroup.value = { title: '', description: '' };
  newCliparts.value = [{ title: '', url: '', additionalPrice: 0 }];
};

const setCreateNew = (value) => {
  createNewGroup.value = value;
};

const addClipartRow = () => {
  newCliparts.value.push({ title: '', url: '', additionalPrice: 0 });
};

const addSelectedGroup = (groupId) => {
  if (!groupId) return;
  const ids = new Set(clipartSettings.value.selectedClipartGroups.map(String));
  ids.add(String(groupId));
  clipartSettings.value.selectedClipartGroups = Array.from(ids);
};

const removeGroup = (group) => {
  clipartSettings.value.selectedClipartGroups = clipartSettings.value.selectedClipartGroups.filter(id => String(id) !== String(group.id));
};

const saveSettings = async () => {
  isSaving.value = true;
  try {
    const payload = {
      ...(props.data || {}),
      enableClipart: { ...clipartSettings.value },
    };
    const result = await api.updateCustomizerSignsImage(route.params.configId, payload);
    if (result?.success === false) {
      toastMessage(result.message || __('Unable to save clipart settings', 'all-signs-customizer-for-woocommerce'), 'error');
      return false;
    }
    toastMessage(result?.message || __('Clipart settings saved', 'all-signs-customizer-for-woocommerce'));
    if (props.fetchSettings) await props.fetchSettings();
    return true;
  } finally {
    isSaving.value = false;
  }
};

const submitGroup = async () => {
  if (!canSubmitGroup.value) return;

  if (!createNewGroup.value) {
    addSelectedGroup(selectedExistingGroupId.value);
    const saved = await saveSettings();
    if (saved) backToCliparts();
    return;
  }

  isSaving.value = true;
  try {
    const result = await api.addManageClipart(newGroup.value);
    if (!result?.success) {
      toastMessage(result?.message || __('Unable to create clipart group', 'all-signs-customizer-for-woocommerce'), 'error');
      return;
    }

    await fetchGroups();
    const createdId = result.data?.id ?? result.id ?? groups.value.find(group => group.title === newGroup.value.title)?.id;
    const filledCliparts = newCliparts.value.filter(clipart => clipart.title || clipart.url);
    if (createdId && filledCliparts.length) {
      await api.addManageclipartItem(createdId, filledCliparts);
      await fetchGroups();
    }
    addSelectedGroup(createdId);
    await saveSettings();
    backToCliparts();
  } finally {
    isSaving.value = false;
  }
};

const selectClipartImage = async (event, index) => {
  event.preventDefault();
  const uploader = wp.media({
    title: __("Select Image", "all-signs-customizer-for-woocommerce"),
    button: { text: __("Select Image", "all-signs-customizer-for-woocommerce") },
    multiple: false,
  }).on('select', () => {
    const selection = uploader.state().get('selection');
    selection.map((attachment) => {
      attachment = attachment.toJSON();
      if (attachment.type === 'image') {
        newCliparts.value[index].url = attachment.url;
      }
    });
  }).open();
};

watch(() => props.data, normalizeSettings, { immediate: true, deep: true });

onMounted(fetchGroups);
</script>
