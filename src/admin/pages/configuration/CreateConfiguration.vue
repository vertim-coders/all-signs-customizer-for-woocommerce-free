<template>
  <div class="ascwo-create-wizard ascwo-p-4 ascwo-min-h-screen">
    <!-- Header Section -->
    <div class="ascwo-text-center ascwo-mb-5">
      <h1 class="ascwo-text-[28px] ascwo-leading-9 ascwo-text-[#303030] ascwo-mb-1" style="font-weight: 750 !important;">
        {{ isEdit ? __('Edit Product Configuration', 'all-signs-customizer-for-woocommerce') : __('Create Product Configuration', 'all-signs-customizer-for-woocommerce') }}
      </h1>
      <p class="ascwo-text-[14px] ascwo-text-[#616161]">
        {{ isEdit ? __('Update the configuration information and product associations.', 'all-signs-customizer-for-woocommerce') : __('Follow the steps to define the product, how customers will configure it, and how your setup should start.', 'all-signs-customizer-for-woocommerce') }}
      </p>
    </div>

    <!-- Stepper (Centered Pill) -->
    <div v-if="!isEdit" class="ascwo-create-stepper-wrap ascwo-flex ascwo-justify-center ascwo-mb-5">
      <div class="ascwo-create-stepper ascwo-inline-flex ascwo-items-center ascwo-bg-white ascwo-rounded-full ascwo-px-5 ascwo-py-2 ascwo-shadow-sm ascwo-border ascwo-border-solid ascwo-border-[#e1e3e5] ascwo-gap-2">
        <div v-for="n in 4" :key="n" class="ascwo-flex ascwo-items-center">
          <div
            :class="[
              'ascwo-flex ascwo-items-center ascwo-gap-2 ascwo-text-[13px] ascwo-font-bold ascwo-transition-all',
              wizard.step === n ? 'ascwo-text-[#1a1a1a] ascwo-bg-[#f8faf9] ascwo-rounded-full ascwo-px-3 ascwo-py-1 ascwo-border ascwo-border-solid ascwo-border-[#006e52]' : 'ascwo-text-[#b5b5b5]'
            ]"
          >
            <span
              :class="[
                'ascwo-w-5 ascwo-h-5 ascwo-rounded-full ascwo-flex ascwo-items-center ascwo-justify-center ascwo-text-[10px] ascwo-border ascwo-border-solid',
                wizard.step === n ? 'ascwo-bg-white ascwo-border-[#006e52] ascwo-text-[#006e52]' : 'ascwo-bg-[#f1f1f1] ascwo-border-transparent ascwo-text-[#b5b5b5]'
              ]"
            >
              {{ n }}
            </span>
            <span v-if="wizard.step === n">{{ getStepTitle(n) }}</span>
            <span v-else>{{ __('Step', 'all-signs-customizer-for-woocommerce') }} {{ n }}</span>
          </div>
          <ChevronRightIcon v-if="n < 4" class="ascwo-create-step-arrow ascwo-w-3 ascwo-h-3 ascwo-mx-2 ascwo-text-[#d1d1d1]" />
        </div>
      </div>
    </div>

    <!-- Main Card Container -->
    <div class="ascwo-create-shell ascwo-ui-page-card ascwo-max-w-[1180px] ascwo-mx-auto ascwo-overflow-hidden">

      <!-- STEP 1: Product family -->
      <div v-if="!isEdit && wizard.step === 1" class="ascwo-p-7">
        <div class="ascwo-mb-6">
          <h2 class="ascwo-text-[18px] ascwo-leading-6 ascwo-font-bold ascwo-text-[#303030] ascwo-mb-2">
            {{ __('What type of product do you want to sell?', 'all-signs-customizer-for-woocommerce') }}
          </h2>
          <p class="ascwo-text-[14px] ascwo-text-[#616161]">
            {{ __('Choose the product family first. We will then show the matching materials and configuration setup.', 'all-signs-customizer-for-woocommerce') }}
          </p>
        </div>

        <div class="ascwo-grid md:ascwo-grid-cols-2 ascwo-gap-5">
          <div
            v-for="family in productFamilies"
            :key="family.id"
            @click="selectFamily(family)"
            :class="[
              'ascwo-create-select-card ascwo-relative ascwo-flex ascwo-gap-4 ascwo-transition-all ascwo-cursor-pointer group',
              family.comingSoon ? 'ascwo-opacity-70 ascwo-cursor-not-allowed' : '',
              family.externalPlugin ? 'ascwo-create-external-card' : '',
              wizard.productType === family.id ? 'ascwo-border-[#006e52] ascwo-bg-[#f8faf9]' : 'ascwo-border-[#e1e3e5] ascwo-bg-white'
            ]"
          >
            <!-- Family Image -->
            <div class="ascwo-create-card-image ascwo-w-20 ascwo-h-20 ascwo-overflow-hidden ascwo-bg-gray-100 ascwo-flex-shrink-0">
              <img v-if="family.image" :src="mediaSrc(family.image)" class="ascwo-w-full ascwo-h-full ascwo-object-cover" />
              <div v-else class="ascwo-w-full ascwo-h-full ascwo-flex ascwo-items-center ascwo-justify-center ascwo-text-gray-300">
                <ImageIcon class="ascwo-w-8 ascwo-h-8" />
              </div>
            </div>

            <!-- Family Content -->
            <div class="ascwo-flex-1">
              <div class="ascwo-flex ascwo-items-start ascwo-justify-between ascwo-mb-1">
                <h3 class="ascwo-text-[15px] ascwo-font-bold ascwo-text-[#1a1a1a] ascwo-m-0">{{ family.title }}</h3>
                <div class="ascwo-flex ascwo-gap-2">
                  <span v-if="family.comingSoon" class="ascwo-bg-[#fff7d1] ascwo-text-[#856404] ascwo-text-[10px] ascwo-font-bold ascwo-px-2 ascwo-py-0.5 ascwo-rounded-full">
                    {{ __('Coming soon', 'all-signs-customizer-for-woocommerce') }}
                  </span>
                  <span v-else-if="family.externalPlugin" class="ascwo-create-external-pill ascwo-text-[10px] ascwo-font-bold ascwo-px-2 ascwo-py-0.5 ascwo-rounded-full">
                    {{ __('Separate plugin', 'all-signs-customizer-for-woocommerce') }}
                  </span>
                  <span v-else-if="wizard.productType === family.id" class="ascwo-ui-pill">
                    {{ __('selected', 'all-signs-customizer-for-woocommerce') }}
                  </span>
                </div>
              </div>
              <p class="ascwo-text-[13px] ascwo-text-[#616161] ascwo-leading-5 ascwo-mb-3">
                {{ family.desc }}
              </p>
              <div class="ascwo-flex ascwo-items-center ascwo-justify-between">
                <span class="ascwo-text-[12px] ascwo-font-medium ascwo-text-[#b5b5b5]">
                  {{ family.comingSoon ? __('Coming soon', 'all-signs-customizer-for-woocommerce') : (family.externalPlugin ? __('View plugin options', 'all-signs-customizer-for-woocommerce') : __('Click to select', 'all-signs-customizer-for-woocommerce')) }}
                </span>
                <button @click.stop="family.externalPlugin ? selectFamily(family) : openPreview(family)" class="ascwo-w-7 ascwo-h-7 ascwo-rounded-full ascwo-bg-white ascwo-border ascwo-border-solid ascwo-border-[#e1e3e5] ascwo-flex ascwo-items-center ascwo-justify-center ascwo-text-[#b5b5b5] hover:ascwo-text-[#1a1a1a] ascwo-cursor-pointer">
                  <EyeIcon class="ascwo-w-4 ascwo-h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- STEP 2: Material Selection -->
      <div v-else-if="!isEdit && wizard.step === 2" class="ascwo-p-10">
        <div class="ascwo-mb-8">
          <div class="ascwo-mb-2">
             <h2 class="ascwo-text-[22px] ascwo-font-bold ascwo-text-[#1a1a1a] ascwo-m-0 ascwo-flex ascwo-items-center ascwo-gap-2">
                {{ __('Choose the material for', 'all-signs-customizer-for-woocommerce') }}
                <span class="ascwo-px-3 ascwo-py-1 ascwo-bg-[#f1f1f1] ascwo-rounded-lg ascwo-text-[14px] ascwo-font-medium ascwo-text-[#616161]">{{ selectedFamilyTitle }}</span>
                <span class="ascwo-px-3 ascwo-py-1 ascwo-bg-[#d2f4ea] ascwo-text-[#006e52] ascwo-rounded-lg ascwo-text-[14px] ascwo-font-bold">{{ wizard.selectedMaterials.length }} {{ __('selected', 'all-signs-customizer-for-woocommerce') }}</span>
             </h2>
          </div>
          <p class="ascwo-text-[14px] ascwo-text-[#616161]">
            {{ __('Select one or more materials your merchants will sell. You can choose multiple materials here, then define how the configurator behaves in the next step.', 'all-signs-customizer-for-woocommerce') }}
          </p>
        </div>

        <div class="ascwo-grid md:ascwo-grid-cols-2 ascwo-gap-6">
          <div
            v-for="material in filteredMaterials"
            :key="material.id"
            @click="toggleMaterial(material)"
            :class="[
              'ascwo-create-select-card ascwo-relative ascwo-flex ascwo-gap-4 ascwo-transition-all ascwo-cursor-pointer group',
              wizard.selectedMaterials.includes(material.id) ? 'ascwo-border-[#006e52] ascwo-bg-[#f8faf9]' : 'ascwo-border-[#e1e3e5] ascwo-bg-white'
            ]"
          >
            <!-- Material Image -->
            <div class="ascwo-create-card-image ascwo-w-20 ascwo-h-20 ascwo-overflow-hidden ascwo-bg-gray-100 ascwo-flex-shrink-0">
              <img v-if="material.image" :src="mediaSrc(material.image)" class="ascwo-w-full ascwo-h-full ascwo-object-cover" />
              <div v-else class="ascwo-w-full ascwo-h-full ascwo-flex ascwo-items-center ascwo-justify-center ascwo-text-gray-300">
                <ImageIcon class="ascwo-w-8 ascwo-h-8" />
              </div>
            </div>

            <!-- Material Content -->
            <div class="ascwo-flex-1">
              <div class="ascwo-flex ascwo-items-start ascwo-justify-between ascwo-mb-1">
                <h3 class="ascwo-text-[16px] ascwo-font-bold ascwo-text-[#1a1a1a] ascwo-m-0">{{ material.title }}</h3>
                <div class="ascwo-flex ascwo-gap-2">
                   <span v-if="material.tag" class="ascwo-ui-pill ascwo-create-info-pill">{{ material.tag }}</span>
                   <span v-if="wizard.selectedMaterials.includes(material.id)" class="ascwo-ui-pill">
                      {{ __('selected', 'all-signs-customizer-for-woocommerce') }}
                   </span>
                </div>
              </div>
              <p class="ascwo-text-[13px] ascwo-text-[#616161] ascwo-leading-relaxed ascwo-mb-3">
                {{ material.desc || sprintf(__('Include %s in this %s setup.', 'all-signs-customizer-for-woocommerce'), material.title.toLowerCase(), selectedFamilyTitle.toLowerCase()) }}
              </p>
              <div class="ascwo-flex ascwo-items-center ascwo-justify-between">
                <span class="ascwo-text-[12px] ascwo-font-medium ascwo-text-[#b5b5b5]">
                  {{ __('Click to toggle', 'all-signs-customizer-for-woocommerce') }}
                </span>
                <button @click.stop="openPreview(material)" class="ascwo-w-7 ascwo-h-7 ascwo-rounded-full ascwo-bg-white ascwo-border ascwo-border-solid ascwo-border-[#e1e3e5] ascwo-flex ascwo-items-center ascwo-justify-center ascwo-text-[#b5b5b5] hover:ascwo-text-[#1a1a1a] ascwo-cursor-pointer">
                  <EyeIcon class="ascwo-w-4 ascwo-h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- STEP 3: Setup Model -->
      <div v-else-if="!isEdit && wizard.step === 3" class="ascwo-p-10">
        <div class="ascwo-mb-8">
          <div class="ascwo-flex ascwo-items-center ascwo-gap-2 ascwo-mb-2">
             <h2 class="ascwo-text-[22px] ascwo-font-bold ascwo-text-[#1a1a1a] ascwo-m-0">
                {{ __('Choose a configuration model', 'all-signs-customizer-for-woocommerce') }}
             </h2>
             <span class="ascwo-px-3 ascwo-py-1 ascwo-bg-[#f1f1f1] ascwo-rounded-lg ascwo-text-[14px] ascwo-font-medium ascwo-text-[#616161]">{{ selectedFamilyTitle }}</span>
             <span class="ascwo-px-3 ascwo-py-1 ascwo-bg-[#d2f4ea] ascwo-text-[#006e52] ascwo-rounded-lg ascwo-text-[12px] ascwo-font-bold">
                {{ selectedMaterialsNames }}
             </span>
          </div>
          <p class="ascwo-text-[14px] ascwo-text-[#616161] ascwo-mb-10">
            {{ __('Choose how customers will build this product. Starter data will be decided in the final review.', 'all-signs-customizer-for-woocommerce') }}
          </p>

          <h3 class="ascwo-text-[16px] ascwo-font-bold ascwo-text-[#1a1a1a] ascwo-mb-2">{{ __('Choose how customers will build this product', 'all-signs-customizer-for-woocommerce') }}</h3>
          <p class="ascwo-text-[13px] ascwo-text-[#616161] ascwo-mb-8">
             {{ __('The free version only supports the simple setup model. Preset mode is locked to Pro.', 'all-signs-customizer-for-woocommerce') }}
          </p>
        </div>

        <div class="ascwo-grid md:ascwo-grid-cols-2 ascwo-gap-8">
          <!-- Build by Options -->
          <div
            @click="wizard.materialType = 'simple'"
            :class="[
              'ascwo-create-model-card ascwo-relative ascwo-transition-all ascwo-cursor-pointer',
              wizard.materialType === 'simple' ? 'ascwo-border-[#006e52] ascwo-bg-[#f8faf9]' : 'ascwo-border-[#e1e3e5] ascwo-bg-white'
            ]"
          >
            <div class="ascwo-flex ascwo-gap-4 ascwo-mb-4">
               <div class="ascwo-w-28 ascwo-h-24 ascwo-rounded-xl ascwo-bg-white ascwo-border ascwo-border-solid ascwo-border-[#e1e3e5] ascwo-overflow-hidden ascwo-flex-shrink-0">
                  <img :src="setupModelImage('simple')" class="ascwo-w-full ascwo-h-full ascwo-object-cover" />
               </div>
               <div class="ascwo-flex-1">
                  <div class="ascwo-flex ascwo-items-center ascwo-justify-between ascwo-mb-1">
                     <h4 class="ascwo-text-[16px] ascwo-font-bold ascwo-text-[#1a1a1a] ascwo-m-0">{{ __('Build by Options', 'all-signs-customizer-for-woocommerce') }}</h4>
                     <div class="ascwo-flex ascwo-gap-2">
                        <span class="ascwo-bg-[#e1f0ff] ascwo-text-[#005bd3] ascwo-text-[11px] ascwo-font-bold ascwo-px-3 ascwo-py-0.5 ascwo-rounded-full">{{ __('Flexible', 'all-signs-customizer-for-woocommerce') }}</span>
                        <span v-if="wizard.materialType === 'simple'" class="ascwo-bg-[#f1f1f1] ascwo-text-[#616161] ascwo-text-[11px] ascwo-font-medium ascwo-px-3 ascwo-py-0.5 ascwo-rounded-full ascwo-border ascwo-border-solid ascwo-border-[#e1e3e5]">selected</span>
                     </div>
                  </div>
                  <p class="ascwo-text-[13px] ascwo-text-[#616161] ascwo-leading-relaxed">
                     {{ __('Customers choose product options directly like size, shape, material and extras.', 'all-signs-customizer-for-woocommerce') }}
                  </p>
               </div>
            </div>
            <ul class="ascwo-list-none ascwo-p-0 ascwo-m-0 ascwo-space-y-2">
               <li class="ascwo-flex ascwo-items-center ascwo-gap-3 ascwo-text-[13px] ascwo-text-[#1a1a1a]">
                  <div class="ascwo-w-2 ascwo-h-2 ascwo-rounded-full ascwo-bg-[#88bebb]"></div>
                  {{ __('Customers choose size, shape, color and extras directly.', 'all-signs-customizer-for-woocommerce') }}
               </li>
               <li class="ascwo-flex ascwo-items-center ascwo-gap-3 ascwo-text-[13px] ascwo-text-[#1a1a1a]">
                  <div class="ascwo-w-2 ascwo-h-2 ascwo-rounded-full ascwo-bg-[#88bebb]"></div>
                  {{ __('Best for flexible catalogs with straightforward options.', 'all-signs-customizer-for-woocommerce') }}
               </li>
               <li class="ascwo-flex ascwo-items-center ascwo-gap-3 ascwo-text-[13px] ascwo-text-[#1a1a1a]">
                  <div class="ascwo-w-2 ascwo-h-2 ascwo-rounded-full ascwo-bg-[#88bebb]"></div>
                  {{ __('Good when each order is built from choices made one by one.', 'all-signs-customizer-for-woocommerce') }}
               </li>
            </ul>
          </div>

          <!-- Build from Presets -->
          <div
            @click="showPresetUpgradeNotice"
            aria-disabled="true"
            :class="[
              'ascwo-create-model-card ascwo-relative ascwo-transition-all ascwo-cursor-not-allowed ascwo-opacity-80',
              'ascwo-border-[#e1e3e5] ascwo-bg-white'
            ]"
          >
            <div class="ascwo-flex ascwo-gap-4 ascwo-mb-4">
               <div class="ascwo-w-28 ascwo-h-24 ascwo-rounded-xl ascwo-bg-white ascwo-border ascwo-border-solid ascwo-border-[#e1e3e5] ascwo-overflow-hidden ascwo-flex-shrink-0">
                  <img :src="setupModelImage('advance')" class="ascwo-w-full ascwo-h-full ascwo-object-cover" />
               </div>
               <div class="ascwo-flex-1">
                  <div class="ascwo-flex ascwo-items-center ascwo-justify-between ascwo-mb-1">
                     <h4 class="ascwo-text-[16px] ascwo-font-bold ascwo-text-[#1a1a1a] ascwo-m-0">{{ __('Build from Presets', 'all-signs-customizer-for-woocommerce') }}</h4>
                     <div class="ascwo-flex ascwo-gap-2">
                        <span class="ascwo-bg-[#e1f0ff] ascwo-text-[#005bd3] ascwo-text-[11px] ascwo-font-bold ascwo-px-3 ascwo-py-0.5 ascwo-rounded-full">{{ __('Structured', 'all-signs-customizer-for-woocommerce') }}</span>
                        <span class="ascwo-bg-[#fff7d1] ascwo-text-[#856404] ascwo-text-[11px] ascwo-font-bold ascwo-px-3 ascwo-py-0.5 ascwo-rounded-full">{{ __('Pro only', 'all-signs-customizer-for-woocommerce') }}</span>
                     </div>
                  </div>
                  <p class="ascwo-text-[13px] ascwo-text-[#616161] ascwo-leading-relaxed">
                     {{ __('Customers personalize predefined product components and ready-made structures.', 'all-signs-customizer-for-woocommerce') }}
                  </p>
               </div>
            </div>
            <ul class="ascwo-list-none ascwo-p-0 ascwo-m-0 ascwo-space-y-2">
               <li class="ascwo-flex ascwo-items-center ascwo-gap-3 ascwo-text-[13px] ascwo-text-[#1a1a1a]">
                  <div class="ascwo-w-2 ascwo-h-2 ascwo-rounded-full ascwo-bg-[#88bebb]"></div>
                  {{ __('Preset mode is locked in free and available only in Pro.', 'all-signs-customizer-for-woocommerce') }}
               </li>
               <li class="ascwo-flex ascwo-items-center ascwo-gap-3 ascwo-text-[13px] ascwo-text-[#1a1a1a]">
                  <div class="ascwo-w-2 ascwo-h-2 ascwo-rounded-full ascwo-bg-[#88bebb]"></div>
                  {{ sprintf(__('Upgrade to Pro at %s to unlock this setup model.', 'all-signs-customizer-for-woocommerce'), proUpgradeUrl) }}
               </li>
               <li class="ascwo-flex ascwo-items-center ascwo-gap-3 ascwo-text-[13px] ascwo-text-[#1a1a1a]">
                  <div class="ascwo-w-2 ascwo-h-2 ascwo-rounded-full ascwo-bg-[#88bebb]"></div>
                  {{ __('The free configuration stays on simple mode only.', 'all-signs-customizer-for-woocommerce') }}
               </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- STEP 4: Finalize -->
      <div v-if="wizard.step === 4" class="ascwo-step4 ascwo-p-5 md:ascwo-p-6">
        <div class="ascwo-step4-intro">
          <h2 class="ascwo-text-[20px] ascwo-leading-6 ascwo-font-[900] ascwo-text-[#111827]">{{ isEdit ? __('Edit configuration information', 'all-signs-customizer-for-woocommerce') : __('Finalize your configuration', 'all-signs-customizer-for-woocommerce') }}</h2>
          <p class="ascwo-text-[12px] ascwo-leading-5 ascwo-text-[#111827]">{{ __('Add the basic information for this configuration and link the products that should use it.', 'all-signs-customizer-for-woocommerce') }}</p>
        </div>

        <div class="ascwo-step4-layout ascwo-grid lg:ascwo-grid-cols-[7fr_3fr] ascwo-gap-4">
          <div class="ascwo-step4-main">
            <div class="ascwo-flex ascwo-flex-col ascwo-gap-3">
              <!-- Name Input -->
              <div class="ascwo-step4-card ascwo-bg-white ascwo-rounded-2xl ascwo-border ascwo-border-solid ascwo-border-[#dfe3e8] ascwo-p-4">
                <label class="ascwo-block ascwo-text-[12px] ascwo-font-medium ascwo-text-[#111827] ascwo-mb-2">{{ __('Name configuration', 'all-signs-customizer-for-woocommerce') }}</label>
                <input
                  v-model.trim="newConfig.name"
                  type="text"
                  class="ascwo-w-full ascwo-h-9 ascwo-px-3 ascwo-rounded-lg ascwo-border ascwo-border-solid ascwo-border-[#8c9196] focus:ascwo-border-[#008060] focus:ascwo-ring-1 focus:ascwo-ring-[#008060] ascwo-outline-none ascwo-text-[13px] ascwo-bg-white"
                  :class="{'ascwo-bg-[#fff4f4] ascwo-border-[#d72c0d]': !newConfig.name && wizard.attemptedCreate}"
                />
                <p v-if="!newConfig.name && wizard.attemptedCreate" class="ascwo-text-[#bf0711] ascwo-text-[12px] ascwo-mt-1 ascwo-flex ascwo-items-center ascwo-gap-1">
                   <InfoIcon class="ascwo-w-3 ascwo-h-3" /> {{ __('configuration name required', 'all-signs-customizer-for-woocommerce') }}
                </p>
              </div>

              <!-- Description -->
              <div class="ascwo-step4-card ascwo-bg-white ascwo-rounded-2xl ascwo-border ascwo-border-solid ascwo-border-[#dfe3e8] ascwo-p-4">
                <label class="ascwo-block ascwo-text-[12px] ascwo-font-medium ascwo-text-[#111827] ascwo-mb-2">{{ __('Description', 'all-signs-customizer-for-woocommerce') }}</label>
                <textarea
                  v-model="newConfig.description"
                  rows="2"
                  class="ascwo-w-full ascwo-h-9 ascwo-px-3 ascwo-py-2 ascwo-rounded-lg ascwo-border ascwo-border-solid ascwo-border-[#8c9196] focus:ascwo-border-[#008060] focus:ascwo-ring-1 focus:ascwo-ring-[#008060] ascwo-outline-none ascwo-text-[13px] ascwo-resize-none ascwo-bg-white"
                ></textarea>
              </div>

              <!-- Upload Image -->
              <div class="ascwo-step4-card ascwo-p-4 ascwo-bg-white ascwo-rounded-2xl ascwo-border ascwo-border-solid ascwo-border-[#dfe3e8]">
                 <label class="ascwo-block ascwo-text-[12px] ascwo-font-medium ascwo-text-[#111827] ascwo-mb-2">{{ __('Upload image', 'all-signs-customizer-for-woocommerce') }}</label>
                 <div class="ascwo-flex ascwo-items-center ascwo-gap-3 ascwo-h-9 ascwo-px-1 ascwo-bg-white ascwo-rounded-lg ascwo-border ascwo-border-solid ascwo-border-[#8c9196] ascwo-overflow-hidden">
                    <button @click="selectConfigIcon" class="ascwo-px-3 ascwo-py-1.5 ascwo-bg-[#006c67] ascwo-text-white ascwo-rounded-md ascwo-text-[12px] ascwo-leading-4 ascwo-font-[900] ascwo-cursor-pointer hover:ascwo-bg-[#005c58] ascwo-border-none">{{ __('Upload image', 'all-signs-customizer-for-woocommerce') }}</button>
                    <div v-if="newConfig.icon" class="ascwo-ml-auto ascwo-w-8 ascwo-h-8 ascwo-rounded-md ascwo-overflow-hidden ascwo-border ascwo-border-solid ascwo-border-[#dfe3e8]">
                       <img :src="newConfig.icon" class="ascwo-w-full ascwo-h-full ascwo-object-cover" />
                    </div>
                    <div v-else class="ascwo-ml-auto ascwo-w-8 ascwo-h-8 ascwo-rounded-md ascwo-border ascwo-border-solid ascwo-border-[#dfe3e8] ascwo-bg-white"></div>
                 </div>
              </div>

              <!-- Products Association -->
              <div class="ascwo-step4-card ascwo-p-4 ascwo-bg-white ascwo-rounded-2xl ascwo-border ascwo-border-solid ascwo-border-[#dfe3e8]">
                 <label class="ascwo-block ascwo-text-[12px] ascwo-font-medium ascwo-text-[#111827] ascwo-mb-2">{{ __('Products associated with configuration', 'all-signs-customizer-for-woocommerce') }}</label>
                 <div class="ascwo-flex ascwo-items-center ascwo-gap-3 ascwo-h-9 ascwo-px-3 ascwo-bg-white ascwo-rounded-lg ascwo-border ascwo-border-solid ascwo-border-[#8c9196]">
                    <button @click="showProductModal = true" class="ascwo-px-4 ascwo-py-1.5 ascwo-bg-[#006c67] ascwo-text-white ascwo-rounded-md ascwo-text-[12px] ascwo-leading-4 ascwo-font-[900] ascwo-cursor-pointer hover:ascwo-bg-[#005c58] ascwo-border-none">{{ __('select', 'all-signs-customizer-for-woocommerce') }}</button>
                    <div class="ascwo-flex-1 ascwo-text-[16px] ascwo-leading-6 ascwo-text-[#111827]">
                       {{ selectedWooProductIds.length }} {{ __('product(s) selected', 'all-signs-customizer-for-woocommerce') }}
                    </div>
                 </div>
                 <div v-if="selectedWooProducts.length" class="ascwo-mt-3">
                    <p class="ascwo-text-[13px] ascwo-leading-5 ascwo-text-[#374151] ascwo-mb-2">{{ __('Products associated with configuration:', 'all-signs-customizer-for-woocommerce') }}</p>
                    <div class="ascwo-flex ascwo-flex-wrap ascwo-gap-2">
                       <span
                         v-for="product in selectedWooProducts"
                         :key="product.value"
                         class="ascwo-inline-flex ascwo-items-center ascwo-gap-1 ascwo-max-w-full ascwo-bg-[#f1f2f3] ascwo-text-[#111827] ascwo-rounded-lg ascwo-px-2 ascwo-py-1 ascwo-text-[13px] ascwo-leading-5"
                       >
                         <span class="ascwo-truncate">{{ product.label }}</span>
                         <button
                           type="button"
                           @click="removeSelectedProduct(product.value)"
                           class="ascwo-inline-flex ascwo-items-center ascwo-justify-center ascwo-w-4 ascwo-h-4 ascwo-rounded-full ascwo-bg-transparent ascwo-border-none ascwo-p-0 ascwo-text-[#6b7280] hover:ascwo-text-[#111827] ascwo-cursor-pointer"
                           :aria-label="sprintf(__('Remove %s', 'all-signs-customizer-for-woocommerce'), product.label)"
                         >
                           <XIcon class="ascwo-w-3 ascwo-h-3" />
                         </button>
                       </span>
                    </div>
                 </div>
              </div>
            </div>
          </div>

          <!-- Summary Card -->
          <div class="ascwo-step4-card ascwo-step4-summary ascwo-bg-white ascwo-rounded-2xl ascwo-border ascwo-border-solid ascwo-border-[#dfe3e8] ascwo-p-5 ascwo-h-fit">
            <h3 class="ascwo-text-[13px] ascwo-font-[900] ascwo-text-[#111827] ascwo-mb-5 ascwo-mt-0">{{ __('Summary', 'all-signs-customizer-for-woocommerce') }}</h3>
            <div class="ascwo-space-y-3">
              <div>
                 <span class="ascwo-text-[12px] ascwo-text-[#6b7280]">{{ __('Product family:', 'all-signs-customizer-for-woocommerce') }}</span>
                 <span class="ascwo-ml-1 ascwo-text-[12px] ascwo-font-[900] ascwo-text-[#111827]">{{ selectedFamilyTitle }}</span>
              </div>
              <div>
                 <span class="ascwo-text-[12px] ascwo-text-[#6b7280]">{{ __('Material:', 'all-signs-customizer-for-woocommerce') }}</span>
                 <span class="ascwo-ml-1 ascwo-text-[12px] ascwo-font-[900] ascwo-text-[#111827]">{{ selectedMaterialsNames }}</span>
              </div>
              <div>
                 <span class="ascwo-text-[12px] ascwo-text-[#6b7280]">{{ __('Configuration model:', 'all-signs-customizer-for-woocommerce') }}</span>
                 <span class="ascwo-ml-1 ascwo-text-[12px] ascwo-font-[900] ascwo-text-[#111827]">{{ wizard.materialType === 'simple' ? (selectedFamilyTitle === 'Letter signs' ? 'Direct Options' : 'Flexible') : 'Preset Components' }}</span>
              </div>
              <div>
                 <span class="ascwo-text-[12px] ascwo-text-[#6b7280]">{{ __('Name:', 'all-signs-customizer-for-woocommerce') }}</span>
                 <span class="ascwo-ml-1 ascwo-text-[12px] ascwo-font-[900] ascwo-text-[#111827]">{{ newConfig.name }}</span>
              </div>
              <div>
                 <span class="ascwo-text-[12px] ascwo-text-[#6b7280]">{{ __('Description:', 'all-signs-customizer-for-woocommerce') }}</span>
                 <span class="ascwo-ml-1 ascwo-text-[12px] ascwo-font-[900] ascwo-text-[#111827]">{{ newConfig.description }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Card Footer -->
      <div class="ascwo-bg-[#fbfcfc] ascwo-border-t ascwo-border-solid ascwo-border-[#e1e3e5] ascwo-px-10 ascwo-py-5 ascwo-flex ascwo-items-center ascwo-justify-between">
        <p class="ascwo-text-[13px] ascwo-text-[#616161] ascwo-m-0">
          {{ isEdit ? __('Only the configuration information can be edited here.', 'all-signs-customizer-for-woocommerce') : getStepTip(wizard.step) }}
        </p>
        <div class="ascwo-flex ascwo-gap-3">
          <button
            @click="goBack"
            class="ascwo-ui-button-secondary"
          >
            {{ __('Back', 'all-signs-customizer-for-woocommerce') }}
          </button>
          <button
            v-if="!isEdit && wizard.step === 1"
            @click="handleMainAction"
            :disabled="!canNext"
            class="ascwo-primary-button ascwo-ui-button-primary disabled:ascwo-opacity-50 disabled:ascwo-cursor-not-allowed"
          >
            {{ __('Create', 'all-signs-customizer-for-woocommerce') }}
          </button>
          <button
            v-else
            @click="handleMainAction"
            :disabled="!canNext || isLoading"
            :class="[
              'ascwo-transition-all',
              wizard.step === 4 ? 'ascwo-wizard-final-action' : '',
              canNext && !isLoading
                ? 'ascwo-primary-button ascwo-ui-button-primary'
                : 'ascwo-ui-button-disabled'
            ]"
          >
            {{ wizard.step === 4 ? (isEdit ? __('Update', 'all-signs-customizer-for-woocommerce') : __('Create', 'all-signs-customizer-for-woocommerce')) : __('Next', 'all-signs-customizer-for-woocommerce') }}
          </button>
        </div>
      </div>
    </div>

    <!-- Product Selection Modal -->
    <div v-if="showProductModal" class="ascwo-fixed ascwo-inset-0 ascwo-z-[1000] ascwo-flex ascwo-items-center ascwo-justify-center">
      <div class="ascwo-absolute ascwo-inset-0 ascwo-bg-black/40" @click="showProductModal = false"></div>
      <div class="ascwo-relative ascwo-bg-white ascwo-rounded-[20px] ascwo-shadow-2xl ascwo-overflow-hidden" style="width: min(776px, calc(100vw - 48px)); max-width: calc(100vw - 48px);">
        <div class="ascwo-flex ascwo-items-center ascwo-justify-between ascwo-h-[66px] ascwo-px-5 ascwo-border-b ascwo-border-solid ascwo-border-[#e1e3e5]">
          <h3 class="ascwo-text-[18px] ascwo-leading-6 ascwo-font-[900] ascwo-text-[#111827]">{{ __('Select products', 'all-signs-customizer-for-woocommerce') }}</h3>
          <button @click="showProductModal = false" class="ascwo-p-2 ascwo-rounded-full hover:ascwo-bg-[#f6f6f7] ascwo-border-0 ascwo-bg-transparent ascwo-cursor-pointer">
            <XIcon class="ascwo-w-5 ascwo-h-5 ascwo-text-[#8c9196]" />
          </button>
        </div>
        <div class="ascwo-pt-3">
           <div class="ascwo-flex ascwo-gap-2 ascwo-px-4 ascwo-mb-2">
              <div class="ascwo-flex-1 ascwo-relative">
                 <SearchIcon class="ascwo-pointer-events-none ascwo-absolute ascwo-top-1/2 -ascwo-translate-y-1/2 ascwo-w-5 ascwo-h-5 ascwo-text-[#5c5f62]" style="left: 14px;" />
                 <input type="text" v-model="productSearchQuery" :placeholder="__('Search products', 'all-signs-customizer-for-woocommerce')" class="ascwo-box-border ascwo-w-full ascwo-h-[38px] ascwo-pr-4 ascwo-rounded-lg ascwo-border ascwo-border-solid ascwo-border-[#8c9196] ascwo-outline-none focus:ascwo-border-[#005bd3] focus:ascwo-ring-2 focus:ascwo-ring-[#005bd3] ascwo-text-[16px] ascwo-leading-[38px] ascwo-bg-white" style="padding-left: 42px;">
              </div>
              <div class="ascwo-relative ascwo-w-[240px]">
                 <button
                   type="button"
                   @click="showSearchByMenu = !showSearchByMenu"
                   class="ascwo-box-border ascwo-w-full ascwo-h-[38px] ascwo-px-4 ascwo-pr-10 ascwo-rounded-lg ascwo-border ascwo-border-solid ascwo-border-[#8c9196] ascwo-bg-white ascwo-text-[16px] ascwo-text-[#303030] ascwo-text-left ascwo-cursor-pointer focus:ascwo-border-[#005bd3] focus:ascwo-ring-2 focus:ascwo-ring-[#005bd3]"
                 >
                   {{ __('Search by', 'all-signs-customizer-for-woocommerce') }} {{ searchByLabel }}
                 </button>
                 <ChevronDownIcon class="ascwo-absolute ascwo-right-3 ascwo-top-1/2 -ascwo-translate-y-1/2 ascwo-w-4 ascwo-h-4 ascwo-text-[#616161] ascwo-pointer-events-none" />
                 <div v-if="showSearchByMenu" class="ascwo-absolute ascwo-left-0 ascwo-right-0 ascwo-top-full ascwo-z-20 ascwo-bg-white ascwo-border ascwo-border-solid ascwo-border-[#8c9196] ascwo-shadow-lg">
                   <button
                     v-for="option in searchByOptions"
                     :key="option.value"
                     type="button"
                     @click="selectSearchBy(option.value)"
                     :class="[
                       'ascwo-w-full ascwo-px-4 ascwo-py-1.5 ascwo-text-left ascwo-text-[16px] ascwo-leading-6 ascwo-border-none ascwo-cursor-pointer',
                       searchBy === option.value ? 'ascwo-bg-[#005bd3] ascwo-text-white' : 'ascwo-bg-white ascwo-text-[#111827] hover:ascwo-bg-[#f6f6f7]'
                     ]"
                   >
                     {{ option.label }}
                   </button>
                 </div>
              </div>
           </div>
           <div class="ascwo-relative ascwo-px-4 ascwo-mb-3">
              <button @click="showFilterMenu = !showFilterMenu" class="ascwo-px-3 ascwo-py-1 ascwo-rounded-full ascwo-text-[16px] ascwo-leading-6 ascwo-text-[#303030] ascwo-bg-white ascwo-border ascwo-border-solid ascwo-border-[#dfe3e8] hover:ascwo-bg-[#f6f6f7] ascwo-cursor-pointer">{{ __('Add filter +', 'all-signs-customizer-for-woocommerce') }}</button>
              <div v-if="showFilterMenu" class="ascwo-absolute ascwo-top-full ascwo-left-4 ascwo-z-[10] ascwo-mt-1 ascwo-w-[116px] ascwo-bg-white ascwo-rounded-xl ascwo-shadow-xl ascwo-border ascwo-border-solid ascwo-border-[#dfe3e8] ascwo-py-2">
                 <button v-for="f in ['Categories', 'Collection', 'Types', 'Tags', 'Vendors']" :key="f" class="ascwo-w-full ascwo-px-4 ascwo-py-2 ascwo-text-left ascwo-text-[16px] ascwo-leading-6 ascwo-text-[#303030] ascwo-bg-transparent ascwo-border-none hover:ascwo-bg-[#f6f6f7] ascwo-cursor-pointer">{{ f }}</button>
              </div>
           </div>

           <div class="ascwo-h-[312px] ascwo-overflow-y-auto ascwo-border-t ascwo-border-solid ascwo-border-[#e1e3e5]">
              <div v-for="p in filteredWooProducts" :key="p.value" class="ascwo-flex ascwo-items-center ascwo-gap-4 ascwo-min-h-[72px] ascwo-px-5 ascwo-py-2 ascwo-border-b ascwo-border-solid ascwo-border-[#e1e3e5] hover:ascwo-bg-[#f6f6f7]">
                 <input type="checkbox" :value="p.value" v-model="selectedWooProductIds" class="ascwo-w-5 ascwo-h-5 ascwo-rounded ascwo-border-[#8c9196] ascwo-cursor-pointer">
                 <div class="ascwo-w-[50px] ascwo-h-[50px] ascwo-bg-[#f6f6f7] ascwo-rounded-lg ascwo-overflow-hidden ascwo-flex ascwo-items-center ascwo-justify-center ascwo-flex-shrink-0 ascwo-border ascwo-border-solid ascwo-border-[#e1e3e5]">
                    <img v-if="p.image" :src="p.image" class="ascwo-w-full ascwo-h-full ascwo-object-cover">
                    <ImageIcon v-else class="ascwo-w-5 ascwo-h-5 ascwo-text-gray-300" />
                 </div>
                 <span class="ascwo-text-[16px] ascwo-leading-6 ascwo-text-[#111827] ascwo-truncate">{{ p.label }}</span>
              </div>
           </div>
        </div>
        <div class="ascwo-h-[76px] ascwo-px-5 ascwo-bg-white ascwo-border-t ascwo-border-solid ascwo-border-[#e1e3e5] ascwo-flex ascwo-items-center ascwo-justify-between">
           <span class="ascwo-text-[16px] ascwo-leading-6 ascwo-text-[#303030]">{{ selectedWooProductIds.length }} {{ __('products selected', 'all-signs-customizer-for-woocommerce') }}</span>
           <div class="ascwo-flex ascwo-gap-3">
              <button @click="showProductModal = false" class="ascwo-ui-button-secondary">{{ __('Cancel', 'all-signs-customizer-for-woocommerce') }}</button>
              <button @click="showProductModal = false" :disabled="selectedWooProductIds.length === 0" class="ascwo-primary-button ascwo-ui-button-primary disabled:ascwo-bg-[#d8d8d8] disabled:ascwo-cursor-not-allowed">{{ __('Select', 'all-signs-customizer-for-woocommerce') }}</button>
           </div>
        </div>
      </div>
    </div>

    <Teleport to="body">
      <!-- Review Configuration Modal -->
      <div v-if="showReviewModal" class="ascwo-review-overlay ascwo-fixed ascwo-inset-0 ascwo-z-[100000] ascwo-flex ascwo-items-center ascwo-justify-center">
        <div class="ascwo-absolute ascwo-inset-0 ascwo-bg-black/40" @click="!isLoading && (showReviewModal = false)"></div>
        <div class="ascwo-review-modal ascwo-relative ascwo-bg-white ascwo-shadow-2xl ascwo-overflow-hidden" style="width: min(980px, calc(100vw - 48px));">
          <div class="ascwo-review-header ascwo-flex ascwo-items-center ascwo-justify-between ascwo-border-b ascwo-border-solid ascwo-border-[#e1e3e5]">
            <h3 class="ascwo-text-[18px] ascwo-leading-6 ascwo-font-[900] ascwo-text-[#111827] ascwo-truncate">{{ __('Review configuration before creation', 'all-signs-customizer-for-woocommerce') }}</h3>
            <button @click="showReviewModal = false" :disabled="isLoading" class="ascwo-p-2 ascwo-rounded-full hover:ascwo-bg-gray-100 ascwo-border-0 ascwo-bg-transparent ascwo-cursor-pointer disabled:ascwo-opacity-50 disabled:ascwo-cursor-not-allowed">
              <XIcon class="ascwo-w-5 ascwo-h-5 ascwo-text-[#8c9196]" />
            </button>
          </div>
          <div class="ascwo-review-body ascwo-p-5 ascwo-grid md:ascwo-grid-cols-[1.4fr_1fr] ascwo-gap-4">
             <div class="ascwo-review-panel ascwo-review-panel-summary ascwo-bg-[#f7f9fc] ascwo-border ascwo-border-solid ascwo-border-[#dbe3ea] ascwo-rounded-2xl">
                <h4 class="ascwo-review-panel-title">{{ __('Configuration summary', 'all-signs-customizer-for-woocommerce') }}</h4>
                <div class="ascwo-review-summary-list">
                   <p><span class="ascwo-text-[#667085]">{{ __('Product family:', 'all-signs-customizer-for-woocommerce') }}</span> <span class="ascwo-font-[900] ascwo-text-[#101828]">{{ selectedFamilyTitle }}</span></p>
                   <p><span class="ascwo-text-[#667085]">{{ __('Material:', 'all-signs-customizer-for-woocommerce') }}</span> <span class="ascwo-font-[900] ascwo-text-[#101828]">{{ selectedMaterialsNames }}</span></p>
                   <p><span class="ascwo-text-[#667085]">{{ __('Setup model:', 'all-signs-customizer-for-woocommerce') }}</span> <span class="ascwo-font-[900] ascwo-text-[#101828]">{{ wizard.materialType === 'simple' ? 'Direct Options' : 'Preset Components' }}</span></p>
                   <p><span class="ascwo-text-[#667085]">{{ __('Configuration name:', 'all-signs-customizer-for-woocommerce') }}</span> <span class="ascwo-font-[900] ascwo-text-[#101828]">{{ newConfig.name }}</span></p>
                </div>
             </div>
             <div class="ascwo-review-panel ascwo-review-panel-starter ascwo-bg-[#f7f9fc] ascwo-border ascwo-border-solid ascwo-border-[#dbe3ea] ascwo-rounded-2xl">
                <h4 class="ascwo-review-panel-title">{{ __('Starter template', 'all-signs-customizer-for-woocommerce') }}</h4>
                <p class="ascwo-review-description">{{ __('Decide if you want to start from a ready template or create the configuration from a blank setup.', 'all-signs-customizer-for-woocommerce') }}</p>
                <div class="ascwo-review-choice-row">
                   <button @click="wizard.includeDemo = false" :class="['ascwo-review-choice-button', !wizard.includeDemo ? 'is-selected' : '']">{{ __('Start blank', 'all-signs-customizer-for-woocommerce') }}</button>
                   <button @click="wizard.includeDemo = true" :class="['ascwo-review-choice-button', wizard.includeDemo ? 'is-selected' : '']">{{ __('Include starter template', 'all-signs-customizer-for-woocommerce') }}</button>
                </div>
                <div v-if="wizard.includeDemo" class="ascwo-review-selected-template">
                  <p class="ascwo-review-selected-label">{{ __('Selected template', 'all-signs-customizer-for-woocommerce') }}</p>
                  <p class="ascwo-review-selected-name">{{ __('Generated starter data', 'all-signs-customizer-for-woocommerce') }}</p>
                  <p class="ascwo-review-selected-help">{{ __('Automatically selected from your product family, material and setup model.', 'all-signs-customizer-for-woocommerce') }}</p>
                </div>
                <p v-else class="ascwo-review-blank-help">{{ __('No starter template will be imported. The configuration will be created from your selected setup only.', 'all-signs-customizer-for-woocommerce') }}</p>
             </div>
          </div>
          <div class="ascwo-review-footer ascwo-bg-white ascwo-border-t ascwo-border-solid ascwo-border-[#e1e3e5] ascwo-flex ascwo-justify-end ascwo-items-center ascwo-gap-3">
             <button @click="showReviewModal = false" :disabled="isLoading" class="ascwo-review-secondary-button">{{ __('Back', 'all-signs-customizer-for-woocommerce') }}</button>
             <button @click="finalCreate" :disabled="isLoading" class="ascwo-review-primary-button ascwo-inline-flex ascwo-items-center ascwo-gap-2">
               <Loader2Icon v-if="isLoading" class="ascwo-w-4 ascwo-h-4 ascwo-animate-spin" />
               <span>{{ isLoading ? __('Creating', 'all-signs-customizer-for-woocommerce') : __('Create configuration', 'all-signs-customizer-for-woocommerce') }}</span>
             </button>
             <span v-if="isLoading" class="ascwo-creating-dots" aria-hidden="true">
               <span></span><span></span><span></span>
             </span>
          </div>
        </div>
      </div>
    </Teleport>

    <Teleport to="body">
      <div v-if="showExternalPluginModal" class="ascwo-fixed ascwo-inset-0 ascwo-z-[100000] ascwo-flex ascwo-items-center ascwo-justify-center">
        <div class="ascwo-absolute ascwo-inset-0 ascwo-bg-black/40" @click="closeExternalPluginModal"></div>
        <div class="ascwo-external-plugin-modal ascwo-relative ascwo-bg-white ascwo-rounded-[20px] ascwo-shadow-2xl ascwo-overflow-hidden" style="width: min(620px, calc(100vw - 48px));">
          <div class="ascwo-h-[66px] ascwo-flex ascwo-items-center ascwo-justify-between ascwo-px-5 ascwo-border-b ascwo-border-solid ascwo-border-[#dfe3e8]">
            <h3 class="ascwo-text-[18px] ascwo-leading-6 ascwo-font-[900] ascwo-text-[#111827] ascwo-m-0">{{ __('Letter signs require a dedicated plugin', 'all-signs-customizer-for-woocommerce') }}</h3>
            <button @click="closeExternalPluginModal" class="ascwo-external-icon-button ascwo-p-2 ascwo-rounded-full ascwo-border-0 ascwo-bg-transparent ascwo-cursor-pointer">
              <XIcon class="ascwo-w-5 ascwo-h-5 ascwo-text-[#8c9196]" />
            </button>
          </div>
          <div class="ascwo-p-5">
            <p class="ascwo-text-[14px] ascwo-leading-6 ascwo-text-[#303030] ascwo-m-0 ascwo-mb-4">
              {{ __('Letter signs are handled by Neon & Channel Product Customizer, a dedicated plugin for neon and channel-letter products.', 'all-signs-customizer-for-woocommerce') }}
            </p>
            <p class="ascwo-text-[13px] ascwo-leading-5 ascwo-text-[#616161] ascwo-m-0">
              {{ __('Use one of the links below to install the free version or view the full product page.', 'all-signs-customizer-for-woocommerce') }}
            </p>
          </div>
          <div class="ascwo-h-[76px] ascwo-px-5 ascwo-bg-white ascwo-border-t ascwo-border-solid ascwo-border-[#e1e3e5] ascwo-flex ascwo-justify-end ascwo-items-center ascwo-gap-3">
            <button @click="closeExternalPluginModal" class="ascwo-plugin-modal-button ascwo-plugin-modal-button-secondary">{{ __('Close', 'all-signs-customizer-for-woocommerce') }}</button>
            <a href="https://fr.wordpress.org/plugins/neon-channel-product-customizer-free/" target="_blank" rel="noopener noreferrer" class="ascwo-plugin-modal-button ascwo-plugin-modal-button-secondary ascwo-inline-flex ascwo-items-center ascwo-no-underline">
              {{ __('Free plugin', 'all-signs-customizer-for-woocommerce') }}
            </a>
            <a href="https://signsdesigner.us/neon-channel-product-customizer-product/" target="_blank" rel="noopener noreferrer" class="ascwo-plugin-modal-button ascwo-plugin-modal-button-primary ascwo-inline-flex ascwo-items-center ascwo-no-underline">
              {{ __('Product page', 'all-signs-customizer-for-woocommerce') }}
            </a>
          </div>
        </div>
      </div>

      <!-- Gallery Preview Modal -->
      <div v-if="showGalleryPreview" class="ascwo-gallery-overlay ascwo-fixed ascwo-inset-0 ascwo-z-[100000] ascwo-flex ascwo-items-start ascwo-justify-center">
        <div class="ascwo-absolute ascwo-inset-0 ascwo-bg-black/40" @click="closePreview"></div>
        <div
          class="ascwo-gallery-modal ascwo-relative ascwo-bg-white ascwo-rounded-[20px] ascwo-shadow-2xl ascwo-overflow-hidden ascwo-flex ascwo-flex-col"
          style="width: 980px; max-width: calc(100vw - 64px); max-height: calc(100vh - 224px);"
        >
          <div class="ascwo-gallery-header ascwo-h-[66px] ascwo-flex ascwo-items-center ascwo-justify-between ascwo-px-5 ascwo-bg-white ascwo-border-b ascwo-border-solid ascwo-border-[#dfe3e8] ascwo-flex-shrink-0">
            <h3 class="ascwo-text-[18px] ascwo-leading-6 ascwo-font-[900] ascwo-text-[#111827] ascwo-m-0">{{ previewItem?.title }} {{ __('previews', 'all-signs-customizer-for-woocommerce') }}</h3>
            <button @click="closePreview" class="ascwo-p-2 ascwo-rounded-full hover:ascwo-bg-[#f6f6f7] ascwo-border-0 ascwo-bg-transparent ascwo-cursor-pointer">
              <XIcon class="ascwo-w-5 ascwo-h-5 ascwo-text-[#8c9196]" />
            </button>
          </div>
          <div class="ascwo-gallery-body ascwo-p-5 ascwo-overflow-y-auto">
            <div class="ascwo-gallery-grid ascwo-grid ascwo-grid-cols-1 md:ascwo-grid-cols-3">
              <div v-for="(img, idx) in previewImages" :key="idx" class="ascwo-gallery-tile ascwo-overflow-hidden ascwo-bg-[#f8fafc] ascwo-border ascwo-border-solid ascwo-border-[#e4e7ec]">
                <img :src="mediaSrc(img)" class="ascwo-w-full ascwo-h-full ascwo-object-cover" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
