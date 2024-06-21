<template>
  <Templates v-if="isTemplates"/>
  <Default v-if="skin == 'default'" :config="configData" :manage="manageData" :currency="currencySymbol" :template="templateData" />
  <Couffo v-if="skin == 'couffo'" :config="configData" :manage="manageData" :currency="currencySymbol" :template="templateData" />
</template>

<script setup>
import { ref, onMounted } from "vue";
import Default from "./configurateur/Default/index.vue"
import Couffo from "./configurateur/Couffo/index.vue"
import Templates from './Templates/index.vue'
import { useRoute } from "vue-router";
import api from "@/admin/Api/api";
const route = useRoute();
const skin = ref('');
var configData = ref();
var manageData = ref();
var currencySymbol = ref("");
var templateData = ref({});
const isTemplates = ref(false);
onMounted(async() => {
  if(route.name == 'preview-back' || route.name == 'template-maker'){
    const result = await api.getPreviewConfig(route.params.configId);
    aso_configurator_data = result;
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
    if(aso_data.page == 'configurator'){
      skin.value = aso_configurator_data.skin;
      // console.log(aso_configurator_data, 'skin actif');
      configData.value = aso_configurator_data.currentConfig;
      manageData.value = aso_configurator_data.managesData;
      currencySymbol.value = aso_configurator_data.currencySymbol
      templateData.value = aso_configurator_data.templates
    }else {
      isTemplates.value = true;
    }
  }
});

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>