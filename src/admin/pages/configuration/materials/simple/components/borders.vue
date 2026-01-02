<template>
    <div>
        <div class="asowp-space-y-1 asowp-translate-y-2" v-if="!isNewBorder">
            <div class="asowp-bg-[#fff] asowp-p-4 asowp-rounded-[10px] asowp-border-[2px] asowp-border-solid asowp-border-[#d9d9d9]">
                <div class="asowp-flex asowp-justify-end asowp-bg-[#F8F9FB] asowp-px-4 asowp-py-4 asowp-pb-2" v-if="manageBorders.length < 0">
                    <button :disabled="isLoading" :class="`asowp-flex asowp-w-fit asowp-h-fit asowp-rounded asowp-bg-[#016464] asowp-px-4 asowp-space-x-2 asowp-p-1.5 asowp-border-none asowp-text-white asowp-opacity-90 hover:asowp-opacity-100 ${isLoading?'asowp-cursor-not-allowed':'asowp-cursor-pointer'}`" @click="newBorder">
                        <svg class="asowp-w-5 asowp-h-5" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g id="plus-lg">
                            <path id="Vector" fill-rule="evenodd" clip-rule="evenodd" d="M11 2.75C11.1823 2.75 11.3572 2.82243 11.4861 2.95136C11.6151 3.0803 11.6875 3.25516 11.6875 3.4375V10.3125H18.5625C18.7448 10.3125 18.9197 10.3849 19.0486 10.5139C19.1776 10.6428 19.25 10.8177 19.25 11C19.25 11.1823 19.1776 11.3572 19.0486 11.4861C18.9197 11.6151 18.7448 11.6875 18.5625 11.6875H11.6875V18.5625C11.6875 18.7448 11.6151 18.9197 11.4861 19.0486C11.3572 19.1776 11.1823 19.25 11 19.25C10.8177 19.25 10.6428 19.1776 10.5139 19.0486C10.3849 18.9197 10.3125 18.7448 10.3125 18.5625V11.6875H3.4375C3.25516 11.6875 3.0803 11.6151 2.95136 11.4861C2.82243 11.3572 2.75 11.1823 2.75 11C2.75 10.8177 2.82243 10.6428 2.95136 10.5139C3.0803 10.3849 3.25516 10.3125 3.4375 10.3125H10.3125V3.4375C10.3125 3.25516 10.3849 3.0803 10.5139 2.95136C10.6428 2.82243 10.8177 2.75 11 2.75Z" fill="white"/>
                            </g>
                        </svg>
                        <div class="asowp-text-[14px]">
                            {{__("Add new border", "all-signs-options-pro")}}
                        </div>
                    </button>
                </div>
                <div class="asowp-relative" id="monTableau">
                    <table class="asowp-w-full asowp-text-center asowp-px-4 asowp-border asowp-border-collapse asowp-border-0">
                        <thead class="asowp-text-[14px] asowp-bg-[#f0f0f1]">
                            <tr class="">
                                <th scope="col" class="asowp-p-4 asowp-px-8 asowp-w-12 asowp-font-normal">
                                    {{__("Title", "all-signs-options-pro")}} 
                                </th>
                                <th scope="col" class="asowp-px-6 asowp-py-3 asowp-font-normal">
                                    {{__("Icons", "all-signs-options-pro")}}
                                </th>
                                <th scope="col" class="asowp-px-6 asowp-py-3 asowp-font-normal">
                                    {{__("Additional Price", "all-signs-options-pro")}}
                                </th>
                                <th scope="col" class="asowp-px-6 asowp-py-3 asowp-font-normal">
                                    {{__("Default", "all-signs-options-pro")}}
                                </th>
                                <th scope="col" class="asowp-px-6 asowp-py-3 asowp-font-normal">
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
                            <tr v-if="borders.allBorders.length == 0 && !isFetching">
                                <td colspan="7">
                                    <div class="asowp-bg-white asowp-border-solid asowp-border asowp-border-[#D1D1D1] asowp-flex asowp-flex-col asowp-space-y-12 asowp-justify-center asowp-items-center asowp-py-10 asowp-h-[150px]">
                                        <div class="asowp-flex asowp-flex-col asowp-space-y-2 asowp-justify-center asowp-items-center">
                                            <p class="asowp-text-2xl asowp-font-bold">{{noBordersFound}}</p>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr v-for="(bd, key) in borders.allBorders" :key=key class="asowp-border-t-0 asowp-border-l-0 asowp-border-r-0 asowp-border-b-2 asowp-border-solid asowp-border-[#f0f0f1]">
                                <td class="asowp-text-center asowp-px-6 asowp-p-4">
                                    {{manageBorders[bd.manageBorderId].name}}
                                </td>
                                <td class="asowp-px-8 asowp-py-3 asowp-flex asowp-justify-center asowp-items-center">
                                    <img :src="manageBorders[bd.manageBorderId].icon" class="asowp-w-[30px] asowp-h-[30px]" v-if="manageBorders[border.manageBorderId].icon"/>
                                </td>
                                <td class="asowp-text-[12px] asowp-text-center asowp-px-6 asowp-py-3">
                                    <span class="asowp-w-fit asowp-rounded-lg asowp-px-2 asowp-p-1 asowp-bg-[#f0f0f0] asowp-text-[#686868] asowp-border-none">
                                        {{bd.additionalPrice}}
                                    </span>
                                </td>
                                <td class="asowp-pl-12 asowp-py-2">
                                    <span class="asowp-w-fit asowp-flex asowp-items-center asowp-translate-x-5 asowp-translate-y-0.5">
                                        <label for="asowp-toggle" @click="!isLoading?selectDefault(key):''" class="asowp-cursor-pointer asowp-bg-[#F8F8FF] asowp-border-[1px] asowp-border-solid asowp-border-black asowp-w-6 asowp-h-0.5 asowp-rounded-full asowp-p-1">
                                            <div :class="bd.isDefault ? 'asowp-translate-x-[100%] asowp-border-[#016464]': 'asowp-border-[#FFFFFF]'" class="asowp-toggle-dot asowp-w-2.5 asowp-h-2.5 asowp-duration-100 -asowp-translate-y-[8px] -asowp-translate-x-2 asowp-border-[4px] asowp-border-solid asowp-bg-[#D9D9D9] asowp-rounded-full asowp-shadow-md asowp-transform"></div>
                                        </label>
                                    </span>
                                </td>
                                <td class="asowp-px-6 asowp-text-center">
                                    <div class="asowp-flex asowp-justify-center asowp-items-center asowp-relative">
                                        <button
                                            class="asowp-w-7 asowp-h-7 asowp-bg-white asowp-cursor-pointer asowp-border asowp-border-gray-300 asowp-rounded-lg asowp-flex asowp-items-center asowp-justify-center asowp-shadow-sm hover:asowp-bg-gray-100 asowp-transition"
                                            @click.stop="handleOpenBorderParams(key)"
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
                                                @click.stop="selectMaterialBorder(key, bd); showParams[key] = false"
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
                                                @click.stop="selectMaterialBorder(key, bd, true); showParams[key] = false"
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
            
            <div v-show="!isFetching" class="asowp-w-[96%] asowp-space-y-2 asowp-flex asowp-flex-col asowp-py-2 asowp-px-4 asowp-bg-[#fff] asowp-rounded-[10px] asowp-border-[2px] asowp-border-solid asowp-border-[#d9d9d9]">
                <label for="" class="asowp-text-[16px] asowp-font-semibold">{{__("Borders settings", "all-signs-options-pro")}}</label>
                <span class="asowp-text-[12px] asowp-text-[#444444] asowp-font-[600]">{{__("Define border colors", "all-signs-options-pro")}}</span>
                <div class="asowp-flex asowp-flex-col asowp-space-y-2">
                    <label for="" class="asowp-text-[12px] asowp-text-[#444444]">{{__("Label", "all-signs-options-pro")}}:</label>
                    <input type="text" class="asowp-w-[35%] asowp-h-[35px]" style="border-radius: 10px !important;" v-model="borders.settings.borderColorsLabel">
                </div>
                <div class="asowp-grid asowp-grid-cols-2 asowp-gap-4">
                    <div class="asowp-flex asowp-justify-start asowp-space-x-2" :key="key" v-for="(color,key) in borders.settings.colors">
                        <div class="asowp-w-[30%] asowp-space-y-2 asowp-flex asowp-flex-col">
                            <label for="" class="asowp-text-[12px] asowp-text[#444444] asowp-font-normal">{{__("Name", "all-signs-options-pro")}}</label>
                            <input type="text" class="asowp-w-full asowp-h-[40px]" style="border-radius: 10px !important;" v-model="borders.settings.colors[key].name" autocomplete="off"> 
                        </div>
                        <div class="asowp-w-[30%] asowp-space-y-2 asowp-flex asowp-flex-col">
                            <label for="" class="asowp-text-[12px] asowp-text[#444444] asowp-font-normal asowp-invisible">{{__("price", "all-signs-options-pro")}}</label>
                            <div class="asowp-relative asowp-flex asowp-border asowp-p-1 asowp-border-solid asowp-border-[#000] asowp-rounded-[10px]">
                                <input
                                    id="colorPicker"
                                    type="color"
                                    v-model="borders.settings.colors[key].codeHex"
                                    @input="(e)=>changeBorderColorCodeHex(e,key)"
                                    class="asowp-w-9 asowp-h-[25px]"
                                    style="border: medium !important; background-color: rgb(239, 239, 239) !important;"
                                />
                                <input
                                    type="text"
                                    v-model="borders.settings.colors[key].codeHex"
                                    @input="(e)=>changeBorderColorCodeHex(e,key)"
                                    class="asowp-text-black asowp-w-full"
                                    style="border: none !important;"
                                />
                            </div>
                            
                        </div>
                        <div class="asowp-w-[30%] asowp-space-y-2 asowp-flex asowp-flex-col">
                            <label for="" class="asowp-text-[12px] asowp-text[#444444] asowp-font-normal">{{__("Price", "all-signs-options-pro")}}</label>
                            <div class="asowp-relative asowp-flex">
                                <input type="number" class="asowp-w-full asowp-h-[40px]" style="border-radius: 10px !important;" v-model="borders.settings.colors[key].additionalPrice" @blur="isNaN(borders.settings.colors[key].additionalPrice) ? borders.settings.colors[key].additionalPrice = 0 : ''"> 
                            </div>
                        </div>
                        <div class="asowp-w-[10%] asowp-space-y-2 asowp-flex asowp-flex-col">
                            <label for="" class="asowp-text-[12px] asowp-text[#444444] asowp-font-normal asowp-invisible">{{ __("Price", "all-signs-options-pro") }}</label>
                            <div class="asowp-relative asowp-flex">
                                <button @click="removeBordersColor(key)" class="asowp-w-[50px] asowp-h-full asowp-bg-transparent asowp-border-none asowp-cursor-pointer asowp-text-white">
                                    <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">    
                                        <path d="M6.5 2.5H9.5C9.5 2.10218 9.34196 1.72064 9.06066 1.43934C8.77936 1.15804 8.39782 1 8 1C7.60218 1 7.22064 1.15804 6.93934 1.43934C6.65804 1.72064 6.5 2.10218 6.5 2.5ZM5.5 2.5C5.5 1.83696 5.76339 1.20107 6.23223 0.732233C6.70107 0.263392 7.33696 0 8 0C8.66304 0 9.29893 0.263392 9.76777 0.732233C10.2366 1.20107 10.5 1.83696 10.5 2.5H15.5C15.6326 2.5 15.7598 2.55268 15.8536 2.64645C15.9473 2.74021 16 2.86739 16 3C16 3.13261 15.9473 3.25979 15.8536 3.35355C15.7598 3.44732 15.6326 3.5 15.5 3.5H14.446L13.252 13.844C13.1676 14.5752 12.8173 15.2498 12.2679 15.7396C11.7184 16.2293 11.008 16.4999 10.272 16.5H5.728C4.99195 16.4999 4.28161 16.2293 3.73214 15.7396C3.18266 15.2498 2.8324 14.5752 2.748 13.844L1.554 3.5H0.5C0.367392 3.5 0.240215 3.44732 0.146447 3.35355C0.0526785 3.25979 0 3.13261 0 3C0 2.86739 0.0526785 2.74021 0.146447 2.64645C0.240215 2.55268 0.367392 2.5 0.5 2.5H5.5ZM3.741 13.73C3.79743 14.2174 4.03105 14.667 4.39742 14.9934C4.76379 15.3198 5.23735 15.5001 5.728 15.5H10.272C10.7627 15.5001 11.2362 15.3198 11.6026 14.9934C11.969 14.667 12.2026 14.2174 12.259 13.73L13.439 3.5H2.561L3.741 13.73ZM6.5 6C6.63261 6 6.75979 6.05268 6.85355 6.14645C6.94732 6.24021 7 6.36739 7 6.5V12.5C7 12.6326 6.94732 12.7598 6.85355 12.8536C6.75979 12.9473 6.63261 13 6.5 13C6.36739 13 6.24021 12.9473 6.14645 12.8536C6.05268 12.7598 6 12.6326 6 12.5V6.5C6 6.36739 6.05268 6.24021 6.14645 6.14645C6.24021 6.05268 6.36739 6 6.5 6ZM10 6.5C10 6.36739 9.94732 6.24021 9.85355 6.14645C9.75979 6.05268 9.63261 6 9.5 6C9.36739 6 9.24021 6.05268 9.14645 6.14645C9.05268 6.24021 9 6.36739 9 6.5V12.5C9 12.6326 9.05268 12.7598 9.14645 12.8536C9.24021 12.9473 9.36739 13 9.5 13C9.63261 13 9.75979 12.9473 9.85355 12.8536C9.94732 12.7598 10 12.6326 10 12.5V6.5Z" fill="red"/>    
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="asowp-pt-4">
                    <button @click="addNewColor" class="asowp-flex asowp-jsutify-center asowp-items-center asowp-bg-[#016464] asowp-rounded asowp-w-fit asowp-space-x-2 asowp-h-fit asowp-text-white asowp-px-8 asowp-p-2.5 asowp-rounded asowp-border-none hover:asowp-opacity-100 hover:asowp-border-none hover:asowp-text-white hover:asowp-bg-[#016464] asowp-cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="asowp-w-6 asowp-h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                        <span class="asowp-font-semibold asowp-text-[16px]">{{__("Add Colors", "all-signs-options-pro")}}</span>
                    </button>
                </div>
                <div v-show="!isFetching" class="asowp-flex asowp-py-4 asowp-px-4 asowp-space-x-16">
                    <div class="asowp-flex asowp-font-semibold">
                        {{__("Enable border width", "all-signs-options-pro")}}
                        <div class="asowp-flex asowp-items-center asowp-translate-x-2 asowp-translate-y-0.5">
                            <label for="asowp-toggle" @click="enableBorderWidth" class="asowp-cursor-pointer asowp-bg-[#F8F8FF] asowp-border-[1px] asowp-border-solid asowp-border-black asowp-w-6 asowp-h-0.5 asowp-rounded-full asowp-p-1">
                                <div :class="borders.settings.enableBorderWidth ? 'asowp-translate-x-[100%] asowp-border-[#016464]': 'asowp-border-[#FFFFFF]'" class="asowp-toggle-dot asowp-w-2.5 asowp-h-2.5 asowp-duration-100 -asowp-translate-y-[8px] -asowp-translate-x-2 asowp-border-[4px] asowp-border-solid asowp-bg-[#D9D9D9] asowp-rounded-full asowp-shadow-md asowp-transform"></div>
                            </label>
                        </div>
                    </div>
                    <div class="asowp-flex asowp-font-semibold">
                        {{__("Enable border Color", "all-signs-options-pro")}}
                        <div class="asowp-flex asowp-items-center asowp-translate-x-2 asowp-translate-y-0.5">
                            <label for="asowp-toggle" @click="enableBorderColor" class="asowp-cursor-pointer asowp-bg-[#F8F8FF] asowp-border-[1px] asowp-border-solid asowp-border-black asowp-w-6 asowp-h-0.5 asowp-rounded-full asowp-p-1">
                            <div :class="borders.settings.enableBorderColor ? 'asowp-translate-x-[100%] asowp-border-[#016464]': 'asowp-border-[#FFFFFF]'" class="asowp-toggle-dot asowp-w-2.5 asowp-h-2.5 asowp-duration-100 -asowp-translate-y-[8px] -asowp-translate-x-2 asowp-border-[4px] asowp-border-solid asowp-bg-[#D9D9D9] asowp-rounded-full asowp-shadow-md asowp-transform"></div>
                            </label>
                        </div>
                    </div>
                </div>
                <div v-show="!isFetching && borders.settings.enableBorderColor" class="asowp-flex asowp-space-x-4 asowp-px-4 asowp-py-4 asowp-justify-start asowp-items-center">
                    <div class="asowp-w-[50%] asowp-flex asowp-flex-col">
                        <label for="" class="asowp-text-[12px] asowp-text[#444444] asowp-font-normal">{{__("Custom Color Preview Image", "all-signs-options-pro")}}</label>
                        <div class="asowp-flex asowp-flex-col asowp-space-y-2 asowp-w-full asowp-pt-2">
                            <div class="asowp-flex asowp-space-x-2 asowp-border asowp-p-1 asowp-border-solid asowp-border-[#000] asowp-rounded-[5px]">
                                <button @click="selectCustomBorderColorPrevImage" class="asowp-bg-[#016464] asowp-border-none asowp-w-fit asowp-h-fit asowp-p-2 asowp-rounded asowp-px-4 asowp-text-white asowp-opacity-90 hover:asowp-opacity-100 asowp-text-[10px] asowp-cursor-pointer">
                                    <svg class="asowp-w-4 asowp-h-4" viewBox="0 0 23 21" fill="none" xmlns="http://www.w3.org/2000/svg">        
                                        <path d="M22.4375 12.2809V18.5309C22.4375 18.9453 22.2729 19.3427 21.9799 19.6357C21.6868 19.9288 21.2894 20.0934 20.875 20.0934H2.125C1.7106 20.0934 1.31317 19.9288 1.02015 19.6357C0.72712 19.3427 0.5625 18.9453 0.5625 18.5309V12.2809C0.5625 11.8665 0.72712 11.4691 1.02015 11.176C1.31317 10.883 1.7106 10.7184 2.125 10.7184H6.8125C7.0197 10.7184 7.21841 10.8007 7.36493 10.9472C7.51144 11.0937 7.59375 11.2924 7.59375 11.4996C7.59375 11.7068 7.51144 11.9056 7.36493 12.0521C7.21841 12.1986 7.0197 12.2809 6.8125 12.2809H2.125V18.5309H20.875V12.2809H16.1875C15.9803 12.2809 15.7816 12.1986 15.6351 12.0521C15.4886 11.9056 15.4062 11.7068 15.4062 11.4996C15.4062 11.2924 15.4886 11.0937 15.6351 10.9472C15.7816 10.8007 15.9803 10.7184 16.1875 10.7184H20.875C21.2894 10.7184 21.6868 10.883 21.9799 11.176C22.2729 11.4691 22.4375 11.8665 22.4375 12.2809ZM7.36523 6.58362L10.7188 3.22913V11.4996C10.7188 11.7068 10.8011 11.9056 10.9476 12.0521C11.0941 12.1986 11.2928 12.2809 11.5 12.2809C11.7072 12.2809 11.9059 12.1986 12.0524 12.0521C12.1989 11.9056 12.2812 11.7068 12.2812 11.4996V3.22913L15.6348 6.58362C15.7814 6.73022 15.9802 6.81257 16.1875 6.81257C16.3948 6.81257 16.5936 6.73022 16.7402 6.58362C16.8868 6.43703 16.9692 6.2382 16.9692 6.03089C16.9692 5.82357 16.8868 5.62475 16.7402 5.47815L12.0527 0.790654C11.9802 0.718016 11.894 0.660392 11.7992 0.621076C11.7043 0.58176 11.6027 0.561523 11.5 0.561523C11.3973 0.561523 11.2957 0.58176 11.2008 0.621076C11.106 0.660392 11.0198 0.718016 10.9473 0.790654L6.25977 5.47815C6.11317 5.62475 6.03082 5.82357 6.03082 6.03089C6.03082 6.2382 6.11317 6.43703 6.25977 6.58362C6.40636 6.73022 6.60518 6.81257 6.8125 6.81257C7.01982 6.81257 7.21864 6.73022 7.36523 6.58362ZM18.5312 15.4059C18.5312 15.1741 18.4625 14.9475 18.3338 14.7548C18.205 14.5621 18.022 14.4119 17.8078 14.3232C17.5937 14.2345 17.3581 14.2113 17.1308 14.2565C16.9034 14.3017 16.6946 14.4134 16.5307 14.5772C16.3668 14.7411 16.2552 14.9499 16.21 15.1773C16.1648 15.4046 16.188 15.6402 16.2767 15.8543C16.3654 16.0685 16.5156 16.2515 16.7083 16.3803C16.901 16.509 17.1276 16.5778 17.3594 16.5778C17.6702 16.5778 17.9682 16.4543 18.188 16.2345C18.4078 16.0148 18.5312 15.7167 18.5312 15.4059Z" fill="white"/>        
                                    </svg>
                                    {{__("Upload image", "all-signs-options-pro")}}
                                </button>
                                <div :class="`asowp-relative asowp-w-[82px] asowp-h-[30px] asowp-rounded-md asowp-overflow-hidden`">
                                    <img v-if="borders.settings.customColorsPrevImg != ''" :src="borders.settings.customColorsPrevImg" alt="" class="asowp-absolute asowp-w-full asowp-h-full">
                                    <button v-if="borders.settings.customColorsPrevImg != ''" @click="()=>{borders.settings.customColorsPrevImg = ''}" :class="`asowp-bg-[#016464] asowp-absolute asowp-bottom-0 asowp-right-0 asowp-text-white asowp-p-1 asowp-rounded-tl-lg asowp-border-none`">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="asowp-w-4 asowp-h-4">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>             
                    </div>
                </div>
                <hr class="Polaris-Divider asowp-w-full" style="border: 1px solid #ebebeb;">
                <div v-show="!isFetching" class="asowp-flex asowp-space-x-4 asowp-px-4 asowp-py-4 asowp-justify-end asowp-items-end">
                    <div class="asowp-bg-[#016464] asowp-rounded">
                        <button @click="updateBorders" class="asowp-flex asowp-bg-transparent asowp-w-fit asowp-space-x-2 asowp-h-fit asowp-text-white  asowp-px-12 asowp-p-2.5 asowp-border-none asowp-opacity-90 hover:asowp-border-none hover:asowp-text-white hover:asowp-opacity-100 asowp-cursor-pointer">
                            <div class="asowp-translate-y-1">
                                <img src="../../../../../../../assets/icons/ic_loading_gray.svg" class="asowp-w-5 asowp-w-5" v-if="isLoading" :disabled="isLoading"/>
                                <svg v-if="!isLoading" class="asowp-w-4 asowp-h-4" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2.5 1.25C2.16848 1.25 1.85054 1.3817 1.61612 1.61612C1.3817 1.85054 1.25 2.16848 1.25 2.5V17.5C1.25 17.8315 1.3817 18.1495 1.61612 18.3839C1.85054 18.6183 2.16848 18.75 2.5 18.75H17.5C17.8315 18.75 18.1495 18.6183 18.3839 18.3839C18.6183 18.1495 18.75 17.8315 18.75 17.5V2.5C18.75 2.16848 18.6183 1.85054 18.3839 1.61612C18.1495 1.3817 17.8315 1.25 17.5 1.25H11.875C11.5435 1.25 11.2255 1.3817 10.9911 1.61612C10.7567 1.85054 10.625 2.16848 10.625 2.5V11.6163L13.9325 8.3075C14.0499 8.19014 14.209 8.12421 14.375 8.12421C14.541 8.12421 14.7001 8.19014 14.8175 8.3075C14.9349 8.42486 15.0008 8.58403 15.0008 8.75C15.0008 8.91597 14.9349 9.07514 14.8175 9.1925L10.4425 13.5675C10.3844 13.6257 10.3155 13.6719 10.2395 13.7034C10.1636 13.7349 10.0822 13.7511 10 13.7511C9.91779 13.7511 9.83639 13.7349 9.76046 13.7034C9.68453 13.6719 9.61556 13.6257 9.5575 13.5675L5.1825 9.1925C5.12439 9.13439 5.07829 9.0654 5.04685 8.98948C5.0154 8.91356 4.99921 8.83218 4.99921 8.75C4.99921 8.66782 5.0154 8.58644 5.04685 8.51052C5.07829 8.4346 5.12439 8.36561 5.1825 8.3075C5.24061 8.24939 5.3096 8.20329 5.38552 8.17185C5.46144 8.1404 5.54282 8.12421 5.625 8.12421C5.70718 8.12421 5.78856 8.1404 5.86448 8.17185C5.9404 8.20329 6.00939 8.24939 6.0675 8.3075L9.375 11.6163V2.5C9.375 1.83696 9.63839 1.20107 10.1072 0.732233C10.5761 0.263392 11.212 0 11.875 0L17.5 0C18.163 0 18.7989 0.263392 19.2678 0.732233C19.7366 1.20107 20 1.83696 20 2.5V17.5C20 18.163 19.7366 18.7989 19.2678 19.2678C18.7989 19.7366 18.163 20 17.5 20H2.5C1.83696 20 1.20107 19.7366 0.732233 19.2678C0.263392 18.7989 0 18.163 0 17.5V2.5C0 1.83696 0.263392 1.20107 0.732233 0.732233C1.20107 0.263392 1.83696 0 2.5 0L5.625 0C5.79076 0 5.94973 0.065848 6.06694 0.183058C6.18415 0.300269 6.25 0.45924 6.25 0.625C6.25 0.79076 6.18415 0.949732 6.06694 1.06694C5.94973 1.18415 5.79076 1.25 5.625 1.25H2.5Z" fill="white"/>
                                </svg>
                            </div>
                            <span class="asowp-font-semibold asowp-text-[16px]">{{__("Save", "all-signs-options-pro")}}</span>
                        </button>
                    </div>
                </div>
            </div>
            
            
        </div>
        <div class="asowp-space-y-2 asowp-translate-y-2 asowp-bg-[#fff] asowp-p-4 asowp-rounded-[10px] asowp-border-[2px] asowp-border-solid asowp-border-[#d9d9d9]" v-if="isNewBorder">
            <div class="asowp-text-[16px] asowp-font-medium asowp-py-8 asowp-space-y-4 ">
                
                <div class="asowp-flex asowp-space-x-2 asowp-justify-between">
                    <div class="asowp-w-[50%] asowp-space-y-2 asowp-text-[12px] asowp-flex asowp-flex-col">
                        <label for="" class="asowp-font-normal">{{__("Select border", "all-signs-options-pro")}}</label>
                        <Multiselect
                            v-model="border.manageBorderId"
                            :placeholder="__('Select Border', 'all-signs-options-pro')"
                            :options="notSelectedManageBorders"
                            label="name"
                            trackBy="name"
                            class="asowp-h-[35px] asowp-rounded-[10px]"
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
                    <div class="asowp-w-[50%] asowp-space-y-2 asowp-text-[12px] asowp-flex asowp-flex-col">
                        <label for="" class="asowp-font-normal">{{__('Additional Price','all-signs-options-pro')}}</label>
                        <input type="number" v-model="border.additionalPrice" class="asowp-rounded asowp-w-full asowp-h-[40px]" style="border-radius:5px;">
                    </div>
                </div>
                <div class="asowp-w-full asowp-space-y-2 asowp-flex asowp-flex-col">
                    <label for="" class="asowp-text-[16px] asowp-font-normal asowp-font-[600]">Exclude Shapes</label>
                    <Multiselect
                            v-model="border.excludeShapes"
                            :placeholder="__('Select shapes','all-signs-options-pro')"
                            :options="MaterialSimpleShapes"
                            label="name"
                            trackBy="name"
                            mode="tags"
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
                    <span class="asowp-text-[#444444] asowp-text-[12px]">exclude the shapes for this border</span>   
                </div>
                <div class="asowp-w-full asowp-space-y-2 asowp-flex asowp-flex-col">
                    <label for="" class="asowp-text-[16px] asowp-font-normal">{{ __('Exclude size','all-signs-options-pro')}}</label>
                    <Multiselect
                        v-model="border.excludeSizes" 
                        :placeholder="__('Select Sizes','all-signs-options-pro')"
                        label="name"
                        trackBy="id"
                        :options="MaterialSimpleSizes"
                        mode="tags"
                        class="asowp-h-[35px] asowp-rounded-[5px]"
                    />
                    <span class="asowp-text-[#444444] asowp-text-[12px]">{{__("exclude the sizes of this border",'all-signs-options-pro')}}</span>
                    
                </div>
                <hr class="Polaris-Divider" style="border: 1px solid #ebebeb;">
                <div class="asowp-flex asowp-space-x-4 asowp-px-4 asowp-py-4 asowp-justify-end asowp-items-end">
                    <div class="asowp-bg-[#016464] asowp-rounded">
                        <button :disabled="isLoading" class="asowp-flex asowp-bg-transparent asowp-w-fit asowp-space-x-2 asowp-h-fit asowp-px-8 asowp-p-2 asowp-border-none asowp-text-white asowp-opacity-90 hover:asowp-border-none hover:asowp-text-white hover:asowp-opacity-100 asowp-cursor-pointer" @click="back">
                            <svg class="asowp-w-6 asowp-h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 12L5 8V11L17.17 11C17.3756 10.414 17.7586 9.90661 18.2657 9.54821C18.7729 9.18981 19.379 8.9982 20 9C20.7956 9 21.5587 9.31607 22.1213 9.87868C22.6839 10.4413 23 11.2044 23 12C23 12.7956 22.6839 13.5587 22.1213 14.1213C21.5587 14.6839 20.7956 15 20 15C18.69 15 17.58 14.17 17.17 13L5 13V16L1 12Z" fill="currentColor"/>
                            </svg>

                            <div class="asowp-font-semibold asowp-text-[16px]">{{__("Back",'all-signs-options-pro')}}</div>
                        </button>
                    </div>
                    <div class="asowp-bg-[#016464] asowp-rounded" v-if="isEdit">
                        <button @click="updateMaterialBorders" :class="`asowp-rounded asowp-flex ${!isLoading ? 'asowp-bg-amber-400 ' :'asowp-bg-amber-500'} asowp-w-fit asowp-space-x-2 asowp-h-fit asowp-px-8 asowp-text-white asowp-p-2 asowp-border-none asowp-opacity-90 hover:asowp-border-none hover:asowp-text-white hover:asowp-opacity-100 asowp-cursor-pointer`">
                            <img src="../../../../../../../assets/icons/ic_loading_gray.svg" class="asowp-w-5 asowp-w-5" v-if="isLoading" :disabled="isLoading"/>
                            <div class="asowp-font-semibold asowp-text-[16px]">{{__("Update",'all-signs-options-pro')}}</div>
                        </button>
                    </div>
                    <div class="asowp-bg-[#016464] asowp-rounded" v-if="!isEdit">
                        <button @click="addBorders" class="asowp-flex asowp-bg-transparent asowp-w-fit asowp-space-x-2 asowp-h-fit asowp-text-white  asowp-px-12 asowp-p-2.5 asowp-border-none asowp-opacity-90 hover:asowp-border-none hover:asowp-text-white hover:asowp-opacity-100 asowp-cursor-pointer">
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
            
        </div>
         <!-- Delete Modal-->
         <div v-if="openModal" @click.self="closeModal" class="asowp-z-[999] asowp-bg-gray-400 asowp-overflow-y-auto asowp-overflow-x-hidden asowp-fixed asowp-top-0 asowp-right-[25%] asowp-left-[75%]  asowp-flex asowp-justify-center asowp-items-center asowp-w-full md:asowp-inset-0 asowp-h-full">
            <div class="asowp-relative asowp-p-4 asowp-w-full asowp-max-w-md asowp-max-h-full">
                <div class="asowp-relative asowp-bg-white asowp-rounded-lg asowp-shadow dark:bg-gray-700">
                    <button @click.stop="closeModal" type="button" :class="`${isLoading ? 'asowp-cursor-not-allowed' : 'asowp-cursor-pointer'} asowp-absolute asowp-top-3 asowp-end-2.5 asowp-text-gray-400 asowp-bg-transparent hover:bg-gray-200 hover:text-gray-900 asowp-rounded-lg asowp-text-sm asowp-w-8 asowp-h-8 asowp-ms-auto asowp-inline-flex asowp-justify-center asowp-items-center dark:hover:bg-gray-600 dark:hover:text-white`" data-modal-hide="popup-modal">
                        <svg class="asowp-w-3 asowp-h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                        <span class="asowp-sr-only">{{__("Close modal", "all-signs-options-pro")}}</span>
                    </button>
                    <div class="asowp-p-4 md:p-5 asowp-text-center">
                        <svg class="asowp-mx-auto asowp-mb-4 asowp-text-gray-400 asowp-w-12 asowp-h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                        </svg>
                        <h3 class="asowp-mb-5 asowp-text-lg asowp-font-normal asowp-text-gray-500 dark:text-gray-400">{{__("Are you sure you want to delete this border?", "all-signs-options-pro")}}</h3>
                        <input v-model="manageBorders[borderId].name" readonly class="asowp-rounded asowp-w-full asowp-h-[35px] asowp-text-center asowp-p-4 asowp-my-2 asowp-border-none" />
                        <button @click="deleteBorders" data-modal-hide="popup-modal" type="button" :class="`asowp-border-solid asowp-text-white ${!isLoading ? 'asowp-bg-red-600 asowp-cursor-pointer' :'asowp-bg-red-700 asowp-cursor-not-allowed'} hover:bg-red-800 focus:ring-4 focus:outline-none asowp-my-2 asowp-border-none  focus:ring-red-300 dark:focus:ring-red-800 asowp-font-medium asowp-rounded-lg asowp-text-sm asowp-inline-flex asowp-items-center asowp-px-5 asowp-py-2.5 asowp-text-center`">
                            <img src="../../../../../../../assets/icons/ic_loading_gray.svg" class="asowp-w-5 asowp-w-5" v-if="isLoading" :disabled="isLoading"/>
                            {{__("Yes, I'm sure",'all-signs-options-pro')}}
                        </button>
                        <button @click.stop="closeModal" data-modal-hide="popup-modal" type="button" :class="`asowp-border-solid asowp-py-2.5 asowp-px-5 asowp-ms-3 asowp-text-sm asowp-font-medium asowp-text-gray-900 asowp-my-2  asowp-border-gray-500 asowp-border-white focus:outline-none asowp-bg-white asowp-rounded-lg asowp-border asowp-border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 ${isLoading ? 'asowp-cursor-not-allowed' : 'asowp-cursor-pointer'}`">{{__("No, cancel", "all-signs-options-pro")}}</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import Multiselect from '@vueform/multiselect'
