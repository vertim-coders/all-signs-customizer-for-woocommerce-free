<template>
    <div class="">
        <div class="asowp-space-y-1 asowp-translate-y-9" v-show="!createGroup">
            <div class="asowp-bg-[#F8F9FB] asowp-text-[16px] asowp-space-x-1 asowp-px-4 asowp-py-4 asowp-flex">
                <span class="asowp-font-bold">
                    List of clipart group
                </span>
            </div>
            <div v-if="!isFetching" class="asowp-flex asowp-justify-end asowp-space-x-2 asowp-w-4/4 asowp-bg-[#F8F9FB] asowp-text-[12px] asowp-px-4 asowp-py-4 asowp-pb-2">
                <button class="asowp-flex asowp-w-fit asowp-h-fit asowp-rounded asowp-bg-[#016464] asowp-px-4 asowp-space-x-2 asowp-p-1.5 asowp-border-none asowp-text-white asowp-opacity-90 hover:asowp-opacity-100 asowp-cursor-pointer" @click="addGroup">
                    <svg class="asowp-w-5 asowp-h-5" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="plus-lg">
                        <path id="Vector" fill-rule="evenodd" clip-rule="evenodd" d="M11 2.75C11.1823 2.75 11.3572 2.82243 11.4861 2.95136C11.6151 3.0803 11.6875 3.25516 11.6875 3.4375V10.3125H18.5625C18.7448 10.3125 18.9197 10.3849 19.0486 10.5139C19.1776 10.6428 19.25 10.8177 19.25 11C19.25 11.1823 19.1776 11.3572 19.0486 11.4861C18.9197 11.6151 18.7448 11.6875 18.5625 11.6875H11.6875V18.5625C11.6875 18.7448 11.6151 18.9197 11.4861 19.0486C11.3572 19.1776 11.1823 19.25 11 19.25C10.8177 19.25 10.6428 19.1776 10.5139 19.0486C10.3849 18.9197 10.3125 18.7448 10.3125 18.5625V11.6875H3.4375C3.25516 11.6875 3.0803 11.6151 2.95136 11.4861C2.82243 11.3572 2.75 11.1823 2.75 11C2.75 10.8177 2.82243 10.6428 2.95136 10.5139C3.0803 10.3849 3.25516 10.3125 3.4375 10.3125H10.3125V3.4375C10.3125 3.25516 10.3849 3.0803 10.5139 2.95136C10.6428 2.82243 10.8177 2.75 11 2.75Z" fill="white"/>
                        </g>
                    </svg>
                    <div class="asowp-text-[14px]">
                        Add new clipart group
                    </div>
                </button>
            </div>
            
            <div class="asowp-relative" id="monTableau">
                <table class="asowp-text-center asowp-w-full asowp-border asowp-border-collapse asowp-border-0">
                    <thead class="asowp-bg-[#f0f0f1]">
                        <tr class="">
                            <th scope="col" class="asowp-px-6 asowp-py-3 asowp-text-[14px] asowp-font-semibold">
                                Title
                            </th>
                            <th scope="col" class="asowp-px-6 asowp-py-3 asowp-text-[14px] asowp-font-semibold">
                                Description
                            </th>
                            <th scope="col" class="asowp-px-6 asowp-py-3 asowp-text-[14px] asowp-font-semibold">
                                Action
                            </th>
                            
                        </tr>
                    </thead>
                    <tbody class="asowp-bg-white">
                        <tr v-if="isFetching">
                            <td colspan="3">
                                <div class="asowp-bg-white asowp-border-solid asowp-border asowp-border-[#D1D1D1] asowp-flex asowp-flex-col asowp-space-y-2 asowp-justify-center asowp-items-center asowp-w-full asowp-h-[306px] p-4">
                                    <img class="asowp-w-[200px] asowp-h-[200px]" src="../../../../assets/icons/ic_loading.svg" alt="">
                                </div>
                            </td>
                        </tr>
                        <tr  v-if="clipartsGroups.length == 0 && !isFetching">
                            <td colspan="3">
                                <div class="asowp-bg-white asowp-border-solid asowp-border asowp-border-[#D1D1D1] asowp-flex asowp-flex-col asowp-space-y-12 asowp-justify-center asowp-items-center asowp-py-10 asowp-h-[306px]">
                                    <div class="asowp-flex asowp-flex-col asowp-space-y-2 asowp-justify-center asowp-items-center">
                                        <p class="asowp-text-2xl asowp-font-bold">{{noFoundMessage}}</p>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        
                        <tr v-for="(group,key) in clipartsGroups"  class="asowp-border-t-0 asowp-border-l-0 asowp-border-r-0 asowp-border-b-2 asowp-border-solid asowp-border-[#f0f0f1]">
                            <td class="asowp-px-6 asowp-text-[14px] asowp-py-2 asowp-flex asowp-justify-center asowp-space-x-2">
                                {{ group.title }}
                            </td>
                            <td class="asowp-px-6 asowp-py-2 asowp-text-center asowp-text-[11px]">
                                <span class="asowp-overflow-hidden asowp-whitespace-nowrap asowp-text-ellipsis">{{ group.description }}</span>
                            </td>
                            <td class="asowp-px-6 asowp-py-2 asowp-flex asowp-justify-center asowp-space-x-2">
                                <button class="asowp-bg-transparent asowp-border-none asowp-text-[#2DD05B] asowp-cursor-pointer" @click="selectGroup(key,group)">
                                    <img class="asowp-w-5 asowp-h-5" src="../../../../assets/icons/ic_edit.svg" alt="">
                                </button>
                                <button class="asowp-bg-[#FFC7D8] asowp-p-2 asowp-rounded-md asowp-border-none asowp-cursor-pointer asowp-space-x-1 asowp-flex" @click="()=>$router.push('/manage-cliparts/'+key+'/cliparts')">
                                    <img class="asowp-w-4 asowp-h-4" src="../../../../assets/icons/ic_manage.svg" alt="">
                                    <span class="asowp-text-[12px]">
                                        Manage
                                    </span>
                                </button>
                                <button class="asowp-bg-transparent asowp-border-none asowp-text-[#A00000] asowp-cursor-pointer" @click="selectGroup(key,group,true)">
                                    <img class="asowp-w-5 asowp-h-5" src="../../../../assets/icons/ic_delete.svg" alt="">
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="asowp-space-y-1 asowp-translate-y-9" v-show="createGroup">
            <div class="asowp-bg-[#F8F9FB] asowp-px-4 asowp-py-4">
                <span class="asowp-text-[16px] asowp-font-bold">
                    Create new clipart group
                </span>
            </div>
            <div class="asowp-bg-[#F8F9FB] asowp-px-4 asowp-py-4 asowp-space-y-8">
                <div class="asowp-flex asowp-justify-between">
                    <div class="asowp-w-2/5 asowp-space-y-2 asowp-flex asowp-flex-col asowp-text-[14px]">
                        <label for="" class="asowp-font-normal">Title <span class="asowp-text-red-500">*</span></label>
                        <input type="text" v-model="newGroup.title" :class="`${emptyLabel?'asowp-field-required':''} asowp-rounded asowp-w-full asowp-h-[30px]`">
                    </div>
                    <div class="asowp-w-2/5 asowp-space-y-2 asowp-flex asowp-flex-col asowp-text-[12px]">
                        <label for="" class="asowp-font-normal">Description</label>
                        <input type="text" class="asowp-rounded asowp-w-full asowp-h-[32px]" v-model="newGroup.description">
                        
                    </div>
                </div>
            </div>
            <div class="asowp-bg-[#F8F9FB] asowp-flex asowp-font-bold asowp-space-x-4 asowp-px-4 asowp-py-4 asowp-justify-end asowp-items-end">
                <div class="asowp-bg-[#016464] asowp-rounded">
                    <button :disabled="isLoading" class="asowp-flex asowp-bg-transparent asowp-w-fit asowp-space-x-2 asowp-h-fit asowp-px-8 asowp-p-2 asowp-border-none asowp-text-white asowp-opacity-90 hover:asowp-border-none hover:asowp-text-white hover:asowp-opacity-100 asowp-cursor-pointer" @click="back">
                        <svg class="asowp-w-6 asowp-h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 12L5 8V11L17.17 11C17.3756 10.414 17.7586 9.90661 18.2657 9.54821C18.7729 9.18981 19.379 8.9982 20 9C20.7956 9 21.5587 9.31607 22.1213 9.87868C22.6839 10.4413 23 11.2044 23 12C23 12.7956 22.6839 13.5587 22.1213 14.1213C21.5587 14.6839 20.7956 15 20 15C18.69 15 17.58 14.17 17.17 13L5 13V16L1 12Z" fill="currentColor"/>
                        </svg>

                        <div class="asowp-font-semibold asowp-text-[16px]">Back</div>
                    </button>
                </div>
                <div class="asowp-bg-[#016464] asowp-rounded" v-if="isEdit">
                    <button @click="updateGroup" :class="`asowp-rounded asowp-flex ${!isLoading ? 'asowp-bg-amber-400 ' :'asowp-bg-amber-500'} asowp-w-fit asowp-space-x-2 asowp-h-fit asowp-px-8 asowp-text-white asowp-p-2 asowp-border-none asowp-opacity-90 hover:asowp-border-none hover:asowp-text-white hover:asowp-opacity-100 asowp-cursor-pointer`">
                        <img src="../../../../assets/icons/ic_loading_gray.svg" class="asowp-w-5 asowp-w-5" v-if="isLoading" :disabled="isLoading"/>
                        <div class="asowp-font-semibold asowp-text-[16px]">Update</div>
                    </button>
                </div>
                <div class="asowp-bg-[#016464] asowp-rounded" v-if="!isEdit">
                    <button @click="addNewGroup" class="asowp-flex asowp-bg-transparent asowp-w-fit asowp-space-x-2 asowp-h-fit asowp-text-white asowp-px-8 asowp-p-2.5 asowp-rounded asowp-border-none asowp-opacity-90 hover:asowp-opacity-100 hover:asowp-border-none hover:asowp-text-white hover:asowp-bg-[#016464] asowp-cursor-pointer">
                        <div class="asowp-translate-y-1">
                            <img src="../../../../assets/icons/ic_loading_gray.svg" class="asowp-w-5 asowp-w-5" v-if="isLoading" :disabled="isLoading"/>
                            <svg v-if="!isLoading" class="asowp-w-4 asowp-h-4" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2.5 1.25C2.16848 1.25 1.85054 1.3817 1.61612 1.61612C1.3817 1.85054 1.25 2.16848 1.25 2.5V17.5C1.25 17.8315 1.3817 18.1495 1.61612 18.3839C1.85054 18.6183 2.16848 18.75 2.5 18.75H17.5C17.8315 18.75 18.1495 18.6183 18.3839 18.3839C18.6183 18.1495 18.75 17.8315 18.75 17.5V2.5C18.75 2.16848 18.6183 1.85054 18.3839 1.61612C18.1495 1.3817 17.8315 1.25 17.5 1.25H11.875C11.5435 1.25 11.2255 1.3817 10.9911 1.61612C10.7567 1.85054 10.625 2.16848 10.625 2.5V11.6163L13.9325 8.3075C14.0499 8.19014 14.209 8.12421 14.375 8.12421C14.541 8.12421 14.7001 8.19014 14.8175 8.3075C14.9349 8.42486 15.0008 8.58403 15.0008 8.75C15.0008 8.91597 14.9349 9.07514 14.8175 9.1925L10.4425 13.5675C10.3844 13.6257 10.3155 13.6719 10.2395 13.7034C10.1636 13.7349 10.0822 13.7511 10 13.7511C9.91779 13.7511 9.83639 13.7349 9.76046 13.7034C9.68453 13.6719 9.61556 13.6257 9.5575 13.5675L5.1825 9.1925C5.12439 9.13439 5.07829 9.0654 5.04685 8.98948C5.0154 8.91356 4.99921 8.83218 4.99921 8.75C4.99921 8.66782 5.0154 8.58644 5.04685 8.51052C5.07829 8.4346 5.12439 8.36561 5.1825 8.3075C5.24061 8.24939 5.3096 8.20329 5.38552 8.17185C5.46144 8.1404 5.54282 8.12421 5.625 8.12421C5.70718 8.12421 5.78856 8.1404 5.86448 8.17185C5.9404 8.20329 6.00939 8.24939 6.0675 8.3075L9.375 11.6163V2.5C9.375 1.83696 9.63839 1.20107 10.1072 0.732233C10.5761 0.263392 11.212 0 11.875 0L17.5 0C18.163 0 18.7989 0.263392 19.2678 0.732233C19.7366 1.20107 20 1.83696 20 2.5V17.5C20 18.163 19.7366 18.7989 19.2678 19.2678C18.7989 19.7366 18.163 20 17.5 20H2.5C1.83696 20 1.20107 19.7366 0.732233 19.2678C0.263392 18.7989 0 18.163 0 17.5V2.5C0 1.83696 0.263392 1.20107 0.732233 0.732233C1.20107 0.263392 1.83696 0 2.5 0L5.625 0C5.79076 0 5.94973 0.065848 6.06694 0.183058C6.18415 0.300269 6.25 0.45924 6.25 0.625C6.25 0.79076 6.18415 0.949732 6.06694 1.06694C5.94973 1.18415 5.79076 1.25 5.625 1.25H2.5Z" fill="white"/>
                            </svg>
                        </div>

                        <span class="asowp-font-semibold asowp-text-[16px]">Save</span>
                    </button>
                </div>
            </div>
        </div>
        <!-- Delete Modal-->
        <div v-if="openModal" @click.self="closeModal" class="asowp-bg-gray-400 asowp-overflow-y-auto asowp-overflow-x-hidden asowp-fixed asowp-top-0 asowp-right-[25%] asowp-left-[75%] asowp-z-[999] asowp-flex asowp-justify-center asowp-items-center asowp-w-full md:asowp-inset-0 asowp-h-full">
            <div class="asowp-relative asowp-p-4 asowp-w-full asowp-max-w-md asowp-max-h-full">
                <div class="asowp-relative asowp-bg-white asowp-rounded-lg asowp-shadow dark:bg-gray-700">
                    <button @click.stop="closeModal" type="button" :class="`${isLoading ? 'asowp-cursor-not-allowed' : 'asowp-cursor-pointer'} asowp-absolute asowp-top-3 asowp-end-2.5 asowp-text-gray-400 asowp-bg-transparent hover:bg-gray-200 hover:text-gray-900 asowp-rounded-lg asowp-text-sm asowp-w-8 asowp-h-8 asowp-ms-auto asowp-inline-flex asowp-justify-center asowp-items-center dark:hover:bg-gray-600 dark:hover:text-white`" data-modal-hide="popup-modal">
                        <svg class="asowp-w-3 asowp-h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                        <span class="asowp-sr-only">Close modal</span>
                    </button>
                    <div class="asowp-p-4 md:p-5 asowp-text-center">
                        <svg class="asowp-mx-auto asowp-mb-4 asowp-text-gray-400 asowp-w-12 asowp-h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                        </svg>
                        <h3 class="asowp-mb-5 asowp-text-lg asowp-font-normal asowp-text-gray-500 dark:text-gray-400">Are you sure you want to delete this cliparts Group ?</h3>
                        <input v-model="newGroup.title" readonly class="asowp-rounded asowp-w-full asowp-h-[35px] asowp-text-center asowp-p-4 asowp-my-2 asowp-border-none" />
                        <button @click="deleteGroup" data-modal-hide="popup-modal" type="button" :class="`asowp-border-solid asowp-text-white ${!isLoading ? 'asowp-bg-red-600 asowp-cursor-pointer' :'asowp-bg-red-700 asowp-cursor-not-allowed'} hover:bg-red-800 focus:ring-4 focus:outline-none asowp-my-2 asowp-border-none  focus:ring-red-300 dark:focus:ring-red-800 asowp-font-medium asowp-rounded-lg asowp-text-sm asowp-inline-flex asowp-items-center asowp-px-5 asowp-py-2.5 asowp-text-center`">
                            <img src="../../../../assets/icons/ic_loading_gray.svg" class="asowp-w-5 asowp-w-5" v-if="isLoading" :disabled="isLoading"/>
                            Yes, I'm sure
                        </button>
                        <button @click.stop="closeModal" data-modal-hide="popup-modal" type="button" :class="`asowp-border-solid asowp-py-2.5 asowp-px-5 asowp-ms-3 asowp-text-sm asowp-font-medium asowp-text-gray-900 asowp-my-2  asowp-border-gray-500 asowp-border-white focus:outline-none asowp-bg-white asowp-rounded-lg asowp-border asowp-border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 ${isLoading ? 'asowp-cursor-not-allowed' : 'asowp-cursor-pointer'}`">No, cancel</button>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
  </template>
  
  <script setup>
    import { ref, onMounted } from "vue";
    import api from "@/admin/Api/api";
