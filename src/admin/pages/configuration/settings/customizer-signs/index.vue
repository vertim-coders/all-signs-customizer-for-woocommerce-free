<template lang="">
    <div>
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
    <CustomizerOptions v-if="showStep == 'customizer-options'"/>
    <Image v-if="showStep == 'image'"/>
    <Text v-if="showStep == 'text'"/>
    <SignPart v-if="showStep == 'sign-part'"/>
</template>
<script setup>
import { ref } from 'vue';
import CustomizerOptions from './customizer-options.vue';
import Image from './image.vue';
import SignPart from './sign-part.vue';
import Text from './text.vue';
const showStep = ref('customizer-options');
</script>
<style lang="">
    
</style>