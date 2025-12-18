<template>
  <div class="asowp-p-4 asowp-space-y-3">

    <!-- Top action + Create configuration -->
    <div class="asowp-flex asowp-justify-end">
      <RouterLink
        to="/configurations"
        class="asowp-inline-flex asowp-items-center asowp-gap-2 asowp-rounded-md asowp-bg-[#016464] hover:asowp-text-white asowp-no-underline asowp-text-white asowp-text-sm asowp-font-medium asowp-px-4 asowp-py-2">
        Create configuration
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
          
          Click <a href="#" @click.prevent="openInstallConfigModal"> here to install configuration screen </a>&nbsp; in your online store
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
          Click <a href="#" @click.prevent="openInstallTemplatesModal"> here to add template screen </a> &nbsp; to your online store
        </button>
      </div>
    </div>
    <!-- Main + Side -->
    <section class="asowp-grid lg:asowp-grid-cols-[1fr_360px] asowp-space-x-1">
        <div class="asowp-space-y-3">
            <!-- KPI cards row -->
            <div class="asowp-flex asowp-rounded-xl asowp-border asowp-border-[#e5e7eb] asowp-border-solid asowp-bg-white asowp-p-2">
                <div v-for="c in kpis" :key="c.key"
                    class="asowp-p-5 asowp-space-y-2">
                    <div class="asowp-text-[28px] asowp-font-bold">{{ c.value }}</div>
                    <div class="asowp-text-[12px] asowp-text-gray-500">{{ c.label }}</div>
                </div>
            </div>
            <!-- MAIN MENU -->
            <div class="asowp-rounded-xl asowp-border asowp-border-[#e5e7eb] asowp-overflow-hidden">
                <div class="asowp-bg-[#d1e2e2]">
                    <div class="asowp-px-5 asowp-py-3 asowp-flex asowp-items-center asowp-gap-2">
                        <svg viewBox="0 0 20 20" class="Polaris-Icon__Svg asowp-w-4 asowp-h-4" focusable="false" aria-hidden="true">
                            <path fill-rule="evenodd" d="M13.257 3h-6.514a1.25 1.25 0 0 0-.983.478l-2.386 3.037a1.75 1.75 0 0 0-.374 1.08v.655a2.75 2.75 0 0 0 1.5 2.45v4.55c0 .966.784 1.75 1.75 1.75h7.5a1.75 1.75 0 0 0 1.75-1.75v-4.55a2.75 2.75 0 0 0 1.5-2.45v-.481c0-.504-.17-.994-.48-1.39l-2.28-2.901a1.25 1.25 0 0 0-.983-.478Zm-.257 12.5h.75a.25.25 0 0 0 .25-.25v-4.25a2.742 2.742 0 0 1-2-.863 2.742 2.742 0 0 1-2 .863 2.742 2.742 0 0 1-2-.863 2.742 2.742 0 0 1-2 .863v4.25c0 .138.112.25.25.25h3.75v-2.5a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v2.5Zm-7-6h-.25c-.69 0-1.25-.56-1.25-1.25v-.654a.25.25 0 0 1 .053-.155l2.312-2.941h6.27l2.205 2.805a.75.75 0 0 1 .16.464v.481c0 .69-.56 1.25-1.25 1.25h-.25c-.69 0-1.25-.56-1.25-1.25v-.5a.75.75 0 0 0-1.5 0v.5a1.25 1.25 0 1 1-2.5 0v-.5a.75.75 0 0 0-1.5 0v.5c0 .69-.56 1.25-1.25 1.25Z"></path>
                        </svg>
                        <span class="asowp-text-[14px] asowp-font-semibold">Main Menu</span>
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
            <!-- Learning center -->
            <div class="asowp-rounded-xl asowp-border asowp-border-solid asowp-border-[#e5e7eb] asowp-bg-white">
              <!-- Header -->
              <div class="asowp-flex asowp-items-center asowp-gap-2 asowp-px-5 asowp-py-5 asowp-border-b asowp-border-[#e5e7eb]">
                <svg viewBox="0 0 20 20" class="Polaris-Icon__Svg asowp-w-4 asowp-h-4" focusable="false" aria-hidden="true">
                  <path d="M11.75 3.5a.75.75 0 0 0 0 1.5h2.19l-4.97 4.97a.75.75 0 1 0 1.06 1.06l4.97-4.97v2.19a.75.75 0 0 0 1.5 0v-4a.75.75 0 0 0-.75-.75h-4Z"></path><path d="M15 10.967a.75.75 0 0 0-1.5 0v2.783c0 .69-.56 1.25-1.25 1.25h-6c-.69 0-1.25-.56-1.25-1.25v-6c0-.69.56-1.25 1.25-1.25h2.783a.75.75 0 0 0 0-1.5h-2.783a2.75 2.75 0 0 0-2.75 2.75v6a2.75 2.75 0 0 0 2.75 2.75h6a2.75 2.75 0 0 0 2.75-2.75v-2.783Z"></path>
                </svg>
                <div class="asowp-text-[14px] asowp-font-semibold">Learning center</div>
              </div>

              <!-- Body -->
              <div class="asowp-pl-5 asowp-pr-5 asowp-pb-5 asowp-flex asowp-flex-col md:asowp-flex-row asowp-gap-4">
                <!-- Card: Browse demo -->
                <div class="asowp-flex-1 asowp-rounded-lg asowp-border asowp-border-solid asowp-border-[#e5e7eb] asowp-p-4">
                  <div class="asowp-text-[12px] asowp-font-semibold asowp-text-gray-700">Browse demo</div>
                  <p class="asowp-text-[13px] asowp-text-gray-600 asowp-mt-1">
                    Explore live examples of sign lastconfigs in action.
                  </p>

                  <div class="asowp-mt-2 asowp-flex asowp-items-center asowp-gap-3">
                    <button class="asowp-cursor-pointer asowp-flex asowp-rounded-md asowp-border asowp-border-[#e5e7eb] asowp-px-2 asowp-py-1.5 asowp-bg-[#fff] hover:asowp-bg-[#fafafa]">
                      <a
                        href="https://demos.signsdesigner.us/aso-live-demo/"
                        target="_blank" rel="noopener"
                        class="asowp-no-underline asowp-flex asowp-text-[#484848] hover:asowp-text-[#484848] asowp-gap-2 focus:asowp-border-none"
                      >
                        View demos
                      </a>
                    </button>
                  </div>
                </div>

                <!-- Card: Documentation -->
                <div class="asowp-flex-1 asowp-rounded-lg asowp-border asowp-border-solid asowp-border-[#e5e7eb] asowp-p-4">
                  <div class="asowp-text-[12px] asowp-font-semibold asowp-text-gray-700">Documentation</div>
                  <p class="asowp-text-[13px] asowp-text-gray-600 asowp-mt-1">
                    Explore the app documentation
                  </p>

                  <div class="asowp-mt-2">
                    <button class="asowp-cursor-pointer asowp-flex asowp-rounded-md asowp-border asowp-border-[#e5e7eb] asowp-px-2 asowp-py-1.5 asowp-bg-[#fff] hover:asowp-bg-[#fafafa]">
                      <a
                        href="https://docs.signsdesigner.us/docs/aso-wp-documentation/"
                        target="_blank" rel="noopener"
                        class="asowp-no-underline asowp-flex asowp-text-[#484848] hover:asowp-text-[#484848] asowp-gap-2 focus:asowp-border-none"
                      >
                        View docs
                      </a>
                    </button>
                    
                  </div>
                </div>
              </div>
            </div>

        </div>
        

      <!-- SIDEBAR -->
      <div class="asowp-space-y-4">
        <!-- Recent configs -->
        <div class="asowp-rounded-xl asowp-border asowp-border-[#e5e7eb] asowp-bg-white">
          <div class="asowp-px-5 asowp-py-2 asowp-border-b asowp-border-[#e5e7eb] asowp-text-[.8125em] asowp-font-semibold">
            Recent Configurations
          </div>
          <div class="asowp-pl-5 asowp-pr-5 asowp-pb-3  asowp-text-[1em] asowp-text-gray-600" v-if="recentConfigs.length === 0">
            No recent configurations yet.
          </div>
          <ul v-else class="asowp-px-5 asowp-py-3 asowp-m-0">
            <li v-for="rc in recentConfigs" :key="rc.id" class="asowp-flex asowp-justify-between asowp-items-center asowp-w-full">
              <RouterLink :to="`/configurations/${rc.id}/materials`" class="asowp-text-black asowp-no-underline hover:asowp-text-black asowp-text-[12px] asowp-w-full">
                <div>ID {{ rc.id }}</div>
                <div class="asowp-flex asowp-justify-between asowp-items-center">
                  <div class="asowp-truncate asowp-font-bold">{{ rc.name }}</div>
                  <div class="asowp-text-gray-500 asowp-bg-[#d5ebff] asowp-text-[11px] asowp-py-1 asowp-px-3 asowp-rounded-full">{{ rc.materialType }}</div>
                </div>
              </RouterLink>
            </li>
          </ul>
        </div>

        <!-- Feedback -->
        <div class="asowp-rounded-xl asowp-border asowp-border-[#e5e7eb] asowp-bg-white">
          <div class="asowp-px-5 asowp-py-2 asowp-border-b asowp-border-[#e5e7eb] asowp-text-[.8125em] asowp-font-semibold">
            Share your feedback
          </div>
          <div class="asowp-pl-5 asowp-pr-5 asowp-pb-3 asowp-space-y-3 asowp-text-[13px]">
            <div class="asowp-text-[1em]">How would you describe your experience using Sign Customiser?</div>
            <div class="asowp-flex asowp-gap-2">
              <button class="asowp-cursor-pointer asowp-flex asowp-rounded-md asowp-border asowp-border-[#e5e7eb] asowp-px-3 asowp-py-1.5 hover:asowp-bg-[#f8fafc]">
                <div>
                    <svg viewBox="0 0 20 20" class="Polaris-Icon__Svg asowp-w-5 asowp-h-5" focusable="false" aria-hidden="true"><path fill-rule="evenodd" d="M12.539 14.57a9.25 9.25 0 0 1-4.074-.838l-.307-.141a3.751 3.751 0 0 0-1.158-.32v-5.222a1.5 1.5 0 0 0 .15-.099 6.489 6.489 0 0 0 2.475-3.95 1.41 1.41 0 0 1 1.378 1.557l-.133 1.26a1.75 1.75 0 0 0 1.74 1.933h1.595c.758 0 1.342.67 1.239 1.42l-.338 2.449a2.25 2.25 0 0 1-2.176 1.942l-.391.01Zm-7.039-6.32h-1v5h1v-5Zm2.34 6.845a10.75 10.75 0 0 0 4.735.975l.391-.01a3.75 3.75 0 0 0 3.626-3.236l.337-2.448a2.75 2.75 0 0 0-2.724-3.126h-1.594a.25.25 0 0 1-.249-.276l.133-1.26a2.91 2.91 0 0 0-2.894-3.214h-.364c-.5 0-.928.357-1.017.849l-.055.303a4.989 4.989 0 0 1-1.915 3.098h-2c-.69 0-1.25.56-1.25 1.25v5.5c0 .69.56 1.25 1.25 1.25h2.345c.324 0 .644.07.938.205l.307.14Z"></path></svg>
                </div> 
                <div>Yes</div> 
              </button>
              <button class="asowp-cursor-pointer asowp-flex asowp-rounded-md asowp-border asowp-border-[#e5e7eb] asowp-px-3 asowp-py-1.5 hover:asowp-bg-[#f8fafc]">
                <svg viewBox="0 0 20 20" class="Polaris-Icon__Svg asowp-w-5 asowp-h-5" focusable="false" aria-hidden="true"><path fill-rule="evenodd" d="M12.16 4.904a10.75 10.75 0 0 0-4.735-.974l-.391.01a3.75 3.75 0 0 0-3.626 3.236l-.337 2.448a2.75 2.75 0 0 0 2.724 3.126h1.594a.25.25 0 0 1 .249.276l-.133 1.26a2.91 2.91 0 0 0 2.894 3.214h.364c.5 0 .928-.358 1.017-.85l.055-.302a4.989 4.989 0 0 1 1.915-3.098h2c.69 0 1.25-.56 1.25-1.25v-5.5c0-.69-.56-1.25-1.25-1.25h-2.345a2.25 2.25 0 0 1-.938-.205l-.307-.14Zm-4.699.525a9.25 9.25 0 0 1 4.074.839l.307.14a3.75 3.75 0 0 0 1.158.32v5.223c-.052.03-.102.062-.15.098a6.49 6.49 0 0 0-2.475 3.95 1.41 1.41 0 0 1-1.378-1.557l.133-1.26a1.75 1.75 0 0 0-1.74-1.932h-1.595a1.25 1.25 0 0 1-1.238-1.421l.337-2.448a2.25 2.25 0 0 1 2.176-1.942l.391-.01Zm7.039 6.32h1v-5h-1v5Z"></path></svg>
                 No
              </button>
            </div>
          </div>
        </div>

        <!-- Useful links -->
        <div class="asowp-rounded-xl asowp-border asowp-border-[#e5e7eb] asowp-bg-white asowp-p-3">
          <!-- Header -->
          <div class="asowp-px-5 asowp-py-3 asowp-border-b asowp-border-[#e5e7eb] asowp-text-[.8125em] asowp-font-semibold">
              Useful Links
          </div>

          <!-- Body -->
          <div class="asowp-flex asowp-flex-wrap asowp-items-center asowp-gap-3  asowp-text-[13px]">

              <!-- Row 1: Browse demos + password -->
              <button class="asowp-cursor-pointer asowp-flex asowp-w-[39%] asowp-rounded-md asowp-border asowp-border-[#e5e7eb] asowp-px-2 asowp-py-1.5 asowp-bg-[#fff] hover:asowp-bg-[#fafafa]">
                  <a
                      href="https://signsdesigner.us/demos"
                      target="_blank" rel="noopener"
                      class="asowp-no-underline asowp-flex asowp-text-[#484848] hover:asowp-text-[#484848] asowp-gap-2 focus:asowp-border-none"
                  >
                      <svg viewBox="0 0 20 20" class="asowp-w-4 asowp-h-4" aria-hidden="true">
                      <path fill-rule="evenodd" d="M13 10a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm-1.5 0a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"></path>
                      <path fill-rule="evenodd" d="M10 4c-2.476 0-4.348 1.23-5.577 2.532a9.266 9.266 0 0 0-1.4 1.922 5.98 5.98 0 0 0-.37.818c-.082.227-.153.488-.153.728s.071.501.152.728c.088.246.213.524.371.818.317.587.784 1.27 1.4 1.922 1.229 1.302 3.1 2.532 5.577 2.532 2.476 0 4.348-1.23 5.577-2.532a9.265 9.265 0 0 0 1.4-1.922 5.98 5.98 0 0 0 .37-.818c.082-.227.153-.488.153-.728s-.071-.501-.152-.728a5.984 5.984 0 0 0-.371-.818 9.269 9.269 0 0 0-1.4-1.922c-1.229-1.302-3.1-2.532-5.577-2.532Zm-5.999 6.002v-.004c.004-.02.017-.09.064-.223a4.5 4.5 0 0 1 .278-.608 7.768 7.768 0 0 1 1.17-1.605c1.042-1.104 2.545-2.062 4.487-2.062 1.942 0 3.445.958 4.486 2.062a7.77 7.77 0 0 1 1.17 1.605c.13.24.221.447.279.608.047.132.06.203.064.223v.004c-.004.02-.017.09-.064.223a4.503 4.503 0 0 1-.278.608 7.768 7.768 0 0 1-1.17 1.605c-1.042 1.104-2.545 2.062-4.487 2.062-1.942 0-3.445-.958-4.486-2.062a7.766 7.766 0 0 1-1.17-1.605 4.5 4.5 0 0 1-.279-.608c-.047-.132-.06-.203-.064-.223Z"></path>
                      </svg>
                      <span class="asowp-text-[.8125em]">Browse Demos</span>
                  </a>
              </button>

              <!-- Row 2: Learning Center -->
              
              <button class="asowp-cursor-pointer asowp-flex asowp-rounded-md asowp-border asowp-border-[#e5e7eb] asowp-px-2 asowp-py-1.5 asowp-bg-[#fff] hover:asowp-bg-[#fafafa]">
                  <a
                      href="https://docs.signsdesigner.us/docs/aso-wp-documentation/"
                      target="_blank" rel="noopener"
                      class="asowp-no-underline asowp-flex asowp-text-[#484848] hover:asowp-text-[#484848] asowp-gap-2 focus:asowp-border-none"
                  >
                      <svg viewBox="0 0 20 20" class="asowp-w-4 asowp-h-4" aria-hidden="true">
                      <path fill-rule="evenodd" d="M6.75 4.5c-1.283 0-2.213 1.025-2.044 2.127.384 2.498 1.296 4.459 2.707 5.89 1.41 1.43 3.373 2.389 5.96 2.786 1.101.17 2.126-.76 2.126-2.044v-.727a.25.25 0 0 0-.187-.242l-1.9-.498a.25.25 0 0 0-.182.022l-1.067.576c-.69.373-1.638.492-2.422-.056a8.678 8.678 0 0 1-2.071-2.09c-.542-.787-.423-1.735-.045-2.428l.57-1.047a.252.252 0 0 0 .022-.182l-.498-1.9a.25.25 0 0 0-.242-.187h-.726Zm-3.526 2.355c-.334-2.174 1.497-3.856 3.527-3.855h.726a1.75 1.75 0 0 1 1.693 1.306l.498 1.9c.113.43.058.885-.153 1.276l-.001.002-.572 1.05c-.191.351-.169.668-.036.86a7.184 7.184 0 0 0 1.694 1.71c.187.13.498.156.85-.034l1.067-.576a1.75 1.75 0 0 1 1.276-.153l1.9.498a1.75 1.75 0 0 1 1.306 1.693v.727c0 2.03-1.68 3.86-3.854 3.527-2.838-.436-5.12-1.511-6.8-3.216-1.68-1.703-2.701-3.978-3.121-6.715Z"></path>
                      </svg>
                      <span class="asowp-text-[.8125em]">Learning Center</span>
                  </a>
              </button>

              <!-- Row 3: Pricing -->
              
              <button class="asowp-cursor-pointer asowp-flex asowp-rounded-md asowp-border asowp-border-[#e5e7eb] asowp-px-2 asowp-py-1.5 asowp-bg-[#fff] hover:asowp-bg-[#fafafa]">
                  <a
                      href="https://signsdesigner.us/pricing-all-signs-customizer/"
                      target="_blank" rel="noopener"
                      class="asowp-no-underline asowp-flex asowp-text-[#484848] hover:asowp-text-[#484848] asowp-gap-2 focus:asowp-border-none"
                  >
                      <svg viewBox="0 0 20 20" class="asowp-w-4 asowp-h-4" aria-hidden="true">
                      <path fill-rule="evenodd" d="M5.5 3.5a2 2 0 0 0-2 2v3.75c0 .414.336.75.75.75h2v5.769a.85.85 0 0 0 1.433.618l1.442-1.357 1.611 1.516a.75.75 0 0 0 1.028 0l1.611-1.516 1.442 1.357a.85.85 0 0 0 1.433-.618v-10.269a2 2 0 0 0-2-2h-8.494l.005.017a2.02 2.02 0 0 0-.261-.017Zm-.5 2a.5.5 0 0 1 1 0v3h-1v-3Zm2.75-.48-.006-.02h6.506a.5.5 0 0 1 .5.5v8.764l-.69-.649a1 1 0 0 0-1.37 0l-1.44 1.355-1.44-1.355a1 1 0 0 0-1.37 0l-.69.65v-9.245Zm2 1.48a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Zm-.75 3.75a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 0 1.5h-3a.75.75 0 0 1-.75-.75Z"></path>
                      </svg>
                      <span class="asowp-text-[.8125em]">Pricing</span>
                  </a>
              </button>

              <!-- Row 4: Get in touch -->            
              <button class="asowp-cursor-pointer asowp-flex asowp-rounded-md asowp-border asowp-border-[#e5e7eb] asowp-px-2 asowp-py-1.5 asowp-bg-[#fff] hover:asowp-bg-[#fafafa]">
                  <a
                      href="https://signsdesigner.us/contact"
                      target="_blank" rel="noopener"
                      class="asowp-no-underline asowp-flex asowp-text-[#484848] hover:asowp-text-[#484848] asowp-gap-2 focus:asowp-border-none"
                  >
                      <svg viewBox="0 0 20 20" class="asowp-w-4 asowp-h-4" aria-hidden="true">
                      <path fill-rule="evenodd" d="M5.75 4.5c-1.519 0-2.75 1.231-2.75 2.75v5.5c0 1.519 1.231 2.75 2.75 2.75h8.5c1.519 0 2.75-1.231 2.75-2.75v-5.5c0-1.519-1.231-2.75-2.75-2.75h-8.5Zm-1.25 2.75c0-.69.56-1.25 1.25-1.25h8.5c.69 0 1.25.56 1.25 1.25v5.5c0 .69-.56 1.25-1.25 1.25h-8.5c-.69 0-1.25-.56-1.25-1.25v-5.5Zm2.067.32c-.375-.175-.821-.013-.997.363-.175.375-.013.821.363.997l3.538 1.651c.335.156.723.156 1.058 0l3.538-1.651c.376-.176.538-.622.363-.997-.175-.376-.622-.538-.997-.363l-3.433 1.602-3.433-1.602Z"></path>
                      </svg>
                      <span class="asowp-text-[.8125em]">Get in touch</span>
                  </a>
              </button>

          </div>
        </div>

      </div>
    </section>

    

  </div>

  <!-- Modal: Install Configurator screen -->
  <div
    v-if="showInstallConfigModal"
    class="asowp-fixed asowp-inset-0 asowp-z-[1000] asowp-flex asowp-items-center asowp-justify-center"
  >
    <div
      class="asowp-absolute asowp-inset-0 asowp-bg-black asowp-bg-opacity-40"
      @click="closeInstallModals"
    ></div>
    <div
      class="asowp-relative asowp-w-[min(820px,95vw)] asowp-max-h-[calc(100vh-5.75rem)] asowp-bg-white asowp-rounded-2xl asowp-shadow-xl asowp-overflow-hidden asowp-flex asowp-flex-col"
    >
      <div class="asowp-flex asowp-items-center asowp-justify-between asowp-px-5 asowp-py-3 asowp-border-b asowp-border-[#e5e7eb]">
        <div class="asowp-text-[14px] asowp-font-semibold">Install the configurator screen</div>
        <button
          class="asowp-p-1 asowp-rounded-md hover:asowp-bg-[#f3f4f6] asowp-border-0 asowp-bg-transparent asowp-cursor-pointer"
          @click="closeInstallModals"
          aria-label="Close"
        >
          ✕
        </button>
      </div>

      <div class="asowp-flex-1 asowp-min-h-0 asowp-p-5 asowp-space-y-4 asowp-overflow-y-auto">
        <div class="asowp-text-[13px] asowp-text-gray-700">
          You can display the configurator in 2 ways:
        </div>

          <div class="asowp-rounded-xl asowp-border asowp-border-[#e5e7eb] asowp-bg-[#fafafa] asowp-p-4">
            <div class="asowp-text-[13px] asowp-font-semibold asowp-text-[#303030]">Option 1 — Buttons on product pages</div>
            <ol class="asowp-mt-2 asowp-text-[13px] asowp-text-gray-700 asowp-space-y-1">
              <li>1) If the product is not attached to a configuration yet, attach it first (either from the product edit page → All Signs Options selector, or during configuration creation in ASO).</li>
              <li>2) On the storefront, customers will see the customization buttons on that product page.</li>
            </ol>
            <div class="asowp-mt-2 asowp-text-[12px] asowp-text-gray-600">
              This is the recommended method because it stays linked to the product.
            </div>
          </div>

          <div class="asowp-rounded-xl asowp-border asowp-border-[#e5e7eb] asowp-bg-[#fafafa] asowp-p-4">
            <div class="asowp-text-[13px] asowp-font-semibold asowp-text-[#303030]">Option 2 — Shortcode</div>
            <div class="asowp-mt-2 asowp-text-[13px] asowp-text-gray-700">
              Add the shortcode inside any WordPress page:
            </div>
            <div class="asowp-mt-2 asowp-rounded-lg asowp-bg-white asowp-border asowp-border-[#e5e7eb] asowp-p-3 asowp-flex asowp-items-start asowp-justify-between asowp-gap-3">
              <code class="asowp-text-[12px] asowp-font-mono asowp-text-gray-800 asowp-break-all">
                [asowp-configurator productid="123"]
              </code>
              <button
                type="button"
                class="asowp-shrink-0 asowp-text-[12px] asowp-rounded-md asowp-border asowp-border-[#e5e7eb] asowp-bg-[#f8fafc] hover:asowp-bg-[#eef2f7] asowp-px-2 asowp-py-1 asowp-cursor-pointer"
                @click.stop="copySnippet('[asowp-configurator productid=&quot;123&quot;]', 'cfg-basic')"
              >
                {{ copiedKey === 'cfg-basic' ? 'Copied' : 'Copy' }}
              </button>
            </div>
            <div class="asowp-mt-2 asowp-text-[13px] asowp-text-gray-700">
              You can also open a specific demo/template in the configurator:
            </div>
            <div class="asowp-mt-2 asowp-rounded-lg asowp-bg-white asowp-border asowp-border-[#e5e7eb] asowp-p-3 asowp-flex asowp-items-start asowp-justify-between asowp-gap-3">
              <code class="asowp-text-[12px] asowp-font-mono asowp-text-gray-800 asowp-break-all">
                [asowp-configurator productid="123" tplid="240"]
              </code>
              <button
                type="button"
                class="asowp-shrink-0 asowp-text-[12px] asowp-rounded-md asowp-border asowp-border-[#e5e7eb] asowp-bg-[#f8fafc] hover:asowp-bg-[#eef2f7] asowp-px-2 asowp-py-1 asowp-cursor-pointer"
                @click.stop="copySnippet('[asowp-configurator productid=&quot;123&quot; tplid=&quot;240&quot;]', 'cfg-tpl')"
              >
                {{ copiedKey === 'cfg-tpl' ? 'Copied' : 'Copy' }}
              </button>
            </div>
            <div class="asowp-mt-2 asowp-text-[12px] asowp-text-gray-600">
              Replace <span class="asowp-font-mono">123</span> with your WooCommerce product ID and <span class="asowp-font-mono">240</span> with the template/demo ID.
            </div>
          </div>
        </div>

      <div class="asowp-flex asowp-justify-end asowp-gap-2 asowp-px-5 asowp-py-3 asowp-border-t asowp-border-[#e5e7eb]">
        <button
          class="asowp-px-4 asowp-py-1.5 asowp-rounded-md asowp-text-white asowp-bg-[#016464] hover:asowp-bg-[#028383] asowp-text-[13px] asowp-cursor-pointer"
          @click="closeInstallModals"
        >
          Got it
        </button>
      </div>
    </div>
  </div>

  <!-- Modal: Install Templates screen -->
  <div
    v-if="showInstallTemplatesModal"
    class="asowp-fixed asowp-inset-0 asowp-z-[1000] asowp-flex asowp-items-center asowp-justify-center"
  >
    <div
      class="asowp-absolute asowp-inset-0 asowp-bg-black asowp-bg-opacity-40"
      @click="closeInstallModals"
    ></div>
    <div
      class="asowp-relative asowp-w-[min(820px,95vw)] asowp-max-h-[calc(100vh-5.75rem)] asowp-bg-white asowp-rounded-2xl asowp-shadow-xl asowp-overflow-hidden asowp-flex asowp-flex-col"
    >
      <div class="asowp-flex asowp-items-center asowp-justify-between asowp-px-5 asowp-py-3 asowp-border-b asowp-border-[#e5e7eb]">
        <div class="asowp-text-[14px] asowp-font-semibold">Install the templates screen</div>
        <button
          class="asowp-p-1 asowp-rounded-md hover:asowp-bg-[#f3f4f6] asowp-border-0 asowp-bg-transparent asowp-cursor-pointer"
          @click="closeInstallModals"
          aria-label="Close"
        >
          ✕
        </button>
      </div>

      <div class="asowp-flex-1 asowp-min-h-0 asowp-p-5 asowp-space-y-4 asowp-overflow-y-auto">
        <div class="asowp-text-[13px] asowp-text-gray-700">
          You can display the templates library in 2 ways:
        </div>

        <div class="asowp-rounded-xl asowp-border asowp-border-[#e5e7eb] asowp-bg-[#fafafa] asowp-p-4">
          <div class="asowp-text-[13px] asowp-font-semibold asowp-text-[#303030]">Option 1 — Button on product pages</div>
          <ol class="asowp-mt-2 asowp-text-[13px] asowp-text-gray-700 asowp-space-y-1">
            <li>1) If the product is not attached to a configuration yet, attach it first (either from the product edit page → All Signs Options selector, or during configuration creation in ASO).</li>
            <li>2) On the storefront, customers can click the template button to pick a starter template.</li>
          </ol>
        </div>

        <div class="asowp-rounded-xl asowp-border asowp-border-[#e5e7eb] asowp-bg-[#fafafa] asowp-p-4">
          <div class="asowp-text-[13px] asowp-font-semibold asowp-text-[#303030]">Option 2 — Shortcode</div>
          <div class="asowp-mt-2 asowp-text-[13px] asowp-text-gray-700">
            Add the shortcode inside any WordPress page:
          </div>
          <div class="asowp-mt-2 asowp-rounded-lg asowp-bg-white asowp-border asowp-border-[#e5e7eb] asowp-p-3 asowp-flex asowp-items-start asowp-justify-between asowp-gap-3">
            <code class="asowp-text-[12px] asowp-font-mono asowp-text-gray-800 asowp-break-all">
              [asowp-templates productid="123" cols="3"]
            </code>
            <button
              type="button"
              class="asowp-shrink-0 asowp-text-[12px] asowp-rounded-md asowp-border asowp-border-[#e5e7eb] asowp-bg-[#f8fafc] hover:asowp-bg-[#eef2f7] asowp-px-2 asowp-py-1 asowp-cursor-pointer"
              @click.stop="copySnippet('[asowp-templates productid=&quot;123&quot; cols=&quot;3&quot;]', 'tpl-basic')"
            >
              {{ copiedKey === 'tpl-basic' ? 'Copied' : 'Copy' }}
            </button>
          </div>
          <div class="asowp-mt-2 asowp-text-[12px] asowp-text-gray-600">
            Replace <span class="asowp-font-mono">123</span> with your WooCommerce product ID. <span class="asowp-font-mono">cols</span> controls the grid columns.
          </div>
        </div>
      </div>

      <div class="asowp-flex asowp-justify-end asowp-gap-2 asowp-px-5 asowp-py-3 asowp-border-t asowp-border-[#e5e7eb]">
        <button
          class="asowp-px-4 asowp-py-1.5 asowp-rounded-md asowp-text-white asowp-bg-[#016464] hover:asowp-bg-[#028383] asowp-text-[13px] asowp-cursor-pointer"
          @click="closeInstallModals"
        >
          Got it
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import { h, onMounted, ref } from 'vue'
import api from '@/admin/Api/api'

