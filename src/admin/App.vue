<template>
    <div id="aso-backend-app" class="aso-h-[100vh]">
        <Headerbar v-if="$route.name!=='preview-back'"/>
        <Sidebar v-if="$route.name !== 'home'"/>
        <div v-if="activateProduct" :class="$route.name !== 'home' ? `aso-w-[calc(100%-85px)] aso-pl-[10px] aso-pt-[10px] aso-mt-[40px]` : 'aso-w-full aso-px-[10px] aso-pt-[10px]'">
            <router-view />
        </div>
        <div v-if="!activateProduct" :class="`aso-w-[calc(100%-85px)] aso-pl-[10px] aso-pt-[10px] aso-mt-[40px]`">
            <GlobalSettings />
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
const product = ref('');
const productId = asowp_data.author;
onMounted(async() => {
    try {
        const response = await api.getProductHealth();
        product.value = response.product;
        if(response.asowp_health) {
            activateProduct.value = true;
        }else{
            //await activateLicenseKey();
            activateProduct.value = false;
        }
    } catch (error) {
        activateProduct.value = false;
    }
});
const activateLicenseKey = async () => {
    try {
        const url = 'https://signsdesigner.us/wp-json/vlc/license/?lcde='+ product.value +"&siteurl="+asowp_data.site_url+"&vertim="+productId;
        const response = await axios.get(url);
        if (response.data.key) {
            activateProduct.value = true;
            await api.saveGlobalSettingsProduct(licenses.value);
        }else if(response.data.message){
            toastMessage(response.data.message, 'error');
        }else{
            toastMessage(response.data, 'error');
        }
    } catch (error) {
        toastMessage(error, "error");
    }
}

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