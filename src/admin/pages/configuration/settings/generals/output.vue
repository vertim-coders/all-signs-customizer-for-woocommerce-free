<template>
    <div>
        <div class="aso-bg-[#F8F9FB] aso-px-8 aso-py-4">
            <div class="aso-flex aso-flex-col aso-space-y-3">
                <label class="aso-text-[14px] aso-font-bold">Output files format</label>
                <span class="aso-pt-4 aso-text-[11px]">What is your desired output files format ?</span>
                <select v-model="Output.filesFormat">
                    <option value="png">PNG</option>
                    <option value="jpeg">JPEG</option>
                    <option value="svg">SVG</option>
                    <option value="png+jpeg">PNG + JPEG</option>
                    <option value="png+svg">PNG + SVG</option>
                    <option value="jpeg+svg">JPEG + SVG</option>
                </select>
            </div>
            <div class="aso-flex aso-flex-col aso-space-y-3 aso-pt-4">
                <label class="aso-text-[14px] aso-font-bold">Watermark</label>
                <div class=" aso-flex aso-flex-col aso-space-y-2 aso-text-[12px]">
                    <label for="" class="aso-font-normal">Upload Image</label>
                    <div class="aso-flex aso-flex-col aso-space-y-2 aso-w-full aso-pt-2 aso-w-1/2">
                        <div class="aso-flex aso-space-x-2">
                            <button @click="selectWaterMarkImage" class="aso-bg-[#016464] aso-border-none aso-w-fit aso-h-fit aso-p-4 aso-rounded aso-px-4 aso-text-white aso-opacity-90 hover:aso-opacity-100 aso-text-[10px] aso-cursor-pointer">upload PopupImg</button>
                            <div :class="`aso-relative aso-w-[82px] aso-h-[49px] aso-rounded-md aso-overflow-hidden`">
                                <img v-if="Output.waterMark != ''" :src="Output.waterMark" alt="" class="aso-absolute aso-w-full aso-h-full">
                                <button v-if="Output.waterMark != ''" @click="()=>{Output.waterMark = ''}" :class="`aso-bg-[#016464] aso-absolute aso-bottom-0 aso-right-0 aso-text-white aso-p-1 aso-rounded-tl-lg aso-border-none`">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="aso-w-4 aso-h-4">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="aso-flex aso-flex-col aso-space-y-3 aso-py-10">
                <div class="aso-flex aso-space-x-2">
                    <label class="aso-text-[16px] aso-font-semibold">Zip output files</label>
                    <div class="aso-flex aso-items-center">
                        <label for="aso-toggle" @click="handleZipOutputFiles" class="aso-cursor-pointer aso-bg-[#F8F8FF] aso-border-[1px] aso-border-solid aso-border-black aso-w-6 aso-h-0.5 aso-rounded-full aso-p-1">
                         <div :class="{'aso-translate-x-[100%]': Output.zipOutputFiles.active, 'aso-bg-active': Output.zipOutputFiles.active }" class="aso-toggle-dot aso-w-2.5 aso-h-2.5 -aso-translate-y-[8px] -aso-translate-x-2 aso-border-[4px] aso-border-solid aso-border-[#008000] aso-bg-white aso-rounded-full aso-shadow-md aso-transform"></div>
                        </label>
                    </div>
                </div>
                <div v-if="Output.zipOutputFiles.active" class="aso-flex aso-flex-col aso-space-y-3">
                    <span>Zip output folder prefix</span>
                    <input type="text" v-model="Output.zipOutputFiles.zipOutFolderPrefix" class="aso-full"/>
                </div>
                
            </div>
            <div class="aso-space-y-3">
                <div class="aso-flex aso-space-x-3">
                    <label class="aso-text-[16px] aso-font-semibold">Design composition</label>
                    <div class="aso-flex aso-items-center aso-translate-y-0.5">
                        <label for="aso-toggle" @click="handleDesignComposition" class="aso-cursor-pointer aso-bg-[#F8F8FF] aso-border-[1px] aso-border-solid aso-border-black aso-w-6 aso-h-0.5 aso-rounded-full aso-p-1">
                         <div :class="{'aso-translate-x-[100%]': Output.designComposition, 'aso-bg-active': Output.designComposition }" class="aso-toggle-dot aso-w-2.5 aso-h-2.5 -aso-translate-y-[8px] -aso-translate-x-2 aso-border-[4px] aso-border-solid aso-border-[#008000] aso-bg-white aso-rounded-full aso-shadow-md aso-transform"></div>
                        </label>
                    </div>
                </div>
                <div class="aso-text-[11px] aso-text-[#444444]">
                    This option allows you to display or not design composition in the order
                </div>
                
            </div>
        </div>
    </div>
    <div class="aso-bg-[#F8F9FB] aso-flex aso-space-x-4 aso-px-4 aso-py-3 aso-justify-end aso-items-end">
        <div class="aso-bg-[#016464] aso-rounded">
            <button :disabled="isLoading" @click="updateOutputSettings" class="aso-rounded aso-flex aso-bg-transparent aso-w-fit aso-space-x-2 aso-h-fit aso-text-white aso-px-12 aso-p-2.5 aso-border-none aso-opacity-90 hover:aso-opacity-100 hover:aso-border-none hover:aso-text-white hover:aso-bg-[#016464] aso-cursor-pointeraso-flex aso-bg-transparent aso-w-fit aso-space-x-2 aso-h-fit aso-text-white aso-px-12 aso-p-2.5 aso-border-none aso-opacity-90 hover:aso-opacity-100 hover:aso-border-none hover:aso-text-white hover:aso-bg-[#016464] aso-cursor-pointer">
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
const Output = ref({
    filesFormat:'png',
    waterMark:'',
    zipOutputFiles:{
        active:true,
        zipOutFolderPrefix:'aso_',
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
            title: "Select WaterMark Image",
            button: {
                text: "Select Image"
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
const handleDesignComposition = () => {
    Output.value.designComposition = !Output.value.designComposition;
};
</script> 