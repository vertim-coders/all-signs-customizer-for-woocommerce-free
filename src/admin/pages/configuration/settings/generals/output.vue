<template>
    <div>
        <div class="aso-bg-[#F8F9FB] aso-px-8 aso-py-8">
            <div class="aso-flex aso-flex-col aso-space-y-3">
                <label class="aso-text-[14px] aso-font-bold">Output files format</label>
                <span class="aso-pt-4 aso-text-[11px]">What is your desired output files format ?</span>
                <select>
                    <option>PNG</option>
                    <option>JPEG</option>
                    <option>SVG</option>
                    <option>PNG + PNG</option>
                    <option>PNG + JPEG</option>
                    <option>PNG + SVG</option>
                </select>
            </div>
            <div class="aso-flex aso-flex-col aso-space-y-3 aso-py-10">
                <label class="aso-text-[14px] aso-font-bold">Watermark</label>
                <div class="aso-relative">
                    <input type="text" class="aso-rounded aso-w-1/2 aso-h-[38px] aso-absolute">
                    <button class="aso-absolute aso-flex aso-bg-[#016464] aso-border-none aso-w-fit aso-h-fit aso-p-2 aso-space-x-2 aso-rounded aso-px-3 aso-text-white aso-opacity-90 hover:aso-opacity-100 aso-translate-x-4 aso-translate-y-1 aso-text-[10px] aso-cursor-pointer">
                        <svg class="aso-w-4 aso-h-4" viewBox="0 0 23 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M22.4375 12.2809V18.5309C22.4375 18.9453 22.2729 19.3427 21.9799 19.6357C21.6868 19.9288 21.2894 20.0934 20.875 20.0934H2.125C1.7106 20.0934 1.31317 19.9288 1.02015 19.6357C0.72712 19.3427 0.5625 18.9453 0.5625 18.5309V12.2809C0.5625 11.8665 0.72712 11.4691 1.02015 11.176C1.31317 10.883 1.7106 10.7184 2.125 10.7184H6.8125C7.0197 10.7184 7.21841 10.8007 7.36493 10.9472C7.51144 11.0937 7.59375 11.2924 7.59375 11.4996C7.59375 11.7068 7.51144 11.9056 7.36493 12.0521C7.21841 12.1986 7.0197 12.2809 6.8125 12.2809H2.125V18.5309H20.875V12.2809H16.1875C15.9803 12.2809 15.7816 12.1986 15.6351 12.0521C15.4886 11.9056 15.4062 11.7068 15.4062 11.4996C15.4062 11.2924 15.4886 11.0937 15.6351 10.9472C15.7816 10.8007 15.9803 10.7184 16.1875 10.7184H20.875C21.2894 10.7184 21.6868 10.883 21.9799 11.176C22.2729 11.4691 22.4375 11.8665 22.4375 12.2809ZM7.36523 6.58362L10.7188 3.22913V11.4996C10.7188 11.7068 10.8011 11.9056 10.9476 12.0521C11.0941 12.1986 11.2928 12.2809 11.5 12.2809C11.7072 12.2809 11.9059 12.1986 12.0524 12.0521C12.1989 11.9056 12.2812 11.7068 12.2812 11.4996V3.22913L15.6348 6.58362C15.7814 6.73022 15.9802 6.81257 16.1875 6.81257C16.3948 6.81257 16.5936 6.73022 16.7402 6.58362C16.8868 6.43703 16.9692 6.2382 16.9692 6.03089C16.9692 5.82357 16.8868 5.62475 16.7402 5.47815L12.0527 0.790654C11.9802 0.718016 11.894 0.660392 11.7992 0.621076C11.7043 0.58176 11.6027 0.561523 11.5 0.561523C11.3973 0.561523 11.2957 0.58176 11.2008 0.621076C11.106 0.660392 11.0198 0.718016 10.9473 0.790654L6.25977 5.47815C6.11317 5.62475 6.03082 5.82357 6.03082 6.03089C6.03082 6.2382 6.11317 6.43703 6.25977 6.58362C6.40636 6.73022 6.60518 6.81257 6.8125 6.81257C7.01982 6.81257 7.21864 6.73022 7.36523 6.58362ZM18.5312 15.4059C18.5312 15.1741 18.4625 14.9475 18.3338 14.7548C18.205 14.5621 18.022 14.4119 17.8078 14.3232C17.5937 14.2345 17.3581 14.2113 17.1308 14.2565C16.9034 14.3017 16.6946 14.4134 16.5307 14.5772C16.3668 14.7411 16.2552 14.9499 16.21 15.1773C16.1648 15.4046 16.188 15.6402 16.2767 15.8543C16.3654 16.0685 16.5156 16.2515 16.7083 16.3803C16.901 16.509 17.1276 16.5778 17.3594 16.5778C17.6702 16.5778 17.9682 16.4543 18.188 16.2345C18.4078 16.0148 18.5312 15.7167 18.5312 15.4059Z" fill="white"/>
                        </svg>
                        <div class="">Upload image</div>
                    </button>
                </div>
            </div>
            <div class="aso-flex aso-flex-col aso-space-y-3 aso-py-10">
                <div class="aso-flex aso-space-x-2">
                    <label class="aso-text-[16px] aso-font-semibold">Zip output files</label>
                    <div class="aso-flex aso-items-center">
                        <label for="aso-toggle" @click="handleToggleClick2" class="aso-cursor-pointer aso-bg-[#F8F8FF] aso-border-[1px] aso-border-solid aso-border-black aso-w-6 aso-h-0.5 aso-rounded-full aso-p-1">
                        <div :class="{'aso-translate-x-[100%]': isCheckbox, 'aso-bg-active': isChecked }" class="aso-toggle-dot aso-w-2.5 aso-h-2.5 -aso-translate-y-[8px] -aso-translate-x-2 aso-border-[4px] aso-border-solid aso-border-[#008000] aso-bg-white aso-rounded-full aso-shadow-md aso-transform"></div>
                        </label>
                    </div>
                </div>
                <span>Zip output folder prefix</span>
                <input type="text" class="aso-full"/>
                
            </div>
            <div class="aso-space-y-3">
                <div class="aso-flex aso-space-x-3">
                    <label class="aso-text-[16px] aso-font-semibold">Design composition</label>
                    <div class="aso-flex aso-items-center aso-translate-y-0.5">
                        <label for="aso-toggle" @click="handleToggleClick2" class="aso-cursor-pointer aso-bg-[#F8F8FF] aso-border-[1px] aso-border-solid aso-border-black aso-w-6 aso-h-0.5 aso-rounded-full aso-p-1">
                        <div :class="{'aso-translate-x-[100%]': isCheckbox, 'aso-bg-active': isChecked }" class="aso-toggle-dot aso-w-2.5 aso-h-2.5 -aso-translate-y-[8px] -aso-translate-x-2 aso-border-[4px] aso-border-solid aso-border-[#008000] aso-bg-white aso-rounded-full aso-shadow-md aso-transform"></div>
                        </label>
                    </div>
                </div>
                <div class="aso-text-[11px] aso-text-[#444444]">
                    This option allows you to display or not design composition in the order
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