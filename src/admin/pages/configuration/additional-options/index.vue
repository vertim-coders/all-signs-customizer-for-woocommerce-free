
<template>
    <div class="asowp-mt-[70px]">
        <div class="" v-show="!news">
            <!--<div class="asowp-bg-white asowp-border-solid asowp-border-2 asowp-rounded-[10px] asowp-p-2 asowp-border-[#D1D1D1] asowp-text-[16px] asowp-space-x-1 asowp-px-4 asowp-py-4 asowp-flex">
                <div  v-if="config.trim() != ''" class="asowp-font-bold asowp-text-[16px]">
                    {{config}}
                </div>
                <img class="asowp-w-4 asowp-h-4 asowp-py-1" src="../../../../../assets/icons/ic_crochet.svg" alt="">
                <div class="asowp-text-[16px]">
                    {{ __("Additional Options", "all-signs-options-pro") }}
                </div>
            </div>-->
            <div class="asowp-bg-white asowp-border-solid asowp-border-2 asowp-rounded-[10px] asowp-p-2 asowp-border-[#D1D1D1]">
                <div v-if="!isFetching" class="asowp-flex asowp-justify-end asowp-bg-[#F8F9FB] asowp-px-4 asowp-py-4 asowp-pb-2">
                    <button class="asowp-cursor-pointer asowp-flex asowp-w-fit asowp-h-fit asowp-rounded asowp-bg-[#016464] asowp-px-4 asowp-space-x-2 asowp-p-1.5 asowp-border-none asowp-text-white asowp-opacity-90 hover:asowp-opacity-100" @click="newAdditionalOptions">
                        <svg class="asowp-w-5 asowp-h-5" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g id="plus-lg">
                            <path id="Vector" fill-rule="evenodd" clip-rule="evenodd" d="M11 2.75C11.1823 2.75 11.3572 2.82243 11.4861 2.95136C11.6151 3.0803 11.6875 3.25516 11.6875 3.4375V10.3125H18.5625C18.7448 10.3125 18.9197 10.3849 19.0486 10.5139C19.1776 10.6428 19.25 10.8177 19.25 11C19.25 11.1823 19.1776 11.3572 19.0486 11.4861C18.9197 11.6151 18.7448 11.6875 18.5625 11.6875H11.6875V18.5625C11.6875 18.7448 11.6151 18.9197 11.4861 19.0486C11.3572 19.1776 11.1823 19.25 11 19.25C10.8177 19.25 10.6428 19.1776 10.5139 19.0486C10.3849 18.9197 10.3125 18.7448 10.3125 18.5625V11.6875H3.4375C3.25516 11.6875 3.0803 11.6151 2.95136 11.4861C2.82243 11.3572 2.75 11.1823 2.75 11C2.75 10.8177 2.82243 10.6428 2.95136 10.5139C3.0803 10.3849 3.25516 10.3125 3.4375 10.3125H10.3125V3.4375C10.3125 3.25516 10.3849 3.0803 10.5139 2.95136C10.6428 2.82243 10.8177 2.75 11 2.75Z" fill="white"/>
                            </g>
                        </svg>
                        <div class="asowp-text-[14px]">
                            {{ __("Additional Options", "all-signs-options-pro") }}
                        </div>
                    </button>
                </div>
                <div class="asowp-relative" id="monTableau">
                    <table class="asowp-text-center asowp-w-full asowp-border asowp-border-collapse asowp-border-0">
                        <thead class="asowp-bg-[#f0f0f1]">
                            <tr class="">
                                <th></th>
                                <th scope="col" class="asowp-px-6 asowp-py-3 asowp-text-[14px] asowp-font-semibold">
                                    {{ __('Label', 'all-signs-options-pro') }}
                                </th>
                                <th scope="col" class="asowp-px-6 asowp-py-3 asowp-text-[14px] asowp-font-semibold">
                                    {{ __('Type', 'all-signs-options-pro') }}
                                </th>
                                <th scope="col" class="asowp-px-6 asowp-py-3 asowp-text-[14px] asowp-font-semibold">
                                    {{ __('Action', 'all-signs-options-pro') }}
                                </th>
                            </tr>
                        </thead>
                        <tbody ref="additionalsListTable" @change="sortable.options.onEnd" class="asowp-bg-white">
                            <tr v-if="isFetching">
                                <td colspan="4">
                                    <div class="asowp-bg-white asowp-border-solid asowp-border asowp-border-[#D1D1D1] asowp-flex asowp-flex-col asowp-space-y-2 asowp-justify-center asowp-items-center asowp-w-full asowp-h-[200px] p-4">
                                        <img class="asowp-w-[100px] asowp-h-[100px]" src="../../../../../assets/icons/ic_loading.svg" alt="">
                                    </div>
                                </td>
                            </tr>
                            <tr v-if="!isFetching && additionals.length==0">
                                <td colspan="4">
                                    <div class="asowp-bg-white asowp-border-solid asowp-border asowp-border-[#D1D1D1] asowp-flex asowp-flex-col asowp-space-y-12 asowp-justify-center asowp-items-center asowp-py-10 asowp-h-[150px]">
                                        <div class="asowp-flex asowp-flex-col asowp-space-y-2 asowp-justify-center asowp-items-center">
                                            <p class="asowp-text-2xl asowp-font-bold">{{noAdditionalsOptionsFound}}</p>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr v-for="(adn , key) in additionals" :key="key" :data-id="key" class="asowp-cursor-grab asowp-border-t-0 asowp-border-l-0 asowp-border-r-0 asowp-border-b-2 asowp-border-solid asowp-border-[#f0f0f1]">
                                <td>
                                    <img src="../../../../../assets/images/additional-options/img_drag-and-drop.png" class="asowp-w-6 asowp-h-6"/>
                                </td>
                                <td class="asowp-text-center asowp-px-6 asowp-p-4">
                                    {{ adn.label }}
                                </td>
                                <td class="asowp-text-center asowp-px-6 asowp-p-4">
                                    {{ adn.type }}
                                </td>
                                <td class="asowp-px-6 asowp-text-center">
                                    <button class="asowp-bg-transparent asowp-border-none asowp-text-[#2DD05B] asowp-cursor-pointer" @click="selectAdditionalOptions(adn,key)">
                                        <img class="asowp-w-5 asowp-h-5" src="../../../../../assets/icons/ic_edit.svg" alt="">
                                    </button>
                                    <button class="asowp-bg-transparent asowp-border-none asowp-text-[#A00000] asowp-cursor-pointer" @click="selectAdditionalOptions(adn,key,true)">
                                        <img class="asowp-w-5 asowp-h-5" src="../../../../../assets/icons/ic_delete.svg" alt="" >
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div class=" asowp-flex asowp-items-center asowp-justify-end asowp-p-2 asowp-text-black" v-if="additionals.length>1">
                        <button @click="updateSortOptions" :disabled="isLoading" :class="`asowp-bg-[#016464] asowp-flex asowp-items-center asowp-justify-center asowp-space-x-2 asowp-p-2 asowp-rounded-md asowp-shadow-xl asowp-text-white asowp-font-medium asowp-transition-all asowp-ease-in-out asowp-duration-1000 asowp-border-none asowp-cursor-pointer`">
                            <div v-if="isLoading" class="p-0">
                                <img src="../../../../../assets/icons/ic_loading_gray.svg" alt="" class="asowp-w-6 asowp-h-6 "/>
                            </div>
                            <svg v-if="!isLoading" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="asowp-w-6 asowp-h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15M9 12l3 3m0 0l3-3m-3 3V2.25" />
                            </svg>
                            {{ __("Save Sort", "all-signs-options-pro") }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="news" class="asowp-sticky asowp-space-y-2 asowp-top-[80px] asowp-z-[999]">
            <div class="asowp-bg-[#F8F9FB] asowp-text-[16px] asowp-space-x-1 asowp-px-4 asowp-py-4 asowp-flex">
                <div class="asowp-font-bold asowp-text-[16px]">
                    {{ __("Additional Options", "all-signs-options-pro") }}
                </div>
                <img class="asowp-w-4 asowp-h-4 asowp-py-1" src="../../../../../assets/icons/ic_crochet.svg" alt="">
                <div class="asowp-text-[16px]">
                    {{edit ? 'Edit additional option' :'Add new additional option'}}
                </div>
            </div>
            <div class="asowp-bg-[#F8F9FB] asowp-text-[16px] asowp-space-x-1 asowp-px-4 asowp-py-4 asowp-flex">
                <div class="asowp-font-bold asowp-text-[16px]">
                    {{ __("Create new additional option", "all-signs-options-pro") }}
                </div>
            </div>
            <div class="asowp-bg-white asowp-sticky asowp-shadow-md asowp-px-4 asowp-py-2">
                <p class="asowp-text-[14px] asowp-font-bold asowp-m-0">1- {{ __('Choose an Input Type', 'all-signs-options-pro') }}</p>
                <p class="asowp-text-[12px] asow-m-0">{{ __('This text will display above the input options.', 'all-signs-options-pro') }}</p>
                <div class="asowp-flex asowp-justify-evenly asowp-items-center">
                    <button @click="()=>{type='yes/no'}" :class="`asowp-w-[120px] ${type=='yes/no'?'asowp-border-2 asowp-border-[#016464]':'asowp-border-none'} asowp-flex asowp-p-2 asowp-flex-col asowp-cursor-pointer asowp-justify-center asowp-items-center asowp-rounded-md asowp-w-fit asowp-h-fit asowp-bg-transparent`">
                        <img src="../../../../../assets/images/additional-options/im_yesNo.png" alt="" class="asowp-w-[50px] asowp-h-[50px]"/>
                        <label class="asowp-cursor-pointer asowp-text-sm asowp-text-[11px] -asowp-translate-y-4">{{ __('Yes or no', 'all-signs-options-pro') }}</label>
                    </button>
                    <button @click="()=>{type='image-input'}" :class="`asowp-w-[120px] ${type=='image-input'?'asowp-border-2 asowp-border-[#016464]':'asowp-border-none'} asowp-flex asowp-p-2 asowp-flex-col asowp-cursor-pointer asowp-justify-center asowp-items-center asowp-rounded-md asowp-w-fit asowp-h-fit asowp-bg-transparent`">
                        <img src="../../../../../assets/images/additional-options/im_image-row.png" alt="" class="asowp-w-[50px] asowp-h-[50px]"/>
                        <label class="asowp-cursor-pointer asowp-text-sm asowp-text-[11px] -asowp-translate-y-4">{{ __('Image-Input', 'all-signs-options-pro') }}</label>
                    </button>
                    <button @click="()=>{type='dropdown'}" :class="`asowp-w-[120px] ${type=='dropdown'?'asowp-border-2 asowp-border-[#016464]':'asowp-border-none'} asowp-flex asowp-p-2 asowp-flex-col asowp-cursor-pointer asowp-justify-center asowp-items-center asowp-rounded-md asowp-w-fit asowp-h-fit asowp-bg-transparent`">
                            <img src="../../../../../assets/images/additional-options/im_select.png" alt="" class="asowp-w-[50px] asowp-h-[50px]"/>
                            <label class="asowp-cursor-pointer asowp-text-sm asowp-text-[11px] -asowp-translate-y-4">{{ __('Dropdown', 'all-signs-options-pro') }}</label>
                    </button>
                    <button @click="()=>{type='note'}" :class="`asowp-w-[120px] ${type=='note'?'asowp-border-2 asowp-border-[#016464]':'asowp-border-none'} asowp-flex asowp-p-2 asowp-flex-col asowp-cursor-pointer asowp-justify-center asowp-items-center asowp-rounded-md asowp-w-fit asowp-h-fit asowp-bg-transparent`">
                        <img src="../../../../../assets/images/additional-options/im_text-box.png" alt="" class="asowp-w-[50px] asowp-h-[50px]"/>
                        <label class="asowp-cursor-pointer asowp-text-sm asowp-text-[11px] -asowp-translate-y-4">{{ __('Note', 'all-signs-options-pro') }}</label>
                    </button>
                    <button @click="()=>{type='include-type'}" :class="`asowp-w-[120px] ${type=='include-type'?'asowp-border-2 asowp-border-[#016464]':'asowp-border-none'} asowp-flex asowp-p-2 asowp-flex-col asowp-cursor-pointer asowp-justify-center asowp-items-center asowp-rounded-md asowp-w-fit asowp-h-fit asowp-bg-transparent`">
                        <img src="../../../../../assets/images/additional-options/im_includeType.png" alt="" class="asowp-w-[50px] asowp-h-[50px]"/>
                        <label class="asowp-cursor-pointer asowp-text-sm asowp-text-[11px] -asowp-translate-y-4">{{ __('Option included', 'all-signs-options-pro') }}</label>
                    </button>
                </div>
            </div>
        </div>
        <div v-if="news" class="asowp-space-y-1">
            <YesOrNo v-if="type=='yes/no' && news" :action="edit" :data="additionals[additionalOptionId]??null" :id="additionalOptionId" :change-action="changeAction" :change-open="newAdditionnal" :change-additionals="changeAdditionals"/>
            <IncludedType v-if="type=='include-type' && news" :action="edit" :data="additionals[additionalOptionId]??null" :id="additionalOptionId" :change-action="changeAction" :change-open="newAdditionnal" :change-additionals="changeAdditionals"/>
            <InputImage v-if="type=='image-input' && news" :action="edit" :data="additionals[additionalOptionId]??null" :id="additionalOptionId" :change-action="changeAction" :change-open="newAdditionnal" :change-additionals="changeAdditionals"/> 
            <DropdownType v-if="type=='dropdown' && news" :action="edit" :data="additionals[additionalOptionId]??null" :id="additionalOptionId" :change-action="changeAction" :change-open="newAdditionnal" :change-additionals="changeAdditionals"/> 
            <Note v-if="type=='note' && news" :action="edit" :data="additionals[additionalOptionId]??null" :id="additionalOptionId" :change-action="changeAction" :change-open="newAdditionnal" :change-additionals="changeAdditionals"/>
        </div>
    </div>
    <div v-if="openModal" @click.self="closeModal" class="asowp-z-[999] asowp-bg-gray-400 asowp-overflow-y-auto asowp-overflow-x-hidden asowp-fixed asowp-top-0 asowp-right-[25%] asowp-left-[75%]  asowp-flex asowp-justify-center asowp-items-center asowp-w-full md:asowp-inset-0 asowp-h-full">
        <div class="asowp-relative asowp-p-4 asowp-w-full asowp-max-w-md asowp-max-h-full">
            <div class="asowp-relative asowp-bg-white asowp-rounded-lg asowp-shadow dark:bg-gray-700">
                <button @click.stop="closeModal" type="button" :class="`${isLoading ? 'asowp-cursor-not-allowed' : 'asowp-cursor-pointer'} asowp-absolute asowp-top-3 asowp-end-2.5 asowp-text-gray-400 asowp-bg-transparent hover:bg-gray-200 hover:text-gray-900 asowp-rounded-lg asowp-text-sm asowp-w-8 asowp-h-8 asowp-ms-auto asowp-inline-flex asowp-justify-center asowp-items-center dark:hover:bg-gray-600 dark:hover:text-white`" data-modal-hide="popup-modal">
                    <svg class="asowp-w-3 asowp-h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span class="asowp-sr-only">{{ __("Close modal", "all-signs-options-pro") }}</span>
                </button>
                <div class="asowp-p-4 md:p-5 asowp-text-center">
                    <svg class="asowp-mx-auto asowp-mb-4 asowp-text-gray-400 asowp-w-12 asowp-h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                    </svg>
                    <h3 class="asowp-mb-5 asowp-text-lg asowp-font-normal asowp-text-gray-500 dark:text-gray-400">{{ __('Are you sure you want to delete this option?', 'all-signs-options-pro') }}</h3>
                    <input v-model="additionals[additionalOptionId].label" readonly class="asowp-rounded asowp-w-full asowp-h-[35px] asowp-text-center asowp-p-4 asowp-my-2 asowp-border-none" />
                    <button @click="deleteAdditional" data-modal-hide="popup-modal" type="button" :class="`asowp-border-solid asowp-text-white ${!isLoading ? 'asowp-bg-red-600 asowp-cursor-pointer' :'asowp-bg-red-700 asowp-cursor-not-allowed'} hover:asowp-bg-red-800 focus:ring-4 focus:outline-none asowp-my-2 asowp-border-none  focus:ring-red-300 dark:focus:ring-red-800 asowp-font-medium asowp-rounded-lg asowp-text-sm asowp-inline-flex asowp-items-center asowp-px-5 asowp-py-2.5 asowp-text-center`">
                        <img src="../../../../../assets/icons/ic_loading_gray.svg" class="asowp-w-5 asowp-w-5" v-if="isLoading" :disabled="isLoading"/>
                        {{ __("Yes, I'm sure", "all-signs-options-pro") }}
                    </button>
                    <button @click.stop="closeModal" data-modal-hide="popup-modal" type="button" :class="`asowp-border-solid asowp-py-2.5 asowp-px-5 asowp-ms-3 asowp-text-sm asowp-font-medium asowp-text-gray-900 asowp-my-2  asowp-border-gray-500 asowp-border-white focus:outline-none asowp-bg-white asowp-rounded-lg asowp-border asowp-border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 ${isLoading ? 'asowp-cursor-not-allowed' : 'asowp-cursor-pointer'}`">{{ __("No, cancel", "all-signs-options-pro") }}</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import YesOrNo from './components/yes-or-no.vue';
import InputImage from './components/image-input.vue';
import DropdownType from './components/dropdown-type.vue';
import Note from './components/note.vue';
import IncludedType from './components/included-type.vue';
import { useRoute } from 'vue-router';
import api from '@/admin/Api/api';
import toastMessage from '@/admin/utils/functions';

import { __ } from "@wordpress/i18n";
const route = useRoute();
const configId = route.params.configId;
var news = ref(false);
var edit = ref(false);
const config =route.params.config.replace(/-/g,' ');
var type = ref('yes/no');
const isFetching = ref(false);
const noAdditionalsOptionsFound = ref('');
const additionals = ref([]);
const additionalOptionId = ref(null);
const isLoading = ref(false);
const additionalsListTable = ref()
const sortable =ref();
const newIndexs = ref([]);
const openModal=ref(false);

onMounted(async () => {
    isFetching.value = true;
    await fetchAdditionalOptions();
    sortable.value=Sortable.create(additionalsListTable.value, {
      group: "sort-options",
      chosenClass:'sortable-chosen',
      animation:100,
      store: {
        get:  () =>{
          return additionals.value;
        },
        set:  (sortable) => {
          newIndexs.value = sortable.toArray();
        }
      },
    });
    isFetching.value = false;

});
const closeModal = ()=>{
    openModal.value = !openModal.value;
}
const fetchAdditionalOptions = async () =>{
    const data = await api.getCustomAdditionals(configId);
    if(data.message){
        noAdditionalsOptionsFound.value = data.message;
        additionals.value = [];
    }else{
        additionals.value = data;
        let tab = [];
        for (let index = 0; index < data.length; index++) {
            tab.push(index);
        }
        newIndexs.value = tab;
    }
}
const newAdditionalOptions = () =>{
    news.value = true;
}
const deleteAdditional = async () => {
    isLoading.value = true;
    const op = await api.deleteCustomAdditional(configId,additionalOptionId.value);
    if(op.success){
        await fetchAdditionalOptions()
        isLoading.value = false;
        closeModal();
        toastMessage(op.message);
    }else{
        isLoading.value = false;
        closeModal();
        toastMessage(op.message,'error');
    }
}
const updateSortOptions = async () => {
    isLoading.value = true;
    const  newOrderOfCustomAdditionals = sortArrayByIndices(additionals.value,newIndexs.value);
    const result = await api.updateCustomAdditionals(configId,newOrderOfCustomAdditionals);
    if(result.success){
        additionals.value = newOrderOfCustomAdditionals;
        if (result.success == true) {
            toastMessage(result.message);
        }else{
            toastMessage(result.message,"warning");
        }
    }else{
        toastMessage(result.message,"error");
    }
    isLoading.value = false;
}
const sortArrayByIndices = (array, indices) => {
    return indices.map(index => array[index]);
}
const changeAdditionals = async(action,message)=>{
    await fetchAdditionalOptions();
    edit.value = false;
  if(action=='add'){
    toastMessage(message);
  }else if(action=='edit'){
    additionalOptionId.value = null;
    toastMessage(message);
  }
}
const selectAdditionalOptions = (additional,index,isDelete = false) => {
    additionalOptionId.value = index;
    if(isDelete){
        closeModal();
    }else{
        edit.value = true;
        type.value = additional.type;
        newAdditionnal();
    }
}
function newAdditionnal(){
    news.value = !news.value
}

const changeAction = (value) => {
    edit.value = value;
    additionalOptionId.value = null;
    type.value='yes/no';
}

</script>

<style>
.lilScroll::-webkit-scrollbar {
    display: none;
    overflow: scroll;
}
</style>
