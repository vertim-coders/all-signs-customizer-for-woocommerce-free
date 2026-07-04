<template>
  <div class="ascwo-config-list ascwo-p-6 ascwo-bg-[#f6f6f7] ascwo-min-h-screen">
    <!-- Top Header Bar -->
    <div class="ascwo-config-list-header ascwo-bg-white ascwo-rounded-xl ascwo-shadow-sm ascwo-border ascwo-border-solid ascwo-border-[#e1e3e5] ascwo-px-6 ascwo-py-4 ascwo-flex ascwo-justify-between ascwo-items-center ascwo-mb-6">
      <h1 class="ascwo-text-[18px] ascwo-font-bold ascwo-text-[#1a1a1a] ascwo-m-0">
        {{ __("Configurations List", "all-signs-customizer-for-woocommerce") }}
      </h1>
      <RouterLink
        to="/configuration/create"
        class="ascwo-primary-action ascwo-inline-flex ascwo-items-center ascwo-gap-2 ascwo-text-white ascwo-no-underline"
      >
        <PlusIcon class="ascwo-w-4 ascwo-h-4" />
        {{ __("Add new configuration", "all-signs-customizer-for-woocommerce") }}
      </RouterLink>
    </div>

    <!-- Table Main Card -->
    <div class="ascwo-config-list-card ascwo-bg-white ascwo-rounded-2xl ascwo-shadow-sm ascwo-border ascwo-border-solid ascwo-border-[#e1e3e5] ascwo-overflow-hidden">
      <!-- Loading State -->
      <div v-if="isFetching" class="ascwo-p-20 ascwo-flex ascwo-flex-col ascwo-items-center ascwo-justify-center ascwo-gap-4">
        <Loader2Icon class="ascwo-w-10 ascwo-h-10 ascwo-text-[#006e52] ascwo-animate-spin" />
        <span class="ascwo-text-[14px] ascwo-text-[#616161]">{{ __('Loading configurations...', 'all-signs-customizer-for-woocommerce') }}</span>
      </div>

      <!-- Empty State -->
      <div v-else-if="configs.length === 0" class="ascwo-p-20 ascwo-text-center">
        <div class="ascwo-w-16 ascwo-h-16 ascwo-bg-[#f1f1f1] ascwo-rounded-full ascwo-flex ascwo-items-center ascwo-justify-center ascwo-mx-auto ascwo-mb-4">
          <SearchIcon class="ascwo-w-8 ascwo-h-8 ascwo-text-[#616161]" />
        </div>
        <h3 class="ascwo-text-[18px] ascwo-font-bold ascwo-text-[#1a1a1a]">{{ __("No Configurations found", "all-signs-customizer-for-woocommerce") }}</h3>
        <p class="ascwo-text-[14px] ascwo-text-[#616161] ascwo-mt-1">{{ __("Start by creating your first product configuration.", "all-signs-customizer-for-woocommerce") }}</p>
      </div>

      <!-- Table Content -->
      <div v-else class="ascwo-config-list-table-wrap">
        <table class="ascwo-config-list-table ascwo-w-full ascwo-border-collapse">
          <thead>
            <tr>
              <th class="ascwo-p-5 ascwo-text-left ascwo-text-[13px] ascwo-font-bold ascwo-text-[#616161]">{{ __("Name configuration", "all-signs-customizer-for-woocommerce") }}</th>
              <th class="ascwo-p-5 ascwo-text-left ascwo-text-[13px] ascwo-font-bold ascwo-text-[#616161]">{{ __("Description", "all-signs-customizer-for-woocommerce") }}</th>
              <th class="ascwo-p-5 ascwo-text-center ascwo-text-[13px] ascwo-font-bold ascwo-text-[#616161]">{{ __("Icon", "all-signs-customizer-for-woocommerce") }}</th>
              <th class="ascwo-p-5 ascwo-text-center ascwo-text-[13px] ascwo-font-bold ascwo-text-[#616161]">{{ __("Product Type", "all-signs-customizer-for-woocommerce") }}</th>
              <th class="ascwo-p-5 ascwo-text-center ascwo-text-[13px] ascwo-font-bold ascwo-text-[#616161]">{{ __("Pricing mode", "all-signs-customizer-for-woocommerce") }}</th>
              <th class="ascwo-p-5 ascwo-text-right ascwo-text-[13px] ascwo-font-bold ascwo-text-[#616161]">{{ __("Action", "all-signs-customizer-for-woocommerce") }}</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(config, key) in configs"
              :key="config.id"
              @click="goToMaterial(config)"
              :class="[
                'ascwo-cursor-pointer hover:ascwo-bg-[#f9fafb] ascwo-transition-colors group',
                managingConfigId === config.id ? 'ascwo-bg-[#f8faf9]' : ''
              ]"
            >
              <td class="ascwo-p-5">
                <div class="ascwo-flex ascwo-items-center ascwo-gap-4">
                  <!-- Initials Circle -->
                  <div class="ascwo-config-list-avatar ascwo-w-10 ascwo-h-10 ascwo-rounded-full ascwo-bg-[#f1f1f1] ascwo-flex ascwo-items-center ascwo-justify-center ascwo-flex-shrink-0 ascwo-border ascwo-border-solid ascwo-border-[#b7d4cc]">
                    <span class="ascwo-text-[12px] ascwo-font-bold ascwo-text-[#616161]">{{ getInitials(config.name) }}</span>
                  </div>
                  <div class="ascwo-flex ascwo-items-center ascwo-gap-2 ascwo-min-w-0">
                    <div class="ascwo-text-[14px] ascwo-font-semibold ascwo-text-[#1a1a1a] ascwo-truncate">{{ config.name }}</div>
                    <span v-if="managingConfigId === config.id" class="ascwo-inline-flex ascwo-items-center ascwo-gap-1 ascwo-text-[12px] ascwo-font-semibold ascwo-text-[#006e52]">
                      <Loader2Icon class="ascwo-w-3.5 ascwo-h-3.5 ascwo-animate-spin" />
                      {{ __('Opening...', 'all-signs-customizer-for-woocommerce') }}
                    </span>
                  </div>
                </div>
              </td>
              <td class="ascwo-p-5">
                <div class="ascwo-text-[13px] ascwo-text-[#616161] ascwo-max-w-[200px] ascwo-truncate">{{ config.description || '' }}</div>
              </td>
              <td class="ascwo-p-5 ascwo-text-center">
                <div class="ascwo-flex ascwo-justify-center">
                   <div v-if="config.icon" class="ascwo-w-8 ascwo-h-8 ascwo-rounded-lg ascwo-overflow-hidden ascwo-border ascwo-border-solid ascwo-border-[#f1f1f1]">
                      <img :src="config.icon" class="ascwo-w-full ascwo-h-full ascwo-object-cover" />
                   </div>
                </div>
              </td>
              <td class="ascwo-p-5 ascwo-text-center">
                <span :class="['ascwo-ui-badge', `ascwo-ui-badge--${getProductBadgeTone(config)}`]">
                  {{ getProductFamilyLabel(config) }}
                </span>
              </td>
              <td class="ascwo-p-5 ascwo-text-center">
                <span class="ascwo-ui-badge ascwo-ui-badge--info">
                  {{ 'Frame fit' }}
                </span>
              </td>
              <td class="ascwo-p-5 ascwo-text-right" @click.stop>
                <div class="ascwo-flex ascwo-justify-end">
                   <button @click="openActions(config, $event)" class="ascwo-w-10 ascwo-h-8 ascwo-rounded-lg ascwo-bg-white ascwo-border ascwo-border-solid ascwo-border-[#e1e3e5] ascwo-text-[#616161] hover:ascwo-text-[#1a1a1a] hover:ascwo-bg-gray-50 ascwo-flex ascwo-items-center ascwo-justify-center ascwo-cursor-pointer">
                      <Loader2Icon v-if="managingConfigId === config.id" class="ascwo-w-4 ascwo-h-4 ascwo-animate-spin ascwo-text-[#006e52]" />
                      <MoreHorizontalIcon v-else class="ascwo-w-5 ascwo-h-5" />
                   </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Pagination Bar -->
        <div class="ascwo-config-list-pagination ascwo-p-6 ascwo-flex ascwo-justify-center">
          <div class="ascwo-flex ascwo-bg-[#f1f1f1] ascwo-p-1 ascwo-rounded-xl ascwo-gap-1">
            <button @click="setPage(page - 1)" :disabled="page <= 1" class="ascwo-w-10 ascwo-h-10 ascwo-rounded-lg ascwo-border-none ascwo-bg-transparent ascwo-flex ascwo-items-center ascwo-justify-center ascwo-cursor-pointer disabled:ascwo-opacity-30 hover:ascwo-bg-white/50">
              <ChevronLeftIcon class="ascwo-w-5 ascwo-h-5 ascwo-text-[#616161]" />
            </button>
            <button @click="setPage(page + 1)" :disabled="page >= totalPages" class="ascwo-w-10 ascwo-h-10 ascwo-rounded-lg ascwo-border-none ascwo-bg-transparent ascwo-flex ascwo-items-center ascwo-justify-center ascwo-cursor-pointer disabled:ascwo-opacity-30 hover:ascwo-bg-white/50">
              <ChevronRightIcon class="ascwo-w-5 ascwo-h-5 ascwo-text-[#616161]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Action Menu -->
  <div v-if="showActionMenu" class="ascwo-fixed ascwo-inset-0 ascwo-z-[1000]" @click="showActionMenu = false">
     <div :style="{ top: menuY + 'px', left: menuX + 'px' }" class="ascwo-absolute ascwo-w-48 ascwo-bg-white ascwo-rounded-xl ascwo-shadow-xl ascwo-border ascwo-border-solid ascwo-border-[#e1e3e5] ascwo-py-2 ascwo-overflow-hidden">
        <button @click="goToMaterial(selectedConfig)" class="ascwo-w-full ascwo-px-4 ascwo-py-2 ascwo-text-left ascwo-text-[13px] ascwo-font-semibold ascwo-text-[#202223] ascwo-bg-transparent ascwo-border-none hover:ascwo-bg-[#f9fafb] ascwo-cursor-pointer ascwo-flex ascwo-items-center ascwo-gap-3">
          <SettingsIcon class="ascwo-w-4 ascwo-h-4" /> {{ __('Manage', 'all-signs-customizer-for-woocommerce') }}
        </button>
        <button @click="goToPreview(selectedConfig)" class="ascwo-w-full ascwo-px-4 ascwo-py-2 ascwo-text-left ascwo-text-[13px] ascwo-bg-transparent ascwo-border-none hover:ascwo-bg-[#f9fafb] ascwo-cursor-pointer ascwo-flex ascwo-items-center ascwo-gap-3">
          <EyeIcon class="ascwo-w-4 ascwo-h-4" /> {{ __('Preview', 'all-signs-customizer-for-woocommerce') }}
        </button>
        <button @click="openEditModalFor(selectedConfig)" class="ascwo-w-full ascwo-px-4 ascwo-py-2 ascwo-text-left ascwo-text-[13px] ascwo-bg-transparent ascwo-border-none hover:ascwo-bg-[#f9fafb] ascwo-cursor-pointer ascwo-flex ascwo-items-center ascwo-gap-3">
          <Edit2Icon class="ascwo-w-4 ascwo-h-4" /> {{ __('Edit', 'all-signs-customizer-for-woocommerce') }}
        </button>
        <button @click="openDuplicateModalFor(selectedConfig)" class="ascwo-w-full ascwo-px-4 ascwo-py-2 ascwo-text-left ascwo-text-[13px] ascwo-bg-transparent ascwo-border-none hover:ascwo-bg-[#f9fafb] ascwo-cursor-pointer ascwo-flex ascwo-items-center ascwo-gap-3">
          <CopyIcon class="ascwo-w-4 ascwo-h-4" /> {{ __('Duplicate', 'all-signs-customizer-for-woocommerce') }}
        </button>
        <div class="ascwo-h-px ascwo-bg-[#f1f1f1] ascwo-my-1"></div>
        <button @click="selectDeleteConfig(selectedConfig.id, selectedConfig.name)" class="ascwo-w-full ascwo-px-4 ascwo-py-2 ascwo-text-left ascwo-text-[13px] ascwo-text-[#8e1f0b] ascwo-bg-transparent ascwo-border-none hover:ascwo-bg-[#fff1f0] ascwo-cursor-pointer ascwo-flex ascwo-items-center ascwo-gap-3">
          <Trash2Icon class="ascwo-w-4 ascwo-h-4" /> {{ __('Delete', 'all-signs-customizer-for-woocommerce') }}
        </button>
     </div>
  </div>

  <!-- Delete Confirmation Modal -->
  <div v-if="openModal" class="ascwo-fixed ascwo-inset-0 ascwo-z-[20000] ascwo-flex ascwo-items-center ascwo-justify-center">
    <div class="ascwo-absolute ascwo-inset-0 ascwo-bg-black/40" @click="openModal = false"></div>
    <div class="ascwo-relative ascwo-w-[min(400px,95vw)] ascwo-bg-white ascwo-rounded-2xl ascwo-shadow-2xl ascwo-p-6 ascwo-text-center">
      <div class="ascwo-w-14 ascwo-h-14 ascwo-bg-[#fff1f0] ascwo-text-[#8e1f0b] ascwo-rounded-full ascwo-flex ascwo-items-center ascwo-justify-center ascwo-mx-auto ascwo-mb-4">
        <Trash2Icon class="ascwo-w-7 ascwo-h-7" />
      </div>
      <h3 class="ascwo-text-[18px] ascwo-font-bold ascwo-text-[#1a1a1a] ascwo-mb-2">{{ __('Delete configuration?', 'all-signs-customizer-for-woocommerce') }}</h3>
      <p class="ascwo-text-[14px] ascwo-text-[#616161] ascwo-mb-6">{{ sprintf(__('Are you sure you want to delete "%s"?', 'all-signs-customizer-for-woocommerce'), deleteConfig.name) }}</p>
      <div class="ascwo-flex ascwo-gap-3">
        <button @click="openModal = false" class="ascwo-flex-1 ascwo-py-2.5 ascwo-bg-white ascwo-border ascwo-border-solid ascwo-border-[#c1c4c7] ascwo-rounded-xl ascwo-text-[13px] ascwo-font-bold ascwo-cursor-pointer">{{ __('Cancel', 'all-signs-customizer-for-woocommerce') }}</button>
        <button @click="delConfig" class="ascwo-flex-1 ascwo-py-2.5 ascwo-bg-[#8e1f0b] ascwo-text-white ascwo-border-none ascwo-rounded-xl ascwo-text-[13px] ascwo-font-bold ascwo-cursor-pointer">{{ __('Delete', 'all-signs-customizer-for-woocommerce') }}</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { useRoute, useRouter, RouterLink } from "vue-router";
