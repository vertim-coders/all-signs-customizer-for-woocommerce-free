<template>
  <div class="asowp-create-wizard asowp-p-4 asowp-min-h-screen">
    <!-- Header Section -->
    <div class="asowp-text-center asowp-mb-5">
      <h1 class="asowp-text-[28px] asowp-leading-9 asowp-text-[#303030] asowp-mb-1" style="font-weight: 750 !important;">
        {{ __('Create Product Configuration', 'all-signs-options-pro') }}
      </h1>
      <p class="asowp-text-[14px] asowp-text-[#616161]">
        {{ __('Follow the steps to define the product, how customers will configure it, and how your setup should start.', 'all-signs-options-pro') }}
      </p>
    </div>

    <!-- Stepper (Centered Pill) -->
    <div class="asowp-create-stepper-wrap asowp-flex asowp-justify-center asowp-mb-5">
      <div class="asowp-create-stepper asowp-inline-flex asowp-items-center asowp-bg-white asowp-rounded-full asowp-px-5 asowp-py-2 asowp-shadow-sm asowp-border asowp-border-solid asowp-border-[#e1e3e5] asowp-gap-2">
        <div v-for="n in 4" :key="n" class="asowp-flex asowp-items-center">
          <div
            :class="[
              'asowp-flex asowp-items-center asowp-gap-2 asowp-text-[13px] asowp-font-bold asowp-transition-all',
              wizard.step === n ? 'asowp-text-[#1a1a1a] asowp-bg-[#f8faf9] asowp-rounded-full asowp-px-3 asowp-py-1 asowp-border asowp-border-solid asowp-border-[#006e52]' : 'asowp-text-[#b5b5b5]'
            ]"
          >
            <span
              :class="[
                'asowp-w-5 asowp-h-5 asowp-rounded-full asowp-flex asowp-items-center asowp-justify-center asowp-text-[10px] asowp-border asowp-border-solid',
                wizard.step === n ? 'asowp-bg-white asowp-border-[#006e52] asowp-text-[#006e52]' : 'asowp-bg-[#f1f1f1] asowp-border-transparent asowp-text-[#b5b5b5]'
              ]"
            >
              {{ n }}
            </span>
            <span v-if="wizard.step === n">{{ getStepTitle(n) }}</span>
            <span v-else>{{ __('Step', 'all-signs-options-pro') }} {{ n }}</span>
          </div>
          <ChevronRightIcon v-if="n < 4" class="asowp-create-step-arrow asowp-w-3 asowp-h-3 asowp-mx-2 asowp-text-[#d1d1d1]" />
        </div>
      </div>
    </div>

    <!-- Main Card Container -->
    <div class="asowp-create-shell asowp-shopify-page-card asowp-max-w-[1180px] asowp-mx-auto asowp-overflow-hidden">

      <!-- STEP 1: Product family -->
      <div v-if="wizard.step === 1" class="asowp-p-7">
        <div class="asowp-mb-6">
          <h2 class="asowp-text-[18px] asowp-leading-6 asowp-font-bold asowp-text-[#303030] asowp-mb-2">
            {{ __('What type of product do you want to sell?', 'all-signs-options-pro') }}
          </h2>
          <p class="asowp-text-[14px] asowp-text-[#616161]">
            {{ __('Choose the product family first. We will then show the matching materials and configuration setup.', 'all-signs-options-pro') }}
          </p>
        </div>

        <div class="asowp-grid md:asowp-grid-cols-2 asowp-gap-5">
          <div
            v-for="family in productFamilies"
            :key="family.id"
            @click="selectFamily(family)"
            :class="[
              'asowp-create-select-card asowp-relative asowp-flex asowp-gap-4 asowp-transition-all asowp-cursor-pointer group',
              family.comingSoon ? 'asowp-opacity-70 asowp-cursor-not-allowed' : '',
              family.externalPlugin ? 'asowp-create-external-card' : '',
              wizard.productType === family.id ? 'asowp-border-[#006e52] asowp-bg-[#f8faf9]' : 'asowp-border-[#e1e3e5] asowp-bg-white'
            ]"
          >
            <!-- Family Image -->
            <div class="asowp-create-card-image asowp-w-20 asowp-h-20 asowp-overflow-hidden asowp-bg-gray-100 asowp-flex-shrink-0">
              <img v-if="family.image" :src="mediaSrc(family.image)" class="asowp-w-full asowp-h-full asowp-object-cover" />
              <div v-else class="asowp-w-full asowp-h-full asowp-flex asowp-items-center asowp-justify-center asowp-text-gray-300">
                <ImageIcon class="asowp-w-8 asowp-h-8" />
              </div>
            </div>

            <!-- Family Content -->
            <div class="asowp-flex-1">
              <div class="asowp-flex asowp-items-start asowp-justify-between asowp-mb-1">
                <h3 class="asowp-text-[15px] asowp-font-bold asowp-text-[#1a1a1a] asowp-m-0">{{ family.title }}</h3>
                <div class="asowp-flex asowp-gap-2">
                  <span v-if="family.comingSoon" class="asowp-bg-[#fff7d1] asowp-text-[#856404] asowp-text-[10px] asowp-font-bold asowp-px-2 asowp-py-0.5 asowp-rounded-full">
                    {{ __('Coming soon', 'all-signs-options-pro') }}
                  </span>
                  <span v-else-if="family.externalPlugin" class="asowp-create-external-pill asowp-text-[10px] asowp-font-bold asowp-px-2 asowp-py-0.5 asowp-rounded-full">
                    {{ __('Separate plugin', 'all-signs-options-pro') }}
                  </span>
                  <span v-else-if="wizard.productType === family.id" class="asowp-shopify-pill">
                    {{ __('selected', 'all-signs-options-pro') }}
                  </span>
                </div>
              </div>
              <p class="asowp-text-[13px] asowp-text-[#616161] asowp-leading-5 asowp-mb-3">
                {{ family.desc }}
              </p>
              <div class="asowp-flex asowp-items-center asowp-justify-between">
                <span class="asowp-text-[12px] asowp-font-medium asowp-text-[#b5b5b5]">
                  {{ family.comingSoon ? __('Coming soon', 'all-signs-options-pro') : (family.externalPlugin ? __('View plugin options', 'all-signs-options-pro') : __('Click to select', 'all-signs-options-pro')) }}
                </span>
                <button @click.stop="family.externalPlugin ? selectFamily(family) : openPreview(family)" class="asowp-w-7 asowp-h-7 asowp-rounded-full asowp-bg-white asowp-border asowp-border-solid asowp-border-[#e1e3e5] asowp-flex asowp-items-center asowp-justify-center asowp-text-[#b5b5b5] hover:asowp-text-[#1a1a1a] asowp-cursor-pointer">
                  <EyeIcon class="asowp-w-4 asowp-h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- STEP 2: Material Selection -->
      <div v-else-if="wizard.step === 2" class="asowp-p-10">
        <div class="asowp-mb-8">
          <div class="asowp-mb-2">
             <h2 class="asowp-text-[22px] asowp-font-bold asowp-text-[#1a1a1a] asowp-m-0 asowp-flex asowp-items-center asowp-gap-2">
                {{ __('Choose the material for', 'all-signs-options-pro') }}
                <span class="asowp-px-3 asowp-py-1 asowp-bg-[#f1f1f1] asowp-rounded-lg asowp-text-[14px] asowp-font-medium asowp-text-[#616161]">{{ selectedFamilyTitle }}</span>
                <span class="asowp-px-3 asowp-py-1 asowp-bg-[#d2f4ea] asowp-text-[#006e52] asowp-rounded-lg asowp-text-[14px] asowp-font-bold">{{ wizard.selectedMaterials.length }} {{ __('selected', 'all-signs-options-pro') }}</span>
             </h2>
          </div>
          <p class="asowp-text-[14px] asowp-text-[#616161]">
            {{ __('Select one or more materials your merchants will sell. You can choose multiple materials here, then define how the configurator behaves in the next step.', 'all-signs-options-pro') }}
          </p>
        </div>

        <div class="asowp-grid md:asowp-grid-cols-2 asowp-gap-6">
          <div
            v-for="material in filteredMaterials"
            :key="material.id"
            @click="toggleMaterial(material)"
            :class="[
              'asowp-create-select-card asowp-relative asowp-flex asowp-gap-4 asowp-transition-all asowp-cursor-pointer group',
              wizard.selectedMaterials.includes(material.id) ? 'asowp-border-[#006e52] asowp-bg-[#f8faf9]' : 'asowp-border-[#e1e3e5] asowp-bg-white'
            ]"
          >
            <!-- Material Image -->
            <div class="asowp-create-card-image asowp-w-20 asowp-h-20 asowp-overflow-hidden asowp-bg-gray-100 asowp-flex-shrink-0">
              <img v-if="material.image" :src="mediaSrc(material.image)" class="asowp-w-full asowp-h-full asowp-object-cover" />
              <div v-else class="asowp-w-full asowp-h-full asowp-flex asowp-items-center asowp-justify-center asowp-text-gray-300">
                <ImageIcon class="asowp-w-8 asowp-h-8" />
              </div>
            </div>

            <!-- Material Content -->
            <div class="asowp-flex-1">
              <div class="asowp-flex asowp-items-start asowp-justify-between asowp-mb-1">
                <h3 class="asowp-text-[16px] asowp-font-bold asowp-text-[#1a1a1a] asowp-m-0">{{ material.title }}</h3>
                <div class="asowp-flex asowp-gap-2">
                   <span v-if="material.tag" class="asowp-shopify-pill asowp-create-info-pill">{{ material.tag }}</span>
                   <span v-if="wizard.selectedMaterials.includes(material.id)" class="asowp-shopify-pill">
                      {{ __('selected', 'all-signs-options-pro') }}
                   </span>
                </div>
              </div>
              <p class="asowp-text-[13px] asowp-text-[#616161] asowp-leading-relaxed asowp-mb-3">
                {{ material.desc || sprintf(__('Include %s in this %s setup.', 'all-signs-options-pro'), material.title.toLowerCase(), selectedFamilyTitle.toLowerCase()) }}
              </p>
              <div class="asowp-flex asowp-items-center asowp-justify-between">
                <span class="asowp-text-[12px] asowp-font-medium asowp-text-[#b5b5b5]">
                  {{ __('Click to toggle', 'all-signs-options-pro') }}
                </span>
                <button @click.stop="openPreview(material)" class="asowp-w-7 asowp-h-7 asowp-rounded-full asowp-bg-white asowp-border asowp-border-solid asowp-border-[#e1e3e5] asowp-flex asowp-items-center asowp-justify-center asowp-text-[#b5b5b5] hover:asowp-text-[#1a1a1a] asowp-cursor-pointer">
                  <EyeIcon class="asowp-w-4 asowp-h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- STEP 3: Setup Model -->
      <div v-else-if="wizard.step === 3" class="asowp-p-10">
        <div class="asowp-mb-8">
          <div class="asowp-flex asowp-items-center asowp-gap-2 asowp-mb-2">
             <h2 class="asowp-text-[22px] asowp-font-bold asowp-text-[#1a1a1a] asowp-m-0">
                {{ __('Choose a configuration model', 'all-signs-options-pro') }}
             </h2>
             <span class="asowp-px-3 asowp-py-1 asowp-bg-[#f1f1f1] asowp-rounded-lg asowp-text-[14px] asowp-font-medium asowp-text-[#616161]">{{ selectedFamilyTitle }}</span>
             <span class="asowp-px-3 asowp-py-1 asowp-bg-[#d2f4ea] asowp-text-[#006e52] asowp-rounded-lg asowp-text-[12px] asowp-font-bold">
                {{ selectedMaterialsNames }}
             </span>
          </div>
          <p class="asowp-text-[14px] asowp-text-[#616161] asowp-mb-10">
            {{ __('Choose how customers will build this product. Starter data will be decided in the final review.', 'all-signs-options-pro') }}
          </p>

          <h3 class="asowp-text-[16px] asowp-font-bold asowp-text-[#1a1a1a] asowp-mb-2">{{ __('Choose how customers will build this product', 'all-signs-options-pro') }}</h3>
          <p class="asowp-text-[13px] asowp-text-[#616161] asowp-mb-8">
             {{ __('Both setup models are available. Pick the customer journey first, then decide in the final review whether to inject starter data or keep the configuration blank.', 'all-signs-options-pro') }}
          </p>
        </div>

        <div class="asowp-grid md:asowp-grid-cols-2 asowp-gap-8">
          <!-- Build by Options -->
          <div
            @click="wizard.materialType = 'simple'"
            :class="[
              'asowp-create-model-card asowp-relative asowp-transition-all asowp-cursor-pointer',
              wizard.materialType === 'simple' ? 'asowp-border-[#006e52] asowp-bg-[#f8faf9]' : 'asowp-border-[#e1e3e5] asowp-bg-white'
            ]"
          >
            <div class="asowp-flex asowp-gap-4 asowp-mb-4">
               <div class="asowp-w-28 asowp-h-24 asowp-rounded-xl asowp-bg-white asowp-border asowp-border-solid asowp-border-[#e1e3e5] asowp-overflow-hidden asowp-flex-shrink-0">
                  <img :src="setupModelImage('simple')" class="asowp-w-full asowp-h-full asowp-object-cover" />
               </div>
               <div class="asowp-flex-1">
                  <div class="asowp-flex asowp-items-center asowp-justify-between asowp-mb-1">
                     <h4 class="asowp-text-[16px] asowp-font-bold asowp-text-[#1a1a1a] asowp-m-0">{{ __('Build by Options', 'all-signs-options-pro') }}</h4>
                     <div class="asowp-flex asowp-gap-2">
                        <span class="asowp-bg-[#e1f0ff] asowp-text-[#005bd3] asowp-text-[11px] asowp-font-bold asowp-px-3 asowp-py-0.5 asowp-rounded-full">{{ __('Flexible', 'all-signs-options-pro') }}</span>
                        <span v-if="wizard.materialType === 'simple'" class="asowp-bg-[#f1f1f1] asowp-text-[#616161] asowp-text-[11px] asowp-font-medium asowp-px-3 asowp-py-0.5 asowp-rounded-full asowp-border asowp-border-solid asowp-border-[#e1e3e5]">selected</span>
                     </div>
                  </div>
                  <p class="asowp-text-[13px] asowp-text-[#616161] asowp-leading-relaxed">
                     {{ __('Customers choose product options directly like size, shape, material and extras.', 'all-signs-options-pro') }}
                  </p>
               </div>
            </div>
            <ul class="asowp-list-none asowp-p-0 asowp-m-0 asowp-space-y-2">
               <li class="asowp-flex asowp-items-center asowp-gap-3 asowp-text-[13px] asowp-text-[#1a1a1a]">
                  <div class="asowp-w-2 asowp-h-2 asowp-rounded-full asowp-bg-[#88bebb]"></div>
                  {{ __('Customers choose size, shape, color and extras directly.', 'all-signs-options-pro') }}
               </li>
               <li class="asowp-flex asowp-items-center asowp-gap-3 asowp-text-[13px] asowp-text-[#1a1a1a]">
                  <div class="asowp-w-2 asowp-h-2 asowp-rounded-full asowp-bg-[#88bebb]"></div>
                  {{ __('Best for flexible catalogs with straightforward options.', 'all-signs-options-pro') }}
               </li>
               <li class="asowp-flex asowp-items-center asowp-gap-3 asowp-text-[13px] asowp-text-[#1a1a1a]">
                  <div class="asowp-w-2 asowp-h-2 asowp-rounded-full asowp-bg-[#88bebb]"></div>
                  {{ __('Good when each order is built from choices made one by one.', 'all-signs-options-pro') }}
               </li>
            </ul>
          </div>

          <!-- Build from Presets -->
          <div
            @click="wizard.materialType = 'advance'"
            :class="[
              'asowp-create-model-card asowp-relative asowp-transition-all asowp-cursor-pointer',
              wizard.materialType === 'advance' ? 'asowp-border-[#006e52] asowp-bg-[#f8faf9]' : 'asowp-border-[#e1e3e5] asowp-bg-white'
            ]"
          >
            <div class="asowp-flex asowp-gap-4 asowp-mb-4">
               <div class="asowp-w-28 asowp-h-24 asowp-rounded-xl asowp-bg-white asowp-border asowp-border-solid asowp-border-[#e1e3e5] asowp-overflow-hidden asowp-flex-shrink-0">
                  <img :src="setupModelImage('advance')" class="asowp-w-full asowp-h-full asowp-object-cover" />
               </div>
               <div class="asowp-flex-1">
                  <div class="asowp-flex asowp-items-center asowp-justify-between asowp-mb-1">
                     <h4 class="asowp-text-[16px] asowp-font-bold asowp-text-[#1a1a1a] asowp-m-0">{{ __('Build from Presets', 'all-signs-options-pro') }}</h4>
                     <div class="asowp-flex asowp-gap-2">
                        <span class="asowp-bg-[#e1f0ff] asowp-text-[#005bd3] asowp-text-[11px] asowp-font-bold asowp-px-3 asowp-py-0.5 asowp-rounded-full">{{ __('Structured', 'all-signs-options-pro') }}</span>
                        <span v-if="wizard.materialType === 'advance'" class="asowp-bg-[#f1f1f1] asowp-text-[#616161] asowp-text-[11px] asowp-font-medium asowp-px-3 asowp-py-0.5 asowp-rounded-full asowp-border asowp-border-solid asowp-border-[#e1e3e5]">selected</span>
                     </div>
                  </div>
                  <p class="asowp-text-[13px] asowp-text-[#616161] asowp-leading-relaxed">
                     {{ __('Customers personalize predefined product components and ready-made structures.', 'all-signs-options-pro') }}
                  </p>
               </div>
            </div>
            <ul class="asowp-list-none asowp-p-0 asowp-m-0 asowp-space-y-2">
               <li class="asowp-flex asowp-items-center asowp-gap-3 asowp-text-[13px] asowp-text-[#1a1a1a]">
                  <div class="asowp-w-2 asowp-h-2 asowp-rounded-full asowp-bg-[#88bebb]"></div>
                  {{ __('Customers start from predefined components or presets.', 'all-signs-options-pro') }}
               </li>
               <li class="asowp-flex asowp-items-center asowp-gap-3 asowp-text-[13px] asowp-text-[#1a1a1a]">
                  <div class="asowp-w-2 asowp-h-2 asowp-rounded-full asowp-bg-[#88bebb]"></div>
                  {{ __('Best for guided products with prepared combinations.', 'all-signs-options-pro') }}
               </li>
               <li class="asowp-flex asowp-items-center asowp-gap-3 asowp-text-[13px] asowp-text-[#1a1a1a]">
                  <div class="asowp-w-2 asowp-h-2 asowp-rounded-full asowp-bg-[#88bebb]"></div>
                  {{ __('Good when you want more control over the final structure.', 'all-signs-options-pro') }}
               </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- STEP 4: Finalize -->
      <div v-if="wizard.step === 4" class="asowp-step4 asowp-p-5 md:asowp-p-6">
        <div class="asowp-step4-intro">
          <h2 class="asowp-text-[20px] asowp-leading-6 asowp-font-[900] asowp-text-[#111827]">{{ __('Finalize your configuration', 'all-signs-options-pro') }}</h2>
          <p class="asowp-text-[12px] asowp-leading-5 asowp-text-[#111827]">{{ __('Add the basic information for this configuration and link the Shopify products that should use it.', 'all-signs-options-pro') }}</p>
        </div>

        <div class="asowp-step4-layout asowp-grid lg:asowp-grid-cols-[7fr_3fr] asowp-gap-4">
          <div class="asowp-step4-main">
            <div class="asowp-flex asowp-flex-col asowp-gap-3">
              <!-- Name Input -->
              <div class="asowp-step4-card asowp-bg-white asowp-rounded-2xl asowp-border asowp-border-solid asowp-border-[#dfe3e8] asowp-p-4">
                <label class="asowp-block asowp-text-[12px] asowp-font-medium asowp-text-[#111827] asowp-mb-2">{{ __('Name configuration', 'all-signs-options-pro') }}</label>
                <input
                  v-model.trim="newConfig.name"
                  type="text"
                  class="asowp-w-full asowp-h-9 asowp-px-3 asowp-rounded-lg asowp-border asowp-border-solid asowp-border-[#8c9196] focus:asowp-border-[#008060] focus:asowp-ring-1 focus:asowp-ring-[#008060] asowp-outline-none asowp-text-[13px] asowp-bg-white"
                  :class="{'asowp-bg-[#fff4f4] asowp-border-[#d72c0d]': !newConfig.name && wizard.attemptedCreate}"
                />
                <p v-if="!newConfig.name && wizard.attemptedCreate" class="asowp-text-[#bf0711] asowp-text-[12px] asowp-mt-1 asowp-flex asowp-items-center asowp-gap-1">
                   <InfoIcon class="asowp-w-3 asowp-h-3" /> {{ __('configuration name required', 'all-signs-options-pro') }}
                </p>
              </div>

              <!-- Description -->
              <div class="asowp-step4-card asowp-bg-white asowp-rounded-2xl asowp-border asowp-border-solid asowp-border-[#dfe3e8] asowp-p-4">
                <label class="asowp-block asowp-text-[12px] asowp-font-medium asowp-text-[#111827] asowp-mb-2">{{ __('Description', 'all-signs-options-pro') }}</label>
                <textarea
                  v-model="newConfig.description"
                  rows="2"
                  class="asowp-w-full asowp-h-9 asowp-px-3 asowp-py-2 asowp-rounded-lg asowp-border asowp-border-solid asowp-border-[#8c9196] focus:asowp-border-[#008060] focus:asowp-ring-1 focus:asowp-ring-[#008060] asowp-outline-none asowp-text-[13px] asowp-resize-none asowp-bg-white"
                ></textarea>
              </div>

              <!-- Upload Image -->
              <div class="asowp-step4-card asowp-p-4 asowp-bg-white asowp-rounded-2xl asowp-border asowp-border-solid asowp-border-[#dfe3e8]">
                 <label class="asowp-block asowp-text-[12px] asowp-font-medium asowp-text-[#111827] asowp-mb-2">{{ __('Upload image', 'all-signs-options-pro') }}</label>
                 <div class="asowp-flex asowp-items-center asowp-gap-3 asowp-h-9 asowp-px-1 asowp-bg-white asowp-rounded-lg asowp-border asowp-border-solid asowp-border-[#8c9196] asowp-overflow-hidden">
                    <button @click="selectConfigIcon" class="asowp-px-3 asowp-py-1.5 asowp-bg-[#006c67] asowp-text-white asowp-rounded-md asowp-text-[12px] asowp-leading-4 asowp-font-[900] asowp-cursor-pointer hover:asowp-bg-[#005c58] asowp-border-none">{{ __('Upload image', 'all-signs-options-pro') }}</button>
                    <div v-if="newConfig.icon" class="asowp-ml-auto asowp-w-8 asowp-h-8 asowp-rounded-md asowp-overflow-hidden asowp-border asowp-border-solid asowp-border-[#dfe3e8]">
                       <img :src="newConfig.icon" class="asowp-w-full asowp-h-full asowp-object-cover" />
                    </div>
                    <div v-else class="asowp-ml-auto asowp-w-8 asowp-h-8 asowp-rounded-md asowp-border asowp-border-solid asowp-border-[#dfe3e8] asowp-bg-white"></div>
                 </div>
              </div>

              <!-- Products Association -->
              <div class="asowp-step4-card asowp-p-4 asowp-bg-white asowp-rounded-2xl asowp-border asowp-border-solid asowp-border-[#dfe3e8]">
                 <label class="asowp-block asowp-text-[12px] asowp-font-medium asowp-text-[#111827] asowp-mb-2">{{ __('Products associated with configuration', 'all-signs-options-pro') }}</label>
                 <div class="asowp-flex asowp-items-center asowp-gap-3 asowp-h-9 asowp-px-3 asowp-bg-white asowp-rounded-lg asowp-border asowp-border-solid asowp-border-[#8c9196]">
                    <button @click="showProductModal = true" class="asowp-px-4 asowp-py-1.5 asowp-bg-[#006c67] asowp-text-white asowp-rounded-md asowp-text-[12px] asowp-leading-4 asowp-font-[900] asowp-cursor-pointer hover:asowp-bg-[#005c58] asowp-border-none">{{ __('select', 'all-signs-options-pro') }}</button>
                    <div class="asowp-flex-1 asowp-text-[16px] asowp-leading-6 asowp-text-[#111827]">
                       {{ selectedWooProductIds.length }} {{ __('product(s) selected', 'all-signs-options-pro') }}
                    </div>
                 </div>
                 <div v-if="selectedWooProducts.length" class="asowp-mt-3">
                    <p class="asowp-text-[13px] asowp-leading-5 asowp-text-[#374151] asowp-mb-2">{{ __('Products associated with configuration:', 'all-signs-options-pro') }}</p>
                    <div class="asowp-flex asowp-flex-wrap asowp-gap-2">
                       <span
                         v-for="product in selectedWooProducts"
                         :key="product.value"
                         class="asowp-inline-flex asowp-items-center asowp-gap-1 asowp-max-w-full asowp-bg-[#f1f2f3] asowp-text-[#111827] asowp-rounded-lg asowp-px-2 asowp-py-1 asowp-text-[13px] asowp-leading-5"
                       >
                         <span class="asowp-truncate">{{ product.label }}</span>
                         <button
                           type="button"
                           @click="removeSelectedProduct(product.value)"
                           class="asowp-inline-flex asowp-items-center asowp-justify-center asowp-w-4 asowp-h-4 asowp-rounded-full asowp-bg-transparent asowp-border-none asowp-p-0 asowp-text-[#6b7280] hover:asowp-text-[#111827] asowp-cursor-pointer"
                           :aria-label="sprintf(__('Remove %s', 'all-signs-options-pro'), product.label)"
                         >
                           <XIcon class="asowp-w-3 asowp-h-3" />
                         </button>
                       </span>
                    </div>
                 </div>
              </div>
            </div>
          </div>

          <!-- Summary Card -->
          <div class="asowp-step4-card asowp-step4-summary asowp-bg-white asowp-rounded-2xl asowp-border asowp-border-solid asowp-border-[#dfe3e8] asowp-p-5 asowp-h-fit">
            <h3 class="asowp-text-[13px] asowp-font-[900] asowp-text-[#111827] asowp-mb-5">{{ __('Summary', 'all-signs-options-pro') }}</h3>
            <div class="asowp-space-y-3">
              <div>
                 <span class="asowp-text-[12px] asowp-text-[#6b7280]">{{ __('Product family:', 'all-signs-options-pro') }}</span>
                 <span class="asowp-ml-1 asowp-text-[12px] asowp-font-[900] asowp-text-[#111827]">{{ selectedFamilyTitle }}</span>
              </div>
              <div>
                 <span class="asowp-text-[12px] asowp-text-[#6b7280]">{{ __('Material:', 'all-signs-options-pro') }}</span>
                 <span class="asowp-ml-1 asowp-text-[12px] asowp-font-[900] asowp-text-[#111827]">{{ selectedMaterialsNames }}</span>
              </div>
              <div>
                 <span class="asowp-text-[12px] asowp-text-[#6b7280]">{{ __('Configuration model:', 'all-signs-options-pro') }}</span>
                 <span class="asowp-ml-1 asowp-text-[12px] asowp-font-[900] asowp-text-[#111827]">{{ wizard.materialType === 'simple' ? (selectedFamilyTitle === 'Letter signs' ? 'Direct Options' : 'Flexible') : 'Preset Components' }}</span>
              </div>
              <div>
                 <span class="asowp-text-[12px] asowp-text-[#6b7280]">{{ __('Starter template:', 'all-signs-options-pro') }}</span>
                 <span class="asowp-ml-1 asowp-text-[12px] asowp-font-[900] asowp-text-[#111827]">{{ wizard.includeDemo ? 'Yes' : 'No' }}</span>
              </div>
              <div>
                 <span class="asowp-text-[12px] asowp-text-[#6b7280]">{{ __('Name:', 'all-signs-options-pro') }}</span>
                 <span class="asowp-ml-1 asowp-text-[12px] asowp-font-[900] asowp-text-[#111827]">{{ newConfig.name }}</span>
              </div>
              <div>
                 <span class="asowp-text-[12px] asowp-text-[#6b7280]">{{ __('Description:', 'all-signs-options-pro') }}</span>
                 <span class="asowp-ml-1 asowp-text-[12px] asowp-font-[900] asowp-text-[#111827]">{{ newConfig.description }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Card Footer -->
      <div class="asowp-bg-[#fbfcfc] asowp-border-t asowp-border-solid asowp-border-[#e1e3e5] asowp-px-10 asowp-py-5 asowp-flex asowp-items-center asowp-justify-between">
        <p class="asowp-text-[13px] asowp-text-[#616161] asowp-m-0">
          {{ getStepTip(wizard.step) }}
        </p>
        <div class="asowp-flex asowp-gap-3">
          <button
            @click="goBack"
            class="asowp-shopify-button-secondary"
          >
            {{ __('Back', 'all-signs-options-pro') }}
          </button>
          <button
            v-if="wizard.step === 1"
            @click="handleMainAction"
            :disabled="!canNext"
            class="asowp-primary-button asowp-shopify-button-primary disabled:asowp-opacity-50 disabled:asowp-cursor-not-allowed"
          >
            {{ __('Create', 'all-signs-options-pro') }}
          </button>
          <button
            v-else
            @click="handleMainAction"
            :disabled="!canNext || isLoading"
            :class="[
              'asowp-transition-all asowp-border-0',
              canNext && !isLoading
                ? 'asowp-primary-button asowp-shopify-button-primary'
                : 'asowp-bg-[#e1e3e5] asowp-text-[#b5b5b5] asowp-cursor-not-allowed'
            ]"
          >
            {{ wizard.step === 4 ? (isEdit ? __('Update', 'all-signs-options-pro') : __('Create', 'all-signs-options-pro')) : __('Next', 'all-signs-options-pro') }}
          </button>
        </div>
      </div>
    </div>

    <!-- Product Selection Modal -->
    <div v-if="showProductModal" class="asowp-fixed asowp-inset-0 asowp-z-[1000] asowp-flex asowp-items-center asowp-justify-center">
      <div class="asowp-absolute asowp-inset-0 asowp-bg-black/40" @click="showProductModal = false"></div>
      <div class="asowp-relative asowp-bg-white asowp-rounded-[20px] asowp-shadow-2xl asowp-overflow-hidden" style="width: min(776px, calc(100vw - 48px)); max-width: calc(100vw - 48px);">
        <div class="asowp-flex asowp-items-center asowp-justify-between asowp-h-[66px] asowp-px-5 asowp-border-b asowp-border-solid asowp-border-[#e1e3e5]">
          <h3 class="asowp-text-[18px] asowp-leading-6 asowp-font-[900] asowp-text-[#111827]">{{ __('Select products', 'all-signs-options-pro') }}</h3>
          <button @click="showProductModal = false" class="asowp-p-2 asowp-rounded-full hover:asowp-bg-[#f6f6f7] asowp-border-0 asowp-bg-transparent asowp-cursor-pointer">
            <XIcon class="asowp-w-5 asowp-h-5 asowp-text-[#8c9196]" />
          </button>
        </div>
        <div class="asowp-pt-3">
           <div class="asowp-flex asowp-gap-2 asowp-px-4 asowp-mb-2">
              <div class="asowp-flex-1 asowp-relative">
                 <SearchIcon class="asowp-pointer-events-none asowp-absolute asowp-top-1/2 -asowp-translate-y-1/2 asowp-w-5 asowp-h-5 asowp-text-[#5c5f62]" style="left: 14px;" />
                 <input type="text" v-model="productSearchQuery" :placeholder="__('Search products', 'all-signs-options-pro')" class="asowp-box-border asowp-w-full asowp-h-[38px] asowp-pr-4 asowp-rounded-lg asowp-border asowp-border-solid asowp-border-[#8c9196] asowp-outline-none focus:asowp-border-[#005bd3] focus:asowp-ring-2 focus:asowp-ring-[#005bd3] asowp-text-[16px] asowp-leading-[38px] asowp-bg-white" style="padding-left: 42px;">
              </div>
              <div class="asowp-relative asowp-w-[240px]">
                 <button
                   type="button"
                   @click="showSearchByMenu = !showSearchByMenu"
                   class="asowp-box-border asowp-w-full asowp-h-[38px] asowp-px-4 asowp-pr-10 asowp-rounded-lg asowp-border asowp-border-solid asowp-border-[#8c9196] asowp-bg-white asowp-text-[16px] asowp-text-[#303030] asowp-text-left asowp-cursor-pointer focus:asowp-border-[#005bd3] focus:asowp-ring-2 focus:asowp-ring-[#005bd3]"
                 >
                   {{ __('Search by', 'all-signs-options-pro') }} {{ searchByLabel }}
                 </button>
                 <ChevronDownIcon class="asowp-absolute asowp-right-3 asowp-top-1/2 -asowp-translate-y-1/2 asowp-w-4 asowp-h-4 asowp-text-[#616161] asowp-pointer-events-none" />
                 <div v-if="showSearchByMenu" class="asowp-absolute asowp-left-0 asowp-right-0 asowp-top-full asowp-z-20 asowp-bg-white asowp-border asowp-border-solid asowp-border-[#8c9196] asowp-shadow-lg">
                   <button
                     v-for="option in searchByOptions"
                     :key="option.value"
                     type="button"
                     @click="selectSearchBy(option.value)"
                     :class="[
                       'asowp-w-full asowp-px-4 asowp-py-1.5 asowp-text-left asowp-text-[16px] asowp-leading-6 asowp-border-none asowp-cursor-pointer',
                       searchBy === option.value ? 'asowp-bg-[#005bd3] asowp-text-white' : 'asowp-bg-white asowp-text-[#111827] hover:asowp-bg-[#f6f6f7]'
                     ]"
                   >
                     {{ option.label }}
                   </button>
                 </div>
              </div>
           </div>
           <div class="asowp-relative asowp-px-4 asowp-mb-3">
              <button @click="showFilterMenu = !showFilterMenu" class="asowp-px-3 asowp-py-1 asowp-rounded-full asowp-text-[16px] asowp-leading-6 asowp-text-[#303030] asowp-bg-white asowp-border asowp-border-solid asowp-border-[#dfe3e8] hover:asowp-bg-[#f6f6f7] asowp-cursor-pointer">{{ __('Add filter +', 'all-signs-options-pro') }}</button>
              <div v-if="showFilterMenu" class="asowp-absolute asowp-top-full asowp-left-4 asowp-z-[10] asowp-mt-1 asowp-w-[116px] asowp-bg-white asowp-rounded-xl asowp-shadow-xl asowp-border asowp-border-solid asowp-border-[#dfe3e8] asowp-py-2">
                 <button v-for="f in ['Categories', 'Collection', 'Types', 'Tags', 'Vendors']" :key="f" class="asowp-w-full asowp-px-4 asowp-py-2 asowp-text-left asowp-text-[16px] asowp-leading-6 asowp-text-[#303030] asowp-bg-transparent asowp-border-none hover:asowp-bg-[#f6f6f7] asowp-cursor-pointer">{{ f }}</button>
              </div>
           </div>

           <div class="asowp-h-[312px] asowp-overflow-y-auto asowp-border-t asowp-border-solid asowp-border-[#e1e3e5]">
              <div v-for="p in filteredWooProducts" :key="p.value" class="asowp-flex asowp-items-center asowp-gap-4 asowp-min-h-[72px] asowp-px-5 asowp-py-2 asowp-border-b asowp-border-solid asowp-border-[#e1e3e5] hover:asowp-bg-[#f6f6f7]">
                 <input type="checkbox" :value="p.value" v-model="selectedWooProductIds" class="asowp-w-5 asowp-h-5 asowp-rounded asowp-border-[#8c9196] asowp-cursor-pointer">
                 <div class="asowp-w-[50px] asowp-h-[50px] asowp-bg-[#f6f6f7] asowp-rounded-lg asowp-overflow-hidden asowp-flex asowp-items-center asowp-justify-center asowp-flex-shrink-0 asowp-border asowp-border-solid asowp-border-[#e1e3e5]">
                    <img v-if="p.image" :src="p.image" class="asowp-w-full asowp-h-full asowp-object-cover">
                    <ImageIcon v-else class="asowp-w-5 asowp-h-5 asowp-text-gray-300" />
                 </div>
                 <span class="asowp-text-[16px] asowp-leading-6 asowp-text-[#111827] asowp-truncate">{{ p.label }}</span>
              </div>
           </div>
        </div>
        <div class="asowp-h-[76px] asowp-px-5 asowp-bg-white asowp-border-t asowp-border-solid asowp-border-[#e1e3e5] asowp-flex asowp-items-center asowp-justify-between">
           <span class="asowp-text-[16px] asowp-leading-6 asowp-text-[#303030]">{{ selectedWooProductIds.length }} {{ __('products selected', 'all-signs-options-pro') }}</span>
           <div class="asowp-flex asowp-gap-3">
              <button @click="showProductModal = false" class="asowp-shopify-button-secondary">{{ __('Cancel', 'all-signs-options-pro') }}</button>
              <button @click="showProductModal = false" :disabled="selectedWooProductIds.length === 0" class="asowp-primary-button asowp-shopify-button-primary disabled:asowp-bg-[#d8d8d8] disabled:asowp-cursor-not-allowed">{{ __('Select', 'all-signs-options-pro') }}</button>
           </div>
        </div>
      </div>
    </div>

    <Teleport to="body">
      <!-- Review Configuration Modal -->
      <div v-if="showReviewModal" class="asowp-review-overlay asowp-fixed asowp-inset-0 asowp-z-[100000] asowp-flex asowp-items-center asowp-justify-center">
        <div class="asowp-absolute asowp-inset-0 asowp-bg-black/40" @click="!isLoading && (showReviewModal = false)"></div>
        <div class="asowp-review-modal asowp-relative asowp-bg-white asowp-rounded-[20px] asowp-shadow-2xl asowp-overflow-hidden" style="width: 980px; max-width: calc(100vw - 48px);">
          <div class="asowp-review-header asowp-flex asowp-items-center asowp-justify-between asowp-h-[66px] asowp-px-5 asowp-border-b asowp-border-solid asowp-border-[#e1e3e5]">
            <h3 class="asowp-text-[18px] asowp-leading-6 asowp-font-[900] asowp-text-[#111827] asowp-truncate">{{ __('Review configuration before creation', 'all-signs-options-pro') }}</h3>
            <button @click="showReviewModal = false" :disabled="isLoading" class="asowp-p-2 asowp-rounded-full hover:asowp-bg-gray-100 asowp-border-0 asowp-bg-transparent asowp-cursor-pointer disabled:asowp-opacity-50 disabled:asowp-cursor-not-allowed">
              <XIcon class="asowp-w-5 asowp-h-5 asowp-text-[#8c9196]" />
            </button>
          </div>
          <div class="asowp-review-body asowp-p-5 asowp-grid md:asowp-grid-cols-[1.4fr_1fr] asowp-gap-4">
             <div class="asowp-review-panel asowp-bg-[#f7f9fc] asowp-border asowp-border-solid asowp-border-[#dbe3ea] asowp-rounded-2xl">
                <h4 class="asowp-text-[16px] asowp-font-[900] asowp-text-[#303030] asowp-mb-4">{{ __('Configuration summary', 'all-signs-options-pro') }}</h4>
                <div class="asowp-space-y-3 asowp-text-[14px] asowp-leading-6">
                   <p><span class="asowp-text-[#667085]">{{ __('Product family:', 'all-signs-options-pro') }}</span> <span class="asowp-font-[900] asowp-text-[#101828]">{{ selectedFamilyTitle }}</span></p>
                   <p><span class="asowp-text-[#667085]">{{ __('Material:', 'all-signs-options-pro') }}</span> <span class="asowp-font-[900] asowp-text-[#101828]">{{ selectedMaterialsNames }}</span></p>
                   <p><span class="asowp-text-[#667085]">{{ __('Setup model:', 'all-signs-options-pro') }}</span> <span class="asowp-font-[900] asowp-text-[#101828]">{{ wizard.materialType === 'simple' ? (selectedFamilyTitle === 'Letter signs' ? 'Direct Options' : 'Flexible') : 'Preset Components' }}</span></p>
                   <p><span class="asowp-text-[#667085]">{{ __('Configuration name:', 'all-signs-options-pro') }}</span> <span class="asowp-font-[900] asowp-text-[#101828]">{{ newConfig.name }}</span></p>
                </div>
             </div>
             <div class="asowp-review-panel asowp-bg-[#f7f9fc] asowp-border asowp-border-solid asowp-border-[#dbe3ea] asowp-rounded-2xl">
                <h4 class="asowp-text-[16px] asowp-font-[900] asowp-text-[#303030] asowp-mb-4">{{ __('Starter template', 'all-signs-options-pro') }}</h4>
                <p class="asowp-text-[15px] asowp-leading-6 asowp-text-[#5c5f62] asowp-mb-4">{{ __('Decide if you want to start from a ready template or create the configuration from a blank setup.', 'all-signs-options-pro') }}</p>
                <div class="asowp-flex asowp-flex-wrap asowp-gap-3 asowp-mb-4">
                   <button @click="wizard.includeDemo = false" :class="['asowp-review-choice-button', !wizard.includeDemo ? 'is-selected' : '']">{{ __('Start blank', 'all-signs-options-pro') }}</button>
                   <button @click="wizard.includeDemo = true" :class="['asowp-review-choice-button', wizard.includeDemo ? 'is-selected' : '']">{{ __('Include starter template', 'all-signs-options-pro') }}</button>
                </div>
                <p class="asowp-text-[14px] asowp-leading-6 asowp-text-[#64748b]">
                   {{ wizard.includeDemo ? __('The configuration will be pre-filled with demo materials, shapes, and sizes.', 'all-signs-options-pro') : __('No starter template will be imported. The configuration will be created from your selected setup only.', 'all-signs-options-pro') }}
                </p>
             </div>
          </div>
          <div class="asowp-review-footer asowp-h-[76px] asowp-px-5 asowp-bg-white asowp-border-t asowp-border-solid asowp-border-[#e1e3e5] asowp-flex asowp-justify-end asowp-items-center asowp-gap-3">
             <button @click="showReviewModal = false" :disabled="isLoading" class="asowp-review-secondary-button">{{ __('Back', 'all-signs-options-pro') }}</button>
             <button @click="finalCreate" :disabled="isLoading" class="asowp-review-primary-button asowp-inline-flex asowp-items-center asowp-gap-2">
               <Loader2Icon v-if="isLoading" class="asowp-w-4 asowp-h-4 asowp-animate-spin" />
               <span>{{ isLoading ? __('Creating', 'all-signs-options-pro') : __('Create configuration', 'all-signs-options-pro') }}</span>
             </button>
             <span v-if="isLoading" class="asowp-creating-dots" aria-hidden="true">
               <span></span><span></span><span></span>
             </span>
          </div>
        </div>
      </div>
    </Teleport>

    <Teleport to="body">
      <div v-if="showExternalPluginModal" class="asowp-fixed asowp-inset-0 asowp-z-[100000] asowp-flex asowp-items-center asowp-justify-center">
        <div class="asowp-absolute asowp-inset-0 asowp-bg-black/40" @click="closeExternalPluginModal"></div>
        <div class="asowp-external-plugin-modal asowp-relative asowp-bg-white asowp-rounded-[20px] asowp-shadow-2xl asowp-overflow-hidden" style="width: min(620px, calc(100vw - 48px));">
          <div class="asowp-h-[66px] asowp-flex asowp-items-center asowp-justify-between asowp-px-5 asowp-border-b asowp-border-solid asowp-border-[#dfe3e8]">
            <h3 class="asowp-text-[18px] asowp-leading-6 asowp-font-[900] asowp-text-[#111827] asowp-m-0">{{ __('Letter signs require a dedicated plugin', 'all-signs-options-pro') }}</h3>
            <button @click="closeExternalPluginModal" class="asowp-external-icon-button asowp-p-2 asowp-rounded-full asowp-border-0 asowp-bg-transparent asowp-cursor-pointer">
              <XIcon class="asowp-w-5 asowp-h-5 asowp-text-[#8c9196]" />
            </button>
          </div>
          <div class="asowp-p-5">
            <p class="asowp-text-[14px] asowp-leading-6 asowp-text-[#303030] asowp-m-0 asowp-mb-4">
              {{ __('Letter signs are handled by Neon & Channel Product Customizer, a dedicated plugin for neon and channel-letter products.', 'all-signs-options-pro') }}
            </p>
            <p class="asowp-text-[13px] asowp-leading-5 asowp-text-[#616161] asowp-m-0">
              {{ __('Use one of the links below to install the free version or view the full product page.', 'all-signs-options-pro') }}
            </p>
          </div>
          <div class="asowp-h-[76px] asowp-px-5 asowp-bg-white asowp-border-t asowp-border-solid asowp-border-[#e1e3e5] asowp-flex asowp-justify-end asowp-items-center asowp-gap-3">
            <button @click="closeExternalPluginModal" class="asowp-plugin-modal-button asowp-plugin-modal-button-secondary">{{ __('Close', 'all-signs-options-pro') }}</button>
            <a href="https://fr.wordpress.org/plugins/neon-channel-product-customizer-free/" target="_blank" rel="noopener noreferrer" class="asowp-plugin-modal-button asowp-plugin-modal-button-secondary asowp-inline-flex asowp-items-center asowp-no-underline">
              {{ __('Free plugin', 'all-signs-options-pro') }}
            </a>
            <a href="https://signsdesigner.us/neon-channel-product-customizer-product/" target="_blank" rel="noopener noreferrer" class="asowp-plugin-modal-button asowp-plugin-modal-button-primary asowp-inline-flex asowp-items-center asowp-no-underline">
              {{ __('Product page', 'all-signs-options-pro') }}
            </a>
          </div>
        </div>
      </div>

      <!-- Gallery Preview Modal -->
      <div v-if="showGalleryPreview" class="asowp-gallery-overlay asowp-fixed asowp-inset-0 asowp-z-[100000] asowp-flex asowp-items-start asowp-justify-center">
        <div class="asowp-absolute asowp-inset-0 asowp-bg-black/40" @click="closePreview"></div>
        <div
          class="asowp-gallery-modal asowp-relative asowp-bg-white asowp-rounded-[20px] asowp-shadow-2xl asowp-overflow-hidden asowp-flex asowp-flex-col"
          style="width: 980px; max-width: calc(100vw - 64px); max-height: calc(100vh - 224px);"
        >
          <div class="asowp-gallery-header asowp-h-[66px] asowp-flex asowp-items-center asowp-justify-between asowp-px-5 asowp-bg-white asowp-border-b asowp-border-solid asowp-border-[#dfe3e8] asowp-flex-shrink-0">
            <h3 class="asowp-text-[18px] asowp-leading-6 asowp-font-[900] asowp-text-[#111827] asowp-m-0">{{ previewItem?.title }} {{ __('previews', 'all-signs-options-pro') }}</h3>
            <button @click="closePreview" class="asowp-p-2 asowp-rounded-full hover:asowp-bg-[#f6f6f7] asowp-border-0 asowp-bg-transparent asowp-cursor-pointer">
              <XIcon class="asowp-w-5 asowp-h-5 asowp-text-[#8c9196]" />
            </button>
          </div>
          <div class="asowp-gallery-body asowp-p-5 asowp-overflow-y-auto">
            <div class="asowp-gallery-grid asowp-grid asowp-grid-cols-1 md:asowp-grid-cols-3">
              <div v-for="(img, idx) in previewImages" :key="idx" class="asowp-gallery-tile asowp-overflow-hidden asowp-bg-[#f8fafc] asowp-border asowp-border-solid asowp-border-[#e4e7ec]">
                <img :src="mediaSrc(img)" class="asowp-w-full asowp-h-full asowp-object-cover" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import api from "@/admin/Api/api";
