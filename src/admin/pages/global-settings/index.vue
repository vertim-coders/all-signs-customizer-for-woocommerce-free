<template>
  <div class="ascwo-global-settings ascwo-min-h-screen ascwo-bg-[#f1f1f1] ascwo-p-4">
    <section class="ascwo-card ascwo-mb-3">
      <div class="ascwo-card-inner">
        <h1 class="ascwo-title">{{ __("Global Settings", "all-signs-customizer-for-woocommerce") }}</h1>
      </div>
    </section>

    <section class="ascwo-card ascwo-tabs-card ascwo-mb-3">
      <nav class="ascwo-tabs">
        <button
          v-for="tab in tabs"
          :key="tab.name"
          v-show="showTab(tab)"
          type="button"
          @click="router.push(tab.path)"
          :class="['ascwo-tab', route.name === tab.name ? 'is-active' : '']"
        >
          <component :is="tab.icon" class="ascwo-w-4 ascwo-h-4" />
          <span>{{ tab.label }}</span>
        </button>
      </nav>
    </section>

    <div class="ascwo-content">
      <ConfigurationPage v-if="$route.name === 'global-settings-configuration-page'" />
      <Output v-if="$route.name === 'global-settings-output'" />
      <Shapes v-if="$route.name === 'global-settings-shape'" />
      <FixingMethods v-if="$route.name === 'global-settings-fixing-method'" />
      <Border v-if="$route.name === 'global-settings-border'" />
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import ConfigurationPage from "./configuration-page/index.vue";
import Output from "./output/index.vue";
import Shapes from "./shapes/index.vue";
import FixingMethods from "./fixing-methods/index.vue";
import Border from "./border/index.vue";
import { FileCogIcon, PrinterIcon, ShapesIcon, SquareIcon, WrenchIcon } from "lucide-vue-next";
import { __ } from "@wordpress/i18n";

const router = useRouter();
const route = useRoute();

const showTab = () => true;

const tabs = [
  { label: __("Configuration page", "all-signs-customizer-for-woocommerce"), icon: FileCogIcon, name: "global-settings-configuration-page", path: "/settings/configuration-page" },
  { label: __("Output", "all-signs-customizer-for-woocommerce"), icon: PrinterIcon, name: "global-settings-output", path: "/settings/output" },
  { label: __("Shapes", "all-signs-customizer-for-woocommerce"), icon: ShapesIcon, name: "global-settings-shape", path: "/settings/shape" },
  { label: __("Fixing method", "all-signs-customizer-for-woocommerce"), icon: WrenchIcon, name: "global-settings-fixing-method", path: "/settings/fixing-method" },
  { label: __("Border", "all-signs-customizer-for-woocommerce"), icon: SquareIcon, name: "global-settings-border", path: "/settings/border" },
];

onMounted(() => {
  if (route.path === "/settings" || route.path === "/global-settings") {
    router.replace("/settings/output");
  }
});
</script>

<style scoped>
.ascwo-card {
  background: #fff;
  border: 1px solid #dfe3e8;
  border-radius: 10px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.08);
}

.ascwo-card-inner {
  padding: 18px 20px;
}

.ascwo-title {
  margin: 0;
  color: #303030;
  font-size: 16px;
  line-height: 22px;
  font-weight: 900;
}

.ascwo-tabs-card {
  position: sticky;
  top: 46px;
  z-index: 30;
}

.ascwo-tabs {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 56px;
  gap: 0;
  padding: 0 14px;
  overflow-x: auto;
  scrollbar-width: thin;
}

.ascwo-tab {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 56px;
  padding: 0 14px;
  border: 0;
  border-radius: 0;
  background: #fff;
  color: #111827;
  font-size: 14px;
  line-height: 20px;
  font-weight: 900;
  cursor: pointer;
  white-space: nowrap;
}

.ascwo-tab:hover {
  background: #fff;
  color: #007a72;
}

.ascwo-tab.is-active {
  background: #fff;
  color: #007a72;
}

.ascwo-tab.is-active::after {
  content: "";
  position: absolute;
  right: 12px;
  bottom: 0;
  left: 12px;
  height: 2px;
  border-radius: 999px;
  background: #007a72;
}

.ascwo-tab :deep(svg) {
  width: 20px;
  height: 20px;
  flex: 0 0 auto;
}

.ascwo-content {
  color: #303030;
}
</style>