/* global defineProps, defineEmits, wp */
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import api from "@/admin/Api/api";
import toastMessage from "@/admin/utils/functions";
import {
  configurationDemoData,
  RequiredOptionsBorders,
  RequiredOptionsColors,
  RequiredOptionsFixingMethods,
  RequiredOptionsFonts,
  RequiredOptionsLightings,
  RequiredOptionsPricings,
  RequiredOptionsShapes,
  RequiredOptionsSizes,
} from "@/admin/utils/create-config.data";
import { resolveAdminImageUrl, adminImageUrl } from "@/admin/utils/admin-assets";
import {
  ChevronRightIcon,
  ChevronDownIcon,
  EyeIcon,
  ImageIcon,
  XIcon,
  InfoIcon,
  SearchIcon,
  Loader2Icon
} from 'lucide-vue-next';
import { __, sprintf } from "@wordpress/i18n";

const props = defineProps({
  isEdit: { type: Boolean, default: false },
  configId: { type: [String, Number], default: "" },
  configToEdit: { type: Object, default: () => ({}) },
});
const isEdit = computed(() => props.isEdit);

const emit = defineEmits(['onFinish', 'onCancel']);
const router = useRouter();

const mediaSrc = (path) => {
  return resolveAdminImageUrl(getFirstImage(path));
};
const setupModelImage = (type) => adminImageUrl(
  type === 'advance'
    ? '/images/create-config/setup-models/build-from-preset.webp'
    : '/images/create-config/setup-models/build-from-option.webp'
);
const proUpgradeUrl = 'https://signsdesigner.us/all-signs-customizer-for-woocommerce/';
const showPresetUpgradeNotice = () => {
  toastMessage(
    sprintf(
      __('Preset mode is available only in Pro. Go to %s to unlock it.', 'all-signs-customizer-for-woocommerce'),
      proUpgradeUrl
    ),
    'warning'
  );
};
const showGalleryPreview = ref(false);
const showProductModal = ref(false);
const showReviewModal = ref(false);
const showExternalPluginModal = ref(false);
const showFilterMenu = ref(false);
const showSearchByMenu = ref(false);
const previewItem = ref(null);
const isLoading = ref(false);
const productSearchQuery = ref("");
const searchBy = ref("all");

