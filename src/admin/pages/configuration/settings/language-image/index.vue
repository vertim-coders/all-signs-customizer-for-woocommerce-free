<template lang="">
    <div v-if="!isFetching" class="asowp-space-y-1 asowp-sticky asowp-top-[124px] asowp-z-[999] asowp-w-full asowp-shadow-md asowp-translate-y-2">
        <div class="asowp-bg-[#F4F4F4] asowp-p-2 asowp-space-x-6 asowp-justify-center asowp-items-center asowp-flex asowp-border-solid asowp-border-[1px] asowp-border-[#DDDDDD]">
            <div class="">
                <button @click="()=>{showStep = 'visualizer'}" :class="`asowp-flex asowp-text-[12px] asowp-px-6 asowp-p-2 asowp-w-fit asowp-h-fit asowp-bg-white asowp-rounded asowp-border-none asowp-text-black asowp-font-semibold ${ showStep== 'visualizer' ?'asowp-font-bold asowp-text-[#016464] asowp-bg-[#E1E1E1]':''} hover:asowp-bg-[#E1E1E1] hover:asowp-text-[#016464] asowp-cursor-pointer`">
                    Visualizer
                </button>
            </div>
            <div class="">
                <button @click="()=>{showStep = 'upload-design'}" :class="`asowp-flex asowp-text-[12px] asowp-px-6 asowp-p-2 asowp-w-fit asowp-h-fit asowp-bg-white asowp-rounded asowp-border-none asowp-text-black asowp-font-semibold ${ showStep== 'upload-design' ?'asowp-font-bold asowp-text-[#016464] asowp-bg-[#E1E1E1]':''} hover:asowp-bg-[#E1E1E1] hover:asowp-text-[#016464] asowp-cursor-pointer`">
                    Upload design
                </button>
            </div>
            <div class="">
                <button @click="()=>{showStep = 'images'}" :class="`asowp-flex asowp-text-[12px] asowp-px-6 asowp-p-2 asowp-w-fit asowp-h-fit asowp-bg-white asowp-rounded asowp-border-none asowp-text-black asowp-font-semibold ${ showStep== 'images' ?'asowp-font-bold asowp-text-[#016464] asowp-bg-[#E1E1E1]':''} hover:asowp-bg-[#E1E1E1] hover:asowp-text-[#016464] asowp-cursor-pointer`">
                    Images
                </button>
            </div>
        </div>
    </div>
    <div v-if="isFetching" class="asowp-bg-white asowp-border-solid asowp-border asowp-border-[#D1D1D1] asowp-flex asowp-flex-col asowp-space-y-2 asowp-justify-center asowp-items-center asowp-w-full asowp-h-[306px] p-4">
        <img class="asowp-w-[200px] asowp-h-[200px]" src="../../../../../../assets/icons/ic_loading.svg" alt="">
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