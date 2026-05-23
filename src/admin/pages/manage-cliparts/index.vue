<template>
  <div class="asowp-space-y-3">
    <section v-if="!createGroup" class="asowp-bg-white asowp-border asowp-border-solid asowp-border-[#d1d5db] asowp-rounded-xl asowp-shadow-sm asowp-px-5 asowp-py-4 asowp-flex asowp-items-center asowp-justify-between asowp-gap-4">
      <div>
        <h1 class="asowp-m-0 asowp-text-[20px] asowp-leading-6 asowp-font-[900] asowp-text-[#303030]">{{ __('Clipart Groups', 'all-signs-options-pro') }}</h1>
        <p class="asowp-m-0 asowp-mt-1 asowp-text-[13px] asowp-leading-4 asowp-text-[#616161]">
          {{ __('Manage the reusable clipart groups used across configurations.', 'all-signs-options-pro') }}
        </p>
      </div>
      <button type="button" @click="addGroup" class="asowp-h-8 asowp-px-3 asowp-rounded-lg asowp-bg-[#00796b] asowp-border asowp-border-solid asowp-border-[#005f55] asowp-text-white asowp-text-[13px] asowp-font-[800] asowp-cursor-pointer hover:asowp-bg-[#00695f] hover:asowp-text-white asowp-inline-flex asowp-items-center asowp-gap-2">
        <PlusIcon class="asowp-w-4 asowp-h-4" />
        {{ __('Add new clipart group', 'all-signs-options-pro') }}
      </button>
    </section>

    <section v-if="!createGroup" class="asowp-bg-white asowp-border asowp-border-solid asowp-border-[#d1d5db] asowp-rounded-xl asowp-shadow-sm asowp-px-5 asowp-py-4">
      <div v-if="isFetching" class="asowp-min-h-[200px] asowp-flex asowp-items-center asowp-justify-center asowp-text-[13px] asowp-text-[#616161]">
        {{ __('Loading...', 'all-signs-options-pro') }}
      </div>
      <div v-else-if="clipartsGroups.length === 0" class="asowp-min-h-[220px] asowp-flex asowp-flex-col asowp-items-center asowp-justify-center asowp-text-center">
        <SearchIcon class="asowp-w-16 asowp-h-16 asowp-text-[#8c9196] asowp-mb-5" />
        <h2 class="asowp-m-0 asowp-text-[20px] asowp-leading-6 asowp-font-[900] asowp-text-[#303030]">{{ __('No Clipart Groups found', 'all-signs-options-pro') }}</h2>
        <p class="asowp-m-0 asowp-mt-3 asowp-text-[13px] asowp-text-[#616161]">{{ __('Try changing the filters or search term', 'all-signs-options-pro') }}</p>
      </div>
      <table v-else class="asowp-w-full asowp-border-collapse asowp-text-left">
        <thead class="asowp-bg-[#f6f6f7]">
          <tr>
            <th class="asowp-px-3 asowp-py-2.5 asowp-text-[12px] asowp-font-[800] asowp-text-[#616161]">{{ __('Title', 'all-signs-options-pro') }}</th>
            <th class="asowp-px-3 asowp-py-2.5 asowp-text-[12px] asowp-font-[800] asowp-text-[#616161]">{{ __('Description', 'all-signs-options-pro') }}</th>
            <th class="asowp-px-3 asowp-py-2.5 asowp-text-[12px] asowp-font-[800] asowp-text-[#616161]">{{ __('Actions', 'all-signs-options-pro') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(group, key) in clipartsGroups" :key="key" class="asowp-border-b asowp-border-solid asowp-border-[#e5e7eb]">
            <td class="asowp-px-3 asowp-py-2.5 asowp-text-[13px] asowp-font-[800] asowp-text-[#202223]">{{ group.title }}</td>
            <td class="asowp-px-3 asowp-py-2.5 asowp-text-[13px] asowp-text-[#303030]">{{ group.description || '-' }}</td>
            <td class="asowp-px-3 asowp-py-3">
              <div class="asowp-flex asowp-items-center asowp-gap-2">
                <button type="button" @click="goToGroup(key)" class="asowp-h-7 asowp-px-2.5 asowp-rounded-lg asowp-bg-white asowp-border asowp-border-solid asowp-border-[#c9cccf] asowp-text-[13px] asowp-font-[700] asowp-cursor-pointer hover:asowp-bg-[#f6f6f7] hover:asowp-text-[#202223]">{{ __('Manage', 'all-signs-options-pro') }}</button>
                <button type="button" @click="selectGroup(key, group)" class="asowp-h-7 asowp-px-2.5 asowp-rounded-lg asowp-bg-white asowp-border asowp-border-solid asowp-border-[#c9cccf] asowp-text-[13px] asowp-font-[700] asowp-cursor-pointer hover:asowp-bg-[#f6f6f7] hover:asowp-text-[#202223]">{{ __('Edit', 'all-signs-options-pro') }}</button>
                <button type="button" @click="selectGroup(key, group, true)" class="asowp-h-7 asowp-px-2.5 asowp-rounded-lg asowp-bg-white asowp-border asowp-border-solid asowp-border-[#c9cccf] asowp-text-[#8a0f00] asowp-text-[13px] asowp-font-[700] asowp-cursor-pointer hover:asowp-bg-[#f6f6f7] hover:asowp-text-[#8a0f00]">{{ __('Delete', 'all-signs-options-pro') }}</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </section>

    <section v-if="createGroup" class="asowp-bg-white asowp-border asowp-border-solid asowp-border-[#d1d5db] asowp-rounded-xl asowp-shadow-sm asowp-px-5 asowp-py-4">
      <h1 class="asowp-m-0 asowp-text-[20px] asowp-leading-6 asowp-font-[900] asowp-text-[#303030]">
        {{ isEdit ? __('Edit clipart group', 'all-signs-options-pro') : __('Add clipart group', 'all-signs-options-pro') }}
      </h1>
    </section>

    <section v-if="createGroup" class="asowp-bg-white asowp-border asowp-border-solid asowp-border-[#d1d5db] asowp-rounded-xl asowp-shadow-sm asowp-px-5 asowp-py-4">
      <div class="asowp-grid md:asowp-grid-cols-2 asowp-gap-4">
        <label class="asowp-block asowp-text-[13px] asowp-text-[#303030]">
          {{ __('Title', 'all-signs-options-pro') }}
          <input v-model="newGroup.title" type="text" :class="['asowp-mt-2 asowp-box-border asowp-w-full asowp-h-9 asowp-rounded-lg asowp-border asowp-border-solid asowp-border-[#8c9196] asowp-px-3 asowp-text-[13px] asowp-outline-none focus:asowp-border-[#008060]', emptyLabel ? 'asowp-border-[#d72c0d]' : '']">
        </label>
        <label class="asowp-block asowp-text-[13px] asowp-text-[#303030]">
          {{ __('Description', 'all-signs-options-pro') }}
          <input v-model="newGroup.description" type="text" class="asowp-mt-2 asowp-box-border asowp-w-full asowp-h-9 asowp-rounded-lg asowp-border asowp-border-solid asowp-border-[#8c9196] asowp-px-3 asowp-text-[13px] asowp-outline-none focus:asowp-border-[#008060]">
        </label>
      </div>
      <div class="asowp-mt-5 asowp-flex asowp-justify-end asowp-gap-3">
        <button type="button" @click="back" :disabled="isLoading" class="asowp-h-8 asowp-px-3 asowp-rounded-lg asowp-bg-white asowp-border asowp-border-solid asowp-border-[#c9cccf] asowp-text-[#202223] asowp-text-[13px] asowp-font-[700] asowp-cursor-pointer hover:asowp-bg-[#f6f6f7] hover:asowp-text-[#202223]">{{ __('Back', 'all-signs-options-pro') }}</button>
        <button type="button" @click="isEdit ? updateGroup() : addNewGroup()" :disabled="isLoading || !newGroup.title.trim()" class="asowp-h-8 asowp-px-3 asowp-rounded-lg asowp-bg-[#00796b] asowp-border asowp-border-solid asowp-border-[#005f55] asowp-text-white asowp-text-[13px] asowp-font-[800] asowp-cursor-pointer hover:asowp-bg-[#00695f] hover:asowp-text-white disabled:asowp-bg-[#d1d1d1] disabled:asowp-border-[#d1d1d1] disabled:asowp-cursor-not-allowed">
          {{ isLoading ? __('Saving...', 'all-signs-options-pro') : __('Save', 'all-signs-options-pro') }}
        </button>
      </div>
    </section>

    <div v-if="openModal" class="asowp-fixed asowp-inset-0 asowp-z-[20000] asowp-flex asowp-items-center asowp-justify-center">
      <div class="asowp-absolute asowp-inset-0 asowp-bg-black/40" @click="closeModal"></div>
      <div class="asowp-relative asowp-w-[min(460px,95vw)] asowp-bg-white asowp-rounded-xl asowp-shadow-2xl asowp-p-5">
        <h2 class="asowp-m-0 asowp-text-[20px] asowp-font-[900] asowp-text-[#303030]">{{ __('Delete clipart group?', 'all-signs-options-pro') }}</h2>
        <p class="asowp-mt-3 asowp-text-[13px] asowp-text-[#616161]">{{ __('This action cannot be undone.', 'all-signs-options-pro') }}</p>
        <div class="asowp-mt-6 asowp-flex asowp-justify-end asowp-gap-3">
          <button type="button" @click="closeModal" class="asowp-h-8 asowp-px-3 asowp-rounded-lg asowp-bg-white asowp-border asowp-border-solid asowp-border-[#c9cccf] asowp-text-[13px] asowp-font-[700] asowp-cursor-pointer hover:asowp-bg-[#f6f6f7]">{{ __('Cancel', 'all-signs-options-pro') }}</button>
          <button type="button" @click="deleteGroup" :disabled="isLoading" class="asowp-h-8 asowp-px-3 asowp-rounded-lg asowp-bg-[#8a0f00] asowp-border-none asowp-text-white asowp-text-[13px] asowp-font-[800] asowp-cursor-pointer hover:asowp-bg-[#731000] hover:asowp-text-white">{{ __('Delete', 'all-signs-options-pro') }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { PlusIcon, SearchIcon } from 'lucide-vue-next';
import api from "@/admin/Api/api";
import toastMessage from "@/admin/utils/functions";
import { __ } from "@wordpress/i18n";

const route = useRoute();
const router = useRouter();
const clipartsGroups = ref([]);
const isEdit = ref(false);
const createGroup = ref(false);
const editId = ref(null);
const openModal = ref(false);
const isFetching = ref(false);
const newGroup = ref({ title: '', description: '' });
const emptyLabel = ref(false);
const isLoading = ref(false);

const fetchGroups = async () => {
  isFetching.value = true;
  try {
    const result = await api.getManageCliparts();
    clipartsGroups.value = Array.isArray(result?.data) ? result.data : [];
  } finally {
    isFetching.value = false;
  }
};

const addNewGroup = async () => {
  if (newGroup.value.title.trim() === '') {
    emptyLabel.value = true;
    toastMessage(__("Label must not be empty", "all-signs-options-pro"), "warning");
    return;
  }

  isLoading.value = true;
  const result = await api.addManageClipart(newGroup.value);
  isLoading.value = false;

  if (result.success) {
    await fetchGroups();
    toastMessage(result.message);
    back();
  } else {
    toastMessage(result.message, 'error');
  }
};

const selectGroup = (id, group, isDeleting = false) => {
  editId.value = id;
  newGroup.value = { title: group.title || '', description: group.description || '' };
  if (isDeleting) {
    openModal.value = true;
    return;
  }
  isEdit.value = true;
  addGroup();
};

const updateGroup = async () => {
  if (newGroup.value.title.trim() === '') {
    emptyLabel.value = true;
    toastMessage(__("Label must not be empty", "all-signs-options-pro"), "warning");
    return;
  }

  isLoading.value = true;
  const result = await api.UpdateManageClipart(editId.value, newGroup.value);
  isLoading.value = false;

  if (result.success) {
    await fetchGroups();
    toastMessage(result.message);
    back();
  } else {
    toastMessage(result.message, 'error');
  }
};

const deleteGroup = async () => {
  isLoading.value = true;
  const result = await api.deleteManageClipart(editId.value);
  isLoading.value = false;

  if (result.success) {
    await fetchGroups();
    toastMessage(result.message);
    closeModal();
    back();
  } else {
    toastMessage(result.message, 'error');
  }
};

const addGroup = () => {
  createGroup.value = true;
};

const back = () => {
  createGroup.value = false;
  editId.value = null;
  isEdit.value = false;
  emptyLabel.value = false;
  newGroup.value = { title: '', description: '' };
  if (route.query.action) router.replace({ name: 'managecliparts' });
};

const closeModal = () => {
  openModal.value = false;
};

const goToGroup = (id) => {
  router.push({ name: 'cliparts', params: { groupId: id } });
};

watch(() => route.query.action, (action) => {
  if (action === 'new') addGroup();
}, { immediate: true });

onMounted(fetchGroups);
</script>
