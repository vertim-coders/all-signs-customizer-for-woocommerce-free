<template>
    <div class="asowp-mt-4">
        <!-- <div class="asowp-bg-white asowp-border-solid asowp-border-2 asowp-rounded-[10px] asowp-p-2 asowp-border-[#D1D1D1] asowp-text-[16px] asowp-space-x-1 asowp-px-4 asowp-py-4 asowp-flex">
            <div v-if="config.trim() != ''" class="asowp-font-bold">
                {{config}}
            </div>
            <img v-if="config.trim() != ''" class="asowp-w-4 asowp-h-4 asowp-py-1" src="../../../../../../../assets/icons/ic_crochet.svg" alt="">
            <div class="asowp-text-[16px] asowp-cursor-pointer" v-if="config.trim() != ''" @click="goToMaterials">
                {{ __("Material", "all-signs-options-pro") }}
            </div>
            <img v-if="material.trim() != ''" class="asowp-w-4 asowp-h-4 asowp-py-1" src="../../../../../../../assets/icons/ic_crochet.svg" alt="">
            <div class="asowp-text-[16px] asowp-cursor-pointer" v-if="material.trim() != ''" @click="()=>$router.push('/configs/'+slugify(config)+'/'+configId+'/materials/'+slugify(material)+'/'+materialId+'/advance')">
                {{material}}
            </div>
            <img v-if="componentName.trim()!=''" class="asowp-w-4 asowp-h-4 asowp-py-1" src="../../../../../../../assets/icons/ic_crochet.svg" alt="">
            <div  class="asowp-text-[16px] " v-if="componentName.trim()!=''">
                {{componentName}} <span class="asowp-font-bold">{{ __("(Advance)", "all-signs-options-pro") }}</span>
            </div>
            <img v-if="isNewOption" class="asowp-w-4 asowp-h-4 asowp-py-1" src="../../../../../../../assets/icons/ic_crochet.svg" alt="">
            <div v-if="isNewOption" class="asowp-text-[16px] ">
                {{ __("options", "all-signs-options-pro") }}
            </div>
        </div> -->
        <div class="asowp-translate-y-3 asowp-space-y-1 asowp-bg-white asowp-border-solid asowp-border-2 asowp-rounded-[10px] asowp-p-2 asowp-border-[#D1D1D1]" v-if="!isNewOption">
            <div class="asowp-flex asowp-justify-end asowp-space-x-2 asowp-w-4/4 asowp-bg-[#F8F9FB] asowp-text-[12px] asowp-px-4 asowp-py-4 asowp-pb-2">
                <button class="asowp-bg-transparent asowp-border-none asowp-text-[#016464] asowp-font-semibold asowp-cursor-pointer" @click="goBackToComponents">
                    {{ __("← Back to components", "all-signs-options-pro") }}
                </button>
                <button v-if="!isFetching" class="asowp-flex asowp-w-fit asowp-h-fit asowp-rounded asowp-bg-[#016464] asowp-px-4 asowp-space-x-2 asowp-p-1.5 asowp-border-none asowp-text-white asowp-opacity-90 hover:asowp-opacity-100 asowp-cursor-pointer" @click="openOptionForm">
                    <svg class="asowp-w-5 asowp-h-5" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="plus-lg">
                        <path id="Vector" fill-rule="evenodd" clip-rule="evenodd" d="M11 2.75C11.1823 2.75 11.3572 2.82243 11.4861 2.95136C11.6151 3.0803 11.6875 3.25516 11.6875 3.4375V10.3125H18.5625C18.7448 10.3125 18.9197 10.3849 19.0486 10.5139C19.1776 10.6428 19.25 10.8177 19.25 11C19.25 11.1823 19.1776 11.3572 19.0486 11.4861C18.9197 11.6151 18.7448 11.6875 18.5625 11.6875H11.6875V18.5625C11.6875 18.7448 11.6151 18.9197 11.4861 19.0486C11.3572 19.1776 11.1823 19.25 11 19.25C10.8177 19.25 10.6428 19.1776 10.5139 19.0486C10.3849 18.9197 10.3125 18.7448 10.3125 18.5625V11.6875H3.4375C3.25516 11.6875 3.0803 11.6151 2.95136 11.4861C2.82243 11.3572 2.75 11.1823 2.75 11C2.75 10.8177 2.82243 10.6428 2.95136 10.5139C3.0803 10.3849 3.25516 10.3125 3.4375 10.3125H10.3125V3.4375C10.3125 3.25516 10.3849 3.0803 10.5139 2.95136C10.6428 2.82243 10.8177 2.75 11 2.75Z" fill="white"/>
                        </g>
                    </svg>
                    <div class="asowp-text-[14px]">
                        {{ __("Add new option", "all-signs-options-pro") }}
                    </div>
                </button>
            </div>
            
            <div class="asowp-relative " id="monTableau">
                <table class="asowp-text-center asowp-border asowp-border-collapse asowp-border-0 asowp-w-full">
                    <thead class="asowp-bg-[#f0f0f1]">
                        <tr class="">
                            <th scope="col" class="asowp-px-6 asowp-py-3 asowp-text-[14px] asowp-font-semibold">
                                {{ __("Title", "all-signs-options-pro") }}
                            </th>
                            <th scope="col" class="asowp-px-6 asowp-py-3 asowp-text-[14px] asowp-font-semibold">
                                {{ __("Icons", "all-signs-options-pro") }}
                            </th>
                            <th scope="col" class="asowp-px-6 asowp-py-3 asowp-text-[14px] asowp-font-semibold">
                                {{ __("Size", "all-signs-options-pro") }}
                            </th>
                            <th scope="col" class="asowp-px-6 asowp-py-3 asowp-text-[14px] asowp-font-semibold">
                                {{ __("Color", "all-signs-options-pro") }}
                            </th>
                            <th scope="col" class="asowp-px-6 asowp-py-3 asowp-text-[14px] asowp-font-semibold">
                                {{ __("Default", "all-signs-options-pro") }}
                            </th>
                            <th scope="col" class="asowp-px-6 asowp-py-3 asowp-text-[14px] asowp-font-semibold">
                                {{ __("Action", "all-signs-options-pro") }}
                            </th>
                            
                        </tr>
                    </thead>
                    <tbody class="asowp-bg-white">
                        <tr v-if="isFetching">
                            <td colspan="6">
                                <div class="asowp-bg-white asowp-border-solid asowp-border asowp-border-[#D1D1D1] asowp-flex asowp-flex-col asowp-space-y-2 asowp-justify-center asowp-items-center asowp-w-full asowp-h-[200px] p-4">
                                    <img class="asowp-w-[100px] asowp-h-[100px]" src="../../../../../../../assets/icons/ic_loading.svg" alt="">
                                </div>
                            </td>
                        </tr>
                        <tr v-if="componentAdvance.options.length == 0 && !isFetching">
                            <td colspan="6">
                                <div class="asowp-bg-white asowp-border-solid asowp-border asowp-border-[#D1D1D1] asowp-flex asowp-flex-col asowp-space-y-12 asowp-justify-center asowp-items-center asowp-py-10 asowp-h-[150px]">
                                    <div class="asowp-flex asowp-flex-col asowp-space-y-2 asowp-justify-center asowp-items-center">
                                        <p class="asowp-text-2xl asowp-font-bold">{{noOptionsFound}}</p>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr v-for="(option,key) in componentAdvance.options" :key="key" class="asowp-border-t-0 asowp-border-l-0 asowp-border-r-0 asowp-border-b-2 asowp-border-solid asowp-border-[#f0f0f1]">
                            <td class="asowp-px-6 asowp-py-2 asowp-flex asowp-justify-center asowp-space-x-2">
                                
                                <span class="asowp-py-1 asowp-text-[14px]">
                                    {{option.name}}
                                </span>
                            </td>
                            <td class="asowp-px-6 asowp-justify-center asowp-translate-y-1">
                                <img class="asowp-w-8 asowp-h-8" :src="option.icon" alt="" v-if="option.icon.trim() != ''">
                            </td>
                            <td class="asowp-px-6 asowp-py-3 asowp-space-x-2">
                                <span class="asowp-w-fit asowp-rounded-lg asowp-text-center asowp-p-1 asowp-px-2 asowp-bg-[#9ACD321F] asowp-text-[#466801] asowp-border-none">
                                    {{option.size.width+'x'+option.size.height}}
                                </span>
                            </td>
                           <td class="asowp-text-[12px] asowp-px-6 asowp-py-2">
                                <span class="asowp-w-fit asowp-rounded-lg asowp-text-center asowp-px-2 asowp-p-1 asowp-bg-[#F8E7E7] asowp-text-[#EF5A35] asowp-border-none">
                                    {{option.color.name}}
                                </span>
                            </td>
                            <td class="asowp-pl-10 asowp-py-2">
                                <span class="asowp-w-fit asowp-flex asowp-items-center asowp-translate-x-5 asowp-translate-y-0.5">
                                    <label for="asowp-toggle" @click="!isLoading?selectDefault(key):''" class="asowp-cursor-pointer asowp-bg-[#F8F8FF] asowp-border-[1px] asowp-border-solid asowp-border-black asowp-w-6 asowp-h-0.5 asowp-rounded-full asowp-p-1">
                                        <div :class="{'asowp-translate-x-[100%]': componentAdvance.options[key].isDefault, 'asowp-bg-active': componentAdvance.options[key].isDefault }" class="asowp-toggle-dot asowp-w-2.5 asowp-h-2.5 asowp-duration-100 -asowp-translate-y-[8px] -asowp-translate-x-2 asowp-border-[4px] asowp-border-solid asowp-border-[#008000] asowp-bg-[#D9D9D9] asowp-rounded-full asowp-shadow-md asowp-transform"></div>
                                    </label>
                                </span>
                            </td>
                            <td class="asowp-px-6 asowp-text-center asowp-space-x-2">
                                <button class="asowp-bg-transparent asowp-border-none asowp-text-[#2DD05B] asowp-cursor-pointer" @click="selectOption(key,option)">
                                    <img class="asowp-w-5 asowp-h-5" src="../../../../../../../assets/icons/ic_edit.svg" alt="">
                                </button>
                                <button class="asowp-bg-transparent asowp-border-none asowp-text-[#A00000] asowp-cursor-pointer" @click="selectOption(key,option,true)">
                                    <img class="asowp-w-5 asowp-h-5" src="../../../../../../../assets/icons/ic_delete.svg" alt="">
                                </button>
                            </td>
                        </tr>
                        
                    </tbody>
                </table>
            </div>
            
        </div>
        <div class="asowp-space-y-1 asowp-translate-y-3 asowp-bg-white asowp-border-solid asowp-border-2 asowp-rounded-[10px] asowp-p-2 asowp-border-[#D1D1D1]" v-if="isNewOption">
            <div class=" asowp-font-bold asowp-text-[16px] asowp-space-x-1 asowp-px-4 asowp-py-2">
                    {{ isEdit ? 'Edit Option' : 'Add Option'}}
            </div>
            <hr class="Polaris-Divider asowp-w-full" style="border: 1px solid #ebebeb;">
            <div class=" asowp-px-4 asowp-py-4 asowp-space-y-4">
                <div class="asowp-flex asowp-space-x-2 asowp-justify-between">
                    <div class="asowp-w-[50%] asowp-space-y-2 asowp-flex asowp-flex-col asowp-text-[14px]">
                        <label for="" class="asowp-font-bold">{{ __("Title", "all-signs-options-pro") }}</label>
                        <input v-model="option.name" type="text" class="asowp-rounded asowp-w-full asowp-h-[35px]" style="border-radius: 5px;">
                    </div>
                    <div class="asowp-w-[50%] asowp-space-y-2 asowp-flex asowp-flex-col asowp-text-[12px]">
                        <label for="" class="asowp-font-bold">{{ __("Description", "all-signs-options-pro") }}</label>
                        <input v-model="option.description" type="text" class="asowp-rounded asowp-w-full asowp-h-[35px]" style="border-radius: 5px;">
                    </div>
                </div>
                <div class="asowp-flex asowp-space-x-2 asowp-justify-between">
                    <div class="asowp-w-[50%] asowp-flex asowp-flex-col asowp-space-y-2 asowp-text-[12px]">
                        <label for="" class="asowp-font-bold">{{ __("Upload Option Icon", "all-signs-options-pro") }}</label>
                        <div class="asowp-flex asowp-flex-col asowp-space-y-2 asowp-w-full asowp-pt-2">
                            <div class="asowp-flex asowp-space-x-2 asowp-border asowp-border-solid asowp-border-[#000] asowp-rounded-[5px] asowp-p-1">
                                <button @click="selectOptionIcon" class="asowp-bg-[#016464] asowp-border-none asowp-w-fit asowp-h-fit asowp-p-2 asowp-rounded asowp-px-4 asowp-text-white asowp-opacity-90 hover:asowp-opacity-100 asowp-text-[10px] asowp-cursor-pointer asowp-whitespace-nowrap">{{ __("upload Icon", "all-signs-options-pro") }}</button>
                                <div :class="`asowp-relative asowp-w-[82px] asowp-h-[30px] asowp-rounded-md asowp-overflow-hidden`">
                                    <img v-if="option.icon != ''" :src="option.icon" alt="" class="asowp-absolute asowp-w-full asowp-h-full">
                                    <button v-if="option.icon != ''" @click="()=>{option.icon = ''}" :class="`asowp-bg-[#016464] asowp-absolute asowp-bottom-0 asowp-right-0 asowp-text-white asowp-p-1 asowp-rounded-tl-lg asowp-border-none`">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="asowp-w-4 asowp-h-4">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="asowp-w-[50%] asowp-flex asowp-flex-col asowp-space-y-2 asowp-text-[12px]">
                        <label for="" class="asowp-font-bold">{{ __("Upload Option Backgound Image", "all-signs-options-pro") }}</label>
                        <div class="asowp-flex asowp-flex-col asowp-space-y-2 asowp-w-full asowp-pt-2">
                            <div class="asowp-flex asowp-space-x-2 asowp-border asowp-border-solid asowp-border-[#000] asowp-rounded-[5px] asowp-p-1">
                                <button @click="selectOptionImage" class="asowp-bg-[#016464] asowp-border-none asowp-w-fit asowp-h-fit asowp-p-2 asowp-rounded asowp-px-4 asowp-text-white asowp-opacity-90 hover:asowp-opacity-100 asowp-text-[10px] asowp-cursor-pointer asowp-whitespace-nowrap">{{ __("upload Background Image", "all-signs-options-pro") }}</button>
                                <div :class="`asowp-relative asowp-w-[82px] asowp-h-[30px] asowp-rounded-md asowp-overflow-hidden`">
                                    <img v-if="option.image != ''" :src="option.image" alt="" class="asowp-absolute asowp-w-full asowp-h-full">
                                    <button v-if="option.image != ''" @click="()=>{option.image = ''}" :class="`asowp-bg-[#016464] asowp-absolute asowp-bottom-0 asowp-right-0 asowp-text-white asowp-p-1 asowp-rounded-tl-lg asowp-border-none`">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="asowp-w-4 asowp-h-4">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="asowp-flex asowp-justify-between">
                    <div class="asowp-w-2/5 asowp-space-y-2 asowp-flex asowp-flex-col">
                        <label for="" class="asowp-font-bold">{{ __("Fixing method", "all-signs-options-pro") }}</label>
                        <Multiselect
                            v-model="option.fixingMethods"
                            mode="tags"
                            placeholder="Select your fixing methods"
                            :options="fixingMethods"
                            label="name"
                            trackBy="name"
                        >
                            <template v-slot:singleLabel="{ value }">
                                <div class="multiselect-single-label">
                                <img class="asowp-w-6 asowp-h-6 asowp-rounded asowp-mr-2" :src="value.icon"> {{ value.name }}
                                </div>
                            </template>

                            <template v-slot:option="{ option }">
                                <img class="asowp-w-6 asowp-h-6 asowp-rounded asowp-mr-2" :src="option.icon">{{ option.name }}
                            </template>
                        </Multiselect>
                    </div>
                    <div class="asowp-w-2/5 asowp-space-y-2 asowp-flex asowp-flex-col asowp-text-[14px]">
                        <label for="" class="asowp-font-bold">Shape</label>
                        <Multiselect
                            v-model="option.shapeId"
                            placeholder="Select your fixing methods"
                            :options="shapes"
                            label="name"
                            trackBy="name"
                        >
                            <template v-slot:singleLabel="{ value }">
                                <div class="multiselect-single-label">
                                <img class="asowp-w-6 asowp-h-6 asowp-rounded asowp-mr-2" :src="value.icon"> {{ value.name }}
                                </div>
                            </template>
    
                            <template v-slot:option="{ option }">
                                <img class="asowp-w-6 asowp-h-6 asowp-rounded asowp-mr-2" :src="option.icon">{{ option.name }}
                            </template>
                        </Multiselect>
                    </div>
                </div>
                
                <div class="asowp-w-full asowp-space-y-2 asowp-flex asowp-flex-col asowp-text-[14px]">
                    <label for="" class="asowp-font-bold">Size</label>
                    <div class="asowp-flex asowp-justify-between asowp-items-center asowp-space-x-10 asowp-px-10">
                        <div class="asowp-w-2/5">
                            <label class="">Width</label>    
                            <input type="number" v-model="option.size.width"  class="asowp-w-full asowp-h-[35px]">
                        </div>
                        <span class="asowp-font-bold asowp-text-center">x</span>
                        <div class="asowp-w-2/5">
                            <label class="">Height</label>        
                            <input type="number" v-model="option.size.height"  class="asowp-w-full asowp-h-[35px]">
                        </div>
                    </div>
                    <div class="asowp-flex asowp-justify-between asowp-px-10">
                        <div class="asowp-w-2/5 asowp-space-y-2 asowp-text-[12px] asowp-flex asowp-flex-col">
                            <label for="" class="asowp-text-[14px]">Base Price</label>
                            <div class="asowp-relative">
                                <input type="number" v-model="option.size.basePrice"  class="asowp-rounded asowp-w-full asowp-h-[30px]" @blur="isNaN(option.size.basePrice) ? option.size.basePrice = 0 : ''">
                            </div>
                            
                        </div>
                        <div class="asowp-w-2/5 asowp-space-y-2 asowp-text-[12px] asowp-flex asowp-flex-col">
                            <label for="" class="asowp-text-[14px]">Min char text to start applying the base price</label>
                            <div class="">
                                <input type="number" v-model="option.size.startPriceAtChar" class="asowp-rounded asowp-w-full asowp-h-[30px]" @blur="isNaN(option.size.startPriceAtChar) ? option.size.startPriceAtChar = 1 : ''">
                            </div>
                            
                        </div>
                    </div>
                    <div class="asowp-flex asowp-justify-between asowp-px-10">
                        <div class="asowp-w-2/5 asowp-space-y-2 asowp-text-[12px] asowp-flex asowp-flex-col">
                            <label for="" class="asowp-text-[14px]">Max text char</label>
                            <div class="">
                                <input type="number" v-model="option.size.maxTextChar"  class="asowp-rounded asowp-w-full asowp-h-[30px]" @blur="isNaN(option.size.maxTextChar) ? option.size.maxTextChar = -1 : ''">
                            </div>
                            <p class="asowp-text-[11px]">Set -1 if you don't want to limit</p>
                        </div>
                        
                        <div class="asowp-w-2/5 asowp-space-y-2 asowp-text-[12px] asowp-flex asowp-flex-col">
                            <label for="" class="asowp-text-[14px]">Char Price</label>
                            <div class="asowp-relative">
                                <input type="number" v-model="option.size.charPrice"  class="asowp-rounded asowp-w-full asowp-h-[30px]" @blur="isNaN(option.size.charPrice) ? option.size.charPrice = 0 : ''">
                            </div>
                            <p class="asowp-text-[11px] asowp-invisible">Invisible</p>
                        </div>
                        
                    </div>              
                </div>
                <div class="asowp-flex asowp-justify-between">
                    <div class="asowp-w-2/5 asowp-space-y-2">
                        <label for="" class="asowp-font-normal">{{__("Additional Price", "all-signs-options-pro")}}</label>
                        <input type="number" v-model="option.additionalPrice" class="asowp-rounded asowp-w-full asowp-h-[35px]" @blur="isNaN(option.additionalPrice) ? option.additionalPrice = 0 : ''">                    
                    </div>
                    <div class="asowp-w-2/5 asowp-space-y-2 asowp-flex asowp-flex-col asowp-text-[12px]">
                        <label for="" class="asowp-font-normal">Color Name</label>
                        <input v-model="option.color.name" type="text" class="asowp-rounded asowp-w-full asowp-h-[35px]">
                    </div>
                </div>
            </div>
            <hr class="Polaris-Divider asowp-w-full" style="border: 1px solid #ebebeb;">
            <div class=" asowp-flex asowp-space-x-4 asowp-px-4 asowp-py-4 asowp-justify-end asowp-items-end">
                <div class="asowp-bg-[#016464] asowp-rounded">
                    <button :disabled="isLoading" class="asowp-flex asowp-bg-transparent asowp-w-fit asowp-space-x-2 asowp-h-fit asowp-px-8 asowp-p-2 asowp-border-none asowp-text-white asowp-opacity-90 hover:asowp-border-none hover:asowp-text-white hover:asowp-opacity-100 asowp-cursor-pointer" @click="back">
                        <svg class="asowp-w-6 asowp-h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 12L5 8V11L17.17 11C17.3756 10.414 17.7586 9.90661 18.2657 9.54821C18.7729 9.18981 19.379 8.9982 20 9C20.7956 9 21.5587 9.31607 22.1213 9.87868C22.6839 10.4413 23 11.2044 23 12C23 12.7956 22.6839 13.5587 22.1213 14.1213C21.5587 14.6839 20.7956 15 20 15C18.69 15 17.58 14.17 17.17 13L5 13V16L1 12Z" fill="currentColor"/>
                        </svg>

                        <div class="asowp-font-semibold asowp-text-[16px]">Back</div>
                    </button>
                </div>
                <div class="asowp-bg-[#016464] asowp-rounded" v-if="isEdit">
                    <button @click="updateOption" :class="`asowp-rounded asowp-flex ${!isLoading ? 'asowp-bg-amber-400 ' :'asowp-bg-amber-500'} asowp-w-fit asowp-space-x-2 asowp-h-fit asowp-px-8 asowp-text-white asowp-p-2 asowp-border-none asowp-opacity-90 hover:asowp-border-none hover:asowp-text-white hover:asowp-opacity-100 asowp-cursor-pointer`">
                        <img src="../../../../../../../assets/icons/ic_loading_gray.svg" class="asowp-w-5 asowp-w-5" v-if="isLoading" :disabled="isLoading"/>
                        <div class="asowp-font-semibold asowp-text-[16px]">Update</div>
                    </button>
                </div>
                <div class="asowp-bg-[#016464] asowp-rounded" v-if="!isEdit">
                    <button @click="addNewOption" class="asowp-flex asowp-bg-transparent asowp-w-fit asowp-space-x-2 asowp-h-fit asowp-text-white asowp-px-8 asowp-p-2.5 asowp-rounded asowp-border-none asowp-opacity-90 hover:asowp-opacity-100 hover:asowp-border-none hover:asowp-text-white hover:asowp-bg-[#016464] asowp-cursor-pointer">
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
                        <h3 class="asowp-mb-5 asowp-text-lg asowp-font-normal asowp-text-gray-500 dark:text-gray-400">Are you sure you want to delete this component advance?</h3>
                        <input v-model="option.name" readonly class="asowp-rounded asowp-w-full asowp-h-[35px] asowp-text-center asowp-p-4 asowp-my-2 asowp-border-none" />
                        <button @click="deleteOption" data-modal-hide="popup-modal" type="button" :class="`asowp-border-solid asowp-text-white ${!isLoading ? 'asowp-bg-red-600 asowp-cursor-pointer' :'asowp-bg-red-700 asowp-cursor-not-allowed'} hover:bg-red-800 focus:ring-4 focus:outline-none asowp-my-2 asowp-border-none  focus:ring-red-300 dark:focus:ring-red-800 asowp-font-medium asowp-rounded-lg asowp-text-sm asowp-inline-flex asowp-items-center asowp-px-5 asowp-py-2.5 asowp-text-center`">
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
import toastMessage from "@/admin/utils/functions";
import Multiselect from "@vueform/multiselect";
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import router from '@/admin/router'
const route = useRoute()
const slugify = (value) =>
  String(value ?? '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')

