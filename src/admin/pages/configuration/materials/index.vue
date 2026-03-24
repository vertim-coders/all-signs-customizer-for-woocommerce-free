<template>
    <div class="asowp-py-10 asowp-w-full">
        <div v-if="!isNewComponent">
            <div class="asowp-sticky asowp-top-[80px] asowp-z-[999]">
                <div class="asowp-bg-white asowp-border-solid asowp-border-2 asowp-rounded-[10px] asowp-p-2 asowp-border-[#D1D1D1] asowp-flex asowp-text-[16px] asowp-space-x-1 asowp-px-4 asowp-pt-4 asowp-pb-2 ">
                    <div  v-if="config.trim() != ''" class="asowp-font-bold">
                        {{config}}
                    </div>
                    <img  v-if="config.trim() != ''" class="asowp-w-4 asowp-h-4 asowp-py-1" src="../../../../../assets/icons/ic_crochet.svg" alt="">
                    <div v-if="config.trim() != ''" >
                        {{ __('Material', 'all-signs-options-pro') }}
                    </div>
                </div>
            </div>
            <div class="asowp-bg-white asowp-translate-y-4 asowp-border-solid asowp-border-2 asowp-rounded-[10px] asowp-p-2 asowp-border-[#D1D1D1]">
                <div v-if="!isFetching" class="asowp-translate-y-4 asowp-flex asowp-justify-end asowp-items-center asowp-space-x-2 asowp-bg-[#F8F9FB] asowp-pb-4 asowp-py-4">
                
                <div class="asowp-w-1/4">
                    <button class="asowp-flex asowp-w-fit asowp-h-[fit] asowp-rounded asowp-bg-[#016464] asowp-px-4 asowp-space-x-2 asowp-p-1.5 asowp-border-none asowp-text-white asowp-opacity-90 hover:asowp-opacity-100 asowp-cursor-pointer" @click="addComponent">
                        <svg class="asowp-w-5 asowp-h-5" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g id="plus-lg">
                            <path id="Vector" fill-rule="evenodd" clip-rule="evenodd" d="M11 2.75C11.1823 2.75 11.3572 2.82243 11.4861 2.95136C11.6151 3.0803 11.6875 3.25516 11.6875 3.4375V10.3125H18.5625C18.7448 10.3125 18.9197 10.3849 19.0486 10.5139C19.1776 10.6428 19.25 10.8177 19.25 11C19.25 11.1823 19.1776 11.3572 19.0486 11.4861C18.9197 11.6151 18.7448 11.6875 18.5625 11.6875H11.6875V18.5625C11.6875 18.7448 11.6151 18.9197 11.4861 19.0486C11.3572 19.1776 11.1823 19.25 11 19.25C10.8177 19.25 10.6428 19.1776 10.5139 19.0486C10.3849 18.9197 10.3125 18.7448 10.3125 18.5625V11.6875H3.4375C3.25516 11.6875 3.0803 11.6151 2.95136 11.4861C2.82243 11.3572 2.75 11.1823 2.75 11C2.75 10.8177 2.82243 10.6428 2.95136 10.5139C3.0803 10.3849 3.25516 10.3125 3.4375 10.3125H10.3125V3.4375C10.3125 3.25516 10.3849 3.0803 10.5139 2.95136C10.6428 2.82243 10.8177 2.75 11 2.75Z" fill="white"/>
                            </g>
                        </svg>
                        <div class="asowp-text-[14px]">
                            {{ __('Add new Material', 'all-signs-options-pro') }}
                        </div>
                    </button>
                </div>
            </div>
            <!-- Table which display all materials -->
            <div class="asowp-w-full asowp-overflow-x-auto">
                <div class="asowp-overflow-hidden asowp-w-full">
                    <div class="asowp-grid asowp-grid-cols-5 asowp-justify-center asowp-items-center asowp-p-4 asowp-text-sm asowp-font-medium asowp-text-gray-900 asowp-bg-gray-100 asowp-border-t asowp-border-b asowp-border-gray-200 asowp-gap-x-16">
                        <div class="asowp-flex asowp-items-center asowp-justify-center">{{ __('Material Name', 'all-signs-options-pro') }}</div>
                        <div class="asowp-flex asowp-items-center asowp-justify-center">{{ __('Description', 'all-signs-options-pro') }}</div>
                        <div class="asowp-flex asowp-items-center asowp-justify-center">{{ __('Icon', 'all-signs-options-pro') }}</div>
                        <div class="asowp-flex asowp-items-center asowp-justify-center">{{ __('Behavior (type)', 'all-signs-options-pro') }}</div>
                        <div class="asowp-flex asowp-items-center asowp-justify-center">{{ __('Actions', 'all-signs-options-pro') }}</div>
                    </div>
                    
                    <div v-if="isFetching" class="asowp-bg-white asowp-border-solid asowp-border asowp-border-[#D1D1D1] asowp-flex asowp-flex-col asowp-space-y-2 asowp-justify-center asowp-items-center asowp-w-full asowp-h-[306px] p-4">
                        <img class="asowp-w-[200px] asowp-h-[200px]" src="../../../../../assets/icons/ic_loading.svg" alt="">
                    </div>
                    <div v-if="materials.length == 0 && !isFetching" class="asowp-bg-white asowp-border-solid asowp-border asowp-border-[#D1D1D1] asowp-flex asowp-flex-col asowp-space-y-12 asowp-justify-center asowp-items-center asowp-py-10 asowp-h-[306px]">
                        <div class="asowp-flex asowp-flex-col asowp-space-y-2 asowp-justify-center asowp-items-center">
                            <p class="asowp-text-2xl asowp-font-bold">{{notFoundMessage}}</p>
                        </div>
                    </div>
                    <div v-for="(material,key) in materials" :key="key" class="asowp-cursor-pointer asowp-grid asowp-items-center asowp-bg-white asowp-grid-cols-5 asowp-px-4 asowp-py-3 asowp-text-sm asowp-text-gray-700 asowp-border-b-1 asowp-border-t-0 asowp-border-l-0 asowp-border-r-0 asowp-border-solid asowp-border-gray-200 asowp-gap-x-16">
                        <div class="asowp-text-gray-500 dark:asowp-text-gray-400 asowp-overflow-hidden asowp-flex asowp-pl-4 asowp-whitespace-nowrap asowp-text-ellipsis asowp-space-x-4">
                            <span class="asowp-w-5 asowp-h-5 asowp-p-1 asowp-px-1 asowp-flex asowp-justify-center asowp-items-center asowp-rounded-full asowp-bg-[#f0f0f1] asowp-border asowp-border-solid asowp-border-black ">
                                
                                <span class="asowp-text-[12px]">{{getInitials(material.name)}}</span> 
                            </span>
                            <span class="asowp-flex asowp-justify-center asowp-items-center">{{ material.name }}</span>
                        </div>
                        <div class="asowp-text-gray-500 dark:asowp-text-gray-400 asowp-flex asowp-justify-center asowp-items-center asowp-overflow-hidden asowp-whitespace-nowrap asowp-text-ellipsis">{{material.description}}</div>
                        <div class="asowp-text-gray-500 dark:asowp-text-gray-400 asowp-flex asowp-justify-center asowp-items-center">
                            <img class="asowp-w-10 asowp-h-10 asowp-rounded" :src="material.icon" alt="" v-if="material.icon!=''">
                        </div>
                        <div class="asowp-text-gray-500 dark:asowp-text-gray-400 asowp-flex asowp-justify-center asowp-items-center">
                            <span :class="`asowp-w-fit asowp-rounded-lg asowp-p-1 asowp-text-[12px] asowp-text-center asowp-px-2 ${material.type == 'simple' ? 'asowp-bg-[#EEF5FF] asowp-text-black' :'asowp-bg-[#9ACD321F] asowp-text-[#466801]'} asowp-border-none`">
                                {{material.type}}
                            </span>
                        </div>
                        <div class="asowp-flex asowp-space-x-[1.5px] asowp-justify-center asowp-items-center asowp-text-gray-500 dark:asowp-text-gray-400">
                            <button class="asowp-bg-[#FFC7D8] asowp-p-2 asowp-rounded-md asowp-border-none asowp-cursor-pointer asowp-space-x-1 asowp-flex" @click="redirectToMaterial(key,material.name,material.type)">
                                <img class="asowp-w-4 asowp-h-4" src="../../../../../assets/icons/ic_manage.svg" alt="">
                                <span class="asowp-text-[12px]">
                                    {{ __('Manage', 'all-signs-options-pro') }}
                                </span>
                            </button>
                            <button class="asowp-bg-transparent asowp-border-none asowp-text-[#2DD05B] asowp-cursor-pointer"  @click="selectMaterialEdit(material,key)">
                                <img class="asowp-w-5 asowp-h-5" src="../../../../../assets/icons/ic_edit.svg" alt="">
                            </button>
                            
                            <div class="asowp-bg-white asowp-relative">
                                <button class="asowp-bg-transparent asowp-border-none asowp-cursor-pointer" @click.stop="handleOpenMaterialParams(key)">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="asowp-w-6 asowp-rotate-90 asowp-h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                                    </svg>
                                </button>
                                <div class="asowp-bg-white asowp-shadow-md asowp-flex asowp-justify-center asowp-items-center asowp-space-x-2 asowp-p-2 asowp-absolute asowp-top-full asowp-mt-2 asowp-z-[999] asowp-right-0 asowp-rounded" v-if="showParams[key]" @click.stop>
                                    <button class="asowp-bg-transparent asowp-border-none asowp-text-[#FF6600] asowp-cursor-pointer"  @click="() => { showParams[key] = false; selectCloneMaterial(material) }">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="asowp-w-6 asowp-h-6">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" />
                                        </svg>
                                    </button>
                                    <button class="asowp-bg-transparent asowp-border-none asowp-text-[#A00000] asowp-cursor-pointer"  @click="() => { showParams[key] = false; selectMaterialDelete(key, material.name) }">
                                        <img class="asowp-w-5 asowp-h-5" src="../../../../../assets/icons/ic_delete.svg" alt="">
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
        <div class="asowp-space-y-0.5" v-if="isNewComponent">
            <div class="asowp-bg-white asowp-border-solid asowp-border-2 asowp-rounded-[10px] asowp-p-2 asowp-border-[#D1D1D1] asowp-flex asowp-text-[16px] asowp-space-x-1 asowp-px-4 asowp-py-4">
                <div  v-if="config.trim() != ''" class="asowp-font-bold asowp-text-[16px]">
                    {{config}}
                </div>
                <img class="asowp-w-4 asowp-h-4 asowp-py-1" src="../../../../../assets/icons/ic_crochet.svg" alt="">
                <div class="asowp-text-[16px]">
                    {{__("Material", "all-signs-options-pro")}}
                </div>
            </div>
            <div class="asowp-translate-y-2 asowp-bg-white asowp-border-solid asowp-border-2 asowp-rounded-[10px] asowp-p-2 asowp-border-[#D1D1D1]">
                <div class="asowp-text-[16px] asowp-font-bold asowp-px-4 asowp-py-4">
                    {{ __('Add material', 'all-signs-options-pro') }}
                </div>
                <hr class="Polaris-Divider asowp-w-full" style="border: 1px solid #ebebeb;">
                <div class="asowp-px-4 asowp-py-4 asowp-space-y-6">
                    <div class="asowp-flex asowp-space-x-2 asowp-justify-between">
                        <div class="asowp-w-[50%] asowp-flex asowp-flex-col asowp-space-y-2 asowp-text-[14px]">
                            <label for="" class="asowp-font-normal">{{ __('Material name', 'all-signs-options-pro') }} <span class="asowp-text-red-500">*</span></label>
                            <input type="text" v-model="newMaterial.name" :class="`${emptyLabel?'asowp-field-required':''} asowp-rounded asowp-w-full asowp-h-[35px]`" style="border-radius: 10px !important;">
                        </div>
                        <div class="asowp-w-[50%] asowp-flex asowp-flex-col asowp-space-y-2 asowp-text-[14px]">
                            <label for="" class="asowp-font-normal">{{ __('Description', 'all-signs-options-pro') }}</label>
                            <input type="text" v-model="newMaterial.description" class="asowp-rounded asowp-w-full asowp-h-[35px]" style="border-radius: 10px !important;">
                        </div>
                    </div>
                    <div class="asowp-flex asowp-space-x-2 asowp-justify-between">
                        <div class="asowp-w-[50%] asowp-flex asowp-flex-col asowp-space-y-2 asowp-text-[12px]">
                            <label for="" class="asowp-font-normal">{{ __('Upload icon', 'all-signs-options-pro') }}</label>
                            <div class="asowp-flex asowp-flex-col asowp-space-y-2 asowp-w-full asowp-pt-2">
                                <div class="asowp-flex asowp-space-x-2 asowp-border asowp-border-solid asowp-border-[#000] asowp-rounded-[5px] asowp-p-1">
                                    <button @click="selectMaterialIcon" class="asowp-bg-[#016464] asowp-border-none asowp-w-fit asowp-h-fit asowp-p-2 asowp-rounded asowp-px-4 asowp-text-white asowp-opacity-90 hover:asowp-opacity-100 asowp-text-[10px] asowp-cursor-pointer">{{ __('upload PopupImg', 'all-signs-options-pro') }}</button>
                                    <div :class="`asowp-relative asowp-w-[82px] asowp-h-[30px] asowp-rounded-md asowp-overflow-hidden`">
                                        <img v-if="newMaterial.icon != ''" :src="newMaterial.icon" alt="" class="asowp-absolute asowp-w-full asowp-h-full">
                                        <button v-if="newMaterial.icon != ''" @click="()=>{newMaterial.icon = ''}" :class="`asowp-bg-[#016464] asowp-absolute asowp-bottom-0 asowp-right-0 asowp-text-white asowp-p-1 asowp-rounded-tl-lg asowp-border-none`">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="asowp-w-4 asowp-h-4">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="asowp-w-[50%] asowp-flex asowp-flex-col asowp-space-y-2 asowp-text-[12px]">
                            <label for="" class="asowp-font-normal">{{ __('Upload PopupImg', 'all-signs-options-pro') }}</label>
                            <div class="asowp-flex asowp-flex-col asowp-space-y-2 asowp-w-full asowp-pt-2">
                                <div class="asowp-flex asowp-space-x-2 asowp-border asowp-border-solid asowp-border-[#000] asowp-rounded-[5px] asowp-p-1">
                                    <button @click="closeTnymceModal" class="asowp-bg-[#016464] asowp-border-none asowp-w-fit asowp-h-fit asowp-p-2 asowp-rounded asowp-px-4 asowp-text-white asowp-opacity-90 hover:asowp-opacity-100 asowp-text-[10px] asowp-cursor-pointer">{{ __('Pop For Image', 'all-signs-options-pro') }}</button>
                                    <!-- <div :class="`asowp-relative asowp-w-[82px] asowp-h-[49px] asowp-rounded-md asowp-overflow-hidden`">
                                        <img v-if="newMaterial.popImg != ''" :src="newMaterial.popImg" alt="" class="asowp-absolute asowp-w-full asowp-h-full">
                                        <button v-if="newMaterial.popImg != ''" @click="()=>{newMaterial.popImg = ''}" :class="`asowp-bg-[#016464] asowp-absolute asowp-bottom-0 asowp-right-0 asowp-text-white asowp-p-1 asowp-rounded-tl-lg asowp-border-none`">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="asowp-w-4 asowp-h-4">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                            </svg>
                                        </button>
                                    </div> -->
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="asowp-space-y-2 asowp-pt-2 asowp-flex asowp-flex-col">
                        <label for="" class="asowp-font-bold">{{ __('Type', 'all-signs-options-pro') }}</label>
                        <input
                            disabled
                            :value="enforcedMaterialType === 'advance' ? __('Advance', 'all-signs-options-pro') : __('Simple', 'all-signs-options-pro')"
                            class="asowp-w-full asowp-h-[35px] asowp-font-normal asowp-bg-gray-100"
                            style="border-radius: 10px !important;"
                        />
                    </div>
                </div>
                <hr class="Polaris-Divider asowp-w-full" style="border: 1px solid #ebebeb;">
                <div class="asowp-flex asowp-space-x-4 asowp-px-4 asowp-py-4 asowp-justify-end asowp-items-end">
                    <div class="asowp-bg-[#016464] asowp-rounded">
                        <button :disabled="isLoading" class="asowp-flex asowp-bg-transparent asowp-w-fit asowp-space-x-2 asowp-h-fit asowp-px-8 asowp-p-2 asowp-border-none asowp-text-white asowp-opacity-90 hover:asowp-border-none hover:asowp-text-white hover:asowp-opacity-100 asowp-cursor-pointer" @click="back">
                            <svg class="asowp-w-6 asowp-h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 12L5 8V11L17.17 11C17.3756 10.414 17.7586 9.90661 18.2657 9.54821C18.7729 9.18981 19.379 8.9982 20 9C20.7956 9 21.5587 9.31607 22.1213 9.87868C22.6839 10.4413 23 11.2044 23 12C23 12.7956 22.6839 13.5587 22.1213 14.1213C21.5587 14.6839 20.7956 15 20 15C18.69 15 17.58 14.17 17.17 13L5 13V16L1 12Z" fill="currentColor"/>
                            </svg>

                            <div class="asowp-font-semibold asowp-text-[16px]">{{ __('Back', 'all-signs-options-pro') }}</div>
                        </button>
                    </div>
                    <div class="asowp-bg-[#016464] asowp-rounded" v-if="isEdit">
                        <button @click="updateMaterial" :class="`asowp-rounded asowp-flex ${!isLoading ? 'asowp-bg-amber-400 ' :'asowp-bg-amber-500'} asowp-w-fit asowp-space-x-2 asowp-h-fit asowp-px-8 asowp-text-white asowp-p-2 asowp-border-none asowp-opacity-90 hover:asowp-border-none hover:asowp-text-white hover:asowp-opacity-100 asowp-cursor-pointer`">
                            <img src="../../../../../assets/icons/ic_loading_gray.svg" class="asowp-w-5 asowp-w-5" v-if="isLoading" :disabled="isLoading"/>
                            <div class="asowp-font-semibold asowp-text-[16px]">{{ __('Update', 'all-signs-options-pro') }}</div>
                        </button>
                    </div>
                    <div class="asowp-bg-[#016464] asowp-rounded" v-if="!isEdit">
                        <button @click="addNewMaterial" class="asowp-flex asowp-bg-transparent asowp-w-fit asowp-space-x-2 asowp-h-fit asowp-text-white  asowp-px-12 asowp-p-2.5 asowp-border-none asowp-opacity-90 hover:asowp-border-none hover:asowp-text-white hover:asowp-opacity-100 asowp-cursor-pointer">
                            <img src="../../../../../assets/icons/ic_loading_gray.svg" class="asowp-w-5 asowp-w-5" v-if="isLoading" :disabled="isLoading"/>
                            <div class="asowp-font-semibold asowp-text-[16px]">{{ __('Save', 'all-signs-options-pro') }}</div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <!-- Delete Modal-->
        <div v-if="openModal" @click.self="closeModal" class="asowp-bg-gray-400 asowp-overflow-y-auto asowp-overflow-x-hidden asowp-fixed asowp-top-0 asowp-right-[25%] asowp-left-[75%] asowp-z-[999] asowp-flex asowp-justify-center asowp-items-center asowp-w-full md:asowp-inset-0 asowp-h-full asowp-z-[999]">
            <div class="asowp-relative asowp-p-4 asowp-w-full asowp-max-w-md asowp-max-h-full">
                <div class="asowp-relative asowp-bg-white asowp-rounded-lg asowp-shadow dark:bg-gray-700">
                    <button @click.stop="closeModal" type="button" :class="`${isLoading ? 'asowp-cursor-not-allowed' : 'asowp-cursor-pointer'} asowp-border-solid asowp-absolute asowp-top-3 asowp-end-2.5 asowp-text-gray-400 asowp-bg-transparent hover:bg-gray-200 hover:text-gray-900 asowp-rounded-lg asowp-text-sm asowp-w-8 asowp-h-8 asowp-ms-auto asowp-inline-flex asowp-justify-center asowp-items-center dark:hover:bg-gray-600 dark:hover:text-white`" data-modal-hide="popup-modal">
                        <svg class="asowp-w-3 asowp-h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                        <span class="asowp-sr-only">{{__("Close modal", "all-signs-options-pro")}}</span>
                    </button>
                    <div class="asowp-p-4 md:p-5 asowp-text-center">
                        <svg class="asowp-mx-auto asowp-mb-4 asowp-text-gray-400 asowp-w-12 asowp-h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                        </svg>
                        <h3 class="asowp-mb-5 asowp-text-lg asowp-font-normal asowp-text-gray-500 dark:text-gray-400">Are you sure you want to delete this configuration?</h3>
                        <input v-model="deleteMaterial.name" readonly class="asowp-rounded asowp-w-full asowp-h-[35px] asowp-text-center asowp-p-4 asowp-my-2 asowp-border-none" />
                        <button @click="delMaterial" data-modal-hide="popup-modal" type="button" :class="`asowp-border-solid asowp-text-white ${!isLoading ? 'asowp-bg-red-600 asowp-cursor-pointer' :'asowp-bg-red-700 asowp-cursor-not-allowed'} hover:bg-red-800 focus:ring-4 focus:outline-none asowp-my-2 asowp-border-none  focus:ring-red-300 dark:focus:ring-red-800 asowp-font-medium asowp-rounded-lg asowp-text-sm asowp-inline-flex asowp-items-center asowp-px-5 asowp-py-2.5 asowp-text-center`">
                            <img src="../../../../../assets/icons/ic_loading_gray.svg" class="asowp-w-5 asowp-w-5" v-if="isLoading" :disabled="isLoading"/>
                            {{__("Yes, I'm sure", "all-signs-options-pro")}}
                        </button>
                        <button @click.stop="closeModal" data-modal-hide="popup-modal" type="button" :class="`asowp-border-solid asowp-py-2.5 asowp-px-5 asowp-ms-3 asowp-text-sm asowp-font-medium asowp-text-gray-900 asowp-my-2  asowp-border-gray-500 asowp-border-white focus:outline-none asowp-bg-white asowp-rounded-lg asowp-border asowp-border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 ${isLoading ? 'asowp-cursor-not-allowed' : 'asowp-cursor-pointer'}`">{{__("No, cancel", "all-signs-options-pro")}}</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- Clone Modal-->
        <div v-if="openCloneModal" @click.self="closeCloneModal" class="asowp-z-[999] asowp-bg-gray-400 asowp-overflow-y-auto asowp-overflow-x-hidden asowp-fixed asowp-top-0 asowp-right-[25%] asowp-left-[75%]  asowp-flex asowp-justify-center asowp-items-center asowp-w-full md:asowp-inset-0 asowp-h-full">
            <div class="asowp-relative asowp-p-4 asowp-w-full asowp-max-w-md asowp-max-h-full">
                <div class="asowp-relative asowp-bg-white asowp-rounded-lg asowp-shadow dark:bg-gray-700">
                    <button @click.stop="closeCloneModal" type="button" :class="`${isLoading ? 'asowp-cursor-not-allowed' : 'asowp-cursor-pointer'} asowp-absolute asowp-top-3 asowp-end-2.5 asowp-text-gray-400 asowp-bg-transparent hover:bg-gray-200 hover:text-gray-900 asowp-rounded-lg asowp-text-sm asowp-w-8 asowp-h-8 asowp-ms-auto asowp-inline-flex asowp-justify-center asowp-items-center dark:hover:bg-gray-600 dark:hover:text-white`" data-modal-hide="popup-modal">
                        <svg class="asowp-w-3 asowp-h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                        <span class="asowp-sr-only">{{__("Close modal", "all-signs-options-pro")}}</span>
                    </button>
                    <div class="asowp-p-4 md:p-5 asowp-text-center">
                        <svg class="asowp-mx-auto asowp-mb-4 asowp-text-gray-400 asowp-w-12 asowp-h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                        </svg>
                        <h3 class="asowp-mb-5 asowp-text-lg asowp-font-normal asowp-text-gray-500 dark:text-gray-400">Give the name of the new material, which will be an imitation of the current one.</h3>
                        <input v-model="newMaterial.name" class="asowp-rounded asowp-w-full asowp-h-[35px] asowp-text-start asowp-p-4 asowp-my-2 asowp-border-solid asowp-border-gray-400" />
                        <button @click="addNewMaterial" data-modal-hide="popup-modal" type="button" :class="`asowp-border-solid asowp-text-white ${!isLoading ? 'asowp-bg-[#016464] asowp-cursor-pointer' :'asowp-bg-[#016464] asowp-cursor-not-allowed'} hover:bg-red-800 focus:ring-4 focus:outline-none asowp-my-2 asowp-border-none  focus:ring-red-300 dark:focus:ring-red-800 asowp-font-medium asowp-rounded-lg asowp-text-sm asowp-inline-flex asowp-items-center asowp-px-5 asowp-py-2.5 asowp-text-center`">
                            <img src="../../../../../assets/icons/ic_loading_gray.svg" class="asowp-w-5 asowp-w-5" v-if="isLoading" :disabled="isLoading"/>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="asowp-w-5 asowp-w-5" v-if="!isLoading">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                            </svg>
                            {{__("Clone", "all-signs-options-pro")}}
                        </button>
                        <button @click.stop="closeCloneModal" data-modal-hide="popup-modal" type="button" :class="`asowp-border-solid asowp-py-2.5 asowp-px-5 asowp-ms-3 asowp-text-sm asowp-font-medium asowp-text-gray-900 asowp-my-2  asowp-border-gray-500 asowp-border-white focus:outline-none asowp-bg-white asowp-rounded-lg asowp-border asowp-border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 ${isLoading ? 'asowp-cursor-not-allowed' : 'asowp-cursor-pointer'}`">{{__("Cancel", "all-signs-options-pro")}}</button>
                    </div>
                </div>
            </div>
        </div> 
    </div>
    <div v-show="openTnyMce" @click.self="closeTnymceModal" class="asowp-z-[999] asowp-bg-gray-400 asowp-overflow-y-auto asowp-overflow-x-hidden asowp-fixed asowp-top-0 asowp-right-[25%] asowp-left-[75%]  asowp-flex asowp-justify-center asowp-items-center asowp-w-full md:asowp-inset-0 asowp-h-full asowp-h-full">
        <div class="asowp-relative asowp-top-[50px] asowp-p-4 asowp-w-full asowp-max-w-[60%] asowp-max-h-fit">
            <div class="asowp-relative asowp-bg-white asowp-rounded-lg asowp-shadow dark:bg-gray-700 asowp-px-4">
                <div class="asowp-px-[10px] asowp-pt-[5px]">
                    <!-- <Editor
                        api-key="02v0ot513pkt9cwnhg3l36u9l13l91z8ux5oyf24nnqlp12j"
                        :init="{
                            toolbar_mode: 'sliding',
                            plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate mentions tableofcontents footnotes mergetags autocorrect typography inlinecss markdown',
                            toolbar: 'undo redo | blocks fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                            ai_request: (request, respondWith) => respondWith.string(() => Promise.reject('See docs to implement AI Assistant')),
                        }"
                        v-model="newMaterial.popImg"
                    /> -->
                    <textarea name="" id="asowp-admin-tinymce" cols="30" rows="10"></textarea>
                    <div class="asowp-p-4 md:p-5 asowp-text-center">
                        <button @click="savePopImg" data-modal-hide="popup-modal" type="button" :class="`asowp-border-solid asowp-text-white ${!isLoading ? 'asowp-bg-[#016464] asowp-cursor-pointer' :'asowp-bg-[#016464] asowp-cursor-not-allowed'} hover:asowp-bg-[#016464] focus:ring-4 focus:outline-none asowp-my-2 asowp-border-none  focus:ring-red-300 dark:focus:ring-red-800 asowp-font-medium asowp-rounded-lg asowp-text-sm asowp-inline-flex asowp-items-center asowp-px-5 asowp-py-2.5 asowp-text-center`">
                            <img src="../../../../../assets/icons/ic_loading_gray.svg" class="asowp-w-5 asowp-w-5" v-if="isLoading" :disabled="isLoading"/>
                            {{__("Save", "all-signs-options-pro")}}
                        </button>
                        <button @click.stop="closeTnymceModal" data-modal-hide="popup-modal" type="button" :class="`asowp-border-solid asowp-py-2.5 asowp-px-5 asowp-ms-3 asowp-text-sm asowp-font-medium asowp-text-gray-900 asowp-my-2  asowp-border-gray-500 asowp-border-white focus:outline-none asowp-bg-white asowp-rounded-lg asowp-border asowp-border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 ${isLoading ? 'asowp-cursor-not-allowed' : 'asowp-cursor-pointer'}`">{{__("No, cancel", "all-signs-options-pro")}}</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script setup>