import toastMessage from "@/admin/utils/functions";

    const clipartsGroups = ref([]);
    const noFoundMessage = ref('');
    const isEdit = ref(false);
    const createGroup = ref(false);
    const editId = ref(null);
    const openModal = ref(false);
    const isFetching = ref(false)
    const newGroup = ref({
        title:'',
        description:''
    });
    const emptyLabel = ref(false);
    const isLoading = ref(false);


    onMounted(async() => {
        isFetching.value = true;
        await fetchGroups();
        
    });

    const fetchGroups = async () => {
        const result = await api.getManageCliparts();
        clipartsGroups.value = result.data;
        noFoundMessage.value = result.noGroupsFound;
        isFetching.value = false;
    }
    const addNewGroup = async () => {
        if(newGroup.value.title.trim() !==''){
            isLoading.value = true;
            emptyLabel.value = false;
            const result = await api.addManageClipart(newGroup.value);
            if(result.success){
                await fetchGroups();
                
                toastMessage(result.message);
                newGroup.value = {
                    title:'',
                    description:''
                }
                isLoading.value = false;
                createGroup.value = false;
            }else{
                
                toastMessage(result.message,'error');
                newGroup.value = {
                    title:'',
                    description:''
                }
                isLoading.value = false;
                createGroup.value = false;
            }
        }else{
            emptyLabel.value = true;
            toastMessage("Label must not be empty","warning");
        }
    }

    const selectGroup = (id,group,isdeleting=false) => {
        editId.value = id;
        newGroup.value = {title:group.title,description:group.description};
        if(isdeleting){
            closeModal();
        }else{
            isEdit.value = true;
            addGroup();
        }
    }
    const updateGroup = async () => {
        if(newGroup.value.title.trim() !==''){
            isLoading.value = true;
            emptyLabel.value = false;
            const result = await api.UpdateManageClipart(editId.value,newGroup.value);
            if(result.success){
                await fetchGroups();
                isLoading.value = false;
                if(result.success == true){
                    toastMessage(result.message);
                }else{
                    toastMessage(result.message,"warning");
                }
                isEdit.value = false;
                createGroup.value = false;
                editId.value = null;
                newGroup.value = {
                    title:'',
                    description:''
                }
            }else{
                isLoading.value = false;
                toastMessage(result.message,'error');
                isEdit.value = false;
                createGroup.value = false;
                editId.value = null;
                newGroup.value = {
                    title:'',
                    description:''
                }
            }
        }else{
            emptyLabel.value = true;
            toastMessage("Label must not be empty","warning");
        }
    }
    const deleteGroup = async () => {
        isLoading.value = true;
        const result = await api.deleteManageClipart(editId.value);
        if(result.success){
            await fetchGroups();
            isLoading.value = false;
            toastMessage(result.message);
            createGroup.value = false;
            editId.value = null;
            closeModal();
            newGroup.value = {
                title:'',
                description:''
            }

        }else{
            isLoading.value = false;
            toastMessage(result.message,'error');
            createGroup.value = false;
            closeModal();
            editId.value = null;
            newGroup.value = {
                title:'',
                description:''
            }
        }
    }
    

    const addGroup = () => {
        createGroup.value = true;
    }
    const back = () => {
        createGroup.value = false;
        editId.value = null;
        isEdit.value = false;
        emptyLabel.value = false;
        newGroup.value = {
            title:'',
            description:''
        }
    }
    const closeModal = () => {
        openModal.value =!openModal.value;
    }
  </script>
   