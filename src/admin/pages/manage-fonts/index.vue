<template>
    <div class="">
        <div class="asowp-space-y-1 asowp-translate-y-1" v-if="!createFont">
            <div class="asowp-bg-[#fff] asowp-p-4 asowp-rounded-[10px] asowp-border-[2px] asowp-border-solid asowp-border-[#d9d9d9] asowp-text-[16px] asowp-space-x-1 asowp-px-4 asowp-py-4 asowp-flex">
                <span class="asowp-font-bold">
                    Manage Font
                </span>
            </div>
            <div class="asowp-translate-y-2 asowp-bg-[#fff] asowp-p-4 asowp-rounded-[10px] asowp-border-[2px] asowp-border-solid asowp-border-[#d9d9d9]">
                <div v-if="!isFetching" class="asowp-flex asowp-justify-end asowp-space-x-2 asowp-w-4/4 asowp-bg-[#F8F9FB] asowp-text-[12px] asowp-px-4 asowp-py-4 asowp-pb-2">
                    <button class="asowp-flex asowp-w-fit asowp-h-fit asowp-rounded asowp-bg-[#016464] asowp-px-4 asowp-space-x-2 asowp-p-1.5 asowp-border-none asowp-text-white asowp-opacity-90 hover:asowp-opacity-100 asowp-cursor-pointer" @click="addFont">
                        <svg class="asowp-w-5 asowp-h-5" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g id="plus-lg">
                            <path id="Vector" fill-rule="evenodd" clip-rule="evenodd" d="M11 2.75C11.1823 2.75 11.3572 2.82243 11.4861 2.95136C11.6151 3.0803 11.6875 3.25516 11.6875 3.4375V10.3125H18.5625C18.7448 10.3125 18.9197 10.3849 19.0486 10.5139C19.1776 10.6428 19.25 10.8177 19.25 11C19.25 11.1823 19.1776 11.3572 19.0486 11.4861C18.9197 11.6151 18.7448 11.6875 18.5625 11.6875H11.6875V18.5625C11.6875 18.7448 11.6151 18.9197 11.4861 19.0486C11.3572 19.1776 11.1823 19.25 11 19.25C10.8177 19.25 10.6428 19.1776 10.5139 19.0486C10.3849 18.9197 10.3125 18.7448 10.3125 18.5625V11.6875H3.4375C3.25516 11.6875 3.0803 11.6151 2.95136 11.4861C2.82243 11.3572 2.75 11.1823 2.75 11C2.75 10.8177 2.82243 10.6428 2.95136 10.5139C3.0803 10.3849 3.25516 10.3125 3.4375 10.3125H10.3125V3.4375C10.3125 3.25516 10.3849 3.0803 10.5139 2.95136C10.6428 2.82243 10.8177 2.75 11 2.75Z" fill="white"/>
                            </g>
                        </svg>
                        <div class="asowp-text-[14px]">
                            Add new font
                        </div>
                    </button>
                </div>
            
                <div class="asowp-relative" id="monTableau" >
                    <table class="asowp-text-center asowp-w-full asowp-border asowp-border-collapse asowp-border-0">
                        <thead class="asowp-bg-[#f0f0f1]">
                            <tr class="">
                                <th scope="col" class="asowp-text-left asowp-px-6 asowp-py-3 asowp-text-[14px] asowp-font-semibold">
                                    Title
                                </th>
                                <th scope="col" class="asowp-px-6 asowp-py-3 asowp-text-[14px] asowp-font-semibold">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody class="asowp-bg-white">
                            <tr v-if="isFetching">
                                <td colspan="2">
                                    <div class="asowp-bg-white asowp-border-solid asowp-border asowp-border-[#D1D1D1] asowp-flex asowp-flex-col asowp-space-y-2 asowp-justify-center asowp-items-center asowp-w-full asowp-h-[306px] p-4">
                                        <img class="asowp-w-[200px] asowp-h-[200px]" src="../../../../assets/icons/ic_loading.svg" alt="">
                                    </div>
                                </td>
                            </tr>
                            <tr  v-if="fonts.length == 0 && !isFetching">
                                <td colspan="2">
                                    <div class="asowp-bg-white asowp-border-solid asowp-border asowp-border-[#D1D1D1] asowp-flex asowp-flex-col asowp-space-y-12 asowp-justify-center asowp-items-center asowp-py-10 asowp-h-[306px]">
                                        <div class="asowp-flex asowp-flex-col asowp-space-y-2 asowp-justify-center asowp-items-center">
                                            <p class="asowp-text-2xl asowp-font-bold">{{noFontsFound}}</p>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr v-if="!isFetching" v-for="(font,key) in fonts" :key="key" class="asowp-border-t-0 asowp-border-l-0 asowp-border-r-0 asowp-border-b-2 asowp-border-solid asowp-border-[#f0f0f1]">
                                <td class="asowp-px-6 asowp-text-[14px] asowp-py-2 asowp-text-left asowp-space-x-2">
                                {{font.label}}
                                </td>
                                <td class="asowp-px-6 asowp-py-2 asowp-flex asowp-justify-center asowp-space-x-2">
                                    <button @click="()=>selectedFont(key,font)" class="asowp-bg-transparent asowp-border-none asowp-text-[#2DD05B] asowp-cursor-pointer">
                                        <img class="asowp-w-5 asowp-h-5" src="../../../../assets/icons/ic_edit.svg" alt="">
                                    </button>
                                    <button @click="()=>selectedFont(key,font,true)" class="asowp-bg-transparent asowp-border-none asowp-text-[#A00000] asowp-cursor-pointer">
                                        <img class="asowp-w-5 asowp-h-5" src="../../../../assets/icons/ic_delete.svg" alt="">
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div class="asowp-space-y-1 asowp-translate-y-1 asowp-bg-[#fff] asowp-p-4 asowp-rounded-[10px] asowp-border-[2px] asowp-border-solid asowp-border-[#d9d9d9]" v-if="createFont">
            <div class="asowp-text-[16px] asowp-font-bold asowp-px-4 asowp-py-4 ">
                Update font
            </div>
            <hr class="Polaris-Divider" style="border: 1px solid #ebebeb;">
            <!--<div class="asowp-px-6 asowp-translate-y-4 asowp-text-[14px]">
                Add a font from Google Font or upload your own
            </div>-->
            <!--<div class="asowp-flex asowp-space-x-4 asowp-w-full asowp-p-8 asowp-px-6">
                <div class="asowp-flex asowp-justify-center asowp-items-center asowp-space-x-4">
                    <p class="asowp-text-md asowp-font-medium asowp-text-black">Google Font</p>
                    <label for="uploadFont" class="asowp-relative asowp-inline-flex asowp-items-center asowp-cursor-pointer">
                        <input id="uploadFont" type="radio" name="upload-font" class="asowp-sr-only asowp-peer" :value="true" v-model="font.isGoogleFont" :checked="font.isGoogleFont">
                        <div :class="`peer-checked:after:asowp-border-[#016464] peer-checked:after:asowp-border-solid peer-checked:after:asowp-top-[-2px] peer-checked:after:asowp-translate-y-[-15%] asowp-w-10 asowp-h-3.5 asowp-border asowp-border-[#016464] asowp-bg-zinc-300 asowp-rounded-full asowp-peer peer-checked:after:asowp-translate-x-[80%] after:asowp-content-[''] after:asowp-absolute after:asowp-top-[-3px] after:asowp-left-[0px] after:asowp-bg-zinc-300 after:asowp-border-white after:asowp-border-solid after:asowp-translate-y-[-15%] after:asowp-border-[#FFFFFF] after:asowp-rounded-full after:asowp-h-5 after:asowp-w-5 after:asowp-transition-all after:asowp-shadow-lg`"></div>
                    </label>
                </div>
                
                <div class="asowp-flex asowp-justify-center asowp-items-center asowp-space-x-4">
                    <p class="asowp-text-md asowp-font-medium asowp-text-black">Upload Font</p>
                    <label for="uploadFont2" class="asowp-relative asowp-inline-flex asowp-items-center asowp-cursor-pointer">
                    <input id="uploadFont2" type="radio" name="upload-font" class="asowp-sr-only asowp-peer" :value="false" v-model="font.isGoogleFont" :checked="!font.isGoogleFont">
                    <div class="peer-checked:after:asowp-border-[#016464] peer-checked:after:asowp-border-solid peer-checked:after:asowp-top-[-2px] peer-checked:after:asowp-translate-y-[-15%] asowp-w-10 asowp-h-3.5 asowp-border asowp-border-[#016464] asowp-bg-zinc-300 asowp-rounded-full asowp-peer peer-checked:after:asowp-translate-x-[80%] after:asowp-content-[''] after:asowp-absolute after:asowp-top-[-3px] after:asowp-left-[0px] after:asowp-bg-zinc-300 after:asowp-border-white after:asowp-border-solid after:asowp-translate-y-[-15%] after:asowp-border-[#FFFFFF] after:asowp-rounded-full after:asowp-h-5 after:asowp-w-5 after:asowp-transition-all after:asowp-shadow-lg"></div>
                    </label>
                </div>
            </div>-->
            <!--<div v-if="font.isGoogleFont" class="asowp-px-6 asowp-py-6 -asowp-translate-y-8">
                <div class="asowp-flex asowp-justify-between">
                    <div class="asowp-w-2/5 asowp-py-3 asowp-space-y-3">
                        <label class="asowp-text-md asowp-font-medium asowp-text-black">Choose Google font</label>
                        <Multiselect
                            v-model="selectedGoogleFont"
                            placeholder="Select your font"
                            label="name"
                            trackBy="name"
                            :options="allGoogleFonts"
                            :searchable="true"
                            :loading="isFetching"
                            @select="(option)=>{font.label = option[0].label}"
                        >
                            <template v-slot:option="{ option }">
                                {{ option.name }}
                            </template>

                        </Multiselect>
                    </div>
                    <div class="asowp-w-2/5 asowp-py-3 asowp-space-y-3">
                        <label class="asowp-text-md asowp-font-medium asowp-text-black">Choose Google font Variant</label>
                        <Multiselect
                            v-model="font.url"
                            placeholder="Select your variant"
                            label="name"
                            trackBy="name"
                            :options="selectedGoogleFont"
                            :searchable="true"
                        >
                            <template v-slot:option="{ option }">
                                {{ option.name }}
                            </template>
        
                        </Multiselect>
                    </div>
                </div>
                <div :class="`${emptyFontLabel?'asowp-border-red-500 asowp-text-red-500 asowp-border-2':''} asowp-flex asowp-flex-col asowp-space-y-2 asowp-w-full asowp-py-4`">
                    <label for="file_input" :class="`asowp-text-md asowp-font-medium asowp-text-black`">Font Label</label>
                    <input type="text" v-model="font.label" :class="`asowp-w-[40%] asowp-h-[35px] ${emptyFontLabel ? 'asowp-border-red-500 asowp-text-red-500 asowp-border-solid ':''} `"/>
                </div>
            </div>-->
            <div class="asowp-space-x-2 -asowp-translate-y-1 asowp-py-2">
                <div :class="`${emptyFontLabel?'asowp-border-red-500 asowp-text-red-500':''} asowp-flex asowp-justify-between asowp-px-6`">
                    
                    <div class="asowp-w-2/5 asowp-space-y-3">
                        <label for="file_input" :class="`asowp-text-md asowp-font-medium asowp-text-black ${emptyFontLabel?'asowp-border-red-500 asowp-text-red-500 asowp-border-solid ':''}`">Upload font file</label>
                        <div class="asowp-flex asowp-space-x-2 asowp-w-full asowp-border asowp-p-1 asowp-border-solid asowp-border-[#000] asowp-rounded-[10px]">
                            <button @click="uploadFontFile" :class="`asowp-bg-[#016464] asowp-border-none asowp-w-fit asowp-h-fit asowp-p-1 asowp-rounded asowp-px-4 asowp-text-white asowp-opacity-90 hover:asowp-opacity-100 asowp-text-[10px] asowp-cursor-pointer`">
                                <svg class="asowp-w-4 asowp-h-4" viewBox="0 0 23 21" fill="none" xmlns="http://www.w3.org/2000/svg">        
                                    <path d="M22.4375 12.2809V18.5309C22.4375 18.9453 22.2729 19.3427 21.9799 19.6357C21.6868 19.9288 21.2894 20.0934 20.875 20.0934H2.125C1.7106 20.0934 1.31317 19.9288 1.02015 19.6357C0.72712 19.3427 0.5625 18.9453 0.5625 18.5309V12.2809C0.5625 11.8665 0.72712 11.4691 1.02015 11.176C1.31317 10.883 1.7106 10.7184 2.125 10.7184H6.8125C7.0197 10.7184 7.21841 10.8007 7.36493 10.9472C7.51144 11.0937 7.59375 11.2924 7.59375 11.4996C7.59375 11.7068 7.51144 11.9056 7.36493 12.0521C7.21841 12.1986 7.0197 12.2809 6.8125 12.2809H2.125V18.5309H20.875V12.2809H16.1875C15.9803 12.2809 15.7816 12.1986 15.6351 12.0521C15.4886 11.9056 15.4062 11.7068 15.4062 11.4996C15.4062 11.2924 15.4886 11.0937 15.6351 10.9472C15.7816 10.8007 15.9803 10.7184 16.1875 10.7184H20.875C21.2894 10.7184 21.6868 10.883 21.9799 11.176C22.2729 11.4691 22.4375 11.8665 22.4375 12.2809ZM7.36523 6.58362L10.7188 3.22913V11.4996C10.7188 11.7068 10.8011 11.9056 10.9476 12.0521C11.0941 12.1986 11.2928 12.2809 11.5 12.2809C11.7072 12.2809 11.9059 12.1986 12.0524 12.0521C12.1989 11.9056 12.2812 11.7068 12.2812 11.4996V3.22913L15.6348 6.58362C15.7814 6.73022 15.9802 6.81257 16.1875 6.81257C16.3948 6.81257 16.5936 6.73022 16.7402 6.58362C16.8868 6.43703 16.9692 6.2382 16.9692 6.03089C16.9692 5.82357 16.8868 5.62475 16.7402 5.47815L12.0527 0.790654C11.9802 0.718016 11.894 0.660392 11.7992 0.621076C11.7043 0.58176 11.6027 0.561523 11.5 0.561523C11.3973 0.561523 11.2957 0.58176 11.2008 0.621076C11.106 0.660392 11.0198 0.718016 10.9473 0.790654L6.25977 5.47815C6.11317 5.62475 6.03082 5.82357 6.03082 6.03089C6.03082 6.2382 6.11317 6.43703 6.25977 6.58362C6.40636 6.73022 6.60518 6.81257 6.8125 6.81257C7.01982 6.81257 7.21864 6.73022 7.36523 6.58362ZM18.5312 15.4059C18.5312 15.1741 18.4625 14.9475 18.3338 14.7548C18.205 14.5621 18.022 14.4119 17.8078 14.3232C17.5937 14.2345 17.3581 14.2113 17.1308 14.2565C16.9034 14.3017 16.6946 14.4134 16.5307 14.5772C16.3668 14.7411 16.2552 14.9499 16.21 15.1773C16.1648 15.4046 16.188 15.6402 16.2767 15.8543C16.3654 16.0685 16.5156 16.2515 16.7083 16.3803C16.901 16.509 17.1276 16.5778 17.3594 16.5778C17.6702 16.5778 17.9682 16.4543 18.188 16.2345C18.4078 16.0148 18.5312 15.7167 18.5312 15.4059Z" fill="white"/>        
                                </svg>
                                Upload font file 
                                
                            </button>
                            <div :class="`asowp-relative asowp-w-[82px] asowp-h-[30px] asowp-rounded-md asowp-overflow-hidden`">
                                <input type="text" name="" id="" class="asowp-text-white asowp-w-full asowp-h-[39px]" style="border: none; background-color: transparent;" readonly v-model="font.url">
                            </div>
                            
                        </div>
                        <p>.ttf, .otf Font File Type (Required)</p>
                    </div>
                    
                    <div class="asowp-space-y-3 asowp-w-2/5">
                        <label class="asowp-text-md asowp-font-medium asowp-text-black asowp-flex asowp-flex-col">Label</label>
                        <input type="text" v-model="font.label" :class="`${emptyFontLabel?'asowp-border-red-500 asowp-text-red-500 asowp-border-solid':''} asowp-w-full asowp-h-[39px]`" style="border-radius: 10px !important;"/>
                    </div>
                    
                </div>
            </div>
            <hr class="Polaris-Divider" style="border: 1px solid #ebebeb;">
            <div class="asowp-flex asowp-font-bold asowp-space-x-4 asowp-px-4 asowp-py-4 asowp-justify-end asowp-items-end">
                <div class="asowp-bg-[#016464] asowp-rounded">
                    <button class="asowp-flex asowp-bg-transparent asowp-w-fit asowp-space-x-2 asowp-h-fit asowp-px-8 asowp-text-white asowp-p-2 asowp-border-none asowp-opacity-90 hover:asowp-border-none hover:asowp-text-white hover:asowp-opacity-100 asowp-cursor-pointer" @click="back">
                        <svg class="asowp-w-6 asowp-h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 12L5 8V11L17.17 11C17.3756 10.414 17.7586 9.90661 18.2657 9.54821C18.7729 9.18981 19.379 8.9982 20 9C20.7956 9 21.5587 9.31607 22.1213 9.87868C22.6839 10.4413 23 11.2044 23 12C23 12.7956 22.6839 13.5587 22.1213 14.1213C21.5587 14.6839 20.7956 15 20 15C18.69 15 17.58 14.17 17.17 13L5 13V16L1 12Z" fill="currentColor"/>
                        </svg>

                        <div class="asowp-font-semibold asowp-text-[16px]">Back</div>
                    </button>
                </div>
                <div class="asowp-bg-[#016464] asowp-rounded" v-if="isEdit">
                    <button @click="updateFont" :class="`asowp-rounded asowp-flex ${!isLoading ? 'asowp-bg-amber-400 ' :'asowp-bg-amber-500'} asowp-w-fit asowp-space-x-2 asowp-h-fit asowp-px-8 asowp-text-white asowp-p-2 asowp-border-none asowp-opacity-90 hover:asowp-border-none hover:asowp-text-white hover:asowp-opacity-100 asowp-cursor-pointer`">
                        <img src="../../../../assets/icons/ic_loading_gray.svg" class="asowp-w-5 asowp-w-5" v-if="isLoading" :disabled="isLoading"/>
                        <div class="asowp-font-semibold asowp-text-[16px]">Update</div>
                    </button>
                </div>
                <div class="asowp-bg-[#016464] asowp-rounded" v-if="!isEdit">
                    <button @click="addNewFont" class="asowp-flex asowp-bg-transparent asowp-w-fit asowp-space-x-2 asowp-h-fit asowp-text-white asowp-px-12 asowp-p-2.5 asowp-rounded asowp-border-none asowp-opacity-90 hover:asowp-opacity-100 hover:asowp-border-none hover:asowp-text-white hover:asowp-bg-[#016464] asowp-cursor-pointer">
                        <img src="../../../../assets/icons/ic_loading_gray.svg" class="asowp-w-5 asowp-w-5" v-if="isLoading" :disabled="isLoading"/>
                        <div class="asowp-font-semibold asowp-text-[16px]">Save</div>
                    </button>
                </div>
            </div>
            
        </div>
        <!-- Delete Modal-->
        <div v-if="openModal" @click.self="closeModal" class="asowp-bg-gray-400 asowp-overflow-y-auto asowp-overflow-x-hidden asowp-fixed asowp-top-0 asowp-right-[25%] asowp-left-[75%] asowp-z-[999] asowp-flex asowp-justify-center asowp-items-center asowp-w-full md:asowp-inset-0 asowp-h-full">
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
                        <h3 class="asowp-mb-5 asowp-text-lg asowp-font-normal asowp-text-gray-500 dark:text-gray-400">Are you sure you want to delete this font?</h3>
                        <input v-model="font.label" readonly class="asowp-rounded asowp-w-full asowp-h-[35px] asowp-text-center asowp-p-4 asowp-my-2 asowp-border-none" />
                        <button @click="deleteFont" data-modal-hide="popup-modal" type="button" :class="`asowp-border-solid asowp-text-white ${!isLoading ? 'asowp-bg-red-600 asowp-cursor-pointer' :'asowp-bg-red-700 asowp-cursor-not-allowed'} hover:bg-red-800 focus:ring-4 focus:outline-none asowp-my-2 asowp-border-none  focus:ring-red-300 dark:focus:ring-red-800 asowp-font-medium asowp-rounded-lg asowp-text-sm asowp-inline-flex asowp-items-center asowp-px-5 asowp-py-2.5 asowp-text-center`">
                            <img src="../../../../assets/icons/ic_loading_gray.svg" class="asowp-w-5 asowp-w-5" v-if="isLoading" :disabled="isLoading"/>
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
    import Multiselect from '@vueform/multiselect'
    import api from "@/admin/Api/api";
    import { onMounted, ref } from "vue";
    import toastMessage from '@/admin/utils/functions';

    const openModal = ref(false);
    const listFont = ref(true);
    const createFont = ref(false);
    const fonts = ref([]);
    const noFontsFound = ref('');
    const isFetching = ref(false);
    const allGoogleFonts = ref([]);
    const selectedGoogleFont = ref({});
    const emptyFontLabel = ref(false)
    const isEdit = ref(false);
    const isLoading = ref(false);
    const fontId = ref(null)
    const font = ref({
        label:"",
        url:"",
        isGoogleFont:true
    })

    onMounted( async()=>{
        isFetching.value = true;
        await fetchFonts();
        await getGoogleFonts();
        isFetching.value = false;
    });
    const fetchFonts = async () => {
        const result = await api.getManagefonts();
        if(!result.message) {
            fonts.value = result
        }else{
            fonts.value = [];
            noFontsFound.value = result.message;
        }
    }
    const getGoogleFonts = async () => {
        const data = await api.getGoogleFonts();
        allGoogleFonts.value = data.map(item => {
            return {
                name: item.family,
                value: Object.keys(item.files).map(key => {
                    return {
                        name: key,
                        value: item.files[key],
                        label:item.family
                    }
                })
            }
        });
    }

    const uploadFontFile = (e) => { 
        e.preventDefault();
        var uploader = wp.media(
            {
                title: 'Please set the tff fonts file',
                button: {
                    text: "Select font"
                },
                multiple: false
            }
        )
        .on(
            'select',
            function () {
                var selection = uploader.state().get( 'selection' );
                selection.map(
                    function (attachment) {
                        attachment = attachment.toJSON();
                        if(isFontType(attachment.url)){
                            font.value.label =attachment.name;
                            font.value.url=attachment.url;
                        }else{
                            toastMessage("Sorry, ASO does not support woff or woff2 fonts. You can convert your font to one of these formats ttf or otf","warning");
                        }
                    }
                );
            }
        )
        .open();
    }

    const closeModal = () => {
        openModal.value = !openModal.value;
    }
    const addNewFont = async () => {
        isLoading.value = true;
        if(font.value.label.trim() == ''){
            emptyFontLabel.value = true;
            isLoading.value = false;
            toastMessage("Label must not be empty","warning");
        }else{
            emptyFontLabel.value = false;
            const result = await api.addManagefont({many:false,font:font.value});
            if(result.success){
                await fetchFonts();
                isLoading.value = false;
                createFont.value = false;
                toastMessage(result.message);
                font.value = {
                    label:"",
                    url:"",
                    isGoogleFont:true
                }
            }else{
                isLoading.value = false;
                createFont.value = false;
                font.value = {
                    label:"",
                    url:"",
                    isGoogleFont:true
                }
                toastMessage(result.message,"error");
            }
        }
    }

    const selectedFont = (key, ft,isdelete=false) =>{
        fontId.value = key;
        font.value = ft;
        if(!isdelete){
            isEdit.value = true;
            addFont();
        }else{
            closeModal();
        }
        
    }

    const deleteFont = async () => {
        isLoading.value=true;
        const result = await api.deleteManagefont(fontId.value);
        if(result.success){
            await fetchFonts();
            isLoading.value = false;
            closeModal();
            toastMessage(result.message);
            isEdit.value = false;
            createFont.value = false;
            font.value = {
                label:"",
                url:"",
                isGoogleFont:true
            }
        }else{
            isLoading.value = false;
            closeModal();
            toastMessage(result.message,"error")
            createFont.value = false;
            font.value = {
                label:"",
                url:"",
                isGoogleFont:true
            }
        }
    }

    const updateFont = async () => {
        isLoading.value = true;
        if(font.value.label.trim() == ''){
            emptyFontLabel.value = true;
            isLoading.value = false;
            toastMessage("Label must not be empty","warning");
        }else{
            emptyFontLabel.value = false;
            const result = await api.updateManagefont(fontId.value,font.value);
            if(result.success){
                await fetchFonts(); isEdit.value = false;
                isLoading.value = false;
                createFont.value = false;
                isEdit.value = false;
                fontId.value = null;
                if(result.success == true){
                    toastMessage(result.message);
                }else{
                    toastMessage(result.message,"warning")
                }
                
                font.value = {
                    label:"",
                    url:"",
                    isGoogleFont:true
                }
               
            }else{
                isLoading.value = false;
                createFont.value = false;
                isEdit.value = false;
                fontId.value = null;
                toastMessage(result.message,"error")
                font.value = {
                    label:"",
                    url:"",
                    isGoogleFont:true
                }

            }
        }
    }

    const isFontType = (url) => {
        const fontsType = ['ttf', 'otf'];
        const extension = url.split('.').pop().toLowerCase();
        return fontsType.includes(extension);
    }

    const addFont = () => {
        listFont.value = (false);
        createFont.value = (true);
    }
    const back = () => {
        isEdit.value = false;
        fontId.value = null;
        createFont.value = (false);
    }

    const isCheckbox = ref(true);

  </script>
   