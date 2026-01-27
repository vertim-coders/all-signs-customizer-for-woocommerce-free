<template>
  <div>
    <!-- create a new configuration -->
    <!-- WIZARD: header + stepper -->
    <div
      v-if="isWizard || (isEdit && step === 4)"
      class="asowp-sticky asowp-border asowp-rounded-[13px] asowp-top-[20px] asowp-z-[50] asowp-bg-white asowp-border-[#e6e6e6]"
      style="border: 1px solid #e6e6e6"
    >
      <div class="asowp-px-4 asowp-pt-4 asowp-pb-3">
        <div class="asowp-flex asowp-items-start asowp-justify-between asowp-gap-3">
          <h2 class="asowp-m-0 asowp-text-[1.25rem] asowp-font-bold asowp-text-[#303030]">
            {{ isEdit ? __('Edit configuration', 'all-signs-options-pro') : __('Create new configuration', 'all-signs-options-pro') }}
          </h2>
          <button
            type="button"
            class="asowp-bg-transparent asowp-border asowp-border-solid asowp-border-[#016464] asowp-text-[#016464] asowp-rounded-md asowp-px-3 asowp-py-1 asowp-text-[12px] asowp-font-semibold asowp-cursor-pointer hover:asowp-bg-[#016464] hover:asowp-text-white"
            @click="router.push({ name: 'configurations' })"
          >
            {{ __("Back to configurations", "all-signs-options-pro") }}
          </button>
        </div>
        <div class="asowp-mt-[0.2rem] asowp-text-[12px]">
          {{ __("Step", "all-signs-options-pro") }} {{ isEdit ? 4 : wizard.step }} {{ __("of 4", "all-signs-options-pro") }}
        </div>
        <div
          class="asowp-flex asowp-items-center asowp-space-x-2 asowp-mt-[0.3rem] asowp-h-[6px]"
        >
          <div
            v-for="n in 4"
            :key="n"
            :class="[
              'asowp-h-[6px] asowp-rounded-full asowp-transition-all',
              n <= (isEdit ? 4 : wizard.step)
                ? 'asowp-bg-[#016464] asowp-w-16'
                : 'asowp-bg-[#e5e7eb] asowp-w-10',
            ]"
          />
        </div>
      </div>
    </div>

    <!-- STEP 1: Choose a product category -->
    <div
      v-if="isWizard && wizard.step === 1"
      class="asowp-p-4 asowp-border asowp-rounded-[13px] asowp-border-[#e6e6e6] asowp-bg-[#fff]"
    >
      <div class="asowp-text-[1.25rem] asowp-font-bold asowp-text-[#303030]">
         {{ __("Select the signage domain", "all-signs-options-pro") }}
         <span v-if="wizard.category" class="asowp-font-semibold asowp-text-[#303030] asowp-bg-[#b4fed2] asowp-rounded-full asowp-px-4 asowp-py-1 asowp-text-sm">
           {{ categories.find((c) => c.id === wizard.category)?.tag }}
         </span>
      </div>
      <p
        class="asowp-text-[13px] asowp-text-gray-600 asowp-mt-[8px] asowp-mb-[25px]"
      >
        {{ __("Select a domain so we can prepare the matching product types for your next step.", "all-signs-options-pro") }}
      </p>

      <div
        class="asowp-grid asowp-grid-cols-1 md:asowp-grid-cols-3" style="gap: 1rem !important;"
      >
        <template v-for="cat in categories" :key="cat.id">
          <!-- Style spécial pour Signs, Apparel et Objects -->
          <div
            v-if="cat.id === 'signage' || cat.id === 'apparel' || cat.id === 'objects'"
            @click="!cat.disabled && (wizard.category = cat.id)"
            :class="[
              'asowp-flex asowp-flex-col asowp-gap-[10px] asowp-cursor-pointer asowp-bg-[rgb(245,245,245)] asowp-text-black asowp-rounded-[20px] asowp-border-[0.07em] asowp-border-solid asowp-border-[rgb(189,189,189)] asowp-transition-[50ms] asowp-overflow-hidden',
              wizard.category === cat.id
                ? 'asowp-shadow-[rgba(1,100,100,0.8)_0px_0px_4px_2px]'
                : '',
              cat.disabled ? 'asowp-cursor-not-allowed' : '',
            ]"
          >
            <!-- header avec gradient spécifique -->
            <div
              :class="[
                'asowp-relative asowp-w-full asowp-h-[150px]',
                cat.id === 'signage'
                  ? 'asowp-bg-gradient-to-br asowp-from-[rgb(220,220,220)] asowp-via-[rgb(235,248,225)] asowp-to-[rgb(235,248,225)]'
                  : cat.id === 'apparel'
                    ? 'asowp-bg-gradient-to-br asowp-from-[rgb(178,223,219)] asowp-via-[rgb(224,242,241)] asowp-to-[rgb(235,248,225)]'
                    : 'asowp-bg-gradient-to-br asowp-from-[rgb(248,187,208)] asowp-via-[rgb(252,228,236)] asowp-to-[rgb(235,248,225)]',
              ]"
            >
              <span
                class="asowp-absolute asowp-top-[15px] asowp-left-[15px] asowp-flex asowp-bg-white asowp-text-[rgb(66,66,66)] asowp-text-[12px] asowp-rounded-[20px] asowp-px-[10px] asowp-py-[1px]"
              >
                {{ cat.tag }}
              </span>
              <span
                class="asowp-absolute asowp-top-[25px] asowp-right-[25px] asowp-flex asowp-bg-white asowp-text-[rgb(66,66,66)] asowp-text-[12px] asowp-rounded-[16px] asowp-p-[10px] asowp-shadow-[rgb(189,189,189)_0px_1px_4px]"
              >
                <!-- SVG pour Signs (desktop) -->
                <svg
                  v-if="cat.id === 'signage'"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-hidden="true"
                >
                  <rect width="20" height="14" x="2" y="3" rx="2"></rect>
                  <line x1="8" x2="16" y1="21" y2="21"></line>
                  <line x1="12" x2="12" y1="17" y2="21"></line>
                </svg>
                <!-- SVG pour Textile (tshirt) -->
                <svg
                  v-else-if="cat.id === 'apparel'"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-hidden="true"
                >
                  <path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"></path>
                </svg>
                <!-- SVG pour Goodies (cup/trash) -->
                <svg
                  v-else-if="cat.id === 'objects'"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-hidden="true"
                >
                  <path d="m6 8 1.75 12.28a2 2 0 0 0 2 1.72h4.54a2 2 0 0 0 2-1.72L18 8"></path>
                  <path d="M5 8h14"></path>
                  <path d="M7 15a6.47 6.47 0 0 1 5 0 6.47 6.47 0 0 0 5 0"></path>
                  <path d="m12 8 1-6h2"></path>
                </svg>
              </span>
            </div>

            <!-- body -->
            <div class="asowp-flex asowp-flex-col asowp-px-[15px] asowp-pt-[6px] asowp-pb-[6px]">
              <div class="asowp-inline-flex asowp-items-center asowp-gap-2 asowp-flex-wrap">
                <p class="asowp-text-[18px] asowp-m-[0px] asowp-font-[600]">{{ cat.title }}</p>
                <span
                  v-if="cat.comingSoon"
                  class="asowp-flex asowp-bg-[#e5f0ff] asowp-text-[#2563eb] asowp-text-[11px] asowp-px-2 asowp-py-[2px] asowp-rounded"
                >
                  {{ __("Coming soon", "all-signs-options-pro") }}
                </span>
                <span
                  v-else-if="wizard.category === cat.id"
                  class="asowp-flex asowp-bg-[rgba(1,100,100,0.2)] asowp-text-[rgba(1,100,100,0.8)] asowp-text-[10px] asowp-rounded-[20px] asowp-px-1 asowp-py-[0.5px]"
                >
                  {{ __("selected", "all-signs-options-pro") }}
                </span>
              </div>
              <div class="asowp-flex asowp-flex-col">
                <p class="asowp-text-[rgb(66,66,66)] asowp-my-[10px] asowp-font-normal">
                  {{ __("This domain covers various products such as:", "all-signs-options-pro") }}
                </p>
                <div class="asowp-flex asowp-gap-[5px]">
                  <span
                    v-for="t in cat.examples"
                    :key="t"
                    class="asowp-flex asowp-bg-[rgb(224,242,241)] asowp-text-[rgb(66,66,66)] asowp-text-[11.5px] asowp-rounded-[20px] asowp-px-2 asowp-py-[1px] asowp-border-2 asowp-border-solid asowp-border-[rgb(224,224,224)]"
                  >
                    {{ t }}
                  </span>
                </div>
              </div>
            </div>

            <!-- footer -->
            <div
              class="asowp-flex asowp-gap-[10px] asowp-justify-between asowp-items-center asowp-px-[15px] asowp-py-[10px]"
            >
              <p class="asowp-text-gray-500 asowp-text-[12px] asowp-font-normal">
                {{ __("Click to choose", "all-signs-options-pro") }}
              </p>
              <span
                :class="[
                  'asowp-flex asowp-p-[5px] asowp-border-2 asowp-border-solid asowp-rounded-[10px]',
                  cat.disabled || cat.comingSoon
                    ? 'asowp-border-[rgb(220,220,220)]'
                    : 'asowp-border-[rgba(1,100,100,0.8)]',
                ]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="asowp-w-5 asowp-h-5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m8.25 4.5 7.5 7.5-7.5 7.5"
                  />
                </svg>
              </span>
            </div>
          </div>

          <!-- Style original pour les autres catégories -->
          <button
            v-else
            :disabled="cat.disabled"
            @click="!cat.disabled && (wizard.category = cat.id)"
            :class="[
              'asowp-text-left asowp-pl-[0px] asowp-pr-[0px] asowp-rounded-xl asowp-border asowp-shadow-sm asowp-overflow-hidden',
              wizard.category === cat.id
                ? 'asowp-border-[#70b8b8] asowp-ring-2 asowp-ring-[#016464]/50'
                : 'asowp-border-[#e5e7eb]',
              cat.comingSoon
                ? 'asowp-opacity-60 asowp-cursor-not-allowed'
                : 'asowp-cursor-pointer',
            ]"
          >
            <!-- header avec gradient spécifique -->
            <div
              :class="[
                'asowp-p-4 asowp-pb-[80px] asowp-bg-gradient-to-br',
                cat.gradient,
              ]"
            >
              <span
                class="asowp-inline-block asowp-font-semibold asowp-text-[11px] asowp-px-2 asowp-py-[2px] asowp-rounded-full asowp-bg-[#fff] asowp-text-gray-700"
              >
                {{ cat.tag }}
              </span>
              <div
                class="asowp-float-right asowp-w-[2.5rem] asowp-h-[2.5rem] asowp-rounded-[15px] asowp-bg-white asowp-flex asowp-items-center asowp-justify-center asowp-shadow"
              >
                <component v-if="CategoryIcons && cat.icon && CategoryIcons[cat.icon]" :is="CategoryIcons[cat.icon]" />
              </div>
            </div>

            <!-- body -->
            <div class="asowp-p-4">
              <div class="asowp-text-[16px] asowp-font-semibold asowp-mb-1">
                {{ cat.title }}
                <span
                  v-if="cat.comingSoon"
                  class="asowp-ml-2 asowp-text-[11px] asowp-bg-[#e5f0ff] asowp-text-[#2563eb] asowp-px-2 asowp-py-[2px] asowp-rounded"
                >
                  {{ __("Coming soon", "all-signs-options-pro") }}
                </span>
                <span
                  v-else-if="wizard.category === cat.id"
                  class="asowp-ml-2 asowp-text-[11px] asowp-bg-[#e6fbf1] asowp-text-[#059669] asowp-px-2 asowp-py-[2px] asowp-rounded"
                >
                  {{ __("selected", "all-signs-options-pro") }}
                </span>
              </div>
              <p class="asowp-text-[13px] asowp-text-gray-600 asowp-mb-3">
                {{ __("This domain covers various products such as:", "all-signs-options-pro") }}
              </p>
              <div class="asowp-flex asowp-flex-wrap asowp-gap-2 asowp-mb-4">
                <span
                  v-for="t in cat.examples"
                  :key="t"
                  class="asowp-text-[11px] asowp-px-2 asowp-py-[2px] asowp-rounded-full asowp-bg-[#e0f2f1] asowp-text-gray-700"
                >
                  {{ t }}
                </span>
              </div>
              <div class="asowp-flex asowp-justify-between asowp-items-center">
                <span class="asowp-text-[12px] asowp-text-gray-500"
                  >{{ __("Click to choose", "all-signs-options-pro") }}</span
                >
                <span
                  class="asowp-w-8 asowp-h-8 asowp-rounded-[7px] asowp-border asowp-flex asowp-items-center asowp-justify-center"
                  :class="
                    wizard.category === cat.id
                      ? 'asowp-border-[#016464] asowp-text-[#016464]'
                      : 'asowp-border-gray-300 asowp-text-gray-400'
                  "
                  style="border: 1px solid"
                >
                  <svg
                    class="asowp-w-4 asowp-h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      d="M9 5l7 7-7 7"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </span>
              </div>
            </div>
          </button>
        </template>
      </div>
      <!-- footer actions -->
      <div
        class="asowp-flex asowp-justify-between asowp-items-center asowp-mt-[25px]"
      >
        <p class="asowp-text-[12px] asowp-text-gray-500 asowp-m-0">
          {{ __("Tip: The next steps will let you pick the product type and how customers can personalize it", "all-signs-options-pro") }}
        </p>
        <div class="asowp-flex asowp-gap-3 asowp-items-center">
          <button
            @click="goBack"
            class="asowp-flex asowp-cursor-pointer asowp-items-center asowp-gap-2 asowp-text-gray-600 asowp-bg-white asowp-border asowp-border-gray-300 asowp-rounded-lg asowp-px-4 asowp-py-2 asowp-hover:asowp-bg-gray-50"
          >
            {{ __("Back", "all-signs-options-pro") }}
          </button>
          <button
            @click="goNext"
            :disabled="!canNext"
            :class="[
              'asowp-rounded-lg asowp-cursor-pointer asowp-px-5 asowp-py-2 asowp-text-white',
              canNext
                ? 'asowp-bg-[#016464] hover:asowp-bg-[#028383]'
                : 'asowp-bg-gray-300 asowp-cursor-not-allowed',
            ]"
          >
            {{ __("Next", "all-signs-options-pro") }}
          </button>
        </div>
      </div>
    </div>

    <SignageProductSelector
      v-if="isWizard && wizard.step === 2"
      :wizard="wizard"
      :categories="categories"
      v-model:selected-category="selectedCategory"
      v-model:selected-sub-category="selectedSubCategory"
      v-model:selected-product="selectedProduct"
      :can-next="canNext"
      @go-next="goNext"
      @go-back="goBack"
    />


    <!-- STEP 3: Select material type and Include demo data -->
    <div
      v-if="isWizard && wizard.step === 3"
      class="asowp-p-4 asowp-rounded-[13px] asowp-bg-[#fff]"
      style="border: 1px solid #e6e6e6"
    >
        <div class="asowp-text-[18px] asowp-font-semibold">
          {{ __("Add product template for fast setup", "all-signs-options-pro") }} 
          <span class="asowp-inline-flex asowp-gap-2 asowp-flex-wrap asowp-align-middle">
            <span
              v-for="(crumb, idx) in breadcrumbTags"
              :key="`crumb-${idx}`"
              :class="[
                'asowp-font-semibold asowp-rounded-full asowp-px-4 asowp-py-1 asowp-text-sm',
                idx === breadcrumbTags.length - 1
                  ? 'asowp-bg-[#b4fed2] asowp-text-[#303030]'
                  : 'asowp-bg-[#e5e7eb] asowp-text-[#6b7280]'
              ]"
            >
              {{ crumb }}
            </span>
          </span>
        </div>
        <p
          class="asowp-text-[13px] asowp-text-gray-600 asowp-mt-[8px] asowp-mb-[20px]"
        >
          {{ __("Choose a starter template whose demo content matches your product.", "all-signs-options-pro") }}
        </p>
        <!-- Include Demo Data Section -->
      <div class="asowp-mt-[20px]">
        <!-- Toggle Yes / No -->
        <div class="asowp-border asowp-rounded-[15px] asowp-bg-[#f5f5f5] asowp-p-5" style="border:1px solid #bdbdbd;">
          <div class="asowp-flex asowp-items-center asowp-justify-between">
            <div>
              <div class="asowp-text-[16px] asowp-font-bold asowp-mb-[15px]">Include demo data?</div>
              <div class="asowp-text-[13px] asowp-text-[#616161]">
                {{ __("Preload a template to start faster. You can still customize everything later.", "all-signs-options-pro") }}
              </div>
            </div>

            <div class="asowp-flex asowp-gap-2">
              <button type="button"
                  @click="wizard.includeDemo=false"
                  :class="['asowp-min-w-[30px] asowp-cursor-pointer asowp-rounded-md asowp-border asowp-px-3 asowp-py-1.5',
                          !wizard.includeDemo ? 'asowp-text-[#016464] asowp-border-[#70b8b8] asowp-ring-2 asowp-ring-[#016464]/50'
                                              : 'asowp-text-gray-700 asowp-border-[#e5e7eb]']">
                  {{ __("No", "all-signs-options-pro") }}
              </button>
              <button type="button"
                  @click="enableDemoInline()"
                  :class="['asowp-min-w-[30px] asowp-cursor-pointer asowp-rounded-md asowp-border asowp-px-3 asowp-py-1.5',
                          wizard.includeDemo ? 'asowp-text-[#016464] asowp-border-[#70b8b8] asowp-ring-2 asowp-ring-[#016464]/50'
                                              : 'asowp-text-gray-700 asowp-border-[#e5e7eb]']">
                  {{  __("Yes", "all-signs-options-pro") }}
              </button>
            </div>
          </div>
        </div>
        <div v-if="wizard.includeDemo" class="asowp-mt-3 asowp-text-[13px] asowp-text-[#303030]">
          {{ __("Demo data selected:", "all-signs-options-pro") }} <span class="asowp-font-semibold">{{ selectedProduct }}</span>
        </div>
      </div>
      <!-- Material Type Section -->
      <div class="asowp-text-[16px] asowp-font-semibold asowp-mt-8 asowp-mb-4">
         {{ __("Select how user can customize the product", "all-signs-options-pro") }}
      </div>

      <div
        class="asowp-grid asowp-grid-cols-1 md:asowp-grid-cols-3 asowp-gap-4 asowp-mt-[10px]"
      >
        <template v-for="mt in materialTypes"
          :key="mt.id">
          <button
            :disabled="mt.disabled || (isMaterialTypeLocked && mt.id !== lockedMaterialType)"
            @click="!mt.disabled && (!isMaterialTypeLocked || mt.id === lockedMaterialType) && (wizard.materialType = mt.id)"
            :class="[
              'asowp-w-full asowp-pl-[0px] asowp-pr-[0px] asowp-text-left asowp-h-full asowp-bg-[#f8fafc] asowp-rounded-xl asowp-border-solid asowp-border-[1px] asowp-overflow-hidden asowp-transition-all',
              wizard.materialType === mt.id
                ? 'asowp-border-[#70b8b8] asowp-ring-2 asowp-ring-[#016464]/50'
                : 'asowp-border-[#e5e7eb]',
              (mt.disabled || (isMaterialTypeLocked && mt.id !== lockedMaterialType))
                ? 'asowp-opacity-50 asowp-cursor-not-allowed'
                : 'asowp-cursor-pointer',
            ]"
          >
            <div
              class="asowp-p-3 asowp-bg-[#f8fafc] asowp-h-full hover:asowp-bg-[#e9e9ed]"
            >
              <div class="asowp-flex asowp-items-center asowp-justify-between">
                <div class="asowp-text-[16px] asowp-font-semibold">
                  {{ mt.title }}
                  <span
                    v-if="mt.comingSoon"
                    class="asowp-ml-2 asowp-align-middle asowp-text-[11px] asowp-bg-[#e5f0ff] asowp-text-[#2563eb] asowp-px-2 asowp-py-[2px] asowp-rounded"
                  >
                    {{ __("Coming soon", "all-signs-options-pro") }}
                  </span>
                </div>
                <span
                  class="asowp-w-8 asowp-h-8 asowp-rounded-full asowp-border asowp-flex asowp-items-center asowp-justify-center"
                  :class="
                    wizard.materialType === mt.id
                      ? 'asowp-border-[#70b8b8] asowp-text-[#016464]'
                      : 'asowp-border-gray-300 asowp-text-gray-400'
                  "
                  style="border: 1px solid"
                >
                  <svg
                    class="asowp-w-4 asowp-h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      d="M9 5l7 7-7 7"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </span>
              </div>
  
              <p class="asowp-text-[13px] asowp-text-gray-600 asowp-m-[0px] asowp-mr-[40px]">
                {{ mt.desc }}
              </p>
            </div>
          </button>
        </template>
      </div>


    <!-- ===== Modal: Select a demo ===== -->
    <div v-if="false && showDemoModal"
        class="asowp-fixed asowp-inset-0 asowp-z-[999] asowp-flex asowp-items-center asowp-justify-center">
    <!-- Backdrop -->
    <div class="asowp-absolute asowp-inset-0 asowp-bg-black asowp-bg-opacity-40" @click="closeDemoModal()"></div>

    <!-- Dialog -->
    <div class="asowp-relative asowp-mt-6 asowp-w-[min(750px,95vw)] asowp-max-h-[calc(100vh-5.75rem)] asowp-max-w-[61.25rem] asowp-rounded-[1rem] asowp-bg-white asowp-shadow-xl asowp-overflow-hidden">
        <!-- Header -->
        <div class="asowp-flex asowp-items-center asowp-bg-[#f3f3f3] asowp-justify-between asowp-px-5 asowp-py-3 asowp-border-solid asowp-border-b asowp-border-r asowp-border-l asowp-border-t asowp-border-[#e5e5e5]">
            <div class="asowp-text-[14px] asowp-font-semibold">{{ __("Select a demo", "all-signs-options-pro") }}</div>
                <button class="asowp-p-1 asowp-rounded-md hover:asowp-bg-[#f3f4f6] asowp-border-0 asowp-bg-transparent asowp-cursor-pointer"
                        @click="closeDemoModal()" aria-label="Close">
                    ✕
                </button>
            </div>

            <!-- Body -->
            <div class="asowp-h-[75vh] asowp-p-[20px] asowp-overflow-x-auto asowp-overflow-y-auto asowp-py-4 asowp-space-y-2" style="scrollbar-width: thin;">
                <div class="asowp-flex asowp-bg-[#f8f9fb] asowp-p-2 asowp-items-center asowp-justify-between">
                    <div class="asowp-text-[13px] asowp-font-semibold">List of demo data</div>

                        <!-- Search -->
                        <div class="asowp-relative">
                            <input type="search" v-model.trim="demoSearch"
                                    placeholder=""
                                    class="asowp-w-[260px] asowp-h-[34px] asowp-rounded-md asowp-border asowp-border-[#e5e7eb] asowp-px-3 asowp-text-[13px] focus:asowp-outline-none">
                            <span class="asowp-absolute asowp-right-3 asowp-top-1.5 asowp-text-gray-400">⌕</span>
                        </div>
                    </div>

                    <!-- Cards -->
                    <div class="asowp-grid asowp-grid-cols-1 asowp-bg-[#f8f9fb] asowp-p-3 sm:asowp-grid-cols-2 md:asowp-grid-cols-3 lg:asowp-grid-cols-4 asowp-gap-4" style="margin-bottom: 120px;">
                        <label
                            v-for="tpl in demoTemplates"
                            :key="tpl.id"
                            class="asowp-block asowp-relative asowp-bg-[#fff] asowp-rounded-xl asowp-overflow-hidden asowp-border asowp-cursor-pointer asowp-transition-all"
                            :class="selectedDemo === tpl.id
                            ? 'asowp-border-[#008060] asowp-ring-2 asowp-ring-[#008060]/30'
                            : 'asowp-border-[#e5e7eb] hover:asowp-border-[#cfd8dc]'"
                        >
                            <!-- Radio caché -->
                            <input
                            type="radio"
                            class="asowp-sr-only peer"
                            name="demo"
                            :value="tpl.id"
                            v-model="selectedDemo"
                            />

                            <!-- Image -->
                            <div class="asowp-w-full asowp-h-[160px]">
                            <img :src="tpl.icon" :alt="tpl.title"
                                class="asowp-w-full asowp-h-full asowp-object-cover" />
                            </div>

                            <!-- Texte -->
                            <div class="asowp-px-3 asowp-py-2">
                            <div class="asowp-flex asowp-items-center asowp-justify-between">
                                <span class="asowp-text-[14px] asowp-font-semibold">{{ tpl.title }}</span>
                                <!-- Check visuel -->
                                <span class="check-span asowp-inline-flex asowp-items-center asowp-justify-center asowp-w-[18px] asowp-h-[18px] asowp-rounded-full asowp-border"
                                    :class="selectedDemo === tpl.id ? 'asowp-bg-[#008060] asowp-border-[#008060]' : 'asowp-border-[#bdbdbd]'">
                                <svg v-if="selectedDemo === tpl.id"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="white"
                                    stroke-width="2"
                                    class="asowp-w-3 asowp-h-3">
                                    <path d="M5 12l4 4L19 7" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                                </span>
                            </div>
                            <p class="asowp-text-[13px] asowp-text-gray-600">{{ tpl.desc }}</p>
                            </div>
                        </label>
                    </div>

                </div>

                <!-- Footer -->
                <div class="asowp-flex asowp-absolute asowp-bg-[#fff] asowp-w-full asowp-bottom-0 asowp-justify-end asowp-gap-2 asowp-px-5 asowp-py-3 asowp-border-t asowp-border-[#e5e7eb]">
                    <button class="asowp-px-3 asowp-py-1.5 asowp-rounded-md asowp-border asowp-border-[#e5e7eb] asowp-bg-white asowp-text-[13px] asowp-cursor-pointer"
                            @click="closeDemoModal()">
                        {{__("Cancel", "all-signs-options-pro")}}
                    </button>
                    <button class="asowp-px-4 asowp-py-1.5 asowp-mr-[40px] asowp-rounded-md asowp-text-white asowp-bg-[#016464] hover:asowp-bg-[#028383] asowp-text-[13px] asowp-cursor-pointer"
                            :disabled="!selectedDemo"
                            @click="confirmDemo()">
                        {{__("Done", "all-signs-options-pro")}}
                    </button>
                </div>
            </div>
        </div>



      <p
        class="asowp-text-[12px] asowp-text-gray-500 asowp-mt-[20px] asowp-mb-[30px]"
      >
        {{ __("Tip: On the next step, You will finish by adding a name and linking a product of your store.", "all-signs-options-pro") }}
      </p>

      <!-- footer -->
      <div
        class="asowp-flex asowp-justify-end asowp-gap-2 asowp-items-center asowp-mt-4"
      >
        <button
          @click="goBack"
          class="asowp-flex asowp-cursor-pointer asowp-items-center asowp-gap-2 asowp-text-[#016464] asowp-bg-white asowp-border asowp-border-[#016464] asowp-rounded-lg asowp-px-4 asowp-py-2"
        >
          {{ __("Back", "all-signs-options-pro") }}
        </button>
        <button
          @click="goNext"
          :disabled="!canNext"
          :class="[
            'asowp-rounded-lg asowp-cursor-pointer asowp-px-5 asowp-py-2 asowp-text-white',
            canNext
              ? 'asowp-bg-[#016464] hover:asowp-bg-[#028383]'
              : 'asowp-bg-gray-300 asowp-cursor-not-allowed',
          ]"
        >
          {{("Next")}}
        </button>
      </div>
    </div>

    <!-- STEP 4: Finalize -->
    <div
      v-if="(isWizard && wizard.step === 4) || (isEdit && step === 4)"
      class="asowp-p-4 asowp-rounded-[13px] asowp-bg-[#fff]"
      style="border: 1px solid #e6e6e6"
    >
      <div class="md:asowp-grid md:asowp-grid-cols-[1fr_320px] md:asowp-gap-4">
        <!-- Left form -->
        <div class="asowp-space-y-5">
          <!-- Name -->
          <div
            class="asowp-bg-[#f5f5f5] asowp-p-4 asowp-rounded-[13px]"
            style="border: 1px solid #e0e0e0"
          >
            <label
              class="asowp-text-[13px] asowp-text-[#3c3c3c] asowp-font-medium"
              >{{ __("Name configuration", "all-signs-options-pro") }}</label
            >
            <input
              v-model.trim="newConfig.name"
              type="text"
              class="asowp-mt-2 asowp-w-full asowp-rounded-md asowp-border"
              style="padding: 4px"
              :class="
                newConfig.name?.trim()
                  ? 'asowp-border-[#e5e7eb]'
                  : 'asowp-border-red-400'
              "
            />
            <div
              v-if="!newConfig.name?.trim()"
              class="asowp-flex asowp-items-center asowp-gap-1 asowp-text-[#b91c1c] asowp-text-[12px] asowp-mt-1"
            >
              <span
                class="asowp-inline-block asowp-w-[6px] asowp-h-[6px] asowp-rounded-full asowp-bg-[#b91c1c]"
              ></span>
              {{ __("configuration name required", "all-signs-options-pro") }}
            </div>
          </div>

          <template v-if="!props.isEdit">
            <!-- Description -->
            <div
              class="asowp-bg-[#f5f5f5] asowp-p-4 asowp-rounded-[13px]"
              style="border: 1px solid #e0e0e0"
            >
              <label
                class="asowp-text-[13px] asowp-text-[#3c3c3c] asowp-font-medium"
                >{{ __("Description", "all-signs-options-pro") }}</label
              >
              <textarea
                v-model="newConfig.description"
                rows="2"
                class="asowp-mt-2 asowp-w-full asowp-rounded-md asowp-border asowp-border-[#e5e7eb] asowp-px-3 asowp-py-2"
              ></textarea>
            </div>

            <!-- Upload image -->
            <div
              class="asowp-bg-[#f5f5f5] asowp-p-4 asowp-rounded-[13px]"
              style="border: 1px solid #e0e0e0"
            >
              <label
                class="asowp-text-[13px] asowp-text-[#3c3c3c] asowp-font-medium"
                >{{ __("Upload image", "all-signs-options-pro") }}</label
              >
              <div class="asowp-flex asowp-items-center asowp-gap-3 asowp-mt-2">
                <button
                  type="button"
                  @click="selectConfigIcon"
                  class="asowp-inline-flex asowp-bg-[#016464] asowp-cursor-pointer asowp-items-center asowp-gap-2 asowp-text-[13px] asowp-rounded-md asowp-text-[#fff] asowp-px-3 asowp-py-1.5"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    class="asowp-w-4 asowp-h-4"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M11.47 2.47a.75.75 0 0 1 1.06 0l4.5 4.5a.75.75 0 0 1-1.06 1.06l-3.22-3.22V16.5a.75.75 0 0 1-1.5 0V4.81L8.03 8.03a.75.75 0 0 1-1.06-1.06l4.5-4.5ZM3 15.75a.75.75 0 0 1 .75.75v2.25a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5V16.5a.75.75 0 0 1 1.5 0v2.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V16.5a.75.75 0 0 1 .75-.75Z"
                      clip-rule="evenodd"
                    />
                  </svg>

                  {{ __("Upload image", "all-signs-options-pro") }}
                </button>
                <div
                  v-if="newConfig.icon"
                  class="asowp-text-[12px] asowp-text-gray-600 asowp-truncate asowp-max-w-[60%]"
                >
                  {{ newConfig.icon }}
                </div>
              </div>
            </div>
          </template>

          <!-- Product association -->
          <div
            class="asowp-bg-[#f5f5f5] asowp-p-4 asowp-rounded-[13px]"
            style="border: 1px solid #e0e0e0"
          >
            <label class="asowp-text-[13px] asowp-text-[#3c3c3c] asowp-font-medium">
              {{ __("Products associated with configuration","all-signs-options-pro") }}
            </label>
            <div class="asowp-mt-2">
              <Multiselect
                v-model="selectedWooProductIds"
                mode="tags"
                :searchable="true"
                :close-on-select="false"
                :options="wooProductsOptions"
                :loading="wooProductsLoading"
                valueProp="value"
                label="label"
                :placeholder="__('Select WooCommerce products…', 'all-signs-options-pro')"
                class="asowp-bg-white asowp-rounded-md"
              />
              <div class="asowp-mt-2 asowp-text-[12px] asowp-text-gray-600">
                {{ __('Only products not already assigned to an ASO configuration are listed.', 'all-signs-options-pro') }}
              </div>
              <div v-if="wooProductsError" class="asowp-mt-2 asowp-text-[12px] asowp-text-red-600">
                {{ wooProductsError }}
              </div>
            </div>
          </div>
        </div>

        <!-- Summary -->
        <aside
          class="asowp-mt-6 md:asowp-mt-0 asowp-h-fit asowp-border asowp-rounded-lg asowp-bg-[#f5f5f5] asowp-p-4"
          style="border: 1px solid #e0e0e0"
        >
          <div class="asowp-text-[14px] asowp-font-bold asowp-mb-2">Summary</div>
          <dl class="asowp-text-[13px] asowp-text-gray-700 asowp-space-y-2">
            <div class="asowp-flex asowp-text-[#777777]">
              <dt>{{ __("Domain:","all-signs-options-pro") }}</dt>
              <dd class="asowp-font-bold asowp-ml-1">
                {{ categories.find((c) => c.id === wizard.category)?.title || "—" }}
              </dd>
            </div>
            <div class="asowp-flex asowp-text-[#777777]">
              <dt>{{ __("Category type:", "all-signs-options-pro") }}</dt>
              <dd class="asowp-font-bold asowp-ml-1">
                {{ productTypeLabel || "—" }}
              </dd>
            </div>
            <div class="asowp-flex asowp-text-[#777777]">
              <dt>{{ __("Product sample:","all-signs-options-pro") }}</dt>
              <dd class="asowp-font-bold asowp-ml-1">
                {{ selectedProduct || "—" }}
              </dd>
            </div>
            <div class="asowp-flex asowp-text-[#777777]">
              <dt>{{ __("Material type:", "all-signs-options-pro") }}</dt>
              <dd class="asowp-font-bold asowp-ml-1">
                {{ materialTypes.find((m) => m.id === wizard.materialType)?.title || "—" }}
              </dd>
            </div>
            <div class="asowp-flex asowp-text-[#777777]">
              <dt>{{ __("Demo data:", "all-signs-options-pro") }}</dt>
              <dd class="asowp-font-bold asowp-ml-1">
                <template v-if="wizard.includeDemo">
                  {{ __("Yes", "all-signs-options-pro") }}
                  <span v-if="selectedDemoLabel">
                    ({{ selectedDemoLabel }})
                  </span>
                  <span v-else-if="selectedProduct">
                    ({{ selectedProduct }})
                  </span>
                </template>
                <template v-else>{{ __("No", "all-signs-options-pro") }}</template>
              </dd>
            </div>
            <div class="asowp-flex asowp-text-[#777777]">
              <dt>{{ __("Name:", "all-signs-options-pro") }}</dt>
              <dd class="asowp-font-bold asowp-ml-1">{{ newConfig.name || "—" }}</dd>
            </div>
          </dl>
        </aside>
      </div>

      <!-- footer -->
      <div
        class="asowp-flex asowp-justify-end asowp-gap-2 asowp-items-center asowp-mt-6"
      >
        <button
          @click="goBack"
          class="asowp-flex asowp-cursor-pointer asowp-items-center asowp-gap-2 asowp-text-[#016464] asowp-bg-white asowp-border asowp-border-[#016464] asowp-rounded-lg asowp-px-4 asowp-py-2"
        >
          {{ __("Back", "all-signs-options-pro") }}
        </button>

        <button
          @click="isEdit ? updateConfig() : includeMetaData(wizard.includeDemo)"
          :disabled="!newConfig.name?.trim() || isLoading"
          :class="[
            'asowp-rounded-lg asowp-px-5 asowp-py-2 asowp-text-white',
            newConfig.name?.trim() && !isLoading
              ? 'asowp-bg-[#016464] hover:asowp-bg-[#028383] asowp-cursor-pointer'
              : 'asowp-bg-gray-300 asowp-cursor-not-allowed',
          ]"
        >
          {{ isLoading ? __("Saving…", "all-signs-options-pro") : (isEdit ? __("Update", "all-signs-options-pro") : __("Finish", "all-signs-options-pro")) }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, h, ref, watch } from "vue";
