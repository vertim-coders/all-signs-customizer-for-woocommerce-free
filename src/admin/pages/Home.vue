<template>
  <div class="asowp-p-4 asowp-space-y-3">

    <div class="asowp-flex asowp-justify-end">
      <RouterLink
        to="/configurations"
        class="asowp-inline-flex asowp-items-center asowp-gap-2 asowp-rounded-md asowp-bg-[#016464] hover:asowp-text-white asowp-no-underline asowp-text-white asowp-text-sm asowp-font-medium asowp-px-4 asowp-py-2">
        {{ __('Create configuration', 'all-signs-options-pro') }}
      </RouterLink>
    </div>

    <div class="asowp-flex asowp-space-x-3">
      <div class="asowp-w-[50%]">
        <button class="asowp-bg-[#fff] asowp-border-none asowp-flex asowp-cursor-pointer asowp-space-x-1 asowp-items-center asowp-w-full asowp-rounded-[0.75rem] asowp-px-2.5 asowp-py-2.5 asowp-text-left">
          <div class="asowp-bg-[#91d0ff] asowp-p-1 asowp-flex asowp-justify-center asowp-rounded-[6px] asowp-mr-2">
            <svg viewBox="0 0 20 20" class="Polaris-Icon__Svg asowp-w-4 asowp-h-4" focusable="false" aria-hidden="true">
              <path d="M10 14a.75.75 0 0 1-.75-.75v-3.5a.75.75 0 0 1 1.5 0v3.5a.75.75 0 0 1-.75.75Z"></path><path d="M9 7a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z"></path>
              <path fill-rule="evenodd" d="M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Zm-1.5 0a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0Z"></path>
            </svg>
          </div>
          {{ __('Click', 'all-signs-options-pro') }} 
          <a href="#" @click.prevent="openInstallConfigModal">&nbsp;{{ __('here to install configuration screen', 'all-signs-options-pro') }}&nbsp;</a>
          {{ __('in your online store', 'all-signs-options-pro') }}
        </button>
      </div>
      <div class="asowp-w-[50%]">
        <button class="asowp-bg-[#fff] asowp-border-none asowp-cursor-pointer asowp-space-x-1 asowp-flex asowp-items-center asowp-w-full asowp-rounded-[0.75rem] asowp-px-2.5 asowp-py-2.5 asowp-text-left">
          <div class="asowp-bg-[#91d0ff] asowp-p-1 asowp-flex asowp-justify-center asowp-rounded-[6px] asowp-mr-2">
            <svg viewBox="0 0 20 20" class="Polaris-Icon__Svg asowp-w-4 asowp-h-4" focusable="false" aria-hidden="true">
              <path d="M10 14a.75.75 0 0 1-.75-.75v-3.5a.75.75 0 0 1 1.5 0v3.5a.75.75 0 0 1-.75.75Z"></path><path d="M9 7a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z"></path>
              <path fill-rule="evenodd" d="M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Zm-1.5 0a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0Z"></path>
            </svg>
          </div>
          {{ __('Click', 'all-signs-options-pro') }} 
          <a href="#" @click.prevent="openInstallTemplatesModal">&nbsp;{{ __('here to add template screen', 'all-signs-options-pro') }}&nbsp;</a>
          {{ __('to your online store', 'all-signs-options-pro') }}
        </button>
      </div>
    </div>

    <section class="asowp-grid lg:asowp-grid-cols-[1fr_360px] asowp-space-x-1">
        <div class="asowp-space-y-3">
            <div class="asowp-flex asowp-rounded-xl asowp-border asowp-border-[#e5e7eb] asowp-border-solid asowp-bg-white asowp-p-2">
                <div v-for="c in kpis" :key="c.key" class="asowp-p-5 asowp-space-y-2">
                    <div class="asowp-text-[28px] asowp-font-bold">{{ c.value }}</div>
                    <div class="asowp-text-[12px] asowp-text-gray-500">{{ c.label }}</div>
                </div>
            </div>

            <div class="asowp-rounded-xl asowp-border asowp-border-[#e5e7eb] asowp-overflow-hidden">
                <div class="asowp-bg-[#d1e2e2]">
                    <div class="asowp-px-5 asowp-py-3 asowp-flex asowp-items-center asowp-gap-2">
                        <svg viewBox="0 0 20 20" class="Polaris-Icon__Svg asowp-w-4 asowp-h-4" focusable="false" aria-hidden="true">
                            <path fill-rule="evenodd" d="M13.257 3h-6.514a1.25 1.25 0 0 0-.983.478l-2.386 3.037a1.75 1.75 0 0 0-.374 1.08v.655a2.75 2.75 0 0 0 1.5 2.45v4.55c0 .966.784 1.75 1.75 1.75h7.5a1.75 1.75 0 0 0 1.75-1.75v-4.55a2.75 2.75 0 0 0 1.5-2.45v-.481c0-.504-.17-.994-.48-1.39l-2.28-2.901a1.25 1.25 0 0 0-.983-.478Zm-.257 12.5h.75a.25.25 0 0 0 .25-.25v-4.25a2.742 2.742 0 0 1-2-.863 2.742 2.742 0 0 1-2 .863 2.742 2.742 0 0 1-2-.863 2.742 2.742 0 0 1-2 .863v4.25c0 .138.112.25.25.25h3.75v-2.5a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v2.5Zm-7-6h-.25c-.69 0-1.25-.56-1.25-1.25v-.654a.25.25 0 0 1 .053-.155l2.312-2.941h6.27l2.205 2.805a.75.75 0 0 1 .16.464v.481c0 .69-.56 1.25-1.25 1.25h-.25c-.69 0-1.25-.56-1.25-1.25v-.5a.75.75 0 0 0-1.5 0v.5a1.25 1.25 0 1 1-2.5 0v-.5a.75.75 0 0 0-1.5 0v.5c0 .69-.56 1.25-1.25 1.25Z"></path>
                        </svg>
                        <span class="asowp-text-[14px] asowp-font-semibold">{{ __('Main Menu', 'all-signs-options-pro') }}</span>
                    </div>
                    <div class="asowp-px-5 asowp-pb-[15px]">
                        <div class="asowp-space-y-2 asowp-bg-[#d1e2e2] asowp-pt-1">
                            <RouterLink v-for="item in mainMenu" :key="item.to" :to="item.to"
                                class="box-aso asowp-flex asowp-items-center asowp-justify-between asowp-p-2 asowp-no-underline focus:asowp-border-none">
                                <div class="asowp-flex asowp-items-start asowp-gap-3">
                                    <span class="asowp-w-9 asowp-h-9 asowp-rounded-lg asowp-bg-[#ffffff] asowp-flex asowp-items-center asowp-justify-center asowp-p-[5px]">
                                        <component :is="item.icon" />
                                    </span>
                                    <div class="asowp-py-1">
                                        <div class="asowp-text-[.8125em] asowp-font-semibold asowp-text-[#000]">{{ item.title }}</div>
                                        <div class="asowp-text-[1em] asowp-text-gray-600 asowp-text-[#000]">{{ item.desc }}</div>
                                    </div>
                                </div>
                                <svg class="asowp-w-4 asowp-h-4 asowp-text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                  <path d="M9 5l7 7-7 7" stroke-width="2" stroke-linecap="round"/>
                                </svg>
                            </RouterLink>
                        </div>
                    </div>
                </div>
            </div>

            <div class="asowp-rounded-xl asowp-border asowp-border-solid asowp-border-[#e5e7eb] asowp-bg-white">
              <div class="asowp-flex asowp-items-center asowp-gap-2 asowp-px-5 asowp-py-5 asowp-border-b asowp-border-[#e5e7eb]">
                <svg viewBox="0 0 20 20" class="Polaris-Icon__Svg asowp-w-4 asowp-h-4" focusable="false" aria-hidden="true">
                  <path d="M11.75 3.5a.75.75 0 0 0 0 1.5h2.19l-4.97 4.97a.75.75 0 1 0 1.06 1.06l4.97-4.97v2.19a.75.75 0 0 0 1.5 0v-4a.75.75 0 0 0-.75-.75h-4Z"></path><path d="M15 10.967a.75.75 0 0 0-1.5 0v2.783c0 .69-.56 1.25-1.25 1.25h-6c-.69 0-1.25-.56-1.25-1.25v-6c0-.69.56-1.25 1.25-1.25h2.783a.75.75 0 0 0 0-1.5h-2.783a2.75 2.75 0 0 0-2.75 2.75v6a2.75 2.75 0 0 0 2.75 2.75h6a2.75 2.75 0 0 0 2.75-2.75v-2.783Z"></path>
                </svg>
                <div class="asowp-text-[14px] asowp-font-semibold">{{ __('Learning center', 'all-signs-options-pro') }}</div>
              </div>

              <div class="asowp-pl-5 asowp-pr-5 asowp-pb-5 asowp-flex asowp-flex-col md:asowp-flex-row asowp-gap-4">
                <div class="asowp-flex-1 asowp-rounded-lg asowp-border asowp-border-solid asowp-border-[#e5e7eb] asowp-p-4">
                  <div class="asowp-text-[12px] asowp-font-semibold asowp-text-gray-700">{{ __('Browse demo', 'all-signs-options-pro') }}</div>
                  <p class="asowp-text-[13px] asowp-text-gray-600 asowp-mt-1">
                    {{ __('Explore live examples of sign lastconfigs in action.', 'all-signs-options-pro') }}
                  </p>
                  <div class="asowp-mt-2 asowp-flex asowp-items-center asowp-gap-3">
                    <button class="asowp-cursor-pointer asowp-flex asowp-rounded-md asowp-border asowp-border-[#e5e7eb] asowp-px-2 asowp-py-1.5 asowp-bg-[#fff] hover:asowp-bg-[#fafafa]">
                      <a href="https://demos.signsdesigner.us/aso-live-demo/" target="_blank" rel="noopener" class="asowp-no-underline asowp-flex asowp-text-[#484848] hover:asowp-text-[#484848] asowp-gap-2 focus:asowp-border-none">
                        {{ __('View demos', 'all-signs-options-pro') }}
                      </a>
                    </button>
                  </div>
                </div>

                <div class="asowp-flex-1 asowp-rounded-lg asowp-border asowp-border-solid asowp-border-[#e5e7eb] asowp-p-4">
                  <div class="asowp-text-[12px] asowp-font-semibold asowp-text-gray-700">{{ __('Documentation', 'all-signs-options-pro') }}</div>
                  <p class="asowp-text-[13px] asowp-text-gray-600 asowp-mt-1">
                    {{ __('Explore the app documentation', 'all-signs-options-pro') }}
                  </p>
                  <div class="asowp-mt-2">
                    <button class="asowp-cursor-pointer asowp-flex asowp-rounded-md asowp-border asowp-border-[#e5e7eb] asowp-px-2 asowp-py-1.5 asowp-bg-[#fff] hover:asowp-bg-[#fafafa]">
                      <a href="https://docs.signsdesigner.us/docs/aso-wp-documentation/" target="_blank" rel="noopener" class="asowp-no-underline asowp-flex asowp-text-[#484848] hover:asowp-text-[#484848] asowp-gap-2 focus:asowp-border-none">
                        {{ __('View docs', 'all-signs-options-pro') }}
                      </a>
                    </button>
                  </div>
                </div>
              </div>
            </div>
        </div>

      <div class="asowp-space-y-4">
        <div class="asowp-rounded-xl asowp-border asowp-border-[#e5e7eb] asowp-bg-white">
          <div class="asowp-px-5 asowp-py-2 asowp-border-b asowp-border-[#e5e7eb] asowp-text-[.8125em] asowp-font-semibold">
            {{ __('Recent Configurations', 'all-signs-options-pro') }}
          </div>
          <div class="asowp-pl-5 asowp-pr-5 asowp-pb-3 asowp-text-[1em] asowp-text-gray-600" v-if="recentConfigs.length === 0">
            {{ __('No recent configurations yet.', 'all-signs-options-pro') }}
          </div>
          <ul v-else class="asowp-px-5 asowp-py-3 asowp-m-0">
            <li v-for="rc in recentConfigs" :key="rc.id" class="asowp-flex asowp-justify-between asowp-items-center asowp-w-full">
              <div @click="goToMaterial(rc)" class="asowp-cursor-pointer asowp-text-black asowp-no-underline hover:asowp-text-black asowp-text-[12px] asowp-w-full">
                <div>{{ __('ID', 'all-signs-options-pro') }} {{ rc.id }}</div>
                <div class="asowp-flex asowp-justify-between asowp-items-center">
                  <div class="asowp-truncate asowp-font-bold">{{ rc.name }}</div>
                  <div class="asowp-text-gray-500 asowp-bg-[#d5ebff] asowp-text-[11px] asowp-py-1 asowp-px-3 asowp-rounded-full">{{ rc.materialType }}</div>
                </div>
              </div>
            </li>
          </ul>
        </div>

        <div class="asowp-rounded-xl asowp-border asowp-border-[#e5e7eb] asowp-bg-white">
          <div class="asowp-px-5 asowp-py-2 asowp-border-b asowp-border-[#e5e7eb] asowp-text-[.8125em] asowp-font-semibold">
            {{ __('Share your feedback', 'all-signs-options-pro') }}
          </div>
          <div class="asowp-pl-5 asowp-pr-5 asowp-pb-3 asowp-space-y-3 asowp-text-[13px]">
            <div class="asowp-text-[1em]">{{ __('How would you describe your experience using Sign Customiser?', 'all-signs-options-pro') }}</div>
            <div class="asowp-flex asowp-gap-2">
              <button class="asowp-cursor-pointer asowp-flex asowp-rounded-md asowp-border asowp-border-[#e5e7eb] asowp-px-3 asowp-py-1.5 hover:asowp-bg-[#f8fafc]">
                <a href="https://signsdesigner.us/all-signs-customizer-product/#section-review" target="_blank" rel="noopener" class="asowp-no-underline asowp-flex asowp-text-[#484848] hover:asowp-text-[#484848] asowp-gap-2 focus:asowp-border-none">
                  <div class="asowp-flex asowp-gap-1">
                      <svg viewBox="0 0 20 20" class="Polaris-Icon__Svg asowp-w-5 asowp-h-5" focusable="false" aria-hidden="true"><path fill-rule="evenodd" d="M12.539 14.57a9.25 9.25 0 0 1-4.074-.838l-.307-.141a3.751 3.751 0 0 0-1.158-.32v-5.222a1.5 1.5 0 0 0 .15-.099 6.489 6.489 0 0 0 2.475-3.95 1.41 1.41 0 0 1 1.378 1.557l-.133 1.26a1.75 1.75 0 0 0 1.74 1.933h1.595c.758 0 1.342.67 1.239 1.42l-.338 2.449a2.25 2.25 0 0 1-2.176 1.942l-.391.01Zm-7.039-6.32h-1v5h1v-5Zm2.34 6.845a10.75 10.75 0 0 0 4.735.975l.391-.01a3.75 3.75 0 0 0 3.626-3.236l.337-2.448a2.75 2.75 0 0 0-2.724-3.126h-1.594a.25.25 0 0 1-.249-.276l.133-1.26a2.91 2.91 0 0 0-2.894-3.214h-.364c-.5 0-.928.357-1.017.849l-.055.303a4.989 4.989 0 0 1-1.915 3.098h-2c-.69 0-1.25.56-1.25 1.25v5.5c0 .69.56 1.25 1.25 1.25h2.345c.324 0 .644.07.938.205l.307.14Z"></path></svg>
                      {{ __('Yes', 'all-signs-options-pro') }}
                  </div> 
                </a>
              </button>
              <button class="asowp-cursor-pointer asowp-flex asowp-rounded-md asowp-border asowp-border-[#e5e7eb] asowp-px-3 asowp-py-1.5 hover:asowp-bg-[#f8fafc]">
                <a href="https://signsdesigner.us/contact" target="_blank" rel="noopener" class="asowp-no-underline asowp-flex asowp-text-[#484848] hover:asowp-text-[#484848] asowp-gap-2 focus:asowp-border-none">
                  <div class="asowp-flex asowp-gap-1">
                    <svg viewBox="0 0 20 20" class="Polaris-Icon__Svg asowp-w-5 asowp-h-5" focusable="false" aria-hidden="true"><path fill-rule="evenodd" d="M12.16 4.904a10.75 10.75 0 0 0-4.735-.974l-.391.01a3.75 3.75 0 0 0-3.626 3.236l-.337 2.448a2.75 2.75 0 0 0 2.724 3.126h1.594a.25.25 0 0 1 .249.276l-.133 1.26a2.91 2.91 0 0 0 2.894 3.214h.364c.5 0 .928-.358 1.017-.85l.055-.302a4.989 4.989 0 0 1 1.915-3.098h2c.69 0 1.25-.56 1.25-1.25v-5.5c0-.69-.56-1.25-1.25-1.25h-2.345a2.25 2.25 0 0 1-.938-.205l-.307-.14Zm-4.699.525a9.25 9.25 0 0 1 4.074.839l.307.14a3.75 3.75 0 0 0 1.158.32v5.223c-.052.03-.102.062-.15.098a6.49 6.49 0 0 0-2.475 3.95 1.41 1.41 0 0 1-1.378-1.557l.133-1.26a1.75 1.75 0 0 0-1.74-1.932h-1.595a1.25 1.25 0 0 1-1.238-1.421l.337-2.448a2.25 2.25 0 0 1 2.176-1.942l.391-.01Zm7.039 6.32h1v-5h-1v5Z"></path></svg>
                    {{ __('No', 'all-signs-options-pro') }}
                  </div>
                </a>
              </button>
            </div>
          </div>
        </div>

        <div class="asowp-rounded-xl asowp-border asowp-border-[#e5e7eb] asowp-bg-white asowp-p-3">
          <div class="asowp-px-5 asowp-py-3 asowp-border-b asowp-border-[#e5e7eb] asowp-text-[.8125em] asowp-font-semibold">
              {{ __('Useful Links', 'all-signs-options-pro') }}
          </div>
          <div class="asowp-flex asowp-flex-wrap asowp-items-center asowp-gap-3 asowp-text-[13px]">
              <button class="asowp-cursor-pointer asowp-flex asowp-w-[39%] asowp-rounded-md asowp-border asowp-border-[#e5e7eb] asowp-px-2 asowp-py-1.5 asowp-bg-[#fff] hover:asowp-bg-[#fafafa]">
                  <a href="https://demos.signsdesigner.us/aso-live-demo/" target="_blank" rel="noopener" class="asowp-no-underline asowp-flex asowp-text-[#484848] hover:asowp-text-[#484848] asowp-gap-2 focus:asowp-border-none">
                      <span class="asowp-text-[.8125em]">{{ __('Browse Demos', 'all-signs-options-pro') }}</span>
                  </a>
              </button>
              <button class="asowp-cursor-pointer asowp-flex asowp-rounded-md asowp-border asowp-border-[#e5e7eb] asowp-px-2 asowp-py-1.5 asowp-bg-[#fff] hover:asowp-bg-[#fafafa]">
                  <a href="https://docs.signsdesigner.us/docs/aso-wp-documentation/" target="_blank" rel="noopener" class="asowp-no-underline asowp-flex asowp-text-[#484848] hover:asowp-text-[#484848] asowp-gap-2 focus:asowp-border-none">
                      <span class="asowp-text-[.8125em]">{{ __('Learning Center', 'all-signs-options-pro') }}</span>
                  </a>
              </button>
              <button class="asowp-cursor-pointer asowp-flex asowp-rounded-md asowp-border asowp-border-[#e5e7eb] asowp-px-2 asowp-py-1.5 asowp-bg-[#fff] hover:asowp-bg-[#fafafa]">
                  <a href="https://signsdesigner.us/pricing-all-signs-customizer/" target="_blank" rel="noopener" class="asowp-no-underline asowp-flex asowp-text-[#484848] hover:asowp-text-[#484848] asowp-gap-2 focus:asowp-border-none">
                      <span class="asowp-text-[.8125em]">{{ __('Pricing', 'all-signs-options-pro') }}</span>
                  </a>
              </button>
              <button class="asowp-cursor-pointer asowp-flex asowp-rounded-md asowp-border asowp-border-[#e5e7eb] asowp-px-2 asowp-py-1.5 asowp-bg-[#fff] hover:asowp-bg-[#fafafa]">
                  <a href="https://signsdesigner.us/contact" target="_blank" rel="noopener" class="asowp-no-underline asowp-flex asowp-text-[#484848] hover:asowp-text-[#484848] asowp-gap-2 focus:asowp-border-none">
                      <span class="asowp-text-[.8125em]">{{ __('Get in touch', 'all-signs-options-pro') }}</span>
                  </a>
              </button>
          </div>
        </div>
      </div>
    </section>
  </div>

  <div v-if="showInstallConfigModal" class="asowp-fixed asowp-inset-0 asowp-z-[1000] asowp-flex asowp-items-center asowp-justify-center">
    <div class="asowp-absolute asowp-inset-0 asowp-bg-black asowp-bg-opacity-40" @click="closeInstallModals"></div>
    <div class="asowp-relative asowp-w-[min(820px,95vw)] asowp-max-h-[calc(100vh-5.75rem)] asowp-bg-white asowp-rounded-2xl asowp-shadow-xl asowp-overflow-hidden asowp-flex asowp-flex-col">
      <div class="asowp-flex asowp-items-center asowp-justify-between asowp-px-5 asowp-py-3 asowp-border-b asowp-border-[#e5e7eb]">
        <div class="asowp-text-[14px] asowp-font-semibold">{{ __('Install the configurator screen', 'all-signs-options-pro') }}</div>
        <button class="asowp-p-1 asowp-rounded-md hover:asowp-bg-[#f3f4f6] asowp-border-0 asowp-bg-transparent asowp-cursor-pointer" @click="closeInstallModals">✕</button>
      </div>
      <div class="asowp-flex-1 asowp-min-h-0 asowp-p-5 asowp-space-y-4 asowp-overflow-y-auto">
        <div class="asowp-text-[13px] asowp-text-gray-700">{{ __('You can display the configurator in 2 ways, and list configurable products with a shortcode:', 'all-signs-options-pro') }}</div>
          <div class="asowp-rounded-xl asowp-border asowp-border-[#e5e7eb] asowp-bg-[#fafafa] asowp-p-4">
            <div class="asowp-text-[13px] asowp-font-semibold asowp-text-[#303030]">{{ __('Option 1 — Buttons on product pages', 'all-signs-options-pro') }}</div>
            <div class="asowp-mt-2 asowp-text-[13px] asowp-text-gray-700 asowp-space-y-1">
              <span>{{ __('1) If the product is not attached to a configuration yet, attach it first.', 'all-signs-options-pro') }}</span>
              <span>{{ __('2) On the storefront, customers will see the customization buttons on that product page.', 'all-signs-options-pro') }}</span>
            </div>
            <div class="asowp-mt-2 asowp-rounded-lg asowp-bg-white asowp-border asowp-border-[#e5e7eb] asowp-p-3 asowp-flex asowp-items-start justify-between">
              <code class="asowp-text-[12px]">{{ '<!-- Buttons will appear on product pages or storefront -->' }}</code>        
            </div>
            <div class="asowp-mt-2 asowp-text-[12px] asowp-text-gray-600">
               {{ __('No code is needed for this option. Just attach configurations to products.', 'all-signs-options-pro') }}
            </div>

            <div>
              <span class="asowp-text-[13px] asowp-font-semibold asowp-text-[#303030]">{{ __('Note: ', 'all-signs-options-pro') }}</span>
              <span class="asowp-text-[12px] asowp-text-gray-600">
                {{ __('If a user attempts to access the page defined as the configuration page, the system will attempt to find a configurable product and display the configurator; otherwise, an error message will be displayed.', 'all-signs-options-pro') }}
              </span>
            </div>
          </div>
          <div class="asowp-rounded-xl asowp-border asowp-border-[#e5e7eb] asowp-bg-[#fafafa] asowp-p-4">
            <div class="asowp-text-[13px] asowp-font-semibold asowp-text-[#303030]">{{ __('Option 2 — Shortcode', 'all-signs-options-pro') }}</div>
            <div class="asowp-mt-2 asowp-text-[13px] asowp-text-gray-700">{{ __('Add the shortcode inside any WordPress page:', 'all-signs-options-pro') }}</div>
            <div class="asowp-mt-2 asowp-rounded-lg asowp-bg-white asowp-border asowp-border-[#e5e7eb] asowp-p-3 asowp-flex asowp-items-start justify-between">
              <code class="asowp-text-[12px]">[asowp-configurator productid="123"]</code>
              <button class="asowp-px-2 asowp-py-1" @click="copySnippet('[asowp-configurator productid=&quot;123&quot;]', 'cfg-basic')">
                {{ copiedKey === 'cfg-basic' ? __('Copied', 'all-signs-options-pro') : __('Copy', 'all-signs-options-pro') }}
              </button>
            </div>
            <div class="asowp-mt-2 asowp-text-[12px] asowp-text-gray-600">
               {{ sprintf(__('Replace %s with your WooCommerce product ID.', 'all-signs-options-pro'), '123') }}
            </div>
          </div>
          <div class="asowp-rounded-xl asowp-border asowp-border-[#e5e7eb] asowp-bg-[#fafafa] asowp-p-4">
            <div class="asowp-text-[13px] asowp-font-semibold asowp-text-[#303030]">{{ __('Option 3 — Configurable products list', 'all-signs-options-pro') }}</div>
            <div class="asowp-mt-2 asowp-text-[13px] asowp-text-gray-700">
              {{ __('Use this shortcode to show a grid of all configurable products with image, name, description, and the Customize / Templates buttons.', 'all-signs-options-pro') }}
            </div>
            <div class="asowp-mt-2 asowp-rounded-lg asowp-bg-white asowp-border asowp-border-[#e5e7eb] asowp-p-3 asowp-flex asowp-items-start justify-between">
              <code class="asowp-text-[12px]">[asowp-products cols="3"]</code>
              <button class="asowp-px-2 asowp-py-1" @click="copySnippet('[asowp-products cols=&quot;3&quot;]', 'products-list')">
                {{ copiedKey === 'products-list' ? __('Copied', 'all-signs-options-pro') : __('Copy', 'all-signs-options-pro') }}
              </button>
            </div>
            <div class="asowp-mt-2 asowp-text-[12px] asowp-text-gray-600">
              {{ __('Tip: change the number of columns (1–6) or pass specific product IDs when needed.', 'all-signs-options-pro') }}
            </div>
            <div class="asowp-mt-2 asowp-text-[12px] asowp-text-gray-600 asowp-space-y-1">
              <div><code class="asowp-text-[12px]">[asowp-products cols="2" limit="6"]</code></div>
              <div><code class="asowp-text-[12px]">[asowp-products ids="12,45,78" cols="3"]</code></div>
            </div>
          </div>
      </div>
      <div class="asowp-flex asowp-justify-end asowp-px-5 asowp-py-3 asowp-border-t">
        <button class="asowp-px-4 asowp-py-1.5 asowp-text-white asowp-bg-[#016464] asowp-rounded-md" @click="closeInstallModals">{{ __('Got it', 'all-signs-options-pro') }}</button>
      </div>
    </div>
  </div>
  <div v-if="showInstallTemplatesModal" class="asowp-fixed asowp-inset-0 asowp-z-[1000] asowp-flex asowp-items-center asowp-justify-center">
    <div class="asowp-absolute asowp-inset-0 asowp-bg-black asowp-bg-opacity-40" @click="closeInstallModals"></div>
    <div class="asowp-relative asowp-w-[min(820px,95vw)] asowp-max-h-[calc(100vh-5.75rem)] asowp-bg-white asowp-rounded-2xl asowp-shadow-xl asowp-overflow-hidden asowp-flex asowp-flex-col">
      <div class="asowp-flex asowp-items-center asowp-justify-between asowp-px-5 asowp-py-3 asowp-border-b asowp-border-[#e5e7eb]">
        <div class="asowp-text-[14px] asowp-font-semibold">{{ __('Install the templates screen', 'all-signs-options-pro') }}</div>
        <button class="asowp-p-1 asowp-rounded-md hover:asowp-bg-[#f3f4f6] asowp-border-0 asowp-bg-transparent asowp-cursor-pointer" @click="closeInstallModals">✕</button>
      </div>
      <div class="asowp-flex-1 asowp-min-h-0 asowp-p-5 asowp-space-y-4 asowp-overflow-y-auto">
        <div class="asowp-text-[13px] asowp-text-gray-700">{{ __('You can display templates in 2 ways:', 'all-signs-options-pro') }}</div>
        <div class="asowp-rounded-xl asowp-border asowp-border-[#e5e7eb] asowp-bg-[#fafafa] asowp-p-4">
          <div class="asowp-text-[13px] asowp-font-semibold asowp-text-[#303030]">{{ __('Option 1 — Templates button on product pages', 'all-signs-options-pro') }}</div>
          <div class="asowp-mt-2 asowp-text-[13px] asowp-text-gray-700 asowp-space-y-1">
            <span>{{ __('1) Attach the product to a configuration.', 'all-signs-options-pro') }}</span>
            <span>{{ __('2) Add templates to that configuration and enable them for the frontend.', 'all-signs-options-pro') }}</span>
            <span>{{ __('3) The Templates button will appear on the product page or shop page.', 'all-signs-options-pro') }}</span>
          </div>
          <div class="asowp-mt-2 asowp-text-[12px] asowp-text-gray-600">
            {{ __('No code is needed for this option. Just attach configurations and templates.', 'all-signs-options-pro') }}
          </div>
        </div>
        <div class="asowp-rounded-xl asowp-border asowp-border-[#e5e7eb] asowp-bg-[#fafafa] asowp-p-4">
          <div class="asowp-text-[13px] asowp-font-semibold asowp-text-[#303030]">{{ __('Option 2 — Shortcode', 'all-signs-options-pro') }}</div>
          <div class="asowp-mt-2 asowp-text-[13px] asowp-text-gray-700">{{ __('Add the shortcode inside any WordPress page:', 'all-signs-options-pro') }}</div>
          <div class="asowp-mt-2 asowp-rounded-lg asowp-bg-white asowp-border asowp-border-[#e5e7eb] asowp-p-3 asowp-flex asowp-items-start justify-between">
            <code class="asowp-text-[12px]">[asowp-templates productid="123"]</code>
            <button class="asowp-px-2 asowp-py-1" @click="copySnippet('[asowp-templates productid=&quot;123&quot;]', 'tpl-basic')">
              {{ copiedKey === 'tpl-basic' ? __('Copied', 'all-signs-options-pro') : __('Copy', 'all-signs-options-pro') }}
            </button>
          </div>
          <div class="asowp-mt-2 asowp-text-[12px] asowp-text-gray-600">
            {{ sprintf(__('Replace %s with your WooCommerce product ID. Only templates attached to the product configuration will be shown.', 'all-signs-options-pro'), '123') }}
          </div>
          <div class="asowp-mt-2 asowp-text-[12px] asowp-text-gray-600">
            <code class="asowp-text-[12px]">[asowp-templates productid="123" cols="4"]</code>
          </div>
        </div>
      </div>
      <div class="asowp-flex asowp-justify-end asowp-px-5 asowp-py-3 asowp-border-t">
        <button class="asowp-px-4 asowp-py-1.5 asowp-text-white asowp-bg-[#016464] asowp-rounded-md" @click="closeInstallModals">{{ __('Got it', 'all-signs-options-pro') }}</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { RouterLink, useRouter } from 'vue-router';
