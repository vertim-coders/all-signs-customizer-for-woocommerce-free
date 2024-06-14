
<template>
    <div class="aso-flex items-center aso-justify-center aso-bg-black aso-bg-opacity-20 aso-p-2 aso-h-full">
        <div class="aso-w-2/3 aso-flex aso-flex-col aso-items-center aso-justify-center">
            <h1 class="aso-text-2xl aso-font-bold" v-if="!license_status" style="font-size: 50px; font-weight: 700;">403</h1>
            <h1 class="aso-text-2xl aso-font-bold" style="font-size: 50px; font-weight: 700;">or</h1>
            <h1 class="aso-text-2xl aso-font-bold" style="font-size: 50px; font-weight: 700;">404</h1>
            <p class="aso-text-xl aso-font-semibold" v-if="!license_status">Acces denied, please check your license</p> 
            <p class="aso-text-xl aso-font-semibold">Page Not Found</p> 
        </div>
    </div>
</template>

<script setup>
import {ref,onMounted,defineProps} from 'vue';
const props = defineProps({
    state:Boolean
})
const license_status = ref(props.state);
</script>

<style lang="scss" scoped>

</style>