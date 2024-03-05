<template>
    <div class=" aso-h-[100vh]">
        <div class="aso-space-y-1">
            <div class="aso-flex aso-bg-[#F8F9FB] aso-px-4 aso-py-12 aso-space-x-12">
                
                <div class="aso-flex aso-font-semibold">
                    Enable texte
                    <div class="aso-flex aso-items-center aso-translate-x-2 aso-translate-y-0.5">
                        <label for="aso-toggle" @click="handleToggleClick2" class="aso-cursor-pointer aso-bg-[#F8F8FF] aso-border-[1px] aso-border-solid aso-border-black aso-w-8 aso-h-1 aso-rounded-full aso-p-1">
                        <div :class="{'aso-translate-x-[100%]': isCheckbox, 'aso-bg-active': isChecked }" class="aso-toggle-dot aso-w-3 aso-h-3 -aso-translate-y-[8px] -aso-translate-x-2 aso-border-[4px] aso-border-solid aso-border-[#008000] aso-bg-white aso-rounded-full aso-shadow-md aso-transform"></div>
                        </label>
                    </div>
                </div>
                <div class="aso-flex aso-font-semibold">
                    Enable image
                    <div class="aso-flex aso-items-center aso-translate-x-2 aso-translate-y-0.5">
                        <label for="aso-toggle" @click="handleToggleClick2" class="aso-cursor-pointer aso-bg-[#F8F8FF] aso-border-[1px] aso-border-solid aso-border-black aso-w-8 aso-h-1 aso-rounded-full aso-p-1">
                        <div :class="{'aso-translate-x-[100%]': isCheckbox, 'aso-bg-active': isChecked }" class="aso-toggle-dot aso-w-3 aso-h-3 -aso-translate-y-[8px] -aso-translate-x-2 aso-border-[4px] aso-border-solid aso-border-[#008000] aso-bg-white aso-rounded-full aso-shadow-md aso-transform"></div>
                        </label>
                    </div>
                </div>
            </div>
            <div class="aso-bg-[#F8F9FB] aso-flex aso-font-bold aso-space-x-4 aso-px-4 aso-py-4 aso-justify-end aso-items-end">
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
    
    
    const isCheckbox = ref(true);
    const handleTransform = ref('translateX(100%)');
    const handleToggleClick2 = () => {
    isCheckbox.value = !isCheckbox.value;
    };
</script>
