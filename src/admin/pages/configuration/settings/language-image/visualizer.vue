<template>
    <div class="aso-space-y-1 aso-translate-y-8">
        <div class="aso-bg-[#F8F9FB] aso-px-8 aso-py-8 aso-space-y-6">
            <h3 class="aso-text-[16px]">Content Header</h3>
            <div class="aso-flex aso-justify-between">
                <div class="aso-flex aso-flex-col aso-w-2/5 aso-space-y-2">
                    <label class="aso-text-[12px] aso-text-[#444444]">Title Header</label>
                    <input type="text" v-model="visualizer.titleHeader" class="aso-w-full"/>
                </div>
                <div class="aso-flex aso-flex-col aso-w-2/5 aso-space-y-2">
                    <label class="so-text-[12px] aso-text-[#444444]">Text button refresh</label>
                    <input type="text" v-model="visualizer.textButtonRefresh" class="aso-w-full"/>
                </div>
            </div>
            <div class="aso-flex aso-justify-between">
                <div class="aso-flex aso-flex-col aso-w-2/5 aso-space-y-2">
                    <label class="aso-text-[12px] aso-text-[#444444]">Additonals Options Header</label>
                    <input type="text" v-model="visualizer.textAdditonnalOptionsHeader" class="aso-w-full"/>
                </div>
                <div class="aso-flex aso-flex-col aso-w-2/5 aso-space-y-2">
                    <label class="so-text-[12px] aso-text-[#444444]">Additonals Options Button Text</label>
                    <input type="text" v-model="visualizer.textButtonAdditonnalOptions" class="aso-w-full"/>
                </div>
            </div>
            <div class="aso-flex aso-justify-between">
                <div class="aso-flex aso-flex-col aso-w-2/5 aso-space-y-2">
                    <label class="aso-text-[12px] aso-text-[#444444]">Text button back</label>
                    <input type="text" v-model="visualizer.textButtonBack" class="aso-w-full"/>
                </div>
                <div class="aso-flex aso-flex-col aso-w-2/5 aso-space-y-2">
                    <label class="so-text-[12px] aso-text-[#444444]">Text button next</label>
                    <input type="text" v-model="visualizer.textButtonNext" class="aso-w-full"/>
                </div>
            </div>
            <div class="aso-flex aso-justify-between">
                <div class="aso-flex aso-flex-col aso-w-2/5 aso-space-y-2">
                    <label class="aso-text-[12px] aso-text-[#444444]">Text Before Price</label>
                    <input type="text" v-model="visualizer.textBeforePrice" class="aso-w-full"/>
                </div>
                <div class="aso-flex aso-flex-col aso-w-2/5 aso-space-y-2">
                    <label class="aso-text-[12px] aso-text-[#444444]">Text After Price</label>
                    <input type="text" v-model="visualizer.textAfterPrice" class="aso-w-full"/>
                </div>
            </div>
            <div class="aso-flex aso-justify-between">
                <div class="aso-flex aso-flex-col aso-w-2/5 aso-space-y-2">
                    <label class="so-text-[12px] aso-text-[#444444]">Text button finish</label>
                    <input type="text" v-model="visualizer.textButtonFinish" class="aso-w-full"/>
                </div>
                <div class="aso-flex aso-flex-col aso-w-2/5 aso-space-y-2">
                    <label class="so-text-[12px] aso-text-[#444444]">Text button Add to cart</label>
                    <input type="text" v-model="visualizer.textAddToCart" class="aso-w-full"/>
                </div>
            </div>

            <h3 class="aso-text-[16px]">Action on selected object in canvas</h3>
            <div class="aso-flex aso-justify-between">
                <div class="aso-flex aso-flex-col aso-w-2/5 aso-space-y-2">
                    <label class="aso-text-[12px] aso-text-[#444444]">Canvas selected object edit button</label>
                    <input type="text" v-model="visualizer.textCanvasEdit" class="aso-w-full"/>
                </div>
                <div class="aso-flex aso-flex-col aso-w-2/5 aso-space-y-2">
                    <label class="so-text-[12px] aso-text-[#444444]">Canvas selected object delete button</label>
                    <input type="text" v-model="visualizer.textCanvasDelete" class="aso-w-full"/>
                </div>
            </div>
            <div class="aso-flex aso-justify-between">
                <div class="aso-flex aso-flex-col aso-w-2/5 aso-space-y-2">
                    <label class="aso-text-[12px] aso-text-[#444444]">Canvas selected object CenterH button</label>
                    <input type="text" v-model="visualizer.textCanvasCenterH" class="aso-w-full"/>
                </div>
                <div class="aso-flex aso-flex-col aso-w-2/5 aso-space-y-2">
                    <label class="so-text-[12px] aso-text-[#444444]">Canvas selected object centerV button</label>
                    <input type="text" v-model="visualizer.textCanvasCenterV" class="aso-w-full"/>
                </div>
            </div>
            <div class="aso-flex aso-justify-between">
                <div class="aso-flex aso-flex-col aso-w-2/5 aso-space-y-2">
                    <label class="aso-text-[12px] aso-text-[#444444]">Canvas selected object clone button</label>
                    <input type="text" v-model="visualizer.textCanvasClone" class="aso-w-full"/>
                </div>
            </div>
            
        </div>
        <div class="aso-bg-[#F8F9FB] aso-px-8 aso-py-8 aso-space-y-6">
            <h3 class="aso-text-[16px]">Content Sidebar</h3>
            <div class="aso-flex aso-justify-between">
                <div class="aso-flex aso-flex-col aso-w-2/5 aso-space-y-2">
                    <label class="aso-text-[12px] aso-text-[#444444]">Preview text</label>
                    <input type="text" v-model="visualizer.textPreview" class="aso-w-full"/>
                </div>
                <div class="aso-flex aso-flex-col aso-w-2/5 aso-space-y-2">
                    <label class="so-text-[12px] aso-text-[#444444]">Share text</label>
                    <input type="text" v-model="visualizer.textShare" class="aso-w-full"/>
                </div>
            </div>
            <div class="aso-flex aso-justify-between">
                <div class="aso-flex aso-flex-col aso-w-2/5 aso-space-y-2">
                    <label class="aso-text-[12px] aso-text-[#444444]">Move Up</label>
                    <input type="text" v-model="visualizer.textMoveUp" class="aso-w-full"/>
                </div>
                <div class="aso-flex aso-flex-col aso-w-2/5 aso-space-y-2">
                    <label class="so-text-[12px] aso-text-[#444444]">Move down</label>
                    <input type="text" v-model="visualizer.textMoveDown" class="aso-w-full"/>
                </div>
            </div>
            <div class="aso-flex aso-justify-between">
                <div class="aso-flex aso-flex-col aso-w-2/5 aso-space-y-2">
                    <label class="so-text-[12px] aso-text-[#444444]">Help text</label>
                    <input type="text" v-model="visualizer.textHelp" class="aso-w-full"/>
                </div>
                <div class="aso-flex aso-flex-col aso-w-2/5 aso-space-y-2">
                    <label class="so-text-[12px] aso-text-[#444444]">Download text</label>
                    <input type="text" v-model="visualizer.textDownload" class="aso-w-full"/>
                </div>
            </div>
            <div class="aso-flex aso-justify-between">
                <div class="aso-flex aso-flex-col aso-w-2/5 aso-space-y-2">
                    <label class="aso-text-[12px] aso-text-[#444444]">Import text</label>
                    <input type="text" v-model="visualizer.textImport" class="aso-w-full"/>
                </div>
                <div class="aso-flex aso-flex-col aso-w-2/5 aso-space-y-2">
                    <label class="aso-text-[12px] aso-text-[#444444]">Save text</label>
                    <input type="text" v-model="visualizer.textSave" class="aso-w-full"/>
                </div>
            </div>
        </div>
        <div class="aso-bg-[#F8F9FB] aso-px-8 aso-py-8 aso-space-y-6">
            <h3 class="aso-text-[16px]">Button Options</h3>
            <div class="aso-flex aso-justify-between">
                <div class="aso-flex aso-flex-col aso-w-2/5 aso-space-y-2">
                    <label class="aso-text-[12px] aso-text-[#444444]">Text Material</label>
                    <input type="text" v-model="visualizer.textMaterial" class="aso-w-full"/>
                </div>
                <div class="aso-flex aso-flex-col aso-w-2/5 aso-space-y-2">
                    <label class="so-text-[12px] aso-text-[#444444]">Text Size</label>
                    <input type="text" v-model="visualizer.textSize" class="aso-w-full"/>
                </div>
            </div>
            <div class="aso-flex aso-justify-between">
                <div class="aso-flex aso-flex-col aso-w-2/5 aso-space-y-2">
                    <label class="aso-text-[12px] aso-text-[#444444]">Text Width</label>
                    <input type="text" v-model="visualizer.textWidth" class="aso-w-full"/>
                </div>
                <div class="aso-flex aso-flex-col aso-w-2/5 aso-space-y-2">
                    <label class="so-text-[12px] aso-text-[#444444]">Text Height</label>
                    <input type="text" v-model="visualizer.textHeight" class="aso-w-full"/>
                </div>
            </div>
            <div class="aso-flex aso-justify-between">
                <div class="aso-flex aso-flex-col aso-w-2/5 aso-space-y-2">
                    <label class="aso-text-[12px] aso-text-[#444444]">Text Position</label>
                    <input type="text" v-model="visualizer.textPosition" class="aso-w-full"/>
                </div>
                <div class="aso-flex aso-flex-col aso-w-2/5 aso-space-y-2">
                    <label class="so-text-[12px] aso-text-[#444444]">Text Angle</label>
                    <input type="text" v-model="visualizer.textAngle" class="aso-w-full"/>
                </div>
            </div>
            <div class="aso-flex aso-justify-between">
                <div class="aso-flex aso-flex-col aso-w-2/5 aso-space-y-2">
                    <label class="aso-text-[12px] aso-text-[#444444]">Text Top</label>
                    <input type="text" v-model="visualizer.textTop" class="aso-w-full"/>
                </div>
                <div class="aso-flex aso-flex-col aso-w-2/5 aso-space-y-2">
                    <label class="so-text-[12px] aso-text-[#444444]">Text Bottom</label>
                    <input type="text" v-model="visualizer.textBottom" class="aso-w-full"/>
                </div>
            </div>
            <div class="aso-flex aso-justify-between">
                <div class="aso-flex aso-flex-col aso-w-2/5 aso-space-y-2">
                    <label class="aso-text-[12px] aso-text-[#444444]">Text Left</label>
                    <input type="text" v-model="visualizer.textLeft" class="aso-w-full"/>
                </div>
                <div class="aso-flex aso-flex-col aso-w-2/5 aso-space-y-2">
                    <label class="so-text-[12px] aso-text-[#444444]">Text Right</label>
                    <input type="text" v-model="visualizer.textRight" class="aso-w-full"/>
                </div>
            </div>
            <div class="aso-flex aso-justify-between">
                <div class="aso-flex aso-flex-col aso-w-2/5 aso-space-y-2">
                    <label class="aso-text-[12px] aso-text-[#444444]">Label of Custom Size</label>
                    <input type="text" v-model="visualizer.customSize" class="aso-w-full"/>
                </div>
                <div class="aso-flex aso-flex-col aso-w-2/5 aso-space-y-2">
                    <label class="so-text-[12px] aso-text-[#444444]">Label of Custom Size button Done</label>
                    <input type="text" v-model="visualizer.customSizeButtonDone" class="aso-w-full"/>
                </div>
            </div>
            <div class="aso-flex aso-justify-between">
                <div class="aso-flex aso-flex-col aso-w-2/5 aso-space-y-2">
                    <label class="aso-text-[12px] aso-text-[#444444]">Text Thickness</label>
                    <input type="text" v-model="visualizer.thickness" class="aso-w-full"/>
                </div>
                <div class="aso-flex aso-flex-col aso-w-2/5 aso-space-y-2">
                    <label class="aso-text-[12px] aso-text-[#444444]">Text Shape</label>
                    <input type="text" v-model="visualizer.textShape" class="aso-w-full"/>
                </div>
                
            </div>
            <div class="aso-flex aso-justify-between">
                <div class="aso-flex aso-flex-col aso-w-2/5 aso-space-y-2">
                    <label class="so-text-[12px] aso-text-[#444444]">Text Fixing Methods</label>
                    <input type="text" v-model="visualizer.textFixingMethods" class="aso-w-full"/>
                </div>
                <div class="aso-flex aso-flex-col aso-w-2/5 aso-space-y-2">
                    <label class="aso-text-[12px] aso-text-[#444444]">Text Color</label>
                    <input type="text" v-model="visualizer.textColor" class="aso-w-full"/>
                </div>
                
            </div>
            <div class="aso-flex aso-justify-between">
                <div class="aso-flex aso-flex-col aso-w-2/5 aso-space-y-2">
                    <label class="so-text-[12px] aso-text-[#444444]">Text option Text</label>
                    <input type="text" v-model="visualizer.textOptionText" class="aso-w-full"/>
                </div>
                <div class="aso-flex aso-flex-col aso-w-2/5 aso-space-y-2">
                    <label class="aso-text-[12px] aso-text-[#444444]">Text Border</label>
                    <input type="text" v-model="visualizer.textBorder" class="aso-w-full"/>
                </div>
                
            </div>
            <div class="aso-flex aso-justify-between">
                <div class="aso-flex aso-flex-col aso-w-2/5 aso-space-y-2">
                    <label class="so-text-[12px] aso-text-[#444444]">Text Product</label>
                    <input type="text" v-model="visualizer.textProduct" class="aso-w-full"/>
                </div>
                <div class="aso-flex aso-flex-col aso-w-2/5 aso-space-y-2">
                    <label class="aso-text-[12px] aso-text-[#444444]">Text Image</label>
                    <input type="text" v-model="visualizer.textImage" class="aso-w-full"/>
                </div>
            </div>
            <div class="aso-flex aso-justify-between">
                <div class="aso-flex aso-flex-col aso-w-2/5 aso-space-y-2">
                    <label class="aso-text-[12px] aso-text-[#444444]">Text Example</label>
                    <input type="text" v-model="visualizer.textExample" class="aso-w-full"/>
                </div>
            </div>
        </div>
        <div class="aso-bg-[#F8F9FB] aso-px-8 aso-py-8 aso-space-y-6">
            <h3 class="aso-text-[16px]">Rest Modal</h3>
            <div class="aso-flex aso-justify-between">
                <div class="aso-flex aso-flex-col aso-w-2/5 aso-space-y-2">
                    <label class="aso-text-[12px] aso-text-[#444444]">Reset Modal Text</label>
                    <input type="text" v-model="visualizer.resetModalText" class="aso-w-full"/>
                </div>
                <div class="aso-flex aso-flex-col aso-w-2/5 aso-space-y-2">
                    <label class="so-text-[12px] aso-text-[#444444]">Reset Modal Yes Button Text</label>
                    <input type="text" v-model="visualizer.resetModalYes" class="aso-w-full"/>
                </div>
            </div>
            <div class="aso-flex aso-justify-between">
                <div class="aso-flex aso-flex-col aso-w-2/5 aso-space-y-2">
                    <label class="aso-text-[12px] aso-text-[#444444]">Reset Modal No Button Text</label>
                    <input type="text" v-model="visualizer.resetModalNo" class="aso-w-full"/>
                </div>
            </div>
        </div>
        <div class="aso-bg-[#F8F9FB] aso-flex aso-space-x-4 aso-px-4 aso-py-3 aso-justify-end aso-items-end">
            <div class="aso-bg-[#016464] aso-rounded">
                <button :disabled="isLoading" @click="updateVisualizerSettings" class="aso-rounded aso-flex aso-bg-transparent aso-w-fit aso-space-x-2 aso-h-fit aso-text-white aso-px-12 aso-p-2.5 aso-border-none aso-opacity-90 hover:aso-opacity-100 hover:aso-border-none hover:aso-text-white hover:aso-bg-[#016464] aso-cursor-pointeraso-flex aso-bg-transparent aso-w-fit aso-space-x-2 aso-h-fit aso-text-white aso-px-12 aso-p-2.5 aso-border-none aso-opacity-90 hover:aso-opacity-100 hover:aso-border-none hover:aso-text-white hover:aso-bg-[#016464] aso-cursor-pointer">
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
const visualizer = ref({
    textCanvasCenterH:"centerH",
    textCanvasCenterV:"centerV",
    textCanvasDelete:"delete",
    textCanvasEdit:"Edit",
    textCanvasClone:"Clone",
    titleHeader:"Plastic Signs",
    textButtonRefresh:"Restart all",
    textButtonAdditonnalOptions:"Additionals",
    textAdditonnalOptionsHeader:"Additionals Options",
    textButtonBack:"Undo",
    textButtonNext:"Redo",
    textBeforePrice:"",
    textAfterPrice:"TVA Include",
    textButtonFinish:"Finish",
    textAddToCart:"Add To Cart",
    textPreview:"Preview",
    textShare:"Share",
    textImport:"Import",
    textDownload:"Download",
    textMoveUp:"Move Up",
    textMoveDown:"Move Down",
    textSave:"Save",
    textHelp:"Help",
    textMaterial:"Material",
    textSize:"Size",
    textPosition:"Position",
    textAngle:"Angle",
    textWidth:"Width",
    textHeight:"Height",
    textRight:"Right",
    textLeft:"Left",
    textTop:"Top",
    textBottom:"Bottom",
    customSize:"Custom Size",
    customSizeButtonDone:"Done",
    thickness:"Thickness",
    textShape:"Shape",
    textFixingMethods:"Fixing Methods",
    textColor:"Color",
    textOptionText:"Text",
    textBorder:"Border",
    textProduct:"Product",
    textImage:"Image",
    textExample:"example",
    resetModalText:"Reset all for real ??",
    resetModalYes:"Yes",
    resetModalNo:"No",

});


onMounted(() => {
    if(props.data){
        visualizer.value = {...visualizer.value,...props.data}
    }
});

const updateVisualizerSettings = async () => {
    isLoading.value = true;
    const result = await api.updateLanguageImagesVisualizer(configId.value,visualizer.value);
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