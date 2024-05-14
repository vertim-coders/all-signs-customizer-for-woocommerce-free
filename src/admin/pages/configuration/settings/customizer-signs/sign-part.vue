<template>
    <div>
        <div class="aso-space-y-4">
            <div>
                <div class="aso-bg-[#F8F9FB] aso-px-8 aso-py-8 aso-space-y-6">
                    <div class="aso-flex aso-space-x-3">
                        <div class="aso-text-[16px]">Activate the double-sided option</div>
                        <div class="aso-flex aso-items-center aso-translate-y-0.5">
                            <label for="toggleActivate" class="aso-relative aso-inline-flex aso-items-center aso-cursor-pointer aso-border-[1px] aso-border-solid aso-border-black aso-rounded-full">
                                <input id="toggleActivate" type="checkbox" name="toggleActivate" class="aso-sr-only aso-peer" value="toggleActivate" v-model="signPart.doublePart.active">
                                <div :class="`peer-checked:after:aso-border-[#016464] peer-checked:after:aso-border-solid peer-checked:after:aso-border-[5px] peer-checked:after:aso-top-[-2px] peer-checked:after:aso-translate-y-[-15%] aso-w-10 aso-h-3 aso-border aso-border-[5px] aso-border-[#016464] aso-bg-zinc-300 aso-rounded-full aso-peer peer-checked:after:aso-translate-x-[140%] after:aso-content-[''] after:aso-absolute after:aso-top-[-2px] after:aso-left-[-5px] after:aso-bg-zinc-300 after:aso-border-white after:aso-border-solid after:aso-translate-y-[-15%] after:aso-border-[#FFFFFF] after:aso-border-[5px] after:aso-rounded-full after:aso-h-2.5 after:aso-w-2.5 after:aso-transition-all after:aso-shadow-lg`"></div>
                            </label>
                        </div>
                    </div>
                    <div class="aso-flex aso-flex-col aso-w-2/5 aso-space-y-2"  v-if="signPart.doublePart.active">
                        <label class="aso-font-semibold aso-text-[16px]">Label of option to change face</label>
                        <input type="text" v-model="signPart.doublePart.label" class="aso-w-3/5"/>
                    </div>
                    <div class="aso-flex aso-justify-between" v-if="signPart.doublePart.active">
                        <div class="aso-flex aso-flex-col aso-w-2/5 aso-space-y-2">
                            <label class="aso-font-semibold aso-text-[16px]">Part 1</label>
                            <input type="text" v-model="signPart.doublePart.part1" class="aso-w-full"/>
                        </div>
                        <div class="aso-flex aso-flex-col aso-w-2/5 aso-space-y-2">
                            <label class="aso-font-semibold aso-text-[16px]">Part 2</label>
                            <input type="text" v-model="signPart.doublePart.part2" class="aso-w-full"/>
                        </div>
                    </div>
                    <div class="aso-flex aso-space-x-3" v-if="signPart.doublePart.active">
                        <div class="aso-text-[16px]">Enable Copy design from side</div>
                        <div class="aso-flex aso-items-center aso-translate-y-0.5">
                            <label for="toggleCopy" class="aso-relative aso-inline-flex aso-items-center aso-cursor-pointer aso-border-[1px] aso-border-solid aso-border-black aso-rounded-full">
                                <input id="toggleCopy" type="checkbox" name="toggleCopy" class="aso-sr-only aso-peer" value="toggleCopy" v-model="signPart.doublePart.enableCopyDesignFromSide">
                                <div :class="`peer-checked:after:aso-border-[#016464] peer-checked:after:aso-border-solid peer-checked:after:aso-border-[5px] peer-checked:after:aso-top-[-1px] peer-checked:after:aso-translate-y-[-15%] aso-w-10 aso-h-3 aso-border aso-border-[5px] aso-border-[#016464] aso-bg-zinc-300 aso-rounded-full aso-peer peer-checked:after:aso-translate-x-[140%] after:aso-content-[''] after:aso-absolute after:aso-top-[-2px] after:aso-left-[-5px] after:aso-bg-zinc-300 after:aso-border-white after:aso-border-solid after:aso-translate-y-[-15%] after:aso-border-[#FFFFFF] after:aso-border-[5px] after:aso-rounded-full after:aso-h-2.5 after:aso-w-2.5 after:aso-transition-all after:aso-shadow-lg`"></div>
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
        label:"Switch Face",
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
</script> 