import { useRoute } from "vue-router";
import api from "@/admin/Api/api";
import toastMessage from "@/admin/utils/functions";
import Multiselect from "@vueform/multiselect";
import router from "@/admin/router";
import { signageOption, configurationDemoData } from "@/admin/utils/create-config.data";
import SignageProductSelector from "@/admin/pages/configuration/components/SignageProductSelector.vue";

import { __, _x, _n, _nx, sprintf, setLocaleData } from "@wordpress/i18n";
const props = defineProps({
  isEdit: {
    type: Boolean,
    default: false,
  },
  configToEdit: {
    type: Object,
    default: () => ({}),
  },
});

const emit = defineEmits(['onFinish', 'onCancel']);

const route = useRoute();
const CategoryIcons = {};
const isNewConfig = ref(true);
const newConfig = ref({
  name: "",
  description: "",
  icon: "",
  materialType: "simple",
});

const selectedDemo = ref(null);
const defaultSettings = ref({
  settings: {
    generals: {
      mobile: {
        showNavigatorMenu: "off",
        showNavigationMenuFirst: "yes",
        mobileSelectionOptionsDisplay: "horizontally-stack",
      },
      output: {
        filesFormat: "png",
        waterMark: "",
        zipOutputFiles: {
          active: true,
          zipOutFolderPrefix: "asowp_",
        },
        designComposition: true,
      },
      product: {
        designFromScratch: true,
        redirectAfterAddingToCart: true,
        hideAddToCartButtonOnDetailPage: true,
        hideDesignButtonsOnShopPage: false,
        hideAddToCartButtonOnShopPage: true,
        redirectToCheckOutPage: false,
        displayRecapsOnCheckout: false,
      },
    },
    customizerSign: {
      customizerOptions: {
        measurementUnit: "mm",
        showHideMeasurements: "both",
        decimalFormatMeasurements: "with-decimal",
        desktopColumnOrder: "right",
      },
      signPart: {
        doublePart: {
          active: false,
          label: "Switch Face",
          part1: "Face A",
          part2: "Face B",
          enableCopyDesignFromSide: true,
        },
      },
      text: {
        selectedFonts: [],
        colorsLabel: "Texts Colors",
        colors: [
          {
            name: "White",
            codeHex: "#ffffff",
            prevImg: "",
            additionalPrice: 0,
          },
          {
            name: "Black",
            codeHex: "#000000",
            prevImg: "",
            additionalPrice: 0,
          },
        ],
        enableCustomColor: true,
        colorsPrevImg: "",
        enableFontSize: {
          active: true,
          defaultFontSize: 16,
          minimumFontSize: 12,
          maximumFontSize: 50,
        },
        enableBold: true,
        enableUnderline: true,
        enableOverline: true,
        enableStrike: true,
        enableItalic: true,
        enableOpacity: true,
        enableBorder: true,
        enableTextAlignment: true,
        enableCurvedUp: true,
        enableCurvedDown: true,
        textType: "normal",
      },
      images: {
        enableDownloadImage: true,
        enableUploadImage: true,
        enableCustomColor: true,
        colorsPrevImg: "",
        fileUploadScript: {
          uploadMinWidth: 100,
          uploadMaxWidth: 100,
          allowedUploadsExtentions: ["png", "jpeg", "webp", "svg", "gif"],
        },
        enableClipart: {
          active: true,
          selectedClipartGroups: [],
        },
        selectedCutline: "none",
        cutlines: {
          first: {
            borderSize: 4,
            color: "#FFF10E",
          },
          second: {
            color: "#5EEC92",
            size: 10,
            borderColor: "#4A65F9",
            borderSize: 4,
          },
        },
        filter: {
          active: true,
          enableGreyscale: true,
          enableOpacity: true,
          enableEmbross: true,
          enableBlur: true,
          enableSepia: true,
          enableSharpen: true,
          enableGreenify: false,
          enablePinkify: false,
          enableOrangeify: false,
          enableBlueify: false,
        },
        colors: [],
        scenes: [],
      },
    },
    languageImages: {
      // ... content from original file
    },
    themeColors: {
      // ... content from original file
    },
    sortOptions: [],
  },
  additionalOptions: [],
});
const isLoading = ref(false);
const step = ref(1);
const isWizard = ref(true);