const configId = ref(route.params.configId);
import { __, _x, _n, _nx, sprintf, setLocaleData } from "@wordpress/i18n";
const config = ref(route.params.config.replace(/-/g," "));
const materialId = ref(route.params.materialId);
const material = ref(route.params.material.replace(/-/g," "));
const componentId = ref(route.params.componentId);
const componentName = ref(route.params.component.replace(/-/g," "));
const componentAdvance = ref({
    name:"",
    description:"",
    icon:"",
    options:[]
});
const option = ref({
    name:"",
    description:"",
    icon:"",
    image:"",
    color:{
        name:"",
        codeHex:"#FFFFFF",
        prevImg:""
    },
    fixingMethods:[0],
    shapeId:0,
    size:{
        width:0,
        height:0,
        basePrice:0,
        startPriceAtChar:1,
        maxTextChar:-1,
        charPrice:0
    },
    additionalPrice:0
});
const noOptionsFound = ref('');
const fixingMethods = ref([]);
const shapes = ref([]);
const  optionId = ref(null);
const isFetching = ref(false);
const isLoading = ref(false);
const openModal = ref(false);
const isNewOption = ref(false);
const isEdit = ref(false);

onMounted(async() => {
    isFetching.value = true;
    await fetchMaterialAdvanceOptions();
});

