<template>
  <div v-if="wizard?.category === 'signage'">
    <!-- Header -->
    <div class="asowp-mb-8">
      <h2 class="asowp-text-[22px] asowp-font-bold asowp-text-[#1a1a1a] asowp-mb-2">
        {{ __('What product would you like to sell?', 'all-signs-options-pro') }}
        <span class="asowp-inline-flex asowp-gap-2 asowp-ml-3">
          <span v-for="(crumb, idx) in breadcrumbTags" :key="idx"
            :class="['asowp-text-[11px] asowp-px-3 asowp-py-1 asowp-rounded-full asowp-font-bold', idx === breadcrumbTags.length-1 ? 'asowp-bg-[#e1f0ef] asowp-text-[#006e52]' : 'asowp-bg-[#f1f1f1] asowp-text-[#616161]']">
            {{ crumb }}
          </span>
        </span>
      </h2>
      <p class="asowp-text-[14px] asowp-text-[#616161]">
        {{ __('Pick the product category and a sample that best represents what you’re selling.', 'all-signs-options-pro') }}
      </p>
    </div>

    <!-- Category Selector (Tabs Style) -->
    <div class="asowp-flex asowp-gap-1 asowp-border-b asowp-border-solid asowp-border-[#e1e3e5] asowp-mb-8">
      <button
        v-for="cat in signageOption.productCategories"
        :key="cat.type"
        @click="handleCategoryChange(cat)"
        :class="[
          'asowp-px-6 asowp-py-3 asowp-text-[14px] asowp-font-bold asowp-transition-all asowp-border-b-2 asowp-border-solid asowp-cursor-pointer',
          wizard.productType === cat.type
            ? 'asowp-border-[#006e52] asowp-text-[#006e52]'
            : 'asowp-border-transparent asowp-text-[#616161] hover:asowp-text-[#1a1a1a] hover:asowp-border-gray-300'
        ]"
      >
        {{ cat.name }}
      </button>
    </div>

    <!-- Sub-Category Tabs (Pills Style) -->
    <div v-if="currentProductCategory" class="asowp-flex asowp-gap-2 asowp-mb-8 asowp-flex-wrap">
      <button
        v-for="group in currentProductCategory.productGroups"
        :key="group.name"
        @click="handleGroupChange(group)"
        :class="[
          'asowp-px-4 asowp-py-1.5 asowp-rounded-full asowp-text-[13px] asowp-font-bold asowp-border asowp-border-solid asowp-transition-all asowp-cursor-pointer',
          selectedSubCategory === group.name
            ? 'asowp-bg-[#006e52] asowp-border-[#006e52] asowp-text-white'
            : 'asowp-bg-white asowp-border-[#c1c4c7] asowp-text-[#616161] hover:asowp-bg-gray-50'
        ]"
      >
        {{ group.name }}
      </button>
    </div>

    <!-- Product Grid -->
    <div v-if="currentProducts.length" class="asowp-grid md:asowp-grid-cols-3 asowp-gap-4">
      <div
        v-for="product in currentProducts"
        :key="product.name"
        @click="emit('update:selectedProduct', product.name)"
        :class="[
          'asowp-p-5 asowp-rounded-2xl asowp-border asowp-border-solid asowp-transition-all asowp-cursor-pointer group',
          selectedProduct === product.name
            ? 'asowp-border-[#006e52] asowp-bg-[#f8faf9]'
            : 'asowp-border-[#e1e3e5] asowp-bg-white hover:asowp-border-[#006e52]'
        ]"
      >
        <div class="asowp-flex asowp-items-center asowp-justify-between asowp-mb-2">
          <h3 class="asowp-text-[15px] asowp-font-bold asowp-text-[#1a1a1a]">{{ product.name }}</h3>
          <div v-if="selectedProduct === product.name" class="asowp-w-5 asowp-h-5 asowp-rounded-full asowp-bg-[#006e52] asowp-flex asowp-items-center asowp-justify-center">
            <CheckIcon class="asowp-w-3 asowp-h-3 asowp-text-white" />
          </div>
        </div>
        <p class="asowp-text-[13px] asowp-text-[#616161] asowp-leading-relaxed asowp-mb-4 asowp-line-clamp-2">
          {{ product.description || currentProductGroup?.description }}
        </p>
        <div class="asowp-flex asowp-items-center asowp-justify-between">
          <span class="asowp-text-[12px] asowp-font-medium asowp-text-[#b5b5b5] group-hover:asowp-text-[#006e52]">
            {{ __('Click to select', 'all-signs-options-pro') }}
          </span>
          <button @click.stop="openPreview(product)" class="asowp-w-7 asowp-h-7 asowp-rounded-full asowp-bg-white asowp-border asowp-border-solid asowp-border-[#e1e3e5] asowp-flex asowp-items-center asowp-justify-center asowp-text-[#b5b5b5] hover:asowp-text-[#1a1a1a] asowp-cursor-pointer">
            <EyeIcon class="asowp-w-4 asowp-h-4" />
          </button>
        </div>
      </div>
    </div>

    <!-- Preview Modal -->
    <div v-if="showPreview" class="asowp-fixed asowp-inset-0 asowp-z-[1000] asowp-flex asowp-items-center asowp-justify-center">
      <div class="asowp-absolute asowp-inset-0 asowp-bg-black/40" @click="closePreview"></div>
      <div class="asowp-relative asowp-w-[min(750px,95vw)] asowp-bg-white asowp-rounded-3xl asowp-shadow-2xl asowp-overflow-hidden">
        <div class="asowp-flex asowp-items-center asowp-justify-between asowp-px-6 asowp-py-4 asowp-border-b asowp-border-solid asowp-border-[#e1e3e5]">
          <h3 class="asowp-text-[18px] asowp-font-bold asowp-text-[#1a1a1a]">{{ previewProduct?.name }}</h3>
          <button @click="closePreview" class="asowp-p-2 asowp-rounded-full hover:asowp-bg-gray-100 asowp-border-0 asowp-bg-transparent asowp-cursor-pointer">
            <XIcon class="asowp-w-5 asowp-h-5 asowp-text-[#616161]" />
          </button>
        </div>
        <div class="asowp-p-8">
          <p class="asowp-text-[14px] asowp-text-[#616161] asowp-mb-6">{{ previewProduct?.description }}</p>
          <div class="asowp-bg-[#f9fafb] asowp-rounded-2xl asowp-p-6 asowp-flex asowp-items-center asowp-justify-center asowp-min-h-[300px] asowp-relative">
            <button @click="prevImage" class="asowp-absolute asowp-left-4 asowp-w-10 asowp-h-10 asowp-rounded-full asowp-bg-white asowp-border asowp-border-solid asowp-border-[#e1e3e5] asowp-flex asowp-items-center asowp-justify-center asowp-shadow-sm asowp-cursor-pointer hover:asowp-bg-gray-50">
              <ChevronLeftIcon class="asowp-w-6 asowp-h-6 asowp-text-[#1a1a1a]" />
            </button>
            <div class="asowp-w-full asowp-h-[260px] asowp-flex asowp-items-center asowp-justify-center">
              <img v-if="activePreviewImage" :src="activePreviewImage" class="asowp-max-w-full asowp-max-h-full asowp-object-contain" />
              <div v-else class="asowp-text-gray-400"><ImageIcon class="asowp-w-12 asowp-h-12" /></div>
            </div>
            <button @click="nextImage" class="asowp-absolute asowp-right-4 asowp-w-10 asowp-h-10 asowp-rounded-full asowp-bg-white asowp-border asowp-border-solid asowp-border-[#e1e3e5] asowp-flex asowp-items-center asowp-justify-center asowp-shadow-sm asowp-cursor-pointer hover:asowp-bg-gray-50">
              <ChevronRightIcon class="asowp-w-6 asowp-h-6 asowp-text-[#1a1a1a]" />
            </button>
          </div>
        </div>
        <div class="asowp-px-6 asowp-py-4 asowp-bg-[#fbfcfc] asowp-border-t asowp-border-solid asowp-border-[#e1e3e5] asowp-flex asowp-justify-end">
          <button @click="closePreview" class="asowp-px-6 asowp-py-2 asowp-bg-white asowp-border asowp-border-solid asowp-border-[#c1c4c7] asowp-rounded-xl asowp-text-[14px] asowp-font-bold asowp-text-[#1a1a1a] asowp-cursor-pointer hover:asowp-bg-gray-50">
            {{ __('Close', 'all-signs-options-pro') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";
import {signageOption} from "@/admin/utils/create-config.data";
import {
  CheckIcon,
  EyeIcon,
  ImageIcon,
  XIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from 'lucide-vue-next';
import { __ } from "@wordpress/i18n";

const props = defineProps({
  wizard: { type: Object, required: true },
  selectedCategory: { type: String, default: null },
  selectedSubCategory: { type: String, default: null },
  selectedProduct: { type: String, default: null },
  canNext: { type: Boolean, default: false },
});

const emit = defineEmits(["update:selectedSubCategory", "update:selectedProduct", "update:selectedCategory", "goNext", "goBack"]);

const previewProduct = ref(null);
const activePreviewIndex = ref(0);
const showPreview = ref(false);

const currentProductCategory = computed(() => signageOption.productCategories?.find((cat) => cat.type === props.wizard.productType) || null);
const currentProductGroup = computed(() => currentProductCategory.value?.productGroups?.find((group) => group.name === props.selectedSubCategory) || null);
const currentProducts = computed(() => (currentProductGroup.value?.products || []).filter(Boolean));

const breadcrumbTags = computed(() => {
  const crumbs = [];
  if (currentProductCategory.value?.name) crumbs.push(currentProductCategory.value.name);
  if (props.selectedSubCategory) crumbs.push(props.selectedSubCategory);
  if (props.selectedProduct) crumbs.push(props.selectedProduct);
  return crumbs;
});

const previewImages = computed(() => previewProduct.value?.image || []);
const activePreviewImage = computed(() => previewImages.value[activePreviewIndex.value] || null);

const handleCategoryChange = (cat) => {
  props.wizard.productType = cat.type;
  const firstGroup = cat.productGroups?.[0];
  emit("update:selectedCategory", cat?.name || null);
  emit("update:selectedSubCategory", firstGroup?.name || null);
  emit("update:selectedProduct", firstGroup?.products?.[0]?.name || null);
};

const handleGroupChange = (group) => {
  emit("update:selectedSubCategory", group.name);
  emit("update:selectedProduct", group.products?.[0]?.name || null);
};

const openPreview = (product) => { previewProduct.value = product; activePreviewIndex.value = 0; showPreview.value = true; };
const closePreview = () => { showPreview.value = false; previewProduct.value = null; };
const nextImage = () => { if (previewImages.value.length) activePreviewIndex.value = (activePreviewIndex.value + 1) % previewImages.value.length; };
const prevImage = () => { if (previewImages.value.length) activePreviewIndex.value = (activePreviewIndex.value - 1 + previewImages.value.length) % previewImages.value.length; };

onMounted(() => {
  if (!props.wizard.productType && signageOption.productCategories?.length) handleCategoryChange(signageOption.productCategories[0]);
});
</script>