import toastMessage from "@/admin/utils/functions";
import { configurationDemoData } from "@/admin/utils/create-config.data";
import { resolveAdminImageUrl, shopifyImageUrl } from "@/admin/utils/shopify-assets";
import {
  ChevronRightIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  EyeIcon,
  ImageIcon,
  CheckIcon,
  XIcon,
  InfoIcon,
  SearchIcon,
  Loader2Icon
} from 'lucide-vue-next';
import { __, sprintf } from "@wordpress/i18n";

const props = defineProps({
  isEdit: { type: Boolean, default: false },
  configToEdit: { type: Object, default: () => ({}) },
});

const emit = defineEmits(['onFinish', 'onCancel']);
const router = useRouter();

const mediaSrc = (path) => {
  return resolveAdminImageUrl(getFirstImage(path));
};
const setupModelImage = (type) => shopifyImageUrl(
  type === 'advance'
    ? '/images/create-config/setup-models/build-from-preset.webp'
    : '/images/create-config/setup-models/build-from-option.webp'
);
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
  productType: 'signboard',
  selectedMaterials: [],
  materialType: 'simple',
  includeDemo: false,
  attemptedCreate: false,
});

const newConfig = ref({ name: "", description: "", icon: "" });
const selectedWooProductIds = ref([]);
const wooProductsOptions = ref([]);

