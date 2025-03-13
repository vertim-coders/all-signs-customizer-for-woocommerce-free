<template>
    <div class="asowp-relative asowp-w-full asowp-h-full">

        <div :class="`asowp-w-full asowp-h-full asowp-flex asowp-flex-col lg:asowp-flex-row-reverse`">
            <div class="asowp-w-full lg:asowp-w-[92%] asowp-h-[54%] lg:asowp-h-full asowp-flex asowp-flex-col">
                <div :class="`asowp-w-full asowp-h-[9%] lg:asowp-h-[10%] asowp-bg-[${configColors.bars.backgroundColor}] asowp-text-[${configColors.bars.titleColor}] asowp-flex asowp-items-center asowp-justify-between`">
                    <div v-if="isLoaded" class="asowp-w-full asowp-h-full asowp-flex asowp-items-center asowp-justify-between asowp-px-2">
                        <div class="asowp-w-1/5 asowp-bg-gradient-to-r asowp-from-zinc-400 asowp-via-zinc-200 asowp-to-zinc-400 asowp-p-4 asowp-h-[65%] asowp-animate-pulse"></div>
                        <div class="asowp-w-1/3 asowp-h-[65%] asowp-flex asowp-space-x-4">
                            <div class="asowp-w-1/3 asowp-bg-gradient-to-r asowp-from-zinc-400 asowp-via-zinc-200 asowp-to-zinc-400 asowp-p-4 asowp-h-full asowp-animate-pulse"></div>
                            <div class="asowp-w-1/3 asowp-bg-gradient-to-r asowp-from-zinc-400 asowp-via-zinc-200 asowp-to-zinc-400 asowp-p-4 asowp-h-full asowp-animate-pulse"></div>
                            <div class="asowp-w-1/3 asowp-bg-gradient-to-r asowp-from-zinc-400 asowp-via-zinc-200 asowp-to-zinc-400 asowp-p-4 asowp-h-full asowp-animate-pulse"></div>
                        </div>
                        <div class="asowp-w-1/5 asowp-bg-gradient-to-r asowp-from-zinc-400 asowp-via-zinc-200 asowp-to-zinc-400 asowp-p-4 asowp-h-[65%] asowp-animate-pulse"></div>
                    </div>
                    
                    <div @click="centerSign(canvas)" v-show="!isLoaded" :class="`asowp-hidden lg:asowp-flex asowp-w-1/3 asowp-justify-center asowp-text-[${configColors.bars.titleColor}] asowp-text-base lg:asowp-text-2xl asowp-font-bold asowp-text-center`">
                        {{ configVisualiserTexts.titleHeader && configVisualiserTexts.titleHeader.trim() !== '' ? configVisualiserTexts.titleHeader : props.config.name }}
                    </div>
                    <div @click="() => showStateButtons = !showStateButtons" v-show="!isLoaded" :class="`asowp-relative asowp-flex lg:asowp-hidden asowp-w-1/3 asowp-pl-2 asowp-justify-start asowp-text-[${configColors.bars.titleColor}]`">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="asowp-w-6 asowp-h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>

                        <div v-if="showStateButtons" :class="`asowp-absolute asowp-bottom-0 asowp-translate-y-[110%] asowp-z-10 asowp-flex asowp-bg-[${configColors.bars.backgroundColor}] asowp-fit asowp-full-center asowp-space-x-3 asowp-px-2`">
                            <span @click="confirmResetAll(true)" :class="`asowp-w-fit asowp-h-fit asowp-flex asowp-full-center asowp-shadow-[1px_1px_7px_1px_rgba(0,0,0,0.1)] asowp-bg-[${configColors.bars.reset.backgroundColor}] asowp-text-[${configColors.bars.reset.textColor}] hover:asowp-bg-[${configColors.bars.reset.hoverBackgroundColor}] hover:asowp-text-[${configColors.bars.reset.hoverTextColor}] asowp-border-2 asowp-border-[${configColors.bars.reset.borderColor}] hover:asowp-border-[${configColors.bars.reset.hoverBorderColor}] asowp-space-x-2 asowp-p-2 asowp-px-3 asowp-rounded-full asowp-base-animation asowp-cursor-pointer`">
                                <svg v-if="configSectionIcons.resetAllIcon === '' " class="asowp-h-5 asowp-w-5" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g id="simple-line-icons:reload">
                                    <path id="Vector" d="M14.9789 0C7.48448 0 1.38745 6.09744 1.38745 13.5918C1.38745 20.6362 6.81604 26.5274 13.7967 27.1298L11.1056 28.4938C10.7732 28.6762 10.5754 29.0863 10.7723 29.4102L10.8675 29.6563C11.0653 29.9802 11.4937 30.0951 11.8251 29.9136L16.3166 27.6139C16.3223 27.6102 16.3284 27.6112 16.334 27.6074L16.6354 27.4424C16.8018 27.351 16.912 27.2015 16.956 27.0351C17.002 26.8687 16.9809 26.6835 16.882 26.5223L16.7034 26.2293C16.7006 26.2237 16.695 26.2199 16.6917 26.2148L13.9176 21.8798C13.7207 21.5559 13.2932 21.441 12.96 21.6224L12.742 21.7743C12.4096 21.9557 12.3876 22.4245 12.5845 22.7475L14.2214 25.2867C14.2125 25.2862 14.2045 25.2829 14.196 25.2825C8.06477 24.8803 3.26242 19.7442 3.26242 13.5919C3.26245 7.13109 8.51852 1.875 14.9789 1.875C21.4401 1.875 26.7257 7.13109 26.7257 13.5919C26.7257 17.3119 25.0171 20.7286 22.0382 22.966C21.6244 23.2772 21.5409 23.8651 21.8517 24.279C22.163 24.6938 22.7508 24.7763 23.1647 24.4655C26.6199 21.8701 28.6012 17.9068 28.6012 13.5919C28.6007 6.09753 22.4737 0 14.9789 0Z" fill="currentColor"/>
                                    </g>
                                </svg>
                                <img v-if="configSectionIcons.resetAllIcon !== '' " :src="configSectionIcons.resetAllIcon" class="asowp-w-5 asowp-h-5" />                            
                            </span>

                            <span @click="undo" :class="`asowp-w-fit asowp-h-fit asowp-flex asowp-full-center asowp-shadow-[1px_1px_7px_1px_rgba(0,0,0,0.1)] asowp-p-2 asowp-rounded-full asowp-bg-[${configColors.bars.undoRedo.backgroundColor}] asowp-text-[${configColors.bars.undoRedo.textColor}] hover:asowp-bg-[${configColors.bars.undoRedo.hoverBackgroundColor}] hover:asowp-text-[${configColors.bars.undoRedo.hoverTextColor}] asowp-border-2 asowp-border-[${configColors.bars.undoRedo.borderColor}] hover:asowp-border-[${configColors.bars.undoRedo.hoverBorderColor}] asowp-base-animation asowp-cursor-pointer`">
                                <svg v-if="configSectionIcons.undoIcon === '' " xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="asowp-w-4 asowp-h-4 lg:asowp-w-5 lg:asowp-h-5">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                                </svg>
                                <img v-if="configSectionIcons.undoIcon !== '' " :src="configSectionIcons.undoIcon" class="asowp-w-4 asowp-h-4 lg:asowp-w-5 lg:asowp-h-5" />                            
                            </span>

                            <span @click="redo" :class="`asowp-w-fit asowp-h-fit asowp-flex asowp-full-center asowp-shadow-[1px_1px_7px_1px_rgba(0,0,0,0.1)] asowp-p-2 asowp-rounded-full asowp-bg-[${configColors.bars.undoRedo.backgroundColor}] asowp-text-[${configColors.bars.undoRedo.textColor}] hover:asowp-bg-[${configColors.bars.undoRedo.hoverBackgroundColor}] hover:asowp-text-[${configColors.bars.undoRedo.hoverTextColor}] asowp-border-2 asowp-border-[${configColors.bars.undoRedo.borderColor}] hover:asowp-border-[${configColors.bars.undoRedo.hoverBorderColor}] asowp-base-animation asowp-cursor-pointer`">
                                <svg v-if="configSectionIcons.redoIcon === '' " xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="asowp-w-4 asowp-h-4 lg:asowp-w-5 lg:asowp-h-5">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m15 15 6-6m0 0-6-6m6 6H9a6 6 0 0 0 0 12h3" />
                                </svg>
                                <img v-if="configSectionIcons.redoIcon !== '' " :src="configSectionIcons.icon" class="asowp-w-4 asowp-h-4 lg:asowp-w-5 lg:asowp-h-5" />                            
                            </span>

                            <span @click="showConfigRender()" :class="`asowp-flex asowp-p-1.5 asowp-full-center asowp-cursor-pointer asowp-rounded-full asowp-bg-[${configColors.bars.preview.backgroundColor}] asowp-text-[${configColors.bars.preview.textColor}] hover:asowp-bg-[${configColors.bars.preview.hoverBackgroundColor}] hover:asowp-text-[${configColors.bars.preview.hoverTextColor}] asowp-border-2 asowp-border-[${configColors.bars.preview.borderColor}] hover:asowp-border-[${configColors.bars.preview.hoverBorderColor}]`">
                                <svg v-if="configSectionIcons.changeIconPreview === '' " xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="asowp-w-4 asowp-h-4">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                </svg>
                                <img v-if="configSectionIcons.changeIconPreview !== '' " :src="configSectionIcons.changeIconPreview" class="asowp-w-5 asowp-h-5" />                                                            
                            </span>

                            <span v-if="configImageSettings.enableDownloadImage" @click="downLoadConfigRender()" :class="`asowp-flex asowp-p-1.5 asowp-full-center asowp-cursor-pointer asowp-rounded-full asowp-bg-[${configColors.bars.preview.backgroundColor}] asowp-text-[${configColors.bars.preview.textColor}] hover:asowp-bg-[${configColors.bars.preview.hoverBackgroundColor}] hover:asowp-text-[${configColors.bars.preview.hoverTextColor}] asowp-border-2 asowp-border-[${configColors.bars.preview.borderColor}] hover:asowp-border-[${configColors.bars.preview.hoverBorderColor}]`">
                                <svg v-if="configSectionIcons.changeIconDownload === '' " xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="asowp-w-4 asowp-h-4">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                </svg>
                                <img v-if="configSectionIcons.changeIconDownload !== '' " :src="configSectionIcons.changeIconDownload" class="asowp-w-5 asowp-h-5" />                                                            
                            </span>

                            <span v-if="props.config.data.settings.languageImages.uploadDesign.helpContent != ''" @click="()=> showHelpSection = !showHelpSection" :class="`asowp-flex asowp-p-1.5 asowp-full-center asowp-cursor-pointer asowp-rounded-full asowp-bg-[${configColors.bars.help.backgroundColor}] asowp-text-[${configColors.bars.help.textColor}] hover:asowp-bg-[${configColors.bars.help.hoverBackgroundColor}] hover:asowp-text-[${configColors.bars.help.hoverTextColor}] asowp-border-2 asowp-border-[${configColors.bars.help.borderColor}] hover:asowp-border-[${configColors.bars.help.hoverBorderColor}]`">
                                <svg v-if="configSectionIcons.changeIconHelp === '' " viewBox="0 0 30 31" fill="none" xmlns="http://www.w3.org/2000/svg" class="asowp-w-4 asowp-h-4">
                                    <path d="M9.375 9.92967C9.375 9.92967 9.45937 7.93162 11.3402 6.32955C12.457 5.37836 13.7982 5.10287 15 5.08592C16.0975 5.07199 17.0783 5.26392 17.6648 5.55939C18.6674 6.06677 20.625 7.30193 20.625 9.92967C20.625 12.6948 18.9152 13.9482 16.9717 15.3292C15.0281 16.7103 14.5312 18.0647 14.5312 19.6172" stroke="currentColor" stroke-width="3" stroke-miterlimit="10" stroke-linecap="round"/>
                                    <path d="M14.5312 26.1556C15.5668 26.1556 16.4062 25.2882 16.4062 24.2181C16.4062 23.1481 15.5668 22.2806 14.5312 22.2806C13.4957 22.2806 12.6562 23.1481 12.6562 24.2181C12.6562 25.2882 13.4957 26.1556 14.5312 26.1556Z" fill="currentColor"/>
                                </svg>
                                <img v-if="configSectionIcons.changeIconHelp !== '' " :src="configSectionIcons.changeIconHelp" class="asowp-w-4 asowp-h-4" />                                                            
                            </span>

                            <a v-if="props.config.data.settings.languageImages.uploadDesign.activate" :href="props.config.data.settings.languageImages.uploadDesign.link" :class="`asowp-flex asowp-p-1.5 asowp-full-center asowp-cursor-pointer asowp-rounded-full asowp-bg-[${configColors.bars.preview.backgroundColor}] asowp-text-[${configColors.bars.preview.textColor}] hover:asowp-bg-[${configColors.bars.preview.hoverBackgroundColor}] hover:asowp-text-[${configColors.bars.preview.hoverTextColor}] asowp-border-2 asowp-border-[${configColors.bars.preview.borderColor}] hover:asowp-border-[${configColors.bars.preview.hoverBorderColor}]`">
                                <svg v-if="configSectionIcons.changeIconImport === '' " xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="asowp-w-4 asowp-h-4">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                                </svg>
                                <img v-if="configSectionIcons.changeIconImport !== '' " :src="configSectionIcons.changeIconImport" class="asowp-w-4 asowp-h-4" />                                                            
                            </a>
                        </div>
                    </div>
    
                    <div v-show="!isLoaded" class="asowp-hidden lg:asowp-flex asowp-w-1/3 asowp-full-center asowp-space-x-4">
                        <span @click="confirmResetAll(true)" :class="`asowp-w-fit asowp-h-fit asowp-flex asowp-full-center asowp-shadow-[1px_1px_7px_1px_rgba(0,0,0,0.1)] asowp-bg-[${configColors.bars.reset.backgroundColor}] asowp-text-[${configColors.bars.reset.textColor}] hover:asowp-bg-[${configColors.bars.reset.hoverBackgroundColor}] hover:asowp-text-[${configColors.bars.reset.hoverTextColor}] asowp-border-2 asowp-border-[${configColors.bars.reset.borderColor}] hover:asowp-border-[${configColors.bars.reset.hoverBorderColor}] asowp-space-x-2 asowp-p-2 asowp-px-3 asowp-rounded-full asowp-base-animation asowp-cursor-pointer`">
                            <svg v-if="configSectionIcons.resetAllIcon === '' " class="asowp-h-5 asowp-w-5" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g id="simple-line-icons:reload">
                                <path id="Vector" d="M14.9789 0C7.48448 0 1.38745 6.09744 1.38745 13.5918C1.38745 20.6362 6.81604 26.5274 13.7967 27.1298L11.1056 28.4938C10.7732 28.6762 10.5754 29.0863 10.7723 29.4102L10.8675 29.6563C11.0653 29.9802 11.4937 30.0951 11.8251 29.9136L16.3166 27.6139C16.3223 27.6102 16.3284 27.6112 16.334 27.6074L16.6354 27.4424C16.8018 27.351 16.912 27.2015 16.956 27.0351C17.002 26.8687 16.9809 26.6835 16.882 26.5223L16.7034 26.2293C16.7006 26.2237 16.695 26.2199 16.6917 26.2148L13.9176 21.8798C13.7207 21.5559 13.2932 21.441 12.96 21.6224L12.742 21.7743C12.4096 21.9557 12.3876 22.4245 12.5845 22.7475L14.2214 25.2867C14.2125 25.2862 14.2045 25.2829 14.196 25.2825C8.06477 24.8803 3.26242 19.7442 3.26242 13.5919C3.26245 7.13109 8.51852 1.875 14.9789 1.875C21.4401 1.875 26.7257 7.13109 26.7257 13.5919C26.7257 17.3119 25.0171 20.7286 22.0382 22.966C21.6244 23.2772 21.5409 23.8651 21.8517 24.279C22.163 24.6938 22.7508 24.7763 23.1647 24.4655C26.6199 21.8701 28.6012 17.9068 28.6012 13.5919C28.6007 6.09753 22.4737 0 14.9789 0Z" fill="currentColor"/>
                                </g>
                            </svg>
                            <img v-if="configSectionIcons.resetAllIcon !== '' " :src="configSectionIcons.resetAllIcon" class="asowp-w-5 asowp-h-5" />                            
                            
                            <div class="asowp-hidden lg:asowp-flex asowp-text-center">
                                {{ configVisualiserTexts.textButtonRefresh && configVisualiserTexts.textButtonRefresh.trim() !== '' ? configVisualiserTexts.textButtonRefresh : 'Reset All' }} 
                            </div>
                        </span>
                            
                        <div class="asowp-flex asowp-full-center asowp-space-x-4">
                            <div class="asowp-flex asowp-full-center asowp-space-x-2">
                                <span @click="undo" :class="`asowp-w-fit asowp-h-fit asowp-flex asowp-full-center asowp-shadow-[1px_1px_7px_1px_rgba(0,0,0,0.1)] asowp-p-2 asowp-rounded-full asowp-bg-[${configColors.bars.undoRedo.backgroundColor}] asowp-text-[${configColors.bars.undoRedo.textColor}] hover:asowp-bg-[${configColors.bars.undoRedo.hoverBackgroundColor}] hover:asowp-text-[${configColors.bars.undoRedo.hoverTextColor}] asowp-border-2 asowp-border-[${configColors.bars.undoRedo.borderColor}] hover:asowp-border-[${configColors.bars.undoRedo.hoverBorderColor}] asowp-base-animation asowp-cursor-pointer`">
                                    <svg v-if="configSectionIcons.undoIcon === '' " xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="asowp-w-4 asowp-h-4 lg:asowp-w-5 lg:asowp-h-5">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                                    </svg>
                                    <img v-if="configSectionIcons.undoIcon !== '' " :src="configSectionIcons.undoIcon" class="asowp-w-4 asowp-h-4 lg:asowp-w-5 lg:asowp-h-5" />                            
                                </span>
                                <div class="asowp-hidden lg:asowp-flex asowp-text-sm">
                                    {{ configVisualiserTexts.textButtonBack && configVisualiserTexts.textButtonBack.trim() !== '' ? configVisualiserTexts.textButtonBack : 'Undo' }}
                                </div>
                            </div>
    
                            <div class="asowp-flex asowp-full-center asowp-space-x-2">
                                <span @click="redo" :class="`asowp-w-fit asowp-h-fit asowp-flex asowp-full-center asowp-shadow-[1px_1px_7px_1px_rgba(0,0,0,0.1)] asowp-p-2 asowp-rounded-full asowp-bg-[${configColors.bars.undoRedo.backgroundColor}] asowp-text-[${configColors.bars.undoRedo.textColor}] hover:asowp-bg-[${configColors.bars.undoRedo.hoverBackgroundColor}] hover:asowp-text-[${configColors.bars.undoRedo.hoverTextColor}] asowp-border-2 asowp-border-[${configColors.bars.undoRedo.borderColor}] hover:asowp-border-[${configColors.bars.undoRedo.hoverBorderColor}] asowp-base-animation asowp-cursor-pointer`">
                                    <svg v-if="configSectionIcons.redoIcon === '' " xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="asowp-w-4 asowp-h-4 lg:asowp-w-5 lg:asowp-h-5">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="m15 15 6-6m0 0-6-6m6 6H9a6 6 0 0 0 0 12h3" />
                                    </svg>
                                    <img v-if="configSectionIcons.redoIcon !== '' " :src="configSectionIcons.redoIcon" class="asowp-w-4 asowp-h-4 lg:asowp-w-5 lg:asowp-h-5" />                            
                                </span>
                                <div class="asowp-hidden lg:asowp-flex asowp-text-sm">
                                    {{ configVisualiserTexts.textButtonNext && configVisualiserTexts.textButtonNext.trim() !== '' ? configVisualiserTexts.textButtonNext : 'Redo' }}
                                </div>
                            </div>
                        </div>
                    </div>
        
                    <div v-show="!isLoaded" class="asowp-flex asowp-flex-wrap asowp-gap-2 asowp-w-2/3 lg:asowp-w-1/3 asowp-items-center asowp-justify-end">
                        <div id="asowp-editButtons" :class="`asowp-bg-[${configColors.objectsOptions.backgroundColor}] asowp-hidden lg:asowp-flex asowp-full-center asowp-space-x-1 asowp-p-2 asowp-px-3 asowp-rounded-lg`">
                            <div @click="editObject()" id="asowp-editObject" :class="`${(activeCanvas !== null && (activeCanvas.getActiveObject() !== undefined && activeCanvas.getActiveObject() !== null)) ? `asowp-cursor-pointer` : `asowp-cursor-not-allowed` } asowp-flex asowp-full-center asowp-space-x-1 asowp-bg-[${configColors.objectsOptions.edit.buttonColor}] asowp-text-[${configColors.objectsOptions.edit.textColor}] hover:asowp-bg-[${configColors.objectsOptions.edit.hoverButtonColor}] hover:asowp-text-[${configColors.objectsOptions.edit.hoverTextColor}] asowp-base-animation asowp-px-1 asowp-rounded-md`">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="asowp-w-5 asowp-h-5">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                </svg>
                                <p class="asowp-text-[10px] asowp-font-semibold">{{ configVisualiserTexts.textCanvasEdit && configVisualiserTexts.textCanvasEdit.trim() !== '' ? configVisualiserTexts.textCanvasEdit : 'Edit' }}</p>
                            </div>

                            <div @click="cloneObject()" :class="`${(activeCanvas !== null && (activeCanvas.getActiveObject() !== undefined && activeCanvas.getActiveObject() !== null)) ? `asowp-cursor-pointer` : `asowp-cursor-not-allowed` } asowp-flex asowp-full-center asowp-space-x-1 asowp-bg-[${configColors.objectsOptions.clone.buttonColor}] asowp-text-[${configColors.objectsOptions.clone.textColor}] hover:asowp-bg-[${configColors.objectsOptions.clone.hoverButtonColor}] hover:asowp-text-[${configColors.objectsOptions.clone.hoverTextColor}] asowp-base-animation asowp-px-1 asowp-rounded-md`">
                                <svg viewBox="0 0 36 37" fill="none" xmlns="http://www.w3.org/2000/svg" class="asowp-w-5 asowp-h-5">
                                    <g clip-path="url(#clip0_65_739)">
                                        <path d="M6 6.5H22V10.5H24V6.5C24 5.96957 23.7893 5.46086 23.4142 5.08579C23.0391 4.71071 22.5304 4.5 22 4.5H6C5.46957 4.5 4.96086 4.71071 4.58579 5.08579C4.21071 5.46086 4 5.96957 4 6.5V22.5C4 23.0304 4.21071 23.5391 4.58579 23.9142C4.96086 24.2893 5.46957 24.5 6 24.5H10V22.5H6V6.5Z" fill="currentColor"/>
                                        <path d="M30 12.5H14C13.4696 12.5 12.9609 12.7107 12.5858 13.0858C12.2107 13.4609 12 13.9696 12 14.5V30.5C12 31.0304 12.2107 31.5391 12.5858 31.9142C12.9609 32.2893 13.4696 32.5 14 32.5H30C30.5304 32.5 31.0391 32.2893 31.4142 31.9142C31.7893 31.5391 32 31.0304 32 30.5V14.5C32 13.9696 31.7893 13.4609 31.4142 13.0858C31.0391 12.7107 30.5304 12.5 30 12.5ZM30 30.5H14V14.5H30V30.5Z" fill="currentColor"/>
                                        <path d="M21 28.5H23V23.5H28V21.5H23V16.5H21V21.5H16V23.5H21V28.5Z" fill="currentColor"/>
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_65_739">
                                            <rect width="36" height="36" fill="none" transform="translate(0 0.5)"/>    
                                        </clipPath>
                                    </defs>
                                </svg>
                                <p class="asowp-text-[11px] asowp-font-semibold">{{ configVisualiserTexts.textCanvasClone && configVisualiserTexts.textCanvasClone.trim() !== '' ? configVisualiserTexts.textCanvasClone : 'Clone' }}</p>
                            </div>
    
                            <div @click="deleteObject()" :class="`${(activeCanvas !== null && (activeCanvas.getActiveObject() !== undefined && activeCanvas.getActiveObject() !== null)) ? `asowp-cursor-pointer` : `asowp-cursor-not-allowed` } asowp-flex asowp-full-center asowp-space-x-1 asowp-bg-[${configColors.objectsOptions.delete.buttonColor}] asowp-text-[${configColors.objectsOptions.delete.textColor}] hover:asowp-bg-[${configColors.objectsOptions.delete.hoverButtonColor}] hover:asowp-text-[${configColors.objectsOptions.delete.hoverTextColor}] asowp-base-animation asowp-px-1 asowp-rounded-md`">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="asowp-w-5 asowp-h-5">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                </svg>
                                <p class="asowp-text-[11px] asowp-font-semibold">{{ configVisualiserTexts.textCanvasDelete && configVisualiserTexts.textCanvasDelete.trim() !== '' ? configVisualiserTexts.textCanvasDelete : 'Delete' }}</p>
                            </div>
    
                            <div @click="centerVertically()" :class="`${(activeCanvas !== null && (activeCanvas.getActiveObject() !== undefined && activeCanvas.getActiveObject() !== null)) ? `asowp-cursor-pointer` : `asowp-cursor-not-allowed` } asowp-flex asowp-full-center asowp-space-x-1 asowp-bg-[${configColors.objectsOptions.center.buttonColor}] asowp-text-[${configColors.objectsOptions.center.textColor}] hover:asowp-bg-[${configColors.objectsOptions.center.hoverButtonColor}] hover:asowp-text-[${configColors.objectsOptions.center.hoverTextColor}] asowp-base-animation asowp-px-1 asowp-rounded-md`">
                                <svg focusable="false" viewBox="0 0 24 24" class="asowp-w-5 asowp-h-5">
                                    <path d="M11 3a1 1 0 1 1 2 0v2.586l1.293-1.293a1 1 0 0 1 1.414 1.414l-3 3a1 1 0 0 1-1.414 0l-3-3a1 1 0 0 1 1.414-1.414L11 5.586V3zM9.707 19.707a1 1 0 0 1-1.414-1.414l3-3a1 1 0 0 1 1.414 0l3 3a1 1 0 0 1-1.414 1.414L13 18.414V21a1 1 0 1 1-2 0v-2.586l-1.293 1.293zM4 11a1 1 0 1 0 0 2h16a1 1 0 1 0 0-2H4z" fill="currentColor"></path>
                                </svg>
                                <p class="asowp-text-[11px] asowp-font-semibold">{{ configVisualiserTexts.textCanvasCenterV && configVisualiserTexts.textCanvasCenterV.trim() !== '' ? configVisualiserTexts.textCanvasCenterV : 'CenterV' }}</p>
                            </div>
    
                            <div @click="centerHorizontally()" :class="`${(activeCanvas !== null && (activeCanvas.getActiveObject() !== undefined && activeCanvas.getActiveObject() !== null)) ? `asowp-cursor-pointer` : `asowp-cursor-not-allowed` } asowp-flex asowp-full-center asowp-space-x-1 asowp-bg-[${configColors.objectsOptions.center.buttonColor}] asowp-text-[${configColors.objectsOptions.center.textColor}] hover:asowp-bg-[${configColors.objectsOptions.center.hoverButtonColor}] hover:asowp-text-[${configColors.objectsOptions.center.hoverTextColor}] asowp-base-animation asowp-px-1 asowp-rounded-md`">
                                <svg focusable="false" viewBox="0 0 24 24" class="asowp-w-5 asowp-h-5">
                                    <path d="M22 11a1 1 0 1 1 0 2h-3.586l1.293 1.293a1 1 0 0 1-1.414 1.414l-3-3a1 1 0 0 1 0-1.414l3-3a1 1 0 0 1 1.414 1.414L18.414 11H22zM4.293 9.707a1 1 0 0 1 1.414-1.414l3 3a1 1 0 0 1 0 1.414l-3 3a1 1 0 0 1-1.414-1.414L5.586 13H2a1 1 0 1 1 0-2h3.586L4.293 9.707zM13 4a1 1 0 1 0-2 0v16a1 1 0 1 0 2 0V4z" fill="currentColor"></path>
                                </svg>
                                <p class="asowp-text-[11px] asowp-font-semibold">{{ configVisualiserTexts.textCanvasCenterH && configVisualiserTexts.textCanvasCenterH.trim() !== '' ? configVisualiserTexts.textCanvasCenterH : 'CenterH' }}</p>
                            </div>
                        </div>
                        
                        <div :class="`asowp-flex lg:asowp-hidden asowp-text-center asowp-text-lg asowp-font-semibold asowp-text-[${configColors.bars.price.textBeforeColor}]`">
                            {{configVisualiserTexts.textBeforePrice}}
                        </div>
                        <div :class="`asowp-flex lg:asowp-hidden asowp-text-lg lg:asowp-text-3xl asowp-font-bold asowp-text-center asowp-text-[${configColors.bars.price.textColor}]`">
                            {{formatPrice(finalPrices)}} 
                        </div>
                        <div :class="`asowp-flex lg:asowp-hidden asowp-text-center asowp-text-lg asowp-font-semibold asowp-text-[${configColors.bars.price.textAfterColor}]`">
                            {{configVisualiserTexts.textAfterPrice}}
                        </div>
                    </div>
                </div>
        
                <div :class="`asowp-relative asowp-w-full asowp-h-[91%] lg:asowp-h-[90%] asowp-flex asowp-flex-col asowp-items-center asowp-bg-[${configColors.canvas.backgroundColor}]`">
                    <div v-show="configDoublePart.active" class="asowp-w-full asowp-h-[6%] asowp-flex asowp-items-center asowp-bg-white asowp-space-x-3 asowp-px-4 asowp-border-y">
                        <span class="asowp-text-sm asowp-font-medium">{{configDoublePart.label}}</span>
    
                        <span @click="flipRect" :class="`asowp-mx-2 asowp-rounded-full asowp-p-1.5 asowp-font-medium asowp-h-[80%] asowp-w-fit asowp-bg-[${configColors.backgroundColorHeader}]/30 asowp-relative asowp-flex asowp-justify-between asowp-items-center asowp-border asowp-cursor-pointer`">
                            <span :class="`${activeFace === 'front-face' ? 'asowp-left-[3%]' : 'asowp-translate-x-[100%] asowp-right-[53%]'} asowp-bg-[${configColors.backgroundButton}] asowp-translate-x asowp-absolute asowp-w-[50%] asowp-h-[90%] asowp-transition-all ease-in duration-200 z-0 asowp-rounded-full asowp-top-[5%]`"></span>
                            
                            <span :class="`${activeFace === 'front-face' ? `asowp-text-[${configColors.textColorButton}]` : `asowp-text-[${configColors.textColorHoverButton}]`} asowp-flex asowp-full-center asowp-pr-1 asowp-z-10`">
                                {{configDoublePart.part1}}
                            </span>
                            <span :class="`${activeFace !== 'front-face' ? `asowp-text-[${configColors.textColorButton}]` : `asowp-text-[${configColors.textColorHoverButton}]`} asowp-flex asowp-full-center asowp-pl-1 asowp-z-10`">
                                {{configDoublePart.part2}}
                            </span>
                        </span>
                    </div>
    
                    <div id="asowp-canvas-containers" :class="`flipper asowp-relative asowp-w-full asowp-h-full lg:asowp-h-[90%]`">
                        <div v-if="isLoaded" class="asowp-absolute asowp-top-[50%] asowp-left-[50%] asowp-translate-x-[-50%] asowp-translate-y-[-50%] asowp-w-[50%] asowp-h-[50%] asowp-bg-gradient-to-r asowp-from-zinc-400 asowp-via-zinc-200 asowp-to-zinc-400 asowp-p-4 asowp-animate-pulse"></div>
    
                        <div id="asowp-sign-recto" class="asowp-relative asowp-w-full asowp-h-full">
                            <canvas  ref="canvasFace1Ref" id="canvaas" class="asowp-relative asowp-w-full asowp-h-full"></canvas>
                        </div>
    
                        <div id="asowp-sign-verso" class="asowp-absolute asowp-left-0 asowp-top-0">
                            <canvas ref="canvasFace2Ref" class="canvas2 asowp-w-full asowp-h-full"></canvas>
                        </div>
                    </div>
    
                    <div v-show="!isLoaded">
                        <div id="activeObject-values" class="asowp-w-[80%] lg:asowp-w-fit asowp-invisible asowp-absolute asowp-top-[2%] asowp-left-[50%] asowp-translate-x-[-50%] asowp-bg-[#828282]/60 asowp-text-white asowp-text-lg asowp-p-2 asowp-px-3 asowp-rounded-md asowp-shadow-md asowp-z-10">
                            <div class="asowp-space-y-1 asowp-text-sm">
                                <div>
                                    <span class="asowp-font-semibold">{{ configVisualiserTexts.textSize && configVisualiserTexts.textSize.trim() !== '' ? configVisualiserTexts.textSize : 'Size' }}:</span> {{ configVisualiserTexts.textWidth && configVisualiserTexts.textWidth.trim() !== '' ? configVisualiserTexts.textWidth : 'Width' }}: <span id="text-width"></span> {{configUnit}},  {{ configVisualiserTexts.textHeight && configVisualiserTexts.textHeight.trim() !== '' ? configVisualiserTexts.textHeight : 'Height' }}: <span id="text-height"></span> {{configUnit}}
                                </div>
                                <div>
                                    <span class="asowp-font-semibold">{{ configVisualiserTexts.textPosition && configVisualiserTexts.textPosition.trim() !== '' ? configVisualiserTexts.textPosition : 'Position' }}:</span> {{ configVisualiserTexts.textLeft && configVisualiserTexts.textLeft.trim() !== '' ? configVisualiserTexts.textLeft : 'Left' }}: <span id="text-left"></span> {{configUnit}}, {{ configVisualiserTexts.textRight && configVisualiserTexts.textRight.trim() !== '' ? configVisualiserTexts.textRight : 'Right' }}: <span id="text-right"></span> {{configUnit}}, {{ configVisualiserTexts.textTop && configVisualiserTexts.textTop.trim() !== '' ? configVisualiserTexts.textTop : 'Top' }}: <span id="text-top"></span> {{configUnit}}, {{ configVisualiserTexts.textBottom && configVisualiserTexts.textBottom.trim() !== '' ? configVisualiserTexts.textBottom : 'Bottom' }}: <span id="text-bottom"></span> {{configUnit}}
                                </div>
                                <div v-show="angleActive">
                                    <span class="asowp-font-semibold">Angle of object:</span> <span id="text-angle"></span>
                                </div>
                            </div>
                        </div>
                    </div>
    
                    <div :class="`asowp-absolute asowp-bottom-0 asowp-w-full asowp-h-[10%] asowp-bg-[${configColors.bars.backgroundColor}]/60 asowp-hidden lg:asowp-flex asowp-full-center asowp-space-x-4`">
                        
                        <div class="asowp-w-1/3 asowp-flex asowp-justify-start asowp-items-center asowp-space-x-4 asowp-px-6">
                            <span @click="showConfigRender()" :class="`asowp-flex asowp-p-1.5 asowp-full-center asowp-cursor-pointer asowp-rounded-full asowp-bg-[${configColors.bars.preview.backgroundColor}] asowp-text-[${configColors.bars.preview.textColor}] hover:asowp-bg-[${configColors.bars.preview.hoverBackgroundColor}] hover:asowp-text-[${configColors.bars.preview.hoverTextColor}] asowp-border-2 asowp-border-[${configColors.bars.preview.borderColor}] hover:asowp-border-[${configColors.bars.preview.hoverBorderColor}] asowp-shadow-[1px_1px_7px_1px_rgba(0,0,0,0.1)]`">
                                <svg v-if="configSectionIcons.changeIconPreview === '' " xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="asowp-w-4 asowp-h-4">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                </svg>
                                <img v-if="configSectionIcons.changeIconPreview !== '' " :src="configSectionIcons.changeIconPreview" class="asowp-w-5 asowp-h-5" />                                                            
                            </span>
                            <span v-if="configImageSettings.enableDownloadImage" @click="downLoadConfigRender()" :class="`asowp-flex asowp-p-1.5 asowp-full-center asowp-cursor-pointer asowp-rounded-full asowp-bg-[${configColors.bars.preview.backgroundColor}] asowp-text-[${configColors.bars.preview.textColor}] hover:asowp-bg-[${configColors.bars.preview.hoverBackgroundColor}] hover:asowp-text-[${configColors.bars.preview.hoverTextColor}] asowp-border-2 asowp-border-[${configColors.bars.preview.borderColor}] hover:asowp-border-[${configColors.bars.preview.hoverBorderColor}] asowp-shadow-[1px_1px_7px_1px_rgba(0,0,0,0.1)]`">
                                <svg v-if="configSectionIcons.changeIconDownload === '' " xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="asowp-w-4 asowp-h-4">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                </svg>
                                <img v-if="configSectionIcons.changeIconDownload !== '' " :src="configSectionIcons.changeIconDownload" class="asowp-w-5 asowp-h-5" />
                            </span>
                            <span v-if="props.config.data.settings.languageImages.uploadDesign.helpContent != ''" @click="()=> showHelpSection = !showHelpSection" :class="`asowp-flex asowp-p-1.5 asowp-full-center asowp-cursor-pointer asowp-rounded-full asowp-bg-[${configColors.bars.help.backgroundColor}] asowp-text-[${configColors.bars.help.textColor}] hover:asowp-bg-[${configColors.bars.help.hoverBackgroundColor}] hover:asowp-text-[${configColors.bars.help.hoverTextColor}] asowp-border-2 asowp-border-[${configColors.bars.help.borderColor}] hover:asowp-border-[${configColors.bars.help.hoverBorderColor}] asowp-shadow-[1px_1px_7px_1px_rgba(0,0,0,0.1)]`">
                                <svg v-if="configSectionIcons.changeIconHelp === '' " viewBox="0 0 30 31" fill="none" xmlns="http://www.w3.org/2000/svg" class="asowp-w-4 asowp-h-4">
                                    <path d="M9.375 9.92967C9.375 9.92967 9.45937 7.93162 11.3402 6.32955C12.457 5.37836 13.7982 5.10287 15 5.08592C16.0975 5.07199 17.0783 5.26392 17.6648 5.55939C18.6674 6.06677 20.625 7.30193 20.625 9.92967C20.625 12.6948 18.9152 13.9482 16.9717 15.3292C15.0281 16.7103 14.5312 18.0647 14.5312 19.6172" stroke="currentColor" stroke-width="3" stroke-miterlimit="10" stroke-linecap="round"/>
                                    <path d="M14.5312 26.1556C15.5668 26.1556 16.4062 25.2882 16.4062 24.2181C16.4062 23.1481 15.5668 22.2806 14.5312 22.2806C13.4957 22.2806 12.6562 23.1481 12.6562 24.2181C12.6562 25.2882 13.4957 26.1556 14.5312 26.1556Z" fill="currentColor"/>
                                </svg>
                                <img v-if="configSectionIcons.changeIconHelp !== '' " :src="configSectionIcons.changeIconHelp" class="asowp-w-5 asowp-h-5" />
                            </span>
                            <a v-if="props.config.data.settings.languageImages.uploadDesign.activate" :href="props.config.data.settings.languageImages.uploadDesign.link" :class="`asowp-flex asowp-p-1.5 asowp-full-center asowp-cursor-pointer asowp-rounded-full asowp-bg-[${configColors.bars.preview.backgroundColor}] asowp-text-[${configColors.bars.preview.textColor}] hover:asowp-bg-[${configColors.bars.preview.hoverBackgroundColor}] hover:asowp-text-[${configColors.bars.preview.hoverTextColor}] asowp-border-2 asowp-border-[${configColors.bars.preview.borderColor}] hover:asowp-border-[${configColors.bars.preview.hoverBorderColor}] asowp-shadow-[1px_1px_7px_1px_rgba(0,0,0,0.1)]`">
                                <svg v-if="configSectionIcons.changeIconImport === '' " xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="asowp-w-4 asowp-h-4">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                                </svg>
                                <img v-if="configSectionIcons.changeIconImport !== '' " :src="configSectionIcons.changeIconImport" class="asowp-w-5 asowp-h-5" />
                            </a>
                        </div>
    
                        <div class="asowp-w-2/3 asowp-h-full asowp-flex asowp-justify-end asowp-items-center">
                            <div id="asowp-price" :class="`asowp-bg-[${configColors.bars.price.backgroundColor}]  asowp-flex asowp-full-center asowp-space-x-2 asowp-h-[90%] asowp-px-2`">
                                <div :class="`asowp-text-center asowp-text-lg asowp-font-semibold asowp-text-[${configColors.bars.price.textBeforeColor}]`">
                                    {{configVisualiserTexts.textBeforePrice}}
                                </div>
                                <div :class="`asowp-flex asowp-text-[${configColors.bars.price.textColor}] asowp-text-lg lg:asowp-text-3xl asowp-font-bold asowp-text-center`">
                                    {{formatPrice(finalPrices)}}
                                </div>
                                <div :class="`asowp-text-center asowp-text-lg asowp-font-semibold asowp-text-[${configColors.bars.price.textAfterColor}]`">
                                    {{configVisualiserTexts.textAfterPrice}}
                                </div>
                            </div>
        
                            <div class="asowp-w-1/4 asowp-h-full asowp-flex asowp-justify-end">
                                <button :disabled="currentSizeData.width <= 0 || currentSizeData.height <= 0" v-show="!isLoaded" @click="finishConfig()" :class="`asowp-hidden lg:asowp-flex asowp-full-center asowp-w-[80%] asowp-h-full asowp-bg-[${configColors.recaps.buttonFinishBackgroundColor}] hover:asowp-bg-[${configColors.recaps.buttonFinishHoverBackgroundColor}] asowp-text-[${configColors.recaps.buttonFinishTextColor}] hover:asowp-text-[${configColors.recaps.buttonFinishHoverTextColor}] asowp-font-semibold asowp-p-2 asowp-px-3 asowp-base-animation asowp-cursor-pointer disabled:asowp-cursor-not-allowed asowp-buttons-rad-none`">
                                    {{ configVisualiserTexts.textButtonFinish && configVisualiserTexts.textButtonFinish.trim() !== '' ? configVisualiserTexts.textButtonFinish : 'Finish' }}
                                </button>
                            </div>
                        </div>
                    </div>

                    <div v-if="showHelpSection" :class="`asowp-absolute asowp-left-[2%] asowp-bottom-0 asowp-flex asowp-flex-col lg:asowp-translate-y-[-25%] asowp-w-[250px] lg:asowp-w-[350px] asowp-h-[50%] asowp-bg-[${configColors.optionsSideBar.options.modals.backgroundColor}] asowp-text-[${configColors.optionsSideBar.options.modals.textColor}]`">
                        <div class="asowp-flex asowp-w-full asowp-h-fit asowp-justify-end asowp-cursor-pointer">
                            <span @click="()=> showHelpSection = false" :class="`asowp-flex asowp-bg-[${configColors.optionsSideBar.options.modals.buttons.backgroundColor}] hover:asowp-bg-[${configColors.optionsSideBar.options.modals.buttons.hoverBackgroundColor}] asowp-text-[${configColors.optionsSideBar.options.modals.buttons.textColor}] hover:asowp-text-[${configColors.optionsSideBar.options.modals.buttons.hoverTextColor}] asowp-p-1 asowp-base-animation`">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="asowp-w-5 asowp-h-5">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>
                            </span>
                        </div>
                        <div v-html="props.config.data.settings.languageImages.uploadDesign.helpContent" class="asowp-flex asowp-flex-col asowp-w-full asowp-overflow-auto"></div>
                    </div>

                    <div :class="`asowp-absolute asowp-top-0 asowp-right-0 asowp-flex asowp-w-fit asowp-p-2 asowp-space-x-1`">
                        <span @click="zoomCanvas('up')" :class="`asowp-flex asowp-cursor-pointer`">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="asowp-w-5 asowp-h-5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607ZM10.5 7.5v6m3-3h-6" />
                            </svg>
                        </span>
                        <span @click="zoomCanvas('down')" :class="`asowp-flex asowp-cursor-pointer`">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="asowp-w-5 asowp-h-5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607ZM13.5 10.5h-6" />
                            </svg>
                        </span>
                    </div>
                </div>
            </div>
    
            <div id="asowp-optionsButtons-container" :class="`asowp-relative asowp-w-full asowp-h-[8%] lg:asowp-w-[8%] lg:asowp-h-full asowp-p-0 asowp-flex asowp-flex-col asowp-shadow-lg asowp-bg-[${configColors.optionsSideBar.backgroundColor}]`">
                <div v-if="isLoaded" class="asowp-w-full asowp-h-full asowp-flex asowp-flex-col">
                    <div class="asowp-h-[90%] asowp-flex asowp-full-center asowp-flex-row asowp-space-x-4 lg:asowp-space-x-0 lg:asowp-flex-col lg:asowp-space-y-4 asowp-animate-pulse">
                        <div class="asowp-w-[50px] lg:asowp-w-[80%] asowp-bg-gradient-to-r asowp-from-zinc-400 asowp-via-zinc-200 asowp-to-zinc-400 asowp-p-4 asowp-h-[90%] lg:asowp-h-[11%]"></div>
                        <div class="asowp-w-[50px] lg:asowp-w-[80%] asowp-bg-gradient-to-r asowp-from-zinc-400 asowp-via-zinc-200 asowp-to-zinc-400 asowp-p-4 asowp-h-[90%] lg:asowp-h-[11%]"></div>
                        <div class="asowp-w-[50px] lg:asowp-w-[80%] asowp-bg-gradient-to-r asowp-from-zinc-400 asowp-via-zinc-200 asowp-to-zinc-400 asowp-p-4 asowp-h-[90%] lg:asowp-h-[11%]"></div>
                        <div class="asowp-w-[50px] lg:asowp-w-[80%] asowp-bg-gradient-to-r asowp-from-zinc-400 asowp-via-zinc-200 asowp-to-zinc-400 asowp-p-4 asowp-h-[90%] lg:asowp-h-[11%]"></div>
                        <div class="asowp-w-[50px] lg:asowp-w-[80%] asowp-bg-gradient-to-r asowp-from-zinc-400 asowp-via-zinc-200 asowp-to-zinc-400 asowp-p-4 asowp-h-[90%] lg:asowp-h-[11%]"></div>
                    </div>
                </div>
    
                <div v-show="!isLoaded" id="asowp-options-buttons" class="asowp-w-full asowp-h-full asowp-flex lg:asowp-flex-col asowp-items-center lg:asowp-space-y-4 asowp-py-4 asowp-px-4 lg:asowp-px-0 asowp-overflow-auto no-scrollbar">
                    <div v-if="allMaterials.length > 1" @click="showOptions('material')" :class="`asowp-w-[80%]`">
                        <div :class="`${step === 'material' ? `asowp-bg-[${configColors.optionsSideBar.options.buttons.hoverBackgroundColor}] asowp-text-[${configColors.optionsSideBar.options.buttons.textColor}]` : ``} asowp-h-fit asowp-flex asowp-flex-col asowp-full-center asowp-space-y-1 asowp-bg-[${configColors.optionsSideBar.options.buttons.backgroundColor}] hover:asowp-bg-[${configColors.optionsSideBar.options.buttons.hoverBackgroundColor}] asowp-text-[${configColors.optionsSideBar.options.buttons.textColor}] hover:asowp-text-[${configColors.optionsSideBar.options.buttons.hoverTextColor}] asowp-px-4 asowp-py-1 asowp-rounded-lg asowp-base-animation asowp-cursor-pointer`">
                            <svg  v-if="configSectionIcons.changeIconMaterial === '' " class="asowp-w-6 asowp-h-6" viewBox="0 0 40 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g id="mdi:material">
                                <path id="Vector" d="M4.21671 33.5687L6.45004 34.5254V19.0992L2.40004 29.11C1.71671 30.8525 2.50004 32.8512 4.21671 33.5687ZM36.7167 27.2479L28.45 6.83332C28.2059 6.21413 27.79 5.68187 27.2538 5.30235C26.7177 4.92282 26.0848 4.71268 25.4334 4.69791C25 4.69791 24.55 4.76624 24.1167 4.95416L11.8334 10.1646C11.2405 10.4225 10.7323 10.8492 10.3689 11.3943C10.0056 11.9393 9.80234 12.5797 9.78337 13.2396C9.76671 13.6667 9.85004 14.1621 10 14.6062L18.3334 35.0208C18.8167 36.3533 20.05 37.1391 21.35 37.1562C21.7834 37.1562 22.2167 37.0708 22.6334 36.9L34.9 31.6896C35.7154 31.3473 36.3648 30.6872 36.7055 29.8542C37.0462 29.0213 37.0502 28.0839 36.7167 27.2479ZM13.1334 14.9479C12.6913 14.9479 12.2674 14.7679 11.9549 14.4475C11.6423 14.1272 11.4667 13.6926 11.4667 13.2396C11.4667 12.7865 11.6423 12.352 11.9549 12.0316C12.2674 11.7112 12.6913 11.5312 13.1334 11.5312C14.05 11.5312 14.8 12.3 14.8 13.2396C14.8 14.1792 14.05 14.9479 13.1334 14.9479ZM9.80004 33.7396C9.80004 34.6457 10.1512 35.5148 10.7763 36.1555C11.4015 36.7963 12.2493 37.1562 13.1334 37.1562H15.55L9.80004 22.9087V33.7396Z" fill="currentColor"/>
                                </g>
                            </svg>
                            <img v-if="configSectionIcons.changeIconMaterial !== '' " :src="configSectionIcons.changeIconMaterial" class="asowp-w-6 asowp-h-6" />
                            <div class="asowp-text-[10px] lg:asowp-text-[13px] asowp-leading-normal asowp-font-medium asowp-text-center asowp-text-nowrap lg:asowp-text-wrap">
                                {{configVisualiserTexts.textMaterial}} 
                            </div>
                        </div>
                    </div>
                    
                    <div v-if="materialType == 'advance'" v-for="(component, id) in currentMaterial.data" class="asowp-w-[80%]" >
                        <div v-if="component.options.length > 0" @click="showOptions('component', component, id)" :class="`${step === 'component' && advancedComponentId === id ? `asowp-bg-[${configColors.optionsSideBar.options.buttons.hoverBackgroundColor}] asowp-text-[${configColors.optionsSideBar.options.buttons.textColor}]` : ``} asowp-h-fit asowp-flex asowp-flex-col asowp-full-center asowp-space-y-1 asowp-bg-[${configColors.optionsSideBar.options.buttons.backgroundColor}] hover:asowp-bg-[${configColors.optionsSideBar.options.buttons.hoverBackgroundColor}] asowp-text-[${configColors.optionsSideBar.options.buttons.textColor}] hover:asowp-text-[${configColors.optionsSideBar.options.buttons.hoverTextColor}] asowp-px-4 asowp-py-1 asowp-rounded-lg asowp-base-animation asowp-cursor-pointer`">
                            <svg v-if="component.icon === '' " class="asowp-w-6 asowp-h-6" viewBox="0 0 50 50" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <g id="fluent-mdl2:product-release">
                                <path id="Vector" d="M21.875 37.5244V22.8516L6.25 15.0391V36.5234L19.5312 43.1885L18.7744 46.2891L3.125 38.4766V11.5234L23.4375 1.3916L43.75 11.5234V18.1152C42.6107 18.2943 41.569 18.6605 40.625 19.2139V15.0391L25 22.8516V34.3994L21.875 37.5244ZM18.4082 7.37305L32.666 15.5273L38.6963 12.5L23.4375 4.8584L18.4082 7.37305ZM23.4375 20.1416L29.2969 17.2119L15.0391 9.05762L8.17871 12.5L23.4375 20.1416ZM45.1172 21.875C45.8008 21.875 46.4355 21.9971 47.0215 22.2412C47.6074 22.4854 48.1283 22.819 48.584 23.2422C49.0397 23.6654 49.3815 24.1781 49.6094 24.7803C49.8372 25.3825 49.9674 26.0254 50 26.709C50 27.3438 49.8779 27.9622 49.6338 28.5645C49.3896 29.1667 49.0397 29.6956 48.584 30.1514L31.0791 47.6562L21.875 49.9512L24.1699 40.7471L41.6748 23.2666C42.1468 22.7946 42.6758 22.4447 43.2617 22.2168C43.8477 21.9889 44.4661 21.875 45.1172 21.875ZM46.3623 27.9541C46.7041 27.6123 46.875 27.1973 46.875 26.709C46.875 26.2044 46.7122 25.7975 46.3867 25.4883C46.0612 25.179 45.638 25.0163 45.1172 25C44.8893 25 44.6696 25.0326 44.458 25.0977C44.2464 25.1628 44.0592 25.2848 43.8965 25.4639L27.002 42.3584L26.1719 45.6543L29.4678 44.8242L46.3623 27.9541Z" fill="currentColor"/>
                                </g>
                            </svg>
                            <img v-if="component.icon !== '' " :src="component.icon" class="asowp-w-6 asowp-h-6" />
                            <div class="asowp-text-[10px] lg:asowp-text-[13px] asowp-leading-normal asowp-font-medium asowp-text-center asowp-text-nowrap lg:asowp-text-wrap">
                                {{component.name}}
                            </div>
                        </div>
                    </div>
    
                    <div v-if="materialType == 'simple' && (sizees.length > 0 || customSizeActive)" @click="showOptions('size')" :class="`asowp-w-[80%]`">
                        <div :class="`${step === 'size' ? `asowp-bg-[${configColors.optionsSideBar.options.buttons.hoverBackgroundColor}] asowp-text-[${configColors.optionsSideBar.options.buttons.textColor}]` : ``} asowp-h-fit asowp-flex asowp-flex-col asowp-full-center asowp-space-y-1 asowp-bg-[${configColors.optionsSideBar.options.buttons.backgroundColor}] hover:asowp-bg-[${configColors.optionsSideBar.options.buttons.hoverBackgroundColor}] asowp-text-[${configColors.optionsSideBar.options.buttons.textColor}] hover:asowp-text-[${configColors.optionsSideBar.options.buttons.hoverTextColor}] asowp-px-4 asowp-py-1 asowp-rounded-lg asowp-base-animation asowp-cursor-pointer`">
                            <svg v-if="configSectionIcons.changeIconSize === '' " class="asowp-w-6 asowp-h-6" viewBox="0 0 47 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g id="fluent:keyboard-layout-resize-24-filled">
                                <path id="Vector" d="M41.5083 17.9375C41.8623 17.9375 42.2043 18.0496 42.4711 18.2531C42.7379 18.4566 42.9115 18.7378 42.9596 19.0445L42.9733 19.2187V33.7396C42.9734 34.7135 42.5508 35.6512 41.7908 36.3632C41.0308 37.0751 39.9901 37.5081 38.8791 37.5748L38.5783 37.5833H34.6716C34.3004 37.5832 33.9431 37.4599 33.6719 37.2383C33.4007 37.0167 33.2358 36.7133 33.2105 36.3894C33.1852 36.0655 33.3014 35.7453 33.5356 35.4935C33.7699 35.2417 34.1047 35.077 34.4724 35.0328L34.6716 35.0208H38.5783C38.9323 35.0208 39.2743 34.9087 39.5411 34.7052C39.8079 34.5017 39.9815 34.2206 40.0296 33.9138L40.0433 33.7396V19.2187C40.0433 18.8789 40.1976 18.553 40.4724 18.3128C40.7471 18.0725 41.1197 17.9375 41.5083 17.9375ZM41.5083 3.41666L41.645 3.42178L41.8423 3.45082L41.9751 3.48328L42.0923 3.52257L42.2291 3.58236L42.3892 3.67461L42.5455 3.7942L42.6451 3.88986L42.733 3.99578L42.8307 4.14953L42.8639 4.21274L42.9108 4.32549C42.9323 4.3887 42.9498 4.45532 42.9596 4.52366L42.9733 4.69791V13.2396C42.9732 13.5642 42.8322 13.8767 42.5788 14.1139C42.3254 14.3511 41.9785 14.4953 41.6081 14.5175C41.2378 14.5396 40.8717 14.4379 40.5838 14.2331C40.2958 14.0282 40.1075 13.7354 40.057 13.4138L40.0433 13.2396V7.78999L31.3119 15.4262C31.0501 15.6534 30.7001 15.7858 30.3316 15.7972C29.9631 15.8085 29.6032 15.6979 29.3239 15.4875C29.0445 15.277 28.8662 14.9821 28.8244 14.6617C28.7827 14.3413 28.8807 14.0189 29.0988 13.7589L29.2413 13.6154L37.9688 5.97916H31.7416C31.3876 5.97914 31.0456 5.86702 30.7788 5.66351C30.512 5.46001 30.3384 5.17889 30.2903 4.87216L30.2766 4.69791C30.2766 4.38829 30.4048 4.08916 30.6375 3.85582C30.8702 3.62248 31.1916 3.47072 31.5424 3.42861L31.7416 3.41666H41.5083ZM25.8816 17.9375C26.9953 17.9374 28.0674 18.307 28.8815 18.9717C29.6955 19.6363 30.1906 20.5465 30.2668 21.5182L30.2766 21.7812V33.7396C30.2768 34.7135 29.8541 35.6512 29.0941 36.3632C28.3341 37.0751 27.2935 37.5081 26.1824 37.5748L25.8816 37.5833H8.30162C7.18797 37.5834 6.11579 37.2138 5.30178 36.5492C4.48776 35.8845 3.99261 34.9743 3.91638 34.0027L3.90662 33.7396V21.7812C3.90648 20.8073 4.32911 19.8696 5.0891 19.1577C5.8491 18.4457 6.88977 18.0127 8.0008 17.946L8.30162 17.9375H25.8816ZM20.9983 29.8958H13.1849C12.3841 29.8958 11.7199 30.5279 11.7199 31.1771C11.7199 31.8262 12.2708 32.3627 12.9857 32.4464L13.1849 32.4583H20.9983C21.7991 32.4583 22.4633 31.8262 22.4633 31.1771C22.4633 30.8675 22.3351 30.5683 22.1024 30.335C21.8697 30.1016 21.5483 29.9499 21.1975 29.9078L20.9983 29.8958ZM11.7199 23.0625C11.2019 23.0625 10.7051 23.2425 10.3387 23.5629C9.97241 23.8832 9.76662 24.3177 9.76662 24.7708C9.76662 25.2239 9.97241 25.6584 10.3387 25.9788C10.7051 26.2992 11.2019 26.4792 11.7199 26.4792C12.238 26.4792 12.7348 26.2992 13.1012 25.9788C13.4675 25.6584 13.6733 25.2239 13.6733 24.7708C13.6733 24.3177 13.4675 23.8832 13.1012 23.5629C12.7348 23.2425 12.238 23.0625 11.7199 23.0625ZM22.4633 23.0625C21.9452 23.0625 21.4484 23.2425 21.0821 23.5629C20.7157 23.8832 20.5099 24.3177 20.5099 24.7708C20.5099 25.2239 20.7157 25.6584 21.0821 25.9788C21.4484 26.2992 21.9452 26.4792 22.4633 26.4792C22.9813 26.4792 23.4782 26.2992 23.8445 25.9788C24.2108 25.6584 24.4166 25.2239 24.4166 24.7708C24.4166 24.3177 24.2108 23.8832 23.8445 23.5629C23.4782 23.2425 22.9813 23.0625 22.4633 23.0625ZM17.0916 23.0625C16.5736 23.0625 16.0767 23.2425 15.7104 23.5629C15.3441 23.8832 15.1383 24.3177 15.1383 24.7708C15.1383 25.2239 15.3441 25.6584 15.7104 25.9788C16.0767 26.2992 16.5736 26.4792 17.0916 26.4792C17.6097 26.4792 18.1065 26.2992 18.4728 25.9788C18.8392 25.6584 19.0449 25.2239 19.0449 24.7708C19.0449 24.3177 18.8392 23.8832 18.4728 23.5629C18.1065 23.2425 17.6097 23.0625 17.0916 23.0625ZM24.9049 3.41666C25.2761 3.41676 25.6334 3.54007 25.9046 3.76169C26.1759 3.98331 26.3408 4.28671 26.3661 4.61058C26.3914 4.93445 26.2752 5.25464 26.0409 5.50646C25.8067 5.75828 25.4719 5.92295 25.1042 5.9672L24.9049 5.97916H8.30162C7.9476 5.97917 7.60556 6.0913 7.33876 6.2948C7.07196 6.4983 6.89844 6.77942 6.85029 7.08616L6.83662 7.26041V14.0937C6.8365 14.4184 6.6955 14.7308 6.4421 14.9681C6.18869 15.2053 5.84179 15.3495 5.47147 15.3716C5.10115 15.3937 4.73504 15.2921 4.44711 15.0873C4.15917 14.8824 3.97088 14.5896 3.92029 14.268L3.90662 14.0937V7.26041C3.90648 6.28644 4.32911 5.34875 5.0891 4.63683C5.8491 3.92491 6.88977 3.49186 8.0008 3.4252L8.30162 3.41666H24.9049Z" fill="currentColor"/>
                                </g>
                            </svg>
                            <img v-if="configSectionIcons.changeIconSize !== '' " :src="configSectionIcons.changeIconSize" class="asowp-w-6 asowp-h-6" />
                            <div class="asowp-text-[10px] lg:asowp-text-[13px] asowp-leading-normal asowp-font-medium asowp-text-center asowp-text-nowrap lg:asowp-text-wrap">
                                {{configVisualiserTexts.textSize}}
                            </div>
                        </div>
                    </div>
    
                    <div v-if="shapees.length > 0 && materialType == 'simple'" @click="showOptions('shape')" :class="`asowp-w-[80%]`">
                        <div :class="`${step === 'shape' ? `asowp-bg-[${configColors.optionsSideBar.options.buttons.hoverBackgroundColor}] asowp-text-[${configColors.optionsSideBar.options.buttons.textColor}]` : ``} asowp-h-fit asowp-flex asowp-flex-col asowp-full-center asowp-space-y-1 asowp-bg-[${configColors.optionsSideBar.options.buttons.backgroundColor}] hover:asowp-bg-[${configColors.optionsSideBar.options.buttons.hoverBackgroundColor}] asowp-text-[${configColors.optionsSideBar.options.buttons.textColor}] hover:asowp-text-[${configColors.optionsSideBar.options.buttons.hoverTextColor}] asowp-px-4 asowp-py-1 asowp-rounded-lg asowp-base-animation asowp-cursor-pointer`">
                            <svg v-if="configSectionIcons.changeIconShape === '' " class="asowp-w-6 asowp-h-6" viewBox="0 0 40 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g id="mdi:shape">
                                <path id="Vector" d="M18.3333 23.0625V36.7292H5V23.0625H18.3333ZM20 3.41666L29.1667 18.7917H10.8333L20 3.41666ZM29.1667 22.2083C33.3333 22.2083 36.6667 25.625 36.6667 29.8958C36.6667 34.1667 33.3333 37.5833 29.1667 37.5833C25 37.5833 21.6667 34.1667 21.6667 29.8958C21.6667 25.625 25 22.2083 29.1667 22.2083Z" fill="currentColor"/>
                                </g>
                            </svg>
                            <img v-if="configSectionIcons.changeIconShape !== '' " :src="configSectionIcons.changeIconShape" class="asowp-w-6 asowp-h-6" />
                            <div class="asowp-text-[10px] lg:asowp-text-[13px] asowp-leading-normal asowp-font-medium asowp-text-center asowp-text-nowrap lg:asowp-text-wrap">
                                {{configVisualiserTexts.textShape}}
                            </div>
                        </div>
                    </div>
    
                    <div v-if="fixinggs.length > 0" @click="showOptions('fixing-methode')" :class="`asowp-w-[80%]`">
                        <div :class="`${step === 'fixing-methode' ? `asowp-bg-[${configColors.optionsSideBar.options.buttons.hoverBackgroundColor}] asowp-text-[${configColors.optionsSideBar.options.buttons.textColor}]` : ``} asowp-h-fit asowp-flex asowp-flex-col asowp-full-center asowp-space-y-1 asowp-bg-[${configColors.optionsSideBar.options.buttons.backgroundColor}] hover:asowp-bg-[${configColors.optionsSideBar.options.buttons.hoverBackgroundColor}] asowp-text-[${configColors.optionsSideBar.options.buttons.textColor}] hover:asowp-text-[${configColors.optionsSideBar.options.buttons.hoverTextColor}] asowp-px-4 asowp-py-1 asowp-rounded-lg asowp-base-animation asowp-cursor-pointer`">
                            <svg v-if="configSectionIcons.changeIconFixingMethod.trim() == '' " class="asowp-w-6 asowp-h-6" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g id="uil:screw">
                                <path id="Vector" d="M36.183 16.8667L23.133 3.81666C22.9138 3.59622 22.6374 3.44147 22.3349 3.36988C22.0324 3.29829 21.716 3.31272 21.4212 3.41153C21.1265 3.51035 20.8653 3.68962 20.6671 3.92908C20.4689 4.16855 20.3417 4.45867 20.2997 4.76666L19.083 13.3333L15.7497 16.6667L15.1997 16.35C14.8408 16.1755 14.4313 16.1356 14.0455 16.2374C13.6597 16.3393 13.3232 16.5762 13.0972 16.905C12.8713 17.2339 12.7708 17.6329 12.8141 18.0296C12.8573 18.4263 13.0415 18.7942 13.333 19.0667L11.4163 21.0167L10.8663 20.7C10.5084 20.5356 10.1038 20.5033 9.72429 20.6089C9.3448 20.7144 9.01495 20.9509 8.79324 21.2765C8.57153 21.6021 8.4723 21.9956 8.51314 22.3874C8.55398 22.7792 8.73225 23.1438 9.01634 23.4167L7.06634 25.35L6.53301 25C6.34278 24.8898 6.13264 24.8183 5.91468 24.7897C5.69671 24.761 5.47524 24.7758 5.263 24.8331C5.05077 24.8904 4.85197 24.9892 4.67806 25.1237C4.50415 25.2581 4.35856 25.4257 4.24967 25.6167C4.06145 25.9599 4.00005 26.3584 4.07623 26.7424C4.15242 27.1264 4.36133 27.4713 4.66634 27.7167L3.81634 28.5667C3.662 28.7231 3.5427 28.9106 3.46634 29.1167C3.38094 29.317 3.33564 29.5322 3.33301 29.75V35C3.33301 35.442 3.5086 35.8659 3.82116 36.1785C4.13372 36.4911 4.55765 36.6667 4.99967 36.6667H10.2163C10.4341 36.664 10.6493 36.6187 10.8497 36.5333C11.0557 36.457 11.2432 36.3377 11.3997 36.1833L14.233 33.3333L14.783 33.65C14.9722 33.7609 15.1815 33.8333 15.3988 33.8632C15.6161 33.893 15.8371 33.8797 16.0492 33.824C16.2613 33.7682 16.4604 33.6712 16.6349 33.5384C16.8095 33.4055 16.9561 33.2396 17.0663 33.05C17.2609 32.7069 17.3275 32.3059 17.2543 31.9184C17.181 31.5308 16.9727 31.1818 16.6663 30.9333L18.6163 29L19.1663 29.3167C19.4154 29.4578 19.6967 29.5325 19.983 29.5333C20.302 29.5046 20.606 29.3845 20.8586 29.1875C21.1111 28.9904 21.3016 28.7248 21.4071 28.4223C21.5126 28.1199 21.5287 27.7934 21.4535 27.4821C21.3783 27.1707 21.2149 26.8876 20.983 26.6667L22.933 24.7333L23.483 25.05C23.7321 25.1912 24.0134 25.2658 24.2997 25.2667C24.64 25.2606 24.9704 25.1504 25.2462 24.951C25.5221 24.7516 25.7303 24.4725 25.8429 24.1512C25.9554 23.83 25.9669 23.4819 25.8757 23.154C25.7846 22.826 25.5952 22.5338 25.333 22.3167L26.6497 21L35.233 19.7833C35.5415 19.7395 35.8315 19.6101 36.0701 19.4097C36.3087 19.2094 36.4864 18.9462 36.583 18.65C36.6973 18.3461 36.7203 18.0154 36.6492 17.6986C36.5782 17.3818 36.4161 17.0926 36.183 16.8667ZM9.53301 33.3333H6.66634V30.4667L7.61634 29.5167L11.2497 31.6667L9.53301 33.3333ZM13.683 29.1667L9.99967 27.0833L11.8997 25.1833L15.5163 27.2667L13.683 29.1667ZM18.033 24.8333L14.3997 22.7333L16.3163 20.8333L19.9997 22.9167L18.033 24.8333ZM22.383 20.4833L18.7497 18.3333L20.6497 16.4333L23.5163 19.3L22.383 20.4833ZM26.4663 17.5833L22.4163 13.5333L23.133 8.53333L31.4663 16.8667L26.4663 17.5833Z" fill="currentColor"/>
                                </g>
                            </svg>
                            <img v-if="configSectionIcons.changeIconFixingMethod.trim() != '' " :src="configSectionIcons.changeIconFixingMethod" class="asowp-w-6 asowp-h-6" />
                            <div class="asowp-text-[10px] lg:asowp-text-[13px] asowp-leading-normal asowp-font-medium asowp-text-center asowp-text-nowrap lg:asowp-text-wrap">
                                {{configVisualiserTexts.textFixingMethods}}
                            </div>
                        </div>
                    </div>
    
                    <div v-if="materialType == 'simple' && borderrs.allBorders.length > 0" @click="showOptions('border')" :class="`asowp-w-[80%]`">
                        <div :class="`${step === 'border' ? `asowp-bg-[${configColors.optionsSideBar.options.buttons.hoverBackgroundColor}] asowp-text-[${configColors.optionsSideBar.options.buttons.textColor}]` : ``} asowp-h-fit asowp-flex asowp-flex-col asowp-full-center asowp-space-y-1 asowp-bg-[${configColors.optionsSideBar.options.buttons.backgroundColor}] hover:asowp-bg-[${configColors.optionsSideBar.options.buttons.hoverBackgroundColor}] asowp-text-[${configColors.optionsSideBar.options.buttons.textColor}] hover:asowp-text-[${configColors.optionsSideBar.options.buttons.hoverTextColor}] asowp-px-4 asowp-py-1 asowp-rounded-lg asowp-base-animation asowp-cursor-pointer`">
                            <svg v-if="configSectionIcons.changeIconBorder === '' " xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="asowp-w-6 asowp-h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 8.25V6a2.25 2.25 0 0 0-2.25-2.25H6A2.25 2.25 0 0 0 3.75 6v8.25A2.25 2.25 0 0 0 6 16.5h2.25m8.25-8.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-7.5A2.25 2.25 0 0 1 8.25 18v-1.5m8.25-8.25h-6a2.25 2.25 0 0 0-2.25 2.25v6" />
                            </svg>
                            <img v-if="configSectionIcons.changeIconBorder !== '' " :src="configSectionIcons.changeIconBorder" class="asowp-w-6 asowp-h-6" />
                            <div class="asowp-text-[10px] lg:asowp-text-[13px] asowp-leading-normal asowp-font-medium asowp-text-center asowp-text-nowrap lg:asowp-text-wrap">
                                {{configVisualiserTexts.textBorder}}
                            </div>
                        </div>
                    </div>
    
                    <div v-if="materialType == 'simple' && (sizees.length > 0 || customSizeActive) || (materialType == 'advance' && advancedComponent.options.length > 0)" @click="showOptions('color')" :class="`asowp-w-[80%]`">
                        <div :class="`${step === 'color' ? `asowp-bg-[${configColors.optionsSideBar.options.buttons.hoverBackgroundColor}] asowp-text-[${configColors.optionsSideBar.options.buttons.textColor}]` : ``} asowp-h-fit asowp-flex asowp-flex-col asowp-full-center asowp-space-y-1 asowp-bg-[${configColors.optionsSideBar.options.buttons.backgroundColor}] hover:asowp-bg-[${configColors.optionsSideBar.options.buttons.hoverBackgroundColor}] asowp-text-[${configColors.optionsSideBar.options.buttons.textColor}] hover:asowp-text-[${configColors.optionsSideBar.options.buttons.hoverTextColor}] asowp-px-4 asowp-py-1 asowp-rounded-lg asowp-base-animation asowp-cursor-pointer`">
                            <svg v-if="configSectionIcons.changeIconColor === '' " class="asowp-w-6 asowp-h-6" viewBox="0 0 40 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g id="tdesign:fill-color-1">
                                <path id="Vector" d="M20.0004 0.0888367L39.9137 20.5L36.6671 23.8278V23.9167H36.5804L24.7137 36.08C23.4635 37.3611 21.7682 38.0807 20.0004 38.0807C18.2326 38.0807 16.5373 37.3611 15.2871 36.08L4.8004 25.3329C4.18131 24.6983 3.69021 23.945 3.35516 23.1159C3.02011 22.2869 2.84766 21.3983 2.84766 20.5009C2.84766 19.6035 3.02011 18.7149 3.35516 17.8858C3.69021 17.0567 4.18131 16.3034 4.8004 15.6688L12.1971 8.08554L7.64373 3.41667L10.0004 1.00109L14.5554 5.66996L20.0004 0.0888367ZM14.5554 10.5028L7.15873 18.0844C6.50873 18.7507 6.18207 19.6253 6.18207 20.5H35.1987L20.0004 4.92L16.9137 8.08554L22.3571 13.6667L20.0004 16.0823L14.5554 10.5028ZM8.13373 23.9167L17.6437 33.6644C18.2688 34.3049 19.1165 34.6648 20.0004 34.6648C20.8843 34.6648 21.732 34.3049 22.3571 33.6644L31.8671 23.9167H8.13373ZM36.2504 31.4145L38.4404 34.2504C39.4087 35.5043 39.4087 37.4074 38.4404 38.6596C38.1824 39.0048 37.8511 39.2852 37.4717 39.4797C37.0922 39.6741 36.6746 39.7775 36.2504 39.782C35.3671 39.782 34.5837 39.3378 34.0604 38.6596C33.0921 37.4074 33.0921 35.5043 34.0604 34.2504L36.2504 31.4145Z" fill="currentColor"/>
                                </g>
                            </svg>
                            <img v-if="configSectionIcons.changeIconColor !== '' " :src="configSectionIcons.changeIconColor" class="asowp-w-6 asowp-h-6" />
                            <div class="asowp-text-[10px] lg:asowp-text-[13px] asowp-leading-normal asowp-font-medium asowp-text-center asowp-text-nowrap lg:asowp-text-wrap">
                                {{configVisualiserTexts.textColor}}
                            </div>
                        </div>
                    </div>
    
                    <div v-if="(materialType == 'simple' && currentMaterialTextImages.enableText && (sizees.length > 0 || customSizeActive) ) || materialType == 'advance' && advancedComponent.options.length > 0" @click="showOptions('text')" :class="`asowp-w-[80%]`">
                        <div :class="`${step === 'text' ? `asowp-bg-[${configColors.optionsSideBar.options.buttons.hoverBackgroundColor}] asowp-text-[${configColors.optionsSideBar.options.buttons.textColor}]` : ``} asowp-h-fit asowp-flex asowp-flex-col asowp-full-center asowp-space-y-1 asowp-bg-[${configColors.optionsSideBar.options.buttons.backgroundColor}] hover:asowp-bg-[${configColors.optionsSideBar.options.buttons.hoverBackgroundColor}] asowp-text-[${configColors.optionsSideBar.options.buttons.textColor}] hover:asowp-text-[${configColors.optionsSideBar.options.buttons.hoverTextColor}] asowp-px-4 asowp-py-1 asowp-rounded-lg asowp-base-animation asowp-cursor-pointer`">
                            <svg v-if="configSectionIcons.changeIconText === '' " class="asowp-w-6 asowp-h-6" viewBox="0 0 46 47" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g id="clarity:text-line" clip-path="url(#clip0_457_214)">
                                    <path id="Vector" d="M15.5757 11.5411C15.453 11.1569 15.2131 10.8229 14.8912 10.588C14.5693 10.3531 14.1823 10.2296 13.7868 10.2356H13.6335C13.2341 10.226 12.8422 10.3477 12.5156 10.5827C12.189 10.8177 11.9448 11.1537 11.819 11.5411L1.45625 34.6756C1.33756 34.9142 1.27624 35.1782 1.27736 35.4458C1.27736 35.7921 1.41198 36.1242 1.65161 36.369C1.89124 36.6138 2.21625 36.7514 2.55514 36.7514C2.85996 36.7559 3.15822 36.6608 3.40645 36.4799C3.65467 36.2991 3.8399 36.042 3.93514 35.7461L6.59291 29.6753H20.6485L23.3062 35.6678C23.411 35.9742 23.6035 36.2413 23.8587 36.4345C24.1139 36.6278 24.42 36.7381 24.7374 36.7514C25.1034 36.7514 25.4544 36.6028 25.7132 36.3384C25.972 36.074 26.1174 35.7154 26.1174 35.3414C26.102 35.0844 26.0414 34.8323 25.9385 34.5972L15.5757 11.5411ZM7.76847 27.0381L13.6335 13.6953L19.5112 27.0381H7.76847Z" fill="currentColor"/>
                                    <path id="Vector_2" d="M41.1964 19.2961C40.3913 18.568 39.4525 18.0108 38.4346 17.6566C37.4168 17.3025 36.3403 17.1586 35.2676 17.2333C33.1975 17.226 31.1498 17.6711 29.262 18.5389C29.0441 18.6419 28.859 18.8055 28.7279 19.011C28.5969 19.2165 28.5251 19.4556 28.5209 19.7008C28.5451 20.0156 28.6801 20.3107 28.901 20.5315C29.1218 20.7524 29.4135 20.884 29.722 20.9019C29.8926 20.895 30.0609 20.8597 30.2203 20.7975C31.7112 20.0976 33.333 19.7368 34.9737 19.74C38.4237 19.74 40.4426 21.4764 40.4426 24.8578V25.5105C38.6082 24.9643 36.7054 24.696 34.7948 24.7142C30.1437 24.7142 26.9492 26.8161 26.9492 30.7719V30.8372C26.9492 34.6886 30.3992 36.6861 33.8109 36.6861C35.0886 36.7241 36.3568 36.4502 37.5102 35.8871C38.6635 35.324 39.6688 34.488 40.4426 33.4483V35.1194C40.4426 35.4657 40.5772 35.7978 40.8168 36.0426C41.0564 36.2874 41.3814 36.425 41.7203 36.425C41.8948 36.4253 42.0674 36.3891 42.2277 36.3187C42.3879 36.2482 42.5324 36.145 42.6521 36.0153C42.7718 35.8857 42.8643 35.7324 42.9238 35.5648C42.9833 35.3973 43.0086 35.219 42.9981 35.0411V24.8055C43.074 23.8108 42.9536 22.8105 42.6441 21.8641C42.3346 20.9178 41.8423 20.0445 41.1964 19.2961ZM40.4809 29.3489C40.4809 32.3255 37.7081 34.4275 34.3348 34.4275C31.8559 34.4275 29.722 33.0436 29.722 30.6936V30.6153C29.722 28.2653 31.6387 26.6986 35.0887 26.6986C36.9138 26.7039 38.729 26.972 40.4809 27.495V29.3489Z" fill="currentColor"/>
                                </g>
                                <defs>
                                    <clipPath id="clip0_457_214">
                                        <rect width="46" height="47" fill="white"/>
                                    </clipPath>
                                </defs>
                            </svg>
                            <img v-if="configSectionIcons.changeIconText !== '' " :src="configSectionIcons.changeIconText" class="asowp-w-6 asowp-h-6" />
                            <div class="asowp-text-[10px] lg:asowp-text-[13px] asowp-leading-normal asowp-font-medium asowp-text-center asowp-text-nowrap lg:asowp-text-wrap">
                                {{configVisualiserTexts.textOptionText}}
                            </div>
                        </div>
                    </div>
    
                    <div v-if="(materialType == 'simple' && currentMaterialTextImages.enableImage && (sizees.length > 0 || customSizeActive) ) || materialType == 'advance' && advancedComponent.options.length > 0" @click="showOptions('image')" :class="`asowp-w-[80%]`">
                        <div :class="`${step === 'image' && addComponentId === id ? `asowp-bg-[${configColors.optionsSideBar.options.buttons.hoverBackgroundColor}] asowp-text-[${configColors.optionsSideBar.options.buttons.textColor}]` : ``} asowp-h-fit asowp-flex asowp-flex-col asowp-full-center asowp-space-y-1 asowp-bg-[${configColors.optionsSideBar.options.buttons.backgroundColor}] hover:asowp-bg-[${configColors.optionsSideBar.options.buttons.hoverBackgroundColor}] asowp-text-[${configColors.optionsSideBar.options.buttons.textColor}] hover:asowp-text-[${configColors.optionsSideBar.options.buttons.hoverTextColor}] asowp-px-4 asowp-py-1 asowp-rounded-lg asowp-base-animation asowp-cursor-pointer`">
                            <svg v-if="configSectionIcons.changeIconImage === '' " xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="asowp-w-6 asowp-h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                            </svg>
                            <img v-if="configSectionIcons.changeIconImage !== '' " :src="configSectionIcons.changeIconImage" class="asowp-w-6 asowp-h-6" />
                            <div class="asowp-text-[10px] lg:asowp-text-[13px] asowp-leading-normal asowp-font-medium asowp-text-center asowp-text-nowrap lg:asowp-text-wrap">
                                {{configVisualiserTexts.textImage}}
                            </div>
                        </div>
                    </div>
    
                    <div v-if="(materialType == 'simple' && additionalComponents.length > 0 )" v-for="(option, id) in additionalComponents" class="asowp-w-[80%]" >
                        <div v-if="option.options.length > 0" @click="showOptions('add-components', option, id)" :class="`${step === 'add-components' && addComponentId === id ? `asowp-bg-[${configColors.optionsSideBar.options.buttons.hoverBackgroundColor}] asowp-text-[${configColors.optionsSideBar.options.buttons.textColor}]` : ``} asowp-h-fit asowp-flex asowp-flex-col asowp-full-center asowp-space-y-1 asowp-bg-[${configColors.optionsSideBar.options.buttons.backgroundColor}] hover:asowp-bg-[${configColors.optionsSideBar.options.buttons.hoverBackgroundColor}] asowp-text-[${configColors.optionsSideBar.options.buttons.textColor}] hover:asowp-text-[${configColors.optionsSideBar.options.buttons.hoverTextColor}] asowp-px-4 asowp-py-1 asowp-rounded-lg asowp-base-animation asowp-cursor-pointer`">
                            <svg v-if="option.icon === '' " class="asowp-w-6 asowp-h-6" viewBox="0 0 50 50" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <g id="fluent-mdl2:product-release">
                                <path id="Vector" d="M21.875 37.5244V22.8516L6.25 15.0391V36.5234L19.5312 43.1885L18.7744 46.2891L3.125 38.4766V11.5234L23.4375 1.3916L43.75 11.5234V18.1152C42.6107 18.2943 41.569 18.6605 40.625 19.2139V15.0391L25 22.8516V34.3994L21.875 37.5244ZM18.4082 7.37305L32.666 15.5273L38.6963 12.5L23.4375 4.8584L18.4082 7.37305ZM23.4375 20.1416L29.2969 17.2119L15.0391 9.05762L8.17871 12.5L23.4375 20.1416ZM45.1172 21.875C45.8008 21.875 46.4355 21.9971 47.0215 22.2412C47.6074 22.4854 48.1283 22.819 48.584 23.2422C49.0397 23.6654 49.3815 24.1781 49.6094 24.7803C49.8372 25.3825 49.9674 26.0254 50 26.709C50 27.3438 49.8779 27.9622 49.6338 28.5645C49.3896 29.1667 49.0397 29.6956 48.584 30.1514L31.0791 47.6562L21.875 49.9512L24.1699 40.7471L41.6748 23.2666C42.1468 22.7946 42.6758 22.4447 43.2617 22.2168C43.8477 21.9889 44.4661 21.875 45.1172 21.875ZM46.3623 27.9541C46.7041 27.6123 46.875 27.1973 46.875 26.709C46.875 26.2044 46.7122 25.7975 46.3867 25.4883C46.0612 25.179 45.638 25.0163 45.1172 25C44.8893 25 44.6696 25.0326 44.458 25.0977C44.2464 25.1628 44.0592 25.2848 43.8965 25.4639L27.002 42.3584L26.1719 45.6543L29.4678 44.8242L46.3623 27.9541Z" fill="currentColor"/>
                                </g>
                            </svg>
                            <img v-if="option.icon !== '' " :src="option.icon" class="asowp-w-6 asowp-h-6" />
                            <div class="asowp-text-[10px] lg:asowp-text-[13px] asowp-leading-normal asowp-font-medium asowp-text-center asowp-text-nowrap lg:asowp-text-wrap">
                                {{option.title}}
                            </div>
                        </div>
                    </div>

                    <div v-if="configAdditionnalOptions.length > 0" class="asowp-w-[80%]" >
                        <div @click="showOptions('add-options')" :class="`${step === 'add-options' ? `asowp-bg-[${configColors.optionsSideBar.options.buttons.hoverBackgroundColor}] asowp-text-[${configColors.optionsSideBar.options.buttons.textColor}]` : ``} asowp-h-fit asowp-flex asowp-flex-col asowp-full-center asowp-space-y-1 asowp-bg-[${configColors.optionsSideBar.options.buttons.backgroundColor}] hover:asowp-bg-[${configColors.optionsSideBar.options.buttons.hoverBackgroundColor}] asowp-text-[${configColors.optionsSideBar.options.buttons.textColor}] hover:asowp-text-[${configColors.optionsSideBar.options.buttons.hoverTextColor}] asowp-px-4 asowp-py-1 asowp-rounded-lg asowp-base-animation asowp-cursor-pointer`">
                            <svg class="asowp-w-6 asowp-h-6" viewBox="0 0 50 50" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <g id="fluent-mdl2:product-release">
                                <path id="Vector" d="M21.875 37.5244V22.8516L6.25 15.0391V36.5234L19.5312 43.1885L18.7744 46.2891L3.125 38.4766V11.5234L23.4375 1.3916L43.75 11.5234V18.1152C42.6107 18.2943 41.569 18.6605 40.625 19.2139V15.0391L25 22.8516V34.3994L21.875 37.5244ZM18.4082 7.37305L32.666 15.5273L38.6963 12.5L23.4375 4.8584L18.4082 7.37305ZM23.4375 20.1416L29.2969 17.2119L15.0391 9.05762L8.17871 12.5L23.4375 20.1416ZM45.1172 21.875C45.8008 21.875 46.4355 21.9971 47.0215 22.2412C47.6074 22.4854 48.1283 22.819 48.584 23.2422C49.0397 23.6654 49.3815 24.1781 49.6094 24.7803C49.8372 25.3825 49.9674 26.0254 50 26.709C50 27.3438 49.8779 27.9622 49.6338 28.5645C49.3896 29.1667 49.0397 29.6956 48.584 30.1514L31.0791 47.6562L21.875 49.9512L24.1699 40.7471L41.6748 23.2666C42.1468 22.7946 42.6758 22.4447 43.2617 22.2168C43.8477 21.9889 44.4661 21.875 45.1172 21.875ZM46.3623 27.9541C46.7041 27.6123 46.875 27.1973 46.875 26.709C46.875 26.2044 46.7122 25.7975 46.3867 25.4883C46.0612 25.179 45.638 25.0163 45.1172 25C44.8893 25 44.6696 25.0326 44.458 25.0977C44.2464 25.1628 44.0592 25.2848 43.8965 25.4639L27.002 42.3584L26.1719 45.6543L29.4678 44.8242L46.3623 27.9541Z" fill="currentColor"/>
                                </g>
                            </svg>
                            <div class="asowp-text-[10px] lg:asowp-text-[13px] asowp-leading-normal asowp-font-medium asowp-text-center asowp-text-nowrap lg:asowp-text-wrap">
                                {{ configVisualiserTexts.textButtonAdditonnalOptions && configVisualiserTexts.textButtonAdditonnalOptions.trim() !== '' ? configVisualiserTexts.textButtonAdditonnalOptions : 'Add Option' }}
                            </div>
                        </div>
                    </div>

                    <div v-if="showScrollButton">
                        <div @click="ScrollLeft('asowp-options-buttons')" :class="`asowp-absolute asowp-top-[0%] asowp-left-0 asowp-w-fit lg:asowp-w-full asowp-h-full lg:asowp-h-fit asowp-bg-[${configColors.optionsSideBar.scrollButtonsBackgroundColor}]/60 asowp-text-[${configColors.optionsSideBar.scrollButtonsTextColor}] hover:asowp-bg-[${configColors.optionsSideBar.scrollButtonsHoverBackgroundColor}]/60 hover:asowp-text-[${configColors.optionsSideBar.scrollButtonsHoverTextColor}] asowp-flex asowp-full-center lg:asowp-py-1 asowp-cursor-pointer asowp-base-animation`">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="asowp-w-7 asowp-h-7 -asowp-rotate-90 lg:asowp-rotate-0">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                            </svg>                              
                        </div>
                        
                        <div @click="ScrollRight('asowp-options-buttons')" :class="`asowp-absolute asowp-top-0 lg:asowp-top-[100%] lg:asowp-translate-y-[-100%] asowp-right-0 lg:asowp-left-0 asowp-w-fit lg:asowp-w-full asowp-h-full lg:asowp-h-fit asowp-bg-[${configColors.optionsSideBar.scrollButtonsBackgroundColor}]/60 asowp-text-[${configColors.optionsSideBar.scrollButtonsTextColor}] hover:asowp-bg-[${configColors.optionsSideBar.scrollButtonsHoverBackgroundColor}]/60 hover:asowp-text-[${configColors.optionsSideBar.scrollButtonsHoverTextColor}] asowp-flex asowp-full-center lg:asowp-py-1 asowp-cursor-pointer asowp-base-animation`">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="asowp-w-7 asowp-h-7 -asowp-rotate-90 lg:asowp-rotate-0">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                            </svg>                                 
                        </div>
                    </div>
                </div>
            </div>
    
            <div class="asowp-w-full asowp-h-[32%] lg:asowp-w-fit lg:asowp-h-fit">
                <div v-show="showOption" id="asowp-options-container" :class="`asowp-relative lg:asowp-absolute lg:asowp-left-[8%] lg:asowp-top-[11%] asowp-w-full lg:asowp-w-[35%] asowp-h-[85%] lg:asowp-h-[70%] asowp-bg-[${configColors.optionsSideBar.options.modals.backgroundColor}] asowp-text-[${configColors.optionsSideBar.options.modals.textColor}] asowp-rounded-md lg:asowp-shadow-xl asowp-z-20`">
                    <div class="asowp-hidden lg:asowp-flex asowp-absolute asowp-top-0 asowp-right-0 asowp-w-fit asowp-h-fit">
                        <span @click="closeOption" :class="`asowp-flex asowp-bg-[${configColors.optionsSideBar.options.modals.buttons.backgroundColor}] hover:asowp-bg-[${configColors.optionsSideBar.options.modals.buttons.hoverBackgroundColor}] asowp-text-[${configColors.optionsSideBar.options.modals.buttons.textColor}] hover:asowp-text-[${configColors.optionsSideBar.options.modals.buttons.hoverTextColor}] asowp-p-1 asowp-rounded-md asowp-base-animation asowp-cursor-pointer asowp-z-10`">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="asowp-w-5 asowp-h-5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                        </span>
                    </div>
    
                    <div v-show="step == 'material'" class="asowp-relative asowp-flex asowp-flex-col lg:asowp-space-y-3 asowp-w-full asowp-h-full" id="asowp-materials-section">
                        <p :class="`asowp-hidden lg:asowp-flex asowp-bg-[${configColors.optionsSideBar.options.modals.headerBackgroundColor}] asowp-text-[${configColors.optionsSideBar.options.modals.headerTextColor}] asowp-text-lg asowp-font-semibold asowp-p-2 asowp-px-4`">{{configVisualiserTexts.textMaterial}} </p>    
    
                        <div class="asowp-h-full asowp-p-2 asowp-overflow-auto asowp-scrollBar">
                            <div v-for="(material, index) in props.config.data.materials" class="asowp-space-y-3">
                                <input type="radio" :id="material.name + index" name="asowp-material" class=" peer asowp-hidden" @change="selectMaterial(material, index)">
                                <label :for="material.name + index" :class="`asowp-flex asowp-full-center asowp-space-x-2 asowp-cursor-pointer asowp-text-[${configColors.optionsSideBar.options.modals.option.textColor}] hover:asowp-bg-[${configColors.optionsSideBar.options.modals.option.hoverBackgroundColor}]/50  hover:asowp-text-[${configColors.optionsSideBar.options.modals.option.hoverTextColor}] asowp-p-2 asowp-base-animation`">
                                    <div :class="`${material.icon === '' ? `asowp-bg-[${configColors.backgroundColorHeader}]` : ``} asowp-w-1/4 asowp-h-20 asowp-flex asowp-full-center`">
                                        <img v-if="material.icon != ''" :src="material.icon" class="asowp-w-auto asowp-h-full" />
                                    </div>                                
                                    <div :class="`asowp-w-3/4 asowp-flex asowp-flex-col asowp-space-y-1`">
                                        <p class="asowp-text-sm asowp-font-medium first-letter:asowp-uppercase">{{ material.name }}</p>
                                        <p class="asowp-text-xs">{{ material.description }}</p>
                                        <div class="asowp-w-full asowp-flex asowp-items-center asowp-justify-between">
                                            <span v-if="material.popImg.trim() != ''" @click="showMaterialExample(true, material.popImg)" :class="`asowp-text-xs asowp-text-[${configColors.optionsSideBar.options.modals.option.activeTextColor}] asowp-underline asowp-cursor-pointer`">example</span>
                                            <span v-if="material.popImg.trim() == ''" class="asowp-invisible">example</span>                                        
                                            <span :class="`${selectedMaterial == material.name ? `asowp-text-[${configColors.optionsSideBar.options.modals.option.activeTextColor}]` : `asowp-text-transparent asowp-border-[${configColors.optionsSideBar.options.modals.option.activeTextColor}] asowp-border-solid asowp-border-2`} asowp-flex asowp-w-fit asowp-h-fit asowp-rounded-full`">
                                                <svg fill="currentColor" class="asowp-w-6 asowp-h-6" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve" stroke="currentColor">
                                                    <g id="SVGRepo_bgCarrier" stroke-width="0"/>
                                                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
                                                    <g id="SVGRepo_iconCarrier"> <g> <g> <path d="M256,0C114.837,0,0,114.843,0,256s114.837,256,256,256s256-114.843,256-256S397.163,0,256,0z M376.239,227.501 L257.348,346.391c-13.043,13.043-34.174,13.044-47.218,0l-68.804-68.804c-13.044-13.038-13.044-34.179,0-47.218 c13.044-13.044,34.174-13.044,47.218,0l45.195,45.19l95.282-95.278c13.044-13.044,34.174-13.044,47.218,0 C389.283,193.321,389.283,214.462,376.239,227.501z"/> </g> </g> </g>
                                                </svg>
                                            </span>      
                                        </div>
                                    </div>
                                </label>
                            </div>
                        </div>

                        <div v-show="showMaterialEx" :class="`asowp-absolute asowp-top-0 asowp-right-0 asowp-w-[85%] lg:asowp-w-full asowp-h-[90%] asowp-overflow-auto asowp-scrollBar asowp-translate-y-[-50%] lg:asowp-translate-y-[0%] lg:asowp-translate-x-[101%] asowp-bg-[${configColors.optionsSideBar.options.modals.backgroundColor}] asowp-text-[${configColors.optionsSideBar.options.modals.textColor}] asowp-p-2`">
                            <div v-html="materialExample"></div>
                            <div class="asowp-absolute asowp-top-0 asowp-right-0 asowp-w-fit asowp-h-fit asowp-cursor-pointer">
                                <span @click="showMaterialExample(false)" :class="`asowp-flex asowp-bg-[${configColors.optionsSideBar.options.modals.buttons.backgroundColor}] hover:asowp-bg-[${configColors.optionsSideBar.options.modals.buttons.hoverBackgroundColor}] asowp-text-[${configColors.optionsSideBar.options.modals.buttons.textColor}] hover:asowp-text-[${configColors.optionsSideBar.options.modals.buttons.hoverTextColor}] asowp-p-1 asowp-base-animation`">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="asowp-w-5 asowp-h-5">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                                    </svg>
                                </span>
                            </div>
                        </div>
                    </div>
    
                    <div v-show="step == 'component'" class="asowp-flex asowp-flex-col lg:asowp-space-y-3 asowp-w-full asowp-h-full" id="asowp-products-section">
                        <p :class="`asowp-hidden lg:asowp-flex asowp-bg-[${configColors.optionsSideBar.options.modals.headerBackgroundColor}] asowp-text-[${configColors.optionsSideBar.options.modals.headerTextColor}] asowp-text-lg asowp-font-semibold asowp-p-2 asowp-px-4`">{{advancedComponent.name}}</p>    
                        
                        <div class="asowp-w-full asowp-h-full asowp-p-2 asowp-overflow-auto asowp-scrollBar">
                            <div v-for="(option, index) in advancedComponent.options" class="asowp-space-y-3">
                                <input type="radio" :id="'asowp-model' + option.name + option.size.width + index" name="asowp-advanceModel" class=" peer asowp-hidden" @change="selectSignModel(option, index)">
                                <label :for="'asowp-model' + option.name + option.size.width + index" :class="`asowp-flex asowp-full-center asowp-space-x-2 asowp-text-[${configColors.optionsSideBar.options.modals.option.textColor}] hover:asowp-bg-[${configColors.optionsSideBar.options.modals.option.hoverBackgroundColor}]/50  hover:asowp-text-[${configColors.optionsSideBar.options.modals.option.hoverTextColor}] asowp-p-2 asowp-base-animation`">
                                    <div :class="`${option.icon === '' ? `asowp-bg-[${configColors.backgroundColorHeader}]` : `` } asowp-w-1/4 asowp-h-20 asowp-flex asowp-full-center`">
                                        <img v-if="option.icon != ''" :src="option.icon" class="asowp-w-auto asowp-h-full" />
                                    </div>                                
                                    <div :class="`asowp-w-3/4 asowp-flex asowp-flex-col asowp-space-y-1`">
                                        <p class="asowp-text-sm asowp-font-medium first-letter:asowp-uppercase">{{ option.name }}</p>
                                        <p class="asowp-text-xs">{{ option.description }}</p>
                                        <p class="asowp-text-xs">{{ option.size.width }}x{{ option.size.height }}</p>
                                        <div class="asowp-w-full asowp-flex asowp-items-center asowp-justify-between">
                                            <span class="asowp-invisible">example</span>
                                            <span :class="`${activeSignModelName == option.name && activeSignModelId === index ? `asowp-text-[${configColors.optionsSideBar.options.modals.option.activeTextColor}]` : `asowp-text-transparent asowp-border-[${configColors.optionsSideBar.options.modals.option.activeTextColor}] asowp-border-solid asowp-border-2`} asowp-flex asowp-w-fit asowp-h-fit asowp-rounded-full`">
                                                <svg fill="currentColor" class="asowp-w-6 asowp-h-6" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve" stroke="currentColor">
                                                    <g id="SVGRepo_bgCarrier" stroke-width="0"/>
                                                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
                                                    <g id="SVGRepo_iconCarrier"> <g> <g> <path d="M256,0C114.837,0,0,114.843,0,256s114.837,256,256,256s256-114.843,256-256S397.163,0,256,0z M376.239,227.501 L257.348,346.391c-13.043,13.043-34.174,13.044-47.218,0l-68.804-68.804c-13.044-13.038-13.044-34.179,0-47.218 c13.044-13.044,34.174-13.044,47.218,0l45.195,45.19l95.282-95.278c13.044-13.044,34.174-13.044,47.218,0 C389.283,193.321,389.283,214.462,376.239,227.501z"/> </g> </g> </g>
                                                </svg>
                                            </span>                
                                        </div>
                                    </div>
                                </label>
                            </div>
                        </div>

                    </div>
    
                    <div v-show="step == 'size'" class="asowp-relative asowp-flex asowp-flex-col lg:asowp-space-y-2 asowp-w-full asowp-h-full" id="asowp-sizes-section">
                        <p :class="`asowp-hidden lg:asowp-flex asowp-bg-[${configColors.optionsSideBar.options.modals.headerBackgroundColor}] asowp-text-[${configColors.optionsSideBar.options.modals.headerTextColor}] asowp-text-lg asowp-font-semibold asowp-p-2 asowp-px-4`">{{configVisualiserTexts.textSize}}</p>    
                        <div class="asowp-h-full asowp-space-y-2 asowp-p-4 asowp-overflow-auto asowp-scrollBar">
                            <div class="asowp-space-y-2">
                                <div @click="dropSizeToggle()" id="asowp-fontSelected-dropdown" :class="`asowp-cursor-pointer asowp-items-center asowp-space-x-3 asowp-bg-[${configColors.optionsSideBar.options.modals.buttons.backgroundColor}] hover:asowp-bg-[${configColors.optionsSideBar.options.modals.buttons.hoverBackgroundColor}] asowp-text-[${configColors.optionsSideBar.options.modals.buttons.textColor}] hover:asowp-text-[${configColors.optionsSideBar.options.modals.buttons.hoverTextColor}]  asowp-px-2 asowp-border border-gray-400 asowp-rounded-md asowp-flex asowp-justify-between asowp-text-base asowp-base-animation`">
                                    <div class="asowp-w-fit asowp-flex asowp-items-center asowp-justify-center asowp-p-2">
                                        <p v-show="currentSizeName != ''" :class="`lg:asowp-text-sm `" >{{ currentSizeName }}</p>
                                        <p v-show="currentSizeName == ''" class="lg:asowp-text-sm xl:asowp-text-base" >Selected size</p>
                                    </div>
                                    <div class="asowp-flex asowp-items-center asowp-justify-center">
                                        <svg v-show="!showSize" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="asowp-w-6 asowp-h-6 lg:w-5 lg:asowp-h-5">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                        </svg>
                                        <svg v-show="showSize" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="asowp-w-6 asowp-h-6 lg:w-5 lg:asowp-h-5">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                                        </svg>                                  
                                    </div>
                                </div>
                                <div v-if="showSize" class="asowp-flex asowp-flex-wrap asowp-gap-2 asowp-p-1">
                                    <div v-for="(sizee, id) in sizees">
                                        <div class="asowp-w-full asowp-flex">
                                            <input type="radio" :id="'aso' + sizee.label + sizee.width + index" name="asowp-sizes" class=" peer asowp-hidden" @click="changeSize({label: sizee.label, width:sizee.width, height:sizee.height}, {textNumber: sizee.textNumber, charPrice: sizee.charPrice, basePrice: sizee.basePrice, maxTextChar: sizee.maxTextChar, startPriceAtChar: sizee.startPriceAtChar}, id )">
                                            <label :for="'aso' + sizee.label + sizee.width + index" :class="`${currentSizeName == sizee.label ? `asowp-ring-2 asowp-ring-[${configColors.optionsSideBar.options.modals.option.activeTextColor}] asowp-text-[${configColors.optionsSideBar.options.modals.option.activeTextColor}]` : `asowp-text-[${configColors.optionsSideBar.options.modals.option.textColor}]`} 
                                                asowp-w-full asowp-h-full asowp-border-solid asowp-border asowp-justify-center asowp-font-semibold asowp-text-sm hover:asowp-text-[${configColors.optionsSideBar.options.modals.option.activeTextColor}] hover:asowp-border-[${configColors.optionsSideBar.options.modals.option.activeTextColor}] asowp-rounded-md asowp-p-2 asowp-text-center asowp-cursor-pointer asowp-transition-all asowp-ease-in-out asowp-duration-500`"
                                            >
                                                {{ sizee.label }}
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div v-if="currentSizeThickness" class="asowp-space-y-2">
                                <p :class="`asowp-text-base asowp-font-semibold`">{{configVisualiserTexts.thickness}}</p>

                                <div @click="dropThicknessToggle()" id="asowp-fontSelected-dropdown" :class="`asowp-cursor-pointer asowp-items-center asowp-space-x-3 asowp-bg-[${configColors.optionsSideBar.options.modals.buttons.backgroundColor}] hover:asowp-bg-[${configColors.optionsSideBar.options.modals.buttons.hoverBackgroundColor}] asowp-text-[${configColors.optionsSideBar.options.modals.buttons.textColor}] hover:asowp-text-[${configColors.optionsSideBar.options.modals.buttons.hoverTextColor}]  asowp-px-2 asowp-border border-gray-400 asowp-rounded-md asowp-flex asowp-justify-between asowp-text-base asowp-base-animation`">
                                    <div class="asowp-w-fit asowp-flex asowp-items-center asowp-justify-center asowp-p-2">
                                        <p v-show="currentSizeName != ''" :class="`lg:asowp-text-sm `" >{{ currentThickValue }} {{configUnit}}</p>
                                        <p v-show="currentSizeName == ''" class="lg:asowp-text-sm xl:asowp-text-base" >{{configVisualiserTexts.thickness}}</p>
                                    </div>
                                    <div class="asowp-flex asowp-items-center asowp-justify-center">
                                        <svg v-show="!showThick" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="asowp-w-6 asowp-h-6 lg:w-5 lg:asowp-h-5">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                        </svg>
                                        <svg v-show="showThick" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="asowp-w-6 asowp-h-6 lg:w-5 lg:asowp-h-5">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                                        </svg>                                  
                                    </div>
                                </div>
                                <div v-show="showThick" class="asowp-flex asowp-flex-wrap asowp-gap-2 asowp-p-1">
                                    <div v-for="(thick, id) in thicknesss.values">
                                        <div class="asowp-w-full asowp-flex">
                                            <input type="radio" :id="'aso' + thick + id" name="asowp-sizes" class=" peer asowp-hidden" @click="selectSizeThickness(thick)">
                                            <label :for="'aso' + thick + id" :class="`${currentThickValue == thick ? `asowp-ring-2 asowp-ring-[${configColors.optionsSideBar.options.modals.option.activeTextColor}] asowp-text-[${configColors.optionsSideBar.options.modals.option.activeTextColor}]` : `asowp-text-[${configColors.optionsSideBar.options.modals.option.textColor}]`} 
                                                asowp-w-full asowp-h-full asowp-border-solid asowp-border asowp-justify-center asowp-font-semibold asowp-text-sm hover:asowp-text-[${configColors.optionsSideBar.options.modals.option.activeTextColor}] hover:asowp-border-[${configColors.optionsSideBar.options.modals.option.activeTextColor}] asowp-rounded-md asowp-p-2 asowp-text-center asowp-cursor-pointer asowp-transition-all asowp-ease-in-out asowp-duration-500`"
                                            >
                                                {{ thick }} {{ configUnit }}
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div v-if="customSizeActive" class="asowp-space-y-2 asowp-w-full asowp-pb-6">
                                <p class="asowp-text-base asowp-font-semibold">{{configVisualiserTexts.customSize}}</p>
                                <div class="asowp-flex asowp-justify-between asowp-items-center asowp-space-x-2 ">
                                    <div class="asowp-w-1/2 asowp-flex asowp-flex-col asowp-space-y-2">
                                        <label :class="`asowp-text-xs asowp-text-[${configColors.optionsSideBar.options.modals.textColor}]`" for="sizeWidth">{{ customSizes.width.label }} ({{configUnit}})</label>
                                        <input class="asowp-w-full asowp-border asowp-border-zinc-600 asowp-p-1 asowp-rounded-sm" type="number" name="" id="sizeWidth" :min="customSizes.width.min" :max="customSizes.width.max" v-model="customSizeValues.width" style="border-radius: 6px">
                                    </div>
                                    <!-- <p class="asowp-px-2">x</p> -->
                                    <div class="asowp-w-1/2 asowp-flex asowp-flex-col asowp-space-y-2">
                                        <label :class="`asowp-text-xs asowp-text-[${configColors.optionsSideBar.options.modals.textColor}]`" for="sizeHeight">{{ customSizes.height.label }} ({{configUnit}})</label>
                                        <input class="asowp-w-full asowp-border asowp-border-zinc-600 asowp-p-1 asowp-rounded-sm" type="number" name="" id="sizeHeight" :min="customSizes.height.min" :max="customSizes.height.max" v-model="customSizeValues.height" style="border-radius: 6px">
                                    </div>
                                </div>
                                <span @click="selectCustomSize(customSizes)" :class="`asowp-absolute asowp-bottom-0 asowp-left-0 asowp-w-full asowp-flex asowp-bg-[${configColors.optionsSideBar.options.modals.buttons.backgroundColor}] hover:asowp-bg-[${configColors.optionsSideBar.options.modals.buttons.hoverBackgroundColor}] asowp-text-[${configColors.optionsSideBar.options.modals.buttons.textColor}] hover:asowp-text-[${configColors.optionsSideBar.options.modals.buttons.hoverTextColor}] font-semibold asowp-text-md asowp-full-center asowp-border asowp-py-1 asowp-base-animation asowp-cursor-pointer`">
                                    {{ configVisualiserTexts.customSizeButtonDone && configVisualiserTexts.customSizeButtonDone.trim() !== '' ? configVisualiserTexts.customSizeButtonDone : 'Done' }}
                                </span>
                            </div>
                        </div>
                    </div>
    
                    <div v-show="step == 'shape'" class="asowp-flex asowp-flex-col lg:asowp-space-y-2 asowp-w-full asowp-h-full" id="asowp-shapes">
                        <p :class="`asowp-hidden lg:asowp-flex asowp-bg-[${configColors.optionsSideBar.options.modals.headerBackgroundColor}] asowp-text-[${configColors.optionsSideBar.options.modals.headerTextColor}] asowp-text-lg asowp-font-semibold asowp-p-2 asowp-px-4`">{{configVisualiserTexts.textShape}}</p>    
    
                        <div class="asowp-w-full asowp-h-full asowp-overflow-auto asowp-scrollBar">
                            <div class="asowp-grid asowp-grid-cols-3 lg:asowp-grid-cols-3 asowp-gap-2 asowp-w-full asowp-full-center asowp-p-1">
                                <div v-for="(shapee, id) in shapees">
                                    <div v-for="(shape, index) in allShapes" :key="shape.name" class="asowp-w-full asowp-flex">
                                        <div class="asowp-w-full asowp-flex" v-if="shapee.shapeId == index">
                                            <input type="radio" :id="shape.name + index" name="asowp-shape" class="peer asowp-hidden" @change="selectShape(shape.value, shapee, id)">
                                            <label :for="shape.name + index" :class="`${selectedShape == shape.value ? `asowp-text-[${configColors.optionsSideBar.options.modals.option.activeTextColor}]` : `asowp-text-[${configColors.optionsSideBar.options.modals.option.textColor}]`} 
                                                asowp-w-full asowp-h-full asowp-flex asowp-flex-col asowp-space-y-1 asowp-full-center asowp-whitespace-nowrap asowp-font-semibold asowp-text-sm hover:asowp-bg-[${configColors.optionsSideBar.options.modals.option.hoverBackgroundColor}] hover:asowp-text-[${configColors.optionsSideBar.options.modals.option.hoverTextColor}] asowp-rounded-md asowp-p-2 asowp-text-center asowp-cursor-pointer asowp-transition-all asowp-ease-in-out asowp-duration-500`"
                                            >
                                                <div :class="`${shape.icon === '' ? `asowp-bg-[${configColors.backgroundColorHeader}]` : ``} asowp-w-16 asowp-h-16`">
                                                    <img v-if="shape.icon != ''" :src="shape.icon" class="asowp-w-full asowp-h-full" />
                                                </div>
                                                <p>{{shape.name}}</p>
                                                <p v-if="shapee.additionalPrice > 0" class="asowp-text-[11px] asowp-leading-normal">({{shapee.additionalPrice}} {{props.currency}})</p>
                                                <p v-if="!shapee.additionalPrice > 0" class="asowp-text-[11px] asowp-leading-normal asowp-invisible">none</p>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
    
                    <div v-show="step == 'fixing-methode'" class="asowp-relative asowp-flex asowp-flex-col lg:asowp-space-y-1 asowp-w-full asowp-h-full" id="asowp-fixings-section">
                        <p :class="`asowp-hidden lg:asowp-flex asowp-bg-[${configColors.optionsSideBar.options.modals.headerBackgroundColor}] asowp-text-[${configColors.optionsSideBar.options.modals.headerTextColor}] asowp-text-lg asowp-font-semibold asowp-p-2 asowp-px-4`">{{configVisualiserTexts.textFixingMethods}}</p>    
    
                        <div v-if="materialType == 'simple'" class="asowp-h-full asowp-p-2 asowp-overflow-auto asowp-scrollBar">
                            <div v-for="(fixingg, id) in fixinggs">
                                <div v-for="(fixing, index) in allFixings">
                                    <div v-if="fixingg.fixingMethodId == index && (!fixingg.excludeShapes.includes(currentShapeId) && !fixingg.excludeSizes.includes(currentSizeId))" class="asowp-space-y-3 asowp-w-full asowp-h-full">
                                        <input type="radio" :id="fixing.name + index" name="asowp-fixings" class=" peer asowp-hidden" @change="selectFixingMethode(fixing.type, fixingg, id)">
                                        <label :for="fixing.name + index" :class="`asowp-flex asowp-full-center asowp-space-x-2 asowp-cursor-pointer asowp-text-[${configColors.optionsSideBar.options.modals.option.textColor}] hover:asowp-bg-[${configColors.optionsSideBar.options.modals.option.hoverBackgroundColor}]/50  hover:asowp-text-[${configColors.optionsSideBar.options.modals.option.hoverTextColor}] asowp-p-2 asowp-base-animation`">
                                            <div :class="`${fixing.icon === '' ? `asowp-bg-[${configColors.backgroundColorHeader}]` : `` } asowp-w-[15%] asowp-h-20 asowp-flex asowp-full-center`">
                                                <img v-if="fixing.icon != ''" :src="fixing.icon" class="asowp-w-auto asowp-h-full" />
                                            </div>
                                            <div :class="`asowp-w-3/4 asowp-flex asowp-flex-col asowp-space-y-1`">
                                                <p class="asowp-text-sm asowp-font-medium first-letter:asowp-uppercase">{{ fixing.name }} <span v-if="fixingg.additionalPrice > 0" class="asowp-text-[11px]">({{ fixingg.additionalPrice }} {{props.currency}})</span> </p>
                                                <p class="asowp-text-xs">{{ fixing.description }}</p>
                                                <div class="asowp-w-full asowp-flex asowp-items-center asowp-justify-between">
                                                    <span v-if="fixing.popImg.trim() != ''" @click="showFixingExample(true, fixing.popImg)" :class="`asowp-text-xs asowp-text-[${configColors.optionsSideBar.options.modals.option.activeTextColor}] asowp-underline asowp-cursor-pointer`">example</span>
                                                    <span v-if="fixing.popImg.trim() == ''" class="asowp-invisible">example</span>
                                                    <span :class="`${activeFixingMethode == fixing.type ? `asowp-text-[${configColors.optionsSideBar.options.modals.option.activeTextColor}]` : `asowp-text-transparent asowp-border-[${configColors.optionsSideBar.options.modals.option.activeTextColor}] asowp-border-solid asowp-border-2`} asowp-flex asowp-w-fit asowp-h-fit asowp-rounded-full`">
                                                        <svg fill="currentColor" class="asowp-w-6 asowp-h-6" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve" stroke="currentColor">
                                                            <g id="SVGRepo_bgCarrier" stroke-width="0"/>
                                                            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
                                                            <g id="SVGRepo_iconCarrier"> <g> <g> <path d="M256,0C114.837,0,0,114.843,0,256s114.837,256,256,256s256-114.843,256-256S397.163,0,256,0z M376.239,227.501 L257.348,346.391c-13.043,13.043-34.174,13.044-47.218,0l-68.804-68.804c-13.044-13.038-13.044-34.179,0-47.218 c13.044-13.044,34.174-13.044,47.218,0l45.195,45.19l95.282-95.278c13.044-13.044,34.174-13.044,47.218,0 C389.283,193.321,389.283,214.462,376.239,227.501z"/> </g> </g> </g>
                                                        </svg>
                                                    </span>                
                                                </div>
                                            </div>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div v-show="showFixingEx" :class="`asowp-absolute asowp-top-0 asowp-right-0 asowp-w-[85%] lg:asowp-w-full asowp-h-[90%] asowp-overflow-auto asowp-scrollBar asowp-translate-y-[-50%] lg:asowp-translate-y-[0%] lg:asowp-translate-x-[101%] asowp-bg-[${configColors.optionsSideBar.options.modals.backgroundColor}] asowp-text-[${configColors.optionsSideBar.options.modals.textColor}] asowp-p-2`">
                            <div v-html="fixingExample"></div>
                            <div class="asowp-absolute asowp-top-0 asowp-right-0 asowp-w-fit asowp-h-fit asowp-cursor-pointer">
                                <span @click="showFixingExample(false)" :class="`asowp-flex asowp-bg-[${configColors.optionsSideBar.options.modals.buttons.backgroundColor}] hover:asowp-bg-[${configColors.optionsSideBar.options.modals.buttons.hoverBackgroundColor}] asowp-text-[${configColors.optionsSideBar.options.modals.buttons.textColor}] hover:asowp-text-[${configColors.optionsSideBar.options.modals.buttons.hoverTextColor}] asowp-p-1 asowp-base-animation`">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="asowp-w-5 asowp-h-5">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                                    </svg>
                                </span>
                            </div>
                        </div>
    
                        <div v-if="materialType == 'advance'" class="asowp-h-full asowp-p-4 asowp-overflow-auto asowp-scrollBar">
                            <div v-for="(fixingId) in fixinggs">
                                <div v-for="(fixing, index) in allFixings">
                                    <div v-if="fixingId == index" class="asowp-space-y-3">
                                        <input type="radio" :id="fixing.name + index" name="asowp-fixings" class=" peer asowp-hidden" @change="selectFixingMethode(fixing.type, fixingg)">
                                        <label :for="fixing.name + index" class="asowp-flex asowp-full-center asowp-space-x-2 asowp-cursor-pointer">
                                            <div :class="`${fixing.icon === '' ? `asowp-bg-[${configColors.backgroundColorHeader}]` : `` } asowp-w-[15%] asowp-h-20`">
                                                <img v-if="fixing.icon != ''" :src="fixing.icon" class="asowp-w-auto asowp-h-full" />
                                            </div>
                                            <div :class="`asowp-w-3/4 asowp-flex asowp-flex-col asowp-space-y-1`">
                                                <p class="asowp-text-sm asowp-font-medium first-letter:asowp-uppercase">{{ fixing.name }}</p>
                                                <p class="asowp-text-xs">{{ fixing.description }}</p>
                                                <div class="asowp-w-full asowp-flex asowp-items-center asowp-justify-between">
                                                    <span v-if="fixing.popImg != ''" class="asowp-text-xs asowp-text-red-500 asowp-underline asowp-cursor-pointer">example</span>
                                                    <span v-if="fixing.popImg == ''" class="asowp-invisible">example</span>
                                                    <span :class="`${activeFixingMethode == fixing.type ? `asowp-text-[${configColors.optionsSideBar.options.modals.option.activeTextColor}]` : `asowp-text-transparent asowp-border-[${configColors.optionsSideBar.options.modals.option.activeTextColor}] asowp-border-solid asowp-border-2`} asowp-flex asowp-w-fit asowp-h-fit asowp-rounded-full`">
                                                        <svg fill="currentColor" class="asowp-w-6 asowp-h-6" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve" stroke="currentColor">
                                                            <g id="SVGRepo_bgCarrier" stroke-width="0"/>
                                                            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
                                                            <g id="SVGRepo_iconCarrier"> <g> <g> <path d="M256,0C114.837,0,0,114.843,0,256s114.837,256,256,256s256-114.843,256-256S397.163,0,256,0z M376.239,227.501 L257.348,346.391c-13.043,13.043-34.174,13.044-47.218,0l-68.804-68.804c-13.044-13.038-13.044-34.179,0-47.218 c13.044-13.044,34.174-13.044,47.218,0l45.195,45.19l95.282-95.278c13.044-13.044,34.174-13.044,47.218,0 C389.283,193.321,389.283,214.462,376.239,227.501z"/> </g> </g> </g>
                                                        </svg>
                                                    </span>                
                                                </div>
                                            </div>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
    
                    <div v-show="step == 'color'" class="asowp-flex asowp-flex-col lg:asowp-space-y-3 asowp-w-full asowp-h-full" id="asowp-colors-section">
                        <p :class="`asowp-hidden lg:asowp-flex asowp-bg-[${configColors.optionsSideBar.options.modals.headerBackgroundColor}] asowp-text-[${configColors.optionsSideBar.options.modals.headerTextColor}] asowp-text-lg asowp-font-semibold asowp-p-2 asowp-px-4`">
                            {{ configVisualiserTexts.textColor && configVisualiserTexts.textColor.trim() !== '' ? configVisualiserTexts.textColor : 'Color' }}
                        </p>    
    
                        <div v-if="materialType === 'simple'" class="asowp-w-full asowp-h-full asowp-space-y-2 asowp-p-3 asowp-overflow-auto asowp-scrollBar">
                            <div :class="`asowp-flex asowp-flex-wrap asowp-gap-2 asowp-p-1 asowp-text-[${configColors.optionsSideBar.options.modals.option.textColor}]`">
                                <div v-for="(colorr, id) in colorrs.allColors" class="asowp-flex asowp-flex-col asowp-items-center asowp-justify-start asowp-space-y-2">
                                    <div v-if="!colorr.pattern.active" @click="changeSignColor(id, colorr.name, colorr.pattern, colorr.textColor, colorr.additionalPrice)" :class="`${activeFace === 'front-face' && activeSignColor === colorr.name && activeSignColoriD == id || activeFace === 'back-face' && activeSignFace2Color === colorr.name && activeSignFace2ColoriD == id ? `asowp-ring-2 asowp-ring-[${configColors.optionsSideBar.options.modals.option.activeTextColor}]` : `` } asowp-w-14 asowp-h-14 asowp-bg-[${colorr.pattern.codeHex}] asowp-flex asowp-full-center asowp-font-bold asowp-text-lg asowp-text-[${colorr.textColor.codeHex}] asowp-rounded-full asowp-cursor-pointer asowp-overflow-hidden asowp-relative`"> 
                                        <img v-if="colorr.prevImg !== ''" :src="colorr.prevImg" :class="`asowp-absolute asowp-top-0 asowp-left-0 asowp-w-full asowp-h-full`" />
                                        <span v-if="colorr.textColor.active" class="asowp-z-10">C</span>
                                    </div>
                                    <div v-if="colorr.pattern.active" @click="changeSignColor(id, colorr.name, colorr.pattern, colorr.textColor, colorr.additionalPrice)" :class="`${activeFace === 'front-face' && activeSignColor === colorr.name && activeSignColoriD == id || activeFace === 'back-face' && activeSignFace2Color === colorr.name && activeSignFace2ColoriD == id ? `asowp-ring-2 asowp-ring-[${configColors.optionsSideBar.options.modals.option.activeTextColor}]` : `` } asowp-relative asowp-w-14 asowp-h-14 asowp-flex asowp-full-center asowp-font-bold asowp-text-lg asowp-text-[${colorr.textColor.codeHex}] asowp-rounded-full asowp-cursor-pointer asowp-overflow-hidden asowp-relative`"> 
                                        <img v-if="colorr.prevImg !== ''" :src="colorr.prevImg" :class="`asowp-absolute asowp-top-0 asowp-left-0 asowp-w-full asowp-h-full`"  />
                                        <img v-if="colorr.prevImg === ''" :src="colorr.pattern.url" :class="`asowp-absolute asowp-top-0 asowp-left-0 asowp-w-full asowp-h-full`"  />
                                        <span v-if="colorr.textColor.active" class="asowp-z-10">C</span>
                                    </div>
    
                                    <p class="asowp-text-sm">{{colorr.name }}</p>
                                    <p v-if="colorr.textColor.active" class="asowp-text-sm asowp-leading-4">{{colorr.textColor.name}}</p>
                                    <p v-if="colorr.additionalPrice > 0" class="asowp-text-[11px] asowp-leading-normal">({{colorr.additionalPrice}} {{props.currency}})</p>
                                </div>
                            </div>
                            <div v-if="colorrs.customColors.active" :class="`asowp-flex asowp-flex-col asowp-space-y-2`">
                                <p class="asowp-font-medium">{{colorrs.customColors.label}}</p>
                                <div :class="`asowp-relative asowp-w-fit`">
                                    <input id="asowp-setSignColor" type="color" v-model="simpleColor" class="asowp-inputColor-hide asowp-absolute asowp-top-[30%] asowp-left-[30%]" @input="changeSignColor(-1, colorrs.customColors.label, {active: false, codeHex: simpleColor, url: ''}, {active: false, codeHex: '', sameForBorder: false}, 0)"/>
                                    <label for="asowp-setSignColor" :class="`${activeSignColor == colorrs.customColors.label ? `asowp-ring-2 asowp-ring-[${configColors.optionsSideBar.options.modals.option.activeTextColor}]` : `` } asowp-w-14 asowp-h-14 asowp-flex asowp-full-center asowp-rounded-full asowp-overflow-hidden`">
                                        <svg v-if="colorrs.customColors.prevImg === ''" viewBox="0 0 44 44" xmlns="http://www.w3.org/2000/svg" class="asowp-w-full asowp-h-full">
                                            <g fill="none" fill-rule="evenodd">
                                                <path d="M22.015.061H.95a.866.866 0 0 0-.614.256l21.68 21.68V.061z" fill="#CE1128"></path>
                                                <path d="M.335.317A.867.867 0 0 0 .08.93v21.066h21.935L.335.317z" fill="#ED2E8A"></path>
                                                <path d="M43.696.317a.866.866 0 0 0-.614-.256H22.015v21.936L43.695.317z" fill="#F99410"></path>
                                                <path d="M43.696 43.678a.866.866 0 0 0 .255-.614V21.997H22.015l21.68 21.68z" fill="#20B718"></path>
                                                <path d="M43.696.317l-21.68 21.68H43.95V.931a.867.867 0 0 0-.255-.614" fill="#FCEA10"></path>
                                                <path d="M22.015 43.933h21.067a.87.87 0 0 0 .614-.255l-21.68-21.68v21.935z" fill="#2CB1E5"></path>
                                                <path d="M.08 21.997v21.067c0 .239.097.456.255.614l21.68-21.68H.08z" fill="#662483"></path>
                                                <path d="M.335 43.678a.867.867 0 0 0 .614.255h21.066V21.997L.335 43.677z" fill="#126EB2"></path>
                                            </g>
                                        </svg>
                                        <img v-if="colorrs.customColors.prevImg !== ''" class="asowp-w-full asowp-h-full"/>
                                    </label>
                                </div>
                            </div>
                        </div>
    
                        <div v-if="materialType === 'advance' && advancedComponent.options.length > 0" class="asowp-w-full asowp-h-full asowp-p-3 asowp-overflow-auto asowp-scrollBar">
                            <div class="asowp-flex asowp-flex-wrap asowp-gap-2 asowp-p-1">
                                <div v-for="(colorr, id) in colorrs" class="asowp-flex asowp-flex-col asowp-space-y-2 asowp-full-center">
                                    <div class="asowp-w-16 asowp-h-16 asowp-rounded-full asowp-overflow-hidden">
                                        <img :src="colorr.image" class="asowp-w-full asowp-h-full" />
                                    </div>
                                    <p class="asowp-text-sm">{{colorr.color.name}}</p>
                                </div>
                            </div>
                        </div>
                    </div>
    
                    <div v-show="step == 'border'" class="asowp-flex asowp-flex-col lg:asowp-space-y-2 asowp-w-full asowp-h-full" id="asowp-borders-section">
                        <p :class="`asowp-hidden lg:asowp-flex asowp-bg-[${configColors.optionsSideBar.options.modals.headerBackgroundColor}] asowp-text-[${configColors.optionsSideBar.options.modals.headerTextColor}] asowp-text-lg asowp-font-semibold asowp-p-2 asowp-px-4`">{{configVisualiserTexts.textBorder}}</p>    
    
                        <div class="asowp-w-full asowp-h-full asowp-p-2 asowp-overflow-auto asowp-scrollBar">
                            <div class="asowp-flex asowp-flex-wrap asowp-gap-2 asowp-p-1">
                                <div v-if="activeFace === 'front-face'" v-for="(borderr, id) in borderrs.allBorders">
                                    <div v-for="(border, index) in allBorders" :key="border.name" class="asowp-w-full asowp-flex">
                                        <div v-if="borderr.manageBorderId == index && (!borderr.excludeShapes.includes(currentShapeId) && !borderr.excludeSizes.includes(currentSizeId))">
                                            <input type="radio" :id="'border' + border.name + index + 'face1'" name="asowp-borders-face1" class="peer asowp-hidden" @input="selectBorder(border.value, borderr.settings, borderr.additionalPrice, borderr.excludeShapes, borderr.excludeSizes, id)">
                                            <label :for="'border' + border.name + index + 'face1'" :class="`${activeFace === 'front-face' && activeFace1Border === border.value ? `asowp-text-[${configColors.optionsSideBar.options.modals.option.activeTextColor}]` : `asowp-text-[${configColors.optionsSideBar.options.modals.option.textColor}]`} 
                                                asowp-w-full asowp-h-full asowp-flex asowp-flex-col asowp-space-y-1 asowp-full-center asowp-font-semibold asowp-text-sm hover:asowp-bg-[${configColors.optionsSideBar.options.modals.option.hoverBackgroundColor}] hover:asowp-text-[${configColors.optionsSideBar.options.modals.option.hoverTextColor}] asowp-rounded-md asowp-p-2 asowp-text-center asowp-cursor-pointer asowp-transition-all asowp-ease-in-out asowp-duration-500`"
                                            >
                                                <div :class="`${border.icon != '' ? `` : `asowp-bg-[${configColors.backgroundColorHeader}]`} asowp-w-14 asowp-h-14`">
                                                    <img v-if="border.icon != ''" :src="border.icon" class="asowp-w-full asowp-h-full" />
                                                </div>
                                                <p>{{border.name}}</p>
                                                <p v-if="borderr.additionalPrice > 0" class="asowp-text-[11px] asowp-leading-normal">({{borderr.additionalPrice}} {{props.currency}})</p>
                                                <p v-if="!borderr.additionalPrice > 0" class="asowp-text-[11px] asowp-leading-normal asowp-invisible">none</p>
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div v-if="activeFace === 'back-face'" v-for="(borderr, id) in borderrs.allBorders">
                                    <div v-for="(border, index) in allBorders" :key="border.name" class="asowp-w-full asowp-flex">
                                        <div v-if="borderr.manageBorderId == index && (!borderr.excludeShapes.includes(currentShapeId) && !borderr.excludeSizes.includes(currentSizeId))">
                                            <input type="radio" :id="'border' + border.name + index + 'face2'" name="asowp-borders-face2" class="peer asowp-hidden" @input="selectBorder(border.value, borderr.settings, borderr.additionalPrice, borderr.excludeShapes, borderr.excludeSizes, id)">
                                            <label :for="'border' + border.name + index + 'face2'" :class="`${activeFace === 'back-face' && activeFace2Border === border.value ? `asowp-text-[${configColors.optionsSideBar.options.modals.option.activeTextColor}]` : `asowp-text-[${configColors.optionsSideBar.options.modals.option.textColor}]`} 
                                                asowp-w-full asowp-h-full asowp-flex asowp-flex-col asowp-space-y-1 asowp-full-center asowp-font-semibold asowp-text-sm hover:asowp-bg-[${configColors.optionsSideBar.options.modals.option.hoverBackgroundColor}] hover:asowp-text-[${configColors.optionsSideBar.options.modals.option.hoverTextColor}] asowp-rounded-md asowp-p-2 asowp-text-center asowp-cursor-pointer asowp-transition-all asowp-ease-in-out asowp-duration-500`"
                                            >
                                                <div :class="`${border.icon != '' ? `` : `asowp-bg-[${configColors.backgroundColorHeader}]`} asowp-w-14 asowp-h-14`">
                                                    <img v-if="border.icon != ''" :src="border.icon" class="asowp-w-full asowp-h-full" />
                                                </div>
                                                <p>{{border.name}}</p>
                                                <p v-if="borderr.additionalPrice > 0" class="asowp-text-[11px] asowp-leading-normal">({{borderr.additionalPrice}} {{props.currency}})</p>
                                                <p v-if="!borderr.additionalPrice > 0" class="asowp-text-[11px] asowp-leading-normal asowp-invisible">none</p>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
    
                            <div v-if="(colorForBorder1 && activeFace === 'front-face' && borderColors1.length > 0) || (colorForBorder2 && activeFace === 'back-face' && borderColors2.length > 0)" class="asowp-p-2">
                                <p class="asowp-font-medium">Colors</p>
                                <div v-if="activeFace === 'front-face'">
                                    <div class="asowp-flex asowp-flex-wrap asowp-gap-2 asowp-p-1">
                                        <div v-for="(color, index) in borderColors1" :class="`asowp-flex asowp-flex-col asowp-full-center asowp-space-y-2 asowp-text-[${configColors.optionsSideBar.options.modals.option.textColor}]`">
                                            <div @click="changeBorderColor(color.codeHex, color.additionalPrice)" :class="`${activeFace1BorderColor === color.codeHex ? `asowp-ring-2 asowp-ring-[${configColors.optionsSideBar.options.modals.option.activeTextColor}]` : ``} asowp-w-12 asowp-h-12 asowp-bg-[${color.codeHex}] asowp-flex asowp-full-center asowp-font-bold asowp-text-lg asowp-rounded-full asowp-cursor-pointer`"></div>           
                                            <p class="asowp-text-xs">{{color.name}}</p>
                                            <p v-if="color.additionalPrice > 0" class="asowp-text-[10px] asowp-leading-normal">({{color.additionalPrice}} {{props.currency}})</p>
                                            <p v-if="!color.additionalPrice > 0" class="asowp-text-[10px] asowp-leading-normal asowp-invisible">none</p>
                                        </div>
                                        <div :class="`asowp-relative`">
                                            <input id="asowp-setBorderColor1" type="color" v-model="borderCustomColor1" class="asowp-inputColor-hide asowp-absolute asowp-top-[30%] asowp-left-[30%]" @input="changeBorderColor($event.target.value , 0)" />
                                            <label for="asowp-setBorderColor1" v-if="customBorderColor1" :class="`${activeSignColor == 'custom' ? `asowp-ring-2 asowp-ring-[${configColors.backgroundColorHeader}]` : `` } asowp-w-12 asowp-h-12 asowp-flex asowp-full-center asowp-rounded-full asowp-overflow-hidden`">
                                                <svg viewBox="0 0 44 44" xmlns="http://www.w3.org/2000/svg" class="asowp-w-full asowp-h-full">
                                                    <g fill="none" fill-rule="evenodd">
                                                        <path d="M22.015.061H.95a.866.866 0 0 0-.614.256l21.68 21.68V.061z" fill="#CE1128"></path>
                                                        <path d="M.335.317A.867.867 0 0 0 .08.93v21.066h21.935L.335.317z" fill="#ED2E8A"></path>
                                                        <path d="M43.696.317a.866.866 0 0 0-.614-.256H22.015v21.936L43.695.317z" fill="#F99410"></path>
                                                        <path d="M43.696 43.678a.866.866 0 0 0 .255-.614V21.997H22.015l21.68 21.68z" fill="#20B718"></path>
                                                        <path d="M43.696.317l-21.68 21.68H43.95V.931a.867.867 0 0 0-.255-.614" fill="#FCEA10"></path>
                                                        <path d="M22.015 43.933h21.067a.87.87 0 0 0 .614-.255l-21.68-21.68v21.935z" fill="#2CB1E5"></path>
                                                        <path d="M.08 21.997v21.067c0 .239.097.456.255.614l21.68-21.68H.08z" fill="#662483"></path>
                                                        <path d="M.335 43.678a.867.867 0 0 0 .614.255h21.066V21.997L.335 43.677z" fill="#126EB2"></path>
                                                    </g>
                                                </svg>
                                            </label>
                                        </div>
                                    </div>
                                </div>
    
                                <div v-if="activeFace === 'back-face'">
                                    <div class="asowp-flex asowp-flex-wrap asowp-gap-2 asowp-p-1">
                                        <div v-for="(color, index) in borderColors2"  class="asowp-flex asowp-flex-col asowp-full-center asowp-space-y-2">
                                            <div @click="changeBorderColor(color.codeHex, color.additionalPrice)" :class="`${activeFace2BorderColor === color.codeHex ? `asowp-ring-2 asowp-ring-[${configColors.backgroundColorHeader}]` : ``} asowp-w-12 asowp-h-12 asowp-bg-[${color.codeHex}] asowp-flex asowp-full-center asowp-font-bold asowp-text-lg asowp-rounded-full asowp-cursor-pointer`"></div>
                                            <p class="asowp-text-xs">{{color.name}}</p>    
                                            <p v-if="color.additionalPrice > 0" class="asowp-text-[10px] asowp-leading-normal">({{color.additionalPrice}} {{props.currency}})</p>
                                            <p v-if="!color.additionalPrice > 0" class="asowp-text-[10px] asowp-leading-normal asowp-invisible">none</p>
                                        </div>
                                        <div :class="`asowp-relative`">
                                            <input id="asowp-setBorderColor2" type="color" v-model="borderCustomColor2" class="asowp-inputColor-hide asowp-absolute asowp-top-[30%] asowp-left-[30%]" @input="changeBorderColor($event.target.value , 0)" />
                                            <label for="asowp-setBorderColor2" v-if="customBorderColor2" :class="`${activeSignColor == 'custom' ? `asowp-ring-2 asowp-ring-[${configColors.backgroundColorHeader}]` : `` } asowp-w-12 asowp-h-12 asowp-flex asowp-full-center asowp-rounded-full asowp-overflow-hidden`">
                                                <svg viewBox="0 0 44 44" xmlns="http://www.w3.org/2000/svg" class="asowp-w-full asowp-h-full">
                                                    <g fill="none" fill-rule="evenodd">
                                                        <path d="M22.015.061H.95a.866.866 0 0 0-.614.256l21.68 21.68V.061z" fill="#CE1128"></path>
                                                        <path d="M.335.317A.867.867 0 0 0 .08.93v21.066h21.935L.335.317z" fill="#ED2E8A"></path>
                                                        <path d="M43.696.317a.866.866 0 0 0-.614-.256H22.015v21.936L43.695.317z" fill="#F99410"></path>
                                                        <path d="M43.696 43.678a.866.866 0 0 0 .255-.614V21.997H22.015l21.68 21.68z" fill="#20B718"></path>
                                                        <path d="M43.696.317l-21.68 21.68H43.95V.931a.867.867 0 0 0-.255-.614" fill="#FCEA10"></path>
                                                        <path d="M22.015 43.933h21.067a.87.87 0 0 0 .614-.255l-21.68-21.68v21.935z" fill="#2CB1E5"></path>
                                                        <path d="M.08 21.997v21.067c0 .239.097.456.255.614l21.68-21.68H.08z" fill="#662483"></path>
                                                        <path d="M.335 43.678a.867.867 0 0 0 .614.255h21.066V21.997L.335 43.677z" fill="#126EB2"></path>
                                                    </g>
                                                </svg>
                                            </label>
                                        </div>
    
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
    
                    <div v-show="step == 'text'" class="asowp-flex asowp-flex-col lg:asowp-space-y-3 asowp-w-full asowp-h-full" id="asowp-texts-section">
                        <p :class="`asowp-hidden lg:asowp-flex asowp-bg-[${configColors.optionsSideBar.options.modals.headerBackgroundColor}] asowp-text-[${configColors.optionsSideBar.options.modals.headerTextColor}] asowp-text-lg asowp-font-semibold asowp-p-2 asowp-px-4`">{{configVisualiserTexts.textOptionText}}</p>    
    
                        <div :class="`asowp-bg-[${configColors.backgroundColorHeader}]/10 asowp-flex asowp-flex-col asowp-space-y-3 asowp-full-center asowp-p-4 asowp-m-1`">
                            <span v-show="selectText" @click="changeText" :class="`asowp-w-3/4 asowp-flex asowp-full-center asowp-space-x-3 asowp-text-[${configColors.backgroundButton}] asowp-border asowp-border-solid asowp-border-[${configColors.backgroundButton}] asowp-text-md asowp-p-2 asowp-px-4 asowp-rounded-full asowp-cursor-pointer`">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="asowp-w-5 asowp-h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                                </svg>
                                <p class="asowp-text-center asowp-px-2">Change text</p>
                            </span>

                            <span v-show="!selectText" @click="addTextToSign()" :class="`asowp-w-3/4 asowp-flex asowp-full-center asowp-space-x-3 asowp-bg-[${configColors.optionsSideBar.options.modals.buttons.backgroundColor}] hover:asowp-bg-[${configColors.optionsSideBar.options.modals.buttons.hoverBackgroundColor}] asowp-text-[${configColors.optionsSideBar.options.modals.buttons.textColor}] hover:asowp-text-[${configColors.optionsSideBar.options.modals.buttons.hoverTextColor}] asowp-border asowp-text-white asowp-text-md asowp-p-2 asowp-px-4 asowp-rounded-full asowp-cursor-pointer asowp-base-animation`">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="asowp-w-5 asowp-h-5">
                                    <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z" clip-rule="evenodd" />
                                </svg>
                                <p class="asowp-text-center">Add new text</p>
                            </span>
                        </div>

                        <div class="asowp-h-full asowp-overflow-auto asowp-scrollBar asowp-space-y-2 asowp-p-3">
                                    
                            <div v-show="!selectText">
                                <p class="asowp-font-medium" v-show="addedTexts.length > 0">Text added</p>
                                <div class="asowp-p-2 asowp-space-y-2">
                                    <div v-for="(textObject, index) in addedTexts">
                                        <div :class="`${activeFace == textObject.canvasName ? `asowp-cursor-pointer` : `asowp-cursor-not-allowed`} asowp-text-[${configColors.optionsSideBar.options.modals.option.textColor}] hover:asowp-bg-[${configColors.optionsSideBar.options.modals.option.hoverBackgroundColor}] hover:asowp-text-[${configColors.optionsSideBar.options.modals.option.hoverTextColor}] asowp-border asowp-border-solid asowp-border-[${configColors.optionsSideBar.options.modals.option.textColor}]/20 asowp-p-2 asowp-base-animation asowp-rounded-sm`" @click="getTextObject(textObject, true)">
                                            <p class="asowp-text-sm">{{configVisualiserTexts.textOptionText && configVisualiserTexts.textOptionText.trim() != '' ? configVisualiserTexts.textOptionText : 'Text'}} {{ index }}</p>
                                            <p class="asowp-text-xs">{{textObject.text}}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
    
                            <div v-show="selectText" class="asowp-space-y-2">
                                <textarea name="" id="asowp-text-editor" :disabled="route.name !== 'template-maker' && selectedText.object.editable === false" class="asowp-h-24 asowp-w-full asowp-border asowp-border-zinc-600 asowp-p-1 asowp-rounded-sm" v-model="selectedText.value" @input="changeTextValue" style="border-radius: 6px"></textarea>
    
                                <div v-show="allFonts.length > 0" class="asowp-space-y-1">
                                    <p class="asowp-font-medium">Font</p>
                                    <div @click="dropFontToggle()" id="asowp-fontSelected-dropdown" :class="`asowp-cursor-pointer asowp-items-center asowp-space-x-3 asowp-bg-[${configColors.optionsSideBar.options.modals.buttons.backgroundColor}] hover:asowp-bg-[${configColors.optionsSideBar.options.modals.buttons.hoverBackgroundColor}] asowp-text-[${configColors.optionsSideBar.options.modals.buttons.textColor}] hover:asowp-text-[${configColors.optionsSideBar.options.modals.buttons.hoverTextColor}]  asowp-px-2 asowp-border border-gray-400 asowp-rounded-md asowp-flex asowp-justify-between asowp-text-base asowp-base-animation`">
                                        <div :class="`asowp-w-fit asowp-flex asowp-items-center asowp-justify-center asowp-font-[${fontFamSelected.replaceAll(/\s+/g, '-')}] asowp-p-2`">
                                            <p v-show="fontFamSelected != ''" :class="`lg:asowp-text-sm `" >{{ fontFamSelected }}</p>
                                            <p v-show="fontFamSelected == ''" class="lg:asowp-text-sm xl:asowp-text-base" >Font</p>
                                        </div>
                                        <div class="asowp-flex asowp-items-center asowp-justify-center">
                                            <svg v-show="!showFont" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="asowp-w-6 asowp-h-6 lg:w-5 lg:asowp-h-5">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                            </svg>
                                            <svg v-show="showFont" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="asowp-w-6 asowp-h-6 lg:w-5 lg:asowp-h-5">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                                            </svg>                                  
                                        </div>
                                    </div>
                                    <div v-show="showFont" class="asowp-flex asowp-flex-wrap asowp-gap-2 asowp-p-1">
                                        <div class="asowp-flex asowp-items-center asowp-justify-center asowp-w-fit asowp-h-10" v-for="(font, index) in allFonts">
                                            <input type="radio" :id="font.label + index + 1" name="asowp-fonts" class=" peer asowp-hidden " @click="changeTextFontFam((font.label.replaceAll(/\s+/g, '-')), font.url, index)">
                                            <label :for="font.label + index + 1" :class="`${fontFamSelected == font.label ? `asowp-ring-2 asowp-ring-[${configColors.optionsSideBar.options.modals.option.activeTextColor}] asowp-text-[${configColors.optionsSideBar.options.modals.option.activeTextColor}]` : `asowp-text-[${configColors.optionsSideBar.options.modals.option.textColor}]`} 
                                                asowp-font-[${font.label.replaceAll(/\s+/g, '-')}] asowp-w-full asowp-border-solid asowp-border asowp-justify-center asowp-font-semibold asowp-text-sm hover:asowp-text-[${configColors.optionsSideBar.options.modals.option.activeTextColor}] hover:asowp-border-[${configColors.optionsSideBar.options.modals.option.activeTextColor}] asowp-rounded-md asowp-p-2 asowp-text-center asowp-cursor-pointer asowp-transition-all asowp-ease-in-out asowp-duration-500`"
                                                >
                                                {{font.label}}
                                            </label>
                                        </div>
                                    </div>
                                </div>
    
                                <div class="asowp-w-full asowp-flex asowp-justify-between">
                                    <div v-if="configTextSettings.enableTextAlignment" :class="`${!configTextFontSettings.active ? `asowp-w-full` : `asowp-w-[45%]`} asowp-space-y-2 asowp-flex asowp-flex-col`">
                                        <p class="asowp-font-medium">Text alignment</p>
                                        <div class="asowp-flex asowp-flex-1 asowp-w-full asowp-rounded-md asowp-overflow-hidden">
                                            <span @click="changeTextAlign('left')" :class="`${selectedText.align === 'left' ? `asowp-bg-[${configColors.optionsSideBar.options.modals.buttons.backgroundColor}] asowp-text-[${configColors.optionsSideBar.options.modals.buttons.textColor}]` : 'asowp-bg-transparent'} hover:asowp-bg-[${configColors.optionsSideBar.options.modals.option.hoverBackgroundColor}] hover:asowp-text-[${configColors.optionsSideBar.options.modals.option.hoverTextColor}] asowp-w-1/3 asowp-flex asowp-full-center asowp-p-1 asowp-border asowp-base-animation asowp-cursor-pointer`">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="asowp-w-6 asowp-h-6">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
                                                </svg>
                                            </span>
                                            <span @click="changeTextAlign('center')" :class="`${selectedText.align === 'center' ? `asowp-bg-[${configColors.optionsSideBar.options.modals.buttons.backgroundColor}] asowp-text-[${configColors.optionsSideBar.options.modals.buttons.textColor}]` : 'asowp-bg-transparent'} hover:asowp-bg-[${configColors.optionsSideBar.options.modals.option.hoverBackgroundColor}] hover:asowp-text-[${configColors.optionsSideBar.options.modals.option.hoverTextColor}] asowp-w-1/3 asowp-flex asowp-full-center asowp-p-1 asowp-border asowp-base-animation asowp-cursor-pointer`">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="asowp-w-6 asowp-h-6">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                                </svg>
                                            </span>
                                            <span @click="changeTextAlign('right')" :class="`${selectedText.align === 'right' ? `asowp-bg-[${configColors.optionsSideBar.options.modals.buttons.backgroundColor}] asowp-text-[${configColors.optionsSideBar.options.modals.buttons.textColor}]` : 'asowp-bg-transparent'} hover:asowp-bg-[${configColors.optionsSideBar.options.modals.option.hoverBackgroundColor}] hover:asowp-text-[${configColors.optionsSideBar.options.modals.option.hoverTextColor}] asowp-w-1/3 asowp-flex asowp-full-center asowp-p-1 asowp-border asowp-base-animation asowp-cursor-pointer`">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="asowp-w-6 asowp-h-6">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25" />
                                                </svg>
                                            </span>
                                        </div>
                                    </div>
                                    
                                    <div v-show="configTextFontSettings.active" :class="`${!configTextSettings.enableTextAlignment ? `asowp-w-full` : `asowp-w-[45%]`} asowp-space-y-2 asowp-flex asowp-flex-col`">
                                        <p class="asowp-font-medium">{{configVisualiserTexts.textSize && configVisualiserTexts.textSize.trim() !== '' ? configVisualiserTexts.textSize : 'Size'}}</p>
                                        <div class="asowp-flex asowp-flex-1 asowp-w-full">
                                            <span @click="changeTextSizeValue('down')" :class="`${route.name !== 'template-maker' && selectedText.object.lockScale ? 'asowp-cursor-not-allowed' : 'asowp-cursor-pointer'} asowp-w-1/3 asowp-h-full asowp-flex asowp-full-center asowp-bg-[${configColors.optionsSideBar.options.modals.buttons.backgroundColor}] hover:asowp-bg-[${configColors.optionsSideBar.options.modals.buttons.hoverBackgroundColor}] asowp-text-[${configColors.optionsSideBar.options.modals.buttons.textColor}] hover:asowp-text-[${configColors.optionsSideBar.options.modals.buttons.hoverTextColor}] asowp-rounded-s-md asowp-base-animation`">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="asowp-w-5 asowp-h-5">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14" />
                                                </svg>
                                            </span>

                                            <input type="number" name="" id="asowp-text-size" class="asowp-w-1/3 asowp-h-full asowp-border asowp-p-1 asowp-text-center" :min="configTextFontSettings.minimumFontSize" :max="configTextFontSettings.maximumFontSize" @input="changeTextSize($event.target.value, configTextFontSettings.minimumFontSize, configTextFontSettings.maximumFontSize)" disabled style="margin: 0 !important; padding: 0 !important; text-align: center !important;">
                                            
                                            <span @click="changeTextSizeValue('up')" :class="`${route.name !== 'template-maker' && selectedText.object.lockScale ? 'asowp-cursor-not-allowed' : 'asowp-cursor-pointer'} asowp-w-1/3 asowp-h-full asowp-flex asowp-full-center asowp-bg-[${configColors.optionsSideBar.options.modals.buttons.backgroundColor}] hover:asowp-bg-[${configColors.optionsSideBar.options.modals.buttons.hoverBackgroundColor}] asowp-text-[${configColors.optionsSideBar.options.modals.buttons.textColor}] hover:asowp-text-[${configColors.optionsSideBar.options.modals.buttons.hoverTextColor}] asowp-rounded-e-md asowp-base-animation`">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="asowp-w-5 asowp-h-5">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                                </svg>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                
                                <div v-if="configTextType == '3D'">
                                    <div>
                                        <div class="asowp-flex asowp-items-center asowp-justify-between">
                                            <p class="asowp-font-semibold">Border size</p>

                                            <span @click="show3DTextHelp()" :class="`asowp-flex asowp-text-[${configColors.optionsSideBar.options.modals.buttons.backgroundColor}] asowp-text-[${configColors.optionsSideBar.options.modals.buttons.textColor}] asowp-cursor-pointer`">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="aswp-w-6 asowp-h-6">
                                                    <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm11.378-3.917c-.89-.777-2.366-.777-3.255 0a.75.75 0 0 1-.988-1.129c1.454-1.272 3.776-1.272 5.23 0 1.513 1.324 1.513 3.518 0 4.842a3.75 3.75 0 0 1-.837.552c-.676.328-1.028.774-1.028 1.152v.75a.75.75 0 0 1-1.5 0v-.75c0-1.279 1.06-2.107 1.875-2.502.182-.088.351-.199.503-.331.83-.727.83-1.857 0-2.584ZM12 18a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clip-rule="evenodd" />
                                                </svg>
                                            </span>
                                        </div>
                                        <div class="asowp-p-2 asowp-space-y-0.5">
                                            <label for="asowp-text-firstBorderWidth" class="asop-text-[0.3em]">First border</label>
                                            <input  type="range" name="asowp-borderSize" id="asowp-text-firstBorderWidth" :class="`asowp-cursor-pointer asowp-w-full`" :min="0" :max="25" :step="1" :value="borderLayerSize" @input="(e)=> {changeTextBorder(true, e)}">
                                            <label for="asowp-text-secondBorderWidth" class="asop-text-[0.3em]">Second border</label>
                                            <input  type="range" name="asowp-borderSize" id="asowp-text-secondBorderWidth" :class="`asowp-cursor-pointer asowp-w-full`" :min="0" :max="30" :step="1" :value="borderSize" @input="(e)=> {changeTextBorder(false, e)}">
                                        </div>


                                        <div v-if="textSideHelp" :class="`asowp-absolute asowp-top-[10%] asowp-bg-[${configColors.optionsSideBar.options.modals.backgroundColor}] asowp-text-[${configColors.optionsSideBar.options.modals.textColor}] asowp-flex asowp-w-[70%] asowp-h-[80%] asowp-left-[31%] asowp-translate-x-[100%] asowp-justify-center asowp-z-10`">
                                            <div class="asowp-flex asowp-flex-col asowp-w-full asowp-h-full asowp-space-y-2 asowp-overflow-auto asowp-p-2 asowp-scrollBar">
                                                <div class="asowp-flex asowp-flex-col asowp-w-full asowp-items asowp-justify-start">
                                                    <div :class="`asowp-w-[90%] asowp-h-40 asowp-flex asowp-bg-[${configColors.optionsSideBar.options.modals.buttons.backgroundColor}]`"></div>
                                                    <!-- <img :src="first-border.png" alt="" class="asowp-w-[90%] asowp-h-auto"> -->
                                                    <p>First border</p>
                                                </div>
                                                <div class="asowp-flex asowp-flex-col asowp-w-full asowp-items asowp-justify-start">
                                                    <div :class="`asowp-w-[90%] asowp-h-40 asowp-flex asowp-bg-[${configColors.optionsSideBar.options.modals.buttons.backgroundColor}]`"></div>
                                                    <!-- <img src="second-border.png" alt="" class="asowp-w-[90%] asowp-h-auto"> -->
                                                    <p>Second border</p>
                                                </div>
                                                <div class="asowp-flex asowp-flex-col asowp-w-full asowp-items asowp-justify-start">
                                                    <div :class="`asowp-w-[90%] asowp-h-40 asowp-flex asowp-bg-[${configColors.optionsSideBar.options.modals.buttons.backgroundColor}]`"></div>
                                                    <!-- <img src="first-border.png" alt="" class="asowp-w-[100%] asowp-h-auto"> -->
                                                    <p>3D effect</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div v-if="(activeFace === 'front-face' && !signTextColor1.active) || (activeFace === 'back-face' && !signTextColor2.active)" class="asowp-space-y-1">
                                        <p class="asowp-font-medium">Border color</p>
                                        <div class="asowp-flex asowp-space-x-2">
                                            <div @click="()=>{firstBorder = true}" :class="`${firstBorder ? `asowp-bg-[${configColors.optionsSideBar.options.modals.buttons.backgroundColor}] asowp-text-[${configColors.optionsSideBar.options.modals.buttons.textColor}]` : 'asowp-bg-transparent'} hover:asowp-bg-[${configColors.optionsSideBar.options.modals.option.hoverBackgroundColor}] hover:asowp-text-[${configColors.optionsSideBar.options.modals.option.hoverTextColor}]  asowp-text-sm asowp-p-1 asowp-px-2 asowp-rounded asowp-cursor-pointer asowp-base-animation`">First border</div>
                                            <div @click="()=>{firstBorder = false}" :class="`${!firstBorder ? `asowp-bg-[${configColors.optionsSideBar.options.modals.buttons.backgroundColor}] asowp-text-[${configColors.optionsSideBar.options.modals.buttons.textColor}]` : 'asowp-bg-transparent'} hover:asowp-bg-[${configColors.optionsSideBar.options.modals.option.hoverBackgroundColor}] hover:asowp-text-[${configColors.optionsSideBar.options.modals.option.hoverTextColor}]  asowp-text-sm asowp-p-1 asowp-px-2 asowp-rounded asowp-cursor-pointer asowp-base-animation`">Second border</div>
                                        </div>
                                        <div class="asowp-w-full asowp-flex asowp-flex-wrap asowp-gap-2 asowp-items-center asowp-p-1 asowp-border">
                                            <div v-for="(color, index) in configTextSettings.colors" class="">
                                                <div @click="changeTextBorderColor(color.codeHex)" :class="`${(firstBorder && currentTextBorder1Color === color.codeHex) || (!firstBorder && currentTextBorder2Color === color.codeHex)? `asowp-ring-2 asowp-ring-[${configColors.optionsSideBar.options.modals.option.activeTextColor}]` : `` } asowp-w-8 asowp-h-8 asowp-bg-[${color.codeHex}] asowp-rounded-sm asowp-border asowp-cursor-pointer`"></div>
                                            </div>
        
                                            <div :class="`asowp-relative`">
                                                <input id="asowp-setBorderTextColor1" type="color" v-model="customTextColor" class="asowp-inputColor-hide asowp-absolute asowp-top-[50%]" @input="changeTextBorderColor($event.target.value)" />
                                                <label for="asowp-setBorderTextColor1" v-if="configTextSettings.enableCustomColor" :class="` asowp-w-8 asowp-h-8 asowp-flex asowp-full-center asowp-overflow-hidden asowp-cursor-pointer`">
                                                    <svg v-if="configTextSettings.colorsPrevImg == ''" viewBox="0 0 44 44" xmlns="http://www.w3.org/2000/svg" class="asowp-w-full asowp-h-full">
                                                        <g fill="none" fill-rule="evenodd">
                                                            <path d="M22.015.061H.95a.866.866 0 0 0-.614.256l21.68 21.68V.061z" fill="#CE1128"></path>
                                                            <path d="M.335.317A.867.867 0 0 0 .08.93v21.066h21.935L.335.317z" fill="#ED2E8A"></path>
                                                            <path d="M43.696.317a.866.866 0 0 0-.614-.256H22.015v21.936L43.695.317z" fill="#F99410"></path>
                                                            <path d="M43.696 43.678a.866.866 0 0 0 .255-.614V21.997H22.015l21.68 21.68z" fill="#20B718"></path>
                                                            <path d="M43.696.317l-21.68 21.68H43.95V.931a.867.867 0 0 0-.255-.614" fill="#FCEA10"></path>
                                                            <path d="M22.015 43.933h21.067a.87.87 0 0 0 .614-.255l-21.68-21.68v21.935z" fill="#2CB1E5"></path>
                                                            <path d="M.08 21.997v21.067c0 .239.097.456.255.614l21.68-21.68H.08z" fill="#662483"></path>
                                                            <path d="M.335 43.678a.867.867 0 0 0 .614.255h21.066V21.997L.335 43.677z" fill="#126EB2"></path>
                                                        </g>
                                                    </svg>
                                                    <img v-if="configTextSettings.colorsPrevImg != ''" :src="configTextSettings.colorsPrevImg" class="asowp-w-full asowp-h-full">
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="asowp-flex asowp-flex-col asowp-space-y-2">
                                        <p class="asowp-font-semibold">3D effect</p>
                                        <div class="asowp-w-fit asowp-flex asowp-space-x-1 asowp-rounded-md" @click="show3dSide()">
                                            <div :class="`${active3dSide ? `asowp-bg-[${configColors.optionsSideBar.options.modals.buttons.backgroundColor}] asowp-text-[${configColors.optionsSideBar.options.modals.buttons.textColor}]` : 'asowp-bg-transparent'} asowp-text-sm asowp-p-1 asowp-px-2 asowp-rounded-md asowp-cursor-pointer asowp-base-animation`">Active</div>
                                            <div :class="`${!active3dSide ? `asowp-bg-[${configColors.optionsSideBar.options.modals.buttons.backgroundColor}] asowp-text-[${configColors.optionsSideBar.options.modals.buttons.textColor}]` : 'asowp-bg-transparent'} asowp-text-sm asowp-p-1 asowp-px-2 asowp-rounded-md asowp-cursor-pointer asowp-base-animation`">Disabled</div>
                                        </div>
                                        <div class="asowp-w-full asowp-flex asowp-flex-wrap asowp-gap-2 asowp-items-center asowp-p-1 asowp-border">
                                            <div v-for="(color, index) in configTextSettings.colors" class="">
                                                <div @click="change3dSideColor(color.codeHex)" :class="`${active3dSideColor === color.codeHex ? `asowp-ring-2 asowp-ring-[${configColors.optionsSideBar.options.modals.option.activeTextColor}]` : `` } asowp-w-8 asowp-h-8 asowp-bg-[${color.codeHex}] asowp-rounded-sm asowp-border asowp-cursor-pointer`"></div>
                                            </div>
        
                                            <div :class="`asowp-relative`">
                                                <input id="asowp-setSideColor" type="color" v-model="customTextColor" class="asowp-inputColor-hide asowp-absolute asowp-top-[50%]" @input="change3dSideColor($event.target.value)" />
                                                <label for="asowp-setSideColor" v-if="configTextSettings.enableCustomColor" :class="`${active3dSideColor == 'custom' ? `asowp-border-4 asowp-border-solid asowp-border-[#016464]` : `` } asowp-w-8 asowp-h-8 asowp-flex asowp-full-center asowp-overflow-hidden asowp-cursor-pointer`">
                                                    <svg v-if="configTextSettings.colorsPrevImg == ''" viewBox="0 0 44 44" xmlns="http://www.w3.org/2000/svg" class="asowp-w-full asowp-h-full">
                                                        <g fill="none" fill-rule="evenodd">
                                                            <path d="M22.015.061H.95a.866.866 0 0 0-.614.256l21.68 21.68V.061z" fill="#CE1128"></path>
                                                            <path d="M.335.317A.867.867 0 0 0 .08.93v21.066h21.935L.335.317z" fill="#ED2E8A"></path>
                                                            <path d="M43.696.317a.866.866 0 0 0-.614-.256H22.015v21.936L43.695.317z" fill="#F99410"></path>
                                                            <path d="M43.696 43.678a.866.866 0 0 0 .255-.614V21.997H22.015l21.68 21.68z" fill="#20B718"></path>
                                                            <path d="M43.696.317l-21.68 21.68H43.95V.931a.867.867 0 0 0-.255-.614" fill="#FCEA10"></path>
                                                            <path d="M22.015 43.933h21.067a.87.87 0 0 0 .614-.255l-21.68-21.68v21.935z" fill="#2CB1E5"></path>
                                                            <path d="M.08 21.997v21.067c0 .239.097.456.255.614l21.68-21.68H.08z" fill="#662483"></path>
                                                            <path d="M.335 43.678a.867.867 0 0 0 .614.255h21.066V21.997L.335 43.677z" fill="#126EB2"></path>
                                                        </g>
                                                    </svg>
                                                    <img v-if="configTextSettings.colorsPrevImg != ''" :src="configTextSettings.colorsPrevImg" class="asowp-w-full asowp-h-full">
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>

    
                                <div v-if="(activeFace === 'front-face' && !signTextColor1.active) || (activeFace === 'back-face' && !signTextColor2.active)" class="asowp-space-y-1">
                                    <p class="asowp-font-medium">{{ configVisualiserTexts.textColor && configVisualiserTexts.textColor.trim() !== '' ? configVisualiserTexts.textColor : 'Color' }}</p>
                                    <div class="asowp-w-full asowp-flex asowp-flex-wrap asowp-gap-2 asowp-items-center asowp-p-1 asowp-border">
                                        <div v-for="(color, index) in configTextSettings.colors" class="">
                                            <div @click="changeTextColor(color.codeHex)" :class="`${selectedText.color === color.codeHex ? `asowp-ring-2 asowp-ring-[${configColors.optionsSideBar.options.modals.option.activeTextColor}]` : `` } asowp-w-8 asowp-h-8 asowp-bg-[${color.codeHex}] asowp-rounded-sm asowp-border asowp-cursor-pointer`"></div>
                                        </div>
    
                                        <div :class="`asowp-relative`">
                                            <input id="asowp-setTextColor1" type="color" v-model="customTextColor" class="asowp-inputColor-hide asowp-absolute asowp-top-[50%]" @input="changeTextColor($event.target.value)" />
                                            <label for="asowp-setTextColor1" v-if="configTextSettings.enableCustomColor" :class="`${activeSignColor == 'custom' ? `asowp-border-4 asowp-border-solid asowp-border-[#016464]` : `` } asowp-w-8 asowp-h-8 asowp-flex asowp-full-center asowp-overflow-hidden asowp-cursor-pointer`">
                                                <svg v-if="configTextSettings.colorsPrevImg == ''" viewBox="0 0 44 44" xmlns="http://www.w3.org/2000/svg" class="asowp-w-full asowp-h-full">
                                                    <g fill="none" fill-rule="evenodd">
                                                        <path d="M22.015.061H.95a.866.866 0 0 0-.614.256l21.68 21.68V.061z" fill="#CE1128"></path>
                                                        <path d="M.335.317A.867.867 0 0 0 .08.93v21.066h21.935L.335.317z" fill="#ED2E8A"></path>
                                                        <path d="M43.696.317a.866.866 0 0 0-.614-.256H22.015v21.936L43.695.317z" fill="#F99410"></path>
                                                        <path d="M43.696 43.678a.866.866 0 0 0 .255-.614V21.997H22.015l21.68 21.68z" fill="#20B718"></path>
                                                        <path d="M43.696.317l-21.68 21.68H43.95V.931a.867.867 0 0 0-.255-.614" fill="#FCEA10"></path>
                                                        <path d="M22.015 43.933h21.067a.87.87 0 0 0 .614-.255l-21.68-21.68v21.935z" fill="#2CB1E5"></path>
                                                        <path d="M.08 21.997v21.067c0 .239.097.456.255.614l21.68-21.68H.08z" fill="#662483"></path>
                                                        <path d="M.335 43.678a.867.867 0 0 0 .614.255h21.066V21.997L.335 43.677z" fill="#126EB2"></path>
                                                    </g>
                                                </svg>
                                                <img v-if="configTextSettings.colorsPrevImg != ''" :src="configTextSettings.colorsPrevImg" class="asowp-w-full asowp-h-full">
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div v-if="configTextType == 'neon'" class="asowp-space-y-1">
                                    <p class="asowp-font-medium">Light color</p>
                                    <div class="asowp-w-full asowp-flex asowp-flex-wrap asowp-gap-2 asowp-items-center asowp-p-1 asowp-border">
                                        <div v-for="(color, index) in configTextSettings.colors" class="">
                                            <div @click="changeTextLightColor(color.codeHex)" :class="`${curentTextLightColor === color.codeHex ? `asowp-ring-2 asowp-ring-[${configColors.optionsSideBar.options.modals.option.activeTextColor}]` : `` } asowp-w-8 asowp-h-8 asowp-bg-[${color.codeHex}] asowp-rounded-sm asowp-border asowp-cursor-pointer`"></div>
                                        </div>
    
                                        <div :class="`asowp-relative`">
                                            <input id="asowp-setTextLightColor1" type="color" v-model="curentTextLightColor" class="asowp-inputColor-hide asowp-absolute asowp-top-[50%]" @input="changeTextLightColor($event.target.value)" />
                                            <label for="asowp-setTextLightColor1" v-if="configTextSettings.enableCustomColor" :class="`${curentTextLightColor == 'custom' ? `asowp-border-4 asowp-border-solid asowp-border-[#016464]` : `` } asowp-w-8 asowp-h-8 asowp-flex asowp-full-center asowp-overflow-hidden asowp-cursor-pointer`">
                                                <svg v-if="configTextSettings.colorsPrevImg == ''" viewBox="0 0 44 44" xmlns="http://www.w3.org/2000/svg" class="asowp-w-full asowp-h-full">
                                                    <g fill="none" fill-rule="evenodd">
                                                        <path d="M22.015.061H.95a.866.866 0 0 0-.614.256l21.68 21.68V.061z" fill="#CE1128"></path>
                                                        <path d="M.335.317A.867.867 0 0 0 .08.93v21.066h21.935L.335.317z" fill="#ED2E8A"></path>
                                                        <path d="M43.696.317a.866.866 0 0 0-.614-.256H22.015v21.936L43.695.317z" fill="#F99410"></path>
                                                        <path d="M43.696 43.678a.866.866 0 0 0 .255-.614V21.997H22.015l21.68 21.68z" fill="#20B718"></path>
                                                        <path d="M43.696.317l-21.68 21.68H43.95V.931a.867.867 0 0 0-.255-.614" fill="#FCEA10"></path>
                                                        <path d="M22.015 43.933h21.067a.87.87 0 0 0 .614-.255l-21.68-21.68v21.935z" fill="#2CB1E5"></path>
                                                        <path d="M.08 21.997v21.067c0 .239.097.456.255.614l21.68-21.68H.08z" fill="#662483"></path>
                                                        <path d="M.335 43.678a.867.867 0 0 0 .614.255h21.066V21.997L.335 43.677z" fill="#126EB2"></path>
                                                    </g>
                                                </svg>
                                                <img v-if="configTextSettings.colorsPrevImg != ''" :src="configTextSettings.colorsPrevImg" class="asowp-w-full asowp-h-full">
                                            </label>
                                        </div>
                                    </div>
                                </div>
    
                                <div class="asowp-space-y-1">
                                    <!-- <p class="asowp-font-medium">Other custom</p> -->
                                    <div class="asowp-w-full asowp-flex asowp-items-center">
                                        <div class="asowp-flex asowp-flex-wrap asowp-gap-3">
                                            <span @click="cloneObject()" :class="`asowp-flex asowp-flex-col asowp-full-center asowp-space-y-1 asowp-text-[${configColors.optionsSideBar.options.modals.option.textColor}] hover:asowp-text-[${configColors.optionsSideBar.options.modals.option.activeTextColor}] asowp-cursor-pointer asowp-base-animation`">
                                                <svg viewBox="0 0 36 37" fill="none" xmlns="http://www.w3.org/2000/svg" class="asowp-w-7 asowp-h-7">
                                                    <g clip-path="url(#clip0_65_739)">
                                                        <path d="M6 6.5H22V10.5H24V6.5C24 5.96957 23.7893 5.46086 23.4142 5.08579C23.0391 4.71071 22.5304 4.5 22 4.5H6C5.46957 4.5 4.96086 4.71071 4.58579 5.08579C4.21071 5.46086 4 5.96957 4 6.5V22.5C4 23.0304 4.21071 23.5391 4.58579 23.9142C4.96086 24.2893 5.46957 24.5 6 24.5H10V22.5H6V6.5Z" fill="currentColor"/>
                                                        <path d="M30 12.5H14C13.4696 12.5 12.9609 12.7107 12.5858 13.0858C12.2107 13.4609 12 13.9696 12 14.5V30.5C12 31.0304 12.2107 31.5391 12.5858 31.9142C12.9609 32.2893 13.4696 32.5 14 32.5H30C30.5304 32.5 31.0391 32.2893 31.4142 31.9142C31.7893 31.5391 32 31.0304 32 30.5V14.5C32 13.9696 31.7893 13.4609 31.4142 13.0858C31.0391 12.7107 30.5304 12.5 30 12.5ZM30 30.5H14V14.5H30V30.5Z" fill="currentColor"/>
                                                        <path d="M21 28.5H23V23.5H28V21.5H23V16.5H21V21.5H16V23.5H21V28.5Z" fill="currentColor"/>
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0_65_739">
                                                            <rect width="36" height="36" fill="none" transform="translate(0 0.5)"/>    
                                                        </clipPath>
                                                    </defs>
                                                </svg>
                                                <p class="asowp-text-xs asowp-font-semibold">
                                                    {{ configVisualiserTexts.textCanvasClone && configVisualiserTexts.textCanvasClone.trim() !== '' ? configVisualiserTexts.textCanvasClone : 'Clone' }}
                                                </p>
                                            </span>
    
                                            <span @click="deleteObject()" :class="`asowp-flex asowp-flex-col asowp-full-center asowp-space-y-1 asowp-text-[${configColors.optionsSideBar.options.modals.option.textColor}] hover:asowp-text-[${configColors.optionsSideBar.options.modals.option.activeTextColor}] asowp-cursor-pointer asowp-base-animation`">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="asowp-w-7 asowp-h-7">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                </svg>
                                                <p class="asowp-text-xs asowp-font-semibold">
                                                    {{ configVisualiserTexts.textCanvasDelete && configVisualiserTexts.textCanvasDelete.trim() !== '' ? configVisualiserTexts.textCanvasDelete : 'Delete' }}
                                                </p>
                                            </span>
    
                                            <span v-if="configTextSettings.enableBold" @click="changeTextWeight" :class="`${selectedText.weight == 'bold' ? `asowp-text-[${configColors.optionsSideBar.options.modals.option.activeTextColor}]` : `asowp-text-[${configColors.optionsSideBar.options.modals.option.textColor}]`} asowp-flex asowp-flex-col asowp-full-center asowp-space-y-1 hover:asowp-text-[${configColors.optionsSideBar.options.modals.option.activeTextColor}] asowp-cursor-pointer asowp-base-animation`">
                                                <svg  fill="none" xmlns="http://www.w3.org/2000/svg" class="asowp-w-7 asowp-h-7">
                                                    <path d="M12.0151 1.84998C15.2551 1.84998 17.6851 2.25498 19.3051 3.19998C21.0601 4.14498 21.8701 5.76498 21.8701 8.05998C21.8701 9.40998 21.4651 10.625 20.9251 11.57C20.619 12.0316 20.2214 12.4255 19.757 12.7274C19.2926 13.0292 18.7712 13.2326 18.2251 13.325C18.9968 13.5052 19.7289 13.8255 20.3851 14.27C20.9251 14.675 21.4651 15.35 21.8701 16.025C22.2926 17.0029 22.4776 18.0669 22.4101 19.13C22.4578 20.1053 22.2749 21.0781 21.8761 21.9694C21.4773 22.8608 20.874 23.6455 20.1151 24.26C18.1933 25.6325 15.8569 26.3 13.5001 26.15H4.45508V1.84998H12.0151ZM12.5551 11.435C14.0401 11.435 15.1201 11.3 15.6601 10.76C16.3351 10.355 16.6051 9.54497 16.6051 8.73497C16.6051 7.78998 16.2001 7.11497 15.5251 6.70998C14.8501 6.30498 13.7701 6.03498 12.2851 6.03498H9.58508V11.435H12.5551ZM9.58508 15.485V22.1H12.9601C14.4451 22.1 15.6601 21.695 16.2001 21.155C16.8751 20.48 17.1451 19.805 17.1451 18.725C17.1612 18.3169 17.0845 17.9105 16.9208 17.5364C16.7571 17.1622 16.5107 16.8301 16.2001 16.565C15.5251 16.025 14.4451 15.755 12.8251 15.755H9.45008L9.58508 15.485Z" fill="currentColor"/>
                                                </svg>
                                                <p class="asowp-text-xs asowp-font-semibold">Bold</p>
                                            </span>
    
                                            <span v-if="configTextSettings.enableItalic" @click="changeTextStyle" :class="`${selectedText.style == 'italic' ? `asowp-text-[${configColors.optionsSideBar.options.modals.option.activeTextColor}]` : `asowp-text-[${configColors.optionsSideBar.options.modals.option.textColor}]`} asowp-flex asowp-flex-col asowp-full-center asowp-space-y-1 hover:asowp-text-[${configColors.optionsSideBar.options.modals.option.activeTextColor}] asowp-cursor-pointer asowp-base-animation`">
                                                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="asowp-w-7 asowp-h-7">
                                                    <path d="M11 5H17M7 19H13M14 5L10 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                                </svg>
                                                <p class="asowp-text-xs asowp-font-semibold">Italic</p>
                                            </span>
    
                                            <span v-if="configTextType == 'normal' && configTextSettings.enableUnderline" @click="underlineText" :class="`${selectedText.underline == true ? `asowp-text-[${configColors.optionsSideBar.options.modals.option.activeTextColor}]` : `asowp-text-[${configColors.optionsSideBar.options.modals.option.textColor}]`} asowp-flex asowp-flex-col asowp-full-center asowp-space-y-1 hover:asowp-text-[${configColors.optionsSideBar.options.modals.option.activeTextColor}] asowp-cursor-pointer asowp-base-animation`">
                                                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="asowp-w-7 asowp-h-7">
                                                    <path d="M7 5V10C7 11.3261 7.52678 12.5979 8.46447 13.5355C9.40215 14.4732 10.6739 15 12 15C13.3261 15 14.5979 14.4732 15.5355 13.5355C16.4732 12.5979 17 11.3261 17 10V5M5 19H19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                                </svg>
                                                <p class="asowp-text-xs asowp-font-semibold">Underline</p>
                                            </span>
    
                                            <span v-if="configTextType == 'normal' && configTextSettings.enableStrike" @click="crossText" :class="`${selectedText.linethrough == true ? `asowp-text-[${configColors.optionsSideBar.options.modals.option.activeTextColor}]` : `asowp-text-[${configColors.optionsSideBar.options.modals.option.textColor}]`} asowp-flex asowp-flex-col asowp-full-center asowp-space-y-1 hover:asowp-text-[${configColors.optionsSideBar.options.modals.option.activeTextColor}] asowp-cursor-pointer asowp-base-animation`">
                                                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="asowp-w-7 asowp-h-7">
                                                    <path d="M7 8V13M7 13C7 14.3261 7.52678 15.5979 8.46447 16.5355C9.40215 17.4732 10.6739 18 12 18C13.3261 18 14.5979 17.4732 15.5355 16.5355C16.4732 15.5979 17 14.3261 17 13M7 13H17M17 13V8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                                    <line x1="3.79883" y1="13" x2="20.1988" y2="13" stroke="currentColor"/>
                                                </svg>
                                                <p class="asowp-text-xs asowp-font-semibold">Crossline</p>
                                            </span>
    
                                            <span v-if="configTextType == 'normal' && configTextSettings.enableOverline" @click="overlineText" :class="`${selectedText.overline == true ? `asowp-text-[${configColors.optionsSideBar.options.modals.option.activeTextColor}]` : `asowp-text-[${configColors.optionsSideBar.options.modals.option.textColor}]`} asowp-flex asowp-flex-col asowp-full-center asowp-space-y-1 hover:asowp-text-[${configColors.optionsSideBar.options.modals.option.activeTextColor}] asowp-cursor-pointer asowp-base-animation`">
                                                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="asowp-w-7 asowp-h-7">
                                                    <path d="M7 9V14C7 15.3261 7.52678 16.5979 8.46447 17.5355C9.40215 18.4732 10.6739 19 12 19C13.3261 19 14.5979 18.4732 15.5355 17.5355C16.4732 16.5979 17 15.3261 17 14V9M5 5H19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                                </svg>
                                                <p class="asowp-text-xs asowp-font-semibold">Overline</p>
                                            </span>

                                            <span v-if="configTextType != '3D'" @click="moveObject('up')" :class="`asowp-flex asowp-flex-col asowp-full-center asowp-space-y-1 asowp-text-[${configColors.optionsSideBar.options.modals.option.textColor}] hover:asowp-text-[${configColors.optionsSideBar.options.modals.option.activeTextColor}] asowp-cursor-pointer asowp-base-animation`">
                                                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="asowp-w-7 asowp-h-7">
                                                    <path d="m12.707 3.2929c-0.3905-0.39052-1.0237-0.39052-1.4142 0l-4 4c-0.39052 0.39053-0.39052 1.0237 0 1.4142 0.39053 0.39052 1.0237 0.39052 1.4142 0l2.2929-2.2929v7.5858c0 0.5523 0.4477 1 1 1s1-0.4477 1-1v-7.5858l2.2929 2.2929c0.3905 0.39052 1.0237 0.39052 1.4142 0 0.3905-0.39053 0.3905-1.0237 0-1.4142l-4-4z" fill="currentColor"></path>
                                                    <path d="m3.1056 13.211 5.8944-2.9472v2.2361l-5 2.5 8 4 8-4-5-2.5v-2.2361l5.8944 2.9472c0.6776 0.3388 1.1056 1.0313 1.1056 1.7889 0 0.7575-0.428 1.4501-1.1056 1.7888l-8 4c-0.563 0.2816-1.2258 0.2816-1.7888 0l-8-4c-0.67757-0.3387-1.1056-1.0313-1.1056-1.7888 0-0.7576 0.428-1.4501 1.1056-1.7889z" fill="currentColor"></path>
                                                </svg>
                                                <p class="asowp-text-xs asowp-font-semibold">
                                                    {{ configVisualiserTexts.textMoveUp && configVisualiserTexts.textMoveUp.trim() !== '' ? configVisualiserTexts.textMoveUp : 'Move up' }}
                                                </p>
                                            </span>

                                            <span v-if="configTextType != '3D'" @click="moveObject('down')" :class="`asowp-flex asowp-flex-col asowp-full-center asowp-space-y-1 asowp-text-[${configColors.optionsSideBar.options.modals.option.textColor}] hover:asowp-text-[${configColors.optionsSideBar.options.modals.option.activeTextColor}] asowp-cursor-pointer asowp-base-animation`">
                                                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="asowp-w-7 asowp-h-7">
                                                    <path d="m12.707 20.707c-0.3905 0.3905-1.0237 0.3905-1.4142 0l-4-4c-0.39052-0.3905-0.39052-1.0237 0-1.4142 0.39053-0.3905 1.0237-0.3905 1.4142 0l2.2929 2.2929v-7.5858c0-0.55228 0.4477-1 1-1s1 0.44772 1 1v7.5858l2.2929-2.2929c0.3905-0.3905 1.0237-0.3905 1.4142 0s0.3905 1.0237 0 1.4142l-4 4z" fill="currentColor"></path>
                                                    <path d="m3.1056 10.789 5.8944 2.9472v-2.2361l-5-2.5 8-4 8 4-5 2.5v2.2361l5.8944-2.9472c0.6776-0.3388 1.1056-1.0314 1.1056-1.7889s-0.428-1.4501-1.1056-1.7888l-8-4c-0.563-0.28152-1.2258-0.28152-1.7888 0l-8 4c-0.67757 0.33878-1.1056 1.0313-1.1056 1.7888s0.428 1.4501 1.1056 1.7889z" fill="currentColor"></path>
                                                </svg>
                                                <p class="asowp-text-xs asowp-font-semibold">
                                                    {{ configVisualiserTexts.textMoveDown && configVisualiserTexts.textMoveDown.trim() !== '' ? configVisualiserTexts.textMoveDown : 'Move down' }}
                                                </p>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
    
                    <div v-show="step == 'image'" class="asowp-relative asowp-flex asowp-flex-col lg:asowp-space-y-3 asowp-w-full asowp-h-full" id="asowp-images-section">
                        <p :class="`asowp-hidden lg:asowp-flex asowp-bg-[${configColors.optionsSideBar.options.modals.headerBackgroundColor}] asowp-text-[${configColors.optionsSideBar.options.modals.headerTextColor}] asowp-text-lg asowp-font-semibold asowp-p-2 asowp-px-4`">{{configVisualiserTexts.textImage}}</p>    

                        <div :class="`asowp-bg-[${configColors.backgroundColorHeader}]/10 asowp-flex asowp-flex-col asowp-space-y-3 asowp-full-center asowp-p-4 asowp-m-1`">
                            <span v-show="configImageSettingsClipart.active && !clipartSection && !editImage" :class="`asowp-w-3/4 asowp-text-[${configColors.backgroundButton}] asowp-border asowp-border-solid asowp-border-[${configColors.backgroundButton}] asowp-text-md asowp-p-2 asowp-px-4 asowp-rounded-full asowp-cursor-pointer`">
                                <span @click="()=> {showClipartsSection(true); editImage = false}" :class="`asowp-flex asowp-full-center asowp-space-x-3`">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="asowp-w-6 asowp-h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                                    </svg>
                                    <p class="asowp-text-center">Browse archive image</p>
                                </span>
                            </span>

                            <span v-show="(clipartSection && !editImage) || editImage" :class="`asowp-w-3/4 asowp-text-[${configColors.backgroundButton}] asowp-border asowp-border-solid asowp-border-[${configColors.backgroundButton}] asowp-text-md asowp-p-2 asowp-px-4 asowp-rounded-full asowp-cursor-pointer`">
                                <span @click="()=> {showClipartsSection(false); editImage = false}" :class="`asowp-flex asowp-full-center asowp-space-x-3`">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="asowp-w-5 asowp-h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                                    </svg>
                                    <p class="asowp-text-center">Edit image</p>
                                </span>
                            </span>

                            <label v-if="configImageSettings.enableUploadImage  && !clipartSection && !editImage" :class="`asowp-w-3/4 asowp-inputImage asowp-full-center asowp-bg-[${configColors.optionsSideBar.options.modals.buttons.backgroundColor}] hover:asowp-bg-[${configColors.optionsSideBar.options.modals.buttons.hoverBackgroundColor}] asowp-text-[${configColors.optionsSideBar.options.modals.buttons.textColor}] hover:asowp-text-[${configColors.optionsSideBar.options.modals.buttons.hoverTextColor}] asowp-text-md`">
                                <input @click="addImageToSign()" class="asowp-hidden" id="asowp-iamge-input" type="file" name="asowp-pickImages" :accept="configImagesFormat" style="display: none;"/>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="asowp-w-6 asowp-h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                                </svg>
                                <p>Upload image</p>
                            </label>
                        </div>

                        <div class="asowp-h-full asowp-space-y-2 asowp-p-2 asowp-overflow-auto asowp-scrollBar">

                            <div v-show="!editImage && !clipartSection" class="asowp-p-2">
                                <div v-if="usedImages.length > 0" class="asowp-space-y-1">
                                    <p class="asowp-font-medium">Currently in use</p>
                                    <div class="asowp-flex asowp-items-center asowp-flex-wrap asowp-gap-2 asowp-p-1">
                                        <div v-for="(usedImage, index) in usedImages">
                                            <div @click="editAddedImage(usedImage.object)" :class="`${activeFace == usedImage.object.canvasName ? `asowp-cursor-pointer` : `asowp-cursor-not-allowed`} asowp-w-20 asowp-h-20 asowp-flex asowp-flex-col asowp-space-y-2 asowp-full-center asowp-p-1 asowp-text-[${configColors.optionsSideBar.options.modals.option.textColor}] hover:asowp-bg-[${configColors.optionsSideBar.options.modals.option.hoverBackgroundColor}] asowp-border asowp-cursor-pointer asowp-base-animation`">
                                                <img :src="usedImage.url" alt="" class="asowp-w-auto asowp-h-full">
                                                <p class="asowp-text-xs asowp-font-medium">Edit image</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div v-show="recentlyUsedImages.length > 0" class="asowp-space-y-1">
                                    <p class="asowp-font-medium">Reccently used</p>
                                    <div class="asowp-flex asowp-items-center asowp-flex-wrap asowp-gap-2 asowp-p-1">
                                        <div v-for="(image, index) in recentlyUsedImages">
                                            <div @click="addImageToSign(image.url, image.object.price)" :class="`asowp-relative asowp-flex asowp-flex-col asowp-space-y-2 asowp-w-20 asowp-h-20 asowp-full-center asowp-p-1 hover:asowp-bg-[${configColors.optionsSideBar.options.modals.option.hoverBackgroundColor}]/20 asowp-border asowp-cursor-pointer asowp-base-animation`">
                                                <img :src="image.url" alt="" class="asowp-w-auto asowp-h-full">
                                                <!-- <img @click="addImageToSign(image.url, image.object.price)" :src="image.url" alt="" class="asowp-w-20 asowp-h-auto"> -->
                                                <!-- <span @click="deleteFromRecentlyUsed(index, recentlyUsedImages)" :class="`asowp-absolute asowp-top-0 asowp-right-0 asowp-translate-y-[-50%] asowp-translate-x-[20%] asowp-bg-[${configColors.optionsSideBar.options.modals.buttons.backgroundColor}] hover:asowp-bg-[${configColors.optionsSideBar.options.modals.buttons.hoverBackgroundColor}] asowp-text-[${configColors.optionsSideBar.options.modals.buttons.textColor}] hover:asowp-text-[${configColors.optionsSideBar.options.modals.buttons.hoverTextColor}] asowp-flex asowp-p-0.5 asowp-rounded-md`">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="asowp-w-4 asowp-h-4">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                                                    </svg>
                                                </span> -->
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div v-if="clipartSection && !editImage">
                                <div v-if="configImageSettingsClipart.active" class="asowp-space-y-3">
                                    <div class="asowp-flex asowp-flex-col asowp-space-y-2">
                                        <div v-for="(clipart, index) in allClipart">
                                            <div @click="showClipartImages(clipart.cliparts, index)" :class="`asowp-flex asowp-flex-col asowp-text-[${configColors.optionsSideBar.options.modals.option.textColor}] hover:asowp-bg-[${configColors.optionsSideBar.options.modals.option.hoverBackgroundColor}] hover:asowp-text-[${configColors.optionsSideBar.options.modals.option.hoverTextColor}] asowp-space-y-3 asowp-justify-start asowp-py-3 asowp-px-2 asowp-rounded-lg asowp-cursor-pointer asowp-base-animation`">
                                                <div class="asowp-text-base asowp-font-semibold asowp-flex asowp-justify-between asowp-items-center">
                                                    <p>{{clipart.title}}</p>
                                                    <span :class="`asowp-flex asowp-text-[${configColors.optionsSideBar.options.modals.option.activeTextColor}]`">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" class="asowp-w-7 asowp-h-7">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                                                        </svg>
                                                    </span>
                                                </div>
                                                <p class="asowp-text-xs">{{clipart.description}}</p>
                                            </div>
                                            <div v-show="showClipart && clipartId == index" :class="`asowp-relative lg:asowp-absolute lg:asowp-top-0 lg:asowp-right-0 lg:asowp-translate-x-[101%] lg:asowp-w-full lg:asowp-h-[90%] asowp-bg-[${configColors.optionsSideBar.options.modals.backgroundColor}] asowp-text-[${configColors.optionsSideBar.options.modals.textColor}] lg:asowp-shadow-xl`">
                                                <div :class="`asowp-flex asowp-flex-col asowp-w-full asowp-h-full asowp-overflow-auto asowp-scrollBar`">
                                                    <div class="asowp-flex asowp-flex-wrap asowp-gap-2 asowp-p-1">
                                                        <div v-for="(image, id) in currentClipart">
                                                            <div @click="addImageToSign(image.url, image.additionalPrice, id)" class="asowp-flex asowp-flex-col asowp-space-y-2 asowp-full-center asowp-p-1 asowp-border asowp-cursor-pointer">
                                                                <img :src="image.url" alt="" :class="`asowp-w-20 asowp-h-20 asowp-border asowp-border-solid asowp-border-[${configColors.optionsSideBar.options.modals.option.textColor}] asowp-p-1 asowp-rounded-md`">
                                                                <p class="asowp-text-sm asowp-font-medium">{{image.title}}</p>
                                                                <p v-if="image.additionalPrice > 0" class="asowp-text-[11px] asowp-leading-normal">({{image.additionalPrice}} {{props.currency}})</p>
                                                                <p v-if="!image.additionalPrice > 0" class="asowp-text-[11px] asowp-leading-normal asowp-invisible">none</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="asowp-absolute asowp-top-0 asowp-right-0 asowp-w-fit asowp-h-fit asowp-cursor-pointer">
                                                    <span @click="()=>{showClipart = false}" :class="`asowp-flex asowp-bg-[${configColors.optionsSideBar.options.modals.buttons.backgroundColor}] hover:asowp-bg-[${configColors.optionsSideBar.options.modals.buttons.hoverBackgroundColor}] asowp-text-[${configColors.optionsSideBar.options.modals.buttons.textColor}] hover:asowp-text-[${configColors.optionsSideBar.options.modals.buttons.hoverTextColor}] asowp-p-1 asowp-base-animation`">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="asowp-w-5 asowp-h-5">
                                                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                                                        </svg>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div v-show="editImage" class="asowp-p-2">
                                <div>
                                    <p class="asowp-font-medium">Size</p>
                                    <div class="asowp-p-2 asowp-space-y-1">
                                        <!-- <label class="asowp-text-xs" for="asowp-image-sizeWidth">width</label> -->
                                        <input :disabled="route.name !== 'template-maker' && selectedImage.object.lockScale" type="range" name="asowp-imageSize" id="asowp-image-sizeWidth" :class="`${route.name !== 'template-maker' && selectedImage.object.lockScale ? 'asowp-cursor-not-allowed' : 'asowp-cursor-pointer'} asowp-w-full`" :min="0.1" :max="1.4" :step="0.05" :value="0.4" @input="changeImageWidth">
                                        <!-- <label class="asowp-text-xs" for="asowp-image-sizeHeight">height</label>
                                        <input type="range" name="asowp-imageSize" id="asowp-image-sizeHeight" class="asowp-w-full" :min="0.1" :max="1.4" :step="0.05" :value="0.4" @change="changeImageHeight"> -->
                                        <p class="asowp-flex asowp-full-center asowp-font-medium"> <span id="image-width"></span> x <span id="image-height"></span> </p>
                                    </div>
                                </div>

                                <div class="asowp-space-y-1" v-if="activeImageType === 'svg'">
                                    <p class="asowp-font-medium">{{ configVisualiserTexts.textColor && configVisualiserTexts.textColor.trim() !== '' ? configVisualiserTexts.textColor : 'Color' }}</p>
                                    <div class="asowp-w-full asowp-flex asowp-flex-wrap asowp-gap-2 asowp-items-center asowp-p-1 asowp-border">
                                        <div v-for="(color, index) in configImageSettings.colors" class="">
                                            <div @click="changeSvgColor(color.codeHex)" :class="`${currentSvgColor === color.codeHex ? `asowp-ring-2 asowp-ring-[${configColors.optionsSideBar.options.modals.option.activeTextColor}]` : `` } asowp-w-8 asowp-h-8 asowp-bg-[${color.codeHex}] asowp-rounded-sm asowp-border asowp-cursor-pointer`"></div>
                                        </div>
                                        <div :class="`asowp-relative`">
                                            <input id="asowp-setSvgColor" type="color" class="asowp-inputColor-hide asowp-absolute asowp-top-[50%]" @input="changeSvgColor($event.target.value)" />
                                            <label for="asowp-setSvgColor" v-if="configImageSettings.enableCustomColor" :class="`${activeSignColor == 'custom' ? `asowp-border-4 asowp-border-solid asowp-border-[#016464]` : `` } asowp-w-8 asowp-h-8 asowp-flex asowp-full-center asowp-overflow-hidden asowp-cursor-pointer`">
                                                <svg v-if="configImageSettings.colorsPrevImg == ''" viewBox="0 0 44 44" xmlns="http://www.w3.org/2000/svg" class="asowp-w-full asowp-h-full">
                                                    <g fill="none" fill-rule="evenodd">
                                                        <path d="M22.015.061H.95a.866.866 0 0 0-.614.256l21.68 21.68V.061z" fill="#CE1128"></path>
                                                        <path d="M.335.317A.867.867 0 0 0 .08.93v21.066h21.935L.335.317z" fill="#ED2E8A"></path>
                                                        <path d="M43.696.317a.866.866 0 0 0-.614-.256H22.015v21.936L43.695.317z" fill="#F99410"></path>
                                                        <path d="M43.696 43.678a.866.866 0 0 0 .255-.614V21.997H22.015l21.68 21.68z" fill="#20B718"></path>
                                                        <path d="M43.696.317l-21.68 21.68H43.95V.931a.867.867 0 0 0-.255-.614" fill="#FCEA10"></path>
                                                        <path d="M22.015 43.933h21.067a.87.87 0 0 0 .614-.255l-21.68-21.68v21.935z" fill="#2CB1E5"></path>
                                                        <path d="M.08 21.997v21.067c0 .239.097.456.255.614l21.68-21.68H.08z" fill="#662483"></path>
                                                        <path d="M.335 43.678a.867.867 0 0 0 .614.255h21.066V21.997L.335 43.677z" fill="#126EB2"></path>
                                                    </g>
                                                </svg>
                                                <img v-if="configImageSettings.colorsPrevImg != ''" :src="configImageSettings.colorsPrevImg" class="asowp-w-full asowp-h-full">
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div v-if="configImageSettingsFilters.active && activeImageType !== 'svg'" class="asowp-space-y-2">
                                    <p class="asowp-font-medium">Filters</p>
                                    <div class="asowp-w-full asowp-flex asowp-items-center">
                                        <div class="asowp-flex asowp-space-x-6">
                                            <span @click="selectImageFilter('Blur')" :class="`${setFilter.blur ? `asowp-text-[${configColors.optionsSideBar.options.modals.option.activeTextColor}]` : ``} asowp-flex asowp-flex-col asowp-full-center asowp-space-y-4 asowp-text-[${configColors.optionsSideBar.options.modals.option.textColor}] hover:asowp-text-[${configColors.optionsSideBar.options.modals.option.activeTextColor}] asowp-base-animation asowp-cursor-pointer`">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="asowp-w-5 asowp-h-5">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
                                                </svg>
                                                <p class="asowp-text-xs asowp-font-semibold">Blur</p>
                                            </span>
                                            <span @click="selectImageFilter('Greyscale')" :class="`${setFilter.greyscale ? `asowp-text-[${configColors.optionsSideBar.options.modals.option.activeTextColor}]` : ``} asowp-flex asowp-flex-col asowp-full-center asowp-space-y-4 asowp-text-[${configColors.optionsSideBar.options.modals.option.textColor}] hover:asowp-text-[${configColors.optionsSideBar.options.modals.option.activeTextColor}] asowp-base-animation asowp-cursor-pointer`">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="asowp-w-5 asowp-h-5">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
                                                </svg>
                                                <p class="asowp-text-xs asowp-font-semibold">Greyscale</p>
                                            </span>
                                            <span @click="selectImageFilter('Sepia')" :class="`${setFilter.sepia ? `asowp-text-[${configColors.optionsSideBar.options.modals.option.activeTextColor}]` : ``} asowp-flex asowp-flex-col asowp-full-center asowp-space-y-4 asowp-text-[${configColors.optionsSideBar.options.modals.option.textColor}] hover:asowp-text-[${configColors.optionsSideBar.options.modals.option.activeTextColor}] asowp-base-animation asowp-cursor-pointer`">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="asowp-w-5 asowp-h-5">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
                                                </svg>
                                                <p class="asowp-text-xs asowp-font-semibold">Sepia</p>
                                            </span>
                                            <span @click="selectImageFilter('Emboss')" :class="`${setFilter.embross ? `asowp-text-[${configColors.optionsSideBar.options.modals.option.activeTextColor}]` : ``} asowp-flex asowp-flex-col asowp-full-center asowp-space-y-4 asowp-text-[${configColors.optionsSideBar.options.modals.option.textColor}] hover:asowp-text-[${configColors.optionsSideBar.options.modals.option.activeTextColor}] asowp-base-animation asowp-cursor-pointer`">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="asowp-w-5 asowp-h-5">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
                                                </svg>
                                                <p class="asowp-text-xs asowp-font-semibold">Emboss</p>
                                            </span>
                                            <span @click="selectImageFilter('Sharpen')" :class="`${setFilter.sharpen ? `asowp-text-[${configColors.optionsSideBar.options.modals.option.activeTextColor}]` : ``} asowp-flex asowp-flex-col asowp-full-center asowp-space-y-4 asowp-text-[${configColors.optionsSideBar.options.modals.option.textColor}] hover:asowp-text-[${configColors.optionsSideBar.options.modals.option.activeTextColor}] asowp-base-animation asowp-cursor-pointer`">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="asowp-w-5 asowp-h-5">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
                                                </svg>
                                                <p class="asowp-text-xs asowp-font-semibold">Sharpen</p>
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div class="asowp-space-y-3">
                                    <!-- <p class="asowp-font-medium">Other custom</p> -->
                                    <div class="asowp-w-full asowp-flex asowp-items-center">
                                        <div class="asowp-flex asowp-flex-wrap asowp-gap-3">
                                            <span @click="cloneObject()" :class="`asowp-flex asowp-flex-col asowp-full-center asowp-space-y-1 asowp-text-[${configColors.optionsSideBar.options.modals.option.textColor}] hover:asowp-text-[${configColors.optionsSideBar.options.modals.option.activeTextColor}] asowp-cursor-pointer`">
                                                <svg viewBox="0 0 36 37" fill="none" xmlns="http://www.w3.org/2000/svg" class="asowp-w-7 asowp-h-7">
                                                    <g clip-path="url(#clip0_65_739)">
                                                        <path d="M6 6.5H22V10.5H24V6.5C24 5.96957 23.7893 5.46086 23.4142 5.08579C23.0391 4.71071 22.5304 4.5 22 4.5H6C5.46957 4.5 4.96086 4.71071 4.58579 5.08579C4.21071 5.46086 4 5.96957 4 6.5V22.5C4 23.0304 4.21071 23.5391 4.58579 23.9142C4.96086 24.2893 5.46957 24.5 6 24.5H10V22.5H6V6.5Z" fill="currentColor"/>
                                                        <path d="M30 12.5H14C13.4696 12.5 12.9609 12.7107 12.5858 13.0858C12.2107 13.4609 12 13.9696 12 14.5V30.5C12 31.0304 12.2107 31.5391 12.5858 31.9142C12.9609 32.2893 13.4696 32.5 14 32.5H30C30.5304 32.5 31.0391 32.2893 31.4142 31.9142C31.7893 31.5391 32 31.0304 32 30.5V14.5C32 13.9696 31.7893 13.4609 31.4142 13.0858C31.0391 12.7107 30.5304 12.5 30 12.5ZM30 30.5H14V14.5H30V30.5Z" fill="currentColor"/>
                                                        <path d="M21 28.5H23V23.5H28V21.5H23V16.5H21V21.5H16V23.5H21V28.5Z" fill="currentColor"/>
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0_65_739">
                                                            <rect width="36" height="36" fill="none" transform="translate(0 0.5)"/>    
                                                        </clipPath>
                                                    </defs>
                                                </svg>
                                                <p class="asowp-text-xs asowp-font-semibold">
                                                    {{ configVisualiserTexts.textCanvasClone && configVisualiserTexts.textCanvasClone.trim() !== '' ? configVisualiserTexts.textCanvasClone : 'Clone' }}
                                                </p>
                                            </span>

                                            <span @click="deleteObject()" :class="`asowp-flex asowp-flex-col asowp-full-center asowp-space-y-1 asowp-text-[${configColors.optionsSideBar.options.modals.option.textColor}] hover:asowp-text-[${configColors.optionsSideBar.options.modals.option.activeTextColor}] asowp-cursor-pointer`">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="asowp-w-7 asowp-h-7">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                </svg>
                                                <p class="asowp-text-xs asowp-font-semibold">
                                                    {{ configVisualiserTexts.textCanvasDelete && configVisualiserTexts.textCanvasDelete.trim() !== '' ? configVisualiserTexts.textCanvasDelete : 'Delete' }}
                                                </p>
                                            </span>

                                            <span @click="turnLeftImage()" :class="`asowp-flex asowp-flex-col asowp-full-center asowp-space-y-4 asowp-text-[${configColors.optionsSideBar.options.modals.option.textColor}] hover:asowp-text-[${configColors.optionsSideBar.options.modals.option.activeTextColor}] asowp-base-animation`">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="asowp-w-5 asowp-h-5">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                                                </svg>
                                                <p class="asowp-text-xs asowp-font-semibold">Turn left</p>
                                            </span>

                                            <span @click="turnRightImage()" :class="`asowp-flex asowp-flex-col asowp-full-center asowp-space-y-4 asowp-text-[${configColors.optionsSideBar.options.modals.option.textColor}] hover:asowp-text-[${configColors.optionsSideBar.options.modals.option.activeTextColor}] asowp-base-animation`">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="asowp-w-5 asowp-h-5">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="m15 15 6-6m0 0-6-6m6 6H9a6 6 0 0 0 0 12h3" />
                                                </svg>
                                                <p class="asowp-text-xs asowp-font-semibold">Turn right</p>
                                            </span>

                                            <span @click="flipImage()" :class="`asowp-flex asowp-flex-col asowp-full-center asowp-space-y-4 asowp-text-[${configColors.optionsSideBar.options.modals.option.textColor}] hover:asowp-text-[${configColors.optionsSideBar.options.modals.option.activeTextColor}] asowp-base-animation`">
                                                <svg fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="asowp-w-5 asowp-h-5">
                                                    <path d="m10.562 13.984c-3.1094-0.2241-5.5625-2.8177-5.5625-5.9843 0-3.3137 2.6863-6 6-6h7c0.5523 0 1 0.44771 1 1v18c0 0.5523-0.4477 1-1 1s-1-0.4477-1-1v-7h-4.4444l-3.3144 7.4573c-0.14667 0.33-0.47392 0.5427-0.83505 0.5427-0.66129 0-1.1036-0.6807-0.83505-1.2849l2.9914-6.7308zm0.4375-1.9843c-2.2091 0-4-1.7909-4-4 0-2.2091 1.7909-4 4-4h6v8h-6z" clip-rule="evenodd" fill="currentColor" fill-rule="evenodd"></path>
                                                </svg>
                                                <p class="asowp-text-xs asowp-font-semibold">Flip</p>
                                            </span>

                                            <span  @click="moveObject('up')" :class="`asowp-flex asowp-flex-col asowp-full-center asowp-space-y-1 asowp-text-[${configColors.optionsSideBar.options.modals.option.textColor}] hover:asowp-text-[${configColors.optionsSideBar.options.modals.option.activeTextColor}] asowp-cursor-pointer asowp-base-animation`">
                                                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="asowp-w-7 asowp-h-7">
                                                    <path d="m12.707 3.2929c-0.3905-0.39052-1.0237-0.39052-1.4142 0l-4 4c-0.39052 0.39053-0.39052 1.0237 0 1.4142 0.39053 0.39052 1.0237 0.39052 1.4142 0l2.2929-2.2929v7.5858c0 0.5523 0.4477 1 1 1s1-0.4477 1-1v-7.5858l2.2929 2.2929c0.3905 0.39052 1.0237 0.39052 1.4142 0 0.3905-0.39053 0.3905-1.0237 0-1.4142l-4-4z" fill="currentColor"></path>
                                                    <path d="m3.1056 13.211 5.8944-2.9472v2.2361l-5 2.5 8 4 8-4-5-2.5v-2.2361l5.8944 2.9472c0.6776 0.3388 1.1056 1.0313 1.1056 1.7889 0 0.7575-0.428 1.4501-1.1056 1.7888l-8 4c-0.563 0.2816-1.2258 0.2816-1.7888 0l-8-4c-0.67757-0.3387-1.1056-1.0313-1.1056-1.7888 0-0.7576 0.428-1.4501 1.1056-1.7889z" fill="currentColor"></path>
                                                </svg>
                                                <p class="asowp-text-xs asowp-font-semibold">
                                                    {{ configVisualiserTexts.textMoveUp && configVisualiserTexts.textMoveUp.trim() !== '' ? configVisualiserTexts.textMoveUp : 'Move up' }}
                                                </p>
                                            </span>

                                            <span  @click="moveObject('down')" :class="`asowp-flex asowp-flex-col asowp-full-center asowp-space-y-1 asowp-text-[${configColors.optionsSideBar.options.modals.option.textColor}] hover:asowp-text-[${configColors.optionsSideBar.options.modals.option.activeTextColor}] asowp-cursor-pointer asowp-base-animation`">
                                                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="asowp-w-7 asowp-h-7">
                                                    <path d="m12.707 20.707c-0.3905 0.3905-1.0237 0.3905-1.4142 0l-4-4c-0.39052-0.3905-0.39052-1.0237 0-1.4142 0.39053-0.3905 1.0237-0.3905 1.4142 0l2.2929 2.2929v-7.5858c0-0.55228 0.4477-1 1-1s1 0.44772 1 1v7.5858l2.2929-2.2929c0.3905-0.3905 1.0237-0.3905 1.4142 0s0.3905 1.0237 0 1.4142l-4 4z" fill="currentColor"></path>
                                                    <path d="m3.1056 10.789 5.8944 2.9472v-2.2361l-5-2.5 8-4 8 4-5 2.5v2.2361l5.8944-2.9472c0.6776-0.3388 1.1056-1.0314 1.1056-1.7889s-0.428-1.4501-1.1056-1.7888l-8-4c-0.563-0.28152-1.2258-0.28152-1.7888 0l-8 4c-0.67757 0.33878-1.1056 1.0313-1.1056 1.7888s0.428 1.4501 1.1056 1.7889z" fill="currentColor"></path>
                                                </svg>
                                                <p class="asowp-text-xs asowp-font-semibold">
                                                    {{ configVisualiserTexts.textMoveDown && configVisualiserTexts.textMoveDown.trim() !== '' ? configVisualiserTexts.textMoveDown : 'Move down' }}
                                                </p>
                                            </span>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
    
                    <div v-show="step == 'add-components'" class="asowp-ralative asowp-flex asowp-flex-col lg:asowp-space-y-1 asowp-w-full asowp-h-full" id="asowp-fixings-section">
                        <p :class="`asowp-hidden lg:asowp-flex asowp-bg-[${configColors.optionsSideBar.options.modals.headerBackgroundColor}] asowp-text-[${configColors.optionsSideBar.options.modals.headerTextColor}] asowp-text-lg asowp-font-semibold asowp-p-2 asowp-px-4`">{{addComponentValue.title}}</p>    
    
                        <div v-if="materialType == 'simple'" class="asowp-h-full asowp-p-2 asowp-overflow-auto asowp-scrollBar">
                            <div v-for="(option, index) in addComponentValue.options">
                                <div class="asowp-space-y-3 asowp-w-full asowp-h-full">
                                    <input type="radio" :id="'asowp-addOptions' + addComponentValue.title + option.title + index" name="asowp-fixings" class=" peer asowp-hidden" @change="selectAddComponent(addComponentValue.title, option.title, option.additionalPrice)">
                                    <label :for="'asowp-addOptions' + addComponentValue.title + option.title + index" :class="`asowp-flex asowp-full-center asowp-space-x-2 asowp-cursor-pointer asowp-text-[${configColors.optionsSideBar.options.modals.option.textColor}] hover:asowp-bg-[${configColors.optionsSideBar.options.modals.option.hoverBackgroundColor}]/50  hover:asowp-text-[${configColors.optionsSideBar.options.modals.option.hoverTextColor}] asowp-p-2 asowp-base-animation`">
                                        <div :class="`${option.icon === '' ? `asowp-bg-[${configColors.backgroundColorHeader}]` : `` } asowp-w-1/4 asowp-h-20 asowp-flex asowp-full-center`">
                                            <img v-if="option.icon != ''" :src="option.icon" class="asowp-w-auto asowp-h-full" />
                                        </div>
                                        <div :class="`asowp-w-3/4 asowp-flex asowp-flex-col asowp-space-y-1`">
                                            <p class="asowp-text-sm asowp-font-medium first-letter:asowp-uppercase">{{ option.title }} <span v-if="option.additionalPrice > 0" class="asowp-text-[11px]">({{option.additionalPrice}} {{props.currency}})</span></p>
                                            <p class="asowp-text-xs">{{ option.description }}</p>
                                            <div class="asowp-w-full asowp-flex asowp-items-center asowp-justify-between">
                                                <span v-if="option.popImg.trim() != ''" @click="showAddComponentExample(true, option.popImg, index)" :class="`asowp-text-xs asowp-text-[${configColors.optionsSideBar.options.modals.option.activeTextColor}] asowp-underline asowp-cursor-pointer`">example</span>
                                                <span v-if="option.popImg.trim() == ''" class="asowp-invisible">example</span>       
                                                <span :class="`${ addComponentSelected.some(item => item.option === addComponentValue.title && item.value === option.title) ? `asowp-text-[${configColors.optionsSideBar.options.modals.option.activeTextColor}]` : `asowp-text-transparent asowp-border-[${configColors.optionsSideBar.options.modals.option.activeTextColor}] asowp-border-solid asowp-border-2`} asowp-flex asowp-w-fit asowp-h-fit asowp-rounded-full`">
                                                    <svg fill="currentColor" class="asowp-w-6 asowp-h-6" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve" stroke="currentColor">
                                                        <g id="SVGRepo_bgCarrier" stroke-width="0"/>
                                                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
                                                        <g id="SVGRepo_iconCarrier"> <g> <g> <path d="M256,0C114.837,0,0,114.843,0,256s114.837,256,256,256s256-114.843,256-256S397.163,0,256,0z M376.239,227.501 L257.348,346.391c-13.043,13.043-34.174,13.044-47.218,0l-68.804-68.804c-13.044-13.038-13.044-34.179,0-47.218 c13.044-13.044,34.174-13.044,47.218,0l45.195,45.19l95.282-95.278c13.044-13.044,34.174-13.044,47.218,0 C389.283,193.321,389.283,214.462,376.239,227.501z"/> </g> </g> </g>
                                                    </svg>
                                                </span>                
                                            </div>
                                        </div>
                                    </label>
                                </div>

                                <div v-show="showAddComponentEx && addComponentExId === index" :class="`asowp-absolute asowp-top-0 asowp-right-0 asowp-w-[85%] lg:asowp-w-full asowp-h-[90%] asowp-overflow-auto asowp-scrollBar asowp-translate-y-[-50%] lg:asowp-translate-y-[0%] lg:asowp-translate-x-[101%] asowp-bg-[${configColors.optionsSideBar.options.modals.backgroundColor}] asowp-text-[${configColors.optionsSideBar.options.modals.textColor}] asowp-p-2`">
                                    <img :src="addComponentExample" class="asowp-w-auto asowp-h-full">
                                    <div class="asowp-absolute asowp-top-0 asowp-right-0 asowp-w-fit asowp-h-fit asowp-cursor-pointer">
                                        <span @click="showAddComponentExample(false)" :class="`asowp-flex asowp-bg-[${configColors.optionsSideBar.options.modals.buttons.backgroundColor}] hover:asowp-bg-[${configColors.optionsSideBar.options.modals.buttons.hoverBackgroundColor}] asowp-text-[${configColors.optionsSideBar.options.modals.buttons.textColor}] hover:asowp-text-[${configColors.optionsSideBar.options.modals.buttons.hoverTextColor}] asowp-p-1 asowp-base-animation`">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="asowp-w-5 asowp-h-5">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                                            </svg>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div v-show="step == 'add-options'" class="asowp-relative asowp-flex asowp-flex-col lg:asowp-space-y-1 asowp-w-full asowp-h-full" id="asowp-fixings-section">
                        <p :class="`asowp-hidden lg:asowp-flex asowp-bg-[${configColors.optionsSideBar.options.modals.headerBackgroundColor}] asowp-text-[${configColors.optionsSideBar.options.modals.headerTextColor}] asowp-text-lg asowp-font-semibold asowp-p-2 asowp-px-4`">{{ props.config.data.settings.languageImages.visualizer.textAdditonnalOptionsHeader && props.config.data.settings.languageImages.visualizer.textAdditonnalOptionsHeader.trim() !== '' ? props.config.data.settings.languageImages.visualizer.textAdditonnalOptionsHeader : 'Additionnals Options' }}</p>    
    
                        <div class="asowp-h-full asowp-space-y-2 asowp-p-4 asowp-overflow-auto asowp-scrollBar">
                            <div v-for="(option, indexx) in configAdditionnalOptions">
                                <div v-if="option.type == 'yes/no'" class="asowp-w-full">
                                    <div class="asowp-flex asowp-flex-col asowp-space-y-2 asowp-w-full">
                                        <div class="asowp-flex asowp-justify-between asowp-items-start asowp-space-x-3">
                                            <div>
                                                <p :class="`asowp-text-[${configColors.backgroundColorHeader}] asowp-font-medium lowercase first-letter:uppercase asowp-text-[16px]`">
                                                    {{ option.label }}
                                                    <span v-if="option.price.type == 'base'">(+{{ currentDevise }}{{ option.price.value }})</span>
                                                    <span v-if="option.price.type == 'multiplier'">(+{{ option.price.value }}%)</span>
                                                </p>
                                                <p :class="` asowp-text-xs lowercase first-letter:uppercase`">{{ option.description }}</p>
                                            </div>
                                            <div>
                                                <span v-if="option.popImg != ''" @click="()=>showYesNoExample(option.popImg, indexx)" :class="`asowp-text-[${configColors.optionsSideBar.options.modals.option.activeTextColor}] asowp-cursor-pointer asowp-flex underline asowp-text-base asowp-font-medium p-1 asowp-px-2 asowp-transition-all asowp-duration-500 asowp-ease-in-out asowp-rounded-lg`">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="asowp-w-6 asowp-h-6">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    </svg>
                                                </span>
                                            </div>
                                        </div>
                                        <div class="asowp-flex asowp-space-x-4 asowp-w-full">
                                            <div class="asowp-flex asowp-w-full">
                                                <input type="radio" :id="option.label.replace(/\s+/g, '-') +0" :value="option.inputs.yes" :name="option.label.toLowerCase().replace(/\s+/g, '-') " class="asowp-hidden peer" required @click="()=>addToOrUpdateArray(customAdditionalValues, indexx, option.label, option.inputs.yes, option.price)" :price-type="option.price.type" :price-value="option.price.value">
                                                <label :for="option.label.replace(/\s+/g, '-') +0" :class="`${(customAdditionalValues.some(item => item.id === indexx) && customAdditionalValues.some(item => item.value === option.inputs.yes) )? `asowp-text-[${configColors.optionsSideBar.options.modals.option.activeTextColor}] asowp-ring-[${configColors.optionsSideBar.options.modals.option.activeTextColor}]`: `asowp-text-[${configColors.optionsSideBar.options.modals.option.textColor}] asowp-ring-[${configColors.optionsSideBar.options.modals.option.textColor}]`} hover:asowp-text-[${configColors.optionsSideBar.options.modals.option.activeTextColor}] hover:asowp-ring-[${configColors.optionsSideBar.options.modals.option.activeTextColor}]
                                                    asowp-relative asowp-cursor-pointer w-auto asowp-h-auto asowp-px-2 asowp-w-full asowp-p-3 xl:asowp-px-4 asowp-rounded-md  xl:asowp-space-y-3 asowp-ring-2 asowp-flex asowp-flex-col asowp-justify-center xl:asowp-justify-start asowp-transition-all asowp-duration-500 asowp-ease-in-out`"
                                                >                           
                                                    <div class="asowp-text-base lg:asowp-text-sm xl:asowp-text-md asowp-font-medium asowp-flex asowp-justify-center asowp-items-center">
                                                        <p class="lowercase first-letter:uppercase">{{option.inputs.yes}}</p>
                                                    </div>
                                                </label>
                                            </div>
                                            <div class="asowp-flex asowp-w-full">
                                                <input type="radio" :id="option.label.replace(/\s+/g, '-') +1" :value="option.inputs.no" :name="option.label.toLowerCase().replace(/\s+/g, '-') " class="asowp-hidden peer" required @click="()=>addToOrUpdateArray(customAdditionalValues, indexx, option.label, option.inputs.no, {type: 'none', value: 0})" price-type="none" :price-value="0">
                                                <label :for="option.label.replace(/\s+/g, '-') +1" :class="`${(customAdditionalValues.some(item => item.id === indexx) && customAdditionalValues.some(item => item.value === option.inputs.no) )? `asowp-text-[${configColors.optionsSideBar.options.modals.option.activeTextColor}] asowp-ring-[${configColors.optionsSideBar.options.modals.option.activeTextColor}]`: `asowp-text-[${configColors.optionsSideBar.options.modals.option.textColor}] asowp-ring-[${configColors.optionsSideBar.options.modals.option.textColor}]`} hover:asowp-text-[${configColors.optionsSideBar.options.modals.option.activeTextColor}] hover:asowp-ring-[${configColors.optionsSideBar.options.modals.option.activeTextColor}]
                                                    asowp-relative asowp-cursor-pointer w-auto asowp-h-auto asowp-px-2 asowp-w-full asowp-p-3 xl:asowp-px-4 asowp-rounded-md  xl:asowp-space-y-3 asowp-ring-2 asowp-flex asowp-flex-col asowp-justify-center xl:asowp-justify-start asowp-transition-all asowp-duration-500 asowp-ease-in-out`"
                                                >                           
                                                    <div class="asowp-text-base lg:asowp-text-sm xl:asowp-text-md asowp-font-medium asowp-flex asowp-justify-center asowp-items-center">
                                                        <p class="lowercase first-letter:uppercase">{{option.inputs.no}}</p>
                                                    </div>
                                                </label>
                                            </div>
                                        </div>
                                        <div v-show="showYesNo && yesNoIndex == indexx" :class="`asowp-bg-[${configColors.optionsSideBar.options.modals.backgroundColor}] asowp-text-[${configColors.optionsSideBar.options.modals.textColor}] asowp-absolute asowp-top-0 asowp-right-0 asowp-translate-y-[-50%] lg:asowp-translate-y-[0%] lg:asowp-translate-x-[101%] asowp-w-[85%] asowp-h-fit asowp-p-2 asowp-z-10`">
                                            <div :class="`asowp-cursor-pointer asowp-flex asowp-items-center asowp-justify-center asowp-bg-[${configColors.optionsSideBar.options.modals.buttons.backgroundColor}] hover:asowp-bg-[${configColors.optionsSideBar.options.modals.buttons.hoverBackgroundColor}] asowp-text-[${configColors.optionsSideBar.options.modals.buttons.textColor}] hover:asowp-text-[${configColors.optionsSideBar.options.modals.buttons.hoverTextColor}] asowp-absolute asowp-right-0 asowp-top-0 asowp-p-1`" @click="()=>showYesNoExample()">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="asowp-w-6 asowp-h-6">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </div>
                                            <img :src="showYesNoImg" class="asowp-w-auto asowp-h-full">
                                        </div>
                                    </div>
                                </div>
    
                                <div v-if="option.type == 'image-input'">
                                    <div class="asowp-flex asowp-flex-col asowp-space-y-2 asowp-w-full">
                                        <div>
                                            <p :class="`asowp-text-[${configColors.backgroundColorHeader}] asowp-font-medium lowercase first-letter:uppercase asowp-text-[16px]`">{{ option.label }}</p>
                                            <p :class="` asowp-text-xs lowercase first-letter:uppercase`">{{ option.description }}</p>
                                        </div>
                                        <div v-if="selectedId == indexx" :class="` asowp-text-xs`">
                                            {{selectedOption}}
                                        </div>
                                        <div class="asowp-grid asowp-grid-cols-4 lg:asowp-grid-cols-2 xl:asowp-grid-cols-4 asowp-gap-4">
                                            <div v-for="(element, index) in option.options" class="">
                                                <input type="radio" :id="'asowp-image-input'+element.label+index" :name="option.label.toLowerCase().replace(/\s+/g, '-') " class="asowp-hidden peer" required @click="()=>{addToOrUpdateArray(customAdditionalValues, indexx, option.label, element.value, element.price); selectOption(element.value, element.price, indexx)}" :price-type="element.price.type" :price-value="element.price.value">
    
                                                <label :for="'asowp-image-input'+element.label+index" :class="`${(customAdditionalValues.some(item => item.id === indexx) && customAdditionalValues.some(item => item.value === element.value) )? `asowp-text-[${configColors.optionsSideBar.options.modals.option.activeTextColor}] asowp-ring-2 asowp-ring-[${configColors.optionsSideBar.options.modals.option.activeTextColor}]`: `asowp-ring-[${configColors.optionsSideBar.options.modals.option.textColor}]`} asowp-border
                                                    asowp-p-0.5 asowp-cursor-pointer asowp-w-[70px] asowp-h-[70px] asowp-flex asowp-ring-2 asowp-rounded-lg asowp-overflow-hidden`" 
                                                >
                                                    <div v-if="element.prevImg !==''" class="asowp-h-full asowp-w-full asowp-relative">
                                                        <img class="asowp-w-full asowp-h-full asowp-rounded-lg" :src="element.prevImg" />
                                                        <span v-if="element.popImg !== ''" @click="showInputImageExample(element.popImg, index, element.label)" :class="`asowp-cursor-pointer asowp-z-1 asowp-w-[34px] asowp-h-[30px] asowp-bottom-0 asowp-right-0 asowp-absolute asowp-bg-[${configColors.optionsSideBar.options.modals.buttons.backgroundColor}] asowp-rounded-tl-[20px] asowp-rounded-br-[5px] asowp-border border-neutral-400 asowp-text-[${configColors.optionsSideBar.options.modals.buttons.textColor}] asowp-flex asowp-justify-center asowp-items-center`">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="asowp-w-8 asowp-h-8 asowp-p-1.5">
                                                                <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                                                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                            </svg>
                                                        </span>
                                                    </div>
                                                    <div v-if="element.prevImg === ''" :class="`asowp-p-4 asowp-bg-[${element.color}] asowp-w-full asowp-h-full asowp-relative asowp-rounded-lg`">
                                                        <span v-if="element.popImg !== ''" @click="showInputImageExample(element.popImg, index, element.label)" :class="`asowp-cursor-pointer asowp-z-1 asowp-w-[34px] asowp-h-[30px] asowp-bottom-0 asowp-right-0 asowp-absolute asowp-bg-[${configColors.optionsSideBar.options.modals.buttons.backgroundColor}] asowp-rounded-tl-[20px] asowp-rounded-br-[5px] asowp-border border-neutral-400 asowp-text-[${configColors.optionsSideBar.options.modals.buttons.textColor}] asowp-flex asowp-justify-center asowp-items-center`">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="asowp-w-8 asowp-h-8 asowp-p-1.5">
                                                                <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                                                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                            </svg>
                                                        </span>
                                                    </div>
                                                </label>
                                                <div v-show="inputImageExample && inputImageIndex == index && inputImageLabel == element.label" :class="`asowp-bg-[${configColors.optionsSideBar.options.modals.backgroundColor}] asowp-text-[${configColors.optionsSideBar.options.modals.textColor}] asowp-absolute asowp-top-0 asowp-right-0 asowp-translate-y-[-50%] lg:asowp-translate-y-[0%] lg:asowp-translate-x-[101%] asowp-w-[85%] asowp-h-fit asowp-p-2 asowp-z-10`">
                                                    <div :class="`asowp-cursor-pointer asowp-flex asowp-items-center asowp-justify-center asowp-bg-[${configColors.optionsSideBar.options.modals.buttons.backgroundColor}] hover:asowp-bg-[${configColors.optionsSideBar.options.modals.buttons.hoverBackgroundColor}] asowp-text-[${configColors.optionsSideBar.options.modals.buttons.textColor}] hover:asowp-text-[${configColors.optionsSideBar.options.modals.buttons.hoverTextColor}] aso asowp-absolute asowp-right-0 asowp-top-0 asowp-p-1`" @click="showInputImageExample()">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="asowp-w-6 asowp-h-6">
                                                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                        </svg>
                                                    </div>
                                                    <img :src="inputImageImg" class="asowp-w-full asowp-h-full">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
    
                                <div v-if="option.type == 'dropdown'" class="asowp-space-y-4">
                                    <div class="asowp-space-y-2 asowp-w-full">
                                        <div class="asowp-flex asowp-justify-between asowp-items-center asowp-space-x-3">
                                            <div>
                                                <p :class="`asowp-text-[${configColors.backgroundColorHeader}] asowp-font-medium lowercase first-letter:uppercase asowp-text-[16px]`">{{ option.label }}</p>
                                                <p :class="` asowp-text-xs lowercase first-letter:uppercase`">{{ option.description }}</p>
                                            </div>
                                            <div>
                                                <span v-show="dropdownExampleImg != ''" @click="()=>showDropdownExample()" :class="`asowp-text-[${configColors.optionsSideBar.options.modals.option.activeTextColor}] asowp-cursor-pointer asowp-flex underline asowp-text-base asowp-font-medium p-1 asowp-px-2 asowp-transition-all asowp-duration-500 asowp-ease-in-out asowp-rounded-lg`">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="asowp-w-6 asowp-h-6">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    </svg>
                                                </span>
                                            </div>
                                        </div>
                                        <select id="" class="asowp-w-full asowp-p-2 asowp-border-[1.5px] border-zinc-400 asowp-rounded-lg asowp-text-base" :name="option.label.toLowerCase().replace(/\s+/g, '-') " @change="(e)=>{addToOrUpdateArray(customAdditionalValues, indexx, option.label, dropdownValue.value, dropdownValue.price), dropdownExampleImg = e.target.options[e.target.selectedIndex].getAttribute('popImg')}" v-model="dropdownValue">
                                            <option v-for="(element, indx) in option.options" :value="element" :priceType="element.price.type" :priceValue="element.price.value" :popImg="element.popImg">
                                                {{element.label}}
                                                <span v-if="element.price.type == 'base'">(+{{ currentDevise }}{{ element.price.value }})</span>
                                                <span v-if="element.price.type == 'multiplier'">(+{{ element.price.value }}%)</span> 
                                            </option>
                                        </select>
    
                                        <div v-show="dropdownExample && dropdownIndex == indexx && dropdownExampleImg != ''" :class="`asowp-bg-[${configColors.optionsSideBar.options.modals.backgroundColor}] asowp-text-[${configColors.optionsSideBar.options.modals.textColor}] asowp-absolute asowp-top-0 asowp-right-0 asowp-translate-y-[-50%] lg:asowp-translate-y-[0%] lg:asowp-translate-x-[101%] asowp-w-[85%] asowp-h-fit asowp-p-2 asowp-z-10`">
                                            <div :class="`asowp-cursor-pointer asowp-flex asowp-items-center asowp-justify-center asowp-bg-[${configColors.optionsSideBar.options.modals.buttons.backgroundColor}] hover:asowp-bg-[${configColors.optionsSideBar.options.modals.buttons.hoverBackgroundColor}] asowp-text-[${configColors.optionsSideBar.options.modals.buttons.textColor}] hover:asowp-text-[${configColors.optionsSideBar.options.modals.buttons.hoverTextColor}] asowp-absolute asowp-right-0 asowp-top-0 asowp-p-1`" @click="()=>showDropdownExample()">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="asowp-w-6 asowp-h-6">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </div>
                                            <img :src="dropdownExampleImg" class="asowp-w-full asowp-h-full">
                                        </div>
                                    </div>
                                </div>
    
                                <div v-if="option.type == 'note'">
                                    <div class="asowp-flex asowp-flex-col asowp-space-y-2 asowp-w-full">
                                        <div class="asowp-flex asowp-flex-col asowp-w-full">
                                            <p :class="`asowp-text-[${configColors.backgroundColorHeader}] asowp-font-medium lowercase first-letter:uppercase asowp-text-[16px]`">{{ option.label }}</p>
                                            <p :class="` asowp-text-xs lowercase first-letter:uppercase`">{{ option.description }}</p>
                                        </div>                        
                                        <div class="asowp-w-full">
                                            <textarea  @input="(e)=>addToOrUpdateArray(customAdditionalValues, indexx, option.label, e.target.value)"  :maxlength="option.noteLimitChar" :name="option.label.toLowerCase().replace(/\s+/g, '-') " id="" cols="20" rows="10" class="asowp-w-full asowp-h-[113px] asowp-rounded-md asowp-border asowp-border-gray-400 asowp-p-4" ></textarea>
                                        </div>
                                        <div v-show="noteValue.length == option.noteLimitChar"  :class="`asowp-text-xs lg:asowp-text-sm asowp-p-2 asowp-bg-[${configColors.optionsSideBar.options.modals.buttons.backgroundColor}] asowp-text-[${configColors.optionsSideBar.options.modals.buttons.textColor}]`"> La limite de caratcère est atteinte </div>
                                    </div>
                                </div>
    
                                <div v-if="option.type == 'include-type'" >
                                    <div class="asowp-relative asowp-flex asowp-space-x-3 asowp-justify-between asowp-w-full">
                                        <div>
                                            <p :class="`asowp-text-[${configColors.backgroundColorHeader}] asowp-flex space-x-2 asowp-font-medium asowp-text-[16px]`">
                                                <span class="asowp-lowercase first-letter:asowp-uppercase">
                                                    {{ option.label }}
                                                </span> 
                                                <span v-if="option.price.type == 'base'">(+{{ currentDevise }}{{ option.price.value }})</span>
                                                <span v-if="option.price.type == 'multiplier'">(+{{ option.price.value }}%)</span>
                                                <span :class="`asowp-text-[${configColors.optionsSideBar.options.modals.option.activeTextColor}] asowp-flex asowp-w-fit asowp-items-center asowp-justify-center asowp-px-2 asowp-p-0.5 asowp-rounded-lg`">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="asowp-w-5 asowp-h-5">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                                                    </svg>
                                                </span>
                                            </p>
                                            <p :class="` asowp-text-xs asowp-lowercase first-letter:asowp-uppercase`">{{ option.description }}</p>
                                        </div>
                                        <div>
                                            <span v-if="option.popImg != ''" @click="()=>showFreeExample(option.popImg, indexx)" :class="`asowp-text-[${configColors.optionsSideBar.options.modals.option.activeTextColor}] asowp-cursor-pointer asowp-flex underline asowp-text-base asowp-font-medium asowp-p-1 asowp-px-2 asowp-transition-all asowp-duration-500 asowp-ease-in-out asowp-rounded-lg`">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="asowp-w-6 asowp-h-6">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                            </span>
                                        </div>                     
                                        <div v-if="showFree && freeIndex == indexx" :class="`asowp-bg-[${configColors.optionsSideBar.options.modals.backgroundColor}] asowp-text-[${configColors.optionsSideBar.options.modals.textColor}] asowp-absolute asowp-bottom-[0%] asowp-right-[0%] asowp-w-[75%] asowp-h-auto asowp-p-2 asowp-z-10`">
                                            <span :class="`asowp-cursor-pointer asowp-flex asowp-items-center asowp-justify-center asowp-bg-[${configColors.optionsSideBar.options.modals.buttons.backgroundColor}] hover:asowp-bg-[${configColors.optionsSideBar.options.modals.buttons.hoverBackgroundColor}] asowp-text-[${configColors.optionsSideBar.options.modals.buttons.textColor}] hover:asowp-text-[${configColors.optionsSideBar.options.modals.buttons.hoverTextColor}] asowp-absolute asowp-right-0 asowp-top-0 asowp-p-1`" @click="()=>showFreeExample()">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="asowp-w-6 asowp-h-6">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </span>
                                            <img :src="showFreeImg" class="asowp-w-full asowp-h-full">
                                        </div>
                                    </div>
                                </div>                               
                            </div>
                        </div>
                    </div>
                </div>
    
                <div class="asowp-w-full asowp-flex lg:asowp-hidden asowp-h-[15%] asowp-bg-red-400">
                    <div :class="`asowp-w-1/2 asowp-h-full asowp-flex asowp-full-center asowp-bg-[${configColors.recaps.buttonEditBackgroundColor}] hover:asowp-bg-[${configColors.recaps.buttonEditHoverBackgroundColor}] asowp-text-[${configColors.recaps.buttonEditTextColor}] hover:asowp-text-[${configColors.recaps.buttonEditHoverTextColor}] asowp-buttons-rad-none`">
                        {{ configVisualiserTexts.textCanvasEdit && configVisualiserTexts.textCanvasEdit.trim() !== '' ? configVisualiserTexts.textCanvasEdit : 'Finish' }}
                    </div>
                    <button :disabled="currentSizeData.width <= 0 || currentSizeData.height <= 0" @click="finishConfig()" :class="`asowp-w-1/2 asowp-h-full asowp-flex asowp-full-center asowp-bg-[${configColors.recaps.buttonFinishBackgroundColor}] hover:asowp-bg-[${configColors.recaps.buttonFinishHoverBackgroundColor}] asowp-text-[${configColors.recaps.buttonFinishTextColor}] hover:asowp-text-[${configColors.recaps.buttonFinishHoverTextColor}] asowp-buttons-rad-none`">
                        {{ configVisualiserTexts.textButtonFinish && configVisualiserTexts.textButtonFinish.trim() !== '' ? configVisualiserTexts.textButtonFinish : 'Finish' }}
                    </button>
                </div>
            </div>
        </div>

        <div v-if="showImg" :class="`asowp-absolute asowp-top-0 asowp-z-20 asowp-bg-[${configColors.bars.reset.modalBackgroundColor}]/70 aso asowp-w-full asowp-h-full asowp-flex asowp-full-center asowp-overflow-hidden`">
            <div :class="`asowp-relative asowp-w-[90%] lg:asowp-h-[80%] asowp-flex asowp-flex-col asowp-space-y-2 asowp-full-center asowp-bg-[${configColors.canvas.backgroundColor}] asowp-border-solid asowp-p-2 asowp-overflow-hidden`">
                <span @click="closeprevImg" :class="`asowp-absolute asowp-top-0 asowp-right-0 asowp-flex asowp-full-centerasowp-flex asowp-bg-[${configColors.optionsSideBar.options.modals.buttons.backgroundColor}] hover:asowp-bg-[${configColors.optionsSideBar.options.modals.buttons.hoverBackgroundColor}] asowp-text-[${configColors.optionsSideBar.options.modals.buttons.textColor}] hover:asowp-text-[${configColors.optionsSideBar.options.modals.buttons.hoverTextColor}] asowp-p-0.5 asowp-base-animation asowp-cursor-pointer asowp-z-20`">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="asowp-w-6 asowp-h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </span>

                <div v-if="configImageSettings.scenes.length > 0" class="asowp-z-20">
                    <span @click="slideSceneImage('left')" :class="`asowp-absolute asowp-top-[50%] asowp-translate-y-[-50%] asowp-left-[4%] asowp-flex asowp-full-centerasowp-flex asowp-bg-[${configColors.optionsSideBar.options.modals.buttons.backgroundColor}] hover:asowp-bg-[${configColors.optionsSideBar.options.modals.buttons.hoverBackgroundColor}] asowp-text-[${configColors.optionsSideBar.options.modals.buttons.textColor}] hover:asowp-text-[${configColors.optionsSideBar.options.modals.buttons.hoverTextColor}] asowp-p-0.5 asowp-base-animation asowp-cursor-pointer asowp-rounded-sm asowp-z-10`">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="asowp-w-6 asowp-h-6 lg:asowp-w-7 lg:asowp-h-7">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                        </svg>
                    </span>
                    <span @click="slideSceneImage('right')" :class="`asowp-absolute asowp-top-[50%] asowp-translate-y-[-50%] asowp-right-[4%] asowp-flex asowp-full-centerasowp-flex asowp-bg-[${configColors.optionsSideBar.options.modals.buttons.backgroundColor}] hover:asowp-bg-[${configColors.optionsSideBar.options.modals.buttons.hoverBackgroundColor}] asowp-text-[${configColors.optionsSideBar.options.modals.buttons.textColor}] hover:asowp-text-[${configColors.optionsSideBar.options.modals.buttons.hoverTextColor}] asowp-p-0.5 asowp-base-animation asowp-cursor-pointer asowp-rounded-sm asowp-z-10`">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="asowp-w-6 asowp-h-6 lg:asowp-w-7 lg:asowp-h-7">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                        </svg>
                    </span>
                </div>
    
                <div v-if="configTextType = 'neon'" id="showPreview" :class="`asowp-w-full asowp-h-[88%] asowp-flex asowp-items-center asowp-justify-center asowp-rounded asowp-relative asowp-overflow-hidden`">
                    <img id="asowp-showPreview" :src="prevImg" class="asowp-w-auto asowp-h-full asowp-z-10" style="pointer-events: none; user-select: none; -webkit-user-select: none" />
                </div>
                <div v-if="configTextType != 'neon'" id="showPreview" :class="`asowp-w-full asowp-h-[88%] asowp-flex asowp-rounded asowp-relative asowp-overflow-hidden`"></div>
                
                <div v-if="configImageSettings.scenes.length > 0" class="asowp-w-full asowp-h-[10%] asowp-flex">
                    <div class="asowp-w-full asowp-h-full asowp-flex asowp-items-center asowp-justify-center asowp-space-x-2">
                        <div id="asowp-miniPreview" @click="setPreviewScene('none', -1)" :class="`${currentSceneUrl == 'none' && currentSceneId == -1 ? `asowp-ring asowp-ring-[${configColors.optionsSideBar.options.modals.buttons.backgroundColor}]` : `` } asowp-flex asowp-w-[60px] asowp-h-[40px] asowp-rounded asowp-overflow-hidden asowp-cursor-pointer`">
                            <!-- <img :src="scene" class="asowp-w-full asowp-h-full" > -->
                        </div>
                        <div @click="setPreviewScene(scene, index)" v-for="(scene, index) in configImageSettings.scenes" :class="`${currentSceneUrl == scene && currentSceneId == index ? `asowp-ring asowp-ring-[${configColors.optionsSideBar.options.modals.buttons.backgroundColor}]` : `` } asowp-flex asowp-w-auto asowp-h-[40px] asowp-rounded asowp-overflow-hidden asowp-cursor-pointer`">
                            <img :src="scene" class="asowp-w-full asowp-h-full" >
                        </div>
                    </div>
                </div>

                <canvas  ref="imageCanvasRef"  class="asowp-w-[90%] asowp-hidden" style="display: none"></canvas>
            </div>
        </div>

        <div v-if="route.name == 'template-maker'" v-show="showTempSettings" id="asowp-templateObjects-options" :class="`asowp-absolute asowp-top-[11%] asowp-right-0 asowp-w-fit asowp-h-fit asowp-bg-[${configColors.optionsSideBar.options.modals.backgroundColor}] asowp-text-[${configColors.optionsSideBar.options.modals.textColor}]`">
            <div class="asowp-relative asowp-flex asowp-flex-col lg:asowp-space-y-3 asowp-w-full asowp-h-full">
                <p :class="`asowp-flex asowp-bg-[${configColors.optionsSideBar.options.modals.headerBackgroundColor}] asowp-text-[${configColors.optionsSideBar.options.modals.headerTextColor}] asowp-text-base asowp-font-semibold asowp-p-2 asowp-px-4`">Custom options</p>    

                <div class="asowp-h-full asowp-p-3 asowp-overflow-auto asowp-scrollBar">
                    <div class="asowp-flex asowp-flex-col asowp-flex-wrap asowp-gap-3">
                        <span @click="lockMoving('x')" :class="`${lockingXobject === true ? `asowp-text-[${configColors.optionsSideBar.options.modals.option.activeTextColor}]` : `asowp-text-[${configColors.optionsSideBar.options.modals.option.textColor}]`} asowp-flex asowp-items-center asowp-space-x-2 hover:asowp-text-[${configColors.optionsSideBar.options.modals.option.activeTextColor}] asowp-cursor-pointer asowp-base-animation`">
                            <p class="asowp-text-xs asowp-font-semibold">Lock X</p>

                            <svg v-if="lockingXobject" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="asowp-w-5 asowp-h-5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                            </svg>
                            <svg v-if="!lockingXobject" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="asowp-w-5 asowp-h-5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 10.5V6.75a4.5 4.5 0 1 1 9 0v3.75M3.75 21.75h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H3.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                            </svg>
                        </span>
                        <span @click="lockMoving('y')" :class="`${lockingYobject === true ? `asowp-text-[${configColors.optionsSideBar.options.modals.option.activeTextColor}]` : `asowp-text-[${configColors.optionsSideBar.options.modals.option.textColor}]`} asowp-flex asowp-items-center asowp-space-x-2 hover:asowp-text-[${configColors.optionsSideBar.options.modals.option.activeTextColor}] asowp-cursor-pointer asowp-base-animation`">
                            <p class="asowp-text-xs asowp-font-semibold">Lock Y</p>

                            <svg v-if="lockingYobject" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="asowp-w-5 asowp-h-5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                            </svg>
                            <svg v-if="!lockingYobject" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="asowp-w-5 asowp-h-5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 10.5V6.75a4.5 4.5 0 1 1 9 0v3.75M3.75 21.75h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H3.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                            </svg>
                        </span>
                        <span @click="lockScaling()" :class="`${lockObjectScale === true ? `asowp-text-[${configColors.optionsSideBar.options.modals.option.activeTextColor}]` : `asowp-text-[${configColors.optionsSideBar.options.modals.option.textColor}]`} asowp-flex asowp-items-center asowp-space-x-2 hover:asowp-text-[${configColors.optionsSideBar.options.modals.option.activeTextColor}] asowp-cursor-pointer asowp-base-animation`">
                            <p class="asowp-text-xs asowp-font-semibold">Lock Resize</p>
                            
                            <svg v-if="lockObjectScale" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="asowp-w-5 asowp-h-5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                            </svg>
                            <svg v-if="!lockObjectScale" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="asowp-w-5 asowp-h-5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 10.5V6.75a4.5 4.5 0 1 1 9 0v3.75M3.75 21.75h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H3.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                            </svg>
                        </span>
                        <span @click="lockRotation()" :class="`${lockObjectRotation === true ? `asowp-text-[${configColors.optionsSideBar.options.modals.option.activeTextColor}]` : `asowp-text-[${configColors.optionsSideBar.options.modals.option.textColor}]`} asowp-flex asowp-items-center asowp-space-x-2 hover:asowp-text-[${configColors.optionsSideBar.options.modals.option.activeTextColor}] asowp-cursor-pointer asowp-base-animation`">
                            <p class="asowp-text-xs asowp-font-semibold">Lock Rotation</p>
                            
                            <svg v-if="lockObjectRotation" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="asowp-w-5 asowp-h-5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                            </svg>
                            <svg v-if="!lockObjectRotation" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="asowp-w-5 asowp-h-5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 10.5V6.75a4.5 4.5 0 1 1 9 0v3.75M3.75 21.75h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H3.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                            </svg>
                        </span>
                        <span @click="lockEdition()" :class="`${lockObjectEdition === true ? `asowp-text-[${configColors.optionsSideBar.options.modals.option.activeTextColor}]` : `asowp-text-[${configColors.optionsSideBar.options.modals.option.textColor}]`} asowp-flex asowp-items-center asowp-space-x-2 hover:asowp-text-[${configColors.optionsSideBar.options.modals.option.activeTextColor}] asowp-cursor-pointer asowp-base-animation`">
                            <p class="asowp-text-xs asowp-font-semibold">Lock text Edition</p>
                            
                            <svg v-if="lockObjectEdition" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="asowp-w-5 asowp-h-5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                            </svg>
                            <svg v-if="!lockObjectEdition" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="asowp-w-5 asowp-h-5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 10.5V6.75a4.5 4.5 0 1 1 9 0v3.75M3.75 21.75h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H3.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                            </svg>
                        </span>
                    </div>
                </div>
            </div>
        </div>
        
        <div v-if="finish" :class="`asowp-absolute asowp-top-0 asowp-z-30 asowp-w-full asowp-h-full asowp-flex asowp-flex-col asowp-bg-[${configColors.recaps.backgroundColor}]`">
            <div :class="`asowp-w-full asowp-p-4 asowp-bg-[${configColors.recaps.headerBackgroundColor}] asowp-text-[${configColors.recaps.headerTextColor}]`">
                <p class="asowp-text-xl asowp-font-bold asowp-text-center">Summary</p>
            </div>

            <div :class="`asowp-flex asowp-flex-col asowp-flex-1 asowp-overflow-auto asowp-scrollBar asowp-text-[${configColors.recaps.optionTextColor}]`">
                <div :class="`asowp-flex asowp-items-center asowp-justify-between asowp-px-4 asowp-py-3 asowp-border-b-2 asowp-border-[${configColors.recaps.optionBorderColor}] hover:asowp-bg-[${configColors.recaps.optionHoverBackgroundColor}] hover:asowp-text-[${configColors.recaps.optionHoverTextColor}] hover:asowp-bg-[${configColors.recaps.optionHoverBorderColor}]`">
                    <p :class="`asowp-text-[16px] asowp-font-semibold`">
                        {{ configVisualiserTexts.textPreview && configVisualiserTexts.textPreview.trim() !== '' ? configVisualiserTexts.textPreview : 'Preview' }}
                    </p>

                    <p class="asowp-text-[14px] asowp-space-y-1 asowp-flex asowp-flex-col asowp-items-center w-2/3 justify-end">
                        <div class="asowp-flex asowp-space-x-2 asowp-full-center">
                            <span v-if="configDoublePart.active"  class="asowp-font-medium">{{configDoublePart.part1}}: </span>
                            <div v-if="configTextType != 'neon'" id="asowp-previewFinish1" class="asowp-w-auto asowp-h-[70px]"></div>
                            <img v-if="configTextType == 'neon'" :src="prevImg" alt="" class="asowp-w-auto asowp-h-[70px]" style="pointer-events: none; user-select: none; -webkit-user-select: none">
                        </div>

                        <div v-if="configDoublePart.active" class="asowp-flex asowp-space-x-2 asowp-full-center">
                            <span class="asowp-font-medium">{{configDoublePart.part2}}: </span>
                            <!-- <img :src="configData.designImages.face2[0].url" class="asowp-w-auto asowp-h-[70px]" > -->
                            <div v-if="configTextType != 'neon'" id="asowp-previewFinish2" class="asowp-w-auto asowp-h-[70px]"></div>
                            <img v-if="configTextType == 'neon'" :src="prevImgBack" alt="" class="asowp-w-auto asowp-h-[70px]" style="pointer-events: none; user-select: none; -webkit-user-select: none">
                        </div>
                    </p>
                </div>
                
                <div v-if=" selectedMaterial != '' " :class="`asowp-flex asowp-items-center asowp-justify-between asowp-px-4 asowp-py-3 asowp-border-b-2 asowp-border-[${configColors.recaps.optionBorderColor}] hover:asowp-bg-[${configColors.recaps.optionHoverBackgroundColor}] hover:asowp-text-[${configColors.recaps.optionHoverTextColor}] hover:asowp-bg-[${configColors.recaps.optionHoverBorderColor}] asowp-base-animation`">
                    <p :class="`asowp-text-[16px] asowp-font-semibold`">{{ configVisualiserTexts.textMaterial ?? 'Material' }}</p>
                    <p :class="`asowp-text-[14px]`">{{ selectedMaterial}}</p>
                </div>

                <div v-if="selectedShape != '' " :class="`asowp-flex asowp-items-center asowp-justify-between asowp-px-4 asowp-py-3 asowp-border-b-2 asowp-border-[${configColors.recaps.optionBorderColor}] hover:asowp-bg-[${configColors.recaps.optionHoverBackgroundColor}] hover:asowp-text-[${configColors.recaps.optionHoverTextColor}] hover:asowp-bg-[${configColors.recaps.optionHoverBorderColor}] asowp-base-animation`">
                    <p :class="`asowp-text-[16px] asowp-font-semibold`">{{ configVisualiserTexts.textShape ?? 'Shape' }}</p>
                    <p :class="`asowp-text-[14px] lowercase first-letter:uppercase`">{{selectedShape}}</p>
                </div>

                <div v-if="currentSizeName != '' " :class="`asowp-flex asowp-items-center asowp-justify-between asowp-px-4 asowp-py-3 asowp-border-b-2 asowp-border-[${configColors.recaps.optionBorderColor}] hover:asowp-bg-[${configColors.recaps.optionHoverBackgroundColor}] hover:asowp-text-[${configColors.recaps.optionHoverTextColor}] hover:asowp-bg-[${configColors.recaps.optionHoverBorderColor}] asowp-base-animation`">
                    <div :class="``">
                        <p v-if="configVisualiserTexts.textSize" class="asowp-text-[16px] asowp-font-semibold">{{configVisualiserTexts.textSize}}</p>
                        <p v-if="!configVisualiserTexts.textSize" class="asowp-text-[16px] asowp-font-semibold">Sizes</p>
                    </div>
                    <div :class="`asowp-flex asowp-flex-col`"> 
                        <p class="asowp-text-[13px]" v-show="configSettings.customizerSign.customizerOptions.showHideMeasurements === 'both' || configSettings.value.customizerSign.customizerOptions.showHideMeasurements === 'only-height'"><span class="asowp-font-semibold">{{ configVisualiserTexts.textHeight && configVisualiserTexts.textHeight.trim() !== '' ? configVisualiserTexts.textHeight : 'Height' }}: </span> 
                            <span>
                                {{configData.sign.size.value.height.value}}
                            </span>
                        </p>
                        <p class="asowp-text-[13px]" v-show="configSettings.customizerSign.customizerOptions.showHideMeasurements === 'both' || configSettings.value.customizerSign.customizerOptions.showHideMeasurements === 'only-width'"><span class="asowp-font-semibold">{{ configVisualiserTexts.textWidth && configVisualiserTexts.textWidth.trim() !== '' ? configVisualiserTexts.textWidth : 'Width' }}: </span> 
                            <span>
                                {{configData.sign.size.value.width.value}}
                            </span>
                        </p>
                        <p class="asowp-text-[13px]" v-if="materialType === 'simple' && thicknesss.active"><span class="asowp-font-semibold">{{configVisualiserTexts.thickness}}: </span> 
                            <span>
                                {{currentThickValue}} {{configUnit}}
                            </span>
                        </p>
                    </div>
                </div>

                <div v-if="activeSignColor != '' " :class="`asowp-flex asowp-items-center asowp-justify-between asowp-px-4 asowp-py-3 asowp-border-b-2 asowp-border-[${configColors.recaps.optionBorderColor}] hover:asowp-bg-[${configColors.recaps.optionHoverBackgroundColor}] hover:asowp-text-[${configColors.recaps.optionHoverTextColor}] hover:asowp-bg-[${configColors.recaps.optionHoverBorderColor}] asowp-base-animation`">
                    <div :class="`asowp-w-1/3`">
                        <p v-if="configVisualiserTexts.textColor" class="asowp-text-[16px] text-black asowp-font-semibold">{{configVisualiserTexts.textColor}}</p>
                        <p v-if="!configVisualiserTexts.textColor" class="asowp-text-[16px] text-black asowp-font-semibold">Color</p>
                    </div>
                    <p class="asowp-text-[14px] asowp-space-y-1 asowp-flex asowp-flex-col asowp-items-center w-2/3 justify-end">
                        <div class="asowp-flex asowp-space-x-2 asowp-full-center">
                            <span v-if="configDoublePart.active"  class="asowp-font-medium">{{configDoublePart.part1}}: </span>
                            <span class="lowercase first-letter:uppercase">{{activeSignColor}}</span>
                            <span :class="`asowp-h-fit asowp-w-fit asowp-p-[1px] asowp-ring-[1px] asowp-ring-[${configColors.recaps.headerBackgroundColor}]`">
                                <span v-if="!patternActive1" :class="`asowp-h-[35px] asowp-w-[35px] asowp-bg-[${activeSignColorCode1}] asowp-flex`"></span>
                                <img v-if="patternActive1" :src="activeSignColorCode1" class="asowp-w-[35px] asowp-h-[35px]" />
                            </span>

                            <span v-if="signTextColor1.active" class="lowercase first-letter:uppercase">{{colorTextColorName1}}</span>
                            <span v-if="signTextColor1.active" :class="`asowp-h-fit asowp-w-fit asowp-p-[1px] asowp-ring-[1px] asowp-ring-[${configColors.recaps.headerBackgroundColor}]`">
                                <span :class="`asowp-h-[35px] asowp-w-[35px] asowp-bg-[${colorTextCodeHex1}] asowp-flex`"></span>
                            </span>
                        </div>

                        <div v-if="configDoublePart.active" class="asowp-flex asowp-space-x-2 asowp-full-center">
                            <span class="asowp-font-medium">{{configDoublePart.part2}}: </span>
                            <span class="lowercase first-letter:uppercase">{{activeSignFace2Color}}</span>
                            <span :class="`asowp-h-fit asowp-w-fit asowp-p-[1px] asowp-ring-[1px] asowp-ring-[${configColors.recaps.headerBackgroundColor}]`">
                                <span v-if="!patternActive2" :class="`asowp-h-[35px] asowp-w-[35px] asowp-bg-[${activeSignColorCode2}] asowp-flex`"></span>
                                <img v-if="patternActive2" :src="activeSignColorCode1" class="asowp-w-[35px] asowp-h-[35px]" />
                            </span>
                            
                            <span v-if="signTextColor2.active" class="lowercase first-letter:uppercase">{{colorTextColorName2}}</span>
                            <span v-if="signTextColor2.active" :class="`asowp-h-fit asowp-w-fit asowp-p-[1px] asowp-ring-[1px] asowp-ring-[${configColors.recaps.headerBackgroundColor}]`">
                                <span :class="`asowp-h-[35px] asowp-w-[35px] asowp-bg-[${colorTextCodeHex2}] asowp-flex`"></span>
                            </span>
                        </div>
                    </p>
                </div>

                <!-- <div v-if="materialType === 'advance' && activeSignColor != '' " class="asowp-flex asowp-items-center asowp-justify-between asowp-w-full asowp-px-4 asowp-py-3 asowp-border-b-2">
                    <div :class="`asowp-w-1/3 asowp-text-[#000000]`">
                        <p v-if="configVisualiserTexts.textColor" class="asowp-text-[16px] text-black asowp-font-semibold">{{configVisualiserTexts.textColor}}</p>
                        <p v-if="!configVisualiserTexts.textColor" class="asowp-text-[16px] text-black asowp-font-semibold">Color</p>
                    </div>
                    <p class="asowp-text-[14px] asowp-space-y-1 asowp-flex asowp-flex-col asowp-items-center w-2/3 justify-end">
                        <div class="asowp-flex asowp-space-x-2 asowp-full-center">
                            <span v-if="configDoublePart.active"  class="asowp-font-medium">{{configDoublePart.part1}}: </span>
                            <span class="lowercase first-letter:uppercase">{{activeSignColor}}</span>
                            <span :class="`asowp-h-fit asowp-w-fit asowp-p-[1px] asowp-border asowp-border-[${configColors.backgroundColorHeader}]`">
                                <img :src="activeSignColorCode1" class="asowp-w-[35px] asowp-h-[35px]" />
                            </span>
                        </div>

                        <div v-if="configDoublePart.active" class="asowp-flex asowp-space-x-2 asowp-full-center">
                            <span class="asowp-font-medium">{{configDoublePart.part2}}: </span>
                            <span class="lowercase first-letter:uppercase">{{activeSignFace2Color}}</span>
                            <span :class="`asowp-h-fit asowp-w-fit asowp-p-[1px] asowp-border asowp-border-[${configColors.backgroundColorHeader}]`">
                                <img :src="activeSignColorCode1" class="asowp-w-[35px] asowp-h-[35px]" />
                            </span>
                        </div>
                    </p>
                </div> -->

                <div v-if="activeFixingMethode != '' " :class="`asowp-flex asowp-items-center asowp-justify-between asowp-px-4 asowp-py-3 asowp-border-b-2 asowp-border-[${configColors.recaps.optionBorderColor}] hover:asowp-bg-[${configColors.recaps.optionHoverBackgroundColor}] hover:asowp-text-[${configColors.recaps.optionHoverTextColor}] hover:asowp-bg-[${configColors.recaps.optionHoverBorderColor}] asowp-base-animation`">
                    <div :class="``">
                        <p v-if="configVisualiserTexts.textFixingMethods" class="asowp-text-[16px] asowp-font-semibold">{{configVisualiserTexts.textFixingMethods}}</p>
                        <p v-if="!configVisualiserTexts.textFixingMethods" class="asowp-text-[16px] asowp-font-semibold">Fixing methode</p>
                    </div>
                    <p :class="`asowp-text-[15px] lowercase first-letter:uppercase`">{{activeFixingMethode}}</p>
                </div>

                <div v-if="materialType === 'simple' && (activeFace1Border != '' || activeFace2Border != '') " :class="`asowp-flex asowp-items-center asowp-justify-between asowp-px-4 asowp-py-3 asowp-border-b-2 asowp-border-[${configColors.recaps.optionBorderColor}] hover:asowp-bg-[${configColors.recaps.optionHoverBackgroundColor}] hover:asowp-text-[${configColors.recaps.optionHoverTextColor}] hover:asowp-bg-[${configColors.recaps.optionHoverBorderColor}] asowp-base-animation`">
                    <div :class="`asowp-w-1/3`">
                        <p v-if="configVisualiserTexts.textBorder" class="asowp-text-[16px] text-black asowp-font-semibold">{{configVisualiserTexts.textBorder}}</p>
                        <p v-if="!configVisualiserTexts.textBorder" class="asowp-text-[16px] text-black asowp-font-semibold">Border</p>
                    </div>
                    <p class="asowp-text-[14px] asowp-space-y-1 asowp-flex asowp-flex-col asowp-items-center w-2/3 justify-end">
                        <div class="asowp-flex asowp-space-x-2 asowp-full-center">
                            <span v-if="configDoublePart.active"  class="asowp-font-medium">{{configDoublePart.part1}}: </span>
                            <span class="lowercase first-letter:uppercase">{{activeFace1Border}}</span>

                            <div v-if="activeFace1Border !== 'none' && (signTextColor1.active && !colorForBorder1)" class="asowp-flex asowp-space-x-1 asowp-full-center">
                                <span class="lowercase first-letter:uppercase">color: {{colorTextColorName1}}</span>
                                <span :class="`asowp-h-fit asowp-w-fit asowp-p-[1px] asowp-border asowp-border-[${configColors.backgroundColorHeader}]`">
                                    <span v-if="!configDoublePart.active" :class="`asowp-h-[35px] asowp-w-[35px] asowp-p-4 asowp-bg-[${configData.sign.border.codeHex}] asowp-flex`"></span>
                                    <span v-if="configDoublePart.active" :class="`asowp-h-[35px] asowp-w-[35px] asowp-p-4 asowp-bg-[${configData.sign.border.value.face1.codeHex}] asowp-flex`"></span>
                                </span>
                            </div>

                            <div v-if="activeFace1Border !== 'none' && colorForBorder1" class="asowp-flex asowp-space-x-1 asowp-full-center">
                                <span class="lowercase first-letter:uppercase">color: {{borderColorName1}}</span>
                                <span :class="`asowp-h-fit asowp-w-fit asowp-p-[1px] asowp-border asowp-border-[${configColors.backgroundColorHeader}]`">
                                    <span v-if="!configDoublePart.active" :class="`asowp-h-[35px] asowp-w-[35px] asowp-p-4 asowp-bg-[${configData.sign.border.codeHex}] asowp-flex`"></span>
                                    <span v-if="configDoublePart.active" :class="`asowp-h-[35px] asowp-w-[35px] asowp-p-4 asowp-bg-[${configData.sign.border.value.face1.codeHex}] asowp-flex`"></span>
                                </span>
                            </div>
                        </div>

                        <div v-if="configDoublePart.active" class="asowp-flex asowp-space-x-2 asowp-full-center">
                            <span class="asowp-font-medium">{{configDoublePart.part2}}: </span>
                            <span class="lowercase first-letter:uppercase">{{activeFace2Border}}</span>
                        
                            <div v-if="activeFace2Border !== 'none' && (signTextColor2.active && !colorForBorder2)" class="asowp-flex asowp-space-x-1 asowp-full-center">
                                <span class="lowercase first-letter:uppercase">color: {{colorTextColorName2}}</span>    
                                <span :class="`asowp-h-fit asowp-w-fit asowp-p-[1px] asowp-border asowp-border-[${configColors.backgroundColorHeader}]`">
                                    <span :class="`asowp-h-[35px] asowp-w-[35px] asowp-p-4 asowp-bg-[${configData.sign.border.value.face2.codeHex}] asowp-flex`"></span>
                                </span>
                            </div>

                            <div v-if="activeFace2Border !== 'none' && colorForBorder2" class="asowp-flex asowp-space-x-1 asowp-full-center">
                                <span class="lowercase first-letter:uppercase">color: {{borderColorName2}}</span>
                                <span :class="`asowp-h-fit asowp-w-fit asowp-p-[1px] asowp-border asowp-border-[${configColors.backgroundColorHeader}]`">
                                    <span :class="`asowp-h-[35px] asowp-w-[35px] asowp-p-4 asowp-bg-[${configData.sign.border.value.face2.codeHex}] asowp-flex`"></span>
                                </span>
                            </div>
                        </div>
                    </p>
                </div>

                <div v-if="materialType === 'simple' && addComponentSelected.length > 0" :class="`asowp-flex asowp-items-center asowp-justify-between asowp-px-4 asowp-py-3 asowp-border-b-2 asowp-border-[${configColors.recaps.optionBorderColor}] hover:asowp-bg-[${configColors.recaps.optionHoverBackgroundColor}] hover:asowp-text-[${configColors.recaps.optionHoverTextColor}] hover:asowp-bg-[${configColors.recaps.optionHoverBorderColor}] asowp-base-animation`" v-for="(option, index) in addComponentSelected">
                    <p :class="`asowp-text-[16px] asowp-font-semibold`">{{option.option}}</p>
                    <p :class="`asowp-text-[14px] lowercase first-letter:uppercase`">{{ option.value }}</p>
                </div>

                <div v-if="(!configDoublePart.active && configData.texts.value.length > 0) || (configDoublePart.active && (configData.texts.value.face1.length > 0 || configData.texts.value.face2.length > 0))" :class="`asowp-flex asowp-items-center asowp-justify-between asowp-px-4 asowp-py-3 asowp-border-b-2 asowp-border-[${configColors.recaps.optionBorderColor}] hover:asowp-bg-[${configColors.recaps.optionHoverBackgroundColor}] hover:asowp-text-[${configColors.recaps.optionHoverTextColor}] hover:asowp-bg-[${configColors.recaps.optionHoverBorderColor}] asowp-base-animation`">
                    <div :class="`asowp-w-1/3`">
                        <p v-if="configVisualiserTexts.textOptionText" class="asowp-text-[16px] text-black asowp-font-semibold">{{configVisualiserTexts.textOptionText}}</p>
                        <p v-if="!configVisualiserTexts.textOptionText" class="asowp-text-[16px] text-black asowp-font-semibold">Text</p>
                    </div>
                    
                    <div class="asowp-text-[14px] asowp-space-y-1 asowp-flex asowp-flex-col asowp-items-center w-2/3 justify-end">
                        <div v-if="!configDoublePart.active && configData.texts.value.length > 0" clss="asowp-space-y-1">
                            <div v-for="(text, id) in configData.texts.value" class="asowp-flex asowp-full-center">
                                {{text.textContent}}: {{text.values.width.value}} {{configSettings.customizerSign.customizerOptions.measurementUnit}} x {{text.values.height.value}} {{configSettings.customizerSign.customizerOptions.measurementUnit}}
                                <div class="asowp-flex asowp-space-x-2 asowp-mx-1">
                                    <span :class="`asowp-h-fit asowp-w-fit asowp-flex asowp-p-[1px] asowp-ring-[1px] asowp-ring-[${configColors.recaps.headerBackgroundColor}]`">
                                        <span :class="`asowp-h-[35px] asowp-w-[35px] asowp-flex asowp-bg-[${text.color}]`"></span>
                                    </span>
                                    <span v-if="configTextType == 'neon'" :class="`asowp-h-fit asowp-w-fit asowp-flex asowp-p-[1px] asowp-ring-[1px] asowp-ring-[${configColors.recaps.headerBackgroundColor}]`">
                                        <span  :class="`asowp-h-[35px] asowp-w-[35px] asowp-flex asowp-bg-[${text.neonColor}]`"></span>
                                    </span>
                                    <span v-if="configTextType == '3D' && text.firstBorder.size > 0" :class="`asowp-h-fit asowp-w-fit asowp-flex asowp-p-[1px] asowp-ring-[1px] asowp-ring-[${configColors.recaps.headerBackgroundColor}]`">
                                        <span :class="`asowp-h-[35px] asowp-w-[35px] asowp-flex asowp-bg-[${text.firstBorder.color}]`"></span>
                                    </span>
                                    <span v-if="configTextType == '3D' && text.secondBorder.size > 0" :class="`asowp-h-fit asowp-w-fit asowp-flex asowp-p-[1px] asowp-ring-[1px] asowp-ring-[${configColors.recaps.headerBackgroundColor}]`">
                                        <span :class="`asowp-h-[35px] asowp-w-[35px] asowp-flex asowp-bg-[${text.secondBorder.color}]`"></span>
                                    </span>
                                    <span v-if="configTextType == '3D' && text.side == true" :class="`asowp-h-fit asowp-w-fit asowp-flex asowp-p-[1px] asowp-ring-[1px] asowp-ring-[${configColors.recaps.headerBackgroundColor}]`">
                                        <span :class="`asowp-h-[35px] asowp-w-[35px] asowp-flex asowp-bg-[${text.sideColor}]`"></span>
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div v-if="configDoublePart.active">
                            <div v-if="configData.texts.value.face1.length > 0" clss="asowp-space-y-1">
                                <span v-if="configDoublePart.active"  class="asowp-font-medium">{{configDoublePart.part1}}: </span>
                                <div v-for="(text, id) in configData.texts.value.face1" class="asowp-flex asowp-full-center">
                                    {{text.textContent}}: {{text.values.width.value}} {{configSettings.customizerSign.customizerOptions.measurementUnit}} x {{text.values.height.value}} {{configSettings.customizerSign.customizerOptions.measurementUnit}}
                                    <div class="asowp-flex asowp-space-x-2 asowp-mx-1">
                                        <span :class="`asowp-h-fit asowp-w-fit asowp-flex asowp-p-[1px] asowp-ring-[1px] asowp-ring-[${configColors.recaps.headerBackgroundColor}]`">
                                            <span :class="`asowp-h-[35px] asowp-w-[35px] asowp-flex asowp-bg-[${text.color}]`"></span>
                                        </span>
                                        <span v-if="configTextType == 'neon'" :class="`asowp-h-fit asowp-w-fit asowp-flex asowp-p-[1px] asowp-ring-[1px] asowp-ring-[${configColors.recaps.headerBackgroundColor}]`">
                                            <span  :class="`asowp-h-[35px] asowp-w-[35px] asowp-flex asowp-bg-[${text.neonColor}]`"></span>
                                        </span>
                                        <span v-if="configTextType == '3D' && text.firstBorder.size > 0" :class="`asowp-h-fit asowp-w-fit asowp-flex asowp-p-[1px] asowp-ring-[1px] asowp-ring-[${configColors.recaps.headerBackgroundColor}]`">
                                            <span :class="`asowp-h-[35px] asowp-w-[35px] asowp-flex asowp-bg-[${text.firstBorder.color}]`"></span>
                                        </span>
                                        <span v-if="configTextType == '3D' && text.secondBorder.size > 0" :class="`asowp-h-fit asowp-w-fit asowp-flex asowp-p-[1px] asowp-ring-[1px] asowp-ring-[${configColors.recaps.headerBackgroundColor}]`">
                                            <span :class="`asowp-h-[35px] asowp-w-[35px] asowp-flex asowp-bg-[${text.secondBorder.color}]`"></span>
                                        </span>
                                        <span v-if="configTextType == '3D' && text.side == true" :class="`asowp-h-fit asowp-w-fit asowp-flex asowp-p-[1px] asowp-ring-[1px] asowp-ring-[${configColors.recaps.headerBackgroundColor}]`">
                                            <span :class="`asowp-h-[35px] asowp-w-[35px] asowp-flex asowp-bg-[${text.sideColor}]`"></span>
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div v-if="configDoublePart.active && configData.texts.value.face2.length > 0" clss="asowp-space-y-1">
                                <span class="asowp-font-medium">{{configDoublePart.part2}}: </span>
                                <div v-for="(text, id) in configData.texts.value.face2" class="asowp-flex asowp-full-center">
                                    {{text.textContent}}: {{text.values.width.value}} {{configSettings.customizerSign.customizerOptions.measurementUnit}} x {{text.values.height.value}} {{configSettings.customizerSign.customizerOptions.measurementUnit}}
                                    <div class="asowp-flex asowp-space-x-2 asowp-mx-1">
                                        <span :class="`asowp-h-fit asowp-w-fit asowp-flex asowp-p-[1px] asowp-ring-[1px] asowp-ring-[${configColors.recaps.headerBackgroundColor}]`">
                                            <span :class="`asowp-h-[35px] asowp-w-[35px] asowp-flex asowp-bg-[${text.color}]`"></span>
                                        </span>
                                        <span v-if="configTextType == 'neon'" :class="`asowp-h-fit asowp-w-fit asowp-flex asowp-p-[1px] asowp-ring-[1px] asowp-ring-[${configColors.recaps.headerBackgroundColor}]`">
                                            <span  :class="`asowp-h-[35px] asowp-w-[35px] asowp-flex asowp-bg-[${text.neonColor}]`"></span>
                                        </span>
                                        <span v-if="configTextType == '3D' && text.firstBorder.size > 0" :class="`asowp-h-fit asowp-w-fit asowp-flex asowp-p-[1px] asowp-ring-[1px] asowp-ring-[${configColors.recaps.headerBackgroundColor}]`">
                                            <span :class="`asowp-h-[35px] asowp-w-[35px] asowp-flex asowp-bg-[${text.firstBorder.color}]`"></span>
                                        </span>
                                        <span v-if="configTextType == '3D' && text.secondBorder.size > 0" :class="`asowp-h-fit asowp-w-fit asowp-flex asowp-p-[1px] asowp-ring-[1px] asowp-ring-[${configColors.recaps.headerBackgroundColor}]`">
                                            <span :class="`asowp-h-[35px] asowp-w-[35px] asowp-flex asowp-bg-[${text.secondBorder.color}]`"></span>
                                        </span>
                                        <span v-if="configTextType == '3D' && text.side == true" :class="`asowp-h-fit asowp-w-fit asowp-flex asowp-p-[1px] asowp-ring-[1px] asowp-ring-[${configColors.recaps.headerBackgroundColor}]`">
                                            <span :class="`asowp-h-[35px] asowp-w-[35px] asowp-flex asowp-bg-[${text.sideColor}]`"></span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div v-if="(!configDoublePart.active && configData.images.value.length > 0) || (configDoublePart.active && (configData.images.value.face1.length > 0 || configData.images.value.face2.length > 0))" :class="`asowp-flex asowp-items-center asowp-justify-between asowp-px-4 asowp-py-3 asowp-border-b-2 asowp-border-[${configColors.recaps.optionBorderColor}] hover:asowp-bg-[${configColors.recaps.optionHoverBackgroundColor}] hover:asowp-text-[${configColors.recaps.optionHoverTextColor}] hover:asowp-bg-[${configColors.recaps.optionHoverBorderColor}] asowp-base-animation`">
                    <div :class="`asowp-w-1/3`">
                        <p v-if="configVisualiserTexts.textImage" class="asowp-text-[16px] text-black asowp-font-semibold">{{configVisualiserTexts.textImage}}</p>
                        <p v-if="!configVisualiserTexts.textImage" class="asowp-text-[16px] text-black asowp-font-semibold">Text</p>
                    </div>
                    
                    <div class="asowp-text-[14px] asowp-space-y-1 asowp-flex asowp-flex-col asowp-items-center w-2/3 justify-end">
                        <div v-if="!configDoublePart.active && configData.images.value.length > 0">
                            <div v-for="(image, id) in configData.images.value" class="asowp-flex asowp-space-x-1 asowp-full-center">
                                <span :class="`asowp-h-fit asowp-w-fit asowp-p-[1px] asowp-border asowp-border-[${configColors.backgroundColorHeader}]`">
                                    <img :src="image.url" :class="`asowp-h-[40px] asowp-w-[40px] asowp-flex`" />
                                </span>
                                <span>
                                    <p>{{image.values.width.value}} {{configSettings.customizerSign.customizerOptions.measurementUnit}} x {{image.values.height.value}} {{configSettings.customizerSign.customizerOptions.measurementUnit}}</p>
                                </span>
                            </div>
                        </div>

                        <div v-if="configDoublePart.active">
                            <div v-if="configData.images.value.face1.length > 0">
                                <span v-if="configDoublePart.active"  class="asowp-font-medium">{{configDoublePart.part1}}: </span>
                                <div v-for="(image, id) in configData.images.value.face1" class="asowp-flex asowp-space-x-1 asowp-full-center">                              
                                    <span :class="`asowp-h-fit asowp-w-fit asowp-p-[1px] asowp-border asowp-border-[${configColors.backgroundColorHeader}]`">
                                        <img :src="image.url" :class="`asowp-h-[40px] asowp-w-[40px] asowp-flex`" />
                                    </span>
                                    <span>
                                        <p>{{image.values.width.value}} {{configSettings.customizerSign.customizerOptions.measurementUnit}} x {{image.values.height.value}} {{configSettings.customizerSign.customizerOptions.measurementUnit}}</p>
                                        <!-- <p>top: {{image.top}}</p>
                                        <p>bottom: {{image.bottom}}</p>
                                        <p>left: {{image.left}}</p>
                                        <p>right: {{image.right}}</p> -->
                                    </span>
                                </div>
                            </div>

                            <div v-if="configDoublePart.active && configData.images.value.face2.length > 0">
                                <span class="asowp-font-medium">{{configDoublePart.part2}}: </span>
                                <div v-for="(image, id) in configData.images.value.face2" class="asowp-flex asowp-space-x-1 asowp-full-center">
                                    <span :class="`asowp-h-fit asowp-w-fit asowp-p-[1px] asowp-border asowp-border-[${configColors.backgroundColorHeader}]`">
                                        <img :src="image.url" :class="`asowp-h-[40px] asowp-w-[40px] asowp-flex`" />
                                    </span>
                                    <span>
                                        <p>{{image.values.width.value}} {{configSettings.customizerSign.customizerOptions.measurementUnit}} x {{image.values.height.value}} {{configSettings.customizerSign.customizerOptions.measurementUnit.value}}</p>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div v-if="customAdditionalValues != [] " :class="`asowp-flex asowp-items-center asowp-justify-between asowp-px-4 asowp-py-3 asowp-border-b-2 asowp-border-[${configColors.recaps.optionBorderColor}] hover:asowp-bg-[${configColors.recaps.optionHoverBackgroundColor}] hover:asowp-text-[${configColors.recaps.optionHoverTextColor}] hover:asowp-bg-[${configColors.recaps.optionHoverBorderColor}] asowp-base-animation`" v-for="(option, index) in customAdditionalValues">
                    <p :class="`asowp-text-[16px] asowp-font-semibold`">{{option.label}}</p>
                    <p :class="`asowp-text-[14px] lowercase first-letter:uppercase`">{{ option.value }}</p>
                </div>
            </div>

            <div class="asowp-h-[15%] asowp-flex asowp-flex-col asowp-text-[16px] asowp-leading-normal">
                <div :class="`asowp-h-[40%] asowp-flex asowp-text-center asowp-justify-center asowp-items-center asowp-text-[${configColors.recaps.optionTextColor}] asowp-bg-transparent asowp-text-xl asowp-font-bold`">{{formatPrice(finalPrices)}} </div>
                
                <div class="asowp-flex asowp-h-[60%]">
                    <button :disabled="isAddingToCart" @click="() => finish = false" :class="`asowp-w-1/2 asowp-h-full asowp-bg-[${configColors.recaps.buttonEditBackgroundColor}] hover:asowp-bg-[${configColors.recaps.buttonEditHoverBackgroundColor}] asowp-text-[${configColors.recaps.buttonEditTextColor}] hover:asowp-text-[${configColors.recaps.buttonEditHoverTextColor}] asowp-flex asowp-full-center asowp-buttons-rad-none asowp-base-animation asowp-cursor-pointer`" >
                        {{ configVisualiserTexts.textCanvasEdit && configVisualiserTexts.textCanvasEdit.trim() !== '' ? configVisualiserTexts.textCanvasEdit : 'Finish' }}
                    </button>
                    <button v-if="route.name != 'template-maker'" :disabled="isAddingToCart" @click="addToCart" :class="`asowp-w-1/2 asowp-h-full asowp-bg-[${configColors.recaps.buttonAddToCartBackgroundColor}] hover:asowp-bg-[${configColors.recaps.buttonAddToCartHoverBackgroundColor}] asowp-text-[${configColors.recaps.buttonAddToCartTextColor}] hover:asowp-text-[${configColors.recaps.buttonAddToCartHoverTextColor}] asowp-flex asowp-full-center asowp-buttons-rad-none asowp-base-animation asowp-cursor-pointer`" >
                        <img src="../../../../../assets/icons/ic_loading_gray.svg" class="asowp-w-5 asowp-w-5" v-if="isAddingToCart"/>
                        {{ configVisualiserTexts.textAddToCart && configVisualiserTexts.textAddToCart.trim() !== '' ? configVisualiserTexts.textAddToCart : 'Finish' }}
                    </button>
                    <button v-if="route.name == 'template-maker'" :disabled="isSavingTemplate" @click="saveTemplate" :class="`asowp-w-1/2 asowp-h-full asowp-bg-[${configColors.recaps.buttonAddToCartBackgroundColor}] hover:asowp-bg-[${configColors.recaps.buttonAddToCartHoverBackgroundColor}] asowp-text-[${configColors.recaps.buttonAddToCartTextColor}] hover:asowp-text-[${configColors.recaps.buttonAddToCartHoverTextColor}] asowp-flex asowp-full-center asowp-buttons-rad-none asowp-base-animation asowp-cursor-pointer`" >
                        <img src="../../../../../assets/icons/ic_loading_gray.svg" class="asowp-w-5 asowp-w-5" v-if="isSavingTemplate"/>
                        Save
                    </button>
                </div>
            </div>
        </div>

        <div v-if="resetAllBool" :class="`asowp-absolute asowp-z-20 asowp-top-0 asowp-bg-[${configColors.bars.reset.modalBackgroundColor}]/70 aso asowp-w-full asowp-h-full asowp-flex asowp-full-center`">
            <div :class="`asowp-w-[80%] lg:asowp-w-[40%] asowp-h-[40%] asowp-bg-[${configColors.bars.reset.modalContainerBackground}] asowp-text-[${configColors.bars.reset.modalTextColor}] asowp-p-2 asowp-shadow-2xl`">
                <div class="asowp-h-[70%] asowp-flex asowp-full-center asowp-font-medium asowp-text-lg">
                    {{ configVisualiserTexts.resetModalText && configVisualiserTexts.resetModalText.trim() !== '' ? configVisualiserTexts.resetModalText : 'Reset all for real ??' }}
                </div>
                <div class="asowp-h-[30%] asowp-flex asowp-items-center asowp-justify-between">
                    <div @click="clearAll" :class="`asowp-bg-[${configColors.bars.reset.modalYesButtonBackgroundColor}] asowp-text-[${configColors.bars.reset.modalYesButtonTextColor}] asowp-px-6 asowp-p-2 asowp-rounded-md asowp-cursor-pointer asowp-base-animation`">
                        {{ configVisualiserTexts.resetModalYes && configVisualiserTexts.resetModalYes.trim() !== '' ? configVisualiserTexts.resetModalYes : 'Yes' }}
                    </div>
                    <div @click="confirmResetAll(false)" :class="`asowp-bg-[${configColors.bars.reset.modalNoButtonBackgroundColor}] asowp-text-[${configColors.bars.reset.modalNoButtonTextColor}] hover:asowp-text-white/80 asowp-px-6 asowp-p-2 asowp-rounded-md asowp-cursor-pointer asowp-base-animation`">
                        {{ configVisualiserTexts.resetModalNo && configVisualiserTexts.resetModalNo.trim() !== '' ? configVisualiserTexts.resetModalNo : 'No' }}
                    </div>
                </div>
            </div>
        </div>


    </div>
</template>

<script setup>
    import { ref, onMounted, defineProps } from 'vue';
    import {getSignInfos, handleCheckTemplate, handleReadyToSaveState, 
        handleGetCanvas, handleGetCurrentUnit,
        handleGetDefaultText,
        handleGetTextType,
        handleUndo,
        handleRedo,
        handleClearAll,
        handleGetObjectByName,
        handleGetSignPosition,
        handleChangeSize,
        handleChangeThickness,
        handleDeleteObject,
        handleCloneObject,
        handleCenterVertically,
        handleCenterHorizontally,
        handlechangeBorderColor,
        handleGetBorderData,
        handleSelectBorder,
        handleGetBorderRestart,
        handleChangeSignColor,
        handleGetShape,
        handleSelectShape,
        handleGetActiveFixing,
        handleSelectFixingMethode,
        handleGetAddedTextValues,
        handleAddTextToSign,
        handleChangeTextValue,
        handleChangeTextAlign,
        handleChangeTextWeight,
        handleChangeTextStyle,
        handleChangeTextSize,
        handleChangeTextFontFam,
        handleChangeTextColor,
        handleUnderlineText,
        handleCrossText,
        handleOverlineText,
        handleChangeTextBorder,
        handleChangeTextBorderColor,
        handleShow3dSide,
        handleChange3dSideColor,
        handleChangeTextLightColor,
        handleGetImageSettings,
        handleGetAddedImageValues,
        handleAddImageToSign,
        handleTurnImageLeft,
        handleTurnRightImage,
        handleChangeImageWidth,
        handleChangeImageHeight,
        handleFlipImage,
        handleSelectFilter,
        handleCheckActiveSignFace,
        handleCloneCanvas,
        setPattern,
        handleSetImageToSignBackground,
        handleFinishConfiguration,
        handleGetCharPrice,
        handleSetPrice,
        handleClipAddedObject,
        handleGetNewPosition,
        handleLockMoving,
        handleLockScaling,
        handleLockRotating,
        handleLockEdition,
        handleLoadTemplateData,
        handleMoveobject,
        handleChangeAddedSvgColor,
        handleSetShadow,
        handleConvertImageToDataURI,
    } from '@/frontend/utils/asowp-editor-script.js';
    import { add_to_cart, formatPrice, setScrollColor } from '@/frontend/utils/functions.js'
    import { useRoute } from "vue-router";
    import toastMessage from '@/admin/utils/functions';
    import api from "@/admin/Api/api";
    import { jsPDF } from 'jspdf';

    import opentype from 'opentype.js'
    import { load } from 'opentype.js'

    var FontFaceObserver = require('fontfaceobserver');

    const route = useRoute();
    const template_config_id = route.params.configId;
    const template_id = route.params.templateId;
    const template = ref({});

    const props = defineProps({
        config:Object,
        manage:Object,
        currency:String,
        template:Object
    });
    var configColors = ref({})
    configColors.value = props.config.data.settings.themeColors.colors


    var configSettings = ref({})
    var configDoublePart = ref({})
    var configTextSettings = ref({})

    var configTextType = ref('normal')

    var configTextFontSettings = ref({})
    var configImageSettings = ref({})
    var configImagesFormat = ref("")
    var configImageSettingsClipart = ref({})
    var configImageSettingsFilters = ref({})
    var configUnit = ref("")
    var configSectionIcons = ref({})
    var configOutputSettings = ref({})
    var configAdditionnalOptions = ref([])
    var configVisualiserTexts = ref({})

    // console.log(props.config.data)

    var isLoaded = ref(true)
    function setIsLoadedToFalse() {
        setTimeout(() => {
            isLoaded.value = false;
        }, 1000);
    };

    var div = document.getElementById('canvas-container')


    var showOption = ref(false);
    var step = ref('');
    function closeOption(){
        showOption.value = false;
        step.value = '';
        textSideHelp.value = false;
    }

    const handleDocumentClick = (e) => {
        var optionss = document.querySelector('#asowp-options-container')
        var optionButton = document.querySelector('#asowp-optionsButtons-container')
        var editButton = document.querySelector('#asowp-editObject')
        var templateButton = document.querySelector('#asowp-templateObjects-button')
        var templateOptions = document.querySelector('#asowp-templateObjects-options')

        if(window.innerWidth > 688){
            if(!optionss.contains(e.target) && !optionButton.contains(e.target) && !editButton.contains(e.target)) {
                closeOption()
                selectText.value = false;
                editImage.value = false;
            }
            // if(route.name == 'template-maker' && !templateButton.contains(e.target) && !templateOptions.contains(e.target) ){
            //     showTempSettings.value = false;
            // }
        }
    }

    var selectText = ref(false);
    var editImage = ref(false);

    var advancedComponent = ref({})
    var advancedComponentId = ref(0)
    var addComponentValue = ref({})
    var addComponentId = ref(0)
    function showOptions(option, stepValue, id){
        textSideHelp.value = false

        switch (option) {
            case 'fixing-methode':
                if(fixinggs.value.length > 0){
                    step.value = option;
                    showOption.value = true;
                }
            break;

            case 'material':
                if(props.config.data.materials.length > 0){
                    step.value = option;
                    showOption.value = true;
                }
            break;

            case "size":
                if(sizees.value.length > 0 || customSizeActive){
                    step.value = option;
                    showOption.value = true;
                }
            break;

            case "shape":
                if(shapees.value.length > 0){
                    step.value = option;
                    showOption.value = true;
                }
                
            break;

            case "border":
                if(borderrs.value.allBorders.length > 0){
                    step.value = option;
                    showOption.value = true;
                }
            break;

            case "color":
                // if(colorrs.value.allColors.length >= 0){
                // }
                step.value = option;
                showOption.value = true;
            break;

            case "text":
                // if(currentMaterialTextImages.value.enableText){
                // }
                // if((materialType == 'simple' && currentMaterialTextImages.enableText && sizees.length > 0 ) || materialType == 'advance'){
                // }
                step.value = option;
                showOption.value = true;
            break;

            case "image":
                // if(currentMaterialTextImages.value.enableImage){
                // }
                step.value = option;
                showOption.value = true;
            break;

            case "add-components":
                // if(currentMaterialTextImages.value.enableImage){
                // }
                addComponentId.value = id
                addComponentValue.value = stepValue;
                step.value = option;
                showOption.value = true;
            break;

            case "add-options":
                step.value = option;
                showOption.value = true;
            break;

            case "component":
                if(stepValue && materialType.value == 'advance'){
                    advancedComponentId.value = id
                    advancedComponent.value = stepValue;
                    step.value = option;
                    showOption.value = true;
                }
            break;
        
            default:
                break;
        }

        if(stepValue && materialType.value == 'advance'){
            advancedComponent.value = stepValue;
        }

    }

    var showHelpSection = ref(false);
    var showTempSettings = ref(false)

    var showScrollButton = ref(false)
    function verifierScrollabilite() {
        const monDiv = document.getElementById('asowp-options-buttons');
        if(monDiv){
            if (monDiv.scrollHeight > monDiv.clientHeight) {
                showScrollButton.value = true;
                // monDiv.classList.remove("asowp-justify-center");
                // monDiv.classList.add("asowp-justify-start");
            } else {
                showScrollButton.value = false;
                // monDiv.classList.remove("asowp-justify-start");
                // monDiv.classList.add("asowp-justify-center");
            }
        }
    }
    function ScrollLeft(id){
        var div = document.getElementById(id)
        if(isBelowLimit.value === true){
            div.scrollLeft -= 150 
        }else{
            div.scrollTop -= 150 
        }
    }
    function ScrollRight(id){
        var div = document.getElementById(id)
        if(isBelowLimit.value === true){
            div.scrollLeft += 150 
        }else{
            div.scrollTop += 150 
        }
    }
    setInterval(verifierScrollabilite, 500);

    var isBelowLimit = ref(false)
    function checkScreenView() {
        if(window.innerWidth < 1024){
            // isBelowLimits.value = window.innerWidth < 1024;
            isBelowLimit.value = true;
            if(window.innerWidth < 688){
                showOptions('material')
            }
        }else{
            isBelowLimit.value = false
            // firstResize((currentResizeSetting.value), 'desktop'); 
        }
    }

    var showFont = ref(false)
    function dropFontToggle(){
        showFont.value = !showFont.value;
    }

    var showSize = ref(false)
    function dropSizeToggle(){
        // console.log('drop')
        showSize.value = !showSize.value;
    }

    var showThick = ref(false)
    function dropThicknessToggle(){
        showThick.value = !showThick.value;
    }

    var showStateButtons = ref(false)

    var pickedColor = ref("aa")
    var simpleColor = ref("#000000");

    var fabric = window.fabric;

    var canvasFace1Ref = ref(null);
    var canvasFace2Ref = ref(null);
    var canvas = null
    var canvasBack = null
    var activeCanvas = null

    var defaultShadow = ref(new fabric.Shadow({
        color: 'black',
        offsetX: 3,
        offsetY: 3,
        blur: 30,
        isActive: true
    }))

    function getCanvas(canvas1, canvas2, statut){
        handleGetCanvas(canvas1, canvas2, statut)
    }

    function hideCanvasElements(){
        var objects = canvas.getObjects()
        objects.forEach(object =>{
            object.visible = false
        })
        canvas.renderAll();
    }

    function zoomCanvas(to){
        var canvasCenter = getCanvasCenter(activeCanvas)
        if (to == 'up') { // Vérifier si la touche Ctrl est enfoncée
            var delta = -111.11111405455044;
            var zoom = activeCanvas.getZoom();
            zoom *= 0.9999 ** delta;
            if (zoom > 20) zoom = 20;
            if (zoom < 0.01) zoom = 0.01;
            activeCanvas.zoomToPoint({ x: activeCanvas.getWidth()/2, y: activeCanvas.getHeight()/2 }, zoom);
        }
        if (to == 'down') { // Vérifier si la touche Ctrl est enfoncée
            var delta = 111.11111405455044;
            var zoom = activeCanvas.getZoom();
            zoom *= 0.9999 ** delta;
            if (zoom > 20) zoom = 20;
            if (zoom < 0.01) zoom = 0.01;
            activeCanvas.zoomToPoint({ x: activeCanvas.getWidth()/2, y: activeCanvas.getHeight()/2 }, zoom);
        }
    }

    var isTemplate = ref(false)
    async function selectTemplate(data, statut){
        // console.log(data)
        firstSetLoad.value = false
        handleReadyToSaveState(false);

        // console.log(data);
        //chargement du prix du template
        optionsPrices.value = data.price ? data.price.array : []
        var templatePrice = {
            name: 'none',
            price: 0
        }
        getOptionPrice(templatePrice)
        // console.log(optionsPrices.value)

        //chargement des additionnalOptions
        customAdditionalValues.value = data.additionalOptions

        function isColorOrImage(str) {
            const colorCodeRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
            if (colorCodeRegex.test(str)) {
                return 'color';
            }
            const imageUrlRegex = /\.(jpeg|jpg|gif|png)$/;
            if (imageUrlRegex.test(str)) {
                return 'image';
            }
            return 'other';
        }
        var sign = data.sign

        //selection du matériel
        var templateMaterialId = allMaterials.value.findIndex((item, index) => item.name === sign.material.name)
        currentMaterialId.value = sign.material.id
        selectMaterial(props.config.data.materials[sign.material.id], sign.material.id)
        getSignInfos({name: 'Template', width: parseFloat(sign.size.width), height: parseFloat(sign.size.height)})


        var defTextColor = (configTextSettings.value.colors.length > 0 ? configTextSettings.value.colors[0].codeHex : "#000000")
        signTextColor1.value = sign.color.face1.textColor

        let configTextColor = ""

        if(sign.color.face1.textColor.active){
            configTextColor = sign.color.face1.textColor.codeHex
        }else{
            configTextColor = defTextColor
        }


        var loadedTemplate = await handleLoadTemplateData(data.template.face1, data.template.face2, sign, statut, configTextColor)
        //selection de border
        if(sign.material.type === 'simple'){
            if(borderrs.value.allBorders.length > 0){
                borderrs.value.allBorders.forEach((borderr, id) => {
                    allBorders.value.forEach((border, index) => {
                        if(borderr.manageBorderId == index){
                            matchingBorders.value.push({border, borderr})
                        }
                    })
                })
            }
            var currentBorder1Id = matchingBorders.value.findIndex((item, index) => item.border.value === sign.border.face1.type)            
            var currentBorder = matchingBorders.value[currentBorder1Id]

            if(currentBorder != undefined){
                border1ExcludeShapes.value = currentBorder.borderr.excludeShapes
                border1ExcludeSizes.value = currentBorder.borderr.excludeSizes
        
                borderColors1.value = (borderrs.value.settings.colors.length > 0 ? borderrs.value.settings.colors : {} )
                customBorderColor1.value = borderrs.value.settings.enableBorderColor
    
                // selectBorder(currentBorder.border.value, currentBorder.borderr.settings, currentBorder.borderr.additionalPrice, currentBorder.borderr.excludeShapes, currentBorder.borderr.excludeSizes, currentBorder1Id)
                handleSelectBorder(sign.border.face1.type, sign.border.face1.codeHex)
    
                activeFace1Border.value = sign.border.face1.type;
                borderColorName1.value = sign.border.face1.color;
                activeFace1BorderColor.value = sign.border.face1.codeHex
                if(sign.border.face1.type !== 'none' && sign.border.face1.codeHex !== ('' || null)){
                    colorForBorder1.value = true
                }
                handleGetBorderData('front-face', {border: sign.border.face1.type, color: sign.border.face1.codeHex})
            }

            //verification pour la seconde face si existante
            if(sign.doubleFace === true){
                var currentBorder2Id = matchingBorders.value.findIndex((item, index) => item.border.value === sign.border.face2.type)
                var currentBorder2 = matchingBorders.value[currentBorder2Id]
                
                if(currentBorder2 != undefined){
                    border2ExcludeShapes.value = matchingBorders.value[currentBorder2Id].borderr.excludeShapes
                    border2ExcludeSizes.value = matchingBorders.value[currentBorder2Id].borderr.excludeSizes
        
                    borderColors2.value = (borderrs.value.settings.colors.length > 0 ? borderrs.value.settings.colors : {} )
                    customBorderColor2.value = borderrs.value.settings.enableBorderColor
        
                    activeFace2Border.value = sign.border.face2.type;
                    borderColorName2.value = sign.border.face2.color
                    activeFace2BorderColor.value = sign.border.face2.codeHex
    
                    borderColors2.value = (borderrs.value.settings.colors.length > 0 ? borderrs.value.settings.colors : {} )
    
                    if(sign.border.face2.type !== 'none' && sign.border.face2.codeHex !== ('' || null)){
                        colorForBorder2.value = true
                    }
                    handleGetBorderData('back-face', {border: sign.border.face2.type, color: sign.border.face2.codeHex})
                }
    
            } 
        }

        //selection de fixing methode
        if(fixinggs.value.length > 0){
            fixinggs.value.forEach((fixingg, id) => {
                allFixings.value.forEach((fixing, index) => {
                    if(fixingg.fixingMethodId == index && !fixingg.excludeSizes.includes(currentSizeId) && !fixingg.excludeShapes.includes(currentShapeId)){
                        matchingFixings.value.push({fixing, fixingg})
                    }
                })
            })
        }
        var currentFixingId = matchingFixings.value.findIndex((item, index) => item.fixing.type === sign.fixingMethod.type)
        activeFixingMethode.value = sign.fixingMethod.type
        if(sign.material.type === 'simple'){
            if(currentFixingId != -1){
                fixingExcludeSizes.value = matchingFixings.value[currentFixingId].fixingg.excludeSizes
                fixingExcludeShapes.value = matchingFixings.value[currentFixingId].fixingg.excludeShapes
                activeFixingId.value = currentFixingId
            }
        }

        
        //selection de shape
        selectedShape.value = sign.shape

        //selection des couleur de sign
        if(isColorOrImage(sign.color.face1.codeHex) === 'color'){
            activeSignColor.value = sign.color.face1.name
            activeSignColoriD.value = sign.color.face1.id
            patternActive1.value = false
            activeSignColorCode1.value = sign.color.face1.codeHex
            var pattern = {
                active: false,
                codeHex: sign.color.face1.codeHex,
                url: "",
            }
            // setSignColor(canvas, pattern, sign.color.face1.textColor, 'black')
        }else{
            activeSignColor.value = sign.color.face1.name
            activeSignColoriD.value = sign.color.face1.id
            patternActive1.value = true
            activeSignColorCode1.value = sign.color.face1.codeHex
            var pattern = {
                active: true,
                codeHex: '',
                url: sign.color.face1.codeHex,
            }
            // setSignColor(canvas, pattern, sign.color.face1.textColor, 'black')
        }
        if(sign.color.face1.textColor.active){
            signTextColor1.value = true
            colorTextColorName1.value = sign.color.face1.textColor.name
            colorTextCodeHex1.value = sign.color.face1.textColor.codeHex
        }

        if(sign.doubleFace === true){
            signTextColor2.value = sign.color.face2.textColor
            if(isColorOrImage(sign.color.face2.codeHex) === 'color'){
                activeSignFace2Color.value = sign.color.face2.name;
                activeSignFace2ColoriD.value = sign.color.face2.id;
                patternActive2.value = false
                activeSignColorCode2.value = sign.color.face2.codeHex
                var pattern = {
                    active: false,
                    codeHex: sign.color.face2.codeHex,
                    url: "",
                }
                // setSignColor(canvasBack, pattern, sign.color.face2.textColor, 'black')
            }else{
                activeSignFace2Color.value = sign.color.face2.name;
                activeSignFace2ColoriD.value = sign.color.face2.id;
                patternActive2.value = true
                activeSignColorCode2.value = sign.color.face2.codeHex
                var pattern = {
                    active: false,
                    codeHex: '',
                    url: sign.color.face2.codeHex,
                }
                // setSignColor(canvasBack, pattern, sign.color.face2.textColor, 'black')
            }

            if(sign.color.face2.textColor.active){
                signTextColor2.value = true
                colorTextColorName2.value = sign.color.face2.textColor.name
                colorTextCodeHex2.value = sign.color.face2.textColor.codeHex
            }
        }

        //selection du la size
        currentSizeName.value = String(sign.size.width + "x" + sign.size.height)
        var templateSize = {
            name: 'Template',
            width: sign.size.width,
            height: sign.size.height,
            maxChars: sign.size.maxChars
        }
        currentSizeData.value = templateSize
        currentSizeValues.value = loadedTemplate.size
        maxTextCharForSize.value = sign.size.maxChars
        //selection du thickness
        if(sign.size.thickness.active){
            currentSizeThickness.value = true
            var thick = sign.size.thickness.value
            currentThickValue.value = thick
        }else{
            currentSizeThickness.value = false
            currentThickValue.value = 0
        }

        if(sign.size.setting){
            currentSizeSetting.value = sign.size.setting
            handleGetCharPrice(sign.size.setting.charPrice, sign.size.setting.startPriceAtChar, templateSize.maxChars)
        }

        if(sign.material.type == 'advance'){
            advancedComponent.value = sign.material.advanceComponent.component

            activeSignModel.value = sign.material.advanceComponent.option.data
            activeSignModelName.value = sign.material.advanceComponent.option.data.name
            activeSignModelId.value = sign.material.advanceComponent.option.id

            fixinggs.value = sign.material.advanceComponent.option.data.fixingMethods
            handleSelectFixingMethode(sign.fixingMethod.type)
        }

        //recupération des texts du template
        addedTexts.value = loadedTemplate.texts

        //recupération des images du template
        usedImages.value = loadedTemplate.images
        // console.log(loadedTemplate.images, "loadedTemplate.images")

        textsPrices.value = handleSetPrice()
        getOptionPrice()
        
        if(!firstSetLoad.value){
            saveStep("select of first values")
        }
        handleReadyToSaveState(true, true)
        firstSetLoad.value = true

        // simulateCanvasClick()
    }

    var matchingFixings = ref([])
    var matchingBorders = ref([])
    var firstSetLoad = ref(false)
    function selectSimpleFirstValue() {
        handleReadyToSaveState(false);
        firstSetLoad.value = false;
        finalPrices.value = 0
        optionsPrices.value = []

        firstBorderCheck.value = true;
        firstBorderColorCheck.value = true;
        firstColorCheck.value = true;



        //recuperation des données por le chargement 
        var stopSize = false
        if(sizees.value.length >0){
            var index = 0
            var haveDefault = false
            while (index < sizees.value.length && !haveDefault) {
                if(sizees.value[index].isDefault){
                    var sizeData = {
                        label: sizees.value[index].label,
                        width: sizees.value[index].width,
                        height: sizees.value[index].height,
                        // thickness: (sizees.value[index].thickness.active ? sizees.value[index].thickness : {active: false, value: 0}),
                    };
                    var settings = {
                        textNumber: sizees.value[index].textNumber, 
                        charPrice: sizees.value[index].charPrice,
                        basePrice: sizees.value[index].basePrice,
                        maxTextChar: sizees.value[index].maxTextChar,
                        startPriceAtChar: sizees.value[index].startPriceAtChar,
                    }
                    haveDefault = true
                    getSignInfos(sizeData)
                    currentSizeId.value = index
                    break;
                }
                index++;
            }
            if(!haveDefault){
                var sizeData = {
                    label: sizees.value[0].label,
                    width: sizees.value[0].width,
                    height: sizees.value[0].height,
                    // thickness: (sizees.value[0].thickness.active ? sizees.value[0].thickness : {active: false, value: 0}),
                };
                var settings = {
                    textNumber: sizees.value[0].textNumber, 
                    charPrice: sizees.value[0].charPrice,
                    basePrice: sizees.value[0].basePrice,
                    maxTextChar: sizees.value[0].maxTextChar,
                    startPriceAtChar: sizees.value[0].startPriceAtChar,
                }
                getSignInfos(sizeData)
                currentSizeId.value = 0
            }
        }else{
            var size ={
                width: 0,
                height: 0
            }
            changeSize(size)
        }
        if(shapees.value.length >0){
            var matchingShapes = []
            shapees.value.forEach((shapee, id) => {
                allShapes.value.forEach((shape, index) => {
                    if(shapee.shapeId == index){
                        matchingShapes.push({shape, shapee})
                    }
                })
            })
            let index = 0
            var haveDefault = false
            while (index < matchingShapes.length && !haveDefault) {
                if(matchingShapes[index].shapee.isDefault){
                    handleGetShape(matchingShapes[index].shape.value)
                    haveDefault = true
                    break;
                }
                index++;
            }
            if(!haveDefault){
                handleGetShape(matchingShapes[0].shape.value)
            }
        }else{
            handleGetShape('square')
        }

        var stopColor = false
        if(colorrs.value.allColors.length > 0){
            var index = 0
            var haveDefault = false
            while (index < colorrs.value.allColors.length && !haveDefault) {
                if(colorrs.value.allColors[index].isDefault){
                    if(colorrs.value.allColors[index].active){
                        patternActive1.value = true
                        patternActive2.value = true
                        activeSignColorCode1.value = colorrs.value.allColors[index].url
                        activeSignColorCode2.value = colorrs.value.allColors[index].url
                    }else{
                        patternActive1.value = false
                        patternActive2.value = false
                        activeSignColorCode1.value = colorrs.value.allColors[index].codeHex
                        activeSignColorCode2.value = colorrs.value.allColors[index].codeHex
                    }
                    if(colorrs.value.allColors[index].active){
                        colorTextColorName1.value = colorrs.value.allColors[index].name
                        colorTextColorName2.value = colorrs.value.allColors[index].name
                        
                        colorTextCodeHex1.value = colorrs.value.allColors[index].codeHex
                        colorTextCodeHex2.value = colorrs.value.allColors[index].codeHex
                        if(colorrs.value.allColors[index].sameForBorder){
                            colorForBorder1.value = false
                            colorForBorder2.value = false
                        }else{
                            colorForBorder1.value = true
                            colorForBorder2.value = true
                        }
                    }else{
                        colorTextColorName1.value = ''
                        colorTextColorName2.value = ''

                        colorTextCodeHex1.value = ''
                        colorTextCodeHex1.value = ''

                        colorForBorder1.value = true
                        colorForBorder2.value = true
                    }
                    haveDefault = true
                    break;
                }
                index++;
            }
            if(!haveDefault){
                if(colorrs.value.allColors[0].active){
                    patternActive1.value = true
                    patternActive2.value = true
                    activeSignColorCode1.value = colorrs.value.allColors[0].url
                    activeSignColorCode2.value = colorrs.value.allColors[0].url
                }else{
                    patternActive1.value = false
                    patternActive2.value = false
                    activeSignColorCode1.value = colorrs.value.allColors[0].codeHex
                    activeSignColorCode2.value = colorrs.value.allColors[0].codeHex
                }
                if(colorrs.value.allColors[index].active){
                    colorTextColorName1.value = colorrs.value.allColors[0].name
                    colorTextColorName2.value = colorrs.value.allColors[0].name
                    
                    colorTextCodeHex1.value = colorrs.value.allColors[0].codeHex
                    colorTextCodeHex2.value = colorrs.value.allColors[0].codeHex
                    if(colorrs.value.allColors[0].sameForBorder){
                        colorForBorder1.value = false
                        colorForBorder2.value = false
                    }else{
                        colorForBorder1.value = true
                        colorForBorder2.value = true
                    }
                }else{
                    colorTextColorName1.value = ''
                    colorTextColorName2.value = ''

                    colorTextCodeHex1.value = ''
                    colorTextCodeHex1.value = ''

                    colorForBorder1.value = true
                    colorForBorder2.value = true
                }
            }
        }else{
            // changeSignColor(color, colorr)
            colorForBorder1.value = true
            colorForBorder2.value = true
        }

        var stopBorder = false
        matchingBorders.value = []
        if(borderrs.value.allBorders.length > 0){
            borderrs.value.allBorders.forEach((borderr, id) => {
                allBorders.value.forEach((border, index) => {
                    if(borderr.manageBorderId == index){
                        matchingBorders.value.push({border, borderr})
                    }
                })
            })
            let index = 0
            var haveDefault = false
            while (index < matchingBorders.value.length && !haveDefault) {
                if(matchingBorders.value[index].borderr.isDefault){
                    // console.log(matchingBorders[index].borderr, "Default")
                    selectBorder(matchingBorders.value[index].border.value, matchingBorders.value[index].borderr.settings, matchingBorders.value[index].borderr.additionalPrice, matchingBorders.value[index].borderr.excludeShapes, matchingBorders.value[index].borderr.excludeSizes, index, true)
                    haveDefault = true
                    break;
                }
                index++;
            }
            if(!haveDefault){
                // console.log("first")
                selectBorder(matchingBorders.value[0].border.value, matchingBorders.value[0].borderr.settings, matchingBorders.value[0].borderr.additionalPrice, matchingBorders.value[0].borderr.excludeShapes, matchingBorders.value[0].borderr.excludeSizes, 0, true)
            }
        }else{
        }

        var stopColor = false
        if(colorrs.value.allColors.length > 0){
            var index = 0
            var haveDefault = false
            while (index < colorrs.value.allColors.length && !haveDefault) {
                if(colorrs.value.allColors[index].isDefault){
                    // console.log(colorrs.value.allColors[index], "default")
                    changeSignColor(index, colorrs.value.allColors[index].name, colorrs.value.allColors[index].pattern, colorrs.value.allColors[index].textColor, colorrs.value.allColors[index].additionalPrice, true )
                    haveDefault = true
                    break;
                }
                index++;
            }
            if(!haveDefault){
                changeSignColor(0, colorrs.value.allColors[0].name, colorrs.value.allColors[0].pattern, colorrs.value.allColors[0].textColor, colorrs.value.allColors[0].additionalPrice, true )
            }
        }else{
            // changeSignColor(color, colorr)
        }

        // selectedShape.value = shapes.value[0].name
        // handleGetShape(shapes.value[0].name)
        var stopShape = false
        var matchingShapes = []
        if(shapees.value.length >0){
            shapees.value.forEach((shapee, id) => {
                allShapes.value.forEach((shape, index) => {
                    if(shapee.shapeId == index){
                        matchingShapes.push({shape, shapee})
                        // console.log(id, "shapee.shape")
                    }
                })
            })
            let index = 0
            var haveDefault = false
            while (index < matchingShapes.length && !haveDefault) {
                if(matchingShapes[index].shapee.isDefault){
                    selectedShape.value = matchingShapes[index].shape.value
                    currentShapeId.value = index
                    handleGetShape(matchingShapes[index].shape.value)
                    var shapePriceObject = {
                        name: "shape",
                        price: matchingShapes[index].shapee.additionalPrice
                    }
                    getOptionPrice(shapePriceObject)
                    haveDefault = true
                    break;
                }
                index++;
            }
            if(!haveDefault){
                // console.log("first", matchingShapes[0])
                selectedShape.value = matchingShapes[0].shape.value
                currentShapeId.value = 0
                handleGetShape(matchingShapes[0].shape.value)
                var shapePriceObject = {
                    name: "shape",
                    price: matchingShapes[0].shapee.additionalPrice
                }
                getOptionPrice(shapePriceObject)
            }
        }else{
            selectedShape.value = 'square'
            handleGetShape('square')
        }

        var stopFixing = false
        matchingFixings.value = []
        if(fixinggs.value.length > 0){
            fixinggs.value.forEach((fixingg, id) => {
                allFixings.value.forEach((fixing, index) => {
                    if(fixingg.fixingMethodId == index && !fixingg.excludeSizes.includes(currentSizeId) && !fixingg.excludeShapes.includes(currentShapeId)){
                        matchingFixings.value.push({fixing, fixingg})
                    }
                })
            })
            let index = 0
            var haveDefault = false
            while (index < matchingFixings.value.length && !haveDefault) {
                if(matchingFixings.value[index].fixingg.isDefault){
                    handleGetActiveFixing(matchingFixings.value[index].fixing.type)
                    activeFixingMethode.value = matchingFixings.value[index].fixing.type
                    fixingExcludeSizes.value = matchingFixings.value[index].fixingg.excludeSizes
                    fixingExcludeShapes.value = matchingFixings.value[index].fixingg.excludeShapes
                    activeFixingId.value = index

                    var fixingPrice = matchingFixings.value[index].fixingg.additionalPrice
                    var fixingPriceObject = {
                        name: "fixing",
                        price: fixingPrice
                    }
                    getOptionPrice(fixingPriceObject)

                    haveDefault = true
                    break;
                }
                index++;
            }
            if(!haveDefault){
                handleGetActiveFixing(matchingFixings.value[0].fixing.type)
                activeFixingMethode.value = matchingFixings.value[0].fixing.type
                fixingExcludeSizes.value = matchingFixings.value[0].fixingg.excludeSizes
                fixingExcludeShapes.value = matchingFixings.value[0].fixingg.excludeShapes
                activeFixingId.value = 0

                var fixingPrice = matchingFixings.value[0].fixingg.additionalPrice
                var fixingPriceObject = {
                    name: "fixing",
                    price: fixingPrice
                }
                getOptionPrice(fixingPriceObject)

            }
        }else{
            selectFixingMethode('none')
        }

        var stopSize = false
        var matchingSizes = []
        if(sizees.value.length >0){
            var index = 0
            var haveDefault = false
            while (index < sizees.value.length && !haveDefault) {
                if(sizees.value[index].isDefault){
                    var sizeData = {
                        label: sizees.value[index].label,
                        width: sizees.value[index].width,
                        height: sizees.value[index].height,
                        // thickness: (sizees.value[index].thickness.active ? sizees.value[index].thickness : {active: false, value: 0}),
                    };
                    var settings = {
                        textNumber: sizees.value[index].textNumber, 
                        charPrice: sizees.value[index].charPrice,
                        basePrice: sizees.value[index].basePrice,
                        maxTextChar: sizees.value[index].maxTextChar,
                        startPriceAtChar: sizees.value[index].startPriceAtChar,
                    }
                    changeSize(sizeData, settings, index); 
                    haveDefault = true
                    break;
                }
                index++;
            }
            if(!haveDefault){
                var sizeData = {
                    label: sizees.value[0].label,
                    width: sizees.value[0].width,
                    height: sizees.value[0].height,
                    // thickness: (sizees.value[0].thickness.active ? sizees.value[0].thickness : {active: false, value: 0}),
                };
                var settings = {
                    textNumber: sizees.value[0].textNumber, 
                    charPrice: sizees.value[0].charPrice,
                    basePrice: sizees.value[0].basePrice,
                    maxTextChar: sizees.value[0].maxTextChar,
                    startPriceAtChar: sizees.value[0].startPriceAtChar,
                }
                changeSize(sizeData, settings, 0); 
            }
        }else{
            var size ={
                width: 0,
                height: 0
            }
            changeSize(size)
            if(!customSizeActive.value){
                hideCanvasElements()
            }
        }

        if(additionalComponents.value.length > 0){
            additionalComponents.value.forEach(addOption => {
                let index = 0
                var haveDefault = false

                if(addOption.options.length > 0){
                    while (index < addOption.options.length && !haveDefault) {
                        if(addOption.options[index].isDefault){
                            selectAddComponent(addOption.title, addOption.options[index].title, addOption.options[index].additionalPrice)
                            haveDefault = true
                            break;
                        }
                        index++;
                    }
                    if(!haveDefault){
                        selectAddComponent(addOption.title, addOption.options[0].title, addOption.options[0].additionalPrice)
                    }
                }
            })
        }
        selectAdditionnalsOption()

        if(!firstSetLoad.value){
            saveStep("select of first values")
        }
        handleReadyToSaveState(true, true)
        firstSetLoad.value = true
    }
    function selectAdvanceFirstValue(){
        handleReadyToSaveState(false);
        finalPrices.value = 0

        var stop = false
        var stopDefOption = false
        var stopOption = false

        if(currentMaterial.value.data.length > 0){
            currentMaterial.value.data.forEach(component => {
                if(!stop){
                    advancedComponent.value = component
                    stop = true
                }
            })
            if(advancedComponent.value.options.length > 0){
                advancedComponent.value.options.forEach( (option, index) => {
                    if(!stopDefOption){
                        if(option.isDefault){
                            // console.log('default')
                            selectSignModel(option, index)
                            stopDefOption = true
                        }
                        if(!option.isDefault && stopDefOption && !stopOption){
                            // console.log('first')
                            selectSignModel(option, index)
                            stopDefOption = true
                            stopOption = true
                        }
                    }
                })
            }else{
                hideCanvasElements()
            }
        }else{
            hideCanvasElements()
        }
        selectAdditionnalsOption()
    }
    function selectAdditionnalsOption(){
        //selection des premières custom AdditionnalOptions 
        if(configAdditionnalOptions.value.length != 0){
            var customOptions = configAdditionnalOptions.value
            customOptions.forEach((option, indexx) => {
                switch(option.type){
                    case 'yes/no':
                        if(option.default === 'yes'){
                            addToOrUpdateArray(customAdditionalValues.value, indexx, option.label, option.inputs.yes, option.price)
                        }else{
                            addToOrUpdateArray(customAdditionalValues.value, indexx, option.label, option.inputs.no, {type: 'none', value: 0})
                        }
                    break;
                    case 'image-input':
                        addToOrUpdateArray(customAdditionalValues.value, indexx, option.label, option.options[0].value, option.options[0].price);
                        selectOption(option.options[0].value, option.options[0].price, indexx)
                    break;
                    case 'dropdown':
                        dropdownValue.value = option.options[0] 
                        addToOrUpdateArray(customAdditionalValues.value, indexx, option.label, option.options[0].value, option.options[0].price);
                        dropdownExampleImg.value = option.options[0].popImg
                        selectOption(option.options[0].value, option.options[0].price, indexx);
                        // dropdownExampleImg.value = option.options[0].popupImg;
                        dropdownIndex.value = indexx
                        // console.log(dropdownExampleImg.value, "Dropdown example", dropdownIndex.value);
                    break;
                }
            });

        }
    }


    function undo() {
        // console.log(stepArray.value.currentStateIndex , "Undo")
        if(stepArray.value.currentStateIndex > 0){
            var options = handleUndo()
            // console.log(options, "Added")
            previousStep()
            addedTexts.value = options.texts
            usedImages.value = options.images
        //     centerSign(canvas)
        // centerSign(canvasBack)
        //         handleReadyToSaveState(false);
        // currentSizeValues.value = handleChangeSize(currentSizeData.value.width, currentSizeData.value.height, currentSizeData.value.name, currentSizeSetting.value.maxTextChar)
        // handleReadyToSaveState(true);

        }
        
    }
    function redo() {
        var options = handleRedo()
        nextStep()
        addedTexts.value = options.texts
        usedImages.value = options.images
        // centerSign(canvas)
        // centerSign(canvasBack)
        //         handleReadyToSaveState(false);
        // currentSizeValues.value = handleChangeSize(currentSizeData.value.width, currentSizeData.value.height, currentSizeData.value.name, currentSizeSetting.value.maxTextChar)
        // handleReadyToSaveState(true);
    }
    var resetAllBool = ref(false)
    function confirmResetAll(value){
        resetAllBool.value = value
    }
    function clearAll() {
        handleClearAll()
        clearStep()

        resetAllBool.value = false
    }

    var stepArray = ref({
        states: [],
        currentStateIndex: -1,
        undoStatus: false,
        redoStatus: false,
        undoFinishedStatus: 1,
        redoFinishedStatus: 1,
    })
    function saveStep(position){
        // console.log(position)
        var step = {
            material: {
                name: currentMaterial.value,
                type: materialType.value,
                values: selectedMaterial.value,
                textImage: currentMaterialTextImages.value,
            },
            size: {
                name: currentSizeName.value,
                data: currentSizeData.value,
                values: currentSizeValues.value,
                settings: currentSizeSetting.value,
            },
            shape: selectedShape.value,
            fixingMethod: {
                value: activeFixingMethode.value,
                excludeShapes: fixingExcludeShapes.value,
                excludeSizes: fixingExcludeSizes.value,
            },
            color: {
                textColor: {
                    face1: signTextColor1.value,
                    face2: signTextColor2.value
                },
                colorsObject: colorrs.value,

                face1: {
                    name: activeSignColor.value,
                    codeHex: activeSignColorCode1.value,
                    pattern: patternActive1.value
                },
                face2: {
                    name: activeSignFace2Color.value,
                    codeHex : activeSignColorCode2.value,
                    pattern: patternActive2.value
                },

                firstColorCheck: firstColorCheck.value,
            },
            border: {
                face1: {
                    type: activeFace1Border.value,
                    colorForBorder: colorForBorder1.value,
                    color: activeFace1BorderColor.value,

                    excludeShapes: border1ExcludeShapes.value,
                    excludeSizes: border1ExcludeSizes.value
                },
                face2: {
                    type: activeFace2Border.value,
                    colorForBorder: colorForBorder2.value,
                    color: activeFace2BorderColor.value,

                    excludeShapes: border2ExcludeShapes.value,
                    excludeSizes: border2ExcludeSizes.value
                },
            },
            texts: [...addedTexts.value],
            images: [...usedImages.value],
            price: finalPrices.value,
        }
        // console.log(usedImages.value, "usedImages")
        if(stepArray.value.currentStateIndex < stepArray.value.states.length-1){
            var indexToBeInserted = stepArray.value.currentStateIndex+1;
            stepArray.value.states[indexToBeInserted] = step;
            var numberOfElementsToRetain = indexToBeInserted+1;
            stepArray.value.states = stepArray.value.states.splice(0,numberOfElementsToRetain);
        }else{
            stepArray.value.states.push(step);
        }
        stepArray.value.currentStateIndex = stepArray.value.states.length-1;
        if((stepArray.value.currentStateIndex == stepArray.value.states.length-1) && stepArray.value.currentStateIndex != -1){
            // stepArray.value.redoButton.disabled= "disabled";
        }

        // console.log(stepArray.value.states.length, "states INDEX")
        // console.log(stepArray.value.currentStateIndex, "state index")
    }
    function previousStep(){
        handleReadyToSaveState(false);

        if(stepArray.value.undoFinishedStatus){
            if(stepArray.value.currentStateIndex == -1){
                stepArray.value.undoStatus = false;
            }
            else{
                if (stepArray.value.states.length >= 1) {
                    stepArray.value.undoFinishedStatus = 0;
                    if(stepArray.value.currentStateIndex != 0){
                        stepArray.value.undoStatus = true;
    
                        var currentStep = stepArray.value.states[stepArray.value.currentStateIndex-1]
                        // console.log(stepArray.value.states[stepArray.value.currentStateIndex-1].images, "all states")
                        currentMaterial.value = currentStep.material.name
                        materialType.value = currentStep.material.type
                        selectedMaterial.value = currentStep.material.values
                        currentMaterialTextImages.value = currentStep.material.textImage

                        selectedShape.value = currentStep.shape
                        handleGetShape(selectedShape.value)

                        activeFixingMethode.value = currentStep.fixingMethod.value
                        fixingExcludeShapes.value = currentStep.fixingMethod.excludeShapes
                        fixingExcludeSizes.value = currentStep.fixingMethod.excludeSizes
                        handleSelectFixingMethode(activeFixingMethode.value)

                        currentSizeName.value = currentStep.size.name
                        currentSizeData.value = currentStep.size.data
                        currentSizeValues.value = currentStep.size.values
                        // handleChangeSize(currentSizeData.value.width, currentSizeData.value.height, currentSizeName.value, currentSizeValues.value.maxTextChar)
                        
                        signTextColor1.value = currentStep.color.textColor.face1
                        signTextColor2.value = currentStep.color.textColor.face2
                        colorrs.value = currentStep.color.colorsObject
                        activeSignColor.value = currentStep.color.face1.name
                        activeSignColorCode1.value = currentStep.color.face1.codeHex
                        patternActive1.value = currentStep.color.face1.pattern
                        activeSignFace2Color.value = currentStep.color.face2.name
                        activeSignColorCode2.value = currentStep.color.face2.codeHex
                        patternActive2.value = currentStep.color.face2.pattern

                        firstColorCheck.value = currentStep.color.firstColorCheck

                        if(materialType.value === 'advance'){
                            setImageToSignBackground(activeSignColorCode1.value, activeSignColor.value)
                        }else{
                            if(activeFace.value === 'front-face' && patternActive1.value){
                                setPattern(canvas, activeSignColorCode1.value)
                            }
                            if(activeFace.value === 'back-face' && patternActive2.value){
                                setPattern(canvasBack, activeSignColorCode2.value)
                            }
                        }
    
                        activeFace1Border.value = currentStep.border.face1.type
                        activeFace1BorderColor.value = currentStep.border.face1.color
                        border1ExcludeShapes.value = currentStep.border.face1.excludeShapes
                        border1ExcludeSizes.value = currentStep.border.face1.excludeSizes
    
                        activeFace2Border.value = currentStep.border.face2.type
                        activeFace2BorderColor.value = currentStep.border.face2.color
                        border2ExcludeShapes.value = currentStep.border.face2.excludeShapes
                        border2ExcludeSizes.value = currentStep.border.face2.excludeSizes
    
                        // if(materialType.value === 'simple'){
                        //     if(signTextColor1.value.active && signTextColor1.value.sameForBorder){

                        //     }else{
                        //         if(activeFace.value === 'front-face'){
                        //             handleSelectBorder(activeFace1Border.value)
                        //             if(activeFace1Border.value !== 'none'){
                        //                 handlechangeBorderColor(activeFace1BorderColor.value)
                        //             }
                        //         }else{
                        //             handleSelectBorder(activeFace2Border.value)
                        //             if(activeFace2Border.value !== 'none'){
                        //                 handlechangeBorderColor(activeFace2BorderColor.value)
                        //             }
                        //         }
                        //     }
                        // }
    
                        finalPrices.value = currentStep.price
    
                        stepArray.value.undoStatus = false;
                        stepArray.value.currentStateIndex -= 1;
                        // stepArray.value.undoButton.removeAttribute("disabled");
                        if(stepArray.value.currentStateIndex !== stepArray.value.states.length-1){
                            // stepArray.value.redoButton.removeAttribute('disabled');
                        }
                        stepArray.value.undoFinishedStatus = 1;
                    }
                    else if(stepArray.value.currentStateIndex == 0){
                        var currentStep = stepArray.value.states[0]

                        currentMaterial.value = currentStep.material.name
                        materialType.value = currentStep.material.type
                        selectedMaterial.value = currentStep.material.values
                        currentMaterialTextImages.value = currentStep.material.textImage

                        selectedShape.value = currentStep.shape
                        handleGetShape(selectedShape.value)

                        activeFixingMethode.value = currentStep.fixingMethod.value
                        fixingExcludeShapes.value = currentStep.fixingMethod.excludeShapes
                        fixingExcludeSizes.value = currentStep.fixingMethod.excludeSizes
                        handleSelectFixingMethode(activeFixingMethode.value)

                        currentSizeName.value = currentStep.size.name
                        currentSizeData.value = currentStep.size.data
                        currentSizeValues.value = currentStep.size.values
                        // handleChangeSize(currentSizeData.value.width, currentSizeData.value.height, currentSizeName.value, currentSizeValues.value.maxTextChar)
                        
                        signTextColor1.value = currentStep.color.textColor.face1
                        signTextColor2.value = currentStep.color.textColor.face2
                        colorrs.value = currentStep.color.colorsObject
                        activeSignColor.value = currentStep.color.face1.name
                        activeSignColorCode1.value = currentStep.color.face1.codeHex
                        patternActive1.value = currentStep.color.face1.pattern
                        activeSignFace2Color.value = currentStep.color.face2.name
                        activeSignColorCode2.value = currentStep.color.face2.codeHex
                        patternActive2.value = currentStep.color.face2.pattern

                        firstColorCheck.value = currentStep.color.firstColorCheck

                        if(materialType.value === 'advance'){
                            setImageToSignBackground(activeSignColorCode1.value, activeSignColor.value)
                        }else{
                            if(activeFace.value === 'front-face' && patternActive1.value){
                                setPattern(canvas, activeSignColorCode1.value)
                            }
                            if(activeFace.value === 'back-face' && patternActive2.value){
                                setPattern(canvasBack, activeSignColorCode2.value)
                            }
                        }
    
                        activeFace1Border.value = currentStep.border.face1.type
                        activeFace1BorderColor.value = currentStep.border.face1.color
                        border1ExcludeShapes.value = currentStep.border.face1.excludeShapes
                        border1ExcludeSizes.value = currentStep.border.face1.excludeSizes
    
                        activeFace2Border.value = currentStep.border.face2.type
                        activeFace2BorderColor.value = currentStep.border.face2.color
                        border2ExcludeShapes.value = currentStep.border.face2.excludeShapes
                        border2ExcludeSizes.value = currentStep.border.face2.excludeSizes
    
                        // console.log(currentStep.images, "added")
    
                        finalPrices.value = currentStep.price
    
                        stepArray.value.undoFinishedStatus = 1;
                        // stepArray.value.undoButton.disabled= "disabled";
                        // stepArray.value.redoButton.removeAttribute('disabled');
                        stepArray.value.currentStateIndex -= 1;
                    }
                }
            }
            handleReadyToSaveState(true);
        }
        simulateCanvasClick()
    }
    function nextStep(){
        handleReadyToSaveState(false);

        if(stepArray.value.redoFinishedStatus){
            if((stepArray.value.currentStateIndex == stepArray.value.states.length-1) && stepArray.value.currentStateIndex != -1){
                // stepArray.value.redoButton.disabled= "disabled";
            }else{
                if (stepArray.value.states.length > stepArray.value.currentStateIndex && stepArray.value.states.length != 0){
                    // console.log("stepArray.value")
                    stepArray.value.redoFinishedStatus = 0;
                    stepArray.value.redoStatus = true;

                    var currentStep = stepArray.value.states[stepArray.value.currentStateIndex+1]

                    currentMaterial.value = currentStep.material.name
                    materialType.value = currentStep.material.type
                    selectedMaterial.value = currentStep.material.values
                    currentMaterialTextImages.value = currentStep.material.textImage

                    selectedShape.value = currentStep.shape
                    handleGetShape(selectedShape.value)

                    activeFixingMethode.value = currentStep.fixingMethod.value
                    fixingExcludeShapes.value = currentStep.fixingMethod.excludeShapes
                    fixingExcludeSizes.value = currentStep.fixingMethod.excludeSizes
                    handleSelectFixingMethode(activeFixingMethode.value)

                    currentSizeName.value = currentStep.size.name
                    currentSizeData.value = currentStep.size.data
                    currentSizeValues.value = currentStep.size.values
                    // handleChangeSize(currentSizeData.value.width, currentSizeData.value.height, currentSizeName.value, currentSizeValues.value.maxTextChar)
                    
                    signTextColor1.value = currentStep.color.textColor.face1
                    signTextColor2.value = currentStep.color.textColor.face2
                    colorrs.value = currentStep.color.colorsObject
                    activeSignColor.value = currentStep.color.face1.name
                    activeSignColorCode1.value = currentStep.color.face1.codeHex
                    patternActive1.value = currentStep.color.face1.pattern
                    activeSignFace2Color.value = currentStep.color.face2.name
                    activeSignColorCode2.value = currentStep.color.face2.codeHex
                    patternActive2.value = currentStep.color.face2.pattern

                    firstColorCheck.value = currentStep.color.firstColorCheck

                    if(materialType.value === 'advance'){
                        setImageToSignBackground(activeSignColorCode1.value, activeSignColor.value)
                    }else{
                        if(activeFace.value === 'front-face' && patternActive1.value){
                            setPattern(canvas, activeSignColorCode1.value)
                        }
                        if(activeFace.value === 'back-face' && patternActive2.value){
                            setPattern(canvasBack, activeSignColorCode2.value)
                        }
                    }

                    activeFace1Border.value = currentStep.border.face1.type
                    activeFace1BorderColor.value = currentStep.border.face1.color
                    border1ExcludeShapes.value = currentStep.border.face1.excludeShapes
                    border1ExcludeSizes.value = currentStep.border.face1.excludeSizes

                    activeFace2Border.value = currentStep.border.face2.type
                    activeFace2BorderColor.value = currentStep.border.face2.color
                    border2ExcludeShapes.value = currentStep.border.face2.excludeShapes
                    border2ExcludeSizes.value = currentStep.border.face2.excludeSizes

                    // if(materialType.value === 'simple'){
                    //     if(activeFace.value === 'front-face'){
                    //         if(signTextColor1.value.active && signTextColor1.value.sameForBorder){
                    //             if(activeFace1Border.value !== 'none'){
                    //                 handleSelectBorder(activeFace1Border.value)
                    //                 handlechangeBorderColor(signTextColor1.value.codeHex)
                    //             }
                    //         }else{
                    //             handleSelectBorder(activeFace1Border.value)
                    //             if(activeFace1Border.value !== 'none'){
                    //                 handlechangeBorderColor(activeFace1BorderColor.value)
                    //             }
                    //         }

                    //     }else{
                    //         if(signTextColor2.value.active && signTextColor2.value.sameForBorder){
                    //             if(activeFace2Border.value !== 'none'){
                    //                 handleSelectBorder(activeFace2Border.value)
                    //                 handlechangeBorderColor(signTextColor2.value.codeHex)
                    //             }
                    //         }else{
                    //             handleSelectBorder(activeFace2Border.value)
                    //             if(activeFace2Border.value !== 'none'){
                    //                 handlechangeBorderColor(activeFace2BorderColor.value)
                    //             }
                    //         }
                    //     }
                    // }
                    

                    finalPrices.value = currentStep.price

                    stepArray.value.redoStatus = false;
                    stepArray.value.currentStateIndex += 1;
                    if(stepArray.value.currentStateIndex != -1){
                        // stepArray.value.undoButton.removeAttribute('disabled');
                    }
                    stepArray.value.redoFinishedStatus = 1;
                    if((stepArray.value.currentStateIndex == stepArray.value.states.length-1) && stepArray.value.currentStateIndex != -1){
                    //   stepArray.value.redoButton.disabled= "disabled";
                    }
                }
            }
            handleReadyToSaveState(true);
        }
        simulateCanvasClick()
    }
    function clearStep(){
        // currentSizeName.value = stepArray.value.states[0].size.name
        // currentSizeValues.value = stepArray.value.states[0].size.values


        addedTexts.value = []
        usedImages.value = []

        // finalPrices.value = stepArray.value.states[0].price

        stepArray.value.states = []
        stepArray.value.currentStateIndex = -1
        stepArray.value.undoFinishedStatus = 1;
        firstSetLoad.value = false
        if(props.config.data.materials.length > 0){
            selectMaterial(props.config.data.materials[0], 0)
        }
    }


    var flipped = ref(false)
    var activeFace = ref('front-face')
    function flipRect() {
        var flipper = document.getElementById('asowp-canvas-containers')
        var signFace = document.getElementById('asowp-sign-recto')
        var signBack = document.getElementById('asowp-sign-verso')
        if(!flipped.value){
            flipper.classList.add('flipper-switch')
            handleCheckActiveSignFace('back')
            activeFace.value = 'back-face'
            activeCanvas = canvasBack
            canvas.discardActiveObject();
        }else{
            flipper.classList.remove('flipper-switch')
            handleCheckActiveSignFace('front')
            activeFace.value = 'front-face'
            activeCanvas = canvas
            canvasBack.discardActiveObject();
        }
        flipped.value = !flipped.value
    }


    function checkScreenSize(width, height){
        handleReadyToSaveState(false);

        var canvasContainer = document.getElementById("asowp-canvas-containers")
        if(width){
            var canvasWidth = width;
            var canvasHeight = height;
        }else{
            var canvasWidth = canvasContainer.clientWidth;
            var canvasHeight = canvasContainer.clientHeight;
        }
        // console.log(canvasWidth, canvasHeight, "canvas", canvasContainer)

        let windowRatio = canvasWidth / canvasHeight;
        let targetRatio = 16/9;


        let scaleRatio;
        if (windowRatio > targetRatio) {
            scaleRatio = canvasHeight / (canvasWidth / targetRatio);
            var hValue = handleGetObjectByName('height-value')
            var wValue = handleGetObjectByName('width-value')
            var tValue = handleGetObjectByName('thickness-value')
            var fontSize = (hValue.fontSize / targetRatio) + 10
            // hValue.fontSize = fontSize
            // wValue.fontSize = fontSize
            // tValue.fontSize = fontSize
            // console.log("==1==", scaleRatio, "==1==")
        } else {
            scaleRatio = canvasWidth / (canvasHeight * targetRatio) - 0.15;
            var hValue = handleGetObjectByName('height-value')
            var wValue = handleGetObjectByName('width-value')
            var tValue = handleGetObjectByName('thickness-value')
            var fontSize = (hValue.fontSize * targetRatio) + 10
            // hValue.fontSize = fontSize
            // wValue.fontSize = fontSize
            // tValue.fontSize = fontSize
            // console.log("==2==", scaleRatio, "==2==")
        }
            // console.log("====", scaleRatio, "====")

        canvas.zoomToPoint({x: canvas.getWidth() /2, y: canvas.getHeight() /2}, scaleRatio)
        canvasBack.zoomToPoint({x: canvas.width/2, y: canvas.height/2}, scaleRatio)
        
        canvas.setWidth(canvasWidth);
        canvas.setHeight(canvasHeight);
        
        canvasBack.setWidth(canvasWidth);
        canvasBack.setHeight(canvasHeight);
        
        centerSign(canvas)
        centerSign(canvasBack)

        currentSizeValues.value = handleGetSignPosition()
        handleReadyToSaveState(true);

        simulateCanvasClick()
    }
    function simulateCanvasClick(){
        activeCanvas.fire('mouse:down', {
            e: new MouseEvent('click', { clientX: 100, clientY: 100 }), // Coordonnées du clic
            pointer: { x: 100, y: 100 }, // Position du clic
        });
    }
    function getCanvasCenter() {
        const canvasWidth = canvas.getWidth();
        const canvasHeight = canvas.getHeight();
        const viewportTransform = canvas.viewportTransform;

        // Coordonnées du centre du canvas avant la transformation de viewport
        const untransformedCenter = {
            x: canvasWidth / 2,
            y: canvasHeight / 2
        };

        // Appliquer la transformation de viewport inverse aux coordonnées du centre
        const invertedTransform = fabric.util.invertTransform(viewportTransform);
        const transformedCenter = fabric.util.transformPoint(untransformedCenter, invertedTransform);

        return transformedCenter;
    }
    function centerSign(canva){
        var sign = handleGetObjectByName('safeObject', canva)
        var canvasCenter = getCanvasCenter()
        const allObjects = canva.getObjects();
        var zoom = canva.getZoom()

        if (allObjects.length > 0) {
            const group = new fabric.Group(allObjects);
            canva.discardActiveObject();

            var newRectLeft = canvasCenter.x - sign.width / 2;
            var newRectTop = canvasCenter.y - sign.height / 2;

            var hLine = handleGetObjectByName('heightLine', canva)
            var hValue = handleGetObjectByName('height-value', canva)

            var wLine = handleGetObjectByName('widthtLine', canva)
            var wValue = handleGetObjectByName('width-value', canva)

            var wDiff = group.width - (sign.width + 55 + hValue.height - 15)
            var hDiff = group.height - (sign.height + 65 + wValue.height)


            // Centrer le groupe
            group.set('left', newRectLeft - wDiff)
            group.set('top', newRectTop - hDiff)

            group.setCoords();

            currentSizeValues.value.left = canvasCenter.x - sign.width/2
            currentSizeValues.value.top = canvasCenter.y - sign.height/2
            handleGetNewPosition(canvasCenter.x - sign.width/2, canvasCenter.y - sign.height/2)


            // Dégrouper les objets
            group._restoreObjectsState();
            canva.remove(group);
            canva.getObjects().forEach((obj) => {
                if(obj.name === 'asowp-signText'){
                    if(obj.isEditing){
                        obj.exitEditing();
                    }
                    obj.clipPath = handleClipAddedObject(canva);

                }
                if (obj.name === 'asowp-SignImage') {
                    obj.clipPath = handleClipAddedObject(canva);
                }
                obj.setCoords()
            })
        }
        canva.renderAll()
    }  
    // function centerSign(canva){
    //     var sign = handleGetObjectByName('safeObject', canva)
    //     var canvasCenter = getCanvasCenter()
    //     const allObjects = canva.getObjects();

    //     if (allObjects.length > 0) {
    //         const group = new fabric.Group(allObjects);
    //         canva.discardActiveObject();

    //         // Centrer le groupe
    //         group.set('left', canvasCenter.x - sign.width/2)
    //         group.set('top', canvasCenter.y - sign.height/2)

    //         group.setCoords();

    //         currentSizeValues.value.left = canvasCenter.x - sign.width/2
    //         currentSizeValues.value.top = canvasCenter.y - sign.height/2
    //         handleGetNewPosition(canvasCenter.x - sign.width/2, canvasCenter.y - sign.height/2)


    //         // Dégrouper les objets
    //         group._restoreObjectsState();
    //         canva.remove(group);
    //         canva.getObjects().forEach((obj) => {
    //             if(obj.name === 'asowp-signText'){
    //                 if(obj.isEditing){
    //                     obj.exitEditing();
    //                 }
    //                 obj.clipPath = handleClipAddedObject(canva);

    //             }
    //             if (obj.name === 'asowp-SignImage') {
    //                 obj.clipPath = handleClipAddedObject(canva);
    //             }
    //             obj.setCoords()
    //         })
    //     }
    //     canva.renderAll()
    // }  
    

    var angleActive = ref(false)
    function showObjectValues(){
        var div = document.getElementById('activeObject-values');
        var object = activeCanvas.getActiveObject();
        if(object.type == 'image'){
            angleActive.value = true
            // showOptions('image')
            // editAddedImage(object)
        }
        div.classList.remove("asowp-invisible");
        textsPrices.value = handleSetPrice()
        var priceObject = {
            name: 'none',
            price: 0
        }
        getOptionPrice(priceObject)

        if(route.name == 'template-maker'){
            checkTemplateObjectLockMoving(object)
            showTempSettings.value = true;
        }
        // if(object.type === 'i-text'){
        //     showOptions('text')
        //     getTextObject(object)
        // }

    }
    function closeObjectValues(){
        var div = document.getElementById('activeObject-values');
        div.classList.add("asowp-invisible");
        textsPrices.value = handleSetPrice()
        var priceObject = {
            name: 'none',
            price: 0
        }
        getOptionPrice(priceObject)

        // if(route.name == 'template-maker'){
            showTempSettings.value = false;
        // }
    }

    var allMaterials = ref([])
    var customSizeActive = ref(false)
    var currentMaterial = ref({})
    var currentMaterialId = ref(0)
    var currentMaterialTextImages = ref({})
    var selectedMaterial = ref('')
    var materialType = ref('')
    var firstLoad = ref(false)
    function selectMaterial(material, id){
        // console.log(material, "selected material")

        currentMaterial.value = material
        currentMaterialId.value = id
        currentMaterialTextImages.value = material.data.textImages
        materialType.value = material.type
        // console.log("selectMaterial", material)
        selectedMaterial.value = material.name

        if(material.type == 'simple'){
            if(material.data.sizes.allSizes){
                sizees.value = material.data.sizes.allSizes
                thicknesss.value = material.data.sizes.thickness
            }else{
                sizees.value = []
            }
            if(material.data.sizes.customSize){
                customSizes.value = material.data.sizes.customSize
                customSizeActive.value = material.data.sizes.customSize.active
            }
            // if(material.data.sizes.customSize){
            // }
            if(customSizeActive.value){
                // console.log("custom size", customSizes.value)
                customSizeValues.value.width = customSizes.value.width.min
                customSizeValues.value.height = customSizes.value.height.min
            }


            shapees.value = material.data.shapes
            fixinggs.value = material.data.fixingMethods
            colorrs.value = material.data.colors
            borderrs.value = material.data.borders
            additionalComponents.value = material.data.additionalOptions
            addComponentSelected.value = []

            if(firstLoad.value){
                selectSimpleFirstValue()
            }
        }

        var stop = false
        var stopDefOption = false
        var stopOption = false
        if(material.type == 'advance'){
            // currentMaterial.value.data.forEach(component => {
            //     if(!stop){
            //         showOptions('component', component)
            //         stop = true
            //     }
            // })
            // advancedComponent.value.options.forEach( option => {
            //     if(!stopDefOption){
            //         if(option.isDefault){
            //             console.log('default')
            //             selectSignModel(option)
            //             stopDefOption = true
            //         }
            //         if(!option.isDefault && stopDefOption && !stopOption){
            //             console.log('first')
            //             selectSignModel(option)
            //             stopDefOption = true
            //             stopOption = true
            //         }
            //     }
            // })
            if(firstLoad.value){
                selectAdvanceFirstValue()
            }
        }

        firstLoad.value = true
    }

    var activeSignModel = ref()
    var activeSignModelName = ref('')
    var activeSignModelId = ref(0)
    function selectSignModel(model, id){
        handleReadyToSaveState(false);

        firstSetLoad.value = false

        activeSignModel.value = model
        activeSignModelName.value = model.name
        activeSignModelId.value = id

        handleSelectBorder('none')
        var borderPrice1Object = {
            name: "border1",
            price: 0
        }
        getOptionPrice(borderPrice1Object)

        var borderPrice2Object = {
            name: "border2",
            price: 0
        }
        getOptionPrice(borderPrice2Object)

        // selection de fixing
        var stopFixing = false
        fixinggs.value = model.fixingMethods
        // console.log(model.fixingMethods,"fixing materail advance")
        fixinggs.value.forEach(fixingId => {
            allFixings.value.forEach((fixing, index) => {
                if(fixingId == index && !stopFixing){
                    // selectFixingMethode(fixing.type)
                    activeFixingMethode.value = fixing.type
                    stopFixing = true
                }
            });
        });

        // selection du shape 
        allShapes.value.forEach((shape, index) => {
            if(model.shapeId == index ){
                selectedShape.value = shape.value
                handleGetShape(shape.value,  activeFixingMethode.value)
            }
        })

        // selection de la size
        var modelSize = {
            name: model.name,
            width: model.size.width,
            height: model.size.height
        }
        var modelSizeSetting = {
            basePrice: model.size.basePrice,
            charPrice: model.size.charPrice,
            maxTextChar: model.size.maxTextChar,
            startPriceAtChar: model.size.startPriceAtChar,
        }
        changeSize(modelSize, modelSizeSetting)
        currentThickValue.value = -99
        handleChangeThickness(false, 0)

        //selection de la couleur
        setImageToSignBackground(model.image, model.color.name)
        if(configDoublePart.value.active){
            activeSignColor.value = model.color.name
            activeSignColorCode1.value = model.image
            
            activeSignFace2Color.value = model.color.name
             activeSignColorCode2.value = model.image
        }else{
            activeSignColor.value = model.color.name
            activeSignColorCode1.value = model.image
        }

        // selection de la couleur
        colorrs.value = [{color: model.color, image: model.image}]
        firstColorCheck.value = true

        var modelPrice = model.additionalPrice
        var modelPriceObject = {
            name: "model",
            price: modelPrice
        }
        getOptionPrice(modelPriceObject)

        // if(firstSetLoad.value){
        // }
        saveStep('select model')
        handleReadyToSaveState(true, true);
    }


    function setImageToSignBackground(image, colorName){
        activeSignColor.value = colorName
        activeSignColorCode1.value = image
        patternActive1.value = true

        activeSignFace2Color.value = colorName
        activeSignColorCode2.value = image
        patternActive2.value = true
        handleSetImageToSignBackground(image);
        // console.log("setImageToSign")
    }



    var customSizeValues = ref({
        label: '',
        width: 0,
        height: 0
    })
    var customSizeTextValues = ref({
        textNumber: 0, 
        charPrice: 0, 
        basePrice: 0, 
        maxTextChar: -1, 
        startPriceAtChar: 1
    })


    var sizeRatio = ref('big')
    var fixScale = ref(0)
    var signRatio = ref(0)
    var ratioScale = ref(0)


    function editObject(){
        var currentObject = activeCanvas.getActiveObject()
        if(currentObject !== undefined){
            if(currentObject !== null){
                if(currentObject.name === 'asowp-SignText'){
                    showOptions('text')
                    getTextObject(currentObject, true)
                }
                if(currentObject.name === 'asowp-SignImage'){
                    showOptions('image')
                    editAddedImage(currentObject)
                }
            }
        }
    }
    function deleteObject(){
        // console.log(activeCanvas.getActiveObject())
        if(activeCanvas.getActiveObject() !== undefined){
            if(activeCanvas.getActiveObject() !== null){
                var object = activeCanvas.getActiveObject();
                // addedTexts.value = handleDeleteObject(object)
                if(object.name == "asowp-SignText"){
                    addedTexts.value = handleDeleteObject(object)
                    selectText.value = false
                    // console.log(addedTexts.value)
        
                    textsPrices.value = handleSetPrice()
                    var priceObject = {
                        name: 'none',
                        price: 0
                    }
                    getOptionPrice(priceObject)
                }
                if(object.name == 'asowp-SignImage'){
                    usedImages.value = handleDeleteObject(object)
                    // selectText.value = false
                    // console.log(usedImages.value, 'image')
                    // console.log(optionsPrices.value, "before")
        
                    var index = 0
                    while(index < optionsPrices.value.length){
                        if(optionsPrices.value[index].type === 'image'){
                            const exists = usedImages.value.some(image => image.object.priceId === optionsPrices.value[index].id);
                            if(!exists){
                                optionsPrices.value.splice(index, 1)
                            }
                        }
                        index ++
                    }
                    var priceObject = {
                        name: 'none',
                        price: 0
                    }
                    getOptionPrice(priceObject)
                }

                if(firstSetLoad.value){
                    saveStep('clone object')
                }
            }
        }
    }
    function cloneObject(){
        if(activeCanvas.getActiveObject() !== undefined){
            if(activeCanvas.getActiveObject() !== null){
                newImagePriceId.value = newImagePriceId.value + 1
                var object = activeCanvas.getActiveObject();
                if(object.name === 'asowp-SignText'){
                    handleCloneObject(object)
                    saveStep('clonage du text');
                }
                textsPrices.value = handleSetPrice()
        
                var stop = false
                if(object.name === 'asowp-SignImage'){
                    optionsPrices.value.forEach(element => {
                        if(element.type){
                            var objectUrl = (object.objectType === "svg" ? object.imageUrl : object.getSrc())
                            // console.log(objectUrl)
                            if(objectUrl === element.name && !stop){
                                // console.log(element, "qsdqsdqsdqsd")
                                var imagePriceObject = {
                                    id: newImagePriceId.value,
                                    name: element.name,
                                    type: 'image',
                                    price: element.price
                                }
                                getOptionPrice(imagePriceObject) 
                                stop = true
                            }
                        }
                    });
        
                    usedImages.value = handleCloneObject(object, newImagePriceId.value)
                    // console.log(usedImages.value)
                }
                var priceObject = {
                    name: 'none',
                    price: 0
                }
                getOptionPrice(priceObject)

                // if(firstSetLoad.value){
                //     saveStep('clone object')
                // }
            }
        }
    }
    function centerHorizontally(){
        if(activeCanvas.getActiveObject() !== undefined){
            if(activeCanvas.getActiveObject() !== null){
                var object = activeCanvas.getActiveObject();
                handleCenterHorizontally(object)
            }
        }
    }
    function centerVertically(){
        if(activeCanvas.getActiveObject() !== undefined){
            if(activeCanvas.getActiveObject() !== null){
                var object = activeCanvas.getActiveObject();
                handleCenterVertically(object)
            }
        }
    }

    function moveObject(to){
        handleMoveobject(to)
    }

    var objectLockMoving = ref({
        x: false,
        y: false,
    })
    function lockMoving(axe){
        if(activeCanvas.getActiveObject() !== undefined){
            if(activeCanvas.getActiveObject() !== null){
                var object = activeCanvas.getActiveObject();
                objectLockMoving.value = handleLockMoving(object, axe)
                checkTemplateObjectLockMoving(object)
            }
        }
    }
    var lockingXobject = ref(false)
    var lockingYobject = ref(false)
    function checkTemplateObjectLockMoving(object){
        // console.log("Checking", object)
        objectLockMoving.value = object.lockMoving
        if(objectLockMoving.value.x === true){
            lockingXobject.value = true
        }else{
            lockingXobject.value = false
        }
        if(objectLockMoving.value.y === true){
            lockingYobject.value = true
        }else{
            lockingYobject.value = false
        }

        lockObjectScale.value = object.lockScale
        lockObjectRotation.value = object.lockRotation
        lockObjectEdition.value = object.lockEdition
    }
    var lockObjectScale = ref(false)
    function lockScaling(){
        if(activeCanvas.getActiveObject() !== undefined){
            if(activeCanvas.getActiveObject() !== null){
                var object = activeCanvas.getActiveObject();
                lockObjectScale.value = handleLockScaling(object)
                checkTemplateObjectLockMoving(object)
            }
        }
    }
    var lockObjectRotation = ref(false)
    function lockRotation(){
        if(activeCanvas.getActiveObject() !== undefined){
            if(activeCanvas.getActiveObject() !== null){
                var object = activeCanvas.getActiveObject();
                lockObjectRotation.value = handleLockRotating(object)
                checkTemplateObjectLockMoving(object)
            }
        }
    }
    var lockObjectEdition = ref(false)
    function lockEdition(){
        if(activeCanvas.getActiveObject() !== undefined){
            if(activeCanvas.getActiveObject() !== null){
                var object = activeCanvas.getActiveObject();
                if(object.type === 'i-text'){
                    lockObjectEdition.value = handleLockEdition(object)
                    checkTemplateObjectLockMoving(object)
                }
            }
        }
    }


    var sizees = ref([])
    var thicknesss = ref([])
    var customSizes = ref({})
    var allSizes = ref({})
    var currentSizeName = ref('')
    var currentSizeData = ref({})
    var currentSize = ref('')
    var currentSizeId = ref(0)
    var currentSizeValues = ref({})
    var currentSizeSetting = ref({})
    var currentSizeThickness = ref(false)
    function changeSize(sizeData, sizeSetting, sizeId) {
        currentSizeData.value = sizeData
        // console.log(sizeData, sizeSetting, "change size")
        if(sizeId != undefined){
            currentSizeId.value = sizeId
        }

        if(sizeSetting){
            currentSizeSetting.value = sizeSetting
            textNumberForSize.value = sizeSetting.textNumber
            currentSizeValues.value = handleChangeSize(sizeData.width, sizeData.height, sizeData.name, sizeSetting.maxTextChar)
            maxTextCharForSize.value = sizeSetting.maxTextChar
            // console.log(currentSizeValues.value, "1")
        }else{
            currentSizeSetting.value = {}
            currentSizeValues.value = handleChangeSize(sizeData.width, sizeData.height, sizeData.name, -1)
            maxTextCharForSize.value = -1
        }

        currentSizeName.value = sizeData.label;
        if(thicknesss.value.active){
            currentSizeThickness.value = thicknesss.value.active
            selectSizeThickness(thicknesss.value.values[0])
            handleChangeThickness(thicknesss.value.active, thicknesss.value.values[0])

        }else{
            handleChangeThickness(thicknesss.value.active, 0)
        }

        addedTexts.value = currentSizeValues.value.texts

        if(sizeSetting){
            var sizeBasePrice = sizeSetting.basePrice
            handleGetCharPrice(sizeSetting.charPrice, sizeSetting.startPriceAtChar)
            var sizeBasePriceObject = {
                name: "sizeTextBase",
                price: sizeBasePrice
            }
            getOptionPrice(sizeBasePriceObject)
        }

        if(sizeId != undefined){
            // desactivation du fixingMethode si il n'est pas actif pour la size selectionné
            if(matchingFixings.value.length > 0){
                if(fixingExcludeSizes.value.includes(sizeId)){
                    // if(activeFixingId.value == matchingFixings.value.length-1){
                    //     selectFixingMethode(matchingFixings.value[0].fixing.type, matchingFixings.value[0].fixingg, 0)
                    // }
                    // selectFixingMethode(matchingFixings.value[activeFixingId.value+1].fixing.type, matchingFixings.value[activeFixingId.value+1].fixingg, activeFixingId.value+1)
                    selectFixingMethode('none')
                    var fixingPriceObject = {
                        name: "fixing",
                        price: 0
                    }
                    getOptionPrice(fixingPriceObject)
                }
            }

            // desactivation du border si il n'est pas actif pour la size selectionné
            if(activeFace.value == 'front-face'){
                if(border1ExcludeSizes.value.includes(sizeId)){
                    // if(face1BorderId.value === matchingBorders.value.length-1){
                    //     selectBorder(matchingBorders.value[0].border.value, matchingBorders.value[0].borderr.settings, matchingBorders.value[0].borderr.additionalPrice, matchingBorders.value[0].borderr.excludeShapes, matchingBorders.value[0].borderr.excludeSizes, 0)
                    // }
                    // selectBorder(matchingBorders.value[face1BorderId.value+1].border.value, matchingBorders.value[face1BorderId.value+1].borderr.settings, matchingBorders.value[face1BorderId.value+1].borderr.additionalPrice, matchingBorders.value[face1BorderId.value+1].borderr.excludeShapes, matchingBorders.value[face1BorderId.value+1].borderr.excludeSizes, face1BorderId.value+1)
                    selectBorder('none')
                    var borderPrice1Object = {
                        name: "border1",
                        price: 0
                    }
                    getOptionPrice(borderPrice1Object)
                }
            }
            if(activeFace.value == 'back-face'){
                if(border2ExcludeSizes.value.includes(sizeId)){
                    // if(face2BorderId.value === matchingBorders.value.length-1){
                    //     selectBorder(matchingBorders.value[0].border.value, matchingBorders.value[0].borderr.settings, matchingBorders.value[0].borderr.additionalPrice, matchingBorders.value[0].borderr.excludeShapes, matchingBorders.value[0].borderr.excludeSizes, 0)
                    // }
                    // selectBorder(matchingBorders.value[face2BorderId.value+1].border.value, matchingBorders.value[face2BorderId.value+1].borderr.settings, matchingBorders.value[face2BorderId.value+1].borderr.additionalPrice, matchingBorders.value[face2BorderId.value+1].borderr.excludeShapes, matchingBorders.value[face2BorderId.value+1].borderr.excludeSizes, face2BorderId.value+1)
                    selectBorder('none')
                    var borderPrice2Object = {
                        name: "border2",
                        price: 0
                    }
                    getOptionPrice(borderPrice2Object)
                }
            }
        }

        if(firstSetLoad.value){
            saveStep('select size')
        }

        textsPrices.value = handleSetPrice()
        var priceObject = {
            name: 'none',
            price: 0
        }
        getOptionPrice(priceObject)

        // let timer;
        // clearTimeout(timer);
        // timer = setTimeout(() => {
        //     centerSign(canvas)
        //     centerSign(canvasBack)
        // }, 50);
    }

    function selectCustomSize(customSize){
        // console.log(customSize, "custom size")
        function checkInterval(pricings, value){
            let settings = pricings[0];
            for (let i = 0; i < pricings.length; i++) {
                if (value <= (pricings[i].surface * pricings[i].surface)) {
                    settings = pricings[i];
                    break;
                }
                settings = pricings[i];
            }
            return settings;   
        }

        if((customSizeValues.value.width >= customSize.width.min && customSizeValues.value.width <= customSize.width.max) && (customSizeValues.value.height >= customSize.height.min && customSizeValues.value.height <= customSize.height.max)){
            if(customSize.pricings.length > 0){
                var valeur = customSizeValues.value.width * customSizeValues.value.height
                var matchingSettings = checkInterval(customSize.pricings, valeur)
                // console.log(matchingSettings, "resultat")
        
                customSizeTextValues.value = {
                    textNumber: 0, 
                    charPrice: matchingSettings.charPrice, 
                    basePrice: matchingSettings.basePrice, 
                    maxTextChar: -1, 
                    startPriceAtChar: 0
                }
            }
    
            changeSize(customSizeValues.value, customSizeTextValues.value)
        }

    }

    var currentThickValue = ref(0)
    function selectSizeThickness(thick){
        currentThickValue.value = thick
        handleChangeThickness(thicknesss.value.active, thick)
    }

    var allShapes = ref({})
    var shapees = ref([])
    var selectedShape = ref('square')
    var currentShapeId = ref(0)
    function selectShape(shape, setting, shapeId){
        // currentShapeId.value = setting.shapeId
        currentShapeId.value = shapeId
        if(fixingExcludeShapes.value.includes(shapeId)){
            // if(activeFixingId === matchingFixings.value.length-1){
            //     selectFixingMethode(matchingFixings.value[0].fixing.type, matchingFixings.value[0].fixingg, 0)
            // }
            // selectFixingMethode(matchingFixings.value[activeFixingId+1].fixing.type, matchingFixings.value[activeFixingId+1].fixingg, activeFixingId+1)
            selectFixingMethode('none')
            var fixingPriceObject = {
                name: "fixing",
                price: 0
            }
            getOptionPrice(fixingPriceObject)
        }
        if(activeFace.value == 'front-face'){
            if(border1ExcludeShapes.value.includes(shapeId)){
                // if(face1BorderId.value === matchingBorders.value.length-1){
                //     selectBorder(matchingBorders.value[0].border.value, matchingBorders.value[0].borderr.settings, matchingBorders.value[0].borderr.additionalPrice, matchingBorders.value[0].borderr.excludeShapes, matchingBorders.value[0].borderr.excludeSizes, 0)
                // }
                // selectBorder(matchingBorders.value[face1BorderId.value+1].border.value, matchingBorders.value[face1BorderId.value+1].borderr.settings, matchingBorders.value[face1BorderId.value+1].borderr.additionalPrice, matchingBorders.value[face1BorderId.value+1].borderr.excludeShapes, matchingBorders.value[face1BorderId.value+1].borderr.excludeSizes, face1BorderId.value+1)
                selectBorder('none')
                var borderPrice1Object = {
                    name: "border1",
                    price: 0
                }
                getOptionPrice(borderPrice1Object)
            }
        }
        if(activeFace.value == 'back-face'){
            if(border2ExcludeShapes.value.includes(shapeId)){
                // if(face2BorderId.value === matchingBorders.value.length-1){
                //     selectBorder(matchingBorders.value[0].border.value, matchingBorders.value[0].borderr.settings, matchingBorders.value[0].borderr.additionalPrice, matchingBorders.value[0].borderr.excludeShapes, matchingBorders.value[0].borderr.excludeSizes, 0)
                // }
                // selectBorder(matchingBorders.value[face2BorderId.value+1].border.value, matchingBorders.value[face2BorderId.value+1].borderr.settings, matchingBorders.value[face2BorderId.value+1].borderr.additionalPrice, matchingBorders.value[face2BorderId.value+1].borderr.excludeShapes, matchingBorders.value[face2BorderId.value+1].borderr.excludeSizes, face2BorderId.value+1)
                selectBorder('none')
                var borderPrice2Object = {
                    name: "border2",
                    price: 0
                }
                getOptionPrice(borderPrice2Object)

            }
        }

        handleSelectShape(shape, currentSizeValues.value.width, currentSizeValues.value.height, currentSizeValues.value.top, currentSizeValues.value.left)
        selectedShape.value = shape

        var shapePrice = setting.additionalPrice
        var shapePriceObject = {
            name: "shape",
            price: shapePrice
        }
        getOptionPrice(shapePriceObject)

        if(firstSetLoad.value){
            saveStep('select shape')
        }
        
    }

    var firstBorderCheck = ref(true)
    var allBorders = ref({})
    var borderrs = ref([])
    var borderSettings = ref([])
    var face1BorderId = ref('')
    var face2BorderId = ref('')
    var activeFace1Border = ref('')
    var activeFace2Border = ref('')
    var activeFace1BorderColor = ref('')
    var activeFace2BorderColor = ref('')
    var activeFace1BorderColorPrice = ref(0)
    var activeFace2BorderColorPrice = ref(0)
    var borderColors1 = ref({})
    var borderColors2 = ref({})
    var customBorderColor1 = ref(false)
    var customBorderColor2 = ref(false)
    var border1ExcludeShapes = ref([])
    var border2ExcludeShapes = ref([])
    var border1ExcludeSizes = ref([])
    var border2ExcludeSizes = ref([])
    function selectBorder(border, settings, price, excludeShapes, excludeSizes, id, restart) {
        var border1Price = 0
        var border2Price = 0
        
        handleGetBorderRestart(restart)

        if(firstBorderCheck.value){
            var currentId = id
            var activeBorder = handleSelectBorder(border)
            var colors = (borderrs.value.settings.colors.length > 0 ? borderrs.value.settings.colors : {} )
            firstBorderColor.value = (borderrs.value.settings.colors.length > 0 ? borderrs.value.settings.colors[0] : {} )
            var customColor = borderrs.value.settings.enableBorderColor
            var exShapes = excludeShapes
            var exSizes = excludeSizes

            if(configDoublePart.value.active){
                face1BorderId.value = currentId
                activeFace1Border.value = activeBorder.type;
                // activeFace1BorderColor.value = activeBorder.color;
                borderColors1.value = colors
                customBorderColor1.value = customColor
                border1ExcludeShapes.value = exShapes
                border1ExcludeSizes.value = exSizes
                border1Price = price

                face2BorderId.value = currentId
                activeFace2Border.value = activeBorder.type;
                // activeFace2BorderColor.value = activeBorder.color;
                borderColors2.value = colors
                customBorderColor2.value = customColor
                border2ExcludeShapes.value = exShapes
                border2ExcludeSizes.value = exSizes
                border2Price = price

                var borderPrice1Object = {
                    name: "border1",
                    price: border1Price
                }
                getOptionPrice(borderPrice1Object)

                var borderPrice2Object = {
                    name: "border2",
                    price: border2Price
                }
                getOptionPrice(borderPrice2Object)

                var stop = false
                if(colorForBorder1.value || colorForBorder2.value){
                    if(colors.length > 0){
                        changeBorderColor(colors[0].codeHex, colors[0].additionalPrice, colors[0].name)
                    }
                }else{
                    // console.log("WARNING")
                    // changeBorderColor(colorTextColor.value, 0)
                }
                if(colorForBorder2.value){
                    if(colors.length > 0){
                        // changeBorderColor(colors[0].codeHex, colors[0].additionalPrice, colors[0].name)
                    }
                }else{
                    // changeBorderColor(colorTextColor.value, 0)
                }
            }else{
                face1BorderId.value = currentId
                activeFace1Border.value = activeBorder.type;
                // activeFace1BorderColor.value = activeBorder.color;
                borderColors1.value = colors
                customBorderColor1.value = customColor
                border1ExcludeShapes.value = exShapes
                border1ExcludeSizes.value = exSizes
                border1Price = price

                var borderPrice1Object = {
                    name: "border1",
                    price: border1Price
                }
                getOptionPrice(borderPrice1Object)

                if(colorForBorder1.value){
                    if(colors.length > 0){
                        changeBorderColor(colors[0].codeHex, colors[0].additionalPrice, colors[0].name)
                    }
                }else{
                    changeBorderColor(colorTextColor.value, 0)
                }
            }
        }else{
            var currentId = id
            var activeBorder = handleSelectBorder(border)
            var colors = (borderrs.value.settings.colors.length > 0 ? borderrs.value.settings.colors : {} )
            firstBorderColor.value = (borderrs.value.settings.colors.length > 0 ? borderrs.value.settings.colors[0] : {} )
            var customColor = borderrs.value.settings.enableBorderColor
            var exShapes = excludeShapes
            var exSizes = excludeSizes

            if(activeFace.value === "front-face"){
                face1BorderId.value = currentId
                activeFace1Border.value = activeBorder.type;
                // activeFace1BorderColor.value = activeBorder.color;
                borderColors1.value = colors
                customBorderColor1.value = customColor
                border1ExcludeShapes.value = exShapes
                border1ExcludeSizes.value = exSizes
                border1Price = price
                
                var borderPrice1Object = {
                    name: "border1",
                    price: border1Price
                }
                getOptionPrice(borderPrice1Object)

                if(colorForBorder1.value){
                    if(borderColors1.value.length > 0){
                        // changeBorderColor(borderColors1.value[0].codeHex, borderColors1.value[0].additionalPrice, borderColors1.value[0].name)
                        changeBorderColor(activeFace1BorderColor.value, activeFace1BorderColorPrice.value, borderColorName1.value)
                    }
                }else{
                    changeBorderColor(colorTextColor.value, 0)
                }
            }
            if(configDoublePart.value.active && activeFace.value === "back-face"){
                face2BorderId.value = currentId
                activeFace2Border.value = activeBorder.type;
                // activeFace2BorderColor.value = activeBorder.color;
                borderColors2.value = colors
                customBorderColor2.value = customColor
                border2ExcludeShapes.value = exShapes
                border2ExcludeSizes.value = exSizes
                border2Price = price

                var borderPrice2Object = {
                    name: "border2",
                    price: border2Price
                }
                getOptionPrice(borderPrice2Object)

                if(colorForBorder2.value){
                    if(borderColors2.value.length > 0){
                        // changeBorderColor(borderColors2.value[0].codeHex, borderColors2.value[0].additionalPrice, borderColors2.value[0].name)
                        changeBorderColor(activeFace2BorderColor.value, activeFace2BorderColorPrice.value, borderColorName2.value)
                    }
                }else{
                    changeBorderColor(colorTextColor.value, 0)
                }
            }
        }
        firstBorderCheck.value = false
    }

    var firstBorderColorCheck = ref(true)
    var firstBorderColor = ref({})
    var borderCustomColor1 = ref("#000000")
    var borderCustomColor2 = ref("#000000")
    var borderColorName1 = ref("")
    var borderColorName2 = ref("")
    var colorForBorder1 = ref(false)
    var colorForBorder2 = ref(false)
    function changeBorderColor(colorHex, price, name){
        // console.log(name, "changeBorderColor")
        if(firstBorderColorCheck.value){
            borderColorName1.value = name
            activeFace1BorderColor.value = colorHex
            activeFace1BorderColorPrice.value = price
            handlechangeBorderColor(colorHex, "first load fornt face")
            var borderColor1Price = price
            var borderColorPrice1Object = {
                name: "border-color1",
                price: borderColor1Price
            }
            getOptionPrice(borderColorPrice1Object)

            borderColorName2.value = name
            activeFace2BorderColor.value = colorHex
            activeFace2BorderColorPrice.value = price
            handlechangeBorderColor(colorHex, "first load back face")
            var borderColor2Price = price
            var borderColorPrice2Object = {
                name: "border-color2",
                price: borderColor2Price
            }
            getOptionPrice(borderColorPrice2Object)
        }else{
            if(activeFace.value === "front-face"){
                borderColorName1.value = name
                activeFace1BorderColor.value = colorHex
                activeFace1BorderColorPrice.value = price
                handlechangeBorderColor(colorHex,"front face border color")
                var borderColor1Price = price
    
                var borderColorPrice1Object = {
                    name: "border-color1",
                    price: borderColor1Price
                }
                getOptionPrice(borderColorPrice1Object)
            }
            if(configDoublePart.value.active && activeFace.value === "back-face"){
                borderColorName2.value = name
                activeFace2BorderColor.value = colorHex
                activeFace2BorderColorPrice.value = price
                handlechangeBorderColor(colorHex, "back face border color")
                var borderColor2Price = price
    
                var borderColorPrice2Object = {
                    name: "border-color2",
                    price: borderColor2Price
                }
                getOptionPrice(borderColorPrice2Object)
            }
        }

        if(firstSetLoad.value){
            saveStep('select borderColor')
        }
        firstBorderColorCheck.value = false
    }

    var firstColorCheck = ref(true)
    var allColors = ref({})
    var colorrs = ref([])
    var activeSignColor = ref('')
    var activeSignFace2Color = ref('')
    var activeSignColoriD = ref(0)
    var activeSignFace2ColoriD = ref(0)
    var activeSignColorCode1 = ref('')
    var activeSignColorCode2 = ref('')
    var patternActive1 = ref(false)
    var patternActive2 = ref(false)
    var signTextColor1 = ref(false)
    var signTextColor2 = ref(false)
    var colorTextColor = ref("")
    var colorTextColorName1 = ref("")
    var colorTextColorName2 = ref("")
    var colorTextCodeHex1 = ref("")
    var colorTextCodeHex2 = ref("")
    function changeSignColor(id, name, pattern, textColor, price, restart) {
        // console.log(color.name, "changeSignColor")
        var color1Price = 0
        var color2Price = 0
        
        if(firstColorCheck.value){
            if(configDoublePart.value.active){
                signTextColor1.value = textColor
                activeSignColor.value = name;
                activeSignColoriD.value = id;
                color1Price = price
    
                signTextColor2.value = textColor
                activeSignFace2Color.value = name;
                activeSignFace2ColoriD.value = id;
                color2Price = price
    
                var colorPrice1Object = {
                    name: "color1",
                    price: color1Price
                }
                getOptionPrice(colorPrice1Object)
    
                var colorPrice2Object = {
                    name: "color2",
                    price: color2Price
                }
                getOptionPrice(colorPrice2Object)

                if(pattern.active){
                    patternActive1.value = true
                    patternActive2.value = true
                    activeSignColorCode1.value = pattern.url
                    activeSignColorCode2.value = pattern.url
                }else{
                    patternActive1.value = false
                    patternActive2.value = false
                    activeSignColorCode1.value = pattern.codeHex
                    activeSignColorCode2.value = pattern.codeHex
                }
                if(textColor.active){
                    colorTextColorName1.value = textColor.name
                    colorTextColorName2.value = textColor.name
                    
                    colorTextCodeHex1.value = textColor.codeHex
                    colorTextCodeHex2.value = textColor.codeHex
                    if(textColor.sameForBorder){
                        colorForBorder1.value = false
                        colorForBorder2.value = false
                    }else{
                        colorForBorder1.value = true
                        colorForBorder2.value = true
                    }
                }else{
                    colorTextColorName1.value = ''
                    colorTextColorName2.value = ''

                    colorTextCodeHex1.value = ''
                    colorTextCodeHex1.value = ''

                    colorForBorder1.value = true
                    colorForBorder2.value = true
                }
            }else{
                signTextColor1.value = textColor
                activeSignColor.value = name;
                activeSignColoriD.value = id;
                color1Price = price
                var colorPrice1Object = {
                    name: "color1",
                    price: color1Price
                }
                getOptionPrice(colorPrice1Object)

                if(pattern.active){
                    patternActive1.value = true
                    activeSignColorCode1.value = pattern.url
                }else{
                    patternActive1.value = false
                    activeSignColorCode1.value = pattern.codeHex
                }
                if(textColor.active){
                    colorTextColorName1.value = textColor.name
                    colorTextCodeHex1.value = textColor.codeHex
                    if(textColor.sameForBorder){
                        colorForBorder1.value = false
                    }else{
                        colorForBorder1.value = true
                    }
                }else{
                    colorTextColorName1.value = ''
                    colorTextCodeHex1.value = ''

                    colorForBorder1.value = true
                }
            }
        }else{
            if(activeFace.value === "front-face"){
                signTextColor1.value = textColor
                activeSignColor.value = name;
                activeSignColoriD.value = id;
                color1Price = price
                
                var colorPrice1Object = {
                    name: "color1",
                    price: color1Price
                }
                getOptionPrice(colorPrice1Object)

                if(pattern.active){
                    patternActive1.value = true
                    activeSignColorCode1.value = pattern.url
                }else{
                    patternActive1.value = false
                    activeSignColorCode1.value = pattern.codeHex
                }
                if(textColor.active){
                    colorTextColorName1.value = textColor.name
                    colorTextCodeHex1.value = textColor.codeHex

                    if(textColor.sameForBorder){
                        colorForBorder1.value = false
                    }else{
                        colorForBorder1.value = true
                    }
                }else{
                    colorTextColorName1.value = ''
                    colorTextCodeHex1.value = ''

                    colorForBorder1.value = true
                }
            }

            if(configDoublePart.value.active && activeFace.value === "back-face"){
                signTextColor2.value = textColor
                activeSignFace2Color.value = name;
                activeSignFace2ColoriD.value = id;
                color2Price = price

                var colorPrice2Object = {
                    name: "color2",
                    price: color2Price
                }

                if(pattern.active){
                    patternActive2.value = true
                    activeSignColorCode2.value = pattern.url
                }else{
                    patternActive2.value = false
                    activeSignColorCode2.value = pattern.codeHex
                }
                getOptionPrice(colorPrice2Object)
                if(textColor.active){
                    colorTextColorName2.value = textColor.name
                    colorTextCodeHex2.value = textColor.codeHex

                    if(textColor.sameForBorder){
                        colorForBorder2.value = false
                    }else{
                        colorForBorder2.value = true
                    }
                }else{
                    colorTextColorName2.value = ''
                    colorTextCodeHex2.value = ''

                    colorForBorder2.value = true
                }
            }
        }

        var defTextColor = (configTextSettings.value.colors.length > 0 ? configTextSettings.value.colors[0].codeHex : "#000000")
        // console.log("change", textColor)
        if(textColor.active){
            handleChangeSignColor(name, pattern, textColor, defTextColor, restart)
            if(textColor.sameForBorder){
                // changeBorderColor(textColor.codeHex, 0, textColor.name)
                handlechangeBorderColor(textColor.codeHex, "back face border color")
                if(firstBorderColorCheck.value){
                    if(configDoublePart.value.active){
                        borderColorName1.value = textColor.name 
                        borderColorName2.value = textColor.name

                        var borderColorPrice1Object = {
                            name: "border-color1",
                            price: 0
                        }
                        getOptionPrice(borderColorPrice1Object)
                        var borderColorPrice2Object = {
                            name: "border-color2",
                            price: 0
                        }
                        getOptionPrice(borderColorPrice2Object)
                    }else{
                        borderColorName1.value = textColor.name
                        var borderColorPrice1Object = {
                            name: "border-color1",
                            price: 0
                        }
                        getOptionPrice(borderColorPrice1Object)
                    }
                }else{
                    if(activeFace.value === "front-face"){
                        borderColorName1.value = textColor.name
                        var borderColorPrice1Object = {
                            name: "border-color1",
                            price: 0
                        }
                        getOptionPrice(borderColorPrice1Object)
                    }else{
                        borderColorName2.value = textColor.name
                        var borderColorPrice2Object = {
                            name: "border-color2",
                            price: 0
                        }
                        getOptionPrice(borderColorPrice2Object)
                    }
                }
                colorTextColor.value = textColor.codeHex
                // colorForBorder.value = false
                if(firstSetLoad.value){
                    saveStep('select borderColor')
                }
            }
            if(!textColor.sameForBorder){
                // console.log("qsqdqsdqdsqs")
                // colorForBorder.value = true
                if(activeFace.value === "front-face"){
                    changeBorderColor(activeFace1BorderColor.value, activeFace1BorderColorPrice.value)
                }else if(activeFace.value === "back-face"){
                    changeBorderColor(activeFace2BorderColor.value, activeFace2BorderColorPrice.value)
                }
            }
        }else{
            // colorForBorder.value = true
            handleChangeSignColor(name, pattern, textColor, defTextColor, restart)
            // changeBorderColor(firstBorderColor.value.codeHex, firstBorderColor.value.additionalPrice)
            if(activeFace.value === "front-face"){
                changeBorderColor(activeFace1BorderColor.value, activeFace1BorderColorPrice.value)
            }else if(activeFace.value === "back-face"){
                changeBorderColor(activeFace2BorderColor.value, activeFace2BorderColorPrice.value)
            }
        }

        firstColorCheck.value = false
        // if(firstSetLoad.value){
        //     saveStep('select signColor')
        // }
    }

    var allFixings = ref({})
    var fixinggs = ref([])
    var activeFixingId = ref(0)
    var activeFixingMethode = ref('')
    var fixingExcludeShapes = ref({})
    var fixingExcludeSizes = ref({})
    function selectFixingMethode(methode, setting, id){
        // console.log(methode, "select")
        activeFixingId.value = id
        activeFixingMethode.value = methode
        handleSelectFixingMethode(methode)

        if(setting){
            fixingExcludeShapes.value = setting.excludeShapes
            fixingExcludeSizes.value = setting.excludeSizes
            var fixingPrice = setting.additionalPrice
            var fixingPriceObject = {
                name: "fixing",
                price: fixingPrice
            }
            getOptionPrice(fixingPriceObject)
        }

        if(firstSetLoad.value){
            saveStep('slect fixingMethode')
        }

        // let timer;
        // clearTimeout(timer);
        // timer = setTimeout(() => {
        //     centerSign(canvas)
        //     centerSign(canvasBack)
        // }, 150);
    }

    var additionalComponents = ref({})
    var selectedAddComponent = ref("")
    var addComponentSelected = ref([])
    function selectAddComponent(addOption, option, price){

        function addUniqueObject(arr, obj, key) {
            const index = arr.findIndex(item => item[key] === obj[key]);
            if(index !== -1){
                arr[index] = obj;
            }
            else{
                arr.push(obj);
            }
        }
        addUniqueObject(addComponentSelected.value, {option: addOption, value: option}, 'option')

        selectedAddComponent.value = option

        // console.log(addComponentSelected.value, "selected")
        // console.log(addComponentValue.value, "selected fsdfsdf")

        var addOptionPrice = price
        var addOptionPriceObject = {
            type: 'add-component',
            name: addOption,
            price: addOptionPrice
        }
        getOptionPrice(addOptionPriceObject)
    }


    var customAdditionalValues = ref([])
    var noteValue = ref('')
    var dropdownIndex = ref()
    var dropdownValue = ref({})
    function addToOrUpdateArray(arr, id, label, value, price) {
        // if(img){
        //     dropdownIndex.value = id
        //     dropdownExampleImg.value = img
        // }
        // if(img == ''){
        //     dropdownExampleImg.value = ""
        // }
        // Vérifier si l'id existe déjà dans le tableau
        // console.log(dropdownValue.value, "id existe déjà dans le tableau")   
        const existingIndex = arr.findIndex(item => item.id === id);

        if (existingIndex !== -1) {
            // Si l'id existe, mettez à jour les valeurs de l'objet existant
            arr[existingIndex].label = label;
            arr[existingIndex].value = value;
            arr[existingIndex].price = price;
        } else {
            // Si l'index n'existe pas, ajoutez un nouvel objet au tableau
            arr.push({
                id: id,
                label: label,
                value: value,
                price: price,
            });
        }

        if(price){
            customAdditionalValues.value.forEach((element, id) => {
                if(element.price.type === 'base'){
                    var addOptionPrice = element.price.value
                    var addOptionPriceObject = {
                        type: 'add-options',
                        name: element.label,
                        priceType: 'base',
                        price: addOptionPrice,
                    }
                    getOptionPrice(addOptionPriceObject)
                }
                if(element.price.type === 'multiplier'){
                    var addOptionPrice = element.price.value
                    var addOptionPriceObject = {
                        type: 'add-options',
                        name: element.label,
                        priceType: 'multiplier',
                        price: addOptionPrice,
                    }
                    getOptionPrice(addOptionPriceObject)
                }
                if(element.price.type === 'none'){
                    var addOptionPriceObject = {
                        type: 'add-options',
                        name: element.label,
                        price: 0
                    }
                    getOptionPrice(addOptionPriceObject)
                }
            })
        }
    }

    var selectedOption = ref('')
    var selectedId = ref()
    function selectOption(label, price, id){
        selectedId.value = id
        switch(price.type) {
            case 'base':
                selectedOption.value = label + ' (' + '+' + price.value + props.currency + ')';
                break;
            case 'multiplier':
                selectedOption.value = label + ' (' + '+' + price.value + '%)';
                break;
            case 'none':
                selectedOption.value = label;
            break;

        }
    }




    var allClipart = ref({})
    var currentClipart = ref({})
    var clipartId = ref(0)
    var showClipart = ref(false)
    function showClipartImages(cliparts, id){
        showClipart.value = true
        currentClipart.value = cliparts
        clipartId.value = id
    }
    var clipartSection = ref(false)
    function showClipartsSection(statut){
        clipartSection.value = statut
    }
    var recentlyUsedImages = ref([])
    var usedImages = ref([])
    var imageError = ref("")
    var newImagePriceId = ref(0)
    async function addImageToSign(image, price, id){
        // console.log(price, "Added")
        newImagePriceId.value ++
        var currentImages = {}
        try {
            if(image){      
                var imagePrice = price
                var imagePriceObject = {
                    id: newImagePriceId.value,
                    name: image,
                    type: 'image',
                    price: imagePrice
                }
                getOptionPrice(imagePriceObject) 

                currentImages = await handleAddImageToSign(image, newImagePriceId.value, price)
            }else{
                currentImages = await handleAddImageToSign()
            }
            imageError.value = ""
            usedImages.value = currentImages.images
            addRecentImages()
            editImage.value = false
            clipartSection.value = false
        } catch (error) {
            currentImages = error
            imageError.value = error.error;
            usedImages.value = error.images;
            // console.log(imageError.value, "lsdfsdf", usedImages.value);
        }

        if(currentImages != {}){
            // console.log('currentImages', currentImages.images{0})
            // editAddedImage(currentImages.images[0].object)
        }

        if(firstSetLoad.value){
            saveStep('add image to sign')
        }
        // console.log(usedImages.value, "currznt images")
    }

    var recentlyUsedImages = ref([])
    function addRecentImages(){
        function getImages(canva){
            var objects = canva.getObjects();
            for (var i = 0; i < objects.length; i++) {
                if (objects[i].name === "asowp-SignImage") {
                    function addUniqueObject(arr, obj, key1, key2) {
                        const exists = arr.some(item => item[key1] === obj[key1]);
                        if (!exists) {
                            const exists2 = arr.some(item => item[key2] === obj[key2]);
                            if (!exists2) {
                                arr.push(obj);
                            }
                        }
                    }
                    addUniqueObject(recentlyUsedImages.value, {id: objects[i].id, object: objects[i], url: (objects[i].objectType === 'svg' ? objects[i].imageUrl : objects[i].getSrc())}, 'id', 'url')
                }
            }
        }

        let resizeTimer
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            getImages(canvas)
            getImages(canvasBack)
            if(recentlyUsedImages.value.length >= 6){
                recentlyUsedImages.value.shift()
            }
        }, 250); // Délai de 250 millisecondes
        
    }
    function deleteFromRecentlyUsed(index, tab){
        tab.splice(index, 1);
    }
    var activeImageType = ref('no-svg')
    function editAddedImage(image){
        if(activeFace.value === image.canvasName){
            editImage.value = true
            activeCanvas.getObjects().forEach(function(obj){
                if(image.id === obj.id){
                    activeImageType.value = obj.objectType

                    activeCanvas.setActiveObject(obj);
                    handleGetAddedImageValues(obj)
                    selectedImage.value.object = obj
                    selectedImage.value.filters = obj.filters
                    if(obj.objectType === 'svg'){
                        currentSvgColor.value = obj.fill
                    }else{
                        checkFilter()
                    }
                }
            })
        }
    }
    function changeImageWidth(e){
        var newScaleX = e.target.value
        handleChangeImageWidth(newScaleX)
    }
    function changeImageHeight(e){
        var newScaleY = e.target.value
        handleChangeImageHeight(newScaleY)
    }
    function selectImageBorder(){

    }
    var setFilter = ref({
        blur : false,
        greyscale : false,
        sepia : false,
        embross : false,
        sharpen : false,
    })
    function selectImageFilter(filter){
        selectedImage.value.filters = handleSelectFilter(filter)
        checkFilter()
    }
    function checkFilter(){
        if(selectedImage.value.filters.some(item => item['name'] === 'blur')){
            setFilter.value.blur = true
        }else{
            setFilter.value.blur = false
        }

        if(selectedImage.value.filters.some(item => item['name'] === 'greyscale')){
            setFilter.value.greyscale = true
        }else{
            setFilter.value.greyscale = false
        }

        if(selectedImage.value.filters.some(item => item['name'] === 'sepia')){
            setFilter.value.sepia = true
        }else{
            setFilter.value.sepia = false
        }

        if(selectedImage.value.filters.some(item => item['name'] === 'embross')){
            setFilter.value.embross = true
        }else{
            setFilter.value.embross = false
        }

        if(selectedImage.value.filters.some(item => item['name'] === 'sharpen')){
            setFilter.value.sharpen = true
        }else{
            setFilter.value.sharpen = false
        }
    }
    var currentSvgColor = ref('')
    function changeSvgColor(color){
        currentSvgColor.value = handleChangeAddedSvgColor(color)
    }




    var editAction = ref(false)
    var selectedText = ref({
        object: {},
        color: '',
        width: '',
        height: '',
        left: '',
        right: '',
        top: '',
        bottom: '',
        value: '',
        align: 'left',
        font: '',
        size: '',
        weight: 'normal',
        style: '',
        underline: false,
        linethrough: false,
        overline: false,
    })
    // function editText(eventData, transform){
    //     editAction.value = true
    //     var target = transform.target;
	// 	var canvas = target.canvas;
    // }

    var textNumberForSize = ref(0)
    var addedTexts = ref([])
    async function addTextToSign(){
        addedTexts.value =  await handleAddTextToSign()
        // console.log(addedTexts.value, "added text")
        if(addedTexts.value.length > 0){
            var index = addedTexts.value.length - 1
            if(configTextType.value != "normal"){
                getTextObject(addedTexts.value[index], true)
            }else{
                getTextObject(addedTexts.value[index], false)
            }
        }
        textsPrices.value = handleSetPrice()
        var priceObject = {
            name: 'none',
            price: 0
        }
        getOptionPrice(priceObject)
        if(firstSetLoad.value){
            saveStep('add text to sign')
        }
    }
    function getTextObject(object, setActive) {
        if(activeFace.value == object.canvasName){
            selectText.value = true
            object.selected = true;
    
            selectedText.value.value = object.text
            
            activeCanvas.getObjects().forEach(function(obj){
                if(obj.name === "asowp-SignText" && obj.id === object.id){
                    // console.log(obj, "asowp-SignText")
                    if(setActive){
                        activeCanvas.setActiveObject(obj);
                    }
                    handleGetAddedTextValues(obj)
                    selectedText.value.object = obj
                    selectedText.value.color = obj.fill
                    fontFamSelected.value = obj.fontFamily
                    selectedText.value.weight = obj.fontWeight
                    selectedText.value.align = obj.textAlign
                    selectedText.value.style = obj.fontStyle
                    selectedText.value.underline = obj.underline
                    selectedText.value.linethrough = obj.linethrough
                    selectedText.value.overline = obj.overline

                    borderSize.value = obj.strokeWidth
                    borderLayerSize.value = obj.secondStrokeWidth
                    currentTextBorder1Color.value = obj.stroke
                    currentTextBorder2Color.value = obj.secondStroke

                    active3dSide.value = obj.activeSide
                    active3dSideColor.value = obj.sideColor
                }
            })
            activeCanvas.requestRenderAll();
        }
    }
    function changeText(){
        selectText.value = false
    }

    var maxTextCharForSize = ref(0)
    function changeTextValue(event){
        handleChangeTextValue(event)

        textsPrices.value = handleSetPrice()
        var priceObject = {
            name: 'none',
            price: 0
        }
        getOptionPrice(priceObject)
    }
    function changeTextWeight(){
        var weight = handleChangeTextWeight()
        selectedText.value.weight = weight
    }
    function changeTextAlign(align){
        selectedText.value.align = handleChangeTextAlign(align)
    }
    function changeTextStyle(){
        selectedText.value.style = handleChangeTextStyle()
    }
    function changeTextSize(size, min, max){
        handleChangeTextSize(parseInt(size), min, max)
    }
    function changeTextSizeValue(statut){
        var max = configTextFontSettings.value.maximumFontSize
        var min = configTextFontSettings.value.minimumFontSize
        var input = document.getElementById('asowp-text-size')

        if(route.name === 'template-maker'){
            if(statut === 'up'){
                if(input.value < max){
                    input.stepUp()
                    handleChangeTextSize(parseInt(input.value), min, max)
                }
            } else if(statut === 'down'){
                if(input.value > min){
                    input.stepDown()
                    handleChangeTextSize(parseInt(input.value), min, max)
                }
            }
        }else{
            if(selectedText.value.object.lockScale === false){
                // console.log(selectedText.value.object.lockScale, "lock scale")
                if(statut === 'up'){
                    if(input.value < max){
                        input.stepUp()
                        handleChangeTextSize(parseInt(input.value), min, max)
                    }
                } else if(statut === 'down'){
                    if(input.value > min){
                        input.stepDown()
                        handleChangeTextSize(parseInt(input.value), min, max)
                    }
                }
            }
        }
    }
    var fontFamSelected = ref("Arial")
    var allFonts = ref([])
    async function changeTextFontFam(font, url, index){
        fontFamSelected.value = font
        await handleChangeTextFontFam(font, url)
    }
    var customTextColor = ref("#000000")
    function changeTextColor(color){
        selectedText.value.color = handleChangeTextColor(color)
    }
    function underlineText(){
        selectedText.value.underline = handleUnderlineText()
    }
    function crossText(){
        selectedText.value.linethrough = handleCrossText()
    }
    function overlineText(){
        selectedText.value.overline = handleOverlineText()
    }
    var borderSize = ref(2)
    var borderLayerSize = ref(2)
    function changeTextBorder(layer, e){
        if(layer){
            borderLayerSize.value = e.target.value
        }else{
            borderSize.value = e.target.value
        }
        handleChangeTextBorder(layer, e.target.value)
    }
    var borderLineJoin = ref("round")
    function changeBorderLineJoin(join){
        borderLineJoin.value = join
        handleChangeBorderLineJoin(join)
    }
    var firstBorder = ref(true)
    var currentTextBorder1Color = ref("")
    var currentTextBorder2Color = ref("")
    function changeTextBorderColor(color){
        if(firstBorder.value){
            currentTextBorder1Color.value = color
        }else{
            currentTextBorder2Color.value = color
        }       
         handleChangeTextBorderColor(firstBorder.value, color)
    }
    var active3dSide = ref(true)
    function show3dSide(){
        active3dSide.value = !active3dSide.value
        handleShow3dSide(active3dSide.value)
    }
    var active3dSideColor = ref("")
    function change3dSideColor(color){
        active3dSideColor.value = color
        handleChange3dSideColor(color)
    }
    var curentTextLightColor = ref("")
    function changeTextLightColor(color){
        curentTextLightColor.value = color
        handleChangeTextLightColor(color)
    }


    function changeTextBackground(textObject){

    }

    var selectedImage = ref({
        object: {},
        width: '',
        height: '',
        left: '',
        right: '',
        top: '',
        bottom: '',
        angle: 0,
        filters: [],
    })
    function turnLeftImage(){
        if(route.name === 'template-maker'){
            handleTurnImageLeft()
        }else{
            if(selectedImage.value.object.lockRotate === false){
                handleTurnImageLeft()
            }
        }
    }
    function turnRightImage(){
        if(route.name === 'template-maker'){
            handleTurnRightImage()
        }else{
            if(selectedImage.value.object.lockRotate === false){
                handleTurnRightImage()
            }
        }
    }
    function flipImage(){
        handleFlipImage()
    }

    var optionsPrices = ref([])
    var textsPrices = ref(0)
    var finalPrices = ref(0)
    function getOptionPrice(priceObject){
        textsPrices.value = handleSetPrice()
        function addUniqueObject(arr, obj, key) {
            if(obj.type === 'image'){
                const index = arr.findIndex(item => item.id === obj.id)
                if(index !== -1){
                    arr[index] = obj;
                }
                else{
                    arr.push(obj);
                }
            }else{
                const index = arr.findIndex(item => item.name === obj.name);
                if(index !== -1){
                    arr[index] = obj;
                }
                else{
                    arr.push(obj);
                }
            }
        }
        if(priceObject){
            addUniqueObject(optionsPrices.value, priceObject, 'name')
        }
        // console.log(optionsPrices.value, "priceObject")

        function removeObjectByName(arr, name) {
            const index = arr.findIndex(item => item.name === name);
            if(index !== -1){
                arr.splice(index, 1);
            }
        }
        function removeObjectByType(arr, type){
            const index = arr.findIndex(item => item.type === type);
            if(index !== -1){
                arr.splice(index, 1);
            } 
        }
        function sumOptionsPrice(arr, key) {
            // var newPrice = 0
            // var multiple = 0
            // var index = 0
            // while (index < arr.length){
            //     if(arr[index].priceType === 'multiplier'){
            //         multiple = multiple + arr[index].price
            //         // newPrice = newPrice * multiple
            //     }else { 
            //         // newPrice = newPrice + arr[index].price
            //         if(multiple === 0){
            //             newPrice = (newPrice + arr[index].price) * 1
            //         }else{
            //             newPrice = (newPrice + arr[index].price) * multiple
            //         }
            //     }
                
            //     index++;
            // }
            // arr.forEach((object, id) => {
            // })
            // arr.reduce((sum, obj) => sum + obj[key], 0);

            let baseSum = 0;
            let multipliers = [];
            let present = false;

            for (const item of arr) {
                if (item.priceType === 'multiplier') {
                    multipliers.push(item.price);
                    present = true;
                }else{
                    baseSum += item.price;
                } 
            }

            let totalPrice = baseSum;
            if(present){
                totalPrice *= multipliers.reduce((sum, obj) => sum + obj, 0);
            }else{
                totalPrice *= multipliers.reduce((sum, obj) => sum + obj, 1);
            }
            
            return totalPrice
        }
        if(priceObject){
            if(materialType.value === 'advance'){
                removeObjectByName(optionsPrices.value, 'none')
                removeObjectByName(optionsPrices.value, 'shape')
                removeObjectByName(optionsPrices.value, 'color1')
                removeObjectByName(optionsPrices.value, 'color2')
                removeObjectByName(optionsPrices.value, 'border1')
                removeObjectByName(optionsPrices.value, 'border2')
    
                removeObjectByType(optionsPrices.value, 'add-component')
    
                // console.log("options pricing advance", optionsPrices.value)
                // console.log("PRIX TOTAL",sumOptionsPrice(optionsPrices.value, 'price'))
    
            }else{
                removeObjectByName(optionsPrices.value, 'none')
                removeObjectByName(optionsPrices.value, 'model')
            }
        }
        finalPrices.value = sumOptionsPrice(optionsPrices.value, 'price') + textsPrices.value;
    }

    var finish = ref(false)
    var configData = ref({})
    var templateData = ref({})
    async function finishConfig(){
        closeObjectValues()
        var heightValue = handleGetObjectByName('height-value', canvas)
        var widthValue = handleGetObjectByName('width-value', canvas)
        var thicknessValue = 'none'
        switch(currentSizeThickness.value) {
            case false:
                thicknessValue = 'none'
            break;
            case true:
                thicknessValue = String(currentThickValue.value + " " + configSettings.value.customizerSign.customizerOptions.measurementUnit)
            break;
        }

        function getBorderColor(border, canva){
            var color = ""
            if(border === 'none'){
                var sign = handleGetObjectByName('safeObject', canva)
                color = sign.stroke
            }
            if(border === 'normal'){
                var sign = handleGetObjectByName('normal-border', canva)
                color = sign.fill
            }
            if(border === 'old-world'){
                var borderObject = handleGetObjectByName('old-world-border', canva)
                color = borderObject.fill
            }
            if(border === 'rounded-corners'){
                var borderObject = handleGetObjectByName('rounded-corners-border', canva)
                color = borderObject.stroke
            }

            return color
        }

        // console.log(getBorderColor(activeFace1Border.value, canvas))


        var textObjects = []
        var imageObjects = []
        
        var objects = canvas.getObjects();
        for (var i = 0; i < objects.length; i++) {
            if (objects[i].name === "asowp-SignText") {
                function addUniqueObject(arr, obj, key) {
                    const exists = arr.some(item => item[key] === obj[key]);
                    if (!exists) {
                        arr.push(obj);
                    }
                }
                addUniqueObject(textObjects, objects[i], 'id')
            }
            if (objects[i].name === "asowp-SignImage") {
                function addUniqueObject(arr, obj, key) {
                    const exists = arr.some(item => item[key] === obj[key]);
                    if (!exists) {
                        arr.push(obj);
                    }
                }
                addUniqueObject(imageObjects, objects[i], 'id')
            }
        }
        var addedObject = handleFinishConfiguration(textObjects, imageObjects)


        var designImagesFace1 = []
        async function generateOutputImage(tab, canva) {
            switch (configOutputSettings.value.filesFormat) {
                case 'png':
                    tab.push({format: 'png', url: await genImage(canva, 'png')})
                break;

                case 'jpeg':
                    tab.push({format: 'jpeg', url: await genImage(canva, 'jpeg')})
                break;

                case 'svg':
                    tab.push({format: 'svg', url: await genImage(canva, 'svg')})
                break;

                case 'png+jpeg':
                    tab.push({format: 'png', url: await genImage(canva, 'png')})
                    tab.push({format: 'jpeg', url: await genImage(canva, 'jpeg')})
                break;

                case 'png+svg':
                    tab.push({format: 'png', url: await genImage(canva, 'png')})
                    tab.push({format: 'svg', url: await genImage(canva, 'svg')})
                break;

                case 'jpeg+svg':
                    tab.push({format: 'jpeg', url: await genImage(canva, 'jpeg')})
                    tab.push({format: 'svg', url: await genImage(canva, 'svg')})
                break;
            }

            // var pdfBlob = generateHighResolutionImage(canva, 'pdf')
            // const pdfUrl = URL.createObjectURL(pdfBlob)
            // tab.push({format: 'pdf', url: pdfUrl})
            
            return tab
        }

        configData.value = {
            sign: {
                size: {
                    label: (configVisualiserTexts.value.textSize && configVisualiserTexts.value.textSize.trim() != '' ? configVisualiserTexts.value.textSize : 'Size'),
                    value: {
                        width: {
                            label: (configVisualiserTexts.value.textWidth && configVisualiserTexts.value.textWidth.trim() != '' ? configVisualiserTexts.value.textWidth : 'Width'),
                            value: widthValue.text
                        },
                        height: {
                            label: (configVisualiserTexts.value.textHeight && configVisualiserTexts.value.textHeight.trim() != '' ? configVisualiserTexts.value.textHeight : 'Height'),
                            value: heightValue.text
                        },
                        thickness: {
                            label: (configVisualiserTexts.value.thickness && configVisualiserTexts.value.thickness.trim() != '' ? configVisualiserTexts.value.thickness : 'thickness'),
                            value: (currentThickValue.value !== -99 ? thicknessValue : 'none'),
                        }
                    }
                },
                shape: { 
                    label: (configVisualiserTexts.value.textShape && configVisualiserTexts.value.textShape.trim() != '' ? configVisualiserTexts.value.textShape : 'Shape'),
                    value: selectedShape.value,
                },
                color: {
                    label: (configVisualiserTexts.value.textColor && configVisualiserTexts.value.textColor.trim() != '' ? configVisualiserTexts.value.textColor : 'Colors'),
                    value: {
                        id: activeSignColoriD.value,
                        name: activeSignColor.value,
                        codeHex: activeSignColorCode1.value,
                        textColor: {
                            active: signTextColor1.value.active,
                            name: (signTextColor1.value.active ? colorTextColorName1.value : null),
                            codeHex: (signTextColor1.value.active ? colorTextCodeHex1.value : null),
                        }
                    },
                },
                border: {
                    label: (configVisualiserTexts.value.textBorder && configVisualiserTexts.value.textBorder.trim() != '' ? configVisualiserTexts.value.textBorder : 'Borders'),
                    value: {
                        type: activeFace1Border.value,
                        color: (activeFace1Border.value == 'none' ? null : (signTextColor1.value.active && !colorForBorder1.value ? colorTextColorName1.value : borderColorName1.value)),
                        codeHex: (activeFace1Border.value == 'none' ? null : getBorderColor(activeFace1Border.value, canvas)),
                    },
                },
                fixingMethod: {
                    label: (configVisualiserTexts.value.textFixingMethods && configVisualiserTexts.value.textFixingMethods.trim() != '' ? configVisualiserTexts.value.textFixingMethods : 'Fixing method'),
                    value: activeFixingMethode.value
                },
            },
            texts: {
                label: (configVisualiserTexts.value.textOptionText && configVisualiserTexts.value.textOptionText.trim() != '' ? configVisualiserTexts.value.textOptionText : 'Texts'),
                value: addedObject.texts,
            },
            images: {
                label: (configVisualiserTexts.value.textImage && configVisualiserTexts.value.textImage.trim() != '' ? configVisualiserTexts.value.textImage : 'Images'),
                value: addedObject.images,
            },
            additionalComponents: (addComponentSelected.value.length > 0 ? addComponentSelected.value : []),
            additionalOptions: (customAdditionalValues.value.length > 0 ? customAdditionalValues.value : []),
            designImages: await generateOutputImage(designImagesFace1, canvas),
            output:{
                prefix: (configOutputSettings.value.zipOutputFiles.active ? configOutputSettings.value.zipOutputFiles.zipOutFolderPrefix : ''),
                designDisplayComposition: configOutputSettings.value.designComposition
            }

        }

        var face2AddedObject = {}
        if(configDoublePart.value.active){
            var face2TextObjects = []
            var face2ImageObjects = []
            var objects = canvasBack.getObjects();

            for (var i = 0; i < objects.length; i++) {
                if (objects[i].name === "asowp-SignText") {
                    function addUniqueObject(arr, obj, key) {
                        const exists = arr.some(item => item[key] === obj[key]);
                        if (!exists) {
                            arr.push(obj);
                        }
                    }
                    addUniqueObject(face2TextObjects, objects[i], 'id')
                }
                if (objects[i].name === "asowp-SignImage") {
                    function addUniqueObject(arr, obj, key) {
                        const exists = arr.some(item => item[key] === obj[key]);
                        if (!exists) {
                            arr.push(obj);
                        }
                    }
                    addUniqueObject(face2ImageObjects, objects[i], 'id')
                }
            }
            face2AddedObject = handleFinishConfiguration(face2TextObjects, face2ImageObjects)

            var designImagesFace2 = []

            configData.value = {
                faces: {
                    face1: configDoublePart.value.part1,
                    face2: configDoublePart.value.part2,
                },
                sign: {
                    size: {
                        label: (configVisualiserTexts.value.textSize && configVisualiserTexts.value.textSize.trim() != '' ? configVisualiserTexts.value.textSize : 'Size'),
                        value: {
                            width: {
                                label: (configVisualiserTexts.value.textWidth && configVisualiserTexts.value.textWidth.trim() != '' ? configVisualiserTexts.value.textWidth : 'Width'),
                                value: widthValue.text
                            },
                            height: {
                                label: (configVisualiserTexts.value.textHeight && configVisualiserTexts.value.textHeight.trim() != '' ? configVisualiserTexts.value.textHeight : 'Height'),
                                value: heightValue.text
                            },
                            thickness: {
                                label: (configVisualiserTexts.value.thickness && configVisualiserTexts.value.thickness.trim() != '' ? configVisualiserTexts.value.thickness : 'thickness'),
                                value: (currentThickValue.value !== -99 ? thicknessValue : 'none'),
                            }
                        }
                    },
                    shape: { 
                        label: (configVisualiserTexts.textShape && configVisualiserTexts.textShape.trim() != '' ? configVisualiserTexts.textShape : 'Shape'),
                        value: selectedShape.value,
                    },
                    color: {
                        label: (configVisualiserTexts.textColor && configVisualiserTexts.textColor.trim() != '' ? configVisualiserTexts.textColor : 'Colors'),
                        value: {
                            face1: {
                                id: activeSignColoriD.value,
                                name: activeSignColor.value,
                                codeHex: activeSignColorCode1.value,
                                textColor: {
                                    active: signTextColor1.value.active,
                                    name: (signTextColor1.value.active ? colorTextColorName1.value : null),
                                    codeHex: (signTextColor1.value.active ? colorTextCodeHex1.value : null),
                                }
                            },
                            face2: {
                                id: activeSignFace2ColoriD.value,
                                name: activeSignFace2Color.value,
                                codeHex : activeSignColorCode2.value,
                                textColor: {
                                    active: signTextColor2.value.active,
                                    name: (signTextColor2.value.active ? colorTextColorName2.value : null),
                                    codeHex: (signTextColor2.value.active ? colorTextCodeHex2.value : null),
                                }
                            },
                        },
                    },
                    border: {
                        label: (configVisualiserTexts.value.textBorder && configVisualiserTexts.value.textBorder.trim() != '' ? configVisualiserTexts.value.textBorder : 'Borders'),
                        value: {
                            face1: {
                                type: activeFace1Border.value,
                                color: (activeFace1Border.value == 'none' ? null : (signTextColor1.value.active && !colorForBorder1.value ? colorTextColorName1.value : borderColorName1.value)),
                                codeHex: (activeFace1Border.value == 'none' ? null : getBorderColor(activeFace1Border.value, canvas)),
                            },
                            face2: {
                                type: activeFace2Border.value,
                                color: (activeFace2Border.value == 'none' ? null : (signTextColor2.value.active && !colorForBorder2.value ? colorTextColorName2.value : borderColorName2.value)),
                                codeHex: (activeFace2Border.value == 'none' ? null : getBorderColor(activeFace2Border.value, canvasBack)),
                            },
                        },
                    },
                    fixingMethod: {
                        label: (configVisualiserTexts.value.textFixingMethods && configVisualiserTexts.value.textFixingMethods.trim() != '' ? configVisualiserTexts.value.textFixingMethods : 'Fixing method'),
                        value: activeFixingMethode.value
                    },
                },
                texts: {
                    label: (configVisualiserTexts.value.textOptionText && configVisualiserTexts.value.textOptionText.trim() != '' ? configVisualiserTexts.value.textOptionText : 'Texts'),
                    value: {
                        face1 :addedObject.texts,
                        face2 :face2AddedObject.texts
                    }
                },
                images: {
                    label: (configVisualiserTexts.value.textImage && configVisualiserTexts.value.textImage.trim() != '' ? configVisualiserTexts.value.textImage : 'Images'),
                    value: {
                        face1 :addedObject.images,
                        face2 :face2AddedObject.images
                    }
                },
                additionalComponents: (addComponentSelected.value.length > 0 ? addComponentSelected.value : []),
                additionnalOptions: (customAdditionalValues.value.length > 0 ? customAdditionalValues.value : []),
                designImages: {
                    face1: designImagesFace1,
                    face2: await generateOutputImage(designImagesFace2, canvasBack),
                },
                output:{
                    prefix: (configOutputSettings.value.zipOutputFiles.active ? configOutputSettings.value.zipOutputFiles.zipOutFolderPrefix : ''),
                    designDisplayComposition: configOutputSettings.value.designComposition
                }
            }

        }


        if(route.name == 'template-maker'){
            function supprimerNonChiffres(chaine) {
                return chaine.replace(/[^0-9.]/g, '');
            }
            var jsonData1 = canvas.toJSON(['fill', 'name', 'id', 'selectable', 'canvasName', 'priceId', 'uniScaleTransform', 'centeredScaling', 'lockScalingFlip',"lockMoving", "lockScale", "lockRotate", "lockEdition", "fixingRatio", "fixingScale", "ratioScale", "source", "objectType", "imageUrl", "fontFamilyUrl", "neonColor", "glowRadius", "secondStrokeWidth", "secondStroke", "activeSide", "sideColor"])
            var canvas1AsJson = JSON.stringify(jsonData1)
            var current1State = JSON.parse(canvas1AsJson);

            var jsonData2 = canvasBack.toJSON(['fill', 'name', 'id', 'selectable', 'canvasName', 'priceId', 'uniScaleTransform', 'centeredScaling', 'lockScalingFlip',"lockMoving", "lockScale", "lockRotate", "lockEdition", "fixingRatio", "fixingScale", "ratioScale", "source", "objectType", "imageUrl", "fontFamilyUrl", "neonColor", "glowRadius", "secondStrokeWidth", "secondStroke", "activeSide", "sideColor"])
            var canvas2AsJson = JSON.stringify(jsonData2)
            var current2State = JSON.parse(canvas2AsJson);


            templateData.value = {
                sign: {
                    doubleFace: configDoublePart.value.active,
                    material: {
                        name: selectedMaterial.value,
                        id: currentMaterialId.value,
                        type: materialType.value,
                        advanceComponent: {
                            component: (materialType.value == 'advance' ? advancedComponent.value : null),
                            option: {
                                data: activeSignModel.value,
                                id: activeSignModelId.value
                            }
                        }
                    },
                    size: {
                        width: supprimerNonChiffres(widthValue.text),
                        height: supprimerNonChiffres(heightValue.text),
                        maxChars: maxTextCharForSize.value,
                        thickness: {
                            avtive: currentSizeThickness.value,
                            value: (currentThickValue.value !== -99 ? thicknessValue : 'none'),
                        },
                        ratioScale: activeCanvas.ratioScale,
                        unit: configSettings.value.customizerSign.customizerOptions.measurementUnit,
                        setting: currentSizeSetting.value,
                    },
                    shape: selectedShape.value,
                    color: {
                        face1: {
                            id: activeSignColoriD.value,
                            name: activeSignColor.value,
                            codeHex: activeSignColorCode1.value,
                            textColor: {
                                active: signTextColor1.value.active,
                                sameForBorder: signTextColor1.value.sameForBorder,
                                name: (signTextColor1.value.active ? colorTextColorName1.value : null),
                                codeHex: (signTextColor1.value.active ? colorTextCodeHex1.value : null),
                            }
                        },
                        face2: {
                            id: activeSignFace2ColoriD.value,
                            name: activeSignFace2Color.value,
                            codeHex : activeSignColorCode2.value,
                            textColor: {
                                active: signTextColor2.value.active,
                                sameForBorder: signTextColor2.value.sameForBorder,
                                name: (signTextColor2.value.active ? colorTextColorName2.value : null),
                                codeHex: (signTextColor2.value.active ? colorTextCodeHex2.value : null),
                            }
                        },
                    },
                    border: {
                        face1: {
                            type: activeFace1Border.value,
                            color: (activeFace1Border.value == 'none' ? null : (signTextColor1.value.active && !colorForBorder1.value ? colorTextColorName1.value : borderColorName1.value)),
                            codeHex: (activeFace1Border.value == 'none' ? null : getBorderColor(activeFace1Border.value, canvas)),
                        },
                        face2: {
                            type: activeFace2Border.value,
                            color: (activeFace2Border.value == 'none' ? null : (signTextColor2.value.active && !colorForBorder2.value ? colorTextColorName2.value : borderColorName2.value)),
                            codeHex: (activeFace2Border.value == 'none' ? null : getBorderColor(activeFace2Border.value, canvasBack)),
                        },
                    },
                    fixingMethod: {
                        type: activeFixingMethode.value,
                        ratio: activeCanvas.fixingRatio,
                        scale: activeCanvas.fixingScale,
                    },
                },
                texts: {
                    face1 :addedObject.texts,
                    face2 :(face2AddedObject != {} ? face2AddedObject.texts : null)
                },
                images: {
                    face1 :addedObject.images,
                    face2 :(face2AddedObject != {} ? face2AddedObject.images : null)
                },
                designImages: {
                    face1: designImagesFace1,
                    face2: (configDoublePart.value.active ? await generateOutputImage(designImagesFace2, canvasBack) : []),
                },
                template:{
                    face1: current1State,
                    face2: current2State,
                },
                price: {
                    value: parseFloat(asowp_configurator_data.regularPrice) + finalPrices.value,
                    array: optionsPrices.value,
                    textAfter: configVisualiserTexts.value.textAfterPrice,
                },
                additionalOptions: customAdditionalValues.value,
            }
            console.log(templateData.value, "template")
        }



        console.log(configData.value, "Added")
        finish.value = true
        if(configTextType.value != 'neon'){
            await genImage(canvas, 'svg', 'finish-1')
        }else{
            prevImg.value = await genImage(canvas, 'png', 'preview')
        }
        if(configDoublePart.value.active){
            if(configTextType.value != 'neon'){
                await genImage(canvasBack, 'svg', 'finish-2')
            }else{
                prevImgBack.value = await genImage(canvasBack, 'png', 'preview')
            }
        }

    }

    var showImg = ref(false)
    var prevImg = ref("")
    var prevImgBack = ref("")
    function closeprevImg(){
        showImg.value = false
        currentSceneId.value = -1
        currentSceneUrl.value = 'none'
    }
    const showPreview = ref(null)
    async function showConfigRender(){
        showImg.value = true

        if(configDoublePart.value.active){
            if(activeFace.value === "front-face"){
                if(configOutputSettings.value.waterMark && configOutputSettings.value.waterMark != ''){
                    if(configTextType.value == 'neon'){
                        prevImg.value = await genImageWithWatermark(canvas, 'png', 'preview');
                    }else{
                        prevImg.value = await genImageWithWatermark(canvas, 'svg', 'preview');
                    }
                }else{
                    if(configTextType.value == 'neon'){
                        prevImg.value = await genImage(canvas, 'png', 'preview');
                    }else{
                        prevImg.value = await genImage(canvas, 'svg', 'preview');
                    }
                }
            }else if(activeFace.value === "back-face"){
                if(configOutputSettings.value.waterMark && configOutputSettings.value.waterMark != ''){
                    // prevImg.value = await genImageWithWatermark(canvasBack, 'svg', 'preview', 1317, 622);
                    if(configTextType.value == 'neon'){
                        prevImg.value = await genImageWithWatermark(canvasBack, 'png', 'preview', 1317, 622);
                    }else{
                        prevImg.value = await genImageWithWatermark(canvasBack, 'svg', 'preview', 1317, 622);
                    }
                }else{
                    if(configTextType.value == 'neon'){
                        prevImg.value = await genImage(canvasBack, 'png', 'preview');
                    }else{
                        prevImg.value = await genImage(canvasBack, 'svg', 'preview');
                    }
                }
            }
        }else{
            if(configOutputSettings.value.waterMark && configOutputSettings.value.waterMark != ''){
                if(configTextType.value == 'neon'){
                    prevImg.value = await genImageWithWatermark(canvas, 'png', 'preview');
                }else{
                    prevImg.value = await genImageWithWatermark(canvas, 'svg', 'preview');
                }
            }else{
                if(configTextType.value == 'neon'){
                    prevImg.value = await genImage(canvas, 'png', 'preview');
                }else{
                    prevImg.value = await genImage(canvas, 'svg', 'preview');
                }
            }
        }
    }
    async function downLoadConfigRender(){
        if(configDoublePart.value.active){
            if(configOutputSettings.value.waterMark && configOutputSettings.value.waterMark != ''){
                await genImageWithWatermark(canvas, 'svg', 'download', 1317, 622);
                await genImageWithWatermark(canvasBack, 'svg', 'download', 1317, 622);
            }else{
                await genImage(canvas, 'svg', 'download');
                await genImage(canvasBack, 'svg', 'download');
            }
        }else{
            if(configOutputSettings.value.waterMark && configOutputSettings.value.waterMark != ''){
                await genImageWithWatermark(canvas, 'svg', 'download', 1317, 622);
            }else{
                await genImage(canvas, 'svg', 'download');
                // await genImage(canvas, 'png', 'download');
            }
        }
    }
    var currentSceneId = ref(-1)
    var currentSceneUrl = ref('none')
    function slideSceneImage(to){
        var previewDiv = document.getElementById('showPreview')
        var scenes = configImageSettings.value.scenes
        if (scenes.length > 0) {
            if (to === 'right' && currentSceneId.value < scenes.length - 1) {
                currentSceneId.value += 1;
                currentSceneUrl.value = scenes[currentSceneId.value]
                setPreviewScene(scenes[currentSceneId.value], currentSceneId.value);
            } else if (to === 'left' && currentSceneId.value > -1) {
                currentSceneId.value -= 1;
                currentSceneUrl.value = scenes[currentSceneId.value]
                if (currentSceneId.value === -1) {
                    // Condition particulière pour l'indice -1
                    setPreviewScene('none', -1)
                } else {
                    setPreviewScene(scenes[currentSceneId.value], currentSceneId.value);
                }
            }
            // console.log(scenes.length, currentSceneId.value, to);
        }
        
    }
    function setPreviewScene(url, index){
        // console.log(url, index)
        var previewDiv = document.getElementById('showPreview')

        if (previewDiv) {
            if(url == 'none'){
                var removableDiv = previewDiv.querySelector('div');
                if(removableDiv){
                    previewDiv.removeChild(removableDiv);
                }

                currentSceneId.value = -1
                currentSceneUrl.value = 'none'
            }else{
                var removableDiv = previewDiv.querySelector('div');
                if(removableDiv){
                    previewDiv.removeChild(removableDiv);
                }
    
                var sceneClass = 'animated-bg asowp-w-full asowp-h-full asowp-absolute asowp-z-0 asowp-animate-slideToleft asowp-duration-300'
                currentSceneId.value = index
                currentSceneUrl.value = url
    
                // Définir l'image en arrière-plan dans une nouvelle div
                const imgDiv = document.createElement('div');
                imgDiv.className = sceneClass;
                imgDiv.style.backgroundImage = `url(${url})`;
                // previewDiv.style.backgroundImage = `url(${url})`;
                imgDiv.style.backgroundSize = 'cover'; // Pour couvrir toute la div
                imgDiv.style.backgroundPosition = 'center'; // Centrer l'image
                imgDiv.style.backgroundRepeat = 'no-repeat'; // Ne pas répéter l'image
                
                previewDiv.appendChild(imgDiv);
            }

            // console.log(imgDiv);
        }
    }



    function newCenterTool(canva){
        const originalPositions = canva.getObjects().map(obj => ({
            id: obj.id,
            left: obj.left,
            top: obj.top
        }));

        // Créer un groupe avec tous les objets du canvas
        const group = new fabric.Group(canva.getObjects(), {
            originX: 'center',
            originY: 'center'
        });

        // Centrer le groupe sur le canvas
        group.center();

        // Ajouter le groupe au canvas
        canva.add(group);

        // Supprimer les objets individuels du canvas (facultatif)
        canva.getObjects().forEach(obj => {
            if (obj !== group) {
                obj.set("visible", false);
            }
        });


        group.toActiveSelection();
        canva.getActiveObjects().forEach((obj, index) => {
            const originalPosition = originalPositions.find(pos => pos.id === obj.id);
            if (originalPosition) {
                obj.set({
                    left: originalPosition.left,
                    top: originalPosition.top
                });
            }
            canva.add(obj);
        });
        canva.discardActiveObject().renderAll();
    }

    // function applyNeonEffectToSVG(svgString, canva) {
    //     var neonTextArray = canva.getObjects().filter(obj => obj.name === "asowp-SignText" && obj.type === "neon-Text")
    //     // Parser le SVG en un document DOM
    //     const parser = new DOMParser();
    //     const svgDoc = parser.parseFromString(svgString, 'image/svg+xml');

    //     // Récupérer tous les éléments <text> dans le SVG
    //     const textElements = svgDoc.querySelectorAll('text');

    //     textElements.forEach(textElement => {
    //         // Récupérer le contenu du texte
    //         // const textContent = textElement.textContent.trim();
    //         const textContent = textElement.textContent;

    //         console.log(textContent, "rtyeotyeority", textElement)

    //         // Trouver l'objet correspondant dans le tableau neonTextArray
    //         const neonText = neonTextArray.find(item => item.text === textContent);

    //         if (neonText) {
    //             // Appliquer l'effet néon avec text-shadow
    //             textElement.setAttribute('style', `text-shadow: ${neonText.neonColor} 1px 0 20px; fill: ${neonText.fill}`);
    //             // textElement.setAttribute('font-size', `100px`);
    //         }
    //     });

    //     // Convertir le document SVG modifié en chaîne de caractères
    //     const serializer = new XMLSerializer();
    //     return serializer.serializeToString(svgDoc.documentElement);
    // }

    function applyNeonEffectToSVG(svgString, canva) {
        var neonTextArray = canva.getObjects().filter(obj => obj.name === "asowp-SignText" && obj.type === "neon-Text")
        // Parser le SVG en un document DOM
        const parser = new DOMParser();
        const svgDoc = parser.parseFromString(svgString, 'image/svg+xml');

        // Récupérer tous les éléments <text> dans le SVG
        const textElements = svgDoc.querySelectorAll('text');

        textElements.forEach(textElement => {
            // Récupérer tous les <tspan> à l'intérieur de <text>
            const tspanElements = textElement.querySelectorAll('tspan');

            tspanElements.forEach(tspan => {
                const textContent = tspan.textContent;

                // Trouver l'objet correspondant dans neonTextArray
                const neonText = neonTextArray.find(item => item.text.includes(textContent.trim()));

                if (neonText) {
                    // Appliquer l'effet néon avec text-shadow au <tspan> individuellement
                    tspan.setAttribute('style', `text-shadow: ${neonText.neonColor} 1px 0 20px; fill: ${neonText.fill}`);
                }
            });
        });

        // Convertir le document SVG modifié en chaîne de caractères
        const serializer = new XMLSerializer();
        return serializer.serializeToString(svgDoc.documentElement);
    }

    
    var imageCanvasRef = ref(null);
    async function getFontAsBase64(url) {
        const response = await fetch(url);
        const blob = await response.blob();
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.readAsDataURL(blob);
        });
    }
    // async function genImage(canva, format, purpose, width, height) {
    //     try{
    //         var currentWidth = canva.width
    //         var currentHeight = canva.height

    //         // Redimensionne le canvas si les nouvelles dimensions sont spécifiées
    //         // if (width && height) {
    //         //     canva.setWidth(width);
    //         //     canva.setHeight(height);
    //         //     checkScreenSize(width, height)
    //         // }

    //         var sign = handleGetObjectByName('safeObject', canva)          // img.scaleToHeight(40);
    //         const optionsPreview = {
    //             width: '100%',
    //             height: '100%',
    //             // viewBox: {
    //             //     x: -100,
    //             //     y: -50,
    //             //     width: canva.width+300,
    //             //     height: canva.height+300
    //             // },
    //             encoding: 'UTF-8' // optionnel, mais recommandé pour la compatibilité
    //         };

    //         const options = {
    //             width: '1900px',  // ou la largeur que vous souhaitez
    //             height: '1080px', // ou la hauteur que vous souhaitez
    //             encoding: 'UTF-8' // optionnel, mais recommandé pour la compatibilité
    //         };
    //         function checkWoff2(chaine) {
    //             return chaine.endsWith('.woff2');
    //         }
    //         function hasExtendedLowercase(text, font, xHeight, fontSize) {
    //             if (typeof text !== 'string') {
    //                 console.error('Text must be a string');
    //                 return false;
    //             }
    //             const testChars = ['a', 'x', 'o', 'n', 'm']; // Caractères de base pour la hauteur
    //             const testExtendsChars = ['g', 'j', 'p', 'q', 'y'];
                
    //             // let hasSame = false;
    //             // for (let char of testChars) {
    //             //     if (char.match(/[a-z]/)) {
    //             //         let path = font.getPath(char, 0, 0, fontSize);
    //             //         let bbox = path.getBoundingBox();
    //             //         console.log(xHeight, (bbox.y2 - bbox.y1), "erettrtretrre")
    //             //         if (xHeight > bbox.y2 - bbox.y1) {
    //             //             return true;
    //             //         }
    //             //     }
    //             // }
    //             for (let char of testExtendsChars) {
    //                 if (char.match(/[a-z]/)) {
    //                     let path = font.getPath(char, 0, 0, fontSize);
    //                     let bbox = path.getBoundingBox();
    //                     // console.log((bbox.y2 - bbox.y1), xHeight , "syojiçyboytrh")
    //                     // console.log((bbox.y2 - bbox.y1), xHeight*0.9 , "sfudbgpgoiebiàbj,yojiçyboytrh")
    //                     if (xHeight*0.9 > bbox.y2 - bbox.y1) {
    //                         return true;
    //                     }
    //                 }
    //             }
    //             return false;
    //         }
    //         async function drawnPathFromText() {
    //             return new Promise((resolve, reject) => {
    //                 var elements = canva.getObjects()
    //                 let promises = []

    //                 elements.forEach((object, index) => {
    //                     // if (object.name === 'asowp-SignText') {
    //                     //     if (!checkWoff2(object.fontFamily)) {
    //                     //         let promise = (async () => {
    //                     //             try {
    //                     //                 var buffer = await fetch(object.fontFamilyUrl).then(res => res.arrayBuffer());
    //                     //                 var font = opentype.parse(buffer);
    //                     //                 // var lines = object.text.split('\n')
    //                     //                 var lines = (typeof object.text === 'string') ? object.text.split('\n') : [];
    //                     //                 var fontSize = 40
    //                     //                 const x = 50;
    //                     //                 let y = fontSize*object.scaleX;
    //                     //                 // let y = (object.height*object.scaleY)/object._textLines.length;

    //                     //                 const group = new fabric.Group([], {
    //                     //                     left: object.left,
    //                     //                     top: object.top,
    //                     //                     name: 'asowp-svg-path',
    //                     //                     clipPath: handleClipAddedObject(canva),
    //                     //                 });

                                        
    //                     //                 lines.forEach(line => {
    //                     //                     // console.log(line, lines)
    //                     //                     var path = font.getPath(line, 0, y, fontSize * object.scaleX);
    //                     //                     var pathBBox = path.getBoundingBox();
    //                     //                     var pathWidth = pathBBox.x2 - pathBBox.x1;
    //                     //                     let xHeight = pathBBox.y2 - pathBBox.y1;
                                            
    //                     //                     // Calculez le décalage x en fonction de l'alignement
    //                     //                     var xOffset;

    //                     //                     switch(object.textAlign) {
    //                     //                         case 'center':
    //                     //                             xOffset = (object.width * object.scaleX - pathWidth) / 2;
    //                     //                             break;
    //                     //                         case 'right':
    //                     //                             xOffset = object.width * object.scaleX - pathWidth;
    //                     //                             break;
    //                     //                         default: // 'left'
    //                     //                             xOffset = 0;
    //                     //                     }
                                            
    //                     //                     // Appliquez le décalage à tous les points du chemin
    //                     //                     path.commands.forEach(cmd => {
    //                     //                         if (cmd.x !== undefined) cmd.x += xOffset;
    //                     //                         if (cmd.x1 !== undefined) cmd.x1 += xOffset;
    //                     //                         if (cmd.x2 !== undefined) cmd.x2 += xOffset;
    //                     //                     });
                                            
    //                     //                     var longLetter = hasExtendedLowercase(String(line), font, xHeight, fontSize*object.scaleX)
    //                     //                     // console.log(hasExtendedLowercase(String(line), font, fontSize*object.scaleX), "svg-path osdnfsnfsdnf")
    //                     //                     // console.log(hasExtendedLowercase(String(line), font, xHeight, fontSize*object.scaleX), "svg-path osdnfsnfsdnf")

    //                     //                     var miniGroup = new fabric.Group([], {
    //                     //                     });
    //                     //                     const fabricPath = new fabric.Path(path.toPathData(20), {
    //                     //                         strokeWidth: 2,
    //                     //                         // top: object.top + y, 
    //                     //                         stroke: object.fill,
    //                     //                         fill: object.fill,
    //                     //                         originX: 'center',
    //                     //                     });
    //                     //                     if(object.fontWeight == 'bold'){
    //                     //                         fabricPath.strokeWidth = 2.3
    //                     //                         fabricPath.stroke = object.fill
    //                     //                     }
    //                     //                     if(object.fontStyle == 'italic'){
    //                     //                         fabricPath.skewX = -3
    //                     //                     }
    //                     //                     if(object.underline){
    //                     //                         // var objLeft = fabricPath.left
    //                     //                         var objLeft = xOffset;
    //                     //                         var objTop = fabricPath.top + fabricPath.height
    //                     //                         var top = (longLetter ? objTop-6 : objTop+4)
    //                     //                         // console.log(top, "underline", 'false =',objTop , 'true =',objTop-5)

    //                     //                         var underline = new fabric.Line([fabricPath.left, fabricPath.top + fabricPath.height + 5, fabricPath.left + fabricPath.width + 4, fabricPath.top + fabricPath.height + 5], {
    //                     //                             stroke: object.fill,
    //                     //                             left: objLeft,
    //                     //                             top: top,
    //                     //                             scaleY: object.scaleY,
    //                     //                             strokeWidth: 3,
    //                     //                         });

    //                     //                         miniGroup.addWithUpdate(underline);
    //                     //                     }
    //                     //                     if(object.overline){
    //                     //                         var objLeft = xOffset;
    //                     //                         var objTop = fabricPath.top - 8

    //                     //                         var overline = new fabric.Line([fabricPath.left, fabricPath.top + fabricPath.height + 5, fabricPath.left + fabricPath.width + 4, fabricPath.top + fabricPath.height + 5], {
    //                     //                             stroke: object.fill,
    //                     //                             left: objLeft,
    //                     //                             top: objTop,
    //                     //                             scaleY: object.scaleY,
    //                     //                             strokeWidth: 3,
    //                     //                         });

    //                     //                         miniGroup.addWithUpdate(overline);
    //                     //                     }
    //                     //                     if(object.linethrough){
    //                     //                         var objLeft = xOffset;
    //                     //                         var objTop = fabricPath.top + fabricPath.height / 2
    //                     //                         var top = (longLetter ? objTop-6 : objTop+4)

    //                     //                         var linethrough = new fabric.Line([fabricPath.left, fabricPath.top + fabricPath.height + 5, fabricPath.left + fabricPath.width + 4, fabricPath.top + fabricPath.height + 5], {
    //                     //                             stroke: object.fill,
    //                     //                             left: objLeft,
    //                     //                             top: top,
    //                     //                             scaleY: object.scaleY,
    //                     //                             strokeWidth: 2,
    //                     //                             name: 'asowp-svg-path',
    //                     //                         });

    //                     //                         miniGroup.addWithUpdate(linethrough);
    //                     //                     }
    //                     //                     miniGroup.addWithUpdate(fabricPath);
    //                     //                     group.addWithUpdate(miniGroup);
    //                     //                     canva.renderAll()
                                            
    //                     //                     y += fontSize*object.scaleX * 1.3; // Ajustez cette valeur en fonction de la taille de la ligne et de l'espacement souhaité
    //                     //                     // y += y; // Ajustez cette valeur en fonction de la taille de la ligne et de l'espacement souhaité
    //                     //                     // console.log(y, "Ajustez cette vale");
    //                     //                 });

    //                     //                 group.left = object.left - (group.width / 2);
    //                     //                 group.top = object.top - (group.height / 2);

    //                     //                 canva.add(group);
    //                     //                 group.moveTo(index)
    //                     //                 return group;
    //                     //             } catch (error) {
    //                     //                 console.error("Error in processing text:", error);
    //                     //                 throw error;
    //                     //             }
    //                     //         })();
    //                     //         promises.push(promise);
    //                     //     }
    //                     // }
    //                     if (object.name === 'safeObject') {
    //                         if (typeof object.fill !== 'string') {
    //                             var patternFill = object.fill
    //                             let promise = new Promise((resolve, reject) => {
    //                                 handleConvertImageToDataURI(object.fill.source.src, function(dataURI) {
    //                                     fabric.Image.fromURL(dataURI, (img) => {
    //                                         try {
    //                                             img.left = object.left;
    //                                             img.top = object.top;

    //                                             img.clipPath = handleClipAddedObject(canva);
                                                
    //                                             img.name = 'asowp-signPattern';
                                                
    //                                             if (object.width > object.height) {
    //                                                 img.scaleToWidth(object.width);
    //                                             } else {
    //                                                 img.scaleToHeight(object.height);
    //                                             }
    //                                             var shadowRect = handleSetShadow(canva)
    //                                             object.shadow = null
    //                                             canva.add(img, shadowRect);
    //                                             img.moveTo(index + 1);
    //                                             shadowRect.sendToBack()                                                                                         
                                                
    //                                             canva.renderAll()
    //                                             resolve(img);
    //                                         } catch (error) {
    //                                             reject(error);
    //                                         }
    //                                     });
    //                                 });
    //                             });
    //                             promises.push(promise);
    //                         }
    //                     }
    //                 });

    //                 Promise.all(promises)
    //                     .then(groups => resolve(groups))
    //                     .catch(error => reject(error));
    //             });
    //         }


    //         function convertSvgToImage(svgDataUrl, format) {
    //             return new Promise((resolve, reject) => {
    //                 const canvas = document.createElement('canvas');
    //                 var tempCanvas = new fabric.Canvas(canvas, {
    //                     width: 1900,
    //                     height: 1080,
    //                     interactive: false,
    //                     backgroundColor: "transparent",
    //                 });

    //                 fabric.loadSVGFromURL(svgDataUrl, function (image, options) {
    //                     try {
    //                         const img = fabric.util.groupSVGElements(image, options);
    //                         img.scale(1);
                            
    //                         // img.left = -300
    //                         // img.top = -300
    //                         img.setCoords();
    //                         var newW = img.width * img.scaleX
    //                         var newH = img.height * img.scaleX

    //                         // img.width = 1900;
    //                         // img.height = 1080;
    //                         // img.strokeWidth = 10
    //                         // img.stroke = 'red'

    //                         // console.log(img.width, img.height, tempCanvas.width, tempCanvas.height, "tempCanvas")

    //                         tempCanvas.add(img);
    //                         // img.center();
    //                         tempCanvas.renderAll();

    //                         var dataUrl = ""
    //                         switch (format) {
    //                             case 'png':
    //                                 dataUrl = tempCanvas.toDataURL({
    //                                     format: 'png',
    //                                     quality: 1.0
    //                                 });
    //                             break;       
    //                             case 'jpeg':
    //                                 dataUrl = tempCanvas.toDataURL({
    //                                     format: 'jpeg',
    //                                     quality: 1.0
    //                                 });
    //                             break;       
    //                             case 'webp':
    //                                 dataUrl = tempCanvas.toDataURL({
    //                                     format: 'webp',
    //                                     quality: 1.0
    //                                 });
    //                             break;       
    //                         }

    //                         tempCanvas.dispose();

    //                         // Résoudre la Promise avec l'URL des données
    //                         resolve(dataUrl);
    //                     } catch (error) {
    //                         reject(error);
    //                     }
    //                 });
    //             });
    //         }
    
    
    //         var widthVisibility
    //         var heightVisibility
    //         var thickVisibility
    //         var borderPositionId
    //         var fixingPositionId
    //         canva.getObjects().forEach((object, index) => {
    //             if(object.name === 'widthLine' || object.name === 'width-value'){
    //                 widthVisibility = object.visible
    //                 object.set('visible', false);
    //             }
    //             if(object.name === 'heightLine' || object.name === 'height-value'){
    //                 heightVisibility = object.visible
    //                 object.set('visible', false);
    //             }
    //             if(object.name === 'asowp-SignText'){
    //                 // object.set('visible', false);
    //             }
    //             if(object.name === 'thickness-value'){
    //                 thickVisibility = object.visible
    //                 object.set('visible', false);
    //             }
    //             if(object.name === 'old-world-border' || object.name === 'rounded-corners-border'){
    //                 borderPositionId = index
    //                 object.bringToFront();
    //             }
    //             if(object.objectType === 'asowp-fixingMethods'){
    //                 fixingPositionId = index
    //                 object.bringToFront();
    //             }
    //         });
    //         canva.renderAll();

    //         await drawnPathFromText()
                    
    //         const svgData = canva.toSVG(options);
    //         const svgDataPreview = canva.toSVG(optionsPreview);
    //         var previewScreen = document.getElementById('showPreview')

    //         var svgUrl = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));

    //         var dataURL  = ""
    //         // Génère l'image avec le format spécifié
            
    //         switch (format) {
    //             case 'png':
    //                 canva.setWidth(1900)
    //                 canva.setHeight(1080)
    //                 // // checkScreenSize(1900, 1080)
    //                 // canva.zoomToPoint({x: 1900 /2, y: 1080 /2}, 1.5)
    //                 // centerSign(canva)

    //                 // newCenterTool(canva)

    //                 dataURL = canva.toDataURL({
    //                     format: 'png',
    //                     quality: 1.0 // 1.0 est la meilleure qualité pour les formats jpeg et webp
    //                 });


    //                 // dataURL = await convertSvgToImage(svgUrl, 'png')
    //             break;
    
    //             case 'jpeg':
    //                 canva.backgroundColor = configColors.value.canvasBackgroundColor
    //                 // dataURL = canva.toDataURL({
    //                 //     format: 'jpeg',
    //                 //     quality: 1.0 // 1.0 est la meilleure qualité pour les formats jpeg et webp
    //                 // });
    //                 dataURL = await convertSvgToImage(svgUrl, 'jpeg')
    //             break;
    
    //             case 'webp':
    //                 dataURL = canva.toDataURL({
    //                     format: 'webp',
    //                     quality: 1.0 // 1.0 est la meilleure qualité pour les formats jpeg et webp
    //                 });
    //                 dataURL = await convertSvgToImage(svgUrl, 'webp')
    //             break;
    
    //             case 'svg':
    //                 dataURL = svgUrl
    //             break;
            
    //             default:
    
    //             break;
    //         }
    
    //         // Restaure les dimensions et l'affichage originales du canvas
    //         canvas.setBackgroundColor('transparent', canvas.renderAll.bind(canvas));
    //         canva.getObjects().forEach(object => {
    //             if(object.name === 'widthLine' || object.name === 'width-value'){
    //                 object.set('visible', widthVisibility);
    //             }
    //             if(object.name === 'heightLine' || object.name === 'height-value'){
    //                 object.set('visible', heightVisibility);
    //             }
    //             if(object.name === 'asowp-SignText'){
    //                 object.set('visible', true);
    //             }
    //             if(object.name === 'thickness-value'){
    //                 object.set('visible', thickVisibility);
    //             }
    //             if(object.name === 'watermark' || object.name === 'asowp-svg-path' || object.name === 'asowp-signPattern'){
    //                 // console.log(object, "watermark")
    //                 canva.remove(object)
    //             }
    //             if(object.name === 'safeObject'){
    //                 if(activeFace.value == 'front-face' && activeFace1Border.value != 'normal'){
    //                     object.shadow = defaultShadow.value
    //                 }
    //                 if(activeFace.value == 'back-face' && activeFace2Border.value != 'normal'){
    //                     object.shadow = defaultShadow.value
    //                 }
    //             }
    //             if(object.name === 'old-world-border' || object.name === 'rounded-corners-border'){
    //                 object.moveTo(borderPositionId);
    //             }
    //             if(object.objectType === 'asowp-fixingMethods'){
    //                 object.moveTo(fixingPositionId);
    //             }
    //         });
    //         // checkScreenSize()

    //         canva.renderAll();

    //         if(purpose === 'preview'){
    //             previewScreen.innerHTML = svgDataPreview;

    //             const svgElement = previewScreen.querySelector('svg');

    //             svgElement.classList.add('asowp-z-10');

    //             if(configImageSettings.value.scenes.length > 0){
    //                 var miniPreview = document.getElementById('asowp-miniPreview')
    //                 miniPreview.innerHTML = svgDataPreview;

    //             }
    //         }else if(purpose === 'download'){
    //             const link = document.createElement('a');
    //             link.href = dataURL;
    //             link.download = 'img'+'.'+format;
    //             link.click();
    //         }else if(purpose === 'finish-1'){
    //             var previewFinish1 = document.getElementById('asowp-previewFinish1')
    //             previewFinish1.innerHTML = svgDataPreview;
    //         }else if(purpose === 'finish-2'){
    //             var previewFinish1 = document.getElementById('asowp-previewFinish2')
    //             previewFinish1.innerHTML = svgDataPreview;
    //         }

    //         return dataURL;

    //     }catch (error) {
    //         console.error("Une erreur est survenue:", error);
    //     }
    //     // return dataURL;

    // }
    async function genImage(canva, format, purpose, width, height) {
        try{
            var currentWidth = canva.width
            var currentHeight = canva.height


            var sign = handleGetObjectByName('safeObject', canva)          // img.scaleToHeight(40);
            const optionsPreview = {
                width: '100%',
                height: '100%',
                encoding: 'UTF-8' // optionnel, mais recommandé pour la compatibilité
            };

            const options = {
                width: '1900px',
                height: '1080px',
                // viewBox: {
                //     x: 0,
                //     y: 0,
                //     width: canva.width,
                //     height: canva.height,
                // },
                encoding: 'UTF-8',
            };


            function convertSvgToImage(svgDataUrl, format) {
                return new Promise((resolve, reject) => {
                    const canvas = document.createElement('canvas');
                    var tempCanvas = new fabric.Canvas(canvas, {
                        width: 1900,
                        height: 1080,
                        interactive: false,
                        backgroundColor: "transparent",
                    });

                    // Supprimer la balise <style> du SVG
                    fetch(svgDataUrl)
                        .then(response => response.text())
                        .then(svgText => {
                            const svgWithoutStyle = svgText.replace(/<style[\s\S]*?<\/style>/g, '');

                            // Convertir le SVG nettoyé en URL de données
                            const svgWithoutStyleUrl = `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svgWithoutStyle)))}`;

                            // Charger le SVG nettoyé dans Fabric.js
                            fabric.loadSVGFromURL(svgWithoutStyleUrl, function (image, options) {
                                try {
                                    const img = fabric.util.groupSVGElements(image, options);

                                    img.scale(1);                                
                                    img.setCoords();

                                    // console.log(img._objects, "Image")

                                    img._objects.forEach((obj) => {
                                        if (obj.name === 'asowp-SignText') {
                                            console.log('Loaded Text Object:', {
                                                left: obj.left,
                                                top: obj.top,
                                                scaleX: obj.scaleX,
                                                scaleY: obj.scaleY,
                                                width: obj.width,
                                                height: obj.height,
                                                originX: obj.originX,
                                                originY: obj.originY,
                                            });
                                        }
                                    });

                                    var newW = img.width * img.scaleX
                                    var newH = img.height * img.scaleX


                                    tempCanvas.add(img);
                                    tempCanvas.renderAll();

                                    var dataUrl = ""
                                    switch (format) {
                                        case 'png':
                                            dataUrl = tempCanvas.toDataURL({
                                                format: 'png',
                                                quality: 1.0
                                            });
                                        break;       
                                        case 'jpeg':
                                            dataUrl = tempCanvas.toDataURL({
                                                format: 'jpeg',
                                                quality: 1.0
                                            });
                                        break;       
                                        case 'webp':
                                            dataUrl = tempCanvas.toDataURL({
                                                format: 'webp',
                                                quality: 1.0
                                            });
                                        break;       
                                    }

                                    tempCanvas.dispose();

                                    // Résoudre la Promise avec l'URL des données
                                    resolve(dataUrl);
                                } catch (error) {
                                    reject(error);
                                }
                            });
                        })
                        .catch(error => reject(error));
                });
            }
    
            async function drawnPathFromText() {
                return new Promise((resolve, reject) => {
                    var elements = canva.getObjects()
                    let promises = []

                    elements.forEach((object, index) => {
                        if (object.name === 'safeObject') {
                            if (typeof object.fill !== 'string') {
                                var patternFill = object.fill
                                let promise = new Promise((resolve, reject) => {
                                    handleConvertImageToDataURI(object.fill.source.src, function(dataURI) {
                                        fabric.Image.fromURL(dataURI, (img) => {
                                            try {
                                                img.left = object.left;
                                                img.top = object.top;

                                                img.clipPath = handleClipAddedObject(canva);
                                                
                                                img.name = 'asowp-signPattern';
                                                
                                                if (object.width > object.height) {
                                                    img.scaleToWidth(object.width);
                                                } else {
                                                    img.scaleToHeight(object.height);
                                                }
                                                var shadowRect = handleSetShadow(canva)
                                                object.shadow = null
                                                canva.add(img, shadowRect);
                                                img.moveTo(index + 1);
                                                shadowRect.sendToBack()                                                                                         
                                                
                                                canva.renderAll()
                                                resolve(img);
                                            } catch (error) {
                                                reject(error);
                                            }
                                        });
                                    });
                                });
                                promises.push(promise);
                            }
                        }
                    });

                    Promise.all(promises)
                        .then(groups => resolve(groups))
                        .catch(error => reject(error));
                });
            }
    
            var widthVisibility
            var heightVisibility
            var thickVisibility
            var borderPositionId
            var fixingPositionId
            canva.getObjects().forEach((object, index) => {
                if(object.name === 'widthLine' || object.name === 'width-value'){
                    widthVisibility = object.visible
                    object.set('visible', false);
                }
                if(object.name === 'heightLine' || object.name === 'height-value'){
                    heightVisibility = object.visible
                    object.set('visible', false);
                }
                if(object.name === 'asowp-SignText'){
                    // object.set('visible', false);
                }
                if(object.name === 'thickness-value'){
                    thickVisibility = object.visible
                    object.set('visible', false);
                }
                if(object.name === 'old-world-border' || object.name === 'rounded-corners-border'){
                    borderPositionId = index
                    object.bringToFront();
                }
                if(object.objectType === 'asowp-fixingMethods'){
                    fixingPositionId = index
                    object.bringToFront();
                }
            });
            canva.renderAll();
            simulateCanvasClick(canva)


            // Ajouter les polices dans le SVG
            async function addFontsToSVG(svgContent) {
                let fontStyles = '';

                // Parcourir le tableau allFonts pour ajouter les polices
                for (const font of allFonts.value) {
                    const fontBase64 = await getFontAsBase64(font.url);
                    fontStyles += `
                        @font-face {
                            font-family: '${font.label.replaceAll(/\s+/g, '-')}';
                            src: url('${fontBase64}') format('woff2');
                        }
                    `;
                }

                // Insérer la balise <style> juste après l'ouverture de <svg>
                const svgWithFonts = svgContent.replace(
                    /<svg[^>]*>/,
                    `$&<style>${fontStyles}</style>`
                );

                return svgWithFonts;
            }
            await drawnPathFromText()

            // Générer le SVG avec les polices intégrées
            let svgContent = canva.toSVG(options);
            if(configTextType.value === "neon"){
                svgContent = applyNeonEffectToSVG(svgContent, canva)
            }
            const svgWithFonts = await addFontsToSVG(svgContent);
            const svgUrl = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgWithFonts))); 
                    
            // Générer le SVG avec les polices intégrées pour le preview
            const svgPreview = canva.toSVG(optionsPreview);
            const svgDataPreview = await addFontsToSVG(svgPreview);
            var previewScreen = document.getElementById('showPreview')


            var dataURL  = ""
            // Génère l'image avec le format spécifié
            switch (format) {
                case 'png':
                    canva.setWidth(1900)
                    canva.setHeight(1080)
                    checkScreenSize(1900, 1080)
                    canva.zoomToPoint({x: canva.getWidth() /2, y: canva.getHeight() /2}, 1.5)

                    dataURL = canva.toDataURL({
                        format: 'png',
                        quality: 1.0 // 1.0 est la meilleure qualité pour les formats jpeg et webp
                    });

                    // dataURL = await convertSvgToImage(svgUrl, 'png')
                break;
    
                case 'jpeg':
                    canva.setWidth(1900)
                    canva.setHeight(1080)
                    checkScreenSize(1900, 1080)
                    canva.zoomToPoint({x: canva.getWidth() /2, y: canva.getHeight() /2}, 1.5)

                    canva.backgroundColor = configColors.value.canvasBackgroundColor
                    dataURL = canva.toDataURL({
                        format: 'jpeg',
                        quality: 1.0 // 1.0 est la meilleure qualité pour les formats jpeg et webp
                    });
                    // dataURL = await convertSvgToImage(svgUrl, 'jpeg')
                break;
    
                case 'webp':
                    canva.setWidth(1900)
                    canva.setHeight(1080)
                    checkScreenSize(1900, 1080)
                    canva.zoomToPoint({x: canva.getWidth() /2, y: canva.getHeight() /2}, 1.5)

                    dataURL = canva.toDataURL({
                        format: 'webp',
                        quality: 1.0 // 1.0 est la meilleure qualité pour les formats jpeg et webp
                    });
                    // dataURL = await convertSvgToImage(svgUrl, 'webp')
                break;
    
                case 'svg':
                    dataURL = svgUrl
                break;
            
                default:
    
                break;
            }
    
            // Restaure les dimensions et l'affichage originales du canvas
            canvas.setBackgroundColor('transparent', canvas.renderAll.bind(canvas));
            canva.getObjects().forEach(object => {
                if(object.name === 'widthLine' || object.name === 'width-value'){
                    object.set('visible', widthVisibility);
                }
                if(object.name === 'heightLine' || object.name === 'height-value'){
                    object.set('visible', heightVisibility);
                }
                if(object.name === 'asowp-SignText'){
                    object.set('visible', true);
                }
                if(object.name === 'thickness-value'){
                    object.set('visible', thickVisibility);
                }
                if(object.name === 'watermark' || object.name === 'asowp-svg-path' || object.name === 'asowp-signPattern'){
                    // console.log(object, "watermark")
                    canva.remove(object)
                }
                if(object.name === 'safeObject'){
                    if(activeFace.value == 'front-face' && activeFace1Border.value != 'normal'){
                        object.shadow = defaultShadow.value
                    }
                    if(activeFace.value == 'back-face' && activeFace2Border.value != 'normal'){
                        object.shadow = defaultShadow.value
                    }
                }
                if(object.name === 'old-world-border' || object.name === 'rounded-corners-border'){
                    object.moveTo(borderPositionId);
                }
                if(object.objectType === 'asowp-fixingMethods'){
                    object.moveTo(fixingPositionId);
                }
            });

            if(purpose === 'preview'){
                // if(configTextType.value == 'neon'){
                //     canva.setWidth(1900)
                //     canva.setHeight(1080)
                //     checkScreenSize(1900, 1080)
                //     canva.zoomToPoint({x: canva.getWidth() /2, y: canva.getHeight() /2}, 1.5)

                //     prevImg.value = canva.toDataURL({
                //         format: 'png',
                //         quality: 1.0 // 1.0 est la meilleure qualité pour les formats jpeg et webp
                //     });
                    
                // }
                if(configTextType.value != 'neon'){
                    previewScreen.innerHTML = svgDataPreview;
    
                    const svgElement = previewScreen.querySelector('svg');
    
                    svgElement.classList.add('asowp-z-10');
                }

                if(configImageSettings.value.scenes.length > 0){
                    var miniPreview = document.getElementById('asowp-miniPreview')
                    miniPreview.innerHTML = svgDataPreview;
                }
            }else if(purpose === 'download'){
                const link = document.createElement('a');
                link.href = dataURL;
                // link.href = svgUrl;
                link.download = 'img'+'.'+format;
                link.click();
            }else if(purpose === 'finish-1'){
                var previewFinish1 = document.getElementById('asowp-previewFinish1')
                previewFinish1.innerHTML = svgDataPreview;
            }else if(purpose === 'finish-2'){
                var previewFinish1 = document.getElementById('asowp-previewFinish2')
                previewFinish1.innerHTML = svgDataPreview;
            }

            checkScreenSize()
            canva.renderAll();
            simulateCanvasClick(canva)

            return dataURL;

        }catch (error) {
            console.error("Une erreur est survenue:", error);
        }
        // return dataURL;

    }

    // async function genImageWithWatermark(canva, format, purpose, width, height) {
    //     try{
    //         // Sauvegarde les dimensions actuelles du canvas
    //         const originalWidth = canva.getWidth();
    //         const originalHeight = canva.getHeight();

    //         var canvasCenter = getCanvasCenter()

    //         // Redimensionne le canvas si les nouvelles dimensions sont spécifiées
    //         // if (width && height) {
    //         //     canva.setWidth(width);
    //         //     canva.setHeight(height);
    //         //     checkScreenSize(width, height)
    //         // }

    //         fabric.Image.fromURL(configOutputSettings.value.waterMark, async function(img) {  
    //             var sign = handleGetObjectByName('safeObject', canva)          // img.scaleToHeight(40);
    //             const imgWidth = 100;
    //             const imgHeight = 100;
    //             const spacing = 50; // Espacement entre les images

    //             // Créer un canvas temporaire
    //             const patternCanvas = document.createElement('canvas');
    //             const patternContext = patternCanvas.getContext('2d');
    //             // Définir les dimensions du canvas temporaire
    //             patternCanvas.width = imgWidth + spacing;
    //             patternCanvas.height = imgHeight + spacing;
    //             // Dessiner l'image de filigrane sur le canvas temporaire
    //             patternContext.drawImage(img.getElement(), 0, 0, imgWidth, imgHeight);
    //             const pattern = new fabric.Pattern({
    //                 // source: img.getElement(),
    //                 source: patternCanvas,
    //                 repeat: 'no-repeat'
    //             });
    //             const watermarkRect = new fabric.Rect({
    //                 left: sign.left + sign.width - imgWidth - 10,
    //                 top: sign.top + sign.height - imgHeight - 10,
    //                 // left: -canvasCenter.x,
    //                 // top: -canvasCenter.y,
    //                 width: imgWidth,
    //                 height: imgHeight,
    //                 // width: (originalWidth*2),
    //                 // height: (originalHeight*2),
    //                 fill: pattern,  
    //                 selectable: false,
    //                 evented: false,
    //                 name: 'watermark',
    //                 opacity: 0.5,
    //             });
    //             canva.add(watermarkRect);
    //             watermarkRect.bringToFront()


    //             const optionsPreview = {
    //                 width: '100%',
    //                 height: '100%',
    //                 class: 'asowp-z-10',
    //                 // viewBox: {
    //                 //     x: -100,
    //                 //     y: -50,
    //                 //     width: canva.width+300,
    //                 //     height: canva.height+300
    //                 // },
    //                 encoding: 'UTF-8' // optionnel, mais recommandé pour la compatibilité
    //             };

    //             const options = {
    //                 width: '1900px',  // ou la largeur que vous souhaitez
    //                 height: '1080px', // ou la hauteur que vous souhaitez
    //                 encoding: 'UTF-8' // optionnel, mais recommandé pour la compatibilité
    //             };
    //             function checkWoff2(chaine) {
    //                 return chaine.endsWith('.woff2');
    //             }

    //             function hasExtendedLowercase(text, font, xHeight, fontSize) {
    //                 if (typeof text !== 'string') {
    //                     console.error('Text must be a string');
    //                     return false;
    //                 }
    //                 const testChars = ['a', 'x', 'o', 'n', 'm']; // Caractères de base pour la hauteur
    //                 const testExtendsChars = ['g', 'j', 'p', 'q', 'y'];
                    
    //                 // let hasSame = false;
    //                 // for (let char of testChars) {
    //                 //     if (char.match(/[a-z]/)) {
    //                 //         let path = font.getPath(char, 0, 0, fontSize);
    //                 //         let bbox = path.getBoundingBox();
    //                 //         console.log(xHeight, (bbox.y2 - bbox.y1), "erettrtretrre")
    //                 //         if (xHeight > bbox.y2 - bbox.y1) {
    //                 //             return true;
    //                 //         }
    //                 //     }
    //                 // }
    //                 for (let char of testExtendsChars) {
    //                     if (char.match(/[a-z]/)) {
    //                         let path = font.getPath(char, 0, 0, fontSize);
    //                         let bbox = path.getBoundingBox();
    //                         // console.log((bbox.y2 - bbox.y1), xHeight , "syojiçyboytrh")
    //                         // console.log((bbox.y2 - bbox.y1), xHeight*0.9 , "sfudbgpgoiebiàbj,yojiçyboytrh")
    //                         if (xHeight*0.9 > bbox.y2 - bbox.y1) {
    //                             return true;
    //                         }
    //                     }
    //                 }
    //                 return false;
    //             }

    //             async function drawnPathFromText() {
    //                 return new Promise((resolve, reject) => {
    //                     var elements = canvas.getObjects()
    //                     let promises = []

    //                     elements.forEach((object, index) => {
    //                         if (object.name === 'asowp-SignText') {
    //                             if (!checkWoff2(object.fontFamily)) {
    //                                 let promise = (async () => {
    //                                     try {
    //                                         var buffer = await fetch(object.fontFamilyUrl).then(res => res.arrayBuffer());
    //                                         var font = opentype.parse(buffer);
    //                                         // var lines = object.text.split('\n')
    //                                         var lines = (typeof object.text === 'string') ? object.text.split('\n') : [];
    //                                         var fontSize = 40
    //                                         const x = 50;
    //                                         let y = fontSize*object.scaleX;
    //                                         // let y = (object.height*object.scaleY)/object._textLines.length;

    //                                         const group = new fabric.Group([], {
    //                                             left: object.left,
    //                                             top: object.top,
    //                                             name: 'asowp-svg-path',
    //                                             clipPath: handleClipAddedObject(canva),
    //                                         });

                                            
    //                                         lines.forEach(line => {
    //                                             // console.log(line, lines)
    //                                             var path = font.getPath(line, 0, y, fontSize * object.scaleX);
    //                                             var pathBBox = path.getBoundingBox();
    //                                             var pathWidth = pathBBox.x2 - pathBBox.x1;
    //                                             let xHeight = pathBBox.y2 - pathBBox.y1;
                                                
    //                                             // Calculez le décalage x en fonction de l'alignement
    //                                             var xOffset;

    //                                             switch(object.textAlign) {
    //                                                 case 'center':
    //                                                     xOffset = (object.width * object.scaleX - pathWidth) / 2;
    //                                                     break;
    //                                                 case 'right':
    //                                                     xOffset = object.width * object.scaleX - pathWidth;
    //                                                     break;
    //                                                 default: // 'left'
    //                                                     xOffset = 0;
    //                                             }
                                                
    //                                             // Appliquez le décalage à tous les points du chemin
    //                                             path.commands.forEach(cmd => {
    //                                                 if (cmd.x !== undefined) cmd.x += xOffset;
    //                                                 if (cmd.x1 !== undefined) cmd.x1 += xOffset;
    //                                                 if (cmd.x2 !== undefined) cmd.x2 += xOffset;
    //                                             });
                                                
    //                                             var longLetter = hasExtendedLowercase(String(line), font, xHeight, fontSize*object.scaleX)
    //                                             // console.log(hasExtendedLowercase(String(line), font, fontSize*object.scaleX), "svg-path osdnfsnfsdnf")
    //                                             // console.log(hasExtendedLowercase(String(line), font, xHeight, fontSize*object.scaleX), "svg-path osdnfsnfsdnf")

    //                                             var miniGroup = new fabric.Group([], {
    //                                             });
    //                                             const fabricPath = new fabric.Path(path.toPathData(20), {
    //                                                 strokeWidth: 2,
    //                                                 // top: object.top + y, 
    //                                                 stroke: object.fill,
    //                                                 fill: object.fill,
    //                                                 originX: 'center',
    //                                             });
    //                                             if(object.fontWeight == 'bold'){
    //                                                 fabricPath.strokeWidth = 2.3
    //                                                 fabricPath.stroke = object.fill
    //                                             }
    //                                             if(object.fontStyle == 'italic'){
    //                                                 fabricPath.skewX = -3
    //                                             }
    //                                             if(object.underline){
    //                                                 // var objLeft = fabricPath.left
    //                                                 var objLeft = xOffset;
    //                                                 var objTop = fabricPath.top + fabricPath.height
    //                                                 var top = (longLetter ? objTop-6 : objTop+4)
    //                                                 // console.log(top, "underline", 'false =',objTop , 'true =',objTop-5)

    //                                                 var underline = new fabric.Line([fabricPath.left, fabricPath.top + fabricPath.height + 5, fabricPath.left + fabricPath.width + 4, fabricPath.top + fabricPath.height + 5], {
    //                                                     stroke: object.fill,
    //                                                     left: objLeft,
    //                                                     top: top,
    //                                                     scaleY: object.scaleY,
    //                                                     strokeWidth: 3,
    //                                                 });

    //                                                 miniGroup.addWithUpdate(underline);
    //                                             }
    //                                             if(object.overline){
    //                                                 var objLeft = xOffset;
    //                                                 var objTop = fabricPath.top - 8

    //                                                 var overline = new fabric.Line([fabricPath.left, fabricPath.top + fabricPath.height + 5, fabricPath.left + fabricPath.width + 4, fabricPath.top + fabricPath.height + 5], {
    //                                                     stroke: object.fill,
    //                                                     left: objLeft,
    //                                                     top: objTop,
    //                                                     scaleY: object.scaleY,
    //                                                     strokeWidth: 3,
    //                                                 });

    //                                                 miniGroup.addWithUpdate(overline);
    //                                             }
    //                                             if(object.linethrough){
    //                                                 var objLeft = xOffset;
    //                                                 var objTop = fabricPath.top + fabricPath.height / 2
    //                                                 var top = (longLetter ? objTop-6 : objTop+4)

    //                                                 var linethrough = new fabric.Line([fabricPath.left, fabricPath.top + fabricPath.height + 5, fabricPath.left + fabricPath.width + 4, fabricPath.top + fabricPath.height + 5], {
    //                                                     stroke: object.fill,
    //                                                     left: objLeft,
    //                                                     top: top,
    //                                                     scaleY: object.scaleY,
    //                                                     strokeWidth: 2,
    //                                                     name: 'asowp-svg-path',
    //                                                 });

    //                                                 miniGroup.addWithUpdate(linethrough);
    //                                             }
    //                                             miniGroup.addWithUpdate(fabricPath);
    //                                             group.addWithUpdate(miniGroup);
    //                                             canva.renderAll()
                                                
    //                                             y += fontSize*object.scaleX * 1.3; // Ajustez cette valeur en fonction de la taille de la ligne et de l'espacement souhaité
    //                                             // y += y; // Ajustez cette valeur en fonction de la taille de la ligne et de l'espacement souhaité
    //                                             // console.log(y, "Ajustez cette vale");
    //                                         });

    //                                         group.left = object.left - (group.width / 2);
    //                                         group.top = object.top - (group.height / 2);

    //                                         canva.add(group);
    //                                         group.moveTo(index)
    //                                         return group;
    //                                     } catch (error) {
    //                                         console.error("Error in processing text:", error);
    //                                         throw error;
    //                                     }
    //                                 })();
    //                                 promises.push(promise);
    //                             }
    //                         }
    //                         if (object.name === 'safeObject') {
    //                             if (typeof object.fill !== 'string') {
    //                                 var patternFill = object.fill
    //                                 let promise = new Promise((resolve, reject) => {
    //                                     handleConvertImageToDataURI(object.fill.source.src, function(dataURI) {
    //                                         fabric.Image.fromURL(dataURI, (img) => {
    //                                             try {
    //                                                 img.left = object.left;
    //                                                 img.top = object.top;

    //                                                 img.clipPath = handleClipAddedObject(canva);
                                                    
    //                                                 img.name = 'asowp-signPattern';
                                                    
    //                                                 if (object.width > object.height) {
    //                                                     img.scaleToWidth(object.width);
    //                                                 } else {
    //                                                     img.scaleToHeight(object.height);
    //                                                 }
    //                                                 var shadowRect = handleSetShadow(canva)
    //                                                 object.shadow = null
    //                                                 canva.add(img, shadowRect);
    //                                                 img.moveTo(index + 1);
    //                                                 shadowRect.sendToBack()                                                                                          
                                                    
    //                                                 object.fill = patternFill;
    //                                                 canva.renderAll()
    //                                                 resolve(img);
    //                                             } catch (error) {
    //                                                 reject(error);
    //                                             }
    //                                         });
    //                                     });
    //                                 });
    //                                 promises.push(promise);
    //                             }
    //                         }
    //                     });

    //                     Promise.all(promises)
    //                         .then(groups => resolve(groups))
    //                         .catch(error => reject(error));
    //                 });
    //             }

    //             // function convertSvgToImage(svgDataUrl, format = 'png'){
    //             //     const canvas = document.createElement('canvas');
    //             //     var tempCanvas  = new fabric.Canvas(imageCanvasRef.value,{
    //             //         width: 1900, 
    //             //         height: 1080, 
    //             //         interactive: false,
    //             //         backgroundColor : "transparent",
    //             //     });

    //             //     var url = ''
                    
    //             //     fabric.loadSVGFromURL(svgDataUrl, async function (image) {
    //             //         const img = fabric.util.groupSVGElements(image);

    //             //         img.scale(1.5);

    //             //         img.setCoords();
    //             //         var newWidth = img.width * img.scaleX;
    //             //         var newHeight = img.height * img.scaleY;

    //             //         img.width = 1900;
    //             //         img.height = 1080;

    //             //         tempCanvas.add(img);
    //             //         img.center()
    //             //         tempCanvas.renderAll();

    //             //         console.log(tempCanvas, "tempCanvas", img)

    //             //         const dataURL = tempCanvas.toDataURL({
    //             //             format: 'png',
    //             //             quality: 1.0 // 1.0 est la meilleure qualité pour les formats jpeg et webp
    //             //         });

    //             //         url = await dataURL

    //             //         var downloadLink = document.createElement("a");
    //             //         downloadLink.href = dataURL ;
    //             //         downloadLink.download = 'fileName' + ".png";

    //             //         document.body.appendChild(downloadLink);
    //             //         downloadLink.click();
    //             //         document.body.removeChild(downloadLink);

    //             //         tempCanvas.dispose()
    //             //     });
    //             // }
    //             function convertSvgToImage(svgDataUrl, format) {
    //                 return new Promise((resolve, reject) => {
    //                     const canvas = document.createElement('canvas');
    //                     var tempCanvas = new fabric.Canvas(canvas, {
    //                         width: 1900,
    //                         height: 1080,
    //                         interactive: false,
    //                         backgroundColor: "transparent",
    //                     });

    //                     // fabric.Image.fromURL( svgDataUrl, function (img) {
    //                     //     try {
    //                     //         // const img = fabric.util.groupSVGElements(image, options);
    //                     //         img.scale(1);
                                
    //                     //         // img.left = -300
    //                     //         // img.top = -300
    //                     //         img.setCoords();
    //                     //         var newW = img.width * img.scaleX
    //                     //         var newH = img.height * img.scaleX

    //                     //         // img.width = 1900;
    //                     //         // img.height = 1080;
    //                     //         // img.strokeWidth = 10
    //                     //         // img.stroke = 'red'

    //                     //         console.log(img.width, img.height, tempCanvas.width, tempCanvas.height, "tempCanvas")

    //                     //         tempCanvas.add(img);
    //                     //         // img.center();
    //                     //         tempCanvas.renderAll();

    //                     //         var dataUrl = ""
    //                     //         switch (format) {
    //                     //             case 'png':
    //                     //                 dataUrl = tempCanvas.toDataURL({
    //                     //                     format: 'png',
    //                     //                     quality: 1.0
    //                     //                 });
    //                     //             break;       
    //                     //             case 'jpeg':
    //                     //                 dataUrl = tempCanvas.toDataURL({
    //                     //                     format: 'jpeg',
    //                     //                     quality: 1.0
    //                     //                 });
    //                     //             break;       
    //                     //             case 'webp':
    //                     //                 dataUrl = tempCanvas.toDataURL({
    //                     //                     format: 'webp',
    //                     //                     quality: 1.0
    //                     //                 });
    //                     //             break;       
    //                     //         }

    //                     //         tempCanvas.dispose();

    //                     //         // Résoudre la Promise avec l'URL des données
    //                     //         resolve(dataUrl);
    //                     //     } catch (error) {
    //                     //         reject(error);
    //                     //     }
    //                     // });
    //                     fabric.loadSVGFromURL(svgDataUrl, function (image, options) {
    //                         try {
    //                             const img = fabric.util.groupSVGElements(image, options);
    //                             img.scale(1);
                                
    //                             // img.left = -300
    //                             // img.top = -300
    //                             img.setCoords();
    //                             var newW = img.width * img.scaleX
    //                             var newH = img.height * img.scaleX

    //                             // img.width = 1900;
    //                             // img.height = 1080;
    //                             // img.strokeWidth = 10
    //                             // img.stroke = 'red'

    //                             // console.log(img.width, img.height, tempCanvas.width, tempCanvas.height, "tempCanvas")

    //                             tempCanvas.add(img);
    //                             // img.center();
    //                             tempCanvas.renderAll();

    //                             var dataUrl = ""
    //                             switch (format) {
    //                                 case 'png':
    //                                     dataUrl = tempCanvas.toDataURL({
    //                                         format: 'png',
    //                                         quality: 1.0
    //                                     });
    //                                 break;       
    //                                 case 'jpeg':
    //                                     dataUrl = tempCanvas.toDataURL({
    //                                         format: 'jpeg',
    //                                         quality: 1.0
    //                                     });
    //                                 break;       
    //                                 case 'webp':
    //                                     dataUrl = tempCanvas.toDataURL({
    //                                         format: 'webp',
    //                                         quality: 1.0
    //                                     });
    //                                 break;       
    //                             }

    //                             tempCanvas.dispose();

    //                             // Résoudre la Promise avec l'URL des données
    //                             resolve(dataUrl);
    //                         } catch (error) {
    //                             reject(error);
    //                         }
    //                     });
    //                 });
    //             }
        
        
    //             var widthVisibility
    //             var heightVisibility
    //             var thickVisibility
    //             var borderPositionId
    //             var fixingPositionId
    //             canva.getObjects().forEach((object, index) => {
    //                 // if(object.name === 'heightLine' || object.name === 'widthLine' || object.name === 'height-value' || object.name === 'width-value' || object.name === 'asowp-SignText'){
    //                 //     object.set('visible', false);
    //                 // }
    //                 if(object.name === 'widthLine' || object.name === 'width-value'){
    //                     widthVisibility = object.visible
    //                     object.set('visible', false);
    //                 }
    //                 if(object.name === 'heightLine' || object.name === 'height-value'){
    //                     heightVisibility = object.visible
    //                     object.set('visible', false);
    //                 }
    //                 if(object.name === 'asowp-SignText'){
    //                     object.set('visible', true);
    //                 }
    //                 if(object.name === 'thickness-value'){
    //                     thickVisibility = object.visible
    //                     object.set('visible', false);
    //                 }
    //                 if(object.name === 'old-world-border' || object.name === 'rounded-corners-border'){
    //                     borderPositionId = index
    //                     object.bringToFront();
    //                 }
    //                 if(object.objectType === 'asowp-fixingMethods'){
    //                     fixingPositionId = index
    //                     object.bringToFront();
    //                 }
    //             });
    //             canva.renderAll();

    //             await drawnPathFromText()
                        
    //             const svgData = canva.toSVG(options);
    //             // const svgData = canva.toSVG(options);
    //             const svgDataPreview = canva.toSVG(optionsPreview);
    //             var previewScreen = document.getElementById('showPreview')
    //             var svgUrl = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));

    //             var dataURL  = ""
    //             // Génère l'image avec le format spécifié
                
    //             switch (format) {
    //                 case 'png':
    //                     // dataURL = canva.toDataURL({
    //                     //     format: 'png',
    //                     //     quality: 1.0 // 1.0 est la meilleure qualité pour les formats jpeg et webp
    //                     // });
    //                     dataURL = await convertSvgToImage(svgUrl, 'png')
    //                 break;
        
    //                 case 'jpeg':
    //                     canva.backgroundColor = configColors.value.canvasBackgroundColor
    //                     // dataURL = canva.toDataURL({
    //                     //     format: 'jpeg',
    //                     //     quality: 1.0 // 1.0 est la meilleure qualité pour les formats jpeg et webp
    //                     // });
    //                     dataURL = await convertSvgToImage(svgUrl, 'jpeg')
    //                 break;
        
    //                 case 'webp':
    //                     dataURL = canva.toDataURL({
    //                         format: 'webp',
    //                         quality: 1.0 // 1.0 est la meilleure qualité pour les formats jpeg et webp
    //                     });
    //                     dataURL = await convertSvgToImage(svgUrl, 'webp')
    //                 break;
        
    //                 case 'svg':
    //                     dataURL = svgUrl


    //                     // await drawnPathFromText()
                        
    //                     // var red = await convertSvgToImage(svgUrl, 'png')
    //                     // console.log(canvas.getZoom(), "dfghfhf")
    
    //                     // var downloadLink = document.createElement("a");
    //                     // downloadLink.href = red;
    //                     // downloadLink.download = 'fileName' + ".png";
                        
    //                     // document.body.appendChild(downloadLink);
    //                     // downloadLink.click();
    //                     // document.body.removeChild(downloadLink);
                        
    //                     // var ink = document.createElement("a");
    //                     // ink.href = svgUrl;
    //                     // ink.download = 'fileName' + ".svg";
    //                     // document.body.appendChild(ink);
    //                     // ink.click();
    //                     // document.body.removeChild(ink);
    //                 break;
                
    //                 default:
        
    //                 break;
    //             }
        
    //             // Restaure les dimensions et l'affichage originales du canvas
    //             canvas.setBackgroundColor('transparent', canvas.renderAll.bind(canvas));
    //             canva.getObjects().forEach(object => {
    //                 // if(object.name === 'heightLine' || object.name === 'widthLine' || object.name === 'height-value' || object.name === 'width-value' || object.name === 'asowp-SignText'){
    //                 //     object.set('visible', true);
    //                 // }
    //                 if(object.name === 'widthLine' || object.name === 'width-value'){
    //                     object.set('visible', widthVisibility);
    //                 }
    //                 if(object.name === 'heightLine' || object.name === 'height-value'){
    //                     object.set('visible', heightVisibility);
    //                 }
    //                 if(object.name === 'asowp-SignText'){
    //                     object.set('visible', false);
    //                 }
    //                 if(object.name === 'thickness-value'){
    //                     object.set('visible', thickVisibility);
    //                 }
    //                 if(object.name === 'watermark' || object.name === 'asowp-svg-path' || object.name === 'asowp-signPattern'){
    //                     // console.log(object, "watermark")
    //                     canva.remove(object)
    //                 }
    //                 if(object.name === 'safeObject'){
    //                     if(activeFace.value == 'front-face' && activeFace1Border.value != 'normal'){
    //                         object.shadow = defaultShadow.value
    //                     }
    //                     if(activeFace.value == 'back-face' && activeFace2Border.value != 'normal'){
    //                         object.shadow = defaultShadow.value
    //                     }
    //                 }
    //                 if(object.name === 'old-world-border' || object.name === 'rounded-corners-border'){
    //                 // borderPositionId = index
    //                     object.moveTo(borderPositionId);
    //                 }
    //                 if(object.objectType === 'asowp-fixingMethods'){
    //                     object.moveTo(fixingPositionId);
    //                 }
    //             });
    
    //             canva.renderAll();
    
    //             if(purpose === 'preview'){
    //                 previewScreen.innerHTML = svgDataPreview;

    //                 const svgElement = previewScreen.querySelector('svg');

    //                 // Ajoutez une classe à l'élément SVG
    //                 svgElement.classList.add('asowp-z-10');

    //                 if(configImageSettings.value.scenes.length > 0){
    //                     var miniPreview = document.getElementById('asowp-miniPreview')
    //                     miniPreview.innerHTML = svgDataPreview;

    //                 }
    //             }else{
    //                 var ink = document.createElement("a");
    //                 ink.href = dataURL;
    //                 ink.download = 'image' + "." + format;
    //                 document.body.appendChild(ink);
    //                 ink.click();
    //                 document.body.removeChild(ink);
    //             }

    //         });
    //     }catch (error) {
    //         console.error("Une erreur est survenue:", error);
    //     }
    //     // return dataURL;

    // }
    async function genImageWithWatermark(canva, format, purpose, width, height) {
        return new Promise((resolve, reject) => {
            try{
                // Sauvegarde les dimensions actuelles du canvas
                const originalWidth = canva.getWidth();
                const originalHeight = canva.getHeight();

                var canvasCenter = getCanvasCenter()

                // Redimensionne le canvas si les nouvelles dimensions sont spécifiées
                // if (width && height) {
                //     canva.setWidth(width);
                //     canva.setHeight(height);
                //     checkScreenSize(width, height)
                // }

                fabric.Image.fromURL(configOutputSettings.value.waterMark, async function(img) {  
                    var sign = handleGetObjectByName('safeObject', canva)          // img.scaleToHeight(40);
                    const imgWidth = 100;
                    const imgHeight = 100;
                    const spacing = 50; // Espacement entre les images

                    // Créer un canvas temporaire
                    const patternCanvas = document.createElement('canvas');
                    const patternContext = patternCanvas.getContext('2d');
                    // Définir les dimensions du canvas temporaire
                    patternCanvas.width = imgWidth + spacing;
                    patternCanvas.height = imgHeight + spacing;
                    // Dessiner l'image de filigrane sur le canvas temporaire
                    patternContext.drawImage(img.getElement(), 0, 0, imgWidth, imgHeight);
                    const pattern = new fabric.Pattern({
                        // source: img.getElement(),
                        source: patternCanvas,
                        repeat: 'no-repeat'
                    });
                    const watermarkRect = new fabric.Rect({
                        left: sign.left + sign.width - imgWidth - 10,
                        top: sign.top + sign.height - imgHeight - 10,
                        // left: -canvasCenter.x,
                        // top: -canvasCenter.y,
                        width: imgWidth,
                        height: imgHeight,
                        // width: (originalWidth*2),
                        // height: (originalHeight*2),
                        fill: pattern,  
                        selectable: false,
                        evented: false,
                        name: 'watermark',
                        opacity: 0.5,
                    });
                    canva.add(watermarkRect);
                    watermarkRect.bringToFront()


                    const optionsPreview = {
                        width: '100%',
                        height: '100%',
                        class: 'asowp-z-10',
                        // viewBox: {
                        //     x: -100,
                        //     y: -50,
                        //     width: canva.width+300,
                        //     height: canva.height+300
                        // },
                        encoding: 'UTF-8' // optionnel, mais recommandé pour la compatibilité
                    };

                    const options = {
                        width: '1900px',  // ou la largeur que vous souhaitez
                        height: '1080px', // ou la hauteur que vous souhaitez
                        encoding: 'UTF-8' // optionnel, mais recommandé pour la compatibilité
                    };
                    function checkWoff2(chaine) {
                        return chaine.endsWith('.woff2');
                    }

                    function hasExtendedLowercase(text, font, xHeight, fontSize) {
                        if (typeof text !== 'string') {
                            console.error('Text must be a string');
                            return false;
                        }
                        const testChars = ['a', 'x', 'o', 'n', 'm']; // Caractères de base pour la hauteur
                        const testExtendsChars = ['g', 'j', 'p', 'q', 'y'];
                        
                        // let hasSame = false;
                        // for (let char of testChars) {
                        //     if (char.match(/[a-z]/)) {
                        //         let path = font.getPath(char, 0, 0, fontSize);
                        //         let bbox = path.getBoundingBox();
                        //         console.log(xHeight, (bbox.y2 - bbox.y1), "erettrtretrre")
                        //         if (xHeight > bbox.y2 - bbox.y1) {
                        //             return true;
                        //         }
                        //     }
                        // }
                        for (let char of testExtendsChars) {
                            if (char.match(/[a-z]/)) {
                                let path = font.getPath(char, 0, 0, fontSize);
                                let bbox = path.getBoundingBox();
                                // console.log((bbox.y2 - bbox.y1), xHeight , "syojiçyboytrh")
                                // console.log((bbox.y2 - bbox.y1), xHeight*0.9 , "sfudbgpgoiebiàbj,yojiçyboytrh")
                                if (xHeight*0.9 > bbox.y2 - bbox.y1) {
                                    return true;
                                }
                            }
                        }
                        return false;
                    }

                    async function drawnPathFromText() {
                        return new Promise((resolve, reject) => {
                            var elements = canvas.getObjects()
                            let promises = []

                            elements.forEach((object, index) => {
                                if (object.name === 'safeObject') {
                                    if (typeof object.fill !== 'string') {
                                        var patternFill = object.fill
                                        let promise = new Promise((resolve, reject) => {
                                            handleConvertImageToDataURI(object.fill.source.src, function(dataURI) {
                                                fabric.Image.fromURL(dataURI, (img) => {
                                                    try {
                                                        img.left = object.left;
                                                        img.top = object.top;

                                                        img.clipPath = handleClipAddedObject(canva);
                                                        
                                                        img.name = 'asowp-signPattern';
                                                        
                                                        if (object.width > object.height) {
                                                            img.scaleToWidth(object.width);
                                                        } else {
                                                            img.scaleToHeight(object.height);
                                                        }
                                                        var shadowRect = handleSetShadow(canva)
                                                        object.shadow = null
                                                        canva.add(img, shadowRect);
                                                        img.moveTo(index + 1);
                                                        shadowRect.sendToBack()                                                                                          
                                                        
                                                        object.fill = patternFill;
                                                        canva.renderAll()
                                                        resolve(img);
                                                    } catch (error) {
                                                        reject(error);
                                                    }
                                                });
                                            });
                                        });
                                        promises.push(promise);
                                    }
                                }
                            });

                            Promise.all(promises)
                                .then(groups => resolve(groups))
                                .catch(error => reject(error));
                        });
                    }
                    async function addFontsToSVG(svgContent) {
                        let fontStyles = '';

                        // Parcourir le tableau allFonts pour ajouter les polices
                        for (const font of allFonts.value) {
                            const fontBase64 = await getFontAsBase64(font.url);
                            fontStyles += `
                                @font-face {
                                    font-family: '${font.label.replaceAll(/\s+/g, '-')}';
                                    src: url('${fontBase64}') format('woff2');
                                }
                            `;
                        }

                        // Insérer la balise <style> juste après l'ouverture de <svg>
                        const svgWithFonts = svgContent.replace(
                            /<svg[^>]*>/,
                            `$&<style>${fontStyles}</style>`
                        );

                        return svgWithFonts;
                    }

                    // function convertSvgToImage(svgDataUrl, format = 'png'){
                    //     const canvas = document.createElement('canvas');
                    //     var tempCanvas  = new fabric.Canvas(imageCanvasRef.value,{
                    //         width: 1900, 
                    //         height: 1080, 
                    //         interactive: false,
                    //         backgroundColor : "transparent",
                    //     });

                    //     var url = ''
                        
                    //     fabric.loadSVGFromURL(svgDataUrl, async function (image) {
                    //         const img = fabric.util.groupSVGElements(image);

                    //         img.scale(1.5);

                    //         img.setCoords();
                    //         var newWidth = img.width * img.scaleX;
                    //         var newHeight = img.height * img.scaleY;

                    //         img.width = 1900;
                    //         img.height = 1080;

                    //         tempCanvas.add(img);
                    //         img.center()
                    //         tempCanvas.renderAll();

                    //         console.log(tempCanvas, "tempCanvas", img)

                    //         const dataURL = tempCanvas.toDataURL({
                    //             format: 'png',
                    //             quality: 1.0 // 1.0 est la meilleure qualité pour les formats jpeg et webp
                    //         });

                    //         url = await dataURL

                    //         var downloadLink = document.createElement("a");
                    //         downloadLink.href = dataURL ;
                    //         downloadLink.download = 'fileName' + ".png";

                    //         document.body.appendChild(downloadLink);
                    //         downloadLink.click();
                    //         document.body.removeChild(downloadLink);

                    //         tempCanvas.dispose()
                    //     });
                    // }
                    function convertSvgToImage(svgDataUrl, format) {
                        return new Promise((resolve, reject) => {
                            const canvas = document.createElement('canvas');
                            var tempCanvas = new fabric.Canvas(canvas, {
                                width: 1900,
                                height: 1080,
                                interactive: false,
                                backgroundColor: "transparent",
                            });

                            // fabric.Image.fromURL( svgDataUrl, function (img) {
                            //     try {
                            //         // const img = fabric.util.groupSVGElements(image, options);
                            //         img.scale(1);
                                    
                            //         // img.left = -300
                            //         // img.top = -300
                            //         img.setCoords();
                            //         var newW = img.width * img.scaleX
                            //         var newH = img.height * img.scaleX

                            //         // img.width = 1900;
                            //         // img.height = 1080;
                            //         // img.strokeWidth = 10
                            //         // img.stroke = 'red'

                            //         console.log(img.width, img.height, tempCanvas.width, tempCanvas.height, "tempCanvas")

                            //         tempCanvas.add(img);
                            //         // img.center();
                            //         tempCanvas.renderAll();

                            //         var dataUrl = ""
                            //         switch (format) {
                            //             case 'png':
                            //                 dataUrl = tempCanvas.toDataURL({
                            //                     format: 'png',
                            //                     quality: 1.0
                            //                 });
                            //             break;       
                            //             case 'jpeg':
                            //                 dataUrl = tempCanvas.toDataURL({
                            //                     format: 'jpeg',
                            //                     quality: 1.0
                            //                 });
                            //             break;       
                            //             case 'webp':
                            //                 dataUrl = tempCanvas.toDataURL({
                            //                     format: 'webp',
                            //                     quality: 1.0
                            //                 });
                            //             break;       
                            //         }

                            //         tempCanvas.dispose();

                            //         // Résoudre la Promise avec l'URL des données
                            //         resolve(dataUrl);
                            //     } catch (error) {
                            //         reject(error);
                            //     }
                            // });
                            fabric.loadSVGFromURL(svgDataUrl, function (image, options) {
                                try {
                                    const img = fabric.util.groupSVGElements(image, options);
                                    img.scale(1);
                                    
                                    // img.left = -300
                                    // img.top = -300
                                    img.setCoords();
                                    var newW = img.width * img.scaleX
                                    var newH = img.height * img.scaleX

                                    // img.width = 1900;
                                    // img.height = 1080;
                                    // img.strokeWidth = 10
                                    // img.stroke = 'red'

                                    // console.log(img.width, img.height, tempCanvas.width, tempCanvas.height, "tempCanvas")

                                    tempCanvas.add(img);
                                    // img.center();
                                    tempCanvas.renderAll();

                                    var dataUrl = ""
                                    switch (format) {
                                        case 'png':
                                            dataUrl = tempCanvas.toDataURL({
                                                format: 'png',
                                                quality: 1.0
                                            });
                                        break;       
                                        case 'jpeg':
                                            dataUrl = tempCanvas.toDataURL({
                                                format: 'jpeg',
                                                quality: 1.0
                                            });
                                        break;       
                                        case 'webp':
                                            dataUrl = tempCanvas.toDataURL({
                                                format: 'webp',
                                                quality: 1.0
                                            });
                                        break;       
                                    }

                                    tempCanvas.dispose();

                                    // Résoudre la Promise avec l'URL des données
                                    resolve(dataUrl);
                                } catch (error) {
                                    reject(error);
                                }
                            });
                        });
                    }
            
            
                    var widthVisibility
                    var heightVisibility
                    var thickVisibility
                    var borderPositionId
                    var fixingPositionId
                    canva.getObjects().forEach((object, index) => {
                        // if(object.name === 'heightLine' || object.name === 'widthLine' || object.name === 'height-value' || object.name === 'width-value' || object.name === 'asowp-SignText'){
                        //     object.set('visible', false);
                        // }
                        if(object.name === 'widthLine' || object.name === 'width-value'){
                            widthVisibility = object.visible
                            object.set('visible', false);
                        }
                        if(object.name === 'heightLine' || object.name === 'height-value'){
                            heightVisibility = object.visible
                            object.set('visible', false);
                        }
                        if(object.name === 'asowp-SignText'){
                            // object.set('visible', true);
                        }
                        if(object.name === 'thickness-value'){
                            thickVisibility = object.visible
                            object.set('visible', false);
                        }
                        if(object.name === 'old-world-border' || object.name === 'rounded-corners-border'){
                            borderPositionId = index
                            object.bringToFront();
                        }
                        if(object.objectType === 'asowp-fixingMethods'){
                            fixingPositionId = index
                            object.bringToFront();
                        }
                    });
                    canva.renderAll();

                    await drawnPathFromText()
                    simulateCanvasClick(canva)
                            
                    let svgContent = canva.toSVG(options);
                    if(configTextType.value == "neon"){
                        svgContent = applyNeonEffectToSVG(svgContent, canva)
                    }
                    const svgWithFonts = await addFontsToSVG(svgContent);
                    const svgUrl = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgWithFonts))); 
                            
                    // Générer le SVG avec les polices intégrées pour le preview
                    const svgPreview = canva.toSVG(optionsPreview);
                    const svgDataPreview = await addFontsToSVG(svgPreview);
                    
                    var previewScreen = document.getElementById('showPreview')
                    var dataURL  = ""
                    // Génère l'image avec le format spécifié
                    switch (format) {
                        case 'png':
                            canva.setWidth(1900)
                            canva.setHeight(1080)
                            checkScreenSize(1900, 1080)
                            canva.zoomToPoint({x: canva.getWidth() /2, y: canva.getHeight() /2}, 1.5)

                            dataURL = canva.toDataURL({
                                format: 'png',
                                quality: 1.0 // 1.0 est la meilleure qualité pour les formats jpeg et webp
                            });
                            // dataURL = await convertSvgToImage(svgUrl, 'png')
                        break;
            
                        case 'jpeg':
                            canva.setWidth(1900)
                            canva.setHeight(1080)
                            checkScreenSize(1900, 1080)
                            canva.zoomToPoint({x: canva.getWidth() /2, y: canva.getHeight() /2}, 1.5)

                            canva.backgroundColor = configColors.value.canvasBackgroundColor
                            dataURL = canva.toDataURL({
                                format: 'jpeg',
                                quality: 1.0 // 1.0 est la meilleure qualité pour les formats jpeg et webp
                            });
                            // dataURL = await convertSvgToImage(svgUrl, 'jpeg')
                        break;
            
                        case 'webp':
                            canva.setWidth(1900)
                            canva.setHeight(1080)
                            checkScreenSize(1900, 1080)
                            canva.zoomToPoint({x: canva.getWidth() /2, y: canva.getHeight() /2}, 1.5)

                            dataURL = canva.toDataURL({
                                format: 'webp',
                                quality: 1.0 // 1.0 est la meilleure qualité pour les formats jpeg et webp
                            });
                            // dataURL = await convertSvgToImage(svgUrl, 'webp')
                        break;
            
                        case 'svg':
                            dataURL = svgUrl
                        break;
                    
                        default:
            
                        break;
                    }
            
                    // Restaure les dimensions et l'affichage originales du canvas
                    canvas.setBackgroundColor('transparent', canvas.renderAll.bind(canvas));
                    canva.getObjects().forEach(object => {
                        // if(object.name === 'heightLine' || object.name === 'widthLine' || object.name === 'height-value' || object.name === 'width-value' || object.name === 'asowp-SignText'){
                        //     object.set('visible', true);
                        // }
                        if(object.name === 'widthLine' || object.name === 'width-value'){
                            object.set('visible', widthVisibility);
                        }
                        if(object.name === 'heightLine' || object.name === 'height-value'){
                            object.set('visible', heightVisibility);
                        }
                        if(object.name === 'asowp-SignText'){
                            // object.set('visible', false);
                        }
                        if(object.name === 'thickness-value'){
                            object.set('visible', thickVisibility);
                        }
                        if(object.name === 'watermark' || object.name === 'asowp-svg-path' || object.name === 'asowp-signPattern'){
                            // console.log(object, "watermark")
                            canva.remove(object)
                        }
                        if(object.name === 'safeObject'){
                            if(activeFace.value == 'front-face' && activeFace1Border.value != 'normal'){
                                object.shadow = defaultShadow.value
                            }
                            if(activeFace.value == 'back-face' && activeFace2Border.value != 'normal'){
                                object.shadow = defaultShadow.value
                            }
                        }
                        if(object.name === 'old-world-border' || object.name === 'rounded-corners-border'){
                        // borderPositionId = index
                            object.moveTo(borderPositionId);
                        }
                        if(object.objectType === 'asowp-fixingMethods'){
                            object.moveTo(fixingPositionId);
                        }
                    });
        
        
                    if(purpose === 'preview'){
                        // if(configTextType.value == 'neon'){
                        //     canva.setWidth(1900)
                        //     canva.setHeight(1080)
                        //     checkScreenSize(1900, 1080)
                        //     canva.zoomToPoint({x: canva.getWidth() /2, y: canva.getHeight() /2}, 1.5)

                        //     prevImg.value = canva.toDataURL({
                        //         format: 'png',
                        //         quality: 1.0 // 1.0 est la meilleure qualité pour les formats jpeg et webp
                        //     });                   
                        // }
                        if(configTextType.value != 'neon'){
                            previewScreen.innerHTML = svgDataPreview;
        
                            const svgElement = previewScreen.querySelector('svg');
        
                            // Ajoutez une classe à l'élément SVG
                            svgElement.classList.add('asowp-z-10');
                        }

                        if(configImageSettings.value.scenes.length > 0){
                            var miniPreview = document.getElementById('asowp-miniPreview')
                            miniPreview.innerHTML = svgDataPreview;

                        }
                    }else{
                        var ink = document.createElement("a");
                        ink.href = dataURL;
                        ink.download = 'image' + "." + format;
                        document.body.appendChild(ink);
                        ink.click();
                        document.body.removeChild(ink);
                    }

                    checkScreenSize()
                    canva.renderAll();
                    simulateCanvasClick(canva)

                    resolve(dataURL)
                });
            }catch (error) {
                reject("Une erreur est survenue:", error);
            }
        })
        // return dataURL;

    }

    function convertToPx(dimension, unit) {
        var dimensions = dimension;
        var unit = unit;
        if (typeof unit != "undefined" && typeof dimensions != "undefined") {
            switch (unit) {
            case "cm":
                dimensions = dimensions * 120;
                break;
            case "mm":
                dimensions = dimensions * 12;
                break;
            case "in":
                dimensions = dimensions * 300;
                break;
            case "pt":
                dimensions = dimensions / 0.75;
                break;
            case "Px":
                dimensions = dimensions;
            default:
                break;
            }
            return dimensions;
        }
    }
    function generateHighResolutionImage(canva, format) {
        // Dimensions actuelles du canvas en pixels
        var width = 12
        var height = 7
        var dpi = 300
        
        var originalWidth = 0
        var originalHeight = 0
        const originalZoom = canva.getZoom();
        if(width){
            var realWidth = convertToPx(width, 'in')
            var realHeight = convertToPx(height, 'in')
            originalWidth = realWidth;
            originalHeight = realHeight;
        }else{
            originalWidth = canva.width;
            originalHeight = canva.height;
        }


        // Taille physique en pouces (supposons que le canvas est initialement à 72 DPI)
        const widthInInches = originalWidth / 72;
        const heightInInches = originalHeight / 72;

        // Nouvelles dimensions pour 300 DPI
        const scaleFactor = dpi / 72;
        const newWidth = Math.round(originalWidth * scaleFactor);
        const newHeight = Math.round(originalHeight * scaleFactor);

        // console.log(scaleFactor, newWidth, newHeight, originalWidth, originalHeight)
        //cacher les element à retirer de l'image
        var thickVisibility
        canva.getObjects().forEach(object => {
            if(object.name === 'heightLine' || object.name === 'widthLine' || object.name === 'height-value' || object.name === 'width-value' || object.name === 'thickness-value'){
                object.set('visible', false);
            }
            if(object.name === 'thickness-value'){
                thickVisibility = object.visible
                object.set('visible', false);
            }
            // if(object.name === 'watermark'){
            //     canva.remove(object)
            // }
        });

        // Créer un canvas temporaire à haute résolution
        // const tempCanvas = new fabric.Canvas(document.createElement('canvas'));
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = newWidth;
        tempCanvas.height = newHeight;
        const tempContext = tempCanvas.getContext('2d');

        // Configurer le lissage
        tempContext.imageSmoothingEnabled = true;
        tempContext.imageSmoothingQuality = 'high';

        // Augmenter temporairement la taille du canvas Fabric
        canva.setWidth(newWidth);
        canva.setHeight(newHeight);
        canva.setZoom(12);
        centerSign(canva)


        // Rendre le canvas à la nouvelle résolution
        canva.renderAll();

        // Copier le contenu sur le canvas temporaire
        tempContext.drawImage(canva.getElement(), 0, 0, newWidth, newHeight);

        // Restaurer les dimensions originales du canvas Fabric
        canva.setWidth(originalWidth);
        canva.setHeight(originalHeight);
        canva.getObjects().forEach(object => {
            if(object.name === 'heightLine' || object.name === 'widthLine' || object.name === 'height-value' || object.name === 'width-value' || object.name === 'thickness-value'){
                object.set('visible', true);
            }
            if(object.name === 'thickness-value'){
                object.set('visible', thickVisibility);
            }
        });
        // canva.setZoom(originalZoom);
        checkScreenSize()


        function canvasToSVG(canva, width, height) {
            // Obtenez l'image base64 du canvas
            const imageData = canva.toDataURL('image/png');
            
            // Créez le contenu SVG
            const svgContent = `
                <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
                <image width="${width}" height="${height}" href="${imageData}" />
                </svg>
            `;
            
            // Encodez le contenu SVG en base64
            const svgBase64 = btoa(unescape(encodeURIComponent(svgContent)));
            const dataUrl = `data:image/svg+xml;base64,${svgBase64}`;
            
            return dataUrl;
        }

        canva.renderAll();

        // Générer l'URL de données de l'image
        // const dataUrl = tempCanvas.toDataURL(`image/${format}`, 1.0);
        var dataUrl = ''
        switch (format) {
            case 'png':
                dataUrl = tempCanvas.toDataURL({
                    format: 'png',
                    quality: 1.0 // 1.0 est la meilleure qualité pour les formats jpeg et webp
                });
            break;

            case 'jpeg':
                canva.backgroundColor = configColors.value.canvasBackgroundColor
                dataUrl = tempCanvas.toDataURL({
                    format: 'jpeg',
                    quality: 1.0 // 1.0 est la meilleure qualité pour les formats jpeg et webp
                });
            break;

            case 'webp':
                dataUrl = tempCanvas.toDataURL({
                    format: 'webp',
                    quality: 1.0 // 1.0 est la meilleure qualité pour les formats jpeg et webp
                });
            break;

            case 'svg':
                // const svgData = canva.toSVG();
                const svgData = tempCanvas.toDataURL({
                    format: 'png',
                    quality: 1.0 // 1.0 est la meilleure qualité pour les formats jpeg et webp
                });
                // dataUrl = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
                dataUrl = canvasToSVG(tempCanvas, newWidth, newHeight)
            break;

            case 'pdf':
                const zoom = canva.getZoom();
                const pan = canva.viewportTransform;
                const pdfWidth = newWidth / zoom;
                const pdfHeight = newHeight / zoom;
                const offsetX = -pan[4] / zoom;
                const offsetY = -pan[5] / zoom;

                const pdf = new jsPDF({
                    orientation: 'landscape',
                    unit: 'px',
                    format: [pdfWidth, pdfHeight]
                });

                pdf.addImage(tempCanvas.toDataURL('image/png'), 'PNG', offsetX/4, offsetY/100, pdfWidth/2, pdfHeight/2);
                const pdfOutput = pdf.output('blob');

                dataUrl = pdfOutput
            break;
        
            default:

            break;
        }
        // return new Promise((resolve, reject) => {
        //     try {
        //         var dataUrl = '';
        //         switch (format) {
        //             case 'png':
        //                 dataUrl = tempCanvas.toDataURL('image/png', 1.0);
        //                 resolve(dataUrl);
        //                 break;
        //             case 'jpeg':
        //                 canva.backgroundColor = configColors.value.canvasBackgroundColor;
        //                 dataUrl = tempCanvas.toDataURL('image/jpeg', 1.0);
        //                 resolve(dataUrl);
        //                 break;
        //             case 'webp':
        //                 dataUrl = tempCanvas.toDataURL('image/webp', 1.0);
        //                 resolve(dataUrl);
        //                 break;
        //             case 'svg':
        //                 dataUrl = canvasToSVG(tempCanvas, newWidth, newHeight);
        //                 resolve(dataUrl);
        //                 break;
        //             case 'pdf':
        //                 const pdf = new jsPDF({
        //                     orientation: newWidth > newHeight ? 'landscape' : 'portrait',
        //                     unit: 'px',
        //                     format: [newWidth, newHeight]
        //                 });

        //                 pdf.addImage(tempCanvas.toDataURL('image/png'), 'PNG', 0, 0, newWidth, newHeight);
        //                 const pdfOutput = pdf.output('blob');
        //                 resolve(pdfOutput); // Résoudre avec le Blob directement
        //             break;
        //             reject(new Error('Format non supporté'));
        //         }
        //     } catch (error) {
        //         reject(error);
        //     }
        // });

        // const link = document.createElement('a');
        // link.href = dataUrl;
        // link.download = 'my_design';
        // link.click();

        // Créer un objet avec les informations utiles
        return dataUrl
        // return {
        //     dataUrl: dataUrl,
        //     width: newWidth,
        //     height: newHeight,
        //     widthInInches: widthInInches,
        //     heightInInches: heightInInches,
        //     dpi: dpi
        // };
    }


    // fonctions concernant l'affichage des exemples
    //popup d'exemple matéral
    var showMaterialEx = ref(false)
    var materialExample = ref('')
    function showMaterialExample(statut, example){
        showMaterialEx.value = statut
        if(example){
            materialExample.value = example
        }
    }

    //popup d'exemple fixing-methode
    var showFixingEx = ref(false)
    var fixingExample = ref('')
    function showFixingExample(statut, example){
        showFixingEx.value = statut
        if(example){
            fixingExample.value = example
        }
    }    

    //popup d'exemple matéral
    var showAddComponentEx = ref(false)
    var addComponentExample = ref('')
    var addComponentExId = ref(0)
    function showAddComponentExample(statut, example, id){
        showAddComponentEx.value = statut
        if(id){
            addComponentExId.value = id
        }
        if(example){
            addComponentExample.value = example
        }
    }    

    // popup d'example additionnal options "yes/no"
    var yesNoIndex = ref()
    var showYesNo = ref(false)
    var showYesNoImg =ref("")
    function showYesNoExample(img, id){
        yesNoIndex.value = id
        showYesNo.value = !showYesNo.value
        showYesNoImg.value = img
    }

    // popup d'example additionnal options "image-input"
    var inputImageIndex = ref();
    var inputImageLabel = ref('');
    var inputImageExample = ref(false);
    var inputImageImg = ref('');
    function showInputImageExample(img, id, label){
        inputImageIndex.value = id;
        inputImageLabel.value = label;
        inputImageExample.value = !inputImageExample.value
        inputImageImg.value = img
    }

    //popup d'example additionnal option "dropdown"
    var dropdownExampleImg = ref('');
    var dropdownExample = ref(false);
    function showDropdownExample(){
        dropdownExample.value = !dropdownExample.value
    }

    var textSideHelp = ref(false);
    function show3DTextHelp(){
        textSideHelp.value = !textSideHelp.value
    }

    const isAddingToCart = ref(false)
    const addToCart = async ()=>{
        isAddingToCart.value = true;
        const cart_data = {
            recaps:{...configData.value,
                custom_price: parseFloat(
                    finalPrices.value + parseFloat(asowp_configurator_data.regularPrice)
                ).toFixed(asowp_configurator_data.decimals)
            },
            variation_id:asowp_configurator_data.productID,
            quantity:1
        }
        var add = await add_to_cart(asowp_data.ajax_url, cart_data,asowp_configurator_data.frontend_nonce,props.config.data.settings.generals.product.redirectToCheckOutPage);
        if(!add.success){
            toastMessage(add.message,"error");
            isAddingToCart.value = false
        }
    }

    const isSavingTemplate = ref(false)
    const saveTemplate = async ()=>{
        isSavingTemplate.value = true;
        const template_data = {
            ...template.value,
            data:{
                templateData:{...templateData.value},
                cartData:{...configData.value,custom_price:finalPrices.value}
            }
        }
        const result = await api.updateTemplate(template_id,template_data);
        if(result.success){
            isSavingTemplate.value=false;
            if(result.success == true){
                toastMessage(result.message);
            }else{
                toastMessage(result.message,"warning");
            }
        }else{
            isSavingTemplate.value=false;            
            toastMessage(result.message,"error");
        }
    }


    onMounted(async() => {

        try{
            await document.fonts.ready;

            if(document.querySelector("#asowp-configurator-loader")){
                document.querySelector("#asowp-configurator-loader").remove();
            }
            configSettings.value = props.config.data.settings
            configDoublePart.value = props.config.data.settings.customizerSign.signPart.doublePart

            // allSizes.value = props.manage.manageSize
            allMaterials.value = props.config.data.materials
            allShapes.value = props.manage.allShapes
            allFixings.value = props.manage.allFixingMethod
            allColors.value = props.manage.colors
            allBorders.value = props.manage.allBorder
            allFonts.value = props.manage.fonts
            allClipart.value = props.manage.cliparts
            
            configTextSettings.value = props.config.data.settings.customizerSign.text
            configTextFontSettings.value = props.config.data.settings.customizerSign.text.enableFontSize
            configImageSettings.value = props.config.data.settings.customizerSign.images
            configImageSettingsClipart.value = props.config.data.settings.customizerSign.images.enableClipart
            configImageSettingsFilters.value = props.config.data.settings.customizerSign.images.filter
            configSectionIcons.value = props.config.data.settings.languageImages.images
            configOutputSettings.value = props.config.data.settings.generals.output
            configVisualiserTexts.value = props.config.data.settings.languageImages.visualizer
            configTextType.value = configTextSettings.value.textType;

            customSizeValues.value.label = (configVisualiserTexts.value.customSize && configVisualiserTexts.value.customSize.trim() !== '' ? configVisualiserTexts.value.customSize : 'Custom size')

            configAdditionnalOptions.value = props.config.data.additionalOptions
            
            // console.log(props.config.data.settings.languageImages.uploadDesign, "configTextFontSettings")

            let acceptedFormatTable = configImageSettings.value.fileUploadScript.allowedUploadsExtentions.map(element => (element === 'svg' ? 'image/svg+xml' : 'image/' + element));
            configImagesFormat.value = acceptedFormatTable.join(', ');
            // console.log(props.template, "config")

            handleGetImageSettings(configImageSettings.value)
            // console.log(configImageSettings.value.scenes, "configTextFontSettings")

            handleGetCurrentUnit(configSettings.value.customizerSign.customizerOptions.measurementUnit, configTextFontSettings.value.defaultFontSize, configTextFontSettings.value.minimumFontSize, configTextFontSettings.value.maximumFontSize, (allFonts.value.length > 0 ? allFonts.value[0].label : 'Arial'), (allFonts.value.length > 0 ? allFonts.value[0].url : ''))
            handleGetDefaultText(
                {
                    width: (configVisualiserTexts.value.textWidth && configVisualiserTexts.value.textWidth.trim() !== '' ? configVisualiserTexts.value.textWidth : 'width'),
                    height: (configVisualiserTexts.value.textHeight && configVisualiserTexts.value.textHeight.trim() !== '' ? configVisualiserTexts.value.textHeight : 'height'),
                    left: (configVisualiserTexts.value.textLeft && configVisualiserTexts.value.textLeft.trim() !== '' ? configVisualiserTexts.value.textLeft : 'Left'),
                    top: (configVisualiserTexts.value.textTop && configVisualiserTexts.value.textTop.trim() !== '' ? configVisualiserTexts.value.textTop : 'top'),
                    right: (configVisualiserTexts.value.textRight && configVisualiserTexts.value.textRight.trim() !== '' ? configVisualiserTexts.value.textRight : 'right'),
                    bottom: (configVisualiserTexts.value.textBottom && configVisualiserTexts.value.textBottom.trim() !== '' ? configVisualiserTexts.value.textBottom : 'bottom'),
                }
            )
            handleGetTextType(configTextType.value)
            
            fontFamSelected.value = (allFonts.value.length > 0 ? allFonts.value[0].label : 'Arial')
            configUnit.value = configSettings.value.customizerSign.customizerOptions.measurementUnit
            

            var optionss = document.querySelector('#asowp-options-container')
            document.addEventListener('click', handleDocumentClick)
            console.log(fabric.version)

            const canvasElementFace1 = canvasFace1Ref.value
            const canvasElementFace2 = canvasFace2Ref.value

            // document.addEventListener("DOMContentLoaded", function() {

                var canvasContainer = document.getElementById("asowp-canvas-containers")
                var canvasWidth = canvasContainer.clientWidth;
                var canvasHeight = canvasContainer.clientHeight;

                canvas = new fabric.Canvas(canvasElementFace1,{
                    // backgroundColor : "#f5f5f5",
                    width: canvasWidth, 
                    height: canvasHeight, 
                    // selectable: true,
                    // hasControls: true,
                    interactive: true,
                    name: 'front-face'
                });
                canvasBack = new fabric.Canvas(canvasElementFace2,{
                    // backgroundColor : "#f5f5f5",
                    width: canvasElementFace2.clientWidth, 
                    height: canvasElementFace2.clientHeight, 
                    // selectable: true,
                    // hasControls: true,
                    interactive: true,
                    name: 'back-face'
                });

                canvas.hoverCursor = 'pointer';
                canvasBack.hoverCursor = 'pointer';

                const rectWidth = 400; 
                const rectHeight = 200; 
                const clipWidth = rectWidth + (rectWidth * 0.3); 
                const clipHeight = rectHeight + (rectHeight * 0.3); 

                const rectLeft = (canvas.width /2) -(rectWidth/2)
                const rectTop = (canvas.height/2) - (rectHeight/2);
                const clipLeft = (canvas.width /2) -(clipWidth/2)
                const clipTop = (canvas.height/2) - (clipHeight/2);

                const rectangle = new fabric.Rect({
                    width: rectWidth,
                    height: rectHeight,
                    fill: '#cfcece', // Couleur du rectangle
                    left: rectLeft,
                    top: rectTop,
                    shadow: defaultShadow.value,
                    selectable: false,
                    name: 'safeObject',
                    originX: 'center',
                    originY: 'center',
                    id: 0,
                });
                const rectangle2 = new fabric.Rect({
                    width: rectWidth,
                    height: rectHeight,
                    fill: '#cfcece', // Couleur du rectangle
                    left: rectLeft,
                    top: rectTop,
                    shadow: defaultShadow.value,
                    selectable: false,
                    name: 'safeObject',
                    originX: 'center',
                    originY: 'center',
                    id: 0,
                });
                
                const cnvasClip = new fabric.Rect({
                    width: clipWidth ,
                    height: clipHeight ,
                    left: clipLeft,
                    top: clipTop,
                });

                const bodyElement = document.body;
                const computedStyle = getComputedStyle(bodyElement);

                const pageFontFamily = computedStyle.fontFamily

                var hLine = new fabric.Line([(rectangle.left + rectangle.width +20), rectangle.top, (rectangle.left + rectangle.width +20), (rectangle.top + rectangle.height)], {
                    stroke: 'black',
                    strokeWidth: 2,
                    selectable: false,
                    name: 'heightLine',
                    id: 1, 
                    visible: (configSettings.value.customizerSign.customizerOptions.showHideMeasurements === 'both' || configSettings.value.customizerSign.customizerOptions.showHideMeasurements === 'only-height' ? true : false)
                });
                var hValue = new fabric.IText(String(rectHeight),{
                    left: (rectangle.left + rectangle.width +10),
                    top: rectangle.top + (rectangle.height/2),
                    fontSize: 15,
                    fontFamily: pageFontFamily,
                    fill: 'black',
                    name: 'height-value',
                    // backgroundColor: configColors.value.canvas.backgroundColor,
                    angle: 90,
                    id: 2,
                    selectable: false,
                    visible: (configSettings.value.customizerSign.customizerOptions.showHideMeasurements === 'both' || configSettings.value.customizerSign.customizerOptions.showHideMeasurements === 'only-height' ? true : false)
                })
                
                var wLine = new fabric.Line([rectangle.left, (rectangle.top+rectangle.height+20), (rectangle.left+rectangle.width+20), (rectangle.top+rectangle.height+20) ], {
                    stroke: 'black',
                    strokeWidth: 2,
                    selectable: false,
                    name: 'widthLine',
                    id: 3,
                    visible: (configSettings.value.customizerSign.customizerOptions.showHideMeasurements === 'both' || configSettings.value.customizerSign.customizerOptions.showHideMeasurements === 'only-width' ? true : false)
                });
                var wValue = new fabric.IText(String(rectWidth),{
                    left: rectangle.left + (rectangle.width/2),
                    top: rectangle.top + (rectangle.height +10),
                    fontSize: 15,
                    fontFamily: pageFontFamily,
                    fill: 'black',
                    name: 'width-value',
                    id: 4,
                    selectable: false,
                    visible: (configSettings.value.customizerSign.customizerOptions.showHideMeasurements === 'both' || configSettings.value.customizerSign.customizerOptions.showHideMeasurements === 'only-width' ? true : false)
                })
                var thickness = new fabric.IText(String(configVisualiserTexts.thickness + ': 1cm'),{
                    left: rectangle.left + (rectangle.width/2),
                    top: rectangle.top + (rectangle.height +20),
                    fontSize: 15,
                    fontFamily: pageFontFamily,
                    fill: 'black',
                    name: 'thickness-value',
                    id: 4,
                    selectable: false,
                })


                canvas.add(rectangle, hLine, hValue, wLine, wValue, thickness);
                canvasBack.add(rectangle2);
            
                if(configDoublePart.value.active === true){
                    getCanvas(canvas, canvasBack, 'double')
                }else{
                    getCanvas(canvas, canvasBack, 'simple')
                }
                handleCloneCanvas(canvas, canvasBack)
            
                canvas.selection = false;
                canvasBack.selection = false;

                if(route.name == 'template-maker'){
                    template.value = await api.getTemplate(template_config_id,template_id);
                    asowp_configurator_data.regularPrice = template.value.basePrice;
                }

                handleCheckTemplate(props.template.designFromTemplate)
                if(route.name === 'template-maker'){
                    if(template.value.data.templateData.length == 0){
                        // console.log(template.value.data.templateData, "template-maker")
                        if(props.config.data.materials.length > 0){
                            selectMaterial(props.config.data.materials[0], 0)
                        }else{
                            hideCanvasElements()
                        }
                        if(materialType.value === 'simple'){
                            selectSimpleFirstValue()
                        }
                        if(materialType.value === 'advance'){
                            selectAdvanceFirstValue()
                        }
                    }else{                    
                        await selectTemplate(template.value.data.templateData, 'making')
                    }
                }else{
                    if(props.template.designFromTemplate === true){
                        await selectTemplate(props.template.template.data.templateData)
                    }else{
                        if(props.config.data.materials.length > 0){
                            selectMaterial(props.config.data.materials[0], 0)
                        }else{
                            hideCanvasElements()
                        }
                        if(materialType.value === 'simple'){
                            selectSimpleFirstValue()
                        }
                        if(materialType.value === 'advance'){
                            selectAdvanceFirstValue()
                        }
                    }
                }

                fabric.Object.prototype.transparentCorners = false;
                fabric.Object.prototype.cornerColor = '#181818';
                fabric.Object.prototype.borderColor = 'black';
                fabric.Object.prototype.cornerStyle = 'circle';
                
                canvas.on('selection:created', function(e){
                    showObjectValues()
                });
                canvas.on('selection:updated', function(e) {
                    var object = e.selected[0]
                    checkTemplateObjectLockMoving(object)
                });
                canvas.on('selection:cleared', closeObjectValues);
                canvas.on('object:moving', function(e) {
                    var activeObject = e.target;
                    var objects = canvas.getObjects();
                    objects.forEach(function(object) {
                        if(object.id == activeObject.id){
                            object.top = activeObject.top
                            object.left = activeObject.left
                        }
                    })
                });
                canvas.on('object:scaling', function(e) {
                    var activeObject = e.target;
                    var objects = canvas.getObjects();
                    objects.forEach(function(object) {
                        if(object.id == activeObject.id){
                            object.scaleX = activeObject.scaleX
                            object.scaleY = activeObject.scaleY
                        }
                    })
                });
                canvas.on('mouse:down', function(options) {
                    var sign = handleGetObjectByName('safeObject');
                    canvas.getObjects().forEach(function(obj) {
                        if (obj.name === 'asowp-SignText' || obj.name === "asowp-SignTextLayer") {
                            if(obj.isEditing){
                                obj.exitEditing();
                            }
                            obj.clipPath = handleClipAddedObject(canvas);
                            canvas.renderAll();
                        }
                        if (obj.name === 'asowp-SignImage') {
                            obj.clipPath = handleClipAddedObject(canvas);
                            canvas.renderAll();
                        }
                    });
                });
                canvas.on('mouse:wheel', function(opt) {
                    if (opt.e.ctrlKey) { // Vérifier si la touche Ctrl est enfoncée
                        var delta = opt.e.deltaY;
                        var zoom = canvas.getZoom();
                        zoom *= 0.999 ** delta;
                        if (zoom > 20) zoom = 20;
                        if (zoom < 0.01) zoom = 0.01;

                        // console.log("delta:", delta, "zoom:", zoom)

                        canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
                        opt.e.preventDefault();
                        opt.e.stopPropagation();
                    }
                });

                canvasBack.on('selection:created', showObjectValues);
                canvasBack.on('selection:updated', function(e) {
                    var object = e.selected[0]
                    checkTemplateObjectLockMoving(object)
                });
                canvasBack.on('selection:cleared', closeObjectValues);
                canvasBack.on('object:moving', function(e) {
                    var activeObject = e.target;
                    var objects = canvasBack.getObjects();
                    objects.forEach(function(object) {
                        if(object.id == activeObject.id){
                            object.top = activeObject.top
                            object.left = activeObject.left
                        }
                    })
                });
                canvasBack.on('object:scaling', function(e) {
                    var activeObject = e.target;
                    var objects = canvasBack.getObjects();
                    objects.forEach(function(object) {
                        if(object.id == activeObject.id){
                            object.scaleX = activeObject.scaleX
                            object.scaleY = activeObject.scaleY
                        }
                    })
                });
                canvasBack.on('mouse:down', function(options) {
                    var sign = handleGetObjectByName('safeObject');
                    canvasBack.getObjects().forEach(function(obj) {
                        if (obj.name === 'asowp-SignText' || obj.name === "asowp-SignTextLayer") {
                            if(obj.isEditing){
                                obj.exitEditing();
                            }
                            obj.clipPath = handleClipAddedObject(canvasBack);
                            canvasBack.renderAll();
                        }
                        if (obj.name === 'asowp-SignImage') {
                            obj.clipPath = handleClipAddedObject(canvasBack);
                            canvasBack.renderAll();
                        }
                    });
                });
                canvasBack.on('mouse:wheel', function(opt) {
                    if (opt.e.ctrlKey) { // Vérifier si la touche Ctrl est enfoncée
                        var delta = opt.e.deltaY;
                        var zoom = canvasBack.getZoom();
                        zoom *= 0.999 ** delta;
                        if (zoom > 20) zoom = 20;
                        if (zoom < 0.01) zoom = 0.01;

                        // console.log("delta:", delta, "zoom:", zoom)

                        canvasBack.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
                        opt.e.preventDefault();
                        opt.e.stopPropagation();
                    }
                });
                
                activeCanvas = canvas

                checkScreenView()

                let resizeTimer;
                window.addEventListener('load', () => {
                    checkScreenView()
                });
                window.addEventListener('resize', () => {
                    clearTimeout(resizeTimer);
                    resizeTimer = setTimeout(() => {
                        checkScreenView()
                        checkScreenSize()
                        // centerSign(canvas)
                        // centerSign(canvasBack)
                    }, 250); // Délai de 250 millisecondes
                });
                
            // });
            
            if(window.innerWidth < 688){
                showOption.value = true
            }
            
            
            setScrollColor(configColors.value.optionsSideBar.options.modals.headerBackgroundColor)
            setIsLoadedToFalse()
            activeCanvas = canvas

            window.dispatchEvent(new Event('resize'));
            if(route.name == 'template-maker'){
                template.value = await api.getTemplate(template_config_id,template_id);
            }
            
            return {
                canvas
            }
        } catch (error) {
            console.error('Erreur lors du chargement des polices:', error);
        }

    });

</script>

<style scoped>
    .animated-bg {
        position: absolute;
        width: 100%;
        height: 100%;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        position: absolute;
        top: 0;
        left: 100%; /* Initialement hors de l'écran à droite */
        animation: slideIn 2s forwards; /* Animation de 2 secondes */
    }

    .flipper {
        position: relative;
        /* width: 100%;
        height: 100%; */
        text-align: center;
        transition: transform 0.8s;
        transform-style: preserve-3d;
    }

    .flipper-switch {
        transform: rotateY(180deg);
    }



    #asowp-sign-recto, #asowp-sign-verso {
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
    }

    #asowp-sign-recto {
        /* background-color: #bbb; */
        color: black;
    }

    #asowp-sign-verso {
        /* background-color: dodgerblue; */
        color: white;
        transform: rotateY(180deg);
    }

    @keyframes slideIn {
        to {
            left: 0; /* Se déplace vers la gauche pour atteindre la position normale */
        }
    }
</style>
