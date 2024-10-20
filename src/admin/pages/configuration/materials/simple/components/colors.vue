<template>
    <div class="">
        <div v-if="!isNewColor">
            <div class="asowp-flex asowp-justify-end asowp-bg-[#F8F9FB] asowp-px-4 asowp-py-4 asowp-pb-2">
                <button v-if="!isFetching" :disabled="isLoading" :class="`asowp-flex asowp-w-fit asowp-h-fit asowp-rounded asowp-bg-[#016464] asowp-px-4 asowp-space-x-2 asowp-p-1.5 asowp-border-none asowp-text-white asowp-opacity-90 hover:asowp-opacity-100 ${isLoading?'asowp-cursor-not-allowed':'asowp-cursor-pointer'}`" @click="newColor">
                    <svg class="asowp-w-5 asowp-h-5" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="plus-lg">
                        <path id="Vector" fill-rule="evenodd" clip-rule="evenodd" d="M11 2.75C11.1823 2.75 11.3572 2.82243 11.4861 2.95136C11.6151 3.0803 11.6875 3.25516 11.6875 3.4375V10.3125H18.5625C18.7448 10.3125 18.9197 10.3849 19.0486 10.5139C19.1776 10.6428 19.25 10.8177 19.25 11C19.25 11.1823 19.1776 11.3572 19.0486 11.4861C18.9197 11.6151 18.7448 11.6875 18.5625 11.6875H11.6875V18.5625C11.6875 18.7448 11.6151 18.9197 11.4861 19.0486C11.3572 19.1776 11.1823 19.25 11 19.25C10.8177 19.25 10.6428 19.1776 10.5139 19.0486C10.3849 18.9197 10.3125 18.7448 10.3125 18.5625V11.6875H3.4375C3.25516 11.6875 3.0803 11.6151 2.95136 11.4861C2.82243 11.3572 2.75 11.1823 2.75 11C2.75 10.8177 2.82243 10.6428 2.95136 10.5139C3.0803 10.3849 3.25516 10.3125 3.4375 10.3125H10.3125V3.4375C10.3125 3.25516 10.3849 3.0803 10.5139 2.95136C10.6428 2.82243 10.8177 2.75 11 2.75Z" fill="white"/>
                        </g>
                    </svg>
                    <div class="asowp-text-[14px]">
                        Add material Color
                    </div>
                </button>
            </div>
            <div class="asowp-relative" id="monTableau">
                <table class="asowp-w-full asowp-text-center asowp-px-4 asowp-border asowp-border-collapse asowp-border-0">
                    <thead class="asowp-text-[14px] asowp-bg-[#f0f0f1]">
                        <tr class="">
                            <th scope="col" class="asowp-p-4 asowp-px-8 asowp-w-12 asowp-font-normal">
                                Title 
                            </th>
                            <th scope="col" class="asowp-px-6 asowp-py-3 asowp-font-normal">
                                Text color
                            </th>
                            <th scope="col" class="asowp-px-6 asowp-py-3 asowp-font-normal">
                                Background color
                            </th>
                            <th scope="col" class="asowp-px-6 asowp-py-3 asowp-font-normal">
                                Additional Price
                            </th>
                            <th scope="col" class="asowp-px-6 asowp-py-3 asowp-font-normal">
                                Default
                            </th>
                            <th scope="col" class="asowp-px-6 asowp-py-3 asowp-font-normal">
                                Action
                            </th>
                            
                        </tr>
                    </thead>
                    <tbody class="asowp-bg-white">
                        
                        <tr v-if="isFetching">
                            <td colspan="7">
                                <div class="asowp-bg-white asowp-border-solid asowp-border asowp-border-[#D1D1D1] asowp-flex asowp-flex-col asowp-space-y-2 asowp-justify-center asowp-items-center asowp-w-full asowp-h-[200px] p-4">
                                    <img class="asowp-w-[100px] asowp-h-[100px]" src="../../../../../../../assets/icons/ic_loading.svg" alt="">
                                </div>
                            </td>
                        </tr>
                        <tr  v-if="colors.allColors.length == 0 && !isFetching">
                            <td colspan="7">
                                <div class="asowp-bg-white asowp-border-solid asowp-border asowp-border-[#D1D1D1] asowp-flex asowp-flex-col asowp-space-y-12 asowp-justify-center asowp-items-center asowp-py-10 asowp-h-[150px]">
                                    <div class="asowp-flex asowp-flex-col asowp-space-y-2 asowp-justify-center asowp-items-center">
                                        <p class="asowp-text-2xl asowp-font-bold">{{noColorsFound}}</p>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr v-for="(color, key) in colors.allColors" class="asowp-border-t-0 asowp-border-l-0 asowp-border-r-0 asowp-border-b-2 asowp-border-solid asowp-border-[#f0f0f1]" :key="key">
                            <td class="asowp-text-center asowp-px-5 asowp-p-4">
                                {{ color.name }}
                            </td>
                            
                            <td class="asowp-text-[12px] asowp-px-6">
                                <div class="asowp-text-[12px] asowp-px-6 asowp-py-2 asowp-flex asowp-justify-center asowp-items-center">
                                    <span v-if="!color.textColor.active" class="asowp-w-fit asowp-rounded-lg asowp-text-center asowp-px-2 asowp-p-1 asowp-bg-[#F8E7E7] asowp-text-[#EF5A35] asowp-border-none">
                                        Disable
                                    </span>
                                    <div v-if="color.textColor.active" :class="`asowp-text-center asowp-bg-[${color.textColor.codeHex}] asowp-border-solid asowp-border-[#000000] asowp-rounded asowp-w-[50px] asowp-h-[50px]`"></div>
                                </div>
                            </td>
                            <td class="asowp-text-[12px] asowp-px-6">
                                <div class="asowp-text-[12px] asowp-px-6 asowp-py-2 asowp-flex asowp-justify-center asowp-items-center">
                                    <div v-if="color.pattern.active" class="asowp-relative">
                                        <img :src="color.pattern.url" alt="" srcset="" class="asowp-w-[50px] asowp-h-[50px] asowp-rounded">
                                    </div>
                                    <div :class="`asowp-text-center asowp-bg-[${color.pattern.codeHex}] asowp-border-solid asowp-border-[#000000] asowp-rounded asowp-w-[50px] asowp-h-[50px]`"  v-if="!color.pattern.active"></div>
                                </div>
                            </td>
                            <td class="asowp-text-[12px] asowp-px-6 asowp-py-2">
                                <span class="asowp-w-fit asowp-rounded-lg asowp-text-center asowp-px-2 asowp-p-1 asowp-bg-[#9ACD321F] asowp-text-[#466801] asowp-border-none">
                                    {{color.additionalPrice}}
                                </span>
                            </td>
                            <td class="asowp-pl-10 asowp-py-2">
                                <span class="asowp-w-fit asowp-flex asowp-items-center asowp-translate-x-5 asowp-translate-y-0.5">
                                    <label for="asowp-toggle" @click="!isLoading?selectDefault(key):''" class="asowp-cursor-pointer asowp-bg-[#F8F8FF] asowp-border-[1px] asowp-border-solid asowp-border-black asowp-w-6 asowp-h-0.5 asowp-rounded-full asowp-p-1">
                                        <div :class="color.isDefault ? 'asowp-translate-x-[100%] asowp-border-[#016464]':'asowp-border-[#FFFFFF]'" class="asowp-toggle-dot asowp-w-2.5 asowp-h-2.5 asowp-duration-100 -asowp-translate-y-[8px] -asowp-translate-x-2 asowp-border-[4px] asowp-border-solid asowp-bg-[#D9D9D9] asowp-rounded-full asowp-shadow-md asowp-transform"></div>
                                    </label>
                                </span>
                            </td>
                            <td class="asowp-px-6 asowp-text-center">
                                <button class="asowp-bg-transparent asowp-border-none asowp-text-[#2DD05B] asowp-cursor-pointer">
                                    <img class="asowp-w-5 asowp-h-5" src="../../../../../../../assets/icons/ic_edit.svg" alt="" @click="selectMaterialColor(key,color)">
                                </button>
                                <button class="asowp-bg-transparent asowp-border-none asowp-text-[#A00000] asowp-cursor-pointer">
                                    <img class="asowp-w-5 asowp-h-5" src="../../../../../../../assets/icons/ic_delete.svg" alt="" @click="selectMaterialColor(key,color,true)">
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="asowp-space-y-2" v-if="!isFetching && !isNewColor">
                <div class="asowp-bg-[#F8F9FB] asowp-text-[16px] asowp-font-medium asowp-px-8 asowp-py-8 ">
                    <div class="asowp-flex ">
                        Enable Custom Color
                        <div @click="handleChangeCustomColorsActive" class="asowp-flex asowp-items-center asowp-translate-x-5 asowp-translate-y-0.5">
                            <label for="asowp-toggle"  class="asowp-cursor-pointer asowp-bg-[#F8F8FF] asowp-border-[1px] asowp-border-solid asowp-border-black asowp-w-6 asowp-h-0.5 asowp-rounded-full asowp-p-1">
                                <div :class="colors.customColors.active ? 'asowp-translate-x-[120%] asowp-border-[#016464]':'asowp-border-[#FFFFFF]'" class="asowp-toggle-dot asowp-w-2.5 asowp-h-2.5 asowp-duration-100 -asowp-translate-y-[8px] -asowp-translate-x-2 asowp-border-[4px] asowp-border-solid asowp-bg-[#D9D9D9] asowp-rounded-full asowp-shadow-md asowp-transform"></div>
                            </label>
                        </div>
                    </div>
                    <div class="asowp-space-y-6 asowp-pt-12" v-if="colors.customColors.active">
                        <div class="asowp-flex asowp-justify-between">
                            <div class="asowp-w-2/5 asowp-space-y-2 asowp-text-[12px] asowp-flex asowp-flex-col">
                                <label for="" class="asowp-bold asowp-font-normal">Label</label>
                                <input type="text" v-model="colors.customColors.label"  class="asowp-rounded asowp-w-full asowp-h-[30px]">
                            </div>
                            <div class="asowp-w-2/5 asowp-space-x-2 asowp-flex asowp-flex-col">
                                <label for="" class="asowp-text-[12px] asowp-text[#444444] asowp-font-normal">Custom Color Preview Image</label>
                                <div class="asowp-flex asowp-flex-col asowp-space-y-2 asowp-w-full asowp-pt-2">
                                    <div class="asowp-flex asowp-space-x-2">
                                        <button @click="selectCustomPrevImage" class="asowp-bg-[#016464] asowp-border-none asowp-w-fit asowp-h-fit asowp-p-4 asowp-rounded asowp-px-4 asowp-text-white asowp-opacity-90 hover:asowp-opacity-100 asowp-text-[10px] asowp-cursor-pointer">Upload image</button>
                                        <div :class="`asowp-relative asowp-w-[82px] asowp-h-[49px] asowp-rounded-md asowp-overflow-hidden`">
                                            <img v-if="colors.customColors.prevImg != ''" :src="colors.customColors.prevImg" alt="" class="asowp-absolute asowp-w-full asowp-h-full">
                                            <button v-if="colors.customColors.prevImg != ''" @click="()=>{colors.customColors.prevImg = ''}" :class="`asowp-bg-[#016464] asowp-absolute asowp-bottom-0 asowp-right-0 asowp-text-white asowp-p-1 asowp-rounded-tl-lg asowp-border-none`">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="asowp-w-4 asowp-h-4">
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
                <div class="asowp-space-x-4 asowp-px-4 asowp-py-4 asowp-justify-end asowp-items-end">
                    <div class="asowp-flex asowp-justify-end">
                        <button @click="updateMaterialColor" class="asowp-flex asowp-bg-[#016464]  asowp-w-fit asowp-space-x-2 asowp-h-fit asowp-text-white asowp-px-8 asowp-p-2.5 asowp-rounded asowp-border-none asowp-opacity-90 hover:asowp-opacity-100 hover:asowp-border-none hover:asowp-text-white hover:asowp-bg-[#016464] asowp-cursor-pointer">
                            <div class="asowp-translate-y-1">
                                <img src="../../../../../../../assets/icons/ic_loading_gray.svg" class="asowp-w-5 asowp-w-5" v-if="isLoading" :disabled="isLoading"/>
                                <svg v-if="!isLoading" class="asowp-w-4 asowp-h-4" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2.5 1.25C2.16848 1.25 1.85054 1.3817 1.61612 1.61612C1.3817 1.85054 1.25 2.16848 1.25 2.5V17.5C1.25 17.8315 1.3817 18.1495 1.61612 18.3839C1.85054 18.6183 2.16848 18.75 2.5 18.75H17.5C17.8315 18.75 18.1495 18.6183 18.3839 18.3839C18.6183 18.1495 18.75 17.8315 18.75 17.5V2.5C18.75 2.16848 18.6183 1.85054 18.3839 1.61612C18.1495 1.3817 17.8315 1.25 17.5 1.25H11.875C11.5435 1.25 11.2255 1.3817 10.9911 1.61612C10.7567 1.85054 10.625 2.16848 10.625 2.5V11.6163L13.9325 8.3075C14.0499 8.19014 14.209 8.12421 14.375 8.12421C14.541 8.12421 14.7001 8.19014 14.8175 8.3075C14.9349 8.42486 15.0008 8.58403 15.0008 8.75C15.0008 8.91597 14.9349 9.07514 14.8175 9.1925L10.4425 13.5675C10.3844 13.6257 10.3155 13.6719 10.2395 13.7034C10.1636 13.7349 10.0822 13.7511 10 13.7511C9.91779 13.7511 9.83639 13.7349 9.76046 13.7034C9.68453 13.6719 9.61556 13.6257 9.5575 13.5675L5.1825 9.1925C5.12439 9.13439 5.07829 9.0654 5.04685 8.98948C5.0154 8.91356 4.99921 8.83218 4.99921 8.75C4.99921 8.66782 5.0154 8.58644 5.04685 8.51052C5.07829 8.4346 5.12439 8.36561 5.1825 8.3075C5.24061 8.24939 5.3096 8.20329 5.38552 8.17185C5.46144 8.1404 5.54282 8.12421 5.625 8.12421C5.70718 8.12421 5.78856 8.1404 5.86448 8.17185C5.9404 8.20329 6.00939 8.24939 6.0675 8.3075L9.375 11.6163V2.5C9.375 1.83696 9.63839 1.20107 10.1072 0.732233C10.5761 0.263392 11.212 0 11.875 0L17.5 0C18.163 0 18.7989 0.263392 19.2678 0.732233C19.7366 1.20107 20 1.83696 20 2.5V17.5C20 18.163 19.7366 18.7989 19.2678 19.2678C18.7989 19.7366 18.163 20 17.5 20H2.5C1.83696 20 1.20107 19.7366 0.732233 19.2678C0.263392 18.7989 0 18.163 0 17.5V2.5C0 1.83696 0.263392 1.20107 0.732233 0.732233C1.20107 0.263392 1.83696 0 2.5 0L5.625 0C5.79076 0 5.94973 0.065848 6.06694 0.183058C6.18415 0.300269 6.25 0.45924 6.25 0.625C6.25 0.79076 6.18415 0.949732 6.06694 1.06694C5.94973 1.18415 5.79076 1.25 5.625 1.25H2.5Z" fill="white"/>
                                </svg>
                            </div>

                            <span class="asowp-font-semibold asowp-text-[16px]">Save</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="asowp-space-y-2 asowp-h-[80vh] asowp-overflow-y-auto asowp-overflow-x-hidden asowp-translate-y-7" v-if="isNewColor">
                
            <div class="asowp-text-[16px] asowp-font-bold asowp-px-4 asowp-py-4 asowp-bg-[#F8F9FB] asowp-sticky-top-0">
                {{isEdit ? 'Edit Color':'Add news colors'}}
            </div>
            <div class="asowp-space-y-2" v-if="isEdit">
                <div class="asowp-relative asowp-px-4 asowp-py-4 asowp-bg-[#F8F9FB] asowp-space-y-2">
                    <div class="asowp-flex asowp-justify-between">
                        <div class="asowp-w-2/5 asowp-space-y-2 asowp-flex asowp-flex-col">
                            <label for="" class="asowp-text-[12px] asowp-text[#444444] asowp-font-normal">Color Name</label>
                            <input type="text" class="asowp-rounded asowp-w-full asowp-h-[30px]" v-model="color.name"> 
                        </div>
                        <div class="asowp-w-2/5 asowp-space-x-2 asowp-flex asowp-flex-col">
                            <label for="" class="asowp-text-[12px] asowp-text[#444444] asowp-font-normal">Color Preview Image</label>
                            <div class="asowp-flex asowp-flex-col asowp-space-y-2 asowp-w-full asowp-pt-2">
                                <div class="asowp-flex asowp-space-x-2">
                                    <button @click="selectColorPrevImage" class="asowp-bg-[#016464] asowp-border-none asowp-w-fit asowp-h-fit asowp-p-4 asowp-rounded asowp-px-4 asowp-text-white asowp-opacity-90 hover:asowp-opacity-100 asowp-text-[10px] asowp-cursor-pointer">upload image</button>
                                    <div :class="`asowp-relative asowp-w-[82px] asowp-h-[49px] asowp-rounded-md asowp-overflow-hidden`">
                                        <img v-if="color.prevImg != ''" :src="color.prevImg" alt="" class="asowp-absolute asowp-w-full asowp-h-full">
                                        <button v-if="color.prevImg != ''" @click="()=>{color.prevImg = ''}" :class="`asowp-bg-[#016464] asowp-absolute asowp-bottom-0 asowp-right-0 asowp-text-white asowp-p-1 asowp-rounded-tl-lg asowp-border-none`">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="asowp-w-4 asowp-h-4">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>             
                        </div> 
                    </div>
                    <div class="asowp-flex asowp-justify-between asowp-items-center">
                        <div class="asowp-w-2/5 asowp-space-x-2 asowp-flex asowp-justify-start">
                            <div>
                                <label for="">Use Color Pattern</label>
                                <p>use a variety code for the color of the article or an image</p>
                            </div>
                            <div class="asowp-flex asowp-space-x-2 asowp-items-center">
                                <span class="asowp-text-[#444444] asowp-text-[11px]">No</span>
                                <div class="asowp-flex asowp-items-center">
                                    <label for="asowp-toggle" @click="handleChangePatterActive" class="asowp-cursor-pointer asowp-bg-[#F8F8FF] asowp-border-[1px] asowp-border-solid asowp-border-black asowp-w-6 asowp-h-0.5 asowp-rounded-full asowp-p-1">
                                        <div :class="color.pattern.active ? 'asowp-translate-x-[100%] asowp-border-[#016464]': 'asowp-border-[#FFFFFF]'" class="asowp-toggle-dot asowp-w-2.5 asowp-h-2.5 -asowp-translate-y-[8px] -asowp-translate-x-2 asowp-border-[4px] asowp-border-solid asowp-bg-[#D9D9D9] asowp-rounded-full asowp-shadow-md asowp-transform"></div>
                                    </label>
                                </div>
                                <span class="asowp-text-[#444444] asowp-text-[11px]">Yes</span>
                            </div>
                        </div>
                        <div class="asowp-w-2/5 asowp-space-x-2 asowp-flex asowp-flex-col" v-if="!color.pattern.active">
                            <label for="" class="asowp-text-[12px] asowp-text[#444444] asowp-font-normal">Material Background Color</label>
                            <div class="asowp-relative asowp-flex">
                                <input
                                    id="colorPicker"
                                    type="color"
                                    v-model="color.pattern.codeHex"
                                    @input="changeBackgroundColor"
                                    class="asowp-w-9 asowp-h-[30px]"
                                />
                                <input
                                    type="text"
                                    v-model="color.pattern.codeHex"
                                    @input="changeBackgroundColor"
                                    class="asowp-p-1 asowp-text-black asowp-w-full -asowp-translate-y-px"
                                />
                            </div>                        
                        </div>
                        <div class="asowp-w-2/5 asowp-space-x-2 asowp-flex asowp-flex-col" v-if="color.pattern.active">
                            <label for="" class="asowp-text-[12px] asowp-text[#444444] asowp-font-normal">Background Image</label>
                            <div class="asowp-flex asowp-flex-col asowp-space-y-2 asowp-w-full asowp-pt-2">
                                <div class="asowp-flex asowp-space-x-2">
                                    <button @click="(e)=>selectColorBackgroundImage(e)" class="asowp-bg-[#016464] asowp-border-none asowp-w-fit asowp-h-fit asowp-p-4 asowp-rounded asowp-px-4 asowp-text-white asowp-opacity-90 hover:asowp-opacity-100 asowp-text-[10px] asowp-cursor-pointer">upload PopupImg</button>
                                    <div :class="`asowp-relative asowp-w-[82px] asowp-h-[49px] asowp-rounded-md asowp-overflow-hidden`">
                                        <img v-if="color.pattern.url != ''" :src="color.pattern.url" alt="" class="asowp-absolute asowp-w-full asowp-h-full">
                                        <button v-if="color.pattern.url != ''" @click="()=>{color.pattern.url = ''}" :class="`asowp-bg-[#016464] asowp-absolute asowp-bottom-0 asowp-right-0 asowp-text-white asowp-p-1 asowp-rounded-tl-lg asowp-border-none`">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="asowp-w-4 asowp-h-4">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>             
                        </div>
                    </div>
                    <div class="asowp-flex asowp-justify-between asowp-items-center">
                        <div class="asowp-w-2/5 asowp-space-x-2 asowp-flex asowp-justify-start">
                            <div>
                                <label for="">Enable Text Color</label>
                                <p>Activate this option to force a single color for texts</p>
                            </div>
                            <div class="asowp-flex asowp-space-x-2 asowp-items-center">
                                <span class="asowp-text-[#444444] asowp-text-[11px]">No</span>
                                <div class="asowp-flex asowp-items-center">
                                    <label for="asowp-toggle" @click="handleChangeTextColorActive" class="asowp-cursor-pointer asowp-bg-[#F8F8FF] asowp-border-[1px] asowp-border-solid asowp-border-black asowp-w-6 asowp-h-0.5 asowp-rounded-full asowp-p-1">
                                        <div :class="color.textColor.active ? 'asowp-translate-x-[100%] asowp-border-[#016464]': 'asowp-border-[#FFFFFF]'" class="asowp-toggle-dot asowp-w-2.5 asowp-h-2.5 -asowp-translate-y-[8px] -asowp-translate-x-2 asowp-border-[4px] asowp-border-solid asowp-bg-[#D9D9D9] asowp-rounded-full asowp-shadow-md asowp-transform"></div>
                                    </label>
                                </div>
                                <span class="asowp-text-[#444444] asowp-text-[11px]">Yes</span>
                            </div>
                        </div>
                    </div>
                    <div class="asowp-flex asowp-items-center asowp-justify-center">
                        <div class="asowp-w-2/5 asowp-space-x-2 asowp-flex asowp-justify-start" v-if="color.textColor.active">
                            <label for="" class="asowp-text-[12px] asowp-text[#444444] asowp-font-normal">Use same color for border</label>
                            <div class="asowp-flex asowp-space-x-2 asowp-items-center">
                                <span class="asowp-text-[#444444] asowp-text-[11px]">No</span>
                                <div class="asowp-flex asowp-items-center">
                                    <label for="asowp-toggle" @click="handleChangeSameForBorderColorActive" class="asowp-cursor-pointer asowp-bg-[#F8F8FF] asowp-border-[1px] asowp-border-solid asowp-border-black asowp-w-6 asowp-h-0.5 asowp-rounded-full asowp-p-1">
                                        <div :class="color.textColor.sameForBorder ? 'asowp-translate-x-[100%] asowp-border-[#016464]': 'asowp-border-[#FFFFFF]'" class="asowp-toggle-dot asowp-w-2.5 asowp-h-2.5 -asowp-translate-y-[8px] -asowp-translate-x-2 asowp-border-[4px] asowp-border-solid asowp-bg-[#D9D9D9] asowp-rounded-full asowp-shadow-md asowp-transform"></div>
                                    </label>
                                </div>
                                <span class="asowp-text-[#444444] asowp-text-[11px]">Yes</span>
                            </div>
                        </div>
                        <div class="asowp-w-2/5 asowp-space-x-2 asowp-flex asowp-flex-col" v-if="color.textColor.active">
                            <div class="asowp-flex asowp-space-x-4">
                                <div class="asowp-flex asowp-flex-col">
                                    <label for="" class="asowp-text-[12px] asowp-text[#444444] asowp-font-normal">Name</label>
                                    <input type="text" v-model="color.textColor.name" id="">
                                </div>
                                <div class="asowp-flex asowp-flex-col">
                                    <label for="" class="asowp-text-[12px] asowp-text[#444444] asowp-font-normal asowp-invisible">Name</label>
                                    <div class="asowp-relative asowp-flex">
                                        <input
                                            id="colorPicker"
                                            type="color"
                                            v-model="color.textColor.codeHex"
                                            @input="(e)=>changeTextColor"
                                            class="asowp-w-9 asowp-h-[30px]"
                                        />
                                        <input
                                            type="text"
                                            v-model="color.textColor.codeHex"
                                            @input="(e)=>changeTextColor"
                                            class="asowp-p-1 asowp-text-black asowp-w-full -asowp-translate-y-px"
                                        />
                                    </div> 
                                </div>
                                
                            </div>                       
                        </div>
                    </div>
                    <div class="asowp-w-2/5 asowp-space-y-2 asowp-flex asowp-flex-col">
                        <label for="" class="asowp-text-[12px] asowp-text[#444444] asowp-font-normal">Additional Price</label>
                        <input type="number" v-model="color.additionalPrice" class="asowp-rounded asowp-w-full asowp-h-[30px]" @blur="isNaN(color.additionalPrice) ? color.additionalPrice=0 :''">
                    </div>
                </div>
            </div>
            <div class="asowp-space-y-2" v-if="!isEdit">
                <div class="asowp-relative asowp-px-4 asowp-py-4 asowp-bg-[#F8F9FB] asowp-space-y-2" :key="key" v-for="(color,key) in addColors">
                    <div v-if="!dropdownColors[key]" class="asowp-flex asowp-space-x-4">
                        <h2 class="asowp-text-[15px] asowp-font-bold">{{ key+1 }}.</h2>
                        <div class="asowp-translate-y-3.5">
                            <span class="asowp-text-[15px] asowp-font-bold">{{ addColors[key].name }}</span>
                            <span v-if="addColors[key].name" class="asowp-text-[15px] asowp-font-bold"> - {{ addColors[key].additionalPrice }}</span>
                        </div>
                    </div>

                    <div class="asowp-flex asowp-justify-between" v-show="dropdownColors[key]">
                        <div class="asowp-w-2/5 asowp-space-y-2 asowp-flex asowp-flex-col">
                            <label for="" class="asowp-text-[12px] asowp-text[#444444] asowp-font-normal">Color Name</label>
                            <input type="text" class="asowp-rounded asowp-w-full asowp-h-[30px]" v-model="addColors[key].name"> 
                        </div>
                        <div class="asowp-w-2/5 asowp-space-x-2 asowp-flex asowp-flex-col">
                            <label for="" class="asowp-text-[12px] asowp-text[#444444] asowp-font-normal">Color Preview Image</label>
                            <div class="asowp-flex asowp-flex-col asowp-space-y-2 asowp-w-full asowp-pt-2">
                                <div class="asowp-flex asowp-space-x-2">
                                    <button @click="(e)=>selectMaterialPrevImage(e,key)" class="asowp-bg-[#016464] asowp-border-none asowp-w-fit asowp-h-fit asowp-p-4 asowp-rounded asowp-px-4 asowp-text-white asowp-opacity-90 hover:asowp-opacity-100 asowp-text-[10px] asowp-cursor-pointer">upload PopupImg</button>
                                    <div :class="`asowp-relative asowp-w-[82px] asowp-h-[49px] asowp-rounded-md asowp-overflow-hidden`">
                                        <img v-if="addColors[key].prevImg != ''" :src="addColors[key].prevImg" alt="" class="asowp-absolute asowp-w-full asowp-h-full">
                                        <button v-if="addColors[key].prevImg != ''" @click="()=>{addColors[key].prevImg = ''}" :class="`asowp-bg-[#016464] asowp-absolute asowp-bottom-0 asowp-right-0 asowp-text-white asowp-p-1 asowp-rounded-tl-lg asowp-border-none`">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="asowp-w-4 asowp-h-4">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>             
                        </div> 
                    </div>
                    <div class="asowp-flex asowp-justify-between asowp-items-center" v-show="dropdownColors[key]">
                        <div class="asowp-w-2/5 asowp-space-x-2 asowp-flex asowp-justify-start">
                            <div>
                                <label for="">Use Color Pattern</label>
                                <p>use a variety code for the color of the article or an image</p>
                            </div>
                            <div class="asowp-flex asowp-space-x-2 asowp-items-center">
                                <span class="asowp-text-[#444444] asowp-text-[11px]">No</span>
                                <div class="asowp-flex asowp-items-center">
                                    <label for="asowp-toggle" @click="handleChangePatterActive(key)" class="asowp-cursor-pointer asowp-bg-[#F8F8FF] asowp-border-[1px] asowp-border-solid asowp-border-black asowp-w-6 asowp-h-0.5 asowp-rounded-full asowp-p-1">
                                        <div :class="color.pattern.active ? 'asowp-translate-x-[100%] asowp-border-[#016464]': 'asowp-border-[#FFFFFF]'" class="asowp-toggle-dot asowp-w-2.5 asowp-h-2.5 -asowp-translate-y-[8px] -asowp-translate-x-2 asowp-border-[4px] asowp-border-solid asowp-bg-[#D9D9D9] asowp-rounded-full asowp-shadow-md asowp-transform"></div>
                                    </label>
                                </div>
                                <span class="asowp-text-[#444444] asowp-text-[11px]">Yes</span>
                            </div>
                        </div>
                        <div class="asowp-w-2/5 asowp-space-x-2 asowp-flex asowp-flex-col" v-if="!color.pattern.active">
                            <label for="" class="asowp-text-[12px] asowp-text[#444444] asowp-font-normal">Material Background Color</label>
                            <div class="asowp-relative asowp-flex">
                                <input
                                    id="colorPicker"
                                    type="color"
                                    v-model="addColors[key].pattern.codeHex"
                                    @input="(e)=>changeBackgroundColor(e,key)"
                                    class="asowp-w-9 asowp-h-[30px]"
                                />
                                <input
                                    type="text"
                                    v-model="addColors[key].pattern.codeHex"
                                    @input="(e)=>changeBackgroundColor(e,key)"
                                    class="asowp-p-1 asowp-text-black asowp-w-full -asowp-translate-y-px"
                                />
                            </div>                        
                        </div>
                        <div class="asowp-w-2/5 asowp-space-x-2 asowp-flex asowp-flex-col" v-if="color.pattern.active">
                            <label for="" class="asowp-text-[12px] asowp-text[#444444] asowp-font-normal">Background Image</label>
                            <div class="asowp-flex asowp-flex-col asowp-space-y-2 asowp-w-full asowp-pt-2">
                                <div class="asowp-flex asowp-space-x-2">
                                    <button @click="(e)=>selectColorBackgroundImage(e,key)" class="asowp-bg-[#016464] asowp-border-none asowp-w-fit asowp-h-fit asowp-p-4 asowp-rounded asowp-px-4 asowp-text-white asowp-opacity-90 hover:asowp-opacity-100 asowp-text-[10px] asowp-cursor-pointer">upload PopupImg</button>
                                    <div :class="`asowp-relative asowp-w-[82px] asowp-h-[49px] asowp-rounded-md asowp-overflow-hidden`">
                                        <img v-if="addColors[key].pattern.url != ''" :src="addColors[key].pattern.url" alt="" class="asowp-absolute asowp-w-full asowp-h-full">
                                        <button v-if="addColors[key].pattern.url != ''" @click="()=>{addColors[key].pattern.url = ''}" :class="`asowp-bg-[#016464] asowp-absolute asowp-bottom-0 asowp-right-0 asowp-text-white asowp-p-1 asowp-rounded-tl-lg asowp-border-none`">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="asowp-w-4 asowp-h-4">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>             
                        </div>
                    </div>
                    <div class="asowp-justify-between asowp-items-center asowp-space-y-2" v-show="dropdownColors[key]">
                        <div class="asowp-w-2/5 asowp-space-x-2 asowp-flex asowp-justify-start">
                            <label for="" class="asowp-text-[12px] asowp-text[#444444] asowp-font-normal">Enable Text Color</label>
                            <div class="asowp-flex asowp-space-x-2 asowp-items-center">
                                <span class="asowp-text-[#444444] asowp-text-[11px]">No</span>
                                <div class="asowp-flex asowp-items-center">
                                    <label for="asowp-toggle" @click="handleChangeTextColorActive(key)" class="asowp-cursor-pointer asowp-bg-[#F8F8FF] asowp-border-[1px] asowp-border-solid asowp-border-black asowp-w-6 asowp-h-0.5 asowp-rounded-full asowp-p-1">
                                        <div :class="addColors[key].textColor.active ? 'asowp-translate-x-[100%] asowp-border-[#016464]': 'asowp-border-[#FFFFFF]'" class="asowp-toggle-dot asowp-w-2.5 asowp-h-2.5 -asowp-translate-y-[8px] -asowp-translate-x-2 asowp-border-[4px] asowp-border-solid asowp-bg-[#D9D9D9] asowp-rounded-full asowp-shadow-md asowp-transform"></div>
                                    </label>
                                </div>
                                <span class="asowp-text-[#444444] asowp-text-[11px]">Yes</span>
                            </div>
                        </div>
                        <div class="asowp-flex asowp-items-center asowp-justify-center">
                            <div class="asowp-w-2/5 asowp-space-x-2 asowp-flex asowp-justify-start" v-if="color.textColor.active">
                                <label for="" class="asowp-text-[12px] asowp-text[#444444] asowp-font-normal">Use same color for border</label>
                                <div class="asowp-flex asowp-space-x-2 asowp-items-center">
                                    <span class="asowp-text-[#444444] asowp-text-[11px]">No</span>
                                    <div class="asowp-flex asowp-items-center">
                                        <label for="asowp-toggle" @click="handleChangeSameForBorderColorActive(key)" class="asowp-cursor-pointer asowp-bg-[#F8F8FF] asowp-border-[1px] asowp-border-solid asowp-border-black asowp-w-6 asowp-h-0.5 asowp-rounded-full asowp-p-1">
                                            <div :class="color.textColor.sameForBorder ? 'asowp-translate-x-[100%] asowp-border-[#016464]': 'asowp-border-[#FFFFFF]'" class="asowp-toggle-dot asowp-w-2.5 asowp-h-2.5 -asowp-translate-y-[8px] -asowp-translate-x-2 asowp-border-[4px] asowp-border-solid asowp-bg-[#D9D9D9] asowp-rounded-full asowp-shadow-md asowp-transform"></div>
                                        </label>
                                    </div>
                                    <span class="asowp-text-[#444444] asowp-text-[11px]">Yes</span>
                                </div>
                            </div>
                            <div class="asowp-w-2/5 asowp-space-x-2 asowp-flex asowp-flex-col" v-if="color.textColor.active">
                                <div class="asowp-flex asowp-space-x-4">
                                    <div class="asowp-flex asowp-flex-col">
                                        <label for="" class="asowp-text-[12px] asowp-text[#444444] asowp-font-normal">Name</label>
                                        <input type="text" v-model="addColors[key].textColor.name" id="">
                                    </div>
                                    <div class="asowp-flex asowp-flex-col">
                                        <label for="" class="asowp-text-[12px] asowp-text[#444444] asowp-font-normal asowp-invisible">Name</label>
                                        <div class="asowp-relative asowp-flex">
                                            <input
                                                id="colorPicker"
                                                type="color"
                                                v-model="addColors[key].textColor.codeHex"
                                                @input="(e)=>changeTextColor(e,key)"
                                                class="asowp-w-9 asowp-h-[30px]"
                                            />
                                            <input
                                                type="text"
                                                v-model="addColors[key].textColor.codeHex"
                                                @input="(e)=>changeTextColor(e,key)"
                                                class="asowp-p-1 asowp-text-black asowp-w-full -asowp-translate-y-px"
                                            />
                                        </div> 
                                    </div>
                                    
                                </div>                       
                            </div>
                        </div>
                    </div>
                    <div class="asowp-w-2/5 asowp-space-y-2 asowp-flex asowp-flex-col" v-show="dropdownColors[key]">
                        <label for="" class="asowp-text-[12px] asowp-text[#444444] asowp-font-normal">Additional Price</label>
                        <input type="number" v-model="addColors[key].additionalPrice" class="asowp-rounded asowp-w-full asowp-h-[30px]"  @blur="isNaN(addColors[key].additionalPrice)?addColors[key].additionalPrice=0:''">
                    </div>
                    <div @click="handleDeleteNewMaterialColor(key)" class="asowp-flex asowp-absolute asowp-justify-center asowp-items-center asowp-right-2 asowp-my-0  asowp-top-0 asowp-shadow-md asowp-rounded-full asowp-cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="asowp-w-6 asowp-h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                    </div>
                    <div v-if="dropdownColors[key]" @click="dropdownColors[key]=false" class="asowp-flex asowp-absolute asowp-justify-center asowp-items-center  asowp-my-0 asowp-right-8 asowp-top-0 asowp-shadow-md asowp-rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="asowp-w-6 asowp-h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 18.75 7.5-7.5 7.5 7.5" />
                            <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 7.5-7.5 7.5 7.5" />
                        </svg>
                    </div>
                    <div v-if="!dropdownColors[key]" @click="dropdownColors[key]=true" class="asowp-flex asowp-absolute asowp-justify-center asowp-items-center  asowp-my-0 asowp-right-8 asowp-top-0 asowp-shadow-md asowp-rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="asowp-w-6 asowp-h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5" />
                        </svg>
                    </div>
                </div>
                <div class="asowp-pt-4">
                    <button :disabled="isLoading" @click="handleAddNewMaterialColor" class="asowp-flex asowp-jsutify-center asowp-items-center asowp-bg-[#016464] asowp-rounded asowp-w-fit asowp-space-x-2 asowp-h-fit asowp-text-white asowp-px-8 asowp-p-2.5 asowp-rounded asowp-border-none hover:asowp-opacity-100 hover:asowp-border-none hover:asowp-text-white hover:asowp-bg-[#016464] asowp-cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="asowp-w-6 asowp-h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                        <span class="asowp-font-semibold asowp-text-[16px]">Add Color</span>
                    </button>
                </div>
            </div>
            
            <div class="asowp-bg-[#F8F9FB] asowp-flex asowp-space-x-4 asowp-px-4 asowp-py-4 asowp-justify-end asowp-items-end">
                <div class="asowp-bg-[#016464] asowp-rounded">
                    <button :disabled="isLoading" class="asowp-flex asowp-bg-transparent asowp-w-fit asowp-space-x-2 asowp-h-fit asowp-px-8 asowp-p-2 asowp-border-none asowp-text-white asowp-opacity-90 hover:asowp-border-none hover:asowp-text-white hover:asowp-opacity-100 asowp-cursor-pointer" @click="back">
                        <svg class="asowp-w-6 asowp-h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 12L5 8V11L17.17 11C17.3756 10.414 17.7586 9.90661 18.2657 9.54821C18.7729 9.18981 19.379 8.9982 20 9C20.7956 9 21.5587 9.31607 22.1213 9.87868C22.6839 10.4413 23 11.2044 23 12C23 12.7956 22.6839 13.5587 22.1213 14.1213C21.5587 14.6839 20.7956 15 20 15C18.69 15 17.58 14.17 17.17 13L5 13V16L1 12Z" fill="currentColor"/>
                        </svg>

                        <div class="asowp-font-semibold asowp-text-[16px]">Back</div>
                    </button>
                </div>
                <div class="asowp-bg-[#016464] asowp-rounded" v-if="isEdit">
                    <button @click="updateColorInMaterialColor" :class="`asowp-rounded asowp-flex ${!isLoading ? 'asowp-bg-amber-400 ' :'asowp-bg-amber-500'} asowp-w-fit asowp-space-x-2 asowp-h-fit asowp-px-8 asowp-text-white asowp-p-2 asowp-border-none asowp-opacity-90 hover:asowp-border-none hover:asowp-text-white hover:asowp-opacity-100 asowp-cursor-pointer`">
                        <img src="../../../../../../../assets/icons/ic_loading_gray.svg" class="asowp-w-5 asowp-w-5" v-if="isLoading" :disabled="isLoading"/>
                        <div class="asowp-font-semibold asowp-text-[16px]">Update</div>
                    </button>
                </div>
                <div class="asowp-bg-[#016464] asowp-rounded" v-if="!isEdit">
                    <button @click="addMaterialColor" class="asowp-flex asowp-bg-transparent asowp-w-fit asowp-space-x-2 asowp-h-fit asowp-text-white  asowp-px-12 asowp-p-2.5 asowp-border-none asowp-opacity-90 hover:asowp-border-none hover:asowp-text-white hover:asowp-opacity-100 asowp-cursor-pointer">
                        <div class="asowp-translate-y-1">
                            <img src="../../../../../../../assets/icons/ic_loading_gray.svg" class="asowp-w-5 asowp-w-5" v-if="isLoading" :disabled="isLoading"/>
                            <svg v-if="!isLoading" class="asowp-w-4 asowp-h-4" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2.5 1.25C2.16848 1.25 1.85054 1.3817 1.61612 1.61612C1.3817 1.85054 1.25 2.16848 1.25 2.5V17.5C1.25 17.8315 1.3817 18.1495 1.61612 18.3839C1.85054 18.6183 2.16848 18.75 2.5 18.75H17.5C17.8315 18.75 18.1495 18.6183 18.3839 18.3839C18.6183 18.1495 18.75 17.8315 18.75 17.5V2.5C18.75 2.16848 18.6183 1.85054 18.3839 1.61612C18.1495 1.3817 17.8315 1.25 17.5 1.25H11.875C11.5435 1.25 11.2255 1.3817 10.9911 1.61612C10.7567 1.85054 10.625 2.16848 10.625 2.5V11.6163L13.9325 8.3075C14.0499 8.19014 14.209 8.12421 14.375 8.12421C14.541 8.12421 14.7001 8.19014 14.8175 8.3075C14.9349 8.42486 15.0008 8.58403 15.0008 8.75C15.0008 8.91597 14.9349 9.07514 14.8175 9.1925L10.4425 13.5675C10.3844 13.6257 10.3155 13.6719 10.2395 13.7034C10.1636 13.7349 10.0822 13.7511 10 13.7511C9.91779 13.7511 9.83639 13.7349 9.76046 13.7034C9.68453 13.6719 9.61556 13.6257 9.5575 13.5675L5.1825 9.1925C5.12439 9.13439 5.07829 9.0654 5.04685 8.98948C5.0154 8.91356 4.99921 8.83218 4.99921 8.75C4.99921 8.66782 5.0154 8.58644 5.04685 8.51052C5.07829 8.4346 5.12439 8.36561 5.1825 8.3075C5.24061 8.24939 5.3096 8.20329 5.38552 8.17185C5.46144 8.1404 5.54282 8.12421 5.625 8.12421C5.70718 8.12421 5.78856 8.1404 5.86448 8.17185C5.9404 8.20329 6.00939 8.24939 6.0675 8.3075L9.375 11.6163V2.5C9.375 1.83696 9.63839 1.20107 10.1072 0.732233C10.5761 0.263392 11.212 0 11.875 0L17.5 0C18.163 0 18.7989 0.263392 19.2678 0.732233C19.7366 1.20107 20 1.83696 20 2.5V17.5C20 18.163 19.7366 18.7989 19.2678 19.2678C18.7989 19.7366 18.163 20 17.5 20H2.5C1.83696 20 1.20107 19.7366 0.732233 19.2678C0.263392 18.7989 0 18.163 0 17.5V2.5C0 1.83696 0.263392 1.20107 0.732233 0.732233C1.20107 0.263392 1.83696 0 2.5 0L5.625 0C5.79076 0 5.94973 0.065848 6.06694 0.183058C6.18415 0.300269 6.25 0.45924 6.25 0.625C6.25 0.79076 6.18415 0.949732 6.06694 1.06694C5.94973 1.18415 5.79076 1.25 5.625 1.25H2.5Z" fill="white"/>
                            </svg>
                        </div>

                        <span class="asowp-font-semibold asowp-text-[16px]">Save</span>
                    </button>
                </div>
            </div>
        </div>
       
        <!-- Delete Modal-->
        <div v-if="openModal" @click.self="closeModal" class="asowp-z-[999] asowp-bg-gray-400 asowp-overflow-y-auto asowp-overflow-x-hidden asowp-fixed asowp-top-0 asowp-right-[25%] asowp-left-[75%]  asowp-flex asowp-justify-center asowp-items-center asowp-w-full md:asowp-inset-0 asowp-h-full">
            <div class="asowp-relative asowp-p-4 asowp-w-full asowp-max-w-md asowp-max-h-full">
                <div class="asowp-relative asowp-bg-white asowp-rounded-lg asowp-shadow dark:bg-gray-700">
                    <button @click.stop="closeModal" type="button" :class="`${isLoading ? 'asowp-cursor-not-allowed' : 'asowp-cursor-pointer'} asowp-absolute asowp-top-3 asowp-end-2.5 asowp-text-gray-400 asowp-bg-transparent hover:bg-gray-200 hover:text-gray-900 asowp-rounded-lg asowp-text-sm asowp-w-8 asowp-h-8 asowp-ms-auto asowp-inline-flex asowp-justify-center asowp-items-center dark:hover:bg-gray-600 dark:hover:text-white`" data-modal-hide="popup-modal">
                        <svg class="asowp-w-3 asowp-h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                        <span class="asowp-sr-only">Close modal</span>
                    </button>
                    <div class="asowp-p-4 md:p-5 asowp-text-center">
                        <svg class="asowp-mx-auto asowp-mb-4 asowp-text-gray-400 asowp-w-12 asowp-h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                        </svg>
                        <h3 class="asowp-mb-5 asowp-text-lg asowp-font-normal asowp-text-gray-500 dark:text-gray-400">Are you sure you want to delete this color?</h3>
                        <input v-model="color.name" readonly class="asowp-rounded asowp-w-full asowp-h-[35px] asowp-text-center asowp-p-4 asowp-my-2 asowp-border-none" />
                        <button @click="deleteMaterialColor" data-modal-hide="popup-modal" type="button" :class="`asowp-border-solid asowp-text-white ${!isLoading ? 'asowp-bg-red-600 asowp-cursor-pointer' :'asowp-bg-red-700 asowp-cursor-not-allowed'} hover:bg-red-800 focus:ring-4 focus:outline-none asowp-my-2 asowp-border-none  focus:ring-red-300 dark:focus:ring-red-800 asowp-font-medium asowp-rounded-lg asowp-text-sm asowp-inline-flex asowp-items-center asowp-px-5 asowp-py-2.5 asowp-text-center`">
                            <img src="../../../../../../../assets/icons/ic_loading_gray.svg" class="asowp-w-5 asowp-w-5" v-if="isLoading" :disabled="isLoading"/>
                            Yes, I'm sure
                        </button>
                        <button @click.stop="closeModal" data-modal-hide="popup-modal" type="button" :class="`asowp-border-solid asowp-py-2.5 asowp-px-5 asowp-ms-3 asowp-text-sm asowp-font-medium asowp-text-gray-900 asowp-my-2  asowp-border-gray-500 asowp-border-white focus:outline-none asowp-bg-white asowp-rounded-lg asowp-border asowp-border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 ${isLoading ? 'asowp-cursor-not-allowed' : 'asowp-cursor-pointer'}`">No, cancel</button>
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
