<template>
    <div class="ascwo-space-y-2 ascwo-translate-y-10">
        <div class="">
            <div class="ascwo-bg-[#F8F9FB] ascwo-border-solid ascwo-border-[1px] ascwo-border-t-0 ascwo-border-[#DDDDDD] ascwo-px-8">
                <div class="ascwo-grid ascwo-grid-cols-3 ascwo-gap-4 ascwo-py-4">   
                    <div class="ascwo-flex ascwo-flex-col ascwo-space-y-2">
                        <label class="ascwo-text-[12px] ascwo-text-[#444444]">{{ __('Reset all', 'all-signs-customizer-for-woocommerce-pro') }}</label>
                        <div class="ascwo-flex ascwo-w-full ascwo-space-x-2">
                            <button @click="selectResetAllIcon" class="ascwo-bg-[#016464] ascwo-border-none ascwo-w-fit ascwo-h-fit ascwo-p-4 ascwo-rounded ascwo-px-4 ascwo-text-white ascwo-opacity-90 hover:ascwo-opacity-100 ascwo-text-[10px] ascwo-cursor-pointer">{{ __('Upload Icon', 'all-signs-customizer-for-woocommerce-pro') }}</button>
                            <div :class="`ascwo-relative ascwo-w-[82px] ascwo-h-[49px] ascwo-rounded-md ascwo-overflow-hidden`">
                                <img v-if="images.resetAllIcon != ''" :src="images.resetAllIcon" alt="" class="ascwo-absolute ascwo-w-full ascwo-h-full">
                                <button v-if="images.resetAllIcon != ''" @click="()=>{images.resetAllIcon = ''}" :class="`ascwo-bg-[#016464] ascwo-absolute ascwo-bottom-0 ascwo-right-0 ascwo-text-white ascwo-p-1 ascwo-rounded-tl-lg ascwo-border-none ascwo-cursor-pointer`">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="ascwo-w-4 ascwo-h-4">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                    </div>
                    <div class="ascwo-flex ascwo-flex-col ascwo-space-y-2 ascwo-text-[11px] ascwo-text-[#444444]">
                        <label class="">{{ __('Change Undo Icon', 'all-signs-customizer-for-woocommerce-pro') }}</label>
                        <div class="ascwo-w-full ascwo-flex ascwo-space-x-2">
                            <button @click="selectUndoIcon" class="ascwo-bg-[#016464] ascwo-border-none ascwo-w-fit ascwo-h-fit ascwo-p-4 ascwo-rounded ascwo-px-4 ascwo-text-white ascwo-opacity-90 hover:ascwo-opacity-100 ascwo-text-[10px] ascwo-cursor-pointer">{{ __('Upload Icon', 'all-signs-customizer-for-woocommerce-pro') }}</button>
                            <div :class="`ascwo-relative ascwo-w-[82px] ascwo-h-[49px] ascwo-rounded-md ascwo-overflow-hidden`">
                                <img v-if="images.undoIcon != ''" :src="images.undoIcon" alt="" class="ascwo-absolute ascwo-w-full ascwo-h-full">
                                <button v-if="images.undoIcon != ''" @click="()=>{images.undoIcon = ''}" :class="`ascwo-bg-[#016464] ascwo-absolute ascwo-bottom-0 ascwo-right-0 ascwo-text-white ascwo-p-1 ascwo-rounded-tl-lg ascwo-border-none ascwo-cursor-pointer`">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="ascwo-w-4 ascwo-h-4">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="ascwo-flex ascwo-flex-col ascwo-space-y-2 ascwo-text-[11px] ascwo-text-[#444444]">
                        <label class="">{{ __('Change Redo Icon', 'all-signs-customizer-for-woocommerce-pro') }}</label>
                        <div class="ascwo-w-full ascwo-flex ascwo-space-x-2">
                            <button @click="selectRedoIcon" class="ascwo-bg-[#016464] ascwo-border-none ascwo-w-fit ascwo-h-fit ascwo-p-4 ascwo-rounded ascwo-px-4 ascwo-text-white ascwo-opacity-90 hover:ascwo-opacity-100 ascwo-text-[10px] ascwo-cursor-pointer">{{ __('Upload Icon', 'all-signs-customizer-for-woocommerce-pro') }}</button>
                            <div :class="`ascwo-relative ascwo-w-[82px] ascwo-h-[49px] ascwo-rounded-md ascwo-overflow-hidden`">
                                <img v-if="images.redoIcon != ''" :src="images.redoIcon" alt="" class="ascwo-absolute ascwo-w-full ascwo-h-full">
                                <button v-if="images.redoIcon != ''" @click="()=>{images.redoIcon = ''}" :class="`ascwo-bg-[#016464] ascwo-absolute ascwo-bottom-0 ascwo-right-0 ascwo-text-white ascwo-p-1 ascwo-rounded-tl-lg ascwo-border-none ascwo-cursor-pointer`">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="ascwo-w-4 ascwo-h-4">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="ascwo-flex ascwo-flex-col ascwo-w-full ascwo-space-y-2 ascwo-text-[11px] ascwo-text-[#444444">
                        <label class="">{{ __('Change icon Preview', 'all-signs-customizer-for-woocommerce-pro') }}</label>
                        <div class="ascwo-w-full ascwo-flex ascwo-space-x-2">
                            <button @click="selectChangeIconPreview" class="ascwo-bg-[#016464] ascwo-border-none ascwo-w-fit ascwo-h-fit ascwo-p-4 ascwo-rounded ascwo-px-4 ascwo-text-white ascwo-opacity-90 hover:ascwo-opacity-100 ascwo-text-[10px] ascwo-cursor-pointer">{{ __('Upload Icon', 'all-signs-customizer-for-woocommerce-pro') }}</button>
                            <div :class="`ascwo-relative ascwo-w-[82px] ascwo-h-[49px] ascwo-rounded-md ascwo-overflow-hidden`">
                                <img v-if="images.changeIconPreview != ''" :src="images.changeIconPreview" alt="" class="ascwo-absolute ascwo-w-full ascwo-h-full">
                                <button v-if="images.changeIconPreview != ''" @click="()=>{images.changeIconPreview = ''}" :class="`ascwo-bg-[#016464] ascwo-absolute ascwo-bottom-0 ascwo-right-0 ascwo-text-white ascwo-p-1 ascwo-rounded-tl-lg ascwo-border-none ascwo-cursor-pointer`">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="ascwo-w-4 ascwo-h-4">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="ascwo-flex ascwo-flex-col ascwo-w-full ascwo-space-y-2 ascwo-text-[11px] ascwo-text-[#444444">
                        <label class="">{{ __('Change icon Help', 'all-signs-customizer-for-woocommerce-pro') }}</label>
                        <div class="ascwo-w-full ascwo-flex ascwo-space-x-2">
                            <button @click="selectChangeIconHelp" class="ascwo-bg-[#016464] ascwo-border-none ascwo-w-fit ascwo-h-fit ascwo-p-4 ascwo-rounded ascwo-px-4 ascwo-text-white ascwo-opacity-90 hover:ascwo-opacity-100 ascwo-text-[10px] ascwo-cursor-pointer">{{ __('Upload Icon', 'all-signs-customizer-for-woocommerce-pro') }}</button>
                            <div :class="`ascwo-relative ascwo-w-[82px] ascwo-h-[49px] ascwo-rounded-md ascwo-overflow-hidden`">
                                <img v-if="images.changeIconHelp != ''" :src="images.changeIconHelp" alt="" class="ascwo-absolute ascwo-w-full ascwo-h-full">
                                <button v-if="images.changeIconHelp != ''" @click="()=>{images.changeIconHelp = ''}" :class="`ascwo-bg-[#016464] ascwo-absolute ascwo-bottom-0 ascwo-right-0 ascwo-text-white ascwo-p-1 ascwo-rounded-tl-lg ascwo-border-none ascwo-cursor-pointer`">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="ascwo-w-4 ascwo-h-4">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="ascwo-flex ascwo-flex-col ascwo-w-full ascwo-space-y-2 ascwo-text-[11px] ascwo-text-[#444444]">
                        <label class="">{{ __('Change Download icon', 'all-signs-customizer-for-woocommerce-pro') }}</label>
                        <div class="ascwo-flex ascwo-w-full ascwo-space-x-2">
                            <button @click="selectChangeIconDownload" class="ascwo-bg-[#016464] ascwo-border-none ascwo-w-fit ascwo-h-fit ascwo-p-4 ascwo-rounded ascwo-px-4 ascwo-text-white ascwo-opacity-90 hover:ascwo-opacity-100 ascwo-text-[10px] ascwo-cursor-pointer">{{ __('Upload icon', 'all-signs-customizer-for-woocommerce-pro') }}</button>
                            <div :class="`ascwo-relative ascwo-w-[82px] ascwo-h-[49px] ascwo-rounded-md ascwo-overflow-hidden`">
                                <img v-if="images.changeIconDownload != ''" :src="images.changeIconDownload" alt="" class="ascwo-absolute ascwo-w-full ascwo-h-full">
                                <button v-if="images.changeIconDownload != ''" @click="()=>{images.changeIconDownload = ''}" :class="`ascwo-bg-[#016464] ascwo-absolute ascwo-bottom-0 ascwo-right-0 ascwo-text-white ascwo-p-1 ascwo-rounded-tl-lg ascwo-border-none ascwo-cursor-pointer`">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="ascwo-w-4 ascwo-h-4">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                    </div>
                    <div class="ascwo-flex ascwo-flex-col ascwo-w-full ascwo-space-y-2 ascwo-text-[11px] ascwo-text-[#444444]">
                        <label class="">{{ __('Change Upload design icon', 'all-signs-customizer-for-woocommerce-pro') }}</label>
                        <div class="ascwo-w-full ascwo-flex ascwo-space-x-2">
                            <button @click="selectChangeIconImport" class="ascwo-bg-[#016464] ascwo-border-none ascwo-w-fit ascwo-h-fit ascwo-p-4 ascwo-rounded ascwo-px-4 ascwo-text-white ascwo-opacity-90 hover:ascwo-opacity-100 ascwo-text-[10px] ascwo-cursor-pointer">{{ __('Upload icon', 'all-signs-customizer-for-woocommerce-pro') }}</button>
                            <div :class="`ascwo-relative ascwo-w-[82px] ascwo-h-[49px] ascwo-rounded-md ascwo-overflow-hidden`">
                                <img v-if="images.changeIconImport != ''" :src="images.changeIconImport" alt="" class="ascwo-absolute ascwo-w-full ascwo-h-full">
                                <button v-if="images.changeIconImport != ''" @click="()=>{images.changeIconImport = ''}" :class="`ascwo-bg-[#016464] ascwo-absolute ascwo-bottom-0 ascwo-right-0 ascwo-text-white ascwo-p-1 ascwo-rounded-tl-lg ascwo-border-none ascwo-cursor-pointer`">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="ascwo-w-4 ascwo-h-4">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    <!-- <div class="ascwo-flex ascwo-flex-col ascwo-w-full ascwo-space-y-2 ascwo-text-[11px] ascwo-text-[#444444]">
                        <label class="">{{ __("Change icon share", "all-signs-customizer-for-woocommerce-pro") }}</label>
                        <div class="ascwo-flex ascwo-w-full ascwo-space-x-2">
                            <button @click="selectChangeIconShare" class="ascwo-bg-[#016464] ascwo-border-none ascwo-w-fit ascwo-h-fit ascwo-p-4 ascwo-rounded ascwo-px-4 ascwo-text-white ascwo-opacity-90 hover:ascwo-opacity-100 ascwo-text-[10px] ascwo-cursor-pointer">{{ __("Upload icon", "all-signs-customizer-for-woocommerce-pro") }}</button>
                            <div :class="`ascwo-relative ascwo-w-[82px] ascwo-h-[49px] ascwo-rounded-md ascwo-overflow-hidden`">
                                <img v-if="images.changeIconShare != ''" :src="images.changeIconShare" alt="" class="ascwo-absolute ascwo-w-full ascwo-h-full">
                                <button v-if="images.changeIconShare != ''" @click="()=>{images.changeIconShare = ''}" :class="`ascwo-bg-[#016464] ascwo-absolute ascwo-bottom-0 ascwo-right-0 ascwo-text-white ascwo-p-1 ascwo-rounded-tl-lg ascwo-border-none ascwo-cursor-pointer`">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="ascwo-w-4 ascwo-h-4">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        {{ __("change icon to share project", "all-signs-customizer-for-woocommerce-pro") }}
                    </div> -->
                    <!-- <div class="ascwo-flex ascwo-flex-col ascwo-w-full ascwo-space-y-2 ascwo-text-[11px] ascwo-text-[#444444]">
                        <label class="">{{ __("Change icon save project", "all-signs-customizer-for-woocommerce-pro") }}</label>
                        <div class="ascwo-flex ascwo-space-x-2 ascwo-w-full">
                            <button @click="selectChangeIconSaveProject" class="ascwo-bg-[#016464] ascwo-border-none ascwo-w-fit ascwo-h-fit ascwo-p-4 ascwo-rounded ascwo-px-4 ascwo-text-white ascwo-opacity-90 hover:ascwo-opacity-100 ascwo-text-[10px] ascwo-cursor-pointer">{{ __("Upload icon", "all-signs-customizer-for-woocommerce-pro") }}</button>
                            <div :class="`ascwo-relative ascwo-w-[82px] ascwo-h-[49px] ascwo-rounded-md ascwo-overflow-hidden`">
                                <img v-if="images.changeIconSaveProject != ''" :src="images.changeIconSaveProject" alt="" class="ascwo-absolute ascwo-w-full ascwo-h-full">
                                <button v-if="images.changeIconSaveProject != ''" @click="()=>{images.changeIconSaveProject = ''}" :class="`ascwo-bg-[#016464] ascwo-absolute ascwo-bottom-0 ascwo-right-0 ascwo-text-white ascwo-p-1 ascwo-rounded-tl-lg ascwo-border-none ascwo-cursor-pointer`">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="ascwo-w-4 ascwo-h-4">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                    </div> -->
                    <div class="ascwo-flex ascwo-flex-col ascwo-w-full ascwo-space-y-2 ascwo-text-[11px] ascwo-text-[#444444]">
                        <label class="">{{ __('Change icon Material', 'all-signs-customizer-for-woocommerce-pro') }}</label>
                        <div class="ascwo-flex ascwo-w-full ascwo-space-x-2">
                            <button @click="selectChangeIconMaterial" class="ascwo-bg-[#016464] ascwo-border-none ascwo-w-fit ascwo-h-fit ascwo-p-4 ascwo-rounded ascwo-px-4 ascwo-text-white ascwo-opacity-90 hover:ascwo-opacity-100 ascwo-text-[10px] ascwo-cursor-pointer">{{ __('Upload icon', 'all-signs-customizer-for-woocommerce-pro') }}</button>
                            <div :class="`ascwo-relative ascwo-w-[82px] ascwo-h-[49px] ascwo-rounded-md ascwo-overflow-hidden`">
                                <img v-if="images.changeIconMaterial != ''" :src="images.changeIconMaterial" alt="" class="ascwo-absolute ascwo-w-full ascwo-h-full">
                                <button v-if="images.changeIconMaterial != ''" @click="()=>{images.changeIconMaterial = ''}" :class="`ascwo-bg-[#016464] ascwo-absolute ascwo-bottom-0 ascwo-right-0 ascwo-text-white ascwo-p-1 ascwo-rounded-tl-lg ascwo-border-none ascwo-cursor-pointer`">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="ascwo-w-4 ascwo-h-4">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                    </div>
                    <div class="ascwo-flex ascwo-flex-col ascwo-w-full ascwo-space-y-2 ascwo-text-[11px] ascwo-text-[#444444]">
                        <label class="">{{ __('Change icon Shape', 'all-signs-customizer-for-woocommerce-pro') }}</label>
                        <div class="ascwo-flex ascwo-w-full ascwo-space-x-2">
                            <button @click="selectChangeIconShape" class="ascwo-bg-[#016464] ascwo-border-none ascwo-w-fit ascwo-h-fit ascwo-p-4 ascwo-rounded ascwo-px-4 ascwo-text-white ascwo-opacity-90 hover:ascwo-opacity-100 ascwo-text-[10px] ascwo-cursor-pointer">{{ __('Upload icon', 'all-signs-customizer-for-woocommerce-pro') }}</button>
                            <div :class="`ascwo-relative ascwo-w-[82px] ascwo-h-[49px] ascwo-rounded-md ascwo-overflow-hidden`">
                                <img v-if="images.changeIconShape != ''" :src="images.changeIconShape" alt="" class="ascwo-absolute ascwo-w-full ascwo-h-full">
                                <button v-if="images.changeIconShape != ''" @click="()=>{images.changeIconShape = ''}" :class="`ascwo-bg-[#016464] ascwo-absolute ascwo-bottom-0 ascwo-right-0 ascwo-text-white ascwo-p-1 ascwo-rounded-tl-lg ascwo-border-none ascwo-cursor-pointer`">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="ascwo-w-4 ascwo-h-4">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                    </div>
                    <div class="ascwo-flex ascwo-flex-col ascwo-w-full ascwo-space-y-2 ascwo-text-[11px] ascwo-text-[#444444]">
                        <label class="">{{ __('Change icon Fixing method', 'all-signs-customizer-for-woocommerce-pro') }}</label>
                        <div class="ascwo-flex ascwo-w-full ascwo-space-x-2">
                            <button @click="selectChangeIconFixingMethod" class="ascwo-bg-[#016464] ascwo-border-none ascwo-w-fit ascwo-h-fit ascwo-p-4 ascwo-rounded ascwo-px-4 ascwo-text-white ascwo-opacity-90 hover:ascwo-opacity-100 ascwo-text-[10px] ascwo-cursor-pointer">{{ __('Upload icon', 'all-signs-customizer-for-woocommerce-pro') }}</button>
                            <div :class="`ascwo-relative ascwo-w-[82px] ascwo-h-[49px] ascwo-rounded-md ascwo-overflow-hidden`">
                                <img v-if="images.changeIconFixingMethod != ''" :src="images.changeIconFixingMethod" alt="" class="ascwo-absolute ascwo-w-full ascwo-h-full">
                                <button v-if="images.changeIconFixingMethod != ''" @click="()=>{images.changeIconFixingMethod = ''}" :class="`ascwo-bg-[#016464] ascwo-absolute ascwo-bottom-0 ascwo-right-0 ascwo-text-white ascwo-p-1 ascwo-rounded-tl-lg ascwo-border-none ascwo-cursor-pointer`">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="ascwo-w-4 ascwo-h-4">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                    </div>
                    <!-- <div class="ascwo-flex ascwo-flex-col ascwo-w-full ascwo-space-y-2 ascwo-text-[11px] ascwo-text-[#444444]">
                        <label class="">{{ __("Change icon Product", "all-signs-customizer-for-woocommerce-pro") }}</label>
                        <div class="ascwo-flex ascwo-w-full ascwo-space-x-2">
                            <button @click="selectChangeIconProduct" class="ascwo-bg-[#016464] ascwo-border-none ascwo-w-fit ascwo-h-fit ascwo-p-4 ascwo-rounded ascwo-px-4 ascwo-text-white ascwo-opacity-90 hover:ascwo-opacity-100 ascwo-text-[10px] ascwo-cursor-pointer">{{ __("Upload icon", "all-signs-customizer-for-woocommerce-pro") }}</button>
                            <div :class="`ascwo-relative ascwo-w-[82px] ascwo-h-[49px] ascwo-rounded-md ascwo-overflow-hidden`">
                                <img v-if="images.changeIconProduct != ''" :src="images.changeIconProduct" alt="" class="ascwo-absolute ascwo-w-full ascwo-h-full">
                                <button v-if="images.changeIconProduct != ''" @click="()=>{images.changeIconProduct = ''}" :class="`ascwo-bg-[#016464] ascwo-absolute ascwo-bottom-0 ascwo-right-0 ascwo-text-white ascwo-p-1 ascwo-rounded-tl-lg ascwo-border-none ascwo-cursor-pointer`">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="ascwo-w-4 ascwo-h-4">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                    </div> -->
                    <div class="ascwo-flex ascwo-flex-col ascwo-w-full ascwo-space-y-2 ascwo-text-[11px] ascwo-text-[#444444]">
                        <label class="">{{ __('Change icon Size', 'all-signs-customizer-for-woocommerce-pro') }}</label>
                        <div class="ascwo-flex ascwo-w-full ascwo-space-x-2">
                            <button @click="selectChangeIconSize" class="ascwo-bg-[#016464] ascwo-border-none ascwo-w-fit ascwo-h-fit ascwo-p-4 ascwo-rounded ascwo-px-4 ascwo-text-white ascwo-opacity-90 hover:ascwo-opacity-100 ascwo-text-[10px] ascwo-cursor-pointer">{{ __('Upload icon', 'all-signs-customizer-for-woocommerce-pro') }}</button>
                            <div :class="`ascwo-relative ascwo-w-[82px] ascwo-h-[49px] ascwo-rounded-md ascwo-overflow-hidden`">
                                <img v-if="images.changeIconSize != ''" :src="images.changeIconSize" alt="" class="ascwo-absolute ascwo-w-full ascwo-h-full">
                                <button v-if="images.changeIconSize != ''" @click="()=>{images.changeIconSize = ''}" :class="`ascwo-bg-[#016464] ascwo-absolute ascwo-bottom-0 ascwo-right-0 ascwo-text-white ascwo-p-1 ascwo-rounded-tl-lg ascwo-border-none ascwo-cursor-pointer`">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="ascwo-w-4 ascwo-h-4">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                    </div>
                    <div class="ascwo-flex ascwo-flex-col ascwo-w-full ascwo-space-y-2 ascwo-text-[11px] ascwo-text-[#444444]">
                        <label class="">{{ __('Change icon Text', 'all-signs-customizer-for-woocommerce-pro') }}</label>
                        <div class="ascwo-flex ascwo-w-full ascwo-space-x-2">
                            <button @click="selectChangeIconText" class="ascwo-bg-[#016464] ascwo-border-none ascwo-w-fit ascwo-h-fit ascwo-p-4 ascwo-rounded ascwo-px-4 ascwo-text-white ascwo-opacity-90 hover:ascwo-opacity-100 ascwo-text-[10px] ascwo-cursor-pointer">{{ __('Upload icon', 'all-signs-customizer-for-woocommerce-pro') }}</button>
                            <div :class="`ascwo-relative ascwo-w-[82px] ascwo-h-[49px] ascwo-rounded-md ascwo-overflow-hidden`">
                                <img v-if="images.changeIconText != ''" :src="images.changeIconText" alt="" class="ascwo-absolute ascwo-w-full ascwo-h-full">
                                <button v-if="images.changeIconText != ''" @click="()=>{images.changeIconText = ''}" :class="`ascwo-bg-[#016464] ascwo-absolute ascwo-bottom-0 ascwo-right-0 ascwo-text-white ascwo-p-1 ascwo-rounded-tl-lg ascwo-border-none ascwo-cursor-pointer`">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="ascwo-w-4 ascwo-h-4">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                    </div>
                    <div class="ascwo-flex ascwo-flex-col ascwo-w-full ascwo-space-y-2 ascwo-text-[11px] ascwo-text-[#444444]">
                        <label class="">{{ __('Change icon color', 'all-signs-customizer-for-woocommerce-pro') }}</label>
                        <div class="ascwo-flex ascwo-w-full ascwo-space-x-2">
                            <button @click="selectChangeIconColor" class="ascwo-bg-[#016464] ascwo-border-none ascwo-w-fit ascwo-h-fit ascwo-p-4 ascwo-rounded ascwo-px-4 ascwo-text-white ascwo-opacity-90 hover:ascwo-opacity-100 ascwo-text-[10px] ascwo-cursor-pointer">{{ __('Upload icon', 'all-signs-customizer-for-woocommerce-pro') }}</button>
                            <div :class="`ascwo-relative ascwo-w-[82px] ascwo-h-[49px] ascwo-rounded-md ascwo-overflow-hidden`">
                                <img v-if="images.changeIconColor != ''" :src="images.changeIconColor" alt="" class="ascwo-absolute ascwo-w-full ascwo-h-full">
                                <button v-if="images.changeIconColor != ''" @click="()=>{images.changeIconColor = ''}" :class="`ascwo-bg-[#016464] ascwo-absolute ascwo-bottom-0 ascwo-right-0 ascwo-text-white ascwo-p-1 ascwo-rounded-tl-lg ascwo-border-none ascwo-cursor-pointer`">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="ascwo-w-4 ascwo-h-4">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                    </div>                 
                    <div class="ascwo-flex ascwo-flex-col ascwo-w-full ascwo-space-y-2 ascwo-text-[11px] ascwo-text-[#444444]">
                        <label class="">{{ __('Change icon border', 'all-signs-customizer-for-woocommerce-pro') }}</label>
                        <div class="ascwo-flex ascwo-w-full ascwo-space-x-2">
                            <button @click="selectChangeIconBorder" class="ascwo-bg-[#016464] ascwo-border-none ascwo-w-fit ascwo-h-fit ascwo-p-4 ascwo-rounded ascwo-px-4 ascwo-text-white ascwo-opacity-90 hover:ascwo-opacity-100 ascwo-text-[10px] ascwo-cursor-pointer">{{ __('Upload icon', 'all-signs-customizer-for-woocommerce-pro') }}</button>
                            <div :class="`ascwo-relative ascwo-w-[82px] ascwo-h-[49px] ascwo-rounded-md ascwo-overflow-hidden`">
                                <img v-if="images.changeIconBorder != ''" :src="images.changeIconBorder" alt="" class="ascwo-absolute ascwo-w-full ascwo-h-full">
                                <button v-if="images.changeIconBorder != ''" @click="()=>{images.changeIconBorder = ''}" :class="`ascwo-bg-[#016464] ascwo-absolute ascwo-bottom-0 ascwo-right-0 ascwo-text-white ascwo-p-1 ascwo-rounded-tl-lg ascwo-border-none ascwo-cursor-pointer`">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="ascwo-w-4 ascwo-h-4">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                    </div>
                    <div class="ascwo-flex ascwo-flex-col ascwo-w-full ascwo-space-y-2 ascwo-text-[11px] ascwo-text-[#444444]">
                        <label class="">{{ __('Change icon image', 'all-signs-customizer-for-woocommerce-pro') }}</label>
                        <div class="ascwo-flex ascwo-w-full ascwo-space-x-2">
                            <button @click="selectChangeIconImage" class="ascwo-bg-[#016464] ascwo-border-none ascwo-w-fit ascwo-h-fit ascwo-p-4 ascwo-rounded ascwo-px-4 ascwo-text-white ascwo-opacity-90 hover:ascwo-opacity-100 ascwo-text-[10px] ascwo-cursor-pointer">{{ __('Upload icon', 'all-signs-customizer-for-woocommerce-pro') }}</button>
                            <div :class="`ascwo-relative ascwo-w-[82px] ascwo-h-[49px] ascwo-rounded-md ascwo-overflow-hidden`">
                                <img v-if="images.changeIconImage != ''" :src="images.changeIconImage" alt="" class="ascwo-absolute ascwo-w-full ascwo-h-full">
                                <button v-if="images.changeIconImage != ''" @click="()=>{images.changeIconImage = ''}" :class="`ascwo-bg-[#016464] ascwo-absolute ascwo-bottom-0 ascwo-right-0 ascwo-text-white ascwo-p-1 ascwo-rounded-tl-lg ascwo-border-none ascwo-cursor-pointer`">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="ascwo-w-4 ascwo-h-4">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
        <div class="ascwo-bg-[#F8F9FB] ascwo-flex ascwo-space-x-4 ascwo-px-4 ascwo-py-3 ascwo-justify-end ascwo-items-end">
            <div class="ascwo-bg-[#016464] ascwo-rounded">
                <button :disabled="isLoading" @click="updateImagesSettings" class="ascwo-rounded ascwo-flex ascwo-bg-transparent ascwo-w-fit ascwo-space-x-2 ascwo-h-fit ascwo-text-white ascwo-px-12 ascwo-p-2.5 ascwo-border-none ascwo-opacity-90 hover:ascwo-opacity-100 hover:ascwo-border-none hover:ascwo-text-white hover:ascwo-bg-[#016464] ascwo-cursor-pointerascwo-flex ascwo-bg-transparent ascwo-w-fit ascwo-space-x-2 ascwo-h-fit ascwo-text-white ascwo-px-12 ascwo-p-2.5 ascwo-border-none ascwo-opacity-90 hover:ascwo-opacity-100 hover:ascwo-border-none hover:ascwo-text-white hover:ascwo-bg-[#016464] ascwo-cursor-pointer">
                    <img src="../../../../../../assets/icons/ic_loading_gray.svg" class="ascwo-w-5 ascwo-w-5" v-if="isLoading" />
                    <div class="ascwo-font-semibold ascwo-text-[16px]">{{ __("Save", "all-signs-customizer-for-woocommerce-pro") }}</div>
                </button>
            </div>
        </div>
    </div>
