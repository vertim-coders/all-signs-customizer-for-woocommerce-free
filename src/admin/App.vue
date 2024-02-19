<template>
  <div id="aso-backend-app">
    <div class="aso-flex aso-justify-between aso-flex-row-reverse">
        <Sidebar/>
        <!--<Index class="aso-w-[91%]"/>-->
        <!--<Material class="aso-w-[91%]"/>-->
        <Sizes class="aso-w-[91%]"/>
        <router-view />
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue';
import '@/frontend/utils/tailwindcss.min.js'

import Sidebar from './pages/components/sidebar.vue'
//import Index from './pages/configuration/index.vue'
//import Material from './pages/configuration/materials/material.vue'
import Sizes from './pages/configuration/materials/simple/components/sizes.vue'

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