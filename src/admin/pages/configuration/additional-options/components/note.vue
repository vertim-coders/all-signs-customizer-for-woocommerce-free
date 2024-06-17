
<template>
    <div class="aso-space-y-1">
        <div class="aso-bg-white aso-shadow-md aso-justify-center aso-items-center aso-px-4 aso-py-4">
            <p class="aso-text-[14px] aso-font-bold">2- Set the Label and Description</p>
            <p class="aso-text-[12px]">This text will display above the input options.</p>
            <div class="aso-flex aso-justify-between aso-space-x-12">
                <div class="aso-w-2/5 aso-space-y-2">
                    <label>Label</label>
                    <input v-model="noteType.label" type="text" :class="`aso-w-full ${emptyLabel?'aso-field-required':''}`" value=""/>
                </div>
                <div class="aso-w-2/5 aso-space-y-2">
                    <label>Description</label>
                    <input v-model="noteType.description" type="text" class="aso-w-full" value=""/>
                </div>
            </div>
        </div>
        <div class="aso-bg-white aso-shadow-md aso-justify-center aso-items-center aso-px-4 aso-py-4">
            <p class="aso-text-[14px] aso-font-bold">3- Note Input</p>
            <p class="aso-text-[12px]">Character limit (optional)</p>
            <p class="aso-text-[12px]">Displays as a textarea field for customers to type any additional requirements.</p>
            <input v-model="noteType.noteLimitChar" type="number" class="aso-w-3/4" value=""/>
            <p class="aso-text-[12px]">The maximum number of text characters for notes.</p>
        </div>
    </div>
    <div class="aso-bg-[#F8F9FB] aso-flex aso-space-x-4 aso-px-4 aso-py-4 aso-justify-end aso-items-end aso-sticky aso-z-[9999] aso-bottom-0">
        <div class="aso-bg-[#016464] aso-rounded">
            <button class="aso-flex aso-bg-transparent aso-w-fit aso-space-x-2 aso-h-fit aso-px-8 aso-p-2 aso-border-none aso-text-white aso-opacity-90 hover:aso-border-none hover:aso-text-white hover:aso-opacity-100 aso-cursor-pointer" @click="setBack">
                <svg class="aso-w-6 aso-h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 12L5 8V11L17.17 11C17.3756 10.414 17.7586 9.90661 18.2657 9.54821C18.7729 9.18981 19.379 8.9982 20 9C20.7956 9 21.5587 9.31607 22.1213 9.87868C22.6839 10.4413 23 11.2044 23 12C23 12.7956 22.6839 13.5587 22.1213 14.1213C21.5587 14.6839 20.7956 15 20 15C18.69 15 17.58 14.17 17.17 13L5 13V16L1 12Z" fill="currentColor"/>
                </svg>

                <div class="aso-font-semibold aso-text-[16px]">Back</div>
            </button>
        </div>
        <div :class="`${props.action? !isLoading ? 'aso-bg-amber-400 ' :'aso-bg-amber-500':'aso-bg-[#016464]'} aso-rounded`">
            <button :disabled="isLoading" @click="props.action? updateAdditional(): saveAdditional()" class="aso-flex aso-bg-transparent aso-w-fit aso-space-x-2 aso-h-fit aso-text-white  aso-px-12 aso-p-2.5 aso-border-none aso-opacity-90 hover:aso-border-none hover:aso-text-white hover:aso-opacity-100 aso-cursor-pointer">
                <div class="aso-translate-y-1">
                    <img src="../../../../../../assets/icons/ic_loading_gray.svg" class="aso-w-5 aso-w-5" v-if="isLoading"/>
                    <svg class="aso-w-4 aso-h-4" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" v-if="!isLoading">
                        <path d="M2.5 1.25C2.16848 1.25 1.85054 1.3817 1.61612 1.61612C1.3817 1.85054 1.25 2.16848 1.25 2.5V17.5C1.25 17.8315 1.3817 18.1495 1.61612 18.3839C1.85054 18.6183 2.16848 18.75 2.5 18.75H17.5C17.8315 18.75 18.1495 18.6183 18.3839 18.3839C18.6183 18.1495 18.75 17.8315 18.75 17.5V2.5C18.75 2.16848 18.6183 1.85054 18.3839 1.61612C18.1495 1.3817 17.8315 1.25 17.5 1.25H11.875C11.5435 1.25 11.2255 1.3817 10.9911 1.61612C10.7567 1.85054 10.625 2.16848 10.625 2.5V11.6163L13.9325 8.3075C14.0499 8.19014 14.209 8.12421 14.375 8.12421C14.541 8.12421 14.7001 8.19014 14.8175 8.3075C14.9349 8.42486 15.0008 8.58403 15.0008 8.75C15.0008 8.91597 14.9349 9.07514 14.8175 9.1925L10.4425 13.5675C10.3844 13.6257 10.3155 13.6719 10.2395 13.7034C10.1636 13.7349 10.0822 13.7511 10 13.7511C9.91779 13.7511 9.83639 13.7349 9.76046 13.7034C9.68453 13.6719 9.61556 13.6257 9.5575 13.5675L5.1825 9.1925C5.12439 9.13439 5.07829 9.0654 5.04685 8.98948C5.0154 8.91356 4.99921 8.83218 4.99921 8.75C4.99921 8.66782 5.0154 8.58644 5.04685 8.51052C5.07829 8.4346 5.12439 8.36561 5.1825 8.3075C5.24061 8.24939 5.3096 8.20329 5.38552 8.17185C5.46144 8.1404 5.54282 8.12421 5.625 8.12421C5.70718 8.12421 5.78856 8.1404 5.86448 8.17185C5.9404 8.20329 6.00939 8.24939 6.0675 8.3075L9.375 11.6163V2.5C9.375 1.83696 9.63839 1.20107 10.1072 0.732233C10.5761 0.263392 11.212 0 11.875 0L17.5 0C18.163 0 18.7989 0.263392 19.2678 0.732233C19.7366 1.20107 20 1.83696 20 2.5V17.5C20 18.163 19.7366 18.7989 19.2678 19.2678C18.7989 19.7366 18.163 20 17.5 20H2.5C1.83696 20 1.20107 19.7366 0.732233 19.2678C0.263392 18.7989 0 18.163 0 17.5V2.5C0 1.83696 0.263392 1.20107 0.732233 0.732233C1.20107 0.263392 1.83696 0 2.5 0L5.625 0C5.79076 0 5.94973 0.065848 6.06694 0.183058C6.18415 0.300269 6.25 0.45924 6.25 0.625C6.25 0.79076 6.18415 0.949732 6.06694 1.06694C5.94973 1.18415 5.79076 1.25 5.625 1.25H2.5Z" fill="white"/>
                    </svg>
                </div>

                <span class="aso-font-semibold aso-text-[16px]">{{props.action? 'Update': 'Save'}}</span>
            </button>
        </div>
    </div>
