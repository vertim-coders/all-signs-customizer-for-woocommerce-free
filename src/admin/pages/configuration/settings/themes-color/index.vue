<template>
    <div v-if="!isFetching" class="aso-space-y-1 aso-sticky aso-top-[124px] aso-z-[9999] aso-w-full aso-shadow-md aso-flex aso-justify-center aso-items-center aso-bg-[#F4F4F4] aso-translate-y-2">
        <div class="aso-bg-[#F4F4F4] aso-p-2 aso-space-x-6 aso-justify-center aso-items-center aso-flex">
            <button @click="state='skins'" :class="`aso-flex aso-text-[12px] aso-px-6 aso-p-2 aso-w-fit aso-h-fit aso-bg-white aso-rounded aso-border-none aso-text-black aso-font-semibold ${ state == 'skins' ?'aso-font-bold aso-text-[#016464] aso-bg-[#E1E1E1]':''} hover:aso-bg-[#E1E1E1] hover:aso-text-[#016464] aso-cursor-pointer`" >Choose Skin</button>
            <button @click="state='colors'" :class="`aso-flex aso-text-[12px] aso-px-6 aso-p-2 aso-w-fit aso-h-fit aso-bg-white aso-rounded aso-border-none aso-text-black aso-font-semibold ${ state == 'colors' ?'aso-font-bold aso-text-[#016464] aso-bg-[#E1E1E1]':''} hover:aso-bg-[#E1E1E1] hover:aso-text-[#016464] aso-cursor-pointer`" >Colors</button>
            <button @click="state='custom'" :class="`aso-flex aso-text-[12px] aso-px-6 aso-p-2 aso-w-fit aso-h-fit aso-bg-white aso-rounded aso-border-none aso-text-black aso-font-semibold ${ state == 'custom' ?'aso-font-bold aso-text-[#016464] aso-bg-[#E1E1E1]':''} hover:aso-bg-[#E1E1E1] hover:aso-text-[#016464] aso-cursor-pointer`" >Custom CSS</button>
        </div>
    </div>
    <div v-if="isFetching" class="aso-bg-white aso-border-solid aso-border aso-border-[#D1D1D1] aso-flex aso-flex-col aso-space-y-2 aso-justify-center aso-items-center aso-w-full aso-h-[306px] p-4">
        <img class="aso-w-[200px] aso-h-[200px]" src="../../../../../../assets/icons/ic_loading.svg" alt="">
    </div>
    <div v-if="!isFetching">
        <div class="" v-show="state=='skins'">
            <div class="aso-bg-[#F8F9FB] aso-px-8 aso-py-8 aso-space-y-6">
                <h3 class="aso-text-[16px]">Choose your customizer appearance</h3>
                <div class="aso-p-6">
                    <div class="aso-flex aso-justify-evenly aso-items-center">
                        <div class="aso-flex-col aso-space-y-4 aso-px-2 aso-rounded aso-w-[320px]" :class="themes.skin == 'default' ? 'aso-ring-2 aso-ring-[#016464]' : ''">
                            <input type="radio" id="default" name="skin" value="default" v-model="themes.skin" class="aso-invisible">
                            <label for="default">
                                <div class="aso-w-full aso-h-[200px] aso-relative aso-flex aso-justify-center aso-items-center">
                                    <img src="../../../../../../assets/images/skin-default.png" alt="Image 1" class="aso-w-auto aso-h-full aso-cursor-pointer aso-absolute">
                                </div>
                                <div class="aso-flex aso-items-center aso-justify-between aso-bg-white aso-rounded-b">
                                   <label for="default" class="aso-text-base aso-font-semibold aso-text-black">Default skin</label>
                                    <input type="radio" id="default" name="skin-1" value="default" v-model="themes.skin" :checked="themes.skin == 'default'">
                                </div>
                            </label>
                        </div>
                        <div class="aso-flex-col aso-space-y-4 aso-px-2 aso-rounded aso-w-[320px]" :class="themes.skin == 'couffo' ? 'aso-ring-2 aso-ring-[#016464]' : ''">
                            <input type="radio" id="couffo" name="skin" value="couffo" v-model="themes.skin" class="aso-invisible">
                            <label for="couffo">
                                <div class="aso-w-full aso-h-[200px] aso-relative aso-flex aso-justify-center aso-items-center">
                                    <img src="../../../../../../assets/images/skin-couffo.png" alt="Image 1" class="aso-w-auto aso-h-full aso-cursor-pointer aso-absolute">
                                </div>
                                <div class="aso-flex aso-items-center aso-justify-between aso-bg-white aso-rounded-b">
                                    <label for="couffo" class="aso-text-base aso-font-semibold aso-text-black">Couffo Skin</label>
                                    <input type="radio" id="couffo" name="skin-2" value="couffo" v-model="themes.skin" :checked="themes.skin == 'couffo'">
                                </div>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-show="state=='colors'" class="aso-bg-[#F8F9FB] aso-py-6">
            <div class="aso-bg-[#F8F9FB] aso-px-8 aso-pt-8 aso-space-y-6 aso-relative" >
                <div class="aso-flex aso-space-x-4">
                    <h2 class="aso-text-[15px] aso-font-bold">Canvas{{ themes.skin == "default" ? ', Header and Side Bars' : ', Header and Bottom Bars' }}</h2>
                </div>
                <div class="aso-flex aso-justify-between" v-show="dropdownColorsSections['canvas']">
                    <div class="aso-flex aso-flex-col aso-w-2/5 aso-space-y-2">
                        <label class="aso-text-[12px] aso-text-[#444444]">Canvas Background Color</label>
                        <div class="aso-relative aso-flex">
                            <input
                                id="colorPicker"
                                type="color"
                                v-model="themes.colors.canvas.backgroundColor"
                                @input="updateCanvasBackgroundColorCodeHex"
                                class="aso-w-9 aso-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.canvas.backgroundColor"
                                @input="updateCanvasBackgroundColorCodeHex"
                                class="aso-p-1 aso-text-black aso-w-full aso-translate-y-0"
                            />
                        </div>
                    </div>
                    <div class="aso-flex aso-flex-col aso-w-2/5 aso-space-y-2">
                        <label class="aso-text-[12px] aso-text-[#444444]">Canvas Border Color</label>
                        <div class="aso-relative aso-flex">
                            <input
                                id="colorPicker"
                                type="color"
                                v-model="themes.colors.canvas.borderColor"
                                @input="updateCanvasBorderColorCodeHex"
                                class="aso-w-9 aso-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.canvas.borderColor"
                                @input="updateCanvasBorderColorCodeHex"
                                class="aso-p-1 aso-text-black aso-w-full aso-translate-y-0"
                            />
                        </div>
                    </div>
                </div>
                <div class="aso-flex aso-justify-between" v-show="dropdownColorsSections['canvas']">
                    <div class="aso-flex aso-flex-col aso-w-2/5 aso-space-y-2">
                        <label class="aso-text-[12px] aso-text-[#444444]">Bars Background Color</label>
                        <div class="aso-relative aso-flex">
                            <input
                                id="colorPicker"
                                type="color"
                                v-model="themes.colors.bars.backgroundColor"
                                @input="updateBarsBackgroundColorCodeHex"
                                class="aso-w-9 aso-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.bars.backgroundColor"
                                @input="updateBarsBackgroundColorCodeHex"
                                class="aso-p-1 aso-text-black aso-w-full aso-translate-y-0"
                            />
                        </div>
                    </div>
                    <div class="aso-flex aso-flex-col aso-w-2/5 aso-space-y-2">
                        <label class="aso-text-[12px] aso-text-[#444444]">Bars Title Color</label>
                        <div class="aso-relative aso-flex">
                            <input
                                id="colorPicker"
                                type="color"
                                v-model="themes.colors.bars.titleColor"
                                @input="updateBarsTitleColorCodeHex"
                                class="aso-w-9 aso-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.bars.titleColor"
                                @input="updateBarsTitleColorCodeHex"
                                class="aso-p-1 aso-text-black aso-w-full aso-translate-y-0"
                            />
                        </div>
                    </div>
                </div>
                <div v-if="dropdownColorsSections['canvas']" @click="dropdownColorsSections['canvas']=false" class="aso-flex aso-absolute aso-justify-center aso-items-center  aso-my-0 aso-right-8 aso-top-0 aso-shadow-md aso-rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="aso-w-6 aso-h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 18.75 7.5-7.5 7.5 7.5" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 7.5-7.5 7.5 7.5" />
                    </svg>
                </div>
                <div v-if="!dropdownColorsSections['canvas']" @click="dropdownColorsSections['canvas']=true" class="aso-flex aso-absolute aso-justify-center aso-items-center  aso-my-0 aso-right-8 aso-top-0 aso-shadow-md aso-rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="aso-w-6 aso-h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5" />
                    </svg>
                </div>
            </div>
            <div class="aso-bg-[#F8F9FB] aso-px-8 aso-pt-8 aso-space-y-6 aso-relative">
                <div class="aso-flex aso-space-x-4">
                    <h2 class="aso-text-[15px] aso-font-bold">Price Section</h2>
                </div>
                <div class="aso-grid aso-grid-cols-2 w-full gap-4 aso-justify-between aso-items-center" v-if="dropdownColorsSections['price']">
                    <div class="aso-flex aso-flex-col w-1/4 aso-space-y-2">
                        <label class="aso-text-[12px] aso-text-[#444444]">Background Color</label>
                        <div class="aso-relative aso-flex">
                            <input
                                id="colorPicker"
                                type="color"
                                v-model="themes.colors.bars.price.backgroundColor"
                                @input="updateBarsPriceBackgroundColorCodeHex"
                                class="aso-w-9 aso-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.bars.price.backgroundColor"
                                @input="updateBarsPriceBackgroundColorCodeHex"
                                class="aso-p-1 aso-text-black aso-w-full aso-translate-y-0"
                            />
                        </div>
                    </div>
                    <div class="aso-flex aso-flex-col w-1/4 aso-space-y-2">
                        <label class="aso-text-[12px] aso-text-[#444444]">Text Color</label>
                        <div class="aso-relative aso-flex">
                            <input
                                id="colorPicker"
                                type="color"
                                v-model="themes.colors.bars.price.textColor"
                                @input="updateBarsPriceTextColorCodeHex"
                                class="aso-w-9 aso-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.bars.price.textColor"
                                @input="updateBarsPriceTextColorCodeHex"
                                class="aso-p-1 aso-text-black aso-w-full aso-translate-y-0"
                            />
                        </div>
                    </div>
                    <div class="aso-flex aso-flex-col w-1/4 aso-space-y-2">
                        <label class="aso-text-[12px] aso-text-[#444444]">Text Before Price</label>
                        <div class="aso-relative aso-flex">
                            <input
                                id="colorPicker"
                                type="color"
                                v-model="themes.colors.bars.price.textBeforeColor"
                                @input="updateBarsPriceTextBeforeColorCodeHex"
                                class="aso-w-9 aso-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.bars.price.textBeforeColor"
                                @input="updateBarsPriceTextBeforeColorCodeHex"
                                class="aso-p-1 aso-text-black aso-w-full aso-translate-y-0"
                            />
                        </div>
                    </div>
                    <div class="aso-flex aso-flex-col w-1/4 aso-space-y-2">
                        <label class="aso-text-[12px] aso-text-[#444444]">Text After Price Color</label>
                        <div class="aso-relative aso-flex">
                            <input
                                id="colorPicker"
                                type="color"
                                v-model="themes.colors.bars.price.textAfterColor"
                                @input="updateBarsPriceTextAfterColorCodeHex"
                                class="aso-w-9 aso-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.bars.price.textAfterColor"
                                @input="updateBarsPriceTextAfterColorCodeHex"
                                class="aso-p-1 aso-text-black aso-w-full aso-translate-y-0"
                            />
                        </div>
                    </div>
                </div>
                <div v-if="dropdownColorsSections['price']" @click="dropdownColorsSections['price']=false" class="aso-flex aso-absolute aso-justify-center aso-items-center  aso-my-0 aso-right-8 aso-top-0 aso-shadow-md aso-rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="aso-w-6 aso-h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 18.75 7.5-7.5 7.5 7.5" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 7.5-7.5 7.5 7.5" />
                    </svg>
                </div>
                <div v-if="!dropdownColorsSections['price']" @click="dropdownColorsSections['price']=true" class="aso-flex aso-absolute aso-justify-center aso-items-center  aso-my-0 aso-right-8 aso-top-0 aso-shadow-md aso-rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="aso-w-6 aso-h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5" />
                    </svg>
                </div>
            </div>
            <div class="aso-bg-[#F8F9FB] aso-px-8 aso-pt-8 aso-space-y-6 aso-relative">
                <div class="aso-flex aso-space-x-4">
                    <h2 class="aso-text-[15px] aso-font-bold">Reset Button</h2>
                </div>
                <div class="aso-grid aso-grid-cols-4 w-full gap-4 aso-justify-between aso-items-center" v-if="dropdownColorsSections['resetButton']">
                    <div class="aso-flex aso-flex-col w-1/4 aso-space-y-2">
                        <label class="aso-text-[12px] aso-text-[#444444]">Background Color</label>
                        <div class="aso-relative aso-flex">
                            <input
                                id="colorPicker"
                                type="color"
                                v-model="themes.colors.bars.reset.backgroundColor"
                                @input="updateBarsResetBackgroundColorCodeHex"
                                class="aso-w-9 aso-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.bars.reset.backgroundColor"
                                @input="updateBarsResetBackgroundColorCodeHex"
                                class="aso-p-1 aso-text-black aso-w-full aso-translate-y-0"
                            />
                        </div>
                    </div>
                    <div class="aso-flex aso-flex-col w-1/4 aso-space-y-2">
                        <label class="aso-text-[12px] aso-text-[#444444]">Hover Background Color</label>
                        <div class="aso-relative aso-flex">
                            <input
                                id="colorPicker"
                                type="color"
                                v-model="themes.colors.bars.reset.hoverBackgroundColor"
                                @input="updateBarsResetHoverBackgroundColorCodeHex"
                                class="aso-w-9 aso-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.bars.reset.hoverBackgroundColor"
                                @input="updateBarsResetHoverBackgroundColorCodeHex"
                                class="aso-p-1 aso-text-black aso-w-full aso-translate-y-0"
                            />
                        </div>
                    </div>
                    <div class="aso-flex aso-flex-col w-1/4 aso-space-y-2">
                        <label class="aso-text-[12px] aso-text-[#444444]">Text Color</label>
                        <div class="aso-relative aso-flex">
                            <input
                                id="colorPicker"
                                type="color"
                                v-model="themes.colors.bars.reset.textColor"
                                @input="updateBarsResetTextColorCodeHex"
                                class="aso-w-9 aso-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.bars.reset.textColor"
                                @input="updateBarsResetTextColorCodeHex"
                                class="aso-p-1 aso-text-black aso-w-full aso-translate-y-0"
                            />
                        </div>
                    </div>
                    <div class="aso-flex aso-flex-col w-1/4 aso-space-y-2">
                        <label class="aso-text-[12px] aso-text-[#444444]">Hover Text Color</label>
                        <div class="aso-relative aso-flex">
                            <input
                                id="colorPicker"
                                type="color"
                                v-model="themes.colors.bars.reset.hoverTextColor"
                                @input="updateBarsResetHoverTextColorCodeHex"
                                class="aso-w-9 aso-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.bars.reset.hoverTextColor"
                                @input="updateBarsResetHoverTextColorCodeHex"
                                class="aso-p-1 aso-text-black aso-w-full aso-translate-y-0"
                            />
                        </div>
                    </div>
                    <div class="aso-flex aso-flex-col w-1/4 aso-space-y-2">
                        <label class="aso-text-[12px] aso-text-[#444444]">Border Color</label>
                        <div class="aso-relative aso-flex">
                            <input
                                id="colorPicker"
                                type="color"
                                v-model="themes.colors.bars.reset.borderColor"
                                @input="updateBarsResetBorderColorCodeHex"
                                class="aso-w-9 aso-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.bars.reset.borderColor"
                                @input="updateBarsResetBorderColorCodeHex"
                                class="aso-p-1 aso-text-black aso-w-full aso-translate-y-0"
                            />
                        </div>
                    </div>
                    <div class="aso-flex aso-flex-col w-1/4 aso-space-y-2">
                        <label class="aso-text-[12px] aso-text-[#444444]">Hover Border Color</label>
                        <div class="aso-relative aso-flex">
                            <input
                                id="colorPicker"
                                type="color"
                                v-model="themes.colors.bars.reset.hoverBorderColor"
                                @input="updateBarsResetHoverBorderColorCodeHex"
                                class="aso-w-9 aso-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.bars.reset.hoverBorderColor"
                                @input="updateBarsResetHoverBorderColorCodeHex"
                                class="aso-p-1 aso-text-black aso-w-full aso-translate-y-0"
                            />
                        </div>
                    </div>
                    <div class="aso-flex aso-flex-col w-1/4 aso-space-y-2">
                        <label class="aso-text-[12px] aso-text-[#444444]">Modal Background Color</label>
                        <div class="aso-relative aso-flex">
                            <input
                                id="colorPicker"
                                type="color"
                                v-model="themes.colors.bars.reset.modalBackgroundColor"
                                @input="updateBarsResetModalBackgroundColorCodeHex"
                                class="aso-w-9 aso-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.bars.reset.modalBackgroundColor"
                                @input="updateBarsResetModalBackgroundColorCodeHex"
                                class="aso-p-1 aso-text-black aso-w-full aso-translate-y-0"
                            />
                        </div>
                    </div>
                    <div class="aso-flex aso-flex-col w-1/4 aso-space-y-2">
                        <label class="aso-text-[12px] aso-text-[#444444]">Container Modal Color</label>
                        <div class="aso-relative aso-flex">
                            <input
                                id="colorPicker"
                                type="color"
                                v-model="themes.colors.bars.reset.modalContainerBackground"
                                @input="updateBarsResetModalContainerBackgroundCodeHex"
                                class="aso-w-9 aso-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.bars.reset.modalContainerBackground"
                                @input="updateBarsResetModalContainerBackgroundCodeHex"
                                class="aso-p-1 aso-text-black aso-w-full aso-translate-y-0"
                            />
                        </div>
                    </div>
                    <div class="aso-flex aso-flex-col w-1/4 aso-space-y-2">
                        <label class="aso-text-[12px] aso-text-[#444444]">Modal Text Color</label>
                        <div class="aso-relative aso-flex">
                            <input
                                id="colorPicker"
                                type="color"
                                v-model="themes.colors.bars.reset.modalTextColor"
                                @input="updateBarsResetModalTextColorCodeHex"
                                class="aso-w-9 aso-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.bars.reset.modalTextColor"
                                @input="updateBarsResetModalTextColorCodeHex"
                                class="aso-p-1 aso-text-black aso-w-full aso-translate-y-0"
                            />
                        </div>
                    </div>
                    <div class="aso-flex aso-flex-col w-1/4 aso-space-y-2">
                        <label class="aso-text-[12px] aso-text-[#444444]">Yes Background Color</label>
                        <div class="aso-relative aso-flex">
                            <input
                                id="colorPicker"
                                type="color"
                                v-model="themes.colors.bars.reset.modalYesButtonBackgroundColor"
                                @input="updateBarsResetModalYesButtonBackgroundColorCodeHex"
                                class="aso-w-9 aso-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.bars.reset.modalYesButtonBackgroundColor"
                                @input="updateBarsResetModalYesButtonBackgroundColorCodeHex"
                                class="aso-p-1 aso-text-black aso-w-full aso-translate-y-0"
                            />
                        </div>
                    </div>
                    <div class="aso-flex aso-flex-col w-1/4 aso-space-y-2">
                        <label class="aso-text-[12px] aso-text-[#444444]">Yes Text Color</label>
                        <div class="aso-relative aso-flex">
                            <input
                                id="colorPicker"
                                type="color"
                                v-model="themes.colors.bars.reset.modalYesButtonTextColor"
                                @input="updateBarsResetModalYesButtonTextColorCodeHex"
                                class="aso-w-9 aso-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.bars.reset.modalYesButtonTextColor"
                                @input="updateBarsResetModalYesButtonTextColorCodeHex"
                                class="aso-p-1 aso-text-black aso-w-full aso-translate-y-0"
                            />
                        </div>
                    </div>
                    <div class="aso-flex aso-flex-col w-1/4 aso-space-y-2">
                        <label class="aso-text-[12px] aso-text-[#444444]">No Background Color</label>
                        <div class="aso-relative aso-flex">
                            <input
                                id="colorPicker"
                                type="color"
                                v-model="themes.colors.bars.reset.modalNoButtonBackgroundColor"
                                @input="updateBarsResetModalNoButtonBackgroundColorCodeHex"
                                class="aso-w-9 aso-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.bars.reset.modalNoButtonBackgroundColor"
                                @input="updateBarsResetModalNoButtonBackgroundColorCodeHex"
                                class="aso-p-1 aso-text-black aso-w-full aso-translate-y-0"
                            />
                        </div>
                    </div>
                    <div class="aso-flex aso-flex-col w-1/4 aso-space-y-2">
                        <label class="aso-text-[12px] aso-text-[#444444]">No Text Color</label>
                        <div class="aso-relative aso-flex">
                            <input
                                id="colorPicker"
                                type="color"
                                v-model="themes.colors.bars.reset.modalNoButtonTextColor"
                                @input="updateBarsResetModalNoButtonTextColorCodeHex"
                                class="aso-w-9 aso-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.bars.reset.modalNoButtonTextColor"
                                @input="updateBarsResetModalNoButtonTextColorCodeHex"
                                class="aso-p-1 aso-text-black aso-w-full aso-translate-y-0"
                            />
                        </div>
                    </div>
                </div>
                <div v-if="dropdownColorsSections['resetButton']" @click="dropdownColorsSections['resetButton']=false" class="aso-flex aso-absolute aso-justify-center aso-items-center  aso-my-0 aso-right-8 aso-top-0 aso-shadow-md aso-rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="aso-w-6 aso-h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 18.75 7.5-7.5 7.5 7.5" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 7.5-7.5 7.5 7.5" />
                    </svg>
                </div>
                <div v-if="!dropdownColorsSections['resetButton']" @click="dropdownColorsSections['resetButton']=true" class="aso-flex aso-absolute aso-justify-center aso-items-center  aso-my-0 aso-right-8 aso-top-0 aso-shadow-md aso-rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="aso-w-6 aso-h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5" />
                    </svg>
                </div>
            </div>
            <div class="aso-bg-[#F8F9FB] aso-px-8 aso-pt-8 aso-space-y-6 aso-relative">
                <div class="aso-flex aso-space-x-4">
                    <h2 class="aso-text-[15px] aso-font-bold">Undo and Redo Button</h2>
                </div>
                <div class="aso-grid aso-grid-cols-3 w-full gap-4 aso-justify-between aso-items-center" v-if="dropdownColorsSections['undoRedo']">
                    <div class="aso-flex aso-flex-col w-1/4 aso-space-y-2">
                        <label class="aso-text-[12px] aso-text-[#444444]">Background Color</label>
                        <div class="aso-relative aso-flex">
                            <input
                                id="colorPicker"
                                type="color"
                                v-model="themes.colors.bars.undoRedo.backgroundColor"
                                @input="updateBarsUndoRedoBackgroundColorCodeHex"
                                class="aso-w-9 aso-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.bars.undoRedo.backgroundColor"
                                @input="updateBarsUndoRedoBackgroundColorCodeHex"
                                class="aso-p-1 aso-text-black aso-w-full aso-translate-y-0"
                            />
                        </div>
                    </div>
                    <div class="aso-flex aso-flex-col w-1/4 aso-space-y-2">
                        <label class="aso-text-[12px] aso-text-[#444444]">Hover Background Color</label>
                        <div class="aso-relative aso-flex">
                            <input
                                id="colorPicker"
                                type="color"
                                v-model="themes.colors.bars.undoRedo.hoverBackgroundColor"
                                @input="updateBarsUndoRedoHoverBackgroundColorCodeHex"
                                class="aso-w-9 aso-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.bars.undoRedo.hoverBackgroundColor"
                                @input="updateBarsUndoRedoHoverBackgroundColorCodeHex"
                                class="aso-p-1 aso-text-black aso-w-full aso-translate-y-0"
                            />
                        </div>
                    </div>
                    <div class="aso-flex aso-flex-col w-1/4 aso-space-y-2">
                        <label class="aso-text-[12px] aso-text-[#444444]">Text Color</label>
                        <div class="aso-relative aso-flex">
                            <input
                                id="colorPicker"
                                type="color"
                                v-model="themes.colors.bars.undoRedo.textColor"
                                @input="updateBarsUndoRedoTextColorCodeHex"
                                class="aso-w-9 aso-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.bars.undoRedo.textColor"
                                @input="updateBarsUndoRedoTextColorCodeHex"
                                class="aso-p-1 aso-text-black aso-w-full aso-translate-y-0"
                            />
                        </div>
                    </div>
                    <div class="aso-flex aso-flex-col w-1/4 aso-space-y-2">
                        <label class="aso-text-[12px] aso-text-[#444444]">Hover Text Color</label>
                        <div class="aso-relative aso-flex">
                            <input
                                id="colorPicker"
                                type="color"
                                v-model="themes.colors.bars.undoRedo.hoverTextColor"
                                @input="updateBarsUndoRedoHoverTextColorCodeHex"
                                class="aso-w-9 aso-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.bars.undoRedo.hoverTextColor"
                                @input="updateBarsUndoRedoHoverTextColorCodeHex"
                                class="aso-p-1 aso-text-black aso-w-full aso-translate-y-0"
                            />
                        </div>
                    </div>
                    <div class="aso-flex aso-flex-col w-1/4 aso-space-y-2">
                        <label class="aso-text-[12px] aso-text-[#444444]">Border Color</label>
                        <div class="aso-relative aso-flex">
                            <input
                                id="colorPicker"
                                type="color"
                                v-model="themes.colors.bars.undoRedo.borderColor"
                                @input="updateBarsUndoRedoBorderColorCodeHex"
                                class="aso-w-9 aso-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.bars.undoRedo.borderColor"
                                @input="updateBarsUndoRedoBorderColorCodeHex"
                                class="aso-p-1 aso-text-black aso-w-full aso-translate-y-0"
                            />
                        </div>
                    </div>
                    <div class="aso-flex aso-flex-col w-1/4 aso-space-y-2">
                        <label class="aso-text-[12px] aso-text-[#444444]">Hover Border Color</label>
                        <div class="aso-relative aso-flex">
                            <input
                                id="colorPicker"
                                type="color"
                                v-model="themes.colors.bars.undoRedo.hoverBorderColor"
                                @input="updateBarsUndoRedoHoverBorderColorCodeHex"
                                class="aso-w-9 aso-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.bars.undoRedo.hoverBorderColor"
                                @input="updateBarsUndoRedoHoverBorderColorCodeHex"
                                class="aso-p-1 aso-text-black aso-w-full aso-translate-y-0"
                            />
                        </div>
                    </div>
                </div>
                <div v-if="dropdownColorsSections['undoRedo']" @click="dropdownColorsSections['undoRedo']=false" class="aso-flex aso-absolute aso-justify-center aso-items-center  aso-my-0 aso-right-8 aso-top-0 aso-shadow-md aso-rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="aso-w-6 aso-h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 18.75 7.5-7.5 7.5 7.5" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 7.5-7.5 7.5 7.5" />
                    </svg>
                </div>
                <div v-if="!dropdownColorsSections['undoRedo']" @click="dropdownColorsSections['undoRedo']=true" class="aso-flex aso-absolute aso-justify-center aso-items-center  aso-my-0 aso-right-8 aso-top-0 aso-shadow-md aso-rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="aso-w-6 aso-h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5" />
                    </svg>
                </div>
            </div>
            <div class="aso-bg-[#F8F9FB] aso-px-8 aso-pt-8 aso-space-y-6 aso-relative">
                <div class="aso-flex aso-space-x-4">
                    <h2 class="aso-text-[15px] aso-font-bold">Preview Button</h2>
                </div>
                <div class="aso-grid aso-grid-cols-3 w-full gap-4 aso-justify-between aso-items-center" v-if="dropdownColorsSections['previewButton']">
                    <div class="aso-flex aso-flex-col w-1/4 aso-space-y-2">
                        <label class="aso-text-[12px] aso-text-[#444444]">Background Color</label>
                        <div class="aso-relative aso-flex">
                            <input
                                id="colorPicker"
                                type="color"
                                v-model="themes.colors.bars.preview.backgroundColor"
                                @input="updateBarsPreviewBackgroundColorCodeHex"
                                class="aso-w-9 aso-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.bars.preview.backgroundColor"
                                @input="updateBarsPreviewBackgroundColorCodeHex"
                                class="aso-p-1 aso-text-black aso-w-full aso-translate-y-0"
                            />
                        </div>
                    </div>
                    <div class="aso-flex aso-flex-col w-1/4 aso-space-y-2">
                        <label class="aso-text-[12px] aso-text-[#444444]">Hover Background Color</label>
                        <div class="aso-relative aso-flex">
                            <input
                                id="colorPicker"
                                type="color"
                                v-model="themes.colors.bars.preview.hoverBackgroundColor"
                                @input="updateBarsPreviewHoverBackgroundColorCodeHex"
                                class="aso-w-9 aso-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.bars.preview.hoverBackgroundColor"
                                @input="updateBarsPreviewHoverBackgroundColorCodeHex"
                                class="aso-p-1 aso-text-black aso-w-full aso-translate-y-0"
                            />
                        </div>
                    </div>
                    <div class="aso-flex aso-flex-col w-1/4 aso-space-y-2">
                        <label class="aso-text-[12px] aso-text-[#444444]">Text Color</label>
                        <div class="aso-relative aso-flex">
                            <input
                                id="colorPicker"
                                type="color"
                                v-model="themes.colors.bars.preview.textColor"
                                @input="updateBarsPreviewTextColorCodeHex"
                                class="aso-w-9 aso-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.bars.preview.textColor"
                                @input="updateBarsPreviewTextColorCodeHex"
                                class="aso-p-1 aso-text-black aso-w-full aso-translate-y-0"
                            />
                        </div>
                    </div>
                    <div class="aso-flex aso-flex-col w-1/4 aso-space-y-2">
                        <label class="aso-text-[12px] aso-text-[#444444]">Hover Text Color</label>
                        <div class="aso-relative aso-flex">
                            <input
                                id="colorPicker"
                                type="color"
                                v-model="themes.colors.bars.preview.hoverTextColor"
                                @input="updateBarsPreviewHoverTextColorCodeHex"
                                class="aso-w-9 aso-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.bars.preview.hoverTextColor"
                                @input="updateBarsPreviewHoverTextColorCodeHex"
                                class="aso-p-1 aso-text-black aso-w-full aso-translate-y-0"
                            />
                        </div>
                    </div>
                    <div class="aso-flex aso-flex-col w-1/4 aso-space-y-2">
                        <label class="aso-text-[12px] aso-text-[#444444]">Border Color</label>
                        <div class="aso-relative aso-flex">
                            <input
                                id="colorPicker"
                                type="color"
                                v-model="themes.colors.bars.preview.borderColor"
                                @input="updateBarsPreviewBorderColorCodeHex"
                                class="aso-w-9 aso-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.bars.preview.borderColor"
                                @input="updateBarsPreviewBorderColorCodeHex"
                                class="aso-p-1 aso-text-black aso-w-full aso-translate-y-0"
                            />
                        </div>
                    </div>
                    <div class="aso-flex aso-flex-col w-1/4 aso-space-y-2">
                        <label class="aso-text-[12px] aso-text-[#444444]">Hover Border Color</label>
                        <div class="aso-relative aso-flex">
                            <input
                                id="colorPicker"
                                type="color"
                                v-model="themes.colors.bars.preview.hoverBorderColor"
                                @input="updateBarsPreviewHoverBorderColorCodeHex"
                                class="aso-w-9 aso-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.bars.preview.hoverBorderColor"
                                @input="updateBarsPreviewHoverBorderColorCodeHex"
                                class="aso-p-1 aso-text-black aso-w-full aso-translate-y-0"
                            />
                        </div>
                    </div>
                </div>
                <div v-if="dropdownColorsSections['previewButton']" @click="dropdownColorsSections['previewButton']=false" class="aso-flex aso-absolute aso-justify-center aso-items-center  aso-my-0 aso-right-8 aso-top-0 aso-shadow-md aso-rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="aso-w-6 aso-h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 18.75 7.5-7.5 7.5 7.5" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 7.5-7.5 7.5 7.5" />
                    </svg>
                </div>
                <div v-if="!dropdownColorsSections['previewButton']" @click="dropdownColorsSections['previewButton']=true" class="aso-flex aso-absolute aso-justify-center aso-items-center  aso-my-0 aso-right-8 aso-top-0 aso-shadow-md aso-rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="aso-w-6 aso-h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5" />
                    </svg>
                </div>
            </div>
            <div class="aso-bg-[#F8F9FB] aso-px-8 aso-pt-8 aso-space-y-6 aso-relative">
                <div class="aso-flex aso-space-x-4">
                    <h2 class="aso-text-[15px] aso-font-bold">help Button</h2>
                </div>
                <div class="aso-grid aso-grid-cols-3 w-full gap-4 aso-justify-between aso-items-center" v-if="dropdownColorsSections['helpButton']">
                    <div class="aso-flex aso-flex-col w-1/4 aso-space-y-2">
                        <label class="aso-text-[12px] aso-text-[#444444]">Background Color</label>
                        <div class="aso-relative aso-flex">
                            <input
                                id="colorPicker"
                                type="color"
                                v-model="themes.colors.bars.help.backgroundColor"
                                @input="updateBarsHelpBackgroundColorCodeHex"
                                class="aso-w-9 aso-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.bars.help.backgroundColor"
                                @input="updateBarsHelpBackgroundColorCodeHex"
                                class="aso-p-1 aso-text-black aso-w-full aso-translate-y-0"
                            />
                        </div>
                    </div>
                    <div class="aso-flex aso-flex-col w-1/4 aso-space-y-2">
                        <label class="aso-text-[12px] aso-text-[#444444]">Hover Background Color</label>
                        <div class="aso-relative aso-flex">
                            <input
                                id="colorPicker"
                                type="color"
                                v-model="themes.colors.bars.help.hoverBackgroundColor"
                                @input="updateBarsHelpHoverBackgroundColorCodeHex"
                                class="aso-w-9 aso-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.bars.help.hoverBackgroundColor"
                                @input="updateBarsHelpHoverBackgroundColorCodeHex"
                                class="aso-p-1 aso-text-black aso-w-full aso-translate-y-0"
                            />
                        </div>
                    </div>
                    <div class="aso-flex aso-flex-col w-1/4 aso-space-y-2">
                        <label class="aso-text-[12px] aso-text-[#444444]">Text Color</label>
                        <div class="aso-relative aso-flex">
                            <input
                                id="colorPicker"
                                type="color"
                                v-model="themes.colors.bars.help.textColor"
                                @input="updateBarsHelpTextColorCodeHex"
                                class="aso-w-9 aso-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.bars.help.textColor"
                                @input="updateBarsHelpTextColorCodeHex"
                                class="aso-p-1 aso-text-black aso-w-full aso-translate-y-0"
                            />
                        </div>
                    </div>
                    <div class="aso-flex aso-flex-col w-1/4 aso-space-y-2">
                        <label class="aso-text-[12px] aso-text-[#444444]">Hover Text Color</label>
                        <div class="aso-relative aso-flex">
                            <input
                                id="colorPicker"
                                type="color"
                                v-model="themes.colors.bars.help.hoverTextColor"
                                @input="updateBarsHelpHoverTextColorCodeHex"
                                class="aso-w-9 aso-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.bars.help.hoverTextColor"
                                @input="updateBarsHelpHoverTextColorCodeHex"
                                class="aso-p-1 aso-text-black aso-w-full aso-translate-y-0"
                            />
                        </div>
                    </div>
                    <div class="aso-flex aso-flex-col w-1/4 aso-space-y-2">
                        <label class="aso-text-[12px] aso-text-[#444444]">Border Color</label>
                        <div class="aso-relative aso-flex">
                            <input
                                id="colorPicker"
                                type="color"
                                v-model="themes.colors.bars.help.borderColor"
                                @input="updateBarsHelpBorderColorCodeHex"
                                class="aso-w-9 aso-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.bars.help.borderColor"
                                @input="updateBarsHelpBorderColorCodeHex"
                                class="aso-p-1 aso-text-black aso-w-full aso-translate-y-0"
                            />
                        </div>
                    </div>
                    <div class="aso-flex aso-flex-col w-1/4 aso-space-y-2">
                        <label class="aso-text-[12px] aso-text-[#444444]">Hover Border Color</label>
                        <div class="aso-relative aso-flex">
                            <input
                                id="colorPicker"
                                type="color"
                                v-model="themes.colors.bars.help.hoverBorderColor"
                                @input="updateBarsHelpHoverBorderColorCodeHex"
                                class="aso-w-9 aso-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.bars.help.hoverBorderColor"
                                @input="updateBarsHelpHoverBorderColorCodeHex"
                                class="aso-p-1 aso-text-black aso-w-full aso-translate-y-0"
                            />
                        </div>
                    </div>
                </div>
                <div v-if="dropdownColorsSections['helpButton']" @click="dropdownColorsSections['helpButton']=false" class="aso-flex aso-absolute aso-justify-center aso-items-center  aso-my-0 aso-right-8 aso-top-0 aso-shadow-md aso-rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="aso-w-6 aso-h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 18.75 7.5-7.5 7.5 7.5" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 7.5-7.5 7.5 7.5" />
                    </svg>
                </div>
                <div v-if="!dropdownColorsSections['helpButton']" @click="dropdownColorsSections['helpButton']=true" class="aso-flex aso-absolute aso-justify-center aso-items-center  aso-my-0 aso-right-8 aso-top-0 aso-shadow-md aso-rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="aso-w-6 aso-h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5" />
                    </svg>
                </div>
            </div>
            
            <div class="aso-bg-[#F8F9FB] aso-px-8 aso-pt-8 aso-space-y-6 aso-relative" >
                <div class="aso-flex aso-space-x-4">
                    <h2 class="aso-text-[15px] aso-font-bold">Options SideBar</h2>
                </div>
                <div class="aso-grid aso-grid-cols-3 w-full gap-4 aso-justify-between aso-items-center" v-if="dropdownColorsSections['optionsSideBar']">
                    <div class="aso-flex aso-flex-col w-1/4 aso-space-y-2">
                        <label class="aso-text-[12px] aso-text-[#444444]">Background Color</label>
                        <div class="aso-relative aso-flex">
                            <input
                                id="colorPicker"
                                type="color"
                                v-model="themes.colors.optionsSideBar.backgroundColor"
                                @input="updateOptionsSideBarBackgroundColorCodeHex"
                                class="aso-w-9 aso-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.optionsSideBar.backgroundColor"
                                @input="updateOptionsSideBarBackgroundColorCodeHex"
                                class="aso-p-1 aso-text-black aso-w-full aso-translate-y-0"
                            />
                        </div>
                    </div>
                    <div class="aso-flex aso-flex-col w-1/4 aso-space-y-2">
                        <label class="aso-text-[12px] aso-text-[#444444]">Scroll Buttons Background Color</label>
                        <div class="aso-relative aso-flex">
                            <input
                                id="colorPicker"
                                type="color"
                                v-model="themes.colors.optionsSideBar.scrollButtonsBackgroundColor"
                                @input="updateOptionsSideBarScrollButtonsBackgroundColor"
                                class="aso-w-9 aso-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.optionsSideBar.scrollButtonsBackgroundColor"
                                @input="updateOptionsSideBarScrollButtonsBackgroundColor"
                                class="aso-p-1 aso-text-black aso-w-full aso-translate-y-0"
                            />
                        </div>
                    </div>
                    <div class="aso-flex aso-flex-col w-1/4 aso-space-y-2">
                        <label class="aso-text-[12px] aso-text-[#444444]">Scroll Buttons Hover Background Color</label>
                        <div class="aso-relative aso-flex">
                            <input
                                id="colorPicker"
                                type="color"
                                v-model="themes.colors.optionsSideBar.scrollButtonsHoverBackgroundColor"
                                @input="updateOptionsSideBarScrollButtonsHoverBackgroundColor"
                                class="aso-w-9 aso-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.optionsSideBar.scrollButtonsHoverBackgroundColor"
                                @input="updateOptionsSideBarScrollButtonsHoverBackgroundColor"
                                class="aso-p-1 aso-text-black aso-w-full aso-translate-y-0"
                            />
                        </div>
                    </div>
                    <div class="aso-flex aso-flex-col w-1/4 aso-space-y-2">
                        <label class="aso-text-[12px] aso-text-[#444444]">Scroll Buttons Text Color</label>
                        <div class="aso-relative aso-flex">
                            <input
                                id="colorPicker"
                                type="color"
                                v-model="themes.colors.optionsSideBar.scrollButtonsTextColor"
                                @input="updateOptionsSideBarScrollButtonsTextColor"
                                class="aso-w-9 aso-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.optionsSideBar.scrollButtonsTextColor"
                                @input="updateOptionsSideBarScrollButtonsTextColor"
                                class="aso-p-1 aso-text-black aso-w-full aso-translate-y-0"
                            />
                        </div>
                    </div>
                    <div class="aso-flex aso-flex-col w-1/4 aso-space-y-2">
                        <label class="aso-text-[12px] aso-text-[#444444]">Scroll Buttons Text Hover Color</label>
                        <div class="aso-relative aso-flex">
                            <input
                                id="colorPicker"
                                type="color"
                                v-model="themes.colors.optionsSideBar.scrollButtonsHoverTextColor"
                                @input="updateOptionsSideBarScrollButtonsHoverTextColor"
                                class="aso-w-9 aso-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.optionsSideBar.scrollButtonsHoverTextColor"
                                @input="updateOptionsSideBarScrollButtonsHoverTextColor"
                                class="aso-p-1 aso-text-black aso-w-full aso-translate-y-0"
                            />
                        </div>
                    </div>
                    <div class="aso-flex aso-flex-col w-1/4 aso-space-y-2">
                        <label class="aso-text-[12px] aso-text-[#444444]">Options Buttons Background Color</label>
                        <div class="aso-relative aso-flex">
                            <input
                                id="colorPicker"
                                type="color"
                                v-model="themes.colors.optionsSideBar.options.buttons.backgroundColor"
                                @input="updateOptionsSideBarOptionsButtonsBackgroundColor"
                                class="aso-w-9 aso-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.optionsSideBar.options.buttons.backgroundColor"
                                @input="updateOptionsSideBarOptionsButtonsBackgroundColor"
                                class="aso-p-1 aso-text-black aso-w-full aso-translate-y-0"
                            />
                        </div>
                    </div>
                    <div class="aso-flex aso-flex-col w-1/4 aso-space-y-2">
                        <label class="aso-text-[12px] aso-text-[#444444]">Options Buttons Hover Background Color</label>
                        <div class="aso-relative aso-flex">
                            <input
                                id="colorPicker"
                                type="color"
                                v-model="themes.colors.optionsSideBar.options.buttons.hoverBackgroundColor"
                                @input="updateOptionsSideBarOptionsButtonsHoverBackgroundColor"
                                class="aso-w-9 aso-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.optionsSideBar.options.buttons.hoverBackgroundColor"
                                @input="updateOptionsSideBarOptionsButtonsHoverBackgroundColor"
                                class="aso-p-1 aso-text-black aso-w-full aso-translate-y-0"
                            />
                        </div>
                    </div>
                    <div class="aso-flex aso-flex-col w-1/4 aso-space-y-2">
                        <label class="aso-text-[12px] aso-text-[#444444]">Options Buttons Text Color</label>
                        <div class="aso-relative aso-flex">
                            <input
                                id="colorPicker"
                                type="color"
                                v-model="themes.colors.optionsSideBar.options.buttons.textColor"
                                @input="updateOptionsSideBarOptionsButtonsTextColor"
                                class="aso-w-9 aso-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.optionsSideBar.options.buttons.textColor"
                                @input="updateOptionsSideBarOptionsButtonsTextColor"
                                class="aso-p-1 aso-text-black aso-w-full aso-translate-y-0"
                            />
                        </div>
                    </div>
                    <div class="aso-flex aso-flex-col w-1/4 aso-space-y-2">
                        <label class="aso-text-[12px] aso-text-[#444444]">Options Buttons Hover Text Color</label>
                        <div class="aso-relative aso-flex">
                            <input
                                id="colorPicker"
                                type="color"
                                v-model="themes.colors.optionsSideBar.options.buttons.hoverTextColor"
                                @input="updateOptionsSideBarOptionsButtonsHoverTextColor"
                                class="aso-w-9 aso-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.optionsSideBar.options.buttons.hoverTextColor"
                                @input="updateOptionsSideBarOptionsButtonsHoverTextColor"
                                class="aso-p-1 aso-text-black aso-w-full aso-translate-y-0"
                            />
                        </div>
                    </div>
                </div>
                <div v-if="dropdownColorsSections['optionsSideBar']" @click="dropdownColorsSections['optionsSideBar']=false" class="aso-flex aso-absolute aso-justify-center aso-items-center  aso-my-0 aso-right-8 aso-top-0 aso-shadow-md aso-rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="aso-w-6 aso-h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 18.75 7.5-7.5 7.5 7.5" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 7.5-7.5 7.5 7.5" />
                    </svg>
                </div>
                <div v-if="!dropdownColorsSections['optionsSideBar']" @click="dropdownColorsSections['optionsSideBar']=true" class="aso-flex aso-absolute aso-justify-center aso-items-center  aso-my-0 aso-right-8 aso-top-0 aso-shadow-md aso-rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="aso-w-6 aso-h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5" />
                    </svg>
                </div>
            </div>
            <div class="aso-bg-[#F8F9FB] aso-px-8 aso-pt-8 aso-space-y-6 aso-relative" >
                <div class="aso-flex aso-space-x-4">
                    <h2 class="aso-text-[15px] aso-font-bold">Options Modals</h2>
                </div>
                <div class="aso-grid aso-grid-cols-3 w-full gap-4 aso-justify-between aso-items-center" v-if="dropdownColorsSections['optionsModals']">
                    <div class="aso-flex aso-flex-col w-1/4 aso-space-y-2">
                        <label class="aso-text-[12px] aso-text-[#444444]">Modal Background Color</label>
                        <div class="aso-relative aso-flex">
                            <input
                                id="colorPicker"
                                type="color"
                                v-model="themes.colors.optionsSideBar.options.modals.backgroundColor"
                                @input="updateOptionsSideBarOptionsModalsBackgroundColor"
                                class="aso-w-9 aso-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.optionsSideBar.options.modals.backgroundColor"
                                @input="updateOptionsSideBarOptionsModalsBackgroundColor"
                                class="aso-p-1 aso-text-black aso-w-full aso-translate-y-0"
                            />
                        </div>
                    </div>
                    <div class="aso-flex aso-flex-col w-1/4 aso-space-y-2">
                        <label class="aso-text-[12px] aso-text-[#444444]">Modal Text Color</label>
                        <div class="aso-relative aso-flex">
                            <input
                                id="colorPicker"
                                type="color"
                                v-model="themes.colors.optionsSideBar.options.modals.textColor"
                                @input="updateOptionsSideBarOptionsModalsTextColor"
                                class="aso-w-9 aso-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.optionsSideBar.options.modals.textColor"
                                @input="updateOptionsSideBarOptionsModalsTextColor"
                                class="aso-p-1 aso-text-black aso-w-full aso-translate-y-0"
                            />
                        </div>
                    </div>
                    <div class="aso-flex aso-flex-col w-1/4 aso-space-y-2">
                        <label class="aso-text-[12px] aso-text-[#444444]">Modal Header Background Color</label>
                        <div class="aso-relative aso-flex">
                            <input
                                id="colorPicker"
                                type="color"
                                v-model="themes.colors.optionsSideBar.options.modals.headerBackgroundColor"
                                @input="updateOptionsSideBarOptionsModalsHeaderBackgroundColor"
                                class="aso-w-9 aso-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.optionsSideBar.options.modals.headerBackgroundColor"
                                @input="updateOptionsSideBarOptionsModalsHeaderBackgroundColor"
                                class="aso-p-1 aso-text-black aso-w-full aso-translate-y-0"
                            />
                        </div>
                    </div>
                    <div class="aso-flex aso-flex-col w-1/4 aso-space-y-2">
                        <label class="aso-text-[12px] aso-text-[#444444]">Modal Header Text Color</label>
                        <div class="aso-relative aso-flex">
                            <input
                                id="colorPicker"
                                type="color"
                                v-model="themes.colors.optionsSideBar.options.modals.headerTextColor"
                                @input="updateOptionsSideBarOptionsModalsHeaderTextColor"
                                class="aso-w-9 aso-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.optionsSideBar.options.modals.headerTextColor"
                                @input="updateOptionsSideBarOptionsModalsHeaderTextColor"
                                class="aso-p-1 aso-text-black aso-w-full aso-translate-y-0"
                            />
                        </div>
                    </div>
                    <div class="aso-flex aso-flex-col w-1/4 aso-space-y-2">
                        <label class="aso-text-[12px] aso-text-[#444444]">Modal Buttons Background Color</label>
                        <div class="aso-relative aso-flex">
                            <input
                                id="colorPicker"
                                type="color"
                                v-model="themes.colors.optionsSideBar.options.modals.buttons.backgroundColor"
                                @input="updateOptionsSideBarOptionsModalsButtonsBackgroundColor"
                                class="aso-w-9 aso-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.optionsSideBar.options.modals.buttons.backgroundColor"
                                @input="updateOptionsSideBarOptionsModalsButtonsBackgroundColor"
                                class="aso-p-1 aso-text-black aso-w-full aso-translate-y-0"
                            />
                        </div>
                    </div>
                    <div class="aso-flex aso-flex-col w-1/4 aso-space-y-2">
                        <label class="aso-text-[12px] aso-text-[#444444]">Modal Buttons Hover Background Color</label>
                        <div class="aso-relative aso-flex">
                            <input
                                id="colorPicker"
                                type="color"
                                v-model="themes.colors.optionsSideBar.options.modals.buttons.hoverBackgroundColor"
                                @input="updateOptionsSideBarOptionsModalsButtonsHoverBackgroundColor"
                                class="aso-w-9 aso-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.optionsSideBar.options.modals.buttons.hoverBackgroundColor"
                                @input="updateOptionsSideBarOptionsModalsButtonsHoverBackgroundColor"
                                class="aso-p-1 aso-text-black aso-w-full aso-translate-y-0"
                            />
                        </div>
                    </div>
                    <div class="aso-flex aso-flex-col w-1/4 aso-space-y-2">
                        <label class="aso-text-[12px] aso-text-[#444444]">Modals Buttons Text Color</label>
                        <div class="aso-relative aso-flex">
                            <input
                                id="colorPicker"
                                type="color"
                                v-model="themes.colors.optionsSideBar.options.modals.buttons.textColor"
                                @input="updateOptionsSideBarOptionsModalsButtonsTextColor"
                                class="aso-w-9 aso-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.optionsSideBar.options.modals.buttons.textColor"
                                @input="updateOptionsSideBarOptionsModalsButtonsTextColor"
                                class="aso-p-1 aso-text-black aso-w-full aso-translate-y-0"
                            />
                        </div>
                    </div>
                    <div class="aso-flex aso-flex-col w-1/4 aso-space-y-2">
                        <label class="aso-text-[12px] aso-text-[#444444]">Modals Buttons Hover Text Color</label>
                        <div class="aso-relative aso-flex">
                            <input
                                id="colorPicker"
                                type="color"
                                v-model="themes.colors.optionsSideBar.options.modals.buttons.hoverTextColor"
                                @input="updateOptionsSideBarOptionsModalsButtonsHoverTextColor"
                                class="aso-w-9 aso-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.optionsSideBar.options.modals.buttons.hoverTextColor"
                                @input="updateOptionsSideBarOptionsModalsButtonsHoverTextColor"
                                class="aso-p-1 aso-text-black aso-w-full aso-translate-y-0"
                            />
                        </div>
                    </div>
                </div>
                <div v-if="dropdownColorsSections['optionsModals']" @click="dropdownColorsSections['optionsModals']=false" class="aso-flex aso-absolute aso-justify-center aso-items-center  aso-my-0 aso-right-8 aso-top-0 aso-shadow-md aso-rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="aso-w-6 aso-h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 18.75 7.5-7.5 7.5 7.5" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 7.5-7.5 7.5 7.5" />
                    </svg>
                </div>
                <div v-if="!dropdownColorsSections['optionsModals']" @click="dropdownColorsSections['optionsModals']=true" class="aso-flex aso-absolute aso-justify-center aso-items-center  aso-my-0 aso-right-8 aso-top-0 aso-shadow-md aso-rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="aso-w-6 aso-h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5" />
                    </svg>
                </div>
            </div>
            <div class="aso-bg-[#F8F9FB] aso-px-8 aso-pt-8 aso-space-y-6 aso-relative" >
                <div class="aso-flex aso-space-x-4">
                    <h2 class="aso-text-[15px] aso-font-bold">Option in Modal</h2>
                </div>
                <div class="aso-grid aso-grid-cols-2 w-full gap-4 aso-justify-between aso-items-center" v-if="dropdownColorsSections['modalsOption']">
                    <div class="aso-flex aso-flex-col w-1/4 aso-space-y-2">
                        <label class="aso-text-[12px] aso-text-[#444444]">Modal Option Text Color</label>
                        <div class="aso-relative aso-flex">
                            <input
                                id="colorPicker"
                                type="color"
                                v-model="themes.colors.optionsSideBar.options.modals.option.textColor"
                                @input="updateOptionsSideBarOptionsModalsOptionTextColor"
                                class="aso-w-9 aso-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.optionsSideBar.options.modals.option.textColor"
                                @input="updateOptionsSideBarOptionsModalsOptionTextColor"
                                class="aso-p-1 aso-text-black aso-w-full aso-translate-y-0"
                            />
                        </div>
                    </div>
                    <div class="aso-flex aso-flex-col w-1/4 aso-space-y-2">
                        <label class="aso-text-[12px] aso-text-[#444444]">Modal Option Hover Background Color</label>
                        <div class="aso-relative aso-flex">
                            <input
                                id="colorPicker"
                                type="color"
                                v-model="themes.colors.optionsSideBar.options.modals.option.hoverBackgroundColor"
                                @input="updateOptionsSideBarOptionsModalsOptionHoverBackgroundColor"
                                class="aso-w-9 aso-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.optionsSideBar.options.modals.option.hoverBackgroundColor"
                                @input="updateOptionsSideBarOptionsModalsOptionHoverBackgroundColor"
                                class="aso-p-1 aso-text-black aso-w-full aso-translate-y-0"
                            />
                        </div>
                    </div>
                    <div class="aso-flex aso-flex-col w-1/4 aso-space-y-2">
                        <label class="aso-text-[12px] aso-text-[#444444]">Modal Option Hover Text Color</label>
                        <div class="aso-relative aso-flex">
                            <input
                                id="colorPicker"
                                type="color"
                                v-model="themes.colors.optionsSideBar.options.modals.option.hoverTextColor"
                                @input="updateOptionsSideBarOptionsModalsOptionHoverTextColor"
                                class="aso-w-9 aso-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.optionsSideBar.options.modals.option.hoverTextColor"
                                @input="updateOptionsSideBarOptionsModalsOptionHoverTextColor"
                                class="aso-p-1 aso-text-black aso-w-full aso-translate-y-0"
                            />
                        </div>
                    </div>
                    <div class="aso-flex aso-flex-col w-1/4 aso-space-y-2">
                        <label class="aso-text-[12px] aso-text-[#444444]">Modal Option Active Text Color</label>
                        <div class="aso-relative aso-flex">
                            <input
                                id="colorPicker"
                                type="color"
                                v-model="themes.colors.optionsSideBar.options.modals.option.activeTextColor"
                                @input="updateOptionsSideBarOptionsModalsOptionActiveTextColor"
                                class="aso-w-9 aso-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.optionsSideBar.options.modals.option.activeTextColor"
                                @input="updateOptionsSideBarOptionsModalsOptionActiveTextColor"
                                class="aso-p-1 aso-text-black aso-w-full aso-translate-y-0"
                            />
                        </div>
                    </div>
                </div>
                <div v-if="dropdownColorsSections['modalsOption']" @click="dropdownColorsSections['modalsOption']=false" class="aso-flex aso-absolute aso-justify-center aso-items-center  aso-my-0 aso-right-8 aso-top-0 aso-shadow-md aso-rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="aso-w-6 aso-h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 18.75 7.5-7.5 7.5 7.5" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 7.5-7.5 7.5 7.5" />
                    </svg>
                </div>
                <div v-if="!dropdownColorsSections['modalsOption']" @click="dropdownColorsSections['modalsOption']=true" class="aso-flex aso-absolute aso-justify-center aso-items-center  aso-my-0 aso-right-8 aso-top-0 aso-shadow-md aso-rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="aso-w-6 aso-h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5" />
                    </svg>
                </div>
            </div>
            <div class="aso-bg-[#F8F9FB] aso-px-8 aso-pt-8 aso-space-y-6 aso-relative" >
                <div class="aso-flex aso-space-x-4">
                    <h2 class="aso-text-[15px] aso-font-bold">Objects Options</h2>
                </div>
                <div v-show="dropdownColorsSections['objectsOptions']">
                    <div class="aso-grid aso-grid-cols-3 w-full gap-4 aso-justify-between aso-items-center">
                        <div class="aso-flex aso-flex-col w-1/4 aso-space-y-2">
                            <label class="aso-text-[12px] aso-text-[#444444]">Background Color</label>
                            <div class="aso-relative aso-flex">
                                <input
                                    id="colorPicker"
                                    type="color"
                                    v-model="themes.colors.objectsOptions.backgroundColor"
                                    @input="updateObjectsOptionsBackgroundColorCodeHex"
                                    class="aso-w-9 aso-h-[30px]"
                                />
                                <input
                                    type="text"
                                    v-model="themes.colors.objectsOptions.backgroundColor"
                                    @input="updateObjectsOptionsBackgroundColorCodeHex"
                                    class="aso-p-1 aso-text-black aso-w-full aso-translate-y-0"
                                />
                            </div>
                        </div>
                        <div class="aso-flex aso-flex-col w-1/4 aso-space-y-2">
                            <label class="aso-text-[12px] aso-text-[#444444]">Edit Button Color</label>
                            <div class="aso-relative aso-flex">
                                <input
                                    id="colorPicker"
                                    type="color"
                                    v-model="themes.colors.objectsOptions.edit.buttonColor"
                                    @input="updateObjectsOptionsEditButtonColor"
                                    class="aso-w-9 aso-h-[30px]"
                                />
                                <input
                                    type="text"
                                    v-model="themes.colors.objectsOptions.edit.buttonColor"
                                    @input="updateObjectsOptionsEditButtonColor"
                                    class="aso-p-1 aso-text-black aso-w-full aso-translate-y-0"
                                />
                            </div>
                        </div>
                        <div class="aso-flex aso-flex-col w-1/4 aso-space-y-2">
                            <label class="aso-text-[12px] aso-text-[#444444]">Hover Button Color</label>
                            <div class="aso-relative aso-flex">
                                <input
                                    id="colorPicker"
                                    type="color"
                                    v-model="themes.colors.objectsOptions.edit.hoverButtonColor"
                                    @input="updateObjectsOptionsEditHoverButtonColor"
                                    class="aso-w-9 aso-h-[30px]"
                                />
                                <input
                                    type="text"
                                    v-model="themes.colors.objectsOptions.edit.hoverButtonColor"
                                    @input="updateObjectsOptionsEditHoverButtonColor"
                                    class="aso-p-1 aso-text-black aso-w-full aso-translate-y-0"
                                />
                            </div>
                        </div>
                        <div class="aso-flex aso-flex-col w-1/4 aso-space-y-2">
                            <label class="aso-text-[12px] aso-text-[#444444]">Edit Button Text Color</label>
                            <div class="aso-relative aso-flex">
                                <input
                                    id="colorPicker"
                                    type="color"
                                    v-model="themes.colors.objectsOptions.edit.textColor"
                                    @input="updateObjectsOptionsEditTextColor"
                                    class="aso-w-9 aso-h-[30px]"
                                />
                                <input
                                    type="text"
                                    v-model="themes.colors.objectsOptions.edit.textColor"
                                    @input="updateObjectsOptionsEditTextColor"
                                    class="aso-p-1 aso-text-black aso-w-full aso-translate-y-0"
                                />
                            </div>
                        </div>
                        <div class="aso-flex aso-flex-col w-1/4 aso-space-y-2">
                            <label class="aso-text-[12px] aso-text-[#444444]">Edit Button Text Hover Color</label>
                            <div class="aso-relative aso-flex">
                                <input
                                    id="colorPicker"
                                    type="color"
                                    v-model="themes.colors.objectsOptions.edit.hoverTextColor"
                                    @input="updateObjectsOptionsEditHoverTextColor"
                                    class="aso-w-9 aso-h-[30px]"
                                />
                                <input
                                    type="text"
                                    v-model="themes.colors.objectsOptions.edit.hoverTextColor"
                                    @input="updateObjectsOptionsEditHoverTextColor"
                                    class="aso-p-1 aso-text-black aso-w-full aso-translate-y-0"
                                />
                            </div>
                        </div>
                        <div class="aso-flex aso-flex-col w-1/4 aso-space-y-2">
                            <label class="aso-text-[12px] aso-text-[#444444]">Clone Button Color</label>
                            <div class="aso-relative aso-flex">
                                <input
                                    id="colorPicker"
                                    type="color"
                                    v-model="themes.colors.objectsOptions.clone.buttonColor"
                                    @input="updateObjectsOptionsCloneButtonColor"
                                    class="aso-w-9 aso-h-[30px]"
                                />
                                <input
                                    type="text"
                                    v-model="themes.colors.objectsOptions.clone.buttonColor"
                                    @input="updateObjectsOptionsCloneButtonColor"
                                    class="aso-p-1 aso-text-black aso-w-full aso-translate-y-0"
                                />
                            </div>
                        </div>
                        <div class="aso-flex aso-flex-col w-1/4 aso-space-y-2">
                            <label class="aso-text-[12px] aso-text-[#444444]">Clone Hover Button Color</label>
                            <div class="aso-relative aso-flex">
                                <input
                                    id="colorPicker"
                                    type="color"
                                    v-model="themes.colors.objectsOptions.clone.hoverButtonColor"
                                    @input="updateObjectsOptionsCloneHoverButtonColor"
                                    class="aso-w-9 aso-h-[30px]"
                                />
                                <input
                                    type="text"
                                    v-model="themes.colors.objectsOptions.clone.hoverButtonColor"
                                    @input="updateObjectsOptionsCloneHoverButtonColor"
                                    class="aso-p-1 aso-text-black aso-w-full aso-translate-y-0"
                                />
                            </div>
                        </div>
                        <div class="aso-flex aso-flex-col w-1/4 aso-space-y-2">
                            <label class="aso-text-[12px] aso-text-[#444444]">Clone Button Text Color</label>
                            <div class="aso-relative aso-flex">
                                <input
                                    id="colorPicker"
                                    type="color"
                                    v-model="themes.colors.objectsOptions.clone.textColor"
                                    @input="updateObjectsOptionsCloneTextColor"
                                    class="aso-w-9 aso-h-[30px]"
                                />
                                <input
                                    type="text"
                                    v-model="themes.colors.objectsOptions.clone.textColor"
                                    @input="updateObjectsOptionsCloneTextColor"
                                    class="aso-p-1 aso-text-black aso-w-full aso-translate-y-0"
                                />
                            </div>
                        </div>
                        <div class="aso-flex aso-flex-col w-1/4 aso-space-y-2">
                            <label class="aso-text-[12px] aso-text-[#444444]">Clone Button Text Hover Color</label>
                            <div class="aso-relative aso-flex">
                                <input
                                    id="colorPicker"
                                    type="color"
                                    v-model="themes.colors.objectsOptions.clone.hoverTextColor"
                                    @input="updateObjectsOptionsCloneHoverTextColor"
                                    class="aso-w-9 aso-h-[30px]"
                                />
                                <input
                                    type="text"
                                    v-model="themes.colors.objectsOptions.clone.hoverTextColor"
                                    @input="updateObjectsOptionsCloneHoverTextColor"
                                    class="aso-p-1 aso-text-black aso-w-full aso-translate-y-0"
                                />
                            </div>
                        </div>
                        <div class="aso-flex aso-flex-col w-1/4 aso-space-y-2">
                            <label class="aso-text-[12px] aso-text-[#444444]">Delete Button Color</label>
                            <div class="aso-relative aso-flex">
                                <input
                                    id="colorPicker"
                                    type="color"
                                    v-model="themes.colors.objectsOptions.delete.buttonColor"
                                    @input="updateObjectsOptionsDeleteButtonColor"
                                    class="aso-w-9 aso-h-[30px]"
                                />
                                <input
                                    type="text"
                                    v-model="themes.colors.objectsOptions.delete.buttonColor"
                                    @input="updateObjectsOptionsDeleteButtonColor"
                                    class="aso-p-1 aso-text-black aso-w-full aso-translate-y-0"
                                />
                            </div>
                        </div>
                        <div class="aso-flex aso-flex-col w-1/4 aso-space-y-2">
                            <label class="aso-text-[12px] aso-text-[#444444]">Delete Hover Button Color</label>
                            <div class="aso-relative aso-flex">
                                <input
                                    id="colorPicker"
                                    type="color"
                                    v-model="themes.colors.objectsOptions.delete.hoverButtonColor"
                                    @input="updateObjectsOptionsDeleteHoverButtonColor"
                                    class="aso-w-9 aso-h-[30px]"
                                />
                                <input
                                    type="text"
                                    v-model="themes.colors.objectsOptions.delete.hoverButtonColor"
                                    @input="updateObjectsOptionsDeleteHoverButtonColor"
                                    class="aso-p-1 aso-text-black aso-w-full aso-translate-y-0"
                                />
                            </div>
                        </div>
                        <div class="aso-flex aso-flex-col w-1/4 aso-space-y-2">
                            <label class="aso-text-[12px] aso-text-[#444444]">Delete Button Text Color</label>
                            <div class="aso-relative aso-flex">
                                <input
                                    id="colorPicker"
                                    type="color"
                                    v-model="themes.colors.objectsOptions.delete.textColor"
                                    @input="updateObjectsOptionsDeleteTextColor"
                                    class="aso-w-9 aso-h-[30px]"
                                />
                                <input
                                    type="text"
                                    v-model="themes.colors.objectsOptions.delete.textColor"
                                    @input="updateObjectsOptionsDeleteTextColor"
                                    class="aso-p-1 aso-text-black aso-w-full aso-translate-y-0"
                                />
                            </div>
                        </div>
                        <div class="aso-flex aso-flex-col w-1/4 aso-space-y-2">
                            <label class="aso-text-[12px] aso-text-[#444444]">Delete Button Text Hover Color</label>
                            <div class="aso-relative aso-flex">
                                <input
                                    id="colorPicker"
                                    type="color"
                                    v-model="themes.colors.objectsOptions.delete.hoverTextColor"
                                    @input="updateObjectsOptionsDeleteHoverTextColor"
                                    class="aso-w-9 aso-h-[30px]"
                                />
                                <input
                                    type="text"
                                    v-model="themes.colors.objectsOptions.delete.hoverTextColor"
                                    @input="updateObjectsOptionsDeleteHoverTextColor"
                                    class="aso-p-1 aso-text-black aso-w-full aso-translate-y-0"
                                />
                            </div>
                        </div>
                        <div class="aso-flex aso-flex-col w-1/4 aso-space-y-2">
                            <label class="aso-text-[12px] aso-text-[#444444]">Center Button Color</label>
                            <div class="aso-relative aso-flex">
                                <input
                                    id="colorPicker"
                                    type="color"
                                    v-model="themes.colors.objectsOptions.center.buttonColor"
                                    @input="updateObjectsOptionsCenterButtonColor"
                                    class="aso-w-9 aso-h-[30px]"
                                />
                                <input
                                    type="text"
                                    v-model="themes.colors.objectsOptions.center.buttonColor"
                                    @input="updateObjectsOptionsCenterButtonColor"
                                    class="aso-p-1 aso-text-black aso-w-full aso-translate-y-0"
                                />
                            </div>
                        </div>
                        <div class="aso-flex aso-flex-col w-1/4 aso-space-y-2">
                            <label class="aso-text-[12px] aso-text-[#444444]">Center Hover Button Color</label>
                            <div class="aso-relative aso-flex">
                                <input
                                    id="colorPicker"
                                    type="color"
                                    v-model="themes.colors.objectsOptions.center.hoverButtonColor"
                                    @input="updateObjectsOptionsCenterHoverButtonColor"
                                    class="aso-w-9 aso-h-[30px]"
                                />
                                <input
                                    type="text"
                                    v-model="themes.colors.objectsOptions.center.hoverButtonColor"
                                    @input="updateObjectsOptionsCenterHoverButtonColor"
                                    class="aso-p-1 aso-text-black aso-w-full aso-translate-y-0"
                                />
                            </div>
                        </div>
                        <div class="aso-flex aso-flex-col w-1/4 aso-space-y-2">
                            <label class="aso-text-[12px] aso-text-[#444444]">Center Button Text Color</label>
                            <div class="aso-relative aso-flex">
                                <input
                                    id="colorPicker"
                                    type="color"
                                    v-model="themes.colors.objectsOptions.center.textColor"
                                    @input="updateObjectsOptionsCenterTextColor"
                                    class="aso-w-9 aso-h-[30px]"
                                />
                                <input
                                    type="text"
                                    v-model="themes.colors.objectsOptions.center.textColor"
                                    @input="updateObjectsOptionsCenterTextColor"
                                    class="aso-p-1 aso-text-black aso-w-full aso-translate-y-0"
                                />
                            </div>
                        </div>
                        <div class="aso-flex aso-flex-col w-1/4 aso-space-y-2">
                            <label class="aso-text-[12px] aso-text-[#444444]">Center Button Text Hover Color</label>
                            <div class="aso-relative aso-flex">
                                <input
                                    id="colorPicker"
                                    type="color"
                                    v-model="themes.colors.objectsOptions.center.hoverTextColor"
                                    @input="updateObjectsOptionsCenterHoverTextColor"
                                    class="aso-w-9 aso-h-[30px]"
                                />
                                <input
                                    type="text"
                                    v-model="themes.colors.objectsOptions.center.hoverTextColor"
                                    @input="updateObjectsOptionsCenterHoverTextColor"
                                    class="aso-p-1 aso-text-black aso-w-full aso-translate-y-0"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="dropdownColorsSections['objectsOptions']" @click="dropdownColorsSections['objectsOptions']=false" class="aso-flex aso-absolute aso-justify-center aso-items-center  aso-my-0 aso-right-8 aso-top-0 aso-shadow-md aso-rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="aso-w-6 aso-h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 18.75 7.5-7.5 7.5 7.5" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 7.5-7.5 7.5 7.5" />
                    </svg>
                </div>
                <div v-if="!dropdownColorsSections['objectsOptions']" @click="dropdownColorsSections['objectsOptions']=true" class="aso-flex aso-absolute aso-justify-center aso-items-center  aso-my-0 aso-right-8 aso-top-0 aso-shadow-md aso-rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="aso-w-6 aso-h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5" />
                    </svg>
                </div>
            </div>
            <div class="aso-bg-[#F8F9FB] aso-px-8 aso-py-8 aso-space-y-6 aso-relative" >
                <div class="aso-flex aso-space-x-4">
                    <h2 class="aso-text-[15px] aso-font-bold">Recaps Section</h2>
                </div>
                <div v-show="dropdownColorsSections['recaps']">
                    <div class="aso-grid aso-grid-cols-4 w-full gap-4 aso-justify-between aso-items-center">
                        <div class="aso-flex aso-flex-col w-1/4 aso-space-y-2">
                            <label class="aso-text-[12px] aso-text-[#444444]">Background Color</label>
                            <div class="aso-relative aso-flex">
                                <input
                                    id="colorPicker"
                                    type="color"
                                    v-model="themes.colors.recaps.backgroundColor"
                                    @input="updateRecapsBackgroundColor"
                                    class="aso-w-9 aso-h-[30px]"
                                />
                                <input
                                    type="text"
                                    v-model="themes.colors.recaps.backgroundColor"
                                    @input="updateRecapsBackgroundColor"
                                    class="aso-p-1 aso-text-black aso-w-full aso-translate-y-0"
                                />
                            </div>
                        </div>
                        <div class="aso-flex aso-flex-col w-1/4 aso-space-y-2">
                            <label class="aso-text-[12px] aso-text-[#444444]">Header Background Color</label>
                            <div class="aso-relative aso-flex">
                                <input
                                    id="colorPicker"
                                    type="color"
                                    v-model="themes.colors.recaps.headerBackgroundColor"
                                    @input="updateRecapsHeaderBackgroundColor"
                                    class="aso-w-9 aso-h-[30px]"
                                />
                                <input
                                    type="text"
                                    v-model="themes.colors.recaps.headerBackgroundColor"
                                    @input="updateRecapsHeaderBackgroundColor"
                                    class="aso-p-1 aso-text-black aso-w-full aso-translate-y-0"
                                />
                            </div>
                        </div>
                        <div class="aso-flex aso-flex-col w-1/4 aso-space-y-2">
                            <label class="aso-text-[12px] aso-text-[#444444]">Header Text Color</label>
                            <div class="aso-relative aso-flex">
                                <input
                                    id="colorPicker"
                                    type="color"
                                    v-model="themes.colors.recaps.headerTextColor"
                                    @input="updateRecapsHeaderTextColor"
                                    class="aso-w-9 aso-h-[30px]"
                                />
                                <input
                                    type="text"
                                    v-model="themes.colors.objectsOptions.edit.buttonColor"
                                    @input="updateRecapsHeaderTextColor"
                                    class="aso-p-1 aso-text-black aso-w-full aso-translate-y-0"
                                />
                            </div>
                        </div>
                        <div class="aso-flex aso-flex-col w-1/4 aso-space-y-2">
                            <label class="aso-text-[12px] aso-text-[#444444]">Recaps Option Hover Background Color</label>
                            <div class="aso-relative aso-flex">
                                <input
                                    id="colorPicker"
                                    type="color"
                                    v-model="themes.colors.recaps.optionHoverBackgroundColor"
                                    @input="updateRecapsOptionHoverBackgroundColor"
                                    class="aso-w-9 aso-h-[30px]"
                                />
                                <input
                                    type="text"
                                    v-model="themes.colors.recaps.optionHoverBackgroundColor"
                                    @input="updateRecapsOptionHoverBackgroundColor"
                                    class="aso-p-1 aso-text-black aso-w-full aso-translate-y-0"
                                />
                            </div>
                        </div>
                        <div class="aso-flex aso-flex-col w-1/4 aso-space-y-2">
                            <label class="aso-text-[12px] aso-text-[#444444]">Recaps Option Hover Text Color</label>
                            <div class="aso-relative aso-flex">
                                <input
                                    id="colorPicker"
                                    type="color"
                                    v-model="themes.colors.recaps.optionHoverTextColor"
                                    @input="updateRecapsOptionHoverTextColor"
                                    class="aso-w-9 aso-h-[30px]"
                                />
                                <input
                                    type="text"
                                    v-model="themes.colors.recaps.optionHoverTextColor"
                                    @input="updateRecapsOptionHoverTextColor"
                                    class="aso-p-1 aso-text-black aso-w-full aso-translate-y-0"
                                />
                            </div>
                        </div>
                        <div class="aso-flex aso-flex-col w-1/4 aso-space-y-2">
                            <label class="aso-text-[12px] aso-text-[#444444]">Recaps Option Text Color</label>
                            <div class="aso-relative aso-flex">
                                <input
                                    id="colorPicker"
                                    type="color"
                                    v-model="themes.colors.recaps.optionTextColor"
                                    @input="updateRecapsOptionTextColor"
                                    class="aso-w-9 aso-h-[30px]"
                                />
                                <input
                                    type="text"
                                    v-model="themes.colors.recaps.optionTextColor"
                                    @input="updateRecapsOptionTextColor"
                                    class="aso-p-1 aso-text-black aso-w-full aso-translate-y-0"
                                />
                            </div>
                        </div>
                        <div class="aso-flex aso-flex-col w-1/4 aso-space-y-2">
                            <label class="aso-text-[12px] aso-text-[#444444]">Recaps Option Border Color</label>
                            <div class="aso-relative aso-flex">
                                <input
                                    id="colorPicker"
                                    type="color"
                                    v-model="themes.colors.recaps.optionBorderColor"
                                    @input="updateRecapsOptionBorderColor"
                                    class="aso-w-9 aso-h-[30px]"
                                />
                                <input
                                    type="text"
                                    v-model="themes.colors.recaps.optionBorderColor"
                                    @input="updateRecapsOptionBorderColor"
                                    class="aso-p-1 aso-text-black aso-w-full aso-translate-y-0"
                                />
                            </div>
                        </div>
                        <div class="aso-flex aso-flex-col w-1/4 aso-space-y-2">
                            <label class="aso-text-[12px] aso-text-[#444444]">Recaps Option Border Hover Color</label>
                            <div class="aso-relative aso-flex">
                                <input
                                    id="colorPicker"
                                    type="color"
                                    v-model="themes.colors.recaps.optionHoverBorderColor"
                                    @input="updateRecapsOptionHoverBorderColor"
                                    class="aso-w-9 aso-h-[30px]"
                                />
                                <input
                                    type="text"
                                    v-model="themes.colors.recaps.optionBorderColor"
                                    @input="updateRecapsOptionHoverBorderColor"
                                    class="aso-p-1 aso-text-black aso-w-full aso-translate-y-0"
                                />
                            </div>
                        </div>
                        <div class="aso-flex aso-flex-col w-1/4 aso-space-y-2">
                            <label class="aso-text-[12px] aso-text-[#444444]">Button Finish Background Color</label>
                            <div class="aso-relative aso-flex">
                                <input
                                    id="colorPicker"
                                    type="color"
                                    v-model="themes.colors.recaps.buttonFinishBackgroundColor"
                                    @input="updateRecapsButtonFinishBackgroundColor"
                                    class="aso-w-9 aso-h-[30px]"
                                />
                                <input
                                    type="text"
                                    v-model="themes.colors.recaps.buttonFinishBackgroundColor"
                                    @input="updateRecapsButtonFinishBackgroundColor"
                                    class="aso-p-1 aso-text-black aso-w-full aso-translate-y-0"
                                />
                            </div>
                        </div>
                        <div class="aso-flex aso-flex-col w-1/4 aso-space-y-2">
                            <label class="aso-text-[12px] aso-text-[#444444]">Button Finish Hover Background Color</label>
                            <div class="aso-relative aso-flex">
                                <input
                                    id="colorPicker"
                                    type="color"
                                    v-model="themes.colors.recaps.buttonFinishHoverBackgroundColor"
                                    @input="updateRecapsButtonFinishHoverBackgroundColor"
                                    class="aso-w-9 aso-h-[30px]"
                                />
                                <input
                                    type="text"
                                    v-model="themes.colors.recaps.buttonFinishHoverBackgroundColor"
                                    @input="updateRecapsButtonFinishHoverBackgroundColor"
                                    class="aso-p-1 aso-text-black aso-w-full aso-translate-y-0"
                                />
                            </div>
                        </div>
                        <div class="aso-flex aso-flex-col w-1/4 aso-space-y-2">
                            <label class="aso-text-[12px] aso-text-[#444444]">Button Finish Text Color</label>
                            <div class="aso-relative aso-flex">
                                <input
                                    id="colorPicker"
                                    type="color"
                                    v-model="themes.colors.recaps.buttonFinishTextColor"
                                    @input="updateRecapsButtonFinishTextColor"
                                    class="aso-w-9 aso-h-[30px]"
                                />
                                <input
                                    type="text"
                                    v-model="themes.colors.recaps.buttonFinishTextColor"
                                    @input="updateRecapsButtonFinishTextColor"
                                    class="aso-p-1 aso-text-black aso-w-full aso-translate-y-0"
                                />
                            </div>
                        </div>
                        <div class="aso-flex aso-flex-col w-1/4 aso-space-y-2">
                            <label class="aso-text-[12px] aso-text-[#444444]">Button Finish Text Hover Color</label>
                            <div class="aso-relative aso-flex">
                                <input
                                    id="colorPicker"
                                    type="color"
                                    v-model="themes.colors.recaps.buttonFinishHoverTextColor"
                                    @input="updateRecapsButtonFinishHoverTextColor"
                                    class="aso-w-9 aso-h-[30px]"
                                />
                                <input
                                    type="text"
                                    v-model="themes.colors.recaps.buttonFinishHoverTextColor"
                                    @input="updateRecapsButtonFinishHoverTextColor"
                                    class="aso-p-1 aso-text-black aso-w-full aso-translate-y-0"
                                />
                            </div>
                        </div>
                        <div class="aso-flex aso-flex-col w-1/4 aso-space-y-2">
                            <label class="aso-text-[12px] aso-text-[#444444]">Button AddToCart Background Color</label>
                            <div class="aso-relative aso-flex">
                                <input
                                    id="colorPicker"
                                    type="color"
                                    v-model="themes.colors.recaps.buttonAddToCartBackgroundColor"
                                    @input="updateRecapsButtonAddToCartBackgroundColor"
                                    class="aso-w-9 aso-h-[30px]"
                                />
                                <input
                                    type="text"
                                    v-model="themes.colors.recaps.buttonAddToCartBackgroundColor"
                                    @input="updateRecapsButtonAddToCartBackgroundColor"
                                    class="aso-p-1 aso-text-black aso-w-full aso-translate-y-0"
                                />
                            </div>
                        </div>
                        <div class="aso-flex aso-flex-col w-1/4 aso-space-y-2">
                            <label class="aso-text-[12px] aso-text-[#444444]">Button AddToCart Hover Background Color</label>
                            <div class="aso-relative aso-flex">
                                <input
                                    id="colorPicker"
                                    type="color"
                                    v-model="themes.colors.recaps.buttonAddToCartHoverBackgroundColor"
                                    @input="updateRecapsButtonAddToCartHoverBackgroundColor"
                                    class="aso-w-9 aso-h-[30px]"
                                />
                                <input
                                    type="text"
                                    v-model="themes.colors.recaps.buttonAddToCartHoverBackgroundColor"
                                    @input="updateRecapsButtonAddToCartHoverBackgroundColor"
                                    class="aso-p-1 aso-text-black aso-w-full aso-translate-y-0"
                                />
                            </div>
                        </div>
                        <div class="aso-flex aso-flex-col w-1/4 aso-space-y-2">
                            <label class="aso-text-[12px] aso-text-[#444444]">Button AddToCart Text Color</label>
                            <div class="aso-relative aso-flex">
                                <input
                                    id="colorPicker"
                                    type="color"
                                    v-model="themes.colors.recaps.buttonAddToCartTextColor"
                                    @input="updateRecapsButtonAddToCartTextColor"
                                    class="aso-w-9 aso-h-[30px]"
                                />
                                <input
                                    type="text"
                                    v-model="themes.colors.recaps.buttonAddToCartTextColor"
                                    @input="updateRecapsButtonAddToCartTextColor"
                                    class="aso-p-1 aso-text-black aso-w-full aso-translate-y-0"
                                />
                            </div>
                        </div>
                        <div class="aso-flex aso-flex-col w-1/4 aso-space-y-2">
                            <label class="aso-text-[12px] aso-text-[#444444]">Button AddToCart Text Hover Color</label>
                            <div class="aso-relative aso-flex">
                                <input
                                    id="colorPicker"
                                    type="color"
                                    v-model="themes.colors.recaps.buttonAddToCartHoverTextColor"
                                    @input="updateRecapsButtonAddToCartHoverTextColor"
                                    class="aso-w-9 aso-h-[30px]"
                                />
                                <input
                                    type="text"
                                    v-model="themes.colors.recaps.buttonAddToCartHoverTextColor"
                                    @input="updateRecapsButtonAddToCartHoverTextColor"
                                    class="aso-p-1 aso-text-black aso-w-full aso-translate-y-0"
                                />
                            </div>
                        </div>
                        <div class="aso-flex aso-flex-col w-1/4 aso-space-y-2">
                            <label class="aso-text-[12px] aso-text-[#444444]">Button Edit Background Color</label>
                            <div class="aso-relative aso-flex">
                                <input
                                    id="colorPicker"
                                    type="color"
                                    v-model="themes.colors.recaps.buttonEditBackgroundColor"
                                    @input="updateRecapsButtonEditBackgroundColor"
                                    class="aso-w-9 aso-h-[30px]"
                                />
                                <input
                                    type="text"
                                    v-model="themes.colors.recaps.buttonEditBackgroundColor"
                                    @input="updateRecapsButtonEditBackgroundColor"
                                    class="aso-p-1 aso-text-black aso-w-full aso-translate-y-0"
                                />
                            </div>
                        </div>
                        <div class="aso-flex aso-flex-col w-1/4 aso-space-y-2">
                            <label class="aso-text-[12px] aso-text-[#444444]">Button Edit Hover Background Color</label>
                            <div class="aso-relative aso-flex">
                                <input
                                    id="colorPicker"
                                    type="color"
                                    v-model="themes.colors.recaps.buttonEditHoverBackgroundColor"
                                    @input="updateRecapsButtonEditHoverBackgroundColor"
                                    class="aso-w-9 aso-h-[30px]"
                                />
                                <input
                                    type="text"
                                    v-model="themes.colors.recaps.buttonEditHoverBackgroundColor"
                                    @input="updateRecapsButtonEditHoverBackgroundColor"
                                    class="aso-p-1 aso-text-black aso-w-full aso-translate-y-0"
                                />
                            </div>
                        </div>
                        <div class="aso-flex aso-flex-col w-1/4 aso-space-y-2">
                            <label class="aso-text-[12px] aso-text-[#444444]">Button Edit Text Color</label>
                            <div class="aso-relative aso-flex">
                                <input
                                    id="colorPicker"
                                    type="color"
                                    v-model="themes.colors.recaps.buttonEditTextColor"
                                    @input="updateRecapsButtonEditTextColor"
                                    class="aso-w-9 aso-h-[30px]"
                                />
                                <input
                                    type="text"
                                    v-model="themes.colors.recaps.buttonEditTextColor"
                                    @input="updateRecapsButtonEditTextColor"
                                    class="aso-p-1 aso-text-black aso-w-full aso-translate-y-0"
                                />
                            </div>
                        </div>
                        <div class="aso-flex aso-flex-col w-1/4 aso-space-y-2">
                            <label class="aso-text-[12px] aso-text-[#444444]">Button Edit Text Hover Color</label>
                            <div class="aso-relative aso-flex">
                                <input
                                    id="colorPicker"
                                    type="color"
                                    v-model="themes.colors.recaps.buttonEditHoverTextColor"
                                    @input="updateRecapsButtonEditHoverTextColor"
                                    class="aso-w-9 aso-h-[30px]"
                                />
                                <input
                                    type="text"
                                    v-model="themes.colors.recaps.buttonEditHoverTextColor"
                                    @input="updateRecapsButtonEditHoverTextColor"
                                    class="aso-p-1 aso-text-black aso-w-full aso-translate-y-0"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="dropdownColorsSections['recaps']" @click="dropdownColorsSections['recaps']=false" class="aso-flex aso-absolute aso-justify-center aso-items-center  aso-my-0 aso-right-8 aso-top-0 aso-shadow-md aso-rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="aso-w-6 aso-h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 18.75 7.5-7.5 7.5 7.5" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 7.5-7.5 7.5 7.5" />
                    </svg>
                </div>
                <div v-if="!dropdownColorsSections['recaps']" @click="dropdownColorsSections['recaps']=true" class="aso-flex aso-absolute aso-justify-center aso-items-center  aso-my-0 aso-right-8 aso-top-0 aso-shadow-md aso-rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="aso-w-6 aso-h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5" />
                    </svg>
                </div>
            </div>
        </div>
        <div v-show="state=='custom'" class="aso-w-full aso-h-full aso-translate-y-9">
            <div class="aso-p-4">
                <textarea name="" id="" placeholder="write your custom css here!!" v-model="themes.customCSS" cols="30" rows="10" class="placeholder:aso-italic placeholder:aso-text-slate-400 aso-w-full aso-h-full aso-rounded-none"></textarea>
            </div> 
        </div>
        <div class="aso-sticky aso-bottom-0 aso-bg-[#F8F9FB] aso-flex aso-space-x-4 aso-px-4 aso-py-3 aso-justify-end aso-items-end aso-translate-y-12">
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
const state = ref('skins');
const dropdownColorsSections = ref({
    canvas:true,
    price:false,
    helpButton:false,
    previewButton:false,
    resetButton:false,
    undoRedo:false,
    optionsSideBar:false,
    optionsModals:false,
    modalsOption:false,
    objectOptions:false,
    recaps:false,
})
const themes = ref({
    skin:"default",
    colors: {
        canvas:{
            backgroundColor:"#ffffff",
            borderColor:"#ffffff",
        },
        bars:{
            titleColor:"#000000",
            backgroundColor:"#ffffff",
            reset:{
                textColor:"#000000",
                hoverTextColor:"#dd3232",
                backgroundColor:"#ffffff",
                hoverBackgroundColor:"#f4f8fa",
                borderColor:"#ffffff",
                hoverBorderColor:"#f4f8fa",
                modalBackgroundColor:"#000000",
                modalContainerBackground:"#ffffff",
                modalTextColor:"#000000",
                modalYesButtonBackgroundColor:"#f4f8fa",
                modalYesButtonTextColor:"#000000",
                modalNoButtonBackgroundColor:"#dc2626",
                modalNoButtonTextColor:"#ffffff"
            },
            undoRedo:{
                textColor:"#000000",
                hoverTextColor:"#0374e3",
                backgroundColor:"#ffffff",
                hoverBackgroundColor:"#f4f8fa",
                borderColor:"#ffffff",
                hoverBorderColor:"#f4f8fa",
                disabledBackgroundColor:"#ffffff",
                disabledTextColor:"#c3cfd6"
            },
            preview:{
                textColor:"#000000",
                hoverTextColor:"#0374e3",
                backgroundColor:"#ffffff",
                hoverBackgroundColor:"#f4f8fa",
                borderColor:"#ffffff",
                hoverBorderColor:"#f4f8fa",
            },
            help:{
                textColor:"#ffffff",
                hoverTextColor:"#ffffff",
                backgroundColor:"#0374e3",
                hoverBackgroundColor:"#025db7",
                borderColor:"#0374e3",
                hoverBorderColor:"#025db7",
            },
            price:{
                backgroundColor:"#ffffff",
                textColor:"#000000",
                textAfterColor:"#000000",
                textBeforeColor:"#000000",
            },
        },
        optionsSideBar:{
            backgroundColor:"#eef3f6",
            scrollButtonsBackgroundColor:"#4a4a4a",
            scrollButtonsHoverBackgroundColor:"#74848d",
            scrollButtonsTextColor:"#ffffff",
            scrollButtonsHoverTextColor:"#ffffff",
            options:{
                buttons:{
                    backgroundColor:"#ffffff",
                    hoverBackgroundColor:"#ffffff",
                    textColor:"#000000",
                    hoverTextColor:"#000000"
                },
                modals:{
                    headerBackgroundColor:"#0374e3",
                    headerTextColor:"#ffffff",
                    textColor:"#ffffff",
                    backgroundColor:"#ffffff",
                    option:{
                        textColor:"#000000",
                        hoverBackgroundColor:"#eef3f6",
                        hoverTextColor:"#000000",
                        activeTextColor:"#0374e3",
                    },
                    buttons:{
                        backgroundColor:"#0374e3",
                        hoverBackgroundColor:"#3590ea",
                        textColor:"#ffffff",
                        hoverTextColor:"#ffffff"
                    }
                }
            }
        },
        objectsOptions:{
            backgroundColor:"#ffffff",
            edit:{
                buttonColor:"#ffffff",
                hoverButtonColor:"#787878",
                textColor:"#000000",
                hoverTextColor:"#ffffff"
            },
            clone:{
                buttonColor:"#ffffff",
                hoverButtonColor:"#787878",
                textColor:"#000000",
                hoverTextColor:"#ffffff"
            },
            delete:{
                buttonColor:"#ffffff",
                hoverButtonColor:"#787878",
                textColor:"#dd3232",
                hoverTextColor:"#dd3232"
            },
            center:{
                buttonColor:"#ffffff",
                hoverButtonColor:"#787878",
                textColor:"#000000",
                hoverTextColor:"#ffffff"
            }
        },
        recaps:{
            headerBackgroundColor:"#3590ea",
            headerTextColor:"#ffffff",
            backgroundColor:"#ffffff",
            optionTextColor:"#000000",
            optionHoverBackgroundColor:"#eef3f6",
            optionHoverTextColor:"#000000",
            optionBorderColor:"#eef3f6",
            optionHoverBorderColor:"#eef3f6",
            buttonFinishBackgroundColor:"#febd52",
            buttonFinishTextColor:"#14213d",
            buttonFinishHoverBackgroundColor:"#fcac29",
            buttonFinishHoverTextColor:"#313e52",
            buttonAddToCartBackgroundColor:"#febd52",
            buttonAddToCartHoverBackgroundColor:"#fcac29",
            buttonAddToCartTextColor:"#14213d",
            buttonAddToCartHoverTextColor:"#313e52",
            buttonEditBackgroundColor:"#0374e3",
            buttonEditHoverBackgroundColor:"#025db7",
            buttonEditTextColor:"#ffffff",
            buttonEditHoverTextColor:"#f4f8fa",
        }
    },
    customCSS:""
});
onMounted(async() => {
    isFetching.value = true;
    await fetchThemesSettings();
    isFetching.value = false
});
const fetchThemesSettings = async () => {
    const result = await api.getThemesSettings(configId.value);
    if(!result.message){
        const merge = {
            ...result,
            colors: {
                ...themes.value.colors,
                ...result.colors,
            }
        };
        themes.value = merge;
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

const updateCanvasBackgroundColorCodeHex = (event) => {
    if(event.target.value[0]!=='#'){
        event.target.value = '#'+ event.target.value;
    }
    themes.value.colors.canvas.backgroundColor = event.target.value;
}
const updateCanvasBorderColorCodeHex = (event) => {
    if(event.target.value[0]!=='#'){
        event.target.value = '#'+ event.target.value;
    }
    themes.value.colors.canvas.borderColor = event.target.value;
}
const updateBarsBackgroundColorCodeHex = (event) => {
    if(event.target.value[0]!=='#'){
        event.target.value = '#'+ event.target.value;
    }
    themes.value.colors.bars.backgroundColor = event.target.value;
}
const updateBarsTitleColorCodeHex = (event) => {
    if(event.target.value[0]!=='#'){
        event.target.value = '#'+ event.target.value;
    }
    themes.value.colors.bars.titleColor = event.target.value;
}
const updateBarsResetBackgroundColorCodeHex = (event) => {
    if(event.target.value[0]!=='#'){
        event.target.value = '#'+ event.target.value;
    }
    themes.value.colors.bars.reset.backgroundColor= event.target.value;
}
const updateBarsResetHoverBackgroundColorCodeHex = (event) => {
    if(event.target.value[0]!=='#'){
        event.target.value = '#'+ event.target.value;
    }
    themes.value.colors.bars.reset.hoverBackgroundColor= event.target.value;
}
const updateBarsResetTextColorCodeHex = (event) => {
    if(event.target.value[0]!=='#'){
        event.target.value = '#'+ event.target.value;
    }
    themes.value.colors.bars.reset.textColor= event.target.value;
}
const updateBarsResetHoverTextColorCodeHex = (event) => {
    if(event.target.value[0]!=='#'){
        event.target.value = '#'+ event.target.value;
    }
    themes.value.colors.bars.reset.hoverTextColor= event.target.value;
}
const updateBarsResetBorderColorCodeHex = (event) => {
    if(event.target.value[0]!=='#'){
        event.target.value = '#'+ event.target.value;
    }
    themes.value.colors.bars.reset.borderColor= event.target.value;
}
const updateBarsResetHoverBorderColorCodeHex = (event) => {
    if(event.target.value[0]!=='#'){
        event.target.value = '#'+ event.target.value;
    }
    themes.value.colors.bars.reset.hoverBorderColor= event.target.value;
}
const updateBarsResetModalBackgroundColorCodeHex = (event) => {
    if(event.target.value[0]!=='#'){
        event.target.value = '#'+ event.target.value;
    }
    themes.value.colors.bars.reset.modalBackgroundColor= event.target.value;
}
const updateBarsResetModalContainerBackgroundCodeHex = (event) => {
    if(event.target.value[0]!=='#'){
        event.target.value = '#'+ event.target.value;
    }
    themes.value.colors.bars.reset.modalContainerBackground= event.target.value;
}
const updateBarsResetModalTextColorCodeHex = (event) => {
    if(event.target.value[0]!=='#'){
        event.target.value = '#'+ event.target.value;
    }
    themes.value.colors.bars.reset.modalTextColor= event.target.value;
}
const updateBarsResetModalYesButtonBackgroundColorCodeHex = (event) => {
    if(event.target.value[0]!=='#'){
        event.target.value = '#'+ event.target.value;
    }
    themes.value.colors.bars.reset.modalYesButtonBackgroundColor= event.target.value;
}
const updateBarsResetModalYesButtonTextColorCodeHex = (event) => {
    if(event.target.value[0]!=='#'){
        event.target.value = '#'+ event.target.value;
    }
    themes.value.colors.bars.reset.modalYesButtonTextColor= event.target.value;
}
const updateBarsResetModalNoButtonBackgroundColorCodeHex = (event) => {
    if(event.target.value[0]!=='#'){
        event.target.value = '#'+ event.target.value;
    }
    themes.value.colors.bars.reset.modalNoButtonBackgroundColor= event.target.value;
}
const updateBarsResetModalNoButtonTextColorCodeHex = (event) => {
    if(event.target.value[0]!=='#'){
        event.target.value = '#'+ event.target.value;
    }
    themes.value.colors.bars.reset.modalNoButtonTextColor= event.target.value;
}
const updateBarsUndoRedoBackgroundColorCodeHex = (event) => {
    if(event.target.value[0]!=='#'){
        event.target.value = '#'+ event.target.value;
    }
    themes.value.colors.bars.undoRedo.backgroundColor= event.target.value;
}
const updateBarsUndoRedoHoverBackgroundColorCodeHex = (event) => {
    if(event.target.value[0]!=='#'){
        event.target.value = '#'+ event.target.value;
    }
    themes.value.colors.bars.undoRedo.hoverBackgroundColor= event.target.value;
}
const updateBarsUndoRedoTextColorCodeHex = (event) => {
    if(event.target.value[0]!=='#'){
        event.target.value = '#'+ event.target.value;
    }
    themes.value.colors.bars.undoRedo.textColor= event.target.value;
}
const updateBarsUndoRedoHoverTextColorCodeHex = (event) => {
    if(event.target.value[0]!=='#'){
        event.target.value = '#'+ event.target.value;
    }
    themes.value.colors.bars.undoRedo.hoverTextColor= event.target.value;
}
const updateBarsUndoRedoBorderColorCodeHex = (event) => {
    if(event.target.value[0]!=='#'){
        event.target.value = '#'+ event.target.value;
    }
    themes.value.colors.bars.undoRedo.borderColor= event.target.value;
}
const updateBarsUndoRedoHoverBorderColorCodeHex = (event) => {
    if(event.target.value[0]!=='#'){
        event.target.value = '#'+ event.target.value;
    }
    themes.value.colors.bars.undoRedo.hoverBorderColor= event.target.value;
}
const updateBarsPreviewBackgroundColorCodeHex = (event) => {
    if(event.target.value[0]!=='#'){
        event.target.value = '#'+ event.target.value;
    }
    themes.value.colors.bars.preview.backgroundColor= event.target.value;
}
const updateBarsPreviewHoverBackgroundColorCodeHex = (event) => {
    if(event.target.value[0]!=='#'){
        event.target.value = '#'+ event.target.value;
    }
    themes.value.colors.bars.preview.hoverBackgroundColor= event.target.value;
}
const updateBarsPreviewTextColorCodeHex = (event) => {
    if(event.target.value[0]!=='#'){
        event.target.value = '#'+ event.target.value;
    }
    themes.value.colors.bars.preview.textColor= event.target.value;
}
const updateBarsPreviewHoverTextColorCodeHex = (event) => {
    if(event.target.value[0]!=='#'){
        event.target.value = '#'+ event.target.value;
    }
    themes.value.colors.bars.preview.hoverTextColor= event.target.value;
}
const updateBarsPreviewBorderColorCodeHex = (event) => {
    if(event.target.value[0]!=='#'){
        event.target.value = '#'+ event.target.value;
    }
    themes.value.colors.bars.preview.borderColor= event.target.value;
}
const updateBarsPreviewHoverBorderColorCodeHex = (event) => {
    if(event.target.value[0]!=='#'){
        event.target.value = '#'+ event.target.value;
    }
    themes.value.colors.bars.preview.hoverBorderColor= event.target.value;
}
const updateBarsHelpBackgroundColorCodeHex = (event) => {
    if(event.target.value[0]!=='#'){
        event.target.value = '#'+ event.target.value;
    }
    themes.value.colors.bars.help.backgroundColor= event.target.value;
}
const updateBarsHelpHoverBackgroundColorCodeHex = (event) => {
    if(event.target.value[0]!=='#'){
        event.target.value = '#'+ event.target.value;
    }
    themes.value.colors.bars.help.hoverBackgroundColor= event.target.value;
}
const updateBarsHelpTextColorCodeHex = (event) => {
    if(event.target.value[0]!=='#'){
        event.target.value = '#'+ event.target.value;
    }
    themes.value.colors.bars.help.textColor= event.target.value;
}
const updateBarsHelpHoverTextColorCodeHex = (event) => {
    if(event.target.value[0]!=='#'){
        event.target.value = '#'+ event.target.value;
    }
    themes.value.colors.bars.help.hoverTextColor= event.target.value;
}
const updateBarsHelpBorderColorCodeHex = (event) => {
    if(event.target.value[0]!=='#'){
        event.target.value = '#'+ event.target.value;
    }
    themes.value.colors.bars.help.borderColor= event.target.value;
}
const updateBarsHelpHoverBorderColorCodeHex = (event) => {
    if(event.target.value[0]!=='#'){
        event.target.value = '#'+ event.target.value;
    }
    themes.value.colors.bars.help.hoverBorderColor= event.target.value;
}
const updateBarsPriceTextColorCodeHex = (event) => {
    if(event.target.value[0]!=='#'){
        event.target.value = '#'+ event.target.value;
    }
    themes.value.colors.bars.price.textColor= event.target.value;
}
const updateBarsPriceBackgroundColorCodeHex = (event) => {
    if(event.target.value[0]!=='#'){
        event.target.value = '#'+ event.target.value;
    }
    themes.value.colors.bars.price.backgroundColor= event.target.value;
}
const updateBarsPriceTextAfterColorCodeHex = (event) => {
    if(event.target.value[0]!=='#'){
        event.target.value = '#'+ event.target.value;
    }
    themes.value.colors.bars.price.textAfterColor= event.target.value;
}
const updateBarsPriceTextBeforeColorCodeHex = (event) => {
    if(event.target.value[0]!=='#'){
        event.target.value = '#'+ event.target.value;
    }
    themes.value.colors.bars.price.textBeforeColor= event.target.value;
}
const updateOptionsSideBarBackgroundColorCodeHex = (event) => {
    if(event.target.value[0]!=='#'){
        event.target.value = '#'+ event.target.value;
    }
    themes.value.colors.optionsSideBar.backgroundColor= event.target.value;
}
const updateOptionsSideBarScrollButtonsBackgroundColor = (event) => {
    if(event.target.value[0]!=='#'){
        event.target.value = '#'+ event.target.value;
    }
    themes.value.colors.optionsSideBar.scrollButtonsBackgroundColor= event.target.value;
}
const updateOptionsSideBarScrollButtonsHoverBackgroundColor = (event) => {
    if(event.target.value[0]!=='#'){
        event.target.value = '#'+ event.target.value;
    }
    themes.value.colors.optionsSideBar.scrollButtonsHoverBackgroundColor= event.target.value;
}
const updateOptionsSideBarScrollButtonsTextColor = (event) => {
    if(event.target.value[0]!=='#'){
        event.target.value = '#'+ event.target.value;
    }
    themes.value.colors.optionsSideBar.scrollButtonsTextColor= event.target.value;
}
const updateOptionsSideBarScrollButtonsHoverTextColor = (event) => {
    if(event.target.value[0]!=='#'){
        event.target.value = '#'+ event.target.value;
    }
    themes.value.colors.optionsSideBar.scrollButtonsHoverTextColor= event.target.value;
}
const updateOptionsSideBarOptionsButtonsBackgroundColor = (event) => {
    if(event.target.value[0]!=='#'){
        event.target.value = '#'+ event.target.value;
    }
    themes.value.colors.optionsSideBar.options.buttons.backgroundColor= event.target.value;
}
const updateOptionsSideBarOptionsButtonsHoverBackgroundColor = (event) => {
    if(event.target.value[0]!=='#'){
        event.target.value = '#'+ event.target.value;
    }
    themes.value.colors.optionsSideBar.options.buttons.hoverBackgroundColor= event.target.value;
}
const updateOptionsSideBarOptionsButtonsTextColor = (event) => {
    if(event.target.value[0]!=='#'){
        event.target.value = '#'+ event.target.value;
    }
    themes.value.colors.optionsSideBar.options.buttons.textColor= event.target.value;
}
const updateOptionsSideBarOptionsButtonsHoverTextColor = (event) => {
    if(event.target.value[0]!=='#'){
        event.target.value = '#'+ event.target.value;
    }
    themes.value.colors.optionsSideBar.options.buttons.hovertextColor= event.target.value;
}
const updateOptionsSideBarOptionsModalsOptionHoverBackgroundColor = (event) => {
    if(event.target.value[0]!=='#'){
        event.target.value = '#'+ event.target.value;
    }
    themes.value.colors.optionsSideBar.modals.option.hoverBackgroundColor= event.target.value;
}
const updateOptionsSideBarOptionsModalsOptionHoverTextColor = (event) => {
    if(event.target.value[0]!=='#'){
        event.target.value = '#'+ event.target.value;
    }
    themes.value.colors.optionsSideBar.modals.option.hoverTextColor= event.target.value;
}
const updateOptionsSideBarOptionsModalsOptionTextColor = (event) => {
    if(event.target.value[0]!=='#'){
        event.target.value = '#'+ event.target.value;
    }
    themes.value.colors.optionsSideBar.modals.option.textColor= event.target.value;
}
const updateOptionsSideBarOptionsModalsOptionActiveTextColor = (event) => {
    if(event.target.value[0]!=='#'){
        event.target.value = '#'+ event.target.value;
    }
    themes.value.colors.optionsSideBar.modals.option.activeTextColor= event.target.value;
}
const updateOptionsSideBarOptionsModalsButtonsBackgroundColor = (event) => {
    if(event.target.value[0]!=='#'){
        event.target.value = '#'+ event.target.value;
    }
    themes.value.colors.optionsSideBar.modals.buttons.backgroundColor= event.target.value;
}
const updateOptionsSideBarOptionsModalsButtonsHoverBackgroundColor = (event) => {
    if(event.target.value[0]!=='#'){
        event.target.value = '#'+ event.target.value;
    }
    themes.value.colors.optionsSideBar.modals.buttons.hoverBackgroundColor= event.target.value;
}
const updateOptionsSideBarOptionsModalsButtonsTextColor = (event) => {
    if(event.target.value[0]!=='#'){
        event.target.value = '#'+ event.target.value;
    }
    themes.value.colors.optionsSideBar.modals.buttons.textColor= event.target.value;
}
const updateOptionsSideBarOptionsModalsButtonsHoverTextColor = (event) => {
    if(event.target.value[0]!=='#'){
        event.target.value = '#'+ event.target.value;
    }
    themes.value.colors.optionsSideBar.modals.buttons.hovertextColor= event.target.value;
}
const updateOptionsSideBarOptionsModalsTextColor = (event) => {
    if(event.target.value[0]!=='#'){
        event.target.value = '#'+ event.target.value;
    }
    themes.value.colors.optionsSideBar.options.modals.textColor= event.target.value;
}
const updateOptionsSideBarOptionsModalsBackgroundColor = (event) => {
    if(event.target.value[0]!=='#'){
        event.target.value = '#'+ event.target.value;
    }
    themes.value.colors.optionsSideBar.options.modals.backgroundColor= event.target.value;
}
const updateOptionsSideBarOptionsModalsHeaderBackgroundColor = (event) => {
    if(event.target.value[0]!=='#'){
        event.target.value = '#'+ event.target.value;
    }
    themes.value.colors.optionsSideBar.options.modals.headerBackgroundColor= event.target.value;
}
const updateOptionsSideBarOptionsModalsHeaderTextColor = (event) => {
    if(event.target.value[0]!=='#'){
        event.target.value = '#'+ event.target.value;
    }
    themes.value.colors.optionsSideBar.options.modals.headerTextColor= event.target.value;
}
const updateObjectsOptionsCloneButtonColor = (event) => {
    if(event.target.value[0]!=='#'){
        event.target.value = '#'+ event.target.value;
    }
    themes.value.colors.objectsOptions.clone.buttonColor= event.target.value;
}
const updateObjectsOptionsCloneHoverButtonColor = (event) => {
    if(event.target.value[0]!=='#'){
        event.target.value = '#'+ event.target.value;
    }
    themes.value.colors.objectsOptions.clone.hoverButtonColor= event.target.value;
}
const updateObjectsOptionsCloneTextColor = (event) => {
    if(event.target.value[0]!=='#'){
        event.target.value = '#'+ event.target.value;
    }
    themes.value.colors.objectsOptions.clone.textColor= event.target.value;
}
const updateObjectsOptionsCloneHoverTextColor = (event) => {
    if(event.target.value[0]!=='#'){
        event.target.value = '#'+ event.target.value;
    }
    themes.value.colors.objectsOptions.clone.hoverTextColor= event.target.value;
}
const updateObjectsOptionsEditButtonColor = (event) => {
    if(event.target.value[0]!=='#'){
        event.target.value = '#'+ event.target.value;
    }
    themes.value.colors.objectsOptions.edit.buttonColor= event.target.value;
}
const updateObjectsOptionsEditHoverButtonColor = (event) => {
    if(event.target.value[0]!=='#'){
        event.target.value = '#'+ event.target.value;
    }
    themes.value.colors.objectsOptions.edit.hoverButtonColor= event.target.value;
}
const updateObjectsOptionsEditTextColor = (event) => {
    if(event.target.value[0]!=='#'){
        event.target.value = '#'+ event.target.value;
    }
    themes.value.colors.objectsOptions.edit.textColor= event.target.value;
}
const updateObjectsOptionsEditHoverTextColor = (event) => {
    if(event.target.value[0]!=='#'){
        event.target.value = '#'+ event.target.value;
    }
    themes.value.colors.objectsOptions.edit.hoverTextColor= event.target.value;
}
const updateObjectsOptionsDeleteButtonColor = (event) => {
    if(event.target.value[0]!=='#'){
        event.target.value = '#'+ event.target.value;
    }
    themes.value.colors.objectsOptions.delete.buttonColor= event.target.value;
}
const updateObjectsOptionsDeleteHoverButtonColor = (event) => {
    if(event.target.value[0]!=='#'){
        event.target.value = '#'+ event.target.value;
    }
    themes.value.colors.objectsOptions.delete.hoverButtonColor= event.target.value;
}
const updateObjectsOptionsDeleteTextColor = (event) => {
    if(event.target.value[0]!=='#'){
        event.target.value = '#'+ event.target.value;
    }
    themes.value.colors.objectsOptions.delete.textColor= event.target.value;
}
const updateObjectsOptionsDeleteHoverTextColor = (event) => {
    if(event.target.value[0]!=='#'){
        event.target.value = '#'+ event.target.value;
    }
    themes.value.colors.objectsOptions.delete.hoverTextColor= event.target.value;
}
const updateObjectsOptionsCenterButtonColor = (event) => {
    if(event.target.value[0]!=='#'){
        event.target.value = '#'+ event.target.value;
    }
    themes.value.colors.objectsOptions.center.buttonColor= event.target.value;
}
const updateObjectsOptionsCenterHoverButtonColor = (event) => {
    if(event.target.value[0]!=='#'){
        event.target.value = '#'+ event.target.value;
    }
    themes.value.colors.objectsOptions.center.hoverButtonColor= event.target.value;
}
const updateObjectsOptionsCenterTextColor = (event) => {
    if(event.target.value[0]!=='#'){
        event.target.value = '#'+ event.target.value;
    }
    themes.value.colors.objectsOptions.center.textColor= event.target.value;
}
const updateObjectsOptionsCenterHoverTextColor = (event) => {
    if(event.target.value[0]!=='#'){
        event.target.value = '#'+ event.target.value;
    }
    themes.value.colors.objectsOptions.center.hoverTextColor= event.target.value;
}
const updateRecapsButtonEditTextColor = (event) => {
    if(event.target.value[0]!=='#'){
        event.target.value = '#'+ event.target.value;
    }
    themes.value.colors.recaps.buttonEditTextColor= event.target.value;
}
const updateRecapsButtonEditHoverTextColor = (event) => {
    if(event.target.value[0]!=='#'){
        event.target.value = '#'+ event.target.value;
    }
    themes.value.colors.recaps.buttonEditHoverTextColor= event.target.value;
}
const updateRecapsButtonEditHoverBackgroundColor = (event) => {
    if(event.target.value[0]!=='#'){
        event.target.value = '#'+ event.target.value;
    }
    themes.value.colors.recaps.buttonEditHoverBackgroundColor= event.target.value;
}
const updateRecapsButtonEditBackgroundColor = (event) => {
    if(event.target.value[0]!=='#'){
        event.target.value = '#'+ event.target.value;
    }
    themes.value.colors.recaps.buttonEditBackgroundColor= event.target.value;
}
const updateRecapsButtonAddToCartTextColor = (event) => {
    if(event.target.value[0]!=='#'){
        event.target.value = '#'+ event.target.value;
    }
    themes.value.colors.recaps.buttonAddToCartTextColor= event.target.value;
}
const updateRecapsButtonAddToCartHoverTextColor = (event) => {
    if(event.target.value[0]!=='#'){
        event.target.value = '#'+ event.target.value;
    }
    themes.value.colors.recaps.buttonAddToCartHoverTextColor= event.target.value;
}
const updateRecapsButtonAddToCartHoverBackgroundColor = (event) => {
    if(event.target.value[0]!=='#'){
        event.target.value = '#'+ event.target.value;
    }
    themes.value.colors.recaps.buttonAddToCartHoverBackgroundColor= event.target.value;
}
const updateRecapsButtonAddToCartBackgroundColor = (event) => {
    if(event.target.value[0]!=='#'){
        event.target.value = '#'+ event.target.value;
    }
    themes.value.colors.recaps.buttonAddToCartBackgroundColor= event.target.value;
}
const updateRecapsButtonFinishTextColor = (event) => {
    if(event.target.value[0]!=='#'){
        event.target.value = '#'+ event.target.value;
    }
    themes.value.colors.recaps.buttonFinishTextColor= event.target.value;
}
const updateRecapsButtonFinishHoverTextColor = (event) => {
    if(event.target.value[0]!=='#'){
        event.target.value = '#'+ event.target.value;
    }
    themes.value.colors.recaps.buttonFinishHoverTextColor= event.target.value;
}
const updateRecapsButtonFinishHoverBackgroundColor = (event) => {
    if(event.target.value[0]!=='#'){
        event.target.value = '#'+ event.target.value;
    }
    themes.value.colors.recaps.buttonFinishHoverBackgroundColor= event.target.value;
}
const updateRecapsButtonFinishBackgroundColor = (event) => {
    if(event.target.value[0]!=='#'){
        event.target.value = '#'+ event.target.value;
    }
    themes.value.colors.recaps.buttonFinishBackgroundColor= event.target.value;
}
const updateRecapsOptionBorderColor = (event) => {
    if(event.target.value[0]!=='#'){
        event.target.value = '#'+ event.target.value;
    }
    themes.value.colors.recaps.optionBorderColor= event.target.value;
}
const updateRecapsOptionHoverBorderColor = (event) => {
    if(event.target.value[0]!=='#'){
        event.target.value = '#'+ event.target.value;
    }
    themes.value.colors.recaps.optionHoverBorderColor= event.target.value;
}
const updateRecapsOptionHoverBackgroundColor = (event) => {
    if(event.target.value[0]!=='#'){
        event.target.value = '#'+ event.target.value;
    }
    themes.value.colors.recaps.optionHoverBackgroundColor= event.target.value;
}
const updateRecapsOptionHoverTextColor = (event) => {
    if(event.target.value[0]!=='#'){
        event.target.value = '#'+ event.target.value;
    }
    themes.value.colors.recaps.optionHoverTextColor= event.target.value;
}
const updateRecapsOptionTextColor = (event) => {
    if(event.target.value[0]!=='#'){
        event.target.value = '#'+ event.target.value;
    }
    themes.value.colors.recaps.optionTextColor= event.target.value;
}
const updateRecapsHeaderBackgroundColor = (event) => {
    if(event.target.value[0]!=='#'){
        event.target.value = '#'+ event.target.value;
    }
    themes.value.colors.recaps.headerBackgroundColor= event.target.value;
}
const updateRecapsHeaderTextColor = (event) => {
    if(event.target.value[0]!=='#'){
        event.target.value = '#'+ event.target.value;
    }
    themes.value.colors.recaps.headerTextColor= event.target.value;
}
const updateRecapsBackgroundColor = (event) => {
    if(event.target.value[0]!=='#'){
        event.target.value = '#'+ event.target.value;
    }
    themes.value.colors.recaps.backgroundColor= event.target.value;
}


</script>

