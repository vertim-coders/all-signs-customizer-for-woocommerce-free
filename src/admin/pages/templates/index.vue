<template>
  <div class="ascwo-template-shell">
    <nav class="ascwo-template-tabs" aria-label="Templates navigation">
      <button
        type="button"
        :class="{ 'is-active': route.name === 'templates-main' }"
        @click="router.push('/templates/main')"
      >
        {{ __("Templates", "all-signs-customizer-for-woocommerce-pro") }}
      </button>
      <button
        type="button"
        :class="{ 'is-active': route.name === 'templates-categories' }"
        @click="router.push('/templates/categories')"
      >
        {{ __("Categories", "all-signs-customizer-for-woocommerce-pro") }}
      </button>
    </nav>

    <Templates v-if="route.name === 'templates-main'" />
    <Categories v-if="route.name === 'templates-categories'" />
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import Templates from "./templates.vue";
import Categories from "./categories.vue";
import { __ } from "@wordpress/i18n";

const route = useRoute();
const router = useRouter();

onMounted(() => {
  if (route.path === "/templates") {
    router.replace("/templates/main");
  }
});
</script>

<style>
.ascwo-template-shell {
  display: grid;
  gap: 14px;
  padding: 12px 14px 18px;
  color: #202223;
  background: #f3f3f3;
}

.ascwo-template-tabs {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 18px;
  min-height: 52px;
  padding: 8px;
  background: #ffffff;
  border: 1px solid #dfe3e8;
  border-radius: 10px;
}

.ascwo-template-tabs button {
  min-width: 92px;
  min-height: 34px;
  padding: 7px 18px;
  color: #202223;
  background: #ffffff;
  border: 0;
  border-radius: 6px;
  font-size: 13px;
  line-height: 18px;
  font-weight: 700;
  cursor: pointer;
  outline: none;
  box-shadow: none;
}

.ascwo-template-tabs button:hover,
.ascwo-template-tabs button:focus,
.ascwo-template-tabs button:active {
  color: #202223;
  background: #ffffff;
  box-shadow: none;
}

.ascwo-template-tabs button.is-active {
  color: #006e52;
  background: #e5f1f1;
}
</style>
