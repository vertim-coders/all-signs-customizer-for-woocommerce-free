<template>
  <div :class="['ascwo-pro-upsell', { 'ascwo-pro-upsell--compact': compact }]" role="note">
    <span class="ascwo-pro-upsell__icon" aria-hidden="true">
      <LockIcon :size="compact ? 14 : 16" />
    </span>
    <div class="ascwo-pro-upsell__body">
      <strong v-if="title" class="ascwo-pro-upsell__title">{{ title }}</strong>
      <span class="ascwo-pro-upsell__message">{{ message }}</span>
    </div>
    <a
      :href="PRO_UPGRADE_URL"
      target="_blank"
      rel="noopener noreferrer"
      class="ascwo-pro-upsell__link"
      @click.stop
    >
      {{ linkLabel || __("Upgrade to Pro", "all-signs-customizer-for-woocommerce") }}
      <ExternalLinkIcon :size="13" aria-hidden="true" />
      <span class="screen-reader-text">{{ __("(opens in a new tab)", "all-signs-customizer-for-woocommerce") }}</span>
    </a>
  </div>
</template>

<script setup>
/* global defineProps */
import { __ } from "@wordpress/i18n";
import { ExternalLinkIcon, LockIcon } from "lucide-vue-next";
import { PRO_UPGRADE_URL } from "@/admin/utils/pro";

defineProps({
  title: { type: String, default: "" },
  message: { type: String, required: true },
  linkLabel: { type: String, default: "" },
  compact: { type: Boolean, default: false },
});
</script>

