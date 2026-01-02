<template>
    <div v-if="!isFetching" class="asowp-space-y-1 asowp-sticky asowp-top-[124px] asowp-z-[999] asowp-w-full asowp-shadow-md asowp-translate-y-2">
        <div class="asowp-bg-[#F4F4F4] asowp-p-2 asowp-space-x-6 asowp-justify-center asowp-items-center asowp-flex asowp-border-solid asowp-border-[1px] asowp-border-[#DDDDDD]">
            <div class="">
                <button @click="()=>{showStep = 'product'}" :class="`asowp-flex asowp-text-[12px] asowp-px-6 asowp-p-2 asowp-w-fit asowp-h-fit asowp-bg-white asowp-rounded asowp-border-none asowp-text-black asowp-font-semibold ${ showStep== 'product' ?'asowp-font-bold asowp-text-[#016464] asowp-bg-[#E1E1E1]':''} hover:asowp-bg-[#E1E1E1] hover:asowp-text-[#016464] asowp-cursor-pointer`">
                    {{ __("Product", "all-signs-options-pro") }}
                </button>
            </div>
            <div class="">
                <button @click="()=>{showStep = 'output'}" :class="`asowp-flex asowp-text-[12px] asowp-px-6 asowp-p-2 asowp-w-fit asowp-h-fit asowp-bg-white asowp-rounded asowp-border-none asowp-text-black asowp-font-semibold ${ showStep== 'output' ?'asowp-font-bold asowp-text-[#016464] asowp-bg-[#E1E1E1]':''} hover:asowp-bg-[#E1E1E1] hover:asowp-text-[#016464] asowp-cursor-pointer`">
                    {{ __("Output", "all-signs-options-pro") }}
                </button>
            </div>
            <div class="">
                <button @click="()=>{showStep = 'mobiles-options'}" :class="`asowp-flex asowp-text-[12px] asowp-px-6 asowp-p-2 asowp-w-fit asowp-h-fit asowp-bg-white asowp-rounded asowp-border-none asowp-text-black asowp-font-semibold ${ showStep== 'mobiles-options' ?'asowp-font-bold asowp-text-[#016464] asowp-bg-[#E1E1E1]':''} hover:asowp-bg-[#E1E1E1] hover:asowp-text-[#016464] asowp-cursor-pointer`">
                    {{ __("Mobile options", "all-signs-options-pro") }}
                </button>
            </div>
        </div>
    </div>
    <div v-if="isFetching" class="asowp-bg-white asowp-border-solid asowp-border asowp-border-[#D1D1D1] asowp-flex asowp-flex-col asowp-space-y-2 asowp-justify-center asowp-items-center asowp-w-full asowp-h-[306px] p-4">
        <img class="asowp-w-[200px] asowp-h-[200px]" src="../../../../../../assets/icons/ic_loading.svg" alt="">
    </div>
    <div v-if="!isFetching">
        <Product v-if="showStep == 'product'" :data="generals.product" :fetch-settings="fetchGeneralSettings"/>
        <Output v-if="showStep == 'output'" :data="generals.output" :fetch-settings="fetchGeneralSettings"/>
        <Mobile v-if="showStep == 'mobiles-options'" :data="generals.mobile" :fetch-settings="fetchGeneralSettings"/>
    </div>
</template>
<script setup>
import Product from './product.vue'
import Output from './output.vue'
import Mobile from './mobiles-options.vue';
import { useRoute } from 'vue-router';
import { onMounted, ref } from 'vue';
import api from '@/admin/Api/api';

import { __, _x, _n, _nx, sprintf, setLocaleData } from "@wordpress/i18n";
const showStep = ref('product');
const isFetching = ref(false);
const generals = ref({});
const route = useRoute()
const configId = ref(route.params.configId);
const fetchGeneralSettings = async () => {
    const result = await api.getGeneralSettings(configId.value);
    if(!result.message){
        generals.value = result;
    }
}
onMounted(async()=>{
    isFetching.value = true;
    await fetchGeneralSettings();
    isFetching.value = false;
})
</script>
<style>
    
</style>