import api from "@/admin/Api/api";
import toastMessage from "@/admin/utils/functions";
import { openAdminRouteWithReload } from "@/admin/utils/reload-route";
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
    configs.value = Array.isArray(res?.items) ? res.items : [];
    totalPages.value = Number(res?.totalPages || 0);
    totalConfigsFound.value = Number(res?.totalConfigsFound || 0);
    page.value = p;
  } finally { isFetching.value = false; }
};

const getInitials = (s) => {
  const words = String(s || 'AS').trim().replace(/\s+/g, ' ').split(' ').filter(Boolean);
  if (words.length < 2) {
    return String(words[0] || 'AS').slice(0, 2).toLowerCase();
  }
  return `${words[0].charAt(0)}${words[1].charAt(0)}`.toUpperCase();
};
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

  const materials = Array.isArray(config?.additionalOptions?.materials?.items)
    ? config.additionalOptions.materials.items
    : (Array.isArray(data?.materials) ? data.materials : []);
  const names = materials.map(item => normalizeValue(item?.label || item?.name || item?.materialKey));
  if (names.some(name => ['fabric', 'mesh', 'banner-vinyl'].includes(name))) return 'banners';
  if (names.some(name => ['paper', 'pvc', 'film', 'sticker-vinyl'].includes(name))) return 'stickers';
  if (names.some(name => ['acrylic', 'aluminium', 'aluminum', 'brass', 'eco-friendly', 'magnet', 'photo-paper', 'plastic', 'stainless-steel', 'vinyl', 'wood'].includes(name))) return 'signs-panels';
  if (config?.materialType || config?.id) return 'signs-panels';
  return '';
};
const getProductFamilyLabel = (config) => {
  const ncpcProductType = getNcpcProductType(config);
  if (ncpcProductType === 'neon') return __('Neon', 'all-signs-customizer-for-woocommerce');
  if (ncpcProductType === 'channel') return __('Channel', 'all-signs-customizer-for-woocommerce');

  const slug = getProductFamilySlug(config);
  if (slug === 'banners') return __('Banners', 'all-signs-customizer-for-woocommerce');
  if (slug === 'stickers') return __('Stickers', 'all-signs-customizer-for-woocommerce');
  if (slug === 'signs-panels') return __('Signs & Panels', 'all-signs-customizer-for-woocommerce');
  return __('Not set', 'all-signs-customizer-for-woocommerce');
};
const getNcpcProductType = (config) => {
  const data = getConfigData(config);
  const wrappedNcpc = parseMaybeJson(data?.ncpc) || {};
  const candidates = [
    config?.productType,
    data?.productType,
    wrappedNcpc?.productType
  ].map(normalizeValue);
  if (candidates.includes('neon')) return 'neon';
  if (candidates.includes('channel')) return 'channel';
  return '';
};
const getProductBadgeTone = (config) => {
  if (getNcpcProductType(config)) return 'attention';

  const data = getConfigData(config);
  const materialType = normalizeValue(config?.materialType || data?.materialType);
  if (materialType === 'simple') return 'info';
  return 'attention';
};

