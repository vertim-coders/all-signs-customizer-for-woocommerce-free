<template>
    <div>
        <div v-if="!isFetching" class="ascwo-space-y-1 ascwo-sticky ascwo-top-[130px] ascwo-z-[999] ascwo-w-full ascwo-shadow-md ascwo-flex ascwo-justify-center ascwo-items-center ascwo-bg-[#F4F4F4] ascwo-translate-y-2">
            <div class="ascwo-bg-[#F4F4F4] ascwo-p-2 ascwo-space-x-6 ascwo-justify-center ascwo-items-center ascwo-flex">
                <button @click="state='pages'" :class="`ascwo-flex ascwo-text-[12px] ascwo-px-6 ascwo-p-2 ascwo-w-fit ascwo-h-fit ascwo-bg-white ascwo-rounded ascwo-border-none ascwo-text-black ascwo-font-semibold ${ state == 'pages' ?'ascwo-font-bold ascwo-text-[#016464] ascwo-bg-[#E1E1E1]':''} hover:ascwo-bg-[#E1E1E1] hover:ascwo-text-[#016464] ascwo-cursor-pointer`" >{{ __('Pages', 'all-signs-customizer-for-woocommerce') }}</button>
                <button @click="state='buttons'" :class="`ascwo-flex ascwo-text-[12px] ascwo-px-6 ascwo-p-2 ascwo-w-fit ascwo-h-fit ascwo-bg-white ascwo-rounded ascwo-border-none ascwo-text-black ascwo-font-semibold ${ state == 'buttons' ?'ascwo-font-bold ascwo-text-[#016464] ascwo-bg-[#E1E1E1]':''} hover:ascwo-bg-[#E1E1E1] hover:ascwo-text-[#016464] ascwo-cursor-pointer`" >{{ __('Buttons', 'all-signs-customizer-for-woocommerce') }}</button>
            </div>
        </div>
        <div v-if="isFetching" class="ascwo-bg-white ascwo-border-solid ascwo-border ascwo-border-[#D1D1D1] ascwo-flex ascwo-flex-col ascwo-space-y-2 ascwo-justify-center ascwo-items-center ascwo-w-full ascwo-h-[306px] p-4">
            <img class="ascwo-w-[200px] ascwo-h-[200px]" :src="loadingIcon" alt="">
        </div>
        <div class="ascwo-space-y-4 ascwo-py-10" v-if="!isFetching">
            <div v-if="state == 'pages'">
                <div class="ascwo-bg-[#F8F9FB] ascwo-px-8 ascwo-py-2 ascwo-border-solid ascwo-border-[1px] ascwo-border-[#DDDDDD]">
                    <div class="ascwo-flex ascwo-space-x-4 ascwo-py-4">
                        <label class="ascwo-text-[12px] ascwo-text-[#444444] ascwo-py-1">{{ __('With which tag do you want the configurator title to be displayed?', 'all-signs-customizer-for-woocommerce') }}</label>
                        <select v-model="configPages.others.titleBalise">
                            <option :value="balise" v-for="(balise,key) in titleBalise" :key="key">{{balise}}</option>
                        </select>
                    </div>
                    <div class="ascwo-flex ascwo-flex-col ascwo-space-y-3">
                        <label class="ascwo-text-[12px] ascwo-text-[#444444]">{{ __('Select the configuration Page', 'all-signs-customizer-for-woocommerce') }}</label>
                        <select class="ascwo-w-full" v-model="configPages.configuratorPage">
                            <option v-for="(page,key) in pages" :value="page.id" :key="key">{{ page.title }}</option>
                        </select>
                    </div>
                    <div class="ascwo-flex ascwo-justify-end ascwo-space-x-2 ascwo-w-4/4 ascwo-bg-[#F8F9FB] ascwo-text-[12px] ascwo-px-4 ascwo-py-4 ascwo-pb-2">
                    
                        <button :disabled="isLoading" @click="handleAddNewPage('design')" class="ascwo-flex ascwo-w-fit ascwo-h-fit ascwo-rounded ascwo-bg-[#016464] ascwo-px-4 ascwo-space-x-2 ascwo-p-1.5 ascwo-border-none ascwo-text-white ascwo-opacity-90 hover:ascwo-opacity-100 ascwo-cursor-pointer">
                            <svg class="ascwo-w-5 ascwo-h-5" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g id="plus-lg">
                                <path id="Vector" fill-rule="evenodd" clip-rule="evenodd" d="M11 2.75C11.1823 2.75 11.3572 2.82243 11.4861 2.95136C11.6151 3.0803 11.6875 3.25516 11.6875 3.4375V10.3125H18.5625C18.7448 10.3125 18.9197 10.3849 19.0486 10.5139C19.1776 10.6428 19.25 10.8177 19.25 11C19.25 11.1823 19.1776 11.3572 19.0486 11.4861C18.9197 11.6151 18.7448 11.6875 18.5625 11.6875H11.6875V18.5625C11.6875 18.7448 11.6151 18.9197 11.4861 19.0486C11.3572 19.1776 11.1823 19.25 11 19.25C10.8177 19.25 10.6428 19.1776 10.5139 19.0486C10.3849 18.9197 10.3125 18.7448 10.3125 18.5625V11.6875H3.4375C3.25516 11.6875 3.0803 11.6151 2.95136 11.4861C2.82243 11.3572 2.75 11.1823 2.75 11C2.75 10.8177 2.82243 10.6428 2.95136 10.5139C3.0803 10.3849 3.25516 10.3125 3.4375 10.3125H10.3125V3.4375C10.3125 3.25516 10.3849 3.0803 10.5139 2.95136C10.6428 2.82243 10.8177 2.75 11 2.75Z" fill="white"/>
                                </g>
                            </svg>
                            <div class="ascwo-text-[14px]">
                                {{ __('Add new page', 'all-signs-customizer-for-woocommerce') }}
                            </div>
                        </button>
                    </div>
                </div>
            </div>
            <div v-if="state == 'buttons'" class="ascwo-px-10">
                <div class="ascwo-space-y-3">
                    <div
                      v-for="item in buttonItems"
                      :key="item.key"
                      class="ascwo-flex ascwo-items-center ascwo-justify-between ascwo-p-4 ascwo-border ascwo-border-[#DDDDDD] ascwo-rounded ascwo-bg-[#F8F9FB]"
                    >
                        <div class="ascwo-space-y-1">
                            <div class="ascwo-text-[14px] ascwo-font-bold ascwo-text-[#444444]">
                                {{ item.label }}
                            </div>
                            <div class="ascwo-text-[12px] ascwo-text-gray-600">
                                {{ __('Text:', 'all-signs-customizer-for-woocommerce') }} {{ configPages.buttons[item.textKey] }}
                            </div>
                            <div v-if="item.note" class="ascwo-text-[11px] ascwo-text-gray-500">
                                {{ item.note }}
                            </div>
                        </div>
                        <div class="ascwo-flex ascwo-items-center ascwo-gap-3">
                            <button
                              type="button"
                              @click="openButtonStyleModal(item.key)"
                              class="ascwo-bg-white ascwo-border ascwo-border-[#e5e7eb] ascwo-rounded ascwo-px-4 ascwo-py-2 ascwo-text-[12px] ascwo-font-semibold ascwo-text-[#303030] hover:ascwo-bg-[#f1f5f9] ascwo-cursor-pointer"
                            >
                                {{ __('Configure', 'all-signs-customizer-for-woocommerce') }}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="ascwo-bg-[#F8F9FB] ascwo-flex ascwo-space-x-4 ascwo-px-4 ascwo-py-3 ascwo-justify-end ascwo-items-end">
                <div class="ascwo-bg-[#016464] ascwo-rounded">
                    <button :disabled="isLoading" @click="saveConfigPage" class="ascwo-flex ascwo-bg-transparent ascwo-w-fit ascwo-space-x-2 ascwo-h-fit ascwo-text-white ascwo-px-8 ascwo-p-2.5 ascwo-rounded ascwo-border-none ascwo-opacity-90 hover:ascwo-opacity-100 hover:ascwo-border-none hover:ascwo-text-white hover:ascwo-bg-[#016464] ascwo-cursor-pointer">
                        <div class="ascwo-translate-y-1">
                            <img src="../../../../../assets/icons/ic_loading_gray.svg" class="ascwo-w-5 ascwo-w-5" v-if="isLoading" :disabled="isLoading"/>
                            <svg v-if="!isLoading" class="ascwo-w-4 ascwo-h-4" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2.5 1.25C2.16848 1.25 1.85054 1.3817 1.61612 1.61612C1.3817 1.85054 1.25 2.16848 1.25 2.5V17.5C1.25 17.8315 1.3817 18.1495 1.61612 18.3839C1.85054 18.6183 2.16848 18.75 2.5 18.75H17.5C17.8315 18.75 18.1495 18.6183 18.3839 18.3839C18.6183 18.1495 18.75 17.8315 18.75 17.5V2.5C18.75 2.16848 18.6183 1.85054 18.3839 1.61612C18.1495 1.3817 17.8315 1.25 17.5 1.25H11.875C11.5435 1.25 11.2255 1.3817 10.9911 1.61612C10.7567 1.85054 10.625 2.16848 10.625 2.5V11.6163L13.9325 8.3075C14.0499 8.19014 14.209 8.12421 14.375 8.12421C14.541 8.12421 14.7001 8.19014 14.8175 8.3075C14.9349 8.42486 15.0008 8.58403 15.0008 8.75C15.0008 8.91597 14.9349 9.07514 14.8175 9.1925L10.4425 13.5675C10.3844 13.6257 10.3155 13.6719 10.2395 13.7034C10.1636 13.7349 10.0822 13.7511 10 13.7511C9.91779 13.7511 9.83639 13.7349 9.76046 13.7034C9.68453 13.6719 9.61556 13.6257 9.5575 13.5675L5.1825 9.1925C5.12439 9.13439 5.07829 9.0654 5.04685 8.98948C5.0154 8.91356 4.99921 8.83218 4.99921 8.75C4.99921 8.66782 5.0154 8.58644 5.04685 8.51052C5.07829 8.4346 5.12439 8.36561 5.1825 8.3075C5.24061 8.24939 5.3096 8.20329 5.38552 8.17185C5.46144 8.1404 5.54282 8.12421 5.625 8.12421C5.70718 8.12421 5.78856 8.1404 5.86448 8.17185C5.9404 8.20329 6.00939 8.24939 6.0675 8.3075L9.375 11.6163V2.5C9.375 1.83696 9.63839 1.20107 10.1072 0.732233C10.5761 0.263392 11.212 0 11.875 0L17.5 0C18.163 0 18.7989 0.263392 19.2678 0.732233C19.7366 1.20107 20 1.83696 20 2.5V17.5C20 18.163 19.7366 18.7989 19.2678 19.2678C18.7989 19.7366 18.163 20 17.5 20H2.5C1.83696 20 1.20107 19.7366 0.732233 19.2678C0.263392 18.7989 0 18.163 0 17.5V2.5C0 1.83696 0.263392 1.20107 0.732233 0.732233C1.20107 0.263392 1.83696 0 2.5 0L5.625 0C5.79076 0 5.94973 0.065848 6.06694 0.183058C6.18415 0.300269 6.25 0.45924 6.25 0.625C6.25 0.79076 6.18415 0.949732 6.06694 1.06694C5.94973 1.18415 5.79076 1.25 5.625 1.25H2.5Z" fill="white"/>
                            </svg>
                        </div>
                        <span class="ascwo-font-semibold ascwo-text-[16px]">{{ __('Save', 'all-signs-customizer-for-woocommerce') }}</span>
                    </button>
                </div>
            </div>
        </div>
        <div v-if="openModal" @click.self="setBack" class="ascwo-z-[999] ascwo-bg-gray-400 ascwo-overflow-y-auto ascwo-overflow-x-hidden ascwo-fixed ascwo-top-0 ascwo-right-[25%] ascwo-left-[75%]  ascwo-flex ascwo-justify-center ascwo-items-center ascwo-w-full md:ascwo-inset-0 ascwo-h-full">
            <div class="ascwo-relative ascwo-p-4 ascwo-w-full ascwo-max-w-md ascwo-max-h-full">
                <div class="ascwo-relative ascwo-bg-white ascwo-rounded-lg ascwo-shadow dark:bg-gray-700">
                    <button @click.stop="setBack" type="button" :class="`${isLoading ? 'ascwo-cursor-not-allowed' : 'ascwo-cursor-pointer'} ascwo-absolute ascwo-top-3 ascwo-end-2.5 ascwo-text-gray-400 ascwo-bg-transparent hover:bg-gray-200 hover:text-gray-900 ascwo-rounded-lg ascwo-text-sm ascwo-w-8 ascwo-h-8 ascwo-ms-auto ascwo-inline-flex ascwo-justify-center ascwo-items-center dark:hover:bg-gray-600 dark:hover:text-white`" data-modal-hide="popup-modal">
                        <svg class="ascwo-w-3 ascwo-h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                        <span class="ascwo-sr-only">{{ __('Close modal', 'all-signs-customizer-for-woocommerce') }}</span>
                    </button>
                    <div class="ascwo-p-4 md:p-5 ascwo-text-center">
                        <svg class="ascwo-mx-auto ascwo-mb-4 ascwo-text-gray-400 ascwo-w-12 ascwo-h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                        </svg>
                        <h3 class="ascwo-mb-5 ascwo-text-lg ascwo-font-normal ascwo-text-gray-500 dark:text-gray-400">{{ __('Give your page title', 'all-signs-customizer-for-woocommerce') }}</h3>
                        <input v-model="page.title" class="ascwo-rounded ascwo-w-full ascwo-h-[35px] ascwo-p-4 ascwo-border-solid ascwo-border-[#016464] ascwo-my-2 focus:ascwo-border-solid focus:ascwo-border-[#016464] focus:ascwo-ring-4 focus:ascwo-ring-[#016460]" />
                        <button @click="addNewPage()" data-modal-hide="popup-modal" type="button" :class="`ascwo-border-solid ascwo-text-white ${!isLoading ? 'ascwo-bg-[#016464] ascwo-cursor-pointer' :'ascwo-bg-[#016464] ascwo-cursor-not-allowed'} hover:ascwo-bg-[#016460] focus:ascwo-ring-4 focus:ascwo-outline-none ascwo-my-2 ascwo-border-none  focus:ascwo-ring-[#016464]  ascwo-font-medium ascwo-rounded-lg ascwo-text-sm ascwo-inline-flex ascwo-items-center ascwo-px-5 ascwo-py-2.5 ascwo-text-center`">
                            <img src="../../../../../assets/icons/ic_loading_gray.svg" class="ascwo-w-5 ascwo-w-5" v-if="isLoading" :disabled="isLoading"/>
                            {{ __("Yes, I'm sure", "all-signs-customizer-for-woocommerce") }}
                        </button>
                        <button @click.stop="setBack" data-modal-hide="popup-modal" type="button" :class="`ascwo-border-solid ascwo-py-2.5 ascwo-px-5 ascwo-ms-3 ascwo-text-sm ascwo-font-medium ascwo-text-gray-900 ascwo-my-2  ascwo-border-gray-500 ascwo-border-white focus:outline-none ascwo-bg-white ascwo-rounded-lg ascwo-border ascwo-border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 ${isLoading ? 'ascwo-cursor-not-allowed' : 'ascwo-cursor-pointer'}`">{{ __('No, cancel', 'all-signs-customizer-for-woocommerce') }}</button>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="buttonStyleModalOpen" class="ascwo-z-[999] ascwo-bg-black/40 ascwo-fixed ascwo-inset-0 ascwo-flex ascwo-items-center ascwo-justify-center">
            <div class="ascwo-absolute ascwo-inset-0" @click="closeButtonStyleModal"></div>
            <div class="ascwo-relative ascwo-w-[min(860px,95vw)] ascwo-max-h-[calc(100vh-6rem)] ascwo-bg-white ascwo-rounded-2xl ascwo-shadow-xl ascwo-overflow-hidden ascwo-flex ascwo-flex-col">
                <div class="ascwo-flex ascwo-items-center ascwo-justify-between ascwo-px-5 ascwo-py-3 ascwo-border-b ascwo-border-[#e5e7eb]">
                    <div class="ascwo-text-[14px] ascwo-font-semibold">{{ activeButtonLabel }}</div>
                    <button class="ascwo-p-1 ascwo-rounded-md hover:ascwo-bg-[#f3f4f6] ascwo-border-0 ascwo-bg-transparent ascwo-cursor-pointer" @click="closeButtonStyleModal">✕</button>
                </div>
                <div class="ascwo-flex-1 ascwo-min-h-0 ascwo-p-5 ascwo-space-y-4 ascwo-overflow-y-auto">
                    <div class="ascwo-flex ascwo-flex-col md:ascwo-flex-row ascwo-gap-6">
                        <div class="ascwo-flex-1 ascwo-space-y-3">
                            <label class="ascwo-text-[13px] ascwo-font-semibold ascwo-text-[#444444]">{{ __('Button text', 'all-signs-customizer-for-woocommerce') }}</label>
                            <input type="text" class="ascwo-w-full ascwo-h-[38px] ascwo-px-3 ascwo-border ascwo-border-[#DDDDDD] ascwo-rounded" v-model="configPages.buttons[activeTextKey]" />
                            <div class="ascwo-mt-2 ascwo-text-[12px] ascwo-text-gray-600">{{ __('Live preview (hover to test hover colors)', 'all-signs-customizer-for-woocommerce') }}</div>
                            <div class="ascwo-inline-flex ascwo-items-center ascwo-gap-3">
                                <button
                                  type="button"
                                  :style="previewStyle"
                                  @mouseenter="hoverPreview=true"
                                  @mouseleave="hoverPreview=false"
                                  class="ascwo-border-none ascwo-cursor-pointer"
                                >
                                  {{ configPages.buttons[activeTextKey] }}
                                </button>
                                <button type="button" class="ascwo-bg-white ascwo-border ascwo-border-[#e5e7eb] ascwo-rounded ascwo-px-3 ascwo-py-2 ascwo-text-[12px] ascwo-font-semibold ascwo-text-[#303030]" @click="hoverPreview = !hoverPreview">
                                    {{ hoverPreview ? __('Normal preview', 'all-signs-customizer-for-woocommerce') : __('Hover preview', 'all-signs-customizer-for-woocommerce') }}
                                </button>
                            </div>
                        </div>
                        <div class="ascwo-flex-1 ascwo-space-y-3">
                            <label class="ascwo-text-[13px] ascwo-font-semibold ascwo-text-[#444444]">{{ __('Quick style (no CSS needed)', 'all-signs-customizer-for-woocommerce') }}</label>
                            <div class="ascwo-grid ascwo-grid-cols-2 ascwo-gap-3">
                                <div>
                                    <label class="ascwo-text-[12px] ascwo-text-gray-600">{{ __('Background', 'all-signs-customizer-for-woocommerce') }}</label>
                                    <input type="color" class="ascwo-w-full ascwo-h-[38px] ascwo-border ascwo-border-[#DDDDDD] ascwo-rounded" v-model="configPages.buttonStyles[activeButtonKey].fields.background" />
                                </div>
                                <div>
                                    <label class="ascwo-text-[12px] ascwo-text-gray-600">{{ __('Text color', 'all-signs-customizer-for-woocommerce') }}</label>
                                    <input type="color" class="ascwo-w-full ascwo-h-[38px] ascwo-border ascwo-border-[#DDDDDD] ascwo-rounded" v-model="configPages.buttonStyles[activeButtonKey].fields.color" />
                                </div>
                                <div>
                                    <label class="ascwo-text-[12px] ascwo-text-gray-600">{{ __('Border color', 'all-signs-customizer-for-woocommerce') }}</label>
                                    <input type="color" class="ascwo-w-full ascwo-h-[38px] ascwo-border ascwo-border-[#DDDDDD] ascwo-rounded" v-model="configPages.buttonStyles[activeButtonKey].fields.borderColor" />
                                </div>
                                <div>
                                    <label class="ascwo-text-[12px] ascwo-text-gray-600">{{ __('Border width', 'all-signs-customizer-for-woocommerce') }}</label>
                                    <input type="text" class="ascwo-w-full ascwo-h-[38px] ascwo-px-3 ascwo-border ascwo-border-[#DDDDDD] ascwo-rounded" placeholder="0px" v-model="configPages.buttonStyles[activeButtonKey].fields.borderWidth" />
                                </div>
                                <div>
                                    <label class="ascwo-text-[12px] ascwo-text-gray-600">{{ __('Border radius', 'all-signs-customizer-for-woocommerce') }}</label>
                                    <input type="text" class="ascwo-w-full ascwo-h-[38px] ascwo-px-3 ascwo-border ascwo-border-[#DDDDDD] ascwo-rounded" placeholder="8px" v-model="configPages.buttonStyles[activeButtonKey].fields.borderRadius" />
                                </div>
                                <div>
                                    <label class="ascwo-text-[12px] ascwo-text-gray-600">{{ __('Font size', 'all-signs-customizer-for-woocommerce') }}</label>
                                    <input type="text" class="ascwo-w-full ascwo-h-[38px] ascwo-px-3 ascwo-border ascwo-border-[#DDDDDD] ascwo-rounded" placeholder="14px" v-model="configPages.buttonStyles[activeButtonKey].fields.fontSize" />
                                </div>
                                <div>
                                    <label class="ascwo-text-[12px] ascwo-text-gray-600">{{ __('Font weight', 'all-signs-customizer-for-woocommerce') }}</label>
                                    <input type="text" class="ascwo-w-full ascwo-h-[38px] ascwo-px-3 ascwo-border ascwo-border-[#DDDDDD] ascwo-rounded" placeholder="600" v-model="configPages.buttonStyles[activeButtonKey].fields.fontWeight" />
                                </div>
                                <div>
                                    <label class="ascwo-text-[12px] ascwo-text-gray-600">{{ __('Text transform', 'all-signs-customizer-for-woocommerce') }}</label>
                                    <select class="ascwo-w-full ascwo-h-[38px] ascwo-px-3 ascwo-border ascwo-border-[#DDDDDD] ascwo-rounded" v-model="configPages.buttonStyles[activeButtonKey].fields.textTransform">
                                        <option value="none">{{ __('None', 'all-signs-customizer-for-woocommerce') }}</option>
                                        <option value="uppercase">{{ __('Uppercase', 'all-signs-customizer-for-woocommerce') }}</option>
                                        <option value="lowercase">{{ __('Lowercase', 'all-signs-customizer-for-woocommerce') }}</option>
                                        <option value="capitalize">{{ __('Capitalize', 'all-signs-customizer-for-woocommerce') }}</option>
                                    </select>
                                </div>
                                <div>
                                    <label class="ascwo-text-[12px] ascwo-text-gray-600">{{ __('Padding Y', 'all-signs-customizer-for-woocommerce') }}</label>
                                    <input type="text" class="ascwo-w-full ascwo-h-[38px] ascwo-px-3 ascwo-border ascwo-border-[#DDDDDD] ascwo-rounded" placeholder="10px" v-model="configPages.buttonStyles[activeButtonKey].fields.paddingY" />
                                </div>
                                <div>
                                    <label class="ascwo-text-[12px] ascwo-text-gray-600">{{ __('Padding X', 'all-signs-customizer-for-woocommerce') }}</label>
                                    <input type="text" class="ascwo-w-full ascwo-h-[38px] ascwo-px-3 ascwo-border ascwo-border-[#DDDDDD] ascwo-rounded" placeholder="12px" v-model="configPages.buttonStyles[activeButtonKey].fields.paddingX" />
                                </div>
                                <div>
                                    <label class="ascwo-text-[12px] ascwo-text-gray-600">{{ __('Hover background', 'all-signs-customizer-for-woocommerce') }}</label>
                                    <input type="color" class="ascwo-w-full ascwo-h-[38px] ascwo-border ascwo-border-[#DDDDDD] ascwo-rounded" v-model="configPages.buttonStyles[activeButtonKey].hover.background" />
                                </div>
                                <div>
                                    <label class="ascwo-text-[12px] ascwo-text-gray-600">{{ __('Hover text', 'all-signs-customizer-for-woocommerce') }}</label>
                                    <input type="color" class="ascwo-w-full ascwo-h-[38px] ascwo-border ascwo-border-[#DDDDDD] ascwo-rounded" v-model="configPages.buttonStyles[activeButtonKey].hover.color" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="ascwo-rounded-xl ascwo-border ascwo-border-[#e5e7eb] ascwo-bg-[#fafafa] ascwo-p-4">
                        <div class="ascwo-flex ascwo-items-center ascwo-justify-between">
                            <div class="ascwo-text-[13px] ascwo-font-semibold ascwo-text-[#303030]">{{ __('Custom CSS (optional)', 'all-signs-customizer-for-woocommerce') }}</div>
                            <label class="ascwo-flex ascwo-items-center ascwo-gap-2 ascwo-text-[12px] ascwo-text-gray-600">
                                <input type="checkbox" v-model="configPages.buttonStyles[activeButtonKey].useCustomCss" />
                                {{ __('Use custom CSS', 'all-signs-customizer-for-woocommerce') }}
                            </label>
                        </div>
                        <div class="ascwo-mt-2 ascwo-text-[12px] ascwo-text-gray-600">
                            {{ __('If enabled, the CSS below overrides the quick style fields.', 'all-signs-customizer-for-woocommerce') }}
                        </div>
                        <textarea
                          class="ascwo-mt-3 ascwo-w-full ascwo-min-h-[110px] ascwo-p-3 ascwo-border ascwo-border-[#DDDDDD] ascwo-rounded"
                          v-model="configPages.buttonStyles[activeButtonKey].customCss"
                          placeholder="background:#1d6fe3; color:#fff; border-radius:8px; padding:10px 12px;"
                        ></textarea>
                    </div>
                </div>
                <div class="ascwo-flex ascwo-justify-end ascwo-px-5 ascwo-py-3 ascwo-border-t">
                    <button class="ascwo-px-4 ascwo-py-1.5 ascwo-text-white ascwo-bg-[#016464] ascwo-rounded-md" :disabled="isLoading" @click="handleButtonStyleDone">{{ __('Done', 'all-signs-customizer-for-woocommerce') }}</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { computed, ref, onMounted } from 'vue';
