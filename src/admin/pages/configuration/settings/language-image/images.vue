<template>
    <div class="asowp-space-y-2 asowp-translate-y-10">
        <div class="">
            <div class="asowp-bg-[#F8F9FB] asowp-border-solid asowp-border-[1px] asowp-border-t-0 asowp-border-[#DDDDDD] asowp-px-8">
                <div class="asowp-grid asowp-grid-cols-3 asowp-gap-4 asowp-py-4">   
                    <div class="asowp-flex asowp-flex-col asowp-space-y-2">
                        <label class="asowp-text-[12px] asowp-text-[#444444]">{{ __('Reset all', 'all-signs-options-pro') }}</label>
                        <div class="asowp-flex asowp-w-full asowp-space-x-2">
                            <button @click="selectResetAllIcon" class="asowp-bg-[#016464] asowp-border-none asowp-w-fit asowp-h-fit asowp-p-4 asowp-rounded asowp-px-4 asowp-text-white asowp-opacity-90 hover:asowp-opacity-100 asowp-text-[10px] asowp-cursor-pointer">{{ __('Upload Icon', 'all-signs-options-pro') }}</button>
                            <div :class="`asowp-relative asowp-w-[82px] asowp-h-[49px] asowp-rounded-md asowp-overflow-hidden`">
                                <img v-if="images.resetAllIcon != ''" :src="images.resetAllIcon" alt="" class="asowp-absolute asowp-w-full asowp-h-full">
                                <button v-if="images.resetAllIcon != ''" @click="()=>{images.resetAllIcon = ''}" :class="`asowp-bg-[#016464] asowp-absolute asowp-bottom-0 asowp-right-0 asowp-text-white asowp-p-1 asowp-rounded-tl-lg asowp-border-none asowp-cursor-pointer`">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="asowp-w-4 asowp-h-4">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                    </div>
                    <div class="asowp-flex asowp-flex-col asowp-space-y-2 asowp-text-[11px] asowp-text-[#444444]">
                        <label class="">{{ __('Change Undo Icon', 'all-signs-options-pro') }}</label>
                        <div class="asowp-w-full asowp-flex asowp-space-x-2">
                            <button @click="selectUndoIcon" class="asowp-bg-[#016464] asowp-border-none asowp-w-fit asowp-h-fit asowp-p-4 asowp-rounded asowp-px-4 asowp-text-white asowp-opacity-90 hover:asowp-opacity-100 asowp-text-[10px] asowp-cursor-pointer">{{ __('Upload Icon', 'all-signs-options-pro') }}</button>
                            <div :class="`asowp-relative asowp-w-[82px] asowp-h-[49px] asowp-rounded-md asowp-overflow-hidden`">
                                <img v-if="images.undoIcon != ''" :src="images.undoIcon" alt="" class="asowp-absolute asowp-w-full asowp-h-full">
                                <button v-if="images.undoIcon != ''" @click="()=>{images.undoIcon = ''}" :class="`asowp-bg-[#016464] asowp-absolute asowp-bottom-0 asowp-right-0 asowp-text-white asowp-p-1 asowp-rounded-tl-lg asowp-border-none asowp-cursor-pointer`">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="asowp-w-4 asowp-h-4">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="asowp-flex asowp-flex-col asowp-space-y-2 asowp-text-[11px] asowp-text-[#444444]">
                        <label class="">{{ __('Change Redo Icon', 'all-signs-options-pro') }}</label>
                        <div class="asowp-w-full asowp-flex asowp-space-x-2">
                            <button @click="selectRedoIcon" class="asowp-bg-[#016464] asowp-border-none asowp-w-fit asowp-h-fit asowp-p-4 asowp-rounded asowp-px-4 asowp-text-white asowp-opacity-90 hover:asowp-opacity-100 asowp-text-[10px] asowp-cursor-pointer">{{ __('Upload Icon', 'all-signs-options-pro') }}</button>
                            <div :class="`asowp-relative asowp-w-[82px] asowp-h-[49px] asowp-rounded-md asowp-overflow-hidden`">
                                <img v-if="images.redoIcon != ''" :src="images.redoIcon" alt="" class="asowp-absolute asowp-w-full asowp-h-full">
                                <button v-if="images.redoIcon != ''" @click="()=>{images.redoIcon = ''}" :class="`asowp-bg-[#016464] asowp-absolute asowp-bottom-0 asowp-right-0 asowp-text-white asowp-p-1 asowp-rounded-tl-lg asowp-border-none asowp-cursor-pointer`">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="asowp-w-4 asowp-h-4">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="asowp-flex asowp-flex-col asowp-w-full asowp-space-y-2 asowp-text-[11px] asowp-text-[#444444">
                        <label class="">{{ __('Change icon Preview', 'all-signs-options-pro') }}</label>
                        <div class="asowp-w-full asowp-flex asowp-space-x-2">
                            <button @click="selectChangeIconPreview" class="asowp-bg-[#016464] asowp-border-none asowp-w-fit asowp-h-fit asowp-p-4 asowp-rounded asowp-px-4 asowp-text-white asowp-opacity-90 hover:asowp-opacity-100 asowp-text-[10px] asowp-cursor-pointer">{{ __('Upload Icon', 'all-signs-options-pro') }}</button>
                            <div :class="`asowp-relative asowp-w-[82px] asowp-h-[49px] asowp-rounded-md asowp-overflow-hidden`">
                                <img v-if="images.changeIconPreview != ''" :src="images.changeIconPreview" alt="" class="asowp-absolute asowp-w-full asowp-h-full">
                                <button v-if="images.changeIconPreview != ''" @click="()=>{images.changeIconPreview = ''}" :class="`asowp-bg-[#016464] asowp-absolute asowp-bottom-0 asowp-right-0 asowp-text-white asowp-p-1 asowp-rounded-tl-lg asowp-border-none asowp-cursor-pointer`">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="asowp-w-4 asowp-h-4">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="asowp-flex asowp-flex-col asowp-w-full asowp-space-y-2 asowp-text-[11px] asowp-text-[#444444">
                        <label class="">{{ __('Change icon Help', 'all-signs-options-pro') }}</label>
                        <div class="asowp-w-full asowp-flex asowp-space-x-2">
                            <button @click="selectChangeIconHelp" class="asowp-bg-[#016464] asowp-border-none asowp-w-fit asowp-h-fit asowp-p-4 asowp-rounded asowp-px-4 asowp-text-white asowp-opacity-90 hover:asowp-opacity-100 asowp-text-[10px] asowp-cursor-pointer">{{ __('Upload Icon', 'all-signs-options-pro') }}</button>
                            <div :class="`asowp-relative asowp-w-[82px] asowp-h-[49px] asowp-rounded-md asowp-overflow-hidden`">
                                <img v-if="images.changeIconHelp != ''" :src="images.changeIconHelp" alt="" class="asowp-absolute asowp-w-full asowp-h-full">
                                <button v-if="images.changeIconHelp != ''" @click="()=>{images.changeIconHelp = ''}" :class="`asowp-bg-[#016464] asowp-absolute asowp-bottom-0 asowp-right-0 asowp-text-white asowp-p-1 asowp-rounded-tl-lg asowp-border-none asowp-cursor-pointer`">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="asowp-w-4 asowp-h-4">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="asowp-flex asowp-flex-col asowp-w-full asowp-space-y-2 asowp-text-[11px] asowp-text-[#444444]">
                        <label class="">{{ __('Change Download icon', 'all-signs-options-pro') }}</label>
                        <div class="asowp-flex asowp-w-full asowp-space-x-2">
                            <button @click="selectChangeIconDownload" class="asowp-bg-[#016464] asowp-border-none asowp-w-fit asowp-h-fit asowp-p-4 asowp-rounded asowp-px-4 asowp-text-white asowp-opacity-90 hover:asowp-opacity-100 asowp-text-[10px] asowp-cursor-pointer">{{ __('Upload icon', 'all-signs-options-pro') }}</button>
                            <div :class="`asowp-relative asowp-w-[82px] asowp-h-[49px] asowp-rounded-md asowp-overflow-hidden`">
                                <img v-if="images.changeIconDownload != ''" :src="images.changeIconDownload" alt="" class="asowp-absolute asowp-w-full asowp-h-full">
                                <button v-if="images.changeIconDownload != ''" @click="()=>{images.changeIconDownload = ''}" :class="`asowp-bg-[#016464] asowp-absolute asowp-bottom-0 asowp-right-0 asowp-text-white asowp-p-1 asowp-rounded-tl-lg asowp-border-none asowp-cursor-pointer`">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="asowp-w-4 asowp-h-4">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                    </div>
                    <div class="asowp-flex asowp-flex-col asowp-w-full asowp-space-y-2 asowp-text-[11px] asowp-text-[#444444]">
                        <label class="">{{ __('Change Upload design icon', 'all-signs-options-pro') }}</label>
                        <div class="asowp-w-full asowp-flex asowp-space-x-2">
                            <button @click="selectChangeIconImport" class="asowp-bg-[#016464] asowp-border-none asowp-w-fit asowp-h-fit asowp-p-4 asowp-rounded asowp-px-4 asowp-text-white asowp-opacity-90 hover:asowp-opacity-100 asowp-text-[10px] asowp-cursor-pointer">{{ __('Upload icon', 'all-signs-options-pro') }}</button>
                            <div :class="`asowp-relative asowp-w-[82px] asowp-h-[49px] asowp-rounded-md asowp-overflow-hidden`">
                                <img v-if="images.changeIconImport != ''" :src="images.changeIconImport" alt="" class="asowp-absolute asowp-w-full asowp-h-full">
                                <button v-if="images.changeIconImport != ''" @click="()=>{images.changeIconImport = ''}" :class="`asowp-bg-[#016464] asowp-absolute asowp-bottom-0 asowp-right-0 asowp-text-white asowp-p-1 asowp-rounded-tl-lg asowp-border-none asowp-cursor-pointer`">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="asowp-w-4 asowp-h-4">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    <!-- <div class="asowp-flex asowp-flex-col asowp-w-full asowp-space-y-2 asowp-text-[11px] asowp-text-[#444444]">
                        <label class="">{{ __("Change icon share", "all-signs-options-pro") }}</label>
                        <div class="asowp-flex asowp-w-full asowp-space-x-2">
                            <button @click="selectChangeIconShare" class="asowp-bg-[#016464] asowp-border-none asowp-w-fit asowp-h-fit asowp-p-4 asowp-rounded asowp-px-4 asowp-text-white asowp-opacity-90 hover:asowp-opacity-100 asowp-text-[10px] asowp-cursor-pointer">{{ __("Upload icon", "all-signs-options-pro") }}</button>
                            <div :class="`asowp-relative asowp-w-[82px] asowp-h-[49px] asowp-rounded-md asowp-overflow-hidden`">
                                <img v-if="images.changeIconShare != ''" :src="images.changeIconShare" alt="" class="asowp-absolute asowp-w-full asowp-h-full">
                                <button v-if="images.changeIconShare != ''" @click="()=>{images.changeIconShare = ''}" :class="`asowp-bg-[#016464] asowp-absolute asowp-bottom-0 asowp-right-0 asowp-text-white asowp-p-1 asowp-rounded-tl-lg asowp-border-none asowp-cursor-pointer`">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="asowp-w-4 asowp-h-4">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        {{ __("change icon to share project", "all-signs-options-pro") }}
                    </div> -->
                    <!-- <div class="asowp-flex asowp-flex-col asowp-w-full asowp-space-y-2 asowp-text-[11px] asowp-text-[#444444]">
                        <label class="">{{ __("Change icon save project", "all-signs-options-pro") }}</label>
                        <div class="asowp-flex asowp-space-x-2 asowp-w-full">
                            <button @click="selectChangeIconSaveProject" class="asowp-bg-[#016464] asowp-border-none asowp-w-fit asowp-h-fit asowp-p-4 asowp-rounded asowp-px-4 asowp-text-white asowp-opacity-90 hover:asowp-opacity-100 asowp-text-[10px] asowp-cursor-pointer">{{ __("Upload icon", "all-signs-options-pro") }}</button>
                            <div :class="`asowp-relative asowp-w-[82px] asowp-h-[49px] asowp-rounded-md asowp-overflow-hidden`">
                                <img v-if="images.changeIconSaveProject != ''" :src="images.changeIconSaveProject" alt="" class="asowp-absolute asowp-w-full asowp-h-full">
                                <button v-if="images.changeIconSaveProject != ''" @click="()=>{images.changeIconSaveProject = ''}" :class="`asowp-bg-[#016464] asowp-absolute asowp-bottom-0 asowp-right-0 asowp-text-white asowp-p-1 asowp-rounded-tl-lg asowp-border-none asowp-cursor-pointer`">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="asowp-w-4 asowp-h-4">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                    </div> -->
                    <div class="asowp-flex asowp-flex-col asowp-w-full asowp-space-y-2 asowp-text-[11px] asowp-text-[#444444]">
                        <label class="">{{ __('Change icon Material', 'all-signs-options-pro') }}</label>
                        <div class="asowp-flex asowp-w-full asowp-space-x-2">
                            <button @click="selectChangeIconMaterial" class="asowp-bg-[#016464] asowp-border-none asowp-w-fit asowp-h-fit asowp-p-4 asowp-rounded asowp-px-4 asowp-text-white asowp-opacity-90 hover:asowp-opacity-100 asowp-text-[10px] asowp-cursor-pointer">{{ __('Upload icon', 'all-signs-options-pro') }}</button>
                            <div :class="`asowp-relative asowp-w-[82px] asowp-h-[49px] asowp-rounded-md asowp-overflow-hidden`">
                                <img v-if="images.changeIconMaterial != ''" :src="images.changeIconMaterial" alt="" class="asowp-absolute asowp-w-full asowp-h-full">
                                <button v-if="images.changeIconMaterial != ''" @click="()=>{images.changeIconMaterial = ''}" :class="`asowp-bg-[#016464] asowp-absolute asowp-bottom-0 asowp-right-0 asowp-text-white asowp-p-1 asowp-rounded-tl-lg asowp-border-none asowp-cursor-pointer`">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="asowp-w-4 asowp-h-4">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                    </div>
                    <div class="asowp-flex asowp-flex-col asowp-w-full asowp-space-y-2 asowp-text-[11px] asowp-text-[#444444]">
                        <label class="">{{ __('Change icon Shape', 'all-signs-options-pro') }}</label>
                        <div class="asowp-flex asowp-w-full asowp-space-x-2">
                            <button @click="selectChangeIconShape" class="asowp-bg-[#016464] asowp-border-none asowp-w-fit asowp-h-fit asowp-p-4 asowp-rounded asowp-px-4 asowp-text-white asowp-opacity-90 hover:asowp-opacity-100 asowp-text-[10px] asowp-cursor-pointer">{{ __('Upload icon', 'all-signs-options-pro') }}</button>
                            <div :class="`asowp-relative asowp-w-[82px] asowp-h-[49px] asowp-rounded-md asowp-overflow-hidden`">
                                <img v-if="images.changeIconShape != ''" :src="images.changeIconShape" alt="" class="asowp-absolute asowp-w-full asowp-h-full">
                                <button v-if="images.changeIconShape != ''" @click="()=>{images.changeIconShape = ''}" :class="`asowp-bg-[#016464] asowp-absolute asowp-bottom-0 asowp-right-0 asowp-text-white asowp-p-1 asowp-rounded-tl-lg asowp-border-none asowp-cursor-pointer`">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="asowp-w-4 asowp-h-4">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                    </div>
                    <div class="asowp-flex asowp-flex-col asowp-w-full asowp-space-y-2 asowp-text-[11px] asowp-text-[#444444]">
                        <label class="">{{ __('Change icon Fixing method', 'all-signs-options-pro') }}</label>
                        <div class="asowp-flex asowp-w-full asowp-space-x-2">
                            <button @click="selectChangeIconFixingMethod" class="asowp-bg-[#016464] asowp-border-none asowp-w-fit asowp-h-fit asowp-p-4 asowp-rounded asowp-px-4 asowp-text-white asowp-opacity-90 hover:asowp-opacity-100 asowp-text-[10px] asowp-cursor-pointer">{{ __('Upload icon', 'all-signs-options-pro') }}</button>
                            <div :class="`asowp-relative asowp-w-[82px] asowp-h-[49px] asowp-rounded-md asowp-overflow-hidden`">
                                <img v-if="images.changeIconFixingMethod != ''" :src="images.changeIconFixingMethod" alt="" class="asowp-absolute asowp-w-full asowp-h-full">
                                <button v-if="images.changeIconFixingMethod != ''" @click="()=>{images.changeIconFixingMethod = ''}" :class="`asowp-bg-[#016464] asowp-absolute asowp-bottom-0 asowp-right-0 asowp-text-white asowp-p-1 asowp-rounded-tl-lg asowp-border-none asowp-cursor-pointer`">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="asowp-w-4 asowp-h-4">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                    </div>
                    <!-- <div class="asowp-flex asowp-flex-col asowp-w-full asowp-space-y-2 asowp-text-[11px] asowp-text-[#444444]">
                        <label class="">{{ __("Change icon Product", "all-signs-options-pro") }}</label>
                        <div class="asowp-flex asowp-w-full asowp-space-x-2">
                            <button @click="selectChangeIconProduct" class="asowp-bg-[#016464] asowp-border-none asowp-w-fit asowp-h-fit asowp-p-4 asowp-rounded asowp-px-4 asowp-text-white asowp-opacity-90 hover:asowp-opacity-100 asowp-text-[10px] asowp-cursor-pointer">{{ __("Upload icon", "all-signs-options-pro") }}</button>
                            <div :class="`asowp-relative asowp-w-[82px] asowp-h-[49px] asowp-rounded-md asowp-overflow-hidden`">
                                <img v-if="images.changeIconProduct != ''" :src="images.changeIconProduct" alt="" class="asowp-absolute asowp-w-full asowp-h-full">
                                <button v-if="images.changeIconProduct != ''" @click="()=>{images.changeIconProduct = ''}" :class="`asowp-bg-[#016464] asowp-absolute asowp-bottom-0 asowp-right-0 asowp-text-white asowp-p-1 asowp-rounded-tl-lg asowp-border-none asowp-cursor-pointer`">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="asowp-w-4 asowp-h-4">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                    </div> -->
                    <div class="asowp-flex asowp-flex-col asowp-w-full asowp-space-y-2 asowp-text-[11px] asowp-text-[#444444]">
                        <label class="">{{ __('Change icon Size', 'all-signs-options-pro') }}</label>
                        <div class="asowp-flex asowp-w-full asowp-space-x-2">
                            <button @click="selectChangeIconSize" class="asowp-bg-[#016464] asowp-border-none asowp-w-fit asowp-h-fit asowp-p-4 asowp-rounded asowp-px-4 asowp-text-white asowp-opacity-90 hover:asowp-opacity-100 asowp-text-[10px] asowp-cursor-pointer">{{ __('Upload icon', 'all-signs-options-pro') }}</button>
                            <div :class="`asowp-relative asowp-w-[82px] asowp-h-[49px] asowp-rounded-md asowp-overflow-hidden`">
                                <img v-if="images.changeIconSize != ''" :src="images.changeIconSize" alt="" class="asowp-absolute asowp-w-full asowp-h-full">
                                <button v-if="images.changeIconSize != ''" @click="()=>{images.changeIconSize = ''}" :class="`asowp-bg-[#016464] asowp-absolute asowp-bottom-0 asowp-right-0 asowp-text-white asowp-p-1 asowp-rounded-tl-lg asowp-border-none asowp-cursor-pointer`">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="asowp-w-4 asowp-h-4">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                    </div>
                    <div class="asowp-flex asowp-flex-col asowp-w-full asowp-space-y-2 asowp-text-[11px] asowp-text-[#444444]">
                        <label class="">{{ __('Change icon Text', 'all-signs-options-pro') }}</label>
                        <div class="asowp-flex asowp-w-full asowp-space-x-2">
                            <button @click="selectChangeIconText" class="asowp-bg-[#016464] asowp-border-none asowp-w-fit asowp-h-fit asowp-p-4 asowp-rounded asowp-px-4 asowp-text-white asowp-opacity-90 hover:asowp-opacity-100 asowp-text-[10px] asowp-cursor-pointer">{{ __('Upload icon', 'all-signs-options-pro') }}</button>
                            <div :class="`asowp-relative asowp-w-[82px] asowp-h-[49px] asowp-rounded-md asowp-overflow-hidden`">
                                <img v-if="images.changeIconText != ''" :src="images.changeIconText" alt="" class="asowp-absolute asowp-w-full asowp-h-full">
                                <button v-if="images.changeIconText != ''" @click="()=>{images.changeIconText = ''}" :class="`asowp-bg-[#016464] asowp-absolute asowp-bottom-0 asowp-right-0 asowp-text-white asowp-p-1 asowp-rounded-tl-lg asowp-border-none asowp-cursor-pointer`">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="asowp-w-4 asowp-h-4">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                    </div>
                    <div class="asowp-flex asowp-flex-col asowp-w-full asowp-space-y-2 asowp-text-[11px] asowp-text-[#444444]">
                        <label class="">{{ __('Change icon color', 'all-signs-options-pro') }}</label>
                        <div class="asowp-flex asowp-w-full asowp-space-x-2">
                            <button @click="selectChangeIconColor" class="asowp-bg-[#016464] asowp-border-none asowp-w-fit asowp-h-fit asowp-p-4 asowp-rounded asowp-px-4 asowp-text-white asowp-opacity-90 hover:asowp-opacity-100 asowp-text-[10px] asowp-cursor-pointer">{{ __('Upload icon', 'all-signs-options-pro') }}</button>
                            <div :class="`asowp-relative asowp-w-[82px] asowp-h-[49px] asowp-rounded-md asowp-overflow-hidden`">
                                <img v-if="images.changeIconColor != ''" :src="images.changeIconColor" alt="" class="asowp-absolute asowp-w-full asowp-h-full">
                                <button v-if="images.changeIconColor != ''" @click="()=>{images.changeIconColor = ''}" :class="`asowp-bg-[#016464] asowp-absolute asowp-bottom-0 asowp-right-0 asowp-text-white asowp-p-1 asowp-rounded-tl-lg asowp-border-none asowp-cursor-pointer`">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="asowp-w-4 asowp-h-4">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                    </div>                 
                    <div class="asowp-flex asowp-flex-col asowp-w-full asowp-space-y-2 asowp-text-[11px] asowp-text-[#444444]">
                        <label class="">{{ __('Change icon border', 'all-signs-options-pro') }}</label>
                        <div class="asowp-flex asowp-w-full asowp-space-x-2">
                            <button @click="selectChangeIconBorder" class="asowp-bg-[#016464] asowp-border-none asowp-w-fit asowp-h-fit asowp-p-4 asowp-rounded asowp-px-4 asowp-text-white asowp-opacity-90 hover:asowp-opacity-100 asowp-text-[10px] asowp-cursor-pointer">{{ __('Upload icon', 'all-signs-options-pro') }}</button>
                            <div :class="`asowp-relative asowp-w-[82px] asowp-h-[49px] asowp-rounded-md asowp-overflow-hidden`">
                                <img v-if="images.changeIconBorder != ''" :src="images.changeIconBorder" alt="" class="asowp-absolute asowp-w-full asowp-h-full">
                                <button v-if="images.changeIconBorder != ''" @click="()=>{images.changeIconBorder = ''}" :class="`asowp-bg-[#016464] asowp-absolute asowp-bottom-0 asowp-right-0 asowp-text-white asowp-p-1 asowp-rounded-tl-lg asowp-border-none asowp-cursor-pointer`">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="asowp-w-4 asowp-h-4">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                    </div>
                    <div class="asowp-flex asowp-flex-col asowp-w-full asowp-space-y-2 asowp-text-[11px] asowp-text-[#444444]">
                        <label class="">{{ __('Change icon image', 'all-signs-options-pro') }}</label>
                        <div class="asowp-flex asowp-w-full asowp-space-x-2">
                            <button @click="selectChangeIconImage" class="asowp-bg-[#016464] asowp-border-none asowp-w-fit asowp-h-fit asowp-p-4 asowp-rounded asowp-px-4 asowp-text-white asowp-opacity-90 hover:asowp-opacity-100 asowp-text-[10px] asowp-cursor-pointer">{{ __('Upload icon', 'all-signs-options-pro') }}</button>
                            <div :class="`asowp-relative asowp-w-[82px] asowp-h-[49px] asowp-rounded-md asowp-overflow-hidden`">
                                <img v-if="images.changeIconImage != ''" :src="images.changeIconImage" alt="" class="asowp-absolute asowp-w-full asowp-h-full">
                                <button v-if="images.changeIconImage != ''" @click="()=>{images.changeIconImage = ''}" :class="`asowp-bg-[#016464] asowp-absolute asowp-bottom-0 asowp-right-0 asowp-text-white asowp-p-1 asowp-rounded-tl-lg asowp-border-none asowp-cursor-pointer`">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="asowp-w-4 asowp-h-4">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
        <div class="asowp-bg-[#F8F9FB] asowp-flex asowp-space-x-4 asowp-px-4 asowp-py-3 asowp-justify-end asowp-items-end">
            <div class="asowp-bg-[#016464] asowp-rounded">
                <button :disabled="isLoading" @click="updateImagesSettings" class="asowp-rounded asowp-flex asowp-bg-transparent asowp-w-fit asowp-space-x-2 asowp-h-fit asowp-text-white asowp-px-12 asowp-p-2.5 asowp-border-none asowp-opacity-90 hover:asowp-opacity-100 hover:asowp-border-none hover:asowp-text-white hover:asowp-bg-[#016464] asowp-cursor-pointerasowp-flex asowp-bg-transparent asowp-w-fit asowp-space-x-2 asowp-h-fit asowp-text-white asowp-px-12 asowp-p-2.5 asowp-border-none asowp-opacity-90 hover:asowp-opacity-100 hover:asowp-border-none hover:asowp-text-white hover:asowp-bg-[#016464] asowp-cursor-pointer">
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
            title: __("Select Image","all-signs-options-pro"),
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
            title: __("Select Image","all-signs-options-pro"),
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
            title: __("Select Image","all-signs-options-pro"),
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
            title: __("Select Image","all-signs-options-pro"),
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
            title: __("Select Image","all-signs-options-pro"),
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
            title: __("Select Image","all-signs-options-pro"),
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
            title: __("Select Image","all-signs-options-pro"),
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
            title: __("Select Image","all-signs-options-pro"),
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
            title: __("Select Image","all-signs-options-pro"),
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
            title: __("Select Image","all-signs-options-pro"),
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
            title: __("Select Image","all-signs-options-pro"),
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
            title: __("Select Image","all-signs-options-pro"),
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
            title: __("Select Image","all-signs-options-pro"),
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
            title: __("Select Image","all-signs-options-pro"),
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
            title: __("Select Image","all-signs-options-pro"),
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
            title: __("Select Image","all-signs-options-pro"),
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
            title: __("Select Image","all-signs-options-pro"),
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
            title: __("Select Image","all-signs-options-pro"),
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
                            images.value.changeIconImage = (attachment.url);
                        }
                    }
                );
            }
        )
        .open();
};

</script> 
