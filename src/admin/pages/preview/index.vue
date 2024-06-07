<template lang="">
    <div class="aso-fixed aso-z-[999999] aso-w-full aso-h-full aso-top-0 aso-left-0 aso-bg-white">
        <div class="aso-bg-white aso-border-solid aso-border aso-flex aso-justify-start aso-p-2 aso-h-[30px]">
            <button @click="goBackAndReload">
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