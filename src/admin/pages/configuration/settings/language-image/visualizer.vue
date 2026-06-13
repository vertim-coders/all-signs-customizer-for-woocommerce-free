<template>
    <div class="ascwo-space-y-1 ascwo-translate-y-8">
        <div class="ascwo-bg-[#F8F9FB] ascwo-px-8 ascwo-py-8 ascwo-space-y-6">
            <h3 class="ascwo-text-[16px]">{{ __("Content Header", "all-signs-customizer-for-woocommerce-pro") }}</h3>
            <div class="ascwo-flex ascwo-justify-between">
                <div class="ascwo-flex ascwo-flex-col ascwo-w-2/5 ascwo-space-y-2">
                    <label class="ascwo-text-[12px] ascwo-text-[#444444]">{{ __("Title Header", "all-signs-customizer-for-woocommerce-pro") }}</label>
                    <input type="text" v-model="visualizer.titleHeader" class="ascwo-w-full"/>
                </div>
                <div class="ascwo-flex ascwo-flex-col ascwo-w-2/5 ascwo-space-y-2">
                    <label class="so-text-[12px] ascwo-text-[#444444]">{{ __("Text button refresh", "all-signs-customizer-for-woocommerce-pro") }}</label>
                    <input type="text" v-model="visualizer.textButtonRefresh" class="ascwo-w-full"/>
                </div>
            </div>
            <div class="ascwo-flex ascwo-justify-between">
                <div class="ascwo-flex ascwo-flex-col ascwo-w-2/5 ascwo-space-y-2">
                    <label class="ascwo-text-[12px] ascwo-text-[#444444]">{{ __("Additonals Options Header", "all-signs-customizer-for-woocommerce-pro") }}</label>
                    <input type="text" v-model="visualizer.textAdditonnalOptionsHeader" class="ascwo-w-full"/>
                </div>
                <div class="ascwo-flex ascwo-flex-col ascwo-w-2/5 ascwo-space-y-2">
                    <label class="so-text-[12px] ascwo-text-[#444444]">{{ __("Additonals Options Button Text", "all-signs-customizer-for-woocommerce-pro") }}</label>
                    <input type="text" v-model="visualizer.textButtonAdditonnalOptions" class="ascwo-w-full"/>
                </div>
            </div>
            <div class="ascwo-flex ascwo-justify-between">
                <div class="ascwo-flex ascwo-flex-col ascwo-w-2/5 ascwo-space-y-2">
                    <label class="ascwo-text-[12px] ascwo-text-[#444444]">{{ __("Text button back", "all-signs-customizer-for-woocommerce-pro") }}</label>
                    <input type="text" v-model="visualizer.textButtonBack" class="ascwo-w-full"/>
                </div>
                <div class="ascwo-flex ascwo-flex-col ascwo-w-2/5 ascwo-space-y-2">
                    <label class="so-text-[12px] ascwo-text-[#444444]">{{ __("Text button next", "all-signs-customizer-for-woocommerce-pro") }}</label>
                    <input type="text" v-model="visualizer.textButtonNext" class="ascwo-w-full"/>
                </div>
            </div>
            <div class="ascwo-flex ascwo-justify-between">
                <div class="ascwo-flex ascwo-flex-col ascwo-w-2/5 ascwo-space-y-2">
                    <label class="ascwo-text-[12px] ascwo-text-[#444444]">{{ __("Text Before Price", "all-signs-customizer-for-woocommerce-pro") }}</label>
                    <input type="text" v-model="visualizer.textBeforePrice" class="ascwo-w-full"/>
                </div>
                <div class="ascwo-flex ascwo-flex-col ascwo-w-2/5 ascwo-space-y-2">
                    <label class="ascwo-text-[12px] ascwo-text-[#444444]">{{ __("Text After Price", "all-signs-customizer-for-woocommerce-pro") }}</label>
                    <input type="text" v-model="visualizer.textAfterPrice" class="ascwo-w-full"/>
                </div>
            </div>
            <div class="ascwo-flex ascwo-justify-between">
                <div class="ascwo-flex ascwo-flex-col ascwo-w-2/5 ascwo-space-y-2">
                    <label class="so-text-[12px] ascwo-text-[#444444]">{{ __("Text button finish", "all-signs-customizer-for-woocommerce-pro") }}</label>
                    <input type="text" v-model="visualizer.textButtonFinish" class="ascwo-w-full"/>
                </div>
                <div class="ascwo-flex ascwo-flex-col ascwo-w-2/5 ascwo-space-y-2">
                    <label class="so-text-[12px] ascwo-text-[#444444]">{{ __("Text button Add to cart", "all-signs-customizer-for-woocommerce-pro") }}</label>
                    <input type="text" v-model="visualizer.textAddToCart" class="ascwo-w-full"/>
                </div>
            </div>

            <h3 class="ascwo-text-[16px]">{{ __("Action on selected object in canvas", "all-signs-customizer-for-woocommerce-pro") }}</h3>
            <div class="ascwo-flex ascwo-justify-between">
                <div class="ascwo-flex ascwo-flex-col ascwo-w-2/5 ascwo-space-y-2">
                    <label class="ascwo-text-[12px] ascwo-text-[#444444]">{{ __("Canvas selected object edit button", "all-signs-customizer-for-woocommerce-pro") }}</label>
                    <input type="text" v-model="visualizer.textCanvasEdit" class="ascwo-w-full"/>
                </div>
                <div class="ascwo-flex ascwo-flex-col ascwo-w-2/5 ascwo-space-y-2">
                    <label class="so-text-[12px] ascwo-text-[#444444]">{{ __("Canvas selected object delete button", "all-signs-customizer-for-woocommerce-pro") }}</label>
                    <input type="text" v-model="visualizer.textCanvasDelete" class="ascwo-w-full"/>
                </div>
            </div>
            <div class="ascwo-flex ascwo-justify-between">
                <div class="ascwo-flex ascwo-flex-col ascwo-w-2/5 ascwo-space-y-2">
                    <label class="ascwo-text-[12px] ascwo-text-[#444444]">{{ __("Canvas selected object CenterH button", "all-signs-customizer-for-woocommerce-pro") }}</label>
                    <input type="text" v-model="visualizer.textCanvasCenterH" class="ascwo-w-full"/>
                </div>
                <div class="ascwo-flex ascwo-flex-col ascwo-w-2/5 ascwo-space-y-2">
                    <label class="so-text-[12px] ascwo-text-[#444444]">{{ __("Canvas selected object centerV button", "all-signs-customizer-for-woocommerce-pro") }}</label>
                    <input type="text" v-model="visualizer.textCanvasCenterV" class="ascwo-w-full"/>
                </div>
            </div>
            <div class="ascwo-flex ascwo-justify-between">
                <div class="ascwo-flex ascwo-flex-col ascwo-w-2/5 ascwo-space-y-2">
                    <label class="ascwo-text-[12px] ascwo-text-[#444444]">{{ __("Canvas selected object clone button", "all-signs-customizer-for-woocommerce-pro") }}</label>
                    <input type="text" v-model="visualizer.textCanvasClone" class="ascwo-w-full"/>
                </div>
            </div>
            
        </div>
        <div class="ascwo-bg-[#F8F9FB] ascwo-px-8 ascwo-py-8 ascwo-space-y-6">
            <h3 class="ascwo-text-[16px]">{{ __("Content Sidebar", "all-signs-customizer-for-woocommerce-pro") }}</h3>
            <div class="ascwo-flex ascwo-justify-between">
                <div class="ascwo-flex ascwo-flex-col ascwo-w-2/5 ascwo-space-y-2">
                    <label class="ascwo-text-[12px] ascwo-text-[#444444]">{{ __("Preview text", "all-signs-customizer-for-woocommerce-pro") }}</label>
                    <input type="text" v-model="visualizer.textPreview" class="ascwo-w-full"/>
                </div>
                <div class="ascwo-flex ascwo-flex-col ascwo-w-2/5 ascwo-space-y-2">
                    <label class="so-text-[12px] ascwo-text-[#444444]">{{ __("Share text", "all-signs-customizer-for-woocommerce-pro") }}</label>
                    <input type="text" v-model="visualizer.textShare" class="ascwo-w-full"/>
                </div>
            </div>
            <div class="ascwo-flex ascwo-justify-between">
                <div class="ascwo-flex ascwo-flex-col ascwo-w-2/5 ascwo-space-y-2">
                    <label class="ascwo-text-[12px] ascwo-text-[#444444]">{{ __("Move Up", "all-signs-customizer-for-woocommerce-pro") }}</label>
                    <input type="text" v-model="visualizer.textMoveUp" class="ascwo-w-full"/>
                </div>
                <div class="ascwo-flex ascwo-flex-col ascwo-w-2/5 ascwo-space-y-2">
                    <label class="so-text-[12px] ascwo-text-[#444444]">{{ __("Move down", "all-signs-customizer-for-woocommerce-pro") }}</label>
                    <input type="text" v-model="visualizer.textMoveDown" class="ascwo-w-full"/>
                </div>
            </div>
            <div class="ascwo-flex ascwo-justify-between">
                <div class="ascwo-flex ascwo-flex-col ascwo-w-2/5 ascwo-space-y-2">
                    <label class="so-text-[12px] ascwo-text-[#444444]">{{ __("Help text", "all-signs-customizer-for-woocommerce-pro") }}</label>
                    <input type="text" v-model="visualizer.textHelp" class="ascwo-w-full"/>
                </div>
                <div class="ascwo-flex ascwo-flex-col ascwo-w-2/5 ascwo-space-y-2">
                    <label class="so-text-[12px] ascwo-text-[#444444]">{{ __("Download text", "all-signs-customizer-for-woocommerce-pro") }}</label>
                    <input type="text" v-model="visualizer.textDownload" class="ascwo-w-full"/>
                </div>
            </div>
            <div class="ascwo-flex ascwo-justify-between">
                <div class="ascwo-flex ascwo-flex-col ascwo-w-2/5 ascwo-space-y-2">
                    <label class="ascwo-text-[12px] ascwo-text-[#444444]">{{ __("Import text", "all-signs-customizer-for-woocommerce-pro") }}</label>
                    <input type="text" v-model="visualizer.textImport" class="ascwo-w-full"/>
                </div>
                <div class="ascwo-flex ascwo-flex-col ascwo-w-2/5 ascwo-space-y-2">
                    <label class="ascwo-text-[12px] ascwo-text-[#444444]">{{ __("Save text", "all-signs-customizer-for-woocommerce-pro") }}</label>
                    <input type="text" v-model="visualizer.textSave" class="ascwo-w-full"/>
                </div>
            </div>
        </div>
        <div class="ascwo-bg-[#F8F9FB] ascwo-px-8 ascwo-py-8 ascwo-space-y-6">
            <h3 class="ascwo-text-[16px]">{{ __("Button Options", "all-signs-customizer-for-woocommerce-pro") }}</h3>
            <div class="ascwo-flex ascwo-justify-between">
                <div class="ascwo-flex ascwo-flex-col ascwo-w-2/5 ascwo-space-y-2">
                    <label class="ascwo-text-[12px] ascwo-text-[#444444]">{{ __("Text Material", "all-signs-customizer-for-woocommerce-pro") }}</label>
                    <input type="text" v-model="visualizer.textMaterial" class="ascwo-w-full"/>
                </div>
                <div class="ascwo-flex ascwo-flex-col ascwo-w-2/5 ascwo-space-y-2">
                    <label class="so-text-[12px] ascwo-text-[#444444]">{{ __("Text Size", "all-signs-customizer-for-woocommerce-pro") }}</label>
                    <input type="text" v-model="visualizer.textSize" class="ascwo-w-full"/>
                </div>
            </div>
            <div class="ascwo-flex ascwo-justify-between">
                <div class="ascwo-flex ascwo-flex-col ascwo-w-2/5 ascwo-space-y-2">
                    <label class="ascwo-text-[12px] ascwo-text-[#444444]">{{ __("Text Width", "all-signs-customizer-for-woocommerce-pro") }}</label>
                    <input type="text" v-model="visualizer.textWidth" class="ascwo-w-full"/>
                </div>
                <div class="ascwo-flex ascwo-flex-col ascwo-w-2/5 ascwo-space-y-2">
                    <label class="so-text-[12px] ascwo-text-[#444444]">{{ __("Text Height", "all-signs-customizer-for-woocommerce-pro") }}</label>
                    <input type="text" v-model="visualizer.textHeight" class="ascwo-w-full"/>
                </div>
            </div>
            <div class="ascwo-flex ascwo-justify-between">
                <div class="ascwo-flex ascwo-flex-col ascwo-w-2/5 ascwo-space-y-2">
                    <label class="ascwo-text-[12px] ascwo-text-[#444444]">{{ __("Text Position", "all-signs-customizer-for-woocommerce-pro") }}</label>
                    <input type="text" v-model="visualizer.textPosition" class="ascwo-w-full"/>
                </div>
                <div class="ascwo-flex ascwo-flex-col ascwo-w-2/5 ascwo-space-y-2">
                    <label class="so-text-[12px] ascwo-text-[#444444]">{{ __("Text Angle", "all-signs-customizer-for-woocommerce-pro") }}</label>
                    <input type="text" v-model="visualizer.textAngle" class="ascwo-w-full"/>
                </div>
            </div>
            <div class="ascwo-flex ascwo-justify-between">
                <div class="ascwo-flex ascwo-flex-col ascwo-w-2/5 ascwo-space-y-2">
                    <label class="ascwo-text-[12px] ascwo-text-[#444444]">{{ __("Text Top", "all-signs-customizer-for-woocommerce-pro") }}</label>
                    <input type="text" v-model="visualizer.textTop" class="ascwo-w-full"/>
                </div>
                <div class="ascwo-flex ascwo-flex-col ascwo-w-2/5 ascwo-space-y-2">
                    <label class="so-text-[12px] ascwo-text-[#444444]">{{ __("Text Bottom", "all-signs-customizer-for-woocommerce-pro") }}</label>
                    <input type="text" v-model="visualizer.textBottom" class="ascwo-w-full"/>
                </div>
            </div>
            <div class="ascwo-flex ascwo-justify-between">
                <div class="ascwo-flex ascwo-flex-col ascwo-w-2/5 ascwo-space-y-2">
                    <label class="ascwo-text-[12px] ascwo-text-[#444444]">{{ __("Text Left", "all-signs-customizer-for-woocommerce-pro") }}</label>
                    <input type="text" v-model="visualizer.textLeft" class="ascwo-w-full"/>
                </div>
                <div class="ascwo-flex ascwo-flex-col ascwo-w-2/5 ascwo-space-y-2">
                    <label class="so-text-[12px] ascwo-text-[#444444]">{{ __("Text Right", "all-signs-customizer-for-woocommerce-pro") }}</label>
                    <input type="text" v-model="visualizer.textRight" class="ascwo-w-full"/>
                </div>
            </div>
            <div class="ascwo-flex ascwo-justify-between">
                <div class="ascwo-flex ascwo-flex-col ascwo-w-2/5 ascwo-space-y-2">
                    <label class="ascwo-text-[12px] ascwo-text-[#444444]">{{ __("Label of Custom Size", "all-signs-customizer-for-woocommerce-pro") }}</label>
                    <input type="text" v-model="visualizer.customSize" class="ascwo-w-full"/>
                </div>
                <div class="ascwo-flex ascwo-flex-col ascwo-w-2/5 ascwo-space-y-2">
                    <label class="so-text-[12px] ascwo-text-[#444444]">{{ __("Label of Custom Size button Done", "all-signs-customizer-for-woocommerce-pro") }}</label>
                    <input type="text" v-model="visualizer.customSizeButtonDone" class="ascwo-w-full"/>
                </div>
            </div>
            <div class="ascwo-flex ascwo-justify-between">
                <div class="ascwo-flex ascwo-flex-col ascwo-w-2/5 ascwo-space-y-2">
                    <label class="ascwo-text-[12px] ascwo-text-[#444444]">{{ __("Text Thickness", "all-signs-customizer-for-woocommerce-pro") }}</label>
                    <input type="text" v-model="visualizer.thickness" class="ascwo-w-full"/>
                </div>
                <div class="ascwo-flex ascwo-flex-col ascwo-w-2/5 ascwo-space-y-2">
                    <label class="ascwo-text-[12px] ascwo-text-[#444444]">{{ __("Text Shape", "all-signs-customizer-for-woocommerce-pro") }}</label>
                    <input type="text" v-model="visualizer.textShape" class="ascwo-w-full"/>
                </div>
                
            </div>
            <div class="ascwo-flex ascwo-justify-between">
                <div class="ascwo-flex ascwo-flex-col ascwo-w-2/5 ascwo-space-y-2">
                    <label class="so-text-[12px] ascwo-text-[#444444]">{{ __("Text Fixing Methods", "all-signs-customizer-for-woocommerce-pro") }}</label>
                    <input type="text" v-model="visualizer.textFixingMethods" class="ascwo-w-full"/>
                </div>
                <div class="ascwo-flex ascwo-flex-col ascwo-w-2/5 ascwo-space-y-2">
                    <label class="ascwo-text-[12px] ascwo-text-[#444444]">{{ __("Text Color", "all-signs-customizer-for-woocommerce-pro") }}</label>
                    <input type="text" v-model="visualizer.textColor" class="ascwo-w-full"/>
                </div>
                
            </div>
            <div class="ascwo-flex ascwo-justify-between">
                <div class="ascwo-flex ascwo-flex-col ascwo-w-2/5 ascwo-space-y-2">
                    <label class="so-text-[12px] ascwo-text-[#444444]">{{ __("Text option Text", "all-signs-customizer-for-woocommerce-pro") }}</label>
                    <input type="text" v-model="visualizer.textOptionText" class="ascwo-w-full"/>
                </div>
                <div class="ascwo-flex ascwo-flex-col ascwo-w-2/5 ascwo-space-y-2">
                    <label class="ascwo-text-[12px] ascwo-text-[#444444]">{{ __("Text Border", "all-signs-customizer-for-woocommerce-pro") }}</label>
                    <input type="text" v-model="visualizer.textBorder" class="ascwo-w-full"/>
                </div>
                
            </div>
            <div class="ascwo-flex ascwo-justify-between">
                <div class="ascwo-flex ascwo-flex-col ascwo-w-2/5 ascwo-space-y-2">
                    <label class="so-text-[12px] ascwo-text-[#444444]">{{ __("Text Product", "all-signs-customizer-for-woocommerce-pro") }}</label>
                    <input type="text" v-model="visualizer.textProduct" class="ascwo-w-full"/>
                </div>
                <div class="ascwo-flex ascwo-flex-col ascwo-w-2/5 ascwo-space-y-2">
                    <label class="ascwo-text-[12px] ascwo-text-[#444444]">{{ __("Text Image", "all-signs-customizer-for-woocommerce-pro") }}</label>
                    <input type="text" v-model="visualizer.textImage" class="ascwo-w-full"/>
                </div>
            </div>
            <div class="ascwo-flex ascwo-justify-between">
                <div class="ascwo-flex ascwo-flex-col ascwo-w-2/5 ascwo-space-y-2">
                    <label class="ascwo-text-[12px] ascwo-text-[#444444]">{{ __("Text Example", "all-signs-customizer-for-woocommerce-pro") }}</label>
                    <input type="text" v-model="visualizer.textExample" class="ascwo-w-full"/>
                </div>
            </div>
        </div>
        <div class="ascwo-bg-[#F8F9FB] ascwo-px-8 ascwo-py-8 ascwo-space-y-6">
            <h3 class="ascwo-text-[16px]">{{ __("Rest Modal", "all-signs-customizer-for-woocommerce-pro") }}</h3>
            <div class="ascwo-flex ascwo-justify-between">
                <div class="ascwo-flex ascwo-flex-col ascwo-w-2/5 ascwo-space-y-2">
                    <label class="ascwo-text-[12px] ascwo-text-[#444444]">{{ __("Reset Modal Text", "all-signs-customizer-for-woocommerce-pro") }}</label>
                    <input type="text" v-model="visualizer.resetModalText" class="ascwo-w-full"/>
                </div>
                <div class="ascwo-flex ascwo-flex-col ascwo-w-2/5 ascwo-space-y-2">
                    <label class="so-text-[12px] ascwo-text-[#444444]">{{ __("Reset Modal Yes Button Text", "all-signs-customizer-for-woocommerce-pro") }}</label>
                    <input type="text" v-model="visualizer.resetModalYes" class="ascwo-w-full"/>
                </div>
            </div>
            <div class="ascwo-flex ascwo-justify-between">
                <div class="ascwo-flex ascwo-flex-col ascwo-w-2/5 ascwo-space-y-2">
                    <label class="ascwo-text-[12px] ascwo-text-[#444444]">{{ __("Reset Modal No Button Text", "all-signs-customizer-for-woocommerce-pro") }}</label>
                    <input type="text" v-model="visualizer.resetModalNo" class="ascwo-w-full"/>
                </div>
            </div>
        </div>
        <div class="ascwo-bg-[#F8F9FB] ascwo-px-8 ascwo-py-8 ascwo-space-y-6">
            <h3 class="ascwo-text-[16px]">{{ __("Text Required Modal", "all-signs-customizer-for-woocommerce-pro") }}</h3>
            <div class="ascwo-flex ascwo-justify-between">
                <div class="ascwo-flex ascwo-flex-col ascwo-w-2/5 ascwo-space-y-2">
                    <label class="ascwo-text-[12px] ascwo-text-[#444444]">{{ __("Modal Title", "all-signs-customizer-for-woocommerce-pro") }}</label>
                    <input type="text" v-model="visualizer.textNoTextModalTitle" class="ascwo-w-full"/>
                </div>
                <div class="ascwo-flex ascwo-flex-col ascwo-w-2/5 ascwo-space-y-2">
                    <label class="ascwo-text-[12px] ascwo-text-[#444444]">{{ __("Modal Message", "all-signs-customizer-for-woocommerce-pro") }}</label>
                    <input type="text" v-model="visualizer.textNoTextModalMessage" class="ascwo-w-full"/>
                </div>
            </div>
            <div class="ascwo-flex ascwo-justify-between">
                <div class="ascwo-flex ascwo-flex-col ascwo-w-2/5 ascwo-space-y-2">
                    <label class="ascwo-text-[12px] ascwo-text-[#444444]">{{ __("Modal Button Text", "all-signs-customizer-for-woocommerce-pro") }}</label>
                    <input type="text" v-model="visualizer.textNoTextModalButton" class="ascwo-w-full"/>
                </div>
            </div>
            <div class="ascwo-flex ascwo-justify-between">
                <div class="ascwo-flex ascwo-flex-col ascwo-w-2/5 ascwo-space-y-2">
                    <label class="ascwo-text-[12px] ascwo-text-[#444444]">{{ __("No Font Modal Title", "all-signs-customizer-for-woocommerce-pro") }}</label>
                    <input type="text" v-model="visualizer.textNoFontModalTitle" class="ascwo-w-full"/>
                </div>
                <div class="ascwo-flex ascwo-flex-col ascwo-w-2/5 ascwo-space-y-2">
                    <label class="ascwo-text-[12px] ascwo-text-[#444444]">{{ __("No Font Modal Message", "all-signs-customizer-for-woocommerce-pro") }}</label>
                    <input type="text" v-model="visualizer.textNoFontModalMessage" class="ascwo-w-full"/>
                </div>
            </div>
            <div class="ascwo-flex ascwo-justify-between">
                <div class="ascwo-flex ascwo-flex-col ascwo-w-2/5 ascwo-space-y-2">
                    <label class="ascwo-text-[12px] ascwo-text-[#444444]">{{ __("No Font Modal Button Text", "all-signs-customizer-for-woocommerce-pro") }}</label>
                    <input type="text" v-model="visualizer.textNoFontModalButton" class="ascwo-w-full"/>
                </div>
            </div>
        </div>
        <div class="ascwo-bg-[#F8F9FB] ascwo-flex ascwo-space-x-4 ascwo-px-4 ascwo-py-3 ascwo-justify-end ascwo-items-end">
            <div class="ascwo-bg-[#016464] ascwo-rounded">
                <button :disabled="isLoading" @click="updateVisualizerSettings" class="ascwo-rounded ascwo-flex ascwo-bg-transparent ascwo-w-fit ascwo-space-x-2 ascwo-h-fit ascwo-text-white ascwo-px-12 ascwo-p-2.5 ascwo-border-none ascwo-opacity-90 hover:ascwo-opacity-100 hover:ascwo-border-none hover:ascwo-text-white hover:ascwo-bg-[#016464] ascwo-cursor-pointerascwo-flex ascwo-bg-transparent ascwo-w-fit ascwo-space-x-2 ascwo-h-fit ascwo-text-white ascwo-px-12 ascwo-p-2.5 ascwo-border-none ascwo-opacity-90 hover:ascwo-opacity-100 hover:ascwo-border-none hover:ascwo-text-white hover:ascwo-bg-[#016464] ascwo-cursor-pointer">
                    <img src="../../../../../../assets/icons/ic_loading_gray.svg" class="ascwo-w-5 ascwo-w-5" v-if="isLoading" />
                    <div class="ascwo-font-semibold ascwo-text-[16px]">{{ __("Save", "all-signs-customizer-for-woocommerce-pro") }}</div>
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
