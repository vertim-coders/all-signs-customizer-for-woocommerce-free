<template>
    <div>
        <div class="aso-space-y-4">
            <div>
                <div class="aso-bg-[#F8F9FB] aso-px-8 aso-py-8 aso-space-y-6">
                    <div class="aso-flex aso-space-x-3">
                        <div class="aso-text-[16px]">Activate the double-sided option</div>
                        <div class="aso-flex aso-items-center aso-translate-y-0.5">
                            <label for="aso-toggle" @click="handleEnableSignPart" class="aso-cursor-pointer aso-bg-[#F8F8FF] aso-border-[1px] aso-border-solid aso-border-black aso-w-6 aso-h-0.5 aso-rounded-full aso-p-1">
                            <div :class="{'aso-translate-x-[100%]': signPart.doublePart.active, 'aso-bg-active': signPart.doublePart }" class="aso-toggle-dot aso-w-2.5 aso-h-2.5 -aso-translate-y-[8px] -aso-translate-x-2 aso-border-[4px] aso-border-solid aso-border-[#008000] aso-bg-white aso-rounded-full aso-shadow-md aso-transform"></div>
                            </label>
                        </div>
                    </div>
                    <div class="aso-flex aso-justify-between" v-if="signPart.doublePart.active">
                        <div class="aso-flex aso-flex-col aso-w-2/5 aso-space-y-2">
                            <label class="aso-font-semibold aso-text-[16px]">Part 1</label>
                            <input type="text" v-model="signPart.doublePart.part1" placeholder="name" class="aso-w-full"/>
                        </div>
                        <div class="aso-flex aso-flex-col aso-w-2/5 aso-space-y-2">
                            <label class="aso-font-semibold aso-text-[16px]">Part 2</label>
                            <input type="text" v-model="signPart.doublePart.part2" placeholder="name" class="aso-w-full"/>
                        </div>
                    </div>
                    <div class="aso-flex aso-space-x-3" v-if="signPart.doublePart.active">
                        <div class="aso-text-[16px]">Enable Copy design from side</div>
                        <div class="aso-flex aso-items-center aso-translate-y-0.5">
                            <label for="aso-toggle" @click="handleEnableCopyDesignFromSide" class="aso-cursor-pointer aso-bg-[#F8F8FF] aso-border-[1px] aso-border-solid aso-border-black aso-w-6 aso-h-0.5 aso-rounded-full aso-p-1">
                            <div :class="{'aso-translate-x-[100%]': signPart.doublePart.enableCopyDesignFromSide, 'aso-bg-active': signPart.doublePart.enableCopyDesignFromSide }" class="aso-toggle-dot aso-w-2.5 aso-h-2.5 -aso-translate-y-[8px] -aso-translate-x-2 aso-border-[4px] aso-border-solid aso-border-[#008000] aso-bg-white aso-rounded-full aso-shadow-md aso-transform"></div>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <div class="aso-bg-[#F8F9FB] aso-flex aso-space-x-4 aso-px-4 aso-py-3 aso-justify-end aso-items-end">
                <div class="aso-bg-[#016464] aso-rounded">
                    <button :disabled="isLoading" @click="updateSignPartSettings" class="aso-rounded aso-flex aso-bg-transparent aso-w-fit aso-space-x-2 aso-h-fit aso-text-white aso-px-12 aso-p-2.5 aso-border-none aso-opacity-90 hover:aso-opacity-100 hover:aso-border-none hover:aso-text-white hover:aso-bg-[#016464] aso-cursor-pointeraso-flex aso-bg-transparent aso-w-fit aso-space-x-2 aso-h-fit aso-text-white aso-px-12 aso-p-2.5 aso-border-none aso-opacity-90 hover:aso-opacity-100 hover:aso-border-none hover:aso-text-white hover:aso-bg-[#016464] aso-cursor-pointer">
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
const signPart = ref({
    doublePart:{
        active:false,
        part1:"Face A",
        part2:"Face B",
        enableCopyDesignFromSide:true
    },
});
onMounted(() => {
    if(props.data){
        signPart.value = {...signPart.value,...props.data}
    }
});

const updateSignPartSettings = async () => {
    isLoading.value = true;
    const result = await api.updateCustomizerSignsSignPart(configId.value,signPart.value);
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
const handleEnableSignPart = () => {
    signPart.value.doublePart.active = !signPart.value.doublePart.active;
};
const handleEnableCopyDesignFromSide = () => {
    signPart.value.doublePart.enableCopyDesignFromSide = !signPart.value.doublePart.enableCopyDesignFromSide;
};
</script> 