const isAdvancedConfig = (config) => {
  return false;
};

const goToMaterial = async (c) => {
  if (!c?.id || managingConfigId.value) return;
  showActionMenu.value = false;
  managingConfigId.value = c.id;
  try {
    await router.push({
      name: 'sizes',
      params: { configId: c.id },
    });
  } finally {
    managingConfigId.value = null;
  }
};
const goToPreview = (c) => {
  if (!c?.id) return;
  showActionMenu.value = false;
  openAdminRouteWithReload(`/configuration/${c.id}/preview`);
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
    toastMessage(__('Configuration deleted', 'all-signs-customizer-for-woocommerce'));
    openModal.value = false;
    fetchConfigs();
  } finally { isLoading.value = false; }
};

const openEditModalFor = (c) => {
  if (!c?.id) return;
  showActionMenu.value = false;
  router.push({ name: 'edit-configuration', params: { configId: c.id } });
};

onMounted(() => fetchConfigs(Number(route.query.page) || 1));
</script>

<style>
#ascwo-backend-app .ascwo-config-list {
  padding: 8px 24px 24px !important;
  background: rgba(241, 241, 241, 1) !important;
  color: rgba(48, 48, 48, 1);
  font-size: 13px;
  line-height: 20px;
  font-weight: 450;
}

