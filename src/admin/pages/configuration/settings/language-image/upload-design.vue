<template>
    <div>
            
        <div>
            <div class="aso-bg-[#F8F9FB] aso-px-8 aso-py-8 aso-space-y-6">
                <h3 class="aso-text-[16px] aso-semibold">Custom design link</h3>
                <div class="aso-flex aso-space-x-3">
                    <div class="aso-text-[11px]">Enable custom design link</div>
                    <div class="aso-flex aso-items-center aso-translate-y-0.5">
                        <label for="aso-toggle" @click="handleToggleClick2" class="aso-cursor-pointer aso-bg-[#F8F8FF] aso-border-[1px] aso-border-solid aso-border-black aso-w-6 aso-h-0.5 aso-rounded-full aso-p-1">
                        <div :class="{'aso-translate-x-[100%]': isCheckbox }" class="aso-toggle-dot aso-w-2.5 aso-h-2.5 -aso-translate-y-[8px] -aso-translate-x-2 aso-border-[4px] aso-border-solid aso-border-[white] aso-bg-[#D9D9D9] aso-rounded-full aso-shadow-md aso-transform"></div>
                        </label>
                    </div>
                </div>
                <div class="aso-text-[11px] aso-text-[#444444]">
                    Enable this to display a link to direct customers to another page on your site, this will display as one of the first options on desktop and mobile.
                </div>
                <div class="aso-flex aso-flex-col aso-w-3/5 aso-space-y-2">
                    <label class="aso-text-[12px] aso-text-[#444444]">Custom Design Link</label>
                    <input type="text" placeholder="" class="aso-w-full"/>
                    <span class="aso-text-[12px] aso-text-[#444444]">URL to redirect customers on your store that will allow for more complex graphic design quote submissions.</span>
                </div>
                <div class="aso-flex aso-flex-col aso-w-3/5 aso-space-y-2">
                    <label class="aso-text-[12px] aso-text-[#444444]">Phrase for link to submit custom design page</label>
                    <input type="text" placeholder="" class="aso-w-full"/>

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
    </div>
</template>
<script setup>
import {ref} from 'vue';
    const isCheckbox = ref(true);
    const handleTransform = ref('translateX(100%)');
    const handleToggleClick2 = () => {
    isCheckbox.value = !isCheckbox.value;
    };
</script> 