<template lang="">
    <div v-if="!isFetching">
        <div class="aso-bg-[#F4F4F4] aso-p-2 aso-space-x-6 aso-justify-center aso-items-center aso-flex aso-border-solid aso-border-[1px] aso-border-[#DDDDDD]">
            <div class="">
                <button @click="()=>showStep='customizer-options'" :class="`aso-flex aso-text-[12px] aso-px-6 aso-p-2 aso-w-fit aso-h-fit aso-bg-white aso-rounded aso-border-none aso-text-black aso-font-semibold ${ showStep== 'customizer-options' ?'aso-font-bold aso-text-[#016464] aso-bg-[#E1E1E1]':''} hover:aso-bg-[#E1E1E1] hover:aso-text-[#016464] aso-cursor-pointer`">
                    Customizer options
                </button>
            </div>
            <div class="">
                <button @click="()=>showStep='sign-part'" :class="`aso-flex aso-text-[12px] aso-px-6 aso-p-2 aso-w-fit aso-h-fit aso-bg-white aso-rounded aso-border-none aso-text-black aso-font-semibold ${ showStep== 'sign-part' ?'aso-font-bold aso-text-[#016464] aso-bg-[#E1E1E1]':''} hover:aso-bg-[#E1E1E1] hover:aso-text-[#016464] aso-cursor-pointer`">
                    Sign Part
                </button>
            </div>
            <div class="">
                <button @click="()=>showStep='text'" :class="`aso-flex aso-text-[12px] aso-px-6 aso-p-2 aso-w-fit aso-h-fit aso-bg-white aso-rounded aso-border-none aso-text-black aso-font-semibold ${ showStep== 'text' ?'aso-font-bold aso-text-[#016464] aso-bg-[#E1E1E1]':''} hover:aso-bg-[#E1E1E1] hover:aso-text-[#016464] aso-cursor-pointer`">
                    Text
                </button>
            </div>
            <div class="">
                <button @click="()=>showStep='image'" :class="`aso-flex aso-text-[12px] aso-px-6 aso-p-2 aso-w-fit aso-h-fit aso-bg-white aso-rounded aso-border-none aso-text-black aso-font-semibold ${ showStep== 'image' ?'aso-font-bold aso-text-[#016464] aso-bg-[#E1E1E1]':''} hover:aso-bg-[#E1E1E1] hover:aso-text-[#016464] aso-cursor-pointer`">
                    Image
                </button>
            </div>
        </div>
    </div>
    <div v-if="isFetching" class="aso-bg-white aso-border-solid aso-border aso-border-[#D1D1D1] aso-flex aso-flex-col aso-space-y-2 aso-justify-center aso-items-center aso-w-full aso-h-[306px] p-4">
        <img class="aso-w-[200px] aso-h-[200px]" src="../../../../../../assets/icons/ic_loading.svg" alt="">
    </div>
    <div v-if="!isFetching">
        <CustomizerOptions v-if="showStep == 'customizer-options'" :data="customizerSigns.customizer" :fetch-settings="fetchCustomizerSignsSettings"/>
        <Image v-if="showStep == 'image'" :data="customizerSigns.image" :fetch-settings="fetchCustomizerSignsSettings"/>
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