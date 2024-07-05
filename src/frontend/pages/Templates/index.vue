<template>
    <div class="aso-templates aso-py-6">
        <div class="aso-w-full aso-flex aso-justify-center aso-items-center aso-my-4">
            <div v-if="categories.length>0" :class="`aso-grid md:aso-grid-cols-4 lg:aso-grid-cols-8 aso-gap-8 aso-templates-categories`">
                <div @click="showTemplateForCategory('')" :class="`${category == '' ? 'aso-border-solid aso-border-x-0 aso-border-y-0 aso-border-b-2 aso-border-[#000000]':''} aso-cursor-pointer aso-text-center`">{{ buttons.allTemplatesText ?? 'All' }}</div>
                <div v-for="cat in categories" @click="showTemplateForCategory(cat.value)" :class="`${category == cat.value ? 'aso-border-solid aso-border-x-0 aso-border-y-0 aso-border-b-2 aso-border-[#000000]':''} aso-cursor-pointer aso-text-center`">{{ cat.name }}</div>
            </div>
        </div>
        <div :class="`aso-grid aso-grid-cols-${templates_grid_cols} aso-gap-8 aso-templates-container`">
            <div v-for="(template, index) in templates" class="aso-template-container aso-border-[1px] aso-border-solid aso-border-[#c3cfd6] aso-rounded aso-bg-transparent">
                <div class="aso-template-image-container aso-flex aso-justify-center aso-items-center pb-2 aso-h-[200px]">
                    <div class="aso-w-full aso-h-full aso-flex aso-items-center aso-justify-center aso-overflow-hidden aso-object-cover">
                        <img class="aso-w-full" v-if="template.prevImg && template.prevImg!=''" :src="template.prevImg" alt="">
                        <img class="aso-w-full" v-if="!template.prevImg" src="../../../../assets/images/img_rectangle_noir.png" alt="">
                    </div>
                </div>
                <div class="aso-template-details-container aso-border-[1px] aso-border-solid aso-border-l-0 aso-border-b-0 aso-border-r-0 aso-border-[#c3cfd6] aso-p-4">
                    <span class="aso-template-title aso-font-bold">{{template.name}}</span>
                    <div class="aso-template-size">{{template.data.templateData.sign ? template.data.templateData.sign.size.width + ' ' +template.data.templateData.sign.size.unit : 0}} x {{template.data.templateData.sign? template.data.templateData.sign.size.height + ' ' +template.data.templateData.sign.size.unit : 0}}</div>
                    <div><span class="aso-font-bold aso-template-price">{{currencySumbol}} {{ template.data.templateData.price ?template.data.templateData.price.value : template.basePrice}}</span> {{ template.data.templateData.price ?template.data.templateData.price.textAfter :''}}</div>
                    <div class="aso-space-y-3 aso-py-3 aso-template-details-buttons" v-if="template.data.templateData.sign">
                        <button @click="addToCart(template)" :class="`${template.enableAddToCart ? 'aso-visible' : 'aso-invisible'}`" class="aso-templates-add_to_cart_button aso-flex aso-justify-center aso-items-center aso-bg-[#0374e3] aso-rounded-[5px] aso-w-full aso-p-2.5">
                            <svg v-if="!isAddingToCart" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="aso-w-6 aso-h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                            </svg>
                            <svg v-if="isAddingToCart" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" class="aso-w-6 aso-h-6">
                                <circle cx="50" cy="50" r="32" stroke-width="8" stroke="currentColor" stroke-dasharray="50.26548245743669 50.26548245743669" fill="none" stroke-linecap="round">
                                <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" keyTimes="0;1" values="0 50 50;360 50 50"></animateTransform>
                                </circle>
                            </svg>
                        {{buttons.templateAddToCartButton}}
                        </button>
                        <a :href="design_page_url+index" class="aso-templates-customize_button aso-text-white aso-flex aso-justify-center aso-items-center aso-bg-[#febd52] aso-rounded-md aso-w-full aso-p-2.5 hover:aso-bg-[#fcac29]">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="aso-w-6 aso-h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                            </svg>
                            {{buttons.templateDesignButton}}
                        </a>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { add_to_cart } from '@/frontend/utils/functions';
import { onMounted, ref } from 'vue';

const templates = ref(aso_templates.data);
const allTemplates = aso_templates.data;
const categories = aso_templates.categories;
const category = ref('');
const currencySumbol = aso_templates.currencySymbol;
const templates_grid_cols = aso_templates.grid_cols;
const design_page_url = aso_templates.design_page_url;
const productId = aso_templates.productId;
const buttons = aso_templates.pageConfigs.buttons;
const isAddingToCart = ref(false);
onMounted(()=>{
    if(document.querySelector("#aso-templates-loader")){
        document.querySelector("#aso-templates-loader").remove();
    }
})
const addToCart = async (template)=>{
        isAddingToCart.value = true
    //if(Object.keys(template.data.cartData).length > 0){
        const cart_data = {
            recaps:{...template.data.cartData},
            variation_id:productId,
            quantity:1
        }
        var add = await add_to_cart(aso_data.ajax_url, cart_data,aso_templates.frontend_nonce, false);
        if(!add.success){
            toastMessage(add.message,"error");
            isAddingToCart.value = false
        }
    /* }else{

    } */
}
const showTemplateForCategory = (key)=> {
    category.value = key
    if(key!=''){
        templates.value = allTemplates.filter((t)=>t.categoryId == key);
    }else{
        templates.value = allTemplates;
    }
}

</script>