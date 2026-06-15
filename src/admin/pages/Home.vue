<template>
  <div class="ascwo-dashboard">
    <!-- Top Action Bar -->
    <div class="ascwo-dashboard-topbar ascwo-flex ascwo-justify-end ascwo-mb-5">
      <RouterLink
        to="/configuration/create"
        class="ascwo-primary-action ascwo-dashboard-primary-action">
        {{ __('Create configuration', 'all-signs-customizer-for-woocommerce-pro') }}
      </RouterLink>
    </div>

    <!-- Info Banners -->
    <div class="ascwo-dashboard-banners ascwo-grid md:ascwo-grid-cols-2 ascwo-gap-4 ascwo-mb-4">
      <div class="ascwo-dashboard-card ascwo-dashboard-banner ascwo-bg-white ascwo-rounded-xl ascwo-border ascwo-border-solid ascwo-border-[#e1e3e5] ascwo-p-4 ascwo-flex ascwo-items-center ascwo-shadow-sm">
        <div class="ascwo-dashboard-banner-icon ascwo-bg-[#91d0ff] ascwo-p-1.5 ascwo-rounded-md ascwo-mr-3">
          <InfoIcon class="ascwo-w-4 ascwo-h-4 ascwo-text-white" />
        </div>
        <div class="ascwo-dashboard-banner-text ascwo-text-[13px]">
          {{ __('Click', 'all-signs-customizer-for-woocommerce-pro') }}
          <a href="#" @click.prevent="openInstallConfigModal">{{ __('here to install configuration screen', 'all-signs-customizer-for-woocommerce-pro') }}</a>
          {{ __(' in your online store', 'all-signs-customizer-for-woocommerce-pro') }}
        </div>
      </div>
      <div class="ascwo-dashboard-card ascwo-dashboard-banner ascwo-bg-white ascwo-rounded-xl ascwo-border ascwo-border-solid ascwo-border-[#e1e3e5] ascwo-p-4 ascwo-flex ascwo-items-center ascwo-shadow-sm">
        <div class="ascwo-dashboard-banner-icon ascwo-bg-[#91d0ff] ascwo-p-1.5 ascwo-rounded-md ascwo-mr-3">
          <InfoIcon class="ascwo-w-4 ascwo-h-4 ascwo-text-white" />
        </div>
        <div class="ascwo-dashboard-banner-text ascwo-text-[13px]">
          {{ __('Click', 'all-signs-customizer-for-woocommerce-pro') }}
          <a href="#" @click.prevent="openInstallConfigModal">{{ __('here to install configuration screen', 'all-signs-customizer-for-woocommerce-pro') }}</a>
          {{ __(' to your online store', 'all-signs-customizer-for-woocommerce-pro') }}
        </div>
      </div>
    </div>

    <!-- Main Content Grid -->
    <div class="ascwo-dashboard-layout ascwo-grid lg:ascwo-grid-cols-[1fr_340px] ascwo-gap-5">
      <div class="ascwo-space-y-4">
        <!-- KPI Section -->
        <div class="ascwo-dashboard-card ascwo-dashboard-kpis ascwo-bg-white ascwo-rounded-xl ascwo-border ascwo-border-solid ascwo-border-[#e1e3e5] ascwo-p-6 ascwo-flex ascwo-justify-between ascwo-shadow-sm">
          <div v-for="c in kpis" :key="c.key" class="ascwo-dashboard-kpi ascwo-flex-1">
            <div class="ascwo-dashboard-kpi-value ascwo-text-[32px] ascwo-font-semibold ascwo-text-[#1a1a1a]">{{ c.value }}</div>
            <div class="ascwo-dashboard-kpi-label ascwo-text-[14px] ascwo-text-[#616161]">{{ c.label }}</div>
          </div>
        </div>

        <!-- Main Menu Section -->
        <div class="ascwo-dashboard-main-menu ascwo-bg-[#dce6e6] ascwo-rounded-xl ascwo-border ascwo-border-solid ascwo-border-[#c9dada] ascwo-overflow-hidden ascwo-shadow-sm">
          <div class="ascwo-px-6 ascwo-py-4 ascwo-flex ascwo-items-center ascwo-gap-2">
            <LayoutGridIcon class="ascwo-w-5 ascwo-h-5 ascwo-text-[#4a4a4a]" />
            <span class="ascwo-text-[15px] ascwo-font-bold ascwo-text-[#1a1a1a]">{{ __('Main Menu', 'all-signs-customizer-for-woocommerce-pro') }}</span>
          </div>
          <div class="ascwo-px-6 ascwo-pb-6 ascwo-space-y-3">
            <RouterLink v-for="item in mainMenu" :key="item.to" :to="item.to"
              class="ascwo-flex ascwo-items-center ascwo-justify-between ascwo-p-3 ascwo-bg-transparent hover:ascwo-bg-[#c9dada] ascwo-rounded-lg ascwo-transition-colors ascwo-no-underline ascwo-group">
              <div class="ascwo-flex ascwo-items-center ascwo-gap-4">
                <span class="ascwo-dashboard-menu-icon ascwo-w-12 ascwo-h-12 ascwo-rounded-xl ascwo-bg-white ascwo-flex ascwo-items-center ascwo-justify-center ascwo-shadow-sm">
                  <component :is="item.icon" class="ascwo-w-6 ascwo-h-6 ascwo-text-[#4a4a4a]" />
                </span>
                <div>
                  <div class="ascwo-dashboard-menu-title ascwo-text-[15px] ascwo-font-bold ascwo-text-[#1a1a1a]">{{ item.title }}</div>
                  <div class="ascwo-dashboard-menu-desc ascwo-text-[13px] ascwo-text-[#616161]">{{ item.desc }}</div>
                </div>
              </div>
              <ChevronRightIcon class="ascwo-w-5 ascwo-h-5 ascwo-text-[#4a4a4a] group-hover:ascwo-translate-x-1 ascwo-transition-transform" />
            </RouterLink>
          </div>
        </div>

        <!-- Learning Center -->
        <div class="ascwo-dashboard-card ascwo-bg-white ascwo-rounded-xl ascwo-border ascwo-border-solid ascwo-border-[#e1e3e5] ascwo-shadow-sm">
          <div class="ascwo-px-6 ascwo-py-4 ascwo-border-b ascwo-border-solid ascwo-border-[#f1f1f1] ascwo-flex ascwo-items-center ascwo-gap-2">
            <ExternalLinkIcon class="ascwo-w-4 ascwo-h-4 ascwo-text-[#4a4a4a]" />
            <div class="ascwo-text-[15px] ascwo-font-bold ascwo-text-[#1a1a1a]">{{ __('Learning center', 'all-signs-customizer-for-woocommerce-pro') }}</div>
          </div>
          <div class="ascwo-p-6 ascwo-grid md:ascwo-grid-cols-2 ascwo-gap-6">
            <div class="ascwo-dashboard-inner-card ascwo-rounded-xl ascwo-border ascwo-border-solid ascwo-border-[#e1e3e5] ascwo-p-5">
              <div class="ascwo-text-[14px] ascwo-font-bold ascwo-text-[#1a1a1a]">{{ __('Browse demo', 'all-signs-customizer-for-woocommerce-pro') }}</div>
              <p class="ascwo-text-[13px] ascwo-text-[#616161] ascwo-mt-2">
                {{ __('Explore live examples of sign lastconfigs in action.', 'all-signs-customizer-for-woocommerce-pro') }}
              </p>
              <div class="ascwo-mt-4 ascwo-flex ascwo-items-center ascwo-gap-3">
                <a href="https://demos.signsdesigner.us/aso-live-demo/" target="_blank" rel="noopener"
                  class="ascwo-inline-flex ascwo-items-center ascwo-px-3 ascwo-py-1.5 ascwo-bg-white ascwo-border ascwo-border-solid ascwo-border-[#c1c4c7] ascwo-rounded-md ascwo-text-[13px] ascwo-font-bold ascwo-text-[#1a1a1a] ascwo-no-underline hover:ascwo-bg-[#f6f6f7]">
                  {{ __('View demos', 'all-signs-customizer-for-woocommerce-pro') }}
                </a>
                <span class="ascwo-text-[12px] ascwo-text-[#616161]">{{ __('The password to access to demo is: aso', 'all-signs-customizer-for-woocommerce-pro') }}</span>
              </div>
            </div>

            <div class="ascwo-dashboard-inner-card ascwo-rounded-xl ascwo-border ascwo-border-solid ascwo-border-[#e1e3e5] ascwo-p-5">
              <div class="ascwo-text-[14px] ascwo-font-bold ascwo-text-[#1a1a1a]">{{ __('Documentation', 'all-signs-customizer-for-woocommerce-pro') }}</div>
              <p class="ascwo-text-[13px] ascwo-text-[#616161] ascwo-mt-2">
                {{ __('Explore the app documentation', 'all-signs-customizer-for-woocommerce-pro') }}
              </p>
              <div class="ascwo-mt-4">
                <a href="https://docs.signsdesigner.us/docs/aso-wp-documentation/" target="_blank" rel="noopener"
                  class="ascwo-inline-flex ascwo-items-center ascwo-px-3 ascwo-py-1.5 ascwo-bg-white ascwo-border ascwo-border-solid ascwo-border-[#c1c4c7] ascwo-rounded-md ascwo-text-[13px] ascwo-font-bold ascwo-text-[#1a1a1a] ascwo-no-underline hover:ascwo-bg-[#f6f6f7]">
                  {{ __('View docs', 'all-signs-customizer-for-woocommerce-pro') }}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Sidebar -->
      <div class="ascwo-space-y-4">
        <!-- Recent Configurations -->
        <div class="ascwo-dashboard-card ascwo-dashboard-side-card">
          <div class="ascwo-dashboard-side-title">
            {{ __('Recent Configurations', 'all-signs-customizer-for-woocommerce-pro') }}
          </div>
          <div class="ascwo-dashboard-side-content">
            <div class="ascwo-text-[13px] ascwo-text-[#616161]" v-if="recentConfigs.length === 0">
              {{ __('No recent configurations yet.', 'all-signs-customizer-for-woocommerce-pro') }}
            </div>
            <ul v-else class="ascwo-space-y-3 ascwo-m-0 ascwo-p-0 ascwo-list-none">
              <li v-for="rc in recentConfigs" :key="rc.id" class="ascwo-flex ascwo-justify-between ascwo-items-center ascwo-w-full">
                <div @click="goToMaterial(rc)" class="ascwo-cursor-pointer ascwo-w-full">
                  <div class="ascwo-text-[11px] ascwo-text-[#616161] ascwo-mb-1">{{ __('ID', 'all-signs-customizer-for-woocommerce-pro') }} {{ rc.id }}</div>
                  <div class="ascwo-flex ascwo-justify-between ascwo-items-center">
                    <div class="ascwo-text-[13px] ascwo-font-bold ascwo-text-[#1a1a1a] ascwo-truncate ascwo-max-w-[150px]">{{ rc.name }}</div>
                    <div class="ascwo-ui-info-badge">{{ getProductFamilyLabel(rc) }}</div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <!-- Share Feedback -->
        <div class="ascwo-dashboard-card ascwo-dashboard-side-card">
          <div class="ascwo-dashboard-side-title">
            {{ __('Share your feedback', 'all-signs-customizer-for-woocommerce-pro') }}
          </div>
          <div class="ascwo-dashboard-side-content ascwo-space-y-4">
            <div class="ascwo-text-[13px] ascwo-text-[#616161]">{{ __('How would you describe your experience using Sign Customiser?', 'all-signs-customizer-for-woocommerce-pro') }}</div>
            <div class="ascwo-flex ascwo-gap-2">
              <a href="https://signsdesigner.us/all-signs-customizer-product/#section-review" target="_blank" rel="noopener"
                class="ascwo-flex-1 ascwo-inline-flex ascwo-items-center ascwo-justify-center ascwo-gap-2 ascwo-px-3 ascwo-py-1.5 ascwo-bg-white ascwo-border ascwo-border-solid ascwo-border-[#c1c4c7] ascwo-rounded-md ascwo-text-[13px] ascwo-font-bold ascwo-text-[#1a1a1a] ascwo-no-underline hover:ascwo-bg-[#f6f6f7]">
                <ThumbsUpIcon class="ascwo-w-4 ascwo-h-4" />
                {{ __('Yes', 'all-signs-customizer-for-woocommerce-pro') }}
              </a>
              <a href="https://signsdesigner.us/contact" target="_blank" rel="noopener"
                class="ascwo-flex-1 ascwo-inline-flex ascwo-items-center ascwo-justify-center ascwo-gap-2 ascwo-px-3 ascwo-py-1.5 ascwo-bg-white ascwo-border ascwo-border-solid ascwo-border-[#c1c4c7] ascwo-rounded-md ascwo-text-[13px] ascwo-font-bold ascwo-text-[#1a1a1a] ascwo-no-underline hover:ascwo-bg-[#f6f6f7]">
                <ThumbsDownIcon class="ascwo-w-4 ascwo-h-4" />
                {{ __('No', 'all-signs-customizer-for-woocommerce-pro') }}
              </a>
            </div>
          </div>
        </div>

        <!-- Useful Links -->
        <div class="ascwo-dashboard-card ascwo-dashboard-side-card">
          <div class="ascwo-dashboard-side-title">
            {{ __('Useful Links', 'all-signs-customizer-for-woocommerce-pro') }}
          </div>
          <div class="ascwo-dashboard-side-content">
            <div class="ascwo-flex ascwo-flex-wrap ascwo-gap-2">
              <component
                :is="link.action === 'chat' ? 'button' : 'a'"
                v-for="link in usefulLinks"
                :key="link.text"
                :href="link.action === 'chat' ? undefined : link.url"
                :target="link.action === 'chat' ? undefined : '_blank'"
                :rel="link.action === 'chat' ? undefined : 'noopener'"
                :type="link.action === 'chat' ? 'button' : undefined"
                class="ascwo-dashboard-useful-link"
                @click="handleUsefulLinkClick(link, $event)">
                <component :is="link.icon" class="ascwo-w-3.5 ascwo-h-3.5" />
                {{ link.text }}
              </component>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Modals -->
  <div v-if="showInstallConfigModal" class="ascwo-fixed ascwo-inset-0 ascwo-z-[1000] ascwo-flex ascwo-items-center ascwo-justify-center">
    <div class="ascwo-absolute ascwo-inset-0 ascwo-bg-black ascwo-bg-opacity-40" @click="closeInstallModals"></div>
    <div class="ascwo-relative ascwo-w-[min(820px,95vw)] ascwo-max-h-[calc(100vh-5.75rem)] ascwo-bg-white ascwo-rounded-2xl ascwo-shadow-xl ascwo-overflow-hidden ascwo-flex ascwo-flex-col">
      <div class="ascwo-flex ascwo-items-center ascwo-justify-between ascwo-px-5 ascwo-py-3 ascwo-border-b ascwo-border-[#e5e7eb]">
        <div class="ascwo-text-[14px] ascwo-font-semibold">{{ __('Install the configurator screen', 'all-signs-customizer-for-woocommerce-pro') }}</div>
        <button class="ascwo-p-1 ascwo-rounded-md hover:ascwo-bg-[#f3f4f6] ascwo-border-0 ascwo-bg-transparent ascwo-cursor-pointer" @click="closeInstallModals">✕</button>
      </div>
      <div class="ascwo-flex-1 ascwo-min-h-0 ascwo-p-5 ascwo-space-y-4 ascwo-overflow-y-auto">
        <div class="ascwo-text-[13px] ascwo-text-gray-700">{{ __('You can display the configurator in 2 ways, and list configurable products with a shortcode:', 'all-signs-customizer-for-woocommerce-pro') }}</div>
          <div class="ascwo-rounded-xl ascwo-border ascwo-border-[#e5e7eb] ascwo-bg-[#fafafa] ascwo-p-4">
            <div class="ascwo-text-[13px] ascwo-font-semibold ascwo-text-[#303030]">{{ __('Option 1 — Buttons on product pages', 'all-signs-customizer-for-woocommerce-pro') }}</div>
            <div class="ascwo-mt-2 ascwo-text-[13px] ascwo-text-gray-700 ascwo-space-y-1">
              <span>{{ __('1) If the product is not attached to a configuration yet, attach it first.', 'all-signs-customizer-for-woocommerce-pro') }}</span>
              <span>{{ __('2) On the storefront, customers will see the customization buttons on that product page.', 'all-signs-customizer-for-woocommerce-pro') }}</span>
            </div>
          </div>
          <div class="ascwo-rounded-xl ascwo-border ascwo-border-[#e5e7eb] ascwo-bg-[#fafafa] ascwo-p-4">
            <div class="ascwo-text-[13px] ascwo-font-semibold ascwo-text-[#303030]">{{ __('Option 2 — Shortcode', 'all-signs-customizer-for-woocommerce-pro') }}</div>
            <div class="ascwo-mt-2 ascwo-text-[13px] ascwo-text-gray-700">{{ __('Add the shortcode inside any WordPress page:', 'all-signs-customizer-for-woocommerce-pro') }}</div>
            <div class="ascwo-mt-2 ascwo-rounded-lg ascwo-bg-white ascwo-border ascwo-border-[#e5e7eb] ascwo-p-3 ascwo-flex ascwo-items-start ascwo-justify-between">
              <code class="ascwo-text-[12px]">[ascwo-configurator productid="123"]</code>
              <button class="ascwo-px-2 ascwo-py-1 ascwo-text-[12px] ascwo-bg-white ascwo-border ascwo-border-solid ascwo-border-[#c1c4c7] ascwo-rounded ascwo-cursor-pointer" @click="copySnippet('[ascwo-configurator productid=&quot;123&quot;]', 'cfg-basic')">
                {{ copiedKey === 'cfg-basic' ? __('Copied', 'all-signs-customizer-for-woocommerce-pro') : __('Copy', 'all-signs-customizer-for-woocommerce-pro') }}
              </button>
            </div>
          </div>
      </div>
      <div class="ascwo-flex ascwo-justify-end ascwo-px-5 ascwo-py-3 ascwo-border-t">
        <button class="ascwo-px-4 ascwo-py-1.5 ascwo-text-white ascwo-bg-[#006e52] ascwo-rounded-md ascwo-border-0 ascwo-cursor-pointer" @click="closeInstallModals">{{ __('Got it', 'all-signs-customizer-for-woocommerce-pro') }}</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { RouterLink, useRouter } from 'vue-router';
