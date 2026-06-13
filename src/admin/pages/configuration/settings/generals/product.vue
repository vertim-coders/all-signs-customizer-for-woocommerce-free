<template>
    <div>
        <div class="ascwo-grid ascwo-grid-cols-3 ascwo-gap-x-3 ascwo-gap-y-7 ascwo-bg-[#F8F9FB] ascwo-p-8 ascwo-pb-12 ascwo-translate-y-9">
            <div class="">
                <div class="ascwo-flex ascwo-bg-transparent ascwo-border-solid ascwo-border-[1px] ascwo-border-[#E0E0E0] ascwo-rounded-t ascwo-p-3 ascwo-py-4">
                    <div class="ascwo-font-bold ascwo-text-[14px] ascwo-w-2/4">
                        {{ __("Enable design from scratch", "all-signs-customizer-for-woocommerce-pro") }}
                    </div>
                    <div class="ascwo-flex ascwo-space-x-2 ascwo-justify-end ascwo-w-2/4">
                        <div class="ascwo-flex ascwo-justify-center ascwo-items-center ascwo-space-x-4">
                            <p class="ascwo-text-md ascwo-font-medium ascwo-text-black">{{ __("No", "all-signs-customizer-for-woocommerce-pro") }}</p>
                            <label for="yesNo" class="ascwo-relative ascwo-inline-flex ascwo-items-center ascwo-cursor-pointer ascwo-border-[1px] ascwo-border-solid ascwo-border-black ascwo-rounded-full">
                                <input id="yesNo" type="checkbox" name="yesNo" class="ascwo-sr-only ascwo-peer" v-model="product.designFromScratch">
                                <div :class="`peer-checked:after:ascwo-border-[#016464] peer-checked:after:ascwo-border-solid peer-checked:after:ascwo-border-[5px] peer-checked:after:ascwo-top-[-2px] peer-checked:after:ascwo-translate-y-[-15%] ascwo-w-10 ascwo-h-3 ascwo-border ascwo-border-[5px] ascwo-border-[#016464] ascwo-bg-zinc-300 ascwo-rounded-full ascwo-peer peer-checked:after:ascwo-translate-x-[112%] after:ascwo-content-[''] after:ascwo-absolute after:ascwo-top-[-3px] after:ascwo-left-[-5px] after:ascwo-bg-zinc-300 after:ascwo-border-white after:ascwo-border-solid after:ascwo-translate-y-[-15%] after:ascwo-border-[#FFFFFF] after:ascwo-border-[5px] after:ascwo-rounded-full after:ascwo-h-3 after:ascwo-w-3 after:ascwo-transition-all after:ascwo-shadow-lg`"></div>
                            </label>
                            <p class="ascwo-text-md ascwo-font-medium ascwo-text-black">{{ __("Yes", "all-signs-customizer-for-woocommerce-pro") }}</p>
                        </div>
                    </div>                        
                </div>
                <div class="ascwo-bg-transparent ascwo-text-[11px] ascwo-text-[#444444] ascwo-border-solid ascwo-border-[1px] ascwo-border-t-0 ascwo-border-[#E0E0E0] ascwo-rounded ascwo-rounded-t-none ascwo-p-3">
                    {{ __("Would you like to allow your clients to design the product from scratch? Or do you prefer allowing the customization only for templates assigned to the custom product ?", "all-signs-customizer-for-woocommerce-pro") }}
                </div>
            </div>
            <div class="">
                <div class="ascwo-flex ascwo-bg-transparent ascwo-border-solid ascwo-border-[1px] ascwo-border-[#E0E0E0] ascwo-rounded-t ascwo-p-3 ascwo-py-4">
                    <div class="ascwo-font-bold ascwo-text-[14px] ascwo-w-2/4">
                        {{ __("Redirect to cart page after adding a custom design to the cart", "all-signs-customizer-for-woocommerce-pro") }}
                    </div>
                    <div class="ascwo-flex ascwo-space-x-2 ascwo-justify-end ascwo-w-2/4">
                        <div class="ascwo-flex ascwo-justify-center ascwo-items-center ascwo-space-x-4">
                            <span class="ascwo-text-[#444444] ascwo-text-[11px]">{{ __("No", "all-signs-customizer-for-woocommerce-pro") }}</span>
                            <label for="noYesDesign" class="ascwo-relative ascwo-inline-flex ascwo-items-center ascwo-cursor-pointer ascwo-border-[1px] ascwo-border-solid ascwo-border-black ascwo-rounded-full">
                                <input id="noYesDesign" type="radio" name="noYesCheckOut" class="ascwo-sr-only ascwo-peer" :checked="product.redirectAfterAddingToCart" @change="handleRedirectAfterAddingToCart('cart')">
                                <div :class="`peer-checked:after:ascwo-border-[#016464] peer-checked:after:ascwo-border-solid peer-checked:after:ascwo-border-[5px] peer-checked:after:ascwo-top-[-2px] peer-checked:after:ascwo-translate-y-[-15%] ascwo-w-10 ascwo-h-3 ascwo-border ascwo-border-[5px] ascwo-border-[#016464] ascwo-bg-zinc-300 ascwo-rounded-full ascwo-peer peer-checked:after:ascwo-translate-x-[112%] after:ascwo-content-[''] after:ascwo-absolute after:ascwo-top-[-3px] after:ascwo-left-[-5px] after:ascwo-bg-zinc-300 after:ascwo-border-white after:ascwo-border-solid after:ascwo-translate-y-[-15%] after:ascwo-border-[#FFFFFF] after:ascwo-border-[5px] after:ascwo-rounded-full after:ascwo-h-3 after:ascwo-w-3 after:ascwo-transition-all after:ascwo-shadow-lg`"></div>
                            </label>
                            <span class="ascwo-text-[#444444] ascwo-text-[11px]">{{ __("Yes", "all-signs-customizer-for-woocommerce-pro") }}</span>
                        </div>
                    </div>                        
                </div>
               
                <div class="ascwo-bg-transparent ascwo-text-[11px] ascwo-text-[#444444] ascwo-border-solid ascwo-border-[1px] ascwo-border-t-0 ascwo-border-[#E0E0E0] ascwo-rounded ascwo-rounded-t-none ascwo-p-3">
                    {{ __("This options allow you to define what to do after adding a design to the cart", "all-signs-customizer-for-woocommerce-pro") }}
                </div>
            </div>
            <div class="">
                <div class="ascwo-flex ascwo-bg-transparent ascwo-border-solid ascwo-border-[1px] ascwo-border-[#E0E0E0] ascwo-rounded-t ascwo-p-3 ascwo-py-4">
                    <div class="ascwo-font-bold ascwo-text-[14px] ascwo-w-2/4">
                        {{ __("Redirect to checkout page after adding a custom design to the cart", "all-signs-customizer-for-woocommerce-pro") }}
                    </div>
                    <div class="ascwo-flex ascwo-space-x-2 ascwo-justify-end ascwo-w-2/4">
                        <div class="ascwo-flex ascwo-justify-center ascwo-items-center ascwo-space-x-4">
                            <span class="ascwo-text-[#444444] ascwo-text-[11px]">{{ __("No", "all-signs-customizer-for-woocommerce-pro") }}</span>
                            <label for="noYesCheckOut" class="ascwo-relative ascwo-inline-flex ascwo-items-center ascwo-cursor-pointer ascwo-border-[1px] ascwo-border-solid ascwo-border-black ascwo-rounded-full">
                                <input id="noYesCheckOut" type="radio" name="noYesCheckOut" class="ascwo-sr-only ascwo-peer" :checked="product.redirectToCheckOutPage" @change="handleRedirectAfterAddingToCart('checkout')">
                                <div :class="`peer-checked:after:ascwo-border-[#016464] peer-checked:after:ascwo-border-solid peer-checked:after:ascwo-border-[5px] peer-checked:after:ascwo-top-[-2px] peer-checked:after:ascwo-translate-y-[-15%] ascwo-w-10 ascwo-h-3 ascwo-border ascwo-border-[5px] ascwo-border-[#016464] ascwo-bg-zinc-300 ascwo-rounded-full ascwo-peer peer-checked:after:ascwo-translate-x-[112%] after:ascwo-content-[''] after:ascwo-absolute after:ascwo-top-[-3px] after:ascwo-left-[-5px] after:ascwo-bg-zinc-300 after:ascwo-border-white after:ascwo-border-solid after:ascwo-translate-y-[-15%] after:ascwo-border-[#FFFFFF] after:ascwo-border-[5px] after:ascwo-rounded-full after:ascwo-h-3 after:ascwo-w-3 after:ascwo-transition-all after:ascwo-shadow-lg`"></div>
                            </label>
                            <span class="ascwo-text-[#444444] ascwo-text-[11px]">{{ __("Yes", "all-signs-customizer-for-woocommerce-pro") }}</span>
                        </div>
                    </div>                        
                </div>
                <div class="ascwo-bg-transparent ascwo-text-[11px] ascwo-text-[#444444] ascwo-border-solid ascwo-border-[1px] ascwo-border-t-0 ascwo-border-[#E0E0E0] ascwo-rounded ascwo-rounded-t-none ascwo-p-3">
                    {{ __("This options allow you to define what to do after adding a design to the cart", "all-signs-customizer-for-woocommerce-pro") }}
                </div>
            </div>
            <div class="">
                <div class="ascwo-flex ascwo-bg-transparent ascwo-border-solid ascwo-border-[1px] ascwo-border-[#E0E0E0] ascwo-rounded-t ascwo-p-3 ascwo-py-4">
                    <div class="ascwo-font-bold ascwo-text-[14px] ascwo-w-2/4">
                        {{ __("Display or no recap on checkout page", "all-signs-customizer-for-woocommerce-pro") }}
                    </div>
                    <div class="ascwo-flex ascwo-space-x-2 ascwo-justify-end ascwo-w-2/4">
                        <div class="ascwo-flex ascwo-justify-center ascwo-items-center ascwo-space-x-4">
                            <p class="ascwo-text-md ascwo-font-medium ascwo-text-black">{{ __("No", "all-signs-customizer-for-woocommerce-pro") }}</p>
                            <label for="yesNoCheckout" class="ascwo-relative ascwo-inline-flex ascwo-items-center ascwo-cursor-pointer ascwo-border-[1px] ascwo-border-solid ascwo-border-black ascwo-rounded-full">
                                <input id="yesNoCheckout" type="checkbox" name="yesNoCheckout" class="ascwo-sr-only ascwo-peer" v-model="product.displayRecapsOnCheckout">
                                <div :class="`peer-checked:after:ascwo-border-[#016464] peer-checked:after:ascwo-border-solid peer-checked:after:ascwo-border-[5px] peer-checked:after:ascwo-top-[-2px] peer-checked:after:ascwo-translate-y-[-15%] ascwo-w-10 ascwo-h-3 ascwo-border ascwo-border-[5px] ascwo-border-[#016464] ascwo-bg-zinc-300 ascwo-rounded-full ascwo-peer peer-checked:after:ascwo-translate-x-[112%] after:ascwo-content-[''] after:ascwo-absolute after:ascwo-top-[-3px] after:ascwo-left-[-5px] after:ascwo-bg-zinc-300 after:ascwo-border-white after:ascwo-border-solid after:ascwo-translate-y-[-15%] after:ascwo-border-[#FFFFFF] after:ascwo-border-[5px] after:ascwo-rounded-full after:ascwo-h-3 after:ascwo-w-3 after:ascwo-transition-all after:ascwo-shadow-lg`"></div>
                            </label>
                            <p class="ascwo-text-md ascwo-font-medium ascwo-text-black">{{ __("Yes", "all-signs-customizer-for-woocommerce-pro") }}</p>
                        </div>
                    </div>                        
                </div>
                <div class="ascwo-bg-transparent ascwo-text-[11px] ascwo-text-[#444444] ascwo-border-solid ascwo-border-[1px] ascwo-border-t-0 ascwo-border-[#E0E0E0] ascwo-rounded ascwo-rounded-t-none ascwo-p-3">
                    {{ __("This options allow you to define what to do after adding a design to the cart", "all-signs-customizer-for-woocommerce-pro") }}
                </div>
            </div>
            <div class="">
                <div class="ascwo-flex ascwo-bg-transparent ascwo-border-solid ascwo-border-[1px] ascwo-border-[#E0E0E0] ascwo-rounded-t ascwo-p-3 ascwo-py-4">
                    <div class="ascwo-font-bold ascwo-text-[14px] ascwo-w-2/4">
                        {{ __("Hide add to cart button for custom on product detail page", "all-signs-customizer-for-woocommerce-pro") }}
                    </div>
                    <div class="ascwo-flex ascwo-space-x-2 ascwo-justify-end ascwo-w-2/4">
                        <div class="ascwo-flex ascwo-justify-center ascwo-items-center ascwo-space-x-4">
                            <p class="ascwo-text-md ascwo-font-medium ascwo-text-black">{{ __("No", "all-signs-customizer-for-woocommerce-pro") }}</p>
                            <label for="yesNoDetail" class="ascwo-relative ascwo-inline-flex ascwo-items-center ascwo-cursor-pointer ascwo-border-[1px] ascwo-border-solid ascwo-border-black ascwo-rounded-full">
                                <input id="yesNoDetail" type="checkbox" name="yesNoDetail" class="ascwo-sr-only ascwo-peer" v-model="product.hideAddToCartButtonOnDetailPage">
                                <div :class="`peer-checked:after:ascwo-border-[#016464] peer-checked:after:ascwo-border-solid peer-checked:after:ascwo-border-[5px] peer-checked:after:ascwo-top-[-2px] peer-checked:after:ascwo-translate-y-[-15%] ascwo-w-10 ascwo-h-3 ascwo-border ascwo-border-[5px] ascwo-border-[#016464] ascwo-bg-zinc-300 ascwo-rounded-full ascwo-peer peer-checked:after:ascwo-translate-x-[112%] after:ascwo-content-[''] after:ascwo-absolute after:ascwo-top-[-3px] after:ascwo-left-[-5px] after:ascwo-bg-zinc-300 after:ascwo-border-white after:ascwo-border-solid after:ascwo-translate-y-[-15%] after:ascwo-border-[#FFFFFF] after:ascwo-border-[5px] after:ascwo-rounded-full after:ascwo-h-3 after:ascwo-w-3 after:ascwo-transition-all after:ascwo-shadow-lg`"></div>
                            </label>
                            <p class="ascwo-text-md ascwo-font-medium ascwo-text-black">{{ __("Yes", "all-signs-customizer-for-woocommerce-pro") }}</p>
                        </div>
                    </div>                        
                </div>
                <div class="ascwo-bg-transparent ascwo-text-[11px] ascwo-text-[#444444] ascwo-border-solid ascwo-border-[1px] ascwo-border-t-0 ascwo-border-[#E0E0E0] ascwo-rounded ascwo-rounded-t-none ascwo-p-3">
                    {{ __("This options allow you to define whether or not you want hide the add to cart button for custom products on the products page.", "all-signs-customizer-for-woocommerce-pro") }}
                </div>
            </div>
            <div class="">
                <div class="ascwo-flex ascwo-bg-transparent ascwo-border-solid ascwo-border-[1px] ascwo-border-[#E0E0E0] ascwo-rounded-t ascwo-p-3 ascwo-py-4">
                    <div class="ascwo-font-bold ascwo-text-[14px] ascwo-w-2/4">
                        {{ __("Hide design buttons on shop page", "all-signs-customizer-for-woocommerce-pro") }} 
                    </div>
                    <div class="ascwo-flex ascwo-space-x-2 ascwo-justify-end ascwo-w-2/4">
                        <div class="ascwo-flex ascwo-justify-center ascwo-items-center ascwo-space-x-4">
                            <p class="ascwo-text-md ascwo-font-medium ascwo-text-black">{{ __("No", "all-signs-customizer-for-woocommerce-pro") }}</p>
                            <label for="yesNoShop" class="ascwo-relative ascwo-inline-flex ascwo-items-center ascwo-cursor-pointer ascwo-border-[1px] ascwo-border-solid ascwo-border-black ascwo-rounded-full">
                                <input id="yesNoShop" type="checkbox" name="yesNoShop" class="ascwo-sr-only ascwo-peer" v-model="product.hideDesignButtonsOnShopPage">
                                <div :class="`peer-checked:after:ascwo-border-[#016464] peer-checked:after:ascwo-border-solid peer-checked:after:ascwo-border-[5px] peer-checked:after:ascwo-top-[-2px] peer-checked:after:ascwo-translate-y-[-15%] ascwo-w-10 ascwo-h-3 ascwo-border ascwo-border-[5px] ascwo-border-[#016464] ascwo-bg-zinc-300 ascwo-rounded-full ascwo-peer peer-checked:after:ascwo-translate-x-[112%] after:ascwo-content-[''] after:ascwo-absolute after:ascwo-top-[-3px] after:ascwo-left-[-5px] after:ascwo-bg-zinc-300 after:ascwo-border-white after:ascwo-border-solid after:ascwo-translate-y-[-15%] after:ascwo-border-[#FFFFFF] after:ascwo-border-[5px] after:ascwo-rounded-full after:ascwo-h-3 after:ascwo-w-3 after:ascwo-transition-all after:ascwo-shadow-lg`"></div>
                            </label>
                            <p class="ascwo-text-md ascwo-font-medium ascwo-text-black">{{ __("Yes", "all-signs-customizer-for-woocommerce-pro") }}</p>
                        </div>
                    </div>                        
                </div>
                <div class="ascwo-bg-transparent ascwo-text-[11px] ascwo-text-[#444444] ascwo-border-solid ascwo-border-[1px] ascwo-border-t-0 ascwo-border-[#E0E0E0] ascwo-rounded ascwo-rounded-t-none ascwo-p-3">
                    {{ __("This option displays/hides the customization button on the store page.", "all-signs-customizer-for-woocommerce-pro") }}
                </div>
            </div>
            <div class="">
                <div class="ascwo-flex ascwo-bg-transparent ascwo-border-solid ascwo-border-[1px] ascwo-border-[#E0E0E0] ascwo-rounded-t ascwo-p-3 ascwo-py-4">
                    <div class="ascwo-font-bold ascwo-text-[14px] ascwo-w-2/4">
                        {{ __("hide add to cart buttons for custom product on shop", "all-signs-customizer-for-woocommerce-pro") }}
                    </div>
                    <div class="ascwo-flex ascwo-space-x-2 ascwo-justify-end ascwo-w-2/4">
                        <div class="ascwo-flex ascwo-justify-center ascwo-items-center ascwo-space-x-4">
                            <p class="ascwo-text-md ascwo-font-medium ascwo-text-black">{{ __("No", "all-signs-customizer-for-woocommerce-pro") }}</p>
                            <label for="yesNoCustom" class="ascwo-relative ascwo-inline-flex ascwo-items-center ascwo-cursor-pointer ascwo-border-[1px] ascwo-border-solid ascwo-border-black ascwo-rounded-full">
                                <input id="yesNoCustom" type="checkbox" name="yesNoCustom" class="ascwo-sr-only ascwo-peer" v-model="product.hideAddToCartButtonOnShopPage">
                                <div :class="`peer-checked:after:ascwo-border-[#016464] peer-checked:after:ascwo-border-solid peer-checked:after:ascwo-border-[5px] peer-checked:after:ascwo-top-[-2px] peer-checked:after:ascwo-translate-y-[-15%] ascwo-w-10 ascwo-h-3 ascwo-border ascwo-border-[5px] ascwo-border-[#016464] ascwo-bg-zinc-300 ascwo-rounded-full ascwo-peer peer-checked:after:ascwo-translate-x-[112%] after:ascwo-content-[''] after:ascwo-absolute after:ascwo-top-[-3px] after:ascwo-left-[-5px] after:ascwo-bg-zinc-300 after:ascwo-border-white after:ascwo-border-solid after:ascwo-translate-y-[-15%] after:ascwo-border-[#FFFFFF] after:ascwo-border-[5px] after:ascwo-rounded-full after:ascwo-h-3 after:ascwo-w-3 after:ascwo-transition-all after:ascwo-shadow-lg`"></div>
                            </label>
                            <p class="ascwo-text-md ascwo-font-medium ascwo-text-black">{{ __("Yes", "all-signs-customizer-for-woocommerce-pro") }}</p>
                        </div>
                    </div>                        
                </div>
                <div class="ascwo-bg-transparent ascwo-text-[11px] ascwo-text-[#444444] ascwo-border-solid ascwo-border-[1px] ascwo-border-t-0 ascwo-border-[#E0E0E0] ascwo-rounded ascwo-rounded-t-none ascwo-p-3">
                    {{ __("This option hides the add-to-cart buttons on customizable products on the store page.", "all-signs-customizer-for-woocommerce-pro") }}
                </div>
            </div>
        </div>
    </div>
    <div class="ascwo-bg-[#F8F9FB] ascwo-flex ascwo-space-x-4 ascwo-px-4 ascwo-py-3 ascwo-justify-end ascwo-items-end ascwo-translate-y-12">
        <div class="ascwo-bg-[#016464] ascwo-rounded">
            <button :disabled="isLoading" @click="updateProductSettings" class=" ascwo-rounded ascwo-flex ascwo-bg-transparent ascwo-w-fit ascwo-space-x-2 ascwo-h-fit ascwo-text-white ascwo-px-12 ascwo-p-2.5 ascwo-border-none ascwo-opacity-90 hover:ascwo-opacity-100 hover:ascwo-border-none hover:ascwo-text-white hover:ascwo-bg-[#016464] ascwo-cursor-pointer">
                <img src="../../../../../../assets/icons/ic_loading_gray.svg" class="ascwo-w-5 ascwo-w-5" v-if="isLoading" />
                <div class="ascwo-font-semibold ascwo-text-[16px]">{{ __("Save", "all-signs-customizer-for-woocommerce-pro") }}</div>
            </button>
        </div>
    </div>