const wizard = ref({
  step: 1,
  productType: '',
  selectedMaterials: [],
  materialType: 'simple',
  includeDemo: false,
  attemptedCreate: false,
});

const newConfig = ref({ name: "", description: "", icon: "" });
const selectedWooProductIds = ref([]);
const wooProductsOptions = ref([]);
const editConfig = ref(null);

const productFamilies = [
  {
    id: 'signboard',
    title: __('Signs & Panels', 'all-signs-customizer-for-woocommerce'),
    desc: __('Rigid signage products like office signs, plaques, engraved panels and general display boards.', 'all-signs-customizer-for-woocommerce'),
    image: '/images/create-config/families/signs-panels.webp',
    previews: ['/images/create-config/families/signs-panels.webp']
  },
  { id: 'banner', title: __('Banners', 'all-signs-customizer-for-woocommerce'), desc: __('Flexible printed products for events, retail and promotional display.', 'all-signs-customizer-for-woocommerce'), image: '/images/create-config/families/banners.webp', previews: ['/images/create-config/families/banners.webp'] },
  { id: 'sticker', title: __('Stickers', 'all-signs-customizer-for-woocommerce'), desc: __('Adhesive products for windows, packaging, walls and floors.', 'all-signs-customizer-for-woocommerce'), image: '/images/create-config/families/stickers.webp', previews: ['/images/create-config/families/stickers.webp'] },
  { id: 'letter-signs', title: __('Letter signs', 'all-signs-customizer-for-woocommerce'), desc: __('Text-based illuminated or fabricated signs built around custom letter forms.', 'all-signs-customizer-for-woocommerce'), image: '/images/create-config/families/letter-signs.webp', previews: ['/images/create-config/families/letter-signs.webp'], externalPlugin: true },
  { id: 'ai-signs', title: __('AI Signs', 'all-signs-customizer-for-woocommerce'), desc: __('AI-assisted logo sign configurations for neon and channel style branded signage.', 'all-signs-customizer-for-woocommerce'), image: '/images/create-config/families/ai-signs.webp', comingSoon: true, previews: ['/images/create-config/families/ai-signs.webp'] },
  { id: 'lightbox', title: __('Lightbox', 'all-signs-customizer-for-woocommerce'), desc: __('Illuminated lightbox sign configurations. This category is coming soon.', 'all-signs-customizer-for-woocommerce'), image: '/images/create-config/families/lightbox.webp', comingSoon: true, previews: ['/images/create-config/families/lightbox.webp'] }
];

