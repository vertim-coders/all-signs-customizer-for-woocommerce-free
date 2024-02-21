<template>
    <div class="aso-h-[100vh]">
        <div v-show="pageCreateConfig">
            <div class="aso-pb-4 aso-bg-[#F8F9FB] aso-px-4 aso-border-b-3 aso-border-t-0 aso-border-l-0 aso-border-r-0 aso-border-solid aso-border-[#f0f0f1] ">
               <div class="aso-bg-[#F8F9FB] aso-font-bold aso-py-4">
                    List of configurations
               </div>
               <div class="aso-flex aso-space-x-2 aso-w-4/4">
                    <div class="aso-w-1/4 aso-relative">
                        <input type="type" name="" id="" class="aso-w-[95%] aso-p-2 aso-text-[12px] aso-h-[30px] aso-absolute" placeholder="Search name configuration">
                        <button class="aso-bg-transparent aso-cursor-pointer aso-absolute aso-w-fit aso-h-fit aso-border-none aso-translate-y-1.5 aso-right-4">
                            <img class="aso-w-5 aso-h-5" src="../../../../assets/icons/ic_search.svg" alt="">
                        </button>
                    </div>
                    <div class="aso-w-1/4">
                        <select name="" id="" class="aso-w-[95%] aso-h-[30px]">
                            <option selected>filter by mode</option>
                        </select>
                    </div>
                    <div class="aso-w-1/4">
                        <select name="" id="" class="aso-w-[95%] aso-h-[30px]">
                            <option selected>filter by product type</option>
                        </select>
                    </div>
                    <div class="aso-w-1/4">
                        <button class="aso-flex aso-w-fit aso-h-fit aso-rounded aso-bg-[#016464] aso-px-4 aso-space-x-2 aso-p-1.5 aso-border-none aso-text-white aso-opacity-90 hover:aso-opacity-100 aso-cursor-pointer" @click="addConfig">
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
            
            <div class="aso-relative" id="monTableau">
                <table class="aso-text-center aso-border aso-border-collapse aso-border-0">
                    <thead class="aso-text-[14px] aso-bg-[#f0f0f1]">
                        <tr>
                            <th scope="col" class="aso-px-6 aso-py-3">
                                
                            </th>
                            <th scope="col" class="aso-px-6 aso-py-3">
                                Name configuration
                            </th>
                            <th scope="col" class="aso-px-6 aso-py-3">
                                Description
                            </th>
                            <th scope="col" class="aso-px-6 aso-py-3">
                                icon
                            </th>
                            <th scope="col" class="aso-px-6 aso-py-3">
                                PopupImg
                            </th>
                            <th scope="col" class="aso-px-6 aso-py-3">
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
                            <td class="aso-px-6 aso-py-2 aso-flex aso-justify-center aso-space-x-2">
                                <span class="aso-w-5 aso-h-5 aso-p-1 aso-px-1 aso-flex aso-justify-center aso-rounded-full aso-bg-[#f0f0f1] aso-border aso-border-solid aso-border-black ">
                                    <span class="aso-text-[12px]">AS</span> 
                                </span>
                                <span class="aso-py-1 aso-text-[14px]">
                                    Acrylic Signs
                                </span>
                            </td>
                            <td class="aso-px-6 aso-py-2 aso-text-center aso-text-[11px]">
                                Acrylic signs, also known .....
                            </td>
                            <td class="aso-px-6 aso-justify-center aso-translate-y-1">
                                <img class="aso-w-8 aso-h-8" src="../../../../assets/icons/ic_acrylic.svg" alt="">
                            </td>
                            <td class="aso-px-6 aso-justify-center aso-translate-y-1">
                                <img class="aso-w-8 aso-h-8" src="../../../../assets/icons/ic_popup_acrylic.svg" alt="">
                            </td>
                            <td class="aso-px-6 aso-py-2 aso-flex aso-justify-center aso-space-x-2">
                                <button class="aso-bg-transparent aso-p-2 aso-rounded-md aso-border-none aso-cursor-pointer aso-space-x-1 aso-flex">
                                    <img class="aso-w-5 aso-h-5" src="../../../../assets/icons/ic_preview.svg" alt="">
                                </button>
                                <button class="aso-bg-transparent aso-border-none aso-text-[#2DD05B] aso-cursor-pointer">
                                    <img class="aso-w-5 aso-h-5" src="../../../../assets/icons/ic_edit.svg" alt="">
                                </button>
                                <button class="aso-bg-transparent aso-border-none aso-text-[#A00000] aso-cursor-pointer">
                                    <img class="aso-w-5 aso-h-5" src="../../../../assets/icons/ic_delete.svg" alt="">
                                </button>
                            </td>
                        </tr>
                        <tr class="aso-border-t-0 aso-border-l-0 aso-border-r-0 aso-border-b-2 aso-border-solid aso-border-[#f0f0f1]">
                            <td class="aso-w-[5%] aso-p-4">
                                <span class="aso-flex aso-justify-center">
                                    <input id="checkbox-table-search-1" type="checkbox" class="aso-w-4 aso-h-4  aso-bg-gray-100 aso-border-gray-300 aso-rounded focus:aso-ring-blue-500">
                                </span>
                            </td>
                            <td class="aso-px-6 aso-py-2 aso-flex aso-justify-center aso-space-x-2">
                                <span class="aso-w-5 aso-h-5 aso-p-1 aso-px-1 aso-flex aso-justify-center aso-rounded-full aso-bg-[#f0f0f1] aso-border aso-border-solid aso-border-black ">
                                    <span class="aso-text-[12px]">AS</span> 
                                </span>
                                <span class="aso-py-1 aso-text-[14px]">
                                    Acrylic Signs
                                </span>
                            </td>
                            <td class="aso-px-6 aso-py-2 aso-text-center aso-text-[11px]">
                                Acrylic signs, also known .....
                            </td>
                            <td class="aso-px-6 aso-justify-center aso-translate-y-1">
                                <img class="aso-w-8 aso-h-8" src="../../../../assets/icons/ic_acrylic.svg" alt="">
                            </td>
                            <td class="aso-px-6 aso-justify-center aso-translate-y-1">
                                <img class="aso-w-8 aso-h-8" src="../../../../assets/icons/ic_popup_acrylic.svg" alt="">
                            </td>
                            <td class="aso-px-6 aso-py-2 aso-flex aso-justify-center aso-space-x-2">
                                <button class="aso-bg-transparent aso-p-2 aso-rounded-md aso-border-none aso-cursor-pointer aso-space-x-1 aso-flex">
                                    <img class="aso-w-5 aso-h-5" src="../../../../assets/icons/ic_preview.svg" alt="">
                                </button>
                                <button class="aso-bg-transparent aso-border-none aso-text-[#2DD05B] aso-cursor-pointer">
                                    <img class="aso-w-5 aso-h-5" src="../../../../assets/icons/ic_edit.svg" alt="">
                                </button>
                                <button class="aso-bg-transparent aso-border-none aso-text-[#A00000] aso-cursor-pointer">
                                    <img class="aso-w-5 aso-h-5" src="../../../../assets/icons/ic_delete.svg" alt="">
                                </button>
                            </td>
                        </tr>
                        <tr class="aso-border-t-0 aso-border-l-0 aso-border-r-0 aso-border-b-2 aso-border-solid aso-border-[#f0f0f1]">
                            <td class="aso-w-[5%] aso-p-4">
                                <span class="aso-flex aso-justify-center">
                                    <input id="checkbox-table-search-1" type="checkbox" class="aso-w-4 aso-h-4  aso-bg-gray-100 aso-border-gray-300 aso-rounded focus:aso-ring-blue-500">
                                </span>
                            </td>
                            <td class="aso-px-6 aso-py-2 aso-flex aso-justify-center aso-space-x-2">
                                <span class="aso-w-5 aso-h-5 aso-p-1 aso-px-1 aso-flex aso-justify-center aso-rounded-full aso-bg-[#f0f0f1] aso-border aso-border-solid aso-border-black ">
                                    <span class="aso-text-[12px]">AS</span> 
                                </span>
                                <span class="aso-py-1 aso-text-[14px]">
                                    Acrylic Signs
                                </span>
                            </td>
                            <td class="aso-px-6 aso-py-2 aso-text-center aso-text-[11px]">
                                Acrylic signs, also known .....
                            </td>
                            <td class="aso-px-6 aso-justify-center aso-translate-y-1">
                                <img class="aso-w-8 aso-h-8" src="../../../../assets/icons/ic_acrylic.svg" alt="">
                            </td>
                            <td class="aso-px-6 aso-justify-center aso-translate-y-1">
                                <img class="aso-w-8 aso-h-8" src="../../../../assets/icons/ic_popup_acrylic.svg" alt="">
                            </td>
                            <td class="aso-px-6 aso-py-2 aso-flex aso-justify-center aso-space-x-2">
                                <button class="aso-bg-transparent aso-p-2 aso-rounded-md aso-border-none aso-cursor-pointer aso-space-x-1 aso-flex">
                                    <img class="aso-w-5 aso-h-5" src="../../../../assets/icons/ic_preview.svg" alt="">
                                </button>
                                <button class="aso-bg-transparent aso-border-none aso-text-[#2DD05B] aso-cursor-pointer">
                                    <img class="aso-w-5 aso-h-5" src="../../../../assets/icons/ic_edit.svg" alt="">
                                </button>
                                <button class="aso-bg-transparent aso-border-none aso-text-[#A00000] aso-cursor-pointer">
                                    <img class="aso-w-5 aso-h-5" src="../../../../assets/icons/ic_delete.svg" alt="">
                                </button>
                            </td>
                        </tr>
                        
                        <tr class="aso-border-t-0 aso-border-l-0 aso-border-r-0 aso-border-b-2 aso-border-solid aso-border-[#f0f0f1]">
                            <td class="aso-w-[5%] aso-p-4">
                                <select name="" id="" class="aso-rounded-full">
                                    <option value="">10</option>
                                </select>
                            </td>
                            <td class="aso-px-6 aso-py-6 aso-flex aso-space-x-2">
                                <div class="aso-flex aso-space-x-1">
                                        <div>
                                            01
                                        </div>
                                        <div class="aso-text-[#AAAAAA]">
                                            a
                                        </div>
                                        <div>
                                            10
                                        </div>
                                        <div class="aso-text-[#AAAAAA]">
                                            sur
                                        </div>
                                        <div>
                                            700
                                        </div>
                                </div>
                            </td>
                            <td class="aso-px-6 aso-py-2">
                                
                            </td>
                            <td class="aso-px-6 aso-py-2">
                            </td>
                            <td class="aso-px-6 aso-py-2">
                                
                            </td>
                            <td class="aso-px-6 aso-py-2">
                            <span class="aso-text-[#AAAAAA]">&lt;&lt;  &lt;</span> page 1 sur 8  > <span class="aso-text-[#AAAAAA]"> >> </span> 
                            </td>
                        </tr>
                        
                    </tbody>
                </table>
            </div>
        </div>
        <div class="aso-space-y-1" v-show="isNewConfigVisible">
            <div class="aso-bg-[#F8F9FB] aso-font-bold aso-px-4 aso-py-4 aso-text-[16px]">
                Create new configuration
            </div>
            <div class="aso-bg-[#F8F9FB] aso-font-bold aso-px-4 aso-py-4 aso-space-y-6 aso-pb-12">
                <div class="aso-flex aso-justify-between">
                    <div class="aso-w-2/5 aso-flex aso-flex-col aso-space-y-2 aso-text-[14px]">
                        <label for="" class="aso-font-normal">Name configuration</label>
                        <input type="text" class="aso-rounded aso-w-full aso-h-[30px]">
                    </div>
                    <div class="aso-w-2/5 aso-flex aso-flex-col aso-space-y-2 aso-text-[12px]">
                        <label for="" class="aso-font-normal">Description</label>
                        <input type="text" class="aso-rounded aso-w-full aso-h-[30px]">
                    </div>
                </div>
                <div class="aso-flex aso-justify-between">
                    <div class="aso-w-2/5 aso-flex aso-flex-col aso-space-y-2 aso-text-[12px]">
                        <label for="" class="aso-font-normal">Upload icon</label>
                        <div class="aso-relative">
                            <input type="text" class="aso-rounded aso-w-full aso-h-[35px] aso-absolute">
                            <button class="aso-absolute aso-bg-[#016464] aso-border-none aso-w-fit aso-h-fit  aso-p-1.5 aso-rounded aso-px-4 aso-text-white aso-opacity-90 hover:aso-opacity-100 aso-translate-x-4 aso-translate-y-1 aso-text-[10px] aso-cursor-pointer">upload icon</button>
                        </div>
                        
                    </div>
                    <div class="aso-w-2/5 aso-flex aso-flex-col aso-space-y-2 aso-text-[12px]">
                        <label for="" class="aso-font-normal">Upload PopupImg</label>
                        <div class="aso-relative">
                            <input type="text" class="aso-rounded aso-w-full aso-h-[35px] aso-absolute">
                            <button class="aso-absolute aso-bg-[#016464] aso-border-none aso-w-fit aso-h-fit aso-p-1.5 aso-rounded aso-px-4 aso-text-white aso-opacity-90 hover:aso-opacity-100 aso-translate-x-4 aso-translate-y-1 aso-text-[10px] aso-cursor-pointer">upload PopupImg</button>
                        </div>
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
                <div class="aso-bg-[#016464] aso-rounded">
                    <button class="aso-flex aso-bg-transparent aso-w-fit aso-space-x-2 aso-h-fit aso-px-8 aso-text-white aso-p-2 aso-border-none aso-opacity-90 hover:aso-border-none hover:aso-text-white hover:aso-opacity-100 aso-cursor-pointer" @click="next">
                        <svg class="aso-w-6 aso-h-6" viewBox="0 0 22 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M22 4L18 8V5H5.83C5.62439 5.58597 5.24142 6.09339 4.73429 6.45179C4.22715 6.81019 3.621 7.0018 3 7C2.20435 7 1.44129 6.68393 0.87868 6.12132C0.31607 5.55871 0 4.79565 0 4C0 3.20435 0.31607 2.44129 0.87868 1.87868C1.44129 1.31607 2.20435 1 3 1C4.31 1 5.42 1.83 5.83 3H18V0L22 4Z" fill="currentColor"/>
                        </svg>
                        <div class="aso-font-semibold aso-text-[16px]">Next</div>
                    </button>
                </div>
            </div>
        </div>
        <div class="aso-bg-[#F8F9FB] aso-p-20 aso-space-y-20" v-show="pageIncludeDemo">
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
                    <button class="aso-font-semibold aso-text-[16px] aso-flex aso-bg-transparent aso-w-fit aso-space-x-2 aso-h-fit aso-px-8 aso-p-3 aso-text-white aso-border-none aso-opacity-90 hover:aso-opacity-100 hover:aso-border-none hover:aso-text-white aso-cursor-pointer">
                        Include demo data
                    </button>
                </div>
                <div class="aso-bg-[#016464] aso-rounded">
                    <button class="aso-font-semibold aso-text-[16px] aso-flex aso-bg-transparent aso-w-fit aso-space-x-2 aso-h-fit aso-px-8 aso-p-3 aso-text-white aso-border-none aso-opacity-90 hover:aso-opacity-100 hover:aso-border-none hover:aso-text-white aso-cursor-pointer">
                        No Include demo data
                    </button>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script setup>
import { ref } from "vue";
const isNewConfigVisible = ref(false);
const pageIncludeDemo = ref(false);
const pageCreateConfig = ref(true);
const addConfig = () => {
    pageCreateConfig.value = false;
    isNewConfigVisible.value = true;
}

const back = () => {
    pageCreateConfig.value = true;
    isNewConfigVisible.value = false;
};
const next = () => {
    isNewConfigVisible.value = false;
    pageIncludeDemo.value = true
};
</script>