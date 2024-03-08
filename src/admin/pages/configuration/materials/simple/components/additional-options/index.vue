<template>
    <div>
        <AdditionalOptions v-if="$route.name == 'Simple-AdditionalOptions'"/>
        <Options v-if="$route.name == 'Simple-AdditionalOptions-Options'"/>
    </div>
</template>
<script setup>
    import AdditionalOptions from './additional-options.vue'
    import Options from './options.vue'
</script>
<style lang="">
    
</style>