#ascwo-backend-app .ascwo-config-list-header {
  min-height: 100% !important;
  margin-bottom: 10px !important;
  padding: 16px !important;
  border-color: transparent !important;
  border-radius: 12px !important;
  box-shadow: 0 1px 0 0 rgba(26, 26, 26, 0.07) !important;
}

#ascwo-backend-app .ascwo-config-list-header h1 {
  color: rgba(48, 48, 48, 1) !important;
  font-size: 14px !important;
  line-height: 20px !important;
  font-weight: 650 !important;
}

#ascwo-backend-app .ascwo-config-list-header .ascwo-primary-action,
#ascwo-backend-app .ascwo-config-list-header .ascwo-primary-action:hover,
#ascwo-backend-app .ascwo-config-list-header .ascwo-primary-action:focus,
#ascwo-backend-app .ascwo-config-list-header .ascwo-primary-action:active,
#ascwo-backend-app .ascwo-config-list-header .ascwo-primary-action:visited {
  min-height: 28px !important;
  min-width: 28px !important;
  height: 28px !important;
  box-sizing: border-box !important;
  padding: 3px 10px !important;
  border: 1px solid #016464 !important;
  border-radius: 7px !important;
  background: #016464 !important;
  color: #fff !important;
  -webkit-text-fill-color: #fff !important;
  font-size: 12px !important;
  line-height: 16px !important;
  font-weight: 650 !important;
  text-decoration: none !important;
  box-shadow:
    0 1px 0 0 rgba(255, 255, 255, 0.48) inset,
    -1px 0 0 0 rgba(255, 255, 255, 0.20) inset,
    1px 0 0 0 rgba(255, 255, 255, 0.20) inset,
    0 -1.5px 0 0 rgba(0, 0, 0, 0.25) inset !important;
}