import { onMounted, ref } from 'vue'
import api from '@/admin/Api/api'
import { __, sprintf } from "@wordpress/i18n";
import { Crisp } from "crisp-sdk-web";
import {
  InfoIcon,
  LayoutGridIcon,
  ChevronRightIcon,
  ExternalLinkIcon,
  ThumbsUpIcon,
  ThumbsDownIcon,
  SettingsIcon,
  LibraryIcon,
  PlusCircleIcon,
  HelpCircleIcon,
  CreditCardIcon,
  MessageCircleIcon
} from 'lucide-vue-next';

/** KPI values */
const kpis = ref([
  { key: 'items', label: __('Products Created', 'all-signs-customizer-for-woocommerce-pro'), value: 0 },
  { key: 'rate', label: __('Conversion Rate', 'all-signs-customizer-for-woocommerce-pro'), value: '0%' },
  { key: 'orders', label: __('Orders', 'all-signs-customizer-for-woocommerce-pro'), value: 0 },
])

const kpisLoading = ref(false)
const recentConfigs = ref([])
const showInstallConfigModal = ref(false)
const copiedKey = ref(null)
const router = useRouter();

const goToMaterial = (config) => {
    router.push({ name: 'sizes', params: { configId: config.id } });
};

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
  const slug = getProductFamilySlug(config);
  if (slug === 'banners') return __('Banners', 'all-signs-customizer-for-woocommerce-pro');
  if (slug === 'stickers') return __('Stickers', 'all-signs-customizer-for-woocommerce-pro');
  if (slug === 'signs-panels') return __('Signs & Panels', 'all-signs-customizer-for-woocommerce-pro');
  return __('Not set', 'all-signs-customizer-for-woocommerce-pro');
};

