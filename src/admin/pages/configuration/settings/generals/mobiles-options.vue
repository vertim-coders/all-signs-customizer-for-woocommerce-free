<template>
    <div>                
        <div class="asowp-bg-[#F8F9FB] asowp-px-8 asowp-py-8 asowp-space-y-6 asowp-translate-y-10">
            <div class="asowp-flex asowp-flex-col asowp-space-y-3">
                <label class="asowp-text-[12px] asowp-font-medium">{{ __("Show Navigation Menu on Mobile", "all-signs-options-pro") }}</label>
                <select v-model="mobile.showNavigatorMenu">
                    <option value="on">{{ __("On", "all-signs-options-pro") }}</option>
                    <option value="off">{{ __("Off", "all-signs-options-pro") }}</option>
                </select>
            </div>
            <div class="asowp-text-[11px] asowp-text-[#444444]">{{ __("Display a navigation menu of the selections on mobile.", "all-signs-options-pro") }}</div>
            <div class="asowp-flex asowp-flex-col asowp-space-y-3">
                <label class="asowp-text-[12px] asowp-font-medium">{{ __("Show Navigation Menu First", "all-signs-options-pro") }}</label>
                <select v-model="mobile.showNavigationMenuFirst">
                    <option value="yes">{{ __("Yes", "all-signs-options-pro") }}</option>
                    <option value="no">{{ __("No", "all-signs-options-pro") }}</option>
                </select>
            </div>
            <div class="asowp-text-[11px] asowp-text-[#444444]">{{ __("This allows the users to jump to a specific selection from the navigation menu first. Otherwise, the screen will show the first selection.", "all-signs-options-pro") }}</div>
            <div class="asowp-flex asowp-flex-col asowp-space-y-3">
                <label class="asowp-text-[12px] asowp-font-medium">{{ __("Mobile Selection Options Display", "all-signs-options-pro") }}</label>
                <select v-model="mobile.mobileSelectionOptionsDisplay">
                    <option value="horizontally-stack">{{ __("Horizontally Stack", "all-signs-options-pro") }}</option>
                    <option value="scroll">{{ __("Scroll", "all-signs-options-pro") }}</option>
                </select>
            </div>
            <div class="asowp-text-[11px] asowp-text-[#444444]">{{ __("Allow selection options to display as horizontally scrollable options on mobile or stacked vertically.", "all-signs-options-pro") }}</div>
        </div>
    </div>
    <div class="asowp-bg-[#F8F9FB] asowp-flex asowp-space-x-4 asowp-px-4 asowp-py-3 asowp-justify-end asowp-items-end asowp-translate-y-16">
        <div class="asowp-bg-[#016464] asowp-rounded">
            <button :disabled="isLoading" @click="updateMobileSettings" class="asowp-rounded asowp-flex asowp-bg-transparent asowp-w-fit asowp-space-x-2 asowp-h-fit asowp-text-white asowp-px-12 asowp-p-2.5 asowp-border-none asowp-opacity-90 hover:asowp-opacity-100 hover:asowp-border-none hover:asowp-text-white hover:asowp-bg-[#016464] asowp-cursor-pointerasowp-flex asowp-bg-transparent asowp-w-fit asowp-space-x-2 asowp-h-fit asowp-text-white asowp-px-12 asowp-p-2.5 asowp-border-none asowp-opacity-90 hover:asowp-opacity-100 hover:asowp-border-none hover:asowp-text-white hover:asowp-bg-[#016464] asowp-cursor-pointer">
                <img src="../../../../../../assets/icons/ic_loading_gray.svg" class="asowp-w-5 asowp-w-5" v-if="isLoading" />
                <div class="asowp-font-semibold asowp-text-[16px]">{{ __("Save", "all-signs-options-pro") }}</div>
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