#ascwo-backend-app .ascwo-config-list-header .ascwo-primary-action:hover,
#ascwo-backend-app .ascwo-config-list-header .ascwo-primary-action:focus {
  border-color: #004e4e !important;
  background: #004e4e !important;
}

#ascwo-backend-app .ascwo-config-list-header .ascwo-primary-action:active {
  border-color: #003b3b !important;
  background: #003b3b !important;
}

#ascwo-backend-app .ascwo-config-list-card {
  border-color: transparent !important;
  border-radius: 12px !important;
  box-shadow: 0 1px 0 0 rgba(26, 26, 26, 0.07) !important;
  padding: 0 !important;
  overflow: hidden !important;
}

#ascwo-backend-app .ascwo-config-list-card > div:not(.ascwo-config-list-pagination):not(.ascwo-config-list-table-wrap) {
  margin: 0 !important;
  padding: 0 !important;
}

#ascwo-backend-app .ascwo-config-list-table-wrap {
  padding: 16px 16px 0 !important;
  margin: 0 !important;
}

#ascwo-backend-app .ascwo-config-list-table {
  width: 100% !important;
  min-width: 100% !important;
  margin: 0 !important;
  border: 0 !important;
  border-collapse: collapse !important;
  border-spacing: 0 !important;
  outline: 0 !important;
  box-shadow: none !important;
}

