<template>
    <div>
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
    <Product v-if="showStep == 'product'"/>
    <Output v-if="showStep == 'output'"/>
    <MobilesOptions v-if="showStep == 'mobiles-options'"/>
</template>
<script setup>
import Product from './product.vue'
import Output from './output.vue'
import MobilesOptions from './mobiles-options.vue';
import { ref } from 'vue';

const showStep = ref('product');
</script>
<style>
    
</style>