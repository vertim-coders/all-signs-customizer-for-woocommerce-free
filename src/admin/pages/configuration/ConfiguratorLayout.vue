<template>
  <div :class="['ascwo-configurator-layout', sidebarCollapsed ? 'is-sidebar-collapsed' : '']">
    <!-- Sidebar navigation -->
    <div
      class="ascwo-configurator-sidebar"
    >
      <button
        v-if="sidebarCollapsed"
        type="button"
        class="ascwo-sidebar-open-button"
        :aria-label="__('Open configuration sidebar', 'all-signs-customizer-for-woocommerce-pro')"
        :title="__('Open configuration sidebar', 'all-signs-customizer-for-woocommerce-pro')"
        @click="toggleDesignsSidebar"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      <template v-else>
      <!-- Config info card -->
      <div class="ascwo-ui-card">
        <div class="ascwo-configurator-info-card">
          <div class="ascwo-configurator-actions">
            <button
              @click="goToConfigList"
              type="button"
              style="display: inline-flex; align-items: center; justify-content: center; cursor: pointer; width: 30px; height: 30px; border-radius: 8px; border: 1px solid #d1d5db; background: #fff; color: #111827; text-decoration: none;"
              :title="__('Back to configurations', 'all-signs-customizer-for-woocommerce-pro')"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
            </button>
            <button
              @click="goToPreview"
              type="button"
              :title="__('Preview configuration', 'all-signs-customizer-for-woocommerce-pro')"
              style="display: inline-flex; align-items: center; justify-content: center; cursor: pointer; width: 30px; height: 30px; border-radius: 8px; border: 1px solid #d1d5db; background: #fff; color: #111827; text-decoration: none;"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
            </button>
          </div>

          <!-- Config name and badges -->
          <div class="ascwo-configurator-title-wrap">
            <h2 class="ascwo-configurator-title">
              {{ configName }}
            </h2>
          </div>
          <div class="ascwo-configurator-badges">
            <span class="ascwo-ui-pill">ID: {{ configId }}</span>
            <span v-if="materialType" class="ascwo-ui-pill">{{ materialTypeLabel }}</span>
            <span v-if="configData?.productType" class="ascwo-ui-pill ascwo-ui-pill-info">{{ productTypeLabel }}</span>
          </div>

          <!-- Search field -->
          <div class="ascwo-configurator-search">
            <h3 class="ascwo-configurator-menu-title">
              {{ __('Configurator Menu', 'all-signs-customizer-for-woocommerce-pro') }}
            </h3>
            <input
              v-model="searchMenu"
              type="text"
              :placeholder="__('Search configurator items...', 'all-signs-customizer-for-woocommerce-pro')"
              class="ascwo-ui-input"
            />
          </div>
        </div>
      </div>

      <!-- Navigation groups -->
      <div
        class="ascwo-configurator-nav-scroll"
      >
        <div class="ascwo-ui-card">
          <div class="ascwo-configurator-nav-groups">
            <!-- Main groups (everything except Settings) -->
            <template v-for="group in filteredMainGroups" :key="group.title">
              <div class="ascwo-configurator-nav-group">
                <button
                  type="button"
                  @click="toggleGroup(group.title)"
                  :style="groupButtonStyle(group.title)"
                >
                  <div style="min-width: 0;">
                    <span style="font-size: 13px; font-weight: 600; color: #6b7280;">
                      {{ group.title }}
                    </span>
                  </div>
                  <div style="display: flex; justify-content: center; align-items: center;">
                    <svg v-if="isGroupExpanded(group.title)" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
                    <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
                  </div>
                </button>

                <div v-if="isGroupExpanded(group.title)" class="ascwo-configurator-subnav">
                  <div style="display: flex; flex-direction: column; gap: 4px; margin-left: 12px; padding-left: 10px; border-left: 1px solid #e5e7eb;">
                    <div
                      v-for="item in group.items"
                      :key="item.path"
                      @click="navigateTo(item.path)"
                      :style="navItemStyle(isItemActive(item.path))"
                    >
                      <div style="display: flex; align-items: center; gap: 8px;">
                        <span v-html="item.icon" style="width: 16px; height: 16px; display: flex; align-items: center; justify-content: center; opacity: 0.6;"></span>
                        <span :style="{ fontSize: '13px', fontWeight: isItemActive(item.path) ? 600 : 400, color: '#111827' }">
                          {{ item.label }}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </template>

            <!-- Settings group (always at bottom) -->
            <template v-if="filteredSettingsGroup">
              <div class="ascwo-configurator-nav-group">
                <button
                  type="button"
                  @click="toggleGroup(filteredSettingsGroup.title)"
                  :style="groupButtonStyle(filteredSettingsGroup.title)"
                >
                  <div style="min-width: 0;">
                    <span style="font-size: 13px; font-weight: 600; color: #6b7280;">
                      {{ filteredSettingsGroup.title }}
                    </span>
                  </div>
                  <div style="display: flex; justify-content: center; align-items: center;">
                    <svg v-if="isGroupExpanded(filteredSettingsGroup.title)" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
                    <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
                  </div>
                </button>

                <div v-if="isGroupExpanded(filteredSettingsGroup.title)" class="ascwo-configurator-subnav">
                  <div style="display: flex; flex-direction: column; gap: 4px; margin-left: 12px; padding-left: 10px; border-left: 1px solid #e5e7eb;">
                    <div
                      v-for="item in filteredSettingsGroup.items"
                      :key="item.path"
                      @click="navigateTo(item.path)"
                      :style="navItemStyle(isItemActive(item.path))"
                    >
                      <div style="display: flex; align-items: center; gap: 8px;">
                        <span v-html="item.icon" style="width: 16px; height: 16px; display: flex; align-items: center; justify-content: center; opacity: 0.6;"></span>
                        <span :style="{ fontSize: '13px', fontWeight: isItemActive(item.path) ? 600 : 400, color: '#111827' }">
                          {{ item.label }}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
      </template>

      <button
        v-if="isDesignsView && !sidebarCollapsed"
        type="button"
        class="ascwo-sidebar-collapse-button"
        :aria-label="__('Collapse configuration sidebar', 'all-signs-customizer-for-woocommerce-pro')"
        :title="__('Collapse configuration sidebar', 'all-signs-customizer-for-woocommerce-pro')"
        @click="toggleDesignsSidebar"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>
    </div>

    <!-- Main content area -->
    <div class="ascwo-configurator-main">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { __ } from '@wordpress/i18n';
