<template>
    <div class="aso-h-[100vh]">
        <div class="aso-space-y-2 aso-translate-y-1" v-show="!isNew">
            <div class="aso-bg-[#F8F9FB] aso-flex aso-px-4 aso-py-4 aso-space-x-2 aso-sticky aso-top-[80px] aso-z-[999]">
                <div class="aso-text-[16px] aso-font-bold aso-cursor-pointer" @click="$router.push('/manage-cliparts')" >
                    Clipart groups
                </div>
                <img class="aso-w-4 aso-h-4 aso-py-1" src="../../../../assets/icons/ic_crochet.svg" alt="">
                <div class="aso-text-[14px] aso-text-[#292C33] aso-translate-y-0.5">
                    {{groupTitle}}
                </div>
            </div>
            <div v-if="!isFetching" class="so-sticky aso-top-[120px] aso-flex aso-justify-end aso-space-x-2 aso-w-4/4 aso-bg-[#F8F9FB] aso-text-[12px] aso-px-4 aso-py-4 aso-pb-2 aso-sticky aso-top-[130px] aso-z-[999]">
                <button class="aso-flex aso-w-fit aso-h-fit aso-rounded aso-bg-[#016464] aso-px-4 aso-space-x-2 aso-p-1.5 aso-border-none aso-text-white aso-opacity-90 hover:aso-opacity-100 aso-cursor-pointer" @click="addClipart">
                    <svg class="aso-w-5 aso-h-5" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="plus-lg">
                        <path id="Vector" fill-rule="evenodd" clip-rule="evenodd" d="M11 2.75C11.1823 2.75 11.3572 2.82243 11.4861 2.95136C11.6151 3.0803 11.6875 3.25516 11.6875 3.4375V10.3125H18.5625C18.7448 10.3125 18.9197 10.3849 19.0486 10.5139C19.1776 10.6428 19.25 10.8177 19.25 11C19.25 11.1823 19.1776 11.3572 19.0486 11.4861C18.9197 11.6151 18.7448 11.6875 18.5625 11.6875H11.6875V18.5625C11.6875 18.7448 11.6151 18.9197 11.4861 19.0486C11.3572 19.1776 11.1823 19.25 11 19.25C10.8177 19.25 10.6428 19.1776 10.5139 19.0486C10.3849 18.9197 10.3125 18.7448 10.3125 18.5625V11.6875H3.4375C3.25516 11.6875 3.0803 11.6151 2.95136 11.4861C2.82243 11.3572 2.75 11.1823 2.75 11C2.75 10.8177 2.82243 10.6428 2.95136 10.5139C3.0803 10.3849 3.25516 10.3125 3.4375 10.3125H10.3125V3.4375C10.3125 3.25516 10.3849 3.0803 10.5139 2.95136C10.6428 2.82243 10.8177 2.75 11 2.75Z" fill="white"/>
                        </g>
                    </svg>
                    <div class="aso-text-[14px]">
                        Add new cliparts
                    </div>
                </button>
            </div>
            <div id="monTableau" class="aso-h-[80vh] aso-overflow-y-auto aso-overflow-x-hidden aso-translate-y-4">
                <table class="aso-text-center aso-border aso-border-collapse aso-border-0 aso-w-full">
                    <thead class="aso-text-[14px] aso-bg-[#f0f0f1] aso-sticky aso-top-[0px] aso-z-[99]">
                        <tr class="">
                            <th scope="col" class="aso-font-normal aso-px-6 aso-py-3">
                                Title
                            </th>
                            <th scope="col" class="aso-font-normal aso-px-6 aso-py-3">
                                Image
                            </th>
                            <th scope="col" class="aso-font-normal aso-px-6 aso-py-3">
                                Additional Price
                            </th>
                            <th scope="col" class="aso-font-normal aso-px-6 aso-py-3">
                                Action
                            </th>
                            
                        </tr>
                    </thead>
                    <tbody class="aso-bg-white">
                        <tr v-if="isFetching">
                            <td colspan="4">
                                <div class="aso-bg-white aso-border-solid aso-border aso-border-[#D1D1D1] aso-flex aso-flex-col aso-space-y-2 aso-justify-center aso-items-center aso-w-full aso-h-[306px] p-4">
                                    <img class="aso-w-[200px] aso-h-[200px]" src="../../../../assets/icons/ic_loading.svg" alt="">
                                </div>
                            </td>
                        </tr>
                        <tr  v-if="clipartGroups.length == 0 && !isFetching">
                            <td colspan="4">
                                <div class="aso-bg-white aso-border-solid aso-border aso-border-[#D1D1D1] aso-flex aso-flex-col aso-space-y-12 aso-justify-center aso-items-center aso-py-10 aso-h-[306px]">
                                    <div class="aso-flex aso-flex-col aso-space-y-2 aso-justify-center aso-items-center">
                                        <p class="aso-text-2xl aso-font-bold">{{notFoundMessage}}</p>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr v-for="(clipart,key) in clipartGroups" :key="key" class="aso-border-t-0 aso-border-l-0 aso-border-r-0 aso-border-b-2 aso-border-solid aso-border-[#f0f0f1]">
                            <td class="aso-px-6 aso-text-[14px] aso-py-2">
                                {{clipart.title}}
                            </td>
                            <td class="aso-px-6 aso-justify-center aso-translate-y-1">
                                <img class="aso-w-10 aso-h-10 aso-rounded" :src="clipart.url" alt="" v-if="clipart.url != ''">

                            </td>
                            <td class="aso-px-6 aso-text-[12px] aso-py-2 aso-space-x-2">
                                <span class="aso-w-fit aso-rounded-lg aso-text-center aso-p-1 aso-px-2 aso-bg-[#9ACD321F] aso-text-[#466801] aso-border-none">
                                    {{clipart.additionalPrice + ' '+ currency_symbol}}
                                </span>
                            </td>
                            <td class="aso-px-6 aso-py-2 aso-flex aso-justify-center">
                                <button :class="`aso-bg-transparent aso-border-none aso-text-[#2DD05B] aso-cursor-pointer ${$route.path == '/groups-cliparts' ? ``: ``}`" @click="selectClipart(key,clipart)">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="aso-w-5 aso-h-5">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                    </svg>
                                </button>
                                <button class="aso-bg-transparent aso-border-none aso-text-[#A00000] aso-cursor-pointer" @click="selectClipart(key,clipart,true)">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="aso-w-5 aso-h-5">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                    </svg>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="aso-space-y-1 aso-translate-y-9" v-if="isNew">
            <div class="aso-bg-[#F8F9FB] aso-flex aso-px-4 aso-py-4 aso-space-x-2">
                <div class="aso-text-[16px] aso-font-bold">
                    {{isEdit ? 'Edit clipart' :'Add cliparts'}}
                </div>
            </div>
            <div class="aso-flex aso-bg-[#F8F9FB] aso-space-x-10 aso-font-semibold aso-px-4 aso-py-4" v-if="!isEdit">
                <label>Upload Images</label>
                <div class="aso-flex aso-items-center aso-translate-x-2 aso-translate-y-0.5">
                    <label for="toggleUploadImage" class="aso-relative aso-inline-flex aso-items-center aso-cursor-pointer aso-border-[1px] aso-border-solid aso-border-black aso-rounded-full">
                        <input id="toggleUploadImage" type="checkbox" name="toggleUploadImage" class="aso-sr-only aso-peer" v-model="useApi">
                        <div :class="`peer-checked:after:aso-border-[#016464] peer-checked:after:aso-border-solid peer-checked:after:aso-border-[5px] peer-checked:after:aso-top-[-2px] peer-checked:after:aso-translate-y-[-15%] aso-w-10 aso-h-3 aso-border aso-border-[5px] aso-border-[#016464] aso-bg-zinc-300 aso-rounded-full aso-peer peer-checked:after:aso-translate-x-[140%] after:aso-content-[''] after:aso-absolute after:aso-top-[-2px] after:aso-left-[-5px] after:aso-bg-zinc-300 after:aso-border-white after:aso-border-solid after:aso-translate-y-[-15%] after:aso-border-[#FFFFFF] after:aso-border-[5px] after:aso-rounded-full after:aso-h-2.5 after:aso-w-2.5 after:aso-transition-all after:aso-shadow-lg`"></div>
                    </label>
                </div>
                <label>Use Cliparts API</label>
            </div>
            <div class="aso-bg-[#F8F9FB] aso-px-4 aso-py-4 aso-space-y-8" v-if="!useApi && isEdit">
                <div class="aso-flex aso-justify-between">
                    <div class="aso-w-2/5 aso-space-y-2 aso-flex aso-flex-col aso-text-[14px]">
                        <label for="" class="aso-font-normal">Title</label>
                        <input type="text" v-model="clipart.title"  class="aso-rounded aso-w-full aso-h-[35px]">
                    </div>
                    <div class="aso-w-2/5 aso-flex aso-flex-col aso-text-[12px]">
                        <label for="" class="aso-font-normal">Upload icon</label>
                        <div class="aso-flex aso-flex-col aso-space-y-2 aso-w-full aso-pt-2 aso-w-1/2">
                            <div class="aso-flex">
                                <button @click="selectClipartImage" class="aso-bg-[#016464] aso-border-none aso-w-fit aso-h-fit aso-p-3 aso-rounded aso-px-4 aso-text-white aso-opacity-90 hover:aso-opacity-100 aso-text-[10px] aso-cursor-pointer">upload image</button>
                                <div :class="`aso-relative aso-w-[82px] aso-h-[49px] aso-rounded-md aso-overflow-hidden`">
                                    <img v-if="clipart.url != ''" :src="clipart.url" alt="" class="aso-absolute aso-w-full aso-h-full">
                                    <button v-if="clipart.url != ''" @click="()=>{clipart.url = ''}" :class="`aso-bg-[#016464] aso-absolute aso-bottom-0 aso-right-0 aso-text-white aso-p-1 aso-rounded-tl-lg aso-border-none`">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="aso-w-4 aso-h-4">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="aso-w-full aso-space-y-2 aso-flex aso-flex-col aso-text-[14px]">
                    <label for="" class="aso-font-normal">Additional Price</label>
                    <input type="number" v-model="clipart.additionalPrice" class="aso-rounded aso-w-[1/3] aso-h-[35px]"/>
                </div>
            </div>
            <div class="aso-relative aso-bg-[#F8F9FB] aso-px-4 aso-py-4 aso-space-y-2 aso-h-[60vh] aso-overflow-y-auto aso-overflow-x-hidden" v-if="!useApi && !isEdit">
                <div class="aso-flex aso-justify-between aso-items-center aso-relative aso-space-x-2" :key="key" v-for="(clipart,key) in cliparts">
                    <div class="aso-w-1/4 aso-space-y-2 aso-flex aso-flex-col aso-text-[14px]">
                        <label for="" class="aso-font-normal">Title</label>
                        <input type="text" v-model="cliparts[key].title"  class="aso-rounded aso-w-full aso-h-[35px]">
                    </div>
                    <div class="aso-w-1/4 aso-space-y-2 aso-flex aso-flex-col aso-text-[14px]">
                        <label for="" class="aso-font-normal">Additional Price</label>
                        <input type="number" v-model="cliparts[key].additionalPrice" class="aso-rounded aso-w-[1/3] aso-h-[35px]"/>
                    </div>
                    <div class="aso-w-1/4 aso-flex aso-flex-col aso-text-[12px]">
                        <label for="" class="aso-font-normal">Upload icon</label>
                        <div class="aso-flex aso-flex-col aso-space-y-2 aso-w-full aso-pt-2">
                            <div class="aso-flex">
                                <button @click="(e)=>selectClipartImage(e,key)" class="aso-bg-[#016464] aso-border-none aso-w-fit aso-h-fit aso-p-3 aso-rounded aso-px-4 aso-text-white aso-opacity-90 hover:aso-opacity-100 aso-text-[10px] aso-cursor-pointer">upload image</button>
                                <div :class="`aso-relative aso-w-[82px] aso-h-[49px] aso-rounded-md aso-overflow-hidden`">
                                    <img v-if="cliparts[key].url != ''" :src="cliparts[key].url" alt="" class="aso-absolute aso-w-full aso-h-full">
                                    <button v-if="cliparts[key].url != ''" @click="()=>{cliparts[key].url = ''}" :class="`aso-bg-[#016464] aso-absolute aso-bottom-0 aso-right-0 aso-text-white aso-p-1 aso-rounded-tl-lg aso-border-none`">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="aso-w-4 aso-h-4">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div @click="handleDeleteClipartSelected(key)" class="aso-flex aso-absolute aso-justify-center aso-items-center aso-right-2 aso-top-2 aso-shadow-md aso-rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="aso-w-6 aso-h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                    </div>
                </div>
                <div class="aso-pt-4">
                    <button :disabled="isLoading" @click="handleAddClipart" class="aso-flex aso-jsutify-center aso-items-center aso-bg-[#016464] aso-rounded aso-w-fit aso-space-x-2 aso-h-fit aso-text-white aso-px-8 aso-p-2.5 aso-rounded aso-border-none hover:aso-opacity-100 hover:aso-border-none hover:aso-text-white hover:aso-bg-[#016464] aso-cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="aso-w-6 aso-h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                        <span class="aso-font-semibold aso-text-[16px]">Add cliparts</span>
                    </button>
                </div>
            </div>
            <div class="aso-bg-[#F8F9FB] aso-px-4 aso-py-4 aso-space-y-8" v-if="useApi && !makeChoice">
                <div class="aso-flex aso-justify-start aso-items-center">
                    <div class="aso-w-2/5 aso-space-y-2 aso-flex aso-flex-col aso-text-[14px]">
                        <select id="" v-model="selectedCategory" class="aso-h-[40px]">
                            <option value="animals">Animals</option>
                            <option value="arrows">Arrows</option>
                            <option value="decorationFestivities">Decoration & Festivities</option>
                            <option value="emojisFlags">Emojis & Flags</option>
                            <option value="foodsDrinks">Foods & Drinks</option>
                            <option value="healthcare">Healthcare</option>
                            <option value="householdTools">Household Tools</option>
                            <option value="mostPopular">Most Popular</option>
                            <option value="peoples">Peoples</option>
                            <option value="plantsNature">Plants & Nature</option>
                            <option value="prohibitionsWarnings">Prohibitions & Warnings</option>
                            <option value="shapes">Shapes</option>
                            <option value="sportActivities">Sport & Activities</option>
                            <option value="symbolsMarkings">Symbols & Markings</option>
                            <option value="vehiclesTraffic">Vehicles & Traffic</option>
                            <option value="others">Others</option>
                        </select>
                    </div>
                    <div class="aso-bg-[#016464] aso-rounded">
                        <button @click="getApiCliparts" class="aso-flex aso-bg-transparent aso-w-fit aso-space-x-2 aso-h-fit aso-text-white aso-px-8 aso-p-2.5 aso-rounded aso-border-none aso-opacity-90 hover:aso-opacity-100 hover:aso-border-none hover:aso-text-white hover:aso-bg-[#016464] aso-cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="aso-w-6 aso-h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                            </svg>
                            <span class="aso-font-semibold aso-text-[16px]">Get</span>
                        </button>
                    </div>
                </div>
                <div v-if="apiCliparts.length>0">
                    <h2 class="aso-font-bold aso-font-[15px]">Images found</h2>
                </div>
                <div class="aso-grid aso-grid-cols-8 aso-py-4 aso-px-4 aso-h-[50vh] aso-overflow-y-auto aso-overflow-x-hidden" v-if="apiCliparts.length>0">
                    <div v-for="(clipart,key) in apiCliparts" :key="key" class="aso-relative aso-flex aso-justify-center aso-items-center aso-w-[60px] aso-h-[60px] aso-rounded" :class="clipartsSelected[key] ? 'aso-ring-4 aso-ring-[#016464]' : ''">
                        <input type="checkbox" :id="'clipart'+key" class="hiddenInput" @change="(e)=>handleSelectClipart(e,key)">
                        <label :for="'clipart'+key">
                            <div v-if="clipartsSelected[key]" class="aso-z-[2] aso-absolute aso-top-0 aso-right-0 aso-flex aso-items-center aso-justify-between aso-bg-white aso-rounded-b">
                                <input type="checkbox" :id="'clipart'+key" :checked="clipartsSelected[key]??false">
                            </div>
                            <div class="aso-w-[50px] aso-h-[50px] aso-relative">
                                <img :src="clipart" alt="Image 1" class="aso-w-full aso-h-full aso-cursor-pointer aso-absolute aso-rounded">
                            </div>
                        </label>
                    </div>
                </div>
                <div class="aso-flex aso-justify-end aso-items-center" v-if="Object.keys(clipartsSelected).length > 0">
                    <div class="aso-bg-[#016464] aso-rounded">
                        <button @click="displayAllChoice" class="aso-flex aso-bg-transparent aso-w-fit aso-space-x-2 aso-h-fit aso-text-white aso-px-8 aso-p-2.5 aso-rounded aso-border-none aso-opacity-90 hover:aso-opacity-100 hover:aso-border-none hover:aso-text-white hover:aso-bg-[#016464] aso-cursor-pointer">
                            <span class="aso-font-semibold aso-text-[16px]">I made my choices</span>
                        </button>
                    </div>
                </div>
            </div>
            <div class="aso-bg-[#F8F9FB] aso-px-4 aso-py-4 aso-space-x-4" v-if="makeChoice">
                <div class="aso-grid aso-grid-cols-3 aso-py-4 aso-px-4 aso-h-[50vh] aso-overflow-y-auto aso-overflow-x-hidden">
                    <div class="aso-flex aso-justify-between aso-items-center aso-relative aso-space-x-2" :key="key" v-for="(clipart,key) in cliparts">
                        <div class="aso-space-y-2 aso-flex aso-flex-col aso-text-[12px]">
                            <label for="" class="aso-font-normal">Image</label>
                            <div :class="`aso-relative aso-w-[60px] aso-h-[60px] aso-rounded-md aso-overflow-hidden`">
                                <img v-if="clipart.url != ''" :src="clipart.url" alt="" class="aso-absolute aso-w-full aso-h-full">
                            </div>
                        </div>
                        <div class="aso-space-y-2 aso-flex aso-flex-col aso-text-[14px]">
                            <label for="" class="aso-font-normal">Title</label>
                            <input type="text" v-model="cliparts[key].title" class="aso-rounded aso-w-full aso-h-[35px]">
                        </div>
                        <div class=" aso-space-y-2 aso-flex aso-flex-col aso-text-[14px]">
                            <label for="" class="aso-font-normal">Additional Price</label>
                            <input type="number" v-model="cliparts[key].additionalPrice" class="aso-rounded aso-w-[1/3] aso-h-[35px]"/>
                        </div>
                        <div @click="handleDeleteClipartSelected(key)" class="aso-flex aso-absolute aso-justify-center aso-items-center aso-right-2 aso-top-2 aso-shadow-md aso-rounded-full aso-cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="aso-w-6 aso-h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="aso-bg-[#F8F9FB] aso-flex aso-font-bold aso-space-x-4 aso-px-4 aso-py-4 aso-justify-end aso-items-end">
                <div class="aso-bg-[#016464] aso-rounded">
                    <button :disabled="isLoading" class="aso-flex aso-bg-transparent aso-w-fit aso-space-x-2 aso-h-fit aso-px-8 aso-p-2 aso-border-none aso-text-white aso-opacity-90 hover:aso-border-none hover:aso-text-white hover:aso-opacity-100 aso-cursor-pointer" @click="back">
                        <svg class="aso-w-6 aso-h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 12L5 8V11L17.17 11C17.3756 10.414 17.7586 9.90661 18.2657 9.54821C18.7729 9.18981 19.379 8.9982 20 9C20.7956 9 21.5587 9.31607 22.1213 9.87868C22.6839 10.4413 23 11.2044 23 12C23 12.7956 22.6839 13.5587 22.1213 14.1213C21.5587 14.6839 20.7956 15 20 15C18.69 15 17.58 14.17 17.17 13L5 13V16L1 12Z" fill="currentColor"/>
                        </svg>

                        <div class="aso-font-semibold aso-text-[16px]">Back</div>
                    </button>
                </div>
                <div class="aso-bg-[#016464] aso-rounded" v-if="isEdit">
                    <button @click="updateClipart" :class="`aso-rounded aso-flex ${!isLoading ? 'aso-bg-amber-400 ' :'aso-bg-amber-500'} aso-w-fit aso-space-x-2 aso-h-fit aso-px-8 aso-text-white aso-p-2 aso-border-none aso-opacity-90 hover:aso-border-none hover:aso-text-white hover:aso-opacity-100 aso-cursor-pointer`">
                        <img src="../../../../assets/icons/ic_loading_gray.svg" class="aso-w-5 aso-w-5" v-if="isLoading" :disabled="isLoading"/>
                        <div class="aso-font-semibold aso-text-[16px]">Update</div>
                    </button>
                </div>
                <div class="aso-bg-[#016464] aso-rounded" v-if="!isEdit">
                    <button @click="saveClipart" class="aso-flex aso-bg-transparent aso-w-fit aso-space-x-2 aso-h-fit aso-text-white aso-px-8 aso-p-2.5 aso-rounded aso-border-none aso-opacity-90 hover:aso-opacity-100 hover:aso-border-none hover:aso-text-white hover:aso-bg-[#016464] aso-cursor-pointer">
                        <div class="aso-translate-y-1">
                            <img src="../../../../assets/icons/ic_loading_gray.svg" class="aso-w-5 aso-w-5" v-if="isLoading" :disabled="isLoading"/>
                            <svg v-if="!isLoading" class="aso-w-4 aso-h-4" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2.5 1.25C2.16848 1.25 1.85054 1.3817 1.61612 1.61612C1.3817 1.85054 1.25 2.16848 1.25 2.5V17.5C1.25 17.8315 1.3817 18.1495 1.61612 18.3839C1.85054 18.6183 2.16848 18.75 2.5 18.75H17.5C17.8315 18.75 18.1495 18.6183 18.3839 18.3839C18.6183 18.1495 18.75 17.8315 18.75 17.5V2.5C18.75 2.16848 18.6183 1.85054 18.3839 1.61612C18.1495 1.3817 17.8315 1.25 17.5 1.25H11.875C11.5435 1.25 11.2255 1.3817 10.9911 1.61612C10.7567 1.85054 10.625 2.16848 10.625 2.5V11.6163L13.9325 8.3075C14.0499 8.19014 14.209 8.12421 14.375 8.12421C14.541 8.12421 14.7001 8.19014 14.8175 8.3075C14.9349 8.42486 15.0008 8.58403 15.0008 8.75C15.0008 8.91597 14.9349 9.07514 14.8175 9.1925L10.4425 13.5675C10.3844 13.6257 10.3155 13.6719 10.2395 13.7034C10.1636 13.7349 10.0822 13.7511 10 13.7511C9.91779 13.7511 9.83639 13.7349 9.76046 13.7034C9.68453 13.6719 9.61556 13.6257 9.5575 13.5675L5.1825 9.1925C5.12439 9.13439 5.07829 9.0654 5.04685 8.98948C5.0154 8.91356 4.99921 8.83218 4.99921 8.75C4.99921 8.66782 5.0154 8.58644 5.04685 8.51052C5.07829 8.4346 5.12439 8.36561 5.1825 8.3075C5.24061 8.24939 5.3096 8.20329 5.38552 8.17185C5.46144 8.1404 5.54282 8.12421 5.625 8.12421C5.70718 8.12421 5.78856 8.1404 5.86448 8.17185C5.9404 8.20329 6.00939 8.24939 6.0675 8.3075L9.375 11.6163V2.5C9.375 1.83696 9.63839 1.20107 10.1072 0.732233C10.5761 0.263392 11.212 0 11.875 0L17.5 0C18.163 0 18.7989 0.263392 19.2678 0.732233C19.7366 1.20107 20 1.83696 20 2.5V17.5C20 18.163 19.7366 18.7989 19.2678 19.2678C18.7989 19.7366 18.163 20 17.5 20H2.5C1.83696 20 1.20107 19.7366 0.732233 19.2678C0.263392 18.7989 0 18.163 0 17.5V2.5C0 1.83696 0.263392 1.20107 0.732233 0.732233C1.20107 0.263392 1.83696 0 2.5 0L5.625 0C5.79076 0 5.94973 0.065848 6.06694 0.183058C6.18415 0.300269 6.25 0.45924 6.25 0.625C6.25 0.79076 6.18415 0.949732 6.06694 1.06694C5.94973 1.18415 5.79076 1.25 5.625 1.25H2.5Z" fill="white"/>
                            </svg>
                        </div>

                        <span class="aso-font-semibold aso-text-[16px]">Save</span>
                    </button>
                </div>
            </div>
        </div>
        <!-- Delete Modal-->
        <div v-if="openModal" @click.self="closeModal" class="aso-bg-gray-400 aso-overflow-y-auto aso-overflow-x-hidden aso-fixed aso-top-0 aso-right-[25%] aso-left-[75%] aso-z-[99999] aso-flex aso-justify-center aso-items-center aso-w-full md:aso-inset-0 aso-h-[calc(100%-1rem)] aso-h-[100vh]">
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
                        <h3 class="aso-mb-5 aso-text-lg aso-font-normal aso-text-gray-500 dark:text-gray-400">Are you sure you want to delete this cliparts ?</h3>
                        <input v-model="clipart.title" readonly class="aso-rounded aso-w-full aso-h-[35px] aso-text-center aso-p-4 aso-my-2 aso-border-none" />
                        <button @click="deleteClipart" data-modal-hide="popup-modal" type="button" :class="`aso-border-solid aso-text-white ${!isLoading ? 'aso-bg-red-600 aso-cursor-pointer' :'aso-bg-red-700 aso-cursor-not-allowed'} hover:bg-red-800 focus:ring-4 focus:outline-none aso-my-2 aso-border-none  focus:ring-red-300 dark:focus:ring-red-800 aso-font-medium aso-rounded-lg aso-text-sm aso-inline-flex aso-items-center aso-px-5 aso-py-2.5 aso-text-center`">
                            <img src="../../../../assets/icons/ic_loading_gray.svg" class="aso-w-5 aso-w-5" v-if="isLoading" :disabled="isLoading"/>
                            Yes, I'm sure
                        </button>
                        <button @click.stop="closeModal" data-modal-hide="popup-modal" type="button" :class="`aso-border-solid aso-py-2.5 aso-px-5 aso-ms-3 aso-text-sm aso-font-medium aso-text-gray-900 aso-my-2  aso-border-gray-500 aso-border-white focus:outline-none aso-bg-white aso-rounded-lg aso-border aso-border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 ${isLoading ? 'aso-cursor-not-allowed' : 'aso-cursor-pointer'}`">No, cancel</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- Delete Modal-->
        <div v-if="openAlert" @click.self="closeAlert" :key="key" v-for="(clipart,key) in cliparts" class="aso-z-[99999] aso-bg-gray-400 aso-overflow-y-auto aso-overflow-x-hidden aso-fixed aso-top-0 aso-right-[25%] aso-left-[75%] aso-z-50 aso-flex aso-justify-center aso-items-center aso-w-full md:aso-inset-0 aso-h-[calc(100%-1rem)] aso-h-[100vh]">
            <div class="aso-relative aso-p-4 aso-w-full aso-max-w-md aso-max-h-full">
                <div class="aso-relative aso-bg-white aso-rounded-lg aso-shadow dark:bg-gray-700">
                    <button @click.stop="closeAlert" type="button" :class="`${isLoading ? 'aso-cursor-not-allowed' : 'aso-cursor-pointer'} aso-absolute aso-top-3 aso-end-2.5 aso-text-gray-400 aso-bg-transparent hover:bg-gray-200 hover:text-gray-900 aso-rounded-lg aso-text-sm aso-w-8 aso-h-8 aso-ms-auto aso-inline-flex aso-justify-center aso-items-center dark:hover:bg-gray-600 dark:hover:text-white`" data-alert-hide="popup-alert">
                        <svg class="aso-w-3 aso-h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                        <span class="aso-sr-only">Close alert</span>
                    </button>
                    <div class="aso-p-4 md:p-5 aso-text-center">
                        <svg class="aso-mx-auto aso-mb-4 aso-text-gray-400 aso-w-12 aso-h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                        </svg>
                        <h3 class="aso-mb-5 aso-text-lg aso-font-normal aso-text-gray-500 dark:text-gray-400">Are you sure you want to delete this color?</h3>
                        <input v-model="cliparts[key].title" readonly class="aso-rounded aso-w-full aso-h-[35px] aso-text-center aso-p-4 aso-my-2 aso-border-none" />
                        <button @click="handleDeleteNewClipart(key)" data-alert-hide="popup-alert" type="button" :class="`aso-border-solid aso-text-white ${!isLoading ? 'aso-bg-red-600 aso-cursor-pointer' :'aso-bg-red-700 aso-cursor-not-allowed'} hover:bg-red-800 focus:ring-4 focus:outline-none aso-my-2 aso-border-none  focus:ring-red-300 dark:focus:ring-red-800 aso-font-medium aso-rounded-lg aso-text-sm aso-inline-flex aso-items-center aso-px-5 aso-py-2.5 aso-text-center`">
                            <img src="../../../../assets/icons/ic_loading_gray.svg" class="aso-w-5 aso-w-5" v-if="isLoading" :disabled="isLoading"/>
                            Yes, I'm sure
                        </button>
                        <button @click.stop="closeAlert" data-alert-hide="popup-alert" type="button" :class="`aso-border-solid aso-py-2.5 aso-px-5 aso-ms-3 aso-text-sm aso-font-medium aso-text-gray-900 aso-my-2  aso-border-gray-500 aso-border-white focus:outline-none aso-bg-white aso-rounded-lg aso-border aso-border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 ${isLoading ? 'aso-cursor-not-allowed' : 'aso-cursor-pointer'}`">No, cancel</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import {onMounted, ref} from 'vue';
