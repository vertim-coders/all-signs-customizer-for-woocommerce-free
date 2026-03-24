<template>
    <router-view v-if="activateProduct && frontendReady"/>
</template>

<script setup>
import {onMounted, ref} from 'vue';
const activateProduct = ref(!isNaN(asowp_data.caches) && parseInt(asowp_data.caches) > 1704067200? true : false);
const frontendReady = ref(false);
const currentPage = window.asowp_data?.page || '';

onMounted(async() => {
    await loadFrontendDependencies();
    frontendReady.value = true;
});

const loadFrontendDependencies = async () => {
    await import('@/frontend/utils/tailwindcss.min.js');

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

    if (currentPage === 'configurator') {
        await Promise.all([
            import('../../assets/utilities/fabric.min.js'),
            import('../../assets/utilities/hammerjs.js'),
        ]);
    }
};
</script>

<style>
</style>
