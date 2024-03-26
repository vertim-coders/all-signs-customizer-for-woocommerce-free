<template>
    <div>
        <div v-if="!isNewComponent">
            <div class="aso-bg-[#F8F9FB] aso-text-[16px] aso-space-x-1 aso-px-4 aso-py-4 aso-flex">
                <div  v-if="config.trim() != ''" class="aso-font-bold">
                    {{config}}
                </div>
                <img  v-if="config.trim() != ''" class="aso-w-4 aso-h-4 aso-py-1" src="../../../../../assets/icons/ic_crochet.svg" alt="">
                <div v-if="config.trim() != ''" >
                    Material
                </div>
            </div>
            <div v-if="!isFetching" class="aso-flex aso-justify-end aso-items-center aso-space-x-2 aso-w-full aso-bg-[#F8F9FB] aso-px-4 aso-py-4">
                
                <div class="aso-w-1/4">
                    <button class="aso-flex aso-w-fit aso-h-[fit] aso-rounded aso-bg-[#016464] aso-px-4 aso-space-x-2 aso-p-1.5 aso-border-none aso-text-white aso-opacity-90 hover:aso-opacity-100 aso-cursor-pointer" @click="addComponent">
                        <svg class="aso-w-5 aso-h-5" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g id="plus-lg">
                            <path id="Vector" fill-rule="evenodd" clip-rule="evenodd" d="M11 2.75C11.1823 2.75 11.3572 2.82243 11.4861 2.95136C11.6151 3.0803 11.6875 3.25516 11.6875 3.4375V10.3125H18.5625C18.7448 10.3125 18.9197 10.3849 19.0486 10.5139C19.1776 10.6428 19.25 10.8177 19.25 11C19.25 11.1823 19.1776 11.3572 19.0486 11.4861C18.9197 11.6151 18.7448 11.6875 18.5625 11.6875H11.6875V18.5625C11.6875 18.7448 11.6151 18.9197 11.4861 19.0486C11.3572 19.1776 11.1823 19.25 11 19.25C10.8177 19.25 10.6428 19.1776 10.5139 19.0486C10.3849 18.9197 10.3125 18.7448 10.3125 18.5625V11.6875H3.4375C3.25516 11.6875 3.0803 11.6151 2.95136 11.4861C2.82243 11.3572 2.75 11.1823 2.75 11C2.75 10.8177 2.82243 10.6428 2.95136 10.5139C3.0803 10.3849 3.25516 10.3125 3.4375 10.3125H10.3125V3.4375C10.3125 3.25516 10.3849 3.0803 10.5139 2.95136C10.6428 2.82243 10.8177 2.75 11 2.75Z" fill="white"/>
                            </g>
                        </svg>
                        <div class="aso-text-[14px]">
                            Add new Material
                        </div>
                    </button>
                </div>
            </div>
            <!-- Table which display all materials -->
            <div class="aso-w-full aso-overflow-x-auto">
                <div class="aso-overflow-hidden aso-w-full">
                    <div class="aso-grid aso-grid-cols-6 aso-justify-center aso-items-center aso-p-4 aso-text-sm aso-font-medium aso-text-gray-900 aso-bg-gray-100 aso-border-t aso-border-b aso-border-gray-200 aso-gap-x-16 dark:aso-bg-gray-800 dark:aso-border-gray-700 dark:aso-text-white">
                        <div class="aso-flex aso-items-center aso-justify-center">Component Name</div>
                        <div class="aso-flex aso-items-center aso-justify-center">Description</div>
                        <div class="aso-flex aso-items-center aso-justify-center">Icon</div>
                        <div class="aso-flex aso-items-center aso-justify-center">PopupImg</div>
                        <div class="aso-flex aso-items-center aso-justify-center">Behavior (type)</div>
                        <div class="aso-flex aso-items-center aso-justify-center">Actions</div>
                    </div>
                    <div v-if="isFetching" class="aso-bg-white aso-border-solid aso-border aso-border-[#D1D1D1] aso-flex aso-flex-col aso-space-y-2 aso-justify-center aso-items-center aso-w-full aso-h-[306px] p-4">
                        <img class="aso-w-[200px] aso-h-[200px]" src="../../../../../assets/icons/ic_loading.svg" alt="">
                    </div>
                    <div v-if="materials.length == 0 && !isFetching" class="aso-bg-white aso-border-solid aso-border aso-border-[#D1D1D1] aso-flex aso-flex-col aso-space-y-12 aso-justify-center aso-items-center aso-py-10 aso-h-[306px]">
                        <div class="aso-flex aso-flex-col aso-space-y-2 aso-justify-center aso-items-center">
                            <p class="aso-text-2xl aso-font-bold">{{notFoundMessage}}</p>
                        </div>
                    </div>
                    <div v-for="(material,key) in materials" :key="key" class="aso-cursor-pointer aso-grid aso-items-center aso-bg-white aso-grid-cols-6 aso-px-4 aso-py-3 aso-text-sm aso-text-gray-700 aso-border-b aso-border-solid aso-border-gray-200 aso-gap-x-16 dark:aso-border-gray-700">
                        <div class="aso-text-gray-500 dark:aso-text-gray-400 aso-flex aso-items-center aso-overflow-hidden aso-whitespace-nowrap aso-text-ellipsis aso-space-x-4">
                            <span class="aso-w-5 aso-h-5 aso-p-1 aso-px-1 aso-flex aso-justify-center aso-rounded-full aso-bg-[#f0f0f1] aso-border aso-border-solid aso-border-black ">
                                <span class="aso-text-[12px]">{{getInitials(material.name)}}</span> 
                            </span>
                            <span>{{ material.name }}</span>
                        </div>
                        <div class="aso-text-gray-500 dark:aso-text-gray-400 aso-overflow-hidden aso-whitespace-nowrap aso-text-ellipsis">{{material.description}}</div>
                        <div class="aso-text-gray-500 dark:aso-text-gray-400 aso-flex aso-justify-center aso-items-center">
                            <img class="aso-w-10 aso-h-10 aso-rounded" :src="material.icon" alt="" v-if="material.icon!=''">
                        </div> 
                        <div class="aso-text-gray-500 dark:aso-text-gray-400 aso-flex aso-justify-center aso-items-center">
                            <img class="aso-w-10 aso-h-10 aso-rounded" :src="material.popImg" alt="" v-if="material.popImg!=''">
                        </div>
                        <div class="aso-text-gray-500 dark:aso-text-gray-400 aso-flex aso-justify-center aso-items-center">
                            <span :class="`aso-w-fit aso-rounded-lg aso-p-1 aso-text-[12px] aso-text-center aso-px-2 ${material.type == 'simple' ? 'aso-bg-[#EEF5FF] aso-text-black' :'aso-bg-[#9ACD321F] aso-text-[#466801]'} aso-border-none`">
                                {{material.type}}
                            </span>
                        </div>
                        <div class="aso-flex aso-space-x-[1.5px] aso-justify-center aso-items-center aso-text-gray-500 dark:aso-text-gray-400">
                            <button class="aso-bg-[#FFC7D8] aso-p-2 aso-rounded-md aso-border-none aso-cursor-pointer aso-space-x-1 aso-flex" @click="redirectToMaterail(key,material.type)">
                                <img class="aso-w-4 aso-h-4" src="../../../../../assets/icons/ic_manage.svg" alt="">
                                <span class="aso-text-[12px]">
                                    Manage
                                </span>
                            </button>
                            <button class="aso-bg-transparent aso-border-none aso-text-[#2DD05B] aso-cursor-pointer"  @click="selectMaterialEdit(material,key)">
                                <img class="aso-w-5 aso-h-5" src="../../../../../assets/icons/ic_edit.svg" alt="">
                            </button>
                            <button class="aso-bg-transparent aso-border-none aso-text-[#A00000] aso-cursor-pointer"  @click="selectMaterialDelete(key,material.name)">
                                <img class="aso-w-5 aso-h-5" src="../../../../../assets/icons/ic_delete.svg" alt="">
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="aso-space-y-0.5" v-if="isNewComponent">
            <div class="aso-bg-[#F8F9FB] aso-text-[16px] aso-space-x-1 aso-px-4 aso-py-4 aso-flex">
                <div class="aso-font-bold aso-text-[16px]">
                    Name config
                </div>
                <img class="aso-w-4 aso-h-4 aso-py-1" src="../../../../../assets/icons/ic_crochet.svg" alt="">
                <div class="aso-text-[16px]">
                    Material
                </div>
            </div>
            <div class="aso-text-[16px] aso-font-bold aso-px-4 aso-py-4 aso-bg-[#F8F9FB]">
                Add component
            </div>
            <div class="aso-bg-[#F8F9FB] aso-px-4 aso-py-4 aso-space-y-6">
                <div class="aso-flex aso-justify-between">
                    <div class="aso-w-2/5 aso-flex aso-flex-col aso-space-y-2 aso-text-[14px]">
                        <label for="" class="aso-font-normal">component name</label>
                        <input type="text" v-model="newMaterial.name" class="aso-rounded aso-w-full aso-h-[35px]">
                    </div>
                    <div class="aso-w-2/5 aso-flex aso-flex-col aso-space-y-2 aso-text-[14px]">
                        <label for="" class="aso-font-normal">Description</label>
                        <input type="text" v-model="newMaterial.description" class="aso-rounded aso-w-full aso-h-[35px]">
                    </div>
                </div>
                <div class="aso-flex aso-justify-between">
                    <div class="aso-w-2/5 aso-flex aso-flex-col aso-space-y-2 aso-text-[12px]">
                        <label for="" class="aso-font-normal">Upload icon</label>
                        <div class="aso-flex aso-flex-col aso-space-y-2 aso-w-full aso-pt-2 aso-w-1/2">
                            <div class="aso-flex aso-space-x-2">
                                <button @click="selectMaterialIcon" class="aso-bg-[#016464] aso-border-none aso-w-fit aso-h-fit aso-p-4 aso-rounded aso-px-4 aso-text-white aso-opacity-90 hover:aso-opacity-100 aso-text-[10px] aso-cursor-pointer">upload PopupImg</button>
                                <div :class="`aso-relative aso-w-[82px] aso-h-[49px] aso-rounded-md aso-overflow-hidden`">
                                    <img v-if="newMaterial.icon != ''" :src="newMaterial.icon" alt="" class="aso-absolute aso-w-full aso-h-full">
                                    <button v-if="newMaterial.icon != ''" @click="()=>{newMaterial.icon = ''}" :class="`aso-bg-[#016464] aso-absolute aso-bottom-0 aso-right-0 aso-text-white aso-p-1 aso-rounded-tl-lg aso-border-none`">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="aso-w-4 aso-h-4">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="aso-w-2/5 aso-flex aso-flex-col aso-space-y-2 aso-text-[12px]">
                        <label for="" class="aso-font-normal">Upload PopupImg</label>
                        <div class="aso-flex aso-flex-col aso-space-y-2 aso-w-full aso-pt-2 aso-w-1/2">
                            <div class="aso-flex aso-space-x-2">
                                <button @click="selectMaterialPopImg" class="aso-bg-[#016464] aso-border-none aso-w-fit aso-h-fit aso-p-4 aso-rounded aso-px-4 aso-text-white aso-opacity-90 hover:aso-opacity-100 aso-text-[10px] aso-cursor-pointer">upload PopupImg</button>
                                <div :class="`aso-relative aso-w-[82px] aso-h-[49px] aso-rounded-md aso-overflow-hidden`">
                                    <img v-if="newMaterial.popImg != ''" :src="newMaterial.popImg" alt="" class="aso-absolute aso-w-full aso-h-full">
                                    <button v-if="newMaterial.popImg != ''" @click="()=>{newMaterial.popImg = ''}" :class="`aso-bg-[#016464] aso-absolute aso-bottom-0 aso-right-0 aso-text-white aso-p-1 aso-rounded-tl-lg aso-border-none`">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="aso-w-4 aso-h-4">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="aso-space-y-2 aso-pt-2 aso-flex aso-flex-col">
                    <label for="" class="aso-font-bold">Behevior (type)</label>
                    <select name="" id="" class="aso-w-full aso-h-[30px] aso-font-normal" v-model="newMaterial.type" :disabled="isEdit">
                        <option value="simple">Simple</option>
                        <option value="advance">Advance</option>
                    </select>
                </div>
            </div>
            <div class="aso-bg-[#F8F9FB] aso-flex aso-space-x-4 aso-px-4 aso-py-4 aso-justify-end aso-items-end">
                <div class="aso-bg-[#016464] aso-rounded">
                    <button :disabled="isLoading" class="aso-flex aso-bg-transparent aso-w-fit aso-space-x-2 aso-h-fit aso-px-8 aso-p-2 aso-border-none aso-text-white aso-opacity-90 hover:aso-border-none hover:aso-text-white hover:aso-opacity-100 aso-cursor-pointer" @click="back">
                        <svg class="aso-w-6 aso-h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 12L5 8V11L17.17 11C17.3756 10.414 17.7586 9.90661 18.2657 9.54821C18.7729 9.18981 19.379 8.9982 20 9C20.7956 9 21.5587 9.31607 22.1213 9.87868C22.6839 10.4413 23 11.2044 23 12C23 12.7956 22.6839 13.5587 22.1213 14.1213C21.5587 14.6839 20.7956 15 20 15C18.69 15 17.58 14.17 17.17 13L5 13V16L1 12Z" fill="currentColor"/>
                        </svg>

                        <div class="aso-font-semibold aso-text-[16px]">Back</div>
                    </button>
                </div>
                <div class="aso-bg-[#016464] aso-rounded" v-if="isEdit">
                    <button @click="updateMaterial" :class="`aso-rounded aso-flex ${!isLoading ? 'aso-bg-amber-400 ' :'aso-bg-amber-500'} aso-w-fit aso-space-x-2 aso-h-fit aso-px-8 aso-text-white aso-p-2 aso-border-none aso-opacity-90 hover:aso-border-none hover:aso-text-white hover:aso-opacity-100 aso-cursor-pointer`">
                        <img src="../../../../../assets/icons/ic_loading_gray.svg" class="aso-w-5 aso-w-5" v-if="isLoading" :disabled="isLoading"/>
                        <div class="aso-font-semibold aso-text-[16px]">Update</div>
                    </button>
                </div>
                <div class="aso-bg-[#016464] aso-rounded" v-if="!isEdit">
                    <button @click="addNewMaterial" class="aso-flex aso-bg-transparent aso-w-fit aso-space-x-2 aso-h-fit aso-text-white  aso-px-12 aso-p-2.5 aso-border-none aso-opacity-90 hover:aso-border-none hover:aso-text-white hover:aso-opacity-100 aso-cursor-pointer">
                        <img src="../../../../../assets/icons/ic_loading_gray.svg" class="aso-w-5 aso-w-5" v-if="isLoading" :disabled="isLoading"/>
                        <div class="aso-font-semibold aso-text-[16px]">Save</div>
                    </button>
                </div>
            </div>
        </div>
        <!-- Delete Modal-->
        <div v-if="openModal" @click.self="closeModal" class="aso-bg-gray-400 aso-overflow-y-auto aso-overflow-x-hidden aso-fixed aso-top-0 aso-right-[25%] aso-left-[75%] aso-z-50 aso-flex aso-justify-center aso-items-center aso-w-full md:aso-inset-0 aso-h-[calc(100%-1rem)] aso-h-[100vh] aso-z-[999]">
            <div class="aso-relative aso-p-4 aso-w-full aso-max-w-md aso-max-h-full">
                <div class="aso-relative aso-bg-white aso-rounded-lg aso-shadow dark:bg-gray-700">
                    <button @click.stop="closeModal" type="button" :class="`${isLoading ? 'aso-cursor-not-allowed' : 'aso-cursor-pointer'} aso-border-solid aso-absolute aso-top-3 aso-end-2.5 aso-text-gray-400 aso-bg-transparent hover:bg-gray-200 hover:text-gray-900 aso-rounded-lg aso-text-sm aso-w-8 aso-h-8 aso-ms-auto aso-inline-flex aso-justify-center aso-items-center dark:hover:bg-gray-600 dark:hover:text-white`" data-modal-hide="popup-modal">
                        <svg class="aso-w-3 aso-h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                        <span class="aso-sr-only">Close modal</span>
                    </button>
                    <div class="aso-p-4 md:p-5 aso-text-center">
                        <svg class="aso-mx-auto aso-mb-4 aso-text-gray-400 aso-w-12 aso-h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                        </svg>
                        <h3 class="aso-mb-5 aso-text-lg aso-font-normal aso-text-gray-500 dark:text-gray-400">Are you sure you want to delete this configuration?</h3>
                        <input v-model="deleteMaterial.name" readonly class="aso-rounded aso-w-full aso-h-[35px] aso-text-center aso-p-4 aso-my-2 aso-border-none" />
                        <button @click="delMaterial" data-modal-hide="popup-modal" type="button" :class="`aso-border-solid aso-text-white ${!isLoading ? 'aso-bg-red-600 aso-cursor-pointer' :'aso-bg-red-700 aso-cursor-not-allowed'} hover:bg-red-800 focus:ring-4 focus:outline-none aso-my-2 aso-border-none  focus:ring-red-300 dark:focus:ring-red-800 aso-font-medium aso-rounded-lg aso-text-sm aso-inline-flex aso-items-center aso-px-5 aso-py-2.5 aso-text-center`">
                            <img src="../../../../../assets/icons/ic_loading_gray.svg" class="aso-w-5 aso-w-5" v-if="isLoading" :disabled="isLoading"/>
                            Yes, I'm sure
                        </button>
                        <button @click.stop="closeModal" data-modal-hide="popup-modal" type="button" :class="`aso-border-solid aso-py-2.5 aso-px-5 aso-ms-3 aso-text-sm aso-font-medium aso-text-gray-900 aso-my-2  aso-border-gray-500 aso-border-white focus:outline-none aso-bg-white aso-rounded-lg aso-border aso-border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 ${isLoading ? 'aso-cursor-not-allowed' : 'aso-cursor-pointer'}`">No, cancel</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </template>
  
  <script setup>
    import api from '@/admin/Api/api';
    import {onMounted, ref} from 'vue';
    import { useRoute } from 'vue-router';
    import toastMessage from '@/admin/utils/functions'
    import router from '@/admin/router';

    const route = useRoute()
    const configID = ref(route.params.configId)
    const config =ref("");
    const materials = ref([]);
    const newMaterial = ref({
        name:"",
        description:"",
        icon:"",
        popImg:"",
        type:"simple",
    });
    const materialId = ref(0);
    const isLoading = ref(false);
    const isFetching = ref(false);
    const configMaterial = ref(true);
    const isNewComponent = ref(false);
    const isEdit = ref(false);
    const openModal = ref(false);
    const deleteMaterial = ref({
        id:null,
        name:""
    })
    const notFoundMessage = ref('');

