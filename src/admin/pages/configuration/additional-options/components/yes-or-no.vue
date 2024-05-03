
<template>
    <div class="aso-space-y-1">
        <div class="aso-bg-white aso-shadow-md aso-justify-center aso-items-center aso-px-4 aso-py-4">
            <p class="aso-text-[14px] aso-font-bold">2- Set the Label and Description</p>
            <p class="aso-text-[12px]">This text will display above the input options.</p>
            <div class="aso-flex aso-justify-between aso-space-x-12">
                <div class="aso-w-2/5 aso-space-y-2">
                    <label>Label</label>
                    <input v-model="yesOrNo.label" type="text" class="aso-w-full" value="Remote control (Dimmer)"/>
                </div>
                <div class="aso-w-2/5 aso-space-y-2">
                    <label>Description</label>
                    <input v-model="yesOrNo.description" type="text" class="aso-w-full" value="A remote control is included free with every sign"/>
                </div>
            </div>
        </div>
        <div class="aso-bg-white aso-shadow-md aso-justify-center aso-items-center aso-px-4 aso-py-4">
            <p class="aso-text-[14px] aso-font-bold">3- Yes/No Input</p>
            <p class="aso-text-[12px]">Displays as two buttons side by side.</p>
            <div class="aso-flex aso-justify-between aso-space-x-12">
                <div class="aso-w-2/5 aso-space-y-2">
                    <label>Selected Value</label>
                    <input v-model="yesOrNo.inputs.yes" type="text" class="aso-w-full" value="yes"/>
                </div>
                <div class="aso-w-2/5 aso-space-y-2">
                    <label>Unselected Value</label>
                    <input v-model="yesOrNo.inputs.no" type="text" class="aso-w-full" value="no"/>
                </div>
            </div>
            <p class="aso-text-[14px] aso-font-bold aso-pt-4">DEFAULT SELECTED VALUE</p>
            <p class="aso-text-[12px]">Choose which value is highlighted by default when the product customiser initally displays.</p>
            <div class="aso-flex aso-space-x-4">
                <div class="aso-flex aso-justify-center aso-items-center aso-space-x-4">
                    <p class="aso-text-md aso-font-medium aso-text-black">Selected</p>
                    <label for="selected" class="aso-relative aso-inline-flex aso-items-center aso-cursor-pointer aso-border-[1px] aso-border-solid aso-border-black aso-rounded-full">
                        <input id="selected" type="radio" name="selected" class="aso-sr-only aso-peer" value="yes" v-model="yesOrNo.default">
                        <div :class="`peer-checked:after:aso-border-[#016464] peer-checked:after:aso-border-solid peer-checked:after:aso-border-[5px] peer-checked:after:aso-top-[-2px] peer-checked:after:aso-translate-y-[-15%] aso-w-10 aso-h-3 aso-border aso-border-[5px] aso-border-[#016464] aso-bg-zinc-300 aso-rounded-full aso-peer peer-checked:after:aso-translate-x-[112%] after:aso-content-[''] after:aso-absolute after:aso-top-[-3px] after:aso-left-[-5px] after:aso-bg-zinc-300 after:aso-border-white after:aso-border-solid after:aso-translate-y-[-15%] after:aso-border-[#FFFFFF] after:aso-border-[5px] after:aso-rounded-full after:aso-h-3 after:aso-w-3 after:aso-transition-all after:aso-shadow-lg`"></div>
                    </label>
                </div>
                
                <div class="aso-flex aso-justify-center aso-items-center aso-space-x-4">
                    <p class="aso-text-md aso-font-medium aso-text-black">Unselected</p>
                    <label for="unselected" class="aso-relative aso-inline-flex aso-items-center aso-cursor-pointer aso-border-[1px] aso-border-solid aso-border-black aso-rounded-full">
                        <input id="unselected" type="radio" name="unselected" class="aso-sr-only aso-peer" value="no" v-model="yesOrNo.default">
                        <div class="peer-checked:after:aso-border-[#016464] peer-checked:after:aso-border-solid peer-checked:after:aso-border-[5px] peer-checked:after:aso-top-[-2px] peer-checked:after:aso-translate-y-[-15%] aso-w-10 aso-h-3 aso-border aso-border-[5px] aso-border-[#016464] aso-bg-zinc-300 aso-rounded-full aso-peer peer-checked:after:aso-translate-x-[112%] after:aso-content-[''] after:aso-absolute after:aso-top-[-3px] after:aso-left-[-5px] after:aso-bg-zinc-300 after:aso-border-white after:aso-border-solid after:aso-translate-y-[-15%] after:aso-border-[#FFFFFF] after:aso-border-[5px] after:aso-rounded-full after:aso-h-3 after:aso-w-3 after:aso-transition-all after:aso-shadow-lg"></div>
                    </label>
                </div>
            </div>

        </div>
        <div class="aso-bg-white aso-shadow-md aso-justify-center aso-items-center aso-px-4 aso-py-4">
            <p class="aso-text-[14px] aso-font-bold">4- Popup Image (optional)</p>
            <p class="aso-text-[12px]">Example Image - displayed as popup</p>
            <div class="aso-flex aso-w-full aso-space-x-2">
                <button @click="selectChangeImage" class="aso-bg-[#016464] aso-border-none aso-w-fit aso-h-fit aso-p-4 aso-rounded aso-px-4 aso-text-white aso-opacity-90 hover:aso-opacity-100 aso-text-[12px] aso-cursor-pointer">choose a picture</button>
                <div :class="`aso-relative aso-w-[82px] aso-h-[49px] aso-rounded-md aso-overflow-hidden`">
                    <img v-if="yesOrNo.popupImg != ''" :src="yesOrNo.popupImg" alt="" class="aso-absolute aso-w-full aso-h-full">
                    <button v-if="yesOrNo.popupImg != ''" @click="()=>{yesOrNo.popupImg = ''}" :class="`aso-bg-[#016464] aso-absolute aso-bottom-0 aso-right-0 aso-text-white aso-p-1 aso-rounded-tl-lg aso-border-none aso-cursor-pointer`">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="aso-w-4 aso-h-4">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
        <div class="aso-bg-white aso-shadow-md aso-justify-center aso-items-center aso-px-4 aso-py-4">
            <p class="aso-text-[14px] aso-font-bold">5- Pricing (optional) </p>
            <p class="aso-text-[12px]">Example Image - displayed as popup</p>
            <div class="aso-flex aso-space-x-4">
                <div class="aso-flex aso-justify-center aso-items-center aso-space-x-4">
                    <p class="aso-text-md aso-font-medium aso-text-black">None</p>
                    <label for="none" class="aso-relative aso-inline-flex aso-items-center aso-cursor-pointer aso-border-[1px] aso-border-solid aso-border-black aso-rounded-full">
                        <input id="none" type="radio" name="none" class="aso-sr-only aso-peer" value="none" v-model="yesOrNo.price.type">
                        <div :class="`peer-checked:after:aso-border-[#016464] peer-checked:after:aso-border-solid peer-checked:after:aso-border-[5px] peer-checked:after:aso-top-[-2px] peer-checked:after:aso-translate-y-[-15%] aso-w-10 aso-h-3 aso-border aso-border-[5px] aso-border-[#016464] aso-bg-zinc-300 aso-rounded-full aso-peer peer-checked:after:aso-translate-x-[112%] after:aso-content-[''] after:aso-absolute after:aso-top-[-3px] after:aso-left-[-5px] after:aso-bg-zinc-300 after:aso-border-white after:aso-border-solid after:aso-translate-y-[-15%] after:aso-border-[#FFFFFF] after:aso-border-[5px] after:aso-rounded-full after:aso-h-3 after:aso-w-3 after:aso-transition-all after:aso-shadow-lg`"></div>
                    </label>
                </div>
                
                <div class="aso-flex aso-justify-center aso-items-center aso-space-x-4">
                    <p class="aso-text-md aso-font-medium aso-text-black">Base Price</p>
                    <label for="base" class="aso-relative aso-inline-flex aso-items-center aso-cursor-pointer aso-border-[1px] aso-border-solid aso-border-black aso-rounded-full">
                    <input id="base" type="radio" name="base" class="aso-sr-only aso-peer" value="base" v-model="yesOrNo.price.type">
                    <div class="peer-checked:after:aso-border-[#016464] peer-checked:after:aso-border-solid peer-checked:after:aso-border-[5px] peer-checked:after:aso-top-[-2px] peer-checked:after:aso-translate-y-[-15%] aso-w-10 aso-h-3 aso-border aso-border-[5px] aso-border-[#016464] aso-bg-zinc-300 aso-rounded-full aso-peer peer-checked:after:aso-translate-x-[112%] after:aso-content-[''] after:aso-absolute after:aso-top-[-3px] after:aso-left-[-5px] after:aso-bg-zinc-300 after:aso-border-white after:aso-border-solid after:aso-translate-y-[-15%] after:aso-border-[#FFFFFF] after:aso-border-[5px] after:aso-rounded-full after:aso-h-3 after:aso-w-3 after:aso-transition-all after:aso-shadow-lg"></div>
                    </label>
                </div>
                <div class="aso-flex aso-justify-center aso-items-center aso-space-x-4">
                    <p class="aso-text-md aso-font-medium aso-text-black">Price Multiplier</p>
                    <label for="multiplier" class="aso-relative aso-inline-flex aso-items-center aso-cursor-pointer aso-border-[1px] aso-border-solid aso-border-black aso-rounded-full">
                    <input id="multiplier" type="radio" name="multiplier" class="aso-sr-only aso-peer" value="multiplier" v-model="yesOrNo.price.type">
                    <div class="peer-checked:after:aso-border-[#016464] peer-checked:after:aso-border-solid peer-checked:after:aso-border-[5px] peer-checked:after:aso-top-[-2px] peer-checked:after:aso-translate-y-[-15%] aso-w-10 aso-h-3 aso-border aso-border-[5px] aso-border-[#016464] aso-bg-zinc-300 aso-rounded-full aso-peer peer-checked:after:aso-translate-x-[112%] after:aso-content-[''] after:aso-absolute after:aso-top-[-3px] after:aso-left-[-5px] after:aso-bg-zinc-300 after:aso-border-white after:aso-border-solid after:aso-translate-y-[-15%] after:aso-border-[#FFFFFF] after:aso-border-[5px] after:aso-rounded-full after:aso-h-3 after:aso-w-3 after:aso-transition-all after:aso-shadow-lg"></div>
                    </label>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import {ref,onMounted,defineProps} from 'vue';
import api from '@/admin/Api/api';
import toastMessage from '@/admin/utils/functions';
import { useRoute } from 'vue-router';
const route = useRoute();
const props = defineProps({
    action:Boolean,
    data:Object,
    id:Number,
    changeAction:Function,
    changeOpen:Function,
    changeAdditionals:Function
});
const isLoading = ref(false);
const yesOrNo = ref({
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
const selectChangeImage = async(e) => { 
    e.preventDefault();
    var uploader = wp.media(
        {
            title: "Select Image",
            button: {
                text: "Select Image"
            },
            multiple: false
        }
    )
        .on(
            'select',
            function () {
                var selection = uploader.state().get('selection');
                selection.map(
                    function (attachment) {
                        attachment = attachment.toJSON();
                        if (attachment.type == "image") {
                            yesOrNo.value.popupImg = (attachment.url);
                        }
                    }
                );
            }
        )
        .open();
};

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