const openInstallConfigModal = () => { showInstallConfigModal.value = true }
const closeInstallModals = () => {
  showInstallConfigModal.value = false
}

const copySnippet = async (text, key) => {
  try {
    const plain = String(text).replace(/&quot;/g, '"');
    if (navigator?.clipboard?.writeText) {
      await navigator.clipboard.writeText(plain)
      copiedKey.value = key
      setTimeout(() => { copiedKey.value = null }, 2000)
    }
  } catch (_) {}
}

const openSupportChat = (maxAttempts = 10, attempt = 0) => {
  const crispReady = Boolean(window.$crisp?.is);

  if (crispReady) {
    try {
      Crisp.setHideOnAway(false);
      window.ascwoUpdateCrispPosition?.();
      Crisp.chat.show();
      Crisp.chat.open();
      window.$crisp?.push?.(["do", "chat:show"]);
      window.$crisp?.push?.(["do", "chat:open"]);
    } catch (_) {}
    return;
  }

  if (attempt < maxAttempts - 1) {
    window.setTimeout(() => openSupportChat(maxAttempts, attempt + 1), 200);
  }
};

const handleUsefulLinkClick = (link, event) => {
  if (link.action !== 'chat') return;
  event.preventDefault();
  openSupportChat();
};

onMounted(async () => {
  try {
    kpisLoading.value = true
    const stats = await api.getHomeStats()
    kpis.value = [
      { key: 'items', label: __('Products Created', 'all-signs-customizer-for-woocommerce-pro'), value: stats?.configured_items ?? 0 },
      { key: 'rate', label: __('Conversion Rate', 'all-signs-customizer-for-woocommerce-pro'), value: `${stats?.configured_rate ?? 0}%` },
      { key: 'orders', label: __('Orders', 'all-signs-customizer-for-woocommerce-pro'), value: stats?.configured_orders ?? 0 },
    ]
  } finally {
    kpisLoading.value = false
  }

  try {
    const res = await api.getConfigs('?per_page=4&order=DESC&page=1')
    recentConfigs.value = Array.isArray(res?.items) ? res.items.slice(0, 4) : []
  } catch(_) {}
})

