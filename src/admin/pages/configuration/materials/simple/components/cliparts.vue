<template>
  <div class="asowp-space-y-3">
    <template v-if="!isAddingGroup">
      <section class="asowp-bg-white asowp-border asowp-border-solid asowp-border-[#d1d5db] asowp-rounded-xl asowp-shadow-sm asowp-px-5 asowp-py-4 asowp-flex asowp-items-center asowp-justify-between asowp-gap-4">
        <div>
          <h1 class="asowp-m-0 asowp-text-[20px] asowp-leading-6 asowp-font-[900] asowp-text-[#303030]">{{ __('Cliparts', 'all-signs-options-pro') }}</h1>
          <p class="asowp-m-0 asowp-mt-1 asowp-text-[13px] asowp-leading-4 asowp-text-[#616161]">
            {{ __('Select existing clipart groups for this config or create a new group and save it into Manage cliparts.', 'all-signs-options-pro') }}
          </p>
        </div>
        <div class="asowp-flex asowp-items-center asowp-gap-3 asowp-shrink-0">
          <button type="button" @click="goToManageCliparts" class="asowp-h-8 asowp-px-3 asowp-rounded-lg asowp-bg-white asowp-border asowp-border-solid asowp-border-[#c9cccf] asowp-text-[#202223] asowp-text-[13px] asowp-font-[700] asowp-cursor-pointer hover:asowp-bg-[#f6f6f7] hover:asowp-text-[#202223]">
            {{ __('Manage cliparts', 'all-signs-options-pro') }}
          </button>
          <button type="button" @click="openAddGroup" class="asowp-h-8 asowp-px-3 asowp-rounded-lg asowp-bg-[#00796b] asowp-border asowp-border-solid asowp-border-[#005f55] asowp-text-white asowp-text-[13px] asowp-font-[800] asowp-cursor-pointer hover:asowp-bg-[#00695f] hover:asowp-text-white asowp-inline-flex asowp-items-center asowp-gap-2">
            <PlusIcon class="asowp-w-4 asowp-h-4" />
            {{ __('Add clipart group', 'all-signs-options-pro') }}
          </button>
        </div>
      </section>

      <section class="asowp-bg-white asowp-border asowp-border-solid asowp-border-[#d1d5db] asowp-rounded-xl asowp-shadow-sm asowp-px-5 asowp-py-4">
        <h2 class="asowp-m-0 asowp-mb-3 asowp-text-[14px] asowp-leading-5 asowp-font-[900] asowp-text-[#303030]">{{ __('Selected groups', 'all-signs-options-pro') }}</h2>
        <table class="asowp-w-full asowp-border-collapse asowp-text-left">
          <thead class="asowp-bg-[#f6f6f7]">
            <tr>
              <th class="asowp-px-3 asowp-py-2.5 asowp-text-[12px] asowp-font-[800] asowp-text-[#616161]">{{ __('Preview', 'all-signs-options-pro') }}</th>
              <th class="asowp-px-3 asowp-py-2.5 asowp-text-[12px] asowp-font-[800] asowp-text-[#616161]">{{ __('Title', 'all-signs-options-pro') }}</th>
              <th class="asowp-px-3 asowp-py-2.5 asowp-text-[12px] asowp-font-[800] asowp-text-[#616161]">{{ __('Cliparts', 'all-signs-options-pro') }}</th>
              <th class="asowp-px-3 asowp-py-2.5 asowp-text-[12px] asowp-font-[800] asowp-text-[#616161]">{{ __('Actions', 'all-signs-options-pro') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="isFetching">
              <td colspan="4" class="asowp-px-3 asowp-py-4 asowp-text-[13px] asowp-text-[#616161]">{{ __('Loading...', 'all-signs-options-pro') }}</td>
            </tr>
            <tr v-else-if="selectedGroups.length === 0" class="asowp-border-b asowp-border-solid asowp-border-[#e5e7eb]">
              <td class="asowp-px-3 asowp-py-3">
                <div class="asowp-w-12 asowp-h-12 asowp-rounded-lg asowp-border asowp-border-solid asowp-border-[#d9dee3] asowp-bg-[#f7f8fa] asowp-flex asowp-items-center asowp-justify-center asowp-text-[#616161]">-</div>
              </td>
              <td class="asowp-px-3 asowp-py-3"></td>
              <td class="asowp-px-3 asowp-py-2.5 asowp-text-[13px] asowp-text-[#303030]">0</td>
              <td class="asowp-px-3 asowp-py-3">
                <div class="asowp-flex asowp-items-center asowp-gap-2">
                  <button type="button" disabled class="asowp-h-7 asowp-px-2.5 asowp-rounded-lg asowp-bg-white asowp-border asowp-border-solid asowp-border-[#c9cccf] asowp-text-[13px] asowp-font-[700] asowp-opacity-60">{{ __('Manage', 'all-signs-options-pro') }}</button>
                  <button type="button" disabled class="asowp-h-7 asowp-px-2.5 asowp-rounded-lg asowp-bg-white asowp-border asowp-border-solid asowp-border-[#c9cccf] asowp-text-[#8a0f00] asowp-text-[13px] asowp-font-[700] asowp-opacity-60 asowp-inline-flex asowp-items-center asowp-gap-1">
                    <Trash2Icon class="asowp-w-4 asowp-h-4" />
                    {{ __('Remove', 'all-signs-options-pro') }}
                  </button>
                </div>
              </td>
            </tr>
            <tr v-for="group in selectedGroups" :key="group.id" class="asowp-border-b asowp-border-solid asowp-border-[#e5e7eb]">
              <td class="asowp-px-3 asowp-py-3">
                <div class="asowp-w-12 asowp-h-12 asowp-rounded-lg asowp-border asowp-border-solid asowp-border-[#d9dee3] asowp-bg-[#f7f8fa] asowp-flex asowp-items-center asowp-justify-center asowp-overflow-hidden">
                  <img v-if="group.preview" :src="group.preview" class="asowp-w-full asowp-h-full asowp-object-cover" alt="">
                  <span v-else>-</span>
                </div>
              </td>
              <td class="asowp-px-3 asowp-py-2.5 asowp-text-[13px] asowp-font-[800] asowp-text-[#303030]">{{ group.title || '-' }}</td>
              <td class="asowp-px-3 asowp-py-2.5 asowp-text-[13px] asowp-text-[#303030]">{{ group.count || 0 }}</td>
              <td class="asowp-px-3 asowp-py-3">
                <div class="asowp-flex asowp-items-center asowp-gap-2">
                  <button type="button" @click="manageGroup(group)" class="asowp-h-7 asowp-px-2.5 asowp-rounded-lg asowp-bg-white asowp-border asowp-border-solid asowp-border-[#c9cccf] asowp-text-[13px] asowp-font-[700] asowp-cursor-pointer hover:asowp-bg-[#f6f6f7] hover:asowp-text-[#202223]">{{ __('Manage', 'all-signs-options-pro') }}</button>
                  <button type="button" @click="removeGroup(group)" class="asowp-h-7 asowp-px-2.5 asowp-rounded-lg asowp-bg-white asowp-border asowp-border-solid asowp-border-[#c9cccf] asowp-text-[#8a0f00] asowp-text-[13px] asowp-font-[700] asowp-cursor-pointer hover:asowp-bg-[#f6f6f7] hover:asowp-text-[#8a0f00] asowp-inline-flex asowp-items-center asowp-gap-1">
                    <Trash2Icon class="asowp-w-4 asowp-h-4" />
                    {{ __('Remove', 'all-signs-options-pro') }}
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      <section class="asowp-bg-white asowp-border asowp-border-solid asowp-border-[#d1d5db] asowp-rounded-xl asowp-shadow-sm asowp-px-5 asowp-py-4">
        <div class="asowp-flex asowp-items-start asowp-justify-between asowp-gap-4">
          <div>
            <h2 class="asowp-m-0 asowp-text-[14px] asowp-leading-5 asowp-font-[900] asowp-text-[#303030]">{{ __('Clipart settings', 'all-signs-options-pro') }}</h2>
            <p class="asowp-m-0 asowp-mt-1 asowp-text-[13px] asowp-leading-4 asowp-text-[#616161]">{{ __('Enable or disable cliparts for this config.', 'all-signs-options-pro') }}</p>
          </div>
          <label class="asowp-flex asowp-items-center asowp-gap-2 asowp-text-[13px] asowp-text-[#616161]">
            <span>{{ __('No', 'all-signs-options-pro') }}</span>
            <input type="checkbox" class="asowp-sr-only asowp-peer" v-model="clipartSettings.active">
            <span class="asowp-w-10 asowp-h-6 asowp-rounded-full asowp-bg-[#d8dee9] asowp-relative asowp-cursor-pointer peer-checked:asowp-bg-[#00796b] after:asowp-content-[''] after:asowp-absolute after:asowp-top-0.5 after:asowp-left-0.5 after:asowp-w-5 after:asowp-h-5 after:asowp-rounded-full after:asowp-bg-white after:asowp-shadow after:asowp-transition-transform peer-checked:after:asowp-translate-x-4"></span>
            <span>{{ __('Yes', 'all-signs-options-pro') }}</span>
          </label>
        </div>
        <div class="asowp-mt-5 asowp-flex asowp-justify-end">
          <button type="button" @click="saveSettings" :disabled="isSaving" class="asowp-h-8 asowp-px-3 asowp-rounded-lg asowp-bg-[#00796b] asowp-border asowp-border-solid asowp-border-[#005f55] asowp-text-white asowp-text-[13px] asowp-font-[800] asowp-cursor-pointer hover:asowp-bg-[#00695f] hover:asowp-text-white disabled:asowp-bg-[#d1d1d1] disabled:asowp-border-[#d1d1d1]">
            {{ isSaving ? __('Saving...', 'all-signs-options-pro') : __('Save settings', 'all-signs-options-pro') }}
          </button>
        </div>
      </section>
    </template>

    <section v-else class="asowp-bg-white asowp-border asowp-border-solid asowp-border-[#d1d5db] asowp-rounded-xl asowp-shadow-sm asowp-px-5 asowp-py-4">
      <h1 class="asowp-m-0 asowp-mb-4 asowp-text-[14px] asowp-leading-5 asowp-font-[900] asowp-text-[#303030]">{{ __('Add clipart group', 'all-signs-options-pro') }}</h1>

      <div class="asowp-flex asowp-items-center asowp-gap-3 asowp-mb-5">
        <span class="asowp-text-[13px] asowp-text-[#616161]">{{ __('Existing', 'all-signs-options-pro') }}</span>
        <button type="button" @click="setCreateNew(false)" :class="toggleClass(!createNewGroup)" aria-label="Existing"></button>
        <span class="asowp-text-[13px] asowp-text-[#616161]">{{ __('Create new', 'all-signs-options-pro') }}</span>
        <button type="button" @click="setCreateNew(true)" :class="toggleClass(createNewGroup)" aria-label="Create new"></button>
      </div>

      <template v-if="!createNewGroup">
        <label class="asowp-block asowp-text-[13px] asowp-text-[#303030]">
          {{ __('Clipart group', 'all-signs-options-pro') }}
          <select v-model="selectedExistingGroupId" class="asowp-mt-2 asowp-box-border asowp-w-full asowp-h-9 asowp-rounded-lg asowp-border asowp-border-solid asowp-border-[#8c9196] asowp-px-3 asowp-text-[13px] asowp-bg-white asowp-outline-none focus:asowp-border-[#008060]">
            <option v-for="group in availableGroups" :key="group.id" :value="group.id">
              {{ group.title || '-' }} ({{ group.count || 0 }})
            </option>
          </select>
        </label>
        <p class="asowp-m-0 asowp-mt-4 asowp-text-[13px] asowp-text-[#616161]">{{ __('Reuse an existing group from Manage cliparts.', 'all-signs-options-pro') }}</p>
      </template>

      <template v-else>
        <div class="asowp-grid md:asowp-grid-cols-2 asowp-gap-4 asowp-mb-5">
          <label class="asowp-block asowp-text-[13px] asowp-text-[#303030]">
            {{ __('Group title', 'all-signs-options-pro') }}
            <input v-model="newGroup.title" type="text" class="asowp-mt-2 asowp-box-border asowp-w-full asowp-h-9 asowp-rounded-lg asowp-border asowp-border-solid asowp-border-[#8c9196] asowp-px-3 asowp-text-[13px] asowp-outline-none focus:asowp-border-[#008060]">
          </label>
          <label class="asowp-block asowp-text-[13px] asowp-text-[#303030]">
            {{ __('Description', 'all-signs-options-pro') }}
            <input v-model="newGroup.description" type="text" class="asowp-mt-2 asowp-box-border asowp-w-full asowp-h-9 asowp-rounded-lg asowp-border asowp-border-solid asowp-border-[#8c9196] asowp-px-3 asowp-text-[13px] asowp-outline-none focus:asowp-border-[#008060]">
          </label>
        </div>

        <div class="asowp-flex asowp-items-center asowp-gap-3 asowp-mb-5">
          <span class="asowp-text-[13px] asowp-text-[#616161]">{{ __('Upload', 'all-signs-options-pro') }}</span>
          <button type="button" :class="toggleClass(!useApiSource)" @click="useApiSource = false" aria-label="Upload"></button>
          <span class="asowp-text-[13px] asowp-text-[#616161]">{{ __('API', 'all-signs-options-pro') }}</span>
          <button type="button" :class="toggleClass(useApiSource)" @click="useApiSource = true" aria-label="API"></button>
        </div>

        <h2 class="asowp-m-0 asowp-mb-3 asowp-text-[14px] asowp-font-[900] asowp-text-[#303030]">{{ __('Cliparts', 'all-signs-options-pro') }}</h2>
        <div v-if="!useApiSource" class="asowp-space-y-3">
          <div v-for="(clipart, index) in newCliparts" :key="index" class="asowp-border asowp-border-solid asowp-border-[#d1d5db] asowp-rounded-xl asowp-p-4">
            <h3 class="asowp-m-0 asowp-mb-3 asowp-text-[14px] asowp-font-[900] asowp-text-[#303030]">{{ __('Clipart', 'all-signs-options-pro') }} {{ index + 1 }}</h3>
            <div class="asowp-grid md:asowp-grid-cols-2 asowp-gap-4">
              <label class="asowp-block asowp-text-[13px] asowp-text-[#303030]">
                {{ __('Title', 'all-signs-options-pro') }}
                <input v-model="clipart.title" type="text" class="asowp-mt-2 asowp-box-border asowp-w-full asowp-h-9 asowp-rounded-lg asowp-border asowp-border-solid asowp-border-[#8c9196] asowp-px-3 asowp-text-[13px] asowp-outline-none focus:asowp-border-[#008060]">
              </label>
              <label class="asowp-block asowp-text-[13px] asowp-text-[#303030]">
                {{ __('Additional price', 'all-signs-options-pro') }}
                <input v-model="clipart.additionalPrice" type="number" class="asowp-mt-2 asowp-box-border asowp-w-full asowp-h-9 asowp-rounded-lg asowp-border asowp-border-solid asowp-border-[#8c9196] asowp-px-3 asowp-text-[13px] asowp-outline-none focus:asowp-border-[#008060]">
              </label>
            </div>
            <label class="asowp-block asowp-mt-4 asowp-text-[13px] asowp-text-[#303030]">
              {{ __('Clipart image', 'all-signs-options-pro') }}
              <div class="asowp-mt-2 asowp-flex asowp-items-center asowp-justify-between asowp-h-10 asowp-rounded-lg asowp-border asowp-border-solid asowp-border-[#303030] asowp-overflow-hidden asowp-bg-white">
                <button type="button" @click="event => selectClipartImage(event, index)" class="asowp-ml-1 asowp-h-7 asowp-px-3 asowp-rounded-lg asowp-bg-[#00796b] asowp-border asowp-border-solid asowp-border-[#005f55] asowp-text-white asowp-text-[13px] asowp-font-[800] asowp-cursor-pointer hover:asowp-bg-[#00695f] hover:asowp-text-white">{{ __('Clipart image', 'all-signs-options-pro') }}</button>
                <div class="asowp-w-9 asowp-h-9 asowp-rounded-lg asowp-border-l asowp-border-solid asowp-border-[#e5e7eb] asowp-flex asowp-items-center asowp-justify-center asowp-overflow-hidden">
                  <img v-if="clipart.url" :src="clipart.url" class="asowp-w-full asowp-h-full asowp-object-cover" alt="">
                </div>
              </div>
            </label>
            <p class="asowp-m-0 asowp-mt-2 asowp-text-[13px] asowp-text-[#616161]">{{ __('This image will be saved into the new clipart group.', 'all-signs-options-pro') }}</p>
          </div>
          <button type="button" @click="addClipartRow" class="asowp-h-7 asowp-px-2.5 asowp-rounded-lg asowp-bg-white asowp-border asowp-border-solid asowp-border-[#c9cccf] asowp-text-[13px] asowp-font-[700] asowp-cursor-pointer hover:asowp-bg-[#f6f6f7] hover:asowp-text-[#202223]">{{ __('Add clipart', 'all-signs-options-pro') }}</button>
        </div>
        <p v-else class="asowp-m-0 asowp-text-[13px] asowp-text-[#616161]">{{ __('API clipart creation will use the managed clipart library.', 'all-signs-options-pro') }}</p>
      </template>

      <div class="asowp-mt-6 asowp-flex asowp-justify-end asowp-gap-3">
        <button type="button" @click="backToCliparts" class="asowp-h-8 asowp-px-3 asowp-rounded-lg asowp-bg-white asowp-border asowp-border-solid asowp-border-[#c9cccf] asowp-text-[#202223] asowp-text-[13px] asowp-font-[700] asowp-cursor-pointer hover:asowp-bg-[#f6f6f7] hover:asowp-text-[#202223]">{{ __('Back to cliparts', 'all-signs-options-pro') }}</button>
        <button type="button" @click="submitGroup" :disabled="isSaving || !canSubmitGroup" class="asowp-h-8 asowp-px-3 asowp-rounded-lg asowp-bg-[#00796b] asowp-border asowp-border-solid asowp-border-[#005f55] asowp-text-white asowp-text-[13px] asowp-font-[800] asowp-cursor-pointer hover:asowp-bg-[#00695f] hover:asowp-text-white disabled:asowp-bg-[#d1d1d1] disabled:asowp-border-[#d1d1d1] disabled:asowp-cursor-not-allowed">
          {{ isSaving ? __('Saving...', 'all-signs-options-pro') : createNewGroup ? __('Create group and add', 'all-signs-options-pro') : __('Add group', 'all-signs-options-pro') }}
        </button>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { __ } from '@wordpress/i18n';
import { PlusIcon, Trash2Icon } from 'lucide-vue-next';
import api from '@/admin/Api/api';
import toastMessage from '@/admin/utils/functions';

const props = defineProps({
  data: { type: Object, default: () => ({}) },
  fetchSettings: { type: Function, default: null },
});

const route = useRoute();
const router = useRouter();
const groups = ref([]);
const isFetching = ref(false);
const isSaving = ref(false);
const isAddingGroup = ref(false);
const createNewGroup = ref(false);
const useApiSource = ref(false);
const selectedExistingGroupId = ref('');
const newGroup = ref({ title: '', description: '' });
const newCliparts = ref([{ title: '', url: '', additionalPrice: 0 }]);
const clipartSettings = ref({ active: true, selectedClipartGroups: [] });

const toggleClass = (active) => [
  'asowp-w-10 asowp-h-6 asowp-rounded-full asowp-border-none asowp-relative asowp-cursor-pointer asowp-transition-colors after:asowp-content-[\'\'] after:asowp-absolute after:asowp-top-0.5 after:asowp-w-5 after:asowp-h-5 after:asowp-rounded-full after:asowp-bg-white after:asowp-shadow after:asowp-transition-all',
  active
    ? 'asowp-bg-[#00796b] after:asowp-left-[18px]'
    : 'asowp-bg-[#d8dee9] after:asowp-left-0.5',
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
      toastMessage(result.message || __('Unable to save clipart settings', 'all-signs-options-pro'), 'error');
      return false;
    }
    toastMessage(result?.message || __('Clipart settings saved', 'all-signs-options-pro'));
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
      toastMessage(result?.message || __('Unable to create clipart group', 'all-signs-options-pro'), 'error');
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
    title: __("Select Image", "all-signs-options-pro"),
    button: { text: __("Select Image", "all-signs-options-pro") },
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
