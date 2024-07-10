<template>
    <div>
        <div>
            <div class="aso-bg-[#F8F9FB] aso-px-8 aso-py-8 aso-space-y-6 aso-translate-y-8">
                
                <div class="aso-flex aso-space-x-3">
                    <div class="aso-text-[16px]">Enable download Image</div>
                    <div class="aso-flex aso-items-center aso-translate-y-0.5">
                        <label for="toggleEnableUpload" class="aso-relative aso-inline-flex aso-items-center aso-cursor-pointer aso-border-[1px] aso-border-solid aso-border-black aso-rounded-full">
                            <input id="toggleEnableUpload" type="checkbox" class="aso-sr-only aso-peer" v-model="image.enableDownloadImage">
                            <div :class="`peer-checked:after:aso-border-[#016464] peer-checked:after:aso-border-solid peer-checked:after:aso-border-[5px] peer-checked:after:aso-top-[-2px] peer-checked:after:aso-translate-y-[-15%] aso-w-10 aso-h-3 aso-border aso-border-[5px] aso-border-[#016464] aso-bg-zinc-300 aso-rounded-full aso-peer peer-checked:after:aso-translate-x-[140%] after:aso-content-[''] after:aso-absolute after:aso-top-[-2px] after:aso-left-[-5px] after:aso-bg-zinc-300 after:aso-border-white after:aso-border-solid after:aso-translate-y-[-15%] after:aso-border-[#FFFFFF] after:aso-border-[5px] after:aso-rounded-full after:aso-h-2.5 after:aso-w-2.5 after:aso-transition-all after:aso-shadow-lg`"></div>
                        </label>
                    </div>
                </div>
                <div class="aso-flex aso-space-x-3">
                    <div class="aso-text-[16px]">Enable upload Image</div>
                    <div class="aso-flex aso-items-center aso-translate-y-0.5">
                        <label for="toggleEnableUpload" class="aso-relative aso-inline-flex aso-items-center aso-cursor-pointer aso-border-[1px] aso-border-solid aso-border-black aso-rounded-full">
                            <input id="toggleEnableUpload" type="checkbox" name="toggleEnableUpload" class="aso-sr-only aso-peer" v-model="image.enableUploadImage">
                            <div :class="`peer-checked:after:aso-border-[#016464] peer-checked:after:aso-border-solid peer-checked:after:aso-border-[5px] peer-checked:after:aso-top-[-2px] peer-checked:after:aso-translate-y-[-15%] aso-w-10 aso-h-3 aso-border aso-border-[5px] aso-border-[#016464] aso-bg-zinc-300 aso-rounded-full aso-peer peer-checked:after:aso-translate-x-[140%] after:aso-content-[''] after:aso-absolute after:aso-top-[-2px] after:aso-left-[-5px] after:aso-bg-zinc-300 after:aso-border-white after:aso-border-solid after:aso-translate-y-[-15%] after:aso-border-[#FFFFFF] after:aso-border-[5px] after:aso-rounded-full after:aso-h-2.5 after:aso-w-2.5 after:aso-transition-all after:aso-shadow-lg`"></div>
                        </label>
                    </div>
                </div>
                <div>
                    <div class="aso-flex aso-justify-between aso-space-x-6 aso-space-y-2">
                        <div class="aso-flex aso-flex-col aso-w-2/5 aso-space-y-2">
                            <label class="aso-text-[12px] aso-text-[#444444]">Upload min width (px)</label>
                            <input type="number" v-model="image.fileUploadScript.uploadMinWidth" class="aso-w-full" @blur="()=>{ if(isNaN(image.fileUploadScript.uploadMinWidth)){image.fileUploadScript.uploadMinWidth=100}}"/>
                        </div>
                        <div class="aso-flex aso-flex-col aso-w-2/5 aso-space-y-2">
                            <label class="aso-text-[12px] aso-text-[#444444]">Upload Max width (px)</label>
                            <input type="number" v-model="image.fileUploadScript.uploadMaxWidth" class="aso-w-full" @blur="()=>{ if(isNaN(image.fileUploadScript.uploadMaxWidth)){image.fileUploadScript.uploadMaxWidth =1024}}"/>
                        </div>
                    </div>
                    <div class="aso-pt-2">
                        <Multiselect
                            v-model="image.fileUploadScript.allowedUploadsExtentions"
                            placeholder=""
                            :options="allowedUploadsExtentions"
                            label="name"
                            trackBy="name"
                            mode="tags"
                        /> 
                    </div>

                </div> 
                <div class="aso-space-y-3">
                    <div class="aso-flex aso-space-x-3">
                        <div class="aso-text-[16px]">Enable clipart</div>
                        <div class="aso-flex aso-items-center aso-translate-y-0.5">
                            <label for="toggleEnableClipart" class="aso-relative aso-inline-flex aso-items-center aso-cursor-pointer aso-border-[1px] aso-border-solid aso-border-black aso-rounded-full">
                                <input id="toggleEnableClipart" type="checkbox" name="toggleEnableClipart" class="aso-sr-only aso-peer" v-model="image.enableClipart.active">
                                <div :class="`peer-checked:after:aso-border-[#016464] peer-checked:after:aso-border-solid peer-checked:after:aso-border-[5px] peer-checked:after:aso-top-[-2px] peer-checked:after:aso-translate-y-[-15%] aso-w-10 aso-h-3 aso-border aso-border-[5px] aso-border-[#016464] aso-bg-zinc-300 aso-rounded-full aso-peer peer-checked:after:aso-translate-x-[140%] after:aso-content-[''] after:aso-absolute after:aso-top-[-2px] after:aso-left-[-5px] after:aso-bg-zinc-300 after:aso-border-white after:aso-border-solid after:aso-translate-y-[-15%] after:aso-border-[#FFFFFF] after:aso-border-[5px] after:aso-rounded-full after:aso-h-2.5 after:aso-w-2.5 after:aso-transition-all after:aso-shadow-lg`"></div>
                            </label>
                        </div>
                    </div>
                    <div class="aso-space-y-2" v-if="image.enableClipart.active">
                        <label class="aso-text-[12px] aso-text-[#444444]">Select clipart  group</label>
                        <Multiselect
                            v-model="image.enableClipart.selectedClipartGroups"
                            placeholder=""
                            :options="manageCliparts"
                            label="name"
                            trackBy="name"
                            mode="tags"
                            :loading="isFetching"
                        />
                    </div>
                </div>
                <div class="aso-flex aso-justify-start aso-space-x-8 aso-items-center">
                    <div class="aso-flex aso-space-x-3">
                        <div class="aso-text-[16px]">Enable Custom color</div>
                        <div class="aso-flex aso-items-center aso-translate-y-0.5">
                            <label for="toggleCustom" class="aso-relative aso-inline-flex aso-items-center aso-cursor-pointer aso-border-[1px] aso-border-solid aso-border-black aso-rounded-full">
                                <input id="toggleCustom" type="checkbox" name="toggleCustom" class="aso-sr-only aso-peer" v-model="image.enableCustomColor">
                                <div :class="`peer-checked:after:aso-border-[#016464] peer-checked:after:aso-border-solid peer-checked:after:aso-border-[5px] peer-checked:after:aso-top-[-2px] peer-checked:after:aso-translate-y-[-15%] aso-w-10 aso-h-3 aso-border aso-border-[5px] aso-border-[#016464] aso-bg-zinc-300 aso-rounded-full aso-peer peer-checked:after:aso-translate-x-[140%] after:aso-content-[''] after:aso-absolute after:aso-top-[-2px] after:aso-left-[-5px] after:aso-bg-zinc-300 after:aso-border-white after:aso-border-solid after:aso-translate-y-[-15%] after:aso-border-[#FFFFFF] after:aso-border-[5px] after:aso-rounded-full after:aso-h-2.5 after:aso-w-2.5 after:aso-transition-all after:aso-shadow-lg`"></div>
                            </label>
                        </div>
                    </div>
                    <div class="aso-w-3/5 aso-space-x-2 aso-flex aso-items-center" v-if="image.enableCustomColor">
                        <label for="" class="aso-text-[16px] aso-text[#444444] aso-font-normal aso-w-full">Custom Color Preview Image : </label>
                        <div class="aso-flex aso-flex-col aso-space-y-2 aso-w-full aso-pt-2">
                            <div class="aso-flex aso-space-x-2">
                                <button @click="selectColorPrevImage" class="aso-bg-[#016464] aso-border-none aso-w-fit aso-h-fit aso-p-4 aso-rounded aso-px-4 aso-text-white aso-opacity-90 hover:aso-opacity-100 aso-text-[10px] aso-cursor-pointer">Upload image</button>
                                <div :class="`aso-relative aso-w-[82px] aso-h-[49px] aso-rounded-md aso-overflow-hidden`">
                                    <img v-if="image.colorsPrevImg != ''" :src="image.colorsPrevImg" alt="" class="aso-absolute aso-w-full aso-h-full">
                                    <button v-if="image.colorsPrevImg != ''" @click="()=>{image.colorsPrevImg = ''}" :class="`aso-bg-[#016464] aso-absolute aso-bottom-0 aso-right-0 aso-text-white aso-p-1 aso-rounded-tl-lg aso-border-none`">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="aso-w-4 aso-h-4">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>             
                    </div>
                </div>
                <div class="aso-space-y-2">
                    <label class="aso-text-[16px] aso-font-bold">Colors for uploaded svg (only for uploaded images that are svg)</label>
                    <div class="aso-grid aso-grid-cols-3 aso-gap-4" v-if="image.colors.length>0">
                        <div class="aso-flex aso-justify-start aso-space-x-2" :key="key" v-for="(color,key) in image.colors">
                            <div class="aso-w-2/5 aso-space-y-2 aso-flex aso-flex-col">
                                <label for="" class="aso-text-[12px] aso-text[#444444] aso-font-normal">Name</label>
                                <input type="text" class="aso-rounded aso-w-full aso-h-[30px]" v-model="image.colors[key].name" autocomplete="off"> 
                            </div>
                            <div class="aso-w-2/5 aso-space-y-2 aso-flex aso-flex-col">
                                <label for="" class="aso-text-[12px] aso-text[#444444] aso-font-normal aso-invisible">Background color</label>
                                <div class="aso-relative aso-flex">
                                    <input
                                        id="colorPicker"
                                        type="color"
                                        v-model="image.colors[key].codeHex"
                                        @input="(e)=>changeColorCodeHex(e,key)"
                                        class="aso-w-9 aso-h-[30px]"
                                    />
                                    <input
                                        type="text"
                                        v-model="image.colors[key].codeHex"
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
                    <div class="aso-pt-4">
                        <button @click="addNewColor" class="aso-flex aso-jsutify-center aso-items-center aso-bg-[#016464] aso-rounded aso-w-fit aso-space-x-2 aso-h-fit aso-text-white aso-px-8 aso-p-2.5 aso-rounded aso-border-none hover:aso-opacity-100 hover:aso-border-none hover:aso-text-white hover:aso-bg-[#016464] aso-cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="aso-w-6 aso-h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                            <span class="aso-font-semibold aso-text-[16px]">Add More Color</span>
                        </button>
                    </div>
                </div>
                <div>
                    <div class="aso-flex aso-space-x-3">
                        <div class="aso-text-[16px]">Filter</div>
                        <div class="aso-flex aso-items-center aso-translate-y-0.5">
                            <label for="toggleEnableFilter" class="aso-relative aso-inline-flex aso-items-center aso-cursor-pointer aso-border-[1px] aso-border-solid aso-border-black aso-rounded-full">
                                <input id="toggleEnableFilter" type="checkbox" name="toggleEnableFilter" class="aso-sr-only aso-peer" v-model="image.filter.active">
                                <div :class="`peer-checked:after:aso-border-[#016464] peer-checked:after:aso-border-solid peer-checked:after:aso-border-[5px] peer-checked:after:aso-top-[-2px] peer-checked:after:aso-translate-y-[-15%] aso-w-10 aso-h-3 aso-border aso-border-[5px] aso-border-[#016464] aso-bg-zinc-300 aso-rounded-full aso-peer peer-checked:after:aso-translate-x-[140%] after:aso-content-[''] after:aso-absolute after:aso-top-[-2px] after:aso-left-[-5px] after:aso-bg-zinc-300 after:aso-border-white after:aso-border-solid after:aso-translate-y-[-15%] after:aso-border-[#FFFFFF] after:aso-border-[5px] after:aso-rounded-full after:aso-h-2.5 after:aso-w-2.5 after:aso-transition-all after:aso-shadow-lg`"></div>
                            </label>
                        </div>
                    </div>
                </div>
                <div class="aso-flex aso-space-x-6" v-if="image.filter.active">
                    <div class="aso-text-center aso-space-x-2 aso-space-y-1 aso-flex">
                        <div>
                            <button class="aso-bg-transparent aso-cursor-pointer aso-border aso-border-solid aso-border-[1px] aso-border-[#BBBBBB] aso-w-fit aso-h-fit aso-px-1 aso-py-0.5">
                                <svg class="aso-w-4 aso-h-4" viewBox="0 0 12 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10 11V9H11.61C11.85 9.71 12 10.39 12 11H10ZM9.58 5C9.12 4.29 8.65 3.61 8.2 3H8V5H9.58ZM10 9V7H8V9H10ZM10 5.68V7H10.74C10.5 6.56 10.26 6.11 10 5.68ZM6 13V11H8V9H6V7H8V5H6V3H8V2.73C6.9 1.26 6 0.25 6 0.25C6 0.25 0 7 0 11C0 14.31 2.69 17 6 17V15H8V13H6ZM8 16.65C8.75 16.39 9.42 16 10 15.46V15H8V16.65ZM8 13H10V11H8V13ZM10 15H10.46C11 14.42 11.39 13.75 11.65 13H10V15Z" fill="black"/>
                                </svg>
                            </button>
                            <div class="aso-text-[10px] aso-text-[#3D3D3D] -aso-translate-y-0.5 aso-px-0.5">Greyscale</div>
                        </div>
                        <div class="aso-flex aso-items-center -aso-translate-y-3">
                            <label for="toggleEnableGreyscale" class="aso-relative aso-inline-flex aso-items-center aso-cursor-pointer aso-border-[1px] aso-border-solid aso-border-black aso-rounded-full">
                                <input id="toggleEnableGreyscale" type="checkbox" name="toggleEnableGreyscale" class="aso-sr-only aso-peer" v-model="image.filter.enableGreyscale">
                                <div :class="`peer-checked:after:aso-border-[#016464] peer-checked:after:aso-border-solid peer-checked:after:aso-border-[5px] peer-checked:after:aso-top-[-2px] peer-checked:after:aso-translate-y-[-15%] aso-w-10 aso-h-3 aso-border aso-border-[5px] aso-border-[#016464] aso-bg-zinc-300 aso-rounded-full aso-peer peer-checked:after:aso-translate-x-[140%] after:aso-content-[''] after:aso-absolute after:aso-top-[-2px] after:aso-left-[-5px] after:aso-bg-zinc-300 after:aso-border-white after:aso-border-solid after:aso-translate-y-[-15%] after:aso-border-[#FFFFFF] after:aso-border-[5px] after:aso-rounded-full after:aso-h-2.5 after:aso-w-2.5 after:aso-transition-all after:aso-shadow-lg`"></div>
                            </label>
                        </div>

                    </div>
                    <div class="aso-text-center aso-space-y-1 aso-space-x-3 aso-flex">
                        <div>
                            <button class="aso-bg-transparent aso-cursor-pointer aso-border aso-border-solid aso-border-[1px] aso-border-[#BBBBBB] aso-w-fit aso-h-fit aso-px-1 aso-py-0.5">
                                <svg class="aso-w-4 aso-h-4" viewBox="0 0 12 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10 11V9H11.61C11.85 9.71 12 10.39 12 11H10ZM9.58 5C9.12 4.29 8.65 3.61 8.2 3H8V5H9.58ZM10 9V7H8V9H10ZM10 5.68V7H10.74C10.5 6.56 10.26 6.11 10 5.68ZM6 13V11H8V9H6V7H8V5H6V3H8V2.73C6.9 1.26 6 0.25 6 0.25C6 0.25 0 7 0 11C0 14.31 2.69 17 6 17V15H8V13H6ZM8 16.65C8.75 16.39 9.42 16 10 15.46V15H8V16.65ZM8 13H10V11H8V13ZM10 15H10.46C11 14.42 11.39 13.75 11.65 13H10V15Z" fill="black"/>
                                </svg>
                            </button>
                            <div class="aso-text-[10px] aso-text-[#3D3D3D] -aso-translate-y-0.5 aso-px-0.5">Opacity</div>
                        </div>
                        <div class="aso-flex aso-items-center -aso-translate-y-3">
                            <label for="toggleEnableOpacity" class="aso-relative aso-inline-flex aso-items-center aso-cursor-pointer aso-border-[1px] aso-border-solid aso-border-black aso-rounded-full">
                                <input id="toggleEnableOpacity" type="checkbox" name="toggleEnableOpacity" class="aso-sr-only aso-peer" v-model="image.filter.enableOpacity">
                                <div :class="`peer-checked:after:aso-border-[#016464] peer-checked:after:aso-border-solid peer-checked:after:aso-border-[5px] peer-checked:after:aso-top-[-2px] peer-checked:after:aso-translate-y-[-15%] aso-w-10 aso-h-3 aso-border aso-border-[5px] aso-border-[#016464] aso-bg-zinc-300 aso-rounded-full aso-peer peer-checked:after:aso-translate-x-[140%] after:aso-content-[''] after:aso-absolute after:aso-top-[-2px] after:aso-left-[-5px] after:aso-bg-zinc-300 after:aso-border-white after:aso-border-solid after:aso-translate-y-[-15%] after:aso-border-[#FFFFFF] after:aso-border-[5px] after:aso-rounded-full after:aso-h-2.5 after:aso-w-2.5 after:aso-transition-all after:aso-shadow-lg`"></div>
                            </label>
                        </div>
                    </div>
                    <div class="aso-text-center aso-space-y-1 aso-space-x-3 aso-flex">
                        <div>
                            <button class="aso-bg-transparent aso-cursor-pointer aso-border aso-border-solid aso-border-[1px] aso-border-[#BBBBBB] aso-w-fit aso-h-fit aso-px-1 aso-py-0.5">
                                <svg class="aso-w-4 aso-h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11.9995 5.00001C10.7051 5.00009 9.43008 5.31425 8.28382 5.91552C7.13756 6.51679 6.15432 7.38722 5.41847 8.4521C4.68263 9.51698 4.21616 10.7445 4.05911 12.0293C3.90205 13.3142 4.0591 14.6179 4.51677 15.8287C4.97445 17.0394 5.71907 18.1211 6.68675 18.9808C7.65442 19.8404 8.81625 20.4525 10.0725 20.7643C11.3288 21.0762 12.6419 21.0786 13.8993 20.7713C15.1567 20.464 16.3207 19.8562 17.2915 19H11.9995V18H18.2445C18.4975 17.685 18.7265 17.351 18.9295 17H11.9995V16H19.4185C19.5501 15.6743 19.6601 15.3402 19.7475 15H11.9995V14H19.9375C19.9789 13.6683 19.9996 13.3343 19.9995 13H11.9995V12H19.9375C19.8956 11.663 19.8321 11.329 19.7475 11H11.9995V10H19.4185C19.2787 9.65566 19.1149 9.32151 18.9285 9.00001H11.9995V8.00001H18.2445C17.9561 7.63996 17.6373 7.30539 17.2915 7.00001H11.9995V6.00001H15.8755C14.6897 5.34212 13.3556 4.99791 11.9995 5.00001Z" fill="black"/>
                                </svg>
                            </button>
                            <div class="aso-text-[10px] aso-text-[#3D3D3D] -aso-translate-y-0.5 aso-px-0.5">Blur</div>
                        </div>
                        <div class="aso-flex aso-items-center -aso-translate-y-3">
                            <label for="toggleEnableBlur" class="aso-relative aso-inline-flex aso-items-center aso-cursor-pointer aso-border-[1px] aso-border-solid aso-border-black aso-rounded-full">
                                <input id="toggleEnableBlur" type="checkbox" name="toggleEnableBlur" class="aso-sr-only aso-peer" v-model="image.filter.enableBlur">
                                <div :class="`peer-checked:after:aso-border-[#016464] peer-checked:after:aso-border-solid peer-checked:after:aso-border-[5px] peer-checked:after:aso-top-[-2px] peer-checked:after:aso-translate-y-[-15%] aso-w-10 aso-h-3 aso-border aso-border-[5px] aso-border-[#016464] aso-bg-zinc-300 aso-rounded-full aso-peer peer-checked:after:aso-translate-x-[140%] after:aso-content-[''] after:aso-absolute after:aso-top-[-2px] after:aso-left-[-5px] after:aso-bg-zinc-300 after:aso-border-white after:aso-border-solid after:aso-translate-y-[-15%] after:aso-border-[#FFFFFF] after:aso-border-[5px] after:aso-rounded-full after:aso-h-2.5 after:aso-w-2.5 after:aso-transition-all after:aso-shadow-lg`"></div>
                            </label>
                        </div>
                    </div>
                    <div class="aso-text-center aso-space-y-1 aso-space-x-3 aso-flex">
                        <div>
                            <button class="aso-bg-transparent aso-cursor-pointer aso-border aso-border-solid aso-border-[1px] aso-border-[#BBBBBB] aso-w-fit aso-h-fit aso-px-1 aso-py-0.5">
                                <img class="aso-w-4 aso-h-4" src="../../../../../../assets/icons/ic_triangle.svg" alt="">
                            </button>
                            <div class="aso-text-[10px] aso-text-[#3D3D3D] -aso-translate-y-0.5 aso-px-0.5">Sepia</div>
                        </div>
                        <div class="aso-flex aso-items-center -aso-translate-y-3">
                            <label for="toggleEnableSepia" class="aso-relative aso-inline-flex aso-items-center aso-cursor-pointer aso-border-[1px] aso-border-solid aso-border-black aso-rounded-full">
                                <input id="toggleEnableSepia" type="checkbox" name="toggleEnableSepia" class="aso-sr-only aso-peer" v-model="image.filter.enableSepia">
                                <div :class="`peer-checked:after:aso-border-[#016464] peer-checked:after:aso-border-solid peer-checked:after:aso-border-[5px] peer-checked:after:aso-top-[-2px] peer-checked:after:aso-translate-y-[-15%] aso-w-10 aso-h-3 aso-border aso-border-[5px] aso-border-[#016464] aso-bg-zinc-300 aso-rounded-full aso-peer peer-checked:after:aso-translate-x-[140%] after:aso-content-[''] after:aso-absolute after:aso-top-[-2px] after:aso-left-[-5px] after:aso-bg-zinc-300 after:aso-border-white after:aso-border-solid after:aso-translate-y-[-15%] after:aso-border-[#FFFFFF] after:aso-border-[5px] after:aso-rounded-full after:aso-h-2.5 after:aso-w-2.5 after:aso-transition-all after:aso-shadow-lg`"></div>
                            </label>
                        </div>
                    </div>
                    <div class="aso-text-center aso-space-y-1 aso-space-x-3 aso-flex">
                        <div>
                            <button class="aso-bg-transparent aso-cursor-pointer aso-border aso-border-solid aso-border-[1px] aso-border-[#BBBBBB] aso-w-fit aso-h-fit aso-px-1 aso-py-0.5">
                                <img class="aso-w-4 aso-h-4" src="../../../../../../assets/icons/ic_triangle.svg" alt="">
                            </button>
                            <div class="aso-text-[10px] aso-text-[#3D3D3D] -aso-translate-y-0.5 aso-px-0.5">sharpen</div>
                        </div>
                        <div class="aso-flex aso-items-center -aso-translate-y-3">
                            <label for="toggleEnableSharpen" class="aso-relative aso-inline-flex aso-items-center aso-cursor-pointer aso-border-[1px] aso-border-solid aso-border-black aso-rounded-full">
                                <input id="toggleEnableSharpen" type="checkbox" name="toggleEnableSharpen" class="aso-sr-only aso-peer" v-model="image.filter.enableSharpen">
                                <div :class="`peer-checked:after:aso-border-[#016464] peer-checked:after:aso-border-solid peer-checked:after:aso-border-[5px] peer-checked:after:aso-top-[-2px] peer-checked:after:aso-translate-y-[-15%] aso-w-10 aso-h-3 aso-border aso-border-[5px] aso-border-[#016464] aso-bg-zinc-300 aso-rounded-full aso-peer peer-checked:after:aso-translate-x-[140%] after:aso-content-[''] after:aso-absolute after:aso-top-[-2px] after:aso-left-[-5px] after:aso-bg-zinc-300 after:aso-border-white after:aso-border-solid after:aso-translate-y-[-15%] after:aso-border-[#FFFFFF] after:aso-border-[5px] after:aso-rounded-full after:aso-h-2.5 after:aso-w-2.5 after:aso-transition-all after:aso-shadow-lg`"></div>
                            </label>
                        </div>
                    </div>
                    <div class="aso-text-center aso-space-y-1 aso-space-x-3 aso-flex">
                        <div>
                            <button class="aso-bg-transparent aso-cursor-pointer aso-border aso-border-solid aso-border-[1px] aso-border-[#BBBBBB] aso-w-fit aso-h-fit aso-px-1 aso-py-0.5">
                                <img class="aso-w-4 aso-h-4" src="../../../../../../assets/icons/ic_triangle.svg" alt="">
                            </button>
                            <div class="aso-text-[10px] aso-text-[#3D3D3D] -aso-translate-y-0.5 aso-px-0.5">Emboss</div>
                        </div>
                        <div class="aso-flex aso-items-center -aso-translate-y-3">
                            <label for="toggleEnableEmbross" class="aso-relative aso-inline-flex aso-items-center aso-cursor-pointer aso-border-[1px] aso-border-solid aso-border-black aso-rounded-full">
                                <input id="toggleEnableEmbross" type="checkbox" name="toggleEnableEmbross" class="aso-sr-only aso-peer" v-model="image.filter.enableEmbross">
                                <div :class="`peer-checked:after:aso-border-[#016464] peer-checked:after:aso-border-solid peer-checked:after:aso-border-[5px] peer-checked:after:aso-top-[-2px] peer-checked:after:aso-translate-y-[-15%] aso-w-10 aso-h-3 aso-border aso-border-[5px] aso-border-[#016464] aso-bg-zinc-300 aso-rounded-full aso-peer peer-checked:after:aso-translate-x-[140%] after:aso-content-[''] after:aso-absolute after:aso-top-[-2px] after:aso-left-[-5px] after:aso-bg-zinc-300 after:aso-border-white after:aso-border-solid after:aso-translate-y-[-15%] after:aso-border-[#FFFFFF] after:aso-border-[5px] after:aso-rounded-full after:aso-h-2.5 after:aso-w-2.5 after:aso-transition-all after:aso-shadow-lg`"></div>
                            </label>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
        <div class="aso-bg-[#F8F9FB] aso-flex aso-space-x-4 aso-px-4 aso-py-3 aso-justify-end aso-items-end aso-translate-y-12">
            <div class="aso-bg-[#016464] aso-rounded">
                <button :disabled="isLoading" @click="updateImageSettings" class="aso-rounded aso-flex aso-bg-transparent aso-w-fit aso-space-x-2 aso-h-fit aso-text-white aso-px-12 aso-p-2.5 aso-border-none aso-opacity-90 hover:aso-opacity-100 hover:aso-border-none hover:aso-text-white hover:aso-bg-[#016464] aso-cursor-pointeraso-flex aso-bg-transparent aso-w-fit aso-space-x-2 aso-h-fit aso-text-white aso-px-12 aso-p-2.5 aso-border-none aso-opacity-90 hover:aso-opacity-100 hover:aso-border-none hover:aso-text-white hover:aso-bg-[#016464] aso-cursor-pointer">
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
const image = ref({
    enableDownloadImage:true,
    enableUploadImage:true,
    enableCustomColor:true,
    colorsPrevImg:'',
    fileUploadScript:{
      uploadMinWidth:100,
      uploadMaxWidth:100,
      allowedUploadsExtentions:["png","jpeg","webp","svg","gif"],
    },
    enableClipart:{
        active:true,
        selectedClipartGroups:[],
    },
    filter: {
        active:true,
        enableGreyscale:true,
        enableOpacity:true,
        enableEmbross:true,
        enableBlur:true,
        enableSepia:true,
        enableSharpen:true,
    },
    colors:[]
});
const allowedUploadsExtentions = [
    {name:"PNG",value:"png"},
    {name:"JPEG",value:"jpeg"},
    {name:"SVG",value:"svg"},
    {name:"WEBP",value:"webp"},
    {name:"GIF",value:"gif"}
];
const manageCliparts = ref([]);
onMounted(async ()=>{
    isFetching.value = true;
    await fetchManageCliparts();
    if(props.data){
        image.value = {...image.value,...props.data}
    }
    isFetching.value = false;
});
const selectColorPrevImage = async(e) => { 
    e.preventDefault();
    var uploader = wp.media(
        {
            title: "Select Custom Svg Color Preview Image",
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
                            image.value.colorsPrevImg = (attachment.url);
                        }
                    }
                );
            }
        )
        .open();
}
const fetchManageCliparts = async () => {
    const result = await api.getManageCliparts();
    if (result.data.length > 0) {
        manageCliparts.value = result.data.map((group,id) => {
            return { name:group.title, value:id };
        });
    } else {
        manageCliparts.value = [];
    }
}
const updateImageSettings = async () => {
    isLoading.value = true;
    const result = await api.updateCustomizerSignsImage(configId.value,image.value);
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
    image.value.colors.push({name:"",codeHex:"#000000",additionalPrice:0});
}

</script>