import api from '@/admin/Api/api';
import toastMessage from '@/admin/utils/functions';
import { useRoute } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const groupId = ref(route.params.groupId);
const clipartGroups = ref([]);
const apiCliparts = ref([]);
const cliparts = ref([
    {
        title:"",
        url:"",
        additionalPrice:0
    }
]);
const allCliparts = ref({});
const clipart = ref({
    title:"",
    url:"",
    additionalPrice:0
});
const makeChoice = ref(false);
const useApi = ref(false);
const selectedCategory = ref('animals');
const currency_symbol = ref(aso_data.currencySymbol);
const groupTitle = ref('');
const clipartId = ref(null);
const isFetching = ref(false);
const isLoading = ref(false);
const notFoundMessage = ref('');
const isNew = ref(false);
const isEdit = ref(false);
const openModal = ref(false);
const openAlert = ref(false);
onMounted(async () => {
    isFetching.value = true;
    await fetchCliparts(); 
    await fetchApiCliparts();
});


const changeMakeChoice = ()=> {
    makeChoice.value = !makeChoice.value;
}

const displayAllChoice= ()=> {
    var tab = [];
    for (const key in clipartsSelected.value) {
        if (Object.hasOwnProperty.call(clipartsSelected.value, key)) {
            tab.push({title:'',url:clipartsSelected.value[key],additionalPrice:0})
        }
    }
    cliparts.value = tab;
    changeMakeChoice();
}

