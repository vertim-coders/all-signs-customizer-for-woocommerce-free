<template>
    <div>
        <div class="aso-grid aso-grid-cols-3 aso-gap-x-3 aso-gap-y-7 aso-bg-[#F8F9FB] aso-p-8 aso-pb-12">
            <div class="">
                <div class="aso-flex aso-bg-transparent aso-border-solid aso-border-[1px] aso-border-[#E0E0E0] aso-rounded-t aso-p-3 aso-py-4">
                    <div class="aso-font-bold aso-text-[14px] aso-w-2/4">
                        Enable design from scratch
                    </div>
                    <div class="aso-flex aso-space-x-2 aso-justify-end aso-w-2/4">
                        <span class="aso-text-[#444444] aso-text-[11px]">No</span>
                        <div class="aso-flex aso-items-center -aso-translate-y-2">
                            <label for="aso-toggle" @click="handleDesignFromScratch" class="aso-cursor-pointer aso-bg-[#F8F8FF] aso-border-[1px] aso-border-solid aso-border-black aso-w-6 aso-h-0.5 aso-rounded-full aso-p-1">
                                <div :class="{'aso-translate-x-[100%]': product.designFromScratch, 'aso-bg-active': product.designFromScratch }" class="aso-toggle-dot aso-w-2.5 aso-h-2.5 aso-duration-100 -aso-translate-y-[8px] -aso-translate-x-2 aso-border-[4px] aso-border-solid aso-border-[#008000] aso-bg-[#D9D9D9] aso-rounded-full aso-shadow-md aso-transform"></div>
                            </label>
                        </div>
                        <span class="aso-text-[#444444] aso-text-[11px]">Yes</span>
                    </div>                        
                </div>
                <div class="aso-bg-transparent aso-text-[11px] aso-text-[#444444] aso-border-solid aso-border-[1px] aso-border-t-0 aso-border-[#E0E0E0] aso-rounded aso-rounded-t-none aso-p-3">
                    Would you like to allow your clients to design  the product from scratch? Or do you prefer allowing the customization only for templates assigned to the custom product ?
                </div>
            </div>
            <div class="">
                <div class="aso-flex aso-bg-transparent aso-border-solid aso-border-[1px] aso-border-[#E0E0E0] aso-rounded-t aso-p-3 aso-py-4">
                    <div class="aso-font-bold aso-text-[14px] aso-w-2/4">
                        Redirect after adding a custom design to the cart
                    </div>
                    <div class="aso-flex aso-space-x-2 aso-justify-end aso-w-2/4">
                        <span class="aso-text-[#444444] aso-text-[11px]">No</span>
                        <div class="aso-flex aso-items-center -aso-translate-y-2">
                            <label for="aso-toggle" @click="handleRedirectAfterAddingToCart" class="aso-cursor-pointer aso-bg-[#F8F8FF] aso-border-[1px] aso-border-solid aso-border-black aso-w-6 aso-h-0.5 aso-rounded-full aso-p-1">
                                <div :class="{'aso-translate-x-[100%]': product.redirectAfterAddingToCart, 'aso-bg-active': product.redirectAfterAddingToCart }" class="aso-toggle-dot aso-w-2.5 aso-h-2.5 aso-duration-100 -aso-translate-y-[8px] -aso-translate-x-2 aso-border-[4px] aso-border-solid aso-border-[#008000] aso-bg-[#D9D9D9] aso-rounded-full aso-shadow-md aso-transform"></div>
                            </label>
                        </div>
                        <span class="aso-text-[#444444] aso-text-[11px]">Yes</span>
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
                        <span class="aso-text-[#444444] aso-text-[11px]">No</span>
                        <div class="aso-flex aso-items-center -aso-translate-y-2">
                            <label for="aso-toggle" @click="handleHideAddToCartButtonOnDetailPage" class="aso-cursor-pointer aso-bg-[#F8F8FF] aso-border-[1px] aso-border-solid aso-border-black aso-w-6 aso-h-0.5 aso-rounded-full aso-p-1">
                                <div :class="{'aso-translate-x-[100%]': product.hideAddToCartButtonOnDetailPage, 'aso-bg-active': product.hideAddToCartButtonOnDetailPage }" class="aso-toggle-dot aso-w-2.5 aso-h-2.5 aso-duration-100 -aso-translate-y-[8px] -aso-translate-x-2 aso-border-[4px] aso-border-solid aso-border-[#008000] aso-bg-[#D9D9D9] aso-rounded-full aso-shadow-md aso-transform"></div>
                            </label>
                        </div>
                        <span class="aso-text-[#444444] aso-text-[11px]">Yes</span>
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
                        <span class="aso-text-[#444444] aso-text-[11px]">No</span>
                        <div class="aso-flex aso-items-center -aso-translate-y-2">
                            <label for="aso-toggle" @click="handleHideDesignButtonsOnShopPage" class="aso-cursor-pointer aso-bg-[#F8F8FF] aso-border-[1px] aso-border-solid aso-border-black aso-w-6 aso-h-0.5 aso-rounded-full aso-p-1">
                                <div :class="{'aso-translate-x-[100%]': product.hideDesignButtonsOnShopPage, 'aso-bg-active': product.hideDesignButtonsOnShopPage }" class="aso-toggle-dot aso-w-2.5 aso-h-2.5 aso-duration-100 -aso-translate-y-[8px] -aso-translate-x-2 aso-border-[4px] aso-border-solid aso-border-[#008000] aso-bg-[#D9D9D9] aso-rounded-full aso-shadow-md aso-transform"></div>
                            </label>
                        </div>
                        <span class="aso-text-[#444444] aso-text-[11px]">Yes</span>
                    </div>                        
                </div>
                <div class="aso-bg-transparent aso-text-[11px] aso-text-[#444444] aso-border-solid aso-border-[1px] aso-border-t-0 aso-border-[#E0E0E0] aso-rounded aso-rounded-t-none aso-p-3">
                    This option displays/hides the customization button on the store page.
                </div>
            </div>
            <div class="">
                <div class="aso-flex aso-bg-transparent aso-border-solid aso-border-[1px] aso-border-[#E0E0E0] aso-rounded-t aso-p-3 aso-py-4">
                    <div class="aso-font-bold aso-text-[14px] aso-w-2/4">
                        hide to add to cart buttons for custom product on shop
                    </div>
                    <div class="aso-flex aso-space-x-2 aso-justify-end aso-w-2/4">
                        <span class="aso-text-[#444444] aso-text-[11px]">No</span>
                        <div class="aso-flex aso-items-center -aso-translate-y-2">
                            <label for="aso-toggle" @click="handleHideAddToCartButtonOnShopPage" class="aso-cursor-pointer aso-bg-[#F8F8FF] aso-border-[1px] aso-border-solid aso-border-black aso-w-6 aso-h-0.5 aso-rounded-full aso-p-1">
                                <div :class="{'aso-translate-x-[100%]': product.hideAddToCartButtonOnShopPage, 'aso-bg-active': product.hideAddToCartButtonOnShopPage }" class="aso-toggle-dot aso-w-2.5 aso-h-2.5 aso-duration-100 -aso-translate-y-[8px] -aso-translate-x-2 aso-border-[4px] aso-border-solid aso-border-[#008000] aso-bg-[#D9D9D9] aso-rounded-full aso-shadow-md aso-transform"></div>
                            </label>
                        </div>
                        <span class="aso-text-[#444444] aso-text-[11px]">Yes</span>
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
    hideDesignButtonsOnShopPage:true,
    hideAddToCartButtonOnShopPage:true
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

const handleDesignFromScratch = () => {
    product.value.designFromScratch = !product.value.designFromScratch;
};
const handleHideAddToCartButtonOnDetailPage = () => {
    product.value.hideAddToCartButtonOnDetailPage = !product.value.hideAddToCartButtonOnDetailPage;
};
const handleHideAddToCartButtonOnShopPage = () => {
    product.value.hideAddToCartButtonOnShopPage = !product.value.hideAddToCartButtonOnShopPage;
};
const handleHideDesignButtonsOnShopPage = () => {
    product.value.hideDesignButtonsOnShopPage = !product.value.hideDesignButtonsOnShopPage;
};
const handleRedirectAfterAddingToCart = () => {
    product.value.redirectAfterAddingToCart = !product.value.redirectAfterAddingToCart;
};
</script> 