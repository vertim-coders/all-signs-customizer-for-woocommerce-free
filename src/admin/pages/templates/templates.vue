<template>
    <div class="asowp-pt-5">
        <div v-if="!isNewTemplate">
            <div v-if="!isFetching" class="asowp-bg-[#F8F9FB] asowp-p-4 asowp-grid asowp-grid-cols-4">
                <div class="asowp-cursor-pointer asowp-bg-[#d3d3d3] asowp-border-[1px] asowp-border-solid asowp-border-[#d3d3d3] asowp-flex asowp-flex-col asowp-justify-center asowp-items-center" :class="templates.length==0 ? 'asowp-h-[100px]' :''" @click="isNewTemplate = true">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="asowp-w-9 ">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    <span class="0 asowp-text-[17px]">Add new template</span>
                </div>
                <div v-for="tem in templates" class="asowp-border-[1px] asowp-border-[#d3d3d3] asowp-border-solid asowp-p-3 asowp-bg-white">
                    <div class="asowp-flex asowp-justify-center asowp-items-center pb-2 asowp-h-[200px]">
                        <div class="asowp-w-full asowp-h-full asowp-flex asowp-items-center asowp-justify-center asowp-overflow-hidden asowp-object-cover">
                            <img class="asowp-w-full" v-if="tem.data.prevImg && tem.data.prevImg!=''" :src="tem.data.prevImg" alt="">
                            <img class="asowp-w-full" v-if="!tem.data.prevImg" src="../../../../assets/images/img_rectangle_noir.png" alt="">
                        </div>
                    </div>
                    <div class="asowp-my-1">
                        <div class="asowp-font-bold asowp-text-[14px]">{{tem.data.name}}</div>
                    </div>
                    <div class="asowp-mb-2">
                        <svg width="100%" height="1" viewBox="0 0 258 1" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <line y1="0.5" x2="258" y2="0.5" stroke="url(#paint0_linear_1396_9108)"/>
                            <defs>
                            <linearGradient id="paint0_linear_1396_9108" x1="129" y1="1" x2="129" y2="2" gradientUnits="userSpaceOnUse">
                            <stop offset="0.055" stop-color="#B5B5B5" stop-opacity="0.36"/>
                            <stop offset="0.58" stop-color="#B5B5B5"/>
                            </linearGradient>
                            </defs>
                        </svg>

                    </div>
                    <div class="asowp-flex asowp-justify-between">
                        <div class="asowp-bg-[#FFA08859] asowp-w-fit asowp-p-1.5 asowp-rounded-full asowp-px-4">
                            <span class="asowp-text-[#720909] asowp-font-bold asowp-text-[12px]">Base Price : {{tem.data.basePrice + ' '+ currencySumbol}}</span>
                        </div>
                        <div class="asowp-flex asowp-justify-end ">
                            <button class="asowp-bg-transparent asowp-border-none asowp-text-[#2DD05B] asowp-cursor-pointer" @click="selectTemplate(tem.index,tem.data,false)">
                                <img class="asowp-w-5 asowp-h-5" src="../../../../assets/icons/ic_edit.svg" alt="">
                            </button>
                            <button class="asowp-bg-transparent asowp-border-none asowp-text-[#A00000] asowp-cursor-pointer" @click="selectTemplate(tem.index,tem.data,true)">
                                <img class="asowp-w-5 asowp-h-5" src="../../../../assets/icons/ic_delete.svg" alt="">
                            </button>
                            <button class="asowp-border-none asowp-bg-transparent asowp-cursor-pointer" @click="goToTemplate(tem.data,tem.index)">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="asowp-w-6 asowp-h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="isFetching" class="asowp-bg-white asowp-border-solid asowp-border asowp-border-[#D1D1D1] asowp-flex asowp-flex-col asowp-space-y-2 asowp-justify-center asowp-items-center asowp-w-full asowp-h-[200px] p-4">
                <img class="asowp-w-[100px] asowp-h-[100px]" src="../../../../assets/icons/ic_loading.svg" alt="">
            </div>
        </div>
        <div class="asowp-space-y-1 " v-if="isNewTemplate">
            <div class="asowp-bg-[#F8F9FB] asowp-px-4 asowp-py-4">
                <span class="asowp-text-[16px] asowp-font-bold">
                    {{isEdit ? 'Edit template' : 'Create template'}}
                </span>
            </div>
            <div class="asowp-bg-[#F8F9FB] asowp-px-4 asowp-py-4 asowp-space-y-2">
                <div class="asowp-flex asowp-flex-col asowp-space-y-2">
                    <label class="asowp-text-[12px] asowp-text-[#444444]">Select category</label>
                    <Multiselect
                        v-model="template.categoryId"
                        placeholder="Select category"
                        noOptionsText="No category found"
                        :options="categories"
                        label="name"
                        trackBy="name"
                    />
                </div>
                <div class="asowp-flex asowp-justify-end asowp-text-[12px]">
                    <button class="asowp-flex asowp-w-fit asowp-h-fit asowp-rounded asowp-bg-[#016464] asowp-px-4 asowp-space-x-2 asowp-p-1.5 asowp-border-none asowp-text-white asowp-opacity-90 hover:asowp-opacity-100 asowp-cursor-pointer" @click="openCategoryModal = true">
                        <svg class="asowp-w-5 asowp-h-5" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g id="plus-lg">
                            <path id="Vector" fill-rule="evenodd" clip-rule="evenodd" d="M11 2.75C11.1823 2.75 11.3572 2.82243 11.4861 2.95136C11.6151 3.0803 11.6875 3.25516 11.6875 3.4375V10.3125H18.5625C18.7448 10.3125 18.9197 10.3849 19.0486 10.5139C19.1776 10.6428 19.25 10.8177 19.25 11C19.25 11.1823 19.1776 11.3572 19.0486 11.4861C18.9197 11.6151 18.7448 11.6875 18.5625 11.6875H11.6875V18.5625C11.6875 18.7448 11.6151 18.9197 11.4861 19.0486C11.3572 19.1776 11.1823 19.25 11 19.25C10.8177 19.25 10.6428 19.1776 10.5139 19.0486C10.3849 18.9197 10.3125 18.7448 10.3125 18.5625V11.6875H3.4375C3.25516 11.6875 3.0803 11.6151 2.95136 11.4861C2.82243 11.3572 2.75 11.1823 2.75 11C2.75 10.8177 2.82243 10.6428 2.95136 10.5139C3.0803 10.3849 3.25516 10.3125 3.4375 10.3125H10.3125V3.4375C10.3125 3.25516 10.3849 3.0803 10.5139 2.95136C10.6428 2.82243 10.8177 2.75 11 2.75Z" fill="white"/>
                            </g>
                        </svg>
                        <div class="asowp-text-[14px]">
                            Add new category
                        </div>
                    </button>
                </div>
                <div class="asowp-flex asowp-flex-col asowp-space-y-2" :class="`${isEmptyConfig ? 'asowp-field-required asowp-font-bold' :''}`" >
                    <label class="asowp-text-[12px] asowp-text-[#444444]">Select Configuration</label>
                    <div  v-if="!isEdit">
                        <Multiselect
                            v-model="template.configId"
                            placeholder="Select configuration"
                            :options="configurations"
                            label="name"
                            trackBy="name"
                        />
                    </div>
                    <select disabled="disabled" v-if="isEdit" v-model="template.configId">
                        <option :value="config.value" v-for="config in configurations">{{ config.name }}</option>
                    </select>
                </div>
            </div>
            <div class="asowp-bg-[#F8F9FB] asowp-px-4 asowp-py-8 asowp-space-y-8">
                <div class="asowp-flex asowp-justify-between">
                    <div class="asowp-w-2/5 asowp-space-y-2 asowp-flex asowp-flex-col asowp-text-[14px]">
                        <label for="" :class="`${isEmptyName ? 'asowp-text-red-500 asowp-font-bold' :'asowp-font-normal'}`">Name template</label>
                        <input type="text" v-model="template.name" :class="`${isEmptyName ? 'asowp-field-required asowp-font-bold' :''} asowp-rounded asowp-w-full asowp-h-[30px]`" @blur="template.name.trim()==''?isEmptyName =true : isEmptyName=false">
                    </div>
                    <div class="asowp-w-2/5 asowp-space-y-2 asowp-flex asowp-flex-col asowp-text-[12px]">
                        <label for="" class="asowp-font-normal">Base Price</label>
                        <input type="number" v-model="template.basePrice" @blur="isNaN(template.basePrice)? template.basePrice =0 : ''" class="asowp-rounded asowp-w-full asowp-h-[32px]">                        
                    </div>
                </div>
                <div class="asowp-flex asowp-justify-between ">
                    <div class="asowp-w-2/5 asowp-flex asowp-flex-col asowp-space-y-2 asowp-text-[12px]">
                        <label for="" class="asowp-font-normal">Upload Template Preview Image</label>
                        <div class="asowp-flex asowp-flex-col asowp-space-y-2 asowp-w-full asowp-pt-2 asowp-w-1/2">
                            <div class="asowp-flex asowp-space-x-2">
                                <button @click="selectTemplatePrevImg" class="asowp-bg-[#016464] asowp-border-none asowp-w-fit asowp-h-fit asowp-p-4 asowp-rounded asowp-px-4 asowp-text-white asowp-opacity-90 hover:asowp-opacity-100 asowp-text-[10px] asowp-cursor-pointer">upload PopupImg</button>
                                <div :class="`asowp-relative asowp-w-[82px] asowp-h-[49px] asowp-rounded-md asowp-overflow-hidden`">
                                    <img v-if="template.prevImg != ''" :src="template.prevImg" alt="" class="asowp-absolute asowp-w-full asowp-h-full">
                                    <button v-if="template.prevImg != ''" @click="()=>{template.prevImg = ''}" :class="`asowp-bg-[#016464] asowp-absolute asowp-bottom-0 asowp-right-0 asowp-text-white asowp-p-1 asowp-rounded-tl-lg asowp-border-none`">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="asowp-w-4 asowp-h-4">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="asowp-w-2/5 asowp-flex asowp-flex-col asowp-space-y-2 asowp-text-[12px]">
                        <label for="" class="asowp-font-normal">Enable add to cart on this design</label>
                        <div class="asowp-flex asowp-justify-start asowp-items-center asowp-space-x-4">
                            <p class="asowp-text-md asowp-font-medium asowp-text-black">No</p>
                            <label for="yesNo" class="asowp-relative asowp-inline-flex asowp-items-center asowp-cursor-pointer asowp-border-[1px] asowp-border-solid asowp-border-black asowp-rounded-full">
                                <input id="yesNo" type="checkbox" class="asowp-sr-only asowp-peer" v-model="template.enableAddToCart">
                                <div :class="`peer-checked:after:asowp-border-[#016464] peer-checked:after:asowp-border-solid peer-checked:after:asowp-border-[5px] peer-checked:after:asowp-top-[-2px] peer-checked:after:asowp-translate-y-[-15%] asowp-w-10 asowp-h-3 asowp-border asowp-border-[5px] asowp-border-[#016464] asowp-bg-zinc-300 asowp-rounded-full asowp-peer peer-checked:after:asowp-translate-x-[125%] after:asowp-content-[''] after:asowp-absolute after:asowp-top-[-3px] after:asowp-left-[-2px] after:asowp-bg-zinc-300 after:asowp-border-white after:asowp-border-solid after:asowp-translate-y-[-15%] after:asowp-border-[#FFFFFF] after:asowp-border-[5px] after:asowp-rounded-full after:asowp-h-3 after:asowp-w-3 after:asowp-transition-all after:asowp-shadow-lg`"></div>
                            </label>
                            <p class="asowp-text-md asowp-font-medium asowp-text-black">Yes</p>
                        </div>
                    </div>
                </div>
                <div class="asowp-flex asowp-justify-between ">
                    <div class="asowp-w-2/5 asowp-flex asowp-flex-col asowp-space-y-2 asowp-text-[12px]">
                        <label for="" class="asowp-font-normal">Upload Template Usage Image</label>
                        <div class="asowp-flex asowp-flex-col asowp-space-y-2 asowp-w-full asowp-pt-2 asowp-w-1/2">
                            <div class="asowp-flex asowp-space-x-2">
                                <button @click="selectTemplateRealImg" class="asowp-bg-[#016464] asowp-border-none asowp-w-fit asowp-h-fit asowp-p-4 asowp-rounded asowp-px-4 asowp-text-white asowp-opacity-90 hover:asowp-opacity-100 asowp-text-[10px] asowp-cursor-pointer">upload PopupImg</button>
                                <div :class="`asowp-relative asowp-w-[82px] asowp-h-[49px] asowp-rounded-md asowp-overflow-hidden`">
                                    <img v-if="template.realImg" :src="template.realImg" alt="" class="asowp-absolute asowp-w-full asowp-h-full">
                                    <button v-if="!template.realImg" @click="()=>{template.realImg = ''}" :class="`asowp-bg-[#016464] asowp-absolute asowp-bottom-0 asowp-right-0 asowp-text-white asowp-p-1 asowp-rounded-tl-lg asowp-border-none`">
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
            <div class="asowp-bg-[#F8F9FB] asowp-flex asowp-font-bold asowp-space-x-4 asowp-px-4 asowp-py-4 asowp-justify-end asowp-items-end">
                <div class="asowp-bg-[#016464] asowp-rounded">
                    <button :disabled="isLoading" @click="back" class="asowp-flex asowp-bg-transparent asowp-w-fit asowp-space-x-2 asowp-h-fit asowp-px-8 asowp-p-2 asowp-border-none asowp-text-white asowp-opacity-90 hover:asowp-border-none hover:asowp-text-white hover:asowp-opacity-100 asowp-cursor-pointer">
                        <svg class="asowp-w-6 asowp-h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 12L5 8V11L17.17 11C17.3756 10.414 17.7586 9.90661 18.2657 9.54821C18.7729 9.18981 19.379 8.9982 20 9C20.7956 9 21.5587 9.31607 22.1213 9.87868C22.6839 10.4413 23 11.2044 23 12C23 12.7956 22.6839 13.5587 22.1213 14.1213C21.5587 14.6839 20.7956 15 20 15C18.69 15 17.58 14.17 17.17 13L5 13V16L1 12Z" fill="currentColor"/>
                        </svg>

                        <div class="asowp-font-semibold asowp-text-[16px]">Back</div>
                    </button>
                </div>
                <div class="asowp-rounded" :class="`${isEdit ? 'asowp-bg-yellow-500' : 'asowp-bg-[#016464]'}`">
                    <button :disabled="isLoading" @click="isEdit ? updateTemplate() : saveTemplate()" class="asowp-flex asowp-items-center asowp-justify-center asowp-bg-transparent asowp-w-fit asowp-space-x-2 asowp-h-fit asowp-text-white asowp-px-8 asowp-p-2.5 asowp-rounded asowp-border-none asowp-opacity-90 hover:asowp-opacity-100 hover:asowp-border-none hover:asowp-text-white asowp-cursor-pointer">
                        <svg v-if="!isLoading" class="asowp-w-4 asowp-h-4" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.5 1.25C2.16848 1.25 1.85054 1.3817 1.61612 1.61612C1.3817 1.85054 1.25 2.16848 1.25 2.5V17.5C1.25 17.8315 1.3817 18.1495 1.61612 18.3839C1.85054 18.6183 2.16848 18.75 2.5 18.75H17.5C17.8315 18.75 18.1495 18.6183 18.3839 18.3839C18.6183 18.1495 18.75 17.8315 18.75 17.5V2.5C18.75 2.16848 18.6183 1.85054 18.3839 1.61612C18.1495 1.3817 17.8315 1.25 17.5 1.25H11.875C11.5435 1.25 11.2255 1.3817 10.9911 1.61612C10.7567 1.85054 10.625 2.16848 10.625 2.5V11.6163L13.9325 8.3075C14.0499 8.19014 14.209 8.12421 14.375 8.12421C14.541 8.12421 14.7001 8.19014 14.8175 8.3075C14.9349 8.42486 15.0008 8.58403 15.0008 8.75C15.0008 8.91597 14.9349 9.07514 14.8175 9.1925L10.4425 13.5675C10.3844 13.6257 10.3155 13.6719 10.2395 13.7034C10.1636 13.7349 10.0822 13.7511 10 13.7511C9.91779 13.7511 9.83639 13.7349 9.76046 13.7034C9.68453 13.6719 9.61556 13.6257 9.5575 13.5675L5.1825 9.1925C5.12439 9.13439 5.07829 9.0654 5.04685 8.98948C5.0154 8.91356 4.99921 8.83218 4.99921 8.75C4.99921 8.66782 5.0154 8.58644 5.04685 8.51052C5.07829 8.4346 5.12439 8.36561 5.1825 8.3075C5.24061 8.24939 5.3096 8.20329 5.38552 8.17185C5.46144 8.1404 5.54282 8.12421 5.625 8.12421C5.70718 8.12421 5.78856 8.1404 5.86448 8.17185C5.9404 8.20329 6.00939 8.24939 6.0675 8.3075L9.375 11.6163V2.5C9.375 1.83696 9.63839 1.20107 10.1072 0.732233C10.5761 0.263392 11.212 0 11.875 0L17.5 0C18.163 0 18.7989 0.263392 19.2678 0.732233C19.7366 1.20107 20 1.83696 20 2.5V17.5C20 18.163 19.7366 18.7989 19.2678 19.2678C18.7989 19.7366 18.163 20 17.5 20H2.5C1.83696 20 1.20107 19.7366 0.732233 19.2678C0.263392 18.7989 0 18.163 0 17.5V2.5C0 1.83696 0.263392 1.20107 0.732233 0.732233C1.20107 0.263392 1.83696 0 2.5 0L5.625 0C5.79076 0 5.94973 0.065848 6.06694 0.183058C6.18415 0.300269 6.25 0.45924 6.25 0.625C6.25 0.79076 6.18415 0.949732 6.06694 1.06694C5.94973 1.18415 5.79076 1.25 5.625 1.25H2.5Z" fill="white"/>
                        </svg>
                        <img src="../../../../assets/icons/ic_loading_gray.svg" class="asowp-w-5 asowp-w-5" v-if="isLoading"/>
                        <span class="asowp-font-semibold asowp-text-[16px]">{{isEdit ? 'Update' : 'Save'}}</span>
                    </button>
                </div>
            </div>
        </div>
        <!-- open Category Modal-->
        <div v-if="openCategoryModal" @click.self="isLoading?'' :closeCategoryModal()" class="asowp-z-[999] asowp-bg-gray-400 asowp-overflow-y-auto asowp-overflow-x-hidden asowp-fixed asowp-top-0 asowp-right-[25%] asowp-left-[75%] asowp-flex asowp-justify-center asowp-items-center asowp-w-full md:asowp-inset-0 asowp-h-full">
            <div class="asowp-relative asowp-p-4 asowp-w-full asowp-max-w-md asowp-max-h-full">
                <div class="asowp-relative asowp-bg-white asowp-rounded-lg asowp-shadow ">
                    <button :disabled="isLoading" @click.stop="closeCategoryModal" type="button" class="asowp-absolute asowp-top-3 asowp-end-2.5 asowp-text-gray-400 asowp-bg-transparent hover:bg-gray-200 hover:text-gray-900 asowp-rounded-lg asowp-text-sm asowp-w-8 asowp-h-8 asowp-ms-auto asowp-inline-flex asowp-justify-center asowp-items-center" data-modal-hide="popup-modal">
                        <svg class="asowp-w-3 asowp-h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                        <span class="asowp-sr-only">Close modal</span>
                    </button>
                    <div class="asowp-p-4 md:p-5 asowp-text-center">
                        <svg class="asowp-mx-auto asowp-mb-4 asowp-text-gray-400 asowp-w-12 asowp-h-12 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                        </svg>
                        <h3 class="asowp-mb-5 asowp-text-lg asowp-font-normal asowp-text-gray-500 ">Name category</h3>
                        <input type="text" v-model="category" class="asowp-rounded asowp-w-full asowp-h-[35px] asowp-text-center asowp-p-4 asowp-my-2 asowp-border-none" />
                        <button :disabled="isLoading" @click="saveCategory" data-modal-hide="popup-modal" type="button" class="asowp-border-solid asowp-text-white asowp-bg-[#016464] asowp-cursor-pointer hover:bg-[#016464] focus:ring-4 focus:outline-none asowp-my-2 asowp-border-none  focus:ring-[#016464] asowp-font-medium asowp-rounded-lg asowp-text-sm asowp-inline-flex asowp-items-center asowp-px-5 asowp-py-2.5 asowp-text-center">
                            <img src="../../../../assets/icons/ic_loading_gray.svg" class="asowp-w-5 asowp-w-5" v-if="isLoading"/>
                            Add new category
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <!-- Open delete modal -->
        <div v-if="openModal" @click.self="isLoading?'' :closeModal()" class="asowp-z-[999] asowp-bg-gray-400 asowp-overflow-y-auto asowp-overflow-x-hidden asowp-fixed asowp-top-0 asowp-right-[25%] asowp-left-[75%] asowp-flex asowp-justify-center asowp-items-center asowp-w-full md:asowp-inset-0 asowp-h-full">
            <div class="asowp-relative asowp-p-4 asowp-w-full asowp-max-w-md asowp-max-h-full">
                <div class="asowp-relative asowp-bg-white asowp-rounded-lg asowp-shadow ">
                    <button :disabled="isLoading" @click.stop="closeModal" type="button" class="asowp-absolute asowp-top-3 asowp-end-2.5 asowp-text-gray-400 asowp-bg-transparent hover:bg-gray-200 hover:text-gray-900 asowp-rounded-lg asowp-text-sm asowp-w-8 asowp-h-8 asowp-ms-auto asowp-inline-flex asowp-justify-center asowp-items-center" data-modal-hide="popup-modal">
                        <svg class="asowp-w-3 asowp-h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                        <span class="asowp-sr-only">Close modal</span>
                    </button>
                    <div class="asowp-p-4 md:p-5 asowp-text-center">
                        <svg class="asowp-mx-auto asowp-mb-4 asowp-text-gray-400 asowp-w-12 asowp-h-12 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                        </svg>
                        <h3 class="asowp-mb-5 asowp-text-lg asowp-font-normal asowp-text-gray-500 ">Are you sure you want to delete this template ??</h3>
                        <input type="text" readonly v-model="template.name" class="asowp-rounded asowp-w-full asowp-h-[35px] asowp-text-center asowp-p-4 asowp-my-2 asowp-border-none" />
                        <button :disabled="isLoading" @click="deleteTemplate" data-modal-hide="popup-modal" type="button" class="asowp-border-solid asowp-text-white asowp-bg-red-600 asowp-cursor-pointer hover:bg-red-800 focus:ring-4 focus:outline-none asowp-my-2 asowp-border-none  focus:ring-red-300 asowp-font-medium asowp-rounded-lg asowp-text-sm asowp-inline-flex asowp-items-center asowp-px-5 asowp-py-2.5 asowp-text-center">
                            <img src="../../../../assets/icons/ic_loading_gray.svg" class="asowp-w-5 asowp-w-5" v-if="isLoading"/>
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
<script setup>
import api from "@/admin/Api/api";
import { onMounted, ref } from "vue";
import toastMessage  from '@/admin/utils/functions'
import Multiselect from "@vueform/multiselect";
import router from "@/admin/router";
const isNewTemplate = ref(false);
const openCategoryModal = ref(false);
const openModal = ref(false);
const category = ref('');
const template = ref({
    name:'',
    categoryId:'',
    configId:0,
    basePrice:0,
    prevImg:'',
    realImg:'',
    enableAddToCart:false,
    data:{
        templateData:{},
        cartData:{}
    }
});
const isEmptyName = ref(false);
const isEmptyConfig = ref(false);
const currencySumbol = asowp_data.currencySymbol;
const templates = ref([]);
const template_id = ref(null);
const categories = ref({});
const configurations = ref([]);
const isFetching = ref(true);
const isDelete = ref(false);
const isEdit = ref(false);
const isLoading = ref(false);

const fetchTemplates = async ()=>{
    const result = await api.getAllTemplates();
    let tab = [];
    console.log(result.templates)
    for (let index = 0; index < result.templates.length; index++) {
        const element = result.templates[index];
        console.log(element);
        for (let i = 0; i < element.length; i++) {
            const el = {
                index:i,
                data: element[i]
            };
            tab.push(el);
        }        
    }
    templates.value = tab;
    configurations.value = result.configurations;
    if(result.categories.length!=0){
        categories.value = result.categories
    }
}

const goToTemplate = (template,key)=>{
    router.push('/configs/template/'+template.configId+'/'+key)
    .then(() => {
      window.location.reload();
    })
}

onMounted(async() => {
    isFetching.value = true;
    await fetchTemplates();
    isFetching.value = false;
});

const selectTemplatePrevImg = async(e) => { 
    e.preventDefault();
    var uploader = wp.media(
        {
            title: "Select Template Preview Image",
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
                            template.value.prevImg = (attachment.url);
                        }
                    }
                );
            }
        )
        .open();
}

