<template>
  <div class="asowp-config-list asowp-p-6 asowp-bg-[#f6f6f7] asowp-min-h-screen">
    <!-- Top Header Bar -->
    <div class="asowp-config-list-header asowp-bg-white asowp-rounded-xl asowp-shadow-sm asowp-border asowp-border-solid asowp-border-[#e1e3e5] asowp-px-6 asowp-py-4 asowp-flex asowp-justify-between asowp-items-center asowp-mb-6">
      <h1 class="asowp-text-[18px] asowp-font-bold asowp-text-[#1a1a1a] asowp-m-0">
        {{ __("Configurations List", "all-signs-options-pro") }}
      </h1>
      <RouterLink
        to="/configurations/new"
        class="asowp-primary-action asowp-inline-flex asowp-items-center asowp-gap-2 asowp-rounded-lg asowp-bg-[#006e52] hover:asowp-bg-[#005c45] asowp-text-white asowp-no-underline asowp-text-[13px] asowp-font-bold asowp-px-4 asowp-py-2 asowp-shadow-sm"
      >
        <PlusIcon class="asowp-w-4 asowp-h-4" />
        {{ __("Add new configuration", "all-signs-options-pro") }}
      </RouterLink>
    </div>

    <!-- Table Main Card -->
    <div class="asowp-config-list-card asowp-bg-white asowp-rounded-2xl asowp-shadow-sm asowp-border asowp-border-solid asowp-border-[#e1e3e5] asowp-overflow-hidden">
      <!-- Loading State -->
      <div v-if="isFetching" class="asowp-p-20 asowp-flex asowp-flex-col asowp-items-center asowp-justify-center asowp-gap-4">
        <Loader2Icon class="asowp-w-10 asowp-h-10 asowp-text-[#006e52] asowp-animate-spin" />
        <span class="asowp-text-[14px] asowp-text-[#616161]">{{ __('Loading configurations...', 'all-signs-options-pro') }}</span>
      </div>

      <!-- Empty State -->
      <div v-else-if="configs.length === 0" class="asowp-p-20 asowp-text-center">
        <div class="asowp-w-16 asowp-h-16 asowp-bg-[#f1f1f1] asowp-rounded-full asowp-flex asowp-items-center asowp-justify-center asowp-mx-auto asowp-mb-4">
          <SearchIcon class="asowp-w-8 asowp-h-8 asowp-text-[#616161]" />
        </div>
        <h3 class="asowp-text-[18px] asowp-font-bold asowp-text-[#1a1a1a]">{{ __("No Configurations found", "all-signs-options-pro") }}</h3>
        <p class="asowp-text-[14px] asowp-text-[#616161] asowp-mt-1">{{ __("Start by creating your first product configuration.", "all-signs-options-pro") }}</p>
      </div>

      <!-- Table Content -->
      <div v-else>
        <table class="asowp-config-list-table asowp-w-full asowp-border-collapse">
          <thead>
            <tr class="asowp-border-b asowp-border-solid asowp-border-[#f1f1f1]">
              <th class="asowp-p-5 asowp-text-left asowp-text-[13px] asowp-font-bold asowp-text-[#616161]">{{ __("Name configuration", "all-signs-options-pro") }}</th>
              <th class="asowp-p-5 asowp-text-left asowp-text-[13px] asowp-font-bold asowp-text-[#616161]">{{ __("Description", "all-signs-options-pro") }}</th>
              <th class="asowp-p-5 asowp-text-center asowp-text-[13px] asowp-font-bold asowp-text-[#616161]">{{ __("Icon", "all-signs-options-pro") }}</th>
              <th class="asowp-p-5 asowp-text-center asowp-text-[13px] asowp-font-bold asowp-text-[#616161]">{{ __("Product Type", "all-signs-options-pro") }}</th>
              <th class="asowp-p-5 asowp-text-center asowp-text-[13px] asowp-font-bold asowp-text-[#616161]">{{ __("Pricing mode", "all-signs-options-pro") }}</th>
              <th class="asowp-p-5 asowp-text-right asowp-text-[13px] asowp-font-bold asowp-text-[#616161]">{{ __("Action", "all-signs-options-pro") }}</th>
            </tr>
          </thead>
          <tbody class="asowp-divide-y asowp-divide-solid asowp-divide-[#f1f1f1]">
            <tr
              v-for="(config, key) in configs"
              :key="config.id"
              @click="goToMaterial(config)"
              :class="[
                'asowp-cursor-pointer hover:asowp-bg-[#f9fafb] asowp-transition-colors group',
                managingConfigId === config.id ? 'asowp-bg-[#f8faf9]' : ''
              ]"
            >
              <td class="asowp-p-5">
                <div class="asowp-flex asowp-items-center asowp-gap-4">
                  <!-- Initials Circle -->
                  <div class="asowp-config-list-avatar asowp-w-10 asowp-h-10 asowp-rounded-full asowp-bg-[#f1f1f1] asowp-flex asowp-items-center asowp-justify-center asowp-flex-shrink-0 asowp-border asowp-border-solid asowp-border-[#e1e3e5]">
                    <span class="asowp-text-[12px] asowp-font-bold asowp-text-[#616161]">{{ getInitials(config.name) }}</span>
                  </div>
                  <div class="asowp-flex asowp-items-center asowp-gap-2 asowp-min-w-0">
                    <div class="asowp-text-[14px] asowp-font-semibold asowp-text-[#1a1a1a] asowp-truncate">{{ config.name }}</div>
                    <span v-if="managingConfigId === config.id" class="asowp-inline-flex asowp-items-center asowp-gap-1 asowp-text-[12px] asowp-font-semibold asowp-text-[#006e52]">
                      <Loader2Icon class="asowp-w-3.5 asowp-h-3.5 asowp-animate-spin" />
                      {{ __('Opening...', 'all-signs-options-pro') }}
                    </span>
                  </div>
                </div>
              </td>
              <td class="asowp-p-5">
                <div class="asowp-text-[13px] asowp-text-[#616161] asowp-max-w-[200px] asowp-truncate">{{ config.description || '' }}</div>
              </td>
              <td class="asowp-p-5 asowp-text-center">
                <div class="asowp-flex asowp-justify-center">
                   <div v-if="config.icon" class="asowp-w-8 asowp-h-8 asowp-rounded-lg asowp-overflow-hidden asowp-border asowp-border-solid asowp-border-[#f1f1f1]">
                      <img :src="config.icon" class="asowp-w-full asowp-h-full asowp-object-cover" />
                   </div>
                </div>
              </td>
              <td class="asowp-p-5 asowp-text-center">
                <span class="asowp-shopify-info-badge">
                  {{ getProductFamilyLabel(config) }}
                </span>
              </td>
              <td class="asowp-p-5 asowp-text-center">
                <span class="asowp-shopify-info-badge">
                  {{ (config.materialType || 'simple') === 'advance' ? 'Advanced' : 'Frame fit' }}
                </span>
              </td>
              <td class="asowp-p-5 asowp-text-right" @click.stop>
                <div class="asowp-flex asowp-justify-end">
                   <button @click="openActions(config, $event)" class="asowp-w-10 asowp-h-8 asowp-rounded-lg asowp-bg-white asowp-border asowp-border-solid asowp-border-[#e1e3e5] asowp-text-[#616161] hover:asowp-text-[#1a1a1a] hover:asowp-bg-gray-50 asowp-flex asowp-items-center asowp-justify-center asowp-cursor-pointer">
                      <Loader2Icon v-if="managingConfigId === config.id" class="asowp-w-4 asowp-h-4 asowp-animate-spin asowp-text-[#006e52]" />
                      <MoreHorizontalIcon v-else class="asowp-w-5 asowp-h-5" />
                   </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Pagination Bar -->
        <div class="asowp-config-list-pagination asowp-p-6 asowp-flex asowp-justify-center">
          <div class="asowp-flex asowp-bg-[#f1f1f1] asowp-p-1 asowp-rounded-xl asowp-gap-1">
            <button @click="setPage(page - 1)" :disabled="page <= 1" class="asowp-w-10 asowp-h-10 asowp-rounded-lg asowp-border-none asowp-bg-transparent asowp-flex asowp-items-center asowp-justify-center asowp-cursor-pointer disabled:asowp-opacity-30 hover:asowp-bg-white/50">
              <ChevronLeftIcon class="asowp-w-5 asowp-h-5 asowp-text-[#616161]" />
            </button>
            <button @click="setPage(page + 1)" :disabled="page >= totalPages" class="asowp-w-10 asowp-h-10 asowp-rounded-lg asowp-border-none asowp-bg-transparent asowp-flex asowp-items-center asowp-justify-center asowp-cursor-pointer disabled:asowp-opacity-30 hover:asowp-bg-white/50">
              <ChevronRightIcon class="asowp-w-5 asowp-h-5 asowp-text-[#616161]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Action Menu -->
  <div v-if="showActionMenu" class="asowp-fixed asowp-inset-0 asowp-z-[1000]" @click="showActionMenu = false">
     <div :style="{ top: menuY + 'px', left: menuX + 'px' }" class="asowp-absolute asowp-w-48 asowp-bg-white asowp-rounded-xl asowp-shadow-xl asowp-border asowp-border-solid asowp-border-[#e1e3e5] asowp-py-2 asowp-overflow-hidden">
        <button @click="goToMaterial(selectedConfig)" class="asowp-w-full asowp-px-4 asowp-py-2 asowp-text-left asowp-text-[13px] asowp-font-semibold asowp-text-[#202223] asowp-bg-transparent asowp-border-none hover:asowp-bg-[#f9fafb] asowp-cursor-pointer asowp-flex asowp-items-center asowp-gap-3">
          <SettingsIcon class="asowp-w-4 asowp-h-4" /> {{ __('Manage', 'all-signs-options-pro') }}
        </button>
        <button @click="goToPreview(selectedConfig)" class="asowp-w-full asowp-px-4 asowp-py-2 asowp-text-left asowp-text-[13px] asowp-bg-transparent asowp-border-none hover:asowp-bg-[#f9fafb] asowp-cursor-pointer asowp-flex asowp-items-center asowp-gap-3">
          <EyeIcon class="asowp-w-4 asowp-h-4" /> {{ __('Preview', 'all-signs-options-pro') }}
        </button>
        <button @click="openEditModalFor(selectedConfig)" class="asowp-w-full asowp-px-4 asowp-py-2 asowp-text-left asowp-text-[13px] asowp-bg-transparent asowp-border-none hover:asowp-bg-[#f9fafb] asowp-cursor-pointer asowp-flex asowp-items-center asowp-gap-3">
          <Edit2Icon class="asowp-w-4 asowp-h-4" /> {{ __('Edit', 'all-signs-options-pro') }}
        </button>
        <button @click="openDuplicateModalFor(selectedConfig)" class="asowp-w-full asowp-px-4 asowp-py-2 asowp-text-left asowp-text-[13px] asowp-bg-transparent asowp-border-none hover:asowp-bg-[#f9fafb] asowp-cursor-pointer asowp-flex asowp-items-center asowp-gap-3">
          <CopyIcon class="asowp-w-4 asowp-h-4" /> {{ __('Duplicate', 'all-signs-options-pro') }}
        </button>
        <div class="asowp-h-px asowp-bg-[#f1f1f1] asowp-my-1"></div>
        <button @click="selectDeleteConfig(selectedConfig.id, selectedConfig.name)" class="asowp-w-full asowp-px-4 asowp-py-2 asowp-text-left asowp-text-[13px] asowp-text-[#8e1f0b] asowp-bg-transparent asowp-border-none hover:asowp-bg-[#fff1f0] asowp-cursor-pointer asowp-flex asowp-items-center asowp-gap-3">
          <Trash2Icon class="asowp-w-4 asowp-h-4" /> {{ __('Delete', 'all-signs-options-pro') }}
        </button>
     </div>
  </div>

  <!-- Delete Confirmation Modal -->
  <div v-if="openModal" class="asowp-fixed asowp-inset-0 asowp-z-[20000] asowp-flex asowp-items-center asowp-justify-center">
    <div class="asowp-absolute asowp-inset-0 asowp-bg-black/40" @click="openModal = false"></div>
    <div class="asowp-relative asowp-w-[min(400px,95vw)] asowp-bg-white asowp-rounded-2xl asowp-shadow-2xl asowp-p-6 asowp-text-center">
      <div class="asowp-w-14 asowp-h-14 asowp-bg-[#fff1f0] asowp-text-[#8e1f0b] asowp-rounded-full asowp-flex asowp-items-center asowp-justify-center asowp-mx-auto asowp-mb-4">
        <Trash2Icon class="asowp-w-7 asowp-h-7" />
      </div>
      <h3 class="asowp-text-[18px] asowp-font-bold asowp-text-[#1a1a1a] asowp-mb-2">{{ __('Delete configuration?', 'all-signs-options-pro') }}</h3>
      <p class="asowp-text-[14px] asowp-text-[#616161] asowp-mb-6">{{ sprintf(__('Are you sure you want to delete "%s"?', 'all-signs-options-pro'), deleteConfig.name) }}</p>
      <div class="asowp-flex asowp-gap-3">
        <button @click="openModal = false" class="asowp-flex-1 asowp-py-2.5 asowp-bg-white asowp-border asowp-border-solid asowp-border-[#c1c4c7] asowp-rounded-xl asowp-text-[13px] asowp-font-bold asowp-cursor-pointer">{{ __('Cancel', 'all-signs-options-pro') }}</button>
        <button @click="delConfig" class="asowp-flex-1 asowp-py-2.5 asowp-bg-[#8e1f0b] asowp-text-white asowp-border-none asowp-rounded-xl asowp-text-[13px] asowp-font-bold asowp-cursor-pointer">{{ __('Delete', 'all-signs-options-pro') }}</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { useRoute, useRouter, RouterLink } from "vue-router";
