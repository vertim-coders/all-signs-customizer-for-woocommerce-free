<template>
    <div class="aso-h-[100vh] aso-w-full">
        <div v-if="step==0 && !openModal">
            <div  class="aso-sticky aso-top-[80px] aso-z-[999] aso-bg-[#F8F9FB] aso-border-b-3 aso-border-t-0 aso-border-l-0 aso-border-r-0 aso-border-solid aso-border-[#f0f0f1] ">
                <div class="aso-px-4 aso-pb-4">
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
            </div>
            <!-- Table which display all configurations -->
            <div class="aso-w-full aso-overflow-x-auto">
                <div class="aso-overflow-hidden aso-w-full ">
                    <div class="aso-grid aso-grid-cols-5 aso-justify-center aso-items-center aso-p-4 aso-text-sm aso-font-medium aso-text-gray-900 aso-bg-[#f0f0f1] aso-border-t aso-border-b aso-border-gray-200 aso-gap-x-16">
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
                    <div v-if="!isFetching" v-for="(config,key) in configs" :key="key" class="aso-cursor-pointer aso-grid aso-items-center aso-bg-white aso-grid-cols-5 aso-px-4 aso-py-3 aso-text-sm aso-text-gray-700 aso-border-b-1 aso-border-t-0 aso-border-l-0 aso-border-r-0 aso-border-solid aso-border-gray-200 aso-gap-x-16">
                        <div class="aso-text-gray-500 aso-flex dark:aso-text-gray-400 aso-overflow-hidden aso-whitespace-nowrap aso-text-ellipsis aso-space-x-4" @click="()=>$router.push('/configs/'+config.name.replace(/ /,'-')+'/'+config.id+'/materials')">
                            <span class="aso-w-5 aso-h-5 aso-p-1 aso-px-1 aso-flex aso-justify-center aso-items-center aso-rounded-full aso-bg-[#f0f0f1] aso-border aso-border-solid aso-border-black ">
                                <span class="aso-text-[12px]">{{getInitials(config.name)}}</span> 
                            </span>
                            <span class="aso-flex aso-justify-center aso-items-center">{{ config.name }}</span>
                        </div>
                        <div class="aso-text-gray-500 aso-justify-center aso-items-center aso-flex dark:aso-text-gray-400 aso-overflow-hidden aso-whitespace-nowrap aso-text-ellipsis" @click="()=>$router.push('/configs/'+config.name.replace(/ /,'-')+'/'+config.id+'/materials')">
                            <span>{{config.description}}</span>
                        </div>
                        <div class="aso-text-gray-500 dark:aso-text-gray-400 aso-flex aso-justify-center aso-items-center" @click="()=>$router.push('/configs/'+config.name.replace(/ /,'-')+'/'+config.id+'/materials')">
                            <img class="aso-w-10 aso-h-10 aso-rounded" :src="config.icon" alt="" v-if="config.icon!=''">
                        </div> 
                        <div class="aso-text-gray-500 dark:aso-text-gray-400 aso-flex aso-justify-center aso-items-center" @click="()=>$router.push('/configs/'+config.name.replace(/ /,'-')+'/'+config.id+'/materials')">
                            <img class="aso-w-10 aso-h-10 aso-rounded" :src="config.popImg" alt="" v-if="config.popImg!=''">
                        </div>
                        <div class="aso-flex aso-space-x-2 aso-justify-center aso-items-center aso-text-gray-500 dark:aso-text-gray-400">
                           <!--  <button class="aso-bg-transparent aso-p-2 aso-rounded-md aso-border-none aso-cursor-pointer aso-space-x-1 aso-flex">
                                <img class="aso-w-5 aso-h-5" src="../../../../assets/icons/ic_preview.svg" alt="">
                            </button> -->
                            <button class="aso-bg-transparent aso-border-none aso-text-[#2DD05B] aso-cursor-pointer"  @click="selectEditConfig(config)">
                                <img class="aso-w-5 aso-h-5" src="../../../../assets/icons/ic_edit.svg" alt="">
                            </button>
                            <button class="aso-bg-[#FFC7D8] aso-p-2 aso-rounded-md aso-border-none aso-cursor-pointer aso-space-x-1 aso-flex" @click="goToMaterial(config)">
                                <img class="aso-w-4 aso-h-4" src="../../../../assets/icons/ic_manage.svg" alt="">
                                <span class="aso-text-[12px]">
                                    Manage
                                </span>
                            </button>
                            <button class="aso-border-none aso-bg-white aso-relative" @click="handleOpenConfigParams(key)">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="aso-w-6 aso-rotate-90 aso-h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                                </svg>
                                <div class="aso-bg-white aso-shadow-md aso-flex aso-justify-center aso-items-center aso-space-x-2 aso-p-2 aso-absolute -aso-top-12 aso-z-[9999] aso-right-0 aso-rounded" v-if="showParams[key]" @click.self="showPrams[key]=false;">
                                    <button class="aso-bg-transparent aso-border-none aso-text-[#FF6600] aso-cursor-pointer"  @click="selectEditConfig(config,true)">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="aso-w-6 aso-h-6">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" />
                                        </svg>
                                    </button>
                                    <button class="aso-bg-transparent aso-border-none aso-text-[#A00000] aso-cursor-pointer"  @click="selectDeleteConfig(config.id,config.name)">
                                        <img class="aso-w-5 aso-h-5" src="../../../../assets/icons/ic_delete.svg" alt="">
                                    </button>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="aso-flex aso-items-center aso-justify-center aso-translate-y-12 aso-py-7 aso-w-full" v-if="pages>1">
                <div class="aso-grid aso-grid-cols-5 aso-gap-4">
                    <button @click="handlePrevPage" :diseabled="page == 1" :class="`aso-text-[#016464] aso-h-10 aso-w-10 aso-p-2 aso-text-base  aso-bg-white aso-font-medium aso-rounded-lg aso-flex aso-items-center aso-justify-center aso-border ${page == 1 ? `aso-cursor-not-allowed aso-bg-gray-50 aso-text-[#e5e5e5]` :``}`">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-4 h-4">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                        </svg>
                    </button>

                    <div v-for="pg in pages" :key="pg">
                        <button @click="()=>changePage(pg)" v-if="pg != page" :class="`aso-text-[#016464] aso-bg-white aso-h-10 aso-w-10 aso-p-2 aso-text-base aso-font-medium aso-rounded-lg aso-flex aso-items-center aso-justify-center aso-border`">{{ pg }}</button>    
                        <button @click="()=>changePage(pg)" :diseabled="pg == page" v-if="pg == page" :class="`aso-bg-[#016464] aso-h-10 w-10 aso-p-3.5 aso-text-base aso-text-white aso-font-medium aso-rounded-lg aso-flex aso-items-center aso-justify-center aso-border aso-cursor-not-allowed`">{{ page }}</button>
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
        <div class="aso-space-y-1 aso-translate-y-9" v-if="step == 1 && !includeDemo">
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
                                <button @click="selectConfigIcon" class="aso-bg-[#016464] aso-border-none aso-w-fit aso-h-fit aso-p-4 aso-rounded aso-px-4 aso-text-white aso-opacity-90 hover:aso-opacity-100 aso-text-[10px] aso-cursor-pointer">upload image</button>
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
                                <button @click="selectConfigPopImg" class="aso-bg-[#016464] aso-border-none aso-w-fit aso-h-fit aso-p-4 aso-rounded aso-px-4 aso-text-white aso-opacity-90 hover:aso-opacity-100 aso-text-[10px] aso-cursor-pointer">upload image</button>
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
                    <button :disabled="newConfig.name.trim()==''" :class="`aso-flex aso-bg-transparent aso-w-fit aso-space-x-2 aso-h-fit aso-px-8 aso-text-white aso-p-2 aso-border-none aso-opacity-90 hover:aso-border-none hover:aso-text-white hover:aso-opacity-100 aso-cursor-pointer ${newConfig.name.trim()==''? 'aso-cursor-not-allowed' : ''}`" @click="next">
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
        <div v-if="step == 2 && !includeDemo">
            <div class="aso-bg-[#F8F9FB] aso-p-20 aso-space-y-20">
                <div class="">
                    <div class="aso-font-bold aso-text-[24px] aso-flex aso-justify-center aso-items-center">
                        Include demo data?
                    </div>
                    <div class="aso-text-[16px] aso-p-4 aso-flex aso-justify-center aso-items-center">
                        To help you get started we can automatically add some data for your 
                        new configuration
                    </div>
                </div>
                <div class="aso-flex aso-justify-center aso-items-center aso-space-x-4">
                    <div class="aso-bg-[#016464] aso-rounded">
                        <button :disabled="isLoading" class="aso-font-semibold aso-text-[16px] aso-flex aso-bg-transparent aso-w-fit aso-space-x-2 aso-h-fit aso-px-8 aso-p-3 aso-text-white aso-border-none aso-opacity-90 hover:aso-opacity-100 hover:aso-border-none hover:aso-text-white aso-cursor-pointer" @click="()=>includeMetaData(false)">
                            <img src="../../../../assets/icons/ic_loading_gray.svg" class="aso-w-5 aso-w-5" v-if="isLoading"/>
                            <svg v-if="!isLoading" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="aso-w-6 aso-h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                            No Include demo data
                        </button>
                    </div>
                    <div class="aso-bg-[#016464] aso-rounded">
                        <button :disabled="isLoading" class="aso-font-semibold aso-text-[16px] aso-flex aso-bg-transparent aso-w-fit aso-space-x-2 aso-h-fit aso-px-8 aso-p-3 aso-text-white aso-border-none aso-opacity-90 hover:aso-opacity-100 hover:aso-border-none hover:aso-text-white aso-cursor-pointer" @click="includeDemo = true;">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="aso-w-6 aso-h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M9 3.75H6.912a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H15M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859M12 3v8.25m0 0-3-3m3 3 3-3" />
                            </svg>

                            Include demo data
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

        <div v-if="includeDemo" class="aso-space-y-2 aso-z-[9999]">
            <div class="aso-bg-[#F8F9FB] aso-px-2 aso-py-4 aso-sticky aso-top-[75px] aso-z-[999] aso-shadow-sm">
                <h2 class="aso-m-0">List of Demo data</h2>
            </div>
            <div class="aso-bg-[#F8F9FB] aso-p-6">
                <div class="aso-grid aso-gap-y-10 aso-grid-cols-4 aso-py-4 aso-px-4">
                    <div class="aso-p-2 aso-border-solid aso-bg-white aso-border-gray-200 aso-rounded-md aso-cursor-pointer" :key="key" v-for="(demo,key) in demosList" :class="demo.value == selectedDemo  ? 'aso-ring-2 aso-ring-[#016464]' : ''">
                        <input type="radio" :id="'demo'+key" :value="demo.value" v-model="selectedDemo"  class="hiddenInput">
                        <label :for="'demo'+key">
                            <div :class="`aso-cursor-pointer aso-relative aso-flex aso-justify-center aso-items-center aso-w-full aso-rounded-md aso-overflow-hidden aso-h-[150px]`">
                                <img :src="demo.icon" alt="" class="aso-cursor-pointer aso-w-auto aso-h-full aso-rounded-md">
                            </div>
                            <div class="aso-cursor-pointer aso-px-2 aso-py-4">
                                <label for="" :class="`aso-m-0 aso-text-[16px] aso-font-bold  ${demo.value == selectedDemo ?  'aso-text-[#016464]':''}`">{{demo.name}}</label>
                                <p class="aso-m-0 aso-text-[12px] aso-font-normal aso-text-justify" :class="`${demo.value == selectedDemo ?  'aso-text-[#016464]':''}`">{{ demo.description }}</p>
                            </div>
                        </label>
                    </div>
                </div>
                <!-- <Multiselect
                    v-model="selectedDemo"
                    placeholder="Select ASO Configuration"
                    :options="demosList"
                    label="name"
                    trackBy="name"
                >
                    <template v-slot:singleLabel="{ value }">
                        <div class="multiselect-single-label">
                            <img class="aso-w-20 aso-h-20 aso-rounded aso-mr-2" :src="value.icon"> {{ value.name }}
                        </div>
                    </template>

                    <template v-slot:option="{ option }">
                        <img class="aso-w-[100px] aso-h-auto aso-rounded aso-mr-2" :src="option.icon">{{ option.name }}
                    </template>
                </Multiselect> -->
            </div>
            <div class="aso-sticky aso-bottom-0 aso-flex aso-justify-end aso-items-center aso-bg-[#F8F9FB] aso-translate-y-10'">
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
                <div class="aso-flex aso-font-bold aso-space-x-4 aso-px-4 aso-py-4 aso-justify-end aso-items-end">
                    <div class="aso-bg-[#016464] aso-rounded">
                        <button @click="includeMetaData(true)" class="aso-flex aso-bg-transparent aso-w-fit aso-space-x-2 aso-h-fit aso-text-white  aso-px-12 aso-p-2.5 aso-border-none aso-opacity-90 hover:aso-border-none hover:aso-text-white hover:aso-opacity-100 aso-cursor-pointer">
                            <div class="aso-translate-y-1">
                                <img src="../../../../assets/icons/ic_loading_gray.svg" class="aso-w-5 aso-w-5" v-if="isLoading" :disabled="isLoading"/>
                                <svg v-if="!isLoading" class="aso-w-4 aso-h-4" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2.5 1.25C2.16848 1.25 1.85054 1.3817 1.61612 1.61612C1.3817 1.85054 1.25 2.16848 1.25 2.5V17.5C1.25 17.8315 1.3817 18.1495 1.61612 18.3839C1.85054 18.6183 2.16848 18.75 2.5 18.75H17.5C17.8315 18.75 18.1495 18.6183 18.3839 18.3839C18.6183 18.1495 18.75 17.8315 18.75 17.5V2.5C18.75 2.16848 18.6183 1.85054 18.3839 1.61612C18.1495 1.3817 17.8315 1.25 17.5 1.25H11.875C11.5435 1.25 11.2255 1.3817 10.9911 1.61612C10.7567 1.85054 10.625 2.16848 10.625 2.5V11.6163L13.9325 8.3075C14.0499 8.19014 14.209 8.12421 14.375 8.12421C14.541 8.12421 14.7001 8.19014 14.8175 8.3075C14.9349 8.42486 15.0008 8.58403 15.0008 8.75C15.0008 8.91597 14.9349 9.07514 14.8175 9.1925L10.4425 13.5675C10.3844 13.6257 10.3155 13.6719 10.2395 13.7034C10.1636 13.7349 10.0822 13.7511 10 13.7511C9.91779 13.7511 9.83639 13.7349 9.76046 13.7034C9.68453 13.6719 9.61556 13.6257 9.5575 13.5675L5.1825 9.1925C5.12439 9.13439 5.07829 9.0654 5.04685 8.98948C5.0154 8.91356 4.99921 8.83218 4.99921 8.75C4.99921 8.66782 5.0154 8.58644 5.04685 8.51052C5.07829 8.4346 5.12439 8.36561 5.1825 8.3075C5.24061 8.24939 5.3096 8.20329 5.38552 8.17185C5.46144 8.1404 5.54282 8.12421 5.625 8.12421C5.70718 8.12421 5.78856 8.1404 5.86448 8.17185C5.9404 8.20329 6.00939 8.24939 6.0675 8.3075L9.375 11.6163V2.5C9.375 1.83696 9.63839 1.20107 10.1072 0.732233C10.5761 0.263392 11.212 0 11.875 0L17.5 0C18.163 0 18.7989 0.263392 19.2678 0.732233C19.7366 1.20107 20 1.83696 20 2.5V17.5C20 18.163 19.7366 18.7989 19.2678 19.2678C18.7989 19.7366 18.163 20 17.5 20H2.5C1.83696 20 1.20107 19.7366 0.732233 19.2678C0.263392 18.7989 0 18.163 0 17.5V2.5C0 1.83696 0.263392 1.20107 0.732233 0.732233C1.20107 0.263392 1.83696 0 2.5 0L5.625 0C5.79076 0 5.94973 0.065848 6.06694 0.183058C6.18415 0.300269 6.25 0.45924 6.25 0.625C6.25 0.79076 6.18415 0.949732 6.06694 1.06694C5.94973 1.18415 5.79076 1.25 5.625 1.25H2.5Z" fill="white"/>
                                </svg>
                            </div>
                            <span class="aso-font-semibold aso-text-[16px]">Done</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Delete Modal-->
        <div v-if="openModal" @click.self="closeModal" class="aso-z-[9999] aso-bg-gray-400 aso-overflow-y-auto aso-overflow-x-hidden aso-fixed aso-top-0 aso-right-[25%] aso-left-[75%] aso-z-50 aso-flex aso-justify-center aso-items-center aso-w-full md:aso-inset-0 aso-h-[calc(100%-1rem)] aso-h-[100vh]">
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
                        <button :disabled="isLoading" @click="delConfig" data-modal-hide="popup-modal" type="button" :class="`aso-border-solid aso-text-white ${!isLoading ? 'aso-bg-red-600 aso-cursor-pointer' :'aso-bg-red-700 aso-cursor-not-allowed'} hover:bg-red-800 focus:ring-4 focus:outline-none aso-my-2 aso-border-none  focus:ring-red-300 dark:focus:ring-red-800 aso-font-medium aso-rounded-lg aso-text-sm aso-inline-flex aso-items-center aso-px-5 aso-py-2.5 aso-text-center`">
                            <img src="../../../../assets/icons/ic_loading_gray.svg" class="aso-w-5 aso-w-5" v-if="isLoading"/>
                            Yes, I'm sure
                        </button>
                        <button :disabled="isLoading" @click.stop="closeModal" data-modal-hide="popup-modal" type="button" :class="`aso-border-solid aso-py-2.5 aso-px-5 aso-ms-3 aso-text-sm aso-font-medium aso-text-gray-900 aso-my-2  aso-border-gray-500 aso-border-white focus:outline-none aso-bg-white aso-rounded-lg aso-border aso-border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 ${isLoading ? 'aso-cursor-not-allowed' : 'aso-cursor-pointer'}`">No, cancel</button>
                    </div>
                </div>
            </div>
        </div>        
        <!-- Clone Modal-->
        <div v-if="openCloneModal" @click.self="closeCloneModal" class="aso-z-[99999] aso-bg-gray-400 aso-overflow-y-auto aso-overflow-x-hidden aso-fixed aso-top-0 aso-right-[25%] aso-left-[75%] aso-z-50 aso-flex aso-justify-center aso-items-center aso-w-full md:aso-inset-0 aso-h-[calc(100%-1rem)] aso-h-[100vh]">
            <div class="aso-relative aso-p-4 aso-w-full aso-max-w-md aso-max-h-full">
                <div class="aso-relative aso-bg-white aso-rounded-lg aso-shadow dark:bg-gray-700">
                    <button @click.stop="closeCloneModal" type="button" :class="`${isLoading ? 'aso-cursor-not-allowed' : 'aso-cursor-pointer'} aso-absolute aso-top-3 aso-end-2.5 aso-text-gray-400 aso-bg-transparent hover:bg-gray-200 hover:text-gray-900 aso-rounded-lg aso-text-sm aso-w-8 aso-h-8 aso-ms-auto aso-inline-flex aso-justify-center aso-items-center dark:hover:bg-gray-600 dark:hover:text-white`" data-modal-hide="popup-modal">
                        <svg class="aso-w-3 aso-h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                        <span class="aso-sr-only">Close modal</span>
                    </button>
                    <div class="aso-p-4 md:p-5 aso-text-center">
                        <svg class="aso-mx-auto aso-mb-4 aso-text-gray-400 aso-w-12 aso-h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                        </svg>
                        <h3 class="aso-mb-5 aso-text-lg aso-font-normal aso-text-gray-500 dark:text-gray-400">Give the name of the new configuration, which will be an imitation of the current one.</h3>
                        <input v-model="newConfig.name" class="aso-rounded aso-w-full aso-h-[35px] aso-text-start aso-p-4 aso-my-2 aso-border-solid aso-border-gray-400" />
                        <button @click="addNewConfig(newConfig)" data-modal-hide="popup-modal" type="button" :class="`aso-border-solid aso-text-white ${!isLoading ? 'aso-bg-[#016464] aso-cursor-pointer' :'aso-bg-[#016464] aso-cursor-not-allowed'} hover:bg-red-800 focus:ring-4 focus:outline-none aso-my-2 aso-border-none  focus:ring-red-300 dark:focus:ring-red-800 aso-font-medium aso-rounded-lg aso-text-sm aso-inline-flex aso-items-center aso-px-5 aso-py-2.5 aso-text-center`">
                            <img src="../../../../assets/icons/ic_loading_gray.svg" class="aso-w-5 aso-w-5" v-if="isLoading" :disabled="isLoading"/>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="aso-w-5 aso-w-5" v-if="!isLoading">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                            </svg>

                            Clone
                        </button>
                        <button @click.stop="closeCloneModal" data-modal-hide="popup-modal" type="button" :class="`aso-border-solid aso-py-2.5 aso-px-5 aso-ms-3 aso-text-sm aso-font-medium aso-text-gray-900 aso-my-2  aso-border-gray-500 aso-border-white focus:outline-none aso-bg-white aso-rounded-lg aso-border aso-border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 ${isLoading ? 'aso-cursor-not-allowed' : 'aso-cursor-pointer'}`">Cancel</button>
                    </div>
                </div>
            </div>
        </div>        
    </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import api from "@/admin/Api/api";
import toastMessage from '@/admin/utils/functions';
import Multiselect from '@vueform/multiselect';
import router from '@/admin/router';

const isNewConfig = ref(false);
const showParams = ref([]);
const openCloneModal = ref(false);
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

