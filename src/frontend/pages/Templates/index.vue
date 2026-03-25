<template>
    <div class="asowp-templates asowp-py-6">
        <div class="asowp-w-full asowp-flex asowp-justify-center asowp-items-center asowp-my-4">
            <div v-if="categories.length>0" :class="`asowp-grid asowp-grid-cols-4 lg:asowp-grid-cols-8 asowp-gap-4 asowp-templates-categories`">
                <div
                    @click="showTemplateForCategory('')"
                    :class="`${category == '' ? 'asowp-border-solid asowp-border-x-0 asowp-border-y-0 asowp-border-b-2 asowp-border-[#111827] asowp-text-[#111827] asowp-font-semibold asowp-templates-category-btn--active' : 'asowp-text-gray-600 hover:asowp-text-gray-900'} asowp-templates-category-btn asowp-cursor-pointer asowp-text-center asowp-px-3 asowp-py-2 asowp-rounded-full hover:asowp-bg-gray-100 asowp-transition-colors`"
                >
                    {{ buttons.allTemplatesText ?? 'All' }}
                </div>
                <div
                    v-for="cat in categories"
                    @click="showTemplateForCategory(cat.value)"
                    :class="`${category == cat.value ? 'asowp-border-solid asowp-border-x-0 asowp-border-y-0 asowp-border-b-2 asowp-border-[#111827] asowp-text-[#111827] asowp-font-semibold asowp-templates-category-btn--active' : 'asowp-text-gray-600 hover:asowp-text-gray-900'} asowp-templates-category-btn asowp-cursor-pointer asowp-text-center asowp-px-3 asowp-py-2 asowp-rounded-full hover:asowp-bg-gray-100 asowp-transition-colors`"
                >
                    {{ cat.name }}
                </div>
            </div>
        </div>
        <div :class="`asowp-grid md:asowp-grid-cols-2 lg:asowp-grid-cols-${templates_grid_cols} asowp-gap-8 asowp-templates-container`">
            <div v-for="(template, index) in templates" class="asowp-template-container asowp-group asowp-bg-white asowp-border asowp-border-solid asowp-border-[#c3cfd6] asowp-rounded asowp-overflow-hidden asowp-shadow-sm hover:asowp-shadow-md asowp-transition-shadow">
                <div class="asowp-template-image-container asowp-relative asowp-h-[260px] asowp-bg-[#f3f4f6] asowp-overflow-hidden">
                    <img
                        v-if="template.prevImg && template.prevImg!=''"
                        class="asowp-absolute asowp-inset-0 asowp-w-full asowp-h-full asowp-object-cover asowp-transition-transform asowp-duration-300 group-hover:asowp-scale-105"
                        :src="template.prevImg"
                        alt=""
                    >
                    <img
                        v-if="template.realImg && template.realImg != ''"
                        class="asowp-absolute asowp-inset-0 asowp-w-full asowp-h-full asowp-object-cover asowp-opacity-0 asowp-transition-opacity asowp-duration-300 group-hover:asowp-opacity-100"
                        :src="template.realImg"
                        alt=""
                    >
                    <img
                        v-if="!template.prevImg"
                        class="asowp-absolute asowp-inset-0 asowp-w-full asowp-h-full asowp-object-cover"
                        src="../../../../assets/images/img_rectangle_noir.png"
                        alt=""
                    >
                    <div class="asowp-absolute asowp-inset-0 asowp-bg-gradient-to-t asowp-from-black/40 asowp-via-black/10 asowp-to-transparent asowp-opacity-0 asowp-transition-opacity asowp-duration-300 group-hover:asowp-opacity-100"></div>
                </div>
                <div class="asowp-template-details-container asowp-border-[1px] asowp-border-solid asowp-border-l-0 asowp-border-b-0 asowp-border-r-0 asowp-border-[#c3cfd6] asowp-p-4">
                    <span class="asowp-template-title asowp-font-bold asowp-text-gray-900">{{template.name}}</span>
                    <div class="asowp-template-size asowp-text-xs asowp-text-gray-500">{{template.recaps?.size ?? ""}} </div>
                    <div class="asowp-text-sm asowp-text-gray-800">
                        <span class="asowp-font-bold asowp-template-price">{{ formatPrice(template.recaps?.customPrice||0, template.basePrice) }}</span>
                        {{ template.recaps?.priceType||""}}
                    </div>
                    <div class="asowp-space-y-3 asowp-py-3 asowp-template-details-buttons" v-if="template.recaps">
                        <button
                            @click="addToCart(template, index)"
                            :class="`${template.enableAddToCart ? 'asowp-visible' : 'asowp-invisible'}`"
                            class="asowp-templates-add_to_cart_button asowp-flex asowp-justify-center asowp-items-center asowp-gap-2 asowp-bg-[#0374e3] asowp-rounded-[5px] asowp-w-full asowp-p-2.5 asowp-text-white asowp-text-sm asowp-font-semibold hover:asowp-bg-[#0b5fcc] asowp-transition-colors"
                        >
                            <svg v-if="!isAddingToCart" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="asowp-w-6 asowp-h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                            </svg>
                            <svg v-if="isAddingToCart" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" class="asowp-w-6 asowp-h-6">
                                <circle cx="50" cy="50" r="32" stroke-width="8" stroke="currentColor" stroke-dasharray="50.26548245743669 50.26548245743669" fill="none" stroke-linecap="round">
                                <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" keyTimes="0;1" values="0 50 50;360 50 50"></animateTransform>
                                </circle>
                            </svg>
                        {{buttons.templateAddToCartButton}}
                        </button>
                        <a :href="design_page_url+index" class="asowp-templates-customize_button asowp-text-white asowp-flex asowp-justify-center asowp-items-center asowp-gap-2 asowp-bg-[#febd52] asowp-rounded-md asowp-w-full asowp-p-2.5 asowp-text-sm asowp-font-semibold hover:asowp-bg-[#fcac29] asowp-transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="asowp-w-6 asowp-h-6">
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
import api from '@/frontend/api';

