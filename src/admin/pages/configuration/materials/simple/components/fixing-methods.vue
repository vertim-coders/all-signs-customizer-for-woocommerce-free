<template>
    <div>
        <div class="asowp-space-y-1 asowp-translate-y-2 asowp-bg-[#fff] asowp-p-4 asowp-rounded-[10px] asowp-border-[2px] asowp-border-solid asowp-border-[#d9d9d9]" v-if="!isNewFixing">
            <div class="asowp-flex asowp-justify-end  asowp-px-4 asowp-py-4 asowp-pb-2" v-if="manageFixingMethods.length < 0">
                <button :disabled="isLoading" :class="`asowp-flex asowp-w-fit asowp-h-fit asowp-rounded asowp-bg-[#016464] asowp-px-4 asowp-space-x-2 asowp-p-1.5 asowp-border-none asowp-text-white asowp-opacity-90 hover:asowp-opacity-100 ${isLoading?'asowp-cursor-not-allowed':'asowp-cursor-pointer'}`" @click="newFixing">
                    <svg class="asowp-w-5 asowp-h-5" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="plus-lg">
                        <path id="Vector" fill-rule="evenodd" clip-rule="evenodd" d="M11 2.75C11.1823 2.75 11.3572 2.82243 11.4861 2.95136C11.6151 3.0803 11.6875 3.25516 11.6875 3.4375V10.3125H18.5625C18.7448 10.3125 18.9197 10.3849 19.0486 10.5139C19.1776 10.6428 19.25 10.8177 19.25 11C19.25 11.1823 19.1776 11.3572 19.0486 11.4861C18.9197 11.6151 18.7448 11.6875 18.5625 11.6875H11.6875V18.5625C11.6875 18.7448 11.6151 18.9197 11.4861 19.0486C11.3572 19.1776 11.1823 19.25 11 19.25C10.8177 19.25 10.6428 19.1776 10.5139 19.0486C10.3849 18.9197 10.3125 18.7448 10.3125 18.5625V11.6875H3.4375C3.25516 11.6875 3.0803 11.6151 2.95136 11.4861C2.82243 11.3572 2.75 11.1823 2.75 11C2.75 10.8177 2.82243 10.6428 2.95136 10.5139C3.0803 10.3849 3.25516 10.3125 3.4375 10.3125H10.3125V3.4375C10.3125 3.25516 10.3849 3.0803 10.5139 2.95136C10.6428 2.82243 10.8177 2.75 11 2.75Z" fill="white"/>
                        </g>
                    </svg>
                    <div class="asowp-text-[14px]">
                        {{__("Add new fixing method", "all-signs-options-pro")}}
                    </div>
                </button>
            </div>
            <div class="asowp-relative" id="monTableau">
                <table class="asowp-w-full asowp-px-4 asowp-border asowp-border-collapse asowp-border-0">
                    <thead class="asowp-text-[14px] asowp-text-center asowp-bg-[#f0f0f1]">
                        <tr class="">
                            <th scope="col" class="asowp-p-4 asowp-px-8 asowp-w-12 asowp-font-normal">
                                {{__("Title", "all-signs-options-pro")}} 
                            </th>
                            <th scope="col" class="asowp-px-6 asowp-font-normal">
                                {{__("Icon", "all-signs-options-pro")}}
                            </th>
                            <th scope="col" class="asowp-px-6 asowp-font-normal">
                                {{__("Additional Price", "all-signs-options-pro")}}
                            </th>
                            <th scope="col" class="asowp-px-6 asowp-font-normal">
                                {{__("Default", "all-signs-options-pro")}}
                            </th>
                            <th scope="col" class="asowp-px-6 asowp-font-normal">
                                {{__("Action", "all-signs-options-pro")}}
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
                        <tr v-if="fixingMethods.length == 0 && !isFetching">
                            <td colspan="7">
                                <div class="asowp-bg-white asowp-border-solid asowp-border asowp-border-[#D1D1D1] asowp-flex asowp-flex-col asowp-space-y-12 asowp-justify-center asowp-items-center asowp-py-10 asowp-h-[150px]">
                                    <div class="asowp-flex asowp-flex-col asowp-space-y-2 asowp-justify-center asowp-items-center">
                                        <p class="asowp-text-2xl asowp-font-bold">{{noFixingMethodsFound}}</p>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        
                        <tr v-for="(fx, key) in fixingMethods" :key=key class="asowp-border-t-0 asowp-border-l-0 asowp-border-r-0 asowp-border-b-2 asowp-border-solid asowp-border-[#f0f0f1]">
                            <td class="asowp-w-28 asowp-text-center asowp-px-8 asowp-p-4">
                                {{manageFixingMethods[fx.fixingMethodId].name}}
                            </td>
                            <td class="asowp-px-6 asowp-flex asowp-justify-center asowp-space-x-2">
                                <img :src="manageFixingMethods[fx.fixingMethodId].icon" class="asowp-w-[30px] asowp-h-[30px]" v-if="manageFixingMethods[fx.fixingMethodId].icon.trim() != ''"/>
                            </td>
                            <td class="asowp-text-[12px] asowp-text-center asowp-px-6 asowp-py-2">
                                <span class="asowp-w-fit asowp-rounded-lg asowp-px-2 asowp-p-1 asowp-bg-[#f0f0f0] asowp-text-[#686868] asowp-border-none">
                                    {{fx.additionalPrice}}
                                </span>
                            </td>
                            <td class="asowp-pl-14 asowp-py-2">
                                <span class="asowp-w-fit asowp-flex asowp-items-center asowp-translate-x-5 asowp-translate-y-0.5">
                                    <label for="asowp-toggle" @click="!isLoading?selectDefault(key):''" class="asowp-cursor-pointer asowp-bg-[#F8F8FF] asowp-border-[1px] asowp-border-solid asowp-border-black asowp-w-6 asowp-h-0.5 asowp-rounded-full asowp-p-1">
                                        <div :class="fx.isDefault ? 'asowp-translate-x-[100%] asowp-border-[#016464]': 'asowp-border-[#FFFFFF]'" class="asowp-toggle-dot asowp-w-2.5 asowp-h-2.5 asowp-duration-100 -asowp-translate-y-[8px] -asowp-translate-x-2 asowp-border-[4px] asowp-border-solid asowp-bg-[#D9D9D9] asowp-rounded-full asowp-shadow-md asowp-transform"></div>
                                    </label>
                                </span>
                            </td>
                            <td class="asowp-px-6 asowp-text-center">
                                <div class="asowp-flex asowp-justify-center asowp-items-center asowp-relative">
                                    <button
                                        class="asowp-w-7 asowp-h-7 asowp-bg-white asowp-cursor-pointer asowp-border asowp-border-gray-300 asowp-rounded-lg asowp-flex asowp-items-center asowp-justify-center asowp-shadow-sm hover:asowp-bg-gray-100 asowp-transition"
                                        @click.stop="handleOpenFixingParams(key)"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke-width="1.5"
                                            stroke="currentColor"
                                            class="asowp-w-6 asowp-h-6"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                                            />
                                        </svg>
                                    </button>
                                    <div
                                        class="asowp-absolute asowp-top-0 asowp-right-0 asowp-w-40 asowp-bg-white asowp-shadow-lg asowp-rounded-xl asowp-py-2 asowp-z-[999] asowp-border asowp-border-gray-100"
                                        style="max-width: 6rem; max-height: 31.25rem; border-radius: 0.75rem; padding: 0.375rem;"
                                        v-if="showParams[key]"
                                        @click.self="showParams[key] = false"
                                    >
                                        <!-- Edit -->
                                        <button
                                            class="asowp-bg-transparent asowp-border-none asowp-cursor-pointer asowp-w-full asowp-px-4 asowp-py-2 asowp-flex asowp-items-center asowp-gap-3 asowp-hover asowp-transition"
                                            style="padding: .25rem .375rem; border-radius: .5rem;"
                                            @click.stop="selectMaterialFixingMethod(key, fx); showParams[key] = false"
                                        >
                                            <svg 
                                                viewBox="0 0 20 20" 
                                                class="asowp-w-5 asowp-h-5 asowp-text-[#303030]" 
                                                focusable="false" 
                                                fill="#303030"
                                                aria-hidden="true">
                                                <path 
                                                    fill-rule="evenodd" 
                                                    d="M15.655 4.344a2.695 2.695 0 0 0-3.81 0l-.599.599-.009-.009-1.06 1.06.008.01-5.88 5.88a2.75 2.75 0 0 0-.805 1.944v1.922a.75.75 0 0 0 .75.75h1.922a2.75 2.75 0 0 0 1.944-.806l7.54-7.539a2.695 2.695 0 0 0 0-3.81Zm-4.409 2.72-5.88 5.88a1.25 1.25 0 0 0-.366.884v1.172h1.172c.331 0 .65-.132.883-.366l5.88-5.88-1.689-1.69Zm2.75.629.599-.599a1.195 1.195 0 1 0-1.69-1.689l-.598.599 1.69 1.689Z">
                                                </path>
                                            </svg>
                                            <span class="asowp-text-[.8125rem] asowp-font-[450] asowp-text-[#303030]">{{__("Edit", "all-signs-options-pro")}}</span>
                                        </button>

                                        <!-- Delete -->
                                        <button
                                            class="asowp-bg-transparent asowp-border-none asowp-cursor-pointer asowp-w-full asowp-px-4 asowp-py-2 asowp-flex asowp-items-center asowp-gap-3 asowp-hover-delete asowp-transition"
                                            style="padding: .25rem .375rem; border-radius: .5rem;"
                                            @click.stop="selectMaterialFixingMethod(key, fx, true); showParams[key] = false"
                                        >
                                            <svg 
                                                viewBox="0 0 20 20" 
                                                class="asowp-w-5 asowp-h-5" 
                                                fill="rgb(142, 31, 11)"
                                                focusable="false" 
                                                aria-hidden="true">
                                                <path 
                                                    d="M11.5 8.25a.75.75 0 0 1 .75.75v4.25a.75.75 0 0 1-1.5 0v-4.25a.75.75 0 0 1 .75-.75Z">
                                                </path>
                                                <path 
                                                    d="M9.25 9a.75.75 0 0 0-1.5 0v4.25a.75.75 0 0 0 1.5 0v-4.25Z">
                                                </path>
                                                <path 
                                                    fill-rule="evenodd" 
                                                    d="M7.25 5.25a2.75 2.75 0 0 1 5.5 0h3a.75.75 0 0 1 0 1.5h-.75v5.45c0 1.68 0 2.52-.327 3.162a3 3 0 0 1-1.311 1.311c-.642.327-1.482.327-3.162.327h-.4c-1.68 0-2.52 0-3.162-.327a3 3 0 0 1-1.311-1.311c-.327-.642-.327-1.482-.327-3.162v-5.45h-.75a.75.75 0 0 1 0-1.5h3Zm1.5 0a1.25 1.25 0 1 1 2.5 0h-2.5Zm-2.25 1.5h7v5.45c0 .865-.001 1.423-.036 1.848-.033.408-.09.559-.128.633a1.5 1.5 0 0 1-.655.655c-.074.038-.225.095-.633.128-.425.035-.983.036-1.848.036h-.4c-.865 0-1.423-.001-1.848-.036-.408-.033-.559-.09-.633-.128a1.5 1.5 0 0 1-.656-.655c-.037-.074-.094-.225-.127-.633-.035-.425-.036-.983-.036-1.848v-5.45Z">
                                                </path>
                                            </svg>
                                            <span class="asowp-text-[.8125rem] asowp-font-[450]" style="color:rgb(142, 31, 11);">{{__("Delete", "all-signs-options-pro")}}</span>
                                        </button>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="asowp-space-y-2 asowp-translate-y-2 asowp-bg-[#fff] asowp-p-4 asowp-rounded-[10px] asowp-border-[2px] asowp-border-solid asowp-border-[#d9d9d9]" v-if="isNewFixing">
            <!--<div class="asowp-text-[16px] asowp-font-bold asowp-px-4 asowp-py-4 ">
                {{isEdit ? 'Edit fixing methiod' : 'Add new fixing methods' }}
            </div>-->
            <hr class="Polaris-Divider" style="border: 4px solid #ebebeb;">
            <div class="asowp-flex asowp-flex-col asowp-py-4 asowp-space-y-2" v-if="isEdit">
                <div class="asowp-flex asowp-space-x-2 asowp-justify-between">
                    <div class="asowp-w-[50%] asowp-space-y-2 asowp-flex asowp-flex-col">
                        <label for="" class="asowp-text-[12px] asowp-text[#444444] asowp-font-normal">{{ __("Select fixing method", "all-signs-options-pro") }}</label>
                        <Multiselect
                            v-model="fixingMethod.fixingMethodId"
                            placeholder="Select FixingMethod"
                            :options="notSelectedManageFixingMethods"
                            label="name"
                            trackBy="name"
                            class="asowp-h-[35px] asowp-rounded-[5px]"
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
                    <div class="asowp-w-[50%] asowp-space-y-2 asowp-flex asowp-flex-col">
                        <label for="" class="asowp-text-[12px] asowp-text[#444444] asowp-font-normal">{{__("Additional Price", "all-signs-options-pro")}}</label>
                        <input type="number" v-model="fixingMethod.additionalPrice" class="asowp-rounded asowp-w-full asowp-h-[40px]" style="border-radius: 5px;" @blur="isNaN(fixingMethod.additionalPrice)?fixingMethod.additionalPrice=0:''">
                    </div>
                </div>
                <div class="asowp-flex asowp-space-x-2">
                    <div class="asowp-w-full asowp-space-y-2 asowp-flex asowp-flex-col">
                        <label for="" class="asowp-text-[16px] asowp-font-normal">{{__("Exclude shapes", "all-signs-options-pro")}}</label>
                        <Multiselect
                            v-model="fixingMethod.excludeShapes" 
                            :placeholder="__('Select shapes', 'all-signs-options-pro')"
                            label="name"
                            trackBy="id"
                            :options="MaterialSimpleShapes"
                            mode="tags"
                        />
                        <span class="asowp-text-[#444444] asowp-text-[12px]">{{__("exclude the shapes of this fixing Method", "all-signs-options-pro")}}</span>
                        
                    </div>
                    <div class="asowp-w-full asowp-space-y-2 asowp-flex asowp-flex-col">
                        <label for="" class="asowp-text-[16px] asowp-font-normal">{{__("Exclude size", "all-signs-options-pro")}}</label>
                        <Multiselect
                            v-model="fixingMethod.excludeSizes" 
                            :placeholder="__('Select Sizes', 'all-signs-options-pro')"
                            label="name"
                            trackBy="id"
                            :options="MaterialSimpleSizes"
                            mode="tags"
                        />
                        <span class="asowp-text-[#444444] asowp-text-[12px]">exclude the sizes of this fixing Method</span>
                        
                    </div>
                </div>
                
                
            </div>
            <div v-if="!isEdit">
                <div class="asowp-relative asowp-flex asowp-flex-col asowp-justify-between asowp-py-4 asowp-space-y-2" :key="key" v-for="(fx,key) in addNewFixingMethods">
                    <div v-if="!dropdownFixingMethods[key]" class="asowp-flex asowp-space-x-4">
                        <h2 class="asowp-text-[15px] asowp-font-bold">{{ key+1 }}.</h2>
                        <div class="asowp-translate-y-3.5">
                            <span class="asowp-text-[15px] asowp-font-bold">{{ manageFixingMethods[fx.fixingMethodId].name }}</span>
                            <span class="asowp-text-[15px] asowp-font-bold"> - {{ addNewFixingMethods[key].additionalPrice }}</span>
                        </div>
                    </div>
                    <div class="asowp-flex asowp-space-x-2 asowp-justify-between" v-show="dropdownFixingMethods[key]">
                        <div class="asowp-w-[50%] asowp-space-y-2 asowp-flex asowp-flex-col">
                            <label for="" class="asowp-text-[12px] asowp-text[#444444] asowp-font-normal">{{__("Select fixing method", "all-signs-options-pro")}}</label>
                            <Multiselect
                                v-model="addNewFixingMethods[key].fixingMethodId"
                                :placeholder="__('Select FixingMethod', 'all-signs-options-pro')"
                                :options="notSelectedManageFixingMethods"
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
                        <div class="asowp-w-[50%] asowp-space-y-2 asowp-flex asowp-flex-col">
                            <label for="" class="asowp-text-[12px] asowp-text[#444444] asowp-font-normal">{{__("Additional Price", "all-signs-options-pro")}}</label>
                            <input type="number" v-model="addNewFixingMethods[key].additionalPrice" class="asowp-rounded asowp-w-full asowp-h-[40px]" style="border-radius: 5px;" @blur="isNaN(addNewFixingMethods[key].additionalPrice)?addNewFixingMethods[key].additionalPrice=0:''">
                        </div>
                    </div>
                    <div class="asowp-flex asowp-space-x-2">
                        <div class="asowp-w-full asowp-space-y-2 asowp-flex asowp-flex-col" v-show="dropdownFixingMethods[key]">
                            <label for="" class="asowp-text-[16px] asowp-font-normal">{{__("Exclude shapes",'all-signs-options-pro')}}</label>
                            <Multiselect
                                v-model="addNewFixingMethods[key].excludeShapes" 
                                :placeholder="__('Select shapes','all-signs-options-pro')"
                                label="name"
                                trackBy="id"
                                :options="MaterialSimpleShapes"
                                mode="tags"
                            />
                            <span class="asowp-text-[#444444] asowp-text-[12px]">{{__("exclude the shapes of this fixing Method",'all-signs-options-pro')}}</span>
                        </div>
                        <div class="asowp-w-full asowp-space-y-2 asowp-flex asowp-flex-col" v-show="dropdownFixingMethods[key]">
                            <label for="" class="asowp-text-[16px] asowp-font-normal">{{__("Exclude size",'all-signs-options-pro')}}</label>
                            <Multiselect
                                v-model="addNewFixingMethods[key].excludeSizes" 
                                :placeholder="__('Select sizes','all-signs-options-pro')"
                                label="name"
                                trackBy="id"
                                :options="MaterialSimpleSizes"
                                mode="tags"
                            />
                            <span class="asowp-text-[#444444] asowp-text-[12px]">{{__("exclude the sizes of this fixing Method",'all-signs-options-pro')}}</span>
                            
                        </div>
                    </div>
                    <div @click="handleDeleteNewFixMethod(key)" class="asowp-flex asowp-absolute asowp-justify-center asowp-items-center asowp-right-2 asowp-top-0 asowp-shadow-md asowp-rounded-full asowp-cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="asowp-w-6 asowp-h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                    </div>
                    <div v-if="dropdownFixingMethods[key]" @click="dropdownFixingMethods[key]=false" class="asowp-flex asowp-absolute asowp-justify-center asowp-items-center  asowp-my-0 asowp-right-8 asowp-top-0 asowp-shadow-md asowp-rounded-full asowp-cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="asowp-w-6 asowp-h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 18.75 7.5-7.5 7.5 7.5" />
                            <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 7.5-7.5 7.5 7.5" />
                        </svg>
                    </div>
                    <div v-if="!dropdownFixingMethods[key]" @click="dropdownFixingMethods[key]=true" class="asowp-flex asowp-absolute asowp-justify-center asowp-items-center  asowp-my-0 asowp-right-8 asowp-top-0 asowp-shadow-md asowp-rounded-full asowp-cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="asowp-w-6 asowp-h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5" />
                        </svg>
                    </div>
                </div>
                <div class="asowp-pt-4" v-if="notSelectedManageFixingMethods.length > 0">
                    <button :disabled="isLoading" @click="handleAddMaterialFixingMethod" class="asowp-flex asowp-jsutify-center asowp-items-center asowp-bg-[#016464] asowp-rounded asowp-w-fit asowp-space-x-2 asowp-h-fit asowp-text-white asowp-px-8 asowp-p-2.5 asowp-rounded asowp-border-none hover:asowp-opacity-100 hover:asowp-border-none hover:asowp-text-white hover:asowp-bg-[#016464] asowp-cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="asowp-w-6 asowp-h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                        <span class="asowp-font-semibold asowp-text-[16px]">{{__("Add More Fixing Method",'all-signs-options-pro')}}</span>
                    </button>
                </div>
            </div>
            <hr class="Polaris-Divider" style="border: 1px solid #ebebeb;">
            <div class=" asowp-flex asowp-space-x-4 asowp-px-4 asowp-py-4 asowp-justify-end asowp-items-end">
                <div class="asowp-bg-[#016464] asowp-rounded">
                    <button :disabled="isLoading" class="asowp-flex asowp-bg-transparent asowp-w-fit asowp-space-x-2 asowp-h-fit asowp-px-8 asowp-p-2 asowp-border-none asowp-text-white asowp-opacity-90 hover:asowp-border-none hover:asowp-text-white hover:asowp-opacity-100 asowp-cursor-pointer" @click="back">
                        <svg class="asowp-w-6 asowp-h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 12L5 8V11L17.17 11C17.3756 10.414 17.7586 9.90661 18.2657 9.54821C18.7729 9.18981 19.379 8.9982 20 9C20.7956 9 21.5587 9.31607 22.1213 9.87868C22.6839 10.4413 23 11.2044 23 12C23 12.7956 22.6839 13.5587 22.1213 14.1213C21.5587 14.6839 20.7956 15 20 15C18.69 15 17.58 14.17 17.17 13L5 13V16L1 12Z" fill="currentColor"/>
                        </svg>

                        <div class="asowp-font-semibold asowp-text-[16px]">{{__("Back",'all-signs-options-pro')}}</div>
                    </button>
                </div>
                <div class="asowp-bg-[#016464] asowp-rounded" v-if="isEdit">
                    <button @click="updateMaterialFixingMethods" :class="`asowp-rounded asowp-flex ${!isLoading ? 'asowp-bg-amber-400 ' :'asowp-bg-amber-500'} asowp-w-fit asowp-space-x-2 asowp-h-fit asowp-px-8 asowp-text-white asowp-p-2 asowp-border-none asowp-opacity-90 hover:asowp-border-none hover:asowp-text-white hover:asowp-opacity-100 asowp-cursor-pointer`">
                        <img src="../../../../../../../assets/icons/ic_loading_gray.svg" class="asowp-w-5 asowp-w-5" v-if="isLoading" :disabled="isLoading"/>
                        <div class="asowp-font-semibold asowp-text-[16px]">{{__("Update",'all-signs-options-pro')}}</div>
                    </button>
                </div>
                <div class="asowp-bg-[#016464] asowp-rounded" v-if="!isEdit">
                    <button @click="addFixingMethods" class="asowp-flex asowp-bg-transparent asowp-w-fit asowp-space-x-2 asowp-h-fit asowp-text-white  asowp-px-12 asowp-p-2.5 asowp-border-none asowp-opacity-90 hover:asowp-border-none hover:asowp-text-white hover:asowp-opacity-100 asowp-cursor-pointer">
                        <div class="asowp-translate-y-1">
                            <img src="../../../../../../../assets/icons/ic_loading_gray.svg" class="asowp-w-5 asowp-w-5" v-if="isLoading" :disabled="isLoading"/>
                            <svg v-if="!isLoading" class="asowp-w-4 asowp-h-4" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2.5 1.25C2.16848 1.25 1.85054 1.3817 1.61612 1.61612C1.3817 1.85054 1.25 2.16848 1.25 2.5V17.5C1.25 17.8315 1.3817 18.1495 1.61612 18.3839C1.85054 18.6183 2.16848 18.75 2.5 18.75H17.5C17.8315 18.75 18.1495 18.6183 18.3839 18.3839C18.6183 18.1495 18.75 17.8315 18.75 17.5V2.5C18.75 2.16848 18.6183 1.85054 18.3839 1.61612C18.1495 1.3817 17.8315 1.25 17.5 1.25H11.875C11.5435 1.25 11.2255 1.3817 10.9911 1.61612C10.7567 1.85054 10.625 2.16848 10.625 2.5V11.6163L13.9325 8.3075C14.0499 8.19014 14.209 8.12421 14.375 8.12421C14.541 8.12421 14.7001 8.19014 14.8175 8.3075C14.9349 8.42486 15.0008 8.58403 15.0008 8.75C15.0008 8.91597 14.9349 9.07514 14.8175 9.1925L10.4425 13.5675C10.3844 13.6257 10.3155 13.6719 10.2395 13.7034C10.1636 13.7349 10.0822 13.7511 10 13.7511C9.91779 13.7511 9.83639 13.7349 9.76046 13.7034C9.68453 13.6719 9.61556 13.6257 9.5575 13.5675L5.1825 9.1925C5.12439 9.13439 5.07829 9.0654 5.04685 8.98948C5.0154 8.91356 4.99921 8.83218 4.99921 8.75C4.99921 8.66782 5.0154 8.58644 5.04685 8.51052C5.07829 8.4346 5.12439 8.36561 5.1825 8.3075C5.24061 8.24939 5.3096 8.20329 5.38552 8.17185C5.46144 8.1404 5.54282 8.12421 5.625 8.12421C5.70718 8.12421 5.78856 8.1404 5.86448 8.17185C5.9404 8.20329 6.00939 8.24939 6.0675 8.3075L9.375 11.6163V2.5C9.375 1.83696 9.63839 1.20107 10.1072 0.732233C10.5761 0.263392 11.212 0 11.875 0L17.5 0C18.163 0 18.7989 0.263392 19.2678 0.732233C19.7366 1.20107 20 1.83696 20 2.5V17.5C20 18.163 19.7366 18.7989 19.2678 19.2678C18.7989 19.7366 18.163 20 17.5 20H2.5C1.83696 20 1.20107 19.7366 0.732233 19.2678C0.263392 18.7989 0 18.163 0 17.5V2.5C0 1.83696 0.263392 1.20107 0.732233 0.732233C1.20107 0.263392 1.83696 0 2.5 0L5.625 0C5.79076 0 5.94973 0.065848 6.06694 0.183058C6.18415 0.300269 6.25 0.45924 6.25 0.625C6.25 0.79076 6.18415 0.949732 6.06694 1.06694C5.94973 1.18415 5.79076 1.25 5.625 1.25H2.5Z" fill="white"/>
                            </svg>
                        </div>
                        <span class="asowp-font-semibold asowp-text-[16px]">{{__("Save",'all-signs-options-pro')}}</span>
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
                        <span class="asowp-sr-only">{{__("Close modal",'all-signs-options-pro')}}</span>
                    </button>
                    <div class="asowp-p-4 md:p-5 asowp-text-center">
                        <svg class="asowp-mx-auto asowp-mb-4 asowp-text-gray-400 asowp-w-12 asowp-h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                        </svg>
                        <h3 class="asowp-mb-5 asowp-text-lg asowp-font-normal asowp-text-gray-500 dark:text-gray-400">{{__("Are you sure you want to delete this fixing method?",'all-signs-options-pro')}}</h3>
                        <input v-model="manageFixingMethods[fixingMethodId].name" readonly class="asowp-rounded asowp-w-full asowp-h-[35px] asowp-text-center asowp-p-4 asowp-my-2 asowp-border-none" />
                        <button @click="deleteFixingMethods" data-modal-hide="popup-modal" type="button" :class="`asowp-border-solid asowp-text-white ${!isLoading ? 'asowp-bg-red-600 asowp-cursor-pointer' :'asowp-bg-red-700 asowp-cursor-not-allowed'} hover:bg-red-800 focus:ring-4 focus:outline-none asowp-my-2 asowp-border-none  focus:ring-red-300 dark:focus:ring-red-800 asowp-font-medium asowp-rounded-lg asowp-text-sm asowp-inline-flex asowp-items-center asowp-px-5 asowp-py-2.5 asowp-text-center`">
                            <img src="../../../../../../../assets/icons/ic_loading_gray.svg" class="asowp-w-5 asowp-w-5" v-if="isLoading" :disabled="isLoading"/>
                            {{__("Yes, I'm sure",'all-signs-options-pro')}}
                        </button>
                        <button @click.stop="closeModal" data-modal-hide="popup-modal" type="button" :class="`asowp-border-solid asowp-py-2.5 asowp-px-5 asowp-ms-3 asowp-text-sm asowp-font-medium asowp-text-gray-900 asowp-my-2  asowp-border-gray-500 asowp-border-white focus:outline-none asowp-bg-white asowp-rounded-lg asowp-border asowp-border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 ${isLoading ? 'asowp-cursor-not-allowed' : 'asowp-cursor-pointer'}`">{{__("No, cancel",'all-signs-options-pro')}}</button>
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
import Multiselect from '@vueform/multiselect'