import api from "@/admin/Api/api";
import { ref,onMounted } from "vue";
import { useRoute } from 'vue-router';
import toastMessage from "@/admin/utils/functions";
import { __, _x, _n, _nx, sprintf, setLocaleData } from "@wordpress/i18n";
const route = useRoute()
const configID = ref(route.params.configId);
const materialId = ref(route.params.materialId);

const isFetching = ref(false);
const isNewBorder = ref(false);
const isLoading = ref(false);
const borders = ref({
    settings:{
        borderColorsLabel:"Borders Colors",
        colors:[],
        enableBorderWidth:true,
        enableBorderColor:true,
        customColorsPrevImg:''
    },
    allBorders:[]
});
const manageBorders = ref([]);
const notSelectedManageBorders = ref([])
const MaterialSimpleSizes = ref([]);
const MaterialSimpleShapes = ref([]);
const borderId = ref(null);
const isEdit = ref(false);
const openModal = ref(false);
const noBordersFound = ref('');
const showParams = ref([]);
const border = ref({
    manageBorderId:0,
    additionalPrice:0,
    excludeSizes: [],
    excludeShapes:[]
});

const checkNotSelectedManageBorders = ( key= -1) => {
    var notSelectedManageBorders = [];
    let index = 0; 
    while (index < manageBorders.value.length) {
        var indexUse = false;
        for (let i = 0; i <  borders.value.allBorders.length; i++) {
            if(index == borders.value.allBorders[i].manageBorderId){
                indexUse = true;
            }
        }
        if(!indexUse){
            notSelectedManageBorders.push({name:manageBorders.value[index].name,value:index,icon:manageBorders.value[index].icon});
        }
        index++;
    }
    if(key!=-1){
        notSelectedManageBorders.push({name:manageBorders.value[key].name,value:key,icon:manageBorders.value[key].icon});
    }
    return notSelectedManageBorders;
}
onMounted(async ()=>{
    isFetching.value = true;
    await fetchMaterialShapes();
    await fetchMaterialBorders();
    isFetching.value = false;
});

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

