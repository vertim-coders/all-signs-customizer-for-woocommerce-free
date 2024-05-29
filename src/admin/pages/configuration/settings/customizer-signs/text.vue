<template>
    <div>
        <div>
            <div class="aso-bg-[#F8F9FB] aso-px-8 aso-py-8 aso-space-y-6 aso-translate-y-8">
                <div class="aso-flex aso-flex-col aso-w-full">
                    <label class="aso-text-[12px]">Select Fonts</label>
                    <Multiselect
                        v-model="text.selectedFonts"
                        placeholder=""
                        :options="manageFonts"
                        label="name"
                        trackBy="name"
                        mode="tags"
                        :loading="isFetching"
                    />
                        
                </div>                
                <div class="aso-flex aso-flex-col aso-w-full" >
                    <label class="aso-text-[12px]">Define text colors </label>
                    <div class="aso-flex aso-space-x-2 aso-items-center">
                        <label for="" class="aso-text-[12px] aso-text-[#444444]">Label:</label>
                        <input type="text" v-model="text.colorsLabel">
                    </div>
                    <div class="aso-grid aso-grid-cols-3 aso-gap-4">
                        <div class="aso-flex aso-justify-start aso-space-x-2" :key="key" v-for="(color,key) in text.colors">
                            <div class="aso-w-2/5 aso-space-y-2 aso-flex aso-flex-col">
                                <label for="" class="aso-text-[12px] aso-text[#444444] aso-font-normal">Name</label>
                                <input type="text" class="aso-rounded aso-w-full aso-h-[30px]" v-model="text.colors[key].name" autocomplete="off"> 
                            </div>
                            <div class="aso-w-2/5 aso-space-y-2 aso-flex aso-flex-col">
                                <label for="" class="aso-text-[12px] aso-text[#444444] aso-font-normal aso-invisible">Background color</label>
                                <div class="aso-relative aso-flex">
                                    <input
                                        id="colorPicker"
                                        type="color"
                                        v-model="text.colors[key].codeHex"
                                        @input="(e)=>changeColorCodeHex(e,key)"
                                        class="aso-w-9 aso-h-[30px]"
                                    />
                                    <input
                                        type="text"
                                        v-model="text.colors[key].codeHex"
                                        @input="(e)=>changeColorCodeHex(e,key)"
                                        class="aso-p-1 aso-text-black aso-w-full -aso-translate-y-px"
                                    />
                                </div>
                                
                            </div>
                            <div class="aso-w-2/5 aso-space-y-2 aso-flex aso-flex-col">
                                <label for="" class="aso-text-[12px] aso-text[#444444] aso-font-normal aso-invisible">Background color</label>
                                <div class="aso-relative aso-flex">
                                    <button @click="removeColor(key)" class="aso-w-[50px] aso-h-full aso-border-solid aso-border-red-600 aso-rounded aso-bg-red-600 aso-cursor-pointer aso-text-white">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="aso-w-[70%] aso-h-[70%]">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="aso-pt-4" v-if="!isFetching">
                        <button @click="addNewColor" class="aso-flex aso-jsutify-center aso-items-center aso-bg-[#016464] aso-rounded aso-w-fit aso-space-x-2 aso-h-fit aso-text-white aso-px-8 aso-p-2.5 aso-rounded aso-border-none hover:aso-opacity-100 hover:aso-border-none hover:aso-text-white hover:aso-bg-[#016464] aso-cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="aso-w-6 aso-h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                            <span class="aso-font-semibold aso-text-[16px]">Add More Color</span>
                        </button>
                    </div>
                </div>
                <div class="aso-flex aso-justify-start aso-space-x-8 aso-items-center">
                    <div class="aso-flex aso-space-x-3">
                        <div class="aso-text-[16px]">Enable Custom color</div>
                        <div class="aso-flex aso-items-center aso-translate-y-0.5">
                            <label for="toggleCustom" class="aso-relative aso-inline-flex aso-items-center aso-cursor-pointer aso-border-[1px] aso-border-solid aso-border-black aso-rounded-full">
                                <input id="toggleCustom" type="checkbox" name="toggleCustom" class="aso-sr-only aso-peer" v-model="text.enableCustomColor">
                                <div :class="`peer-checked:after:aso-border-[#016464] peer-checked:after:aso-border-solid peer-checked:after:aso-border-[5px] peer-checked:after:aso-top-[-2px] peer-checked:after:aso-translate-y-[-15%] aso-w-10 aso-h-3 aso-border aso-border-[5px] aso-border-[#016464] aso-bg-zinc-300 aso-rounded-full aso-peer peer-checked:after:aso-translate-x-[140%] after:aso-content-[''] after:aso-absolute after:aso-top-[-2px] after:aso-left-[-5px] after:aso-bg-zinc-300 after:aso-border-white after:aso-border-solid after:aso-translate-y-[-15%] after:aso-border-[#FFFFFF] after:aso-border-[5px] after:aso-rounded-full after:aso-h-2.5 after:aso-w-2.5 after:aso-transition-all after:aso-shadow-lg`"></div>
                            </label>
                        </div>
                    </div>
                    <div class="aso-w-2/5 aso-space-x-2 aso-flex aso-items-center" v-if="text.enableCustomColor">
                        <label for="" class="aso-text-[16px] aso-text[#444444] aso-font-normal aso-w-full">Custom Color Preview Image : </label>
                        <div class="aso-flex aso-flex-col aso-space-y-2 aso-w-full aso-pt-2">
                            <div class="aso-flex aso-space-x-2">
                                <button @click="selectColorPrevImage" class="aso-bg-[#016464] aso-border-none aso-w-fit aso-h-fit aso-p-4 aso-rounded aso-px-4 aso-text-white aso-opacity-90 hover:aso-opacity-100 aso-text-[10px] aso-cursor-pointer">Upload image</button>
                                <div :class="`aso-relative aso-w-[82px] aso-h-[49px] aso-rounded-md aso-overflow-hidden`">
                                    <img v-if="text.colorsPrevImg != ''" :src="text.colorsPrevImg" alt="" class="aso-absolute aso-w-full aso-h-full">
                                    <button v-if="text.colorsPrevImg != ''" @click="()=>{text.colorsPrevImg = ''}" :class="`aso-bg-[#016464] aso-absolute aso-bottom-0 aso-right-0 aso-text-white aso-p-1 aso-rounded-tl-lg aso-border-none`">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="aso-w-4 aso-h-4">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>             
                    </div>
                </div>
                <div class="aso-flex aso-space-x-6">
                    <div class="aso-flex aso-space-x-3">
                        <div class="aso-text-[16px]">Enable font size</div>
                        <div class="aso-flex aso-items-center aso-translate-y-0.5">
                            <label for="toggleEnableFont" class="aso-relative aso-inline-flex aso-items-center aso-cursor-pointer aso-border-[1px] aso-border-solid aso-border-black aso-rounded-full">
                                <input id="toggleEnableFont" type="checkbox" name="toggleEnableFont" class="aso-sr-only aso-peer" v-model="text.enableFontSize.active">
                                <div :class="`peer-checked:after:aso-border-[#016464] peer-checked:after:aso-border-solid peer-checked:after:aso-border-[5px] peer-checked:after:aso-top-[-2px] peer-checked:after:aso-translate-y-[-15%] aso-w-10 aso-h-3 aso-border aso-border-[5px] aso-border-[#016464] aso-bg-zinc-300 aso-rounded-full aso-peer peer-checked:after:aso-translate-x-[140%] after:aso-content-[''] after:aso-absolute after:aso-top-[-2px] after:aso-left-[-5px] after:aso-bg-zinc-300 after:aso-border-white after:aso-border-solid after:aso-translate-y-[-15%] after:aso-border-[#FFFFFF] after:aso-border-[5px] after:aso-rounded-full after:aso-h-2.5 after:aso-w-2.5 after:aso-transition-all after:aso-shadow-lg`"></div>
                            </label>
                        </div>
                    </div>
                </div>
                <div class="aso-flex aso-justify-between aso-space-x-6" v-if="text.enableFontSize.active">
                    <div class="aso-flex aso-flex-col aso-w-2/5 aso-space-y-2">
                        <label class="aso-text-[12px]">Minimun font size</label>
                        <input type="number" v-model="text.enableFontSize.minimumFontSize" @blur="()=>{ if(text.enableFontSize.minimumFontSize.trim()=='') {text.enableFontSize.minimumFontSize=12}}" class="aso-w-full"/>
                    </div>
                    <div class="aso-flex aso-flex-col aso-w-2/5 aso-space-y-2">
                        <label class="aso-text-[12px]">Maximum font size</label>
                        <input type="number" v-model="text.enableFontSize.maximumFontSize" @blur="()=>{ if(text.enableFontSize.maximumFontSize.trim()=='') {text.enableFontSize.maximumFontSize=30}}" class="aso-w-full"/>
                    </div>
                    <div class="aso-flex aso-flex-col aso-w-2/5 aso-space-y-2">
                        <label class="aso-text-[12px]">Default size</label>
                        <input type="number" v-model="text.enableFontSize.defaultFontSize" @blur="()=>{ if(text.enableFontSize.defaultFontSize.trim()=='') {text.enableFontSize.defaultFontSize=16}}" class="aso-w-full"/>
                    </div>
                </div>
                <div class="aso-text-[16px] aso-font-bold">enable text options</div>
                <div class="aso-grid aso-grid-cols-5 aso-gap-y-6">
                    <div class="aso-text-center aso-space-y-0.5 aso-flex aso-space-x-3">
                        <div class="">
                            <button class="aso-bg-transparent aso-cursor-pointer aso-border aso-border-solid aso-border-[1px] aso-border-[#016464] aso-w-fit aso-h-fit aso-px-2 aso-py-1.5">
                                <svg class="aso-w-4 aso-h-4" viewBox="0 0 14 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5.90078 0C8.30078 0 10.1008 0.3 11.3008 1C12.6008 1.7 13.2008 2.9 13.2008 4.6C13.2008 5.6 12.9008 6.5 12.5008 7.2C12.274 7.54193 11.9795 7.83372 11.6355 8.05733C11.2915 8.28093 10.9053 8.43159 10.5008 8.5C11.0724 8.63353 11.6147 8.87079 12.1008 9.2C12.5008 9.5 12.9008 10 13.2008 10.5C13.5137 11.2244 13.6508 12.0125 13.6008 12.8C13.6361 13.5225 13.5006 14.2431 13.2052 14.9033C12.9099 15.5636 12.4629 16.1449 11.9008 16.6C10.4772 17.6167 8.74656 18.1112 7.00078 18H0.300781V0H5.90078ZM6.30078 7.1C7.40078 7.1 8.20078 7 8.60078 6.6C9.10078 6.3 9.30078 5.7 9.30078 5.1C9.30078 4.4 9.00078 3.9 8.50078 3.6C8.00078 3.3 7.20078 3.1 6.10078 3.1H4.10078V7.1H6.30078ZM4.10078 10.1V15H6.60078C7.70078 15 8.60078 14.7 9.00078 14.3C9.50078 13.8 9.70078 13.3 9.70078 12.5C9.7127 12.1977 9.6559 11.8967 9.53465 11.6196C9.4134 11.3424 9.23086 11.0964 9.00078 10.9C8.50078 10.5 7.70078 10.3 6.50078 10.3H4.00078L4.10078 10.1Z" fill="#016464"/>
                                </svg>
                            </button>
                            <div class="aso-text-[10px] aso-text-[#3D3D3D] -aso-translate-y-0.5 aso-px-0.5">bold</div>
                        </div>
                        <div class="aso-flex aso-items-center -aso-translate-y-3">
                            <label for="toggleEnableBold" class="aso-relative aso-inline-flex aso-items-center aso-cursor-pointer aso-border-[1px] aso-border-solid aso-border-black aso-rounded-full">
                                <input id="toggleEnableBold" type="checkbox" name="toggleEnableBold" class="aso-sr-only aso-peer" v-model="text.enableBold">
                                <div :class="`peer-checked:after:aso-border-[#016464] peer-checked:after:aso-border-solid peer-checked:after:aso-border-[5px] peer-checked:after:aso-top-[-2px] peer-checked:after:aso-translate-y-[-15%] aso-w-10 aso-h-3 aso-border aso-border-[5px] aso-border-[#016464] aso-bg-zinc-300 aso-rounded-full aso-peer peer-checked:after:aso-translate-x-[140%] after:aso-content-[''] after:aso-absolute after:aso-top-[-2px] after:aso-left-[-5px] after:aso-bg-zinc-300 after:aso-border-white after:aso-border-solid after:aso-translate-y-[-15%] after:aso-border-[#FFFFFF] after:aso-border-[5px] after:aso-rounded-full after:aso-h-2.5 after:aso-w-2.5 after:aso-transition-all after:aso-shadow-lg`"></div>
                            </label>
                        </div>
                    </div>
                    <div class="aso-text-center aso-space-y-0.5 aso-flex aso-space-x-3">
                        <div class="">
                            <button class="aso-bg-transparent aso-cursor-pointer aso-border aso-border-solid aso-border-[1px] aso-border-[#016464] aso-w-fit aso-h-fit aso-px-2 aso-py-1.5">
                                <svg class="aso-w-4 aso-h-4" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3.5 1V6C3.5 7.32608 4.02678 8.59785 4.96447 9.53553C5.90215 10.4732 7.17392 11 8.5 11C9.82608 11 11.0979 10.4732 12.0355 9.53553C12.9732 8.59785 13.5 7.32608 13.5 6V1M1.5 15H15.5" stroke="#016464" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </button>
                            <div class="aso-text-[10px] aso-text-[#3D3D3D] -aso-translate-y-0.5 aso-px-0.5">underline</div>
                        </div>
                        <div class="aso-flex aso-items-center -aso-translate-y-3">
                            <label for="toggleEnableUnderline" class="aso-relative aso-inline-flex aso-items-center aso-cursor-pointer aso-border-[1px] aso-border-solid aso-border-black aso-rounded-full">
                                <input id="toggleEnableUnderline" type="checkbox" name="toggleEnableUnderline" class="aso-sr-only aso-peer" v-model="text.enableUnderline">
                                <div :class="`peer-checked:after:aso-border-[#016464] peer-checked:after:aso-border-solid peer-checked:after:aso-border-[5px] peer-checked:after:aso-top-[-2px] peer-checked:after:aso-translate-y-[-15%] aso-w-10 aso-h-3 aso-border aso-border-[5px] aso-border-[#016464] aso-bg-zinc-300 aso-rounded-full aso-peer peer-checked:after:aso-translate-x-[140%] after:aso-content-[''] after:aso-absolute after:aso-top-[-2px] after:aso-left-[-5px] after:aso-bg-zinc-300 after:aso-border-white after:aso-border-solid after:aso-translate-y-[-15%] after:aso-border-[#FFFFFF] after:aso-border-[5px] after:aso-rounded-full after:aso-h-2.5 after:aso-w-2.5 after:aso-transition-all after:aso-shadow-lg`"></div>
                            </label>
                        </div>
                    </div>
                    <div class="aso-text-center aso-space-y-0.5 aso-flex aso-space-x-3">
                        <div class="">
                            <button class="aso-bg-transparent aso-cursor-pointer aso-border aso-border-solid aso-border-[1px] aso-border-[#016464] aso-w-fit aso-h-fit aso-px-2 aso-py-1.5">
                                <svg class="aso-w-4 aso-h-4" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3.5 5V10C3.5 11.3261 4.02678 12.5979 4.96447 13.5355C5.90215 14.4732 7.17392 15 8.5 15C9.82608 15 11.0979 14.4732 12.0355 13.5355C12.9732 12.5979 13.5 11.3261 13.5 10V5M1.5 1H15.5" stroke="#016464" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </button>
                            <div class="aso-text-[10px] aso-text-[#3D3D3D] -aso-translate-y-0.5 aso-px-0.5">overline</div>
                        </div>
                        <div class="aso-flex aso-items-center -aso-translate-y-3">
                            <label for="toggleEnableOverline" class="aso-relative aso-inline-flex aso-items-center aso-cursor-pointer aso-border-[1px] aso-border-solid aso-border-black aso-rounded-full">
                                <input id="toggleEnableOverline" type="checkbox" name="toggleEnableOverline" class="aso-sr-only aso-peer" v-model="text.enableOverline">
                                <div :class="`peer-checked:after:aso-border-[#016464] peer-checked:after:aso-border-solid peer-checked:after:aso-border-[5px] peer-checked:after:aso-top-[-2px] peer-checked:after:aso-translate-y-[-15%] aso-w-10 aso-h-3 aso-border aso-border-[5px] aso-border-[#016464] aso-bg-zinc-300 aso-rounded-full aso-peer peer-checked:after:aso-translate-x-[140%] after:aso-content-[''] after:aso-absolute after:aso-top-[-2px] after:aso-left-[-5px] after:aso-bg-zinc-300 after:aso-border-white after:aso-border-solid after:aso-translate-y-[-15%] after:aso-border-[#FFFFFF] after:aso-border-[5px] after:aso-rounded-full after:aso-h-2.5 after:aso-w-2.5 after:aso-transition-all after:aso-shadow-lg`"></div>
                            </label>
                        </div>
                    </div>
                    <div class="aso-text-center aso-space-y-0.5 aso-flex aso-space-x-1">
                        <div class="">
                            <button class="aso-bg-transparent aso-cursor-pointer aso-border aso-border-solid aso-border-[1px] aso-border-[#016464] aso-w-fit aso-h-fit aso-px-2 aso-py-1.5">
                                <svg class="aso-w-4 aso-h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7 8V13M7 13C7 14.3261 7.52678 15.5979 8.46447 16.5355C9.40215 17.4732 10.6739 18 12 18C13.3261 18 14.5979 17.4732 15.5355 16.5355C16.4732 15.5979 17 14.3261 17 13M7 13H17M17 13V8" stroke="#016464" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    <line x1="3.79883" y1="13" x2="20.1988" y2="13" stroke="#016464"/>
                                </svg>
                            </button>
                            <div class="aso-text-[10px] aso-text-[#3D3D3D] -aso-translate-y-0.5 aso-px-0.5">Strike- through</div>
                        </div>
                        <div class="aso-flex aso-items-center -aso-translate-y-3">
                            <label for="toggleEnableStrike" class="aso-relative aso-inline-flex aso-items-center aso-cursor-pointer aso-border-[1px] aso-border-solid aso-border-black aso-rounded-full">
                                <input id="toggleEnableStrike" type="checkbox" name="toggleEnableStrike" class="aso-sr-only aso-peer" v-model="text.enableStrike">
                                <div :class="`peer-checked:after:aso-border-[#016464] peer-checked:after:aso-border-solid peer-checked:after:aso-border-[5px] peer-checked:after:aso-top-[-2px] peer-checked:after:aso-translate-y-[-15%] aso-w-10 aso-h-3 aso-border aso-border-[5px] aso-border-[#016464] aso-bg-zinc-300 aso-rounded-full aso-peer peer-checked:after:aso-translate-x-[140%] after:aso-content-[''] after:aso-absolute after:aso-top-[-2px] after:aso-left-[-5px] after:aso-bg-zinc-300 after:aso-border-white after:aso-border-solid after:aso-translate-y-[-15%] after:aso-border-[#FFFFFF] after:aso-border-[5px] after:aso-rounded-full after:aso-h-2.5 after:aso-w-2.5 after:aso-transition-all after:aso-shadow-lg`"></div>
                            </label>
                        </div>
                    </div>
                    <div class="aso-text-center aso-space-y-0.5 aso-flex aso-space-x-3">
                        <div class="">
                            <button class="aso-bg-transparent aso-cursor-pointer aso-border aso-border-solid aso-border-[1px] aso-border-[#BBBBBB] aso-w-fit aso-h-fit aso-px-2 aso-py-1.5">
                                <svg class="aso-w-4 aso-h-4" viewBox="0 0 24 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M18.7031 4.21875H8.57812C8.475 4.21875 8.39062 4.31367 8.39062 4.42969V6.11719C8.39062 6.2332 8.475 6.32812 8.57812 6.32812H12.825L9.16875 20.6719H5.36719C5.26406 20.6719 5.17969 20.7668 5.17969 20.8828V22.5703C5.17969 22.6863 5.26406 22.7812 5.36719 22.7812H15.4922C15.5953 22.7812 15.6797 22.6863 15.6797 22.5703V20.8828C15.6797 20.7668 15.5953 20.6719 15.4922 20.6719H11.1187L14.775 6.32812H18.7031C18.8062 6.32812 18.8906 6.2332 18.8906 6.11719V4.42969C18.8906 4.31367 18.8062 4.21875 18.7031 4.21875Z" fill="black"/>
                                </svg>
                            </button>
                            <div class="aso-text-[10px] aso-text-[#3D3D3D] -aso-translate-y-0.5 aso-px-0.5">Italic</div>
                        </div>
                        <div class="aso-flex aso-items-center -aso-translate-y-3">
                            <label for="toggleEnableItalic" class="aso-relative aso-inline-flex aso-items-center aso-cursor-pointer aso-border-[1px] aso-border-solid aso-border-black aso-rounded-full">
                                <input id="toggleEnableItalic" type="checkbox" name="toggleEnableItalic" class="aso-sr-only aso-peer" v-model="text.enableItalic">
                                <div :class="`peer-checked:after:aso-border-[#016464] peer-checked:after:aso-border-solid peer-checked:after:aso-border-[5px] peer-checked:after:aso-top-[-2px] peer-checked:after:aso-translate-y-[-15%] aso-w-10 aso-h-3 aso-border aso-border-[5px] aso-border-[#016464] aso-bg-zinc-300 aso-rounded-full aso-peer peer-checked:after:aso-translate-x-[140%] after:aso-content-[''] after:aso-absolute after:aso-top-[-2px] after:aso-left-[-5px] after:aso-bg-zinc-300 after:aso-border-white after:aso-border-solid after:aso-translate-y-[-15%] after:aso-border-[#FFFFFF] after:aso-border-[5px] after:aso-rounded-full after:aso-h-2.5 after:aso-w-2.5 after:aso-transition-all after:aso-shadow-lg`"></div>
                            </label>
                        </div>
                    </div>
                    <div class="aso-text-center aso-space-y-0.5 aso-flex aso-space-x-3">
                        <div class="">
                            <button class="aso-bg-transparent aso-cursor-pointer aso-border aso-border-solid aso-border-[1px] aso-border-[#BBBBBB] aso-w-fit aso-h-fit aso-px-2 aso-py-1.5">
                                <svg class="aso-w-4 aso-h-4" viewBox="0 0 12 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10 11V9H11.61C11.85 9.71 12 10.39 12 11H10ZM9.58 5C9.12 4.29 8.65 3.61 8.2 3H8V5H9.58ZM10 9V7H8V9H10ZM10 5.68V7H10.74C10.5 6.56 10.26 6.11 10 5.68ZM6 13V11H8V9H6V7H8V5H6V3H8V2.73C6.9 1.26 6 0.25 6 0.25C6 0.25 0 7 0 11C0 14.31 2.69 17 6 17V15H8V13H6ZM8 16.65C8.75 16.39 9.42 16 10 15.46V15H8V16.65ZM8 13H10V11H8V13ZM10 15H10.46C11 14.42 11.39 13.75 11.65 13H10V15Z" fill="black"/>
                                </svg>
                            </button>
                            <div class="aso-text-[10px] aso-text-[#3D3D3D] -aso-translate-y-0.5 aso-px-0.5">Opacity</div>
                        </div>
                        <div class="aso-flex aso-items-center -aso-translate-y-3">
                            <label for="toggleEnableOpacity" class="aso-relative aso-inline-flex aso-items-center aso-cursor-pointer aso-border-[1px] aso-border-solid aso-border-black aso-rounded-full">
                                <input id="toggleEnableOpacity" type="checkbox" name="toggleEnableOpacity" class="aso-sr-only aso-peer" v-model="text.enableOpacity">
                                <div :class="`peer-checked:after:aso-border-[#016464] peer-checked:after:aso-border-solid peer-checked:after:aso-border-[5px] peer-checked:after:aso-top-[-2px] peer-checked:after:aso-translate-y-[-15%] aso-w-10 aso-h-3 aso-border aso-border-[5px] aso-border-[#016464] aso-bg-zinc-300 aso-rounded-full aso-peer peer-checked:after:aso-translate-x-[140%] after:aso-content-[''] after:aso-absolute after:aso-top-[-2px] after:aso-left-[-5px] after:aso-bg-zinc-300 after:aso-border-white after:aso-border-solid after:aso-translate-y-[-15%] after:aso-border-[#FFFFFF] after:aso-border-[5px] after:aso-rounded-full after:aso-h-2.5 after:aso-w-2.5 after:aso-transition-all after:aso-shadow-lg`"></div>
                            </label>
                        </div>
                    </div>
                    <div class="aso-text-center aso-space-y-0.5 aso-flex aso-space-x-3">
                        <div class="">
                            <button class="aso-bg-transparent aso-cursor-pointer aso-border aso-border-solid aso-border-[1px] aso-border-[#BBBBBB] aso-w-fit aso-h-fit aso-px-2 aso-py-1.5">
                                <svg class="aso-w-4 aso-h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7 21H9V19H7V21ZM7 13H9V11H7V13ZM11 13H13V11H11V13ZM11 21H13V19H11V21ZM3 17H5V15H3V17ZM3 21H5V19H3V21ZM3 13H5V11H3V13ZM3 9H5V7H3V9ZM11 17H13V15H11V17ZM19 9H21V7H19V9ZM19 13H21V11H19V13ZM3 3V5H21V3H3ZM19 17H21V15H19V17ZM15 21H17V19H15V21ZM11 9H13V7H11V9ZM19 21H21V19H19V21ZM15 13H17V11H15V13Z" fill="black"/>
                                </svg>
                            </button>
                            <div class="aso-text-[10px] aso-text-[#3D3D3D] -aso-translate-y-0.5 aso-px-0.5">Border</div>
                        </div>
                        <div class="aso-flex aso-items-center -aso-translate-y-3">
                            <label for="toggleEnableBorder" class="aso-relative aso-inline-flex aso-items-center aso-cursor-pointer aso-border-[1px] aso-border-solid aso-border-black aso-rounded-full">
                                <input id="toggleEnableBorder" type="checkbox" name="toggleEnableBorder" class="aso-sr-only aso-peer" v-model="text.enableBorder">
                                <div :class="`peer-checked:after:aso-border-[#016464] peer-checked:after:aso-border-solid peer-checked:after:aso-border-[5px] peer-checked:after:aso-top-[-2px] peer-checked:after:aso-translate-y-[-15%] aso-w-10 aso-h-3 aso-border aso-border-[5px] aso-border-[#016464] aso-bg-zinc-300 aso-rounded-full aso-peer peer-checked:after:aso-translate-x-[140%] after:aso-content-[''] after:aso-absolute after:aso-top-[-2px] after:aso-left-[-5px] after:aso-bg-zinc-300 after:aso-border-white after:aso-border-solid after:aso-translate-y-[-15%] after:aso-border-[#FFFFFF] after:aso-border-[5px] after:aso-rounded-full after:aso-h-2.5 after:aso-w-2.5 after:aso-transition-all after:aso-shadow-lg`"></div>
                            </label>
                        </div>
                    </div>
                    <div class="aso-text-center aso-space-y-0.5 aso-flex aso-space-x-3">
                        <div class="">
                            <div class="aso-flex aso-border aso-border-solid aso-border-[1px] aso-border-[#BBBBBB]">
                                <button class="aso-bg-transparent aso-cursor-pointer aso-w-fit aso-h-fit aso-px-2 aso-py-1.5 aso-border-none">
                                    <svg class="aso-w-4 aso-h-4" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M0.375 1C0.375 0.767936 0.437556 0.545376 0.548905 0.381282C0.660255 0.217187 0.811278 0.125 0.96875 0.125H14.0312C14.1887 0.125 14.3397 0.217187 14.4511 0.381282C14.5624 0.545376 14.625 0.767936 14.625 1C14.625 1.23206 14.5624 1.45462 14.4511 1.61872C14.3397 1.78281 14.1887 1.875 14.0312 1.875H0.96875C0.811278 1.875 0.660255 1.78281 0.548905 1.61872C0.437556 1.45462 0.375 1.23206 0.375 1ZM0.96875 6.25H10.4688C10.6262 6.25 10.7772 6.15781 10.8886 5.99372C10.9999 5.82962 11.0625 5.60706 11.0625 5.375C11.0625 5.14294 10.9999 4.92038 10.8886 4.75628C10.7772 4.59219 10.6262 4.5 10.4688 4.5H0.96875C0.811278 4.5 0.660255 4.59219 0.548905 4.75628C0.437556 4.92038 0.375 5.14294 0.375 5.375C0.375 5.60706 0.437556 5.82962 0.548905 5.99372C0.660255 6.15781 0.811278 6.25 0.96875 6.25ZM14.0312 8.875H0.96875C0.811278 8.875 0.660255 8.96719 0.548905 9.13128C0.437556 9.29537 0.375 9.51794 0.375 9.75C0.375 9.98206 0.437556 10.2046 0.548905 10.3687C0.660255 10.5328 0.811278 10.625 0.96875 10.625H14.0312C14.1887 10.625 14.3397 10.5328 14.4511 10.3687C14.5624 10.2046 14.625 9.98206 14.625 9.75C14.625 9.51794 14.5624 9.29537 14.4511 9.13128C14.3397 8.96719 14.1887 8.875 14.0312 8.875ZM10.4688 13.25H0.96875C0.811278 13.25 0.660255 13.3422 0.548905 13.5063C0.437556 13.6704 0.375 13.8929 0.375 14.125C0.375 14.3571 0.437556 14.5796 0.548905 14.7437C0.660255 14.9078 0.811278 15 0.96875 15H10.4688C10.6262 15 10.7772 14.9078 10.8886 14.7437C10.9999 14.5796 11.0625 14.3571 11.0625 14.125C11.0625 13.8929 10.9999 13.6704 10.8886 13.5063C10.7772 13.3422 10.6262 13.25 10.4688 13.25Z" fill="black"/>
                                    </svg>
                                </button>
                                <button class="aso-bg-transparent aso-cursor-pointer aso-w-fit aso-h-fit aso-px-2 aso-py-1.5 aso-border-none">
                                    <svg class="aso-w-4 aso-h-4" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M14.625 1.06689V1.94189C14.625 2.17396 14.5624 2.39652 14.4511 2.56061C14.3397 2.72471 14.1887 2.81689 14.0312 2.81689H0.96875C0.811278 2.81689 0.660255 2.72471 0.548905 2.56061C0.437556 2.39652 0.375 2.17396 0.375 1.94189V1.06689C0.375 0.83483 0.437556 0.612271 0.548905 0.448176C0.660255 0.284082 0.811278 0.191895 0.96875 0.191895H14.0312C14.1887 0.191895 14.3397 0.284082 14.4511 0.448176C14.5624 0.612271 14.625 0.83483 14.625 1.06689ZM12.25 7.19189C12.4075 7.19189 12.5585 7.09971 12.6698 6.93561C12.7812 6.77152 12.8438 6.54896 12.8438 6.31689V5.44189C12.8438 5.20983 12.7812 4.98727 12.6698 4.82318C12.5585 4.65908 12.4075 4.56689 12.25 4.56689H2.75C2.59253 4.56689 2.44151 4.65908 2.33016 4.82318C2.21881 4.98727 2.15625 5.20983 2.15625 5.44189V6.31689C2.15625 6.54896 2.21881 6.77152 2.33016 6.93561C2.44151 7.09971 2.59253 7.19189 2.75 7.19189H12.25ZM14.0312 8.94189H0.96875C0.811278 8.94189 0.660255 9.03408 0.548905 9.19818C0.437556 9.36227 0.375 9.58483 0.375 9.81689V10.6919C0.375 10.924 0.437556 11.1465 0.548905 11.3106C0.660255 11.4747 0.811278 11.5669 0.96875 11.5669H14.0312C14.1887 11.5669 14.3397 11.4747 14.4511 11.3106C14.5624 11.1465 14.625 10.924 14.625 10.6919V9.81689C14.625 9.58483 14.5624 9.36227 14.4511 9.19818C14.3397 9.03408 14.1887 8.94189 14.0312 8.94189ZM12.25 13.3169H2.75C2.59253 13.3169 2.44151 13.4091 2.33016 13.5732C2.21881 13.7373 2.15625 13.9598 2.15625 14.1919V15.0669C2.15625 15.299 2.21881 15.5215 2.33016 15.6856C2.44151 15.8497 2.59253 15.9419 2.75 15.9419H12.25C12.4075 15.9419 12.5585 15.8497 12.6698 15.6856C12.7812 15.5215 12.8438 15.299 12.8438 15.0669V14.1919C12.8438 13.9598 12.7812 13.7373 12.6698 13.5732C12.5585 13.4091 12.4075 13.3169 12.25 13.3169Z" fill="black"/>
                                    </svg>
                                </button>
                                <button class="aso-bg-transparent aso-cursor-pointer aso-w-fit aso-h-fit aso-px-2 aso-py-1.5 aso-border-none">
                                    <svg class="aso-w-4 aso-h-4" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M0.375 1C0.375 0.767936 0.437556 0.545376 0.548905 0.381282C0.660255 0.217187 0.811278 0.125 0.96875 0.125H14.0312C14.1887 0.125 14.3397 0.217187 14.4511 0.381282C14.5624 0.545376 14.625 0.767936 14.625 1C14.625 1.23206 14.5624 1.45462 14.4511 1.61872C14.3397 1.78281 14.1887 1.875 14.0312 1.875H0.96875C0.811278 1.875 0.660255 1.78281 0.548905 1.61872C0.437556 1.45462 0.375 1.23206 0.375 1ZM14.0312 4.5H4.53125C4.37378 4.5 4.22276 4.59219 4.11141 4.75628C4.00006 4.92038 3.9375 5.14294 3.9375 5.375C3.9375 5.60706 4.00006 5.82962 4.11141 5.99372C4.22276 6.15781 4.37378 6.25 4.53125 6.25H14.0312C14.1887 6.25 14.3397 6.15781 14.4511 5.99372C14.5624 5.82962 14.625 5.60706 14.625 5.375C14.625 5.14294 14.5624 4.92038 14.4511 4.75628C14.3397 4.59219 14.1887 4.5 14.0312 4.5ZM14.0312 8.875H0.96875C0.811278 8.875 0.660255 8.96719 0.548905 9.13128C0.437556 9.29537 0.375 9.51794 0.375 9.75C0.375 9.98206 0.437556 10.2046 0.548905 10.3687C0.660255 10.5328 0.811278 10.625 0.96875 10.625H14.0312C14.1887 10.625 14.3397 10.5328 14.4511 10.3687C14.5624 10.2046 14.625 9.98206 14.625 9.75C14.625 9.51794 14.5624 9.29537 14.4511 9.13128C14.3397 8.96719 14.1887 8.875 14.0312 8.875ZM14.0312 13.25H4.53125C4.37378 13.25 4.22276 13.3422 4.11141 13.5063C4.00006 13.6704 3.9375 13.8929 3.9375 14.125C3.9375 14.3571 4.00006 14.5796 4.11141 14.7437C4.22276 14.9078 4.37378 15 4.53125 15H14.0312C14.1887 15 14.3397 14.9078 14.4511 14.7437C14.5624 14.5796 14.625 14.3571 14.625 14.125C14.625 13.8929 14.5624 13.6704 14.4511 13.5063C14.3397 13.3422 14.1887 13.25 14.0312 13.25Z" fill="black"/>
                                    </svg>
                                </button>
                            </div>
                            <div class="aso-text-[10px] aso-text-[#3D3D3D] -aso-translate-y-0.5">Text Alignment</div>

                        </div>
                        <div class="aso-flex aso-items-center -aso-translate-y-2">
                            <label for="toggleEnableTextAlignment" class="aso-relative aso-inline-flex aso-items-center aso-cursor-pointer aso-border-[1px] aso-border-solid aso-border-black aso-rounded-full">
                                <input id="toggleEnableTextAlignment" type="checkbox" name="toggleEnableTextAlignment" class="aso-sr-only aso-peer" v-model="text.enableTextAlignment">
                                <div :class="`peer-checked:after:aso-border-[#016464] peer-checked:after:aso-border-solid peer-checked:after:aso-border-[5px] peer-checked:after:aso-top-[-2px] peer-checked:after:aso-translate-y-[-15%] aso-w-10 aso-h-3 aso-border aso-border-[5px] aso-border-[#016464] aso-bg-zinc-300 aso-rounded-full aso-peer peer-checked:after:aso-translate-x-[140%] after:aso-content-[''] after:aso-absolute after:aso-top-[-2px] after:aso-left-[-5px] after:aso-bg-zinc-300 after:aso-border-white after:aso-border-solid after:aso-translate-y-[-15%] after:aso-border-[#FFFFFF] after:aso-border-[5px] after:aso-rounded-full after:aso-h-2.5 after:aso-w-2.5 after:aso-transition-all after:aso-shadow-lg`"></div>
                            </label>
                        </div>
                    </div>
                    <div class="aso-text-center aso-space-y-0.5 aso-flex aso-space-x-3">
                        <div class="">
                            <button class="aso-bg-transparent aso-cursor-pointer aso-border aso-border-solid aso-border-[1px] aso-border-[#BBBBBB] aso-w-fit aso-h-fit aso-px-2 aso-py-1.5">
                                <img class="aso-w-4 aso-h-4" src="../../../../../../assets/icons/ic_curved_up.svg" alt="">
                            </button>
                            <div class="aso-text-[10px] aso-text-[#3D3D3D] -aso-translate-y-0.5 aso-px-0.5">curved up</div>
                        </div>
                        <div class="aso-flex aso-items-center -aso-translate-y-3">
                            <label for="toggleEnableCurvedUp" class="aso-relative aso-inline-flex aso-items-center aso-cursor-pointer aso-border-[1px] aso-border-solid aso-border-black aso-rounded-full">
                                <input id="toggleEnableCurvedUp" type="checkbox" name="toggleEnableCurvedUp" class="aso-sr-only aso-peer" v-model="text.enableCurvedUp">
                                <div :class="`peer-checked:after:aso-border-[#016464] peer-checked:after:aso-border-solid peer-checked:after:aso-border-[5px] peer-checked:after:aso-top-[-2px] peer-checked:after:aso-translate-y-[-15%] aso-w-10 aso-h-3 aso-border aso-border-[5px] aso-border-[#016464] aso-bg-zinc-300 aso-rounded-full aso-peer peer-checked:after:aso-translate-x-[140%] after:aso-content-[''] after:aso-absolute after:aso-top-[-2px] after:aso-left-[-5px] after:aso-bg-zinc-300 after:aso-border-white after:aso-border-solid after:aso-translate-y-[-15%] after:aso-border-[#FFFFFF] after:aso-border-[5px] after:aso-rounded-full after:aso-h-2.5 after:aso-w-2.5 after:aso-transition-all after:aso-shadow-lg`"></div>
                            </label>
                        </div>
                    </div>
                    <div class="aso-text-center aso-space-y-0.5 aso-flex aso-space-x-1">
                        <div class="">
                            <button class="aso-bg-transparent aso-cursor-pointer aso-border aso-border-solid aso-border-[1px] aso-border-[#BBBBBB] aso-w-fit aso-h-fit aso-px-2 aso-py-1.5">
                                <img class="aso-w-4 aso-h-4" src="../../../../../../assets/icons/ic_curved_down.svg" alt="">
                            </button>
                            <div class="aso-text-[10px] aso-text-[#3D3D3D] -aso-translate-y-0.5 aso-px-0.5">curved down</div>
                        </div>
                        <div class="aso-flex aso-items-center -aso-translate-y-3">
                            <label for="toggleEnableCurvedDown" class="aso-relative aso-inline-flex aso-items-center aso-cursor-pointer aso-border-[1px] aso-border-solid aso-border-black aso-rounded-full">
                                <input id="toggleEnableCurvedDown" type="checkbox" name="toggleEnableCurvedDown" class="aso-sr-only aso-peer" v-model="text.enableCurvedDown">
                                <div :class="`peer-checked:after:aso-border-[#016464] peer-checked:after:aso-border-solid peer-checked:after:aso-border-[5px] peer-checked:after:aso-top-[-2px] peer-checked:after:aso-translate-y-[-15%] aso-w-10 aso-h-3 aso-border aso-border-[5px] aso-border-[#016464] aso-bg-zinc-300 aso-rounded-full aso-peer peer-checked:after:aso-translate-x-[140%] after:aso-content-[''] after:aso-absolute after:aso-top-[-2px] after:aso-left-[-5px] after:aso-bg-zinc-300 after:aso-border-white after:aso-border-solid after:aso-translate-y-[-15%] after:aso-border-[#FFFFFF] after:aso-border-[5px] after:aso-rounded-full after:aso-h-2.5 after:aso-w-2.5 after:aso-transition-all after:aso-shadow-lg`"></div>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="aso-bg-[#F8F9FB] aso-flex aso-space-x-4 aso-px-4 aso-py-3 aso-justify-end aso-items-end aso-translate-y-12">
            <div class="aso-bg-[#016464] aso-rounded">
                <button :disabled="isLoading" @click="updateTextSettings" class="aso-rounded aso-flex aso-bg-transparent aso-w-fit aso-space-x-2 aso-h-fit aso-text-white aso-px-12 aso-p-2.5 aso-border-none aso-opacity-90 hover:aso-opacity-100 hover:aso-border-none hover:aso-text-white hover:aso-bg-[#016464] aso-cursor-pointeraso-flex aso-bg-transparent aso-w-fit aso-space-x-2 aso-h-fit aso-text-white aso-px-12 aso-p-2.5 aso-border-none aso-opacity-90 hover:aso-opacity-100 hover:aso-border-none hover:aso-text-white hover:aso-bg-[#016464] aso-cursor-pointer">
                    <img src="../../../../../../assets/icons/ic_loading_gray.svg" class="aso-w-5 aso-w-5" v-if="isLoading" />
                    <div class="aso-font-semibold aso-text-[16px]">Save</div>
                </button>
            </div>
        </div>
    </div>
