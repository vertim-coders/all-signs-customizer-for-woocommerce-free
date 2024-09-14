<template lang="">
    <div class="aso-mt-[40px] aso-fixed aso-w-[calc(100%-160px)] aso-flex aso-items-center aso-justify-center aso-h-[80vh]">
        <div class="aso-h-[80vh] aso-bg-white aso-w-full aso-flex aso-flex-col aso-justify-center aso-items-center aso-p-10">
            <div class="aso-grid sm:aso-grid-cols-1 lg:aso-grid-cols-2 aso-gap-4 aso-space-x-4 aso-h-full aso-home-gradient aso-bg-gradient-to-r aso-from-white aso-to-[#016464]">
                <div class="aso-flex aso-flex-col aso-item-center lg:aso-px-4 sm:aso-px-10">
                    <div class="aso-py-2">
                        <span class="aso-text-[14px]">Welcome to ASO configurator</span>
                    </div>
                    <div class="aso-my-4">
                        <h3 class="aso-m-0 aso-font-bold aso-text-[30px]">All Signs Options PRO</h3>
                    </div>
                    <p class="aso-text-justify aso-text-[14px] aso-m-0 aso-mt-6 aso-mb-8">
                        Thank you for installing the ASO configurator for Woocommerce! Everything in ASO is streamlined to make your custom sign selling experience as simple and intuitive as possible for you and your customers. We hope you'll turn it into a powerful marketing asset that brings customers to your digital doorstep.
                    </p>
                    <div class="aso-pricing-link">
                        <RouterLink to="/configurations" class="aso-text-white aso-bg-[#75A1FF] hover:aso-bg-[#75A1FF] focus:aso-outline-none focus:aso-ring-4 focus:aso-ring-[#75A1FF] aso-font-medium aso-rounded-md aso-text-sm aso-px-5 aso-py-2.5 aso-text-center aso-me-2 aso-mb-2 aso-text-none">Get started</RouterLink>
                    </div>
                </div>
                <div :class="`aso-bg-[url(${statisticImage})] aso-flex aso-justify-center aso-items-center`">
                    <img src="../../../assets/images/home/im_home-skin-vue.png" class="aso-w-3/4" alt=""/>
                </div>
            </div>
            <div class="aso-w-full aso-pt-[20px]">
                <h2 class="aso-text-[16px] aso-font-bold aso-m-0 aso-mb-2">What you may be interested in</h2>
                <div class="aso-p-2 aso-grid sm:aso-grid-cols-1 md:aso-grid-cols-2 lg:aso-grid-cols-3 aso-gap-8 aso-justify-between aso-items-center">
                    <div class="aso-flex aso-p-2 aso-justify-center aso-items-center aso-bg-gradient-to-bl aso-from-emerald-700 aso-from-100% aso-via-green-600 aso-via-0% aso-to-green-800 aso-to-0% aso-rounded-md aso-text-white">
                        <div class="aso-flex aso-justify-center aso-items-center">
                            <div class="aso-bg-[#FFFFFF] aso-opacity-50 aso-p-4 aso-rounded-md">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"  xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11 21V19H19V11.9C19 9.95 18.321 8.296 16.963 6.938C15.605 5.58 13.9507 4.90067 12 4.9C10.0493 4.89933 8.39533 5.57867 7.038 6.938C5.68067 8.29733 5.00133 9.95133 5 11.9V18H4C3.45 18 2.97933 17.8043 2.588 17.413C2.19667 17.0217 2.00067 16.5507 2 16V14C2 13.65 2.08767 13.321 2.263 13.013C2.43833 12.705 2.684 12.459 3 12.275L3.075 10.95C3.20833 9.81667 3.53767 8.76667 4.063 7.8C4.58833 6.83333 5.24667 5.99167 6.038 5.275C6.82933 4.55833 7.73733 4 8.762 3.6C9.78667 3.2 10.866 3 12 3C13.134 3 14.209 3.2 15.225 3.6C16.241 4 17.1493 4.55433 17.95 5.263C18.7507 5.97167 19.409 6.809 19.925 7.775C20.441 8.741 20.7743 9.791 20.925 10.925L21 12.225C21.3167 12.375 21.5627 12.6 21.738 12.9C21.9133 13.2 22.0007 13.5167 22 13.85V16.15C22 16.4833 21.9127 16.8 21.738 17.1C21.5633 17.4 21.3173 17.625 21 17.775V19C21 19.55 20.8043 20.021 20.413 20.413C20.0217 20.805 19.5507 21.0007 19 21H11ZM9 14C8.71667 14 8.47933 13.904 8.288 13.712C8.09667 13.52 8.00067 13.2827 8 13C7.99933 12.7173 8.09533 12.48 8.288 12.288C8.48067 12.096 8.718 12 9 12C9.282 12 9.51967 12.096 9.713 12.288C9.90633 12.48 10.002 12.7173 10 13C9.998 13.2827 9.902 13.5203 9.712 13.713C9.522 13.9057 9.28467 14.0013 9 14ZM15 14C14.7167 14 14.4793 13.904 14.288 13.712C14.0967 13.52 14.0007 13.2827 14 13C13.9993 12.7173 14.0953 12.48 14.288 12.288C14.4807 12.096 14.718 12 15 12C15.282 12 15.5197 12.096 15.713 12.288C15.9063 12.48 16.002 12.7173 16 13C15.998 13.2827 15.902 13.5203 15.712 13.713C15.522 13.9057 15.2847 14.0013 15 14ZM6.025 12.45C5.90833 10.6833 6.44167 9.16667 7.625 7.9C8.80833 6.63333 10.2833 6 12.05 6C13.5333 6 14.8377 6.47067 15.963 7.412C17.0883 8.35333 17.7673 9.558 18 11.026C16.4833 11.0087 15.0877 10.6 13.813 9.8C12.5383 9 11.559 7.91667 10.875 6.55C10.6083 7.88333 10.046 9.071 9.188 10.113C8.33 11.155 7.27567 11.934 6.025 12.45Z" fill="black"/>
                                </svg>
                            </div>
                        </div>
                        <div class="aso-p-4">
                            <a href="https://signsdesigner.us/all-signs-options-product/" class="aso-text-[14px] aso-text-none aso-text-white hover:aso-text-white focus:aso-border-none focus:aso-text-white aso-m-0 aso-mb-2">Get Support</a>
                            <div>
                                <span>Start the conversation from our site via the chat button and we'll get back to you</span>
                            </div>
                        </div>
                    </div>
                    <div class="aso-flex aso-p-2 aso-justify-center aso-items-center aso-bg-gradient-to-bl aso-from-[#9D7B22] aso-from-100% aso-via-[#0E211A] aso-via-0% aso-to-[#0E211A] aso-to-0% aso-rounded-md aso-text-white">
                        <div class="aso-bg-[#FFFFFF] aso-opacity-50 aso-p-4 aso-rounded-md">
                            <svg width="31" height="31" viewBox="0 0 31 31" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path d="M18.3203 23.2492H15.5L9.68747 20.0459L2.58911 22.6564L4.5279 26.4952L9.09524 24.588C13.3687 27.1397 15.9695 28.4159 16.8982 28.4159C17.8269 28.4159 21.6664 26.6935 28.4166 23.2492" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M18.7241 17.429V14.413C19.4345 14.1179 20.3664 13.6864 20.9018 13.151C21.7147 12.3382 22.2683 11.3025 22.4926 10.1749C22.7168 9.04744 22.6017 7.87874 22.1618 6.81665C21.7219 5.75456 20.9769 4.84678 20.021 4.20809C19.0651 3.56941 17.9414 3.22852 16.7918 3.22852C15.6422 3.22852 14.5184 3.56941 13.5625 4.20809C12.6066 4.84678 11.8616 5.75456 11.4217 6.81665C10.9818 7.87874 10.8667 9.04744 11.0909 10.1749C11.3152 11.3025 11.8688 12.3382 12.6817 13.151C13.2171 13.6864 14.1438 14.1179 14.8543 14.4124C14.8581 14.6287 14.8581 15.6343 14.8543 17.4284L18.7241 17.429Z" stroke="black" stroke-width="2" stroke-linejoin="round"/>
                                <path d="M7.75008 13.5622L8.39591 12.9163M25.8334 13.5622L25.1876 12.9163M9.68758 3.22884L9.04175 2.58301M23.8959 3.22884L24.5417 2.58301M26.4792 7.74967H25.8334M7.75008 7.74967H7.10425" stroke="black" stroke-width="2" stroke-linecap="round"/>
                            </svg>
                        </div>
                        <div class="aso-p-4">
                            <a href="https://docs.signsdesigner.us/docs/aso-wp-documentation/" class="aso-text-[14px] aso-text-none aso-text-white hover:aso-text-white focus:aso-border-none focus:aso-text-white aso-m-0 aso-mb-2">Knowledgebase</a>
                            <div>
                                <span>Reduce your learning curve and get started with ASO in no time by reading our FAQ!</span>
                            </div>
                        </div>
                    </div>
                    <div class="aso-flex aso-p-2 aso-justify-center aso-items-center aso-bg-gradient-to-bl aso-from-[#A770EB] aso-from-100% aso-via-[#0E211A] aso-via-0% aso-to-[#0E211A] aso-to-0% aso-rounded-md aso-text-white">
                       <div class="aso-bg-[#FFFFFF] aso-opacity-50 aso-p-4 aso-rounded-md aso-text-[#0E211A]">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="aso-w-6 aso-h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                            </svg>

                        </div>
                        <div class="aso-p-4">
                            <a href="https://docs.signsdesigner.us/forums/forum/feedback-suggestions/" class="aso-text-[14px] aso-text-none aso-text-white hover:aso-text-white focus:aso-border-none focus:aso-text-white aso-m-0 aso-mb-2">Suggest a Feature</a>
                            <div>
                                <span>We're always working to improve ASO, so we'd love to hear how we can do better.</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { RouterLink } from 'vue-router';
    const statisticImage = asowp_data.assets_url+'/images/home/im_statistic.png'
</script>
<style>
    
</style>