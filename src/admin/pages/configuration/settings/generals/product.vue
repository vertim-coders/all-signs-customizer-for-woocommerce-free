<template>
    <div>
        <div class="aso-grid aso-grid-cols-3 aso-gap-x-3 aso-gap-y-7 aso-bg-[#F8F9FB] aso-p-8 aso-pb-12">
            <div class="">
                <div class="aso-flex aso-bg-transparent aso-border-solid aso-border-[1px] aso-border-[#E0E0E0] aso-rounded-t aso-p-3 aso-py-4">
                    <div class="aso-font-bold aso-text-[14px] aso-w-2/4">
                        Enable design from scratch
                    </div>
                    <div class="aso-flex aso-space-x-2 aso-justify-end aso-w-2/4">
                        <div class="aso-flex aso-justify-center aso-items-center aso-space-x-4">
                            <p class="aso-text-md aso-font-medium aso-text-black">No</p>
                            <label for="yesNo" class="aso-relative aso-inline-flex aso-items-center aso-cursor-pointer aso-border-[1px] aso-border-solid aso-border-black aso-rounded-full">
                                <input id="yesNo" type="checkbox" name="yesNo" class="aso-sr-only aso-peer" value="yesNo" v-model="product.designFromScratch">
                                <div :class="`peer-checked:after:aso-border-[#016464] peer-checked:after:aso-border-solid peer-checked:after:aso-border-[5px] peer-checked:after:aso-top-[-2px] peer-checked:after:aso-translate-y-[-15%] aso-w-10 aso-h-3 aso-border aso-border-[5px] aso-border-[#016464] aso-bg-zinc-300 aso-rounded-full aso-peer peer-checked:after:aso-translate-x-[112%] after:aso-content-[''] after:aso-absolute after:aso-top-[-3px] after:aso-left-[-5px] after:aso-bg-zinc-300 after:aso-border-white after:aso-border-solid after:aso-translate-y-[-15%] after:aso-border-[#FFFFFF] after:aso-border-[5px] after:aso-rounded-full after:aso-h-3 after:aso-w-3 after:aso-transition-all after:aso-shadow-lg`"></div>
                            </label>
                            <p class="aso-text-md aso-font-medium aso-text-black">Yes</p>
                        </div>
                    </div>                        
                </div>
                <div class="aso-bg-transparent aso-text-[11px] aso-text-[#444444] aso-border-solid aso-border-[1px] aso-border-t-0 aso-border-[#E0E0E0] aso-rounded aso-rounded-t-none aso-p-3">
                    Would you like to allow your clients to design  the product from scratch? Or do you prefer allowing the customization only for templates assigned to the custom product ?
                </div>
            </div>
            <div class="">
                <div class="aso-flex aso-bg-transparent aso-border-solid aso-border-[1px] aso-border-[#E0E0E0] aso-rounded-t aso-p-3 aso-py-4">
                    <div class="aso-font-bold aso-text-[14px] aso-w-2/4">
                        Redirect to cart page after adding a custom design to the cart
                    </div>
                    <div class="aso-flex aso-space-x-2 aso-justify-end aso-w-2/4">
                        <div class="aso-flex aso-justify-center aso-items-center aso-space-x-4">
                            <span class="aso-text-[#444444] aso-text-[11px]">No</span>
                            <label for="noYesDesign" class="aso-relative aso-inline-flex aso-items-center aso-cursor-pointer aso-border-[1px] aso-border-solid aso-border-black aso-rounded-full">
                                <input id="noYesDesign" type="radio" name="noYesDesign" class="aso-sr-only aso-peer" value="noYesDesign" v-model="product.redirectAfterAddingToCart">
                                <div :class="`peer-checked:after:aso-border-[#016464] peer-checked:after:aso-border-solid peer-checked:after:aso-border-[5px] peer-checked:after:aso-top-[-2px] peer-checked:after:aso-translate-y-[-15%] aso-w-10 aso-h-3 aso-border aso-border-[5px] aso-border-[#016464] aso-bg-zinc-300 aso-rounded-full aso-peer peer-checked:after:aso-translate-x-[112%] after:aso-content-[''] after:aso-absolute after:aso-top-[-3px] after:aso-left-[-5px] after:aso-bg-zinc-300 after:aso-border-white after:aso-border-solid after:aso-translate-y-[-15%] after:aso-border-[#FFFFFF] after:aso-border-[5px] after:aso-rounded-full after:aso-h-3 after:aso-w-3 after:aso-transition-all after:aso-shadow-lg`"></div>
                            </label>
                            <span class="aso-text-[#444444] aso-text-[11px]">Yes</span>
                        </div>
                    </div>                        
                </div>
               
                <div class="aso-bg-transparent aso-text-[11px] aso-text-[#444444] aso-border-solid aso-border-[1px] aso-border-t-0 aso-border-[#E0E0E0] aso-rounded aso-rounded-t-none aso-p-3">
                    This options allow  you to define what to do after adding a design to the cart
                </div>
            </div>
            <div class="">
                <div class="aso-flex aso-bg-transparent aso-border-solid aso-border-[1px] aso-border-[#E0E0E0] aso-rounded-t aso-p-3 aso-py-4">
                    <div class="aso-font-bold aso-text-[14px] aso-w-2/4">
                        Redirect to checkout page after adding a custom design to the cart
                    </div>
                    <div class="aso-flex aso-space-x-2 aso-justify-end aso-w-2/4">
                        <div class="aso-flex aso-justify-center aso-items-center aso-space-x-4">
                            <span class="aso-text-[#444444] aso-text-[11px]">No</span>
                            <label for="noYesCheckOut" class="aso-relative aso-inline-flex aso-items-center aso-cursor-pointer aso-border-[1px] aso-border-solid aso-border-black aso-rounded-full">
                                <input id="noYesCheckOut" type="radio" name="noYesCheckOut" class="aso-sr-only aso-peer" value="noYesCheckOut" v-model="product.redirectAfterAddingToCart">
                                <div :class="`peer-checked:after:aso-border-[#016464] peer-checked:after:aso-border-solid peer-checked:after:aso-border-[5px] peer-checked:after:aso-top-[-2px] peer-checked:after:aso-translate-y-[-15%] aso-w-10 aso-h-3 aso-border aso-border-[5px] aso-border-[#016464] aso-bg-zinc-300 aso-rounded-full aso-peer peer-checked:after:aso-translate-x-[112%] after:aso-content-[''] after:aso-absolute after:aso-top-[-3px] after:aso-left-[-5px] after:aso-bg-zinc-300 after:aso-border-white after:aso-border-solid after:aso-translate-y-[-15%] after:aso-border-[#FFFFFF] after:aso-border-[5px] after:aso-rounded-full after:aso-h-3 after:aso-w-3 after:aso-transition-all after:aso-shadow-lg`"></div>
                            </label>
                            <span class="aso-text-[#444444] aso-text-[11px]">Yes</span>
                        </div>
                    </div>                        
                </div>
                <div class="aso-bg-transparent aso-text-[11px] aso-text-[#444444] aso-border-solid aso-border-[1px] aso-border-t-0 aso-border-[#E0E0E0] aso-rounded aso-rounded-t-none aso-p-3">
                    This options allow  you to define what to do after adding a design to the cart
                </div>
            </div>
            <div class="">
                <div class="aso-flex aso-bg-transparent aso-border-solid aso-border-[1px] aso-border-[#E0E0E0] aso-rounded-t aso-p-3 aso-py-4">
                    <div class="aso-font-bold aso-text-[14px] aso-w-2/4">
                        Display or no recap on checkout page
                    </div>
                    <div class="aso-flex aso-space-x-2 aso-justify-end aso-w-2/4">
                        <div class="aso-flex aso-justify-center aso-items-center aso-space-x-4">
                            <p class="aso-text-md aso-font-medium aso-text-black">No</p>
                            <label for="yesNoCheckout" class="aso-relative aso-inline-flex aso-items-center aso-cursor-pointer aso-border-[1px] aso-border-solid aso-border-black aso-rounded-full">
                                <input id="yesNoCheckout" type="checkbox" name="yesNoCheckout" class="aso-sr-only aso-peer" value="yesNo" v-model="product.displayRecapsOnCheckout">
                                <div :class="`peer-checked:after:aso-border-[#016464] peer-checked:after:aso-border-solid peer-checked:after:aso-border-[5px] peer-checked:after:aso-top-[-2px] peer-checked:after:aso-translate-y-[-15%] aso-w-10 aso-h-3 aso-border aso-border-[5px] aso-border-[#016464] aso-bg-zinc-300 aso-rounded-full aso-peer peer-checked:after:aso-translate-x-[112%] after:aso-content-[''] after:aso-absolute after:aso-top-[-3px] after:aso-left-[-5px] after:aso-bg-zinc-300 after:aso-border-white after:aso-border-solid after:aso-translate-y-[-15%] after:aso-border-[#FFFFFF] after:aso-border-[5px] after:aso-rounded-full after:aso-h-3 after:aso-w-3 after:aso-transition-all after:aso-shadow-lg`"></div>
                            </label>
                            <p class="aso-text-md aso-font-medium aso-text-black">Yes</p>
                        </div>
                    </div>                        
                </div>
                <div class="aso-bg-transparent aso-text-[11px] aso-text-[#444444] aso-border-solid aso-border-[1px] aso-border-t-0 aso-border-[#E0E0E0] aso-rounded aso-rounded-t-none aso-p-3">
                    This options allow  you to define what to do after adding a design to the cart
                </div>
            </div>
            <div class="">
                <div class="aso-flex aso-bg-transparent aso-border-solid aso-border-[1px] aso-border-[#E0E0E0] aso-rounded-t aso-p-3 aso-py-4">
                    <div class="aso-font-bold aso-text-[14px] aso-w-2/4">
                        Hide add to cart button for custom on product detail page
                    </div>
                    <div class="aso-flex aso-space-x-2 aso-justify-end aso-w-2/4">
                        <div class="aso-flex aso-justify-center aso-items-center aso-space-x-4">
                            <p class="aso-text-md aso-font-medium aso-text-black">No</p>
                            <label for="yesNoDetail" class="aso-relative aso-inline-flex aso-items-center aso-cursor-pointer aso-border-[1px] aso-border-solid aso-border-black aso-rounded-full">
                                <input id="yesNoDetail" type="checkbox" name="yesNoDetail" class="aso-sr-only aso-peer" value="yesNo" v-model="product.hideAddToCartButtonOnDetailPage">
                                <div :class="`peer-checked:after:aso-border-[#016464] peer-checked:after:aso-border-solid peer-checked:after:aso-border-[5px] peer-checked:after:aso-top-[-2px] peer-checked:after:aso-translate-y-[-15%] aso-w-10 aso-h-3 aso-border aso-border-[5px] aso-border-[#016464] aso-bg-zinc-300 aso-rounded-full aso-peer peer-checked:after:aso-translate-x-[112%] after:aso-content-[''] after:aso-absolute after:aso-top-[-3px] after:aso-left-[-5px] after:aso-bg-zinc-300 after:aso-border-white after:aso-border-solid after:aso-translate-y-[-15%] after:aso-border-[#FFFFFF] after:aso-border-[5px] after:aso-rounded-full after:aso-h-3 after:aso-w-3 after:aso-transition-all after:aso-shadow-lg`"></div>
                            </label>
                            <p class="aso-text-md aso-font-medium aso-text-black">Yes</p>
                        </div>
                    </div>                        
                </div>
                <div class="aso-bg-transparent aso-text-[11px] aso-text-[#444444] aso-border-solid aso-border-[1px] aso-border-t-0 aso-border-[#E0E0E0] aso-rounded aso-rounded-t-none aso-p-3">
                    This options allow  you to define whether or not you want hide the add to cart button for custom products on the products page.
                </div>
            </div>
            <div class="">
                <div class="aso-flex aso-bg-transparent aso-border-solid aso-border-[1px] aso-border-[#E0E0E0] aso-rounded-t aso-p-3 aso-py-4">
                    <div class="aso-font-bold aso-text-[14px] aso-w-2/4">
                        Hide design buttons on shop page 
                    </div>
                    <div class="aso-flex aso-space-x-2 aso-justify-end aso-w-2/4">
                        <div class="aso-flex aso-justify-center aso-items-center aso-space-x-4">
                            <p class="aso-text-md aso-font-medium aso-text-black">No</p>
                            <label for="yesNoShop" class="aso-relative aso-inline-flex aso-items-center aso-cursor-pointer aso-border-[1px] aso-border-solid aso-border-black aso-rounded-full">
                                <input id="yesNoShop" type="checkbox" name="yesNoShop" class="aso-sr-only aso-peer" value="yesNo" v-model="product.hideDesignButtonsOnShopPage">
                                <div :class="`peer-checked:after:aso-border-[#016464] peer-checked:after:aso-border-solid peer-checked:after:aso-border-[5px] peer-checked:after:aso-top-[-2px] peer-checked:after:aso-translate-y-[-15%] aso-w-10 aso-h-3 aso-border aso-border-[5px] aso-border-[#016464] aso-bg-zinc-300 aso-rounded-full aso-peer peer-checked:after:aso-translate-x-[112%] after:aso-content-[''] after:aso-absolute after:aso-top-[-3px] after:aso-left-[-5px] after:aso-bg-zinc-300 after:aso-border-white after:aso-border-solid after:aso-translate-y-[-15%] after:aso-border-[#FFFFFF] after:aso-border-[5px] after:aso-rounded-full after:aso-h-3 after:aso-w-3 after:aso-transition-all after:aso-shadow-lg`"></div>
                            </label>
                            <p class="aso-text-md aso-font-medium aso-text-black">Yes</p>
                        </div>
                    </div>                        
                </div>
                <div class="aso-bg-transparent aso-text-[11px] aso-text-[#444444] aso-border-solid aso-border-[1px] aso-border-t-0 aso-border-[#E0E0E0] aso-rounded aso-rounded-t-none aso-p-3">
                    This option displays/hides the customization button on the store page.
                </div>
            </div>
            <div class="">
                <div class="aso-flex aso-bg-transparent aso-border-solid aso-border-[1px] aso-border-[#E0E0E0] aso-rounded-t aso-p-3 aso-py-4">
                    <div class="aso-font-bold aso-text-[14px] aso-w-2/4">
                        hide add to cart buttons for custom product on shop
                    </div>
                    <div class="aso-flex aso-space-x-2 aso-justify-end aso-w-2/4">
                        <div class="aso-flex aso-justify-center aso-items-center aso-space-x-4">
                            <p class="aso-text-md aso-font-medium aso-text-black">No</p>
                            <label for="yesNoCustom" class="aso-relative aso-inline-flex aso-items-center aso-cursor-pointer aso-border-[1px] aso-border-solid aso-border-black aso-rounded-full">
                                <input id="yesNoCustom" type="checkbox" name="yesNoCustom" class="aso-sr-only aso-peer" value="yesNo" v-model="product.hideAddToCartButtonOnShopPage">
                                <div :class="`peer-checked:after:aso-border-[#016464] peer-checked:after:aso-border-solid peer-checked:after:aso-border-[5px] peer-checked:after:aso-top-[-2px] peer-checked:after:aso-translate-y-[-15%] aso-w-10 aso-h-3 aso-border aso-border-[5px] aso-border-[#016464] aso-bg-zinc-300 aso-rounded-full aso-peer peer-checked:after:aso-translate-x-[112%] after:aso-content-[''] after:aso-absolute after:aso-top-[-3px] after:aso-left-[-5px] after:aso-bg-zinc-300 after:aso-border-white after:aso-border-solid after:aso-translate-y-[-15%] after:aso-border-[#FFFFFF] after:aso-border-[5px] after:aso-rounded-full after:aso-h-3 after:aso-w-3 after:aso-transition-all after:aso-shadow-lg`"></div>
                            </label>
                            <p class="aso-text-md aso-font-medium aso-text-black">Yes</p>
                        </div>
                    </div>                        
                </div>
                <div class="aso-bg-transparent aso-text-[11px] aso-text-[#444444] aso-border-solid aso-border-[1px] aso-border-t-0 aso-border-[#E0E0E0] aso-rounded aso-rounded-t-none aso-p-3">
                    This option hides the add-to-cart buttons on customizable products on the store page.
                </div>
            </div>
        </div>
    </div>
    <div class="aso-bg-[#F8F9FB] aso-flex aso-space-x-4 aso-px-4 aso-py-3 aso-justify-end aso-items-end">
        <div class="aso-bg-[#016464] aso-rounded">
            <button :disabled="isLoading" @click="updateProductSettings" class=" aso-rounded aso-flex aso-bg-transparent aso-w-fit aso-space-x-2 aso-h-fit aso-text-white aso-px-12 aso-p-2.5 aso-border-none aso-opacity-90 hover:aso-opacity-100 hover:aso-border-none hover:aso-text-white hover:aso-bg-[#016464] aso-cursor-pointer">
                <img src="../../../../../../assets/icons/ic_loading_gray.svg" class="aso-w-5 aso-w-5" v-if="isLoading" />
                <div class="aso-font-semibold aso-text-[16px]">Save</div>
            </button>
        </div>
    </div>
</template>
<script setup>
import api from '@/admin/Api/api';
import {ref,defineProps, onMounted} from 'vue'
import { useRoute } from 'vue-router';
import toastMessage from '@/admin/utils/functions';

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

/*const handleRedirectAfterAddingToCart = () => {
    if(product.value.redirectAfterAddingToCart){
        product.value.redirectAfterAddingToCart = false;
        product.value.redirectToCheckOutPage = true;
    }else{
        product.value.redirectAfterAddingToCart = true;
        product.value.redirectToCheckOutPage = false;
    }
};*/
</script> 