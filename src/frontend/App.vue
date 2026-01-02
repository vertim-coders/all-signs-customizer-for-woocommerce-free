<template>
    <router-view v-if="activateProduct"/>
</template>

<script setup>
import {onMounted, ref} from 'vue';
import '@/frontend/utils/tailwindcss.min.js';
import '../../assets/utilities/fabric.min.js';
import '../../assets/utilities/hammerjs.js';
import api from '@/admin/Api/api.js';
import { __, _x, _n, _nx, sprintf, setLocaleData } from "@wordpress/i18n";
// import '@/frontend/utils/asowp-editor-script.js';
const activateProduct = ref(!isNaN(asowp_data.caches) && parseInt(asowp_data.caches) > 1704067200? true : false);

const product = ref('');
const productId = asowp_data.author;
onMounted(async() => {
});
const activateLicenseKey = async () => {
    try {
        const url = 'https://signsdesigner.us/wp-json/vlc/license/?lcde='+ product.value +"&siteurl="+asowp_data.site_url+"&vertim="+productId;
        const response = await axios.get(url);
        if (response.data.key) {
            activateProduct.value=true;
            await api.saveGlobalSettingsProduct(licenses.value);
        }else if(response.data.message){
            console.log(response.data.message, 'error');
        }else{
            console.log(response.data, 'error');
        }
    } catch (error) {
        console.log(error, "error");
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