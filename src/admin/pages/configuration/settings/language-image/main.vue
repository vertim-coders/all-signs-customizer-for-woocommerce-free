<template>
    <div class="aso-space-y-1">
        <div class="aso-bg-[#F8F9FB] aso-px-8 aso-py-8 aso-space-y-6">
            <h3 class="aso-text-[16px]">Content Header</h3>
            <div class="aso-flex aso-justify-between">
                <div class="aso-flex aso-flex-col aso-w-2/5 aso-space-y-2">
                    <label class="aso-text-[12px] aso-text-[#444444]">Title Header</label>
                    <input type="text" v-model="main.titleHeader" placeholder="" class="aso-w-full"/>
                </div>
                <div class="aso-flex aso-flex-col aso-w-2/5 aso-space-y-2">
                    <label class="so-text-[12px] aso-text-[#444444]">Text button refresh</label>
                    <input type="text" v-model="main.textButtonRefresh" placeholder="" class="aso-w-full"/>
                </div>
            </div>
            <div class="aso-flex aso-justify-between">
                <div class="aso-flex aso-flex-col aso-w-2/5 aso-space-y-2">
                    <label class="aso-text-[12px] aso-text-[#444444]">Text button back</label>
                    <input type="text" v-model="main.textButtonBack" placeholder="" class="aso-w-full"/>
                </div>
                <div class="aso-flex aso-flex-col aso-w-2/5 aso-space-y-2">
                    <label class="so-text-[12px] aso-text-[#444444]">Text button next</label>
                    <input type="text" v-model="main.textButtonNext" placeholder="" class="aso-w-full"/>
                </div>
            </div>
            <div class="aso-flex aso-justify-between">
                <div class="aso-flex aso-flex-col aso-w-2/5 aso-space-y-2">
                    <label class="aso-text-[12px] aso-text-[#444444]">Text price</label>
                    <input type="text" v-model="main.textPrice" placeholder="" class="aso-w-full"/>
                </div>
                <div class="aso-flex aso-flex-col aso-w-2/5 aso-space-y-2">
                    <label class="so-text-[12px] aso-text-[#444444]">Text button finish</label>
                    <input type="text" v-model="main.textButtonFinish" placeholder="" class="aso-w-full"/>
                </div>
            </div>
            
        </div>
        <div class="aso-bg-[#F8F9FB] aso-px-8 aso-py-8 aso-space-y-6">
            <h3 class="aso-text-[16px]">Content Sidebar</h3>
            <div class="aso-flex aso-justify-between">
                <div class="aso-flex aso-flex-col aso-w-2/5 aso-space-y-2">
                    <label class="aso-text-[12px] aso-text-[#444444]">Preview text</label>
                    <input type="text" v-model="main.textPreview" placeholder="" class="aso-w-full"/>
                </div>
                <div class="aso-flex aso-flex-col aso-w-2/5 aso-space-y-2">
                    <label class="so-text-[12px] aso-text-[#444444]">Share text</label>
                    <input type="text" v-model="main.textShare" placeholder="" class="aso-w-full"/>
                </div>
            </div>
            <div class="aso-flex aso-justify-between">
                <div class="aso-flex aso-flex-col aso-w-2/5 aso-space-y-2">
                    <label class="aso-text-[12px] aso-text-[#444444]">Import text</label>
                    <input type="text" v-model="main.textImport" placeholder="" class="aso-w-full"/>
                </div>
                <div class="aso-flex aso-flex-col aso-w-2/5 aso-space-y-2">
                    <label class="so-text-[12px] aso-text-[#444444]">Download text</label>
                    <input type="text" v-model="main.textDownload" placeholder="" class="aso-w-full"/>
                </div>
            </div>
            <div class="aso-flex aso-justify-between">
                <div class="aso-flex aso-flex-col aso-w-2/5 aso-space-y-2">
                    <label class="aso-text-[12px] aso-text-[#444444]">Save text</label>
                    <input type="text" v-model="main.textSave" placeholder="" class="aso-w-full"/>
                </div>
                <div class="aso-flex aso-flex-col aso-w-2/5 aso-space-y-2">
                    <label class="so-text-[12px] aso-text-[#444444]">Help text</label>
                    <input type="text" v-model="main.textHelp" placeholder="" class="aso-w-full"/>
                </div>
            </div>
        </div>
        <div class="aso-bg-[#F8F9FB] aso-px-8 aso-py-8 aso-space-y-6">
            <h3 class="aso-text-[16px]">Button Options</h3>
            <div class="aso-flex aso-justify-between">
                <div class="aso-flex aso-flex-col aso-w-2/5 aso-space-y-2">
                    <label class="aso-text-[12px] aso-text-[#444444]">Text Material</label>
                    <input type="text" v-model="main.textMaterial" placeholder="" class="aso-w-full"/>
                </div>
                <div class="aso-flex aso-flex-col aso-w-2/5 aso-space-y-2">
                    <label class="so-text-[12px] aso-text-[#444444]">Text Size</label>
                    <input type="text" v-model="main.textSize" placeholder="" class="aso-w-full"/>
                </div>
            </div>
            <div class="aso-flex aso-justify-between">
                <div class="aso-flex aso-flex-col aso-w-2/5 aso-space-y-2">
                    <label class="aso-text-[12px] aso-text-[#444444]">Text Shape</label>
                    <input type="text" v-model="main.textShape" placeholder="" class="aso-w-full"/>
                </div>
                <div class="aso-flex aso-flex-col aso-w-2/5 aso-space-y-2">
                    <label class="so-text-[12px] aso-text-[#444444]">Text Fixing Methods</label>
                    <input type="text" v-model="main.textFixingMethods" placeholder="" class="aso-w-full"/>
                </div>
            </div>
            <div class="aso-flex aso-justify-between">
                <div class="aso-flex aso-flex-col aso-w-2/5 aso-space-y-2">
                    <label class="aso-text-[12px] aso-text-[#444444]">Text Color</label>
                    <input type="text" v-model="main.textColor" placeholder="" class="aso-w-full"/>
                </div>
                <div class="aso-flex aso-flex-col aso-w-2/5 aso-space-y-2">
                    <label class="so-text-[12px] aso-text-[#444444]">Text option Text</label>
                    <input type="text" v-model="main.textOptionText" placeholder="" class="aso-w-full"/>
                </div>
            </div>
            <div class="aso-flex aso-justify-between">
                <div class="aso-flex aso-flex-col aso-w-2/5 aso-space-y-2">
                    <label class="aso-text-[12px] aso-text-[#444444]">Text Border</label>
                    <input type="text" v-model="main.textBorder" placeholder="" class="aso-w-full"/>
                </div>
                <div class="aso-flex aso-flex-col aso-w-2/5 aso-space-y-2">
                    <label class="so-text-[12px] aso-text-[#444444]">Text Product</label>
                    <input type="text" v-model="main.textProduct" placeholder="" class="aso-w-full"/>
                </div>
            </div>
            <div class="aso-flex aso-flex-col aso-w-2/5 aso-space-y-2">
                <label class="aso-text-[12px] aso-text-[#444444]">Text Image</label>
                <input type="text" v-model="main.textImage" placeholder="" class="aso-w-full"/>
            </div>
        </div>
        <div class="aso-bg-[#F8F9FB] aso-flex aso-space-x-4 aso-px-4 aso-py-3 aso-justify-end aso-items-end">
            <div class="aso-bg-[#016464] aso-rounded">
                <button :disabled="isLoading" @click="updateMainSettings" class="aso-rounded aso-flex aso-bg-transparent aso-w-fit aso-space-x-2 aso-h-fit aso-text-white aso-px-12 aso-p-2.5 aso-border-none aso-opacity-90 hover:aso-opacity-100 hover:aso-border-none hover:aso-text-white hover:aso-bg-[#016464] aso-cursor-pointeraso-flex aso-bg-transparent aso-w-fit aso-space-x-2 aso-h-fit aso-text-white aso-px-12 aso-p-2.5 aso-border-none aso-opacity-90 hover:aso-opacity-100 hover:aso-border-none hover:aso-text-white hover:aso-bg-[#016464] aso-cursor-pointer">
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
const main = ref({
    titleHeader:"",
    textButtonRefresh:"",
    textButtonBack:"",
    textButtonNext:"",
    textPrice:"",
    textButtonFinish:"",
    textPreview:"",
    textShare:"",
    textImport:"",
    textDownload:"",
    textSave:"",
    textHelp:"",
    textMaterial:"",
    textSize:"",
    textShape:"",
    textFixingMethods:"",
    textColor:"",
    textOptionText:"",
    textBorder:"",
    textProduct:"",
    textImage:"",
});


onMounted(() => {
    if(props.data){
        main.value = {...main.value,...props.data}
    }
});

const updateMainSettings = async () => {
    isLoading.value = true;
    const result = await api.updateLanguageImagesMain(configId.value,main.value);
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