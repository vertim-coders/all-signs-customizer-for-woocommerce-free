
<template>
    <div class="aso-space-y-1">
        <div class="aso-bg-white aso-shadow-md aso-justify-center aso-items-center aso-px-4 aso-py-4">
            <p class="aso-text-[14px] aso-font-bold">2- Set the Label and Description</p>
            <p class="aso-text-[12px]">This text will display above the input options.</p>
            <div class="aso-flex aso-justify-between aso-space-x-12">
                <div class="aso-w-2/5 aso-space-y-2">
                    <label>Label</label>
                    <input v-model="noteType.label" type="text" class="aso-w-full" value=""/>
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
            <input v-model="noteType.label" type="number" class="aso-w-3/4" value=""/>
            <p class="aso-text-[12px]">The maximum number of text characters for notes.</p>
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
            props.changeAdditionals('add',noteType.value);
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
            props.changeAdditionals('edit',noteType.value,props.id);
        }else{
            toastMessage(op.message,'error');
        }
        isLoading.value = false;
    }
}
</script>