<template lang="">
    <div class="aso-fixed aso-z-[999999] aso-w-full aso-h-full aso-top-0 aso-left-0 aso-bg-white">
        <div class="aso-bg-white aso-border-solid aso-border aso-flex aso-justify-start aso-p-2 aso-h-[40px]">
            <button @click="goBackAndReload" class="aso-border-solid aso-text-white aso-bg-[#016464] aso-cursor-pointer  aso-border-none   aso-font-medium aso-rounded-md aso-text-sm aso-inline-flex aso-items-center aso-px-5 aso-py-2.5 aso-text-center">
                <svg class="aso-w-6 aso-h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 12L5 8V11L17.17 11C17.3756 10.414 17.7586 9.90661 18.2657 9.54821C18.7729 9.18981 19.379 8.9982 20 9C20.7956 9 21.5587 9.31607 22.1213 9.87868C22.6839 10.4413 23 11.2044 23 12C23 12.7956 22.6839 13.5587 22.1213 14.1213C21.5587 14.6839 20.7956 15 20 15C18.69 15 17.58 14.17 17.17 13L5 13V16L1 12Z" fill="currentColor"/>
                </svg>
                Back
            </button>
        </div>
        <div v-if="isLoading" class="aso-bg-white aso-flex aso-flex-col aso-space-y-2 aso-justify-center aso-items-center aso-w-full aso-h-full p-4">
            <img class="aso-w-[200px] aso-h-[200px]" src="../../../../assets/icons/ic_loading.svg" alt="">
        </div>
        <div id="aso-frontend-app" class="aso-preview-configurator"></div>
    </div>
    
</template>
<script setup>
import router from '@/admin/router';
import { onMounted, ref } from 'vue';
const isLoading = ref(true);
onMounted(()=>{
    setTimeout(() => {
      isLoading.value = false;
    }, 3000)
});

const goBackAndReload = () =>{
    router.reloadPrevious = true;
    router.go(-1)
}
</script>
<style lang="">
    
</style>