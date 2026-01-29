<template>
    <div>
        <div v-if="!isFetching" class="asowp-space-y-1 asowp-sticky asowp-top-[130px] asowp-z-[999] asowp-w-full asowp-shadow-md asowp-flex asowp-justify-center asowp-items-center asowp-bg-[#F4F4F4] asowp-translate-y-2">
            <div class="asowp-bg-[#F4F4F4] asowp-p-2 asowp-space-x-6 asowp-justify-center asowp-items-center asowp-flex">
                <button @click="state='pages'" :class="`asowp-flex asowp-text-[12px] asowp-px-6 asowp-p-2 asowp-w-fit asowp-h-fit asowp-bg-white asowp-rounded asowp-border-none asowp-text-black asowp-font-semibold ${ state == 'pages' ?'asowp-font-bold asowp-text-[#016464] asowp-bg-[#E1E1E1]':''} hover:asowp-bg-[#E1E1E1] hover:asowp-text-[#016464] asowp-cursor-pointer`" >{{ __('Pages', 'all-signs-options-pro') }}</button>
                <button @click="state='buttons'" :class="`asowp-flex asowp-text-[12px] asowp-px-6 asowp-p-2 asowp-w-fit asowp-h-fit asowp-bg-white asowp-rounded asowp-border-none asowp-text-black asowp-font-semibold ${ state == 'buttons' ?'asowp-font-bold asowp-text-[#016464] asowp-bg-[#E1E1E1]':''} hover:asowp-bg-[#E1E1E1] hover:asowp-text-[#016464] asowp-cursor-pointer`" >{{ __('Buttons', 'all-signs-options-pro') }}</button>
            </div>
        </div>
        <div v-if="isFetching" class="asowp-bg-white asowp-border-solid asowp-border asowp-border-[#D1D1D1] asowp-flex asowp-flex-col asowp-space-y-2 asowp-justify-center asowp-items-center asowp-w-full asowp-h-[306px] p-4">
            <img class="asowp-w-[200px] asowp-h-[200px]" src="../../../../../assets/icons/ic_loading.svg" alt="">
        </div>
        <div class="asowp-space-y-4 asowp-py-10" v-if="!isFetching">
            <div v-if="state == 'pages'">
                <div class="asowp-bg-[#F8F9FB] asowp-px-8 asowp-py-2 asowp-border-solid asowp-border-[1px] asowp-border-[#DDDDDD]">
                    <div class="asowp-flex asowp-space-x-4 asowp-py-4">
                        <label class="asowp-text-[12px] asowp-text-[#444444] asowp-py-1">{{ __('With which tag do you want the configurator title to be displayed?', 'all-signs-options-pro') }}</label>
                        <select v-model="configPages.others.titleBalise">
                            <option :value="balise" v-for="(balise,key) in titleBalise" :key="key">{{balise}}</option>
                        </select>
                    </div>
                    <div class="asowp-flex asowp-flex-col asowp-space-y-3">
                        <label class="asowp-text-[12px] asowp-text-[#444444]">{{ __('Select the configuration Page', 'all-signs-options-pro') }}</label>
                        <select class="asowp-w-full" v-model="configPages.configuratorPage">
                            <option v-for="(page,key) in pages" :value="page.id" :key="key">{{ page.title }}</option>
                        </select>
                    </div>
                    <div class="asowp-flex asowp-justify-end asowp-space-x-2 asowp-w-4/4 asowp-bg-[#F8F9FB] asowp-text-[12px] asowp-px-4 asowp-py-4 asowp-pb-2">
                    
                        <button :disabled="isLoading" @click="handleAddNewPage('design')" class="asowp-flex asowp-w-fit asowp-h-fit asowp-rounded asowp-bg-[#016464] asowp-px-4 asowp-space-x-2 asowp-p-1.5 asowp-border-none asowp-text-white asowp-opacity-90 hover:asowp-opacity-100 asowp-cursor-pointer">
                            <svg class="asowp-w-5 asowp-h-5" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g id="plus-lg">
                                <path id="Vector" fill-rule="evenodd" clip-rule="evenodd" d="M11 2.75C11.1823 2.75 11.3572 2.82243 11.4861 2.95136C11.6151 3.0803 11.6875 3.25516 11.6875 3.4375V10.3125H18.5625C18.7448 10.3125 18.9197 10.3849 19.0486 10.5139C19.1776 10.6428 19.25 10.8177 19.25 11C19.25 11.1823 19.1776 11.3572 19.0486 11.4861C18.9197 11.6151 18.7448 11.6875 18.5625 11.6875H11.6875V18.5625C11.6875 18.7448 11.6151 18.9197 11.4861 19.0486C11.3572 19.1776 11.1823 19.25 11 19.25C10.8177 19.25 10.6428 19.1776 10.5139 19.0486C10.3849 18.9197 10.3125 18.7448 10.3125 18.5625V11.6875H3.4375C3.25516 11.6875 3.0803 11.6151 2.95136 11.4861C2.82243 11.3572 2.75 11.1823 2.75 11C2.75 10.8177 2.82243 10.6428 2.95136 10.5139C3.0803 10.3849 3.25516 10.3125 3.4375 10.3125H10.3125V3.4375C10.3125 3.25516 10.3849 3.0803 10.5139 2.95136C10.6428 2.82243 10.8177 2.75 11 2.75Z" fill="white"/>
                                </g>
                            </svg>
                            <div class="asowp-text-[14px]">
                                {{ __('Add new page', 'all-signs-options-pro') }}
                            </div>
                        </button>
                    </div>
                </div>
                <div class="asowp-bg-[#F8F9FB] asowp-px-8 asowp-py-2 asowp-border-solid asowp-border-[1px] asowp-border-t-0 asowp-border-[#DDDDDD]">
                    <div class="asowp-flex asowp-flex-col asowp-space-y-3">
                        <label class="asowp-text-[12px] asowp-text-[#444444]">{{ __('Template page', 'all-signs-options-pro') }}</label>
                        <select class="asowp-w-full" v-model="configPages.templatePage">
                            <option v-for="(page,key) in pages" :value="page.id" :key="key">{{ page.title }}</option>
                        </select>
                    </div>
                    <div class="asowp-flex asowp-justify-end asowp-space-x-2 asowp-w-4/4 asowp-bg-[#F8F9FB] asowp-text-[12px] asowp-px-4 asowp-py-4 asowp-pb-2">
                    
                        <button :disabled="isLoading" @click="handleAddNewPage('template')" class="asowp-flex asowp-w-fit asowp-h-fit asowp-rounded asowp-bg-[#016464] asowp-px-4 asowp-space-x-2 asowp-p-1.5 asowp-border-none asowp-text-white asowp-opacity-90 hover:asowp-opacity-100 asowp-cursor-pointer">
                            <svg class="asowp-w-5 asowp-h-5" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g id="plus-lg">
                                <path id="Vector" fill-rule="evenodd" clip-rule="evenodd" d="M11 2.75C11.1823 2.75 11.3572 2.82243 11.4861 2.95136C11.6151 3.0803 11.6875 3.25516 11.6875 3.4375V10.3125H18.5625C18.7448 10.3125 18.9197 10.3849 19.0486 10.5139C19.1776 10.6428 19.25 10.8177 19.25 11C19.25 11.1823 19.1776 11.3572 19.0486 11.4861C18.9197 11.6151 18.7448 11.6875 18.5625 11.6875H11.6875V18.5625C11.6875 18.7448 11.6151 18.9197 11.4861 19.0486C11.3572 19.1776 11.1823 19.25 11 19.25C10.8177 19.25 10.6428 19.1776 10.5139 19.0486C10.3849 18.9197 10.3125 18.7448 10.3125 18.5625V11.6875H3.4375C3.25516 11.6875 3.0803 11.6151 2.95136 11.4861C2.82243 11.3572 2.75 11.1823 2.75 11C2.75 10.8177 2.82243 10.6428 2.95136 10.5139C3.0803 10.3849 3.25516 10.3125 3.4375 10.3125H10.3125V3.4375C10.3125 3.25516 10.3849 3.0803 10.5139 2.95136C10.6428 2.82243 10.8177 2.75 11 2.75Z" fill="white"/>
                                </g>
                            </svg>
                            <div class="asowp-text-[14px]">
                                {{ __('Add new page', 'all-signs-options-pro') }}
                            </div>
                        </button>
                    </div>
                </div>
            </div>
            <div v-if="state == 'buttons'" class="asowp-px-10">
                <div class="asowp-space-y-3">
                    <div
                      v-for="item in buttonItems"
                      :key="item.key"
                      class="asowp-flex asowp-items-center asowp-justify-between asowp-p-4 asowp-border asowp-border-[#DDDDDD] asowp-rounded asowp-bg-[#F8F9FB]"
                    >
                        <div class="asowp-space-y-1">
                            <div class="asowp-text-[14px] asowp-font-bold asowp-text-[#444444]">
                                {{ item.label }}
                            </div>
                            <div class="asowp-text-[12px] asowp-text-gray-600">
                                {{ __('Text:', 'all-signs-options-pro') }} {{ configPages.buttons[item.textKey] }}
                            </div>
                            <div v-if="item.note" class="asowp-text-[11px] asowp-text-gray-500">
                                {{ item.note }}
                            </div>
                        </div>
                        <div class="asowp-flex asowp-items-center asowp-gap-3">
                            <button
                              type="button"
                              @click="openButtonStyleModal(item.key)"
                              class="asowp-bg-white asowp-border asowp-border-[#e5e7eb] asowp-rounded asowp-px-4 asowp-py-2 asowp-text-[12px] asowp-font-semibold asowp-text-[#303030] hover:asowp-bg-[#f1f5f9] asowp-cursor-pointer"
                            >
                                {{ __('Configure', 'all-signs-options-pro') }}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="asowp-bg-[#F8F9FB] asowp-flex asowp-space-x-4 asowp-px-4 asowp-py-3 asowp-justify-end asowp-items-end">
                <div class="asowp-bg-[#016464] asowp-rounded">
                    <button :disabled="isLoading" @click="saveConfigPage" class="asowp-flex asowp-bg-transparent asowp-w-fit asowp-space-x-2 asowp-h-fit asowp-text-white asowp-px-8 asowp-p-2.5 asowp-rounded asowp-border-none asowp-opacity-90 hover:asowp-opacity-100 hover:asowp-border-none hover:asowp-text-white hover:asowp-bg-[#016464] asowp-cursor-pointer">
                        <div class="asowp-translate-y-1">
                            <img src="../../../../../assets/icons/ic_loading_gray.svg" class="asowp-w-5 asowp-w-5" v-if="isLoading" :disabled="isLoading"/>
                            <svg v-if="!isLoading" class="asowp-w-4 asowp-h-4" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2.5 1.25C2.16848 1.25 1.85054 1.3817 1.61612 1.61612C1.3817 1.85054 1.25 2.16848 1.25 2.5V17.5C1.25 17.8315 1.3817 18.1495 1.61612 18.3839C1.85054 18.6183 2.16848 18.75 2.5 18.75H17.5C17.8315 18.75 18.1495 18.6183 18.3839 18.3839C18.6183 18.1495 18.75 17.8315 18.75 17.5V2.5C18.75 2.16848 18.6183 1.85054 18.3839 1.61612C18.1495 1.3817 17.8315 1.25 17.5 1.25H11.875C11.5435 1.25 11.2255 1.3817 10.9911 1.61612C10.7567 1.85054 10.625 2.16848 10.625 2.5V11.6163L13.9325 8.3075C14.0499 8.19014 14.209 8.12421 14.375 8.12421C14.541 8.12421 14.7001 8.19014 14.8175 8.3075C14.9349 8.42486 15.0008 8.58403 15.0008 8.75C15.0008 8.91597 14.9349 9.07514 14.8175 9.1925L10.4425 13.5675C10.3844 13.6257 10.3155 13.6719 10.2395 13.7034C10.1636 13.7349 10.0822 13.7511 10 13.7511C9.91779 13.7511 9.83639 13.7349 9.76046 13.7034C9.68453 13.6719 9.61556 13.6257 9.5575 13.5675L5.1825 9.1925C5.12439 9.13439 5.07829 9.0654 5.04685 8.98948C5.0154 8.91356 4.99921 8.83218 4.99921 8.75C4.99921 8.66782 5.0154 8.58644 5.04685 8.51052C5.07829 8.4346 5.12439 8.36561 5.1825 8.3075C5.24061 8.24939 5.3096 8.20329 5.38552 8.17185C5.46144 8.1404 5.54282 8.12421 5.625 8.12421C5.70718 8.12421 5.78856 8.1404 5.86448 8.17185C5.9404 8.20329 6.00939 8.24939 6.0675 8.3075L9.375 11.6163V2.5C9.375 1.83696 9.63839 1.20107 10.1072 0.732233C10.5761 0.263392 11.212 0 11.875 0L17.5 0C18.163 0 18.7989 0.263392 19.2678 0.732233C19.7366 1.20107 20 1.83696 20 2.5V17.5C20 18.163 19.7366 18.7989 19.2678 19.2678C18.7989 19.7366 18.163 20 17.5 20H2.5C1.83696 20 1.20107 19.7366 0.732233 19.2678C0.263392 18.7989 0 18.163 0 17.5V2.5C0 1.83696 0.263392 1.20107 0.732233 0.732233C1.20107 0.263392 1.83696 0 2.5 0L5.625 0C5.79076 0 5.94973 0.065848 6.06694 0.183058C6.18415 0.300269 6.25 0.45924 6.25 0.625C6.25 0.79076 6.18415 0.949732 6.06694 1.06694C5.94973 1.18415 5.79076 1.25 5.625 1.25H2.5Z" fill="white"/>
                            </svg>
                        </div>
                        <span class="asowp-font-semibold asowp-text-[16px]">{{ __('Save', 'all-signs-options-pro') }}</span>
                    </button>
                </div>
            </div>
        </div>
        <div v-if="openModal" @click.self="setBack" class="asowp-z-[999] asowp-bg-gray-400 asowp-overflow-y-auto asowp-overflow-x-hidden asowp-fixed asowp-top-0 asowp-right-[25%] asowp-left-[75%]  asowp-flex asowp-justify-center asowp-items-center asowp-w-full md:asowp-inset-0 asowp-h-full">
            <div class="asowp-relative asowp-p-4 asowp-w-full asowp-max-w-md asowp-max-h-full">
                <div class="asowp-relative asowp-bg-white asowp-rounded-lg asowp-shadow dark:bg-gray-700">
                    <button @click.stop="setBack" type="button" :class="`${isLoading ? 'asowp-cursor-not-allowed' : 'asowp-cursor-pointer'} asowp-absolute asowp-top-3 asowp-end-2.5 asowp-text-gray-400 asowp-bg-transparent hover:bg-gray-200 hover:text-gray-900 asowp-rounded-lg asowp-text-sm asowp-w-8 asowp-h-8 asowp-ms-auto asowp-inline-flex asowp-justify-center asowp-items-center dark:hover:bg-gray-600 dark:hover:text-white`" data-modal-hide="popup-modal">
                        <svg class="asowp-w-3 asowp-h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                        <span class="asowp-sr-only">{{ __('Close modal', 'all-signs-options-pro') }}</span>
                    </button>
                    <div class="asowp-p-4 md:p-5 asowp-text-center">
                        <svg class="asowp-mx-auto asowp-mb-4 asowp-text-gray-400 asowp-w-12 asowp-h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                        </svg>
                        <h3 class="asowp-mb-5 asowp-text-lg asowp-font-normal asowp-text-gray-500 dark:text-gray-400">{{ __('Give your page title', 'all-signs-options-pro') }}</h3>
                        <input v-model="page.title" class="asowp-rounded asowp-w-full asowp-h-[35px] asowp-p-4 asowp-border-solid asowp-border-[#016464] asowp-my-2 focus:asowp-border-solid focus:asowp-border-[#016464] focus:asowp-ring-4 focus:asowp-ring-[#016460]" />
                        <button @click="addNewPage()" data-modal-hide="popup-modal" type="button" :class="`asowp-border-solid asowp-text-white ${!isLoading ? 'asowp-bg-[#016464] asowp-cursor-pointer' :'asowp-bg-[#016464] asowp-cursor-not-allowed'} hover:asowp-bg-[#016460] focus:asowp-ring-4 focus:asowp-outline-none asowp-my-2 asowp-border-none  focus:asowp-ring-[#016464]  asowp-font-medium asowp-rounded-lg asowp-text-sm asowp-inline-flex asowp-items-center asowp-px-5 asowp-py-2.5 asowp-text-center`">
                            <img src="../../../../../assets/icons/ic_loading_gray.svg" class="asowp-w-5 asowp-w-5" v-if="isLoading" :disabled="isLoading"/>
                            {{ __("Yes, I'm sure", "all-signs-options-pro") }}
                        </button>
                        <button @click.stop="setBack" data-modal-hide="popup-modal" type="button" :class="`asowp-border-solid asowp-py-2.5 asowp-px-5 asowp-ms-3 asowp-text-sm asowp-font-medium asowp-text-gray-900 asowp-my-2  asowp-border-gray-500 asowp-border-white focus:outline-none asowp-bg-white asowp-rounded-lg asowp-border asowp-border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 ${isLoading ? 'asowp-cursor-not-allowed' : 'asowp-cursor-pointer'}`">{{ __('No, cancel', 'all-signs-options-pro') }}</button>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="buttonStyleModalOpen" class="asowp-z-[999] asowp-bg-black/40 asowp-fixed asowp-inset-0 asowp-flex asowp-items-center asowp-justify-center">
            <div class="asowp-absolute asowp-inset-0" @click="closeButtonStyleModal"></div>
            <div class="asowp-relative asowp-w-[min(860px,95vw)] asowp-max-h-[calc(100vh-6rem)] asowp-bg-white asowp-rounded-2xl asowp-shadow-xl asowp-overflow-hidden asowp-flex asowp-flex-col">
                <div class="asowp-flex asowp-items-center asowp-justify-between asowp-px-5 asowp-py-3 asowp-border-b asowp-border-[#e5e7eb]">
                    <div class="asowp-text-[14px] asowp-font-semibold">{{ activeButtonLabel }}</div>
                    <button class="asowp-p-1 asowp-rounded-md hover:asowp-bg-[#f3f4f6] asowp-border-0 asowp-bg-transparent asowp-cursor-pointer" @click="closeButtonStyleModal">✕</button>
                </div>
                <div class="asowp-flex-1 asowp-min-h-0 asowp-p-5 asowp-space-y-4 asowp-overflow-y-auto">
                    <div class="asowp-flex asowp-flex-col md:asowp-flex-row asowp-gap-6">
                        <div class="asowp-flex-1 asowp-space-y-3">
                            <label class="asowp-text-[13px] asowp-font-semibold asowp-text-[#444444]">{{ __('Button text', 'all-signs-options-pro') }}</label>
                            <input type="text" class="asowp-w-full asowp-h-[38px] asowp-px-3 asowp-border asowp-border-[#DDDDDD] asowp-rounded" v-model="configPages.buttons[activeTextKey]" />
                            <div class="asowp-mt-2 asowp-text-[12px] asowp-text-gray-600">{{ __('Live preview (hover to test hover colors)', 'all-signs-options-pro') }}</div>
                            <div class="asowp-inline-flex asowp-items-center asowp-gap-3">
                                <button
                                  type="button"
                                  :style="previewStyle"
                                  @mouseenter="hoverPreview=true"
                                  @mouseleave="hoverPreview=false"
                                  class="asowp-border-none asowp-cursor-pointer"
                                >
                                  {{ configPages.buttons[activeTextKey] }}
                                </button>
                                <button type="button" class="asowp-bg-white asowp-border asowp-border-[#e5e7eb] asowp-rounded asowp-px-3 asowp-py-2 asowp-text-[12px] asowp-font-semibold asowp-text-[#303030]" @click="hoverPreview = !hoverPreview">
                                    {{ hoverPreview ? __('Normal preview', 'all-signs-options-pro') : __('Hover preview', 'all-signs-options-pro') }}
                                </button>
                            </div>
                        </div>
                        <div class="asowp-flex-1 asowp-space-y-3">
                            <label class="asowp-text-[13px] asowp-font-semibold asowp-text-[#444444]">{{ __('Quick style (no CSS needed)', 'all-signs-options-pro') }}</label>
                            <div class="asowp-grid asowp-grid-cols-2 asowp-gap-3">
                                <div>
                                    <label class="asowp-text-[12px] asowp-text-gray-600">{{ __('Background', 'all-signs-options-pro') }}</label>
                                    <input type="color" class="asowp-w-full asowp-h-[38px] asowp-border asowp-border-[#DDDDDD] asowp-rounded" v-model="configPages.buttonStyles[activeButtonKey].fields.background" />
                                </div>
                                <div>
                                    <label class="asowp-text-[12px] asowp-text-gray-600">{{ __('Text color', 'all-signs-options-pro') }}</label>
                                    <input type="color" class="asowp-w-full asowp-h-[38px] asowp-border asowp-border-[#DDDDDD] asowp-rounded" v-model="configPages.buttonStyles[activeButtonKey].fields.color" />
                                </div>
                                <div>
                                    <label class="asowp-text-[12px] asowp-text-gray-600">{{ __('Border color', 'all-signs-options-pro') }}</label>
                                    <input type="color" class="asowp-w-full asowp-h-[38px] asowp-border asowp-border-[#DDDDDD] asowp-rounded" v-model="configPages.buttonStyles[activeButtonKey].fields.borderColor" />
                                </div>
                                <div>
                                    <label class="asowp-text-[12px] asowp-text-gray-600">{{ __('Border width', 'all-signs-options-pro') }}</label>
                                    <input type="text" class="asowp-w-full asowp-h-[38px] asowp-px-3 asowp-border asowp-border-[#DDDDDD] asowp-rounded" placeholder="0px" v-model="configPages.buttonStyles[activeButtonKey].fields.borderWidth" />
                                </div>
                                <div>
                                    <label class="asowp-text-[12px] asowp-text-gray-600">{{ __('Border radius', 'all-signs-options-pro') }}</label>
                                    <input type="text" class="asowp-w-full asowp-h-[38px] asowp-px-3 asowp-border asowp-border-[#DDDDDD] asowp-rounded" placeholder="8px" v-model="configPages.buttonStyles[activeButtonKey].fields.borderRadius" />
                                </div>
                                <div>
                                    <label class="asowp-text-[12px] asowp-text-gray-600">{{ __('Font size', 'all-signs-options-pro') }}</label>
                                    <input type="text" class="asowp-w-full asowp-h-[38px] asowp-px-3 asowp-border asowp-border-[#DDDDDD] asowp-rounded" placeholder="14px" v-model="configPages.buttonStyles[activeButtonKey].fields.fontSize" />
                                </div>
                                <div>
                                    <label class="asowp-text-[12px] asowp-text-gray-600">{{ __('Font weight', 'all-signs-options-pro') }}</label>
                                    <input type="text" class="asowp-w-full asowp-h-[38px] asowp-px-3 asowp-border asowp-border-[#DDDDDD] asowp-rounded" placeholder="600" v-model="configPages.buttonStyles[activeButtonKey].fields.fontWeight" />
                                </div>
                                <div>
                                    <label class="asowp-text-[12px] asowp-text-gray-600">{{ __('Text transform', 'all-signs-options-pro') }}</label>
                                    <select class="asowp-w-full asowp-h-[38px] asowp-px-3 asowp-border asowp-border-[#DDDDDD] asowp-rounded" v-model="configPages.buttonStyles[activeButtonKey].fields.textTransform">
                                        <option value="none">{{ __('None', 'all-signs-options-pro') }}</option>
                                        <option value="uppercase">{{ __('Uppercase', 'all-signs-options-pro') }}</option>
                                        <option value="lowercase">{{ __('Lowercase', 'all-signs-options-pro') }}</option>
                                        <option value="capitalize">{{ __('Capitalize', 'all-signs-options-pro') }}</option>
                                    </select>
                                </div>
                                <div>
                                    <label class="asowp-text-[12px] asowp-text-gray-600">{{ __('Padding Y', 'all-signs-options-pro') }}</label>
                                    <input type="text" class="asowp-w-full asowp-h-[38px] asowp-px-3 asowp-border asowp-border-[#DDDDDD] asowp-rounded" placeholder="10px" v-model="configPages.buttonStyles[activeButtonKey].fields.paddingY" />
                                </div>
                                <div>
                                    <label class="asowp-text-[12px] asowp-text-gray-600">{{ __('Padding X', 'all-signs-options-pro') }}</label>
                                    <input type="text" class="asowp-w-full asowp-h-[38px] asowp-px-3 asowp-border asowp-border-[#DDDDDD] asowp-rounded" placeholder="12px" v-model="configPages.buttonStyles[activeButtonKey].fields.paddingX" />
                                </div>
                                <div>
                                    <label class="asowp-text-[12px] asowp-text-gray-600">{{ __('Hover background', 'all-signs-options-pro') }}</label>
                                    <input type="color" class="asowp-w-full asowp-h-[38px] asowp-border asowp-border-[#DDDDDD] asowp-rounded" v-model="configPages.buttonStyles[activeButtonKey].hover.background" />
                                </div>
                                <div>
                                    <label class="asowp-text-[12px] asowp-text-gray-600">{{ __('Hover text', 'all-signs-options-pro') }}</label>
                                    <input type="color" class="asowp-w-full asowp-h-[38px] asowp-border asowp-border-[#DDDDDD] asowp-rounded" v-model="configPages.buttonStyles[activeButtonKey].hover.color" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="asowp-rounded-xl asowp-border asowp-border-[#e5e7eb] asowp-bg-[#fafafa] asowp-p-4">
                        <div class="asowp-flex asowp-items-center asowp-justify-between">
                            <div class="asowp-text-[13px] asowp-font-semibold asowp-text-[#303030]">{{ __('Custom CSS (optional)', 'all-signs-options-pro') }}</div>
                            <label class="asowp-flex asowp-items-center asowp-gap-2 asowp-text-[12px] asowp-text-gray-600">
                                <input type="checkbox" v-model="configPages.buttonStyles[activeButtonKey].useCustomCss" />
                                {{ __('Use custom CSS', 'all-signs-options-pro') }}
                            </label>
                        </div>
                        <div class="asowp-mt-2 asowp-text-[12px] asowp-text-gray-600">
                            {{ __('If enabled, the CSS below overrides the quick style fields.', 'all-signs-options-pro') }}
                        </div>
                        <textarea
                          class="asowp-mt-3 asowp-w-full asowp-min-h-[110px] asowp-p-3 asowp-border asowp-border-[#DDDDDD] asowp-rounded"
                          v-model="configPages.buttonStyles[activeButtonKey].customCss"
                          placeholder="background:#1d6fe3; color:#fff; border-radius:8px; padding:10px 12px;"
                        ></textarea>
                    </div>
                </div>
                <div class="asowp-flex asowp-justify-end asowp-px-5 asowp-py-3 asowp-border-t">
                    <button class="asowp-px-4 asowp-py-1.5 asowp-text-white asowp-bg-[#016464] asowp-rounded-md" :disabled="isLoading" @click="handleButtonStyleDone">{{ __('Done', 'all-signs-options-pro') }}</button>
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

