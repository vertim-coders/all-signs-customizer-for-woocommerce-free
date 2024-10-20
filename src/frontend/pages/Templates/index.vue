<template>
    <div class="asowp-templates asowp-py-6">
        <div class="asowp-w-full asowp-flex asowp-justify-center asowp-items-center asowp-my-4">
            <div v-if="categories.length>0" :class="`asowp-grid asowp-grid-cols-4 lg:asowp-grid-cols-8 asowp-gap-8 asowp-templates-categories`">
                <div @click="showTemplateForCategory('')" :class="`${category == '' ? 'asowp-border-solid asowp-border-x-0 asowp-border-y-0 asowp-border-b-2 asowp-border-[#000000]':''} asowp-cursor-pointer asowp-text-center`">{{ buttons.allTemplatesText ?? 'All' }}</div>
                <div v-for="cat in categories" @click="showTemplateForCategory(cat.value)" :class="`${category == cat.value ? 'asowp-border-solid asowp-border-x-0 asowp-border-y-0 asowp-border-b-2 asowp-border-[#000000]':''} asowp-cursor-pointer asowp-text-center`">{{ cat.name }}</div>
            </div>
        </div>
        <div :class="`asowp-grid md:asowp-grid-cols-2 lg:asowp-grid-cols-${templates_grid_cols} asowp-gap-8 asowp-templates-container`">
            <div v-for="(template, index) in templates" class="asowp-template-container asowp-border-[1px] asowp-border-solid asowp-border-[#c3cfd6] asowp-rounded asowp-bg-transparent">
                <div class="asowp-template-image-container asowp-flex asowp-justify-center asowp-items-center pb-2 asowp-h-[200px]">
                    <div class="asowp-w-full asowp-h-full asowp-flex asowp-items-center asowp-justify-center asowp-overflow-hidden asowp-object-cover">
                        <img class="asowp-w-full" v-if="template.prevImg && template.prevImg!=''" :src="template.prevImg" alt="">
                        <img class="asowp-w-full" v-if="!template.prevImg" src="../../../../assets/images/img_rectangle_noir.png" alt="">
                    </div>
                </div>
                <div class="asowp-template-details-container asowp-border-[1px] asowp-border-solid asowp-border-l-0 asowp-border-b-0 asowp-border-r-0 asowp-border-[#c3cfd6] asowp-p-4">
                    <span class="asowp-template-title asowp-font-bold">{{template.name}}</span>
                    <div class="asowp-template-size">{{template.data.templateData.sign ? template.data.templateData.sign.size.width + ' ' +template.data.templateData.sign.size.unit : 0}} x {{template.data.templateData.sign? template.data.templateData.sign.size.height + ' ' +template.data.templateData.sign.size.unit : 0}}</div>
                    <div><span class="asowp-font-bold asowp-template-price">{{ template.data.templateData.price ? formatPrice(parseFloat(template.data.templateData.price.value),0)  : formatPrice(0, template.basePrice) }}</span> {{ template.data.templateData.price ?template.data.templateData.price.textAfter :''}}</div>
                    <div class="asowp-space-y-3 asowp-py-3 asowp-template-details-buttons" v-if="template.data.templateData.sign">
                        <button @click="addToCart(template)" :class="`${template.enableAddToCart ? 'asowp-visible' : 'asowp-invisible'}`" class="asowp-templates-add_to_cart_button asowp-flex asowp-justify-center asowp-items-center asowp-bg-[#0374e3] asowp-rounded-[5px] asowp-w-full asowp-p-2.5">
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
                        <a :href="design_page_url+index" class="asowp-templates-customize_button asowp-text-white asowp-flex asowp-justify-center asowp-items-center asowp-bg-[#febd52] asowp-rounded-md asowp-w-full asowp-p-2.5 hover:asowp-bg-[#fcac29]">
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

const templates = ref(asowp_templates.data);
const allTemplates = asowp_templates.data;
const categories = asowp_templates.categories;
const category = ref('');
const regularPrice = asowp_templates.regularPrice;
const templates_grid_cols = asowp_templates.grid_cols;
const design_page_url = asowp_templates.design_page_url;
const productId = asowp_templates.productId;
const buttons = asowp_templates.pageConfigs.buttons;
const isAddingToCart = ref(false);
onMounted(()=>{
    if(document.querySelector("#asowp-templates-loader")){
        document.querySelector("#asowp-templates-loader").remove();
    }
})
const addToCart = async (template)=>{
    isAddingToCart.value = true
    const cart_data = {
        recaps:{...template.data.cartData
        },
        variation_id:productId,
        quantity:1
    }
    var add = await add_to_cart(asowp_data.ajax_url, cart_data,asowp_templates.frontend_nonce, false);
    if(!add.success){
        toastMessage(add.message,"error");
        isAddingToCart.value = false
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