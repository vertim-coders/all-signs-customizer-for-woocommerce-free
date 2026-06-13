<template>
    <div class="ascwo-mt-4">
        <div class="ascwo-space-y-1"  v-if="!isNewComponent">
            <!-- <div class="ascwo-bg-white ascwo-border-solid ascwo-border-2 ascwo-rounded-[10px] ascwo-p-2 ascwo-border-[#D1D1D1] ascwo-space-x-1 ascwo-px-4 ascwo-py-4 ascwo-flex">
                <div v-if="config.trim() != ''" class="ascwo-font-bold ascwo-text-[16px]">
                    {{config}}
                </div>
                <img v-if="config.trim() != ''" class="ascwo-w-4 ascwo-h-4 ascwo-py-1" src="../../../../../../../assets/icons/ic_crochet.svg" alt="">
                <div v-if="config.trim() != ''" class="ascwo-text-[16px] ascwo-cursor-pointer" @click="goToMaterials">
                    {{ __("Materials", "all-signs-customizer-for-woocommerce-pro") }}
                </div>
                <img v-if="material.trim() != ''" class="ascwo-w-4 ascwo-h-4 ascwo-py-1" src="../../../../../../../assets/icons/ic_crochet.svg" alt="">
                <div v-if="material.trim() != ''" class="ascwo-text-[16px] ">
                    {{material}}
                </div>
            </div> -->
            <div class="ascwo-bg-white ascwo-border-solid ascwo-border-2 ascwo-rounded-[10px] ascwo-p-2 ascwo-border-[#D1D1D1]">
                <div class="ascwo-flex ascwo-justify-end ascwo-space-x-2 ascwo-w-4/4 ascwo-bg-[#F8F9FB] ascwo-text-[12px] ascwo-px-4 ascwo-py-4 ascwo-pb-2">
                
                    <button :disabled="isLoading" :class="`${isLoading ? 'ascwo-opacity-50 ascwo-cursor-not-allowed' : '' } ascwo-flex ascwo-w-fit ascwo-h-fit ascwo-rounded ascwo-bg-[#016464] ascwo-px-4 ascwo-space-x-2 ascwo-p-1.5 ascwo-border-none ascwo-text-white ascwo-opacity-90 hover:ascwo-opacity-100 ascwo-cursor-pointer`" @click="newComponent">
                        <svg class="ascwo-w-5 ascwo-h-5" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g id="plus-lg">
                            <path id="Vector" fill-rule="evenodd" clip-rule="evenodd" d="M11 2.75C11.1823 2.75 11.3572 2.82243 11.4861 2.95136C11.6151 3.0803 11.6875 3.25516 11.6875 3.4375V10.3125H18.5625C18.7448 10.3125 18.9197 10.3849 19.0486 10.5139C19.1776 10.6428 19.25 10.8177 19.25 11C19.25 11.1823 19.1776 11.3572 19.0486 11.4861C18.9197 11.6151 18.7448 11.6875 18.5625 11.6875H11.6875V18.5625C11.6875 18.7448 11.6151 18.9197 11.4861 19.0486C11.3572 19.1776 11.1823 19.25 11 19.25C10.8177 19.25 10.6428 19.1776 10.5139 19.0486C10.3849 18.9197 10.3125 18.7448 10.3125 18.5625V11.6875H3.4375C3.25516 11.6875 3.0803 11.6151 2.95136 11.4861C2.82243 11.3572 2.75 11.1823 2.75 11C2.75 10.8177 2.82243 10.6428 2.95136 10.5139C3.0803 10.3849 3.25516 10.3125 3.4375 10.3125H10.3125V3.4375C10.3125 3.25516 10.3849 3.0803 10.5139 2.95136C10.6428 2.82243 10.8177 2.75 11 2.75Z" fill="white"/>
                            </g>
                        </svg>
                        <div class="ascwo-text-[14px]">
                            {{ __("Add New Component", "all-signs-customizer-for-woocommerce-pro") }}
                        </div>
                    </button>
                </div>
            
                <div class="ascwo-relative" id="monTableau">
                    <table class="ascwo-text-center ascwo-border ascwo-border-collapse ascwo-border-0 ascwo-w-full">
                        <thead class="ascwo-bg-[#f0f0f1]">
                            <tr class="">
                                
                                <th scope="col" class="ascwo-px-6 ascwo-py-3 ascwo-text-[14px] ascwo-font-semibold">
                                    {{ __("Title", "all-signs-customizer-for-woocommerce-pro") }}
                                </th>
                                <th scope="col" class="ascwo-px-6 ascwo-py-3 ascwo-text-[14px] ascwo-font-semibold">
                                    {{ __("Description", "all-signs-customizer-for-woocommerce-pro") }}
                                </th>
                                <th scope="col" class="ascwo-px-6 ascwo-py-3 ascwo-text-[14px] ascwo-font-semibold">
                                    {{ __("icon", "all-signs-customizer-for-woocommerce-pro") }}
                                </th>
                                <th scope="col" class="ascwo-px-6 ascwo-py-3 ascwo-text-[14px] ascwo-font-semibold">
                                    {{ __("Default", "all-signs-customizer-for-woocommerce-pro") }}
                                </th>
                                <th scope="col" class="ascwo-px-6 ascwo-py-3 ascwo-text-[14px] ascwo-font-semibold">
                                    {{ __("Action", "all-signs-customizer-for-woocommerce-pro") }}
                                </th>
                                
                            </tr>
                        </thead>
                        <tbody class="ascwo-bg-white">
                            <tr v-if="isFetching">
                                <td colspan="5">
                                    <div class="ascwo-bg-white ascwo-border-solid ascwo-border ascwo-border-[#D1D1D1] ascwo-flex ascwo-flex-col ascwo-space-y-2 ascwo-justify-center ascwo-items-center ascwo-w-full ascwo-h-[200px] p-4">
                                        <img class="ascwo-w-[100px] ascwo-h-[100px]" src="@/../assets/icons/ic_loading.svg" alt="">
                                    </div>
                                </td>
                            </tr>
                            <tr v-if="components.length == 0 && !isFetching">
                                <td colspan="5">
                                    <div class="ascwo-bg-white ascwo-border-solid ascwo-border ascwo-border-[#D1D1D1] ascwo-flex ascwo-flex-col ascwo-space-y-12 ascwo-justify-center ascwo-items-center ascwo-py-10 ascwo-h-[150px]">
                                        <div class="ascwo-flex ascwo-flex-col ascwo-space-y-2 ascwo-justify-center ascwo-items-center">
                                            <p class="ascwo-text-2xl ascwo-font-bold">{{noComponentAdvancesFound}}</p>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr
                                v-for="(component,key) in components"
                                :key="key"
                                class="ascwo-border-t-0 ascwo-border-l-0 ascwo-border-r-0 ascwo-border-b-2 ascwo-border-solid ascwo-border-[#f0f0f1] ascwo-cursor-pointer hover:ascwo-bg-gray-50"
                                @click="goToOptions(component, key)"
                            >
                                <td class="ascwo-px-6 ascwo-py-2 ascwo-flex ascwo-justify-center ascwo-space-x-2">
                                    <span class="ascwo-w-5 ascwo-h-5 ascwo-p-1 ascwo-px-1 ascwo-flex ascwo-justify-center ascwo-rounded-full ascwo-bg-[#f0f0f1] ascwo-border ascwo-border-solid ascwo-border-black ">
                                        <span class="ascwo-text-[12px]">{{getInitials(component.name)}}</span> 
                                    </span>
                                    <span class="ascwo-py-1 ascwo-text-[14px]">
                                        {{component.name || component.title}}
                                    </span>
                                </td>
                                <td class="ascwo-px-6 ascwo-py-2 ascwo-text-center ascwo-text-[11px]">
                                    {{component.description}}
                                </td>
                                <td class="ascwo-px-6 ascwo-justify-center ascwo-translate-y-1">
                                    <img v-if="component.icon.trim() != ''" class="ascwo-w-10 ascwo-h-10" :src="component.icon" />
                                </td>
                                <td class="ascwo-pl-10 ascwo-py-2 ascwo-justify-center" @click.stop>
                                    <span class="ascwo-w-fit ascwo-flex ascwo-items-center ascwo-translate-x-5 ascwo-translate-y-0.5">
                                        <label for="ascwo-toggle" @click.stop="!isLoading?selectDefault(key):''" class="ascwo-cursor-pointer ascwo-bg-[#F8F8FF] ascwo-border-[1px] ascwo-border-solid ascwo-border-black ascwo-w-6 ascwo-h-0.5 ascwo-rounded-full ascwo-p-1">
                                            <div :class="{'ascwo-translate-x-[100%]': components[key].isDefault, 'ascwo-bg-active': components[key].isDefault }" class="ascwo-toggle-dot ascwo-w-2.5 ascwo-h-2.5 ascwo-duration-100 -ascwo-translate-y-[8px] -ascwo-translate-x-2 ascwo-border-[4px] ascwo-border-solid ascwo-border-[#008000] ascwo-bg-[#D9D9D9] ascwo-rounded-full ascwo-shadow-md ascwo-transform"></div>
                                        </label>
                                    </span>
                                </td>
                                <td class="ascwo-px-6 ascwo-py-2 ascwo-flex ascwo-justify-center ascwo-items-center" @click.stop>
                                    <div class="ascwo-relative">
                                        <button
                                            class="ascwo-w-7 ascwo-h-7 ascwo-bg-white ascwo-cursor-pointer ascwo-border ascwo-border-gray-300 ascwo-rounded-lg ascwo-flex ascwo-items-center ascwo-justify-center ascwo-shadow-sm hover:ascwo-bg-gray-100 ascwo-transition"
                                            @click.stop="(e) => handleOpenComponentParams(key, e)"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="ascwo-w-5 ascwo-h-5">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                                            </svg>
                                        </button>
                                        <div
                                            v-if="showParams[key]"
                                            class="ascwo-bg-white ascwo-shadow-lg ascwo-flex ascwo-flex-col ascwo-p-2 ascwo-fixed ascwo-z-[20000] ascwo-rounded ascwo-min-w-[160px] ascwo-border ascwo-border-gray-200"
                                            :style="{
                                                top: dropdownPositions[key]?.top ? `${dropdownPositions[key].top}px` : 'auto',
                                                left: dropdownPositions[key]?.left ? `${dropdownPositions[key].left}px` : 'auto'
                                            }"
                                            @click.stop
                                        >
                                            <button
                                                class="ascwo-bg-transparent ascwo-border-none ascwo-cursor-pointer ascwo-w-full ascwo-px-3 ascwo-py-2 ascwo-text-left hover:ascwo-bg-gray-100"
                                                @click="goToOptions(component, key)"
                                            >
                                                {{ __("Manage options", "all-signs-customizer-for-woocommerce-pro") }}
                                            </button>
                                            <button
                                                class="ascwo-bg-transparent ascwo-border-none ascwo-cursor-pointer ascwo-w-full ascwo-px-3 ascwo-py-2 ascwo-text-left hover:ascwo-bg-gray-100"
                                                @click="() => { selectComponent(key, component); closeAllParams(); }"
                                            >
                                                {{ __("Edit", "all-signs-customizer-for-woocommerce-pro") }}
                                            </button>
                                            <button
                                                class="ascwo-bg-transparent ascwo-border-none ascwo-cursor-pointer ascwo-w-full ascwo-px-3 ascwo-py-2 ascwo-text-left hover:ascwo-bg-gray-100 ascwo-text-red-700"
                                                @click="() => { selectComponent(key, component, true); closeAllParams(); }"
                                            >
                                                {{ __("Delete", "all-signs-customizer-for-woocommerce-pro") }}
                                            </button>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div class="ascwo-space-y-1 ascwo-bg-white ascwo-border-solid ascwo-border-2 ascwo-rounded-[10px] ascwo-p-2 ascwo-border-[#D1D1D1]" v-if="isNewComponent">
            <div class="ascwo-text-[16px] ascwo-font-bold ascwo-px-1 ascwo-py-2 ">
                {{ __("Add component", "all-signs-customizer-for-woocommerce-pro") }}
            </div>
            <hr class="Polaris-Divider ascwo-w-full" style="border: 1px solid #ebebeb;">
            <div class="ascwo-px-4 ascwo-py-4 ascwo-pb-20">
                <div class="ascwo-flex ascwo-justify-between ascwo-space-x-2 ascwo-py-4">
                    <div class="ascwo-w-[50%] ascwo-space-y-2 ascwo-flex ascwo-flex-col ascwo-text-[14px]">
                        <label for="" class="ascwo-font-normal">{{ __("Title", "all-signs-customizer-for-woocommerce-pro") }}</label>
                        <input type="text" v-model="component.name" class="ascwo-rounded ascwo-w-full ascwo-h-[35px]" style="border-radius: 5px !important;">
                    </div>
                    <div class="ascwo-w-[50%] ascwo-space-y-2 ascwo-flex ascwo-flex-col ascwo-text-[12px]">
                        <label for="" class="ascwo-font-normal">{{ __("Description", "all-signs-customizer-for-woocommerce-pro") }}</label>
                        <input type="text" v-model="component.description" class="ascwo-rounded ascwo-w-full ascwo-h-[35px]" style="border-radius: 5px !important;">
                    </div>
                </div>
                <div class="ascwo-space-y-2 ascwo-flex ascwo-flex-col ascwo-text-[12px]">
                    <label for="" class="ascwo-font-normal">{{ __("Upload icon", "all-signs-customizer-for-woocommerce-pro") }}</label>
                    <div class="ascwo-flex ascwo-flex-col ascwo-space-y-2 ascwo-w-full">
                        <div class="ascwo-flex ascwo-space-x-2 ascwo-border ascwo-border-solid ascwo-rounded-[5px] ascwo-border-[#000] ascwo-p-1">
                            <button @click="selectComponentIcon" class="ascwo-bg-[#016464] ascwo-border-none ascwo-w-fit ascwo-h-fit ascwo-p-2 ascwo-rounded ascwo-px-4 ascwo-text-white ascwo-opacity-90 hover:ascwo-opacity-100 ascwo-text-[10px] ascwo-cursor-pointer">{{ __("upload Icon", "all-signs-customizer-for-woocommerce-pro") }}</button>
                            <div :class="`ascwo-relative ascwo-w-[82px] ascwo-h-[30px] ascwo-rounded-md ascwo-overflow-hidden`">
                                    <img v-if="component.icon != ''" :src="component.icon" alt="" class="ascwo-absolute ascwo-w-full ascwo-h-full">
                                    <button v-if="component.icon != ''" @click="()=>{component.icon = ''}" :class="`ascwo-bg-[#016464] ascwo-absolute ascwo-bottom-0 ascwo-right-0 ascwo-text-white ascwo-p-1 ascwo-rounded-tl-lg ascwo-border-none`">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="ascwo-w-4 ascwo-h-4">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                        </svg>
                                    </button>
                                </div>
                        </div>
                    </div>
                        
                    
                </div>
                
            </div>
            <hr class="Polaris-Divider ascwo-w-full" style="border: 1px solid #ebebeb;">
            <div class="ascwo-flex ascwo-space-x-4 ascwo-px-4 ascwo-py-4 ascwo-justify-end ascwo-items-end">
                <div class="ascwo-bg-[#016464] ascwo-rounded">
                    <button :disabled="isLoading" class="ascwo-flex ascwo-bg-transparent ascwo-w-fit ascwo-space-x-2 ascwo-h-fit ascwo-px-8 ascwo-p-2 ascwo-border-none ascwo-text-white ascwo-opacity-90 hover:ascwo-border-none hover:ascwo-text-white hover:ascwo-opacity-100 ascwo-cursor-pointer" @click="back">
                        <svg class="ascwo-w-6 ascwo-h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 12L5 8V11L17.17 11C17.3756 10.414 17.7586 9.90661 18.2657 9.54821C18.7729 9.18981 19.379 8.9982 20 9C20.7956 9 21.5587 9.31607 22.1213 9.87868C22.6839 10.4413 23 11.2044 23 12C23 12.7956 22.6839 13.5587 22.1213 14.1213C21.5587 14.6839 20.7956 15 20 15C18.69 15 17.58 14.17 17.17 13L5 13V16L1 12Z" fill="currentColor"/>
                        </svg>

                        <div class="ascwo-font-semibold ascwo-text-[16px]">{{ __("Back", "all-signs-customizer-for-woocommerce-pro") }}</div>
                    </button>
                </div>
                <div class="ascwo-bg-[#016464] ascwo-rounded" v-if="isEdit">
                    <button @click="updateComponent" :class="`ascwo-rounded ascwo-flex ${!isLoading ? 'ascwo-bg-amber-400 ' :'ascwo-bg-amber-500'} ascwo-w-fit ascwo-space-x-2 ascwo-h-fit ascwo-px-8 ascwo-text-white ascwo-p-2 ascwo-border-none ascwo-opacity-90 hover:ascwo-border-none hover:ascwo-text-white hover:ascwo-opacity-100 ascwo-cursor-pointer`">
                        <img src="@/../assets/icons/ic_loading_gray.svg" class="ascwo-w-5 ascwo-w-5" v-if="isLoading" :disabled="isLoading"/>
                        <div class="ascwo-font-semibold ascwo-text-[16px]">{{ __("Update", "all-signs-customizer-for-woocommerce-pro") }}</div>
                    </button>
                </div>
                <div class="ascwo-bg-[#016464] ascwo-rounded" v-if="!isEdit">
                    <button @click="addComponent" class="ascwo-flex ascwo-bg-transparent ascwo-w-fit ascwo-space-x-2 ascwo-h-fit ascwo-text-white ascwo-px-8 ascwo-p-2.5 ascwo-rounded ascwo-border-none ascwo-opacity-90 hover:ascwo-opacity-100 hover:ascwo-border-none hover:ascwo-text-white hover:ascwo-bg-[#016464] ascwo-cursor-pointer">
                        <div class="ascwo-translate-y-1">
                            <img src="@/../assets/icons/ic_loading_gray.svg" class="ascwo-w-5 ascwo-w-5" v-if="isLoading" :disabled="isLoading"/>
                            <svg v-if="!isLoading" class="ascwo-w-4 ascwo-h-4" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2.5 1.25C2.16848 1.25 1.85054 1.3817 1.61612 1.61612C1.3817 1.85054 1.25 2.16848 1.25 2.5V17.5C1.25 17.8315 1.3817 18.1495 1.61612 18.3839C1.85054 18.6183 2.16848 18.75 2.5 18.75H17.5C17.8315 18.75 18.1495 18.6183 18.3839 18.3839C18.6183 18.1495 18.75 17.8315 18.75 17.5V2.5C18.75 2.16848 18.6183 1.85054 18.3839 1.61612C18.1495 1.3817 17.8315 1.25 17.5 1.25H11.875C11.5435 1.25 11.2255 1.3817 10.9911 1.61612C10.7567 1.85054 10.625 2.16848 10.625 2.5V11.6163L13.9325 8.3075C14.0499 8.19014 14.209 8.12421 14.375 8.12421C14.541 8.12421 14.7001 8.19014 14.8175 8.3075C14.9349 8.42486 15.0008 8.58403 15.0008 8.75C15.0008 8.91597 14.9349 9.07514 14.8175 9.1925L10.4425 13.5675C10.3844 13.6257 10.3155 13.6719 10.2395 13.7034C10.1636 13.7349 10.0822 13.7511 10 13.7511C9.91779 13.7511 9.83639 13.7349 9.76046 13.7034C9.68453 13.6719 9.61556 13.6257 9.5575 13.5675L5.1825 9.1925C5.12439 9.13439 5.07829 9.0654 5.04685 8.98948C5.0154 8.91356 4.99921 8.83218 4.99921 8.75C4.99921 8.66782 5.0154 8.58644 5.04685 8.51052C5.07829 8.4346 5.12439 8.36561 5.1825 8.3075C5.24061 8.24939 5.3096 8.20329 5.38552 8.17185C5.46144 8.1404 5.54282 8.12421 5.625 8.12421C5.70718 8.12421 5.78856 8.1404 5.86448 8.17185C5.9404 8.20329 6.00939 8.24939 6.0675 8.3075L9.375 11.6163V2.5C9.375 1.83696 9.63839 1.20107 10.1072 0.732233C10.5761 0.263392 11.212 0 11.875 0L17.5 0C18.163 0 18.7989 0.263392 19.2678 0.732233C19.7366 1.20107 20 1.83696 20 2.5V17.5C20 18.163 19.7366 18.7989 19.2678 19.2678C18.7989 19.7366 18.163 20 17.5 20H2.5C1.83696 20 1.20107 19.7366 0.732233 19.2678C0.263392 18.7989 0 18.163 0 17.5V2.5C0 1.83696 0.263392 1.20107 0.732233 0.732233C1.20107 0.263392 1.83696 0 2.5 0L5.625 0C5.79076 0 5.94973 0.065848 6.06694 0.183058C6.18415 0.300269 6.25 0.45924 6.25 0.625C6.25 0.79076 6.18415 0.949732 6.06694 1.06694C5.94973 1.18415 5.79076 1.25 5.625 1.25H2.5Z" fill="white"/>
                            </svg>
                        </div>

                        <span class="ascwo-font-semibold ascwo-text-[16px]">{{ __("Save", "all-signs-customizer-for-woocommerce-pro") }}</span>
                    </button>
                </div>
            </div>
        </div>
        <!-- Delete Modal-->
        <div v-if="openModal" @click.self="closeModal" class="ascwo-z-[999] ascwo-bg-gray-400 ascwo-overflow-y-auto ascwo-overflow-x-hidden ascwo-fixed ascwo-top-0 ascwo-right-[25%] ascwo-left-[75%]  ascwo-flex ascwo-justify-center ascwo-items-center ascwo-w-full md:ascwo-inset-0 ascwo-h-full">
            <div class="ascwo-relative ascwo-p-4 ascwo-w-full ascwo-max-w-md ascwo-max-h-full">
                <div class="ascwo-relative ascwo-bg-white ascwo-rounded-lg ascwo-shadow dark:bg-gray-700">
                    <button @click.stop="closeModal" type="button" :class="`${isLoading ? 'ascwo-cursor-not-allowed' : 'ascwo-cursor-pointer'} ascwo-absolute ascwo-top-3 ascwo-end-2.5 ascwo-text-gray-400 ascwo-bg-transparent hover:bg-gray-200 hover:text-gray-900 ascwo-rounded-lg ascwo-text-sm ascwo-w-8 ascwo-h-8 ascwo-ms-auto ascwo-inline-flex ascwo-justify-center ascwo-items-center dark:hover:bg-gray-600 dark:hover:text-white`" data-modal-hide="popup-modal">
                        <svg class="ascwo-w-3 ascwo-h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                        <span class="ascwo-sr-only">{{ __("Close modal", "all-signs-customizer-for-woocommerce-pro") }}</span>
                    </button>
                    <div class="ascwo-p-4 md:p-5 ascwo-text-center">
                        <svg class="ascwo-mx-auto ascwo-mb-4 ascwo-text-gray-400 ascwo-w-12 ascwo-h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                        </svg>
                        <h3 class="ascwo-mb-5 ascwo-text-lg ascwo-font-normal ascwo-text-gray-500 dark:text-gray-400">{{ __("Are you sure you want to delete this component advance?", "all-signs-customizer-for-woocommerce-pro") }}</h3>
                        <input :value="component.name || component.title" readonly class="ascwo-rounded ascwo-w-full ascwo-h-[35px] ascwo-text-center ascwo-p-4 ascwo-my-2 ascwo-border-none" />
                        <button @click="deleteComponent" data-modal-hide="popup-modal" type="button" :class="`ascwo-border-solid ascwo-text-white ${!isLoading ? 'ascwo-bg-red-600 ascwo-cursor-pointer' :'ascwo-bg-red-700 ascwo-cursor-not-allowed'} hover:bg-red-800 focus:ring-4 focus:outline-none ascwo-my-2 ascwo-border-none  focus:ring-red-300 dark:focus:ring-red-800 ascwo-font-medium ascwo-rounded-lg ascwo-text-sm ascwo-inline-flex ascwo-items-center ascwo-px-5 ascwo-py-2.5 ascwo-text-center`">
                            <img src="@/../assets/icons/ic_loading_gray.svg" class="ascwo-w-5 ascwo-w-5" v-if="isLoading" :disabled="isLoading"/>
                            {{ __("Yes, I'm sure", "all-signs-customizer-for-woocommerce-pro") }}
                        </button>
                        <button @click.stop="closeModal" data-modal-hide="popup-modal" type="button" :class="`ascwo-border-solid ascwo-py-2.5 ascwo-px-5 ascwo-ms-3 ascwo-text-sm ascwo-font-medium ascwo-text-gray-900 ascwo-my-2  ascwo-border-gray-500 ascwo-border-white focus:outline-none ascwo-bg-white ascwo-rounded-lg ascwo-border ascwo-border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 ${isLoading ? 'ascwo-cursor-not-allowed' : 'ascwo-cursor-pointer'}`">{{ __("No, cancel", "all-signs-customizer-for-woocommerce-pro") }}</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import api from "@/admin/Api/api";
    import { ref,onMounted, watch, onBeforeUnmount } from "vue";
    import { useRoute } from 'vue-router';
    import toastMessage from "@/admin/utils/functions";
    import router from '@/admin/router'

    const route = useRoute()
    const slugify = (value) =>
        String(value ?? '')
            .trim()
            .toLowerCase()
            .split(' ')
            .filter(Boolean)
            .join('-')

    const configId = ref(route.params.configId);
    import { __, _x, _n, _nx, sprintf, setLocaleData } from "@wordpress/i18n";
