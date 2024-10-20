<template>
    <div class="">
        <div class="asowp-space-y-1 asowp-translate-y-7" v-if="!isNewSize">
            <div class="asowp-flex asowp-justify-end asowp-space-x-2 asowp-w-4/4 asowp-bg-[#F8F9FB] asowp-text-[12px] asowp-px-4 asowp-py-4 asowp-pb-2">
                
                <button v-if="!isFetching" :disabled="isLoading" :class="`asowp-flex asowp-w-fit asowp-h-fit asowp-rounded asowp-bg-[#016464] asowp-px-4 asowp-space-x-2 asowp-p-1.5 asowp-border-none asowp-text-white asowp-opacity-90 hover:asowp-opacity-100 ${isLoading?'asowp-cursor-not-allowed':'asowp-cursor-pointer'}`" @click="newSize">
                    <svg class="asowp-w-5 asowp-h-5" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="plus-lg">
                        <path id="Vector" fill-rule="evenodd" clip-rule="evenodd" d="M11 2.75C11.1823 2.75 11.3572 2.82243 11.4861 2.95136C11.6151 3.0803 11.6875 3.25516 11.6875 3.4375V10.3125H18.5625C18.7448 10.3125 18.9197 10.3849 19.0486 10.5139C19.1776 10.6428 19.25 10.8177 19.25 11C19.25 11.1823 19.1776 11.3572 19.0486 11.4861C18.9197 11.6151 18.7448 11.6875 18.5625 11.6875H11.6875V18.5625C11.6875 18.7448 11.6151 18.9197 11.4861 19.0486C11.3572 19.1776 11.1823 19.25 11 19.25C10.8177 19.25 10.6428 19.1776 10.5139 19.0486C10.3849 18.9197 10.3125 18.7448 10.3125 18.5625V11.6875H3.4375C3.25516 11.6875 3.0803 11.6151 2.95136 11.4861C2.82243 11.3572 2.75 11.1823 2.75 11C2.75 10.8177 2.82243 10.6428 2.95136 10.5139C3.0803 10.3849 3.25516 10.3125 3.4375 10.3125H10.3125V3.4375C10.3125 3.25516 10.3849 3.0803 10.5139 2.95136C10.6428 2.82243 10.8177 2.75 11 2.75Z" fill="white"/>
                        </g>
                    </svg>
                    <div class="asowp-text-[14px]">
                        Add new size
                    </div>
                </button>
            </div>
            <div class="asowp-relative" id="monTableau">
                <table class="asowp-w-full asowp-text-center asowp-px-4 asowp-border asowp-border-collapse asowp-border-0">
                    <thead class="asowp-text-[14px] asowp-bg-[#f0f0f1]">
                        <tr class="">
                            <th scope="col" class="asowp-p-4 asowp-w-12 asowp-font-normal">
                                Title 
                            </th>
                            <th scope="col" class="asowp-px-6 asowp-py-3 asowp-font-normal">
                                width
                            </th>
                            <th scope="col" class="asowp-px-6 asowp-py-3 asowp-font-normal">
                                Height
                            </th>
                            <th scope="col" class="asowp-px-6 asowp-py-3 asowp-font-normal">
                                Base Price
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
                            <td colspan="6">
                                <div class="asowp-bg-white asowp-border-solid asowp-border asowp-border-[#D1D1D1] asowp-flex asowp-flex-col asowp-space-y-2 asowp-justify-center asowp-items-center asowp-w-full asowp-h-[200px] p-4">
                                    <img class="asowp-w-[100px] asowp-h-[100px]" src="../../../../../../../assets/icons/ic_loading.svg" alt="">
                                </div>
                            </td>
                        </tr>
                        <tr  v-if="sizes.allSizes.length == 0 && !isFetching">
                            <td colspan="6">
                                <div class="asowp-bg-white asowp-border-solid asowp-border asowp-border-[#D1D1D1] asowp-flex asowp-flex-col asowp-space-y-12 asowp-justify-center asowp-items-center asowp-py-10 asowp-h-[150px]">
                                    <div class="asowp-flex asowp-flex-col asowp-space-y-2 asowp-justify-center asowp-items-center">
                                        <p class="asowp-text-2xl asowp-font-bold">{{noSizesFound}}</p>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr v-for="(sz, key) in sizes.allSizes" :key="key" class="asowp-border-t-0 asowp-border-l-0 asowp-border-r-0 asowp-border-b-2 asowp-border-solid asowp-border-[#f0f0f1]">
                            <td class="asowp-w-28 asowp-text-center asowp-p-4">
                                {{ sz.label }}
                            </td>
                            <td class="asowp-px-6 asowp-text-[12px] asowp-py-3">
                                <span class="asowp-w-fit asowp-rounded-lg asowp-text-center asowp-p-1 asowp-px-2 asowp-bg-[#9ACD321F] asowp-text-[#466801] asowp-border-none">
                                    {{ sz.width }}
                                </span>
                            </td>
                            <td class="asowp-text-[12px] asowp-px-6 asowp-py-2">
                                <span class="asowp-w-fit asowp-rounded-lg asowp-text-center asowp-px-2 asowp-p-1 asowp-bg-[#F8E7E7] asowp-text-[#EF5A35] asowp-border-none">
                                    {{ sz.height }}
                                </span>
                            </td>
                            <td class="asowp-text-[12px] asowp-px-6 asowp-py-2">
                                <span class="asowp-w-fit asowp-rounded-lg asowp-text-center asowp-px-2 asowp-p-1 asowp-bg-[#EF5A354D] asowp-text-[#000000] asowp-border-none">
                                    {{sz.basePrice}}
                                </span>
                            </td>
                            <td class="asowp-text-[12px] asowp-px-6 asowp-py-2">
                                <span class="asowp-w-fit asowp-flex asowp-items-center asowp-translate-x-5 asowp-translate-y-0.5">
                                    <label for="asowp-toggle" @click="!isLoading?selectDefault(key):''" class="asowp-cursor-pointer asowp-bg-[#F8F8FF] asowp-border-[1px] asowp-border-solid asowp-border-black asowp-w-6 asowp-h-0.5 asowp-rounded-full asowp-p-1">
                                        <div :class="sz.isDefault ? 'asowp-translate-x-[100%] asowp-border-[#016464]':'asowp-border-[#FFFFFF]'" class="asowp-toggle-dot asowp-w-2.5 asowp-h-2.5 asowp-duration-100 -asowp-translate-y-[8px] -asowp-translate-x-2 asowp-border-[4px] asowp-border-solid asowp-bg-[#D9D9D9] asowp-rounded-full asowp-shadow-md asowp-transform"></div>
                                    </label>
                                </span>
                            </td>
                            <td class="asowp-px-6 asowp-text-center">
                                <button class="asowp-bg-transparent asowp-border-none asowp-text-[#2DD05B] asowp-cursor-pointer">
                                    <img class="asowp-w-5 asowp-h-5" src="../../../../../../../assets/icons/ic_edit.svg" alt="" @click="selectMaterialSize(key,sz)">
                                </button>
                                <button class="asowp-bg-transparent asowp-border-none asowp-text-[#A00000] asowp-cursor-pointer">
                                    <img class="asowp-w-5 asowp-h-5" src="../../../../../../../assets/icons/ic_delete.svg" alt="" @click="selectMaterialSize(key,sz,true)">
                                </button>
                            </td>
                        </tr>       
                        
                    </tbody>
                </table>
            </div>
        </div>
        <div class="asowp-space-y-2 asowp-translate-y-7" v-if="!isFetching && !isNewSize">
            <div class="asowp-bg-[#F8F9FB] asowp-py-4 asowp-px-8">
                <div class="asowp-flex asowp-w-1/2 asowp-text-[16px]">
                    <label for="" class="asowp-text-[14px] asowp-font-bold">Thickness</label>
                    <div class="asowp-flex asowp-items-center">
                        <span class="asowp-w-fit asowp-flex asowp-items-center asowp-translate-x-5 asowp-translate-y-0.5">
                            <label for="asowp-toggle" @click="sizes.thickness.active = !sizes.thickness.active" class="asowp-cursor-pointer asowp-bg-[#F8F8FF] asowp-border-[1px] asowp-border-solid asowp-border-black asowp-w-6 asowp-h-0.5 asowp-rounded-full asowp-p-1">
                                <div :class="sizes.thickness.active ? 'asowp-translate-x-[100%] asowp-border-[#016464]':'asowp-border-[#FFFFFF]'" class="asowp-toggle-dot asowp-w-2.5 asowp-h-2.5 asowp-duration-100 -asowp-translate-y-[8px] -asowp-translate-x-2 asowp-border-[4px] asowp-border-solid asowp-bg-[#D9D9D9] asowp-rounded-full asowp-shadow-md asowp-transform"></div>
                            </label>
                        </span>
                    </div>
                </div>
                <label for="" class="asowp-text-[14px] asowp-font-bold asowp-invisible">Values</label>
                <div v-if="sizes.thickness.active" class="asowp-grid asowp-grid-cols-5 asowp-gap-4">
                    <div class="asowp-relative asowp-space-y-2 asowp-py-2 asowp-flex asowp-flex-col asowp-text-[12px]" :key="key" v-for="thick,key in sizes.thickness.values">
                        <input type="number" v-model="sizes.thickness.values[key]" class="asowp-rounded asowp-w-[80%] asowp-h-[30px]">
                        <div @click="handleDeleteThickness(key)" class="asowp-bg-red-500 asowp-text-white asowp-flex asowp-absolute asowp-justify-center asowp-items-center asowp-right-6 asowp-my-0  -asowp-top-4 asowp-shadow-md asowp-rounded-full asowp-cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="asowp-w-6 asowp-h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                        </div>
                    </div>
                    <div>
                        <button :disabled="isLoading" @click="handleAddNewThickness" class="asowp-flex asowp-jsutify-center asowp-items-center asowp-bg-[#016464] asowp-rounded asowp-w-fit asowp-space-x-2 asowp-h-fit asowp-text-white asowp-px-2 asowp-p-2.5 asowp-rounded asowp-border-none hover:asowp-opacity-100 hover:asowp-border-none hover:asowp-text-white hover:asowp-bg-[#016464] asowp-cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="asowp-w-6 asowp-h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                            <span class="asowp-font-semibold asowp-text-[16px]">More</span>
                        </button>
                    </div>
                </div>
            </div>
            <div class="asowp-bg-[#F8F9FB] asowp-text-[16px] asowp-font-medium asowp-px-8 asowp-py-8 ">
                <div class="asowp-flex ">
                    Custom size
                    <div class="asowp-flex asowp-items-center asowp-translate-x-5 asowp-translate-y-0.5">
                        <label for="asowp-toggle" @click="changeCustomSizeActive" class="asowp-cursor-pointer asowp-bg-[#F8F8FF] asowp-border-[1px] asowp-border-solid asowp-border-black asowp-w-6 asowp-h-0.5 asowp-rounded-full asowp-p-1">
                            <div :class="sizes.customSize.active ? 'asowp-translate-x-[120%] asowp-border-[#016464]':'asowp-border-[#FFFFFF]'" class="asowp-toggle-dot asowp-w-2.5 asowp-h-2.5 asowp-duration-100 -asowp-translate-y-[8px] -asowp-translate-x-2 asowp-border-[4px] asowp-border-solid asowp-bg-[#D9D9D9] asowp-rounded-full asowp-shadow-md asowp-transform"></div>
                        </label>
                    </div>
                </div>
                <div class="asowp-space-y-6 asowp-pt-12" v-if="sizes.customSize.active">
                    <div class="asowp-grid asowp-grid-cols-3 asowp-gap-6 asowp-items-center">
                        <div class="asowp-space-y-2 asowp-text-[12px] asowp-flex asowp-flex-col">
                            <label for="" class="asowp-bold asowp-font-normal">Width label</label>
                            <input type="text" v-model="sizes.customSize.width.label" class="asowp-rounded asowp-w-full asowp-h-[30px]">
                        </div>
                        <div class="asowp-space-y-2 asowp-text-[12px] asowp-flex asowp-flex-col">
                            <label for="" class="asowp-bold asowp-font-normal">Min width</label>
                            <div class="">
                                <input type="number" v-model="sizes.customSize.width.min" class="asowp-rounded asowp-w-full asowp-h-[30px]">
                            </div>
                        </div>
                        <div class="asowp-space-y-2 asowp-text-[12px] asowp-flex asowp-flex-col">
                            <label for="" class="asowp-bold asowp-font-normal">Min Height</label>
                            <div class="">
                                <input type="number" v-model="sizes.customSize.height.min" class="asowp-rounded asowp-w-full asowp-h-[30px]">
                            </div>
                        </div>
                        <div class="asowp-space-y-2 asowp-text-[12px] asowp-flex asowp-flex-col">
                            <label for="" class="asowp-bold asowp-font-normal">Height label</label>
                            <input type="text" v-model="sizes.customSize.height.label" class="asowp-rounded asowp-w-full asowp-h-[30px]">
                        </div>
                        <div class="asowp-space-y-2 asowp-text-[12px] asowp-flex asowp-flex-col">
                            <label for="" class="asowp-bold asowp-font-normal">Max Width</label>
                            <div class="">
                                <input type="number" v-model="sizes.customSize.width.max" class="asowp-rounded asowp-w-full asowp-h-[30px]">
                            </div>
                            
                        </div>
                        <div class="asowp-space-y-2 asowp-text-[12px] asowp-flex asowp-flex-col">
                            <label for="" class="asowp-bold asowp-font-normal">Max height</label>
                            <div class="">
                                <input type="number" v-model="sizes.customSize.height.max" class="asowp-rounded asowp-w-full asowp-h-[30px]">
                            </div>
                        </div>
                    </div>
                    <div class="asowp-space-y-2">
                        <div class="asowp-space-x-4 asowp-flex asowp-relative">
                            <label>Pricings</label>
                            <div @click="showPricingModal = true" class="asowp-cursor-pointer asowp-w-7 asowp-h-7 asowp-rounded-full asowp-bg-blue-500 asowp-text-white asowp-flex asowp-items-center asowp-justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="asowp-w-6 asowp-h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
                                </svg>
                            </div>  
                            <div v-if="showPricingModal" class="asowp-absolute -asowp-top-20 asowp-left-20 asowp-z-50 asowp-justify-center asowp-items-center asowp-w-full">
                                <div class="asowp-relative asowp-p-4 asowp-w-full asowp-max-w-2xl asowp-max-h-full">
                                    <div class="asowp-relative asowp-bg-white asowp-rounded-lg asowp-shadow dark:bg-gray-700">
                                        <!-- Modal header -->
                                        <div class="asowp-flex asowp-items-center asowp-justify-between asowp-p-2 asowp-border-solid  asowp-border-t-0 asowp-border-x-0 asowp-border-b asowp-rounded-t dark:border-gray-600">
                                            <h3 class="asowp-text-xl asowp-font-semibold asowp-text-gray-900 dark:text-white">
                                                Custom Sizes Pricing Rules
                                            </h3>
                                            <button @click="showPricingModal = false" class="asowp-text-gray-400 asowp-bg-transparent hover:asowp-bg-gray-200 hover:asowp-text-gray-900 asowp-rounded-lg asowp-text-sm asowp-w-8 asowp-h-8 asowp-ms-auto asowp-inline-flex asowp-justify-center asowp-items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                                                <svg class="asowp-w-3 asowp-h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                                </svg>
                                                <span class="asowp-sr-only">Close modal</span>
                                            </button>
                                        </div>
                                        <!-- Modal body -->
                                        <div class="asowp-p-4 md:asowp-p-5 asowp-space-y-4">
                                            <p class="asowp-text-base asowp-text-justify asowp-leading-relaxed asowp-text-gray-500 dark:text-gray-400">
                                                For custom size pricing, the idea is to create surface intervals, which would enable the price to be calculated according to the dimensions chosen by the customer. 
                                                Example: for a 100 * 100 surface, I want the base price to be 25 and the price per char to be 2, so in the surface area I'll write 100 and in base Price I'll write 25 net char Price I'll write 2. Note that the values to be entered in the interval must not exceed or be less than the various values defined in min Height and min Width and max Height and max Width. The plugin uses the largest of each category (min and max) to check pricing.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>                         
                        </div>
                        <div>
                            <div class="asowp-relative asowp-space-y-2 asowp-py-2 asowp-flex asowp-flex-col asowp-text-[12px]" :key="key" v-for="pricing,key in sizes.customSize.pricings">
                                <div>
                                    <div class="asowp-py-2 asowp-grid asowp-grid-cols-4 asowp-gap-4 asowp-text-[12px]">   
                                        <div class="asowp-space-y-2 asowp-text-[12px] asowp-flex asowp-flex-col">
                                            <label for="" class="asowp-bold asowp-font-normal">Surface</label>
                                            <div class="asowp-relative">
                                                <input type="number" v-model="sizes.customSize.pricings[key].surface" class="asowp-rounded asowp-w-full asowp-h-[30px]" :class="`${!isValidPricing(key)?'asowp-field-required':''}`">
                                                <span class="asowp-absolute asowp-top-[2px] asowp-right-[10%]">{{ measurementUnit }}<sup>2</sup></span>
                                            </div>
                                        </div>
                                        <div class="asowp-space-y-2 asowp-text-[12px] asowp-flex asowp-flex-col">
                                            <label for="" class="asowp-bold asowp-font-normal">Base Price</label>
                                            <div class="asowp-relative">
                                                <input type="number" v-model="sizes.customSize.pricings[key].basePrice" class="asowp-rounded asowp-w-full asowp-h-[30px]" @blur="isNaN(sizes.customSize.pricings[key].basePrice) ? sizes.customSize.pricings[key].basePrice=0 : ''">
                                            </div>
                                        </div>
                                        <div class="asowp-space-y-2 asowp-text-[12px] asowp-flex asowp-flex-col">
                                            <label for="" class="asowp-bold asowp-font-normal">Char Price</label>
                                            <div class="asowp-relative">
                                                <input type="number" v-model="sizes.customSize.pricings[key].charPrice" class="asowp-rounded asowp-w-full asowp-h-[30px]" @blur="isNaN(sizes.customSize.pricings[key].charPrice) ? sizes.customSize.pricings[key].charPrice=0 : ''">
                                            </div>
                                        </div>
                                        <div>
                                            <label for="" class="asowp-bold asowp-font-normal asowp-invisible">Delete pricing</label>
                                            <div class="asowp-flex asowp-justify-start asowp-items-start asowp-h-full asowp-pt-1">
                                                <div @click="handleDeletePricing(key)" class="asowp-flex asowp-items-center asowp-justify-center asowp-bg-red-500 asowp-text-white asowp-flex asowp-justify-center asowp-items-center asowp-shadow-md asowp-rounded-md asowp-cursor-pointer asowp-w-1/4 asowp-h-[30px]">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="asowp-w-[70%] asowp-h-[70%]">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    </div> 
                                    <p v-if="!isValidPricing(key)" class="asowp-m-0 asowp-text-red-500">{{ key == 0 ? 'Must be greater than or equal to the greater of the minimum custom size values and less than or equal to the greater of the maximum custom size values.' : 'Must be greater than the previous line value and less than or equal to the greater of the height or the maximum width of custom size.' }}</p>
                                </div>
                            </div>
                            <div v-if="canAddNewPricing">
                                <button :disabled="isLoading" @click="handleAddNewPricing" class="asowp-flex asowp-jsutify-center asowp-items-center asowp-bg-[#016464] asowp-rounded asowp-w-fit asowp-space-x-2 asowp-h-fit asowp-text-white asowp-px-2 asowp-p-2.5 asowp-rounded asowp-border-none hover:asowp-opacity-100 hover:asowp-border-none hover:asowp-text-white hover:asowp-bg-[#016464] asowp-cursor-pointer">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="asowp-w-6 asowp-h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg>
                                    <span class="asowp-font-semibold asowp-text-[16px]">More</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="asowp-space-x-4 asowp-px-4 asowp-py-4 asowp-justify-end asowp-items-end">
                <div class="asowp-flex asowp-justify-end">
                    <button @click="updateMaterialSize" class="asowp-flex asowp-bg-[#016464]  asowp-w-fit asowp-space-x-2 asowp-h-fit asowp-text-white asowp-px-8 asowp-p-2.5 asowp-rounded asowp-border-none asowp-opacity-90 hover:asowp-opacity-100 hover:asowp-border-none hover:asowp-text-white hover:asowp-bg-[#016464] asowp-cursor-pointer" :class="`${!canAddNewPricing ? 'asowp-cursor-not-allowed' : '' }`">
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
        <div class="asowp-space-y-2 asowp-translate-y-8" v-if="isNewSize">
            <div class="asowp-bg-[#F8F9FB] asowp-space-y-6 asowp-px-4 asowp-py-8">
                <div class="asowp-bg-[#F8F9FB] asowp-px-4 asowp-py-4 asowp-space-y-8">
                    <div class="asowp-flex asowp-justify-between">
                        <div class="asowp-w-2/5 asowp-space-y-2 asowp-flex asowp-flex-col asowp-text-[14px]">
                            <label for="" class="asowp-text-[14px] asowp-font-bold">Label <span class="asowp-text-red-500">*</span></label>
                            <input type="text" v-model="size.label"  :class="` ${emptyLabel?'asowp-field-required':''} asowp-rounded asowp-w-full asowp-h-[30px]`">
                        </div>
                    </div>
                    <div class="asowp-flex asowp-justify-between">
                        <div class="asowp-w-2/5 asowp-space-y-2 asowp-flex asowp-flex-col asowp-text-[14px]">
                            <label for="" class="asowp-text-[14px] asowp-font-bold">Width</label>
                            <input type="number" v-model="size.width"  class="asowp-rounded asowp-w-full asowp-h-[30px]" @blur="isNaN(size.width)?size.width=0:''">
                        </div>
                        <div class="asowp-w-2/5 asowp-space-y-2 asowp-flex asowp-flex-col asowp-text-[12px]">
                            <label for="" class="asowp-text-[14px] asowp-font-bold">Height</label>
                            <input type="number"  v-model="size.height"  class="asowp-rounded asowp-w-full asowp-h-[30px]" @blur="isNaN(size.height)?size.height=0:''">
                        </div>
                    </div>
                </div>
                <div class="asowp-flex asowp-justify-between asowp-px-4">
                    <div class="asowp-w-2/5 asowp-space-y-2 asowp-text-[12px] asowp-flex asowp-flex-col">
                        <label for="" class="asowp-text-[14px] asowp-font-bold">Base Price</label>
                        <div class="asowp-relative">
                            <input type="number" v-model="size.basePrice" class="asowp-rounded asowp-w-full asowp-h-[30px]" @blur="isNaN(size.basePrice)? size.basePrice=0:''">
                        </div>
                        
                    </div>
                    <div class="asowp-w-2/5 asowp-space-y-2 asowp-text-[12px] asowp-flex asowp-flex-col">
                        <label for="" class="asowp-text-[14px] asowp-font-bold">Min char text to start applying the base price</label>
                        <div class="">
                            <input type="number" v-model="size.startPriceAtChar" class="asowp-rounded asowp-w-full asowp-h-[30px]" @blur="isNaN(size.startPriceAtChar)? size.startPriceAtChar=1:''">
                        </div>
                        
                    </div>
                </div>
                <div class="asowp-flex asowp-justify-between asowp-px-4">
                    <div class="asowp-w-2/5 asowp-space-y-2 asowp-text-[12px] asowp-flex asowp-flex-col">
                        <label for="" class="asowp-text-[14px] asowp-font-bold">Max text char</label>
                        <div class="">
                            <input type="number" v-model="size.maxTextChar"  class="asowp-rounded asowp-w-full asowp-h-[30px]" @blur="isNaN(size.maxTextChar)? size.maxTextChar=-1:''">
                        </div>
                        <p class="asowp-text-[11px]">Set -1 if you don't want to limit</p>
                    </div>
                    
                    <div class="asowp-w-2/5 asowp-space-y-2 asowp-text-[12px] asowp-flex asowp-flex-col">
                        <label for="" class="asowp-text-[14px] asowp-font-bold">Char Price</label>
                        <div class="asowp-relative">
                            <input type="number" v-model="size.charPrice" class="asowp-rounded asowp-w-full asowp-h-[30px]" @blur="isNaN(size.charPrice)? size.charPrice=0:''">
                        </div>
                        <p class="asowp-text-[11px] asowp-invisible">Invisible</p>
                    </div>
                    
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
                    <button @click="updateSizeInMaterialSize" :class="`asowp-rounded asowp-flex ${!isLoading ? 'asowp-bg-amber-400 ' :'asowp-bg-amber-500'} asowp-w-fit asowp-space-x-2 asowp-h-fit asowp-px-8 asowp-text-white asowp-p-2 asowp-border-none asowp-opacity-90 hover:asowp-border-none hover:asowp-text-white hover:asowp-opacity-100 asowp-cursor-pointer`">
                        <img src="../../../../../../../assets/icons/ic_loading_gray.svg" class="asowp-w-5 asowp-w-5" v-if="isLoading" :disabled="isLoading"/>
                        <div class="asowp-font-semibold asowp-text-[16px]">Update</div>
                    </button>
                </div>
                <div class="asowp-bg-[#016464] asowp-rounded" v-if="!isEdit">
                    <button @click="addMaterialSize" class="asowp-flex asowp-bg-transparent asowp-w-fit asowp-space-x-2 asowp-h-fit asowp-text-white asowp-px-8 asowp-p-2.5 asowp-rounded asowp-border-none asowp-opacity-90 hover:asowp-opacity-100 hover:asowp-border-none hover:asowp-text-white hover:asowp-bg-[#016464] asowp-cursor-pointer">
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
        <div v-if="openModal" @click.self="closeModal" class="asowp-z-[999] asowp-bg-gray-400 asowp-overflow-y-auto asowp-overflow-x-hidden asowp-fixed asowp-top-0 asowp-right-[25%] asowp-left-[75%] asowp-z-50 asowp-flex asowp-justify-center asowp-items-center asowp-w-full md:asowp-inset-0 asowp-h-full">
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
                        <h3 class="asowp-mb-5 asowp-text-lg asowp-font-normal asowp-text-gray-500 dark:text-gray-400">Are you sure you want to delete this size?</h3>
                        <input v-model="size.label" readonly class="asowp-rounded asowp-w-full asowp-h-[35px] asowp-text-center asowp-p-4 asowp-my-2 asowp-border-none" />
                        <button @click="deleteMaterialSize" data-modal-hide="popup-modal" type="button" :class="`asowp-border-solid asowp-text-white ${!isLoading ? 'asowp-bg-red-600 asowp-cursor-pointer' :'asowp-bg-red-700 asowp-cursor-not-allowed'} hover:bg-red-800 focus:ring-4 focus:outline-none asowp-my-2 asowp-border-none  focus:ring-red-300 dark:focus:ring-red-800 asowp-font-medium asowp-rounded-lg asowp-text-sm asowp-inline-flex asowp-items-center asowp-px-5 asowp-py-2.5 asowp-text-center`">
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

