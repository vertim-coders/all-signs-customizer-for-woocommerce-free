<template>
    <div class="asowp-space-y-1 asowp-translate-y-8">
        <div class="asowp-bg-[#F8F9FB] asowp-px-8 asowp-py-8 asowp-space-y-6">
            <h3 class="asowp-text-[16px]">{{ __("Content Header", "all-signs-options-pro") }}</h3>
            <div class="asowp-flex asowp-justify-between">
                <div class="asowp-flex asowp-flex-col asowp-w-2/5 asowp-space-y-2">
                    <label class="asowp-text-[12px] asowp-text-[#444444]">{{ __("Title Header", "all-signs-options-pro") }}</label>
                    <input type="text" v-model="visualizer.titleHeader" class="asowp-w-full"/>
                </div>
                <div class="asowp-flex asowp-flex-col asowp-w-2/5 asowp-space-y-2">
                    <label class="so-text-[12px] asowp-text-[#444444]">{{ __("Text button refresh", "all-signs-options-pro") }}</label>
                    <input type="text" v-model="visualizer.textButtonRefresh" class="asowp-w-full"/>
                </div>
            </div>
            <div class="asowp-flex asowp-justify-between">
                <div class="asowp-flex asowp-flex-col asowp-w-2/5 asowp-space-y-2">
                    <label class="asowp-text-[12px] asowp-text-[#444444]">{{ __("Additonals Options Header", "all-signs-options-pro") }}</label>
                    <input type="text" v-model="visualizer.textAdditonnalOptionsHeader" class="asowp-w-full"/>
                </div>
                <div class="asowp-flex asowp-flex-col asowp-w-2/5 asowp-space-y-2">
                    <label class="so-text-[12px] asowp-text-[#444444]">{{ __("Additonals Options Button Text", "all-signs-options-pro") }}</label>
                    <input type="text" v-model="visualizer.textButtonAdditonnalOptions" class="asowp-w-full"/>
                </div>
            </div>
            <div class="asowp-flex asowp-justify-between">
                <div class="asowp-flex asowp-flex-col asowp-w-2/5 asowp-space-y-2">
                    <label class="asowp-text-[12px] asowp-text-[#444444]">{{ __("Text button back", "all-signs-options-pro") }}</label>
                    <input type="text" v-model="visualizer.textButtonBack" class="asowp-w-full"/>
                </div>
                <div class="asowp-flex asowp-flex-col asowp-w-2/5 asowp-space-y-2">
                    <label class="so-text-[12px] asowp-text-[#444444]">{{ __("Text button next", "all-signs-options-pro") }}</label>
                    <input type="text" v-model="visualizer.textButtonNext" class="asowp-w-full"/>
                </div>
            </div>
            <div class="asowp-flex asowp-justify-between">
                <div class="asowp-flex asowp-flex-col asowp-w-2/5 asowp-space-y-2">
                    <label class="asowp-text-[12px] asowp-text-[#444444]">{{ __("Text Before Price", "all-signs-options-pro") }}</label>
                    <input type="text" v-model="visualizer.textBeforePrice" class="asowp-w-full"/>
                </div>
                <div class="asowp-flex asowp-flex-col asowp-w-2/5 asowp-space-y-2">
                    <label class="asowp-text-[12px] asowp-text-[#444444]">{{ __("Text After Price", "all-signs-options-pro") }}</label>
                    <input type="text" v-model="visualizer.textAfterPrice" class="asowp-w-full"/>
                </div>
            </div>
            <div class="asowp-flex asowp-justify-between">
                <div class="asowp-flex asowp-flex-col asowp-w-2/5 asowp-space-y-2">
                    <label class="so-text-[12px] asowp-text-[#444444]">{{ __("Text button finish", "all-signs-options-pro") }}</label>
                    <input type="text" v-model="visualizer.textButtonFinish" class="asowp-w-full"/>
                </div>
                <div class="asowp-flex asowp-flex-col asowp-w-2/5 asowp-space-y-2">
                    <label class="so-text-[12px] asowp-text-[#444444]">{{ __("Text button Add to cart", "all-signs-options-pro") }}</label>
                    <input type="text" v-model="visualizer.textAddToCart" class="asowp-w-full"/>
                </div>
            </div>

            <h3 class="asowp-text-[16px]">{{ __("Action on selected object in canvas", "all-signs-options-pro") }}</h3>
            <div class="asowp-flex asowp-justify-between">
                <div class="asowp-flex asowp-flex-col asowp-w-2/5 asowp-space-y-2">
                    <label class="asowp-text-[12px] asowp-text-[#444444]">{{ __("Canvas selected object edit button", "all-signs-options-pro") }}</label>
                    <input type="text" v-model="visualizer.textCanvasEdit" class="asowp-w-full"/>
                </div>
                <div class="asowp-flex asowp-flex-col asowp-w-2/5 asowp-space-y-2">
                    <label class="so-text-[12px] asowp-text-[#444444]">{{ __("Canvas selected object delete button", "all-signs-options-pro") }}</label>
                    <input type="text" v-model="visualizer.textCanvasDelete" class="asowp-w-full"/>
                </div>
            </div>
            <div class="asowp-flex asowp-justify-between">
                <div class="asowp-flex asowp-flex-col asowp-w-2/5 asowp-space-y-2">
                    <label class="asowp-text-[12px] asowp-text-[#444444]">{{ __("Canvas selected object CenterH button", "all-signs-options-pro") }}</label>
                    <input type="text" v-model="visualizer.textCanvasCenterH" class="asowp-w-full"/>
                </div>
                <div class="asowp-flex asowp-flex-col asowp-w-2/5 asowp-space-y-2">
                    <label class="so-text-[12px] asowp-text-[#444444]">{{ __("Canvas selected object centerV button", "all-signs-options-pro") }}</label>
                    <input type="text" v-model="visualizer.textCanvasCenterV" class="asowp-w-full"/>
                </div>
            </div>
            <div class="asowp-flex asowp-justify-between">
                <div class="asowp-flex asowp-flex-col asowp-w-2/5 asowp-space-y-2">
                    <label class="asowp-text-[12px] asowp-text-[#444444]">{{ __("Canvas selected object clone button", "all-signs-options-pro") }}</label>
                    <input type="text" v-model="visualizer.textCanvasClone" class="asowp-w-full"/>
                </div>
            </div>
            
        </div>
        <div class="asowp-bg-[#F8F9FB] asowp-px-8 asowp-py-8 asowp-space-y-6">
            <h3 class="asowp-text-[16px]">{{ __("Content Sidebar", "all-signs-options-pro") }}</h3>
            <div class="asowp-flex asowp-justify-between">
                <div class="asowp-flex asowp-flex-col asowp-w-2/5 asowp-space-y-2">
                    <label class="asowp-text-[12px] asowp-text-[#444444]">{{ __("Preview text", "all-signs-options-pro") }}</label>
                    <input type="text" v-model="visualizer.textPreview" class="asowp-w-full"/>
                </div>
                <div class="asowp-flex asowp-flex-col asowp-w-2/5 asowp-space-y-2">
                    <label class="so-text-[12px] asowp-text-[#444444]">{{ __("Share text", "all-signs-options-pro") }}</label>
                    <input type="text" v-model="visualizer.textShare" class="asowp-w-full"/>
                </div>
            </div>
            <div class="asowp-flex asowp-justify-between">
                <div class="asowp-flex asowp-flex-col asowp-w-2/5 asowp-space-y-2">
                    <label class="asowp-text-[12px] asowp-text-[#444444]">{{ __("Move Up", "all-signs-options-pro") }}</label>
                    <input type="text" v-model="visualizer.textMoveUp" class="asowp-w-full"/>
                </div>
                <div class="asowp-flex asowp-flex-col asowp-w-2/5 asowp-space-y-2">
                    <label class="so-text-[12px] asowp-text-[#444444]">{{ __("Move down", "all-signs-options-pro") }}</label>
                    <input type="text" v-model="visualizer.textMoveDown" class="asowp-w-full"/>
                </div>
            </div>
            <div class="asowp-flex asowp-justify-between">
                <div class="asowp-flex asowp-flex-col asowp-w-2/5 asowp-space-y-2">
                    <label class="so-text-[12px] asowp-text-[#444444]">{{ __("Help text", "all-signs-options-pro") }}</label>
                    <input type="text" v-model="visualizer.textHelp" class="asowp-w-full"/>
                </div>
                <div class="asowp-flex asowp-flex-col asowp-w-2/5 asowp-space-y-2">
                    <label class="so-text-[12px] asowp-text-[#444444]">{{ __("Download text", "all-signs-options-pro") }}</label>
                    <input type="text" v-model="visualizer.textDownload" class="asowp-w-full"/>
                </div>
            </div>
            <div class="asowp-flex asowp-justify-between">
                <div class="asowp-flex asowp-flex-col asowp-w-2/5 asowp-space-y-2">
                    <label class="asowp-text-[12px] asowp-text-[#444444]">{{ __("Import text", "all-signs-options-pro") }}</label>
                    <input type="text" v-model="visualizer.textImport" class="asowp-w-full"/>
                </div>
                <div class="asowp-flex asowp-flex-col asowp-w-2/5 asowp-space-y-2">
                    <label class="asowp-text-[12px] asowp-text-[#444444]">{{ __("Save text", "all-signs-options-pro") }}</label>
                    <input type="text" v-model="visualizer.textSave" class="asowp-w-full"/>
                </div>
            </div>
        </div>
        <div class="asowp-bg-[#F8F9FB] asowp-px-8 asowp-py-8 asowp-space-y-6">
            <h3 class="asowp-text-[16px]">{{ __("Button Options", "all-signs-options-pro") }}</h3>
            <div class="asowp-flex asowp-justify-between">
                <div class="asowp-flex asowp-flex-col asowp-w-2/5 asowp-space-y-2">
                    <label class="asowp-text-[12px] asowp-text-[#444444]">{{ __("Text Material", "all-signs-options-pro") }}</label>
                    <input type="text" v-model="visualizer.textMaterial" class="asowp-w-full"/>
                </div>
                <div class="asowp-flex asowp-flex-col asowp-w-2/5 asowp-space-y-2">
                    <label class="so-text-[12px] asowp-text-[#444444]">{{ __("Text Size", "all-signs-options-pro") }}</label>
                    <input type="text" v-model="visualizer.textSize" class="asowp-w-full"/>
                </div>
            </div>
            <div class="asowp-flex asowp-justify-between">
                <div class="asowp-flex asowp-flex-col asowp-w-2/5 asowp-space-y-2">
                    <label class="asowp-text-[12px] asowp-text-[#444444]">{{ __("Text Width", "all-signs-options-pro") }}</label>
                    <input type="text" v-model="visualizer.textWidth" class="asowp-w-full"/>
                </div>
                <div class="asowp-flex asowp-flex-col asowp-w-2/5 asowp-space-y-2">
                    <label class="so-text-[12px] asowp-text-[#444444]">{{ __("Text Height", "all-signs-options-pro") }}</label>
                    <input type="text" v-model="visualizer.textHeight" class="asowp-w-full"/>
                </div>
            </div>
            <div class="asowp-flex asowp-justify-between">
                <div class="asowp-flex asowp-flex-col asowp-w-2/5 asowp-space-y-2">
                    <label class="asowp-text-[12px] asowp-text-[#444444]">{{ __("Text Position", "all-signs-options-pro") }}</label>
                    <input type="text" v-model="visualizer.textPosition" class="asowp-w-full"/>
                </div>
                <div class="asowp-flex asowp-flex-col asowp-w-2/5 asowp-space-y-2">
                    <label class="so-text-[12px] asowp-text-[#444444]">{{ __("Text Angle", "all-signs-options-pro") }}</label>
                    <input type="text" v-model="visualizer.textAngle" class="asowp-w-full"/>
                </div>
            </div>
            <div class="asowp-flex asowp-justify-between">
                <div class="asowp-flex asowp-flex-col asowp-w-2/5 asowp-space-y-2">
                    <label class="asowp-text-[12px] asowp-text-[#444444]">{{ __("Text Top", "all-signs-options-pro") }}</label>
                    <input type="text" v-model="visualizer.textTop" class="asowp-w-full"/>
                </div>
                <div class="asowp-flex asowp-flex-col asowp-w-2/5 asowp-space-y-2">
                    <label class="so-text-[12px] asowp-text-[#444444]">{{ __("Text Bottom", "all-signs-options-pro") }}</label>
                    <input type="text" v-model="visualizer.textBottom" class="asowp-w-full"/>
                </div>
            </div>
            <div class="asowp-flex asowp-justify-between">
                <div class="asowp-flex asowp-flex-col asowp-w-2/5 asowp-space-y-2">
                    <label class="asowp-text-[12px] asowp-text-[#444444]">{{ __("Text Left", "all-signs-options-pro") }}</label>
                    <input type="text" v-model="visualizer.textLeft" class="asowp-w-full"/>
                </div>
                <div class="asowp-flex asowp-flex-col asowp-w-2/5 asowp-space-y-2">
                    <label class="so-text-[12px] asowp-text-[#444444]">{{ __("Text Right", "all-signs-options-pro") }}</label>
                    <input type="text" v-model="visualizer.textRight" class="asowp-w-full"/>
                </div>
            </div>
            <div class="asowp-flex asowp-justify-between">
                <div class="asowp-flex asowp-flex-col asowp-w-2/5 asowp-space-y-2">
                    <label class="asowp-text-[12px] asowp-text-[#444444]">{{ __("Label of Custom Size", "all-signs-options-pro") }}</label>
                    <input type="text" v-model="visualizer.customSize" class="asowp-w-full"/>
                </div>
                <div class="asowp-flex asowp-flex-col asowp-w-2/5 asowp-space-y-2">
                    <label class="so-text-[12px] asowp-text-[#444444]">{{ __("Label of Custom Size button Done", "all-signs-options-pro") }}</label>
                    <input type="text" v-model="visualizer.customSizeButtonDone" class="asowp-w-full"/>
                </div>
            </div>
            <div class="asowp-flex asowp-justify-between">
                <div class="asowp-flex asowp-flex-col asowp-w-2/5 asowp-space-y-2">
                    <label class="asowp-text-[12px] asowp-text-[#444444]">{{ __("Text Thickness", "all-signs-options-pro") }}</label>
                    <input type="text" v-model="visualizer.thickness" class="asowp-w-full"/>
                </div>
                <div class="asowp-flex asowp-flex-col asowp-w-2/5 asowp-space-y-2">
                    <label class="asowp-text-[12px] asowp-text-[#444444]">{{ __("Text Shape", "all-signs-options-pro") }}</label>
                    <input type="text" v-model="visualizer.textShape" class="asowp-w-full"/>
                </div>
                
            </div>
            <div class="asowp-flex asowp-justify-between">
                <div class="asowp-flex asowp-flex-col asowp-w-2/5 asowp-space-y-2">
                    <label class="so-text-[12px] asowp-text-[#444444]">{{ __("Text Fixing Methods", "all-signs-options-pro") }}</label>
                    <input type="text" v-model="visualizer.textFixingMethods" class="asowp-w-full"/>
                </div>
                <div class="asowp-flex asowp-flex-col asowp-w-2/5 asowp-space-y-2">
                    <label class="asowp-text-[12px] asowp-text-[#444444]">{{ __("Text Color", "all-signs-options-pro") }}</label>
                    <input type="text" v-model="visualizer.textColor" class="asowp-w-full"/>
                </div>
                
            </div>
            <div class="asowp-flex asowp-justify-between">
                <div class="asowp-flex asowp-flex-col asowp-w-2/5 asowp-space-y-2">
                    <label class="so-text-[12px] asowp-text-[#444444]">{{ __("Text option Text", "all-signs-options-pro") }}</label>
                    <input type="text" v-model="visualizer.textOptionText" class="asowp-w-full"/>
                </div>
                <div class="asowp-flex asowp-flex-col asowp-w-2/5 asowp-space-y-2">
                    <label class="asowp-text-[12px] asowp-text-[#444444]">{{ __("Text Border", "all-signs-options-pro") }}</label>
                    <input type="text" v-model="visualizer.textBorder" class="asowp-w-full"/>
                </div>
                
            </div>
            <div class="asowp-flex asowp-justify-between">
                <div class="asowp-flex asowp-flex-col asowp-w-2/5 asowp-space-y-2">
                    <label class="so-text-[12px] asowp-text-[#444444]">{{ __("Text Product", "all-signs-options-pro") }}</label>
                    <input type="text" v-model="visualizer.textProduct" class="asowp-w-full"/>
                </div>
                <div class="asowp-flex asowp-flex-col asowp-w-2/5 asowp-space-y-2">
                    <label class="asowp-text-[12px] asowp-text-[#444444]">{{ __("Text Image", "all-signs-options-pro") }}</label>
                    <input type="text" v-model="visualizer.textImage" class="asowp-w-full"/>
                </div>
            </div>
            <div class="asowp-flex asowp-justify-between">
                <div class="asowp-flex asowp-flex-col asowp-w-2/5 asowp-space-y-2">
                    <label class="asowp-text-[12px] asowp-text-[#444444]">{{ __("Text Example", "all-signs-options-pro") }}</label>
                    <input type="text" v-model="visualizer.textExample" class="asowp-w-full"/>
                </div>
            </div>
        </div>
        <div class="asowp-bg-[#F8F9FB] asowp-px-8 asowp-py-8 asowp-space-y-6">
            <h3 class="asowp-text-[16px]">{{ __("Rest Modal", "all-signs-options-pro") }}</h3>
            <div class="asowp-flex asowp-justify-between">
                <div class="asowp-flex asowp-flex-col asowp-w-2/5 asowp-space-y-2">
                    <label class="asowp-text-[12px] asowp-text-[#444444]">{{ __("Reset Modal Text", "all-signs-options-pro") }}</label>
                    <input type="text" v-model="visualizer.resetModalText" class="asowp-w-full"/>
                </div>
                <div class="asowp-flex asowp-flex-col asowp-w-2/5 asowp-space-y-2">
                    <label class="so-text-[12px] asowp-text-[#444444]">{{ __("Reset Modal Yes Button Text", "all-signs-options-pro") }}</label>
                    <input type="text" v-model="visualizer.resetModalYes" class="asowp-w-full"/>
                </div>
            </div>
            <div class="asowp-flex asowp-justify-between">
                <div class="asowp-flex asowp-flex-col asowp-w-2/5 asowp-space-y-2">
                    <label class="asowp-text-[12px] asowp-text-[#444444]">{{ __("Reset Modal No Button Text", "all-signs-options-pro") }}</label>
                    <input type="text" v-model="visualizer.resetModalNo" class="asowp-w-full"/>
                </div>
            </div>
        </div>
        <div class="asowp-bg-[#F8F9FB] asowp-px-8 asowp-py-8 asowp-space-y-6">
            <h3 class="asowp-text-[16px]">{{ __("Text Required Modal", "all-signs-options-pro") }}</h3>
            <div class="asowp-flex asowp-justify-between">
                <div class="asowp-flex asowp-flex-col asowp-w-2/5 asowp-space-y-2">
                    <label class="asowp-text-[12px] asowp-text-[#444444]">{{ __("Modal Title", "all-signs-options-pro") }}</label>
                    <input type="text" v-model="visualizer.textNoTextModalTitle" class="asowp-w-full"/>
                </div>
                <div class="asowp-flex asowp-flex-col asowp-w-2/5 asowp-space-y-2">
                    <label class="asowp-text-[12px] asowp-text-[#444444]">{{ __("Modal Message", "all-signs-options-pro") }}</label>
                    <input type="text" v-model="visualizer.textNoTextModalMessage" class="asowp-w-full"/>
                </div>
            </div>
            <div class="asowp-flex asowp-justify-between">
                <div class="asowp-flex asowp-flex-col asowp-w-2/5 asowp-space-y-2">
                    <label class="asowp-text-[12px] asowp-text-[#444444]">{{ __("Modal Button Text", "all-signs-options-pro") }}</label>
                    <input type="text" v-model="visualizer.textNoTextModalButton" class="asowp-w-full"/>
                </div>
            </div>
            <div class="asowp-flex asowp-justify-between">
                <div class="asowp-flex asowp-flex-col asowp-w-2/5 asowp-space-y-2">
                    <label class="asowp-text-[12px] asowp-text-[#444444]">{{ __("No Font Modal Title", "all-signs-options-pro") }}</label>
                    <input type="text" v-model="visualizer.textNoFontModalTitle" class="asowp-w-full"/>
                </div>
                <div class="asowp-flex asowp-flex-col asowp-w-2/5 asowp-space-y-2">
                    <label class="asowp-text-[12px] asowp-text-[#444444]">{{ __("No Font Modal Message", "all-signs-options-pro") }}</label>
                    <input type="text" v-model="visualizer.textNoFontModalMessage" class="asowp-w-full"/>
                </div>
            </div>
            <div class="asowp-flex asowp-justify-between">
                <div class="asowp-flex asowp-flex-col asowp-w-2/5 asowp-space-y-2">
                    <label class="asowp-text-[12px] asowp-text-[#444444]">{{ __("No Font Modal Button Text", "all-signs-options-pro") }}</label>
                    <input type="text" v-model="visualizer.textNoFontModalButton" class="asowp-w-full"/>
                </div>
            </div>
        </div>
        <div class="asowp-bg-[#F8F9FB] asowp-flex asowp-space-x-4 asowp-px-4 asowp-py-3 asowp-justify-end asowp-items-end">
            <div class="asowp-bg-[#016464] asowp-rounded">
                <button :disabled="isLoading" @click="updateVisualizerSettings" class="asowp-rounded asowp-flex asowp-bg-transparent asowp-w-fit asowp-space-x-2 asowp-h-fit asowp-text-white asowp-px-12 asowp-p-2.5 asowp-border-none asowp-opacity-90 hover:asowp-opacity-100 hover:asowp-border-none hover:asowp-text-white hover:asowp-bg-[#016464] asowp-cursor-pointerasowp-flex asowp-bg-transparent asowp-w-fit asowp-space-x-2 asowp-h-fit asowp-text-white asowp-px-12 asowp-p-2.5 asowp-border-none asowp-opacity-90 hover:asowp-opacity-100 hover:asowp-border-none hover:asowp-text-white hover:asowp-bg-[#016464] asowp-cursor-pointer">
                    <img src="../../../../../../assets/icons/ic_loading_gray.svg" class="asowp-w-5 asowp-w-5" v-if="isLoading" />
                    <div class="asowp-font-semibold asowp-text-[16px]">{{ __("Save", "all-signs-options-pro") }}</div>
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
import { __, _x, _n, _nx, sprintf, setLocaleData } from "@wordpress/i18n";
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
    textNoTextModalTitle:"Add text to continue",
    textNoTextModalMessage:"Please add a text to continue.",
    textNoTextModalButton:"Got it",
    textNoFontModalTitle:"No fonts available",
    textNoFontModalMessage:"Please add at least one font in configuration settings to continue.",
    textNoFontModalButton:"Got it",

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
