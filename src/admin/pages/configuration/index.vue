<template>
  <div class="asowp-space-y-2 asowp-w-full">
    <div v-if="!isEdit" class="asowp-space-y-2">
      <div
        class="asowp-sticky asowp-top-[20px] asowp-w-full asowp-z-[999] asowp-rounded-xl asowp-bg-[#fff] asowp-border asowp-border-solid asowp-border-[#e6e6e6]"
      >
        <div class="asowp-px-4 asowp-flex">
          <div class="asowp-font-bold asowp-py-4 asowp-w-[50%]">
            {{ __("Configurations list", "all-signs-options-pro") }}
          </div>
          <div
            class="asowp-flex asowp-justify-end asowp-items-center asowp-w-[50%]"
            v-if="canAddNew"
          >
            <div class="asowp-flex asowp-items-center asowp-gap-2">
              <button
                v-if="selectedConfigIds.length"
                type="button"
                @click="openBulkDeleteModal = true"
                class="asowp-inline-flex asowp-items-center asowp-gap-2 asowp-rounded-md asowp-bg-white asowp-border asowp-border-[#e5e7eb] hover:asowp-bg-[#f8fafc] asowp-no-underline asowp-text-[#8e1f0b] asowp-text-sm asowp-font-medium asowp-px-4 asowp-py-2 asowp-cursor-pointer"
              >
                {{ __("Delete selected", "all-signs-options-pro") }} ({{ selectedConfigIds.length }})
              </button>
              <RouterLink
                to="/configurations/new"
                class="asowp-inline-flex asowp-items-center asowp-gap-2 asowp-rounded-md asowp-bg-[#016464] hover:asowp-text-white asowp-no-underline asowp-text-white asowp-text-sm asowp-font-medium asowp-px-4 asowp-py-2"
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
                {{ __("Add new configuration", "all-signs-options-pro") }}
              </RouterLink>
               
            </div>
          </div>
        </div>
      </div>
      <!-- Table which display all configurations -->
      <div class="asowp-w-full asowp-relative">
        <div
          class="asowp-overflow-hidden asowp-w-[98%] asowp-p-3 asowp-bg-white asowp-rounded-xl asowp-bg-[#fff] asowp-border asowp-border-solid asowp-border-[#e6e6e6]"
        >
          <div
            v-if="!isFetching && configs.length > 0"
            class="asowp-grid asowp-grid-cols-6 asowp-justify-center asowp-items-center asowp-p-3 asowp-text-[.75rem] asowp-text-[#616161] asowp-font-[550] asowp-bg-[#f7f7f7] asowp-border-b-[1px] asowp-border-t-0 asowp-border-l-0 asowp-border-r-0 asowp-border-solid asowp-border-gray-200 asowp-gap-x-10"
          >
            <div class="asowp-flex asowp-items-center">
              <input
                type="checkbox"
                :checked="allSelected"
                @click.stop
                @change="toggleSelectAll($event.target.checked)"
              />
            </div>
            <div class="asowp-flex asowp-items-center">{{ __("Name configuration", "all-signs-options-pro") }}</div>
            <div class="asowp-flex asowp-items-center asowp-justify-center">
              {{ __("Description", "all-signs-options-pro") }}
            </div>
            <div class="asowp-flex asowp-items-center asowp-justify-center">{{ __("Icon", "all-signs-options-pro") }}</div>
            <div class="asowp-flex asowp-items-center asowp-justify-center">{{ __("Material type", "all-signs-options-pro") }}</div>
            <div class="asowp-flex asowp-items-center asowp-justify-center">
              {{ __("Actions", "all-signs-options-pro") }}
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
                {{ __("No Configurations found", "all-signs-options-pro") }}
              </p>
              <p class="asowp-text-[1em]">
                {{ __("Try changing the filters or search term", "all-signs-options-pro") }}
              </p>
            </div>
          </div>
          <div
            
            v-for="(config, key) in configs"
            :key="key"
            @click="goToMaterial(config)"
            class="asowp-cursor-pointer hover:asowp-bg-[#f7f7f7] asowp-grid asowp-items-center asowp-bg-white asowp-grid-cols-6 asowp-px-4 asowp-py-2 asowp-text-[.8125rem] asowp-text-[#303030] asowp-border-b-[1px] asowp-border-t-0 asowp-border-l-0 asowp-border-r-0 asowp-border-solid asowp-border-gray-200 asowp-gap-x-10"
          >
            <div class="asowp-flex asowp-items-center" @click.stop>
              <input
                type="checkbox"
                :checked="selectedConfigIds.includes(config.id)"
                @change="toggleSelect(config.id, $event.target.checked)"
              />
            </div>
            <div
              class="asowp-text-[#303030] asowp-flex dark:asowp-text-[#303030] asowp-overflow-hidden asowp-whitespace-nowrap asowp-text-ellipsis asowp-space-x-4"
            >
              <span
                class="asowp-w-5 asowp-h-5 asowp-p-1 asowp-px-1 asowp-flex asowp-justify-center asowp-items-center asowp-rounded-full asowp-bg-[#f0f0f1] asowp-border asowp-border-solid asowp-border-black"
              >
                <span class="asowp-text-[.8125rem]">{{
                  getInitials(config.name)
                }}</span>
              </span>
              <span
                class="asowp-flex asowp-justify-center asowp-items-center asowp-text-[.8125rem]"
                >{{ config.name }}</span
              >
            </div>
            <div
              class="asowp-text-[#303030] asowp-justify-center asowp-items-center asowp-flex dark:asowp-text-[#303030] asowp-overflow-hidden asowp-whitespace-nowrap asowp-text-ellipsis"
            >
              <span>{{ config.description }}</span>
            </div>
            <div class="asowp-text-gray-500 dark:asowp-text-gray-400 asowp-flex asowp-justify-center asowp-items-center">
                <img class="asowp-w-10 asowp-h-10 asowp-rounded" :src="config.icon" alt="" v-if="config.icon!=''">
            </div>
            <div class="asowp-flex asowp-justify-center asowp-items-center">
                <span
                    style="padding: .125rem .5rem;"
                    :class="(config.materialType || config.data?.materials?.[0]?.type) === 'advance'
                        ? 'asowp-text-[#0c5132] asowp-bg-[#b4fed2] asowp-rounded-[.5rem] asowp-text-[.75rem] asowp-leading-[1rem]'
                        : 'asowp-text-[#003a5a] asowp-bg-[#d5ebff] asowp-rounded-[.5rem] asowp-text-[.75rem] asowp-leading-[1rem]'"
                >{{ config.materialType || config.data?.materials?.[0]?.type }}</span>
            </div>
            <div
              class="asowp-flex asowp-space-x-2 asowp-justify-center asowp-items-center asowp-text-gray-500 dark:asowp-text-gray-400"
            >

              <button
                class="asowp-w-7 asowp-h-7 asowp-bg-white asowp-cursor-pointer asowp-border asowp-border-gray-300 asowp-rounded-lg asowp-flex asowp-items-center asowp-justify-center asowp-shadow-sm hover:asowp-bg-gray-100 asowp-transition"
                @click.stop="handleOpenConfigParams(key)"
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
                    d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                  />
                </svg>
                <div
                  class="asowp-absolute asowp-top-0 asowp-right-0 asowp-w-40 asowp-bg-white asowp-shadow-lg asowp-rounded-xl asowp-py-2 asowp-z-[999] asowp-border asowp-border-gray-100"
                  style="max-width: 6rem; max-height: 31.25rem;  border-radius: 0.75rem; padding: 0.375rem;"
                  v-if="showParams[key]"
                  @click.self="showParams[key] = false"
                >
                  <!-- Preview -->
                  <button
                    class="asowp-bg-transparent asowp-border-none asowp-cursor-pointer asowp-w-full asowp-px-4 asowp-py-2 asowp-flex asowp-items-center asowp-gap-3 asowp-hover asowp-transition"
                    style="padding: .25rem .375rem; border-radius: .5rem;"
                    @click.stop="goToPreview(config)"
                  >
                    <svg
                      viewBox="0 0 20 20"
                      class="asowp-w-5 asowp-h-5"
                      fill="#303030"
                      focusable="false"
                      aria-hidden="true">
                      <path
                        fill-rule="evenodd"
                        d="M13 10a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm-1.5 0a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z">
                      </path>
                      <path
                        fill-rule="evenodd"
                        d="M10 4c-2.476 0-4.348 1.23-5.577 2.532a9.266 9.266 0 0 0-1.4 1.922 5.98 5.98 0 0 0-.37.818c-.082.227-.153.488-.153.728s.071.501.152.728c.088.246.213.524.371.818.317.587.784 1.27 1.4 1.922 1.229 1.302 3.1 2.532 5.577 2.532 2.476 0 4.348-1.23 5.577-2.532a9.265 9.265 0 0 0 1.4-1.922 5.98 5.98 0 0 0 .37-.818c.082-.227.153-.488.153-.728s-.071-.501-.152-.728a5.984 5.984 0 0 0-.371-.818 9.269 9.269 0 0 0-1.4-1.922c-1.229-1.302-3.1-2.532-5.577-2.532Zm-5.999 6.002v-.004c.004-.02.017-.09.064-.223a4.5 4.5 0 0 1 .278-.608 7.768 7.768 0 0 1 1.17-1.605c1.042-1.104 2.545-2.062 4.487-2.062 1.942 0 3.445.958 4.486 2.062a7.77 7.77 0 0 1 1.17 1.605c.13.24.221.447.279.608.047.132.06.203.064.223v.004c-.004.02-.017.09-.064.223a4.503 4.503 0 0 1-.278.608 7.768 7.768 0 0 1-1.17 1.605c-1.042 1.104-2.545 2.062-4.487 2.062-1.942 0-3.445-.958-4.486-2.062a7.766 7.766 0 0 1-1.17-1.605 4.5 4.5 0 0 1-.279-.608c-.047-.132-.06-.203-.064-.223Z">
                      </path>
                    </svg>
                    <span class="asowp-text-[.8125rem] asowp-font-[450] asowp-text-[#303030]">{{ __("Preview", "all-signs-options-pro") }}</span>
                  </button>

                  <!-- Edit -->
                    <button
                        class="asowp-bg-transparent asowp-border-none asowp-cursor-pointer asowp-w-full asowp-px-4 asowp-py-2 asowp-flex asowp-items-center asowp-gap-3 asowp-hover asowp-transition"
                        style="padding: .25rem .375rem; border-radius: .5rem;"
                        @click.stop="openEditModalFor(config)"
                    >
                    <svg
                      viewBox="0 0 20 20"
                      class="asowp-w-5 asowp-h-5 asowp-text-[#303030]"
                      focusable="false"
                      fill="#303030"
                      aria-hidden="true">
                      <path
                        fill-rule="evenodd"
                        d="M15.655 4.344a2.695 2.695 0 0 0-3.81 0l-.599.599-.009-.009-1.06 1.06.008.01-5.88 5.88a2.75 2.75 0 0 0-.805 1.944v1.922a.75.75 0 0 0 .75.75h1.922a2.75 2.75 0 0 0 1.944-.806l7.54-7.539a2.695 2.695 0 0 0 0-3.81Zm-4.409 2.72-5.88 5.88a1.25 1.25 0 0 0-.366.884v1.172h1.172c.331 0 .65-.132.883-.366l5.88-5.88-1.689-1.69Zm2.75.629.599-.599a1.195 1.195 0 1 0-1.69-1.689l-.598.599 1.69 1.689Z">
                      </path>
                    </svg>
                    <span class="asowp-text-[.8125rem] asowp-font-[450] asowp-text-[#303030]">{{ __("Edit", "all-signs-options-pro") }}</span>
                  </button>

                  <!-- Duplicate -->
                  <button
                    class="asowp-bg-transparent asowp-border-none asowp-cursor-pointer asowp-w-full asowp-px-4 asowp-py-2 asowp-flex asowp-items-center asowp-gap-3 asowp-hover asowp-transition"
                    style="padding: .25rem .375rem; border-radius: .5rem;"
                    @click.stop="openDuplicateModalFor(config)"
                  >
                    <svg
                      viewBox="0 0 20 20"
                      class="asowp-w-5 asowp-h-5"
                      fill="#303030"
                      focusable="false"
                      aria-hidden="true">
                      <path
                        d="M11.25 8.5c-.414 0-.75.336-.75.75v1.25h-1.25c-.414 0-.75.336-.75.75s.336.75.75.75h1.25v1.25c0 .414.336.75.75.75s.75-.336.75-.75v-1.25h1.25c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-1.25v-1.25c0-.414-.336-.75-.75-.75Z">
                      </path>
                      <path
                        fill-rule="evenodd"
                        d="M9.25 9a.75.75 0 0 0-1.5 0v4.25a.75.75 0 0 0 1.5 0v-4.25Z">
                      </path>
                      <path
                        fill-rule="evenodd"
                        d="M7.25 5.25a2.75 2.75 0 0 1 5.5 0h3a.75.75 0 0 1 0 1.5h-.75v5.45c0 1.68 0 2.52-.327 3.162a3 3 0 0 1-1.311 1.311c-.642.327-1.482.327-3.162.327h-.4c-1.68 0-2.52 0-3.162-.327a3 3 0 0 1-1.311-1.311c-.327-.642-.327-1.482-.327-3.162v-5.45h-.75a.75.75 0 0 1 0-1.5h3Zm1.5 0a1.25 1.25 0 1 1 2.5 0h-2.5Zm-2.25 1.5h7v5.45c0 .865-.001 1.423-.036 1.848-.033.408-.09.559-.128.633a1.5 1.5 0 0 1-.655.655c-.074.038-.225.095-.633.128-.425.035-.983.036-1.848.036h-.4c-.865 0-1.423-.001-1.848-.036-.408-.033-.559-.09-.633-.128a1.5 1.5 0 0 1-.656-.655c-.037-.074-.094-.225-.127-.633-.035-.425-.036-.983-.036-1.848v-5.45Z">
                      </path>
                    </svg>
                    <span class="asowp-text-[.8125rem] asowp-font-[450] asowp-text-[#303030]">{{ __("Duplicate", "all-signs-options-pro") }}</span>
                  </button>

                  <!-- Delete -->
                  <button
                    class="asowp-bg-transparent asowp-border-none asowp-cursor-pointer asowp-w-full asowp-px-4 asowp-py-2 asowp-flex asowp-items-center asowp-gap-3 asowp-hover-delete asowp-transition"
                    style="padding: .25rem .375rem; border-radius: .5rem;"
                    @click.stop="selectDeleteConfig(config.id, config.name)"
                  >
                    <svg
                      viewBox="0 0 20 20"
                      class="asowp-w-5 asowp-h-5"
                      fill="rgb(142, 31, 11)"
                      focusable="false"
                      aria-hidden="true">
                      <path
                        d="M11.5 8.25a.75.75 0 0 1 .75.75v4.25a.75.75 0 0 1-1.5 0v-4.25a.75.75 0 0 1 .75-.75Z">
                      </path>
                      <path
                        d="M9.25 9a.75.75 0 0 0-1.5 0v4.25a.75.75 0 0 0 1.5 0v-4.25Z">
                      </path>
                      <path
                        fill-rule="evenodd"
                        d="M7.25 5.25a2.75 2.75 0 0 1 5.5 0h3a.75.75 0 0 1 0 1.5h-.75v5.45c0 1.68 0 2.52-.327 3.162a3 3 0 0 1-1.311 1.311c-.642.327-1.482.327-3.162.327h-.4c-1.68 0-2.52 0-3.162-.327a3 3 0 0 1-1.311-1.311c-.327-.642-.327-1.482-.327-3.162v-5.45h-.75a.75.75 0 0 1 0-1.5h3Zm1.5 0a1.25 1.25 0 1 1 2.5 0h-2.5Zm-2.25 1.5h7v5.45c0 .865-.001 1.423-.036 1.848-.033.408-.09.559-.128.633a1.5 1.5 0 0 1-.655.655c-.074.038-.225.095-.633.128-.425.035-.983.036-1.848.036h-.4c-.865 0-1.423-.001-1.848-.036-.408-.033-.559-.09-.633-.128a1.5 1.5 0 0 1-.656-.655c-.037-.074-.094-.225-.127-.633-.035-.425-.036-.983-.036-1.848v-5.45Z">
                      </path>
                    </svg>
                    <span class="asowp-text-[.8125rem] asowp-font-[450]" style="color:rgb(142, 31, 11);">{{ __("Delete", "all-signs-options-pro") }}</span>
                  </button>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Edit modal (name + description only) -->
  <div
    v-if="openEditModal"
    class="asowp-fixed asowp-inset-0 asowp-z-[1000] asowp-flex asowp-items-center asowp-justify-center"
  >
    <div class="asowp-absolute asowp-inset-0 asowp-bg-black asowp-bg-opacity-40" @click="closeEditModal"></div>
    <div class="asowp-relative asowp-w-[min(700px,95vw)] asowp-bg-white asowp-rounded-2xl asowp-shadow-xl asowp-overflow-hidden asowp-flex asowp-flex-col">
      <div class="asowp-flex asowp-items-center asowp-justify-between asowp-px-5 asowp-py-3 asowp-border-b asowp-border-[#e5e7eb]">
        <div class="asowp-text-[14px] asowp-font-semibold">{{ __("Edit configuration", "all-signs-options-pro") }}</div>
        <button class="asowp-p-1 asowp-rounded-md hover:asowp-bg-[#f3f4f6] asowp-border-0 asowp-bg-transparent asowp-cursor-pointer" @click="closeEditModal" aria-label="Close">✕</button>
      </div>
      <div class="asowp-p-5 asowp-space-y-4">
        <div>
          <label class="asowp-text-[13px] asowp-text-[#3c3c3c] asowp-font-medium">{{ __("Name", "all-signs-options-pro") }}</label>
          <input v-model.trim="editForm.name" type="text" class="asowp-mt-2 asowp-w-full asowp-rounded-md asowp-border asowp-border-[#e5e7eb] asowp-px-3 asowp-py-2" />
        </div>
        <div>
          <label class="asowp-text-[13px] asowp-text-[#3c3c3c] asowp-font-medium">{{ __("Description", "all-signs-options-pro") }}</label>
          <textarea v-model="editForm.description" rows="3" class="asowp-mt-2 asowp-w-full asowp-rounded-md asowp-border asowp-border-[#e5e7eb] asowp-px-3 asowp-py-2"></textarea>
        </div>
      </div>
      <div class="asowp-flex asowp-justify-end asowp-gap-2 asowp-px-5 asowp-py-3 asowp-border-t asowp-border-[#e5e7eb]">
        <button class="asowp-rounded-md asowp-border asowp-border-[#e5e7eb] asowp-bg-white hover:asowp-bg-[#f8fafc] asowp-text-[13px] asowp-px-4 asowp-py-2 asowp-cursor-pointer" :disabled="isLoading" @click="closeEditModal">{{ __("Cancel", "all-signs-options-pro") }}</button>
        <button class="asowp-rounded-md asowp-bg-[#016464] hover:asowp-bg-[#028383] asowp-text-white asowp-text-[13px] asowp-px-4 asowp-py-2 asowp-cursor-pointer" :disabled="isLoading || !editForm.name?.trim()" @click="saveEdit">{{ __("Save", "all-signs-options-pro") }}</button>
      </div>
    </div>
  </div>

  <!-- Duplicate modal -->
  <div
    v-if="openCloneModal"
    class="asowp-fixed asowp-inset-0 asowp-z-[1000] asowp-flex asowp-items-center asowp-justify-center"
  >
    <div class="asowp-absolute asowp-inset-0 asowp-bg-black asowp-bg-opacity-40" @click="closeDuplicateModal"></div>
    <div class="asowp-relative asowp-w-[min(700px,95vw)] asowp-bg-white asowp-rounded-2xl asowp-shadow-xl asowp-overflow-hidden asowp-flex asowp-flex-col">
      <div class="asowp-flex asowp-items-center asowp-justify-between asowp-px-5 asowp-py-3 asowp-border-b asowp-border-[#e5e7eb]">
        <div class="asowp-text-[14px] asowp-font-semibold">{{ __("Duplicate configuration", "all-signs-options-pro") }}</div>
        <button class="asowp-p-1 asowp-rounded-md hover:asowp-bg-[#f3f4f6] asowp-border-0 asowp-bg-transparent asowp-cursor-pointer" @click="closeDuplicateModal" aria-label="Close">✕</button>
      </div>
      <div class="asowp-p-5 asowp-space-y-2">
        <div class="asowp-text-[13px] asowp-text-gray-700">{{ __("Choose a name for the duplicated configuration.", "all-signs-options-pro") }}</div>
        <input v-model.trim="duplicateName" type="text" class="asowp-mt-2 asowp-w-full asowp-rounded-md asowp-border asowp-border-[#e5e7eb] asowp-px-3 asowp-py-2" />
      </div>
      <div class="asowp-flex asowp-justify-end asowp-gap-2 asowp-px-5 asowp-py-3 asowp-border-t asowp-border-[#e5e7eb]">
        <button class="asowp-rounded-md asowp-border asowp-border-[#e5e7eb] asowp-bg-white hover:asowp-bg-[#f8fafc] asowp-text-[13px] asowp-px-4 asowp-py-2 asowp-cursor-pointer" :disabled="isLoading" @click="closeDuplicateModal">{{ __("Cancel", "all-signs-options-pro") }}</button>
        <button class="asowp-rounded-md asowp-bg-[#016464] hover:asowp-bg-[#028383] asowp-text-white asowp-text-[13px] asowp-px-4 asowp-py-2 asowp-cursor-pointer" :disabled="isLoading || !duplicateName?.trim()" @click="confirmDuplicate">{{ __("Duplicate", "all-signs-options-pro") }}</button>
      </div>
    </div>
  </div>

  <!-- Delete single modal -->
  <div
    v-if="openModal"
    class="asowp-fixed asowp-inset-0 asowp-z-[1000] asowp-flex asowp-items-center asowp-justify-center"
  >
    <div class="asowp-absolute asowp-inset-0 asowp-bg-black asowp-bg-opacity-40" @click="closeModal"></div>
    <div class="asowp-relative asowp-w-[min(520px,95vw)] asowp-bg-white asowp-rounded-2xl asowp-shadow-xl asowp-overflow-hidden asowp-flex asowp-flex-col">
      <div class="asowp-flex asowp-items-center asowp-justify-between asowp-px-5 asowp-py-3 asowp-border-b asowp-border-[#e5e7eb]">
        <div class="asowp-text-[14px] asowp-font-semibold">{{ __("Delete configuration", "all-signs-options-pro") }}</div>
        <button class="asowp-p-1 asowp-rounded-md hover:asowp-bg-[#f3f4f6] asowp-border-0 asowp-bg-transparent asowp-cursor-pointer" @click="closeModal" aria-label="Close">✕</button>
      </div>
      <div class="asowp-p-5 asowp-space-y-2">
        <div class="asowp-text-[13px] asowp-text-gray-700">{{ __("Are you sure you want to delete this configuration?", "all-signs-options-pro") }}</div>
        <div class="asowp-rounded-lg asowp-bg-[#fafafa] asowp-border asowp-border-[#e5e7eb] asowp-p-3 asowp-text-[13px] asowp-font-semibold asowp-text-[#303030]">
          {{ deleteConfig.name }}
        </div>
        <div class="asowp-text-[12px] asowp-text-gray-600">
          {{ __("This will detach associated products (their config-id will be set to 0).", "all-signs-options-pro") }}
        </div>
      </div>
      <div class="asowp-flex asowp-justify-end asowp-gap-2 asowp-px-5 asowp-py-3 asowp-border-t asowp-border-[#e5e7eb]">
        <button class="asowp-rounded-md asowp-border asowp-border-[#e5e7eb] asowp-bg-white hover:asowp-bg-[#f8fafc] asowp-text-[13px] asowp-px-4 asowp-py-2 asowp-cursor-pointer" :disabled="isLoading" @click="closeModal">{{ __("Cancel", "all-signs-options-pro") }}</button>
        <button class="asowp-rounded-md asowp-bg-[#8e1f0b] hover:asowp-bg-[#7a1a09] asowp-text-white asowp-text-[13px] asowp-px-4 asowp-py-2 asowp-cursor-pointer" :disabled="isLoading" @click="delConfig">{{ __("Delete", "all-signs-options-pro") }}</button>
      </div>
    </div>
  </div>

  <!-- Bulk delete modal -->
  <div
    v-if="openBulkDeleteModal"
    class="asowp-fixed asowp-inset-0 asowp-z-[1000] asowp-flex asowp-items-center asowp-justify-center"
  >
    <div class="asowp-absolute asowp-inset-0 asowp-bg-black asowp-bg-opacity-40" @click="closeBulkDeleteModal"></div>
    <div class="asowp-relative asowp-w-[min(520px,95vw)] asowp-bg-white asowp-rounded-2xl asowp-shadow-xl asowp-overflow-hidden asowp-flex asowp-flex-col">
      <div class="asowp-flex asowp-items-center asowp-justify-between asowp-px-5 asowp-py-3 asowp-border-b asowp-border-[#e5e7eb]">
        <div class="asowp-text-[14px] asowp-font-semibold">{{ __("Delete selected configurations", "all-signs-options-pro") }}</div>
        <button class="asowp-p-1 asowp-rounded-md hover:asowp-bg-[#f3f4f6] asowp-border-0 asowp-bg-transparent asowp-cursor-pointer" @click="closeBulkDeleteModal" aria-label="Close">✕</button>
      </div>
      <div class="asowp-p-5 asowp-space-y-2">
        <div class="asowp-text-[13px] asowp-text-gray-700">
          {{ __("You are about to delete", "all-signs-options-pro") }} {{ selectedConfigIds.length }} {{ __("configuration(s).", "all-signs-options-pro") }}
        </div>
        <div class="asowp-text-[12px] asowp-text-gray-600">
          {{ __("Products attached to these configurations will be detached (config-id set to 0).", "all-signs-options-pro") }}
        </div>
      </div>
      <div class="asowp-flex asowp-justify-end asowp-gap-2 asowp-px-5 asowp-py-3 asowp-border-t asowp-border-[#e5e7eb]">
        <button class="asowp-rounded-md asowp-border asowp-border-[#e5e7eb] asowp-bg-white hover:asowp-bg-[#f8fafc] asowp-text-[13px] asowp-px-4 asowp-py-2 asowp-cursor-pointer" :disabled="isLoading" @click="closeBulkDeleteModal">{{ __("Cancel", "all-signs-options-pro") }}</button>
        <button class="asowp-rounded-md asowp-bg-[#8e1f0b] hover:asowp-bg-[#7a1a09] asowp-text-white asowp-text-[13px] asowp-px-4 asowp-py-2 asowp-cursor-pointer" :disabled="isLoading || !selectedConfigIds.length" @click="confirmBulkDelete">{{ __("Delete all", "all-signs-options-pro") }}</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useRoute, useRouter, RouterLink } from "vue-router";