import { h, onMounted, ref } from 'vue'
import api from '@/admin/Api/api'
import { __, sprintf } from "@wordpress/i18n";

/** KPI values */
const kpis = ref([
  { key: 'orders', label: __('Configured Orders', 'all-signs-options-pro'), value: 0 },
  { key: 'rate', label: __('Rate vs all orders', 'all-signs-options-pro'), value: '0%' },
  { key: 'revenue', label: __('Configured Revenue', 'all-signs-options-pro'), value: (asowp_data.currencySymbol || '') + '0' },
])

const kpisLoading = ref(false)
const recentConfigs = ref([])
const showInstallConfigModal = ref(false)
const showInstallTemplatesModal = ref(false)
const copiedKey = ref(null)
const router = useRouter();
const goToMaterial = (config) => {
    router.push({ name: 'materials', params: { configId: config.id, config: config.name.replace(/ /g, '-') } });
};
const openInstallConfigModal = () => { showInstallConfigModal.value = true }
const openInstallTemplatesModal = () => { showInstallTemplatesModal.value = true }
const closeInstallModals = () => {
  showInstallConfigModal.value = false
  showInstallTemplatesModal.value = false
}

const copySnippet = async (text, key) => {
  try {
    const plain = String(text).replace(/&quot;/g, '"');
    if (navigator?.clipboard?.writeText) {
      await navigator.clipboard.writeText(plain)
    } else {
      const el = document.createElement('textarea')
      el.value = plain
      el.setAttribute('readonly', '')
      el.style.position = 'absolute'
      el.style.left = '-9999px'
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
    }
  } catch (_) {}
}