import api from '@/admin/Api/api';
import { openAdminRouteWithReload } from '@/admin/utils/reload-route';

const route = useRoute();
const router = useRouter();

// State
const configData = ref(null);
const adminConfigName = ref('');
const searchMenu = ref('');
const expandedGroup = ref('Core Setup');
const designsSidebarCollapsed = ref(false);

// Config info from route param
const configId = computed(() => route.params.configId);

// Material type label helper
const materialTypeLabel = computed(() => {
  const type = configData.value?.materialType;
  if (type === 'advance' || type === 'advanced') return __('Preset Components', 'all-signs-customizer-for-woocommerce-pro');
  if (type === 'layer' || type === 'layers') return __('Layered Setup', 'all-signs-customizer-for-woocommerce-pro');
  return __('Direct Options', 'all-signs-customizer-for-woocommerce-pro');
});

// Product type label helper
const productTypeLabel = computed(() => {
  const type = (configData.value?.productType || '').toLowerCase();
  if (
    type === 'signs-panels' ||
    type === 'signs_panels' ||
    type === 'signs-and-panels' ||
    type === 'signs & panels' ||
    type === 'signboard'
  ) return __('Signs & Panels', 'all-signs-customizer-for-woocommerce-pro');
  if (type === 'banners' || type === 'banner') return __('Banners', 'all-signs-customizer-for-woocommerce-pro');
  if (type === 'stickers' || type === 'sticker') return __('Stickers', 'all-signs-customizer-for-woocommerce-pro');
  if (type === 'lettering' || type === 'letter-signs') return __('Letter signs', 'all-signs-customizer-for-woocommerce-pro');
  if (type === 'lightbox') return __('Lightbox', 'all-signs-customizer-for-woocommerce-pro');
  if (type === 'neon') return __('Neon', 'all-signs-customizer-for-woocommerce-pro');
  if (type === 'channel') return __('Channel', 'all-signs-customizer-for-woocommerce-pro');
  // Return the formatted original value if no match
  const raw = configData.value?.productType || '';
  return raw ? raw.charAt(0).toUpperCase() + raw.slice(1).replace(/-/g, ' ') : '';
});

