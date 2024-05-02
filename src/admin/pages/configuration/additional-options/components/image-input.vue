<template>
    <div class="aso-overflow-auto aso-w-full aso-h-[70vh] lilScroll">

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
var isLoading = ref(false);
const inputTypeImage = ref({
    type: "image-input",
    label: "",
    description: "",
    options: [
        {
            label: "",
            value: "",
            color: "#fffffff",
            previewImg: "",
            popupImg: "",
            price: {
                type: "none",
                value: 0
            }
        }
    ]
});
const isValideType = (option)=>{
    return option.type == "image-input" ? true : false;
}
//var translateText= ref(ncpcData.ncpc_translate_text.configuration);
var backButtonText = "Back";
var saveButtonText = "Save";
var uploadImageText = "Upload";
var pricingAdditionalText = "Additonal Pricing";

var emptyValueArray = ref([false]);
var emptyLabel = ref(false);
onMounted(()=>{
    if(props.data){
        inputTypeImage.value = isValideType(props.data) ? props.data : {
            ...inputTypeImage.value,
            label:props.data.label,
            description:props.data.description,
            options:[
                {
                    label: "",
                    value: "",
                    color: "#fffffff",
                    previewImg: "",
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
    inputTypeImage.value.options.forEach((element,i) => {
        if(element.value.trim() == '') {
            index = i;
        }
    });
    return index;
}

const setBack = () => {
    inputTypeImage.value = {
        type: "image-input",
        label: "",
        description: "",
        options: [
            {
                label: "",
                value: "",
                color: "#fffffff",
                previewImg: "",
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
    if(inputTypeImage.value.label.trim() == ''){
        emptyLabel.value = true;
    }else if(haveEmptyValue()!=-1){
        emptyValueArray.value[haveEmptyValue()] = true;
    }else{
        isLoading.value = true;
        const op = await api.addCustomAdditional(route.params.configId,inputTypeImage.value);
        if(op.success){
            emptyLabel.value = false;
            props.changeOpen();
            props.changeAdditionals('add',inputTypeImage.value);
        }
        isLoading.value = false;
    }
}

const uploadPrevImage = (index) => { 
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
                        inputTypeImage.value.options[index].previewImg=attachment.url;
                    }
                }
            );
        }
    )
    .open();
}

const uploadPopImage = (index) => { 
    var uploader = wp.media(
        {
            title: 'Please set Popup picture',
            button: {
                text: "Select Popup picture(s)"
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
                        inputTypeImage.value.options[index].popupImg=attachment.url;
                    }
                }
            );
        }
    )
    .open();
}
const updateAdditional = async () => {
    if(inputTypeImage.value.label.trim() == ''){
        emptyLabel.value = true;
        toastMessage("The Image Label must not be empty","warning");
    }else if(haveEmptyValue() != -1){
        emptyValueArray.value[haveEmptyValue()] = true;
        toastMessage("The value field must not be empty","warning");
    }else{
        isLoading.value = true;
        const op = await api.updateCustomAdditional(route.params.configId,props.id,inputTypeImage.value);
        if(op.success){
            emptyLabel.value = false;
            props.changeAction(false);
            props.changeOpen();
            props.changeAdditionals('edit',inputTypeImage.value,props.id);
        }
        isLoading.value = false;
    }
}
const handleClickRemoveAdditional = (index) => {
    inputTypeImage.value.options.splice(index,1);
    emptyValueArray.value.splice(index,1);
}
const handleClickAddAdditional = () => {
    inputTypeImage.value.options.push({
        label: "",
        value: "",
        color: "#fffffff",
        previewImg: "",
        popupImg: "",
        price: {
            type: "none",
            value: 0
        }
    });
    emptyValueArray.value.push(false);
}
</script>