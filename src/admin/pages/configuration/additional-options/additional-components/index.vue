<template>
    <div>
        <OthersComponents v-if="$route.name == 'Additional-Components'" :material-id="materialId"/>
        <Options v-if="$route.name == 'Additional-Components-Options'" :material-id="materialId"/>
    </div>
</template>
<script setup>
    
import { __, _x, _n, _nx, sprintf, setLocaleData } from "@wordpress/i18n";
import OthersComponents from './components.vue'
import Options from './options.vue'

defineProps({
  materialId: {
    type: [String, Number],
    default: 0,
  },
});
</script>
<style lang="">
    
</style>
