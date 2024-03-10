<template>
    <div>
        <div class="aso-grid aso-grid-cols-3 aso-gap-x-3 aso-gap-y-7 aso-bg-[#F8F9FB] aso-p-8 aso-pb-12">
            <div class="">
                <div class="aso-flex aso-bg-transparent aso-border-solid aso-border-[1px] aso-border-[#E0E0E0] aso-rounded-t aso-p-3 aso-py-4">
                    <div class="aso-font-bold aso-text-[14px] aso-w-2/4">
                        Enable design from scratch
                    </div>
                    <div class="aso-flex aso-space-x-2 aso-justify-end aso-w-2/4">
                        <span class="aso-text-[#444444] aso-text-[11px]">Yes</span>
                        <div class="aso-flex aso-items-center -aso-translate-y-2">
                            <label for="aso-toggle" @click="handleToggleClick2" class="aso-cursor-pointer aso-bg-[#F8F8FF] aso-border-[1px] aso-border-solid aso-border-black aso-w-6 aso-h-0.5 aso-rounded-full aso-p-1">
                            <div :class="{'aso-translate-x-[100%]': isCheckbox, 'aso-bg-active': isChecked }" class="aso-toggle-dot aso-w-2.5 aso-h-2.5 -aso-translate-y-[8px] -aso-translate-x-2 aso-border-[4px] aso-border-solid aso-border-[#008000] aso-bg-white aso-rounded-full aso-shadow-md aso-transform"></div>
                            </label>
                        </div>
                        <span class="aso-text-[#444444] aso-text-[11px]">No</span>
                    </div>                        
                </div>
                <div class="aso-bg-transparent aso-text-[11px] aso-text-[#444444] aso-border-solid aso-border-[1px] aso-border-t-0 aso-border-[#E0E0E0] aso-rounded aso-rounded-t-none aso-p-3">
                    Would you like to allow your clients to design  the product from scratch? Or do you prefer allowing the customization only for templates assigned to the custom product ?
                </div>
            </div>
            <div class="">
                <div class="aso-flex aso-bg-transparent aso-border-solid aso-border-[1px] aso-border-[#E0E0E0] aso-rounded-t aso-p-3 aso-py-4">
                    <div class="aso-font-bold aso-text-[14px] aso-w-2/4">
                        Redirect after adding a custom design to the 
                    </div>
                    <div class="aso-flex aso-space-x-2 aso-justify-end aso-w-2/4">
                        <span class="aso-text-[#444444] aso-text-[11px]">Yes</span>
                        <div class="aso-flex aso-items-center -aso-translate-y-2">
                            <label for="aso-toggle" @click="handleToggleClick2" class="aso-cursor-pointer aso-bg-[#F8F8FF] aso-border-[1px] aso-border-solid aso-border-black aso-w-6 aso-h-0.5 aso-rounded-full aso-p-1">
                            <div :class="{'aso-translate-x-[100%]': isCheckbox, 'aso-bg-active': isChecked }" class="aso-toggle-dot aso-w-2.5 aso-h-2.5 -aso-translate-y-[8px] -aso-translate-x-2 aso-border-[4px] aso-border-solid aso-border-[#008000] aso-bg-white aso-rounded-full aso-shadow-md aso-transform"></div>
                            </label>
                        </div>
                        <span class="aso-text-[#444444] aso-text-[11px]">No</span>
                    </div>                        
                </div>
                <div class="aso-bg-transparent aso-text-[11px] aso-text-[#444444] aso-border-solid aso-border-[1px] aso-border-t-0 aso-border-[#E0E0E0] aso-rounded aso-rounded-t-none aso-p-3">
                    Would you like to allow your clients to design  the product from scratch? Or do you prefer allowing the customization only for templates assigned to the custom product ?
                </div>
            </div>
            <div class="">
                <div class="aso-flex aso-bg-transparent aso-border-solid aso-border-[1px] aso-border-[#E0E0E0] aso-rounded-t aso-p-3 aso-py-4">
                    <div class="aso-font-bold aso-text-[14px] aso-w-2/4">
                        Hide add to cart button for custom on
                    </div>
                    <div class="aso-flex aso-space-x-2 aso-justify-end aso-w-2/4">
                        <span class="aso-text-[#444444] aso-text-[11px]">Yes</span>
                        <div class="aso-flex aso-items-center -aso-translate-y-2">
                            <label for="aso-toggle" @click="handleToggleClick2" class="aso-cursor-pointer aso-bg-[#F8F8FF] aso-border-[1px] aso-border-solid aso-border-black aso-w-6 aso-h-0.5 aso-rounded-full aso-p-1">
                            <div :class="{'aso-translate-x-[100%]': isCheckbox, 'aso-bg-active': isChecked }" class="aso-toggle-dot aso-w-2.5 aso-h-2.5 -aso-translate-y-[8px] -aso-translate-x-2 aso-border-[4px] aso-border-solid aso-border-[#008000] aso-bg-white aso-rounded-full aso-shadow-md aso-transform"></div>
                            </label>
                        </div>
                        <span class="aso-text-[#444444] aso-text-[11px]">No</span>
                    </div>                        
                </div>
                <div class="aso-bg-transparent aso-text-[11px] aso-text-[#444444] aso-border-solid aso-border-[1px] aso-border-t-0 aso-border-[#E0E0E0] aso-rounded aso-rounded-t-none aso-p-3">
                    Would you like to allow your clients to design  the product from scratch? Or do you prefer allowing the customization only for templates assigned to the custom product ?
                </div>
            </div>
            <div class="">
                <div class="aso-flex aso-bg-transparent aso-border-solid aso-border-[1px] aso-border-[#E0E0E0] aso-rounded-t aso-p-3 aso-py-4">
                    <div class="aso-font-bold aso-text-[14px] aso-w-2/4">
                        Hide design buttons on shop page
                    </div>
                    <div class="aso-flex aso-space-x-2 aso-justify-end aso-w-2/4">
                        <span class="aso-text-[#444444] aso-text-[11px]">Yes</span>
                        <div class="aso-flex aso-items-center -aso-translate-y-2">
                            <label for="aso-toggle" @click="handleToggleClick2" class="aso-cursor-pointer aso-bg-[#F8F8FF] aso-border-[1px] aso-border-solid aso-border-black aso-w-6 aso-h-0.5 aso-rounded-full aso-p-1">
                            <div :class="{'aso-translate-x-[100%]': isCheckbox, 'aso-bg-active': isChecked }" class="aso-toggle-dot aso-w-2.5 aso-h-2.5 -aso-translate-y-[8px] -aso-translate-x-2 aso-border-[4px] aso-border-solid aso-border-[#008000] aso-bg-white aso-rounded-full aso-shadow-md aso-transform"></div>
                            </label>
                        </div>
                        <span class="aso-text-[#444444] aso-text-[11px]">No</span>
                    </div>                        
                </div>
                <div class="aso-bg-transparent aso-text-[11px] aso-text-[#444444] aso-border-solid aso-border-[1px] aso-border-t-0 aso-border-[#E0E0E0] aso-rounded aso-rounded-t-none aso-p-3">
                    Would you like to allow your clients to design  the product from scratch? Or do you prefer allowing the customization only for templates assigned to the custom product ?
                </div>
            </div>
            <div class="">
                <div class="aso-flex aso-bg-transparent aso-border-solid aso-border-[1px] aso-border-[#E0E0E0] aso-rounded-t aso-p-3 aso-py-4">
                    <div class="aso-font-bold aso-text-[14px] aso-w-2/4">
                        hide to cart buttons for custom product on
                    </div>
                    <div class="aso-flex aso-space-x-2 aso-justify-end aso-w-2/4">
                        <span class="aso-text-[#444444] aso-text-[11px]">Yes</span>
                        <div class="aso-flex aso-items-center -aso-translate-y-2">
                            <label for="aso-toggle" @click="handleToggleClick2" class="aso-cursor-pointer aso-bg-[#F8F8FF] aso-border-[1px] aso-border-solid aso-border-black aso-w-6 aso-h-0.5 aso-rounded-full aso-p-1">
                            <div :class="{'aso-translate-x-[100%]': isCheckbox, 'aso-bg-active': isChecked }" class="aso-toggle-dot aso-w-2.5 aso-h-2.5 -aso-translate-y-[8px] -aso-translate-x-2 aso-border-[4px] aso-border-solid aso-border-[#008000] aso-bg-white aso-rounded-full aso-shadow-md aso-transform"></div>
                            </label>
                        </div>
                        <span class="aso-text-[#444444] aso-text-[11px]">No</span>
                    </div>                        
                </div>
                <div class="aso-bg-transparent aso-text-[11px] aso-text-[#444444] aso-border-solid aso-border-[1px] aso-border-t-0 aso-border-[#E0E0E0] aso-rounded aso-rounded-t-none aso-p-3">
                    Would you like to allow your clients to design  the product from scratch? Or do you prefer allowing the customization only for templates assigned to the custom product ?
                </div>
            </div>
        </div>
    </div>
    <div class="aso-bg-[#F8F9FB] aso-flex aso-space-x-4 aso-px-4 aso-py-3 aso-justify-end aso-items-end">
        <div class="aso-bg-[#016464] aso-rounded">
            <button class="aso-flex aso-bg-transparent aso-w-fit aso-space-x-2 aso-h-fit aso-text-white aso-px-12 aso-p-2.5 aso-border-none aso-opacity-90 hover:aso-opacity-100 hover:aso-border-none hover:aso-text-white hover:aso-bg-[#016464] aso-cursor-pointer">
                <div class="aso-font-semibold aso-text-[16px]">Save</div>
            </button>
        </div>
    </div>
</template>
<script setup>
import {ref} from 'vue'
    const isCheckbox = ref(true);
    const handleTransform = ref('translateX(100%)');
    const handleToggleClick2 = () => {
    isCheckbox.value = !isCheckbox.value;
    };
</script> 