import api from '@/admin/Api/api';
import {onMounted, onBeforeUnmount, ref} from 'vue';
import { useRoute } from 'vue-router';
import toastMessage from '@/admin/utils/functions'
import router from '@/admin/router';

import { __, _x, _n, _nx, sprintf, setLocaleData } from "@wordpress/i18n";
const route = useRoute()
const configID = ref(route.params.configId)
const config =route.params.config.replace(/-/g,' ');
const enforcedMaterialType = ref('simple')
const materials = ref([]);
const newMaterial = ref({
    name:"",
    description:"",
    icon:"",
    popImg:"",
    type:"simple",
});
const materialId = ref(0);
const isLoading = ref(false);
const isFetching = ref(false);
const isNewComponent = ref(false);
const isEdit = ref(false);
const openModal = ref(false);
const openCloneModal = ref(false);
const openTnyMce = ref(false)
const deleteMaterial = ref({
    id:null,
    name:""
});
const emptyLabel = ref(false);
const notFoundMessage = ref('');
const showParams = ref([]);
const tinymceEditorId = 'asowp-admin-tinymce';
const getTinyMCE = () => window.tinymce ?? null;
const getTinyMCEEditor = () => getTinyMCE()?.get(tinymceEditorId) ?? null;
const setTinyMCEContent = (content = '') => {
    const editor = getTinyMCEEditor();
    if (editor) {
        editor.setContent(content || '');
    }
};
const getTinyMCEContent = () => getTinyMCEEditor()?.getContent() ?? '';
const destroyTinyMCE = () => {
    const editor = getTinyMCEEditor();
    if (editor) {
        editor.remove();
    }
};
const initTinyMCE = (content = '') => {
    const editorApi = getTinyMCE();
    if (!editorApi) {
        return;
    }

    const existingEditor = getTinyMCEEditor();
    if (existingEditor) {
        existingEditor.setContent(content || '');
        return;
    }

    editorApi.init({
        selector: `#${tinymceEditorId}`,
        plugins: 'wordpress paste link image media',
        toolbar: 'undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image media | code| wp_adv',
        relative_urls: false,
        remove_script_host: false,
        convert_urls: true,
        height: 200,
        width: '100%',
        branding: false,
        setup: function(editor) {
            editor.on('init', function() {
                editor.setContent(content || '');
            });
        }
    });
};
const closeAllMaterialParams = () => {
    showParams.value = showParams.value.map(() => false);
};
const fetchMaterials = async () => {
    const result = await api.getMaterials(configID.value);
    if(!result.message){
        let tab=[];
        materials.value = result.map((m) => ({ ...m, type: enforcedMaterialType.value }))
        for (let index = 0; index < result.length; index++) {
            tab.push(false);
            
        }
        showParams.value = tab;
    }else{
        materials.value = [];
        notFoundMessage.value = result.message;
    }
    isFetching.value = false;
}
const handleOpenMaterialParams  = (key)=>{
    for (let index = 0; index < showParams.value.length; index++) {
       if(key!=index){
        showParams.value[index]=false;
       }else{
        showParams.value[key]=!showParams.value[key];
       }
    }
}
const getInitials = (str) => {
    const words = str.split(' ');
    const initials = words.map(word => word.trim().charAt(0).toUpperCase());
    const result = initials.join('');
    return result;
}

