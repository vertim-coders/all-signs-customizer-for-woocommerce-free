<template>
    <div id="asowp-backend-app" class="asowp-min-h-screen asowp-bg-[#f6f6f7]">
        <Headerbar
            v-if="
                $route &&
                $route.name &&
                (
                    $route.name === 'Simple-Sizes' ||
                    $route.name === 'Simple-Colors' ||
                    $route.name === 'Simple-Shapes' ||
                    $route.name === 'Simple-Borders' ||
                    $route.name === 'Simple-FixingMethods' ||
                    $route.name === 'Simple-TextImages' ||
                    $route.name === 'Simple-TextSetting' ||
                    $route.name === 'Simple-ImageSetup' ||
                    $route.name === 'Simple-SignPartSetup' ||
                    $route.name === 'Simple-Discounts' ||
                    $route.name === 'Simple-OthersComponents' ||
                    $route.name == 'Simple-OthersComponents-Options' ||
                    $route.name == 'Simple-AdditionalInputs' ||
                    $route.name == 'Simple-Cliparts' ||
                    $route.name == 'config-additional-options'
                )
            "
        />

        <div class="asowp-flex">
            <!-- Sidebar temporarily disabled while the Shopify-style internal navigation is rebuilt. -->
            <!-- <Sidebar v-if="$route && $route.name && $route.name !== 'home'" /> -->

            <div class="asowp-flex-1">
                <router-view />
            </div>
        </div>
    </div>
</template>

<script setup>
import {computed, onMounted, ref} from 'vue';
import { useRoute } from 'vue-router';
import '@/frontend/utils/tailwindcss.min.js'
import Sidebar from './pages/components/sidebar.vue'
import Headerbar from './pages/components/headerbar.vue';
import NotFound from "@/admin/pages/NotFound/index.vue";
import GlobalSettings from "@/admin/pages/global-settings/index.vue";
import api from './Api/api';
import toastMessage from './utils/functions';
import { t } from './utils/i18n';

import { __, _x, _n, _nx, sprintf, setLocaleData } from "@wordpress/i18n";

const $route = useRoute();
const activateProduct = ref(!isNaN(asowp_data.caches) && parseInt(asowp_data.caches) > 1704067200? true : false);
const showProductContent = computed(() => {
    if (!activateProduct.value && !$route) return false;
    const alwaysAllowedRoutes = ['configurations','create-configuration','edit-configuration'];
    return activateProduct.value || ( $route && alwaysAllowedRoutes.includes($route.name));
});
const product = ref('');
const productId = asowp_data.author;
onMounted(async() => {

});
const activateLicenseKey = async () => {
    try {
        const url = 'https://signsdesigner.us/wp-json/vlc/license/?lcde='+ product.value +"&siteurl="+asowp_data.site_url+"&vertim="+productId;
        const response = await axios.get(url);
        if (response.data.key) {
            activateProduct.value = true;
            await api.saveGlobalSettingsProduct(licenses.value);
        }else if(response.data.message){
            toastMessage(t(response.data.message), 'error');
        }else{
            toastMessage(t(response.data), 'error');
        }
    } catch (error) {
        toastMessage(__('An unknown error occurred.', 'all-signs-options-pro'), "error");
    }
}
tailwind.config ={
    prefix: 'asowp-',
    corePlugins: {
        preflight: false,
    },

    content: ["./**/*.{vue,js}"],
    theme: {
        extend: {
            keyframes: {
                slideToleft: {
                    'from': { transform: 'translateX(20%)' },
                    'to': { transform: 'translateX(0)' },
                },
                slideDown: {
                    'from': { transform: 'translateY(-20%)' },
                    'to': { transform: 'translateY(0)' },
                },
                slideUp: {
                    'from': { transform: 'translateY(0)' },
                    'to': { transform: 'translateY(-150%)' },
                },
            },
            animation: {
                slideToleft: 'slideToleft 0.5s ease',
                slideDown: 'slideDown 0.5s ease',
                slideUp: 'slideUp 0.5s ease',
            }
        }
    }

}
</script>