const mainMenu = [
  {
    to: '/configuration',
    title: __('Configurations', 'all-signs-customizer-for-woocommerce-pro'),
    desc: __('Manage your sign configurations', 'all-signs-customizer-for-woocommerce-pro'),
    icon: LayoutGridIcon
  },
  {
    to: '/settings/output',
    title: __('Global Settings', 'all-signs-customizer-for-woocommerce-pro'),
    desc: __('Manage your sign global setting', 'all-signs-customizer-for-woocommerce-pro'),
    icon: SettingsIcon
  },
  {
    to: '/manage-font',
    title: __('Library', 'all-signs-customizer-for-woocommerce-pro'),
    desc: __('Manage your sign library', 'all-signs-customizer-for-woocommerce-pro'),
    icon: LibraryIcon
  }
]

const usefulLinks = [
  { text: __('Request a feature', 'all-signs-customizer-for-woocommerce-pro'), url: 'https://signsdesigner.us/all-signs-customizer-product/#section-review', icon: PlusCircleIcon },
  { text: __('Learning Center', 'all-signs-customizer-for-woocommerce-pro'), url: 'https://docs.signsdesigner.us/docs/aso-wp-documentation/', icon: HelpCircleIcon },
  { text: __('Pricing', 'all-signs-customizer-for-woocommerce-pro'), url: 'https://signsdesigner.us/pricing-all-signs-customizer/', icon: CreditCardIcon },
  { text: __('Get in touch', 'all-signs-customizer-for-woocommerce-pro'), url: '', icon: MessageCircleIcon, action: 'chat' },
]
</script>