import api from '@/admin/Api/api';
import toastMessage from '@/admin/utils/functions';
import { __, _x, _n, _nx, sprintf, setLocaleData } from "@wordpress/i18n";
// Import du helper de traduction

const loadingIcon = `${String(window?.ascwo_data?.assets_url || "").replace(/\/$/, "")}/icons/ic_loading.svg`;
var isLoading = ref(false);
var isFetching= ref(false);
var pages = ref([]);
const state = ref('pages');
const defaultProductDesignButtonText = 'Start Designing';
var configPages = ref({
    configuratorPage:0,
    buttons:{
        productDesignButton: defaultProductDesignButtonText,
        recapsButtonOnCart:'Sign Recaps'        
    },
    buttonStyles:{},
    others:{
        titleBalise:'h1'
    }
});
const openModal = ref(false);
var page = ref({
    title:''
});
var titleBalise = ref(['h1','h2', 'h3', 'h4','h5','h6']);
onMounted(async()=>{
    isFetching.value = true;
    await fetchData();
});

const fetchData = async () => {
    const pgs = await api.getGlobalSettingsPages();
    const confPages = await api.getGlobalSettingsConfigPages();
    if(!confPages.message){
        configPages.value = {...configPages.value,...confPages};
    }
    cleanupTemplateSettings();
    ensureButtonStyleDefaults();
    pages.value = pgs;
    isFetching.value = false;
}

