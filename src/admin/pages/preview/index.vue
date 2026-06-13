<template lang="">
    <div class="ascwo-fixed ascwo-z-[999999] ascwo-w-full ascwo-h-full ascwo-top-0 ascwo-left-0 ascwo-bg-white">
        <div class="ascwo-bg-white ascwo-border-solid ascwo-border ascwo-flex justify-between ascwo-items-center ascwo-gap-3 ascwo-p-2 ascwo-min-h-[40px]">
            <button @click="goBackAndReload" class="ascwo-border-solid ascwo-text-white ascwo-bg-[#016464] ascwo-cursor-pointer  ascwo-border-none   ascwo-font-medium ascwo-rounded-md ascwo-text-sm ascwo-inline-flex ascwo-items-center ascwo-px-5 ascwo-py-2.5 ascwo-text-center">
                <svg class="ascwo-w-6 ascwo-h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 12L5 8V11L17.17 11C17.3756 10.414 17.7586 9.90661 18.2657 9.54821C18.7729 9.18981 19.379 8.9982 20 9C20.7956 9 21.5587 9.31607 22.1213 9.87868C22.6839 10.4413 23 11.2044 23 12C23 12.7956 22.6839 13.5587 22.1213 14.1213C21.5587 14.6839 20.7956 15 20 15C18.69 15 17.58 14.17 17.17 13L5 13V16L1 12Z" fill="currentColor"/>
                </svg>
                {{ __("Back", "all-signs-customizer-for-woocommerce-pro") }}
            </button>
            <div class="ascwo-text-sm ascwo-font-medium ascwo-text-white ascwo-bg-[#febd52] ascwo-px-5 ascwo-py-2.5 ascwo-rounded">
                {{ __("Preview mode: Add to cart is disabled in the admin preview.", "all-signs-customizer-for-woocommerce-pro") }}
            </div>
        </div>
        <div class="ascwo-flex ascwo-w-[100%]" id="ascwo-configurator-loader">
            <div class="ascwo-flex ascwo-w-[100%] ascwo-h-[100%] ascwo-flex ascwo-flex-col lg:ascwo-flex-row-reverse">
                <div class="ascwo-w-[92%] ascwo-config-admin ascwo-p-4 ascwo-flex ascwo-flex-col">
                    <div class="ascwo-w-full ascwo-h-[7%] lg:ascwo-h-[10%] ascwo-flex ascwo-items-center ascwo-justify-between">
                        <div class="ascwo-w-full ascwo-h-full ascwo-flex ascwo-items-center ascwo-justify-between ascwo-px-2">
                            <div
                                class="ascwo-w-1/5 ascwo-bg-gradient-to-r ascwo-from-zinc-400 ascwo-via-zinc-200 ascwo-to-zinc-400 ascwo-p-4 ascwo-h-[65%] ascwo-animate-pulse">
                            </div>
                            <div class="ascwo-w-1/3 ascwo-h-[65%] ascwo-flex ascwo-space-x-4">
                                <div
                                    class="ascwo-w-1/3 ascwo-bg-gradient-to-r ascwo-from-zinc-400 ascwo-via-zinc-200 ascwo-to-zinc-400 ascwo-p-4 ascwo-h-full ascwo-animate-pulse">
                                </div>
                                <div
                                    class="ascwo-w-1/3 ascwo-bg-gradient-to-r ascwo-from-zinc-400 ascwo-via-zinc-200 ascwo-to-zinc-400 ascwo-p-4 ascwo-h-full ascwo-animate-pulse">
                                </div>
                                <div
                                    class="ascwo-w-1/3 ascwo-bg-gradient-to-r ascwo-from-zinc-400 ascwo-via-zinc-200 ascwo-to-zinc-400 ascwo-p-4 ascwo-h-full ascwo-animate-pulse">
                                </div>
                            </div>
                            <div
                                class="ascwo-w-1/5 ascwo-bg-gradient-to-r ascwo-from-zinc-400 ascwo-via-zinc-200 ascwo-to-zinc-400 ascwo-p-4 ascwo-h-[65%] ascwo-animate-pulse">
                            </div>
                        </div>
                    </div>

                    <div class="ascwo-relative ascwo-w-full ascwo-h-[93%] lg:ascwo-h-[90%] ascwo-flex ascwo-flex-col ascwo-items-center">
                        <div
                            class="ascwo-absolute ascwo-top-[50%] ascwo-left-[50%] ascwo-translate-x-[-50%] ascwo-translate-y-[-50%] ascwo-w-[30%] ascwo-h-[30%] ascwo-bg-gradient-to-r ascwo-from-zinc-400 ascwo-via-zinc-200 ascwo-to-zinc-400 ascwo-p-4 ascwo-animate-pulse">
                        </div>

                        <div class="ascwo-absolute ascwo-hidden lg:ascwo-flex ascwo-bottom-[0%] ascwo-w-[88%] ascwo-h-[7%] ascwo-flex ascwo-items-center ascwo-justify-between">
                            <div class="ascwo-w-full ascwo-h-full ascwo-flex ascwo-items-center ascwo-justify-between ascwo-px-2">
                                <div
                                    class="ascwo-w-1/6 ascwo-bg-gradient-to-r ascwo-from-zinc-400 ascwo-via-zinc-200 ascwo-to-zinc-400 ascwo-p-4 ascwo-h-[12%] ascwo-animate-pulse">
                                </div>
                                <div
                                    class="ascwo-w-1/5 ascwo-bg-gradient-to-r ascwo-from-zinc-400 ascwo-via-zinc-200 ascwo-to-zinc-400 ascwo-p-4 ascwo-h-[12%] ascwo-animate-pulse">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="ascwo-w-[8%] ascwo-h-full ascwo-p-4 ascwo-flex ascwo-flex-col ascwo-items-center ascwo-justify-center ascwo-space-y-4">
                    <div   class="ascwo-w-[50px] lg:ascwo-w-[80%] ascwo-h-[90%] lg:ascwo-h-[25px] ascwo-bg-gradient-to-r ascwo-from-zinc-400 ascwo-via-zinc-200 ascwo-to-zinc-400 ascwo-p-4 ascwo-animate-pulse">
                    </div>
                    <div
                        class="ascwo-w-[50px] lg:ascwo-w-[80%] ascwo-h-[90%] lg:ascwo-h-[25px] ascwo-bg-gradient-to-r ascwo-from-zinc-400 ascwo-via-zinc-200 ascwo-to-zinc-400 ascwo-p-4 ascwo-animate-pulse">
                    </div>
                    <div
                        class="ascwo-w-[50px] lg:ascwo-w-[80%] ascwo-h-[90%] lg:ascwo-h-[25px] ascwo-bg-gradient-to-r ascwo-from-zinc-400 ascwo-via-zinc-200 ascwo-to-zinc-400 ascwo-p-4 ascwo-animate-pulse">
                    </div>
                    <div
                        class="ascwo-w-[50px] lg:ascwo-w-[80%] ascwo-h-[90%] lg:ascwo-h-[25px] ascwo-bg-gradient-to-r ascwo-from-zinc-400 ascwo-via-zinc-200 ascwo-to-zinc-400 ascwo-p-4 ascwo-animate-pulse">
                    </div>
                    <div
                        class="ascwo-w-[50px] lg:ascwo-w-[80%] ascwo-h-[90%] lg:ascwo-h-[25px] ascwo-bg-gradient-to-r ascwo-from-zinc-400 ascwo-via-zinc-200 ascwo-to-zinc-400 ascwo-p-4 ascwo-animate-pulse">
                    </div>
                    <div
                        class="ascwo-w-[50px] lg:ascwo-w-[80%] ascwo-h-[90%] lg:ascwo-h-[25px] ascwo-bg-gradient-to-r ascwo-from-zinc-400 ascwo-via-zinc-200 ascwo-to-zinc-400 ascwo-p-4 ascwo-animate-pulse">
                    </div>
                    <div
                        class="ascwo-w-[50px] lg:ascwo-w-[80%] ascwo-h-[90%] lg:ascwo-h-[25px] ascwo-bg-gradient-to-r ascwo-from-zinc-400 ascwo-via-zinc-200 ascwo-to-zinc-400 ascwo-p-4 ascwo-animate-pulse">
                    </div>
                    <div
                        class="ascwo-w-[50px] lg:ascwo-w-[80%] ascwo-h-[90%] lg:ascwo-h-[25px] ascwo-bg-gradient-to-r ascwo-from-zinc-400 ascwo-via-zinc-200 ascwo-to-zinc-400 ascwo-p-4 ascwo-animate-pulse">
                    </div>
                </div>
            </div>
        </div>
        <div id="ascwo-frontend-app" class="ascwo-preview-configurator"></div>
    </div>
    
</template>
<script setup>
import router from '@/admin/router';
import { __, _x, _n, _nx, sprintf, setLocaleData } from "@wordpress/i18n";
import { nextTick, onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

onMounted(async () => {
    await nextTick();
    if (typeof window.ascwoMountFrontendApp === "function") {
        window.ascwoMountFrontendApp();
    }
});

const goBackAndReload = () =>{
    router.reloadPrevious = true;
    router.go(-1)
}
</script>
<style>
.ascwo-admin-preview-shell {
    height: 100vh;
}

.ascwo-admin-preview-content {
    height: calc(100vh - 58px);
}

.ascwo-preview-configurator {
    width: 100%;
    height: 100%;
    min-height: 0;
}

.ascwo-preview-configurator :deep(.ascwo-configurator-container) {
    height: 100%;
    min-height: 0;
}
</style>
