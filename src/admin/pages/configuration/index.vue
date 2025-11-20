<template>
  <div class="asowp-space-y-2 asowp-w-full">
    <div v-if="step == 0 && !openModal" class="asowp-space-y-2">
      <div
        class="asowp-sticky asowp-top-[20px] asowp-w-full asowp-z-[999] asowp-rounded-xl asowp-bg-[#fff] asowp-border asowp-border-solid asowp-border-[#e6e6e6]"
      >
        <div class="asowp-px-4 asowp-flex">
          <div class="asowp-font-bold asowp-py-4 asowp-w-[50%]">
            Configurations list
          </div>
          <div
            class="asowp-flex asowp-justify-end asowp-items-center asowp-w-[50%]"
            v-if="canAddNew"
          >
            <div class="">
              <button
                class="asowp-flex asowp-w-fit asowp-rounded-[10px] asowp-bg-[#016464] asowp-px-4 asowp-space-x-2 asowp-p-1.5 asowp-border-none asowp-text-white asowp-opacity-90 hover:asowp-opacity-100 asowp-cursor-pointer asowp-h-[30px] asowp-flex asowp-items-center asowp-justify-center"
                @click="addConfig"
              >
                <svg
                  class="asowp-w-5 asowp-h-5"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="plus-lg">
                    <path
                      id="Vector"
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M11 2.75C11.1823 2.75 11.3572 2.82243 11.4861 2.95136C11.6151 3.0803 11.6875 3.25516 11.6875 3.4375V10.3125H18.5625C18.7448 10.3125 18.9197 10.3849 19.0486 10.5139C19.1776 10.6428 19.25 10.8177 19.25 11C19.25 11.1823 19.1776 11.3572 19.0486 11.4861C18.9197 11.6151 18.7448 11.6875 18.5625 11.6875H11.6875V18.5625C11.6875 18.7448 11.6151 18.9197 11.4861 19.0486C11.3572 19.1776 11.1823 19.25 11 19.25C10.8177 19.25 10.6428 19.1776 10.5139 19.0486C10.3849 18.9197 10.3125 18.7448 10.3125 18.5625V11.6875H3.4375C3.25516 11.6875 3.0803 11.6151 2.95136 11.4861C2.82243 11.3572 2.75 11.1823 2.75 11C2.75 10.8177 2.82243 10.6428 2.95136 10.5139C3.0803 10.3849 3.25516 10.3125 3.4375 10.3125H10.3125V3.4375C10.3125 3.25516 10.3849 3.0803 10.5139 2.95136C10.6428 2.82243 10.8177 2.75 11 2.75Z"
                      fill="white"
                    />
                  </g>
                </svg>
                <div class="asowp-text-[1em]">Add new configuration</div>
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- Table which display all configurations -->
      <div class="asowp-w-full">
        <div
          class="asowp-overflow-hidden asowp-w-[98%] asowp-p-3 asowp-bg-white asowp-rounded-xl asowp-bg-[#fff] asowp-border asowp-border-solid asowp-border-[#e6e6e6]"
        >
          <div
            v-if="!isFetching && configs.length > 0"
            class="asowp-grid asowp-grid-cols-5 asowp-justify-center asowp-items-center asowp-p-3 asowp-text-sm asowp-font-medium asowp-text-gray-900 asowp-bg-[#f7f7f7] asowp-border-b-[1px] asowp-border-t-0 asowp-border-l-0 asowp-border-r-0 asowp-border-solid asowp-border-gray-200 asowp-gap-x-16"
          >
            <div class="asowp-flex asowp-items-center">Name</div>
            <div class="asowp-flex asowp-items-center asowp-justify-center">
              Description
            </div>
            <div class="asowp-flex asowp-items-center asowp-justify-center">Icon</div>
            <div class="asowp-flex asowp-items-center asowp-justify-center">Material type</div>
            <div class="asowp-flex asowp-items-center asowp-justify-center">
              Actions
            </div>
          </div>

          <div
            v-if="isFetching"
            class="asowp-bg-white asowp-rounded-xl asowp-border-solid asowp-border asowp-border-[#D1D1D1] asowp-flex asowp-flex-col asowp-space-y-2 asowp-justify-center asowp-items-center asowp-w-full asowp-h-[306px] p-4"
          >
            <img
              class="asowp-w-[200px] asowp-h-[200px]"
              src="../../../../assets/icons/ic_loading.svg"
              alt=""
            />
          </div>
          <div
            v-if="configs.length == 0 && !isFetching"
            class="asowp-bg-white asowp-rounded-xl asowp-border-solid asowp-border asowp-border-[#D1D1D1] asowp-flex asowp-flex-col asowp-space-y-12 asowp-justify-center asowp-items-center asowp-py-10 asowp-h-[306px]"
          >
            <div
              class="asowp-flex asowp-flex-col asowp-space-y-2 asowp-justify-center asowp-items-center"
            >
              <div>
                <svg width="60" height="60" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fill-rule="evenodd"
                    d="M41.87 24a17.87 17.87 0 11-35.74 0 17.87 17.87 0 0135.74 0zm-3.15 18.96a24 24 0 114.24-4.24L59.04 54.8a3 3 0 11-4.24 4.24L38.72 42.96z"
                    fill="#8C9196"
                  />
                </svg>
              </div>
              <p class="asowp-text-[1.25rem] asowp-font-bold">
                No Configurations found
              </p>
              <p class="asowp-text-[1em]">
                Try changing the filters or search term
              </p>
            </div>
          </div>
          <div
            v-if="!isFetching"
            v-for="(config, key) in configs"
            :key="key"
            @click="goToMaterial(config)"
            class="asowp-cursor-pointer hover:asowp-bg-[#f7f7f7] asowp-grid asowp-items-center asowp-bg-white asowp-grid-cols-5 asowp-px-4 asowp-py-2 asowp-text-sm asowp-text-black asowp-border-b-[1px] asowp-border-t-0 asowp-border-l-0 asowp-border-r-0 asowp-border-solid asowp-border-gray-200 asowp-gap-x-16"
          >
            <div
              class="asowp-text-black asowp-flex dark:asowp-text-black asowp-overflow-hidden asowp-whitespace-nowrap asowp-text-ellipsis asowp-space-x-4"
            >
              <span
                class="asowp-w-5 asowp-h-5 asowp-p-1 asowp-px-1 asowp-flex asowp-justify-center asowp-items-center asowp-rounded-full asowp-bg-[#f0f0f1] asowp-border asowp-border-solid asowp-border-black"
              >
                <span class="asowp-text-[12px]">{{
                  getInitials(config.name)
                }}</span>
              </span>
              <span
                class="asowp-flex asowp-justify-center asowp-items-center"
                >{{ config.name }}</span
              >
            </div>
            <div
              class="asowp-text-black asowp-justify-center asowp-items-center asowp-flex dark:asowp-text-black asowp-overflow-hidden asowp-whitespace-nowrap asowp-text-ellipsis"
            >
              <span>{{ config.description }}</span>
            </div>
            <div class="asowp-text-gray-500 dark:asowp-text-gray-400 asowp-flex asowp-justify-center asowp-items-center">
                <img class="asowp-w-10 asowp-h-10 asowp-rounded" :src="config.icon" alt="" v-if="config.icon!=''">
            </div>
            <div class="asowp-text-gray-500 dark:asowp-text-gray-400 asowp-flex asowp-justify-center asowp-items-center">
                <span>{{ config.data.materials[0]?.type }}</span>
            </div>
            <div
              class="asowp-flex asowp-space-x-2 asowp-justify-center asowp-items-center asowp-text-gray-500 dark:asowp-text-gray-400"
            >
              <!--  <button class="asowp-bg-transparent asowp-p-2 asowp-rounded-md asowp-border-none asowp-cursor-pointer asowp-space-x-1 asowp-flex">
                                <img class="asowp-w-5 asowp-h-5" src="../../../../assets/icons/ic_preview.svg" alt="">
                            </button> -->
              
              <button
                class="asowp-border-none asowp-z-[1] asowp-bg-white asowp-relative"
                @click.stop="handleOpenConfigParams(key)"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="asowp-w-6 asowp-rotate-90 asowp-h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                  />
                </svg>
                <div
                  class="asowp-bg-white asowp-shadow-md asowp-flex asowp-justify-center asowp-items-center asowp-space-x-2 asowp-p-2 asowp-absolute -asowp-top-12 asowp-z-[999] asowp-right-0 asowp-rounded"
                  v-if="showParams[key]"
                  @click.self="showPrams[key] = false"
                >
                  <button
                    class="asowp-bg-transparent asowp-p-2 asowp-rounded-md asowp-border-none asowp-cursor-pointer asowp-space-x-1 asowp-flex"
                    @click.stop="goToPreview(config)"
                  >
                    <img class="asowp-w-5 asowp-h-5" src="../../../../assets/icons/ic_preview.svg" alt="" />
                    <span class="asowp-text-[12px]"> Preview </span>
                  </button>
                  <button
                    class="asowp-bg-transparent asowp-border-none asowp-text-[#2DD05B] asowp-cursor-pointer"
                    @click.stop="selectEditConfig(config)"
                  >
                    <img
                      class="asowp-w-5 asowp-h-5"
                      src="../../../../assets/icons/ic_edit.svg"
                      alt=""
                    />
                    <span class="asowp-text-[12px]"> Edit </span>
                  </button>
                  <button
                    class="asowp-bg-transparent asowp-border-none asowp-text-[#FF6600] asowp-cursor-pointer"
                    @click.stop="selectEditConfig(config, true)"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="asowp-w-6 asowp-h-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"
                      />
                    </svg>
                    <span class="asowp-text-[12px]"> Duplicate </span>
                  </button>
                  <button
                    class="asowp-bg-transparent asowp-border-none asowp-text-[#A00000] asowp-cursor-pointer"
                    @click.stop="selectDeleteConfig(config.id, config.name)"
                  >
                    <img
                      class="asowp-w-5 asowp-h-5"
                      src="../../../../assets/icons/ic_delete.svg"
                      alt=""
                    />
                    <span class="asowp-text-[12px]"> Delete </span>
                  </button>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        class="asowp-flex asowp-items-center asowp-justify-center asowp-translate-y-12 asowp-py-7 asowp-w-full"
        v-if="pages > 1"
      >
        <div class="asowp-grid asowp-grid-cols-5 asowp-gap-4">
          <button
            @click="handlePrevPage"
            :diseabled="page == 1"
            :class="`asowp-text-[#016464] asowp-h-10 asowp-w-10 asowp-p-2 asowp-text-base  asowp-bg-white asowp-font-medium asowp-rounded-lg asowp-flex asowp-items-center asowp-justify-center asowp-border ${
              page == 1
                ? `asowp-cursor-not-allowed asowp-bg-gray-50 asowp-text-[#e5e5e5]`
                : `asowp-cursor-pointer`
            }`"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2.5"
              stroke="currentColor"
              class="w-4 h-4"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </button>

          <div v-for="pg in visiblePages" :key="pg">
            <button
              @click="() => changePage(pg)"
              v-if="pg != page"
              :class="`asowp-text-[#016464] asowp-bg-white asowp-h-10 asowp-w-10 asowp-p-2 asowp-text-base asowp-font-medium asowp-rounded-lg asowp-flex asowp-items-center asowp-justify-center asowp-border asowp-cursor-pointer`"
            >
              {{ pg }}
            </button>
            <button
              @click="() => changePage(pg)"
              :diseabled="pg == page"
              v-if="pg == page"
              :class="`asowp-bg-[#016464] asowp-h-10 w-10 asowp-p-3.5 asowp-text-base asowp-text-white asowp-font-medium asowp-rounded-lg asowp-flex asowp-items-center asowp-justify-center asowp-border asowp-cursor-not-allowed`"
            >
              {{ page }}
            </button>
          </div>
          <button
            @click="handleNextPage"
            :diseabled="page < pages"
            :class="`asowp-text-[#016464] asowp-h-10 asowp-w-10 asowp-p-2 asowp-text-base  asowp-bg-white asowp-font-medium asowp-rounded-lg flex asowp-items-center asowp-justify-center asowp-border ${
              page == pages
                ? `asowp-cursor-not-allowed asowp-bg-gray-50 asowp-text-[#e5e5e5]`
                : `asowp-cursor-pointer`
            }`"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2.5"
              stroke="currentColor"
              class="w-4 h-4"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
    <!-- create a new configuration -->
    <!-- WIZARD: header + stepper -->
    <div
      v-if="isWizard"
      class="asowp-sticky asowp-border asowp-rounded-[13px] asowp-top-[70px] asowp-z-[50] asowp-bg-white asowp-border-[#e6e6e6]"
      style="border: 1px solid #e6e6e6"
    >
      <div class="asowp-px-4 asowp-pt-4 asowp-pb-3">
        <h2 class="asowp-m-0 asowp-text-[18px] asowp-font-bold">
          Create new configuration
        </h2>
        <div class="asowp-mt-2 asowp-text-[12px]">
          Step {{ wizard.step }} of 5
        </div>
        <div
          class="asowp-flex asowp-items-center asowp-space-x-2 asowp-mt-2 asowp-h-[6px]"
        >
          <div
            v-for="n in 5"
            :key="n"
            :class="[
              'asowp-h-[6px] asowp-rounded-full asowp-transition-all',
              n <= wizard.step
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
      <div class="asowp-text-[16px] asowp-font-semibold">
        Choose a product category
      </div>
      <p
        class="asowp-text-[13px] asowp-text-gray-600 asowp-mt-[15px] asowp-mb-[35px]"
      >
        Select a category to automatically load the right options (dimensions,
        print areas, materials, etc.)
      </p>

      <div
        class="asowp-grid asowp-grid-cols-1 md:asowp-grid-cols-3 asowp-gap-4"
      >
        <button
          v-for="cat in categories"
          :key="cat.id"
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
              <component :is="CategoryIcons[cat.icon]" />
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
                Coming soon
              </span>
              <span
                v-else-if="wizard.category === cat.id"
                class="asowp-ml-2 asowp-text-[11px] asowp-bg-[#e6fbf1] asowp-text-[#059669] asowp-px-2 asowp-py-[2px] asowp-rounded"
              >
                selected
              </span>
            </div>
            <p class="asowp-text-[13px] asowp-text-gray-600 asowp-mb-3">
              This category covers various products such as:
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
                >Click to choose</span
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
      </div>
      <p
        class="asowp-text-[12px] asowp-text-gray-500 asowp-mt-[25px] asowp-mb-[30px]"
      >
        Tip: you will refine the type and the personalization level in the next
        steps.
      </p>

      <!-- footer actions -->
      <div
        class="asowp-flex asowp-justify-between asowp-items-center asowp-mt-4"
      >
        <button
          @click="goBack"
          class="asowp-flex asowp-cursor-pointer asowp-items-center asowp-gap-2 asowp-text-[#016464] asowp-bg-white asowp-border asowp-border-[#016464] asowp-rounded-lg asowp-px-4 asowp-py-2"
        >
          <svg
            class="asowp-w-5 asowp-h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path
              d="M15 18l-6-6 6-6"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          Back
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
          Next
        </button>
      </div>
    </div>

    <!-- STEP 2: Select product type -->
    <div
      v-if="isWizard && wizard.step === 2"
      class="asowp-p-4 asowp-rounded-[13px] asowp-bg-[#fff]"
      style="border: 1px solid #e6e6e6"
    >
      <div class="asowp-text-[16px] asowp-font-semibold asowp-mb-[10px]">
        Select product type
      </div>
      <p class="asowp-text-[13px] asowp-text-gray-600 asowp-m-[0px]">
        Now pick a subtype that best matches your product within
        <span class="asowp-font-semibold">
          {{
            categories.find((c) => c.id === wizard.category)?.title || "Signs"
          }}
        </span>
      </p>

      <div
        class="asowp-grid asowp-grid-cols-1 md:asowp-grid-cols-3 asowp-gap-4 asowp-mt-[30px]"
      >
        <button
          v-for="pt in productTypesByCategory[wizard.category] || []"
          :key="pt.id"
          :disabled="pt.disabled"
          @click="!pt.disabled && (wizard.productType = pt.id)"
          :class="[
            'asowp-w-full asowp-pl-[0px] asowp-pr-[0px] asowp-text-left asowp-rounded-xl asowp-border asowp-overflow-hidden asowp-transition-all asowp-shadow-sm',
            wizard.productType === pt.id
              ? 'asowp-border-[#70b8b8] asowp-ring-2 asowp-ring-[#016464]/50'
              : 'asowp-border-[#e5e7eb]',
            pt.disabled
              ? 'asowp-opacity-60 asowp-cursor-not-allowed'
              : 'asowp-cursor-pointer',
          ]"
        >
          <div
            class="asowp-p-4 asowp-h-full asowp-bg-[#f8fafc] hover:asowp-bg-[#e9e9ed]"
          >
            <div class="asowp-flex asowp-items-center asowp-justify-between">
              <div class="asowp-text-[16px] asowp-font-semibold">
                {{ pt.title }}
                <span
                  v-if="pt.comingSoon"
                  class="asowp-ml-2 asowp-align-middle asowp-text-[11px] asowp-bg-[#e5f0ff] asowp-text-[#2563eb] asowp-px-2 asowp-py-[2px] asowp-rounded"
                >
                  Coming soon
                </span>
              </div>
              <span
                class="asowp-w-8 asowp-h-8 asowp-rounded-[5px] asowp-border asowp-flex asowp-items-center asowp-justify-center"
                :class="
                  wizard.productType === pt.id
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

            <p class="asowp-text-[13px] asowp-text-gray-600 asowp-mt-1">
              {{ pt.desc }}
              <a
                class="asowp-underline asowp-text-[12px] asowp-ml-1 asowp-text-gray-500"
                href="javascript:void(0)"
                >See more</a
              >
            </p>
          </div>
        </button>
      </div>

      <p
        class="asowp-text-[12px] asowp-text-gray-500 asowp-mt-[30px] asowp-mb-[30px]"
      >
        Tip: after choosing a subtype, you'll proceed to Level 3 (Simple /
        Advanced / Layers).
      </p>

      <!-- footer actions -->
      <div
        class="asowp-flex asowp-justify-between asowp-items-center asowp-mt-4"
      >
        <button
          @click="goBack"
          class="asowp-flex asowp-cursor-pointer asowp-items-center asowp-gap-2 asowp-text-[#016464] asowp-bg-white asowp-border asowp-border-[#016464] asowp-rounded-lg asowp-px-4 asowp-py-2"
        >
          <svg
            class="asowp-w-5 asowp-h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path
              d="M15 18l-6-6 6-6"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          Back
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
          Next
        </button>
      </div>
    </div>

    <!-- STEP 3: Select material type -->
    <div
      v-if="isWizard && wizard.step === 3"
      class="asowp-p-4 asowp-rounded-[13px] asowp-bg-[#fff]"
      style="border: 1px solid #e6e6e6"
    >
      <div class="asowp-text-[16px] asowp-font-semibold">
        Select material type
      </div>

      <div
        class="asowp-grid asowp-grid-cols-1 md:asowp-grid-cols-3 asowp-gap-4 asowp-mt-[30px]"
      >
        <button
          v-for="mt in materialTypes"
          :key="mt.id"
          :disabled="mt.disabled"
          @click="!mt.disabled && (wizard.materialType = mt.id)"
          :class="[
            'asowp-w-full asowp-pl-[0px] asowp-pr-[0px] asowp-text-left asowp-rounded-xl asowp-border asowp-overflow-hidden asowp-transition-all asowp-shadow-sm',
            wizard.materialType === mt.id
              ? 'asowp-border-[#70b8b8] asowp-ring-2 asowp-ring-[#016464]/50'
              : 'asowp-border-[#e5e7eb]',
            mt.disabled
              ? 'asowp-opacity-60 asowp-cursor-not-allowed'
              : 'asowp-cursor-pointer',
          ]"
        >
          <div
            class="asowp-p-4 asowp-h-full asowp-bg-[#f8fafc] hover:asowp-bg-[#e9e9ed]"
          >
            <div class="asowp-flex asowp-items-center asowp-justify-between">
              <div class="asowp-text-[16px] asowp-font-semibold">
                {{ mt.title }}
                <span
                  v-if="mt.comingSoon"
                  class="asowp-ml-2 asowp-align-middle asowp-text-[11px] asowp-bg-[#e5f0ff] asowp-text-[#2563eb] asowp-px-2 asowp-py-[2px] asowp-rounded"
                >
                  Coming soon
                </span>
              </div>
              <span
                class="asowp-w-8 asowp-h-8 asowp-rounded-[5px] asowp-border asowp-flex asowp-items-center asowp-justify-center"
                :class="
                  wizard.materialType === mt.id
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

            <p class="asowp-text-[13px] asowp-text-gray-600 asowp-mt-1">
              {{ mt.desc }}
            </p>
          </div>
        </button>
      </div>

      <p
        class="asowp-text-[12px] asowp-text-gray-500 asowp-mt-[30px] asowp-mb-[30px]"
      >
        Tip: select a level and you can move on to Demo Data / Templates next.
      </p>

      <!-- footer actions -->
      <div
        class="asowp-flex asowp-justify-between asowp-items-center asowp-mt-4"
      >
        <button
          @click="goBack"
          class="asowp-flex asowp-cursor-pointer asowp-items-center asowp-gap-2 asowp-text-[#016464] asowp-bg-white asowp-border asowp-border-[#016464] asowp-rounded-lg asowp-px-4 asowp-py-2"
        >
          <svg
            class="asowp-w-5 asowp-h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path
              d="M15 18l-6-6 6-6"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          Back
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
          Next
        </button>
      </div>
    </div>

    <!-- STEP 4: Include demo data -->
    <div
      v-if="isWizard && wizard.step === 4"
      class="asowp-p-4 asowp-rounded-[13px] asowp-bg-[#fff]"
      style="border: 1px solid #e6e6e6"
    >
      <div class="asowp-text-[18px] asowp-font-bold">Include demo data</div>
      <p
        class="asowp-text-[13px] asowp-text-gray-600 asowp-mt-[15px] asowp-mb-[30px]"
      >
        Decide whether to preload demo content. If enabled, choose a starting
        template for faster setup.
      </p>

      <!-- … ton Step 4 au-dessus … -->

    <!-- Toggle Yes / No -->
    <div class="asowp-border asowp-rounded-[15px] asowp-bg-[#f5f5f5] asowp-p-5" style="border:1px solid #bdbdbd;">
    <div class="asowp-flex asowp-items-center asowp-justify-between">
        <div>
        <div class="asowp-text-[16px] asowp-font-bold asowp-mb-[15px]">Include demo data?</div>
        <div class="asowp-text-[13px] asowp-text-[#616161]">
            Preload a template to start faster. You can still customize everything later.
        </div>
        </div>

        <div class="asowp-flex asowp-gap-2">
        <button type="button"
            @click="wizard.includeDemo=false"
            :class="['asowp-min-w-[30px] asowp-cursor-pointer asowp-rounded-md asowp-border asowp-px-3 asowp-py-1.5',
                    !wizard.includeDemo ? 'asowp-text-[#016464] asowp-border-[#70b8b8] asowp-ring-2 asowp-ring-[#016464]/50'
                                        : 'asowp-text-gray-700 asowp-border-[#e5e7eb]']">
            No
        </button>
        <button type="button"
            @click="openDemoModal()"
            :class="['asowp-min-w-[30px] asowp-cursor-pointer asowp-rounded-md asowp-border asowp-px-3 asowp-py-1.5',
                    wizard.includeDemo ? 'asowp-text-[#016464] asowp-border-[#70b8b8] asowp-ring-2 asowp-ring-[#016464]/50'
                                        : 'asowp-text-gray-700 asowp-border-[#e5e7eb]']">
            Yes
        </button>
        </div>
    </div>
    </div>

    <!-- ===== Modal: Select a demo ===== -->
    <div v-if="showDemoModal"
        class="asowp-fixed asowp-inset-0 asowp-z-[999] asowp-flex asowp-items-center asowp-justify-center">
    <!-- Backdrop -->
    <div class="asowp-absolute asowp-inset-0 asowp-bg-black asowp-bg-opacity-40" @click="closeDemoModal()"></div>

    <!-- Dialog -->
    <div class="asowp-relative asowp-mt-6 asowp-w-[min(750px,95vw)] asowp-max-h-[calc(100vh-5.75rem)] asowp-max-w-[61.25rem] asowp-rounded-[1rem] asowp-bg-white asowp-shadow-xl asowp-overflow-hidden">
        <!-- Header -->
        <div class="asowp-flex asowp-items-center asowp-bg-[#f3f3f3] asowp-justify-between asowp-px-5 asowp-py-3 asowp-border-solid asowp-border-b asowp-border-r asowp-border-l asowp-border-t asowp-border-[#e5e5e5]">
            <div class="asowp-text-[14px] asowp-font-semibold">Select a demo</div>
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
                        Cancel
                    </button>
                    <button class="asowp-px-4 asowp-py-1.5 asowp-mr-[40px] asowp-rounded-md asowp-text-white asowp-bg-[#016464] hover:asowp-bg-[#028383] asowp-text-[13px] asowp-cursor-pointer"
                            :disabled="!selectedDemo"
                            @click="confirmDemo()">
                        Done
                    </button>
                </div>
            </div>
        </div>



      <p
        class="asowp-text-[12px] asowp-text-gray-500 asowp-mt-[20px] asowp-mb-[30px]"
      >
        Tip: selecting a template speeds up onboarding, but you can also start
        from scratch.
      </p>

      <!-- footer -->
      <div
        class="asowp-flex asowp-justify-between asowp-items-center asowp-mt-4"
      >
        <button
          @click="goBack"
          class="asowp-flex asowp-cursor-pointer asowp-items-center asowp-gap-2 asowp-text-[#016464] asowp-bg-white asowp-border asowp-border-[#016464] asowp-rounded-lg asowp-px-4 asowp-py-2"
        >
          <svg
            class="asowp-w-5 asowp-h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path
              d="M15 18l-6-6 6-6"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          Back
        </button>
        <button
          @click="goNext"
          class="asowp-rounded-lg asowp-cursor-pointer asowp-px-5 asowp-py-2 asowp-text-white asowp-bg-[#016464] hover:asowp-bg-[#028383]"
        >
          Next
        </button>
      </div>
    </div>

    <!-- STEP 5: Finalize -->
    <div
      v-if="isWizard && wizard.step === 5"
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
              >Name configuration</label
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
              configuration name required
            </div>
          </div>

          <!-- Description -->
          <div
            class="asowp-bg-[#f5f5f5] asowp-p-4 asowp-rounded-[13px]"
            style="border: 1px solid #e0e0e0"
          >
            <label
              class="asowp-text-[13px] asowp-text-[#3c3c3c] asowp-font-medium"
              >Description</label
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
              >Upload image</label
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

                Upload image
              </button>
              <div
                v-if="newConfig.icon"
                class="asowp-text-[12px] asowp-text-gray-600 asowp-truncate asowp-max-w-[60%]"
              >
                {{ newConfig.icon }}
              </div>
            </div>
          </div>

          <!-- Product association (optionnel) -->
          <div
            class="asowp-bg-[#f5f5f5] asowp-p-4 asowp-rounded-[13px]"
            style="border: 1px solid #e0e0e0"
          >
            <label
              class="asowp-text-[13px] asowp-text-[#3c3c3c] asowp-font-medium"
              >Product associated with configuration</label
            >
            <div class="asowp-flex asowp-items-center asowp-gap-2 asowp-mt-2">
              <button
                type="button"
                @click="selectConfigPopImg"
                class="asowp-text-[13px] asowp-cursor-pointer asowp-rounded-md asowp-bg-[#016464] asowp-text-[#fff] asowp-px-3 asowp-py-1.5"
              >
                select
              </button>
              <div
                v-if="newConfig.popImg"
                class="asowp-text-[12px] asowp-text-gray-600 asowp-truncate asowp-max-w-[60%]"
              >
                {{ newConfig.popImg }}
              </div>
            </div>
          </div>
        </div>

        <!-- Summary -->
        <aside
          class="asowp-mt-6 md:asowp-mt-0 asowp-h-fit asowp-border asowp-rounded-lg asowp-bg-[#f5f5f5] asowp-p-4"
          style="border: 1px solid #e0e0e0"
        >
          <div class="asowp-text-[14px] asowp-font-bold asowp-mb-2">
            Summary
          </div>
          <dl class="asowp-text-[13px] asowp-text-gray-700 asowp-space-y-1">
            <div class="asowp-flex asowp-text-[#777777]">
              <dt>Category:</dt>
              <dd class="asowp-font-bold">
                {{ categories.find((c) => c.id === wizard.category)?.title }}
              </dd>
            </div>
            <div class="asowp-flex asowp-text-[#777777]">
              <dt>Product type:</dt>
              <dd class="asowp-font-bold">
                {{
                  productTypesByCategory[wizard.category]?.find(
                    (p) => p.id === wizard.productType
                  )?.title
                }}
              </dd>
            </div>
            <div class="asowp-flex asowp-text-[#777777]">
              <dt>Material type:</dt>
              <dd class="asowp-font-bold">
                {{
                  materialTypes.find((m) => m.id === wizard.materialType)?.title
                }}
              </dd>
            </div>
            <div class="asowp-flex asowp-text-[#777777]">
              <dt>Demo data:</dt>
              <dd class="asowp-font-bold">
                {{ wizard.includeDemo ? "Yes" : "No" }}
              </dd>
            </div>
            <div
              v-if="wizard.includeDemo"
              class="asowp-flex asowp-text-[#777777]"
            >
              <dt>Template:</dt>
              <dd class="asowp-font-bold">
                {{ demoTemplates.find((t) => t.id === selectedDemo)?.title }}
              </dd>
            </div>
            <div class="asowp-flex asowp-text-[#777777]">
              <dt>Name:</dt>
              <dd class="asowp-font-bold">{{ newConfig.name || "—" }}</dd>
            </div>
          </dl>
        </aside>
      </div>

      <!-- footer -->
      <div
        class="asowp-flex asowp-justify-between asowp-items-center asowp-mt-6"
      >
        <button
          @click="goBack"
          class="asowp-flex asowp-cursor-pointer asowp-items-center asowp-gap-2 asowp-text-[#016464] asowp-bg-white asowp-border asowp-border-[#016464] asowp-rounded-lg asowp-px-4 asowp-py-2"
        >
          <svg
            class="asowp-w-5 asowp-h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path
              d="M15 18l-6-6 6-6"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          Back
        </button>

        <button
          @click="includeMetaData(wizard.includeDemo)"
          :disabled="!newConfig.name?.trim() || isLoading"
          :class="[
            'asowp-rounded-lg asowp-px-5 asowp-py-2 asowp-text-white',
            newConfig.name?.trim() && !isLoading
              ? 'asowp-bg-[#016464] hover:asowp-bg-[#028383] asowp-cursor-pointer'
              : 'asowp-bg-gray-300 asowp-cursor-not-allowed',
          ]"
        >
          {{ isLoading ? "Saving…" : "Finish" }}
        </button>
      </div>
    </div>

    <!-- Delete Modal-->
    <div
      v-if="openModal"
      @click.self="closeModal"
      class="asowp-z-[999] asowp-bg-gray-400 asowp-overflow-y-auto asowp-overflow-x-hidden asowp-fixed asowp-top-0 asowp-right-[25%] asowp-left-[75%] asowp-flex asowp-justify-center asowp-items-center asowp-w-full md:asowp-inset-0 asowp-h-full"
    >
      <div
        class="asowp-relative asowp-p-4 asowp-w-full asowp-max-w-md asowp-max-h-full"
      >
        <div
          class="asowp-relative asowp-bg-white asowp-rounded-lg asowp-shadow dark:bg-gray-700"
        >
          <button
            @click.stop="closeModal"
            type="button"
            :class="`${
              isLoading ? 'asowp-cursor-not-allowed' : 'asowp-cursor-pointer'
            } asowp-absolute asowp-top-3 asowp-end-2.5 asowp-text-gray-400 asowp-bg-transparent hover:bg-gray-200 hover:text-gray-900 asowp-rounded-lg asowp-text-sm asowp-w-8 asowp-h-8 asowp-ms-auto asowp-inline-flex asowp-justify-center asowp-items-center dark:hover:bg-gray-600 dark:hover:text-white`"
            data-modal-hide="popup-modal"
          >
            <svg
              class="asowp-w-3 asowp-h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span class="asowp-sr-only">Close modal</span>
          </button>
          <div class="asowp-p-4 md:p-5 asowp-text-center">
            <svg
              class="asowp-mx-auto asowp-mb-4 asowp-text-gray-400 asowp-w-12 asowp-h-12 dark:text-gray-200"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            <h3
              class="asowp-mb-5 asowp-text-lg asowp-font-normal asowp-text-gray-500 dark:text-gray-400"
            >
              Are you sure you want to delete this configuration?
            </h3>
            <input
              v-model="deleteConfig.name"
              readonly
              class="asowp-rounded asowp-w-full asowp-h-[35px] asowp-text-center asowp-p-4 asowp-my-2 asowp-border-none"
            />
            <button
              :disabled="isLoading"
              @click="delConfig"
              data-modal-hide="popup-modal"
              type="button"
              :class="`asowp-border-solid asowp-text-white ${
                !isLoading
                  ? 'asowp-bg-red-600 asowp-cursor-pointer'
                  : 'asowp-bg-red-700 asowp-cursor-not-allowed'
              } hover:bg-red-800 focus:ring-4 focus:outline-none asowp-my-2 asowp-border-none  focus:ring-red-300 dark:focus:ring-red-800 asowp-font-medium asowp-rounded-lg asowp-text-sm asowp-inline-flex asowp-items-center asowp-px-5 asowp-py-2.5 asowp-text-center`"
            >
              <img
                src="../../../../assets/icons/ic_loading_gray.svg"
                class="asowp-w-5 asowp-w-5"
                v-if="isLoading"
              />
              Yes, I'm sure
            </button>
            <button
              :disabled="isLoading"
              @click.stop="closeModal"
              data-modal-hide="popup-modal"
              type="button"
              :class="`asowp-border-solid asowp-py-2.5 asowp-px-5 asowp-ms-3 asowp-text-sm asowp-font-medium asowp-text-gray-900 asowp-my-2  asowp-border-gray-500 asowp-border-white focus:outline-none asowp-bg-white asowp-rounded-lg asowp-border asowp-border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 ${
                isLoading ? 'asowp-cursor-not-allowed' : 'asowp-cursor-pointer'
              }`"
            >
              No, cancel
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- Clone Modal-->
    <div
      v-if="openCloneModal"
      @click.self="closeCloneModal"
      class="asowp-z-[999] asowp-bg-gray-400 asowp-overflow-y-auto asowp-overflow-x-hidden asowp-fixed asowp-top-0 asowp-right-[25%] asowp-left-[75%] asowp-flex asowp-justify-center asowp-items-center asowp-w-full md:asowp-inset-0 asowp-h-full"
    >
      <div
        class="asowp-relative asowp-p-4 asowp-w-full asowp-max-w-md asowp-max-h-full"
      >
        <div
          class="asowp-relative asowp-bg-white asowp-rounded-lg asowp-shadow dark:bg-gray-700"
        >
          <button
            @click.stop="closeCloneModal"
            type="button"
            :class="`${
              isLoading ? 'asowp-cursor-not-allowed' : 'asowp-cursor-pointer'
            } asowp-absolute asowp-top-3 asowp-end-2.5 asowp-text-gray-400 asowp-bg-transparent hover:bg-gray-200 hover:text-gray-900 asowp-rounded-lg asowp-text-sm asowp-w-8 asowp-h-8 asowp-ms-auto asowp-inline-flex asowp-justify-center asowp-items-center dark:hover:bg-gray-600 dark:hover:text-white`"
            data-modal-hide="popup-modal"
          >
            <svg
              class="asowp-w-3 asowp-h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span class="asowp-sr-only">Close modal</span>
          </button>
          <div class="asowp-p-4 md:p-5 asowp-text-center">
            <svg
              class="asowp-mx-auto asowp-mb-4 asowp-text-gray-400 asowp-w-12 asowp-h-12 dark:text-gray-200"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            <h3
              class="asowp-mb-5 asowp-text-lg asowp-font-normal asowp-text-gray-500 dark:text-gray-400"
            >
              Give the name of the new configuration, which will be an imitation
              of the current one.
            </h3>
            <input
              v-model="newConfig.name"
              class="asowp-rounded asowp-w-full asowp-h-[35px] asowp-text-start asowp-p-4 asowp-my-2 asowp-border-solid asowp-border-gray-400"
            />
            <button
              @click="addNewConfig(newConfig)"
              data-modal-hide="popup-modal"
              type="button"
              :class="`asowp-border-solid asowp-text-white ${
                !isLoading
                  ? 'asowp-bg-[#016464] asowp-cursor-pointer'
                  : 'asowp-bg-[#016464] asowp-cursor-not-allowed'
              } hover:bg-red-800 focus:ring-4 focus:outline-none asowp-my-2 asowp-border-none  focus:ring-red-300 dark:focus:ring-red-800 asowp-font-medium asowp-rounded-lg asowp-text-sm asowp-inline-flex asowp-items-center asowp-px-5 asowp-py-2.5 asowp-text-center`"
            >
              <img
                src="../../../../assets/icons/ic_loading_gray.svg"
                class="asowp-w-5 asowp-w-5"
                v-if="isLoading"
                :disabled="isLoading"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="asowp-w-5 asowp-w-5"
                v-if="!isLoading"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m4.5 12.75 6 6 9-13.5"
                />
              </svg>

              Clone
            </button>
            <button
              @click.stop="closeCloneModal"
              data-modal-hide="popup-modal"
              type="button"
              :class="`asowp-border-solid asowp-py-2.5 asowp-px-5 asowp-ms-3 asowp-text-sm asowp-font-medium asowp-text-gray-900 asowp-my-2  asowp-border-gray-500 asowp-border-white focus:outline-none asowp-bg-white asowp-rounded-lg asowp-border asowp-border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 ${
                isLoading ? 'asowp-cursor-not-allowed' : 'asowp-cursor-pointer'
              }`"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, h, ref } from "vue";
import api from "@/admin/Api/api";
import toastMessage from "@/admin/utils/functions";
import Multiselect from "@vueform/multiselect";
import router from "@/admin/router";

const isNewConfig = ref(false);
const showParams = ref([]);
const openCloneModal = ref(false);
const newConfig = ref({
  name: "",
  description: "",
  icon: "",
  popImg: "",
});

const deleteConfig = ref({
  id: null,
  name: "",
});

const selectedDemo = ref("acrylic");
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
          {
            name: "Blue",
            codeHex: "#004f86",
            prevImg: "",
            additionalPrice: 0,
          },
          {
            name: "Red",
            codeHex: "#c4271d",
            prevImg: "",
            additionalPrice: 0,
          },
          {
            name: "Green",
            codeHex: "#009251",
            prevImg: "",
            additionalPrice: 0,
          },
          {
            name: "Yellow",
            codeHex: "#fee900",
            prevImg: "",
            additionalPrice: 0,
          },
          {
            name: "Gray",
            codeHex: "#4f5756",
            prevImg: "",
            additionalPrice: 0,
          },
          {
            name: "Pink",
            codeHex: "#bc4077",
            prevImg: "",
            additionalPrice: 0,
          },
          {
            name: "Purple",
            codeHex: "#554585",
            prevImg: "",
            additionalPrice: 0,
          },
          {
            name: "Orange",
            codeHex: "#e15616",
            prevImg: "",
            additionalPrice: 0,
          },
          {
            name: "Brown",
            codeHex: "#523d2a",
            prevImg: "",
            additionalPrice: 0,
          },
          {
            name: "Gold",
            codeHex: "#e9a956",
            prevImg: "",
            additionalPrice: 0,
          },
          {
            name: "Silver",
            codeHex: "#e9e9e9",
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
      uploadDesign: {
        activate: false,
        link: "",
        phraseSubmitCustom: "Take a customization",
        helpContent: "",
      },
      images: {
        resetAllIcon: "",
        undoIcon: "",
        redoIcon: "",
        changeIconPreview: "",
        changeIconHelp: "",
        changeIconImport: "",
        changeIconShare: "",
        changeIconSaveProject: "",
        changeIconMaterial: "",
        changeIconShape: "",
        changeIconFixingMethod: "",
        changeIconProduct: "",
        changeIconSize: "",
        changeIconText: "",
        changeIconColor: "",
        changeIconDownload: "",
        changeIconBorder: "",
        changeIconImage: "",
      },
      visualizer: {
        textCanvasCenterH: "centerH",
        textCanvasCenterV: "centerV",
        textCanvasDelete: "delete",
        textCanvasEdit: "Edit",
        textCanvasClone: "Clone",
        titleHeader: "Make Your Own Sign",
        textButtonRefresh: "Restart all",
        textButtonAdditonnalOptions: "Additionals",
        textAdditonnalOptionsHeader: "Additionals Options",
        textButtonBack: "Undo",
        textButtonNext: "Redo",
        textBeforePrice: "",
        textAfterPrice: "TVA Include",
        textButtonFinish: "Finish",
        textAddToCart: "Add To Cart",
        textPreview: "Preview",
        textShare: "Share",
        textImport: "Import",
        textDownload: "Download",
        textMoveUp: "Move Up",
        textMoveDown: "Move Down",
        textSave: "Save",
        textHelp: "Help",
        textMaterial: "Material",
        textSize: "Size",
        textPosition: "Position",
        textAngle: "Angle",
        textWidth: "Width",
        textHeight: "Height",
        textRight: "Right",
        textLeft: "Left",
        textTop: "Top",
        textBottom: "Bottom",
        customSize: "Custom Size",
        customSizeButtonDone: "Done",
        thickness: "Thickness",
        textShape: "Shape",
        textFixingMethods: "Fixing Methods",
        textColor: "Color",
        textOptionText: "Text",
        textBorder: "Border",
        textProduct: "Product",
        textImage: "Image",
        textExample: "example",
        resetModalText: "Reset all for real ??",
        resetModalYes: "Yes",
        resetModalNo: "No",
      },
    },
    themeColors: {
      skin: "default",
      colors: {
        canvas: {
          backgroundColor: "#f4f8fa",
          borderColor: "#c3cfd6",
        },
        bars: {
          titleColor: "#000000",
          backgroundColor: "#ffffff",
          reset: {
            textColor: "#000000",
            hoverTextColor: "#dd3232",
            backgroundColor: "#ffffff",
            hoverBackgroundColor: "#f4f8fa",
            borderColor: "#ffffff",
            hoverBorderColor: "#f4f8fa",
            modalBackgroundColor: "#000000",
            modalContainerBackground: "#ffffff",
            modalTextColor: "#000000",
            modalYesButtonBackgroundColor: "#f4f8fa",
            modalYesButtonTextColor: "#000000",
            modalNoButtonBackgroundColor: "#dc2626",
            modalNoButtonTextColor: "#ffffff",
          },
          undoRedo: {
            textColor: "#000000",
            hoverTextColor: "#016464",
            backgroundColor: "#ffffff",
            hoverBackgroundColor: "#f4f8fa",
            borderColor: "#ffffff",
            hoverBorderColor: "#f4f8fa",
            disabledBackgroundColor: "#ffffff",
            disabledTextColor: "#c3cfd6",
          },
          preview: {
            textColor: "#000000",
            hoverTextColor: "#016464",
            backgroundColor: "#ffffff",
            hoverBackgroundColor: "#f4f8fa",
            borderColor: "#ffffff",
            hoverBorderColor: "#f4f8fa",
          },
          help: {
            textColor: "#ffffff",
            hoverTextColor: "#ffffff",
            backgroundColor: "#016464",
            hoverBackgroundColor: "#016464",
            borderColor: "#016464",
            hoverBorderColor: "#016464",
          },
          price: {
            backgroundColor: "#ffffff",
            textColor: "#000000",
            textAfterColor: "#000000",
            textBeforeColor: "#000000",
          },
        },
        optionsSideBar: {
          backgroundColor: "#eef3f6",
          scrollButtonsBackgroundColor: "#4a4a4a",
          scrollButtonsHoverBackgroundColor: "#74848d",
          scrollButtonsTextColor: "#ffffff",
          scrollButtonsHoverTextColor: "#ffffff",
          options: {
            buttons: {
              backgroundColor: "#ffffff",
              hoverBackgroundColor: "#ffffff",
              textColor: "#000000",
              hoverTextColor: "#016464",
              hovertextColor: "#016464",
            },
            modals: {
              headerBackgroundColor: "#016464",
              headerTextColor: "#ffffff",
              textColor: "#000000",
              option: {
                textColor: "#000000",
                hoverBackgroundColor: "#eef3f6",
                hoverTextColor: "#000000",
                activeTextColor: "#016464",
              },
              buttons: {
                backgroundColor: "#016464",
                hoverBackgroundColor: "#028383",
                textColor: "#ffffff",
                hoverTextColor: "#ffffff",
              },
              backgroundColor: "#ffffff",
            },
          },
        },
        objectsOptions: {
          backgroundColor: "#ffffff",
          edit: {
            buttonColor: "#ffffff",
            hoverButtonColor: "#787878",
            textColor: "#000000",
            hoverTextColor: "#ffffff",
          },
          clone: {
            buttonColor: "#ffffff",
            hoverButtonColor: "#787878",
            textColor: "#000000",
            hoverTextColor: "#ffffff",
          },
          delete: {
            buttonColor: "#ffffff",
            hoverButtonColor: "#787878",
            textColor: "#dd3232",
            hoverTextColor: "#dd3232",
          },
          center: {
            buttonColor: "#ffffff",
            hoverButtonColor: "#787878",
            textColor: "#000000",
            hoverTextColor: "#ffffff",
          },
        },
        recaps: {
          headerBackgroundColor: "#058585",
          headerTextColor: "#ffffff",
          backgroundColor: "#ffffff",
          optionTextColor: "#000000",
          optionHoverBackgroundColor: "#eef3f6",
          optionHoverTextColor: "#000000",
          optionBorderColor: "#eef3f6",
          optionHoverBorderColor: "#eef3f6",
          buttonFinishBackgroundColor: "#febd52",
          buttonFinishTextColor: "#14213d",
          buttonFinishHoverBackgroundColor: "#fcac29",
          buttonFinishHoverTextColor: "#313e52",
          buttonAddToCartBackgroundColor: "#febd52",
          buttonAddToCartHoverBackgroundColor: "#fcac29",
          buttonAddToCartTextColor: "#14213d",
          buttonAddToCartHoverTextColor: "#313e52",
          buttonEditBackgroundColor: "#016464",
          buttonEditHoverBackgroundColor: "#058585",
          buttonEditTextColor: "#ffffff",
          buttonEditHoverTextColor: "#f4f8fa",
        },
      },
      customCSS: "",
    },
    sortOptions: [],
  },
  additionalOptions: [],
});
const metaConfigs = ref({
  acrylic: {
    materials: [
      {
        icon: "",
        name: "Acrylic",
        type: "simple",
        popImg: "",
        description: "",
        data: {
          sizes: {
            allSizes: [
              {
                isDefault: true,
                label: "100x50",
                width: 100,
                height: 50,
                startPriceAtChar: 1,
                textNumber: 0,
                maxTextChar: -1,
                charPrice: 0,
                basePrice: 0,
              },
              {
                isDefault: false,
                label: "100x100",
                width: 100,
                height: 100,
                startPriceAtChar: 1,
                textNumber: 0,
                maxTextChar: -1,
                charPrice: 0,
                basePrice: 0,
              },
              {
                isDefault: false,
                label: "150x100",
                width: 150,
                height: 100,
                startPriceAtChar: 1,
                textNumber: 0,
                maxTextChar: -1,
                charPrice: 0,
                basePrice: 0,
              },
              {
                isDefault: false,
                label: "200x100",
                width: 200,
                height: 100,
                startPriceAtChar: 1,
                textNumber: 0,
                maxTextChar: -1,
                charPrice: 0,
                basePrice: 0,
              },
              {
                isDefault: false,
                label: "250x100",
                width: 250,
                height: 100,
                startPriceAtChar: 1,
                textNumber: 0,
                maxTextChar: -1,
                charPrice: 0,
                basePrice: 0,
              },
              {
                isDefault: false,
                label: "250x150",
                width: 250,
                height: 150,
                startPriceAtChar: 1,
                textNumber: 0,
                maxTextChar: -1,
                charPrice: 0,
                basePrice: 0,
              },
              {
                isDefault: false,
                label: "300x100",
                width: 300,
                height: 100,
                startPriceAtChar: 1,
                textNumber: 0,
                maxTextChar: -1,
                charPrice: 0,
                basePrice: 0,
              },
              {
                isDefault: false,
                label: "300x150",
                width: 300,
                height: 150,
                startPriceAtChar: 1,
                textNumber: 0,
                maxTextChar: -1,
                charPrice: 0,
                basePrice: 0,
              },
              {
                isDefault: false,
                label: "300x200",
                width: 300,
                height: 200,
                startPriceAtChar: 1,
                textNumber: 0,
                maxTextChar: -1,
                charPrice: 0,
                basePrice: 0,
              },
              {
                isDefault: false,
                label: "400x300",
                width: 400,
                height: 300,
                startPriceAtChar: 1,
                textNumber: 0,
                maxTextChar: -1,
                charPrice: 0,
                basePrice: 0,
              },
              {
                isDefault: false,
                label: "400x100",
                width: 400,
                height: 100,
                startPriceAtChar: 1,
                textNumber: 0,
                maxTextChar: -1,
                charPrice: 0,
                basePrice: 0,
              },
              {
                isDefault: false,
                label: "500x300",
                width: 500,
                height: 300,
                startPriceAtChar: 1,
                textNumber: 0,
                maxTextChar: -1,
                charPrice: 0,
                basePrice: 0,
              },
              {
                isDefault: false,
                label: "500x400",
                width: 500,
                height: 400,
                startPriceAtChar: 1,
                textNumber: 0,
                maxTextChar: -1,
                charPrice: 0,
                basePrice: 0,
              },
              {
                isDefault: false,
                label: "500x500",
                width: 500,
                height: 500,
                startPriceAtChar: 1,
                textNumber: 0,
                maxTextChar: -1,
                charPrice: 0,
                basePrice: 0,
              },
              {
                isDefault: false,
                label: "600x400",
                width: 600,
                height: 400,
                startPriceAtChar: 1,
                textNumber: 0,
                maxTextChar: -1,
                charPrice: 0,
                basePrice: 0,
              },
              {
                isDefault: false,
                label: "800x800",
                width: 800,
                height: 800,
                startPriceAtChar: 1,
                textNumber: 0,
                maxTextChar: -1,
                charPrice: 0,
                basePrice: 0,
              },
              {
                isDefault: false,
                label: "1000x500",
                width: 1000,
                height: 500,
                startPriceAtChar: 1,
                textNumber: 0,
                maxTextChar: -1,
                charPrice: 0,
                basePrice: 0,
              },
              {
                isDefault: false,
                label: "1200x800",
                width: 1200,
                height: 800,
                startPriceAtChar: 1,
                textNumber: 0,
                maxTextChar: -1,
                charPrice: 0,
                basePrice: 0,
              },
              {
                isDefault: false,
                label: "1400x900",
                width: 1400,
                height: 900,
                startPriceAtChar: 1,
                textNumber: 0,
                maxTextChar: -1,
                charPrice: 0,
                basePrice: 0,
              },
            ],
            thickness: {
              active: false,
              values: [],
            },
            customSize: {
              active: true,
              width: {
                max: 1400,
                min: 100,
                label: "Width",
              },
              height: {
                max: 900,
                min: 50,
                label: "Height",
              },
              pricings: [
                { surface: 300, basePrice: 10, charPrice: 1.5 },
                { surface: 700, basePrice: 10, charPrice: 3 },
                { surface: 1400, basePrice: 10, charPrice: 5 },
              ],
            },
          },
          colors: {
            customColors: {
              active: false,
              label: "Custom Colors",
              prevImg: "",
            },
            allColors: [
              {
                isDefault: true,
                name: "Transparent",
                textColor: {
                  active: false,
                  sameForBorder: false,
                  name: "",
                  codeHex: "#000000",
                },
                pattern: {
                  active: true,
                  codeHex: "#f0f0f0",
                  url:
                    asowp_data.assets_url +
                    "/images/im_transparent-acrylic-sign.png",
                },
                prevImg: "",
                additionalPrice: 0,
              },
              {
                isDefault: false,
                name: "White",
                textColor: {
                  active: false,
                  sameForBorder: false,
                  name: "",
                  codeHex: "#000000",
                },
                pattern: {
                  active: false,
                  codeHex: "#ffffff",
                  url: "",
                },
                prevImg: "",
                additionalPrice: 0,
              },
              {
                isDefault: false,
                name: "Black",
                textColor: {
                  active: false,
                  sameForBorder: false,
                  name: "",
                  codeHex: "#000000",
                },
                pattern: {
                  active: false,
                  codeHex: "#000000",
                  url: "",
                },
                prevImg: "",
                additionalPrice: 0,
              },
              {
                isDefault: false,
                name: "Blue",
                textColor: {
                  active: false,
                  sameForBorder: false,
                  name: "",
                  codeHex: "#000000",
                },
                pattern: {
                  active: false,
                  codeHex: "#004f86",
                  url: "",
                },
                prevImg: "",
                additionalPrice: 0,
              },
              {
                isDefault: false,
                name: "Red",
                textColor: {
                  active: false,
                  sameForBorder: false,
                  name: "",
                  codeHex: "#000000",
                },
                pattern: {
                  active: false,
                  codeHex: "#c4271d",
                  url: "",
                },
                prevImg: "",
                additionalPrice: 0,
              },
              {
                isDefault: false,
                name: "Green",
                textColor: {
                  active: false,
                  sameForBorder: false,
                  name: "",
                  codeHex: "#000000",
                },
                pattern: {
                  active: false,
                  codeHex: "#009251",
                  url: "",
                },
                prevImg: "",
                additionalPrice: 0,
              },
              {
                isDefault: false,
                name: "Yellow",
                textColor: {
                  active: false,
                  sameForBorder: false,
                  name: "",
                  codeHex: "#000000",
                },
                pattern: {
                  active: false,
                  codeHex: "#fee900",
                  url: "",
                },
                prevImg: "",
                additionalPrice: 0,
              },
              {
                isDefault: false,
                name: "Gray",
                textColor: {
                  active: false,
                  sameForBorder: false,
                  name: "",
                  codeHex: "#000000",
                },
                pattern: {
                  active: false,
                  codeHex: "#4f5756",
                  url: "",
                },
                prevImg: "",
                additionalPrice: 0,
              },
              {
                isDefault: false,
                name: "Pink",
                textColor: {
                  active: false,
                  sameForBorder: false,
                  name: "",
                  codeHex: "#000000",
                },
                pattern: {
                  active: false,
                  codeHex: "#bc4077",
                  url: "",
                },
                prevImg: "",
                additionalPrice: 0,
              },
              {
                isDefault: false,
                name: "Purple",
                textColor: {
                  active: false,
                  sameForBorder: false,
                  name: "",
                  codeHex: "#000000",
                },
                pattern: {
                  active: false,
                  codeHex: "#554585",
                  url: "",
                },
                prevImg: "",
                additionalPrice: 0,
              },
              {
                isDefault: false,
                name: "Orange",
                textColor: {
                  active: false,
                  sameForBorder: false,
                  name: "",
                  codeHex: "#000000",
                },
                pattern: {
                  active: false,
                  codeHex: "#e15616",
                  url: "",
                },
                prevImg: "",
                additionalPrice: 0,
              },
              {
                isDefault: false,
                name: "Brown",
                textColor: {
                  active: false,
                  sameForBorder: false,
                  name: "",
                  codeHex: "#000000",
                },
                pattern: {
                  active: false,
                  codeHex: "#523d2a",
                  url: "",
                },
                prevImg: "",
                additionalPrice: 0,
              },
            ],
          },
          shapes: [
            {
              isDefault: false,
              shapeId: 3,
              additionalPrice: 0,
            },
            {
              isDefault: true,
              shapeId: 1,
              additionalPrice: 0,
            },
            {
              isDefault: false,
              shapeId: 0,
              additionalPrice: 0,
            },
          ],
          borders: {
            settings: {
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
                {
                  name: "Blue",
                  codeHex: "#004f86",
                  prevImg: "",
                  additionalPrice: 0,
                },
                {
                  name: "Red",
                  codeHex: "#c4271d",
                  prevImg: "",
                  additionalPrice: 0,
                },
                {
                  name: "Green",
                  codeHex: "#009251",
                  prevImg: "",
                  additionalPrice: 0,
                },
                {
                  name: "Yellow",
                  codeHex: "#fee900",
                  prevImg: "",
                  additionalPrice: 0,
                },
                {
                  name: "Gray",
                  codeHex: "#4f5756",
                  prevImg: "",
                  additionalPrice: 0,
                },
                {
                  name: "Pink",
                  codeHex: "#bc4077",
                  prevImg: "",
                  additionalPrice: 0,
                },
                {
                  name: "Purple",
                  codeHex: "#554585",
                  prevImg: "",
                  additionalPrice: 0,
                },
                {
                  name: "Orange",
                  codeHex: "#e15616",
                  prevImg: "",
                  additionalPrice: 0,
                },
                {
                  name: "Brown",
                  codeHex: "#523d2a",
                  prevImg: "",
                  additionalPrice: 0,
                },
              ],
              enableBorderWidth: false,
              enableBorderColor: true,
              borderColorsLabel: "Borders Colors",
              customColorsPrevImg: "",
            },
            allBorders: [
              {
                isDefault: false,
                manageBorderId: 0,
                additionalPrice: 0,
                excludeSizes: [],
                excludeShapes: [],
              },
              {
                isDefault: true,
                manageBorderId: 1,
                additionalPrice: 0,
                excludeSizes: [],
                excludeShapes: [],
              },
              {
                isDefault: false,
                manageBorderId: 3,
                additionalPrice: 0,
                excludeSizes: [],
                excludeShapes: [2],
              },
            ],
          },
          discounts: [],
          textImages: {
            enableText: true,
            enableImage: true,
          },
          fixingMethods: [
            {
              fixingMethodId: 0,
              additionalPrice: 0,
              excludeSizes: [],
              excludeShapes: [],
            },
            {
              fixingMethodId: 2,
              additionalPrice: 0.2,
              excludeSizes: [],
              excludeShapes: [2, 4, 5, 6, 7, 8, 9, 10, 11],
            },
            {
              fixingMethodId: 3,
              additionalPrice: 4.7,
              excludeSizes: [],
              excludeShapes: [2, 4, 5, 6, 7, 8, 9, 10, 11],
            },
            {
              fixingMethodId: 4,
              additionalPrice: 12.8,
              excludeSizes: [18, 19],
              excludeShapes: [2, 4, 5, 6, 7, 8, 9, 10, 11],
            },
            {
              fixingMethodId: 6,
              additionalPrice: 4.8,
              excludeSizes: [15, 16, 17, 18, 19],
              excludeShapes: [0, 2, 4, 5, 6, 7, 8, 9, 10, 11],
            },
            {
              fixingMethodId: 5,
              additionalPrice: 1.2,
              excludeSizes: [],
              excludeShapes: [2, 4, 5, 6, 7, 8, 9, 10, 11],
            },
            {
              fixingMethodId: 9,
              additionalPrice: 21,
              excludeSizes: [1, 2, 16, 17, 18, 19],
              excludeShapes: [2, 4, 5, 6, 7, 8, 9, 10, 11],
            },
          ],
          additionalOptions: [
            {
              title: "Frosted",
              description: "",
              icon: "https://signsdesigner.us/app/demos/acrylic-signs/ic_frosted.svg",
              options: [
                {
                  title: "Standard",
                  description: "",
                  icon: asowp_data.assets_url + "/images/demos/ic_none.svg",
                  image: "",
                  popImg: "",
                  excludeColors: [],
                  isDefault: true,
                  additionalPrice: 0,
                },
                {
                  title: "Frosted",
                  description: "",
                  icon: "https://signsdesigner.us/app/demos/acrylic-signs/frosted.png",
                  image:
                    "https://signsdesigner.us/app/demos/acrylic-signs/frosted.png",
                  popImg: "",
                  excludeColors: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                  isDefault: false,
                  additionalPrice: 0,
                },
              ],
            },
          ],
        },
      },
    ],
  },
  aluminium: {
    materials: [
      {
        icon: "",
        name: "Aluminium",
        type: "simple",
        popImg: "",
        description: "",
        data: {
          sizes: {
            allSizes: [
              {
                isDefault: true,
                label: "70x30",
                width: 70,
                height: 30,
                startPriceAtChar: 1,
                textNumber: 0,
                maxTextChar: -1,
                minCharText: 0,
                charPrice: 0,
                basePrice: 0,
              },
              {
                isDefault: false,
                label: "70x70",
                width: 70,
                height: 70,
                startPriceAtChar: 1,
                textNumber: 0,
                maxTextChar: -1,
                minCharText: 0,
                charPrice: 0,
                basePrice: 0,
              },
              {
                isDefault: false,
                label: "120x50",
                width: 120,
                height: 50,
                startPriceAtChar: 1,
                textNumber: 0,
                maxTextChar: -1,
                minCharText: 0,
                charPrice: 0,
                basePrice: 0,
              },
              {
                isDefault: false,
                label: "120x70",
                width: 120,
                height: 70,
                startPriceAtChar: 1,
                textNumber: 0,
                maxTextChar: -1,
                minCharText: 0,
                charPrice: 0,
                basePrice: 0,
              },
              {
                isDefault: false,
                label: "150x100",
                width: 150,
                height: 100,
                startPriceAtChar: 1,
                textNumber: 0,
                maxTextChar: -1,
                minCharText: 0,
                charPrice: 0,
                basePrice: 0,
              },
              {
                isDefault: false,
                label: "200x100",
                width: 200,
                height: 100,
                startPriceAtChar: 1,
                textNumber: 0,
                maxTextChar: -1,
                minCharText: 0,
                charPrice: 0,
                basePrice: 0,
              },
              {
                isDefault: false,
                label: "200x200",
                width: 200,
                height: 200,
                startPriceAtChar: 1,
                textNumber: 0,
                maxTextChar: -1,
                minCharText: 0,
                charPrice: 0,
                basePrice: 0,
              },
              {
                isDefault: false,
                label: "300x200",
                width: 300,
                height: 200,
                startPriceAtChar: 1,
                textNumber: 0,
                maxTextChar: -1,
                minCharText: 0,
                charPrice: 0,
                basePrice: 0,
              },
              {
                isDefault: false,
                label: "300x300",
                width: 300,
                height: 300,
                startPriceAtChar: 1,
                textNumber: 0,
                maxTextChar: -1,
                minCharText: 0,
                charPrice: 0,
                basePrice: 0,
              },
              {
                isDefault: false,
                label: "400x300",
                width: 400,
                height: 300,
                startPriceAtChar: 1,
                textNumber: 0,
                maxTextChar: -1,
                minCharText: 0,
                charPrice: 0,
                basePrice: 0,
              },
              {
                isDefault: false,
                label: "500x200",
                width: 500,
                height: 200,
                startPriceAtChar: 1,
                textNumber: 0,
                maxTextChar: -1,
                minCharText: 0,
                charPrice: 0,
                basePrice: 0,
              },
              {
                isDefault: false,
                label: "600x600",
                width: 600,
                height: 600,
                startPriceAtChar: 1,
                textNumber: 0,
                maxTextChar: -1,
                minCharText: 0,
                charPrice: 0,
                basePrice: 0,
              },
              {
                isDefault: false,
                label: "800x800",
                width: 800,
                height: 800,
                startPriceAtChar: 1,
                textNumber: 0,
                maxTextChar: -1,
                minCharText: 0,
                charPrice: 0,
                basePrice: 0,
              },
              {
                isDefault: false,
                label: "1000x500",
                width: 1000,
                height: 500,
                startPriceAtChar: 1,
                textNumber: 0,
                maxTextChar: -1,
                minCharText: 0,
                charPrice: 0,
                basePrice: 0,
              },
              {
                isDefault: false,
                label: "1000x600",
                width: 1000,
                height: 600,
                startPriceAtChar: 1,
                textNumber: 0,
                maxTextChar: -1,
                minCharText: 0,
                charPrice: 0,
                basePrice: 0,
              },
              {
                isDefault: false,
                label: "1000x1000",
                width: 1000,
                height: 1000,
                startPriceAtChar: 1,
                textNumber: 0,
                maxTextChar: -1,
                minCharText: 0,
                charPrice: 0,
                basePrice: 0,
              },
              {
                isDefault: false,
                label: "1200x700",
                width: 1200,
                height: 700,
                startPriceAtChar: 1,
                textNumber: 0,
                maxTextChar: -1,
                minCharText: 0,
                charPrice: 0,
                basePrice: 0,
              },
              {
                isDefault: false,
                label: "1500x500",
                width: 1500,
                height: 500,
                startPriceAtChar: 1,
                textNumber: 0,
                maxTextChar: -1,
                minCharText: 0,
                charPrice: 0,
                basePrice: 0,
              },
              {
                isDefault: false,
                label: "1500x1000",
                width: 1000,
                height: 1000,
                startPriceAtChar: 1,
                textNumber: 0,
                maxTextChar: -1,
                minCharText: 0,
                charPrice: 0,
                basePrice: 0,
              },
              {
                isDefault: false,
                label: "2000x500",
                width: 2000,
                height: 500,
                startPriceAtChar: 1,
                textNumber: 0,
                maxTextChar: -1,
                minCharText: 0,
                charPrice: 0,
                basePrice: 0,
              },
              {
                isDefault: false,
                label: "2000x1000",
                width: 2000,
                height: 1000,
                startPriceAtChar: 1,
                textNumber: 0,
                maxTextChar: -1,
                minCharText: 0,
                charPrice: 0,
                basePrice: 0,
              },
              {
                isDefault: false,
                label: "2000x1200",
                width: 2000,
                height: 1200,
                startPriceAtChar: 1,
                textNumber: 0,
                maxTextChar: -1,
                minCharText: 0,
                charPrice: 0,
                basePrice: 0,
              },
            ],
            thickness: {
              active: false,
              values: [],
            },
            customSize: {
              active: true,
              width: {
                max: 2000,
                min: 70,
                label: "Width",
              },
              height: {
                max: 1200,
                min: 30,
                label: "Height",
              },
              pricings: [
                { surface: 600, basePrice: 10, charPrice: 1.5 },
                { surface: 1600, basePrice: 10, charPrice: 3 },
                { surface: 2000, basePrice: 10, charPrice: 5 },
              ],
            },
          },
          colors: {
            customColors: {
              active: true,
              label: "Custom Colors",
              prevImg: "",
            },
            allColors: [
              {
                isDefault: true,
                name: "White",
                textColor: {
                  active: false,
                  sameForBorder: false,
                  name: "",
                  codeHex: "#000000",
                },
                pattern: {
                  active: false,
                  codeHex: "#ffffff",
                  url: "",
                },
                prevImg: "",
                additionalPrice: 0,
              },
              {
                isDefault: false,
                name: "Aluminium",
                textColor: {
                  active: false,
                  sameForBorder: false,
                  name: "",
                  codeHex: "#000000",
                },
                pattern: {
                  active: false,
                  codeHex: "#dfdfdf",
                  url: "",
                },
                prevImg: "",
                additionalPrice: 0,
              },
              {
                isDefault: false,
                name: "Black",
                textColor: {
                  active: false,
                  sameForBorder: false,
                  name: "",
                  codeHex: "#000000",
                },
                pattern: {
                  active: false,
                  codeHex: "#000000",
                  url: "",
                },
                prevImg: "",
                additionalPrice: 0,
              },
              {
                isDefault: false,
                name: "Blue",
                textColor: {
                  active: false,
                  sameForBorder: false,
                  name: "",
                  codeHex: "#000000",
                },
                pattern: {
                  active: false,
                  codeHex: "#004f86",
                  url: "",
                },
                prevImg: "",
                additionalPrice: 0,
              },
              {
                isDefault: false,
                name: "Red",
                textColor: {
                  active: false,
                  sameForBorder: false,
                  name: "",
                  codeHex: "#000000",
                },
                pattern: {
                  active: false,
                  codeHex: "#c4271d",
                  url: "",
                },
                prevImg: "",
                additionalPrice: 0,
              },
              {
                isDefault: false,
                name: "Green",
                textColor: {
                  active: false,
                  sameForBorder: false,
                  name: "",
                  codeHex: "#000000",
                },
                pattern: {
                  active: false,
                  codeHex: "#009251",
                  url: "",
                },
                prevImg: "",
                additionalPrice: 0,
              },
              {
                isDefault: false,
                name: "Yellow",
                textColor: {
                  active: false,
                  sameForBorder: false,
                  name: "",
                  codeHex: "#000000",
                },
                pattern: {
                  active: false,
                  codeHex: "#fee900",
                  url: "",
                },
                prevImg: "",
                additionalPrice: 0,
              },
              {
                isDefault: false,
                name: "Gray",
                textColor: {
                  active: false,
                  sameForBorder: false,
                  name: "",
                  codeHex: "#000000",
                },
                pattern: {
                  active: false,
                  codeHex: "#4f5756",
                  url: "",
                },
                prevImg: "",
                additionalPrice: 0,
              },
              {
                isDefault: false,
                name: "Pink",
                textColor: {
                  active: false,
                  sameForBorder: false,
                  name: "",
                  codeHex: "#000000",
                },
                pattern: {
                  active: false,
                  codeHex: "#bc4077",
                  url: "",
                },
                prevImg: "",
                additionalPrice: 0,
              },
              {
                isDefault: false,
                name: "Purple",
                textColor: {
                  active: false,
                  sameForBorder: false,
                  name: "",
                  codeHex: "#000000",
                },
                pattern: {
                  active: false,
                  codeHex: "#554585",
                  url: "",
                },
                prevImg: "",
                additionalPrice: 0,
              },
              {
                isDefault: false,
                name: "Orange",
                textColor: {
                  active: false,
                  sameForBorder: false,
                  name: "",
                  codeHex: "#000000",
                },
                pattern: {
                  active: false,
                  codeHex: "#e15616",
                  url: "",
                },
                prevImg: "",
                additionalPrice: 0,
              },
              {
                isDefault: false,
                name: "Brown",
                textColor: {
                  active: false,
                  sameForBorder: false,
                  name: "",
                  codeHex: "#000000",
                },
                pattern: {
                  active: false,
                  codeHex: "#523d2a",
                  url: "",
                },
                prevImg: "",
                additionalPrice: 0,
              },
              {
                isDefault: false,
                name: "Gold",
                textColor: {
                  active: false,
                  sameForBorder: false,
                  name: "",
                  codeHex: "#000000",
                },
                pattern: {
                  active: false,
                  codeHex: "#e9a956",
                  url: "",
                },
                prevImg: "",
                additionalPrice: 0,
              },
              {
                isDefault: false,
                name: "Silver",
                textColor: {
                  active: false,
                  sameForBorder: false,
                  name: "",
                  codeHex: "#000000",
                },
                pattern: {
                  active: false,
                  codeHex: "#e9e9e9",
                  url: "",
                },
                prevImg: "",
                additionalPrice: 0,
              },
            ],
          },
          shapes: [
            {
              isDefault: true,
              shapeId: 1,
              additionalPrice: 0,
            },
            {
              isDefault: false,
              shapeId: 3,
              additionalPrice: 0,
            },
            {
              isDefault: false,
              shapeId: 0,
              additionalPrice: 0,
            },
            {
              isDefault: false,
              shapeId: 4,
              additionalPrice: 0,
            },
            {
              isDefault: false,
              shapeId: 2,
              additionalPrice: 0,
            },
            {
              isDefault: false,
              shapeId: 5,
              additionalPrice: 0,
            },
            {
              isDefault: false,
              shapeId: 6,
              additionalPrice: 0,
            },
            {
              isDefault: false,
              shapeId: 9,
              additionalPrice: 0,
            },
            {
              isDefault: false,
              shapeId: 7,
              additionalPrice: 0,
            },
            {
              isDefault: false,
              shapeId: 8,
              additionalPrice: 0,
            },
          ],
          borders: {
            settings: {
              borderColorsLabel: "Borders Colors",
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
                {
                  name: "Blue",
                  codeHex: "#004f86",
                  prevImg: "",
                  additionalPrice: 0,
                },
                {
                  name: "Red",
                  codeHex: "#c4271d",
                  prevImg: "",
                  additionalPrice: 0,
                },
                {
                  name: "Green",
                  codeHex: "#009251",
                  prevImg: "",
                  additionalPrice: 0,
                },
                {
                  name: "Yellow",
                  codeHex: "#fee900",
                  prevImg: "",
                  additionalPrice: 0,
                },
                {
                  name: "Gray",
                  codeHex: "#4f5756",
                  prevImg: "",
                  additionalPrice: 0,
                },
                {
                  name: "Pink",
                  codeHex: "#bc4077",
                  prevImg: "",
                  additionalPrice: 0,
                },
                {
                  name: "Purple",
                  codeHex: "#554585",
                  prevImg: "",
                  additionalPrice: 0,
                },
                {
                  name: "Orange",
                  codeHex: "#e15616",
                  prevImg: "",
                  additionalPrice: 0,
                },
                {
                  name: "Brown",
                  codeHex: "#523d2a",
                  prevImg: "",
                  additionalPrice: 0,
                },
                {
                  name: "Gold",
                  codeHex: "#e9a956",
                  prevImg: "",
                  additionalPrice: 0,
                },
                {
                  name: "Silver",
                  codeHex: "#e9e9e9",
                  prevImg: "",
                  additionalPrice: 0,
                },
              ],
              enableBorderWidth: false,
              enableBorderColor: true,
              borderColorsLabel: "Borders Colors",
              customColorsPrevImg: "",
            },
            allBorders: [
              {
                isDefault: true,
                manageBorderId: 0,
                additionalPrice: 0,
                excludeSizes: [],
                excludeShapes: [],
              },
              {
                isDefault: false,
                manageBorderId: 1,
                additionalPrice: 0,
                excludeSizes: [],
                excludeShapes: [],
              },
              {
                isDefault: false,
                manageBorderId: 2,
                additionalPrice: 0,
                excludeSizes: [],
                excludeShapes: [],
              },
              {
                isDefault: false,
                manageBorderId: 3,
                additionalPrice: 0,
                excludeSizes: [],
                excludeShapes: [],
              },
            ],
          },
          discounts: [],
          textImages: {
            enableText: true,
            enableImage: true,
          },
          fixingMethods: [
            {
              isDefault: true,
              fixingMethodId: 0,
              additionalPrice: 0,
              excludeSizes: [],
              excludeShapes: [],
            },
            {
              isDefault: false,
              fixingMethodId: 2,
              additionalPrice: 0,
              excludeSizes: [],
              excludeShapes: [],
            },
            {
              isDefault: false,
              fixingMethodId: 3,
              additionalPrice: 4.5,
              excludeSizes: [],
              excludeShapes: [],
            },
            {
              isDefault: false,
              fixingMethodId: 6,
              additionalPrice: 0.3,
              excludeSizes: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22],
              excludeShapes: [0, 4, 2, 9, 5, 6],
            },
            {
              isDefault: false,
              fixingMethodId: 5,
              additionalPrice: 0.6,
              excludeSizes: [],
              excludeShapes: [5, 6, 7, 8],
            },
            {
              isDefault: false,
              fixingMethodId: 4,
              additionalPrice: 12.8,
              excludeSizes: [16, 17, 18, 19, 20, 21, 22],
              excludeShapes: [0],
            },
            {
              isDefault: false,
              fixingMethodId: 1,
              additionalPrice: 0,
              excludeSizes: [13, 14, 15, 16, 17, 18, 19, 20, 21, 22],
              excludeShapes: [],
            },
            {
              isDefault: false,
              fixingMethodId: 10,
              additionalPrice: 11.4,
              excludeSizes: [1, 2, 3, 4, 5, 22],
              excludeShapes: [5, 6],
            },
            {
              isDefault: false,
              fixingMethodId: 9,
              additionalPrice: 13.2,
              excludeSizes: [1, 2, 3, 4, 14, 15, 16, 17, 18, 19, 20, 21, 22],
              excludeShapes: [0, 4, 2, 9, 7, 8],
            },
            {
              isDefault: false,
              fixingMethodId: 15,
              additionalPrice: 0.5,
              excludeSizes: [
                6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
              ],
              excludeShapes: [1, 3, 2, 5, 6, 7, 8],
            },
          ],
          additionalOptions: [
            {
              title: "Reflective",
              description: "",
              icon: "https://signsdesigner.us/app/demos/aluminium-signs/ic_frosted.svg",
              options: [
                {
                  title: "Standard",
                  description: "",
                  icon: asowp_data.assets_url + "/images/demos/ic_none.svg",
                  image: "",
                  popImg: "",
                  excludeColors: [2, 13, 14],
                  isDefault: true,
                  additionalPrice: 0,
                },
                {
                  title: "Reflective",
                  description: "",
                  icon: "https://signsdesigner.us/app/demos/aluminium-signs/reflective.png",
                  image:
                    "https://signsdesigner.us/app/demos/aluminium-signs/reflective.png",
                  popImg:
                    "https://signsdesigner.us/app/demos/aluminium-signs/reflective.png",
                  excludeColors: [2, 13, 14],
                  isDefault: false,
                  additionalPrice: 0,
                },
              ],
            },
          ],
        },
      },
    ],
  },
  "brass-sign": {
    materials: [
      {
        icon: "",
        name: "Brass",
        type: "advance",
        popImg: "",
        isDefault: true,
        description: "",
        data: [
          {
            name: "Doors Sign",
            description: "",
            icon: "https://signsdesigner.us/app/demos/brass_signs/door-signs/door-sign.svg",
            options: [
              {
                isDefault: true,
                name: "London",
                description: "Chrome-plated brass",
                icon: "https://signsdesigner.us/app/demos/brass_signs/door-signs/london1.png",
                image: asowp_data.assets_url + "/images/london1-prev.png",
                color: {
                  name: "London",
                  codeHex: "",
                  prevImg: asowp_data.assets_url + "/images/london1-prev.png",
                },
                fixingMethods: [2],
                shapeId: 0,
                size: {
                  width: 104,
                  height: 60,
                  basePrice: 0,
                  startPriceAtChar: 1,
                  maxTextChar: -1,
                  minCharText: 0,
                  charPrice: 0,
                },
                additionalPrice: 37.69,
              },
              {
                isDefault: false,
                name: "London",
                description: "Shiny brass",
                icon: "https://signsdesigner.us/app/demos/brass_signs/door-signs/london2.png",
                image: asowp_data.assets_url + "/images/london2-prev.png",
                color: {
                  name: "London",
                  codeHex: "",
                  prevImg: asowp_data.assets_url + "/images/london2-prev.png",
                },
                fixingMethods: [2],
                shapeId: 0,
                size: {
                  width: 104,
                  height: 60,
                  basePrice: 0,
                  startPriceAtChar: 1,
                  maxTextChar: -1,
                  minCharText: 0,
                  charPrice: 0,
                },
                additionalPrice: 37.69,
              },
              {
                isDefault: false,
                name: "London",
                description: "Brushed nickel-plated brass",
                icon: "https://signsdesigner.us/app/demos/brass_signs/door-signs/london3.png",
                image: asowp_data.assets_url + "/images/london3-prev.png",
                color: {
                  name: "London",
                  codeHex: "",
                  prevImg: asowp_data.assets_url + "/images/london3-prev.png",
                },
                fixingMethods: [2],
                shapeId: 0,
                size: {
                  width: 104,
                  height: 60,
                  basePrice: 0,
                  startPriceAtChar: 1,
                  maxTextChar: -1,
                  minCharText: 0,
                  charPrice: 0,
                },
                additionalPrice: 37.69,
              },
              {
                isDefault: false,
                name: "Oslo",
                description: "Matte brass",
                icon: "https://signsdesigner.us/app/demos/brass_signs/door-signs/oslo.png",
                image: asowp_data.assets_url + "/images/oslo-prev.png",
                color: {
                  name: "Oslo",
                  codeHex: "",
                  prevImg: asowp_data.assets_url + "/images/oslo-prev.png",
                },
                fixingMethods: [2],
                shapeId: 0,
                size: {
                  width: 80,
                  height: 43,
                  basePrice: 0,
                  startPriceAtChar: 1,
                  maxTextChar: -1,
                  minCharText: 0,
                  charPrice: 0,
                },
                additionalPrice: 20.89,
              },
              {
                isDefault: false,
                name: "Paris",
                description: "Matte brass",
                icon: "https://signsdesigner.us/app/demos/brass_signs/door-signs/paris1.png",
                image: asowp_data.assets_url + "/images/paris1-prev.png",
                color: {
                  name: "Paris",
                  codeHex: "",
                  prevImg: asowp_data.assets_url + "/images/paris1-prev.png",
                },
                fixingMethods: [2],
                shapeId: 0,
                size: {
                  width: 165,
                  height: 78,
                  basePrice: 0,
                  startPriceAtChar: 1,
                  maxTextChar: -1,
                  minCharText: 0,
                  charPrice: 0,
                },
                additionalPrice: 39.79,
              },
              {
                isDefault: false,
                name: "Paris",
                description: "Shiny brass",
                icon: "https://signsdesigner.us/app/demos/brass_signs/door-signs/paris2.png",
                image: asowp_data.assets_url + "/images/paris2-prev.png",
                color: {
                  name: "Paris",
                  codeHex: "",
                  prevImg: asowp_data.assets_url + "/images/paris2-prev.png",
                },
                fixingMethods: [2],
                shapeId: 0,
                size: {
                  width: 165,
                  height: 78,
                  basePrice: 0,
                  startPriceAtChar: 1,
                  maxTextChar: -1,
                  minCharText: 0,
                  charPrice: 0,
                },
                additionalPrice: 39.79,
              },
              {
                isDefault: false,
                name: "Paris",
                description: "Black/oxide brass",
                icon: "https://signsdesigner.us/app/demos/brass_signs/door-signs/paris3.png",
                image: asowp_data.assets_url + "/images/paris3-prev.png",
                color: {
                  name: "Paris",
                  codeHex: "",
                  prevImg: asowp_data.assets_url + "/images/paris3-prev.png",
                },
                fixingMethods: [2],
                shapeId: 0,
                size: {
                  width: 165,
                  height: 78,
                  basePrice: 0,
                  startPriceAtChar: 1,
                  maxTextChar: -1,
                  minCharText: 0,
                  charPrice: 0,
                },
                additionalPrice: 39.79,
              },
              {
                isDefault: false,
                name: "Berlin",
                description: "Shiny brass",
                icon: "https://signsdesigner.us/app/demos/brass_signs/door-signs/berlin1.png",
                image: asowp_data.assets_url + "/images/berlin1-prev.png",
                color: {
                  name: "Berlin",
                  codeHex: "",
                  prevImg: asowp_data.assets_url + "/images/berlin1-prev.png",
                },
                fixingMethods: [2],
                shapeId: 1,
                size: {
                  width: 170,
                  height: 70,
                  basePrice: 0,
                  startPriceAtChar: 1,
                  maxTextChar: -1,
                  minCharText: 0,
                  charPrice: 0,
                },
                additionalPrice: 43.99,
              },
              {
                isDefault: false,
                name: "Berlin",
                description: "Brushed nickel-plated brass",
                icon: "https://signsdesigner.us/app/demos/brass_signs/door-signs/berlin2.png",
                image: asowp_data.assets_url + "/images/berlin2-prev.png",
                color: {
                  name: "Berlin",
                  codeHex: "",
                  prevImg: asowp_data.assets_url + "/images/berlin2-prev.png",
                },
                fixingMethods: [2],
                shapeId: 1,
                size: {
                  width: 170,
                  height: 70,
                  basePrice: 0,
                  startPriceAtChar: 1,
                  maxTextChar: -1,
                  minCharText: 0,
                  charPrice: 0,
                },
                additionalPrice: 43.99,
              },
              {
                isDefault: false,
                name: "Copenhagen",
                description: "Shiny brass",
                icon: "https://signsdesigner.us/app/demos/brass_signs/door-signs/copenhagen.png",
                image: asowp_data.assets_url + "/images/copenhagen-prev.png",
                color: {
                  name: "Copenhagen",
                  codeHex: "",
                  prevImg:
                    asowp_data.assets_url + "/images/copenhagen-prev.png",
                },
                fixingMethods: [2],
                shapeId: 1,
                size: {
                  width: 260,
                  height: 100,
                  basePrice: 0,
                  startPriceAtChar: 1,
                  maxTextChar: -1,
                  minCharText: 0,
                  charPrice: 0,
                },
                additionalPrice: 129.59,
              },
              {
                isDefault: false,
                name: "Athens",
                description: "Shiny brass",
                icon: "https://signsdesigner.us/app/demos/brass_signs/door-signs/athens.png",
                image: asowp_data.assets_url + "/images/athens-prev.png",
                color: {
                  name: "Athens",
                  codeHex: "",
                  prevImg: asowp_data.assets_url + "/images/athens-prev.png",
                },
                fixingMethods: [2],
                shapeId: 1,
                size: {
                  width: 300,
                  height: 200,
                  basePrice: 0,
                  startPriceAtChar: 1,
                  maxTextChar: -1,
                  minCharText: 0,
                  charPrice: 0,
                },
                additionalPrice: 188.09,
              },
              {
                isDefault: false,
                name: "Amsterdam",
                description: "Shiny brass",
                icon: "https://signsdesigner.us/app/demos/brass_signs/door-signs/amsterdam.png",
                image: asowp_data.assets_url + "/images/amsterdam-prev.png",
                color: {
                  name: "Amsterdam",
                  codeHex: "",
                  prevImg: asowp_data.assets_url + "/images/amsterdam-prev.png",
                },
                fixingMethods: [2],
                shapeId: 1,
                size: {
                  width: 400,
                  height: 300,
                  basePrice: 0,
                  startPriceAtChar: 1,
                  maxTextChar: -1,
                  minCharText: 0,
                  charPrice: 0,
                },
                additionalPrice: 224.89,
              },
              {
                isDefault: false,
                name: "Tallinn",
                description: "Shiny brass",
                icon: "https://signsdesigner.us/app/demos/brass_signs/door-signs/tallinn.png",
                image: asowp_data.assets_url + "/images/tallinn-prev.png",
                color: {
                  name: "Tallinn",
                  codeHex: "",
                  prevImg: asowp_data.assets_url + "/images/tallinn-prev.png",
                },
                fixingMethods: [2],
                shapeId: 1,
                size: {
                  width: 400,
                  height: 300,
                  basePrice: 0,
                  startPriceAtChar: 1,
                  maxTextChar: -1,
                  minCharText: 0,
                  charPrice: 0,
                },
                additionalPrice: 269.69,
              },
              {
                isDefault: false,
                name: "Rome",
                description: "Shiny brass",
                icon: "https://signsdesigner.us/app/demos/brass_signs/door-signs/rome1.png",
                image: asowp_data.assets_url + "/images/rome1-prev.png",
                color: {
                  name: "Rome",
                  codeHex: "",
                  prevImg: asowp_data.assets_url + "/images/rome1-prev.png",
                },
                fixingMethods: [2],
                shapeId: 1,
                size: {
                  width: 120,
                  height: 55,
                  basePrice: 0,
                  startPriceAtChar: 1,
                  maxTextChar: -1,
                  minCharText: 0,
                  charPrice: 0,
                },
                additionalPrice: 36.79,
              },
              {
                isDefault: false,
                name: "Rome",
                description: "Brushed nickel-plated brass",
                icon: "https://signsdesigner.us/app/demos/brass_signs/door-signs/rome2.png",
                image: asowp_data.assets_url + "/images/rome2-prev.png",
                color: {
                  name: "Rome",
                  codeHex: "",
                  prevImg: asowp_data.assets_url + "/images/rome2-prev.png",
                },
                fixingMethods: [2],
                shapeId: 1,
                size: {
                  width: 120,
                  height: 55,
                  basePrice: 0,
                  startPriceAtChar: 1,
                  maxTextChar: -1,
                  minCharText: 0,
                  charPrice: 0,
                },
                additionalPrice: 36.79,
              },
              {
                isDefault: false,
                name: "Rome",
                description: "Brushed brass",
                icon: "https://signsdesigner.us/app/demos/brass_signs/door-signs/rome3-prev.png",
                image: asowp_data.assets_url + "/images/rome3-prev.png",
                color: {
                  name: "Rome",
                  codeHex: "",
                  prevImg: asowp_data.assets_url + "/images/rome3-prev.png",
                },
                fixingMethods: [2],
                shapeId: 1,
                size: {
                  width: 120,
                  height: 55,
                  basePrice: 0,
                  startPriceAtChar: 1,
                  maxTextChar: -1,
                  minCharText: 0,
                  charPrice: 0,
                },
                additionalPrice: 36.79,
              },
              {
                isDefault: false,
                name: "Sydney",
                description: "Brushed brass",
                icon: "https://signsdesigner.us/app/demos/brass_signs/door-signs/sydney1.png",
                image: asowp_data.assets_url + "/images/sydney-prev.png",
                color: {
                  name: "Sydney",
                  codeHex: "",
                  prevImg: asowp_data.assets_url + "/images/sydney-prev.png",
                },
                fixingMethods: [2],
                shapeId: 1,
                size: {
                  width: 160,
                  height: 60,
                  basePrice: 0,
                  startPriceAtChar: 1,
                  maxTextChar: -1,
                  minCharText: 0,
                  charPrice: 0,
                },
                additionalPrice: 41.89,
              },
              {
                isDefault: false,
                name: "Prague",
                description: "Shiny brass",
                icon: "https://signsdesigner.us/app/demos/brass_signs/door-signs/prague.png",
                image: asowp_data.assets_url + "/images/prague-prev.png",
                color: {
                  name: "Prague",
                  codeHex: "",
                  prevImg: asowp_data.assets_url + "/images/prague-prev.png",
                },
                fixingMethods: [0, 1],
                shapeId: 0,
                size: {
                  width: 145,
                  height: 73,
                  basePrice: 0,
                  startPriceAtChar: 1,
                  maxTextChar: -1,
                  minCharText: 0,
                  charPrice: 0,
                },
                additionalPrice: 28.39,
              },
              {
                isDefault: false,
                name: "Dublin",
                description: "Shiny brass",
                icon: "https://signsdesigner.us/app/demos/brass_signs/door-signs/dublin.png",
                image: asowp_data.assets_url + "/images/dublin-prev.png",
                color: {
                  name: "Dublin",
                  codeHex: "",
                  prevImg: asowp_data.assets_url + "/images/dublin-prev.png",
                },
                fixingMethods: [0, 1],
                shapeId: 0,
                size: {
                  width: 145,
                  height: 73,
                  basePrice: 0,
                  startPriceAtChar: 1,
                  maxTextChar: -1,
                  minCharText: 0,
                  charPrice: 0,
                },
                additionalPrice: 28.38,
              },
              {
                isDefault: false,
                name: "Lisbon",
                description: "Shiny brass",
                icon: "https://signsdesigner.us/app/demos/brass_signs/door-signs/lisbon1.png",
                image: asowp_data.assets_url + "/images/lisbon1-prev.png",
                color: {
                  name: "Lisbon",
                  codeHex: "",
                  prevImg: asowp_data.assets_url + "/images/lisbon1-prev.png",
                },
                fixingMethods: [0, 1],
                shapeId: 1,
                size: {
                  width: 170,
                  height: 70,
                  basePrice: 0,
                  startPriceAtChar: 1,
                  maxTextChar: -1,
                  minCharText: 0,
                  charPrice: 0,
                },
                additionalPrice: 43.99,
              },
              {
                isDefault: false,
                name: "Lisbon",
                description: "Brushed nickel-plated brass",
                icon: "https://signsdesigner.us/app/demos/brass_signs/door-signs/lisbon2.png",
                image: asowp_data.assets_url + "/images/lisbon2-prev.png",
                color: {
                  name: "Lisbon",
                  codeHex: "",
                  prevImg: asowp_data.assets_url + "/images/lisbon2-prev.png",
                },
                fixingMethods: [0, 1],
                shapeId: 1,
                size: {
                  width: 170,
                  height: 73,
                  basePrice: 0,
                  startPriceAtChar: 1,
                  maxTextChar: -1,
                  minCharText: 0,
                  charPrice: 0,
                },
                additionalPrice: 43.99,
              },
            ],
          },
          {
            name: "Label tags",
            description: "",
            icon: "",
            options: [
              {
                isDefault: true,
                name: "Madrid",
                description: "Brass",
                icon: "https://signsdesigner.us/app/demos/brass_signs/label-tags/madrid1.png",
                image: asowp_data.assets_url + "/images/laiton-pattern.png",
                color: {
                  name: "Madrid",
                  codeHex: "",
                  prevImg: asowp_data.assets_url + "/images/laiton-pattern.png",
                },
                fixingMethods: [0, 1, 2, 3],
                shapeId: 3,
                size: {
                  width: 60,
                  height: 18,
                  basePrice: 0,
                  startPriceAtChar: 1,
                  maxTextChar: -1,
                  minCharText: 0,
                  charPrice: 0,
                },
                additionalPrice: 5.89,
              },
              {
                isDefault: false,
                name: "Madrid",
                description: "Brushed nickel-plated brass",
                icon: "https://signsdesigner.us/app/demos/brass_signs/label-tags/madrid2.png",
                image: asowp_data.assets_url + "/images/nickel-pattern.png",
                color: {
                  name: "Madrid",
                  codeHex: "",
                  prevImg: asowp_data.assets_url + "/images/nickel-pattern.png",
                },
                fixingMethods: [0, 1, 2, 3],
                shapeId: 3,
                size: {
                  width: 60,
                  height: 18,
                  basePrice: 0,
                  startPriceAtChar: 1,
                  maxTextChar: -1,
                  minCharText: 0,
                  charPrice: 0,
                },
                additionalPrice: 5.89,
              },
              {
                isDefault: false,
                name: "Kiev",
                description: "Brass",
                icon: "https://signsdesigner.us/app/demos/brass_signs/label-tags/kiev1.png",
                image: asowp_data.assets_url + "/images/laiton-pattern.png",
                color: {
                  name: "Kiev",
                  codeHex: "",
                  prevImg: asowp_data.assets_url + "/images/laiton-pattern.png",
                },
                fixingMethods: [0, 1, 2],
                shapeId: 0,
                size: {
                  width: 50,
                  height: 60,
                  basePrice: 0,
                  startPriceAtChar: 1,
                  maxTextChar: -1,
                  minCharText: 0,
                  charPrice: 0,
                },
                additionalPrice: 7.79,
              },
              {
                isDefault: false,
                name: "Kiev",
                description: "Brushed nickel-plated brass",
                icon: "https://signsdesigner.us/app/demos/brass_signs/label-tags/kiev2.png",
                image: asowp_data.assets_url + "/images/nickel-pattern.png",
                color: {
                  name: "Kiev",
                  codeHex: "",
                  prevImg: asowp_data.assets_url + "/images/nickel-pattern.png",
                },
                fixingMethods: [0, 1, 2],
                shapeId: 0,
                size: {
                  width: 50,
                  height: 50,
                  basePrice: 0,
                  startPriceAtChar: 1,
                  maxTextChar: -1,
                  minCharText: 0,
                  charPrice: 0,
                },
                additionalPrice: 7.79,
              },
              {
                isDefault: false,
                name: "Budapest",
                description: "Brass",
                icon: "https://signsdesigner.us/app/demos/brass_signs/label-tags/budapest1.png",
                image: asowp_data.assets_url + "/images/laiton-pattern.png",
                color: {
                  name: "Budapest",
                  codeHex: "",
                  prevImg: asowp_data.assets_url + "/images/laiton-pattern.png",
                },
                fixingMethods: [0, 1, 2],
                shapeId: 3,
                size: {
                  width: 60,
                  height: 30,
                  basePrice: 0,
                  startPriceAtChar: 1,
                  maxTextChar: -1,
                  minCharText: 0,
                  charPrice: 0,
                },
                additionalPrice: 7.79,
              },
              {
                isDefault: false,
                name: "Budapest",
                description: "Brushed nickel-plated brass",
                icon: "https://signsdesigner.us/app/demos/brass_signs/label-tags/budapest2.png",
                image: asowp_data.assets_url + "/images/nickel-pattern.png",
                color: {
                  name: "Budapest",
                  codeHex: "",
                  prevImg: asowp_data.assets_url + "/images/nickel-pattern.png",
                },
                fixingMethods: [0, 1, 2],
                shapeId: 3,
                size: {
                  width: 60,
                  height: 30,
                  basePrice: 0,
                  startPriceAtChar: 1,
                  maxTextChar: -1,
                  minCharText: 0,
                  charPrice: 0,
                },
                additionalPrice: 37.69,
              },
            ],
          },
        ],
      },
    ],
  },
  plastic: {
    materials: [
      {
        icon: "https://signsdesigner.us/app/demos/plastic-signs/engraving.svg",
        name: "Engraving",
        type: "simple",
        popImg:
          "<div><h4>Engraving / Foam PVC / Solid PET (PVC free)</h4><img src='https://cdn.skyltmax.se/vite/assets/laser-6173c70e.png' alt='' class='mb-4'><h5>Engraving</h5><p class='paragraph-sm'>Text and motifs are engraved by laser onto a durable multi-layer plastic (acrylic). The engraving ensures that the colour of the bottom plastic layer is visible and forms the text. Engraved signs are available in thicknesses of 0.8 or 1.6 mm.</p><img src='https://cdn.skyltmax.se/vite/assets/print-15b7b58d.png' alt='' class='mb-4'><h5>Foam PVC</h5><p class='paragraph-sm'>Text and motifs are created using colour printing in a UV printer. The material is suitable for indoor use for trade fairs, name badges, information signs, etc. Our foam PVC plastic signs are 3 mm thick and have a minimum size of 70x30 mm and a maximum size of 1000x1000 mm. In other words, a slightly smaller maximum size than solid PET plastic signs.</p><img src='https://cdn.skyltmax.se/vite/assets/solid_plastic-47f03aac.jpg' alt='' class='mb-4'><h5>Solid PET (PVC free)</h5><p class='paragraph-sm'>Text and motifs are created using colour printing in a UV printer on recyclable material. The material is for both indoor and outdoor use. A strong, lightweight, durable and recyclable material. It is often used for house number signs, pram signs, hotel signs, etc. Our solid PET plastic signs are 2 mm thick and have a minimum size of 70x30 mm and a maximum size of 2000x1200 mm.</p></div>",
        description:
          "Text and image are engraved with laser on two layer laminate plastic",
        data: {
          sizes: {
            allSizes: [
              {
                isDefault: true,
                label: "25x10",
                width: 25,
                height: 10,
                startPriceAtChar: 1,
                textNumber: 0,
                maxTextChar: -1,
                minCharText: 0,
                charPrice: 0,
                basePrice: 0,
              },
              {
                isDefault: false,
                label: "50x30",
                width: 50,
                height: 30,
                startPriceAtChar: 1,
                textNumber: 0,
                maxTextChar: -1,
                minCharText: 0,
                charPrice: 0,
                basePrice: 0,
              },
              {
                isDefault: false,
                label: "60x25",
                width: 60,
                height: 25,
                startPriceAtChar: 1,
                textNumber: 0,
                maxTextChar: -1,
                minCharText: 0,
                charPrice: 0,
                basePrice: 0,
              },
              {
                isDefault: false,
                label: "80x30",
                width: 80,
                height: 30,
                startPriceAtChar: 1,
                textNumber: 0,
                maxTextChar: -1,
                minCharText: 0,
                charPrice: 0,
                basePrice: 0,
              },
              {
                isDefault: false,
                label: "100x40",
                width: 100,
                height: 40,
                startPriceAtChar: 1,
                textNumber: 0,
                maxTextChar: -1,
                minCharText: 0,
                charPrice: 0,
                basePrice: 0,
              },
              {
                isDefault: false,
                label: "100x100",
                width: 100,
                height: 100,
                startPriceAtChar: 1,
                textNumber: 0,
                maxTextChar: -1,
                minCharText: 0,
                charPrice: 0,
                basePrice: 0,
              },
              {
                isDefault: false,
                label: "150x100",
                width: 150,
                height: 100,
                startPriceAtChar: 1,
                textNumber: 0,
                maxTextChar: -1,
                minCharText: 0,
                charPrice: 0,
                basePrice: 0,
              },
              {
                isDefault: false,
                label: "200x100",
                width: 200,
                height: 100,
                startPriceAtChar: 1,
                textNumber: 0,
                maxTextChar: -1,
                minCharText: 0,
                charPrice: 0,
                basePrice: 0,
              },
              {
                isDefault: false,
                label: "200x200",
                width: 200,
                height: 200,
                startPriceAtChar: 1,
                textNumber: 0,
                maxTextChar: -1,
                minCharText: 0,
                charPrice: 0,
                basePrice: 0,
              },
              {
                isDefault: false,
                label: "250x100",
                width: 250,
                height: 100,
                startPriceAtChar: 1,
                textNumber: 0,
                maxTextChar: -1,
                minCharText: 0,
                charPrice: 0,
                basePrice: 0,
              },
              {
                isDefault: false,
                label: "295x295",
                width: 295,
                height: 295,
                startPriceAtChar: 1,
                textNumber: 0,
                maxTextChar: -1,
                minCharText: 0,
                charPrice: 0,
                basePrice: 0,
              },
            ],
            thickness: {
              active: true,
              values: [1.8, 0.8],
            },
            customSize: {
              active: true,
              width: {
                max: 295,
                min: 25,
                label: "Width",
              },
              height: {
                max: 295,
                min: 10,
                label: "Height",
              },
            },
          },
          colors: {
            customColors: {
              active: false,
              label: "Custom Colors",
              prevImg: "",
            },
            allColors: [
              {
                isDefault: true,
                name: "White",
                textColor: {
                  active: true,
                  sameForBorder: true,
                  name: "Red",
                  codeHex: "#c4271d",
                },
                pattern: {
                  active: false,
                  codeHex: "#ffffff",
                  url: "",
                },
                prevImg: "",
                additionalPrice: 0,
              },
              {
                isDefault: false,
                name: "White",
                textColor: {
                  active: true,
                  sameForBorder: true,
                  name: "Red",
                  codeHex: "#c4271d",
                },
                pattern: {
                  active: false,
                  codeHex: "#ffffff",
                  url: "",
                },
                prevImg: "",
                additionalPrice: 0,
              },
              {
                isDefault: false,
                name: "White",
                textColor: {
                  active: true,
                  sameForBorder: true,
                  name: "Blue",
                  codeHex: "#497eaa",
                },
                pattern: {
                  active: false,
                  codeHex: "#ffffff",
                  url: "",
                },
                prevImg: "",
                additionalPrice: 0,
              },
              {
                isDefault: false,
                name: "Black",
                textColor: {
                  active: true,
                  sameForBorder: true,
                  name: "White",
                  codeHex: "#ffffff",
                },
                pattern: {
                  active: false,
                  codeHex: "#000000",
                  url: "",
                },
                prevImg: "",
                additionalPrice: 0,
              },
              {
                isDefault: false,
                name: "Blue",
                textColor: {
                  active: true,
                  sameForBorder: true,
                  name: "White",
                  codeHex: "#ffffff",
                },
                pattern: {
                  active: false,
                  codeHex: "#004f86",
                  url: "",
                },
                prevImg: "",
                additionalPrice: 0,
              },
              {
                isDefault: false,
                name: "Red",
                textColor: {
                  active: true,
                  sameForBorder: true,
                  name: "White",
                  codeHex: "#ffffff",
                },
                pattern: {
                  active: false,
                  codeHex: "#c4271d",
                  url: "",
                },
                prevImg: "",
                additionalPrice: 0,
              },
              {
                isDefault: false,
                name: "Pink",
                textColor: {
                  active: true,
                  sameForBorder: true,
                  name: "White",
                  codeHex: "#ffffff",
                },
                pattern: {
                  active: false,
                  codeHex: "#eb3f77",
                  url: "",
                },
                prevImg: "",
                additionalPrice: 0,
              },
              {
                isDefault: false,
                name: "Green",
                textColor: {
                  active: true,
                  sameForBorder: true,
                  name: "White",
                  codeHex: "#ffffff",
                },
                pattern: {
                  active: false,
                  codeHex: "#009251",
                  url: "",
                },
                prevImg: "",
                additionalPrice: 0,
              },
              {
                isDefault: false,
                name: "Yellow",
                textColor: {
                  active: true,
                  sameForBorder: true,
                  name: "Black",
                  codeHex: "#000000",
                },
                pattern: {
                  active: false,
                  codeHex: "#fee900",
                  url: "",
                },
                prevImg: "",
                additionalPrice: 0,
              },
              {
                isDefault: false,
                name: "Gray",
                textColor: {
                  active: true,
                  sameForBorder: true,
                  name: "White",
                  codeHex: "#ffffff",
                },
                pattern: {
                  active: false,
                  codeHex: "#4f575b",
                  url: "",
                },
                prevImg: "",
                additionalPrice: 0,
              },
              {
                isDefault: false,
                name: "Orange",
                textColor: {
                  active: true,
                  sameForBorder: true,
                  name: "White",
                  codeHex: "#ffffff",
                },
                pattern: {
                  active: false,
                  codeHex: "#e15616",
                  url: "",
                },
                prevImg: "",
                additionalPrice: 0,
              },
              {
                isDefault: false,
                name: "Purple",
                textColor: {
                  active: true,
                  sameForBorder: true,
                  name: "White",
                  codeHex: "#ffffff",
                },
                pattern: {
                  active: false,
                  codeHex: "#554585",
                  url: "",
                },
                prevImg: "",
                additionalPrice: 0,
              },
              {
                isDefault: false,
                name: "Brown",
                textColor: {
                  active: true,
                  sameForBorder: true,
                  name: "White",
                  codeHex: "#ffffff",
                },
                pattern: {
                  active: false,
                  codeHex: "#523d2a",
                  url: "",
                },
                prevImg: "",
                additionalPrice: 0,
              },
              {
                isDefault: false,
                name: "Gold",
                textColor: {
                  active: true,
                  sameForBorder: true,
                  name: "White",
                  codeHex: "#000000",
                },
                pattern: {
                  active: false,
                  codeHex: "#daa520",
                  url: "",
                },
                prevImg: "",
                additionalPrice: 0,
              },
              {
                isDefault: false,
                name: "Silver",
                textColor: {
                  active: true,
                  sameForBorder: true,
                  name: "Black",
                  codeHex: "#bbbbbb",
                },
                pattern: {
                  active: false,
                  codeHex: "#daa520",
                  url: "",
                },
                prevImg: "",
                additionalPrice: 0,
              },
              {
                isDefault: false,
                name: "Rose Gold",
                textColor: {
                  active: true,
                  sameForBorder: true,
                  name: "Black",
                  codeHex: "#000000",
                },
                pattern: {
                  active: false,
                  codeHex: "#c27268",
                  url: "",
                },
                prevImg: "",
                additionalPrice: 0,
              },
            ],
          },
          shapes: [
            {
              isDefault: true,
              shapeId: 3,
              additionalPrice: 0,
            },
            {
              isDefault: false,
              shapeId: 1,
              additionalPrice: 0,
            },
            {
              isDefault: false,
              shapeId: 0,
              additionalPrice: 0,
            },
            {
              isDefault: false,
              shapeId: 9,
              additionalPrice: 0,
            },
            {
              isDefault: false,
              shapeId: 7,
              additionalPrice: 0,
            },
            {
              isDefault: false,
              shapeId: 8,
              additionalPrice: 0,
            },
            {
              isDefault: false,
              shapeId: 4,
              additionalPrice: 0,
            },
            {
              isDefault: false,
              shapeId: 2,
              additionalPrice: 0,
            },
            {
              isDefault: false,
              shapeId: 5,
              additionalPrice: 0,
            },
            {
              isDefault: false,
              shapeId: 6,
              additionalPrice: 0,
            },
          ],
          borders: {
            settings: {
              colors: [],
              enableBorderWidth: false,
              enableBorderColor: true,
              borderColorsLabel: "Borders Colors",
              customColorsPrevImg: "",
            },
            allBorders: [
              {
                isDefault: true,
                manageBorderId: 0,
                additionalPrice: 0,
                excludeSizes: [],
                excludeShapes: [],
              },
              {
                isDefault: false,
                manageBorderId: 1,
                additionalPrice: 0,
                excludeSizes: [],
                excludeShapes: [],
              },
              {
                isDefault: false,
                manageBorderId: 2,
                additionalPrice: 0,
                excludeSizes: [],
                excludeShapes: [2, 3, 4, 5, 6, 7, 8],
              },
            ],
          },
          discounts: [],
          textImages: {
            enableText: true,
            enableImage: true,
          },
          fixingMethods: [
            {
              isDefault: true,
              fixingMethodId: 0,
              additionalPrice: 0,
              excludeSizes: [],
              excludeShapes: [],
            },
            {
              isDefault: false,
              fixingMethodId: 2,
              additionalPrice: 0,
              excludeSizes: [],
              excludeShapes: [],
            },
            {
              isDefault: false,
              fixingMethodId: 1,
              additionalPrice: 1,
              excludeSizes: [],
              excludeShapes: [],
            },
            {
              isDefault: false,
              fixingMethodId: 14,
              additionalPrice: 4.5,
              excludeSizes: [],
              excludeShapes: [],
            },
            {
              isDefault: false,
              fixingMethodId: 3,
              additionalPrice: 4.5,
              excludeSizes: [],
              excludeShapes: [],
            },
            {
              isDefault: false,
              fixingMethodId: 5,
              additionalPrice: 1.5,
              excludeSizes: [],
              excludeShapes: [],
            },
            {
              isDefault: false,
              fixingMethodId: 8,
              additionalPrice: 1.5,
              excludeSizes: [11],
              excludeShapes: [2, 3, 4, 5, 6, 7, 8, 9],
            },
            {
              isDefault: false,
              fixingMethodId: 6,
              additionalPrice: 4.5,
              excludeSizes: [0, 1, 2],
              excludeShapes: [2, 3, 4, 5, 6, 7, 8, 9],
            },
            {
              isDefault: false,
              fixingMethodId: 9,
              additionalPrice: 19,
              excludeSizes: [0, 1, 2, 3, 4, 5, 6],
              excludeShapes: [2, 3, 4, 5, 6, 7, 8, 9],
            },
          ],
          additionalOptions: [],
        },
      },
      {
        icon: "https://signsdesigner.us/app/demos/plastic-signs/form_pvc.svg",
        name: "Foam PVC",
        type: "simple",
        popImg:
          "<div><h4>Engraving / Foam PVC / Solid PET (PVC free)</h4><img src='https://cdn.skyltmax.se/vite/assets/laser-6173c70e.png' alt='' class='mb-4'><h5>Engraving</h5><p class='paragraph-sm'>Text and motifs are engraved by laser onto a durable multi-layer plastic (acrylic). The engraving ensures that the colour of the bottom plastic layer is visible and forms the text. Engraved signs are available in thicknesses of 0.8 or 1.6 mm.</p><img src='https://cdn.skyltmax.se/vite/assets/print-15b7b58d.png' alt='' class='mb-4'><h5>Foam PVC</h5><p class='paragraph-sm'>Text and motifs are created using colour printing in a UV printer. The material is suitable for indoor use for trade fairs, name badges, information signs, etc. Our foam PVC plastic signs are 3 mm thick and have a minimum size of 70x30 mm and a maximum size of 1000x1000 mm. In other words, a slightly smaller maximum size than solid PET plastic signs.</p><img src='https://cdn.skyltmax.se/vite/assets/solid_plastic-47f03aac.jpg' alt='' class='mb-4'><h5>Solid PET (PVC free)</h5><p class='paragraph-sm'>Text and motifs are created using colour printing in a UV printer on recyclable material. The material is for both indoor and outdoor use. A strong, lightweight, durable and recyclable material. It is often used for house number signs, pram signs, hotel signs, etc. Our solid PET plastic signs are 2 mm thick and have a minimum size of 70x30 mm and a maximum size of 2000x1200 mm.</p></div>",
        description: "Text and image are manufatured with a UV-printer",
        data: {
          sizes: {
            allSizes: [
              {
                isDefault: true,
                label: "25x10",
                width: 25,
                height: 10,
                startPriceAtChar: 1,
                textNumber: 0,
                maxTextChar: -1,
                minCharText: 0,
                charPrice: 0,
                basePrice: 0,
              },
              {
                isDefault: false,
                label: "50x30",
                width: 50,
                height: 30,
                startPriceAtChar: 1,
                textNumber: 0,
                maxTextChar: -1,
                minCharText: 0,
                charPrice: 0,
                basePrice: 0,
              },
              {
                isDefault: false,
                label: "60x25",
                width: 60,
                height: 25,
                startPriceAtChar: 1,
                textNumber: 0,
                maxTextChar: -1,
                minCharText: 0,
                charPrice: 0,
                basePrice: 0,
              },
              {
                isDefault: false,
                label: "80x30",
                width: 80,
                height: 30,
                startPriceAtChar: 1,
                textNumber: 0,
                maxTextChar: -1,
                minCharText: 0,
                charPrice: 0,
                basePrice: 0,
              },
              {
                isDefault: false,
                label: "100x40",
                width: 100,
                height: 40,
                startPriceAtChar: 1,
                textNumber: 0,
                maxTextChar: -1,
                minCharText: 0,
                charPrice: 0,
                basePrice: 0,
              },
              {
                isDefault: false,
                label: "100x100",
                width: 100,
                height: 100,
                startPriceAtChar: 1,
                textNumber: 0,
                maxTextChar: -1,
                minCharText: 0,
                charPrice: 0,
                basePrice: 0,
              },
              {
                isDefault: false,
                label: "150x100",
                width: 150,
                height: 100,
                startPriceAtChar: 1,
                textNumber: 0,
                maxTextChar: -1,
                minCharText: 0,
                charPrice: 0,
                basePrice: 0,
              },
              {
                isDefault: false,
                label: "200x100",
                width: 200,
                height: 100,
                startPriceAtChar: 1,
                textNumber: 0,
                maxTextChar: -1,
                minCharText: 0,
                charPrice: 0,
                basePrice: 0,
              },
              {
                isDefault: false,
                label: "200x200",
                width: 200,
                height: 200,
                startPriceAtChar: 1,
                textNumber: 0,
                maxTextChar: -1,
                minCharText: 0,
                charPrice: 0,
                basePrice: 0,
              },
              {
                isDefault: false,
                label: "250x100",
                width: 250,
                height: 100,
                startPriceAtChar: 1,
                textNumber: 0,
                maxTextChar: -1,
                minCharText: 0,
                charPrice: 0,
                basePrice: 0,
              },
              {
                isDefault: false,
                label: "295x295",
                width: 295,
                height: 295,
                startPriceAtChar: 1,
                textNumber: 0,
                maxTextChar: -1,
                minCharText: 0,
                charPrice: 0,
                basePrice: 0,
              },
            ],
            thickness: {
              active: false,
              values: [1.8, 0.8],
            },
            customSize: {
              active: true,
              width: {
                max: 295,
                min: 25,
                label: "Width",
              },
              height: {
                max: 295,
                min: 10,
                label: "Height",
              },
            },
          },
          colors: {
            customColors: {
              active: false,
              label: "Custom Colors",
              prevImg: "",
            },
            allColors: [
              {
                isDefault: true,
                name: "White",
                textColor: {
                  active: false,
                  sameForBorder: false,
                  name: "Red",
                  codeHex: "#c4271d",
                },
                pattern: {
                  active: false,
                  codeHex: "#ffffff",
                  url: "",
                },
                prevImg: "",
                additionalPrice: 0,
              },
              {
                isDefault: false,
                name: "White",
                textColor: {
                  active: false,
                  sameForBorder: false,
                  name: "Red",
                  codeHex: "#c4271d",
                },
                pattern: {
                  active: false,
                  codeHex: "#ffffff",
                  url: "",
                },
                prevImg: "",
                additionalPrice: 0,
              },
              {
                isDefault: false,
                name: "White",
                textColor: {
                  active: false,
                  sameForBorder: false,
                  name: "Blue",
                  codeHex: "#497eaa",
                },
                pattern: {
                  active: false,
                  codeHex: "#ffffff",
                  url: "",
                },
                prevImg: "",
                additionalPrice: 0,
              },
              {
                isDefault: false,
                name: "Black",
                textColor: {
                  active: false,
                  sameForBorder: false,
                  name: "White",
                  codeHex: "#ffffff",
                },
                pattern: {
                  active: false,
                  codeHex: "#000000",
                  url: "",
                },
                prevImg: "",
                additionalPrice: 0,
              },
              {
                isDefault: false,
                name: "Blue",
                textColor: {
                  active: false,
                  sameForBorder: false,
                  name: "White",
                  codeHex: "#ffffff",
                },
                pattern: {
                  active: false,
                  codeHex: "#004f86",
                  url: "",
                },
                prevImg: "",
                additionalPrice: 0,
              },
              {
                isDefault: false,
                name: "Red",
                textColor: {
                  active: false,
                  sameForBorder: false,
                  name: "White",
                  codeHex: "#ffffff",
                },
                pattern: {
                  active: false,
                  codeHex: "#c4271d",
                  url: "",
                },
                prevImg: "",
                additionalPrice: 0,
              },
              {
                isDefault: false,
                name: "Pink",
                textColor: {
                  active: false,
                  sameForBorder: false,
                  name: "White",
                  codeHex: "#ffffff",
                },
                pattern: {
                  active: false,
                  codeHex: "#eb3f77",
                  url: "",
                },
                prevImg: "",
                additionalPrice: 0,
              },
              {
                isDefault: false,
                name: "Green",
                textColor: {
                  active: false,
                  sameForBorder: false,
                  name: "White",
                  codeHex: "#ffffff",
                },
                pattern: {
                  active: false,
                  codeHex: "#009251",
                  url: "",
                },
                prevImg: "",
                additionalPrice: 0,
              },
              {
                isDefault: false,
                name: "Yellow",
                textColor: {
                  active: false,
                  sameForBorder: false,
                  name: "Black",
                  codeHex: "#000000",
                },
                pattern: {
                  active: false,
                  codeHex: "#fee900",
                  url: "",
                },
                prevImg: "",
                additionalPrice: 0,
              },
              {
                isDefault: false,
                name: "Gray",
                textColor: {
                  active: false,
                  sameForBorder: false,
                  name: "White",
                  codeHex: "#ffffff",
                },
                pattern: {
                  active: false,
                  codeHex: "#4f575b",
                  url: "",
                },
                prevImg: "",
                additionalPrice: 0,
              },
              {
                isDefault: false,
                name: "Orange",
                textColor: {
                  active: false,
                  sameForBorder: false,
                  name: "White",
                  codeHex: "#ffffff",
                },
                pattern: {
                  active: false,
                  codeHex: "#e15616",
                  url: "",
                },
                prevImg: "",
                additionalPrice: 0,
              },
              {
                isDefault: false,
                name: "Purple",
                textColor: {
                  active: false,
                  sameForBorder: false,
                  name: "White",
                  codeHex: "#ffffff",
                },
                pattern: {
                  active: false,
                  codeHex: "#554585",
                  url: "",
                },
                prevImg: "",
                additionalPrice: 0,
              },
              {
                isDefault: false,
                name: "Brown",
                textColor: {
                  active: false,
                  sameForBorder: false,
                  name: "White",
                  codeHex: "#ffffff",
                },
                pattern: {
                  active: false,
                  codeHex: "#523d2a",
                  url: "",
                },
                prevImg: "",
                additionalPrice: 0,
              },
              {
                isDefault: false,
                name: "Gold",
                textColor: {
                  active: false,
                  sameForBorder: false,
                  name: "White",
                  codeHex: "#000000",
                },
                pattern: {
                  active: false,
                  codeHex: "#daa520",
                  url: "",
                },
                prevImg: "",
                additionalPrice: 0,
              },
              {
                isDefault: false,
                name: "Silver",
                textColor: {
                  active: false,
                  sameForBorder: false,
                  name: "Black",
                  codeHex: "#bbbbbb",
                },
                pattern: {
                  active: false,
                  codeHex: "#daa520",
                  url: "",
                },
                prevImg: "",
                additionalPrice: 0,
              },
              {
                isDefault: false,
                name: "Rose Gold",
                textColor: {
                  active: false,
                  sameForBorder: false,
                  name: "Black",
                  codeHex: "#000000",
                },
                pattern: {
                  active: false,
                  codeHex: "#c27268",
                  url: "",
                },
                prevImg: "",
                additionalPrice: 0,
              },
            ],
          },
          shapes: [
            {
              isDefault: true,
              shapeId: 3,
              additionalPrice: 0,
            },
            {
              isDefault: false,
              shapeId: 1,
              additionalPrice: 0,
            },
            {
              isDefault: false,
              shapeId: 0,
              additionalPrice: 0,
            },
            {
              isDefault: false,
              shapeId: 9,
              additionalPrice: 0,
            },
            {
              isDefault: false,
              shapeId: 7,
              additionalPrice: 0,
            },
            {
              isDefault: false,
              shapeId: 8,
              additionalPrice: 0,
            },
            {
              isDefault: false,
              shapeId: 4,
              additionalPrice: 0,
            },
            {
              isDefault: false,
              shapeId: 2,
              additionalPrice: 0,
            },
            {
              isDefault: false,
              shapeId: 5,
              additionalPrice: 0,
            },
            {
              isDefault: false,
              shapeId: 6,
              additionalPrice: 0,
            },
          ],
          borders: {
            settings: {
              colors: [],
              enableBorderWidth: false,
              enableBorderColor: false,
              borderColorsLabel: "Borders Colors",
              customColorsPrevImg: "",
            },
            allBorders: [
              {
                isDefault: true,
                manageBorderId: 0,
                additionalPrice: 0,
                excludeSizes: [],
                excludeShapes: [],
              },
              {
                isDefault: false,
                manageBorderId: 1,
                additionalPrice: 0,
                excludeSizes: [],
                excludeShapes: [],
              },
              {
                isDefault: false,
                manageBorderId: 2,
                additionalPrice: 0,
                excludeSizes: [],
                excludeShapes: [2, 3, 4, 5, 6, 7, 8],
              },
            ],
          },
          discounts: [],
          textImages: {
            enableText: true,
            enableImage: true,
          },
          fixingMethods: [
            {
              isDefault: true,
              fixingMethodId: 0,
              additionalPrice: 0,
              excludeSizes: [],
              excludeShapes: [],
            },
            {
              isDefault: false,
              fixingMethodId: 2,
              additionalPrice: 0,
              excludeSizes: [],
              excludeShapes: [],
            },
            {
              isDefault: false,
              fixingMethodId: 1,
              additionalPrice: 1,
              excludeSizes: [],
              excludeShapes: [],
            },
            {
              isDefault: false,
              fixingMethodId: 14,
              additionalPrice: 4.5,
              excludeSizes: [],
              excludeShapes: [],
            },
            {
              isDefault: false,
              fixingMethodId: 3,
              additionalPrice: 4.5,
              excludeSizes: [],
              excludeShapes: [],
            },
            {
              isDefault: false,
              fixingMethodId: 5,
              additionalPrice: 1.5,
              excludeSizes: [],
              excludeShapes: [],
            },
            {
              isDefault: false,
              fixingMethodId: 8,
              additionalPrice: 1.5,
              excludeSizes: [11],
              excludeShapes: [2, 3, 4, 5, 6, 7, 8, 9],
            },
            {
              isDefault: false,
              fixingMethodId: 6,
              additionalPrice: 4.5,
              excludeSizes: [0, 1, 2],
              excludeShapes: [2, 3, 4, 5, 6, 7, 8, 9],
            },
            {
              isDefault: false,
              fixingMethodId: 9,
              additionalPrice: 19,
              excludeSizes: [0, 1, 2, 3, 4, 5, 6],
              excludeShapes: [2, 3, 4, 5, 6, 7, 8, 9],
            },
          ],
          additionalOptions: [],
        },
      },
    ],
  },
  rollup: {
    materials: [
      {
        icon: "https://signsdesigner.us/app/demos/roll-up-signs/standard.svg",
        name: "Standard",
        type: "simple",
        popImg: "",
        description:
          "PET polyester film free from PVC Opaque with grey back 100% curl-free 220 µ thick",
        data: {
          sizes: {
            allSizes: [
              {
                isDefault: true,
                label: "850x2000",
                width: 850,
                height: 2000,
                startPriceAtChar: 1,
                textNumber: 0,
                maxTextChar: -1,
                minCharText: 0,
                charPrice: 0,
                basePrice: 0,
              },
              {
                isDefault: false,
                label: "1000x2000",
                width: 1000,
                height: 2000,
                startPriceAtChar: 1,
                textNumber: 0,
                maxTextChar: -1,
                minCharText: 0,
                charPrice: 0,
                basePrice: 0,
              },
            ],
            thickness: {
              active: false,
              values: [],
            },
            customSize: {
              active: false,
            },
          },
          colors: {
            customColors: {
              active: false,
              label: "Custom Colors",
              prevImg: "",
            },
            allColors: [
              {
                isDefault: true,
                name: "White",
                textColor: {
                  active: false,
                  sameForBorder: false,
                  name: "",
                  codeHex: "#000000",
                },
                pattern: {
                  active: false,
                  codeHex: "#ffffff",
                  url: "",
                },
                prevImg: "",
                additionalPrice: 0,
              },
              {
                isDefault: false,
                name: "Black",
                textColor: {
                  active: false,
                  sameForBorder: false,
                  name: "",
                  codeHex: "#000000",
                },
                pattern: {
                  active: false,
                  codeHex: "#000000",
                  url: "",
                },
                prevImg: "",
                additionalPrice: 0,
              },
              {
                isDefault: false,
                name: "Blue",
                textColor: {
                  active: false,
                  sameForBorder: false,
                  name: "",
                  codeHex: "#000000",
                },
                pattern: {
                  active: false,
                  codeHex: "#004f86",
                  url: "",
                },
                prevImg: "",
                additionalPrice: 0,
              },
              {
                isDefault: false,
                name: "Red",
                textColor: {
                  active: false,
                  sameForBorder: false,
                  name: "",
                  codeHex: "#000000",
                },
                pattern: {
                  active: false,
                  codeHex: "#c4271d",
                  url: "",
                },
                prevImg: "",
                additionalPrice: 0,
              },
              {
                isDefault: false,
                name: "Green",
                textColor: {
                  active: false,
                  sameForBorder: false,
                  name: "",
                  codeHex: "#000000",
                },
                pattern: {
                  active: false,
                  codeHex: "#009251",
                  url: "",
                },
                prevImg: "",
                additionalPrice: 0,
              },
              {
                isDefault: false,
                name: "Yellow",
                textColor: {
                  active: false,
                  sameForBorder: false,
                  name: "",
                  codeHex: "#000000",
                },
                pattern: {
                  active: false,
                  codeHex: "#fee900",
                  url: "",
                },
                prevImg: "",
                additionalPrice: 0,
              },
              {
                isDefault: false,
                name: "Gray",
                textColor: {
                  active: false,
                  sameForBorder: false,
                  name: "",
                  codeHex: "#000000",
                },
                pattern: {
                  active: false,
                  codeHex: "#4f5756",
                  url: "",
                },
                prevImg: "",
                additionalPrice: 0,
              },
              {
                isDefault: false,
                name: "Pink",
                textColor: {
                  active: false,
                  sameForBorder: false,
                  name: "",
                  codeHex: "#000000",
                },
                pattern: {
                  active: false,
                  codeHex: "#bc4077",
                  url: "",
                },
                prevImg: "",
                additionalPrice: 0,
              },
              {
                isDefault: false,
                name: "Purple",
                textColor: {
                  active: false,
                  sameForBorder: false,
                  name: "",
                  codeHex: "#000000",
                },
                pattern: {
                  active: false,
                  codeHex: "#554585",
                  url: "",
                },
                prevImg: "",
                additionalPrice: 0,
              },
              {
                isDefault: false,
                name: "Orange",
                textColor: {
                  active: false,
                  sameForBorder: false,
                  name: "",
                  codeHex: "#000000",
                },
                pattern: {
                  active: false,
                  codeHex: "#e15616",
                  url: "",
                },
                prevImg: "",
                additionalPrice: 0,
              },
              {
                isDefault: false,
                name: "Brown",
                textColor: {
                  active: false,
                  sameForBorder: false,
                  name: "",
                  codeHex: "#000000",
                },
                pattern: {
                  active: false,
                  codeHex: "#523d2a",
                  url: "",
                },
                prevImg: "",
                additionalPrice: 0,
              },
            ],
          },
          shapes: [
            {
              isDefault: true,
              shapeId: 1,
              additionalPrice: 0,
            },
          ],
          borders: {
            settings: {
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
                {
                  name: "Blue",
                  codeHex: "#004f86",
                  prevImg: "",
                  additionalPrice: 0,
                },
                {
                  name: "Red",
                  codeHex: "#c4271d",
                  prevImg: "",
                  additionalPrice: 0,
                },
                {
                  name: "Green",
                  codeHex: "#009251",
                  prevImg: "",
                  additionalPrice: 0,
                },
                {
                  name: "Yellow",
                  codeHex: "#fee900",
                  prevImg: "",
                  additionalPrice: 0,
                },
                {
                  name: "Gray",
                  codeHex: "#4f5756",
                  prevImg: "",
                  additionalPrice: 0,
                },
                {
                  name: "Pink",
                  codeHex: "#bc4077",
                  prevImg: "",
                  additionalPrice: 0,
                },
                {
                  name: "Purple",
                  codeHex: "#554585",
                  prevImg: "",
                  additionalPrice: 0,
                },
                {
                  name: "Orange",
                  codeHex: "#e15616",
                  prevImg: "",
                  additionalPrice: 0,
                },
                {
                  name: "Brown",
                  codeHex: "#523d2a",
                  prevImg: "",
                  additionalPrice: 0,
                },
              ],
              enableBorderWidth: false,
              enableBorderColor: true,
              borderColorsLabel: "Borders Colors",
              customColorsPrevImg: "",
            },
            allBorders: [
              {
                isDefault: true,
                manageBorderId: 0,
                additionalPrice: 0,
                excludeSizes: [],
                excludeShapes: [],
              },
              {
                isDefault: false,
                manageBorderId: 1,
                additionalPrice: 0,
                excludeSizes: [],
                excludeShapes: [],
              },
            ],
          },
          discounts: [],
          textImages: {
            enableText: true,
            enableImage: true,
          },
          fixingMethods: [
            {
              isDefault: true,
              fixingMethodId: 0,
              additionalPrice: 0,
              excludeSizes: [],
              excludeShapes: [],
            },
            {
              isDefault: false,
              fixingMethodId: 19,
              additionalPrice: 26.1,
              excludeSizes: [],
              excludeShapes: [],
            },
          ],
          additionalOptions: [],
        },
      },
      {
        icon: "https://signsdesigner.us/app/demos/roll-up-signs/eco.svg",
        name: "ECO",
        type: "simple",
        popImg: "",
        description:
          "Polyester weave (free from PVC). Fire classification as per B-s1,dO 100% opaque 300 µ thick",
        data: {
          sizes: {
            allSizes: [
              {
                isDefault: true,
                label: "850x2000",
                width: 850,
                height: 2000,
                startPriceAtChar: 1,
                textNumber: 0,
                maxTextChar: -1,
                minCharText: 0,
                charPrice: 0,
                basePrice: 0,
              },
              {
                isDefault: false,
                label: "1000x2000",
                width: 1000,
                height: 2000,
                startPriceAtChar: 1,
                textNumber: 0,
                maxTextChar: -1,
                minCharText: 0,
                charPrice: 0,
                basePrice: 0,
              },
            ],
            thickness: {
              active: false,
              values: [],
            },
            customSize: {
              active: false,
            },
          },
          colors: {
            customColors: {
              active: false,
              label: "Custom Colors",
              prevImg: "",
            },
            allColors: [
              {
                isDefault: true,
                name: "White",
                textColor: {
                  active: false,
                  sameForBorder: false,
                  name: "",
                  codeHex: "#000000",
                },
                pattern: {
                  active: false,
                  codeHex: "#ffffff",
                  url: "",
                },
                prevImg: "",
                additionalPrice: 0,
              },
              {
                isDefault: false,
                name: "Black",
                textColor: {
                  active: false,
                  sameForBorder: false,
                  name: "",
                  codeHex: "#000000",
                },
                pattern: {
                  active: false,
                  codeHex: "#000000",
                  url: "",
                },
                prevImg: "",
                additionalPrice: 0,
              },
              {
                isDefault: false,
                name: "Blue",
                textColor: {
                  active: false,
                  sameForBorder: false,
                  name: "",
                  codeHex: "#000000",
                },
                pattern: {
                  active: false,
                  codeHex: "#004f86",
                  url: "",
                },
                prevImg: "",
                additionalPrice: 0,
              },
              {
                isDefault: false,
                name: "Red",
                textColor: {
                  active: false,
                  sameForBorder: false,
                  name: "",
                  codeHex: "#000000",
                },
                pattern: {
                  active: false,
                  codeHex: "#c4271d",
                  url: "",
                },
                prevImg: "",
                additionalPrice: 0,
              },
              {
                isDefault: false,
                name: "Green",
                textColor: {
                  active: false,
                  sameForBorder: false,
                  name: "",
                  codeHex: "#000000",
                },
                pattern: {
                  active: false,
                  codeHex: "#009251",
                  url: "",
                },
                prevImg: "",
                additionalPrice: 0,
              },
              {
                isDefault: false,
                name: "Yellow",
                textColor: {
                  active: false,
                  sameForBorder: false,
                  name: "",
                  codeHex: "#000000",
                },
                pattern: {
                  active: false,
                  codeHex: "#fee900",
                  url: "",
                },
                prevImg: "",
                additionalPrice: 0,
              },
              {
                isDefault: false,
                name: "Gray",
                textColor: {
                  active: false,
                  sameForBorder: false,
                  name: "",
                  codeHex: "#000000",
                },
                pattern: {
                  active: false,
                  codeHex: "#4f5756",
                  url: "",
                },
                prevImg: "",
                additionalPrice: 0,
              },
              {
                isDefault: false,
                name: "Pink",
                textColor: {
                  active: false,
                  sameForBorder: false,
                  name: "",
                  codeHex: "#000000",
                },
                pattern: {
                  active: false,
                  codeHex: "#bc4077",
                  url: "",
                },
                prevImg: "",
                additionalPrice: 0,
              },
              {
                isDefault: false,
                name: "Purple",
                textColor: {
                  active: false,
                  sameForBorder: false,
                  name: "",
                  codeHex: "#000000",
                },
                pattern: {
                  active: false,
                  codeHex: "#554585",
                  url: "",
                },
                prevImg: "",
                additionalPrice: 0,
              },
              {
                isDefault: false,
                name: "Orange",
                textColor: {
                  active: false,
                  sameForBorder: false,
                  name: "",
                  codeHex: "#000000",
                },
                pattern: {
                  active: false,
                  codeHex: "#e15616",
                  url: "",
                },
                prevImg: "",
                additionalPrice: 0,
              },
              {
                isDefault: false,
                name: "Brown",
                textColor: {
                  active: false,
                  sameForBorder: false,
                  name: "",
                  codeHex: "#000000",
                },
                pattern: {
                  active: false,
                  codeHex: "#523d2a",
                  url: "",
                },
                prevImg: "",
                additionalPrice: 0,
              },
            ],
          },
          shapes: [
            {
              isDefault: true,
              shapeId: 1,
              additionalPrice: 0,
            },
          ],
          borders: {
            settings: {
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
                {
                  name: "Blue",
                  codeHex: "#004f86",
                  prevImg: "",
                  additionalPrice: 0,
                },
                {
                  name: "Red",
                  codeHex: "#c4271d",
                  prevImg: "",
                  additionalPrice: 0,
                },
                {
                  name: "Green",
                  codeHex: "#009251",
                  prevImg: "",
                  additionalPrice: 0,
                },
                {
                  name: "Yellow",
                  codeHex: "#fee900",
                  prevImg: "",
                  additionalPrice: 0,
                },
                {
                  name: "Gray",
                  codeHex: "#4f5756",
                  prevImg: "",
                  additionalPrice: 0,
                },
                {
                  name: "Pink",
                  codeHex: "#bc4077",
                  prevImg: "",
                  additionalPrice: 0,
                },
                {
                  name: "Purple",
                  codeHex: "#554585",
                  prevImg: "",
                  additionalPrice: 0,
                },
                {
                  name: "Orange",
                  codeHex: "#e15616",
                  prevImg: "",
                  additionalPrice: 0,
                },
                {
                  name: "Brown",
                  codeHex: "#523d2a",
                  prevImg: "",
                  additionalPrice: 0,
                },
              ],
              enableBorderWidth: false,
              enableBorderColor: true,
              borderColorsLabel: "Borders Colors",
              customColorsPrevImg: "",
            },
            allBorders: [
              {
                isDefault: true,
                manageBorderId: 0,
                additionalPrice: 0,
                excludeSizes: [],
                excludeShapes: [],
              },
              {
                isDefault: false,
                manageBorderId: 1,
                additionalPrice: 0,
                excludeSizes: [],
                excludeShapes: [],
              },
            ],
          },
          discounts: [],
          textImages: {
            enableText: true,
            enableImage: true,
          },
          fixingMethods: [
            {
              isDefault: true,
              fixingMethodId: 0,
              additionalPrice: 0,
              excludeSizes: [],
              excludeShapes: [],
            },
            {
              isDefault: false,
              fixingMethodId: 19,
              additionalPrice: 26.1,
              excludeSizes: [],
              excludeShapes: [],
            },
          ],
          additionalOptions: [],
        },
      },
    ],
  },
  stainlessStell: {
    materials: [
      {
        icon: "",
        name: "Stainless steel",
        type: "advance",
        popImg: "",
        description: "",
        isDefault: true,
        data: [
          {
            isDefault: true,
            name: "Label tags",
            description: "",
            icon: "https://signsdesigner.us/app/demos/stainless-steel-signs/label-tags.svg",
            options: [
              {
                isDefault: true,
                name: "Stainless steel",
                description: "Stainless steel",
                icon: "https://signsdesigner.us/app/demos/stainless-steel-signs/stainless_steel1.png",
                image:
                  asowp_data.assets_url + "/images/stainless_steel1-prev.png",
                color: {
                  name: "Stainless steel",
                  codeHex: "",
                  prevImg:
                    asowp_data.assets_url + "/images/stainless_steel1-prev.png",
                },
                fixingMethods: [5, 2, 15, 18],
                shapeId: 10,
                size: {
                  width: 28,
                  height: 49,
                  basePrice: 0,
                  startPriceAtChar: 1,
                  maxTextChar: -1,
                  minCharText: 0,
                  charPrice: 0,
                },
                additionalPrice: 6.49,
              },
              {
                isDefault: false,
                name: "Stainless steel",
                description: "Stainless steel",
                icon: "https://signsdesigner.us/app/demos/stainless-steel-signs/stainless_steel2.png",
                image:
                  asowp_data.assets_url + "/images/stainless_steel2-prev.png",
                color: {
                  name: "Stainless steel",
                  codeHex: "",
                  prevImg:
                    asowp_data.assets_url + "/images/stainless_steel2-prev.png",
                },
                fixingMethods: [5, 2, 15, 18],
                shapeId: 0,
                size: {
                  width: 30,
                  height: 30,
                  basePrice: 0,
                  startPriceAtChar: 1,
                  maxTextChar: -1,
                  minCharText: 0,
                  charPrice: 0,
                },
                additionalPrice: 5.99,
              },
              {
                isDefault: false,
                name: "Stainless steel",
                description: "Stainless steel",
                icon: "https://signsdesigner.us/app/demos/stainless-steel-signs/stainless_steel3.png",
                image:
                  asowp_data.assets_url + "/images/stainless_steel3-prev.png",
                color: {
                  name: "Stainless steel",
                  codeHex: "",
                  prevImg:
                    asowp_data.assets_url + "/images/stainless_steel3-prev.png",
                },
                fixingMethods: [0, 2, 1],
                shapeId: 3,
                size: {
                  width: 60,
                  height: 18,
                  basePrice: 0,
                  startPriceAtChar: 1,
                  maxTextChar: -1,
                  minCharText: 0,
                  charPrice: 0,
                },
                additionalPrice: 8.29,
              },
              {
                isDefault: false,
                name: "Stainless steel",
                description: "Stainless steel",
                icon: "https://signsdesigner.us/app/demos/stainless-steel-signs/stainless_steel4.png",
                image:
                  asowp_data.assets_url + "/images/stainless_steel4-prev.png",
                color: {
                  name: "Stainless steel",
                  codeHex: "",
                  prevImg:
                    asowp_data.assets_url + "/images/stainless_steel4-prev.png",
                },
                fixingMethods: [0, 2, 1],
                shapeId: 3,
                size: {
                  width: 60,
                  height: 30,
                  basePrice: 0,
                  startPriceAtChar: 1,
                  maxTextChar: -1,
                  minCharText: 0,
                  charPrice: 0,
                },
                additionalPrice: 8.29,
              },
              {
                isDefault: false,
                name: "Stainless steel",
                description: "Stainless steel",
                icon: "https://signsdesigner.us/app/demos/stainless-steel-signs/stainless_steel5.png",
                image:
                  asowp_data.assets_url + "/images/stainless_steel5-prev.png",
                color: {
                  name: "Stainless steel",
                  codeHex: "",
                  prevImg:
                    asowp_data.assets_url + "/images/stainless_steel5-prev.png",
                },
                fixingMethods: [0, 2, 1],
                shapeId: 0,
                size: {
                  width: 50,
                  height: 50,
                  basePrice: 0,
                  startPriceAtChar: 1,
                  maxTextChar: -1,
                  minCharText: 0,
                  charPrice: 0,
                },
                additionalPrice: 9.49,
              },
              {
                isDefault: false,
                name: "Stainless steel",
                description: "Stainless steel",
                icon: "https://signsdesigner.us/app/demos/stainless-steel-signs/stainless_steel6.png",
                image:
                  asowp_data.assets_url + "/images/stainless_steel6-prev.png",
                color: {
                  name: "Stainless steel",
                  codeHex: "",
                  prevImg:
                    asowp_data.assets_url + "/images/stainless_steel6-prev.png",
                },
                fixingMethods: [0, 2, 1],
                shapeId: 3,
                size: {
                  width: 80,
                  height: 25,
                  basePrice: 0,
                  startPriceAtChar: 1,
                  maxTextChar: -1,
                  minCharText: 0,
                  charPrice: 0,
                },
                additionalPrice: 10.69,
              },
              {
                isDefault: false,
                name: "Stainless steel",
                description: "Stainless steel",
                icon: "https://signsdesigner.us/app/demos/stainless-steel-signs/stainless_steel7.png",
                image:
                  asowp_data.assets_url + "/images/stainless_steel7-prev.png",
                color: {
                  name: "Stainless steel",
                  codeHex: "",
                  prevImg:
                    asowp_data.assets_url + "/images/stainless_steel7-prev.png",
                },
                fixingMethods: [0, 2, 1],
                shapeId: 3,
                size: {
                  width: 100,
                  height: 40,
                  basePrice: 0,
                  startPriceAtChar: 1,
                  maxTextChar: -1,
                  minCharText: 0,
                  charPrice: 0,
                },
                additionalPrice: 14.29,
              },
              {
                isDefault: false,
                name: "Stainless steel",
                description: "Stainless steel",
                icon: "https://signsdesigner.us/app/demos/stainless-steel-signs/stainless_steel8.png",
                image:
                  asowp_data.assets_url + "/images/stainless_steel8-prev.png",
                color: {
                  name: "Stainless steel",
                  codeHex: "",
                  prevImg:
                    asowp_data.assets_url + "/images/stainless_steel8-prev.png",
                },
                fixingMethods: [0, 2, 1],
                shapeId: 3,
                size: {
                  width: 150,
                  height: 50,
                  basePrice: 0,
                  startPriceAtChar: 1,
                  maxTextChar: -1,
                  minCharText: 0,
                  charPrice: 0,
                },
                additionalPrice: 17.89,
              },
              {
                isDefault: false,
                name: "Stainless steel",
                description: "Stainless steel",
                icon: "https://signsdesigner.us/app/demos/stainless-steel-signs/stainless_steel9.png",
                image:
                  asowp_data.assets_url + "/images/stainless_steel9-prev.png",
                color: {
                  name: "Stainless steel",
                  codeHex: "",
                  prevImg:
                    asowp_data.assets_url + "/images/stainless_steel9-prev.png",
                },
                fixingMethods: [0, 2, 1],
                shapeId: 3,
                size: {
                  width: 170,
                  height: 70,
                  basePrice: 0,
                  startPriceAtChar: 1,
                  maxTextChar: -1,
                  minCharText: 0,
                  charPrice: 0,
                },
                additionalPrice: 23.39,
              },
            ],
          },
        ],
      },
    ],
  },
  "woods-sign": {
    materials: [
      {
        icon: "https://signsdesigner.us/app/demos/wood-signs/wood_birch.png",
        name: "Birch",
        type: "simple",
        popImg: "",
        description: "",
        data: {
          sizes: {
            allSizes: [
              {
                isDefault: true,
                label: "30x30",
                width: 30,
                height: 30,
                startPriceAtChar: 1,
                textNumber: 0,
                maxTextChar: -1,
                minCharText: 0,
                charPrice: 0,
                basePrice: 0,
              },
              {
                isDefault: false,
                label: "50x50",
                width: 50,
                height: 50,
                startPriceAtChar: 1,
                textNumber: 0,
                maxTextChar: -1,
                minCharText: 0,
                charPrice: 0,
                basePrice: 0,
              },
              {
                isDefault: false,
                label: "70x50",
                width: 70,
                height: 50,
                startPriceAtChar: 1,
                textNumber: 0,
                maxTextChar: -1,
                minCharText: 0,
                charPrice: 0,
                basePrice: 0,
              },
              {
                isDefault: false,
                label: "100x50",
                width: 100,
                height: 50,
                startPriceAtChar: 1,
                textNumber: 0,
                maxTextChar: -1,
                minCharText: 0,
                charPrice: 0,
                basePrice: 0,
              },
              {
                isDefault: false,
                label: "100x100",
                width: 100,
                height: 100,
                startPriceAtChar: 1,
                textNumber: 0,
                maxTextChar: -1,
                minCharText: 0,
                charPrice: 0,
                basePrice: 0,
              },
              {
                isDefault: false,
                label: "200x100",
                width: 200,
                height: 100,
                startPriceAtChar: 1,
                textNumber: 0,
                maxTextChar: -1,
                minCharText: 0,
                charPrice: 0,
                basePrice: 0,
              },
              {
                isDefault: false,
                label: "200x200",
                width: 200,
                height: 200,
                startPriceAtChar: 1,
                textNumber: 0,
                maxTextChar: -1,
                minCharText: 0,
                charPrice: 0,
                basePrice: 0,
              },
              {
                isDefault: false,
                label: "300x100",
                width: 300,
                height: 100,
                startPriceAtChar: 1,
                textNumber: 0,
                maxTextChar: -1,
                minCharText: 0,
                charPrice: 0,
                basePrice: 0,
              },
              {
                isDefault: false,
                label: "300x200",
                width: 300,
                height: 200,
                startPriceAtChar: 1,
                textNumber: 0,
                maxTextChar: -1,
                minCharText: 0,
                charPrice: 0,
                basePrice: 0,
              },
              {
                isDefault: false,
                label: "500x300",
                width: 500,
                height: 300,
                startPriceAtChar: 1,
                textNumber: 0,
                maxTextChar: -1,
                minCharText: 0,
                charPrice: 0,
                basePrice: 0,
              },
              {
                isDefault: false,
                label: "500x500",
                width: 500,
                height: 500,
                startPriceAtChar: 1,
                textNumber: 0,
                maxTextChar: -1,
                minCharText: 0,
                charPrice: 0,
                basePrice: 0,
              },
              {
                isDefault: false,
                label: "600x200",
                width: 600,
                height: 200,
                startPriceAtChar: 1,
                textNumber: 0,
                maxTextChar: -1,
                minCharText: 0,
                charPrice: 0,
                basePrice: 0,
              },
              {
                isDefault: false,
                label: "600x600",
                width: 600,
                height: 600,
                startPriceAtChar: 1,
                textNumber: 0,
                maxTextChar: -1,
                minCharText: 0,
                charPrice: 0,
                basePrice: 0,
              },
              {
                isDefault: false,
                label: "800x500",
                width: 800,
                height: 500,
                startPriceAtChar: 1,
                textNumber: 0,
                maxTextChar: -1,
                minCharText: 0,
                charPrice: 0,
                basePrice: 0,
              },
              {
                isDefault: false,
                label: "800x800",
                width: 800,
                height: 800,
                startPriceAtChar: 1,
                textNumber: 0,
                maxTextChar: -1,
                minCharText: 0,
                charPrice: 0,
                basePrice: 0,
              },
              {
                isDefault: false,
                label: "1000x500",
                width: 1000,
                height: 500,
                startPriceAtChar: 1,
                textNumber: 0,
                maxTextChar: -1,
                minCharText: 0,
                charPrice: 0,
                basePrice: 0,
              },
              {
                isDefault: false,
                label: "1000x800",
                width: 1000,
                height: 800,
                startPriceAtChar: 1,
                textNumber: 0,
                maxTextChar: -1,
                minCharText: 0,
                charPrice: 0,
                basePrice: 0,
              },
              {
                isDefault: false,
                label: "1100x800",
                width: 1100,
                height: 800,
                startPriceAtChar: 1,
                textNumber: 0,
                maxTextChar: -1,
                minCharText: 0,
                charPrice: 0,
                basePrice: 0,
              },
              {
                isDefault: false,
                label: "1100x1100",
                width: 1100,
                height: 1100,
                startPriceAtChar: 1,
                textNumber: 0,
                maxTextChar: -1,
                minCharText: 0,
                charPrice: 0,
                basePrice: 0,
              },
            ],
            thickness: {
              active: false,
              values: [],
            },
            customSize: {
              active: true,
              width: {
                max: 1100,
                min: 30,
                label: "Width",
              },
              height: {
                max: 1100,
                min: 30,
                label: "Height",
              },
              pricings: [
                { surface: 300, basePrice: 10, charPrice: 1.5 },
                { surface: 700, basePrice: 10, charPrice: 3 },
                { surface: 1100, basePrice: 10, charPrice: 5 },
              ],
            },
          },
          colors: {
            customColors: {
              active: false,
              label: "Custom Colors",
              prevImg: "",
            },
            allColors: [
              {
                isDefault: true,
                name: "Wood",
                textColor: {
                  active: false,
                  sameForBorder: false,
                  name: "",
                  codeHex: "#000000",
                },
                pattern: {
                  active: true,
                  codeHex: "#FF8C00",
                  url: asowp_data.assets_url + "/images/im_wood-birch.png",
                },
                prevImg:
                  "https://signsdesigner.us/app/demos/wood-signs/wood-birch.png",
                additionalPrice: 9.19,
              },
            ],
          },
          shapes: [
            {
              isDefault: true,
              shapeId: 3,
              additionalPrice: 0,
            },
            {
              isDefault: false,
              shapeId: 1,
              additionalPrice: 0,
            },
            {
              isDefault: false,
              shapeId: 0,
              additionalPrice: 0,
            },
            {
              isDefault: false,
              shapeId: 7,
              additionalPrice: 0,
            },
            {
              isDefault: false,
              shapeId: 8,
              additionalPrice: 0,
            },
            {
              isDefault: false,
              shapeId: 9,
              additionalPrice: 0,
            },
            {
              isDefault: false,
              shapeId: 4,
              additionalPrice: 0,
            },
            {
              isDefault: false,
              shapeId: 2,
              additionalPrice: 0,
            },
            {
              isDefault: false,
              shapeId: 5,
              additionalPrice: 0,
            },
            {
              isDefault: false,
              shapeId: 6,
              additionalPrice: 0,
            },
          ],
          borders: {
            settings: {
              colors: [
                {
                  name: "Birch",
                  codeHex: "#a88f71",
                  prevImg: "",
                  additionalPrice: 0,
                },
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
                {
                  name: "Blue",
                  codeHex: "#004f86",
                  prevImg: "",
                  additionalPrice: 0,
                },
                {
                  name: "Red",
                  codeHex: "#c4271d",
                  prevImg: "",
                  additionalPrice: 0,
                },
                {
                  name: "Green",
                  codeHex: "#009251",
                  prevImg: "",
                  additionalPrice: 0,
                },
                {
                  name: "Yellow",
                  codeHex: "#fee900",
                  prevImg: "",
                  additionalPrice: 0,
                },
                {
                  name: "Gray",
                  codeHex: "#4f5756",
                  prevImg: "",
                  additionalPrice: 0,
                },
                {
                  name: "Pink",
                  codeHex: "#bc4077",
                  prevImg: "",
                  additionalPrice: 0,
                },
                {
                  name: "Purple",
                  codeHex: "#554585",
                  prevImg: "",
                  additionalPrice: 0,
                },
                {
                  name: "Orange",
                  codeHex: "#e15616",
                  prevImg: "",
                  additionalPrice: 0,
                },
                {
                  name: "Brown",
                  codeHex: "#523d2a",
                  prevImg: "",
                  additionalPrice: 0,
                },
              ],
              enableBorderWidth: false,
              enableBorderColor: true,
              borderColorsLabel: "Borders Colors",
              customColorsPrevImg: "",
            },
            allBorders: [
              {
                isDefault: true,
                manageBorderId: 0,
                additionalPrice: 0,
                excludeSizes: [],
                excludeShapes: [],
              },
              {
                isDefault: false,
                manageBorderId: 1,
                additionalPrice: 0,
                excludeSizes: [],
                excludeShapes: [],
              },
              {
                isDefault: false,
                manageBorderId: 3,
                additionalPrice: 0,
                excludeSizes: [],
                excludeShapes: [],
              },
            ],
          },
          discounts: [],
          textImages: {
            enableText: true,
            enableImage: true,
          },
          fixingMethods: [
            {
              isDefault: true,
              fixingMethodId: 0,
              additionalPrice: 0,
              excludeSizes: [],
              excludeShapes: [],
            },
            {
              isDefault: false,
              fixingMethodId: 2,
              additionalPrice: 0.1,
              excludeSizes: [],
              excludeShapes: [],
            },
            {
              isDefault: false,
              fixingMethodId: 3,
              additionalPrice: 4.7,
              excludeSizes: [1],
              excludeShapes: [],
            },
            {
              isDefault: false,
              fixingMethodId: 1,
              additionalPrice: 0.6,
              excludeSizes: [1, 14, 15, 16, 17, 18, 19],
              excludeShapes: [],
            },
            {
              isDefault: false,
              fixingMethodId: 6,
              additionalPrice: 4.8,
              excludeSizes: [1, 12, 13, 14, 15, 16, 17, 18, 19],
              excludeShapes: [0, 9, 4, 2],
            },
            {
              isDefault: false,
              fixingMethodId: 5,
              additionalPrice: 0.7,
              excludeSizes: [],
              excludeShapes: [7, 8, 5, 6],
            },
            {
              isDefault: false,
              fixingMethodId: 4,
              additionalPrice: 12.8,
              excludeSizes: [1, 2],
              excludeShapes: [],
            },
            {
              isDefault: false,
              fixingMethodId: 9,
              additionalPrice: 14.5,
              excludeSizes: [1, 2, 3, 4, 5, 16, 17, 18, 19],
              excludeShapes: [0, 7, 8, 9, 4, 2],
            },
          ],
          additionalOptions: [],
        },
      },
      {
        icon: "https://signsdesigner.us/app/demos/wood-signs/wood_oak.png",
        name: "Oak",
        type: "simple",
        popImg: "",
        description: "",
        data: {
          sizes: {
            allSizes: [
              {
                isDefault: true,
                label: "30x30",
                width: 30,
                height: 30,
                startPriceAtChar: 1,
                textNumber: 0,
                maxTextChar: -1,
                minCharText: 0,
                charPrice: 0,
                basePrice: 0,
              },
              {
                isDefault: false,
                label: "50x50",
                width: 50,
                height: 50,
                startPriceAtChar: 1,
                textNumber: 0,
                maxTextChar: -1,
                minCharText: 0,
                charPrice: 0,
                basePrice: 0,
              },
              {
                isDefault: false,
                label: "70x50",
                width: 70,
                height: 50,
                startPriceAtChar: 1,
                textNumber: 0,
                maxTextChar: -1,
                minCharText: 0,
                charPrice: 0,
                basePrice: 0,
              },
              {
                isDefault: false,
                label: "100x50",
                width: 100,
                height: 50,
                startPriceAtChar: 1,
                textNumber: 0,
                maxTextChar: -1,
                minCharText: 0,
                charPrice: 0,
                basePrice: 0,
              },
              {
                isDefault: false,
                label: "100x100",
                width: 100,
                height: 100,
                startPriceAtChar: 1,
                textNumber: 0,
                maxTextChar: -1,
                minCharText: 0,
                charPrice: 0,
                basePrice: 0,
              },
              {
                isDefault: false,
                label: "200x100",
                width: 200,
                height: 100,
                startPriceAtChar: 1,
                textNumber: 0,
                maxTextChar: -1,
                minCharText: 0,
                charPrice: 0,
                basePrice: 0,
              },
              {
                isDefault: false,
                label: "200x200",
                width: 200,
                height: 200,
                startPriceAtChar: 1,
                textNumber: 0,
                maxTextChar: -1,
                minCharText: 0,
                charPrice: 0,
                basePrice: 0,
              },
              {
                isDefault: false,
                label: "300x100",
                width: 300,
                height: 100,
                startPriceAtChar: 1,
                textNumber: 0,
                maxTextChar: -1,
                minCharText: 0,
                charPrice: 0,
                basePrice: 0,
              },
              {
                isDefault: false,
                label: "300x200",
                width: 300,
                height: 200,
                startPriceAtChar: 1,
                textNumber: 0,
                maxTextChar: -1,
                minCharText: 0,
                charPrice: 0,
                basePrice: 0,
              },
              {
                isDefault: false,
                label: "500x300",
                width: 500,
                height: 300,
                startPriceAtChar: 1,
                textNumber: 0,
                maxTextChar: -1,
                minCharText: 0,
                charPrice: 0,
                basePrice: 0,
              },
              {
                isDefault: false,
                label: "500x500",
                width: 500,
                height: 500,
                startPriceAtChar: 1,
                textNumber: 0,
                maxTextChar: -1,
                minCharText: 0,
                charPrice: 0,
                basePrice: 0,
              },
              {
                isDefault: false,
                label: "600x200",
                width: 600,
                height: 200,
                startPriceAtChar: 1,
                textNumber: 0,
                maxTextChar: -1,
                minCharText: 0,
                charPrice: 0,
                basePrice: 0,
              },
              {
                isDefault: false,
                label: "600x600",
                width: 600,
                height: 600,
                startPriceAtChar: 1,
                textNumber: 0,
                maxTextChar: -1,
                minCharText: 0,
                charPrice: 0,
                basePrice: 0,
              },
              {
                isDefault: false,
                label: "800x500",
                width: 800,
                height: 500,
                startPriceAtChar: 1,
                textNumber: 0,
                maxTextChar: -1,
                minCharText: 0,
                charPrice: 0,
                basePrice: 0,
              },
              {
                isDefault: false,
                label: "800x800",
                width: 800,
                height: 800,
                startPriceAtChar: 1,
                textNumber: 0,
                maxTextChar: -1,
                minCharText: 0,
                charPrice: 0,
                basePrice: 0,
              },
              {
                isDefault: false,
                label: "1000x500",
                width: 1000,
                height: 500,
                startPriceAtChar: 1,
                textNumber: 0,
                maxTextChar: -1,
                minCharText: 0,
                charPrice: 0,
                basePrice: 0,
              },
              {
                isDefault: false,
                label: "1000x800",
                width: 1000,
                height: 800,
                startPriceAtChar: 1,
                textNumber: 0,
                maxTextChar: -1,
                minCharText: 0,
                charPrice: 0,
                basePrice: 0,
              },
              {
                isDefault: false,
                label: "1100x800",
                width: 1100,
                height: 800,
                startPriceAtChar: 1,
                textNumber: 0,
                maxTextChar: -1,
                minCharText: 0,
                charPrice: 0,
                basePrice: 0,
              },
              {
                isDefault: false,
                label: "1100x1100",
                width: 1100,
                height: 1100,
                startPriceAtChar: 1,
                textNumber: 0,
                maxTextChar: -1,
                minCharText: 0,
                charPrice: 0,
                basePrice: 0,
              },
            ],
            thickness: {
              active: false,
              values: [],
            },
            customSize: {
              active: true,
              width: {
                max: 1100,
                min: 30,
                label: "Width",
              },
              height: {
                max: 1100,
                min: 30,
                label: "Height",
              },
              pricings: [
                { surface: 300, basePrice: 10, charPrice: 1.5 },
                { surface: 700, basePrice: 10, charPrice: 3 },
                { surface: 1100, basePrice: 10, charPrice: 5 },
              ],
            },
          },
          colors: {
            customColors: {
              active: false,
              label: "Custom Colors",
              prevImg: "",
            },
            allColors: [
              {
                isDefault: true,
                name: "Wood",
                textColor: {
                  active: false,
                  sameForBorder: false,
                  name: "",
                  codeHex: "#000000",
                },
                pattern: {
                  active: true,
                  codeHex: "#FF6600",
                  url: asowp_data.assets_url + "/images/im_wood-oak.png",
                },
                prevImg:
                  "https://signsdesigner.us/app/demos/wood-signs/wood-oak.png",
                additionalPrice: 9.19,
              },
            ],
          },
          shapes: [
            {
              isDefault: true,
              shapeId: 3,
              additionalPrice: 0,
            },
            {
              isDefault: false,
              shapeId: 1,
              additionalPrice: 0,
            },
            {
              isDefault: false,
              shapeId: 0,
              additionalPrice: 0,
            },
            {
              isDefault: false,
              shapeId: 7,
              additionalPrice: 0,
            },
            {
              isDefault: false,
              shapeId: 8,
              additionalPrice: 0,
            },
            {
              isDefault: false,
              shapeId: 9,
              additionalPrice: 0,
            },
            {
              isDefault: false,
              shapeId: 4,
              additionalPrice: 0,
            },
            {
              isDefault: false,
              shapeId: 2,
              additionalPrice: 0,
            },
            {
              isDefault: false,
              shapeId: 5,
              additionalPrice: 0,
            },
            {
              isDefault: false,
              shapeId: 6,
              additionalPrice: 0,
            },
          ],
          borders: {
            settings: {
              colors: [
                {
                  name: "Oak",
                  codeHex: "#a88f71",
                  prevImg: "",
                  additionalPrice: 0,
                },
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
                {
                  name: "Blue",
                  codeHex: "#004f86",
                  prevImg: "",
                  additionalPrice: 0,
                },
                {
                  name: "Red",
                  codeHex: "#c4271d",
                  prevImg: "",
                  additionalPrice: 0,
                },
                {
                  name: "Green",
                  codeHex: "#009251",
                  prevImg: "",
                  additionalPrice: 0,
                },
                {
                  name: "Yellow",
                  codeHex: "#fee900",
                  prevImg: "",
                  additionalPrice: 0,
                },
                {
                  name: "Gray",
                  codeHex: "#4f5756",
                  prevImg: "",
                  additionalPrice: 0,
                },
                {
                  name: "Pink",
                  codeHex: "#bc4077",
                  prevImg: "",
                  additionalPrice: 0,
                },
                {
                  name: "Purple",
                  codeHex: "#554585",
                  prevImg: "",
                  additionalPrice: 0,
                },
                {
                  name: "Orange",
                  codeHex: "#e15616",
                  prevImg: "",
                  additionalPrice: 0,
                },
                {
                  name: "Brown",
                  codeHex: "#523d2a",
                  prevImg: "",
                  additionalPrice: 0,
                },
              ],
              enableBorderWidth: false,
              enableBorderColor: true,
              borderColorsLabel: "Borders Colors",
              customColorsPrevImg: "",
            },
            allBorders: [
              {
                isDefault: true,
                manageBorderId: 0,
                additionalPrice: 0,
                excludeSizes: [],
                excludeShapes: [],
              },
              {
                isDefault: false,
                manageBorderId: 1,
                additionalPrice: 0,
                excludeSizes: [],
                excludeShapes: [],
              },
              {
                isDefault: false,
                manageBorderId: 3,
                additionalPrice: 0,
                excludeSizes: [],
                excludeShapes: [],
              },
            ],
          },
          discounts: [],
          textImages: {
            enableText: true,
            enableImage: true,
          },
          fixingMethods: [
            {
              isDefault: true,
              fixingMethodId: 0,
              additionalPrice: 0,
              excludeSizes: [],
              excludeShapes: [],
            },
            {
              isDefault: false,
              fixingMethodId: 2,
              additionalPrice: 0.1,
              excludeSizes: [],
              excludeShapes: [],
            },
            {
              isDefault: false,
              fixingMethodId: 3,
              additionalPrice: 4.7,
              excludeSizes: [1],
              excludeShapes: [],
            },
            {
              isDefault: false,
              fixingMethodId: 1,
              additionalPrice: 0.6,
              excludeSizes: [1, 14, 15, 16, 17, 18, 19],
              excludeShapes: [],
            },
            {
              isDefault: false,
              fixingMethodId: 6,
              additionalPrice: 4.8,
              excludeSizes: [1, 12, 13, 14, 15, 16, 17, 18, 19],
              excludeShapes: [0, 9, 4, 2],
            },
            {
              isDefault: false,
              fixingMethodId: 5,
              additionalPrice: 0.7,
              excludeSizes: [],
              excludeShapes: [7, 8, 5, 6],
            },
            {
              isDefault: false,
              fixingMethodId: 4,
              additionalPrice: 12.8,
              excludeSizes: [1, 2],
              excludeShapes: [],
            },
            {
              isDefault: false,
              fixingMethodId: 9,
              additionalPrice: 14.5,
              excludeSizes: [1, 2, 3, 4, 5, 16, 17, 18, 19],
              excludeShapes: [0, 7, 8, 9, 4, 2],
            },
          ],
          additionalOptions: [],
        },
      },
    ],
  },
  "double-side": {
    materials: [
      {
        icon: "https://signsdesigner.us/app/demos/double-sided/aluminium.png",
        name: "Aluminium",
        type: "simple",
        popImg: "",
        description:
          "Double-sided aluminium composite (Gobond) consist of a sandwich layer with a surface layer of aluminium and a polyethylene core.",
        data: {
          sizes: {
            allSizes: [
              {
                isDefault: true,
                label: "70x30",
                width: 70,
                height: 30,
                startPriceAtChar: 1,
                textNumber: 0,
                maxTextChar: -1,
                minChartText: 0,
                charPrice: 0,
                basePrice: 0,
              },
              {
                isDefault: false,
                label: "70x70",
                width: 70,
                height: 70,
                startPriceAtChar: 1,
                textNumber: 0,
                maxTextChar: -1,
                minChartText: 0,
                charPrice: 0,
                basePrice: 0,
              },
              {
                isDefault: false,
                label: "120x50",
                width: 120,
                height: 50,
                startPriceAtChar: 1,
                textNumber: 0,
                maxTextChar: -1,
                minChartText: 0,
                charPrice: 0,
                basePrice: 0,
              },
              {
                isDefault: false,
                label: "120x70",
                width: 120,
                height: 70,
                startPriceAtChar: 1,
                textNumber: 0,
                maxTextChar: -1,
                minChartText: 0,
                charPrice: 0,
                basePrice: 0,
              },
              {
                isDefault: false,
                label: "150x100",
                width: 150,
                height: 100,
                startPriceAtChar: 1,
                textNumber: 0,
                maxTextChar: -1,
                minChartText: 0,
                charPrice: 0,
                basePrice: 0,
              },
              {
                isDefault: false,
                label: "200x100",
                width: 200,
                height: 100,
                startPriceAtChar: 1,
                textNumber: 0,
                maxTextChar: -1,
                minChartText: 0,
                charPrice: 0,
                basePrice: 0,
              },
              {
                isDefault: false,
                label: "200x200",
                width: 200,
                height: 200,
                startPriceAtChar: 1,
                textNumber: 0,
                maxTextChar: -1,
                minChartText: 0,
                charPrice: 0,
                basePrice: 0,
              },
              {
                isDefault: false,
                label: "300x200",
                width: 300,
                height: 200,
                startPriceAtChar: 1,
                textNumber: 0,
                maxTextChar: -1,
                minChartText: 0,
                charPrice: 0,
                basePrice: 0,
              },
              {
                isDefault: false,
                label: "300x300",
                width: 300,
                height: 300,
                startPriceAtChar: 1,
                textNumber: 0,
                maxTextChar: -1,
                minChartText: 0,
                charPrice: 0,
                basePrice: 0,
              },
              {
                isDefault: false,
                label: "400x300",
                width: 400,
                height: 300,
                startPriceAtChar: 1,
                textNumber: 0,
                maxTextChar: -1,
                minChartText: 0,
                charPrice: 0,
                basePrice: 0,
              },
              {
                isDefault: false,
                label: "500x200",
                width: 500,
                height: 200,
                startPriceAtChar: 1,
                textNumber: 0,
                maxTextChar: -1,
                minChartText: 0,
                charPrice: 0,
                basePrice: 0,
              },
              {
                isDefault: false,
                label: "600x600",
                width: 600,
                height: 600,
                startPriceAtChar: 1,
                textNumber: 0,
                maxTextChar: -1,
                minChartText: 0,
                charPrice: 0,
                basePrice: 0,
              },
              {
                isDefault: false,
                label: "800x700",
                width: 800,
                height: 700,
                startPriceAtChar: 1,
                textNumber: 0,
                maxTextChar: -1,
                minChartText: 0,
                charPrice: 0,
                basePrice: 0,
              },
              {
                isDefault: false,
                label: "800x800",
                width: 800,
                height: 800,
                startPriceAtChar: 1,
                textNumber: 0,
                maxTextChar: -1,
                minChartText: 0,
                charPrice: 0,
                basePrice: 0,
              },
              {
                isDefault: false,
                label: "1000x500",
                width: 1000,
                height: 500,
                startPriceAtChar: 1,
                textNumber: 0,
                maxTextChar: -1,
                minChartText: 0,
                charPrice: 0,
                basePrice: 0,
              },
              {
                isDefault: false,
                label: "1000x600",
                width: 1000,
                height: 600,
                startPriceAtChar: 1,
                textNumber: 0,
                maxTextChar: -1,
                minChartText: 0,
                charPrice: 0,
                basePrice: 0,
              },
              {
                isDefault: false,
                label: "1000x700",
                width: 1000,
                height: 700,
                startPriceAtChar: 1,
                textNumber: 0,
                maxTextChar: -1,
                minChartText: 0,
                charPrice: 0,
                basePrice: 0,
              },
              {
                isDefault: false,
                label: "1000x1000",
                width: 1000,
                height: 1000,
                startPriceAtChar: 1,
                textNumber: 0,
                maxTextChar: -1,
                minChartText: 0,
                charPrice: 0,
                basePrice: 0,
              },
              {
                isDefault: false,
                label: "1200x700",
                width: 1200,
                height: 700,
                startPriceAtChar: 1,
                textNumber: 0,
                maxTextChar: -1,
                minChartText: 0,
                charPrice: 0,
                basePrice: 0,
              },
              {
                isDefault: false,
                label: "1400x1400",
                width: 1400,
                height: 1400,
                startPriceAtChar: 1,
                textNumber: 0,
                maxTextChar: -1,
                minChartText: 0,
                charPrice: 0,
                basePrice: 0,
              },
            ],
            thickness: {
              active: false,
              values: [],
            },
            customSize: {
              active: true,
              width: {
                max: 1400,
                min: 70,
                label: "Width",
              },
              height: {
                max: 1400,
                min: 30,
                label: "Height",
              },
            },
          },
          colors: {
            customColors: {
              active: true,
              label: "Custom Colors",
              prevImg: "",
            },
            allColors: [
              {
                isDefault: true,
                name: "White",
                textColor: {
                  active: false,
                  sameForBorder: false,
                  name: "",
                  codeHex: "#000000",
                },
                pattern: {
                  active: false,
                  codeHex: "#ffffff",
                  url: "",
                },
                prevImg: "",
                additionalPrice: 0,
              },
              {
                isDefault: false,
                name: "Aluminium",
                textColor: {
                  active: false,
                  sameForBorder: false,
                  name: "",
                  codeHex: "#000000",
                },
                pattern: {
                  active: false,
                  codeHex: "#dfdfdf",
                  url: "",
                },
                prevImg: "",
                additionalPrice: 0,
              },
              {
                isDefault: false,
                name: "Black",
                textColor: {
                  active: false,
                  sameForBorder: false,
                  name: "",
                  codeHex: "#000000",
                },
                pattern: {
                  active: false,
                  codeHex: "#000000",
                  url: "",
                },
                prevImg: "",
                additionalPrice: 0,
              },
              {
                isDefault: false,
                name: "Blue",
                textColor: {
                  active: false,
                  sameForBorder: false,
                  name: "",
                  codeHex: "#000000",
                },
                pattern: {
                  active: false,
                  codeHex: "#004f86",
                  url: "",
                },
                prevImg: "",
                additionalPrice: 0,
              },
              {
                isDefault: false,
                name: "Red",
                textColor: {
                  active: false,
                  sameForBorder: false,
                  name: "",
                  codeHex: "#000000",
                },
                pattern: {
                  active: false,
                  codeHex: "#c4271d",
                  url: "",
                },
                prevImg: "",
                additionalPrice: 0,
              },
              {
                isDefault: false,
                name: "Green",
                textColor: {
                  active: false,
                  sameForBorder: false,
                  name: "",
                  codeHex: "#000000",
                },
                pattern: {
                  active: false,
                  codeHex: "#009251",
                  url: "",
                },
                prevImg: "",
                additionalPrice: 0,
              },
              {
                isDefault: false,
                name: "Yellow",
                textColor: {
                  active: false,
                  sameForBorder: false,
                  name: "",
                  codeHex: "#000000",
                },
                pattern: {
                  active: false,
                  codeHex: "#fee900",
                  url: "",
                },
                prevImg: "",
                additionalPrice: 0,
              },
              {
                isDefault: false,
                name: "Gray",
                textColor: {
                  active: false,
                  sameForBorder: false,
                  name: "",
                  codeHex: "#000000",
                },
                pattern: {
                  active: false,
                  codeHex: "#4f5756",
                  url: "",
                },
                prevImg: "",
                additionalPrice: 0,
              },
              {
                isDefault: false,
                name: "Pink",
                textColor: {
                  active: false,
                  sameForBorder: false,
                  name: "",
                  codeHex: "#000000",
                },
                pattern: {
                  active: false,
                  codeHex: "#bc4077",
                  url: "",
                },
                prevImg: "",
                additionalPrice: 0,
              },
              {
                isDefault: false,
                name: "Purple",
                textColor: {
                  active: false,
                  sameForBorder: false,
                  name: "",
                  codeHex: "#000000",
                },
                pattern: {
                  active: false,
                  codeHex: "#554585",
                  url: "",
                },
                prevImg: "",
                additionalPrice: 0,
              },
              {
                isDefault: false,
                name: "Orange",
                textColor: {
                  active: false,
                  sameForBorder: false,
                  name: "",
                  codeHex: "#000000",
                },
                pattern: {
                  active: false,
                  codeHex: "#e15616",
                  url: "",
                },
                prevImg: "",
                additionalPrice: 0,
              },
              {
                isDefault: false,
                name: "Brown",
                textColor: {
                  active: false,
                  sameForBorder: false,
                  name: "",
                  codeHex: "#000000",
                },
                pattern: {
                  active: false,
                  codeHex: "#523d2a",
                  url: "",
                },
                prevImg: "",
                additionalPrice: 0,
              },
              {
                isDefault: false,
                name: "Gold",
                textColor: {
                  active: false,
                  sameForBorder: false,
                  name: "",
                  codeHex: "#000000",
                },
                pattern: {
                  active: false,
                  codeHex: "#e9a956",
                  url: "",
                },
                prevImg: "",
                additionalPrice: 0,
              },
              {
                isDefault: false,
                name: "Silver",
                textColor: {
                  active: false,
                  sameForBorder: false,
                  name: "",
                  codeHex: "#000000",
                },
                pattern: {
                  active: false,
                  codeHex: "#e9e9e9",
                  url: "",
                },
                prevImg: "",
                additionalPrice: 0,
              },
            ],
          },
          shapes: [
            {
              isDefault: false,
              shapeId: 1,
              additionalPrice: 0,
            },
            {
              isDefault: true,
              shapeId: 3,
              additionalPrice: 0,
            },
            {
              isDefault: false,
              shapeId: 4,
              additionalPrice: 0,
            },
            {
              isDefault: false,
              shapeId: 0,
              additionalPrice: 0,
            },
            {
              isDefault: false,
              shapeId: 9,
              additionalPrice: 0,
            },
            {
              isDefault: false,
              shapeId: 5,
              additionalPrice: 0,
            },
            {
              isDefault: false,
              shapeId: 6,
              additionalPrice: 0,
            },
            {
              isDefault: false,
              shapeId: 2,
              additionalPrice: 0,
            },
          ],
          borders: {
            settings: {
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
                {
                  name: "Blue",
                  codeHex: "#004f86",
                  prevImg: "",
                  additionalPrice: 0,
                },
                {
                  name: "Red",
                  codeHex: "#c4271d",
                  prevImg: "",
                  additionalPrice: 0,
                },
                {
                  name: "Green",
                  codeHex: "#009251",
                  prevImg: "",
                  additionalPrice: 0,
                },
                {
                  name: "Yellow",
                  codeHex: "#fee900",
                  prevImg: "",
                  additionalPrice: 0,
                },
                {
                  name: "Gray",
                  codeHex: "#4f5756",
                  prevImg: "",
                  additionalPrice: 0,
                },
                {
                  name: "Pink",
                  codeHex: "#bc4077",
                  prevImg: "",
                  additionalPrice: 0,
                },
                {
                  name: "Purple",
                  codeHex: "#554585",
                  prevImg: "",
                  additionalPrice: 0,
                },
                {
                  name: "Orange",
                  codeHex: "#e15616",
                  prevImg: "",
                  additionalPrice: 0,
                },
                {
                  name: "Brown",
                  codeHex: "#523d2a",
                  prevImg: "",
                  additionalPrice: 0,
                },
                {
                  name: "Gold",
                  codeHex: "#e9a956",
                  prevImg: "",
                  additionalPrice: 0,
                },
                {
                  name: "Silver",
                  codeHex: "#e9e9e9",
                  prevImg: "",
                  additionalPrice: 0,
                },
              ],
              enableBorderWidth: false,
              enableBorderColor: true,
              borderColorsLabel: "Borders Colors",
              customColorsPrevImg: "",
            },
            allBorders: [
              {
                isDefault: true,
                manageBorderId: 0,
                additionalPrice: 0,
                excludeSizes: [],
                excludeShapes: [],
              },
              {
                isDefault: false,
                manageBorderId: 1,
                additionalPrice: 0,
                excludeSizes: [],
                excludeShapes: [],
              },
              {
                isDefault: true,
                manageBorderId: 2,
                additionalPrice: 0,
                excludeSizes: [],
                excludeShapes: [],
              },
              {
                isDefault: false,
                manageBorderId: 3,
                additionalPrice: 0,
                excludeSizes: [],
                excludeShapes: [],
              },
            ],
          },
          discounts: [],
          textImages: {
            enableText: true,
            enableImage: true,
          },
          fixingMethods: [
            {
              isDefault: true,
              fixingMethodId: 0,
              additionalPrice: 0,
              excludeSizes: [],
              excludeShapes: [],
            },
            {
              isDefault: false,
              fixingMethodId: 6,
              additionalPrice: 4.8,
              excludeSizes: [12, 13, 14, 15, 16, 17, 18, 19, 20],
              excludeShapes: [4, 0, 9, 2],
            },
            {
              isDefault: false,
              fixingMethodId: 5,
              additionalPrice: 0.8,
              excludeSizes: [],
              excludeShapes: [5, 6],
            },
            {
              isDefault: false,
              fixingMethodId: 9,
              additionalPrice: 13,
              excludeSizes: [1, 2, 3, 4, 15, 16, 17, 18, 19, 20],
              excludeShapes: [4, 0, 9, 2],
            },
          ],
          additionalOptions: [],
        },
      },
      {
        icon: "https://signsdesigner.us/app/demos/double-sided/plastic.png",
        name: "Plastic",
        type: "simple",
        popImg: "",
        description: "Foam PVC Forex). Light, flexible material.",
        data: {
          sizes: {
            allSizes: [
              {
                isDefault: true,
                label: "70x30",
                width: 70,
                height: 30,
                startPriceAtChar: 1,
                textNumber: 0,
                maxTextChar: -1,
                minChartText: 0,
                charPrice: 0,
                basePrice: 0,
              },
              {
                isDefault: false,
                label: "70x70",
                width: 70,
                height: 70,
                startPriceAtChar: 1,
                textNumber: 0,
                maxTextChar: -1,
                minChartText: 0,
                charPrice: 0,
                basePrice: 0,
              },
              {
                isDefault: false,
                label: "120x50",
                width: 120,
                height: 50,
                startPriceAtChar: 1,
                textNumber: 0,
                maxTextChar: -1,
                minChartText: 0,
                charPrice: 0,
                basePrice: 0,
              },
              {
                isDefault: false,
                label: "120x70",
                width: 120,
                height: 70,
                startPriceAtChar: 1,
                textNumber: 0,
                maxTextChar: -1,
                minChartText: 0,
                charPrice: 0,
                basePrice: 0,
              },
              {
                isDefault: false,
                label: "150x100",
                width: 150,
                height: 100,
                startPriceAtChar: 1,
                textNumber: 0,
                maxTextChar: -1,
                minChartText: 0,
                charPrice: 0,
                basePrice: 0,
              },
              {
                isDefault: false,
                label: "200x100",
                width: 200,
                height: 100,
                startPriceAtChar: 1,
                textNumber: 0,
                maxTextChar: -1,
                minChartText: 0,
                charPrice: 0,
                basePrice: 0,
              },
              {
                isDefault: false,
                label: "200x200",
                width: 200,
                height: 200,
                startPriceAtChar: 1,
                textNumber: 0,
                maxTextChar: -1,
                minChartText: 0,
                charPrice: 0,
                basePrice: 0,
              },
              {
                isDefault: false,
                label: "300x200",
                width: 300,
                height: 200,
                startPriceAtChar: 1,
                textNumber: 0,
                maxTextChar: -1,
                minChartText: 0,
                charPrice: 0,
                basePrice: 0,
              },
              {
                isDefault: false,
                label: "300x300",
                width: 300,
                height: 300,
                startPriceAtChar: 1,
                textNumber: 0,
                maxTextChar: -1,
                minChartText: 0,
                charPrice: 0,
                basePrice: 0,
              },
              {
                isDefault: false,
                label: "400x300",
                width: 400,
                height: 300,
                startPriceAtChar: 1,
                textNumber: 0,
                maxTextChar: -1,
                minChartText: 0,
                charPrice: 0,
                basePrice: 0,
              },
              {
                isDefault: false,
                label: "500x200",
                width: 500,
                height: 200,
                startPriceAtChar: 1,
                textNumber: 0,
                maxTextChar: -1,
                minChartText: 0,
                charPrice: 0,
                basePrice: 0,
              },
              {
                isDefault: false,
                label: "600x600",
                width: 600,
                height: 600,
                startPriceAtChar: 1,
                textNumber: 0,
                maxTextChar: -1,
                minChartText: 0,
                charPrice: 0,
                basePrice: 0,
              },
              {
                isDefault: false,
                label: "800x700",
                width: 800,
                height: 700,
                startPriceAtChar: 1,
                textNumber: 0,
                maxTextChar: -1,
                minChartText: 0,
                charPrice: 0,
                basePrice: 0,
              },
              {
                isDefault: false,
                label: "800x800",
                width: 800,
                height: 800,
                startPriceAtChar: 1,
                textNumber: 0,
                maxTextChar: -1,
                minChartText: 0,
                charPrice: 0,
                basePrice: 0,
              },
              {
                isDefault: false,
                label: "1000x500",
                width: 1000,
                height: 500,
                startPriceAtChar: 1,
                textNumber: 0,
                maxTextChar: -1,
                minChartText: 0,
                charPrice: 0,
                basePrice: 0,
              },
              {
                isDefault: false,
                label: "1000x600",
                width: 1000,
                height: 600,
                startPriceAtChar: 1,
                textNumber: 0,
                maxTextChar: -1,
                minChartText: 0,
                charPrice: 0,
                basePrice: 0,
              },
              {
                isDefault: false,
                label: "1000x700",
                width: 1000,
                height: 700,
                startPriceAtChar: 1,
                textNumber: 0,
                maxTextChar: -1,
                minChartText: 0,
                charPrice: 0,
                basePrice: 0,
              },
              {
                isDefault: false,
                label: "1000x1000",
                width: 1000,
                height: 1000,
                startPriceAtChar: 1,
                textNumber: 0,
                maxTextChar: -1,
                minChartText: 0,
                charPrice: 0,
                basePrice: 0,
              },
            ],
            thickness: {
              active: false,
              values: [],
            },
            customSize: {
              active: true,
              width: {
                max: 1000,
                min: 70,
                label: "Width",
              },
              height: {
                max: 1000,
                min: 30,
                label: "Height",
              },
            },
          },
          colors: {
            customColors: {
              active: true,
              label: "Custom Colors",
              prevImg: "",
            },
            allColors: [
              {
                isDefault: true,
                name: "White",
                textColor: {
                  active: false,
                  sameForBorder: false,
                  name: "",
                  codeHex: "#000000",
                },
                pattern: {
                  active: false,
                  codeHex: "#ffffff",
                  url: "",
                },
                prevImg: "",
                additionalPrice: 0,
              },
              {
                isDefault: false,
                name: "Black",
                textColor: {
                  active: false,
                  sameForBorder: false,
                  name: "",
                  codeHex: "#000000",
                },
                pattern: {
                  active: false,
                  codeHex: "#000000",
                  url: "",
                },
                prevImg: "",
                additionalPrice: 0,
              },
              {
                isDefault: false,
                name: "Blue",
                textColor: {
                  active: false,
                  sameForBorder: false,
                  name: "",
                  codeHex: "#000000",
                },
                pattern: {
                  active: false,
                  codeHex: "#004f86",
                  url: "",
                },
                prevImg: "",
                additionalPrice: 0,
              },
              {
                isDefault: false,
                name: "Red",
                textColor: {
                  active: false,
                  sameForBorder: false,
                  name: "",
                  codeHex: "#000000",
                },
                pattern: {
                  active: false,
                  codeHex: "#c4271d",
                  url: "",
                },
                prevImg: "",
                additionalPrice: 0,
              },
              {
                isDefault: false,
                name: "Green",
                textColor: {
                  active: false,
                  sameForBorder: false,
                  name: "",
                  codeHex: "#000000",
                },
                pattern: {
                  active: false,
                  codeHex: "#009251",
                  url: "",
                },
                prevImg: "",
                additionalPrice: 0,
              },
              {
                isDefault: false,
                name: "Yellow",
                textColor: {
                  active: false,
                  sameForBorder: false,
                  name: "",
                  codeHex: "#000000",
                },
                pattern: {
                  active: false,
                  codeHex: "#fee900",
                  url: "",
                },
                prevImg: "",
                additionalPrice: 0,
              },
              {
                isDefault: false,
                name: "Gray",
                textColor: {
                  active: false,
                  sameForBorder: false,
                  name: "",
                  codeHex: "#000000",
                },
                pattern: {
                  active: false,
                  codeHex: "#4f5756",
                  url: "",
                },
                prevImg: "",
                additionalPrice: 0,
              },
              {
                isDefault: false,
                name: "Pink",
                textColor: {
                  active: false,
                  sameForBorder: false,
                  name: "",
                  codeHex: "#000000",
                },
                pattern: {
                  active: false,
                  codeHex: "#bc4077",
                  url: "",
                },
                prevImg: "",
                additionalPrice: 0,
              },
              {
                isDefault: false,
                name: "Purple",
                textColor: {
                  active: false,
                  sameForBorder: false,
                  name: "",
                  codeHex: "#000000",
                },
                pattern: {
                  active: false,
                  codeHex: "#554585",
                  url: "",
                },
                prevImg: "",
                additionalPrice: 0,
              },
              {
                isDefault: false,
                name: "Orange",
                textColor: {
                  active: false,
                  sameForBorder: false,
                  name: "",
                  codeHex: "#000000",
                },
                pattern: {
                  active: false,
                  codeHex: "#e15616",
                  url: "",
                },
                prevImg: "",
                additionalPrice: 0,
              },
              {
                isDefault: false,
                name: "Brown",
                textColor: {
                  active: false,
                  sameForBorder: false,
                  name: "",
                  codeHex: "#000000",
                },
                pattern: {
                  active: false,
                  codeHex: "#523d2a",
                  url: "",
                },
                prevImg: "",
                additionalPrice: 0,
              },
            ],
          },
          shapes: [
            {
              isDefault: false,
              shapeId: 1,
              additionalPrice: 0,
            },
            {
              isDefault: true,
              shapeId: 3,
              additionalPrice: 0,
            },
            {
              isDefault: false,
              shapeId: 4,
              additionalPrice: 0,
            },
            {
              isDefault: false,
              shapeId: 0,
              additionalPrice: 0,
            },
            {
              isDefault: false,
              shapeId: 9,
              additionalPrice: 0,
            },
            {
              isDefault: false,
              shapeId: 5,
              additionalPrice: 0,
            },
            {
              isDefault: false,
              shapeId: 6,
              additionalPrice: 0,
            },
            {
              isDefault: false,
              shapeId: 2,
              additionalPrice: 0,
            },
          ],
          borders: {
            settings: {
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
                {
                  name: "Blue",
                  codeHex: "#004f86",
                  prevImg: "",
                  additionalPrice: 0,
                },
                {
                  name: "Red",
                  codeHex: "#c4271d",
                  prevImg: "",
                  additionalPrice: 0,
                },
                {
                  name: "Green",
                  codeHex: "#009251",
                  prevImg: "",
                  additionalPrice: 0,
                },
                {
                  name: "Yellow",
                  codeHex: "#fee900",
                  prevImg: "",
                  additionalPrice: 0,
                },
                {
                  name: "Gray",
                  codeHex: "#4f5756",
                  prevImg: "",
                  additionalPrice: 0,
                },
                {
                  name: "Pink",
                  codeHex: "#bc4077",
                  prevImg: "",
                  additionalPrice: 0,
                },
                {
                  name: "Purple",
                  codeHex: "#554585",
                  prevImg: "",
                  additionalPrice: 0,
                },
                {
                  name: "Orange",
                  codeHex: "#e15616",
                  prevImg: "",
                  additionalPrice: 0,
                },
                {
                  name: "Brown",
                  codeHex: "#523d2a",
                  prevImg: "",
                  additionalPrice: 0,
                },
              ],
              enableBorderWidth: false,
              enableBorderColor: true,
              borderColorsLabel: "Borders Colors",
              customColorsPrevImg: "",
            },
            allBorders: [
              {
                isDefault: true,
                manageBorderId: 0,
                additionalPrice: 0,
                excludeSizes: [],
                excludeShapes: [],
              },
              {
                isDefault: false,
                manageBorderId: 1,
                additionalPrice: 0,
                excludeSizes: [],
                excludeShapes: [],
              },
              {
                isDefault: true,
                manageBorderId: 2,
                additionalPrice: 0,
                excludeSizes: [],
                excludeShapes: [],
              },
              {
                isDefault: false,
                manageBorderId: 3,
                additionalPrice: 0,
                excludeSizes: [],
                excludeShapes: [],
              },
            ],
          },
          discounts: [],
          textImages: {
            enableText: true,
            enableImage: true,
          },
          fixingMethods: [
            {
              isDefault: true,
              fixingMethodId: 0,
              additionalPrice: 0,
              excludeSizes: [],
              excludeShapes: [],
            },
            {
              isDefault: false,
              fixingMethodId: 6,
              additionalPrice: 4.8,
              excludeSizes: [12, 13, 14, 15, 16, 17, 18],
              excludeShapes: [4, 0, 9, 2],
            },
            {
              isDefault: false,
              fixingMethodId: 5,
              additionalPrice: 1.1,
              excludeSizes: [],
              excludeShapes: [5, 6],
            },
            {
              isDefault: false,
              fixingMethodId: 9,
              additionalPrice: 13.1,
              excludeSizes: [1, 2, 3, 4, 15, 16, 17, 18],
              excludeShapes: [4, 0, 9, 2],
            },
          ],
          additionalOptions: [],
        },
      },
      {
        icon: "https://signsdesigner.us/app/demos/double-sided/eco_board.png",
        name: "Eco board",
        type: "simple",
        popImg: "",
        description:
          "Quality cardboard(pressed board) with a wood fibre core. A lightweight, stable and rigid material perfect for hanging.",
        data: {
          sizes: {
            allSizes: [
              {
                isDefault: true,
                label: "70x30",
                width: 70,
                height: 30,
                startPriceAtChar: 1,
                textNumber: 0,
                maxTextChar: -1,
                minChartText: 0,
                charPrice: 0,
                basePrice: 0,
              },
              {
                isDefault: false,
                label: "70x70",
                width: 70,
                height: 70,
                startPriceAtChar: 1,
                textNumber: 0,
                maxTextChar: -1,
                minChartText: 0,
                charPrice: 0,
                basePrice: 0,
              },
              {
                isDefault: false,
                label: "120x50",
                width: 120,
                height: 50,
                startPriceAtChar: 1,
                textNumber: 0,
                maxTextChar: -1,
                minChartText: 0,
                charPrice: 0,
                basePrice: 0,
              },
              {
                isDefault: false,
                label: "120x70",
                width: 120,
                height: 70,
                startPriceAtChar: 1,
                textNumber: 0,
                maxTextChar: -1,
                minChartText: 0,
                charPrice: 0,
                basePrice: 0,
              },
              {
                isDefault: false,
                label: "150x100",
                width: 150,
                height: 100,
                startPriceAtChar: 1,
                textNumber: 0,
                maxTextChar: -1,
                minChartText: 0,
                charPrice: 0,
                basePrice: 0,
              },
              {
                isDefault: false,
                label: "200x100",
                width: 200,
                height: 100,
                startPriceAtChar: 1,
                textNumber: 0,
                maxTextChar: -1,
                minChartText: 0,
                charPrice: 0,
                basePrice: 0,
              },
              {
                isDefault: false,
                label: "200x200",
                width: 200,
                height: 200,
                startPriceAtChar: 1,
                textNumber: 0,
                maxTextChar: -1,
                minChartText: 0,
                charPrice: 0,
                basePrice: 0,
              },
              {
                isDefault: false,
                label: "300x200",
                width: 300,
                height: 200,
                startPriceAtChar: 1,
                textNumber: 0,
                maxTextChar: -1,
                minChartText: 0,
                charPrice: 0,
                basePrice: 0,
              },
              {
                isDefault: false,
                label: "300x300",
                width: 300,
                height: 300,
                startPriceAtChar: 1,
                textNumber: 0,
                maxTextChar: -1,
                minChartText: 0,
                charPrice: 0,
                basePrice: 0,
              },
              {
                isDefault: false,
                label: "400x300",
                width: 400,
                height: 300,
                startPriceAtChar: 1,
                textNumber: 0,
                maxTextChar: -1,
                minChartText: 0,
                charPrice: 0,
                basePrice: 0,
              },
              {
                isDefault: false,
                label: "500x200",
                width: 500,
                height: 200,
                startPriceAtChar: 1,
                textNumber: 0,
                maxTextChar: -1,
                minChartText: 0,
                charPrice: 0,
                basePrice: 0,
              },
              {
                isDefault: false,
                label: "600x600",
                width: 600,
                height: 600,
                startPriceAtChar: 1,
                textNumber: 0,
                maxTextChar: -1,
                minChartText: 0,
                charPrice: 0,
                basePrice: 0,
              },
              {
                isDefault: false,
                label: "800x700",
                width: 800,
                height: 700,
                startPriceAtChar: 1,
                textNumber: 0,
                maxTextChar: -1,
                minChartText: 0,
                charPrice: 0,
                basePrice: 0,
              },
              {
                isDefault: false,
                label: "800x800",
                width: 800,
                height: 800,
                startPriceAtChar: 1,
                textNumber: 0,
                maxTextChar: -1,
                minChartText: 0,
                charPrice: 0,
                basePrice: 0,
              },
              {
                isDefault: false,
                label: "1000x500",
                width: 1000,
                height: 500,
                startPriceAtChar: 1,
                textNumber: 0,
                maxTextChar: -1,
                minChartText: 0,
                charPrice: 0,
                basePrice: 0,
              },
              {
                isDefault: false,
                label: "1000x600",
                width: 1000,
                height: 600,
                startPriceAtChar: 1,
                textNumber: 0,
                maxTextChar: -1,
                minChartText: 0,
                charPrice: 0,
                basePrice: 0,
              },
              {
                isDefault: false,
                label: "1000x700",
                width: 1000,
                height: 700,
                startPriceAtChar: 1,
                textNumber: 0,
                maxTextChar: -1,
                minChartText: 0,
                charPrice: 0,
                basePrice: 0,
              },
            ],
            thickness: {
              active: false,
              values: [],
            },
            customSize: {
              active: true,
              width: {
                max: 1000,
                min: 70,
                label: "Width",
              },
              height: {
                max: 700,
                min: 30,
                label: "Height",
              },
            },
          },
          colors: {
            customColors: {
              active: true,
              label: "Custom Colors",
              prevImg: "",
            },
            allColors: [
              {
                isDefault: true,
                name: "White",
                textColor: {
                  active: false,
                  sameForBorder: false,
                  name: "",
                  codeHex: "#000000",
                },
                pattern: {
                  active: false,
                  codeHex: "#ffffff",
                  url: "",
                },
                prevImg: "",
                additionalPrice: 0,
              },
              {
                isDefault: false,
                name: "Black",
                textColor: {
                  active: false,
                  sameForBorder: false,
                  name: "",
                  codeHex: "#000000",
                },
                pattern: {
                  active: false,
                  codeHex: "#000000",
                  url: "",
                },
                prevImg: "",
                additionalPrice: 0,
              },
              {
                isDefault: false,
                name: "Blue",
                textColor: {
                  active: false,
                  sameForBorder: false,
                  name: "",
                  codeHex: "#000000",
                },
                pattern: {
                  active: false,
                  codeHex: "#004f86",
                  url: "",
                },
                prevImg: "",
                additionalPrice: 0,
              },
              {
                isDefault: false,
                name: "Red",
                textColor: {
                  active: false,
                  sameForBorder: false,
                  name: "",
                  codeHex: "#000000",
                },
                pattern: {
                  active: false,
                  codeHex: "#c4271d",
                  url: "",
                },
                prevImg: "",
                additionalPrice: 0,
              },
              {
                isDefault: false,
                name: "Green",
                textColor: {
                  active: false,
                  sameForBorder: false,
                  name: "",
                  codeHex: "#000000",
                },
                pattern: {
                  active: false,
                  codeHex: "#009251",
                  url: "",
                },
                prevImg: "",
                additionalPrice: 0,
              },
              {
                isDefault: false,
                name: "Yellow",
                textColor: {
                  active: false,
                  sameForBorder: false,
                  name: "",
                  codeHex: "#000000",
                },
                pattern: {
                  active: false,
                  codeHex: "#fee900",
                  url: "",
                },
                prevImg: "",
                additionalPrice: 0,
              },
              {
                isDefault: false,
                name: "Gray",
                textColor: {
                  active: false,
                  sameForBorder: false,
                  name: "",
                  codeHex: "#000000",
                },
                pattern: {
                  active: false,
                  codeHex: "#4f5756",
                  url: "",
                },
                prevImg: "",
                additionalPrice: 0,
              },
              {
                isDefault: false,
                name: "Pink",
                textColor: {
                  active: false,
                  sameForBorder: false,
                  name: "",
                  codeHex: "#000000",
                },
                pattern: {
                  active: false,
                  codeHex: "#bc4077",
                  url: "",
                },
                prevImg: "",
                additionalPrice: 0,
              },
              {
                isDefault: false,
                name: "Purple",
                textColor: {
                  active: false,
                  sameForBorder: false,
                  name: "",
                  codeHex: "#000000",
                },
                pattern: {
                  active: false,
                  codeHex: "#554585",
                  url: "",
                },
                prevImg: "",
                additionalPrice: 0,
              },
              {
                isDefault: false,
                name: "Orange",
                textColor: {
                  active: false,
                  sameForBorder: false,
                  name: "",
                  codeHex: "#000000",
                },
                pattern: {
                  active: false,
                  codeHex: "#e15616",
                  url: "",
                },
                prevImg: "",
                additionalPrice: 0,
              },
              {
                isDefault: false,
                name: "Brown",
                textColor: {
                  active: false,
                  sameForBorder: false,
                  name: "",
                  codeHex: "#000000",
                },
                pattern: {
                  active: false,
                  codeHex: "#523d2a",
                  url: "",
                },
                prevImg: "",
                additionalPrice: 0,
              },
            ],
          },
          shapes: [
            {
              isDefault: false,
              shapeId: 1,
              additionalPrice: 0,
            },
            {
              isDefault: true,
              shapeId: 3,
              additionalPrice: 0,
            },
            {
              isDefault: false,
              shapeId: 4,
              additionalPrice: 0,
            },
            {
              isDefault: false,
              shapeId: 0,
              additionalPrice: 0,
            },
            {
              isDefault: false,
              shapeId: 9,
              additionalPrice: 0,
            },
            {
              isDefault: false,
              shapeId: 5,
              additionalPrice: 0,
            },
            {
              isDefault: false,
              shapeId: 6,
              additionalPrice: 0,
            },
            {
              isDefault: false,
              shapeId: 2,
              additionalPrice: 0,
            },
          ],
          borders: {
            settings: {
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
                {
                  name: "Blue",
                  codeHex: "#004f86",
                  prevImg: "",
                  additionalPrice: 0,
                },
                {
                  name: "Red",
                  codeHex: "#c4271d",
                  prevImg: "",
                  additionalPrice: 0,
                },
                {
                  name: "Green",
                  codeHex: "#009251",
                  prevImg: "",
                  additionalPrice: 0,
                },
                {
                  name: "Yellow",
                  codeHex: "#fee900",
                  prevImg: "",
                  additionalPrice: 0,
                },
                {
                  name: "Gray",
                  codeHex: "#4f5756",
                  prevImg: "",
                  additionalPrice: 0,
                },
                {
                  name: "Pink",
                  codeHex: "#bc4077",
                  prevImg: "",
                  additionalPrice: 0,
                },
                {
                  name: "Purple",
                  codeHex: "#554585",
                  prevImg: "",
                  additionalPrice: 0,
                },
                {
                  name: "Orange",
                  codeHex: "#e15616",
                  prevImg: "",
                  additionalPrice: 0,
                },
                {
                  name: "Brown",
                  codeHex: "#523d2a",
                  prevImg: "",
                  additionalPrice: 0,
                },
              ],
              enableBorderWidth: false,
              enableBorderColor: true,
              borderColorsLabel: "Borders Colors",
              customColorsPrevImg: "",
            },
            allBorders: [
              {
                isDefault: true,
                manageBorderId: 0,
                additionalPrice: 0,
                excludeSizes: [],
                excludeShapes: [],
              },
              {
                isDefault: false,
                manageBorderId: 1,
                additionalPrice: 0,
                excludeSizes: [],
                excludeShapes: [],
              },
              {
                isDefault: true,
                manageBorderId: 2,
                additionalPrice: 0,
                excludeSizes: [],
                excludeShapes: [],
              },
              {
                isDefault: false,
                manageBorderId: 3,
                additionalPrice: 0,
                excludeSizes: [],
                excludeShapes: [],
              },
            ],
          },
          discounts: [],
          textImages: {
            enableText: true,
            enableImage: true,
          },
          fixingMethods: [
            {
              isDefault: true,
              fixingMethodId: 0,
              additionalPrice: 0,
              excludeSizes: [],
              excludeShapes: [],
            },
            {
              isDefault: false,
              fixingMethodId: 6,
              additionalPrice: 4.8,
              excludeSizes: [12, 13, 14, 15, 16, 17],
              excludeShapes: [4, 0, 9, 2],
            },
            {
              isDefault: false,
              fixingMethodId: 5,
              additionalPrice: 1.1,
              excludeSizes: [],
              excludeShapes: [5, 6],
            },
            {
              isDefault: false,
              fixingMethodId: 9,
              additionalPrice: 13.1,
              excludeSizes: [1, 2, 3, 4, 15, 16, 17],
              excludeShapes: [4, 0, 9, 2],
            },
          ],
          additionalOptions: [],
        },
      },
    ],
  },
});
const includeDemo = ref(false);

const configs = ref([]);
const totalPages = ref(0);
const pages = ref(0);
const page = ref(1);
const totalConfigsFound = ref(0);
const isFetching = ref(false);
const canAddNew = ref(false);
const isLoading = ref(false);
const search = ref("");
const step = ref(0);
const isEdit = ref(false);
const openModal = ref(false);
const manageFonts = ref([]);

/***
 *
 */
// --- WIZARD (new flow) ---
const isWizard = computed(() => isNewConfig.value && !isEdit.value);

const wizard = ref({
  step: 1, // 1..5
  category: "signage", // signage | apparel | objects
  productType: null, // signboard | banners | sticker | lettering | lightbox
  materialType: null, // simple | advance | layers
  includeDemo: false,
});

const categories = [
  {
    id: "signage",
    tag: "Signage",
    title: "Signs",
    examples: ["Banner", "Sticker", "Lightbox"],
    disabled: false,
    icon: "desktop",
    gradient: "asowp-from-[#dddedc] asowp-to-[#ebf8e1]", // vert clair
  },
  {
    id: "apparel",
    tag: "Apparel",
    title: "Textile",
    examples: ["T-shirt", "Cap", "Hoodie"],
    disabled: true,
    comingSoon: true,
    icon: "tshirt",
    gradient: "asowp-from-[#b7e1dd] asowp-to-[#eaf7e2]", // bleu clair
  },
  {
    id: "objects",
    tag: "Objects",
    title: "Goodies",
    examples: ["Mug", "Card", "Tote bag"],
    disabled: true,
    comingSoon: true,
    icon: "cup",
    gradient: "asowp-from-[#f8bed2] asowp-to-[#ecf7e2]", // rose clair
  },
];
// Icônes réutilisables
const CategoryIcons = {
  desktop: () =>
    h(
      "svg",
      {
        viewBox: "0 0 24 24",
        class: "asowp-w-5 asowp-h-5",
        "aria-hidden": "true",
      },
      [
        h("path", {
          fill: "currentColor",
          d: "M3 4h18a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1h-6l1.2 2H20a1 1 0 1 1 0 2H4a1 1 0 1 1 0-2h3.8L9 16H3a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Zm1 2v8h16V6H4Z",
        }),
      ]
    ),
  tshirt: () =>
    h(
      "svg",
      {
        viewBox: "0 0 24 24",
        class: "asowp-w-5 asowp-h-5",
        "aria-hidden": "true",
      },
      [
        h("path", {
          fill: "currentColor",
          d: "M9 3 6.5 5 4 4l-2 3 3 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V9l3-2-2-3-2.5 1L15 3a9 9 0 0 1-6 0Z",
        }),
      ]
    ),
  cup: () =>
    h(
      "svg",
      {
        viewBox: "0 0 24 24",
        class: "asowp-w-5 asowp-h-5",
        "aria-hidden": "true",
      },
      [
        h("path", {
          fill: "currentColor",
          d: "M5 5h13a3 3 0 0 1 0 6h-1.1A8 8 0 0 1 9 21H8a5 5 0 0 1-5-5V7a2 2 0 0 1 2-2Zm12 2v2h1a1 1 0 0 0 0-2h-1Z",
        }),
      ]
    ),
};
// --- PRODUCT TYPES (par catégorie) ---
const productTypesByCategory = {
  signage: [
    {
      id: "signboard",
      title: "Signboard",
      desc: "Rigid panel / PVC/ Aluminum/ Plexiglass/ Wood/ Painted or stainless metal",
      //pills: ['PVC', 'Mesh', 'Acrylic', 'Aluminum'],
      disabled: false,
    },
    {
      id: "banners",
      title: "Banners",
      desc: "PVC/ Mesh/ Double-sided/ fabric, etc..",
      //pills: ['PVC', 'Mesh', 'Double-sided', 'Fabric'],
      disabled: false,
    },
    {
      id: "sticker",
      title: "Sticker",
      desc: "Vinyl/ die-cut/ Self-adhesive paper/ matte/ glossy/ UV-resistant, etc..",
      //pills: ['Vinyl', 'Die-cut', 'Matte', 'Glossy'],
      disabled: false,
    },
    {
      id: "lettering",
      title: "Lettering Signs",
      desc: "Neon and channel",
      //pills: ['Neon', 'Channel'],
      disabled: true,
      comingSoon: true,
    },
    {
      id: "lightbox",
      title: "lightbox",
      desc: "Backlit",
      //pills: ['Backlit'],
      disabled: true,
      comingSoon: true,
    },
  ],
  apparel: [], // (coming soon)
  objects: [], // (coming soon)
};
// --- MATERIAL TYPES (Step 3) ---
const materialTypes = [
  {
    id: "simple",
    title: "Simple",
    desc: "All material options are customizable for the customer",
    disabled: false,
  },
  {
    id: "advance",
    title: "Advance",
    desc: "Size, shape and background color have default preconfigured values",
    disabled: false,
  },
  {
    id: "layers",
    title: "Layers",
    desc: "stack multiple layers that can be configured independently",
    disabled: true, // comme la capture : Coming soon
    comingSoon: true,
  },
];

/*const demosList = ref([
    {name:'Acrylic Sign', value:'acrylic',icon:asowp_data.assets_url+'/images/demos/im_acrylic_sign.webp',description:" An acrylic sign (perspex sign) is a popular choice for any office, professional setting or home due to it's professional and modern look."},
    {name:'Aluminium Sign', value:'aluminium',icon:asowp_data.assets_url+'/images/demos/im_aluminium_sign.webp',description:"Create and order aluminium signs, perfect for indoor and outdoor use."},
    {name:'Brass Sign', value:'brass-sign',icon:asowp_data.assets_url+'/images/demos/im_brass_sign.webp',description:"Create stylish brass signs for your home or business with our easy-to-use design tool."},
    {name:'Double-Sided Sign', value:'double-side',icon:asowp_data.assets_url+'/images/demos/im_double_side_sign.gif',description:"Double-sided signs are perfect for those want the information to be able to read from both sides. Examples of double-sided signs are ''we are open'' and ''we are closed''."},
    {name:'Plastic Sign', value:'plastic',icon:asowp_data.assets_url+'/images/demos/im_plastic_sign.webp',description:"Create bespoke plastic signs with high quality print or engra"},
    {name:'Rollup Sign', value:'rollup',icon:asowp_data.assets_url+'/images/demos/im_rollup_sign.webp',description:"If you’re looking for an easy-to-use, portable advertising stand or display stand, then we recommend our roll-ups."},
    {name:'Stainless Stell Sign', value:'stainlessStell',icon:asowp_data.assets_url+'/images/demos/im_stainlessSteel_sign.webp',description:"You can add numbers, letters, a certification or a logo to label plates. With us, you can order a complete number series with signs, or a single label plate."},
    {name:'Woods Sign', value:'woods-sign',icon:asowp_data.assets_url+'/images/demos/im_wood_sign.webp',description:"Create custom wooden signs for indoor use with our easy-to-use design page. Communicate a warm and old fashioned feeling with a bespoke wood sign in birch or oak made from MDF."}
]);*/
//step 4
const demoTemplates = computed(() =>
  [
    {
      id: "acrylic",
      title: "Acrylic Sign",
      icon: asowp_data.assets_url + "/images/demos/im_acrylic_sign.webp",
      desc: "Acrylic Sign",
    },
    {
      id: "aluminium",
      title: "Aluminium Sign",
      icon: asowp_data.assets_url + "/images/demos/im_aluminium_sign.webp",
      desc: "Aluminium Sign",
    },
    {
      id: "brass-sign",
      title: "Brass Sign",
      icon: asowp_data.assets_url + "/images/demos/im_brass_sign.webp",
      desc: "Brass Sign",
    },
    {
      id: "double-side",
      title: "Double-Sided Sign",
      icon: asowp_data.assets_url + "/images/demos/im_double_side_sign.gif",
      desc: "Double-Sided Sign",
    },
    {
      id: "plastic",
      title: "Plastic Sign",
      icon: asowp_data.assets_url + "/images/demos/im_plastic_sign.webp",
      desc: "Plastic Sign",
    },
    {
      id: "rollup",
      title: "Rollup Sign",
      icon: asowp_data.assets_url + "/images/demos/im_rollup_sign.webp",
      desc: "Rollup Sign",
    },
    {
      id: "stainlessStell",
      title: "Stainless Stell Sign",
      icon: asowp_data.assets_url + "/images/demos/im_stainlessSteel_sign.webp",
      desc: "Stainless Stell Sign",
    },
    {
      id: "woods-sign",
      title: "Woods Sign",
      icon: asowp_data.assets_url + "/images/demos/im_wood_sign.webp",
      desc: "Woods Sign",
    },
    // ajoute ceux qui existent dans metaConfigs.value
  ].filter((t) => metaConfigs.value[t.id])
);



//const selectedDemo  = ref<string | null>(null)
const showDemoModal = ref(false)
const demoSearch    = ref('')

const filteredDemos = computed(() => {
  const q = demoSearch.value.trim().toLowerCase()
  if (!q) return demoTemplates.value
  return demoTemplates.value.filter(t =>
    (t.title || '').toLowerCase().includes(q) ||
    (t.desc  || '').toLowerCase().includes(q)
  )
})

function openDemoModal () {
  wizard.value.includeDemo = true
  // pré-sélection optionnelle
  if (!selectedDemo.value && demoTemplates.value.length) {
    selectedDemo.value = demoTemplates.value[0].id
  }
  showDemoModal.value = true
}

function closeDemoModal () {
  // si l’utilisateur ferme sans valider, tu peux laisser includeDemo=true
  // ou décider de le repasser à false :
  // if (!selectedDemo.value) wizard.value.includeDemo = false
  showDemoModal.value = false
}

function confirmDemo () {
  // ici tu as wizard.includeDemo === true et selectedDemo défini
  showDemoModal.value = false
  // si tu veux afficher le résumé sur le côté : utilise selectedDemo pour retrouver le titre
}




const canNext = computed(() => {
  switch (wizard.value.step) {
    case 1:
      return !!wizard.value.category;
    case 2:
      return !!wizard.value.productType;
    case 3:
      return !!wizard.value.materialType;
    case 4:
      return true; // Yes/No
    case 5:
      return newConfig.value.name.trim() !== "";
    default:
      return false;
  }
});

function goNext() {
  if (!canNext.value) return;
  if (wizard.value.step < 5) {
    wizard.value.step++;
    step.value = wizard.value.step; // garde `step` en phase pour l’UI
  }
}
function goBack() {
  if (wizard.value.step > 1) {
    wizard.value.step--;
    step.value = wizard.value.step;
  } else {
    // retour à la liste
    isNewConfig.value = false;
    step.value = 0;
  }
}

///******
//  */
onMounted(async () => {
  isFetching.value = true;
  await fetchConfigs();
  canAddNew.value = true;
  await fetchFonts();
});

const closeCloneModal = () => {
  openCloneModal.value = false;
  newConfig.value = {
    name: "",
    description: "",
    icon: "",
    popImg: "",
  };
};

const fetchFonts = async () => {
  const result = await api.getManagefonts();
  if (!result.message) {
    let tab = [];
    manageFonts.value = result.map((font, id) => id);
  } else {
    manageFonts.value = [];
  }
};

const fetchConfigs = async () => {
  let tab = [];
  const allConfigs = await api.getConfigs();
  configs.value = allConfigs.data;
  for (let index = 0; index < allConfigs.data.length; index++) {
    tab.push(false);
  }
  showParams.value = tab;
  totalPages.value = allConfigs.totalPages;
  totalConfigsFound.value = allConfigs.totalConfigsFound;
  pages.value = allConfigs.totalPages;
  isFetching.value = false;
};

const handleOpenConfigParams = (key) => {
  for (let index = 0; index < showParams.value.length; index++) {
    if (key != index) {
      showParams.value[index] = false;
    } else {
      showParams.value[key] = !showParams.value[key];
    }
  }
};

/**Function search */
const searchInputEmpty = async (e) => {
  if (e.target.value == "") {
    isFetching.value = true;
    const response = await api.getConfigs();
    configs.value = response.data;
    let tab = [];
    for (let index = 0; index < response.data.length; index++) {
      tab.push(false);
    }
    showParams.value = tab;
    pages.value = response.totalPages;
    page.value = 1;
    isFetching.value = false;
  }
};

const handleSearchChange = async (e) => {
  e.preventDefault();
  var response;
  isFetching.value = true;
  if (search.value != "") {
    response = await api.getConfigs("?search=" + search.value);
  } else {
    response = await api.getConfigs();
  }
  configs.value = response.data;
  let tab = [];
  for (let index = 0; index < response.data.length; index++) {
    tab.push(false);
  }
  showParams.value = tab;
  pages.value = response.totalPages;
  page.value = 1;
  isFetching.value = false;
};
/** Pagination */
const handleNextPage = async () => {
  var nextPage = page.value + 1;
  if (pages.value >= nextPage) {
    var response = await api.getConfigs("?page=" + nextPage);
    configs.value = response.data;
    let tab = [];
    for (let index = 0; index < response.data.length; index++) {
      tab.push(false);
    }
    showParams.value = tab;
    page.value = nextPage;
  }
};
const changePage = async (pg) => {
  var response = await api.getConfigs("?page=" + pg);
  configs.value = response.data;
  let tab = [];
  for (let index = 0; index < response.data.length; index++) {
    tab.push(false);
  }
  showParams.value = tab;
  pages.value = response.totalPages;
  page.value = pg;
};
const handlePrevPage = async () => {
  var prevPage = page.value - 1;
  if (prevPage >= 1) {
    var response = await api.getConfigs("?page=" + prevPage);
    configs.value = response.data;
    pages.value = response.totalPages;
    page.value = prevPage;
  }
};
const visiblePages = computed(() => {
  if (pages.value <= 3)
    return Array.from({ length: pages.value }, (_, i) => i + 1);

  if (page.value === 1) return [1, 2, 3];
  if (page.value === pages.value)
    return [pages.value - 2, pages.value - 1, pages.value];

  return [page.value - 1, page.value, page.value + 1];
});

/** Function for adding new Config */
const addNewConfig = async (configuration) => {
  isLoading.value = true;
  const result = await api.addConfig(configuration);
  if (result.success) {
    toastMessage(result.message);
    if (isWizard.value) {
      const newConfigId = result.post_id;
      const newConfigName = configuration.name;

      const defaultMaterialData = {
        name: "Default Material",
        description: "Automatically created default material",
        icon: "",
        popImg: "",
        type: wizard.value.materialType, // Use the wizard's material type
        data: metaConfigs.value.acrylic.materials[0].data
      };

      const materialResult = await api.addMaterial(newConfigId, defaultMaterialData);

      if (materialResult.success) {
        const materialsForNewConfig = await api.getMaterials(newConfigId);

        const createdMaterialIndex = materialsForNewConfig.findIndex(
          (m) => m.name === defaultMaterialData.name && m.type === defaultMaterialData.type
        );

        if (createdMaterialIndex !== -1) {
          const createdMaterial = materialsForNewConfig[createdMaterialIndex];
          router.push(
            "/configs/" +
              newConfigName.replace(/ /, "-") +
              "/" +
              newConfigId +
              "/materials/" +
              createdMaterial.name.replace(/ /, "-") +
              "/" +
              createdMaterialIndex +
              "/simple/sizes"
          ).then(() => {
            window.location.reload();
          });
        } else {
          toastMessage("Default material not found after creation. Redirecting to materials list.", "warning");
          router.push(
            "/configs/" +
              newConfigName.replace(/ /, "-") +
              "/" +
              newConfigId +
              "/materials"
          ).then(() => {
            window.location.reload();
          });
        }
      } else {
        toastMessage(materialResult.message, "error");
        router.push(
          "/configs/" +
            newConfigName.replace(/ /, "-") +
            "/" +
            newConfigId +
            "/materials"
        ).then(() => {
          window.location.reload();
        });
      }
    } else {
      await fetchConfigs();
      openCloneModal.value = false;
    }
    newConfig.value = {
      name: "",
      description: "",
      icon: "",
      popImg: "",
    };
    selectedDemo.value = "acrylic";
  } else {
    newConfig.value = {
      name: "",
      description: "",
      icon: "",
      popImg: "",
    };
    toastMessage(result.message, "error");
    openCloneModal.value = false;
    selectedDemo.value = "acrylic";
  }
  isLoading.value = false;
};

const includeMetaData = async (state) => {
  if (state) {
    isLoading.value = true;
    let materialsData = JSON.parse(JSON.stringify(metaConfigs.value[selectedDemo.value].materials));
    
    // Override material type with the one selected in the wizard
    materialsData.forEach(material => {
      material.type = wizard.value.materialType;
    });

    let configuration = {
      ...newConfig.value,
      data: {
        ...defaultSettings.value,
        materials: materialsData,
      },
    };
    if (manageFonts.value.length > 0) {
      configuration.data.settings.customizerSign.text.selectedFonts =
        manageFonts.value;
    } else {
      await api.addManagefont({
        many: true,
        fonts: [
          {
            label: "Abril Fatface",
            url: "https://fonts.gstatic.com/s/abrilfatface/v23/zOL64pLDlL1D99S8g8PtiKchm-BsjOLhZBY.ttf",
            isGoogleFont: true,
          },
          {
            label: "Bellefair",
            url: "https://fonts.gstatic.com/s/bellefair/v14/kJExBuYY6AAuhiXUxG19__A2pOdvDA.ttf",
            isGoogleFont: true,
          },
          {
            label: "Dancing Script",
            url: "https://fonts.gstatic.com/s/dancingscript/v25/If2cXTr6YS-zF4S-kcSWSVi_sxjsohD9F50Ruu7BMSoHTeB9ptDqpw.ttf",
            isGoogleFont: true,
          },
          {
            label: "Poppins",
            url: "https://fonts.gstatic.com/s/poppins/v21/pxiEyp8kv8JHgFVrFJDUc1NECPY.ttf",
            isGoogleFont: true,
          },
          {
            label: "Playfair Display",
            url: "https://fonts.gstatic.com/s/playfairdisplay/v37/nuFvD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWBN2PKdFvUDQZNLo_U2r.ttf",
            isGoogleFont: true,
          },
          {
            label: "PT Sans",
            url: "https://fonts.gstatic.com/s/ptsans/v17/jizaRExUiTo99u79P0WOxOGMMDQ.ttf",
            isGoogleFont: true,
          },
          {
            label: "Slabo",
            url: "https://fonts.gstatic.com/s/slabo13px/v15/11hEGp_azEvXZUdSBzzRcKer2wkYnvI.ttf",
            isGoogleFont: true,
          },
          {
            label: "Oswald",
            url: "https://fonts.gstatic.com/s/oswald/v53/TK3_WkUHHAIjg75cFRf3bXL8LICs1_FvgUFoZAaRliE.ttf",
            isGoogleFont: true,
          },
          {
            label: "Lato",
            url: "https://fonts.gstatic.com/s/lato/v24/S6uyw4BMUTPHvxk6XweuBCY.ttf",
            isGoogleFont: true,
          },
          {
            label: "Lobster",
            url: "https://fonts.gstatic.com/s/lobster/v30/neILzCirqoswsqX9_oWsMqEzSJQ.ttf",
            isGoogleFont: true,
          },
          {
            label: "Great Vibes",
            url: "https://fonts.gstatic.com/s/greatvibes/v19/RWmMoKWR9v4ksMfaWd_JN-XCg6UKDXlq.ttf",
            isGoogleFont: true,
          },
          {
            label: "Satisfy",
            url: "https://fonts.gstatic.com/s/satisfy/v21/rP2Hp2yn6lkG50LoOZSCHBeHFl0.ttf",
            isGoogleFont: true,
          },
          {
            label: "Quicksand",
            url: "https://fonts.gstatic.com/s/quicksand/v31/6xK-dSZaM9iE8KbpRA_LJ3z8mH9BOJvgkP8o18G0wx40QDw.ttf",
            isGoogleFont: true,
          },
        ],
      });
      await fetchFonts();
      configuration.data.settings.customizerSign.text.selectedFonts =
        manageFonts.value;
    }
    if (selectedDemo.value == "double-side") {
      configuration.data.settings.customizerSign.signPart.doublePart.active = true;
      configuration.data.settings.customizerSign.signPart.doublePart.part1 =
        "Face A";
      configuration.data.settings.customizerSign.signPart.doublePart.part2 =
        "Face B";
    }
    await addNewConfig(configuration);
  } else {
    isLoading.value = true;
    const configuration = {
      ...newConfig.value,
      data: {
        ...defaultSettings.value,
        materials: [],
      },
    };
    if (manageFonts.value.length > 0) {
      configuration.data.settings.customizerSign.text.selectedFonts =
        manageFonts.value;
    } else {
      await api.addManagefont({
        many: true,
        fonts: [
          {
            label: "Abril Fatface",
            url: "https://fonts.gstatic.com/s/abrilfatface/v23/zOL64pLDlL1D99S8g8PtiKchm-BsjOLhZBY.ttf",
            isGoogleFont: true,
          },
          {
            label: "Bellefair",
            url: "https://fonts.gstatic.com/s/bellefair/v14/kJExBuYY6AAuhiXUxG19__A2pOdvDA.ttf",
            isGoogleFont: true,
          },
          {
            label: "Dancing Script",
            url: "https://fonts.gstatic.com/s/dancingscript/v25/If2cXTr6YS-zF4S-kcSWSVi_sxjsohD9F50Ruu7BMSoHTeB9ptDqpw.ttf",
            isGoogleFont: true,
          },
          {
            label: "Poppins",
            url: "https://fonts.gstatic.com/s/poppins/v21/pxiEyp8kv8JHgFVrFJDUc1NECPY.ttf",
            isGoogleFont: true,
          },
          {
            label: "Playfair Display",
            url: "https://fonts.gstatic.com/s/playfairdisplay/v37/nuFvD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWBN2PKdFvUDQZNLo_U2r.ttf",
            isGoogleFont: true,
          },
          {
            label: "PT Sans",
            url: "https://fonts.gstatic.com/s/ptsans/v17/jizaRExUiTo99u79P0WOxOGMMDQ.ttf",
            isGoogleFont: true,
          },
          {
            label: "Slabo",
            url: "https://fonts.gstatic.com/s/slabo13px/v15/11hEGp_azEvXZUdSBzzRcKer2wkYnvI.ttf",
            isGoogleFont: true,
          },
          {
            label: "Oswald",
            url: "https://fonts.gstatic.com/s/oswald/v53/TK3_WkUHHAIjg75cFRf3bXL8LICs1_FvgUFoZAaRliE.ttf",
            isGoogleFont: true,
          },
          {
            label: "Lato",
            url: "https://fonts.gstatic.com/s/lato/v24/S6uyw4BMUTPHvxk6XweuBCY.ttf",
            isGoogleFont: true,
          },
          {
            label: "Lobster",
            url: "https://fonts.gstatic.com/s/lobster/v30/neILzCirqoswsqX9_oWsMqEzSJQ.ttf",
            isGoogleFont: true,
          },
          {
            label: "Great Vibes",
            url: "https://fonts.gstatic.com/s/greatvibes/v19/RWmMoKWR9v4ksMfaWd_JN-XCg6UKDXlq.ttf",
            isGoogleFont: true,
          },
          {
            label: "Satisfy",
            url: "https://fonts.gstatic.com/s/satisfy/v21/rP2Hp2yn6lkG50LoOZSCHBeHFl0.ttf",
            isGoogleFont: true,
          },
          {
            label: "Quicksand",
            url: "https://fonts.gstatic.com/s/quicksand/v31/6xK-dSZaM9iE8KbpRA_LJ3z8mH9BOJvgkP8o18G0wx40QDw.ttf",
            isGoogleFont: true,
          },
        ],
      });
      await fetchFonts();
      configuration.data.settings.customizerSign.text.selectedFonts =
        manageFonts.value;
    }
    await addNewConfig(configuration);
  }
  step.value = 0;
  isNewConfig.value = false;
  includeDemo.value = false;
};

/* Function pour edit config */
const selectEditConfig = (config, duplicate = false) => {
  if (duplicate) {
    newConfig.value = config;
    openCloneModal.value = true;
  } else {
    newConfig.value = {
      id: config.id,
      name: config.name,
      description: config.description,
      icon: config.icon,
      popImg: config.popImg,
    };
    step.value = 5;
    isEdit.value = true;
  }
};
const updateConfig = async () => {
  isLoading.value = true;
  const result = await api.updateConfig(newConfig.value);
  if (result.success) {
    await fetchConfigs();
    toastMessage(result.message);
    step.value = 0;
    isLoading.value = false;
    newConfig.value = {
      name: "",
      description: "",
      icon: "",
      popImg: "",
    };
  } else {
    isLoading.value = false;
    newConfig.value = {
      name: "",
      description: "",
      icon: "",
      popImg: "",
    };
    toastMessage(result.message, "error");
  }
};

/** Function to delete config */
const selectDeleteConfig = (id, name) => {
  deleteConfig.value = { id: id, name: name };
  closeModal();
};
const delConfig = async () => {
  isLoading.value = true;
  const result = await api.deleteConfig(deleteConfig.value.id);
  if (result.success) {
    await fetchConfigs();
    isLoading.value = false;
    toastMessage(result.message);
  } else {
    isLoading.value = false;
    toastMessage(result.message, "error");
  }
  closeModal();
};
const goToMaterial = (config) => {
  const firstMaterial = config.data.materials?.[0]; // Get the first material
  if (!firstMaterial) {
    console.warn("No materials found for configuration:", config.name);
    // Fallback to a generic materials list for the config if no materials are found
    router.push("/configs/" + config.name.toLowerCase().replace(/ /g, '-') + "/" + config.id + "/materials");
    return;
  }

  const materialType = firstMaterial.type;
  const materialId = 0; // Assuming the first material is at index 0
  const materialName = firstMaterial.name.toLowerCase().replace(/\s+/g, '-');

  if (materialType === 'advance') {
    router.push({
      name: 'Material-Advance',
      params: {
        configId: config.id,
        config: config.name.toLowerCase().replace(/ /g, '-'),
        materialId: materialId,
        material: materialName,
      }
    });
  } else if (materialType === 'simple') {
    router.push({
      name: 'Simple-Sizes',
      params: {
        configId: config.id,
        config: config.name.toLowerCase().replace(/ /g, '-'),
        materialId: materialId,
        material: materialName,
      }
    });
  } else {
    console.warn("Unknown material type for navigation:", materialType);
    // Fallback to a generic materials list for the config if type is unknown
    router.push("/configs/" + config.name.toLowerCase().replace(/ /g, '-') + "/" + config.id + "/materials");
  }
};

const goToPreview = (config) => {
  // Placeholder for now, assuming a route like /configs/:name/:id/preview
  // You would replace this with actual router.push to the preview page
  alert('Previewing configuration: ' + config.name + ' (ID: ' + config.id + ')');
  console.log('Preview config:', config);
};

/** Modal Function */
const closeModal = () => {
  if (!isLoading.value) {
    openModal.value = !openModal.value;
  }
};

const addConfig = () => {
  step.value = 1;
  isNewConfig.value = true;
  isEdit.value = false;
  wizard.value = {
    step: 1,
    category: "signage",
    productType: null,
    materialType: null,
    includeDemo: false,
  };
  newConfig.value = { name: "", description: "", icon: "", popImg: "" };
};

/** Navigation entre les sections */
const back = () => {
  const level = step.value;
  if (!isEdit.value) {
    if (level != 0) {
      if (level - 1 == 0) {
        isNewConfig.value = false;
        newConfig.value = {
          name: "",
          description: "",
          icon: "",
          popImg: "",
        };
      }
      step.value = level - 1;
      includeDemo.value = false;
    }
  } else {
    if (!isLoading.value) {
      newConfig.value = {
        name: "",
        description: "",
        icon: "",
        popImg: "",
      };
      step.value = 0;
      isEdit.value = false;
    }
  }
};
const next = () => {
  const level = step.value;
  if (level != 2) {
    step.value = level + 1;
  }
};

/** Fonction for image selection */
const selectConfigIcon = async (e) => {
  e.preventDefault();
  var uploader = wp
    .media({
      title: "Select Configuration icon",
      button: {
        text: "Select Icon",
      },
      multiple: false,
    })
    .on("select", function () {
      var selection = uploader.state().get("selection");
      selection.map(function (attachment) {
        attachment = attachment.toJSON();
        if (attachment.type == "image") {
          newConfig.value.icon = attachment.url;
        }
      });
    })
    .open();
};
const selectConfigPopImg = async (e) => {
  e.preventDefault();
  var uploader = wp
    .media({
      title: "Select Configuration icon",
      button: {
        text: "Select Icon",
      },
      multiple: false,
    })
    .on("select", function () {
      var selection = uploader.state().get("selection");
      selection.map(function (attachment) {
        attachment = attachment.toJSON();
        if (attachment.type == "image") {
          newConfig.value.popImg = attachment.url;
        }
      });
    })
    .open();
};

/** Function for getting configuration name first letter */
const getInitials = (str) => {
  const words = str.split(" ");
  const initials = words.map((word) => word.trim().charAt(0).toUpperCase());
  const result = initials.join("");
  return result;
};
</script>
<style>
#asowp-search {
  padding: 0px 33px 0 10px !important;
}
</style>