const allMaterials = [
  { id: 'acrylic', title: 'Acrylic', family: 'signboard', image: '/images/create-config/materials/signs-panels/acrylic/acrylic.webp', previews: ['/images/create-config/materials/signs-panels/acrylic/01.webp', '/images/create-config/materials/signs-panels/acrylic/02.webp', '/images/create-config/materials/signs-panels/acrylic/03.webp'] },
  { id: 'aluminium', title: 'Aluminium', family: 'signboard', image: '/images/create-config/materials/signs-panels/aluminium/aluminium.webp', previews: ['/images/create-config/materials/signs-panels/aluminium/01.webp', '/images/create-config/materials/signs-panels/aluminium/02.webp', '/images/create-config/materials/signs-panels/aluminium/03.webp'] },
  { id: 'brass', title: 'Brass', family: 'signboard', image: '/images/create-config/materials/signs-panels/brass/brass.webp', previews: ['/images/create-config/materials/signs-panels/brass/01.webp', '/images/create-config/materials/signs-panels/brass/02.webp', '/images/create-config/materials/signs-panels/brass/03.webp'] },
  { id: 'eco-friendly', title: 'Eco friendly', family: 'signboard', image: '/images/create-config/materials/signs-panels/eco-friendly/eco-friendly.webp', previews: ['/images/create-config/materials/signs-panels/eco-friendly/01.webp', '/images/create-config/materials/signs-panels/eco-friendly/02.webp', '/images/create-config/materials/signs-panels/eco-friendly/03.webp'] },
  { id: 'magnet', title: 'Magnet', family: 'signboard', image: '/images/create-config/materials/signs-panels/magnet/magnet.webp', previews: ['/images/create-config/materials/signs-panels/magnet/01.webp', '/images/create-config/materials/signs-panels/magnet/02.webp', '/images/create-config/materials/signs-panels/magnet/03.webp'] },
  { id: 'photo-paper', title: 'Photo paper', family: 'signboard', image: '/images/create-config/materials/signs-panels/photo-paper/01.webp', previews: ['/images/create-config/materials/signs-panels/photo-paper/01.webp', '/images/create-config/materials/signs-panels/photo-paper/02.webp', '/images/create-config/materials/signs-panels/photo-paper/03.webp'] },
  { id: 'plastic', title: 'Plastic', family: 'signboard', image: '/images/create-config/materials/signs-panels/plastic/01.webp', previews: ['/images/create-config/materials/signs-panels/plastic/01.webp', '/images/create-config/materials/signs-panels/plastic/02.webp', '/images/create-config/materials/signs-panels/plastic/03.webp'] },
  { id: 'stainless-steel', title: 'Stainless steel', family: 'signboard', image: '/images/create-config/materials/signs-panels/stainless-steel/stainless-steel.webp', previews: ['/images/create-config/materials/signs-panels/stainless-steel/01.webp', '/images/create-config/materials/signs-panels/stainless-steel/02.webp', '/images/create-config/materials/signs-panels/stainless-steel/03.webp'] },
  { id: 'vinyl', title: 'Vinyl', family: 'signboard', image: '/images/create-config/materials/signs-panels/vinyl/vinyl.webp', previews: ['/images/create-config/materials/signs-panels/vinyl/01.webp', '/images/create-config/materials/signs-panels/vinyl/02.webp', '/images/create-config/materials/signs-panels/vinyl/03.webp'] },
  { id: 'wood', title: 'Wood', family: 'signboard', image: '/images/create-config/materials/signs-panels/wood/wood.webp', previews: ['/images/create-config/materials/signs-panels/wood/wood-1.webp', '/images/create-config/materials/signs-panels/wood/wood-2.webp', '/images/create-config/materials/signs-panels/wood/wood-3.webp'] },
  { id: 'fabric', title: 'Fabric', family: 'banner', image: '/images/create-config/materials/banners/fabric/fabric.webp', previews: ['/images/create-config/materials/banners/fabric/01.webp', '/images/create-config/materials/banners/fabric/02.webp', '/images/create-config/materials/banners/fabric/03.webp'] },
  { id: 'mesh', title: 'Mesh', family: 'banner', image: '/images/create-config/materials/banners/mesh/mesh.webp', previews: ['/images/create-config/materials/banners/mesh/01.webp', '/images/create-config/materials/banners/mesh/02.webp', '/images/create-config/materials/banners/mesh/03.webp'] },
  { id: 'banner-vinyl', title: 'Vinyl', family: 'banner', image: '/images/create-config/materials/banners/vinyl/vinyl.webp', previews: ['/images/create-config/materials/banners/vinyl/01.webp', '/images/create-config/materials/banners/vinyl/02.webp', '/images/create-config/materials/banners/vinyl/03.webp'] },
  { id: 'paper', title: 'Paper', family: 'sticker', image: '/images/create-config/materials/stickers/paper/paper.webp', previews: ['/images/create-config/materials/stickers/paper/01.webp', '/images/create-config/materials/stickers/paper/02.webp', '/images/create-config/materials/stickers/paper/03.webp'] },
  { id: 'pvc', title: 'PVC', family: 'sticker', image: '/images/create-config/materials/stickers/pvc/pvc.webp', previews: ['/images/create-config/materials/stickers/pvc/01.webp', '/images/create-config/materials/stickers/pvc/02.webp', '/images/create-config/materials/stickers/pvc/03.webp'] },
  { id: 'sticker-vinyl', title: 'Vinyl', family: 'sticker', image: '/images/create-config/materials/stickers/vinyl/vinyl.webp', previews: ['/images/create-config/materials/stickers/vinyl/01.webp', '/images/create-config/materials/stickers/vinyl/02.webp', '/images/create-config/materials/stickers/vinyl/03.webp'] },
  { id: 'film', title: 'Film', family: 'sticker', image: '/images/create-config/materials/stickers/film/film.webp', previews: ['/images/create-config/materials/stickers/film/01.webp', '/images/create-config/materials/stickers/film/02.webp', '/images/create-config/materials/stickers/film/03.webp'] },
];