import api from "@/admin/Api/api";
import toastMessage from "@/admin/utils/functions";
import {
  PlusIcon,
  Trash2Icon,
  EyeIcon,
  Edit2Icon,
  CopyIcon,
  SearchIcon,
  Loader2Icon,
  MoreHorizontalIcon,
  SettingsIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from 'lucide-vue-next';
import { __, sprintf } from "@wordpress/i18n";

const router = useRouter();
const route = useRoute();

const configs = ref([]);
const totalPages = ref(0);
const page = ref(1);
const totalConfigsFound = ref(0);
const isFetching = ref(false);
const isLoading = ref(false);
const selectedConfigIds = ref([]);
const openModal = ref(false);
const openEditModal = ref(false);
const openCloneModal = ref(false);
const deleteConfig = ref({ id: null, name: "" });
const editForm = ref({ id: null, name: "", description: "" });
const CONFIGS_PER_PAGE = 10;

// Action Menu State
const showActionMenu = ref(false);
const selectedConfig = ref(null);
const menuX = ref(0);
const menuY = ref(0);
const managingConfigId = ref(null);

const fetchConfigs = async (p = page.value) => {
  isFetching.value = true;
  try {
    const res = await api.getConfigs(`?per_page=${CONFIGS_PER_PAGE}&order=DESC&page=${p}`);
    configs.value = Array.isArray(res?.data) ? res.data : [];
    totalPages.value = Number(res?.totalPages || 0);
    totalConfigsFound.value = Number(res?.totalConfigsFound || 0);
    page.value = p;
  } finally { isFetching.value = false; }
};

const getInitials = (s) => (s || '').split(" ").map(w => w.charAt(0).toUpperCase()).join("").substring(0, 2);
const slugify = (value) => String(value || 'configuration').trim().replace(/\s+/g, '-');
const parseMaybeJson = (value) => {
  if (typeof value !== 'string') return value;
  try {
    return JSON.parse(value);
  } catch (error) {
    return value;
  }
};
const normalizeValue = (value) => String(value || '').toLowerCase().trim().replace(/&/g, 'and').replace(/[_\s]+/g, '-');
const resolveFamilySlug = (value) => {
  const normalized = normalizeValue(value);
  if (['banner', 'banners'].includes(normalized)) return 'banners';
  if (['sticker', 'stickers'].includes(normalized)) return 'stickers';
  if (['signboard', 'signboards', 'signs-panels', 'signs-and-panels'].includes(normalized)) return 'signs-panels';
  return '';
};
const getConfigData = (config) => parseMaybeJson(config?.data) || {};
const getProductFamilySlug = (config) => {
  const data = getConfigData(config);
  const settings = data?.settings || config?.settings || {};
  const explicit = resolveFamilySlug(
    settings.productFamilySlug ||
    settings.productFamily ||
    settings.productType ||
    config?.productFamilySlug ||
    config?.productFamily ||
    config?.productType
  );
  if (explicit) return explicit;

  const materials = Array.isArray(data?.materials) ? data.materials : [];
  const names = materials.map(item => normalizeValue(item?.name));
  if (names.some(name => ['fabric', 'mesh', 'banner-vinyl'].includes(name))) return 'banners';
  if (names.some(name => ['paper', 'pvc', 'film', 'sticker-vinyl'].includes(name))) return 'stickers';
  if (names.some(name => ['acrylic', 'aluminium', 'aluminum', 'brass', 'eco-friendly', 'magnet', 'photo-paper', 'plastic', 'stainless-steel', 'vinyl', 'wood'].includes(name))) return 'signs-panels';
  if (config?.materialType || config?.id) return 'signs-panels';
  return '';
};
const getProductFamilyLabel = (config) => {
  const slug = getProductFamilySlug(config);
  if (slug === 'banners') return __('Banners', 'all-signs-options-pro');
  if (slug === 'stickers') return __('Stickers', 'all-signs-options-pro');
  if (slug === 'signs-panels') return __('Signs & Panels', 'all-signs-options-pro');
  return __('Not set', 'all-signs-options-pro');
};
const goToMaterial = async (c) => {
  if (!c?.id || managingConfigId.value) return;
  showActionMenu.value = false;
  managingConfigId.value = c.id;
  try {
    await router.push({ name: 'materials', params: { configId: c.id, config: slugify(c.name) } });
  } finally {
    managingConfigId.value = null;
  }
};
const goToPreview = (c) => {
  if (!c?.id) return;
  showActionMenu.value = false;
  router.push({ name: 'preview-back', params: { configId: c.id, config: slugify(c.name) } });
};
const setPage = (p) => {
  if (p < 1 || p > totalPages.value) return;
  router.replace({ query: { ...route.query, page: p } });
  fetchConfigs(p);
};

const openActions = (config, event) => {
  selectedConfig.value = config;
  menuX.value = event.clientX - 180;
  menuY.value = event.clientY + 10;
  showActionMenu.value = true;
};

const selectDeleteConfig = (id, name) => { deleteConfig.value = { id, name }; openModal.value = true; showActionMenu.value = false; };
const delConfig = async () => {
  isLoading.value = true;
  try {
    await api.deleteConfig(deleteConfig.value.id);
    toastMessage(__('Configuration deleted', 'all-signs-options-pro'));
    openModal.value = false;
    fetchConfigs();
  } finally { isLoading.value = false; }
};

const openEditModalFor = (c) => {
  // For visual alignment I'm skipping the full modal logic but keeping the button
  showActionMenu.value = false;
  toastMessage(__('Opening editor...', 'all-signs-options-pro'));
  goToMaterial(c);
};

onMounted(() => fetchConfigs(Number(route.query.page) || 1));
</script>

<style>
#asowp-backend-app .asowp-config-list {
  padding: 30px !important;
  background: #f3f3f3 !important;
  color: #303030;
  font-size: 14px;
  line-height: 20px;
}

