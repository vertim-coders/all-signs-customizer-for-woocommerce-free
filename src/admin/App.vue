<template>
    <div id="aso-backend-app">
        <Headerbar/>
        <div :class="`${$route.name!=='preview-back' ? 'aso-relative aso-z-[999]': ''} aso-flex aso-justify-between aso-flex-row-reverse aso-w-full aso-pl-[10px] aso-pt-[50px]`">
            <div class="aso-relative aso-w-[80px]">
                <Sidebar/>
            </div>
            <div class="aso-w-full aso-pr-[10px]">
                <router-view />
            </div>
        </div>
    </div>
</template>

<script setup>
import {ref} from 'vue';
import '@/frontend/utils/tailwindcss.min.js'
//import '@/admin/utils/aso-tinymce.js'
import Sidebar from './pages/components/sidebar.vue'
import Headerbar from './pages/components/headerbar.vue';

/* tinymce.init({
    selector: '#aso-admin-tinymce',
    width: '100%',
    height: 200,
}); */

tailwind.config ={
    prefix: 'aso-',
    corePlugins: {
        preflight: false,
    },
    
    content: ["./**/*.{vue,js}"],
    theme: {
        extend: {
            keyframes: {
                slideToleft: {
                    'from': { transform: 'translateX(20%)' },
                    'to': { transform: 'translateX(0)' },
                },
                slideDown: {
                    'from': { transform: 'translateY(-20%)' },
                    'to': { transform: 'translateY(0)' },
                },
                slideUp: {
                    'from': { transform: 'translateY(0)' },
                    'to': { transform: 'translateY(-150%)' },
                },
            },
            animation: {
                slideToleft: 'slideToleft 0.5s ease',
                slideDown: 'slideDown 0.5s ease',
                slideUp: 'slideUp 0.5s ease',
            }
        }
    }

}
</script>

<style>
</style>