
<template>
    <div class="aso-overflow-auto aso-w-full aso-h-[70vh] lilScroll">

    </div>
</template>
<script setup>
import {ref,onMounted,defineProps} from 'vue';
import api from '@/admin/Api/api';
import { useRoute } from 'vue-router';
const route = useRoute()
import toastMessage from '@/admin/utils/functions';
const props = defineProps({
    action:Boolean,
    data:Object,
    id:Number,
    changeAction:Function,
    changeOpen:Function,
    changeAdditionals:Function
});
var isLoading = ref(false);
var includedOption = ref({
    type: "include-type",
    label: "",
    description: "",
    popupImg: "",
    price: {
        type: "none",
        value: 0
    }
});

//var translateText= ref(ncpcData.ncpc_translate_text.configuration);
var backButtonText = "Back";
var saveButtonText = "Save";
var uploadImageText = "Upload";
//var pricingAdditionalText = ref(ncpcData.ncpc_translate_text.additionnalPricing);

var emptyLabel = ref(false);
var emptyInputsYes = ref(false);
var emptyInputsNo = ref(false);
const isValideType = (option)=>{
    return option.type == "include-type" ? true : false;
}

onMounted(()=>{
    if(props.data){
        includedOption.value = isValideType(props.data) ? props.data : {
            type: "include-type",
            label:props.data.label,
            popupImg:props.data.popupImg,
            description:props.data.description,
            price: props.data.price
        };
    }
});

const uploadPopupImage = () => { 
    var uploader = wp.media(
        {
            title: 'Please set the picture',
            button: {
                text: "Select picture(s)"
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
                        includedOption.value.popupImg=attachment.url;
                    }
                }
            );
        }
    )
    .open();
}

const setBack = () => {
    includedOption.value = {
        type: "include-type",
        label: "",
        description: "",
        popupImg: "",
        price: {
            type: "none",
            value: 0
        }
    }
    props.changeAction(false);
    props.changeOpen();
}
const saveAdditional = async () => {
    if(includedOption.value.label.trim() == ''){
        emptyLabel.value = true;
        toastMessage("Label must not be empty","warning");
    }else{
        isLoading.value = true;
        const op = await api.addCustomAdditional(route.params.configId,includedOption.value);
        if(op.success){
            emptyLabel.value = true;
            emptyInputsNo.value = true;
            emptyInputsYes.value = true;
            props.changeOpen();
            props.changeAdditionals('add',includedOption.value);
        }else{
            toastMessage('Add fail','error')
        }
        isLoading.value = false;
    }
}
const updateAdditional = async () => {
    if(includedOption.value.label.trim() == ''){
        emptyLabel.value = true;
        toastMessage("The Label must not be empty","warning");
    }else{
        isLoading.value = true;    
        const op = await api.updateCustomAdditional(route.params.configId,props.id,includedOption.value);
        if(op.success){
            emptyLabel.value = true;
            emptyInputsNo.value = true;
            emptyInputsYes.value = true;
            props.changeOpen();
            props.changeAction(false);
            props.changeAdditionals('edit',includedOption.value,props.id);
        }
        isLoading.value = false;
    }
}
</script>