const wizard = ref({
  step: 1,
  category: 'signage',
  productType: '',
  materialType: 'simple',
  includeDemo: true,
});
const breadcrumbTags = computed(() => {
  const crumbs = [];
  if (wizard.value?.category) {
    const found = categories.find((c) => c.id === wizard.value.category);
    crumbs.push(found?.tag || wizard.value.category);
  }
  if (productTypeLabel.value) crumbs.push(productTypeLabel.value);
  if (selectedSubCategory.value) crumbs.push(selectedSubCategory.value);
  if (selectedProduct.value) crumbs.push(selectedProduct.value);
  return crumbs;
});

// Categories fallback: Signage active, others coming soon
const categories = (signageOption && signageOption.categories && signageOption.categories.length)
  ? signageOption.categories
  : [
      {
        id: "signage",
        tag: "Signage",
        title: "Signs",
        examples: (signageOption?.productCategories || []).slice(0, 3).map((c) => c.name) || ["Signboard", "Banners", "Stickers"],
        disabled: false,
        comingSoon: false,
      },
      {
        id: "apparel",
        tag: "Apparel",
        title: "Textile",
        examples: ["T-shirt", "Cap", "Hoodie"],
        disabled: true,
        comingSoon: true,
      },
      {
        id: "objects",
        tag: "Objects",
        title: "Goodies",
        examples: ["Mug", "Card", "Tote bag"],
        disabled: true,
        comingSoon: true,
      },
    ];

