<<<<<<< HEAD
<template>
  <div class="asowp-p-4 asowp-space-y-4 asowp-pt-[50px]">

    <!-- Top action + Create configuration -->
    <div class="asowp-flex asowp-justify-end">
      <RouterLink
        to="/configurations"
        class="asowp-inline-flex asowp-items-center asowp-gap-2 asowp-rounded-md asowp-bg-[#016464] hover:asowp-text-white asowp-no-underline asowp-text-white asowp-text-sm asowp-font-medium asowp-px-4 asowp-py-2">
        Create configuration
      </RouterLink>
    </div>

    <div class="asowp-flex asowp-space-x-3 ">
      <div class="asowp-w-[50%]">
        <button class="asowp-bg-[#fff] asowp-border-none asowp-flex asowp-cursor-pointer asowp-space-x-1 asowp-items-center asowp-w-full asowp-rounded-[0.75rem] asowp-px-2.5 asowp-py-2.5 asowp-text-left">
          <div class="asowp-bg-[#91d0ff] asowp-p-1 asowp-flex asowp-justify-center asowp-rounded-[6px] asowp-mr-2">
            <svg viewBox="0 0 20 20" class="Polaris-Icon__Svg asowp-w-4 asowp-h-4" focusable="false" aria-hidden="true">
              <path d="M10 14a.75.75 0 0 1-.75-.75v-3.5a.75.75 0 0 1 1.5 0v3.5a.75.75 0 0 1-.75.75Z"></path><path d="M9 7a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z"></path>
              <path fill-rule="evenodd" d="M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Zm-1.5 0a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0Z"></path>
            </svg>
          </div>
          
          Click <a href="#"> here to install configuration screen</a> in your online store
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
          Click <a href="#"> here to add template screen</a> to your online store
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
                    
                    <span class="asowp-text-[12px] asowp-text-gray-500">
                      The password to access to demo is: <b>aso</b>
                    </span>
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
          <ul v-else class="asowp-p-5 asowp-space-y-3">
            <li v-for="rc in recentConfigs" :key="rc.id" class="asowp-flex asowp-justify-between asowp-items-center">
              <div class="asowp-truncate">{{ rc.name }}</div>
              <RouterLink :to="`/configurations/${rc.id}`" class="asowp-text-[#016464] asowp-text-[12px]">Open</RouterLink>
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
        <div class="asowp-rounded-xl asowp-border asowp-border-[#e5e7eb] asowp-bg-white">
        <!-- Header -->
        <div class="asowp-px-5 asowp-py-3 asowp-border-b asowp-border-[#e5e7eb] asowp-text-[.8125em] asowp-font-semibold">
            Useful Links
        </div>

        <!-- Body -->
        <div class="asowp-pl-5 asowp-pr-5 asowp-pb-5 asowp-space-y-2 asowp-text-[13px]">

            <!-- Row 1: Browse demos + password -->
            <div class="asowp-flex asowp-items-center asowp-gap-3">
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
            

                <span class="asowp-text-[12px] asowp-text-gray-500">
                    The password to access to demo is: <b>aso</b>
                </span>
            </div>

            <!-- Row 2: Learning Center -->
            <div>
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
            
            </div>

            <!-- Row 3: Pricing -->
            <div>
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
            
            </div>

            <!-- Row 4: Get in touch -->
            <div>
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

      </div>
    </section>

    

  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import { h } from 'vue' 

const statisticImage = asowp_data.assets_url + '/images/home/im_statistic.png'
const skinImage      = asowp_data.assets_url + '/images/home/im_home-skin-vue.png'

/** KPI values (branche sur tes vraies métriques si dispo) */
const kpis = [
  { key: 'products',  label: 'Products Created', value: 0 },
  { key: 'rate',      label: 'Conversion Rate',  value: '0%' },
  { key: 'orders',    label: 'Orders',           value: 0 },
]

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