</template>

<script setup>
import {ref,onMounted,defineProps} from 'vue';
import api from '@/admin/Api/api';
import toastMessage from '@/admin/utils/functions';
import { useRoute } from 'vue-router';
const route = useRoute()

const props = defineProps({
    action:Boolean,
    data:Object,
    id:Number,
    changeAction:Function,
    changeOpen:Function,
    changeAdditionals:Function
});
const noteType = ref({
  type: "note",
  label: "",
  description: "",
  noteLimitChar: ''
});
var isLoading = ref(false);

var emptyLabel = ref(false);

const isValideType = (option)=>{
    return option.type == "note" ? true : false;
}

onMounted(()=>{
    if(props.data){
        noteType.value = isValideType(props.data) ? props.data : {
            ...noteType.value,
            label:props.data.label,
            description:props.data.description,
        };
    }
});

const setBack = () => {
    noteType.value = {
        type: "note",
        label: "",
        description: "",
        noteLimitChar: 255
    }
    props.changeAction(false);
    props.changeOpen();
}
const saveAdditional = async () => {
    if(noteType.value.label.trim() == ''){
        emptyLabel.value = true;
        toastMessage("The note Label must not be empty","warning");
    }else{
        isLoading.value = true;            
        const op = await api.addCustomAdditional(route.params.configId,noteType.value);
        if(op.success){
            emptyLabel.value = true;
            props.changeOpen();
            props.changeAdditionals('add',op.message);
        }else{
            toastMessage(op.message,'error');
        }
        isLoading.value = false;
    }
}
const updateAdditional = async () => {
    if(noteType.value.label.trim() == ''){
        emptyLabel.value = true;
        toastMessage("The note Label must not be empty","warning");
    }else{
        isLoading.value = true;
        const op = await api.updateCustomAdditional(route.params.configId,props.id,noteType.value);
        if(op.success){
            emptyLabel.value = true;
            props.changeAction(false);
            props.changeOpen();
            props.changeAdditionals('edit',op.message);
        }else{
            toastMessage(op.message,'error');
        }
        isLoading.value = false;
    }
}
</script>