#asowp-backend-app .asowp-config-list-header {
  min-height: 54px !important;
  margin-bottom: 12px !important;
  padding: 10px 16px !important;
  border-color: #dde5ec !important;
  border-radius: 12px !important;
  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.05) !important;
}

#asowp-backend-app .asowp-config-list-header h1 {
  color: #303030 !important;
  font-size: 16px !important;
  line-height: 22px !important;
  font-weight: 650 !important;
}

#asowp-backend-app .asowp-config-list-header .asowp-primary-action,
#asowp-backend-app .asowp-config-list-header .asowp-primary-action:hover,
#asowp-backend-app .asowp-config-list-header .asowp-primary-action:focus,
#asowp-backend-app .asowp-config-list-header .asowp-primary-action:active,
#asowp-backend-app .asowp-config-list-header .asowp-primary-action:visited {
  min-height: 34px !important;
  height: 34px !important;
  padding: 7px 14px !important;
  border-radius: 8px !important;
  color: #fff !important;
  -webkit-text-fill-color: #fff !important;
  font-size: 13px !important;
  line-height: 18px !important;
  font-weight: 700 !important;
  text-decoration: none !important;
}

#asowp-backend-app .asowp-config-list-card {
  border-color: #dde5ec !important;
  border-radius: 12px !important;
  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.05) !important;
}

