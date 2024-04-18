<template>
    <div v-if="isFetching" class="aso-bg-white aso-border-solid aso-border aso-border-[#D1D1D1] aso-flex aso-flex-col aso-space-y-2 aso-justify-center aso-items-center aso-w-full aso-h-[306px] p-4">
        <img class="aso-w-[200px] aso-h-[200px]" src="../../../../../../assets/icons/ic_loading.svg" alt="">
    </div>
    <div v-if="!isFetching">
        <div class="aso-space-y-1">
            <div class="aso-bg-[#F8F9FB] aso-px-8 aso-py-8 aso-space-y-6">
                <h3 class="aso-text-[16px]">Choose your customizer appearance</h3>
                <div class="aso-p-6">
                    <div class="aso-grid aso-grid-cols-2 aso-gap-6">
                        <div class="aso-flex-col aso-space-y-4 aso-px-2 aso-rounded" :class="themes.skin == 'default' ? 'aso-ring-2 aso-ring-[#016464]' : ''">
                            <input type="radio" id="default" name="skin" value="default" v-model="themes.skin" class="aso-invisible">
                            <label for="default">
                                <div class="aso-w-full aso-h-[300px] aso-relative">
                                    <img src="../../../../../../assets/images/skin-default.png" alt="Image 1" class="aso-w-full aso-h-full aso-cursor-pointer aso-absolute">
                                </div>
                                <div class="aso-flex aso-items-center aso-justify-between aso-bg-white aso-rounded-b">
                                   <label for="default" class="aso-text-base aso-font-semibold aso-text-black">Default skin</label>
                                    <input type="radio" id="default" name="skin" value="default" v-model="themes.skin" :checked="themes.skin == 'default'">
                                </div>
                            </label>
                        </div>
                        <div class="aso-flex-col aso-space-y-4 aso-px-2 aso-rounded" :class="themes.skin == 'couffo' ? 'aso-ring-2 aso-ring-[#016464]' : ''">
                            <input type="radio" id="couffo" name="skin" value="couffo" v-model="themes.skin" class="aso-invisible">
                            <label for="couffo">
                                <div class="aso-w-full aso-h-[300px] aso-relative">
                                    <img src="../../../../../../assets/images/skin-couffo.png" alt="Image 1" class="aso-w-full aso-h-full aso-cursor-pointer aso-absolute">
                                </div>
                                <div class="aso-flex aso-items-center aso-justify-between aso-bg-white aso-rounded-b">
                                    <label for="couffo" class="aso-text-base aso-font-semibold aso-text-black">Couffo Skin</label>
                                    <input type="radio" id="couffo" name="skin" value="couffo" v-model="themes.skin" :checked="themes.skin == 'couffo'">
                                </div>
                            </label>
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
                                v-model="themes.colors.textColorContentHeader"
                                @input="updateTextColorContentHeaderCodeHex"
                                class="aso-w-9 aso-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.textColorContentHeader"
                                @input="updateTextColorContentHeaderCodeHex"
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
                                v-model="themes.colors.backgroundColorHeader"
                                @input="updateBackgroundColorHeaderCodeHex"
                                class="aso-w-9 aso-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.backgroundColorHeader"
                                @input="updateBackgroundColorHeaderCodeHex"
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
                                @input="updateTextColorContentSideMenuCodeHex"
                                class="aso-w-9 aso-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.textColorContentSideMenu"
                                @input="updateTextColorContentSideMenuCodeHex"
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
                                v-model="themes.colors.backgroundColorContentSide"
                                @input="updatebackgroundColorContentSideCodeHex"
                                class="aso-w-9 aso-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.backgroundColorContentSide"
                                @input="updatebackgroundColorContentSideCodeHex"
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
                                @input="updateTextColorOptionsMenuCodeHex"
                                class="aso-w-9 aso-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.textColorOptionsMenu"
                                @input="updateTextColorOptionsMenuCodeHex"
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
                                @input="updateBackgroundColorOptionsMenuCodeHex"
                                class="aso-w-9 aso-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.backgroundColorOptionsMenu"
                                @input="updateBackgroundColorOptionsMenuCodeHex"
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
                                @input="updateTextColorButtonSaveCodeHex"
                                class="aso-w-9 aso-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.textColorButtonSave"
                                @input="updateTextColorButtonSaveCodeHex"
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
                                @input="updateBackgroundColorTextButtonSaveCodeHex"
                                class="aso-w-9 aso-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.backgroundColorTextButtonSave"
                                @input="updateBackgroundColorTextButtonSaveCodeHex"
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
                                @input="updateTextColorHoverButtonSaveCodeHex"
                                class="aso-w-9 aso-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.textColorHoverButtonSave"
                                @input="updateTextColorHoverButtonSaveCodeHex"
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
                                @input="updateBackgroundColorHoverButtonSaveCodeHex"
                                class="aso-w-9 aso-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.backgroundColorHoverButtonSave"
                                @input="updateBackgroundColorHoverButtonSaveCodeHex"
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
                                @input="updateTextColorButtonCodeHex"
                                class="aso-w-9 aso-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.textColorButton"
                                @input="updateTextColorButtonCodeHex"
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
                                @input="updateBackgroundButtonCodeHex"
                                class="aso-w-9 aso-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.backgroundButton"
                                @input="updateBackgroundButtonCodeHex"
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
                                @input="updateTextColorHoverButtonCodeHex"
                                class="aso-w-9 aso-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.textColorHoverButton"
                                @input="updateTextColorHoverButtonCodeHex"
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
                                @input="updateBackgroundColorHoverButtonCodeHex"
                                class="aso-w-9 aso-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.backgroundColorHoverButton"
                                @input="updateBackgroundColorHoverButtonCodeHex"
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
                                @input="updateTextColorButtonHelpCodeHex"
                                class="aso-w-9 aso-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.textColorButtonHelp"
                                @input="updateTextColorButtonHelpCodeHex"
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
                                @input="updateBackgroundColorButtonHelpCodeHex"
                                class="aso-w-9 aso-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.backgroundColorButtonHelp"
                                @input="updateBackgroundColorButtonHelpCodeHex"
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
                                @input="updateTextColorHoverButtonHelpCodeHex"
                                class="aso-w-9 aso-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.textColorHoverButtonHelp"
                                @input="updateTextColorHoverButtonHelpCodeHex"
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
                                @input="updateBackgroundColorHoverButtonHelpCodeHex"
                                class="aso-w-9 aso-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.backgroundColorHoverButtonHelp"
                                @input="updateBackgroundColorHoverButtonHelpCodeHex"
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
                                @input="updateTextColorButtonRestartAllCodeHex"
                                class="aso-w-9 aso-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.textColorButtonRestartAll"
                                @input="updateTextColorButtonRestartAllCodeHex"
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
                                @input="updateBackgroundColorButtonRestartAllCodeHex"
                                class="aso-w-9 aso-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.backgroundColorButtonRestartAll"
                                @input="updateBackgroundColorButtonRestartAllCodeHex"
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
                                @input="updateTextColorHoverButtonRestartAllCodeHex"
                                class="aso-w-9 aso-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.textColorHoverButtonRestartAll"
                                @input="updateTextColorHoverButtonRestartAllCodeHex"
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
                                @input="updateBackgroundColorHoverButtonRestartAllCodeHex"
                                class="aso-w-9 aso-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.backgroundColorHoverButtonRestartAll"
                                @input="updateBackgroundColorHoverButtonRestartAllCodeHex"
                                class="aso-p-1 aso-text-black aso-w-full -aso-translate-y-px"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div class="aso-bg-[#F8F9FB] aso-px-8 aso-py-8 aso-space-y-6">
                
                
                <div class="aso-flex aso-justify-between">
                    <div class="aso-flex aso-flex-col aso-w-2/5 aso-space-y-2">
                        <label class="aso-text-[12px] aso-text-[#444444]">Color text Button Finish</label>
                        <div class="aso-relative aso-flex">
                            <input
                                id="colorPicker"
                                type="color"
                                v-model="themes.colors.textColorButtonFinish"
                                @input="updateTextColorButtonFinishCodeHex"
                                class="aso-w-9 aso-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.textColorButtonFinish"
                                @input="updateTextColorButtonFinishCodeHex"
                                class="aso-p-1 aso-text-black aso-w-full -aso-translate-y-px"
                            />
                        </div>
                    </div>
                    <div class="aso-flex aso-flex-col aso-w-2/5 aso-space-y-2">
                        <label class="so-text-[12px] aso-text-[#444444]">Background color Button Finish</label>
                        <div class="aso-relative aso-flex">
                            <input
                                id="colorPicker"
                                type="color"
                                v-model="themes.colors.backgroundColorButtonFinish"
                                @input="updateBackgroundColorButtonFinishCodeHex"
                                class="aso-w-9 aso-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.backgroundColorButtonFinish"
                                @input="updateBackgroundColorButtonFinishCodeHex"
                                class="aso-p-1 aso-text-black aso-w-full -aso-translate-y-px"
                            />
                        </div>
                    </div>
                </div>
                <div class="aso-flex aso-justify-between">
                    <div class="aso-flex aso-flex-col aso-w-2/5 aso-space-y-2">
                        <label class="aso-text-[12px] aso-text-[#444444]">Color text Hover Button Finish</label>
                        <div class="aso-relative aso-flex">
                            <input
                                id="colorPicker"
                                type="color"
                                v-model="themes.colors.textColorHoverButtonFinish"
                                @input="updateTextColorHoverButtonFinishCodeHex"
                                class="aso-w-9 aso-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.textColorHoverButtonFinish"
                                @input="updateTextColorHoverButtonFinishCodeHex"
                                class="aso-p-1 aso-text-black aso-w-full -aso-translate-y-px"
                            />
                        </div>
                    </div>
                    <div class="aso-flex aso-flex-col aso-w-2/5 aso-space-y-2">
                        <label class="so-text-[12px] aso-text-[#444444]">Background color Hover Button Finish</label>
                        <div class="aso-relative aso-flex">
                            <input
                                id="colorPicker"
                                type="color"
                                v-model="themes.colors.backgroundColorHoverButtonFinish"
                                @input="updateBackgroundColorHoverButtonFinishCodeHex"
                                class="aso-w-9 aso-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.backgroundColorHoverButtonFinish"
                                @input="updateBackgroundColorHoverButtonFinishCodeHex"
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
        backgroundColorContentSide:'#000000',
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
        textColorButtonFinish:'#000000',
        backgroundColorButtonFinish:'#000000',
        textColorHoverButtonFinish:'#000000',
        backgroundColorHoverButtonFinish:'#000000',
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

