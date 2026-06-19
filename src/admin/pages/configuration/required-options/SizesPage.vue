<template>
  <div class="ascwo-sizes-page ascwo-space-y-3">
    <template v-if="!isNewSize">
      <div v-if="isFetching" class="ascwo-bg-white ascwo-rounded-xl ascwo-border ascwo-border-solid ascwo-border-[#dfe3e8] ascwo-p-8 ascwo-flex ascwo-items-center ascwo-justify-center">
        <Loader2Icon class="ascwo-w-7 ascwo-h-7 ascwo-text-[#007a72] ascwo-animate-spin" />
      </div>
      <template v-else>
      <div class="ascwo-sizes-header ascwo-bg-white ascwo-rounded-xl ascwo-border ascwo-border-solid ascwo-border-[#dfe3e8] ascwo-px-5 ascwo-py-4 ascwo-flex ascwo-items-center ascwo-justify-between">
        <div>
          <h2 class="ascwo-text-[16px] ascwo-leading-6 ascwo-font-[900] ascwo-text-[#303030] ascwo-m-0">{{ __('Sizes', 'all-signs-customizer-for-woocommerce-pro') }}</h2>
          <p class="ascwo-text-[12px] ascwo-leading-4 ascwo-text-[#6b7280] ascwo-m-0">{{ __('Create the available sizes and define how many text lines each one allows.', 'all-signs-customizer-for-woocommerce-pro') }}</p>
        </div>
        <button
          @click="newSize"
          class="ascwo-inline-flex ascwo-items-center ascwo-gap-2 ascwo-px-3 ascwo-py-1.5 ascwo-bg-[#007a72] ascwo-text-white ascwo-text-[12px] ascwo-leading-4 ascwo-font-[900] ascwo-border-none ascwo-rounded-md ascwo-cursor-pointer hover:ascwo-bg-[#00645f]"
        >
          <PlusIcon class="ascwo-w-3.5 ascwo-h-3.5" />
          {{ __('Add new size', 'all-signs-customizer-for-woocommerce-pro') }}
        </button>
      </div>

      <div class="ascwo-sizes-card ascwo-bg-white ascwo-rounded-xl ascwo-border ascwo-border-solid ascwo-border-[#dfe3e8] ascwo-p-5">
        <h3 class="ascwo-text-[14px] ascwo-font-[900] ascwo-text-[#303030] ascwo-mt-0 ascwo-mb-3">{{ __('Sizes List', 'all-signs-customizer-for-woocommerce-pro') }}</h3>
        <div class="ascwo-overflow-x-auto">
          <table class="ascwo-w-full ascwo-border-collapse">
            <thead>
              <tr class="ascwo-bg-[#f3f3f3]">
                <th class="ascwo-w-8 ascwo-py-2 ascwo-px-3"></th>
                <th class="ascwo-py-2 ascwo-px-3 ascwo-text-left ascwo-text-[11px] ascwo-font-bold ascwo-text-[#6b7280]">{{ __('Label', 'all-signs-customizer-for-woocommerce-pro') }}</th>
                <th class="ascwo-py-2 ascwo-px-3 ascwo-text-left ascwo-text-[11px] ascwo-font-bold ascwo-text-[#6b7280]">{{ __('Dimensions', 'all-signs-customizer-for-woocommerce-pro') }}</th>
                <th class="ascwo-py-2 ascwo-px-3 ascwo-text-left ascwo-text-[11px] ascwo-font-bold ascwo-text-[#6b7280]">{{ __('Default', 'all-signs-customizer-for-woocommerce-pro') }}</th>
                <th class="ascwo-py-2 ascwo-px-3 ascwo-text-left ascwo-text-[11px] ascwo-font-bold ascwo-text-[#6b7280]">{{ __('Actions', 'all-signs-customizer-for-woocommerce-pro') }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="sizes.items.length === 0">
                <td colspan="5" class="ascwo-p-8 ascwo-text-center ascwo-text-[13px] ascwo-text-[#6b7280]">
                  {{ __('No standard sizes found.', 'all-signs-customizer-for-woocommerce-pro') }}
                </td>
              </tr>
              <tr
                v-for="(sz, key) in sizes.items"
                :key="sz.id || key"
                class="ascwo-border-b ascwo-border-solid ascwo-border-[#eceff2] last:ascwo-border-b-0"
                draggable="true"
                @dragstart="dragStart(key)"
                @dragover.prevent
                @drop="dropSize(key)"
              >
                <td class="ascwo-py-2.5 ascwo-px-3 ascwo-text-[#303030]">
                  <GripVerticalIcon class="ascwo-w-4 ascwo-h-4 ascwo-cursor-grab active:ascwo-cursor-grabbing" />
                </td>
                <td class="ascwo-py-2.5 ascwo-px-3 ascwo-text-[13px] ascwo-font-[900] ascwo-text-[#303030]">{{ sz.label }}</td>
                <td class="ascwo-py-2.5 ascwo-px-3 ascwo-text-[13px] ascwo-text-[#303030]">{{ sz.width }} x {{ sz.height }}</td>
                <td class="ascwo-py-2.5 ascwo-px-3">
                    <div
                    @click="!isLoading && selectDefault(sz.id)"
                    :class="[
                      'ascwo-w-9 ascwo-h-5 ascwo-rounded-full ascwo-relative ascwo-cursor-pointer ascwo-transition-colors',
                      sz.isDefault ? 'ascwo-bg-[#007a72]' : 'ascwo-bg-[#d9dee8]'
                    ]"
                  >
                    <div :class="['ascwo-absolute ascwo-top-0.5 ascwo-w-4 ascwo-h-4 ascwo-rounded-full ascwo-bg-white ascwo-shadow ascwo-transition-all', sz.isDefault ? 'ascwo-right-0.5' : 'ascwo-left-0.5']"></div>
                  </div>
                </td>
                <td class="ascwo-py-2.5 ascwo-px-3">
                  <div class="ascwo-flex ascwo-items-center ascwo-gap-3">
                    <button @click="selectSize(sz.id, sz)" class="ascwo-inline-flex ascwo-items-center ascwo-gap-1 ascwo-px-2 ascwo-py-1 ascwo-bg-white ascwo-border ascwo-border-solid ascwo-border-[#c9cccf] ascwo-rounded-md ascwo-text-[#303030] ascwo-text-[12px] ascwo-font-bold hover:ascwo-bg-[#f7f8fa] ascwo-cursor-pointer">
                      <Edit2Icon class="ascwo-w-3.5 ascwo-h-3.5" />
                      {{ __('Edit', 'all-signs-customizer-for-woocommerce-pro') }}
                    </button>
                    <button @click="selectSize(sz.id, sz, true)" class="ascwo-inline-flex ascwo-items-center ascwo-gap-1 ascwo-bg-transparent ascwo-border-none ascwo-text-[#8e1f0b] ascwo-text-[12px] ascwo-font-bold hover:ascwo-text-[#641707] ascwo-cursor-pointer">
                      <Trash2Icon class="ascwo-w-3.5 ascwo-h-3.5" />
                      {{ __('Delete', 'all-signs-customizer-for-woocommerce-pro') }}
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="ascwo-sizes-card ascwo-size-settings-card ascwo-bg-white ascwo-rounded-xl ascwo-border ascwo-border-solid ascwo-border-[#dfe3e8] ascwo-p-5">
        <h3 class="ascwo-text-[14px] ascwo-font-[900] ascwo-text-[#303030] ascwo-mt-0 ascwo-mb-4">{{ __('Size Settings', 'all-signs-customizer-for-woocommerce-pro') }}</h3>
        <p class="ascwo-text-[12px] ascwo-leading-5 ascwo-text-[#6b7280] ascwo-mb-4">{{ __('Configure how the size option is presented in the customizer.', 'all-signs-customizer-for-woocommerce-pro') }}</p>

        <div class="ascwo-space-y-3">
          <div>
            <label class="ascwo-block ascwo-text-[12px] ascwo-text-[#303030] ascwo-mb-1">{{ __('Title', 'all-signs-customizer-for-woocommerce-pro') }}</label>
            <input type="text" v-model="sizes.settings.title" class="ascwo-box-border ascwo-w-full ascwo-h-9 ascwo-px-3 ascwo-rounded-lg ascwo-border ascwo-border-solid ascwo-border-[#8c9196] ascwo-text-[13px] ascwo-outline-none focus:ascwo-border-[#008060]" />
          </div>
          <div>
            <label class="ascwo-block ascwo-text-[12px] ascwo-text-[#303030] ascwo-mb-1">{{ __('Description', 'all-signs-customizer-for-woocommerce-pro') }}</label>
            <input type="text" v-model="sizes.settings.description" class="ascwo-box-border ascwo-w-full ascwo-h-9 ascwo-px-3 ascwo-rounded-lg ascwo-border ascwo-border-solid ascwo-border-[#8c9196] ascwo-text-[13px] ascwo-outline-none focus:ascwo-border-[#008060]" />
          </div>

        </div>

        <div class="ascwo-size-setting-toggles ascwo-mt-5 ascwo-border-t ascwo-border-solid ascwo-border-[#eceff2]">
          <section class="ascwo-settings-section">
            <div class="ascwo-flex ascwo-items-start ascwo-justify-between ascwo-gap-4">
              <div>
                <h4 class="ascwo-text-[13px] ascwo-font-[900] ascwo-text-[#303030] ascwo-m-0">{{ __('Thickness', 'all-signs-customizer-for-woocommerce-pro') }}</h4>
                <p class="ascwo-text-[12px] ascwo-leading-4 ascwo-text-[#6b7280] ascwo-m-0">{{ __('Enable thickness choices for this configuration.', 'all-signs-customizer-for-woocommerce-pro') }}</p>
              </div>
              <div
                @click="sizes.thickness.active = !sizes.thickness.active"
                :class="[
                  'ascwo-w-9 ascwo-h-5 ascwo-rounded-full ascwo-relative ascwo-cursor-pointer ascwo-transition-colors ascwo-shrink-0 ascwo-mt-1',
                  sizes.thickness.active ? 'ascwo-bg-[#007a72]' : 'ascwo-bg-[#d9dee8]'
                ]"
              >
                <div :class="['ascwo-absolute ascwo-top-0.5 ascwo-w-4 ascwo-h-4 ascwo-rounded-full ascwo-bg-white ascwo-shadow ascwo-transition-all', sizes.thickness.active ? 'ascwo-right-0.5' : 'ascwo-left-0.5']"></div>
              </div>
            </div>

            <div v-if="sizes.thickness.active" class="ascwo-mt-4 ascwo-space-y-3">
              <div
                v-for="(thick, key) in sizes.thickness.items"
                :key="key"
                class="ascwo-thickness-card ascwo-rounded-xl ascwo-border ascwo-border-solid ascwo-border-[#dfe3e8] ascwo-bg-white ascwo-p-4"
              >
                <div class="ascwo-flex ascwo-items-center ascwo-justify-between ascwo-mb-4">
                  <h5 class="ascwo-text-[13px] ascwo-leading-5 ascwo-font-[900] ascwo-text-[#303030] ascwo-m-0">{{ sprintf(__('Thickness %s', 'all-signs-customizer-for-woocommerce-pro'), key + 1) }}</h5>
                  <button
                    @click="handleDeleteThickness(key)"
                    class="ascwo-px-3 ascwo-py-1.5 ascwo-bg-white ascwo-border ascwo-border-solid ascwo-border-[#c9cccf] ascwo-rounded-md ascwo-text-[12px] ascwo-leading-4 ascwo-font-[900] ascwo-text-[#8e1f0b] ascwo-cursor-pointer hover:ascwo-bg-[#f6f6f7]"
                  >
                    {{ __('Remove', 'all-signs-customizer-for-woocommerce-pro') }}
                  </button>
                </div>
                <div class="ascwo-setting-grid ascwo-grid lg:ascwo-grid-cols-3 ascwo-gap-4">
                  <div>
                    <label>{{ __('Label', 'all-signs-customizer-for-woocommerce-pro') }}</label>
                    <input type="text" v-model="thick.label">
                  </div>
                  <div>
                    <label>{{ __('Value', 'all-signs-customizer-for-woocommerce-pro') }}</label>
                    <input type="number" v-model.number="thick.value" @input="syncThicknessValue(key)">
                  </div>
                </div>
              </div>
              <button @click="handleAddNewThickness" class="ascwo-h-8 ascwo-px-3 ascwo-bg-white ascwo-border ascwo-border-solid ascwo-border-[#c9cccf] ascwo-rounded-md ascwo-text-[12px] ascwo-leading-4 ascwo-font-[900] ascwo-cursor-pointer hover:ascwo-bg-[#f6f6f7]">
                {{ __('Add thickness', 'all-signs-customizer-for-woocommerce-pro') }}
              </button>
            </div>
          </section>

          <section class="ascwo-settings-section ascwo-custom-size-section ascwo-border-t ascwo-border-solid ascwo-border-[#eceff2]">
            <div class="ascwo-flex ascwo-items-start ascwo-justify-between ascwo-gap-4">
              <div>
                <h4 class="ascwo-text-[13px] ascwo-font-[900] ascwo-text-[#303030] ascwo-m-0">{{ __('Custom Size', 'all-signs-customizer-for-woocommerce-pro') }}</h4>
                <p class="ascwo-text-[12px] ascwo-leading-4 ascwo-text-[#6b7280] ascwo-m-0">{{ __('Enable custom width and height entry with allowed limits.', 'all-signs-customizer-for-woocommerce-pro') }}</p>
              </div>
              <div
                @click="changeCustomSizeActive"
                :class="[
                  'ascwo-w-9 ascwo-h-5 ascwo-rounded-full ascwo-relative ascwo-cursor-pointer ascwo-transition-colors ascwo-shrink-0 ascwo-mt-1',
                  sizes.customSize.active ? 'ascwo-bg-[#007a72]' : 'ascwo-bg-[#d9dee8]'
                ]"
              >
                <div :class="['ascwo-absolute ascwo-top-0.5 ascwo-w-4 ascwo-h-4 ascwo-rounded-full ascwo-bg-white ascwo-shadow ascwo-transition-all', sizes.customSize.active ? 'ascwo-right-0.5' : 'ascwo-left-0.5']"></div>
              </div>
            </div>

            <div v-if="sizes.customSize.active" class="ascwo-mt-4 ascwo-space-y-4">
              <div class="ascwo-flex ascwo-items-start ascwo-justify-between ascwo-gap-4">
                <div>
                  <h4 class="ascwo-text-[13px] ascwo-font-[900] ascwo-text-[#303030] ascwo-m-0">{{ __('Predefined Sizes Visibility', 'all-signs-customizer-for-woocommerce-pro') }}</h4>
                  <p class="ascwo-text-[12px] ascwo-leading-4 ascwo-text-[#6b7280] ascwo-m-0">{{ __('Choose whether predefined sizes stay visible in the configurator when custom size is enabled.', 'all-signs-customizer-for-woocommerce-pro') }}</p>
                </div>
                <div
                  @click="sizes.customSize.showPredefinedSizes = !sizes.customSize.showPredefinedSizes"
                  :class="[
                    'ascwo-w-9 ascwo-h-5 ascwo-rounded-full ascwo-relative ascwo-cursor-pointer ascwo-transition-colors ascwo-shrink-0 ascwo-mt-1',
                    sizes.customSize.showPredefinedSizes ? 'ascwo-bg-[#007a72]' : 'ascwo-bg-[#d9dee8]'
                  ]"
                >
                  <div :class="['ascwo-absolute ascwo-top-0.5 ascwo-w-4 ascwo-h-4 ascwo-rounded-full ascwo-bg-white ascwo-shadow ascwo-transition-all', sizes.customSize.showPredefinedSizes ? 'ascwo-right-0.5' : 'ascwo-left-0.5']"></div>
                </div>
              </div>

              <div class="ascwo-setting-grid ascwo-grid lg:ascwo-grid-cols-3 ascwo-gap-4">
                <div>
                  <label>{{ __('Width label', 'all-signs-customizer-for-woocommerce-pro') }}</label>
                  <input type="text" v-model="sizes.customSize.width.label">
                </div>
                <div>
                  <label>{{ __('Width min', 'all-signs-customizer-for-woocommerce-pro') }}</label>
                  <input type="number" v-model="sizes.customSize.width.min">
                </div>
                <div>
                  <label>{{ __('Width max', 'all-signs-customizer-for-woocommerce-pro') }}</label>
                  <input type="number" v-model="sizes.customSize.width.max">
                </div>
                <div>
                  <label>{{ __('Height label', 'all-signs-customizer-for-woocommerce-pro') }}</label>
                  <input type="text" v-model="sizes.customSize.height.label">
                </div>
                <div>
                  <label>{{ __('Height min', 'all-signs-customizer-for-woocommerce-pro') }}</label>
                  <input type="number" v-model="sizes.customSize.height.min">
                </div>
                <div>
                  <label>{{ __('Height max', 'all-signs-customizer-for-woocommerce-pro') }}</label>
                  <input type="number" v-model="sizes.customSize.height.max">
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      </template>
    </template>

    <!-- Add/Edit Size Form -->
    <div v-if="isNewSize" class="ascwo-size-editor ascwo-bg-white ascwo-rounded-xl ascwo-border ascwo-border-solid ascwo-border-[#d1d5db] ascwo-shadow-sm ascwo-p-8">
      <div class="ascwo-flex ascwo-justify-end ascwo-mb-7">
        <button
          @click="back"
          class="ascwo-px-4 ascwo-py-2 ascwo-bg-white ascwo-border ascwo-border-solid ascwo-border-[#c1c4c7] ascwo-rounded-lg ascwo-text-[14px] ascwo-leading-5 ascwo-font-[700] ascwo-text-[#303030] ascwo-cursor-pointer hover:ascwo-bg-[#f6f6f7]"
        >
          {{ __('Back to sizes', 'all-signs-customizer-for-woocommerce-pro') }}
        </button>
      </div>

      <div class="ascwo-space-y-5">
        <div>
          <label class="ascwo-block ascwo-text-[16px] ascwo-leading-6 ascwo-font-normal ascwo-text-[#303030] ascwo-mb-2">{{ __('Label', 'all-signs-customizer-for-woocommerce-pro') }}</label>
          <input type="text" v-model.trim="size.label" class="ascwo-box-border ascwo-w-full ascwo-h-[50px] ascwo-px-4 ascwo-rounded-lg ascwo-border ascwo-border-solid ascwo-border-[#8c9196] ascwo-text-[16px] ascwo-text-[#303030] ascwo-outline-none focus:ascwo-border-[#008060]">
          <p class="ascwo-text-[16px] ascwo-leading-6 ascwo-text-[#6b7280] ascwo-mt-2 ascwo-mb-0">{{ __('Internal and customer-facing name for this size.', 'all-signs-customizer-for-woocommerce-pro') }}</p>
        </div>

        <div class="ascwo-grid md:ascwo-grid-cols-2 ascwo-gap-5">
          <div>
            <label class="ascwo-block ascwo-text-[16px] ascwo-leading-6 ascwo-font-normal ascwo-text-[#303030] ascwo-mb-2">{{ __('Width', 'all-signs-customizer-for-woocommerce-pro') }}</label>
            <input type="number" v-model="size.width" class="ascwo-box-border ascwo-w-full ascwo-h-[50px] ascwo-px-4 ascwo-rounded-lg ascwo-border ascwo-border-solid ascwo-border-[#8c9196] ascwo-text-[16px] ascwo-text-[#303030] ascwo-outline-none focus:ascwo-border-[#008060]">
          </div>
          <div>
            <label class="ascwo-block ascwo-text-[16px] ascwo-leading-6 ascwo-font-normal ascwo-text-[#303030] ascwo-mb-2">{{ __('Height', 'all-signs-customizer-for-woocommerce-pro') }}</label>
            <input type="number" v-model="size.height" class="ascwo-box-border ascwo-w-full ascwo-h-[50px] ascwo-px-4 ascwo-rounded-lg ascwo-border ascwo-border-solid ascwo-border-[#8c9196] ascwo-text-[16px] ascwo-text-[#303030] ascwo-outline-none focus:ascwo-border-[#008060]">
          </div>
        </div>

        <div class="ascwo-grid md:ascwo-grid-cols-2 ascwo-gap-5">
          <div>
            <label class="ascwo-block ascwo-text-[16px] ascwo-leading-6 ascwo-font-normal ascwo-text-[#303030] ascwo-mb-2">{{ __('Number of text lines', 'all-signs-customizer-for-woocommerce-pro') }}</label>
            <input type="number" v-model="size.textNumber" class="ascwo-box-border ascwo-w-full ascwo-h-[50px] ascwo-px-4 ascwo-rounded-lg ascwo-border ascwo-border-solid ascwo-border-[#8c9196] ascwo-text-[16px] ascwo-text-[#303030] ascwo-outline-none focus:ascwo-border-[#008060]">
          </div>
          <div>
            <label class="ascwo-block ascwo-text-[16px] ascwo-leading-6 ascwo-font-normal ascwo-text-[#303030] ascwo-mb-2">{{ __('Max text chars', 'all-signs-customizer-for-woocommerce-pro') }}</label>
            <input type="number" v-model="size.maxTextChar" class="ascwo-box-border ascwo-w-full ascwo-h-[50px] ascwo-px-4 ascwo-rounded-lg ascwo-border ascwo-border-solid ascwo-border-[#8c9196] ascwo-text-[16px] ascwo-text-[#303030] ascwo-outline-none focus:ascwo-border-[#008060]">
          </div>
        </div>
      </div>

      <div class="ascwo-size-editor-actions ascwo-mt-5 ascwo-pt-5 ascwo-border-t ascwo-border-solid ascwo-border-[#dfe3e8] ascwo-flex ascwo-justify-end ascwo-gap-3">
        <button @click="back" class="ascwo-px-5 ascwo-py-2 ascwo-bg-white ascwo-border ascwo-border-solid ascwo-border-[#c1c4c7] ascwo-rounded-lg ascwo-text-[14px] ascwo-font-[700] ascwo-text-[#111827] ascwo-cursor-pointer hover:ascwo-bg-[#f6f6f7]">{{ __('Cancel', 'all-signs-customizer-for-woocommerce-pro') }}</button>
        <button
          @click="isEdit ? updateSizeInSize() : addSize()"
          :disabled="!canSaveSize || isLoading"
          class="ascwo-primary-button ascwo-px-5 ascwo-py-2 ascwo-bg-[#007a72] ascwo-text-white ascwo-border-none ascwo-rounded-lg ascwo-text-[14px] ascwo-font-[900] ascwo-cursor-pointer hover:ascwo-bg-[#00645f] disabled:ascwo-bg-[#d8d8d8] disabled:ascwo-cursor-not-allowed"
        >
          {{ isLoading ? __('Saving...', 'all-signs-customizer-for-woocommerce-pro') : (isEdit ? __('Update size', 'all-signs-customizer-for-woocommerce-pro') : __('Save size', 'all-signs-customizer-for-woocommerce-pro')) }}
        </button>
      </div>
    </div>

    <!-- Save Page Changes (Sticky Footer) -->
    <div v-if="!isNewSize" class="ascwo-flex ascwo-justify-end ascwo-mt-[-52px] ascwo-mr-5">
      <button
        @click="updateSize"
        :disabled="isLoading"
        class="ascwo-px-3 ascwo-py-1.5 ascwo-bg-[#007a72] ascwo-text-white ascwo-text-[12px] ascwo-font-[900] ascwo-border-none ascwo-rounded-md ascwo-cursor-pointer hover:ascwo-bg-[#00645f] disabled:ascwo-opacity-50"
      >
        {{ isLoading ? __('Saving...', 'all-signs-customizer-for-woocommerce-pro') : __('Save settings', 'all-signs-customizer-for-woocommerce-pro') }}
      </button>
    </div>

    <!-- Delete Modal -->
    <div v-if="openModal" class="ascwo-fixed ascwo-inset-0 ascwo-z-[20000] ascwo-flex ascwo-items-center ascwo-justify-center">
      <div class="ascwo-absolute ascwo-inset-0 ascwo-bg-black/40" @click="closeModal"></div>
      <div class="ascwo-relative ascwo-w-[min(400px,95vw)] ascwo-bg-white ascwo-rounded-2xl ascwo-shadow-2xl ascwo-p-6 ascwo-text-center">
        <div class="ascwo-w-14 ascwo-h-14 ascwo-bg-[#fff1f0] ascwo-text-[#8e1f0b] ascwo-rounded-full ascwo-flex ascwo-items-center ascwo-justify-center ascwo-mx-auto ascwo-mb-4">
          <Trash2Icon class="ascwo-w-7 ascwo-h-7" />
        </div>
        <h3 class="ascwo-text-[18px] ascwo-font-bold ascwo-text-[#1a1a1a] ascwo-mb-2">{{ __('Delete size?', 'all-signs-customizer-for-woocommerce-pro') }}</h3>
        <p class="ascwo-text-[14px] ascwo-text-[#616161] ascwo-mb-6">{{ sprintf(__('Are you sure you want to delete "%s"?', 'all-signs-customizer-for-woocommerce-pro'), size.label) }}</p>
        <div class="ascwo-flex ascwo-gap-3">
          <button @click="closeModal" class="ascwo-flex-1 ascwo-py-2 ascwo-bg-white ascwo-border ascwo-border-solid ascwo-border-[#c1c4c7] ascwo-rounded-xl ascwo-text-[13px] ascwo-font-bold ascwo-cursor-pointer">{{ __('Cancel', 'all-signs-customizer-for-woocommerce-pro') }}</button>
          <button @click="deleteSize" class="ascwo-flex-1 ascwo-py-2 ascwo-bg-[#8e1f0b] ascwo-text-white ascwo-border-none ascwo-rounded-xl ascwo-text-[13px] ascwo-font-bold ascwo-cursor-pointer">{{ __('Delete', 'all-signs-customizer-for-woocommerce-pro') }}</button>
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

