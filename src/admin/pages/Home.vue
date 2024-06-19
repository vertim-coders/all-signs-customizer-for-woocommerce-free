<template lang="">
    <div class="aso-mt-[40px] aso-w-full aso-flex aso-items-center aso-justify-center">
        <div class="aso-h-full aso-bg-white aso-w-full aso-flex aso-flex-col aso-justify-center aso-items-center aso-p-10">
            <div class="aso-grid aso-grid-cols-2 aso-gap-4 aso-space-x-4 aso-h-full aso-home-gradient aso-bg-gradient-to-r aso-from-white aso-to-[#016464]">
                <div class="aso-flex aso-flex-col aso-item-center axo-pl-4">
                    <div class="aso-py-2">
                        <span class="aso-text-[14px]">Welcome to All Signs Options</span>
                    </div>
                    <div class="aso-my-4">
                        <h3 class="aso-m-0 aso-font-bold aso-text-[30px]">Test our</h3>
                        <h3 class="aso-m-0 aso-mt-8 aso-font-bold aso-text-[30px]">plugin now</h3>
                    </div>
                    <p class="aso-text-justify aso-text-[16px] aso-m-0 aso-mt-6 aso-mb-8">
                        Every feature we offer is a promise of quality, efficiency and  performance. Explore how our innovations can take your business to new  heights.
                    </p>
                    <div class="aso-pricing-link">
                        <a target="_blank" href="https://signsdesigner.us/aso/pricing" class="aso-text-white aso-bg-[#75A1FF] hover:aso-bg-[#75A1FF] focus:aso-outline-none focus:aso-ring-4 focus:aso-ring-[#75A1FF] aso-font-medium aso-rounded-md aso-text-sm aso-px-5 aso-py-2.5 aso-text-center aso-me-2 aso-mb-2 aso-text-none">Explore Pricing Plans</a>
                    </div>
                </div>
                <div :class="`aso-bg-[url(${statisticImage})] aso-flex aso-justify-end aso-items-center`">
                    <img src="../../../assets/images/home/im_home-skin-vue.png" class="aso-w-full" alt=""/>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
    const statisticImage = aso_data.assets_url+'/images/home/im_statistic.png'
</script>
<style>
    
</style>