const getFirstImage = (image) => Array.isArray(image) ? image[0] : image;
const availableMaterials = computed(() => allMaterials);

const filteredMaterials = computed(() => availableMaterials.value.filter(m => m.family === wizard.value.productType));
const selectedFamilyTitle = computed(() => productFamilies.find(f => f.id === wizard.value.productType)?.title || '');
const selectedFamilySlug = computed(() => {
  if (wizard.value.productType === 'banner') return 'banners';
  if (wizard.value.productType === 'sticker') return 'stickers';
  return 'signs-panels';
});
const canonicalConfigProductType = computed(() => selectedFamilySlug.value);
const selectedMaterialsNames = computed(() => wizard.value.selectedMaterials.map(mid => availableMaterials.value.find(m => m.id === mid)?.title).filter(Boolean).join(', '));
const normalizeEditorProductType = (productType) => {
  const value = String(productType || '').trim();
  if (value === 'banner' || value === 'banners') return 'banner';
  if (value === 'sticker' || value === 'stickers') return 'sticker';
  return 'signboard';
};
const extractSelectedMaterialIds = (config) => {
  const data = config?.data || {};
  const directIds = config?.selectedMaterialIds || data?.selectedMaterialIds || data?.settings?.selectedMaterialIds;
  if (Array.isArray(directIds) && directIds.length) {
    return directIds;
  }

  const items = data?.additionalOptions?.materials?.items || config?.additionalOptions?.materials?.items || [];
  if (!Array.isArray(items)) {
    return [];
  }

  return items
    .map((item) => item?.materialKey || item?.sourceMaterialId || item?.id)
    .filter(Boolean);
};
const previewImages = computed(() => {
  if (!previewItem.value) return [];
  return Array.from(new Set([
    previewItem.value.image || '',
    ...(previewItem.value.previews || []),
  ].filter(Boolean)));
});
const selectedWooProducts = computed(() => {
  const selected = new Set(selectedWooProductIds.value.map(String));
  return wooProductsOptions.value.filter(product => selected.has(String(product.value)));
});
const searchByOptions = computed(() => [
  { value: 'all', label: __('All', 'all-signs-customizer-for-woocommerce') },
  { value: 'title', label: __('Product title', 'all-signs-customizer-for-woocommerce') },
  { value: 'id', label: __('Product ID', 'all-signs-customizer-for-woocommerce') },
  { value: 'barcode', label: __('Barcode', 'all-signs-customizer-for-woocommerce') },
  { value: 'sku', label: __('SKU', 'all-signs-customizer-for-woocommerce') },
]);
const searchByLabel = computed(() => searchByOptions.value.find(option => option.value === searchBy.value)?.label || __('All', 'all-signs-customizer-for-woocommerce'));