var isLoading = ref(false);
var isFetching= ref(false);
var pages = ref([]);
const state = ref('pages');
var configPages = ref({
    configuratorPage:0,
    templatePage:0,
    buttons:{
        productDesignButton:'Customize The Product',
        productTemplateButton:'Design From Example',
        templateAddToCartButton:'Add To Cart',
        templateDesignButton: 'Customize',
        allTemplatesText:"All",
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
    ensureButtonStyleDefaults();
    pages.value = pgs;
    isFetching.value = false;
}

const saveConfigPage = async () => {
    isLoading.value = true;
    ensureButtonStyleDefaults();
    const op = await api.saveGlobalSettingsConfigPage(configPages.value);
    if(op.success){
        const confPages = await api.getGlobalSettingsConfigPages();
        if(!confPages.message){
            configPages.value = {...configPages.value,...confPages};
        }
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
        label: __('Customize button on product', 'all-signs-options-pro'),
        note: __('Shown on product and product list pages.', 'all-signs-options-pro')
    },
    {
        key: 'productTemplate',
        textKey: 'productTemplateButton',
        label: __('Design from example button on product', 'all-signs-options-pro'),
        note: __('Shown when templates are available for the product.', 'all-signs-options-pro')
    },
    {
        key: 'templateAddToCart',
        textKey: 'templateAddToCartButton',
        label: __('Add to cart button on templates page', 'all-signs-options-pro')
    },
    {
        key: 'templateDesign',
        textKey: 'templateDesignButton',
        label: __('Design button on templates page', 'all-signs-options-pro')
    },
    {
        key: 'templatesFilter',
        textKey: 'allTemplatesText',
        label: __('Templates filter tabs (All + categories)', 'all-signs-options-pro'),
        note: __('Style applies to all category tabs on the templates page.', 'all-signs-options-pro')
    },
    {
        key: 'recapsButton',
        textKey: 'recapsButtonOnCart',
        label: __('Recaps button in cart', 'all-signs-options-pro')
    }
];

const buttonMeta = {
    productDesign: {
        label: __('Customize button settings', 'all-signs-options-pro'),
        textKey: 'productDesignButton'
    },
    productTemplate: {
        label: __('Design from example button settings', 'all-signs-options-pro'),
        textKey: 'productTemplateButton'
    },
    templateAddToCart: {
        label: __('Add to cart button settings', 'all-signs-options-pro'),
        textKey: 'templateAddToCartButton'
    },
    templateDesign: {
        label: __('Template design button settings', 'all-signs-options-pro'),
        textKey: 'templateDesignButton'
    },
    templatesFilter: {
        label: __('Templates filter tabs settings', 'all-signs-options-pro'),
        textKey: 'allTemplatesText'
    },
    recapsButton: {
        label: __('Recaps button settings', 'all-signs-options-pro'),
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
        productTemplate: {
            fields:{
                background:'#f4c542',
                color:'#ffffff',
                borderColor:'#f4c542',
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
                background:'#fcac29',
                color:'#ffffff',
                borderColor:'#fcac29'
            },
            customCss:'',
            useCustomCss:false
        },
        templateAddToCart: {
            fields:{
                background:'#0374e3',
                color:'#ffffff',
                borderColor:'#0374e3',
                borderWidth:'0px',
                borderStyle:'solid',
                borderRadius:'5px',
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
        templateDesign: {
            fields:{
                background:'#febd52',
                color:'#ffffff',
                borderColor:'#febd52',
                borderWidth:'0px',
                borderStyle:'solid',
                borderRadius:'6px',
                paddingY:'10px',
                paddingX:'12px',
                fontSize:'14px',
                fontWeight:'600',
                textTransform:'none'
            },
            hover:{
                background:'#fcac29',
                color:'#ffffff',
                borderColor:'#fcac29'
            },
            customCss:'',
            useCustomCss:false
        },
        templatesFilter: {
            fields:{
                background:'transparent',
                color:'#6b7280',
                borderColor:'transparent',
                borderWidth:'0px',
                borderStyle:'solid',
                borderRadius:'999px',
                paddingY:'8px',
                paddingX:'12px',
                fontSize:'12px',
                fontWeight:'600',
                textTransform:'none'
            },
            hover:{
                background:'#f3f4f6',
                color:'#111827',
                borderColor:'transparent'
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
            if(pageFor.value == 'design'){
                configPages.value.configuratorPage = op.id;
            }else{
                configPages.value.templatePage = op.id
            }
            pageFor.value = 'design'
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
        toastMessage(__("Page title is empty", "all-signs-options-pro"),"warning")
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
const pageFor = ref('design');
const handleAddNewPage = (state) => {
    pageFor.value = state;
    modal();
}
</script>
