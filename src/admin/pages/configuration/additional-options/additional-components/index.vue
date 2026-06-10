<template>
    <div>
        <OthersComponents v-if="$route.name == 'Additional-Components'"/>
        <Options v-if="$route.name == 'Additional-Components-Options'"/>
    </div>
</template>
<script setup>
    
import OthersComponents from './components.vue'
import Options from './options.vue'
</script>
<style lang="">
    
</style>
