<template>
    <div>                
        <div class="aso-bg-[#F8F9FB] aso-px-8 aso-py-8 aso-space-y-6 aso-translate-y-10">
            <div class="aso-flex aso-flex-col aso-space-y-3">
                <label class="aso-text-[12px] aso-font-medium">Show Navigation Menu on Mobile</label>
                <select v-model="mobile.showNavigatorMenu">
                    <option value="on">On</option>
                    <option value="off">Off</option>
                </select>
            </div>
            <div class="aso-text-[11px] aso-text-[#444444]">Display a navigation menu of the selections on mobile.</div>
            <div class="aso-flex aso-flex-col aso-space-y-3">
                <label class="aso-text-[12px] aso-font-medium">Show Navigation Menu First</label>
                <select v-model="mobile.showNavigationMenuFirst">
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                </select>
            </div>
            <div class="aso-text-[11px] aso-text-[#444444]">This allows the users to jump to a specific selection from the navigation menu first. Otherwise, the screen will show the first selection.</div>
            <div class="aso-flex aso-flex-col aso-space-y-3">
                <label class="aso-text-[12px] aso-font-medium">Mobile Selection Options Display</label>
                <select v-model="mobile.mobileSelectionOptionsDisplay">
                    <option value="horizontally-stack">Horizontally Stack</option>
                    <option value="scroll">Scroll</option>
                </select>
            </div>
            <div class="aso-text-[11px] aso-text-[#444444]">Allow selection options to display as horizontally scrollable options on mobile or stacked vertically.</div>
        </div>
    </div>
    <div class="aso-bg-[#F8F9FB] aso-flex aso-space-x-4 aso-px-4 aso-py-3 aso-justify-end aso-items-end aso-translate-y-16">
        <div class="aso-bg-[#016464] aso-rounded">
            <button :disabled="isLoading" @click="updateMobileSettings" class="aso-rounded aso-flex aso-bg-transparent aso-w-fit aso-space-x-2 aso-h-fit aso-text-white aso-px-12 aso-p-2.5 aso-border-none aso-opacity-90 hover:aso-opacity-100 hover:aso-border-none hover:aso-text-white hover:aso-bg-[#016464] aso-cursor-pointeraso-flex aso-bg-transparent aso-w-fit aso-space-x-2 aso-h-fit aso-text-white aso-px-12 aso-p-2.5 aso-border-none aso-opacity-90 hover:aso-opacity-100 hover:aso-border-none hover:aso-text-white hover:aso-bg-[#016464] aso-cursor-pointer">
                <img src="../../../../../../assets/icons/ic_loading_gray.svg" class="aso-w-5 aso-w-5" v-if="isLoading" />
                <div class="aso-font-semibold aso-text-[16px]">Save</div>
            </button>
        </div>
    </div>
</template>
<script setup>
import api from '@/admin/Api/api';
import {ref,defineProps, onMounted} from 'vue'
import { useRoute } from 'vue-router';
import toastMessage from '@/admin/utils/functions';
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