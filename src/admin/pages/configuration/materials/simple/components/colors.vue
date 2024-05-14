<template>
    <div class="">
        <div class="aso-h-[70vh] aso-overflow-y-auto aso-overflow-x-hidden aso-space-y-1 py-2" v-if="!isNewColor">
            <div class="aso-flex aso-justify-end aso-bg-[#F8F9FB] aso-px-4 aso-py-4 aso-pb-2">
                <button v-if="!isFetching" :disabled="isLoading" :class="`aso-flex aso-w-fit aso-h-fit aso-rounded aso-bg-[#016464] aso-px-4 aso-space-x-2 aso-p-1.5 aso-border-none aso-text-white aso-opacity-90 hover:aso-opacity-100 ${isLoading?'aso-cursor-not-allowed':'aso-cursor-pointer'}`" @click="newColor">
                    <svg class="aso-w-5 aso-h-5" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="plus-lg">
                        <path id="Vector" fill-rule="evenodd" clip-rule="evenodd" d="M11 2.75C11.1823 2.75 11.3572 2.82243 11.4861 2.95136C11.6151 3.0803 11.6875 3.25516 11.6875 3.4375V10.3125H18.5625C18.7448 10.3125 18.9197 10.3849 19.0486 10.5139C19.1776 10.6428 19.25 10.8177 19.25 11C19.25 11.1823 19.1776 11.3572 19.0486 11.4861C18.9197 11.6151 18.7448 11.6875 18.5625 11.6875H11.6875V18.5625C11.6875 18.7448 11.6151 18.9197 11.4861 19.0486C11.3572 19.1776 11.1823 19.25 11 19.25C10.8177 19.25 10.6428 19.1776 10.5139 19.0486C10.3849 18.9197 10.3125 18.7448 10.3125 18.5625V11.6875H3.4375C3.25516 11.6875 3.0803 11.6151 2.95136 11.4861C2.82243 11.3572 2.75 11.1823 2.75 11C2.75 10.8177 2.82243 10.6428 2.95136 10.5139C3.0803 10.3849 3.25516 10.3125 3.4375 10.3125H10.3125V3.4375C10.3125 3.25516 10.3849 3.0803 10.5139 2.95136C10.6428 2.82243 10.8177 2.75 11 2.75Z" fill="white"/>
                        </g>
                    </svg>
                    <div class="aso-text-[14px]">
                        Add material Color
                    </div>
                </button>
            </div>
            <div class="aso-relative" id="monTableau">
                <table class="aso-w-full aso-text-center aso-px-4 aso-border aso-border-collapse aso-border-0">
                    <thead class="aso-text-[14px] aso-bg-[#f0f0f1] aso-sticky aso-top-0 aso-z-[999]">
                        <tr class="">
                            <th scope="col" class="aso-p-4 aso-px-8 aso-w-12 aso-font-normal">
                                Title 
                            </th>
                            <th scope="col" class="aso-px-6 aso-py-3 aso-font-normal">
                                Text color
                            </th>
                            <th scope="col" class="aso-px-6 aso-py-3 aso-font-normal">
                                Background color
                            </th>
                            <th scope="col" class="aso-px-6 aso-py-3 aso-font-normal">
                                Additional Price
                            </th>
                            <th scope="col" class="aso-px-6 aso-py-3 aso-font-normal">
                                Default
                            </th>
                            <th scope="col" class="aso-px-6 aso-py-3 aso-font-normal">
                                Action
                            </th>
                            
                        </tr>
                    </thead>
                    <tbody class="aso-bg-white">
                        
                        <tr v-if="isFetching">
                            <td colspan="7">
                                <div class="aso-bg-white aso-border-solid aso-border aso-border-[#D1D1D1] aso-flex aso-flex-col aso-space-y-2 aso-justify-center aso-items-center aso-w-full aso-h-[200px] p-4">
                                    <img class="aso-w-[100px] aso-h-[100px]" src="../../../../../../../assets/icons/ic_loading.svg" alt="">
                                </div>
                            </td>
                        </tr>
                        <tr  v-if="colors.allColors.length == 0 && !isFetching">
                            <td colspan="7">
                                <div class="aso-bg-white aso-border-solid aso-border aso-border-[#D1D1D1] aso-flex aso-flex-col aso-space-y-12 aso-justify-center aso-items-center aso-py-10 aso-h-[150px]">
                                    <div class="aso-flex aso-flex-col aso-space-y-2 aso-justify-center aso-items-center">
                                        <p class="aso-text-2xl aso-font-bold">{{noColorsFound}}</p>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr v-for="(color, key) in colors.allColors" class="aso-border-t-0 aso-border-l-0 aso-border-r-0 aso-border-b-2 aso-border-solid aso-border-[#f0f0f1]" :key="key">
                            <td class="aso-text-center aso-px-5 aso-p-4">
                                {{ color.name }}
                            </td>
                            
                            <td class="aso-text-[12px] aso-px-6">
                                <div class="aso-text-[12px] aso-px-6 aso-py-2 aso-flex aso-justify-center aso-items-center">
                                    <span v-if="!color.textColor.active" class="aso-w-fit aso-rounded-lg aso-text-center aso-px-2 aso-p-1 aso-bg-[#F8E7E7] aso-text-[#EF5A35] aso-border-none">
                                        Disable
                                    </span>
                                    <div v-if="color.textColor.active" :class="`aso-text-center aso-bg-[${color.textColor.codeHex}] aso-border-solid aso-border-[#000000] aso-rounded aso-w-[50px] aso-h-[50px]`"></div>
                                </div>
                            </td>
                            <td class="aso-text-[12px] aso-px-6">
                                <div class="aso-text-[12px] aso-px-6 aso-py-2 aso-flex aso-justify-center aso-items-center">
                                    <div v-if="color.pattern.active" class="aso-relative">
                                        <img :src="color.pattern.url" alt="" srcset="" class="aso-w-[50px] aso-h-[50px] aso-rounded">
                                    </div>
                                    <div :class="`aso-text-center aso-bg-[${color.pattern.codeHex}] aso-border-solid aso-border-[#000000] aso-rounded aso-w-[50px] aso-h-[50px]`"  v-if="!color.pattern.active"></div>
                                </div>
                            </td>
                            <td class="aso-text-[12px] aso-px-6 aso-py-2">
                                <span class="aso-w-fit aso-rounded-lg aso-text-center aso-px-2 aso-p-1 aso-bg-[#9ACD321F] aso-text-[#466801] aso-border-none">
                                    {{color.additionalPrice}}
                                </span>
                            </td>
                            <td class="aso-pl-10 aso-py-2">
                                <span class="aso-w-fit aso-flex aso-items-center aso-translate-x-5 aso-translate-y-0.5">
                                    <label for="aso-toggle" @click="!isLoading?selectDefault(key):''" class="aso-cursor-pointer aso-bg-[#F8F8FF] aso-border-[1px] aso-border-solid aso-border-black aso-w-6 aso-h-0.5 aso-rounded-full aso-p-1">
                                        <div :class="color.isDefault ? 'aso-translate-x-[100%] aso-border-[#016464]':'aso-border-[#FFFFFF]'" class="aso-toggle-dot aso-w-2.5 aso-h-2.5 aso-duration-100 -aso-translate-y-[8px] -aso-translate-x-2 aso-border-[4px] aso-border-solid aso-bg-[#D9D9D9] aso-rounded-full aso-shadow-md aso-transform"></div>
                                    </label>
                                </span>
                            </td>
                            <td class="aso-px-6 aso-text-center">
                                <button class="aso-bg-transparent aso-border-none aso-text-[#2DD05B] aso-cursor-pointer">
                                    <img class="aso-w-5 aso-h-5" src="../../../../../../../assets/icons/ic_edit.svg" alt="" @click="selectMaterialColor(key,color)">
                                </button>
                                <button class="aso-bg-transparent aso-border-none aso-text-[#A00000] aso-cursor-pointer">
                                    <img class="aso-w-5 aso-h-5" src="../../../../../../../assets/icons/ic_delete.svg" alt="" @click="selectMaterialColor(key,color,true)">
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="aso-space-y-2" v-if="!isFetching && !isNewColor">
            <div class="aso-bg-[#F8F9FB] aso-text-[16px] aso-font-medium aso-px-8 aso-py-8 ">
                <div class="aso-flex ">
                    Enable Custom Color
                    <div @click="handleChangeCustomColorsActive" class="aso-flex aso-items-center aso-translate-x-5 aso-translate-y-0.5">
                        <label for="aso-toggle"  class="aso-cursor-pointer aso-bg-[#F8F8FF] aso-border-[1px] aso-border-solid aso-border-black aso-w-6 aso-h-0.5 aso-rounded-full aso-p-1">
                            <div :class="colors.customColors.active ? 'aso-translate-x-[120%] aso-border-[#016464]':'aso-border-[#FFFFFF]'" class="aso-toggle-dot aso-w-2.5 aso-h-2.5 aso-duration-100 -aso-translate-y-[8px] -aso-translate-x-2 aso-border-[4px] aso-border-solid aso-bg-[#D9D9D9] aso-rounded-full aso-shadow-md aso-transform"></div>
                        </label>
                    </div>
                </div>
                <div class="aso-space-y-6 aso-pt-12" v-if="colors.customColors.active">
                    <div class="aso-flex aso-justify-between">
                        <div class="aso-w-2/5 aso-space-y-2 aso-text-[12px] aso-flex aso-flex-col">
                            <label for="" class="aso-bold aso-font-normal">Label</label>
                            <input type="text" v-model="colors.customColors.label"  class="aso-rounded aso-w-full aso-h-[30px]">
                        </div>
                        <div class="aso-w-2/5 aso-space-x-2 aso-flex aso-flex-col">
                            <label for="" class="aso-text-[12px] aso-text[#444444] aso-font-normal">Custom Color Preview Image</label>
                            <div class="aso-flex aso-flex-col aso-space-y-2 aso-w-full aso-pt-2">
                                <div class="aso-flex aso-space-x-2">
                                    <button @click="selectCustomPrevImage" class="aso-bg-[#016464] aso-border-none aso-w-fit aso-h-fit aso-p-4 aso-rounded aso-px-4 aso-text-white aso-opacity-90 hover:aso-opacity-100 aso-text-[10px] aso-cursor-pointer">Upload image</button>
                                    <div :class="`aso-relative aso-w-[82px] aso-h-[49px] aso-rounded-md aso-overflow-hidden`">
                                        <img v-if="colors.customColors.prevImg != ''" :src="colors.customColors.prevImg" alt="" class="aso-absolute aso-w-full aso-h-full">
                                        <button v-if="colors.customColors.prevImg != ''" @click="()=>{colors.customColors.prevImg = ''}" :class="`aso-bg-[#016464] aso-absolute aso-bottom-0 aso-right-0 aso-text-white aso-p-1 aso-rounded-tl-lg aso-border-none`">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="aso-w-4 aso-h-4">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>             
                        </div> 
                    </div>
                </div>
            </div>
            <div class="aso-space-x-4 aso-px-4 aso-py-4 aso-justify-end aso-items-end">
                <div class="aso-flex aso-justify-end">
                    <button @click="updateMaterialColor" class="aso-flex aso-bg-[#016464]  aso-w-fit aso-space-x-2 aso-h-fit aso-text-white aso-px-8 aso-p-2.5 aso-rounded aso-border-none aso-opacity-90 hover:aso-opacity-100 hover:aso-border-none hover:aso-text-white hover:aso-bg-[#016464] aso-cursor-pointer">
                        <div class="aso-translate-y-1">
                            <img src="../../../../../../../assets/icons/ic_loading_gray.svg" class="aso-w-5 aso-w-5" v-if="isLoading" :disabled="isLoading"/>
                            <svg v-if="!isLoading" class="aso-w-4 aso-h-4" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2.5 1.25C2.16848 1.25 1.85054 1.3817 1.61612 1.61612C1.3817 1.85054 1.25 2.16848 1.25 2.5V17.5C1.25 17.8315 1.3817 18.1495 1.61612 18.3839C1.85054 18.6183 2.16848 18.75 2.5 18.75H17.5C17.8315 18.75 18.1495 18.6183 18.3839 18.3839C18.6183 18.1495 18.75 17.8315 18.75 17.5V2.5C18.75 2.16848 18.6183 1.85054 18.3839 1.61612C18.1495 1.3817 17.8315 1.25 17.5 1.25H11.875C11.5435 1.25 11.2255 1.3817 10.9911 1.61612C10.7567 1.85054 10.625 2.16848 10.625 2.5V11.6163L13.9325 8.3075C14.0499 8.19014 14.209 8.12421 14.375 8.12421C14.541 8.12421 14.7001 8.19014 14.8175 8.3075C14.9349 8.42486 15.0008 8.58403 15.0008 8.75C15.0008 8.91597 14.9349 9.07514 14.8175 9.1925L10.4425 13.5675C10.3844 13.6257 10.3155 13.6719 10.2395 13.7034C10.1636 13.7349 10.0822 13.7511 10 13.7511C9.91779 13.7511 9.83639 13.7349 9.76046 13.7034C9.68453 13.6719 9.61556 13.6257 9.5575 13.5675L5.1825 9.1925C5.12439 9.13439 5.07829 9.0654 5.04685 8.98948C5.0154 8.91356 4.99921 8.83218 4.99921 8.75C4.99921 8.66782 5.0154 8.58644 5.04685 8.51052C5.07829 8.4346 5.12439 8.36561 5.1825 8.3075C5.24061 8.24939 5.3096 8.20329 5.38552 8.17185C5.46144 8.1404 5.54282 8.12421 5.625 8.12421C5.70718 8.12421 5.78856 8.1404 5.86448 8.17185C5.9404 8.20329 6.00939 8.24939 6.0675 8.3075L9.375 11.6163V2.5C9.375 1.83696 9.63839 1.20107 10.1072 0.732233C10.5761 0.263392 11.212 0 11.875 0L17.5 0C18.163 0 18.7989 0.263392 19.2678 0.732233C19.7366 1.20107 20 1.83696 20 2.5V17.5C20 18.163 19.7366 18.7989 19.2678 19.2678C18.7989 19.7366 18.163 20 17.5 20H2.5C1.83696 20 1.20107 19.7366 0.732233 19.2678C0.263392 18.7989 0 18.163 0 17.5V2.5C0 1.83696 0.263392 1.20107 0.732233 0.732233C1.20107 0.263392 1.83696 0 2.5 0L5.625 0C5.79076 0 5.94973 0.065848 6.06694 0.183058C6.18415 0.300269 6.25 0.45924 6.25 0.625C6.25 0.79076 6.18415 0.949732 6.06694 1.06694C5.94973 1.18415 5.79076 1.25 5.625 1.25H2.5Z" fill="white"/>
                            </svg>
                        </div>

                        <span class="aso-font-semibold aso-text-[16px]">Save</span>
                    </button>
                </div>
            </div>
        </div>
        </div>
        <div class="aso-space-y-2 aso-h-[80vh] aso-overflow-y-auto aso-overflow-x-hidden" v-if="isNewColor">
                
            <div class="aso-text-[16px] aso-font-bold aso-px-4 aso-py-4 aso-bg-[#F8F9FB] aso-sticky-top-0">
                {{isEdit ? 'Edit Color':'Add news colors'}}
            </div>
            <div class="aso-space-y-2" v-if="isEdit">
                <div class="aso-relative aso-px-4 aso-py-4 aso-bg-[#F8F9FB] aso-space-y-2">
                    <div class="aso-flex aso-justify-between">
                        <div class="aso-w-2/5 aso-space-y-2 aso-flex aso-flex-col">
                            <label for="" class="aso-text-[12px] aso-text[#444444] aso-font-normal">Color Name</label>
                            <input type="text" class="aso-rounded aso-w-full aso-h-[30px]" v-model="color.name"> 
                        </div>
                        <div class="aso-w-2/5 aso-space-x-2 aso-flex aso-flex-col">
                            <label for="" class="aso-text-[12px] aso-text[#444444] aso-font-normal">Color Preview Image</label>
                            <div class="aso-flex aso-flex-col aso-space-y-2 aso-w-full aso-pt-2">
                                <div class="aso-flex aso-space-x-2">
                                    <button @click="selectColorPrevImage" class="aso-bg-[#016464] aso-border-none aso-w-fit aso-h-fit aso-p-4 aso-rounded aso-px-4 aso-text-white aso-opacity-90 hover:aso-opacity-100 aso-text-[10px] aso-cursor-pointer">upload image</button>
                                    <div :class="`aso-relative aso-w-[82px] aso-h-[49px] aso-rounded-md aso-overflow-hidden`">
                                        <img v-if="color.prevImg != ''" :src="color.prevImg" alt="" class="aso-absolute aso-w-full aso-h-full">
                                        <button v-if="color.prevImg != ''" @click="()=>{color.prevImg = ''}" :class="`aso-bg-[#016464] aso-absolute aso-bottom-0 aso-right-0 aso-text-white aso-p-1 aso-rounded-tl-lg aso-border-none`">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="aso-w-4 aso-h-4">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>             
                        </div> 
                    </div>
                    <div class="aso-flex aso-justify-between aso-items-center">
                        <div class="aso-w-2/5 aso-space-x-2 aso-flex aso-justify-start">
                            <div>
                                <label for="">Use Color Pattern</label>
                                <p>use a variety code for the color of the article or an image</p>
                            </div>
                            <div class="aso-flex aso-space-x-2 aso-items-center">
                                <span class="aso-text-[#444444] aso-text-[11px]">No</span>
                                <div class="aso-flex aso-items-center">
                                    <label for="aso-toggle" @click="handleChangePatterActive" class="aso-cursor-pointer aso-bg-[#F8F8FF] aso-border-[1px] aso-border-solid aso-border-black aso-w-6 aso-h-0.5 aso-rounded-full aso-p-1">
                                        <div :class="color.pattern.active ? 'aso-translate-x-[100%] aso-border-[#016464]': 'aso-border-[#FFFFFF]'" class="aso-toggle-dot aso-w-2.5 aso-h-2.5 -aso-translate-y-[8px] -aso-translate-x-2 aso-border-[4px] aso-border-solid aso-bg-[#D9D9D9] aso-rounded-full aso-shadow-md aso-transform"></div>
                                    </label>
                                </div>
                                <span class="aso-text-[#444444] aso-text-[11px]">Yes</span>
                            </div>
                        </div>
                        <div class="aso-w-2/5 aso-space-x-2 aso-flex aso-flex-col" v-if="!color.pattern.active">
                            <label for="" class="aso-text-[12px] aso-text[#444444] aso-font-normal">Material Background Color</label>
                            <div class="aso-relative aso-flex">
                                <input
                                    id="colorPicker"
                                    type="color"
                                    v-model="color.pattern.codeHex"
                                    @input="changeBackgroundColor"
                                    class="aso-w-9 aso-h-[30px]"
                                />
                                <input
                                    type="text"
                                    v-model="color.pattern.codeHex"
                                    @input="changeBackgroundColor"
                                    class="aso-p-1 aso-text-black aso-w-full -aso-translate-y-px"
                                />
                            </div>                        
                        </div>
                        <div class="aso-w-2/5 aso-space-x-2 aso-flex aso-flex-col" v-if="color.pattern.active">
                            <label for="" class="aso-text-[12px] aso-text[#444444] aso-font-normal">Background Image</label>
                            <div class="aso-flex aso-flex-col aso-space-y-2 aso-w-full aso-pt-2">
                                <div class="aso-flex aso-space-x-2">
                                    <button @click="(e)=>selectColorBackgroundImage" class="aso-bg-[#016464] aso-border-none aso-w-fit aso-h-fit aso-p-4 aso-rounded aso-px-4 aso-text-white aso-opacity-90 hover:aso-opacity-100 aso-text-[10px] aso-cursor-pointer">upload PopupImg</button>
                                    <div :class="`aso-relative aso-w-[82px] aso-h-[49px] aso-rounded-md aso-overflow-hidden`">
                                        <img v-if="color.pattern.url != ''" :src="color.pattern.url" alt="" class="aso-absolute aso-w-full aso-h-full">
                                        <button v-if="color.pattern.url != ''" @click="()=>{color.pattern.url = ''}" :class="`aso-bg-[#016464] aso-absolute aso-bottom-0 aso-right-0 aso-text-white aso-p-1 aso-rounded-tl-lg aso-border-none`">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="aso-w-4 aso-h-4">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>             
                        </div>
                    </div>
                    <div class="aso-flex aso-justify-between aso-items-center">
                        <div class="aso-w-2/5 aso-space-x-2 aso-flex aso-justify-start">
                            <div>
                                <label for="">Enable Text Color</label>
                                <p>Activate this option to force a single color for texts</p>
                            </div>
                            <div class="aso-flex aso-space-x-2 aso-items-center">
                                <span class="aso-text-[#444444] aso-text-[11px]">No</span>
                                <div class="aso-flex aso-items-center">
                                    <label for="aso-toggle" @click="handleChangeTextColorActive" class="aso-cursor-pointer aso-bg-[#F8F8FF] aso-border-[1px] aso-border-solid aso-border-black aso-w-6 aso-h-0.5 aso-rounded-full aso-p-1">
                                        <div :class="color.textColor.active ? 'aso-translate-x-[100%] aso-border-[#016464]': 'aso-border-[#FFFFFF]'" class="aso-toggle-dot aso-w-2.5 aso-h-2.5 -aso-translate-y-[8px] -aso-translate-x-2 aso-border-[4px] aso-border-solid aso-bg-[#D9D9D9] aso-rounded-full aso-shadow-md aso-transform"></div>
                                    </label>
                                </div>
                                <span class="aso-text-[#444444] aso-text-[11px]">Yes</span>
                            </div>
                        </div>
                    </div>
                    <div class="aso-flex aso-items-center aso-justify-center">
                        <div class="aso-w-2/5 aso-space-x-2 aso-flex aso-justify-start" v-if="color.textColor.active">
                            <label for="" class="aso-text-[12px] aso-text[#444444] aso-font-normal">Use same color for border</label>
                            <div class="aso-flex aso-space-x-2 aso-items-center">
                                <span class="aso-text-[#444444] aso-text-[11px]">No</span>
                                <div class="aso-flex aso-items-center">
                                    <label for="aso-toggle" @click="handleChangeSameForBorderColorActive" class="aso-cursor-pointer aso-bg-[#F8F8FF] aso-border-[1px] aso-border-solid aso-border-black aso-w-6 aso-h-0.5 aso-rounded-full aso-p-1">
                                        <div :class="color.textColor.sameForBorder ? 'aso-translate-x-[100%] aso-border-[#016464]': 'aso-border-[#FFFFFF]'" class="aso-toggle-dot aso-w-2.5 aso-h-2.5 -aso-translate-y-[8px] -aso-translate-x-2 aso-border-[4px] aso-border-solid aso-bg-[#D9D9D9] aso-rounded-full aso-shadow-md aso-transform"></div>
                                    </label>
                                </div>
                                <span class="aso-text-[#444444] aso-text-[11px]">Yes</span>
                            </div>
                        </div>
                        <div class="aso-w-2/5 aso-space-x-2 aso-flex aso-flex-col" v-if="color.textColor.active">
                            <div class="aso-flex aso-space-x-4">
                                <div class="aso-flex aso-flex-col">
                                    <label for="" class="aso-text-[12px] aso-text[#444444] aso-font-normal">Name</label>
                                    <input type="text" v-model="color.textColor.name" id="">
                                </div>
                                <div class="aso-flex aso-flex-col">
                                    <label for="" class="aso-text-[12px] aso-text[#444444] aso-font-normal aso-invisible">Name</label>
                                    <div class="aso-relative aso-flex">
                                        <input
                                            id="colorPicker"
                                            type="color"
                                            v-model="color.textColor.codeHex"
                                            @input="(e)=>changeTextColor"
                                            class="aso-w-9 aso-h-[30px]"
                                        />
                                        <input
                                            type="text"
                                            v-model="color.textColor.codeHex"
                                            @input="(e)=>changeTextColor"
                                            class="aso-p-1 aso-text-black aso-w-full -aso-translate-y-px"
                                        />
                                    </div> 
                                </div>
                                
                            </div>                       
                        </div>
                    </div>
                    <div class="aso-w-2/5 aso-space-y-2 aso-flex aso-flex-col">
                        <label for="" class="aso-text-[12px] aso-text[#444444] aso-font-normal">Additional Price</label>
                        <input type="number" v-model="color.additionalPrice" class="aso-rounded aso-w-full aso-h-[30px]" @blur="color.additionalPrice.trim()==''?color.additionalPrice=0:''">
                    </div>
                </div>
            </div>
            <div class="aso-space-y-2" v-if="!isEdit">
                <div class="aso-relative aso-px-4 aso-py-4 aso-bg-[#F8F9FB] aso-space-y-2" :key="key" v-for="(color,key) in addColors">
                    <div v-if="!dropdownColors[key]" class="aso-flex aso-space-x-4">
                        <h2 class="aso-text-[15px] aso-font-bold">{{ key+1 }}.</h2>
                        <div class="aso-translate-y-3.5">
                            <span class="aso-text-[15px] aso-font-bold">{{ addColors[key].name }}</span>
                            <span v-if="addColors[key].name" class="aso-text-[15px] aso-font-bold"> - {{ addColors[key].additionalPrice }}</span>
                        </div>
                    </div>

                    <div class="aso-flex aso-justify-between" v-show="dropdownColors[key]">
                        <div class="aso-w-2/5 aso-space-y-2 aso-flex aso-flex-col">
                            <label for="" class="aso-text-[12px] aso-text[#444444] aso-font-normal">Color Name</label>
                            <input type="text" class="aso-rounded aso-w-full aso-h-[30px]" v-model="addColors[key].name"> 
                        </div>
                        <div class="aso-w-2/5 aso-space-x-2 aso-flex aso-flex-col">
                            <label for="" class="aso-text-[12px] aso-text[#444444] aso-font-normal">Color Preview Image</label>
                            <div class="aso-flex aso-flex-col aso-space-y-2 aso-w-full aso-pt-2">
                                <div class="aso-flex aso-space-x-2">
                                    <button @click="(e)=>selectMaterialPrevImage(e,key)" class="aso-bg-[#016464] aso-border-none aso-w-fit aso-h-fit aso-p-4 aso-rounded aso-px-4 aso-text-white aso-opacity-90 hover:aso-opacity-100 aso-text-[10px] aso-cursor-pointer">upload PopupImg</button>
                                    <div :class="`aso-relative aso-w-[82px] aso-h-[49px] aso-rounded-md aso-overflow-hidden`">
                                        <img v-if="addColors[key].prevImg != ''" :src="addColors[key].prevImg" alt="" class="aso-absolute aso-w-full aso-h-full">
                                        <button v-if="addColors[key].prevImg != ''" @click="()=>{addColors[key].prevImg = ''}" :class="`aso-bg-[#016464] aso-absolute aso-bottom-0 aso-right-0 aso-text-white aso-p-1 aso-rounded-tl-lg aso-border-none`">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="aso-w-4 aso-h-4">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>             
                        </div> 
                    </div>
                    <div class="aso-flex aso-justify-between aso-items-center" v-show="dropdownColors[key]">
                        <div class="aso-w-2/5 aso-space-x-2 aso-flex aso-justify-start">
                            <div>
                                <label for="">Use Color Pattern</label>
                                <p>use a variety code for the color of the article or an image</p>
                            </div>
                            <div class="aso-flex aso-space-x-2 aso-items-center">
                                <span class="aso-text-[#444444] aso-text-[11px]">No</span>
                                <div class="aso-flex aso-items-center">
                                    <label for="aso-toggle" @click="handleChangePatterActive(key)" class="aso-cursor-pointer aso-bg-[#F8F8FF] aso-border-[1px] aso-border-solid aso-border-black aso-w-6 aso-h-0.5 aso-rounded-full aso-p-1">
                                        <div :class="color.pattern.active ? 'aso-translate-x-[100%] aso-border-[#016464]': 'aso-border-[#FFFFFF]'" class="aso-toggle-dot aso-w-2.5 aso-h-2.5 -aso-translate-y-[8px] -aso-translate-x-2 aso-border-[4px] aso-border-solid aso-bg-[#D9D9D9] aso-rounded-full aso-shadow-md aso-transform"></div>
                                    </label>
                                </div>
                                <span class="aso-text-[#444444] aso-text-[11px]">Yes</span>
                            </div>
                        </div>
                        <div class="aso-w-2/5 aso-space-x-2 aso-flex aso-flex-col" v-if="!color.pattern.active">
                            <label for="" class="aso-text-[12px] aso-text[#444444] aso-font-normal">Material Background Color</label>
                            <div class="aso-relative aso-flex">
                                <input
                                    id="colorPicker"
                                    type="color"
                                    v-model="addColors[key].pattern.codeHex"
                                    @input="(e)=>changeBackgroundColor(e,key)"
                                    class="aso-w-9 aso-h-[30px]"
                                />
                                <input
                                    type="text"
                                    v-model="addColors[key].pattern.codeHex"
                                    @input="(e)=>changeBackgroundColor(e,key)"
                                    class="aso-p-1 aso-text-black aso-w-full -aso-translate-y-px"
                                />
                            </div>                        
                        </div>
                        <div class="aso-w-2/5 aso-space-x-2 aso-flex aso-flex-col" v-if="color.pattern.active">
                            <label for="" class="aso-text-[12px] aso-text[#444444] aso-font-normal">Background Image</label>
                            <div class="aso-flex aso-flex-col aso-space-y-2 aso-w-full aso-pt-2">
                                <div class="aso-flex aso-space-x-2">
                                    <button @click="(e)=>selectColorBackgroundImage(e,key)" class="aso-bg-[#016464] aso-border-none aso-w-fit aso-h-fit aso-p-4 aso-rounded aso-px-4 aso-text-white aso-opacity-90 hover:aso-opacity-100 aso-text-[10px] aso-cursor-pointer">upload PopupImg</button>
                                    <div :class="`aso-relative aso-w-[82px] aso-h-[49px] aso-rounded-md aso-overflow-hidden`">
                                        <img v-if="addColors[key].pattern.url != ''" :src="addColors[key].pattern.url" alt="" class="aso-absolute aso-w-full aso-h-full">
                                        <button v-if="addColors[key].pattern.url != ''" @click="()=>{addColors[key].pattern.url = ''}" :class="`aso-bg-[#016464] aso-absolute aso-bottom-0 aso-right-0 aso-text-white aso-p-1 aso-rounded-tl-lg aso-border-none`">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="aso-w-4 aso-h-4">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>             
                        </div>
                    </div>
                    <div class="aso-justify-between aso-items-center aso-space-y-2" v-show="dropdownColors[key]">
                        <div class="aso-w-2/5 aso-space-x-2 aso-flex aso-justify-start">
                            <label for="" class="aso-text-[12px] aso-text[#444444] aso-font-normal">Enable Text Color</label>
                            <div class="aso-flex aso-space-x-2 aso-items-center">
                                <span class="aso-text-[#444444] aso-text-[11px]">No</span>
                                <div class="aso-flex aso-items-center">
                                    <label for="aso-toggle" @click="handleChangeTextColorActive(key)" class="aso-cursor-pointer aso-bg-[#F8F8FF] aso-border-[1px] aso-border-solid aso-border-black aso-w-6 aso-h-0.5 aso-rounded-full aso-p-1">
                                        <div :class="addColors[key].textColor.active ? 'aso-translate-x-[100%] aso-border-[#016464]': 'aso-border-[#FFFFFF]'" class="aso-toggle-dot aso-w-2.5 aso-h-2.5 -aso-translate-y-[8px] -aso-translate-x-2 aso-border-[4px] aso-border-solid aso-bg-[#D9D9D9] aso-rounded-full aso-shadow-md aso-transform"></div>
                                    </label>
                                </div>
                                <span class="aso-text-[#444444] aso-text-[11px]">Yes</span>
                            </div>
                        </div>
                        <div class="aso-flex aso-items-center aso-justify-center">
                            <div class="aso-w-2/5 aso-space-x-2 aso-flex aso-justify-start" v-if="color.textColor.active">
                                <label for="" class="aso-text-[12px] aso-text[#444444] aso-font-normal">Use same color for border</label>
                                <div class="aso-flex aso-space-x-2 aso-items-center">
                                    <span class="aso-text-[#444444] aso-text-[11px]">No</span>
                                    <div class="aso-flex aso-items-center">
                                        <label for="aso-toggle" @click="handleChangeSameForBorderColorActive(key)" class="aso-cursor-pointer aso-bg-[#F8F8FF] aso-border-[1px] aso-border-solid aso-border-black aso-w-6 aso-h-0.5 aso-rounded-full aso-p-1">
                                            <div :class="color.textColor.sameForBorder ? 'aso-translate-x-[100%] aso-border-[#016464]': 'aso-border-[#FFFFFF]'" class="aso-toggle-dot aso-w-2.5 aso-h-2.5 -aso-translate-y-[8px] -aso-translate-x-2 aso-border-[4px] aso-border-solid aso-bg-[#D9D9D9] aso-rounded-full aso-shadow-md aso-transform"></div>
                                        </label>
                                    </div>
                                    <span class="aso-text-[#444444] aso-text-[11px]">Yes</span>
                                </div>
                            </div>
                            <div class="aso-w-2/5 aso-space-x-2 aso-flex aso-flex-col" v-if="color.textColor.active">
                                <div class="aso-flex aso-space-x-4">
                                    <div class="aso-flex aso-flex-col">
                                        <label for="" class="aso-text-[12px] aso-text[#444444] aso-font-normal">Name</label>
                                        <input type="text" v-model="addColors[key].textColor.name" id="">
                                    </div>
                                    <div class="aso-flex aso-flex-col">
                                        <label for="" class="aso-text-[12px] aso-text[#444444] aso-font-normal aso-invisible">Name</label>
                                        <div class="aso-relative aso-flex">
                                            <input
                                                id="colorPicker"
                                                type="color"
                                                v-model="addColors[key].textColor.codeHex"
                                                @input="(e)=>changeTextColor(e,key)"
                                                class="aso-w-9 aso-h-[30px]"
                                            />
                                            <input
                                                type="text"
                                                v-model="addColors[key].textColor.codeHex"
                                                @input="(e)=>changeTextColor(e,key)"
                                                class="aso-p-1 aso-text-black aso-w-full -aso-translate-y-px"
                                            />
                                        </div> 
                                    </div>
                                    
                                </div>                       
                            </div>
                        </div>
                    </div>
                    <div class="aso-w-2/5 aso-space-y-2 aso-flex aso-flex-col" v-show="dropdownColors[key]">
                        <label for="" class="aso-text-[12px] aso-text[#444444] aso-font-normal">Additional Price</label>
                        <input type="number" v-model="addColors[key].additionalPrice" class="aso-rounded aso-w-full aso-h-[30px]"  @blur="addColors[key].additionalPrice.trim()==''?addColors[key].additionalPrice=0:''">
                    </div>
                    <div @click="handleDeleteColor(key)" class="aso-flex aso-absolute aso-justify-center aso-items-center aso-right-2 aso-my-0  aso-top-0 aso-shadow-md aso-rounded-full aso-cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="aso-w-6 aso-h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                    </div>
                    <div v-if="dropdownColors[key]" @click="dropdownColors[key]=false" class="aso-flex aso-absolute aso-justify-center aso-items-center  aso-my-0 aso-right-8 aso-top-0 aso-shadow-md aso-rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="aso-w-6 aso-h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 18.75 7.5-7.5 7.5 7.5" />
                            <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 7.5-7.5 7.5 7.5" />
                        </svg>
                    </div>
                    <div v-if="!dropdownColors[key]" @click="dropdownColors[key]=true" class="aso-flex aso-absolute aso-justify-center aso-items-center  aso-my-0 aso-right-8 aso-top-0 aso-shadow-md aso-rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="aso-w-6 aso-h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5" />
                        </svg>
                    </div>
                </div>
                <div class="aso-pt-4">
                    <button :disabled="isLoading" @click="handleAddNewMaterialColor" class="aso-flex aso-jsutify-center aso-items-center aso-bg-[#016464] aso-rounded aso-w-fit aso-space-x-2 aso-h-fit aso-text-white aso-px-8 aso-p-2.5 aso-rounded aso-border-none hover:aso-opacity-100 hover:aso-border-none hover:aso-text-white hover:aso-bg-[#016464] aso-cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="aso-w-6 aso-h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                        <span class="aso-font-semibold aso-text-[16px]">Add Color</span>
                    </button>
                </div>
            </div>
            
            <div class="aso-bg-[#F8F9FB] aso-flex aso-space-x-4 aso-px-4 aso-py-4 aso-justify-end aso-items-end">
                <div class="aso-bg-[#016464] aso-rounded">
                    <button :disabled="isLoading" class="aso-flex aso-bg-transparent aso-w-fit aso-space-x-2 aso-h-fit aso-px-8 aso-p-2 aso-border-none aso-text-white aso-opacity-90 hover:aso-border-none hover:aso-text-white hover:aso-opacity-100 aso-cursor-pointer" @click="back">
                        <svg class="aso-w-6 aso-h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 12L5 8V11L17.17 11C17.3756 10.414 17.7586 9.90661 18.2657 9.54821C18.7729 9.18981 19.379 8.9982 20 9C20.7956 9 21.5587 9.31607 22.1213 9.87868C22.6839 10.4413 23 11.2044 23 12C23 12.7956 22.6839 13.5587 22.1213 14.1213C21.5587 14.6839 20.7956 15 20 15C18.69 15 17.58 14.17 17.17 13L5 13V16L1 12Z" fill="currentColor"/>
                        </svg>

                        <div class="aso-font-semibold aso-text-[16px]">Back</div>
                    </button>
                </div>
                <div class="aso-bg-[#016464] aso-rounded" v-if="isEdit">
                    <button @click="updateColorInMaterialColor" :class="`aso-rounded aso-flex ${!isLoading ? 'aso-bg-amber-400 ' :'aso-bg-amber-500'} aso-w-fit aso-space-x-2 aso-h-fit aso-px-8 aso-text-white aso-p-2 aso-border-none aso-opacity-90 hover:aso-border-none hover:aso-text-white hover:aso-opacity-100 aso-cursor-pointer`">
                        <img src="../../../../../../../assets/icons/ic_loading_gray.svg" class="aso-w-5 aso-w-5" v-if="isLoading" :disabled="isLoading"/>
                        <div class="aso-font-semibold aso-text-[16px]">Update</div>
                    </button>
                </div>
                <div class="aso-bg-[#016464] aso-rounded" v-if="!isEdit">
                    <button @click="addMaterialColor" class="aso-flex aso-bg-transparent aso-w-fit aso-space-x-2 aso-h-fit aso-text-white  aso-px-12 aso-p-2.5 aso-border-none aso-opacity-90 hover:aso-border-none hover:aso-text-white hover:aso-opacity-100 aso-cursor-pointer">
                        <div class="aso-translate-y-1">
                            <img src="../../../../../../../assets/icons/ic_loading_gray.svg" class="aso-w-5 aso-w-5" v-if="isLoading" :disabled="isLoading"/>
                            <svg v-if="!isLoading" class="aso-w-4 aso-h-4" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2.5 1.25C2.16848 1.25 1.85054 1.3817 1.61612 1.61612C1.3817 1.85054 1.25 2.16848 1.25 2.5V17.5C1.25 17.8315 1.3817 18.1495 1.61612 18.3839C1.85054 18.6183 2.16848 18.75 2.5 18.75H17.5C17.8315 18.75 18.1495 18.6183 18.3839 18.3839C18.6183 18.1495 18.75 17.8315 18.75 17.5V2.5C18.75 2.16848 18.6183 1.85054 18.3839 1.61612C18.1495 1.3817 17.8315 1.25 17.5 1.25H11.875C11.5435 1.25 11.2255 1.3817 10.9911 1.61612C10.7567 1.85054 10.625 2.16848 10.625 2.5V11.6163L13.9325 8.3075C14.0499 8.19014 14.209 8.12421 14.375 8.12421C14.541 8.12421 14.7001 8.19014 14.8175 8.3075C14.9349 8.42486 15.0008 8.58403 15.0008 8.75C15.0008 8.91597 14.9349 9.07514 14.8175 9.1925L10.4425 13.5675C10.3844 13.6257 10.3155 13.6719 10.2395 13.7034C10.1636 13.7349 10.0822 13.7511 10 13.7511C9.91779 13.7511 9.83639 13.7349 9.76046 13.7034C9.68453 13.6719 9.61556 13.6257 9.5575 13.5675L5.1825 9.1925C5.12439 9.13439 5.07829 9.0654 5.04685 8.98948C5.0154 8.91356 4.99921 8.83218 4.99921 8.75C4.99921 8.66782 5.0154 8.58644 5.04685 8.51052C5.07829 8.4346 5.12439 8.36561 5.1825 8.3075C5.24061 8.24939 5.3096 8.20329 5.38552 8.17185C5.46144 8.1404 5.54282 8.12421 5.625 8.12421C5.70718 8.12421 5.78856 8.1404 5.86448 8.17185C5.9404 8.20329 6.00939 8.24939 6.0675 8.3075L9.375 11.6163V2.5C9.375 1.83696 9.63839 1.20107 10.1072 0.732233C10.5761 0.263392 11.212 0 11.875 0L17.5 0C18.163 0 18.7989 0.263392 19.2678 0.732233C19.7366 1.20107 20 1.83696 20 2.5V17.5C20 18.163 19.7366 18.7989 19.2678 19.2678C18.7989 19.7366 18.163 20 17.5 20H2.5C1.83696 20 1.20107 19.7366 0.732233 19.2678C0.263392 18.7989 0 18.163 0 17.5V2.5C0 1.83696 0.263392 1.20107 0.732233 0.732233C1.20107 0.263392 1.83696 0 2.5 0L5.625 0C5.79076 0 5.94973 0.065848 6.06694 0.183058C6.18415 0.300269 6.25 0.45924 6.25 0.625C6.25 0.79076 6.18415 0.949732 6.06694 1.06694C5.94973 1.18415 5.79076 1.25 5.625 1.25H2.5Z" fill="white"/>
                            </svg>
                        </div>

                        <span class="aso-font-semibold aso-text-[16px]">Save</span>
                    </button>
                </div>
            </div>
        </div>
       
        <!-- Delete Modal-->
        <div v-if="openModal" @click.self="closeModal" class="aso-z-[99999] aso-bg-gray-400 aso-overflow-y-auto aso-overflow-x-hidden aso-fixed aso-top-0 aso-right-[25%] aso-left-[75%] aso-z-50 aso-flex aso-justify-center aso-items-center aso-w-full md:aso-inset-0 aso-h-[calc(100%-1rem)] aso-h-[100vh]">
            <div class="aso-relative aso-p-4 aso-w-full aso-max-w-md aso-max-h-full">
                <div class="aso-relative aso-bg-white aso-rounded-lg aso-shadow dark:bg-gray-700">
                    <button @click.stop="closeModal" type="button" :class="`${isLoading ? 'aso-cursor-not-allowed' : 'aso-cursor-pointer'} aso-absolute aso-top-3 aso-end-2.5 aso-text-gray-400 aso-bg-transparent hover:bg-gray-200 hover:text-gray-900 aso-rounded-lg aso-text-sm aso-w-8 aso-h-8 aso-ms-auto aso-inline-flex aso-justify-center aso-items-center dark:hover:bg-gray-600 dark:hover:text-white`" data-modal-hide="popup-modal">
                        <svg class="aso-w-3 aso-h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                        <span class="aso-sr-only">Close modal</span>
                    </button>
                    <div class="aso-p-4 md:p-5 aso-text-center">
                        <svg class="aso-mx-auto aso-mb-4 aso-text-gray-400 aso-w-12 aso-h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                        </svg>
                        <h3 class="aso-mb-5 aso-text-lg aso-font-normal aso-text-gray-500 dark:text-gray-400">Are you sure you want to delete this color?</h3>
                        <input v-model="color.name" readonly class="aso-rounded aso-w-full aso-h-[35px] aso-text-center aso-p-4 aso-my-2 aso-border-none" />
                        <button @click="deleteMaterialColor" data-modal-hide="popup-modal" type="button" :class="`aso-border-solid aso-text-white ${!isLoading ? 'aso-bg-red-600 aso-cursor-pointer' :'aso-bg-red-700 aso-cursor-not-allowed'} hover:bg-red-800 focus:ring-4 focus:outline-none aso-my-2 aso-border-none  focus:ring-red-300 dark:focus:ring-red-800 aso-font-medium aso-rounded-lg aso-text-sm aso-inline-flex aso-items-center aso-px-5 aso-py-2.5 aso-text-center`">
                            <img src="../../../../../../../assets/icons/ic_loading_gray.svg" class="aso-w-5 aso-w-5" v-if="isLoading" :disabled="isLoading"/>
                            Yes, I'm sure
                        </button>
                        <button @click.stop="closeModal" data-modal-hide="popup-modal" type="button" :class="`aso-border-solid aso-py-2.5 aso-px-5 aso-ms-3 aso-text-sm aso-font-medium aso-text-gray-900 aso-my-2  aso-border-gray-500 aso-border-white focus:outline-none aso-bg-white aso-rounded-lg aso-border aso-border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 ${isLoading ? 'aso-cursor-not-allowed' : 'aso-cursor-pointer'}`">No, cancel</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Alert Modal-->
        <div v-if="openAlert" @click.self="closeAlert" :key="key" v-for="(color,key) in addColors" class="aso-z-[99999] aso-bg-gray-400 aso-overflow-y-auto aso-overflow-x-hidden aso-fixed aso-top-0 aso-right-[25%] aso-left-[75%] aso-z-50 aso-flex aso-justify-center aso-items-center aso-w-full md:aso-inset-0 aso-h-[calc(100%-1rem)] aso-h-[100vh]">
            <div class="aso-relative aso-p-4 aso-w-full aso-max-w-md aso-max-h-full">
                <div class="aso-relative aso-bg-white aso-rounded-lg aso-shadow dark:bg-gray-700">
                    <button @click.stop="closeAlert" type="button" :class="`${isLoading ? 'aso-cursor-not-allowed' : 'aso-cursor-pointer'} aso-absolute aso-top-3 aso-end-2.5 aso-text-gray-400 aso-bg-transparent hover:bg-gray-200 hover:text-gray-900 aso-rounded-lg aso-text-sm aso-w-8 aso-h-8 aso-ms-auto aso-inline-flex aso-justify-center aso-items-center dark:hover:bg-gray-600 dark:hover:text-white`" data-alert-hide="popup-alert">
                        <svg class="aso-w-3 aso-h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                        <span class="aso-sr-only">Close alert</span>
                    </button>
                    <div class="aso-p-4 md:p-5 aso-text-center">
                        <svg class="aso-mx-auto aso-mb-4 aso-text-gray-400 aso-w-12 aso-h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                        </svg>
                        <h3 class="aso-mb-5 aso-text-lg aso-font-normal aso-text-gray-500 dark:text-gray-400">Are you sure you want to delete this color?</h3>
                        <input v-model="addColors[key].name" readonly class="aso-rounded aso-w-full aso-h-[35px] aso-text-center aso-p-4 aso-my-2 aso-border-none" />
                        <button @click="handleDeleteNewMaterialColor(key)" data-alert-hide="popup-alert" type="button" :class="`aso-border-solid aso-text-white ${!isLoading ? 'aso-bg-red-600 aso-cursor-pointer' :'aso-bg-red-700 aso-cursor-not-allowed'} hover:bg-red-800 focus:ring-4 focus:outline-none aso-my-2 aso-border-none  focus:ring-red-300 dark:focus:ring-red-800 aso-font-medium aso-rounded-lg aso-text-sm aso-inline-flex aso-items-center aso-px-5 aso-py-2.5 aso-text-center`">
                            <img src="../../../../../../../assets/icons/ic_loading_gray.svg" class="aso-w-5 aso-w-5" v-if="isLoading" :disabled="isLoading"/>
                            Yes, I'm sure
                        </button>
                        <button @click.stop="closeAlert" data-alert-hide="popup-alert" type="button" :class="`aso-border-solid aso-py-2.5 aso-px-5 aso-ms-3 aso-text-sm aso-font-medium aso-text-gray-900 aso-my-2  aso-border-gray-500 aso-border-white focus:outline-none aso-bg-white aso-rounded-lg aso-border aso-border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 ${isLoading ? 'aso-cursor-not-allowed' : 'aso-cursor-pointer'}`">No, cancel</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import api from "@/admin/Api/api";
