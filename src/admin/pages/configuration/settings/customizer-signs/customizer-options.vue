<template>
    <div>
        <div class="ascwo-space-y-4 ascwo-translate-y-8">
            <div>
                <div class="ascwo-bg-[#F8F9FB] ascwo-px-8 ascwo-py-8 ascwo-space-y-6">
                    <div class="ascwo-flex ascwo-justify-between">
                        <div class="ascwo-flex ascwo-flex-col ascwo-w-2/5">
                            <label class="ascwo-text-[12px]">{{ __("Measurement Unit", "all-signs-customizer-for-woocommerce") }}</label>
                            <select v-model="customizer.measurementUnit">
                                <option value="mm">{{ __("Millimeters", "all-signs-customizer-for-woocommerce") }}</option>
                                <option value="cm">{{ __("Centimeters", "all-signs-customizer-for-woocommerce") }}</option>
                                <option value="m">{{ __("Meters", "all-signs-customizer-for-woocommerce") }}</option>
                                <option value="in">{{ __("Inches", "all-signs-customizer-for-woocommerce") }}</option>
                            </select>
                        </div>
                        <div class="ascwo-flex ascwo-flex-col ascwo-w-2/5">
                            <label class="ascwo-text-[12px]">{{ __("Show/hide Measurements", "all-signs-customizer-for-woocommerce") }}</label>
                            <select v-model="customizer.showHideMeasurements">
                                <option value="both">{{ __("show both width and height", "all-signs-customizer-for-woocommerce") }}</option>
                                <option value="none">{{ __("Do not show measurements", "all-signs-customizer-for-woocommerce") }}</option>
                                <option value="only-height">{{ __("show only height", "all-signs-customizer-for-woocommerce") }}</option>
                                <option value="only-width">{{ __("show only width", "all-signs-customizer-for-woocommerce") }}</option>
                            </select>
                        </div>
                    </div>
                    <div class="ascwo-flex ascwo-justify-between">
                        <div class="ascwo-flex ascwo-flex-col ascwo-w-2/5">
                            <label class="ascwo-text-[12px]">{{ __("Decimal Format of Measurements", "all-signs-customizer-for-woocommerce") }}</label>
                            <select v-model="customizer.decimalFormatMeasurements">
                                <option value="with-decimal">{{ __("with decimal", "all-signs-customizer-for-woocommerce") }}</option>
                                <option value="no-decimal">{{ __("No decimal", "all-signs-customizer-for-woocommerce") }}</option>
                            </select>
                        </div>
                        <div class="ascwo-flex ascwo-flex-col ascwo-w-2/5">
                            <label class="ascwo-text-[12px]">{{ __("Desktop Column Order", "all-signs-customizer-for-woocommerce") }}</label>
                            <select v-model="customizer.desktopColumnOrder">
                                <option value="right">{{ __("Right", "all-signs-customizer-for-woocommerce") }}</option>
                                <option value="left">{{ __("Left", "all-signs-customizer-for-woocommerce") }}</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div class="ascwo-bg-[#F8F9FB] ascwo-flex ascwo-space-x-4 ascwo-px-4 ascwo-py-3 ascwo-justify-end ascwo-items-end">
                <div class="ascwo-bg-[#016464] ascwo-rounded">
                    <button :disabled="isLoading" @click="updateCustomizerSettings" class=" ascwo-rounded ascwo-flex ascwo-bg-transparent ascwo-w-fit ascwo-space-x-2 ascwo-h-fit ascwo-text-white ascwo-px-12 ascwo-p-2.5 ascwo-border-none ascwo-opacity-90 hover:ascwo-opacity-100 hover:ascwo-border-none hover:ascwo-text-white hover:ascwo-bg-[#016464] ascwo-cursor-pointer">
                        <img src="../../../../../../assets/icons/ic_loading_gray.svg" class="ascwo-w-5 ascwo-w-5" v-if="isLoading" />
                        <div class="ascwo-font-semibold ascwo-text-[16px]">{{ __("Save", "all-signs-customizer-for-woocommerce") }}</div>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import api from '@/admin/Api/api';
import {ref, defineProps,onMounted} from 'vue';
import { useRoute } from 'vue-router';
import toastMessage from '@/admin/utils/functions';


import { __, _x, _n, _nx, sprintf, setLocaleData } from "@wordpress/i18n";
const route = useRoute();
const configId = ref(route.params.configId);
const isLoading =ref(false);
const customizer = ref({
    measurementUnit:"cm",
    showHideMeasurements:"both",
    decimalFormatMeasurements:"with-decimal",
    desktopColumnOrder:"right",
    showDayNightButton:"display"
});
const props = defineProps({
    data:Object,
    fetchSettings:Function
});
onMounted(() => {
    if(props.data){
        customizer.value = {...customizer.value,...props.data}
    }
});

const updateCustomizerSettings = async () => {
    isLoading.value = true;
    const result = await api.updateCustomizerSignsCustomizer(configId.value,customizer.value);
    if(result.success){
        await props.fetchSettings();
        isLoading.value = false;
        if(result.success == true){
            toastMessage(result.message);
        }else{
            toastMessage(result.message,"warning");
        }
    }else{
        isLoading.value = false;
        toastMessage(result.message,"error");
    }
};
    
</script> 