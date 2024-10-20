<template>
    <div>
        <div class="asowp-space-y-4 asowp-translate-y-8">
            <div>
                <div class="asowp-bg-[#F8F9FB] asowp-px-8 asowp-py-8 asowp-space-y-6">
                    <div class="asowp-flex asowp-justify-between">
                        <div class="asowp-flex asowp-flex-col asowp-w-2/5">
                            <label class="asowp-text-[12px]">Measurement Unit</label>
                            <select v-model="customizer.measurementUnit">
                                <option value="mm">Millimeters</option>
                                <option value="cm">Centimeters</option>
                                <option value="m">Meters</option>
                                <option value="in">Inches</option>
                            </select>
                        </div>
                        <div class="asowp-flex asowp-flex-col asowp-w-2/5">
                            <label class="asowp-text-[12px]">Show/hide Measurements</label>
                            <select v-model="customizer.showHideMeasurements">
                                <option value="both">show both width and height</option>
                                <option value="none">Do not show measurements</option>
                                <option value="only-height">show only height</option>
                                <option value="only-width">show only width</option>
                            </select>
                        </div>
                    </div>
                    <div class="asowp-flex asowp-justify-between">
                        <div class="asowp-flex asowp-flex-col asowp-w-2/5">
                            <label class="asowp-text-[12px]">Decimal Format of Measurements</label>
                            <select v-model="customizer.decimalFormatMeasurements">
                                <option value="with-decimal">with decimal</option>
                                <option value="no-decimal">No decimal</option>
                            </select>
                        </div>
                        <div class="asowp-flex asowp-flex-col asowp-w-2/5">
                            <label class="asowp-text-[12px]">Desktop Column Order</label>
                            <select v-model="customizer.desktopColumnOrder">
                                <option value="right">Right</option>
                                <option value="left">Left</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div class="asowp-bg-[#F8F9FB] asowp-flex asowp-space-x-4 asowp-px-4 asowp-py-3 asowp-justify-end asowp-items-end">
                <div class="asowp-bg-[#016464] asowp-rounded">
                    <button :disabled="isLoading" @click="updateCustomizerSettings" class=" asowp-rounded asowp-flex asowp-bg-transparent asowp-w-fit asowp-space-x-2 asowp-h-fit asowp-text-white asowp-px-12 asowp-p-2.5 asowp-border-none asowp-opacity-90 hover:asowp-opacity-100 hover:asowp-border-none hover:asowp-text-white hover:asowp-bg-[#016464] asowp-cursor-pointer">
                        <img src="../../../../../../assets/icons/ic_loading_gray.svg" class="asowp-w-5 asowp-w-5" v-if="isLoading" />
                        <div class="asowp-font-semibold asowp-text-[16px]">Save</div>
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