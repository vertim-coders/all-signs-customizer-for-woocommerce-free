<template>
    <div>
        <div class="asowp-space-y-4 asowp-translate-y-8">
            <div>
                <div class="asowp-bg-[#F8F9FB] asowp-px-8 asowp-py-8 asowp-space-y-6">
                    <div class="asowp-flex asowp-justify-between">
                        <div class="asowp-flex asowp-flex-col asowp-w-2/5">
                            <label class="asowp-text-[12px]">{{ __("Measurement Unit", "all-signs-options-pro") }}</label>
                            <select v-model="customizer.measurementUnit">
                                <option value="mm">{{ __("Millimeters", "all-signs-options-pro") }}</option>
                                <option value="cm">{{ __("Centimeters", "all-signs-options-pro") }}</option>
                                <option value="m">{{ __("Meters", "all-signs-options-pro") }}</option>
                                <option value="in">{{ __("Inches", "all-signs-options-pro") }}</option>
                            </select>
                        </div>
                        <div class="asowp-flex asowp-flex-col asowp-w-2/5">
                            <label class="asowp-text-[12px]">{{ __("Show/hide Measurements", "all-signs-options-pro") }}</label>
                            <select v-model="customizer.showHideMeasurements">
                                <option value="both">{{ __("show both width and height", "all-signs-options-pro") }}</option>
                                <option value="none">{{ __("Do not show measurements", "all-signs-options-pro") }}</option>
                                <option value="only-height">{{ __("show only height", "all-signs-options-pro") }}</option>
                                <option value="only-width">{{ __("show only width", "all-signs-options-pro") }}</option>
                            </select>
                        </div>
                    </div>
                    <div class="asowp-flex asowp-justify-between">
                        <div class="asowp-flex asowp-flex-col asowp-w-2/5">
                            <label class="asowp-text-[12px]">{{ __("Decimal Format of Measurements", "all-signs-options-pro") }}</label>
                            <select v-model="customizer.decimalFormatMeasurements">
                                <option value="with-decimal">{{ __("with decimal", "all-signs-options-pro") }}</option>
                                <option value="no-decimal">{{ __("No decimal", "all-signs-options-pro") }}</option>
                            </select>
                        </div>
                        <div class="asowp-flex asowp-flex-col asowp-w-2/5">
                            <label class="asowp-text-[12px]">{{ __("Desktop Column Order", "all-signs-options-pro") }}</label>
                            <select v-model="customizer.desktopColumnOrder">
                                <option value="right">{{ __("Right", "all-signs-options-pro") }}</option>
                                <option value="left">{{ __("Left", "all-signs-options-pro") }}</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div class="asowp-bg-[#F8F9FB] asowp-flex asowp-space-x-4 asowp-px-4 asowp-py-3 asowp-justify-end asowp-items-end">
                <div class="asowp-bg-[#016464] asowp-rounded">
                    <button :disabled="isLoading" @click="updateCustomizerSettings" class=" asowp-rounded asowp-flex asowp-bg-transparent asowp-w-fit asowp-space-x-2 asowp-h-fit asowp-text-white asowp-px-12 asowp-p-2.5 asowp-border-none asowp-opacity-90 hover:asowp-opacity-100 hover:asowp-border-none hover:asowp-text-white hover:asowp-bg-[#016464] asowp-cursor-pointer">
                        <img src="../../../../../../assets/icons/ic_loading_gray.svg" class="asowp-w-5 asowp-w-5" v-if="isLoading" />
                        <div class="asowp-font-semibold asowp-text-[16px]">{{ __("Save", "all-signs-options-pro") }}</div>
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