const saveConfigPage = async () => {
    isLoading.value = true;
    cleanupTemplateSettings();
    ensureButtonStyleDefaults();
    const op = await api.saveGlobalSettingsConfigPage(configPages.value);
    if(op.success){
        const confPages = await api.getGlobalSettingsConfigPages();
        if(!confPages.message){
            configPages.value = {...configPages.value,...confPages};
        }
        cleanupTemplateSettings();
        isLoading.value = false;
        if(op.success == true){
            toastMessage(op.message);
        }else{
            toastMessage(op.message,"warning");
        }
        page.value.title='';
        return op.success == true;
    }else{
        isLoading.value = false;
        page.value.title='';
        toastMessage(op.message,'error');
        return false;
    }
}

const buttonStyleModalOpen = ref(false);
const activeButtonKey = ref('productDesign');
const hoverPreview = ref(false);

const buttonItems = [
    {
        key: 'productDesign',
        textKey: 'productDesignButton',
        label: __('Customize button on product', 'all-signs-customizer-for-woocommerce'),
        note: __('Shown on product and product list pages.', 'all-signs-customizer-for-woocommerce')
    },
    {
        key: 'recapsButton',
        textKey: 'recapsButtonOnCart',
        label: __('Recaps button in cart', 'all-signs-customizer-for-woocommerce')
    }
];

