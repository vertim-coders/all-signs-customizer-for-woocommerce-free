
<template>
    <div class="aso-h-[85vh] aso-overflow-y-auto aso-overflow-x-hidden aso-relative">
        <div class="" v-show="!news">
            <div class="aso-bg-[#F8F9FB] aso-text-[16px] aso-space-x-1 aso-px-4 aso-py-4 aso-flex">
                <div  v-if="config.trim() != ''" class="aso-font-bold aso-text-[16px]">
                    {{config}}
                </div>
                <img class="aso-w-4 aso-h-4 aso-py-1" src="../../../../../assets/icons/ic_crochet.svg" alt="">
                <div class="aso-text-[16px]">
                    Additional Options
                </div>
            </div>
            <div v-if="!isFetching" class="aso-flex aso-justify-end aso-bg-[#F8F9FB] aso-px-4 aso-py-4 aso-pb-2">
                <button class="aso-cursor-pointer aso-flex aso-w-fit aso-h-fit aso-rounded aso-bg-[#016464] aso-px-4 aso-space-x-2 aso-p-1.5 aso-border-none aso-text-white aso-opacity-90 hover:aso-opacity-100" @click="newAdditionalOptions">
                    <svg class="aso-w-5 aso-h-5" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="plus-lg">
                        <path id="Vector" fill-rule="evenodd" clip-rule="evenodd" d="M11 2.75C11.1823 2.75 11.3572 2.82243 11.4861 2.95136C11.6151 3.0803 11.6875 3.25516 11.6875 3.4375V10.3125H18.5625C18.7448 10.3125 18.9197 10.3849 19.0486 10.5139C19.1776 10.6428 19.25 10.8177 19.25 11C19.25 11.1823 19.1776 11.3572 19.0486 11.4861C18.9197 11.6151 18.7448 11.6875 18.5625 11.6875H11.6875V18.5625C11.6875 18.7448 11.6151 18.9197 11.4861 19.0486C11.3572 19.1776 11.1823 19.25 11 19.25C10.8177 19.25 10.6428 19.1776 10.5139 19.0486C10.3849 18.9197 10.3125 18.7448 10.3125 18.5625V11.6875H3.4375C3.25516 11.6875 3.0803 11.6151 2.95136 11.4861C2.82243 11.3572 2.75 11.1823 2.75 11C2.75 10.8177 2.82243 10.6428 2.95136 10.5139C3.0803 10.3849 3.25516 10.3125 3.4375 10.3125H10.3125V3.4375C10.3125 3.25516 10.3849 3.0803 10.5139 2.95136C10.6428 2.82243 10.8177 2.75 11 2.75Z" fill="white"/>
                        </g>
                    </svg>
                    <div class="aso-text-[14px]">
                        Additional Options
                    </div>
                </button>
            </div>
            <div class="aso-relative" id="monTableau">
                <table class="aso-text-center aso-w-full aso-border aso-border-collapse aso-border-0">
                    <thead class="aso-bg-[#f0f0f1]">
                        <tr class="">
                            <th></th>
                            <th scope="col" class="aso-px-6 aso-py-3 aso-text-[14px] aso-font-semibold">
                                Label
                            </th>
                            <th scope="col" class="aso-px-6 aso-py-3 aso-text-[14px] aso-font-semibold">
                                Type
                            </th>
                            <th scope="col" class="aso-px-6 aso-py-3 aso-text-[14px] aso-font-semibold">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody ref="additionalsListTable" @change="sortable.options.onEnd" class="aso-bg-white">
                        <tr v-if="isFetching">
                            <td colspan="4">
                                <div class="aso-bg-white aso-border-solid aso-border aso-border-[#D1D1D1] aso-flex aso-flex-col aso-space-y-2 aso-justify-center aso-items-center aso-w-full aso-h-[200px] p-4">
                                    <img class="aso-w-[100px] aso-h-[100px]" src="../../../../../assets/icons/ic_loading.svg" alt="">
                                </div>
                            </td>
                        </tr>
                        <tr v-if="!isFetching && additionals.length==0">
                            <td colspan="4">
                                <div class="aso-bg-white aso-border-solid aso-border aso-border-[#D1D1D1] aso-flex aso-flex-col aso-space-y-12 aso-justify-center aso-items-center aso-py-10 aso-h-[150px]">
                                    <div class="aso-flex aso-flex-col aso-space-y-2 aso-justify-center aso-items-center">
                                        <p class="aso-text-2xl aso-font-bold">{{noAdditionalsOptionsFound}}</p>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr v-for="(adn , key) in additionals" :key="key" :data-id="key" class="aso-border-t-0 aso-border-l-0 aso-border-r-0 aso-border-b-2 aso-border-solid aso-border-[#f0f0f1]">
                            <td>
                                <img src="../../../../../assets/images/additional-options/img_drag-and-drop.png" class="aso-w-6 aso-h-6"/>
                            </td>
                            <td class="aso-text-center aso-px-6 aso-p-4">
                                {{ adn.label }}
                            </td>
                            <td class="aso-text-center aso-px-6 aso-p-4">
                                {{ adn.type }}
                            </td>
                            <td class="aso-px-6 aso-text-center">
                                <button class="aso-bg-transparent aso-border-none aso-text-[#2DD05B] aso-cursor-pointer" @click="selectAdditionalOptions(adn,key)">
                                    <img class="aso-w-5 aso-h-5" src="../../../../../assets/icons/ic_edit.svg" alt="">
                                </button>
                                <button class="aso-bg-transparent aso-border-none aso-text-[#A00000] aso-cursor-pointer" @click="selectAdditionalOptions(adn,key,true)">
                                    <img class="aso-w-5 aso-h-5" src="../../../../../assets/icons/ic_delete.svg" alt="" >
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div class=" aso-flex aso-items-center aso-justify-end aso-p-2 aso-text-black" v-if="additionals.length>1">
                    <button @click="updateSortOptions" :disabled="isLoading" :class="`aso-bg-[#016464] aso-flex aso-items-center aso-justify-center aso-space-x-2 aso-p-2 aso-rounded-md aso-shadow-xl aso-text-white aso-font-medium aso-transition-all aso-ease-in-out aso-duration-1000 aso-border-none aso-cursor-pointer`">
                        <div v-if="isLoading" class="p-0">
                            <img src="../../../../../assets/icons/ic_loading_gray.svg" alt="" class="aso-w-6 aso-h-6 "/>
                        </div>
                        <svg v-if="!isLoading" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="aso-w-6 aso-h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15M9 12l3 3m0 0l3-3m-3 3V2.25" />
                        </svg>
                        Save Sort
                    </button>
                </div>
            </div>
        </div>
        <div v-if="news" class="aso-space-y-1">
            <div class="aso-bg-[#F8F9FB] aso-text-[16px] aso-space-x-1 aso-px-4 aso-py-4 aso-flex">
                <div class="aso-font-bold aso-text-[16px]">
                    Additional Options
                </div>
                <img class="aso-w-4 aso-h-4 aso-py-1" src="../../../../../assets/icons/ic_crochet.svg" alt="">
                <div class="aso-text-[16px]">
                    {{edit ? 'Edit additional option' :'Add new additional option'}}
                </div>
            </div>
            <div class="aso-bg-white aso-sticky aso-z-[9999] aso-top-0 aso-shadow-md aso-px-4 aso-py-2">
                <p class="aso-text-[14px] aso-font-bold aso-m-0">1- Choose an Input Type</p>
                <p class="aso-text-[12px] aso-m-0">This text will display above the input options.</p>
                <div class="aso-flex aso-justify-evenly aso-items-center">
                    <button @click="()=>{type='yes/no'}" :class="`aso-w-[120px] ${type=='yes/no'?'aso-border-2 aso-border-[#016464]':'aso-border-none'} aso-flex aso-p-2 aso-flex-col aso-cursor-pointer aso-justify-center aso-items-center aso-rounded-md aso-w-fit aso-h-fit aso-bg-transparent`">
                        <img src="../../../../../assets/images/additional-options/im_yesNo.png" alt="" class="aso-w-[50px] aso-h-[50px]"/>
                        <label class="aso-cursor-pointer aso-text-sm aso-text-[11px] -aso-translate-y-4">Yes or no</label>
                    </button>
                    <button @click="()=>{type='image-input'}" :class="`aso-w-[120px] ${type=='image-input'?'aso-border-2 aso-border-[#016464]':'aso-border-none'} aso-flex aso-p-2 aso-flex-col aso-cursor-pointer aso-justify-center aso-items-center aso-rounded-md aso-w-fit aso-h-fit aso-bg-transparent`">
                        <img src="../../../../../assets/images/additional-options/im_image-row.png" alt="" class="aso-w-[50px] aso-h-[50px]"/>
                        <label class="aso-cursor-pointer aso-text-sm aso-text-[11px] -aso-translate-y-4">Image-Input</label>
                    </button>
                    <button @click="()=>{type='dropdown'}" :class="`aso-w-[120px] ${type=='dropdown'?'aso-border-2 aso-border-[#016464]':'aso-border-none'} aso-flex aso-p-2 aso-flex-col aso-cursor-pointer aso-justify-center aso-items-center aso-rounded-md aso-w-fit aso-h-fit aso-bg-transparent`">
                            <img src="../../../../../assets/images/additional-options/im_select.png" alt="" class="aso-w-[50px] aso-h-[50px]"/>
                            <label class="aso-cursor-pointer aso-text-sm aso-text-[11px] -aso-translate-y-4">Dropdown</label>
                    </button>
                    <button @click="()=>{type='note'}" :class="`aso-w-[120px] ${type=='note'?'aso-border-2 aso-border-[#016464]':'aso-border-none'} aso-flex aso-p-2 aso-flex-col aso-cursor-pointer aso-justify-center aso-items-center aso-rounded-md aso-w-fit aso-h-fit aso-bg-transparent`">
                        <img src="../../../../../assets/images/additional-options/im_text-box.png" alt="" class="aso-w-[50px] aso-h-[50px]"/>
                        <label class="aso-cursor-pointer aso-text-sm aso-text-[11px] -aso-translate-y-4">Note</label>
                    </button>
                    <button @click="()=>{type='include-type'}" :class="`aso-w-[120px] ${type=='include-type'?'aso-border-2 aso-border-[#016464]':'aso-border-none'} aso-flex aso-p-2 aso-flex-col aso-cursor-pointer aso-justify-center aso-items-center aso-rounded-md aso-w-fit aso-h-fit aso-bg-transparent`">
                        <img src="../../../../../assets/images/additional-options/im_includeType.png" alt="" class="aso-w-[50px] aso-h-[50px]"/>
                        <label class="aso-cursor-pointer aso-text-sm aso-text-[11px] -aso-translate-y-4">Option included</label>
                    </button>
                </div>
            </div>
            <YesOrNo v-if="type=='yes/no' && news" :action="edit" :data="additionals[additionalOptionId]??null" :id="additionalOptionId" :change-action="changeAction" :change-open="newAdditionnal" :change-additionals="changeAdditionals"/>
            <IncludedType v-if="type=='include-type' && news" :action="edit" :data="additionals[additionalOptionId]??null" :id="additionalOptionId" :change-action="changeAction" :change-open="newAdditionnal" :change-additionals="changeAdditionals"/>
            <InputImage v-if="type=='image-input' && news" :action="edit" :data="additionals[additionalOptionId]??null" :id="additionalOptionId" :change-action="changeAction" :change-open="newAdditionnal" :change-additionals="changeAdditionals"/> 
            <DropdownType v-if="type=='dropdown' && news" :action="edit" :data="additionals[additionalOptionId]??null" :id="additionalOptionId" :change-action="changeAction" :change-open="newAdditionnal" :change-additionals="changeAdditionals"/> 
            <Note v-if="type=='note' && news" :action="edit" :data="additionals[additionalOptionId]??null" :id="additionalOptionId" :change-action="changeAction" :change-open="newAdditionnal" :change-additionals="changeAdditionals"/>
        </div>
    </div>
    <div v-if="openModal" @click.self="closeModal" class="aso-z-[99999] aso-bg-gray-400 aso-overflow-y-auto aso-overflow-x-hidden aso-fixed aso-top-0 aso-right-[25%] aso-left-[75%] aso-z-50 aso-flex aso-justify-center aso-items-center aso-w-full md:aso-inset-0 aso-h-[calc(100%-1rem)] aso-h-[100vh]">
        <div class="aso-relative aso-p-4 aso-w-full aso-max-w-md aso-max-h-full">
            <div class="aso-relative aso-bg-white aso-rounded-lg aso-shadow dark:bg-gray-700">
                <button @click.stop="closeModal" type="button" :class="`${isLoading ? 'aso-cursor-not-allowed' : 'aso-cursor-pointer'} aso-absolute aso-top-3 aso-end-2.5 aso-text-gray-400 aso-bg-transparent hover:bg-gray-200 hover:text-gray-900 aso-rounded-lg aso-text-sm aso-w-8 aso-h-8 aso-ms-auto aso-inline-flex aso-justify-center aso-items-center dark:hover:bg-gray-600 dark:hover:text-white`" data-modal-hide="popup-modal">
                    <svg class="aso-w-3 aso-h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span class="aso-sr-only">Close modal</span>
                </button>
                <div class="aso-p-4 md:p-5 aso-text-center">
                    <svg class="aso-mx-auto aso-mb-4 aso-text-gray-400 aso-w-12 aso-h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                    </svg>
                    <h3 class="aso-mb-5 aso-text-lg aso-font-normal aso-text-gray-500 dark:text-gray-400">Are you sure you want to delete this option?</h3>
                    <input v-model="additionals[additionalOptionId].label" readonly class="aso-rounded aso-w-full aso-h-[35px] aso-text-center aso-p-4 aso-my-2 aso-border-none" />
                    <button @click="deleteAdditional" data-modal-hide="popup-modal" type="button" :class="`aso-border-solid aso-text-white ${!isLoading ? 'aso-bg-red-600 aso-cursor-pointer' :'aso-bg-red-700 aso-cursor-not-allowed'} hover:aso-bg-red-800 focus:ring-4 focus:outline-none aso-my-2 aso-border-none  focus:ring-red-300 dark:focus:ring-red-800 aso-font-medium aso-rounded-lg aso-text-sm aso-inline-flex aso-items-center aso-px-5 aso-py-2.5 aso-text-center`">
                        <img src="../../../../../assets/icons/ic_loading_gray.svg" class="aso-w-5 aso-w-5" v-if="isLoading" :disabled="isLoading"/>
                        Yes, I'm sure
                    </button>
                    <button @click.stop="closeModal" data-modal-hide="popup-modal" type="button" :class="`aso-border-solid aso-py-2.5 aso-px-5 aso-ms-3 aso-text-sm aso-font-medium aso-text-gray-900 aso-my-2  aso-border-gray-500 aso-border-white focus:outline-none aso-bg-white aso-rounded-lg aso-border aso-border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 ${isLoading ? 'aso-cursor-not-allowed' : 'aso-cursor-pointer'}`">No, cancel</button>
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

const route = useRoute();
const configId = route.params.configId;
var news = ref(false);
var edit = ref(false);
const config =route.params.config.replace(/-/,' ');
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