<template>
    <div>
            
        <div>
            <div class="aso-bg-[#F8F9FB] aso-px-8 aso-py-8 aso-space-y-6 aso-translate-y-8">
                <h3 class="aso-text-[16px] aso-semibold">Custom design link</h3>
                <div class="aso-flex aso-space-x-3">
                    <div class="aso-text-[11px]">Enable custom design link</div>
                    <div class="aso-flex aso-items-center aso-translate-y-0.5">
                        <label for="toggleEnableCustom" class="aso-relative aso-inline-flex aso-items-center aso-cursor-pointer aso-border-[1px] aso-border-solid aso-border-black aso-rounded-full">
                            <input id="toggleEnableCustom" type="checkbox" name="toggleEnableCustom" class="aso-sr-only aso-peer" value="toggleEnableCustom" v-model="uploadDesign.activate">
                            <div :class="`peer-checked:after:aso-border-[#016464] peer-checked:after:aso-border-solid peer-checked:after:aso-border-[5px] peer-checked:after:aso-top-[-2px] peer-checked:after:aso-translate-y-[-15%] aso-w-10 aso-h-3 aso-border aso-border-[5px] aso-border-[#016464] aso-bg-zinc-300 aso-rounded-full aso-peer peer-checked:after:aso-translate-x-[140%] after:aso-content-[''] after:aso-absolute after:aso-top-[-2px] after:aso-left-[-5px] after:aso-bg-zinc-300 after:aso-border-white after:aso-border-solid after:aso-translate-y-[-15%] after:aso-border-[#FFFFFF] after:aso-border-[5px] after:aso-rounded-full after:aso-h-2.5 after:aso-w-2.5 after:aso-transition-all after:aso-shadow-lg`"></div>
                        </label>
                    </div>
                </div>
                <div class="aso-text-[11px] aso-text-[#444444]">
                    Enable this to display a link to direct customers to another page on your site, this will display as one of the first options on desktop and mobile.
                </div>
                <div class="aso-flex aso-flex-col aso-w-3/5 aso-space-y-2" v-if="uploadDesign.activate">
                    <label class="aso-text-[12px] aso-text-[#444444]">Custom Design Link</label>
                    <input type="text" v-model="uploadDesign.link" class="aso-w-full"/>
                    <span class="aso-text-[12px] aso-text-[#444444]">URL to redirect customers on your store that will allow for more complex graphic design quote submissions.</span>
                </div>
                <div class="aso-flex aso-flex-col aso-w-3/5 aso-space-y-2" v-if="uploadDesign.activate">
                    <label class="aso-text-[12px] aso-text-[#444444]">Phrase for link to submit custom design page</label>
                    <input type="text" v-model="uploadDesign.phraseSubmitCustom" class="aso-w-full"/>

                </div>
                
            </div>
        </div>
        <div class="aso-bg-[#F8F9FB] aso-flex aso-space-x-4 aso-px-4 aso-py-3 aso-justify-end aso-items-end aso-translate-y-12">
            <div class="aso-bg-[#016464] aso-rounded">
                <button :disabled="isLoading" @click="updateUploadDesignSettings" class="aso-rounded aso-flex aso-bg-transparent aso-w-fit aso-space-x-2 aso-h-fit aso-text-white aso-px-12 aso-p-2.5 aso-border-none aso-opacity-90 hover:aso-opacity-100 hover:aso-border-none hover:aso-text-white hover:aso-bg-[#016464] aso-cursor-pointeraso-flex aso-bg-transparent aso-w-fit aso-space-x-2 aso-h-fit aso-text-white aso-px-12 aso-p-2.5 aso-border-none aso-opacity-90 hover:aso-opacity-100 hover:aso-border-none hover:aso-text-white hover:aso-bg-[#016464] aso-cursor-pointer">
                    <img src="../../../../../../assets/icons/ic_loading_gray.svg" class="aso-w-5 aso-w-5" v-if="isLoading" />
                    <div class="aso-font-semibold aso-text-[16px]">Save</div>
                </button>
            </div>
        </div>
    </div>
</template>
<script setup>
import {ref,defineProps, onMounted} from 'vue';
import api from '@/admin/Api/api';
import { useRoute } from 'vue-router';
import toastMessage from '@/admin/utils/functions';
const props = defineProps({
    data:Object,
    fetchSettings:Function
});
const route = useRoute();
const isLoading =ref(false);
const configId = ref(route.params.configId);
const uploadDesign = ref({
    activate: false,
    link: "",
    phraseSubmitCustom: "Take a customization"
})


onMounted(() => {
    if(props.data){
        uploadDesign.value = {...uploadDesign.value,...props.data}
    }
});

const updateUploadDesignSettings = async () => {
    isLoading.value = true;
    const result = await api.updateLanguageImagesUploadDesign(configId.value,uploadDesign.value);
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