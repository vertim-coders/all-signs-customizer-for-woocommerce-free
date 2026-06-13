<template>
  <div class="ascwo-space-y-3">
    <section v-if="!createGroup" class="ascwo-bg-white ascwo-border ascwo-border-solid ascwo-border-[#d1d5db] ascwo-rounded-xl ascwo-shadow-sm ascwo-px-5 ascwo-py-4 ascwo-flex ascwo-items-center ascwo-justify-between ascwo-gap-4">
      <div>
        <h1 class="ascwo-m-0 ascwo-text-[20px] ascwo-leading-6 ascwo-font-[900] ascwo-text-[#303030]">{{ __('Clipart Groups', 'all-signs-customizer-for-woocommerce-pro') }}</h1>
        <p class="ascwo-m-0 ascwo-mt-1 ascwo-text-[13px] ascwo-leading-4 ascwo-text-[#616161]">
          {{ __('Manage the reusable clipart groups used across configurations.', 'all-signs-customizer-for-woocommerce-pro') }}
        </p>
      </div>
      <button type="button" @click="goToCreateGroup" class="ascwo-h-8 ascwo-px-3 ascwo-rounded-lg ascwo-bg-[#00796b] ascwo-border ascwo-border-solid ascwo-border-[#005f55] ascwo-text-white ascwo-text-[13px] ascwo-font-[800] ascwo-cursor-pointer hover:ascwo-bg-[#00695f] hover:ascwo-text-white ascwo-inline-flex ascwo-items-center ascwo-gap-2">
        <PlusIcon class="ascwo-w-4 ascwo-h-4" />
        {{ __('Add new clipart group', 'all-signs-customizer-for-woocommerce-pro') }}
      </button>
    </section>

    <section v-if="!createGroup" class="ascwo-bg-white ascwo-border ascwo-border-solid ascwo-border-[#d1d5db] ascwo-rounded-xl ascwo-shadow-sm ascwo-px-5 ascwo-py-4">
      <div v-if="isFetching" class="ascwo-min-h-[200px] ascwo-flex ascwo-items-center ascwo-justify-center ascwo-text-[13px] ascwo-text-[#616161]">
        {{ __('Loading...', 'all-signs-customizer-for-woocommerce-pro') }}
      </div>
      <div v-else-if="clipartsGroups.length === 0" class="ascwo-min-h-[220px] ascwo-flex ascwo-flex-col ascwo-items-center ascwo-justify-center ascwo-text-center">
        <SearchIcon class="ascwo-w-16 ascwo-h-16 ascwo-text-[#8c9196] ascwo-mb-5" />
        <h2 class="ascwo-m-0 ascwo-text-[20px] ascwo-leading-6 ascwo-font-[900] ascwo-text-[#303030]">{{ __('No Clipart Groups found', 'all-signs-customizer-for-woocommerce-pro') }}</h2>
        <p class="ascwo-m-0 ascwo-mt-3 ascwo-text-[13px] ascwo-text-[#616161]">{{ __('Try changing the filters or search term', 'all-signs-customizer-for-woocommerce-pro') }}</p>
      </div>
      <table v-else class="ascwo-cliparts-table ascwo-w-full ascwo-border-collapse ascwo-text-left">
        <thead class="ascwo-bg-[#f6f6f7]">
          <tr>
            <th class="ascwo-px-3 ascwo-py-2.5 ascwo-text-[12px] ascwo-font-[800] ascwo-text-[#616161]">{{ __('Title', 'all-signs-customizer-for-woocommerce-pro') }}</th>
            <th class="ascwo-px-3 ascwo-py-2.5 ascwo-text-[12px] ascwo-font-[800] ascwo-text-[#616161]">{{ __('Description', 'all-signs-customizer-for-woocommerce-pro') }}</th>
            <th class="ascwo-px-3 ascwo-py-2.5 ascwo-text-[12px] ascwo-font-[800] ascwo-text-[#616161]">{{ __('Actions', 'all-signs-customizer-for-woocommerce-pro') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(group, key) in clipartsGroups" :key="key" class="ascwo-border-b ascwo-border-solid ascwo-border-[#e5e7eb]">
            <td class="ascwo-px-3 ascwo-py-2.5 ascwo-text-[13px] ascwo-font-[800] ascwo-text-[#202223]">{{ group.title }}</td>
            <td class="ascwo-px-3 ascwo-py-2.5 ascwo-text-[13px] ascwo-text-[#303030]">{{ group.description || '-' }}</td>
            <td class="ascwo-px-3 ascwo-py-3">
              <div class="ascwo-flex ascwo-items-center ascwo-gap-2">
                <button type="button" @click="goToGroup(key)" class="ascwo-h-7 ascwo-px-2.5 ascwo-rounded-lg ascwo-bg-white ascwo-border ascwo-border-solid ascwo-border-[#c9cccf] ascwo-text-[13px] ascwo-font-[700] ascwo-cursor-pointer hover:ascwo-bg-[#f6f6f7] hover:ascwo-text-[#202223]">{{ __('Manage', 'all-signs-customizer-for-woocommerce-pro') }}</button>
                <button type="button" @click="goToEditGroup(key)" class="ascwo-h-7 ascwo-px-2.5 ascwo-rounded-lg ascwo-bg-white ascwo-border ascwo-border-solid ascwo-border-[#c9cccf] ascwo-text-[13px] ascwo-font-[700] ascwo-cursor-pointer hover:ascwo-bg-[#f6f6f7] hover:ascwo-text-[#202223]">{{ __('Edit', 'all-signs-customizer-for-woocommerce-pro') }}</button>
                <button type="button" @click="selectGroup(key, group, true)" class="ascwo-h-7 ascwo-px-2.5 ascwo-rounded-lg ascwo-bg-white ascwo-border ascwo-border-solid ascwo-border-[#c9cccf] ascwo-text-[#8a0f00] ascwo-text-[13px] ascwo-font-[700] ascwo-cursor-pointer hover:ascwo-bg-[#f6f6f7] hover:ascwo-text-[#8a0f00]">{{ __('Delete', 'all-signs-customizer-for-woocommerce-pro') }}</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </section>

    <section v-if="createGroup" class="ascwo-bg-white ascwo-border ascwo-border-solid ascwo-border-[#d1d5db] ascwo-rounded-xl ascwo-shadow-sm ascwo-px-5 ascwo-py-4">
      <h1 class="ascwo-m-0 ascwo-text-[20px] ascwo-leading-6 ascwo-font-[900] ascwo-text-[#303030]">
        {{ isEdit ? __('Edit clipart group', 'all-signs-customizer-for-woocommerce-pro') : __('Add clipart group', 'all-signs-customizer-for-woocommerce-pro') }}
      </h1>
    </section>

    <section v-if="createGroup" class="ascwo-bg-white ascwo-border ascwo-border-solid ascwo-border-[#d1d5db] ascwo-rounded-xl ascwo-shadow-sm ascwo-px-5 ascwo-py-4">
      <div class="ascwo-grid md:ascwo-grid-cols-2 ascwo-gap-4">
        <label class="ascwo-block ascwo-text-[13px] ascwo-text-[#303030]">
          {{ __('Title', 'all-signs-customizer-for-woocommerce-pro') }}
          <input v-model="newGroup.title" type="text" :class="['ascwo-mt-2 ascwo-box-border ascwo-w-full ascwo-h-9 ascwo-rounded-lg ascwo-border ascwo-border-solid ascwo-border-[#8c9196] ascwo-px-3 ascwo-text-[13px] ascwo-outline-none focus:ascwo-border-[#008060]', emptyLabel ? 'ascwo-border-[#d72c0d]' : '']">
        </label>
        <label class="ascwo-block ascwo-text-[13px] ascwo-text-[#303030]">
          {{ __('Description', 'all-signs-customizer-for-woocommerce-pro') }}
          <input v-model="newGroup.description" type="text" class="ascwo-mt-2 ascwo-box-border ascwo-w-full ascwo-h-9 ascwo-rounded-lg ascwo-border ascwo-border-solid ascwo-border-[#8c9196] ascwo-px-3 ascwo-text-[13px] ascwo-outline-none focus:ascwo-border-[#008060]">
        </label>
      </div>
      <div class="ascwo-mt-5 ascwo-flex ascwo-justify-end ascwo-gap-3">
        <button type="button" @click="back" :disabled="isLoading" class="ascwo-h-8 ascwo-px-3 ascwo-rounded-lg ascwo-bg-white ascwo-border ascwo-border-solid ascwo-border-[#c9cccf] ascwo-text-[#202223] ascwo-text-[13px] ascwo-font-[700] ascwo-cursor-pointer hover:ascwo-bg-[#f6f6f7] hover:ascwo-text-[#202223]">{{ __('Back', 'all-signs-customizer-for-woocommerce-pro') }}</button>
        <button type="button" @click="isEdit ? updateGroup() : addNewGroup()" :disabled="isLoading || !newGroup.title.trim()" class="ascwo-h-8 ascwo-px-3 ascwo-rounded-lg ascwo-bg-[#00796b] ascwo-border ascwo-border-solid ascwo-border-[#005f55] ascwo-text-white ascwo-text-[13px] ascwo-font-[800] ascwo-cursor-pointer hover:ascwo-bg-[#00695f] hover:ascwo-text-white disabled:ascwo-bg-[#d1d1d1] disabled:ascwo-border-[#d1d1d1] disabled:ascwo-cursor-not-allowed">
          {{ isLoading ? __('Saving...', 'all-signs-customizer-for-woocommerce-pro') : __('Save', 'all-signs-customizer-for-woocommerce-pro') }}
        </button>
      </div>
    </section>

    <div v-if="openModal" class="ascwo-fixed ascwo-inset-0 ascwo-z-[20000] ascwo-flex ascwo-items-center ascwo-justify-center">
      <div class="ascwo-absolute ascwo-inset-0 ascwo-bg-black/40" @click="closeModal"></div>
      <div class="ascwo-relative ascwo-w-[min(460px,95vw)] ascwo-bg-white ascwo-rounded-xl ascwo-shadow-2xl ascwo-p-5">
        <h2 class="ascwo-m-0 ascwo-text-[20px] ascwo-font-[900] ascwo-text-[#303030]">{{ __('Delete clipart group?', 'all-signs-customizer-for-woocommerce-pro') }}</h2>
        <p class="ascwo-mt-3 ascwo-text-[13px] ascwo-text-[#616161]">{{ __('This action cannot be undone.', 'all-signs-customizer-for-woocommerce-pro') }}</p>
        <div class="ascwo-mt-6 ascwo-flex ascwo-justify-end ascwo-gap-3">
          <button type="button" @click="closeModal" class="ascwo-h-8 ascwo-px-3 ascwo-rounded-lg ascwo-bg-white ascwo-border ascwo-border-solid ascwo-border-[#c9cccf] ascwo-text-[13px] ascwo-font-[700] ascwo-cursor-pointer hover:ascwo-bg-[#f6f6f7]">{{ __('Cancel', 'all-signs-customizer-for-woocommerce-pro') }}</button>
          <button type="button" @click="deleteGroup" :disabled="isLoading" class="ascwo-h-8 ascwo-px-3 ascwo-rounded-lg ascwo-bg-[#8a0f00] ascwo-border-none ascwo-text-white ascwo-text-[13px] ascwo-font-[800] ascwo-cursor-pointer hover:ascwo-bg-[#731000] hover:ascwo-text-white">{{ __('Delete', 'all-signs-customizer-for-woocommerce-pro') }}</button>
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
    clipartsGroups.value = Array.isArray(result) ? result : [];
    syncGroupRouteState();
  } finally {
    isFetching.value = false;
  }
};

const isGroupEditRoute = () => route.name === "manage-cliparts-edit";

const syncGroupRouteState = () => {
  if (!isGroupEditRoute()) {
    createGroup.value = false;
    return;
  }

  const groupId = route.query.id;
  if (groupId === undefined || groupId === null || groupId === "") {
    addGroup();
    return;
  }

  const group = clipartsGroups.value[Number(groupId)];
  if (group) {
    selectGroup(Number(groupId), group);
  }
};

const goToCreateGroup = () => {
  router.push({ name: "manage-cliparts-edit" });
};

const goToEditGroup = (id) => {
  router.push({ name: "manage-cliparts-edit", query: { id } });
};

const addNewGroup = async () => {
  if (newGroup.value.title.trim() === '') {
    emptyLabel.value = true;
    toastMessage(__("Label must not be empty", "all-signs-customizer-for-woocommerce-pro"), "warning");
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
    toastMessage(__("Label must not be empty", "all-signs-customizer-for-woocommerce-pro"), "warning");
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
  if (isGroupEditRoute() || route.query.action) router.replace({ name: 'managecliparts' });
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

watch(
  () => [route.name, route.query.id],
  () => syncGroupRouteState()
);

onMounted(fetchGroups);
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
