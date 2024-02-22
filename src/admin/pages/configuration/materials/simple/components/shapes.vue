<template>
    <div class="aso-h-[100vh]">
        <div class="aso-space-y-1" v-show="listShape">
            <div class="aso-bg-[#F8F9FB] aso-space-x-1 aso-px-4 aso-py-4 aso-flex">
                <div class="aso-font-bold">
                    Name config
                </div>
                <img class="aso-w-4 aso-h-4 aso-py-1" src="../../../../../../../assets/icons/ic_crochet.svg" alt="">
                <div class="aso-text-[16px]">
                    Material
                </div>
                <img class="aso-w-4 aso-h-4 aso-py-1" src="../../../../../../../assets/icons/ic_crochet.svg" alt="">
                <div class="aso-text-[16px] ">
                    Plastic
                </div>
            </div>
            <div class="aso-bg-white aso-px-6 aso-justify-between aso-items-center aso-flex">
                <div class="">
                    <button class="aso-flex aso-w-fit aso-h-fit aso-p-4 aso-bg-transparent aso-border-none aso-space-x-2 aso-text-black focus:aso-border-b-[2px] focus:aso-border-r-0 focus:aso-border-l-0 focus:aso-border-t-0 focus:aso-border-solid focus:aso-border-b-[#016464] focus:aso-text-[#016464] focus:aso-bg-[#F9F9F9] hover:aso-border-b-[2px] hover:aso-border-r-0 hover:aso-border-l-0 hover:aso-border-t-0 hover:aso-border-solid hover:aso-border-b-[#016464] hover:aso-bg-[#F9F9F9] hover:aso-text-[#016464] aso-cursor-pointer">
                        <svg class="aso-w-5 aso-h-5" viewBox="0 0 47 41" fill="black" xmlns="http://www.w3.org/2000/svg">
                            <g id="fluent:keyboard-layout-resize-24-filled">
                            <path id="Vector" d="M41.5083 17.9375C41.8623 17.9375 42.2043 18.0496 42.4711 18.2531C42.7379 18.4566 42.9115 18.7378 42.9596 19.0445L42.9733 19.2187V33.7396C42.9734 34.7135 42.5508 35.6512 41.7908 36.3632C41.0308 37.0751 39.9901 37.5081 38.8791 37.5748L38.5783 37.5833H34.6716C34.3004 37.5832 33.9431 37.4599 33.6719 37.2383C33.4007 37.0167 33.2358 36.7133 33.2105 36.3894C33.1852 36.0655 33.3014 35.7453 33.5356 35.4935C33.7699 35.2417 34.1047 35.077 34.4724 35.0328L34.6716 35.0208H38.5783C38.9323 35.0208 39.2743 34.9087 39.5411 34.7052C39.8079 34.5017 39.9815 34.2206 40.0296 33.9138L40.0433 33.7396V19.2187C40.0433 18.8789 40.1976 18.553 40.4724 18.3128C40.7471 18.0725 41.1197 17.9375 41.5083 17.9375ZM41.5083 3.41666L41.645 3.42178L41.8423 3.45082L41.9751 3.48328L42.0923 3.52257L42.2291 3.58236L42.3892 3.67461L42.5455 3.7942L42.6451 3.88986L42.733 3.99578L42.8307 4.14953L42.8639 4.21274L42.9108 4.32549C42.9323 4.3887 42.9498 4.45532 42.9596 4.52366L42.9733 4.69791V13.2396C42.9732 13.5642 42.8322 13.8767 42.5788 14.1139C42.3254 14.3511 41.9785 14.4953 41.6081 14.5175C41.2378 14.5396 40.8717 14.4379 40.5838 14.2331C40.2958 14.0282 40.1075 13.7354 40.057 13.4138L40.0433 13.2396V7.78999L31.3119 15.4262C31.0501 15.6534 30.7001 15.7858 30.3316 15.7972C29.9631 15.8085 29.6032 15.6979 29.3239 15.4875C29.0445 15.277 28.8662 14.9821 28.8244 14.6617C28.7827 14.3413 28.8807 14.0189 29.0988 13.7589L29.2413 13.6154L37.9688 5.97916H31.7416C31.3876 5.97914 31.0456 5.86702 30.7788 5.66351C30.512 5.46001 30.3384 5.17889 30.2903 4.87216L30.2766 4.69791C30.2766 4.38829 30.4048 4.08916 30.6375 3.85582C30.8702 3.62248 31.1916 3.47072 31.5424 3.42861L31.7416 3.41666H41.5083ZM25.8816 17.9375C26.9953 17.9374 28.0674 18.307 28.8815 18.9717C29.6955 19.6363 30.1906 20.5465 30.2668 21.5182L30.2766 21.7812V33.7396C30.2768 34.7135 29.8541 35.6512 29.0941 36.3632C28.3341 37.0751 27.2935 37.5081 26.1824 37.5748L25.8816 37.5833H8.30162C7.18797 37.5834 6.11579 37.2138 5.30178 36.5492C4.48776 35.8845 3.99261 34.9743 3.91638 34.0027L3.90662 33.7396V21.7812C3.90648 20.8073 4.32911 19.8696 5.0891 19.1577C5.8491 18.4457 6.88977 18.0127 8.0008 17.946L8.30162 17.9375H25.8816ZM20.9983 29.8958H13.1849C12.3841 29.8958 11.7199 30.5279 11.7199 31.1771C11.7199 31.8262 12.2708 32.3627 12.9857 32.4464L13.1849 32.4583H20.9983C21.7991 32.4583 22.4633 31.8262 22.4633 31.1771C22.4633 30.8675 22.3351 30.5683 22.1024 30.335C21.8697 30.1016 21.5483 29.9499 21.1975 29.9078L20.9983 29.8958ZM11.7199 23.0625C11.2019 23.0625 10.7051 23.2425 10.3387 23.5629C9.97241 23.8832 9.76662 24.3177 9.76662 24.7708C9.76662 25.2239 9.97241 25.6584 10.3387 25.9788C10.7051 26.2992 11.2019 26.4792 11.7199 26.4792C12.238 26.4792 12.7348 26.2992 13.1012 25.9788C13.4675 25.6584 13.6733 25.2239 13.6733 24.7708C13.6733 24.3177 13.4675 23.8832 13.1012 23.5629C12.7348 23.2425 12.238 23.0625 11.7199 23.0625ZM22.4633 23.0625C21.9452 23.0625 21.4484 23.2425 21.0821 23.5629C20.7157 23.8832 20.5099 24.3177 20.5099 24.7708C20.5099 25.2239 20.7157 25.6584 21.0821 25.9788C21.4484 26.2992 21.9452 26.4792 22.4633 26.4792C22.9813 26.4792 23.4782 26.2992 23.8445 25.9788C24.2108 25.6584 24.4166 25.2239 24.4166 24.7708C24.4166 24.3177 24.2108 23.8832 23.8445 23.5629C23.4782 23.2425 22.9813 23.0625 22.4633 23.0625ZM17.0916 23.0625C16.5736 23.0625 16.0767 23.2425 15.7104 23.5629C15.3441 23.8832 15.1383 24.3177 15.1383 24.7708C15.1383 25.2239 15.3441 25.6584 15.7104 25.9788C16.0767 26.2992 16.5736 26.4792 17.0916 26.4792C17.6097 26.4792 18.1065 26.2992 18.4728 25.9788C18.8392 25.6584 19.0449 25.2239 19.0449 24.7708C19.0449 24.3177 18.8392 23.8832 18.4728 23.5629C18.1065 23.2425 17.6097 23.0625 17.0916 23.0625ZM24.9049 3.41666C25.2761 3.41676 25.6334 3.54007 25.9046 3.76169C26.1759 3.98331 26.3408 4.28671 26.3661 4.61058C26.3914 4.93445 26.2752 5.25464 26.0409 5.50646C25.8067 5.75828 25.4719 5.92295 25.1042 5.9672L24.9049 5.97916H8.30162C7.9476 5.97917 7.60556 6.0913 7.33876 6.2948C7.07196 6.4983 6.89844 6.77942 6.85029 7.08616L6.83662 7.26041V14.0937C6.8365 14.4184 6.6955 14.7308 6.4421 14.9681C6.18869 15.2053 5.84179 15.3495 5.47147 15.3716C5.10115 15.3937 4.73504 15.2921 4.44711 15.0873C4.15917 14.8824 3.97088 14.5896 3.92029 14.268L3.90662 14.0937V7.26041C3.90648 6.28644 4.32911 5.34875 5.0891 4.63683C5.8491 3.92491 6.88977 3.49186 8.0008 3.4252L8.30162 3.41666H24.9049Z" fill="currentColor"/>
                            </g>
                        </svg>
                        <div class="aso-text-[14px]">
                            Size
                        </div>
                    </button>
                </div>
                <div class="">
                    <button class="aso-flex aso-w-fit aso-h-fit aso-p-4  aso-bg-transparent aso-border-none aso-space-x-2 aso-text-black focus:aso-border-b-[2px] focus:aso-border-r-0 focus:aso-border-l-0 focus:aso-border-t-0 focus:aso-border-solid focus:aso-border-b-[#016464] focus:aso-text-[#016464] focus:aso-bg-[#F9F9F9] hover:aso-border-b-[2px] hover:aso-border-r-0 hover:aso-border-l-0 hover:aso-border-t-0 hover:aso-border-solid hover:aso-border-b-[#016464] hover:aso-bg-[#F9F9F9] hover:aso-text-[#016464] aso-cursor-pointer">
                        <svg class="aso-w-5 aso-h-5" viewBox="0 0 40 40" fill="black" xmlns="http://www.w3.org/2000/svg">
                            <g id="zondicons:border-all">
                            <path id="Vector" d="M22 22V34H34V22H22ZM22 18H34V6H22V18ZM18 22H6V34H18V22ZM18 18V6H6V18H18ZM2 36V2H38V38H2V36Z" fill="currentColor"/>
                            </g>
                        </svg>
                        <div class="aso-text-[14px]">
                            Border
                        </div>
                    </button>
                </div>
                <div class="">
                    <button class="aso-flex aso-w-fit aso-h-fit aso-p-4  aso-bg-transparent aso-border-none aso-space-x-2 aso-text-black focus:aso-border-b-[2px] focus:aso-border-r-0 focus:aso-border-l-0 focus:aso-border-t-0 focus:aso-border-solid focus:aso-border-b-[#016464] focus:aso-text-[#016464] focus:aso-bg-[#F9F9F9] hover:aso-border-b-[2px] hover:aso-border-r-0 hover:aso-border-l-0 hover:aso-border-t-0 hover:aso-border-solid hover:aso-border-b-[#016464] hover:aso-bg-[#F9F9F9] hover:aso-text-[#016464] aso-cursor-pointer">
                        <svg class="aso-w-5 aso-h-5" viewBox="0 0 40 41" fill="black" xmlns="http://www.w3.org/2000/svg">
                            <g id="tdesign:fill-color-1">
                            <path id="Vector" d="M20.0004 0.0888367L39.9137 20.5L36.6671 23.8278V23.9167H36.5804L24.7137 36.08C23.4635 37.3611 21.7682 38.0807 20.0004 38.0807C18.2326 38.0807 16.5373 37.3611 15.2871 36.08L4.8004 25.3329C4.18131 24.6983 3.69021 23.945 3.35516 23.1159C3.02011 22.2869 2.84766 21.3983 2.84766 20.5009C2.84766 19.6035 3.02011 18.7149 3.35516 17.8858C3.69021 17.0567 4.18131 16.3034 4.8004 15.6688L12.1971 8.08554L7.64373 3.41667L10.0004 1.00109L14.5554 5.66996L20.0004 0.0888367ZM14.5554 10.5028L7.15873 18.0844C6.50873 18.7507 6.18207 19.6253 6.18207 20.5H35.1987L20.0004 4.92L16.9137 8.08554L22.3571 13.6667L20.0004 16.0823L14.5554 10.5028ZM8.13373 23.9167L17.6437 33.6644C18.2688 34.3049 19.1165 34.6648 20.0004 34.6648C20.8843 34.6648 21.732 34.3049 22.3571 33.6644L31.8671 23.9167H8.13373ZM36.2504 31.4145L38.4404 34.2504C39.4087 35.5043 39.4087 37.4074 38.4404 38.6596C38.1824 39.0048 37.8511 39.2852 37.4717 39.4797C37.0922 39.6741 36.6746 39.7775 36.2504 39.782C35.3671 39.782 34.5837 39.3378 34.0604 38.6596C33.0921 37.4074 33.0921 35.5043 34.0604 34.2504L36.2504 31.4145Z" fill="currentColor"/>
                            </g>
                        </svg>

                        <div class="aso-text-[14px]">
                            Material color
                        </div>
                    </button>
                </div>
                <div class="">
                    <button class="aso-flex aso-w-fit aso-h-fit aso-p-4  aso-bg-transparent aso-border-none aso-space-x-2 aso-text-black focus:aso-border-b-[2px] focus:aso-border-r-0 focus:aso-border-l-0 focus:aso-border-t-0 focus:aso-border-solid focus:aso-border-b-[#016464] focus:aso-text-[#016464] focus:aso-bg-[#F9F9F9] hover:aso-border-b-[2px] hover:aso-border-r-0 hover:aso-border-l-0 hover:aso-border-t-0 hover:aso-border-solid hover:aso-border-b-[#016464] hover:aso-bg-[#F9F9F9] hover:aso-text-[#016464] aso-cursor-pointer">
                        <svg class="aso-w-5 aso-h-5" viewBox="0 0 40 40" fill="black" xmlns="http://www.w3.org/2000/svg">
                            <g id="uil:screw">
                            <path id="Vector" d="M36.183 16.8667L23.133 3.81666C22.9138 3.59622 22.6374 3.44147 22.3349 3.36988C22.0324 3.29829 21.716 3.31272 21.4212 3.41153C21.1265 3.51035 20.8653 3.68962 20.6671 3.92908C20.4689 4.16855 20.3417 4.45867 20.2997 4.76666L19.083 13.3333L15.7497 16.6667L15.1997 16.35C14.8408 16.1755 14.4313 16.1356 14.0455 16.2374C13.6597 16.3393 13.3232 16.5762 13.0972 16.905C12.8713 17.2339 12.7708 17.6329 12.8141 18.0296C12.8573 18.4263 13.0415 18.7942 13.333 19.0667L11.4163 21.0167L10.8663 20.7C10.5084 20.5356 10.1038 20.5033 9.72429 20.6089C9.3448 20.7144 9.01495 20.9509 8.79324 21.2765C8.57153 21.6021 8.4723 21.9956 8.51314 22.3874C8.55398 22.7792 8.73225 23.1438 9.01634 23.4167L7.06634 25.35L6.53301 25C6.34278 24.8898 6.13264 24.8183 5.91468 24.7897C5.69671 24.761 5.47524 24.7758 5.263 24.8331C5.05077 24.8904 4.85197 24.9892 4.67806 25.1237C4.50415 25.2581 4.35856 25.4257 4.24967 25.6167C4.06145 25.9599 4.00005 26.3584 4.07623 26.7424C4.15242 27.1264 4.36133 27.4713 4.66634 27.7167L3.81634 28.5667C3.662 28.7231 3.5427 28.9106 3.46634 29.1167C3.38094 29.317 3.33564 29.5322 3.33301 29.75V35C3.33301 35.442 3.5086 35.8659 3.82116 36.1785C4.13372 36.4911 4.55765 36.6667 4.99967 36.6667H10.2163C10.4341 36.664 10.6493 36.6187 10.8497 36.5333C11.0557 36.457 11.2432 36.3377 11.3997 36.1833L14.233 33.3333L14.783 33.65C14.9722 33.7609 15.1815 33.8333 15.3988 33.8632C15.6161 33.893 15.8371 33.8797 16.0492 33.824C16.2613 33.7682 16.4604 33.6712 16.6349 33.5384C16.8095 33.4055 16.9561 33.2396 17.0663 33.05C17.2609 32.7069 17.3275 32.3059 17.2543 31.9184C17.181 31.5308 16.9727 31.1818 16.6663 30.9333L18.6163 29L19.1663 29.3167C19.4154 29.4578 19.6967 29.5325 19.983 29.5333C20.302 29.5046 20.606 29.3845 20.8586 29.1875C21.1111 28.9904 21.3016 28.7248 21.4071 28.4223C21.5126 28.1199 21.5287 27.7934 21.4535 27.4821C21.3783 27.1707 21.2149 26.8876 20.983 26.6667L22.933 24.7333L23.483 25.05C23.7321 25.1912 24.0134 25.2658 24.2997 25.2667C24.64 25.2606 24.9704 25.1504 25.2462 24.951C25.5221 24.7516 25.7303 24.4725 25.8429 24.1512C25.9554 23.83 25.9669 23.4819 25.8757 23.154C25.7846 22.826 25.5952 22.5338 25.333 22.3167L26.6497 21L35.233 19.7833C35.5415 19.7395 35.8315 19.6101 36.0701 19.4097C36.3087 19.2094 36.4864 18.9462 36.583 18.65C36.6973 18.3461 36.7203 18.0154 36.6492 17.6986C36.5782 17.3818 36.4161 17.0926 36.183 16.8667ZM9.53301 33.3333H6.66634V30.4667L7.61634 29.5167L11.2497 31.6667L9.53301 33.3333ZM13.683 29.1667L9.99967 27.0833L11.8997 25.1833L15.5163 27.2667L13.683 29.1667ZM18.033 24.8333L14.3997 22.7333L16.3163 20.8333L19.9997 22.9167L18.033 24.8333ZM22.383 20.4833L18.7497 18.3333L20.6497 16.4333L23.5163 19.3L22.383 20.4833ZM26.4663 17.5833L22.4163 13.5333L23.133 8.53333L31.4663 16.8667L26.4663 17.5833Z" fill="currentColor"/>
                            </g>
                        </svg>
                        <div class="aso-text-[14px]">
                            Fixing method
                        </div>
                    </button>
                </div>
                <div class="">
                    <button class="aso-flex aso-w-fit aso-h-fit aso-p-4  aso-bg-transparent aso-border-none aso-space-x-2 aso-text-black focus:aso-border-b-[2px] focus:aso-border-r-0 focus:aso-border-l-0 focus:aso-border-t-0 focus:aso-border-solid focus:aso-border-b-[#016464] focus:aso-text-[#016464] focus:aso-bg-[#F9F9F9] hover:aso-border-b-[2px] hover:aso-border-r-0 hover:aso-border-l-0 hover:aso-border-t-0 hover:aso-border-solid hover:aso-border-b-[#016464] hover:aso-bg-[#F9F9F9] hover:aso-text-[#016464] aso-cursor-pointer">
                        <svg class="aso-w-5 aso-h-5" viewBox="0 0 40 41" fill="black" xmlns="http://www.w3.org/2000/svg">
                            <g id="mdi:shape">
                            <path id="Vector" d="M18.3333 23.0625V36.7292H5V23.0625H18.3333ZM20 3.41666L29.1667 18.7917H10.8333L20 3.41666ZM29.1667 22.2083C33.3333 22.2083 36.6667 25.625 36.6667 29.8958C36.6667 34.1667 33.3333 37.5833 29.1667 37.5833C25 37.5833 21.6667 34.1667 21.6667 29.8958C21.6667 25.625 25 22.2083 29.1667 22.2083Z" fill="currentColor"/>
                            </g>
                        </svg>

                        <div class="aso-text-[14px]">
                            Shape
                        </div>
                    </button>
                </div>
                <div class="">
                    <button class="aso-flex aso-w-fit aso-h-fit aso-p-4  aso-bg-transparent aso-space-x-2 aso-border-none aso-text-black focus:aso-border-b-[2px] focus:aso-border-r-0 focus:aso-border-l-0 focus:aso-border-t-0 focus:aso-border-solid focus:aso-border-b-[#016464] focus:aso-text-[#016464] focus:aso-bg-[#F9F9F9] hover:aso-border-b-[2px] hover:aso-border-r-0 hover:aso-border-l-0 hover:aso-border-t-0 hover:aso-border-solid hover:aso-border-b-[#016464] hover:aso-bg-[#F9F9F9] hover:aso-text-[#016464] aso-cursor-pointer">
                        <svg class="aso-w-5 aso-h-5" viewBox="0 0 46 47" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g id="clarity:text-line" clip-path="url(#clip0_457_214)">
                            <path id="Vector" d="M15.5757 11.5411C15.453 11.1569 15.2131 10.8229 14.8912 10.588C14.5693 10.3531 14.1823 10.2296 13.7868 10.2356H13.6335C13.2341 10.226 12.8422 10.3477 12.5156 10.5827C12.189 10.8177 11.9448 11.1537 11.819 11.5411L1.45625 34.6756C1.33756 34.9142 1.27624 35.1782 1.27736 35.4458C1.27736 35.7921 1.41198 36.1242 1.65161 36.369C1.89124 36.6138 2.21625 36.7514 2.55514 36.7514C2.85996 36.7559 3.15822 36.6608 3.40645 36.4799C3.65467 36.2991 3.8399 36.042 3.93514 35.7461L6.59291 29.6753H20.6485L23.3062 35.6678C23.411 35.9742 23.6035 36.2413 23.8587 36.4345C24.1139 36.6278 24.42 36.7381 24.7374 36.7514C25.1034 36.7514 25.4544 36.6028 25.7132 36.3384C25.972 36.074 26.1174 35.7154 26.1174 35.3414C26.102 35.0844 26.0414 34.8323 25.9385 34.5972L15.5757 11.5411ZM7.76847 27.0381L13.6335 13.6953L19.5112 27.0381H7.76847Z" fill="currentColor"/>
                            <path id="Vector_2" d="M41.1964 19.2961C40.3913 18.568 39.4525 18.0108 38.4346 17.6566C37.4168 17.3025 36.3403 17.1586 35.2676 17.2333C33.1975 17.226 31.1498 17.6711 29.262 18.5389C29.0441 18.6419 28.859 18.8055 28.7279 19.011C28.5969 19.2165 28.5251 19.4556 28.5209 19.7008C28.5451 20.0156 28.6801 20.3107 28.901 20.5315C29.1218 20.7524 29.4135 20.884 29.722 20.9019C29.8926 20.895 30.0609 20.8597 30.2203 20.7975C31.7112 20.0976 33.333 19.7368 34.9737 19.74C38.4237 19.74 40.4426 21.4764 40.4426 24.8578V25.5105C38.6082 24.9643 36.7054 24.696 34.7948 24.7142C30.1437 24.7142 26.9492 26.8161 26.9492 30.7719V30.8372C26.9492 34.6886 30.3992 36.6861 33.8109 36.6861C35.0886 36.7241 36.3568 36.4502 37.5102 35.8871C38.6635 35.324 39.6688 34.488 40.4426 33.4483V35.1194C40.4426 35.4657 40.5772 35.7978 40.8168 36.0426C41.0564 36.2874 41.3814 36.425 41.7203 36.425C41.8948 36.4253 42.0674 36.3891 42.2277 36.3187C42.3879 36.2482 42.5324 36.145 42.6521 36.0153C42.7718 35.8857 42.8643 35.7324 42.9238 35.5648C42.9833 35.3973 43.0086 35.219 42.9981 35.0411V24.8055C43.074 23.8108 42.9536 22.8105 42.6441 21.8641C42.3346 20.9178 41.8423 20.0445 41.1964 19.2961ZM40.4809 29.3489C40.4809 32.3255 37.7081 34.4275 34.3348 34.4275C31.8559 34.4275 29.722 33.0436 29.722 30.6936V30.6153C29.722 28.2653 31.6387 26.6986 35.0887 26.6986C36.9138 26.7039 38.729 26.972 40.4809 27.495V29.3489Z" fill="currentColor"/>
                            </g>
                            <defs>
                            <clipPath id="clip0_457_214">
                            <rect width="46" height="47" fill="black"/>
                            </clipPath>
                            </defs>
                        </svg>
                        <div class="aso-text-[14px]">
                            Text/Image
                        </div>
                    </button>
                </div>
                <div class="">
                    <button class="aso-flex aso-w-fit aso-h-fit aso-p-4  aso-bg-transparent aso-space-x-2 aso-border-none aso-text-black focus:aso-border-b-[2px] focus:aso-border-r-0 focus:aso-border-l-0 focus:aso-border-t-0 focus:aso-border-solid focus:aso-border-b-[#016464] focus:aso-text-[#016464] focus:aso-bg-[#F9F9F9] hover:aso-border-b-[2px] hover:aso-border-r-0 hover:aso-border-l-0 hover:aso-border-t-0 hover:aso-border-solid hover:aso-border-b-[#016464] hover:aso-bg-[#F9F9F9] hover:aso-text-[#016464] aso-cursor-pointer">
                        <svg class="aso-w-5 aso-h-5" viewBox="0 0 26 28" fill="black" xmlns="http://www.w3.org/2000/svg">
                            <path d="M25 4H1M25 14H1M25 24H1M21 1V7M5 11V17M17 21V27" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>


                        <div class="aso-text-[14px]">
                            Additional Options
                        </div>
                    </button>
                </div>
            </div>
            <div class="aso-flex aso-justify-end aso-bg-[#F8F9FB] aso-px-4 aso-py-4 aso-pb-2">
                <button class="aso-flex aso-w-fit aso-h-fit aso-rounded aso-bg-[#016464] aso-px-4 aso-space-x-2 aso-p-1.5 aso-border-none aso-text-white aso-opacity-90 hover:aso-opacity-100 aso-cursor-pointer" @click="newShape">
                    <svg class="aso-w-5 aso-h-5" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="plus-lg">
                        <path id="Vector" fill-rule="evenodd" clip-rule="evenodd" d="M11 2.75C11.1823 2.75 11.3572 2.82243 11.4861 2.95136C11.6151 3.0803 11.6875 3.25516 11.6875 3.4375V10.3125H18.5625C18.7448 10.3125 18.9197 10.3849 19.0486 10.5139C19.1776 10.6428 19.25 10.8177 19.25 11C19.25 11.1823 19.1776 11.3572 19.0486 11.4861C18.9197 11.6151 18.7448 11.6875 18.5625 11.6875H11.6875V18.5625C11.6875 18.7448 11.6151 18.9197 11.4861 19.0486C11.3572 19.1776 11.1823 19.25 11 19.25C10.8177 19.25 10.6428 19.1776 10.5139 19.0486C10.3849 18.9197 10.3125 18.7448 10.3125 18.5625V11.6875H3.4375C3.25516 11.6875 3.0803 11.6151 2.95136 11.4861C2.82243 11.3572 2.75 11.1823 2.75 11C2.75 10.8177 2.82243 10.6428 2.95136 10.5139C3.0803 10.3849 3.25516 10.3125 3.4375 10.3125H10.3125V3.4375C10.3125 3.25516 10.3849 3.0803 10.5139 2.95136C10.6428 2.82243 10.8177 2.75 11 2.75Z" fill="white"/>
                        </g>
                    </svg>
                    <div class="aso-text-[14px]">
                        Add new shape
                    </div>
                </button>
            </div>
            <div class="aso-relative" id="monTableau">
                <table class="aso-w-full aso-text-center aso-px-4 aso-border aso-border-collapse aso-border-0">
                    <thead class="aso-text-[14px] aso-bg-[#f0f0f1]">
                        <tr class="">
                            <th scope="col" class="aso-p-4 aso-px-8 aso-w-12 aso-font-normal">
                                Title 
                            </th>
                            <th scope="col" class="aso-px-6 aso-py-3 aso-font-normal">
                                Image
                            </th>
                            <th scope="col" class="aso-px-6 aso-py-3 aso-font-normal">
                                Additional Price
                            </th>
                            <th scope="col" class="aso-px-6 aso-py-3 aso-font-normal">
                                Action
                            </th>
                            
                        </tr>
                    </thead>
                    <tbody class="aso-bg-white">
                        
                        
                        <tr class="aso-border-t-0 aso-border-l-0 aso-border-r-0 aso-border-b-2 aso-border-solid aso-border-[#f0f0f1]">
                            <td class="aso-w-28 aso-px-8 aso-p-4">
                                Stop
                            </td>
                            <td class="aso-px-6 aso-flex aso-justify-center aso-translate-y-1">
                                <svg class="aso-w-12 aso-h-12" viewBox="0 0 52 37" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                    <rect width="52" height="37" fill="url(#pattern0)"/>
                                    <defs>
                                    <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                                    <use xlink:href="#image0_1133_5185" transform="matrix(0.00613395 0 0 0.00862069 0.101293 0)"/>
                                    </pattern>
                                    <image id="image0_1133_5185" width="130" height="116" xlink:href="data:image/png;base64,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"/>
                                    </defs>
                                </svg>

                            </td>
                            <td class="aso-text-[12px] aso-px-6 aso-py-3">
                                <span class="aso-w-fit aso-text-center aso-rounded-lg aso-px-2 aso-p-1 aso-bg-[#9ACD321F] aso-text-[#466801] aso-border-none">
                                    250$
                                </span>
                            </td>
                            <td class="aso-px-6 aso-flex aso-justify-center -aso-translate-y-3">
                                <button class="aso-bg-transparent aso-border-none aso-text-[#2DD05B] aso-cursor-pointer">
                                    <img class="aso-w-5 aso-h-5" src="../../../../../../../assets/icons/ic_edit.svg" alt="">
                                </button>
                                <button class="aso-bg-transparent aso-border-none aso-text-[#A00000] aso-cursor-pointer">
                                    <img class="aso-w-5 aso-h-5" src="../../../../../../../assets/icons/ic_delete.svg" alt="">
                                </button>
                            </td>
                        </tr>
                        <tr class="aso-border-t-0 aso-border-l-0 aso-border-r-0 aso-border-b-2 aso-border-solid aso-border-[#f0f0f1]">
                            <td class="aso-w-28 aso-px-8 aso-p-4">
                                Triangle
                            </td>
                            <td class="aso-px-6 aso-flex aso-justify-center aso-translate-y-1">
                                <svg class="aso-w-12 aso-h-12" viewBox="0 0 52 37" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                    <rect width="52" height="37" fill="url(#pattern0)"/>
                                    <defs>
                                    <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                                    <use xlink:href="#image0_1133_5185" transform="matrix(0.00613395 0 0 0.00862069 0.101293 0)"/>
                                    </pattern>
                                    <image id="image0_1133_5185" width="130" height="116" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIIAAAB0CAYAAABJyOr5AAAMYmlDQ1BJQ0MgUHJvZmlsZQAASImVlwdYk1cXgO83MklYgQjICHuJIjOAjBBWBAGZgqiEJJAwYkgIKm5qUcG6RRQnWgFRbLUCUgci1lkUt3UUByqVWhy4UPlvSKBW//H853nud9+ce+6555zcb1wAdDr5MlkuqgtAnrRAHhcezJqUksoiPQEIwAAV2ACcL1DIOLGxUQDKUP9PeX0NWkO57KLy9fX4fxV9oUghAABJg5whVAjyILcAgBcLZPICAIghUG89o0CmYjFkAzkMEPIcFWepeaWKM9S8c9AmIY4LuQkAMo3Pl2cBoN0G9axCQRb0o/0QsqtUKJECoGMAOUAg5gshJ0AelZc3XcULIDtAexnkGsjsjM98Zv3Df8awfz4/a5jVeQ0KOUSikOXyZ/2fpfnfkperHFrDDjaaWB4Rp8of1vBGzvRIFdMg90gzomNUtYb8ViJU1x0AlCpWRiSq7VFTgYIL6weYkF2F/JBIyKaQw6S50VEafUamJIwHGe4WdKakgJegmbtEpAiN1/jcJJ8eFzPEmXIuRzO3ni8fXFdl36bMSeRo/N8Qi3hD/l8ViROSIVMBwKiFkqRoyNqQDRQ58ZFqG8yqSMyNHrKRK+NU8dtAZouk4cFq/1hapjwsTmMvy1MM5YuViCW8aA1XFIgTItT1wXYL+IPxG0FuEEk5iUN+RIpJUUO5CEUhoercsXaRNFGTL3ZXVhAcp5nbK8uN1djjZFFuuEpvBdlEURivmYuPK4CbU+0fj5IVxCao48TTs/njY9Xx4IUgCnBBCGABJWwZYDrIBpL2nsYe+Es9Egb4QA6ygAi4aDRDM5IHR6TwGg+KwJ+QREAxPC94cFQECqH+47BWfXUBmYOjhYMzcsAjyHkgEuTC38rBWdLh1ZLAQ6iRfLW6AMaaC5tq7GsdB2qiNBrlkF+WzpAlMZQYQowghhEdcRM8APfDo+A1CDY3nI37DEX7tz3hEaGDcJ9wldBJuDlNUiz/IpYJoBP6D9NknPF5xrgd9OmJB+P+0Dv0jDNxE+CCe8B1OHggXNkTarmauFW5s/5NnsMZfFZzjR3FlYJSRlCCKA5fztR20vYc9qKq6Of1UceaMVxV7vDIl+tzP6uzEPaRX1piS7AD2CnsOHYGO4w1AhZ2DGvCzmNHVDy8hx4O7qGh1eIG48mBfiRfrcfXrKmqpMK1zrXb9YNmDBSIZhaobjDudNksuSRLXMDiwLeAiMWTCkaPYrm5unkAoHqnqB9TL5mD7wqEefZvXX4LAD6lUJn1t45vDcChRwAwXv+ts34Bbw/4rD9yUaCUF6p1uOpCgE8DHXhHGQNzYA0cYEZuwAv4gSAQCsaDGJAAUsBUWGcx3M9yMAPMAQtBCSgDK8E6sBFsBTtADdgL9oNGcBgcB7+Ac+AiuApuwf3TBZ6CXvAa9CMIQkLoCAMxRiwQW8QZcUPYSAASikQhcUgKko5kIVJEicxBvkHKkNXIRmQ7Uov8iBxCjiNnkA7kJnIP6UZeIO9RDKWhBqgZaoeOQdkoB41EE9ApaBaajxahi9DlaAVahe5BG9Dj6Dn0KtqJPkX7MIBpYUzMEnPB2BgXi8FSsUxMjs3DSrFyrAqrx5rhP30Z68R6sHc4EWfgLNwF7uEIPBEX4Pn4PHwZvhGvwRvwNvwyfg/vxT8R6ARTgjPBl8AjTCJkEWYQSgjlhF2Eg4ST8G7qIrwmEolMoj3RG96NKcRs4mziMuJm4j5iC7GD+IDYRyKRjEnOJH9SDIlPKiCVkDaQ9pCOkS6RukhvyVpkC7IbOYycSpaSi8nl5N3ko+RL5MfkfoouxZbiS4mhCCmzKCsoOynNlAuULko/VY9qT/WnJlCzqQupFdR66knqbepLLS0tKy0frYlaEq0FWhVaP2id1rqn9Y6mT3OicWlpNCVtOa2a1kK7SXtJp9Pt6EH0VHoBfTm9ln6Cfpf+VpuhPVqbpy3Unq9dqd2gfUn7mQ5Fx1aHozNVp0inXOeAzgWdHl2Krp0uV5evO0+3UveQ7nXdPj2G3li9GL08vWV6u/XO6D3RJ+nb6YfqC/UX6e/QP6H/gIExrBlchoDxDWMn4ySjy4BoYG/AM8g2KDPYa9Bu0Guob+hhmGQ407DS8IhhJxNj2jF5zFzmCuZ+5jXm+xFmIzgjRCOWjqgfcWnEG6ORRkFGIqNSo31GV43eG7OMQ41zjFcZNxrfMcFNnEwmmsww2WJy0qRnpMFIv5GCkaUj94/8zRQ1dTKNM51tusP0vGmfmblZuJnMbIPZCbMec6Z5kHm2+Vrzo+bdFgyLAAuJxVqLYxZ/sAxZHFYuq4LVxuq1NLWMsFRabrdst+y3srdKtCq22md1x5pqzbbOtF5r3Wrda2NhM8Fmjk2dzW+2FFu2rdh2ve0p2zd29nbJdovtGu2e2BvZ8+yL7OvsbzvQHQId8h2qHK44Eh3ZjjmOmx0vOqFOnk5ip0qnC86os5ezxHmzc8cowiifUdJRVaOuu9BcOC6FLnUu90YzR0eNLh7dOPrZGJsxqWNWjTk15pOrp2uu607XW2P1x44fWzy2eewLNyc3gVul2xV3unuY+3z3JvfnHs4eIo8tHjc8GZ4TPBd7tnp+9PL2knvVe3V723ine2/yvs42YMeyl7FP+xB8gn3m+xz2eefr5Vvgu9/3Lz8Xvxy/3X5PxtmPE43bOe6Bv5U/33+7f2cAKyA9YFtAZ6BlID+wKvB+kHWQMGhX0GOOIyebs4fzLNg1WB58MPgN15c7l9sSgoWEh5SGtIfqhyaGbgy9G2YVlhVWF9Yb7hk+O7wlghARGbEq4jrPjCfg1fJ6x3uPnzu+LZIWGR+5MfJ+lFOUPKp5Ajph/IQ1E25H20ZLoxtjQAwvZk3MnVj72PzYnycSJ8ZOrJz4KG5s3Jy4U/GM+Gnxu+NfJwQnrEi4leiQqExsTdJJSkuqTXqTHJK8Orlz0phJcyedSzFJkaQ0pZJSk1J3pfZNDp28bnJXmmdaSdq1KfZTZk45M9Vkau7UI9N0pvGnHUgnpCen707/wI/hV/H7MngZmzJ6BVzBesFTYZBwrbBb5C9aLXqc6Z+5OvNJln/WmqxucaC4XNwj4Uo2Sp5nR2RvzX6TE5NTnTOQm5y7L4+cl553SKovzZG2TTefPnN6h8xZViLrzPfNX5ffK4+U71IgiimKpgID+PF+Xumg/FZ5rzCgsLLw7YykGQdm6s2Uzjw/y2nW0lmPi8KKvp+NzxbMbp1jOWfhnHtzOXO3z0PmZcxrnW89f9H8rgXhC2oWUhfmLPy12LV4dfGrb5K/aV5ktmjBogffhn9bV6JdIi+5vthv8dYl+BLJkval7ks3LP1UKiw9W+ZaVl72YZlg2dnvxn5X8d3A8szl7Su8VmxZSVwpXXltVeCqmtV6q4tWP1gzYU3DWtba0rWv1k1bd6bco3zreup65frOiqiKpg02G1Zu+LBRvPFqZXDlvk2mm5ZuerNZuPnSlqAt9VvNtpZtfb9Nsu3G9vDtDVV2VeU7iDsKdzzambTz1Pfs72t3mewq2/WxWlrdWRNX01brXVu723T3ijq0TlnXvSdtz8W9IXub6l3qt+9j7iv7Afyg/OGPH9N/vLY/cn/rAfaB+p9sf9p0kHGwtAFpmNXQ2yhu7GxKaeo4NP5Qa7Nf88GfR/9cfdjycOURwyMrjlKPLjo6cKzoWF+LrKXneNbxB63TWm+dmHTiStvEtvaTkSdP/xL2y4lTnFPHTvufPnzG98yhs+yzjee8zjWc9zx/8FfPXw+2e7U3XPC+0HTR52Jzx7iOo5cCLx2/HHL5lyu8K+euRl/tuJZ47cb1tOudN4Q3ntzMvfn8t8Lf+m8tuE24XXpH9075XdO7Vb87/r6v06vzyL2Qe+fvx9+/9UDw4OlDxcMPXYse0R+VP7Z4XPvE7cnh7rDui39M/qPrqexpf0/Jn3p/bnrm8Oynv4L+Ot87qbfrufz5wItlL41fVr/yeNXaF9t393Xe6/43pW+N39a8Y7879T75/eP+GR9IHyo+On5s/hT56fZA3sCAjC/nD34KYLChmZkAvKgGgJ4Cvx0uwmPCZPWZb1AQ9Tl1kMB/YvW5cFC8AKgOAiBxAQBR8BtlC2y2kGmwV32qJwQB1N19uGlEkenupvZFgycewtuBgZdmAJCaAfgoHxjo3zww8BGeUbGbALTkq8+aKiHCs8E2RxW1nxuwAF+I+hz6WY5f9kAVgQf4sv8XsISIr9G+JvQAAACKZVhJZk1NACoAAAAIAAQBGgAFAAAAAQAAAD4BGwAFAAAAAQAAAEYBKAADAAAAAQACAACHaQAEAAAAAQAAAE4AAAAAAAAAkAAAAAEAAACQAAAAAQADkoYABwAAABIAAAB4oAIABAAAAAEAAACCoAMABAAAAAEAAAB0AAAAAEFTQ0lJAAAAU2NyZWVuc2hvdI1j648AAAAJcEhZcwAAFiUAABYlAUlSJPAAAAHWaVRYdFhNTDpjb20uYWRvYmUueG1wAAAAAAA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJYTVAgQ29yZSA1LjQuMCI+CiAgIDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+CiAgICAgIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiCiAgICAgICAgICAgIHhtbG5zOmV4aWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vZXhpZi8xLjAvIj4KICAgICAgICAgPGV4aWY6UGl4ZWxYRGltZW5zaW9uPjEzMDwvZXhpZjpQaXhlbFhEaW1lbnNpb24+CiAgICAgICAgIDxleGlmOlVzZXJDb21tZW50PlNjcmVlbnNob3Q8L2V4aWY6VXNlckNvbW1lbnQ+CiAgICAgICAgIDxleGlmOlBpeGVsWURpbWVuc2lvbj4xMTY8L2V4aWY6UGl4ZWxZRGltZW5zaW9uPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4Kpjx0xAAAABxpRE9UAAAAAgAAAAAAAAA6AAAAKAAAADoAAAA6AAADV75/vjQAAAMjSURBVHgB7Nq7axRRFAbwE0yjW2hMGou4mI1vjQkGLATTiIUKio8FJVjZLIgErcRCYpFCQUQQsbAQRQKxkIiIr9L8ASpiNoZEo9gZsxvL+JiFYSA3N7M7e3bmnLnfNju5M7lz7vl+XDJhmv7+/xA+znegCRCcN1BpACDAASDAQNAB7AhBL5w+AgSn4w8WDwhBL5w+AgSn4w8WDwhBL5w+AgSn4w8WrwLCp+IUXRq8SX8WFoLKBR2taG6ma1cvUGfHekFV1VaKeAiTUzN06GSBfs7O1baymK9ua2uh54/vUrZ9Xcx35rmdaAhaEPhRaMYgFoI2BNoxiISgFYFmDOIgaEegFYMoCN7TwZFT52j2V8nvp/Hd3bWV9vftMcaTGHjxZozefyxab93auoaeDt9W8TQhBsL4xHQFwXJPB7t2bqEnj25RZtVKa/PjPFEu/6ajp88vi8H7A9LDkNvQHmdpNd9LBAQPweF8geZK89YFSEPgF1oNhrUtq+nZyB3RGBKHoBlBmjAkCiENCNKCITEIaUKQBgyJQEgjAu0YYoeQZgSaMcQKwQUEWjHEBsElBBoxxALBRQTaMDQcgssINGFoKAQg8CkQSf8PZMMgAEGAwD+SjKEhEIDAj978loqBHQIQmOEvHpGIgRUCECyO3P6zNAxsEIDAHrrtjCQMLBCAwBZ1+LgUDHVDAILwsMOukIChLghAEBZx9eeTxhAZAhBUH3K1VyaJITKEvQf6aWLyi3WNvT07aOT+DcpkZLxoai1U2IlSeZ6O9Q/Quw/j1sq6tm+i16P3rOejnIgMYfe+PM18/7HkPaW+aLpksQIHw3aGzo4sjb16yFp5ZAi9fXn6+s2EsG1zrvLGLnaC+nLydoaDJwpU/DxtTLQxl6W3L4VAsO0IZ88cp6ErA0bxGKi9AxcvX6cHw6PGL4raEQDById9ABDYW6pzQkDQmRt71YDA3lKdEwKCztzYqwYE9pbqnBAQdObGXjUgsLdU54SAoDM39qoBgb2lOicEBJ25sVcNCOwt1TkhIOjMjb1qQGBvqc4JAUFnbuxVAwJ7S3VOGCeEfwAAAP//m9p7ngAABCZJREFU7Zr7SxRRFMePmJotUn9BgpmhoZFJEoZCQkEUIZaWzwp72EMNqSihfiooi7KkIsoKNTU0UaOyMijUKEIoMVN70It+z1dqWnuCYSd2dp1m9+7es3POL3vvnb1nvvM9H84Mw/j9tgYYiCWJafDl23e7nXk5qXD8aJHdOi/8vwPFJaVQWdtstzE8LBQ6H1bZrbuy4McguGKf2L0Mglh/yWRnEMiUSqxQBkGsv2SyMwhkSiVWKIMg1l8y2RkEMqUSK5RBEOsvmewMAplSiRXKIIj1l0x2BoFMqcQKZRDE+ksmO4NAplRihTIIYv0lk51BIFMqsUIZBLH+kslOAoS4pDT4/NX+w5ToqAhori0HiyWYjOEyCh0cHIbVG/Khb+Cjnbz580Kh44HkH6ag6sUxkXC7ugwssxgGuyrqWBgaGoG16buh5+07zX9L9YVSwsosGHj/SVMoLsYuioKGyrPcGRw6pH3gx+AQpGQUQvebfu0/WFex67a1XHV43MgBw5+q9fZ9gDXpuwBbmKPgzuDIGe316ToB7pozOwTu1l+C8LC52kkMrhoGAc/3uqcfUjILGAaD5qu36YWgqaYcIheEqbe6ZewSCKiAYXC9Dt6GAK/AZRAwCcOALhgLGSBA5W4BARMhDOs27oHhkVGcagY/M/xrix4IQkIscKfugpDbgVqN20DApF2veiE1q5BhUDvsYKwXgsbqcxCzMMJBFvctuxUElMUwTF8c2SBAxW4HAZMyDOiCdsgIASoVAgImRhhSMvbC6M8xnGqG2Z4Z9ECAb2ObrK/oPXE7UBdFGAh4kucvuyEtdx/DYPVCLwQNVWXWt7KR6hp5ZCwUBLwChkF+CLBOwkEwOwyydwKsD4ZHQMATYWdYn10EY+PjONUMX3tm0ANB8MwgaLx53iu3A3URPAYCnrT9WRds2rrfFDDoheDWjTMQHxetrolXxh4FwSwwUIMA6+JxEHwdBooQeA0EBYb0LcUwMfELp5pB7ZlBDwRBgYFQb/1gR4bbgdp0r3QERcDjpy8ge/tBn4BBLwQ1FaWwfFmsYoE0v14FAV3wBRioQ4B18DoI1GHwBQikAUGBITPvAExOTuJUM2R7ZtADQUDADKi7dlrK24HaZCk6giLo/qN2yNlxSJlq/iIMyUnxmsc8vdja1un0a2PUU1NxShq9zvyRCgQU2trWAZvzS5x2BmcXJMsx7ASVl0/AisSlskhyqkM6EFAtdRioQYCeSwmCAkPuzsMwNTWFUzLh7+8P1VdOkukEirHSgoACW+49gW0FR8jAgBBcv3gMViUnKP6S+ZUaBEowUIYAfZYeBAowUIeADAgolEOsAyQ6glgLODs6wCAwB38dYBAYBAaBGbA5wB3B5oWpRwyCqctvu3gGweaFqUcMgqnLb7t4BsHmhalHfwC8CjwOAhCniwAAAABJRU5ErkJggg=="/>
                                    </defs>
                                </svg>

                            </td>
                            <td class="aso-text-[12px] aso-px-6 aso-py-3">
                                <span class="aso-w-fit aso-text-center aso-rounded-lg aso-px-2 aso-p-1 aso-bg-[#9ACD321F] aso-text-[#466801] aso-border-none">
                                    250$
                                </span>
                            </td>
                            <td class="aso-px-6 aso-flex aso-justify-center -aso-translate-y-3">
                                <button class="aso-bg-transparent aso-border-none aso-text-[#2DD05B] aso-cursor-pointer">
                                    <img class="aso-w-5 aso-h-5" src="../../../../../../../assets/icons/ic_edit.svg" alt="">
                                </button>
                                <button class="aso-bg-transparent aso-border-none aso-text-[#A00000] aso-cursor-pointer">
                                    <img class="aso-w-5 aso-h-5" src="../../../../../../../assets/icons/ic_delete.svg" alt="">
                                </button>
                            </td>
                        </tr>
                        <tr class="aso-border-t-0 aso-border-l-0 aso-border-r-0 aso-border-b-2 aso-border-solid aso-border-[#f0f0f1]">
                            <td class="aso-w-28 aso-px-8 aso-p-4">
                                Thorny
                            </td>
                            <td class="aso-px-6 aso-flex aso-justify-center aso-translate-y-1">
                                <svg class="aso-w-12 aso-h-12" viewBox="0 0 52 37" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                    <rect width="52" height="37" fill="url(#pattern0)"/>
                                    <defs>
                                    <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                                    <use xlink:href="#image0_1133_5185" transform="matrix(0.00613395 0 0 0.00862069 0.101293 0)"/>
                                    </pattern>
                                    <image id="image0_1133_5185" width="130" height="116" xlink:href="data:image/png;base64,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"/>
                                    </defs>
                                </svg>

                            </td>
                            <td class="aso-text-[12px] aso-px-6 aso-py-3">
                                <span class="aso-w-fit aso-text-center aso-rounded-lg aso-px-2 aso-p-1 aso-bg-[#9ACD321F] aso-text-[#466801] aso-border-none">
                                    250$
                                </span>
                            </td>
                            <td class="aso-px-6 aso-flex aso-justify-center -aso-translate-y-3">
                                <button class="aso-bg-transparent aso-border-none aso-text-[#2DD05B] aso-cursor-pointer">
                                    <img class="aso-w-5 aso-h-5" src="../../../../../../../assets/icons/ic_edit.svg" alt="">
                                </button>
                                <button class="aso-bg-transparent aso-border-none aso-text-[#A00000] aso-cursor-pointer">
                                    <img class="aso-w-5 aso-h-5" src="../../../../../../../assets/icons/ic_delete.svg" alt="">
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="aso-space-y-2" v-show="selectShape">
            <div class="aso-text-[16px] aso-font-bold aso-px-4 aso-py-4 aso-bg-[#F8F9FB]">
                Add new shape
            </div>
            <div class="aso-flex aso-justify-between aso-px-4 aso-py-4 aso-bg-[#F8F9FB]">
                <div class="aso-w-2/5 aso-space-y-2 aso-flex aso-flex-col">
                    <label for="" class="aso-text-[12px] aso-text[#444444] aso-font-normal">Select color</label>
                    <select type="text" class="aso-rounded aso-w-full aso-h-[30px]">
                        <option value="">
                            <button>
                                <div>

                                </div>
                            </button>
                        </option>
                    </select>
                    
                </div>
                <div class="aso-w-2/5 aso-space-y-2 aso-text-[12px] aso-flex aso-flex-col">
                    <label for="" class="aso-text-[12px] aso-text[#444444] aso-font-normal">Additional Price</label>
                    <input type="text" class="aso-rounded aso-w-full aso-h-[30px]">
                    
                </div>
            </div>
            <div class="aso-bg-[#F8F9FB] aso-flex aso-space-x-4 aso-px-4 aso-py-4 aso-justify-end aso-items-end">
                <div class="aso-bg-[#016464] aso-rounded">
                    <button class="aso-flex aso-bg-transparent aso-w-fit aso-space-x-2 aso-h-fit aso-px-8 aso-p-2 aso-border-none aso-text-white aso-opacity-90 hover:aso-border-none hover:aso-text-white hover:aso-opacity-100 aso-cursor-pointer" @click="back">
                        <svg class="aso-w-6 aso-h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 12L5 8V11L17.17 11C17.3756 10.414 17.7586 9.90661 18.2657 9.54821C18.7729 9.18981 19.379 8.9982 20 9C20.7956 9 21.5587 9.31607 22.1213 9.87868C22.6839 10.4413 23 11.2044 23 12C23 12.7956 22.6839 13.5587 22.1213 14.1213C21.5587 14.6839 20.7956 15 20 15C18.69 15 17.58 14.17 17.17 13L5 13V16L1 12Z" fill="currentColor"/>
                        </svg>

                        <div class="aso-font-semibold aso-text-[16px]">Back</div>
                    </button>
                </div>
                <div class="aso-bg-[#016464] aso-rounded">
                    <button class="aso-flex aso-bg-transparent aso-w-fit aso-space-x-2 aso-h-fit aso-text-white  aso-px-12 aso-p-2.5 aso-border-none aso-opacity-90 hover:aso-border-none hover:aso-text-white hover:aso-opacity-100 aso-cursor-pointer">
                        <div class="aso-font-semibold aso-text-[16px]">Save</div>
                    </button>
                </div>
            </div>
        </div>
        
    </div>
</template>
<script setup>
    import { ref } from "vue";
    const selectShape = ref(false);
    const listShape = ref(true);
    const newShape = () => {
        listShape.value = false;
        selectShape.value = true;
    }
    const back = () => {
        listShape.value = true;
        selectShape.value = false;
    }
    
</script>
