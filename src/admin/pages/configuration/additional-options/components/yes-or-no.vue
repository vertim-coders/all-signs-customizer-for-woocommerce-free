
<template>
    <div class="aso-space-y-1">
        <div class="aso-bg-white aso-shadow-md aso-justify-center aso-items-center aso-px-4 aso-py-4">
            <p class="aso-text-[14px] aso-font-bold">2- Set the Label and Description</p>
            <p class="aso-text-[12px]">This text will display above the input options.</p>
            <div class="aso-flex aso-justify-between aso-space-x-12">
                <div class="aso-w-2/5 aso-space-y-2">
                    <label>Label</label>
                    <input v-model="yesOrNo.label"  type="text" :class="`aso-w-full ${emptyLabel?'aso-field-required':''}`" value="Remote control (Dimmer)"/>
                </div>
                <div class="aso-w-2/5 aso-space-y-2">
                    <label>Description</label>
                    <input v-model="yesOrNo.description" type="text" :class="`aso-w-full`" value="A remote control is included free with every sign"/>
                </div>
            </div>
        </div>
        <div class="aso-bg-white aso-shadow-md aso-justify-center aso-items-center aso-px-4 aso-py-4">
            <p class="aso-text-[14px] aso-font-bold">3- Yes/No Input</p>
            <p class="aso-text-[12px]">Displays as two buttons side by side.</p>
            <div class="aso-flex aso-justify-between aso-space-x-12">
                <div class="aso-w-2/5 aso-space-y-2">
                    <label>Selected Value</label>
                    <input v-model="yesOrNo.inputs.yes" type="text" :class="`aso-w-full ${emptyInputsYes?'aso-field-required':''}`" value="yes"/>
                </div>
                <div class="aso-w-2/5 aso-space-y-2">
                    <label>Unselected Value</label>
                    <input v-model="yesOrNo.inputs.no" type="text" :class="`aso-w-full ${emptyInputsNo?'aso-field-required':''}`" value="no"/>
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
                    <img v-if="yesOrNo.popImg != ''" :src="yesOrNo.popImg" alt="" class="aso-absolute aso-w-full aso-h-full">
                    <button v-if="yesOrNo.popImg != ''" @click="()=>{yesOrNo.popImg = ''}" :class="`aso-bg-[#016464] aso-absolute aso-bottom-0 aso-right-0 aso-text-white aso-p-1 aso-rounded-tl-lg aso-border-none aso-cursor-pointer`">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="aso-w-4 aso-h-4">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
        <div class="aso-bg-white aso-shadow-md aso-justify-center aso-items-center aso-px-4 aso-py-4">
            <p class="aso-text-[14px] aso-font-bold">5- Pricing (optional) </p>
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
            <div v-if="yesOrNo.price.type!='none'">
                <div class="flex flex-col space-y-1 w-10/12 pt-4 pb-8 px-8">
                    <input type="number" class="border rounded p-2 h-[35px]" v-model="yesOrNo.price.value" @blur="yesOrNo.price.value.trim()!=''? yesOrNo.price.value : 0">
                    <p class="text-[11px] w-2/3">{{yesOrNo.price.type == 'base'? 'Additional cost when selected by customer (e.g. $10.00).' : "Multiply the final price of the sign when selected (e.g. 2 x 100)."}}</p>
                </div>
            </div>
        </div>
    </div>
    <div class="aso-bg-[#F8F9FB] aso-flex aso-space-x-4 aso-px-4 aso-py-4 aso-justify-end aso-items-end aso-sticky aso-z-[999] aso-bottom-0">
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
  popImg: "",
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
                            yesOrNo.value.popImg = (attachment.url);
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
        popImg: "",
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
            props.changeAdditionals('add',op.message);
        }else{
            toastMessage(op.message,'error')
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
            props.changeAdditionals('edit',op.message);
        }else{
            toastMessage(op.message,'error')
        }
        isLoading.value = false;
    }
}
</script>