<style>
#ascwo-backend-app .ascwo-dashboard {
  min-height: 100vh;
  padding: 30px 30px 18px;
  background: #f3f3f3;
  color: #303030;
  font-size: 14px;
  line-height: 20px;
}

#ascwo-backend-app .ascwo-dashboard-topbar {
  display: flex;
  justify-content: flex-end;
  margin: 0 0 18px;
}

#ascwo-backend-app .ascwo-dashboard-primary-action,
#ascwo-backend-app .ascwo-dashboard-primary-action:hover,
#ascwo-backend-app .ascwo-dashboard-primary-action:focus,
#ascwo-backend-app .ascwo-dashboard-primary-action:active,
#ascwo-backend-app .ascwo-dashboard-primary-action:visited {
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  min-height: 28px !important;
  height: 28px !important;
  box-sizing: border-box !important;
  padding: 3px 10px !important;
  border: 1px solid #016464 !important;
  border-radius: 7px !important;
  background: #016464 !important;
  color: #fff !important;
  -webkit-text-fill-color: #fff !important;
  font-size: 12px !important;
  font-weight: 650 !important;
  line-height: 16px !important;
  text-decoration: none !important;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.05), inset 0 -1px 0 rgba(0, 0, 0, 0.2) !important;
}

#ascwo-backend-app .ascwo-dashboard-primary-action:hover {
  border-color: #004e4e !important;
  background: #004e4e !important;
}

