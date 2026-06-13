
<template>
    <div class="ascwo-flex items-center ascwo-justify-center ascwo-bg-black ascwo-bg-opacity-20 ascwo-p-2 ascwo-h-full">
        <div class="ascwo-w-2/3 ascwo-flex ascwo-flex-col ascwo-items-center ascwo-justify-center">
            <h1 class="ascwo-text-2xl ascwo-font-bold" v-if="!license_status" style="font-size: 50px; font-weight: 700;">403</h1>
            <h1 class="ascwo-text-2xl ascwo-font-bold" style="font-size: 50px; font-weight: 700;">{{ __("or", "all-signs-customizer-for-woocommerce-pro") }}</h1>
            <h1 class="ascwo-text-2xl ascwo-font-bold" style="font-size: 50px; font-weight: 700;">404</h1>
            <p class="ascwo-text-xl ascwo-font-semibold" v-if="!license_status">{{ __("Access denied, please check your license", "all-signs-customizer-for-woocommerce-pro") }}</p> 
            <p class="ascwo-text-xl ascwo-font-semibold">{{ __("Page Not Found", "all-signs-customizer-for-woocommerce-pro") }}</p> 
        </div>
    </div>
</template>

<script setup>
import {ref,onMounted,defineProps} from 'vue';
import {t} from '@/admin/utils/i18n'
const props = defineProps({
    state:Boolean
})
const license_status = ref(props.state);
import { __, _x, _n, _nx, sprintf, setLocaleData } from "@wordpress/i18n";
</script>

<style lang="scss" scoped>

</style>