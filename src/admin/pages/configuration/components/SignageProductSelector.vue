<template>
  <div
    v-if="wizard?.category === 'signage'"
    class="asowp-bg-white asowp-p-6 asowp-rounded-xl asowp-border asowp-border-[#e5e7eb]"
  >
    <!-- Header -->
    <header class="asowp-mb-6">
      <h1 class="asowp-gap-1 asowp-flex" style="font-size: 1.25rem; font-weight: 600; color: #303030;">
        What product would you like to sell?
        <span
          v-if="wizard?.category"
          class="asowp-font-semibold asowp-text-[#303030] asowp-bg-[#b4fed2] asowp-rounded-full asowp-px-4 asowp-py-1 asowp-text-sm"
        >
          {{ categories.find((c) => c.id === wizard.category)?.tag }}
        </span>
        <span class="asowp-font-medium">/</span>
        <span
          v-if="currentProductCategory?.name"
          class="asowp-font-semibold asowp-text-[#303030] asowp-bg-[#b4fed2] asowp-rounded-full asowp-px-4 asowp-py-1 asowp-text-sm"
        >
          {{ currentProductCategory.name }}
        </span>
      </h1>

      <p class="asowp-text-sm asowp-text-gray-600 asowp-mt-1">
        Pick the product category and a sample that best represents what you’re selling.
      </p>
    </header>

    <!-- Pills Navigation (Signboard, Banners, Stickers) -->
    <div
      v-if="wizard.category === 'signage'"
      class="asowp-flex asowp-gap-2 asowp-flex-wrap asowp-mb-6"
    >
      <button
        v-for="cat in signageOption.productCategories"
        :key="cat.type"
        @click="handleCategoryChange(cat)"
        :class="[
          'asowp-px-4 asowp-py-1 asowp-cursor-pointer asowp-text-sm asowp-font-semibold asowp-rounded-full asowp-border transition-all',
          wizard.productType === cat.type
            ? 'asowp-bg-[#e0f2f1] asowp-text-[#016464] asowp-shadow-sm asowp-shadow-[#016464] asowp-border-solid asowp-border-[#016464]'
            : 'asowp-bg-gray-100 asowp-text-gray-700 asowp-border-transparent hover:asowp-bg-gray-200'
        ]"
      >
        {{ cat.name }}
      </button>
    </div>

    <!-- Tabs (Business & Office, Retail & Outdoor...) -->
    <div
      v-if="currentProductCategory"
      class="asowp-flex asowp-gap-1 asowp-border-t-0 asowp-border-l-0 asowp-border-r-0 asowp-border-b asowp-border-b-[1px] asowp-border-solid asowp-border-[#e6e6e6] asowp-mb-6"
    >
      <button
        v-for="group in currentProductCategory.productGroups"
        :key="group.name"
        @click="handleGroupChange(group)"
        :class="[
          'asowp-px-4 asowp-cursor-pointer asowp-py-2 asowp-text-sm asowp-font-semibold asowp-border-t-0 asowp-border-l-0 asowp-border-r-0 asowp-border-b-[1px] transition-colors asowp-flex asowp-items-center asowp-gap-2',
          selectedSubCategory === group.name
            ? 'asowp-border-b-[#016464] asowp-text-[#016464] asowp-bg-[#e0f2f1]'
            : 'asowp-border-b-[#e6e6e6] asowp-border-b-[0px] asowp-bg-transparent asowp-text-gray-600 hover:asowp-text-[#016464]'
        ]"
      >
        <span class="asowp-inline-flex asowp-items-center"></span>
        {{ group.name }}
      </button>
    </div>

    <!-- Product Cards -->
    <section v-if="currentProducts.length" class="asowp-mb-8">
      <div class="asowp-grid asowp-gap-4 md:asowp-grid-cols-4">
        <div
          v-for="product in currentProducts"
          :key="product.name"
          @click="emit('update:selectedProduct', product.name)"
          :class="[
            'asowp-bg-[#f5f5f5] asowp-rounded-2xl asowp-border asowp-border-gray-200 asowp-p-4 asowp-shadow-sm asowp-cursor-pointer transition-all',
            selectedProduct === product.name
              ? 'asowp-border-[#016464] asowp-ring-2 asowp-ring-[#016464]/20'
              : 'hover:asowp-shadow-md hover:asowp-border-gray-300 asowp-border-[1px] asowp-border-solid asowp-border-[#dbdbdb]'
          ]"
        >
          <h3 class="asowp-text-sm asowp-font-semibold asowp-text-gray-900 asowp-m-[0px]">
            {{ product.name }}
          </h3>

          <p class="asowp-text-xs asowp-text-gray-600 asowp-mt-1 asowp-mb-3 asowp-h-[25px]">
            {{ product.description || currentProductGroup?.description }}
          </p>

          <div class="asowp-flex asowp-items-center asowp-justify-between asowp-text-[11px] asowp-text-gray-500">
            <span>Click to select</span>
            <button
              @click.stop="openPreview(product)"
              class="asowp-text-[#016464] asowp-cursor-pointer asowp-font-semibold asowp-bg-transparent asowp-border-none"
            >
              Preview
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Tip -->
    <footer class="asowp-text-xs asowp-text-gray-500">
      Tip: You’ll configure the demo content and the user interaction mode in the next step.
    </footer>

    <!-- Actions -->
    <div class="asowp-flex asowp-justify-end asowp-gap-3 asowp-mt-8">
      <button
        @click="emit('go-back')"
        class="asowp-bg-white asowp-cursor-pointer asowp-border asowp-border-gray-300 asowp-text-gray-700 asowp-px-4 asowp-py-2 asowp-rounded-lg hover:asowp-bg-gray-50"
      >
        Back
      </button>

      <button
        @click="emit('go-next')"
        :disabled="!canNext"
        :class="[
          'asowp-px-5 asowp-cursor-pointer asowp-py-2 asowp-rounded-lg asowp-font-medium',
          canNext
            ? 'asowp-bg-[#016464] asowp-text-white hover:asowp-bg-[#028383]'
            : 'asowp-bg-gray-300 asowp-text-white asowp-cursor-not-allowed'
        ]"
      >
        Next
      </button>
    </div>

    <!-- Preview Modal -->
    <div
      v-if="showPreview"
      class="asowp-fixed asowp-inset-0 asowp-z-[1000] asowp-flex asowp-items-center asowp-justify-center"
    >
      <div class="asowp-absolute asowp-inset-0 asowp-bg-black asowp-bg-opacity-40" @click="closePreview"></div>

      <div
        class="asowp-relative asowp-w-[min(750px,95vw)] asowp-bg-white asowp-rounded-2xl asowp-shadow-xl asowp-overflow-hidden"
      >
        <div class="asowp-flex asowp-items-center asowp-justify-between asowp-px-5 asowp-py-3 asowp-border-b asowp-border-[#e5e5e5]">
          <div class="asowp-text-[16px] asowp-font-semibold">{{ previewProduct?.name }}</div>
          <button
            class="asowp-p-1 asowp-rounded-md hover:asowp-bg-[#f3f4f6] asowp-border-0 asowp-bg-transparent asowp-cursor-pointer"
            @click="closePreview"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div class="asowp-p-5 asowp-space-y-3">
          <p class="asowp-text-[13px] asowp-text-gray-600 asowp-m-0">
            {{ previewProduct?.description }}
          </p>

          <div class="asowp-flex asowp-items-center asowp-justify-center asowp-bg-[#f6f8fb] asowp-rounded-xl asowp-p-4">
            <button
              class="asowp-w-10 asowp-h-10 asowp-rounded-full asowp-border asowp-bg-white asowp-flex asowp-items-center asowp-justify-center asowp-mr-4 asowp-cursor-pointer"
              @click="prevImage"
              :disabled="!hasImages"
            >
              ‹
            </button>

            <div class="asowp-w-full asowp-max-w-[520px] asowp-h-[260px] asowp-bg-white asowp-rounded-lg asowp-flex asowp-items-center asowp-justify-center asowp-overflow-hidden">
              <img
                v-if="activePreviewImage"
                :src="activePreviewImage"
                :alt="previewProduct?.name"
                class="asowp-object-contain asowp-max-h-full asowp-max-w-full"
              />
              <div v-else class="asowp-text-gray-500 asowp-text-sm">No preview available</div>
            </div>

            <button
              class="asowp-w-10 asowp-h-10 asowp-rounded-full asowp-border asowp-bg-white asowp-flex asowp-items-center asowp-justify-center asowp-ml-4 asowp-cursor-pointer"
              @click="nextImage"
              :disabled="!hasImages"
            >
              ›
            </button>
          </div>

          <div class="asowp-text-center asowp-text-sm asowp-text-gray-600">
            {{ hasImages ? `${activePreviewIndex + 1} / ${previewImages.length}` : '—' }}
          </div>

          <div class="asowp-text-[12px] asowp-text-gray-600">
            Suggested interaction mode for this product:
            <span class="asowp-font-semibold asowp-text-[#016464]">
              {{ previewProduct?.materialType || 'simple' }}
            </span>
          </div>
        </div>

        <div class="asowp-flex asowp-justify-end asowp-gap-2 asowp-px-5 asowp-py-3 asowp-border-t asowp-border-[#e5e7eb]">
          <button
            class="asowp-px-4 asowp-py-1.5 asowp-rounded-md asowp-text-white asowp-bg-[#016464] hover:asowp-bg-[#028383] asowp-text-[13px] asowp-cursor-pointer"
            @click="closePreview"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";
