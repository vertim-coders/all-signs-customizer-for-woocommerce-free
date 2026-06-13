<template>
  <div class="ascwo-templates ascwo-py-6">
    <div
      class="ascwo-w-full ascwo-flex ascwo-justify-center ascwo-items-center ascwo-my-4"
    >
      <div
        v-if="categories.length > 0"
        :class="`ascwo-grid ascwo-grid-cols-4 lg:ascwo-grid-cols-8 ascwo-gap-4 ascwo-templates-categories`"
      >
        <div
          @click="showTemplateForCategory('')"
          :class="`${
            category == ''
              ? 'ascwo-border-solid ascwo-border-x-0 ascwo-border-y-0 ascwo-border-b-2 ascwo-border-[#111827] ascwo-text-[#111827] ascwo-font-semibold ascwo-templates-category-btn--active'
              : 'ascwo-text-gray-600 hover:ascwo-text-gray-900'
          } ascwo-templates-category-btn ascwo-cursor-pointer ascwo-text-center ascwo-px-3 ascwo-py-2 ascwo-rounded-full hover:ascwo-bg-gray-100 ascwo-transition-colors`"
        >
          {{ buttons.allTemplatesText ?? "All" }}
        </div>
        <div
          v-for="cat in categories"
          @click="showTemplateForCategory(cat.value)"
          :class="`${
            category == cat.value
              ? 'ascwo-border-solid ascwo-border-x-0 ascwo-border-y-0 ascwo-border-b-2 ascwo-border-[#111827] ascwo-text-[#111827] ascwo-font-semibold ascwo-templates-category-btn--active'
              : 'ascwo-text-gray-600 hover:ascwo-text-gray-900'
          } ascwo-templates-category-btn ascwo-cursor-pointer ascwo-text-center ascwo-px-3 ascwo-py-2 ascwo-rounded-full hover:ascwo-bg-gray-100 ascwo-transition-colors`"
        >
          {{ cat.name }}
        </div>
      </div>
    </div>
    <div
      :class="`ascwo-grid md:ascwo-grid-cols-2 lg:ascwo-grid-cols-${templates_grid_cols} ascwo-gap-8 ascwo-templates-container`"
    >
      <div
        v-for="(template, index) in templates"
        class="ascwo-template-container ascwo-group ascwo-bg-white ascwo-border ascwo-border-solid ascwo-border-[#c3cfd6] ascwo-rounded ascwo-overflow-hidden ascwo-shadow-sm hover:ascwo-shadow-md ascwo-transition-shadow"
      >
        <div
          class="ascwo-template-image-container ascwo-relative ascwo-h-[260px] ascwo-bg-[#f3f4f6] ascwo-overflow-hidden"
        >
          <img
            v-if="template.prevImg && template.prevImg != ''"
            class="ascwo-absolute ascwo-inset-0 ascwo-w-full ascwo-h-full ascwo-object-cover ascwo-transition-transform ascwo-duration-300 group-hover:ascwo-scale-105"
            :src="template.prevImg"
            alt=""
          />
          <img
            v-if="template.realImg && template.realImg != ''"
            class="ascwo-absolute ascwo-inset-0 ascwo-w-full ascwo-h-full ascwo-object-cover ascwo-opacity-0 ascwo-transition-opacity ascwo-duration-300 group-hover:ascwo-opacity-100"
            :src="template.realImg"
            alt=""
          />
          <img
            v-if="!template.prevImg"
            class="ascwo-absolute ascwo-inset-0 ascwo-w-full ascwo-h-full ascwo-object-cover"
            src="../../../../assets/images/img_rectangle_noir.png"
            alt=""
          />
          <div
            class="ascwo-absolute ascwo-inset-0 ascwo-bg-gradient-to-t ascwo-from-black/40 ascwo-via-black/10 ascwo-to-transparent ascwo-opacity-0 ascwo-transition-opacity ascwo-duration-300 group-hover:ascwo-opacity-100"
          ></div>
        </div>
        <div
          class="ascwo-template-details-container ascwo-border-[1px] ascwo-border-solid ascwo-border-l-0 ascwo-border-b-0 ascwo-border-r-0 ascwo-border-[#c3cfd6] ascwo-p-4"
        >
          <span
            class="ascwo-template-title ascwo-font-bold ascwo-text-gray-900"
            >{{ template.name }}</span
          >
          <div class="ascwo-template-size ascwo-text-xs ascwo-text-gray-500">
            {{ template.recaps?.size ?? "" }}
          </div>
          <div class="ascwo-text-sm ascwo-text-gray-800">
            <span class="ascwo-font-bold ascwo-template-price">{{
              formatPrice(template.recaps?.customPrice || 0, template.basePrice)
            }}</span>
            {{ template.recaps?.priceType || "" }}
          </div>
          <div
            class="ascwo-space-y-3 ascwo-py-3 ascwo-template-details-buttons"
            v-if="template.recaps"
          >
            <button
              @click="addToCart(template, index)"
              :class="`${
                template.enableAddToCart ? 'ascwo-visible' : 'ascwo-invisible'
              }`"
              class="ascwo-templates-add_to_cart_button ascwo-flex ascwo-justify-center ascwo-items-center ascwo-gap-2 ascwo-bg-[#0374e3] ascwo-rounded-[5px] ascwo-w-full ascwo-p-2.5 ascwo-text-white ascwo-text-sm ascwo-font-semibold hover:ascwo-bg-[#0b5fcc] ascwo-transition-colors"
            >
              <svg
                v-if="!isAddingToCart"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="ascwo-w-6 ascwo-h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                />
              </svg>
              <svg
                v-if="isAddingToCart"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 100 100"
                preserveAspectRatio="xMidYMid"
                class="ascwo-w-6 ascwo-h-6"
              >
                <circle
                  cx="50"
                  cy="50"
                  r="32"
                  stroke-width="8"
                  stroke="currentColor"
                  stroke-dasharray="50.26548245743669 50.26548245743669"
                  fill="none"
                  stroke-linecap="round"
                >
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    repeatCount="indefinite"
                    dur="1s"
                    keyTimes="0;1"
                    values="0 50 50;360 50 50"
                  ></animateTransform>
                </circle>
              </svg>
              {{ buttons.templateAddToCartButton }}
            </button>
            <a
              :href="design_page_url + index"
              class="ascwo-templates-customize_button ascwo-text-white ascwo-flex ascwo-justify-center ascwo-items-center ascwo-gap-2 ascwo-bg-[#febd52] ascwo-rounded-md ascwo-w-full ascwo-p-2.5 ascwo-text-sm ascwo-font-semibold hover:ascwo-bg-[#fcac29] ascwo-transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="ascwo-w-6 ascwo-h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                />
              </svg>
              {{ buttons.templateDesignButton }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { add_to_cart } from "@/frontend/utils/functions";
import { onMounted, ref } from "vue";
import api from "@/frontend/api";

const templates = ref(ascwo_templates.data);
const allTemplates = ascwo_templates.data;
const categories = ascwo_templates.categories;
const category = ref("");
const regularPrice = ascwo_templates.regularPrice;
const templates_grid_cols = ascwo_templates.grid_cols;
const design_page_url = ascwo_templates.design_page_url;
const productId = ascwo_templates.productId;
const buttons = ascwo_templates.buttons || {};
const isAddingToCart = ref(false);
onMounted(() => {
  if (document.querySelector("#ascwo-templates-loader")) {
    document.querySelector("#ascwo-templates-loader").remove();
  }
});
const addToCart = async (template, index = 0) => {
  isAddingToCart.value = true;
  let redirecting = false;
  try {
    template = await api.getTemplate(template.configId, index);
    // template.data.cartData.recaps.custom_price = ;
    const cart_data = {
      recaps: {
        ...template.data.cartData,
        custom_price: parseFloat(
          (template.recaps?.customPrice || 0) + template.basePrice,
        ).toFixed(2),
      },
      variation_id: productId,
      quantity: 1,
    };
    const add = await add_to_cart(
      ascwo_data.ajax_url,
      cart_data,
      ascwo_templates.frontend_nonce,
      false,
    );
    redirecting = !!add?.redirecting;
    if (!add?.success) {
      toastMessage(
        add?.message ||
          "A problem occured while adding the product to the cart. Please try again.",
        "error",
      );
    }
  } finally {
    if (!redirecting) {
      isAddingToCart.value = false;
    }
  }
};

function formatPrice(price, regularPrice) {
  let formattedPrice = parseFloat(price + parseFloat(regularPrice)).toFixed(
    ascwo_templates.decimals,
  );

  switch (ascwo_templates.currency_pos) {
    case "left":
      formattedPrice = ascwo_templates.currencySymbol + formattedPrice;
      break;
    case "right":
      formattedPrice = formattedPrice + ascwo_templates.currencySymbol;
      break;
    case "left_space":
      formattedPrice = ascwo_templates.currencySymbol + " " + formattedPrice;
      break;
    case "right_space":
      formattedPrice = formattedPrice + " " + ascwo_templates.currencySymbol;
      break;
  }

  // Remplacez le séparateur décimal et des milliers
  formattedPrice = formattedPrice.replace(".", ascwo_templates.decimalSep);
  formattedPrice = formattedPrice.replace(
    /(\d)(?=(\d{3})+(?!\d))/g,
    "$1" + ascwo_templates.thousandSep,
  );

  return formattedPrice;
}

const showTemplateForCategory = (key) => {
  category.value = key;
  if (key != "") {
    templates.value = allTemplates.filter((t) => t.categoryId == key);
  } else {
    templates.value = allTemplates;
  }
};
</script>
