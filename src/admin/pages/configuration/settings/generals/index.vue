<template>
    <div v-if="!isFetching" class="aso-space-y-1 aso-sticky aso-top-[130px] aso-z-[9999] aso-w-full aso-shadow-md aso-translate-y-2">
        <div class="aso-bg-[#F4F4F4] aso-p-2 aso-space-x-6 aso-justify-center aso-items-center aso-flex aso-border-solid aso-border-[1px] aso-border-[#DDDDDD]">
            <div class="">
                <button @click="()=>{showStep = 'product'}" :class="`aso-flex aso-text-[12px] aso-px-6 aso-p-2 aso-w-fit aso-h-fit aso-bg-white aso-rounded aso-border-none aso-text-black aso-font-semibold ${ showStep== 'product' ?'aso-font-bold aso-text-[#016464] aso-bg-[#E1E1E1]':''} hover:aso-bg-[#E1E1E1] hover:aso-text-[#016464] aso-cursor-pointer`">
                    Product
                </button>
            </div>
            <div class="">
                <button @click="()=>{showStep = 'output'}" :class="`aso-flex aso-text-[12px] aso-px-6 aso-p-2 aso-w-fit aso-h-fit aso-bg-white aso-rounded aso-border-none aso-text-black aso-font-semibold ${ showStep== 'output' ?'aso-font-bold aso-text-[#016464] aso-bg-[#E1E1E1]':''} hover:aso-bg-[#E1E1E1] hover:aso-text-[#016464] aso-cursor-pointer`">
                    Output
                </button>
            </div>
            <div class="">
                <button @click="()=>{showStep = 'mobiles-options'}" :class="`aso-flex aso-text-[12px] aso-px-6 aso-p-2 aso-w-fit aso-h-fit aso-bg-white aso-rounded aso-border-none aso-text-black aso-font-semibold ${ showStep== 'mobiles-options' ?'aso-font-bold aso-text-[#016464] aso-bg-[#E1E1E1]':''} hover:aso-bg-[#E1E1E1] hover:aso-text-[#016464] aso-cursor-pointer`">
                    Mobile options
                </button>
            </div>
        </div>
    </div>
    <div v-if="isFetching" class="aso-bg-white aso-border-solid aso-border aso-border-[#D1D1D1] aso-flex aso-flex-col aso-space-y-2 aso-justify-center aso-items-center aso-w-full aso-h-[306px] p-4">
        <img class="aso-w-[200px] aso-h-[200px]" src="../../../../../../assets/icons/ic_loading.svg" alt="">
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