const buttonMeta = {
    productDesign: {
        label: __('Customize button settings', 'all-signs-customizer-for-woocommerce'),
        textKey: 'productDesignButton'
    },
    recapsButton: {
        label: __('Recaps button settings', 'all-signs-customizer-for-woocommerce'),
        textKey: 'recapsButtonOnCart'
    }
};

const ensureButtonStyleDefaults = () => {
    const defaults = {
        productDesign: {
            fields:{
                background:'#1d6fe3',
                color:'#ffffff',
                borderColor:'#1d6fe3',
                borderWidth:'0px',
                borderStyle:'solid',
                borderRadius:'8px',
                paddingY:'10px',
                paddingX:'12px',
                fontSize:'14px',
                fontWeight:'600',
                textTransform:'none'
            },
            hover:{
                background:'#0b5fcc',
                color:'#ffffff',
                borderColor:'#0b5fcc'
            },
            customCss:'',
            useCustomCss:false
        },
        recapsButton: {
            fields:{
                background:'#6b7280',
                color:'#ffffff',
                borderColor:'#6b7280',
                borderWidth:'0px',
                borderStyle:'solid',
                borderRadius:'2px',
                paddingY:'5px',
                paddingX:'10px',
                fontSize:'14px',
                fontWeight:'600',
                textTransform:'none'
            },
            hover:{
                background:'#4b5563',
                color:'#ffffff',
                borderColor:'#4b5563'
            },
            customCss:'',
            useCustomCss:false
        }
    };
    if (!configPages.value.buttonStyles) {
        configPages.value.buttonStyles = {};
    }
    Object.keys(defaults).forEach((key) => {
        const current = configPages.value.buttonStyles[key] || {};
        configPages.value.buttonStyles[key] = {
            ...defaults[key],
            ...current,
            fields: {
                ...defaults[key].fields,
                ...(current.fields || {})
            },
            hover: {
                ...defaults[key].hover,
                ...(current.hover || {})
            }
        };
    });
};

