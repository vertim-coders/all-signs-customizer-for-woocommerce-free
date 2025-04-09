<template>
    <div class="asowp-h-[100vh]">
        <div class="asowp-space-y-2 asowp-translate-y-1" v-show="!isNew">
            <div class="asowp-bg-[#F8F9FB] asowp-flex asowp-px-4 asowp-py-4 asowp-space-x-2 asowp-sticky asowp-top-[80px] asowp-z-[999]">
                <div class="asowp-text-[16px] asowp-font-bold asowp-cursor-pointer" @click="$router.push('/manage-cliparts')" >
                    Clipart groups
                </div>
                <img class="asowp-w-4 asowp-h-4 asowp-py-1" src="../../../../assets/icons/ic_crochet.svg" alt="">
                <div class="asowp-text-[14px] asowp-text-[#292C33] asowp-translate-y-0.5">
                    {{groupTitle}}
                </div>
            </div>
            <div  class="asowp-sticky asowp-top-[120px] asowp-flex asowp-justify-end asowp-space-x-2 asowp-w-4/4 asowp-bg-[#F8F9FB] asowp-text-[12px] asowp-px-4 asowp-py-4 asowp-pb-2 asowp-sticky asowp-top-[130px] asowp-z-[999]">
                <button v-if="!isFetching" class="asowp-flex asowp-w-fit asowp-h-fit asowp-rounded asowp-bg-[#016464] asowp-px-4 asowp-space-x-2 asowp-p-1.5 asowp-border-none asowp-text-white asowp-opacity-90 hover:asowp-opacity-100 asowp-cursor-pointer" @click="addClipart">
                    <svg class="asowp-w-5 asowp-h-5" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="plus-lg">
                        <path id="Vector" fill-rule="evenodd" clip-rule="evenodd" d="M11 2.75C11.1823 2.75 11.3572 2.82243 11.4861 2.95136C11.6151 3.0803 11.6875 3.25516 11.6875 3.4375V10.3125H18.5625C18.7448 10.3125 18.9197 10.3849 19.0486 10.5139C19.1776 10.6428 19.25 10.8177 19.25 11C19.25 11.1823 19.1776 11.3572 19.0486 11.4861C18.9197 11.6151 18.7448 11.6875 18.5625 11.6875H11.6875V18.5625C11.6875 18.7448 11.6151 18.9197 11.4861 19.0486C11.3572 19.1776 11.1823 19.25 11 19.25C10.8177 19.25 10.6428 19.1776 10.5139 19.0486C10.3849 18.9197 10.3125 18.7448 10.3125 18.5625V11.6875H3.4375C3.25516 11.6875 3.0803 11.6151 2.95136 11.4861C2.82243 11.3572 2.75 11.1823 2.75 11C2.75 10.8177 2.82243 10.6428 2.95136 10.5139C3.0803 10.3849 3.25516 10.3125 3.4375 10.3125H10.3125V3.4375C10.3125 3.25516 10.3849 3.0803 10.5139 2.95136C10.6428 2.82243 10.8177 2.75 11 2.75Z" fill="white"/>
                        </g>
                    </svg>
                    <div class="asowp-text-[14px]">
                        Add new cliparts
                    </div>
                </button>
            </div>
            <div id="monTableau" class="">
                <table class="asowp-text-center asowp-border asowp-border-collapse asowp-border-0 asowp-w-full">
                    <thead class="asowp-text-[14px] asowp-bg-[#f0f0f1] asowp-sticky asowp-top-[185px] asowp-z-[999]">
                        <tr class="">
                            <th scope="col" class="asowp-font-normal asowp-px-6 asowp-py-3">
                            </th>
                            <th scope="col" class="asowp-font-normal asowp-px-6 asowp-py-3">
                                Title
                            </th>
                            <th scope="col" class="asowp-font-normal asowp-px-6 asowp-py-3">
                                Image
                            </th>
                            <th scope="col" class="asowp-font-normal asowp-px-6 asowp-py-3">
                                Additional Price
                            </th>
                            <th scope="col" class="asowp-font-normal asowp-px-6 asowp-py-3">
                                Action
                            </th>
                            
                        </tr>
                    </thead>
                    <tbody class="asowp-bg-white">
                        <tr v-if="isFetching">
                            <td colspan="5">
                                <div class="asowp-bg-white asowp-border-solid asowp-border asowp-border-[#D1D1D1] asowp-flex asowp-flex-col asowp-space-y-2 asowp-justify-center asowp-items-center asowp-w-full asowp-h-[306px] p-4">
                                    <img class="asowp-w-[200px] asowp-h-[200px]" src="../../../../assets/icons/ic_loading.svg" alt="">
                                </div>
                            </td>
                        </tr>
                        <tr  v-if="clipartGroups.length == 0 && !isFetching">
                            <td colspan="5">
                                <div class="asowp-bg-white asowp-border-solid asowp-border asowp-border-[#D1D1D1] asowp-flex asowp-flex-col asowp-space-y-12 asowp-justify-center asowp-items-center asowp-py-10 asowp-h-[306px]">
                                    <div class="asowp-flex asowp-flex-col asowp-space-y-2 asowp-justify-center asowp-items-center">
                                        <p class="asowp-text-2xl asowp-font-bold">{{notFoundMessage}}</p>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr v-for="(clipart,key) in clipartGroups" :key="key" class="asowp-border-t-0 asowp-border-l-0 asowp-border-r-0 asowp-border-b-2 asowp-border-solid asowp-border-[#f0f0f1]">
                            <td class="asowp-px-6 asowp-text-[14px] asowp-py-2">
                                {{(key+1)+'.'}}
                            </td>
                            <td class="asowp-px-6 asowp-text-[14px] asowp-py-2">
                                {{clipart.title}}
                            </td>
                            <td class="asowp-px-6 asowp-justify-center asowp-translate-y-1">
                                <img class="asowp-w-10 asowp-h-10 asowp-rounded" :src="clipart.url" alt="" v-if="clipart.url != ''">

                            </td>
                            <td class="asowp-px-6 asowp-text-[12px] asowp-py-2 asowp-space-x-2">
                                <span class="asowp-w-fit asowp-rounded-lg asowp-text-center asowp-p-1 asowp-px-2 asowp-bg-[#9ACD321F] asowp-text-[#466801] asowp-border-none">
                                    {{clipart.additionalPrice + ' '+ currency_symbol}}
                                </span>
                            </td>
                            <td class="asowp-px-6 asowp-py-2 asowp-flex asowp-justify-center">
                                <button :class="`asowp-bg-transparent asowp-border-none asowp-text-[#2DD05B] asowp-cursor-pointer ${$route.path == '/groups-cliparts' ? ``: ``}`" @click="selectClipart(key,clipart)">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="asowp-w-5 asowp-h-5">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                    </svg>
                                </button>
                                <button class="asowp-bg-transparent asowp-border-none asowp-text-[#A00000] asowp-cursor-pointer" @click="selectClipart(key,clipart,true)">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="asowp-w-5 asowp-h-5">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                    </svg>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="asowp-space-y-2 asowp-translate-y-1" v-if="isNew">
            <div class="asowp-z-[999] asowp-bg-[#F8F9FB] asowp-shadow-t-xl asowp-flex asowp-px-4 asowp-py-4 asowp-space-x-2  asowp-sticky asowp-top-[80px]">
                <div class="asowp-text-[16px] asowp-font-bold">
                    {{isEdit ? 'Edit clipart' :'Add cliparts'}}
                </div>
            </div>
            <div class="asowp-z-[999] asowp-shadow-sm asowp-flex asowp-sticky asowp-justify-between asowp-top-[120px] asowp-bg-[#F8F9FB] asowp-space-x-10 asowp-font-semibold asowp-px-4 asowp-py-4" v-if="!isEdit">
                <div class="asowp-flex  asowp-space-x-10 asowp-font-semibold asowp-px-4 asowp-py-4">
                    <label>Upload Images</label>
                    <div class="asowp-flex asowp-items-center asowp-translate-x-2 asowp-translate-y-0.5">
                        <label for="toggleUploadImage" class="asowp-relative asowp-inline-flex asowp-items-center asowp-cursor-pointer asowp-border-[1px] asowp-border-solid asowp-border-black asowp-rounded-full">
                            <input id="toggleUploadImage" type="checkbox" name="toggleUploadImage" class="asowp-sr-only asowp-peer" v-model="useApi">
                            <div :class="`peer-checked:after:asowp-border-[#016464] peer-checked:after:asowp-border-solid peer-checked:after:asowp-border-[5px] peer-checked:after:asowp-top-[-2px] peer-checked:after:asowp-translate-y-[-15%] asowp-w-10 asowp-h-3 asowp-border asowp-border-[5px] asowp-border-[#016464] asowp-bg-zinc-300 asowp-rounded-full asowp-peer peer-checked:after:asowp-translate-x-[140%] after:asowp-content-[''] after:asowp-absolute after:asowp-top-[-2px] after:asowp-left-[-5px] after:asowp-bg-zinc-300 after:asowp-border-white after:asowp-border-solid after:asowp-translate-y-[-15%] after:asowp-border-[#FFFFFF] after:asowp-border-[5px] after:asowp-rounded-full after:asowp-h-2.5 after:asowp-w-2.5 after:asowp-transition-all after:asowp-shadow-lg`"></div>
                        </label>
                    </div>
                    <label>Use Cliparts API</label>
                </div>
                <button v-if="!useApi && !isEdit" :disabled="isLoading" @click="selectClipartImages" class="asowp-flex asowp-jsutify-center asowp-items-center asowp-bg-[#016464] asowp-rounded asowp-w-fit asowp-space-x-2 asowp-h-fit asowp-text-white asowp-px-8 asowp-p-2.5 asowp-rounded asowp-border-none hover:asowp-opacity-100 hover:asowp-border-none hover:asowp-text-white hover:asowp-bg-[#016464] asowp-cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="asowp-w-6 asowp-h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                        <span class="asowp-font-semibold asowp-text-[16px]">Add many Images</span>
                </button>
                <div v-if="useApi && !isEdit" class="asowp-flex  asowp-space-x-10 asowp-font-semibold asowp-px-4 asowp-py-4">
                    <label>Select All</label>
                    <div class="asowp-flex asowp-items-center asowp-translate-x-2 asowp-translate-y-0.5">
                        <label for="toggleUploadImages" class="asowp-relative asowp-inline-flex asowp-items-center asowp-cursor-pointer asowp-border-[1px] asowp-border-solid asowp-border-black asowp-rounded-full">
                            <input id="toggleUploadImages" type="checkbox" name="toggleUploadImages" class="asowp-sr-only asowp-peer" @change="toggleSelectAll">
                            <div :class="`peer-checked:after:asowp-border-[#016464] peer-checked:after:asowp-border-solid peer-checked:after:asowp-border-[5px] peer-checked:after:asowp-top-[-2px] peer-checked:after:asowp-translate-y-[-15%] asowp-w-10 asowp-h-3 asowp-border asowp-border-[5px] asowp-border-[#016464] asowp-bg-zinc-300 asowp-rounded-full asowp-peer peer-checked:after:asowp-translate-x-[140%] after:asowp-content-[''] after:asowp-absolute after:asowp-top-[-2px] after:asowp-left-[-5px] after:asowp-bg-zinc-300 after:asowp-border-white after:asowp-border-solid after:asowp-translate-y-[-15%] after:asowp-border-[#FFFFFF] after:asowp-border-[5px] after:asowp-rounded-full after:asowp-h-2.5 after:asowp-w-2.5 after:asowp-transition-all after:asowp-shadow-lg`"></div>
                        </label>
                    </div>
                </div>
            </div>
            <div class="asowp-bg-[#F8F9FB] asowp-px-4 asowp-py-4 asowp-space-y-8" v-if="!useApi && isEdit">
                <div class="asowp-flex asowp-justify-between">
                    <div class="asowp-w-2/5 asowp-space-y-2 asowp-flex asowp-flex-col asowp-text-[14px]">
                        <label for="" class="asowp-font-normal">Title</label>
                        <input type="text" v-model="clipart.title"  class="asowp-rounded asowp-w-full asowp-h-[35px]">
                    </div>
                    <div class="asowp-w-2/5 asowp-flex asowp-flex-col asowp-text-[12px]">
                        <label for="" class="asowp-font-normal">Upload icon</label>
                        <div class="asowp-flex asowp-flex-col asowp-space-y-2 asowp-w-full asowp-pt-2 asowp-w-1/2">
                            <div class="asowp-flex">
                                <button @click="selectClipartImage" class="asowp-bg-[#016464] asowp-border-none asowp-w-fit asowp-h-fit asowp-p-3 asowp-rounded asowp-px-4 asowp-text-white asowp-opacity-90 hover:asowp-opacity-100 asowp-text-[10px] asowp-cursor-pointer">upload image</button>
                                <div :class="`asowp-relative asowp-w-[82px] asowp-h-[49px] asowp-rounded-md asowp-overflow-hidden`">
                                    <img v-if="clipart.url != ''" :src="clipart.url" alt="" class="asowp-absolute asowp-w-full asowp-h-full">
                                    <button v-if="clipart.url != ''" @click="()=>{clipart.url = ''}" :class="`asowp-bg-[#016464] asowp-absolute asowp-bottom-0 asowp-right-0 asowp-text-white asowp-p-1 asowp-rounded-tl-lg asowp-border-none`">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="asowp-w-4 asowp-h-4">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="asowp-w-full asowp-space-y-2 asowp-flex asowp-flex-col asowp-text-[14px]">
                    <label for="" class="asowp-font-normal">Additional Price</label>
                    <input type="number" v-model="clipart.additionalPrice" class="asowp-rounded asowp-w-[1/3] asowp-h-[35px]" @blur="isNaN(clipart.additionalPrice)?clipart.additionalPrice=0:''"/>
                </div>
            </div>
            <div class="asowp-relative asowp-bg-[#F8F9FB] asowp-px-4 asowp-py-4 asowp-space-y-2" v-if="!useApi && !isEdit">
                <div class="asowp-flex asowp-justify-between asowp-items-center asowp-relative asowp-space-x-2" :key="key" v-for="(clipart,key) in cliparts">
                    <div class="asowp-w-1/4 asowp-space-y-2 asowp-flex asowp-flex-col asowp-text-[14px]">
                        <label for="" class="asowp-font-normal">Title</label>
                        <input type="text" v-model="cliparts[key].title"  class="asowp-rounded asowp-w-full asowp-h-[35px]">
                    </div>
                    <div class="asowp-w-1/4 asowp-space-y-2 asowp-flex asowp-flex-col asowp-text-[14px]">
                        <label for="" class="asowp-font-normal">Additional Price</label>
                        <input type="number" v-model="cliparts[key].additionalPrice" class="asowp-rounded asowp-w-[1/3] asowp-h-[35px]" @blur="isNaN(cliparts[key].additionalPrice)?cliparts[key].additionalPrice=0:''"/>
                    </div>
                    <div class="asowp-w-1/4 asowp-flex asowp-flex-col asowp-text-[12px]">
                        <label for="" class="asowp-font-normal">Upload icon</label>
                        <div class="asowp-flex asowp-flex-col asowp-space-y-2 asowp-w-full asowp-pt-2">
                            <div class="asowp-flex">
                                <button @click="(e)=>selectClipartImage(e,key)" class="asowp-bg-[#016464] asowp-border-none asowp-w-fit asowp-h-fit asowp-p-3 asowp-rounded asowp-px-4 asowp-text-white asowp-opacity-90 hover:asowp-opacity-100 asowp-text-[10px] asowp-cursor-pointer">upload image</button>
                                <div :class="`asowp-relative asowp-w-[82px] asowp-h-[49px] asowp-rounded-md asowp-overflow-hidden`">
                                    <img v-if="cliparts[key].url != ''" :src="cliparts[key].url" alt="" class="asowp-absolute asowp-w-full asowp-h-full">
                                    <button v-if="cliparts[key].url != ''" @click="()=>{cliparts[key].url = ''}" :class="`asowp-bg-[#016464] asowp-absolute asowp-bottom-0 asowp-right-0 asowp-text-white asowp-p-1 asowp-rounded-tl-lg asowp-border-none`">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="asowp-w-4 asowp-h-4">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div @click="handleDeleteClipartSelected(key)" class="asowp-flex asowp-absolute asowp-justify-center asowp-items-center asowp-right-2 asowp-top-2 asowp-shadow-md asowp-rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="asowp-w-6 asowp-h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                    </div>
                </div>
                <div class="asowp-pt-4">
                    <button :disabled="isLoading" @click="handleAddClipart" class="asowp-flex asowp-jsutify-center asowp-items-center asowp-bg-[#016464] asowp-rounded asowp-w-fit asowp-space-x-2 asowp-h-fit asowp-text-white asowp-px-8 asowp-p-2.5 asowp-rounded asowp-border-none hover:asowp-opacity-100 hover:asowp-border-none hover:asowp-text-white hover:asowp-bg-[#016464] asowp-cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="asowp-w-6 asowp-h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                        <span class="asowp-font-semibold asowp-text-[16px]">Add cliparts</span>
                    </button>
                </div>
            </div>
            <div class="asowp-bg-[#F8F9FB] asowp-px-4 asowp-py-4 asowp-space-y-8" v-if="useApi && !makeChoice">
                <div class="asowp-flex asowp-justify-start asowp-items-center">
                    <div class="asowp-w-2/5 asowp-space-y-2 asowp-flex asowp-flex-col asowp-text-[14px]">
                        <select id="" v-model="selectedCategory" class="asowp-h-[40px]">
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
                    <div class="asowp-bg-[#016464] asowp-rounded">
                        <button @click="getApiCliparts" class="asowp-flex asowp-bg-transparent asowp-w-fit asowp-space-x-2 asowp-h-fit asowp-text-white asowp-px-8 asowp-p-2.5 asowp-rounded asowp-border-none asowp-opacity-90 hover:asowp-opacity-100 hover:asowp-border-none hover:asowp-text-white hover:asowp-bg-[#016464] asowp-cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="asowp-w-6 asowp-h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                            </svg>
                            <span class="asowp-font-semibold asowp-text-[16px]">Get</span>
                        </button>
                    </div>
                </div>
                <div v-if="apiCliparts.length>0">
                    <h2 class="asowp-font-bold asowp-font-[15px]">Images found</h2>
                </div>
                <div>
                    <div class="asowp-grid asowp-grid-cols-8 asowp-py-4 asowp-px-4" v-if="apiCliparts.length>0">
                        <div v-for="(clipart,key) in apiCliparts" :key="key" class="asowp-relative asowp-flex asowp-justify-center asowp-items-center asowp-w-[60px] asowp-h-[60px] asowp-rounded" :class="clipartsSelected[key] ? 'asowp-ring-4 asowp-ring-[#016464]' : ''">
                            <input type="checkbox" :id="'clipart'+key" class="hiddenInput" @change="(e)=>handleSelectClipart(e,key)">
                            <label :for="'clipart'+key">
                                <div v-if="clipartsSelected[key]" class="asowp-z-[2] asowp-absolute asowp-top-0 asowp-right-0 asowp-flex asowp-items-center asowp-justify-between asowp-bg-white asowp-rounded-b">
                                    <input type="checkbox" :id="'clipart'+key" :checked="clipartsSelected[key]??false">
                                </div>
                                <div class="asowp-w-[50px] asowp-h-[50px] asowp-relative">
                                    <img :src="clipart" alt="Image 1" class="asowp-w-full asowp-h-full asowp-cursor-pointer asowp-absolute asowp-rounded">
                                </div>
                            </label>
                        </div>
                    </div>
                </div>
                <div class="asowp-bg-[#F8F9FB] asowp-flex asowp-justify-end asowp-items-center asowp-shadow-xl asowp-sticky asowp-bottom-0" v-if="Object.keys(clipartsSelected).length > 0">
                    <div class="asowp-bg-[#016464] asowp-rounded">
                        <button @click="displayAllChoice" class="asowp-flex asowp-bg-transparent asowp-w-fit asowp-space-x-2 asowp-h-fit asowp-text-white asowp-px-8 asowp-p-2.5 asowp-rounded asowp-border-none asowp-opacity-90 hover:asowp-opacity-100 hover:asowp-border-none hover:asowp-text-white hover:asowp-bg-[#016464] asowp-cursor-pointer">
                            <span class="asowp-font-semibold asowp-text-[16px]">I made my choices</span>
                        </button>
                    </div>
                </div>
            </div>
            <div class="asowp-bg-[#F8F9FB] asowp-px-4 asowp-py-4 asowp-space-x-4 asowp-sticky asowp-bottom-[20px] asowp-shadow-sm" v-if="makeChoice">
                <div class="asowp-grid asowp-grid-cols-3 asowp-py-4 asowp-px-4 asowp-mt-28">
                    <div class="asowp-flex asowp-justify-between asowp-items-center asowp-relative asowp-space-x-2" :key="key" v-for="(clipart,key) in cliparts">
                        <div class="asowp-space-y-2 asowp-flex asowp-flex-col asowp-text-[12px]">
                            <label for="" class="asowp-font-normal">Image</label>
                            <div :class="`asowp-relative asowp-w-[60px] asowp-h-[60px] asowp-rounded-md asowp-overflow-hidden`">
                                <img v-if="clipart.url != ''" :src="clipart.url" alt="" class="asowp-absolute asowp-w-full asowp-h-full">
                            </div>
                        </div>
                        <div class="asowp-space-y-2 asowp-flex asowp-flex-col asowp-text-[14px]">
                            <label for="" class="asowp-font-normal">Title</label>
                            <input type="text" v-model="cliparts[key].title" class="asowp-rounded asowp-w-full asowp-h-[35px]">
                        </div>
                        <div class=" asowp-space-y-2 asowp-flex asowp-flex-col asowp-text-[14px]">
                            <label for="" class="asowp-font-normal">Additional Price</label>
                            <input type="number" v-model="cliparts[key].additionalPrice" class="asowp-rounded asowp-w-[1/3] asowp-h-[35px]" @blur="isNaN(cliparts[key].additionalPrice)?cliparts[key].additionalPrice=0:''"/>
                        </div>
                        <div @click="handleDeleteClipartSelected(key)" class="asowp-flex asowp-absolute asowp-justify-center asowp-items-center asowp-right-2 asowp-top-2 asowp-shadow-md asowp-rounded-full asowp-cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="asowp-w-6 asowp-h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
            
            <div v-if="!useApi || (useApi && makeChoice)" class="asowp-shadow-xl asowp-bg-[#F8F9FB] asowp-flex asowp-font-bold asowp-space-x-4 asowp-px-4 asowp-py-4 asowp-justify-end asowp-items-end asowp-sticky asowp-bottom-0">
                <div class="asowp-bg-[#016464] asowp-rounded">
                    <button :disabled="isLoading" class="asowp-flex asowp-bg-transparent asowp-w-fit asowp-space-x-2 asowp-h-fit asowp-px-8 asowp-p-2 asowp-border-none asowp-text-white asowp-opacity-90 hover:asowp-border-none hover:asowp-text-white hover:asowp-opacity-100 asowp-cursor-pointer" @click="back">
                        <svg class="asowp-w-6 asowp-h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 12L5 8V11L17.17 11C17.3756 10.414 17.7586 9.90661 18.2657 9.54821C18.7729 9.18981 19.379 8.9982 20 9C20.7956 9 21.5587 9.31607 22.1213 9.87868C22.6839 10.4413 23 11.2044 23 12C23 12.7956 22.6839 13.5587 22.1213 14.1213C21.5587 14.6839 20.7956 15 20 15C18.69 15 17.58 14.17 17.17 13L5 13V16L1 12Z" fill="currentColor"/>
                        </svg>

                        <div class="asowp-font-semibold asowp-text-[16px]">Back</div>
                    </button>
                </div>
                <div class="asowp-bg-[#016464] asowp-rounded" v-if="isEdit">
                    <button @click="updateClipart" :class="`asowp-rounded asowp-flex ${!isLoading ? 'asowp-bg-amber-400 ' :'asowp-bg-amber-500'} asowp-w-fit asowp-space-x-2 asowp-h-fit asowp-px-8 asowp-text-white asowp-p-2 asowp-border-none asowp-opacity-90 hover:asowp-border-none hover:asowp-text-white hover:asowp-opacity-100 asowp-cursor-pointer`">
                        <img src="../../../../assets/icons/ic_loading_gray.svg" class="asowp-w-5 asowp-w-5" v-if="isLoading" :disabled="isLoading"/>
                        <div class="asowp-font-semibold asowp-text-[16px]">Update</div>
                    </button>
                </div>
                <div class="asowp-bg-[#016464] asowp-rounded" v-if="!isEdit">
                    <button @click="saveClipart" class="asowp-flex asowp-bg-transparent asowp-w-fit asowp-space-x-2 asowp-h-fit asowp-text-white asowp-px-8 asowp-p-2.5 asowp-rounded asowp-border-none asowp-opacity-90 hover:asowp-opacity-100 hover:asowp-border-none hover:asowp-text-white hover:asowp-bg-[#016464] asowp-cursor-pointer">
                        <div class="asowp-translate-y-1">
                            <img src="../../../../assets/icons/ic_loading_gray.svg" class="asowp-w-5 asowp-w-5" v-if="isLoading" :disabled="isLoading"/>
                            <svg v-if="!isLoading" class="asowp-w-4 asowp-h-4" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2.5 1.25C2.16848 1.25 1.85054 1.3817 1.61612 1.61612C1.3817 1.85054 1.25 2.16848 1.25 2.5V17.5C1.25 17.8315 1.3817 18.1495 1.61612 18.3839C1.85054 18.6183 2.16848 18.75 2.5 18.75H17.5C17.8315 18.75 18.1495 18.6183 18.3839 18.3839C18.6183 18.1495 18.75 17.8315 18.75 17.5V2.5C18.75 2.16848 18.6183 1.85054 18.3839 1.61612C18.1495 1.3817 17.8315 1.25 17.5 1.25H11.875C11.5435 1.25 11.2255 1.3817 10.9911 1.61612C10.7567 1.85054 10.625 2.16848 10.625 2.5V11.6163L13.9325 8.3075C14.0499 8.19014 14.209 8.12421 14.375 8.12421C14.541 8.12421 14.7001 8.19014 14.8175 8.3075C14.9349 8.42486 15.0008 8.58403 15.0008 8.75C15.0008 8.91597 14.9349 9.07514 14.8175 9.1925L10.4425 13.5675C10.3844 13.6257 10.3155 13.6719 10.2395 13.7034C10.1636 13.7349 10.0822 13.7511 10 13.7511C9.91779 13.7511 9.83639 13.7349 9.76046 13.7034C9.68453 13.6719 9.61556 13.6257 9.5575 13.5675L5.1825 9.1925C5.12439 9.13439 5.07829 9.0654 5.04685 8.98948C5.0154 8.91356 4.99921 8.83218 4.99921 8.75C4.99921 8.66782 5.0154 8.58644 5.04685 8.51052C5.07829 8.4346 5.12439 8.36561 5.1825 8.3075C5.24061 8.24939 5.3096 8.20329 5.38552 8.17185C5.46144 8.1404 5.54282 8.12421 5.625 8.12421C5.70718 8.12421 5.78856 8.1404 5.86448 8.17185C5.9404 8.20329 6.00939 8.24939 6.0675 8.3075L9.375 11.6163V2.5C9.375 1.83696 9.63839 1.20107 10.1072 0.732233C10.5761 0.263392 11.212 0 11.875 0L17.5 0C18.163 0 18.7989 0.263392 19.2678 0.732233C19.7366 1.20107 20 1.83696 20 2.5V17.5C20 18.163 19.7366 18.7989 19.2678 19.2678C18.7989 19.7366 18.163 20 17.5 20H2.5C1.83696 20 1.20107 19.7366 0.732233 19.2678C0.263392 18.7989 0 18.163 0 17.5V2.5C0 1.83696 0.263392 1.20107 0.732233 0.732233C1.20107 0.263392 1.83696 0 2.5 0L5.625 0C5.79076 0 5.94973 0.065848 6.06694 0.183058C6.18415 0.300269 6.25 0.45924 6.25 0.625C6.25 0.79076 6.18415 0.949732 6.06694 1.06694C5.94973 1.18415 5.79076 1.25 5.625 1.25H2.5Z" fill="white"/>
                            </svg>
                        </div>

                        <span class="asowp-font-semibold asowp-text-[16px]">Save</span>
                    </button>
                </div>
            </div>
        </div>
        <!-- Delete Modal-->
        <div v-if="openModal" @click.self="closeModal" class="asowp-bg-gray-400 asowp-overflow-y-auto asowp-overflow-x-hidden asowp-fixed asowp-top-0 asowp-right-[25%] asowp-left-[75%] asowp-z-[999] asowp-flex asowp-justify-center asowp-items-center asowp-w-full md:asowp-inset-0 asowp-h-full">
            <div class="asowp-relative asowp-p-4 asowp-w-full asowp-max-w-md asowp-max-h-full">
                <div class="asowp-relative asowp-bg-white asowp-rounded-lg asowp-shadow dark:bg-gray-700">
                    <button @click.stop="closeModal" type="button" :class="`${isLoading ? 'asowp-cursor-not-allowed' : 'asowp-cursor-pointer'} asowp-absolute asowp-top-3 asowp-end-2.5 asowp-text-gray-400 asowp-bg-transparent hover:bg-gray-200 hover:text-gray-900 asowp-rounded-lg asowp-text-sm asowp-w-8 asowp-h-8 asowp-ms-auto asowp-inline-flex asowp-justify-center asowp-items-center dark:hover:bg-gray-600 dark:hover:text-white`" data-modal-hide="popup-modal">
                        <svg class="asowp-w-3 asowp-h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                        <span class="asowp-sr-only">Close modal</span>
                    </button>
                    <div class="asowp-p-4 md:p-5 asowp-text-center">
                        <svg class="asowp-mx-auto asowp-mb-4 asowp-text-gray-400 asowp-w-12 asowp-h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                        </svg>
                        <h3 class="asowp-mb-5 asowp-text-lg asowp-font-normal asowp-text-gray-500 dark:text-gray-400">Are you sure you want to delete this cliparts ?</h3>
                        <div class="asowp-flex asowp-justify-center asowp-items-center asowp-space-x-2">
                            <input v-model="clipart.title" readonly class="asowp-rounded asowp-w-[calc(100% - 90px)] asowp-h-[35px] asowp-text-center asowp-p-4 asowp-my-2 asowp-border-none" />
                            <div :class="`asowp-relative asowp-w-[60px] asowp-h-[60px] asowp-rounded-md`">
                                <img v-if="clipart.url != ''" :src="clipart.url" alt="" class="asowp-absolute asowp-w-full asowp-h-full">
                            </div>
                        </div>
                        <button @click="deleteClipart" data-modal-hide="popup-modal" type="button" :class="`asowp-border-solid asowp-text-white ${!isLoading ? 'asowp-bg-red-600 asowp-cursor-pointer' :'asowp-bg-red-700 asowp-cursor-not-allowed'} hover:bg-red-800 focus:ring-4 focus:outline-none asowp-my-2 asowp-border-none  focus:ring-red-300 dark:focus:ring-red-800 asowp-font-medium asowp-rounded-lg asowp-text-sm asowp-inline-flex asowp-items-center asowp-px-5 asowp-py-2.5 asowp-text-center`">
                            <img src="../../../../assets/icons/ic_loading_gray.svg" class="asowp-w-5 asowp-w-5" v-if="isLoading" :disabled="isLoading"/>
                            Yes, I'm sure
                        </button>
                        <button @click.stop="closeModal" data-modal-hide="popup-modal" type="button" :class="`asowp-border-solid asowp-py-2.5 asowp-px-5 asowp-ms-3 asowp-text-sm asowp-font-medium asowp-text-gray-900 asowp-my-2  asowp-border-gray-500 asowp-border-white focus:outline-none asowp-bg-white asowp-rounded-lg asowp-border asowp-border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 ${isLoading ? 'asowp-cursor-not-allowed' : 'asowp-cursor-pointer'}`">No, cancel</button>
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
const currency_symbol = ref(asowp_data.currencySymbol);
const groupTitle = ref('');
const clipartId = ref(null);
const isFetching = ref(false);
const isLoading = ref(false);
const notFoundMessage = ref('');
const isNew = ref(false);
const isEdit = ref(false);
const openModal = ref(false);
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


