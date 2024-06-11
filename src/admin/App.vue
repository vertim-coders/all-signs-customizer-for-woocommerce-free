<template>
    <div id="aso-backend-app" class="aso-h-[100vh]">
        <Headerbar v-if="$route.name!=='preview-back'"/>
        <Sidebar/>
        <div :class="`aso-w-[calc(100%-100px)] aso-pl-[10px] aso-pt-[10px]`">
            <router-view />
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