<template>
    <div class="aso-space-y-1">
        <div class="aso-bg-[#F8F9FB] aso-px-4 aso-py-4">
            <div class="aso-text-[16px] aso-font-bold">
                General settings
            </div>
        </div>
        
        <div class="aso-bg-white aso-space-x-6 aso-justify-center aso-items-center aso-flex">
            <div class="">
                <button @click="$router.push('/global-settings/licences')" :class="`aso-flex aso-w-fit aso-h-fit aso-p-4 aso-bg-transparent aso-space-x-2 aso-text-black ${route.name == 'global-settings-licences' ? 'aso-border-b-[3px] aso-border-r-0 aso-border-l-0 aso-border-t-0 aso-border-solid aso-border-b-[#016464] aso-text-[#016464] aso-bg-[#F9F9F9]' : 'aso-border-none'} hover:aso-border-b-[2px] hover:aso-border-r-0 hover:aso-border-l-0 hover:aso-border-t-0 hover:aso-border-solid hover:aso-border-b-[#016464] hover:aso-bg-[#F9F9F9] hover:aso-text-[#016464] aso-cursor-pointer`">
                    <svg class="aso-w-5 aso-h-5 aso-translate-y-0.5" viewBox="0 0 14 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 9C6.436 9 5.96167 8.80767 5.577 8.423C5.19233 8.03833 5 7.564 5 7C5 6.436 5.19233 5.96167 5.577 5.577C5.96167 5.19233 6.436 5 7 5C7.564 5 8.03833 5.19233 8.423 5.577C8.80767 5.96167 9 6.436 9 7C9 7.564 8.80767 8.03833 8.423 8.423C8.03833 8.80767 7.564 9 7 9ZM7 16.962L3.037 18.146C2.78033 18.2373 2.54333 18.2007 2.326 18.036C2.10867 17.87 2 17.6493 2 17.374V11.87C1.36667 11.2473 0.875 10.5167 0.525 9.678C0.175 8.83933 0 7.94667 0 7C0 5.046 0.677667 3.39067 2.033 2.034C3.389 0.678 5.04367 0 6.997 0C8.95033 0 10.6057 0.678 11.963 2.034C13.321 3.39133 14 5.04667 14 7C14 7.94667 13.825 8.83967 13.475 9.679C13.125 10.5177 12.6333 11.248 12 11.87V17.374C12 17.6493 11.8913 17.8693 11.674 18.034C11.4567 18.1993 11.22 18.2363 10.964 18.145L7 16.962ZM7 13C8.66667 13 10.0833 12.4167 11.25 11.25C12.4167 10.0833 13 8.66667 13 7C13 5.33333 12.4167 3.91667 11.25 2.75C10.0833 1.58333 8.66667 1 7 1C5.33333 1 3.91667 1.58333 2.75 2.75C1.58333 3.91667 1 5.33333 1 7C1 8.66667 1.58333 10.0833 2.75 11.25C3.91667 12.4167 5.33333 13 7 13Z" fill="currentColor"/>
                    </svg>
                    <div class="aso-text-[16px]">
                        Licences
                    </div>
                </button>
            </div>
            <div class="">
                <button @click="$router.push('/global-settings/configuration-page')" :class="`aso-flex aso-w-fit aso-h-fit aso-p-4 aso-bg-transparent aso-space-x-2 aso-text-black ${route.name == 'global-settings-configuration-page' ? 'aso-border-b-[3px] aso-border-r-0 aso-border-l-0 aso-border-t-0 aso-border-solid aso-border-b-[#016464] aso-text-[#016464] aso-bg-[#F9F9F9]' : 'aso-border-none'} hover:aso-border-b-[2px] hover:aso-border-r-0 hover:aso-border-l-0 hover:aso-border-t-0 hover:aso-border-solid hover:aso-border-b-[#016464] hover:aso-bg-[#F9F9F9] hover:aso-text-[#016464] aso-cursor-pointer`">
                    <svg class="aso-w-5 aso-h-5 aso-translate-y-0.5" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16.9583 13.0417C16.9583 12.8675 16.9333 12.7092 16.9083 12.5429L17.6083 11.965C17.7583 11.8383 17.7917 11.6325 17.6917 11.4662L17.2 10.6587C17.1529 10.5792 17.0777 10.5181 16.9877 10.4863C16.8977 10.4544 16.7987 10.4538 16.7083 10.4846L15.825 10.7696C15.5583 10.5558 15.2583 10.3896 14.925 10.2708L14.7417 9.40792C14.722 9.31871 14.6708 9.23861 14.5964 9.18098C14.5221 9.12334 14.4293 9.09167 14.3333 9.09125H13.35C13.15 9.09125 12.9833 9.22583 12.9417 9.40792L12.7583 10.2708C12.425 10.3896 12.125 10.5558 11.8583 10.7696L10.975 10.4846C10.8845 10.4551 10.786 10.4563 10.6963 10.488C10.6067 10.5198 10.5314 10.5801 10.4833 10.6587L9.99167 11.4662C9.89167 11.6325 9.925 11.8383 10.075 11.965L10.775 12.5429C10.75 12.7092 10.725 12.8675 10.725 13.0417C10.725 13.2158 10.75 13.3742 10.775 13.5404L10.075 14.1183C9.925 14.245 9.89167 14.4508 9.99167 14.6171L10.4833 15.4246C10.5833 15.5908 10.7917 15.6621 10.975 15.5987L11.8583 15.3137C12.125 15.5275 12.425 15.6937 12.7583 15.8125L12.9417 16.6754C12.9833 16.8575 13.15 16.9921 13.35 16.9921H14.3333C14.5333 16.9921 14.7 16.8575 14.7417 16.6754L14.925 15.8125C15.2583 15.6937 15.5583 15.5275 15.825 15.3137L16.7083 15.5987C16.9 15.6621 17.1 15.5829 17.2 15.4246L17.6917 14.6171C17.7917 14.4508 17.7583 14.245 17.6083 14.1183L16.9083 13.5404C16.9333 13.3742 16.9583 13.2158 16.9583 13.0417ZM13.8333 14.625C12.9167 14.625 12.1667 13.9125 12.1667 13.0417C12.1667 12.1708 12.9167 11.4583 13.8333 11.4583C14.75 11.4583 15.5 12.1708 15.5 13.0417C15.5 13.9125 14.75 14.625 13.8333 14.625ZM8 3.54167C7.54167 3.54167 7.16667 3.89792 7.16667 4.33333V7.5C7.16667 7.71375 7.25833 7.91167 7.40833 8.06208L9.13333 9.70083L10 8.28375L8.83333 7.17542V4.33333C8.83333 3.89792 8.45833 3.54167 8 3.54167ZM1.55 8.29167C1.00833 8.29167 0.6 8.77458 0.733333 9.27333C1.56667 12.3529 4.5 14.625 8 14.625H8.05833L7.05 12.9704C5.93235 12.7935 4.89297 12.3117 4.05848 11.5836C3.22398 10.8555 2.63039 9.9125 2.35 8.86958C2.30409 8.70203 2.20027 8.55399 2.0552 8.44919C1.91014 8.34439 1.73222 8.28892 1.55 8.29167ZM1.33333 5.91667C0.875 5.91667 0.5 5.56042 0.5 5.125V1.95833C0.5 1.52292 0.875 1.16667 1.33333 1.16667C1.79167 1.16667 2.16667 1.52292 2.16667 1.95833V3.035C3.54167 1.42 5.64167 0.375 8 0.375C9.98912 0.375 11.8968 1.12567 13.3033 2.46186C14.7098 3.79806 15.5 5.61033 15.5 7.5H13.8333C13.8333 4.44417 11.2167 1.95833 8 1.95833C7.06042 1.95958 6.13501 2.17612 5.3023 2.58957C4.46959 3.00302 3.75415 3.60119 3.21667 4.33333H4.66667C5.125 4.33333 5.5 4.68958 5.5 5.125C5.5 5.56042 5.125 5.91667 4.66667 5.91667H1.33333Z" fill="currentColor"/>
                    </svg>
                    <div class="aso-text-[16px]">
                        Configuration page
                    </div>
                </button>
            </div>
            <div class="">
                <button @click="$router.push('/global-settings/output')" :class="`aso-flex aso-w-fit aso-h-fit aso-p-4 aso-bg-transparent aso-space-x-2 aso-text-black ${route.name == 'global-settings-output' ? 'aso-border-b-[3px] aso-border-r-0 aso-border-l-0 aso-border-t-0 aso-border-solid aso-border-b-[#016464] aso-text-[#016464] aso-bg-[#F9F9F9]' : 'aso-border-none'} hover:aso-border-b-[2px] hover:aso-border-r-0 hover:aso-border-l-0 hover:aso-border-t-0 hover:aso-border-solid hover:aso-border-b-[#016464] hover:aso-bg-[#F9F9F9] hover:aso-text-[#016464] aso-cursor-pointer`">
                    <svg class="aso-w-5 aso-h-5" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.73414 19.3332C1.27414 19.3332 0.89014 19.1535 0.58214 18.7942C0.273474 18.4341 0.119141 17.9857 0.119141 17.449V2.55067C0.119141 2.014 0.273474 1.566 0.58214 1.20667C0.89014 0.846559 1.27414 0.666504 1.73414 0.666504H14.5041C14.9641 0.666504 15.3481 0.846559 15.6561 1.20667C15.9648 1.566 16.1191 2.014 16.1191 2.55067V4.1665H15.1191V2.55067C15.1191 2.37178 15.0551 2.20728 14.9271 2.05717C14.7985 1.90784 14.6575 1.83317 14.5041 1.83317H1.73414C1.58081 1.83317 1.43981 1.90784 1.31114 2.05717C1.18314 2.20728 1.11914 2.37178 1.11914 2.55067V17.449C1.11914 17.6279 1.18314 17.7924 1.31114 17.9425C1.43981 18.0918 1.58081 18.1665 1.73414 18.1665H14.5041C14.6575 18.1665 14.7985 18.0918 14.9271 17.9425C15.0551 17.7924 15.1191 17.6279 15.1191 17.449V15.8332H16.1191V17.449C16.1191 17.9857 15.9651 18.4337 15.6571 18.793C15.3485 19.1531 14.9641 19.3332 14.5041 19.3332H1.73414ZM12.8311 15.0025L12.1421 14.1998L15.1981 10.5832H5.50414V9.4165H15.1981L12.1421 5.79984L12.8311 4.99717L17.1191 9.99984L12.8311 15.0025Z" fill="currentColor"/>
                    </svg>
                    <div class="aso-text-[16px]">
                        Output
                    </div>
                </button>
            </div>
            <div class="">
                <button @click="$router.push('/global-settings/shapes')" :class="`aso-flex aso-w-fit aso-h-fit aso-p-4 aso-bg-transparent aso-space-x-2 aso-text-black ${route.name == 'global-settings-shapes' ? 'aso-border-b-[3px] aso-border-r-0 aso-border-l-0 aso-border-t-0 aso-border-solid aso-border-b-[#016464] aso-text-[#016464] aso-bg-[#F9F9F9]' : 'aso-border-none'} hover:aso-border-b-[2px] hover:aso-border-r-0 hover:aso-border-l-0 hover:aso-border-t-0 hover:aso-border-solid hover:aso-border-b-[#016464] hover:aso-bg-[#F9F9F9] hover:aso-text-[#016464] aso-cursor-pointer`">
                    <svg class="aso-w-5 aso-h-5" viewBox="0 0 40 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="mdi:shape">
                        <path id="Vector" d="M18.3333 23.0625V36.7292H5V23.0625H18.3333ZM20 3.41666L29.1667 18.7917H10.8333L20 3.41666ZM29.1667 22.2083C33.3333 22.2083 36.6667 25.625 36.6667 29.8958C36.6667 34.1667 33.3333 37.5833 29.1667 37.5833C25 37.5833 21.6667 34.1667 21.6667 29.8958C21.6667 25.625 25 22.2083 29.1667 22.2083Z" fill="currentColor"/>
                        </g>
                    </svg>
                    <div class="aso-text-[16px]">
                        Shapes
                    </div>
                </button>
            </div>
            <div class="">
                <button @click="$router.push('/global-settings/fixing-methods')" :class="`aso-flex aso-w-fit aso-h-fit aso-p-4 aso-bg-transparent aso-space-x-2 aso-text-black ${route.name == 'global-settings-fixing-methods' ? 'aso-border-b-[3px] aso-border-r-0 aso-border-l-0 aso-border-t-0 aso-border-solid aso-border-b-[#016464] aso-text-[#016464] aso-bg-[#F9F9F9]' : 'aso-border-none'} hover:aso-border-b-[2px] hover:aso-border-r-0 hover:aso-border-l-0 hover:aso-border-t-0 hover:aso-border-solid hover:aso-border-b-[#016464] hover:aso-bg-[#F9F9F9] hover:aso-text-[#016464] aso-cursor-pointer`">
                    <svg class="aso-w-5 aso-h-5" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="uil:screw">
                        <path id="Vector" d="M36.183 16.8667L23.133 3.81666C22.9138 3.59622 22.6374 3.44147 22.3349 3.36988C22.0324 3.29829 21.716 3.31272 21.4212 3.41153C21.1265 3.51035 20.8653 3.68962 20.6671 3.92908C20.4689 4.16855 20.3417 4.45867 20.2997 4.76666L19.083 13.3333L15.7497 16.6667L15.1997 16.35C14.8408 16.1755 14.4313 16.1356 14.0455 16.2374C13.6597 16.3393 13.3232 16.5762 13.0972 16.905C12.8713 17.2339 12.7708 17.6329 12.8141 18.0296C12.8573 18.4263 13.0415 18.7942 13.333 19.0667L11.4163 21.0167L10.8663 20.7C10.5084 20.5356 10.1038 20.5033 9.72429 20.6089C9.3448 20.7144 9.01495 20.9509 8.79324 21.2765C8.57153 21.6021 8.4723 21.9956 8.51314 22.3874C8.55398 22.7792 8.73225 23.1438 9.01634 23.4167L7.06634 25.35L6.53301 25C6.34278 24.8898 6.13264 24.8183 5.91468 24.7897C5.69671 24.761 5.47524 24.7758 5.263 24.8331C5.05077 24.8904 4.85197 24.9892 4.67806 25.1237C4.50415 25.2581 4.35856 25.4257 4.24967 25.6167C4.06145 25.9599 4.00005 26.3584 4.07623 26.7424C4.15242 27.1264 4.36133 27.4713 4.66634 27.7167L3.81634 28.5667C3.662 28.7231 3.5427 28.9106 3.46634 29.1167C3.38094 29.317 3.33564 29.5322 3.33301 29.75V35C3.33301 35.442 3.5086 35.8659 3.82116 36.1785C4.13372 36.4911 4.55765 36.6667 4.99967 36.6667H10.2163C10.4341 36.664 10.6493 36.6187 10.8497 36.5333C11.0557 36.457 11.2432 36.3377 11.3997 36.1833L14.233 33.3333L14.783 33.65C14.9722 33.7609 15.1815 33.8333 15.3988 33.8632C15.6161 33.893 15.8371 33.8797 16.0492 33.824C16.2613 33.7682 16.4604 33.6712 16.6349 33.5384C16.8095 33.4055 16.9561 33.2396 17.0663 33.05C17.2609 32.7069 17.3275 32.3059 17.2543 31.9184C17.181 31.5308 16.9727 31.1818 16.6663 30.9333L18.6163 29L19.1663 29.3167C19.4154 29.4578 19.6967 29.5325 19.983 29.5333C20.302 29.5046 20.606 29.3845 20.8586 29.1875C21.1111 28.9904 21.3016 28.7248 21.4071 28.4223C21.5126 28.1199 21.5287 27.7934 21.4535 27.4821C21.3783 27.1707 21.2149 26.8876 20.983 26.6667L22.933 24.7333L23.483 25.05C23.7321 25.1912 24.0134 25.2658 24.2997 25.2667C24.64 25.2606 24.9704 25.1504 25.2462 24.951C25.5221 24.7516 25.7303 24.4725 25.8429 24.1512C25.9554 23.83 25.9669 23.4819 25.8757 23.154C25.7846 22.826 25.5952 22.5338 25.333 22.3167L26.6497 21L35.233 19.7833C35.5415 19.7395 35.8315 19.6101 36.0701 19.4097C36.3087 19.2094 36.4864 18.9462 36.583 18.65C36.6973 18.3461 36.7203 18.0154 36.6492 17.6986C36.5782 17.3818 36.4161 17.0926 36.183 16.8667ZM9.53301 33.3333H6.66634V30.4667L7.61634 29.5167L11.2497 31.6667L9.53301 33.3333ZM13.683 29.1667L9.99967 27.0833L11.8997 25.1833L15.5163 27.2667L13.683 29.1667ZM18.033 24.8333L14.3997 22.7333L16.3163 20.8333L19.9997 22.9167L18.033 24.8333ZM22.383 20.4833L18.7497 18.3333L20.6497 16.4333L23.5163 19.3L22.383 20.4833ZM26.4663 17.5833L22.4163 13.5333L23.133 8.53333L31.4663 16.8667L26.4663 17.5833Z" fill="currentColor"/>
                        </g>
                    </svg>
                    <div class="aso-text-[16px]">
                        Fixing methods
                    </div>
                </button>
            </div>
            <div class="">
                <button @click="$router.push('/global-settings/border')" :class="`aso-flex aso-w-fit aso-h-fit aso-p-4 aso-bg-transparent aso-space-x-2 aso-text-black ${route.name == 'global-settings-border' ? 'aso-border-b-[3px] aso-border-r-0 aso-border-l-0 aso-border-t-0 aso-border-solid aso-border-b-[#016464] aso-text-[#016464] aso-bg-[#F9F9F9]' : 'aso-border-none'} hover:aso-border-b-[2px] hover:aso-border-r-0 hover:aso-border-l-0 hover:aso-border-t-0 hover:aso-border-solid hover:aso-border-b-[#016464] hover:aso-bg-[#F9F9F9] hover:aso-text-[#016464] aso-cursor-pointer`">
                    <svg class="aso-w-5 aso-h-5" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="zondicons:border-all">
                        <path id="Vector" d="M22 22V34H34V22H22ZM22 18H34V6H22V18ZM18 22H6V34H18V22ZM18 18V6H6V18H18ZM2 36V2H38V38H2V36Z" fill="currentColor"/>
                        </g>
                    </svg>
                    <div class="aso-text-[16px]">
                        Border
                    </div>
                </button>
            </div>
        </div>
        <div>
            <Licences v-if="$route.name == 'global-settings-licences'"/>
            <ConfigurationPage v-if="$route.name == 'global-settings-configuration-page'"/>
            <Output v-if="$route.name == 'global-settings-output'"/>
            <Shapes v-if="$route.name == 'global-settings-shapes'"/>
            <FixingMethods v-if="$route.name == 'global-settings-fixing-methods'"/>
            <Border v-if="$route.name == 'global-settings-border'"/>
        </div>
    </div>
</template>
<script setup>
import Licences from './licences/index.vue'
import ConfigurationPage from './configuration-page/index.vue'
import Output from './output/index.vue'
import Shapes from './shapes/index.vue'
import FixingMethods from './fixing-methods/index.vue'
import Border from './border/index.vue'
import { useRoute } from 'vue-router';

const route = useRoute()
</script>
<style>
    
</style>