import api from "@/admin/Api/api";
import toastMessage from "@/admin/utils/functions";
import { __, _x, _n, _nx, sprintf, setLocaleData } from "@wordpress/i18n";
const router = useRouter();
const route = useRoute();

const showParams = ref([]);
const openCloneModal = ref(false);
const openEditModal = ref(false);
const openBulkDeleteModal = ref(false);
const selectedConfigIds = ref([]);
const cloneSource = ref(null);
const duplicateName = ref("");
const editForm = ref({ id: null, name: "", description: "" });
const deleteConfig = ref({
  id: null,
  name: "",
});

const configs = ref([]);
const totalPages = ref(0);
const pages = ref(0);
const page = ref(1);
const totalConfigsFound = ref(0);
const isFetching = ref(false);
const canAddNew = ref(false);
const isLoading = ref(false);
const openModal = ref(false);
const isEdit = ref(false);

const allSelected = computed(() => {
  return configs.value.length > 0 && selectedConfigIds.value.length === configs.value.length;
});

onMounted(async () => {
    isFetching.value = true;
    await fetchConfigs();
    canAddNew.value = true;
    isFetching.value = false;
});

const fetchConfigs = async () => {
  const allConfigs = await api.getConfigs();
  configs.value = allConfigs.data;
  totalPages.value = allConfigs.totalPages;
  pages.value = allConfigs.totalPages;
  totalConfigsFound.value = allConfigs.totalConfigsFound;
  showParams.value = new Array(allConfigs.data.length).fill(false);
  selectedConfigIds.value = selectedConfigIds.value.filter((id) =>
    allConfigs.data.some((c) => c.id === id)
  );
};

