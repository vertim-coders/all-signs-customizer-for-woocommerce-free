<template>
  <div class="asowp-template-shell">
    <nav class="asowp-template-tabs" aria-label="Templates navigation">
      <button
        type="button"
        :class="{ 'is-active': state === 'templates' }"
        @click="state = 'templates'"
      >
        {{ __("Templates", "all-signs-options-pro") }}
      </button>
      <button
        type="button"
        :class="{ 'is-active': state === 'category' }"
        @click="state = 'category'"
      >
        {{ __("Categories", "all-signs-options-pro") }}
      </button>
    </nav>

    <Templates v-if="state === 'templates'" />
    <Categories v-if="state === 'category'" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import Templates from "./templates.vue";
import Categories from "./categories.vue";
import { __ } from "@wordpress/i18n";

const state = ref("templates");
</script>

<style>
.asowp-template-shell {
  display: grid;
  gap: 14px;
  padding: 12px 14px 18px;
  color: #202223;
  background: #f3f3f3;
}

.asowp-template-tabs {
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

.asowp-template-tabs button {
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

.asowp-template-tabs button:hover,
.asowp-template-tabs button:focus,
.asowp-template-tabs button:active {
  color: #202223;
  background: #ffffff;
  box-shadow: none;
}

.asowp-template-tabs button.is-active {
  color: #006e52;
  background: #e5f1f1;
}
</style>
