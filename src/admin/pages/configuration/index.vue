<template>
    <div class="aso-h-[100vh] w-full">
        <div v-if="step==0">
            <div  class="aso-pb-4 aso-bg-[#F8F9FB] aso-px-4 aso-border-b-3 aso-border-t-0 aso-border-l-0 aso-border-r-0 aso-border-solid aso-border-[#f0f0f1] ">
               <div class="aso-bg-[#F8F9FB] aso-font-bold aso-py-4">
                    List of configurations
               </div>
               <div class="aso-flex aso-justify-end aso-items-center aso-space-x-2 aso-w-4/4" v-if="canAddNew">
                    <form class="aso-flex aso-items-center aso-h-[35px]" @submit="handleSearchChange">
                        <label for="simple-search" class="aso-sr-only">Search</label>
                        <div class="aso-relative aso-w-full">
                            <input type="search" v-model="search" @input="searchInputEmpty" id="aso-search" class="aso-h-[40px] aso-w-[300px] aso-bg-gray-50 aso-border aso-border-gray-300 aso-text-gray-900 aso-text-sm aso-rounded-lg focus:ring-blue-500 focus:border-blue-500 aso-block aso-w-full aso-ps-10 aso-p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 aso-m-0" placeholder="Search configuration name..." />
                            <button type="submit" class="aso-absolute aso-inset-y-0 aso-end-1 aso-bg-transparent aso-flex aso-items-center ps-0 aso-cursor-pointer aso-border-none">
                                <svg class="aso-w-4 aso-h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                </svg>
                                <span class="aso-sr-only">Search</span>
                            </button>
                        </div>
                    </form>
                    <div class="aso-w-1/4">
                        <button class="aso-flex aso-w-fit aso-rounded aso-bg-[#016464] aso-px-4 aso-space-x-2 aso-p-1.5 aso-border-none aso-text-white aso-opacity-90 hover:aso-opacity-100 aso-cursor-pointer aso-h-[40px] aso-flex aso-items-center aso-justify-center" @click="addConfig">
                            <svg class="aso-w-5 aso-h-5" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g id="plus-lg">
                                <path id="Vector" fill-rule="evenodd" clip-rule="evenodd" d="M11 2.75C11.1823 2.75 11.3572 2.82243 11.4861 2.95136C11.6151 3.0803 11.6875 3.25516 11.6875 3.4375V10.3125H18.5625C18.7448 10.3125 18.9197 10.3849 19.0486 10.5139C19.1776 10.6428 19.25 10.8177 19.25 11C19.25 11.1823 19.1776 11.3572 19.0486 11.4861C18.9197 11.6151 18.7448 11.6875 18.5625 11.6875H11.6875V18.5625C11.6875 18.7448 11.6151 18.9197 11.4861 19.0486C11.3572 19.1776 11.1823 19.25 11 19.25C10.8177 19.25 10.6428 19.1776 10.5139 19.0486C10.3849 18.9197 10.3125 18.7448 10.3125 18.5625V11.6875H3.4375C3.25516 11.6875 3.0803 11.6151 2.95136 11.4861C2.82243 11.3572 2.75 11.1823 2.75 11C2.75 10.8177 2.82243 10.6428 2.95136 10.5139C3.0803 10.3849 3.25516 10.3125 3.4375 10.3125H10.3125V3.4375C10.3125 3.25516 10.3849 3.0803 10.5139 2.95136C10.6428 2.82243 10.8177 2.75 11 2.75Z" fill="white"/>
                                </g>
                            </svg>
                            <div class="aso-text-[14px]">
                                Add new configuration
                            </div>
                        </button>
                    </div>
               </div>
            </div>
            <!-- Table which display all configurations -->
            <div class="aso-w-full aso-overflow-x-auto">
                <div class="aso-overflow-hidden aso-w-full">
                    <div class="aso-grid aso-grid-cols-5 aso-justify-center aso-items-center aso-p-4 aso-text-sm aso-font-medium aso-text-gray-900 aso-bg-[#f0f0f1] aso-border-t aso-border-b aso-border-gray-200 aso-gap-x-16 dark:aso-bg-gray-800 dark:aso-border-gray-700 dark:aso-text-white">
                        <div class="aso-flex aso-items-center aso-justify-center">Name Configuration</div>
                        <div class="aso-flex aso-items-center aso-justify-center">Description</div>
                        <div class="aso-flex aso-items-center aso-justify-center">Icon</div>
                        <div class="aso-flex aso-items-center aso-justify-center">PopupImg</div>
                        <div class="aso-flex aso-items-center aso-justify-center">Actions</div>
                    </div>
                    <div v-if="isFetching" class="aso-bg-white aso-border-solid aso-border aso-border-[#D1D1D1] aso-flex aso-flex-col aso-space-y-2 aso-justify-center aso-items-center aso-w-full aso-h-[306px] p-4">
                        <img class="aso-w-[200px] aso-h-[200px]" src="../../../../assets/icons/ic_loading.svg" alt="">
                    </div>
                    <div v-if="configs.length == 0 && !isFetching" class="aso-bg-white aso-border-solid aso-border aso-border-[#D1D1D1] aso-flex aso-flex-col aso-space-y-12 aso-justify-center aso-items-center aso-py-10 aso-h-[306px]">
                        <div class="aso-flex aso-flex-col aso-space-y-2 aso-justify-center aso-items-center">
                            <p class="aso-text-2xl aso-font-bold">NO CONFIGURATION FOUND</p>
                        </div>
                    </div>
                    <div v-if="!isFetching" v-for="(config,key) in configs" :key="key" class="aso-cursor-pointer aso-grid aso-items-center aso-bg-white aso-grid-cols-5 aso-px-4 aso-py-3 aso-text-sm aso-text-gray-700 aso-border-b aso-border-solid aso-border-gray-200 aso-gap-x-16 dark:aso-border-gray-700">
                        <div class="aso-text-gray-500 dark:aso-text-gray-400 aso-flex aso-items-center aso-overflow-hidden aso-whitespace-nowrap aso-text-ellipsis aso-space-x-4" @click="()=>$router.push('/configs/'+config.id+'/materials')">
                            <span class="aso-w-5 aso-h-5 aso-p-1 aso-px-1 aso-flex aso-justify-center aso-rounded-full aso-bg-[#f0f0f1] aso-border aso-border-solid aso-border-black ">
                                <span class="aso-text-[12px]">{{getInitials(config.name)}}</span> 
                            </span>
                            <span>{{ config.name }}</span>
                        </div>
                        <div class="aso-text-gray-500 dark:aso-text-gray-400 aso-overflow-hidden aso-whitespace-nowrap aso-text-ellipsis" @click="()=>$router.push('/configs/'+config.id+'/materials')">{{config.description}}</div>
                        <div class="aso-text-gray-500 dark:aso-text-gray-400 aso-flex aso-justify-center aso-items-center" @click="()=>$router.push('/configs/'+config.id+'/materials')">
                            <img class="aso-w-10 aso-h-10 aso-rounded" :src="config.icon" alt="" v-if="config.icon!=''">
                        </div> 
                        <div class="aso-text-gray-500 dark:aso-text-gray-400 aso-flex aso-justify-center aso-items-center" @click="()=>$router.push('/configs/'+config.id+'/materials')">
                            <img class="aso-w-10 aso-h-10 aso-rounded" :src="config.popImg" alt="" v-if="config.popImg!=''">
                        </div>
                        <div class="aso-flex aso-space-x-2 aso-justify-center aso-items-center aso-text-gray-500 dark:aso-text-gray-400">
                            <button class="aso-bg-transparent aso-p-2 aso-rounded-md aso-border-none aso-cursor-pointer aso-space-x-1 aso-flex">
                                <img class="aso-w-5 aso-h-5" src="../../../../assets/icons/ic_preview.svg" alt="">
                            </button>
                            <button class="aso-bg-transparent aso-border-none aso-text-[#2DD05B] aso-cursor-pointer"  @click="selectEditConfig(config)">
                                <img class="aso-w-5 aso-h-5" src="../../../../assets/icons/ic_edit.svg" alt="">
                            </button>
                            <button class="aso-bg-transparent aso-border-none aso-text-[#A00000] aso-cursor-pointer"  @click="selectDeleteConfig(config.id,config.name)">
                                <img class="aso-w-5 aso-h-5" src="../../../../assets/icons/ic_delete.svg" alt="">
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="aso-flex aso-items-center aso-justify-center aso-py-7 aso-w-full" v-if="pages>1">
                <div class="aso-grid aso-grid-cols-5 aso-gap-4">
                    <button @click="handlePrevPage" :diseabled="page == 1" :class="`aso-text-[#016464] aso-h-10 aso-w-10 aso-p-2 aso-text-base  aso-bg-white aso-font-medium aso-rounded-lg aso-flex aso-items-center aso-justify-center aso-border ${page == 1 ? `aso-cursor-not-allowed aso-bg-gray-50 aso-text-[#e5e5e5]` :``}`">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-4 h-4">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                        </svg>
                    </button>

                    <div v-for="pg in pages" :key="pg">
                        <button @click="()=>changePage(pg)" v-if="pg != page" :class="`aso-text-[#016464] aso-bg-white aso-h-10 aso-w-10 aso-p-2 aso-text-base aso-font-medium aso-rounded-lg aso-flex aso-items-center aso-justify-center aso-border`">{{ pg }}</button>    
                        <button @click="()=>changePage(pg)" :diseabled="pg == page" v-if="pg == page" :class="`aso-bg-[#016464] aso-h-10 w-10 aso-p-2 aso-text-base aso-text-white aso-font-medium aso-rounded-lg aso-flex aso-items-center aso-justify-center aso-border aso-cursor-not-allowed`">{{ page }}</button>
                    </div>
                    <button @click="handleNextPage" :diseabled="page < pages" :class="`aso-text-[#016464] aso-h-10 aso-w-10 aso-p-2 aso-text-base  aso-bg-white aso-font-medium aso-rounded-lg flex aso-items-center aso-justify-center aso-border ${page == pages ? `aso-cursor-not-allowed aso-bg-gray-50 aso-text-[#e5e5e5]` :``}`">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-4 h-4">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
        <!-- create a new configuration -->
        <div class="aso-space-y-1" v-if="step == 1">
            <div class="aso-bg-[#F8F9FB] aso-font-bold aso-px-4 aso-py-4 aso-text-[16px]">
                {{ isEdit ? 'Edit Configuration inforamtions' : 'Create new configuration'}}
            </div>
            <div class="aso-bg-[#F8F9FB] aso-font-bold aso-px-4 aso-py-4 aso-space-y-6 aso-pb-12">
                <div class="aso-flex aso-justify-between">
                    <div class="aso-w-2/5 aso-flex aso-flex-col aso-space-y-2 aso-text-[14px]">
                        <label for="" class="aso-font-normal">Name configuration</label>
                        <input type="text" v-model="newConfig.name" class="aso-rounded aso-w-full aso-h-[35px]">
                    </div>
                    <div class="aso-w-2/5 aso-flex aso-flex-col aso-space-y-2 aso-text-[12px]">
                        <label for="" class="aso-font-normal">Description</label>
                        <input type="text" v-model="newConfig.description" class="aso-rounded aso-w-full aso-h-[35px]">
                    </div>
                </div>
                <div class="aso-flex aso-justify-between">
                    <div class="aso-w-2/5 aso-flex aso-flex-col aso-space-y-2 aso-text-[12px]">
                        <label for="" class="aso-font-normal">Upload icon</label>
                        <div class="aso-flex aso-flex-col aso-space-y-2 aso-w-full aso-pt-2 aso-w-1/2">
                            <div class="aso-flex aso-space-x-2">
                                <button @click="selectConfigIcon" class="aso-bg-[#016464] aso-border-none aso-w-fit aso-h-fit aso-p-4 aso-rounded aso-px-4 aso-text-white aso-opacity-90 hover:aso-opacity-100 aso-text-[10px] aso-cursor-pointer">upload PopupImg</button>
                                <div :class="`aso-relative aso-w-[82px] aso-h-[49px] aso-rounded-md aso-overflow-hidden`">
                                    <img v-if="newConfig.icon != ''" :src="newConfig.icon" alt="" class="aso-absolute aso-w-full aso-h-full">
                                    <button v-if="newConfig.icon != ''" @click="()=>{newConfig.icon = ''}" :class="`aso-bg-[#016464] aso-absolute aso-bottom-0 aso-right-0 aso-text-white aso-p-1 aso-rounded-tl-lg aso-border-none`">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="aso-w-4 aso-h-4">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="aso-w-2/5 aso-flex aso-flex-col aso-space-y-2 aso-text-[12px]">
                        <label for="" class="aso-font-normal">Upload PopupImg</label>
                        <div class="aso-flex aso-flex-col aso-space-y-2 aso-w-full aso-pt-2 aso-w-1/2">
                            <div class="aso-flex aso-space-x-2">
                                <button @click="selectConfigPopImg" class="aso-bg-[#016464] aso-border-none aso-w-fit aso-h-fit aso-p-4 aso-rounded aso-px-4 aso-text-white aso-opacity-90 hover:aso-opacity-100 aso-text-[10px] aso-cursor-pointer">upload PopupImg</button>
                                <div :class="`aso-relative aso-w-[82px] aso-h-[49px] aso-rounded-md aso-overflow-hidden`">
                                    <img v-if="newConfig.popImg != ''" :src="newConfig.popImg" alt="" class="aso-absolute aso-w-full aso-h-full">
                                    <button v-if="newConfig.popImg != ''" @click="()=>{newConfig.popImg = ''}" :class="`aso-bg-[#016464] aso-absolute aso-bottom-0 aso-right-0 aso-text-white aso-p-1 aso-rounded-tl-lg aso-border-none`">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="aso-w-4 aso-h-4">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="aso-bg-[#F8F9FB] aso-flex aso-font-bold aso-space-x-4 aso-px-4 aso-py-4 aso-justify-end aso-items-end">
                <div class="aso-bg-[#016464] aso-rounded">
                    <button :class="`aso-flex aso-bg-transparent aso-w-fit aso-space-x-2 aso-h-fit aso-px-8 aso-text-white aso-p-2 aso-border-none aso-opacity-90 hover:aso-border-none hover:aso-text-white hover:aso-opacity-100 ${isLoading? 'aso-cursor-not-allowed' : 'aso-cursor-pointer'}`" @click="back">
                        <svg class="aso-w-6 aso-h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 12L5 8V11L17.17 11C17.3756 10.414 17.7586 9.90661 18.2657 9.54821C18.7729 9.18981 19.379 8.9982 20 9C20.7956 9 21.5587 9.31607 22.1213 9.87868C22.6839 10.4413 23 11.2044 23 12C23 12.7956 22.6839 13.5587 22.1213 14.1213C21.5587 14.6839 20.7956 15 20 15C18.69 15 17.58 14.17 17.17 13L5 13V16L1 12Z" fill="currentColor"/>
                        </svg>

                        <div class="aso-font-semibold aso-text-[16px]">Back</div>
                    </button>
                </div>
                <div class="aso-bg-[#016464] aso-rounded" v-if="isEdit">
                    <button :disabled="isLoading" @click="updateConfig" :class="`aso-rounded aso-flex ${!isLoading ? 'aso-bg-amber-400 ' :'aso-bg-amber-500'} aso-w-fit aso-space-x-2 aso-h-fit aso-px-8 aso-text-white aso-p-2 aso-border-none aso-opacity-90 hover:aso-border-none hover:aso-text-white hover:aso-opacity-100 aso-cursor-pointer`">
                        <img src="../../../../assets/icons/ic_loading_gray.svg" class="aso-w-5 aso-w-5" v-if="isLoading" />
                        <div class="aso-font-semibold aso-text-[16px]">Update</div>
                    </button>
                </div>
                <div class="aso-bg-[#016464] aso-rounded" v-if="!isEdit">
                    <button class="aso-flex aso-bg-transparent aso-w-fit aso-space-x-2 aso-h-fit aso-px-8 aso-text-white aso-p-2 aso-border-none aso-opacity-90 hover:aso-border-none hover:aso-text-white hover:aso-opacity-100 aso-cursor-pointer" @click="next">
                        <img src="../../../../assets/icons/ic_loading_gray.svg" class="aso-w-5 aso-w-5" v-if="isLoading" />
                        <svg v-if="!isLoading" class="aso-w-6 aso-h-6" viewBox="0 0 22 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M22 4L18 8V5H5.83C5.62439 5.58597 5.24142 6.09339 4.73429 6.45179C4.22715 6.81019 3.621 7.0018 3 7C2.20435 7 1.44129 6.68393 0.87868 6.12132C0.31607 5.55871 0 4.79565 0 4C0 3.20435 0.31607 2.44129 0.87868 1.87868C1.44129 1.31607 2.20435 1 3 1C4.31 1 5.42 1.83 5.83 3H18V0L22 4Z" fill="currentColor"/>
                        </svg>
                        <div class="aso-font-semibold aso-text-[16px]">Next</div>
                    </button>
                </div>
            </div>
        </div>
        <!-- Include Meta data -->
        <div v-if="step == 2">
            <div class="aso-bg-[#F8F9FB] aso-p-20 aso-space-y-20">
                <div class="">
                    <div class="aso-font-bold aso-text-[24px] aso-flex aso-justify-center aso-items-center">
                        Include demo data?
                    </div>
                    <div class="aso-text-[16px] aso-p-4 aso-flex aso-justify-center aso-items-center">
                        To help you get started we can automatically add fonts, colors, prices and sizes to your 
                        new configuration
                    </div>
                </div>
                <div class="aso-flex aso-justify-center aso-items-center aso-space-x-4">
                    <div class="aso-bg-[#016464] aso-rounded">
                        <button class="aso-font-semibold aso-text-[16px] aso-flex aso-bg-transparent aso-w-fit aso-space-x-2 aso-h-fit aso-px-8 aso-p-3 aso-text-white aso-border-none aso-opacity-90 hover:aso-opacity-100 hover:aso-border-none hover:aso-text-white aso-cursor-pointer" @click="()=>includeMetaData(true)">
                            Include demo data
                        </button>
                    </div>
                    <div class="aso-bg-[#016464] aso-rounded">
                        <button class="aso-font-semibold aso-text-[16px] aso-flex aso-bg-transparent aso-w-fit aso-space-x-2 aso-h-fit aso-px-8 aso-p-3 aso-text-white aso-border-none aso-opacity-90 hover:aso-opacity-100 hover:aso-border-none hover:aso-text-white aso-cursor-pointer" @click="()=>includeMetaData(false)">
                            No Include demo data
                        </button>
                    </div>
                </div>
            </div>
            <div class="aso-bg-[#F8F9FB] aso-flex aso-font-bold aso-space-x-4 aso-px-4 aso-py-4 aso-justify-end aso-items-end">
                <div class="aso-bg-[#016464] aso-rounded">
                    <button class="aso-flex aso-bg-transparent aso-w-fit aso-space-x-2 aso-h-fit aso-px-8 aso-text-white aso-p-2 aso-border-none aso-opacity-90 hover:aso-border-none hover:aso-text-white hover:aso-opacity-100 aso-cursor-pointer" @click="back">
                        <svg class="aso-w-6 aso-h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 12L5 8V11L17.17 11C17.3756 10.414 17.7586 9.90661 18.2657 9.54821C18.7729 9.18981 19.379 8.9982 20 9C20.7956 9 21.5587 9.31607 22.1213 9.87868C22.6839 10.4413 23 11.2044 23 12C23 12.7956 22.6839 13.5587 22.1213 14.1213C21.5587 14.6839 20.7956 15 20 15C18.69 15 17.58 14.17 17.17 13L5 13V16L1 12Z" fill="currentColor"/>
                        </svg>

                        <div class="aso-font-semibold aso-text-[16px]">Back</div>
                    </button>
                </div>
            </div>

        </div>

        <!-- Delete Modal-->
        <div v-if="openModal" @click.self="closeModal" class="aso-bg-gray-400 aso-overflow-y-auto aso-overflow-x-hidden aso-fixed aso-top-0 aso-right-[25%] aso-left-[75%] aso-z-50 aso-flex aso-justify-center aso-items-center aso-w-full md:aso-inset-0 aso-h-[calc(100%-1rem)] aso-h-[100vh]">
            <div class="aso-relative aso-p-4 aso-w-full aso-max-w-md aso-max-h-full">
                <div class="aso-relative aso-bg-white aso-rounded-lg aso-shadow dark:bg-gray-700">
                    <button @click.stop="closeModal" type="button" :class="`${isLoading ? 'aso-cursor-not-allowed' : 'aso-cursor-pointer'} aso-absolute aso-top-3 aso-end-2.5 aso-text-gray-400 aso-bg-transparent hover:bg-gray-200 hover:text-gray-900 aso-rounded-lg aso-text-sm aso-w-8 aso-h-8 aso-ms-auto aso-inline-flex aso-justify-center aso-items-center dark:hover:bg-gray-600 dark:hover:text-white`" data-modal-hide="popup-modal">
                        <svg class="aso-w-3 aso-h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                        <span class="aso-sr-only">Close modal</span>
                    </button>
                    <div class="aso-p-4 md:p-5 aso-text-center">
                        <svg class="aso-mx-auto aso-mb-4 aso-text-gray-400 aso-w-12 aso-h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                        </svg>
                        <h3 class="aso-mb-5 aso-text-lg aso-font-normal aso-text-gray-500 dark:text-gray-400">Are you sure you want to delete this configuration?</h3>
                        <input v-model="deleteConfig.name" readonly class="aso-rounded aso-w-full aso-h-[35px] aso-text-center aso-p-4 aso-my-2 aso-border-none" />
                        <button @click="delConfig" data-modal-hide="popup-modal" type="button" :class="`aso-border-solid aso-text-white ${!isLoading ? 'aso-bg-red-600 aso-cursor-pointer' :'aso-bg-red-700 aso-cursor-not-allowed'} hover:bg-red-800 focus:ring-4 focus:outline-none aso-my-2 aso-border-none  focus:ring-red-300 dark:focus:ring-red-800 aso-font-medium aso-rounded-lg aso-text-sm aso-inline-flex aso-items-center aso-px-5 aso-py-2.5 aso-text-center`">
                            <img src="../../../../assets/icons/ic_loading_gray.svg" class="aso-w-5 aso-w-5" v-if="isLoading" :disabled="isLoading"/>
                            Yes, I'm sure
                        </button>
                        <button @click.stop="closeModal" data-modal-hide="popup-modal" type="button" :class="`aso-border-solid aso-py-2.5 aso-px-5 aso-ms-3 aso-text-sm aso-font-medium aso-text-gray-900 aso-my-2  aso-border-gray-500 aso-border-white focus:outline-none aso-bg-white aso-rounded-lg aso-border aso-border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 ${isLoading ? 'aso-cursor-not-allowed' : 'aso-cursor-pointer'}`">No, cancel</button>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import api from "@/admin/Api/api";
