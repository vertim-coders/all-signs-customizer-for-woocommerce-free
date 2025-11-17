<template>
    <div class="asowp-sticky asowp-top-[80px] asowp-z-[999] asowp-shadow-md asowp-h-[50px] asowp-translate-y-2">
        <div class="asowp-bg-white asowp-justify-center asowp-items-center asowp-flex asowp-h-full">
            <div class="">
                <button @click="router.push('/configs/'+config.replace(/-/,' ')+'/'+configID+'/settings/generals')" :class="`asowp-flex asowp-w-fit asowp-h-fit asowp-p-3.5 asowp-bg-transparent asowp-space-x-2 asowp-px-6 asowp-text-black ${route.name == 'config-settings-generals' ? 'asowp-border-b-[2px] asowp-border-r-0 asowp-border-l-0 asowp-border-t-0 asowp-border-solid asowp-border-b-[#016464] asowp-text-[#016464] asowp-bg-[#F9F9F9]' : 'asowp-border-none'} hover:asowp-border-b-[2px] hover:asowp-border-r-0 hover:asowp-border-l-0 hover:asowp-border-t-0 hover:asowp-border-solid hover:asowp-border-b-[#016464] hover:asowp-bg-[#F9F9F9] hover:asowp-text-[#016464] asowp-cursor-pointer`">
                    <svg class="asowp-w-5 asowp-h-5 asowp-translate-y-0.5" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16.9583 13.0417C16.9583 12.8675 16.9333 12.7092 16.9083 12.5429L17.6083 11.965C17.7583 11.8383 17.7917 11.6325 17.6917 11.4662L17.2 10.6587C17.1529 10.5792 17.0777 10.5181 16.9877 10.4863C16.8977 10.4544 16.7987 10.4538 16.7083 10.4846L15.825 10.7696C15.5583 10.5558 15.2583 10.3896 14.925 10.2708L14.7417 9.40792C14.722 9.31871 14.6708 9.23861 14.5964 9.18098C14.5221 9.12334 14.4293 9.09167 14.3333 9.09125H13.35C13.15 9.09125 12.9833 9.22583 12.9417 9.40792L12.7583 10.2708C12.425 10.3896 12.125 10.5558 11.8583 10.7696L10.975 10.4846C10.8845 10.4551 10.786 10.4563 10.6963 10.488C10.6067 10.5198 10.5314 10.5801 10.4833 10.6587L9.99167 11.4662C9.89167 11.6325 9.925 11.8383 10.075 11.965L10.775 12.5429C10.75 12.7092 10.725 12.8675 10.725 13.0417C10.725 13.2158 10.75 13.3742 10.775 13.5404L10.075 14.1183C9.925 14.245 9.89167 14.4508 9.99167 14.6171L10.4833 15.4246C10.5833 15.5908 10.7917 15.6621 10.975 15.5987L11.8583 15.3137C12.125 15.5275 12.425 15.6937 12.7583 15.8125L12.9417 16.6754C12.9833 16.8575 13.15 16.9921 13.35 16.9921H14.3333C14.5333 16.9921 14.7 16.8575 14.7417 16.6754L14.925 15.8125C15.2583 15.6937 15.5583 15.5275 15.825 15.3137L16.7083 15.5987C16.9 15.6621 17.1 15.5829 17.2 15.4246L17.6917 14.6171C17.7917 14.4508 17.7583 14.245 17.6083 14.1183L16.9083 13.5404C16.9333 13.3742 16.9583 13.2158 16.9583 13.0417ZM13.8333 14.625C12.9167 14.625 12.1667 13.9125 12.1667 13.0417C12.1667 12.1708 12.9167 11.4583 13.8333 11.4583C14.75 11.4583 15.5 12.1708 15.5 13.0417C15.5 13.9125 14.75 14.625 13.8333 14.625ZM8 3.54167C7.54167 3.54167 7.16667 3.89792 7.16667 4.33333V7.5C7.16667 7.71375 7.25833 7.91167 7.40833 8.06208L9.13333 9.70083L10 8.28375L8.83333 7.17542V4.33333C8.83333 3.89792 8.45833 3.54167 8 3.54167ZM1.55 8.29167C1.00833 8.29167 0.6 8.77458 0.733333 9.27333C1.56667 12.3529 4.5 14.625 8 14.625H8.05833L7.05 12.9704C5.93235 12.7935 4.89297 12.3117 4.05848 11.5836C3.22398 10.8555 2.63039 9.9125 2.35 8.86958C2.30409 8.70203 2.20027 8.55399 2.0552 8.44919C1.91014 8.34439 1.73222 8.28892 1.55 8.29167ZM1.33333 5.91667C0.875 5.91667 0.5 5.56042 0.5 5.125V1.95833C0.5 1.52292 0.875 1.16667 1.33333 1.16667C1.79167 1.16667 2.16667 1.52292 2.16667 1.95833V3.035C3.54167 1.42 5.64167 0.375 8 0.375C9.98912 0.375 11.8968 1.12567 13.3033 2.46186C14.7098 3.79806 15.5 5.61033 15.5 7.5H13.8333C13.8333 4.44417 11.2167 1.95833 8 1.95833C7.06042 1.95958 6.13501 2.17612 5.3023 2.58957C4.46959 3.00302 3.75415 3.60119 3.21667 4.33333H4.66667C5.125 4.33333 5.5 4.68958 5.5 5.125C5.5 5.56042 5.125 5.91667 4.66667 5.91667H1.33333Z" fill="currentColor"/>
                    </svg>
                    <div class="asowp-text-[15px]">
                        General
                    </div>
                </button>
            </div>
            <div class="">
                <button @click="router.push('/configs/'+config.replace(/-/,' ')+'/'+configID+'/settings/customizer-options')" :class="`asowp-flex asowp-w-fit asowp-h-fit asowp-p-3.5 asowp-bg-transparent asowp-space-x-2 asowp-px-6 asowp-text-black ${route.name == 'config-settings-customizer-options' ? 'asowp-border-b-[2px] asowp-border-r-0 asowp-border-l-0 asowp-border-t-0 asowp-border-solid asowp-border-b-[#016464] asowp-text-[#016464] asowp-bg-[#F9F9F9]' : 'asowp-border-none'} hover:asowp-border-b-[2px] hover:asowp-border-r-0 hover:asowp-border-l-0 hover:asowp-border-t-0 hover:asowp-border-solid hover:asowp-border-b-[#016464] hover:asowp-bg-[#F9F9F9] hover:asowp-text-[#016464] asowp-cursor-pointer`">
                    <svg class="asowp-w-5 asowp-h-5 asowp-translate-y-0.5" viewBox="0 0 40 40" fill="black" xmlns="http://www.w3.org/2000/svg">
                        <g id="zondicons:border-all">
                        <path id="Vector" d="M22 22V34H34V22H22ZM22 18H34V6H22V18ZM18 22H6V34H18V22ZM18 18V6H6V18H18ZM2 36V2H38V38H2V36Z" fill="currentColor"/>
                        </g>
                    </svg>
                    <div class="asowp-text-[15px]">
                        Customizer sign
                    </div>
                </button>
            </div>
            <div class="">
                <button @click="goToLanguageImage" :class="`asowp-flex asowp-w-fit asowp-h-fit asowp-p-3.5 asowp-bg-transparent asowp-space-x-2 asowp-px-6 asowp-text-black ${route.name == 'config-settings-languages-images' ? 'asowp-border-b-[2px] asowp-border-r-0 asowp-border-l-0 asowp-border-t-0 asowp-border-solid asowp-border-b-[#016464] asowp-text-[#016464] asowp-bg-[#F9F9F9]' : 'asowp-border-none'} hover:asowp-border-b-[2px] hover:asowp-border-r-0 hover:asowp-border-l-0 hover:asowp-border-t-0 hover:asowp-border-solid hover:asowp-border-b-[#016464] hover:asowp-bg-[#F9F9F9] hover:asowp-text-[#016464] asowp-cursor-pointer`">
                    <svg class="asowp-w-5 asowp-h-5" viewBox="0 0 46 47" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="clarity:text-line" clip-path="url(#clip0_457_214)">
                        <path id="Vector" d="M15.5757 11.5411C15.453 11.1569 15.2131 10.8229 14.8912 10.588C14.5693 10.3531 14.1823 10.2296 13.7868 10.2356H13.6335C13.2341 10.226 12.8422 10.3477 12.5156 10.5827C12.189 10.8177 11.9448 11.1537 11.819 11.5411L1.45625 34.6756C1.33756 34.9142 1.27624 35.1782 1.27736 35.4458C1.27736 35.7921 1.41198 36.1242 1.65161 36.369C1.89124 36.6138 2.21625 36.7514 2.55514 36.7514C2.85996 36.7559 3.15822 36.6608 3.40645 36.4799C3.65467 36.2991 3.8399 36.042 3.93514 35.7461L6.59291 29.6753H20.6485L23.3062 35.6678C23.411 35.9742 23.6035 36.2413 23.8587 36.4345C24.1139 36.6278 24.42 36.7381 24.7374 36.7514C25.1034 36.7514 25.4544 36.6028 25.7132 36.3384C25.972 36.074 26.1174 35.7154 26.1174 35.3414C26.102 35.0844 26.0414 34.8323 25.9385 34.5972L15.5757 11.5411ZM7.76847 27.0381L13.6335 13.6953L19.5112 27.0381H7.76847Z" fill="currentColor"/>
                        <path id="Vector_2" d="M41.1964 19.2961C40.3913 18.568 39.4525 18.0108 38.4346 17.6566C37.4168 17.3025 36.3403 17.1586 35.2676 17.2333C33.1975 17.226 31.1498 17.6711 29.262 18.5389C29.0441 18.6419 28.859 18.8055 28.7279 19.011C28.5969 19.2165 28.5251 19.4556 28.5209 19.7008C28.5451 20.0156 28.6801 20.3107 28.901 20.5315C29.1218 20.7524 29.4135 20.884 29.722 20.9019C29.8926 20.895 30.0609 20.8597 30.2203 20.7975C31.7112 20.0976 33.333 19.7368 34.9737 19.74C38.4237 19.74 40.4426 21.4764 40.4426 24.8578V25.5105C38.6082 24.9643 36.7054 24.696 34.7948 24.7142C30.1437 24.7142 26.9492 26.8161 26.9492 30.7719V30.8372C26.9492 34.6886 30.3992 36.6861 33.8109 36.6861C35.0886 36.7241 36.3568 36.4502 37.5102 35.8871C38.6635 35.324 39.6688 34.488 40.4426 33.4483V35.1194C40.4426 35.4657 40.5772 35.7978 40.8168 36.0426C41.0564 36.2874 41.3814 36.425 41.7203 36.425C41.8948 36.4253 42.0674 36.3891 42.2277 36.3187C42.3879 36.2482 42.5324 36.145 42.6521 36.0153C42.7718 35.8857 42.8643 35.7324 42.9238 35.5648C42.9833 35.3973 43.0086 35.219 42.9981 35.0411V24.8055C43.074 23.8108 42.9536 22.8105 42.6441 21.8641C42.3346 20.9178 41.8423 20.0445 41.1964 19.2961ZM40.4809 29.3489C40.4809 32.3255 37.7081 34.4275 34.3348 34.4275C31.8559 34.4275 29.722 33.0436 29.722 30.6936V30.6153C29.722 28.2653 31.6387 26.6986 35.0887 26.6986C36.9138 26.7039 38.729 26.972 40.4809 27.495V29.3489Z" fill="currentColor"/>
                        </g>
                        <defs>
                        <clipPath id="clip0_457_214">
                        <rect width="46" height="47" fill="white"/>
                        </clipPath>
                        </defs>
                    </svg>

                    <div class="asowp-text-[15px]">
                        Language & image
                    </div>
                </button>
            </div>
            <div class="">
                <button @click="router.push('/configs/'+config.replace(/-/,' ')+'/'+configID+'/settings/themes-colors')" :class="`asowp-flex asowp-w-fit asowp-h-fit asowp-p-3.5 asowp-bg-transparent asowp-space-x-2 asowp-px-6 asowp-text-black ${route.name == 'config-settings-themes-colors' ? 'asowp-border-b-[2px] asowp-border-r-0 asowp-border-l-0 asowp-border-t-0 asowp-border-solid asowp-border-b-[#016464] asowp-text-[#016464] asowp-bg-[#F9F9F9]' : 'asowp-border-none'} hover:asowp-border-b-[2px] hover:asowp-border-r-0 hover:asowp-border-l-0 hover:asowp-border-t-0 hover:asowp-border-solid hover:asowp-border-b-[#016464] hover:asowp-bg-[#F9F9F9] hover:asowp-text-[#016464] asowp-cursor-pointer`">
                    <svg class="asowp-w-5 asowp-h-5" viewBox="0 0 40 41" fill="black" xmlns="http://www.w3.org/2000/svg">
                        <g id="tdesign:fill-color-1">
                        <path id="Vector" d="M20.0004 0.0888367L39.9137 20.5L36.6671 23.8278V23.9167H36.5804L24.7137 36.08C23.4635 37.3611 21.7682 38.0807 20.0004 38.0807C18.2326 38.0807 16.5373 37.3611 15.2871 36.08L4.8004 25.3329C4.18131 24.6983 3.69021 23.945 3.35516 23.1159C3.02011 22.2869 2.84766 21.3983 2.84766 20.5009C2.84766 19.6035 3.02011 18.7149 3.35516 17.8858C3.69021 17.0567 4.18131 16.3034 4.8004 15.6688L12.1971 8.08554L7.64373 3.41667L10.0004 1.00109L14.5554 5.66996L20.0004 0.0888367ZM14.5554 10.5028L7.15873 18.0844C6.50873 18.7507 6.18207 19.6253 6.18207 20.5H35.1987L20.0004 4.92L16.9137 8.08554L22.3571 13.6667L20.0004 16.0823L14.5554 10.5028ZM8.13373 23.9167L17.6437 33.6644C18.2688 34.3049 19.1165 34.6648 20.0004 34.6648C20.8843 34.6648 21.732 34.3049 22.3571 33.6644L31.8671 23.9167H8.13373ZM36.2504 31.4145L38.4404 34.2504C39.4087 35.5043 39.4087 37.4074 38.4404 38.6596C38.1824 39.0048 37.8511 39.2852 37.4717 39.4797C37.0922 39.6741 36.6746 39.7775 36.2504 39.782C35.3671 39.782 34.5837 39.3378 34.0604 38.6596C33.0921 37.4074 33.0921 35.5043 34.0604 34.2504L36.2504 31.4145Z" fill="currentColor"/>
                        </g>
                    </svg>
                    <div class="asowp-text-[15px]">
                        Themes colors
                    </div>
                </button>
            </div>
        </div>
    </div>
    <div>
        <Generals v-if="$route.name == 'config-settings-generals'"/>
        <CustomizerOptions v-if="$route.name == 'config-settings-customizer-options'"/>
        <LanguageImages v-if="$route.name == 'config-settings-languages-images'"/>
        <ThemesColors v-if="$route.name == 'config-settings-themes-colors'"/>
    </div>
</template>
<script setup>
import Generals from './generals/index.vue'
import CustomizerOptions from './customizer-signs/index.vue'
import LanguageImages from './language-image/index.vue'
import ThemesColors from './themes-color/index.vue'
import { useRoute } from 'vue-router';
import router from '@/admin/router';

const route = useRoute()
const configID = route.params.configId;
const config = route.params.config;
const goToLanguageImage = (c)=>{
    router.push('/configs/'+config.replace(/-/,' ')+'/'+configID+'/settings/language-images')
    .then(() => {
      window.location.reload()
    })
}
</script>
<style>
    
</style>