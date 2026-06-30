<template>
    <div v-if="showHeaderbar" class="ascwo-fixed ascwo-z-[9999] ascwo-rounded-[10px] ascwo-border-[2px] ascwo-border-[rgba(0,0,0,.15)] ascwo-border-solid ascwo-top-[32px] ascwo-h-[2.9rem] ascwo-px-2 ascwo-bg-white ascwo-flex ascwo-justify-start ascwo-items-center ascwo-header ascwo-mt-2" style="width: 84.5% !important;">
        <div class="ascwo-relative ascwo-flex ascwo-justify-between ascwo-items-center ascwo-w-full">
            <div class="pl-[40px] ascwo-flex ascwo-w-full ascwo-cursor-pointer" @click="goToHome">
                <!--<span>
                    <img class="ascwo-w-[110px]" src="../../../../assets/images/im_ascwo-icon2.png" alt="">
                </span>-->
                <div class="ascwo-mr-[10px]">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" style="width: 1.2rem; height: 1.2rem;">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"></path>
                    </svg>
                </div>
                <div  v-if="config.trim() != ''" class="ascwo-font-bold ascwo-text-[16px]">
                    {{config}}
                </div>
            </div>
            <div class=" ascwo-flex ascwo-justify-center ascwo-items-center ascwo-w-full">
                <div class="ascwo-w-full ascwo-justify-end ascwo-flex ascwo-items-center">
                    <div class="ascwo-flex ascwo-items-center ascwo-justify-center ascwo-space-x-2">
                        <span class="ascwo-p-2 ascwo-border-2 ascwo-text-[#466801] ascwo-bg-[#FFFFFF] ascwo-rounded ascwo-border-[#466801] ascwo-border ascwo-border-solid" v-if="($route.path.includes('configs') &&( $route.path.includes('materials') ||  $route.path.includes('settings') || $route.path.includes('additional-options'))) || $route.name == 'preview-back'">{{ $router.currentRoute.value.params.configId }} {{ __('ID', 'all-signs-customizer-for-woocommerce-pro') }}</span>
                        <button @click="goToSettings" v-if="isLegacyConfigWorkspace || $route.name == 'preview-back'" class="ascwo-p-2 ascwo-border-2 ascwo-border-solid ascwo-border-[#016464] ascwo-text-[#016464] ascwo-rounded ascwo-cursor-pointer">
                            <svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg" class="ascwo-w-3 ascwo-h-3">
                                <path d="M16.9583 13.0417C16.9583 12.8675 16.9333 12.7092 16.9083 12.5429L17.6083 11.965C17.7583 11.8383 17.7917 11.6325 17.6917 11.4662L17.2 10.6587C17.1529 10.5792 17.0777 10.5181 16.9877 10.4863C16.8977 10.4544 16.7987 10.4538 16.7083 10.4846L15.825 10.7696C15.5583 10.5558 15.2583 10.3896 14.925 10.2708L14.7417 9.40792C14.722 9.31871 14.6708 9.23861 14.5964 9.18098C14.5221 9.12334 14.4293 9.09167 14.3333 9.09125H13.35C13.15 9.09125 12.9833 9.22583 12.9417 9.40792L12.7583 10.2708C12.425 10.3896 12.125 10.5558 11.8583 10.7696L10.975 10.4846C10.8845 10.4551 10.786 10.4563 10.6963 10.488C10.6067 10.5198 10.5314 10.5801 10.4833 10.6587L9.99167 11.4662C9.89167 11.6325 9.925 11.8383 10.075 11.965L10.775 12.5429C10.75 12.7092 10.725 12.8675 10.725 13.0417C10.725 13.2158 10.75 13.3742 10.775 13.5404L10.075 14.1183C9.925 14.245 9.89167 14.4508 9.99167 14.6171L10.4833 15.4246C10.5833 15.5908 10.7917 15.6621 10.975 15.5987L11.8583 15.3137C12.125 15.5275 12.425 15.6937 12.7583 15.8125L12.9417 16.6754C12.9833 16.8575 13.15 16.9921 13.35 16.9921H14.3333C14.5333 16.9921 14.7 16.8575 14.7417 16.6754L14.925 15.8125C15.2583 15.6937 15.5583 15.5275 15.825 15.3137L16.7083 15.5987C16.9 15.6621 17.1 15.5829 17.2 15.4246L17.6917 14.6171C17.7917 14.4508 17.7583 14.245 17.6083 14.1183L16.9083 13.5404C16.9333 13.3742 16.9583 13.2158 16.9583 13.0417ZM13.8333 14.625C12.9167 14.625 12.1667 13.9125 12.1667 13.0417C12.1667 12.1708 12.9167 11.4583 13.8333 11.4583C14.75 11.4583 15.5 12.1708 15.5 13.0417C15.5 13.9125 14.75 14.625 13.8333 14.625ZM8 3.54167C7.54167 3.54167 7.16667 3.89792 7.16667 4.33333V7.5C7.16667 7.71375 7.25833 7.91167 7.40833 8.06208L9.13333 9.70083L10 8.28375L8.83333 7.17542V4.33333C8.83333 3.89792 8.45833 3.54167 8 3.54167ZM1.55 8.29167C1.00833 8.29167 0.6 8.77458 0.733333 9.27333C1.56667 12.3529 4.5 14.625 8 14.625H8.05833L7.05 12.9704C5.93235 12.7935 4.89297 12.3117 4.05848 11.5836C3.22398 10.8555 2.63039 9.9125 2.35 8.86958C2.30409 8.70203 2.20027 8.55399 2.0552 8.44919C1.91014 8.34439 1.73222 8.28892 1.55 8.29167ZM1.33333 5.91667C0.875 5.91667 0.5 5.56042 0.5 5.125V1.95833C0.5 1.52292 0.875 1.16667 1.33333 1.16667C1.79167 1.16667 2.16667 1.52292 2.16667 1.95833V3.035C3.54167 1.42 5.64167 0.375 8 0.375C9.98912 0.375 11.8968 1.12567 13.3033 2.46186C14.7098 3.79806 15.5 5.61033 15.5 7.5H13.8333C13.8333 4.44417 11.2167 1.95833 8 1.95833C7.06042 1.95958 6.13501 2.17612 5.3023 2.58957C4.46959 3.00302 3.75415 3.60119 3.21667 4.33333H4.66667C5.125 4.33333 5.5 4.68958 5.5 5.125C5.5 5.56042 5.125 5.91667 4.66667 5.91667H1.33333Z" fill="currentColor"/>
                            </svg>
                            {{ labels.settings }}
                        </button>
                        <button @click="goToAdditionalOptions" v-if="isLegacyConfigWorkspace || $route.name == 'preview-back'" class="ascwo-p-2 ascwo-border-2 ascwo-border-solid ascwo-border-[#f0bb1d] ascwo-text-[#f0bb1d] ascwo-rounded ascwo-cursor-pointer">
                            <svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg" class="ascwo-w-3 ascwo-h-3">
                                <path d="M16.9583 13.0417C16.9583 12.8675 16.9333 12.7092 16.9083 12.5429L17.6083 11.965C17.7583 11.8383 17.7917 11.6325 17.6917 11.4662L17.2 10.6587C17.1529 10.5792 17.0777 10.5181 16.9877 10.4863C16.8977 10.4544 16.7987 10.4538 16.7083 10.4846L15.825 10.7696C15.5583 10.5558 15.2583 10.3896 14.925 10.2708L14.7417 9.40792C14.722 9.31871 14.6708 9.23861 14.5964 9.18098C14.5221 9.12334 14.4293 9.09167 14.3333 9.09125H13.35C13.15 9.09125 12.9833 9.22583 12.9417 9.40792L12.7583 10.2708C12.425 10.3896 12.125 10.5558 11.8583 10.7696L10.975 10.4846C10.8845 10.4551 10.786 10.4563 10.6963 10.488C10.6067 10.5198 10.5314 10.5801 10.4833 10.6587L9.99167 11.4662C9.89167 11.6325 9.925 11.8383 10.075 11.965L10.775 12.5429C10.75 12.7092 10.725 12.8675 10.725 13.0417C10.725 13.2158 10.75 13.3742 10.775 13.5404L10.075 14.1183C9.925 14.245 9.89167 14.4508 9.99167 14.6171L10.4833 15.4246C10.5833 15.5908 10.7917 15.6621 10.975 15.5987L11.8583 15.3137C12.125 15.5275 12.425 15.6937 12.7583 15.8125L12.9417 16.6754C12.9833 16.8575 13.15 16.9921 13.35 16.9921H14.3333C14.5333 16.9921 14.7 16.8575 14.7417 16.6754L14.925 15.8125C15.2583 15.6937 15.5583 15.5275 15.825 15.3137L16.7083 15.5987C16.9 15.6621 17.1 15.5829 17.2 15.4246L17.6917 14.6171C17.7917 14.4508 17.7583 14.245 17.6083 14.1183L16.9083 13.5404C16.9333 13.3742 16.9583 13.2158 16.9583 13.0417ZM13.8333 14.625C12.9167 14.625 12.1667 13.9125 12.1667 13.0417C12.1667 12.1708 12.9167 11.4583 13.8333 11.4583C14.75 11.4583 15.5 12.1708 15.5 13.0417C15.5 13.9125 14.75 14.625 13.8333 14.625ZM8 3.54167C7.54167 3.54167 7.16667 3.89792 7.16667 4.33333V7.5C7.16667 7.71375 7.25833 7.91167 7.40833 8.06208L9.13333 9.70083L10 8.28375L8.83333 7.17542V4.33333C8.83333 3.89792 8.45833 3.54167 8 3.54167ZM1.55 8.29167C1.00833 8.29167 0.6 8.77458 0.733333 9.27333C1.56667 12.3529 4.5 14.625 8 14.625H8.05833L7.05 12.9704C5.93235 12.7935 4.89297 12.3117 4.05848 11.5836C3.22398 10.8555 2.63039 9.9125 2.35 8.86958C2.30409 8.70203 2.20027 8.55399 2.0552 8.44919C1.91014 8.34439 1.73222 8.28892 1.55 8.29167ZM1.33333 5.91667C0.875 5.91667 0.5 5.56042 0.5 5.125V1.95833C0.5 1.52292 0.875 1.16667 1.33333 1.16667C1.79167 1.16667 2.16667 1.52292 2.16667 1.95833V3.035C3.54167 1.42 5.64167 0.375 8 0.375C9.98912 0.375 11.8968 1.12567 13.3033 2.46186C14.7098 3.79806 15.5 5.61033 15.5 7.5H13.8333C13.8333 4.44417 11.2167 1.95833 8 1.95833C7.06042 1.95958 6.13501 2.17612 5.3023 2.58957C4.46959 3.00302 3.75415 3.60119 3.21667 4.33333H4.66667C5.125 4.33333 5.5 4.68958 5.5 5.125C5.5 5.56042 5.125 5.91667 4.66667 5.91667H1.33333Z" fill="currentColor"/>
                            </svg>
                            {{ labels.additionalOptions }}
                        </button>
                        <button @click="goToMaterials" v-if="isLegacyConfigWorkspace || $route.name == 'preview-back'" class="ascwo-p-2 ascwo-border-2 ascwo-border-solid ascwo-border-[#EF5A35] ascwo-text-[#EF5A35] ascwo-rounded ascwo-bg-[#F8E7E7] ascwo-cursor-pointer">
                            <svg width="21" height="19" viewBox="0 0 21 19" fill="none" xmlns="http://www.w3.org/2000/svg" class="ascwo-w-3 ascwo-h-3">
                                <path d="M1.6851 16.9L2.96826 17.46V8.43L0.641333 14.29C0.248724 15.31 0.698788 16.48 1.6851 16.9ZM20.3579 13.2L15.6083 1.25C15.468 0.887546 15.2291 0.575978 14.9211 0.353818C14.613 0.131658 14.2494 0.00864917 13.8751 0C13.6261 0 13.3676 0.0400001 13.1186 0.15L6.06125 3.2C5.72062 3.35096 5.42861 3.60077 5.21984 3.91982C5.01107 4.23886 4.89432 4.61375 4.88342 5C4.87384 5.25 4.92172 5.54 5.00791 5.8L9.79582 17.75C10.0735 18.53 10.7821 18.99 11.529 19C11.778 19 12.027 18.95 12.2664 18.85L19.3142 15.8C19.7827 15.5997 20.1558 15.2132 20.3515 14.7257C20.5472 14.2381 20.5496 13.6893 20.3579 13.2ZM6.80816 6C6.55419 6 6.31063 5.89464 6.13105 5.70711C5.95147 5.51957 5.85058 5.26522 5.85058 5C5.85058 4.73478 5.95147 4.48043 6.13105 4.29289C6.31063 4.10536 6.55419 4 6.80816 4C7.33483 4 7.76574 4.45 7.76574 5C7.76574 5.55 7.33483 6 6.80816 6ZM4.893 17C4.893 17.5304 5.09477 18.0391 5.45393 18.4142C5.8131 18.7893 6.30023 19 6.80816 19H8.19665L4.893 10.66V17Z" fill="currentColor"/>
                            </svg>
                            {{ labels.material }}
                        </button>
                        <button @click="goToPreview" v-if="$route.path.includes('configs') && $route.name  != 'preview-back'" class="ascwo-p-2 ascwo-border-none ascwo-bg-[#016464] ascwo-text-[#fff] ascwo-rounded-[5px] ascwo-cursor-pointer">
                            {{ labels.preview }}
                        </button>
                    </div>

                </div>
            </div>
            <!--<div class="ascwo-pr-[40px]">
                <span class="ascwo-text-[20px] ascwo-font-bold">
                    V{{ ASCWO_VERSION }}
                </span>
            </div>-->
        </div>
    </div>
