<template>
    <div id="ascwo-backend-app" class="ascwo-min-h-screen ascwo-bg-[#f6f6f7]">
        <!-- <Headerbar
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
        /> -->

        <div class="ascwo-flex">
            <!-- Sidebar temporarily disabled while the internal navigation is rebuilt. -->
            <!-- <Sidebar v-if="$route && $route.name && $route.name !== 'home'" /> -->

            <div class="ascwo-flex-1">
                <router-view />
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import '@/admin/utils/tailwindcss.min.js'
onMounted(async() => {

});
tailwind.config ={
    prefix: 'ascwo-',
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
#ascwo-backend-app {
  --ascwo-ui-bg: #f3f3f3;
  --ascwo-ui-surface: #ffffff;
  --ascwo-ui-surface-subdued: #f6f6f7;
  --ascwo-ui-surface-soft: #f8fafc;
  --ascwo-ui-section: #f3f4f6;
  --ascwo-ui-selected: #eef2ff;
  --ascwo-ui-text: #303030;
  --ascwo-ui-text-strong: #111827;
  --ascwo-ui-text-subdued: #616161;
  --ascwo-ui-text-muted: #667085;
  --ascwo-ui-border: #dde5ec;
  --ascwo-ui-border-strong: #d1d5db;
  --ascwo-ui-border-soft: #e5e7eb;
  --ascwo-ui-border-selected: #c7d2fe;
  --ascwo-ui-input-border: #8c9196;
  --ascwo-ui-primary: #006e52;
  --ascwo-ui-primary-hover: #005c45;
  --ascwo-ui-focus: #005bd3;
  --ascwo-ui-critical: #8e1f0b;
  --ascwo-ui-radius-control: 8px;
  --ascwo-ui-radius-nav: 10px;
  --ascwo-ui-radius-card: 12px;
  --ascwo-ui-radius-select-card: 16px;
  --ascwo-ui-radius-page-card: 24px;
  --ascwo-ui-shadow-card: 0 10px 24px rgba(15, 23, 42, 0.05);
  --ascwo-ui-shadow-selected: 0 0 0 2px rgba(148, 163, 184, 0.18), 0 16px 34px rgba(15, 23, 42, 0.10);
  --ascwo-ui-shadow-panel: 0 18px 48px rgba(15, 23, 42, 0.08);
  --ascwo-ui-shadow-modal: 0 24px 54px rgba(15, 23, 42, 0.22);
  --ascwo-ui-space-card: 20px;
  --ascwo-ui-space-card-lg: 26px;
  --ascwo-ui-space-select-card: 14px;
  --ascwo-ui-gap-page: 32px;
  --ascwo-ui-gap-card: 16px;
  --ascwo-ui-gap-tight: 8px;
  --ascwo-ui-font-xs: 10px;
  --ascwo-ui-font-sm: 12px;
  --ascwo-ui-font-body: 14px;
  --ascwo-ui-font-md: 16px;
  --ascwo-ui-font-card-title: 17px;
  --ascwo-ui-font-page-title: 28px;
  --ascwo-ui-weight-regular: 400;
  --ascwo-ui-weight-medium: 500;
  --ascwo-ui-weight-semibold: 600;
  --ascwo-ui-weight-bold: 700;
  --ascwo-ui-weight-heavy: 750;
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

#ascwo-backend-app *,
#ascwo-backend-app *::before,
#ascwo-backend-app *::after {
  letter-spacing: 0 !important;
}

#ascwo-backend-app .ascwo-text-\[\#111827\],
#ascwo-backend-app .ascwo-text-\[\#1a1a1a\] {
  color: #303030 !important;
}

#ascwo-backend-app .ascwo-font-\[900\] {
  font-weight: 750 !important;
}

#ascwo-backend-app .ascwo-font-bold {
  font-weight: 650 !important;
}

#ascwo-backend-app .ascwo-shadow-sm {
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.04) !important;
}

#ascwo-backend-app .ascwo-shadow,
#ascwo-backend-app .ascwo-shadow-md,
#ascwo-backend-app .ascwo-shadow-lg {
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.06) !important;
}