const statisticImage = asowp_data.assets_url + '/images/home/im_statistic.png'
const skinImage      = asowp_data.assets_url + '/images/home/im_home-skin-vue.png'

/** KPI values (branche sur tes vraies métriques si dispo) */
const kpis = ref([
  { key: 'orders', label: 'Configured Orders', value: 0 },
  { key: 'rate', label: 'Rate vs all orders', value: '0%' },
  { key: 'revenue', label: 'Configured Revenue', value: asowp_data.currencySymbol + '0' },
])

const kpisLoading = ref(false)
const recentConfigs = ref([])
const showInstallConfigModal = ref(false)
const showInstallTemplatesModal = ref(false)
const copiedKey = ref(null)

const openInstallConfigModal = () => {
  showInstallConfigModal.value = true
  showInstallTemplatesModal.value = false
}

const openInstallTemplatesModal = () => {
  showInstallTemplatesModal.value = true
  showInstallConfigModal.value = false
}

const closeInstallModals = () => {
  showInstallConfigModal.value = false
  showInstallTemplatesModal.value = false
  copiedKey.value = null
}

const copySnippet = async (text, key) => {
  try {
    const plain = String(text).replace(/&quot;/g, '"')
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
    copiedKey.value = key
    window.setTimeout(() => {
      if (copiedKey.value === key) copiedKey.value = null
    }, 1200)
  } catch (_) {
    // no-op (clipboard denied)
  }
}

