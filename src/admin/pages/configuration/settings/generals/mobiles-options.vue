<template>
    <div>                
        <div class="asowp-bg-[#F8F9FB] asowp-px-8 asowp-py-8 asowp-space-y-6 asowp-translate-y-10">
            <div class="asowp-flex asowp-flex-col asowp-space-y-3">
                <label class="asowp-text-[12px] asowp-font-medium">Show Navigation Menu on Mobile</label>
                <select v-model="mobile.showNavigatorMenu">
                    <option value="on">On</option>
                    <option value="off">Off</option>
                </select>
            </div>
            <div class="asowp-text-[11px] asowp-text-[#444444]">Display a navigation menu of the selections on mobile.</div>
            <div class="asowp-flex asowp-flex-col asowp-space-y-3">
                <label class="asowp-text-[12px] asowp-font-medium">Show Navigation Menu First</label>
                <select v-model="mobile.showNavigationMenuFirst">
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                </select>
            </div>
            <div class="asowp-text-[11px] asowp-text-[#444444]">This allows the users to jump to a specific selection from the navigation menu first. Otherwise, the screen will show the first selection.</div>
            <div class="asowp-flex asowp-flex-col asowp-space-y-3">
                <label class="asowp-text-[12px] asowp-font-medium">Mobile Selection Options Display</label>
                <select v-model="mobile.mobileSelectionOptionsDisplay">
                    <option value="horizontally-stack">Horizontally Stack</option>
                    <option value="scroll">Scroll</option>
                </select>
            </div>
            <div class="asowp-text-[11px] asowp-text-[#444444]">Allow selection options to display as horizontally scrollable options on mobile or stacked vertically.</div>
        </div>
    </div>
    <div class="asowp-bg-[#F8F9FB] asowp-flex asowp-space-x-4 asowp-px-4 asowp-py-3 asowp-justify-end asowp-items-end asowp-translate-y-16">
        <div class="asowp-bg-[#016464] asowp-rounded">
            <button :disabled="isLoading" @click="updateMobileSettings" class="asowp-rounded asowp-flex asowp-bg-transparent asowp-w-fit asowp-space-x-2 asowp-h-fit asowp-text-white asowp-px-12 asowp-p-2.5 asowp-border-none asowp-opacity-90 hover:asowp-opacity-100 hover:asowp-border-none hover:asowp-text-white hover:asowp-bg-[#016464] asowp-cursor-pointerasowp-flex asowp-bg-transparent asowp-w-fit asowp-space-x-2 asowp-h-fit asowp-text-white asowp-px-12 asowp-p-2.5 asowp-border-none asowp-opacity-90 hover:asowp-opacity-100 hover:asowp-border-none hover:asowp-text-white hover:asowp-bg-[#016464] asowp-cursor-pointer">
                <img src="../../../../../../assets/icons/ic_loading_gray.svg" class="asowp-w-5 asowp-w-5" v-if="isLoading" />
                <div class="asowp-font-semibold asowp-text-[16px]">Save</div>
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