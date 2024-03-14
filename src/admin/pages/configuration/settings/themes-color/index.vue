<template>
    <div v-if="isFetching" class="aso-bg-white aso-border-solid aso-border aso-border-[#D1D1D1] aso-flex aso-flex-col aso-space-y-2 aso-justify-center aso-items-center aso-w-full aso-h-[306px] p-4">
        <img class="aso-w-[200px] aso-h-[200px]" src="../../../../../../assets/icons/ic_loading.svg" alt="">
    </div>
    <div v-if="!isFetching">
        <div class="aso-space-y-1">
            <div class="aso-bg-[#F8F9FB] aso-px-8 aso-py-8 aso-space-y-6">
                <h3 class="aso-text-[16px]">Choose your customizer appearance</h3>
                <div class="aso-w-1/2">
                    <div class="aso-image-wrapper aso-border-black aso-border-solid aso-border-[1px] aso-rounded-lg">

                        <label for="image1" class="aso-image-label">
                            <img src="../../../../../../assets/images/img_homepage.png" alt="Image 1" class="aso-w-full aso-h-auto aso-cursor-pointer" @click="themes.skin('image1')">
                        </label>
                        <div class="aso-flex aso-bg-[#ffffff] aso-p-3 -aso-translate-y-0.5 aso-rounded-lg">
                            <div class="aso-w-1/2">
                                <span>Default</span>
                            </div>
                            <div class="aso-flex aso-justify-end aso-w-1/2 aso-space-x-2">
                                <span>Select</span>
                                <input type="radio" id="image1" name="selectedImage" class="aso-translate-y-1.5"  v-model="themes.skin">
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="aso-bg-[#F8F9FB] aso-px-8 aso-py-8 aso-space-y-6">
                <h3 class="aso-text-[16px]">Content Header</h3>
                <div class="aso-flex aso-justify-between">
                    <div class="aso-flex aso-flex-col aso-w-2/5 aso-space-y-2">
                        <label class="aso-text-[12px] aso-text-[#444444]">Text color</label>
                        <div class="aso-relative aso-flex">
                            <input
                                id="colorPicker"
                                type="color"
                                v-model="textColorConstentHeader"
                                @input="updateHexCode1"
                                class="aso-w-9 aso-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="textColorConstentHeader"
                                @input="updateColorFromHex1"
                                class="aso-p-1 aso-text-black aso-w-full aso-translate-y-0"
                            />
                        </div>
                    </div>
                    <div class="aso-flex aso-flex-col aso-w-2/5 aso-space-y-2">
                        <label class="aso-text-[12px] aso-text-[#444444]">Background header</label>
                        <div class="aso-relative aso-flex">
                            <input
                                id="colorPicker"
                                type="color"
                                v-model="backgroundCoslorHeader"
                                @input="updateHexCode2"
                                class="aso-w-9 aso-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="backgroundCoslorHeader"
                                @input="updateColorFromHex2"
                                class="aso-p-1 aso-text-black aso-w-full aso-translate-y-0"
                            />
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="aso-bg-[#F8F9FB] aso-px-8 aso-py-8 aso-space-y-6">
                <h3 class="aso-text-[16px]">Content Sidebar</h3>
                <div class="aso-flex aso-justify-between">
                    <div class="aso-flex aso-flex-col aso-w-2/5 aso-space-y-2">
                        <label class="aso-text-[12px] aso-text-[#444444]">Text color</label>
                        <div class="aso-relative aso-flex">
                            <input
                                id="colorPicker"
                                type="color"
                                v-model="themes.colors.textColorContentSideMenu"
                                @input="updateHexCode3"
                                class="aso-w-9 aso-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.textColorContentSideMenu"
                                @input="updateColorFromHex3"
                                class="aso-p-1 aso-text-black aso-w-full aso-translate-y-0"
                            />
                        </div>
                    </div>
                    <div class="aso-flex aso-flex-col aso-w-2/5 aso-space-y-2">
                        <label class="aso-text-[12px] aso-text-[#444444]">Background Sidebar</label>
                        <div class="aso-relative aso-flex">
                            <input
                                id="colorPicker"
                                type="color"
                                v-model="themes.colors.backgroundColorHeaderContentSide"
                                @input="updateHexCode4"
                                class="aso-w-9 aso-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.backgroundColorHeaderContentSide"
                                @input="updateColorFromHex4"
                                class="aso-p-1 aso-text-black aso-w-full aso-translate-y-0"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div class="aso-bg-[#F8F9FB] aso-px-8 aso-py-8 aso-space-y-6">
                <h3 class="aso-text-[16px]">Menu</h3>
                <div class="aso-flex aso-justify-between">
                    <div class="aso-flex aso-flex-col aso-w-2/5 aso-space-y-2">
                        <label class="aso-text-[12px] aso-text-[#444444]">color Text options</label>
                        <div class="aso-relative aso-flex">
                            <input
                                id="colorPicker"
                                type="color"
                                v-model="themes.colors.textColorOptionsMenu"
                                @input="updateHexCode5"
                                class="aso-w-9 aso-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.textColorOptionsMenu"
                                @input="updateColorFromHex5"
                                class="aso-p-1 aso-text-black aso-w-full -aso-translate-y-px"
                            />
                        </div>
                    </div>
                    <div class="aso-flex aso-flex-col aso-w-2/5 aso-space-y-2">
                        <label class="so-text-[12px] aso-text-[#444444]">Background options</label>
                        <div class="aso-relative aso-flex">
                            <input
                                id="colorPicker"
                                type="color"
                                v-model="themes.colors.backgroundColorOptionsMenu"
                                @input="updateHexCode6"
                                class="aso-w-9 aso-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.backgroundColorOptionsMenu"
                                @input="updateColorFromHex6"
                                class="aso-p-1 aso-text-black aso-w-full -aso-translate-y-px"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div class="aso-bg-[#F8F9FB] aso-px-8 aso-py-8 aso-space-y-6">
                <div class="aso-flex aso-justify-between">
                    <div class="aso-flex aso-flex-col aso-w-2/5 aso-space-y-2">
                        <label class="aso-text-[12px] aso-text-[#444444]">Color text Button Save</label>
                        <div class="aso-relative aso-flex">
                            <input
                                id="colorPicker"
                                type="color"
                                v-model="themes.colors.textColorButtonSave"
                                @input="updateHexCode7"
                                class="aso-w-9 aso-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.textColorButtonSave"
                                @input="updateColorFromHex7"
                                class="aso-p-1 aso-text-black aso-w-full -aso-translate-y-px"
                            />
                        </div>
                    </div>
                    <div class="aso-flex aso-flex-col aso-w-2/5 aso-space-y-2">
                        <label class="so-text-[12px] aso-text-[#444444]">Background color Button Save</label>
                        <div class="aso-relative aso-flex">
                            <input
                                id="colorPicker"
                                type="color"
                                v-model="themes.colors.backgroundColorTextButtonSave"
                                @input="updateHexCode8"
                                class="aso-w-9 aso-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.backgroundColorTextButtonSave"
                                @input="updateColorFromHex8"
                                class="aso-p-1 aso-text-black aso-w-full -aso-translate-y-px"
                            />
                        </div>
                    </div>
                </div>
                <div class="aso-flex aso-justify-between">
                    <div class="aso-flex aso-flex-col aso-w-2/5 aso-space-y-2">
                        <label class="aso-text-[12px] aso-text-[#444444]">Color Hover text Button Save</label>
                        <div class="aso-relative aso-flex">
                            <input
                                id="colorPicker"
                                type="color"
                                v-model="themes.colors.textColorHoverButtonSave"
                                @input="updateHexCode9"
                                class="aso-w-9 aso-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.textColorHoverButtonSave"
                                @input="updateColorFromHex9"
                                class="aso-p-1 aso-text-black aso-w-full -aso-translate-y-px"
                            />
                        </div>
                    </div>
                    <div class="aso-flex aso-flex-col aso-w-2/5 aso-space-y-2">
                        <label class="so-text-[12px] aso-text-[#444444]">Background color Hover Button Save</label>
                        <div class="aso-relative aso-flex">
                            <input
                                id="colorPicker"
                                type="color"
                                v-model="themes.colors.backgroundColorHoverButtonSave"
                                @input="updateHexCode10"
                                class="aso-w-9 aso-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.backgroundColorHoverButtonSave"
                                @input="updateColorFromHex10"
                                class="aso-p-1 aso-text-black aso-w-full -aso-translate-y-px"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div class="aso-bg-[#F8F9FB] aso-px-8 aso-py-8 aso-space-y-6">
                <h3 class="aso-text-[16px]">Buttons</h3>
                <div class="aso-flex aso-justify-between">
                    <div class="aso-flex aso-flex-col aso-w-2/5 aso-space-y-2">
                        <label class="aso-text-[12px] aso-text-[#444444]">color Text button</label>
                        <div class="aso-relative aso-flex">
                            <input
                                id="colorPicker"
                                type="color"
                                v-model="themes.colors.textColorButton"
                                @input="updateHexCode11"
                                class="aso-w-9 aso-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.textColorButton"
                                @input="updateColorFromHex11"
                                class="aso-p-1 aso-text-black aso-w-full -aso-translate-y-px"
                            />
                        </div>
                    </div>
                    <div class="aso-flex aso-flex-col aso-w-2/5 aso-space-y-2">
                        <label class="so-text-[12px] aso-text-[#444444]">Background Button</label>
                        <div class="aso-relative aso-flex">
                            <input
                                id="colorPicker"
                                type="color"
                                v-model="themes.colors.backgroundButton"
                                @input="updateHexCode12"
                                class="aso-w-9 aso-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.backgroundButton"
                                @input="updateColorFromHex12"
                                class="aso-p-1 aso-text-black aso-w-full -aso-translate-y-px"
                            />
                        </div>
                    </div>
                </div>
                <div class="aso-flex aso-justify-between">
                    <div class="aso-flex aso-flex-col aso-w-2/5 aso-space-y-2">
                        <label class="aso-text-[12px] aso-text-[#444444]">Color Hover text Button</label>
                        <div class="aso-relative aso-flex">
                            <input
                                id="colorPicker"
                                type="color"
                                v-model="themes.colors.textColorHoverButton"
                                @input="updateHexCode13"
                                class="aso-w-9 aso-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.textColorHoverButton"
                                @input="updateColorFromHex13"
                                class="aso-p-1 aso-text-black aso-w-full -aso-translate-y-px"
                            />
                        </div>
                    </div>
                    <div class="aso-flex aso-flex-col aso-w-2/5 aso-space-y-2">
                        <label class="so-text-[12px] aso-text-[#444444]">Background color Hover Button</label>
                        <div class="aso-relative aso-flex">
                            <input
                                id="colorPicker"
                                type="color"
                                v-model="themes.colors.backgroundColorHoverButton"
                                @input="updateHexCode14"
                                class="aso-w-9 aso-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.backgroundColorHoverButton"
                                @input="updateColorFromHex14"
                                class="aso-p-1 aso-text-black aso-w-full -aso-translate-y-px"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div class="aso-bg-[#F8F9FB] aso-px-8 aso-py-8 aso-space-y-6">
                <div class="aso-flex aso-justify-between">
                    <div class="aso-flex aso-flex-col aso-w-2/5 aso-space-y-2">
                        <label class="aso-text-[12px] aso-text-[#444444]">Color text Button Help</label>
                        <div class="aso-relative aso-flex">
                            <input
                                id="colorPicker"
                                type="color"
                                v-model="themes.colors.textColorButtonHelp"
                                @input="updateHexCode15"
                                class="aso-w-9 aso-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.textColorButtonHelp"
                                @input="updateColorFromHex15"
                                class="aso-p-1 aso-text-black aso-w-full -aso-translate-y-px"
                            />
                        </div>
                    </div>
                    <div class="aso-flex aso-flex-col aso-w-2/5 aso-space-y-2">
                        <label class="so-text-[12px] aso-text-[#444444]">Background color Button Help</label>
                        <div class="aso-relative aso-flex">
                            <input
                                id="colorPicker"
                                type="color"
                                v-model="themes.colors.backgroundColorButtonHelp"
                                @input="updateHexCode16"
                                class="aso-w-9 aso-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.backgroundColorButtonHelp"
                                @input="updateColorFromHex16"
                                class="aso-p-1 aso-text-black aso-w-full -aso-translate-y-px"
                            />
                        </div>
                    </div>
                </div>
                <div class="aso-flex aso-justify-between">
                    <div class="aso-flex aso-flex-col aso-w-2/5 aso-space-y-2">
                        <label class="aso-text-[12px] aso-text-[#444444]">Color text Hover Button Help</label>
                        <div class="aso-relative aso-flex">
                            <input
                                id="colorPicker"
                                type="color"
                                v-model="themes.colors.textColorHoverButtonHelp"
                                @input="updateHexCode17"
                                class="aso-w-9 aso-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.textColorHoverButtonHelp"
                                @input="updateColorFromHex17"
                                class="aso-p-1 aso-text-black aso-w-full -aso-translate-y-px"
                            />
                        </div>
                    </div>
                    <div class="aso-flex aso-flex-col aso-w-2/5 aso-space-y-2">
                        <label class="so-text-[12px] aso-text-[#444444]">Background color Hover Button Help</label>
                        <div class="aso-relative aso-flex">
                            <input
                                id="colorPicker"
                                type="color"
                                v-model="themes.colors.backgroundColorHoverButtonHelp"
                                @input="updateHexCode18"
                                class="aso-w-9 aso-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.backgroundColorHoverButtonHelp"
                                @input="updateColorFromHex18"
                                class="aso-p-1 aso-text-black aso-w-full -aso-translate-y-px"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div class="aso-bg-[#F8F9FB] aso-px-8 aso-py-8 aso-space-y-6">
                
                
                <div class="aso-flex aso-justify-between">
                    <div class="aso-flex aso-flex-col aso-w-2/5 aso-space-y-2">
                        <label class="aso-text-[12px] aso-text-[#444444]">Color text Button Restart All</label>
                        <div class="aso-relative aso-flex">
                            <input
                                id="colorPicker"
                                type="color"
                                v-model="themes.colors.textColorButtonRestartAll"
                                @input="updateHexCode19"
                                class="aso-w-9 aso-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.textColorButtonRestartAll"
                                @input="updateColorFromHex19"
                                class="aso-p-1 aso-text-black aso-w-full -aso-translate-y-px"
                            />
                        </div>
                    </div>
                    <div class="aso-flex aso-flex-col aso-w-2/5 aso-space-y-2">
                        <label class="so-text-[12px] aso-text-[#444444]">Background color Button Restart All</label>
                        <div class="aso-relative aso-flex">
                            <input
                                id="colorPicker"
                                type="color"
                                v-model="themes.colors.backgroundColorButtonRestartAll"
                                @input="updateHexCode20"
                                class="aso-w-9 aso-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.backgroundColorButtonRestartAll"
                                @input="updateColorFromHex20"
                                class="aso-p-1 aso-text-black aso-w-full -aso-translate-y-px"
                            />
                        </div>
                    </div>
                </div>
                <div class="aso-flex aso-justify-between">
                    <div class="aso-flex aso-flex-col aso-w-2/5 aso-space-y-2">
                        <label class="aso-text-[12px] aso-text-[#444444]">Color text Hover Button RestartAll</label>
                        <div class="aso-relative aso-flex">
                            <input
                                id="colorPicker"
                                type="color"
                                v-model="themes.colors.textColorHoverButtonRestartAll"
                                @input="updateHexCode21"
                                class="aso-w-9 aso-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.textColorHoverButtonRestartAll"
                                @input="updateColorFromHex21"
                                class="aso-p-1 aso-text-black aso-w-full -aso-translate-y-px"
                            />
                        </div>
                    </div>
                    <div class="aso-flex aso-flex-col aso-w-2/5 aso-space-y-2">
                        <label class="so-text-[12px] aso-text-[#444444]">Background color Hover Button RestartAll</label>
                        <div class="aso-relative aso-flex">
                            <input
                                id="colorPicker"
                                type="color"
                                v-model="themes.colors.backgroundColorHoverButtonRestartAll"
                                @input="updateHexCode22"
                                class="aso-w-9 aso-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.backgroundColorHoverButtonRestartAll"
                                @input="updateColorFromHex22"
                                class="aso-p-1 aso-text-black aso-w-full -aso-translate-y-px"
                            />
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
        <div class="aso-bg-[#F8F9FB] aso-flex aso-space-x-4 aso-px-4 aso-py-3 aso-justify-end aso-items-end">
            <div class="aso-bg-[#016464] aso-rounded">
                <button :disabled="isLoading" @click="updateThemesSettings" class="aso-rounded aso-flex aso-bg-transparent aso-w-fit aso-space-x-2 aso-h-fit aso-text-white aso-px-12 aso-p-2.5 aso-border-none aso-opacity-90 hover:aso-opacity-100 hover:aso-border-none hover:aso-text-white hover:aso-bg-[#016464] aso-cursor-pointeraso-flex aso-bg-transparent aso-w-fit aso-space-x-2 aso-h-fit aso-text-white aso-px-12 aso-p-2.5 aso-border-none aso-opacity-90 hover:aso-opacity-100 hover:aso-border-none hover:aso-text-white hover:aso-bg-[#016464] aso-cursor-pointer">
                    <img src="../../../../../../assets/icons/ic_loading_gray.svg" class="aso-w-5 aso-w-5" v-if="isLoading" />
                    <div class="aso-font-semibold aso-text-[16px]">Save</div>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import api from '@/admin/Api/api';
