<template>
    <div class="">
        <div class="aso-space-y-1 " v-if="!createTemplate">
            <div class="aso-bg-[#F8F9FB]">
                <div class="aso-flex aso-justify-end aso-items-center aso-py-4">
                    <div class="aso-w-1/4">
                        <button class="aso-flex aso-w-fit aso-rounded aso-bg-[#016464] aso-px-4 aso-space-x-2 aso-p-1.5 aso-border-none aso-text-white aso-opacity-90 hover:aso-opacity-100 aso-cursor-pointer aso-h-[40px] aso-flex aso-items-center aso-justify-center" @click="openModal = true">
                            <svg class="aso-w-5 aso-h-5" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g id="plus-lg">
                                <path id="Vector" fill-rule="evenodd" clip-rule="evenodd" d="M11 2.75C11.1823 2.75 11.3572 2.82243 11.4861 2.95136C11.6151 3.0803 11.6875 3.25516 11.6875 3.4375V10.3125H18.5625C18.7448 10.3125 18.9197 10.3849 19.0486 10.5139C19.1776 10.6428 19.25 10.8177 19.25 11C19.25 11.1823 19.1776 11.3572 19.0486 11.4861C18.9197 11.6151 18.7448 11.6875 18.5625 11.6875H11.6875V18.5625C11.6875 18.7448 11.6151 18.9197 11.4861 19.0486C11.3572 19.1776 11.1823 19.25 11 19.25C10.8177 19.25 10.6428 19.1776 10.5139 19.0486C10.3849 18.9197 10.3125 18.7448 10.3125 18.5625V11.6875H3.4375C3.25516 11.6875 3.0803 11.6151 2.95136 11.4861C2.82243 11.3572 2.75 11.1823 2.75 11C2.75 10.8177 2.82243 10.6428 2.95136 10.5139C3.0803 10.3849 3.25516 10.3125 3.4375 10.3125H10.3125V3.4375C10.3125 3.25516 10.3849 3.0803 10.5139 2.95136C10.6428 2.82243 10.8177 2.75 11 2.75Z" fill="white"/>
                                </g>
                            </svg>
                            <div class="aso-text-[14px]">
                                Add new Category
                            </div>
                        </button>
                    </div>
                </div>
                <div class="aso-relative " id="monTableau">
                    <table class="aso-text-center aso-w-full aso-border aso-border-collapse aso-border-0">
                        <thead class="aso-bg-[#f0f0f1]">
                            <tr class="">
                                <th scope="col" class="aso-px-6 aso-py-3 aso-text-[14px] aso-font-semibold">
                                    Title
                                </th>
                                <th scope="col" class="aso-px-6 aso-py-3 aso-text-[14px] aso-font-semibold">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody class="aso-bg-white">
                            <tr v-if="isFetching">
                                <td colspan="2">
                                    <div class="aso-bg-white aso-border-solid aso-border aso-border-[#D1D1D1] aso-flex aso-flex-col aso-space-y-2 aso-justify-center aso-items-center aso-w-full aso-h-[200px] p-4">
                                        <img class="aso-w-[100px] aso-h-[100px]" src="../../../../assets/icons/ic_loading.svg" alt="">
                                    </div>
                                </td>
                            </tr>
                            <tr v-if="Object.keys(categories).length == 0 && !isFetching">
                                <td colspan="2">
                                    <div class="aso-bg-white aso-border-solid aso-border aso-border-[#D1D1D1] aso-flex aso-flex-col aso-space-y-12 aso-justify-center aso-items-center aso-py-10 aso-h-[150px]">
                                        <div class="aso-flex aso-flex-col aso-space-y-2 aso-justify-center aso-items-center">
                                            <p class="aso-text-2xl aso-font-bold">{{notFoundMessage}}</p>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr class="aso-border-t-0 aso-border-l-0 aso-border-r-0 aso-border-b-2 aso-border-solid aso-border-[#f0f0f1]" v-for="(cat,key) in categories">
                                <td class="aso-px-6 aso-text-[14px] aso-py-2 aso-space-x-2">
                                    {{ cat }}
                                </td>
                                <td class="aso-px-6 aso-py-2 aso-space-x-2">
                                    <button class="aso-bg-transparent aso-border-none aso-text-[#2DD05B] aso-cursor-pointer" @click="()=>selectCategory(key,cat,false)">
                                        <img class="aso-w-5 aso-h-5" src="../../../../assets/icons/ic_edit.svg" alt="">
                                    </button>
                                    
                                    <button class="aso-bg-transparent aso-border-none aso-text-[#A00000] aso-cursor-pointer" @click="()=>selectCategory(key,cat,true)">
                                        <img class="aso-w-5 aso-h-5" src="../../../../assets/icons/ic_delete.svg" alt="">
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <!-- open Modal-->
        <div v-if="openModal" @click.self="isLoading?closeModal:''" class="aso-z-[999] aso-bg-gray-400 aso-overflow-y-auto aso-overflow-x-hidden aso-fixed aso-top-0 aso-right-[25%] aso-left-[75%] aso-flex aso-justify-center aso-items-center aso-w-full md:aso-inset-0 aso-h-full">
            <div class="aso-relative aso-p-4 aso-w-full aso-max-w-md aso-max-h-full">
                <div class="aso-relative aso-bg-white aso-rounded-lg aso-shadow dark:bg-gray-700">
                    <button :disabled="isLoading" @click.stop="closeModal" class="aso-absolute aso-top-3 aso-end-2.5 aso-text-gray-400 aso-bg-transparent hover:bg-gray-200 hover:text-gray-900 aso-rounded-lg aso-text-sm aso-w-8 aso-h-8 aso-ms-auto aso-inline-flex aso-justify-center aso-items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal">
                        <svg class="aso-w-3 aso-h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                        <span class="aso-sr-only">Close modal</span>
                    </button>
                    <div class="aso-p-4 md:p-5 aso-text-center">
                        <svg class="aso-mx-auto aso-mb-4 aso-text-gray-400 aso-w-12 aso-h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                        </svg>
                        <h3 class="aso-mb-5 aso-text-lg aso-font-normal aso-text-gray-500 dark:text-gray-400">Name category</h3>
                        <input type="text" class="aso-rounded aso-w-full aso-h-[35px] aso-text-center aso-p-4 aso-my-2 aso-border-none" v-model="category"/>
                        <button :disabled="isLoading"  v-if="!isEdit && !isDelete" @click="saveCategory" data-modal-hide="popup-modal" class="aso-border-solid aso-text-white aso-bg-[#016464] aso-cursor-pointer hover:bg-[#016464] focus:ring-4 focus:outline-none aso-my-2 aso-border-none  focus:ring-red-300 dark:focus:ring-[#016464] aso-font-medium aso-rounded-lg aso-text-sm aso-inline-flex aso-items-center aso-px-5 aso-py-2.5 aso-text-center">
                            <img src="../../../../assets/icons/ic_loading_gray.svg" class="aso-w-5 aso-w-5" v-if="isLoading"/>
                            Add new category
                        </button>
                        <button :disabled="isLoading" v-if="isEdit" @click="updateCategory" data-modal-hide="popup-modal" class="aso-border-solid aso-text-white aso-bg-yellow-400 aso-cursor-pointer hover:bg-yellow-600 focus:ring-4 focus:outline-none aso-my-2 aso-border-none  focus:ring-yellow-600 dark:focus:ring-yellow-800 aso-font-medium aso-rounded-lg aso-text-sm aso-inline-flex aso-items-center aso-px-5 aso-py-2.5 aso-text-center">
                            <img src="../../../../assets/icons/ic_loading_gray.svg" class="aso-w-5 aso-w-5" v-if="isLoading"/>
                            Update category
                        </button>
                        <button :disabled="isLoading" v-if="isDelete" @click="deleteCategory" data-modal-hide="popup-modal" class="aso-border-solid aso-text-white aso-bg-red-600 aso-cursor-pointer hover:bg-red-800 focus:ring-4 focus:outline-none aso-my-2 aso-border-none  focus:ring-red-300 dark:focus:ring-red-800 aso-font-medium aso-rounded-lg aso-text-sm aso-inline-flex aso-items-center aso-px-5 aso-py-2.5 aso-text-center">
                            <img src="../../../../assets/icons/ic_loading_gray.svg" class="aso-w-5 aso-w-5" v-if="isLoading"/>
                            Delete category
                        </button>
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import api from "@/admin/Api/api";
import toastMessage from "@/admin/utils/functions";
import { onMounted, ref } from "vue";
    const createTemplate = ref(false);
    const openModal = ref(false);
    const notFoundMessage = ref('')
    const categories = ref({});
    const isFetching = ref(true);
    const category = ref('');
    const isLoading = ref(false);
    const isEdit = ref(false);
    const isDelete = ref(false);
    const category_id = ref('');
    onMounted(async() => {
        isFetching.value = true;
        await fetchCategories();
        isFetching.value = false;
    });
    const fetchCategories = async ()=>{
        const result = await api.getAllCategories();
        if(result.message){
            notFoundMessage.value = result.message
        }else{
            categories.value = result;
        }
    }
    const saveCategory = async ()=> {
        isLoading.value = true;
        const save = await api.createCategory(category.value);
        if(save.success){
            categories.value = save.categories;
            closeModal();
            toastMessage(save.message);
        }else{
            toastMessage(save.message,'error');
            closeModal();
            category.value = ''
        }
        
    }
    const updateCategory = async ()=>{
        isLoading.value = true;
        const update = await api.updateCategory(category_id.value,category.value);
        if(update.success){
            categories.value = update.categories;
            isLoading.value = false;
            closeModal();
            if(update.success == true){
                toastMessage(update.message);
            }else{
                toastMessage(update.message,"warning");
            }
        }else{
            toastMessage(update.message,'error');
            isLoading.value = false;
            closeModal();
        }

    }
    const deleteCategory = async ()=>{
        isLoading.value = true;
        const del = await api.deleteCategory(category_id.value);
        if(del.success){
            isLoading.value = false;
            categories.value = del.categories;
            closeModal();
            toastMessage(del.message);
        }else{
            isLoading.value = false;
            toastMessage(del.message,'error');
            closeModal();
        }
    }
    const closeModal = ()=>{       
        openModal.value = false;
        isEdit.value = false;
        isDelete.value = false;
        category.value = '',
        category_id.value = ''
    }
    const selectCategory = (key,cat,del=false)=>{
        category_id.value = key;
        category.value = cat;
        if(del){
            isDelete.value=true
        }else{
            isEdit.value = true;
        }
        openModal.value = true;
    }
</script>