const handleOpenConfigParams = (key) => {
  showParams.value = showParams.value.map((p, i) => i === key ? !p : false);
};

const getInitials = (str) => {
  if (!str) return '';
  const words = str.split(" ");
  const initials = words.map((word) => word.trim().charAt(0).toUpperCase());
  return initials.join("");
};

const goToMaterial = (config) => {
    router.push({ name: 'materials', params: { configId: config.id, config: config.name.replace(/ /g, '-') } });
};

const goToPreview = (config) => {
    router.push({ name: 'preview-back', params: { configId: config.id, config: config.name.replace(/ /g, '-') } });
};

const selectDeleteConfig = (id, name) => {
  deleteConfig.value = { id, name };
  openModal.value = true;
};

const delConfig = async () => {
    isLoading.value = true;
    const result = await api.deleteConfig(deleteConfig.value.id);
    if (result.success) {
        await fetchConfigs();
        toastMessage(result.message);
    } else {
        toastMessage(result.message, "error");
    }
    isLoading.value = false;
    openModal.value = false;
};

const openEditModalFor = (config) => {
  showParams.value = showParams.value.map(() => false);
  editForm.value = {
    id: config.id,
    name: config.name || "",
    description: config.description || "",
  };
  openEditModal.value = true;
};

const closeEditModal = () => {
  if (isLoading.value) return;
  openEditModal.value = false;
};

