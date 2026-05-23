<template>
  <div class="asowp-global-settings asowp-min-h-screen asowp-bg-[#f1f1f1] asowp-p-4">
    <section class="asowp-card asowp-mb-3">
      <div class="asowp-card-inner">
        <h1 class="asowp-title">{{ __("Global Settings", "all-signs-options-pro") }}</h1>
      </div>
    </section>

    <section class="asowp-card asowp-tabs-card asowp-mb-3">
      <nav class="asowp-tabs">
        <button
          v-for="tab in tabs"
          :key="tab.name"
          v-show="tab.name !== 'global-settings-license' || !actualLink.includes(excludeLink)"
          type="button"
          @click="router.push(tab.path)"
          :class="['asowp-tab', route.name === tab.name ? 'is-active' : '']"
        >
          <component :is="tab.icon" class="asowp-w-4 asowp-h-4" />
          <span>{{ tab.label }}</span>
        </button>
      </nav>
    </section>

    <div class="asowp-content">
      <Licences v-if="$route.name === 'global-settings-license' && !actualLink.includes(excludeLink)" />
      <ConfigurationPage v-if="$route.name === 'global-settings-configuration-page'" />
      <Output v-if="$route.name === 'global-settings-output'" />
      <Shapes v-if="$route.name === 'global-settings-shapes'" />
      <FixingMethods v-if="$route.name === 'global-settings-fixing-methods'" />
      <Border v-if="$route.name === 'global-settings-border'" />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import Licences from "./license/index.vue";
import ConfigurationPage from "./configuration-page/index.vue";
import Output from "./output/index.vue";
import Shapes from "./shapes/index.vue";
import FixingMethods from "./fixing-methods/index.vue";
import Border from "./border/index.vue";
import { PrinterIcon, SettingsIcon, ShapesIcon, ShieldCheckIcon, SquareIcon, WrenchIcon } from "lucide-vue-next";
import { __ } from "@wordpress/i18n";

const router = useRouter();
const route = useRoute();

const excludeLink = ref("https://signsdesigner.us/public-demos");
const actualLink = ref(window.location.href);

const tabs = [
  { label: __("License", "all-signs-options-pro"), icon: ShieldCheckIcon, name: "global-settings-license", path: "/global-settings/license" },
  { label: __("Configuration page", "all-signs-options-pro"), icon: SettingsIcon, name: "global-settings-configuration-page", path: "/global-settings/configuration-page" },
  { label: __("Output", "all-signs-options-pro"), icon: PrinterIcon, name: "global-settings-output", path: "/global-settings/output" },
  { label: __("Shapes", "all-signs-options-pro"), icon: ShapesIcon, name: "global-settings-shapes", path: "/global-settings/shapes" },
  { label: __("Fixing methods", "all-signs-options-pro"), icon: WrenchIcon, name: "global-settings-fixing-methods", path: "/global-settings/fixing-methods" },
  { label: __("Border", "all-signs-options-pro"), icon: SquareIcon, name: "global-settings-border", path: "/global-settings/border" },
];

onMounted(() => {
  if (route.name === "global-settings") {
    router.replace("/global-settings/output");
  }
});
</script>

<style scoped>
.asowp-card {
  background: #fff;
  border: 1px solid #dfe3e8;
  border-radius: 10px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.08);
}

.asowp-card-inner {
  padding: 18px 20px;
}

.asowp-title {
  margin: 0;
  color: #303030;
  font-size: 16px;
  line-height: 22px;
  font-weight: 900;
}

.asowp-tabs-card {
  position: sticky;
  top: 46px;
  z-index: 30;
}

.asowp-tabs {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0;
  min-height: 56px;
  padding: 0 18px;
  overflow-x: auto;
}

.asowp-tab {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  min-height: 56px;
  padding: 0 16px;
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

.asowp-tab:hover {
  background: #fff;
  color: #007a72;
}

.asowp-tab.is-active {
  background: #fff;
  color: #007a72;
}

.asowp-tab.is-active::after {
  content: "";
  position: absolute;
  right: 12px;
  bottom: 0;
  left: 12px;
  height: 2px;
  border-radius: 999px;
  background: #007a72;
}

.asowp-tab :deep(svg) {
  width: 22px;
  height: 22px;
}

.asowp-content {
  color: #303030;
}
</style>
