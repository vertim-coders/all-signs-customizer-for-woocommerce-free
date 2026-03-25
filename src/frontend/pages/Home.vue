<template>
  <div
    v-if="loadError"
    class="asowp-flex asowp-h-full asowp-w-full asowp-items-center asowp-justify-center asowp-p-6 asowp-text-center"
  >
    {{ loadError }}
  </div>
  <Templates v-else-if="isTemplates"/>
  <Default v-else-if="skin == 'default'" :config="configData" :manage="manageData" :currency="currencySymbol" :template="templateData" />
  <Couffo v-else-if="skin == 'couffo'" :config="configData" :manage="manageData" :currency="currencySymbol" :template="templateData" />
 
  <!-- <Modal v-if="skin == 'mono'" :config="configData" :manage="manageData" :currency="currencySymbol" :template="templateData" /> -->
</template>

<script setup>
import { defineAsyncComponent, ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import api from "@/frontend/api";

const Default = defineAsyncComponent(() => import("./configurateur/Default/index.vue"));
const Couffo = defineAsyncComponent(() => import("./configurateur/Couffo/index.vue"));
const Templates = defineAsyncComponent(() => import("./Templates/index.vue"));

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
      asowp_configurator_data = result;
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
      if(asowp_data.page == 'configurator'){
        skin.value = asowp_configurator_data.skin;
        configData.value = asowp_configurator_data.currentConfig;
        manageData.value = asowp_configurator_data.managesData;
        currencySymbol.value = asowp_configurator_data.currencySymbol
        templateData.value = asowp_configurator_data.templates
      }else {
        isTemplates.value = true;
      }
    }
  } catch (error) {
    console.error('ASOWP frontend failed to load preview data.', error);
    loadError.value = asowp_data.page === 'admin'
      ? 'Unable to load the configurator preview.'
      : 'Unable to load the configurator.';
  }
});

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