</template>
<script setup>
import router from '@/admin/router';
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import { __ } from "@wordpress/i18n";
const ASCWO_VERSION = ref(ascwo_data.version);
const currentConfigId = computed(() => router.currentRoute.value.params.configId);
const goToPreview = ()=>{
    window.location.assign(`${window.location.pathname}?page=ascwo#/configuration/${currentConfigId.value}/preview`)
}
const goToSettings = ()=>{
    router.push(`/configuration/${currentConfigId.value}/settings/general`)
}
const goToAdditionalOptions = ()=>{
    router.push(`/configuration/${currentConfigId.value}/additional-options/inputs`)
}
const goToMaterials = ()=>{
    router.push(`/configuration/${currentConfigId.value}/required-options/materials`)
    .then(() => {
      window.location.reload()
    })
}
function goToHome() {
  router.push('/configuration')
}
//const configID = ref(route.params.configId)
const route = useRoute()



const showHeaderbar = computed(() => {
  const isConfigWorkspace = route.path.includes('/configs/') || route.path.includes('/configuration/');
  return !isConfigWorkspace;
});
const isLegacyConfigWorkspace = computed(() => route.path.includes('/configs/'));

const config = route.params.config ? route.params.config.replace(/-/,' ') : '';
const labels = {
  settings: __('Settings', "all-signs-customizer-for-woocommerce-pro"),
  additionalOptions: __('Additional Options', "all-signs-customizer-for-woocommerce-pro"),
  material: __('Material', "all-signs-customizer-for-woocommerce-pro"),
  preview: __('Preview', "all-signs-customizer-for-woocommerce-pro"),
};
</script>
<style lang="">

</style>