import { ref,onMounted } from "vue";
import { useRoute } from 'vue-router';
import toastMessage from "@/admin/utils/functions";

const route = useRoute()
const configID = ref(route.params.configId);
const materialId = ref(route.params.materialId);
const dropdownColors = ref([true])
const isFetching = ref(false);
const isNewColor = ref(false);
const isLoading = ref(false);
const colorId = ref(null);
const colors = ref ({
    customColors:{
        active:true,
        label:"Custom Colors",
        prevImg:""
    },
    allColors:[]
});

const isEdit = ref(false);
const openModal = ref(false);
const openAlert = ref(false);
const noColorsFound = ref('');
const color = ref({
    isDefault:false,
    name:'',
    textColor:{
        active:false,
        sameForBorder:false,
        name:"",
        codeHex:'#000000'
    },
    pattern:{
        active:false,
        codeHex:'#000000',
        url:""
    },
    prevImg:"",
    additionalPrice:0,
});

const addColors = ref([
    {
        isDefault:false,
        name:'',
        textColor:{
            active:false,
            codeHex:'#000000'
        },
        pattern:{
            active:false,
            codeHex:'#000000',
            url:""
        },
        prevImg:"",
        additionalPrice:0,
    }
]);

onMounted(async ()=>{
    isFetching.value = true;
    await fetchMaterialColors();
    isFetching.value = false;
});