onMounted(async() => {
    document.addEventListener('click', closeAllMaterialParams);
    initTinyMCE();
    try {
        const cfg = await api.getConfig(configID.value)
        if (!cfg?.message && cfg?.materialType === 'advance') {
            enforcedMaterialType.value = 'advance'
        } else {
            enforcedMaterialType.value = 'simple'
        }
    } catch (e) {
        enforcedMaterialType.value = 'simple'
    }
    isFetching.value = true;
    await fetchMaterials();

});

onBeforeUnmount(() => {
    document.removeEventListener('click', closeAllMaterialParams);
    destroyTinyMCE();
});

/**Function for adding */

const addNewMaterial = async () => {
    newMaterial.value.type = enforcedMaterialType.value
    if(newMaterial.value.name.trim() !== ''){
        isLoading.value = true;
        const result = await api.addMaterial(configID.value,newMaterial.value);
        if(result.success){
            await fetchMaterials();
            isLoading.value = false;
            isNewComponent.value = false;
            newMaterial.value = {
                name:"",
                description:"",
                icon:"",
                popImg:"",
                type: enforcedMaterialType.value,
            }
            openCloneModal.value=false;
            toastMessage(result.message)
        }else{
            isLoading.value = false;
            isNewComponent.value = false;
            newMaterial.value = {
                name:"",
                description:"",
                icon:"",
                popImg:"",
                type: enforcedMaterialType.value,
            }
            openCloneModal.value=false;
            toastMessage(result.message,"error");
        }
    }else{
        emptyLabel.value = true;
        toastMessage("Label must not be empty","warning");
    }
}

