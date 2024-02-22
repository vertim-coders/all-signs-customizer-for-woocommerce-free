<template>
    <div class="">
        <div class="aso-space-y-1">
            <div class="aso-bg-[#F8F9FB] aso-text-[16px] aso-space-x-1 aso-px-4 aso-py-4 aso-flex">
                <span class="aso-font-bold">
                    Fonts
                </span>
            </div>
            <div class="aso-flex aso-justify-end aso-space-x-2 aso-w-4/4 aso-bg-[#F8F9FB] aso-text-[12px] aso-px-4 aso-py-4 aso-pb-2">
                <button class="aso-flex aso-w-fit aso-h-fit aso-rounded aso-bg-[#016464] aso-px-4 aso-space-x-2 aso-p-1.5 aso-border-none aso-text-white aso-opacity-90 hover:aso-opacity-100 aso-cursor-pointer" @click="addSize">
                    <svg class="aso-w-5 aso-h-5" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="plus-lg">
                        <path id="Vector" fill-rule="evenodd" clip-rule="evenodd" d="M11 2.75C11.1823 2.75 11.3572 2.82243 11.4861 2.95136C11.6151 3.0803 11.6875 3.25516 11.6875 3.4375V10.3125H18.5625C18.7448 10.3125 18.9197 10.3849 19.0486 10.5139C19.1776 10.6428 19.25 10.8177 19.25 11C19.25 11.1823 19.1776 11.3572 19.0486 11.4861C18.9197 11.6151 18.7448 11.6875 18.5625 11.6875H11.6875V18.5625C11.6875 18.7448 11.6151 18.9197 11.4861 19.0486C11.3572 19.1776 11.1823 19.25 11 19.25C10.8177 19.25 10.6428 19.1776 10.5139 19.0486C10.3849 18.9197 10.3125 18.7448 10.3125 18.5625V11.6875H3.4375C3.25516 11.6875 3.0803 11.6151 2.95136 11.4861C2.82243 11.3572 2.75 11.1823 2.75 11C2.75 10.8177 2.82243 10.6428 2.95136 10.5139C3.0803 10.3849 3.25516 10.3125 3.4375 10.3125H10.3125V3.4375C10.3125 3.25516 10.3849 3.0803 10.5139 2.95136C10.6428 2.82243 10.8177 2.75 11 2.75Z" fill="white"/>
                        </g>
                    </svg>
                    <div class="aso-text-[14px]">
                        Add new font
                    </div>
                </button>
            </div>
            
            <div class="aso-relative" id="monTableau">
                <table class="aso-text-center aso-w-full aso-border aso-border-collapse aso-border-0">
                    <thead class="aso-bg-[#f0f0f1]">
                        <tr class="">
                            <th scope="col" class="aso-px-6 aso-py-3 aso-text-[14px] aso-font-semibold">
                                Title
                            </th>
                            <th scope="col" class="aso-px-6 aso-py-3 aso-text-[14px] aso-font-semibold">
                                Description
                            </th>
                            <th scope="col" class="aso-px-6 aso-py-3 aso-text-[14px] aso-font-semibold">
                                Action
                            </th>
                            
                        </tr>
                    </thead>
                    <tbody class="aso-bg-white">
                        
                        <tr class="aso-border-t-0 aso-border-l-0 aso-border-r-0 aso-border-b-2 aso-border-solid aso-border-[#f0f0f1]">
                            <td class="aso-px-6 aso-text-[14px] aso-py-2 aso-flex aso-justify-center aso-space-x-2">
                               Mont-1
                            </td>
                            <td class="aso-px-6 aso-py-2 aso-text-center aso-text-[11px]">
                                Plastic, also known .....
                            </td>
                            <td class="aso-px-6 aso-py-2 aso-flex aso-justify-center aso-space-x-2">
                                <button class="aso-bg-transparent aso-border-none aso-text-[#2DD05B] aso-cursor-pointer">
                                    <img class="aso-w-5 aso-h-5" src="../../../../assets/icons/ic_edit.svg" alt="">
                                </button>
                                <button class="aso-bg-transparent aso-border-none aso-text-[#A00000] aso-cursor-pointer">
                                    <img class="aso-w-5 aso-h-5" src="../../../../assets/icons/ic_delete.svg" alt="">
                                </button>
                            </td>
                        </tr>
                        <tr class="aso-border-t-0 aso-border-l-0 aso-border-r-0 aso-border-b-2 aso-border-solid aso-border-[#f0f0f1]">
                            <td class="aso-px-6 aso-text-[14px] aso-py-2 aso-flex aso-justify-center aso-space-x-2">
                               Mont-1
                            </td>
                            <td class="aso-px-6 aso-py-2 aso-text-center aso-text-[11px]">
                                Plastic, also known .....
                            </td>
                            <td class="aso-px-6 aso-py-2 aso-flex aso-justify-center aso-space-x-2">
                                <button class="aso-bg-transparent aso-border-none aso-text-[#2DD05B] aso-cursor-pointer">
                                    <img class="aso-w-5 aso-h-5" src="../../../../assets/icons/ic_edit.svg" alt="">
                                </button>
                                <button class="aso-bg-transparent aso-border-none aso-text-[#A00000] aso-cursor-pointer">
                                    <img class="aso-w-5 aso-h-5" src="../../../../assets/icons/ic_delete.svg" alt="">
                                </button>
                            </td>
                        </tr>
                        <tr class="aso-border-t-0 aso-border-l-0 aso-border-r-0 aso-border-b-2 aso-border-solid aso-border-[#f0f0f1]">
                            <td class="aso-px-6 aso-text-[14px] aso-py-2 aso-flex aso-justify-center aso-space-x-2">
                               Mont-1
                            </td>
                            <td class="aso-px-6 aso-py-2 aso-text-center aso-text-[11px]">
                                Plastic, also known .....
                            </td>
                            <td class="aso-px-6 aso-py-2 aso-flex aso-justify-center aso-space-x-2">
                                <button class="aso-bg-transparent aso-border-none aso-text-[#2DD05B] aso-cursor-pointer">
                                    <img class="aso-w-5 aso-h-5" src="../../../../assets/icons/ic_edit.svg" alt="">
                                </button>
                                <button class="aso-bg-transparent aso-border-none aso-text-[#A00000] aso-cursor-pointer">
                                    <img class="aso-w-5 aso-h-5" src="../../../../assets/icons/ic_delete.svg" alt="">
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="aso-space-y-1">
                <div class="aso-bg-[#F8F9FB] aso-text-[16px] aso-font-bold aso-px-4 aso-py-4 ">
                    Add new font
                </div>
                
                <div class="aso-bg-[#F8F9FB] aso-px-4 aso-py-8 aso-space-y-10">
                    <div class="aso-flex aso-font-medium aso-text-[16px]">
                        Google font (default)
                        <div class="aso-flex aso-items-center aso-translate-x-5 aso-translate-y-0.5">
                            <label for="aso-toggle" @click="handleToggleClick2" class="aso-cursor-pointer aso-bg-[#F8F8FF] aso-border-[1px] aso-border-solid aso-border-black aso-w-8 aso-h-0.5 aso-rounded-full aso-p-1">
                            <div :class="{'aso-translate-x-[110%]': isCheckbox, 'aso-bg-active': isChecked }" class="aso-toggle-dot aso-w-2.5 aso-h-2.5 -aso-translate-y-[8px] -aso-translate-x-2 aso-border-[4px] aso-border-solid aso-border-[#008000] aso-bg-white aso-rounded-full aso-shadow-md aso-transform"></div>
                            </label>
                        </div>
                    </div>
                    <div class="aso-flex aso-justify-between">
                        <div class="aso-w-2/5 aso-space-y-2 aso-flex aso-flex-col aso-text-[14px]">
                            <label for="" class="aso-font-normal">Choose google fonts</label>
                            <select type="text" class="aso-rounded aso-w-full aso-h-[30px]">
                                <option>

                                </option>
                            </select>
                        </div>
                        <div class="aso-w-2/5 aso-space-y-2 aso-flex aso-flex-col aso-text-[12px]">
                            <label for="" class="aso-font-normal">Label</label>
                            <input type="text" class="aso-rounded aso-w-full aso-h-[30px]">
                        </div>
                    </div>
                    <div class="aso-flex aso-text-[16px]">
                        Upload
                        <div class="aso-flex aso-items-center aso-translate-x-5 aso-translate-y-0.5">
                            <label for="aso-toggle" @click="handleToggleClick2" class="aso-cursor-pointer aso-bg-[#FFFFFF] aso-border-[1px] aso-border-solid aso-border-black aso-w-8 aso-h-0.5 aso-rounded-full aso-p-1">
                            <div :class="{'aso-translate-x-[0%]': isCheck, 'aso-bg-active': isChecked }" class="aso-toggle-dot aso-w-2.5 aso-h-2.5 -aso-translate-y-[8px] -aso-translate-x-2 aso-border-[4px] aso-border-solid aso-border-[#B9B9B9] aso-bg-white aso-rounded-full aso-shadow-md aso-transform"></div>
                            </label>
                        </div>
                    </div>
                </div>
                
                <div class="aso-bg-[#F8F9FB] aso-flex aso-font-bold aso-space-x-4 aso-px-4 aso-py-4 aso-justify-end aso-items-end">
                    <div class="aso-bg-[#016464] aso-rounded">
                        <button class="aso-flex aso-bg-transparent aso-w-fit aso-space-x-2 aso-h-fit aso-text-white aso-px-12 aso-p-2.5 aso-rounded aso-border-none aso-opacity-90 hover:aso-opacity-100 hover:aso-border-none hover:aso-text-white hover:aso-bg-[#016464] aso-cursor-pointer">
                            <div class="aso-font-semibold aso-text-[16px]">Save</div>
                        </button>
                    </div>
                </div>
                
            </div>
        </div>
        
    </div>
  </template>
  
  <script setup>
    import { ref } from "vue";
    

    const isCheckbox = ref(true);
    const isCheck = ref(false);
    const handleTransform = ref('translateX(100%)');
    const handleToggleClick2 = () => {
    isCheckbox.value = !isCheckbox.value;
    };

  </script>
   