<template>
    <div class="aso-h-[100vh]">
        <div class="aso-space-y-1" v-show="listOption">
            <div class="aso-flex aso-justify-end aso-bg-[#F8F9FB] aso-px-4 aso-py-4 aso-pb-2">
                <button class="aso-flex aso-w-fit aso-h-fit aso-rounded aso-bg-[#016464] aso-px-4 aso-space-x-2 aso-p-1.5 aso-border-none aso-text-white aso-opacity-90 hover:aso-opacity-100 aso-cursor-pointer" @click="addOption">
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
                <table class="aso-w-full aso-text-center aso-px-4 aso-border aso-border-collapse aso-border-0">
                    <thead class="aso-text-[14px] aso-bg-[#f0f0f1]">
                        <tr class="">
                            <th scope="col" class="aso-px-6 aso-py-3">
                                
                            </th>
                            <th scope="col" class="aso-p-4 aso-px-8 aso-font-semibold">
                                Title 
                            </th>
                            <th scope="col" class="aso-px-6 aso-py-3 aso-font-semibold">
                                Image
                            </th>
                            <th scope="col" class="aso-px-6 aso-py-3 aso-font-semibold">
                                Additional Price
                            </th>
                            <th scope="col" class="aso-px-6 aso-py-3 aso-font-semibold">
                                Size
                            </th>
                            <th scope="col" class="aso-px-6 aso-py-3 aso-font-semibold">
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
                            <td class="aso-px-8 aso-p-4">
                                Madrid
                            </td>
                            <td class="aso-text-[11px] aso-px-8 aso-p-4 ">
                                Madrid, also known .....
                            </td>
                            <td class="aso-px-6 aso-flex aso-justify-center aso-translate-y-1">
                                <svg class="aso-w-12 aso-h-12" viewBox="0 0 52 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect width="52" height="37" fill="#F3F3F3"/>
                                    <g clip-path="url(#clip0_1185_6105)">
                                    <path d="M33.778 11.2222H18.2224C17.9278 11.2222 17.6451 11.3392 17.4368 11.5476C17.2284 11.756 17.1113 12.0386 17.1113 12.3333V25.6666C17.1113 25.9613 17.2284 26.2439 17.4368 26.4523C17.6451 26.6607 17.9278 26.7777 18.2224 26.7777H33.778C34.0727 26.7777 34.3553 26.6607 34.5637 26.4523C34.772 26.2439 34.8891 25.9613 34.8891 25.6666V12.3333C34.8891 12.0386 34.772 11.756 34.5637 11.5476C34.3553 11.3392 34.0727 11.2222 33.778 11.2222ZM18.2224 25.6666V12.3333H33.778V25.6666H18.2224Z" fill="black"/>
                                    <path d="M20.9557 16.7777C21.2854 16.7777 21.6076 16.6799 21.8817 16.4968C22.1558 16.3137 22.3694 16.0534 22.4955 15.7488C22.6217 15.4443 22.6547 15.1092 22.5904 14.7859C22.5261 14.4626 22.3673 14.1656 22.1342 13.9325C21.9012 13.6994 21.6042 13.5407 21.2809 13.4764C20.9576 13.4121 20.6225 13.4451 20.3179 13.5712C20.0134 13.6974 19.7531 13.911 19.5699 14.1851C19.3868 14.4591 19.2891 14.7814 19.2891 15.111C19.2891 15.553 19.4647 15.977 19.7772 16.2895C20.0898 16.6021 20.5137 16.7777 20.9557 16.7777ZM20.9557 14.2221C21.1318 14.221 21.3042 14.2722 21.4511 14.3692C21.598 14.4662 21.7128 14.6047 21.7809 14.767C21.849 14.9293 21.8674 15.1082 21.8338 15.281C21.8001 15.4538 21.7159 15.6127 21.5918 15.7376C21.4677 15.8624 21.3093 15.9476 21.1368 15.9824C20.9642 16.0171 20.7852 15.9999 20.6224 15.9327C20.4597 15.8656 20.3205 15.7517 20.2226 15.6054C20.1247 15.4591 20.0724 15.287 20.0724 15.111C20.0739 14.8772 20.1674 14.6533 20.3327 14.488C20.4981 14.3227 20.7219 14.2291 20.9557 14.2277V14.2221Z" fill="black"/>
                                    <path d="M28.6557 17.539L25.6557 20.539L23.4335 18.3168C23.3294 18.2133 23.1886 18.1552 23.0418 18.1552C22.8951 18.1552 22.7543 18.2133 22.6502 18.3168L19.2891 21.7223V23.2945L23.0613 19.5223L24.8891 21.3223L22.8057 23.4057H24.3335L29.028 18.7112L32.6668 22.3334V20.7668L29.4391 17.539C29.335 17.4355 29.1942 17.3774 29.0474 17.3774C28.9006 17.3774 28.7598 17.4355 28.6557 17.539Z" fill="black"/>
                                    </g>
                                    <defs>
                                    <clipPath id="clip0_1185_6105">
                                    <rect width="20" height="20" fill="white" transform="translate(16 9)"/>
                                    </clipPath>
                                    </defs>
                                </svg>

                            </td>
                            <td class="aso-text-[12px] aso-px-6 aso-py-3">
                                <span class="aso-w-fit aso-text-center aso-rounded-lg aso-px-2 aso-p-1 aso-bg-[#9ACD321F] aso-text-[#466801] aso-border-none">
                                    25 x 10 mm
                                </span>
                            </td>
                            <td class="aso-px-6 aso-flex aso-justify-center -aso-translate-y-3">
                                <button class="aso-bg-transparent aso-border-none aso-text-[#2DD05B] aso-cursor-pointer">
                                    <img class="aso-w-5 aso-h-5" src="../../../../../../../../assets/icons/ic_edit.svg" alt="">
                                </button>
                                <button class="aso-bg-transparent aso-border-none aso-text-[#A00000] aso-cursor-pointer">
                                    <img class="aso-w-5 aso-h-5" src="../../../../../../../../assets/icons/ic_delete.svg" alt="">
                                </button>
                            </td>
                        </tr>
                        <tr class="aso-border-t-0 aso-border-l-0 aso-border-r-0 aso-border-b-2 aso-border-solid aso-border-[#f0f0f1]">
                            <td class="aso-w-[5%] aso-p-4">
                                <span class="aso-flex aso-justify-center">
                                    <input id="checkbox-table-search-1" type="checkbox" class="aso-w-4 aso-h-4  aso-bg-gray-100 aso-border-gray-300 aso-rounded focus:aso-ring-blue-500">
                                </span>
                            </td>
                            <td class="aso-px-8 aso-p-4">
                                Madrid
                            </td>
                            <td class="aso-text-[11px] aso-px-8 aso-p-4 ">
                                Madrid, also known .....
                            </td>
                            <td class="aso-px-6 aso-flex aso-justify-center aso-translate-y-1">
                                <svg class="aso-w-12 aso-h-12" viewBox="0 0 52 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect width="52" height="37" fill="#F3F3F3"/>
                                    <g clip-path="url(#clip0_1185_6105)">
                                    <path d="M33.778 11.2222H18.2224C17.9278 11.2222 17.6451 11.3392 17.4368 11.5476C17.2284 11.756 17.1113 12.0386 17.1113 12.3333V25.6666C17.1113 25.9613 17.2284 26.2439 17.4368 26.4523C17.6451 26.6607 17.9278 26.7777 18.2224 26.7777H33.778C34.0727 26.7777 34.3553 26.6607 34.5637 26.4523C34.772 26.2439 34.8891 25.9613 34.8891 25.6666V12.3333C34.8891 12.0386 34.772 11.756 34.5637 11.5476C34.3553 11.3392 34.0727 11.2222 33.778 11.2222ZM18.2224 25.6666V12.3333H33.778V25.6666H18.2224Z" fill="black"/>
                                    <path d="M20.9557 16.7777C21.2854 16.7777 21.6076 16.6799 21.8817 16.4968C22.1558 16.3137 22.3694 16.0534 22.4955 15.7488C22.6217 15.4443 22.6547 15.1092 22.5904 14.7859C22.5261 14.4626 22.3673 14.1656 22.1342 13.9325C21.9012 13.6994 21.6042 13.5407 21.2809 13.4764C20.9576 13.4121 20.6225 13.4451 20.3179 13.5712C20.0134 13.6974 19.7531 13.911 19.5699 14.1851C19.3868 14.4591 19.2891 14.7814 19.2891 15.111C19.2891 15.553 19.4647 15.977 19.7772 16.2895C20.0898 16.6021 20.5137 16.7777 20.9557 16.7777ZM20.9557 14.2221C21.1318 14.221 21.3042 14.2722 21.4511 14.3692C21.598 14.4662 21.7128 14.6047 21.7809 14.767C21.849 14.9293 21.8674 15.1082 21.8338 15.281C21.8001 15.4538 21.7159 15.6127 21.5918 15.7376C21.4677 15.8624 21.3093 15.9476 21.1368 15.9824C20.9642 16.0171 20.7852 15.9999 20.6224 15.9327C20.4597 15.8656 20.3205 15.7517 20.2226 15.6054C20.1247 15.4591 20.0724 15.287 20.0724 15.111C20.0739 14.8772 20.1674 14.6533 20.3327 14.488C20.4981 14.3227 20.7219 14.2291 20.9557 14.2277V14.2221Z" fill="black"/>
                                    <path d="M28.6557 17.539L25.6557 20.539L23.4335 18.3168C23.3294 18.2133 23.1886 18.1552 23.0418 18.1552C22.8951 18.1552 22.7543 18.2133 22.6502 18.3168L19.2891 21.7223V23.2945L23.0613 19.5223L24.8891 21.3223L22.8057 23.4057H24.3335L29.028 18.7112L32.6668 22.3334V20.7668L29.4391 17.539C29.335 17.4355 29.1942 17.3774 29.0474 17.3774C28.9006 17.3774 28.7598 17.4355 28.6557 17.539Z" fill="black"/>
                                    </g>
                                    <defs>
                                    <clipPath id="clip0_1185_6105">
                                    <rect width="20" height="20" fill="white" transform="translate(16 9)"/>
                                    </clipPath>
                                    </defs>
                                </svg>

                            </td>
                            <td class="aso-text-[12px] aso-px-6 aso-py-3">
                                <span class="aso-w-fit aso-text-center aso-rounded-lg aso-px-2 aso-p-1 aso-bg-[#9ACD321F] aso-text-[#466801] aso-border-none">
                                    25 x 10 mm
                                </span>
                            </td>
                            <td class="aso-px-6 aso-flex aso-justify-center -aso-translate-y-3">
                                <button class="aso-bg-transparent aso-border-none aso-text-[#2DD05B] aso-cursor-pointer">
                                    <img class="aso-w-5 aso-h-5" src="../../../../../../../../assets/icons/ic_edit.svg" alt="">
                                </button>
                                <button class="aso-bg-transparent aso-border-none aso-text-[#A00000] aso-cursor-pointer">
                                    <img class="aso-w-5 aso-h-5" src="../../../../../../../../assets/icons/ic_delete.svg" alt="">
                                </button>
                            </td>
                        </tr>
                        <tr class="aso-border-t-0 aso-border-l-0 aso-border-r-0 aso-border-b-2 aso-border-solid aso-border-[#f0f0f1]">
                            <td class="aso-w-[5%] aso-p-4">
                                <span class="aso-flex aso-justify-center">
                                    <input id="checkbox-table-search-1" type="checkbox" class="aso-w-4 aso-h-4  aso-bg-gray-100 aso-border-gray-300 aso-rounded focus:aso-ring-blue-500">
                                </span>
                            </td>
                            <td class="aso-px-8 aso-p-4">
                                Madrid
                            </td>
                            <td class="aso-text-[11px] aso-px-8 aso-p-4 ">
                                Madrid, also known .....
                            </td>
                            <td class="aso-px-6 aso-flex aso-justify-center aso-translate-y-1">
                                <svg class="aso-w-12 aso-h-12" viewBox="0 0 52 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect width="52" height="37" fill="#F3F3F3"/>
                                    <g clip-path="url(#clip0_1185_6105)">
                                    <path d="M33.778 11.2222H18.2224C17.9278 11.2222 17.6451 11.3392 17.4368 11.5476C17.2284 11.756 17.1113 12.0386 17.1113 12.3333V25.6666C17.1113 25.9613 17.2284 26.2439 17.4368 26.4523C17.6451 26.6607 17.9278 26.7777 18.2224 26.7777H33.778C34.0727 26.7777 34.3553 26.6607 34.5637 26.4523C34.772 26.2439 34.8891 25.9613 34.8891 25.6666V12.3333C34.8891 12.0386 34.772 11.756 34.5637 11.5476C34.3553 11.3392 34.0727 11.2222 33.778 11.2222ZM18.2224 25.6666V12.3333H33.778V25.6666H18.2224Z" fill="black"/>
                                    <path d="M20.9557 16.7777C21.2854 16.7777 21.6076 16.6799 21.8817 16.4968C22.1558 16.3137 22.3694 16.0534 22.4955 15.7488C22.6217 15.4443 22.6547 15.1092 22.5904 14.7859C22.5261 14.4626 22.3673 14.1656 22.1342 13.9325C21.9012 13.6994 21.6042 13.5407 21.2809 13.4764C20.9576 13.4121 20.6225 13.4451 20.3179 13.5712C20.0134 13.6974 19.7531 13.911 19.5699 14.1851C19.3868 14.4591 19.2891 14.7814 19.2891 15.111C19.2891 15.553 19.4647 15.977 19.7772 16.2895C20.0898 16.6021 20.5137 16.7777 20.9557 16.7777ZM20.9557 14.2221C21.1318 14.221 21.3042 14.2722 21.4511 14.3692C21.598 14.4662 21.7128 14.6047 21.7809 14.767C21.849 14.9293 21.8674 15.1082 21.8338 15.281C21.8001 15.4538 21.7159 15.6127 21.5918 15.7376C21.4677 15.8624 21.3093 15.9476 21.1368 15.9824C20.9642 16.0171 20.7852 15.9999 20.6224 15.9327C20.4597 15.8656 20.3205 15.7517 20.2226 15.6054C20.1247 15.4591 20.0724 15.287 20.0724 15.111C20.0739 14.8772 20.1674 14.6533 20.3327 14.488C20.4981 14.3227 20.7219 14.2291 20.9557 14.2277V14.2221Z" fill="black"/>
                                    <path d="M28.6557 17.539L25.6557 20.539L23.4335 18.3168C23.3294 18.2133 23.1886 18.1552 23.0418 18.1552C22.8951 18.1552 22.7543 18.2133 22.6502 18.3168L19.2891 21.7223V23.2945L23.0613 19.5223L24.8891 21.3223L22.8057 23.4057H24.3335L29.028 18.7112L32.6668 22.3334V20.7668L29.4391 17.539C29.335 17.4355 29.1942 17.3774 29.0474 17.3774C28.9006 17.3774 28.7598 17.4355 28.6557 17.539Z" fill="black"/>
                                    </g>
                                    <defs>
                                    <clipPath id="clip0_1185_6105">
                                    <rect width="20" height="20" fill="white" transform="translate(16 9)"/>
                                    </clipPath>
                                    </defs>
                                </svg>

                            </td>
                            <td class="aso-text-[12px] aso-px-6 aso-py-3">
                                <span class="aso-w-fit aso-text-center aso-rounded-lg aso-px-2 aso-p-1 aso-bg-[#9ACD321F] aso-text-[#466801] aso-border-none">
                                    25 x 10 mm
                                </span>
                            </td>
                            <td class="aso-px-6 aso-flex aso-justify-center -aso-translate-y-3">
                                <button class="aso-bg-transparent aso-border-none aso-text-[#2DD05B] aso-cursor-pointer">
                                    <img class="aso-w-5 aso-h-5" src="../../../../../../../../assets/icons/ic_edit.svg" alt="">
                                </button>
                                <button class="aso-bg-transparent aso-border-none aso-text-[#A00000] aso-cursor-pointer">
                                    <img class="aso-w-5 aso-h-5" src="../../../../../../../../assets/icons/ic_delete.svg" alt="">
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="aso-bg-[#F8F9FB] aso-flex aso-font-bold aso-space-x-4 aso-px-4 aso-py-4 aso-justify-end aso-items-end">
                <div class="aso-bg-[#016464] aso-rounded">
                    <button class="aso-flex aso-bg-transparent aso-w-fit aso-space-x-2 aso-h-fit aso-text-white aso-px-12 aso-p-2.5 aso-rounded aso-border-none aso-opacity-90 hover:aso-opacity-100 hover:aso-border-none hover:aso-text-white hover:aso-bg-[#016464] aso-cursor-pointer">
                        <div class="aso-font-semibold aso-text-[16px]">Save</div>
                    </button>
                </div>
            </div>
        </div>
        <div class="aso-space-y-1" v-show="contentOption">
            <div class="aso-text-[16px] aso-font-bold aso-px-8 aso-py-4 aso-bg-[#F8F9FB]">
                Add options
            </div>
            <div class="aso-px-4 aso-py-4 aso-bg-[#F8F9FB] aso-space-y-6">
                <div class="aso-flex aso-justify-between">
                    <div class="aso-w-2/5 aso-flex aso-flex-col aso-space-y-2 aso-text-[14px]">
                        <label for="" class="aso-font-normal">Title</label>
                        <input type="text" class="aso-rounded aso-w-full aso-h-[30px]">
                    </div>
                    <div class="aso-w-2/5 aso-flex aso-flex-col aso-space-y-2 aso-text-[12px]">
                        <label for="" class="aso-font-normal">Description</label>
                        <input type="text" class="aso-rounded aso-w-full aso-h-[30px]">
                    </div>
                </div>
                <div class="aso-flex aso-justify-between aso-pb-12">
                    <div class="aso-w-2/5 aso-flex aso-flex-col aso-space-y-2 aso-text-[12px]">
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
                    <div class="aso-w-2/5 aso-flex aso-flex-col aso-space-y-2 aso-text-[12px]">
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
                <div class="aso-space-y-2 aso-flex aso-flex-col aso-text-[12px]">
                    <label for="" class="aso-font-normal">Additional Price</label>
                    <input type="text" class="aso-rounded aso-w-full aso-h-[30px]">
                </div>
            </div>
            <div class="aso-bg-[#F8F9FB] aso-flex aso-font-bold aso-space-x-4 aso-px-4 aso-py-4 aso-justify-end aso-items-end">
                <div class="aso-bg-[#016464] aso-rounded">
                    <button class="aso-flex aso-bg-transparent aso-w-fit aso-space-x-2 aso-h-fit aso-text-white aso-px-12 aso-p-2.5 aso-border-none aso-opacity-90 hover:aso-opacity-100 hover:aso-border-none hover:aso-text-white hover:aso-bg-[#016464] aso-cursor-pointer">
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
    const addOption = () => {
        listOption.value = false;
        contentOption.value = true;
    }
    
</script>
