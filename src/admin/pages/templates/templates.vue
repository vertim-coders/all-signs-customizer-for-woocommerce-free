<template>
  <div class="asowp-pt-5 asowp-space-y-4">
    <div v-if="!isNewTemplate" class="asowp-space-y-4">
      <div
        class="asowp-rounded-xl asowp-bg-white asowp-border asowp-border-solid asowp-border-[#e5e7eb] asowp-shadow-sm"
      >
        <div
          class="asowp-flex asowp-flex-col lg:asowp-flex-row lg:asowp-items-center asowp-gap-4 asowp-p-4"
        >
          <div class="asowp-flex-1">
            <div class="asowp-text-lg asowp-font-bold asowp-text-gray-900">
              {{ __("Templates", "all-signs-options-pro") }}
            </div>
            <div class="asowp-text-sm asowp-text-gray-500">
              {{ filteredTemplates.length }}
              {{ __("templates", "all-signs-options-pro") }}
            </div>
          </div>

          <div
            class="asowp-flex asowp-flex-col sm:asowp-flex-row asowp-items-stretch sm:asowp-items-center asowp-gap-2"
          >
            <form
              class="asowp-relative asowp-w-full sm:asowp-w-[260px]"
              @submit.prevent="handleSearchChange"
            >
              <input
                type="search"
                v-model="search"
                @input="searchInputEmpty"
                id="asowp-search"
                class="asowp-w-full asowp-h-[36px] asowp-rounded-lg asowp-border asowp-border-gray-300 asowp-pl-9 asowp-pr-3 asowp-text-sm focus:asowp-outline-none focus:asowp-ring-2 focus:asowp-ring-[#016464] focus:asowp-border-transparent"
                :placeholder="__('Search templates...', 'all-signs-options-pro')"
              />
              <svg
                class="asowp-absolute asowp-left-3 asowp-top-2.5 asowp-h-4 asowp-w-4 asowp-text-gray-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-4.35-4.35m1.6-5.4a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </form>

            <select
              v-model="selectedCategory"
              class="asowp-h-[36px] asowp-rounded-lg asowp-border asowp-border-gray-300 asowp-px-3 asowp-text-sm focus:asowp-outline-none focus:asowp-ring-2 focus:asowp-ring-[#016464] focus:asowp-border-transparent"
            >
              <option value="all">
                {{ __("All categories", "all-signs-options-pro") }}
              </option>
              <option
                v-for="cat in categories"
                :key="cat.value"
                :value="cat.value"
              >
                {{ cat.name }}
              </option>
            </select>

            <button
              class="asowp-flex asowp-items-center asowp-justify-center asowp-gap-2 asowp-bg-[#016464] asowp-text-white asowp-text-sm asowp-font-semibold asowp-px-4 asowp-py-2 asowp-rounded-lg asowp-border-none asowp-cursor-pointer hover:asowp-opacity-90"
              @click="isNewTemplate = true"
            >
              <svg
                class="asowp-h-4 asowp-w-4"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10 4v12m6-6H4"
                />
              </svg>
              <span>{{ __("Create template", "all-signs-options-pro") }}</span>
            </button>
          </div>
        </div>
      </div>

      <div
        v-if="isFetching"
        class="asowp-flex asowp-items-center asowp-justify-center asowp-py-16 asowp-bg-white asowp-rounded-xl asowp-border asowp-border-dashed asowp-border-gray-300"
      >
        <div class="asowp-text-sm asowp-text-gray-500">
          {{ __("Loading templates...", "all-signs-options-pro") }}
        </div>
      </div>

      <div
        v-else-if="filteredTemplates.length > 0"
        class="asowp-grid asowp-grid-cols-1 sm:asowp-grid-cols-2 lg:asowp-grid-cols-3 xl:asowp-grid-cols-4 asowp-gap-4"
      >
        <div
          v-for="tpl in filteredTemplates"
          :key="`${tpl.configId}-${tpl._index}`"
          class="asowp-group asowp-bg-white asowp-rounded-xl asowp-border asowp-border-gray-200 asowp-overflow-hidden asowp-shadow-sm hover:asowp-shadow-md asowp-transition-shadow"
        >
          <div
            class="asowp-relative asowp-bg-[#f3f4f6] asowp-h-[160px] asowp-flex asowp-items-center asowp-justify-center asowp-overflow-hidden"
          >
            <div
              v-if="tpl.prevImg || tpl.realImg"
              class="asowp-absolute asowp-inset-0 asowp-w-full asowp-h-full"
            >
              <img
                v-if="tpl.prevImg"
                :src="tpl.prevImg"
                :alt="tpl.name"
                class="asowp-absolute asowp-inset-0 asowp-w-full asowp-h-full asowp-object-cover asowp-transition-transform asowp-duration-300 group-hover:asowp-scale-105"
              />
              <img
                v-if="tpl.realImg"
                :src="tpl.realImg"
                :alt="tpl.name"
                class="asowp-absolute asowp-inset-0 asowp-w-full asowp-h-full asowp-object-cover asowp-opacity-0 asowp-transition-opacity asowp-duration-300 group-hover:asowp-opacity-100"
              />
              <div class="asowp-absolute asowp-inset-0 asowp-bg-gradient-to-t asowp-from-black/30 asowp-via-black/10 asowp-to-transparent asowp-opacity-0 asowp-transition-opacity asowp-duration-300 group-hover:asowp-opacity-100"></div>
            </div>
            <div
              v-else
              class="asowp-flex asowp-flex-col asowp-items-center asowp-justify-center asowp-text-gray-400"
            >
              <svg
                class="asowp-h-8 asowp-w-8"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 5h18v14H3zM8 10l4 4 4-4"
                />
              </svg>
              <span class="asowp-text-xs asowp-mt-1">
                {{ __("No preview", "all-signs-options-pro") }}
              </span>
            </div>

            <div class="asowp-absolute asowp-top-2 asowp-right-2 asowp-flex asowp-gap-1">
              <button
                class="asowp-p-1.5 asowp-rounded-md asowp-text-gray-600 hover:asowp-bg-gray-100 asowp-cursor-pointer"
                :title="__('Edit', 'all-signs-options-pro')"
                @click="selectTemplate(tpl._index, tpl)"
              >
                <svg
                  class="asowp-w-4 asowp-h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
              </button>
              <button
                class="asowp-p-1.5 asowp-rounded-md asowp-text-red-500 hover:asowp-bg-red-50 asowp-cursor-pointer"
                :title="__('Delete', 'all-signs-options-pro')"
                @click="selectTemplate(tpl._index, tpl, true)"
              >
                <svg
                  class="asowp-w-4 asowp-h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
              <button
                class="asowp-p-1.5 asowp-rounded-md asowp-text-gray-600 hover:asowp-bg-gray-100 asowp-cursor-pointer"
                :title="__('Open template', 'all-signs-options-pro')"
                @click="goToTemplate(tpl, tpl._index)"
              >
                <svg
                  class="asowp-w-4 asowp-h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9.75 3a.75.75 0 01.75.75V5h3V3.75a.75.75 0 011.5 0V5h1.25A2.75 2.75 0 0119 7.75V9h1.25a.75.75 0 010 1.5H19v3h1.25a.75.75 0 010 1.5H19v1.25A2.75 2.75 0 0116.25 19H15v1.25a.75.75 0 01-1.5 0V19h-3v1.25a.75.75 0 01-1.5 0V19H7.75A2.75 2.75 0 015 16.25V15H3.75a.75.75 0 010-1.5H5v-3H3.75a.75.75 0 010-1.5H5V7.75A2.75 2.75 0 017.75 5H9V3.75A.75.75 0 019.75 3zM7.5 8.75A1.25 1.25 0 018.75 7.5h6.5A1.25 1.25 0 0116.5 8.75v6.5a1.25 1.25 0 01-1.25 1.25h-6.5A1.25 1.25 0 017.5 15.25v-6.5z"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div class="asowp-p-3">
            <div class="asowp-flex asowp-items-start asowp-justify-between asowp-gap-2">
              <div class="asowp-min-w-0">
                <h3
                  class="asowp-text-sm asowp-font-semibold asowp-text-gray-900 asowp-truncate"
                >
                  {{ tpl.name || __("Untitled template", "all-signs-options-pro") }}
                </h3>
                <p class="asowp-text-xs asowp-text-gray-500">
                  {{ categoryMap[tpl.categoryId] || __("Uncategorized", "all-signs-options-pro") }}
                  ·
                  {{ configurationMap[tpl.configId] || __("No configuration", "all-signs-options-pro") }}
                </p>
              </div>
              <span
                class="asowp-inline-flex asowp-items-center asowp-rounded-full asowp-bg-[#ffe6e6] asowp-text-[#b42318] asowp-text-[11px] asowp-px-2 asowp-py-0.5"
              >
                {{ __("Base price", "all-signs-options-pro") }}:
                {{ currencySumbol }}{{ tpl.basePrice || 0 }}
              </span>
            </div>

            <div class="asowp-mt-3 asowp-flex asowp-items-center asowp-justify-between">
              <button
                class="asowp-text-sm asowp-font-medium asowp-text-[#016464] asowp-bg-transparent asowp-border-none asowp-cursor-pointer hover:asowp-underline"
                @click="goToTemplate(tpl, tpl._index)"
              >
                {{ __("Open", "all-signs-options-pro") }}
              </button>
              <button
                class="asowp-text-sm asowp-font-medium asowp-text-gray-600 asowp-bg-transparent asowp-border-none asowp-cursor-pointer hover:asowp-text-gray-900"
                @click="selectTemplate(tpl._index, tpl)"
              >
                {{ __("Edit details", "all-signs-options-pro") }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        v-else
        class="asowp-flex asowp-flex-col asowp-items-center asowp-justify-center asowp-py-12 asowp-bg-white asowp-rounded-xl asowp-border asowp-border-dashed asowp-border-gray-300"
      >
        <div class="asowp-bg-gray-50 asowp-p-4 asowp-rounded-full asowp-mb-4">
          <svg
            class="asowp-w-8 asowp-h-8 asowp-text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
            />
          </svg>
        </div>
        <h3 class="asowp-text-sm asowp-font-medium asowp-text-gray-900">
          {{ __("No templates yet", "all-signs-options-pro") }}
        </h3>
        <p class="asowp-text-sm asowp-text-gray-500 asowp-mb-4">
          {{
            __(
              "Create your first template to start building presets.",
              "all-signs-options-pro"
            )
          }}
        </p>
        <button
          @click="isNewTemplate = true"
          class="asowp-text-[#016464] asowp-font-medium hover:asowp-underline asowp-bg-transparent asowp-border-none asowp-cursor-pointer"
        >
          {{ __("Create template", "all-signs-options-pro") }}
        </button>
      </div>
    </div>

    <div v-else class="asowp-bg-white asowp-rounded-xl asowp-border asowp-border-gray-200 asowp-shadow-sm">
      <div class="asowp-px-6 asowp-py-4 asowp-border-b asowp-border-gray-200">
        <h2 class="asowp-text-sm asowp-font-semibold asowp-text-gray-900">
          {{
            isEdit
              ? __("Edit template", "all-signs-options-pro")
              : __("Create new template", "all-signs-options-pro")
          }}
        </h2>
      </div>

      <div class="asowp-bg-[#f8f9fb] asowp-p-6">
        <div class="asowp-grid asowp-grid-cols-1 lg:asowp-grid-cols-2 asowp-gap-6">
          <div class="asowp-space-y-4">
            <div>
              <label class="asowp-block asowp-text-xs asowp-font-semibold asowp-text-gray-700 asowp-mb-2">
                {{ __("Name", "all-signs-options-pro") }}
              </label>
              <input
                v-model="template.name"
                type="text"
                class="asowp-w-full asowp-h-[38px] asowp-rounded-md asowp-border asowp-border-gray-400 asowp-bg-white asowp-px-3 asowp-text-sm focus:asowp-outline-none"
              />
              <p v-if="isEmptyName" class="asowp-text-red-500 asowp-text-xs asowp-mt-1">
                {{ __("Name is required", "all-signs-options-pro") }}
              </p>
            </div>

            <div>
              <label class="asowp-block asowp-text-xs asowp-font-semibold asowp-text-gray-700 asowp-mb-2">
                {{ __("Upload preview image", "all-signs-options-pro") }}
              </label>
              <div class="asowp-flex asowp-items-center asowp-gap-3">
                <div
                  class="asowp-flex-1 asowp-h-[38px] asowp-rounded-md asowp-border asowp-border-gray-400 asowp-bg-white asowp-flex asowp-items-center asowp-justify-between asowp-px-2"
                >
                  <button
                    type="button"
                    class="asowp-inline-flex asowp-items-center asowp-gap-2 asowp-bg-[#016464] asowp-text-white asowp-text-xs asowp-font-semibold asowp-px-3 asowp-py-1.5 asowp-rounded-md asowp-border-none asowp-cursor-pointer hover:asowp-opacity-90"
                    @click="selectTemplatePrevImg"
                  >
                    {{ __("Upload preview image", "all-signs-options-pro") }}
                  </button>
                  <span class="asowp-text-xs asowp-text-gray-400 asowp-ml-2 asowp-truncate">
                    {{ template.prevImg ? __("Selected", "all-signs-options-pro") : __("No file", "all-signs-options-pro") }}
                  </span>
                </div>
                <div
                  class="asowp-w-[38px] asowp-h-[38px] asowp-rounded-md asowp-border asowp-border-gray-200 asowp-bg-white asowp-overflow-hidden asowp-flex asowp-items-center asowp-justify-center"
                >
                  <img
                    v-if="template.prevImg"
                    :src="template.prevImg"
                    :alt="template.name"
                    class="asowp-w-full asowp-h-full asowp-object-cover"
                  />
                </div>
              </div>
            </div>

            <div>
              <label class="asowp-block asowp-text-xs asowp-font-semibold asowp-text-gray-700 asowp-mb-2">
                {{ __("Base price", "all-signs-options-pro") }}
              </label>
              <input
                v-model.number="template.basePrice"
                type="number"
                min="0"
                step="0.01"
                class="asowp-w-full asowp-h-[38px] asowp-rounded-md asowp-border asowp-border-gray-400 asowp-bg-white asowp-px-3 asowp-text-sm focus:asowp-outline-none"
              />
            </div>

            <div>
              <label class="asowp-block asowp-text-xs asowp-font-semibold asowp-text-gray-700 asowp-mb-2">
                {{ __("Select category", "all-signs-options-pro") }}
              </label>
              <div class="asowp-flex asowp-items-center asowp-gap-2">
                <select
                  v-model="template.categoryId"
                  class="asowp-flex-1 asowp-h-[38px] asowp-rounded-md asowp-border asowp-border-gray-400 asowp-bg-white asowp-px-3 asowp-text-sm focus:asowp-outline-none"
                >
                  <option value="">
                    {{ __("No category", "all-signs-options-pro") }}
                  </option>
                  <option
                    v-for="cat in categories"
                    :key="cat.value"
                    :value="cat.value"
                  >
                    {{ cat.name }}
                  </option>
                </select>
                <button
                  type="button"
                  class="asowp-h-[30px] asowp-px-3 asowp-text-xs asowp-font-semibold asowp-text-white asowp-bg-[#016464] asowp-rounded-md asowp-border-none asowp-cursor-pointer hover:asowp-opacity-90"
                  @click="openCategoryModal = true"
                >
                  {{ __("Add new", "all-signs-options-pro") }}
                </button>
              </div>
            </div>
          </div>

          <div class="asowp-space-y-4">
            <div>
              <label class="asowp-block asowp-text-xs asowp-font-semibold asowp-text-gray-700 asowp-mb-2">
                {{ __("Select configuration", "all-signs-options-pro") }}
              </label>
              <select
                v-model="template.configId"
                class="asowp-w-full asowp-h-[38px] asowp-rounded-md asowp-border asowp-border-gray-400 asowp-bg-white asowp-px-3 asowp-text-sm focus:asowp-outline-none"
              >
                <option value="0" disabled>
                  {{ __("Search configuration", "all-signs-options-pro") }}
                </option>
                <option
                  v-for="config in configurations"
                  :key="config.value"
                  :value="config.value"
                >
                  {{ config.name }}
                </option>
              </select>
              <p v-if="isEmptyConfig" class="asowp-text-red-500 asowp-text-xs asowp-mt-1">
                {{ __("Configuration is required", "all-signs-options-pro") }}
              </p>
            </div>

            <div>
              <label class="asowp-block asowp-text-xs asowp-font-semibold asowp-text-gray-700 asowp-mb-2">
                {{ __("Upload real image", "all-signs-options-pro") }}
              </label>
              <div class="asowp-flex asowp-items-center asowp-gap-3">
                <div
                  class="asowp-flex-1 asowp-h-[38px] asowp-rounded-md asowp-border asowp-border-gray-400 asowp-bg-white asowp-flex asowp-items-center asowp-justify-between asowp-px-2"
                >
                  <button
                    type="button"
                    class="asowp-inline-flex asowp-items-center asowp-gap-2 asowp-bg-[#016464] asowp-text-white asowp-text-xs asowp-font-semibold asowp-px-3 asowp-py-1.5 asowp-rounded-md asowp-border-none asowp-cursor-pointer hover:asowp-opacity-90"
                    @click="selectTemplateRealImg"
                  >
                    {{ __("Upload real image", "all-signs-options-pro") }}
                  </button>
                  <span class="asowp-text-xs asowp-text-gray-400 asowp-ml-2 asowp-truncate">
                    {{ template.realImg ? __("Selected", "all-signs-options-pro") : __("No file", "all-signs-options-pro") }}
                  </span>
                </div>
                <div
                  class="asowp-w-[38px] asowp-h-[38px] asowp-rounded-md asowp-border asowp-border-gray-200 asowp-bg-white asowp-overflow-hidden asowp-flex asowp-items-center asowp-justify-center"
                >
                  <img
                    v-if="template.realImg"
                    :src="template.realImg"
                    :alt="template.name"
                    class="asowp-w-full asowp-h-full asowp-object-cover"
                  />
                </div>
              </div>
            </div>

            <div class="asowp-space-y-3">
              <label class="asowp-flex asowp-items-center asowp-justify-between asowp-gap-3">
                <span class="asowp-text-xs asowp-font-semibold asowp-text-gray-700">
                  {{ __("Enable auto-update for the preview image", "all-signs-options-pro") }}
                </span>
                <span class="asowp-relative asowp-inline-flex asowp-items-center">
                  <input
                    type="checkbox"
                    v-model="template.enablePreviewImage"
                    class="asowp-sr-only asowp-peer"
                  />
                  <span class="asowp-w-10 asowp-h-5 asowp-rounded-full asowp-bg-gray-300 peer-checked:asowp-bg-[#008060]"></span>
                  <span
                    class="asowp-absolute asowp-left-0.5 asowp-top-0.5 asowp-w-4 asowp-h-4 asowp-rounded-full asowp-bg-white asowp-transition-transform peer-checked:asowp-translate-x-5"
                  ></span>
                </span>
              </label>
              <label class="asowp-flex asowp-items-center asowp-justify-between asowp-gap-3">
                <span class="asowp-text-xs asowp-font-semibold asowp-text-gray-700">
                  {{ __("Enable add to cart", "all-signs-options-pro") }}
                </span>
                <span class="asowp-relative asowp-inline-flex asowp-items-center">
                  <input
                    type="checkbox"
                    v-model="template.enableAddToCart"
                    class="asowp-sr-only asowp-peer"
                  />
                  <span class="asowp-w-10 asowp-h-5 asowp-rounded-full asowp-bg-gray-300 peer-checked:asowp-bg-[#008060]"></span>
                  <span
                    class="asowp-absolute asowp-left-0.5 asowp-top-0.5 asowp-w-4 asowp-h-4 asowp-rounded-full asowp-bg-white asowp-transition-transform peer-checked:asowp-translate-x-5"
                  ></span>
                </span>
              </label>
              <label class="asowp-flex asowp-items-center asowp-justify-between asowp-gap-3">
                <span class="asowp-text-xs asowp-font-semibold asowp-text-gray-700">
                  {{ __("Show on frontend templates list", "all-signs-options-pro") }}
                </span>
                <span class="asowp-relative asowp-inline-flex asowp-items-center">
                  <input
                    type="checkbox"
                    v-model="template.showOnFrontend"
                    class="asowp-sr-only asowp-peer"
                  />
                  <span class="asowp-w-10 asowp-h-5 asowp-rounded-full asowp-bg-gray-300 peer-checked:asowp-bg-[#008060]"></span>
                  <span
                    class="asowp-absolute asowp-left-0.5 asowp-top-0.5 asowp-w-4 asowp-h-4 asowp-rounded-full asowp-bg-white asowp-transition-transform peer-checked:asowp-translate-x-5"
                  ></span>
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <div class="asowp-flex asowp-justify-end asowp-gap-3 asowp-px-6 asowp-py-4 asowp-border-t asowp-border-gray-200 asowp-bg-[#f8f9fb]">
        <button
          @click="back"
          class="asowp-inline-flex asowp-items-center asowp-gap-2 asowp-text-sm asowp-font-semibold asowp-text-gray-800 asowp-bg-white asowp-border asowp-border-gray-400 asowp-px-6 asowp-py-2 asowp-rounded-md hover:asowp-bg-gray-50 asowp-cursor-pointer"
        >
          <span class="asowp-text-base">←</span>
          {{ __("Back", "all-signs-options-pro") }}
        </button>
        <button
          @click="saveOrUpdate"
          class="asowp-inline-flex asowp-items-center asowp-gap-2 asowp-text-sm asowp-font-semibold asowp-text-white asowp-bg-[#016464] asowp-border-none asowp-px-8 asowp-py-2 asowp-rounded-md hover:asowp-opacity-90 asowp-cursor-pointer"
          :disabled="isLoading"
        >
          {{ isLoading ? __("Saving...", "all-signs-options-pro") : __("Save", "all-signs-options-pro") }}
        </button>
      </div>
    </div>

    <div v-if="openCategoryModal" class="asowp-fixed asowp-inset-0 asowp-z-[1000]">
      <div
        class="asowp-fixed asowp-inset-0 asowp-bg-gray-500 asowp-bg-opacity-70"
        @click="closeCategoryModal"
      ></div>
      <div
        class="asowp-relative asowp-flex asowp-items-center asowp-justify-center asowp-min-h-screen asowp-px-4"
      >
        <div class="asowp-bg-white asowp-rounded-xl asowp-shadow-xl asowp-w-full asowp-max-w-md asowp-p-6">
          <h3 class="asowp-text-lg asowp-font-bold asowp-text-gray-900 asowp-mb-2">
            {{ __("New category", "all-signs-options-pro") }}
          </h3>
          <p class="asowp-text-sm asowp-text-gray-500 asowp-mb-4">
            {{ __("Add a category for your templates.", "all-signs-options-pro") }}
          </p>
          <input
            v-model="category"
            type="text"
            class="asowp-w-full asowp-rounded-lg asowp-border asowp-border-gray-300 asowp-px-4 asowp-py-2 asowp-text-sm focus:asowp-outline-none focus:asowp-ring-2 focus:asowp-ring-[#016464] focus:asowp-border-transparent"
            :placeholder="__('Category name', 'all-signs-options-pro')"
          />
          <div class="asowp-mt-6 asowp-flex asowp-justify-end asowp-gap-3">
            <button
              @click="closeCategoryModal"
              class="asowp-inline-flex asowp-items-center asowp-text-sm asowp-font-medium asowp-text-gray-700 asowp-bg-white asowp-border asowp-border-gray-300 asowp-px-4 asowp-py-2 asowp-rounded-lg hover:asowp-bg-gray-50 asowp-cursor-pointer"
            >
              {{ __("Cancel", "all-signs-options-pro") }}
            </button>
            <button
              @click="saveCategory"
              class="asowp-inline-flex asowp-items-center asowp-text-sm asowp-font-semibold asowp-text-white asowp-bg-[#016464] asowp-border-none asowp-px-5 asowp-py-2 asowp-rounded-lg hover:asowp-opacity-90 asowp-cursor-pointer"
              :disabled="isLoading"
            >
              {{ isLoading ? __("Saving...", "all-signs-options-pro") : __("Save", "all-signs-options-pro") }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="openModal && isDelete" class="asowp-fixed asowp-inset-0 asowp-z-[1000]">
      <div
        class="asowp-fixed asowp-inset-0 asowp-bg-gray-500 asowp-bg-opacity-75"
        @click="closeModal"
      ></div>
      <div
        class="asowp-relative asowp-flex asowp-items-center asowp-justify-center asowp-min-h-screen asowp-px-4"
      >
        <div
          class="asowp-bg-white asowp-p-6 asowp-rounded-xl asowp-shadow-xl asowp-w-full asowp-max-w-md"
        >
          <h3 class="asowp-text-lg asowp-font-bold asowp-mb-4">
            {{ __("Are you sure?", "all-signs-options-pro") }}
          </h3>
          <p class="asowp-mb-6">
            {{
              __(
                "Do you really want to delete this template? This action cannot be undone.",
                "all-signs-options-pro"
              )
            }}
          </p>
          <div class="asowp-flex asowp-justify-end asowp-gap-3">
            <button
              @click="closeModal"
              class="asowp-inline-flex asowp-items-center asowp-text-sm asowp-font-medium asowp-text-gray-700 asowp-bg-white asowp-border asowp-border-gray-300 asowp-px-4 asowp-py-2 asowp-rounded-lg hover:asowp-bg-gray-50 asowp-cursor-pointer"
            >
              {{ __("No, Cancel", "all-signs-options-pro") }}
            </button>
            <button
              @click="deleteTemplate"
              class="asowp-inline-flex asowp-items-center asowp-text-sm asowp-font-semibold asowp-text-white asowp-bg-red-600 asowp-border-none asowp-px-5 asowp-py-2 asowp-rounded-lg hover:asowp-bg-red-700 asowp-cursor-pointer"
            >
              {{ __("Yes, Delete", "all-signs-options-pro") }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import api from "@/admin/Api/api";
import { __ } from "@wordpress/i18n";
import toastMessage from "@/admin/utils/functions";
import router from "@/admin/router";

const isNewTemplate = ref(false);
const openCategoryModal = ref(false);
const openModal = ref(false);
const category = ref("");
const template = ref({
  name: "",
  categoryId: "",
  configId: 0,
  basePrice: 0,
  prevImg: "",
  realImg: "",
  enableAddToCart: true,
  enablePreviewImage: false,
  showOnFrontend: true,
  data: {
    templateData: {},
    cartData: {},
  },
});
const isEmptyName = ref(false);
const isEmptyConfig = ref(false);
const currencySumbol = asowp_data.currencySymbol;
const templates = ref([]);
const template_id = ref(null);
const categories = ref([]);
const configurations = ref([]);
const isFetching = ref(true);
const isDelete = ref(false);
const isEdit = ref(false);
const isLoading = ref(false);
const search = ref("");
const selectedCategory = ref("all");

const categoryMap = computed(() => {
  const map = {};
  if (Array.isArray(categories.value)) {
    categories.value.forEach((cat) => {
      map[cat.value] = cat.name;
    });
  }
  return map;
});

const configurationMap = computed(() => {
  const map = {};
  if (Array.isArray(configurations.value)) {
    configurations.value.forEach((config) => {
      map[config.value] = config.name;
    });
  }
  return map;
});

const filteredTemplates = computed(() => {
  let list = templates.value;
  if (selectedCategory.value !== "all") {
    list = list.filter(
      (tpl) => String(tpl.categoryId) === String(selectedCategory.value)
    );
  }
  const term = search.value.trim().toLowerCase();
  if (term) {
    list = list.filter((tpl) =>
      (tpl.name || "").toLowerCase().includes(term)
    );
  }
  return list;
});

const normalizeTemplates = (result) => {
  const list = [];
  const groups = Array.isArray(result?.templates) ? result.templates : [];
  groups.forEach((group) => {
    if (!Array.isArray(group)) {
      return;
    }
    group.forEach((tpl, index) => {
      if (tpl && typeof tpl === "object") {
        list.push({ ...tpl, _index: index });
      }
    });
  });
  return list;
};

const normalizeCategories = (data) => {
  if (Array.isArray(data)) {
    if (data.length === 0) {
      return [];
    }
    if (Object.prototype.hasOwnProperty.call(data[0], "value")) {
      return data;
    }
  }
  if (data && typeof data === "object") {
    return Object.keys(data).map((key) => ({
      value: key,
      name: data[key],
    }));
  }
  return [];
};

const fetchTemplates = async (searchTerm = "") => {
  const query = searchTerm ? `?s=${encodeURIComponent(searchTerm)}` : "";
  const result = await api.getAllTemplates(query);
  templates.value = normalizeTemplates(result);
  configurations.value = Array.isArray(result?.configurations)
    ? result.configurations
    : [];
  categories.value = normalizeCategories(result?.categories);
};

const handleSearchChange = async () => {
  isFetching.value = true;
  await fetchTemplates(search.value.trim());
  isFetching.value = false;
};

const searchInputEmpty = async () => {
  if (search.value.trim() === "") {
    isFetching.value = true;
    await fetchTemplates();
    isFetching.value = false;
  }
};

const goToTemplate = (templateData, key) => {
  router
    .push("/configs/template/" + templateData.configId + "/" + key)
    .then(() => {
      window.location.reload();
    });
};

onMounted(async () => {
  isFetching.value = true;
  await fetchTemplates();
  isFetching.value = false;
});

const selectTemplatePrevImg = async (e) => {
  e.preventDefault();
  var uploader = wp
    .media({
      title: __("Select Template Preview Image", "all-signs-options-pro"),
      button: {
        text: __("Select Image", "all-signs-options-pro"),
      },
      multiple: false,
    })
    .on("select", function () {
      var selection = uploader.state().get("selection");
      selection.map(function (attachment) {
        attachment = attachment.toJSON();
        if (attachment.type == "image") {
          template.value.prevImg = attachment.url;
        }
      });
    })
    .open();
};

const selectTemplateRealImg = async (e) => {
  e.preventDefault();
  var uploader = wp
    .media({
      title: __("Select Template Usage Image", "all-signs-options-pro"),
      button: {
        text: __("Select Image", "all-signs-options-pro"),
      },
      multiple: false,
    })
    .on("select", function () {
      var selection = uploader.state().get("selection");
      selection.map(function (attachment) {
        attachment = attachment.toJSON();
        if (attachment.type == "image") {
          template.value.realImg = attachment.url;
        }
      });
    })
    .open();
};

const saveCategory = async () => {
  if (!category.value.trim()) {
    return;
  }
  isLoading.value = true;
  const save = await api.createCategory(category.value);
  if (save.success) {
    categories.value = normalizeCategories(save.categories);
    template.value.categoryId = save.key;
    category.value = "";
    isLoading.value = false;
    closeCategoryModal();
    toastMessage(save.message);
  } else {
    isLoading.value = false;
    toastMessage(save.message, "error");
    closeCategoryModal();
    category.value = "";
  }
};

const saveTemplate = async () => {
  isEmptyName.value = false;
  isEmptyConfig.value = false;
  if (template.value.name.trim() !== "" && template.value.configId != 0) {
    isLoading.value = true;
    const result = await api.createTemplate(template.value);
    if (result.success) {
      await fetchTemplates();
      isLoading.value = false;
      isNewTemplate.value = false;
      toastMessage(result.message);
      template.value = {
        name: "",
        categoryId: "",
        configId: 0,
        basePrice: 0,
        prevImg: "",
        realImg: "",
        enableAddToCart: false,
        enablePreviewImage: false,
        showOnFrontend: true,
        data: {
          templateData: {},
          cartData: {},
        },
      };
    } else {
      isLoading.value = false;
      isNewTemplate.value = false;
      toastMessage(result.message);
      template.value = {
        name: "",
        categoryId: "",
        configId: 0,
        basePrice: 0,
        prevImg: "",
        realImg: "",
        enableAddToCart: false,
        enablePreviewImage: false,
        showOnFrontend: true,
        data: {
          templateData: {},
          cartData: {},
        },
      };
    }
  } else if (template.value.configId == 0) {
    isEmptyConfig.value = true;
  } else if (template.value.name.trim() == "") {
    isEmptyName.value = true;
  }
};

const selectTemplate = async (key, temp, del = false) => {
  if (del) {
    isDelete.value = true;
    openModal.value = true;
  } else {
    isEdit.value = true;
    isNewTemplate.value = true;
  }
  template_id.value = key;
  template.value = { showOnFrontend: true, ...temp };
  delete template.value._index;
  isEmptyName.value = false;
  isEmptyConfig.value = false;
};

const updateTemplate = async () => {
  isEmptyName.value = false;
  isEmptyConfig.value = false;
  if (template.value.name.trim() !== "" && template.value.configId != 0) {
    isLoading.value = true;
    const result = await api.updateTemplate(template_id.value, template.value);
    if (result.success) {
      await fetchTemplates();
      isLoading.value = false;
      isNewTemplate.value = false;
      isEdit.value = false;
      template_id.value = null;
      if (result.success == true) {
        toastMessage(result.message);
      } else {
        toastMessage(result.message, "warning");
      }
      template.value = {
        name: "",
        categoryId: "",
        configId: 0,
        basePrice: 0,
        prevImg: "",
        realImg: "",
        enableAddToCart: false,
        enablePreviewImage: false,
        showOnFrontend: true,
        data: {
          templateData: {},
          cartData: {},
        },
      };
    } else {
      isLoading.value = false;
      isNewTemplate.value = false;
      isEdit.value = false;
      template_id.value = null;
      toastMessage(result.message, "error");
      template.value = {
        name: "",
        categoryId: "",
        configId: 0,
        basePrice: 0,
        prevImg: "",
        realImg: "",
        enableAddToCart: false,
        enablePreviewImage: false,
        showOnFrontend: true,
        data: {
          templateData: {},
          cartData: {},
        },
      };
    }
  } else if (template.value.configId == 0) {
    isEmptyConfig.value = true;
  } else if (template.value.name.trim() == "") {
    isEmptyName.value = true;
  }
};

const saveOrUpdate = () => {
  if (isEdit.value) {
    updateTemplate();
  } else {
    saveTemplate();
  }
};

const deleteTemplate = async () => {
  isLoading.value = true;
  const result = await api.deleteTemplate(
    template.value.configId,
    template_id.value
  );
  if (result.success) {
    await fetchTemplates();
    isLoading.value = false;
    isDelete.value = false;
    template_id.value = null;
    openModal.value = false;
    if (result.success == true) {
      toastMessage(result.message);
    } else {
      toastMessage(result.message, "warning");
    }
    template.value = {
      name: "",
      categoryId: "",
      configId: 0,
      basePrice: 0,
      prevImg: "",
      realImg: "",
      enableAddToCart: false,
      enablePreviewImage: false,
      showOnFrontend: true,
      data: {
        templateData: {},
        cartData: {},
      },
    };
  } else {
    isLoading.value = false;
    isDelete.value = false;
    template_id.value = null;
    openModal.value = false;
    toastMessage(result.message, "error");
    template.value = {
      name: "",
      categoryId: "",
      configId: 0,
      basePrice: 0,
      realImg: "",
      prevImg: "",
      enableAddToCart: false,
      enablePreviewImage: false,
      showOnFrontend: true,
      data: {
        templateData: {},
        cartData: {},
      },
    };
  }
};

const back = () => {
  isNewTemplate.value = false;
  isLoading.value = false;
  isDelete.value = false;
  template_id.value = null;
  isEdit.value = false;
  template.value = {
    name: "",
    categoryId: "",
    configId: 0,
    basePrice: 0,
    prevImg: "",
    realImg: "",
    enableAddToCart: false,
    enablePreviewImage: false,
    showOnFrontend: true,
    data: {
      templateData: {},
      cartData: {},
    },
  };
  category.value = "";
  isEmptyName.value = false;
  isEmptyConfig.value = false;
};

const closeCategoryModal = () => {
  openCategoryModal.value = false;
  category.value = "";
};

const closeModal = () => {
  openModal.value = false;
  template.value = {
    name: "",
    categoryId: "",
    configId: 0,
    basePrice: 0,
    prevImg: "",
    realImg: "",
    enableAddToCart: false,
    enablePreviewImage: false,
    showOnFrontend: true,
    data: {
      templateData: {},
      cartData: {},
    },
  };
  isDelete.value = false;
};
</script>
