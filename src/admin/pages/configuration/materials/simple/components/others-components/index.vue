<template>
    <div>
        <OthersComponents v-if="$route.name == 'Simple-OthersComponents'"/>
        <Options v-if="$route.name == 'Simple-OthersComponents-Options'"/>
    </div>
</template>
<script setup>
    
import { __, _x, _n, _nx, sprintf, setLocaleData } from "@wordpress/i18n";
import OthersComponents from './components.vue'
    import Options from './options.vue'
</script>
<style lang="">
    
</style>