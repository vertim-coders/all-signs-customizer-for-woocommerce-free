<template lang="">
    <div class="ascwo-fixed ascwo-inset-0 ascwo-z-[999999] ascwo-flex ascwo-flex-col ascwo-bg-white">
        <div class="ascwo-flex-none ascwo-flex ascwo-items-center ascwo-gap-3 ascwo-h-10 ascwo-px-3 ascwo-bg-white ascwo-border-0 ascwo-border-b ascwo-border-solid ascwo-border-zinc-200">
            <button @click="goBackAndReload" class="ascwo-flex-none ascwo-inline-flex ascwo-items-center ascwo-gap-1.5 ascwo-px-3 ascwo-py-1.5 ascwo-text-xs ascwo-font-medium ascwo-text-white ascwo-bg-[#016464] ascwo-border-none ascwo-rounded-md ascwo-cursor-pointer">
                <svg class="ascwo-w-4 ascwo-h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d="M1 12L5 8V11L17.17 11C17.3756 10.414 17.7586 9.90661 18.2657 9.54821C18.7729 9.18981 19.379 8.9982 20 9C20.7956 9 21.5587 9.31607 22.1213 9.87868C22.6839 10.4413 23 11.2044 23 12C23 12.7956 22.6839 13.5587 22.1213 14.1213C21.5587 14.6839 20.7956 15 20 15C18.69 15 17.58 14.17 17.17 13L5 13V16L1 12Z" fill="currentColor"/>
                </svg>
                {{ __("Back", "all-signs-customizer-for-woocommerce") }}
            </button>
            <span
                class="ascwo-min-w-0 ascwo-truncate ascwo-text-xs ascwo-font-medium ascwo-text-[#7a4a00] ascwo-bg-[#febd52]/25 ascwo-px-2.5 ascwo-py-1 ascwo-rounded-full"
                :title='__("Preview mode: Add to cart is disabled in the admin preview.", "all-signs-customizer-for-woocommerce")'
            >
                {{ __("Preview mode: Add to cart is disabled in the admin preview.", "all-signs-customizer-for-woocommerce") }}
            </span>
        </div>
        <div class="ascwo-relative ascwo-flex-1 ascwo-min-h-0 ascwo-overflow-auto">
        <ConfiguratorSkeleton />
        <div
            id="ascwo-frontend-app"
            class="ascwo-preview-configurator"
            data-route="preview"
            :data-config-id="route.params.configId"
        ></div>
        </div>
    </div>
    
</template>
<script setup>
import ConfiguratorSkeleton from "@/admin/pages/components/ConfiguratorSkeleton.vue";
import router from '@/admin/router';
import { useRoute } from "vue-router";
import { __, _x, _n, _nx, sprintf, setLocaleData } from "@wordpress/i18n";

const route = useRoute();

const goBackAndReload = () =>{
    router.reloadPrevious = true;
    router.go(-1)
}
</script>
<style>
.ascwo-preview-configurator {
    width: 100%;
    height: 100%;
    min-height: 0;
}
</style>