const materialType = computed(() => configData.value?.materialType || '');
const isDesignsView = computed(() => route.path.includes(`/configuration/${configId.value}/required-options/components`));
const sidebarCollapsed = computed(() => isDesignsView.value && designsSidebarCollapsed.value);

// Config name
const configName = computed(() => {
  return adminConfigName.value || __('Loading...', 'all-signs-customizer-for-woocommerce-pro');
});

// Check if has advanced materials (NCPC-like)
const hasAdvancedMaterials = computed(() => {
  const type = configData.value?.materialType;
  return type === 'advance' || type === 'advanced' || type === 'layers';
});

const redirectAdvancedDefaultRoute = () => {
  if (!hasAdvancedMaterials.value || !configId.value) return;
  const isLegacyDefaultRoute = route.name === 'sizes'
    || route.path === `/configuration/${configId.value}`
    || route.path === `/configuration/${configId.value}/required-options`;
  if (!isLegacyDefaultRoute) return;
  router.replace({ name: 'required-components', params: { configId: configId.value } });
};

// Load config data
const loadConfig = async () => {
  if (!configId.value) return;
  try {
    configData.value = null;
    adminConfigName.value = '';
    const data = await api.getConfig(configId.value);
    configData.value = data;
    await loadConfigName();
    redirectAdvancedDefaultRoute();
  } catch (error) {
    console.error('Failed to load config:', error);
  }
};

const loadConfigName = async () => {
  try {
    const response = await api.getConfigs('?per_page=100&order=DESC&page=1');
    const configs = Array.isArray(response?.items) ? response.items : [];
    const current = configs.find((item) => String(item?.id) === String(configId.value));
    adminConfigName.value = current?.name || '';
  } catch (error) {
    adminConfigName.value = '';
  }
};

// SVG icons for navigation items
const icons = {
  sizes: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 7v10M21 7v10M3 7h18M3 17h18"/></svg>',
  pricing: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M16 8h-6a2 2 0 100 4h4a2 2 0 110 4h-6"/><path d="M12 18V6"/></svg>',
  fonts: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 20V4h16v16"/><path d="M8 16V8h8v8"/><path d="M10 12h4"/></svg>',
  colors: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/></svg>',
  lighting: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18h6"/><path d="M10 22h4"/><path d="M8 14a6 6 0 118 0c-.8.7-1.2 1.5-1.2 2.4H9.2c0-.9-.4-1.7-1.2-2.4z"/></svg>',
  fixing: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>',
  shapes: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 22h20L12 2z"/></svg>',
  materials: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="2"/><path d="M2 12h20"/></svg>',
  borders: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M3 15h18M9 3v18M15 3v18"/></svg>',
  text: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 7V4h16v3"/><path d="M9 20h6"/><path d="M12 4v16"/></svg>',
  image: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>',
  signpart: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="2"/><line x1="12" y1="2" x2="12" y2="22"/></svg>',
  components: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>',
  inputs: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>',
  cliparts: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8" cy="8" r="2"/><path d="M21 15l-5-5L5 21"/></svg>',
  general: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>',
  customizer: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="2"/><line x1="12" y1="2" x2="12" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/></svg>',
  language: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>',
  theme: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>',
};