</template>
<script setup>
import api from '@/admin/Api/api';
import {ref,defineProps, onMounted} from 'vue';
import { useRoute } from 'vue-router';
import toastMessage from '@/admin/utils/functions';
import { __, _x, _n, _nx, sprintf, setLocaleData } from "@wordpress/i18n";
const props = defineProps({
    data:Object,
    fetchSettings:Function
   
});

const route = useRoute();
const configId = ref(route.params.configId);
const isLoading =ref(false);
const images = ref({
    resetAllIcon:'',
    undoIcon:'',
    redoIcon:'',
    changeIconPreview:'',
    changeIconHelp:'',
    changeIconImport:'',
    changeIconShare:'',
    changeIconSaveProject:'',
    changeIconMaterial:'',
    changeIconShape:'',
    changeIconFixingMethod:'',
    changeIconProduct:'',
    changeIconSize:'',
    changeIconText:'',
    changeIconColor:'',
    changeIconDownload:'',
    changeIconBorder:'',
    changeIconImage:'',
});
onMounted(() => {
    if(props.data){
        images.value = {...images.value,...props.data}
    }
});
const updateImagesSettings = async () => {
    isLoading.value = true;
    const result = await api.updateLanguageImagesImgs(configId.value,images.value);
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
const selectResetAllIcon = async(e) => { 
    e.preventDefault();
    var uploader = wp.media(
        {
            title: __("Select Image","all-signs-customizer-for-woocommerce-pro"),
            button: {
                text: __("Select Image","all-signs-customizer-for-woocommerce-pro")
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
                            images.value.resetAllIcon = (attachment.url);
                        }
                    }
                );
            }
        )
        .open();
};
const selectUndoIcon = async(e) => { 
    e.preventDefault();
    var uploader = wp.media(
        {
            title: __("Select Image","all-signs-customizer-for-woocommerce-pro"),
            button: {
                text: __("Select Image","all-signs-customizer-for-woocommerce-pro")
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
                            images.value.undoIcon = (attachment.url);
                        }
                    }
                );
            }
        )
        .open();
};
const selectRedoIcon = async(e) => { 
    e.preventDefault();
    var uploader = wp.media(
        {
            title: __("Select Image","all-signs-customizer-for-woocommerce-pro"),
            button: {
                text: __("Select Image","all-signs-customizer-for-woocommerce-pro")
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
                            images.value.redoIcon = (attachment.url);
                        }
                    }
                );
            }
        )
        .open();
};
const selectChangeIconPreview = async(e) => { 
    e.preventDefault();
    var uploader = wp.media(
        {
            title: __("Select Image","all-signs-customizer-for-woocommerce-pro"),
            button: {
                text: __("Select Image","all-signs-customizer-for-woocommerce-pro")
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
                            images.value.changeIconPreview = (attachment.url);
                        }
                    }
                );
            }
        )
        .open();
};
const selectChangeIconHelp = async(e) => { 
    e.preventDefault();
    var uploader = wp.media(
        {
            title: __("Select Image","all-signs-customizer-for-woocommerce-pro"),
            button: {
                text: __("Select Image","all-signs-customizer-for-woocommerce-pro")
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
                            images.value.changeIconHelp = (attachment.url);
                        }
                    }
                );
            }
        )
        .open();
};
const selectChangeIconImport = async(e) => { 
    e.preventDefault();
    var uploader = wp.media(
        {
            title: __("Select Image","all-signs-customizer-for-woocommerce-pro"),
            button: {
                text: __("Select Image","all-signs-customizer-for-woocommerce-pro")
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
                            images.value.changeIconImport = (attachment.url);
                        }
                    }
                );
            }
        )
        .open();
};
const selectChangeIconShare = async(e) => { 
    e.preventDefault();
    var uploader = wp.media(
        {
            title: __("Select Image","all-signs-customizer-for-woocommerce-pro"),
            button: {
                text: __("Select Image","all-signs-customizer-for-woocommerce-pro")
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
                            images.value.changeIconShare= (attachment.url);
                        }
                    }
                );
            }
        )
        .open();
};
const selectChangeIconSaveProject = async(e) => { 
    e.preventDefault();
    var uploader = wp.media(
        {
            title: __("Select Image","all-signs-customizer-for-woocommerce-pro"),
            button: {
                text: __("Select Image","all-signs-customizer-for-woocommerce-pro")
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
                            images.value.changeIconSaveProject = (attachment.url);
                        }
                    }
                );
            }
        )
        .open();
};
const selectChangeIconMaterial = async(e) => { 
    e.preventDefault();
    var uploader = wp.media(
        {
            title: __("Select Image","all-signs-customizer-for-woocommerce-pro"),
            button: {
                text: __("Select Image","all-signs-customizer-for-woocommerce-pro")
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
                            images.value.changeIconMaterial = (attachment.url);
                        }
                    }
                );
            }
        )
        .open();
};
const selectChangeIconShape = async(e) => { 
    e.preventDefault();
    var uploader = wp.media(
        {
            title: __("Select Image","all-signs-customizer-for-woocommerce-pro"),
            button: {
                text: __("Select Image","all-signs-customizer-for-woocommerce-pro")
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
                            images.value.changeIconShape = (attachment.url);
                        }
                    }
                );
            }
        )
        .open();
};
const selectChangeIconFixingMethod = async(e) => { 
    e.preventDefault();
    var uploader = wp.media(
        {
            title: __("Select Image","all-signs-customizer-for-woocommerce-pro"),
            button: {
                text: __("Select Image","all-signs-customizer-for-woocommerce-pro")
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
                            images.value.changeIconFixingMethod = (attachment.url);
                        }
                    }
                );
            }
        )
        .open();
};
const selectChangeIconProduct = async(e) => { 
    e.preventDefault();
    var uploader = wp.media(
        {
            title: __("Select Image","all-signs-customizer-for-woocommerce-pro"),
            button: {
                text: __("Select Image","all-signs-customizer-for-woocommerce-pro")
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
                            images.value.changeIconProduct = (attachment.url);
                        }
                    }
                );
            }
        )
        .open();
};
const selectChangeIconSize = async(e) => { 
    e.preventDefault();
    var uploader = wp.media(
        {
            title: __("Select Image","all-signs-customizer-for-woocommerce-pro"),
            button: {
                text: __("Select Image","all-signs-customizer-for-woocommerce-pro")
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
                            images.value.changeIconSize = (attachment.url);
                        }
                    }
                );
            }
        )
        .open();
};
const selectChangeIconText = async(e) => { 
    e.preventDefault();
    var uploader = wp.media(
        {
            title: __("Select Image","all-signs-customizer-for-woocommerce-pro"),
            button: {
                text: __("Select Image","all-signs-customizer-for-woocommerce-pro")
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
                            images.value.changeIconText = (attachment.url);
                        }
                    }
                );
            }
        )
        .open();
};
const selectChangeIconColor = async(e) => { 
    e.preventDefault();
    var uploader = wp.media(
        {
            title: __("Select Image","all-signs-customizer-for-woocommerce-pro"),
            button: {
                text: __("Select Image","all-signs-customizer-for-woocommerce-pro")
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
                            images.value.changeIconColor = (attachment.url);
                        }
                    }
                );
            }
        )
        .open();
};
const selectChangeIconDownload = async(e) => { 
    e.preventDefault();
    var uploader = wp.media(
        {
            title: __("Select Image","all-signs-customizer-for-woocommerce-pro"),
            button: {
                text: __("Select Image","all-signs-customizer-for-woocommerce-pro")
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
                            images.value.changeIconDownload = (attachment.url);
                        }
                    }
                );
            }
        )
        .open();
};
const selectChangeIconBorder = async(e) => { 
    e.preventDefault();
    var uploader = wp.media(
        {
            title: __("Select Image","all-signs-customizer-for-woocommerce-pro"),
            button: {
                text: __("Select Image","all-signs-customizer-for-woocommerce-pro")
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
                            images.value.changeIconBorder = (attachment.url);
                        }
                    }
                );
            }
        )
        .open();
};
const selectChangeIconImage = async(e) => { 
    e.preventDefault();
    var uploader = wp.media(
        {
            title: __("Select Image","all-signs-customizer-for-woocommerce-pro"),
            button: {
                text: __("Select Image","all-signs-customizer-for-woocommerce-pro")
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
                            images.value.changeIconImage = (attachment.url);
                        }
                    }
                );
            }
        )
        .open();
};

</script> 