const formatMoney = (amount, symbol) => {
  const num = Number(amount || 0)
  return `${symbol}${num.toLocaleString(undefined, { minimumFractionDigits: 2 })}`
}

onMounted(async () => {
  try {
    kpisLoading.value = true
    const stats = await api.getHomeStats()
    const symbol = stats?.currency_symbol || asowp_data.currencySymbol || ''
    kpis.value = [
      { key: 'items', label: __('Configured Products', 'all-signs-options-pro'), value: stats?.configured_items ?? 0 },
      { key: 'rate', label: __('Revenue share vs orders', 'all-signs-options-pro'), value: `${stats?.configured_rate ?? 0}%` },
      { key: 'revenue', label: __('Configured Revenue', 'all-signs-options-pro'), value: formatMoney(stats?.configured_revenue, symbol) },
    ]
  } finally {
    kpisLoading.value = false
  }

  try {
    const res = await api.getConfigs('?per_page=4&order=DESC&page=1')
    recentConfigs.value = Array.isArray(res?.data) ? res.data.slice(0, 4) : []
  } catch(_) {}
})

const mainMenu = [
  {
    to: '/configurations',
    title: __('Configurations', 'all-signs-options-pro'),
    desc: __('Manage your sign configurations', 'all-signs-options-pro'),
    icon: { render() { return h('svg', { class: 'asowp-w-5 asowp-h-5', viewBox: '0 0 20 20', fill: '#b2b2b2' }, [ h('path', { d: 'M3.5 6.25a2.75 2.75 0 0 1 2.75-2.75h7.5a2.75 2.75 0 0 1 2.75 2.75v7.5a2.75 2.75 0 0 1-2.75 2.75h-7.5a2.75 2.75 0 0 1-2.75-2.75v-7.5Zm2.75-1.25a1.25 1.25 0 0 0-1.25 1.25v7.5c0 .69.56 1.25 1.25 1.25h7.5c.69 0 1.25-.56 1.25-1.25v-7.5c0-.69-.56-1.25-1.25-1.25h-7.5Z' }) ]) } }
  },
  {
    to: '/templates',
    title: __('Templates', 'all-signs-options-pro'),
    desc: __('Manage your sign templates', 'all-signs-options-pro'),
    icon: { render() { return h('svg', { class: 'asowp-w-5 asowp-h-5', viewBox: '0 0 20 20', fill: '#b2b2b2' }, [ h('path', { d: 'M13.257 3h-6.514a1.25 1.25 0 0 0-.983.478l-2.386 3.037a1.75 1.75 0 0 0-.374 1.08v.655a2.75 2.75 0 0 0 1.5 2.45v4.55c0 .966.784 1.75 1.75 1.75h7.5a1.75 1.75 0 0 0 1.75-1.75v-4.55a2.75 2.75 0 0 0 1.5-2.45v-.481c0-.504-.17-.994-.48-1.39l-2.28-2.901a1.25 1.25 0 0 0-.983-.478Zm-.257 12.5h.75a.25.25 0 0 0 .25-.25v-4.25a2.742 2.742 0 0 1-2-.863 2.742 2.742 0 0 1-2 .863 2.742 2.742 0 0 1-2-.863 2.742 2.742 0 0 1-2 .863v4.25c0 .138.112.25.25.25h3.75v-2.5a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v2.5Zm-7-6h-.25c-.69 0-1.25-.56-1.25-1.25v-.654a.25.25 0 0 1 .053-.155l2.312-2.941h6.27l2.205 2.805a.75.75 0 0 1 .16.464v.481c0 .69-.56 1.25-1.25 1.25h-.25c-.69 0-1.25-.56-1.25-1.25v-.5a.75.75 0 0 0-1.5 0v.5a1.25 1.25 0 1 1-2.5 0v-.5a.75.75 0 0 0-1.5 0v.5c0 .69-.56 1.25-1.25 1.25Z' }) ]) } }
  },
  {
    to: '/global-settings/output',
    title: __('Global Settings', 'all-signs-options-pro'),
    desc: __('Manage your sign global setting', 'all-signs-options-pro'),
    icon: { render() { return h('svg', { class: 'asowp-w-5 asowp-h-5', viewBox: '0 0 20 20', fill: '#b2b2b2' }, [ h('path', { d: 'M11.602 3.125a1.5 1.5 0 0 0-3.204 0l-.136.637a5.558 5.558 0 0 0-.936.388l-.54-.374a1.5 1.5 0 0 0-2.062.333l-1.25 1.812a1.5 1.5 0 0 0 .278 2.072l.504.417c-.035.195-.056.394-.056.59v.001c0 .195.021.394.056.59l-.504.417a1.5 1.5 0 0 0-.278 2.072l1.25 1.812a1.5 1.5 0 0 0 2.062.333l.54-.374c.284.156.595.287.936.388l.136.637a1.5 1.5 0 0 0 3.204 0l.136-.637c.34-.1.652-.232.936-.388l.54.374a1.5 1.5 0 0 0 2.062-.333l1.25-1.812a1.5 1.5 0 0 0-.278-2.072l-.504-.417c.035-.195.056-.395.056-.59s-.021-.395-.056-.59l.504-.417a1.5 1.5 0 0 0 .278-2.072l-1.25-1.812a1.5 1.5 0 0 0-2.062-.333l-.54.374a5.558 5.558 0 0 0-.936-.388l-.136-.637Zm-1.602.875a.5.5 0 1 1 0 1 3.5 3.5 0 1 0 0 7 .5.5 0 1 1 0 1 4.5 4.5 0 1 1 0-9Z' }) ]) } }
  },
  {
    to: '/manage-fonts',
    title: __('Library', 'all-signs-options-pro'),
    desc: __('Manage your sign library', 'all-signs-options-pro'),
    icon: { render() { return h('svg', { class: 'asowp-w-5 asowp-h-5', viewBox: '0 0 20 20', fill: '#b2b2b2' }, [ h('path', { d: 'M14 6c0-.55-.45-1-1-1H7c-.55 0-1 .45-1 1v8c0 .55.45 1 1 1h6c.55 0 1-.45 1-1V6Zm-1.5 7.5h-5v-7h5v7ZM4 4.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 .5.5v11a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11Z' }) ]) } }
  }
]
</script>
