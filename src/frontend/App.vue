<template>
    <router-view v-if="activateProduct"/>
</template>

<script setup>
import {onMounted, ref} from 'vue';
import '@/frontend/utils/tailwindcss.min.js';
import '../../assets/utilities/fabric.min.js';
import api from '@/admin/Api/api.js';
// import '@/frontend/utils/aso-editor-script.js';
const activateProduct = ref(true);
const product = ref('');
const productId = aso_data.author;
onMounted(async() => {
    try {
        const response = await api.getProductHealth();
        product.value = response.product;
        if(response.aso_health) {
            activateProduct.value = true;
        }else{
            await activateLicenseKey();
            activateProduct.value = false;
        }
    } catch (error) {
        activateProduct.value = false;
    }
});
const activateLicenseKey = async () => {
    try {
        const url = 'https://demos.signsdesigner.us/vlc-test/wp-json/vlc/license/?lcde='+ product.value +"&siteurl="+aso_data.site_url+"&vertim="+productId;
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