const isFetching = ref(true);
const isNewSize = ref(false);
const isLoading = ref(false);
const isEdit = ref(false);
const openModal = ref(false);
const sizeId = ref(null);
const draggedSizeIndex = ref(null);

const sizes = ref({
  settings: { title: 'Sizes', description: '' },
  customSize: { active: false, showPredefinedSizes: true, width: { label: 'Width', min: 0, max: 0 }, height: { label: 'Height', min: 0, max: 0 } },
  thickness: { active: false, values: [], items: [] },
  items: []
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
  if (!Array.isArray(sizes.value.items) || sizes.value.items.length === 0) {
    return;
  }

  const defaultIndex = sizes.value.items.findIndex((item) => item.isDefault);
  const selectedIndex = defaultIndex >= 0 ? defaultIndex : 0;
  sizes.value.items.forEach((item, index) => {
    item.isDefault = index === selectedIndex;
  });
};

const getSizesPayload = () => {
  ensureDefaultSize();
  syncThicknessValues();

  const payload = JSON.parse(JSON.stringify(sizes.value));
  delete payload.__ascwoSizeSettingsInitialized;

  if (payload.thickness) {
    delete payload.thickness.items;
    payload.thickness.active = typeof payload.thickness.active === 'boolean' ? payload.thickness.active : false;
    payload.thickness.values = Array.isArray(payload.thickness.values) ? payload.thickness.values : [];
  }

  if (payload.customSize) {
    payload.customSize.active = typeof payload.customSize.active === 'boolean' ? payload.customSize.active : false;
    delete payload.customSize.pricings;
  }

  return payload;
};

const normalizeSizes = () => {
  sizes.value.settings = {
    title: sizes.value.settings?.title ?? sizes.value.label ?? 'Sizes',
    description: sizes.value.settings?.description ?? sizes.value.description ?? '',
  };
  if (!sizes.value.customSize) {
    sizes.value.customSize = { active: false, showPredefinedSizes: true, width: { label: 'Width', min: 0, max: 0 }, height: { label: 'Height', min: 0, max: 0 } };
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
  if (!Array.isArray(sizes.value.items)) {
    sizes.value.items = [];
  }
  ensureDefaultSize();
};

const fetchSizes = async () => {
  isFetching.value = true;
  try {
    const result = await api.getRequiredOptionSizes(configID.value);
    if (result) {
      sizes.value = {
        ...result,
        items: Array.isArray(result.items) ? result.items : [],
      };
      normalizeSizes();
    }
  } finally { isFetching.value = false; }
};

const updateSize = async () => {
  isLoading.value = true;
  try {
    const res = await api.updateRequiredOptionSizes(configID.value, getSizesPayload());
    if (res.success) {
      toastMessage(res.message);
      isNewSize.value = false;
      openModal.value = false;
      await fetchSizes();
    }
  } finally { isLoading.value = false; }
};

const addSize = async () => {
  if (size.value.label.trim()) {
    isLoading.value = true;
    try {
      const payload = { ...size.value };
      payload.isDefault = !sizes.value.items.some((item) => item.isDefault);
      const res = await api.addRequiredOptionSizeItem(configID.value, payload);
      console.log(res, "response")
      if (res?.success) {
        toastMessage(res.message);
        isNewSize.value = false;
        openModal.value = false;
        await fetchSizes();
      } else {
        toastMessage(res?.message || __("Unable to add size", "all-signs-customizer-for-woocommerce-pro"), "warning");
      }
    } finally {
      isLoading.value = false;
    }
  }
};

const updateSizeInSize = async () => {
  if (size.value.label.trim()) {
    isLoading.value = true;
    try {
      const res = await api.updateRequiredOptionSizeItem(configID.value, sizeId.value, size.value);
      if (res?.success) {
        toastMessage(res.message);
        isNewSize.value = false;
        openModal.value = false;
        await fetchSizes();
      } else {
        toastMessage(res?.message || __("Unable to update size", "all-signs-customizer-for-woocommerce-pro"), "warning");
      }
    } finally {
      isLoading.value = false;
    }
  }
};

const deleteSize = async () => {
  isLoading.value = true;
  try {
    const res = await api.deleteRequiredOptionSizeItem(configID.value, sizeId.value);
    if (res?.success) {
      toastMessage(res.message);
      isNewSize.value = false;
      openModal.value = false;
      await fetchSizes();
    } else {
      toastMessage(res?.message || __("Unable to delete size", "all-signs-customizer-for-woocommerce-pro"), "warning");
    }
  } finally {
    isLoading.value = false;
  }
};

const selectSize = (id, sz, isDeleting = false) => {
  sizeId.value = id;
  size.value = { ...sz };
  if (isDeleting) openModal.value = true;
  else { isEdit.value = true; isNewSize.value = true; }
};

const selectDefault = async (key) => {
  isLoading.value = true;
  try {
    const res = await api.setRequiredOptionSizeDefault(configID.value, key);
    if (res?.success) {
      toastMessage(res.message);
      await fetchSizes();
    } else {
      toastMessage(res?.message || __("Unable to update default size", "all-signs-customizer-for-woocommerce-pro"), "warning");
    }
  } finally {
    isLoading.value = false;
  }
};

const dragStart = (key) => {
  draggedSizeIndex.value = key;
};

const dropSize = (targetIndex) => {
  if (draggedSizeIndex.value === null || draggedSizeIndex.value === targetIndex) return;
  const [moved] = sizes.value.items.splice(draggedSizeIndex.value, 1);
  sizes.value.items.splice(targetIndex, 0, moved);
  draggedSizeIndex.value = null;
  ensureDefaultSize();
  updateSize();
};

const newSize = () => {
  isNewSize.value = true;
  isEdit.value = false;
  size.value = { isDefault: false, label: "", width: 100, height: 50, startPriceAtChar: 1, textNumber: -1, maxTextChar: -1, charPrice: 0, basePrice: 0 };
};
const back = () => { isNewSize.value = false; isEdit.value = false; };
const closeModal = () => openModal.value = false;
const changeCustomSizeActive = () => sizes.value.customSize.active = !sizes.value.customSize.active;
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

onMounted(fetchSizes);
</script>

<style scoped>
.ascwo-sizes-page {
  gap: 10px;
}

.ascwo-sizes-header,
.ascwo-sizes-card,
.ascwo-size-editor {
  border-radius: 10px;
  border-color: #dfe3e8;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.04);
}

.ascwo-sizes-header {
  min-height: 74px;
  padding: 14px 20px;
}

.ascwo-sizes-header h2 {
  font-size: 15px;
  line-height: 20px;
  font-weight: 800;
}

.ascwo-sizes-header p {
  font-size: 11px;
  line-height: 14px;
}

.ascwo-sizes-header button {
  min-height: 28px;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 11px;
  line-height: 14px;
}

.ascwo-sizes-header button svg {
  width: 13px;
  height: 13px;
}

.ascwo-sizes-card {
  padding: 18px 20px;
}

.ascwo-sizes-card h3 {
  font-size: 13px;
  line-height: 18px;
  font-weight: 800;
  margin-bottom: 12px;
}

.ascwo-sizes-card thead th {
  padding: 8px 12px;
  font-size: 11px;
  line-height: 14px;
  font-weight: 700;
}

.ascwo-sizes-card tbody td {
  padding: 8px 12px;
  font-size: 12px;
  line-height: 18px;
}

.ascwo-sizes-card tbody td:nth-child(2) {
  font-weight: 800;
}

.ascwo-sizes-card tbody button {
  min-height: 28px;
  padding: 5px 10px;
  border-radius: 6px;
  font-size: 11px;
  line-height: 14px;
}

.ascwo-size-settings-card > p {
  font-size: 12px;
  line-height: 18px;
}

.ascwo-size-settings-card label {
  font-size: 12px;
  line-height: 16px;
}

.ascwo-size-settings-card input {
  height: 34px;
  font-size: 12px;
}

.ascwo-settings-section {
  padding: 16px 0;
  border-left: 0 !important;
  border-right: 0 !important;
  border-bottom: 0 !important;
  background: transparent !important;
  box-shadow: none !important;
}

.ascwo-settings-section:first-child {
  padding-top: 18px;
}

.ascwo-settings-section:last-child {
  padding-bottom: 0;
}

.ascwo-custom-size-section {
  border-top: 1px solid #eceff2 !important;
  border-radius: 0 !important;
}

.ascwo-thickness-card {
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.03);
}

.ascwo-setting-grid label {
  display: block;
  margin-bottom: 6px;
  color: #303030;
  font-size: 12px;
  line-height: 16px;
  font-weight: 400;
}

.ascwo-setting-grid input,
.ascwo-setting-grid select {
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

.ascwo-setting-grid input:focus,
.ascwo-setting-grid select:focus {
  border-color: #008060;
}

.ascwo-size-editor {
  padding: 26px 28px;
}

.ascwo-size-editor label {
  font-size: 13px;
  line-height: 18px;
  margin-bottom: 6px;
}

.ascwo-size-editor input {
  height: 38px;
  border-radius: 8px;
  font-size: 13px;
  line-height: 18px;
  padding-left: 12px;
  padding-right: 12px;
}

.ascwo-size-editor p {
  font-size: 13px;
  line-height: 18px;
  margin-top: 6px;
}

.ascwo-size-editor button {
  min-height: 32px;
  border-radius: 8px;
  font-size: 12px;
  line-height: 16px;
  padding: 7px 14px;
}

.ascwo-size-setting-toggles,
.ascwo-size-editor-actions {
  border-left: 0 !important;
  border-right: 0 !important;
  border-bottom: 0 !important;
  background: transparent !important;
  box-shadow: none !important;
}

.ascwo-size-setting-toggles {
  border-top: 1px solid #eceff2 !important;
}

.ascwo-size-editor-actions {
  border-top: 1px solid #dfe3e8 !important;
}
</style>
