<template>
    <div>
        <div class="ascwo-bg-[#F8F9FB] ascwo-px-8 ascwo-py-4 ascwo-translate-y-10">
            <div class="ascwo-flex ascwo-flex-col ascwo-space-y-3">
                <label class="ascwo-text-[14px] ascwo-font-bold">{{ __("Output files format", "all-signs-customizer-for-woocommerce") }}</label>
                <span class="ascwo-pt-4 ascwo-text-[11px]">{{ __("What is your desired output files format ?", "all-signs-customizer-for-woocommerce") }}</span>
                <select v-model="Output.filesFormat">
                    <option value="png">{{ __("PNG", "all-signs-customizer-for-woocommerce") }}</option>
                    <option value="jpeg">{{ __("JPEG", "all-signs-customizer-for-woocommerce") }}</option>
                    <option value="svg">{{ __("SVG", "all-signs-customizer-for-woocommerce") }}</option>
                    <option value="png+jpeg">{{ __("PNG + JPEG", "all-signs-customizer-for-woocommerce") }}</option>
                    <option value="png+svg">{{ __("PNG + SVG", "all-signs-customizer-for-woocommerce") }}</option>
                    <option value="jpeg+svg">{{ __("JPEG + SVG", "all-signs-customizer-for-woocommerce") }}</option>
                </select>
            </div>
            <div class="ascwo-flex ascwo-flex-col ascwo-space-y-3 ascwo-pt-4">
                <label class="ascwo-text-[14px] ascwo-font-bold">{{ __("Watermark", "all-signs-customizer-for-woocommerce") }}</label>
                <div class=" ascwo-flex ascwo-flex-col ascwo-space-y-2 ascwo-text-[12px]">
                    <label for="" class="ascwo-font-normal">{{ __("Upload Image", "all-signs-customizer-for-woocommerce") }}</label>
                    <div class="ascwo-flex ascwo-flex-col ascwo-space-y-2 ascwo-w-full ascwo-pt-2 ascwo-w-1/2">
                        <div class="ascwo-flex ascwo-space-x-2">
                            <button @click="selectWaterMarkImage" class="ascwo-bg-[#016464] ascwo-border-none ascwo-w-fit ascwo-h-fit ascwo-p-4 ascwo-rounded ascwo-px-4 ascwo-text-white ascwo-opacity-90 hover:ascwo-opacity-100 ascwo-text-[10px] ascwo-cursor-pointer">{{ __("upload PopupImg", "all-signs-customizer-for-woocommerce") }}</button>
                            <div :class="`ascwo-relative ascwo-w-[82px] ascwo-h-[49px] ascwo-rounded-md ascwo-overflow-hidden`">
                                <img v-if="Output.waterMark != ''" :src="Output.waterMark" alt="" class="ascwo-absolute ascwo-w-full ascwo-h-full">
                                <button v-if="Output.waterMark != ''" @click="()=>{Output.waterMark = ''}" :class="`ascwo-bg-[#016464] ascwo-absolute ascwo-bottom-0 ascwo-right-0 ascwo-text-white ascwo-p-1 ascwo-rounded-tl-lg ascwo-border-none`">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="ascwo-w-4 ascwo-h-4">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="ascwo-flex ascwo-flex-col ascwo-space-y-3 ascwo-py-10">
                <div class="ascwo-flex ascwo-space-x-2">
                    <label class="ascwo-text-[16px] ascwo-font-semibold">{{ __("Zip output files", "all-signs-customizer-for-woocommerce") }}</label>
                    <div class="ascwo-flex ascwo-items-center">
                        <label for="toggleZip" class="ascwo-relative ascwo-inline-flex ascwo-items-center ascwo-cursor-pointer ascwo-border-[1px] ascwo-border-solid ascwo-border-black ascwo-rounded-full">
                            <input id="toggleZip" type="checkbox" name="toggleZip" class="ascwo-sr-only ascwo-peer" v-model="Output.zipOutputFiles.active">
                            <div :class="`peer-checked:after:ascwo-border-[#016464] peer-checked:after:ascwo-border-solid peer-checked:after:ascwo-border-[5px] peer-checked:after:ascwo-top-[-2px] peer-checked:after:ascwo-translate-y-[-15%] ascwo-w-10 ascwo-h-3 ascwo-border ascwo-border-[5px] ascwo-border-[#016464] ascwo-bg-zinc-300 ascwo-rounded-full ascwo-peer peer-checked:after:ascwo-translate-x-[112%] after:ascwo-content-[''] after:ascwo-absolute after:ascwo-top-[-3px] after:ascwo-left-[-5px] after:ascwo-bg-zinc-300 after:ascwo-border-white after:ascwo-border-solid after:ascwo-translate-y-[-15%] after:ascwo-border-[#FFFFFF] after:ascwo-border-[5px] after:ascwo-rounded-full after:ascwo-h-3 after:ascwo-w-3 after:ascwo-transition-all after:ascwo-shadow-lg`"></div>
                        </label>
                    </div>
                </div>
                <div v-if="Output.zipOutputFiles.active" class="ascwo-flex ascwo-flex-col ascwo-space-y-3">
                    <span>{{ __("Zip output folder prefix", "all-signs-customizer-for-woocommerce") }}</span>
                    <input type="text" v-model="Output.zipOutputFiles.zipOutFolderPrefix" class="ascwo-full"/>
                </div>
                
            </div>
            <div class="ascwo-space-y-3">
                <div class="ascwo-flex ascwo-space-x-3">
                    <label class="ascwo-text-[16px] ascwo-font-semibold">{{ __("Design composition", "all-signs-customizer-for-woocommerce") }}</label>
                    <div class="ascwo-flex ascwo-items-center ascwo-translate-y-0.5">
                        <label for="toggleDesign" class="ascwo-relative ascwo-inline-flex ascwo-items-center ascwo-cursor-pointer ascwo-border-[1px] ascwo-border-solid ascwo-border-black ascwo-rounded-full">
                            <input id="toggleDesign" type="checkbox" name="toggleDesign" class="ascwo-sr-only ascwo-peer" v-model="Output.designComposition">
                            <div :class="`peer-checked:after:ascwo-border-[#016464] peer-checked:after:ascwo-border-solid peer-checked:after:ascwo-border-[5px] peer-checked:after:ascwo-top-[-2px] peer-checked:after:ascwo-translate-y-[-15%] ascwo-w-10 ascwo-h-3 ascwo-border ascwo-border-[5px] ascwo-border-[#016464] ascwo-bg-zinc-300 ascwo-rounded-full ascwo-peer peer-checked:after:ascwo-translate-x-[112%] after:ascwo-content-[''] after:ascwo-absolute after:ascwo-top-[-3px] after:ascwo-left-[-5px] after:ascwo-bg-zinc-300 after:ascwo-border-white after:ascwo-border-solid after:ascwo-translate-y-[-15%] after:ascwo-border-[#FFFFFF] after:ascwo-border-[5px] after:ascwo-rounded-full after:ascwo-h-3 after:ascwo-w-3 after:ascwo-transition-all after:ascwo-shadow-lg`"></div>
                        </label>
                    </div>
                    
                </div>
                <div class="ascwo-text-[11px] ascwo-text-[#444444]">
                    {{ __("This option allows you to display or not design composition in the order", "all-signs-customizer-for-woocommerce") }}
                </div>
                
            </div>
        </div>
    </div>
    <div class="ascwo-bg-[#F8F9FB] ascwo-flex ascwo-space-x-4 ascwo-px-4 ascwo-py-3 ascwo-justify-end ascwo-items-end ascwo-translate-y-12">
        <div class="ascwo-bg-[#016464] ascwo-rounded">
            <button :disabled="isLoading" @click="updateOutputSettings" class="ascwo-rounded ascwo-flex ascwo-bg-transparent ascwo-w-fit ascwo-space-x-2 ascwo-h-fit ascwo-text-white ascwo-px-12 ascwo-p-2.5 ascwo-border-none ascwo-opacity-90 hover:ascwo-opacity-100 hover:ascwo-border-none hover:ascwo-text-white hover:ascwo-bg-[#016464] ascwo-cursor-pointerascwo-flex ascwo-bg-transparent ascwo-w-fit ascwo-space-x-2 ascwo-h-fit ascwo-text-white ascwo-px-12 ascwo-p-2.5 ascwo-border-none ascwo-opacity-90 hover:ascwo-opacity-100 hover:ascwo-border-none hover:ascwo-text-white hover:ascwo-bg-[#016464] ascwo-cursor-pointer">
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
const Output = ref({
    filesFormat:'png',
    waterMark:'',
    zipOutputFiles:{
        active:true,
        zipOutFolderPrefix:'ascwo_',
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
            title: __("Select WaterMark Image","all-signs-customizer-for-woocommerce"),
            button: {
                text: __("Select Image","all-signs-customizer-for-woocommerce")
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