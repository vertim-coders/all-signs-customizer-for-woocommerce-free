<template>
    <div>
        <div class="asowp-bg-[#F8F9FB] asowp-px-8 asowp-py-4 asowp-translate-y-10">
            <div class="asowp-flex asowp-flex-col asowp-space-y-3">
                <label class="asowp-text-[14px] asowp-font-bold">{{ __("Output files format", "all-signs-options-pro") }}</label>
                <span class="asowp-pt-4 asowp-text-[11px]">{{ __("What is your desired output files format ?", "all-signs-options-pro") }}</span>
                <select v-model="Output.filesFormat">
                    <option value="png">{{ __("PNG", "all-signs-options-pro") }}</option>
                    <option value="jpeg">{{ __("JPEG", "all-signs-options-pro") }}</option>
                    <option value="svg">{{ __("SVG", "all-signs-options-pro") }}</option>
                    <option value="png+jpeg">{{ __("PNG + JPEG", "all-signs-options-pro") }}</option>
                    <option value="png+svg">{{ __("PNG + SVG", "all-signs-options-pro") }}</option>
                    <option value="jpeg+svg">{{ __("JPEG + SVG", "all-signs-options-pro") }}</option>
                </select>
            </div>
            <div class="asowp-flex asowp-flex-col asowp-space-y-3 asowp-pt-4">
                <label class="asowp-text-[14px] asowp-font-bold">{{ __("Watermark", "all-signs-options-pro") }}</label>
                <div class=" asowp-flex asowp-flex-col asowp-space-y-2 asowp-text-[12px]">
                    <label for="" class="asowp-font-normal">{{ __("Upload Image", "all-signs-options-pro") }}</label>
                    <div class="asowp-flex asowp-flex-col asowp-space-y-2 asowp-w-full asowp-pt-2 asowp-w-1/2">
                        <div class="asowp-flex asowp-space-x-2">
                            <button @click="selectWaterMarkImage" class="asowp-bg-[#016464] asowp-border-none asowp-w-fit asowp-h-fit asowp-p-4 asowp-rounded asowp-px-4 asowp-text-white asowp-opacity-90 hover:asowp-opacity-100 asowp-text-[10px] asowp-cursor-pointer">{{ __("upload PopupImg", "all-signs-options-pro") }}</button>
                            <div :class="`asowp-relative asowp-w-[82px] asowp-h-[49px] asowp-rounded-md asowp-overflow-hidden`">
                                <img v-if="Output.waterMark != ''" :src="Output.waterMark" alt="" class="asowp-absolute asowp-w-full asowp-h-full">
                                <button v-if="Output.waterMark != ''" @click="()=>{Output.waterMark = ''}" :class="`asowp-bg-[#016464] asowp-absolute asowp-bottom-0 asowp-right-0 asowp-text-white asowp-p-1 asowp-rounded-tl-lg asowp-border-none`">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="asowp-w-4 asowp-h-4">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="asowp-flex asowp-flex-col asowp-space-y-3 asowp-py-10">
                <div class="asowp-flex asowp-space-x-2">
                    <label class="asowp-text-[16px] asowp-font-semibold">{{ __("Zip output files", "all-signs-options-pro") }}</label>
                    <div class="asowp-flex asowp-items-center">
                        <label for="toggleZip" class="asowp-relative asowp-inline-flex asowp-items-center asowp-cursor-pointer asowp-border-[1px] asowp-border-solid asowp-border-black asowp-rounded-full">
                            <input id="toggleZip" type="checkbox" name="toggleZip" class="asowp-sr-only asowp-peer" v-model="Output.zipOutputFiles.active">
                            <div :class="`peer-checked:after:asowp-border-[#016464] peer-checked:after:asowp-border-solid peer-checked:after:asowp-border-[5px] peer-checked:after:asowp-top-[-2px] peer-checked:after:asowp-translate-y-[-15%] asowp-w-10 asowp-h-3 asowp-border asowp-border-[5px] asowp-border-[#016464] asowp-bg-zinc-300 asowp-rounded-full asowp-peer peer-checked:after:asowp-translate-x-[112%] after:asowp-content-[''] after:asowp-absolute after:asowp-top-[-3px] after:asowp-left-[-5px] after:asowp-bg-zinc-300 after:asowp-border-white after:asowp-border-solid after:asowp-translate-y-[-15%] after:asowp-border-[#FFFFFF] after:asowp-border-[5px] after:asowp-rounded-full after:asowp-h-3 after:asowp-w-3 after:asowp-transition-all after:asowp-shadow-lg`"></div>
                        </label>
                    </div>
                </div>
                <div v-if="Output.zipOutputFiles.active" class="asowp-flex asowp-flex-col asowp-space-y-3">
                    <span>{{ __("Zip output folder prefix", "all-signs-options-pro") }}</span>
                    <input type="text" v-model="Output.zipOutputFiles.zipOutFolderPrefix" class="asowp-full"/>
                </div>
                
            </div>
            <div class="asowp-space-y-3">
                <div class="asowp-flex asowp-space-x-3">
                    <label class="asowp-text-[16px] asowp-font-semibold">{{ __("Design composition", "all-signs-options-pro") }}</label>
                    <div class="asowp-flex asowp-items-center asowp-translate-y-0.5">
                        <label for="toggleDesign" class="asowp-relative asowp-inline-flex asowp-items-center asowp-cursor-pointer asowp-border-[1px] asowp-border-solid asowp-border-black asowp-rounded-full">
                            <input id="toggleDesign" type="checkbox" name="toggleDesign" class="asowp-sr-only asowp-peer" v-model="Output.designComposition">
                            <div :class="`peer-checked:after:asowp-border-[#016464] peer-checked:after:asowp-border-solid peer-checked:after:asowp-border-[5px] peer-checked:after:asowp-top-[-2px] peer-checked:after:asowp-translate-y-[-15%] asowp-w-10 asowp-h-3 asowp-border asowp-border-[5px] asowp-border-[#016464] asowp-bg-zinc-300 asowp-rounded-full asowp-peer peer-checked:after:asowp-translate-x-[112%] after:asowp-content-[''] after:asowp-absolute after:asowp-top-[-3px] after:asowp-left-[-5px] after:asowp-bg-zinc-300 after:asowp-border-white after:asowp-border-solid after:asowp-translate-y-[-15%] after:asowp-border-[#FFFFFF] after:asowp-border-[5px] after:asowp-rounded-full after:asowp-h-3 after:asowp-w-3 after:asowp-transition-all after:asowp-shadow-lg`"></div>
                        </label>
                    </div>
                    
                </div>
                <div class="asowp-text-[11px] asowp-text-[#444444]">
                    {{ __("This option allows you to display or not design composition in the order", "all-signs-options-pro") }}
                </div>
                
            </div>
        </div>
    </div>
    <div class="asowp-bg-[#F8F9FB] asowp-flex asowp-space-x-4 asowp-px-4 asowp-py-3 asowp-justify-end asowp-items-end asowp-translate-y-12">
        <div class="asowp-bg-[#016464] asowp-rounded">
            <button :disabled="isLoading" @click="updateOutputSettings" class="asowp-rounded asowp-flex asowp-bg-transparent asowp-w-fit asowp-space-x-2 asowp-h-fit asowp-text-white asowp-px-12 asowp-p-2.5 asowp-border-none asowp-opacity-90 hover:asowp-opacity-100 hover:asowp-border-none hover:asowp-text-white hover:asowp-bg-[#016464] asowp-cursor-pointerasowp-flex asowp-bg-transparent asowp-w-fit asowp-space-x-2 asowp-h-fit asowp-text-white asowp-px-12 asowp-p-2.5 asowp-border-none asowp-opacity-90 hover:asowp-opacity-100 hover:asowp-border-none hover:asowp-text-white hover:asowp-bg-[#016464] asowp-cursor-pointer">
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
const Output = ref({
    filesFormat:'png',
    waterMark:'',
    zipOutputFiles:{
        active:true,
        zipOutFolderPrefix:'asowp_',
    },
    designComposition:true
});
onMounted(() => {
    if(props.data){
        Output.value = {...Output.value,...props.data}
    }
});

const updateOutputSettings = async () => {
    isLoading.value = true;
    const result = await api.updateGeneralOutput(configId.value,Output.value);
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
const selectWaterMarkImage = async(e) => { 
    e.preventDefault();
    var uploader = wp.media(
        {
            title: __("Select WaterMark Image","all-signs-options-pro"),
            button: {
                text: __("Select Image","all-signs-options-pro")
            },
            multiple: false
        }
    )
        .on(
            'select',
            function () {
                var selection = uploader.state().get('selection');
                selection.map(
                    function (attachment) {
                        attachment = attachment.toJSON();
                        if (attachment.type == "image") {
                            Output.value.waterMark = (attachment.url);
                        }
                    }
                );
            }
        )
        .open();
}
const handleZipOutputFiles = () => {
    Output.value.zipOutputFiles.active = !Output.value.zipOutputFiles.active;
};
</script> 