<template>
    <div class="ascwo-space-y-1">
        <div class="ascwo-bg-white ascwo-shadow-md ascwo-justify-center ascwo-items-center ascwo-px-4 ascwo-py-6">
            <p class="ascwo-text-[14px] ascwo-font-bold">2- {{ __('Set the Label and Description', 'all-signs-customizer-for-woocommerce-pro') }}</p>
            <p class="ascwo-text-[12px]">{{ __('This text will display above the input options.', 'all-signs-customizer-for-woocommerce-pro') }}</p>
            <div class="ascwo-flex ascwo-justify-between ascwo-space-x-12">
                <div class="ascwo-w-2/5 ascwo-space-y-2">
                    <label>{{ __('Label', 'all-signs-customizer-for-woocommerce-pro') }}</label>
                    <input v-model="inputTypeImage.label" type="text" :class="`ascwo-w-full ${emptyLabel?'ascwo-field-required':''}`" value="Remote control (Dimmer)"/>
                </div>
                <div class="ascwo-w-2/5 ascwo-space-y-2">
                    <label>{{ __('Description', 'all-signs-customizer-for-woocommerce-pro') }}</label>
                    <input v-model="inputTypeImage.description" type="text" class="ascwo-w-full" value="A remote control is included free with every sign"/>
                </div>
            </div>
        </div>
        <div class="ascwo-bg-white ascwo-shadow-md ascwo-justify-center ascwo-items-center ascwo-px-4 ascwo-py-6 ascwo-space-y-2">
            <div>
                <p class="ascwo-text-[14px] ascwo-font-bold">3- {{ __('Images as Input', 'all-signs-customizer-for-woocommerce-pro') }}</p>
                <p class="ascwo-text-[12px]">{{ __('Displays as a row of images that is selectable by the customer.', 'all-signs-customizer-for-woocommerce-pro') }}</p>
            </div>
            <div class="ascwo-relative ascwo-border-solid ascwo-border-[1px] ascwo-border-[#e5e7eb] ascwo-rounded-lg ascwo-p-8" v-for="(option,key) in inputTypeImage.options">
                <div class="ascwo-font-bold ascwo-font-[14px]" v-if="!dropOptions[key]">
                    {{ key+1 }}. {{ option.label }}
                </div>
                <div v-if="dropOptions[key]">
                    <div class="ascwo-flex ascwo-justify-between ascwo-space-x-12">
                        <div class="ascwo-w-2/5 ascwo-space-y-2">
                            <label>{{ __('Label', 'all-signs-customizer-for-woocommerce-pro') }}</label>
                            <input v-model="inputTypeImage.options[key].label" type="text" :class="`ascwo-w-full`" value="Remote control (Dimmer)"/>
                        </div>
                        <div class="ascwo-w-2/5 ascwo-space-y-2">
                            <label>{{ __('Value (Required)', 'all-signs-customizer-for-woocommerce-pro') }}</label>
                            <input v-model="inputTypeImage.options[key].value" type="text" :class="`ascwo-w-full ${emptyValueArray[key]?'ascwo-field-required':''}`" value="A remote control is included free with every sign"/>
                        </div>
                    </div>
                    <div class="ascwo-flex ascwo-flex-col ascwo-w-2/5 ascwo-space-y-2 ascwo-py-4">
                        <label class="so-text-[12px] ascwo-text-[#444444]">{{ __('Color', 'all-signs-customizer-for-woocommerce-pro') }}</label>
                        <div class="ascwo-relative ascwo-flex">
                            <input
                                id="colorPicker"
                                type="color"
                                v-model="inputTypeImage.options[key].color"
                                @input="e=>colorImageInput(e,key)"
                                class="ascwo-w-9 ascwo-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="inputTypeImage.options[key].color"
                                @input="e=>colorImageInput(e,key)"
                                class="ascwo-p-1 ascwo-text-black ascwo-w-full -ascwo-translate-y-px"
                            />
                        </div>
                    </div>
                    <div>
                        <p class="ascwo-text-[14px] ascwo-font-bold">{{ __('Popup Image (optional)', 'all-signs-customizer-for-woocommerce-pro') }}</p>
                        <p class="ascwo-text-[12px]">{{ __('Example Image - displayed as popup', 'all-signs-customizer-for-woocommerce-pro') }}</p>
                        <div class="ascwo-flex">
                            <div class="ascwo-flex ascwo-items-center ascwo-justify-between ascwo-w-full ascwo-h-[54px] ascwo-border ascwo-border-solid ascwo-border-[#9ca3af] ascwo-rounded-[5px] ascwo-bg-white ascwo-overflow-hidden ascwo-p-1">
                                <button type="button" @click="e=>selectPopupImage(e,key)" class="ascwo-bg-[#007a73] ascwo-border-none ascwo-h-[40px] ascwo-px-4 ascwo-rounded-[6px] ascwo-text-white ascwo-text-[12px] ascwo-font-bold ascwo-cursor-pointer hover:ascwo-bg-[#006c67] hover:ascwo-border-none hover:ascwo-text-white">{{ __('choose a picture', 'all-signs-customizer-for-woocommerce-pro') }}</button>
                                <div class="ascwo-relative ascwo-w-[50px] ascwo-h-[48px] ascwo-rounded-[8px] ascwo-border ascwo-border-solid ascwo-border-[#e5e7eb] ascwo-bg-white ascwo-overflow-hidden">
                                    <img v-if="inputTypeImage.options[key].popImg != ''" :src="inputTypeImage.options[key].popImg" alt="" class="ascwo-absolute ascwo-inset-0 ascwo-w-full ascwo-h-full ascwo-object-cover">
                                    <button v-if="inputTypeImage.options[key].popImg != ''" type="button" @click="()=>{inputTypeImage.options[key].popImg = ''}" :class="`ascwo-bg-[#007a73] ascwo-absolute ascwo-bottom-0 ascwo-right-0 ascwo-text-white ascwo-p-1 ascwo-rounded-tl-lg ascwo-border-none ascwo-cursor-pointer`">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="ascwo-w-4 ascwo-h-4">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <div class="ascwo-flex ascwo-items-center ascwo-justify-between ascwo-w-full ascwo-h-[54px] ascwo-border ascwo-border-solid ascwo-border-[#9ca3af] ascwo-rounded-[5px] ascwo-bg-white ascwo-overflow-hidden ascwo-p-1">
                                <button type="button" @click="e=>selectChangePreviewImage(e,key)" class="ascwo-bg-[#007a73] ascwo-border-none ascwo-h-[40px] ascwo-px-4 ascwo-rounded-[6px] ascwo-text-white ascwo-text-[12px] ascwo-font-bold ascwo-cursor-pointer hover:ascwo-bg-[#006c67] hover:ascwo-border-none hover:ascwo-text-white">{{ __('choose a picture', 'all-signs-customizer-for-woocommerce-pro') }}</button>
                                <div class="ascwo-relative ascwo-w-[50px] ascwo-h-[48px] ascwo-rounded-[8px] ascwo-border ascwo-border-solid ascwo-border-[#e5e7eb] ascwo-bg-white ascwo-overflow-hidden">
                                    <img v-if="inputTypeImage.options[key].prevImg != ''" :src="inputTypeImage.options[key].prevImg" alt="" class="ascwo-absolute ascwo-inset-0 ascwo-w-full ascwo-h-full ascwo-object-cover">
                                    <button v-if="inputTypeImage.options[key].prevImg != ''" type="button" @click="()=>{inputTypeImage.options[key].prevImg = ''}" :class="`ascwo-bg-[#007a73] ascwo-absolute ascwo-bottom-0 ascwo-right-0 ascwo-text-white ascwo-p-1 ascwo-rounded-tl-lg ascwo-border-none ascwo-cursor-pointer`">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="ascwo-w-4 ascwo-h-4">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <p class="ascwo-text-[14px] ascwo-font-bold">{{ __('Pricing (optional)', 'all-signs-customizer-for-woocommerce-pro') }}</p>
                        <div class="ascwo-flex ascwo-space-x-4">
                            <div class="ascwo-flex ascwo-justify-center ascwo-items-center ascwo-space-x-4">
                                <p class="ascwo-text-md ascwo-font-medium ascwo-text-black">{{ __('None', 'all-signs-customizer-for-woocommerce-pro') }}</p>
                                <label :for="'none'+key" class="ascwo-relative ascwo-inline-flex ascwo-items-center ascwo-cursor-pointer ascwo-border-[1px] ascwo-border-solid ascwo-border-black ascwo-rounded-full">
                                    <input :id="'none'+key" type="radio" :name="'price'+key" class="ascwo-sr-only ascwo-peer" value="none" v-model="inputTypeImage.options[key].price.type">
                                    <div :class="`peer-checked:after:ascwo-border-[#016464] peer-checked:after:ascwo-border-solid peer-checked:after:ascwo-border-[5px] peer-checked:after:ascwo-top-[-2px] peer-checked:after:ascwo-translate-y-[-15%] ascwo-w-10 ascwo-h-3 ascwo-border ascwo-border-[5px] ascwo-border-[#016464] ascwo-bg-zinc-300 ascwo-rounded-full ascwo-peer peer-checked:after:ascwo-translate-x-[112%] after:ascwo-content-[''] after:ascwo-absolute after:ascwo-top-[-3px] after:ascwo-left-[-5px] after:ascwo-bg-zinc-300 after:ascwo-border-white after:ascwo-border-solid after:ascwo-translate-y-[-15%] after:ascwo-border-[#FFFFFF] after:ascwo-border-[5px] after:ascwo-rounded-full after:ascwo-h-3 after:ascwo-w-3 after:ascwo-transition-all after:ascwo-shadow-lg`"></div>
                                </label>
                            </div>

                            <div class="ascwo-flex ascwo-justify-center ascwo-items-center ascwo-space-x-4">
                                <p class="ascwo-text-md ascwo-font-medium ascwo-text-black">{{ __('Base Price', 'all-signs-customizer-for-woocommerce-pro') }}</p>
                                <label :for="'base'+key" class="ascwo-relative ascwo-inline-flex ascwo-items-center ascwo-cursor-pointer ascwo-border-[1px] ascwo-border-solid ascwo-border-black ascwo-rounded-full">
                                <input :id="'base'+key" type="radio" :name="'price'+key" class="ascwo-sr-only ascwo-peer" value="base" v-model="inputTypeImage.options[key].price.type">
                                <div class="peer-checked:after:ascwo-border-[#016464] peer-checked:after:ascwo-border-solid peer-checked:after:ascwo-border-[5px] peer-checked:after:ascwo-top-[-2px] peer-checked:after:ascwo-translate-y-[-15%] ascwo-w-10 ascwo-h-3 ascwo-border ascwo-border-[5px] ascwo-border-[#016464] ascwo-bg-zinc-300 ascwo-rounded-full ascwo-peer peer-checked:after:ascwo-translate-x-[112%] after:ascwo-content-[''] after:ascwo-absolute after:ascwo-top-[-3px] after:ascwo-left-[-5px] after:ascwo-bg-zinc-300 after:ascwo-border-white after:ascwo-border-solid after:ascwo-translate-y-[-15%] after:ascwo-border-[#FFFFFF] after:ascwo-border-[5px] after:ascwo-rounded-full after:ascwo-h-3 after:ascwo-w-3 after:ascwo-transition-all after:ascwo-shadow-lg"></div>
                                </label>
                            </div>
                            <div class="ascwo-flex ascwo-justify-center ascwo-items-center ascwo-space-x-4">
                                <p class="ascwo-text-md ascwo-font-medium ascwo-text-black">{{ __('Price Multiplier', 'all-signs-customizer-for-woocommerce-pro') }}</p>
                                <label :for="'multiplier'+key" class="ascwo-relative ascwo-inline-flex ascwo-items-center ascwo-cursor-pointer ascwo-border-[1px] ascwo-border-solid ascwo-border-black ascwo-rounded-full">
                                <input :id="'multiplier'+key" type="radio" :name="'price'+key" class="ascwo-sr-only ascwo-peer" value="multiplier" v-model="inputTypeImage.options[key].price.type">
                                <div class="peer-checked:after:ascwo-border-[#016464] peer-checked:after:ascwo-border-solid peer-checked:after:ascwo-border-[5px] peer-checked:after:ascwo-top-[-2px] peer-checked:after:ascwo-translate-y-[-15%] ascwo-w-10 ascwo-h-3 ascwo-border ascwo-border-[5px] ascwo-border-[#016464] ascwo-bg-zinc-300 ascwo-rounded-full ascwo-peer peer-checked:after:ascwo-translate-x-[112%] after:ascwo-content-[''] after:ascwo-absolute after:ascwo-top-[-3px] after:ascwo-left-[-5px] after:ascwo-bg-zinc-300 after:ascwo-border-white after:ascwo-border-solid after:ascwo-translate-y-[-15%] after:ascwo-border-[#FFFFFF] after:ascwo-border-[5px] after:ascwo-rounded-full after:ascwo-h-3 after:ascwo-w-3 after:ascwo-transition-all after:ascwo-shadow-lg"></div>
                                </label>
                            </div>
                        </div>
                        <div v-show="inputTypeImage.options[key].price.type!='none'">
                            <div class="ascwo-flex ascwo-flex-col ascwo-space-y-1 ascwo-w-10/12 ascwo-pt-4 ascwo-pb-8 ascwo-px-8">
                                <input type="number" class="ascwo-border-solid ascwo-rounded ascwo-p-2 ascwo-h-[35px]" v-model="inputTypeImage.options[key].price.value" @blur="isNaN(inputTypeImage.options[key].price.value) ? inputTypeImage.options[key].price.value = 0 : ''">
                                <p class="text-[11px] w-2/3">{{inputTypeImage.options[key].price.type == 'base'? __('Additional cost when selected by customer (e.g. $10.00).', 'all-signs-customizer-for-woocommerce-pro') : __('Multiply the final price of the sign when selected (e.g. 2 x 100).', 'all-signs-customizer-for-woocommerce-pro')}}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="ascwo-absolute ascwo-flex ascwo-jsutify-center ascwo-items-center ascwo-space-x-2 ascwo-right-0 ascwo-top-0 ">
                    <button v-if="dropOptions[key]" :disabled="isLoading" @click="dropOptions[key]=false" class="ascwo-top-0 ascwo-flex ascwo-justify-center ascwo-items-center ascwo-bg-[#007a73] ascwo-rounded-[7px] ascwo-w-8 ascwo-h-8 ascwo-text-white ascwo-border-none hover:ascwo-border-none hover:ascwo-text-white hover:ascwo-bg-[#007a73] ascwo-cursor-pointer">
                        <ChevronUpIcon :size="16" :stroke-width="2.25" />
                    </button>
                    <button v-if="!dropOptions[key]" :disabled="isLoading" @click="dropOptions[key]=true" class="ascwo-top-0 ascwo-flex ascwo-justify-center ascwo-items-center ascwo-bg-[#007a73] ascwo-rounded-[7px] ascwo-w-8 ascwo-h-8 ascwo-text-white ascwo-border-none hover:ascwo-border-none hover:ascwo-text-white hover:ascwo-bg-[#007a73] ascwo-cursor-pointer">
                        <ChevronDownIcon :size="16" :stroke-width="2.25" />
                    </button>
                    <button v-if="inputTypeImage.options.length > 1" :disabled="isLoading" @click="handleClickRemoveAdditional(key)" class="ascwo-flex ascwo-jsutify-center ascwo-items-center ascwo-bg-red-500 ascwo-rounded ascwo-w-fit ascwo-space-x-2 ascwo-h-fit ascwo-text-white ascwo-opacity-90 hover:ascwo-opacity-100 hover:ascwo-border-none hover:ascwo-text-white hover:ascwo-bg-red-400 ascwo-cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="ascwo-w-4 ascwo-h-4">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                    </button>
                </div>
            </div>
            <div class="ascwo-pt-4 ascwo-felx ascwo-justify-start ascwo-items-center">
                <button :disabled="isLoading" @click="handleClickAddAdditional" class="ascwo-flex ascwo-jsutify-center ascwo-items-center ascwo-bg-[#016464] ascwo-rounded ascwo-w-fit ascwo-space-x-2 ascwo-h-fit ascwo-text-white ascwo-px-8 ascwo-p-2.5 ascwo-rounded ascwo-border-none hover:ascwo-opacity-100 hover:ascwo-border-none hover:ascwo-text-white hover:ascwo-bg-[#016464] ascwo-cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="ascwo-w-6 ascwo-h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    {{ __("More", "all-signs-customizer-for-woocommerce-pro") }}
                </button>
            </div>
        </div>
    </div>
    <div class="ascwo-bg-[#F8F9FB] ascwo-flex ascwo-space-x-4 ascwo-px-4 ascwo-py-4 ascwo-justify-end ascwo-items-end ascwo-sticky ascwo-z-[999] ascwo-bottom-0">
        <div class="ascwo-bg-[#007a73] ascwo-rounded-[7px] ascwo-border ascwo-border-solid ascwo-border-[#006c67]">
            <button class="ascwo-flex ascwo-items-center ascwo-justify-center ascwo-bg-transparent ascwo-w-fit ascwo-gap-1.5 ascwo-h-[30px] ascwo-px-3.5 ascwo-py-1.5 ascwo-border-none ascwo-text-white ascwo-text-[12px] ascwo-font-bold hover:ascwo-border-none hover:ascwo-text-white hover:ascwo-bg-transparent ascwo-cursor-pointer" @click="setBack">
                <svg class="ascwo-w-4 ascwo-h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 12L5 8V11L17.17 11C17.3756 10.414 17.7586 9.90661 18.2657 9.54821C18.7729 9.18981 19.379 8.9982 20 9C20.7956 9 21.5587 9.31607 22.1213 9.87868C22.6839 10.4413 23 11.2044 23 12C23 12.7956 22.6839 13.5587 22.1213 14.1213C21.5587 14.6839 20.7956 15 20 15C18.69 15 17.58 14.17 17.17 13L5 13V16L1 12Z" fill="currentColor"/>
                </svg>

                <div class="ascwo-leading-none">{{ __('Back', 'all-signs-customizer-for-woocommerce-pro') }}</div>
            </button>
        </div>
        <div :class="`${isLoading ? 'ascwo-bg-[#006c67]' : 'ascwo-bg-[#007a73]'} ascwo-rounded-[7px] ascwo-border ascwo-border-solid ascwo-border-[#006c67]`">
            <button :disabled="isLoading" @click="props.action? updateAdditional(): saveAdditional()" class="ascwo-flex ascwo-items-center ascwo-justify-center ascwo-bg-transparent ascwo-w-fit ascwo-gap-1.5 ascwo-h-[30px] ascwo-text-white ascwo-text-[12px] ascwo-font-bold ascwo-px-4 ascwo-py-1.5 ascwo-border-none hover:ascwo-border-none hover:ascwo-text-white hover:ascwo-bg-transparent ascwo-cursor-pointer">
                <div class="ascwo-flex ascwo-items-center">
                    <img src="@/../assets/icons/ic_loading_gray.svg" class="ascwo-w-4 ascwo-h-4" v-if="isLoading"/>
                    <svg class="ascwo-w-4 ascwo-h-4" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" v-if="!isLoading">
                        <path d="M2.5 1.25C2.16848 1.25 1.85054 1.3817 1.61612 1.61612C1.3817 1.85054 1.25 2.16848 1.25 2.5V17.5C1.25 17.8315 1.3817 18.1495 1.61612 18.3839C1.85054 18.6183 2.16848 18.75 2.5 18.75H17.5C17.8315 18.75 18.1495 18.6183 18.3839 18.3839C18.6183 18.1495 18.75 17.8315 18.75 17.5V2.5C18.75 2.16848 18.6183 1.85054 18.3839 1.61612C18.1495 1.3817 17.8315 1.25 17.5 1.25H2.5C1.83696 1.25 1.20107 1.3817 0.732233 1.61612C0.263392 1.85054 0 2.16848 0 2.5V11.6163L13.9325 8.3075C14.0499 8.19014 14.209 8.12421 14.375 8.12421C14.541 8.12421 14.7001 8.19014 14.8175 8.3075C14.9349 8.42486 15.0008 8.58403 15.0008 8.75C15.0008 8.91597 14.9349 9.07514 14.8175 9.1925L10.4425 13.5675C10.3844 13.6257 10.3155 13.6719 10.2395 13.7034C10.1636 13.7349 10.0822 13.7511 10 13.7511C9.91779 13.7511 9.83639 13.7349 9.76046 13.7034C9.68453 13.6719 9.61556 13.6257 9.5575 13.5675L5.1825 9.1925C5.12439 9.13439 5.07829 9.0654 5.04685 8.98948C5.0154 8.91356 4.99921 8.83218 4.99921 8.75C4.99921 8.66782 5.0154 8.58644 5.04685 8.51052C5.07829 8.4346 5.12439 8.36561 5.1825 8.3075C5.24061 8.24939 5.3096 8.20329 5.38552 8.17185C5.46144 8.1404 5.54282 8.12421 5.625 8.12421C5.70718 8.12421 5.78856 8.1404 5.86448 8.17185C5.9404 8.20329 6.00939 8.24939 6.0675 8.3075L9.375 11.6163V2.5C9.375 1.83696 9.63839 1.20107 10.1072 0.732233C10.5761 0.263392 11.212 0 11.875 0L17.5 0C18.163 0 18.7989 0.263392 19.2678 0.732233C19.7366 1.20107 20 1.83696 20 2.5V17.5C20 18.163 19.7366 18.7989 19.2678 19.2678C18.7989 19.7366 18.163 20 17.5 20H2.5C1.83696 20 1.20107 19.7366 0.732233 19.2678C0.263392 18.7989 0 18.163 0 17.5V2.5C0 1.83696 0.263392 1.20107 0.732233 0.732233C1.20107 0.263392 1.83696 0 2.5 0L5.625 0C5.79076 0 5.94973 0.065848 6.06694 0.183058C6.18415 0.300269 6.25 0.45924 6.25 0.625C6.25 0.79076 6.18415 0.949732 6.06694 1.06694C5.94973 1.18415 5.79076 1.25 5.625 1.25H2.5Z" fill="white"/>
                    </svg>
                </div>

                <span class="ascwo-leading-none">{{props.action? __('Update', 'all-signs-customizer-for-woocommerce-pro') : __('Save', 'all-signs-customizer-for-woocommerce-pro') }}</span>
            </button>
        </div>
    </div>
