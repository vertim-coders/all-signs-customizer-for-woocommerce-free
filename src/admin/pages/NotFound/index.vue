
<template>
    <div class="asowp-flex items-center asowp-justify-center asowp-bg-black asowp-bg-opacity-20 asowp-p-2 asowp-h-full">
        <div class="asowp-w-2/3 asowp-flex asowp-flex-col asowp-items-center asowp-justify-center">
            <h1 class="asowp-text-2xl asowp-font-bold" v-if="!license_status" style="font-size: 50px; font-weight: 700;">403</h1>
            <h1 class="asowp-text-2xl asowp-font-bold" style="font-size: 50px; font-weight: 700;">or</h1>
            <h1 class="asowp-text-2xl asowp-font-bold" style="font-size: 50px; font-weight: 700;">404</h1>
            <p class="asowp-text-xl asowp-font-semibold" v-if="!license_status">Acces denied, please check your license</p> 
            <p class="asowp-text-xl asowp-font-semibold">Page Not Found</p> 
        </div>
    </div>
</template>

<script setup>
import {ref,onMounted,defineProps} from 'vue';
const props = defineProps({
    state:Boolean
})
const license_status = ref(props.state);
</script>

<style lang="scss" scoped>

</style>