watch(
  () => [route.params.materialId, route.params.componentId],
  async ([matId, compId]) => {
    materialId.value = matId;
    componentId.value = compId;
    material.value = route.params.material.replace(/-/g," ");
    config.value = route.params.config.replace(/-/g," ");
    componentName.value = route.params.component.replace(/-/g," ");
    isNewOption.value = false;
    isEdit.value = false;
    isFetching.value = true;
    await fetchMaterialAdvanceOptions();
    isFetching.value = false;
  }
);

const goToMaterials = ()=>{
    router.push('/configs/'+slugify(config)+'/'+configId.value+'/materials').then(() => {
    // Recharger la page après la navigation
    window.location.reload()
    })
}
const goBackToComponents = () => {
    router.push('/configs/'+slugify(config.value)+'/'+configId.value+'/materials/'+slugify(material.value)+'/'+materialId.value+'/advance')
}
const fetchMaterialAdvanceOptions = async () => {
    const result = await api.getMaterialAdvanceComponentOptions(configId.value,materialId.value,componentId.value);
    shapes.value = result.manageShapes.map((sh,key)=>{
        return {name:sh.name,value:key,icon:sh.icon};
    });
    fixingMethods.value = result.manageFixingMethods.map((fx,key)=>{
        return {name:fx.name,value:key,icon:fx.icon};
    });
    if(result.component){
        componentAdvance.value = result.component;
        noOptionsFound.value = result.message;
        isFetching.value = false;
    }else{
        componentAdvance.value = result.component;
        noOptionsFound.value = result.message;
        isFetching.value = false;
    }
}

