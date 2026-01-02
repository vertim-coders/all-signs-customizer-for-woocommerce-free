<template>
    <div>
        <div class="asowp-grid asowp-grid-cols-3 asowp-gap-x-3 asowp-gap-y-7 asowp-bg-[#F8F9FB] asowp-p-8 asowp-pb-12 asowp-translate-y-9">
            <div class="">
                <div class="asowp-flex asowp-bg-transparent asowp-border-solid asowp-border-[1px] asowp-border-[#E0E0E0] asowp-rounded-t asowp-p-3 asowp-py-4">
                    <div class="asowp-font-bold asowp-text-[14px] asowp-w-2/4">
                        {{ __("Enable design from scratch", "all-signs-options-pro") }}
                    </div>
                    <div class="asowp-flex asowp-space-x-2 asowp-justify-end asowp-w-2/4">
                        <div class="asowp-flex asowp-justify-center asowp-items-center asowp-space-x-4">
                            <p class="asowp-text-md asowp-font-medium asowp-text-black">{{ __("No", "all-signs-options-pro") }}</p>
                            <label for="yesNo" class="asowp-relative asowp-inline-flex asowp-items-center asowp-cursor-pointer asowp-border-[1px] asowp-border-solid asowp-border-black asowp-rounded-full">
                                <input id="yesNo" type="checkbox" name="yesNo" class="asowp-sr-only asowp-peer" v-model="product.designFromScratch">
                                <div :class="`peer-checked:after:asowp-border-[#016464] peer-checked:after:asowp-border-solid peer-checked:after:asowp-border-[5px] peer-checked:after:asowp-top-[-2px] peer-checked:after:asowp-translate-y-[-15%] asowp-w-10 asowp-h-3 asowp-border asowp-border-[5px] asowp-border-[#016464] asowp-bg-zinc-300 asowp-rounded-full asowp-peer peer-checked:after:asowp-translate-x-[112%] after:asowp-content-[''] after:asowp-absolute after:asowp-top-[-3px] after:asowp-left-[-5px] after:asowp-bg-zinc-300 after:asowp-border-white after:asowp-border-solid after:asowp-translate-y-[-15%] after:asowp-border-[#FFFFFF] after:asowp-border-[5px] after:asowp-rounded-full after:asowp-h-3 after:asowp-w-3 after:asowp-transition-all after:asowp-shadow-lg`"></div>
                            </label>
                            <p class="asowp-text-md asowp-font-medium asowp-text-black">{{ __("Yes", "all-signs-options-pro") }}</p>
                        </div>
                    </div>                        
                </div>
                <div class="asowp-bg-transparent asowp-text-[11px] asowp-text-[#444444] asowp-border-solid asowp-border-[1px] asowp-border-t-0 asowp-border-[#E0E0E0] asowp-rounded asowp-rounded-t-none asowp-p-3">
                    {{ __("Would you like to allow your clients to design the product from scratch? Or do you prefer allowing the customization only for templates assigned to the custom product ?", "all-signs-options-pro") }}
                </div>
            </div>
            <div class="">
                <div class="asowp-flex asowp-bg-transparent asowp-border-solid asowp-border-[1px] asowp-border-[#E0E0E0] asowp-rounded-t asowp-p-3 asowp-py-4">
                    <div class="asowp-font-bold asowp-text-[14px] asowp-w-2/4">
                        {{ __("Redirect to cart page after adding a custom design to the cart", "all-signs-options-pro") }}
                    </div>
                    <div class="asowp-flex asowp-space-x-2 asowp-justify-end asowp-w-2/4">
                        <div class="asowp-flex asowp-justify-center asowp-items-center asowp-space-x-4">
                            <span class="asowp-text-[#444444] asowp-text-[11px]">{{ __("No", "all-signs-options-pro") }}</span>
                            <label for="noYesDesign" class="asowp-relative asowp-inline-flex asowp-items-center asowp-cursor-pointer asowp-border-[1px] asowp-border-solid asowp-border-black asowp-rounded-full">
                                <input id="noYesDesign" type="radio" name="noYesCheckOut" class="asowp-sr-only asowp-peer" :checked="product.redirectAfterAddingToCart" @change="handleRedirectAfterAddingToCart('cart')">
                                <div :class="`peer-checked:after:asowp-border-[#016464] peer-checked:after:asowp-border-solid peer-checked:after:asowp-border-[5px] peer-checked:after:asowp-top-[-2px] peer-checked:after:asowp-translate-y-[-15%] asowp-w-10 asowp-h-3 asowp-border asowp-border-[5px] asowp-border-[#016464] asowp-bg-zinc-300 asowp-rounded-full asowp-peer peer-checked:after:asowp-translate-x-[112%] after:asowp-content-[''] after:asowp-absolute after:asowp-top-[-3px] after:asowp-left-[-5px] after:asowp-bg-zinc-300 after:asowp-border-white after:asowp-border-solid after:asowp-translate-y-[-15%] after:asowp-border-[#FFFFFF] after:asowp-border-[5px] after:asowp-rounded-full after:asowp-h-3 after:asowp-w-3 after:asowp-transition-all after:asowp-shadow-lg`"></div>
                            </label>
                            <span class="asowp-text-[#444444] asowp-text-[11px]">{{ __("Yes", "all-signs-options-pro") }}</span>
                        </div>
                    </div>                        
                </div>
               
                <div class="asowp-bg-transparent asowp-text-[11px] asowp-text-[#444444] asowp-border-solid asowp-border-[1px] asowp-border-t-0 asowp-border-[#E0E0E0] asowp-rounded asowp-rounded-t-none asowp-p-3">
                    {{ __("This options allow you to define what to do after adding a design to the cart", "all-signs-options-pro") }}
                </div>
            </div>
            <div class="">
                <div class="asowp-flex asowp-bg-transparent asowp-border-solid asowp-border-[1px] asowp-border-[#E0E0E0] asowp-rounded-t asowp-p-3 asowp-py-4">
                    <div class="asowp-font-bold asowp-text-[14px] asowp-w-2/4">
                        {{ __("Redirect to checkout page after adding a custom design to the cart", "all-signs-options-pro") }}
                    </div>
                    <div class="asowp-flex asowp-space-x-2 asowp-justify-end asowp-w-2/4">
                        <div class="asowp-flex asowp-justify-center asowp-items-center asowp-space-x-4">
                            <span class="asowp-text-[#444444] asowp-text-[11px]">{{ __("No", "all-signs-options-pro") }}</span>
                            <label for="noYesCheckOut" class="asowp-relative asowp-inline-flex asowp-items-center asowp-cursor-pointer asowp-border-[1px] asowp-border-solid asowp-border-black asowp-rounded-full">
                                <input id="noYesCheckOut" type="radio" name="noYesCheckOut" class="asowp-sr-only asowp-peer" :checked="product.redirectToCheckOutPage" @change="handleRedirectAfterAddingToCart('checkout')">
                                <div :class="`peer-checked:after:asowp-border-[#016464] peer-checked:after:asowp-border-solid peer-checked:after:asowp-border-[5px] peer-checked:after:asowp-top-[-2px] peer-checked:after:asowp-translate-y-[-15%] asowp-w-10 asowp-h-3 asowp-border asowp-border-[5px] asowp-border-[#016464] asowp-bg-zinc-300 asowp-rounded-full asowp-peer peer-checked:after:asowp-translate-x-[112%] after:asowp-content-[''] after:asowp-absolute after:asowp-top-[-3px] after:asowp-left-[-5px] after:asowp-bg-zinc-300 after:asowp-border-white after:asowp-border-solid after:asowp-translate-y-[-15%] after:asowp-border-[#FFFFFF] after:asowp-border-[5px] after:asowp-rounded-full after:asowp-h-3 after:asowp-w-3 after:asowp-transition-all after:asowp-shadow-lg`"></div>
                            </label>
                            <span class="asowp-text-[#444444] asowp-text-[11px]">{{ __("Yes", "all-signs-options-pro") }}</span>
                        </div>
                    </div>                        
                </div>
                <div class="asowp-bg-transparent asowp-text-[11px] asowp-text-[#444444] asowp-border-solid asowp-border-[1px] asowp-border-t-0 asowp-border-[#E0E0E0] asowp-rounded asowp-rounded-t-none asowp-p-3">
                    {{ __("This options allow you to define what to do after adding a design to the cart", "all-signs-options-pro") }}
                </div>
            </div>
            <div class="">
                <div class="asowp-flex asowp-bg-transparent asowp-border-solid asowp-border-[1px] asowp-border-[#E0E0E0] asowp-rounded-t asowp-p-3 asowp-py-4">
                    <div class="asowp-font-bold asowp-text-[14px] asowp-w-2/4">
                        {{ __("Display or no recap on checkout page", "all-signs-options-pro") }}
                    </div>
                    <div class="asowp-flex asowp-space-x-2 asowp-justify-end asowp-w-2/4">
                        <div class="asowp-flex asowp-justify-center asowp-items-center asowp-space-x-4">
                            <p class="asowp-text-md asowp-font-medium asowp-text-black">{{ __("No", "all-signs-options-pro") }}</p>
                            <label for="yesNoCheckout" class="asowp-relative asowp-inline-flex asowp-items-center asowp-cursor-pointer asowp-border-[1px] asowp-border-solid asowp-border-black asowp-rounded-full">
                                <input id="yesNoCheckout" type="checkbox" name="yesNoCheckout" class="asowp-sr-only asowp-peer" v-model="product.displayRecapsOnCheckout">
                                <div :class="`peer-checked:after:asowp-border-[#016464] peer-checked:after:asowp-border-solid peer-checked:after:asowp-border-[5px] peer-checked:after:asowp-top-[-2px] peer-checked:after:asowp-translate-y-[-15%] asowp-w-10 asowp-h-3 asowp-border asowp-border-[5px] asowp-border-[#016464] asowp-bg-zinc-300 asowp-rounded-full asowp-peer peer-checked:after:asowp-translate-x-[112%] after:asowp-content-[''] after:asowp-absolute after:asowp-top-[-3px] after:asowp-left-[-5px] after:asowp-bg-zinc-300 after:asowp-border-white after:asowp-border-solid after:asowp-translate-y-[-15%] after:asowp-border-[#FFFFFF] after:asowp-border-[5px] after:asowp-rounded-full after:asowp-h-3 after:asowp-w-3 after:asowp-transition-all after:asowp-shadow-lg`"></div>
                            </label>
                            <p class="asowp-text-md asowp-font-medium asowp-text-black">{{ __("Yes", "all-signs-options-pro") }}</p>
                        </div>
                    </div>                        
                </div>
                <div class="asowp-bg-transparent asowp-text-[11px] asowp-text-[#444444] asowp-border-solid asowp-border-[1px] asowp-border-t-0 asowp-border-[#E0E0E0] asowp-rounded asowp-rounded-t-none asowp-p-3">
                    {{ __("This options allow you to define what to do after adding a design to the cart", "all-signs-options-pro") }}
                </div>
            </div>
            <div class="">
                <div class="asowp-flex asowp-bg-transparent asowp-border-solid asowp-border-[1px] asowp-border-[#E0E0E0] asowp-rounded-t asowp-p-3 asowp-py-4">
                    <div class="asowp-font-bold asowp-text-[14px] asowp-w-2/4">
                        {{ __("Hide add to cart button for custom on product detail page", "all-signs-options-pro") }}
                    </div>
                    <div class="asowp-flex asowp-space-x-2 asowp-justify-end asowp-w-2/4">
                        <div class="asowp-flex asowp-justify-center asowp-items-center asowp-space-x-4">
                            <p class="asowp-text-md asowp-font-medium asowp-text-black">{{ __("No", "all-signs-options-pro") }}</p>
                            <label for="yesNoDetail" class="asowp-relative asowp-inline-flex asowp-items-center asowp-cursor-pointer asowp-border-[1px] asowp-border-solid asowp-border-black asowp-rounded-full">
                                <input id="yesNoDetail" type="checkbox" name="yesNoDetail" class="asowp-sr-only asowp-peer" v-model="product.hideAddToCartButtonOnDetailPage">
                                <div :class="`peer-checked:after:asowp-border-[#016464] peer-checked:after:asowp-border-solid peer-checked:after:asowp-border-[5px] peer-checked:after:asowp-top-[-2px] peer-checked:after:asowp-translate-y-[-15%] asowp-w-10 asowp-h-3 asowp-border asowp-border-[5px] asowp-border-[#016464] asowp-bg-zinc-300 asowp-rounded-full asowp-peer peer-checked:after:asowp-translate-x-[112%] after:asowp-content-[''] after:asowp-absolute after:asowp-top-[-3px] after:asowp-left-[-5px] after:asowp-bg-zinc-300 after:asowp-border-white after:asowp-border-solid after:asowp-translate-y-[-15%] after:asowp-border-[#FFFFFF] after:asowp-border-[5px] after:asowp-rounded-full after:asowp-h-3 after:asowp-w-3 after:asowp-transition-all after:asowp-shadow-lg`"></div>
                            </label>
                            <p class="asowp-text-md asowp-font-medium asowp-text-black">{{ __("Yes", "all-signs-options-pro") }}</p>
                        </div>
                    </div>                        
                </div>
                <div class="asowp-bg-transparent asowp-text-[11px] asowp-text-[#444444] asowp-border-solid asowp-border-[1px] asowp-border-t-0 asowp-border-[#E0E0E0] asowp-rounded asowp-rounded-t-none asowp-p-3">
                    {{ __("This options allow you to define whether or not you want hide the add to cart button for custom products on the products page.", "all-signs-options-pro") }}
                </div>
            </div>
            <div class="">
                <div class="asowp-flex asowp-bg-transparent asowp-border-solid asowp-border-[1px] asowp-border-[#E0E0E0] asowp-rounded-t asowp-p-3 asowp-py-4">
                    <div class="asowp-font-bold asowp-text-[14px] asowp-w-2/4">
                        {{ __("Hide design buttons on shop page", "all-signs-options-pro") }} 
                    </div>
                    <div class="asowp-flex asowp-space-x-2 asowp-justify-end asowp-w-2/4">
                        <div class="asowp-flex asowp-justify-center asowp-items-center asowp-space-x-4">
                            <p class="asowp-text-md asowp-font-medium asowp-text-black">{{ __("No", "all-signs-options-pro") }}</p>
                            <label for="yesNoShop" class="asowp-relative asowp-inline-flex asowp-items-center asowp-cursor-pointer asowp-border-[1px] asowp-border-solid asowp-border-black asowp-rounded-full">
                                <input id="yesNoShop" type="checkbox" name="yesNoShop" class="asowp-sr-only asowp-peer" v-model="product.hideDesignButtonsOnShopPage">
                                <div :class="`peer-checked:after:asowp-border-[#016464] peer-checked:after:asowp-border-solid peer-checked:after:asowp-border-[5px] peer-checked:after:asowp-top-[-2px] peer-checked:after:asowp-translate-y-[-15%] asowp-w-10 asowp-h-3 asowp-border asowp-border-[5px] asowp-border-[#016464] asowp-bg-zinc-300 asowp-rounded-full asowp-peer peer-checked:after:asowp-translate-x-[112%] after:asowp-content-[''] after:asowp-absolute after:asowp-top-[-3px] after:asowp-left-[-5px] after:asowp-bg-zinc-300 after:asowp-border-white after:asowp-border-solid after:asowp-translate-y-[-15%] after:asowp-border-[#FFFFFF] after:asowp-border-[5px] after:asowp-rounded-full after:asowp-h-3 after:asowp-w-3 after:asowp-transition-all after:asowp-shadow-lg`"></div>
                            </label>
                            <p class="asowp-text-md asowp-font-medium asowp-text-black">{{ __("Yes", "all-signs-options-pro") }}</p>
                        </div>
                    </div>                        
                </div>
                <div class="asowp-bg-transparent asowp-text-[11px] asowp-text-[#444444] asowp-border-solid asowp-border-[1px] asowp-border-t-0 asowp-border-[#E0E0E0] asowp-rounded asowp-rounded-t-none asowp-p-3">
                    {{ __("This option displays/hides the customization button on the store page.", "all-signs-options-pro") }}
                </div>
            </div>
            <div class="">
                <div class="asowp-flex asowp-bg-transparent asowp-border-solid asowp-border-[1px] asowp-border-[#E0E0E0] asowp-rounded-t asowp-p-3 asowp-py-4">
                    <div class="asowp-font-bold asowp-text-[14px] asowp-w-2/4">
                        {{ __("hide add to cart buttons for custom product on shop", "all-signs-options-pro") }}
                    </div>
                    <div class="asowp-flex asowp-space-x-2 asowp-justify-end asowp-w-2/4">
                        <div class="asowp-flex asowp-justify-center asowp-items-center asowp-space-x-4">
                            <p class="asowp-text-md asowp-font-medium asowp-text-black">{{ __("No", "all-signs-options-pro") }}</p>
                            <label for="yesNoCustom" class="asowp-relative asowp-inline-flex asowp-items-center asowp-cursor-pointer asowp-border-[1px] asowp-border-solid asowp-border-black asowp-rounded-full">
                                <input id="yesNoCustom" type="checkbox" name="yesNoCustom" class="asowp-sr-only asowp-peer" v-model="product.hideAddToCartButtonOnShopPage">
                                <div :class="`peer-checked:after:asowp-border-[#016464] peer-checked:after:asowp-border-solid peer-checked:after:asowp-border-[5px] peer-checked:after:asowp-top-[-2px] peer-checked:after:asowp-translate-y-[-15%] asowp-w-10 asowp-h-3 asowp-border asowp-border-[5px] asowp-border-[#016464] asowp-bg-zinc-300 asowp-rounded-full asowp-peer peer-checked:after:asowp-translate-x-[112%] after:asowp-content-[''] after:asowp-absolute after:asowp-top-[-3px] after:asowp-left-[-5px] after:asowp-bg-zinc-300 after:asowp-border-white after:asowp-border-solid after:asowp-translate-y-[-15%] after:asowp-border-[#FFFFFF] after:asowp-border-[5px] after:asowp-rounded-full after:asowp-h-3 after:asowp-w-3 after:asowp-transition-all after:asowp-shadow-lg`"></div>
                            </label>
                            <p class="asowp-text-md asowp-font-medium asowp-text-black">{{ __("Yes", "all-signs-options-pro") }}</p>
                        </div>
                    </div>                        
                </div>
                <div class="asowp-bg-transparent asowp-text-[11px] asowp-text-[#444444] asowp-border-solid asowp-border-[1px] asowp-border-t-0 asowp-border-[#E0E0E0] asowp-rounded asowp-rounded-t-none asowp-p-3">
                    {{ __("This option hides the add-to-cart buttons on customizable products on the store page.", "all-signs-options-pro") }}
                </div>
            </div>
        </div>
    </div>
    <div class="asowp-bg-[#F8F9FB] asowp-flex asowp-space-x-4 asowp-px-4 asowp-py-3 asowp-justify-end asowp-items-end asowp-translate-y-12">
        <div class="asowp-bg-[#016464] asowp-rounded">
            <button :disabled="isLoading" @click="updateProductSettings" class=" asowp-rounded asowp-flex asowp-bg-transparent asowp-w-fit asowp-space-x-2 asowp-h-fit asowp-text-white asowp-px-12 asowp-p-2.5 asowp-border-none asowp-opacity-90 hover:asowp-opacity-100 hover:asowp-border-none hover:asowp-text-white hover:asowp-bg-[#016464] asowp-cursor-pointer">
                <img src="../../../../../../assets/icons/ic_loading_gray.svg" class="asowp-w-5 asowp-w-5" v-if="isLoading" />
                <div class="asowp-font-semibold asowp-text-[16px]">{{ __("Save", "all-signs-options-pro") }}</div>
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