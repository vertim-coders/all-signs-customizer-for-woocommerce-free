<template>
    <div class="asowp-w-full">
        <div class="asowp-overflow-hidden asowp-w-[86%] asowp-justify-between asowp-flex asowp-cursor-pointer asowp-items-center asowp-bg-white asowp-py-2 asowp-text-sm asowp-text-gray-700 asowp-gap-2 asowp-fixed asowp-z-[9999] asowp-rounded-[10px] asowp-border-[2px] asowp-border-[rgba(0,0,0,.15)] asowp-border-solid asowp-top-[92px] asowp-px-2 asowp-bg-white asowp-items-center">
            <!--<div class="asowp-grid asowp-grid-cols-5 asowp-justify-center asowp-items-center asowp-p-4 asowp-text-sm asowp-font-medium asowp-text-gray-900 asowp-bg-gray-100 asowp-border-t asowp-border-b asowp-border-gray-200 asowp-gap-x-16">
                <div class="asowp-flex asowp-items-center asowp-justify-center">Material Name</div>
                <div class="asowp-flex asowp-items-center asowp-justify-center">Description</div>
                <div class="asowp-flex asowp-items-center asowp-justify-center">Icon</div>
                <div class="asowp-flex asowp-items-center asowp-justify-center">Behavior (type)</div>
                <div class="asowp-flex asowp-items-center asowp-justify-center">Actions</div>
            </div>-->
            
            <div class="asowp-flex asowp-space-x-2">
                <div
                    v-for="(material, key) in materials"
                    :key="key"
                    :class="[
                        'asowp-rounded-[5px] asowp-p-1 asowp-mb-1',
                        key === activeMaterialIndex
                        ? 'asowp-bg-[#016464] asowp-text-white'
                        : 'asowp-bg-transparent '
                    ]"
                >
                    
                    <button
                        class="asowp-flex asowp-space-x-2 asowp-bg-transparent asowp-border-none asowp-rounded-[5px] asowp-justify-center asowp-items-center asowp-w-full asowp-cursor-pointer"
                        @click="() => { 
                            activeMaterialIndex = key
                            redirectToMaterial(key, material.name, material.type)
                        }"
                    >
                        <div
                        class="asowp-overflow-hidden asowp-flex asowp-pl-4 asowp-whitespace-nowrap asowp-space-x-4"
                        >
                            <span class="asowp-flex asowp-justify-center asowp-items-center">
                                {{ material.name }}
                            </span>
                        </div>
                        
                        <div class="asowp-relative">
                            <button class="asowp-bg-white asowp-rounded-[5px] asowp-p-0 asowp-flex asowp-justify-center asowp-border-none asowp-cursor-pointer" @click="handleOpenMaterialParams(key)" style="box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.25);">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="asowp-w-6 asowp-h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                                </svg>
                            </button>
                            
                        </div>
                        
                    </button>
                    
                </div>

            </div>
            <button class="asowp-flex asowp-w-fit asowp-h-[fit] asowp-rounded asowp-bg-[#016464] asowp-px-4 asowp-space-x-2 asowp-p-1.5 asowp-border-none asowp-text-white asowp-opacity-90 hover:asowp-opacity-100 asowp-cursor-pointer" @click="addComponent">
                <svg class="asowp-w-5 asowp-h-5" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="plus-lg">
                    <path id="Vector" fill-rule="evenodd" clip-rule="evenodd" d="M11 2.75C11.1823 2.75 11.3572 2.82243 11.4861 2.95136C11.6151 3.0803 11.6875 3.25516 11.6875 3.4375V10.3125H18.5625C18.7448 10.3125 18.9197 10.3849 19.0486 10.5139C19.1776 10.6428 19.25 10.8177 19.25 11C19.25 11.1823 19.1776 11.3572 19.0486 11.4861C18.9197 11.6151 18.7448 11.6875 18.5625 11.6875H11.6875V18.5625C11.6875 18.7448 11.6151 18.9197 11.4861 19.0486C11.3572 19.1776 11.1823 19.25 11 19.25C10.8177 19.25 10.6428 19.1776 10.5139 19.0486C10.3849 18.9197 10.3125 18.7448 10.3125 18.5625V11.6875H3.4375C3.25516 11.6875 3.0803 11.6151 2.95136 11.4861C2.82243 11.3572 2.75 11.1823 2.75 11C2.75 10.8177 2.82243 10.6428 2.95136 10.5139C3.0803 10.3849 3.25516 10.3125 3.4375 10.3125H10.3125V3.4375C10.3125 3.25516 10.3849 3.0803 10.5139 2.95136C10.6428 2.82243 10.8177 2.75 11 2.75Z" fill="white"/>
                    </g>
                </svg>
                <div class="asowp-text-[14px]">
                    Add new Material
                </div>
            </button>
        </div>
        <div v-for="(material,key) in materials" :key="key">
            <div class="asowp-bg-white asowp-shadow-md asowp-flex asowp-flex-col asowp-space-x-2 asowp-p-2 asowp-absolute asowp-top-24 asowp-z-[9999] asowp-left-10 asowp-rounded" v-if="showParams[key]" @click.self="showParams[key]=false;">
                <!--<button class="asowp-bg-transparent asowp-border-none asowp-text-[#FF6600] asowp-cursor-pointer"  @click="selectCloneMaterial(material)">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="asowp-w-6 asowp-h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" />
                    </svg>
                </button>-->
                <button class="asowp-bg-transparent asowp-border-none asowp-text-[#2DD05B] asowp-cursor-pointer"  @click="selectMaterialEdit(material,key)">
                    <img class="asowp-w-5 asowp-h-5" src="../../../../../../assets/icons/ic_edit.svg" alt="">
                    <span>Edit</span>
                </button>
                <button class="asowp-bg-transparent asowp-border-none asowp-text-[#A00000] asowp-cursor-pointer"  @click="selectMaterialDelete(key,material.name)">
                    <img class="asowp-w-5 asowp-h-5" src="../../../../../../assets/icons/ic_delete.svg" alt="">
                    <span>Delete</span>
                </button>
            </div>

        </div>
    </div>


    <div class="">
        <div class="asowp-flex asowp-space-x-2" v-if="contentComponent">
            <div class="asowp-bg-white asowp-flex asowp-h-full asowp-flex-col asowp-rounded-[10px] asowp-border-[2px] asowp-border-[rgba(0,0,0,.15)] asowp-border-solid  asowp-justify-center asowp-items-center asowp-mt-20 asowp-p-3">
                <div class="asowp-w-full">
                    <button @click="()=>router.push('/configs/'+config.replace(/ /,'-')+'/'+configID+'/materials/'+material.replace(/ /,'-')+'/'+materialId+'/simple/sizes')" :class="`asowp-flex asowp-w-full asowp-items-center asowp-justify-center asowp-h-fit asowp-px-6 asowp-p-3 asowp-bg-transparent asowp-space-x-2 asowp-text-black ${route.name == 'Simple-Sizes' ? 'asowp-border-b-[3px] asowp-border-r-0 asowp-border-l-0 asowp-border-t-0 asowp-border-solid asowp-border-b-[#016464] asowp-text-[#016464] asowp-bg-[#F9F9F9]' : 'asowp-border-none'} hover:asowp-border-b-[3px] hover:asowp-border-r-0 hover:asowp-border-l-0 hover:asowp-border-t-0 hover:asowp-border-solid hover:asowp-border-b-[#016464] hover:asowp-bg-[#F9F9F9] hover:asowp-text-[#016464] asowp-cursor-pointer`">
                        <svg class="asowp-w-5 asowp-h-5" viewBox="0 0 47 41" fill="black" xmlns="http://www.w3.org/2000/svg">
                            <g id="fluent:keyboard-layout-resize-24-filled">
                            <path id="Vector" d="M41.5083 17.9375C41.8623 17.9375 42.2043 18.0496 42.4711 18.2531C42.7379 18.4566 42.9115 18.7378 42.9596 19.0445L42.9733 19.2187V33.7396C42.9734 34.7135 42.5508 35.6512 41.7908 36.3632C41.0308 37.0751 39.9901 37.5081 38.8791 37.5748L38.5783 37.5833H34.6716C34.3004 37.5832 33.9431 37.4599 33.6719 37.2383C33.4007 37.0167 33.2358 36.7133 33.2105 36.3894C33.1852 36.0655 33.3014 35.7453 33.5356 35.4935C33.7699 35.2417 34.1047 35.077 34.4724 35.0328L34.6716 35.0208H38.5783C38.9323 35.0208 39.2743 34.9087 39.5411 34.7052C39.8079 34.5017 39.9815 34.2206 40.0296 33.9138L40.0433 33.7396V19.2187C40.0433 18.8789 40.1976 18.553 40.4724 18.3128C40.7471 18.0725 41.1197 17.9375 41.5083 17.9375ZM41.5083 3.41666L41.645 3.42178L41.8423 3.45082L41.9751 3.48328L42.0923 3.52257L42.2291 3.58236L42.3892 3.67461L42.5455 3.7942L42.6451 3.88986L42.733 3.99578L42.8307 4.14953L42.8639 4.21274L42.9108 4.32549C42.9323 4.3887 42.9498 4.45532 42.9596 4.52366L42.9733 4.69791V13.2396C42.9732 13.5642 42.8322 13.8767 42.5788 14.1139C42.3254 14.3511 41.9785 14.4953 41.6081 14.5175C41.2378 14.5396 40.8717 14.4379 40.5838 14.2331C40.2958 14.0282 40.1075 13.7354 40.057 13.4138L40.0433 13.2396V7.78999L31.3119 15.4262C31.0501 15.6534 30.7001 15.7858 30.3316 15.7972C29.9631 15.8085 29.6032 15.6979 29.3239 15.4875C29.0445 15.277 28.8662 14.9821 28.8244 14.6617C28.7827 14.3413 28.8807 14.0189 29.0988 13.7589L29.2413 13.6154L37.9688 5.97916H31.7416C31.3876 5.97914 31.0456 5.86702 30.7788 5.66351C30.512 5.46001 30.3384 5.17889 30.2903 4.87216L30.2766 4.69791C30.2766 4.38829 30.4048 4.08916 30.6375 3.85582C30.8702 3.62248 31.1916 3.47072 31.5424 3.42861L31.7416 3.41666H41.5083ZM25.8816 17.9375C26.9953 17.9374 28.0674 18.307 28.8815 18.9717C29.6955 19.6363 30.1906 20.5465 30.2668 21.5182L30.2766 21.7812V33.7396C30.2768 34.7135 29.8541 35.6512 29.0941 36.3632C28.3341 37.0751 27.2935 37.5081 26.1824 37.5748L25.8816 37.5833H8.30162C7.18797 37.5834 6.11579 37.2138 5.30178 36.5492C4.48776 35.8845 3.99261 34.9743 3.91638 34.0027L3.90662 33.7396V21.7812C3.90648 20.8073 4.32911 19.8696 5.0891 19.1577C5.8491 18.4457 6.88977 18.0127 8.0008 17.946L8.30162 17.9375H25.8816ZM20.9983 29.8958H13.1849C12.3841 29.8958 11.7199 30.5279 11.7199 31.1771C11.7199 31.8262 12.2708 32.3627 12.9857 32.4464L13.1849 32.4583H20.9983C21.7991 32.4583 22.4633 31.8262 22.4633 31.1771C22.4633 30.8675 22.3351 30.5683 22.1024 30.335C21.8697 30.1016 21.5483 29.9499 21.1975 29.9078L20.9983 29.8958ZM11.7199 23.0625C11.2019 23.0625 10.7051 23.2425 10.3387 23.5629C9.97241 23.8832 9.76662 24.3177 9.76662 24.7708C9.76662 25.2239 9.97241 25.6584 10.3387 25.9788C10.7051 26.2992 11.2019 26.4792 11.7199 26.4792C12.238 26.4792 12.7348 26.2992 13.1012 25.9788C13.4675 25.6584 13.6733 25.2239 13.6733 24.7708C13.6733 24.3177 13.4675 23.8832 13.1012 23.5629C12.7348 23.2425 12.238 23.0625 11.7199 23.0625ZM22.4633 23.0625C21.9452 23.0625 21.4484 23.2425 21.0821 23.5629C20.7157 23.8832 20.5099 24.3177 20.5099 24.7708C20.5099 25.2239 20.7157 25.6584 21.0821 25.9788C21.4484 26.2992 21.9452 26.4792 22.4633 26.4792C22.9813 26.4792 23.4782 26.2992 23.8445 25.9788C24.2108 25.6584 24.4166 25.2239 24.4166 24.7708C24.4166 24.3177 24.2108 23.8832 23.8445 23.5629C23.4782 23.2425 22.9813 23.0625 22.4633 23.0625ZM17.0916 23.0625C16.5736 23.0625 16.0767 23.2425 15.7104 23.5629C15.3441 23.8832 15.1383 24.3177 15.1383 24.7708C15.1383 25.2239 15.3441 25.6584 15.7104 25.9788C16.0767 26.2992 16.5736 26.4792 17.0916 26.4792C17.6097 26.4792 18.1065 26.2992 18.4728 25.9788C18.8392 25.6584 19.0449 25.2239 19.0449 24.7708C19.0449 24.3177 18.8392 23.8832 18.4728 23.5629C18.1065 23.2425 17.6097 23.0625 17.0916 23.0625ZM24.9049 3.41666C25.2761 3.41676 25.6334 3.54007 25.9046 3.76169C26.1759 3.98331 26.3408 4.28671 26.3661 4.61058C26.3914 4.93445 26.2752 5.25464 26.0409 5.50646C25.8067 5.75828 25.4719 5.92295 25.1042 5.9672L24.9049 5.97916H8.30162C7.9476 5.97917 7.60556 6.0913 7.33876 6.2948C7.07196 6.4983 6.89844 6.77942 6.85029 7.08616L6.83662 7.26041V14.0937C6.8365 14.4184 6.6955 14.7308 6.4421 14.9681C6.18869 15.2053 5.84179 15.3495 5.47147 15.3716C5.10115 15.3937 4.73504 15.2921 4.44711 15.0873C4.15917 14.8824 3.97088 14.5896 3.92029 14.268L3.90662 14.0937V7.26041C3.90648 6.28644 4.32911 5.34875 5.0891 4.63683C5.8491 3.92491 6.88977 3.49186 8.0008 3.4252L8.30162 3.41666H24.9049Z" fill="currentColor"/>
                            </g>
                        </svg>
                        <div class="asowp-text-[14px]">
                            Sizes
                        </div>
                    </button>
                </div>
                <div class="asowp-w-full">
                    <button @click="()=>router.push('/configs/'+config.replace(/ /,'-')+'/'+configID+'/materials/'+material.replace(/ /,'-')+'/'+materialId+'/simple/colors')" :class="`asowp-flex asowp-w-full asowp-items-center asowp-justify-center asowp-h-fit asowp-p-3 asowp-bg-transparent asowp-space-x-2 asowp-text-black ${route.name == 'Simple-Colors' ? 'asowp-border-b-[3px] asowp-border-r-0 asowp-border-l-0 asowp-border-t-0 asowp-border-solid asowp-border-b-[#016464] asowp-text-[#016464] asowp-bg-[#F9F9F9]' : 'asowp-border-none'} hover:asowp-border-b-[3px] hover:asowp-border-r-0 hover:asowp-border-l-0 hover:asowp-border-t-0 hover:asowp-border-solid hover:asowp-border-b-[#016464] hover:asowp-bg-[#F9F9F9] hover:asowp-text-[#016464] asowp-cursor-pointer`">
                        <svg class="asowp-w-5 asowp-h-5" viewBox="0 0 40 41" fill="black" xmlns="http://www.w3.org/2000/svg">
                            <g id="tdesign:fill-color-1">
                            <path id="Vector" d="M20.0004 0.0888367L39.9137 20.5L36.6671 23.8278V23.9167H36.5804L24.7137 36.08C23.4635 37.3611 21.7682 38.0807 20.0004 38.0807C18.2326 38.0807 16.5373 37.3611 15.2871 36.08L4.8004 25.3329C4.18131 24.6983 3.69021 23.945 3.35516 23.1159C3.02011 22.2869 2.84766 21.3983 2.84766 20.5009C2.84766 19.6035 3.02011 18.7149 3.35516 17.8858C3.69021 17.0567 4.18131 16.3034 4.8004 15.6688L12.1971 8.08554L7.64373 3.41667L10.0004 1.00109L14.5554 5.66996L20.0004 0.0888367ZM14.5554 10.5028L7.15873 18.0844C6.50873 18.7507 6.18207 19.6253 6.18207 20.5H35.1987L20.0004 4.92L16.9137 8.08554L22.3571 13.6667L20.0004 16.0823L14.5554 10.5028ZM8.13373 23.9167L17.6437 33.6644C18.2688 34.3049 19.1165 34.6648 20.0004 34.6648C20.8843 34.6648 21.732 34.3049 22.3571 33.6644L31.8671 23.9167H8.13373ZM36.2504 31.4145L38.4404 34.2504C39.4087 35.5043 39.4087 37.4074 38.4404 38.6596C38.1824 39.0048 37.8511 39.2852 37.4717 39.4797C37.0922 39.6741 36.6746 39.7775 36.2504 39.782C35.3671 39.782 34.5837 39.3378 34.0604 38.6596C33.0921 37.4074 33.0921 35.5043 34.0604 34.2504L36.2504 31.4145Z" fill="currentColor"/>
                            </g>
                        </svg>
    
                        <div class="asowp-text-[14px]">
                            Colors
                        </div>
                    </button>
                </div>
                <div class="asowp-w-full">
                    <button @click="()=>router.push('/configs/'+config.replace(/ /,'-')+'/'+configID+'/materials/'+material.replace(/ /,'-')+'/'+materialId+'/simple/shapes')" :class="`asowp-flex asowp-w-full asowp-items-center asowp-justify-center asowp-h-fit asowp-px-6 asowp-p-3 asowp-bg-transparent asowp-space-x-2 asowp-text-black ${route.name == 'Simple-Shapes' ? 'asowp-border-b-[3px] asowp-border-r-0 asowp-border-l-0 asowp-border-t-0 asowp-border-solid asowp-border-b-[#016464] asowp-text-[#016464] asowp-bg-[#F9F9F9]' : 'asowp-border-none'} hover:asowp-border-b-[3px] hover:asowp-border-r-0 hover:asowp-border-l-0 hover:asowp-border-t-0 hover:asowp-border-solid hover:asowp-border-b-[#016464] hover:asowp-bg-[#F9F9F9] hover:asowp-text-[#016464] asowp-cursor-pointer`">
                        <svg class="asowp-w-5 asowp-h-5" viewBox="0 0 40 41" fill="black" xmlns="http://www.w3.org/2000/svg">
                            <g id="mdi:shape">
                            <path id="Vector" d="M18.3333 23.0625V36.7292H5V23.0625H18.3333ZM20 3.41666L29.1667 18.7917H10.8333L20 3.41666ZM29.1667 22.2083C33.3333 22.2083 36.6667 25.625 36.6667 29.8958C36.6667 34.1667 33.3333 37.5833 29.1667 37.5833C25 37.5833 21.6667 34.1667 21.6667 29.8958C21.6667 25.625 25 22.2083 29.1667 22.2083Z" fill="currentColor"/>
                            </g>
                        </svg>
    
                        <div class="asowp-text-[14px]">
                            Shapes
                        </div>
                    </button>
                </div>
                <div class="asowp-w-full">
                    <button @click="()=>router.push('/configs/'+config.replace(/ /,'-')+'/'+configID+'/materials/'+material.replace(/ /,'-')+'/'+materialId+'/simple/borders')" :class="`asowp-flex asowp-w-full asowp-items-center asowp-justify-center asowp-h-fit asowp-px-6 asowp-p-3 asowp-bg-transparent asowp-space-x-2 asowp-text-black ${route.name == 'Simple-Borders' ? 'asowp-border-b-[3px] asowp-border-r-0 asowp-border-l-0 asowp-border-t-0 asowp-border-solid asowp-border-b-[#016464] asowp-text-[#016464] asowp-bg-[#F9F9F9]' : 'asowp-border-none'} hover:asowp-border-b-[3px] hover:asowp-border-r-0 hover:asowp-border-l-0 hover:asowp-border-t-0 hover:asowp-border-solid hover:asowp-border-b-[#016464] hover:asowp-bg-[#F9F9F9] hover:asowp-text-[#016464] asowp-cursor-pointer`">
                        <svg class="asowp-w-5 asowp-h-5" viewBox="0 0 40 40" fill="black" xmlns="http://www.w3.org/2000/svg">
                            <g id="zondicons:border-all">
                            <path id="Vector" d="M22 22V34H34V22H22ZM22 18H34V6H22V18ZM18 22H6V34H18V22ZM18 18V6H6V18H18ZM2 36V2H38V38H2V36Z" fill="currentColor"/>
                            </g>
                        </svg>
                        <div class="asowp-text-[14px]">
                            Borders
                        </div>
                    </button>
                </div>
                <div class="asowp-w-full">
                    <button @click="()=>router.push('/configs/'+config.replace(/ /,'-')+'/'+configID+'/materials/'+material.replace(/ /,'-')+'/'+materialId+'/simple/fixing-methods')" :class="`asowp-flex asowp-w-full asowp-items-center asowp-justify-center asowp-h-fit asowp-p-3 asowp-bg-transparent asowp-space-x-2 asowp-text-black ${route.name == 'Simple-FixingMethods' ? 'asowp-border-b-[3px] asowp-border-r-0 asowp-border-l-0 asowp-border-t-0 asowp-border-solid asowp-border-b-[#016464] asowp-text-[#016464] asowp-bg-[#F9F9F9]' : 'asowp-border-none'} hover:asowp-border-b-[3px] hover:asowp-border-r-0 hover:asowp-border-l-0 hover:asowp-border-t-0 hover:asowp-border-solid hover:asowp-border-b-[#016464] hover:asowp-bg-[#F9F9F9] hover:asowp-text-[#016464] asowp-cursor-pointer`">
                        <svg class="asowp-w-5 asowp-h-5" viewBox="0 0 40 40" fill="black" xmlns="http://www.w3.org/2000/svg">
                            <g id="uil:screw">
                            <path id="Vector" d="M36.183 16.8667L23.133 3.81666C22.9138 3.59622 22.6374 3.44147 22.3349 3.36988C22.0324 3.29829 21.716 3.31272 21.4212 3.41153C21.1265 3.51035 20.8653 3.68962 20.6671 3.92908C20.4689 4.16855 20.3417 4.45867 20.2997 4.76666L19.083 13.3333L15.7497 16.6667L15.1997 16.35C14.8408 16.1755 14.4313 16.1356 14.0455 16.2374C13.6597 16.3393 13.3232 16.5762 13.0972 16.905C12.8713 17.2339 12.7708 17.6329 12.8141 18.0296C12.8573 18.4263 13.0415 18.7942 13.333 19.0667L11.4163 21.0167L10.8663 20.7C10.5084 20.5356 10.1038 20.5033 9.72429 20.6089C9.3448 20.7144 9.01495 20.9509 8.79324 21.2765C8.57153 21.6021 8.4723 21.9956 8.51314 22.3874C8.55398 22.7792 8.73225 23.1438 9.01634 23.4167L7.06634 25.35L6.53301 25C6.34278 24.8898 6.13264 24.8183 5.91468 24.7897C5.69671 24.761 5.47524 24.7758 5.263 24.8331C5.05077 24.8904 4.85197 24.9892 4.67806 25.1237C4.50415 25.2581 4.35856 25.4257 4.24967 25.6167C4.06145 25.9599 4.00005 26.3584 4.07623 26.7424C4.15242 27.1264 4.36133 27.4713 4.66634 27.7167L3.81634 28.5667C3.662 28.7231 3.5427 28.9106 3.46634 29.1167C3.38094 29.317 3.33564 29.5322 3.33301 29.75V35C3.33301 35.442 3.5086 35.8659 3.82116 36.1785C4.13372 36.4911 4.55765 36.6667 4.99967 36.6667H10.2163C10.4341 36.664 10.6493 36.6187 10.8497 36.5333C11.0557 36.457 11.2432 36.3377 11.3997 36.1833L14.233 33.3333L14.783 33.65C14.9722 33.7609 15.1815 33.8333 15.3988 33.8632C15.6161 33.893 15.8371 33.8797 16.0492 33.824C16.2613 33.7682 16.4604 33.6712 16.6349 33.5384C16.8095 33.4055 16.9561 33.2396 17.0663 33.05C17.2609 32.7069 17.3275 32.3059 17.2543 31.9184C17.181 31.5308 16.9727 31.1818 16.6663 30.9333L18.6163 29L19.1663 29.3167C19.4154 29.4578 19.6967 29.5325 19.983 29.5333C20.302 29.5046 20.606 29.3845 20.8586 29.1875C21.1111 28.9904 21.3016 28.7248 21.4071 28.4223C21.5126 28.1199 21.5287 27.7934 21.4535 27.4821C21.3783 27.1707 21.2149 26.8876 20.983 26.6667L22.933 24.7333L23.483 25.05C23.7321 25.1912 24.0134 25.2658 24.2997 25.2667C24.64 25.2606 24.9704 25.1504 25.2462 24.951C25.5221 24.7516 25.7303 24.4725 25.8429 24.1512C25.9554 23.83 25.9669 23.4819 25.8757 23.154C25.7846 22.826 25.5952 22.5338 25.333 22.3167L26.6497 21L35.233 19.7833C35.5415 19.7395 35.8315 19.6101 36.0701 19.4097C36.3087 19.2094 36.4864 18.9462 36.583 18.65C36.6973 18.3461 36.7203 18.0154 36.6492 17.6986C36.5782 17.3818 36.4161 17.0926 36.183 16.8667ZM9.53301 33.3333H6.66634V30.4667L7.61634 29.5167L11.2497 31.6667L9.53301 33.3333ZM13.683 29.1667L9.99967 27.0833L11.8997 25.1833L15.5163 27.2667L13.683 29.1667ZM18.033 24.8333L14.3997 22.7333L16.3163 20.8333L19.9997 22.9167L18.033 24.8333ZM22.383 20.4833L18.7497 18.3333L20.6497 16.4333L23.5163 19.3L22.383 20.4833ZM26.4663 17.5833L22.4163 13.5333L23.133 8.53333L31.4663 16.8667L26.4663 17.5833Z" fill="currentColor"/>
                            </g>
                        </svg>
                        <div class="asowp-text-[14px]">
                            Fixing Methods
                        </div>
                    </button>
                </div>
                
                <div class="asowp-w-full">
                    <button @click="()=>router.push('/configs/'+config.replace(/ /,'-')+'/'+configID+'/materials/'+material.replace(/ /,'-')+'/'+materialId+'/simple/text-images')" :class="`asowp-flex asowp-w-full asowp-items-center asowp-justify-center asowp-h-fit asowp-p-3 asowp-bg-transparent asowp-space-x-2 asowp-text-black ${route.name == 'Simple-TextImages' ? 'asowp-border-b-[3px] asowp-border-r-0 asowp-border-l-0 asowp-border-t-0 asowp-border-solid asowp-border-b-[#016464] asowp-text-[#016464] asowp-bg-[#F9F9F9]' : 'asowp-border-none'} hover:asowp-border-b-[3px] hover:asowp-border-r-0 hover:asowp-border-l-0 hover:asowp-border-t-0 hover:asowp-border-solid hover:asowp-border-b-[#016464] hover:asowp-bg-[#F9F9F9] hover:asowp-text-[#016464] asowp-cursor-pointer`">
                        <svg class="asowp-w-5 asowp-h-5" viewBox="0 0 46 47" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                        <div class="asowp-text-[14px]">
                            Text/Image
                        </div>
                    </button>
                </div>
                <div class="asowp-w-full">
                    <button @click="()=>router.push('/configs/'+config.replace(/ /,'-')+'/'+configID+'/materials/'+material.replace(/ /,'-')+'/'+materialId+'/simple/discounts')" :class="`asowp-flex asowp-w-full asowp-items-center asowp-justify-center asowp-h-fit asowp-px-6 asowp-p-3 asowp-bg-transparent asowp-space-x-2 asowp-text-black ${route.name == 'Simple-Discounts' ? 'asowp-border-b-[3px] asowp-border-r-0 asowp-border-l-0 asowp-border-t-0 asowp-border-solid asowp-border-b-[#016464] asowp-text-[#016464] asowp-bg-[#F9F9F9]' : 'asowp-border-none'} hover:asowp-border-b-[3px] hover:asowp-border-r-0 hover:asowp-border-l-0 hover:asowp-border-t-0 hover:asowp-border-solid hover:asowp-border-b-[#016464] hover:asowp-bg-[#F9F9F9] hover:asowp-text-[#016464] asowp-cursor-pointer`">
                        <svg class="asowp-w-5 asowp-h-5" viewBox="0 0 40 41" fill="black" xmlns="http://www.w3.org/2000/svg">
                            <g id="mdi:shape">
                            <path id="Vector" d="M18.3333 23.0625V36.7292H5V23.0625H18.3333ZM20 3.41666L29.1667 18.7917H10.8333L20 3.41666ZM29.1667 22.2083C33.3333 22.2083 36.6667 25.625 36.6667 29.8958C36.6667 34.1667 33.3333 37.5833 29.1667 37.5833C25 37.5833 21.6667 34.1667 21.6667 29.8958C21.6667 25.625 25 22.2083 29.1667 22.2083Z" fill="currentColor"/>
                            </g>
                        </svg>
    
                        <div class="asowp-text-[14px]">
                            Discounts
                        </div>
                    </button>
                </div>
                <div class="asowp-w-full">
                    <button @click="()=>router.push('/configs/'+config.replace(/ /,'-')+'/'+configID+'/materials/'+material.replace(/ /,'-')+'/'+materialId+'/simple/others-components')" :class="`asowp-flex asowp-w-full asowp-items-center asowp-justify-center asowp-h-fit asowp-p-3 asowp-bg-transparent asowp-space-x-2 asowp-text-black ${route.name == 'Simple-OthersComponents' || route.name == 'Simple-OthersComponents-Options' ? 'asowp-border-b-[3px] asowp-border-r-0 asowp-border-l-0 asowp-border-t-0 asowp-border-solid asowp-border-b-[#016464] asowp-text-[#016464] asowp-bg-[#F9F9F9]' : 'asowp-border-none'} hover:asowp-border-b-[3px] hover:asowp-border-r-0 hover:asowp-border-l-0 hover:asowp-border-t-0 hover:asowp-border-solid hover:asowp-border-b-[#016464] hover:asowp-bg-[#F9F9F9] hover:asowp-text-[#016464] asowp-cursor-pointer`">
                        <svg class="asowp-w-5 asowp-h-5" viewBox="0 0 26 28" fill="black" xmlns="http://www.w3.org/2000/svg">
                            <path d="M25 4H1M25 14H1M25 24H1M21 1V7M5 11V17M17 21V27" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
    
    
                        <div class="asowp-text-[14px]">
                            Additional components
                        </div>
                    </button>
                </div>
            </div>
            <div class="asowp-w-full asowp-mt-[80px]">
                <div v-if="activeName" class="asowp-text-[16px] asowp-text-[16px] asowp-pl-3 asowp-rounded-[10px] asowp-border-[2px] asowp-border-[rgba(0,0,0,.15)] asowp-border-solid asowp-h-[2.9rem] asowp-bg-white asowp-flex asowp-items-center">
                    {{ activeName }}
                </div>
                <Sizes v-if="route.name==='Simple-Sizes' " :material-id="activeId" :key="'sizes-'+activeId"/>
                <Colors v-if="route.name==='Simple-Colors' " :material-id="activeId" :key="'colors-'+activeId"/>

                <Shapes v-if="route.name==='Simple-Shapes' " :material-id="activeId" :key="'shapes-'+activeId"/>

                <Borders v-if="route.name==='Simple-Borders' " :material-id="activeId" :key="'borders-'+activeId"/>

                <FixingMethods v-if="route.name==='Simple-FixingMethods' " :material-id="activeId" :key="'fix-'+activeId"/>

                <TextImages v-if="route.name==='Simple-TextImages' " :material-id="activeId" :key="'ti-'+activeId"/>

                <Discounts v-if="route.name==='Simple-Discounts' " :material-id="activeId" :key="'disc-'+activeId"/>

                <OthersComponents v-if="route.name==='Simple-OthersComponents' || route.name==='Simple-OthersComponents-Options' " :material-id="activeId" :key="'others-'+activeId"/>
            </div>
        </div>
        <div class="asowp-space-y-2 asowp-translate-y-14" v-if="isNewComponent">
            
            <div class="asowp-text-[16px] asowp-font-bold asowp-px-4 asowp-bg-[#F8F9FB] asowp-rounded-[10px] asowp-border-[2px] asowp-border-[rgba(0,0,0,.15)] asowp-border-solid asowp-p-0 asowp-w-[98.5%] asowp-h-[2.9rem] asowp-mt-3 asowp-bg-white asowp-px-2 asowp-flex asowp-justify-start asowp-items-center">
                Create new material
            </div>
            <div class="asowp-rounded-[10px] asowp-border-[2px] asowp-border-[rgba(0,0,0,.15)] asowp-border-solid asowp-bg-white asowp-px-4 asowp-py-4 asowp-pb-8 asowp-space-y-6">
                <div class="asowp-flex asowp-justify-between">
                    <div class="asowp-w-2/5 asowp-flex asowp-flex-col asowp-space-y-2 asowp-text-[14px]">
                        <label for="" class="asowp-font-normal">Name <span class="asowp-text-red-500">*</span></label>
                        <input type="text" v-model="newMaterial.name" :class="`${emptyLabel?'asowp-field-required':''} asowp-rounded asowp-w-full asowp-h-[35px]`">
                    </div>
                    <div class="asowp-w-2/5 asowp-flex asowp-flex-col asowp-space-y-2 asowp-text-[14px]">
                        <label for="" class="asowp-font-normal">Description</label>
                        <input type="text" v-model="newMaterial.description" class="asowp-rounded asowp-w-full asowp-h-[35px]">
                    </div>
                </div>
                <div class="asowp-flex asowp-justify-between">
                    <div class="asowp-w-2/5 asowp-flex asowp-flex-col asowp-space-y-2 asowp-text-[12px]">
                        <label for="" class="asowp-font-normal">Upload icon</label>
                        <div class="asowp-flex asowp-flex-col asowp-space-y-2 asowp-w-full asowp-p-1 asowp-border asowp-border-solid asowp-border-[#000] asowp-w-[99%] asowp-rounded">
                            <div class="asowp-flex asowp-space-x-2">
                                <button @click="selectMaterialIcon" class="asowp-bg-[#016464] asowp-border-none asowp-w-fit asowp-h-fit asowp-p-2 asowp-rounded asowp-px-4 asowp-text-white asowp-opacity-90 hover:asowp-opacity-100 asowp-text-[10px] asowp-cursor-pointer">upload PopupImg</button>
                                <div :class="`asowp-relative asowp-w-[82px] asowp-h-[30px] asowp-rounded-md asowp-overflow-hidden`">
                                    <img v-if="newMaterial.icon != ''" :src="newMaterial.icon" alt="" class="asowp-absolute asowp-w-full asowp-h-full">
                                    <button v-if="newMaterial.icon != ''" @click="()=>{newMaterial.icon = ''}" :class="`asowp-bg-[#016464] asowp-absolute asowp-bottom-0 asowp-right-0 asowp-text-white asowp-p-1 asowp-rounded-tl-lg asowp-border-none`">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="asowp-w-4 asowp-h-4">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!--<div class="asowp-w-2/5 asowp-flex asowp-flex-col asowp-space-y-2 asowp-text-[12px]">
                        <label for="" class="asowp-font-normal">Upload PopupImg</label>
                        <div class="asowp-flex asowp-flex-col asowp-space-y-2 asowp-w-full asowp-pt-2 asowp-w-1/2">
                            <div class="asowp-flex asowp-space-x-2">
                                <button @click="closeTnymceModal" class="asowp-bg-[#016464] asowp-border-none asowp-w-fit asowp-h-fit asowp-p-4 asowp-rounded asowp-px-4 asowp-text-white asowp-opacity-90 hover:asowp-opacity-100 asowp-text-[10px] asowp-cursor-pointer">Pop For Image</button>
                                <div :class="`asowp-relative asowp-w-[82px] asowp-h-[49px] asowp-rounded-md asowp-overflow-hidden`">
                                    <img v-if="newMaterial.popImg != ''" :src="newMaterial.popImg" alt="" class="asowp-absolute asowp-w-full asowp-h-full">
                                    <button v-if="newMaterial.popImg != ''" @click="()=>{newMaterial.popImg = ''}" :class="`asowp-bg-[#016464] asowp-absolute asowp-bottom-0 asowp-right-0 asowp-text-white asowp-p-1 asowp-rounded-tl-lg asowp-border-none`">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="asowp-w-4 asowp-h-4">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                        </svg>
                                    </button>
                                </div> 
                            </div>
                        </div>
                    </div>-->
                    <div class="asowp-space-y-2 asowp-pt-2 asowp-flex asowp-flex-col asowp-w-2/5">
                        <label for="" class="asowp-font-bold">Type</label>
                        <select name="" id="" class="asowp-w-full asowp-h-[30px] asowp-font-normal" v-model="newMaterial.type" :disabled="isEdit">
                            <option value="simple">Simple</option>
                            <option value="advance">Advance</option>
                        </select>
                    </div>
                </div>
                <hr class="Polaris-Divider asowp-mx-4" style="border: 1px solid #ebebeb;">
                <div class="asowp-flex asowp-space-x-4 asowp-px-4 asowp-py-4 asowp-justify-end asowp-items-end">
                    <div class="asowp-bg-[#016464] asowp-rounded">
                        <button :disabled="isLoading" class="asowp-flex asowp-bg-transparent asowp-w-fit asowp-space-x-2 asowp-h-fit asowp-px-8 asowp-p-2 asowp-border-none asowp-text-white asowp-opacity-90 hover:asowp-border-none hover:asowp-text-white hover:asowp-opacity-100 asowp-cursor-pointer" @click="back">
                            <svg class="asowp-w-6 asowp-h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 12L5 8V11L17.17 11C17.3756 10.414 17.7586 9.90661 18.2657 9.54821C18.7729 9.18981 19.379 8.9982 20 9C20.7956 9 21.5587 9.31607 22.1213 9.87868C22.6839 10.4413 23 11.2044 23 12C23 12.7956 22.6839 13.5587 22.1213 14.1213C21.5587 14.6839 20.7956 15 20 15C18.69 15 17.58 14.17 17.17 13L5 13V16L1 12Z" fill="currentColor"/>
                            </svg>
    
                            <div class="asowp-font-semibold asowp-text-[16px]">Back</div>
                        </button>
                    </div>
                    <div class="asowp-bg-[#016464] asowp-rounded" v-if="isEdit">
                        <button @click="updateMaterial" :class="`asowp-rounded asowp-flex ${!isLoading ? 'asowp-bg-amber-400 ' :'asowp-bg-amber-500'} asowp-w-fit asowp-space-x-2 asowp-h-fit asowp-px-8 asowp-text-white asowp-p-2 asowp-border-none asowp-opacity-90 hover:asowp-border-none hover:asowp-text-white hover:asowp-opacity-100 asowp-cursor-pointer`">
                            <!--<img src="../../../../../assets/icons/ic_loading_gray.svg" class="asowp-w-5 asowp-w-5" v-if="isLoading" :disabled="isLoading"/>-->
                            <div class="asowp-font-semibold asowp-text-[16px]">Update</div>
                        </button>
                    </div>
                    <div class="asowp-bg-[#016464] asowp-rounded" v-if="!isEdit">
                        <button @click="addNewMaterial" class="asowp-flex asowp-bg-transparent asowp-w-fit asowp-space-x-2 asowp-h-fit asowp-text-white  asowp-px-12 asowp-p-2.5 asowp-border-none asowp-opacity-90 hover:asowp-border-none hover:asowp-text-white hover:asowp-opacity-100 asowp-cursor-pointer">
                            <!--<img src="../../../../../assets/icons/ic_loading_gray.svg" class="asowp-w-5 asowp-w-5" v-if="isLoading" :disabled="isLoading"/>-->
                            <div class="asowp-font-semibold asowp-text-[16px]">Save</div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <!-- Delete Modal-->
        <div v-if="openModal" @click.self="closeModal" class="asowp-bg-gray-400 asowp-overflow-y-auto asowp-overflow-x-hidden asowp-fixed asowp-top-0 asowp-right-[25%] asowp-left-[75%] asowp-z-[999] asowp-flex asowp-justify-center asowp-items-center asowp-w-full md:asowp-inset-0 asowp-h-full asowp-z-[999]">
            <div class="asowp-relative asowp-p-4 asowp-w-full asowp-max-w-md asowp-max-h-full">
                <div class="asowp-relative asowp-bg-white asowp-rounded-lg asowp-shadow dark:bg-gray-700">
                    <button @click.stop="closeModal" type="button" :class="`${isLoading ? 'asowp-cursor-not-allowed' : 'asowp-cursor-pointer'} asowp-border-solid asowp-absolute asowp-top-3 asowp-end-2.5 asowp-text-gray-400 asowp-bg-transparent hover:bg-gray-200 hover:text-gray-900 asowp-rounded-lg asowp-text-sm asowp-w-8 asowp-h-8 asowp-ms-auto asowp-inline-flex asowp-justify-center asowp-items-center dark:hover:bg-gray-600 dark:hover:text-white`" data-modal-hide="popup-modal">
                        <svg class="asowp-w-3 asowp-h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                        <span class="asowp-sr-only">Close modal</span>
                    </button>
                    <div class="asowp-p-4 md:p-5 asowp-text-center">
                        <svg class="asowp-mx-auto asowp-mb-4 asowp-text-gray-400 asowp-w-12 asowp-h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                        </svg>
                        <h3 class="asowp-mb-5 asowp-text-lg asowp-font-normal asowp-text-gray-500 dark:text-gray-400">Are you sure you want to delete this configuration?</h3>
                        <input v-model="deleteMaterial.name" readonly class="asowp-rounded asowp-w-full asowp-h-[35px] asowp-text-center asowp-p-4 asowp-my-2 asowp-border-none" />
                        <button @click="delMaterial" data-modal-hide="popup-modal" type="button" :class="`asowp-border-solid asowp-text-white ${!isLoading ? 'asowp-bg-red-600 asowp-cursor-pointer' :'asowp-bg-red-700 asowp-cursor-not-allowed'} hover:bg-red-800 focus:ring-4 focus:outline-none asowp-my-2 asowp-border-none  focus:ring-red-300 dark:focus:ring-red-800 asowp-font-medium asowp-rounded-lg asowp-text-sm asowp-inline-flex asowp-items-center asowp-px-5 asowp-py-2.5 asowp-text-center`">
                            <img src="../../../../../../assets/icons/ic_loading_gray.svg" class="asowp-w-5 asowp-w-5" v-if="isLoading" :disabled="isLoading"/>
                            Yes, I'm sure
                        </button>
                        <button @click.stop="closeModal" data-modal-hide="popup-modal" type="button" :class="`asowp-border-solid asowp-py-2.5 asowp-px-5 asowp-ms-3 asowp-text-sm asowp-font-medium asowp-text-gray-900 asowp-my-2  asowp-border-gray-500 asowp-border-white focus:outline-none asowp-bg-white asowp-rounded-lg asowp-border asowp-border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 ${isLoading ? 'asowp-cursor-not-allowed' : 'asowp-cursor-pointer'}`">No, cancel</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- Clone Modal-->
        <div v-if="openCloneModal" @click.self="closeCloneModal" class="asowp-z-[999] asowp-bg-gray-400 asowp-overflow-y-auto asowp-overflow-x-hidden asowp-fixed asowp-top-0 asowp-right-[25%] asowp-left-[75%]  asowp-flex asowp-justify-center asowp-items-center asowp-w-full md:asowp-inset-0 asowp-h-full">
            <div class="asowp-relative asowp-p-4 asowp-w-full asowp-max-w-md asowp-max-h-full">
                <div class="asowp-relative asowp-bg-white asowp-rounded-lg asowp-shadow dark:bg-gray-700">
                    <button @click.stop="closeCloneModal" type="button" :class="`${isLoading ? 'asowp-cursor-not-allowed' : 'asowp-cursor-pointer'} asowp-absolute asowp-top-3 asowp-end-2.5 asowp-text-gray-400 asowp-bg-transparent hover:bg-gray-200 hover:text-gray-900 asowp-rounded-lg asowp-text-sm asowp-w-8 asowp-h-8 asowp-ms-auto asowp-inline-flex asowp-justify-center asowp-items-center dark:hover:bg-gray-600 dark:hover:text-white`" data-modal-hide="popup-modal">
                        <svg class="asowp-w-3 asowp-h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                        <span class="asowp-sr-only">Close modal</span>
                    </button>
                    <div class="asowp-p-4 md:p-5 asowp-text-center">
                        <svg class="asowp-mx-auto asowp-mb-4 asowp-text-gray-400 asowp-w-12 asowp-h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                        </svg>
                        <h3 class="asowp-mb-5 asowp-text-lg asowp-font-normal asowp-text-gray-500 dark:text-gray-400">Give the name of the new material, which will be an imitation of the current one.</h3>
                        <input v-model="newMaterial.name" class="asowp-rounded asowp-w-full asowp-h-[35px] asowp-text-start asowp-p-4 asowp-my-2 asowp-border-solid asowp-border-gray-400" />
                        <button @click="addNewMaterial" data-modal-hide="popup-modal" type="button" :class="`asowp-border-solid asowp-text-white ${!isLoading ? 'asowp-bg-[#016464] asowp-cursor-pointer' :'asowp-bg-[#016464] asowp-cursor-not-allowed'} hover:bg-red-800 focus:ring-4 focus:outline-none asowp-my-2 asowp-border-none  focus:ring-red-300 dark:focus:ring-red-800 asowp-font-medium asowp-rounded-lg asowp-text-sm asowp-inline-flex asowp-items-center asowp-px-5 asowp-py-2.5 asowp-text-center`">
                            <img src="../../../../../../assets/icons/ic_loading_gray.svg" class="asowp-w-5 asowp-w-5" v-if="isLoading" :disabled="isLoading"/>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="asowp-w-5 asowp-w-5" v-if="!isLoading">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                            </svg>
                            Clone
                        </button>
                        <button @click.stop="closeCloneModal" data-modal-hide="popup-modal" type="button" :class="`asowp-border-solid asowp-py-2.5 asowp-px-5 asowp-ms-3 asowp-text-sm asowp-font-medium asowp-text-gray-900 asowp-my-2  asowp-border-gray-500 asowp-border-white focus:outline-none asowp-bg-white asowp-rounded-lg asowp-border asowp-border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 ${isLoading ? 'asowp-cursor-not-allowed' : 'asowp-cursor-pointer'}`">Cancel</button>
                    </div>
                </div>
            </div>
        </div> 
    </div>
    <div v-show="openTnyMce" @click.self="closeTnymceModal" class="asowp-z-[999] asowp-bg-gray-400 asowp-overflow-y-auto asowp-overflow-x-hidden asowp-fixed asowp-top-0 asowp-right-[25%] asowp-left-[75%]  asowp-flex asowp-justify-center asowp-items-center asowp-w-full md:asowp-inset-0 asowp-h-full asowp-h-full">
        <div class="asowp-relative asowp-top-[50px] asowp-p-4 asowp-w-full asowp-max-w-[60%] asowp-max-h-fit">
            <div class="asowp-relative asowp-bg-white asowp-rounded-lg asowp-shadow dark:bg-gray-700 asowp-px-4">
                <div class="asowp-px-[10px] asowp-pt-[5px]">
                    <!-- <Editor
                        api-key="02v0ot513pkt9cwnhg3l36u9l13l91z8ux5oyf24nnqlp12j"
                        :init="{
                            toolbar_mode: 'sliding',
                            plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate mentions tableofcontents footnotes mergetags autocorrect typography inlinecss markdown',
                            toolbar: 'undo redo | blocks fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                            ai_request: (request, respondWith) => respondWith.string(() => Promise.reject('See docs to implement AI Assistant')),
                        }"
                        v-model="newMaterial.popImg"
                    /> -->
                    <textarea name="" id="asowp-admin-tinymce" cols="30" rows="10"></textarea>
                    <div class="asowp-p-4 md:p-5 asowp-text-center">
                        <button @click="savePopImg" data-modal-hide="popup-modal" type="button" :class="`asowp-border-solid asowp-text-white ${!isLoading ? 'asowp-bg-[#016464] asowp-cursor-pointer' :'asowp-bg-[#016464] asowp-cursor-not-allowed'} hover:asowp-bg-[#016464] focus:ring-4 focus:outline-none asowp-my-2 asowp-border-none  focus:ring-red-300 dark:focus:ring-red-800 asowp-font-medium asowp-rounded-lg asowp-text-sm asowp-inline-flex asowp-items-center asowp-px-5 asowp-py-2.5 asowp-text-center`">
                            <img src="../../../../../../assets/icons/ic_loading_gray.svg" class="asowp-w-5 asowp-w-5" v-if="isLoading" :disabled="isLoading"/>
                            Save
                        </button>
                        <button @click.stop="closeTnymceModal" data-modal-hide="popup-modal" type="button" :class="`asowp-border-solid asowp-py-2.5 asowp-px-5 asowp-ms-3 asowp-text-sm asowp-font-medium asowp-text-gray-900 asowp-my-2  asowp-border-gray-500 asowp-border-white focus:outline-none asowp-bg-white asowp-rounded-lg asowp-border asowp-border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 ${isLoading ? 'asowp-cursor-not-allowed' : 'asowp-cursor-pointer'}`">No, cancel</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import Sizes from '@/admin/pages/configuration/materials/simple/components/sizes.vue'