</template>

<script setup>
import {ref,onMounted,defineProps} from 'vue';
import api from '@/admin/Api/api';
import toastMessage from '@/admin/utils/functions';
import { useRoute } from 'vue-router';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-vue-next';
import { __, _x, _n, _nx, sprintf, setLocaleData } from "@wordpress/i18n";
const route = useRoute()
const props = defineProps({
    action:Boolean,
    data:Object,
    id:Number,
    changeAction:Function,
    changeOpen:Function,
    changeAdditionals:Function
});
const isLoading = ref(false);
const inputTypeImage = ref({
    type: "image-input",
    label: "",
    description: "",
    options: [
        {
            label: "",
            value: "",
            color: "#fffffff",
            prevImg: "",
            popImg: "",
            price: {
                type: "none",
                value: 0
            }
        }
    ]
});
const dropOptions = ref([true]);
const colorImageInput = (event,key) => {
    if(event.target.value[0]!=='#'){
        event.target.value = '#'+ event.target.value;
    }
    inputTypeImage.value.options[key].color = event.target.value;
}

const selectChangePreviewImage = async(e,key) => {
    e.preventDefault();
    var uploader = wp.media(
        {
            title: __('choose a picture', 'all-signs-customizer-for-woocommerce-pro'),
            button: {
                text: __('choose a picture', 'all-signs-customizer-for-woocommerce-pro')
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
                            inputTypeImage.value.options[key].prevImg = (attachment.url);
                        }
                    }
                );
            }
        )
        .open();
};
const selectPopupImage = async(e,key) => {
    e.preventDefault();
    var uploader = wp.media(
        {
            title: __('choose a picture', 'all-signs-customizer-for-woocommerce-pro'),
            button: {
                text: __('choose a picture', 'all-signs-customizer-for-woocommerce-pro')
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
                            inputTypeImage.value.options[key].popImg = (attachment.url);
                        }
                    }
                );
            }
        )
        .open();
};
const handleClickRemoveAdditional = (index) => {
    if(index!=0){
        inputTypeImage.value.options.splice(index,1);
        dropOptions.value.splice(index,1);
        emptyValueArray.value.splice(index,1);
    }else{
        if(inputTypeImage.value.options.length>1){
            inputTypeImage.value.options.splice(index,1);
            emptyValueArray.value.splice(index,1);
            dropOptions.value.splice(index,1);
        }
    }
}
const handleClickAddAdditional = () => {
    inputTypeImage.value.options.push({
        label: "",
        value: "",
        color: "#fffffff",
        prevImg: "",
        popImg: "",
        price: {
            type: "none",
            value: 0
        }
    });
    emptyValueArray.value.push(false);
    for (let index = 0; index < dropOptions.value.length; index++) {
        dropOptions.value[index]=false;
    }
    dropOptions.value.push(true);
}
const isValideType = (option)=>{
    return option.type == "image-input" ? true : false;
};

