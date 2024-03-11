<template>
    <div>
        <div class="aso-space-y-4">
            <div>
                <div class="aso-bg-[#F8F9FB] aso-px-8 aso-py-8 aso-space-y-6">
                    <div class="aso-flex aso-justify-between">
                        <div class="aso-flex aso-flex-col aso-w-2/5">
                            <label class="aso-text-[12px]">Measurement Unit</label>
                            <select v-model="customizer.showMeasurementUnit">
                                <option>Centimeters</option>
                                <option>inches</option>
                                <option>milimetres</option>
                                <option>Both Centimeters and Inches</option>
                            </select>
                        </div>
                        <div class="aso-flex aso-flex-col aso-w-2/5">
                            <label class="aso-text-[12px]">Show/hide Measurements</label>
                            <select v-model="customizer.showHideMeasurements">
                                <option>show both width and height</option>
                                <option>Do not show measurements</option>
                                <option>show only height</option>
                                <option>show only width</option>
                            </select>
                        </div>
                    </div>
                    <div class="aso-flex aso-justify-between">
                        <div class="aso-flex aso-flex-col aso-w-2/5">
                            <label class="aso-text-[12px]">Decimal Format of Measurements</label>
                            <select v-model="customizer.decimalFormatMeasurements">
                                <option>with decimal</option>
                                <option>No decimal</option>
                            </select>
                        </div>
                        <div class="aso-flex aso-flex-col aso-w-2/5">
                            <label class="aso-text-[12px]"></label>
                            <select v-model="customizer.decimalFormatRightLeft">
                                <option>Right</option>
                                <option>Left</option>
                            </select>
                        </div>
                    </div>
                    <div class="aso-flex aso-flex-col aso-w-2/5">
                        <label class="aso-text-[12px]"></label>
                        <select v-model="customizer.displayHidden">
                            <option>display</option>
                            <option>Hidden</option>
                        </select>
                    </div>
                    <div class="aso-text-[11px] aso-text-[#444444]">Display a switch to turn default background into day or right mode</div>
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
<script>
import api from '@/admin/Api/api';
import {ref, defineProps,onMounted} from 'vue';
import { useRoute } from 'vue-router';
import toastMessage from '@/admin/utils/functions';


const route = useRoute();
const configId = ref(route.params.configId);
const isLoading =ref(false);
const customizer = ref({
    showMeasurementUnit:"centimenters",
    showHideMeasurements:"show both width and height",
    decimalFormatMeasurements:"with decimal",
    decimalFormatRightLeft:"Right",
    displayHidden:"display"
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
}
    
</script> 