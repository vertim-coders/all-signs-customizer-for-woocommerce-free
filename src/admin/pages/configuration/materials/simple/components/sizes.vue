<template>
  <div class="asowp-sizes-page asowp-space-y-3">
    <template v-if="!isNewSize">
      <div class="asowp-sizes-header asowp-bg-white asowp-rounded-xl asowp-border asowp-border-solid asowp-border-[#dfe3e8] asowp-px-5 asowp-py-4 asowp-flex asowp-items-center asowp-justify-between">
        <div>
          <h2 class="asowp-text-[16px] asowp-leading-6 asowp-font-[900] asowp-text-[#303030] asowp-m-0">{{ __('Sizes', 'all-signs-options-pro') }}</h2>
          <p class="asowp-text-[12px] asowp-leading-4 asowp-text-[#6b7280] asowp-m-0">{{ __('Create the available sizes and define how many text lines each one allows.', 'all-signs-options-pro') }}</p>
        </div>
        <button
          @click="newSize"
          class="asowp-inline-flex asowp-items-center asowp-gap-2 asowp-px-3 asowp-py-1.5 asowp-bg-[#007a72] asowp-text-white asowp-text-[12px] asowp-leading-4 asowp-font-[900] asowp-border-none asowp-rounded-md asowp-cursor-pointer hover:asowp-bg-[#00645f]"
        >
          <PlusIcon class="asowp-w-3.5 asowp-h-3.5" />
          {{ __('Add new size', 'all-signs-options-pro') }}
        </button>
      </div>

      <div class="asowp-sizes-card asowp-bg-white asowp-rounded-xl asowp-border asowp-border-solid asowp-border-[#dfe3e8] asowp-p-5">
        <h3 class="asowp-text-[14px] asowp-font-[900] asowp-text-[#303030] asowp-mt-0 asowp-mb-3">{{ __('Sizes List', 'all-signs-options-pro') }}</h3>
        <div class="asowp-overflow-x-auto">
          <table class="asowp-w-full asowp-border-collapse">
            <thead>
              <tr class="asowp-bg-[#f3f3f3]">
                <th class="asowp-w-8 asowp-py-2 asowp-px-3"></th>
                <th class="asowp-py-2 asowp-px-3 asowp-text-left asowp-text-[11px] asowp-font-bold asowp-text-[#6b7280]">{{ __('Label', 'all-signs-options-pro') }}</th>
                <th class="asowp-py-2 asowp-px-3 asowp-text-left asowp-text-[11px] asowp-font-bold asowp-text-[#6b7280]">{{ __('Dimensions', 'all-signs-options-pro') }}</th>
                <th class="asowp-py-2 asowp-px-3 asowp-text-left asowp-text-[11px] asowp-font-bold asowp-text-[#6b7280]">{{ __('Default', 'all-signs-options-pro') }}</th>
                <th class="asowp-py-2 asowp-px-3 asowp-text-left asowp-text-[11px] asowp-font-bold asowp-text-[#6b7280]">{{ __('Actions', 'all-signs-options-pro') }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="isFetching">
                <td colspan="5" class="asowp-p-8 asowp-text-center">
                  <Loader2Icon class="asowp-w-7 asowp-h-7 asowp-text-[#007a72] asowp-animate-spin asowp-mx-auto" />
                </td>
              </tr>
              <tr v-else-if="sizes.allSizes.length === 0">
                <td colspan="5" class="asowp-p-8 asowp-text-center asowp-text-[13px] asowp-text-[#6b7280]">
                  {{ __('No standard sizes found.', 'all-signs-options-pro') }}
                </td>
              </tr>
              <tr
                v-for="(sz, key) in sizes.allSizes"
                :key="key"
                class="asowp-border-b asowp-border-solid asowp-border-[#eceff2] last:asowp-border-b-0"
                draggable="true"
                @dragstart="dragStart(key)"
                @dragover.prevent
                @drop="dropSize(key)"
              >
                <td class="asowp-py-2.5 asowp-px-3 asowp-text-[#303030]">
                  <GripVerticalIcon class="asowp-w-4 asowp-h-4 asowp-cursor-grab active:asowp-cursor-grabbing" />
                </td>
                <td class="asowp-py-2.5 asowp-px-3 asowp-text-[13px] asowp-font-[900] asowp-text-[#303030]">{{ sz.label }}</td>
                <td class="asowp-py-2.5 asowp-px-3 asowp-text-[13px] asowp-text-[#303030]">{{ sz.width }} x {{ sz.height }}</td>
                <td class="asowp-py-2.5 asowp-px-3">
                  <div
                    @click="!isLoading && selectDefault(key)"
                    :class="[
                      'asowp-w-9 asowp-h-5 asowp-rounded-full asowp-relative asowp-cursor-pointer asowp-transition-colors',
                      sz.isDefault ? 'asowp-bg-[#007a72]' : 'asowp-bg-[#d9dee8]'
                    ]"
                  >
                    <div :class="['asowp-absolute asowp-top-0.5 asowp-w-4 asowp-h-4 asowp-rounded-full asowp-bg-white asowp-shadow asowp-transition-all', sz.isDefault ? 'asowp-right-0.5' : 'asowp-left-0.5']"></div>
                  </div>
                </td>
                <td class="asowp-py-2.5 asowp-px-3">
                  <div class="asowp-flex asowp-items-center asowp-gap-3">
                    <button @click="selectMaterialSize(key, sz)" class="asowp-inline-flex asowp-items-center asowp-gap-1 asowp-px-2 asowp-py-1 asowp-bg-white asowp-border asowp-border-solid asowp-border-[#c9cccf] asowp-rounded-md asowp-text-[#303030] asowp-text-[12px] asowp-font-bold hover:asowp-bg-[#f7f8fa] asowp-cursor-pointer">
                      <Edit2Icon class="asowp-w-3.5 asowp-h-3.5" />
                      {{ __('Edit', 'all-signs-options-pro') }}
                    </button>
                    <button @click="selectMaterialSize(key, sz, true)" class="asowp-inline-flex asowp-items-center asowp-gap-1 asowp-bg-transparent asowp-border-none asowp-text-[#8e1f0b] asowp-text-[12px] asowp-font-bold hover:asowp-text-[#641707] asowp-cursor-pointer">
                      <Trash2Icon class="asowp-w-3.5 asowp-h-3.5" />
                      {{ __('Delete', 'all-signs-options-pro') }}
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="asowp-sizes-card asowp-size-settings-card asowp-bg-white asowp-rounded-xl asowp-border asowp-border-solid asowp-border-[#dfe3e8] asowp-p-5">
        <h3 class="asowp-text-[14px] asowp-font-[900] asowp-text-[#303030] asowp-mt-0 asowp-mb-4">{{ __('Size Settings', 'all-signs-options-pro') }}</h3>
        <p class="asowp-text-[12px] asowp-leading-5 asowp-text-[#6b7280] asowp-mb-4">{{ __('Configure how the size option is presented in the customizer.', 'all-signs-options-pro') }}</p>

        <div class="asowp-space-y-3">
          <div>
            <label class="asowp-block asowp-text-[12px] asowp-text-[#303030] asowp-mb-1">{{ __('Title', 'all-signs-options-pro') }}</label>
            <input type="text" v-model="sizes.settings.title" class="asowp-box-border asowp-w-full asowp-h-9 asowp-px-3 asowp-rounded-lg asowp-border asowp-border-solid asowp-border-[#8c9196] asowp-text-[13px] asowp-outline-none focus:asowp-border-[#008060]" />
          </div>
          <div>
            <label class="asowp-block asowp-text-[12px] asowp-text-[#303030] asowp-mb-1">{{ __('Description', 'all-signs-options-pro') }}</label>
            <input type="text" v-model="sizes.settings.description" class="asowp-box-border asowp-w-full asowp-h-9 asowp-px-3 asowp-rounded-lg asowp-border asowp-border-solid asowp-border-[#8c9196] asowp-text-[13px] asowp-outline-none focus:asowp-border-[#008060]" />
          </div>

        </div>

        <div class="asowp-size-setting-toggles asowp-mt-5 asowp-border-t asowp-border-solid asowp-border-[#eceff2]">
          <section class="asowp-settings-section">
          <div class="asowp-flex asowp-items-start asowp-justify-between asowp-gap-4">
            <div>
              <h4 class="asowp-text-[13px] asowp-font-[900] asowp-text-[#303030] asowp-m-0">{{ __('Thickness', 'all-signs-options-pro') }}</h4>
              <p class="asowp-text-[12px] asowp-leading-4 asowp-text-[#6b7280] asowp-m-0">{{ __('Enable thickness choices for this configuration.', 'all-signs-options-pro') }}</p>
            </div>
            <div
              @click="sizes.thickness.active = !sizes.thickness.active"
              :class="[
                'asowp-w-9 asowp-h-5 asowp-rounded-full asowp-relative asowp-cursor-pointer asowp-transition-colors asowp-shrink-0 asowp-mt-1',
                sizes.thickness.active ? 'asowp-bg-[#007a72]' : 'asowp-bg-[#d9dee8]'
              ]"
            >
              <div :class="['asowp-absolute asowp-top-0.5 asowp-w-4 asowp-h-4 asowp-rounded-full asowp-bg-white asowp-shadow asowp-transition-all', sizes.thickness.active ? 'asowp-right-0.5' : 'asowp-left-0.5']"></div>
            </div>
          </div>

          <div v-if="sizes.thickness.active" class="asowp-mt-4 asowp-space-y-3">
            <div
              v-for="(thick, key) in sizes.thickness.items"
              :key="key"
              class="asowp-thickness-card asowp-rounded-xl asowp-border asowp-border-solid asowp-border-[#dfe3e8] asowp-bg-white asowp-p-4"
            >
              <div class="asowp-flex asowp-items-center asowp-justify-between asowp-mb-4">
                <h5 class="asowp-text-[13px] asowp-leading-5 asowp-font-[900] asowp-text-[#303030] asowp-m-0">{{ sprintf(__('Thickness %s', 'all-signs-options-pro'), key + 1) }}</h5>
                <button
                  @click="handleDeleteThickness(key)"
                  class="asowp-px-3 asowp-py-1.5 asowp-bg-white asowp-border asowp-border-solid asowp-border-[#c9cccf] asowp-rounded-md asowp-text-[12px] asowp-leading-4 asowp-font-[900] asowp-text-[#8e1f0b] asowp-cursor-pointer hover:asowp-bg-[#f6f6f7]"
                >
                  {{ __('Remove', 'all-signs-options-pro') }}
                </button>
              </div>
              <div class="asowp-setting-grid asowp-grid lg:asowp-grid-cols-3 asowp-gap-4">
                <div>
                  <label>{{ __('Label', 'all-signs-options-pro') }}</label>
                  <input type="text" v-model="thick.label">
                </div>
                <div>
                  <label>{{ __('Value', 'all-signs-options-pro') }}</label>
                  <input type="number" v-model.number="thick.value" @input="syncThicknessValue(key)">
                </div>
                <div>
                  <label>{{ __('Pricing type', 'all-signs-options-pro') }}</label>
                  <select v-model="thick.pricingType" @change="syncThicknessPricing(key)">
                    <option value="additional">{{ __('Additional price', 'all-signs-options-pro') }}</option>
                    <option value="multiplier">{{ __('Multiplier', 'all-signs-options-pro') }}</option>
                  </select>
                </div>
                <div>
                  <label>{{ thick.pricingType === 'multiplier' ? __('Multiplier', 'all-signs-options-pro') : __('Additional price', 'all-signs-options-pro') }}</label>
                  <input
                    type="number"
                    :step="thick.pricingType === 'multiplier' ? '0.01' : '1'"
                    v-model.number="thick.pricingValue"
                    @input="syncThicknessPricing(key)"
                  >
                </div>
              </div>
            </div>
            <button @click="handleAddNewThickness" class="asowp-h-8 asowp-px-3 asowp-bg-white asowp-border asowp-border-solid asowp-border-[#c9cccf] asowp-rounded-md asowp-text-[12px] asowp-leading-4 asowp-font-[900] asowp-cursor-pointer hover:asowp-bg-[#f6f6f7]">
              {{ __('Add thickness', 'all-signs-options-pro') }}
              </button>
            </div>
          </section>

          <section class="asowp-settings-section asowp-custom-size-section asowp-border-t asowp-border-solid asowp-border-[#eceff2]">
          <div class="asowp-flex asowp-items-start asowp-justify-between asowp-gap-4">
            <div>
              <h4 class="asowp-text-[13px] asowp-font-[900] asowp-text-[#303030] asowp-m-0">{{ __('Custom Size', 'all-signs-options-pro') }}</h4>
              <p class="asowp-text-[12px] asowp-leading-4 asowp-text-[#6b7280] asowp-m-0">{{ __('Enable custom width and height entry with allowed limits.', 'all-signs-options-pro') }}</p>
            </div>
            <div
              @click="changeCustomSizeActive"
              :class="[
                'asowp-w-9 asowp-h-5 asowp-rounded-full asowp-relative asowp-cursor-pointer asowp-transition-colors asowp-shrink-0 asowp-mt-1',
                sizes.customSize.active ? 'asowp-bg-[#007a72]' : 'asowp-bg-[#d9dee8]'
              ]"
            >
              <div :class="['asowp-absolute asowp-top-0.5 asowp-w-4 asowp-h-4 asowp-rounded-full asowp-bg-white asowp-shadow asowp-transition-all', sizes.customSize.active ? 'asowp-right-0.5' : 'asowp-left-0.5']"></div>
            </div>
          </div>

          <div v-if="sizes.customSize.active" class="asowp-mt-4 asowp-space-y-4">
            <div class="asowp-flex asowp-items-start asowp-justify-between asowp-gap-4">
              <div>
                <h4 class="asowp-text-[13px] asowp-font-[900] asowp-text-[#303030] asowp-m-0">{{ __('Predefined Sizes Visibility', 'all-signs-options-pro') }}</h4>
                <p class="asowp-text-[12px] asowp-leading-4 asowp-text-[#6b7280] asowp-m-0">{{ __('Choose whether predefined sizes stay visible in the configurator when custom size is enabled.', 'all-signs-options-pro') }}</p>
              </div>
              <div
                @click="sizes.customSize.showPredefinedSizes = !sizes.customSize.showPredefinedSizes"
                :class="[
                  'asowp-w-9 asowp-h-5 asowp-rounded-full asowp-relative asowp-cursor-pointer asowp-transition-colors asowp-shrink-0 asowp-mt-1',
                  sizes.customSize.showPredefinedSizes ? 'asowp-bg-[#007a72]' : 'asowp-bg-[#d9dee8]'
                ]"
              >
                <div :class="['asowp-absolute asowp-top-0.5 asowp-w-4 asowp-h-4 asowp-rounded-full asowp-bg-white asowp-shadow asowp-transition-all', sizes.customSize.showPredefinedSizes ? 'asowp-right-0.5' : 'asowp-left-0.5']"></div>
              </div>
            </div>

            <div class="asowp-setting-grid asowp-grid lg:asowp-grid-cols-3 asowp-gap-4">
              <div>
                <label>{{ __('Width label', 'all-signs-options-pro') }}</label>
                <input type="text" v-model="sizes.customSize.width.label">
              </div>
              <div>
                <label>{{ __('Width min', 'all-signs-options-pro') }}</label>
                <input type="number" v-model="sizes.customSize.width.min">
              </div>
              <div>
                <label>{{ __('Width max', 'all-signs-options-pro') }}</label>
                <input type="number" v-model="sizes.customSize.width.max">
              </div>
              <div>
                <label>{{ __('Height label', 'all-signs-options-pro') }}</label>
                <input type="text" v-model="sizes.customSize.height.label">
              </div>
              <div>
                <label>{{ __('Height min', 'all-signs-options-pro') }}</label>
                <input type="number" v-model="sizes.customSize.height.min">
              </div>
              <div>
                <label>{{ __('Height max', 'all-signs-options-pro') }}</label>
                <input type="number" v-model="sizes.customSize.height.max">
              </div>
            </div>
          </div>
          </section>

        <div v-if="false && sizes.customSize.active" class="asowp-mt-5 asowp-space-y-6">
        <!-- Range Inputs -->
        <div class="asowp-grid md:asowp-grid-cols-2 asowp-gap-8">
          <!-- Width Settings -->
          <div class="asowp-space-y-4">
            <h4 class="asowp-text-[14px] asowp-font-bold asowp-text-[#1a1a1a]">{{ __('Width settings', 'all-signs-options-pro') }}</h4>
            <div class="asowp-grid asowp-grid-cols-2 asowp-gap-4">
              <div class="asowp-space-y-1.5">
                <label class="asowp-text-[12px] asowp-font-bold asowp-text-[#616161]">{{ __('Min width (mm)', 'all-signs-options-pro') }}</label>
                <input type="number" v-model="sizes.customSize.width.min" class="asowp-w-full asowp-px-3 asowp-py-2 asowp-rounded-xl asowp-border asowp-border-solid asowp-border-[#c1c4c7] focus:asowp-border-[#006e52] asowp-outline-none">
              </div>
              <div class="asowp-space-y-1.5">
                <label class="asowp-text-[12px] asowp-font-bold asowp-text-[#616161]">{{ __('Max width (mm)', 'all-signs-options-pro') }}</label>
                <input type="number" v-model="sizes.customSize.width.max" class="asowp-w-full asowp-px-3 asowp-py-2 asowp-rounded-xl asowp-border asowp-border-solid asowp-border-[#c1c4c7] focus:asowp-border-[#006e52] asowp-outline-none">
              </div>
            </div>
          </div>
          <!-- Height Settings -->
          <div class="asowp-space-y-4">
            <h4 class="asowp-text-[14px] asowp-font-bold asowp-text-[#1a1a1a]">{{ __('Height settings', 'all-signs-options-pro') }}</h4>
            <div class="asowp-grid asowp-grid-cols-2 asowp-gap-4">
              <div class="asowp-space-y-1.5">
                <label class="asowp-text-[12px] asowp-font-bold asowp-text-[#616161]">{{ __('Min height (mm)', 'all-signs-options-pro') }}</label>
                <input type="number" v-model="sizes.customSize.height.min" class="asowp-w-full asowp-px-3 asowp-py-2 asowp-rounded-xl asowp-border asowp-border-solid asowp-border-[#c1c4c7] focus:asowp-border-[#006e52] asowp-outline-none">
              </div>
              <div class="asowp-space-y-1.5">
                <label class="asowp-text-[12px] asowp-font-bold asowp-text-[#616161]">{{ __('Max height (mm)', 'all-signs-options-pro') }}</label>
                <input type="number" v-model="sizes.customSize.height.max" class="asowp-w-full asowp-px-3 asowp-py-2 asowp-rounded-xl asowp-border asowp-border-solid asowp-border-[#c1c4c7] focus:asowp-border-[#006e52] asowp-outline-none">
              </div>
            </div>
          </div>
        </div>

        <!-- Pricing Rules -->
        <div class="asowp-pt-6 asowp-border-t asowp-border-solid asowp-border-[#f1f1f1]">
          <div class="asowp-flex asowp-items-center asowp-justify-between asowp-mb-4">
            <h4 class="asowp-text-[14px] asowp-font-bold asowp-text-[#1a1a1a]">{{ __('Pricing rules', 'all-signs-options-pro') }}</h4>
            <div class="asowp-flex asowp-bg-[#f1f1f1] asowp-p-1 asowp-rounded-lg">
              <button
                @click="changePricingType('unit')"
                :class="['asowp-px-3 asowp-py-1 asowp-text-[12px] asowp-font-bold asowp-rounded-md asowp-transition-all asowp-border-none asowp-cursor-pointer', sizes.customSize.pricings.type === 'unit' ? 'asowp-bg-white asowp-text-[#006e52] asowp-shadow-sm' : 'asowp-bg-transparent asowp-text-[#616161]']"
              >
                {{ __('Per surface', 'all-signs-options-pro') }}
              </button>
              <button
                @click="changePricingType('range')"
                :class="['asowp-px-3 asowp-py-1 asowp-text-[12px] asowp-font-bold asowp-rounded-md asowp-transition-all asowp-border-none asowp-cursor-pointer', sizes.customSize.pricings.type === 'range' ? 'asowp-bg-white asowp-text-[#006e52] asowp-shadow-sm' : 'asowp-bg-transparent asowp-text-[#616161]']"
              >
                {{ __('Per range', 'all-signs-options-pro') }}
              </button>
            </div>
          </div>

          <!-- Range Pricing List -->
          <div v-if="sizes.customSize.pricings.type === 'range'" class="asowp-space-y-4">
            <div v-for="(p, k) in sizes.customSize.pricings.range" :key="k" class="asowp-grid asowp-grid-cols-[1fr_1fr_1fr_40px] asowp-gap-4 asowp-items-end">
              <div class="asowp-space-y-1.5">
                <label class="asowp-text-[11px] asowp-font-bold asowp-text-[#616161]">{{ __('Surface max (mm²)', 'all-signs-options-pro') }}</label>
                <input type="number" v-model="p.surface" class="asowp-w-full asowp-px-3 asowp-py-2 asowp-rounded-xl asowp-border asowp-border-solid asowp-border-[#c1c4c7] asowp-outline-none">
              </div>
              <div class="asowp-space-y-1.5">
                <label class="asowp-text-[11px] asowp-font-bold asowp-text-[#616161]">{{ __('Base Price', 'all-signs-options-pro') }}</label>
                <input type="number" v-model="p.basePrice" class="asowp-w-full asowp-px-3 asowp-py-2 asowp-rounded-xl asowp-border asowp-border-solid asowp-border-[#c1c4c7] asowp-outline-none">
              </div>
              <div class="asowp-space-y-1.5">
                <label class="asowp-text-[11px] asowp-font-bold asowp-text-[#616161]">{{ __('Char Price', 'all-signs-options-pro') }}</label>
                <input type="number" v-model="p.charPrice" class="asowp-w-full asowp-px-3 asowp-py-2 asowp-rounded-xl asowp-border asowp-border-solid asowp-border-[#c1c4c7] asowp-outline-none">
              </div>
              <button @click="handleDeletePricing(k)" class="asowp-mb-1 asowp-w-9 asowp-h-9 asowp-rounded-lg asowp-bg-white asowp-border asowp-border-solid asowp-border-[#e1e3e5] asowp-text-[#8e1f0b] asowp-flex asowp-items-center asowp-justify-center asowp-cursor-pointer hover:asowp-bg-[#fff1f0]">
                <Trash2Icon class="asowp-w-4 asowp-h-4" />
              </button>
            </div>
            <button @click="handleAddNewPricing" class="asowp-px-4 asowp-py-2 asowp-bg-white asowp-border asowp-border-solid asowp-border-[#c1c4c7] asowp-rounded-xl asowp-text-[13px] asowp-font-bold asowp-cursor-pointer hover:asowp-bg-[#f9fafb]">
              {{ __('Add range pricing', 'all-signs-options-pro') }}
            </button>
          </div>

          <!-- Unit Pricing -->
          <div v-else class="asowp-grid asowp-grid-cols-3 asowp-gap-4">
             <div class="asowp-space-y-1.5">
                <label class="asowp-text-[11px] asowp-font-bold asowp-text-[#616161]">{{ __('Base Surface (mm²)', 'all-signs-options-pro') }}</label>
                <input type="number" v-model="sizes.customSize.pricings.unit.surface" class="asowp-w-full asowp-px-3 asowp-py-2 asowp-rounded-xl asowp-border asowp-border-solid asowp-border-[#c1c4c7] asowp-outline-none">
              </div>
              <div class="asowp-space-y-1.5">
                <label class="asowp-text-[11px] asowp-font-bold asowp-text-[#616161]">{{ __('Price', 'all-signs-options-pro') }}</label>
                <input type="number" v-model="sizes.customSize.pricings.unit.basePrice" class="asowp-w-full asowp-px-3 asowp-py-2 asowp-rounded-xl asowp-border asowp-border-solid asowp-border-[#c1c4c7] asowp-outline-none">
              </div>
              <div class="asowp-space-y-1.5">
                <label class="asowp-text-[11px] asowp-font-bold asowp-text-[#616161]">{{ __('Char Price', 'all-signs-options-pro') }}</label>
                <input type="number" v-model="sizes.customSize.pricings.unit.charPrice" class="asowp-w-full asowp-px-3 asowp-py-2 asowp-rounded-xl asowp-border asowp-border-solid asowp-border-[#c1c4c7] asowp-outline-none">
              </div>
          </div>
        </div>
      </div>
    </div>
        </div>

    </template>

    <!-- Add/Edit Size Form -->
    <div v-if="isNewSize" class="asowp-size-editor asowp-bg-white asowp-rounded-xl asowp-border asowp-border-solid asowp-border-[#d1d5db] asowp-shadow-sm asowp-p-8">
      <div class="asowp-flex asowp-justify-end asowp-mb-7">
        <button
          @click="back"
          class="asowp-px-4 asowp-py-2 asowp-bg-white asowp-border asowp-border-solid asowp-border-[#c1c4c7] asowp-rounded-lg asowp-text-[14px] asowp-leading-5 asowp-font-[700] asowp-text-[#303030] asowp-cursor-pointer hover:asowp-bg-[#f6f6f7]"
        >
          {{ __('Back to sizes', 'all-signs-options-pro') }}
        </button>
      </div>

      <div class="asowp-space-y-5">
        <div>
          <label class="asowp-block asowp-text-[16px] asowp-leading-6 asowp-font-normal asowp-text-[#303030] asowp-mb-2">{{ __('Label', 'all-signs-options-pro') }}</label>
          <input type="text" v-model.trim="size.label" class="asowp-box-border asowp-w-full asowp-h-[50px] asowp-px-4 asowp-rounded-lg asowp-border asowp-border-solid asowp-border-[#8c9196] asowp-text-[16px] asowp-text-[#303030] asowp-outline-none focus:asowp-border-[#008060]">
          <p class="asowp-text-[16px] asowp-leading-6 asowp-text-[#6b7280] asowp-mt-2 asowp-mb-0">{{ __('Internal and customer-facing name for this size.', 'all-signs-options-pro') }}</p>
        </div>

        <div class="asowp-grid md:asowp-grid-cols-2 asowp-gap-5">
          <div>
            <label class="asowp-block asowp-text-[16px] asowp-leading-6 asowp-font-normal asowp-text-[#303030] asowp-mb-2">{{ __('Width', 'all-signs-options-pro') }}</label>
            <input type="number" v-model="size.width" class="asowp-box-border asowp-w-full asowp-h-[50px] asowp-px-4 asowp-rounded-lg asowp-border asowp-border-solid asowp-border-[#8c9196] asowp-text-[16px] asowp-text-[#303030] asowp-outline-none focus:asowp-border-[#008060]">
          </div>
          <div>
            <label class="asowp-block asowp-text-[16px] asowp-leading-6 asowp-font-normal asowp-text-[#303030] asowp-mb-2">{{ __('Height', 'all-signs-options-pro') }}</label>
            <input type="number" v-model="size.height" class="asowp-box-border asowp-w-full asowp-h-[50px] asowp-px-4 asowp-rounded-lg asowp-border asowp-border-solid asowp-border-[#8c9196] asowp-text-[16px] asowp-text-[#303030] asowp-outline-none focus:asowp-border-[#008060]">
          </div>
        </div>

        <div class="asowp-grid md:asowp-grid-cols-2 asowp-gap-5">
          <div>
            <label class="asowp-block asowp-text-[16px] asowp-leading-6 asowp-font-normal asowp-text-[#303030] asowp-mb-2">{{ __('Number of text lines', 'all-signs-options-pro') }}</label>
            <input type="number" v-model="size.textNumber" class="asowp-box-border asowp-w-full asowp-h-[50px] asowp-px-4 asowp-rounded-lg asowp-border asowp-border-solid asowp-border-[#8c9196] asowp-text-[16px] asowp-text-[#303030] asowp-outline-none focus:asowp-border-[#008060]">
          </div>
          <div>
            <label class="asowp-block asowp-text-[16px] asowp-leading-6 asowp-font-normal asowp-text-[#303030] asowp-mb-2">{{ __('Max text chars', 'all-signs-options-pro') }}</label>
            <input type="number" v-model="size.maxTextChar" class="asowp-box-border asowp-w-full asowp-h-[50px] asowp-px-4 asowp-rounded-lg asowp-border asowp-border-solid asowp-border-[#8c9196] asowp-text-[16px] asowp-text-[#303030] asowp-outline-none focus:asowp-border-[#008060]">
          </div>
        </div>
      </div>

      <div class="asowp-size-editor-actions asowp-mt-5 asowp-pt-5 asowp-border-t asowp-border-solid asowp-border-[#dfe3e8] asowp-flex asowp-justify-end asowp-gap-3">
        <button @click="back" class="asowp-px-5 asowp-py-2 asowp-bg-white asowp-border asowp-border-solid asowp-border-[#c1c4c7] asowp-rounded-lg asowp-text-[14px] asowp-font-[700] asowp-text-[#111827] asowp-cursor-pointer hover:asowp-bg-[#f6f6f7]">{{ __('Cancel', 'all-signs-options-pro') }}</button>
        <button
          @click="isEdit ? updateSizeInMaterialSize() : addMaterialSize()"
          :disabled="!canSaveSize || isLoading"
          class="asowp-primary-button asowp-px-5 asowp-py-2 asowp-bg-[#007a72] asowp-text-white asowp-border-none asowp-rounded-lg asowp-text-[14px] asowp-font-[900] asowp-cursor-pointer hover:asowp-bg-[#00645f] disabled:asowp-bg-[#d8d8d8] disabled:asowp-cursor-not-allowed"
        >
          {{ isLoading ? __('Saving...', 'all-signs-options-pro') : (isEdit ? __('Update size', 'all-signs-options-pro') : __('Save size', 'all-signs-options-pro')) }}
        </button>
      </div>
    </div>

    <!-- Save Page Changes (Sticky Footer) -->
    <div v-if="!isNewSize" class="asowp-flex asowp-justify-end asowp-mt-[-52px] asowp-mr-5">
      <button
        @click="updateMaterialSize"
        :disabled="isLoading"
        class="asowp-px-3 asowp-py-1.5 asowp-bg-[#007a72] asowp-text-white asowp-text-[12px] asowp-font-[900] asowp-border-none asowp-rounded-md asowp-cursor-pointer hover:asowp-bg-[#00645f] disabled:asowp-opacity-50"
      >
        {{ isLoading ? __('Saving...', 'all-signs-options-pro') : __('Save settings', 'all-signs-options-pro') }}
      </button>
    </div>

    <!-- Delete Modal -->
    <div v-if="openModal" class="asowp-fixed asowp-inset-0 asowp-z-[20000] asowp-flex asowp-items-center asowp-justify-center">
      <div class="asowp-absolute asowp-inset-0 asowp-bg-black/40" @click="closeModal"></div>
      <div class="asowp-relative asowp-w-[min(400px,95vw)] asowp-bg-white asowp-rounded-2xl asowp-shadow-2xl asowp-p-6 asowp-text-center">
        <div class="asowp-w-14 asowp-h-14 asowp-bg-[#fff1f0] asowp-text-[#8e1f0b] asowp-rounded-full asowp-flex asowp-items-center asowp-justify-center asowp-mx-auto asowp-mb-4">
          <Trash2Icon class="asowp-w-7 asowp-h-7" />
        </div>
        <h3 class="asowp-text-[18px] asowp-font-bold asowp-text-[#1a1a1a] asowp-mb-2">{{ __('Delete size?', 'all-signs-options-pro') }}</h3>
        <p class="asowp-text-[14px] asowp-text-[#616161] asowp-mb-6">{{ sprintf(__('Are you sure you want to delete "%s"?', 'all-signs-options-pro'), size.label) }}</p>
        <div class="asowp-flex asowp-gap-3">
          <button @click="closeModal" class="asowp-flex-1 asowp-py-2 asowp-bg-white asowp-border asowp-border-solid asowp-border-[#c1c4c7] asowp-rounded-xl asowp-text-[13px] asowp-font-bold asowp-cursor-pointer">{{ __('Cancel', 'all-signs-options-pro') }}</button>
          <button @click="deleteMaterialSize" class="asowp-flex-1 asowp-py-2 asowp-bg-[#8e1f0b] asowp-text-white asowp-border-none asowp-rounded-xl asowp-text-[13px] asowp-font-bold asowp-cursor-pointer">{{ __('Delete', 'all-signs-options-pro') }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import api from "@/admin/Api/api";
import { computed, ref, onMounted } from "vue";
import { useRoute } from 'vue-router';
import toastMessage from "@/admin/utils/functions";
import {
  PlusIcon,
  Edit2Icon,
  Trash2Icon,
  Loader2Icon,
  GripVerticalIcon
} from 'lucide-vue-next';
import { __, sprintf } from "@wordpress/i18n";

const route = useRoute();
const configID = ref(route.params.configId);
const materialId = ref(route.params.materialId);

const isFetching = ref(false);
const isNewSize = ref(false);
const isLoading = ref(false);
const isEdit = ref(false);
const openModal = ref(false);
const sizeId = ref(null);
const draggedSizeIndex = ref(null);

const sizes = ref({
  settings: { title: 'Sizes', description: '' },
  customSize: { active: false, showPredefinedSizes: true, width: { label: 'Width', min: 0, max: 0 }, height: { label: 'Height', min: 0, max: 0 }, pricings: { type: "unit", unit: { basePrice: 0, surface: 0, charPrice: 0 }, range: [] } },
  thickness: { active: false, values: [], items: [] },
  allSizes: []
});

const size = ref({ isDefault: false, label: "", width: 0, height: 0, startPriceAtChar: 1, textNumber: 0, maxTextChar: -1, charPrice: 0, basePrice: 0 });
const canSaveSize = computed(() => size.value.label.trim().length > 0);

const normalizeThicknessPricingType = (type) => {
  if (type === 'multiplier') {
    return 'multiplier';
  }
  return 'additional';
};

const toThicknessItem = (item, key) => {
  if (item && typeof item === 'object') {
    const value = Number(item.value ?? item.thickness ?? item.amount ?? 0);
    const pricingType = normalizeThicknessPricingType(item.pricingType ?? item.priceType);
    const pricingValue = pricingType === 'multiplier'
      ? Number(item.multiplier ?? item.pricingValue ?? item.price ?? 1)
      : Number(item.additionalPrice ?? item.pricingValue ?? item.price ?? 0);

    return {
      label: item.label ?? '',
      value,
      pricingType,
      pricingValue,
      additionalPrice: pricingType === 'additional' ? pricingValue : Number(item.additionalPrice ?? 0),
      multiplier: pricingType === 'multiplier' ? pricingValue : Number(item.multiplier ?? 1),
    };
  }

  return {
    label: '',
    value: Number(item ?? 0),
    pricingType: 'additional',
    pricingValue: 0,
    additionalPrice: 0,
    multiplier: 1,
  };
};

const toThicknessPayload = (item) => {
  const normalized = toThicknessItem(item);
  const pricingValue = Number(normalized.pricingValue ?? 0);

  return {
    label: normalized.label ?? '',
    value: Number(normalized.value ?? 0),
    pricingType: normalized.pricingType,
    additionalPrice: normalized.pricingType === 'additional' ? pricingValue : Number(normalized.additionalPrice ?? 0),
    multiplier: normalized.pricingType === 'multiplier' ? pricingValue : Number(normalized.multiplier ?? 1),
  };
};

const syncThicknessValues = () => {
  sizes.value.thickness.values = (sizes.value.thickness.items || []).map(toThicknessPayload);
};

const syncThicknessValue = (key) => {
  if (!Array.isArray(sizes.value.thickness.values)) {
    sizes.value.thickness.values = [];
  }
  sizes.value.thickness.values[key] = toThicknessPayload(sizes.value.thickness.items[key]);
};

const syncThicknessPricing = (key) => {
  const item = sizes.value.thickness.items[key];
  if (!item) {
    return;
  }

  item.pricingType = normalizeThicknessPricingType(item.pricingType);
  item.additionalPrice = item.pricingType === 'additional' ? Number(item.pricingValue ?? 0) : Number(item.additionalPrice ?? 0);
  item.multiplier = item.pricingType === 'multiplier' ? Number(item.pricingValue ?? 1) : Number(item.multiplier ?? 1);
  syncThicknessValue(key);
};

const ensureDefaultSize = () => {
  if (!Array.isArray(sizes.value.allSizes) || sizes.value.allSizes.length === 0) {
    return;
  }

  const defaultIndex = sizes.value.allSizes.findIndex((item) => item.isDefault);
  const selectedIndex = defaultIndex >= 0 ? defaultIndex : 0;
  sizes.value.allSizes.forEach((item, index) => {
    item.isDefault = index === selectedIndex;
  });
};

const getSizesPayload = () => {
  ensureDefaultSize();
  syncThicknessValues();

  const payload = JSON.parse(JSON.stringify(sizes.value));
  delete payload.__asowpSizeSettingsInitialized;

  if (payload.thickness) {
    delete payload.thickness.items;
    payload.thickness.active = typeof payload.thickness.active === 'boolean' ? payload.thickness.active : false;
    payload.thickness.values = Array.isArray(payload.thickness.values) ? payload.thickness.values : [];
  }

  if (payload.customSize) {
    payload.customSize.active = typeof payload.customSize.active === 'boolean' ? payload.customSize.active : false;
  }

  return payload;
};

const normalizeSizes = () => {
  if (!sizes.value.settings) {
    sizes.value.settings = { title: 'Sizes', description: '' };
  }
  if (!sizes.value.customSize) {
    sizes.value.customSize = { active: false, showPredefinedSizes: true, width: { label: 'Width', min: 0, max: 0 }, height: { label: 'Height', min: 0, max: 0 }, pricings: { type: "unit", unit: { basePrice: 0, surface: 0, charPrice: 0 }, range: [] } };
  }
  if (typeof sizes.value.customSize.active !== 'boolean') {
    sizes.value.customSize.active = false;
  }
  if (typeof sizes.value.customSize.showPredefinedSizes !== 'boolean') {
    sizes.value.customSize.showPredefinedSizes = true;
  }
  if (!sizes.value.thickness) {
    sizes.value.thickness = { active: false, values: [], items: [] };
  }
  if (typeof sizes.value.thickness.active !== 'boolean') {
    sizes.value.thickness.active = false;
  }
  if (!Array.isArray(sizes.value.thickness.values)) {
    sizes.value.thickness.values = [];
  }
  if (!Array.isArray(sizes.value.thickness.items)) {
    sizes.value.thickness.items = sizes.value.thickness.values.map(toThicknessItem);
  } else {
    sizes.value.thickness.items = sizes.value.thickness.items.map((item, key) => {
      const fallback = sizes.value.thickness.values[key];
      return toThicknessItem(item ?? fallback, key);
    });
  }
  syncThicknessValues();
  if (!Array.isArray(sizes.value.allSizes)) {
    sizes.value.allSizes = [];
  }
  ensureDefaultSize();
};

const fetchMaterialSizes = async () => {
  isFetching.value = true;
  try {
    const result = await api.getMaterialSimpleSizes(configID.value, materialId.value);
    if (result?.materialSizes) {
      sizes.value = result.materialSizes;
      normalizeSizes();
      if (!sizes.value.customSize.pricings) {
        sizes.value.customSize.pricings = { type: "unit", unit: { basePrice: 0, surface: 0, charPrice: 0 }, range: [] };
      }
    }
  } finally { isFetching.value = false; }
};

const updateMaterialSize = async () => {
  isLoading.value = true;
  try {
    const res = await api.updateMaterialSimpleSizes(configID.value, materialId.value, getSizesPayload());
    if (res.success) {
      toastMessage(res.message);
      isNewSize.value = false;
      openModal.value = false;
      await fetchMaterialSizes();
    }
  } finally { isLoading.value = false; }
};

const addMaterialSize = async () => {
  if (size.value.label.trim()) {
    const hasDefault = sizes.value.allSizes.some((item) => item.isDefault);
    sizes.value.allSizes.push({ ...size.value, isDefault: !hasDefault });
    await updateMaterialSize();
  }
};

const updateSizeInMaterialSize = async () => {
  if (size.value.label.trim()) {
    sizes.value.allSizes[sizeId.value] = { ...size.value };
    await updateMaterialSize();
  }
};

const deleteMaterialSize = async () => {
  sizes.value.allSizes.splice(sizeId.value, 1);
  ensureDefaultSize();
  await updateMaterialSize();
};

const selectMaterialSize = (id, sz, isDeleting = false) => {
  sizeId.value = id;
  size.value = { ...sz };
  if (isDeleting) openModal.value = true;
  else { isEdit.value = true; isNewSize.value = true; }
};

const selectDefault = (key) => {
  sizes.value.allSizes.forEach((s, i) => s.isDefault = i === key);
  updateMaterialSize();
};

const dragStart = (key) => {
  draggedSizeIndex.value = key;
};

const dropSize = (targetIndex) => {
  if (draggedSizeIndex.value === null || draggedSizeIndex.value === targetIndex) return;
  const [moved] = sizes.value.allSizes.splice(draggedSizeIndex.value, 1);
  sizes.value.allSizes.splice(targetIndex, 0, moved);
  draggedSizeIndex.value = null;
  ensureDefaultSize();
  updateMaterialSize();
};

const newSize = () => {
  isNewSize.value = true;
  isEdit.value = false;
  size.value = { isDefault: false, label: "", width: 100, height: 50, startPriceAtChar: 1, textNumber: -1, maxTextChar: -1, charPrice: 0, basePrice: 0 };
};
const back = () => { isNewSize.value = false; isEdit.value = false; };
const closeModal = () => openModal.value = false;
const changeCustomSizeActive = () => sizes.value.customSize.active = !sizes.value.customSize.active;
const changePricingType = (t) => sizes.value.customSize.pricings.type = t;
const handleAddNewThickness = () => {
  if (!Array.isArray(sizes.value.thickness.items)) {
    sizes.value.thickness.items = [];
  }
  sizes.value.thickness.items.push(toThicknessItem(0));
  syncThicknessValues();
};
const handleDeleteThickness = (k) => {
  sizes.value.thickness.items.splice(k, 1);
  syncThicknessValues();
};
const handleAddNewPricing = () => sizes.value.customSize.pricings.range.push({ basePrice: 0, charPrice: 0, surface: 0 });
const handleDeletePricing = (k) => sizes.value.customSize.pricings.range.splice(k, 1);

onMounted(fetchMaterialSizes);
</script>

<style scoped>
.asowp-sizes-page {
  gap: 10px;
}

.asowp-sizes-header,
.asowp-sizes-card,
.asowp-size-editor {
  border-radius: 10px;
  border-color: #dfe3e8;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.04);
}

.asowp-sizes-header {
  min-height: 74px;
  padding: 14px 20px;
}

.asowp-sizes-header h2 {
  font-size: 15px;
  line-height: 20px;
  font-weight: 800;
}

.asowp-sizes-header p {
  font-size: 11px;
  line-height: 14px;
}

.asowp-sizes-header button {
  min-height: 28px;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 11px;
  line-height: 14px;
}

.asowp-sizes-header button svg {
  width: 13px;
  height: 13px;
}

.asowp-sizes-card {
  padding: 18px 20px;
}

.asowp-sizes-card h3 {
  font-size: 13px;
  line-height: 18px;
  font-weight: 800;
  margin-bottom: 12px;
}

.asowp-sizes-card thead th {
  padding: 8px 12px;
  font-size: 11px;
  line-height: 14px;
  font-weight: 700;
}

.asowp-sizes-card tbody td {
  padding: 8px 12px;
  font-size: 12px;
  line-height: 18px;
}

.asowp-sizes-card tbody td:nth-child(2) {
  font-weight: 800;
}

.asowp-sizes-card tbody button {
  min-height: 28px;
  padding: 5px 10px;
  border-radius: 6px;
  font-size: 11px;
  line-height: 14px;
}

.asowp-size-settings-card > p {
  font-size: 12px;
  line-height: 18px;
}

.asowp-size-settings-card label {
  font-size: 12px;
  line-height: 16px;
}

.asowp-size-settings-card input {
  height: 34px;
  font-size: 12px;
}

.asowp-settings-section {
  padding: 16px 0;
  border-left: 0 !important;
  border-right: 0 !important;
  border-bottom: 0 !important;
  background: transparent !important;
  box-shadow: none !important;
}

.asowp-settings-section:first-child {
  padding-top: 18px;
}

.asowp-settings-section:last-child {
  padding-bottom: 0;
}

.asowp-custom-size-section {
  border-top: 1px solid #eceff2 !important;
  border-radius: 0 !important;
}

.asowp-thickness-card {
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.03);
}