import {ref, onMounted} from 'vue';
import { useRoute } from 'vue-router';
import toastMessage from '@/admin/utils/functions';

const route = useRoute();
const configId = ref(route.params.configId);
const isFetching = ref(false);
const isLoading =ref(false);
const themes = ref({
    skin:"default",
    colors: {
        textColorContentHeader:'#000000',
        backgroundColorHeader:'#000000',
        textColorContentSideMenu:'#000000',
        backgroundColorHeaderContentSide:'#000000',
        textColorOptionsMenu:'#000000',
        backgroundColorOptionsMenu:'#000000',
        textColorButtonSave:'#000000',
        backgroundColorTextButtonSave:'#000000',
        textColorHoverButtonSave:'#000000',
        backgroundColorHoverButtonSave:'#000000',
        textColorButton:'#000000',
        backgroundButton:'#000000',
        textColorHoverButton:'#000000',
        backgroundColorHoverButton:'#000000',
        textColorButtonHelp:'#000000',
        backgroundColorButtonHelp:'#000000',
        textColorHoverButtonHelp:'#000000',
        backgroundColorHoverButtonHelp:'#000000',
        textColorHoverButtonRestartAll:'#000000',
        backgroundColorHoverButtonRestartAll:'#000000',
        textColorButtonRestartAll:'#000000',
        backgroundColorButtonRestartAll:'#000000',
    }
});
onMounted(async() => {
    isFetching.value = true;
    await fetchThemesSettings();
    isFetching.value = false
});
const fetchThemesSettings = async () => {
    const result = await api.getThemesSettings(configId.value);
    if(!result.message){
        themes.value = result;
    }
}
const updateThemesSettings = async () => {
    isLoading.value = true;
    const result = await api.updateThemes(configId.value,themes.value);
    if(result.success){
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

const textColorContentHeader = ref('#000000');

const updateHexCode1 = () => {
    textColorContentHeader.value = event.target.value;
};

const updateColorFromHex1 = () => {
  if (textColorContentHeader.value[0] !== '#') {
    textColorContentHeader.value = '#' + textColorContentHeader.value;
  }
};

const backgroundColorHeader = ref('#000000');

const updateHexCode2 = () => {
    backgroundColorHeader.value = event.target.value;
};

const updateColorFromHex2 = () => {
  if (backgroundColorHeader.value[0] !== '#') {
    backgroundColorHeader.value = '#' + backgroundColorHeader.value;
  }
};


const textColorContentSideMenu = ref('#000000');

const updateHexCode3 = () => {
    textColorContentSideMenu.value = event.target.value;
};

const updateColorFromHex3 = () => {
  if (textColorContentSideMenu.value[0] !== '#') {
    textColorContentSideMenu.value = '#' + textColorContentSideMenu.value;
  }
};
const backgroundColorHeaderContentSide = ref('#000000');

const updateHexCode4 = () => {
    backgroundColorHeaderContentSide.value = event.target.value;
};

const updateColorFromHex4 = () => {
  if (backgroundColorHeaderContentSide.value[0] !== '#') {
    backgroundColorHeaderContentSide.value = '#' + backgroundColorHeaderContentSide.value;
  }
};

const textColorOptionsMenu = ref('#000000');

const updateHexCode5 = () => {
    textColorOptionsMenu.value = event.target.value;
};

const updateColorFromHex5 = () => {
  if (textColorOptionsMenu.value[0] !== '#') {
    textColorOptionsMenu.value = '#' + textColorOptionsMenu.value;
  }
};
const backgroundColorOptionsMenu = ref('#000000');

const updateHexCode6 = () => {
    backgroundColorOptionsMenu.value = event.target.value;
};

const updateColorFromHex6 = () => {
  if (backgroundColorOptionsMenu.value[0] !== '#') {
    backgroundColorOptionsMenu.value = '#' + backgroundColorOptionsMenu.value;
  }
};

const textColorButtonSave = ref('#000000');

const updateHexCode7 = () => {
    textColorButtonSave.value = event.target.value;
};

const updateColorFromHex7 = () => {
  if (textColorButtonSave.value[0] !== '#') {
    textColorButtonSave.value = '#' + textColorButtonSave.value;
  }
};
const backgroundColorTextButtonSave = ref('#000000');

const updateHexCode8 = () => {
    backgroundColorTextButtonSave.value = event.target.value;
};

const updateColorFromHex8 = () => {
  if (backgroundColorTextButtonSave.value[0] !== '#') {
    backgroundColorTextButtonSave.value = '#' + backgroundColorTextButtonSave.value;
  }
};

const textColorHoverButtonSave = ref('#000000');

const updateHexCode9 = () => {
    textColorHoverButtonSave.value = event.target.value;
};

const updateColorFromHex9 = () => {
  if (textColorHoverButtonSave.value[0] !== '#') {
    textColorHoverButtonSave.value = '#' + textColorHoverButtonSave.value;
  }
};
const backgroundColorHoverButtonSave = ref('#000000');

const updateHexCode10 = () => {
    backgroundColorHoverButtonSave.value = event.target.value;
};

const updateColorFromHex10 = () => {
  if (backgroundColorHoverButtonSave.value[0] !== '#') {
    backgroundColorHoverButtonSave.value = '#' + backgroundColorHoverButtonSave.value;
  }
};
const textColorButton = ref('#000000');

const updateHexCode11 = () => {
    textColorButton.value = event.target.value;
};

const updateColorFromHex11 = () => {
  if (textColorButton.value[0] !== '#') {
    textColorButton.value = '#' + textColorButton.value;
  }
};
const backgroundButton = ref('#000000');

const updateHexCode12 = () => {
    backgroundButton.value = event.target.value;
};

const updateColorFromHex12 = () => {
  if (backgroundButton.value[0] !== '#') {
    backgroundButton.value = '#' + backgroundButton.value;
  }
};
const textColorHoverButton = ref('#000000');

const updateHexCode13 = () => {
    textColorHoverButton.value = event.target.value;
};

const updateColorFromHex13 = () => {
  if (textColorHoverButton.value[0] !== '#') {
    textColorHoverButton.value = '#' + textColorHoverButton.value;
  }
};
const backgroundColorHoverButton = ref('#000000');

const updateHexCode14 = () => {
    backgroundColorHoverButton.value = event.target.value;
};

const updateColorFromHex14 = () => {
  if (backgroundColorHoverButton.value[0] !== '#') {
    backgroundColorHoverButton.value = '#' + backgroundColorHoverButton.value;
  }
};

const textColorButtonHelp = ref('#000000');

const updateHexCode15 = () => {
    textColorButtonHelp.value = event.target.value;
};

const updateColorFromHex15 = () => {
  if (textColorButtonHelp.value[0] !== '#') {
    textColorButtonHelp.value = '#' + textColorButtonHelp.value;
  }
};
const backgroundColorButtonHelp = ref('#000000');

const updateHexCode16 = () => {
    backgroundColorButtonHelp.value = event.target.value;
};

const updateColorFromHex16 = () => {
  if (backgroundColorButtonHelp.value[0] !== '#') {
    backgroundColorButtonHelp.value = '#' + backgroundColorButtonHelp.value;
  }
};
const textColorHoverButtonHelp = ref('#000000');

const updateHexCode17 = () => {
    textColorHoverButtonHelp.value = event.target.value;
};

const updateColorFromHex17 = () => {
  if (textColorHoverButtonHelp.value[0] !== '#') {
    textColorHoverButtonHelp.value = '#' + textColorHoverButtonHelp.value;
  }
};
const backgroundColorHoverButtonHelp = ref('#000000');

const updateHexCode18 = () => {
    backgroundColorHoverButtonHelp.value = event.target.value;
};

const updateColorFromHex18 = () => {
  if (backgroundColorHoverButtonHelp.value[0] !== '#') {
    backgroundColorHoverButtonHelp.value = '#' + backgroundColorHoverButtonHelp.value;
  }
};

const textColorButtonRestartAll = ref('#000000');

const updateHexCode19 = () => {
    textColorButtonRestartAll.value = event.target.value;
};

const updateColorFromHex19 = () => {
  if (textColorButtonRestartAll.value[0] !== '#') {
    textColorButtonRestartAll.value = '#' + textColorButtonRestartAll.value;
  }
};
const backgroundColorButtonRestartAll = ref('#000000');

const updateHexCode20 = () => {
    backgroundColorButtonRestartAll.value = event.target.value;
};

const updateColorFromHex20 = () => {
  if (backgroundColorButtonRestartAll.value[0] !== '#') {
    backgroundColorButtonRestartAll.value = '#' + backgroundColorButtonRestartAll.value;
  }
};
const textColorHoverButtonRestartAll = ref('#000000');

const updateHexCode21 = () => {
    textColorHoverButtonRestartAll.value = event.target.value;
};

const updateColorFromHex21 = () => {
  if (textColorHoverButtonRestartAll.value[0] !== '#') {
    textColorHoverButtonRestartAll.value = '#' + textColorHoverButtonRestartAll.value;
  }
};
const backgroundColorHoverButtonRestartAll = ref('#000000');

const updateHexCode22 = () => {
    backgroundColorHoverButtonRestartAll.value = event.target.value;
};

const updateColorFromHex22 = () => {
  if (backgroundColorHoverButtonRestartAll.value[0] !== '#') {
    backgroundColorHoverButtonRestartAll.value = '#' + backgroundColorHoverButtonRestartAll.value;
  }
};
</script>