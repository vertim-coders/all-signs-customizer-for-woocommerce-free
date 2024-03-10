<template lang="">
    <div>
        <div class="aso-bg-[#F4F4F4] aso-p-2 aso-space-x-6 aso-justify-center aso-items-center aso-flex aso-border-solid aso-border-[1px] aso-border-[#DDDDDD]">
            <div class="">
                <button @click="()=>{showStep = 'main'}" :class="`aso-flex aso-text-[12px] aso-px-6 aso-p-2 aso-w-fit aso-h-fit aso-bg-white aso-rounded aso-border-none aso-text-black aso-font-semibold ${ showStep== 'main' ?'aso-font-bold aso-text-[#016464] aso-bg-[#E1E1E1]':''} hover:aso-bg-[#E1E1E1] hover:aso-text-[#016464] aso-cursor-pointer`">
                    Main
                </button>
            </div>
            <div class="">
                <button @click="()=>{showStep = 'upload-design'}" :class="`aso-flex aso-text-[12px] aso-px-6 aso-p-2 aso-w-fit aso-h-fit aso-bg-white aso-rounded aso-border-none aso-text-black aso-font-semibold ${ showStep== 'upload-design' ?'aso-font-bold aso-text-[#016464] aso-bg-[#E1E1E1]':''} hover:aso-bg-[#E1E1E1] hover:aso-text-[#016464] aso-cursor-pointer`">
                    Upload design
                </button>
            </div>
            <div class="">
                <button @click="()=>{showStep = 'visualizer'}" :class="`aso-flex aso-text-[12px] aso-px-6 aso-p-2 aso-w-fit aso-h-fit aso-bg-white aso-rounded aso-border-none aso-text-black aso-font-semibold ${ showStep== 'visualizer' ?'aso-font-bold aso-text-[#016464] aso-bg-[#E1E1E1]':''} hover:aso-bg-[#E1E1E1] hover:aso-text-[#016464] aso-cursor-pointer`">
                    Visualizer
                </button>
            </div>
            <div class="">
                <button @click="()=>{showStep = 'images'}" :class="`aso-flex aso-text-[12px] aso-px-6 aso-p-2 aso-w-fit aso-h-fit aso-bg-white aso-rounded aso-border-none aso-text-black aso-font-semibold ${ showStep== 'images' ?'aso-font-bold aso-text-[#016464] aso-bg-[#E1E1E1]':''} hover:aso-bg-[#E1E1E1] hover:aso-text-[#016464] aso-cursor-pointer`">
                    Images
                </button>
            </div>
        </div>
        <Main v-if="showStep == 'main'"/>
        <Images v-if="showStep == 'images'"/>
        <UploadDesign v-if="showStep == 'upload-design'"/>
        <!-- <Visualizer v-if="showStep == 'visualizer'"/> -->
    </div>
</template>
<script setup>
import Main from './main.vue';
import Images from './images.vue';
import UploadDesign from './upload-design.vue';
/* import Visualizer from './visualizer.vue'; */
import { ref } from 'vue';

const showStep = ref('main');
</script>
<style lang="">
    
</style>