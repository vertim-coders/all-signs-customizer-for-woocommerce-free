<template>
    <ComponentAdvance v-if="$route.name == 'Material-Advance'"/>
    <Options v-if="$route.name == 'Material-Advance-options'"/>
</template>
<script setup>
import ComponentAdvance from './components/component-advance.vue';
import Options from './components/options.vue'
</script>
<style>
    
</style>./components/option.vue./components/options.vue