// Build navigation groups dynamically
const groups = computed(() => {
  if (!configData.value) return [];

  const id = configId.value;
  const basePath = `/configuration/${id}`;

  const coreItems = hasAdvancedMaterials.value
    ? [
        { label: __('Fonts', 'all-signs-customizer-for-woocommerce-pro'), path: `${basePath}/required-options/fonts`, icon: icons.fonts },
        { label: __('Designs', 'all-signs-customizer-for-woocommerce-pro'), path: `${basePath}/required-options/components`, icon: icons.components },
        { label: __('Pricings', 'all-signs-customizer-for-woocommerce-pro'), path: `${basePath}/required-options/pricings`, icon: icons.pricing },
        { label: __('Materials', 'all-signs-customizer-for-woocommerce-pro'), path: `${basePath}/required-options/materials`, icon: icons.materials },
      ]
    : [
        { label: __('Sizes', 'all-signs-customizer-for-woocommerce-pro'), path: `${basePath}/required-options/sizes`, icon: icons.sizes },
        { label: __('Pricings', 'all-signs-customizer-for-woocommerce-pro'), path: `${basePath}/required-options/pricings`, icon: icons.pricing },
        { label: __('Fonts', 'all-signs-customizer-for-woocommerce-pro'), path: `${basePath}/required-options/fonts`, icon: icons.fonts },
        { label: __('Colors', 'all-signs-customizer-for-woocommerce-pro'), path: `${basePath}/required-options/colors`, icon: icons.colors },
        { label: __('Lighting', 'all-signs-customizer-for-woocommerce-pro'), path: `${basePath}/required-options/lightings`, icon: icons.lighting },
        { label: __('Fixing Methods', 'all-signs-customizer-for-woocommerce-pro'), path: `${basePath}/required-options/fixing-methods`, icon: icons.fixing },
        { label: __('Shapes', 'all-signs-customizer-for-woocommerce-pro'), path: `${basePath}/required-options/shapes`, icon: icons.shapes },
        { label: __('Materials', 'all-signs-customizer-for-woocommerce-pro'), path: `${basePath}/required-options/materials`, icon: icons.materials },
        { label: __('Borders', 'all-signs-customizer-for-woocommerce-pro'), path: `${basePath}/required-options/borders`, icon: icons.borders },
      ];

  const editorItems = [
    { label: __('Text Setting', 'all-signs-customizer-for-woocommerce-pro'), path: `${basePath}/design-setup/text`, icon: icons.text },
    { label: __('Image Setup', 'all-signs-customizer-for-woocommerce-pro'), path: `${basePath}/design-setup/images`, icon: icons.image },
    { label: __('Sign Part', 'all-signs-customizer-for-woocommerce-pro'), path: `${basePath}/design-setup/sign-part`, icon: icons.signpart },
  ];

  const additionalItems = [];
  if (!hasAdvancedMaterials.value) {
    additionalItems.push({
      label: __('Components', 'all-signs-customizer-for-woocommerce-pro'),
      path: `${basePath}/additional-options/additional-components`,
      icon: icons.components,
    });
  }
  additionalItems.push({
    label: __('Inputs', 'all-signs-customizer-for-woocommerce-pro'),
    path: `${basePath}/additional-options/inputs`,
    icon: icons.inputs,
  });

  const settingsItems = [
    { label: __('General', 'all-signs-customizer-for-woocommerce-pro'), path: `${basePath}/settings/general`, icon: icons.general },
    { label: __('Customizer Setup', 'all-signs-customizer-for-woocommerce-pro'), path: `${basePath}/settings/customizer-sign`, icon: icons.customizer },
    { label: __('Language & Images', 'all-signs-customizer-for-woocommerce-pro'), path: `${basePath}/settings/language-text`, icon: icons.language },
    { label: __('Theme & Color', 'all-signs-customizer-for-woocommerce-pro'), path: `${basePath}/settings/theme-color`, icon: icons.theme },
  ];

  return [
    { title: __('Core Setup', 'all-signs-customizer-for-woocommerce-pro'), items: coreItems },
    { title: __('Editor Setup', 'all-signs-customizer-for-woocommerce-pro'), items: editorItems },
    { title: __('Additional Options', 'all-signs-customizer-for-woocommerce-pro'), items: additionalItems },
    { title: __('Settings', 'all-signs-customizer-for-woocommerce-pro'), items: settingsItems },
  ];
});