const fetchMaterialBorders = async () => {
    const result = await api.getMaterialSimpleBorders(configID.value,materialId.value);
    borders.value = result.materialBorders;
    manageBorders.value=result.manageBorders;
    var tab = [];
    for (let index = 0; index < result.materialSizes.length; index++) {
        tab.push({name:result.materialSizes[index].label,value:index});
    }
    MaterialSimpleSizes.value = tab;
    
    // Initialize showParams array
    let paramsTab = [];
    for (let index = 0; index < borders.value.allBorders.length; index++) {
        paramsTab.push(false);
    }
    showParams.value = paramsTab;
    
    if(result.message){
        noBordersFound.value = result.message;
    }
};
const checkIfThereDefault = ()=> {
    var hasDefault = false;
    let index =0;
    while (index<borders.value.allBorders.length && !hasDefault) {
        if(borders.value.allBorders[index].isDefault){
            hasDefault = true;
        }
        index++;
    }
    if(!hasDefault && borders.value.allBorders[0]){
        borders.value.allBorders[0].isDefault = true;
    }
}
const updateBorders = async () => {
    isLoading.value = true;
    checkIfThereDefault();
    const result = await api.updateMaterialSimpleBorders(configID.value,materialId.value,borders.value);
    if(result.success){
        await fetchMaterialBorders();
        if(result.success == true ) {
            toastMessage(result.message);
        }else{
            toastMessage(result.message,"warning");
        }
        isLoading.value = false;
        isNewBorder.value = false;
        isEdit.value=false;
        openModal.value = false;
        border.value = {
            isDefault:false,
            manageBorderId:0,
            additionalPrice:0,
            excludeSizes: [],
            excludeShapes:[]
        };
    }else{
        isLoading.value = false;
        toastMessage(result.message,"error");
        isNewBorder.value = false;
        openModal.value = false;
        isEdit.value=false;
        border.value = {
            isDefault:false,
            manageBorderId:0,
            additionalPrice:0,
            excludeSizes: [],
            excludeShapes:[]
        };
    }
};