const productTypesByCategory =
  (signageOption && signageOption.productTypesByCategory) || {
    signage: (signageOption?.productCategories || []).map((cat) => ({
      id: cat.type,
      title: cat.name,
      desc: cat.description,
      disabled: false,
    })),
    apparel: [],
    objects: [],
  };

const materialTypes =
  (signageOption && signageOption.materialTypes) || [
    {
      id: "simple",
      title: "Simple",
      desc: "User can control all options (shape, size, color, etc.)",
      disabled: false,
    },
    {
      id: "advance",
      title: "Advanced",
      desc: "User can add text and image, not control shape/size/color.",
      disabled: false,
    },
    {
      id: "layers",
      title: "Layers",
      desc: "User can control some part of the product.",
      disabled: true,
      comingSoon: true,
    },
  ];

const allDemoTemplates = (Array.isArray(configurationDemoData) ? configurationDemoData : []).map(
  (d) => ({
    id: d.id,
    title: d.name,
    desc: d.description,
    icon: d.icon,
    data: d.data,
  })
);
const selectedCategory = ref('');
const selectedSubCategory = ref(null);
const selectedProduct = ref(null);
const selectedWooProductIds = ref([]);
const wooProductsOptions = ref([]);
const wooProductsLoading = ref(false);
const wooProductsError = ref('');
const wooProductsLoaded = ref(false);
const showDemoModal = ref(false);
const demoSearch = ref('');