const selectSearchBy = (value) => {
  searchBy.value = value;
  showSearchByMenu.value = false;
};

const removeSelectedProduct = (productId) => {
  selectedWooProductIds.value = selectedWooProductIds.value.filter(id => String(id) !== String(productId));
};

const cloneDeep = (value) => JSON.parse(JSON.stringify(value));

const normalizeFontSource = (font, index) => ({
  id: String(font?.id || font?.managedFontId || `font-${index + 1}`),
  label: String(font?.label || font?.name || font?.family || `Font ${index + 1}`),
  url: String(font?.url || ""),
  previewImg: String(font?.previewImg || font?.preview || ""),
  isGoogleFont: Boolean(font?.isGoogleFont),
  isDefault: Boolean(font?.isDefault),
  managedFontId: index,
});

const buildFontsSection = (sourceFonts = []) => {
  const items = Array.isArray(sourceFonts) ? sourceFonts.map(normalizeFontSource) : [];
  if (items.length > 0 && !items.some((font) => font.isDefault)) {
    items[0].isDefault = true;
  }

  return {
    ...cloneDeep(RequiredOptionsFonts),
    items,
  };
};

const normalizeManagedFontsCollection = (result) => {
  const raw = Array.isArray(result)
    ? result
    : Array.isArray(result?.items)
      ? result.items
      : Object.values(result || {}).filter((item) => item && typeof item === "object");

  const normalized = raw
    .filter((font) => font && typeof font === "object")
    .filter((font) => String(font?.label || font?.name || font?.family || "").trim() && String(font?.url || "").trim())
    .map((font, index) => normalizeFontSource(font, index));

  if (normalized.length > 0 && !normalized.some((font) => font.isDefault)) {
    normalized[0].isDefault = true;
  }

  return normalized;
};

const ensureFontsForDemo = async () => {
  const managedFonts = normalizeManagedFontsCollection(await api.getManagefonts());

  if (managedFonts.length > 0) {
    return managedFonts;
  }

  const demoFonts = Array.isArray(RequiredOptionsFonts.items)
    ? RequiredOptionsFonts.items.map((font, index) => normalizeFontSource(font, index))
    : [];

  if (demoFonts.length === 0) {
    return [];
  }

  const seeded = await api.addManagefont({ many: true, fonts: demoFonts });
  if (seeded?.success) {
    const refreshedFonts = normalizeManagedFontsCollection(await api.getManagefonts());
    if (refreshedFonts.length > 0) {
      return refreshedFonts;
    }
  }

  return demoFonts;
};

const buildConfigData = (sourceFonts = []) => {
  const demo = configurationDemoData?.[0]?.data || {};
  const selectedMaterials = wizard.value.selectedMaterials.length
    ? wizard.value.selectedMaterials
    : filteredMaterials.value.slice(0, 1).map((material) => material.id);
  const demoPricingId = Array.isArray(demo.requiredOptions?.pricings?.items) && demo.requiredOptions.pricings.items.length
    ? String(demo.requiredOptions.pricings.items[0]?.id || '')
    : '';
  const pricingByFamily = {
    signboard: 'pricing-signs-standard',
    banner: 'pricing-banner-standard',
    sticker: 'pricing-sticker-standard',
  };
  const selectedPricingId = wizard.value.includeDemo
    ? String(pricingByFamily[wizard.value.productType] || demoPricingId || '')
    : '';
  const resolvedFontsSection = buildFontsSection(sourceFonts);

  const cloneSections = (sections = {}, emptyItems = false) => Object.fromEntries(
    Object.entries(sections).map(([key, section]) => {
      const cleanSection = cloneDeep(section);

      return [
        key,
        {
          ...cleanSection,
          items: emptyItems ? [] : (Array.isArray(cleanSection.items) ? cleanSection.items : []),
        },
      ];
    })
  );

  const buildMaterialItem = (materialId, index, withType = true) => {
    const material = availableMaterials.value.find(item => item.id === materialId);

    const item = {
      id: materialId,
      materialKey: materialId,
      sourceMaterialId: materialId,
      sourceIndex: index,
      name: material?.title || selectedFamilyTitle.value || __('Material', 'all-signs-customizer-for-woocommerce'),
      label: material?.title || selectedFamilyTitle.value || __('Material', 'all-signs-customizer-for-woocommerce'),
      description: '',
      icon: material?.image ? mediaSrc(material.image) : '',
      image: material?.image ? mediaSrc(material.image) : '',
      previewImg: material?.image ? mediaSrc(material.image) : '',
      popImg: '',
      popupImg: '',
      active: true,
      isDefault: index === 0,
      pricingId: selectedPricingId,
      additionalPrice: 0,
      excludeComponentIds: [],
    };

    if (withType) {
      item.type = 'simple';
    }

    return item;
  };

  const selectedAdditionalMaterials = selectedMaterials.map((materialId, index) => buildMaterialItem(materialId, index, false));

  const applySelectedMaterialsSection = (sections = {}, emptyItems = false) => {
    const clonedSections = cloneSections(sections, emptyItems);

    clonedSections.materials = {
      ...(clonedSections.materials || {}),
      label: clonedSections.materials?.label || 'Materials',
      description: clonedSections.materials?.description || '',
      items: selectedAdditionalMaterials,
    };

    return clonedSections;
  };

  const sourceRequiredOptions = demo.requiredOptions || {};
  const sourceAdditionalOptions = demo.additionalOptions || {};

  const baseSettings = {
    ...(demo.settings || {}),
    productFamily: selectedFamilyTitle.value,
    productFamilySlug: selectedFamilySlug.value,
    productType: canonicalConfigProductType.value,
    selectedMaterialIds: selectedMaterials,
    customizerSign: {
      ...((demo.settings && demo.settings.customizerSign) || {}),
      text: {
        ...(((demo.settings && demo.settings.customizerSign) || {}).text || {}),
        selectedFonts: Array.isArray(demo.settings?.customizerSign?.text?.selectedFonts)
          ? demo.settings.customizerSign.text.selectedFonts
          : [],
      },
    },
  };

  if (wizard.value.includeDemo) {
    const demoPayload = cloneDeep(demo);
    const demoRequiredOptions = cloneDeep(demoPayload.requiredOptions || {});
    if (resolvedFontsSection.items.length > 0) {
      demoRequiredOptions.fonts = resolvedFontsSection;
    }

    return {
      ...demoPayload,
      pricingMode: 'frame-fit',
      productType: canonicalConfigProductType.value,
      materialType: 'simple',
      settings: baseSettings,
      requiredOptions: cloneSections(demoRequiredOptions, false),
      additionalOptions: applySelectedMaterialsSection(demoPayload.additionalOptions || {}, false),
    };
  }

  return {
    pricingMode: 'frame-fit',
    productType: canonicalConfigProductType.value,
    materialType: 'simple',
    settings: baseSettings,
    requiredOptions: cloneSections(sourceRequiredOptions, true),
    additionalOptions: applySelectedMaterialsSection(sourceAdditionalOptions || {}, true),
  };
};

const cleanProductTitle = (value) => {
  const withoutTags = String(value || '').replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
  if (typeof document === 'undefined') return withoutTags;
  const textarea = document.createElement('textarea');
  textarea.innerHTML = withoutTags;
  return textarea.value;
};

const filteredWooProducts = computed(() => {
  if (!productSearchQuery.value) return wooProductsOptions.value;
  const q = productSearchQuery.value.toLowerCase();
  return wooProductsOptions.value.filter((p) => {
    const title = String(p.label || '').toLowerCase();
    const id = String(p.value || '').toLowerCase();
    const sku = String(p.sku || '').toLowerCase();
    const barcode = String(p.barcode || '').toLowerCase();

    if (searchBy.value === 'title') return title.includes(q);
    if (searchBy.value === 'id') return id.includes(q);
    if (searchBy.value === 'sku') return sku.includes(q);
    if (searchBy.value === 'barcode') return barcode.includes(q);

    return title.includes(q) || id.includes(q) || sku.includes(q) || barcode.includes(q);
  });
});

const getStepTitle = (s) => [__('Product family', 'all-signs-customizer-for-woocommerce'), __('Material', 'all-signs-customizer-for-woocommerce'), __('Setup model', 'all-signs-customizer-for-woocommerce'), __('Product info', 'all-signs-customizer-for-woocommerce')][s - 1];
const getStepTip = (s) => [
  __('Start with the product family. We will narrow the experience in the next step.', 'all-signs-customizer-for-woocommerce'),
  __('Choose the right material first, then define how the configurator should be structured.', 'all-signs-customizer-for-woocommerce'),
  __('Pick the setup model now. The configuration is created from the selected setup only.', 'all-signs-customizer-for-woocommerce'),
  __('Finish the configuration details, then create it and continue in the full editor.', 'all-signs-customizer-for-woocommerce')
][s - 1];

const selectFamily = (family) => {
  if (family.comingSoon) return;
  if (family.externalPlugin) {
    showExternalPluginModal.value = true;
    return;
  }
  wizard.value.productType = family.id;
  wizard.value.selectedMaterials = [];
  setTimeout(() => goNext(), 300);
};

const toggleMaterial = (m) => {
  if (wizard.value.productType === 'letter-signs') {
    wizard.value.selectedMaterials = [m.id];
  } else {
    const idx = wizard.value.selectedMaterials.indexOf(m.id);
    if (idx > -1) wizard.value.selectedMaterials.splice(idx, 1);
    else wizard.value.selectedMaterials.push(m.id);
  }
};

const openPreview = (item) => { previewItem.value = item; showGalleryPreview.value = true; };
const closePreview = () => { showGalleryPreview.value = false; previewItem.value = null; };
const closeExternalPluginModal = () => { showExternalPluginModal.value = false; };

const canNext = computed(() => {
  if (isEdit.value) return !!newConfig.value.name;
  if (wizard.value.step === 1) return !!wizard.value.productType;
  if (wizard.value.step === 2) return wizard.value.selectedMaterials.length > 0;
  if (wizard.value.step === 3) return !!wizard.value.materialType;
  return true;
});

const goNext = () => {
  if (isEdit.value) return;
  if (canNext.value && wizard.value.step < 4) wizard.value.step++;
};

const goBack = () => {
  if (isEdit.value) {
    router.push('/configuration');
    return;
  }

  if (wizard.value.step > 1) wizard.value.step--;
  else emit('onCancel');
};

const handleMainAction = () => {
  if (isEdit.value) {
    wizard.value.attemptedCreate = true;
    if (newConfig.value.name) finalCreate();
    return;
  }

  if (wizard.value.step < 4) goNext();
  else {
    wizard.value.attemptedCreate = true;
    if (newConfig.value.name) showReviewModal.value = true;
  }
};

const selectConfigIcon = (e) => {
  e.preventDefault();
  wp.media({ title: __("Select Config Image", "all-signs-customizer-for-woocommerce"), button: { text: __("Select image", "all-signs-customizer-for-woocommerce") }, multiple: false })
    .on('select', () => {
      const attachment = wp.media.frame.state().get('selection').first().toJSON();
      newConfig.value.icon = attachment.url;
    }).open();
};

const finalCreate = async () => {
  if (isLoading.value) return;
  isLoading.value = true;
  try {
     if (props.isEdit) {
       const existing = editConfig.value || {};
       const response = await api.updateConfig({
          id: props.configId,
          name: newConfig.value.name,
          description: newConfig.value.description,
          productFamily: existing.productFamily || selectedFamilyTitle.value,
          materialType: 'simple',
          productType: existing.productType || canonicalConfigProductType.value,
          pricingMode: existing.pricingMode || 'frame-fit',
          icon: newConfig.value.icon,
          popImg: existing.popImg || '',
          product_ids: selectedWooProductIds.value,
       });

       if (response.success) {
          toastMessage(response.message, 'success');
          router.push('/configuration');
          emit('onFinish');
       } else {
          toastMessage(response.message || __('Update failed', 'all-signs-customizer-for-woocommerce'), 'error');
       }
       return;
     }

     const fontsForDemo = wizard.value.includeDemo ? await ensureFontsForDemo() : [];
     const data = buildConfigData(fontsForDemo);
     const response = await api.addConfig({
        name: newConfig.value.name,
        description: newConfig.value.description,
        productFamily: selectedFamilyTitle.value,
        materialType: 'simple',
        productType: canonicalConfigProductType.value,
        pricingMode: 'frame-fit',
        icon: newConfig.value.icon,
        popImg: '',
        data,
        product_ids: selectedWooProductIds.value,
     });
     if (response.success) {
        toastMessage(response.message, 'success');
        if (response.post_id) {
          router.push({
            name: 'sizes',
            params: {
              configId: String(response.post_id),
            },
          });
        }
        emit('onFinish');
     } else {
        toastMessage(response.message || __('Registration failed', 'all-signs-customizer-for-woocommerce'), 'error');
     }
  } catch (e) { toastMessage(e?.response?.data?.message || __('Error', 'all-signs-customizer-for-woocommerce'), 'error'); }
  finally { isLoading.value = false; }
};