const selectTemplateRealImg = async(e) => { 
    e.preventDefault();
    var uploader = wp.media(
        {
            title: "Select Template Usage Image",
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
                            template.value.realImg = (attachment.url);
                        }
                    }
                );
            }
        )
        .open();
}

const saveCategory = async ()=> {
    isLoading.value = true;
    const save = await api.createCategory(category.value);
    if(save.success){
        categories.value = save.categories;
        template.value.categoryId = save.key;
        category.value = ''
        isLoading.value = false;
        closeCategoryModal();
        toastMessage(save.message);
    }else{
        isLoading.value = false;
        toastMessage(save.message,'error');
        closeCategoryModal();
        category.value = ''
    }
    
    
}

const saveTemplate = async ()=>{
    if(template.value.name.trim() !== '' && template.value.configId != 0){
        isLoading.value=true;
        const result = await api.createTemplate(template.value);
        if(result.success){
            await fetchTemplates();
            isLoading.value=false;
            isNewTemplate.value=false;
            toastMessage(result.message);
            template.value = {
                name:'',
                categoryId:'',
                configId:0,
                basePrice:0,
                prevImg:'',
                realImg:'',
                enableAddToCart:false,
                data:{
                    templateData:{},
                    cartData:{}
                }
            }
        }else{
            isLoading.value=false;
            isNewTemplate.value=false;
            toastMessage(result.message);
            template.value = {
                name:'',
                categoryId:'',
                configId:0,
                basePrice:0,
                prevImg:'',
                realImg:'',
                enableAddToCart:false,
                data:{
                    templateData:{},
                    cartData:{}
                }
            }
        }
    }else if(template.value.configId == 0){
        isEmptyConfig.value = true;
    }else if(template.value.name.trim() == ''){
        isEmptyName.value = true;
    }
}

