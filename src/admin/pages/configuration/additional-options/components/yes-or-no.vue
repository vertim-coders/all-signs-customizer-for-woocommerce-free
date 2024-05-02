
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
var isLoading = ref(false);
var yesOrNo = ref({
  type: "yes/no",
  label: "",
  description: "",
  inputs: {
    yes: "",
    no: ""
  },
  default: "no",
  popupImg: "",
  price: {
    type: "none",
    value: 0
  }
});

//var translateText= ref(ncpcData.ncpc_translate_text.configuration);
var backButtonText = "Back";
var saveButtonText = "Save";
var uploadImageText = "Upload Image";
//var pricingAdditionalText = ref(ncpcData.ncpc_translate_text.additionnalPricing);

var emptyLabel = ref(false);
var emptyInputsYes = ref(false);
var emptyInputsNo = ref(false);

const isValideType = (option)=>{
    return option.type == "yes/no" ? true : false;
}

onMounted(()=>{
    if(props.data){
        yesOrNo.value = isValideType(props.data) ? props.data : {
            ...yesOrNo.value,
            label:props.data.label,
            description:props.data.description
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
                        yesOrNo.value.popupImg=attachment.url;
                    }
                }
            );
        }
    )
    .open();
}

const setBack = () => {
    yesOrNo.value = {
        type: "yes/no",
        label: "",
        description: "",
        inputs: {
            yes: "",
            no: ""
        },
        default: "no",
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
    if(yesOrNo.value.label.trim() == ''){
        emptyLabel.value = true;
        toastMessage("The Yes Or No Label must not be empty","warning");
    }else if(yesOrNo.value.inputs.yes.trim() == ''){
        emptyInputsYes.value = true;
        toastMessage("The value of Yes field must not be empty","warning");
    }else if(yesOrNo.value.inputs.no.trim() == ''){
        emptyInputsNo.value = true;
        toastMessage("The value of No field must not be empty","warning");

    }else{
        isLoading.value = true;
        const op = await api.addCustomAdditional(route.params.configId,yesOrNo.value);
        if(op.success){
            emptyLabel.value = true;
            emptyInputsNo.value = true;
            emptyInputsYes.value = true;
            props.changeOpen();
            props.changeAdditionals('add',yesOrNo.value);
        }else{
            toastMessage('Add fail','error')
        }
        isLoading.value = false;
    }
}
const updateAdditional = async () => {
    if(yesOrNo.value.label.trim() == ''){
        emptyLabel.value = true;
        toastMessage("The Yes Or No Label must not be empty","warning");
    }else if(yesOrNo.value.inputs.yes.trim() == ''){
        emptyInputsYes.value = true;
        toastMessage("The value of Yes field must not be empty","warning");
    }else if(yesOrNo.value.inputs.no.trim() == ''){
        emptyInputsNo.value = true;
        toastMessage("The value of No field must not be empty","warning");

    }else{
        isLoading.value = true;
        const op = await api.updateCustomAdditional(route.params.configId,props.id,yesOrNo.value);
        if(op.success){
            emptyLabel.value = true;
            emptyInputsNo.value = true;
            emptyInputsYes.value = true;
            props.changeOpen();
            props.changeAction(false);
            props.changeAdditionals('edit',yesOrNo.value,props.id);
        }
        isLoading.value = false;
    }
}
</script>