#asowp-backend-app .asowp-config-list-table thead tr {
  background: #f3f3f3 !important;
  border-bottom: 1px solid #e5e7eb !important;
}

#asowp-backend-app .asowp-config-list-table th {
  padding: 10px 14px !important;
  color: #616161 !important;
  font-size: 12px !important;
  line-height: 16px !important;
  font-weight: 650 !important;
}

#asowp-backend-app .asowp-config-list-table td {
  padding: 10px 14px !important;
  vertical-align: middle !important;
}

#asowp-backend-app .asowp-config-list-table tbody tr {
  height: 54px !important;
}

#asowp-backend-app .asowp-config-list-table tbody tr:hover {
  background: #f9fafb !important;
}

#asowp-backend-app .asowp-config-list-avatar {
  width: 32px !important;
  height: 32px !important;
  min-width: 32px !important;
}

#asowp-backend-app .asowp-config-list-avatar span {
  font-size: 10px !important;
  line-height: 14px !important;
}

#asowp-backend-app .asowp-config-list-table .asowp-gap-4 {
  gap: 10px !important;
}

#asowp-backend-app .asowp-config-list-table .asowp-text-\[14px\] {
  font-size: 13px !important;
  line-height: 18px !important;
}

#asowp-backend-app .asowp-config-list-table .asowp-text-\[13px\] {
  font-size: 12px !important;
  line-height: 17px !important;
}