// Filter items based on search
const filteredGroups = computed(() => {
  const term = searchMenu.value.trim().toLowerCase();
  if (!term) return groups.value;

  return groups.value
    .map(group => ({
      ...group,
      items: group.items.filter(item =>
        item.label.toLowerCase().includes(term) ||
        (item.keywords && item.keywords.some(k => k.toLowerCase().includes(term)))
      ),
    }))
    .filter(group => group.items.length > 0);
});

// Separate Settings from main groups
const filteredMainGroups = computed(() =>
  filteredGroups.value.filter(g => g.title !== __('Settings', 'all-signs-customizer-for-woocommerce-pro'))
);

const filteredSettingsGroup = computed(() =>
  filteredGroups.value.find(g => g.title === __('Settings', 'all-signs-customizer-for-woocommerce-pro')) || null
);

// Active item detection based on current route path
const isItemActive = (path) => {
  const currentPath = route.path;
  return currentPath === path || currentPath.startsWith(path + '/');
};

// Determine active group
const activeGroupTitle = computed(() => {
  const activeGroup = groups.value.find(group =>
    group.items.some(item => {
      return route.path === item.path || route.path.startsWith(item.path + '/');
    })
  );
  return activeGroup?.title || __('Core Setup', 'all-signs-customizer-for-woocommerce-pro');
});

// Auto-expand active group
watch(activeGroupTitle, (newVal) => {
  if (newVal) expandedGroup.value = newVal;
}, { immediate: true });

// Group button style
const groupButtonStyle = (title) => {
  const isExpanded = isGroupExpanded(title);
  const isActive = activeGroupTitle.value === title;
  return {
    width: '100%',
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 1fr) 20px',
    alignItems: 'center',
    gap: '12px',
    background: isExpanded || isActive ? '#f3f4f6' : '#ffffff',
    border: isExpanded || isActive ? '1px solid #d1d5db' : '1px solid transparent',
    borderRadius: '10px',
    padding: '8px 10px',
    boxSizing: 'border-box',
    cursor: 'pointer',
    textAlign: 'left',
    fontFamily: 'inherit',
    fontSize: 'inherit',
  };
};

// Nav item style
const navItemStyle = (active) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '12px',
  padding: '10px 12px',
  borderRadius: '10px',
  background: active ? '#eef2ff' : 'transparent',
  border: active ? '1px solid #c7d2fe' : '1px solid transparent',
  color: '#111827',
  cursor: 'pointer',
});

// Toggle group expansion
const toggleGroup = (title) => {
  expandedGroup.value = expandedGroup.value === title ? '' : title;
};

// Check if group is expanded
const isGroupExpanded = (title) => {
  return searchMenu.value.trim().length > 0 || expandedGroup.value === title;
};

// Navigate to a path
const navigateTo = (path) => {
  router.push(path);
};

const sidebarStorageKey = computed(() => `aso:designs-sidebar-collapsed:${configId.value}`);

const syncDesignsSidebarState = () => {
  if (!isDesignsView.value || typeof window === 'undefined') {
    designsSidebarCollapsed.value = false;
    return;
  }
  designsSidebarCollapsed.value = window.sessionStorage.getItem(sidebarStorageKey.value) === 'true';
};

const toggleDesignsSidebar = () => {
  if (!isDesignsView.value) return;
  const next = !designsSidebarCollapsed.value;
  designsSidebarCollapsed.value = next;
  if (typeof window !== 'undefined') {
    window.sessionStorage.setItem(sidebarStorageKey.value, String(next));
  }
};