#ascwo-backend-app .ascwo-config-list-table thead tr {
  background: rgba(247, 247, 247, 1) !important;
  border-bottom: 0 !important;
}

#ascwo-backend-app .ascwo-config-list-table th {
  padding: 6px !important;
  color: rgba(97, 97, 97, 1) !important;
  font-size: 12px !important;
  line-height: 20px !important;
  font-weight: 550 !important;
  white-space: nowrap !important;
  border: 0 !important;
  box-shadow: none !important;
}

#ascwo-backend-app .ascwo-config-list-table th:first-child {
  padding-left: 12px !important;
}

#ascwo-backend-app .ascwo-config-list-table th:last-child {
  padding-right: 12px !important;
}

#ascwo-backend-app .ascwo-config-list-table td {
  padding: 6px !important;
  vertical-align: middle !important;
  white-space: nowrap !important;
  border-top: 1px solid rgba(235, 235, 235, 1) !important;
  border-right: 0 !important;
  border-bottom: 0 !important;
  border-left: 0 !important;
  box-shadow: none !important;
}

#ascwo-backend-app .ascwo-config-list-table td:first-child {
  padding-left: 12px !important;
}

#ascwo-backend-app .ascwo-config-list-table td:last-child {
  padding-right: 12px !important;
}

#ascwo-backend-app .ascwo-config-list-table tbody tr {
  height: auto !important;
  background-color: rgba(255, 255, 255, 1) !important;
  border-top: 1px solid rgba(235, 235, 235, 1) !important;
  border-right: 0 !important;
  border-bottom: 0 !important;
  border-left: 0 !important;
  box-shadow: none !important;
}

#ascwo-backend-app .ascwo-config-list-table tbody tr:first-child {
  border-top-color: rgba(227, 227, 227, 1) !important;
}

#ascwo-backend-app .ascwo-config-list-table tbody tr td {
  border-top: 0 !important;
}

#ascwo-backend-app .ascwo-config-list-table tr,
#ascwo-backend-app .ascwo-config-list-table th,
#ascwo-backend-app .ascwo-config-list-table td {
  border-right-width: 0 !important;
  border-left-width: 0 !important;
}

