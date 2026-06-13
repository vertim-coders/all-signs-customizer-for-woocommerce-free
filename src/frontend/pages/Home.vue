<template>
  <div
    v-if="loadError"
    class="ascwo-flex ascwo-h-full ascwo-w-full ascwo-items-center ascwo-justify-center ascwo-p-6 ascwo-text-center"
  >
    {{ loadError }}
  </div>
  <Templates v-else-if="isTemplates"/>
  <Default v-else-if="skin == 'default'" :config="configData" :manage="manageData" :currency="currencySymbol" :template="templateData" />
  <Couffo v-else-if="skin == 'couffo'" :config="configData" :manage="manageData" :currency="currencySymbol" :template="templateData" />
 
  <!-- <Modal v-if="skin == 'mono'" :config="configData" :manage="manageData" :currency="currencySymbol" :template="templateData" /> -->
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import api from "@/frontend/api";
import Default from "./configurateur/Default/index.vue";
import Couffo from "./configurateur/Couffo/index.vue";
import Templates from "./Templates/index.vue";

const route = useRoute();
const skin = ref('');
var configData = ref();
var manageData = ref();
var currencySymbol = ref("");
var templateData = ref({});
const isTemplates = ref(false);
const loadError = ref('');
onMounted(async() => {
  try {
    if(route.name == 'preview-back' || route.name == 'template-maker'){
      const result = await api.getPreviewConfig(route.params.configId);
      ascwo_configurator_data = result;
      skin.value = result.skin;
      configData.value = result.currentConfig;
      manageData.value = result.managesData;
      currencySymbol.value = result.currencySymbol;
      const style = document.createElement('style')
      for (let index = 0; index < result.managesData.fonts.length; index++) {
        const font = result.managesData.fonts[index];
        const url = font.url.replace('http://', '//');
        style.innerHTML += `@font-face { font-family: ${font.label.replace(/ /,'-')}; src: url(${url}) format('truetype'); }`
      }

      if(result.currentConfig.data.settings.themeColors.customCSS && result.currentConfig.data.settings.themeColors.customCSS.trim()!=='') {
        style.innerHTML += result.currentConfig.data.settings.themeColors.customCSS;
      }
      document.head.appendChild(style);

    }else{
      if(ascwo_data.page == 'configurator'){
        skin.value = ascwo_configurator_data.skin;
        configData.value = ascwo_configurator_data.currentConfig;
        manageData.value = ascwo_configurator_data.managesData;
        currencySymbol.value = ascwo_configurator_data.currencySymbol
        templateData.value = ascwo_configurator_data.templates
      }else {
        isTemplates.value = true;
      }
    }
  } catch (error) {
    console.error('ASCWO frontend failed to load preview data.', error);
    loadError.value = ascwo_data.page === 'admin'
      ? 'Unable to load the configurator preview.'
      : 'Unable to load the configurator.';
  }
});

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