const normalizeDemoName = (value) =>
  String(value || '')
    .trim()
    .toLowerCase();

const stripIdsDeep = (value) => {
  if (Array.isArray(value)) {
    return value.map(stripIdsDeep);
  }
  if (value && typeof value === 'object') {
    const out = {};
    Object.keys(value).forEach((k) => {
      if (k === 'id') return;
      out[k] = stripIdsDeep(value[k]);
    });
    return out;
  }
  return value;
};

const clearArraysDeep = (value) => {
  if (Array.isArray(value)) {
    return [];
  }
  if (value && typeof value === 'object') {
    const out = {};
    Object.keys(value).forEach((k) => {
      out[k] = clearArraysDeep(value[k]);
    });
    return out;
  }
  return value;
};

const demoTemplates = computed(() => {
  if (!demoSearch.value) {
    return allDemoTemplates;
  }
  return allDemoTemplates.filter(t => t.title.toLowerCase().includes(demoSearch.value.toLowerCase()));
});

const productTypeLabel = computed(() => {
  return selectedCategory.value ||
    productTypesByCategory[wizard.value.category]?.find(
      (p) => p.id === wizard.value.productType
    )?.title ||
    '';
});

const selectedDemoLabel = computed(() => {
  if (!selectedDemo.value) return '';
  return allDemoTemplates.find((t) => t.id === selectedDemo.value)?.title || '';
});