#ascwo-backend-app .ascwo-shadow-xl,
#ascwo-backend-app .ascwo-shadow-2xl {
  box-shadow: 0 18px 42px rgba(0, 0, 0, 0.18) !important;
}

#ascwo-backend-app input,
#ascwo-backend-app textarea,
#ascwo-backend-app select,
#ascwo-backend-app button {
  font-family: inherit;
}

#ascwo-backend-app input,
#ascwo-backend-app textarea,
#ascwo-backend-app select {
  color: #303030 !important;
  box-shadow: none !important;
}

#ascwo-backend-app button,
#ascwo-backend-app a {
  transition-property: background-color, border-color, color, box-shadow, opacity;
  transition-duration: 120ms;
  transition-timing-function: ease;
}

#ascwo-backend-app .ascwo-primary-action,
#ascwo-backend-app .ascwo-primary-action:hover,
#ascwo-backend-app .ascwo-primary-action:focus,
#ascwo-backend-app .ascwo-primary-action:active,
#ascwo-backend-app .ascwo-primary-action:visited,
#ascwo-backend-app button.ascwo-primary-button,
#ascwo-backend-app button.ascwo-primary-button:hover,
#ascwo-backend-app button.ascwo-primary-button:focus,
#ascwo-backend-app button.ascwo-primary-button:active,
#ascwo-backend-app button.ascwo-primary-button:visited {
  color: #ffffff !important;
  -webkit-text-fill-color: #ffffff !important;
  text-decoration: none !important;
}

#ascwo-backend-app .ascwo-primary-action *,
#ascwo-backend-app button.ascwo-primary-button * {
  color: inherit !important;
  -webkit-text-fill-color: inherit !important;
}

#ascwo-backend-app .ascwo-ui-card {
  background: var(--ascwo-ui-surface);
  border: 1px solid var(--ascwo-ui-border);
  border-radius: var(--ascwo-ui-radius-card);
  box-shadow: var(--ascwo-ui-shadow-card);
}

#ascwo-backend-app .ascwo-ui-page-card {
  background: var(--ascwo-ui-surface);
  border: 1px solid var(--ascwo-ui-border);
  border-radius: var(--ascwo-ui-radius-page-card);
  box-shadow: var(--ascwo-ui-shadow-panel);
}

#ascwo-backend-app .ascwo-ui-select-card {
  background: var(--ascwo-ui-surface);
  border: 1px solid var(--ascwo-ui-border);
  border-radius: var(--ascwo-ui-radius-select-card);
  box-shadow: var(--ascwo-ui-shadow-card);
  padding: var(--ascwo-ui-space-select-card);
}

#ascwo-backend-app .ascwo-ui-select-card.is-selected {
  border-color: var(--ascwo-ui-primary);
  box-shadow: var(--ascwo-ui-shadow-selected);
}

#ascwo-backend-app .ascwo-ui-button-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 34px;
  padding: 8px 14px;
  border: 0;
  border-radius: var(--ascwo-ui-radius-control);
  background: var(--ascwo-ui-primary);
  color: #ffffff !important;
  -webkit-text-fill-color: #ffffff !important;
  font-size: var(--ascwo-ui-font-body);
  font-weight: var(--ascwo-ui-weight-bold);
  line-height: 18px;
  cursor: pointer;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.08);
}

#ascwo-backend-app .ascwo-ui-button-primary:hover,
#ascwo-backend-app .ascwo-ui-button-primary:focus,
#ascwo-backend-app .ascwo-ui-button-primary:active {
  background: var(--ascwo-ui-primary-hover);
  color: #ffffff !important;
  -webkit-text-fill-color: #ffffff !important;
}

#ascwo-backend-app .ascwo-ui-button-secondary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 34px;
  padding: 8px 14px;
  border: 1px solid #c9cccf;
  border-radius: var(--ascwo-ui-radius-control);
  background: var(--ascwo-ui-surface);
  color: var(--ascwo-ui-text-strong);
  font-size: var(--ascwo-ui-font-body);
  font-weight: var(--ascwo-ui-weight-semibold);
  line-height: 18px;
  cursor: pointer;
}

