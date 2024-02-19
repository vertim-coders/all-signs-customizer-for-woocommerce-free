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
                <div class="aso-bg-[#F8F9FB] aso-flex aso-space-x-2 aso-w-4/4 aso-pb-4 aso-px-4">
                    <div class="aso-w-1/4 aso-relative">
                        <input name="" id="" class="aso-w-[95%] aso-rounded aso-border-[1px] aso-border-solid aso-border-[#D4D4D4] aso-p-4 aso-h-[40px] aso-text-[12px] aso-text-[#898383] aso-absolute" placeholder="Search component">
                        <button class="aso-absolute aso-w-fit aso-h-fit aso-border-none aso-bg-[#F7F8F8] aso-rounded aso-shadow-[1px_1px_7px_1px_rgba(0,0,0,0.1)] aso-translate-y-2.5 aso-right-4">
                            <img class="aso-w-4 aso-h-4" src="../../../../../assets/icons/ic_search.svg" alt="">
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
                        <button class="aso-flex aso-w-fit aso-h-fit aso-rounded aso-bg-[#016464] aso-px-6 aso-space-x-2 aso-p-2 aso-border-none aso-text-white aso-cursor-pointer" @click="addComponent">
                            <img class="aso-w-6 aso-h-6" src="../../../../../assets/icons/ic_plus.svg" alt="">
                            <div class="aso-text-[15px]">
                                Add new component
                            </div>
                        </button>
                    </div>
                </div>
                
            </div>
            <div class="aso-flex aso-bg-[#F8F9FB] aso-px-4 aso-p-3">
                <div class="aso-flex aso-w-[94.5%] aso-space-x-5">
                    <div class="aso-text-[12px]  aso-py-1">
                        Legend unavailable
                    </div>
                    <div class="aso-bg-[#EEF5FF] aso-rounded-full aso-text-[12px] aso-pl-3 aso-p-2 aso-py-1">
                        1. Name of component group
                    </div>
                    <div class="aso-bg-[#FFC7D8] aso-text-[12px] aso-rounded-full aso-w-[15%] aso-pl-5 aso-p-1">
                        2. Button for managers 
                    </div>
                </div>
                <div class="">
                    <select name="" id="">
                        <option value="">7</option>
                    </select>
                </div>
            </div>
            <div class="aso-relative" id="monTableau">
                <table class="aso-text-left aso-border aso-border-collapse aso-border-0">
                    <thead class="aso-text-[14px] aso-bg-[#f0f0f1]">
                        <tr>
                            <th scope="col" class="aso-p-4 aso-w-12">
                                
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
                                Behavior (type)
                            </th>
                            <th scope="col" class="aso-px-6 aso-py-3">
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
                            <td class="aso-px-6 aso-py-4 aso-flex aso-space-x-2">
                                <div class="aso-w-5 aso-h-5 aso-p-1 aso-px-1 aso-flex aso-justify-center aso--items-center aso-rounded-full aso-bg-[#f0f0f1] aso-border aso-border-solid aso-border-black ">
                                    <span class="">P</span> 
                                </div>
                                <div class="aso-py-1">
                                    Plastic
                                </div>
                            </td>
                            <td class="aso-px-6 aso-py-4">
                                Plastic, also known .....
                            </td>
                            <td class="aso-px-6 aso-py-4">
                                <img class="aso-w-8 aso-h-8" src="../../../../../assets/icons/ic_acrylic.svg" alt="">
                            </td>
                            <td class="aso-px-6 aso-py-4">
                                <img class="aso-w-8 aso-h-8" src="../../../../../assets/icons/ic_popup_acrylic.svg" alt="">
                            </td>
                            <td class="aso-px-6 aso-py-4">
                                No component
                            </td>
                            <td class="aso-px-6 aso-py-4">
                                <div class="aso-flex aso-space-x-2">
                                    <div>
                                        <button class="aso-bg-[#FFC7D8] aso-p-2 aso-rounded-md aso-border-none aso-cursor-pointer aso-space-x-1 aso-flex">
                                            <img class="aso-w-4 aso-h-4" src="../../../../../assets/icons/ic_manage.svg" alt="">
                                            <div>
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
                            <td class="aso-px-6 aso-py-4 aso-flex aso-space-x-2">
                                <div class="aso-w-5 aso-h-5 aso-p-1 aso-px-1 aso-flex aso-justify-center aso--items-center aso-rounded-full aso-bg-[#f0f0f1] aso-border aso-border-solid aso-border-black ">
                                    <span class="">P</span> 
                                </div>
                                <div class="aso-py-1">
                                    Plastic
                                </div>
                            </td>
                            <td class="aso-px-6 aso-py-4">
                                Plastic, also known .....
                            </td>
                            <td class="aso-px-6 aso-py-4">
                                <img class="aso-w-8 aso-h-8" src="../../../../../assets/icons/ic_acrylic.svg" alt="">
                            </td>
                            <td class="aso-px-6 aso-py-4">
                                <img class="aso-w-8 aso-h-8" src="../../../../../assets/icons/ic_popup_acrylic.svg" alt="">
                            </td>
                            <td class="aso-px-6 aso-py-4">
                                No component
                            </td>
                            <td class="aso-px-6 aso-py-4">
                                <div class="aso-flex aso-space-x-2">
                                    <div>
                                        <button class="aso-bg-[#FFC7D8] aso-p-2 aso-rounded-md aso-border-none aso-cursor-pointer aso-space-x-1 aso-flex">
                                            <img class="aso-w-4 aso-h-4" src="../../../../../assets/icons/ic_manage.svg" alt="">
                                            <div>
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
                            <td class="aso-px-6 aso-py-4 aso-flex aso-space-x-2">
                                <div class="aso-w-5 aso-h-5 aso-p-1 aso-px-1 aso-flex aso-justify-center aso--items-center aso-rounded-full aso-bg-[#f0f0f1] aso-border aso-border-solid aso-border-black ">
                                    <span class="">P</span> 
                                </div>
                                <div class="aso-py-1">
                                    Plastic
                                </div>
                            </td>
                            <td class="aso-px-6 aso-py-4">
                                Plastic, also known .....
                            </td>
                            <td class="aso-px-6 aso-py-4">
                                <img class="aso-w-8 aso-h-8" src="../../../../../assets/icons/ic_acrylic.svg" alt="">
                            </td>
                            <td class="aso-px-6 aso-py-4">
                                <img class="aso-w-8 aso-h-8" src="../../../../../assets/icons/ic_popup_acrylic.svg" alt="">
                            </td>
                            <td class="aso-px-6 aso-py-4">
                                No component
                            </td>
                            <td class="aso-px-6 aso-py-4">
                                <div class="aso-flex aso-space-x-2">
                                    <div>
                                        <button class="aso-bg-[#FFC7D8] aso-p-2 aso-rounded-md aso-border-none aso-cursor-pointer aso-space-x-1 aso-flex">
                                            <img class="aso-w-4 aso-h-4" src="../../../../../assets/icons/ic_manage.svg" alt="">
                                            <div>
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
        <div class="aso-space-y-2" v-show="isNewComponent">
            <div class="aso-bg-[#F8F9FB] aso-text-[16px] aso-space-x-1 aso-py-4 aso-flex">
                <div class="aso-font-bold">
                    Name config
                </div>
                <img class="aso-w-4 aso-h-4 aso-py-1" src="../../../../../assets/icons/ic_crochet.svg" alt="">
                <div>
                    Material
                </div>
            </div>
            <div class="aso-bg-[#F8F9FB] aso-font-bold aso-px-4 aso-py-4">
                <div class="aso-flex">
                    <div class="aso-w-1/2 aso-space-y-2 aso-text-[14px]">
                        <label for="" class="aso-font-normal">Name configuration</label><br>
                        <input type="text" class="aso-rounded aso-w-[80%] aso-h-[35px]">
                    </div>
                    <div class="aso-w-1/2 aso-space-y-2 aso-text-[14px]">
                        <label for="" class="aso-font-normal">Description</label><br>
                        <input type="text" class="aso-rounded aso-w-[80%] aso-h-[35px]">
                    </div>
                </div>
                <div class="aso-flex aso-py-10">
                    <div class="aso-w-1/2 aso-space-y-2 aso-text-[12px]">
                        <label for="" class="aso-font-normal">Upload icon</label><br>
                        <div class="aso-relative">
                            <input type="text" class="aso-rounded aso-w-[80%] aso-h-[40px] aso-absolute">
                            <button class="aso-absolute aso-bg-[#016464] aso-border-none aso-w-fit aso-h-fit  aso-p-2 aso-rounded aso-px-6 aso-text-white aso-translate-x-4 aso-translate-y-1 aso-text-[12px]">upload icon</button>
                        </div>
                        
                    </div>
                    <div class="aso-w-1/2 aso-space-y-2 aso-text-[12px]">
                        <label for="" class="aso-font-normal">Upload PopupImg</label><br>
                        <div class="aso-relative">
                            <input type="text" class="aso-rounded aso-w-[80%] aso-h-[40px] aso-absolute">
                            <button class="aso-absolute aso-bg-[#016464] aso-border-none aso-w-fit aso-h-fit  aso-p-2 aso-rounded aso-px-6 aso-text-white aso-translate-x-4 aso-translate-y-1 aso-text-[12px]">upload PopupImg</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="aso-bg-[#F8F9FB] aso-font-bold aso-px-4 aso-py-4">
                <div>
                    <label for="" class="aso-font-normal">Behevior (type)</label><br>
                </div>
                <div>
                    <select name="" id="" class="aso-w-full aso-h-[40px]">
                        <option selected>select type</option>
                        <option>Simple</option>
                        <option>Advance</option>
                    </select>
                </div>
            </div>
            <div class="aso-bg-[#F8F9FB] aso-flex aso-font-bold aso-space-x-4 aso-px-4 aso-py-4 aso-justify-end aso-items-end">
                <div class="">
                    <button class="aso-flex aso-bg-transparent aso-w-fit aso-space-x-2 aso-h-fit aso-border-[1px] aso-rounded aso-px-8 aso-p-2 aso-border-black aso-border-solid hover:aso-bg-[#016464] aso-cursor-pointer" @click="back">
                        <img class="aso-w-6 aso-h-6" src="../../../../../assets/icons/ic_back_arrow.svg" alt="">
                        <div class="aso-font-semibold aso-text-[16px]">Back</div>
                    </button>
                </div>
                <div class="">
                    <button class="aso-flex aso-bg-[#016464] aso-shadow-[1px_1px_7px_1px_rgba(0,0,0,0.1)] aso-space-x-2 aso-text-white aso-border-none aso-w-fit aso-h-fit aso-border-[1px] aso-rounded aso-px-8 aso-p-2 aso-border-black aso-border-solid aso-cursor-pointer" @click="next">
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
  
  watch(() => {
    
    return configMaterial;
  }, (newValue) => {
    configMaterial.value = newValue;
  });
  const addComponent = () => {
    isNewComponent.value = true;
    configMaterial.value = false;
  }
  </script>
  