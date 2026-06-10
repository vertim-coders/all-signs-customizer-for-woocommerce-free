<template>
  <div class="asowp-dashboard">
    <!-- Top Action Bar -->
    <div class="asowp-dashboard-topbar asowp-flex asowp-justify-end asowp-mb-5">
      <RouterLink
        to="/configuration/create"
        class="asowp-primary-action asowp-dashboard-primary-action">
        {{ __('Create configuration', 'all-signs-options-pro') }}
      </RouterLink>
    </div>

    <!-- Info Banners -->
    <div class="asowp-dashboard-banners asowp-grid md:asowp-grid-cols-2 asowp-gap-4 asowp-mb-4">
      <div class="asowp-dashboard-card asowp-dashboard-banner asowp-bg-white asowp-rounded-xl asowp-border asowp-border-solid asowp-border-[#e1e3e5] asowp-p-4 asowp-flex asowp-items-center asowp-shadow-sm">
        <div class="asowp-dashboard-banner-icon asowp-bg-[#91d0ff] asowp-p-1.5 asowp-rounded-md asowp-mr-3">
          <InfoIcon class="asowp-w-4 asowp-h-4 asowp-text-white" />
        </div>
        <div class="asowp-dashboard-banner-text asowp-text-[13px]">
          {{ __('Click', 'all-signs-options-pro') }}
          <a href="#" @click.prevent="openInstallConfigModal">{{ __('here to install configuration screen', 'all-signs-options-pro') }}</a>
          {{ __(' in your online store', 'all-signs-options-pro') }}
        </div>
      </div>
      <div class="asowp-dashboard-card asowp-dashboard-banner asowp-bg-white asowp-rounded-xl asowp-border asowp-border-solid asowp-border-[#e1e3e5] asowp-p-4 asowp-flex asowp-items-center asowp-shadow-sm">
        <div class="asowp-dashboard-banner-icon asowp-bg-[#91d0ff] asowp-p-1.5 asowp-rounded-md asowp-mr-3">
          <InfoIcon class="asowp-w-4 asowp-h-4 asowp-text-white" />
        </div>
        <div class="asowp-dashboard-banner-text asowp-text-[13px]">
          {{ __('Click', 'all-signs-options-pro') }}
          <a href="#" @click.prevent="openInstallTemplatesModal">{{ __('here to add template screen', 'all-signs-options-pro') }}</a>
          {{ __(' to your online store', 'all-signs-options-pro') }}
        </div>
      </div>
    </div>

    <!-- Main Content Grid -->
    <div class="asowp-dashboard-layout asowp-grid lg:asowp-grid-cols-[1fr_340px] asowp-gap-5">
      <div class="asowp-space-y-4">
        <!-- KPI Section -->
        <div class="asowp-dashboard-card asowp-dashboard-kpis asowp-bg-white asowp-rounded-xl asowp-border asowp-border-solid asowp-border-[#e1e3e5] asowp-p-6 asowp-flex asowp-justify-between asowp-shadow-sm">
          <div v-for="c in kpis" :key="c.key" class="asowp-dashboard-kpi asowp-flex-1">
            <div class="asowp-dashboard-kpi-value asowp-text-[32px] asowp-font-semibold asowp-text-[#1a1a1a]">{{ c.value }}</div>
            <div class="asowp-dashboard-kpi-label asowp-text-[14px] asowp-text-[#616161]">{{ c.label }}</div>
          </div>
        </div>

        <!-- Main Menu Section -->
        <div class="asowp-dashboard-main-menu asowp-bg-[#dce6e6] asowp-rounded-xl asowp-border asowp-border-solid asowp-border-[#c9dada] asowp-overflow-hidden asowp-shadow-sm">
          <div class="asowp-px-6 asowp-py-4 asowp-flex asowp-items-center asowp-gap-2">
            <LayoutGridIcon class="asowp-w-5 asowp-h-5 asowp-text-[#4a4a4a]" />
            <span class="asowp-text-[15px] asowp-font-bold asowp-text-[#1a1a1a]">{{ __('Main Menu', 'all-signs-options-pro') }}</span>
          </div>
          <div class="asowp-px-6 asowp-pb-6 asowp-space-y-3">
            <RouterLink v-for="item in mainMenu" :key="item.to" :to="item.to"
              class="asowp-flex asowp-items-center asowp-justify-between asowp-p-3 asowp-bg-transparent hover:asowp-bg-[#c9dada] asowp-rounded-lg asowp-transition-colors asowp-no-underline asowp-group">
              <div class="asowp-flex asowp-items-center asowp-gap-4">
                <span class="asowp-dashboard-menu-icon asowp-w-12 asowp-h-12 asowp-rounded-xl asowp-bg-white asowp-flex asowp-items-center asowp-justify-center asowp-shadow-sm">
                  <component :is="item.icon" class="asowp-w-6 asowp-h-6 asowp-text-[#4a4a4a]" />
                </span>
                <div>
                  <div class="asowp-dashboard-menu-title asowp-text-[15px] asowp-font-bold asowp-text-[#1a1a1a]">{{ item.title }}</div>
                  <div class="asowp-dashboard-menu-desc asowp-text-[13px] asowp-text-[#616161]">{{ item.desc }}</div>
                </div>
              </div>
              <ChevronRightIcon class="asowp-w-5 asowp-h-5 asowp-text-[#4a4a4a] group-hover:asowp-translate-x-1 asowp-transition-transform" />
            </RouterLink>
          </div>
        </div>

        <!-- Learning Center -->
        <div class="asowp-dashboard-card asowp-bg-white asowp-rounded-xl asowp-border asowp-border-solid asowp-border-[#e1e3e5] asowp-shadow-sm">
          <div class="asowp-px-6 asowp-py-4 asowp-border-b asowp-border-solid asowp-border-[#f1f1f1] asowp-flex asowp-items-center asowp-gap-2">
            <ExternalLinkIcon class="asowp-w-4 asowp-h-4 asowp-text-[#4a4a4a]" />
            <div class="asowp-text-[15px] asowp-font-bold asowp-text-[#1a1a1a]">{{ __('Learning center', 'all-signs-options-pro') }}</div>
          </div>
          <div class="asowp-p-6 asowp-grid md:asowp-grid-cols-2 asowp-gap-6">
            <div class="asowp-dashboard-inner-card asowp-rounded-xl asowp-border asowp-border-solid asowp-border-[#e1e3e5] asowp-p-5">
              <div class="asowp-text-[14px] asowp-font-bold asowp-text-[#1a1a1a]">{{ __('Browse demo', 'all-signs-options-pro') }}</div>
              <p class="asowp-text-[13px] asowp-text-[#616161] asowp-mt-2">
                {{ __('Explore live examples of sign lastconfigs in action.', 'all-signs-options-pro') }}
              </p>
              <div class="asowp-mt-4 asowp-flex asowp-items-center asowp-gap-3">
                <a href="https://demos.signsdesigner.us/aso-live-demo/" target="_blank" rel="noopener"
                  class="asowp-inline-flex asowp-items-center asowp-px-3 asowp-py-1.5 asowp-bg-white asowp-border asowp-border-solid asowp-border-[#c1c4c7] asowp-rounded-md asowp-text-[13px] asowp-font-bold asowp-text-[#1a1a1a] asowp-no-underline hover:asowp-bg-[#f6f6f7]">
                  {{ __('View demos', 'all-signs-options-pro') }}
                </a>
                <span class="asowp-text-[12px] asowp-text-[#616161]">{{ __('The password to access to demo is: aso', 'all-signs-options-pro') }}</span>
              </div>
            </div>

            <div class="asowp-dashboard-inner-card asowp-rounded-xl asowp-border asowp-border-solid asowp-border-[#e1e3e5] asowp-p-5">
              <div class="asowp-text-[14px] asowp-font-bold asowp-text-[#1a1a1a]">{{ __('Documentation', 'all-signs-options-pro') }}</div>
              <p class="asowp-text-[13px] asowp-text-[#616161] asowp-mt-2">
                {{ __('Explore the app documentation', 'all-signs-options-pro') }}
              </p>
              <div class="asowp-mt-4">
                <a href="https://docs.signsdesigner.us/docs/aso-wp-documentation/" target="_blank" rel="noopener"
                  class="asowp-inline-flex asowp-items-center asowp-px-3 asowp-py-1.5 asowp-bg-white asowp-border asowp-border-solid asowp-border-[#c1c4c7] asowp-rounded-md asowp-text-[13px] asowp-font-bold asowp-text-[#1a1a1a] asowp-no-underline hover:asowp-bg-[#f6f6f7]">
                  {{ __('View docs', 'all-signs-options-pro') }}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Sidebar -->
      <div class="asowp-space-y-4">
        <!-- Recent Configurations -->
        <div class="asowp-dashboard-card asowp-dashboard-side-card">
          <div class="asowp-dashboard-side-title">
            {{ __('Recent Configurations', 'all-signs-options-pro') }}
          </div>
          <div class="asowp-dashboard-side-content">
            <div class="asowp-text-[13px] asowp-text-[#616161]" v-if="recentConfigs.length === 0">
              {{ __('No recent configurations yet.', 'all-signs-options-pro') }}
            </div>
            <ul v-else class="asowp-space-y-3 asowp-m-0 asowp-p-0 asowp-list-none">
              <li v-for="rc in recentConfigs" :key="rc.id" class="asowp-flex asowp-justify-between asowp-items-center asowp-w-full">
                <div @click="goToMaterial(rc)" class="asowp-cursor-pointer asowp-w-full">
                  <div class="asowp-text-[11px] asowp-text-[#616161] asowp-mb-1">{{ __('ID', 'all-signs-options-pro') }} {{ rc.id }}</div>
                  <div class="asowp-flex asowp-justify-between asowp-items-center">
                    <div class="asowp-text-[13px] asowp-font-bold asowp-text-[#1a1a1a] asowp-truncate asowp-max-w-[150px]">{{ rc.name }}</div>
                    <div class="asowp-shopify-info-badge">{{ getProductFamilyLabel(rc) }}</div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <!-- Share Feedback -->
        <div class="asowp-dashboard-card asowp-dashboard-side-card">
          <div class="asowp-dashboard-side-title">
            {{ __('Share your feedback', 'all-signs-options-pro') }}
          </div>
          <div class="asowp-dashboard-side-content asowp-space-y-4">
            <div class="asowp-text-[13px] asowp-text-[#616161]">{{ __('How would you describe your experience using Sign Customiser?', 'all-signs-options-pro') }}</div>
            <div class="asowp-flex asowp-gap-2">
              <a href="https://signsdesigner.us/all-signs-customizer-product/#section-review" target="_blank" rel="noopener"
                class="asowp-flex-1 asowp-inline-flex asowp-items-center asowp-justify-center asowp-gap-2 asowp-px-3 asowp-py-1.5 asowp-bg-white asowp-border asowp-border-solid asowp-border-[#c1c4c7] asowp-rounded-md asowp-text-[13px] asowp-font-bold asowp-text-[#1a1a1a] asowp-no-underline hover:asowp-bg-[#f6f6f7]">
                <ThumbsUpIcon class="asowp-w-4 asowp-h-4" />
                {{ __('Yes', 'all-signs-options-pro') }}
              </a>
              <a href="https://signsdesigner.us/contact" target="_blank" rel="noopener"
                class="asowp-flex-1 asowp-inline-flex asowp-items-center asowp-justify-center asowp-gap-2 asowp-px-3 asowp-py-1.5 asowp-bg-white asowp-border asowp-border-solid asowp-border-[#c1c4c7] asowp-rounded-md asowp-text-[13px] asowp-font-bold asowp-text-[#1a1a1a] asowp-no-underline hover:asowp-bg-[#f6f6f7]">
                <ThumbsDownIcon class="asowp-w-4 asowp-h-4" />
                {{ __('No', 'all-signs-options-pro') }}
              </a>
            </div>
          </div>
        </div>

        <!-- Useful Links -->
        <div class="asowp-dashboard-card asowp-dashboard-side-card">
          <div class="asowp-dashboard-side-title">
            {{ __('Useful Links', 'all-signs-options-pro') }}
          </div>
          <div class="asowp-dashboard-side-content">
            <div class="asowp-flex asowp-flex-wrap asowp-gap-2">
              <component
                :is="link.action === 'chat' ? 'button' : 'a'"
                v-for="link in usefulLinks"
                :key="link.text"
                :href="link.action === 'chat' ? undefined : link.url"
                :target="link.action === 'chat' ? undefined : '_blank'"
                :rel="link.action === 'chat' ? undefined : 'noopener'"
                :type="link.action === 'chat' ? 'button' : undefined"
                class="asowp-dashboard-useful-link"
                @click="handleUsefulLinkClick(link, $event)">
                <component :is="link.icon" class="asowp-w-3.5 asowp-h-3.5" />
                {{ link.text }}
              </component>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Modals -->
  <div v-if="showInstallConfigModal" class="asowp-fixed asowp-inset-0 asowp-z-[1000] asowp-flex asowp-items-center asowp-justify-center">
    <div class="asowp-absolute asowp-inset-0 asowp-bg-black asowp-bg-opacity-40" @click="closeInstallModals"></div>
    <div class="asowp-relative asowp-w-[min(820px,95vw)] asowp-max-h-[calc(100vh-5.75rem)] asowp-bg-white asowp-rounded-2xl asowp-shadow-xl asowp-overflow-hidden asowp-flex asowp-flex-col">
      <div class="asowp-flex asowp-items-center asowp-justify-between asowp-px-5 asowp-py-3 asowp-border-b asowp-border-[#e5e7eb]">
        <div class="asowp-text-[14px] asowp-font-semibold">{{ __('Install the configurator screen', 'all-signs-options-pro') }}</div>
        <button class="asowp-p-1 asowp-rounded-md hover:asowp-bg-[#f3f4f6] asowp-border-0 asowp-bg-transparent asowp-cursor-pointer" @click="closeInstallModals">✕</button>
      </div>
      <div class="asowp-flex-1 asowp-min-h-0 asowp-p-5 asowp-space-y-4 asowp-overflow-y-auto">
        <div class="asowp-text-[13px] asowp-text-gray-700">{{ __('You can display the configurator in 2 ways, and list configurable products with a shortcode:', 'all-signs-options-pro') }}</div>
          <div class="asowp-rounded-xl asowp-border asowp-border-[#e5e7eb] asowp-bg-[#fafafa] asowp-p-4">
            <div class="asowp-text-[13px] asowp-font-semibold asowp-text-[#303030]">{{ __('Option 1 — Buttons on product pages', 'all-signs-options-pro') }}</div>
            <div class="asowp-mt-2 asowp-text-[13px] asowp-text-gray-700 asowp-space-y-1">
              <span>{{ __('1) If the product is not attached to a configuration yet, attach it first.', 'all-signs-options-pro') }}</span>
              <span>{{ __('2) On the storefront, customers will see the customization buttons on that product page.', 'all-signs-options-pro') }}</span>
            </div>
          </div>
          <div class="asowp-rounded-xl asowp-border asowp-border-[#e5e7eb] asowp-bg-[#fafafa] asowp-p-4">
            <div class="asowp-text-[13px] asowp-font-semibold asowp-text-[#303030]">{{ __('Option 2 — Shortcode', 'all-signs-options-pro') }}</div>
            <div class="asowp-mt-2 asowp-text-[13px] asowp-text-gray-700">{{ __('Add the shortcode inside any WordPress page:', 'all-signs-options-pro') }}</div>
            <div class="asowp-mt-2 asowp-rounded-lg asowp-bg-white asowp-border asowp-border-[#e5e7eb] asowp-p-3 asowp-flex asowp-items-start asowp-justify-between">
              <code class="asowp-text-[12px]">[asowp-configurator productid="123"]</code>
              <button class="asowp-px-2 asowp-py-1 asowp-text-[12px] asowp-bg-white asowp-border asowp-border-solid asowp-border-[#c1c4c7] asowp-rounded asowp-cursor-pointer" @click="copySnippet('[asowp-configurator productid=&quot;123&quot;]', 'cfg-basic')">
                {{ copiedKey === 'cfg-basic' ? __('Copied', 'all-signs-options-pro') : __('Copy', 'all-signs-options-pro') }}
              </button>
            </div>
          </div>
      </div>
      <div class="asowp-flex asowp-justify-end asowp-px-5 asowp-py-3 asowp-border-t">
        <button class="asowp-px-4 asowp-py-1.5 asowp-text-white asowp-bg-[#006e52] asowp-rounded-md asowp-border-0 asowp-cursor-pointer" @click="closeInstallModals">{{ __('Got it', 'all-signs-options-pro') }}</button>
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
  FileTextIcon,
  PlusCircleIcon,
  HelpCircleIcon,
  CreditCardIcon,
  MessageCircleIcon
} from 'lucide-vue-next';