</template>
<script setup>
import api from '@/admin/Api/api';
import {ref,defineProps, onMounted} from 'vue';
import { useRoute } from 'vue-router';
import Multiselect from "@vueform/multiselect";
import toastMessage from '@/admin/utils/functions';
const props = defineProps({
    data:Object,
    fetchSettings:Function
   
});

const route = useRoute();
const configId = ref(route.params.configId);
const isLoading =ref(false);
const isFetching = ref(false);
const text = ref({
    selectedFonts: [],
    colorsLabel:"Texts Colors",
    colors:[],
    enableCustomColor:true,
    colorsPrevImg:"",    
    enableFontSize:{
        active:true,
        minimumFontSize:12,
        maximumFontSize:50,
        defaultFontSize:16,
    },
    enableBold:true,
    enableUnderline:true,
    enableOverline:true,
    enableStrike:true,
    enableItalic:true,
    enableOpacity:true,
    enableBorder:true,
    enableTextAlignment:true,
    enableCurvedUp:true,
    enableCurvedDown:true,
});
const manageFonts = ref([]);

onMounted(async ()=>{
    isFetching.value = true;
    await fetchManageFonts();
    if(props.data){
        text.value = {...text.value,...props.data}
    }
    isFetching.value = false;
});

const selectColorPrevImage = async(e) => { 
    e.preventDefault();
    var uploader = wp.media(
        {
            title: "Select Custom Text Color Preview Image",
            button: {
                text: "Select Image"
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
                            text.value.colorsPrevImg = (attachment.url);
                        }
                    }
                );
            }
        )
        .open();
}

const fetchManageFonts = async () => {
    const result = await api.getManagefonts();
    if(!result.message){
        console.log(result);
        manageFonts.value = result.map((font,id)=>{
            return {name:font.label,value:id};
        });
    }else{
        manageFonts.value = [];
    }
}
const updateTextSettings = async () => {
    isLoading.value = true;
    const result = await api.updateCustomizerSignsText(configId.value,text.value);
    if(result.success){
        await props.fetchSettings();
        isLoading.value = false;
        if(result.success == true){
            toastMessage(result.message);
        }else{
            toastMessage(result.message,"warning");
        }
    }else{
        isLoading.value = false;
        toastMessage(result.message,"error");
    }
};
const addNewColor = ()=> {
    text.value.colors.push({name:"",codeHex:"#000000",additionalPrice:0});
}
const removeColor = (key)=> {
    text.value.colors.splice(key,1);
}
const changeColorCodeHex = (event,key) => {
    if(event.target.value[0]!=='#'){
        event.target.value = '#'+ event.target.value;
    }
    text.value.colors[key].codeHex = event.target.value;
}


</script>