const selectedProductMeta = computed(() => {
  const category = signageOption?.productCategories?.find(
    (c) => c.type === wizard.value.productType
  );
  const groups = category?.productGroups || [];
  for (const group of groups) {
    const product = (group?.products || []).find((p) => p.name === selectedProduct.value);
    if (product) return product;
  }
  return null;
});

const demoManuallySelected = ref(false);

const visualizerDefaults = {
  textNoTextModalTitle: "Add text to continue",
  textNoTextModalMessage: "Please add a text to continue.",
  textNoTextModalButton: "Got it",
  textNoFontModalTitle: "No fonts available",
  textNoFontModalMessage:
    "Please add at least one font in configuration settings to continue.",
  textNoFontModalButton: "Got it",
};

const ensureVisualizerDefaults = (settings) => {
  if (!settings || typeof settings !== "object") return;
  if (!settings.languageImages || typeof settings.languageImages !== "object") {
    settings.languageImages = {};
  }
  if (
    !settings.languageImages.visualizer ||
    typeof settings.languageImages.visualizer !== "object"
  ) {
    settings.languageImages.visualizer = {};
  }
  settings.languageImages.visualizer = {
    ...visualizerDefaults,
    ...settings.languageImages.visualizer,
  };
};

const normalizeKey = (value) =>
  String(value || "")
    .trim()
    .toLowerCase();