/** Fonction for image selection */
const selectMaterialIcon = async(e) => { 
    e.preventDefault();
    var uploader = wp.media(
        {
            title: __("Select Material Icon", "all-signs-options-pro"),
            button: {
                text: __("Select Icon", "all-signs-options-pro")
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
                            newMaterial.value.icon = (attachment.url);
                        }
                    }
                );
            }
        )
        .open();
}
/* const selectMaterialPopImg = async(e) => { 
    e.preventDefault();
    var uploader = wp.media(
        {
            title: __("Select Material Pop Image", "all-signs-options-pro"),
            button: {
                text: __("Select Image", "all-signs-options-pro")
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
                            newMaterial.value.popImg = (attachment.url);
                        }
                    }
                );
            }
        )
        .open();
} */

/** Function for Editing */

const selectMaterialEdit = (material, id) => {
    materialId.value = id;
    newMaterial.value = JSON.parse(JSON.stringify(material));
    newMaterial.value.type = enforcedMaterialType.value
    isEdit.value = true;
    setTinyMCEContent(material.popImg)
    isNewComponent.value = true;
}
const selectCloneMaterial = (material)=> {
    newMaterial.value = JSON.parse(JSON.stringify(material));
    openCloneModal.value = true;
}

const closeTnymceModal = ()=>{
    openTnyMce.value = !openTnyMce.value;
    if (openTnyMce.value) {
        setTinyMCEContent(newMaterial.value.popImg);
    }
}
const savePopImg = ()=>{
    newMaterial.value.popImg = getTinyMCEContent();
    openTnyMce.value = false;
}