const addNewOption = async () => {
    isLoading.value = true;
    const result = await api.addMaterialAdvanceComponentOption(configId.value,materialId.value,componentId.value,option.value);
    if(result.success){
        await fetchMaterialAdvanceOptions();
        isLoading.value = false;
        toastMessage(result.message);
        isNewOption.value = false;
        option.value ={
            name:"",
            description:"",
            icon:"",
            image:"",
            color:{
                name:"",
                color:"#FFFFFF",
                prevImg:""
            },
            fixingMethods:[0],
            shapeId:0,
            size:{
                width:0,
                height:0
            },
            additionalPrice:0
        }
    }else{
        isLoading.value = false;
        toastMessage(result.message,"error");
        isNewOption.value = false;
        option.value ={
            name:"",
            description:"",
            icon:"",
            image:"",
            color:{
                name:"",
                color:"#FFFFFF",
                prevImg:""
            },
            fixingMethods:[0],
            shapeId:0,
            size:{
                width:0,
                height:0
            },
            additionalPrice:0
        }
    }
}
const updateOption = async () => {
    isLoading.value = true;
    const result = await api.updateMaterialAdvanceComponentOption(configId.value,materialId.value,componentId.value,optionId.value,option.value);
    if(result.success){
        await fetchMaterialAdvanceOptions();
        isLoading.value = false;
        if(result.success == true){
            toastMessage(result.message);
        }else{
            toastMessage(result.message,"warning");
        }
        isNewOption.value = false;
        isEdit.value = false;
        optionId.value = null;
        option.value ={
            name:"",
            description:"",
            icon:"",
            image:"",
            color:{
                name:"",
                color:"#FFFFFF",
                prevImg:""
            },
            fixingMethods:[0],
            shapeId:0,
            size:{
                width:0,
                height:0
            },
            additionalPrice:0
        }
    }else{
        isLoading.value = false;
        toastMessage(result.message,"error");
        isNewOption.value = false;
        isEdit.value = false;
        optionId.value = null;
        option.value ={
            name:"",
            description:"",
            icon:"",
            image:"",
            color:{
                name:"",
                color:"#FFFFFF",
                prevImg:""
            },
            fixingMethods:[0],
            shapeId:0,
            size:{
                width:0,
                height:0
            },
            additionalPrice:0
        }
    }
}
const deleteOption = async () => {
    isLoading.value = true;
    const result = await api.deleteMaterialAdvanceComponentOption(configId.value,materialId.value,componentId.value,optionId.value);
    if(result.success){
        await fetchMaterialAdvanceOptions();
        isLoading.value = false;
        toastMessage(result.message);
        closeModal();
        isNewOption.value = false;
        isEdit.value = false;
        optionId.value = null;
        option.value ={
            name:"",
            description:"",
            icon:"",
            image:"",
            color:{
                name:"",
                color:"#FFFFFF",
                prevImg:""
            },
            fixingMethods:[0],
            shapeId:0,
            size:{
                width:0,
                height:0
            },
            additionalPrice:0
        }
    }else{
        isLoading.value = false;
        toastMessage(result.message,"error");
        closeModal();
        isNewOption.value = false;
        isEdit.value = false;
        optionId.value = null;
        option.value ={
            name:"",
            description:"",
            icon:"",
            image:"",
            color:{
                name:"",
                color:"#FFFFFF",
                prevImg:""
            },
            fixingMethods:[0],
            shapeId:0,
            size:{
                width:0,
                height:0
            },
            additionalPrice:0
        }
    }
}