const route = useRoute()
const configID = ref(route.params.configId);
import { __, _x, _n, _nx, sprintf, setLocaleData } from "@wordpress/i18n";
const materialId = ref(route.params.materialId);
const MaterialSimpleSizes = ref([]);
const MaterialSimpleShapes = ref([]);
const isFetching = ref(false);
const isNewFixing = ref(false);
const isLoading = ref(false);
const fixingMethods = ref([]);
const manageFixingMethods = ref([]);
const notSelectedManageFixingMethods = ref([]);
const dropdownFixingMethods = ref([true])
const addNewFixingMethods = ref([
    {
        isDefault:false,
        fixingMethodId:0,
        excludeSizes: [],
        excludeShapes:[],
        additionalPrice:0,
    }
]);
const fixingMethodId = ref(null);

const isEdit = ref(false);
const openModal = ref(false);
const noFixingMethodsFound = ref('');
const showParams = ref([]);
const fixingMethod = ref({
    isDefault:false,
    fixingMethodId:0,
    excludeSizes: [],
    excludeShapes:[],
    additionalPrice:0,
});

const checkNotSelectedManageFixingMethods = ( key= -1) => {
    var notSelectedManageFixingMethods = [];
    let index = 0; 
    while (index < manageFixingMethods.value.length) {
        var indexUse = false;
        for (let i = 0; i <  fixingMethods.value.length; i++) {
            if(index == fixingMethods.value[i].fixingMethodId){
                indexUse = true;
            }
        }
        if(!indexUse){
            notSelectedManageFixingMethods.push({...manageFixingMethods.value[index],value:index});
        }
        index++;
    }
    if(key!=-1){
        notSelectedManageFixingMethods.push({...manageFixingMethods.value[index],value:index});
    }
    return notSelectedManageFixingMethods;
}

