
<template>
    <div class="aso-h-[85vh] aso-overflow-y-auto aso-overflow-x-hidden aso-relative">
        <div>
            <div :class="`aso-bg-[#F4F4F4] ${news ? 'aso-justify-between' : 'aso-justify-end'} aso-border-x-[3px] aso-flex aso-space-x-4 aso-p-3`">
                <div v-show="news" class="aso-flex aso-items-center aso-justify-center aso-space-x-1 aso-pl-6">
                    <p class="aso-text-xl aso-text-black aso-font-bold">translateText.additionalOption.customAdditionalOptions.tabHeader</p>
                    <p>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="aso-w-6 aso-h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                    </p>
                    <p class="aso-text-sm">New Additional Option</p>
                </div>
                <button v-show="!news && addionationals.length>0" @click="newAdditionnal" :class="`aso-bg-[#008000] aso-flex aso-items-center aso-justify-center aso-space-x-2 aso-text-white aso-p-2 aso-px-8 aso-rounded-md aso-shadow-zinc-400 aso-shadow-lg aso-font-medium aso-transition-all aso-ease-in-out aso-duration-1000`">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="aso-w-6 aso-h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m6-6H6" />
                    </svg>
                    <p class="aso-text-[15px]">Add New Additional Option </p>
                </button>
            </div>
            <div v-show="!news && addionationals.length==0 && !isLoading" :class="`aso-bg-white aso-border aso-border-[#D1D1D1] aso-flex aso-flex-col aso-space-y-2 aso-justify-center aso-items-center aso-w-full aso-h-[306px] aso-p-4`">
                <div class="aso-flex aso-flex-col aso-space-y-12 aso-justify-center aso-items-center">
                    <div class="aso-flex aso-flex-col aso-space-y-2 aso-justify-center aso-items-center">
                        <p class="aso-text-2xl aso-font-bold">translateText.additionalOption.customAdditionalOptions.listAdditionalOptions.noItem</p>
                    </div>
                    <button @click="newAdditionnal" :class="`aso-bg-[#008000] aso-p-2 aso-px-6 aso-text-white aso-rounded-md aso-shadow-lg aso-flex aso-space-x-2 aso-items-center aso-justify-center`">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="aso-w-5 aso-h-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        <p>translateText.additionalOption.customAdditionalOptions.addNew</p>
                    </button>
                </div>
            </div>
            <div v-show="!news && addionationals.length==0 && isLoading" :class="`aso-bg-white aso-border aso-border-[#D1D1D1] aso-flex aso-flex-col aso-space-y-2 aso-justify-center aso-items-center aso-w-full aso-h-[306px] aso-p-4`">
                <div class="aso-flex aso-flex-col aso-space-y-12 aso-justify-center aso-items-center">
                    <img src="../../../../../assets/icons/ic_loading.svg" alt=""/>
                </div>
            </div>
            <div v-show="!news && addionationals.length >0" :class="`aso-bg-white aso-border aso-border-[#D1D1D1] aso-flex aso-flex-col`">
                <table class="aso-w-full aso-text-sm aso-text-left aso-text-gray-500">
                    <thead class="aso-text-base aso-text-[5A5A5A] aso-font-semibold aso-bg-[#F4F4F4]">
                        <tr class="aso-py-4 aso-rounded-t-xl">
                            <th scope="col" class="aso-px-6 aso-py-3 aso-text-center">translateText.additionalOption.customAdditionalOptions.listAdditionalOptions.label</th>
                            <th scope="col" class="aso-px-6 aso-py-3 aso-text-center"> translateText.additionalOption.customAdditionalOptions.listAdditionalOptions.type </th>
                            <th scope="col" class="aso-px-6 aso-py-3 aso-text-center"> translateText.additionalOption.customAdditionalOptions.listAdditionalOptions.action </th>
                        </tr>
                    </thead>
                    <tbody ref="additionalsListTable" @change="sortable.options.onEnd">
                        <tr v-for="(additional,index) in addionationals" :data-id="index" :class="`aso-bg-white' : 'aso-bg-black aso-bg-opacity-20 '} aso-border-b`">
                            <td scope="row" class="aso-px-6 aso-py-4 aso-font-semibold aso-text-black aso-whitespace-nowrap aso-text-base aso-text-center aso-uppercase">
                                {{ additional.label }}
                            </td>
                            <td scope="row" class="aso-px-6 aso-py-4 aso-font-semibold aso-text-black aso-whitespace-nowrap aso-text-base aso-text-center">
                                {{ additional.type}}
                            </td>
                            <td class="aso-px-6 aso-py-3 aso-flex aso-items-center aso-justify-center">
                                <div class="aso-text-black aso-flex aso-space-x-2 aso-items-center aso-justify-center aso-bg-[#F8F8FF] aso-rounded-2xl aso-px-4 aso-py-1">
                                    <button @click="()=>editingAdditional(additional,index)">
                                        <img src="../../../../../assets/icons/ic_edit.svg" alt="" class="aso-h-7 aso-w-7">
                                    </button>
                                    <button @click="()=>editingAdditional(additional,index,true)">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="red" class="aso-w-5 aso-h-5">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                        </svg>
                                    </button>
                                </div>
                            </td>
                    </tr>
                </tbody>
            </table>
            <div class="aso-flex aso-items-center aso-justify-end aso-p-2 aso-px-8 aso-border-b-2 aso-text-black">
                <button @click="updateSortOptions" :disabled="isLoading" :class="`aso-bg-[#008000] aso-flex aso-items-center aso-justify-center aso-space-x-2 aso-py-2 aso-px-8 aso-rounded-md aso-shadow-xl aso-text-white aso-font-medium aso-transition-all aso-ease-in-out aso-duration-1000`">
                    <div v-if="isLoading" class="aso-p-0">
                        <img src="../../../../../assets/icons/ic_loading.svg" alt="" class="aso-w-10 aso-h-10"/>
                    </div>
                    <svg v-if="!isLoading" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="aso-w-6 aso-h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15M9 12l3 3m0 0l3-3m-3 3V2.25" />
                    </svg>
                    Save Sort
                </button>
            </div>
        </div>
        <div v-show="news" :class="`aso-bg-white ' : 'aso-bg-black aso-bg-opacity-20'} aso-border-t aso-border-[#D1D1D1] aso-flex aso-flex-col aso-space-y-3 aso-border-b-[2px]`">
            <p class="aso-text-xs aso-font-bold aso-text-black aso-pt-6 aso-px-8">1- translateText.additionalOption.customAdditionalOptions.newItem.header</p>
            <p class="aso-text-xs aso-font-medium aso-px-8">translateText.additionalOption.customAdditionalOptions.newItem.description</p>
            <div class="aso-w-full aso-flex aso-justify-center aso-items-center">
                <div class="aso-flex aso-justify-between aso-space-x-4 aso-w-11/12 aso-pb-8 aso-px-2">
                    <div @click="()=>{type='yes/no'}" :class="`${type=='yes/no'?'aso-border-2 aso-border-[#008000]':''} aso-flex aso-p-4 aso-flex-col aso-cursor-pointer aso-justify-center aso-items-center aso-rounded-md aso-w-1/4`">
                        <img src="../../../../../assets/images/additional-options/im_yesNo.png" alt="" class="aso-w-full aso-h-full"/>
                        <label class="aso-text-sm aso-text-semibold">translateText.additionalOption.customAdditionalOptions.newItem.type.yesOrno</label>
                    </div>
                    <div @click="()=>{type='image-input'}" :class="`${type=='image-input'?'aso-border-2 aso-border-[#008000]':''} aso-flex aso-p-4 aso-flex-col aso-cursor-pointer aso-justify-center aso-items-center aso-rounded-md aso-w-1/4`">
                        <img src="../../../../../assets/images/additional-options/im_image-row.png" alt="" class="aso-w-full aso-h-full"/>
                        <label class="aso-text-sm aso-text-semibold">translateText.additionalOption.customAdditionalOptions.newItem.type.imageInput</label>
                    </div>
                    <div @click="()=>{type='dropdown'}" :class="`${type=='dropdown'?'aso-border-2 aso-border-[#008000]':''} aso-flex aso-p-4 aso-flex-col aso-cursor-pointer aso-justify-center aso-items-center aso-rounded-md aso-w-1/4`">
                        <img src="../../../../../assets/images/additional-options/im_select.png" alt="" class="aso-w-full aso-h-full"/>
                        <label class="aso-text-sm aso-text-semibold">translateText.additionalOption.customAdditionalOptions.newItem.type.dropdown</label>
                    </div>
                    <div @click="()=>{type='note'}" :class="`${type=='note'?'aso-border-2 aso-border-[#008000]':''} aso-flex aso-p-4 aso-flex-col aso-cursor-pointer aso-justify-center aso-items-center aso-rounded-md aso-w-1/4`">
                        <img src="../../../../../assets/images/additional-options/im_text-box.png" alt="" class="aso-w-full aso-h-full"/>
                        <label class="aso-text-sm aso-text-semibold">translateText.additionalOption.customAdditionalOptions.newItem.type.note</label>
                    </div>
                    <div @click="()=>{type='include-type'}" :class="`${type=='include-type'?'aso-border-2 aso-border-[#008000]':''} aso-flex aso-p-4 aso-flex-col aso-cursor-pointer aso-justify-center aso-items-center aso-rounded-md aso-w-1/4`">
                        <img src="../../../../../assets/images/additional-options/im_includeType.png" alt="" class="aso-w-full aso-h-full"/>
                        <label class="aso-text-sm aso-text-semibold">translateText.additionalOption.customAdditionalOptions.newItem.type.includeType</label>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div v-if="delMod" class="aso-absolute aso-top-10 aso-w-full aso-h-[130%] aso-inset-0 aso-flex aso-items-start aso-justify-center aso-bg-black aso-bg-opacity-50 aso-p-4">
        <div class="aso-mt-16">
            <div :class="`aso-bg-white' : 'aso-bg-zinc-200'} aso-flex aso-flex-col aso-space-y-4 aso-text-zinc-300 aso-flex aso-w-[817px] aso-border-2 aso-rounded-2xl`">
                <div class="aso-flex aso-items-center aso-justify-end aso-p-2 aso-px-8 aso-border-b-2 aso-text-black">
                    <button @click="closeModal" :disabled="isLoading" :class="`${isLoading?'aso-opacity-20 aso-cursor-not-allowed diseable':''}`">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="aso-w-6 aso-h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div class="aso-p-8 aso-pt-6">
                    <div class="aso-flex aso-flex-col aso-space-y-2">
                        <label for="" class="aso-text-base aso-font-medium aso-text-black">{{deleteText}}</label>
                    </div>
                    <div class="aso-flex aso-space-x-6 aso-pt-10">
                        <button @click="closeModal" :disabled="isLoading" :class="`aso-border aso-border-zinc-200 aso-hover:bg-zinc-100 aso-flex aso-text-black aso-items-center aso-justify-center aso-space-x-2 aso-bg-white aso-p-3 aso-px-8 aso-rounded-md aso-font-medium ${isLoading?'aso-opacity-20 aso-cursor-not-allowed diseable':''}`">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="aso-w-6 aso-h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                            </svg>
                            <p class="aso-text-base">{{backButtonText}}</p>
                        </button>
                        <button @click="deleteAdditional" :class="`aso-bg-[#008000] aso-flex aso-items-center aso-justify-center aso-space-x-2 aso-text-white aso-p-2 aso-px-8 aso-rounded-md aso-shadow-zinc-400 aso-shadow-lg aso-font-medium aso-transition-all aso-ease-in-out aso-duration-1000 ${isLoading?'aso-opacity-20 aso-cursor-not-allowed diseable':''}`">
                            <div v-if="isLoading" class="aso-p-0">
                                <img src="../../../../../assets/icons/ic_loading.svg" alt="" class="aso-w-10 aso-h-10 "/>
                            </div>
                            <p class="aso-text-base">{{deleteButtonText}}</p>
                        </button>
                    </div>
                </div>
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
const route = useRoute()
import api from '@/admin/Api/api';
import toastMessage from '@/admin/utils/functions';
var news = ref(false)
var type = ref('yes/no');
var addionationals = ref([]);
var additionalOptionId = ref(null);
var edit = ref(false);
var isLoading = ref(true);