/** KPI values */
const kpis = ref([
  { key: 'items', label: __('Products Created', 'all-signs-options-pro'), value: 0 },
  { key: 'rate', label: __('Conversion Rate', 'all-signs-options-pro'), value: '0%' },
  { key: 'orders', label: __('Orders', 'all-signs-options-pro'), value: 0 },
])

const kpisLoading = ref(false)
const recentConfigs = ref([])
const showInstallConfigModal = ref(false)
const showInstallTemplatesModal = ref(false)
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
  if (slug === 'banners') return __('Banners', 'all-signs-options-pro');
  if (slug === 'stickers') return __('Stickers', 'all-signs-options-pro');
  if (slug === 'signs-panels') return __('Signs & Panels', 'all-signs-options-pro');
  return __('Not set', 'all-signs-options-pro');
};

const openInstallConfigModal = () => { showInstallConfigModal.value = true }
const openInstallTemplatesModal = () => { showInstallTemplatesModal.value = true }
const closeInstallModals = () => {
  showInstallConfigModal.value = false
  showInstallTemplatesModal.value = false
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
      window.asowpUpdateCrispPosition?.();
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
      { key: 'items', label: __('Products Created', 'all-signs-options-pro'), value: stats?.configured_items ?? 0 },
      { key: 'rate', label: __('Conversion Rate', 'all-signs-options-pro'), value: `${stats?.configured_rate ?? 0}%` },
      { key: 'orders', label: __('Orders', 'all-signs-options-pro'), value: stats?.configured_orders ?? 0 },
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
    title: __('Configurations', 'all-signs-options-pro'),
    desc: __('Manage your sign configurations', 'all-signs-options-pro'),
    icon: LayoutGridIcon
  },
  {
    to: '/templates/main',
    title: __('Templates', 'all-signs-options-pro'),
    desc: __('Manage your sign templates', 'all-signs-options-pro'),
    icon: FileTextIcon
  },
  {
    to: '/settings/output',
    title: __('Global Settings', 'all-signs-options-pro'),
    desc: __('Manage your sign global setting', 'all-signs-options-pro'),
    icon: SettingsIcon
  },
  {
    to: '/manage-font',
    title: __('Library', 'all-signs-options-pro'),
    desc: __('Manage your sign library', 'all-signs-options-pro'),
    icon: LibraryIcon
  }
]

