<template>
    <div class="">
        <div class="aso-space-y-1 aso-translate-y-9" v-if="!createTemplate">
            <div v-if="!isFetching" class="aso-space-y-1 aso-sticky aso-top-9 aso-z-[9999] aso-w-full aso-shadow-md aso-flex aso-justify-center aso-items-center aso-bg-[#F4F4F4] aso-translate-y-2">
                <div class="aso-bg-[#F4F4F4] aso-p-2 aso-space-x-6 aso-justify-center aso-items-center aso-flex">
                    <button @click="state='templates'" :class="`aso-flex aso-text-[14px] aso-px-6 aso-p-2 aso-w-fit aso-h-fit aso-bg-white aso-rounded aso-border-none aso-font-semibold ${ state == 'templates' ?'aso-font-bold aso-text-[#016464] aso-bg-[#E1E1E1]':''} hover:aso-bg-[#E1E1E1] hover:aso-text-[#016464] aso-cursor-pointer`" >Templates</button>
                    <button @click="state='category'" :class="`aso-flex aso-text-[14px] aso-px-6 aso-p-2 aso-w-fit aso-h-fit aso-bg-white aso-rounded aso-border-none aso-font-semibold ${ state == 'category' ?'aso-font-bold aso-text-[#016464] aso-bg-[#E1E1E1]':''} hover:aso-bg-[#E1E1E1] hover:aso-text-[#016464] aso-cursor-pointer`" >Category</button>
                </div>
            </div>
            <div v-show="state=='templates'">
                <div class="aso-bg-[#F8F9FB] aso-p-4 aso-grid aso-grid-cols-4">
                    <div class="aso-w-fit aso-bg-[#d3d3d3] aso-border-[1px] aso-border-solid aso-border-[#d3d3d3] aso-p-4">
                        <button class="aso-w-52 aso-h-[170px] aso-cursor-pointer aso-bg-transparent aso-border-none aso-text-[15px] aso-flex aso-space-x-2 aso-px-2 aso-rounded-md aso-translate-y-14" @click="addTemplate">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="aso-w-9 aso-translate-y-2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                            <span class="aso-translate-y-20 aso-text-[17px]">Add new template</span>
                        </button>
                    </div>
                    <div class="aso-border-[1px] aso-border-[#d3d3d3] aso-border-solid aso-w-fit aso-p-3 aso-bg-white">
                        <div class="aso-w-fit">
                            <img class="aso-w-52" src="../../../../assets/images/img_rectangle_noir.png" alt="">
                        </div>
    
                        <div class="aso-space-y-1">
                            <div class="aso-font-bold aso-text-[14px]">House sign</div>
                            <div>600 x 150mm</div>
                        </div>
                        <div class="aso-flex aso-justify-end -aso-translate-y-7">
                            <span class="aso-font-bold">$ 155</span>
                        </div>
                        <div class="-aso-translate-y-4">
                            <svg width="210" height="1" viewBox="0 0 258 1" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <line y1="0.5" x2="258" y2="0.5" stroke="url(#paint0_linear_1396_9108)"/>
                                <defs>
                                <linearGradient id="paint0_linear_1396_9108" x1="129" y1="1" x2="129" y2="2" gradientUnits="userSpaceOnUse">
                                <stop offset="0.055" stop-color="#B5B5B5" stop-opacity="0.36"/>
                                <stop offset="0.58" stop-color="#B5B5B5"/>
                                </linearGradient>
                                </defs>
                            </svg>
    
                        </div>
                        <div class="aso-flex">
                            <div class="aso-bg-[#FFA08859] aso-w-fit aso-p-1.5 aso-rounded-full aso-px-4 -aso-translate-y-1">
                                <span class="aso-text-[#720909] aso-font-bold aso-text-[12px]">Price : $ 155</span>
                            </div>
                            <div class="aso-flex aso-justify-end aso-translate-x-6 -aso-translate-y-0.5">
                                <button class="aso-bg-transparent aso-border-none aso-text-[#2DD05B] aso-cursor-pointer">
                                    <img class="aso-w-5 aso-h-5" src="../../../../assets/icons/ic_edit.svg" alt="">
                                </button>
                                <button class="aso-bg-transparent aso-border-none aso-text-[#A00000] aso-cursor-pointer">
                                    <img class="aso-w-5 aso-h-5" src="../../../../assets/icons/ic_delete.svg" alt="">
                                </button>
                                <button class="aso-border-none aso-bg-transparent aso-cursor-pointer">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="aso-w-5 aso-h-5">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="aso-border-[1px] aso-border-[#d3d3d3] aso-border-solid aso-w-fit aso-p-3 aso-bg-white">
                        <div class="aso-w-fit">
                            <img class="aso-w-52" src="../../../../assets/images/img_rectangle_noir.png" alt="">
                        </div>
    
                        <div class="aso-space-y-1">
                            <div class="aso-font-bold aso-text-[14px]">House sign</div>
                            <div>600 x 150mm</div>
                        </div>
                        <div class="aso-flex aso-justify-end -aso-translate-y-7">
                            <span class="aso-font-bold">$ 155</span>
                        </div>
                        <div class="-aso-translate-y-4">
                            <svg width="210" height="1" viewBox="0 0 258 1" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <line y1="0.5" x2="258" y2="0.5" stroke="url(#paint0_linear_1396_9108)"/>
                                <defs>
                                <linearGradient id="paint0_linear_1396_9108" x1="129" y1="1" x2="129" y2="2" gradientUnits="userSpaceOnUse">
                                <stop offset="0.055" stop-color="#B5B5B5" stop-opacity="0.36"/>
                                <stop offset="0.58" stop-color="#B5B5B5"/>
                                </linearGradient>
                                </defs>
                            </svg>
    
                        </div>
                        <div class="aso-flex">
                            <div class="aso-bg-[#FFA08859] aso-w-fit aso-p-1.5 aso-rounded-full aso-px-4 -aso-translate-y-1">
                                <span class="aso-text-[#720909] aso-font-bold aso-text-[12px]">Price : $ 155</span>
                            </div>
                            <div class="aso-flex aso-justify-end aso-translate-x-6 -aso-translate-y-0.5">
                                <button class="aso-bg-transparent aso-border-none aso-text-[#2DD05B] aso-cursor-pointer">
                                    <img class="aso-w-5 aso-h-5" src="../../../../assets/icons/ic_edit.svg" alt="">
                                </button>
                                <button class="aso-bg-transparent aso-border-none aso-text-[#A00000] aso-cursor-pointer">
                                    <img class="aso-w-5 aso-h-5" src="../../../../assets/icons/ic_delete.svg" alt="">
                                </button>
                                <button class="aso-border-none aso-bg-transparent aso-cursor-pointer">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="aso-w-5 aso-h-5">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="aso-border-[1px] aso-border-[#d3d3d3] aso-border-solid aso-w-fit aso-p-3 aso-bg-white">
                        <div class="aso-w-fit">
                            <img class="aso-w-52" src="../../../../assets/images/img_rectangle_noir.png" alt="">
                        </div>
    
                        <div class="aso-space-y-1">
                            <div class="aso-font-bold aso-text-[14px]">House sign</div>
                            <div>600 x 150mm</div>
                        </div>
                        <div class="aso-flex aso-justify-end -aso-translate-y-7">
                            <span class="aso-font-bold">$ 155</span>
                        </div>
                        <div class="-aso-translate-y-4">
                            <svg width="210" height="1" viewBox="0 0 258 1" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <line y1="0.5" x2="258" y2="0.5" stroke="url(#paint0_linear_1396_9108)"/>
                                <defs>
                                <linearGradient id="paint0_linear_1396_9108" x1="129" y1="1" x2="129" y2="2" gradientUnits="userSpaceOnUse">
                                <stop offset="0.055" stop-color="#B5B5B5" stop-opacity="0.36"/>
                                <stop offset="0.58" stop-color="#B5B5B5"/>
                                </linearGradient>
                                </defs>
                            </svg>
    
                        </div>
                        <div class="aso-flex">
                            <div class="aso-bg-[#FFA08859] aso-w-fit aso-p-1.5 aso-rounded-full aso-px-4 -aso-translate-y-1">
                                <span class="aso-text-[#720909] aso-font-bold aso-text-[12px]">Price : $ 155</span>
                            </div>
                            <div class="aso-flex aso-justify-end aso-translate-x-6 -aso-translate-y-0.5">
                                <button class="aso-bg-transparent aso-border-none aso-text-[#2DD05B] aso-cursor-pointer">
                                    <img class="aso-w-5 aso-h-5" src="../../../../assets/icons/ic_edit.svg" alt="">
                                </button>
                                <button class="aso-bg-transparent aso-border-none aso-text-[#A00000] aso-cursor-pointer">
                                    <img class="aso-w-5 aso-h-5" src="../../../../assets/icons/ic_delete.svg" alt="">
                                </button>
                                <button class="aso-border-none aso-bg-transparent aso-cursor-pointer">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="aso-w-5 aso-h-5">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="aso-border-[1px] aso-border-[#d3d3d3] aso-border-solid aso-w-fit aso-p-3 aso-bg-white">
                        <div class="aso-w-fit">
                            <img class="aso-w-52" src="../../../../assets/images/img_rectangle_noir.png" alt="">
                        </div>
    
                        <div class="aso-space-y-1">
                            <div class="aso-font-bold aso-text-[14px]">House sign</div>
                            <div>600 x 150mm</div>
                        </div>
                        <div class="aso-flex aso-justify-end -aso-translate-y-7">
                            <span class="aso-font-bold">$ 155</span>
                        </div>
                        <div class="-aso-translate-y-4">
                            <svg width="210" height="1" viewBox="0 0 258 1" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <line y1="0.5" x2="258" y2="0.5" stroke="url(#paint0_linear_1396_9108)"/>
                                <defs>
                                <linearGradient id="paint0_linear_1396_9108" x1="129" y1="1" x2="129" y2="2" gradientUnits="userSpaceOnUse">
                                <stop offset="0.055" stop-color="#B5B5B5" stop-opacity="0.36"/>
                                <stop offset="0.58" stop-color="#B5B5B5"/>
                                </linearGradient>
                                </defs>
                            </svg>
    
                        </div>
                        <div class="aso-flex">
                            <div class="aso-bg-[#FFA08859] aso-w-fit aso-p-1.5 aso-rounded-full aso-px-4 -aso-translate-y-1">
                                <span class="aso-text-[#720909] aso-font-bold aso-text-[12px]">Price : $ 155</span>
                            </div>
                            <div class="aso-flex aso-justify-end aso-translate-x-6 -aso-translate-y-0.5">
                                <button class="aso-bg-transparent aso-border-none aso-text-[#2DD05B] aso-cursor-pointer">
                                    <img class="aso-w-5 aso-h-5" src="../../../../assets/icons/ic_edit.svg" alt="">
                                </button>
                                <button class="aso-bg-transparent aso-border-none aso-text-[#A00000] aso-cursor-pointer">
                                    <img class="aso-w-5 aso-h-5" src="../../../../assets/icons/ic_delete.svg" alt="">
                                </button>
                                <button class="aso-border-none aso-bg-transparent aso-cursor-pointer">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="aso-w-5 aso-h-5">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-show="state=='category'">
                <div class="aso-bg-[#F8F9FB]">
                    <div class="aso-relative aso-translate-y-1" id="monTableau">
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
                                        Title
                                    </td>
                                    <td class="aso-px-6 aso-py-2 aso-text-center aso-text-[11px]">
                                        <span class="aso-overflow-hidden aso-whitespace-nowrap aso-text-ellipsis">Description</span>
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
                                        Title
                                    </td>
                                    <td class="aso-px-6 aso-py-2 aso-text-center aso-text-[11px]">
                                        <span class="aso-overflow-hidden aso-whitespace-nowrap aso-text-ellipsis">Description</span>
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
                                        Title
                                    </td>
                                    <td class="aso-px-6 aso-py-2 aso-text-center aso-text-[11px]">
                                        <span class="aso-overflow-hidden aso-whitespace-nowrap aso-text-ellipsis">Description</span>
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
                                        Title
                                    </td>
                                    <td class="aso-px-6 aso-py-2 aso-text-center aso-text-[11px]">
                                        <span class="aso-overflow-hidden aso-whitespace-nowrap aso-text-ellipsis">Description</span>
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
                                        Title
                                    </td>
                                    <td class="aso-px-6 aso-py-2 aso-text-center aso-text-[11px]">
                                        <span class="aso-overflow-hidden aso-whitespace-nowrap aso-text-ellipsis">Description</span>
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
                </div>
            </div>
        </div>
        <div class="aso-space-y-1 aso-translate-y-9" v-if="createTemplate">
            <div class="aso-bg-[#F8F9FB] aso-px-4 aso-py-4">
                <span class="aso-text-[16px] aso-font-bold">
                    Templates
                </span>
            </div>
            <div class="aso-bg-[#F8F9FB] aso-px-4 aso-py-4 aso-space-y-8">
                <div class="aso-flex aso-flex-col aso-space-y-2">
                    <label class="aso-text-[12px] aso-text-[#444444]">Select category</label>
                    <select class="aso-w-full">
                        <option>select category</option>
                    </select>
                </div>
                <div class="aso-flex aso-justify-end aso-w-4/4 aso-text-[12px] aso-pb-2">
                    <button class="aso-flex aso-w-fit aso-h-fit aso-rounded aso-bg-[#016464] aso-px-4 aso-space-x-2 aso-p-1.5 aso-border-none aso-text-white aso-opacity-90 hover:aso-opacity-100 aso-cursor-pointer" @click="addCategory">
                        <svg class="aso-w-5 aso-h-5" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g id="plus-lg">
                            <path id="Vector" fill-rule="evenodd" clip-rule="evenodd" d="M11 2.75C11.1823 2.75 11.3572 2.82243 11.4861 2.95136C11.6151 3.0803 11.6875 3.25516 11.6875 3.4375V10.3125H18.5625C18.7448 10.3125 18.9197 10.3849 19.0486 10.5139C19.1776 10.6428 19.25 10.8177 19.25 11C19.25 11.1823 19.1776 11.3572 19.0486 11.4861C18.9197 11.6151 18.7448 11.6875 18.5625 11.6875H11.6875V18.5625C11.6875 18.7448 11.6151 18.9197 11.4861 19.0486C11.3572 19.1776 11.1823 19.25 11 19.25C10.8177 19.25 10.6428 19.1776 10.5139 19.0486C10.3849 18.9197 10.3125 18.7448 10.3125 18.5625V11.6875H3.4375C3.25516 11.6875 3.0803 11.6151 2.95136 11.4861C2.82243 11.3572 2.75 11.1823 2.75 11C2.75 10.8177 2.82243 10.6428 2.95136 10.5139C3.0803 10.3849 3.25516 10.3125 3.4375 10.3125H10.3125V3.4375C10.3125 3.25516 10.3849 3.0803 10.5139 2.95136C10.6428 2.82243 10.8177 2.75 11 2.75Z" fill="white"/>
                            </g>
                        </svg>
                        <div class="aso-text-[14px]">
                            Add new category
                        </div>
                    </button>
                </div>
            </div>
            <div class="aso-bg-[#F8F9FB] aso-px-4 aso-py-8 aso-space-y-8">
                <div class="aso-flex aso-justify-between">
                    <div class="aso-w-2/5 aso-space-y-2 aso-flex aso-flex-col aso-text-[14px]">
                        <label for="" class="aso-font-normal">Name template</label>
                        <input type="text" class="aso-rounded aso-w-full aso-h-[30px]">
                    </div>
                    <div class="aso-w-2/5 aso-space-y-2 aso-flex aso-flex-col aso-text-[12px]">
                        <label for="" class="aso-font-normal">Base Price</label>
                        <input type="text" class="aso-rounded aso-w-full aso-h-[32px]">
                        
                    </div>
                </div>
            </div>
            <div class="aso-bg-[#F8F9FB] aso-flex aso-font-bold aso-space-x-4 aso-px-4 aso-py-4 aso-justify-end aso-items-end">
                <div class="aso-bg-[#016464] aso-rounded">
                    <button class="aso-flex aso-bg-transparent aso-w-fit aso-space-x-2 aso-h-fit aso-px-8 aso-p-2 aso-border-none aso-text-white aso-opacity-90 hover:aso-border-none hover:aso-text-white hover:aso-opacity-100 aso-cursor-pointer" @click="back">
                        <svg class="aso-w-6 aso-h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 12L5 8V11L17.17 11C17.3756 10.414 17.7586 9.90661 18.2657 9.54821C18.7729 9.18981 19.379 8.9982 20 9C20.7956 9 21.5587 9.31607 22.1213 9.87868C22.6839 10.4413 23 11.2044 23 12C23 12.7956 22.6839 13.5587 22.1213 14.1213C21.5587 14.6839 20.7956 15 20 15C18.69 15 17.58 14.17 17.17 13L5 13V16L1 12Z" fill="currentColor"/>
                        </svg>

                        <div class="aso-font-semibold aso-text-[16px]">Back</div>
                    </button>
                </div>
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
        <!-- open Modal-->
        <div v-if="openModal" @click.self="closeModal" class="aso-z-[9999] aso-bg-gray-400 aso-overflow-y-auto aso-overflow-x-hidden aso-fixed aso-top-0 aso-right-[25%] aso-left-[75%] aso-z-50 aso-flex aso-justify-center aso-items-center aso-w-full md:aso-inset-0 aso-h-[calc(100%-1rem)] aso-h-[100vh]">
            <div class="aso-relative aso-p-4 aso-w-full aso-max-w-md aso-max-h-full">
                <div class="aso-relative aso-bg-white aso-rounded-lg aso-shadow dark:bg-gray-700">
                    <button @click.stop="closeModal" type="button" class="aso-absolute aso-top-3 aso-end-2.5 aso-text-gray-400 aso-bg-transparent hover:bg-gray-200 hover:text-gray-900 aso-rounded-lg aso-text-sm aso-w-8 aso-h-8 aso-ms-auto aso-inline-flex aso-justify-center aso-items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal">
                        <svg class="aso-w-3 aso-h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                        <span class="aso-sr-only">Close modal</span>
                    </button>
                    <div class="aso-p-4 md:p-5 aso-text-center">
                        <svg class="aso-mx-auto aso-mb-4 aso-text-gray-400 aso-w-12 aso-h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                        </svg>
                        <h3 class="aso-mb-5 aso-text-lg aso-font-normal aso-text-gray-500 dark:text-gray-400">Name category</h3>
                        <input type="text" class="aso-rounded aso-w-full aso-h-[35px] aso-text-center aso-p-4 aso-my-2 aso-border-none" />
                        <button data-modal-hide="popup-modal" type="button" class="aso-border-solid aso-text-white aso-bg-red-600 aso-cursor-pointer hover:bg-red-800 focus:ring-4 focus:outline-none aso-my-2 aso-border-none  focus:ring-red-300 dark:focus:ring-red-800 aso-font-medium aso-rounded-lg aso-text-sm aso-inline-flex aso-items-center aso-px-5 aso-py-2.5 aso-text-center">
                            Add new category
                        </button>
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
    import { ref } from "vue";
    const createTemplate = ref(false);
    const state = ref('templates');
    const openModal = ref(false);

    const addTemplate = () =>{
        createTemplate.value = true;
    }
    const back = () =>{
        createTemplate.value = false;
    }
    const closeModal = ()=>{       
        openModal.value = !openModal.value;
    }
    const addCategory = ()=>{
        closeModal();
    }
</script>