const ensureSelectedDemo = () => {
  if (!selectedDemo.value) {
    selectedDemo.value = pickDemoTemplateId();
  }
  return allDemoTemplates.find((t) => t.id === selectedDemo.value) || null;
};

const pickDemoTemplateId = () => {
  if (!selectedProduct.value) return allDemoTemplates[0]?.id || null;

  // 1) explicit mapping on product object (recommended)
  const explicit = selectedProductMeta.value?.demoData;
  const explicitId = explicit !== undefined && explicit !== null && String(explicit).trim() !== ""
    ? Number(explicit)
    : null;
  if (Number.isFinite(explicitId)) {
    const exists = allDemoTemplates.some((t) => t.id === explicitId);
    if (exists) return explicitId;
  }

  // 2) match by product name <-> template title
  const byTitle = allDemoTemplates.find(
    (t) => normalizeKey(t.title) === normalizeKey(selectedProduct.value)
  );
  if (byTitle) return byTitle.id;

  return allDemoTemplates[0]?.id || null;
};

const lockedMaterialType = computed(() => {
  const mt = selectedProductMeta.value?.materialType;
  if (!mt) return null;
  if (mt === "all") return null;
  const exists = materialTypes.some((t) => t.id === mt);
  return exists ? mt : null;
});

const isMaterialTypeLocked = computed(() => !!lockedMaterialType.value);

const canNext = computed(() => {
  if (wizard.value.step === 1) return !!wizard.value.category;
  if (wizard.value.step === 2) return !!selectedProduct.value;
  if (wizard.value.step === 3) return !!wizard.value.materialType;
  return false;
});

const currentProductCategory = computed(() => {
  if (!wizard.value.category) return null;
  const category = productTypesByCategory[wizard.value.category];
  return category ? category.find(c => c.id === wizard.value.productType) : null;
});

watch(() => props.isEdit, (newVal) => {
  if (newVal) {
    newConfig.value = { ...props.configToEdit };
    step.value = 4;
    isWizard.value = false;
  }
});