const productFamilies = [
  {
    id: 'signboard',
    title: __('Signs & Panels', 'all-signs-options-pro'),
    desc: __('Rigid signage products like office signs, plaques, engraved panels and general display boards.', 'all-signs-options-pro'),
    image: '/images/create-config/families/signs-panels.webp',
    previews: ['/images/create-config/families/signs-panels.webp']
  },
  { id: 'banner', title: __('Banners', 'all-signs-options-pro'), desc: __('Flexible printed products for events, retail and promotional display.', 'all-signs-options-pro'), image: '/images/create-config/families/banners.webp', previews: ['/images/create-config/families/banners.webp'] },
  { id: 'sticker', title: __('Stickers', 'all-signs-options-pro'), desc: __('Adhesive products for windows, packaging, walls and floors.', 'all-signs-options-pro'), image: '/images/create-config/families/stickers.webp', previews: ['/images/create-config/families/stickers.webp'] },
  { id: 'letter-signs', title: __('Letter signs', 'all-signs-options-pro'), desc: __('Text-based illuminated or fabricated signs built around custom letter forms.', 'all-signs-options-pro'), image: '/images/create-config/families/letter-signs.webp', previews: ['/images/create-config/families/letter-signs.webp'], externalPlugin: true },
  { id: 'ai-signs', title: __('AI Signs', 'all-signs-options-pro'), desc: __('AI-assisted logo sign configurations for neon and channel style branded signage.', 'all-signs-options-pro'), image: '/images/create-config/families/ai-signs.webp', comingSoon: true, previews: ['/images/create-config/families/ai-signs.webp'] },
  { id: 'lightbox', title: __('Lightbox', 'all-signs-options-pro'), desc: __('Illuminated lightbox sign configurations. This category is coming soon.', 'all-signs-options-pro'), image: '/images/create-config/families/lightbox.webp', comingSoon: true, previews: ['/images/create-config/families/lightbox.webp'] }
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
const selectedMaterialsNames = computed(() => wizard.value.selectedMaterials.map(mid => availableMaterials.value.find(m => m.id === mid)?.title).filter(Boolean).join(', '));
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
  { value: 'all', label: __('All', 'all-signs-options-pro') },
  { value: 'title', label: __('Product title', 'all-signs-options-pro') },
  { value: 'id', label: __('Product ID', 'all-signs-options-pro') },
  { value: 'barcode', label: __('Barcode', 'all-signs-options-pro') },
  { value: 'sku', label: __('SKU', 'all-signs-options-pro') },
]);
const searchByLabel = computed(() => searchByOptions.value.find(option => option.value === searchBy.value)?.label || __('All', 'all-signs-options-pro'));

