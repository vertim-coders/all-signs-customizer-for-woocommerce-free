<template lang="">
    <div v-if="!isFetching" class="aso-space-y-1 aso-sticky aso-top-[124px] aso-z-[999] aso-w-full aso-shadow-md aso-translate-y-2">
        <div class="aso-bg-[#F4F4F4] aso-p-2 aso-space-x-6 aso-justify-center aso-items-center aso-flex aso-border-solid aso-border-[1px] aso-border-[#DDDDDD]">
            <div class="">
                <button @click="()=>{showStep = 'visualizer'}" :class="`aso-flex aso-text-[12px] aso-px-6 aso-p-2 aso-w-fit aso-h-fit aso-bg-white aso-rounded aso-border-none aso-text-black aso-font-semibold ${ showStep== 'visualizer' ?'aso-font-bold aso-text-[#016464] aso-bg-[#E1E1E1]':''} hover:aso-bg-[#E1E1E1] hover:aso-text-[#016464] aso-cursor-pointer`">
                    Visualizer
                </button>
            </div>
            <div class="">
                <button @click="()=>{showStep = 'upload-design'}" :class="`aso-flex aso-text-[12px] aso-px-6 aso-p-2 aso-w-fit aso-h-fit aso-bg-white aso-rounded aso-border-none aso-text-black aso-font-semibold ${ showStep== 'upload-design' ?'aso-font-bold aso-text-[#016464] aso-bg-[#E1E1E1]':''} hover:aso-bg-[#E1E1E1] hover:aso-text-[#016464] aso-cursor-pointer`">
                    Upload design
                </button>
            </div>
            <div class="">
                <button @click="()=>{showStep = 'images'}" :class="`aso-flex aso-text-[12px] aso-px-6 aso-p-2 aso-w-fit aso-h-fit aso-bg-white aso-rounded aso-border-none aso-text-black aso-font-semibold ${ showStep== 'images' ?'aso-font-bold aso-text-[#016464] aso-bg-[#E1E1E1]':''} hover:aso-bg-[#E1E1E1] hover:aso-text-[#016464] aso-cursor-pointer`">
                    Images
                </button>
            </div>
        </div>
    </div>
    <div v-if="isFetching" class="aso-bg-white aso-border-solid aso-border aso-border-[#D1D1D1] aso-flex aso-flex-col aso-space-y-2 aso-justify-center aso-items-center aso-w-full aso-h-[306px] p-4">
        <img class="aso-w-[200px] aso-h-[200px]" src="../../../../../../assets/icons/ic_loading.svg" alt="">
    </div>
    <div v-if="!isFetching">
        <Visualizer v-if="showStep == 'visualizer'" :data="languageImages.main" :fetch-settings="fetchLanguageImageSettings"/>
        <Images v-if="showStep == 'images'" :data="languageImages.images" :fetch-settings="fetchLanguageImageSettings"/>
        <UploadDesign v-show="showStep == 'upload-design'" :data="languageImages.uploadDesign" :fetch-settings="fetchLanguageImageSettings"/>
        
    </div>
</template>
<script setup>
import { useRoute } from 'vue-router';
import { onMounted, ref } from 'vue';
import api from '@/admin/Api/api';
import Visualizer from './visualizer.vue';
import Images from './images.vue';
import UploadDesign from './upload-design.vue';
const showStep = ref('visualizer');
const isFetching = ref(false);
const languageImages = ref({});
const route = useRoute()
const configId = ref(route.params.configId);
const fetchLanguageImageSettings = async () => {
    const result = await api.getLanguageImagesSettings(configId.value);
    if(!result.message){
        languageImages.value = result;
    }
}
onMounted(async()=>{
    isFetching.value = true;
    await fetchLanguageImageSettings();
    isFetching.value = false;
})
</script>
<style lang="">
    
</style>