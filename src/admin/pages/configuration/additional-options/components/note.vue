
<template>
    <div :class="`aso-bg-white aso-flex aso-flex-col aso-space-y-3 aso-border-b-[2px]`">
        
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
var isLoading = ref(false)
//var translateText= ref(ncpcData.ncpc_translate_text.configuration);
var backButtonText = "Back";
var saveButtonText = "Save";

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