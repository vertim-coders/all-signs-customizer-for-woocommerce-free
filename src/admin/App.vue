<template>
    <div id="aso-backend-app" class="aso-h-[100vh]">
        <Headerbar v-if="$route.name!=='preview-back'"/>
        <Sidebar/>
        <div :class="`aso-w-[calc(100%-85px)] aso-pl-[10px] aso-pt-[10px]`">
            <router-view v-if="activateProduct"/>
            <GlobalSettings v-if="!activateProduct"/>
        </div>
    </div>
</template>

<script setup>
import {onMounted, ref} from 'vue';
import '@/frontend/utils/tailwindcss.min.js'
import Sidebar from './pages/components/sidebar.vue'
import Headerbar from './pages/components/headerbar.vue';
import NotFound from "@/admin/pages/NotFound/index.vue";
import GlobalSettings from "@/admin/pages/global-settings/index.vue";
import api from './Api/api';
const activateProduct = ref(true);
onMounted(async() => {
    try {
        const response = await api.getProductHealth();
        if(response.aso_health) {
            activateProduct.value = true;
        }else{
            activateProduct.value = false;
        }
    } catch (error) {
        activateProduct.value = false;
    }
});

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