// Go back to config list
const goToConfigList = () => {
  router.push('/configuration');
};

// Go to preview
const goToPreview = () => {
  const id = configId.value;
  if (!id) return;
  const returnTo = encodeURIComponent(route.path + route.search);
  openAdminRouteWithReload(`/configuration/${id}/preview?returnTo=${returnTo}`);
};

// Load config on mount
onMounted(() => {
  loadConfig();
  syncDesignsSidebarState();
});

// Reload config when configId changes
watch(configId, () => {
  loadConfig();
});

watch(() => route.path, syncDesignsSidebarState);
watch(() => route.name, redirectAdvancedDefaultRoute);
</script>

<style scoped>
.aso-scrollbar-hidden::-webkit-scrollbar {
  display: none;
}

.ascwo-configurator-layout {
  display: flex;
  gap: 32px;
  align-items: flex-start;
  max-width: 1600px;
  margin: 0 auto;
  padding: 12px 16px 0 16px;
  transition: gap 180ms ease;
}

.ascwo-configurator-layout.is-sidebar-collapsed {
  gap: 16px;
}

.ascwo-configurator-sidebar {
  width: 240px;
  position: sticky;
  top: calc(var(--wp-admin--admin-bar--height, 32px) + 12px);
  max-height: calc(100vh - var(--wp-admin--admin-bar--height, 32px) - 24px);
  display: flex;
  flex-direction: column;
  overflow: visible;
  flex-shrink: 0;
  transition: width 180ms ease;
}

.ascwo-configurator-layout.is-sidebar-collapsed .ascwo-configurator-sidebar {
  width: 44px;
}

.ascwo-sidebar-open-button,
.ascwo-sidebar-collapse-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  background: #fff;
  color: #6b7280;
  box-shadow: 0 1px 2px rgba(16, 24, 40, 0.08);
  cursor: pointer;
}

.ascwo-sidebar-collapse-button {
  position: absolute;
  right: -15px;
  top: 64px;
  z-index: 2;
  width: 36px;
  height: 36px;
  border-radius: 999px;
  box-shadow: 0 1px 3px rgba(16, 24, 40, 0.14);
}

.ascwo-sidebar-open-button:hover,
.ascwo-sidebar-collapse-button:hover {
  color: #303030;
  background: #f8fafc;
}

.ascwo-configurator-nav-scroll {
  flex: 1;
  min-height: 0;
  padding-top: 8px;
  overflow-y: auto;
  overscroll-behavior: contain;
  padding-right: 4px;
  scrollbar-width: none;
}

.ascwo-configurator-nav-groups {
  display: flex;
  flex-direction: column;
  gap: 0;
  background: #ffffff;
  border-radius: 12px;
  padding: 12px;
}

.ascwo-configurator-nav-group {
  padding: 4px 0;
}

.ascwo-configurator-subnav {
  padding-top: 8px;
}

.ascwo-configurator-main {
  flex: 1;
  min-width: 0;
  padding-bottom: 24px;
}

.ascwo-configurator-info-card {
  padding: 10px;
}

.ascwo-configurator-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.ascwo-configurator-title-wrap {
  padding-top: 6px;
}

.ascwo-configurator-title {
  margin: 0;
  color: #111827;
  font-size: 20px;
  font-weight: 700;
  line-height: 24px;
}

.ascwo-configurator-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  padding-top: 4px;
}

.ascwo-configurator-search {
  padding-top: 8px;
  margin-bottom: 0;
}

.ascwo-configurator-menu-title {
  margin: 0 0 4px 0;
  color: #303030;
  font-size: 13px;
  font-weight: 700;
  line-height: 20px;
}

.ascwo-configurator-sidebar :deep(.ascwo-ui-pill) {
  min-height: 20px;
  padding: 2px 8px;
  font-size: 12px;
  line-height: 16px;
  font-weight: 500;
}
</style>
