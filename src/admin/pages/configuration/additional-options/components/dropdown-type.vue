<template>
    <div class="aso-space-y-1">
        <div class="aso-bg-white aso-shadow-md aso-justify-center aso-items-center aso-px-4 aso-py-6">
            <p class="aso-text-[14px] aso-font-bold">2- Set the Label and Description</p>
            <p class="aso-text-[12px]">This text will display above the input options.</p>
            <div class="aso-flex aso-justify-between aso-space-x-12">
                <div class="aso-w-2/5 aso-space-y-2">
                    <label>Label</label>
                    <input v-model="dropdownType.label" type="text" class="aso-w-full" value="Remote control (Dimmer)"/>
                </div>
                <div class="aso-w-2/5 aso-space-y-2">
                    <label>Description</label>
                    <input v-model="dropdownType.description" type="text" class="aso-w-full" value="A remote control is included free with every sign"/>
                </div>
            </div>
        </div>
        <div class="aso-bg-white aso-shadow-md aso-justify-center aso-items-center aso-px-4 aso-py-6">
            <p class="aso-text-[14px] aso-font-bold">3- Images as Input</p>
            <p class="aso-text-[12px]">Displays as a row of images that is selectable by the customer.</p>
            <div class="aso-border-solid aso-border-[1px] aso-border-[#e5e7eb] aso-rounded-lg aso-p-8">
                <div class="aso-flex aso-justify-between aso-space-x-12">
                    <div class="aso-w-2/5 aso-space-y-2">
                        <label>Label</label>
                        <input v-model="dropdownType.options.label" type="text" class="aso-w-full" value="Remote control (Dimmer)"/>
                    </div>
                    <div class="aso-w-2/5 aso-space-y-2">
                        <label>Value(Required)</label>
                        <input v-model="dropdownType.options.value" type="text" class="aso-w-full" value="A remote control is included free with every sign"/>
                    </div>
                </div>
                <div>
                    <p class="aso-text-[14px] aso-font-bold">Popup Image (optional)</p>
                    <p class="aso-text-[12px]">Example Image - displayed as popup</p>
                    <div class="aso-flex aso-w-full aso-space-x-2">
                        <button @click="selectPopupImage" class="aso-bg-[#016464] aso-border-none aso-w-fit aso-h-fit aso-p-4 aso-rounded aso-px-4 aso-text-white aso-opacity-90 hover:aso-opacity-100 aso-text-[12px] aso-cursor-pointer">choose a picture</button>
                        <div :class="`aso-relative aso-w-[82px] aso-h-[49px] aso-rounded-md aso-overflow-hidden`">
                            <img v-if="dropdownType.options.previewImg != ''" :src="dropdownType.options.previewImg" alt="" class="aso-absolute aso-w-full aso-h-full">
                            <button v-if="dropdownType.options.previewImg != ''" @click="()=>{dropdownType.options.previewImg = ''}" :class="`aso-bg-[#016464] aso-absolute aso-bottom-0 aso-right-0 aso-text-white aso-p-1 aso-rounded-tl-lg aso-border-none aso-cursor-pointer`">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="aso-w-4 aso-h-4">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <p class="aso-text-[14px] aso-font-bold">Pricing (optional) </p>
                    <div class="aso-flex aso-space-x-4">
                        <div class="aso-flex aso-justify-center aso-items-center aso-space-x-4">
                            <p class="aso-text-md aso-font-medium aso-text-black">None</p>
                            <label for="none" class="aso-relative aso-inline-flex aso-items-center aso-cursor-pointer aso-border-[1px] aso-border-solid aso-border-black aso-rounded-full">
                                <input id="none" type="radio" name="none" class="aso-sr-only aso-peer" value="none" v-model="dropdownType.options.price">
                                <div :class="`peer-checked:after:aso-border-[#016464] peer-checked:after:aso-border-solid peer-checked:after:aso-border-[5px] peer-checked:after:aso-top-[-2px] peer-checked:after:aso-translate-y-[-15%] aso-w-10 aso-h-3 aso-border aso-border-[5px] aso-border-[#016464] aso-bg-zinc-300 aso-rounded-full aso-peer peer-checked:after:aso-translate-x-[112%] after:aso-content-[''] after:aso-absolute after:aso-top-[-3px] after:aso-left-[-5px] after:aso-bg-zinc-300 after:aso-border-white after:aso-border-solid after:aso-translate-y-[-15%] after:aso-border-[#FFFFFF] after:aso-border-[5px] after:aso-rounded-full after:aso-h-3 after:aso-w-3 after:aso-transition-all after:aso-shadow-lg`"></div>
                            </label>
                        </div>
                        
                        <div class="aso-flex aso-justify-center aso-items-center aso-space-x-4">
                            <p class="aso-text-md aso-font-medium aso-text-black">Base Price</p>
                            <label for="base" class="aso-relative aso-inline-flex aso-items-center aso-cursor-pointer aso-border-[1px] aso-border-solid aso-border-black aso-rounded-full">
                            <input id="base" type="radio" name="base" class="aso-sr-only aso-peer" value="base" v-model="dropdownType.options.price">
                            <div class="peer-checked:after:aso-border-[#016464] peer-checked:after:aso-border-solid peer-checked:after:aso-border-[5px] peer-checked:after:aso-top-[-2px] peer-checked:after:aso-translate-y-[-15%] aso-w-10 aso-h-3 aso-border aso-border-[5px] aso-border-[#016464] aso-bg-zinc-300 aso-rounded-full aso-peer peer-checked:after:aso-translate-x-[112%] after:aso-content-[''] after:aso-absolute after:aso-top-[-3px] after:aso-left-[-5px] after:aso-bg-zinc-300 after:aso-border-white after:aso-border-solid after:aso-translate-y-[-15%] after:aso-border-[#FFFFFF] after:aso-border-[5px] after:aso-rounded-full after:aso-h-3 after:aso-w-3 after:aso-transition-all after:aso-shadow-lg"></div>
                            </label>
                        </div>
                        <div class="aso-flex aso-justify-center aso-items-center aso-space-x-4">
                            <p class="aso-text-md aso-font-medium aso-text-black">Price Multiplier</p>
                            <label for="multiplier" class="aso-relative aso-inline-flex aso-items-center aso-cursor-pointer aso-border-[1px] aso-border-solid aso-border-black aso-rounded-full">
                            <input id="multiplier" type="radio" name="multiplier" class="aso-sr-only aso-peer" value="multiplier" v-model="dropdownType.options.price">
                            <div class="peer-checked:after:aso-border-[#016464] peer-checked:after:aso-border-solid peer-checked:after:aso-border-[5px] peer-checked:after:aso-top-[-2px] peer-checked:after:aso-translate-y-[-15%] aso-w-10 aso-h-3 aso-border aso-border-[5px] aso-border-[#016464] aso-bg-zinc-300 aso-rounded-full aso-peer peer-checked:after:aso-translate-x-[112%] after:aso-content-[''] after:aso-absolute after:aso-top-[-3px] after:aso-left-[-5px] after:aso-bg-zinc-300 after:aso-border-white after:aso-border-solid after:aso-translate-y-[-15%] after:aso-border-[#FFFFFF] after:aso-border-[5px] after:aso-rounded-full after:aso-h-3 after:aso-w-3 after:aso-transition-all after:aso-shadow-lg"></div>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <div class="aso-pt-4">
                <button :disabled="isLoading" @click="handleAddNewDropdown" class="aso-flex aso-justify-center aso-items-center aso-bg-[#016464] aso-rounded aso-w-fit aso-space-x-2 aso-h-fit aso-text-white aso-px-8 aso-p-2.5 aso-rounded aso-border-none hover:aso-opacity-100 hover:aso-border-none hover:aso-text-white hover:aso-bg-[#016464] aso-cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="aso-w-6 aso-h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                </button>
            </div>
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
const selectPopupImage = async(e) => { 
    e.preventDefault();
    var uploader = wp.media(
        {
            title: "choose a picture",
            button: {
                text: "choose a picture"
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
                            dropdownType.value.options.popupImg = (attachment.url);
                        }
                    }
                );
            }
        )
        .open();
};

const handleAddNewDropdown = () => {
    dropdownType.value.push({
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
}
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