const updateTextColorContentHeaderCodeHex = (event) => {
    if(event.target.value[0]!=='#'){
        event.target.value = '#'+ event.target.value;
    }
    themes.value.colors.textColorContentHeader = event.target.value;
}
const updateBackgroundColorHeaderCodeHex = (event) => {
    if(event.target.value[0]!=='#'){
        event.target.value = '#'+ event.target.value;
    }
    themes.value.colors.backgroundColorHeader = event.target.value;
}
const updateTextColorContentSideMenuCodeHex = (event) => {
    if(event.target.value[0]!=='#'){
        event.target.value = '#'+ event.target.value;
    }
    themes.value.colors.textColorContentSideMenu = event.target.value;
}
const updatebackgroundColorContentSideCodeHex = (event) => {
    if(event.target.value[0]!=='#'){
        event.target.value = '#'+ event.target.value;
    }
    themes.value.colors.backgroundColorContentSide = event.target.value;
}
const updateTextColorOptionsMenuCodeHex = (event) => {
    if(event.target.value[0]!=='#'){
        event.target.value = '#'+ event.target.value;
    }
    themes.value.colors.textColorOptionsMenu = event.target.value;
}
const updateBackgroundColorOptionsMenuCodeHex = (event) => {
    if(event.target.value[0]!=='#'){
        event.target.value = '#'+ event.target.value;
    }
    themes.value.colors.backgroundColorOptionsMenu = event.target.value;
}
const updateTextColorButtonSaveCodeHex = (event) => {
    if(event.target.value[0]!=='#'){
        event.target.value = '#'+ event.target.value;
    }
    themes.value.colors.textColorButtonSave = event.target.value;
}
const updateBackgroundColorTextButtonSaveCodeHex = (event) => {
    if(event.target.value[0]!=='#'){
        event.target.value = '#'+ event.target.value;
    }
    themes.value.colors.backgroundColorTextButtonSave = event.target.value;
}
const updateTextColorHoverButtonSaveCodeHex = (event) => {
    if(event.target.value[0]!=='#'){
        event.target.value = '#'+ event.target.value;
    }
    themes.value.colors.textColorHoverButtonSave = event.target.value;
}
const updateBackgroundColorHoverButtonSaveCodeHex = (event) => {
    if(event.target.value[0]!=='#'){
        event.target.value = '#'+ event.target.value;
    }
    themes.value.colors.backgroundColorHoverButtonSave = event.target.value;
}
const updateTextColorButtonCodeHex = (event) => {
    if(event.target.value[0]!=='#'){
        event.target.value = '#'+ event.target.value;
    }
    themes.value.colors.textColorButton = event.target.value;
}
const updateBackgroundButtonCodeHex = (event) => {
    if(event.target.value[0]!=='#'){
        event.target.value = '#'+ event.target.value;
    }
    themes.value.colors.backgroundButton = event.target.value;
}
const updateTextColorHoverButtonCodeHex = (event) => {
    if(event.target.value[0]!=='#'){
        event.target.value = '#'+ event.target.value;
    }
    themes.value.colors.textColorHoverButton = event.target.value;
}
const updateBackgroundColorHoverButtonCodeHex = (event) => {
    if(event.target.value[0]!=='#'){
        event.target.value = '#'+ event.target.value;
    }
    themes.value.colors.backgroundColorHoverButton = event.target.value;
}
const updateTextColorButtonHelpCodeHex = (event) => {
    if(event.target.value[0]!=='#'){
        event.target.value = '#'+ event.target.value;
    }
    themes.value.colors.textColorButtonHelp = event.target.value;
}
const updateBackgroundColorButtonHelpCodeHex = (event) => {
    if(event.target.value[0]!=='#'){
        event.target.value = '#'+ event.target.value;
    }
    themes.value.colors.backgroundColorButtonHelp = event.target.value;
}
const updateTextColorHoverButtonHelpCodeHex = (event) => {
    if(event.target.value[0]!=='#'){
        event.target.value = '#'+ event.target.value;
    }
    themes.value.colors.textColorHoverButtonHelp = event.target.value;
}
const updateBackgroundColorHoverButtonHelpCodeHex = (event) => {
    if(event.target.value[0]!=='#'){
        event.target.value = '#'+ event.target.value;
    }
    themes.value.colors.backgroundColorHoverButtonHelp = event.target.value;
}
const updateBackgroundColorButtonRestartAllCodeHex = (event) => {
    if(event.target.value[0]!=='#'){
        event.target.value = '#'+ event.target.value;
    }
    themes.value.colors.backgroundColorButtonRestartAll = event.target.value;
}