const usefulLinks = [
  { text: __('Request a feature', 'all-signs-options-pro'), url: 'https://signsdesigner.us/all-signs-customizer-product/#section-review', icon: PlusCircleIcon },
  { text: __('Learning Center', 'all-signs-options-pro'), url: 'https://docs.signsdesigner.us/docs/aso-wp-documentation/', icon: HelpCircleIcon },
  { text: __('Pricing', 'all-signs-options-pro'), url: 'https://signsdesigner.us/pricing-all-signs-customizer/', icon: CreditCardIcon },
  { text: __('Get in touch', 'all-signs-options-pro'), url: '', icon: MessageCircleIcon, action: 'chat' },
]
</script>

<style>
#asowp-backend-app .asowp-dashboard {
  min-height: 100vh;
  padding: 30px 30px 18px;
  background: #f3f3f3;
  color: #303030;
  font-size: 14px;
  line-height: 20px;
}

#asowp-backend-app .asowp-dashboard-topbar {
  display: flex;
  justify-content: flex-end;
  margin: 0 0 18px;
}

#asowp-backend-app .asowp-dashboard-primary-action,
#asowp-backend-app .asowp-dashboard-primary-action:hover,
#asowp-backend-app .asowp-dashboard-primary-action:focus,
#asowp-backend-app .asowp-dashboard-primary-action:active,
#asowp-backend-app .asowp-dashboard-primary-action:visited {
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