import toastMessage from '@/admin/utils/functions'

const isNewConfig = ref(false);

const newConfig = ref({
    name:"",
    description:"",
    icon:"",
    popImg:"",
});

const deleteConfig = ref({
    id:null,
    name:""
})
const defaultSettings = ref({
  settings: {
    generals: {
        mobile: {
            showNavigatorMenu:"off",
            showNavigationMenuFirst:"yes",
            mobileSelectionOptionsDisplay:"horizontally-stack"
        },
        output: {
            filesFormat:'png',
            waterMark:'',
            zipOutputFiles:{
                active:true,
                zipOutFolderPrefix:'aso_',
            },
            designComposition:true
        },
        product: {
            designFromScratch:true,
            redirectAfterAddingToCart:true,
            hideAddToCartButtonOnDetailPage:true,
            hideDesignButtonsOnShopPage:true,
            hideAddToCartButtonOnShopPage:true
        }
    },
    customizerSign: {
        customizerOptions: {
            measurementUnit:"cm",
            showHideMeasurements:"both",
            decimalFormatMeasurements:"with-decimal",
            desktopColumnOrder:"right",
            showDayNightButton:"display"
        },
        signPart: {
            doublePart:{
                active:false,
                part1:"Face A",
                part2:"Face B",
                enableCopyDesignFromSide:true
            }
        },
        text: {
            selectedFonts: [],
            colors:[],
            enableCustomColor:true,
            enableFontSize:{
                active:true,
                minimumFontSize:12,
                maximumFontSize:30,
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
        },
        images: {
            enableUploadImage:true,
            fileUploadScript:{
            customWithGraphical:false,
            uploadMinWidth:100,
            uploadMaxWidth:100,
            uploadMinHeight:1024,
            uploadMaxHeight:1024,
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
            }
        }
    },
    languageImages: {
        uploadDesign: {
            activate: false,
            link: "",
            phraseSubmitCustom: "Take a customization"
        },
        images: {
            resetAllIcon:'',
            cancelAnAction:'',
            icon:'',
            changeIconPreview:'',
            changeIconImport:'',
            changeIconShare:'',
            changeIconSaveProject:'',
            changeIconShareSideBar:'',
            changeIconMaterial:'',
            changeIconShape:'',
            changeIconFixingMethod:'',
            changeIconProduct:'',
            changeIconSize:'',
            changeIconText:'',
            changeIconColor:'',
            changeIconSizeMenu:'',
            changeIconBorder:'',
            changeIconImage:'',
        },
        visualizer: {
            titleHeader:"Plastic Signs",
            textButtonRefresh:"Restart all",
            textButtonBack:"Undo",
            textButtonNext:"Redo",
            textBeforePrice:"",
            textAfterPrice:"TVA Include",
            textButtonFinish:"Finish",
            textAddToCart:"Add To Cart",
            textPreview:"Preview",
            textShare:"Share",
            textImport:"Import",
            textDownload:"Download",
            textSave:"Save",
            textHelp:"Help",
            textMaterial:"Material",
            textSize:"Size",
            textShape:"Shape",
            textFixingMethods:"Fixing Methods",
            textColor:"Color",
            textOptionText:"Text",
            textBorder:"Border",
            textProduct:"Product",
            textImage:"Image",
        }
    },
    themes: {
        skin: "default",
        colors: {
            textColorContentHeader:'#000000',
            backgroundColorHeader:'#000000',
            textColorContentSideMenu:'#000000',
            backgroundColorHeaderContentSide:'#000000',
            textColorOptionsMenu:'#000000',
            backgroundColorOptionsMenu:'#000000',
            textColorButtonSave:'#000000',
            backgroundColorTextButtonSave:'#000000',
            textColorHoverButtonSave:'#000000',
            backgroundColorHoverButtonSave:'#000000',
            textColorButton:'#000000',
            backgroundButton:'#000000',
            textColorHoverButton:'#000000',
            backgroundColorHoverButton:'#000000',
            textColorButtonHelp:'#000000',
            backgroundColorButtonHelp:'#000000',
            textColorHoverButtonHelp:'#000000',
            backgroundColorHoverButtonHelp:'#000000',
            textColorHoverButtonRestartAll:'#000000',
            backgroundColorHoverButtonRestartAll:'#000000',
            textColorButtonRestartAll:'#000000',
            backgroundColorButtonRestartAll:'#000000',
        }
    },
    sortOptions: []
  }
})
const configs = ref([]);
const totalPages = ref(0);
var pages = ref(0);
var page = ref(1);
const totalConfigsFound = ref(0);
const isFetching = ref(false);
const canAddNew = ref(false);
const isLoading = ref(false);
const search = ref('')
const step = ref(0);
const isEdit = ref(false);
const openModal = ref(false);

onMounted(async () => {
    isFetching.value = true;
    await fetchConfigs();
    canAddNew.value = true;
});

const fetchConfigs = async () => {

    const allConfigs = await api.getConfigs();
    configs.value = allConfigs.data;
    totalPages.value = allConfigs.totalPages;
    totalConfigsFound.value = allConfigs.totalConfigsFound;
    pages.value = allConfigs.totalPages;
    isFetching.value = false;
}

/**Function search */
const searchInputEmpty = async (e) => {
    if(e.target.value ==''){
        isFetching.value = true;
        const response = await api.getConfigs();
        configs.value = response.data;
        pages.value = response.totalPages;
        page.value = 1;
        isFetching.value = false;
    }
}

const handleSearchChange = async (e) => {
    e.preventDefault();
    var response;
    isFetching.value = true;
    if(search.value !=''){
        response = await api.getConfigs('?search='+search.value);
    }else{
        response = await api.getConfigs();
    }
    configs.value = response.data;
    pages.value = response.totalPages;
    page.value = 1;
    isFetching.value = false;
}
/** Pagination */
const handleNextPage = async() => {
   var nextPage = page.value + 1;
   if(pages.value >= nextPage){
       var response = await api.getConfigs('?page='+nextPage)
       configs.value = response.data;
       page.value = nextPage;
    }
        
}
const changePage = async(pg) => {
    var response = await api.getConfigs('?page='+pg)
    configs.value = response.data;
    pages.value = response.totalPages;
    page.value = pg;
}
const handlePrevPage = async () => {
    var prevPage = page.value - 1;
    if(prevPage >= 1){
    var response = await api.getConfigs('?page='+prevPage)
       configs.value = response.data;
       pages.value = response.totalPages;
       page.value = prevPage;
    }
}

/** Function for adding new Config */
const addNewConfig = async () => {
    const configuration = {
        ...newConfig.value,
        data:{
            ...defaultSettings.value,
            materials:[]
        }
    }
    const result = await api.addConfig(configuration);
    if(result.success){
        await fetchConfigs();
        newConfig.value = {
            title:"",
            description:"",
            icon:"",
            popImg:"",
        }
        toastMessage(result.message);
    }else{
        newConfig.value = {
            title:"",
            description:"",
            icon:"",
            popImg:"",
        }
        toastMessage(result.message,"error");
    }
}

const includeMetaData = async (state) => {
    if(state){
        await addNewConfig();
    }else{
        await addNewConfig();
    }
    step.value = 0;
    isNewConfig.value = false;
}

/* Function pour edit config */
const selectEditConfig = (config)=>{
    newConfig.value = {id:config.id,name:config.name, description:config.description, icon:config.icon, popImg:config.popImg}
    step.value = 1;
    isEdit.value = true;
}
const updateConfig = async () => {
    isLoading.value = true;
    const result = await api.updateConfig(newConfig.value);
    if(result.success){
        await fetchConfigs();        
        toastMessage(result.message);
        step.value = 0;
        isLoading.value = false;
        newConfig.value = {
            title:"",
            description:"",
            icon:"",
            popImg:"",
        }
    }else{
        isLoading.value = false;
        newConfig.value = {
            title:"",
            description:"",
            icon:"",
            popImg:"",
        }
        toastMessage(result.message,"error");
    }
}

/** Function to delete config */
const selectDeleteConfig = (id,name) => {
    deleteConfig.value = {id:id, name:name}
    closeModal();
}
const delConfig = async () => {
    isLoading.value = true;
    const result = await api.deleteConfig(deleteConfig.value.id);
    if(result.success){
        await fetchConfigs();
        isLoading.value = false;
        toastMessage(result.message);
    }else{
        isLoading.value = false;
        toastMessage(result.message,"error");
    }
    closeModal();
}


/** Modal Function */
const closeModal = ()=>{
    if(!isLoading.value){        
        openModal.value = !openModal.value;
    }
}

const addConfig = () => {
    step.value = 1;
    isNewConfig.value = true;
    
}

/** Navigation entre les sections */
const back = () => {
   const level = step.value;
   if(!isEdit.value){
       if(level != 0){
           if(level - 1 == 0){
                isNewConfig.value = false;
            }
            step.value = level - 1;
       }
   }else{
      if(!isLoading.value){
        newConfig.value = {
            title:"",
            description:"",
            icon:"",
            popImg:"",
        }
        step.value = 0;
        isEdit.value = false;
      }
   }
};
const next = () => {
    const level = step.value;
    if(level != 2){
            step.value = level + 1;
    }
};

/** Fonction for image selection */
const selectConfigIcon = async(e) => { 
    e.preventDefault();
    var uploader = wp.media(
        {
            title: "Select Configuration icon",
            button: {
                text: "Select Icon"
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
                            newConfig.value.icon = (attachment.url);
                        }
                    }
                );
            }
        )
        .open();
}
const selectConfigPopImg = async(e) => { 
    e.preventDefault();
    var uploader = wp.media(
        {
            title: "Select Configuration icon",
            button: {
                text: "Select Icon"
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
                            newConfig.value.popImg = (attachment.url);
                        }
                    }
                );
            }
        )
        .open();
}

/** Function for getting configuration name first letter */
const getInitials = (str) => {
  const words = str.split(' ');
  const initials = words.map(word => word.trim().charAt(0).toUpperCase());
  const result = initials.join('');
  return result;
}
</script>
<style>
    #aso-search {
        padding: 0px 33px 0 10px !important;
    }
</style>