var emptyValueArray = ref([false]);
var emptyLabel = ref(false);
onMounted(()=>{
    if(props.data){
        inputTypeImage.value = isValideType(props.data) ? props.data : {
            ...inputTypeImage.value,
            label:props.data.label,
            description:props.data.description,
            options:[
                {
                    label: "",
                    value: "",
                    color: "#fffffff",
                    prevImg: "",
                    popImg: "",
                    price: {
                        type: "none",
                        value: 0
                    }
                }
            ]
        };
        if(isValideType(props.data)){
            var tab=[];
            for (let index = 0; index < props.data.options.length; index++) {
                tab.push(false);
            }
            dropOptions.value = tab;
        }
    }
});

const haveEmptyValue = () => {
    var index = -1;
    inputTypeImage.value.options.forEach((element,i) => {
        if(element.value.trim() == '') {
            index = i;
        }
    });
    return index;
}

const setBack = () => {
    inputTypeImage.value = {
        type: "image-input",
        label: "",
        description: "",
        options: [
            {
                label: "",
                value: "",
                color: "#fffffff",
                prevImg: "",
                popImg: "",
                price: {
                    type: "none",
                    value: 0
                }
            }
        ]
    }
    props.changeAction(false);
    props.changeOpen();
}

const saveAdditional = async () => {
    if(inputTypeImage.value.label.trim() == ''){
        emptyLabel.value = true;
        toastMessage("Label must not be empty","warning");
    }else if(haveEmptyValue()!=-1){
        emptyValueArray.value[haveEmptyValue()] = true;
        toastMessage("The value field must not be empty","warning");
    }else{
        isLoading.value = true;
        const op = await api.addCustomAdditional(route.params.configId,inputTypeImage.value);
        if(op.success){
            emptyLabel.value = false;
            props.changeOpen();
            props.changeAdditionals('add',op.message);
        }
        isLoading.value = false;
    }
}

const updateAdditional = async () => {
    if(inputTypeImage.value.label.trim() == ''){
        emptyLabel.value = true;
        toastMessage("The Image Label must not be empty","warning");
    }else if(haveEmptyValue() != -1){
        emptyValueArray.value[haveEmptyValue()] = true;
        toastMessage("The value field must not be empty","warning");
    }else{
        isLoading.value = true;
        const op = await api.updateCustomAdditional(route.params.configId,props.id,inputTypeImage.value);
        if(op.success){
            emptyLabel.value = false;
            props.changeAction(false);
            props.changeOpen();
            props.changeAdditionals('edit',op.message);
        }
        isLoading.value = false;
    }
}

</script>
