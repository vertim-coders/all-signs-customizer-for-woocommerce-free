<template>
    <div>
        <div class="asowp-space-y-4 asowp-translate-y-8">
            <div>
                <div class="asowp-bg-[#F8F9FB] asowp-px-8 asowp-py-8 asowp-space-y-6">
                    <div class="asowp-flex asowp-space-x-3">
                        <div class="asowp-text-[16px]">{{ __("Activate the double-sided option", "all-signs-options-pro") }}</div>
                        <div class="asowp-flex asowp-items-center asowp-translate-y-0.5">
                            <label for="toggleActivate" class="asowp-relative asowp-inline-flex asowp-items-center asowp-cursor-pointer asowp-border-[1px] asowp-border-solid asowp-border-black asowp-rounded-full">
                                <input id="toggleActivate" type="checkbox" name="toggleActivate" class="asowp-sr-only asowp-peer" v-model="signPart.doublePart.active">
                                <div :class="`peer-checked:after:asowp-border-[#016464] peer-checked:after:asowp-border-solid peer-checked:after:asowp-border-[5px] peer-checked:after:asowp-top-[-2px] peer-checked:after:asowp-translate-y-[-15%] asowp-w-10 asowp-h-3 asowp-border asowp-border-[5px] asowp-border-[#016464] asowp-bg-zinc-300 asowp-rounded-full asowp-peer peer-checked:after:asowp-translate-x-[140%] after:asowp-content-[''] after:asowp-absolute after:asowp-top-[-2px] after:asowp-left-[-5px] after:asowp-bg-zinc-300 after:asowp-border-white after:asowp-border-solid after:asowp-translate-y-[-15%] after:asowp-border-[#FFFFFF] after:asowp-border-[5px] after:asowp-rounded-full after:asowp-h-2.5 after:asowp-w-2.5 after:asowp-transition-all after:asowp-shadow-lg`"></div>
                            </label>
                        </div>
                    </div>
                    <div class="asowp-flex asowp-flex-col asowp-w-2/5 asowp-space-y-2"  v-if="signPart.doublePart.active">
                        <label class="asowp-font-semibold asowp-text-[16px]">{{ __("Label of option to change face", "all-signs-options-pro") }}</label>
                        <input type="text" v-model="signPart.doublePart.label" class="asowp-w-3/5"/>
                    </div>
                    <div class="asowp-flex asowp-justify-between" v-if="signPart.doublePart.active">
                        <div class="asowp-flex asowp-flex-col asowp-w-2/5 asowp-space-y-2">
                            <label class="asowp-font-semibold asowp-text-[16px]">{{ __("Part 1", "all-signs-options-pro") }}</label>
                            <input type="text" v-model="signPart.doublePart.part1" class="asowp-w-full"/>
                        </div>
                        <div class="asowp-flex asowp-flex-col asowp-w-2/5 asowp-space-y-2">
                            <label class="asowp-font-semibold asowp-text-[16px]">{{ __("Part 2", "all-signs-options-pro") }}</label>
                            <input type="text" v-model="signPart.doublePart.part2" class="asowp-w-full"/>
                        </div>
                    </div>
                </div>
            </div>
            <div class="asowp-bg-[#F8F9FB] asowp-flex asowp-space-x-4 asowp-px-4 asowp-py-3 asowp-justify-end asowp-items-end">
                <div class="asowp-bg-[#016464] asowp-rounded">
                    <button :disabled="isLoading" @click="updateSignPartSettings" class="asowp-rounded asowp-flex asowp-bg-transparent asowp-w-fit asowp-space-x-2 asowp-h-fit asowp-text-white asowp-px-12 asowp-p-2.5 asowp-border-none asowp-opacity-90 hover:asowp-opacity-100 hover:asowp-border-none hover:asowp-text-white hover:asowp-bg-[#016464] asowp-cursor-pointerasowp-flex asowp-bg-transparent asowp-w-fit asowp-space-x-2 asowp-h-fit asowp-text-white asowp-px-12 asowp-p-2.5 asowp-border-none asowp-opacity-90 hover:asowp-opacity-100 hover:asowp-border-none hover:asowp-text-white hover:asowp-bg-[#016464] asowp-cursor-pointer">
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