const selectTemplate = async (key,temp,del=false)=>{
    if(del){
        isDelete.value = true;
        openModal.value = true
    }else{
        isEdit.value = true;
        isNewTemplate.value=true;
    }
    template_id.value = key;
    template.value = temp;
}

const updateTemplate = async ()=>{
    if(template.value.name.trim() !== '' && template.value.configId != 0){
        isLoading.value=true;
        const result = await api.updateTemplate(template_id.value,template.value);
        if(result.success){
            await fetchTemplates();
            isLoading.value=false;
            isNewTemplate.value=false;
            isEdit.value = false;
            template_id.value = null;
            if(result.success == true){
                toastMessage(result.message);
            }else{
                toastMessage(result.message,"warning");
            }
            template.value = {
                name:'',
                categoryId:'',
                configId:0,
                basePrice:0,
                prevImg:'',
                realImg:'',
                enableAddToCart:false,
                data:{
                    templateData:{},
                    cartData:{}
                }
            }
        }else{
            isLoading.value=false;
            isNewTemplate.value=false;
            isEdit.value = false;
            template_id.value = null;
            toastMessage(result.message,"error");
            template.value = {
                name:'',
                categoryId:'',
                configId:0,
                basePrice:0,
                prevImg:'',
                realImg:'',
                enableAddToCart:false,
                data:{
                    templateData:{},
                    cartData:{}
                }
            }
        }
    }else if(template.value.configId == 0){
        isEmptyConfig.value = true;
    }else if(template.value.name.trim() == ''){
        isEmptyName.value = true;
    }
}

