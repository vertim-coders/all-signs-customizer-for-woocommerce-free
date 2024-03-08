<template>
    <div>
        <div class="aso-space-y-1" v-show="listOption">
            <div class="aso-bg-[#F8F9FB] aso-text-[16px] aso-space-x-1 aso-px-4 aso-py-4 aso-flex">
                <div class="aso-font-bold">
                    Name config
                </div>
                <img class="aso-w-4 aso-h-4 aso-py-1" src="../../../../../../../assets/icons/ic_crochet.svg" alt="">
                <div>
                    Material
                </div>
                <img class="aso-w-4 aso-h-4 aso-py-1" src="../../../../../../../assets/icons/ic_crochet.svg" alt="">
                <div class="aso-text-[16px] ">
                    Brass
                </div>
                <img class="aso-w-4 aso-h-4 aso-py-1" src="../../../../../../../assets/icons/ic_crochet.svg" alt="">
                <div class="aso-text-[16px] ">
                    Sub component 1 <span class="aso-font-bold">(Advance)</span>
                </div>
            </div>
            <div class="aso-flex aso-justify-end aso-space-x-2 aso-w-4/4 aso-bg-[#F8F9FB] aso-text-[12px] aso-px-4 aso-py-4 aso-pb-2">
                
                <button class="aso-flex aso-w-fit aso-h-fit aso-rounded aso-bg-[#016464] aso-px-4 aso-space-x-2 aso-p-1.5 aso-border-none aso-text-white aso-opacity-90 hover:aso-opacity-100 aso-cursor-pointer" @click="newOption">
                    <svg class="aso-w-5 aso-h-5" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="plus-lg">
                        <path id="Vector" fill-rule="evenodd" clip-rule="evenodd" d="M11 2.75C11.1823 2.75 11.3572 2.82243 11.4861 2.95136C11.6151 3.0803 11.6875 3.25516 11.6875 3.4375V10.3125H18.5625C18.7448 10.3125 18.9197 10.3849 19.0486 10.5139C19.1776 10.6428 19.25 10.8177 19.25 11C19.25 11.1823 19.1776 11.3572 19.0486 11.4861C18.9197 11.6151 18.7448 11.6875 18.5625 11.6875H11.6875V18.5625C11.6875 18.7448 11.6151 18.9197 11.4861 19.0486C11.3572 19.1776 11.1823 19.25 11 19.25C10.8177 19.25 10.6428 19.1776 10.5139 19.0486C10.3849 18.9197 10.3125 18.7448 10.3125 18.5625V11.6875H3.4375C3.25516 11.6875 3.0803 11.6151 2.95136 11.4861C2.82243 11.3572 2.75 11.1823 2.75 11C2.75 10.8177 2.82243 10.6428 2.95136 10.5139C3.0803 10.3849 3.25516 10.3125 3.4375 10.3125H10.3125V3.4375C10.3125 3.25516 10.3849 3.0803 10.5139 2.95136C10.6428 2.82243 10.8177 2.75 11 2.75Z" fill="white"/>
                        </g>
                    </svg>
                    <div class="aso-text-[14px]">
                        Add new option
                    </div>
                </button>
            </div>
            
            <div class="aso-relative" id="monTableau">
                <table class="aso-text-center aso-border aso-border-collapse aso-border-0">
                    <thead class="aso-bg-[#f0f0f1]">
                        <tr class="">
                            <th scope="col" class="aso-p-4 aso-w-12">
                                
                            </th>
                            <th scope="col" class="aso-px-6 aso-py-3 aso-text-[14px] aso-font-semibold">
                                Title
                            </th>
                            <th scope="col" class="aso-px-6 aso-py-3 aso-text-[14px] aso-font-semibold">
                                Description
                            </th>
                            <th scope="col" class="aso-px-6 aso-py-3 aso-text-[14px] aso-font-semibold">
                                Icons
                            </th>
                            <th scope="col" class="aso-px-6 aso-py-3 aso-text-[14px] aso-font-semibold">
                                Size
                            </th>
                            <th scope="col" class="aso-px-6 aso-py-3 aso-text-[14px] aso-font-semibold">
                                Color
                            </th>
                            <th scope="col" class="aso-px-6 aso-py-3 aso-text-[14px] aso-font-semibold">
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
                                
                                <span class="aso-py-1 aso-text-[14px]">
                                    Madrid
                                </span>
                            </td>
                            <td class="aso-px-6 aso-py-2 aso-text-center aso-text-[11px]">
                                Plastic, also known .....
                            </td>
                            <td class="aso-px-6 aso-justify-center aso-translate-y-1">
                                <img class="aso-w-8 aso-h-8" src="../../../../../../../assets/icons/ic_plastic_sub.svg" alt="">
                            </td>
                            <td class="aso-px-6 aso-py-3 aso-space-x-2">
                                <span class="aso-w-fit aso-rounded-lg aso-text-center aso-p-1 aso-px-2 aso-bg-[#9ACD321F] aso-text-[#466801] aso-border-none">
                                    25 x 10 mm
                                </span>
                            </td>
                           <td class="aso-text-[12px] aso-px-6 aso-py-2">
                                <span class="aso-w-fit aso-rounded-lg aso-text-center aso-px-2 aso-p-1 aso-bg-[#F8E7E7] aso-text-[#EF5A35] aso-border-none">
                                    #DDA534
                                </span>
                            </td>
                            <td class="aso-px-6 aso-py-2 aso-flex aso-justify-center aso-space-x-2">
                                
                                <button class="aso-bg-transparent aso-border-none aso-text-[#2DD05B] aso-cursor-pointer">
                                    <img class="aso-w-5 aso-h-5" src="../../../../../../../assets/icons/ic_edit.svg" alt="">
                                </button>
                                <button class="aso-bg-transparent aso-border-none aso-text-[#A00000] aso-cursor-pointer">
                                    <img class="aso-w-5 aso-h-5" src="../../../../../../../assets/icons/ic_delete.svg" alt="">
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
                                
                                <span class="aso-py-1 aso-text-[14px]">
                                    Madrid
                                </span>
                            </td>
                            <td class="aso-px-6 aso-py-2 aso-text-center aso-text-[11px]">
                                Plastic, also known .....
                            </td>
                            <td class="aso-px-6 aso-justify-center aso-translate-y-1">
                                <img class="aso-w-8 aso-h-8" src="../../../../../../../assets/icons/ic_plastic_sub.svg" alt="">
                            </td>
                            <td class="aso-px-6 aso-py-3 aso-space-x-2">
                                <span class="aso-w-fit aso-rounded-lg aso-text-center aso-p-1 aso-px-2 aso-bg-[#9ACD321F] aso-text-[#466801] aso-border-none">
                                    25 x 10 mm
                                </span>
                            </td>
                           <td class="aso-text-[12px] aso-px-6 aso-py-2">
                                <span class="aso-w-fit aso-rounded-lg aso-text-center aso-px-2 aso-p-1 aso-bg-[#F8E7E7] aso-text-[#EF5A35] aso-border-none">
                                    #DDA534
                                </span>
                            </td>
                            <td class="aso-px-6 aso-py-2 aso-flex aso-justify-center aso-space-x-2">
                                
                                <button class="aso-bg-transparent aso-border-none aso-text-[#2DD05B] aso-cursor-pointer">
                                    <img class="aso-w-5 aso-h-5" src="../../../../../../../assets/icons/ic_edit.svg" alt="">
                                </button>
                                <button class="aso-bg-transparent aso-border-none aso-text-[#A00000] aso-cursor-pointer">
                                    <img class="aso-w-5 aso-h-5" src="../../../../../../../assets/icons/ic_delete.svg" alt="">
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
                                
                                <span class="aso-py-1 aso-text-[14px]">
                                    Madrid
                                </span>
                            </td>
                            <td class="aso-px-6 aso-py-2 aso-text-center aso-text-[11px]">
                                Plastic, also known .....
                            </td>
                            <td class="aso-px-6 aso-justify-center aso-translate-y-1">
                                <img class="aso-w-8 aso-h-8" src="../../../../../../../assets/icons/ic_plastic_sub.svg" alt="">
                            </td>
                            <td class="aso-px-6 aso-py-3 aso-space-x-2">
                                <span class="aso-w-fit aso-rounded-lg aso-text-center aso-p-1 aso-px-2 aso-bg-[#9ACD321F] aso-text-[#466801] aso-border-none">
                                    25 x 10 mm
                                </span>
                            </td>
                           <td class="aso-text-[12px] aso-px-6 aso-py-2">
                                <span class="aso-w-fit aso-rounded-lg aso-text-center aso-px-2 aso-p-1 aso-bg-[#F8E7E7] aso-text-[#EF5A35] aso-border-none">
                                    #DDA534
                                </span>
                            </td>
                            <td class="aso-px-6 aso-py-2 aso-flex aso-justify-center aso-space-x-2">
                                
                                <button class="aso-bg-transparent aso-border-none aso-text-[#2DD05B] aso-cursor-pointer">
                                    <img class="aso-w-5 aso-h-5" src="../../../../../../../assets/icons/ic_edit.svg" alt="">
                                </button>
                                <button class="aso-bg-transparent aso-border-none aso-text-[#A00000] aso-cursor-pointer">
                                    <img class="aso-w-5 aso-h-5" src="../../../../../../../assets/icons/ic_delete.svg" alt="">
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
                                
                            </td>
                            <td class="aso-px-6 aso-py-2">
                            <span class="aso-text-[#AAAAAA]">&lt;&lt;  &lt;</span> page 1 sur 8  > <span class="aso-text-[#AAAAAA]"> >> </span> 
                            </td>
                        </tr>
                        
                    </tbody>
                </table>
            </div>
            
        </div>
        <div class="aso-space-y-1" v-show="contentOption">
            <div class="aso-bg-[#F8F9FB] aso-text-[16px] aso-space-x-1 aso-px-4 aso-py-4 aso-flex">
                <div class="aso-font-bold">
                    Name config
                </div>
                <img class="aso-w-4 aso-h-4 aso-py-1" src="../../../../../../../assets/icons/ic_crochet.svg" alt="">
                <div>
                    Material
                </div>
                <img class="aso-w-4 aso-h-4 aso-py-1" src="../../../../../../../assets/icons/ic_crochet.svg" alt="">
                <div class="aso-text-[16px] ">
                    Brass
                </div>
                <img class="aso-w-4 aso-h-4 aso-py-1" src="../../../../../../../assets/icons/ic_crochet.svg" alt="">
                <div class="aso-text-[16px] ">
                    Sub component 1 <span class="aso-font-bold">(Advance)</span>
                </div>
                <img class="aso-w-4 aso-h-4 aso-py-1" src="../../../../../../../assets/icons/ic_crochet.svg" alt="">
                <div class="aso-text-[16px] ">
                    options
                </div>
            </div>
            <div class="aso-bg-[#F8F9FB] aso-font-bold aso-text-[16px] aso-space-x-1 aso-px-4 aso-py-4">
                    Add options
            </div>
            <div class="aso-bg-[#F8F9FB] aso-px-4 aso-py-4 aso-space-y-6">
                <div class="aso-flex aso-justify-between">
                    <div class="aso-w-2/5 aso-space-y-2 aso-flex aso-flex-col aso-text-[14px]">
                        <label for="" class="aso-font-normal">Title</label>
                        <input type="text" class="aso-rounded aso-w-full aso-h-[30px]">
                    </div>
                    <div class="aso-w-2/5 aso-space-y-2 aso-flex aso-flex-col aso-text-[12px]">
                        <label for="" class="aso-font-normal">Description</label>
                        <input type="text" class="aso-rounded aso-w-full aso-h-[30px]">
                    </div>
                </div>
                <div class="aso-flex aso-justify-between">
                    <div class="aso-w-2/5 aso-space-y-2 aso-flex aso-flex-col aso-text-[12px]">
                        <label for="" class="aso-font-normal">Upload icon</label>
                        <div class="aso-relative">
                            <input type="text" class="aso-rounded aso-w-full aso-h-[38px] aso-absolute">
                            <button class="aso-absolute aso-bg-[#016464] aso-border-none aso-w-fit aso-h-fit aso-p-1.5 aso-space-x-2 aso-rounded aso-px-3 aso-text-white aso-opacity-90 hover:aso-opacity-100 aso-translate-x-4 aso-translate-y-1 aso-text-[10px] aso-cursor-pointer">
                                <svg class="aso-w-4 aso-h-4" viewBox="0 0 23 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M22.4375 12.2809V18.5309C22.4375 18.9453 22.2729 19.3427 21.9799 19.6357C21.6868 19.9288 21.2894 20.0934 20.875 20.0934H2.125C1.7106 20.0934 1.31317 19.9288 1.02015 19.6357C0.72712 19.3427 0.5625 18.9453 0.5625 18.5309V12.2809C0.5625 11.8665 0.72712 11.4691 1.02015 11.176C1.31317 10.883 1.7106 10.7184 2.125 10.7184H6.8125C7.0197 10.7184 7.21841 10.8007 7.36493 10.9472C7.51144 11.0937 7.59375 11.2924 7.59375 11.4996C7.59375 11.7068 7.51144 11.9056 7.36493 12.0521C7.21841 12.1986 7.0197 12.2809 6.8125 12.2809H2.125V18.5309H20.875V12.2809H16.1875C15.9803 12.2809 15.7816 12.1986 15.6351 12.0521C15.4886 11.9056 15.4062 11.7068 15.4062 11.4996C15.4062 11.2924 15.4886 11.0937 15.6351 10.9472C15.7816 10.8007 15.9803 10.7184 16.1875 10.7184H20.875C21.2894 10.7184 21.6868 10.883 21.9799 11.176C22.2729 11.4691 22.4375 11.8665 22.4375 12.2809ZM7.36523 6.58362L10.7188 3.22913V11.4996C10.7188 11.7068 10.8011 11.9056 10.9476 12.0521C11.0941 12.1986 11.2928 12.2809 11.5 12.2809C11.7072 12.2809 11.9059 12.1986 12.0524 12.0521C12.1989 11.9056 12.2812 11.7068 12.2812 11.4996V3.22913L15.6348 6.58362C15.7814 6.73022 15.9802 6.81257 16.1875 6.81257C16.3948 6.81257 16.5936 6.73022 16.7402 6.58362C16.8868 6.43703 16.9692 6.2382 16.9692 6.03089C16.9692 5.82357 16.8868 5.62475 16.7402 5.47815L12.0527 0.790654C11.9802 0.718016 11.894 0.660392 11.7992 0.621076C11.7043 0.58176 11.6027 0.561523 11.5 0.561523C11.3973 0.561523 11.2957 0.58176 11.2008 0.621076C11.106 0.660392 11.0198 0.718016 10.9473 0.790654L6.25977 5.47815C6.11317 5.62475 6.03082 5.82357 6.03082 6.03089C6.03082 6.2382 6.11317 6.43703 6.25977 6.58362C6.40636 6.73022 6.60518 6.81257 6.8125 6.81257C7.01982 6.81257 7.21864 6.73022 7.36523 6.58362ZM18.5312 15.4059C18.5312 15.1741 18.4625 14.9475 18.3338 14.7548C18.205 14.5621 18.022 14.4119 17.8078 14.3232C17.5937 14.2345 17.3581 14.2113 17.1308 14.2565C16.9034 14.3017 16.6946 14.4134 16.5307 14.5772C16.3668 14.7411 16.2552 14.9499 16.21 15.1773C16.1648 15.4046 16.188 15.6402 16.2767 15.8543C16.3654 16.0685 16.5156 16.2515 16.7083 16.3803C16.901 16.509 17.1276 16.5778 17.3594 16.5778C17.6702 16.5778 17.9682 16.4543 18.188 16.2345C18.4078 16.0148 18.5312 15.7167 18.5312 15.4059Z" fill="white"/>
                                </svg>
                                <span>Upload icon</span>
                            </button>
                        </div>
                        
                    </div>
                    <div class="aso-w-2/5 aso-space-y-2 aso-flex aso-flex-col aso-text-[12px]">
                        <label for="" class="aso-font-normal">Background / image</label>
                        <div class="aso-relative">
                            <input type="text" class="aso-rounded aso-w-full aso-h-[38px] aso-absolute">
                            <button class="aso-absolute aso-bg-[#016464] aso-border-none aso-w-fit aso-h-fit aso-p-1.5 aso-space-x-2 aso-rounded aso-px-3 aso-text-white aso-opacity-90 hover:aso-opacity-100 aso-translate-x-4 aso-translate-y-1 aso-text-[10px] aso-cursor-pointer">
                                <svg class="aso-w-4 aso-h-4" viewBox="0 0 23 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M22.4375 12.2809V18.5309C22.4375 18.9453 22.2729 19.3427 21.9799 19.6357C21.6868 19.9288 21.2894 20.0934 20.875 20.0934H2.125C1.7106 20.0934 1.31317 19.9288 1.02015 19.6357C0.72712 19.3427 0.5625 18.9453 0.5625 18.5309V12.2809C0.5625 11.8665 0.72712 11.4691 1.02015 11.176C1.31317 10.883 1.7106 10.7184 2.125 10.7184H6.8125C7.0197 10.7184 7.21841 10.8007 7.36493 10.9472C7.51144 11.0937 7.59375 11.2924 7.59375 11.4996C7.59375 11.7068 7.51144 11.9056 7.36493 12.0521C7.21841 12.1986 7.0197 12.2809 6.8125 12.2809H2.125V18.5309H20.875V12.2809H16.1875C15.9803 12.2809 15.7816 12.1986 15.6351 12.0521C15.4886 11.9056 15.4062 11.7068 15.4062 11.4996C15.4062 11.2924 15.4886 11.0937 15.6351 10.9472C15.7816 10.8007 15.9803 10.7184 16.1875 10.7184H20.875C21.2894 10.7184 21.6868 10.883 21.9799 11.176C22.2729 11.4691 22.4375 11.8665 22.4375 12.2809ZM7.36523 6.58362L10.7188 3.22913V11.4996C10.7188 11.7068 10.8011 11.9056 10.9476 12.0521C11.0941 12.1986 11.2928 12.2809 11.5 12.2809C11.7072 12.2809 11.9059 12.1986 12.0524 12.0521C12.1989 11.9056 12.2812 11.7068 12.2812 11.4996V3.22913L15.6348 6.58362C15.7814 6.73022 15.9802 6.81257 16.1875 6.81257C16.3948 6.81257 16.5936 6.73022 16.7402 6.58362C16.8868 6.43703 16.9692 6.2382 16.9692 6.03089C16.9692 5.82357 16.8868 5.62475 16.7402 5.47815L12.0527 0.790654C11.9802 0.718016 11.894 0.660392 11.7992 0.621076C11.7043 0.58176 11.6027 0.561523 11.5 0.561523C11.3973 0.561523 11.2957 0.58176 11.2008 0.621076C11.106 0.660392 11.0198 0.718016 10.9473 0.790654L6.25977 5.47815C6.11317 5.62475 6.03082 5.82357 6.03082 6.03089C6.03082 6.2382 6.11317 6.43703 6.25977 6.58362C6.40636 6.73022 6.60518 6.81257 6.8125 6.81257C7.01982 6.81257 7.21864 6.73022 7.36523 6.58362ZM18.5312 15.4059C18.5312 15.1741 18.4625 14.9475 18.3338 14.7548C18.205 14.5621 18.022 14.4119 17.8078 14.3232C17.5937 14.2345 17.3581 14.2113 17.1308 14.2565C16.9034 14.3017 16.6946 14.4134 16.5307 14.5772C16.3668 14.7411 16.2552 14.9499 16.21 15.1773C16.1648 15.4046 16.188 15.6402 16.2767 15.8543C16.3654 16.0685 16.5156 16.2515 16.7083 16.3803C16.901 16.509 17.1276 16.5778 17.3594 16.5778C17.6702 16.5778 17.9682 16.4543 18.188 16.2345C18.4078 16.0148 18.5312 15.7167 18.5312 15.4059Z" fill="white"/>
                                </svg>
                                <span>Upload image</span>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="aso-flex aso-pt-8 aso-justify-between">
                    <div class="aso-w-2/5 aso-space-y-2 aso-flex aso-flex-col">
                        <label for="" class="">Fixing method</label>
                        <select name="" id="" class="aso-w-full aso-h-[30px] aso-font-normal">
                            <option selected class="aso-font-normal">select fixing method</option>
                        </select>
                    </div>
                    <div class="aso-w-2/5 aso-space-y-2">
                        <label for="" class="">Size</label>
                        <div class="aso-flex aso-justify-between aso-space-x-4">
                            <div class="aso-w-2/5">
                                <input type="text" placeholder="width" class="aso-w-full">
                            </div>
                            <span class="aso-font-bold">x</span>
                            <div class="aso-w-2/5">
                                <input type="text" placeholder="height" class="aso-w-full">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="aso-flex aso-justify-between">
                    <div class="aso-w-2/5 aso-space-y-2 aso-flex aso-flex-col aso-text-[14px]">
                        <label for="" class="aso-font-normal">Shape</label>
                        <input type="text" class="aso-rounded aso-w-full aso-h-[30px]">
                    </div>
                    <div class="aso-w-2/5 aso-space-y-2 aso-flex aso-flex-col aso-text-[12px]">
                        <label for="" class="aso-font-normal">Additional Price</label>
                        <input type="text" class="aso-rounded aso-w-full aso-h-[30px]">
                    </div>
                </div>
                <div class="aso-w-full aso-space-y-2 aso-flex aso-flex-col aso-text-[14px]">
                    <label for="" class="aso-font-normal">Color</label>
                    <input type="color" class="aso-rounded aso-w-full aso-h-[30px]">
                    
                </div>
            </div>
            <div class="aso-bg-[#F8F9FB] aso-flex aso-font-bold aso-space-x-4 aso-px-4 aso-py-4 aso-justify-end aso-items-end">
                <div class="aso-bg-[#016464] aso-rounded">
                    <button class="aso-flex aso-bg-transparent aso-w-fit aso-space-x-2 aso-h-fit aso-rounded aso-text-white aso-px-12 aso-p-2.5 aso-border-none aso-opacity-90 hover:aso-opacity-100 hover:aso-border-none hover:aso-text-white hover:aso-bg-[#016464] aso-cursor-pointer">
                        <div class="aso-font-semibold aso-text-[16px]">Save</div>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
    import { ref } from "vue";
    const listOption = ref(true);
    const contentOption = ref(false);
    const newOption = () => {
        listOption.value = false;
        contentOption.value = true;
    }
</script>