const handleAddMaterialFixingMethod = () =>{
    addNewFixingMethods.value.push({
        isDefault:false,
        fixingMethodId:0,
        excludeSizes: [],
        excludeShapes:[],
        additionalPrice:0,
    });
    for (let index = 0; index < dropdownFixingMethods.value.length; index++) {
        dropdownFixingMethods.value[index]=false;
    }
    dropdownFixingMethods.value.push(true);
}

const fetchMaterialShapes = async () => {
    const result = await api.getMaterialSimpleShapes(configID.value,materialId.value);
    if(!result.message){
        var tab = [];
        const manageShapes = result.manageShapes;
        const materialShapes = result.materialShapes;
        for (let index = 0; index < materialShapes.length; index++) {
            tab.push({name:manageShapes[materialShapes[index].shapeId].name,value:index,icon:manageShapes[materialShapes[index].shapeId].icon});
        }
        MaterialSimpleShapes.value = tab;
    }
};

onMounted(async ()=>{
    isFetching.value = true;
    await fetchMaterialShapes();
    await fetchMaterialFixingMethods();
    isFetching.value = false;
});

const fetchMaterialFixingMethods = async () => {
    const result = await api.getMaterialSimpleFixingMethods(configID.value,materialId.value);
    var tab = [];
    for (let index = 0; index < result.materialSizes.length; index++) {
        tab.push({name:result.materialSizes[index].label,value:index});
    }
    MaterialSimpleSizes.value = tab;
    if(!result.message){
        fixingMethods.value = result.materialFixingMethods;
        manageFixingMethods.value = result.manageFixingMethods;
        
        // Initialize showParams array
        let paramsTab = [];
        for (let index = 0; index < fixingMethods.value.length; index++) {
            paramsTab.push(false);
        }
        showParams.value = paramsTab;
    }else{
        fixingMethods.value = [];
        manageFixingMethods.value = result.manageFixingMethods;
        noFixingMethodsFound.value = result.message;
        showParams.value = [];
    }
};
const checkIfThereDefault = ()=> {
    var hasDefault = false;
    let index =0;
    while (index<fixingMethods.value.length && !hasDefault) {
        if(fixingMethods.value[index].isDefault){
            hasDefault = true;
        }
        index++;
    }
    
    if(!hasDefault && fixingMethods.value[0]){
        fixingMethods.value[0].isDefault = true;
    }
}
const updateFixingMethods = async () => {
    isLoading.value = true;
    checkIfThereDefault();
    const result = await api.updateMaterialSimpleFixingMethods(configID.value,materialId.value,fixingMethods.value);
    if(result.success){
        await fetchMaterialFixingMethods();
        if(result.success == true ) {
            toastMessage(result.message);
        }else{
            toastMessage(result.message,"warning");
        }
        isLoading.value = false;
        isNewFixing.value = false;
        openModal.value = false;
        fixingMethod.value = {
            isDefault:false,
            fixingMethodId:0,
            excludeSizes: [],
            excludeShapes:[],
            additionalPrice:0
        };
        dropdownFixingMethods.value = [true];
        addNewFixingMethods.value = [
            {
                isDefault:false,
                fixingMethodId:0,
                excludeSizes: [],
                excludeShapes:[],
                additionalPrice:0
            }
        ];
    }else{
        isLoading.value = false;
        toastMessage(result.message,"error");
        isNewFixing.value = false;
        openModal.value = false;
        dropdownFixingMethods.value = [true];
        addNewFixingMethods.value = [
            {
                isDefault:false,
                fixingMethodId:0,
                excludeSizes: [],
                excludeShapes:[],
                additionalPrice:0
            }
        ];
        fixingMethod.value = {
            isDefault:false,
            fixingMethodId:0,
            excludeSizes: [],
            excludeShapes:[],
            additionalPrice:0
        };
    }
}
const selectMaterialFixingMethod = (id,fx,isDeleting=false) => {
    if(isDeleting){
        fixingMethodId.value = id;
        closeModal();
    }else{
        fixingMethod.value = fx;
        notSelectedManageFixingMethods.value = checkNotSelectedManageFixingMethods(fx.fixingMethodId);
        isEdit.value = true;
        isNewFixing.value = true;
    }
}
const addFixingMethods = async () => {
    isLoading.value = true;
    for (let index = 0; index < addNewFixingMethods.value.length; index++) {
        fixingMethods.value.push(addNewFixingMethods.value[index]);
    }
    // showParams will be initialized in fetchMaterialFixingMethods after updateFixingMethods
    await updateFixingMethods();
}
const updateMaterialFixingMethods = async () => {
    isLoading.value = true;
    fixingMethods.value[fixingMethodId.value] = fixingMethod.value;
    await updateFixingMethods();
}