import {signageOption} from "@/admin/utils/create-config.data";

const props = defineProps({
  wizard: {
    type: Object,
    required: true,
  },
  categories: {
    type: Array,
    required: true,
  },
  selectedCategory: {
    type: String,
    default: null,
  },
  selectedSubCategory: {
    type: String,
    default: null,
  },
  selectedProduct: {
    type: String,
    default: null,
  },
  canNext: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits([
  "update:selectedSubCategory",
  "update:selectedProduct",
  "update:selectedCategory",
  "goNext",
  "goBack",
]);

const previewProduct = ref(null);
const activePreviewIndex = ref(0);
const showPreview = ref(false);

const currentProductCategory = computed(() => {
  if (props.wizard.category !== "signage" || !props.wizard.productType) return null;
  return signageOption.productCategories?.find((cat) => cat.type === props.wizard.productType) || null;
});

const currentProductGroup = computed(() => {
  if (!currentProductCategory.value || !props.selectedSubCategory) return null;
  return currentProductCategory.value.productGroups?.find((group) => group.name === props.selectedSubCategory) || null;
});

const currentProducts = computed(() =>
  (currentProductGroup.value?.products || []).filter(Boolean)
);

const previewImages = computed(() => previewProduct.value?.image || []);
const hasImages = computed(() => previewImages.value.length > 0);
const activePreviewImage = computed(() => {
  if (!hasImages.value) return null;
  return previewImages.value[activePreviewIndex.value] || null;
});

const ensureDefaults = () => {
  if (props.wizard.category !== "signage") return;

  const categories = signageOption.productCategories || [];
  if (!props.wizard.productType && categories.length) {
    props.wizard.productType = categories[0].type;
  }

  const category = categories.find((cat) => cat.type === props.wizard.productType);
  if (!category) return;

  if (!props.selectedCategory || props.selectedCategory !== category.name) {
    emit("update:selectedCategory", category.name || null);
  }

  const hasGroup =
    props.selectedSubCategory &&
    category.productGroups?.some((g) => g.name === props.selectedSubCategory);

  if (!hasGroup) {
    const firstGroup = category.productGroups?.[0];
    emit("update:selectedSubCategory", firstGroup?.name || null);
    emit("update:selectedProduct", firstGroup?.products?.[0]?.name || null);
    return;
  }

  const group = category.productGroups.find((g) => g.name === props.selectedSubCategory);
  if (group && (!props.selectedProduct || !group.products?.some((p) => p.name === props.selectedProduct))) {
    emit("update:selectedProduct", group.products?.[0]?.name || null);
  }
};

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

const openPreview = (product) => {
  previewProduct.value = product;
  activePreviewIndex.value = 0;
  showPreview.value = true;
};

const closePreview = () => {
  showPreview.value = false;
  previewProduct.value = null;
  activePreviewIndex.value = 0;
};

const nextImage = () => {
  if (!hasImages.value) return;
  activePreviewIndex.value = (activePreviewIndex.value + 1) % previewImages.value.length;
};

const prevImage = () => {
  if (!hasImages.value) return;
  activePreviewIndex.value =
    (activePreviewIndex.value - 1 + previewImages.value.length) % previewImages.value.length;
};

onMounted(() => ensureDefaults());

watch(
  () => props.wizard.productType,
  () => ensureDefaults(),
  { immediate: true }
);

watch(
  () => props.selectedSubCategory,
  () => ensureDefaults()
);
</script>