#asowp-backend-app .asowp-dashboard-primary-action:hover {
  border-color: #004e4e !important;
  background: #004e4e !important;
}

#asowp-backend-app .asowp-dashboard-primary-action:active {
  border-color: #003b3b !important;
  background: #003b3b !important;
}

#asowp-backend-app .asowp-dashboard-primary-action:focus {
  outline: none !important;
  box-shadow:
    0 0 0 1px #ffffff,
    0 0 0 3px rgba(1, 100, 100, 0.35),
    0 1px 0 rgba(0, 0, 0, 0.05),
    inset 0 -1px 0 rgba(0, 0, 0, 0.2) !important;
}

#asowp-backend-app .asowp-dashboard-useful-link,
#asowp-backend-app .asowp-dashboard-useful-link:hover,
#asowp-backend-app .asowp-dashboard-useful-link:focus,
#asowp-backend-app .asowp-dashboard-useful-link:active,
#asowp-backend-app .asowp-dashboard-useful-link:visited {
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

#asowp-backend-app .asowp-dashboard-useful-link:hover {
  background: #f6f6f7 !important;
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
  font-size: 12px !important;
  line-height: 16px !important;
  font-weight: 400 !important;
  white-space: nowrap !important;
}

#asowp-backend-app .asowp-dashboard-card {
  background: #fff !important;
  border: 1px solid #dde5ec !important;
  border-radius: 12px !important;
  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.05) !important;
}