const selectMaterialBorder = (id,bd,isDeleting=false) => {
    if(isDeleting){
        borderId.value = id;
        closeModal();
    }else{
        border.value = bd;
        notSelectedManageBorders.value = checkNotSelectedManageBorders(bd.manageBorderId);
        isEdit.value = true;
        isNewBorder.value = true;
    }
};
const selectCustomBorderColorPrevImage = async(e) => { 
    e.preventDefault();
    var uploader = wp.media(
        {
            title: __("Select Custom Border Color Preview Image", "all-signs-options-pro"),
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
                            borders.value.settings.customColorsPrevImg = (attachment.url);
                        }
                    }
                );
            }
        )
        .open();
}

const addNewColor = ()=> {
    borders.value.settings.colors.push({name:"",codeHex:"#000000",additionalPrice:0,prevImg:""});
}
const removeBordersColor = (key)=> {
    borders.value.settings.colors.splice(key,1);
}
const changeBorderColorCodeHex = (event,key) => {
    if(event.target.value[0]!=='#'){
        event.target.value = '#'+ event.target.value;
    }
    borders.value.settings.colors[key].codeHex = event.target.value;
}
const addBorders = async () => {
    isLoading.value = true;
    borders.value.allBorders.push(border.value);
    // showParams will be initialized in fetchMaterialBorders after updateBorders
    await updateBorders();
};
const updateMaterialBorders = async () => {
    isLoading.value = true;
    borders.value.allBorders[borderId.value] = border.value;
    await updateBorders();
};