const config = ref(String(route.params.config ?? '').replace(/-/g,' '));
    const isFetching = ref(false);
    const isNewComponent = ref(false);
    const isLoading = ref(false);
    const components = ref([]);
    const selectedComponentId = ref(null);
    const showParams = ref([]);
    const dropdownPositions = ref([]);

    const isEdit = ref(false);
    const openModal = ref(false);
    const noComponentAdvancesFound = ref('');
    const component = ref({
        name:"",
        description:"",
        icon:"",
        options:[]
    });

    onMounted(async ()=>{
        isFetching.value = true;
        await fetchComponents();
        isFetching.value = false;
        document.addEventListener('click', closeAllParams);
    });

    watch(
      () => route.params.configId,
      async (nextConfigId) => {
        configId.value = nextConfigId;
        selectedComponentId.value = null;
        isNewComponent.value = false;
        isEdit.value = false;
        isFetching.value = true;
        await fetchComponents();
        isFetching.value = false;
      }
    );

    onBeforeUnmount(() => {
      document.removeEventListener('click', closeAllParams);
    });

    const goToMaterials = ()=>{
        router.push({ name: 'materials', params: { configId: configId.value } });
    }

    const fetchComponents = async () => {
    const response = await api.getRequiredOptionComponents(configId.value);

    if (!response?.message) {
            const comps = Array.isArray(response?.items)
                ? response.items
                : [];
            components.value = comps.map((item) => ({
                ...item,
                name: item?.name || item?.title || '',
                title: item?.title || item?.name || '',
            }));
            showParams.value = comps.map(() => false);
            dropdownPositions.value = comps.map(() => ({ top: null, left: null }));
            noComponentAdvancesFound.value = comps.length === 0 ? "No data Found" : "";
        } else {
            noComponentAdvancesFound.value = response.message;
            components.value = [];
            showParams.value = [];
            dropdownPositions.value = [];
        }
    };

    const updateComponent = async () => {
        isLoading.value = true;
        const result = await api.updateRequiredOptionComponent(configId.value, selectedComponentId.value, {
            ...component.value,
            title: component.value.title || component.value.name,
        });
        if(result.success){
            await fetchComponents();
            if(result.success == true ) {
                toastMessage(result.message);
            }else{
                toastMessage(result.message,"warning");
            }
            isLoading.value = false;
            isNewComponent.value = false;
            openModal.value = false;
            component.value = {
                name:"",
                description:"",
                icon:"",
                options:[]
            };
        }else{
            isLoading.value = false;
            toastMessage(result.message,"error");
            isNewComponent.value = false;
            openModal.value = false;
            component.value = {
                name:"",
                description:"",
                icon:"",
                options:[]
            };
        }
    };

    const updateComponents = async () =>{
        isLoading.value = true;
        const result = await api.updateRequiredOptionComponents(configId.value, components.value);
        if(result.success){
            await fetchComponents();
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
    }

    const selectComponent = (id,selectedComponent,isDeleting=false) => {
        if(isDeleting){
            selectedComponentId.value = id;
            component.value = selectedComponent;
            closeModal();
        }else{
            component.value = selectedComponent;
            selectedComponentId.value = id;
            isEdit.value = true;
            isNewComponent.value = true;
        }
    };

    const addComponent = async () => {
        isLoading.value = true;
        const result = await api.addRequiredOptionComponent(configId.value, {
            ...component.value,
            title: component.value.title || component.value.name,
        });
        if(result.success){
            await fetchComponents();
            isLoading.value = false;
            toastMessage(result.message);
            isNewComponent.value = false;
            openModal.value = false;
            component.value = {
                name:"",
                description:"",
                icon:"",
                options:[]
            };
        }else{
            isLoading.value = false;
            toastMessage(result.message,"error");
            isNewComponent.value = false;
            openModal.value = false;
            component.value = {
                name:"",
                description:"",
                icon:"",
                options:[]
            };
        }
    };
    

    const deleteComponent = async () => {
        isLoading.value = true;
        const result = await api.deleteRequiredOptionComponent(configId.value, selectedComponentId.value);
        if(result.success){
            await fetchComponents();
            isLoading.value = false;
            toastMessage(result.message);
            isNewComponent.value = false;
            openModal.value = false;
            component.value = {
                name:"",
                description:"",
                icon:"",
                options:[]
            };
        }else{
            isLoading.value = false;
            toastMessage(result.message,"error");
            isNewComponent.value = false;
            openModal.value = false;
            component.value = {
                name:"",
                description:"",
                icon:"",
                options:[]
            };
        }
    };

    const newComponent = () =>{
        isNewComponent.value = true;
    }
    const back = () =>{
        isNewComponent.value = false;
    };


    const getInitials = (str) => {
        const words = String(str || '').split(' ');
        const initials = words.map(word => word.trim().charAt(0).toUpperCase());
        const result = initials.join('');
        return result;
    };

    const closeModal = () => {
        openModal.value = !openModal.value;
    };

    const selectComponentIcon = async(e) => { 
        e.preventDefault();
        var uploader = wp.media(
            {
                title: __("Select Component Advance Icon","all-signs-customizer-for-woocommerce-pro"),
                button: {
                    text: __("Select Icon","all-signs-customizer-for-woocommerce-pro")
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
                                component.value.icon = (attachment.url);
                            }
                        }
                    );
                }
            )
            .open();
    }
const handleOpenComponentParams = (idx, event) => {
    event?.stopPropagation();
    showParams.value = showParams.value.map((_, i) => i === idx ? !showParams.value[i] : false);
    const rect = event?.currentTarget?.getBoundingClientRect?.();
    if (rect) {
        dropdownPositions.value[idx] = {
            top: rect.bottom + 8 + window.scrollY,
            left: rect.right - 140 + window.scrollX,
        };
    }
};

const closeAllParams = () => {
    showParams.value = showParams.value.map(() => false);
};

    const goToOptions = (component, idx) => {
        closeAllParams();
        router.push({
            name: 'required-component-options',
            params: {
                configId: configId.value,
                componentId: component.id || idx,
            },
        });
    };

const selectDefault = async(key) =>{
    components.value[key].isDefault = true;
    for(let i=0; i<components.value.length; i++){
        if(i != key ){
            components.value[i].isDefault = false;
        }
    }
await updateComponents();
}
</script>
