<template>
    <router-view v-if="canRenderFrontend"/>
</template>

<script setup>
import {computed, onMounted, ref} from 'vue';
import { useRoute } from 'vue-router';
import '@/frontend/utils/tailwindcss.min.js';
import '../../assets/utilities/fabric.min.js';
import '../../assets/utilities/hammerjs.js';

const activateProduct = ref(!isNaN(asowp_data.caches) && parseInt(asowp_data.caches) > 1704067200? true : false);
const frontendReady = ref(false);
const currentPage = window.asowp_data?.page || '';
const route = useRoute();
const canRenderFrontend = computed(() => {
    const isAdminPreview = currentPage === 'admin' && (route.name === 'preview-back' || route.name === 'template-maker');
    return frontendReady.value && (activateProduct.value || isAdminPreview);
});

onMounted(async() => {
    try {
        await loadFrontendDependencies();
    } catch (error) {
        console.error('ASOWP frontend bootstrap failed to load optional dependencies.', error);
    } finally {
        frontendReady.value = true;
    }
});

const loadFrontendDependencies = async () => {
    window.tailwind = window.tailwind || {};
    window.tailwind.config = {
        prefix: 'asowp-',
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
    };

};
</script>

<style>
</style>
