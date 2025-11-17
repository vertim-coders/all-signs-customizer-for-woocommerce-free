<template>
    <div class="">
        <div class="asowp-space-y-1 " v-if="!createTemplate">
            <div class="asowp-bg-[#F8F9FB]">
                <div class="asowp-flex asowp-justify-end asowp-items-center asowp-py-4">
                    <div class="asowp-w-1/4">
                        <button class="asowp-flex asowp-w-fit asowp-rounded asowp-bg-[#016464] asowp-px-4 asowp-space-x-2 asowp-p-1.5 asowp-border-none asowp-text-white asowp-opacity-90 hover:asowp-opacity-100 asowp-cursor-pointer asowp-h-[40px] asowp-flex asowp-items-center asowp-justify-center" @click="openModal = true">
                            <svg class="asowp-w-5 asowp-h-5" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g id="plus-lg">
                                <path id="Vector" fill-rule="evenodd" clip-rule="evenodd" d="M11 2.75C11.1823 2.75 11.3572 2.82243 11.4861 2.95136C11.6151 3.0803 11.6875 3.25516 11.6875 3.4375V10.3125H18.5625C18.7448 10.3125 18.9197 10.3849 19.0486 10.5139C19.1776 10.6428 19.25 10.8177 19.25 11C19.25 11.1823 19.1776 11.3572 19.0486 11.4861C18.9197 11.6151 18.7448 11.6875 18.5625 11.6875H11.6875V18.5625C11.6875 18.7448 11.6151 18.9197 11.4861 19.0486C11.3572 19.1776 11.1823 19.25 11 19.25C10.8177 19.25 10.6428 19.1776 10.5139 19.0486C10.3849 18.9197 10.3125 18.7448 10.3125 18.5625V11.6875H3.4375C3.25516 11.6875 3.0803 11.6151 2.95136 11.4861C2.82243 11.3572 2.75 11.1823 2.75 11C2.75 10.8177 2.82243 10.6428 2.95136 10.5139C3.0803 10.3849 3.25516 10.3125 3.4375 10.3125H10.3125V3.4375C10.3125 3.25516 10.3849 3.0803 10.5139 2.95136C10.6428 2.82243 10.8177 2.75 11 2.75Z" fill="white"/>
                                </g>
                            </svg>
                            <div class="asowp-text-[14px]">
                                Add new Category
                            </div>
                        </button>
                    </div>
                </div>
                <div class="asowp-relative " id="monTableau">
                    <table class="asowp-text-center asowp-w-full asowp-border asowp-border-collapse asowp-border-0">
                        <thead class="asowp-bg-[#f0f0f1]">
                            <tr class="">
                                <th scope="col" class="asowp-px-6 asowp-py-3 asowp-text-[14px] asowp-font-semibold">
                                    Title
                                </th>
                                <th scope="col" class="asowp-px-6 asowp-py-3 asowp-text-[14px] asowp-font-semibold">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody class="asowp-bg-white">
                            <tr v-if="isFetching">
                                <td colspan="2">
                                    <div class="asowp-bg-white asowp-border-solid asowp-border asowp-border-[#D1D1D1] asowp-flex asowp-flex-col asowp-space-y-2 asowp-justify-center asowp-items-center asowp-w-full asowp-h-[200px] p-4">
                                        <img class="asowp-w-[100px] asowp-h-[100px]" src="../../../../assets/icons/ic_loading.svg" alt="">
                                    </div>
                                </td>
                            </tr>
                            <tr v-if="Object.keys(categories).length == 0 && !isFetching">
                                <td colspan="2">
                                    <div class="asowp-bg-white asowp-border-solid asowp-border asowp-border-[#D1D1D1] asowp-flex asowp-flex-col asowp-space-y-12 asowp-justify-center asowp-items-center asowp-py-10 asowp-h-[150px]">
                                        <div class="asowp-flex asowp-flex-col asowp-space-y-2 asowp-justify-center asowp-items-center">
                                            <p class="asowp-text-2xl asowp-font-bold">{{notFoundMessage}}</p>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr class="asowp-border-t-0 asowp-border-l-0 asowp-border-r-0 asowp-border-b-2 asowp-border-solid asowp-border-[#f0f0f1]" v-for="(cat,key) in categories">
                                <td class="asowp-px-6 asowp-text-[14px] asowp-py-2 asowp-space-x-2">
                                    {{ cat }}
                                </td>
                                <td class="asowp-px-6 asowp-py-2 asowp-space-x-2">
                                    <button class="asowp-bg-transparent asowp-border-none asowp-text-[#2DD05B] asowp-cursor-pointer" @click="()=>selectCategory(key,cat,false)">
                                        <img class="asowp-w-5 asowp-h-5" src="../../../../assets/icons/ic_edit.svg" alt="">
                                    </button>
                                    
                                    <button class="asowp-bg-transparent asowp-border-none asowp-text-[#A00000] asowp-cursor-pointer" @click="()=>selectCategory(key,cat,true)">
                                        <img class="asowp-w-5 asowp-h-5" src="../../../../assets/icons/ic_delete.svg" alt="">
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <!-- open Modal-->
        <div v-if="openModal" @click.self="isLoading?closeModal:''" class="asowp-z-[999] asowp-bg-gray-400 asowp-overflow-y-auto asowp-overflow-x-hidden asowp-fixed asowp-top-0 asowp-right-[25%] asowp-left-[75%] asowp-flex asowp-justify-center asowp-items-center asowp-w-full md:asowp-inset-0 asowp-h-full">
            <div class="asowp-relative asowp-p-4 asowp-w-full asowp-max-w-md asowp-max-h-full">
                <div class="asowp-relative asowp-bg-white asowp-rounded-lg asowp-shadow dark:bg-gray-700">
                    <button :disabled="isLoading" @click.stop="closeModal" class="asowp-absolute asowp-top-3 asowp-end-2.5 asowp-text-gray-400 asowp-bg-transparent hover:bg-gray-200 hover:text-gray-900 asowp-rounded-lg asowp-text-sm asowp-w-8 asowp-h-8 asowp-ms-auto asowp-inline-flex asowp-justify-center asowp-items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal">
                        <svg class="asowp-w-3 asowp-h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                        <span class="asowp-sr-only">Close modal</span>
                    </button>
                    <div class="asowp-p-4 md:p-5 asowp-text-center">
                        <svg class="asowp-mx-auto asowp-mb-4 asowp-text-gray-400 asowp-w-12 asowp-h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                        </svg>
                        <h3 class="asowp-mb-5 asowp-text-lg asowp-font-normal asowp-text-gray-500 dark:text-gray-400">Name category</h3>
                        <input type="text" class="asowp-rounded asowp-w-full asowp-h-[35px] asowp-text-center asowp-p-4 asowp-my-2 asowp-border-none" v-model="category"/>
                        <button :disabled="isLoading"  v-if="!isEdit && !isDelete" @click="saveCategory" data-modal-hide="popup-modal" class="asowp-border-solid asowp-text-white asowp-bg-[#016464] asowp-cursor-pointer hover:bg-[#016464] focus:ring-4 focus:outline-none asowp-my-2 asowp-border-none  focus:ring-red-300 dark:focus:ring-[#016464] asowp-font-medium asowp-rounded-lg asowp-text-sm asowp-inline-flex asowp-items-center asowp-px-5 asowp-py-2.5 asowp-text-center">
                            <img src="../../../../assets/icons/ic_loading_gray.svg" class="asowp-w-5 asowp-w-5" v-if="isLoading"/>
                            Add new category
                        </button>
                        <button :disabled="isLoading" v-if="isEdit" @click="updateCategory" data-modal-hide="popup-modal" class="asowp-border-solid asowp-text-white asowp-bg-yellow-400 asowp-cursor-pointer hover:bg-yellow-600 focus:ring-4 focus:outline-none asowp-my-2 asowp-border-none  focus:ring-yellow-600 dark:focus:ring-yellow-800 asowp-font-medium asowp-rounded-lg asowp-text-sm asowp-inline-flex asowp-items-center asowp-px-5 asowp-py-2.5 asowp-text-center">
                            <img src="../../../../assets/icons/ic_loading_gray.svg" class="asowp-w-5 asowp-w-5" v-if="isLoading"/>
                            Update category
                        </button>
                        <button :disabled="isLoading" v-if="isDelete" @click="deleteCategory" data-modal-hide="popup-modal" class="asowp-border-solid asowp-text-white asowp-bg-red-600 asowp-cursor-pointer hover:bg-red-800 focus:ring-4 focus:outline-none asowp-my-2 asowp-border-none  focus:ring-red-300 dark:focus:ring-red-800 asowp-font-medium asowp-rounded-lg asowp-text-sm asowp-inline-flex asowp-items-center asowp-px-5 asowp-py-2.5 asowp-text-center">
                            <img src="../../../../assets/icons/ic_loading_gray.svg" class="asowp-w-5 asowp-w-5" v-if="isLoading"/>
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