const fetchMaterials = async () => {
    const result = await api.getMaterials(configID.value);
    if(!result.message){
        materials.value = result;
    }else{
        materials.value = [];
        notFoundMessage.value = result.message;
    }
    isFetching.value = false;
  }
    const getInitials = (str) => {
        const words = str.split(' ');
        const initials = words.map(word => word.trim().charAt(0).toUpperCase());
        const result = initials.join('');
        return result;
    }

    onMounted(async() => {
        isFetching.value = true;
        const res = await api.getConfig(configID.value);
        config.value = res.name;
        await fetchMaterials();

    });

  /**Function for adding */

  const addNewMaterial = async () => {
    isLoading.value = true;
    const result = await api.addMaterial(configID.value,newMaterial.value);
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
        toastMessage(result.message)
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
    const selectMaterialPopImg = async(e) => { 
        e.preventDefault();
        var uploader = wp.media(
            {
                title: "Select Material Pop Image",
                button: {
                    text: "Select Image"
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
                                newMaterial.value.popImg = (attachment.url);
                            }
                        }
                    );
                }
            )
            .open();
    }

    /** Function for Editing */

    const selectMaterialEdit = (material, id) => {
        materialId.value = id;
        newMaterial.value = material;
        isEdit.value = true;
        isNewComponent.value = true;
    }
    

    const updateMaterial = async () => {
        isLoading.value = true;
        const result = await api.updateMarerial(configID.value,materialId.value,newMaterial.value);
        if(result.success){
            await fetchMaterials();
            if(result.sucess = true){
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
                isEdit.value = false;
                toastMessage(result.message,"warning");
            }
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

    /** Modal Function */
    const closeModal = ()=>{
        if(!isLoading.value){        
            openModal.value = !openModal.value;
        }
    }
  
    const addComponent = () => {
        isNewComponent.value = true;
    }
    const back = () => {
        isNewComponent.value = false;
        isEdit.value = false;
        newMaterial.value = {
            name:"",
            description:"",
            icon:"",
            popImg:"",
            type:"simple",
        }
    }

    const redirectToMaterail = (materialId,type) => {
        if(type == 'simple'){
            router.push('/configs/'+configID.value+'/materials/'+materialId+'/simple/sizes');
        }else{
            router.push('/configs/'+configID.value+'/materials/'+materialId+'/advance');
        }
    }
  </script>
  