</template>
<script setup>
import api from '@/admin/Api/api';
import {ref,defineProps, onMounted} from 'vue'
import { useRoute } from 'vue-router';
import toastMessage from '@/admin/utils/functions';

import { __, _x, _n, _nx, sprintf, setLocaleData } from "@wordpress/i18n";
const props = defineProps({
    data:Object,
    fetchSettings:Function
});
const route = useRoute();
const configId = ref(route.params.configId);
const isLoading =ref(false);
const product = ref({
    designFromScratch:true,
    redirectAfterAddingToCart:true,
    hideAddToCartButtonOnDetailPage:true,
    hideDesignButtonsOnShopPage:false,
    hideAddToCartButtonOnShopPage:true,
    redirectToCheckOutPage:false,
    displayRecapsOnCheckout:false,
});
onMounted(() => {
    if(props.data){
        product.value = {...product.value,...props.data}
    }
});

const updateProductSettings = async () => {
    isLoading.value = true;
    const result = await api.updateGeneralProduct(configId.value,product.value);
    if(result.success){
        await props.fetchSettings();
        isLoading.value = false;
        if(result.success == true){
            toastMessage(result.message);
        }else{
            toastMessage(result.message,"warning");
        }
    }else{
        isLoading.value = false;
        toastMessage(result.message,"error");
    }
}

const handleRedirectAfterAddingToCart = (state) => {
    if(state=='cart'){
        product.value.redirectAfterAddingToCart = true;
        product.value.redirectToCheckOutPage = false;
    }else{
        product.value.redirectToCheckOutPage = true;
        product.value.redirectAfterAddingToCart = false;
    };
};
</script> 