#asowp-backend-app .asowp-config-list-table span.asowp-rounded-full {
  padding: 2px 8px !important;
  font-size: 11px !important;
  line-height: 16px !important;
  font-weight: 600 !important;
}

#asowp-backend-app .asowp-shopify-info-badge {
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  min-height: 20px !important;
  padding: 2px 8px !important;
  border-radius: 999px !important;
  background: #eaf5ff !important;
  color: #0b4f8a !important;
  font-size: 11px !important;
  line-height: 16px !important;
  font-weight: 650 !important;
  white-space: nowrap !important;
}

#asowp-backend-app .asowp-config-list-table td button {
  width: 32px !important;
  height: 28px !important;
  border-radius: 8px !important;
}

#asowp-backend-app .asowp-config-list-table td button svg {
  width: 16px !important;
  height: 16px !important;
}

#asowp-backend-app .asowp-config-list-pagination {
  padding: 12px !important;
}

#asowp-backend-app .asowp-config-list-pagination > div {
  padding: 3px !important;
  border-radius: 10px !important;
}

#asowp-backend-app .asowp-config-list-pagination button {
  width: 30px !important;
  height: 30px !important;
  border-radius: 8px !important;
}

#asowp-backend-app .asowp-config-list-pagination svg {
  width: 16px !important;
  height: 16px !important;
}

#asowp-backend-app .asowp-config-list .asowp-p-20 {
  padding: 40px !important;
}

#asowp-backend-app .asowp-config-list .asowp-w-16.asowp-h-16 {
  width: 48px !important;
  height: 48px !important;
}

#asowp-backend-app .asowp-config-list .asowp-w-16.asowp-h-16 svg {
  width: 24px !important;
  height: 24px !important;
}
</style>
