<template>
  <div class="">
    <Default v-if="skin == 'default'" :config="configData" :manage="manageData"/>
    <Couffo v-if="skin == 'couffo'" :config="configData" :manage="manageData"/>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Default from "./configurateur/Default/index.vue"
import Couffo from "./configurateur/Couffo/index.vue"

const skin = ref('');
var configData = ref();
var manageData = ref();

onMounted(() => {
  skin.value = aso_confiurator_data.skin;
  // console.log(skin.value, 'skin actif');
  configData.value = aso_confiurator_data.currentConfig;
  manageData.value = aso_confiurator_data.managesData;
});

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>