const cleanupTemplateSettings = () => {
    delete configPages.value.templatePage;

    if (configPages.value.buttons) {
        if (
            !configPages.value.buttons.productDesignButton
            || ['Customize The Product', 'Make It Yours'].includes(configPages.value.buttons.productDesignButton)
        ) {
            configPages.value.buttons.productDesignButton = defaultProductDesignButtonText;
        }
        delete configPages.value.buttons.productTemplateButton;
        delete configPages.value.buttons.templateAddToCartButton;
        delete configPages.value.buttons.templateDesignButton;
        delete configPages.value.buttons.allTemplatesText;
    }

    if (configPages.value.buttonStyles) {
        delete configPages.value.buttonStyles.productTemplate;
        delete configPages.value.buttonStyles.templateAddToCart;
        delete configPages.value.buttonStyles.templateDesign;
        delete configPages.value.buttonStyles.templatesFilter;
    }
};

const activeButtonLabel = computed(() => buttonMeta[activeButtonKey.value]?.label || '');
const activeTextKey = computed(() => buttonMeta[activeButtonKey.value]?.textKey || 'productDesignButton');

const openButtonStyleModal = (key) => {
    activeButtonKey.value = key;
    ensureButtonStyleDefaults();
    buttonStyleModalOpen.value = true;
    hoverPreview.value = false;
};