const demosList = ref([
    {name:'Acrylic Sign', value:'acrylic',icon:aso_data.assets_url+'/images/demos/im_acrylic_sign.webp',description:" An acrylic sign (perspex sign) is a popular choice for any office, professional setting or home due to it's professional and modern look."},
    {name:'Aluminium Sign', value:'aluminium',icon:aso_data.assets_url+'/images/demos/im_aluminium_sign.webp',description:"Create and order aluminium signs, perfect for indoor and outdoor use."},
    {name:'Brass Sign', value:'brass-sign',icon:aso_data.assets_url+'/images/demos/im_brass_sign.webp',description:"Create stylish brass signs for your home or business with our easy-to-use design tool."},
    {name:'Double-Sided Sign', value:'double-side',icon:aso_data.assets_url+'/images/demos/im_double_side_sign.gif',description:"Double-sided signs are perfect for those want the information to be able to read from both sides. Examples of double-sided signs are ''we are open'' and ''we are closed''."},
    {name:'Plastic Sign', value:'plastic',icon:aso_data.assets_url+'/images/demos/im_plastic_sign.webp',description:"Create bespoke plastic signs with high quality print or engra"},
    {name:'Rollup Sign', value:'rollup',icon:aso_data.assets_url+'/images/demos/im_rollup_sign.webp',description:"If you’re looking for an easy-to-use, portable advertising stand or display stand, then we recommend our roll-ups."},
    {name:'Stainless Stell Sign', value:'stainlessStell',icon:aso_data.assets_url+'/images/demos/im_stainlessSteel_sign.webp',description:"You can add numbers, letters, a certification or a logo to label plates. With us, you can order a complete number series with signs, or a single label plate."},
    {name:'Woods Sign', value:'woods-sign',icon:aso_data.assets_url+'/images/demos/im_wood_sign.webp',description:"Create custom wooden signs for indoor use with our easy-to-use design page. Communicate a warm and old fashioned feeling with a bespoke wood sign in birch or oak made from MDF."}
]);
const selectedDemo= ref('acrylic');
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
            hideDesignButtonsOnShopPage:false,
            hideAddToCartButtonOnShopPage:true,
            redirectToCheckOutPage:false,
            displayRecapsOnCheckout:false,
        }
    },
    customizerSign: {
        customizerOptions: {
            measurementUnit:"mm",
            showHideMeasurements:"both",
            decimalFormatMeasurements:"with-decimal",
            desktopColumnOrder:"right",
        },
        signPart: {
            doublePart:{
                active:false,
                label:"Switch Face",
                part1:"Face A",
                part2:"Face B",
                enableCopyDesignFromSide:true
            }
        },
        text: {
            selectedFonts: [],
            colorsLabel:"Texts Colors",
            colors: [
                {
                    name: "White",
                    codeHex: "#ffffff",
                    prevImg: "",
                    additionalPrice: 0
                },
                {
                    name: "Black",
                    codeHex: "#000000",
                    prevImg: "",
                    additionalPrice: 0
                },
                {
                    name: "Blue",
                    codeHex: "#004f86",
                    prevImg: "",
                    additionalPrice: 0
                },
                {
                    name: "Red",
                    codeHex: "#c4271d",
                    prevImg: "",
                    additionalPrice: 0
                },
                {
                    name: "Green",
                    codeHex: "#009251",
                    prevImg: "",
                    additionalPrice: 0
                },
                {
                    name: "Yellow",
                    codeHex: "#fee900",
                    prevImg: "",
                    additionalPrice: 0
                },
                {
                    name: "Gray",
                    codeHex: "#4f5756",
                    prevImg: "",
                    additionalPrice: 0
                },
                {
                    name: "Pink",
                    codeHex: "#bc4077",
                    prevImg: "",
                    additionalPrice: 0
                },
                {
                    name: "Purple",
                    codeHex: "#554585",
                    prevImg: "",
                    additionalPrice: 0
                },
                {
                    name: "Orange",
                    codeHex: "#e15616",
                    prevImg: "",
                    additionalPrice: 0
                },
                {
                    name: "Brown",
                    codeHex: "#523d2a",
                    prevImg: "",
                    additionalPrice: 0
                },
                {
                    name: "Gold",
                    codeHex: "#e9a956",
                    prevImg: "",
                    additionalPrice: 0
                },
                {
                    name: "Silver",
                    codeHex: "#e9e9e9",
                    prevImg: "",
                    additionalPrice: 0
                }
            ],
            enableCustomColor:true,
            colorsPrevImg:"",
            enableFontSize:{
                active:true,
                defaultFontSize:16,
                minimumFontSize:12,
                maximumFontSize:50,
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
            textCanvasCenterH:"centerH",
            textCanvasCenterV:"centerV",
            textCanvasDelete:"delete",
            textCanvasEdit:"Edit",
            textCanvasClone:"Clone",
            titleHeader:"Make Your Own Sign",
            textButtonRefresh:"Restart all",
            textButtonAdditonnalOptions:"Additionals",
            textAdditonnalOptionsHeader:"Additionals Options",
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
            textPosition:"Position",
            textAngle:"Angle",
            textWidth:"Width",
            textHeight:"Height",
            textRight:"Right",
            textLeft:"Left",
            textTop:"Top",
            textBottom:"Bottom",
            customSize:"Custom Size",
            customSizeButtonDone:"Done",
            thickness:"Thickness",
            textShape:"Shape",
            textFixingMethods:"Fixing Methods",
            textColor:"Color",
            textOptionText:"Text",
            textBorder:"Border",
            textProduct:"Product",
            textImage:"Image",
            textExample:"example",
            resetModalText:"Reset all for real ??",
            resetModalYes:"Yes",
            resetModalNo:"No",
        }
    },
    themeColors: {
        skin:"default",
        colors: {
            canvas:{
                backgroundColor:"#ffffff",
                borderColor:"#ffffff",
            },
            bars:{
                titleColor:"#000000",
                backgroundColor:"#ffffff",
                reset:{
                    textColor:"#000000",
                    hoverTextColor:"#dd3232",
                    backgroundColor:"#ffffff",
                    hoverBackgroundColor:"#f4f8fa",
                    borderColor:"#ffffff",
                    hoverBorderColor:"#f4f8fa",
                    modalBackgroundColor:"#000000",
                    modalContainerBackground:"#ffffff",
                    modalTextColor:"#000000",
                    modalYesButtonBackgroundColor:"#f4f8fa",
                    modalYesButtonTextColor:"#000000",
                    modalNoButtonBackgroundColor:"#dc2626",
                    modalNoButtonTextColor:"#ffffff"
                },
                undoRedo:{
                    textColor:"#000000",
                    hoverTextColor:"#0374e3",
                    backgroundColor:"#ffffff",
                    hoverBackgroundColor:"#f4f8fa",
                    borderColor:"#ffffff",
                    hoverBorderColor:"#f4f8fa",
                    disabledBackgroundColor:"#ffffff",
                    disabledTextColor:"#c3cfd6"
                },
                preview:{
                    textColor:"#000000",
                    hoverTextColor:"#0374e3",
                    backgroundColor:"#ffffff",
                    hoverBackgroundColor:"#f4f8fa",
                    borderColor:"#ffffff",
                    hoverBorderColor:"#f4f8fa",
                },
                help:{
                    textColor:"#ffffff",
                    hoverTextColor:"#ffffff",
                    backgroundColor:"#0374e3",
                    hoverBackgroundColor:"#025db7",
                    borderColor:"#0374e3",
                    hoverBorderColor:"#025db7",
                },
                price:{
                    backgroundColor:"#ffffff",
                    textColor:"#000000",
                    textAfterColor:"#000000",
                    textBeforeColor:"#000000",
                },
            },
            optionsSideBar:{
                backgroundColor:"#eef3f6",
                scrollButtonsBackgroundColor:"#4a4a4a",
                scrollButtonsHoverBackgroundColor:"#74848d",
                scrollButtonsTextColor:"#ffffff",
                scrollButtonsHoverTextColor:"#ffffff",
                options:{
                    buttons:{
                        backgroundColor:"#ffffff",
                        hoverBackgroundColor:"#ffffff",
                        textColor:"#000000",
                        hoverTextColor:"#000000"
                    },
                    modals:{
                        headerBackgroundColor:"#0374e3",
                        headerTextColor:"#ffffff",
                        textColor:"#ffffff",
                        option:{
                            textColor:"#000000",
                            hoverBackgroundColor:"#eef3f6",
                            hoverTextColor:"#000000",
                            activeTextColor:"#0374e3",
                        },
                        buttons:{
                            backgroundColor:"#0374e3",
                            hoverBackgroundColor:"#3590ea",
                            textColor:"#ffffff",
                            hoverTextColor:"#ffffff"
                        }
                    }
                }
            },
            objectsOptions:{
                backgroundColor:"#ffffff",
                edit:{
                    buttonColor:"#ffffff",
                    hoverButtonColor:"#787878",
                    textColor:"#000000",
                    hoverTextColor:"#ffffff"
                },
                clone:{
                    buttonColor:"#ffffff",
                    hoverButtonColor:"#787878",
                    textColor:"#000000",
                    hoverTextColor:"#ffffff"
                },
                delete:{
                    buttonColor:"#ffffff",
                    hoverButtonColor:"#787878",
                    textColor:"#dd3232",
                    hoverTextColor:"#dd3232"
                },
                center:{
                    buttonColor:"#ffffff",
                    hoverButtonColor:"#787878",
                    textColor:"#000000",
                    hoverTextColor:"#ffffff"
                }
            },
            recaps:{
                headerBackgroundColor:"#3590ea",
                headerTextColor:"#ffffff",
                backgroundColor:"#fffff",
                optionTextColor:"#000000",
                optionHoverBackgroundColor:"#eef3f6",
                optionHoverTextColor:"#000000",
                optionBorderColor:"#eef3f6",
                optionHoverBorderColor:"#eef3f6",
                buttonFinishBackgroundColor:"#febd52",
                buttonFinishTextColor:"#14213d",
                buttonFinishHoverBackgroundColor:"#fcac29",
                buttonFinishHoverTextColor:"#313e52",
                buttonAddToCartBackgroundColor:"#febd52",
                buttonAddToCartHoverBackgroundColor:"#fcac29",
                buttonAddToCartTextColor:"#14213d",
                buttonAddToCartHoverTextColor:"#313e52",
                buttonEditBackgroundColor:"#0374e3",
                buttonEditHoverBackgroundColor:"#025db7",
                buttonEditTextColor:"#ffffff",
                buttonEditHoverTextColor:"#f4f8fa",
            }
        },
        customCSS:""
    },
    sortOptions: []
  },
  additionalOptions:[]
});
const metaConfigs = ref({
    "acrylic":{
        materials: [
			{
				icon: "",
				name: "Acrylic",
				type: "simple",
				popImg: "",
				description: "",
				data: {
					sizes: {
						allSizes: [
							{
								isDefault: true,
								label: "100x50",
								width: 100,
								height: 50,
								startPriceAtChar: 1,
								textNumber: 0,
								maxTextChar: -1,
								charPrice: 0,
								basePrice: 0
							},
							{
								isDefault: false,
								label: "100x100",
								width: 100,
								height: 100,
								startPriceAtChar: 1,
								textNumber: 0,
								maxTextChar: -1,
								charPrice: 0,
								basePrice: 0
							},
							{
								isDefault: false,
								label: "150x100",
								width: 150,
								height: 100,
								startPriceAtChar: 1,
								textNumber: 0,
								maxTextChar: -1,
								charPrice: 0,
								basePrice: 0
							},
							{
								isDefault: false,
								label: "200x100",
								width: 200,
								height: 100,
								startPriceAtChar: 1,
								textNumber: 0,
								maxTextChar: -1,
								charPrice: 0,
								basePrice: 0
							},
							{
								isDefault: false,
								label: "250x100",
								width: 250,
								height: 100,
								startPriceAtChar: 1,
								textNumber: 0,
								maxTextChar: -1,
								charPrice: 0,
								basePrice: 0
							},
							{
								isDefault: false,
								label: "250x150",
								width: 250,
								height: 150,
								startPriceAtChar: 1,
								textNumber: 0,
								maxTextChar: -1,
								charPrice: 0,
								basePrice: 0
							},
							{
								isDefault: false,
								label: "300x100",
								width: 300,
								height: 100,
								startPriceAtChar: 1,
								textNumber: 0,
								maxTextChar: -1,
								charPrice: 0,
								basePrice: 0
							},
							{
								isDefault: false,
								label: "300x150",
								width: 300,
								height: 150,
								startPriceAtChar: 1,
								textNumber: 0,
								maxTextChar: -1,
								charPrice: 0,
								basePrice: 0
							},
							{
								isDefault: false,
								label: "300x200",
								width: 300,
								height: 200,
								startPriceAtChar: 1,
								textNumber: 0,
								maxTextChar: -1,
								charPrice: 0,
								basePrice: 0
							},
							{
								isDefault: false,
								label: "400x300",
								width: 400,
								height: 300,
								startPriceAtChar: 1,
								textNumber: 0,
								maxTextChar: -1,
								charPrice: 0,
								basePrice: 0
							},
							{
								isDefault: false,
								label: "400x100",
								width: 400,
								height: 100,
								startPriceAtChar: 1,
								textNumber: 0,
								maxTextChar: -1,
								charPrice: 0,
								basePrice: 0
							},
							{
								isDefault: false,
								label: "500x300",
								width: 500,
								height: 300,
								startPriceAtChar: 1,
								textNumber: 0,
								maxTextChar: -1,
								charPrice: 0,
								basePrice: 0
							},
							{
								isDefault: false,
								label: "500x400",
								width: 500,
								height: 400,
								startPriceAtChar: 1,
								textNumber: 0,
								maxTextChar: -1,
								charPrice: 0,
								basePrice: 0
							},
							{
								isDefault: false,
								label: "500x500",
								width: 500,
								height: 500,
								startPriceAtChar: 1,
								textNumber: 0,
								maxTextChar: -1,
								charPrice: 0,
								basePrice: 0
							},
							{
								isDefault: false,
								label: "600x400",
								width: 600,
								height: 400,
								startPriceAtChar: 1,
								textNumber: 0,
								maxTextChar: -1,
								charPrice: 0,
								basePrice: 0
							},
							{
								isDefault: false,
								label: "800x800",
								width: 800,
								height: 800,
								startPriceAtChar: 1,
								textNumber: 0,
								maxTextChar: -1,
								charPrice: 0,
								basePrice: 0
							},
							{
								isDefault: false,
								label: "1000x500",
								width: 1000,
								height: 500,
								startPriceAtChar: 1,
								textNumber: 0,
								maxTextChar: -1,
								charPrice: 0,
								basePrice: 0
							},
							{
								isDefault: false,
								label: "1200x800",
								width: 1200,
								height: 800,
								startPriceAtChar: 1,
								textNumber: 0,
								maxTextChar: -1,
								charPrice: 0,
								basePrice: 0
							},
							{
								isDefault: false,
								label: "1400x900",
								width: 1400,
								height: 900,
								startPriceAtChar: 1,
								textNumber: 0,
								maxTextChar: -1,
								charPrice: 0,
								basePrice: 0
							}
						],
						thickness: {
							active: false,
                            values:[]
						},
						customSize: {
							active: true,
							width: {
								max: 1400,
								min: 100,
								label: "Width"
							},
							height: {
								max: 900,
								min: 50,
								label: "Height"
							}
						}
					},
					colors: {
						customColors: {
							active: false,
							label: "Custom Colors",
							prevImg: ""
						},
						allColors: [
							{
								isDefault: true,
								name: "Transparent",
								textColor: {
									active: false,
                                    sameForBorder:false,
                                    name:"",
                                    codeHex:'#000000',
								},
								pattern: {
									active: true,
									codeHex: "#f0f0f0",
									url: aso_data.assets_url+'/images/im_transparent-acrylic-sign.png'
								},
								prevImg: "",
								additionalPrice: 0
							},
							{
								isDefault: false,
								name: "White",
								textColor: {
									active: false,
                                    sameForBorder:false,
                                    name:"",
                                    codeHex:'#000000',
								},
								pattern: {
									active: false,
									codeHex: "#ffffff",
									url: ""
								},
								prevImg: "",
								additionalPrice: 0
							},
							{
								isDefault: false,
								name: "Black",
								textColor: {
									active: false,
                                    sameForBorder:false,
                                    name:"",
                                    codeHex:'#000000',
								},
								pattern: {
									active: false,
									codeHex: "#000000",
									url: ""
								},
								prevImg: "",
								additionalPrice: 0
							},
							{
								isDefault: false,
								name: "Blue",
								textColor: {
									active: false,
                                    sameForBorder:false,
                                    name:"",
                                    codeHex:'#000000',
								},
								pattern: {
									active: false,
									codeHex: "#004f86",
									url: ""
								},
								prevImg: "",
								additionalPrice: 0
							},
							{
								isDefault: false,
								name: "Red",
								textColor: {
									active: false,
                                    sameForBorder:false,
                                    name:"",
                                    codeHex:'#000000',
								},
								pattern: {
									active: false,
									codeHex: "#c4271d",
									url: ""
								},
								prevImg: "",
								additionalPrice: 0
							},
							{
								isDefault: false,
								name: "Green",
								textColor: {
									active: false,
                                    sameForBorder:false,
                                    name:"",
                                    codeHex:'#000000',
								},
								pattern: {
									active: false,
									codeHex: "#009251",
									url: ""
								},
								prevImg: "",
								additionalPrice: 0
							},
							{
								isDefault: false,
								name: "Yellow",
								textColor: {
									active: false,
                                    sameForBorder:false,
                                    name:"",
                                    codeHex:'#000000',
								},
								pattern: {
									active: false,
									codeHex: "#fee900",
									url: ""
								},
								prevImg: "",
								additionalPrice: 0
							},
							{
								isDefault: false,
								name: "Gray",
								textColor: {
									active: false,
                                    sameForBorder:false,
                                    name:"",
                                    codeHex:'#000000',
								},
								pattern: {
									active: false,
									codeHex: "#4f5756",
									url: ""
								},
								prevImg: "",
								additionalPrice: 0
							},
							{
								isDefault: false,
								name: "Pink",
								textColor: {
									active: false,
                                    sameForBorder:false,
                                    name:"",
                                    codeHex:'#000000',
								},
								pattern: {
									active: false,
									codeHex: "#bc4077",
									url: ""
								},
								prevImg: "",
								additionalPrice: 0
							},
							{
								isDefault: false,
								name: "Purple",
								textColor: {
									active: false,
                                    sameForBorder:false,
                                    name:"",
                                    codeHex:'#000000',
								},
								pattern: {
									active: false,
									codeHex: "#554585",
									url: ""
								},
								prevImg: "",
								additionalPrice: 0
							},
							{
								isDefault: false,
								name: "Orange",
								textColor: {
									active: false,
                                    sameForBorder:false,
                                    name:"",
                                    codeHex:'#000000',
								},
								pattern: {
									active: false,
									codeHex: "#e15616",
									url: ""
								},
								prevImg: "",
								additionalPrice: 0
							},
							{
								isDefault: false,
								name: "Brown",
								textColor: {
									active: false,
                                    sameForBorder:false,
                                    name:"",
                                    codeHex:'#000000',
								},
								pattern: {
									active: false,
									codeHex: "#523d2a",
									url: ""
								},
								prevImg: "",
								additionalPrice: 0
							}
						]
					},
					shapes: [
						{
							isDefault: false,
							shapeId: 3,
							additionalPrice: 0
						},
						{
							isDefault: true,
							shapeId: 1,
							additionalPrice: 0
						},
						{
							isDefault: false,
							shapeId: 0,
							additionalPrice: 0
						}
					],
					borders: {
						settings: {
							colors: [
								{
									name: "White",
									codeHex: "#ffffff",
									prevImg: "",
									additionalPrice: 0
								},
								{
									name: "Black",
									codeHex: "#000000",
									prevImg: "",
									additionalPrice: 0
								},
								{
									name: "Blue",
									codeHex: "#004f86",
									prevImg: "",
									additionalPrice: 0
								},
								{
									name: "Red",
									codeHex: "#c4271d",
									prevImg: "",
									additionalPrice: 0
								},
								{
									name: "Green",
									codeHex: "#009251",
									prevImg: "",
									additionalPrice: 0
								},
								{
									name: "Yellow",
									codeHex: "#fee900",
									prevImg: "",
									additionalPrice: 0
								},
								{
									name: "Gray",
									codeHex: "#4f5756",
									prevImg: "",
									additionalPrice: 0
								},
								{
									name: "Pink",
									codeHex: "#bc4077",
									prevImg: "",
									additionalPrice: 0
								},
								{
									name: "Purple",
									codeHex: "#554585",
									prevImg: "",
									additionalPrice: 0
								},
								{
									name: "Orange",
									codeHex: "#e15616",
									prevImg: "",
									additionalPrice: 0
								},
								{
									name: "Brown",
									codeHex: "#523d2a",
									prevImg: "",
									additionalPrice: 0
								}
							],
							enableBorderWidth: false,
							enableBorderColor: true
						},
						allBorders: [
							{
								isDefault: false,
								manageBorderId: 0,
								additionalPrice: 0,
								excludeSizes: [],
								excludeShapes: []
							},
							{
								isDefault: true,
								manageBorderId: 1,
								additionalPrice: 0,
								excludeSizes: [],
								excludeShapes: []
							},
							{
								isDefault: false,
								manageBorderId: 3,
								additionalPrice: 0,
								excludeSizes: [],
								excludeShapes: [2]
							}
						]
					},
					textImages: {
						enableText:true,
                        enableImage:true
					},
					fixingMethods: [
						{
							fixingMethodId: 0,
							additionalPrice: 0,
							excludeSizes: [],
							excludeShapes: []
						},
						{
							fixingMethodId: 2,
							additionalPrice: 0.2,
							excludeSizes: [],
							excludeShapes: [
								2,
								4,
								5,
								6,
								7,
								8,
								9,
								10,
								11
							]
						},
						{
							fixingMethodId: 3,
							additionalPrice: 4.7,
							excludeSizes: [],
							excludeShapes: [
								2,
								4,
								5,
								6,
								7,
								8,
								9,
								10,
								11
							]
						},
						{
							fixingMethodId: 4,
							additionalPrice: 12.8,
							excludeSizes: [
								18,
								19
							],
							excludeShapes: [
								2,
								4,
								5,
								6,
								7,
								8,
								9,
								10,
								11
							]
						},
						{
							fixingMethodId: 6,
							additionalPrice: 4.8,
							excludeSizes: [
								15,
								16,
								17,
								18,
								19
							],
							excludeShapes: [
								0,
								2,
								4,
								5,
								6,
								7,
								8,
								9,
								10,
								11
							]
						},
						{
							fixingMethodId: 5,
							additionalPrice: 1.2,
							excludeSizes: [],
							excludeShapes: [
								2,
								4,
								5,
								6,
								7,
								8,
								9,
								10,
								11
							]
						},
						{
							fixingMethodId: 9,
							additionalPrice: 21,
							excludeSizes: [
								1,
								2,
								16,
								17,
								18,
								19
							],
							excludeShapes: [
								2,
								4,
								5,
								6,
								7,
								8,
								9,
								10,
								11
							]
						}
					],
					additionalOptions: [
						{
							title: "Frosted",
							description: "",
							icon: "https://signsdesigner.us/app/demos/acrylic-signs/ic_frosted.svg",
							options: [
								{
									title: "Standard",
									description: "",
									icon: aso_data.assets_url+'/images/demos/ic_none.svg',
									image: "",
                                    popImg:"",
									excludeColors: [],
									isDefault: true,
									additionalPrice: 0
								},
								{
									title: "Frosted",
									description: "",
									icon: "https://signsdesigner.us/app/demos/acrylic-signs/frosted.png",
									image: "https://signsdesigner.us/app/demos/acrylic-signs/frosted.png",
									popImg:"",
                                    excludeColors: [
										2,
										3,
										4,
										5,
										6,
										7,
										8,
										9,
										10,
										11,
										12
									],
									isDefault: false,
									additionalPrice: 0
								}
							]
						}
					]
				}
			}
		]
    },
    "aluminium":{
        materials: [
            {
                icon: "",
                name: "Aluminium",
                type: "simple",
                popImg: "",
                description: "",
                data: {
                    sizes: {
                        allSizes: [
                            {
                                isDefault: true,
                                label: "70x30",
                                width: 70,
                                height: 30,
                                startPriceAtChar: 1,
                                textNumber: 0,
                                maxTextChar: -1,
                                minCharText:0,
                                charPrice: 0,
                                basePrice: 0
                            },
                            {
                                isDefault: false,
                                label: "70x70",
                                width: 70,
                                height: 70,
                                startPriceAtChar: 1,
                                textNumber: 0,
                                maxTextChar: -1,
                                minCharText:0,
                                charPrice: 0,
                                basePrice: 0
                            },
                            {
                                isDefault: false,
                                label: "120x50",
                                width: 120,
                                height: 50,
                                startPriceAtChar: 1,
                                textNumber: 0,
                                maxTextChar: -1,
                                minCharText:0,
                                charPrice: 0,
                                basePrice: 0
                            },
                            {
                                isDefault: false,
                                label: "120x70",
                                width: 120,
                                height: 70,
                                startPriceAtChar: 1,
                                textNumber: 0,
                                maxTextChar: -1,
                                minCharText:0,
                                charPrice: 0,
                                basePrice: 0
                            },
                            {
                                isDefault: false,
                                label: "150x100",
                                width: 150,
                                height: 100,
                                startPriceAtChar: 1,
                                textNumber: 0,
                                maxTextChar: -1,
                                minCharText:0,
                                charPrice: 0,
                                basePrice: 0
                            },
                            {
                                isDefault: false,
                                label: "200x100",
                                width: 200,
                                height: 100,
                                startPriceAtChar: 1,
                                textNumber: 0,
                                maxTextChar: -1,
                                minCharText:0,
                                charPrice: 0,
                                basePrice: 0
                            },
                            {
                                isDefault: false,
                                label: "200x200",
                                width: 200,
                                height: 200,
                                startPriceAtChar: 1,
                                textNumber: 0,
                                maxTextChar: -1,
                                minCharText:0,
                                charPrice: 0,
                                basePrice: 0
                            },
                            {
                                isDefault: false,
                                label: "300x200",
                                width: 300,
                                height: 200,
                                startPriceAtChar: 1,
                                textNumber: 0,
                                maxTextChar: -1,
                                minCharText:0,
                                charPrice: 0,
                                basePrice: 0
                            },
                            {
                                isDefault: false,
                                label: "300x300",
                                width: 300,
                                height: 300,
                                startPriceAtChar: 1,
                                textNumber: 0,
                                maxTextChar: -1,
                                minCharText:0,
                                charPrice: 0,
                                basePrice: 0
                            },
                            {
                                isDefault: false,
                                label: "400x300",
                                width: 400,
                                height: 300,
                                startPriceAtChar: 1,
                                textNumber: 0,
                                maxTextChar: -1,
                                minCharText:0,
                                charPrice: 0,
                                basePrice: 0
                            },
                            {
                                isDefault: false,
                                label: "500x200",
                                width: 500,
                                height: 200,
                                startPriceAtChar: 1,
                                textNumber: 0,
                                maxTextChar: -1,
                                minCharText:0,
                                charPrice: 0,
                                basePrice: 0
                            },
                            {
                                isDefault: false,
                                label: "600x600",
                                width: 600,
                                height: 600,
                                startPriceAtChar: 1,
                                textNumber: 0,
                                maxTextChar: -1,
                                minCharText:0,
                                charPrice: 0,
                                basePrice: 0
                            },
                            {
                                isDefault: false,
                                label: "800x800",
                                width: 800,
                                height: 800,
                                startPriceAtChar: 1,
                                textNumber: 0,
                                maxTextChar: -1,
                                minCharText:0,
                                charPrice: 0,
                                basePrice: 0
                            },
                            {
                                isDefault: false,
                                label: "1000x500",
                                width: 1000,
                                height: 500,
                                startPriceAtChar: 1,
                                textNumber: 0,
                                maxTextChar: -1,
                                minCharText:0,
                                charPrice: 0,
                                basePrice: 0
                            },
                            {
                                isDefault: false,
                                label: "1000x600",
                                width: 1000,
                                height: 600,
                                startPriceAtChar: 1,
                                textNumber: 0,
                                maxTextChar: -1,
                                minCharText:0,
                                charPrice: 0,
                                basePrice: 0
                            },
                            {
                                isDefault: false,
                                label: "1000x1000",
                                width: 1000,
                                height: 1000,
                                startPriceAtChar: 1,
                                textNumber: 0,
                                maxTextChar: -1,
                                minCharText:0,
                                charPrice: 0,
                                basePrice: 0
                            },
                            {
                                isDefault: false,
                                label: "1200x700",
                                width: 1200,
                                height: 700,
                                startPriceAtChar: 1,
                                textNumber: 0,
                                maxTextChar: -1,
                                minCharText:0,
                                charPrice: 0,
                                basePrice: 0
                            },
                            {
                                isDefault: false,
                                label: "1500x500",
                                width: 1500,
                                height: 500,
                                startPriceAtChar: 1,
                                textNumber: 0,
                                maxTextChar: -1,
                                minCharText:0,
                                charPrice: 0,
                                basePrice: 0
                            },
                            {
                                isDefault: false,
                                label: "1500x1000",
                                width: 1000,
                                height: 1000,
                                startPriceAtChar: 1,
                                textNumber: 0,
                                maxTextChar: -1,
                                minCharText:0,
                                charPrice: 0,
                                basePrice: 0
                            },
                            {
                                isDefault: false,
                                label: "2000x500",
                                width: 2000,
                                height: 500,
                                startPriceAtChar: 1,
                                textNumber: 0,
                                maxTextChar: -1,
                                minCharText:0,
                                charPrice: 0,
                                basePrice: 0
                            },
                            {
                                isDefault: false,
                                label: "2000x1000",
                                width: 2000,
                                height: 1000,
                                startPriceAtChar: 1,
                                textNumber: 0,
                                maxTextChar: -1,
                                minCharText:0,
                                charPrice: 0,
                                basePrice: 0
                            },
                            {
                                isDefault: false,
                                label: "2000x1200",
                                width: 2000,
                                height: 1200,
                                startPriceAtChar: 1,
                                textNumber: 0,
                                maxTextChar: -1,
                                minCharText:0,
                                charPrice: 0,
                                basePrice: 0
                            }
                        ],
                        thickness: {
                            active: false,
                            values:[]
                        },
                        customSize: {
                            active: true,
                            width: {
                                max: 2000,
                                min: 70,
                                label: "Width"
                            },
                            height: {
                                max: 1200,
                                min: 30,
                                label: "Height"
                            }
                        }
                    },
                    colors: {
                        customColors: {
                            active: true,
                            label: "Custom Colors",
                            prevImg: ""
                        },
                        allColors: [
                            {
                                isDefault: true,
                                name: "White",
                                textColor: {
                                    active: false,
                                    sameForBorder:false,
                                    name:"",
                                    codeHex:'#000000',
                                },
                                pattern: {
                                    active: false,
                                    codeHex: "#ffffff",
                                    url: ""
                                },
                                prevImg: "",
                                additionalPrice: 0
                            },
                            {
                                isDefault: false,
                                name: "Aluminium",
                                    textColor: {
                                    active: false,
                                        sameForBorder:false,
                                    name:"",
                                    codeHex:'#000000',
                                },
                                pattern: {
                                active: false,
                                codeHex: "#dfdfdf",
                                url: ""
                                },
                                prevImg: "",
                                additionalPrice: 0
                            },
                            {
                                isDefault: false,
                                name: "Black",
                                textColor: {
                                    active: false,
                                    sameForBorder:false,
                                    name:"",
                                    codeHex:'#000000',
                                },
                                pattern: {
                                active: false,
                                codeHex: "#000000",
                                url: ""
                                },
                                prevImg: "",
                                additionalPrice: 0
                            },
                            {
                                isDefault: false,
                                name: "Blue",
                                textColor: {
                                    active: false,
                                    sameForBorder:false,
                                    name:"",
                                    codeHex:'#000000',
                                },
                                pattern: {
                                active: false,
                                codeHex: "#004f86",
                                url: ""
                                },
                                prevImg: "",
                                additionalPrice: 0
                            },
                            {
                                isDefault: false,
                                name: "Red",
                                textColor: {
                                    active: false,
                                    sameForBorder:false,
                                    name:"",
                                    codeHex:'#000000',
                                },
                                pattern: {
                                active: false,
                                codeHex: "#c4271d",
                                url: ""
                                },
                                prevImg: "",
                                additionalPrice: 0
                            },
                            {
                                isDefault: false,
                                name: "Green",
                                textColor: {
                                    active: false,
                                    sameForBorder:false,
                                    name:"",
                                    codeHex:'#000000',
                                },
                                pattern: {
                                active: false,
                                codeHex: "#009251",
                                url: ""
                                },
                                prevImg: "",
                                additionalPrice: 0
                            },
                            {
                                isDefault: false,
                                name: "Yellow",
                                textColor: {
                                    active: false,
                                    sameForBorder:false,
                                    name:"",
                                    codeHex:'#000000',
                                },
                                pattern: {
                                active: false,
                                codeHex: "#fee900",
                                url: ""
                                },
                                prevImg: "",
                                additionalPrice: 0
                            },
                            {
                                isDefault: false,
                                name: "Gray",
                                textColor: {
                                    active: false,
                                    sameForBorder:false,
                                    name:"",
                                    codeHex:'#000000',
                                },
                                pattern: {
                                active: false,
                                codeHex: "#4f5756",
                                url: ""
                                },
                                prevImg: "",
                                additionalPrice: 0
                            },
                            {
                                isDefault: false,
                                name: "Pink",
                                textColor: {
                                    active: false,
                                    sameForBorder:false,
                                    name:"",
                                    codeHex:'#000000',
                                },
                                pattern: {
                                active: false,
                                codeHex: "#bc4077",
                                url: ""
                                },
                                prevImg: "",
                                additionalPrice: 0
                            },
                            {
                                isDefault: false,
                                name: "Purple",
                                textColor: {
                                    active: false,
                                    sameForBorder:false,
                                    name:"",
                                    codeHex:'#000000',
                                },
                                pattern: {
                                active: false,
                                codeHex: "#554585",
                                url: ""
                                },
                                prevImg: "",
                                additionalPrice: 0
                            },
                            {
                                isDefault: false,
                                name: "Orange",
                                textColor: {
                                    active: false,
                                    sameForBorder:false,
                                    name:"",
                                    codeHex:'#000000',
                                },
                                pattern: {
                                active: false,
                                codeHex: "#e15616",
                                url: ""
                                },
                                prevImg: "",
                                additionalPrice: 0
                            },
                            {
                                isDefault: false,
                                name: "Brown",
                                textColor: {
                                    active: false,
                                    sameForBorder:false,
                                    name:"",
                                    codeHex:'#000000',
                                },
                                pattern: {
                                active: false,
                                codeHex: "#523d2a",
                                url: ""
                                },
                                prevImg: "",
                                additionalPrice: 0
                            },
                            {
                                isDefault: false,
                                name: "Gold",
                                textColor: {
                                    active: false,
                                    sameForBorder:false,
                                    name:"",
                                    codeHex:'#000000',
                                },
                                pattern: {
                                active: false,
                                codeHex: "#e9a956",
                                url: ""
                                },
                                prevImg: "",
                                additionalPrice: 0
                            },
                            {
                                isDefault: false,
                                name: "Silver",
                                textColor: {
                                    active: false,
                                    sameForBorder:false,
                                    name:"",
                                    codeHex:'#000000',
                                },
                                pattern: {
                                active: false,
                                codeHex: "#e9e9e9",
                                url: ""
                                },
                                prevImg: "",
                                additionalPrice: 0
                            }
                        ]
                    },
                    shapes: [
                        {
                            isDefault:true,
                            shapeId: 1,
                            additionalPrice: 0
                        },
                        {
                            isDefault:false,
                            shapeId: 3,
                            additionalPrice: 0
                        },
                        {
                            isDefault:false,
                            shapeId: 0,
                            additionalPrice: 0
                        },
                        {
                            isDefault:false,
                            shapeId: 4,
                            additionalPrice: 0
                        },
                        {
                            isDefault:false,
                            shapeId: 2,
                            additionalPrice: 0
                        },
                        {
                            isDefault:false,
                            shapeId: 5,
                            additionalPrice: 0
                        },
                        {
                            isDefault:false,
                            shapeId: 6,
                            additionalPrice: 0
                        },
                        {
                            isDefault:false,
                            shapeId: 9,
                            additionalPrice: 0
                        },
                        {
                            isDefault:false,
                            shapeId: 7,
                            additionalPrice: 0
                        },
                        {
                            isDefault:false,
                            shapeId: 8,
                            additionalPrice: 0
                        }
                    ],
                    borders: {
                        settings: {
                            borderColorsLabel:"Borders Colors",
                            colors: [
                                {
                                    name: "White",
                                    codeHex: "#ffffff",
                                    prevImg: "",
                                    additionalPrice: 0
                                },
                                {
                                    name: "Black",
                                    codeHex: "#000000",
                                    prevImg: "",
                                    additionalPrice: 0
                                },
                                {
                                    name: "Blue",
                                    codeHex: "#004f86",
                                    prevImg: "",
                                    additionalPrice: 0
                                },
                                {
                                    name: "Red",
                                    codeHex: "#c4271d",
                                    prevImg: "",
                                    additionalPrice: 0
                                },
                                {
                                    name: "Green",
                                    codeHex: "#009251",
                                    prevImg: "",
                                    additionalPrice: 0
                                },
                                {
                                    name: "Yellow",
                                    codeHex: "#fee900",
                                    prevImg: "",
                                    additionalPrice: 0
                                },
                                {
                                    name: "Gray",
                                    codeHex: "#4f5756",
                                    prevImg: "",
                                    additionalPrice: 0
                                },
                                {
                                    name: "Pink",
                                    codeHex: "#bc4077",
                                    prevImg: "",
                                    additionalPrice: 0
                                },
                                {
                                    name: "Purple",
                                    codeHex: "#554585",
                                    prevImg: "",
                                    additionalPrice: 0
                                },
                                {
                                    name: "Orange",
                                    codeHex: "#e15616",
                                    prevImg: "",
                                    additionalPrice: 0
                                },
                                {
                                    name: "Brown",
                                    codeHex: "#523d2a",
                                    prevImg: "",
                                    additionalPrice: 0
                                },
                                {
                                    name: "Gold",
                                    codeHex: "#e9a956",
                                    prevImg: "",
                                    additionalPrice: 0
                                },
                                {
                                    name: "Silver",
                                    codeHex: "#e9e9e9",
                                    prevImg: "",
                                    additionalPrice: 0
                                }
                            ],
                            enableBorderWidth: false,
                            enableBorderColor: true,
                            customColorsPrevImg:''
                        },
                        allBorders: [
                            {
                                isDefault:true,
                                manageBorderId: 0,
                                additionalPrice: 0,
                                excludeSizes: [],
                                excludeShapes: []
                            },
                            {
                                isDefault:false,
                                manageBorderId: 1,
                                additionalPrice: 0,
                                excludeSizes: [],
                                excludeShapes: []
                            },
                            {
                                isDefault:false,
                                manageBorderId: 2,
                                additionalPrice: 0,
                                excludeSizes: [],
                                excludeShapes: []
                            },
                            {
                                isDefault:false,
                                manageBorderId: 3,
                                additionalPrice: 0,
                                excludeSizes: [],
                                excludeShapes: []
                            }
                        ]
                    },
                    textImages: {
                        enableText: true,
                        enableImage: true
                    },
                    fixingMethods: [
                        {
                            isDefault:true,
                            fixingMethodId: 0,
                            additionalPrice: 0,
                            excludeSizes: [],
                            excludeShapes: []
                        },
                        {
                            isDefault:false,
                            fixingMethodId: 2,
                            additionalPrice: 0,
                            excludeSizes: [],
                            excludeShapes: []
                        },
                        {
                            isDefault:false,
                            fixingMethodId: 3,
                            additionalPrice: 4.5,
                            excludeSizes: [],
                            excludeShapes: []
                        },
                        {
                            isDefault:false,
                            fixingMethodId: 6,
                            additionalPrice: 0.3,
                            excludeSizes: [11,12,13,14,15,16,17,18,19,20,21,22],
                            excludeShapes: [0,4,2,9,5,6]
                        },
                        {
                            isDefault:false,
                            fixingMethodId: 5,
                            additionalPrice: 0.6,
                            excludeSizes: [],
                            excludeShapes: [5,6,7,8]
                        },
                        {
                            isDefault:false,
                            fixingMethodId: 4,
                            additionalPrice: 12.8,
                            excludeSizes: [16,17,18,19,20,21,22],
                            excludeShapes: [0]
                        },
                        {
                            isDefault:false,
                            fixingMethodId: 1,
                            additionalPrice: 0,
                            excludeSizes: [13,14,15,16,17,18,19,20,21,22],
                            excludeShapes: []
                        },
                        {
                            isDefault:false,
                            fixingMethodId: 10,
                            additionalPrice: 11.4,
                            excludeSizes: [1,2,3,4,5,22],
                            excludeShapes: [5,6
                            ]
                        },
                        {
                            isDefault:false,
                            fixingMethodId: 9,
                            additionalPrice: 13.2,
                            excludeSizes: [1,2,3,4,14,15,16,17,18,19,20,21,22],
                            excludeShapes: [0,4,2,9,7,8]
                        },
                        {
                            isDefault:false,
                            fixingMethodId: 15,
                            additionalPrice: 0.5,
                            excludeSizes: [6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22],
                            excludeShapes: [1,3,2,5,6,7,8]
                        }
                    ],
                    additionalOptions: [
                        {
                            title: "Reflective",
                            description: "",
                            icon: "https://signsdesigner.us/app/demos/aluminium-signs/ic_frosted.svg",
                            options: [
                                {
                                    title: "Standard",
                                    description: "",
                                    icon: aso_data.assets_url+'/images/demos/ic_none.svg',
                                    image: "",
                                    popImg:"",
                                    excludeColors: [
                                        2,
                                        13,
                                        14
                                    ],
                                    isDefault: true,
                                    additionalPrice: 0
                                },
                                {
                                    title: "Reflective",
                                    description: "",
                                    icon: "https://signsdesigner.us/app/demos/aluminium-signs/reflective.png",
                                    image: "https://signsdesigner.us/app/demos/aluminium-signs/reflective.png",
                                    popImg: "https://signsdesigner.us/app/demos/aluminium-signs/reflective.png",
                                    excludeColors: [
                                        2,
                                        13,
                                        14
                                    ],
                                    isDefault: false,
                                    additionalPrice: 0
                                }
                            ]
                        }
                    ]
                }
            }
        ]
    },
    "brass-sign":{
        materials: [
            {
                icon: "",
                name: "Brass",
                type: "advance",
                popImg: "",
                isDefault: true,
                description: "",
                data: [
                    {
                        name: "Doors Sign",
                        description: "",
                        icon: "https://signsdesigner.us/app/demos/brass_signs/door-signs/door-sign.svg",
                        options: [
                            {
                                isDefault: true,
                                name: "London",
                                description: "Chrome-plated brass",
                                icon: "https://signsdesigner.us/app/demos/brass_signs/door-signs/london1.png",
                                image: aso_data.assets_url+'/images/london1-prev.png',
                                color: {
                                    name: "London",
                                    codeHex: "",
                                    prevImg: aso_data.assets_url+'/images/london1-prev.png'
                                },
                                fixingMethods: [2],
                                shapeId: 0,
                                size: {
                                    width: 104,
                                    height: 60,
                                    basePrice: 0,
                                    startPriceAtChar: 1,
                                    maxTextChar: -1,
                                    minCharText:0,
                                    charPrice: 0
                                },
                                additionalPrice: 37.69
                            },
                            {
                                isDefault: false,
                                name: "London",
                                description: "Shiny brass",
                                icon: "https://signsdesigner.us/app/demos/brass_signs/door-signs/london2.png",
                                image: aso_data.assets_url+'/images/london2-prev.png',
                                color: {
                                    name: "London",
                                    codeHex: "",
                                    prevImg: aso_data.assets_url+'/images/london2-prev.png'
                                },
                                fixingMethods: [2],
                                shapeId: 0,
                                size: {
                                    width: 104,
                                    height: 60,
                                    basePrice: 0,
                                    startPriceAtChar: 1,
                                    maxTextChar: -1,
                                minCharText:0,
                                    charPrice: 0
                                },
                                additionalPrice: 37.69
                            },
                            {
                                isDefault: false,
                                name: "London",
                                description: "Brushed nickel-plated brass",
                                icon: "https://signsdesigner.us/app/demos/brass_signs/door-signs/london3.png",
                                image: aso_data.assets_url+'/images/london3-prev.png',
                                color: {
                                    name: "London",
                                    codeHex: "",
                                    prevImg: aso_data.assets_url+'/images/london3-prev.png'
                                },
                                fixingMethods: [
                                    2
                                ],
                                shapeId: 0,
                                size: {
                                    width: 104,
                                    height: 60,
                                    basePrice: 0,
                                    startPriceAtChar: 1,
                                    maxTextChar: -1,
                                    minCharText:0,
                                    charPrice: 0
                                },
                                additionalPrice: 37.69
                            },
                            {
                                isDefault: false,
                                name: "Oslo",
                                description: "Matte brass",
                                icon: "https://signsdesigner.us/app/demos/brass_signs/door-signs/oslo.png",
                                image: aso_data.assets_url+'/images/oslo-prev.png',
                                color: {
                                    name: "Oslo",
                                    codeHex: "",
                                    prevImg: aso_data.assets_url+'/images/oslo-prev.png'
                                },
                                fixingMethods: [
                                2
                                ],
                                shapeId: 0,
                                size: {
                                    width: 80,
                                    height: 43,
                                    basePrice: 0,
                                    startPriceAtChar: 1,
                                    maxTextChar: -1,
                                    minCharText:0,
                                    charPrice: 0
                                },
                                additionalPrice: 20.89
                            },
                            {
                                isDefault: false,
                                name: "Paris",
                                description: "Matte brass",
                                icon: "https://signsdesigner.us/app/demos/brass_signs/door-signs/paris1.png",
                                image: aso_data.assets_url+'/images/paris1-prev.png',
                                color: {
                                name: "Paris",
                                codeHex: "",
                                prevImg: aso_data.assets_url+'/images/paris1-prev.png'
                                },
                                fixingMethods: [
                                2
                                ],
                                shapeId: 0,
                                size: {
                                    width: 165,
                                    height: 78,
                                    basePrice: 0,
                                    startPriceAtChar: 1,
                                    maxTextChar: -1,
                                    minCharText:0,
                                    charPrice: 0
                                },
                                additionalPrice: 39.79
                            },
                            {
                                isDefault: false,
                                name: "Paris",
                                description: "Shiny brass",
                                icon: "https://signsdesigner.us/app/demos/brass_signs/door-signs/paris2.png",
                                image: aso_data.assets_url+'/images/paris2-prev.png',
                                color: {
                                    name: "Paris",
                                    codeHex: "",
                                    prevImg: aso_data.assets_url+'/images/paris2-prev.png'
                                },
                                fixingMethods: [
                                2
                                ],
                                shapeId: 0,
                                size: {
                                    width: 165,
                                    height: 78,
                                    basePrice: 0,
                                    startPriceAtChar: 1,
                                    maxTextChar: -1,
                                    minCharText:0,
                                    charPrice: 0
                                },
                                additionalPrice: 39.79
                            },
                            {
                                isDefault: false,
                                name: "Paris",
                                description: "Black/oxide brass",
                                icon: "https://signsdesigner.us/app/demos/brass_signs/door-signs/paris3.png",
                                image: aso_data.assets_url+'/images/paris3-prev.png',
                                color: {
                                name: "Paris",
                                codeHex: "",
                                prevImg: aso_data.assets_url+'/images/paris3-prev.png'
                                },
                                fixingMethods: [
                                2
                                ],
                                shapeId: 0,
                                size: {
                                width: 165,
                                height: 78,
                                basePrice: 0,
                                startPriceAtChar: 1,
                                maxTextChar: -1,
                                minCharText:0,
                                charPrice: 0
                                },
                                additionalPrice: 39.79
                            },
                            {
                                isDefault: false,
                                name: "Stockhlom",
                                description: "Shiny brass",
                                icon: "https://signsdesigner.us/app/demos/brass_signs/door-signs/stockholm1.png",
                                image: aso_data.assets_url+'/images/stockholm1-prev.png',
                                color: {
                                name: "Stockhlom",
                                codeHex: "",
                                prevImg: aso_data.assets_url+'/images/stockholm1-prev.png'
                                },
                                fixingMethods: [
                                2
                                ],
                                shapeId: 0,
                                size: {
                                width: 154,
                                height: 43,
                                basePrice: 0,
                                startPriceAtChar: 1,
                                maxTextChar: -1,
                                minCharText:0,
                                charPrice: 0
                                },
                                additionalPrice: 35.99
                            },
                            {
                                isDefault: false,
                                name: "Stockhlom",
                                description: "Brushed nickel-plated brass",
                                icon: "https://signsdesigner.us/app/demos/brass_signs/door-signs/stockholm2.png",
                                image: aso_data.assets_url+'/images/stockholm2-prev.png',
                                color: {
                                name: "Stockhlom",
                                codeHex: "",
                                prevImg: aso_data.assets_url+'/images/stockholm2-prev.png'
                                },
                                fixingMethods: [
                                2
                                ],
                                shapeId: 0,
                                size: {
                                width: 154,
                                height: 43,
                                basePrice: 0,
                                startPriceAtChar: 1,
                                maxTextChar: -1,
                                minCharText:0,
                                charPrice: 0
                                },
                                additionalPrice: 37.69
                            },
                            {
                                isDefault: false,
                                name: "Berlin",
                                description: "Shiny brass",
                                icon: "https://signsdesigner.us/app/demos/brass_signs/door-signs/berlin1-png",
                                image: aso_data.assets_url+'/images/berlin1-prev.png',
                                color: {
                                name: "Berlin",
                                codeHex: "",
                                prevImg: aso_data.assets_url+'/images/berlin1-prev.png'
                                },
                                fixingMethods: [
                                2
                                ],
                                shapeId: 1,
                                size: {
                                width: 170,
                                height: 70,
                                basePrice: 0,
                                startPriceAtChar: 1,
                                maxTextChar: -1,
                                minCharText:0,
                                charPrice: 0
                                },
                                additionalPrice: 43.99
                            },
                            {
                                isDefault: false,
                                name: "Berlin",
                                description: "Brushed nickel-plated brass",
                                icon: "https://signsdesigner.us/app/demos/brass_signs/door-signs/berlin2.png",
                                image: aso_data.assets_url+'/images/berlin2-prev.png',
                                color: {
                                name: "Berlin",
                                codeHex: "",
                                prevImg: aso_data.assets_url+'/images/berlin2-prev.png'
                                },
                                fixingMethods: [
                                2
                                ],
                                shapeId: 1,
                                size: {
                                width: 170,
                                height: 70,
                                basePrice: 0,
                                startPriceAtChar: 1,
                                maxTextChar: -1,
                                minCharText:0,
                                charPrice: 0
                                },
                                additionalPrice: 43.99
                            },
                            {
                                isDefault: false,
                                name: "Copenhagen",
                                description: "Shiny brass",
                                icon: "https://signsdesigner.us/app/demos/brass_signs/door-signs/copenhagen.png",
                                image: aso_data.assets_url+"/images/copenhagen-prev.png",
                                color: {
                                name: "Copenhagen",
                                codeHex: "",
                                prevImg: aso_data.assets_url+"/images/copenhagen-prev.png"
                                },
                                fixingMethods: [
                                2
                                ],
                                shapeId: 1,
                                size: {
                                    width: 260,
                                    height: 100,
                                    basePrice: 0,
                                    startPriceAtChar: 1,
                                    maxTextChar: -1,
                                    minCharText:0,
                                    charPrice: 0
                                },
                                additionalPrice: 129.59
                            },
                            {
                                isDefault: false,
                                name: "Athens",
                                description: "Shiny brass",
                                icon: "https://signsdesigner.us/app/demos/brass_signs/door-signs/athens.png",
                                image: aso_data.assets_url+"/images/athens-prev.png",
                                color: {
                                name: "Athens",
                                codeHex: "",
                                prevImg: aso_data.assets_url+"/images/athens-prev.png"
                                },
                                fixingMethods: [
                                2
                                ],
                                shapeId: 1,
                                size: {
                                width: 300,
                                height: 200,
                                basePrice: 0,
                                startPriceAtChar: 1,
                                maxTextChar: -1,
                                minCharText:0,
                                charPrice: 0
                                },
                                additionalPrice: 188.09
                            },
                            {
                                isDefault: false,
                                name: "Amsterdam",
                                description: "Shiny brass",
                                icon: "https://signsdesigner.us/app/demos/brass_signs/door-signs/amsterdam.png",
                                image: aso_data.assets_url+"/images/amsterdam-prev.png",
                                color: {
                                name: "Amsterdam",
                                codeHex: "",
                                prevImg: aso_data.assets_url+"/images/amsterdam-prev.png"
                                },
                                fixingMethods: [
                                2
                                ],
                                shapeId: 1,
                                size: {
                                    width: 400,
                                    height: 300,
                                    basePrice: 0,
                                    startPriceAtChar: 1,
                                    maxTextChar: -1,
                                    minCharText:0,
                                    charPrice: 0
                                },
                                additionalPrice: 224.89
                            },
                            {
                                isDefault: false,
                                name: "Tallinn",
                                description: "Shiny brass",
                                icon: "https://signsdesigner.us/app/demos/brass_signs/door-signs/tallinn.png",
                                image: aso_data.assets_url+"/images/tallinn-prev.png",
                                color: {
                                name: "Tallinn",
                                codeHex: "",
                                prevImg: aso_data.assets_url+"/images/tallinn-prev.png"
                                },
                                fixingMethods: [
                                2
                                ],
                                shapeId: 1,
                                size: {
                                width: 400,
                                height: 300,
                                basePrice: 0,
                                startPriceAtChar: 1,
                                maxTextChar: -1,
                                minCharText:0,
                                charPrice: 0
                                },
                                additionalPrice: 269.69
                            },
                            {
                                isDefault: false,
                                name: "Rome",
                                description: "Shiny brass",
                                icon: "https://signsdesigner.us/app/demos/brass_signs/door-signs/rome1.png",
                                image: aso_data.assets_url+"/images/rome1-prev.png",
                                color: {
                                name: "Rome",
                                codeHex: "",
                                prevImg: aso_data.assets_url+"/images/rome1-prev.png"
                                },
                                fixingMethods: [
                                2
                                ],
                                shapeId: 1,
                                size: {
                                width: 120,
                                height: 55,
                                basePrice: 0,
                                startPriceAtChar: 1,
                                maxTextChar: -1,
                                minCharText:0,
                                charPrice: 0
                                },
                                additionalPrice: 36.79
                            },
                            {
                                isDefault: false,
                                name: "Rome",
                                description: "Brushed nickel-plated brass",
                                icon: "https://signsdesigner.us/app/demos/brass_signs/door-signs/rome2.png",
                                image: aso_data.assets_url+"/images/rome2-prev.png",
                                color: {
                                name: "Rome",
                                codeHex: "",
                                prevImg: aso_data.assets_url+"/images/rome2-prev.png"
                                },
                                fixingMethods: [
                                2
                                ],
                                shapeId: 1,
                                size: {
                                width: 120,
                                height: 55,
                                basePrice: 0,
                                startPriceAtChar: 1,
                                maxTextChar: -1,
                                minCharText:0,
                                charPrice: 0
                                },
                                additionalPrice: 36.79
                            },
                            {
                                isDefault: false,
                                name: "Rome",
                                description: "Brushed brass",
                                icon: "https://signsdesigner.us/app/demos/brass_signs/door-signs/rome3-prev.png",
                                image: aso_data.assets_url+"/images/rome3-prev.png",
                                color: {
                                name: "Rome",
                                codeHex: "",
                                prevImg: aso_data.assets_url+"/images/rome3-prev.png"
                                },
                                fixingMethods: [
                                2
                                ],
                                shapeId: 1,
                                size: {
                                    width: 120,
                                    height: 55,
                                    basePrice: 0,
                                    startPriceAtChar: 1,
                                    maxTextChar: -1,
                                    minCharText:0,
                                    charPrice: 0
                                },
                                additionalPrice: 36.79
                            },
                            {
                                isDefault: false,
                                name: "Sydney",
                                description: "Brushed brass",
                                icon: "https://signsdesigner.us/app/demos/brass_signs/door-signs/sydney.png",
                                image: aso_data.assets_url+"/images/sydney-prev.png",
                                color: {
                                name: "Sydney",
                                codeHex: "",
                                prevImg: aso_data.assets_url+"/images/sydney-prev.png"
                                },
                                fixingMethods: [
                                2
                                ],
                                shapeId: 1,
                                size: {
                                width: 160,
                                height: 60,
                                basePrice: 0,
                                startPriceAtChar: 1,
                                maxTextChar: -1,
                                minCharText:0,
                                charPrice: 0
                                },
                                additionalPrice: 41.89
                            },
                            {
                                isDefault: false,
                                name: "Prague",
                                description: "Shiny brass",
                                icon: "https://signsdesigner.us/app/demos/brass_signs/door-signs/prague.png",
                                image: aso_data.assets_url+"/images/prague-prev.png",
                                color: {
                                name: "Prague",
                                codeHex: "",
                                prevImg: aso_data.assets_url+"/images/prague-prev.png"
                                },
                                fixingMethods: [
                                0,
                                1
                                ],
                                shapeId: 0,
                                size: {
                                width: 145,
                                height: 73,
                                basePrice: 0,
                                startPriceAtChar: 1,
                                maxTextChar: -1,
                                minCharText:0,
                                charPrice: 0
                                },
                                additionalPrice: 28.39
                            },
                            {
                                isDefault: false,
                                name: "Dublin",
                                description: "Shiny brass",
                                icon: "https://signsdesigner.us/app/demos/brass_signs/door-signs/dublin.png",
                                image: aso_data.assets_url+"/images/dublin-prev.png",
                                color: {
                                name: "Dublin",
                                codeHex: "",
                                prevImg: aso_data.assets_url+"/images/dublin-prev.png"
                                },
                                fixingMethods: [
                                0,
                                1
                                ],
                                shapeId: 0,
                                size: {
                                width: 145,
                                height: 73,
                                basePrice: 0,
                                startPriceAtChar: 1,
                                maxTextChar: -1,
                                minCharText:0,
                                charPrice: 0
                                },
                                additionalPrice: 28.38
                            },
                            {
                                isDefault: false,
                                name: "Lisbon",
                                description: "Shiny brass",
                                icon: "https://signsdesigner.us/app/demos/brass_signs/door-signs/lisbon1.png",
                                image: aso_data.assets_url+"/images/lisbon1-prev.png",
                                color: {
                                name: "Lisbon",
                                codeHex: "",
                                prevImg: aso_data.assets_url+"/images/lisbon1-prev.png"
                                },
                                fixingMethods: [
                                0,
                                1
                                ],
                                shapeId: 1,
                                size: {
                                width: 170,
                                height: 70,
                                basePrice: 0,
                                startPriceAtChar: 1,
                                maxTextChar: -1,
                                minCharText:0,
                                charPrice: 0
                                },
                                additionalPrice: 43.99
                            },
                            {
                                isDefault: false,
                                name: "Lisbon",
                                description: "Brushed nickel-plated brass",
                                icon: "https://signsdesigner.us/app/demos/brass_signs/door-signs/lisbon2.png",
                                image: aso_data.assets_url+"/images/lisbon2-prev.png",
                                color: {
                                name: "Lisbon",
                                codeHex: "",
                                prevImg: aso_data.assets_url+"/images/lisbon2-prev.png"
                                },
                                fixingMethods: [
                                0,
                                1
                                ],
                                shapeId: 1,
                                size: {
                                width: 170,
                                height: 73,
                                basePrice: 0,
                                startPriceAtChar: 1,
                                maxTextChar: -1,
                                minCharText:0,
                                charPrice: 0
                                },
                                additionalPrice: 43.99
                            }
                        ]
                    },
                    {
                        name: "Label tags",
                        description: "",
                        icon: "",
                        options: [
                            {
                                isDefault: true,
                                name: "Madrid",
                                description: "Brass",
                                icon: "https://signsdesigner.us/app/demos/brass_signs/label-tags/madrid1.png",
                                image: aso_data.assets_url+"/images/laiton-pattern.png",
                                color: {
                                    name: "Madrid",
                                    codeHex: "",
                                    prevImg: aso_data.assets_url+"/images/laiton-pattern.png"
                                },
                                fixingMethods: [
                                    0,
                                    1,
                                    2,
                                    3
                                ],
                                shapeId: 3,
                                size: {
                                width: 60,
                                height: 18,
                                basePrice: 0,
                                startPriceAtChar: 1,
                                maxTextChar: -1,
                                minCharText:0,
                                charPrice: 0
                                },
                                additionalPrice: 5.89
                            },
                            {
                                isDefault: false,
                                name: "Madrid",
                                description: "Brushed nickel-plated brass",
                                icon: "https://signsdesigner.us/app/demos/brass_signs/label-tags/madrid2.png",
                                image: aso_data.assets_url+"/images/nickel-pattern.png",
                                color: {
                                name: "Madrid",
                                codeHex: "",
                                prevImg: aso_data.assets_url+"/images/nickel-pattern.png"
                                },
                                fixingMethods: [
                                0,
                                1,
                                2,
                                3
                                ],
                                shapeId: 3,
                                size: {
                                width: 60,
                                height: 18,
                                basePrice: 0,
                                startPriceAtChar: 1,
                                maxTextChar: -1,
                                minCharText:0,
                                charPrice: 0
                                },
                                additionalPrice: 5.89
                            },
                            {
                                isDefault: false,
                                name: "Kiev",
                                description: "Brass",
                                icon: "https://signsdesigner.us/app/demos/brass_signs/label-tags/kiev1.png",
                                image: aso_data.assets_url+"/images/laiton-pattern.png",
                                color: {
                                name: "Kiev",
                                codeHex: "",
                                prevImg: aso_data.assets_url+"/images/laiton-pattern.png"
                                },
                                fixingMethods: [
                                0,
                                1,
                                2
                                ],
                                shapeId: 0,
                                size: {
                                width: 50,
                                height: 60,
                                basePrice: 0,
                                startPriceAtChar: 1,
                                maxTextChar: -1,
                                minCharText:0,
                                charPrice: 0
                                },
                                additionalPrice: 7.79
                            },
                            {
                                isDefault: false,
                                name: "Kiev",
                                description: "Brushed nickel-plated brass",
                                icon: "https://signsdesigner.us/app/demos/brass_signs/label-tags/kiev2.png",
                                image: aso_data.assets_url+"/images/nickel-pattern.png",
                                color: {
                                name: "Kiev",
                                codeHex: "",
                                prevImg: aso_data.assets_url+"/images/nickel-pattern.png"
                                },
                                fixingMethods: [
                                0,
                                1,
                                2
                                ],
                                shapeId: 0,
                                size: {
                                width: 50,
                                height: 50,
                                basePrice: 0,
                                startPriceAtChar: 1,
                                maxTextChar: -1,
                                minCharText:0,
                                charPrice: 0
                                },
                                additionalPrice: 7.79
                            },
                            {
                                isDefault: false,
                                name: "Budapest",
                                description: "Brass",
                                icon: "https://signsdesigner.us/app/demos/brass_signs/label-tags/budapest1.png",
                                image: aso_data.assets_url+"/images/laiton-pattern.png",
                                color: {
                                name: "Budapest",
                                codeHex: "",
                                prevImg: aso_data.assets_url+"/images/laiton-pattern.png"
                                },
                                fixingMethods: [
                                0,
                                1,
                                2
                                ],
                                shapeId: 3,
                                size: {
                                width: 60,
                                height: 30,
                                basePrice: 0,
                                startPriceAtChar: 1,
                                maxTextChar: -1,
                                minCharText:0,
                                charPrice: 0
                                },
                                additionalPrice: 7.79
                            },
                            {
                                isDefault: false,
                                name: "Budapest",
                                description: "Brushed nickel-plated brass",
                                icon: "https://signsdesigner.us/app/demos/brass_signs/label-tags/budapest2.png",
                                image: aso_data.assets_url+"/images/nickel-pattern.png",
                                color: {
                                name: "Budapest",
                                codeHex: "",
                                prevImg: aso_data.assets_url+"/images/nickel-pattern.png"
                                },
                                fixingMethods: [
                                0,
                                1,
                                2
                                ],
                                shapeId: 3,
                                size: {
                                width: 60,
                                height: 30,
                                basePrice: 0,
                                startPriceAtChar: 1,
                                maxTextChar: -1,
                                minCharText:0,
                                charPrice: 0
                                },
                                additionalPrice: 37.69
                            }
                        ]
                    }
                ]
            }
        ]
    },
    "plastic":{
        materials: [
            {
                icon: "https://signsdesigner.us/app/demos/plastic-signs/engraving.svg",
                name: "Engraving",
                type: "simple",
                popImg: "<div><h4>Engraving / Foam PVC / Solid PET (PVC free)</h4><img src='https://cdn.skyltmax.se/vite/assets/laser-6173c70e.png' alt='' class='mb-4'><h5>Engraving</h5><p class='paragraph-sm'>Text and motifs are engraved by laser onto a durable multi-layer plastic (acrylic). The engraving ensures that the colour of the bottom plastic layer is visible and forms the text. Engraved signs are available in thicknesses of 0.8 or 1.6 mm.</p><img src='https://cdn.skyltmax.se/vite/assets/print-15b7b58d.png' alt='' class='mb-4'><h5>Foam PVC</h5><p class='paragraph-sm'>Text and motifs are created using colour printing in a UV printer. The material is suitable for indoor use for trade fairs, name badges, information signs, etc. Our foam PVC plastic signs are 3 mm thick and have a minimum size of 70x30 mm and a maximum size of 1000x1000 mm. In other words, a slightly smaller maximum size than solid PET plastic signs.</p><img src='https://cdn.skyltmax.se/vite/assets/solid_plastic-47f03aac.jpg' alt='' class='mb-4'><h5>Solid PET (PVC free)</h5><p class='paragraph-sm'>Text and motifs are created using colour printing in a UV printer on recyclable material. The material is for both indoor and outdoor use. A strong, lightweight, durable and recyclable material. It is often used for house number signs, pram signs, hotel signs, etc. Our solid PET plastic signs are 2 mm thick and have a minimum size of 70x30 mm and a maximum size of 2000x1200 mm.</p></div>",
                description: "Text and image are engraved with laser on two layer laminate plastic",
                data: {
                    sizes: {
                        allSizes: [
                            {
                                isDefault: true,
                                label: "25x10",
                                width: 25,
                                height: 10,
                                startPriceAtChar: 1,
                                textNumber: 0,
                                maxTextChar: -1,
                                minCharText:0,
                                charPrice: 0,
                                basePrice: 0
                            },
                            {
                                isDefault: false,
                                label: "50x30",
                                width: 50,
                                height: 30,
                                startPriceAtChar: 1,
                                textNumber: 0,
                                maxTextChar: -1,
                                minCharText:0,
                                charPrice: 0,
                                basePrice: 0
                            },
                            {
                                isDefault: false,
                                label: "60x25",
                                width: 60,
                                height: 25,
                                startPriceAtChar: 1,
                                textNumber: 0,
                                maxTextChar: -1,
                                minCharText:0,
                                charPrice: 0,
                                basePrice: 0
                            },
                            {
                                isDefault: false,
                                label: "80x30",
                                width: 80,
                                height: 30,
                                startPriceAtChar: 1,
                                textNumber: 0,
                                maxTextChar: -1,
                                minCharText:0,
                                charPrice: 0,
                                basePrice: 0
                            },
                            {
                                isDefault: false,
                                label: "100x40",
                                width: 100,
                                height: 40,
                                startPriceAtChar: 1,
                                textNumber: 0,
                                maxTextChar: -1,
                                minCharText:0,
                                charPrice: 0,
                                basePrice: 0
                            },
                            {
                                isDefault: false,
                                label: "100x100",
                                width: 100,
                                height: 100,
                                startPriceAtChar: 1,
                                textNumber: 0,
                                maxTextChar: -1,
                                minCharText:0,
                                charPrice: 0,
                                basePrice: 0
                            },
                            {
                                isDefault: false,
                                label: "150x100",
                                width: 150,
                                height: 100,
                                startPriceAtChar: 1,
                                textNumber: 0,
                                maxTextChar: -1,
                                minCharText:0,
                                charPrice: 0,
                                basePrice: 0
                            },
                            {
                                isDefault: false,
                                label: "200x100",
                                width: 200,
                                height: 100,
                                startPriceAtChar: 1,
                                textNumber: 0,
                                maxTextChar: -1,
                                minCharText:0,
                                charPrice: 0,
                                basePrice: 0
                            },
                            {
                                isDefault: false,
                                label: "200x200",
                                width: 200,
                                height: 200,
                                startPriceAtChar: 1,
                                textNumber: 0,
                                maxTextChar: -1,
                                minCharText:0,
                                charPrice: 0,
                                basePrice: 0
                            },
                            {
                                isDefault: false,
                                label: "250x100",
                                width: 250,
                                height: 100,
                                startPriceAtChar: 1,
                                textNumber: 0,
                                maxTextChar: -1,
                                minCharText:0,
                                charPrice: 0,
                                basePrice: 0
                            },
                            {
                                isDefault: false,
                                label: "295x295",
                                width: 295,
                                height: 295,
                                startPriceAtChar: 1,
                                textNumber: 0,
                                maxTextChar: -1,
                                minCharText:0,
                                charPrice: 0,
                                basePrice: 0
                            }
                        ],
                        thickness: {
                            active: true,
                            values: [
                                1.8,
                                0.8
                            ]
                        },
                        customSize: {
                            active: true,
                            width: {
                                max: 295,
                                min: 25,
                                label: "Width"
                            },
                            height: {
                                max: 295,
                                min: 10,
                                label: "Height"
                            }
                        }
                    },
                    colors: {
                        customColors: {
                            active: false,
                            label: "Custom Colors",
                            prevImg: ""
                        },
                        allColors: [
                            {
                                isDefault: true,
                                name: "White",
                                textColor: {
                                    active: true,
                                    sameForBorder: true,
                                    name: "Red",
                                    codeHex: "#c4271d"
                                },
                                pattern: {
                                    active: false,
                                    codeHex: "#ffffff",
                                    url: ""
                                },
                                prevImg: "",
                                additionalPrice: 0
                            },
                            {
                                isDefault: false,
                                name: "White",
                                textColor: {
                                    active: true,
                                    sameForBorder: true,
                                    name: "Red",
                                    codeHex: "#c4271d"
                                },
                                pattern: {
                                    active: false,
                                    codeHex: "#ffffff",
                                    url: ""
                                },
                                prevImg: "",
                                additionalPrice: 0
                            },
                            {
                                isDefault: false,
                                name: "White",
                                textColor: {
                                    active: true,
                                    sameForBorder: true,
                                    name: "Blue",
                                    codeHex: "#497eaa"
                                },
                                pattern: {
                                    active: false,
                                    codeHex: "#ffffff",
                                    url: ""
                                },
                                prevImg: "",
                                additionalPrice: 0
                            },
                            {
                                isDefault: false,
                                name: "Black",
                                textColor: {
                                    active: true,
                                    sameForBorder: true,
                                    name: "White",
                                    codeHex: "#ffffff"
                                },
                                pattern: {
                                    active: false,
                                    codeHex: "#000000",
                                    url: ""
                                },
                                prevImg: "",
                                additionalPrice: 0
                            },
                            {
                                isDefault: false,
                                name: "Blue",
                                textColor: {
                                    active: true,
                                    sameForBorder: true,
                                    name: "White",
                                    codeHex: "#ffffff"
                                },
                                pattern: {
                                    active: false,
                                    codeHex: "#004f86",
                                    url: ""
                                },
                                prevImg: "",
                                additionalPrice: 0
                            },
                            {
                                isDefault: false,
                                name: "Red",
                                textColor: {
                                    active: true,
                                    sameForBorder: true,
                                    name: "White",
                                    codeHex: "#ffffff"
                                },
                                pattern: {
                                    active: false,
                                    codeHex: "#c4271d",
                                    url: ""
                                },
                                prevImg: "",
                                additionalPrice: 0
                            },
                            {
                                isDefault: false,
                                name: "Pink",
                                textColor: {
                                    active: true,
                                    sameForBorder: true,
                                    name: "White",
                                    codeHex: "#ffffff"
                                },
                                pattern: {
                                    active: false,
                                    codeHex: "#eb3f77",
                                    url: ""
                                },
                                prevImg: "",
                                additionalPrice: 0
                            },
                            {
                                isDefault: false,
                                name: "Green",
                                textColor: {
                                    active: true,
                                    sameForBorder: true,
                                    name: "White",
                                    codeHex: "#ffffff"
                                },
                                pattern: {
                                    active: false,
                                    codeHex: "#009251",
                                    url: ""
                                },
                                prevImg: "",
                                additionalPrice: 0
                            },
                            {
                                isDefault: false,
                                name: "Yellow",
                                textColor: {
                                    active: true,
                                    sameForBorder: true,
                                    name: "Black",
                                    codeHex: "#000000"
                                },
                                pattern: {
                                    active: false,
                                    codeHex: "#fee900",
                                    url: ""
                                },
                                prevImg: "",
                                additionalPrice: 0
                            },
                            {
                                isDefault: false,
                                name: "Gray",
                                textColor: {
                                    active: true,
                                    sameForBorder: true,
                                    name: "White",
                                    codeHex: "#ffffff"
                                },
                                pattern: {
                                    active: false,
                                    codeHex: "#4f575b",
                                    url: ""
                                },
                                prevImg: "",
                                additionalPrice: 0
                            },
                            {
                                isDefault: false,
                                name: "Orange",
                                textColor: {
                                    active: true,
                                    sameForBorder: true,
                                    name: "White",
                                    codeHex: "#ffffff"
                                },
                                pattern: {
                                    active: false,
                                    codeHex: "#e15616",
                                    url: ""
                                },
                                prevImg: "",
                                additionalPrice: 0
                            },
                            {
                                isDefault: false,
                                name: "Purple",
                                textColor: {
                                    active: true,
                                    sameForBorder: true,
                                    name: "White",
                                    codeHex: "#ffffff"
                                },
                                pattern: {
                                    active: false,
                                    codeHex: "#554585",
                                    url: ""
                                },
                                prevImg: "",
                                additionalPrice: 0
                            },
                            {
                                isDefault: false,
                                name: "Brown",
                                textColor: {
                                    active: true,
                                    sameForBorder: true,
                                    name: "White",
                                    codeHex: "#ffffff"
                                },
                                pattern: {
                                    active: false,
                                    codeHex: "#523d2a",
                                    url: ""
                                },
                                prevImg: "",
                                additionalPrice: 0
                            },
                            {
                                isDefault: false,
                                name: "Gold",
                                textColor: {
                                    active: true,
                                    sameForBorder: true,
                                    name: "White",
                                    codeHex: "#000000"
                                },
                                pattern: {
                                    active: false,
                                    codeHex: "#daa520",
                                    url: ""
                                },
                                prevImg: "",
                                additionalPrice: 0
                            },
                            {
                                isDefault: false,
                                name: "Silver",
                                textColor: {
                                    active: true,
                                    sameForBorder: true,
                                    name: "Black",
                                    codeHex: "#bbbbbb"
                                },
                                pattern: {
                                    active: false,
                                    codeHex: "#daa520",
                                    url: ""
                                },
                                prevImg: "",
                                additionalPrice: 0
                            },
                            {
                                isDefault: false,
                                name: "Rose Gold",
                                textColor: {
                                    active: true,
                                    sameForBorder: true,
                                    name: "Black",
                                    codeHex: "#000000"
                                },
                                pattern: {
                                    active: false,
                                    codeHex: "#c27268",
                                    url: ""
                                },
                                prevImg: "",
                                additionalPrice: 0
                            }
                        ]
                    },
                    shapes: [
                        {
                            isDefault:true,
                            shapeId: 3,
                            additionalPrice: 0
                        },
                        {
                            isDefault:false,
                            shapeId: 1,
                            additionalPrice: 0
                        },
                        {
                            isDefault:false,
                            shapeId: 0,
                            additionalPrice: 0
                        },
                        {
                            isDefault:false,
                            shapeId: 9,
                            additionalPrice: 0
                        },
                        {
                            isDefault:false,
                            shapeId: 7,
                            additionalPrice: 0
                        },
                        {
                            isDefault:false,
                            shapeId: 8,
                            additionalPrice: 0
                        },
                        {
                            isDefault:false,
                            shapeId: 4,
                            additionalPrice: 0
                        },
                        {
                            isDefault:false,
                            shapeId: 2,
                            additionalPrice: 0
                        },
                        {
                            isDefault:false,
                            shapeId: 5,
                            additionalPrice: 0
                        },
                        {
                            isDefault:false,
                            shapeId: 6,
                            additionalPrice: 0
                        }
                    ],
                    borders: {
                        settings: {
                            colors: [],
                            enableBorderWidth: false,
                            enableBorderColor: true,
                            borderColorsLabel:"Borders Colors",
                            customColorsPrevImg:''
                        },
                        allBorders: [
                            {
                                isDefault:true,
                                manageBorderId: 0,
                                additionalPrice: 0,
                                excludeSizes: [],
                                excludeShapes: []
                            },
                            {
                                isDefault:false,
                                manageBorderId: 1,
                                additionalPrice: 0,
                                excludeSizes: [],
                                excludeShapes: []
                            },
                            {
                                isDefault:false,
                                manageBorderId: 2,
                                additionalPrice: 0,
                                excludeSizes: [],
                                excludeShapes: [2,3,4,5,6,7,8]
                            }
                        ]
                    },
                    textImages: {
                        enableText: true,
                        enableImage: true
                    },
                    fixingMethods: [
                        {
                            isDefault:true,
                            fixingMethodId: 0,
                            additionalPrice: 0,
                            excludeSizes: [],
                            excludeShapes: []
                        },
                        {
                        isDefault:false,
                            fixingMethodId: 2,
                            additionalPrice: 0,
                            excludeSizes: [],
                            excludeShapes: []
                        },
                        {
                            isDefault:false,
                            fixingMethodId: 1,
                            additionalPrice: 1,
                            excludeSizes: [],
                            excludeShapes: []
                        },
                        {
                            isDefault:false,
                            fixingMethodId: 14,
                            additionalPrice: 4.5,
                            excludeSizes: [],
                            excludeShapes: []
                        },
                        {
                            isDefault:false,
                            fixingMethodId: 3,
                            additionalPrice: 4.5,
                            excludeSizes: [],
                            excludeShapes: []
                        },
                        {
                            isDefault:false,
                            fixingMethodId: 5,
                            additionalPrice: 1.5,
                            excludeSizes: [],
                            excludeShapes: []
                        },
                        {
                            isDefault:false,
                            fixingMethodId: 8,
                            additionalPrice: 1.5,
                            excludeSizes: [11],
                            excludeShapes: [2,3,4,5,6,7,8,9]
                        },
                        {
                            isDefault:false,
                            fixingMethodId: 6,
                            additionalPrice: 4.5,
                            excludeSizes: [0,1,2],
                            excludeShapes: [2,3,4,5,6,7,8,9]
                        },
                        {
                            isDefault:false,
                            fixingMethodId: 9,
                            additionalPrice: 19,
                            excludeSizes: [0,1,2,3,4,5,6],
                            excludeShapes: [2,3,4,5,6,7,8,9]
                        }
                    ],
                    additionalOptions: []
                }
            },
            {
                icon: "https://signsdesigner.us/app/demos/plastic-signs/form_pvc.svg",
                name: "Foam PVC",
                type: "simple",
                popImg: "<div><h4>Engraving / Foam PVC / Solid PET (PVC free)</h4><img src='https://cdn.skyltmax.se/vite/assets/laser-6173c70e.png' alt='' class='mb-4'><h5>Engraving</h5><p class='paragraph-sm'>Text and motifs are engraved by laser onto a durable multi-layer plastic (acrylic). The engraving ensures that the colour of the bottom plastic layer is visible and forms the text. Engraved signs are available in thicknesses of 0.8 or 1.6 mm.</p><img src='https://cdn.skyltmax.se/vite/assets/print-15b7b58d.png' alt='' class='mb-4'><h5>Foam PVC</h5><p class='paragraph-sm'>Text and motifs are created using colour printing in a UV printer. The material is suitable for indoor use for trade fairs, name badges, information signs, etc. Our foam PVC plastic signs are 3 mm thick and have a minimum size of 70x30 mm and a maximum size of 1000x1000 mm. In other words, a slightly smaller maximum size than solid PET plastic signs.</p><img src='https://cdn.skyltmax.se/vite/assets/solid_plastic-47f03aac.jpg' alt='' class='mb-4'><h5>Solid PET (PVC free)</h5><p class='paragraph-sm'>Text and motifs are created using colour printing in a UV printer on recyclable material. The material is for both indoor and outdoor use. A strong, lightweight, durable and recyclable material. It is often used for house number signs, pram signs, hotel signs, etc. Our solid PET plastic signs are 2 mm thick and have a minimum size of 70x30 mm and a maximum size of 2000x1200 mm.</p></div>",
                description: "Text and image are manufatured with a UV-printer",
                data: {
                    sizes: {
                        allSizes: [
                            {
                                isDefault: true,
                                label: "25x10",
                                width: 25,
                                height: 10,
                                startPriceAtChar: 1,
                                textNumber: 0,
                                maxTextChar: -1,
                                minCharText:0,
                                charPrice: 0,
                                basePrice: 0
                            },
                            {
                                isDefault: false,
                                label: "50x30",
                                width: 50,
                                height: 30,
                                startPriceAtChar: 1,
                                textNumber: 0,
                                maxTextChar: -1,
                                minCharText:0,
                                charPrice: 0,
                                basePrice: 0
                            },
                            {
                                isDefault: false,
                                label: "60x25",
                                width: 60,
                                height: 25,
                                startPriceAtChar: 1,
                                textNumber: 0,
                                maxTextChar: -1,
                                minCharText:0,
                                charPrice: 0,
                                basePrice: 0
                            },
                            {
                                isDefault: false,
                                label: "80x30",
                                width: 80,
                                height: 30,
                                startPriceAtChar: 1,
                                textNumber: 0,
                                maxTextChar: -1,
                                minCharText:0,
                                charPrice: 0,
                                basePrice: 0
                            },
                            {
                                isDefault: false,
                                label: "100x40",
                                width: 100,
                                height: 40,
                                startPriceAtChar: 1,
                                textNumber: 0,
                                maxTextChar: -1,
                                minCharText:0,
                                charPrice: 0,
                                basePrice: 0
                            },
                            {
                                isDefault: false,
                                label: "100x100",
                                width: 100,
                                height: 100,
                                startPriceAtChar: 1,
                                textNumber: 0,
                                maxTextChar: -1,
                                minCharText:0,
                                charPrice: 0,
                                basePrice: 0
                            },
                            {
                                isDefault: false,
                                label: "150x100",
                                width: 150,
                                height: 100,
                                startPriceAtChar: 1,
                                textNumber: 0,
                                maxTextChar: -1,
                                minCharText:0,
                                charPrice: 0,
                                basePrice: 0
                            },
                            {
                                isDefault: false,
                                label: "200x100",
                                width: 200,
                                height: 100,
                                startPriceAtChar: 1,
                                textNumber: 0,
                                maxTextChar: -1,
                                minCharText:0,
                                charPrice: 0,
                                basePrice: 0
                            },
                            {
                                isDefault: false,
                                label: "200x200",
                                width: 200,
                                height: 200,
                                startPriceAtChar: 1,
                                textNumber: 0,
                                maxTextChar: -1,
                                minCharText:0,
                                charPrice: 0,
                                basePrice: 0
                            },
                            {
                                isDefault: false,
                                label: "250x100",
                                width: 250,
                                height: 100,
                                startPriceAtChar: 1,
                                textNumber: 0,
                                maxTextChar: -1,
                                minCharText:0,
                                charPrice: 0,
                                basePrice: 0
                            },
                            {
                                isDefault: false,
                                label: "295x295",
                                width: 295,
                                height: 295,
                                startPriceAtChar: 1,
                                textNumber: 0,
                                maxTextChar: -1,
                                minCharText:0,
                                charPrice: 0,
                                basePrice: 0
                            }
                        ],
                        thickness: {
                            active: false,
                            values: [1.8,0.8 ]
                        },
                        customSize: {
                            active: true,
                            width: {
                                max: 295,
                                min: 25,
                                label: "Width"
                            },
                            height: {
                                max: 295,
                                min: 10,
                                label: "Height"
                            }
                        }
                    },
                    colors: {
                        customColors: {
                            active: false,
                            label: "Custom Colors",
                            prevImg: ""
                        },
                        allColors: [
                            {
                                isDefault: true,
                                name: "White",
                                textColor: {
                                active: false,
                                sameForBorder: false,
                                name: "Red",
                                codeHex: "#c4271d"
                                },
                                pattern: {
                                active: false,
                                codeHex: "#ffffff",
                                url: ""
                                },
                                prevImg: "",
                                additionalPrice: 0
                            },
                            {
                                isDefault: false,
                                name: "White",
                                textColor: {
                                active: false,
                                sameForBorder: false,
                                name: "Red",
                                codeHex: "#c4271d"
                                },
                                pattern: {
                                active: false,
                                codeHex: "#ffffff",
                                url: ""
                                },
                                prevImg: "",
                                additionalPrice: 0
                            },
                            {
                                isDefault: false,
                                name: "White",
                                textColor: {
                                active: false,
                                sameForBorder: false,
                                name: "Blue",
                                codeHex: "#497eaa"
                                },
                                pattern: {
                                active: false,
                                codeHex: "#ffffff",
                                url: ""
                                },
                                prevImg: "",
                                additionalPrice: 0
                            },
                            {
                                isDefault: false,
                                name: "Black",
                                textColor: {
                                active: false,
                                sameForBorder: false,
                                name: "White",
                                codeHex: "#ffffff"
                                },
                                pattern: {
                                active: false,
                                codeHex: "#000000",
                                url: ""
                                },
                                prevImg: "",
                                additionalPrice: 0
                            },
                            {
                                isDefault: false,
                                name: "Blue",
                                textColor: {
                                active: false,
                                sameForBorder: false,
                                name: "White",
                                codeHex: "#ffffff"
                                },
                                pattern: {
                                active: false,
                                codeHex: "#004f86",
                                url: ""
                                },
                                prevImg: "",
                                additionalPrice: 0
                            },
                            {
                                isDefault: false,
                                name: "Red",
                                textColor: {
                                active: false,
                                sameForBorder: false,
                                name: "White",
                                codeHex: "#ffffff"
                                },
                                pattern: {
                                active: false,
                                codeHex: "#c4271d",
                                url: ""
                                },
                                prevImg: "",
                                additionalPrice: 0
                            },
                            {
                                isDefault: false,
                                name: "Pink",
                                textColor: {
                                active: false,
                                sameForBorder: false,
                                name: "White",
                                codeHex: "#ffffff"
                                },
                                pattern: {
                                active: false,
                                codeHex: "#eb3f77",
                                url: ""
                                },
                                prevImg: "",
                                additionalPrice: 0
                            },
                            {
                                isDefault: false,
                                name: "Green",
                                textColor: {
                                active: false,
                                sameForBorder: false,
                                name: "White",
                                codeHex: "#ffffff"
                                },
                                pattern: {
                                active: false,
                                codeHex: "#009251",
                                url: ""
                                },
                                prevImg: "",
                                additionalPrice: 0
                            },
                            {
                                isDefault: false,
                                name: "Yellow",
                                textColor: {
                                active: false,
                                sameForBorder: false,
                                name: "Black",
                                codeHex: "#000000"
                                },
                                pattern: {
                                active: false,
                                codeHex: "#fee900",
                                url: ""
                                },
                                prevImg: "",
                                additionalPrice: 0
                            },
                            {
                                isDefault: false,
                                name: "Gray",
                                textColor: {
                                active: false,
                                sameForBorder: false,
                                name: "White",
                                codeHex: "#ffffff"
                                },
                                pattern: {
                                active: false,
                                codeHex: "#4f575b",
                                url: ""
                                },
                                prevImg: "",
                                additionalPrice: 0
                            },
                            {
                                isDefault: false,
                                name: "Orange",
                                textColor: {
                                active: false,
                                sameForBorder: false,
                                name: "White",
                                codeHex: "#ffffff"
                                },
                                pattern: {
                                active: false,
                                codeHex: "#e15616",
                                url: ""
                                },
                                prevImg: "",
                                additionalPrice: 0
                            },
                            {
                                isDefault: false,
                                name: "Purple",
                                textColor: {
                                active: false,
                                sameForBorder: false,
                                name: "White",
                                codeHex: "#ffffff"
                                },
                                pattern: {
                                active: false,
                                codeHex: "#554585",
                                url: ""
                                },
                                prevImg: "",
                                additionalPrice: 0
                            },
                            {
                                isDefault: false,
                                name: "Brown",
                                textColor: {
                                active: false,
                                sameForBorder: false,
                                name: "White",
                                codeHex: "#ffffff"
                                },
                                pattern: {
                                active: false,
                                codeHex: "#523d2a",
                                url: ""
                                },
                                prevImg: "",
                                additionalPrice: 0
                            },
                            {
                                isDefault: false,
                                name: "Gold",
                                textColor: {
                                active: false,
                                sameForBorder: false,
                                name: "White",
                                codeHex: "#000000"
                                },
                                pattern: {
                                active: false,
                                codeHex: "#daa520",
                                url: ""
                                },
                                prevImg: "",
                                additionalPrice: 0
                            },
                            {
                                isDefault: false,
                                name: "Silver",
                                textColor: {
                                active: false,
                                sameForBorder: false,
                                name: "Black",
                                codeHex: "#bbbbbb"
                                },
                                pattern: {
                                active: false,
                                codeHex: "#daa520",
                                url: ""
                                },
                                prevImg: "",
                                additionalPrice: 0
                            },
                            {
                                isDefault: false,
                                name: "Rose Gold",
                                textColor: {
                                active: false,
                                sameForBorder: false,
                                name: "Black",
                                codeHex: "#000000"
                                },
                                pattern: {
                                active: false,
                                codeHex: "#c27268",
                                url: ""
                                },
                                prevImg: "",
                                additionalPrice: 0
                            }
                        ]
                    },
                    shapes: [
                        {
                            isDefault:true,
                            shapeId: 3,
                            additionalPrice: 0
                        },
                        {
                            isDefault:false,
                            shapeId: 1,
                            additionalPrice: 0
                        },
                        {
                            isDefault:false,
                            shapeId: 0,
                            additionalPrice: 0
                        },
                        {
                            isDefault:false,
                            shapeId: 9,
                            additionalPrice: 0
                        },
                        {
                            isDefault:false,
                            shapeId: 7,
                            additionalPrice: 0
                        },
                        {
                            isDefault:false,
                            shapeId: 8,
                            additionalPrice: 0
                        },
                        {
                            isDefault:false,
                            shapeId: 4,
                            additionalPrice: 0
                        },
                        {
                            isDefault:false,
                            shapeId: 2,
                            additionalPrice: 0
                        },
                        {
                            isDefault:false,
                            shapeId: 5,
                            additionalPrice: 0
                        },
                        {
                            isDefault:false,
                            shapeId: 6,
                            additionalPrice: 0
                        }
                    ],
                    borders: {
                        settings: {
                            colors: [],
                            enableBorderWidth: false,
                            enableBorderColor: false,
                            borderColorsLabel:"Borders Colors",
                            customColorsPrevImg:''
                        },
                        allBorders: [
                            {
                                isDefault:true,
                                manageBorderId: 0,
                                additionalPrice: 0,
                                excludeSizes: [],
                                excludeShapes: []
                            },
                            {
                                isDefault:false,
                                manageBorderId: 1,
                                additionalPrice: 0,
                                excludeSizes: [],
                                excludeShapes: []
                            },
                            {
                                isDefault:false,
                                manageBorderId: 2,
                                additionalPrice: 0,
                                excludeSizes: [],
                                excludeShapes: [2,3,4,5,6,7,8]
                            }
                        ]
                    },
                    textImages: {
                        enableText: true,
                        enableImage: true
                    },
                    fixingMethods: [
                        {
                            isDefault:true,
                            fixingMethodId: 0,
                            additionalPrice: 0,
                            excludeSizes: [],
                            excludeShapes: []
                        },
                        {
                            isDefault:false,
                            fixingMethodId: 2,
                            additionalPrice: 0,
                            excludeSizes: [],
                            excludeShapes: []
                        },
                        {
                            isDefault:false,
                            fixingMethodId: 1,
                            additionalPrice: 1,
                            excludeSizes: [],
                            excludeShapes: []
                        },
                        {
                            isDefault:false,
                            fixingMethodId: 14,
                            additionalPrice: 4.5,
                            excludeSizes: [],
                            excludeShapes: []
                        },
                        {
                            isDefault:false,
                            fixingMethodId: 3,
                            additionalPrice: 4.5,
                            excludeSizes: [],
                            excludeShapes: []
                        },
                        {
                            isDefault:false,
                            fixingMethodId: 5,
                            additionalPrice: 1.5,
                            excludeSizes: [],
                            excludeShapes: []
                        },
                        {
                            isDefault:false,
                            fixingMethodId: 8,
                            additionalPrice: 1.5,
                            excludeSizes: [11],
                            excludeShapes: [2,3,4,5,6,7,8,9]
                        },
                        {
                            isDefault:false,
                            fixingMethodId: 6,
                            additionalPrice: 4.5,
                            excludeSizes: [0,1,2],
                            excludeShapes: [2,3,4,5,6,7,8,9]
                        },
                        {
                            isDefault:false,
                            fixingMethodId: 9,
                            additionalPrice: 19,
                            excludeSizes: [0,1,2,3,4,5,6],
                            excludeShapes: [2,3,4,5,6,7,8,9]
                        }
                    ],
                    additionalOptions: []
                }
            }
        ]
    },
    "rollup":{
        materials: [
            {
                icon: "https://signsdesigner.us/app/demos/roll-up-signs/standard.svg",
                name: "Standard",
                type: "simple",
                popImg:"",
                description: "PET polyester film free from PVC Opaque with grey back 100% curl-free 220 µ thick",
                data: {
                    sizes: {
                        allSizes: [
                            {
                                isDefault: true,
                                label: "850x2000",
                                width: 850,
                                height: 2000,
                                startPriceAtChar: 1,
                                textNumber: 0,
                                maxTextChar: -1,
                                minCharText:0,
                                charPrice: 0,
                                basePrice: 0
                            },
                            {
                                isDefault: false,
                                label: "1000x2000",
                                width: 1000,
                                height: 2000,
                                startPriceAtChar: 1,
                                textNumber: 0,
                                maxTextChar: -1,
                                minCharText:0,
                                charPrice: 0,
                                basePrice: 0
                            }
                        ],
                        thickness: {
                            active: false,
                            values:[]
                        },
                        customSize: {
                        active: false
                        }
                    },
                    colors: {
                        customColors: {
                            active: false,
                            label: "Custom Colors",
                            prevImg: ""
                        },
                        allColors: [
                            {
                                isDefault: true,
                                name: "White",
                                textColor: {
                                    active: false,
                                    sameForBorder:false,
                                    name:"",
                                    codeHex:'#000000',
                                },
                                pattern: {
                                active: false,
                                codeHex: "#ffffff",
                                url: ""
                                },
                                prevImg: "",
                                additionalPrice: 0
                            },
                            {
                                isDefault: false,
                                name: "Black",
                                textColor: {
                                    active: false,
                                    sameForBorder:false,
                                    name:"",
                                    codeHex:'#000000',
                                },
                                pattern: {
                                active: false,
                                codeHex: "#000000",
                                url: ""
                                },
                                prevImg: "",
                                additionalPrice: 0
                            },
                            {
                                isDefault: false,
                                name: "Blue",
                                textColor: {
                                    active: false,
                                    sameForBorder:false,
                                    name:"",
                                    codeHex:'#000000',
                                },
                                pattern: {
                                active: false,
                                codeHex: "#004f86",
                                url: ""
                                },
                                prevImg: "",
                                additionalPrice: 0
                            },
                            {
                                isDefault: false,
                                name: "Red",
                                textColor: {
                                    active: false,
                                    sameForBorder:false,
                                    name:"",
                                    codeHex:'#000000',
                                },
                                pattern: {
                                active: false,
                                codeHex: "#c4271d",
                                url: ""
                                },
                                prevImg: "",
                                additionalPrice: 0
                            },
                            {
                                isDefault: false,
                                name: "Green",
                                textColor: {
                                    active: false,
                                    sameForBorder:false,
                                    name:"",
                                    codeHex:'#000000',
                                },
                                pattern: {
                                active: false,
                                codeHex: "#009251",
                                url: ""
                                },
                                prevImg: "",
                                additionalPrice: 0
                            },
                            {
                                isDefault: false,
                                name: "Yellow",
                                textColor: {
                                    active: false,
                                    sameForBorder:false,
                                    name:"",
                                    codeHex:'#000000',
                                },
                                pattern: {
                                active: false,
                                codeHex: "#fee900",
                                url: ""
                                },
                                prevImg: "",
                                additionalPrice: 0
                            },
                            {
                                isDefault: false,
                                name: "Gray",
                                textColor: {
                                    active: false,
                                    sameForBorder:false,
                                    name:"",
                                    codeHex:'#000000',
                                },
                                pattern: {
                                active: false,
                                codeHex: "#4f5756",
                                url: ""
                                },
                                prevImg: "",
                                additionalPrice: 0
                            },
                            {
                                isDefault: false,
                                name: "Pink",
                                textColor: {
                                    active: false,
                                    sameForBorder:false,
                                    name:"",
                                    codeHex:'#000000',
                                },
                                pattern: {
                                active: false,
                                codeHex: "#bc4077",
                                url: ""
                                },
                                prevImg: "",
                                additionalPrice: 0
                            },
                            {
                                isDefault: false,
                                name: "Purple",
                                textColor: {
                                    active: false,
                                    sameForBorder:false,
                                    name:"",
                                    codeHex:'#000000',
                                },
                                pattern: {
                                active: false,
                                codeHex: "#554585",
                                url: ""
                                },
                                prevImg: "",
                                additionalPrice: 0
                            },
                            {
                                isDefault: false,
                                name: "Orange",
                                textColor: {
                                    active: false,
                                    sameForBorder:false,
                                    name:"",
                                    codeHex:'#000000',
                                },
                                pattern: {
                                active: false,
                                codeHex: "#e15616",
                                url: ""
                                },
                                prevImg: "",
                                additionalPrice: 0
                            },
                            {
                                isDefault: false,
                                name: "Brown",
                                textColor: {
                                    active: false,
                                    sameForBorder:false,
                                    name:"",
                                    codeHex:'#000000',
                                },
                                pattern: {
                                active: false,
                                codeHex: "#523d2a",
                                url: ""
                                },
                                prevImg: "",
                                additionalPrice: 0
                            }
                        ]
                    },
                    shapes: [
                        {
                            isDefault:true,
                            shapeId: 1,
                            additionalPrice: 0
                        }
                    ],
                    borders: {
                        settings: {
                            colors: [
                                {
                                    name: "White",
                                    codeHex: "#ffffff",
                                    prevImg: "",
                                    additionalPrice: 0
                                },
                                {
                                    name: "Black",
                                    codeHex: "#000000",
                                    prevImg: "",
                                    additionalPrice: 0
                                },
                                {
                                    name: "Blue",
                                    codeHex: "#004f86",
                                    prevImg: "",
                                    additionalPrice: 0
                                },
                                {
                                    name: "Red",
                                    codeHex: "#c4271d",
                                    prevImg: "",
                                    additionalPrice: 0
                                },
                                {
                                    name: "Green",
                                    codeHex: "#009251",
                                    prevImg: "",
                                    additionalPrice: 0
                                },
                                {
                                    name: "Yellow",
                                    codeHex: "#fee900",
                                    prevImg: "",
                                    additionalPrice: 0
                                },
                                {
                                    name: "Gray",
                                    codeHex: "#4f5756",
                                    prevImg: "",
                                    additionalPrice: 0
                                },
                                {
                                    name: "Pink",
                                    codeHex: "#bc4077",
                                    prevImg: "",
                                    additionalPrice: 0
                                },
                                {
                                    name: "Purple",
                                    codeHex: "#554585",
                                    prevImg: "",
                                    additionalPrice: 0
                                },
                                {
                                    name: "Orange",
                                    codeHex: "#e15616",
                                    prevImg: "",
                                    additionalPrice: 0
                                },
                                {
                                    name: "Brown",
                                    codeHex: "#523d2a",
                                    prevImg: "",
                                    additionalPrice: 0
                                }
                            ],
                            enableBorderWidth: false,
                            enableBorderColor: true,
                            borderColorsLabel:"Borders Colors",
                            customColorsPrevImg:''
                        },
                        allBorders: [
                            {
                                isDefault:true,
                                manageBorderId: 0,
                                additionalPrice: 0,
                                excludeSizes: [],
                                excludeShapes: []
                            },
                            {
                                isDefault:false,
                                manageBorderId: 1,
                                additionalPrice: 0,
                                excludeSizes: [],
                                excludeShapes: []
                            }
                        ]
                    },
                    textImages: {
                        enableText: true,
                        enableImage: true
                    },
                    fixingMethods: [
                        {
                            isDefault:true,
                            fixingMethodId: 0,
                            additionalPrice: 0,
                            excludeSizes: [],
                            excludeShapes: []
                        },
                        {
                            isDefault:false,
                            fixingMethodId: 19,
                            additionalPrice: 26.1,
                            excludeSizes: [],
                            excludeShapes: []
                        }
                    ],
                    additionalOptions: []
                }
            },
            {
                icon: "https://signsdesigner.us/app/demos/roll-up-signs/eco.svg",
                name: "ECO",
                type: "simple",
                popImg:"",
                description: "Polyester weave (free from PVC). Fire classification as per B-s1,dO 100% opaque 300 µ thick",
                data: {
                    sizes: {
                        allSizes: [
                            {
                                isDefault: true,
                                label: "850x2000",
                                width: 850,
                                height: 2000,
                                startPriceAtChar: 1,
                                textNumber: 0,
                                maxTextChar: -1,
                                minCharText:0,
                                charPrice: 0,
                                basePrice: 0
                            },
                            {
                                isDefault: false,
                                label: "1000x2000",
                                width: 1000,
                                height: 2000,
                                startPriceAtChar: 1,
                                textNumber: 0,
                                maxTextChar: -1,
                                minCharText:0,
                                charPrice: 0,
                                basePrice: 0
                            }
                        ],
                        thickness: {
                            active: false,
                            values:[]
                        },
                        customSize: {
                            active: false
                        }
                    },
                    colors: {
                        customColors: {
                            active: false,
                            label: "Custom Colors",
                            prevImg: ""
                        },
                        allColors: [
                            {
                                isDefault: true,
                                name: "White",
                                textColor: {
                                    active: false,
                                    sameForBorder:false,
                                    name:"",
                                    codeHex:'#000000',
                                },
                                pattern: {
                                active: false,
                                codeHex: "#ffffff",
                                url: ""
                                },
                                prevImg: "",
                                additionalPrice: 0
                            },
                            {
                                isDefault: false,
                                name: "Black",
                                textColor: {
                                    active: false,
                                    sameForBorder:false,
                                    name:"",
                                    codeHex:'#000000',
                                },
                                pattern: {
                                active: false,
                                codeHex: "#000000",
                                url: ""
                                },
                                prevImg: "",
                                additionalPrice: 0
                            },
                            {
                                isDefault: false,
                                name: "Blue",
                                textColor: {
                                    active: false,
                                    sameForBorder:false,
                                    name:"",
                                    codeHex:'#000000',
                                },
                                pattern: {
                                active: false,
                                codeHex: "#004f86",
                                url: ""
                                },
                                prevImg: "",
                                additionalPrice: 0
                            },
                            {
                                isDefault: false,
                                name: "Red",
                                textColor: {
                                    active: false,
                                    sameForBorder:false,
                                    name:"",
                                    codeHex:'#000000',
                                },
                                pattern: {
                                active: false,
                                codeHex: "#c4271d",
                                url: ""
                                },
                                prevImg: "",
                                additionalPrice: 0
                            },
                            {
                                isDefault: false,
                                name: "Green",
                                textColor: {
                                    active: false,
                                    sameForBorder:false,
                                    name:"",
                                    codeHex:'#000000',
                                },
                                pattern: {
                                active: false,
                                codeHex: "#009251",
                                url: ""
                                },
                                prevImg: "",
                                additionalPrice: 0
                            },
                            {
                                isDefault: false,
                                name: "Yellow",
                                textColor: {
                                    active: false,
                                    sameForBorder:false,
                                    name:"",
                                    codeHex:'#000000',
                                },
                                pattern: {
                                active: false,
                                codeHex: "#fee900",
                                url: ""
                                },
                                prevImg: "",
                                additionalPrice: 0
                            },
                            {
                                isDefault: false,
                                name: "Gray",
                                textColor: {
                                    active: false,
                                    sameForBorder:false,
                                    name:"",
                                    codeHex:'#000000',
                                },
                                pattern: {
                                active: false,
                                codeHex: "#4f5756",
                                url: ""
                                },
                                prevImg: "",
                                additionalPrice: 0
                            },
                            {
                                isDefault: false,
                                name: "Pink",
                                textColor: {
                                    active: false,
                                    sameForBorder:false,
                                    name:"",
                                    codeHex:'#000000',
                                },
                                pattern: {
                                active: false,
                                codeHex: "#bc4077",
                                url: ""
                                },
                                prevImg: "",
                                additionalPrice: 0
                            },
                            {
                                isDefault: false,
                                name: "Purple",
                                textColor: {
                                    active: false,
                                    sameForBorder:false,
                                    name:"",
                                    codeHex:'#000000',
                                },
                                pattern: {
                                active: false,
                                codeHex: "#554585",
                                url: ""
                                },
                                prevImg: "",
                                additionalPrice: 0
                            },
                            {
                                isDefault: false,
                                name: "Orange",
                                textColor: {
                                    active: false,
                                    sameForBorder:false,
                                    name:"",
                                    codeHex:'#000000',
                                },
                                pattern: {
                                active: false,
                                codeHex: "#e15616",
                                url: ""
                                },
                                prevImg: "",
                                additionalPrice: 0
                            },
                            {
                                isDefault: false,
                                name: "Brown",
                                textColor: {
                                    active: false,
                                    sameForBorder:false,
                                    name:"",
                                    codeHex:'#000000',
                                },
                                pattern: {
                                active: false,
                                codeHex: "#523d2a",
                                url: ""
                                },
                                prevImg: "",
                                additionalPrice: 0
                            }
                        ]
                    },
                    shapes: [
                        {
                            isDefault:true,
                            shapeId: 1,
                            additionalPrice: 0
                        }
                    ],
                    borders: {
                        settings: {
                            colors: [
                                {
                                name: "White",
                                codeHex: "#ffffff",
                                prevImg: "",
                                additionalPrice: 0
                                },
                                {
                                name: "Black",
                                codeHex: "#000000",
                                prevImg: "",
                                additionalPrice: 0
                                },
                                {
                                name: "Blue",
                                codeHex: "#004f86",
                                prevImg: "",
                                additionalPrice: 0
                                },
                                {
                                name: "Red",
                                codeHex: "#c4271d",
                                prevImg: "",
                                additionalPrice: 0
                                },
                                {
                                name: "Green",
                                codeHex: "#009251",
                                prevImg: "",
                                additionalPrice: 0
                                },
                                {
                                name: "Yellow",
                                codeHex: "#fee900",
                                prevImg: "",
                                additionalPrice: 0
                                },
                                {
                                name: "Gray",
                                codeHex: "#4f5756",
                                prevImg: "",
                                additionalPrice: 0
                                },
                                {
                                name: "Pink",
                                codeHex: "#bc4077",
                                prevImg: "",
                                additionalPrice: 0
                                },
                                {
                                name: "Purple",
                                codeHex: "#554585",
                                prevImg: "",
                                additionalPrice: 0
                                },
                                {
                                name: "Orange",
                                codeHex: "#e15616",
                                prevImg: "",
                                additionalPrice: 0
                                },
                                {
                                name: "Brown",
                                codeHex: "#523d2a",
                                prevImg: "",
                                additionalPrice: 0
                                }
                            ],
                            enableBorderWidth: false,
                            enableBorderColor: true,
                            borderColorsLabel:"Borders Colors",
                            customColorsPrevImg:''
                        },
                        allBorders: [
                            {
                                isDefault:true,
                                manageBorderId: 0,
                                additionalPrice: 0,
                                excludeSizes: [],
                                excludeShapes: []
                            },
                            {
                                isDefault:false,
                                manageBorderId: 1,
                                additionalPrice: 0,
                                excludeSizes: [],
                                excludeShapes: []
                            }
                        ]
                    },
                    textImages: {
                        enableText: true,
                        enableImage: true
                    },
                    fixingMethods: [
                        {
                            isDefault:true,
                            fixingMethodId: 0,
                            additionalPrice: 0,
                            excludeSizes: [],
                            excludeShapes: []
                        },
                        {
                            isDefault:false,
                            fixingMethodId: 19,
                            additionalPrice: 26.1,
                            excludeSizes: [],
                            excludeShapes: []
                        }
                    ],
                    additionalOptions: []
                }
            }
        ]
    },
    "stainlessStell":{
        materials: [
            {
                icon: "",
                name: "Stainless steel",
                type: "advance",
                popImg: "",
                description: "",
                isDefault: true,
                data: [
                    {
                        isDefault:true,
                        name: "Label tags",
                        description: "",
                        icon: "https://signsdesigner.us/app/demos/stainless-steel-signs/label-tags.svg",
                        options: [
                            {
                                isDefault: true,
                                name: "Stainless steel",
                                description: "Stainless steel",
                                icon: "https://signsdesigner.us/app/demos/stainless-steel-signs/stainless_steel1.png",
                                image: aso_data.assets_url+'/images/stainless_steel1-prev.png',
                                color: {
                                    name: "Stainless steel",
                                    codeHex: "",
                                    prevImg: aso_data.assets_url+'/images/stainless_steel1-prev.png'
                                },
                                fixingMethods: [
                                5,
                                2,
                                15,
                                18
                                ],
                                shapeId: 10,
                                size: {
                                width: 28,
                                height: 49,
                                basePrice: 0,
                                startPriceAtChar: 1,
                                maxTextChar: -1,
                                minCharText:0,
                                charPrice: 0
                                },
                                additionalPrice: 6.49
                            },
                            {
                                isDefault: false,
                                name: "Stainless steel",
                                description: "Stainless steel",
                                icon: "https://signsdesigner.us/app/demos/stainless-steel-signs/stainless_steel2.png",
                                image: aso_data.assets_url+'/images/stainless_steel2-prev.png',
                                color: {
                                name: "Stainless steel",
                                codeHex: "",
                                prevImg: aso_data.assets_url+'/images/stainless_steel2-prev.png'
                                },
                                fixingMethods: [
                                5,
                                2,
                                15,
                                18
                                ],
                                shapeId: 0,
                                size: {
                                width: 30,
                                height: 30,
                                basePrice: 0,
                                startPriceAtChar: 1,
                                maxTextChar: -1,
                                minCharText:0,
                                charPrice: 0
                                },
                                additionalPrice: 5.99
                            },
                            {
                                isDefault: false,
                                name: "Stainless steel",
                                description: "Stainless steel",
                                icon: "https://signsdesigner.us/app/demos/stainless-steel-signs/stainless_steel3.png",
                                image: aso_data.assets_url+'/images/stainless_steel3-prev.png',
                                color: {
                                name: "Stainless steel",
                                codeHex: "",
                                prevImg: aso_data.assets_url+'/images/stainless_steel3-prev.png'
                                },
                                fixingMethods: [
                                0,
                                2,
                                1
                                ],
                                shapeId: 3,
                                size: {
                                width: 60,
                                height: 18,
                                basePrice: 0,
                                startPriceAtChar: 1,
                                maxTextChar: -1,
                                minCharText:0,
                                charPrice: 0
                                },
                                additionalPrice: 8.29
                            },
                            {
                                isDefault: false,
                                name: "Stainless steel",
                                description: "Stainless steel",
                                icon: "https://signsdesigner.us/app/demos/stainless-steel-signs/stainless_steel4.png",
                                image: aso_data.assets_url+'/images/stainless_steel4-prev.png',
                                color: {
                                name: "Stainless steel",
                                codeHex: "",
                                prevImg: aso_data.assets_url+'/images/stainless_steel4-prev.png'
                                },
                                fixingMethods: [
                                0,
                                2,
                                1
                                ],
                                shapeId: 3,
                                size: {
                                width: 60,
                                height: 30,
                                basePrice: 0,
                                startPriceAtChar: 1,
                                maxTextChar: -1,
                                minCharText:0,
                                charPrice: 0
                                },
                                additionalPrice: 8.29
                            },
                            {
                                isDefault: false,
                                name: "Stainless steel",
                                description: "Stainless steel",
                                icon: "https://signsdesigner.us/app/demos/stainless-steel-signs/stainless_steel5.png",
                                image: aso_data.assets_url+'/images/stainless_steel5-prev.png',
                                color: {
                                name: "Stainless steel",
                                codeHex: "",
                                prevImg: aso_data.assets_url+'/images/stainless_steel5-prev.png'
                                },
                                fixingMethods: [
                                0,
                                2,
                                1
                                ],
                                shapeId: 0,
                                size: {
                                width: 50,
                                height: 50,
                                basePrice: 0,
                                startPriceAtChar: 1,
                                maxTextChar: -1,
                                minCharText:0,
                                charPrice: 0
                                },
                                additionalPrice: 9.49
                            },
                            {
                                isDefault: false,
                                name: "Stainless steel",
                                description: "Stainless steel",
                                icon: "https://signsdesigner.us/app/demos/stainless-steel-signs/stainless_steel6.png",
                                image: aso_data.assets_url+'/images/stainless_steel6-prev.png',
                                color: {
                                name: "Stainless steel",
                                codeHex: "",
                                prevImg: aso_data.assets_url+'/images/stainless_steel6-prev.png'
                                },
                                fixingMethods: [
                                0,
                                2,
                                1
                                ],
                                shapeId: 3,
                                size: {
                                width: 80,
                                height: 25,
                                basePrice: 0,
                                startPriceAtChar: 1,
                                maxTextChar: -1,
                                minCharText:0,
                                charPrice: 0
                                },
                                additionalPrice: 10.69
                            },
                            {
                                isDefault: false,
                                name: "Stainless steel",
                                description: "Stainless steel",
                                icon: "https://signsdesigner.us/app/demos/stainless-steel-signs/stainless_steel7.png",
                                image: aso_data.assets_url+'/images/stainless_steel7-prev.png',
                                color: {
                                name: "Stainless steel",
                                codeHex: "",
                                prevImg: aso_data.assets_url+'/images/stainless_steel7-prev.png'
                                },
                                fixingMethods: [
                                0,
                                2,
                                1
                                ],
                                shapeId: 3,
                                size: {
                                width: 100,
                                height: 40,
                                basePrice: 0,
                                startPriceAtChar: 1,
                                maxTextChar: -1,
                                minCharText:0,
                                charPrice: 0
                                },
                                additionalPrice: 14.29
                            },
                            {
                                isDefault: false,
                                name: "Stainless steel",
                                description: "Stainless steel",
                                icon: "https://signsdesigner.us/app/demos/stainless-steel-signs/stainless_steel8.png",
                                image: aso_data.assets_url+'/images/stainless_steel8-prev.png',
                                color: {
                                name: "Stainless steel",
                                codeHex: "",
                                prevImg: aso_data.assets_url+'/images/stainless_steel8-prev.png'
                                },
                                fixingMethods: [
                                0,
                                2,
                                1
                                ],
                                shapeId: 3,
                                size: {
                                width: 150,
                                height: 50,
                                basePrice: 0,
                                startPriceAtChar: 1,
                                maxTextChar: -1,
                                minCharText:0,
                                charPrice: 0
                                },
                                additionalPrice: 17.89
                            },
                            {
                                isDefault: false,
                                name: "Stainless steel",
                                description: "Stainless steel",
                                icon: "https://signsdesigner.us/app/demos/stainless-steel-signs/stainless_steel9.png",
                                image: aso_data.assets_url+'/images/stainless_steel9-prev.png',
                                color: {
                                name: "Stainless steel",
                                codeHex: "",
                                prevImg: aso_data.assets_url+'/images/stainless_steel9-prev.png'
                                },
                                fixingMethods: [
                                0,
                                2,
                                1
                                ],
                                shapeId: 3,
                                size: {
                                width: 170,
                                height: 70,
                                basePrice: 0,
                                startPriceAtChar: 1,
                                maxTextChar: -1,
                                minCharText:0,
                                charPrice: 0
                                },
                                additionalPrice: 23.39
                            }
                        ]
                    }
                ]
            }
        ]
    },
    "woods-sign":{
        materials: [
			{
				icon: "https://signsdesigner.us/app/demos/wood-signs/wood_birch.png",
				name: "Birch",
				type: "simple",
				popImg: "",
				description: "",
				data: {
					sizes: {
						allSizes: [
							{
								isDefault: true,
								label: "30x30",
								width: 30,
								height: 30,
								startPriceAtChar: 1,
								textNumber: 0,
								maxTextChar: -1,
                                minCharText:0,
								charPrice: 0,
								basePrice: 0
							},
							{
								isDefault: false,
								label: "50x50",
								width: 50,
								height: 50,
								startPriceAtChar: 1,
								textNumber: 0,
								maxTextChar: -1,
                                minCharText:0,
								charPrice: 0,
								basePrice: 0
							},
							{
								isDefault: false,
								label: "70x50",
								width: 70,
								height: 50,
								startPriceAtChar: 1,
								textNumber: 0,
								maxTextChar: -1,
                                minCharText:0,
								charPrice: 0,
								basePrice: 0
							},
							{
								isDefault: false,
								label: "100x50",
								width: 100,
								height: 50,
								startPriceAtChar: 1,
								textNumber: 0,
								maxTextChar: -1,
                                minCharText:0,
								charPrice: 0,
								basePrice: 0
							},
							{
								isDefault: false,
								label: "100x100",
								width: 100,
								height: 100,
								startPriceAtChar: 1,
								textNumber: 0,
								maxTextChar: -1,
                                minCharText:0,
								charPrice: 0,
								basePrice: 0
							},
							{
								isDefault: false,
								label: "200x100",
								width: 200,
								height: 100,
								startPriceAtChar: 1,
								textNumber: 0,
								maxTextChar: -1,
                                minCharText:0,
								charPrice: 0,
								basePrice: 0
							},
							{
								isDefault: false,
								label: "200x200",
								width: 200,
								height: 200,
								startPriceAtChar: 1,
								textNumber: 0,
								maxTextChar: -1,
                                minCharText:0,
								charPrice: 0,
								basePrice: 0
							},
							{
								isDefault: false,
								label: "300x100",
								width: 300,
								height: 100,
								startPriceAtChar: 1,
								textNumber: 0,
								maxTextChar: -1,
                                minCharText:0,
								charPrice: 0,
								basePrice: 0
							},
							{
								isDefault: false,
								label: "300x200",
								width: 300,
								height: 200,
								startPriceAtChar: 1,
								textNumber: 0,
								maxTextChar: -1,
                                minCharText:0,
								charPrice: 0,
								basePrice: 0
							},
							{
								isDefault: false,
								label: "500x300",
								width: 500,
								height: 300,
								startPriceAtChar: 1,
								textNumber: 0,
								maxTextChar: -1,
                                minCharText:0,
								charPrice: 0,
								basePrice: 0
							},
							{
								isDefault: false,
								label: "500x500",
								width: 500,
								height: 500,
								startPriceAtChar: 1,
								textNumber: 0,
								maxTextChar: -1,
                                minCharText:0,
								charPrice: 0,
								basePrice: 0
							},
							{
								isDefault: false,
								label: "600x200",
								width: 600,
								height: 200,
								startPriceAtChar: 1,
								textNumber: 0,
								maxTextChar: -1,
                                minCharText:0,
								charPrice: 0,
								basePrice: 0
							},
							{
								isDefault: false,
								label: "600x600",
								width: 600,
								height: 600,
								startPriceAtChar: 1,
								textNumber: 0,
								maxTextChar: -1,
                                minCharText:0,
								charPrice: 0,
								basePrice: 0
							},
							{
								isDefault: false,
								label: "800x500",
								width: 800,
								height: 500,
								startPriceAtChar: 1,
								textNumber: 0,
								maxTextChar: -1,
                                minCharText:0,
								charPrice: 0,
								basePrice: 0
							},
							{
								isDefault: false,
								label: "800x800",
								width: 800,
								height: 800,
								startPriceAtChar: 1,
								textNumber: 0,
								maxTextChar: -1,
                                minCharText:0,
								charPrice: 0,
								basePrice: 0
							},
							{
								isDefault: false,
								label: "1000x500",
								width: 1000,
								height: 500,
								startPriceAtChar: 1,
								textNumber: 0,
								maxTextChar: -1,
                                minCharText:0,
								charPrice: 0,
								basePrice: 0
							},
							{
								isDefault: false,
								label: "1000x800",
								width: 1000,
								height: 800,
								startPriceAtChar: 1,
								textNumber: 0,
								maxTextChar: -1,
                                minCharText:0,
								charPrice: 0,
								basePrice: 0
							},
							{
								isDefault: false,
								label: "1100x800",
								width: 1100,
								height: 800,
								startPriceAtChar: 1,
								textNumber: 0,
								maxTextChar: -1,
                                minCharText:0,
								charPrice: 0,
								basePrice: 0
							},
							{
								isDefault: false,
								label: "1100x1100",
								width: 1100,
								height: 1100,
								startPriceAtChar: 1,
								textNumber: 0,
								maxTextChar: -1,
                                minCharText:0,
								charPrice: 0,
								basePrice: 0
							}
						],
						thickness: {
							active: false,
                            values:[]
						},
						customSize: {
							active: true,
							width: {
								max: 1100,
								min: 30,
								label: "Width"
							},
							height: {
								max: 1100,
								min: 30,
								label: "Height"
							}
						}
					},
					colors: {
						customColors: {
							active: false,
							label: "Custom Colors",
							prevImg: ""
						},
						allColors: [
							{
								isDefault: true,
								name: "Wood",
								textColor: {
									active: false,
                                    sameForBorder:false,
                                    name:"",
                                    codeHex:'#000000',
								},
								pattern: {
									active: true,
									codeHex: "#FF8C00",
									url: aso_data.assets_url+'/images/im_wood-birch.png'
								},
								prevImg: "https://signsdesigner.us/app/demos/wood-signs/wood-birch.png",
								additionalPrice: 9.19
							}
						]
					},
					shapes: [
						{
							isDefault: true,
							shapeId: 3,
							additionalPrice: 0
						},
						{
							isDefault: false,
							shapeId: 1,
							additionalPrice: 0
						},
						{
							isDefault: false,
							shapeId: 0,
							additionalPrice: 0
						},
						{
							isDefault: false,
							shapeId: 7,
							additionalPrice: 0
						},
						{
							isDefault: false,
							shapeId: 8,
							additionalPrice: 0
						},
						{
							isDefault: false,
							shapeId: 9,
							additionalPrice: 0
						},
						{
							isDefault: false,
							shapeId: 4,
							additionalPrice: 0
						},
						{
							isDefault: false,
							shapeId: 2,
							additionalPrice: 0
						},
						{
							isDefault: false,
							shapeId: 5,
							additionalPrice: 0
						},
						{
							isDefault: false,
							shapeId: 6,
							additionalPrice: 0
						}
					],
					borders: {
						settings: {
							colors: [
								{
									name: "Birch",
									codeHex: "#a88f71",
									prevImg: "",
									additionalPrice: 0
								},
								{
									name: "White",
									codeHex: "#ffffff",
									prevImg: "",
									additionalPrice: 0
								},
								{
									name: "Black",
									codeHex: "#000000",
									prevImg: "",
									additionalPrice: 0
								},
								{
									name: "Blue",
									codeHex: "#004f86",
									prevImg: "",
									additionalPrice: 0
								},
								{
									name: "Red",
									codeHex: "#c4271d",
									prevImg: "",
									additionalPrice: 0
								},
								{
									name: "Green",
									codeHex: "#009251",
									prevImg: "",
									additionalPrice: 0
								},
								{
									name: "Yellow",
									codeHex: "#fee900",
									prevImg: "",
									additionalPrice: 0
								},
								{
									name: "Gray",
									codeHex: "#4f5756",
									prevImg: "",
									additionalPrice: 0
								},
								{
									name: "Pink",
									codeHex: "#bc4077",
									prevImg: "",
									additionalPrice: 0
								},
								{
									name: "Purple",
									codeHex: "#554585",
									prevImg: "",
									additionalPrice: 0
								},
								{
									name: "Orange",
									codeHex: "#e15616",
									prevImg: "",
									additionalPrice: 0
								},
								{
									name: "Brown",
									codeHex: "#523d2a",
									prevImg: "",
									additionalPrice: 0
								}
							],
							enableBorderWidth: false,
							enableBorderColor: true,
                            borderColorsLabel:"Borders Colors",
                            customColorsPrevImg:''
						},
						allBorders: [
							{
								isDefault: true,
								manageBorderId: 0,
								additionalPrice: 0,
								excludeSizes: [],
								excludeShapes: []
							},
							{
								isDefault: false,
								manageBorderId: 1,
								additionalPrice: 0,
								excludeSizes: [],
								excludeShapes: []
							},
							{
								isDefault: false,
								manageBorderId: 3,
								additionalPrice: 0,
								excludeSizes: [],
								excludeShapes: []
							}
						]
					},
					textImages: {
						enableText: true,
						enableImage: true
					},
					fixingMethods: [
						{
							isDefault: true,
							fixingMethodId: 0,
							additionalPrice: 0,
							excludeSizes: [],
							excludeShapes: []
						},
						{
							isDefault: false,
							fixingMethodId: 2,
							additionalPrice: 0.1,
							excludeSizes: [],
							excludeShapes: []
						},
						{
							isDefault: false,
							fixingMethodId: 3,
							additionalPrice: 4.7,
							excludeSizes: [
								1
							],
							excludeShapes: []
						},
						{
							isDefault: false,
							fixingMethodId: 1,
							additionalPrice: 0.6,
							excludeSizes: [
								1,
								14,
								15,
								16,
								17,
								18,
								19
							],
							excludeShapes: []
						},
						{
							isDefault: false,
							fixingMethodId: 6,
							additionalPrice: 4.8,
							excludeSizes: [
								1,
								12,
								13,
								14,
								15,
								16,
								17,
								18,
								19
							],
							excludeShapes: [
								0,
								9,
								4,
								2
							]
						},
						{
							isDefault: false,
							fixingMethodId: 5,
							additionalPrice: 0.7,
							excludeSizes: [],
							excludeShapes: [
								7,
								8,
								5,
								6
							]
						},
						{
							isDefault: false,
							fixingMethodId: 4,
							additionalPrice: 12.8,
							excludeSizes: [
								1,
								2
							],
							excludeShapes: []
						},
						{
							isDefault: false,
							fixingMethodId: 9,
							additionalPrice: 14.5,
							excludeSizes: [
								1,
								2,
								3,
								4,
								5,
								16,
								17,
								18,
								19
							],
							excludeShapes: [
								0,
								7,
								8,
								9,
								4,
								2
							]
						}
					],
					additionalOptions: []
				}
			},
			{
				icon: "https://signsdesigner.us/app/demos/wood-signs/wood_oak.png",
				name: "Oak",
				type: "simple",
				popImg: "",
				description: "",
				data: {
					sizes: {
						allSizes: [
							{
								isDefault: true,
								label: "30x30",
								width: 30,
								height: 30,
								startPriceAtChar: 1,
								textNumber: 0,
								maxTextChar: -1,
                                minCharText:0,
								charPrice: 0,
								basePrice: 0
							},
							{
								isDefault: false,
								label: "50x50",
								width: 50,
								height: 50,
								startPriceAtChar: 1,
								textNumber: 0,
								maxTextChar: -1,
                                minCharText:0,
								charPrice: 0,
								basePrice: 0
							},
							{
								isDefault: false,
								label: "70x50",
								width: 70,
								height: 50,
								startPriceAtChar: 1,
								textNumber: 0,
								maxTextChar: -1,
                                minCharText:0,
								charPrice: 0,
								basePrice: 0
							},
							{
								isDefault: false,
								label: "100x50",
								width: 100,
								height: 50,
								startPriceAtChar: 1,
								textNumber: 0,
								maxTextChar: -1,
                                minCharText:0,
								charPrice: 0,
								basePrice: 0
							},
							{
								isDefault: false,
								label: "100x100",
								width: 100,
								height: 100,
								startPriceAtChar: 1,
								textNumber: 0,
								maxTextChar: -1,
                                minCharText:0,
								charPrice: 0,
								basePrice: 0
							},
							{
								isDefault: false,
								label: "200x100",
								width: 200,
								height: 100,
								startPriceAtChar: 1,
								textNumber: 0,
								maxTextChar: -1,
                                minCharText:0,
								charPrice: 0,
								basePrice: 0
							},
							{
								isDefault: false,
								label: "200x200",
								width: 200,
								height: 200,
								startPriceAtChar: 1,
								textNumber: 0,
								maxTextChar: -1,
                                minCharText:0,
								charPrice: 0,
								basePrice: 0
							},
							{
								isDefault: false,
								label: "300x100",
								width: 300,
								height: 100,
								startPriceAtChar: 1,
								textNumber: 0,
								maxTextChar: -1,
                                minCharText:0,
								charPrice: 0,
								basePrice: 0
							},
							{
								isDefault: false,
								label: "300x200",
								width: 300,
								height: 200,
								startPriceAtChar: 1,
								textNumber: 0,
								maxTextChar: -1,
                                minCharText:0,
								charPrice: 0,
								basePrice: 0
							},
							{
								isDefault: false,
								label: "500x300",
								width: 500,
								height: 300,
								startPriceAtChar: 1,
								textNumber: 0,
								maxTextChar: -1,
                                minCharText:0,
								charPrice: 0,
								basePrice: 0
							},
							{
								isDefault: false,
								label: "500x500",
								width: 500,
								height: 500,
								startPriceAtChar: 1,
								textNumber: 0,
								maxTextChar: -1,
                                minCharText:0,
								charPrice: 0,
								basePrice: 0
							},
							{
								isDefault: false,
								label: "600x200",
								width: 600,
								height: 200,
								startPriceAtChar: 1,
								textNumber: 0,
								maxTextChar: -1,
                                minCharText:0,
								charPrice: 0,
								basePrice: 0
							},
							{
								isDefault: false,
								label: "600x600",
								width: 600,
								height: 600,
								startPriceAtChar: 1,
								textNumber: 0,
								maxTextChar: -1,
                                minCharText:0,
								charPrice: 0,
								basePrice: 0
							},
							{
								isDefault: false,
								label: "800x500",
								width: 800,
								height: 500,
								startPriceAtChar: 1,
								textNumber: 0,
								maxTextChar: -1,
                                minCharText:0,
								charPrice: 0,
								basePrice: 0
							},
							{
								isDefault: false,
								label: "800x800",
								width: 800,
								height: 800,
								startPriceAtChar: 1,
								textNumber: 0,
								maxTextChar: -1,
                                minCharText:0,
								charPrice: 0,
								basePrice: 0
							},
							{
								isDefault: false,
								label: "1000x500",
								width: 1000,
								height: 500,
								startPriceAtChar: 1,
								textNumber: 0,
								maxTextChar: -1,
                                minCharText:0,
								charPrice: 0,
								basePrice: 0
							},
							{
								isDefault: false,
								label: "1000x800",
								width: 1000,
								height: 800,
								startPriceAtChar: 1,
								textNumber: 0,
								maxTextChar: -1,
                                minCharText:0,
								charPrice: 0,
								basePrice: 0
							},
							{
								isDefault: false,
								label: "1100x800",
								width: 1100,
								height: 800,
								startPriceAtChar: 1,
								textNumber: 0,
								maxTextChar: -1,
                                minCharText:0,
								charPrice: 0,
								basePrice: 0
							},
							{
								isDefault: false,
								label: "1100x1100",
								width: 1100,
								height: 1100,
								startPriceAtChar: 1,
								textNumber: 0,
								maxTextChar: -1,
                                minCharText:0,
								charPrice: 0,
								basePrice: 0
							}
						],
						thickness: {
							active: false,
                            values:[],
						},
						customSize: {
							active: true,
							width: {
								max: 1100,
								min: 30,
								label: "Width"
							},
							height: {
								max: 1100,
								min: 30,
								label: "Height"
							}
						}
					},
					colors: {
						customColors: {
							active: false,
							label: "Custom Colors",
							prevImg: ""
						},
						allColors: [
							{
								isDefault: true,
								name: "Wood",
								textColor: {
									active: false,
                                    sameForBorder:false,
                                    name:"",
                                    codeHex:'#000000',
								},
								pattern: {
									active: true,
									codeHex: "#FF6600",
									url: aso_data.assets_url+'/images/im_wood-oak.png'
								},
								prevImg: "https://signsdesigner.us/app/demos/wood-signs/wood-oak.png",
								additionalPrice: 9.19
							}
						]
					},
					shapes: [
						{
							isDefault: true,
							shapeId: 3,
							additionalPrice: 0
						},
						{
							isDefault: false,
							shapeId: 1,
							additionalPrice: 0
						},
						{
							isDefault: false,
							shapeId: 0,
							additionalPrice: 0
						},
						{
							isDefault: false,
							shapeId: 7,
							additionalPrice: 0
						},
						{
							isDefault: false,
							shapeId: 8,
							additionalPrice: 0
						},
						{
							isDefault: false,
							shapeId: 9,
							additionalPrice: 0
						},
						{
							isDefault: false,
							shapeId: 4,
							additionalPrice: 0
						},
						{
							isDefault: false,
							shapeId: 2,
							additionalPrice: 0
						},
						{
							isDefault: false,
							shapeId: 5,
							additionalPrice: 0
						},
						{
							isDefault: false,
							shapeId: 6,
							additionalPrice: 0
						}
					],
					borders: {
						settings: {
							colors: [
								{
									name: "Oak",
									codeHex: "#a88f71",
									prevImg: "",
									additionalPrice: 0
								},
								{
									name: "White",
									codeHex: "#ffffff",
									prevImg: "",
									additionalPrice: 0
								},
								{
									name: "Black",
									codeHex: "#000000",
									prevImg: "",
									additionalPrice: 0
								},
								{
									name: "Blue",
									codeHex: "#004f86",
									prevImg: "",
									additionalPrice: 0
								},
								{
									name: "Red",
									codeHex: "#c4271d",
									prevImg: "",
									additionalPrice: 0
								},
								{
									name: "Green",
									codeHex: "#009251",
									prevImg: "",
									additionalPrice: 0
								},
								{
									name: "Yellow",
									codeHex: "#fee900",
									prevImg: "",
									additionalPrice: 0
								},
								{
									name: "Gray",
									codeHex: "#4f5756",
									prevImg: "",
									additionalPrice: 0
								},
								{
									name: "Pink",
									codeHex: "#bc4077",
									prevImg: "",
									additionalPrice: 0
								},
								{
									name: "Purple",
									codeHex: "#554585",
									prevImg: "",
									additionalPrice: 0
								},
								{
									name: "Orange",
									codeHex: "#e15616",
									prevImg: "",
									additionalPrice: 0
								},
								{
									name: "Brown",
									codeHex: "#523d2a",
									prevImg: "",
									additionalPrice: 0
								}
							],
							enableBorderWidth: false,
							enableBorderColor: true,
                            borderColorsLabel:"Borders Colors",
                            customColorsPrevImg:''
						},
						allBorders: [
							{
								isDefault: true,
								manageBorderId: 0,
								additionalPrice: 0,
								excludeSizes: [],
								excludeShapes: []
							},
							{
								isDefault: false,
								manageBorderId: 1,
								additionalPrice: 0,
								excludeSizes: [],
								excludeShapes: []
							},
							{
								isDefault: false,
								manageBorderId: 3,
								additionalPrice: 0,
								excludeSizes: [],
								excludeShapes: []
							}
						]
					},
					textImages: {
						enableText: true,
						enableImage: true
					},
					fixingMethods: [
						{
							isDefault: true,
							fixingMethodId: 0,
							additionalPrice: 0,
							excludeSizes: [],
							excludeShapes: []
						},
						{
							isDefault: false,
							fixingMethodId: 2,
							additionalPrice: 0.1,
							excludeSizes: [],
							excludeShapes: []
						},
						{
							isDefault: false,
							fixingMethodId: 3,
							additionalPrice: 4.7,
							excludeSizes: [
								1
							],
							excludeShapes: []
						},
						{
							isDefault: false,
							fixingMethodId: 1,
							additionalPrice: 0.6,
							excludeSizes: [
								1,
								14,
								15,
								16,
								17,
								18,
								19
							],
							excludeShapes: []
						},
						{
							isDefault: false,
							fixingMethodId: 6,
							additionalPrice: 4.8,
							excludeSizes: [
								1,
								12,
								13,
								14,
								15,
								16,
								17,
								18,
								19
							],
							excludeShapes: [
								0,
								9,
								4,
								2
							]
						},
						{
							isDefault: false,
							fixingMethodId: 5,
							additionalPrice: 0.7,
							excludeSizes: [],
							excludeShapes: [
								7,
								8,
								5,
								6
							]
						},
						{
							isDefault: false,
							fixingMethodId: 4,
							additionalPrice: 12.8,
							excludeSizes: [
								1,
								2
							],
							excludeShapes: []
						},
						{
							isDefault: false,
							fixingMethodId: 9,
							additionalPrice: 14.5,
							excludeSizes: [
								1,
								2,
								3,
								4,
								5,
								16,
								17,
								18,
								19
							],
							excludeShapes: [
								0,
								7,
								8,
								9,
								4,
								2
							]
						}
					],
					additionalOptions: []
				}
			}
		]
    },
    "double-side":{
        materials: [
            {
                icon: "https://signsdesigner.us/app/demos/double-sided/aluminium.png",
                name: "Aluminium",
                type: "simple",
                popImg: "",
                description: "Double-sided aluminium composite (Gobond) consist of a sandwich layer with a surface layer of aluminium and a polyethylene core.",
                data: {
                    sizes: {
                        allSizes: [
                        {
                            isDefault: true,
                            label: "70x30",
                            width: 70,
                            height: 30,
                            startPriceAtChar: 1,
                            textNumber: 0,
                            maxTextChar: -1,
                            minChartText: 0,
                            charPrice: 0,
                            basePrice: 0
                        },
                        {
                            isDefault: false,
                            label: "70x70",
                            width: 70,
                            height: 70,
                            startPriceAtChar: 1,
                            textNumber: 0,
                            maxTextChar: -1,
                            minChartText: 0,
                            charPrice: 0,
                            basePrice: 0
                        },
                        {
                            isDefault: false,
                            label: "120x50",
                            width: 120,
                            height: 50,
                            startPriceAtChar: 1,
                            textNumber: 0,
                            maxTextChar: -1,
                            minChartText: 0,
                            charPrice: 0,
                            basePrice: 0
                        },
                        {
                            isDefault: false,
                            label: "120x70",
                            width: 120,
                            height: 70,
                            startPriceAtChar: 1,
                            textNumber: 0,
                            maxTextChar: -1,
                            minChartText: 0,
                            charPrice: 0,
                            basePrice: 0
                        },
                        {
                            isDefault: false,
                            label: "150x100",
                            width: 150,
                            height: 100,
                            startPriceAtChar: 1,
                            textNumber: 0,
                            maxTextChar: -1,
                            minChartText: 0,
                            charPrice: 0,
                            basePrice: 0
                        },
                        {
                            isDefault: false,
                            label: "200x100",
                            width: 200,
                            height: 100,
                            startPriceAtChar: 1,
                            textNumber: 0,
                            maxTextChar: -1,
                            minChartText: 0,
                            charPrice: 0,
                            basePrice: 0
                        },
                        {
                            isDefault: false,
                            label: "200x200",
                            width: 200,
                            height: 200,
                            startPriceAtChar: 1,
                            textNumber: 0,
                            maxTextChar: -1,
                            minChartText: 0,
                            charPrice: 0,
                            basePrice: 0
                        },
                        {
                            isDefault: false,
                            label: "300x200",
                            width: 300,
                            height: 200,
                            startPriceAtChar: 1,
                            textNumber: 0,
                            maxTextChar: -1,
                            minChartText: 0,
                            charPrice: 0,
                            basePrice: 0
                        },
                        {
                            isDefault: false,
                            label: "300x300",
                            width: 300,
                            height: 300,
                            startPriceAtChar: 1,
                            textNumber: 0,
                            maxTextChar: -1,
                            minChartText: 0,
                            charPrice: 0,
                            basePrice: 0
                        },
                        {
                            isDefault: false,
                            label: "400x300",
                            width: 400,
                            height: 300,
                            startPriceAtChar: 1,
                            textNumber: 0,
                            maxTextChar: -1,
                            minChartText: 0,
                            charPrice: 0,
                            basePrice: 0
                        },
                        {
                            isDefault: false,
                            label: "500x200",
                            width: 500,
                            height: 200,
                            startPriceAtChar: 1,
                            textNumber: 0,
                            maxTextChar: -1,
                            minChartText: 0,
                            charPrice: 0,
                            basePrice: 0
                        },
                        {
                            isDefault: false,
                            label: "600x600",
                            width: 600,
                            height: 600,
                            startPriceAtChar: 1,
                            textNumber: 0,
                            maxTextChar: -1,
                            minChartText: 0,
                            charPrice: 0,
                            basePrice: 0
                        },
                        {
                            isDefault: false,
                            label: "800x700",
                            width: 800,
                            height: 700,
                            startPriceAtChar: 1,
                            textNumber: 0,
                            maxTextChar: -1,
                            minChartText: 0,
                            charPrice: 0,
                            basePrice: 0
                        },
                        {
                            isDefault: false,
                            label: "800x800",
                            width: 800,
                            height: 800,
                            startPriceAtChar: 1,
                            textNumber: 0,
                            maxTextChar: -1,
                            minChartText: 0,
                            charPrice: 0,
                            basePrice: 0
                        },
                        {
                            isDefault: false,
                            label: "1000x500",
                            width: 1000,
                            height: 500,
                            startPriceAtChar: 1,
                            textNumber: 0,
                            maxTextChar: -1,
                            minChartText: 0,
                            charPrice: 0,
                            basePrice: 0
                        },
                        {
                            isDefault: false,
                            label: "1000x600",
                            width: 1000,
                            height: 600,
                            startPriceAtChar: 1,
                            textNumber: 0,
                            maxTextChar: -1,
                            minChartText: 0,
                            charPrice: 0,
                            basePrice: 0
                        },
                        {
                            isDefault: false,
                            label: "1000x700",
                            width: 1000,
                            height: 700,
                            startPriceAtChar: 1,
                            textNumber: 0,
                            maxTextChar: -1,
                            minChartText: 0,
                            charPrice: 0,
                            basePrice: 0
                        },
                        {
                            isDefault: false,
                            label: "1000x1000",
                            width: 1000,
                            height: 1000,
                            startPriceAtChar: 1,
                            textNumber: 0,
                            maxTextChar: -1,
                            minChartText: 0,
                            charPrice: 0,
                            basePrice: 0
                        },
                        {
                            isDefault: false,
                            label: "1200x700",
                            width: 1200,
                            height: 700,
                            startPriceAtChar: 1,
                            textNumber: 0,
                            maxTextChar: -1,
                            minChartText: 0,
                            charPrice: 0,
                            basePrice: 0
                        },
                        {
                            isDefault: false,
                            label: "1400x1400",
                            width: 1400,
                            height: 1400,
                            startPriceAtChar: 1,
                            textNumber: 0,
                            maxTextChar: -1,
                            minChartText: 0,
                            charPrice: 0,
                            basePrice: 0
                        }
                        ],
                        thickness: {
                            active: false,
                            values:[]
                        },
                        customSize: {
                            active: true,
                            width: {
                                max: 1400,
                                min: 70,
                                label: "Width"
                            },
                            height: {
                                max: 1400,
                                min: 30,
                                label: "Height"
                            }
                        }
                    },
                    colors: {
                        customColors: {
                        active: true,
                        label: "Custom Colors",
                        prevImg: ""
                        },
                        allColors: [
                        {
                            isDefault: true,
                            name: "White",
                            textColor: {
                                active: false,
                                sameForBorder:false,
                                name:"",
                                codeHex:'#000000',
                            },
                            pattern: {
                                active: false,
                                codeHex: "#ffffff",
                                url: ""
                            },
                            prevImg: "",
                            additionalPrice: 0
                        },
                        {
                            isDefault: false,
                            name: "Aluminium",
                            textColor: {
                                active: false,
                                sameForBorder:false,
                                name:"",
                                codeHex:'#000000',
                            },
                            pattern: {
                                active: false,
                                codeHex: "#dfdfdf",
                                url: ""
                            },
                            prevImg: "",
                            additionalPrice: 0
                        },
                        {
                            isDefault: false,
                            name: "Black",
                            textColor: {
                                active: false,
                                sameForBorder:false,
                                name:"",
                                codeHex:'#000000',
                            },
                            pattern: {
                            active: false,
                            codeHex: "#000000",
                            url: ""
                            },
                            prevImg: "",
                            additionalPrice: 0
                        },
                        {
                            isDefault: false,
                            name: "Blue",
                            textColor: {
                                active: false,
                                sameForBorder:false,
                                name:"",
                                codeHex:'#000000',
                            },
                            pattern: {
                            active: false,
                            codeHex: "#004f86",
                            url: ""
                            },
                            prevImg: "",
                            additionalPrice: 0
                        },
                        {
                            isDefault: false,
                            name: "Red",
                            textColor: {
                                active: false,
                                sameForBorder:false,
                                name:"",
                                codeHex:'#000000',
                            },
                            pattern: {
                            active: false,
                            codeHex: "#c4271d",
                            url: ""
                            },
                            prevImg: "",
                            additionalPrice: 0
                        },
                        {
                            isDefault: false,
                            name: "Green",
                            textColor: {
                                active: false,
                                sameForBorder:false,
                                name:"",
                                codeHex:'#000000',
                            },
                            pattern: {
                            active: false,
                            codeHex: "#009251",
                            url: ""
                            },
                            prevImg: "",
                            additionalPrice: 0
                        },
                        {
                            isDefault: false,
                            name: "Yellow",
                            textColor: {
                                active: false,
                                sameForBorder:false,
                                name:"",
                                codeHex:'#000000',
                            },
                            pattern: {
                            active: false,
                            codeHex: "#fee900",
                            url: ""
                            },
                            prevImg: "",
                            additionalPrice: 0
                        },
                        {
                            isDefault: false,
                            name: "Gray",
                            textColor: {
                                active: false,
                                sameForBorder:false,
                                name:"",
                                codeHex:'#000000',
                            },
                            pattern: {
                            active: false,
                            codeHex: "#4f5756",
                            url: ""
                            },
                            prevImg: "",
                            additionalPrice: 0
                        },
                        {
                            isDefault: false,
                            name: "Pink",
                            textColor: {
                                active: false,
                                sameForBorder:false,
                                name:"",
                                codeHex:'#000000',
                            },
                            pattern: {
                            active: false,
                            codeHex: "#bc4077",
                            url: ""
                            },
                            prevImg: "",
                            additionalPrice: 0
                        },
                        {
                            isDefault: false,
                            name: "Purple",
                            textColor: {
                                active: false,
                                sameForBorder:false,
                                name:"",
                                codeHex:'#000000',
                            },
                            pattern: {
                            active: false,
                            codeHex: "#554585",
                            url: ""
                            },
                            prevImg: "",
                            additionalPrice: 0
                        },
                        {
                            isDefault: false,
                            name: "Orange",
                            textColor: {
                                active: false,
                                sameForBorder:false,
                                name:"",
                                codeHex:'#000000',
                            },
                            pattern: {
                            active: false,
                            codeHex: "#e15616",
                            url: ""
                            },
                            prevImg: "",
                            additionalPrice: 0
                        },
                        {
                            isDefault: false,
                            name: "Brown",
                            textColor: {
                            active: false,
                                sameForBorder:false,
                                name:"",
                                codeHex:'#000000',
                            },
                            pattern: {
                            active: false,
                            codeHex: "#523d2a",
                            url: ""
                            },
                            prevImg: "",
                            additionalPrice: 0
                        },
                        {
                            isDefault: false,
                            name: "Gold",
                            textColor: {
                            active: false,
                                sameForBorder:false,
                                name:"",
                                codeHex:'#000000',
                            },
                            pattern: {
                            active: false,
                            codeHex: "#e9a956",
                            url: ""
                            },
                            prevImg: "",
                            additionalPrice: 0
                        },
                        {
                            isDefault: false,
                            name: "Silver",
                            textColor: {
                            active: false,
                                sameForBorder:false,
                                name:"",
                                codeHex:'#000000',
                            },
                            pattern: {
                            active: false,
                            codeHex: "#e9e9e9",
                            url: ""
                            },
                            prevImg: "",
                            additionalPrice: 0
                        }
                        ]
                    },
                    shapes: [
                        {
                        isDefault: false,
                        shapeId: 1,
                        additionalPrice: 0
                        },
                        {
                        isDefault: true,
                        shapeId: 3,
                        additionalPrice: 0
                        },
                        {
                        isDefault: false,
                        shapeId: 4,
                        additionalPrice: 0
                        },
                        {
                        isDefault: false,
                        shapeId: 0,
                        additionalPrice: 0
                        },
                        {
                        isDefault: false,
                        shapeId: 9,
                        additionalPrice: 0
                        },
                        {
                        isDefault: false,
                        shapeId: 5,
                        additionalPrice: 0
                        },
                        {
                        isDefault: false,
                        shapeId: 6,
                        additionalPrice: 0
                        },
                        {
                        isDefault: false,
                        shapeId: 2,
                        additionalPrice: 0
                        }
                    ],
                    borders: {
                        settings: {
                            colors: [
                                {
                                name: "White",
                                codeHex: "#ffffff",
                                prevImg: "",
                                additionalPrice: 0
                                },
                                {
                                name: "Black",
                                codeHex: "#000000",
                                prevImg: "",
                                additionalPrice: 0
                                },
                                {
                                name: "Blue",
                                codeHex: "#004f86",
                                prevImg: "",
                                additionalPrice: 0
                                },
                                {
                                name: "Red",
                                codeHex: "#c4271d",
                                prevImg: "",
                                additionalPrice: 0
                                },
                                {
                                name: "Green",
                                codeHex: "#009251",
                                prevImg: "",
                                additionalPrice: 0
                                },
                                {
                                name: "Yellow",
                                codeHex: "#fee900",
                                prevImg: "",
                                additionalPrice: 0
                                },
                                {
                                name: "Gray",
                                codeHex: "#4f5756",
                                prevImg: "",
                                additionalPrice: 0
                                },
                                {
                                name: "Pink",
                                codeHex: "#bc4077",
                                prevImg: "",
                                additionalPrice: 0
                                },
                                {
                                name: "Purple",
                                codeHex: "#554585",
                                prevImg: "",
                                additionalPrice: 0
                                },
                                {
                                name: "Orange",
                                codeHex: "#e15616",
                                prevImg: "",
                                additionalPrice: 0
                                },
                                {
                                name: "Brown",
                                codeHex: "#523d2a",
                                prevImg: "",
                                additionalPrice: 0
                                },
                                {
                                name: "Gold",
                                codeHex: "#e9a956",
                                prevImg: "",
                                additionalPrice: 0
                                },
                                {
                                name: "Silver",
                                codeHex: "#e9e9e9",
                                prevImg: "",
                                additionalPrice: 0
                                }
                            ],
                            enableBorderWidth: false,
                            enableBorderColor: true,
                            borderColorsLabel:"Borders Colors",
                            customColorsPrevImg:''
                        },
                        allBorders: [
                        {
                            isDefault: true,
                            manageBorderId: 0,
                            additionalPrice: 0,
                            excludeSizes: [],
                            excludeShapes: []
                        },
                        {
                            isDefault: false,
                            manageBorderId: 1,
                            additionalPrice: 0,
                            excludeSizes: [],
                            excludeShapes: []
                        },
                        {
                            isDefault: true,
                            manageBorderId: 2,
                            additionalPrice: 0,
                            excludeSizes: [],
                            excludeShapes: []
                        },
                        {
                            isDefault: false,
                            manageBorderId: 3,
                            additionalPrice: 0,
                            excludeSizes: [],
                            excludeShapes: []
                        }
                        ]
                    },
                    textImages: {
                        enableText: true,
                        enableImage: true
                    },
                    fixingMethods: [
                        {
                        isDefault: true,
                        fixingMethodId: 0,
                        additionalPrice: 0,
                        excludeSizes: [],
                        excludeShapes: []
                        },
                        {
                        isDefault: false,
                        fixingMethodId: 6,
                        additionalPrice: 4.8,
                        excludeSizes: [
                            12,
                            13,
                            14,
                            15,
                            16,
                            17,
                            18,
                            19,
                            20
                        ],
                        excludeShapes: [
                            4,
                            0,
                            9,
                            2
                        ]
                        },
                        {
                        isDefault: false,
                        fixingMethodId: 5,
                        additionalPrice: 0.8,
                        excludeSizes: [],
                        excludeShapes: [
                            5,
                            6
                        ]
                        },
                        {
                        isDefault: false,
                        fixingMethodId: 9,
                        additionalPrice: 13,
                        excludeSizes: [
                            1,
                            2,
                            3,
                            4,
                            15,
                            16,
                            17,
                            18,
                            19,
                            20
                        ],
                        excludeShapes: [
                            4,
                            0,
                            9,
                            2
                        ]
                        }
                    ],
                    additionalOptions: []
                }
            },
            {
                icon: "https://signsdesigner.us/app/demos/double-sided/plastic.png",
                name: "Plastic",
                type: "simple",
                popImg: "",
                description: "Foam PVC Forex). Light, flexible material.",
                data: {
                sizes: {
                    allSizes: [
                    {
                        isDefault: true,
                        label: "70x30",
                        width: 70,
                        height: 30,
                        startPriceAtChar: 1,
                        textNumber: 0,
                        maxTextChar: -1,
                        minChartText: 0,
                        charPrice: 0,
                        basePrice: 0
                    },
                    {
                        isDefault: false,
                        label: "70x70",
                        width: 70,
                        height: 70,
                        startPriceAtChar: 1,
                        textNumber: 0,
                        maxTextChar: -1,
                        minChartText: 0,
                        charPrice: 0,
                        basePrice: 0
                    },
                    {
                        isDefault: false,
                        label: "120x50",
                        width: 120,
                        height: 50,
                        startPriceAtChar: 1,
                        textNumber: 0,
                        maxTextChar: -1,
                        minChartText: 0,
                        charPrice: 0,
                        basePrice: 0
                    },
                    {
                        isDefault: false,
                        label: "120x70",
                        width: 120,
                        height: 70,
                        startPriceAtChar: 1,
                        textNumber: 0,
                        maxTextChar: -1,
                        minChartText: 0,
                        charPrice: 0,
                        basePrice: 0
                    },
                    {
                        isDefault: false,
                        label: "150x100",
                        width: 150,
                        height: 100,
                        startPriceAtChar: 1,
                        textNumber: 0,
                        maxTextChar: -1,
                        minChartText: 0,
                        charPrice: 0,
                        basePrice: 0
                    },
                    {
                        isDefault: false,
                        label: "200x100",
                        width: 200,
                        height: 100,
                        startPriceAtChar: 1,
                        textNumber: 0,
                        maxTextChar: -1,
                        minChartText: 0,
                        charPrice: 0,
                        basePrice: 0
                    },
                    {
                        isDefault: false,
                        label: "200x200",
                        width: 200,
                        height: 200,
                        startPriceAtChar: 1,
                        textNumber: 0,
                        maxTextChar: -1,
                        minChartText: 0,
                        charPrice: 0,
                        basePrice: 0
                    },
                    {
                        isDefault: false,
                        label: "300x200",
                        width: 300,
                        height: 200,
                        startPriceAtChar: 1,
                        textNumber: 0,
                        maxTextChar: -1,
                        minChartText: 0,
                        charPrice: 0,
                        basePrice: 0
                    },
                    {
                        isDefault: false,
                        label: "300x300",
                        width: 300,
                        height: 300,
                        startPriceAtChar: 1,
                        textNumber: 0,
                        maxTextChar: -1,
                        minChartText: 0,
                        charPrice: 0,
                        basePrice: 0
                    },
                    {
                        isDefault: false,
                        label: "400x300",
                        width: 400,
                        height: 300,
                        startPriceAtChar: 1,
                        textNumber: 0,
                        maxTextChar: -1,
                        minChartText: 0,
                        charPrice: 0,
                        basePrice: 0
                    },
                    {
                        isDefault: false,
                        label: "500x200",
                        width: 500,
                        height: 200,
                        startPriceAtChar: 1,
                        textNumber: 0,
                        maxTextChar: -1,
                        minChartText: 0,
                        charPrice: 0,
                        basePrice: 0
                    },
                    {
                        isDefault: false,
                        label: "600x600",
                        width: 600,
                        height: 600,
                        startPriceAtChar: 1,
                        textNumber: 0,
                        maxTextChar: -1,
                        minChartText: 0,
                        charPrice: 0,
                        basePrice: 0
                    },
                    {
                        isDefault: false,
                        label: "800x700",
                        width: 800,
                        height: 700,
                        startPriceAtChar: 1,
                        textNumber: 0,
                        maxTextChar: -1,
                        minChartText: 0,
                        charPrice: 0,
                        basePrice: 0
                    },
                    {
                        isDefault: false,
                        label: "800x800",
                        width: 800,
                        height: 800,
                        startPriceAtChar: 1,
                        textNumber: 0,
                        maxTextChar: -1,
                        minChartText: 0,
                        charPrice: 0,
                        basePrice: 0
                    },
                    {
                        isDefault: false,
                        label: "1000x500",
                        width: 1000,
                        height: 500,
                        startPriceAtChar: 1,
                        textNumber: 0,
                        maxTextChar: -1,
                        minChartText: 0,
                        charPrice: 0,
                        basePrice: 0
                    },
                    {
                        isDefault: false,
                        label: "1000x600",
                        width: 1000,
                        height: 600,
                        startPriceAtChar: 1,
                        textNumber: 0,
                        maxTextChar: -1,
                        minChartText: 0,
                        charPrice: 0,
                        basePrice: 0
                    },
                    {
                        isDefault: false,
                        label: "1000x700",
                        width: 1000,
                        height: 700,
                        startPriceAtChar: 1,
                        textNumber: 0,
                        maxTextChar: -1,
                        minChartText: 0,
                        charPrice: 0,
                        basePrice: 0
                    },
                    {
                        isDefault: false,
                        label: "1000x1000",
                        width: 1000,
                        height: 1000,
                        startPriceAtChar: 1,
                        textNumber: 0,
                        maxTextChar: -1,
                        minChartText: 0,
                        charPrice: 0,
                        basePrice: 0
                    }
                    ],
                    thickness: {
                        active: false,
                        values:[]
                    },
                    customSize: {
                    active: true,
                    width: {
                        max: 1000,
                        min: 70,
                        label: "Width"
                    },
                    height: {
                        max: 1000,
                        min: 30,
                        label: "Height"
                    }
                    }
                },
                colors: {
                    customColors: {
                    active: true,
                    label: "Custom Colors",
                    prevImg: ""
                    },
                    allColors: [
                    {
                        isDefault: true,
                        name: "White",
                        textColor: {
                        active: false,
                            sameForBorder:false,
                            name:"",
                            codeHex:'#000000',
                        },
                        pattern: {
                        active: false,
                        codeHex: "#ffffff",
                        url: ""
                        },
                        prevImg: "",
                        additionalPrice: 0
                    },
                    {
                        isDefault: false,
                        name: "Black",
                        textColor: {
                        active: false,
                            sameForBorder:false,
                            name:"",
                            codeHex:'#000000',
                        },
                        pattern: {
                        active: false,
                        codeHex: "#000000",
                        url: ""
                        },
                        prevImg: "",
                        additionalPrice: 0
                    },
                    {
                        isDefault: false,
                        name: "Blue",
                        textColor: {
                        active: false,
                            sameForBorder:false,
                            name:"",
                            codeHex:'#000000',
                        },
                        pattern: {
                        active: false,
                        codeHex: "#004f86",
                        url: ""
                        },
                        prevImg: "",
                        additionalPrice: 0
                    },
                    {
                        isDefault: false,
                        name: "Red",
                        textColor: {
                        active: false,
                            sameForBorder:false,
                            name:"",
                            codeHex:'#000000',
                        },
                        pattern: {
                        active: false,
                        codeHex: "#c4271d",
                        url: ""
                        },
                        prevImg: "",
                        additionalPrice: 0
                    },
                    {
                        isDefault: false,
                        name: "Green",
                        textColor: {
                        active: false,
                            sameForBorder:false,
                            name:"",
                            codeHex:'#000000',
                        },
                        pattern: {
                        active: false,
                        codeHex: "#009251",
                        url: ""
                        },
                        prevImg: "",
                        additionalPrice: 0
                    },
                    {
                        isDefault: false,
                        name: "Yellow",
                        textColor: {
                        active: false,
                            sameForBorder:false,
                            name:"",
                            codeHex:'#000000',
                        },
                        pattern: {
                        active: false,
                        codeHex: "#fee900",
                        url: ""
                        },
                        prevImg: "",
                        additionalPrice: 0
                    },
                    {
                        isDefault: false,
                        name: "Gray",
                        textColor: {
                        active: false,
                            sameForBorder:false,
                            name:"",
                            codeHex:'#000000',
                        },
                        pattern: {
                        active: false,
                        codeHex: "#4f5756",
                        url: ""
                        },
                        prevImg: "",
                        additionalPrice: 0
                    },
                    {
                        isDefault: false,
                        name: "Pink",
                        textColor: {
                        active: false,
                            sameForBorder:false,
                            name:"",
                            codeHex:'#000000',
                        },
                        pattern: {
                        active: false,
                        codeHex: "#bc4077",
                        url: ""
                        },
                        prevImg: "",
                        additionalPrice: 0
                    },
                    {
                        isDefault: false,
                        name: "Purple",
                        textColor: {
                        active: false,
                            sameForBorder:false,
                            name:"",
                            codeHex:'#000000',
                        },
                        pattern: {
                        active: false,
                        codeHex: "#554585",
                        url: ""
                        },
                        prevImg: "",
                        additionalPrice: 0
                    },
                    {
                        isDefault: false,
                        name: "Orange",
                        textColor: {
                        active: false,
                            sameForBorder:false,
                            name:"",
                            codeHex:'#000000',
                        },
                        pattern: {
                        active: false,
                        codeHex: "#e15616",
                        url: ""
                        },
                        prevImg: "",
                        additionalPrice: 0
                    },
                    {
                        isDefault: false,
                        name: "Brown",
                        textColor: {
                        active: false,
                            sameForBorder:false,
                            name:"",
                            codeHex:'#000000',
                        },
                        pattern: {
                        active: false,
                        codeHex: "#523d2a",
                        url: ""
                        },
                        prevImg: "",
                        additionalPrice: 0
                    }
                    ]
                },
                shapes: [
                    {
                    isDefault: false,
                    shapeId: 1,
                    additionalPrice: 0
                    },
                    {
                    isDefault: true,
                    shapeId: 3,
                    additionalPrice: 0
                    },
                    {
                    isDefault: false,
                    shapeId: 4,
                    additionalPrice: 0
                    },
                    {
                    isDefault: false,
                    shapeId: 0,
                    additionalPrice: 0
                    },
                    {
                    isDefault: false,
                    shapeId: 9,
                    additionalPrice: 0
                    },
                    {
                    isDefault: false,
                    shapeId: 5,
                    additionalPrice: 0
                    },
                    {
                    isDefault: false,
                    shapeId: 6,
                    additionalPrice: 0
                    },
                    {
                    isDefault: false,
                    shapeId: 2,
                    additionalPrice: 0
                    }
                ],
                borders: {
                    settings: {
                        colors: [
                            {
                            name: "White",
                            codeHex: "#ffffff",
                            prevImg: "",
                            additionalPrice: 0
                            },
                            {
                            name: "Black",
                            codeHex: "#000000",
                            prevImg: "",
                            additionalPrice: 0
                            },
                            {
                            name: "Blue",
                            codeHex: "#004f86",
                            prevImg: "",
                            additionalPrice: 0
                            },
                            {
                            name: "Red",
                            codeHex: "#c4271d",
                            prevImg: "",
                            additionalPrice: 0
                            },
                            {
                            name: "Green",
                            codeHex: "#009251",
                            prevImg: "",
                            additionalPrice: 0
                            },
                            {
                            name: "Yellow",
                            codeHex: "#fee900",
                            prevImg: "",
                            additionalPrice: 0
                            },
                            {
                            name: "Gray",
                            codeHex: "#4f5756",
                            prevImg: "",
                            additionalPrice: 0
                            },
                            {
                            name: "Pink",
                            codeHex: "#bc4077",
                            prevImg: "",
                            additionalPrice: 0
                            },
                            {
                            name: "Purple",
                            codeHex: "#554585",
                            prevImg: "",
                            additionalPrice: 0
                            },
                            {
                            name: "Orange",
                            codeHex: "#e15616",
                            prevImg: "",
                            additionalPrice: 0
                            },
                            {
                            name: "Brown",
                            codeHex: "#523d2a",
                            prevImg: "",
                            additionalPrice: 0
                            }
                        ],
                        enableBorderWidth: false,
                        enableBorderColor: true,
                        borderColorsLabel:"Borders Colors",
                        customColorsPrevImg:''
                    },
                    allBorders: [
                    {
                        isDefault: true,
                        manageBorderId: 0,
                        additionalPrice: 0,
                        excludeSizes: [],
                        excludeShapes: []
                    },
                    {
                        isDefault: false,
                        manageBorderId: 1,
                        additionalPrice: 0,
                        excludeSizes: [],
                        excludeShapes: []
                    },
                    {
                        isDefault: true,
                        manageBorderId: 2,
                        additionalPrice: 0,
                        excludeSizes: [],
                        excludeShapes: []
                    },
                    {
                        isDefault: false,
                        manageBorderId: 3,
                        additionalPrice: 0,
                        excludeSizes: [],
                        excludeShapes: []
                    }
                    ]
                },
                textImages: {
                    enableText: true,
                    enableImage: true
                },
                fixingMethods: [
                    {
                    isDefault: true,
                    fixingMethodId: 0,
                    additionalPrice: 0,
                    excludeSizes: [],
                    excludeShapes: []
                    },
                    {
                    isDefault: false,
                    fixingMethodId: 6,
                    additionalPrice: 4.8,
                    excludeSizes: [
                        12,
                        13,
                        14,
                        15,
                        16,
                        17,
                        18
                    ],
                    excludeShapes: [
                        4,
                        0,
                        9,
                        2
                    ]
                    },
                    {
                    isDefault: false,
                    fixingMethodId: 5,
                    additionalPrice: 1.1,
                    excludeSizes: [],
                    excludeShapes: [
                        5,
                        6
                    ]
                    },
                    {
                    isDefault: false,
                    fixingMethodId: 9,
                    additionalPrice: 13.1,
                    excludeSizes: [
                        1,
                        2,
                        3,
                        4,
                        15,
                        16,
                        17,
                        18
                    ],
                    excludeShapes: [
                        4,
                        0,
                        9,
                        2
                    ]
                    }
                ],
                additionalOptions: []
                }
            },
            {
                icon: "https://signsdesigner.us/app/demos/double-sided/eco_board.png",
                name: "Eco board",
                type: "simple",
                popImg: "",
                description: "Quality cardboard(pressed board) with a wood fibre core. A lightweight, stable and rigid material perfect for hanging.",
                data: {
                    sizes: {
                        allSizes: [
                        {
                            isDefault: true,
                            label: "70x30",
                            width: 70,
                            height: 30,
                            startPriceAtChar: 1,
                            textNumber: 0,
                            maxTextChar: -1,
                            minChartText: 0,
                            charPrice: 0,
                            basePrice: 0
                        },
                        {
                            isDefault: false,
                            label: "70x70",
                            width: 70,
                            height: 70,
                            startPriceAtChar: 1,
                            textNumber: 0,
                            maxTextChar: -1,
                            minChartText: 0,
                            charPrice: 0,
                            basePrice: 0
                        },
                        {
                            isDefault: false,
                            label: "120x50",
                            width: 120,
                            height: 50,
                            startPriceAtChar: 1,
                            textNumber: 0,
                            maxTextChar: -1,
                            minChartText: 0,
                            charPrice: 0,
                            basePrice: 0
                        },
                        {
                            isDefault: false,
                            label: "120x70",
                            width: 120,
                            height: 70,
                            startPriceAtChar: 1,
                            textNumber: 0,
                            maxTextChar: -1,
                            minChartText: 0,
                            charPrice: 0,
                            basePrice: 0
                        },
                        {
                            isDefault: false,
                            label: "150x100",
                            width: 150,
                            height: 100,
                            startPriceAtChar: 1,
                            textNumber: 0,
                            maxTextChar: -1,
                            minChartText: 0,
                            charPrice: 0,
                            basePrice: 0
                        },
                        {
                            isDefault: false,
                            label: "200x100",
                            width: 200,
                            height: 100,
                            startPriceAtChar: 1,
                            textNumber: 0,
                            maxTextChar: -1,
                            minChartText: 0,
                            charPrice: 0,
                            basePrice: 0
                        },
                        {
                            isDefault: false,
                            label: "200x200",
                            width: 200,
                            height: 200,
                            startPriceAtChar: 1,
                            textNumber: 0,
                            maxTextChar: -1,
                            minChartText: 0,
                            charPrice: 0,
                            basePrice: 0
                        },
                        {
                            isDefault: false,
                            label: "300x200",
                            width: 300,
                            height: 200,
                            startPriceAtChar: 1,
                            textNumber: 0,
                            maxTextChar: -1,
                            minChartText: 0,
                            charPrice: 0,
                            basePrice: 0
                        },
                        {
                            isDefault: false,
                            label: "300x300",
                            width: 300,
                            height: 300,
                            startPriceAtChar: 1,
                            textNumber: 0,
                            maxTextChar: -1,
                            minChartText: 0,
                            charPrice: 0,
                            basePrice: 0
                        },
                        {
                            isDefault: false,
                            label: "400x300",
                            width: 400,
                            height: 300,
                            startPriceAtChar: 1,
                            textNumber: 0,
                            maxTextChar: -1,
                            minChartText: 0,
                            charPrice: 0,
                            basePrice: 0
                        },
                        {
                            isDefault: false,
                            label: "500x200",
                            width: 500,
                            height: 200,
                            startPriceAtChar: 1,
                            textNumber: 0,
                            maxTextChar: -1,
                            minChartText: 0,
                            charPrice: 0,
                            basePrice: 0
                        },
                        {
                            isDefault: false,
                            label: "600x600",
                            width: 600,
                            height: 600,
                            startPriceAtChar: 1,
                            textNumber: 0,
                            maxTextChar: -1,
                            minChartText: 0,
                            charPrice: 0,
                            basePrice: 0
                        },
                        {
                            isDefault: false,
                            label: "800x700",
                            width: 800,
                            height: 700,
                            startPriceAtChar: 1,
                            textNumber: 0,
                            maxTextChar: -1,
                            minChartText: 0,
                            charPrice: 0,
                            basePrice: 0
                        },
                        {
                            isDefault: false,
                            label: "800x800",
                            width: 800,
                            height: 800,
                            startPriceAtChar: 1,
                            textNumber: 0,
                            maxTextChar: -1,
                            minChartText: 0,
                            charPrice: 0,
                            basePrice: 0
                        },
                        {
                            isDefault: false,
                            label: "1000x500",
                            width: 1000,
                            height: 500,
                            startPriceAtChar: 1,
                            textNumber: 0,
                            maxTextChar: -1,
                            minChartText: 0,
                            charPrice: 0,
                            basePrice: 0
                        },
                        {
                            isDefault: false,
                            label: "1000x600",
                            width: 1000,
                            height: 600,
                            startPriceAtChar: 1,
                            textNumber: 0,
                            maxTextChar: -1,
                            minChartText: 0,
                            charPrice: 0,
                            basePrice: 0
                        },
                        {
                            isDefault: false,
                            label: "1000x700",
                            width: 1000,
                            height: 700,
                            startPriceAtChar: 1,
                            textNumber: 0,
                            maxTextChar: -1,
                            minChartText: 0,
                            charPrice: 0,
                            basePrice: 0
                        }
                        ],
                        thickness: {
                            active: false,
                            values:[]
                        },
                        customSize: {
                        active: true,
                        width: {
                            max: 1000,
                            min: 70,
                            label: "Width"
                        },
                        height: {
                            max: 700,
                            min: 30,
                            label: "Height"
                        }
                        }
                    },
                    colors: {
                        customColors: {
                        active: true,
                        label: "Custom Colors",
                        prevImg: ""
                        },
                        allColors: [
                        {
                            isDefault: true,
                            name: "White",
                            textColor: {
                            active: false,
                                sameForBorder:false,
                                name:"",
                                codeHex:'#000000',
                            },
                            pattern: {
                            active: false,
                            codeHex: "#ffffff",
                            url: ""
                            },
                            prevImg: "",
                            additionalPrice: 0
                        },
                        {
                            isDefault: false,
                            name: "Black",
                            textColor: {
                            active: false,
                                sameForBorder:false,
                                name:"",
                                codeHex:'#000000',
                            },
                            pattern: {
                            active: false,
                            codeHex: "#000000",
                            url: ""
                            },
                            prevImg: "",
                            additionalPrice: 0
                        },
                        {
                            isDefault: false,
                            name: "Blue",
                            textColor: {
                            active: false,
                                sameForBorder:false,
                                name:"",
                                codeHex:'#000000',
                            },
                            pattern: {
                            active: false,
                            codeHex: "#004f86",
                            url: ""
                            },
                            prevImg: "",
                            additionalPrice: 0
                        },
                        {
                            isDefault: false,
                            name: "Red",
                            textColor: {
                            active: false,
                                sameForBorder:false,
                                name:"",
                                codeHex:'#000000',
                            },
                            pattern: {
                            active: false,
                            codeHex: "#c4271d",
                            url: ""
                            },
                            prevImg: "",
                            additionalPrice: 0
                        },
                        {
                            isDefault: false,
                            name: "Green",
                            textColor: {
                            active: false,
                                sameForBorder:false,
                                name:"",
                                codeHex:'#000000',
                            },
                            pattern: {
                            active: false,
                            codeHex: "#009251",
                            url: ""
                            },
                            prevImg: "",
                            additionalPrice: 0
                        },
                        {
                            isDefault: false,
                            name: "Yellow",
                            textColor: {
                            active: false,
                                sameForBorder:false,
                                name:"",
                                codeHex:'#000000',
                            },
                            pattern: {
                            active: false,
                            codeHex: "#fee900",
                            url: ""
                            },
                            prevImg: "",
                            additionalPrice: 0
                        },
                        {
                            isDefault: false,
                            name: "Gray",
                            textColor: {
                            active: false,
                                sameForBorder:false,
                                name:"",
                                codeHex:'#000000',
                            },
                            pattern: {
                            active: false,
                            codeHex: "#4f5756",
                            url: ""
                            },
                            prevImg: "",
                            additionalPrice: 0
                        },
                        {
                            isDefault: false,
                            name: "Pink",
                            textColor: {
                            active: false,
                                sameForBorder:false,
                                name:"",
                                codeHex:'#000000',
                            },
                            pattern: {
                            active: false,
                            codeHex: "#bc4077",
                            url: ""
                            },
                            prevImg: "",
                            additionalPrice: 0
                        },
                        {
                            isDefault: false,
                            name: "Purple",
                            textColor: {
                            active: false,
                                sameForBorder:false,
                                name:"",
                                codeHex:'#000000',
                            },
                            pattern: {
                            active: false,
                            codeHex: "#554585",
                            url: ""
                            },
                            prevImg: "",
                            additionalPrice: 0
                        },
                        {
                            isDefault: false,
                            name: "Orange",
                            textColor: {
                            active: false,
                                sameForBorder:false,
                                name:"",
                                codeHex:'#000000',
                            },
                            pattern: {
                            active: false,
                            codeHex: "#e15616",
                            url: ""
                            },
                            prevImg: "",
                            additionalPrice: 0
                        },
                        {
                            isDefault: false,
                            name: "Brown",
                            textColor: {
                            active: false,
                                sameForBorder:false,
                                name:"",
                                codeHex:'#000000',
                            },
                            pattern: {
                            active: false,
                            codeHex: "#523d2a",
                            url: ""
                            },
                            prevImg: "",
                            additionalPrice: 0
                        }
                        ]
                    },
                    shapes: [
                        {
                        isDefault: false,
                        shapeId: 1,
                        additionalPrice: 0
                        },
                        {
                        isDefault: true,
                        shapeId: 3,
                        additionalPrice: 0
                        },
                        {
                        isDefault: false,
                        shapeId: 4,
                        additionalPrice: 0
                        },
                        {
                        isDefault: false,
                        shapeId: 0,
                        additionalPrice: 0
                        },
                        {
                        isDefault: false,
                        shapeId: 9,
                        additionalPrice: 0
                        },
                        {
                        isDefault: false,
                        shapeId: 5,
                        additionalPrice: 0
                        },
                        {
                        isDefault: false,
                        shapeId: 6,
                        additionalPrice: 0
                        },
                        {
                        isDefault: false,
                        shapeId: 2,
                        additionalPrice: 0
                        }
                    ],
                    borders: {
                        settings: {
                            colors: [
                                {
                                name: "White",
                                codeHex: "#ffffff",
                                prevImg: "",
                                additionalPrice: 0
                                },
                                {
                                name: "Black",
                                codeHex: "#000000",
                                prevImg: "",
                                additionalPrice: 0
                                },
                                {
                                name: "Blue",
                                codeHex: "#004f86",
                                prevImg: "",
                                additionalPrice: 0
                                },
                                {
                                name: "Red",
                                codeHex: "#c4271d",
                                prevImg: "",
                                additionalPrice: 0
                                },
                                {
                                name: "Green",
                                codeHex: "#009251",
                                prevImg: "",
                                additionalPrice: 0
                                },
                                {
                                name: "Yellow",
                                codeHex: "#fee900",
                                prevImg: "",
                                additionalPrice: 0
                                },
                                {
                                name: "Gray",
                                codeHex: "#4f5756",
                                prevImg: "",
                                additionalPrice: 0
                                },
                                {
                                name: "Pink",
                                codeHex: "#bc4077",
                                prevImg: "",
                                additionalPrice: 0
                                },
                                {
                                name: "Purple",
                                codeHex: "#554585",
                                prevImg: "",
                                additionalPrice: 0
                                },
                                {
                                name: "Orange",
                                codeHex: "#e15616",
                                prevImg: "",
                                additionalPrice: 0
                                },
                                {
                                name: "Brown",
                                codeHex: "#523d2a",
                                prevImg: "",
                                additionalPrice: 0
                                }
                            ],
                            enableBorderWidth: false,
                            enableBorderColor: true,
                            borderColorsLabel:"Borders Colors",
                                customColorsPrevImg:''
                        },
                        allBorders: [
                        {
                            isDefault: true,
                            manageBorderId: 0,
                            additionalPrice: 0,
                            excludeSizes: [],
                            excludeShapes: []
                        },
                        {
                            isDefault: false,
                            manageBorderId: 1,
                            additionalPrice: 0,
                            excludeSizes: [],
                            excludeShapes: []
                        },
                        {
                            isDefault: true,
                            manageBorderId: 2,
                            additionalPrice: 0,
                            excludeSizes: [],
                            excludeShapes: []
                        },
                        {
                            isDefault: false,
                            manageBorderId: 3,
                            additionalPrice: 0,
                            excludeSizes: [],
                            excludeShapes: []
                        }
                        ]
                    },
                    textImages: {
                        enableText: true,
                        enableImage: true
                    },
                    fixingMethods: [
                        {
                        isDefault: true,
                        fixingMethodId: 0,
                        additionalPrice: 0,
                        excludeSizes: [],
                        excludeShapes: []
                        },
                        {
                        isDefault: false,
                        fixingMethodId: 6,
                        additionalPrice: 4.8,
                        excludeSizes: [
                            12,
                            13,
                            14,
                            15,
                            16,
                            17
                        ],
                        excludeShapes: [
                            4,
                            0,
                            9,
                            2
                        ]
                        },
                        {
                        isDefault: false,
                        fixingMethodId: 5,
                        additionalPrice: 1.1,
                        excludeSizes: [],
                        excludeShapes: [
                            5,
                            6
                        ]
                        },
                        {
                        isDefault: false,
                        fixingMethodId: 9,
                        additionalPrice: 13.1,
                        excludeSizes: [
                            1,
                            2,
                            3,
                            4,
                            15,
                            16,
                            17
                        ],
                        excludeShapes: [
                            4,
                            0,
                            9,
                            2
                        ]
                        }
                    ],
                    additionalOptions: []
                }
            }
        ]
    }
});
const includeDemo = ref(false);

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
const manageFonts = ref([]);
onMounted(async () => {
    isFetching.value = true;
    await fetchConfigs();
    canAddNew.value = true;
    await fetchFonts();
});