const updateMaterial = async () => {
    if(newMaterial.value.name.trim() !== ''){
        isLoading.value = true;
        emptyLabel.value = false;
        newMaterial.value.type = enforcedMaterialType.value
        const result = await api.updateMaterial(configID.value,materialId.value,newMaterial.value);
        if(result.success){
            await fetchMaterials();
            isLoading.value = false;
            isNewComponent.value = false;
            newMaterial.value = {
                name:"",
                description:"",
                icon:"",
                popImg:"",
                type: enforcedMaterialType.value,
            }
            
            isEdit.value = false;
            toastMessage(result.message);
        }else{
            isLoading.value = false;
            isNewComponent.value = false;
            newMaterial.value = {
                name:"",
                description:"",
                icon:"",
                popImg:"",
                type: enforcedMaterialType.value,
            }
            toastMessage(result.message,"error");
        }
    }else{
        emptyLabel.value = true;
        toastMessage(__("Label must not be empty", "all-signs-options-pro"), "warning");
    }
    
}

/** Function for deleting */
const selectMaterialDelete = (id, name) => {
    deleteMaterial.value = {id: id, name: name};
    closeModal();
}

const delMaterial = async () => {
    isLoading.value = true;
    const result = await api.deleteMaterial(configID.value,deleteMaterial.value.id);
    if(result.success){
        await fetchMaterials();
        isLoading.value =false;
        toastMessage(result.message)
    }else{
        isLoading.value =false;
        toastMessage(result.message,"error");
    }
    
    closeModal();
}