#ascwo-backend-app .ascwo-ui-button-secondary:hover {
  background: var(--ascwo-ui-surface-subdued);
}

#ascwo-backend-app .ascwo-ui-input {
  box-sizing: border-box;
  width: 100%;
  min-height: 36px;
  padding: 7px 12px;
  border: 1px solid var(--ascwo-ui-input-border);
  border-radius: var(--ascwo-ui-radius-control);
  background: var(--ascwo-ui-surface);
  color: var(--ascwo-ui-text);
  font-size: var(--ascwo-ui-font-body);
  line-height: 20px;
  outline: none;
}

#ascwo-backend-app .ascwo-ui-input:focus {
  border-color: var(--ascwo-ui-focus);
  box-shadow: 0 0 0 2px var(--ascwo-ui-focus) !important;
}

#ascwo-backend-app .ascwo-ui-table {
  width: 100%;
  border-collapse: collapse;
  color: var(--ascwo-ui-text);
  font-size: var(--ascwo-ui-font-body);
}

#ascwo-backend-app .ascwo-ui-table thead th {
  background: var(--ascwo-ui-section);
  color: var(--ascwo-ui-text-subdued);
  font-size: var(--ascwo-ui-font-sm);
  font-weight: var(--ascwo-ui-weight-semibold);
  line-height: 16px;
  padding: 10px 12px;
  text-align: left;
}

#ascwo-backend-app .ascwo-ui-table tbody td {
  border-top: 1px solid var(--ascwo-ui-border-soft);
  padding: 10px 12px;
  vertical-align: middle;
}

#ascwo-backend-app .ascwo-ui-pill {
  display: inline-flex;
  align-items: center;
  width: fit-content;
  min-height: 18px;
  padding: 1px 7px;
  border-radius: 20px;
  background: #eef2f6;
  color: #475467;
  font-size: var(--ascwo-ui-font-xs);
  font-weight: var(--ascwo-ui-weight-medium);
  line-height: 16px;
}

#ascwo-backend-app .ascwo-ui-pill-info {
  background: #e0f2fe;
  color: #0369a1;
}

#ascwo-backend-app .ascwo-settings-loader-icon {
  width: 28px;
  height: 28px;
  color: #007a72;
  animation: ascwo-ui-spin 0.8s linear infinite;
}

#ascwo-backend-app .ascwo-toggle.is-loading,
#ascwo-backend-app .ascwo-size-default-toggle.is-loading {
  cursor: wait;
}

#ascwo-backend-app .ascwo-toggle.is-loading > span,
#ascwo-backend-app .ascwo-toggle.is-loading > i,
#ascwo-backend-app .ascwo-size-default-toggle.is-loading > span {
  opacity: 0;
}

#ascwo-backend-app .ascwo-toggle.is-loading::after,
#ascwo-backend-app .ascwo-size-default-toggle.is-loading::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 12px;
  height: 12px;
  margin: -6px 0 0 -6px;
  border: 2px solid rgba(255, 255, 255, 0.55);
  border-top-color: #fff;
  border-radius: 50%;
  animation: ascwo-ui-spin 0.8s linear infinite;
}

#ascwo-backend-app .ascwo-editor-setup-loading {
  display: flex;
  min-height: 180px;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--ascwo-ui-border);
  border-radius: var(--ascwo-ui-radius-card);
  background: var(--ascwo-ui-surface);
}

#ascwo-backend-app .ascwo-editor-setup-loading::after {
  content: "";
  width: 24px;
  height: 24px;
  border: 3px solid #d9dee8;
  border-top-color: var(--ascwo-ui-primary);
  border-radius: 50%;
  animation: ascwo-ui-spin 0.8s linear infinite;
}

@keyframes ascwo-ui-spin {
  to {
    transform: rotate(360deg);
  }
}

#ascwo-backend-app .ascwo-ui-accordion-body {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-left: 12px;
  padding-left: 10px;
  border-left: 1px solid var(--ascwo-ui-border-soft);
  background: transparent;
  box-shadow: none;
}
</style>