const fetchMaterialColors = async () => {
    const result = await api.getMaterialSimpleColors(configID.value,materialId.value);
    if(result.message){
        noColorsFound.value = result.message;
        colors.value = result.colors;
    }else{
        colors.value = result;
    }
};

const changeTextColor = (event,key=-1) => {
    if(event.target.value[0]!=='#'){
        event.target.value = '#'+ event.target.value;
    }
    if(isEdit.value){
        color.value.textColor.codeHex = event.target.value;
    }else{
        addColors.value[key].textColor.codeHex = event.target.value;
    }
}

const handleChangeCustomColorsActive = () => {
    colors.value.customColors.active = ! colors.value.customColors.active;
}
const handleChangeTextColorActive= (key=-1) => {
    if(isEdit.value){
        color.value.textColor.active = ! color.value.textColor.active;
    }else{
        addColors.value[key].textColor.active = !addColors.value[key].textColor.active;
    }
}
const handleChangeSameForBorderColorActive= (key=-1) => {
    if(isEdit.value){
        color.value.textColor.sameForBorder = ! color.value.textColor.sameForBorder;
    }else{
        addColors.value[key].textColor.sameForBorder = !addColors.value[key].textColor.sameForBorder;
    }
}
const handleChangePatterActive= (key=-1) => {
    if(isEdit.value){
        color.value.pattern.active = ! color.value.pattern.active;
    }else{
        addColors.value[key].pattern.active = !addColors.value[key].pattern.active;
    }
}
const changeBackgroundColor = (event,key=-1) => {
    if(event.target.value[0]!=='#'){
        event.target.value = '#'+ event.target.value;
    }
    if(isEdit.value){
        color.value.pattern.codeHex = event.target.value;
    }else{
        addColors.value[key].pattern.codeHex = event.target.value;
    }
}