const handleDeleteClipartSelected = ()=>{
    openAlert.value = true
}

const getApiCliparts = ()=>{
    apiCliparts.value = allCliparts.value[selectedCategory.value];
}
const fetchApiCliparts = async()=>{
    const result = await axios.get("https://signsdesigner.us/app/aso-cliparts/cliparts.json");
    allCliparts.value = result.data;
}
const clipartsSelected = ref({})
const handleSelectClipart = (e,key)=> {
    if(e.target.checked) {
        clipartsSelected.value[key]=apiCliparts.value[key];
    }else{
        delete clipartsSelected.value[key];
    }
}

const fetchCliparts = async () => {
    const result = await api.getManageClipartItems(groupId.value);
    groupTitle.value = result.groupTitle;
    if(!result.notFoundMessage){
        clipartGroups.value = result.cliparts;
    }else{
        notFoundMessage.value = result.notFoundMessage;
    }
    isFetching.value = false;
}
const handleAddClipart = ()=> {
    cliparts.value.push({
        title:"",
        url:"",
        additionalPrice:0
    });
}
const saveClipart = async ()=>{
    isLoading.value = true;
    const result = await api.addManageclipartItem(groupId.value,cliparts.value);
    if(result.success){
        await fetchCliparts();
        isLoading.value= false;
        toastMessage(result.message);
        isNew.value = false;
        cliparts.value = [{
            title:"",
            url:"",
            additionalPrice:0
        }];
        clipartsSelected.value = {};
        makeChoice.value=false;

    }else{
        isLoading.value= false;
        toastMessage(result.message,'error');
        isNew.value = false;
        cliparts.value = [{
            title:"",
            url:"",
            additionalPrice:0
        }];
        clipartsSelected.value = {};
        makeChoice.value=false;
    }
}
const selectClipart = (id,cl,isdeleting=false) => {
    clipartId.value = id;
    clipart.value = cl;
    if(isdeleting){
        closeModal();
    }else{
        isEdit.value = true;
        addClipart();
    }
}
const updateClipart = async ()=>{
    isLoading.value = true;
    const result = await api.updateManageClipartItem(groupId.value,clipartId.value,clipart.value);
    if(result.success){
        await fetchCliparts();
        isLoading.value= false;
        if(result.success == true){
            toastMessage(result.message);
        }else{
            toastMessage(result.message,"warning")
        }
        isNew.value = false;
        clipartId.value = null;
        clipart.value = {
            title:"",
            url:"",
            additionalPrice:0
        }

    }else{
        isLoading.value= false;
        toastMessage(result.message,'error');
        isNew.value = false;
        clipartId.value = null;
        clipart.value = {
            title:"",
            url:"",
            additionalPrice:0
        }

    }
}
const deleteClipart = async ()=>{
    isLoading.value = true;
    const result = await api.deleteManageclipartItem(groupId.value,clipartId.value);
    if(result.success){
        await fetchCliparts();
        isLoading.value= false;
        toastMessage(result.message);
        clipartId.value = null;
        clipart.value = {
            title:"",
            url:"",
            additionalPrice:0
        }
        closeModal();
    }else{
        isLoading.value= false;
        toastMessage(result.message,'error');
        clipartId.value = null;
        clipart.value = {
            title:"",
            url:"",
            additionalPrice:0
        }
        closeModal();
    }
}
const closeModal = () => {
    openModal.value = !openModal.value;
}
const closeAlert = () => {
    openAlert.value = !openAlert.value;
}

const selectClipartImage = async(e,key=-1) => { 
    e.preventDefault();
    var uploader = wp.media(
        {
            title: "Select Image",
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
                            if(isEdit.value){
                                clipart.value.url = (attachment.url);
                            }else{
                                cliparts.value[key].url = (attachment.url);
                            }
                        }
                    }
                );
            }
        )
        .open();
}
const addClipart = () => {
    isNew.value = true;
}
const back = () => {
    isNew.value = false;
    isEdit.value = false;
    clipart.value = {
        title:"",
        url:"",
        additionalPrice:0
    }
    clipartsSelected.value = {};
    cliparts.value = [{
        title:"",
        url:"",
        additionalPrice:0
    }];
    makeChoice.value=false;
    clipartId.value = null;
}
const handleDeleteNewClipart = (key) =>{
    var tab = [];
    for (let index = 0; index < cliparts.value.length; index++) {
        tab.push(cliparts.value[index])
    }
    tab.splice(key,1);
    if(tab.length>0){
        cliparts.value= tab;
    }
    closeAlert()
}
</script>