/** Recent configs (branche tes données réelles) */
const recentConfigs = []

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
=======
<template lang="">
    <div class="asowp-mt-[40px] asowp-fixed asowp-w-[calc(100%-160px)] asowp-flex asowp-items-center asowp-justify-center asowp-h-[80vh]">
        <div class="asowp-h-[80vh] asowp-bg-white asowp-w-full asowp-flex asowp-flex-col asowp-justify-center asowp-items-center asowp-p-10">
            <div class="asowp-grid sm:asowp-grid-cols-1 lg:asowp-grid-cols-2 asowp-gap-4 asowp-space-x-4 asowp-h-full asowp-home-gradient asowp-bg-gradient-to-r asowp-from-white asowp-to-[#016464]">
                <div class="asowp-flex asowp-flex-col asowp-item-center lg:asowp-px-4 sm:asowp-px-10">
                    <div class="asowp-py-2">
                        <span class="asowp-text-[14px]">Welcome to ASO configurator</span>
                    </div>
                    <div class="asowp-my-4">
                        <h3 class="asowp-m-0 asowp-font-bold asowp-text-[30px]">All Signs Options PRO</h3>
                    </div>
                    <p class="asowp-text-justify asowp-text-[14px] asowp-m-0 asowp-mt-6 asowp-mb-8">
                        Thank you for installing the ASO configurator for Woocommerce! Everything in ASO is streamlined to make your custom sign selling experience as simple and intuitive as possible for you and your customers. We hope you'll turn it into a powerful marketing asset that brings customers to your digital doorstep.
                    </p>
                    <div class="asowp-pricing-link">
                        <RouterLink to="/configurations" class="asowp-text-white asowp-bg-[#75A1FF] hover:asowp-bg-[#75A1FF] focus:asowp-outline-none focus:asowp-ring-4 focus:asowp-ring-[#75A1FF] asowp-font-medium asowp-rounded-md asowp-text-sm asowp-px-5 asowp-py-2.5 asowp-text-center asowp-me-2 asowp-mb-2 asowp-text-none">Get started</RouterLink>
                    </div>
                </div>
                <div :class="`asowp-bg-[url(${statisticImage})] asowp-flex asowp-justify-center asowp-items-center`">
                    <img src="../../../assets/images/home/im_home-skin-vue.png" class="asowp-w-3/4" alt=""/>
                </div>
            </div>
            <div class="asowp-w-full asowp-pt-[20px]">
                <h2 class="asowp-text-[16px] asowp-font-bold asowp-m-0 asowp-mb-2">What you may be interested in</h2>
                <div class="asowp-p-2 asowp-grid sm:asowp-grid-cols-1 md:asowp-grid-cols-2 lg:asowp-grid-cols-3 asowp-gap-8 asowp-justify-between asowp-items-center">
                    <div class="asowp-flex asowp-p-2 asowp-justify-center asowp-items-center asowp-bg-gradient-to-bl asowp-from-emerald-700 asowp-from-100% asowp-via-green-600 asowp-via-0% asowp-to-green-800 asowp-to-0% asowp-rounded-md asowp-text-white">
                        <div class="asowp-flex asowp-justify-center asowp-items-center">
                            <div class="asowp-bg-[#FFFFFF] asowp-opacity-50 asowp-p-4 asowp-rounded-md">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"  xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11 21V19H19V11.9C19 9.95 18.321 8.296 16.963 6.938C15.605 5.58 13.9507 4.90067 12 4.9C10.0493 4.89933 8.39533 5.57867 7.038 6.938C5.68067 8.29733 5.00133 9.95133 5 11.9V18H4C3.45 18 2.97933 17.8043 2.588 17.413C2.19667 17.0217 2.00067 16.5507 2 16V14C2 13.65 2.08767 13.321 2.263 13.013C2.43833 12.705 2.684 12.459 3 12.275L3.075 10.95C3.20833 9.81667 3.53767 8.76667 4.063 7.8C4.58833 6.83333 5.24667 5.99167 6.038 5.275C6.82933 4.55833 7.73733 4 8.762 3.6C9.78667 3.2 10.866 3 12 3C13.134 3 14.209 3.2 15.225 3.6C16.241 4 17.1493 4.55433 17.95 5.263C18.7507 5.97167 19.409 6.809 19.925 7.775C20.441 8.741 20.7743 9.791 20.925 10.925L21 12.225C21.3167 12.375 21.5627 12.6 21.738 12.9C21.9133 13.2 22.0007 13.5167 22 13.85V16.15C22 16.4833 21.9127 16.8 21.738 17.1C21.5633 17.4 21.3173 17.625 21 17.775V19C21 19.55 20.8043 20.021 20.413 20.413C20.0217 20.805 19.5507 21.0007 19 21H11ZM9 14C8.71667 14 8.47933 13.904 8.288 13.712C8.09667 13.52 8.00067 13.2827 8 13C7.99933 12.7173 8.09533 12.48 8.288 12.288C8.48067 12.096 8.718 12 9 12C9.282 12 9.51967 12.096 9.713 12.288C9.90633 12.48 10.002 12.7173 10 13C9.998 13.2827 9.902 13.5203 9.712 13.713C9.522 13.9057 9.28467 14.0013 9 14ZM15 14C14.7167 14 14.4793 13.904 14.288 13.712C14.0967 13.52 14.0007 13.2827 14 13C13.9993 12.7173 14.0953 12.48 14.288 12.288C14.4807 12.096 14.718 12 15 12C15.282 12 15.5197 12.096 15.713 12.288C15.9063 12.48 16.002 12.7173 16 13C15.998 13.2827 15.902 13.5203 15.712 13.713C15.522 13.9057 15.2847 14.0013 15 14ZM6.025 12.45C5.90833 10.6833 6.44167 9.16667 7.625 7.9C8.80833 6.63333 10.2833 6 12.05 6C13.5333 6 14.8377 6.47067 15.963 7.412C17.0883 8.35333 17.7673 9.558 18 11.026C16.4833 11.0087 15.0877 10.6 13.813 9.8C12.5383 9 11.559 7.91667 10.875 6.55C10.6083 7.88333 10.046 9.071 9.188 10.113C8.33 11.155 7.27567 11.934 6.025 12.45Z" fill="black"/>
                                </svg>
                            </div>
                        </div>
                        <div class="asowp-p-4">
                            <a href="https://signsdesigner.us/all-signs-options-product/" class="asowp-text-[14px] asowp-text-none asowp-text-white hover:asowp-text-white focus:asowp-border-none focus:asowp-text-white asowp-m-0 asowp-mb-2">Get Support</a>
                            <div>
                                <span>Start the conversation from our site via the chat button and we'll get back to you</span>
                            </div>
                        </div>
                    </div>
                    <div class="asowp-flex asowp-p-2 asowp-justify-center asowp-items-center asowp-bg-gradient-to-bl asowp-from-[#9D7B22] asowp-from-100% asowp-via-[#0E211A] asowp-via-0% asowp-to-[#0E211A] asowp-to-0% asowp-rounded-md asowp-text-white">
                        <div class="asowp-bg-[#FFFFFF] asowp-opacity-50 asowp-p-4 asowp-rounded-md">
                            <svg width="31" height="31" viewBox="0 0 31 31" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path d="M18.3203 23.2492H15.5L9.68747 20.0459L2.58911 22.6564L4.5279 26.4952L9.09524 24.588C13.3687 27.1397 15.9695 28.4159 16.8982 28.4159C17.8269 28.4159 21.6664 26.6935 28.4166 23.2492" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M18.7241 17.429V14.413C19.4345 14.1179 20.3664 13.6864 20.9018 13.151C21.7147 12.3382 22.2683 11.3025 22.4926 10.1749C22.7168 9.04744 22.6017 7.87874 22.1618 6.81665C21.7219 5.75456 20.9769 4.84678 20.021 4.20809C19.0651 3.56941 17.9414 3.22852 16.7918 3.22852C15.6422 3.22852 14.5184 3.56941 13.5625 4.20809C12.6066 4.84678 11.8616 5.75456 11.4217 6.81665C10.9818 7.87874 10.8667 9.04744 11.0909 10.1749C11.3152 11.3025 11.8688 12.3382 12.6817 13.151C13.2171 13.6864 14.1438 14.1179 14.8543 14.4124C14.8581 14.6287 14.8581 15.6343 14.8543 17.4284L18.7241 17.429Z" stroke="black" stroke-width="2" stroke-linejoin="round"/>
                                <path d="M7.75008 13.5622L8.39591 12.9163M25.8334 13.5622L25.1876 12.9163M9.68758 3.22884L9.04175 2.58301M23.8959 3.22884L24.5417 2.58301M26.4792 7.74967H25.8334M7.75008 7.74967H7.10425" stroke="black" stroke-width="2" stroke-linecap="round"/>
                            </svg>
                        </div>
                        <div class="asowp-p-4">
                            <a href="https://docs.signsdesigner.us/docs/asowp-wp-documentation/" class="asowp-text-[14px] asowp-text-none asowp-text-white hover:asowp-text-white focus:asowp-border-none focus:asowp-text-white asowp-m-0 asowp-mb-2">Knowledgebase</a>
                            <div>
                                <span>Reduce your learning curve and get started with ASO in no time by reading our FAQ!</span>
                            </div>
                        </div>
                    </div>
                    <div class="asowp-flex asowp-p-2 asowp-justify-center asowp-items-center asowp-bg-gradient-to-bl asowp-from-[#A770EB] asowp-from-100% asowp-via-[#0E211A] asowp-via-0% asowp-to-[#0E211A] asowp-to-0% asowp-rounded-md asowp-text-white">
                       <div class="asowp-bg-[#FFFFFF] asowp-opacity-50 asowp-p-4 asowp-rounded-md asowp-text-[#0E211A]">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="asowp-w-6 asowp-h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                            </svg>

                        </div>
                        <div class="asowp-p-4">
                            <a href="https://docs.signsdesigner.us/forums/forum/feedback-suggestions/" class="asowp-text-[14px] asowp-text-none asowp-text-white hover:asowp-text-white focus:asowp-border-none focus:asowp-text-white asowp-m-0 asowp-mb-2">Suggest a Feature</a>
                            <div>
                                <span>We're always working to improve ASO, so we'd love to hear how we can do better.</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { RouterLink } from 'vue-router';
    const statisticImage = asowp_data.assets_url+'/images/home/im_statistic.png'
</script>
<style>
    
>>>>>>> 5550fb22cb3f0a2454b4bdd690703964730bfc18
</style>