/** Fonction for image selection */
const selectOptionIcon = async(e) => { 
    e.preventDefault();
    var uploader = wp.media(
        {
            title: __("Select Option icon","all-signs-options-pro"),
            button: {
                text: __("Select Icon","all-signs-options-pro")
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
                            option.value.icon = (attachment.url);
                        }
                    }
                );
            }
        )
        .open();
}
const selectOptionImage = async(e) => { 
    e.preventDefault();
    var uploader = wp.media(
        {
            title: __("Select Option Image", "all-signs-options-pro"),
            button: {
                text: __("Select image", "all-signs-options-pro")
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
                            option.value.image = (attachment.url);
                        }
                    }
                );
            }
        )
        .open();
}
const openOptionForm = () => {
    isNewOption.value = true;
}
const selectOption = (id,op,isDeleting=false) => {
    option.value = op;
    optionId.value = id;
    if(isDeleting){
        closeModal();
    }else{
        isEdit.value = true;
        isNewOption.value = true;
    }
}
const closeModal = () => {
    openModal.value = !openModal.value;
}
const back = () => {
    isNewOption.value = false;
    isEdit.value = false;
    optionId.value = null;
    option.value = {
        name:"",
        description:"",
        icon:"",
        image:"",
        color:{
            name:"",
            color:"#FFFFFF",
            prevImg:""
        },
        fixingMethods:[0],
        shapeId:0,
        size:{
            width:0,
            height:0
        },
        additionalPrice:0
    }
}

const updateComponentAdvance = async () => {
        isLoading.value = true;
        const result = await api.updateMaterialAdvanceComponent(configId.value,materialId.value,componentId.value,componentAdvance.value);
        if(result.success){
            if(result.success == true ) {
                toastMessage(result.message);
            }else{
                toastMessage(result.message,"warning");
            }
            isLoading.value = false;
            
        }else{
            isLoading.value = false;
            toastMessage(result.message,"error");
            
        }
    };

const selectDefault = async(key) =>{
    componentAdvance.value.options[key].isDefault = true;
    for(let i=0; i<componentAdvance.value.options.length; i++){
        if(i != key ){
            componentAdvance.value.options[i].isDefault = false;
        }
    }
    await updateComponentAdvance();
}
</script>
