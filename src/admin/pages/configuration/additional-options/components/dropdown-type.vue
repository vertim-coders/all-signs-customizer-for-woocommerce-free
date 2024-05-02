<template>
    <div class="aso-overflow-auto aso-w-full aso-h-[70vh] lilScroll gjhgchj">
       
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

//var translateText= ref(ncpcData.ncpc_translate_text.configuration);
var backButtonText = "Back";
var saveButtonText = "save";
var uploadImageText = "Upload Image";
var pricingAdditionalText = "pricing";
var isLoading = ref(false);
const dropdownType = ref({
  type: "dropdown",
  label: "",
  description: "",
  options: [
    {
      label: "",
      value: "",
      popupImg: "",
      price: {
        type: "none",
        value: 0
      }
    }
  ]
});

var emptyValueArray = ref([false]);
var emptyLabel = ref(false);

const isValideType = (option)=>{
    return option.type == "dropdown" ? true : false;
}

onMounted(()=>{
    if(props.data){
        dropdownType.value = isValideType(props.data) ? props.data : {
            ...dropdownType.value,
            label:props.data.label,
            description:props.data.description,
            options: [
                {
                label: "",
                value: "",
                popupImg: "",
                price: {
                    type: "none",
                    value: 0
                }
                }
            ]
        };
    }
});

const haveEmptyValue = () => {
    var index = -1;
    dropdownType.value.options.forEach((element,i) => {
        if(element.value.trim() == '') {
            index = i;
        }
    });
    return index;
}

const setBack = () => {
    dropdownType.value = {
        type: "dropdown",
        label: "",
        description: "",
        options: [
            {
                label: "",
                value: "",
                popupImg: "",
                price: {
                    type: "none",
                    value: 0
                }
            }
        ]
    }
    props.changeAction(false);
    props.changeOpen();
}
const saveAdditional = async () => {
    if(dropdownType.value.label.trim() == ''){
        emptyLabel.value = true;
        toastMessage("The Dropdown Label must not be empty","warning");
    }else if(haveEmptyValue() != -1){
        emptyValueArray.value[haveEmptyValue()] = true;
        toastMessage("The value field must not be empty","warning");
    }else{
        isLoading.value = true;
        const op = await api.addCustomAdditional(route.params.configId,dropdownType.value);
        if(op.success){
            emptyLabel.value = false;
            props.changeOpen();
            props.changeAdditionals('add',dropdownType.value);
        }
        isLoading.value = false;
    }
}

const uploadPopupImage = (index) => { 
    var uploader = wp.media(
        {
            title: 'Please set Preview picture',
            button: {
                text: "Select Preview picture(s)"
            },
            multiple: false
        }
    )
    .on(
        'select',
        function () {
            var selection = uploader.state().get( 'selection' );
            selection.map(
                function (attachment) {
                    attachment = attachment.toJSON();
                    if(attachment.type == 'image'){
                        dropdownType.value.options[index].popupImg=attachment.url;
                    }
                }
            );
        }
    )
    .open();
}

const updateAdditional = async () => {
    if(dropdownType.value.label.trim() == ''){
        emptyLabel.value = true;
        toastMessage("The Dropdown Label must not be empty","warning");
    }else if(haveEmptyValue() != -1){
        emptyValueArray.value[haveEmptyValue()] = true;
        toastMessage("The value field must not be empty","warning");
    }else{
        isLoading.value = true;
        const op = await api.updateCustomAdditional(route.params.configId,props.id,dropdownType.value);
        if(op.success){
            emptyLabel.value = false;
            props.changeAction(false);
            props.changeOpen();
            props.changeAdditionals('edit',dropdownType.value,props.id);
        }
        isLoading.value = false;
    }
}
const handleClickRemoveAdditional = (index) => {
    dropdownType.value.options.splice(index,1);
    emptyValueArray.value.splice(index,1);
}
const handleClickAddAdditional = () => {
    dropdownType.value.options.push({
        label: "",
        value: "",
        popupImg: "",
        price: {
            type: "none",
            value: 0
        }
    });
    emptyValueArray.value.push(false);
}
</script>

<style>
.lilScroll::-webkit-scrollbar {
    display: none;
    overflow: scroll;
}
</style>