const getApiCliparts = ()=>{
    apiCliparts.value = allCliparts.value[selectedCategory.value];
}
const fetchApiCliparts = async()=>{
    const result = await axios.get("https://signsdesigner.us/app/asowp-cliparts/cliparts.json");
    allCliparts.value = result.data;
    getApiCliparts();
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
        useApi.value = false;
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
        useApi.value = false;
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

const selectClipartImages = async(e) => { 
    e.preventDefault();
    var uploader = wp.media(
        {
            title: "Select many images",
            button: {
                text: "Select many images"
            },
            multiple: true
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
                                cliparts.value = cliparts.value.filter((curr => curr.url))
                                cliparts.value.push({
                                    title:"",
                                    url: attachment.url,
                                    additionalPrice:0
                                });
                            
                        }
                    }
                );
            }
        )
        .open();
}

function toggleSelectAll(event) {
    if(event.target.checked) {
        clipartsSelected.value =apiCliparts.value;
    }else{
        clipartsSelected.value = [];
    }

    
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
    useApi.value = false;
    makeChoice.value=false;
    clipartId.value = null;
}
const handleDeleteClipartSelected = (key) =>{
    cliparts.value.splice(key,1);
    if(cliparts.value.length == 0){
        makeChoice.value = false
    }
}
</script>