const formatMoney = (amount, symbol) => {
  const num = Number(amount || 0)
  try {
    return `${symbol}${num.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  } catch {
    return `${symbol}${num.toFixed(2)}`
  }
}

onMounted(async () => {
  try {
    kpisLoading.value = true
    const stats = await api.getHomeStats()
    const symbol = stats?.currency_symbol || asowp_data.currencySymbol || ''
    kpis.value = [
      { key: 'orders', label: 'Configured Orders', value: stats?.configured_orders ?? 0 },
      { key: 'rate', label: 'Rate vs all orders', value: `${stats?.configured_rate ?? 0}%` },
      { key: 'revenue', label: 'Configured Revenue', value: formatMoney(stats?.configured_revenue, symbol) },
    ]
  } finally {
    kpisLoading.value = false
  }

  try {
    const res = await api.getConfigs('?per_page=4&order=DESC&page=1')
    recentConfigs.value = Array.isArray(res?.data) ? res.data.slice(0, 4) : []
  } finally {
  }
})

/** Main menu items */
const mainMenu = [
  {
    to: '/configurations',
    title: 'Configurations',
    desc: 'Manage your sign configurations',
    icon: {
        render() {
            return h('svg', { 
            class: 'asowp-w-5 asowp-h-5', 
            viewBox: '0 0 20 20',
            fill: '#b2b2b2'
            }, [
            h('path', { 
                d: 'M6.55 7.25a.7.7 0 0 1 .7-.7h5.5a.7.7 0 0 1 0 1.4h-5.5a.7.7 0 0 1-.7-.7Z' 
            }),
            h('path', { 
                d: 'M7 9.05a.7.7 0 0 0 0 1.4h2.25a.7.7 0 1 0 0-1.4h-2.25Z' 
            }),
            h('path', { 
                fillRule: 'evenodd',
                d: 'M3.5 6.25a2.75 2.75 0 0 1 2.75-2.75h7.5a2.75 2.75 0 0 1 2.75 2.75v5.5a.75.75 0 0 1-.22.53l-4 4a.75.75 0 0 1-.53.22h-5.5a2.75 2.75 0 0 1-2.75-2.75v-7.5Zm2.75-1.25c-.69 0-1.25.56-1.25 1.25v7.5c0 .69.56 1.25 1.25 1.25h4.75v-2.25c0-.966.784-1.75 1.75-1.75h2.25v-4.75c0-.69-.56-1.25-1.25-1.25h-7.5Zm7.69 7.5h-1.19a.25.25 0 0 0-.25.25v1.19l1.44-1.44Z'
            })
            ]);
        }
    }

  },
  {
    to: '/templates',
    title: 'Templates',
    desc: 'Manage your sign templates',
    icon: {
        render() {
            return h('svg', { 
            class: 'asowp-w-5 asowp-h-5', 
            viewBox: '0 0 20 20',
            fill: '#b2b2b2'
            }, [
            h('path', { 
                d: 'M6.55 7.25a.7.7 0 0 1 .7-.7h5.5a.7.7 0 0 1 0 1.4h-5.5a.7.7 0 0 1-.7-.7Z' 
            }),
            h('path', { 
                d: 'M7 9.05a.7.7 0 0 0 0 1.4h2.25a.7.7 0 1 0 0-1.4h-2.25Z' 
            }),
            h('path', { 
                fillRule: 'evenodd',
                d: 'M3.5 6.25a2.75 2.75 0 0 1 2.75-2.75h7.5a2.75 2.75 0 0 1 2.75 2.75v5.5a.75.75 0 0 1-.22.53l-4 4a.75.75 0 0 1-.53.22h-5.5a2.75 2.75 0 0 1-2.75-2.75v-7.5Zm2.75-1.25c-.69 0-1.25.56-1.25 1.25v7.5c0 .69.56 1.25 1.25 1.25h4.75v-2.25c0-.966.784-1.75 1.75-1.75h2.25v-4.75c0-.69-.56-1.25-1.25-1.25h-7.5Zm7.69 7.5h-1.19a.25.25 0 0 0-.25.25v1.19l1.44-1.44Z'
            })
            ]);
        }
    }
  },
  {
    to: '/global-settings/output',
    title: 'Global Settings',
    desc: 'Manage your sign global setting',
    icon: {
      render() {
            return h('svg', { 
            class: 'asowp-w-5 asowp-h-5', 
            viewBox: '0 0 20 20',
            fill: '#b2b2b2'
            }, [
            h('path', { 
                fillRule: 'evenodd',
                d: 'M12.5 10a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm-1.5 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z' 
            }),
            h('path', { 
                fillRule: 'evenodd',
                d: 'M9.377 2.5c-.926 0-1.676.75-1.676 1.676v.688c0 .056-.043.17-.198.251-.153.08-.303.168-.448.262-.147.097-.268.076-.318.048l-.6-.346a1.676 1.676 0 0 0-2.29.613l-.622 1.08a1.676 1.676 0 0 0 .613 2.289l.648.374c.048.028.124.12.119.29a5.484 5.484 0 0 0 .005.465c.009.175-.07.27-.119.299l-.653.377a1.676 1.676 0 0 0-.613 2.29l.623 1.08a1.676 1.676 0 0 0 2.29.613l.7-.405c.048-.028.166-.048.312.043.115.071.233.139.353.202.155.08.198.195.198.251v.811c0 .926.75 1.676 1.676 1.676h1.246c.926 0 1.676-.75 1.676-1.676v-.81c0-.057.042-.171.197-.252.121-.063.239-.13.354-.202.146-.091.264-.07.312-.043l.7.405a1.676 1.676 0 0 0 2.29-.614l.623-1.08a1.676 1.676 0 0 0-.613-2.289l-.653-.377c-.05-.029-.128-.123-.119-.3a5.494 5.494 0 0 0 .005-.463c-.005-.171.07-.263.12-.291l.647-.374a1.676 1.676 0 0 0 .613-2.29l-.623-1.079a1.676 1.676 0 0 0-2.29-.613l-.6.346c-.049.028-.17.048-.318-.048a5.4 5.4 0 0 0-.448-.262c-.155-.081-.197-.195-.197-.251v-.688c0-.926-.75-1.676-1.676-1.676h-1.246Zm-.176 1.676c0-.097.078-.176.176-.176h1.246c.097 0 .176.079.176.176v.688c0 .728.462 1.298 1.003 1.58.11.058.219.122.323.19.517.337 1.25.458 1.888.09l.6-.346a.176.176 0 0 1 .24.064l.623 1.08a.176.176 0 0 1-.064.24l-.648.374c-.623.36-.888 1.034-.868 1.638a4.184 4.184 0 0 1-.004.337c-.032.615.23 1.31.867 1.677l.653.377a.176.176 0 0 1 .064.24l-.623 1.08a.176.176 0 0 1-.24.065l-.701-.405c-.624-.36-1.341-.251-1.855.069a3.91 3.91 0 0 1-.255.145c-.54.283-1.003.853-1.003 1.581v.811a.176.176 0 0 1-.176.176h-1.246a.176.176 0 0 1-.176-.176v-.81c0-.73-.462-1.3-1.003-1.582a3.873 3.873 0 0 1-.255-.146c-.514-.32-1.23-.428-1.855-.068l-.7.405a.176.176 0 0 1-.241-.065l-.623-1.08a.176.176 0 0 1 .064-.24l.653-.377c.637-.368.899-1.062.867-1.677a3.97 3.97 0 0 1-.004-.337c.02-.604-.245-1.278-.868-1.638l-.648-.374a.176.176 0 0 1-.064-.24l.623-1.08a.176.176 0 0 1 .24-.064l.6.346c.638.368 1.37.247 1.888-.09a3.85 3.85 0 0 1 .323-.19c.54-.282 1.003-.852 1.003-1.58v-.688Z'
            })
            ]);
        }
    }
  },
  {
    to: '/manage-fonts',
    title: 'Library',
    desc: 'Manage your sign library',
    icon: {
      render() {
            return h('svg', { 
            class: 'asowp-w-5 asowp-h-5', 
            viewBox: '0 0 20 20',
            fill: '#b2b2b2'
            }, [
            h('path', { 
                fillRule: 'evenodd',
                d: 'M7.25 3.5a3.75 3.75 0 0 0-3.75 3.75v5.5a3.75 3.75 0 0 0 3.75 3.75h5.5a3.75 3.75 0 0 0 3.75-3.75v-5.5a3.75 3.75 0 0 0-3.75-3.75h-5.5Zm-2.25 7.25v2a2.25 2.25 0 0 0 2.25 2.25h5.5a2.25 2.25 0 0 0 2.25-2.25v-2h-10Zm10-1.5v-2a2.25 2.25 0 0 0-2.25-2.25h-5.5a2.25 2.25 0 0 0-2.25 2.25v2h10Z' 
            })
            ]);
        }
    }
    
  },
]

/** Interest tiles */
const interest = [
  {
    title: 'Get Support',
    desc: "Start the conversation from our site via the chat button and we'll get back to you",
    href: 'https://signsdesigner.us/all-signs-options-product/',
    bg: 'asowp-bg-gradient-to-bl asowp-from-emerald-700 asowp-via-green-600 asowp-to-green-800',
    icon: {
      render(){ return h('svg',{class:'asowp-w-6 asowp-h-6',viewBox:'0 0 24 24',fill:'none',stroke:'currentColor'},[
        h('path',{d:'M2 14c0-.35.09-.68.26-.98.17-.3.43-.54.74-.72l.07-1.25A10 10 0 0 1 12 3a10 10 0 0 1 9.93 8.15l.07 1.1c.32.15.59.4.77.71.18.31.26.66.23 1.02v2.3c0 .35-.09.69-.26.99-.17.3-.43.54-.74.71V19c0 .83-.34 1.63-.93 2.21A3.12 3.12 0 0 1 19 22H11v-2',strokeWidth:2,strokeLinecap:'round',strokeLinejoin:'round'})
      ])}
    }
  },
  {
    title: 'Knowledgebase',
    desc: 'Reduce your learning curve and get started with ASO in no time by reading our FAQ!',
    href: 'https://docs.signsdesigner.us/docs/asowp-wp-documentation/',
    bg: 'asowp-bg-gradient-to-bl asowp-from-[#9D7B22] asowp-via-[#0E211A] asowp-to-[#0E211A]',
    icon: {
      render(){ return h('svg',{class:'asowp-w-6 asowp-h-6',viewBox:'0 0 24 24',fill:'none',stroke:'currentColor'},[
        h('path',{d:'M4 6a2 2 0 0 1 2-2h6a6 6 0 0 1 6 6v10H8a4 4 0 0 1-4-4V6Z',strokeWidth:2})
      ])}
    }
  },
  {
    title: 'Suggest a Feature',
    desc: "We're always working to improve ASO, so we'd love to hear how we can do better.",
    href: 'https://docs.signsdesigner.us/forums/forum/feedback-suggestions/',
    bg: 'asowp-bg-gradient-to-bl asowp-from-[#A770EB] asowp-via-[#0E211A] asowp-to-[#0E211A]',
    icon: {
      render(){ return h('svg',{class:'asowp-w-6 asowp-h-6',viewBox:'0 0 24 24',fill:'none',stroke:'currentColor'},[
        h('path',{d:'M12 6.04A9 9 0 0 0 3 3.75v14.25A9 9 0 0 1 12 21.75a9 9 0 0 1 9-3.75V3.75A9 9 0 0 0 12 6.04Z',strokeWidth:1.5})
      ])}
    }
  }
]
</script>

<style>
a.box-aso:not(:last-child) {
  border-bottom: 1px solid #e5e7eb; /* Bordure entre les éléments, pas sur le svg */
}
</style>