#asowp-backend-app .asowp-dashboard-banners {
  display: grid !important;
  grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
  gap: 10px !important;
  margin: 0 0 10px !important;
}

#asowp-backend-app .asowp-dashboard-banner {
  display: flex !important;
  align-items: center !important;
  min-height: 46px !important;
  height: 46px !important;
  padding: 0 12px !important;
}

#asowp-backend-app .asowp-dashboard-banner-icon {
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

#asowp-backend-app .asowp-dashboard-banner-text,
#asowp-backend-app .asowp-dashboard-banner-text a {
  color: #303030 !important;
  font-size: 13px !important;
  line-height: 20px !important;
}

#asowp-backend-app .asowp-dashboard-banner-text a {
  margin: 0 3px !important;
  text-decoration: underline !important;
  text-underline-offset: 2px !important;
}

#asowp-backend-app .asowp-dashboard-layout {
  display: grid !important;
  grid-template-columns: minmax(0, 1fr) 340px !important;
  gap: 10px !important;
}

#asowp-backend-app .asowp-dashboard-layout > .asowp-space-y-4 {
  display: flex !important;
  flex-direction: column !important;
  gap: 10px !important;
}

#asowp-backend-app .asowp-dashboard-kpis {
  display: grid !important;
  grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
  align-items: center !important;
  height: 92px !important;
  min-height: 92px !important;
  padding: 16px 32px !important;
}