const updateMaterialColor = async () => {
    isLoading.value = true;
    checkIfThereDefault();
    const result = await api.updateMaterialSimpleColors(configID.value,materialId.value,colors.value);
    if(result.success){
        await fetchMaterialColors();
        if(result.success == true ) {
            toastMessage(result.message);
        }else{
            toastMessage(result.message,"warning");
        }
        isLoading.value = false;
        isNewColor.value = false;
        openModal.value = false;
        addColors.value = [
            {
                isDefault:false,
                name:'',
                textColor:{
                    active:false,
                    sameForBorder:false,
                    name:"",
                    codeHex:'#000000',
                },
                pattern:{
                    active:false,
                    codeHex:'#000000',
                    url:""
                },
                prevImg:"",
                additionalPrice:0,
            }
        ];
        dropdownColors.value=[true];
    }else{
        isLoading.value = false;
        toastMessage(result.message,"error");
        isNewColor.value = false;
        openModal.value = false;
        addColors.value = [
            {
                isDefault:false,
                name:'',
                textColor:{
                    active:false,
                    sameForBorder:false,
                    name:"",
                    codeHex:'#000000',
                },
                pattern:{
                    active:false,
                    codeHex:'#000000',
                    url:""
                },
                prevImg:"",
                additionalPrice:0,
            }
        ];
        dropdownColors.value=[true];
    }
}

