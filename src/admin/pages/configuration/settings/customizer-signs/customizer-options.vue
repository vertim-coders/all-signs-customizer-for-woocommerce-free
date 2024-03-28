<template>
    <div>
        <div class="aso-space-y-4">
            <div>
                <div class="aso-bg-[#F8F9FB] aso-px-8 aso-py-8 aso-space-y-6">
                    <div class="aso-flex aso-justify-between">
                        <div class="aso-flex aso-flex-col aso-w-2/5">
                            <label class="aso-text-[12px]">Measurement Unit</label>
                            <select v-model="customizer.measurementUnit">
                                <option value="cm">Centimeters</option>
                                <option value="in">Inches</option>
                                <option value="mm">Millimeters</option>
                                <option value="m">Meters</option>
                            </select>
                        </div>
                        <div class="aso-flex aso-flex-col aso-w-2/5">
                            <label class="aso-text-[12px]">Show/hide Measurements</label>
                            <select v-model="customizer.showHideMeasurements">
                                <option value="both">show both width and height</option>
                                <option value="none">Do not show measurements</option>
                                <option value="only-height">show only height</option>
                                <option value="only-width">show only width</option>
                            </select>
                        </div>
                    </div>
                    <div class="aso-flex aso-justify-between">
                        <div class="aso-flex aso-flex-col aso-w-2/5">
                            <label class="aso-text-[12px]">Decimal Format of Measurements</label>
                            <select v-model="customizer.decimalFormatMeasurements">
                                <option value="with-decimal">with decimal</option>
                                <option value="no-decimal">No decimal</option>
                            </select>
                        </div>
                        <div class="aso-flex aso-flex-col aso-w-2/5">
                            <label class="aso-text-[12px]">Desktop Column Order</label>
                            <select v-model="customizer.desktopColumnOrder">
                                <option value="right">Right</option>
                                <option value="left">Left</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div class="aso-bg-[#F8F9FB] aso-flex aso-space-x-4 aso-px-4 aso-py-3 aso-justify-end aso-items-end">
                <div class="aso-bg-[#016464] aso-rounded">
                    <button :disabled="isLoading" @click="updateCustomizerSettings" class=" aso-rounded aso-flex aso-bg-transparent aso-w-fit aso-space-x-2 aso-h-fit aso-text-white aso-px-12 aso-p-2.5 aso-border-none aso-opacity-90 hover:aso-opacity-100 hover:aso-border-none hover:aso-text-white hover:aso-bg-[#016464] aso-cursor-pointer">
                        <img src="../../../../../../assets/icons/ic_loading_gray.svg" class="aso-w-5 aso-w-5" v-if="isLoading" />
                        <div class="aso-font-semibold aso-text-[16px]">Save</div>
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