const isFetching = ref(false);
const isNewSize = ref(false);
const isLoading = ref(false);
const sizeId = ref(null);
const sizes = ref({
    customSize:{
        active:false,
        width:{
            label:'Width',
            min:0,
            max:0
        },
        height:{
            label:'Height',
            min:0,
            max:0
        },
        pricings:[

        ]
    },
    thickness: {
        active: false,
        values: []
    },
    allSizes:[]
});
const measurementUnit = ref('mm');
const canAddNewPricing = ref(true);
const isEdit = ref(false);
const openModal = ref(false);
const noSizesFound = ref('');
const size = ref({
    isDefault:false,
    label:"",
    width:0,
    height:0,
    startPriceAtChar:1,
    textNumber:0,
    maxTextChar:-1,
    minCharText:0,
    charPrice:0,
    basePrice:0
});
const showPricingModal = ref(false);
const emptyLabel = ref(false);
onMounted(async ()=>{
    isFetching.value = true;
    await fetchMaterialSizes();
    isFetching.value = false;
});

const fetchMaterialSizes = async () => {
    const result = await api.getMaterialSimpleSizes(configID.value,materialId.value);
    if(!result.success){
        if(result.message){
            noSizesFound.value = result.message;
        }
        if( !result.materialSizes.customSize.pricings){
            result.materialSizes.customSize.pricings = [];
        }
        sizes.value = result.materialSizes;
        measurementUnit.value = result.measurementUnit;
    }
}