onMounted(() => {
  isWizard.value = true;
  step.value = 1;
  wizard.value.category = wizard.value.category || "signage";
  const defaults = productTypesByCategory[wizard.value.category] || [];
  if (!wizard.value.productType && defaults.length) {
    wizard.value.productType = defaults[0].id;
  }
  if (!selectedSubCategory.value && signageOption?.productCategories?.length) {
    const cat = signageOption.productCategories.find(
      (c) => c.type === wizard.value.productType
    );
    selectedCategory.value = cat?.name || '';
    const firstGroup = cat?.productGroups?.[0];
    selectedSubCategory.value = firstGroup?.name || null;
    selectedProduct.value = firstGroup?.products?.[0]?.name || null;
  }
  if (wizard.value.includeDemo) {
    enableDemoInline();
  }
});

watch(
  () => selectedProductMeta.value?.materialType,
  (mt) => {
    if (!mt) return;
    if (mt === "all") return;
    const exists = materialTypes.some((t) => t.id === mt && !t.disabled);
    if (exists) {
      wizard.value.materialType = mt;
    }
  },
  { immediate: true }
);

watch(
  () => [selectedProduct.value, wizard.value.includeDemo],
  () => {
    if (!wizard.value.includeDemo) return;
    if (demoManuallySelected.value) return;
    selectedDemo.value = pickDemoTemplateId();
  },
  { immediate: true }
);

watch(
  () => wizard.value.materialType,
  (current) => {
    if (!lockedMaterialType.value) return;
    if (current !== lockedMaterialType.value) {
      wizard.value.materialType = lockedMaterialType.value;
    }
  }
);

const goNext = () => {
  if (canNext.value) {
    wizard.value.step++;
  }
};

const goBack = () => {
  if (props.isEdit) {
      emit('onCancel');
      return;
  }

  if (wizard.value.step > 1) {
    wizard.value.step--;
  } else {
    isWizard.value = false;
    // router.push({ name: 'configuration' });
    emit('onCancel');
  }
};

const loadWooProducts = async () => {
  if (wooProductsLoaded.value || wooProductsLoading.value) return;
  wooProductsLoading.value = true;
  wooProductsError.value = '';
  try {
    const params = { include_variations: true, per_page: 200 };
    if (props.isEdit && newConfig.value?.id) {
      params.config_id = newConfig.value.id;
    }
    const res = await api.getUnassignedProducts(params);
    const items = Array.isArray(res?.data) ? res.data : [];
    wooProductsOptions.value = items.map((p) => ({
      value: p.id,
      label: p.sku ? `${p.title} (SKU: ${p.sku})` : p.title,
    }));
    if (props.isEdit && newConfig.value?.id) {
      selectedWooProductIds.value = items
        .filter((p) => p.assigned_config_id === newConfig.value.id)
        .map((p) => p.id);
    }
    wooProductsLoaded.value = true;
  } catch (e) {
    wooProductsError.value = 'Failed to load WooCommerce products.';
  } finally {
    wooProductsLoading.value = false;
  }
};

watch(
  () => wizard.value.step,
  (step) => {
    if (step === 4) {
      loadWooProducts();
    }
  },
  { immediate: true }
);

watch(
  () => step.value,
  (s) => {
    if (props.isEdit && s === 4) {
      loadWooProducts();
    }
  },
  { immediate: true }
);

const enableDemoInline = () => {
  wizard.value.includeDemo = true;
  if (!demoManuallySelected.value) {
    selectedDemo.value = pickDemoTemplateId();
  }
};

const confirmDemo = () => {
  wizard.value.includeDemo = true;
  demoManuallySelected.value = true;
  closeDemoModal();
};

const slugify = (value) =>
  String(value ?? "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-");

const addNewConfig = async (config) => {
    isLoading.value = true;
    try {
        const response = await api.addConfig({
          name: config.name,
          description: config.description,
          icon: config.icon,
          popImg: config.popImg,
          materialType: config.materialType,
          data: config.data,
          product_ids: selectedWooProductIds.value,
        });
        console.log("addNewConfig response:", response);
        if (response.success) {
            toastMessage(response.message, 'success');
            if (response.post_id) {
              const firstMaterial = Array.isArray(config?.data?.materials)
                ? config.data.materials[0]
                : null;
              const materialName = firstMaterial?.name || "material";
              const target = config.materialType === "advance" ? "Material-Advance" : "Simple-Sizes";

              router.push({
                name: target,
                params: {
                  config: slugify(config.name),
                  configId: String(response.post_id),
                  material: slugify(materialName),
                  materialId: "0",
                },
              });
            }
            emit('onFinish');
        } else {
            toastMessage(response.message || 'Registration failed', 'error');
        }
    } catch (error) {
        toastMessage('An error occurred while adding the configuration.', 'error');
    } finally {
        isLoading.value = false;
    }
};

const updateConfig = async () => {
  isLoading.value = true;
  try {
    const payload = { id: newConfig.value.id, name: newConfig.value.name };
    if (wooProductsLoaded.value) {
      payload.product_ids = selectedWooProductIds.value;
    }
    const response = await api.updateConfig(payload);
    if (response.success) {
      toastMessage(response.message, "success");
      emit('onFinish');
    } else {
      toastMessage(response.message, "error");
    }
  } catch (error) {
    toastMessage("An error occurred while updating the configuration.", "error");
  } finally {
    isLoading.value = false;
  }
};

const includeMetaData = (isInclude) => {
  newConfig.value.materialType = wizard.value.materialType;
  const tpl = ensureSelectedDemo();
  if (isInclude) {
    const payload = tpl?.data || defaultSettings.value;
    const mergedPayload = stripIdsDeep(payload);
    ensureVisualizerDefaults(mergedPayload.settings);
    newConfig.value.data = mergedPayload;
    addNewConfig(newConfig.value);
  } else {
    const payload = {
      settings: stripIdsDeep(tpl?.data?.settings || defaultSettings.value.settings),
      additionalOptions: [],
      materials: [],
    };
    ensureVisualizerDefaults(payload.settings);

    const firstMaterial = tpl?.data?.materials?.[0];
    if (firstMaterial) {
      const material = clearArraysDeep(stripIdsDeep({ ...firstMaterial }));
      payload.materials.push({
        ...material,
      });
    }

    newConfig.value.data = payload;
    addNewConfig(newConfig.value);
  }
};

const selectImage = (callback) => {
  const uploader = wp.media({
    title: __("Select or Upload an Image", "all-signs-options-pro"),
    button: {
      text: __("Use this image", "all-signs-options-pro"),
    },
    multiple: false,
  });

  uploader.on("select", () => {
    const attachment = uploader.state().get("selection").first().toJSON();
    callback(attachment.url);
  });

  uploader.open();
};

const selectConfigIcon = () => {
  selectImage(url => newConfig.value.icon = url);
};

const selectConfigPopImg = () => {
  selectImage(url => newConfig.value.popImg = url);
};

// Logic to start the wizard for a new configuration
const startWizard = () => {
    isWizard.value = true;
    step.value = 1;
    wizard.value.step = 1;
};

defineExpose({ startWizard });

</script>
