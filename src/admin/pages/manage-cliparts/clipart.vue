<template>
    <div class="aso-h-[100vh]">
        <div class="aso-space-y-1" v-show="listClipart">
            <div class="aso-bg-[#F8F9FB] aso-flex aso-px-4 aso-py-4 aso-space-x-2">
                <div class="aso-text-[16px] aso-font-bold">
                    Clipart group
                </div>
                <img class="aso-w-4 aso-h-4 aso-py-1" src="../../../../assets/icons/ic_crochet.svg" alt="">
                    <div class="aso-text-[14px] aso-text-[#292C33] aso-translate-y-0.5">
                        Plants & nature
                    </div>
            </div>
            <div class="aso-flex aso-justify-end aso-space-x-2 aso-w-4/4 aso-bg-[#F8F9FB] aso-text-[12px] aso-px-4 aso-py-4 aso-pb-2">
                <button class="aso-flex aso-w-fit aso-h-fit aso-rounded aso-bg-[#016464] aso-px-4 aso-space-x-2 aso-p-1.5 aso-border-none aso-text-white aso-opacity-90 hover:aso-opacity-100 aso-cursor-pointer" @click="addClipart">
                    <svg class="aso-w-5 aso-h-5" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="plus-lg">
                        <path id="Vector" fill-rule="evenodd" clip-rule="evenodd" d="M11 2.75C11.1823 2.75 11.3572 2.82243 11.4861 2.95136C11.6151 3.0803 11.6875 3.25516 11.6875 3.4375V10.3125H18.5625C18.7448 10.3125 18.9197 10.3849 19.0486 10.5139C19.1776 10.6428 19.25 10.8177 19.25 11C19.25 11.1823 19.1776 11.3572 19.0486 11.4861C18.9197 11.6151 18.7448 11.6875 18.5625 11.6875H11.6875V18.5625C11.6875 18.7448 11.6151 18.9197 11.4861 19.0486C11.3572 19.1776 11.1823 19.25 11 19.25C10.8177 19.25 10.6428 19.1776 10.5139 19.0486C10.3849 18.9197 10.3125 18.7448 10.3125 18.5625V11.6875H3.4375C3.25516 11.6875 3.0803 11.6151 2.95136 11.4861C2.82243 11.3572 2.75 11.1823 2.75 11C2.75 10.8177 2.82243 10.6428 2.95136 10.5139C3.0803 10.3849 3.25516 10.3125 3.4375 10.3125H10.3125V3.4375C10.3125 3.25516 10.3849 3.0803 10.5139 2.95136C10.6428 2.82243 10.8177 2.75 11 2.75Z" fill="white"/>
                        </g>
                    </svg>
                    <div class="aso-text-[14px]">
                        Add new clipart
                    </div>
                </button>
            </div>
            <div class="aso-relative" id="monTableau">
                <table class="aso-text-center aso-border aso-border-collapse aso-border-0 aso-w-full">
                    <thead class="aso-text-[14px] aso-bg-[#f0f0f1]">
                        <tr class="">
                            <th scope="col" class="aso-px-6 aso-py-3">
                                
                            </th>
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
                    
                        <tr class="aso-border-t-0 aso-border-l-0 aso-border-r-0 aso-border-b-2 aso-border-solid aso-border-[#f0f0f1]">
                            <td class="aso-w-[5%] aso-p-4">
                                <span class="aso-flex aso-justify-center">
                                    <input id="checkbox-table-search-1" type="checkbox" class="aso-w-4 aso-h-4  aso-bg-gray-100 aso-border-gray-300 aso-rounded focus:aso-ring-blue-500">
                                </span>
                            </td>
                            <td class="aso-px-6 aso-text-[14px] aso-py-2">
                                Plants 1
                            </td>
                            <td class="aso-px-6 aso-justify-center aso-translate-y-1">
                                <svg class="aso-w-5 aso-h-5" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0 0.5H9V9.5H0V0.5ZM15.5 0.5C18 0.5 20 2.5 20 5C20 7.5 18 9.5 15.5 9.5C13 9.5 11 7.5 11 5C11 2.5 13 0.5 15.5 0.5ZM4.5 12.5L9 20.5H0L4.5 12.5ZM17 15.5H20V17.5H17V20.5H15V17.5H12V15.5H15V12.5H17V15.5Z" fill="black"/>
                                </svg>

                            </td>
                            <td class="aso-px-6 aso-text-[12px] aso-py-2 aso-space-x-2">
                                <span class="aso-w-fit aso-rounded-lg aso-text-center aso-p-1 aso-px-2 aso-bg-[#9ACD321F] aso-text-[#466801] aso-border-none">
                                    250 $
                                </span>
                            </td>
                            <td class="aso-px-6 aso-py-2 aso-flex aso-justify-center">
                                <button class="aso-bg-transparent aso-border-none aso-text-[#2DD05B] aso-cursor-pointer">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="aso-w-5 aso-h-5">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                    </svg>
                                </button>
                                <button class="aso-bg-transparent aso-border-none aso-text-[#A00000] aso-cursor-pointer">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="aso-w-5 aso-h-5">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                    </svg>
                                </button>
                            </td>
                        </tr>
                        <tr class="aso-border-t-0 aso-border-l-0 aso-border-r-0 aso-border-b-2 aso-border-solid aso-border-[#f0f0f1]">
                            <td class="aso-w-[5%] aso-p-4">
                                <span class="aso-flex aso-justify-center">
                                    <input id="checkbox-table-search-1" type="checkbox" class="aso-w-4 aso-h-4  aso-bg-gray-100 aso-border-gray-300 aso-rounded focus:aso-ring-blue-500">
                                </span>
                            </td>
                            <td class="aso-px-6 aso-text-[14px] aso-py-2">
                                Plants 1
                            </td>
                            <td class="aso-px-6 aso-justify-center aso-translate-y-1">
                                <svg class="aso-w-5 aso-h-5" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0 0.5H9V9.5H0V0.5ZM15.5 0.5C18 0.5 20 2.5 20 5C20 7.5 18 9.5 15.5 9.5C13 9.5 11 7.5 11 5C11 2.5 13 0.5 15.5 0.5ZM4.5 12.5L9 20.5H0L4.5 12.5ZM17 15.5H20V17.5H17V20.5H15V17.5H12V15.5H15V12.5H17V15.5Z" fill="black"/>
                                </svg>

                            </td>
                            <td class="aso-px-6 aso-text-[12px] aso-py-2 aso-space-x-2">
                                <span class="aso-w-fit aso-rounded-lg aso-text-center aso-p-1 aso-px-2 aso-bg-[#9ACD321F] aso-text-[#466801] aso-border-none">
                                    250 $
                                </span>
                            </td>
                            <td class="aso-px-6 aso-py-2 aso-flex aso-justify-center">
                                <button class="aso-bg-transparent aso-border-none aso-text-[#2DD05B] aso-cursor-pointer">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="aso-w-5 aso-h-5">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                    </svg>
                                </button>
                                <button class="aso-bg-transparent aso-border-none aso-text-[#A00000] aso-cursor-pointer">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="aso-w-5 aso-h-5">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                    </svg>
                                </button>
                            </td>
                        </tr>
                        <tr class="aso-border-t-0 aso-border-l-0 aso-border-r-0 aso-border-b-2 aso-border-solid aso-border-[#f0f0f1]">
                            <td class="aso-w-[5%] aso-p-4">
                                <span class="aso-flex aso-justify-center">
                                    <input id="checkbox-table-search-1" type="checkbox" class="aso-w-4 aso-h-4  aso-bg-gray-100 aso-border-gray-300 aso-rounded focus:aso-ring-blue-500">
                                </span>
                            </td>
                            <td class="aso-px-6 aso-text-[14px] aso-py-2">
                                Plants 1
                            </td>
                            <td class="aso-px-6 aso-justify-center aso-translate-y-1">
                                <svg class="aso-w-5 aso-h-5" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0 0.5H9V9.5H0V0.5ZM15.5 0.5C18 0.5 20 2.5 20 5C20 7.5 18 9.5 15.5 9.5C13 9.5 11 7.5 11 5C11 2.5 13 0.5 15.5 0.5ZM4.5 12.5L9 20.5H0L4.5 12.5ZM17 15.5H20V17.5H17V20.5H15V17.5H12V15.5H15V12.5H17V15.5Z" fill="black"/>
                                </svg>

                            </td>
                            <td class="aso-px-6 aso-text-[12px] aso-py-2 aso-space-x-2">
                                <span class="aso-w-fit aso-rounded-lg aso-text-center aso-p-1 aso-px-2 aso-bg-[#9ACD321F] aso-text-[#466801] aso-border-none">
                                    250 $
                                </span>
                            </td>
                            <td class="aso-px-6 aso-py-2 aso-flex aso-justify-center">
                                <button class="aso-bg-transparent aso-border-none aso-text-[#2DD05B] aso-cursor-pointer">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="aso-w-5 aso-h-5">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                    </svg>
                                </button>
                                <button class="aso-bg-transparent aso-border-none aso-text-[#A00000] aso-cursor-pointer">
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
        <div class="aso-space-y-1" v-show="createClipart">
            <div class="aso-bg-[#F8F9FB] aso-flex aso-px-4 aso-py-4 aso-space-x-2">
                <div class="aso-text-[16px] aso-font-bold">
                    Add clipart
                </div>
            </div>
            <div class="aso-bg-[#F8F9FB] aso-px-4 aso-py-4 aso-space-y-8">
                <div class="aso-flex aso-justify-between">
                    <div class="aso-w-2/5 aso-space-y-2 aso-flex aso-flex-col aso-text-[14px]">
                        <label for="" class="aso-font-normal">Title</label>
                        <input type="text" placeholder="0 mm" class="aso-rounded aso-w-full aso-h-[30px]">
                    </div>
                    <div class="aso-w-2/5 aso-space-y-2 aso-flex aso-flex-col aso-text-[12px]">
                        <label for="" class="aso-font-normal">Upload icon</label>
                        <div class="aso-relative">
                            <input type="text" class="aso-rounded aso-w-full aso-h-[32px] aso-absolute">
                            <button class="aso-absolute aso-bg-[#016464] aso-border-none aso-w-fit aso-h-fit aso-p-1.5 aso-space-x-2 aso-rounded aso-px-3 aso-text-white aso-opacity-90 hover:aso-opacity-100 aso-translate-x-4 aso-translate-y-1 aso-text-[10px] aso-cursor-pointer">
                                <span>upload Image</span>
                            </button>
                        </div>
                        
                    </div>
                </div>
                <div class="aso-w-full aso-space-y-2 aso-flex aso-flex-col aso-text-[14px]">
                    <label for="" class="aso-font-normal">Additional Price</label>
                    <select type="text" class="aso-rounded aso-w-full aso-h-[30px]">
                        <option>
                            25$
                        </option>
                    </select>
                </div>
            </div>
            <div class="aso-bg-[#F8F9FB] aso-flex aso-font-bold aso-space-x-4 aso-px-4 aso-py-4 aso-justify-end aso-items-end">
                <div class="aso-bg-[#016464] aso-rounded">
                    <button class="aso-flex aso-bg-transparent aso-w-fit aso-space-x-2 aso-h-fit aso-text-white aso-px-8 aso-p-2.5 aso-rounded aso-border-none aso-opacity-90 hover:aso-opacity-100 hover:aso-border-none hover:aso-text-white hover:aso-bg-[#016464] aso-cursor-pointer">
                        <div class="aso-translate-y-1">
                            <svg class="aso-w-4 aso-h-4" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2.5 1.25C2.16848 1.25 1.85054 1.3817 1.61612 1.61612C1.3817 1.85054 1.25 2.16848 1.25 2.5V17.5C1.25 17.8315 1.3817 18.1495 1.61612 18.3839C1.85054 18.6183 2.16848 18.75 2.5 18.75H17.5C17.8315 18.75 18.1495 18.6183 18.3839 18.3839C18.6183 18.1495 18.75 17.8315 18.75 17.5V2.5C18.75 2.16848 18.6183 1.85054 18.3839 1.61612C18.1495 1.3817 17.8315 1.25 17.5 1.25H11.875C11.5435 1.25 11.2255 1.3817 10.9911 1.61612C10.7567 1.85054 10.625 2.16848 10.625 2.5V11.6163L13.9325 8.3075C14.0499 8.19014 14.209 8.12421 14.375 8.12421C14.541 8.12421 14.7001 8.19014 14.8175 8.3075C14.9349 8.42486 15.0008 8.58403 15.0008 8.75C15.0008 8.91597 14.9349 9.07514 14.8175 9.1925L10.4425 13.5675C10.3844 13.6257 10.3155 13.6719 10.2395 13.7034C10.1636 13.7349 10.0822 13.7511 10 13.7511C9.91779 13.7511 9.83639 13.7349 9.76046 13.7034C9.68453 13.6719 9.61556 13.6257 9.5575 13.5675L5.1825 9.1925C5.12439 9.13439 5.07829 9.0654 5.04685 8.98948C5.0154 8.91356 4.99921 8.83218 4.99921 8.75C4.99921 8.66782 5.0154 8.58644 5.04685 8.51052C5.07829 8.4346 5.12439 8.36561 5.1825 8.3075C5.24061 8.24939 5.3096 8.20329 5.38552 8.17185C5.46144 8.1404 5.54282 8.12421 5.625 8.12421C5.70718 8.12421 5.78856 8.1404 5.86448 8.17185C5.9404 8.20329 6.00939 8.24939 6.0675 8.3075L9.375 11.6163V2.5C9.375 1.83696 9.63839 1.20107 10.1072 0.732233C10.5761 0.263392 11.212 0 11.875 0L17.5 0C18.163 0 18.7989 0.263392 19.2678 0.732233C19.7366 1.20107 20 1.83696 20 2.5V17.5C20 18.163 19.7366 18.7989 19.2678 19.2678C18.7989 19.7366 18.163 20 17.5 20H2.5C1.83696 20 1.20107 19.7366 0.732233 19.2678C0.263392 18.7989 0 18.163 0 17.5V2.5C0 1.83696 0.263392 1.20107 0.732233 0.732233C1.20107 0.263392 1.83696 0 2.5 0L5.625 0C5.79076 0 5.94973 0.065848 6.06694 0.183058C6.18415 0.300269 6.25 0.45924 6.25 0.625C6.25 0.79076 6.18415 0.949732 6.06694 1.06694C5.94973 1.18415 5.79076 1.25 5.625 1.25H2.5Z" fill="white"/>
                            </svg>
                        </div>

                        <span class="aso-font-semibold aso-text-[16px]">Save</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import {ref} from 'vue';
    const listClipart = ref(true);
    const createClipart = ref(false);

    const addClipart = () => {
        listClipart.value = (false);
        createClipart.value= (true);
    }
    
</script>