const checkIfThereDefault = ()=> {
    var hasDefault = false;
    let index =0;
    while (index<sizes.value.allSizes.length && !hasDefault) {
        if(sizes.value.allSizes[index].isDefault){
            hasDefault = true;
        }
        index++;
    }
    if(!hasDefault && sizes.value.allSizes[0]){
        sizes.value.allSizes[0].isDefault = true;
    }
}
const updateMaterialSize = async () => {
    if(canAddNewPricing){
        isLoading.value = true;
        checkIfThereDefault();
        const result = await api.updateMaterialSimpleSizes(configID.value,materialId.value,sizes.value);
        if(result.success){
            await fetchMaterialSizes();
            if(result.success == true ) {
                toastMessage(result.message);
            }else{
                toastMessage(result.message,"warning");
            }
            isLoading.value = false;
            isNewSize.value = false;
            size.value = {
                isDefault:false,
                label:"",
                width:0,
                height:0,
                startPriceAtChar:1,
                textNumber:0,
                maxTextChar:-1,
                minCharText:0,
                charPrice:0,
                basePrice:0
            };
            openModal.value = false;
        }else{
            isLoading.value = false;
            toastMessage(result.message,"error");
            isNewSize.value = false;
            size.value = {
                isDefault:false,
                label:"",
                width:0,
                height:0,
                startPriceAtChar:1,
                textNumber:0,
                maxTextChar:-1,
                minCharText:0,
                charPrice:0,
                basePrice:0
            };
            openModal.value = false;
        }
    }
}