<style>
#asowp-backend-app {
  --asowp-shopify-bg: #f3f3f3;
  --asowp-shopify-surface: #ffffff;
  --asowp-shopify-surface-subdued: #f6f6f7;
  --asowp-shopify-surface-soft: #f8fafc;
  --asowp-shopify-section: #f3f4f6;
  --asowp-shopify-selected: #eef2ff;
  --asowp-shopify-text: #303030;
  --asowp-shopify-text-strong: #111827;
  --asowp-shopify-text-subdued: #616161;
  --asowp-shopify-text-muted: #667085;
  --asowp-shopify-border: #dde5ec;
  --asowp-shopify-border-strong: #d1d5db;
  --asowp-shopify-border-soft: #e5e7eb;
  --asowp-shopify-border-selected: #c7d2fe;
  --asowp-shopify-input-border: #8c9196;
  --asowp-shopify-primary: #006e52;
  --asowp-shopify-primary-hover: #005c45;
  --asowp-shopify-focus: #005bd3;
  --asowp-shopify-critical: #8e1f0b;
  --asowp-shopify-radius-control: 8px;
  --asowp-shopify-radius-nav: 10px;
  --asowp-shopify-radius-card: 12px;
  --asowp-shopify-radius-select-card: 16px;
  --asowp-shopify-radius-page-card: 24px;
  --asowp-shopify-shadow-card: 0 10px 24px rgba(15, 23, 42, 0.05);
  --asowp-shopify-shadow-selected: 0 0 0 2px rgba(148, 163, 184, 0.18), 0 16px 34px rgba(15, 23, 42, 0.10);
  --asowp-shopify-shadow-panel: 0 18px 48px rgba(15, 23, 42, 0.08);
  --asowp-shopify-shadow-modal: 0 24px 54px rgba(15, 23, 42, 0.22);
  --asowp-shopify-space-card: 20px;
  --asowp-shopify-space-card-lg: 26px;
  --asowp-shopify-space-select-card: 14px;
  --asowp-shopify-gap-page: 32px;
  --asowp-shopify-gap-card: 16px;
  --asowp-shopify-gap-tight: 8px;
  --asowp-shopify-font-xs: 10px;
  --asowp-shopify-font-sm: 12px;
  --asowp-shopify-font-body: 14px;
  --asowp-shopify-font-md: 16px;
  --asowp-shopify-font-card-title: 17px;
  --asowp-shopify-font-page-title: 28px;
  --asowp-shopify-weight-regular: 400;
  --asowp-shopify-weight-medium: 500;
  --asowp-shopify-weight-semibold: 600;
  --asowp-shopify-weight-bold: 700;
  --asowp-shopify-weight-heavy: 750;
  background: #f3f3f3 !important;
  color: #303030;
  font-family: -apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", sans-serif;
  font-size: 14px;
  line-height: 1.45;
  letter-spacing: 0;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}

#asowp-backend-app *,
#asowp-backend-app *::before,
#asowp-backend-app *::after {
  letter-spacing: 0 !important;
}

#asowp-backend-app .asowp-text-\[\#111827\],
#asowp-backend-app .asowp-text-\[\#1a1a1a\] {
  color: #303030 !important;
}

#asowp-backend-app .asowp-font-\[900\] {
  font-weight: 750 !important;
}

#asowp-backend-app .asowp-font-bold {
  font-weight: 650 !important;
}

#asowp-backend-app .asowp-shadow-sm {
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.04) !important;
}

#asowp-backend-app .asowp-shadow,
#asowp-backend-app .asowp-shadow-md,
#asowp-backend-app .asowp-shadow-lg {
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.06) !important;
}

#asowp-backend-app .asowp-shadow-xl,
#asowp-backend-app .asowp-shadow-2xl {
  box-shadow: 0 18px 42px rgba(0, 0, 0, 0.18) !important;
}

#asowp-backend-app input,
#asowp-backend-app textarea,
#asowp-backend-app select,
#asowp-backend-app button {
  font-family: inherit;
}

#asowp-backend-app input,
#asowp-backend-app textarea,
#asowp-backend-app select {
  color: #303030 !important;
  box-shadow: none !important;
}

#asowp-backend-app button,
#asowp-backend-app a {
  transition-property: background-color, border-color, color, box-shadow, opacity;
  transition-duration: 120ms;
  transition-timing-function: ease;
}

#asowp-backend-app .asowp-primary-action,
#asowp-backend-app .asowp-primary-action:hover,
#asowp-backend-app .asowp-primary-action:focus,
#asowp-backend-app .asowp-primary-action:active,
#asowp-backend-app .asowp-primary-action:visited,
#asowp-backend-app button.asowp-primary-button,
#asowp-backend-app button.asowp-primary-button:hover,
#asowp-backend-app button.asowp-primary-button:focus,
#asowp-backend-app button.asowp-primary-button:active,
#asowp-backend-app button.asowp-primary-button:visited {
  color: #ffffff !important;
  -webkit-text-fill-color: #ffffff !important;
  text-decoration: none !important;
}

#asowp-backend-app .asowp-primary-action *,
#asowp-backend-app button.asowp-primary-button * {
  color: inherit !important;
  -webkit-text-fill-color: inherit !important;
}

#asowp-backend-app .asowp-shopify-card {
  background: var(--asowp-shopify-surface);
  border: 1px solid var(--asowp-shopify-border);
  border-radius: var(--asowp-shopify-radius-card);
  box-shadow: var(--asowp-shopify-shadow-card);
}