//var translateText= ref(ncpcData.ncpc_translate_text.configuration);
var getHelpText = "help";
var deleteText= "delete"
var deleteButtonText = "delete";
const additionalsListTable = ref()
const sortable =ref();
const newIndexs = ref([])
var delMod = ref(false);
onMounted(async () => {
    isLoading.value = true;
    const data = await api.getCustomAdditionals(route.params.configId);
    if(!data.message){
      addionationals.value = data;
      isLoading.value = false;
    }else{
        isLoading.value = false;
    }

    sortable.value=Sortable.create(additionalsListTable.value, {
      group: "sort-options",
      chosenClass:'sortable-chosen',
      animation:100,
      store: {
        get:  () =>{
          return addionationals.value;
        },
        set:  (sortable) => {
          newIndexs.value = sortable.toArray();
        }
      },
    });

});

const editingAdditional = (additional,index,isDelete = false) => {
    additionalOptionId.value = index;
    if(isDelete){
        delModal();
    }else{
        edit.value = true;
        type.value = additional.type;
        newAdditionnal();
    }
}

const delModal = ()=>{
    delMod.value = !delMod.value;
}

const closeModal = () => {
    delModal();
    additionalOptionId.value = null;
}

const deleteAdditional = async () => {
    isLoading.value = true;
  const op = await api.deleteCustomAdditional(route.params.configId,additionalOptionId.value);
  if(op.success){
    addionationals.value.splice(additionalOptionId.value,1);
    isLoading.value = false;
    closeModal();
    toastMessage('Additional Option delete Sucessfully');
}else{
      isLoading.value = false;
      closeModal();
    toastMessage('Additional Option delete fail','error');
  }
}
const updateSortOptions = async () => {
    isLoading.value = true;
    const  newOrderOfCustomAdditionals = sortArrayByIndices(addionationals.value,newIndexs.value);
    const result = await api.updateCustomAdditionals(route.params.configId,newOrderOfCustomAdditionals);
    if(result.success){
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
const changeAdditionals = (action,value,index=null)=>{
  if(action=='add'){
    addionationals.value.push(value);
    toastMessage('Additional Option add Sucessfully');
  }else if(action=='edit'){
    edit.value = false;
    addionationals.value[index] =value;
    additionalOptionId.value = null;
    toastMessage('Additional Option edit Sucessfully');
  }
}
function newAdditionnal(){
    news.value = !news.value
}

const changeAction = (value) => {
    edit.value = value;
    additionalOptionId.value = null;
}

</script>

<style>
.lilScroll::-webkit-scrollbar {
    display: none;
    overflow: scroll;
}
</style>