<template>
  <div id="aso-backend-app">
    <div class="aso-relative aso-flex aso-justify-between aso-flex-row-reverse aso-w-full">
        <div class="aso-relative aso-w-[80px]">
            <Sidebar/>
        </div>
        <!--<div class="aso-w-full aso-pr-[10px]">
            <router-view />
        </div>-->
        
        <!--<Product class="aso-w-full"/>-->
        <!--<Output class="aso-w-full"/>-->
        <!--<Mobiles class="aso-w-full"/>-->
        <!--<Customizer class="aso-w-full"/>-->
        <Sign class="aso-w-full"/>
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue';
import '@/frontend/utils/tailwindcss.min.js'

import Sidebar from './pages/components/sidebar.vue'
//import Product from './pages/configuration/settings/generals/product.vue'
//import Output from './pages/configuration/settings/generals/output.vue'
//import Mobiles from './pages/configuration/settings/generals/mobiles-options.vue'
//import Customizer from './pages/configuration/settings/customizer-signs/customizer-options.vue'
import Sign from './pages/configuration/settings/customizer-signs/sign-part.vue'
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