const deleteTemplate = async ()=>{
    isLoading.value=true;
    const result = await api.deleteTemplate(template.value.configId,template_id.value);
    console.log(result);
    if(result.success){
        await fetchTemplates();
        isLoading.value=false;
        isDelete.value = false;
        template_id.value = null;
        openModal.value = false;
        if(result.success == true){
            toastMessage(result.message);
        }else{
            toastMessage(result.message,"warning");
        }
        template.value = {
            name:'',
            categoryId:'',
            configId:0,
            basePrice:0,
            prevImg:'',
            realImg:'',
            enableAddToCart:false,
            data:{
                templateData:{},
                cartData:{}
            }
        }
    }else{
        isLoading.value=false;
        isDelete.value = false;
        template_id.value = null;
        openModal.value = false;
        toastMessage(result.message,"error");
        template.value = {
            name:'',
            categoryId:'',
            configId:0,
            basePrice:0,
            realImg:'',
            prevImg:'',
            enableAddToCart:false,
            data:{
                templateData:{},
                cartData:{}
            }
        }
    }
}

const back = () =>{
    isNewTemplate.value = false;
    isLoading.value=false;
    isDelete.value = false;
    template_id.value = null;
    isEdit.value = false;
    template.value = {
        name:'',
        categoryId:'',
        configId:0,
        basePrice:0,
        prevImg:'',
        realImg:'',
        enableAddToCart:false,
        data:{
            templateData:{},
            cartData:{}
        }
    }
    category.value=''
    isEmptyName.value = false;
    isEmptyConfig.value = false;
}
const closeCategoryModal = ()=>{       
    openCategoryModal.value = false;
    category.value = ''
}
const closeModal = ()=>{       
    openModal.value = false;
    template.value = {
        name:'',
        categoryId:'',
        configId:0,
        basePrice:0,
        prevImg:'',
        realImg:'',
        enableAddToCart:false,
        data:{
            templateData:{},
            cartData:{}
        }
    }
    isDelete.value = false;
}
</script>