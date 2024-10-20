<template>
    <div v-if="!isFetching" class="asowp-space-y-1 asowp-sticky asowp-top-[124px] asowp-z-[999] asowp-w-full asowp-shadow-md asowp-flex asowp-justify-center asowp-items-center asowp-bg-[#F4F4F4] asowp-translate-y-2">
        <div class="asowp-bg-[#F4F4F4] asowp-p-2 asowp-space-x-6 asowp-justify-center asowp-items-center asowp-flex">
            <button @click="state='skins'" :class="`asowp-flex asowp-text-[12px] asowp-px-6 asowp-p-2 asowp-w-fit asowp-h-fit asowp-bg-white asowp-rounded asowp-border-none asowp-text-black asowp-font-semibold ${ state == 'skins' ?'asowp-font-bold asowp-text-[#016464] asowp-bg-[#E1E1E1]':''} hover:asowp-bg-[#E1E1E1] hover:asowp-text-[#016464] asowp-cursor-pointer`" >Choose Skin</button>
            <button @click="state='colors'" :class="`asowp-flex asowp-text-[12px] asowp-px-6 asowp-p-2 asowp-w-fit asowp-h-fit asowp-bg-white asowp-rounded asowp-border-none asowp-text-black asowp-font-semibold ${ state == 'colors' ?'asowp-font-bold asowp-text-[#016464] asowp-bg-[#E1E1E1]':''} hover:asowp-bg-[#E1E1E1] hover:asowp-text-[#016464] asowp-cursor-pointer`" >Colors</button>
            <button @click="state='custom'" :class="`asowp-flex asowp-text-[12px] asowp-px-6 asowp-p-2 asowp-w-fit asowp-h-fit asowp-bg-white asowp-rounded asowp-border-none asowp-text-black asowp-font-semibold ${ state == 'custom' ?'asowp-font-bold asowp-text-[#016464] asowp-bg-[#E1E1E1]':''} hover:asowp-bg-[#E1E1E1] hover:asowp-text-[#016464] asowp-cursor-pointer`" >Custom CSS</button>
        </div>
    </div>
    <div v-if="isFetching" class="asowp-bg-white asowp-border-solid asowp-border asowp-border-[#D1D1D1] asowp-flex asowp-flex-col asowp-space-y-2 asowp-justify-center asowp-items-center asowp-w-full asowp-h-[306px] p-4">
        <img class="asowp-w-[200px] asowp-h-[200px]" src="../../../../../../assets/icons/ic_loading.svg" alt="">
    </div>
    <div v-if="!isFetching">
        <div class="" v-show="state=='skins'">
            <div class="asowp-bg-[#F8F9FB] asowp-px-8 asowp-py-8 asowp-space-y-6">
                <h3 class="asowp-text-[16px]">Choose your customizer appearance</h3>
                <div class="asowp-p-6">
                    <div class="asowp-flex asowp-justify-evenly asowp-items-center">
                        <div class="asowp-flex-col asowp-space-y-4 asowp-px-2 asowp-rounded asowp-w-[320px]" :class="themes.skin == 'default' ? 'asowp-ring-2 asowp-ring-[#016464]' : ''">
                            <input type="radio" id="default" name="skin" value="default" v-model="themes.skin" class="asowp-invisible">
                            <label for="default">
                                <div class="asowp-w-full asowp-h-[200px] asowp-relative asowp-flex asowp-justify-center asowp-items-center">
                                    <img src="../../../../../../assets/images/skin-default.png" alt="Image 1" class="asowp-w-auto asowp-h-full asowp-cursor-pointer asowp-absolute">
                                </div>
                                <div class="asowp-flex asowp-items-center asowp-justify-between asowp-bg-white asowp-rounded-b">
                                   <label for="default" class="asowp-text-base asowp-font-semibold asowp-text-black">Default skin</label>
                                    <input type="radio" id="default" name="skin-1" value="default" v-model="themes.skin" :checked="themes.skin == 'default'">
                                </div>
                            </label>
                        </div>
                        <div class="asowp-flex-col asowp-space-y-4 asowp-px-2 asowp-rounded asowp-w-[320px]" :class="themes.skin == 'couffo' ? 'asowp-ring-2 asowp-ring-[#016464]' : ''">
                            <input type="radio" id="couffo" name="skin" value="couffo" v-model="themes.skin" class="asowp-invisible">
                            <label for="couffo">
                                <div class="asowp-w-full asowp-h-[200px] asowp-relative asowp-flex asowp-justify-center asowp-items-center">
                                    <img src="../../../../../../assets/images/skin-couffo.png" alt="Image 1" class="asowp-w-auto asowp-h-full asowp-cursor-pointer asowp-absolute">
                                </div>
                                <div class="asowp-flex asowp-items-center asowp-justify-between asowp-bg-white asowp-rounded-b">
                                    <label for="couffo" class="asowp-text-base asowp-font-semibold asowp-text-black">Couffo Skin</label>
                                    <input type="radio" id="couffo" name="skin-2" value="couffo" v-model="themes.skin" :checked="themes.skin == 'couffo'">
                                </div>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-show="state=='colors'" class="asowp-bg-[#F8F9FB] asowp-py-6">
            <div class="asowp-bg-[#F8F9FB] asowp-px-8 asowp-pt-8 asowp-space-y-6 asowp-relative" >
                <div class="asowp-flex asowp-space-x-4">
                    <h2 class="asowp-text-[15px] asowp-font-bold">Canvas{{ themes.skin == "default" ? ', Header and Side Bars' : ', Header and Bottom Bars' }}</h2>
                </div>
                <div class="asowp-flex asowp-justify-between" v-show="dropdownColorsSections['canvas']">
                    <div class="asowp-flex asowp-flex-col asowp-w-2/5 asowp-space-y-2">
                        <label class="asowp-text-[12px] asowp-text-[#444444]">Canvas Background Color</label>
                        <div class="asowp-relative asowp-flex">
                            <input
                                id="colorPicker"
                                type="color"
                                v-model="themes.colors.canvas.backgroundColor"
                                @input="updateCanvasBackgroundColorCodeHex"
                                class="asowp-w-9 asowp-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.canvas.backgroundColor"
                                @input="updateCanvasBackgroundColorCodeHex"
                                class="asowp-p-1 asowp-text-black asowp-w-full asowp-translate-y-0"
                            />
                        </div>
                    </div>
                    <div class="asowp-flex asowp-flex-col asowp-w-2/5 asowp-space-y-2">
                        <label class="asowp-text-[12px] asowp-text-[#444444]">Canvas Border Color</label>
                        <div class="asowp-relative asowp-flex">
                            <input
                                id="colorPicker"
                                type="color"
                                v-model="themes.colors.canvas.borderColor"
                                @input="updateCanvasBorderColorCodeHex"
                                class="asowp-w-9 asowp-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.canvas.borderColor"
                                @input="updateCanvasBorderColorCodeHex"
                                class="asowp-p-1 asowp-text-black asowp-w-full asowp-translate-y-0"
                            />
                        </div>
                    </div>
                </div>
                <div class="asowp-flex asowp-justify-between" v-show="dropdownColorsSections['canvas']">
                    <div class="asowp-flex asowp-flex-col asowp-w-2/5 asowp-space-y-2">
                        <label class="asowp-text-[12px] asowp-text-[#444444]">Bars Background Color</label>
                        <div class="asowp-relative asowp-flex">
                            <input
                                id="colorPicker"
                                type="color"
                                v-model="themes.colors.bars.backgroundColor"
                                @input="updateBarsBackgroundColorCodeHex"
                                class="asowp-w-9 asowp-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.bars.backgroundColor"
                                @input="updateBarsBackgroundColorCodeHex"
                                class="asowp-p-1 asowp-text-black asowp-w-full asowp-translate-y-0"
                            />
                        </div>
                    </div>
                    <div class="asowp-flex asowp-flex-col asowp-w-2/5 asowp-space-y-2">
                        <label class="asowp-text-[12px] asowp-text-[#444444]">Bars Title Color</label>
                        <div class="asowp-relative asowp-flex">
                            <input
                                id="colorPicker"
                                type="color"
                                v-model="themes.colors.bars.titleColor"
                                @input="updateBarsTitleColorCodeHex"
                                class="asowp-w-9 asowp-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.bars.titleColor"
                                @input="updateBarsTitleColorCodeHex"
                                class="asowp-p-1 asowp-text-black asowp-w-full asowp-translate-y-0"
                            />
                        </div>
                    </div>
                </div>
                <div v-if="dropdownColorsSections['canvas']" @click="dropdownColorsSections['canvas']=false" class="asowp-flex asowp-absolute asowp-justify-center asowp-items-center  asowp-my-0 asowp-right-8 asowp-top-0 asowp-shadow-md asowp-rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="asowp-w-6 asowp-h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 18.75 7.5-7.5 7.5 7.5" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 7.5-7.5 7.5 7.5" />
                    </svg>
                </div>
                <div v-if="!dropdownColorsSections['canvas']" @click="dropdownColorsSections['canvas']=true" class="asowp-flex asowp-absolute asowp-justify-center asowp-items-center  asowp-my-0 asowp-right-8 asowp-top-0 asowp-shadow-md asowp-rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="asowp-w-6 asowp-h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5" />
                    </svg>
                </div>
            </div>
            <div class="asowp-bg-[#F8F9FB] asowp-px-8 asowp-pt-8 asowp-space-y-6 asowp-relative">
                <div class="asowp-flex asowp-space-x-4">
                    <h2 class="asowp-text-[15px] asowp-font-bold">Price Section</h2>
                </div>
                <div class="asowp-grid asowp-grid-cols-2 w-full gap-4 asowp-justify-between asowp-items-center" v-if="dropdownColorsSections['price']">
                    <div class="asowp-flex asowp-flex-col w-1/4 asowp-space-y-2">
                        <label class="asowp-text-[12px] asowp-text-[#444444]">Background Color</label>
                        <div class="asowp-relative asowp-flex">
                            <input
                                id="colorPicker"
                                type="color"
                                v-model="themes.colors.bars.price.backgroundColor"
                                @input="updateBarsPriceBackgroundColorCodeHex"
                                class="asowp-w-9 asowp-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.bars.price.backgroundColor"
                                @input="updateBarsPriceBackgroundColorCodeHex"
                                class="asowp-p-1 asowp-text-black asowp-w-full asowp-translate-y-0"
                            />
                        </div>
                    </div>
                    <div class="asowp-flex asowp-flex-col w-1/4 asowp-space-y-2">
                        <label class="asowp-text-[12px] asowp-text-[#444444]">Text Color</label>
                        <div class="asowp-relative asowp-flex">
                            <input
                                id="colorPicker"
                                type="color"
                                v-model="themes.colors.bars.price.textColor"
                                @input="updateBarsPriceTextColorCodeHex"
                                class="asowp-w-9 asowp-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.bars.price.textColor"
                                @input="updateBarsPriceTextColorCodeHex"
                                class="asowp-p-1 asowp-text-black asowp-w-full asowp-translate-y-0"
                            />
                        </div>
                    </div>
                    <div class="asowp-flex asowp-flex-col w-1/4 asowp-space-y-2">
                        <label class="asowp-text-[12px] asowp-text-[#444444]">Text Before Price</label>
                        <div class="asowp-relative asowp-flex">
                            <input
                                id="colorPicker"
                                type="color"
                                v-model="themes.colors.bars.price.textBeforeColor"
                                @input="updateBarsPriceTextBeforeColorCodeHex"
                                class="asowp-w-9 asowp-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.bars.price.textBeforeColor"
                                @input="updateBarsPriceTextBeforeColorCodeHex"
                                class="asowp-p-1 asowp-text-black asowp-w-full asowp-translate-y-0"
                            />
                        </div>
                    </div>
                    <div class="asowp-flex asowp-flex-col w-1/4 asowp-space-y-2">
                        <label class="asowp-text-[12px] asowp-text-[#444444]">Text After Price Color</label>
                        <div class="asowp-relative asowp-flex">
                            <input
                                id="colorPicker"
                                type="color"
                                v-model="themes.colors.bars.price.textAfterColor"
                                @input="updateBarsPriceTextAfterColorCodeHex"
                                class="asowp-w-9 asowp-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.bars.price.textAfterColor"
                                @input="updateBarsPriceTextAfterColorCodeHex"
                                class="asowp-p-1 asowp-text-black asowp-w-full asowp-translate-y-0"
                            />
                        </div>
                    </div>
                </div>
                <div v-if="dropdownColorsSections['price']" @click="dropdownColorsSections['price']=false" class="asowp-flex asowp-absolute asowp-justify-center asowp-items-center  asowp-my-0 asowp-right-8 asowp-top-0 asowp-shadow-md asowp-rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="asowp-w-6 asowp-h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 18.75 7.5-7.5 7.5 7.5" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 7.5-7.5 7.5 7.5" />
                    </svg>
                </div>
                <div v-if="!dropdownColorsSections['price']" @click="dropdownColorsSections['price']=true" class="asowp-flex asowp-absolute asowp-justify-center asowp-items-center  asowp-my-0 asowp-right-8 asowp-top-0 asowp-shadow-md asowp-rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="asowp-w-6 asowp-h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5" />
                    </svg>
                </div>
            </div>
            <div class="asowp-bg-[#F8F9FB] asowp-px-8 asowp-pt-8 asowp-space-y-6 asowp-relative">
                <div class="asowp-flex asowp-space-x-4">
                    <h2 class="asowp-text-[15px] asowp-font-bold">Reset Button</h2>
                </div>
                <div class="asowp-grid asowp-grid-cols-4 w-full gap-4 asowp-justify-between asowp-items-center" v-if="dropdownColorsSections['resetButton']">
                    <div class="asowp-flex asowp-flex-col w-1/4 asowp-space-y-2">
                        <label class="asowp-text-[12px] asowp-text-[#444444]">Background Color</label>
                        <div class="asowp-relative asowp-flex">
                            <input
                                id="colorPicker"
                                type="color"
                                v-model="themes.colors.bars.reset.backgroundColor"
                                @input="updateBarsResetBackgroundColorCodeHex"
                                class="asowp-w-9 asowp-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.bars.reset.backgroundColor"
                                @input="updateBarsResetBackgroundColorCodeHex"
                                class="asowp-p-1 asowp-text-black asowp-w-full asowp-translate-y-0"
                            />
                        </div>
                    </div>
                    <div class="asowp-flex asowp-flex-col w-1/4 asowp-space-y-2">
                        <label class="asowp-text-[12px] asowp-text-[#444444]">Hover Background Color</label>
                        <div class="asowp-relative asowp-flex">
                            <input
                                id="colorPicker"
                                type="color"
                                v-model="themes.colors.bars.reset.hoverBackgroundColor"
                                @input="updateBarsResetHoverBackgroundColorCodeHex"
                                class="asowp-w-9 asowp-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.bars.reset.hoverBackgroundColor"
                                @input="updateBarsResetHoverBackgroundColorCodeHex"
                                class="asowp-p-1 asowp-text-black asowp-w-full asowp-translate-y-0"
                            />
                        </div>
                    </div>
                    <div class="asowp-flex asowp-flex-col w-1/4 asowp-space-y-2">
                        <label class="asowp-text-[12px] asowp-text-[#444444]">Text Color</label>
                        <div class="asowp-relative asowp-flex">
                            <input
                                id="colorPicker"
                                type="color"
                                v-model="themes.colors.bars.reset.textColor"
                                @input="updateBarsResetTextColorCodeHex"
                                class="asowp-w-9 asowp-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.bars.reset.textColor"
                                @input="updateBarsResetTextColorCodeHex"
                                class="asowp-p-1 asowp-text-black asowp-w-full asowp-translate-y-0"
                            />
                        </div>
                    </div>
                    <div class="asowp-flex asowp-flex-col w-1/4 asowp-space-y-2">
                        <label class="asowp-text-[12px] asowp-text-[#444444]">Hover Text Color</label>
                        <div class="asowp-relative asowp-flex">
                            <input
                                id="colorPicker"
                                type="color"
                                v-model="themes.colors.bars.reset.hoverTextColor"
                                @input="updateBarsResetHoverTextColorCodeHex"
                                class="asowp-w-9 asowp-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.bars.reset.hoverTextColor"
                                @input="updateBarsResetHoverTextColorCodeHex"
                                class="asowp-p-1 asowp-text-black asowp-w-full asowp-translate-y-0"
                            />
                        </div>
                    </div>
                    <div class="asowp-flex asowp-flex-col w-1/4 asowp-space-y-2">
                        <label class="asowp-text-[12px] asowp-text-[#444444]">Border Color</label>
                        <div class="asowp-relative asowp-flex">
                            <input
                                id="colorPicker"
                                type="color"
                                v-model="themes.colors.bars.reset.borderColor"
                                @input="updateBarsResetBorderColorCodeHex"
                                class="asowp-w-9 asowp-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.bars.reset.borderColor"
                                @input="updateBarsResetBorderColorCodeHex"
                                class="asowp-p-1 asowp-text-black asowp-w-full asowp-translate-y-0"
                            />
                        </div>
                    </div>
                    <div class="asowp-flex asowp-flex-col w-1/4 asowp-space-y-2">
                        <label class="asowp-text-[12px] asowp-text-[#444444]">Hover Border Color</label>
                        <div class="asowp-relative asowp-flex">
                            <input
                                id="colorPicker"
                                type="color"
                                v-model="themes.colors.bars.reset.hoverBorderColor"
                                @input="updateBarsResetHoverBorderColorCodeHex"
                                class="asowp-w-9 asowp-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.bars.reset.hoverBorderColor"
                                @input="updateBarsResetHoverBorderColorCodeHex"
                                class="asowp-p-1 asowp-text-black asowp-w-full asowp-translate-y-0"
                            />
                        </div>
                    </div>
                    <div class="asowp-flex asowp-flex-col w-1/4 asowp-space-y-2">
                        <label class="asowp-text-[12px] asowp-text-[#444444]">Modal Background Color</label>
                        <div class="asowp-relative asowp-flex">
                            <input
                                id="colorPicker"
                                type="color"
                                v-model="themes.colors.bars.reset.modalBackgroundColor"
                                @input="updateBarsResetModalBackgroundColorCodeHex"
                                class="asowp-w-9 asowp-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.bars.reset.modalBackgroundColor"
                                @input="updateBarsResetModalBackgroundColorCodeHex"
                                class="asowp-p-1 asowp-text-black asowp-w-full asowp-translate-y-0"
                            />
                        </div>
                    </div>
                    <div class="asowp-flex asowp-flex-col w-1/4 asowp-space-y-2">
                        <label class="asowp-text-[12px] asowp-text-[#444444]">Container Modal Color</label>
                        <div class="asowp-relative asowp-flex">
                            <input
                                id="colorPicker"
                                type="color"
                                v-model="themes.colors.bars.reset.modalContainerBackground"
                                @input="updateBarsResetModalContainerBackgroundCodeHex"
                                class="asowp-w-9 asowp-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.bars.reset.modalContainerBackground"
                                @input="updateBarsResetModalContainerBackgroundCodeHex"
                                class="asowp-p-1 asowp-text-black asowp-w-full asowp-translate-y-0"
                            />
                        </div>
                    </div>
                    <div class="asowp-flex asowp-flex-col w-1/4 asowp-space-y-2">
                        <label class="asowp-text-[12px] asowp-text-[#444444]">Modal Text Color</label>
                        <div class="asowp-relative asowp-flex">
                            <input
                                id="colorPicker"
                                type="color"
                                v-model="themes.colors.bars.reset.modalTextColor"
                                @input="updateBarsResetModalTextColorCodeHex"
                                class="asowp-w-9 asowp-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.bars.reset.modalTextColor"
                                @input="updateBarsResetModalTextColorCodeHex"
                                class="asowp-p-1 asowp-text-black asowp-w-full asowp-translate-y-0"
                            />
                        </div>
                    </div>
                    <div class="asowp-flex asowp-flex-col w-1/4 asowp-space-y-2">
                        <label class="asowp-text-[12px] asowp-text-[#444444]">Yes Background Color</label>
                        <div class="asowp-relative asowp-flex">
                            <input
                                id="colorPicker"
                                type="color"
                                v-model="themes.colors.bars.reset.modalYesButtonBackgroundColor"
                                @input="updateBarsResetModalYesButtonBackgroundColorCodeHex"
                                class="asowp-w-9 asowp-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.bars.reset.modalYesButtonBackgroundColor"
                                @input="updateBarsResetModalYesButtonBackgroundColorCodeHex"
                                class="asowp-p-1 asowp-text-black asowp-w-full asowp-translate-y-0"
                            />
                        </div>
                    </div>
                    <div class="asowp-flex asowp-flex-col w-1/4 asowp-space-y-2">
                        <label class="asowp-text-[12px] asowp-text-[#444444]">Yes Text Color</label>
                        <div class="asowp-relative asowp-flex">
                            <input
                                id="colorPicker"
                                type="color"
                                v-model="themes.colors.bars.reset.modalYesButtonTextColor"
                                @input="updateBarsResetModalYesButtonTextColorCodeHex"
                                class="asowp-w-9 asowp-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.bars.reset.modalYesButtonTextColor"
                                @input="updateBarsResetModalYesButtonTextColorCodeHex"
                                class="asowp-p-1 asowp-text-black asowp-w-full asowp-translate-y-0"
                            />
                        </div>
                    </div>
                    <div class="asowp-flex asowp-flex-col w-1/4 asowp-space-y-2">
                        <label class="asowp-text-[12px] asowp-text-[#444444]">No Background Color</label>
                        <div class="asowp-relative asowp-flex">
                            <input
                                id="colorPicker"
                                type="color"
                                v-model="themes.colors.bars.reset.modalNoButtonBackgroundColor"
                                @input="updateBarsResetModalNoButtonBackgroundColorCodeHex"
                                class="asowp-w-9 asowp-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.bars.reset.modalNoButtonBackgroundColor"
                                @input="updateBarsResetModalNoButtonBackgroundColorCodeHex"
                                class="asowp-p-1 asowp-text-black asowp-w-full asowp-translate-y-0"
                            />
                        </div>
                    </div>
                    <div class="asowp-flex asowp-flex-col w-1/4 asowp-space-y-2">
                        <label class="asowp-text-[12px] asowp-text-[#444444]">No Text Color</label>
                        <div class="asowp-relative asowp-flex">
                            <input
                                id="colorPicker"
                                type="color"
                                v-model="themes.colors.bars.reset.modalNoButtonTextColor"
                                @input="updateBarsResetModalNoButtonTextColorCodeHex"
                                class="asowp-w-9 asowp-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.bars.reset.modalNoButtonTextColor"
                                @input="updateBarsResetModalNoButtonTextColorCodeHex"
                                class="asowp-p-1 asowp-text-black asowp-w-full asowp-translate-y-0"
                            />
                        </div>
                    </div>
                </div>
                <div v-if="dropdownColorsSections['resetButton']" @click="dropdownColorsSections['resetButton']=false" class="asowp-flex asowp-absolute asowp-justify-center asowp-items-center  asowp-my-0 asowp-right-8 asowp-top-0 asowp-shadow-md asowp-rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="asowp-w-6 asowp-h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 18.75 7.5-7.5 7.5 7.5" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 7.5-7.5 7.5 7.5" />
                    </svg>
                </div>
                <div v-if="!dropdownColorsSections['resetButton']" @click="dropdownColorsSections['resetButton']=true" class="asowp-flex asowp-absolute asowp-justify-center asowp-items-center  asowp-my-0 asowp-right-8 asowp-top-0 asowp-shadow-md asowp-rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="asowp-w-6 asowp-h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5" />
                    </svg>
                </div>
            </div>
            <div class="asowp-bg-[#F8F9FB] asowp-px-8 asowp-pt-8 asowp-space-y-6 asowp-relative">
                <div class="asowp-flex asowp-space-x-4">
                    <h2 class="asowp-text-[15px] asowp-font-bold">Undo and Redo Button</h2>
                </div>
                <div class="asowp-grid asowp-grid-cols-3 w-full gap-4 asowp-justify-between asowp-items-center" v-if="dropdownColorsSections['undoRedo']">
                    <div class="asowp-flex asowp-flex-col w-1/4 asowp-space-y-2">
                        <label class="asowp-text-[12px] asowp-text-[#444444]">Background Color</label>
                        <div class="asowp-relative asowp-flex">
                            <input
                                id="colorPicker"
                                type="color"
                                v-model="themes.colors.bars.undoRedo.backgroundColor"
                                @input="updateBarsUndoRedoBackgroundColorCodeHex"
                                class="asowp-w-9 asowp-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.bars.undoRedo.backgroundColor"
                                @input="updateBarsUndoRedoBackgroundColorCodeHex"
                                class="asowp-p-1 asowp-text-black asowp-w-full asowp-translate-y-0"
                            />
                        </div>
                    </div>
                    <div class="asowp-flex asowp-flex-col w-1/4 asowp-space-y-2">
                        <label class="asowp-text-[12px] asowp-text-[#444444]">Hover Background Color</label>
                        <div class="asowp-relative asowp-flex">
                            <input
                                id="colorPicker"
                                type="color"
                                v-model="themes.colors.bars.undoRedo.hoverBackgroundColor"
                                @input="updateBarsUndoRedoHoverBackgroundColorCodeHex"
                                class="asowp-w-9 asowp-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.bars.undoRedo.hoverBackgroundColor"
                                @input="updateBarsUndoRedoHoverBackgroundColorCodeHex"
                                class="asowp-p-1 asowp-text-black asowp-w-full asowp-translate-y-0"
                            />
                        </div>
                    </div>
                    <div class="asowp-flex asowp-flex-col w-1/4 asowp-space-y-2">
                        <label class="asowp-text-[12px] asowp-text-[#444444]">Text Color</label>
                        <div class="asowp-relative asowp-flex">
                            <input
                                id="colorPicker"
                                type="color"
                                v-model="themes.colors.bars.undoRedo.textColor"
                                @input="updateBarsUndoRedoTextColorCodeHex"
                                class="asowp-w-9 asowp-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.bars.undoRedo.textColor"
                                @input="updateBarsUndoRedoTextColorCodeHex"
                                class="asowp-p-1 asowp-text-black asowp-w-full asowp-translate-y-0"
                            />
                        </div>
                    </div>
                    <div class="asowp-flex asowp-flex-col w-1/4 asowp-space-y-2">
                        <label class="asowp-text-[12px] asowp-text-[#444444]">Hover Text Color</label>
                        <div class="asowp-relative asowp-flex">
                            <input
                                id="colorPicker"
                                type="color"
                                v-model="themes.colors.bars.undoRedo.hoverTextColor"
                                @input="updateBarsUndoRedoHoverTextColorCodeHex"
                                class="asowp-w-9 asowp-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.bars.undoRedo.hoverTextColor"
                                @input="updateBarsUndoRedoHoverTextColorCodeHex"
                                class="asowp-p-1 asowp-text-black asowp-w-full asowp-translate-y-0"
                            />
                        </div>
                    </div>
                    <div class="asowp-flex asowp-flex-col w-1/4 asowp-space-y-2">
                        <label class="asowp-text-[12px] asowp-text-[#444444]">Border Color</label>
                        <div class="asowp-relative asowp-flex">
                            <input
                                id="colorPicker"
                                type="color"
                                v-model="themes.colors.bars.undoRedo.borderColor"
                                @input="updateBarsUndoRedoBorderColorCodeHex"
                                class="asowp-w-9 asowp-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.bars.undoRedo.borderColor"
                                @input="updateBarsUndoRedoBorderColorCodeHex"
                                class="asowp-p-1 asowp-text-black asowp-w-full asowp-translate-y-0"
                            />
                        </div>
                    </div>
                    <div class="asowp-flex asowp-flex-col w-1/4 asowp-space-y-2">
                        <label class="asowp-text-[12px] asowp-text-[#444444]">Hover Border Color</label>
                        <div class="asowp-relative asowp-flex">
                            <input
                                id="colorPicker"
                                type="color"
                                v-model="themes.colors.bars.undoRedo.hoverBorderColor"
                                @input="updateBarsUndoRedoHoverBorderColorCodeHex"
                                class="asowp-w-9 asowp-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.bars.undoRedo.hoverBorderColor"
                                @input="updateBarsUndoRedoHoverBorderColorCodeHex"
                                class="asowp-p-1 asowp-text-black asowp-w-full asowp-translate-y-0"
                            />
                        </div>
                    </div>
                </div>
                <div v-if="dropdownColorsSections['undoRedo']" @click="dropdownColorsSections['undoRedo']=false" class="asowp-flex asowp-absolute asowp-justify-center asowp-items-center  asowp-my-0 asowp-right-8 asowp-top-0 asowp-shadow-md asowp-rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="asowp-w-6 asowp-h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 18.75 7.5-7.5 7.5 7.5" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 7.5-7.5 7.5 7.5" />
                    </svg>
                </div>
                <div v-if="!dropdownColorsSections['undoRedo']" @click="dropdownColorsSections['undoRedo']=true" class="asowp-flex asowp-absolute asowp-justify-center asowp-items-center  asowp-my-0 asowp-right-8 asowp-top-0 asowp-shadow-md asowp-rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="asowp-w-6 asowp-h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5" />
                    </svg>
                </div>
            </div>
            <div class="asowp-bg-[#F8F9FB] asowp-px-8 asowp-pt-8 asowp-space-y-6 asowp-relative">
                <div class="asowp-flex asowp-space-x-4">
                    <h2 class="asowp-text-[15px] asowp-font-bold">Preview Button</h2>
                </div>
                <div class="asowp-grid asowp-grid-cols-3 w-full gap-4 asowp-justify-between asowp-items-center" v-if="dropdownColorsSections['previewButton']">
                    <div class="asowp-flex asowp-flex-col w-1/4 asowp-space-y-2">
                        <label class="asowp-text-[12px] asowp-text-[#444444]">Background Color</label>
                        <div class="asowp-relative asowp-flex">
                            <input
                                id="colorPicker"
                                type="color"
                                v-model="themes.colors.bars.preview.backgroundColor"
                                @input="updateBarsPreviewBackgroundColorCodeHex"
                                class="asowp-w-9 asowp-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.bars.preview.backgroundColor"
                                @input="updateBarsPreviewBackgroundColorCodeHex"
                                class="asowp-p-1 asowp-text-black asowp-w-full asowp-translate-y-0"
                            />
                        </div>
                    </div>
                    <div class="asowp-flex asowp-flex-col w-1/4 asowp-space-y-2">
                        <label class="asowp-text-[12px] asowp-text-[#444444]">Hover Background Color</label>
                        <div class="asowp-relative asowp-flex">
                            <input
                                id="colorPicker"
                                type="color"
                                v-model="themes.colors.bars.preview.hoverBackgroundColor"
                                @input="updateBarsPreviewHoverBackgroundColorCodeHex"
                                class="asowp-w-9 asowp-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.bars.preview.hoverBackgroundColor"
                                @input="updateBarsPreviewHoverBackgroundColorCodeHex"
                                class="asowp-p-1 asowp-text-black asowp-w-full asowp-translate-y-0"
                            />
                        </div>
                    </div>
                    <div class="asowp-flex asowp-flex-col w-1/4 asowp-space-y-2">
                        <label class="asowp-text-[12px] asowp-text-[#444444]">Text Color</label>
                        <div class="asowp-relative asowp-flex">
                            <input
                                id="colorPicker"
                                type="color"
                                v-model="themes.colors.bars.preview.textColor"
                                @input="updateBarsPreviewTextColorCodeHex"
                                class="asowp-w-9 asowp-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.bars.preview.textColor"
                                @input="updateBarsPreviewTextColorCodeHex"
                                class="asowp-p-1 asowp-text-black asowp-w-full asowp-translate-y-0"
                            />
                        </div>
                    </div>
                    <div class="asowp-flex asowp-flex-col w-1/4 asowp-space-y-2">
                        <label class="asowp-text-[12px] asowp-text-[#444444]">Hover Text Color</label>
                        <div class="asowp-relative asowp-flex">
                            <input
                                id="colorPicker"
                                type="color"
                                v-model="themes.colors.bars.preview.hoverTextColor"
                                @input="updateBarsPreviewHoverTextColorCodeHex"
                                class="asowp-w-9 asowp-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.bars.preview.hoverTextColor"
                                @input="updateBarsPreviewHoverTextColorCodeHex"
                                class="asowp-p-1 asowp-text-black asowp-w-full asowp-translate-y-0"
                            />
                        </div>
                    </div>
                    <div class="asowp-flex asowp-flex-col w-1/4 asowp-space-y-2">
                        <label class="asowp-text-[12px] asowp-text-[#444444]">Border Color</label>
                        <div class="asowp-relative asowp-flex">
                            <input
                                id="colorPicker"
                                type="color"
                                v-model="themes.colors.bars.preview.borderColor"
                                @input="updateBarsPreviewBorderColorCodeHex"
                                class="asowp-w-9 asowp-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.bars.preview.borderColor"
                                @input="updateBarsPreviewBorderColorCodeHex"
                                class="asowp-p-1 asowp-text-black asowp-w-full asowp-translate-y-0"
                            />
                        </div>
                    </div>
                    <div class="asowp-flex asowp-flex-col w-1/4 asowp-space-y-2">
                        <label class="asowp-text-[12px] asowp-text-[#444444]">Hover Border Color</label>
                        <div class="asowp-relative asowp-flex">
                            <input
                                id="colorPicker"
                                type="color"
                                v-model="themes.colors.bars.preview.hoverBorderColor"
                                @input="updateBarsPreviewHoverBorderColorCodeHex"
                                class="asowp-w-9 asowp-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.bars.preview.hoverBorderColor"
                                @input="updateBarsPreviewHoverBorderColorCodeHex"
                                class="asowp-p-1 asowp-text-black asowp-w-full asowp-translate-y-0"
                            />
                        </div>
                    </div>
                </div>
                <div v-if="dropdownColorsSections['previewButton']" @click="dropdownColorsSections['previewButton']=false" class="asowp-flex asowp-absolute asowp-justify-center asowp-items-center  asowp-my-0 asowp-right-8 asowp-top-0 asowp-shadow-md asowp-rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="asowp-w-6 asowp-h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 18.75 7.5-7.5 7.5 7.5" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 7.5-7.5 7.5 7.5" />
                    </svg>
                </div>
                <div v-if="!dropdownColorsSections['previewButton']" @click="dropdownColorsSections['previewButton']=true" class="asowp-flex asowp-absolute asowp-justify-center asowp-items-center  asowp-my-0 asowp-right-8 asowp-top-0 asowp-shadow-md asowp-rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="asowp-w-6 asowp-h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5" />
                    </svg>
                </div>
            </div>
            <div class="asowp-bg-[#F8F9FB] asowp-px-8 asowp-pt-8 asowp-space-y-6 asowp-relative">
                <div class="asowp-flex asowp-space-x-4">
                    <h2 class="asowp-text-[15px] asowp-font-bold">help Button</h2>
                </div>
                <div class="asowp-grid asowp-grid-cols-3 w-full gap-4 asowp-justify-between asowp-items-center" v-if="dropdownColorsSections['helpButton']">
                    <div class="asowp-flex asowp-flex-col w-1/4 asowp-space-y-2">
                        <label class="asowp-text-[12px] asowp-text-[#444444]">Background Color</label>
                        <div class="asowp-relative asowp-flex">
                            <input
                                id="colorPicker"
                                type="color"
                                v-model="themes.colors.bars.help.backgroundColor"
                                @input="updateBarsHelpBackgroundColorCodeHex"
                                class="asowp-w-9 asowp-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.bars.help.backgroundColor"
                                @input="updateBarsHelpBackgroundColorCodeHex"
                                class="asowp-p-1 asowp-text-black asowp-w-full asowp-translate-y-0"
                            />
                        </div>
                    </div>
                    <div class="asowp-flex asowp-flex-col w-1/4 asowp-space-y-2">
                        <label class="asowp-text-[12px] asowp-text-[#444444]">Hover Background Color</label>
                        <div class="asowp-relative asowp-flex">
                            <input
                                id="colorPicker"
                                type="color"
                                v-model="themes.colors.bars.help.hoverBackgroundColor"
                                @input="updateBarsHelpHoverBackgroundColorCodeHex"
                                class="asowp-w-9 asowp-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.bars.help.hoverBackgroundColor"
                                @input="updateBarsHelpHoverBackgroundColorCodeHex"
                                class="asowp-p-1 asowp-text-black asowp-w-full asowp-translate-y-0"
                            />
                        </div>
                    </div>
                    <div class="asowp-flex asowp-flex-col w-1/4 asowp-space-y-2">
                        <label class="asowp-text-[12px] asowp-text-[#444444]">Text Color</label>
                        <div class="asowp-relative asowp-flex">
                            <input
                                id="colorPicker"
                                type="color"
                                v-model="themes.colors.bars.help.textColor"
                                @input="updateBarsHelpTextColorCodeHex"
                                class="asowp-w-9 asowp-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.bars.help.textColor"
                                @input="updateBarsHelpTextColorCodeHex"
                                class="asowp-p-1 asowp-text-black asowp-w-full asowp-translate-y-0"
                            />
                        </div>
                    </div>
                    <div class="asowp-flex asowp-flex-col w-1/4 asowp-space-y-2">
                        <label class="asowp-text-[12px] asowp-text-[#444444]">Hover Text Color</label>
                        <div class="asowp-relative asowp-flex">
                            <input
                                id="colorPicker"
                                type="color"
                                v-model="themes.colors.bars.help.hoverTextColor"
                                @input="updateBarsHelpHoverTextColorCodeHex"
                                class="asowp-w-9 asowp-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.bars.help.hoverTextColor"
                                @input="updateBarsHelpHoverTextColorCodeHex"
                                class="asowp-p-1 asowp-text-black asowp-w-full asowp-translate-y-0"
                            />
                        </div>
                    </div>
                    <div class="asowp-flex asowp-flex-col w-1/4 asowp-space-y-2">
                        <label class="asowp-text-[12px] asowp-text-[#444444]">Border Color</label>
                        <div class="asowp-relative asowp-flex">
                            <input
                                id="colorPicker"
                                type="color"
                                v-model="themes.colors.bars.help.borderColor"
                                @input="updateBarsHelpBorderColorCodeHex"
                                class="asowp-w-9 asowp-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.bars.help.borderColor"
                                @input="updateBarsHelpBorderColorCodeHex"
                                class="asowp-p-1 asowp-text-black asowp-w-full asowp-translate-y-0"
                            />
                        </div>
                    </div>
                    <div class="asowp-flex asowp-flex-col w-1/4 asowp-space-y-2">
                        <label class="asowp-text-[12px] asowp-text-[#444444]">Hover Border Color</label>
                        <div class="asowp-relative asowp-flex">
                            <input
                                id="colorPicker"
                                type="color"
                                v-model="themes.colors.bars.help.hoverBorderColor"
                                @input="updateBarsHelpHoverBorderColorCodeHex"
                                class="asowp-w-9 asowp-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.bars.help.hoverBorderColor"
                                @input="updateBarsHelpHoverBorderColorCodeHex"
                                class="asowp-p-1 asowp-text-black asowp-w-full asowp-translate-y-0"
                            />
                        </div>
                    </div>
                </div>
                <div v-if="dropdownColorsSections['helpButton']" @click="dropdownColorsSections['helpButton']=false" class="asowp-flex asowp-absolute asowp-justify-center asowp-items-center  asowp-my-0 asowp-right-8 asowp-top-0 asowp-shadow-md asowp-rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="asowp-w-6 asowp-h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 18.75 7.5-7.5 7.5 7.5" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 7.5-7.5 7.5 7.5" />
                    </svg>
                </div>
                <div v-if="!dropdownColorsSections['helpButton']" @click="dropdownColorsSections['helpButton']=true" class="asowp-flex asowp-absolute asowp-justify-center asowp-items-center  asowp-my-0 asowp-right-8 asowp-top-0 asowp-shadow-md asowp-rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="asowp-w-6 asowp-h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5" />
                    </svg>
                </div>
            </div>
            
            <div class="asowp-bg-[#F8F9FB] asowp-px-8 asowp-pt-8 asowp-space-y-6 asowp-relative" >
                <div class="asowp-flex asowp-space-x-4">
                    <h2 class="asowp-text-[15px] asowp-font-bold">Options SideBar</h2>
                </div>
                <div class="asowp-grid asowp-grid-cols-3 w-full gap-4 asowp-justify-between asowp-items-center" v-if="dropdownColorsSections['optionsSideBar']">
                    <div class="asowp-flex asowp-flex-col w-1/4 asowp-space-y-2">
                        <label class="asowp-text-[12px] asowp-text-[#444444]">Background Color</label>
                        <div class="asowp-relative asowp-flex">
                            <input
                                id="colorPicker"
                                type="color"
                                v-model="themes.colors.optionsSideBar.backgroundColor"
                                @input="updateOptionsSideBarBackgroundColorCodeHex"
                                class="asowp-w-9 asowp-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.optionsSideBar.backgroundColor"
                                @input="updateOptionsSideBarBackgroundColorCodeHex"
                                class="asowp-p-1 asowp-text-black asowp-w-full asowp-translate-y-0"
                            />
                        </div>
                    </div>
                    <div class="asowp-flex asowp-flex-col w-1/4 asowp-space-y-2">
                        <label class="asowp-text-[12px] asowp-text-[#444444]">Scroll Buttons Background Color</label>
                        <div class="asowp-relative asowp-flex">
                            <input
                                id="colorPicker"
                                type="color"
                                v-model="themes.colors.optionsSideBar.scrollButtonsBackgroundColor"
                                @input="updateOptionsSideBarScrollButtonsBackgroundColor"
                                class="asowp-w-9 asowp-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.optionsSideBar.scrollButtonsBackgroundColor"
                                @input="updateOptionsSideBarScrollButtonsBackgroundColor"
                                class="asowp-p-1 asowp-text-black asowp-w-full asowp-translate-y-0"
                            />
                        </div>
                    </div>
                    <div class="asowp-flex asowp-flex-col w-1/4 asowp-space-y-2">
                        <label class="asowp-text-[12px] asowp-text-[#444444]">Scroll Buttons Hover Background Color</label>
                        <div class="asowp-relative asowp-flex">
                            <input
                                id="colorPicker"
                                type="color"
                                v-model="themes.colors.optionsSideBar.scrollButtonsHoverBackgroundColor"
                                @input="updateOptionsSideBarScrollButtonsHoverBackgroundColor"
                                class="asowp-w-9 asowp-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.optionsSideBar.scrollButtonsHoverBackgroundColor"
                                @input="updateOptionsSideBarScrollButtonsHoverBackgroundColor"
                                class="asowp-p-1 asowp-text-black asowp-w-full asowp-translate-y-0"
                            />
                        </div>
                    </div>
                    <div class="asowp-flex asowp-flex-col w-1/4 asowp-space-y-2">
                        <label class="asowp-text-[12px] asowp-text-[#444444]">Scroll Buttons Text Color</label>
                        <div class="asowp-relative asowp-flex">
                            <input
                                id="colorPicker"
                                type="color"
                                v-model="themes.colors.optionsSideBar.scrollButtonsTextColor"
                                @input="updateOptionsSideBarScrollButtonsTextColor"
                                class="asowp-w-9 asowp-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.optionsSideBar.scrollButtonsTextColor"
                                @input="updateOptionsSideBarScrollButtonsTextColor"
                                class="asowp-p-1 asowp-text-black asowp-w-full asowp-translate-y-0"
                            />
                        </div>
                    </div>
                    <div class="asowp-flex asowp-flex-col w-1/4 asowp-space-y-2">
                        <label class="asowp-text-[12px] asowp-text-[#444444]">Scroll Buttons Text Hover Color</label>
                        <div class="asowp-relative asowp-flex">
                            <input
                                id="colorPicker"
                                type="color"
                                v-model="themes.colors.optionsSideBar.scrollButtonsHoverTextColor"
                                @input="updateOptionsSideBarScrollButtonsHoverTextColor"
                                class="asowp-w-9 asowp-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.optionsSideBar.scrollButtonsHoverTextColor"
                                @input="updateOptionsSideBarScrollButtonsHoverTextColor"
                                class="asowp-p-1 asowp-text-black asowp-w-full asowp-translate-y-0"
                            />
                        </div>
                    </div>
                    <div class="asowp-flex asowp-flex-col w-1/4 asowp-space-y-2">
                        <label class="asowp-text-[12px] asowp-text-[#444444]">Options Buttons Background Color</label>
                        <div class="asowp-relative asowp-flex">
                            <input
                                id="colorPicker"
                                type="color"
                                v-model="themes.colors.optionsSideBar.options.buttons.backgroundColor"
                                @input="updateOptionsSideBarOptionsButtonsBackgroundColor"
                                class="asowp-w-9 asowp-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.optionsSideBar.options.buttons.backgroundColor"
                                @input="updateOptionsSideBarOptionsButtonsBackgroundColor"
                                class="asowp-p-1 asowp-text-black asowp-w-full asowp-translate-y-0"
                            />
                        </div>
                    </div>
                    <div class="asowp-flex asowp-flex-col w-1/4 asowp-space-y-2">
                        <label class="asowp-text-[12px] asowp-text-[#444444]">Options Buttons Hover Background Color</label>
                        <div class="asowp-relative asowp-flex">
                            <input
                                id="colorPicker"
                                type="color"
                                v-model="themes.colors.optionsSideBar.options.buttons.hoverBackgroundColor"
                                @input="updateOptionsSideBarOptionsButtonsHoverBackgroundColor"
                                class="asowp-w-9 asowp-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.optionsSideBar.options.buttons.hoverBackgroundColor"
                                @input="updateOptionsSideBarOptionsButtonsHoverBackgroundColor"
                                class="asowp-p-1 asowp-text-black asowp-w-full asowp-translate-y-0"
                            />
                        </div>
                    </div>
                    <div class="asowp-flex asowp-flex-col w-1/4 asowp-space-y-2">
                        <label class="asowp-text-[12px] asowp-text-[#444444]">Options Buttons Text Color</label>
                        <div class="asowp-relative asowp-flex">
                            <input
                                id="colorPicker"
                                type="color"
                                v-model="themes.colors.optionsSideBar.options.buttons.textColor"
                                @input="updateOptionsSideBarOptionsButtonsTextColor"
                                class="asowp-w-9 asowp-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.optionsSideBar.options.buttons.textColor"
                                @input="updateOptionsSideBarOptionsButtonsTextColor"
                                class="asowp-p-1 asowp-text-black asowp-w-full asowp-translate-y-0"
                            />
                        </div>
                    </div>
                    <div class="asowp-flex asowp-flex-col w-1/4 asowp-space-y-2">
                        <label class="asowp-text-[12px] asowp-text-[#444444]">Options Buttons Hover Text Color</label>
                        <div class="asowp-relative asowp-flex">
                            <input
                                id="colorPicker"
                                type="color"
                                v-model="themes.colors.optionsSideBar.options.buttons.hoverTextColor"
                                @input="updateOptionsSideBarOptionsButtonsHoverTextColor"
                                class="asowp-w-9 asowp-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.optionsSideBar.options.buttons.hoverTextColor"
                                @input="updateOptionsSideBarOptionsButtonsHoverTextColor"
                                class="asowp-p-1 asowp-text-black asowp-w-full asowp-translate-y-0"
                            />
                        </div>
                    </div>
                </div>
                <div v-if="dropdownColorsSections['optionsSideBar']" @click="dropdownColorsSections['optionsSideBar']=false" class="asowp-flex asowp-absolute asowp-justify-center asowp-items-center  asowp-my-0 asowp-right-8 asowp-top-0 asowp-shadow-md asowp-rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="asowp-w-6 asowp-h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 18.75 7.5-7.5 7.5 7.5" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 7.5-7.5 7.5 7.5" />
                    </svg>
                </div>
                <div v-if="!dropdownColorsSections['optionsSideBar']" @click="dropdownColorsSections['optionsSideBar']=true" class="asowp-flex asowp-absolute asowp-justify-center asowp-items-center  asowp-my-0 asowp-right-8 asowp-top-0 asowp-shadow-md asowp-rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="asowp-w-6 asowp-h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5" />
                    </svg>
                </div>
            </div>
            <div class="asowp-bg-[#F8F9FB] asowp-px-8 asowp-pt-8 asowp-space-y-6 asowp-relative" >
                <div class="asowp-flex asowp-space-x-4">
                    <h2 class="asowp-text-[15px] asowp-font-bold">Options Modals</h2>
                </div>
                <div class="asowp-grid asowp-grid-cols-3 w-full gap-4 asowp-justify-between asowp-items-center" v-if="dropdownColorsSections['optionsModals']">
                    <div class="asowp-flex asowp-flex-col w-1/4 asowp-space-y-2">
                        <label class="asowp-text-[12px] asowp-text-[#444444]">Modal Background Color</label>
                        <div class="asowp-relative asowp-flex">
                            <input
                                id="colorPicker"
                                type="color"
                                v-model="themes.colors.optionsSideBar.options.modals.backgroundColor"
                                @input="updateOptionsSideBarOptionsModalsBackgroundColor"
                                class="asowp-w-9 asowp-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.optionsSideBar.options.modals.backgroundColor"
                                @input="updateOptionsSideBarOptionsModalsBackgroundColor"
                                class="asowp-p-1 asowp-text-black asowp-w-full asowp-translate-y-0"
                            />
                        </div>
                    </div>
                    <div class="asowp-flex asowp-flex-col w-1/4 asowp-space-y-2">
                        <label class="asowp-text-[12px] asowp-text-[#444444]">Modal Text Color</label>
                        <div class="asowp-relative asowp-flex">
                            <input
                                id="colorPicker"
                                type="color"
                                v-model="themes.colors.optionsSideBar.options.modals.textColor"
                                @input="updateOptionsSideBarOptionsModalsTextColor"
                                class="asowp-w-9 asowp-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.optionsSideBar.options.modals.textColor"
                                @input="updateOptionsSideBarOptionsModalsTextColor"
                                class="asowp-p-1 asowp-text-black asowp-w-full asowp-translate-y-0"
                            />
                        </div>
                    </div>
                    <div class="asowp-flex asowp-flex-col w-1/4 asowp-space-y-2">
                        <label class="asowp-text-[12px] asowp-text-[#444444]">Modal Header Background Color</label>
                        <div class="asowp-relative asowp-flex">
                            <input
                                id="colorPicker"
                                type="color"
                                v-model="themes.colors.optionsSideBar.options.modals.headerBackgroundColor"
                                @input="updateOptionsSideBarOptionsModalsHeaderBackgroundColor"
                                class="asowp-w-9 asowp-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.optionsSideBar.options.modals.headerBackgroundColor"
                                @input="updateOptionsSideBarOptionsModalsHeaderBackgroundColor"
                                class="asowp-p-1 asowp-text-black asowp-w-full asowp-translate-y-0"
                            />
                        </div>
                    </div>
                    <div class="asowp-flex asowp-flex-col w-1/4 asowp-space-y-2">
                        <label class="asowp-text-[12px] asowp-text-[#444444]">Modal Header Text Color</label>
                        <div class="asowp-relative asowp-flex">
                            <input
                                id="colorPicker"
                                type="color"
                                v-model="themes.colors.optionsSideBar.options.modals.headerTextColor"
                                @input="updateOptionsSideBarOptionsModalsHeaderTextColor"
                                class="asowp-w-9 asowp-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.optionsSideBar.options.modals.headerTextColor"
                                @input="updateOptionsSideBarOptionsModalsHeaderTextColor"
                                class="asowp-p-1 asowp-text-black asowp-w-full asowp-translate-y-0"
                            />
                        </div>
                    </div>
                    <div class="asowp-flex asowp-flex-col w-1/4 asowp-space-y-2">
                        <label class="asowp-text-[12px] asowp-text-[#444444]">Modal Buttons Background Color</label>
                        <div class="asowp-relative asowp-flex">
                            <input
                                id="colorPicker"
                                type="color"
                                v-model="themes.colors.optionsSideBar.options.modals.buttons.backgroundColor"
                                @input="updateOptionsSideBarOptionsModalsButtonsBackgroundColor"
                                class="asowp-w-9 asowp-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.optionsSideBar.options.modals.buttons.backgroundColor"
                                @input="updateOptionsSideBarOptionsModalsButtonsBackgroundColor"
                                class="asowp-p-1 asowp-text-black asowp-w-full asowp-translate-y-0"
                            />
                        </div>
                    </div>
                    <div class="asowp-flex asowp-flex-col w-1/4 asowp-space-y-2">
                        <label class="asowp-text-[12px] asowp-text-[#444444]">Modal Buttons Hover Background Color</label>
                        <div class="asowp-relative asowp-flex">
                            <input
                                id="colorPicker"
                                type="color"
                                v-model="themes.colors.optionsSideBar.options.modals.buttons.hoverBackgroundColor"
                                @input="updateOptionsSideBarOptionsModalsButtonsHoverBackgroundColor"
                                class="asowp-w-9 asowp-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.optionsSideBar.options.modals.buttons.hoverBackgroundColor"
                                @input="updateOptionsSideBarOptionsModalsButtonsHoverBackgroundColor"
                                class="asowp-p-1 asowp-text-black asowp-w-full asowp-translate-y-0"
                            />
                        </div>
                    </div>
                    <div class="asowp-flex asowp-flex-col w-1/4 asowp-space-y-2">
                        <label class="asowp-text-[12px] asowp-text-[#444444]">Modals Buttons Text Color</label>
                        <div class="asowp-relative asowp-flex">
                            <input
                                id="colorPicker"
                                type="color"
                                v-model="themes.colors.optionsSideBar.options.modals.buttons.textColor"
                                @input="updateOptionsSideBarOptionsModalsButtonsTextColor"
                                class="asowp-w-9 asowp-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.optionsSideBar.options.modals.buttons.textColor"
                                @input="updateOptionsSideBarOptionsModalsButtonsTextColor"
                                class="asowp-p-1 asowp-text-black asowp-w-full asowp-translate-y-0"
                            />
                        </div>
                    </div>
                    <div class="asowp-flex asowp-flex-col w-1/4 asowp-space-y-2">
                        <label class="asowp-text-[12px] asowp-text-[#444444]">Modals Buttons Hover Text Color</label>
                        <div class="asowp-relative asowp-flex">
                            <input
                                id="colorPicker"
                                type="color"
                                v-model="themes.colors.optionsSideBar.options.modals.buttons.hoverTextColor"
                                @input="updateOptionsSideBarOptionsModalsButtonsHoverTextColor"
                                class="asowp-w-9 asowp-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.optionsSideBar.options.modals.buttons.hoverTextColor"
                                @input="updateOptionsSideBarOptionsModalsButtonsHoverTextColor"
                                class="asowp-p-1 asowp-text-black asowp-w-full asowp-translate-y-0"
                            />
                        </div>
                    </div>
                </div>
                <div v-if="dropdownColorsSections['optionsModals']" @click="dropdownColorsSections['optionsModals']=false" class="asowp-flex asowp-absolute asowp-justify-center asowp-items-center  asowp-my-0 asowp-right-8 asowp-top-0 asowp-shadow-md asowp-rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="asowp-w-6 asowp-h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 18.75 7.5-7.5 7.5 7.5" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 7.5-7.5 7.5 7.5" />
                    </svg>
                </div>
                <div v-if="!dropdownColorsSections['optionsModals']" @click="dropdownColorsSections['optionsModals']=true" class="asowp-flex asowp-absolute asowp-justify-center asowp-items-center  asowp-my-0 asowp-right-8 asowp-top-0 asowp-shadow-md asowp-rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="asowp-w-6 asowp-h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5" />
                    </svg>
                </div>
            </div>
            <div class="asowp-bg-[#F8F9FB] asowp-px-8 asowp-pt-8 asowp-space-y-6 asowp-relative" >
                <div class="asowp-flex asowp-space-x-4">
                    <h2 class="asowp-text-[15px] asowp-font-bold">Option in Modal</h2>
                </div>
                <div class="asowp-grid asowp-grid-cols-2 w-full gap-4 asowp-justify-between asowp-items-center" v-if="dropdownColorsSections['modalsOption']">
                    <div class="asowp-flex asowp-flex-col w-1/4 asowp-space-y-2">
                        <label class="asowp-text-[12px] asowp-text-[#444444]">Modal Option Text Color</label>
                        <div class="asowp-relative asowp-flex">
                            <input
                                id="colorPicker"
                                type="color"
                                v-model="themes.colors.optionsSideBar.options.modals.option.textColor"
                                @input="updateOptionsSideBarOptionsModalsOptionTextColor"
                                class="asowp-w-9 asowp-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.optionsSideBar.options.modals.option.textColor"
                                @input="updateOptionsSideBarOptionsModalsOptionTextColor"
                                class="asowp-p-1 asowp-text-black asowp-w-full asowp-translate-y-0"
                            />
                        </div>
                    </div>
                    <div class="asowp-flex asowp-flex-col w-1/4 asowp-space-y-2">
                        <label class="asowp-text-[12px] asowp-text-[#444444]">Modal Option Hover Background Color</label>
                        <div class="asowp-relative asowp-flex">
                            <input
                                id="colorPicker"
                                type="color"
                                v-model="themes.colors.optionsSideBar.options.modals.option.hoverBackgroundColor"
                                @input="updateOptionsSideBarOptionsModalsOptionHoverBackgroundColor"
                                class="asowp-w-9 asowp-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.optionsSideBar.options.modals.option.hoverBackgroundColor"
                                @input="updateOptionsSideBarOptionsModalsOptionHoverBackgroundColor"
                                class="asowp-p-1 asowp-text-black asowp-w-full asowp-translate-y-0"
                            />
                        </div>
                    </div>
                    <div class="asowp-flex asowp-flex-col w-1/4 asowp-space-y-2">
                        <label class="asowp-text-[12px] asowp-text-[#444444]">Modal Option Hover Text Color</label>
                        <div class="asowp-relative asowp-flex">
                            <input
                                id="colorPicker"
                                type="color"
                                v-model="themes.colors.optionsSideBar.options.modals.option.hoverTextColor"
                                @input="updateOptionsSideBarOptionsModalsOptionHoverTextColor"
                                class="asowp-w-9 asowp-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.optionsSideBar.options.modals.option.hoverTextColor"
                                @input="updateOptionsSideBarOptionsModalsOptionHoverTextColor"
                                class="asowp-p-1 asowp-text-black asowp-w-full asowp-translate-y-0"
                            />
                        </div>
                    </div>
                    <div class="asowp-flex asowp-flex-col w-1/4 asowp-space-y-2">
                        <label class="asowp-text-[12px] asowp-text-[#444444]">Modal Option Active Text Color</label>
                        <div class="asowp-relative asowp-flex">
                            <input
                                id="colorPicker"
                                type="color"
                                v-model="themes.colors.optionsSideBar.options.modals.option.activeTextColor"
                                @input="updateOptionsSideBarOptionsModalsOptionActiveTextColor"
                                class="asowp-w-9 asowp-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="themes.colors.optionsSideBar.options.modals.option.activeTextColor"
                                @input="updateOptionsSideBarOptionsModalsOptionActiveTextColor"
                                class="asowp-p-1 asowp-text-black asowp-w-full asowp-translate-y-0"
                            />
                        </div>
                    </div>
                </div>
                <div v-if="dropdownColorsSections['modalsOption']" @click="dropdownColorsSections['modalsOption']=false" class="asowp-flex asowp-absolute asowp-justify-center asowp-items-center  asowp-my-0 asowp-right-8 asowp-top-0 asowp-shadow-md asowp-rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="asowp-w-6 asowp-h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 18.75 7.5-7.5 7.5 7.5" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 7.5-7.5 7.5 7.5" />
                    </svg>
                </div>
                <div v-if="!dropdownColorsSections['modalsOption']" @click="dropdownColorsSections['modalsOption']=true" class="asowp-flex asowp-absolute asowp-justify-center asowp-items-center  asowp-my-0 asowp-right-8 asowp-top-0 asowp-shadow-md asowp-rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="asowp-w-6 asowp-h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5" />
                    </svg>
                </div>
            </div>
            <div class="asowp-bg-[#F8F9FB] asowp-px-8 asowp-pt-8 asowp-space-y-6 asowp-relative" >
                <div class="asowp-flex asowp-space-x-4">
                    <h2 class="asowp-text-[15px] asowp-font-bold">Objects Options</h2>
                </div>
                <div v-show="dropdownColorsSections['objectsOptions']">
                    <div class="asowp-grid asowp-grid-cols-3 w-full gap-4 asowp-justify-between asowp-items-center">
                        <div class="asowp-flex asowp-flex-col w-1/4 asowp-space-y-2">
                            <label class="asowp-text-[12px] asowp-text-[#444444]">Background Color</label>
                            <div class="asowp-relative asowp-flex">
                                <input
                                    id="colorPicker"
                                    type="color"
                                    v-model="themes.colors.objectsOptions.backgroundColor"
                                    @input="updateObjectsOptionsBackgroundColorCodeHex"
                                    class="asowp-w-9 asowp-h-[30px]"
                                />
                                <input
                                    type="text"
                                    v-model="themes.colors.objectsOptions.backgroundColor"
                                    @input="updateObjectsOptionsBackgroundColorCodeHex"
                                    class="asowp-p-1 asowp-text-black asowp-w-full asowp-translate-y-0"
                                />
                            </div>
                        </div>
                        <div class="asowp-flex asowp-flex-col w-1/4 asowp-space-y-2">
                            <label class="asowp-text-[12px] asowp-text-[#444444]">Edit Button Color</label>
                            <div class="asowp-relative asowp-flex">
                                <input
                                    id="colorPicker"
                                    type="color"
                                    v-model="themes.colors.objectsOptions.edit.buttonColor"
                                    @input="updateObjectsOptionsEditButtonColor"
                                    class="asowp-w-9 asowp-h-[30px]"
                                />
                                <input
                                    type="text"
                                    v-model="themes.colors.objectsOptions.edit.buttonColor"
                                    @input="updateObjectsOptionsEditButtonColor"
                                    class="asowp-p-1 asowp-text-black asowp-w-full asowp-translate-y-0"
                                />
                            </div>
                        </div>
                        <div class="asowp-flex asowp-flex-col w-1/4 asowp-space-y-2">
                            <label class="asowp-text-[12px] asowp-text-[#444444]">Hover Button Color</label>
                            <div class="asowp-relative asowp-flex">
                                <input
                                    id="colorPicker"
                                    type="color"
                                    v-model="themes.colors.objectsOptions.edit.hoverButtonColor"
                                    @input="updateObjectsOptionsEditHoverButtonColor"
                                    class="asowp-w-9 asowp-h-[30px]"
                                />
                                <input
                                    type="text"
                                    v-model="themes.colors.objectsOptions.edit.hoverButtonColor"
                                    @input="updateObjectsOptionsEditHoverButtonColor"
                                    class="asowp-p-1 asowp-text-black asowp-w-full asowp-translate-y-0"
                                />
                            </div>
                        </div>
                        <div class="asowp-flex asowp-flex-col w-1/4 asowp-space-y-2">
                            <label class="asowp-text-[12px] asowp-text-[#444444]">Edit Button Text Color</label>
                            <div class="asowp-relative asowp-flex">
                                <input
                                    id="colorPicker"
                                    type="color"
                                    v-model="themes.colors.objectsOptions.edit.textColor"
                                    @input="updateObjectsOptionsEditTextColor"
                                    class="asowp-w-9 asowp-h-[30px]"
                                />
                                <input
                                    type="text"
                                    v-model="themes.colors.objectsOptions.edit.textColor"
                                    @input="updateObjectsOptionsEditTextColor"
                                    class="asowp-p-1 asowp-text-black asowp-w-full asowp-translate-y-0"
                                />
                            </div>
                        </div>
                        <div class="asowp-flex asowp-flex-col w-1/4 asowp-space-y-2">
                            <label class="asowp-text-[12px] asowp-text-[#444444]">Edit Button Text Hover Color</label>
                            <div class="asowp-relative asowp-flex">
                                <input
                                    id="colorPicker"
                                    type="color"
                                    v-model="themes.colors.objectsOptions.edit.hoverTextColor"
                                    @input="updateObjectsOptionsEditHoverTextColor"
                                    class="asowp-w-9 asowp-h-[30px]"
                                />
                                <input
                                    type="text"
                                    v-model="themes.colors.objectsOptions.edit.hoverTextColor"
                                    @input="updateObjectsOptionsEditHoverTextColor"
                                    class="asowp-p-1 asowp-text-black asowp-w-full asowp-translate-y-0"
                                />
                            </div>
                        </div>
                        <div class="asowp-flex asowp-flex-col w-1/4 asowp-space-y-2">
                            <label class="asowp-text-[12px] asowp-text-[#444444]">Clone Button Color</label>
                            <div class="asowp-relative asowp-flex">
                                <input
                                    id="colorPicker"
                                    type="color"
                                    v-model="themes.colors.objectsOptions.clone.buttonColor"
                                    @input="updateObjectsOptionsCloneButtonColor"
                                    class="asowp-w-9 asowp-h-[30px]"
                                />
                                <input
                                    type="text"
                                    v-model="themes.colors.objectsOptions.clone.buttonColor"
                                    @input="updateObjectsOptionsCloneButtonColor"
                                    class="asowp-p-1 asowp-text-black asowp-w-full asowp-translate-y-0"
                                />
                            </div>
                        </div>
                        <div class="asowp-flex asowp-flex-col w-1/4 asowp-space-y-2">
                            <label class="asowp-text-[12px] asowp-text-[#444444]">Clone Hover Button Color</label>
                            <div class="asowp-relative asowp-flex">
                                <input
                                    id="colorPicker"
                                    type="color"
                                    v-model="themes.colors.objectsOptions.clone.hoverButtonColor"
                                    @input="updateObjectsOptionsCloneHoverButtonColor"
                                    class="asowp-w-9 asowp-h-[30px]"
                                />
                                <input
                                    type="text"
                                    v-model="themes.colors.objectsOptions.clone.hoverButtonColor"
                                    @input="updateObjectsOptionsCloneHoverButtonColor"
                                    class="asowp-p-1 asowp-text-black asowp-w-full asowp-translate-y-0"
                                />
                            </div>
                        </div>
                        <div class="asowp-flex asowp-flex-col w-1/4 asowp-space-y-2">
                            <label class="asowp-text-[12px] asowp-text-[#444444]">Clone Button Text Color</label>
                            <div class="asowp-relative asowp-flex">
                                <input
                                    id="colorPicker"
                                    type="color"
                                    v-model="themes.colors.objectsOptions.clone.textColor"
                                    @input="updateObjectsOptionsCloneTextColor"
                                    class="asowp-w-9 asowp-h-[30px]"
                                />
                                <input
                                    type="text"
                                    v-model="themes.colors.objectsOptions.clone.textColor"
                                    @input="updateObjectsOptionsCloneTextColor"
                                    class="asowp-p-1 asowp-text-black asowp-w-full asowp-translate-y-0"
                                />
                            </div>
                        </div>
                        <div class="asowp-flex asowp-flex-col w-1/4 asowp-space-y-2">
                            <label class="asowp-text-[12px] asowp-text-[#444444]">Clone Button Text Hover Color</label>
                            <div class="asowp-relative asowp-flex">
                                <input
                                    id="colorPicker"
                                    type="color"
                                    v-model="themes.colors.objectsOptions.clone.hoverTextColor"
                                    @input="updateObjectsOptionsCloneHoverTextColor"
                                    class="asowp-w-9 asowp-h-[30px]"
                                />
                                <input
                                    type="text"
                                    v-model="themes.colors.objectsOptions.clone.hoverTextColor"
                                    @input="updateObjectsOptionsCloneHoverTextColor"
                                    class="asowp-p-1 asowp-text-black asowp-w-full asowp-translate-y-0"
                                />
                            </div>
                        </div>
                        <div class="asowp-flex asowp-flex-col w-1/4 asowp-space-y-2">
                            <label class="asowp-text-[12px] asowp-text-[#444444]">Delete Button Color</label>
                            <div class="asowp-relative asowp-flex">
                                <input
                                    id="colorPicker"
                                    type="color"
                                    v-model="themes.colors.objectsOptions.delete.buttonColor"
                                    @input="updateObjectsOptionsDeleteButtonColor"
                                    class="asowp-w-9 asowp-h-[30px]"
                                />
                                <input
                                    type="text"
                                    v-model="themes.colors.objectsOptions.delete.buttonColor"
                                    @input="updateObjectsOptionsDeleteButtonColor"
                                    class="asowp-p-1 asowp-text-black asowp-w-full asowp-translate-y-0"
                                />
                            </div>
                        </div>
                        <div class="asowp-flex asowp-flex-col w-1/4 asowp-space-y-2">
                            <label class="asowp-text-[12px] asowp-text-[#444444]">Delete Hover Button Color</label>
                            <div class="asowp-relative asowp-flex">
                                <input
                                    id="colorPicker"
                                    type="color"
                                    v-model="themes.colors.objectsOptions.delete.hoverButtonColor"
                                    @input="updateObjectsOptionsDeleteHoverButtonColor"
                                    class="asowp-w-9 asowp-h-[30px]"
                                />
                                <input
                                    type="text"
                                    v-model="themes.colors.objectsOptions.delete.hoverButtonColor"
                                    @input="updateObjectsOptionsDeleteHoverButtonColor"
                                    class="asowp-p-1 asowp-text-black asowp-w-full asowp-translate-y-0"
                                />
                            </div>
                        </div>
                        <div class="asowp-flex asowp-flex-col w-1/4 asowp-space-y-2">
                            <label class="asowp-text-[12px] asowp-text-[#444444]">Delete Button Text Color</label>
                            <div class="asowp-relative asowp-flex">
                                <input
                                    id="colorPicker"
                                    type="color"
                                    v-model="themes.colors.objectsOptions.delete.textColor"
                                    @input="updateObjectsOptionsDeleteTextColor"
                                    class="asowp-w-9 asowp-h-[30px]"
                                />
                                <input
                                    type="text"
                                    v-model="themes.colors.objectsOptions.delete.textColor"
                                    @input="updateObjectsOptionsDeleteTextColor"
                                    class="asowp-p-1 asowp-text-black asowp-w-full asowp-translate-y-0"
                                />
                            </div>
                        </div>
                        <div class="asowp-flex asowp-flex-col w-1/4 asowp-space-y-2">
                            <label class="asowp-text-[12px] asowp-text-[#444444]">Delete Button Text Hover Color</label>
                            <div class="asowp-relative asowp-flex">
                                <input
                                    id="colorPicker"
                                    type="color"
                                    v-model="themes.colors.objectsOptions.delete.hoverTextColor"
                                    @input="updateObjectsOptionsDeleteHoverTextColor"
                                    class="asowp-w-9 asowp-h-[30px]"
                                />
                                <input
                                    type="text"
                                    v-model="themes.colors.objectsOptions.delete.hoverTextColor"
                                    @input="updateObjectsOptionsDeleteHoverTextColor"
                                    class="asowp-p-1 asowp-text-black asowp-w-full asowp-translate-y-0"
                                />
                            </div>
                        </div>
                        <div class="asowp-flex asowp-flex-col w-1/4 asowp-space-y-2">
                            <label class="asowp-text-[12px] asowp-text-[#444444]">Center Button Color</label>
                            <div class="asowp-relative asowp-flex">
                                <input
                                    id="colorPicker"
                                    type="color"
                                    v-model="themes.colors.objectsOptions.center.buttonColor"
                                    @input="updateObjectsOptionsCenterButtonColor"
                                    class="asowp-w-9 asowp-h-[30px]"
                                />
                                <input
                                    type="text"
                                    v-model="themes.colors.objectsOptions.center.buttonColor"
                                    @input="updateObjectsOptionsCenterButtonColor"
                                    class="asowp-p-1 asowp-text-black asowp-w-full asowp-translate-y-0"
                                />
                            </div>
                        </div>
                        <div class="asowp-flex asowp-flex-col w-1/4 asowp-space-y-2">
                            <label class="asowp-text-[12px] asowp-text-[#444444]">Center Hover Button Color</label>
                            <div class="asowp-relative asowp-flex">
                                <input
                                    id="colorPicker"
                                    type="color"
                                    v-model="themes.colors.objectsOptions.center.hoverButtonColor"
                                    @input="updateObjectsOptionsCenterHoverButtonColor"
                                    class="asowp-w-9 asowp-h-[30px]"
                                />
                                <input
                                    type="text"
                                    v-model="themes.colors.objectsOptions.center.hoverButtonColor"
                                    @input="updateObjectsOptionsCenterHoverButtonColor"
                                    class="asowp-p-1 asowp-text-black asowp-w-full asowp-translate-y-0"
                                />
                            </div>
                        </div>
                        <div class="asowp-flex asowp-flex-col w-1/4 asowp-space-y-2">
                            <label class="asowp-text-[12px] asowp-text-[#444444]">Center Button Text Color</label>
                            <div class="asowp-relative asowp-flex">
                                <input
                                    id="colorPicker"
                                    type="color"
                                    v-model="themes.colors.objectsOptions.center.textColor"
                                    @input="updateObjectsOptionsCenterTextColor"
                                    class="asowp-w-9 asowp-h-[30px]"
                                />
                                <input
                                    type="text"
                                    v-model="themes.colors.objectsOptions.center.textColor"
                                    @input="updateObjectsOptionsCenterTextColor"
                                    class="asowp-p-1 asowp-text-black asowp-w-full asowp-translate-y-0"
                                />
                            </div>
                        </div>
                        <div class="asowp-flex asowp-flex-col w-1/4 asowp-space-y-2">
                            <label class="asowp-text-[12px] asowp-text-[#444444]">Center Button Text Hover Color</label>
                            <div class="asowp-relative asowp-flex">
                                <input
                                    id="colorPicker"
                                    type="color"
                                    v-model="themes.colors.objectsOptions.center.hoverTextColor"
                                    @input="updateObjectsOptionsCenterHoverTextColor"
                                    class="asowp-w-9 asowp-h-[30px]"
                                />
                                <input
                                    type="text"
                                    v-model="themes.colors.objectsOptions.center.hoverTextColor"
                                    @input="updateObjectsOptionsCenterHoverTextColor"
                                    class="asowp-p-1 asowp-text-black asowp-w-full asowp-translate-y-0"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="dropdownColorsSections['objectsOptions']" @click="dropdownColorsSections['objectsOptions']=false" class="asowp-flex asowp-absolute asowp-justify-center asowp-items-center  asowp-my-0 asowp-right-8 asowp-top-0 asowp-shadow-md asowp-rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="asowp-w-6 asowp-h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 18.75 7.5-7.5 7.5 7.5" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 7.5-7.5 7.5 7.5" />
                    </svg>
                </div>
                <div v-if="!dropdownColorsSections['objectsOptions']" @click="dropdownColorsSections['objectsOptions']=true" class="asowp-flex asowp-absolute asowp-justify-center asowp-items-center  asowp-my-0 asowp-right-8 asowp-top-0 asowp-shadow-md asowp-rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="asowp-w-6 asowp-h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5" />
                    </svg>
                </div>
            </div>
            <div class="asowp-bg-[#F8F9FB] asowp-px-8 asowp-py-8 asowp-space-y-6 asowp-relative" >
                <div class="asowp-flex asowp-space-x-4">
                    <h2 class="asowp-text-[15px] asowp-font-bold">Recaps Section</h2>
                </div>
                <div v-show="dropdownColorsSections['recaps']">
                    <div class="asowp-grid asowp-grid-cols-4 w-full gap-4 asowp-justify-between asowp-items-center">
                        <div class="asowp-flex asowp-flex-col w-1/4 asowp-space-y-2">
                            <label class="asowp-text-[12px] asowp-text-[#444444]">Background Color</label>
                            <div class="asowp-relative asowp-flex">
                                <input
                                    id="colorPicker"
                                    type="color"
                                    v-model="themes.colors.recaps.backgroundColor"
                                    @input="updateRecapsBackgroundColor"
                                    class="asowp-w-9 asowp-h-[30px]"
                                />
                                <input
                                    type="text"
                                    v-model="themes.colors.recaps.backgroundColor"
                                    @input="updateRecapsBackgroundColor"
                                    class="asowp-p-1 asowp-text-black asowp-w-full asowp-translate-y-0"
                                />
                            </div>
                        </div>
                        <div class="asowp-flex asowp-flex-col w-1/4 asowp-space-y-2">
                            <label class="asowp-text-[12px] asowp-text-[#444444]">Header Background Color</label>
                            <div class="asowp-relative asowp-flex">
                                <input
                                    id="colorPicker"
                                    type="color"
                                    v-model="themes.colors.recaps.headerBackgroundColor"
                                    @input="updateRecapsHeaderBackgroundColor"
                                    class="asowp-w-9 asowp-h-[30px]"
                                />
                                <input
                                    type="text"
                                    v-model="themes.colors.recaps.headerBackgroundColor"
                                    @input="updateRecapsHeaderBackgroundColor"
                                    class="asowp-p-1 asowp-text-black asowp-w-full asowp-translate-y-0"
                                />
                            </div>
                        </div>
                        <div class="asowp-flex asowp-flex-col w-1/4 asowp-space-y-2">
                            <label class="asowp-text-[12px] asowp-text-[#444444]">Header Text Color</label>
                            <div class="asowp-relative asowp-flex">
                                <input
                                    id="colorPicker"
                                    type="color"
                                    v-model="themes.colors.recaps.headerTextColor"
                                    @input="updateRecapsHeaderTextColor"
                                    class="asowp-w-9 asowp-h-[30px]"
                                />
                                <input
                                    type="text"
                                    v-model="themes.colors.objectsOptions.edit.buttonColor"
                                    @input="updateRecapsHeaderTextColor"
                                    class="asowp-p-1 asowp-text-black asowp-w-full asowp-translate-y-0"
                                />
                            </div>
                        </div>
                        <div class="asowp-flex asowp-flex-col w-1/4 asowp-space-y-2">
                            <label class="asowp-text-[12px] asowp-text-[#444444]">Recaps Option Hover Background Color</label>
                            <div class="asowp-relative asowp-flex">
                                <input
                                    id="colorPicker"
                                    type="color"
                                    v-model="themes.colors.recaps.optionHoverBackgroundColor"
                                    @input="updateRecapsOptionHoverBackgroundColor"
                                    class="asowp-w-9 asowp-h-[30px]"
                                />
                                <input
                                    type="text"
                                    v-model="themes.colors.recaps.optionHoverBackgroundColor"
                                    @input="updateRecapsOptionHoverBackgroundColor"
                                    class="asowp-p-1 asowp-text-black asowp-w-full asowp-translate-y-0"
                                />
                            </div>
                        </div>
                        <div class="asowp-flex asowp-flex-col w-1/4 asowp-space-y-2">
                            <label class="asowp-text-[12px] asowp-text-[#444444]">Recaps Option Hover Text Color</label>
                            <div class="asowp-relative asowp-flex">
                                <input
                                    id="colorPicker"
                                    type="color"
                                    v-model="themes.colors.recaps.optionHoverTextColor"
                                    @input="updateRecapsOptionHoverTextColor"
                                    class="asowp-w-9 asowp-h-[30px]"
                                />
                                <input
                                    type="text"
                                    v-model="themes.colors.recaps.optionHoverTextColor"
                                    @input="updateRecapsOptionHoverTextColor"
                                    class="asowp-p-1 asowp-text-black asowp-w-full asowp-translate-y-0"
                                />
                            </div>
                        </div>
                        <div class="asowp-flex asowp-flex-col w-1/4 asowp-space-y-2">
                            <label class="asowp-text-[12px] asowp-text-[#444444]">Recaps Option Text Color</label>
                            <div class="asowp-relative asowp-flex">
                                <input
                                    id="colorPicker"
                                    type="color"
                                    v-model="themes.colors.recaps.optionTextColor"
                                    @input="updateRecapsOptionTextColor"
                                    class="asowp-w-9 asowp-h-[30px]"
                                />
                                <input
                                    type="text"
                                    v-model="themes.colors.recaps.optionTextColor"
                                    @input="updateRecapsOptionTextColor"
                                    class="asowp-p-1 asowp-text-black asowp-w-full asowp-translate-y-0"
                                />
                            </div>
                        </div>
                        <div class="asowp-flex asowp-flex-col w-1/4 asowp-space-y-2">
                            <label class="asowp-text-[12px] asowp-text-[#444444]">Recaps Option Border Color</label>
                            <div class="asowp-relative asowp-flex">
                                <input
                                    id="colorPicker"
                                    type="color"
                                    v-model="themes.colors.recaps.optionBorderColor"
                                    @input="updateRecapsOptionBorderColor"
                                    class="asowp-w-9 asowp-h-[30px]"
                                />
                                <input
                                    type="text"
                                    v-model="themes.colors.recaps.optionBorderColor"
                                    @input="updateRecapsOptionBorderColor"
                                    class="asowp-p-1 asowp-text-black asowp-w-full asowp-translate-y-0"
                                />
                            </div>
                        </div>
                        <div class="asowp-flex asowp-flex-col w-1/4 asowp-space-y-2">
                            <label class="asowp-text-[12px] asowp-text-[#444444]">Recaps Option Border Hover Color</label>
                            <div class="asowp-relative asowp-flex">
                                <input
                                    id="colorPicker"
                                    type="color"
                                    v-model="themes.colors.recaps.optionHoverBorderColor"
                                    @input="updateRecapsOptionHoverBorderColor"
                                    class="asowp-w-9 asowp-h-[30px]"
                                />
                                <input
                                    type="text"
                                    v-model="themes.colors.recaps.optionBorderColor"
                                    @input="updateRecapsOptionHoverBorderColor"
                                    class="asowp-p-1 asowp-text-black asowp-w-full asowp-translate-y-0"
                                />
                            </div>
                        </div>
                        <div class="asowp-flex asowp-flex-col w-1/4 asowp-space-y-2">
                            <label class="asowp-text-[12px] asowp-text-[#444444]">Button Finish Background Color</label>
                            <div class="asowp-relative asowp-flex">
                                <input
                                    id="colorPicker"
                                    type="color"
                                    v-model="themes.colors.recaps.buttonFinishBackgroundColor"
                                    @input="updateRecapsButtonFinishBackgroundColor"
                                    class="asowp-w-9 asowp-h-[30px]"
                                />
                                <input
                                    type="text"
                                    v-model="themes.colors.recaps.buttonFinishBackgroundColor"
                                    @input="updateRecapsButtonFinishBackgroundColor"
                                    class="asowp-p-1 asowp-text-black asowp-w-full asowp-translate-y-0"
                                />
                            </div>
                        </div>
                        <div class="asowp-flex asowp-flex-col w-1/4 asowp-space-y-2">
                            <label class="asowp-text-[12px] asowp-text-[#444444]">Button Finish Hover Background Color</label>
                            <div class="asowp-relative asowp-flex">
                                <input
                                    id="colorPicker"
                                    type="color"
                                    v-model="themes.colors.recaps.buttonFinishHoverBackgroundColor"
                                    @input="updateRecapsButtonFinishHoverBackgroundColor"
                                    class="asowp-w-9 asowp-h-[30px]"
                                />
                                <input
                                    type="text"
                                    v-model="themes.colors.recaps.buttonFinishHoverBackgroundColor"
                                    @input="updateRecapsButtonFinishHoverBackgroundColor"
                                    class="asowp-p-1 asowp-text-black asowp-w-full asowp-translate-y-0"
                                />
                            </div>
                        </div>
                        <div class="asowp-flex asowp-flex-col w-1/4 asowp-space-y-2">
                            <label class="asowp-text-[12px] asowp-text-[#444444]">Button Finish Text Color</label>
                            <div class="asowp-relative asowp-flex">
                                <input
                                    id="colorPicker"
                                    type="color"
                                    v-model="themes.colors.recaps.buttonFinishTextColor"
                                    @input="updateRecapsButtonFinishTextColor"
                                    class="asowp-w-9 asowp-h-[30px]"
                                />
                                <input
                                    type="text"
                                    v-model="themes.colors.recaps.buttonFinishTextColor"
                                    @input="updateRecapsButtonFinishTextColor"
                                    class="asowp-p-1 asowp-text-black asowp-w-full asowp-translate-y-0"
                                />
                            </div>
                        </div>
                        <div class="asowp-flex asowp-flex-col w-1/4 asowp-space-y-2">
                            <label class="asowp-text-[12px] asowp-text-[#444444]">Button Finish Text Hover Color</label>
                            <div class="asowp-relative asowp-flex">
                                <input
                                    id="colorPicker"
                                    type="color"
                                    v-model="themes.colors.recaps.buttonFinishHoverTextColor"
                                    @input="updateRecapsButtonFinishHoverTextColor"
                                    class="asowp-w-9 asowp-h-[30px]"
                                />
                                <input
                                    type="text"
                                    v-model="themes.colors.recaps.buttonFinishHoverTextColor"
                                    @input="updateRecapsButtonFinishHoverTextColor"
                                    class="asowp-p-1 asowp-text-black asowp-w-full asowp-translate-y-0"
                                />
                            </div>
                        </div>
                        <div class="asowp-flex asowp-flex-col w-1/4 asowp-space-y-2">
                            <label class="asowp-text-[12px] asowp-text-[#444444]">Button AddToCart Background Color</label>
                            <div class="asowp-relative asowp-flex">
                                <input
                                    id="colorPicker"
                                    type="color"
                                    v-model="themes.colors.recaps.buttonAddToCartBackgroundColor"
                                    @input="updateRecapsButtonAddToCartBackgroundColor"
                                    class="asowp-w-9 asowp-h-[30px]"
                                />
                                <input
                                    type="text"
                                    v-model="themes.colors.recaps.buttonAddToCartBackgroundColor"
                                    @input="updateRecapsButtonAddToCartBackgroundColor"
                                    class="asowp-p-1 asowp-text-black asowp-w-full asowp-translate-y-0"
                                />
                            </div>
                        </div>
                        <div class="asowp-flex asowp-flex-col w-1/4 asowp-space-y-2">
                            <label class="asowp-text-[12px] asowp-text-[#444444]">Button AddToCart Hover Background Color</label>
                            <div class="asowp-relative asowp-flex">
                                <input
                                    id="colorPicker"
                                    type="color"
                                    v-model="themes.colors.recaps.buttonAddToCartHoverBackgroundColor"
                                    @input="updateRecapsButtonAddToCartHoverBackgroundColor"
                                    class="asowp-w-9 asowp-h-[30px]"
                                />
                                <input
                                    type="text"
                                    v-model="themes.colors.recaps.buttonAddToCartHoverBackgroundColor"
                                    @input="updateRecapsButtonAddToCartHoverBackgroundColor"
                                    class="asowp-p-1 asowp-text-black asowp-w-full asowp-translate-y-0"
                                />
                            </div>
                        </div>
                        <div class="asowp-flex asowp-flex-col w-1/4 asowp-space-y-2">
                            <label class="asowp-text-[12px] asowp-text-[#444444]">Button AddToCart Text Color</label>
                            <div class="asowp-relative asowp-flex">
                                <input
                                    id="colorPicker"
                                    type="color"
                                    v-model="themes.colors.recaps.buttonAddToCartTextColor"
                                    @input="updateRecapsButtonAddToCartTextColor"
                                    class="asowp-w-9 asowp-h-[30px]"
                                />
                                <input
                                    type="text"
                                    v-model="themes.colors.recaps.buttonAddToCartTextColor"
                                    @input="updateRecapsButtonAddToCartTextColor"
                                    class="asowp-p-1 asowp-text-black asowp-w-full asowp-translate-y-0"
                                />
                            </div>
                        </div>
                        <div class="asowp-flex asowp-flex-col w-1/4 asowp-space-y-2">
                            <label class="asowp-text-[12px] asowp-text-[#444444]">Button AddToCart Text Hover Color</label>
                            <div class="asowp-relative asowp-flex">
                                <input
                                    id="colorPicker"
                                    type="color"
                                    v-model="themes.colors.recaps.buttonAddToCartHoverTextColor"
                                    @input="updateRecapsButtonAddToCartHoverTextColor"
                                    class="asowp-w-9 asowp-h-[30px]"
                                />
                                <input
                                    type="text"
                                    v-model="themes.colors.recaps.buttonAddToCartHoverTextColor"
                                    @input="updateRecapsButtonAddToCartHoverTextColor"
                                    class="asowp-p-1 asowp-text-black asowp-w-full asowp-translate-y-0"
                                />
                            </div>
                        </div>
                        <div class="asowp-flex asowp-flex-col w-1/4 asowp-space-y-2">
                            <label class="asowp-text-[12px] asowp-text-[#444444]">Button Edit Background Color</label>
                            <div class="asowp-relative asowp-flex">
                                <input
                                    id="colorPicker"
                                    type="color"
                                    v-model="themes.colors.recaps.buttonEditBackgroundColor"
                                    @input="updateRecapsButtonEditBackgroundColor"
                                    class="asowp-w-9 asowp-h-[30px]"
                                />
                                <input
                                    type="text"
                                    v-model="themes.colors.recaps.buttonEditBackgroundColor"
                                    @input="updateRecapsButtonEditBackgroundColor"
                                    class="asowp-p-1 asowp-text-black asowp-w-full asowp-translate-y-0"
                                />
                            </div>
                        </div>
                        <div class="asowp-flex asowp-flex-col w-1/4 asowp-space-y-2">
                            <label class="asowp-text-[12px] asowp-text-[#444444]">Button Edit Hover Background Color</label>
                            <div class="asowp-relative asowp-flex">
                                <input
                                    id="colorPicker"
                                    type="color"
                                    v-model="themes.colors.recaps.buttonEditHoverBackgroundColor"
                                    @input="updateRecapsButtonEditHoverBackgroundColor"
                                    class="asowp-w-9 asowp-h-[30px]"
                                />
                                <input
                                    type="text"
                                    v-model="themes.colors.recaps.buttonEditHoverBackgroundColor"
                                    @input="updateRecapsButtonEditHoverBackgroundColor"
                                    class="asowp-p-1 asowp-text-black asowp-w-full asowp-translate-y-0"
                                />
                            </div>
                        </div>
                        <div class="asowp-flex asowp-flex-col w-1/4 asowp-space-y-2">
                            <label class="asowp-text-[12px] asowp-text-[#444444]">Button Edit Text Color</label>
                            <div class="asowp-relative asowp-flex">
                                <input
                                    id="colorPicker"
                                    type="color"
                                    v-model="themes.colors.recaps.buttonEditTextColor"
                                    @input="updateRecapsButtonEditTextColor"
                                    class="asowp-w-9 asowp-h-[30px]"
                                />
                                <input
                                    type="text"
                                    v-model="themes.colors.recaps.buttonEditTextColor"
                                    @input="updateRecapsButtonEditTextColor"
                                    class="asowp-p-1 asowp-text-black asowp-w-full asowp-translate-y-0"
                                />
                            </div>
                        </div>
                        <div class="asowp-flex asowp-flex-col w-1/4 asowp-space-y-2">
                            <label class="asowp-text-[12px] asowp-text-[#444444]">Button Edit Text Hover Color</label>
                            <div class="asowp-relative asowp-flex">
                                <input
                                    id="colorPicker"
                                    type="color"
                                    v-model="themes.colors.recaps.buttonEditHoverTextColor"
                                    @input="updateRecapsButtonEditHoverTextColor"
                                    class="asowp-w-9 asowp-h-[30px]"
                                />
                                <input
                                    type="text"
                                    v-model="themes.colors.recaps.buttonEditHoverTextColor"
                                    @input="updateRecapsButtonEditHoverTextColor"
                                    class="asowp-p-1 asowp-text-black asowp-w-full asowp-translate-y-0"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="dropdownColorsSections['recaps']" @click="dropdownColorsSections['recaps']=false" class="asowp-flex asowp-absolute asowp-justify-center asowp-items-center  asowp-my-0 asowp-right-8 asowp-top-0 asowp-shadow-md asowp-rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="asowp-w-6 asowp-h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 18.75 7.5-7.5 7.5 7.5" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 7.5-7.5 7.5 7.5" />
                    </svg>
                </div>
                <div v-if="!dropdownColorsSections['recaps']" @click="dropdownColorsSections['recaps']=true" class="asowp-flex asowp-absolute asowp-justify-center asowp-items-center  asowp-my-0 asowp-right-8 asowp-top-0 asowp-shadow-md asowp-rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="asowp-w-6 asowp-h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5" />
                    </svg>
                </div>
            </div>
        </div>
        <div v-show="state=='custom'" class="asowp-w-full asowp-h-full asowp-translate-y-9">
            <div class="asowp-p-4">
                <textarea name="" id="" placeholder="write your custom css here!!" v-model="themes.customCSS" cols="30" rows="10" class="placeholder:asowp-italic placeholder:asowp-text-slate-400 asowp-w-full asowp-h-full asowp-rounded-none"></textarea>
            </div> 
        </div>
        <div class="asowp-sticky asowp-bottom-0 asowp-bg-[#F8F9FB] asowp-flex asowp-space-x-4 asowp-px-4 asowp-py-3 asowp-justify-end asowp-items-end asowp-translate-y-12">
            <div class="asowp-bg-[#016464] asowp-rounded">
                <button :disabled="isLoading" @click="updateThemesSettings" class="asowp-rounded asowp-flex asowp-bg-transparent asowp-w-fit asowp-space-x-2 asowp-h-fit asowp-text-white asowp-px-12 asowp-p-2.5 asowp-border-none asowp-opacity-90 hover:asowp-opacity-100 hover:asowp-border-none hover:asowp-text-white hover:asowp-bg-[#016464] asowp-cursor-pointerasowp-flex asowp-bg-transparent asowp-w-fit asowp-space-x-2 asowp-h-fit asowp-text-white asowp-px-12 asowp-p-2.5 asowp-border-none asowp-opacity-90 hover:asowp-opacity-100 hover:asowp-border-none hover:asowp-text-white hover:asowp-bg-[#016464] asowp-cursor-pointer">
                    <img src="../../../../../../assets/icons/ic_loading_gray.svg" class="asowp-w-5 asowp-w-5" v-if="isLoading" />
                    <div class="asowp-font-semibold asowp-text-[16px]">Save</div>
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
    skin: "default",
    colors: {
        canvas: {
        backgroundColor: "#f4f8fa",
        borderColor: "#c3cfd6"
        },
        bars: {
        titleColor: "#000000",
        backgroundColor: "#ffffff",
        reset: {
            textColor: "#000000",
            hoverTextColor: "#dd3232",
            backgroundColor: "#ffffff",
            hoverBackgroundColor: "#f4f8fa",
            borderColor: "#ffffff",
            hoverBorderColor: "#f4f8fa",
            modalBackgroundColor: "#000000",
            modalContainerBackground: "#ffffff",
            modalTextColor: "#000000",
            modalYesButtonBackgroundColor: "#f4f8fa",
            modalYesButtonTextColor: "#000000",
            modalNoButtonBackgroundColor: "#dc2626",
            modalNoButtonTextColor: "#ffffff"
        },
        undoRedo: {
            textColor: "#000000",
            hoverTextColor: "#016464",
            backgroundColor: "#ffffff",
            hoverBackgroundColor: "#f4f8fa",
            borderColor: "#ffffff",
            hoverBorderColor: "#f4f8fa",
            disabledBackgroundColor: "#ffffff",
            disabledTextColor: "#c3cfd6"
        },
        preview: {
            textColor: "#000000",
            hoverTextColor: "#016464",
            backgroundColor: "#ffffff",
            hoverBackgroundColor: "#f4f8fa",
            borderColor: "#ffffff",
            hoverBorderColor: "#f4f8fa"
        },
        help: {
            textColor: "#ffffff",
            hoverTextColor: "#ffffff",
            backgroundColor: "#016464",
            hoverBackgroundColor: "#016464",
            borderColor: "#016464",
            hoverBorderColor: "#016464"
        },
        price: {
            backgroundColor: "#ffffff",
            textColor: "#000000",
            textAfterColor: "#000000",
            textBeforeColor: "#000000"
        }
        },
        optionsSideBar: {
        backgroundColor: "#eef3f6",
        scrollButtonsBackgroundColor: "#4a4a4a",
        scrollButtonsHoverBackgroundColor: "#74848d",
        scrollButtonsTextColor: "#ffffff",
        scrollButtonsHoverTextColor: "#ffffff",
        options: {
            buttons: {
            backgroundColor: "#ffffff",
            hoverBackgroundColor: "#ffffff",
            textColor: "#000000",
            hoverTextColor: "#016464",
            hovertextColor: "#016464"
            },
            modals: {
            headerBackgroundColor: "#016464",
            headerTextColor: "#ffffff",
            textColor: "#000000",
            option: {
                textColor: "#000000",
                hoverBackgroundColor: "#eef3f6",
                hoverTextColor: "#000000",
                activeTextColor: "#016464"
            },
            buttons: {
                backgroundColor: "#016464",
                hoverBackgroundColor: "#028383",
                textColor: "#ffffff",
                hoverTextColor: "#ffffff"
            },
            backgroundColor: "#ffffff"
            }
        }
        },
        objectsOptions: {
        backgroundColor: "#ffffff",
        edit: {
            buttonColor: "#ffffff",
            hoverButtonColor: "#787878",
            textColor: "#000000",
            hoverTextColor: "#ffffff"
        },
        clone: {
            buttonColor: "#ffffff",
            hoverButtonColor: "#787878",
            textColor: "#000000",
            hoverTextColor: "#ffffff"
        },
        delete: {
            buttonColor: "#ffffff",
            hoverButtonColor: "#787878",
            textColor: "#dd3232",
            hoverTextColor: "#dd3232"
        },
        center: {
            buttonColor: "#ffffff",
            hoverButtonColor: "#787878",
            textColor: "#000000",
            hoverTextColor: "#ffffff"
        }
        },
        recaps: {
        headerBackgroundColor: "#058585",
        headerTextColor: "#ffffff",
        backgroundColor: "#ffffff",
        optionTextColor: "#000000",
        optionHoverBackgroundColor: "#eef3f6",
        optionHoverTextColor: "#000000",
        optionBorderColor: "#eef3f6",
        optionHoverBorderColor: "#eef3f6",
        buttonFinishBackgroundColor: "#febd52",
        buttonFinishTextColor: "#14213d",
        buttonFinishHoverBackgroundColor: "#fcac29",
        buttonFinishHoverTextColor: "#313e52",
        buttonAddToCartBackgroundColor: "#febd52",
        buttonAddToCartHoverBackgroundColor: "#fcac29",
        buttonAddToCartTextColor: "#14213d",
        buttonAddToCartHoverTextColor: "#313e52",
        buttonEditBackgroundColor: "#016464",
        buttonEditHoverBackgroundColor: "#058585",
        buttonEditTextColor: "#ffffff",
        buttonEditHoverTextColor: "#f4f8fa"
        }
    },
    customCSS: ""
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

