<template>
    <div class="aso-space-y-1">
        <div class="">
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
                                icon
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
                                <span class="aso-w-5 aso-h-5 aso-p-1 aso-px-1 aso-flex aso-justify-center aso-rounded-full aso-bg-[#f0f0f1] aso-border aso-border-solid aso-border-black ">
                                    <span class="aso-text-[12px]">SC</span> 
                                </span>
                                <span class="aso-py-1 aso-text-[14px]">
                                    Sub component 1
                                </span>
                            </td>
                            <td class="aso-px-6 aso-py-2 aso-text-center aso-text-[11px]">
                                Plastic, also known .....
                            </td>
                            <td class="aso-px-6 aso-justify-center aso-translate-y-1">
                                <img class="aso-w-8 aso-h-8" src="../../../../../../../../assets/icons/ic_plastic_sub.svg" alt="">
                            </td>
                            <td class="aso-px-6 aso-py-2 aso-flex aso-justify-center aso-space-x-2">
                                <button class="aso-bg-[#FFC7D8] aso-p-2 aso-rounded-md aso-border-none aso-cursor-pointer aso-space-x-1 aso-flex" @click="addOption">
                                    <img class="aso-w-4 aso-h-4" src="../../../../../../../../assets/icons/ic_manage.svg" alt="">
                                    <span class="aso-text-[12px]">
                                        add options
                                    </span>
                                </button>
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
                            <td class="aso-px-6 aso-py-2 aso-flex aso-justify-center aso-space-x-2">
                                <span class="aso-w-5 aso-h-5 aso-p-1 aso-px-1 aso-flex aso-justify-center aso-rounded-full aso-bg-[#f0f0f1] aso-border aso-border-solid aso-border-black ">
                                    <span class="aso-text-[12px]">SC</span> 
                                </span>
                                <span class="aso-py-1 aso-text-[14px]">
                                    Sub component 1
                                </span>
                            </td>
                            <td class="aso-px-6 aso-py-2 aso-text-center aso-text-[11px]">
                                Plastic, also known .....
                            </td>
                            <td class="aso-px-6 aso-justify-center aso-translate-y-1">
                                <img class="aso-w-8 aso-h-8" src="../../../../../../../../assets/icons/ic_plastic_sub.svg" alt="">
                            </td>
                            <td class="aso-px-6 aso-py-2 aso-flex aso-justify-center aso-space-x-2">
                                <button class="aso-bg-[#FFC7D8] aso-p-2 aso-rounded-md aso-border-none aso-cursor-pointer aso-space-x-1 aso-flex" @click="addOption">
                                    <img class="aso-w-4 aso-h-4" src="../../../../../../../../assets/icons/ic_manage.svg" alt="">
                                    <span class="aso-text-[12px]">
                                        add options
                                    </span>
                                </button>
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
                            <td class="aso-px-6 aso-py-2 aso-flex aso-justify-center aso-space-x-2">
                                <span class="aso-w-5 aso-h-5 aso-p-1 aso-px-1 aso-flex aso-justify-center aso-rounded-full aso-bg-[#f0f0f1] aso-border aso-border-solid aso-border-black ">
                                    <span class="aso-text-[12px]">SC</span> 
                                </span>
                                <span class="aso-py-1 aso-text-[14px]">
                                    Sub component 1
                                </span>
                            </td>
                            <td class="aso-px-6 aso-py-2 aso-text-center aso-text-[11px]">
                                Plastic, also known .....
                            </td>
                            <td class="aso-px-6 aso-justify-center aso-translate-y-1">
                                <img class="aso-w-8 aso-h-8" src="../../../../../../../../assets/icons/ic_plastic_sub.svg" alt="">
                            </td>
                            <td class="aso-px-6 aso-py-2 aso-flex aso-justify-center aso-space-x-2">
                                <button class="aso-bg-[#FFC7D8] aso-p-2 aso-rounded-md aso-border-none aso-cursor-pointer aso-space-x-1 aso-flex" @click="addOption">
                                    <img class="aso-w-4 aso-h-4" src="../../../../../../../../assets/icons/ic_manage.svg" alt="">
                                    <span class="aso-text-[12px]">
                                        add options
                                    </span>
                                </button>
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
            <div class="aso-space-y-1">
                <div class="aso-bg-[#F8F9FB] aso-px-4 aso-py-4 aso-pb-20">
                    <span class="aso-text-[16px] aso-font-bold aso-px-4 aso-py-4 ">
                            Add sub component
                    </span>
                    
                    <div class="aso-flex aso-justify-between aso-px-4 aso-py-4">
                        <div class="aso-w-2/5 aso-space-y-2 aso-flex aso-flex-col aso-text-[14px]">
                            <label for="" class="aso-font-normal">Title</label>
                            <input type="text" class="aso-rounded aso-w-full aso-h-[30px]">
                        </div>
                        <div class="aso-w-2/5 aso-space-y-2 aso-flex aso-flex-col aso-text-[12px]">
                            <label for="" class="aso-font-normal">Description</label>
                            <input type="text" class="aso-rounded aso-w-full aso-h-[30px]">
                        </div>
                    </div>
                    <div class="aso-space-y-2 aso-flex aso-flex-col aso-px-4 aso-text-[12px]">
                        <label for="" class="aso-font-normal">Upload icon</label>
                        <div class="aso-relative">
                            <input type="text" class="aso-rounded aso-w-full aso-h-[35px] aso-absolute">
                            <button class="aso-absolute aso-bg-[#016464] aso-border-none aso-w-fit aso-h-fit aso-p-1.5 aso-rounded aso-px-3 aso-text-white aso-opacity-90 hover:aso-opacity-100 aso-translate-x-4 aso-translate-y-1 aso-text-[10px] aso-cursor-pointer">upload icon</button>
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
    
  </script>
   