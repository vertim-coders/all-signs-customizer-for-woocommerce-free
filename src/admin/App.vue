<template>
  <div id="aso-backend-app">
    <div class="aso-flex aso-justify-between aso-flex-row-reverse">
        <Sidebar/>
        <!--<Index class="aso-w-[91%]"/>-->
        <!--<Material class="aso-w-[91%]"/>-->
        <!--<Sizes class="aso-w-[91%]"/>-->
        <!--<Borders class="aso-w-[91%]"/>-->
        <!--<Colors class="aso-w-[91%]"/>-->
        <!--<Shapes class="aso-w-[91%]"/>-->
        <!--<Fixing class="aso-w-[91%]"/>-->
        <!--<Text class="aso-w-[91%]"/>-->
        <!--<Additional class="aso-w-[91%]"/>-->
        <List class="aso-w-[91%]"/>
        <!--<Options class="aso-w-[91%]"/>-->
        <!--<Advance class="aso-w-[91%]"/>-->
        <!--<Size class="aso-w-[91%]"/>-->
        <!--<Color class="aso-w-[91%]"/>-->
        <!--<Clipart class="aso-w-[91%]"/>-->
        <!--<Groups class="aso-w-[91%]"/>-->
        <!--<Fonts class="aso-w-[91%]"/>-->
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
//import Sizes from './pages/configuration/materials/simple/components/sizes.vue'
//import Borders from './pages/configuration/materials/simple/components/borders.vue'
//import Colors from './pages/configuration/materials/simple/components/colors.vue'
//import Shapes from './pages/configuration/materials/simple/components/shapes.vue'
//import Fixing from './pages/configuration/materials/simple/components/fixing-methods.vue'
//import Text from './pages/configuration/materials/simple/components/text-images.vue'
//import Additional from './pages/configuration/materials/simple/components/additional-options/additional-options.vue'
import List from './pages/configuration/materials/simple/components/additional-options/list-additional-options.vue'
//import Options from './pages/configuration/materials/advance/components/options.vue'
//import Advance from './pages/configuration/materials/advance/components/advance_process.vue'
//import Size from './pages/manage-sizes/size.vue'
//import Color from './pages/manage-colors/color.vue'
//import Clipart from './pages/manage-cliparts/clipart.vue'
//import Groups from './pages/manage-cliparts/groups-cliparts.vue'
//import Fonts from './pages/manage-fonts/fonts.vue'

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