const deleteBorders = async () => {
    isLoading.value = true;
    borders.value.allBorders.splice(borderId.value,1);
    // showParams will be initialized in fetchMaterialBorders after updateBorders
    await updateBorders();
};


const closeModal = () => {
    openModal.value = !openModal.value;
};

const newBorder = () => {
    notSelectedManageBorders.value = checkNotSelectedManageBorders();
    if(notSelectedManageBorders.value.length>0)
        isNewBorder.value = true;
    else
        toastMessage(__("No more choice of border", "all-signs-options-pro"),"warning");
}
const back = () => {
    isNewBorder.value = false;
    isEdit.value = false;
    borderId.value  = null;
    border.value = {
        isDefault:false,
        manageBorderId:0,
        additionalPrice:0,
        excludeSizes: [],
        excludeShapes:[]
    };
}

const enableBorderWidth = () => {
    borders.value.settings.enableBorderWidth = !borders.value.settings.enableBorderWidth;
};
const enableBorderColor = () => {
    borders.value.settings.enableBorderColor = !borders.value.settings.enableBorderColor;
};

const selectDefault = async(key) =>{
    borders.value.allBorders[key].isDefault = true;
    for(let i=0; i<borders.value.allBorders.length; i++){
        if(i != key ){
            borders.value.allBorders[i].isDefault = false;
        }
    }
    await updateMaterialBorders();
}

const handleOpenBorderParams = (key) => {
    for (let index = 0; index < showParams.value.length; index++) {
        if (key != index) {
            showParams.value[index] = false;
        } else {
            showParams.value[key] = !showParams.value[key];
        }
    }
}

</script>
