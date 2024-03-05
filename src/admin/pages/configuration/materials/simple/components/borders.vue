<template>
    <div class="aso-h-[100vh]">
        <div class="aso-space-y-1" v-show="listBorder">
            <div class="aso-flex aso-justify-end aso-bg-[#F8F9FB] aso-px-4 aso-py-4 aso-pb-2">
                <button class="aso-flex aso-w-fit aso-h-fit aso-rounded aso-bg-[#016464] aso-px-4 aso-space-x-2 aso-p-1.5 aso-border-none aso-text-white aso-opacity-90 hover:aso-opacity-100 aso-cursor-pointer" @click="newBorder">
                    <svg class="aso-w-5 aso-h-5" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="plus-lg">
                        <path id="Vector" fill-rule="evenodd" clip-rule="evenodd" d="M11 2.75C11.1823 2.75 11.3572 2.82243 11.4861 2.95136C11.6151 3.0803 11.6875 3.25516 11.6875 3.4375V10.3125H18.5625C18.7448 10.3125 18.9197 10.3849 19.0486 10.5139C19.1776 10.6428 19.25 10.8177 19.25 11C19.25 11.1823 19.1776 11.3572 19.0486 11.4861C18.9197 11.6151 18.7448 11.6875 18.5625 11.6875H11.6875V18.5625C11.6875 18.7448 11.6151 18.9197 11.4861 19.0486C11.3572 19.1776 11.1823 19.25 11 19.25C10.8177 19.25 10.6428 19.1776 10.5139 19.0486C10.3849 18.9197 10.3125 18.7448 10.3125 18.5625V11.6875H3.4375C3.25516 11.6875 3.0803 11.6151 2.95136 11.4861C2.82243 11.3572 2.75 11.1823 2.75 11C2.75 10.8177 2.82243 10.6428 2.95136 10.5139C3.0803 10.3849 3.25516 10.3125 3.4375 10.3125H10.3125V3.4375C10.3125 3.25516 10.3849 3.0803 10.5139 2.95136C10.6428 2.82243 10.8177 2.75 11 2.75Z" fill="white"/>
                        </g>
                    </svg>
                    <div class="aso-text-[14px]">
                        Add new border
                    </div>
                </button>
            </div>
            <div class="aso-relative" id="monTableau">
                <table class="aso-w-full aso-text-center aso-px-4 aso-border aso-border-collapse aso-border-0">
                    <thead class="aso-text-[14px] aso-bg-[#f0f0f1]">
                        <tr class="">
                            <th scope="col" class="aso-p-4 aso-px-8 aso-w-12 aso-font-normal">
                                Title 
                            </th>
                            <th scope="col" class="aso-px-6 aso-py-3 aso-font-normal">
                                Description
                            </th>
                            <th scope="col" class="aso-px-6 aso-py-3 aso-font-normal">
                                Icons
                            </th>
                            <th scope="col" class="aso-px-6 aso-py-3 aso-font-normal">
                                Action
                            </th>
                            
                        </tr>
                    </thead>
                    <tbody class="aso-bg-white">
                        
                        <tr class="aso-border-t-0 aso-border-l-0 aso-border-r-0 aso-border-b-2 aso-border-solid aso-border-[#f0f0f1]">
                            <td class="aso-text-center aso-px-6 aso-p-4">
                                   None
                            </td>
                            <td class="aso-px-8 aso-py-3 aso-flex aso-justify-center aso-translate-x-1">
                                <svg class="aso-w-7 aso-h-7" viewBox="0 0 51 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g id="Group 19352812">
                                    <rect id="Rectangle 8" x="1" y="0.5" width="49" height="49" rx="24.5" stroke="#3D3D3D"/>
                                    <path id="Rectangle 9" d="M41.0957 7.61719L7.0957 42.5255" stroke="#3D3D3D"/>
                                    </g>
                                </svg>
                            </td>
                            <td class="aso-text-[12px] aso-text-center aso-px-6 aso-py-3">
                                <span class="aso-w-fit aso-rounded-lg aso-px-2 aso-p-1 aso-bg-[#EF5A354D] aso-text-[#000000] aso-border-none">
                                    25$
                                </span>
                            </td>
                            <td class="aso-px-6 aso-flex aso-justify-center -aso-translate-y-3">
                                <button class="aso-bg-transparent aso-border-none aso-text-[#2DD05B] aso-cursor-pointer">
                                    <img class="aso-w-5 aso-h-5" src="../../../../../../../assets/icons/ic_edit.svg" alt="">
                                </button>
                                <button class="aso-bg-transparent aso-border-none aso-text-[#A00000] aso-cursor-pointer">
                                    <img class="aso-w-5 aso-h-5" src="../../../../../../../assets/icons/ic_delete.svg" alt="">
                                </button>
                            </td>
                        </tr>
                        <tr class="aso-border-t-0 aso-border-l-0 aso-border-r-0 aso-border-b-2 aso-border-solid aso-border-[#f0f0f1]">
                            <td class="aso-w-28 aso-text-center aso-px-6 aso-p-4">
                                   Stop
                            </td>
                            <td class="aso-px-6 aso-flex aso-justify-center aso-translate-x-1">
                                <svg class="aso-w-12 aso-h-12" viewBox="0 0 52 37" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                    <rect width="52" height="37" fill="url(#pattern0)"/>
                                    <defs>
                                    <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                                    <use xlink:href="#image0_1133_5185" transform="matrix(0.00613395 0 0 0.00862069 0.101293 0)"/>
                                    </pattern>
                                    <image id="image0_1133_5185" width="130" height="116" xlink:href="data:image/png;base64,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"/>
                                    </defs>
                                </svg>

                            </td>
                            <td class="aso-text-[12px] aso-text-center aso-px-6 aso-py-3">
                                <span class="aso-w-fit aso-rounded-lg aso-px-2 aso-p-1 aso-bg-[#EF5A354D] aso-text-[#000000] aso-border-none">
                                    25$
                                </span>
                            </td>
                            <td class="aso-px-6 aso-flex aso-justify-center -aso-translate-y-3">
                                <button class="aso-bg-transparent aso-border-none aso-text-[#2DD05B] aso-cursor-pointer">
                                    <img class="aso-w-5 aso-h-5" src="../../../../../../../assets/icons/ic_edit.svg" alt="">
                                </button>
                                <button class="aso-bg-transparent aso-border-none aso-text-[#A00000] aso-cursor-pointer">
                                    <img class="aso-w-5 aso-h-5" src="../../../../../../../assets/icons/ic_delete.svg" alt="">
                                </button>
                            </td>
                        </tr>
                        <tr class="aso-border-t-0 aso-border-l-0 aso-border-r-0 aso-border-b-2 aso-border-solid aso-border-[#f0f0f1]">
                            <td class="aso-w-28 aso-text-center aso-px-6 aso-p-4">
                                Triangle
                            </td>
                            <td class="aso-px-6 aso-flex aso-justify-center aso-translate-x-1">
                                <svg class="aso-w-12 aso-h-12" viewBox="0 0 52 37" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                    <rect width="52" height="37" fill="url(#pattern0)"/>
                                    <defs>
                                    <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                                    <use xlink:href="#image0_1133_5185" transform="matrix(0.00613395 0 0 0.00862069 0.101293 0)"/>
                                    </pattern>
                                    <image id="image0_1133_5185" width="130" height="116" xlink:href="data:image/png;base64,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"/>
                                    </defs>
                                </svg>

                            </td>
                            <td class="aso-text-[12px] aso-text-center aso-px-6 aso-py-3">
                                <span class="aso-w-fit aso-rounded-lg aso-px-2 aso-p-1 aso-bg-[#EF5A354D] aso-text-[#000000] aso-border-none">
                                    25$
                                </span>
                            </td>
                            <td class="aso-px-6 aso-flex aso-justify-center -aso-translate-y-3">
                                <button class="aso-bg-transparent aso-border-none aso-text-[#2DD05B] aso-cursor-pointer">
                                    <img class="aso-w-5 aso-h-5" src="../../../../../../../assets/icons/ic_edit.svg" alt="">
                                </button>
                                <button class="aso-bg-transparent aso-border-none aso-text-[#A00000] aso-cursor-pointer">
                                    <img class="aso-w-5 aso-h-5" src="../../../../../../../assets/icons/ic_delete.svg" alt="">
                                </button>
                            </td>
                        </tr>
                        
                    </tbody>
                </table>
            </div>
        </div>
        <div class="aso-space-y-2" v-show="selectBorder">
            <div class="aso-bg-[#F8F9FB] aso-text-[16px] aso-font-medium aso-px-8 aso-py-8 aso-space-y-8 ">
                
                <div class="aso-flex aso-justify-between">
                    <div class="aso-w-2/5 aso-space-y-2 aso-text-[12px] aso-flex aso-flex-col">
                        <label for="" class="aso-font-normal">Select border</label>
                        <select type="text" class="aso-rounded aso-w-full aso-h-[30px]">
                            <option selected>100x50mm</option>
                        </select>
                    </div>
                    <div class="aso-w-2/5 aso-space-y-2 aso-text-[12px] aso-flex aso-flex-col">
                        <label for="" class="aso-font-normal">Additional Price</label>
                        <input type="text" class="aso-rounded aso-w-full aso-h-[30px]">
                    </div>
                </div>
                <div class="aso-w-full aso-space-y-2 aso-flex aso-flex-col">
                    <label for="" class="aso-text-[16px] aso-font-normal">Exclude size</label>
                    <select type="text" class="aso-rounded aso-w-full aso-h-[30px]">
                        <option value=""></option>
                    </select>
                    <span class="aso-text-[#444444] aso-text-[12px]">exclude the sizes of this border</span>
                    
                </div>
                <div class="aso-w-full aso-space-y-2 aso-flex aso-flex-col">
                    <label for="" class="aso-text-[16px] aso-font-semibold">Border settings</label>
                    <span class="aso-text-[12px] aso-text-[#444444]">border color</span>
                    <div class="">
                        <input type="text" class="aso-rounded aso-w-full aso-h-[30px]">
                    </div>
                    
                </div>
                <div class="aso-flex aso-py-4 aso-space-x-16">
                    <div class="aso-flex aso-font-semibold">
                        Enable border width
                        <div class="aso-flex aso-items-center aso-translate-x-2 aso-translate-y-0.5">
                            <label for="aso-toggle" @click="handleToggleClick2" class="aso-cursor-pointer aso-bg-[#F8F8FF] aso-border-[1px] aso-border-solid aso-border-black aso-w-8 aso-h-0.5 aso-rounded-full aso-p-1">
                            <div :class="{'aso-translate-x-[110%]': isCheckbox, 'aso-bg-active': isChecked }" class="aso-toggle-dot aso-w-2.5 aso-h-2.5 -aso-translate-y-[8px] -aso-translate-x-2 aso-border-[4px] aso-border-solid aso-border-[#008000] aso-bg-white aso-rounded-full aso-shadow-md aso-transform"></div>
                            </label>
                        </div>
                    </div>
                    <div class="aso-flex aso-font-semibold">
                        Enable border width
                        <div class="aso-flex aso-items-center aso-translate-x-2 aso-translate-y-0.5">
                            <label for="aso-toggle" @click="handleToggleClick2" class="aso-cursor-pointer aso-bg-[#F8F8FF] aso-border-[1px] aso-border-solid aso-border-black aso-w-8 aso-h-0.5 aso-rounded-full aso-p-1">
                            <div :class="{'aso-translate-x-[110%]': isCheckbox, 'aso-bg-active': isChecked }" class="aso-toggle-dot aso-w-2.5 aso-h-2.5 -aso-translate-y-[8px] -aso-translate-x-2 aso-border-[4px] aso-border-solid aso-border-[#008000] aso-bg-white aso-rounded-full aso-shadow-md aso-transform"></div>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <div class="aso-bg-[#F8F9FB] aso-flex aso-space-x-4 aso-px-4 aso-py-4 aso-justify-end aso-items-end">
                <div class="aso-bg-[#016464] aso-rounded">
                    <button class="aso-flex aso-bg-transparent aso-w-fit aso-space-x-2 aso-h-fit aso-px-8 aso-p-2 aso-border-none aso-text-white aso-opacity-90 hover:aso-border-none hover:aso-text-white hover:aso-opacity-100 aso-cursor-pointer" @click="back">
                        <svg class="aso-w-6 aso-h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 12L5 8V11L17.17 11C17.3756 10.414 17.7586 9.90661 18.2657 9.54821C18.7729 9.18981 19.379 8.9982 20 9C20.7956 9 21.5587 9.31607 22.1213 9.87868C22.6839 10.4413 23 11.2044 23 12C23 12.7956 22.6839 13.5587 22.1213 14.1213C21.5587 14.6839 20.7956 15 20 15C18.69 15 17.58 14.17 17.17 13L5 13V16L1 12Z" fill="currentColor"/>
                        </svg>

                        <div class="aso-font-semibold aso-text-[16px]">Back</div>
                    </button>
                </div>
                <div class="aso-bg-[#016464] aso-rounded">
                    <button class="aso-flex aso-bg-transparent aso-w-fit aso-space-x-2 aso-h-fit aso-text-white  aso-px-12 aso-p-2.5 aso-border-none aso-opacity-90 hover:aso-border-none hover:aso-text-white hover:aso-opacity-100 aso-cursor-pointer">
                        <div class="aso-font-semibold aso-text-[16px]">Save</div>
                    </button>
                </div>
            </div>
        </div>
        
    </div>
</template>
<script setup>
    import { ref } from "vue";
    const selectBorder = ref(false);
    const listBorder = ref(true);
    const newBorder = () => {
        listBorder.value = false;
        selectBorder.value = true;
    }
    const back = () => {
        listBorder.value = true;
        selectBorder.value = false;
    }
    
    const isCheckbox = ref(true);
    const handleTransform = ref('translateX(100%)');
    const handleToggleClick2 = () => {
    isCheckbox.value = !isCheckbox.value;
    };
</script>
