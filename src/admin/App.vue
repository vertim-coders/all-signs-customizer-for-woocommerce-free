<template>
    <div id="asowp-backend-app" class="asowp-h-[100vh]">
        <Headerbar
            v-if="
                $route &&
                $route.name &&
                (
                    $route.name === 'Simple-Sizes' ||
                    $route.name === 'Simple-Colors' ||
                    $route.name === 'Simple-Shapes' ||
                    $route.name === 'Simple-Borders' ||
                    $route.name === 'Simple-FixingMethods' ||
                    $route.name === 'Simple-TextImages' ||
                    $route.name === 'Simple-Discounts' ||
                    $route.name === 'Simple-OthersComponents' ||
                    $route.name == 'Simple-OthersComponents-Options' ||
                    $route.name == 'config-additional-options'
                )
            "
        />
        <!--<Sidebar v-if="$route.name !== 'home'"/>-->
        <div
            v-if="showProductContent"
            :class="$route && $route.name !== 'home' ? `asowp-w-full ` : 'asowp-w-full'"
        >
            <router-view />
        </div>
        <div v-if="!showProductContent" :class="`asowp-w-[calc(100%-85px)] asowp-pl-[10px] asowp-pt-[10px] asowp-mt-[40px]`">
            <GlobalSettings />
        </div>
    </div>
</template>

<script setup>
import {computed, onMounted, ref} from 'vue';
import '@/frontend/utils/tailwindcss.min.js'
import Sidebar from './pages/components/sidebar.vue'
import Headerbar from './pages/components/headerbar.vue';
import NotFound from "@/admin/pages/NotFound/index.vue";
import GlobalSettings from "@/admin/pages/global-settings/index.vue";
import api from './Api/api';
import toastMessage from './utils/functions';
import { t } from './utils/i18n';

import { __, _x, _n, _nx, sprintf, setLocaleData } from "@wordpress/i18n";
const activateProduct = ref(!isNaN(asowp_data.caches) && parseInt(asowp_data.caches) > 1704067200? true : false);
const showProductContent = computed(() => {
    if (!activateProduct.value && !$route) return false;
    const alwaysAllowedRoutes = ['configurations','create-configuration','edit-configuration'];
    return activateProduct.value || ( $route && alwaysAllowedRoutes.includes($route.name));
});
const product = ref('');
const productId = asowp_data.author;
onMounted(async() => {
    
});
const activateLicenseKey = async () => {
    try {
        const url = 'https://signsdesigner.us/wp-json/vlc/license/?lcde='+ product.value +"&siteurl="+asowp_data.site_url+"&vertim="+productId;
        const response = await axios.get(url);
        if (response.data.key) {
            activateProduct.value = true;
            await api.saveGlobalSettingsProduct(licenses.value);
        }else if(response.data.message){
            toastMessage(t(response.data.message), 'error');
        }else{
            toastMessage(t(response.data), 'error');
        }
    } catch (error) {
        toastMessage(__('An unknown error occurred.', 'all-signs-options-pro'), "error");
    }
}

tailwind.config ={
    prefix: 'asowp-',
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
