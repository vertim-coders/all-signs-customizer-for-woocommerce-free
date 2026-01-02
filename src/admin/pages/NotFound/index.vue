
<template>
    <div class="asowp-flex items-center asowp-justify-center asowp-bg-black asowp-bg-opacity-20 asowp-p-2 asowp-h-full">
        <div class="asowp-w-2/3 asowp-flex asowp-flex-col asowp-items-center asowp-justify-center">
            <h1 class="asowp-text-2xl asowp-font-bold" v-if="!license_status" style="font-size: 50px; font-weight: 700;">403</h1>
            <h1 class="asowp-text-2xl asowp-font-bold" style="font-size: 50px; font-weight: 700;">{{ __("or", "all-signs-options-pro") }}</h1>
            <h1 class="asowp-text-2xl asowp-font-bold" style="font-size: 50px; font-weight: 700;">404</h1>
            <p class="asowp-text-xl asowp-font-semibold" v-if="!license_status">{{ __("Access denied, please check your license", "all-signs-options-pro") }}</p> 
            <p class="asowp-text-xl asowp-font-semibold">{{ __("Page Not Found", "all-signs-options-pro") }}</p> 
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