const closeCloneModal = ()=> {
    openCloneModal.value=false;
    newConfig.value = {
        name:"",
        description:"",
        icon:"",
        popImg:"",
    }
}

const fetchFonts = async () =>{
    const result = await api.getManagefonts();
    if(!result.message){
        let tab=[]
        manageFonts.value = result.map((font,id)=>id);
    }else{
        manageFonts.value = [];
    }
}

const fetchConfigs = async () => {
    let tab=[];
    const allConfigs = await api.getConfigs();
    configs.value = allConfigs.data;
    for (let index = 0; index < allConfigs.data.length; index++) {
        tab.push(false);
    }
    showParams.value = tab;
    totalPages.value = allConfigs.totalPages;
    totalConfigsFound.value = allConfigs.totalConfigsFound;
    pages.value = allConfigs.totalPages;
    isFetching.value = false;
}

const handleOpenConfigParams = (key)=>{
    for (let index = 0; index < showParams.value.length; index++) {
       if(key!=index){
        showParams.value[index]=false;
       }else{
        showParams.value[key]=!showParams.value[key];
       }
    }
}

/**Function search */
const searchInputEmpty = async (e) => {
    if(e.target.value ==''){
        isFetching.value = true;
        const response = await api.getConfigs();
        configs.value = response.data;
        let tab=[];
        for (let index = 0; index < response.data.length; index++) {
            tab.push(false);
            
        }
        showParams.value = tab;
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
    let tab=[];
    for (let index = 0; index < response.data.length; index++) {
        tab.push(false);
        
    }
    showParams.value = tab;
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
       let tab=[];
        for (let index = 0; index < response.data.length; index++) {
            tab.push(false);
            
        }
        showParams.value = tab;
       page.value = nextPage;
    }
        
}
const changePage = async(pg) => {
    var response = await api.getConfigs('?page='+pg)
    configs.value = response.data;
    let tab=[];
        for (let index = 0; index < response.data.length; index++) {
            tab.push(false);
            
        }
        showParams.value = tab;
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
const addNewConfig = async (configuration) => {
    isLoading.value = true;
    const result = await api.addConfig(configuration);
    if(result.success){
        await fetchConfigs();
        newConfig.value = {
            name:"",
            description:"",
            icon:"",
            popImg:"",
        }
        toastMessage(result.message);
        selectedDemo.value = 'acrylic';
        openCloneModal.value=false;
        
    }else{
        newConfig.value = {
            name:"",
            description:"",
            icon:"",
            popImg:"",
        }
        toastMessage(result.message,"error");
        openCloneModal.value=false;
        selectedDemo.value = 'acrylic';
        
    }
    isLoading.value = false;
}

const includeMetaData = async (state) => {
    if(state){
        isLoading.value = true;
        let configuration = {
            ...newConfig.value,
            data:{
                ...defaultSettings.value,
                materials:metaConfigs.value[selectedDemo.value].materials,
            }
        }
        if(manageFonts.value.length>0){
            configuration.data.settings.customizerSign.text.selectedFonts = manageFonts.value;
        }else{
            await api.addManagefont({many:true,fonts:[
                {
                    "label": "Abhaya Libre",
                    "url": "http://fonts.gstatic.com/s/abhayalibre/v14/e3t5euGtX-Co5MNzeAOqinEYo23yr9xI6oYtBA.woff2",
                    "isGoogleFont": true
                },
                {
                    "label": "Abril Fatface",
                    "url": "http://fonts.gstatic.com/s/abrilfatface/v23/zOL64pLDlL1D99S8g8PtiKchm-VsjOLhZBY.woff2",
                    "isGoogleFont": true
                },
                {
                    "label": "Advent Pro",
                    "url": "http://fonts.gstatic.com/s/adventpro/v23/V8mqoQfxVT4Dvddr_yOwrzaFxV7JtdQgFqXdUAQrGp_zgX5sWCpLHSNPSZoonw1aBA.woff2",
                    "isGoogleFont": true
                },
                {
                    "label": "Akron",
                    "url": "http://fonts.gstatic.com/s/akronim/v23/fdN-9sqWtWZZlHRp-gVxkFYN-a8.woff2",
                    "isGoogleFont": true
                },
                {
                    "label": "Bellefair",
                    "url": "http://fonts.gstatic.com/s/bellefair/v14/kJExBuYY6AAuhiXUxG19-vA2pOdvDA.woff2",
                    "isGoogleFont": true
                },
            ]});
            await fetchFonts();
            configuration.data.settings.customizerSign.text.selectedFonts = manageFonts.value;
        }
        if(selectedDemo.value == 'double-side'){
            configuration.data.settings.customizerSign.signPart.doublePart.active=true; 
            configuration.data.settings.customizerSign.signPart.doublePart.part1="Face A"; 
            configuration.data.settings.customizerSign.signPart.doublePart.part2="Face B"; 
        }
        await addNewConfig(configuration);
    }else{
        const configuration = {
            ...newConfig.value,
            data:{
                ...defaultSettings.value,
                materials:[]
            }
        }
        await addNewConfig(configuration);
    }
    step.value = 0;
    isNewConfig.value = false;
    includeDemo.value=false;
}

/* Function pour edit config */
const selectEditConfig = (config,duplicate=false)=>{
    if(duplicate){
        newConfig.value = config;
        openCloneModal.value=true;
    }else{
        newConfig.value = {id:config.id,name:config.name, description:config.description, icon:config.icon, popImg:config.popImg}
        step.value = 1;
        isEdit.value = true;
    }
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
            name:"",
            description:"",
            icon:"",
            popImg:"",
        }
    }else{
        isLoading.value = false;
        newConfig.value = {
            name:"",
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
const goToMaterial = (c)=>{
    router.push('/configs/'+c.name.replace(/ /,'-')+'/'+c.id+'/materials')
    .then(() => {
      // Recharger la page après la navigation
      window.location.reload()
    })
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
                newConfig.value = {
                    name:"",
                    description:"",
                    icon:"",
                    popImg:"",
                }
            }
            step.value = level - 1;
            includeDemo.value = false;
       }
   }else{
      if(!isLoading.value){
        newConfig.value = {
            name:"",
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