const addMaterialSize = async () => {
    if(size.value.label.trim() !== ''){
        isLoading.value = true;
        emptyLabel.value = false;
        isLoading.value = true;
        sizes.value.allSizes.push(size.value);
        await updateMaterialSize();
    }else{
        emptyLabel.value = true;
        toastMessage("Label must not be empty","warning");
    }
}
const selectMaterialSize = (id,sz,isdeleting=false) => {
    if(isdeleting){
        sizeId.value = id;
        size.value = sz;            
        closeModal();
    }else{
        size.value = sz;            
        isEdit.value = true;
        isNewSize.value = true;            
    }
}

const updateSizeInMaterialSize = async () => {
    if(size.value.label.trim() !== ''){
        isLoading.value = true;
        emptyLabel.value = false;
        sizes.value.allSizes[sizeId.value] = size.value;
        await updateMaterialSize();
    }else{
        emptyLabel.value = true;
        toastMessage("Label must not be empty","warning");
    }
}

const deleteMaterialSize = async () => {
    isLoading.value = true;
    sizes.value.allSizes.splice(sizeId.value, 1);
    await updateMaterialSize();
}

const newSize = () => {
    isNewSize.value = true;
}
const back = () => {
    isNewSize.value = false;
    isEdit.value = false;
    sizeId.value  = null;
    emptyLabel.value = false;
    size.value = {
        isDefault:false,
        label:"",
        width:0,
        height:0,
        startPriceAtChar:1,
        textNumber:0,
        maxTextChar:-1,
        minCharText:0,
        charPrice:0,
        basePrice:0
    };

}
const closeModal = () => {
    openModal.value = !openModal.value;
}
const changeCustomSizeActive = () => {
    sizes.value.customSize.active = !sizes.value.customSize.active;
};
const selectDefault = async(key) =>{
    sizes.value.allSizes[key].isDefault = true;
    for(let i=0; i<sizes.value.allSizes.length; i++){
        if(i != key ){
            sizes.value.allSizes[i].isDefault = false;
        }
    }
    await updateSizeInMaterialSize();
}
const handleAddNewThickness = ()=> {
    sizes.value.thickness.values.push(0);
}
const handleDeleteThickness = (key)=> {
    sizes.value.thickness.values.splice(key,1);
}

const handleAddNewPricing = ()=>{
    sizes.value.customSize.pricings.push({
        basePrice:0,
        charPrice:0,
        surface:0
    });
}
const handleDeletePricing = (key)=>{
    sizes.value.customSize.pricings.splice(key,1);
}
const isValidPricing = (key)=>{
    const minSurface = (sizes.value.customSize.width.min > sizes.value.customSize.height.min) ? sizes.value.customSize.width.min : sizes.value.customSize.height.min;
    const maxSurface = (sizes.value.customSize.width.max > sizes.value.customSize.height.max) ? sizes.value.customSize.width.max : sizes.value.customSize.height.max;
    
    if(minSurface<=sizes.value.customSize.pricings[key].surface && maxSurface >= sizes.value.customSize.pricings[key].surface){
        if(key!=0){
            if(sizes.value.customSize.pricings[key].surface > sizes.value.customSize.pricings[key-1].surface && sizes.value.customSize.pricings[key].surface<=maxSurface){
                canAddNewPricing.value=true;
                return true;
            }else{
                canAddNewPricing.value=false;
                return false;
            }
        }
        canAddNewPricing.value=true;
        return true;
    }
    canAddNewPricing.value=false;
    return false;
}

</script>