#ascwo-backend-app .ascwo-dashboard-primary-action:active {
  border-color: #003b3b !important;
  background: #003b3b !important;
}

#ascwo-backend-app .ascwo-dashboard-primary-action:focus {
  outline: none !important;
  box-shadow:
    0 0 0 1px #ffffff,
    0 0 0 3px rgba(1, 100, 100, 0.35),
    0 1px 0 rgba(0, 0, 0, 0.05),
    inset 0 -1px 0 rgba(0, 0, 0, 0.2) !important;
}

#ascwo-backend-app .ascwo-dashboard-useful-link,
#ascwo-backend-app .ascwo-dashboard-useful-link:hover,
#ascwo-backend-app .ascwo-dashboard-useful-link:focus,
#ascwo-backend-app .ascwo-dashboard-useful-link:active,
#ascwo-backend-app .ascwo-dashboard-useful-link:visited {
  display: inline-flex !important;
  align-items: center !important;
  gap: 8px !important;
  padding: 6px 12px !important;
  background: #ffffff !important;
  border: 1px solid #c1c4c7 !important;
  border-radius: 999px !important;
  color: #1a1a1a !important;
  -webkit-text-fill-color: #1a1a1a !important;
  font-size: 12px !important;
  line-height: 16px !important;
  font-weight: 500 !important;
  text-decoration: none !important;
  cursor: pointer !important;
}