.asowp-setting-grid label {
  display: block;
  margin-bottom: 6px;
  color: #303030;
  font-size: 12px;
  line-height: 16px;
  font-weight: 400;
}

.asowp-setting-grid input,
.asowp-setting-grid select {
  box-sizing: border-box;
  width: 100%;
  height: 38px;
  border: 1px solid #8c9196;
  border-radius: 8px;
  background: #ffffff;
  color: #303030;
  font-size: 13px;
  line-height: 18px;
  padding: 0 12px;
  outline: none;
}

.asowp-setting-grid input:focus,
.asowp-setting-grid select:focus {
  border-color: #008060;
}

.asowp-size-editor {
  padding: 26px 28px;
}

.asowp-size-editor label {
  font-size: 13px;
  line-height: 18px;
  margin-bottom: 6px;
}

.asowp-size-editor input {
  height: 38px;
  border-radius: 8px;
  font-size: 13px;
  line-height: 18px;
  padding-left: 12px;
  padding-right: 12px;
}

.asowp-size-editor p {
  font-size: 13px;
  line-height: 18px;
  margin-top: 6px;
}

.asowp-size-editor button {
  min-height: 32px;
  border-radius: 8px;
  font-size: 12px;
  line-height: 16px;
  padding: 7px 14px;
}

.asowp-size-setting-toggles,
.asowp-size-editor-actions {
  border-left: 0 !important;
  border-right: 0 !important;
  border-bottom: 0 !important;
  background: transparent !important;
  box-shadow: none !important;
}

.asowp-size-setting-toggles {
  border-top: 1px solid #eceff2 !important;
}

.asowp-size-editor-actions {
  border-top: 1px solid #dfe3e8 !important;
}
</style>
