<template lang="">
    <div class="asowp-admin-preview-shell asowp-fixed asowp-z-[999999] asowp-w-full asowp-h-full asowp-top-0 asowp-left-0 asowp-bg-white asowp-flex asowp-flex-col">
        <div class="asowp-admin-preview-toolbar asowp-bg-white asowp-border-solid asowp-border asowp-flex asowp-justify-between asowp-items-center asowp-gap-3 asowp-p-2 asowp-min-h-[40px] asowp-shrink-0">
            <button @click="goBackAndReload" class="asowp-border-solid asowp-text-white asowp-bg-[#016464] asowp-cursor-pointer  asowp-border-none   asowp-font-medium asowp-rounded-md asowp-text-sm asowp-inline-flex asowp-items-center asowp-px-5 asowp-py-2.5 asowp-text-center">
                <svg class="asowp-w-6 asowp-h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 12L5 8V11L17.17 11C17.3756 10.414 17.7586 9.90661 18.2657 9.54821C18.7729 9.18981 19.379 8.9982 20 9C20.7956 9 21.5587 9.31607 22.1213 9.87868C22.6839 10.4413 23 11.2044 23 12C23 12.7956 22.6839 13.5587 22.1213 14.1213C21.5587 14.6839 20.7956 15 20 15C18.69 15 17.58 14.17 17.17 13L5 13V16L1 12Z" fill="currentColor"/>
                </svg>
                {{ __("Back", "all-signs-options-pro") }}
            </button>
            <div class="asowp-text-sm asowp-font-medium asowp-text-white asowp-bg-[#febd52] asowp-px-5 asowp-py-2.5 asowp-rounded">
                {{ __("Preview mode: Add to cart is disabled in the admin preview.", "all-signs-options-pro") }}
            </div>
        </div>
        <div class="asowp-admin-preview-content asowp-flex-1 asowp-min-h-0 asowp-overflow-hidden asowp-relative">
        <div class="asowp-flex asowp-w-[100%] asowp-h-full" id="asowp-configurator-loader">
            <div class="asowp-flex asowp-w-[100%] asowp-h-[100%] asowp-flex asowp-flex-col lg:asowp-flex-row-reverse">
                <div class="asowp-w-[92%] asowp-config-admin asowp-p-4 asowp-flex asowp-flex-col">
                    <div class="asowp-w-full asowp-h-[7%] lg:asowp-h-[10%] asowp-flex asowp-items-center asowp-justify-between">
                        <div class="asowp-w-full asowp-h-full asowp-flex asowp-items-center asowp-justify-between asowp-px-2">
                            <div
                                class="asowp-w-1/5 asowp-bg-gradient-to-r asowp-from-zinc-400 asowp-via-zinc-200 asowp-to-zinc-400 asowp-p-4 asowp-h-[65%] asowp-animate-pulse">
                            </div>
                            <div class="asowp-w-1/3 asowp-h-[65%] asowp-flex asowp-space-x-4">
                                <div
                                    class="asowp-w-1/3 asowp-bg-gradient-to-r asowp-from-zinc-400 asowp-via-zinc-200 asowp-to-zinc-400 asowp-p-4 asowp-h-full asowp-animate-pulse">
                                </div>
                                <div
                                    class="asowp-w-1/3 asowp-bg-gradient-to-r asowp-from-zinc-400 asowp-via-zinc-200 asowp-to-zinc-400 asowp-p-4 asowp-h-full asowp-animate-pulse">
                                </div>
                                <div
                                    class="asowp-w-1/3 asowp-bg-gradient-to-r asowp-from-zinc-400 asowp-via-zinc-200 asowp-to-zinc-400 asowp-p-4 asowp-h-full asowp-animate-pulse">
                                </div>
                            </div>
                            <div
                                class="asowp-w-1/5 asowp-bg-gradient-to-r asowp-from-zinc-400 asowp-via-zinc-200 asowp-to-zinc-400 asowp-p-4 asowp-h-[65%] asowp-animate-pulse">
                            </div>
                        </div>
                    </div>

                    <div class="asowp-relative asowp-w-full asowp-h-[93%] lg:asowp-h-[90%] asowp-flex asowp-flex-col asowp-items-center">
                        <div
                            class="asowp-absolute asowp-top-[50%] asowp-left-[50%] asowp-translate-x-[-50%] asowp-translate-y-[-50%] asowp-w-[30%] asowp-h-[30%] asowp-bg-gradient-to-r asowp-from-zinc-400 asowp-via-zinc-200 asowp-to-zinc-400 asowp-p-4 asowp-animate-pulse">
                        </div>

                        <div class="asowp-absolute asowp-hidden lg:asowp-flex asowp-bottom-[0%] asowp-w-[88%] asowp-h-[7%] asowp-flex asowp-items-center asowp-justify-between">
                            <div class="asowp-w-full asowp-h-full asowp-flex asowp-items-center asowp-justify-between asowp-px-2">
                                <div
                                    class="asowp-w-1/6 asowp-bg-gradient-to-r asowp-from-zinc-400 asowp-via-zinc-200 asowp-to-zinc-400 asowp-p-4 asowp-h-[12%] asowp-animate-pulse">
                                </div>
                                <div
                                    class="asowp-w-1/5 asowp-bg-gradient-to-r asowp-from-zinc-400 asowp-via-zinc-200 asowp-to-zinc-400 asowp-p-4 asowp-h-[12%] asowp-animate-pulse">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="asowp-w-[8%] asowp-h-full asowp-p-4 asowp-flex asowp-flex-col asowp-items-center asowp-justify-center asowp-space-y-4">
                    <div   class="asowp-w-[50px] lg:asowp-w-[80%] asowp-h-[90%] lg:asowp-h-[25px] asowp-bg-gradient-to-r asowp-from-zinc-400 asowp-via-zinc-200 asowp-to-zinc-400 asowp-p-4 asowp-animate-pulse">
                    </div>
                    <div
                        class="asowp-w-[50px] lg:asowp-w-[80%] asowp-h-[90%] lg:asowp-h-[25px] asowp-bg-gradient-to-r asowp-from-zinc-400 asowp-via-zinc-200 asowp-to-zinc-400 asowp-p-4 asowp-animate-pulse">
                    </div>
                    <div
                        class="asowp-w-[50px] lg:asowp-w-[80%] asowp-h-[90%] lg:asowp-h-[25px] asowp-bg-gradient-to-r asowp-from-zinc-400 asowp-via-zinc-200 asowp-to-zinc-400 asowp-p-4 asowp-animate-pulse">
                    </div>
                    <div
                        class="asowp-w-[50px] lg:asowp-w-[80%] asowp-h-[90%] lg:asowp-h-[25px] asowp-bg-gradient-to-r asowp-from-zinc-400 asowp-via-zinc-200 asowp-to-zinc-400 asowp-p-4 asowp-animate-pulse">
                    </div>
                    <div
                        class="asowp-w-[50px] lg:asowp-w-[80%] asowp-h-[90%] lg:asowp-h-[25px] asowp-bg-gradient-to-r asowp-from-zinc-400 asowp-via-zinc-200 asowp-to-zinc-400 asowp-p-4 asowp-animate-pulse">
                    </div>
                    <div
                        class="asowp-w-[50px] lg:asowp-w-[80%] asowp-h-[90%] lg:asowp-h-[25px] asowp-bg-gradient-to-r asowp-from-zinc-400 asowp-via-zinc-200 asowp-to-zinc-400 asowp-p-4 asowp-animate-pulse">
                    </div>
                    <div
                        class="asowp-w-[50px] lg:asowp-w-[80%] asowp-h-[90%] lg:asowp-h-[25px] asowp-bg-gradient-to-r asowp-from-zinc-400 asowp-via-zinc-200 asowp-to-zinc-400 asowp-p-4 asowp-animate-pulse">
                    </div>
                    <div
                        class="asowp-w-[50px] lg:asowp-w-[80%] asowp-h-[90%] lg:asowp-h-[25px] asowp-bg-gradient-to-r asowp-from-zinc-400 asowp-via-zinc-200 asowp-to-zinc-400 asowp-p-4 asowp-animate-pulse">
                    </div>
                </div>
            </div>
        </div>
        <div
            id="asowp-frontend-app"
            class="asowp-preview-configurator"
            :data-asowp-preview-config-id="route.params.configId"
        ></div>
        </div>
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
    if (typeof window.asowpMountFrontendApp === "function") {
        window.asowpMountFrontendApp();
    }
});

const goBackAndReload = () =>{
    router.reloadPrevious = true;
    router.go(-1)
}
</script>
<style>
.asowp-admin-preview-shell {
    height: 100vh;
}

.asowp-admin-preview-content {
    height: calc(100vh - 58px);
}

.asowp-preview-configurator {
    width: 100%;
    height: 100%;
    min-height: 0;
}

.asowp-preview-configurator :deep(.asowp-configurator-container) {
    height: 100%;
    min-height: 0;
}
</style>