const updateTextColorHoverButtonRestartAllCodeHex = (event) => {
    if(event.target.value[0]!=='#'){
        event.target.value = '#'+ event.target.value;
    }
    themes.value.colors.textColorHoverButtonRestartAll = event.target.value;
}
const updateBackgroundColorHoverButtonRestartAllCodeHex = (event) => {
    if(event.target.value[0]!=='#'){
        event.target.value = '#'+ event.target.value;
    }
    themes.value.colors.backgroundColorHoverButtonRestartAll = event.target.value;
}

const updateTextColorButtonRestartAllCodeHex = (event) => {
    if(event.target.value[0]!=='#'){
        event.target.value = '#'+ event.target.value;
    }
    themes.value.colors.textColorButtonRestartAll = event.target.value;
}

const updateTextColorButtonFinishCodeHex = (event) => {
    if(event.target.value[0]!=='#'){
        event.target.value = '#'+ event.target.value;
    }
    themes.value.colors.textColorButtonFinish = event.target.value;
}
const updateTextColorHoverButtonFinishCodeHex = (event) => {
    if(event.target.value[0]!=='#'){
        event.target.value = '#'+ event.target.value;
    }
    themes.value.colors.textColorHoverButtonFinish = event.target.value;
}
const updateBackgroundColorButtonFinishCodeHex = (event) => {
    if(event.target.value[0]!=='#'){
        event.target.value = '#'+ event.target.value;
    }
    themes.value.colors.backgroundColorButtonFinish = event.target.value;
}
const updateBackgroundColorHoverButtonFinishCodeHex = (event) => {
    if(event.target.value[0]!=='#'){
        event.target.value = '#'+ event.target.value;
    }
    themes.value.colors.backgroundColorHoverButtonFinish = event.target.value;
}

</script>
