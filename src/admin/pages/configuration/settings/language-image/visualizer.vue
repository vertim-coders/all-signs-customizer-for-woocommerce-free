<template>
    <div class="asowp-space-y-1 asowp-translate-y-8">
        <div class="asowp-bg-[#F8F9FB] asowp-px-8 asowp-py-8 asowp-space-y-6">
            <h3 class="asowp-text-[16px]">Content Header</h3>
            <div class="asowp-flex asowp-justify-between">
                <div class="asowp-flex asowp-flex-col asowp-w-2/5 asowp-space-y-2">
                    <label class="asowp-text-[12px] asowp-text-[#444444]">Title Header</label>
                    <input type="text" v-model="visualizer.titleHeader" class="asowp-w-full"/>
                </div>
                <div class="asowp-flex asowp-flex-col asowp-w-2/5 asowp-space-y-2">
                    <label class="so-text-[12px] asowp-text-[#444444]">Text button refresh</label>
                    <input type="text" v-model="visualizer.textButtonRefresh" class="asowp-w-full"/>
                </div>
            </div>
            <div class="asowp-flex asowp-justify-between">
                <div class="asowp-flex asowp-flex-col asowp-w-2/5 asowp-space-y-2">
                    <label class="asowp-text-[12px] asowp-text-[#444444]">Additonals Options Header</label>
                    <input type="text" v-model="visualizer.textAdditonnalOptionsHeader" class="asowp-w-full"/>
                </div>
                <div class="asowp-flex asowp-flex-col asowp-w-2/5 asowp-space-y-2">
                    <label class="so-text-[12px] asowp-text-[#444444]">Additonals Options Button Text</label>
                    <input type="text" v-model="visualizer.textButtonAdditonnalOptions" class="asowp-w-full"/>
                </div>
            </div>
            <div class="asowp-flex asowp-justify-between">
                <div class="asowp-flex asowp-flex-col asowp-w-2/5 asowp-space-y-2">
                    <label class="asowp-text-[12px] asowp-text-[#444444]">Text button back</label>
                    <input type="text" v-model="visualizer.textButtonBack" class="asowp-w-full"/>
                </div>
                <div class="asowp-flex asowp-flex-col asowp-w-2/5 asowp-space-y-2">
                    <label class="so-text-[12px] asowp-text-[#444444]">Text button next</label>
                    <input type="text" v-model="visualizer.textButtonNext" class="asowp-w-full"/>
                </div>
            </div>
            <div class="asowp-flex asowp-justify-between">
                <div class="asowp-flex asowp-flex-col asowp-w-2/5 asowp-space-y-2">
                    <label class="asowp-text-[12px] asowp-text-[#444444]">Text Before Price</label>
                    <input type="text" v-model="visualizer.textBeforePrice" class="asowp-w-full"/>
                </div>
                <div class="asowp-flex asowp-flex-col asowp-w-2/5 asowp-space-y-2">
                    <label class="asowp-text-[12px] asowp-text-[#444444]">Text After Price</label>
                    <input type="text" v-model="visualizer.textAfterPrice" class="asowp-w-full"/>
                </div>
            </div>
            <div class="asowp-flex asowp-justify-between">
                <div class="asowp-flex asowp-flex-col asowp-w-2/5 asowp-space-y-2">
                    <label class="so-text-[12px] asowp-text-[#444444]">Text button finish</label>
                    <input type="text" v-model="visualizer.textButtonFinish" class="asowp-w-full"/>
                </div>
                <div class="asowp-flex asowp-flex-col asowp-w-2/5 asowp-space-y-2">
                    <label class="so-text-[12px] asowp-text-[#444444]">Text button Add to cart</label>
                    <input type="text" v-model="visualizer.textAddToCart" class="asowp-w-full"/>
                </div>
            </div>

            <h3 class="asowp-text-[16px]">Action on selected object in canvas</h3>
            <div class="asowp-flex asowp-justify-between">
                <div class="asowp-flex asowp-flex-col asowp-w-2/5 asowp-space-y-2">
                    <label class="asowp-text-[12px] asowp-text-[#444444]">Canvas selected object edit button</label>
                    <input type="text" v-model="visualizer.textCanvasEdit" class="asowp-w-full"/>
                </div>
                <div class="asowp-flex asowp-flex-col asowp-w-2/5 asowp-space-y-2">
                    <label class="so-text-[12px] asowp-text-[#444444]">Canvas selected object delete button</label>
                    <input type="text" v-model="visualizer.textCanvasDelete" class="asowp-w-full"/>
                </div>
            </div>
            <div class="asowp-flex asowp-justify-between">
                <div class="asowp-flex asowp-flex-col asowp-w-2/5 asowp-space-y-2">
                    <label class="asowp-text-[12px] asowp-text-[#444444]">Canvas selected object CenterH button</label>
                    <input type="text" v-model="visualizer.textCanvasCenterH" class="asowp-w-full"/>
                </div>
                <div class="asowp-flex asowp-flex-col asowp-w-2/5 asowp-space-y-2">
                    <label class="so-text-[12px] asowp-text-[#444444]">Canvas selected object centerV button</label>
                    <input type="text" v-model="visualizer.textCanvasCenterV" class="asowp-w-full"/>
                </div>
            </div>
            <div class="asowp-flex asowp-justify-between">
                <div class="asowp-flex asowp-flex-col asowp-w-2/5 asowp-space-y-2">
                    <label class="asowp-text-[12px] asowp-text-[#444444]">Canvas selected object clone button</label>
                    <input type="text" v-model="visualizer.textCanvasClone" class="asowp-w-full"/>
                </div>
            </div>
            
        </div>
        <div class="asowp-bg-[#F8F9FB] asowp-px-8 asowp-py-8 asowp-space-y-6">
            <h3 class="asowp-text-[16px]">Content Sidebar</h3>
            <div class="asowp-flex asowp-justify-between">
                <div class="asowp-flex asowp-flex-col asowp-w-2/5 asowp-space-y-2">
                    <label class="asowp-text-[12px] asowp-text-[#444444]">Preview text</label>
                    <input type="text" v-model="visualizer.textPreview" class="asowp-w-full"/>
                </div>
                <div class="asowp-flex asowp-flex-col asowp-w-2/5 asowp-space-y-2">
                    <label class="so-text-[12px] asowp-text-[#444444]">Share text</label>
                    <input type="text" v-model="visualizer.textShare" class="asowp-w-full"/>
                </div>
            </div>
            <div class="asowp-flex asowp-justify-between">
                <div class="asowp-flex asowp-flex-col asowp-w-2/5 asowp-space-y-2">
                    <label class="asowp-text-[12px] asowp-text-[#444444]">Move Up</label>
                    <input type="text" v-model="visualizer.textMoveUp" class="asowp-w-full"/>
                </div>
                <div class="asowp-flex asowp-flex-col asowp-w-2/5 asowp-space-y-2">
                    <label class="so-text-[12px] asowp-text-[#444444]">Move down</label>
                    <input type="text" v-model="visualizer.textMoveDown" class="asowp-w-full"/>
                </div>
            </div>
            <div class="asowp-flex asowp-justify-between">
                <div class="asowp-flex asowp-flex-col asowp-w-2/5 asowp-space-y-2">
                    <label class="so-text-[12px] asowp-text-[#444444]">Help text</label>
                    <input type="text" v-model="visualizer.textHelp" class="asowp-w-full"/>
                </div>
                <div class="asowp-flex asowp-flex-col asowp-w-2/5 asowp-space-y-2">
                    <label class="so-text-[12px] asowp-text-[#444444]">Download text</label>
                    <input type="text" v-model="visualizer.textDownload" class="asowp-w-full"/>
                </div>
            </div>
            <div class="asowp-flex asowp-justify-between">
                <div class="asowp-flex asowp-flex-col asowp-w-2/5 asowp-space-y-2">
                    <label class="asowp-text-[12px] asowp-text-[#444444]">Import text</label>
                    <input type="text" v-model="visualizer.textImport" class="asowp-w-full"/>
                </div>
                <div class="asowp-flex asowp-flex-col asowp-w-2/5 asowp-space-y-2">
                    <label class="asowp-text-[12px] asowp-text-[#444444]">Save text</label>
                    <input type="text" v-model="visualizer.textSave" class="asowp-w-full"/>
                </div>
            </div>
        </div>
        <div class="asowp-bg-[#F8F9FB] asowp-px-8 asowp-py-8 asowp-space-y-6">
            <h3 class="asowp-text-[16px]">Button Options</h3>
            <div class="asowp-flex asowp-justify-between">
                <div class="asowp-flex asowp-flex-col asowp-w-2/5 asowp-space-y-2">
                    <label class="asowp-text-[12px] asowp-text-[#444444]">Text Material</label>
                    <input type="text" v-model="visualizer.textMaterial" class="asowp-w-full"/>
                </div>
                <div class="asowp-flex asowp-flex-col asowp-w-2/5 asowp-space-y-2">
                    <label class="so-text-[12px] asowp-text-[#444444]">Text Size</label>
                    <input type="text" v-model="visualizer.textSize" class="asowp-w-full"/>
                </div>
            </div>
            <div class="asowp-flex asowp-justify-between">
                <div class="asowp-flex asowp-flex-col asowp-w-2/5 asowp-space-y-2">
                    <label class="asowp-text-[12px] asowp-text-[#444444]">Text Width</label>
                    <input type="text" v-model="visualizer.textWidth" class="asowp-w-full"/>
                </div>
                <div class="asowp-flex asowp-flex-col asowp-w-2/5 asowp-space-y-2">
                    <label class="so-text-[12px] asowp-text-[#444444]">Text Height</label>
                    <input type="text" v-model="visualizer.textHeight" class="asowp-w-full"/>
                </div>
            </div>
            <div class="asowp-flex asowp-justify-between">
                <div class="asowp-flex asowp-flex-col asowp-w-2/5 asowp-space-y-2">
                    <label class="asowp-text-[12px] asowp-text-[#444444]">Text Position</label>
                    <input type="text" v-model="visualizer.textPosition" class="asowp-w-full"/>
                </div>
                <div class="asowp-flex asowp-flex-col asowp-w-2/5 asowp-space-y-2">
                    <label class="so-text-[12px] asowp-text-[#444444]">Text Angle</label>
                    <input type="text" v-model="visualizer.textAngle" class="asowp-w-full"/>
                </div>
            </div>
            <div class="asowp-flex asowp-justify-between">
                <div class="asowp-flex asowp-flex-col asowp-w-2/5 asowp-space-y-2">
                    <label class="asowp-text-[12px] asowp-text-[#444444]">Text Top</label>
                    <input type="text" v-model="visualizer.textTop" class="asowp-w-full"/>
                </div>
                <div class="asowp-flex asowp-flex-col asowp-w-2/5 asowp-space-y-2">
                    <label class="so-text-[12px] asowp-text-[#444444]">Text Bottom</label>
                    <input type="text" v-model="visualizer.textBottom" class="asowp-w-full"/>
                </div>
            </div>
            <div class="asowp-flex asowp-justify-between">
                <div class="asowp-flex asowp-flex-col asowp-w-2/5 asowp-space-y-2">
                    <label class="asowp-text-[12px] asowp-text-[#444444]">Text Left</label>
                    <input type="text" v-model="visualizer.textLeft" class="asowp-w-full"/>
                </div>
                <div class="asowp-flex asowp-flex-col asowp-w-2/5 asowp-space-y-2">
                    <label class="so-text-[12px] asowp-text-[#444444]">Text Right</label>
                    <input type="text" v-model="visualizer.textRight" class="asowp-w-full"/>
                </div>
            </div>
            <div class="asowp-flex asowp-justify-between">
                <div class="asowp-flex asowp-flex-col asowp-w-2/5 asowp-space-y-2">
                    <label class="asowp-text-[12px] asowp-text-[#444444]">Label of Custom Size</label>
                    <input type="text" v-model="visualizer.customSize" class="asowp-w-full"/>
                </div>
                <div class="asowp-flex asowp-flex-col asowp-w-2/5 asowp-space-y-2">
                    <label class="so-text-[12px] asowp-text-[#444444]">Label of Custom Size button Done</label>
                    <input type="text" v-model="visualizer.customSizeButtonDone" class="asowp-w-full"/>
                </div>
            </div>
            <div class="asowp-flex asowp-justify-between">
                <div class="asowp-flex asowp-flex-col asowp-w-2/5 asowp-space-y-2">
                    <label class="asowp-text-[12px] asowp-text-[#444444]">Text Thickness</label>
                    <input type="text" v-model="visualizer.thickness" class="asowp-w-full"/>
                </div>
                <div class="asowp-flex asowp-flex-col asowp-w-2/5 asowp-space-y-2">
                    <label class="asowp-text-[12px] asowp-text-[#444444]">Text Shape</label>
                    <input type="text" v-model="visualizer.textShape" class="asowp-w-full"/>
                </div>
                
            </div>
            <div class="asowp-flex asowp-justify-between">
                <div class="asowp-flex asowp-flex-col asowp-w-2/5 asowp-space-y-2">
                    <label class="so-text-[12px] asowp-text-[#444444]">Text Fixing Methods</label>
                    <input type="text" v-model="visualizer.textFixingMethods" class="asowp-w-full"/>
                </div>
                <div class="asowp-flex asowp-flex-col asowp-w-2/5 asowp-space-y-2">
                    <label class="asowp-text-[12px] asowp-text-[#444444]">Text Color</label>
                    <input type="text" v-model="visualizer.textColor" class="asowp-w-full"/>
                </div>
                
            </div>
            <div class="asowp-flex asowp-justify-between">
                <div class="asowp-flex asowp-flex-col asowp-w-2/5 asowp-space-y-2">
                    <label class="so-text-[12px] asowp-text-[#444444]">Text option Text</label>
                    <input type="text" v-model="visualizer.textOptionText" class="asowp-w-full"/>
                </div>
                <div class="asowp-flex asowp-flex-col asowp-w-2/5 asowp-space-y-2">
                    <label class="asowp-text-[12px] asowp-text-[#444444]">Text Border</label>
                    <input type="text" v-model="visualizer.textBorder" class="asowp-w-full"/>
                </div>
                
            </div>
            <div class="asowp-flex asowp-justify-between">
                <div class="asowp-flex asowp-flex-col asowp-w-2/5 asowp-space-y-2">
                    <label class="so-text-[12px] asowp-text-[#444444]">Text Product</label>
                    <input type="text" v-model="visualizer.textProduct" class="asowp-w-full"/>
                </div>
                <div class="asowp-flex asowp-flex-col asowp-w-2/5 asowp-space-y-2">
                    <label class="asowp-text-[12px] asowp-text-[#444444]">Text Image</label>
                    <input type="text" v-model="visualizer.textImage" class="asowp-w-full"/>
                </div>
            </div>
            <div class="asowp-flex asowp-justify-between">
                <div class="asowp-flex asowp-flex-col asowp-w-2/5 asowp-space-y-2">
                    <label class="asowp-text-[12px] asowp-text-[#444444]">Text Example</label>
                    <input type="text" v-model="visualizer.textExample" class="asowp-w-full"/>
                </div>
            </div>
        </div>
        <div class="asowp-bg-[#F8F9FB] asowp-px-8 asowp-py-8 asowp-space-y-6">
            <h3 class="asowp-text-[16px]">Rest Modal</h3>
            <div class="asowp-flex asowp-justify-between">
                <div class="asowp-flex asowp-flex-col asowp-w-2/5 asowp-space-y-2">
                    <label class="asowp-text-[12px] asowp-text-[#444444]">Reset Modal Text</label>
                    <input type="text" v-model="visualizer.resetModalText" class="asowp-w-full"/>
                </div>
                <div class="asowp-flex asowp-flex-col asowp-w-2/5 asowp-space-y-2">
                    <label class="so-text-[12px] asowp-text-[#444444]">Reset Modal Yes Button Text</label>
                    <input type="text" v-model="visualizer.resetModalYes" class="asowp-w-full"/>
                </div>
            </div>
            <div class="asowp-flex asowp-justify-between">
                <div class="asowp-flex asowp-flex-col asowp-w-2/5 asowp-space-y-2">
                    <label class="asowp-text-[12px] asowp-text-[#444444]">Reset Modal No Button Text</label>
                    <input type="text" v-model="visualizer.resetModalNo" class="asowp-w-full"/>
                </div>
            </div>
        </div>
        <div class="asowp-bg-[#F8F9FB] asowp-flex asowp-space-x-4 asowp-px-4 asowp-py-3 asowp-justify-end asowp-items-end">
            <div class="asowp-bg-[#016464] asowp-rounded">
                <button :disabled="isLoading" @click="updateVisualizerSettings" class="asowp-rounded asowp-flex asowp-bg-transparent asowp-w-fit asowp-space-x-2 asowp-h-fit asowp-text-white asowp-px-12 asowp-p-2.5 asowp-border-none asowp-opacity-90 hover:asowp-opacity-100 hover:asowp-border-none hover:asowp-text-white hover:asowp-bg-[#016464] asowp-cursor-pointerasowp-flex asowp-bg-transparent asowp-w-fit asowp-space-x-2 asowp-h-fit asowp-text-white asowp-px-12 asowp-p-2.5 asowp-border-none asowp-opacity-90 hover:asowp-opacity-100 hover:asowp-border-none hover:asowp-text-white hover:asowp-bg-[#016464] asowp-cursor-pointer">
                    <img src="../../../../../../assets/icons/ic_loading_gray.svg" class="asowp-w-5 asowp-w-5" v-if="isLoading" />
                    <div class="asowp-font-semibold asowp-text-[16px]">Save</div>
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