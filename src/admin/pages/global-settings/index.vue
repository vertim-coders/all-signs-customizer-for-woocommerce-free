<template>
    <div class="asowp-sticky asowp-z-[999] asowp-w-full asowp-top-[30px]">
        <div class="asowp-bg-[#fff] asowp-p-4 asowp-rounded-[10px] asowp-border-[2px] asowp-border-solid asowp-border-[#d9d9d9]">
            <div class="asowp-text-[16px] asowp-font-bold">
                {{ __('Global settings', 'all-signs-options-pro') }}
            </div>
        </div>
        
        <div class="asowp-bg-white asowp-translate-y-2 asowp-bg-[#fff] asowp-rounded-[10px] asowp-border-[2px] asowp-border-solid asowp-border-[#d9d9d9] asowp-justify-center asowp-items-center asowp-flex">
            <div class="" v-if="!actualLink.includes(excludeLink)">
                <button @click="router.push('/global-settings/license')" :class="`asowp-flex asowp-w-fit asowp-h-fit asowp-p-4 asowp-bg-transparent asowp-text-black ${route.name == 'global-settings-license' ? 'asowp-border-b-[2px] asowp-border-r-0 asowp-border-l-0 asowp-border-t-0 asowp-border-solid asowp-border-b-[#016464] asowp-text-[#016464] asowp-font-bold' : 'asowp-border-none'} asowp-cursor-pointer asowp-space-x-2 asowp-items-center` ">
                    <svg class="asowp-w-6 asowp-h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1ZM12 7C13.1 7 14 7.9 14 9C14 10.1 13.1 11 12 11C10.9 11 10 10.1 10 9C10 7.9 10.9 7 12 7ZM15 17H9V15.5C9 14.5 11 13.9 12 13.9C13 13.9 15 14.5 15 15.5V17Z" fill="currentColor"/>
                    </svg>
                    <div class="asowp-text-[16px]">
                        {{ __('License', 'all-signs-options-pro') }}
                    </div>
                </button>
            </div>
            <div class="">
                <button @click="router.push('/global-settings/configuration-page')" :class="`asowp-flex asowp-w-fit asowp-h-fit asowp-p-4 asowp-bg-transparent asowp-text-black ${route.name == 'global-settings-configuration-page' ? 'asowp-border-b-[2px] asowp-border-r-0 asowp-border-l-0 asowp-border-t-0 asowp-border-solid asowp-border-b-[#016464] asowp-text-[#016464] asowp-font-bold' : 'asowp-border-none'} asowp-cursor-pointer asowp-space-x-2 asowp-items-center` ">
                    <svg class="asowp-w-6 asowp-h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z" fill="currentColor"/>
                    </svg>
                    <div class="asowp-text-[16px]">
                        {{ __('Configuration page', 'all-signs-options-pro') }}
                    </div>
                </button>
            </div>
            <div class="">
                <button @click="router.push('/global-settings/output')" :class="`asowp-flex asowp-w-fit asowp-h-fit asowp-p-4 asowp-bg-transparent asowp-text-black ${route.name == 'global-settings-output' ? 'asowp-border-b-[2px] asowp-border-r-0 asowp-border-l-0 asowp-border-t-0 asowp-border-solid asowp-border-b-[#016464] asowp-text-[#016464] asowp-font-bold' : 'asowp-border-none'} asowp-cursor-pointer asowp-space-x-2 asowp-items-center` ">
                    <svg class="asowp-w-6 asowp-h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 8H5C3.34 8 2 9.34 2 11V17H6V21H18V17H22V11C22 9.34 20.66 8 19 8ZM16 19H8V14H16V19ZM19 12C18.45 12 18 11.55 18 11C18 10.45 18.45 10 19 10C19.55 10 20 10.45 20 11C20 11.55 19.55 12 19 12ZM18 3H6V7H18V3Z" fill="currentColor"/>
                    </svg>
                    <div class="asowp-text-[16px]">
                        {{ __('Output', 'all-signs-options-pro') }}
                    </div>
                </button>
            </div>
            <div class="">
                <button @click="router.push('/global-settings/shapes')" :class="`asowp-flex asowp-w-fit asowp-h-fit asowp-p-4 asowp-bg-transparent asowp-text-black ${route.name == 'global-settings-shapes' ? 'asowp-border-b-[2px] asowp-border-r-0 asowp-border-l-0 asowp-border-t-0 asowp-border-solid asowp-border-b-[#016464] asowp-text-[#016464] asowp-font-bold' : 'asowp-border-none'} asowp-cursor-pointer asowp-space-x-2 asowp-items-center` ">
                    <svg class="asowp-w-6 asowp-h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2L1 21H23L12 2ZM12 6L19.53 19H4.47L12 6Z" fill="currentColor"/>
                    </svg>
                    <div class="asowp-text-[16px]">
                        {{ __('Shapes', 'all-signs-options-pro') }}
                    </div>
                </button>
            </div>
            <div class="">
                <button @click="goToFixing" :class="`asowp-flex asowp-w-fit asowp-h-fit asowp-p-4 asowp-bg-transparent asowp-text-black ${route.name == 'global-settings-fixing-methods' ? 'asowp-border-b-[2px] asowp-border-r-0 asowp-border-l-0 asowp-border-t-0 asowp-border-solid asowp-border-b-[#016464] asowp-text-[#016464] asowp-font-bold' : 'asowp-border-none'} asowp-cursor-pointer asowp-space-x-2 asowp-items-center` ">
                    <svg class="asowp-w-6 asowp-h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 2V5H10V22H14V5H17V2H7Z" fill="currentColor"/>
                    </svg>
                    <div class="asowp-text-[16px]">
                        {{ __('Fixing methods', 'all-signs-options-pro') }}
                    </div>
                </button>
            </div>
            <div class="">
                <button @click="router.push('/global-settings/border')" :class="`asowp-flex asowp-w-fit asowp-h-fit asowp-p-4 asowp-bg-transparent asowp-text-black ${route.name == 'global-settings-border' ? 'asowp-border-b-[2px] asowp-border-r-0 asowp-border-l-0 asowp-border-t-0 asowp-border-solid asowp-border-b-[#016464] asowp-text-[#016464] asowp-font-bold' : 'asowp-border-none'} asowp-cursor-pointer asowp-space-x-2 asowp-items-center` ">
                    <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_281_2062)">
                        <path d="M44 4H4V44H44V4ZM40 40H8V8H40V40Z" fill="currentColor"/>
                        <path d="M12 12V36H36V12H12ZM32 32H16V16H32V32Z" fill="currentColor"/>
                        </g>
                    </svg>
                    <div class="asowp-text-[16px]">
                        {{ __('Border', 'all-signs-options-pro') }}
                    </div>
                </button>
            </div>
        </div>
    </div>
        
    <div>
        <Licences v-if="$route.name == 'global-settings-license' && !actualLink.includes(excludeLink)"/>
        <ConfigurationPage v-if="$route.name == 'global-settings-configuration-page'"/>
        <Output v-if="$route.name == 'global-settings-output'"/>
        <Shapes v-if="$route.name == 'global-settings-shapes'"/>
        <FixingMethods v-if="$route.name === 'global-settings-fixing-methods'"/>
        <Border v-if="$route.name == 'global-settings-border'"/>
    </div>
</template>
<script setup>
import Licences from './license/index.vue'
import ConfigurationPage from './configuration-page/index.vue'
import Output from './output/index.vue'
import Shapes from './shapes/index.vue'
import FixingMethods from './fixing-methods/index.vue'
import Border from './border/index.vue'
import { useRoute } from 'vue-router';
import router from '@/admin/router'
import { onMounted, ref } from 'vue';
import { __, _x, _n, _nx, sprintf, setLocaleData } from "@wordpress/i18n";
// Import du helper de traduction
var excludeLink = ref("https://signsdesigner.us/public-demos");
var actualLink = ref(window.location.href)
const route = useRoute();

onMounted(() => {
    if(route.name === 'global-settings'){
        router.push('/global-settings/output')
    }
})

const goToFixing = ()=>{
    router.push("/global-settings/fixing-methods")
    .then(() => {
      // Recharger la page après la navigation
      window.location.reload();
    });
}
</script>
<style lang="">
    
</style>