const checkIfThereDefault = ()=> {
    var hasDefault = false;
    let index =0;
    while (index<colors.value.allColors.length && !hasDefault) {
        if(colors.value.allColors[index].isDefault){
            hasDefault = true;
        }
        index++;
    }
    if(!hasDefault && colors.value.allColors[0]){
        colors.value.allColors[0].isDefault = true;
    }
}


const selectMaterialColor = (id,col,isdeleting=false) => {
    if(isdeleting){
        colorId.value = id;
        color.value = col;
        closeModal();
    }else{
        color.value = col;
        isEdit.value = true;
        isNewColor.value = true;
    }
}


const addMaterialColor = async () => {
    isLoading.value = true;
    for (let index = 0; index < addColors.value.length; index++) {
        colors.value.allColors.push(addColors.value[index]);
    }
    await updateMaterialColor();
}

const updateColorInMaterialColor = async () => {
    isLoading.value = true;
    colors.value.allColors[colorId.value]=color.value;
    await updateMaterialColor();
}

const deleteMaterialColor = async () => {
    isLoading.value = true;
    colors.value.allColors.splice(colorId.value,1);
    await updateMaterialColor();
}


const closeModal = () => {
    openModal.value = !openModal.value;
}
const closeAlert = () => {
    openAlert.value = !openAlert.value;
}