#asowp-backend-app .asowp-dashboard-kpi-value {
  color: #303030 !important;
  font-size: 24px !important;
  font-weight: 700 !important;
  line-height: 28px !important;
}

#asowp-backend-app .asowp-dashboard-kpi-label {
  color: #303030 !important;
  font-size: 14px !important;
  line-height: 20px !important;
}

#asowp-backend-app .asowp-dashboard-main-menu {
  min-height: 0;
  padding: 7px !important;
  border: 0 !important;
  border-radius: 12px !important;
  background: rgba(1, 100, 100, 0.15) !important;
  box-shadow: none !important;
}

#asowp-backend-app .asowp-dashboard-main-menu > div:first-child {
  padding: 10px 16px 8px !important;
}

#asowp-backend-app .asowp-dashboard-main-menu > div:last-child {
  padding: 0 12px 10px !important;
}

#asowp-backend-app .asowp-dashboard-main-menu > div:last-child > :not([hidden]) ~ :not([hidden]) {
  margin-top: 0 !important;
}

#asowp-backend-app .asowp-dashboard-main-menu a {
  min-height: 58px !important;
  padding: 7px !important;
  border-radius: 8px !important;
  background: transparent !important;
  text-decoration: none !important;
}

#asowp-backend-app .asowp-dashboard-main-menu a + a {
  border-top: 1px solid rgba(255, 255, 255, 0.65) !important;
}

#asowp-backend-app .asowp-dashboard-main-menu a:hover {
  background: transparent !important;
}

#asowp-backend-app .asowp-dashboard-menu-icon {
  width: 40px !important;
  height: 40px !important;
  min-width: 40px !important;
  border-radius: 8px !important;
}

#asowp-backend-app .asowp-dashboard-menu-icon svg {
  width: 18px !important;
  height: 18px !important;
}

#asowp-backend-app .asowp-dashboard-menu-title {
  color: #303030 !important;
  font-size: 14px !important;
  font-weight: 700 !important;
  line-height: 20px !important;
}

#asowp-backend-app .asowp-dashboard-menu-desc {
  color: #303030 !important;
  font-size: 14px !important;
  line-height: 20px !important;
}

#asowp-backend-app .asowp-dashboard-side-card {
  min-height: 104px !important;
  padding: 20px 20px 16px !important;
}

#asowp-backend-app .asowp-dashboard-side-title {
  color: #303030 !important;
  font-size: 14px !important;
  font-weight: 700 !important;
  line-height: 20px !important;
  margin: 0 0 12px !important;
}

#asowp-backend-app .asowp-dashboard-side-content {
  padding: 0 !important;
}

#asowp-backend-app .asowp-dashboard-side-card .asowp-text-\[13px\] {
  font-size: 13px !important;
  line-height: 19px !important;
}

#asowp-backend-app .asowp-dashboard-inner-card {
  border-color: #dde5ec !important;
  border-radius: 12px !important;
  padding: 20px !important;
}

@media (max-width: 1100px) {
  #asowp-backend-app .asowp-dashboard-layout,
  #asowp-backend-app .asowp-dashboard-banners {
    grid-template-columns: 1fr !important;
  }
}
</style>