#asowp-backend-app .asowp-shopify-page-card {
  background: var(--asowp-shopify-surface);
  border: 1px solid var(--asowp-shopify-border);
  border-radius: var(--asowp-shopify-radius-page-card);
  box-shadow: var(--asowp-shopify-shadow-panel);
}

#asowp-backend-app .asowp-shopify-select-card {
  background: var(--asowp-shopify-surface);
  border: 1px solid var(--asowp-shopify-border);
  border-radius: var(--asowp-shopify-radius-select-card);
  box-shadow: var(--asowp-shopify-shadow-card);
  padding: var(--asowp-shopify-space-select-card);
}

#asowp-backend-app .asowp-shopify-select-card.is-selected {
  border-color: var(--asowp-shopify-primary);
  box-shadow: var(--asowp-shopify-shadow-selected);
}

#asowp-backend-app .asowp-shopify-button-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 34px;
  padding: 8px 14px;
  border: 0;
  border-radius: var(--asowp-shopify-radius-control);
  background: var(--asowp-shopify-primary);
  color: #ffffff !important;
  -webkit-text-fill-color: #ffffff !important;
  font-size: var(--asowp-shopify-font-body);
  font-weight: var(--asowp-shopify-weight-bold);
  line-height: 18px;
  cursor: pointer;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.08);
}

#asowp-backend-app .asowp-shopify-button-primary:hover,
#asowp-backend-app .asowp-shopify-button-primary:focus,
#asowp-backend-app .asowp-shopify-button-primary:active {
  background: var(--asowp-shopify-primary-hover);
  color: #ffffff !important;
  -webkit-text-fill-color: #ffffff !important;
}

#asowp-backend-app .asowp-shopify-button-secondary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 34px;
  padding: 8px 14px;
  border: 1px solid #c9cccf;
  border-radius: var(--asowp-shopify-radius-control);
  background: var(--asowp-shopify-surface);
  color: var(--asowp-shopify-text-strong);
  font-size: var(--asowp-shopify-font-body);
  font-weight: var(--asowp-shopify-weight-semibold);
  line-height: 18px;
  cursor: pointer;
}

#asowp-backend-app .asowp-shopify-button-secondary:hover {
  background: var(--asowp-shopify-surface-subdued);
}

#asowp-backend-app .asowp-shopify-input {
  box-sizing: border-box;
  width: 100%;
  min-height: 36px;
  padding: 7px 12px;
  border: 1px solid var(--asowp-shopify-input-border);
  border-radius: var(--asowp-shopify-radius-control);
  background: var(--asowp-shopify-surface);
  color: var(--asowp-shopify-text);
  font-size: var(--asowp-shopify-font-body);
  line-height: 20px;
  outline: none;
}

#asowp-backend-app .asowp-shopify-input:focus {
  border-color: var(--asowp-shopify-focus);
  box-shadow: 0 0 0 2px var(--asowp-shopify-focus) !important;
}

#asowp-backend-app .asowp-shopify-table {
  width: 100%;
  border-collapse: collapse;
  color: var(--asowp-shopify-text);
  font-size: var(--asowp-shopify-font-body);
}

#asowp-backend-app .asowp-shopify-table thead th {
  background: var(--asowp-shopify-section);
  color: var(--asowp-shopify-text-subdued);
  font-size: var(--asowp-shopify-font-sm);
  font-weight: var(--asowp-shopify-weight-semibold);
  line-height: 16px;
  padding: 10px 12px;
  text-align: left;
}

#asowp-backend-app .asowp-shopify-table tbody td {
  border-top: 1px solid var(--asowp-shopify-border-soft);
  padding: 10px 12px;
  vertical-align: middle;
}

#asowp-backend-app .asowp-shopify-pill {
  display: inline-flex;
  align-items: center;
  width: fit-content;
  min-height: 18px;
  padding: 1px 7px;
  border-radius: 20px;
  background: #eef2f6;
  color: #475467;
  font-size: var(--asowp-shopify-font-xs);
  font-weight: var(--asowp-shopify-weight-medium);
  line-height: 16px;
}

#asowp-backend-app .asowp-shopify-pill-info {
  background: #e0f2fe;
  color: #0369a1;
}

#asowp-backend-app .asowp-settings-loader-icon {
  width: 28px;
  height: 28px;
  color: #007a72;
  animation: asowp-shopify-spin 0.8s linear infinite;
}

@keyframes asowp-shopify-spin {
  to {
    transform: rotate(360deg);
  }
}

#asowp-backend-app .asowp-shopify-accordion-body {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-left: 12px;
  padding-left: 10px;
  border-left: 1px solid var(--asowp-shopify-border-soft);
  background: transparent;
  box-shadow: none;
}
</style>
