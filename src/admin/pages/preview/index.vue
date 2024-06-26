<template lang="">
    <div class="aso-fixed aso-z-[999999] aso-w-full aso-h-full aso-top-0 aso-left-0 aso-bg-white">
        <div class="aso-bg-white aso-border-solid aso-border aso-flex aso-justify-start aso-p-2 aso-h-[40px]">
            <button @click="goBackAndReload" class="aso-border-solid aso-text-white aso-bg-[#016464] aso-cursor-pointer  aso-border-none   aso-font-medium aso-rounded-md aso-text-sm aso-inline-flex aso-items-center aso-px-5 aso-py-2.5 aso-text-center">
                <svg class="aso-w-6 aso-h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 12L5 8V11L17.17 11C17.3756 10.414 17.7586 9.90661 18.2657 9.54821C18.7729 9.18981 19.379 8.9982 20 9C20.7956 9 21.5587 9.31607 22.1213 9.87868C22.6839 10.4413 23 11.2044 23 12C23 12.7956 22.6839 13.5587 22.1213 14.1213C21.5587 14.6839 20.7956 15 20 15C18.69 15 17.58 14.17 17.17 13L5 13V16L1 12Z" fill="currentColor"/>
                </svg>
                Back
            </button>
        </div>
        <div class="aso-flex aso-w-[100%]" id="aso-configurator-loader">
            <div class="aso-flex aso-w-[100%] aso-h-[100%] aso-flex aso-flex-col lg:aso-flex-row-reverse">
                <div class="aso-w-[92%] aso-config-admin aso-p-4 aso-flex aso-flex-col">
                    <div class="aso-w-full aso-h-[7%] lg:aso-h-[10%] aso-flex aso-items-center aso-justify-between">
                        <div class="aso-w-full aso-h-full aso-flex aso-items-center aso-justify-between aso-px-2">
                            <div
                                class="aso-w-1/5 aso-bg-gradient-to-r aso-from-zinc-400 aso-via-zinc-200 aso-to-zinc-400 aso-p-4 aso-h-[65%] aso-animate-pulse">
                            </div>
                            <div class="aso-w-1/3 aso-h-[65%] aso-flex aso-space-x-4">
                                <div
                                    class="aso-w-1/3 aso-bg-gradient-to-r aso-from-zinc-400 aso-via-zinc-200 aso-to-zinc-400 aso-p-4 aso-h-full aso-animate-pulse">
                                </div>
                                <div
                                    class="aso-w-1/3 aso-bg-gradient-to-r aso-from-zinc-400 aso-via-zinc-200 aso-to-zinc-400 aso-p-4 aso-h-full aso-animate-pulse">
                                </div>
                                <div
                                    class="aso-w-1/3 aso-bg-gradient-to-r aso-from-zinc-400 aso-via-zinc-200 aso-to-zinc-400 aso-p-4 aso-h-full aso-animate-pulse">
                                </div>
                            </div>
                            <div
                                class="aso-w-1/5 aso-bg-gradient-to-r aso-from-zinc-400 aso-via-zinc-200 aso-to-zinc-400 aso-p-4 aso-h-[65%] aso-animate-pulse">
                            </div>
                        </div>
                    </div>

                    <div class="aso-relative aso-w-full aso-h-[93%] lg:aso-h-[90%] aso-flex aso-flex-col aso-items-center">
                        <div
                            class="aso-absolute aso-top-[50%] aso-left-[50%] aso-translate-x-[-50%] aso-translate-y-[-50%] aso-w-[30%] aso-h-[30%] aso-bg-gradient-to-r aso-from-zinc-400 aso-via-zinc-200 aso-to-zinc-400 aso-p-4 aso-animate-pulse">
                        </div>

                        <div class="aso-absolute aso-hidden lg:aso-flex aso-bottom-[0%] aso-w-[88%] aso-h-[7%] aso-flex aso-items-center aso-justify-between">
                            <div class="aso-w-full aso-h-full aso-flex aso-items-center aso-justify-between aso-px-2">
                                <div
                                    class="aso-w-1/6 aso-bg-gradient-to-r aso-from-zinc-400 aso-via-zinc-200 aso-to-zinc-400 aso-p-4 aso-h-[12%] aso-animate-pulse">
                                </div>
                                <div
                                    class="aso-w-1/5 aso-bg-gradient-to-r aso-from-zinc-400 aso-via-zinc-200 aso-to-zinc-400 aso-p-4 aso-h-[12%] aso-animate-pulse">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="aso-w-[8%] aso-h-full aso-p-4 aso-flex aso-flex-col aso-items-center aso-justify-center aso-space-y-4">
                    <div   class="aso-w-[50px] lg:aso-w-[80%] aso-h-[90%] lg:aso-h-[25px] aso-bg-gradient-to-r aso-from-zinc-400 aso-via-zinc-200 aso-to-zinc-400 aso-p-4 aso-animate-pulse">
                    </div>
                    <div
                        class="aso-w-[50px] lg:aso-w-[80%] aso-h-[90%] lg:aso-h-[25px] aso-bg-gradient-to-r aso-from-zinc-400 aso-via-zinc-200 aso-to-zinc-400 aso-p-4 aso-animate-pulse">
                    </div>
                    <div
                        class="aso-w-[50px] lg:aso-w-[80%] aso-h-[90%] lg:aso-h-[25px] aso-bg-gradient-to-r aso-from-zinc-400 aso-via-zinc-200 aso-to-zinc-400 aso-p-4 aso-animate-pulse">
                    </div>
                    <div
                        class="aso-w-[50px] lg:aso-w-[80%] aso-h-[90%] lg:aso-h-[25px] aso-bg-gradient-to-r aso-from-zinc-400 aso-via-zinc-200 aso-to-zinc-400 aso-p-4 aso-animate-pulse">
                    </div>
                    <div
                        class="aso-w-[50px] lg:aso-w-[80%] aso-h-[90%] lg:aso-h-[25px] aso-bg-gradient-to-r aso-from-zinc-400 aso-via-zinc-200 aso-to-zinc-400 aso-p-4 aso-animate-pulse">
                    </div>
                    <div
                        class="aso-w-[50px] lg:aso-w-[80%] aso-h-[90%] lg:aso-h-[25px] aso-bg-gradient-to-r aso-from-zinc-400 aso-via-zinc-200 aso-to-zinc-400 aso-p-4 aso-animate-pulse">
                    </div>
                    <div
                        class="aso-w-[50px] lg:aso-w-[80%] aso-h-[90%] lg:aso-h-[25px] aso-bg-gradient-to-r aso-from-zinc-400 aso-via-zinc-200 aso-to-zinc-400 aso-p-4 aso-animate-pulse">
                    </div>
                    <div
                        class="aso-w-[50px] lg:aso-w-[80%] aso-h-[90%] lg:aso-h-[25px] aso-bg-gradient-to-r aso-from-zinc-400 aso-via-zinc-200 aso-to-zinc-400 aso-p-4 aso-animate-pulse">
                    </div>
                </div>
            </div>
        </div>
        <div id="aso-frontend-app" class="aso-preview-configurator"></div>
    </div>
    
</template>
<script setup>
import router from '@/admin/router';
const goBackAndReload = () =>{
    router.reloadPrevious = true;
    router.go(-1)
}
</script>
<style lang="">
    
</style>