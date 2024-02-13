<template>
    <div class="aso-justify-center aso-items-center aso-h-[100vh]" id="app">
        <div class="aso-pb-4 aso-bg-[#F8F9FB] aso-px-4 aso-border-b-3 aso-border-t-0 aso-border-l-0 aso-border-r-0 aso-border-solid aso-border-[#f0f0f1] ">
           <div class="aso-bg-[#F8F9FB] aso-text-[16px] aso-font-bold aso-py-4">
                Size group
           </div>
           <div class="aso-flex aso-space-x-2 aso-w-4/4">
                <div class="aso-w-1/4 aso-relative">
                    <input name="" id="" class="aso-w-[95%] aso-rounded aso-border-[1px] aso-border-solid aso-border-[#D4D4D4] aso-p-4 aso-h-[40px] aso-text-[12px] aso-text-[#898383] aso-absolute" placeholder="Search size group">
                    <button class="aso-absolute aso-w-fit aso-h-fit aso-border-none aso-bg-[#F7F8F8] aso-rounded aso-shadow-[1px_1px_7px_1px_rgba(0,0,0,0.1)] aso-translate-y-2.5 aso-right-4">
                        <svg class="aso-w-4 aso-h-4" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 10.5C6 10.3674 6.05268 10.2402 6.14645 10.1464C6.24021 10.0527 6.36739 10 6.5 10H9.5C9.63261 10 9.75979 10.0527 9.85355 10.1464C9.94732 10.2402 10 10.3674 10 10.5C10 10.6326 9.94732 10.7598 9.85355 10.8536C9.75979 10.9473 9.63261 11 9.5 11H6.5C6.36739 11 6.24021 10.9473 6.14645 10.8536C6.05268 10.7598 6 10.6326 6 10.5ZM4 7.5C4 7.36739 4.05268 7.24021 4.14645 7.14645C4.24021 7.05268 4.36739 7 4.5 7H11.5C11.6326 7 11.7598 7.05268 11.8536 7.14645C11.9473 7.24021 12 7.36739 12 7.5C12 7.63261 11.9473 7.75979 11.8536 7.85355C11.7598 7.94732 11.6326 8 11.5 8H4.5C4.36739 8 4.24021 7.94732 4.14645 7.85355C4.05268 7.75979 4 7.63261 4 7.5ZM2 4.5C2 4.36739 2.05268 4.24021 2.14645 4.14645C2.24021 4.05268 2.36739 4 2.5 4H13.5C13.6326 4 13.7598 4.05268 13.8536 4.14645C13.9473 4.24021 14 4.36739 14 4.5C14 4.63261 13.9473 4.75979 13.8536 4.85355C13.7598 4.94732 13.6326 5 13.5 5H2.5C2.36739 5 2.24021 4.94732 2.14645 4.85355C2.05268 4.75979 2 4.63261 2 4.5Z" fill="#586374"/>
                        </svg>
                    </button>
                </div>
                <div class="aso-w-1/4">
                    <select name="" id="" class="aso-w-[95%] aso-h-[40px]">
                        <option selected>filter by mode</option>
                    </select>
                </div>
                <div class="aso-w-1/4">
                    <select name="" id="" class="aso-w-[95%] aso-h-[40px]">
                        <option selected>filter by product type</option>
                    </select>
                </div>
                <div class="aso-w-1/4">
                    <button class="aso-flex aso-w-fit aso-h-fit aso-rounded aso-bg-[#016464] aso-px-6 aso-space-x-2 aso-p-2 aso-border-none aso-text-white">
                        <svg class="aso-w-6 aso-h-6" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g id="plus-lg">
                            <path id="Vector" fill-rule="evenodd" clip-rule="evenodd" d="M11 2.75C11.1823 2.75 11.3572 2.82243 11.4861 2.95136C11.6151 3.0803 11.6875 3.25516 11.6875 3.4375V10.3125H18.5625C18.7448 10.3125 18.9197 10.3849 19.0486 10.5139C19.1776 10.6428 19.25 10.8177 19.25 11C19.25 11.1823 19.1776 11.3572 19.0486 11.4861C18.9197 11.6151 18.7448 11.6875 18.5625 11.6875H11.6875V18.5625C11.6875 18.7448 11.6151 18.9197 11.4861 19.0486C11.3572 19.1776 11.1823 19.25 11 19.25C10.8177 19.25 10.6428 19.1776 10.5139 19.0486C10.3849 18.9197 10.3125 18.7448 10.3125 18.5625V11.6875H3.4375C3.25516 11.6875 3.0803 11.6151 2.95136 11.4861C2.82243 11.3572 2.75 11.1823 2.75 11C2.75 10.8177 2.82243 10.6428 2.95136 10.5139C3.0803 10.3849 3.25516 10.3125 3.4375 10.3125H10.3125V3.4375C10.3125 3.25516 10.3849 3.0803 10.5139 2.95136C10.6428 2.82243 10.8177 2.75 11 2.75Z" fill="white"/>
                            </g>
                        </svg>
                        <div class="aso-text-[15px]">
                            Add new size group
                        </div>
                    </button>
                </div>
           </div>
        </div>
        <div class="aso-bg-[#F8F9FB] aso-h-[30px] aso-p-3">
            <div class="aso-flex aso-flex-row-reverse -aso-translate-x-[3%]">
                <input name="" id="" class="aso-w-[3.5%] aso-h-[25px] aso-flex -aso-translate-x-0.5 aso-rounded-lg aso-border-[1px] aso-border-solid aso-border-[#D4D4D4] aso-p-3 aso-h-[20px] aso-text-[12px] aso-text-[#898383] aso-absolute" placeholder="7">
                <button class="aso-absolute aso-w-fit aso-h-fit aso-border-none aso-bg-transparent -aso-translate-x-1 aso-translate-y-1">
                    <svg class="aso-w-2.5 aso-h-2.5" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M0.440056 1.06506C0.480696 1.02431 0.528974 0.991987 0.582126 0.969932C0.635278 0.947876 0.692259 0.936523 0.749806 0.936523C0.807352 0.936523 0.864333 0.947876 0.917485 0.969932C0.970637 0.991987 1.01892 1.02431 1.05956 1.06506L5.99981 6.00618L10.9401 1.06506C10.9807 1.02438 11.029 0.992112 11.0822 0.970097C11.1353 0.948083 11.1923 0.936752 11.2498 0.936752C11.3073 0.936752 11.3643 0.948083 11.4174 0.970097C11.4706 0.992112 11.5189 1.02438 11.5596 1.06506C11.6002 1.10573 11.6325 1.15402 11.6545 1.20717C11.6765 1.26032 11.6879 1.31728 11.6879 1.37481C11.6879 1.43233 11.6765 1.48929 11.6545 1.54244C11.6325 1.59559 11.6002 1.64388 11.5596 1.68456L6.30956 6.93456C6.26892 6.9753 6.22064 7.00762 6.16748 7.02968C6.11433 7.05173 6.05735 7.06309 5.99981 7.06309C5.94226 7.06309 5.88528 7.05173 5.83213 7.02968C5.77897 7.00762 5.7307 6.9753 5.69006 6.93456L0.440056 1.68456C0.399313 1.64392 0.366988 1.59564 0.344932 1.54248C0.322876 1.48933 0.311523 1.43235 0.311523 1.37481C0.311523 1.31726 0.322876 1.26028 0.344932 1.20713C0.366988 1.15397 0.399313 1.1057 0.440056 1.06506Z" fill="#586374"/>
                    </svg>
                </button>
            </div>
        </div>
        <div class="aso-relative" id="monTableau">
            <table class="aso-text-left aso-border aso-border-collapse aso-border-0 aso-w-full">
                <thead class="aso-text-[14px] aso-bg-[#f0f0f1]">
                    <tr>
                        <th scope="col" class="aso-p-4 aso-w-12">
                            Title
                        </th>
                        <th scope="col" class="aso-px-6 aso-py-3">
                            width
                        </th>
                        <th scope="col" class="aso-px-6 aso-py-3">
                            height
                        </th>
                        <th scope="col" class="aso-px-6 aso-py-3">
                            thickness
                        </th>
                        <th scope="col" class="aso-px-6 aso-py-3">
                            Action
                        </th>
                        
                    </tr>
                </thead>
                <tbody class="aso-bg-white">
                   
                    <tr class="aso-border-t-0 aso-border-l-0 aso-border-r-0 aso-border-b-2 aso-border-solid aso-border-[#f0f0f1]">
                        
                        <td class="aso-px-6 aso-py-4 aso-flex aso-space-x-2">
                            100X50mm
                        </td>
                        <td class="aso-px-6 aso-py-4">
                            100 mm
                        </td>
                        <td class="aso-px-6 aso-py-4">
                            50 mm
                        </td>
                        <td class="aso-px-6 aso-py-4">
                            NONE
                        </td>
                        <td class="aso-px-6 aso-py-4">
                            <div class="aso-flex aso-space-x-2">
                               <div>
                                    <button class="aso-bg-transparent aso-border-none aso-text-[#2DD05B] aso-cursor-pointer">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="aso-w-4 aso-h-4">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                        </svg>
                                    </button>
                                </div>
                                <div>
                                    <button class="aso-bg-transparent aso-border-none aso-text-[#A00000] aso-cursor-pointer">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="aso-w-4 aso-h-4">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr class="aso-border-t-0 aso-border-l-0 aso-border-r-0 aso-border-b-2 aso-border-solid aso-border-[#f0f0f1]">
                        
                        <td class="aso-px-6 aso-py-4 aso-flex aso-space-x-2">
                            100X50mm
                        </td>
                        <td class="aso-px-6 aso-py-4">
                            100 mm
                        </td>
                        <td class="aso-px-6 aso-py-4">
                            50 mm
                        </td>
                        <td class="aso-px-6 aso-py-4">
                            NONE
                        </td>
                        <td class="aso-px-6 aso-py-4">
                            <div class="aso-flex aso-space-x-2">
                               <div>
                                    <button class="aso-bg-transparent aso-border-none aso-text-[#2DD05B] aso-cursor-pointer">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="aso-w-4 aso-h-4">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                        </svg>
                                    </button>
                                </div>
                                <div>
                                    <button class="aso-bg-transparent aso-border-none aso-text-[#A00000] aso-cursor-pointer">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="aso-w-4 aso-h-4">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr class="aso-border-t-0 aso-border-l-0 aso-border-r-0 aso-border-b-2 aso-border-solid aso-border-[#f0f0f1]">
                        
                        <td class="aso-px-6 aso-py-4 aso-flex aso-space-x-2">
                            100X50mm
                        </td>
                        <td class="aso-px-6 aso-py-4">
                            100 mm
                        </td>
                        <td class="aso-px-6 aso-py-4">
                            50 mm
                        </td>
                        <td class="aso-px-6 aso-py-4">
                            NONE
                        </td>
                        <td class="aso-px-6 aso-py-4">
                            <div class="aso-flex aso-space-x-2">
                               <div>
                                    <button class="aso-bg-transparent aso-border-none aso-text-[#2DD05B] aso-cursor-pointer">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="aso-w-4 aso-h-4">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                        </svg>
                                    </button>
                                </div>
                                <div>
                                    <button class="aso-bg-transparent aso-border-none aso-text-[#A00000] aso-cursor-pointer">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="aso-w-4 aso-h-4">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </td>
                    </tr>
                    
                    
                </tbody>
            </table>
        </div>
    </div>
</template>
<script setup>
</script>