const templates = ref(asowp_templates.data);
const allTemplates = asowp_templates.data;
const categories = asowp_templates.categories;
const category = ref('');
const regularPrice = asowp_templates.regularPrice;
const templates_grid_cols = asowp_templates.grid_cols;
const design_page_url = asowp_templates.design_page_url;
const productId = asowp_templates.productId;
const buttons = asowp_templates.buttons || {};
const isAddingToCart = ref(false);
onMounted(()=>{
    if(document.querySelector("#asowp-templates-loader")){
        document.querySelector("#asowp-templates-loader").remove();
    }
})
const addToCart = async (template, index = 0)=>{
    isAddingToCart.value = true
    let redirecting = false
    try{
        template = await api.getTemplate(template.configId, index);
        // template.data.cartData.recaps.custom_price = ;
        const cart_data = {
            recaps:{...template.data.cartData,
                custom_price: parseFloat( (template.recaps?.customPrice||0) + template.basePrice
                    ).toFixed(2)
            },
            variation_id:productId,
            quantity:1
        }
        const add = await add_to_cart(asowp_data.ajax_url, cart_data,asowp_templates.frontend_nonce, false);
        redirecting = !!add?.redirecting;
        if(!add?.success){
            toastMessage(add?.message || "A problem occured while adding the product to the cart. Please try again.","error");
        }
    }finally{
        if(!redirecting){
            isAddingToCart.value = false;
        }
    }
}

function formatPrice(price,regularPrice) {
  let formattedPrice = parseFloat(
    price + parseFloat(regularPrice)
  ).toFixed(asowp_templates.decimals);

  switch (asowp_templates.currency_pos) {
    case "left":
      formattedPrice = asowp_templates.currencySymbol + formattedPrice;
      break;
    case "right":
      formattedPrice = formattedPrice + asowp_templates.currencySymbol;
      break;
    case "left_space":
      formattedPrice =
        asowp_templates.currencySymbol + " " + formattedPrice;
      break;
    case "right_space":
      formattedPrice =
        formattedPrice + " " + asowp_templates.currencySymbol;
      break;
  }

  // Remplacez le séparateur décimal et des milliers
  formattedPrice = formattedPrice.replace(
    ".",
    asowp_templates.decimalSep
  );
  formattedPrice = formattedPrice.replace(
    /(\d)(?=(\d{3})+(?!\d))/g,
    "$1" + asowp_templates.thousandSep
  );

  return formattedPrice;
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
