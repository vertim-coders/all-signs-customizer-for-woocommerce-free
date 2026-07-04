<template>
    <div>                
        <div class="ascwo-bg-[#F8F9FB] ascwo-px-8 ascwo-py-8 ascwo-space-y-6 ascwo-translate-y-10">
            <div class="ascwo-flex ascwo-flex-col ascwo-space-y-3">
                <label class="ascwo-text-[12px] ascwo-font-medium">{{ __("Show Navigation Menu on Mobile", "all-signs-customizer-for-woocommerce") }}</label>
                <select v-model="mobile.showNavigatorMenu">
                    <option value="on">{{ __("On", "all-signs-customizer-for-woocommerce") }}</option>
                    <option value="off">{{ __("Off", "all-signs-customizer-for-woocommerce") }}</option>
                </select>
            </div>
            <div class="ascwo-text-[11px] ascwo-text-[#444444]">{{ __("Display a navigation menu of the selections on mobile.", "all-signs-customizer-for-woocommerce") }}</div>
            <div class="ascwo-flex ascwo-flex-col ascwo-space-y-3">
                <label class="ascwo-text-[12px] ascwo-font-medium">{{ __("Show Navigation Menu First", "all-signs-customizer-for-woocommerce") }}</label>
                <select v-model="mobile.showNavigationMenuFirst">
                    <option value="yes">{{ __("Yes", "all-signs-customizer-for-woocommerce") }}</option>
                    <option value="no">{{ __("No", "all-signs-customizer-for-woocommerce") }}</option>
                </select>
            </div>
            <div class="ascwo-text-[11px] ascwo-text-[#444444]">{{ __("This allows the users to jump to a specific selection from the navigation menu first. Otherwise, the screen will show the first selection.", "all-signs-customizer-for-woocommerce") }}</div>
            <div class="ascwo-flex ascwo-flex-col ascwo-space-y-3">
                <label class="ascwo-text-[12px] ascwo-font-medium">{{ __("Mobile Selection Options Display", "all-signs-customizer-for-woocommerce") }}</label>
                <select v-model="mobile.mobileSelectionOptionsDisplay">
                    <option value="horizontally-stack">{{ __("Horizontally Stack", "all-signs-customizer-for-woocommerce") }}</option>
                    <option value="scroll">{{ __("Scroll", "all-signs-customizer-for-woocommerce") }}</option>
                </select>
            </div>
            <div class="ascwo-text-[11px] ascwo-text-[#444444]">{{ __("Allow selection options to display as horizontally scrollable options on mobile or stacked vertically.", "all-signs-customizer-for-woocommerce") }}</div>
        </div>
    </div>
    <div class="ascwo-bg-[#F8F9FB] ascwo-flex ascwo-space-x-4 ascwo-px-4 ascwo-py-3 ascwo-justify-end ascwo-items-end ascwo-translate-y-16">
        <div class="ascwo-bg-[#016464] ascwo-rounded">
            <button :disabled="isLoading" @click="updateMobileSettings" class="ascwo-rounded ascwo-flex ascwo-bg-transparent ascwo-w-fit ascwo-space-x-2 ascwo-h-fit ascwo-text-white ascwo-px-12 ascwo-p-2.5 ascwo-border-none ascwo-opacity-90 hover:ascwo-opacity-100 hover:ascwo-border-none hover:ascwo-text-white hover:ascwo-bg-[#016464] ascwo-cursor-pointerascwo-flex ascwo-bg-transparent ascwo-w-fit ascwo-space-x-2 ascwo-h-fit ascwo-text-white ascwo-px-12 ascwo-p-2.5 ascwo-border-none ascwo-opacity-90 hover:ascwo-opacity-100 hover:ascwo-border-none hover:ascwo-text-white hover:ascwo-bg-[#016464] ascwo-cursor-pointer">
                <img src="../../../../../../assets/icons/ic_loading_gray.svg" class="ascwo-w-5 ascwo-w-5" v-if="isLoading" />
                <div class="ascwo-font-semibold ascwo-text-[16px]">{{ __("Save", "all-signs-customizer-for-woocommerce") }}</div>
            </button>
        </div>
    </div>
</template>
<script setup>
import api from '@/admin/Api/api';
import {ref,defineProps, onMounted} from 'vue'
import { useRoute } from 'vue-router';
import toastMessage from '@/admin/utils/functions';
import { __, _x, _n, _nx, sprintf, setLocaleData } from "@wordpress/i18n";
const props = defineProps({
    data:Object,
    fetchSettings:Function
});
const route = useRoute();
const configId = ref(route.params.configId);
const isLoading =ref(false);
const mobile = ref({
    showNavigatorMenu:"off",
    showNavigationMenuFirst:"yes",
    mobileSelectionOptionsDisplay:"horizontally-stack"
});
onMounted(() => {
    if(props.data){
        mobile.value = {...mobile.value,...props.data}
    }
});

const updateMobileSettings = async () => {
    isLoading.value = true;
    const result = await api.updateGeneralMobile(configId.value,mobile.value);
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
}
</script> 