const newColor = () => {
    isNewColor.value = true;
}
const back = () => {
    isNewColor.value = false;
    isEdit.value = false;
    colorId.value  = null;
    color.value = {
        isDefault:false,
        name:'',
        textColor:{
            active:false,
            sameForBorder:false,
            codeHex:'#000000'
        },
        pattern:{
            active:false,
            codeHex:'#000000',
            url:""
        },
        prevImg:"",
        additionalPrice:0,
    };
    addColors.value = [
        {
            isDefault:false,
            name:'',
            textColor:{
                active:false,
                codeHex:'#000000'
            },
            pattern:{
                active:false,
                codeHex:'#000000',
                url:""
            },
            prevImg:"",
            additionalPrice:0,
        }
    ];
    dropdownColors.value=[true];

}
const selectColorBackgroundImage = async(e,key=-1) => { 
    e.preventDefault();
    var uploader = wp.media(
        {
            title: "Select Material Pop Image",
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
                            if(isEdit.value){
                                color.value.pattern.url = (attachment.url);
                            }else{
                                addColors.value[key].pattern.url = (attachment.url);
                            }
                        }
                    }
                );
            }
        )
        .open();
}
const selectColorPrevImage = async(e,key=-1) => { 
    e.preventDefault();
    var uploader = wp.media(
        {
            title: "Select Color Preview Image",
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
                            if(isEdit.value){
                                color.value.prevImg = (attachment.url);
                            }else{
                                addColors.value[key].prevImg = (attachment.url);
                            }
                        }
                    }
                );
            }
        )
        .open();
}
const selectCustomPrevImage = async(e,key=-1) => { 
    e.preventDefault();
    var uploader = wp.media(
        {
            title: "Select Custom Color Preview Image",
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
                            colors.value.customColors.prevImg = (attachment.url);
                        }else{
                            addColors.value[key].customColors.prevImg = (attachment.url);
                        }
                    }
                );
            }
        )
        .open();
}

