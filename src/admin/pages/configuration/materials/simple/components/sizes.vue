<template>
    <div class="aso-space-y-1">
        <div class="" v-show="listSize">
            <div class="aso-bg-[#F8F9FB] aso-text-[16px] aso-space-x-1 aso-px-4 aso-py-4 aso-flex">
                <div class="aso-font-bold">
                    Name config
                </div>
                <img class="aso-w-4 aso-h-4 aso-py-1" src="../../../../../../../assets/icons/ic_crochet.svg" alt="">
                <div>
                    Material
                </div>
                <img class="aso-w-4 aso-h-4 aso-py-1" src="../../../../../../../assets/icons/ic_crochet.svg" alt="">
                <div>
                    Plastic
                </div>
            </div>
            <div class="aso-bg-[#F8F9FB] aso-text-[16px] aso-space-x-1 aso-px-4 aso-py-4 aso-flex">
                <div class="aso-flex aso-relative aso-justify-center aso-items-center">
                    <button class="aso-w-fit aso-h-fit aso-bg-transparent aso-border-none aso-text-white aso-opacity-50 aso-cursor-pointer">
                        <!--<img class="aso-w-6 aso-h-6" src="../../../../../../../assets/icons/ic_material.svg" alt="">-->
                        <div class="aso-text-[12px]">
                            Manage Font
                        </div>
                    </button>
                </div>
                <div class="aso-flex aso-relative aso-justify-center aso-items-center">
                    <button class="aso-w-fit aso-h-fit aso-bg-transparent aso-border-none aso-text-white aso-opacity-50 aso-cursor-pointer">
                        <!--<img class="aso-w-6 aso-h-6" src="../../../../../../../assets/icons/ic_material.svg" alt="">-->
                        <div class="aso-text-[12px]">
                            Manage Font
                        </div>
                    </button>
                </div>
                <div class="aso-flex aso-relative aso-justify-center aso-items-center">
                    <button class="aso-w-fit aso-h-fit aso-bg-transparent aso-border-none aso-text-white aso-opacity-50 aso-cursor-pointer">
                        <!--<img class="aso-w-6 aso-h-6" src="../../../../../../../assets/icons/ic_material.svg" alt="">-->
                        <div class="aso-text-[12px]">
                            Manage Font
                        </div>
                    </button>
                </div>
                <div class="aso-flex aso-relative aso-justify-center aso-items-center">
                    <button class="aso-w-fit aso-h-fit aso-bg-transparent aso-border-none aso-text-black aso-opacity-50 aso-cursor-pointer">
                        <!--<img class="aso-w-6 aso-h-6" src="../../../../../../../assets/icons/ic_material.svg" alt="">-->
                        <div class="aso-text-[12px]">
                            Manage Font
                        </div>
                    </button>
                </div>
            </div>
            <div class="aso-flex aso-space-x-2 aso-w-4/4 aso-bg-[#F8F9FB] aso-text-[12px] aso-p-8 ">
                <div class="aso-w-1/4 aso-relative">
                    <input name="" id="" class="aso-w-[95%] aso-h-[40px] aso-absolute" placeholder="Search name configuration">
                    <button class="aso-absolute aso-bg-transparent aso-border-none aso-w-fit aso-h-fit aso-translate-y-2 -aso-translate-x-4 aso-right-0">
                        <img  class="aso-w-6 aso-h-6" src="../../../../../../../assets/icons/ic_search.svg" alt="">
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
                    <button class="aso-flex aso-w-fit aso-h-fit aso-rounded aso-bg-[#016464] aso-px-6 aso-space-x-2 aso-p-2 aso-border-none aso-text-white aso-cursor-pointer" @click="addConfig">
                        <img class="aso-w-6 aso-h-6" src="../../../../../../../assets/icons/ic_plus.svg" alt="">
                        <div class="aso-text-[15px]">
                            Add new configuration
                        </div>
                    </button>
                </div>
            </div>
            <div class="aso-relative" id="monTableau">
                <table class="aso-w-full aso-text-left aso-border aso-border-collapse aso-border-0">
                    <thead class="aso-text-[14px] aso-bg-[#f0f0f1]">
                        <tr class="aso-font-normal">
                            <th scope="col" class="aso-p-4 aso-w-12 aso-font-normal">
                                Title 
                            </th>
                            <th scope="col" class="aso-px-6 aso-py-3 aso-font-normal">
                                width
                            </th>
                            <th scope="col" class="aso-px-6 aso-py-3 aso-font-normal">
                                Height
                            </th>
                            <th scope="col" class="aso-px-6 aso-py-3 aso-font-normal">
                                thickness
                            </th>
                            <th scope="col" class="aso-px-6 aso-py-3 aso-font-normal">
                                Add Price
                            </th>
                            <th scope="col" class="aso-px-6 aso-py-3 aso-font-normal">
                                Action
                            </th>
                            
                        </tr>
                    </thead>
                    <tbody class="aso-bg-white">
                        
                        <tr class="aso-border-t-0 aso-border-l-0 aso-border-r-0 aso-border-b-2 aso-border-solid aso-border-[#f0f0f1]">
                            <td class="aso-w-28 aso-p-4">
                                <div class="aso-flex aso-items-center">
                                    100X50mm
                                </div>
                            </td>
                            <td class="aso-px-6 aso-py-4 aso-flex aso-space-x-2">
                                <div class="aso-items-center aso-rounded-lg aso-p-1 aso-px-2 aso-bg-[#9ACD321F] aso-text-[#466801] aso-border-none">
                                    100 mm
                                </div>
                            </td>
                            <td class="aso-text-[12px] aso-px-6 aso-py-4 aso-space-x-2">
                                <div class="aso-w-[35%] aso-rounded-lg aso-px-2 aso-p-1 aso-bg-[#F8E7E7] aso-text-[#EF5A35] aso-border-none">
                                    50 mm
                                </div>
                            </td>
                            <td class="aso-px-6 aso-py-4">
                                NONE
                            </td>
                            <td class="aso-text-[12px] aso-px-6 aso-py-4 aso-space-x-2">
                                <div class="aso-w-[35%] aso-rounded-lg aso-px-2 aso-p-1 aso-bg-[#F8E7E7] aso-text-[#EF5A35] aso-border-none">
                                    25 mm
                                </div>
                            </td>
                            <td class="aso-px-6 aso-py-4">
                                <div class="aso-flex aso-space-x-2">
                                    <div>
                                        <button class="aso-bg-transparent aso-border-none aso-text-[#2DD05B] aso-cursor-pointer">
                                            <img class="aso-w-5 aso-h-5" src="../../../../../../../assets/icons/ic_edit.svg" alt="">
                                        </button>
                                    </div>
                                    <div>
                                        <button class="aso-bg-transparent aso-border-none aso-text-[#A00000] aso-cursor-pointer">
                                            <img class="aso-w-5 aso-h-5" src="../../../../../../../assets/icons/ic_delete.svg" alt="">
                                        </button>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        
                        
                        
                        
                    </tbody>
                </table>
            </div>
        </div>
        <div class="aso-bg-[#F8F9FB] aso-font-bold aso-px-4 aso-py-4" v-show="customSize">
            <div>
                Custom size
            </div>
            <div class="aso-flex">
                <div class="aso-w-1/2 aso-space-y-2 aso-text-[14px]">
                    <label for="" class="aso-font-normal">Width label</label><br>
                    <input type="text" class="aso-rounded aso-w-[80%] aso-h-[35px]">
                </div>
                <div class="aso-w-1/2 aso-space-y-2 aso-text-[14px]">
                    <label for="" class="aso-font-normal">Height label</label><br>
                    <input type="text" class="aso-rounded aso-w-[80%] aso-h-[35px]">
                </div>
            </div>
            <div class="aso-flex aso-py-10">
                <div class="aso-w-1/2 aso-space-y-2 aso-text-[12px]">
                    <label for="" class="aso-font-normal">Min width</label><br>
                    <div class="aso-relative">
                        <input type="text" class="aso-rounded aso-w-[80%] aso-h-[40px] aso-absolute">
                    </div>
                    
                </div>
                <div class="aso-w-1/2 aso-space-y-2 aso-text-[12px]">
                    <label for="" class="aso-font-normal">Max width</label><br>
                    <div class="aso-relative">
                        <input type="text" class="aso-rounded aso-w-[80%] aso-h-[40px] aso-absolute">
                    </div>
                </div>
            </div>
            <div class="aso-flex aso-py-10">
                <div class="aso-w-1/2 aso-space-y-2 aso-text-[12px]">
                    <label for="" class="aso-font-normal">Min height</label><br>
                    <div class="aso-relative">
                        <input type="text" class="aso-rounded aso-w-[80%] aso-h-[40px] aso-absolute">
                    </div>
                    
                </div>
                <div class="aso-w-1/2 aso-space-y-2 aso-text-[12px]">
                    <label for="" class="aso-font-normal">Max height</label><br>
                    <div class="aso-relative">
                        <input type="text" class="aso-rounded aso-w-[80%] aso-h-[40px] aso-absolute">
                    </div>
                </div>
            </div>
        </div>
        <div class="aso-bg-[#F8F9FB] aso-flex aso-font-bold aso-space-x-4 aso-px-4 aso-py-4 aso-justify-end aso-items-end">
            <div class="">
                <button class="aso-flex aso-bg-[#016464] aso-shadow-[1px_1px_7px_1px_rgba(0,0,0,0.1)] aso-space-x-2 aso-text-white aso-border-none aso-w-fit aso-h-fit aso-border-[1px] aso-rounded aso-px-8 aso-p-2 aso-border-black aso-border-solid aso-cursor-pointer" @click="next">
                    <div class="aso-font-semibold aso-text-[16px]">Save</div>
                </button>
            </div>
        </div>
    </div>
</template>
<script setup>
    import { ref } from "vue";
    const listSize = ref(true);
    const customSize = ref(false);
    const addConfig = () => {
        listSize.value = false;
        customSize.value = true;
    }
</script>
