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
  <div v-else class="asowp-hidden"></div>
 
  <!-- <Modal v-if="skin == 'mono'" :config="configData" :manage="manageData" :currency="currencySymbol" :template="templateData" /> -->
</template>

<script setup>
import { ref, onMounted, nextTick } from "vue";
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

const removeInitialLoaders = () => {
  document.querySelectorAll("#asowp-configurator-loader, #asowp-templates-loader").forEach((loader) => loader.remove());
};

const getAdminPreviewConfigId = () => {
  const mount = document.querySelector("#asowp-frontend-app[data-asowp-preview-config-id]");
  return mount?.dataset?.asowpPreviewConfigId || "";
};

const revealFrontend = async () => {
  await nextTick();
  window.setTimeout(removeInitialLoaders, 0);
};

onMounted(async() => {
  try {
    const adminPreviewConfigId = getAdminPreviewConfigId();
    if(route.name == 'preview-back' || route.name == 'template-maker' || adminPreviewConfigId){
      const result = await api.getPreviewConfig(route.params.configId || adminPreviewConfigId);
      asowp_configurator_data = result;
      skin.value = result.skin;
      configData.value = result.currentConfig;
      manageData.value = result.managesData;
      currencySymbol.value = result.currencySymbol;
      templateData.value = result.templates || {
        designFromTemplate: false,
        template: {},
      };
      const style = document.createElement('style')
      const fonts = result.managesData && Array.isArray(result.managesData.fonts) ? result.managesData.fonts : [];
      for (let index = 0; index < fonts.length; index++) {
        const font = fonts[index];
        const url = font.url.replace('http://', '//');
        style.innerHTML += `@font-face { font-family: ${font.label.replace(/ /,'-')}; src: url(${url}) format('truetype'); }`
      }

      if(result.currentConfig.data.settings.themeColors.customCSS && result.currentConfig.data.settings.themeColors.customCSS.trim()!=='') {
        style.innerHTML += result.currentConfig.data.settings.themeColors.customCSS;
      }
      document.head.appendChild(style);
      await revealFrontend();

    }else{
      if(asowp_data.page == 'configurator'){
        skin.value = asowp_configurator_data.skin;
        configData.value = asowp_configurator_data.currentConfig;
        manageData.value = asowp_configurator_data.managesData;
        currencySymbol.value = asowp_configurator_data.currencySymbol
        templateData.value = asowp_configurator_data.templates
        await revealFrontend();
      }else {
        isTemplates.value = true;
        await revealFrontend();
      }
    }
  } catch (error) {
    console.error('ASOWP frontend failed to load preview data.', error);
    loadError.value = asowp_data.page === 'admin'
      ? 'Unable to load the configurator preview.'
      : 'Unable to load the configurator.';
    await revealFrontend();
  }
});

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
