<template>
    <div>
        <div v-show="configMaterial">
            <div>
                <div class="aso-bg-[#F8F9FB] aso-text-[16px] aso-space-x-1 aso-px-4 aso-py-4 aso-flex">
                    <div class="aso-font-bold">
                        Name config
                    </div>
                    <img class="aso-w-4 aso-h-4 aso-py-1" src="../../../../../assets/icons/ic_crochet.svg" alt="">
                    <div>
                        Material
                    </div>
                </div>
                <div class="aso-flex aso-space-x-2 aso-w-4/4 aso-bg-[#F8F9FB] aso-px-4 aso-py-4">
                    <div class="aso-w-1/4 aso-relative">
                        <input type="type" name="" id="" class="aso-w-[95%] aso-p-2 aso-text-[12px] aso-h-[30px] aso-absolute" placeholder="Search name configuration">
                        <button class="aso-bg-transparent aso-cursor-pointer aso-absolute aso-w-fit aso-h-fit aso-border-none aso-translate-y-1.5 aso-right-4">
                            <img class="aso-w-5 aso-h-5" src="../../../../../assets/icons/ic_search.svg" alt="">
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
                        <button class="aso-flex aso-w-fit aso-h-fit aso-rounded aso-bg-[#016464] aso-px-4 aso-space-x-2 aso-p-1.5 aso-border-none aso-text-white aso-cursor-pointer" @click="addComponent">
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
                <table class="aso-text-left aso-border aso-border-collapse aso-border-0">
                    <thead class="aso-bg-[#f0f0f1]">
                        <tr class="">
                            <th scope="col" class="aso-p-4 aso-w-12">
                                
                            </th>
                            <th scope="col" class="aso-px-6 aso-py-3 aso-text-[14px] aso-font-semibold">
                                Name component
                            </th>
                            <th scope="col" class="aso-px-6 aso-py-3 aso-text-[14px] aso-font-semibold">
                                Description
                            </th>
                            <th scope="col" class="aso-px-6 aso-py-3 aso-text-[14px] aso-font-semibold">
                                icon
                            </th>
                            <th scope="col" class="aso-px-6 aso-py-3 aso-text-[14px] aso-font-semibold">
                                PopupImg
                            </th>
                            <th scope="col" class="aso-px-6 aso-py-3 aso-text-[14px] aso-font-semibold">
                                Behavior (type)
                            </th>
                            <th scope="col" class="aso-px-6 aso-py-3 aso-text-[14px] aso-font-semibold">
                                Action
                            </th>
                            
                        </tr>
                    </thead>
                    <tbody class="aso-bg-white">
                        
                        <tr class="aso-border-t-0 aso-border-l-0 aso-border-r-0 aso-border-b-2 aso-border-solid aso-border-[#f0f0f1]">
                            <td class="aso-w-[5%] aso-p-4">
                                <div class="aso-flex aso-items-center">
                                    <input id="checkbox-table-search-1" type="checkbox" class="aso-w-4 aso-h-4  aso-bg-gray-100 aso-border-gray-300 aso-rounded focus:aso-ring-blue-500">
                                </div>
                            </td>
                            <td class="aso-px-6 aso-py-2 aso-flex aso-space-x-2">
                                <div class="aso-w-5 aso-h-5 aso-p-1 aso-px-1 aso-flex aso-justify-center aso--items-center aso-rounded-full aso-bg-[#f0f0f1] aso-border aso-border-solid aso-border-black ">
                                    <span class="aso-text-[12px]">P</span> 
                                </div>
                                <div class="aso-py-1 aso-text-[14px]">
                                    Plastic
                                </div>
                            </td>
                            <td class="aso-px-6 aso-py-2 aso-text-[11px]">
                                Plastic, also known .....
                            </td>
                            <td class="aso-px-6 aso-py-2">
                                <img class="aso-w-8 aso-h-8" src="../../../../../assets/icons/ic_acrylic.svg" alt="">
                            </td>
                            <td class="aso-px-6 aso-py-2">
                                <img class="aso-w-8 aso-h-8" src="../../../../../assets/icons/ic_popup_acrylic.svg" alt="">
                            </td>
                            <td class="aso-px-6 aso-py-4 aso-flex aso-space-x-2">
                                <div class="aso-w-fit aso-rounded-lg aso-p-1 aso-text-[12px] aso-px-2 aso-bg-[#9ACD321F] aso-text-[#466801] aso-border-none">
                                    advanced
                                </div>
                            </td>
                            <td class="aso-px-6 aso-py-2">
                                <div class="aso-flex aso-space-x-2">
                                    <div>
                                        <button class="aso-bg-[#FFC7D8] aso-p-2 aso-rounded-md aso-border-none aso-cursor-pointer aso-space-x-1 aso-flex">
                                            <img class="aso-w-4 aso-h-4" src="../../../../../assets/icons/ic_manage.svg" alt="">
                                            <div class="aso-text-[12px]">
                                                Manage
                                            </div>
                                        </button>
                                    </div>
                                    <div class="aso-py-2">
                                        <button class="aso-bg-transparent aso-border-none aso-text-[#2DD05B] aso-cursor-pointer">
                                            <img class="aso-w-5 aso-h-5" src="../../../../../assets/icons/ic_edit.svg" alt="">
                                        </button>
                                    </div>
                                    <div class="aso-py-2">
                                        <button class="aso-bg-transparent aso-border-none aso-text-[#A00000] aso-cursor-pointer">
                                            <img class="aso-w-5 aso-h-5" src="../../../../../assets/icons/ic_delete.svg" alt="">
                                        </button>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr class="aso-border-t-0 aso-border-l-0 aso-border-r-0 aso-border-b-2 aso-border-solid aso-border-[#f0f0f1]">
                            <td class="aso-w-[5%] aso-p-4">
                                <div class="aso-flex aso-items-center">
                                    <input id="checkbox-table-search-1" type="checkbox" class="aso-w-4 aso-h-4  aso-bg-gray-100 aso-border-gray-300 aso-rounded focus:aso-ring-blue-500">
                                </div>
                            </td>
                            <td class="aso-px-6 aso-py-2 aso-flex aso-space-x-2">
                                <div class="aso-w-5 aso-h-5 aso-p-1 aso-px-1 aso-flex aso-justify-center aso--items-center aso-rounded-full aso-bg-[#f0f0f1] aso-border aso-border-solid aso-border-black ">
                                    <span class="aso-text-[12px]">P</span> 
                                </div>
                                <div class="aso-py-1 aso-text-[14px]">
                                    Plastic
                                </div>
                            </td>
                            <td class="aso-px-6 aso-py-2 aso-text-[11px]">
                                Plastic, also known .....
                            </td>
                            <td class="aso-px-6 aso-py-2">
                                <img class="aso-w-8 aso-h-8" src="../../../../../assets/icons/ic_acrylic.svg" alt="">
                            </td>
                            <td class="aso-px-6 aso-py-2">
                                <img class="aso-w-8 aso-h-8" src="../../../../../assets/icons/ic_popup_acrylic.svg" alt="">
                            </td>
                            <td class="aso-px-6 aso-py-4 aso-flex aso-space-x-2">
                                <div class="aso-w-fit aso-rounded-lg aso-p-1 aso-text-[12px] aso-px-2 aso-bg-[#9ACD321F] aso-text-[#466801] aso-border-none">
                                    advanced
                                </div>
                            </td>
                            <td class="aso-px-6 aso-py-2">
                                <div class="aso-flex aso-space-x-2">
                                    <div>
                                        <button class="aso-bg-[#FFC7D8] aso-p-2 aso-rounded-md aso-border-none aso-cursor-pointer aso-space-x-1 aso-flex">
                                            <img class="aso-w-4 aso-h-4" src="../../../../../assets/icons/ic_manage.svg" alt="">
                                            <div class="aso-text-[12px]">
                                                Manage
                                            </div>
                                        </button>
                                    </div>
                                    <div class="aso-py-2">
                                        <button class="aso-bg-transparent aso-border-none aso-text-[#2DD05B] aso-cursor-pointer">
                                            <img class="aso-w-5 aso-h-5" src="../../../../../assets/icons/ic_edit.svg" alt="">
                                        </button>
                                    </div>
                                    <div class="aso-py-2">
                                        <button class="aso-bg-transparent aso-border-none aso-text-[#A00000] aso-cursor-pointer">
                                            <img class="aso-w-5 aso-h-5" src="../../../../../assets/icons/ic_delete.svg" alt="">
                                        </button>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr class="aso-border-t-0 aso-border-l-0 aso-border-r-0 aso-border-b-2 aso-border-solid aso-border-[#f0f0f1]">
                            <td class="aso-w-[5%] aso-p-4">
                                <div class="aso-flex aso-items-center">
                                    <input id="checkbox-table-search-1" type="checkbox" class="aso-w-4 aso-h-4  aso-bg-gray-100 aso-border-gray-300 aso-rounded focus:aso-ring-blue-500">
                                </div>
                            </td>
                            <td class="aso-px-6 aso-py-2 aso-flex aso-space-x-2">
                                <div class="aso-w-5 aso-h-5 aso-p-1 aso-px-1 aso-flex aso-justify-center aso--items-center aso-rounded-full aso-bg-[#f0f0f1] aso-border aso-border-solid aso-border-black ">
                                    <span class="aso-text-[12px]">P</span> 
                                </div>
                                <div class="aso-py-1 aso-text-[14px]">
                                    Plastic
                                </div>
                            </td>
                            <td class="aso-px-6 aso-py-2 aso-text-[11px]">
                                Plastic, also known .....
                            </td>
                            <td class="aso-px-6 aso-py-2">
                                <img class="aso-w-8 aso-h-8" src="../../../../../assets/icons/ic_acrylic.svg" alt="">
                            </td>
                            <td class="aso-px-6 aso-py-2">
                                <img class="aso-w-8 aso-h-8" src="../../../../../assets/icons/ic_popup_acrylic.svg" alt="">
                            </td>
                            <td class="aso-px-6 aso-py-4 aso-flex aso-space-x-2">
                                <div class="aso-w-fit aso-rounded-lg aso-p-1 aso-text-[12px] aso-px-2 aso-bg-[#9ACD321F] aso-text-[#466801] aso-border-none">
                                    advanced
                                </div>
                            </td>
                            <td class="aso-px-6 aso-py-2">
                                <div class="aso-flex aso-space-x-2">
                                    <div>
                                        <button class="aso-bg-[#FFC7D8] aso-p-2 aso-rounded-md aso-border-none aso-cursor-pointer aso-space-x-1 aso-flex">
                                            <img class="aso-w-4 aso-h-4" src="../../../../../assets/icons/ic_manage.svg" alt="">
                                            <div class="aso-text-[12px]">
                                                Manage
                                            </div>
                                        </button>
                                    </div>
                                    <div class="aso-py-2">
                                        <button class="aso-bg-transparent aso-border-none aso-text-[#2DD05B] aso-cursor-pointer">
                                            <img class="aso-w-5 aso-h-5" src="../../../../../assets/icons/ic_edit.svg" alt="">
                                        </button>
                                    </div>
                                    <div class="aso-py-2">
                                        <button class="aso-bg-transparent aso-border-none aso-text-[#A00000] aso-cursor-pointer">
                                            <img class="aso-w-5 aso-h-5" src="../../../../../assets/icons/ic_delete.svg" alt="">
                                        </button>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="aso-space-y-0.5" v-show="isNewComponent">
            <div class="aso-bg-[#F8F9FB] aso-text-[16px] aso-space-x-1 aso-px-4 aso-py-4 aso-flex">
                <div class="aso-font-bold aso-text-[16px]">
                    Name config
                </div>
                <img class="aso-w-4 aso-h-4 aso-py-1" src="../../../../../assets/icons/ic_crochet.svg" alt="">
                <div class="aso-text-[16px]">
                    Material
                </div>
            </div>
            <div class="aso-text-[16px] aso-font-bold aso-px-4 aso-py-4 aso-bg-[#F8F9FB]">
                Add component
            </div>
            <div class="aso-bg-[#F8F9FB] aso-font-bold aso-px-4 aso-pb-12">
                <div class="aso-flex">
                    <div class="aso-w-1/2 aso-space-y-2 aso-text-[14px]">
                        <label for="" class="aso-font-normal">component name</label><br>
                        <input type="text" class="aso-rounded aso-w-[80%] aso-h-[30px]">
                    </div>
                    <div class="aso-w-1/2 aso-space-y-2 aso-text-[12px]">
                        <label for="" class="aso-font-normal">Description</label><br>
                        <input type="text" class="aso-rounded aso-w-[80%] aso-h-[30px]">
                    </div>
                </div>
                <div class="aso-flex aso-py-4">
                    <div class="aso-w-1/2 aso-space-y-2 aso-text-[12px]">
                        <label for="" class="aso-font-normal">Upload icon</label><br>
                        <div class="aso-relative">
                            <input type="text" class="aso-rounded aso-w-[80%] aso-h-[35px] aso-absolute">
                            <button class="aso-absolute aso-bg-[#016464] aso-border-none aso-w-fit aso-h-fit aso-p-1.5 aso-rounded aso-px-3 aso-text-white aso-translate-x-4 aso-translate-y-1 aso-text-[10px] aso-cursor-pointer">upload icon</button>
                        </div>
                        
                    </div>
                    <div class="aso-w-1/2 aso-space-y-2 aso-text-[12px]">
                        <label for="" class="aso-font-normal">Upload PopupImg</label><br>
                        <div class="aso-relative">
                            <input type="text" class="aso-rounded aso-w-[80%] aso-h-[35px] aso-absolute">
                            <button class="aso-absolute aso-bg-[#016464] aso-border-none aso-w-fit aso-h-fit aso-p-1.5 aso-rounded aso-px-3 aso-text-white aso-translate-x-4 aso-translate-y-1 aso-text-[10px] aso-cursor-pointer">upload PopupImg</button>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div class="aso-bg-[#F8F9FB] aso-px-4 aso-py-4 aso-space-y-2 aso-flex aso-flex-col">
                    <label for="" class="aso-font-bold">Behevior (type)</label>
                    <select name="" id="" class="aso-w-full aso-h-[30px] aso-font-normal">
                        <option selected class="aso-font-normal">select type</option>
                        <option>Simple</option>
                        <option>Advance</option>
                    </select>
                </div>
            </div>
            <div class="aso-bg-[#F8F9FB] aso-flex aso-space-x-4 aso-px-4 aso-py-4 aso-justify-end aso-items-end">
                <div class="">
                    <button class="aso-flex aso-bg-transparent aso-w-fit aso-space-x-2 aso-h-fit aso-border-[1px] aso-rounded aso-px-8 aso-p-2 aso-border-black aso-border-solid hover:aso-border-none hover:aso-text-white hover:aso-bg-[#016464] aso-cursor-pointer" @click="back">
                        <svg class="aso-w-6 aso-h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 12L5 8V11L17.17 11C17.3756 10.414 17.7586 9.90661 18.2657 9.54821C18.7729 9.18981 19.379 8.9982 20 9C20.7956 9 21.5587 9.31607 22.1213 9.87868C22.6839 10.4413 23 11.2044 23 12C23 12.7956 22.6839 13.5587 22.1213 14.1213C21.5587 14.6839 20.7956 15 20 15C18.69 15 17.58 14.17 17.17 13L5 13V16L1 12Z" fill="currentColor"/>
                        </svg>

                        <div class="aso-font-semibold aso-text-[16px]">Back</div>
                    </button>
                </div>
                <div class="">
                    <button class="aso-flex aso-bg-transparent aso-w-fit aso-space-x-2 aso-h-fit aso-border-[1px] aso-rounded aso-px-12 aso-p-2.5 aso-border-black aso-border-solid hover:aso-border-none hover:aso-text-white hover:aso-bg-[#016464] aso-cursor-pointer">
                        <div class="aso-font-semibold aso-text-[16px]">Save</div>
                    </button>
                </div>
            </div>
        </div>
    </div>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue';
  
  const configMaterial = ref(true);
  const isNewComponent = ref(false);
  
  const addComponent = () => {
    isNewComponent.value = true;
    configMaterial.value = false;
  }
  const back = () => {
    isNewComponent.value = false;
    configMaterial.value = true;
  }
  </script>
  