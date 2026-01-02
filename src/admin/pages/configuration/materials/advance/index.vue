<template>
    <headerbar />
    <ComponentAdvance v-if="$route.name == 'Material-Advance'"/>
    <Options v-if="$route.name == 'Material-Advance-options'"/>
</template>
<script setup>
import ComponentAdvance from './components/component-advance.vue';
import { __, _x, _n, _nx, sprintf, setLocaleData } from "@wordpress/i18n";
import Options from './components/options.vue'
import headerbar from '@/admin/pages/components/headerbar.vue'
</script>
<style>
    
</style>