import Borders from '@/admin/pages/configuration/materials/simple/components/borders.vue'
import Colors from '@/admin/pages/configuration/materials/simple/components/colors.vue'
import FixingMethods from '@/admin/pages/configuration/materials/simple/components/fixing-methods.vue'
import Shapes from '@/admin/pages/configuration/materials/simple/components/shapes.vue'
import Discounts from '@/admin/pages/configuration/materials/simple/components/discounts.vue'
import TextImages from '@/admin/pages/configuration/materials/simple/components/text-images.vue'
import OthersComponents from '@/admin/pages/configuration/materials/simple/components/others-components/index.vue'
import api from '@/admin/Api/api';
import { onMounted, ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import router from '@/admin/router';

const route = useRoute()
const configID = ref(route.params.configId)
const config =route.params.config.replace(/-/,' ');
const materialId = ref(route.params.materialId);
const material = route.params.material.replace(/-/,' ');
const showParams = ref([]);
const openModal = ref(false);
const openTnyMce = ref(false);
const openCloneModal = ref(false);
const emptyLabel = ref(false);
const isLoading = ref(false);
const isEdit = ref(false);
const activeMaterialIndex = ref(0);

const activeMaterial = computed(() => materials.value[activeMaterialIndex.value] || null)
const activeId       = computed(() => activeMaterial.value?.id ?? activeMaterialIndex.value) // id à passer aux enfants
const activeName     = computed(() => activeMaterial.value?.name ?? '')

import toastMessage from '@/admin/utils/functions';
const deleteMaterial = ref({
    id:null,
    name:""
});

const isFetching = ref(false);
const materials = ref([]);
const newMaterial = ref({
    name:"",
    description:"",
    icon:"",
    popImg:"",
    type:"simple",
});
const isNewComponent = ref(false);
const contentComponent = ref(true);

const fetchMaterials = async () => {
    const result = await api.getMaterials(configID.value);
    console.log(result);
    if(!result.message){
        let tab=[];
        materials.value = result;
        for (let index = 0; index < result.length; index++) {
            tab.push(false);
            
        }
        showParams.value = tab;
    }else{
        materials.value = [];
        //notFoundMessage.value = result.message;
    }
    isFetching.value = false;
}

const handleOpenMaterialParams  = (key)=>{
    for (let index = 0; index < showParams.value.length; index++) {
       if(key!=index){
        showParams.value[index]=false;
       }else{
        showParams.value[key]=!showParams.value[key];
       }
    }
}


onMounted(async() => {
    tinymce.init({
        selector: '#asowp-admin-tinymce',
        plugins: 'wordpress paste link image media',
        toolbar: 'undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image media | code| wp_adv',
        relative_urls: false,
        remove_script_host: false,
        convert_urls: true,
        height: 200,
        width: '100%',
        branding: false,
        setup: function(editor) {
            editor.on('init', function() {
                //console.log('TinyMCE initialized.');
            });
        }
    });
    if (materials.value.length > 0) {
    activeMaterialIndex.value = 0
  }
    isFetching.value = true;
    await fetchMaterials();

});


const addNewMaterial = async () => {
    if(newMaterial.value.name.trim() !== ''){
        //isLoading.value = true;
        const result = await api.addMaterial(configID.value,newMaterial.value);
        if(result.success){
            await fetchMaterials();
            isLoading.value = false;
            isNewComponent.value = false;
            contentComponent.value=true;
            newMaterial.value = {
                name:"",
                description:"",
                icon:"",
                popImg:"",
                type:"simple",
            }
            openCloneModal.value=false;
            toastMessage(result.message)
        }else{
            isLoading.value = false;
            isNewComponent.value = false;
            contentComponent.value=true;
            newMaterial.value = {
                name:"",
                description:"",
                icon:"",
                popImg:"",
                type:"simple",
            }
            openCloneModal.value=false;
            toastMessage(result.message,"error");
        }
    }else{
        emptyLabel.value = true;
        toastMessage("Label must not be empty","warning");
    }
}


const selectMaterialEdit = (material, id) => {
    materialId.value = id;
    newMaterial.value = JSON.parse(JSON.stringify(material));
    isEdit.value = true;
    contentComponent.value = false;
    tinymce.activeEditor.setContent(material.popImg);
    isNewComponent.value = true;
}

const closeTnymceModal = ()=>{
    openTnyMce.value = !openTnyMce.value;
}
const savePopImg = ()=>{
    newMaterial.value.popImg = tinymce.activeEditor.getContent();
    openTnyMce.value = false;
}


/** Fonction for image selection */
const selectMaterialIcon = async(e) => { 
    e.preventDefault();
    var uploader = wp.media(
        {
            title: "Select Material Icon",
            button: {
                text: "Select Icon"
            },
            multiple: false
        }
    )
        .on(
            'select',
            function () {
                var selection = uploader.state().get('selection');
                selection.map(
                    function (attachment) {
                        attachment = attachment.toJSON();
                        if (attachment.type == "image") {
                            newMaterial.value.icon = (attachment.url);
                        }
                    }
                );
            }
        )
        .open();
}



const updateMaterial = async () => {
    if(newMaterial.value.name.trim() !== ''){
        //isLoading.value = true;
        emptyLabel.value = false;
        const result = await api.updateMaterial(configID.value,materialId.value,newMaterial.value);
        if(result.success){
            await fetchMaterials();
            isLoading.value = false;
            isNewComponent.value = false;
            newMaterial.value = {
                name:"",
                description:"",
                icon:"",
                popImg:"",
                type:"simple",
            }
            
            isEdit.value = false;
            contentComponent.value=true;
            toastMessage(result.message);
        }else{
            isLoading.value = false;
            isNewComponent.value = false;
            newMaterial.value = {
                name:"",
                description:"",
                icon:"",
                popImg:"",
                type:"simple",
            }
            toastMessage(result.message,"error");
        }
    }else{
        emptyLabel.value = true;
        toastMessage("Label must not be empty","warning");
    }
    
}

const addComponent = () => {
    isNewComponent.value = true;
    contentComponent.value = false;
}
const back = () => {
    isNewComponent.value = false;
    contentComponent.value = true;
    isEdit.value = false;
    emptyLabel.value = false;
    newMaterial.value = {
        name:"",
        description:"",
        icon:"",
        popImg:"",
        type:"simple",
    }
}



/** Function for deleting */
const selectMaterialDelete = (id, name) => {
    deleteMaterial.value = {id: id, name: name};
    closeModal();
}
const delMaterial = async () => {
    isLoading.value = true;
    const result = await api.deleteMaterial(configID.value,deleteMaterial.value.id);
    if(result.success){
        await fetchMaterials();
        isLoading.value =false;
        toastMessage(result.message)
    }else{
        isLoading.value =false;
        toastMessage(result.message,"error");
    }
    
    closeModal();
}
const closeModal = ()=>{
    if(!isLoading.value){        
        openModal.value = !openModal.value;
    }
}
const closeCloneModal = ()=>{
    if(!isLoading.value){        
        openCloneModal.value = false;
        newMaterial.value = {
            name:"",
            description:"",
            icon:"",
            popImg:"",
            type:"simple",
        }
    }
}

const redirectToMaterial = (key, name, type) => {
  activeMaterialIndex.value = key
  router.push({
    name: type === 'advance' ? 'Advance-Material' : 'Simple-Sizes',
    params: {
      materialId: key,
      material: name.toLowerCase().replace(/\s+/g, '-'),
    },
  })
}
</script>
<style>
    
</style>