#ascwo-backend-app .ascwo-dashboard-useful-link:hover {
  background: #f6f6f7 !important;
}

#ascwo-backend-app .ascwo-ui-info-badge {
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  min-height: 20px !important;
  padding: 2px 8px !important;
  border-radius: 999px !important;
  background: #eaf5ff !important;
  color: #0b4f8a !important;
  font-size: 12px !important;
  line-height: 16px !important;
  font-weight: 400 !important;
  white-space: nowrap !important;
}

#ascwo-backend-app .ascwo-dashboard-card {
  background: #fff !important;
  border: 1px solid #dde5ec !important;
  border-radius: 12px !important;
  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.05) !important;
}

#ascwo-backend-app .ascwo-dashboard-banners {
  display: grid !important;
  grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
  gap: 10px !important;
  margin: 0 0 10px !important;
}

#ascwo-backend-app .ascwo-dashboard-banner {
  display: flex !important;
  align-items: center !important;
  min-height: 46px !important;
  height: 46px !important;
  padding: 0 12px !important;
}

#ascwo-backend-app .ascwo-dashboard-banner-icon {
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  width: 28px !important;
  height: 28px !important;
  min-width: 28px !important;
  margin-right: 9px !important;
  padding: 0 !important;
  border-radius: 8px !important;
  background: #91d0ff !important;
}

#ascwo-backend-app .ascwo-dashboard-banner-text,
#ascwo-backend-app .ascwo-dashboard-banner-text a {
  color: #303030 !important;
  font-size: 13px !important;
  line-height: 20px !important;
}