/** Modal Function */
const closeModal = ()=>{
    if(!isLoading.value){        
        openModal.value = !openModal.value;
    }
}
const closeCloneModal = ()=>{
    if(!isLoading.value){        
        openCloneModal.value = false;
        newMaterial.value = {
            name:"",
            description:"",
            icon:"",
            popImg:"",
            type: enforcedMaterialType.value,
        }
    }
}

const addComponent = () => {
    isNewComponent.value = true;
    //contentComponent.value = false;
    isEdit.value = false; // Ensure it's not in edit mode
    emptyLabel.value = false; // Clear any previous validation errors
    newMaterial.value = { // Reset newMaterial to empty values
        name:"",
        description:"",
        icon:"",
        popImg:"",
        type: enforcedMaterialType.value,
        data: {}
    };
}
const back = () => {
    isNewComponent.value = false;
    isEdit.value = false;
    emptyLabel.value = false;
    newMaterial.value = {
        name:"",
        description:"",
        icon:"",
        popImg:"",
        type: enforcedMaterialType.value,
    }
}

const redirectToMaterial = (materialId,material,type) => {
    const slugifiedMaterialName = material.replace(/ /g, '-'); // Slugify material name
    const slugifiedConfigName = config.replace(/ /g, '-'); // Slugify config name
    if(enforcedMaterialType.value === 'simple'){
        router.push('/configs/'+slugifiedConfigName+'/'+configID.value+'/materials/'+slugifiedMaterialName+'/'+materialId+'/simple/sizes');
    }else{
        router.push('/configs/'+slugifiedConfigName+'/'+configID.value+'/materials/'+slugifiedMaterialName+'/'+materialId+'/advance');
    }
}
  </script>
  
