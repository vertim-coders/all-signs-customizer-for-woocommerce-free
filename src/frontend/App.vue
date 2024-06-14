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
onMounted(async() => {
    try {
        const response = await api.getProductHealth();
        if(response.activate) {
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