const closeButtonStyleModal = () => {
    buttonStyleModalOpen.value = false;
    hoverPreview.value = false;
};

const handleButtonStyleDone = async () => {
    if (isLoading.value) {
        return;
    }
    const saved = await saveConfigPage();
    if (saved) {
        closeButtonStyleModal();
    }
};

const getPreviewStyle = (key, hover = false) => {
    const styles = configPages.value.buttonStyles?.[key];
    if (!styles || !styles.fields) {
        return {};
    }
    if (styles.useCustomCss && styles.customCss) {
        return styles.customCss;
    }
    const fields = styles.fields;
    const hoverFields = styles.hover || {};
    const useHover = hover && (hoverFields.background || hoverFields.color || hoverFields.borderColor);
    const background = useHover && hoverFields.background ? hoverFields.background : fields.background;
    const color = useHover && hoverFields.color ? hoverFields.color : fields.color;
    const borderColor = useHover && hoverFields.borderColor ? hoverFields.borderColor : fields.borderColor;
    const borderWidth = fields.borderWidth || '0px';
    const borderStyle = fields.borderStyle || 'solid';
    const border = `${borderWidth} ${borderStyle} ${borderColor || 'transparent'}`;
    const radius = fields.borderRadius || '8px';
    const paddingY = fields.paddingY || '10px';
    const paddingX = fields.paddingX || '12px';
    const fontSize = fields.fontSize || '14px';
    const fontWeight = fields.fontWeight || '600';
    const textTransform = fields.textTransform || 'none';
    return {
        background,
        color,
        border,
        borderRadius: radius,
        padding: `${paddingY} ${paddingX}`,
        fontSize,
        fontWeight,
        textTransform,
        textDecoration: 'none',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '6px',
        cursor: 'pointer',
        transition: 'all 0.2s ease'
    };
};

const previewStyle = computed(() => getPreviewStyle(activeButtonKey.value, hoverPreview.value));

const addNewPage = async () => {
    if(page.value.title != ''){  
        isLoading.value = true;
        const op = await api.addPageInGlobalSettings(page.value);
        if(op.id){
            const pgs = await api.getGlobalSettingsPages();
            configPages.value.configuratorPage = op.id;
            pages.value = pgs;
            isLoading.value = false;
            modal();
            toastMessage(op.message);
        }else{
            isLoading.value = false;
            modal();
            toastMessage(op.message,'error');
        }
    }else{
        toastMessage(__("Page title is empty", "all-signs-customizer-for-woocommerce"),"warning")
    }
}
const setBack = () => {
    page.value = {
        title:''
    }
    modal();
}
function modal(){
    openModal.value = !openModal.value
}
const handleAddNewPage = () => {
    modal();
}
</script>
