<template>
  <!-- L'id est utilisé par le configurateur pour retirer ce squelette une fois monté. -->
  <div id="ascwo-configurator-loader" class="ascwo-sk" role="status" aria-busy="true">
    <span class="ascwo-sk__sr">{{ __("Loading configurator…", "all-signs-customizer-for-woocommerce") }}</span>

    <div class="ascwo-sk__top" aria-hidden="true">
      <span class="ascwo-sk__b ascwo-sk__icon"></span>
      <span class="ascwo-sk__b ascwo-sk__icon"></span>
      <span class="ascwo-sk__b ascwo-sk__line" style="width: 180px"></span>
    </div>

    <div class="ascwo-sk__body" aria-hidden="true">
      <div class="ascwo-sk__rail">
        <div v-for="i in steps" :key="i" class="ascwo-sk__railitem">
          <span class="ascwo-sk__b ascwo-sk__icon"></span>
          <span class="ascwo-sk__b ascwo-sk__line" style="width: 48px"></span>
        </div>
      </div>

      <div class="ascwo-sk__stage">
        <div class="ascwo-sk__sign">
          <span class="ascwo-sk__b ascwo-sk__line ascwo-sk__line--lg"></span>
        </div>
        <div class="ascwo-sk__toolbar">
          <span class="ascwo-sk__b ascwo-sk__pill"></span>
          <span class="ascwo-sk__b ascwo-sk__icon"></span>
          <span class="ascwo-sk__b ascwo-sk__icon"></span>
          <span class="ascwo-sk__b ascwo-sk__icon"></span>
        </div>
      </div>

      <div class="ascwo-sk__panel">
        <div class="ascwo-sk__panelbody">
          <span class="ascwo-sk__b ascwo-sk__line" style="width: 32px"></span>
          <span class="ascwo-sk__b ascwo-sk__line ascwo-sk__line--title"></span>
          <div class="ascwo-sk__swatches">
            <span v-for="i in 6" :key="i" class="ascwo-sk__b ascwo-sk__swatch"></span>
          </div>
          <span class="ascwo-sk__b ascwo-sk__line" style="width: 40%"></span>
          <span class="ascwo-sk__b ascwo-sk__card"></span>
          <span class="ascwo-sk__b ascwo-sk__card"></span>
        </div>
        <div class="ascwo-sk__panelfoot">
          <span class="ascwo-sk__b ascwo-sk__btn"></span>
          <span class="ascwo-sk__b ascwo-sk__btn"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { __ } from "@wordpress/i18n";

defineProps({
  // Nombre d'étapes affichées dans le rail (le mini configurateur en a moins).
  steps: { type: Number, default: 6 },
});
</script>

<!-- Styles : src/global/scss/_configurator-skeleton.scss (partagés avec le front). -->
