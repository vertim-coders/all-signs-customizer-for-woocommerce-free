<template>
    <div>
        <OthersComponents v-if="$route.name == 'Simple-OthersComponents'"/>
        <Options v-if="$route.name == 'Simple-OthersComponents-Options'"/>
    </div>
</template>
<script setup>
    import OthersComponents from './components.vue'
    import Options from './options.vue'
</script>
<style lang="">
    
</style>