const handleAddNewMaterialColor = () => {
    addColors.value.push({
        isDefault:false,
        name:'',
        textColor:{
            active:false,
            codeHex:'#000000'
        },
        pattern:{
            active:false,
            codeHex:'#000000',
            url:""
        },
        prevImg:"",
        additionalPrice:0,
    });
    for (let index = 0; index < dropdownColors.value.length; index++) {
        dropdownColors.value[index]=false;
    }
    dropdownColors.value.push(true);
}
 
const handleDeleteColor = () => {
    openAlert.value = true;
    
} 

const handleDeleteNewMaterialColor = (key) => {
    var tab = [];
    for (let index = 0; index < addColors.value.length; index++) {
        tab.push(addColors.value[index])
    }
    tab.splice(key,1);
    if(tab.length>0){
        addColors.value=tab;
        dropdownColors.value.splice(key,1);
    }
    closeAlert()
}

const selectDefault = async(key) =>{
    colors.value.allColors[key].isDefault = true;
    for(let i=0; i<colors.value.allColors.length; i++){
        if(i != key ){
            colors.value.allColors[i].isDefault = false;
        }
    }
    await updateColorInMaterialColor();
}

const selectMaterialPrevImage = async(e,key=-1) => { 
    e.preventDefault();
    var uploader = wp.media(
        {
            title: "Select Image",
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
                            if(isEdit.value){
                                addColors.value.prevImg = (attachment.url);
                            }else{
                                addColors.value[key].prevImg = (attachment.url);
                            }
                        }
                    }
                );
            }
        )
        .open();
}
</script>