const saveEdit = async () => {
  if (!editForm.value?.id) return;
  if (!editForm.value?.name?.trim()) return;
  isLoading.value = true;
  try {
    const res = await api.updateConfig({
      id: editForm.value.id,
      name: editForm.value.name,
      description: editForm.value.description,
    });
    if (res.success) {
      toastMessage(res.message);
      await fetchConfigs();
      openEditModal.value = false;
    } else {
      toastMessage(res.message, "error");
    }
  } finally {
    isLoading.value = false;
  }
};

const openDuplicateModalFor = (config) => {
  showParams.value = showParams.value.map(() => false);
  cloneSource.value = config;
  duplicateName.value = `Copy of ${config.name || "configuration"}`;
  openCloneModal.value = true;
};

const closeDuplicateModal = () => {
  if (isLoading.value) return;
  openCloneModal.value = false;
  cloneSource.value = null;
  duplicateName.value = "";
};

const confirmDuplicate = async () => {
  if (!cloneSource.value) return;
  if (!duplicateName.value.trim()) return;
  isLoading.value = true;
  try {
    const res = await api.addConfig({
      name: duplicateName.value,
      description: cloneSource.value.description || "",
      icon: cloneSource.value.icon || "",
      popImg: cloneSource.value.popImg || "",
      materialType: cloneSource.value.materialType || "simple",
      data: cloneSource.value.data,
    });
    if (res.success) {
      toastMessage(res.message);
      await fetchConfigs();
      closeDuplicateModal();
    } else {
      toastMessage(res.message || "Duplicate failed", "error");
    }
  } finally {
    isLoading.value = false;
  }
};

const closeModal = () => {
    if (!isLoading.value) {
        openModal.value = false;
    }
};

const toggleSelect = (id, checked) => {
  const numericId = Number(id);
  if (checked) {
    if (!selectedConfigIds.value.includes(numericId)) {
      selectedConfigIds.value = [...selectedConfigIds.value, numericId];
    }
  } else {
    selectedConfigIds.value = selectedConfigIds.value.filter((x) => x !== numericId);
  }
};

const toggleSelectAll = (checked) => {
  selectedConfigIds.value = checked ? configs.value.map((c) => c.id) : [];
};

const closeBulkDeleteModal = () => {
  if (isLoading.value) return;
  openBulkDeleteModal.value = false;
};

const confirmBulkDelete = async () => {
  if (!selectedConfigIds.value.length) return;
  isLoading.value = true;
  try {
    let successCount = 0;
    for (const id of selectedConfigIds.value) {
      const res = await api.deleteConfig(id);
      if (res?.success) {
        successCount++;
      }
    }
    await fetchConfigs();
    selectedConfigIds.value = [];
    openBulkDeleteModal.value = false;
    toastMessage(`Deleted ${successCount} configuration(s).`);
  } finally {
    isLoading.value = false;
  }
};

</script>