const deleteFixingMethods = async () => {
    isLoading.value = true;
    fixingMethods.value.splice(fixingMethodId.value,1);
    // showParams will be initialized in fetchMaterialFixingMethods after updateFixingMethods
    await updateFixingMethods();
}


const closeModal = () => {
    openModal.value = !openModal.value;
}


const newFixing = () => {
    notSelectedManageFixingMethods.value = checkNotSelectedManageFixingMethods();
    if(notSelectedManageFixingMethods.value.length>0){
        isNewFixing.value = true;
    }else{
        toastMessage(__('No more choice of fixing method','all-signs-options-pro'),'warning');
    }
}
const back = () => {
    isNewFixing.value = false;
    isEdit.value = false;
    fixingMethodId.value  = null;
    fixingMethod.value = {
        isDefault:false,
        fixingMethodId:0,
        excludeSizes: [],
        excludeShapes:[],
        additionalPrice:0
    };
    addNewFixingMethods.value = [
        {
            isDefault:false,
            fixingMethodId:0,
            excludeSizes: [],
            excludeShapes:[],
            additionalPrice:0
        }
    ];
}
const selectDefault = async(key) =>{
    fixingMethods.value[key].isDefault = true;
    for(let i=0; i<fixingMethods.value.length; i++){
        if(i != key ){
            fixingMethods.value[i].isDefault = false;
        }
    }
    await updateMaterialFixingMethods();
}
const handleDeleteNewFixMethod = (key) =>{
    var tab = [];
    for (let index = 0; index < addNewFixingMethods.value.length; index++) {
        tab.push(addNewFixingMethods.value[index])
    }
    tab.splice(key,1);
    if(tab.length>0){
        addNewFixingMethods.value=tab;
        dropdownFixingMethods.value.splice(key,1);
    }
}

const handleOpenFixingParams = (key) => {
    for (let index = 0; index < showParams.value.length; index++) {
        if (key != index) {
            showParams.value[index] = false;
        } else {
            showParams.value[key] = !showParams.value[key];
        }
    }
}

</script>
