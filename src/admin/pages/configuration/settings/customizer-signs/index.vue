<template lang="">
    <div v-if="!isFetching" class="asowp-space-y-1 asowp-sticky asowp-top-[124px] asowp-z-[999] asowp-w-full asowp-shadow-md asowp-translate-y-2">
        <div class="asowp-bg-[#F4F4F4] asowp-p-2 asowp-space-x-6 asowp-justify-center asowp-items-center asowp-flex asowp-border-solid asowp-border-[1px] asowp-border-[#DDDDDD]">
            <div class="">
                <button @click="()=>{showStep='customizer-options'}" :class="`asowp-flex asowp-text-[12px] asowp-px-6 asowp-p-2 asowp-w-fit asowp-h-fit asowp-bg-white asowp-rounded asowp-border-none asowp-text-black asowp-font-semibold ${ showStep== 'customizer-options' ?'asowp-font-bold asowp-text-[#016464] asowp-bg-[#E1E1E1]':''} hover:asowp-bg-[#E1E1E1] hover:asowp-text-[#016464] asowp-cursor-pointer`">
                    {{ __("Customizer options", "all-signs-options-pro") }}
                </button>
            </div>
            <div class="">
                <button @click="()=>{showStep='sign-part'}" :class="`asowp-flex asowp-text-[12px] asowp-px-6 asowp-p-2 asowp-w-fit asowp-h-fit asowp-bg-white asowp-rounded asowp-border-none asowp-text-black asowp-font-semibold ${ showStep== 'sign-part' ?'asowp-font-bold asowp-text-[#016464] asowp-bg-[#E1E1E1]':''} hover:asowp-bg-[#E1E1E1] hover:asowp-text-[#016464] asowp-cursor-pointer`">
                    {{ __("Sign Part", "all-signs-options-pro") }}
                </button>
            </div>
            <div class="">
                <button @click="()=>{showStep='text'}" :class="`asowp-flex asowp-text-[12px] asowp-px-6 asowp-p-2 asowp-w-fit asowp-h-fit asowp-bg-white asowp-rounded asowp-border-none asowp-text-black asowp-font-semibold ${ showStep== 'text' ?'asowp-font-bold asowp-text-[#016464] asowp-bg-[#E1E1E1]':''} hover:asowp-bg-[#E1E1E1] hover:asowp-text-[#016464] asowp-cursor-pointer`">
                    {{ __("Text", "all-signs-options-pro") }}
                </button>
            </div>
            <div class="">
                <button @click="()=>{showStep='image'}" :class="`asowp-flex asowp-text-[12px] asowp-px-6 asowp-p-2 asowp-w-fit asowp-h-fit asowp-bg-white asowp-rounded asowp-border-none asowp-text-black asowp-font-semibold ${ showStep== 'image' ?'asowp-font-bold asowp-text-[#016464] asowp-bg-[#E1E1E1]':''} hover:asowp-bg-[#E1E1E1] hover:asowp-text-[#016464] asowp-cursor-pointer`">
                    {{ __("Image", "all-signs-options-pro") }}
                </button>
            </div>
        </div>
    </div>
    <div v-if="isFetching" class="asowp-bg-white asowp-border-solid asowp-border asowp-border-[#D1D1D1] asowp-flex asowp-flex-col asowp-space-y-2 asowp-justify-center asowp-items-center asowp-w-full asowp-h-[306px] p-4">
        <img class="asowp-w-[200px] asowp-h-[200px]" src="../../../../../../assets/icons/ic_loading.svg" alt="">
    </div>
    <div v-if="!isFetching">
        <CustomizerOptions v-if="showStep == 'customizer-options'" :data="customizerSigns.customizerOptions" :fetch-settings="fetchCustomizerSignsSettings"/>
        <Image v-if="showStep == 'image'" :data="customizerSigns.images" :fetch-settings="fetchCustomizerSignsSettings"/>
        <Text v-if="showStep == 'text'" :data="customizerSigns.text" :fetch-settings="fetchCustomizerSignsSettings"/>
        <SignPart v-if="showStep == 'sign-part'" :data="customizerSigns.signPart" :fetch-settings="fetchCustomizerSignsSettings"/>
    </div>
</template>
<script setup>
import api from '@/admin/Api/api';
import { useRoute } from 'vue-router';
import { onMounted, ref } from 'vue';
import CustomizerOptions from './customizer-options.vue';
import Image from './image.vue';
import SignPart from './sign-part.vue';
import Text from './text.vue';
import { __, _x, _n, _nx, sprintf, setLocaleData } from "@wordpress/i18n";
const showStep = ref('customizer-options');
const isFetching = ref(false);
const customizerSigns = ref({});
const route = useRoute()
const configId = ref(route.params.configId);

const fetchCustomizerSignsSettings = async () => {
    const result = await api.getCustomizerSignsSettings(configId.value);
    if(!result.message){
        customizerSigns.value = result;
    }
}
onMounted(async()=>{
    isFetching.value = true;
    await fetchCustomizerSignsSettings();
    isFetching.value = false;
})
</script>
<style lang="">
    
</style>