const loadEditConfig = async () => {
  if (!props.isEdit || !props.configId) return;

  const config = await api.getConfig(props.configId);
  editConfig.value = config || {};
  const data = config?.data || {};
  const productType = String(config?.productType || data?.productType || data?.settings?.productType || '').trim();
  const selectedMaterials = extractSelectedMaterialIds(config);

  newConfig.value = {
    name: config?.name || data?.name || "",
    description: config?.description || data?.description || "",
    icon: config?.icon || data?.icon || data?.popImg || "",
  };
  wizard.value.step = 4;
  wizard.value.materialType = 'simple';
  wizard.value.productType = normalizeEditorProductType(productType);
  wizard.value.selectedMaterials = selectedMaterials.length
    ? selectedMaterials
    : filteredMaterials.value.slice(0, 1).map((material) => material.id);
};

onMounted(async () => {
  await loadEditConfig();
  const productParams = { per_page: 100 };
  if (props.isEdit && props.configId) productParams.config_id = props.configId;
  const res = await api.getUnassignedProducts(productParams);
  wooProductsOptions.value = (Array.isArray(res) ? res : []).map(p => ({
    value: p.id,
    label: cleanProductTitle(p.title),
    image: p.image,
    sku: p.sku || '',
    barcode: p.barcode || '',
    assignedConfigId: p.assigned_config_id || 0,
  }));
  if (props.isEdit && props.configId) {
    selectedWooProductIds.value = wooProductsOptions.value
      .filter((product) => String(product.assignedConfigId || '') === String(props.configId))
      .map((product) => product.value);
  }
});
</script>

<style>
.ascwo-create-wizard {
  background: var(--ascwo-ui-bg) !important;
  color: var(--ascwo-ui-text);
  font-size: 13px !important;
}

.ascwo-create-wizard h1 {
  color: var(--ascwo-ui-text) !important;
  font-size: 28px !important;
  line-height: 34px !important;
  font-weight: var(--ascwo-ui-weight-heavy) !important;
}

.ascwo-create-wizard > .ascwo-text-center p {
  font-size: 13px !important;
  line-height: 19px !important;
}

.ascwo-create-stepper-wrap {
  position: sticky;
  top: var(--wp-admin--admin-bar--height, 32px);
  z-index: 20;
  padding: 4px 0 10px;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.ascwo-create-stepper {
  width: min(760px, calc(100vw - 72px)) !important;
  justify-content: space-between !important;
  padding: 6px 12px !important;
  gap: 8px !important;
  border-color: #e3e8ef !important;
  box-shadow: 0 6px 16px rgba(15, 23, 42, 0.05) !important;
}

.ascwo-create-stepper > div {
  flex: 0 0 auto;
  justify-content: center;
}

.ascwo-create-stepper > div:first-child {
  flex: 0 0 auto;
}

.ascwo-create-stepper > div > div {
  white-space: nowrap;
}

.ascwo-create-stepper .ascwo-text-\[13px\] {
  font-size: 13px !important;
  line-height: 18px !important;
}

.ascwo-create-stepper span.ascwo-w-5 {
  width: 20px !important;
  height: 20px !important;
  font-size: 10px !important;
}

.ascwo-create-step-arrow {
  margin-left: 8px !important;
  margin-right: 8px !important;
  flex: 0 0 auto;
}

@media (max-width: 900px) {
  .ascwo-create-stepper {
    width: calc(100vw - 32px) !important;
    gap: 8px !important;
    padding: 7px 10px !important;
  }

  .ascwo-create-step-arrow {
    margin-left: 6px !important;
    margin-right: 6px !important;
  }
}

.ascwo-create-wizard h2 {
  color: var(--ascwo-ui-text-strong) !important;
  font-weight: var(--ascwo-ui-weight-bold) !important;
}

.ascwo-create-shell {
  border-radius: var(--ascwo-ui-radius-page-card) !important;
  border-color: var(--ascwo-ui-border) !important;
  box-shadow: var(--ascwo-ui-shadow-panel) !important;
  max-width: 1180px !important;
}

.ascwo-create-shell > div:not(:last-child) {
  padding: 26px !important;
}

.ascwo-create-shell > div:last-child {
  padding: 18px 26px !important;
}

.ascwo-create-wizard .ascwo-grid {
  column-gap: 16px !important;
  row-gap: 16px !important;
  align-items: stretch !important;
}

.ascwo-create-wizard h2 {
  font-size: 18px !important;
  line-height: 23px !important;
  margin-bottom: 8px !important;
}

.ascwo-create-wizard h3,
.ascwo-create-wizard h4 {
  font-size: 14px !important;
  line-height: 19px !important;
}

.ascwo-create-wizard p {
  font-size: 12.5px !important;
  line-height: 18px !important;
}

.ascwo-create-select-card,
.ascwo-create-model-card {
  background: var(--ascwo-ui-surface) !important;
  border: 1px solid var(--ascwo-ui-border) !important;
  border-radius: var(--ascwo-ui-radius-select-card) !important;
  box-shadow: var(--ascwo-ui-shadow-card) !important;
  padding: 14px !important;
  min-height: 0 !important;
  height: 100% !important;
  gap: 14px !important;
  overflow: hidden;
  box-sizing: border-box !important;
}

.ascwo-create-model-card {
  border-radius: 18px !important;
  padding: 18px !important;
  gap: 14px !important;
}

.ascwo-create-select-card.ascwo-border-\[\#006e52\],
.ascwo-create-model-card.ascwo-border-\[\#006e52\] {
  border-color: var(--ascwo-ui-border) !important;
  box-shadow: var(--ascwo-ui-shadow-selected) !important;
}

.ascwo-create-external-card {
  background: #f6f7f8 !important;
  border-color: #d6dbe1 !important;
  box-shadow: none !important;
}

.ascwo-create-external-card::after {
  content: "";
  position: absolute;
  inset: 0;
  background: rgba(255, 255, 255, 0.28);
  pointer-events: none;
}

.ascwo-create-external-card .ascwo-create-card-image {
  filter: grayscale(0.95);
  opacity: 0.72;
}

.ascwo-create-external-card h3,
.ascwo-create-external-card p {
  color: #5f6368 !important;
}

.ascwo-create-external-pill {
  background: #e5e7eb !important;
  color: #4b5563 !important;
}

.ascwo-create-card-image {
  width: 80px !important;
  height: 80px !important;
  border-radius: 12px !important;
  border: 1px solid #d6dee3;
  background: #eef3f6 !important;
  box-shadow: inset 0 0 0 1px rgba(255,255,255,0.45);
}

.ascwo-create-select-card.ascwo-border-\[\#006e52\] .ascwo-create-card-image,
.ascwo-create-model-card.ascwo-border-\[\#006e52\] > .ascwo-flex:first-child > div:first-child {
  box-shadow: 0 0 0 2px rgba(148, 163, 184, 0.22), inset 0 0 0 1px rgba(255,255,255,0.45) !important;
}

.ascwo-create-select-card > .ascwo-flex-1,
.ascwo-create-model-card > .ascwo-flex:first-child > .ascwo-flex-1 {
  gap: 6px !important;
  min-width: 0;
}

.ascwo-create-select-card h3,
.ascwo-create-model-card h4 {
  font-size: 17px !important;
  line-height: 22px !important;
  font-weight: 700 !important;
  color: #111827 !important;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.ascwo-create-select-card p,
.ascwo-create-model-card > .ascwo-flex:first-child p {
  color: #5f6368 !important;
  font-size: 14px !important;
  line-height: 20px !important;
  margin-top: 1px !important;
}

.ascwo-create-select-card > .ascwo-flex-1 > p {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.ascwo-create-select-card span.ascwo-text-\[12px\],
.ascwo-create-select-card .ascwo-text-\[12px\] {
  color: #9ea6ad !important;
  font-size: 12px !important;
  font-weight: 500 !important;
}

.ascwo-create-select-card button {
  width: 28px !important;
  height: 28px !important;
  border: 1px solid #d6dee3 !important;
  background: #f8fafc !important;
  color: #4b5563 !important;
  padding: 0 !important;
}

.ascwo-create-model-card > .ascwo-flex:first-child {
  gap: 14px !important;
}

.ascwo-create-model-card > .ascwo-flex:first-child > div:first-child {
  width: 100px !important;
  height: 100px !important;
  border-radius: 12px !important;
  background-color: #eef3f6 !important;
  border: 1px solid #d6dee3 !important;
  box-shadow: inset 0 0 0 1px rgba(255,255,255,0.45);
}

.ascwo-create-model-card ul {
  margin-top: 4px !important;
  display: flex !important;
  flex-direction: column !important;
  gap: 10px !important;
}

.ascwo-create-model-card li {
  align-items: flex-start !important;
  gap: 10px !important;
  color: #344054 !important;
  font-size: 14px !important;
  line-height: 20px !important;
}

.ascwo-create-model-card li > div {
  width: 8px !important;
  height: 8px !important;
  margin-top: 7px !important;
  background: rgba(1, 100, 100, 0.75) !important;
  flex-shrink: 0;
}

.ascwo-step4 {
  padding: 20px 24px !important;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.ascwo-step4-intro {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.ascwo-step4-intro h2,
.ascwo-step4-intro p {
  margin: 0 !important;
}

.ascwo-step4-layout {
  gap: 16px !important;
  align-items: flex-start;
}

.ascwo-step4-card {
  border-color: #e4e7ec !important;
  border-radius: 14px !important;
  box-shadow: 0 4px 14px rgba(15, 23, 42, 0.04) !important;
  padding: 16px !important;
}

.ascwo-step4-main .ascwo-step4-card + .ascwo-step4-card {
  margin-top: 0 !important;
}

.ascwo-step4-summary {
  margin-top: 0 !important;
}

@media (max-width: 1023px) {
  .ascwo-step4-summary {
    margin-top: 0 !important;
  }
}

.ascwo-review-modal {
  width: min(980px, calc(100vw - 48px)) !important;
  max-height: calc(100vh - 32px) !important;
  border-radius: 18px !important;
  box-shadow: 0 24px 54px rgba(15, 23, 42, 0.22) !important;
}

.ascwo-review-header {
  min-height: 64px !important;
  padding: 0 20px !important;
  border-width: 0 0 1px 0 !important;
}

.ascwo-review-header h3 {
  font-size: 18px !important;
  line-height: 24px !important;
  font-weight: 700 !important;
  color: #202223 !important;
}

.ascwo-review-footer {
  min-height: 76px !important;
  padding: 0 20px !important;
  border-width: 1px 0 0 0 !important;
}

.ascwo-review-body {
  padding: 20px !important;
  gap: 16px !important;
}

.ascwo-review-panel {
  padding: 18px !important;
  border-radius: 16px !important;
  display: flex !important;
  flex-direction: column !important;
}

.ascwo-review-panel-summary {
  gap: 10px !important;
}

.ascwo-review-panel-starter {
  gap: 14px !important;
}

.ascwo-review-panel p,
.ascwo-review-panel h4 {
  margin: 0 !important;
}

.ascwo-review-panel-title {
  color: #303030 !important;
  font-size: 16px !important;
  line-height: 22px !important;
  font-weight: 700 !important;
}

.ascwo-review-summary-list {
  display: flex !important;
  flex-direction: column !important;
  gap: 12px !important;
  color: #667085 !important;
  font-size: 14px !important;
  line-height: 20px !important;
}

.ascwo-review-summary-list span:last-child {
  font-weight: 600 !important;
}

.ascwo-review-description {
  color: #5c5f62 !important;
  font-size: 15px !important;
  line-height: 24px !important;
  font-weight: 400 !important;
}

.ascwo-review-choice-row {
  display: flex !important;
  flex-wrap: wrap !important;
  gap: 8px !important;
}

.ascwo-review-choice-button {
  min-height: 38px;
  padding: 8px 14px;
  border: 1px solid #b7c2cc;
  border-radius: 10px;
  background: #ffffff;
  color: #475467;
  font-size: 14px;
  font-weight: 700;
  line-height: 20px;
  cursor: pointer;
  box-shadow: none;
}

.ascwo-review-choice-button.is-selected {
  border: 2px solid rgba(1, 100, 100, 0.7);
  background: rgba(1, 100, 100, 0.08);
  color: rgba(1, 100, 100, 0.9);
}

.ascwo-review-selected-template {
  display: flex !important;
  flex-direction: column !important;
  gap: 8px !important;
  padding: 12px !important;
  border: 1px solid #dbe3ea !important;
  border-radius: 14px !important;
  background: #ffffff !important;
}

.ascwo-review-selected-label,
.ascwo-review-selected-help,
.ascwo-review-blank-help {
  color: #667085 !important;
  font-size: 13px !important;
  line-height: 20px !important;
  font-weight: 400 !important;
}

.ascwo-review-selected-name {
  color: #101828 !important;
  font-size: 14px !important;
  line-height: 20px !important;
  font-weight: 700 !important;
}

.ascwo-review-secondary-button,
.ascwo-review-primary-button {
  min-height: 36px;
  padding: 8px 14px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 700;
  line-height: 18px;
  cursor: pointer;
  box-shadow: none;
}

.ascwo-review-secondary-button:disabled,
.ascwo-review-primary-button:disabled {
  cursor: not-allowed;
  opacity: 0.72;
}

.ascwo-review-secondary-button {
  border: 1px solid #c9cccf;
  background: #ffffff;
  color: #111827;
}

.ascwo-review-primary-button {
  border: 1px solid #005f55;
  background: #007a72;
  color: #ffffff !important;
  -webkit-text-fill-color: #ffffff !important;
}

.ascwo-review-primary-button:hover,
.ascwo-review-primary-button:focus,
.ascwo-review-primary-button:active {
  border-color: #004c44;
  background: #00695f;
  color: #ffffff !important;
  -webkit-text-fill-color: #ffffff !important;
}

.ascwo-creating-dots {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  min-width: 28px;
  height: 34px;
}

.ascwo-creating-dots span {
  width: 5px;
  height: 5px;
  border-radius: 999px;
  background: #6b7280;
  animation: ascwoCreatingDot 0.9s infinite ease-in-out;
}

.ascwo-creating-dots span:nth-child(2) {
  animation-delay: 0.12s;
}

.ascwo-creating-dots span:nth-child(3) {
  animation-delay: 0.24s;
}

@keyframes ascwoCreatingDot {
  0%, 80%, 100% {
    opacity: 0.35;
    transform: translateY(0);
  }

  40% {
    opacity: 1;
    transform: translateY(-3px);
  }
}

.ascwo-external-plugin-modal {
  border: 1px solid #dfe3e8 !important;
  box-shadow: 0 28px 70px rgba(15, 23, 42, 0.24) !important;
}

.ascwo-external-icon-button,
.ascwo-external-icon-button:hover,
.ascwo-external-icon-button:focus,
.ascwo-external-icon-button:active {
  border: 0 !important;
  box-shadow: none !important;
  outline: none !important;
  background: transparent !important;
}

.ascwo-external-icon-button:hover {
  background: #f6f6f7 !important;
}

.ascwo-plugin-modal-button {
  min-height: 40px !important;
  padding: 9px 16px !important;
  border-radius: 8px !important;
  font-size: 13px !important;
  font-weight: 750 !important;
  line-height: 18px !important;
  cursor: pointer;
  text-decoration: none !important;
  box-sizing: border-box !important;
  justify-content: center;
  appearance: none;
  -webkit-appearance: none;
}

.ascwo-plugin-modal-button,
.ascwo-plugin-modal-button:hover,
.ascwo-plugin-modal-button:focus,
.ascwo-plugin-modal-button:active {
  outline: none !important;
  box-shadow: none !important;
}

.ascwo-plugin-modal-button-secondary {
  border: 1px solid #c9cccf !important;
  background: #ffffff !important;
  color: #202223 !important;
}

.ascwo-plugin-modal-button-secondary:hover,
.ascwo-plugin-modal-button-secondary:focus,
.ascwo-plugin-modal-button-secondary:active {
  border-color: #babfc3 !important;
  background: #f6f6f7 !important;
  color: #202223 !important;
}

.ascwo-plugin-modal-button-primary {
  border: 1px solid #006e52 !important;
  background: #006e52 !important;
  color: #ffffff !important;
  -webkit-text-fill-color: #ffffff !important;
}

.ascwo-plugin-modal-button-primary:hover,
.ascwo-plugin-modal-button-primary:focus,
.ascwo-plugin-modal-button-primary:active {
  border-color: #005c45 !important;
  background: #005c45 !important;
  color: #ffffff !important;
  -webkit-text-fill-color: #ffffff !important;
}

.ascwo-gallery-overlay {
  padding-top: 182px !important;
  padding-left: 24px !important;
  padding-right: 24px !important;
}

.ascwo-gallery-modal {
  width: 980px !important;
  max-width: calc(100vw - 64px) !important;
  max-height: calc(100vh - 224px) !important;
  border-radius: 20px !important;
  box-shadow: 0 24px 54px rgba(15, 23, 42, 0.22) !important;
}

.ascwo-gallery-header {
  border-width: 0 0 1px 0 !important;
}

.ascwo-gallery-header h3 {
  color: #111827 !important;
  font-size: 18px !important;
  line-height: 24px !important;
  font-weight: 750 !important;
}

.ascwo-gallery-grid {
  gap: 14px !important;
}

.ascwo-gallery-tile {
  height: 220px !important;
  border-radius: 16px !important;
  width: 100% !important;
}

.ascwo-gallery-grid .ascwo-gallery-tile:only-child {
  grid-column: 2 / 3;
}

@media (max-width: 767px) {
  .ascwo-gallery-overlay {
    padding-top: 72px !important;
    padding-left: 16px !important;
    padding-right: 16px !important;
  }

  .ascwo-gallery-modal {
    width: calc(100vw - 32px) !important;
    max-height: calc(100vh - 96px) !important;
  }

  .ascwo-gallery-grid .ascwo-gallery-tile:only-child {
    grid-column: auto;
  }
}

.ascwo-create-wizard .ascwo-space-y-2 > :not([hidden]) ~ :not([hidden]) {
  margin-top: 8px !important;
}

.ascwo-create-wizard li {
  font-size: 12.5px !important;
  line-height: 18px !important;
}

.ascwo-create-wizard .ascwo-text-\[22px\] {
  font-size: 17px !important;
}

.ascwo-create-wizard .ascwo-text-\[16px\] {
  font-size: 12.5px !important;
}

.ascwo-create-wizard .ascwo-text-\[13px\] {
  font-size: 12.5px !important;
}

.ascwo-create-wizard .ascwo-text-\[12px\] {
  font-size: 11.5px !important;
}

.ascwo-create-wizard .ascwo-mb-7,
.ascwo-create-wizard .ascwo-mb-8 {
  margin-bottom: 18px !important;
}

.ascwo-create-wizard .ascwo-mb-6 {
  margin-bottom: 16px !important;
}

.ascwo-create-wizard .ascwo-mb-5 {
  margin-bottom: 14px !important;
}

.ascwo-create-wizard .ascwo-mb-3 {
  margin-bottom: 8px !important;
}

.ascwo-create-wizard .ascwo-rounded-\[18px\],
.ascwo-create-wizard .ascwo-rounded-\[20px\],
.ascwo-create-wizard .ascwo-rounded-\[24px\] {
  border-radius: 14px !important;
}

.ascwo-create-info-pill {
  background: #e1f0ff !important;
  color: #005bd3 !important;
}

#ascwo-backend-app .ascwo-create-wizard .ascwo-create-select-card h3,
#ascwo-backend-app .ascwo-create-wizard .ascwo-create-model-card h4 {
  font-size: 17px !important;
  line-height: 22px !important;
  font-weight: 700 !important;
}

#ascwo-backend-app .ascwo-create-wizard .ascwo-create-select-card > .ascwo-flex-1 > p,
#ascwo-backend-app .ascwo-create-wizard .ascwo-create-model-card > .ascwo-flex:first-child p {
  font-size: 14px !important;
  line-height: 20px !important;
  color: #5f6368 !important;
}

#ascwo-backend-app .ascwo-create-wizard .ascwo-create-model-card li {
  font-size: 14px !important;
  line-height: 20px !important;
  color: #344054 !important;
}

#ascwo-backend-app .ascwo-create-wizard .ascwo-create-select-card {
  padding: 14px !important;
  min-height: 0 !important;
  height: 100% !important;
}

#ascwo-backend-app .ascwo-create-wizard .ascwo-create-model-card {
  padding: 18px !important;
  min-height: 0 !important;
  height: 100% !important;
}

#ascwo-backend-app .ascwo-create-wizard .ascwo-create-card-image {
  width: 80px !important;
  height: 80px !important;
}

#ascwo-backend-app .ascwo-create-wizard .ascwo-create-model-card > .ascwo-flex:first-child > div:first-child {
  width: 100px !important;
  height: 100px !important;
}