#ascwo-backend-app .ascwo-dashboard-banner-text a {
  margin: 0 3px !important;
  text-decoration: underline !important;
  text-underline-offset: 2px !important;
}

#ascwo-backend-app .ascwo-dashboard-layout {
  display: grid !important;
  grid-template-columns: minmax(0, 1fr) 340px !important;
  gap: 10px !important;
}

#ascwo-backend-app .ascwo-dashboard-layout > .ascwo-space-y-4 {
  display: flex !important;
  flex-direction: column !important;
  gap: 10px !important;
}

#ascwo-backend-app .ascwo-dashboard-kpis {
  display: grid !important;
  grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
  align-items: center !important;
  height: 92px !important;
  min-height: 92px !important;
  padding: 16px 32px !important;
}

#ascwo-backend-app .ascwo-dashboard-kpi-value {
  color: #303030 !important;
  font-size: 24px !important;
  font-weight: 700 !important;
  line-height: 28px !important;
}

#ascwo-backend-app .ascwo-dashboard-kpi-label {
  color: #303030 !important;
  font-size: 14px !important;
  line-height: 20px !important;
}

#ascwo-backend-app .ascwo-dashboard-main-menu {
  min-height: 0;
  padding: 7px !important;
  border: 0 !important;
  border-radius: 12px !important;
  background: rgba(1, 100, 100, 0.15) !important;
  box-shadow: none !important;
}

#ascwo-backend-app .ascwo-dashboard-main-menu > div:first-child {
  padding: 10px 16px 8px !important;
}

#ascwo-backend-app .ascwo-dashboard-main-menu > div:last-child {
  padding: 0 12px 10px !important;
}

#ascwo-backend-app .ascwo-dashboard-main-menu > div:last-child > :not([hidden]) ~ :not([hidden]) {
  margin-top: 0 !important;
}

#ascwo-backend-app .ascwo-dashboard-main-menu a {
  min-height: 58px !important;
  padding: 7px !important;
  border-radius: 8px !important;
  background: transparent !important;
  text-decoration: none !important;
}

#ascwo-backend-app .ascwo-dashboard-main-menu a + a {
  border-top: 1px solid rgba(255, 255, 255, 0.65) !important;
}

#ascwo-backend-app .ascwo-dashboard-main-menu a:hover {
  background: transparent !important;
}

#ascwo-backend-app .ascwo-dashboard-menu-icon {
  width: 40px !important;
  height: 40px !important;
  min-width: 40px !important;
  border-radius: 8px !important;
}

#ascwo-backend-app .ascwo-dashboard-menu-icon svg {
  width: 18px !important;
  height: 18px !important;
}

#ascwo-backend-app .ascwo-dashboard-menu-title {
  color: #303030 !important;
  font-size: 14px !important;
  font-weight: 700 !important;
  line-height: 20px !important;
}

#ascwo-backend-app .ascwo-dashboard-menu-desc {
  color: #303030 !important;
  font-size: 14px !important;
  line-height: 20px !important;
}

#ascwo-backend-app .ascwo-dashboard-side-card {
  min-height: 104px !important;
  padding: 20px 20px 16px !important;
}

#ascwo-backend-app .ascwo-dashboard-side-title {
  color: #303030 !important;
  font-size: 14px !important;
  font-weight: 700 !important;
  line-height: 20px !important;
  margin: 0 0 12px !important;
}

#ascwo-backend-app .ascwo-dashboard-side-content {
  padding: 0 !important;
}

#ascwo-backend-app .ascwo-dashboard-side-card .ascwo-text-\[13px\] {
  font-size: 13px !important;
  line-height: 19px !important;
}

#ascwo-backend-app .ascwo-dashboard-inner-card {
  border-color: #dde5ec !important;
  border-radius: 12px !important;
  padding: 20px !important;
}

@media (max-width: 1100px) {
  #ascwo-backend-app .ascwo-dashboard-layout,
  #ascwo-backend-app .ascwo-dashboard-banners {
    grid-template-columns: 1fr !important;
  }
}
</style>
