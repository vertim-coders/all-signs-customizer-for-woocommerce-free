<template>
    <div>
        <div>
            <div class="asowp-bg-[#F8F9FB] asowp-px-8 asowp-py-8 asowp-space-y-6 asowp-translate-y-8">
                
                <div class="asowp-flex asowp-space-x-3">
                    <div class="asowp-text-[16px]">{{ __("Enable download Image", "all-signs-options-pro") }}</div>
                    <div class="asowp-flex asowp-items-center asowp-translate-y-0.5">
                        <label for="toggleEnableUpload" class="asowp-relative asowp-inline-flex asowp-items-center asowp-cursor-pointer asowp-border-[1px] asowp-border-solid asowp-border-black asowp-rounded-full">
                            <input id="toggleEnableUpload" type="checkbox" class="asowp-sr-only asowp-peer" v-model="image.enableDownloadImage">
                            <div :class="`peer-checked:after:asowp-border-[#016464] peer-checked:after:asowp-border-solid peer-checked:after:asowp-border-[5px] peer-checked:after:asowp-top-[-2px] peer-checked:after:asowp-translate-y-[-15%] asowp-w-10 asowp-h-3 asowp-border asowp-border-[5px] asowp-border-[#016464] asowp-bg-zinc-300 asowp-rounded-full asowp-peer peer-checked:after:asowp-translate-x-[140%] after:asowp-content-[''] after:asowp-absolute after:asowp-top-[-2px] after:asowp-left-[-5px] after:asowp-bg-zinc-300 after:asowp-border-white after:asowp-border-solid after:asowp-translate-y-[-15%] after:asowp-border-[#FFFFFF] after:asowp-border-[5px] after:asowp-rounded-full after:asowp-h-2.5 after:asowp-w-2.5 after:asowp-transition-all after:asowp-shadow-lg`"></div>
                        </label>
                    </div>
                </div>
                <div class="asowp-flex asowp-space-x-3">
                    <div class="asowp-text-[16px]">{{ __("Enable upload Image", "all-signs-options-pro") }}</div>
                    <div class="asowp-flex asowp-items-center asowp-translate-y-0.5">
                        <label for="toggleEnableUpload" class="asowp-relative asowp-inline-flex asowp-items-center asowp-cursor-pointer asowp-border-[1px] asowp-border-solid asowp-border-black asowp-rounded-full">
                            <input id="toggleEnableUpload" type="checkbox" name="toggleEnableUpload" class="asowp-sr-only asowp-peer" v-model="image.enableUploadImage">
                            <div :class="`peer-checked:after:asowp-border-[#016464] peer-checked:after:asowp-border-solid peer-checked:after:asowp-border-[5px] peer-checked:after:asowp-top-[-2px] peer-checked:after:asowp-translate-y-[-15%] asowp-w-10 asowp-h-3 asowp-border asowp-border-[5px] asowp-border-[#016464] asowp-bg-zinc-300 asowp-rounded-full asowp-peer peer-checked:after:asowp-translate-x-[140%] after:asowp-content-[''] after:asowp-absolute after:asowp-top-[-2px] after:asowp-left-[-5px] after:asowp-bg-zinc-300 after:asowp-border-white after:asowp-border-solid after:asowp-translate-y-[-15%] after:asowp-border-[#FFFFFF] after:asowp-border-[5px] after:asowp-rounded-full after:asowp-h-2.5 after:asowp-w-2.5 after:asowp-transition-all after:asowp-shadow-lg`"></div>
                        </label>
                    </div>
                </div>
                <div>
                    <div class="asowp-flex asowp-justify-between asowp-space-x-6 asowp-space-y-2">
                        <div class="asowp-flex asowp-flex-col asowp-w-2/5 asowp-space-y-2">
                            <label class="asowp-text-[12px] asowp-text-[#444444]">{{ __("Upload min width (px)", "all-signs-options-pro") }}</label>
                            <input type="number" v-model="image.fileUploadScript.uploadMinWidth" class="asowp-w-full" @blur="()=>{ if(isNaN(image.fileUploadScript.uploadMinWidth)){image.fileUploadScript.uploadMinWidth=100}}"/>
                        </div>
                        <div class="asowp-flex asowp-flex-col asowp-w-2/5 asowp-space-y-2">
                            <label class="asowp-text-[12px] asowp-text-[#444444]">{{ __("Upload Max width (px)", "all-signs-options-pro") }}</label>
                            <input type="number" v-model="image.fileUploadScript.uploadMaxWidth" class="asowp-w-full" @blur="()=>{ if(isNaN(image.fileUploadScript.uploadMaxWidth)){image.fileUploadScript.uploadMaxWidth =1024}}"/>
                        </div>
                    </div>
                    <div class="asowp-pt-2">
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
                <div class="asowp-space-y-3">
                    <div class="asowp-flex asowp-space-x-3">
                        <div class="asowp-text-[16px]">{{ __("Enable clipart", "all-signs-options-pro") }}</div>
                        <div class="asowp-flex asowp-items-center asowp-translate-y-0.5">
                            <label for="toggleEnableClipart" class="asowp-relative asowp-inline-flex asowp-items-center asowp-cursor-pointer asowp-border-[1px] asowp-border-solid asowp-border-black asowp-rounded-full">
                                <input id="toggleEnableClipart" type="checkbox" name="toggleEnableClipart" class="asowp-sr-only asowp-peer" v-model="image.enableClipart.active">
                                <div :class="`peer-checked:after:asowp-border-[#016464] peer-checked:after:asowp-border-solid peer-checked:after:asowp-border-[5px] peer-checked:after:asowp-top-[-2px] peer-checked:after:asowp-translate-y-[-15%] asowp-w-10 asowp-h-3 asowp-border asowp-border-[5px] asowp-border-[#016464] asowp-bg-zinc-300 asowp-rounded-full asowp-peer peer-checked:after:asowp-translate-x-[140%] after:asowp-content-[''] after:asowp-absolute after:asowp-top-[-2px] after:asowp-left-[-5px] after:asowp-bg-zinc-300 after:asowp-border-white after:asowp-border-solid after:asowp-translate-y-[-15%] after:asowp-border-[#FFFFFF] after:asowp-border-[5px] after:asowp-rounded-full after:asowp-h-2.5 after:asowp-w-2.5 after:asowp-transition-all after:asowp-shadow-lg`"></div>
                            </label>
                        </div>
                    </div>
                    <div class="asowp-space-y-2" v-if="image.enableClipart.active">
                        <label class="asowp-text-[12px] asowp-text-[#444444]">{{ __("Select clipart group", "all-signs-options-pro") }}</label>
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
                <div class="asowp-flex asowp-justify-start asowp-space-x-8 asowp-items-center">
                    <div class="asowp-flex asowp-space-x-3">
                        <div class="asowp-text-[16px]">{{ __("Enable Custom color", "all-signs-options-pro") }}</div>
                        <div class="asowp-flex asowp-items-center asowp-translate-y-0.5">
                            <label for="toggleCustom" class="asowp-relative asowp-inline-flex asowp-items-center asowp-cursor-pointer asowp-border-[1px] asowp-border-solid asowp-border-black asowp-rounded-full">
                                <input id="toggleCustom" type="checkbox" name="toggleCustom" class="asowp-sr-only asowp-peer" v-model="image.enableCustomColor">
                                <div :class="`peer-checked:after:asowp-border-[#016464] peer-checked:after:asowp-border-solid peer-checked:after:asowp-border-[5px] peer-checked:after:asowp-top-[-2px] peer-checked:after:asowp-translate-y-[-15%] asowp-w-10 asowp-h-3 asowp-border asowp-border-[5px] asowp-border-[#016464] asowp-bg-zinc-300 asowp-rounded-full asowp-peer peer-checked:after:asowp-translate-x-[140%] after:asowp-content-[''] after:asowp-absolute after:asowp-top-[-2px] after:asowp-left-[-5px] after:asowp-bg-zinc-300 after:asowp-border-white after:asowp-border-solid after:asowp-translate-y-[-15%] after:asowp-border-[#FFFFFF] after:asowp-border-[5px] after:asowp-rounded-full after:asowp-h-2.5 after:asowp-w-2.5 after:asowp-transition-all after:asowp-shadow-lg`"></div>
                            </label>
                        </div>
                    </div>
                    <div class="asowp-w-3/5 asowp-space-x-2 asowp-flex asowp-items-center" v-if="image.enableCustomColor">
                        <label for="" class="asowp-text-[16px] asowp-text[#444444] asowp-font-normal asowp-w-full">{{ __("Custom Color Preview Image :", "all-signs-options-pro") }} </label>
                        <div class="asowp-flex asowp-flex-col asowp-space-y-2 asowp-w-full asowp-pt-2">
                            <div class="asowp-flex asowp-space-x-2">
                                <button @click="selectColorPrevImage" class="asowp-bg-[#016464] asowp-border-none asowp-w-fit asowp-h-fit asowp-p-4 asowp-rounded asowp-px-4 asowp-text-white asowp-opacity-90 hover:asowp-opacity-100 asowp-text-[10px] asowp-cursor-pointer">{{ __("Upload image", "all-signs-options-pro") }}</button>
                                <div :class="`asowp-relative asowp-w-[82px] asowp-h-[49px] asowp-rounded-md asowp-overflow-hidden`">
                                    <img v-if="image.colorsPrevImg != ''" :src="image.colorsPrevImg" alt="" class="asowp-absolute asowp-w-full asowp-h-full">
                                    <button v-if="image.colorsPrevImg != ''" @click="()=>{image.colorsPrevImg = ''}" :class="`asowp-bg-[#016464] asowp-absolute asowp-bottom-0 asowp-right-0 asowp-text-white asowp-p-1 asowp-rounded-tl-lg asowp-border-none`">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="asowp-w-4 asowp-h-4">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>             
                    </div>
                </div>
                <div class="asowp-space-y-2">
                    <label class="asowp-text-[16px] asowp-font-bold">{{ __("Colors for uploaded svg (only for uploaded images that are svg)", "all-signs-options-pro") }}</label>
                    <div class="asowp-grid asowp-grid-cols-3 asowp-gap-4" v-if="image.colors.length>0">
                        <div class="asowp-flex asowp-justify-start asowp-space-x-2" :key="key" v-for="(color,key) in image.colors">
                            <div class="asowp-w-2/5 asowp-space-y-2 asowp-flex asowp-flex-col">
                                <label for="" class="asowp-text-[12px] asowp-text[#444444] asowp-font-normal">{{ __("Name", "all-signs-options-pro") }}</label>
                                <input type="text" class="asowp-rounded asowp-w-full asowp-h-[30px]" v-model="image.colors[key].name" autocomplete="off"> 
                            </div>
                            <div class="asowp-w-2/5 asowp-space-y-2 asowp-flex asowp-flex-col">
                                <label for="" class="asowp-text-[12px] asowp-text[#444444] asowp-font-normal asowp-invisible">{{ __("Background color", "all-signs-options-pro") }}</label>
                                <div class="asowp-relative asowp-flex">
                                    <input
                                        id="colorPicker"
                                        type="color"
                                        v-model="image.colors[key].codeHex"
                                        @input="(e)=>changeColorCodeHex(e,key)"
                                        class="asowp-w-9 asowp-h-[30px]"
                                    />
                                    <input
                                        type="text"
                                        v-model="image.colors[key].codeHex"
                                        @input="(e)=>changeColorCodeHex(e,key)"
                                        class="asowp-p-1 asowp-text-black asowp-w-full -asowp-translate-y-px"
                                    />
                                </div>
                                
                            </div>
                            <div class="asowp-w-2/5 asowp-space-y-2 asowp-flex asowp-flex-col">
                                <label for="" class="asowp-text-[12px] asowp-text[#444444] asowp-font-normal asowp-invisible">{{ __("Background color", "all-signs-options-pro") }}</label>
                                <div class="asowp-relative asowp-flex">
                                    <button @click="removeColor(key)" class="asowp-w-[50px] asowp-h-full asowp-border-solid asowp-border-red-600 asowp-rounded asowp-bg-red-600 asowp-cursor-pointer asowp-text-white">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="asowp-w-[70%] asowp-h-[70%]">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
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
                            <span class="asowp-font-semibold asowp-text-[16px]">{{ __("Add More Color", "all-signs-options-pro") }}</span>
                        </button>
                    </div>
                </div>
                <div>
                    <div class="asowp-flex asowp-space-x-3">
                        <div class="asowp-text-[16px]">{{ __("Preview scenes", "all-signs-options-pro") }}</div>
                    </div>
                    <div>
                        <div class="asowp-flex asowp-justify-center asowp-items-center asowp-pt-8 asowp-pb-3 asowp-px-8">
                            <div class="asowp-flex asowp-space-x-2">
                                <button  @click="addImage" class="asowp-flex asowp-w-fit asowp-rounded asowp-bg-[#016464] asowp-px-4 asowp-space-x-2 asowp-p-1.5 asowp-border-none asowp-text-white asowp-opacity-90 hover:asowp-opacity-100 asowp-cursor-pointer asowp-h-[40px] asowp-flex asowp-items-center asowp-justify-center">
                                    <svg class="asowp-w-5 asowp-h-5" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g id="plus-lg">
                                        <path id="Vector" fill-rule="evenodd" clip-rule="evenodd" d="M11 2.75C11.1823 2.75 11.3572 2.82243 11.4861 2.95136C11.6151 3.0803 11.6875 3.25516 11.6875 3.4375V10.3125H18.5625C18.7448 10.3125 18.9197 10.3849 19.0486 10.5139C19.1776 10.6428 19.25 10.8177 19.25 11C19.25 11.1823 19.1776 11.3572 19.0486 11.4861C18.9197 11.6151 18.7448 11.6875 18.5625 11.6875H11.6875V18.5625C11.6875 18.7448 11.6151 18.9197 11.4861 19.0486C11.3572 19.1776 11.1823 19.25 11 19.25C10.8177 19.25 10.6428 19.1776 10.5139 19.0486C10.3849 18.9197 10.3125 18.7448 10.3125 18.5625V11.6875H3.4375C3.25516 11.6875 3.0803 11.6151 2.95136 11.4861C2.82243 11.3572 2.75 11.1823 2.75 11C2.75 10.8177 2.82243 10.6428 2.95136 10.5139C3.0803 10.3849 3.25516 10.3125 3.4375 10.3125H10.3125V3.4375C10.3125 3.25516 10.3849 3.0803 10.5139 2.95136C10.6428 2.82243 10.8177 2.75 11 2.75Z" fill="white"/>
                                        </g>
                                    </svg>
                                    <div class="asowp-text-[14px]">
                                        {{ __("Add Preview Scenes", "all-signs-options-pro") }}
                                    </div>
                                </button>
                            </div>
                        </div>
                        <div class="asowp-grid asowp-gap-x-6 asowp-gap-y-1 asowp-grid-cols-5 asowp-px-8 asowp-py-4">
                            <div v-for="(img,index) in image.scenes" :key="index" :class="`asowp-relative asowp-flex asowp-w-[120px] asowp-border asowp-b-white asowp-rounded-md asowp-overflow-hidden`">
                                <div class="asowp-relative asowp-w-[120px] asowp-h-[120px] asowp-object-cover">
                                    <img :src="img" alt="" class="asowp-absolute asowp-w-full asowp-h-full">
                                </div>
                                <button @click="()=>deleteImage(index)"  :class="`asowp-cursor-pointer asowp-border-solid asowp-border-0 asowp-bg-red-500 asowp-absolute asowp-top-0 asowp-right-0 asowp-flex asowp-items-center asowp-justify-center asowp-text-white asowp-w-[25px] asowp-h-[25px] asowp-rounded-md asowp-shadow-zinc-400 asowp-shadow-lg asowp-text-white asowp-font-medium asowp-transition-all asowp-ease-in-out asowp-duration-1000`">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="asowp-w-4 asowp-h-4">
                                        <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm3 10.5a.75.75 0 000-1.5H9a.75.75 0 000 1.5h6z" clip-rule="evenodd" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="asowp-flex asowp-flex-col asowp-w-full asowp-space-y-2">
                    <!-- Titre principal -->
                    <h3 class="asowp-text-sm asowp-font-semibold asowp-text-gray-800">{{ __("Cutlines Settings", "all-signs-options-pro") }}</h3>
                    
                    <!-- Sélection du type de cutline -->
                    <div class="asowp-flex asowp-flex-col asowp-space-y-2">
                        <label for="cutlineType" class="asowp-text-xs asowp-font-medium asowp-text-[#444444]">{{ __("Cutline Type", "all-signs-options-pro") }}</label>
                        <select id="cutlineType" v-model="image.selectedCutline" class="asowp-rounded asowp-border asowp-px-2 asowp-py-1 asowp-h-[30px] asowp-w-full">
                            <option v-for="cutline in cutlines" :key="cutline" :value="cutline">{{ cutline }}</option>
                        </select>
                    </div>
                    
                    <!-- Section First Cutline -->
                    <div class="">
                        <h4 class="asowp-text-sm asowp-font-medium asowp-text-gray-700 asowp-mb-2">{{ __("First Cutline", "all-signs-options-pro") }}</h4>
                        <div class="asowp-flex asowp-space-x-4">
                            <div class="asowp-w-1/2 asowp-space-y-2">
                                <label for="firstBorderSize" class="asowp-text-xs asowp-font-medium asowp-text-[#444444] asowp-block">{{ __("Border Size (px)", "all-signs-options-pro") }}</label>
                                <input 
                                    id="firstBorderSize"
                                    type="number" 
                                    min="0" 
                                    class="asowp-rounded asowp-border asowp-px-2 asowp-py-1 asowp-w-full asowp-h-[30px] focus:asowp-ring-2 focus:asowp-ring-blue-500 focus:asowp-border-transparent" 
                                    v-model="image.cutlines.first.borderSize" 
                                    autocomplete="off"
                                    placeholder="0"
                                > 
                            </div>
                            <div class="asowp-w-1/2 asowp-space-y-2">
                                <label for="firstBorderColor" class="asowp-text-xs asowp-font-medium asowp-text-[#444444] asowp-block">{{ __("Border Color", "all-signs-options-pro") }}</label>
                                <input
                                    id="firstBorderColor"
                                    type="color"
                                    v-model="image.cutlines.first.color"
                                    @input="(e)=>changeColorCodeHex(e,key)"
                                    class="asowp-rounded asowp-border asowp-w-full asowp-h-[30px] asowp-cursor-pointer"
                                />
                            </div>
                        </div>
                    </div>
                    
                    <!-- Section Second Cutline -->
                    <div class="">
                        <h4 class="asowp-text-sm asowp-font-medium asowp-text-gray-700 asowp-mb-2">{{ __("Second Cutline", "all-signs-options-pro") }}</h4>
                        
                        <!-- Row 1: Size et Color entre les cutlines -->
                        <div class="asowp-flex asowp-space-x-4 asowp-mb-2">
                            <div class="asowp-w-1/2 asowp-space-y-2">
                                <label for="secondSize" class="asowp-text-xs asowp-font-medium asowp-text-[#444444] asowp-block">{{ __("Space Between Cutlines (px)", "all-signs-options-pro") }}</label>
                                <input 
                                    id="secondSize"
                                    type="number" 
                                    min="0" 
                                    class="asowp-rounded asowp-border asowp-px-2 asowp-py-1 asowp-w-full asowp-h-[30px] focus:asowp-ring-2 focus:asowp-ring-blue-500 focus:asowp-border-transparent" 
                                    v-model="image.cutlines.second.size" 
                                    autocomplete="off"
                                    placeholder="0"
                                > 
                            </div>
                            <div class="asowp-w-1/2 asowp-space-y-2">
                                <label for="secondSpaceColor" class="asowp-text-xs asowp-font-medium asowp-text-[#444444] asowp-block">{{ __("Space Color", "all-signs-options-pro") }}</label>
                                <input
                                    id="secondSpaceColor"
                                    type="color"
                                    v-model="image.cutlines.second.color"
                                    @input="(e)=>changeColorCodeHex(e,key)"
                                    class="asowp-rounded asowp-border asowp-w-full asowp-h-[30px] asowp-cursor-pointer"
                                />
                            </div>
                        </div>
                        
                        <!-- Row 2: Border Size et Border Color -->
                        <div class="asowp-flex asowp-space-x-4">
                            <div class="asowp-w-1/2 asowp-space-y-2">
                                <label for="secondBorderSize" class="asowp-text-xs asowp-font-medium asowp-text-[#444444] asowp-block">{{ __("Border Size (px)", "all-signs-options-pro") }}</label>
                                <input 
                                    id="secondBorderSize"
                                    type="number" 
                                    min="0" 
                                    class="asowp-rounded asowp-border asowp-px-2 asowp-py-1 asowp-w-full asowp-h-[30px] focus:asowp-ring-2 focus:asowp-ring-blue-500 focus:asowp-border-transparent" 
                                    v-model="image.cutlines.second.borderSize" 
                                    autocomplete="off"
                                    placeholder="0"
                                > 
                            </div>
                            <div class="asowp-w-1/2 asowp-space-y-2">
                                <label for="secondBorderColor" class="asowp-text-xs asowp-font-medium asowp-text-[#444444] asowp-block">{{ __("Border Color", "all-signs-options-pro") }}</label>
                                <input
                                    id="secondBorderColor"
                                    type="color"
                                    v-model="image.cutlines.second.borderColor"
                                    @input="(e)=>changeColorCodeHex(e,key)"
                                    class="asowp-rounded asowp-border asowp-w-full asowp-h-[30px] asowp-cursor-pointer"
                                /> 
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div class="asowp-flex asowp-space-x-3">
                        <div class="asowp-text-[16px]">{{ __("Filter", "all-signs-options-pro") }}</div>
                        <div class="asowp-flex asowp-items-center asowp-translate-y-0.5">
                            <label for="toggleEnableFilter" class="asowp-relative asowp-inline-flex asowp-items-center asowp-cursor-pointer asowp-border-[1px] asowp-border-solid asowp-border-black asowp-rounded-full">
                                <input id="toggleEnableFilter" type="checkbox" name="toggleEnableFilter" class="asowp-sr-only asowp-peer" v-model="image.filter.active">
                                <div :class="`peer-checked:after:asowp-border-[#016464] peer-checked:after:asowp-border-solid peer-checked:after:asowp-border-[5px] peer-checked:after:asowp-top-[-2px] peer-checked:after:asowp-translate-y-[-15%] asowp-w-10 asowp-h-3 asowp-border asowp-border-[5px] asowp-border-[#016464] asowp-bg-zinc-300 asowp-rounded-full asowp-peer peer-checked:after:asowp-translate-x-[140%] after:asowp-content-[''] after:asowp-absolute after:asowp-top-[-2px] after:asowp-left-[-5px] after:asowp-bg-zinc-300 after:asowp-border-white after:asowp-border-solid after:asowp-translate-y-[-15%] after:asowp-border-[#FFFFFF] after:asowp-border-[5px] after:asowp-rounded-full after:asowp-h-2.5 after:asowp-w-2.5 after:asowp-transition-all after:asowp-shadow-lg`"></div>
                            </label>
                        </div>
                    </div>
                </div>
                <div class="asowp-flex asowp-space-x-6" v-if="image.filter.active">
                    <div class="asowp-text-center asowp-space-x-2 asowp-space-y-1 asowp-flex">
                        <div>
                            <button class="asowp-bg-transparent asowp-cursor-pointer asowp-border asowp-border-solid asowp-border-[1px] asowp-border-[#BBBBBB] asowp-w-fit asowp-h-fit asowp-px-1 asowp-py-0.5">
                                <svg class="asowp-w-4 asowp-h-4" viewBox="0 0 12 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10 11V9H11.61C11.85 9.71 12 10.39 12 11H10ZM9.58 5C9.12 4.29 8.65 3.61 8.2 3H8V5H9.58ZM10 9V7H8V9H10ZM10 5.68V7H10.74C10.5 6.56 10.26 6.11 10 5.68ZM6 13V11H8V9H6V7H8V5H6V3H8V2.73C6.9 1.26 6 0.25 6 0.25C6 0.25 0 7 0 11C0 14.31 2.69 17 6 17V15H8V13H6ZM8 16.65C8.75 16.39 9.42 16 10 15.46V15H8V16.65ZM8 13H10V11H8V13ZM10 15H10.46C11 14.42 11.39 13.75 11.65 13H10V15Z" fill="black"/>
                                </svg>
                            </button>
                            <div class="asowp-text-[10px] asowp-text-[#3D3D3D] -asowp-translate-y-0.5 asowp-px-0.5">{{ __("Greyscale", "all-signs-options-pro") }}</div>
                        </div>
                        <div class="asowp-flex asowp-items-center -asowp-translate-y-3">
                            <label for="toggleEnableGreyscale" class="asowp-relative asowp-inline-flex asowp-items-center asowp-cursor-pointer asowp-border-[1px] asowp-border-solid asowp-border-black asowp-rounded-full">
                                <input id="toggleEnableGreyscale" type="checkbox" name="toggleEnableGreyscale" class="asowp-sr-only asowp-peer" v-model="image.filter.enableGreyscale">
                                <div :class="`peer-checked:after:asowp-border-[#016464] peer-checked:after:asowp-border-solid peer-checked:after:asowp-border-[5px] peer-checked:after:asowp-top-[-2px] peer-checked:after:asowp-translate-y-[-15%] asowp-w-10 asowp-h-3 asowp-border asowp-border-[5px] asowp-border-[#016464] asowp-bg-zinc-300 asowp-rounded-full asowp-peer peer-checked:after:asowp-translate-x-[140%] after:asowp-content-[''] after:asowp-absolute after:asowp-top-[-2px] after:asowp-left-[-5px] after:asowp-bg-zinc-300 after:asowp-border-white after:asowp-border-solid after:asowp-translate-y-[-15%] after:asowp-border-[#FFFFFF] after:asowp-border-[5px] after:asowp-rounded-full after:asowp-h-2.5 after:asowp-w-2.5 after:asowp-transition-all after:asowp-shadow-lg`"></div>
                            </label>
                        </div>

                    </div>
                    <div class="asowp-text-center asowp-space-y-1 asowp-space-x-3 asowp-flex asowp-flex-wrap">
                        <div>
                            <button class="asowp-bg-transparent asowp-cursor-pointer asowp-border asowp-border-solid asowp-border-[1px] asowp-border-[#BBBBBB] asowp-w-fit asowp-h-fit asowp-px-1 asowp-py-0.5">
                                <svg class="asowp-w-4 asowp-h-4" viewBox="0 0 12 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10 11V9H11.61C11.85 9.71 12 10.39 12 11H10ZM9.58 5C9.12 4.29 8.65 3.61 8.2 3H8V5H9.58ZM10 9V7H8V9H10ZM10 5.68V7H10.74C10.5 6.56 10.26 6.11 10 5.68ZM6 13V11H8V9H6V7H8V5H6V3H8V2.73C6.9 1.26 6 0.25 6 0.25C6 0.25 0 7 0 11C0 14.31 2.69 17 6 17V15H8V13H6ZM8 16.65C8.75 16.39 9.42 16 10 15.46V15H8V16.65ZM8 13H10V11H8V13ZM10 15H10.46C11 14.42 11.39 13.75 11.65 13H10V15Z" fill="black"/>
                                </svg>
                            </button>
                            <div class="asowp-text-[10px] asowp-text-[#3D3D3D] -asowp-translate-y-0.5 asowp-px-0.5">{{ __("Opacity", "all-signs-options-pro") }}</div>
                        </div>
                        <div class="asowp-flex asowp-items-center -asowp-translate-y-3">
                            <label for="toggleEnableOpacity" class="asowp-relative asowp-inline-flex asowp-items-center asowp-cursor-pointer asowp-border-[1px] asowp-border-solid asowp-border-black asowp-rounded-full">
                                <input id="toggleEnableOpacity" type="checkbox" name="toggleEnableOpacity" class="asowp-sr-only asowp-peer" v-model="image.filter.enableOpacity">
                                <div :class="`peer-checked:after:asowp-border-[#016464] peer-checked:after:asowp-border-solid peer-checked:after:asowp-border-[5px] peer-checked:after:asowp-top-[-2px] peer-checked:after:asowp-translate-y-[-15%] asowp-w-10 asowp-h-3 asowp-border asowp-border-[5px] asowp-border-[#016464] asowp-bg-zinc-300 asowp-rounded-full asowp-peer peer-checked:after:asowp-translate-x-[140%] after:asowp-content-[''] after:asowp-absolute after:asowp-top-[-2px] after:asowp-left-[-5px] after:asowp-bg-zinc-300 after:asowp-border-white after:asowp-border-solid after:asowp-translate-y-[-15%] after:asowp-border-[#FFFFFF] after:asowp-border-[5px] after:asowp-rounded-full after:asowp-h-2.5 after:asowp-w-2.5 after:asowp-transition-all after:asowp-shadow-lg`"></div>
                            </label>
                        </div>
                    </div>
                    <div class="asowp-text-center asowp-space-y-1 asowp-space-x-3 asowp-flex">
                        <div>
                            <button class="asowp-bg-transparent asowp-cursor-pointer asowp-border asowp-border-solid asowp-border-[1px] asowp-border-[#BBBBBB] asowp-w-fit asowp-h-fit asowp-px-1 asowp-py-0.5">
                                <svg class="asowp-w-4 asowp-h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11.9995 5.00001C10.7051 5.00009 9.43008 5.31425 8.28382 5.91552C7.13756 6.51679 6.15432 7.38722 5.41847 8.4521C4.68263 9.51698 4.21616 10.7445 4.05911 12.0293C3.90205 13.3142 4.0591 14.6179 4.51677 15.8287C4.97445 17.0394 5.71907 18.1211 6.68675 18.9808C7.65442 19.8404 8.81625 20.4525 10.0725 20.7643C11.3288 21.0762 12.6419 21.0786 13.8993 20.7713C15.1567 20.464 16.3207 19.8562 17.2915 19H11.9995V18H18.2445C18.4975 17.685 18.7265 17.351 18.9295 17H11.9995V16H19.4185C19.5501 15.6743 19.6601 15.3402 19.7475 15H11.9995V14H19.9375C19.9789 13.6683 19.9996 13.3343 19.9995 13H11.9995V12H19.9375C19.8956 11.663 19.8321 11.329 19.7475 11H11.9995V10H19.4185C19.2787 9.65566 19.1149 9.32151 18.9285 9.00001H11.9995V8.00001H18.2445C17.9561 7.63996 17.6373 7.30539 17.2915 7.00001H11.9995V6.00001H15.8755C14.6897 5.34212 13.3556 4.99791 11.9995 5.00001Z" fill="black"/>
                                </svg>
                            </button>
                            <div class="asowp-text-[10px] asowp-text-[#3D3D3D] -asowp-translate-y-0.5 asowp-px-0.5">{{ __("Blur", "all-signs-options-pro") }}</div>
                        </div>
                        <div class="asowp-flex asowp-items-center -asowp-translate-y-3">
                            <label for="toggleEnableBlur" class="asowp-relative asowp-inline-flex asowp-items-center asowp-cursor-pointer asowp-border-[1px] asowp-border-solid asowp-border-black asowp-rounded-full">
                                <input id="toggleEnableBlur" type="checkbox" name="toggleEnableBlur" class="asowp-sr-only asowp-peer" v-model="image.filter.enableBlur">
                                <div :class="`peer-checked:after:asowp-border-[#016464] peer-checked:after:asowp-border-solid peer-checked:after:asowp-border-[5px] peer-checked:after:asowp-top-[-2px] peer-checked:after:asowp-translate-y-[-15%] asowp-w-10 asowp-h-3 asowp-border asowp-border-[5px] asowp-border-[#016464] asowp-bg-zinc-300 asowp-rounded-full asowp-peer peer-checked:after:asowp-translate-x-[140%] after:asowp-content-[''] after:asowp-absolute after:asowp-top-[-2px] after:asowp-left-[-5px] after:asowp-bg-zinc-300 after:asowp-border-white after:asowp-border-solid after:asowp-translate-y-[-15%] after:asowp-border-[#FFFFFF] after:asowp-border-[5px] after:asowp-rounded-full after:asowp-h-2.5 after:asowp-w-2.5 after:asowp-transition-all after:asowp-shadow-lg`"></div>
                            </label>
                        </div>
                    </div>
                    <div class="asowp-text-center asowp-space-y-1 asowp-space-x-3 asowp-flex">
                        <div>
                            <button class="asowp-bg-transparent asowp-cursor-pointer asowp-border asowp-border-solid asowp-border-[1px] asowp-border-[#BBBBBB] asowp-w-fit asowp-h-fit asowp-px-1 asowp-py-0.5">
                                <img class="asowp-w-4 asowp-h-4" src="../../../../../../assets/icons/ic_triangle.svg" alt="">
                            </button>
                            <div class="asowp-text-[10px] asowp-text-[#3D3D3D] -asowp-translate-y-0.5 asowp-px-0.5">{{ __("Sepia", "all-signs-options-pro") }}</div>
                        </div>
                        <div class="asowp-flex asowp-items-center -asowp-translate-y-3">
                            <label for="toggleEnableSepia" class="asowp-relative asowp-inline-flex asowp-items-center asowp-cursor-pointer asowp-border-[1px] asowp-border-solid asowp-border-black asowp-rounded-full">
                                <input id="toggleEnableSepia" type="checkbox" name="toggleEnableSepia" class="asowp-sr-only asowp-peer" v-model="image.filter.enableSepia">
                                <div :class="`peer-checked:after:asowp-border-[#016464] peer-checked:after:asowp-border-solid peer-checked:after:asowp-border-[5px] peer-checked:after:asowp-top-[-2px] peer-checked:after:asowp-translate-y-[-15%] asowp-w-10 asowp-h-3 asowp-border asowp-border-[5px] asowp-border-[#016464] asowp-bg-zinc-300 asowp-rounded-full asowp-peer peer-checked:after:asowp-translate-x-[140%] after:asowp-content-[''] after:asowp-absolute after:asowp-top-[-2px] after:asowp-left-[-5px] after:asowp-bg-zinc-300 after:asowp-border-white after:asowp-border-solid after:asowp-translate-y-[-15%] after:asowp-border-[#FFFFFF] after:asowp-border-[5px] after:asowp-rounded-full after:asowp-h-2.5 after:asowp-w-2.5 after:asowp-transition-all after:asowp-shadow-lg`"></div>
                            </label>
                        </div>
                    </div>
                    <div class="asowp-text-center asowp-space-y-1 asowp-space-x-3 asowp-flex">
                        <div>
                            <button class="asowp-bg-transparent asowp-cursor-pointer asowp-border asowp-border-solid asowp-border-[1px] asowp-border-[#BBBBBB] asowp-w-fit asowp-h-fit asowp-px-1 asowp-py-0.5">
                                <img class="asowp-w-4 asowp-h-4" src="../../../../../../assets/icons/ic_triangle.svg" alt="">
                            </button>
                            <div class="asowp-text-[10px] asowp-text-[#3D3D3D] -asowp-translate-y-0.5 asowp-px-0.5">{{ __("sharpen", "all-signs-options-pro") }}</div>
                        </div>
                        <div class="asowp-flex asowp-items-center -asowp-translate-y-3">
                            <label for="toggleEnableSharpen" class="asowp-relative asowp-inline-flex asowp-items-center asowp-cursor-pointer asowp-border-[1px] asowp-border-solid asowp-border-black asowp-rounded-full">
                                <input id="toggleEnableSharpen" type="checkbox" name="toggleEnableSharpen" class="asowp-sr-only asowp-peer" v-model="image.filter.enableSharpen">
                                <div :class="`peer-checked:after:asowp-border-[#016464] peer-checked:after:asowp-border-solid peer-checked:after:asowp-border-[5px] peer-checked:after:asowp-top-[-2px] peer-checked:after:asowp-translate-y-[-15%] asowp-w-10 asowp-h-3 asowp-border asowp-border-[5px] asowp-border-[#016464] asowp-bg-zinc-300 asowp-rounded-full asowp-peer peer-checked:after:asowp-translate-x-[140%] after:asowp-content-[''] after:asowp-absolute after:asowp-top-[-2px] after:asowp-left-[-5px] after:asowp-bg-zinc-300 after:asowp-border-white after:asowp-border-solid after:asowp-translate-y-[-15%] after:asowp-border-[#FFFFFF] after:asowp-border-[5px] after:asowp-rounded-full after:asowp-h-2.5 after:asowp-w-2.5 after:asowp-transition-all after:asowp-shadow-lg`"></div>
                            </label>
                        </div>
                    </div>
                    <div class="asowp-text-center asowp-space-y-1 asowp-space-x-3 asowp-flex">
                        <div>
                            <button class="asowp-bg-transparent asowp-cursor-pointer asowp-border asowp-border-solid asowp-border-[1px] asowp-border-[#BBBBBB] asowp-w-fit asowp-h-fit asowp-px-1 asowp-py-0.5">
                                <img class="asowp-w-4 asowp-h-4" src="../../../../../../assets/icons/ic_triangle.svg" alt="">
                            </button>
                            <div class="asowp-text-[10px] asowp-text-[#3D3D3D] -asowp-translate-y-0.5 asowp-px-0.5">{{ __("Emboss", "all-signs-options-pro") }}</div>
                        </div>
                        <div class="asowp-flex asowp-items-center -asowp-translate-y-3">
                            <label for="toggleEnableEmbross" class="asowp-relative asowp-inline-flex asowp-items-center asowp-cursor-pointer asowp-border-[1px] asowp-border-solid asowp-border-black asowp-rounded-full">
                                <input id="toggleEnableEmbross" type="checkbox" name="toggleEnableEmbross" class="asowp-sr-only asowp-peer" v-model="image.filter.enableEmbross">
                                <div :class="`peer-checked:after:asowp-border-[#016464] peer-checked:after:asowp-border-solid peer-checked:after:asowp-border-[5px] peer-checked:after:asowp-top-[-2px] peer-checked:after:asowp-translate-y-[-15%] asowp-w-10 asowp-h-3 asowp-border asowp-border-[5px] asowp-border-[#016464] asowp-bg-zinc-300 asowp-rounded-full asowp-peer peer-checked:after:asowp-translate-x-[140%] after:asowp-content-[''] after:asowp-absolute after:asowp-top-[-2px] after:asowp-left-[-5px] after:asowp-bg-zinc-300 after:asowp-border-white after:asowp-border-solid after:asowp-translate-y-[-15%] after:asowp-border-[#FFFFFF] after:asowp-border-[5px] after:asowp-rounded-full after:asowp-h-2.5 after:asowp-w-2.5 after:asowp-transition-all after:asowp-shadow-lg`"></div>
                            </label>
                        </div>
                    </div>
                    <div class="asowp-text-center asowp-space-y-1 asowp-space-x-3 asowp-flex">
                        <!-- Greenify -->
                        <div>
                            <button class="asowp-bg-transparent asowp-cursor-pointer asowp-border asowp-border-solid asowp-border-[1px] asowp-border-[#BBBBBB] asowp-w-fit asowp-h-fit asowp-px-1 asowp-py-0.5">
                                <img class="asowp-w-4 asowp-h-4" src="../../../../../../assets/icons/ic_triangle.svg" alt="">
                            </button>
                            <div class="asowp-text-[10px] asowp-text-[#3D3D3D] -asowp-translate-y-0.5 asowp-px-0.5">{{ __("Greenify", "all-signs-options-pro") }}</div>
                        </div>
                        <div class="asowp-flex asowp-items-center -asowp-translate-y-3">
                            <label for="toggleEnableGreenify" class="asowp-relative asowp-inline-flex asowp-items-center asowp-cursor-pointer asowp-border-[1px] asowp-border-solid asowp-border-black asowp-rounded-full">
                                <input id="toggleEnableGreenify" type="checkbox" name="toggleEnableGreenify" class="asowp-sr-only asowp-peer" v-model="image.filter.enableGreenify">
                                <div :class="`peer-checked:after:asowp-border-[#016464] peer-checked:after:asowp-border-solid peer-checked:after:asowp-border-[5px] peer-checked:after:asowp-top-[-2px] peer-checked:after:asowp-translate-y-[-15%] asowp-w-10 asowp-h-3 asowp-border asowp-border-[5px] asowp-border-[#016464] asowp-bg-zinc-300 asowp-rounded-full asowp-peer peer-checked:after:asowp-translate-x-[140%] after:asowp-content-[''] after:asowp-absolute after:asowp-top-[-2px] after:asowp-left-[-5px] after:asowp-bg-zinc-300 after:asowp-border-white after:asowp-border-solid after:asowp-translate-y-[-15%] after:asowp-border-[#FFFFFF] after:asowp-border-[5px] after:asowp-rounded-full after:asowp-h-2.5 after:asowp-w-2.5 after:asowp-transition-all after:asowp-shadow-lg`"></div>
                            </label>
                        </div>

                        <!-- Pinkify -->
                        <div>
                            <button class="asowp-bg-transparent asowp-cursor-pointer asowp-border asowp-border-solid asowp-border-[1px] asowp-border-[#BBBBBB] asowp-w-fit asowp-h-fit asowp-px-1 asowp-py-0.5">
                                <img class="asowp-w-4 asowp-h-4" src="../../../../../../assets/icons/ic_triangle.svg" alt="">
                            </button>
                            <div class="asowp-text-[10px] asowp-text-[#3D3D3D] -asowp-translate-y-0.5 asowp-px-0.5">{{ __("Pinkify", "all-signs-options-pro") }}</div>
                        </div>
                        <div class="asowp-flex asowp-items-center -asowp-translate-y-3">
                            <label for="toggleEnablePinkify" class="asowp-relative asowp-inline-flex asowp-items-center asowp-cursor-pointer asowp-border-[1px] asowp-border-solid asowp-border-black asowp-rounded-full">
                                <input id="toggleEnablePinkify" type="checkbox" name="toggleEnablePinkify" class="asowp-sr-only asowp-peer" v-model="image.filter.enablePinkify">
                                <div :class="`peer-checked:after:asowp-border-[#016464] peer-checked:after:asowp-border-solid peer-checked:after:asowp-border-[5px] peer-checked:after:asowp-top-[-2px] peer-checked:after:asowp-translate-y-[-15%] asowp-w-10 asowp-h-3 asowp-border asowp-border-[5px] asowp-border-[#016464] asowp-bg-zinc-300 asowp-rounded-full asowp-peer peer-checked:after:asowp-translate-x-[140%] after:asowp-content-[''] after:asowp-absolute after:asowp-top-[-2px] after:asowp-left-[-5px] after:asowp-bg-zinc-300 after:asowp-border-white after:asowp-border-solid after:asowp-translate-y-[-15%] after:asowp-border-[#FFFFFF] after:asowp-border-[5px] after:asowp-rounded-full after:asowp-h-2.5 after:asowp-w-2.5 after:asowp-transition-all after:asowp-shadow-lg`"></div>
                            </label>
                        </div>

                        <!-- Orangeify -->
                        <div>
                            <button class="asowp-bg-transparent asowp-cursor-pointer asowp-border asowp-border-solid asowp-border-[1px] asowp-border-[#BBBBBB] asowp-w-fit asowp-h-fit asowp-px-1 asowp-py-0.5">
                                <img class="asowp-w-4 asowp-h-4" src="../../../../../../assets/icons/ic_triangle.svg" alt="">
                            </button>
                            <div class="asowp-text-[10px] asowp-text-[#3D3D3D] -asowp-translate-y-0.5 asowp-px-0.5">{{ __("Orangeify", "all-signs-options-pro") }}</div>
                        </div>
                        <div class="asowp-flex asowp-items-center -asowp-translate-y-3">
                            <label for="toggleEnableOrangeify" class="asowp-relative asowp-inline-flex asowp-items-center asowp-cursor-pointer asowp-border-[1px] asowp-border-solid asowp-border-black asowp-rounded-full">
                                <input id="toggleEnableOrangeify" type="checkbox" name="toggleEnableOrangeify" class="asowp-sr-only asowp-peer" v-model="image.filter.enableOrangeify">
                                <div :class="`peer-checked:after:asowp-border-[#016464] peer-checked:after:asowp-border-solid peer-checked:after:asowp-border-[5px] peer-checked:after:asowp-top-[-2px] peer-checked:after:asowp-translate-y-[-15%] asowp-w-10 asowp-h-3 asowp-border asowp-border-[5px] asowp-border-[#016464] asowp-bg-zinc-300 asowp-rounded-full asowp-peer peer-checked:after:asowp-translate-x-[140%] after:asowp-content-[''] after:asowp-absolute after:asowp-top-[-2px] after:asowp-left-[-5px] after:asowp-bg-zinc-300 after:asowp-border-white after:asowp-border-solid after:asowp-translate-y-[-15%] after:asowp-border-[#FFFFFF] after:asowp-border-[5px] after:asowp-rounded-full after:asowp-h-2.5 after:asowp-w-2.5 after:asowp-transition-all after:asowp-shadow-lg`"></div>
                            </label>
                        </div>

                        <!-- Blueify -->
                        <div>
                            <button class="asowp-bg-transparent asowp-cursor-pointer asowp-border asowp-border-solid asowp-border-[1px] asowp-border-[#BBBBBB] asowp-w-fit asowp-h-fit asowp-px-1 asowp-py-0.5">
                                <img class="asowp-w-4 asowp-h-4" src="../../../../../../assets/icons/ic_triangle.svg" alt="">
                            </button>
                            <div class="asowp-text-[10px] asowp-text-[#3D3D3D] -asowp-translate-y-0.5 asowp-px-0.5">{{ __("Blueify", "all-signs-options-pro") }}</div>
                        </div>
                        <div class="asowp-flex asowp-items-center -asowp-translate-y-3">
                            <label for="toggleEnableBlueify" class="asowp-relative asowp-inline-flex asowp-items-center asowp-cursor-pointer asowp-border-[1px] asowp-border-solid asowp-border-black asowp-rounded-full">
                                <input id="toggleEnableBlueify" type="checkbox" name="toggleEnableBlueify" class="asowp-sr-only asowp-peer" v-model="image.filter.enableBlueify">
                                <div :class="`peer-checked:after:asowp-border-[#016464] peer-checked:after:asowp-border-solid peer-checked:after:asowp-border-[5px] peer-checked:after:asowp-top-[-2px] peer-checked:after:asowp-translate-y-[-15%] asowp-w-10 asowp-h-3 asowp-border asowp-border-[5px] asowp-border-[#016464] asowp-bg-zinc-300 asowp-rounded-full asowp-peer peer-checked:after:asowp-translate-x-[140%] after:asowp-content-[''] after:asowp-absolute after:asowp-top-[-2px] after:asowp-left-[-5px] after:asowp-bg-zinc-300 after:asowp-border-white after:asowp-border-solid after:asowp-translate-y-[-15%] after:asowp-border-[#FFFFFF] after:asowp-border-[5px] after:asowp-rounded-full after:asowp-h-2.5 after:asowp-w-2.5 after:asowp-transition-all after:asowp-shadow-lg`"></div>
                            </label>
                        </div>
                    </div>
                    
                    
                </div>
            </div>
        </div>
        <div class="asowp-bg-[#F8F9FB] asowp-flex asowp-space-x-4 asowp-px-4 asowp-py-3 asowp-justify-end asowp-items-end asowp-translate-y-12">
            <div class="asowp-bg-[#016464] asowp-rounded">
                <button :disabled="isLoading" @click="updateImageSettings" class="asowp-rounded asowp-flex asowp-bg-transparent asowp-w-fit asowp-space-x-2 asowp-h-fit asowp-text-white asowp-px-12 asowp-p-2.5 asowp-border-none asowp-opacity-90 hover:asowp-opacity-100 hover:asowp-border-none hover:asowp-text-white hover:asowp-bg-[#016464] asowp-cursor-pointerasowp-flex asowp-bg-transparent asowp-w-fit asowp-space-x-2 asowp-h-fit asowp-text-white asowp-px-12 asowp-p-2.5 asowp-border-none asowp-opacity-90 hover:asowp-opacity-100 hover:asowp-border-none hover:asowp-text-white hover:asowp-bg-[#016464] asowp-cursor-pointer">
                    <img src="../../../../../../assets/icons/ic_loading_gray.svg" class="asowp-w-5 asowp-w-5" v-if="isLoading" />
                    <div class="asowp-font-semibold asowp-text-[16px]">{{ __("Save", "all-signs-options-pro") }}</div>
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
import { __, _x, _n, _nx, sprintf, setLocaleData } from "@wordpress/i18n";
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
    selectedCutline:'none',
    "cutlines": {
        first: {
            borderSize: 4,
            color: '#FFF10E'
        },
        second: {
            color: '#5EEC92',
            size: 10,
            borderColor: '#4A65F9',
            borderSize: 4
        }
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
        "enableGreenify":false,
        "enablePinkify":false,
        "enableOrangeify":false,
        "enableBlueify":false
    },
    colors:[],
    scenes:[]
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

const cutlines = ['none', '1x', '2x'];


const selectColorPrevImage = async(e) => { 
    e.preventDefault();
    var uploader = wp.media(
        {
            title: __("Select Custom Svg Color Preview Image","all-signs-options-pro"),
            button: {
                text: __("Select Image","all-signs-options-pro")
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
const addImage = () => {
    var uploader = wp.media(
            {
                title: __("Please set the picture", "all-signs-options-pro"),
                button: {
                    text: __("Select picture(s)", "all-signs-options-pro")
                },
                multiple: true
            }
        )
        .on(
            'select',
            function () {
                var selection = uploader.state().get( 'selection' );
                selection.map(
                    function (attachment) {
                        attachment = attachment.toJSON();
                        if(attachment.type == 'image'){
                            if(image.value.scenes){
                                if(!image.value.scenes.includes(attachment.url)){
                                    image.value.scenes.push(attachment.url);
                                }
                            }else{
                                image.value.scenes.push(attachment.url);
                            }
                        }
                    }
                );
            }
        )
        .open();
}
const deleteImage = (index) => {
    image.value.scenes.splice(index,1);
}

</script>