#ascwo-backend-app .ascwo-config-list-table tbody tr:hover {
  background: rgba(247, 247, 247, 1) !important;
}

#ascwo-backend-app .ascwo-config-list-avatar {
  width: 34px !important;
  height: 34px !important;
  min-width: 34px !important;
}

#ascwo-backend-app .ascwo-config-list-avatar span {
  font-size: 12px !important;
  line-height: 20px !important;
  font-weight: 450 !important;
  color: rgba(48, 48, 48, 1) !important;
}

#ascwo-backend-app .ascwo-config-list-table .ascwo-gap-4 {
  gap: 10px !important;
}

#ascwo-backend-app .ascwo-config-list-table .ascwo-text-\[14px\] {
  font-size: 13px !important;
  line-height: 20px !important;
  font-weight: 450 !important;
}

#ascwo-backend-app .ascwo-config-list-table .ascwo-text-\[13px\] {
  font-size: 13px !important;
  line-height: 20px !important;
}

#ascwo-backend-app .ascwo-config-list-table span.ascwo-rounded-full {
  padding: 2px 8px !important;
  font-size: 11px !important;
  line-height: 16px !important;
  font-weight: 600 !important;
}

#ascwo-backend-app .ascwo-ui-badge {
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  min-height: 0 !important;
  padding: 2px 8px !important;
  border-radius: 8px !important;
  background: rgba(0, 0, 0, 0.06) !important;
  color: rgba(97, 97, 97, 1) !important;
  font-size: 13px !important;
  line-height: 20px !important;
  font-weight: 550 !important;
  white-space: nowrap !important;
}

#ascwo-backend-app .ascwo-ui-badge--info {
  background: rgba(224, 240, 255, 1) !important;
  color: rgba(0, 82, 124, 1) !important;
}

#ascwo-backend-app .ascwo-ui-badge--success {
  background: rgba(205, 254, 225, 1) !important;
  color: rgba(12, 81, 50, 1) !important;
}

#ascwo-backend-app .ascwo-ui-badge--attention {
  background: rgba(255, 239, 157, 1) !important;
  color: rgba(79, 71, 0, 1) !important;
}

#ascwo-backend-app .ascwo-config-list-table td button {
  min-width: 28px !important;
  width: 28px !important;
  min-height: 28px !important;
  height: 28px !important;
  padding: 6px !important;
  border-radius: 8px !important;
  background: rgba(255, 255, 255, 1) !important;
  box-shadow:
    0 -1px 0 #b5b5b5 inset,
    -1px 0 0 #e3e3e3 inset,
    1px 0 0 #e3e3e3 inset,
    0 1px 0 #e3e3e3 inset !important;
}

#ascwo-backend-app .ascwo-config-list-table td button svg {
  width: 20px !important;
  height: 20px !important;
}

#ascwo-backend-app .ascwo-config-list-pagination {
  padding: 16px !important;
  border-top: 1px solid rgba(235, 235, 235, 1) !important;
}

#ascwo-backend-app .ascwo-config-list-pagination > div {
  padding: 0 !important;
  gap: 0 !important;
  border-radius: 8px !important;
  background: rgba(227, 227, 227, 1) !important;
  overflow: hidden !important;
}

#ascwo-backend-app .ascwo-config-list-pagination button {
  min-width: 24px !important;
  width: 24px !important;
  min-height: 24px !important;
  height: 24px !important;
  border-radius: 0 !important;
  background: rgba(247, 247, 247, 1) !important;
  box-shadow: none !important;
}

#ascwo-backend-app .ascwo-config-list-pagination button + button {
  border-left: 1px solid rgba(235, 235, 235, 1) !important;
}

#ascwo-backend-app .ascwo-config-list-pagination svg {
  width: 16px !important;
  height: 16px !important;
}

#ascwo-backend-app .ascwo-config-list .ascwo-p-20 {
  padding: 40px !important;
}

#ascwo-backend-app .ascwo-config-list .ascwo-w-16.ascwo-h-16 {
  width: 48px !important;
  height: 48px !important;
}

#ascwo-backend-app .ascwo-config-list .ascwo-w-16.ascwo-h-16 svg {
  width: 24px !important;
  height: 24px !important;
}
</style>