#ascwo-backend-app .ascwo-create-shell .ascwo-grid {
  column-gap: 16px !important;
  row-gap: 16px !important;
  align-items: stretch !important;
}

#ascwo-backend-app .ascwo-create-shell .ascwo-grid > * {
  min-width: 0;
  margin: 0 !important;
}

.ascwo-create-wizard input,
.ascwo-create-wizard textarea,
.ascwo-create-wizard select {
  border-radius: var(--ascwo-ui-radius-control) !important;
  border-color: var(--ascwo-ui-input-border) !important;
  color: var(--ascwo-ui-text) !important;
  font-size: var(--ascwo-ui-font-body) !important;
}

.ascwo-create-wizard input:focus,
.ascwo-create-wizard textarea:focus,
.ascwo-create-wizard select:focus {
  border-color: var(--ascwo-ui-focus) !important;
  box-shadow: 0 0 0 2px var(--ascwo-ui-focus) !important;
}


/* Shopify wizard navigation buttons */
.ascwo-create-wizard .ascwo-ui-button-secondary,
.ascwo-create-wizard .ascwo-ui-button-primary,
.ascwo-create-wizard .ascwo-ui-button-disabled,
.ascwo-create-wizard .ascwo-primary-button.ascwo-ui-button-primary {
  min-height: 42px !important;
  padding: 10px 18px !important;
  border-radius: 12px !important;
  font-size: 14px !important;
  line-height: 20px !important;
  font-weight: 700 !important;
  box-shadow: none !important;
}

.ascwo-create-wizard .ascwo-ui-button-secondary {
  min-width: 76px !important;
  border: 1px solid #c9cccf !important;
  background: #ffffff !important;
  color: #111827 !important;
}

.ascwo-create-wizard .ascwo-ui-button-secondary:hover,
.ascwo-create-wizard .ascwo-ui-button-secondary:focus,
.ascwo-create-wizard .ascwo-ui-button-secondary:active {
  background: #f6f6f7 !important;
  color: #111827 !important;
}

.ascwo-create-wizard .ascwo-ui-button-disabled,
.ascwo-create-wizard .ascwo-ui-button-disabled:hover,
.ascwo-create-wizard .ascwo-ui-button-disabled:focus,
.ascwo-create-wizard .ascwo-ui-button-disabled:active {
  min-width: 120px !important;
  border: none !important;
  background: linear-gradient(135deg, rgba(1, 100, 100, 0.95), rgba(2, 128, 128, 0.86)) !important;
  color: #ffffff !important;
  -webkit-text-fill-color: #ffffff !important;
  cursor: not-allowed !important;
  opacity: 0.55 !important;
}

.ascwo-create-wizard .ascwo-ui-button-primary,
.ascwo-create-wizard .ascwo-primary-button.ascwo-ui-button-primary {
  min-width: 120px !important;
  border: none !important;
  background: linear-gradient(135deg, rgba(1, 100, 100, 0.95), rgba(2, 128, 128, 0.86)) !important;
  color: #ffffff !important;
  -webkit-text-fill-color: #ffffff !important;
}

.ascwo-create-wizard .ascwo-wizard-final-action {
  min-width: 140px !important;
}

.ascwo-create-wizard .ascwo-ui-button-primary:hover,
.ascwo-create-wizard .ascwo-ui-button-primary:focus,
.ascwo-create-wizard .ascwo-ui-button-primary:active,
.ascwo-create-wizard .ascwo-primary-button.ascwo-ui-button-primary:hover,
.ascwo-create-wizard .ascwo-primary-button.ascwo-ui-button-primary:focus,
.ascwo-create-wizard .ascwo-primary-button.ascwo-ui-button-primary:active {
  background: linear-gradient(135deg, rgba(1, 100, 100, 0.95), rgba(2, 128, 128, 0.86)) !important;
  color: #ffffff !important;
  -webkit-text-fill-color: #ffffff !important;
}

body #ascwo-backend-app button.ascwo-primary-button,
body #ascwo-backend-app button.ascwo-primary-button:hover,
body #ascwo-backend-app button.ascwo-primary-button:focus,
body #ascwo-backend-app button.ascwo-primary-button:active,
body #ascwo-backend-app button.ascwo-primary-button:visited {
  color: #ffffff !important;
  text-decoration: none !important;
}

body #ascwo-backend-app button.ascwo-primary-button * {
  color: inherit !important;
}
</style>