const selectSearchBy = (value) => {
  searchBy.value = value;
  showSearchByMenu.value = false;
};

const removeSelectedProduct = (productId) => {
  selectedWooProductIds.value = selectedWooProductIds.value.filter(id => String(id) !== String(productId));
};

const stripIdsDeep = (value) => {
  if (Array.isArray(value)) return value.map(stripIdsDeep);
  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value)
        .filter(([key]) => key !== 'id')
        .map(([key, item]) => [key, stripIdsDeep(item)])
    );
  }
  return value;
};

const clearArraysDeep = (value) => {
  if (Array.isArray(value)) return [];
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, clearArraysDeep(item)]));
  }
  return value;
};

const slugify = (value) => String(value || 'configuration').trim().toLowerCase().replace(/\s+/g, '-');

const buildConfigData = () => {
  const demo = configurationDemoData?.[0]?.data || {};
  const baseMaterial = demo.materials?.[0] || {};
  const selectedMaterials = wizard.value.selectedMaterials.length
    ? wizard.value.selectedMaterials
    : filteredMaterials.value.slice(0, 1).map((material) => material.id);

  const buildMaterials = (withStarterData = false) => selectedMaterials.map((materialId, index) => {
    const material = availableMaterials.value.find(item => item.id === materialId);
    const sourceMaterial = withStarterData
      ? stripIdsDeep(baseMaterial)
      : clearArraysDeep(stripIdsDeep(baseMaterial));

    return {
      ...sourceMaterial,
      id: materialId,
      materialKey: materialId,
      sourceMaterialId: materialId,
      name: material?.title || selectedFamilyTitle.value || __('Material', 'all-signs-options-pro'),
      label: material?.title || selectedFamilyTitle.value || __('Material', 'all-signs-options-pro'),
      description: '',
      icon: material?.image ? mediaSrc(material.image) : '',
      image: material?.image ? mediaSrc(material.image) : '',
      previewImg: material?.image ? mediaSrc(material.image) : '',
      popImg: '',
      popupImg: '',
      type: wizard.value.materialType,
      active: true,
      isDefault: index === 0,
      pricingId: sourceMaterial?.pricingId || '',
      additionalPrice: Number(sourceMaterial?.additionalPrice || 0),
      excludeComponentIds: Array.isArray(sourceMaterial?.excludeComponentIds) ? sourceMaterial.excludeComponentIds : [],
    };
  });

  if (wizard.value.includeDemo) {
    const demoPayload = stripIdsDeep(demo);
    return {
      ...demoPayload,
      settings: {
        ...(demoPayload.settings || {}),
        productFamily: selectedFamilyTitle.value,
        productFamilySlug: selectedFamilySlug.value,
        productType: wizard.value.productType,
        selectedMaterialIds: selectedMaterials,
      },
      materials: buildMaterials(true),
    };
  }

  return {
    settings: {
      ...stripIdsDeep(demo.settings || {}),
      productFamily: selectedFamilyTitle.value,
      productFamilySlug: selectedFamilySlug.value,
      productType: wizard.value.productType,
      selectedMaterialIds: selectedMaterials,
    },
    additionalOptions: [],
    materials: buildMaterials(false),
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

const getStepTitle = (s) => [__('Product family', 'all-signs-options-pro'), __('Material', 'all-signs-options-pro'), __('Setup model', 'all-signs-options-pro'), __('Product info', 'all-signs-options-pro')][s - 1];
const getStepTip = (s) => [
  __('Start with the product family. We will narrow the experience in the next step.', 'all-signs-options-pro'),
  __('Choose the right material first, then define how the configurator should be structured.', 'all-signs-options-pro'),
  __('Pick the setup model now. Starter template selection happens in the final review.', 'all-signs-options-pro'),
  __('Finish the configuration details, then create it and continue in the full editor.', 'all-signs-options-pro')
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
  if (wizard.value.step === 1) return !!wizard.value.productType;
  if (wizard.value.step === 2) return wizard.value.selectedMaterials.length > 0;
  if (wizard.value.step === 3) return !!wizard.value.materialType;
  return true;
});

const goNext = () => {
  if (canNext.value && wizard.value.step < 4) wizard.value.step++;
};

const goBack = () => {
  if (wizard.value.step > 1) wizard.value.step--;
  else emit('onCancel');
};

const handleMainAction = () => {
  if (wizard.value.step < 4) goNext();
  else {
    wizard.value.attemptedCreate = true;
    if (newConfig.value.name) showReviewModal.value = true;
  }
};

const selectConfigIcon = (e) => {
  e.preventDefault();
  wp.media({ title: __("Select Config Image", "all-signs-options-pro"), button: { text: __("Select image", "all-signs-options-pro") }, multiple: false })
    .on('select', () => {
      const attachment = wp.media.frame.state().get('selection').first().toJSON();
      newConfig.value.icon = attachment.url;
    }).open();
};

const finalCreate = async () => {
  if (isLoading.value) return;
  isLoading.value = true;
  try {
     const data = buildConfigData();
     const response = await api.addConfig({
        name: newConfig.value.name,
        description: newConfig.value.description,
        materialType: wizard.value.materialType,
        icon: newConfig.value.icon,
        popImg: '',
        data,
        product_ids: selectedWooProductIds.value,
        includeDemo: wizard.value.includeDemo
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
        toastMessage(response.message || __('Registration failed', 'all-signs-options-pro'), 'error');
     }
  } catch (e) { toastMessage(e?.response?.data?.message || __('Error', 'all-signs-options-pro'), 'error'); }
  finally { isLoading.value = false; }
};

onMounted(async () => {
  if (props.isEdit) wizard.value.step = 4;
  const res = await api.getUnassignedProducts({ per_page: 100 });
  wooProductsOptions.value = (res?.data || []).map(p => ({
    value: p.id,
    label: cleanProductTitle(p.title),
    image: p.image,
    sku: p.sku || '',
    barcode: p.barcode || ''
  }));
});
</script>

<style>
.asowp-create-wizard {
  background: var(--asowp-shopify-bg) !important;
  color: var(--asowp-shopify-text);
  font-size: 13px !important;
}

.asowp-create-wizard h1 {
  color: var(--asowp-shopify-text) !important;
  font-size: 28px !important;
  line-height: 34px !important;
  font-weight: var(--asowp-shopify-weight-heavy) !important;
}

.asowp-create-wizard > .asowp-text-center p {
  font-size: 13px !important;
  line-height: 19px !important;
}

.asowp-create-stepper-wrap {
  position: sticky;
  top: calc(var(--wp-admin--admin-bar--height, 32px) + 12px);
  z-index: 20;
  padding: 4px 0 10px;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.asowp-create-stepper {
  width: min(760px, calc(100vw - 72px)) !important;
  justify-content: space-between !important;
  padding: 6px 12px !important;
  gap: 8px !important;
  border-color: #e3e8ef !important;
  box-shadow: 0 6px 16px rgba(15, 23, 42, 0.05) !important;
}

.asowp-create-stepper > div {
  flex: 0 0 auto;
  justify-content: center;
}

.asowp-create-stepper > div:first-child {
  flex: 0 0 auto;
}

.asowp-create-stepper > div > div {
  white-space: nowrap;
}

.asowp-create-stepper .asowp-text-\[13px\] {
  font-size: 13px !important;
  line-height: 18px !important;
}

.asowp-create-stepper span.asowp-w-5 {
  width: 20px !important;
  height: 20px !important;
  font-size: 10px !important;
}

.asowp-create-step-arrow {
  margin-left: 8px !important;
  margin-right: 8px !important;
  flex: 0 0 auto;
}

@media (max-width: 900px) {
  .asowp-create-stepper {
    width: calc(100vw - 32px) !important;
    gap: 8px !important;
    padding: 7px 10px !important;
  }

  .asowp-create-step-arrow {
    margin-left: 6px !important;
    margin-right: 6px !important;
  }
}

.asowp-create-wizard h2 {
  color: var(--asowp-shopify-text-strong) !important;
  font-weight: var(--asowp-shopify-weight-bold) !important;
}

.asowp-create-shell {
  border-radius: var(--asowp-shopify-radius-page-card) !important;
  border-color: var(--asowp-shopify-border) !important;
  box-shadow: var(--asowp-shopify-shadow-panel) !important;
  max-width: 1180px !important;
}

.asowp-create-shell > div:not(:last-child) {
  padding: 26px !important;
}

.asowp-create-shell > div:last-child {
  padding: 18px 26px !important;
}

.asowp-create-wizard .asowp-grid {
  column-gap: 16px !important;
  row-gap: 16px !important;
  align-items: stretch !important;
}

.asowp-create-wizard h2 {
  font-size: 18px !important;
  line-height: 23px !important;
  margin-bottom: 8px !important;
}

.asowp-create-wizard h3,
.asowp-create-wizard h4 {
  font-size: 14px !important;
  line-height: 19px !important;
}

.asowp-create-wizard p {
  font-size: 12.5px !important;
  line-height: 18px !important;
}

.asowp-create-select-card,
.asowp-create-model-card {
  background: var(--asowp-shopify-surface) !important;
  border: 1px solid var(--asowp-shopify-border) !important;
  border-radius: var(--asowp-shopify-radius-select-card) !important;
  box-shadow: var(--asowp-shopify-shadow-card) !important;
  padding: 14px !important;
  min-height: 0 !important;
  height: 100% !important;
  gap: 14px !important;
  overflow: hidden;
  box-sizing: border-box !important;
}

.asowp-create-model-card {
  border-radius: 18px !important;
  padding: 18px !important;
  gap: 14px !important;
}

.asowp-create-select-card.asowp-border-\[\#006e52\],
.asowp-create-model-card.asowp-border-\[\#006e52\] {
  border-color: var(--asowp-shopify-border) !important;
  box-shadow: var(--asowp-shopify-shadow-selected) !important;
}

.asowp-create-external-card {
  background: #f6f7f8 !important;
  border-color: #d6dbe1 !important;
  box-shadow: none !important;
}

.asowp-create-external-card::after {
  content: "";
  position: absolute;
  inset: 0;
  background: rgba(255, 255, 255, 0.28);
  pointer-events: none;
}

.asowp-create-external-card .asowp-create-card-image {
  filter: grayscale(0.95);
  opacity: 0.72;
}

.asowp-create-external-card h3,
.asowp-create-external-card p {
  color: #5f6368 !important;
}

.asowp-create-external-pill {
  background: #e5e7eb !important;
  color: #4b5563 !important;
}

.asowp-create-card-image {
  width: 80px !important;
  height: 80px !important;
  border-radius: 12px !important;
  border: 1px solid #d6dee3;
  background: #eef3f6 !important;
  box-shadow: inset 0 0 0 1px rgba(255,255,255,0.45);
}

.asowp-create-select-card.asowp-border-\[\#006e52\] .asowp-create-card-image,
.asowp-create-model-card.asowp-border-\[\#006e52\] > .asowp-flex:first-child > div:first-child {
  box-shadow: 0 0 0 2px rgba(148, 163, 184, 0.22), inset 0 0 0 1px rgba(255,255,255,0.45) !important;
}

.asowp-create-select-card > .asowp-flex-1,
.asowp-create-model-card > .asowp-flex:first-child > .asowp-flex-1 {
  gap: 6px !important;
  min-width: 0;
}

.asowp-create-select-card h3,
.asowp-create-model-card h4 {
  font-size: 17px !important;
  line-height: 22px !important;
  font-weight: 700 !important;
  color: #111827 !important;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.asowp-create-select-card p,
.asowp-create-model-card > .asowp-flex:first-child p {
  color: #5f6368 !important;
  font-size: 14px !important;
  line-height: 20px !important;
  margin-top: 1px !important;
}

.asowp-create-select-card > .asowp-flex-1 > p {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.asowp-create-select-card span.asowp-text-\[12px\],
.asowp-create-select-card .asowp-text-\[12px\] {
  color: #9ea6ad !important;
  font-size: 12px !important;
  font-weight: 500 !important;
}

.asowp-create-select-card button {
  width: 28px !important;
  height: 28px !important;
  border: 1px solid #d6dee3 !important;
  background: #f8fafc !important;
  color: #4b5563 !important;
  padding: 0 !important;
}

.asowp-create-model-card > .asowp-flex:first-child {
  gap: 14px !important;
}

.asowp-create-model-card > .asowp-flex:first-child > div:first-child {
  width: 100px !important;
  height: 100px !important;
  border-radius: 12px !important;
  background-color: #eef3f6 !important;
  border: 1px solid #d6dee3 !important;
  box-shadow: inset 0 0 0 1px rgba(255,255,255,0.45);
}

.asowp-create-model-card ul {
  margin-top: 4px !important;
  display: flex !important;
  flex-direction: column !important;
  gap: 10px !important;
}

.asowp-create-model-card li {
  align-items: flex-start !important;
  gap: 10px !important;
  color: #344054 !important;
  font-size: 14px !important;
  line-height: 20px !important;
}

.asowp-create-model-card li > div {
  width: 8px !important;
  height: 8px !important;
  margin-top: 7px !important;
  background: rgba(1, 100, 100, 0.75) !important;
  flex-shrink: 0;
}

.asowp-step4 {
  padding: 20px 24px !important;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.asowp-step4-intro {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.asowp-step4-intro h2,
.asowp-step4-intro p {
  margin: 0 !important;
}

.asowp-step4-layout {
  gap: 16px !important;
  align-items: flex-start;
}

.asowp-step4-card {
  border-color: #e4e7ec !important;
  border-radius: 14px !important;
  box-shadow: 0 4px 14px rgba(15, 23, 42, 0.04) !important;
  padding: 16px !important;
}

.asowp-step4-main .asowp-step4-card + .asowp-step4-card {
  margin-top: 0 !important;
}

.asowp-step4-summary {
  margin-top: 0 !important;
}

@media (max-width: 1023px) {
  .asowp-step4-summary {
    margin-top: 0 !important;
  }
}

.asowp-review-modal {
  border-radius: 20px !important;
  box-shadow: 0 24px 54px rgba(15, 23, 42, 0.22) !important;
}

.asowp-review-body {
  gap: 16px !important;
}

.asowp-review-panel {
  min-height: 230px;
  padding: 18px !important;
  border-radius: 16px !important;
}

.asowp-review-choice-button {
  min-height: 44px;
  padding: 8px 16px;
  border: 1px solid #b7c2cc;
  border-radius: 10px;
  background: #ffffff;
  color: #475467;
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
  cursor: pointer;
  box-shadow: none;
}

.asowp-review-choice-button.is-selected {
  border: 2px solid rgba(1, 100, 100, 0.7);
  background: rgba(1, 100, 100, 0.08);
  color: rgba(1, 100, 100, 0.9);
}

.asowp-review-secondary-button,
.asowp-review-primary-button {
  min-height: 34px;
  padding: 8px 14px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 700;
  line-height: 18px;
  cursor: pointer;
  box-shadow: none;
}

.asowp-review-secondary-button:disabled,
.asowp-review-primary-button:disabled {
  cursor: not-allowed;
  opacity: 0.72;
}

.asowp-review-secondary-button {
  border: 1px solid #c9cccf;
  background: #ffffff;
  color: #111827;
}

.asowp-review-primary-button {
  border: 0;
  background: #006e52;
  color: #ffffff !important;
  -webkit-text-fill-color: #ffffff !important;
}

.asowp-review-primary-button:hover,
.asowp-review-primary-button:focus,
.asowp-review-primary-button:active {
  background: #005c45;
  color: #ffffff !important;
  -webkit-text-fill-color: #ffffff !important;
}

.asowp-creating-dots {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  min-width: 28px;
  height: 34px;
}

.asowp-creating-dots span {
  width: 5px;
  height: 5px;
  border-radius: 999px;
  background: #6b7280;
  animation: asowpCreatingDot 0.9s infinite ease-in-out;
}

.asowp-creating-dots span:nth-child(2) {
  animation-delay: 0.12s;
}

.asowp-creating-dots span:nth-child(3) {
  animation-delay: 0.24s;
}

@keyframes asowpCreatingDot {
  0%, 80%, 100% {
    opacity: 0.35;
    transform: translateY(0);
  }

  40% {
    opacity: 1;
    transform: translateY(-3px);
  }
}

.asowp-external-plugin-modal {
  border: 1px solid #dfe3e8 !important;
  box-shadow: 0 28px 70px rgba(15, 23, 42, 0.24) !important;
}

.asowp-external-icon-button,
.asowp-external-icon-button:hover,
.asowp-external-icon-button:focus,
.asowp-external-icon-button:active {
  border: 0 !important;
  box-shadow: none !important;
  outline: none !important;
  background: transparent !important;
}

.asowp-external-icon-button:hover {
  background: #f6f6f7 !important;
}

.asowp-plugin-modal-button {
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

.asowp-plugin-modal-button,
.asowp-plugin-modal-button:hover,
.asowp-plugin-modal-button:focus,
.asowp-plugin-modal-button:active {
  outline: none !important;
  box-shadow: none !important;
}

.asowp-plugin-modal-button-secondary {
  border: 1px solid #c9cccf !important;
  background: #ffffff !important;
  color: #202223 !important;
}

.asowp-plugin-modal-button-secondary:hover,
.asowp-plugin-modal-button-secondary:focus,
.asowp-plugin-modal-button-secondary:active {
  border-color: #babfc3 !important;
  background: #f6f6f7 !important;
  color: #202223 !important;
}

.asowp-plugin-modal-button-primary {
  border: 1px solid #006e52 !important;
  background: #006e52 !important;
  color: #ffffff !important;
  -webkit-text-fill-color: #ffffff !important;
}

.asowp-plugin-modal-button-primary:hover,
.asowp-plugin-modal-button-primary:focus,
.asowp-plugin-modal-button-primary:active {
  border-color: #005c45 !important;
  background: #005c45 !important;
  color: #ffffff !important;
  -webkit-text-fill-color: #ffffff !important;
}

.asowp-gallery-overlay {
  padding-top: 182px !important;
  padding-left: 24px !important;
  padding-right: 24px !important;
}

.asowp-gallery-modal {
  width: 980px !important;
  max-width: calc(100vw - 64px) !important;
  max-height: calc(100vh - 224px) !important;
  border-radius: 20px !important;
  box-shadow: 0 24px 54px rgba(15, 23, 42, 0.22) !important;
}

.asowp-gallery-header h3 {
  color: #111827 !important;
  font-size: 18px !important;
  line-height: 24px !important;
  font-weight: 750 !important;
}

.asowp-gallery-grid {
  gap: 14px !important;
}

.asowp-gallery-tile {
  height: 220px !important;
  border-radius: 16px !important;
  width: 100% !important;
}

.asowp-gallery-grid .asowp-gallery-tile:only-child {
  grid-column: 2 / 3;
}

@media (max-width: 767px) {
  .asowp-gallery-overlay {
    padding-top: 72px !important;
    padding-left: 16px !important;
    padding-right: 16px !important;
  }

  .asowp-gallery-modal {
    width: calc(100vw - 32px) !important;
    max-height: calc(100vh - 96px) !important;
  }

  .asowp-gallery-grid .asowp-gallery-tile:only-child {
    grid-column: auto;
  }
}

.asowp-create-wizard .asowp-space-y-2 > :not([hidden]) ~ :not([hidden]) {
  margin-top: 8px !important;
}

.asowp-create-wizard li {
  font-size: 12.5px !important;
  line-height: 18px !important;
}

.asowp-create-wizard .asowp-text-\[22px\] {
  font-size: 17px !important;
}

.asowp-create-wizard .asowp-text-\[16px\] {
  font-size: 12.5px !important;
}

.asowp-create-wizard .asowp-text-\[13px\] {
  font-size: 12.5px !important;
}

.asowp-create-wizard .asowp-text-\[12px\] {
  font-size: 11.5px !important;
}

.asowp-create-wizard .asowp-mb-7,
.asowp-create-wizard .asowp-mb-8 {
  margin-bottom: 18px !important;
}

.asowp-create-wizard .asowp-mb-6 {
  margin-bottom: 16px !important;
}

.asowp-create-wizard .asowp-mb-5 {
  margin-bottom: 14px !important;
}

.asowp-create-wizard .asowp-mb-3 {
  margin-bottom: 8px !important;
}

.asowp-create-wizard .asowp-rounded-\[18px\],
.asowp-create-wizard .asowp-rounded-\[20px\],
.asowp-create-wizard .asowp-rounded-\[24px\] {
  border-radius: 14px !important;
}

.asowp-create-info-pill {
  background: #e1f0ff !important;
  color: #005bd3 !important;
}

#asowp-backend-app .asowp-create-wizard .asowp-create-select-card h3,
#asowp-backend-app .asowp-create-wizard .asowp-create-model-card h4 {
  font-size: 17px !important;
  line-height: 22px !important;
  font-weight: 700 !important;
}

#asowp-backend-app .asowp-create-wizard .asowp-create-select-card > .asowp-flex-1 > p,
#asowp-backend-app .asowp-create-wizard .asowp-create-model-card > .asowp-flex:first-child p {
  font-size: 14px !important;
  line-height: 20px !important;
  color: #5f6368 !important;
}

#asowp-backend-app .asowp-create-wizard .asowp-create-model-card li {
  font-size: 14px !important;
  line-height: 20px !important;
  color: #344054 !important;
}

#asowp-backend-app .asowp-create-wizard .asowp-create-select-card {
  padding: 14px !important;
  min-height: 0 !important;
  height: 100% !important;
}

#asowp-backend-app .asowp-create-wizard .asowp-create-model-card {
  padding: 18px !important;
  min-height: 0 !important;
  height: 100% !important;
}

#asowp-backend-app .asowp-create-wizard .asowp-create-card-image {
  width: 80px !important;
  height: 80px !important;
}

#asowp-backend-app .asowp-create-wizard .asowp-create-model-card > .asowp-flex:first-child > div:first-child {
  width: 100px !important;
  height: 100px !important;
}

#asowp-backend-app .asowp-create-shell .asowp-grid {
  column-gap: 16px !important;
  row-gap: 16px !important;
  align-items: stretch !important;
}

#asowp-backend-app .asowp-create-shell .asowp-grid > * {
  min-width: 0;
  margin: 0 !important;
}

.asowp-create-wizard input,
.asowp-create-wizard textarea,
.asowp-create-wizard select {
  border-radius: var(--asowp-shopify-radius-control) !important;
  border-color: var(--asowp-shopify-input-border) !important;
  color: var(--asowp-shopify-text) !important;
  font-size: var(--asowp-shopify-font-body) !important;
}

.asowp-create-wizard input:focus,
.asowp-create-wizard textarea:focus,
.asowp-create-wizard select:focus {
  border-color: var(--asowp-shopify-focus) !important;
  box-shadow: 0 0 0 2px var(--asowp-shopify-focus) !important;
}

body #asowp-backend-app button.asowp-primary-button,
body #asowp-backend-app button.asowp-primary-button:hover,
body #asowp-backend-app button.asowp-primary-button:focus,
body #asowp-backend-app button.asowp-primary-button:active,
body #asowp-backend-app button.asowp-primary-button:visited {
  color: #ffffff !important;
  text-decoration: none !important;
}

body #asowp-backend-app button.asowp-primary-button * {
  color: inherit !important;
}
</style>
