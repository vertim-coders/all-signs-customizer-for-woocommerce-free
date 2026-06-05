
<template>
    <div class="asowp-space-y-1">
        <div class="asowp-bg-white asowp-shadow-md asowp-justify-center asowp-items-center asowp-px-4 asowp-py-6">
            <p class="asowp-text-[14px] asowp-font-bold">2- {{ __('Set the Label and Description', 'all-signs-options-pro') }}</p>
            <p class="asowp-text-[12px]">{{ __('This text will display above the input options.', 'all-signs-options-pro') }}</p>
            <div class="asowp-flex asowp-justify-between asowp-space-x-12">
                <div class="asowp-w-2/5 asowp-space-y-2">
                    <label>{{ __('Label', 'all-signs-options-pro') }}</label>
                    <input v-model="includedOption.label" type="text" :class="`asowp-w-full ${emptyLabel?'asowp-field-required':''}`" value="Remote control (Dimmer)"/>
                </div>
                <div class="asowp-w-2/5 asowp-space-y-2">
                    <label>{{ __('Description', 'all-signs-options-pro') }}</label>
                    <input v-model="includedOption.description" type="text" class="asowp-w-full" value="A remote control is included free with every sign"/>
                </div>
            </div>
        </div>
        <div class="asowp-bg-white asowp-shadow-md asowp-justify-center asowp-items-center asowp-px-4 asowp-py-6">
            <p class="asowp-text-[14px] asowp-font-bold">4- {{ __('Popup Image (optional)', 'all-signs-options-pro') }}</p>
            <p class="asowp-text-[12px]">{{ __('Example Image - displayed as popup', 'all-signs-options-pro') }}</p>
            <div class="asowp-flex asowp-items-center asowp-justify-between asowp-w-full asowp-max-w-[574px] asowp-h-[54px] asowp-border asowp-border-solid asowp-border-[#9ca3af] asowp-rounded-[5px] asowp-bg-white asowp-overflow-hidden asowp-p-1">
                <button type="button" @click="selectPopupImage" class="asowp-bg-[#007a73] asowp-border-none asowp-h-[40px] asowp-px-4 asowp-rounded-[6px] asowp-text-white asowp-text-[12px] asowp-font-bold asowp-cursor-pointer hover:asowp-bg-[#006c67] hover:asowp-border-none hover:asowp-text-white">{{ __('choose a picture', 'all-signs-options-pro') }}</button>
                <div class="asowp-relative asowp-w-[50px] asowp-h-[48px] asowp-rounded-[8px] asowp-border asowp-border-solid asowp-border-[#e5e7eb] asowp-bg-white asowp-overflow-hidden">
                    <img v-if="includedOption.popImg != ''" :src="includedOption.popImg" alt="" class="asowp-absolute asowp-inset-0 asowp-w-full asowp-h-full asowp-object-cover">
                    <button v-if="includedOption.popImg != ''" type="button" @click="()=>{includedOption.popImg = ''}" :class="`asowp-bg-[#007a73] asowp-absolute asowp-bottom-0 asowp-right-0 asowp-text-white asowp-p-1 asowp-rounded-tl-lg asowp-border-none asowp-cursor-pointer`">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="asowp-w-4 asowp-h-4">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
        <div class="asowp-bg-white asowp-shadow-md asowp-justify-center asowp-items-center asowp-px-4 asowp-py-6">
            <p class="asowp-text-[14px] asowp-font-bold">{{ __('Pricing (optional)', 'all-signs-options-pro') }}</p>
            <div class="asowp-flex asowp-space-x-4">
                <div class="asowp-flex asowp-justify-center asowp-items-center asowp-space-x-4">
                    <p class="asowp-text-md asowp-font-medium asowp-text-black">{{ __('None', 'all-signs-options-pro') }}</p>
                    <label for="none" class="asowp-relative asowp-inline-flex asowp-items-center asowp-cursor-pointer asowp-border-[1px] asowp-border-solid asowp-border-black asowp-rounded-full">
                        <input id="none" type="radio" name="none" class="asowp-sr-only asowp-peer" value="none" v-model="includedOption.price.type">
                        <div :class="`peer-checked:after:asowp-border-[#016464] peer-checked:after:asowp-border-solid peer-checked:after:asowp-border-[5px] peer-checked:after:asowp-top-[-2px] peer-checked:after:asowp-translate-y-[-15%] asowp-w-10 asowp-h-3 asowp-border asowp-border-[5px] asowp-border-[#016464] asowp-bg-zinc-300 asowp-rounded-full asowp-peer peer-checked:after:asowp-translate-x-[112%] after:asowp-content-[''] after:asowp-absolute after:asowp-top-[-3px] after:asowp-left-[-5px] after:asowp-bg-zinc-300 after:asowp-border-white after:asowp-border-solid after:asowp-translate-y-[-15%] after:asowp-border-[#FFFFFF] after:asowp-border-[5px] after:asowp-rounded-full after:asowp-h-3 after:asowp-w-3 after:asowp-transition-all after:asowp-shadow-lg`"></div>
                    </label>
                </div>

                <div class="asowp-flex asowp-justify-center asowp-items-center asowp-space-x-4">
                    <p class="asowp-text-md asowp-font-medium asowp-text-black">{{ __('Base Price', 'all-signs-options-pro') }}</p>
                    <label for="base" class="asowp-relative asowp-inline-flex asowp-items-center asowp-cursor-pointer asowp-border-[1px] asowp-border-solid asowp-border-black asowp-rounded-full">
                    <input id="base" type="radio" name="base" class="asowp-sr-only asowp-peer" value="base" v-model="includedOption.price.type">
                    <div class="peer-checked:after:asowp-border-[#016464] peer-checked:after:asowp-border-solid peer-checked:after:asowp-border-[5px] peer-checked:after:asowp-top-[-2px] peer-checked:after:asowp-translate-y-[-15%] asowp-w-10 asowp-h-3 asowp-border asowp-border-[5px] asowp-border-[#016464] asowp-bg-zinc-300 asowp-rounded-full asowp-peer peer-checked:after:asowp-translate-x-[112%] after:asowp-content-[''] after:asowp-absolute after:asowp-top-[-3px] after:asowp-left-[-5px] after:asowp-bg-zinc-300 after:asowp-border-white after:asowp-border-solid after:asowp-translate-y-[-15%] after:asowp-border-[#FFFFFF] after:asowp-border-[5px] after:asowp-rounded-full after:asowp-h-3 after:asowp-w-3 after:asowp-transition-all after:asowp-shadow-lg"></div>
                    </label>
                </div>
                <div class="asowp-flex asowp-justify-center asowp-items-center asowp-space-x-4">
                    <p class="asowp-text-md asowp-font-medium asowp-text-black">{{ __('Price Multiplier', 'all-signs-options-pro') }}</p>
                    <label for="multiplier" class="asowp-relative asowp-inline-flex asowp-items-center asowp-cursor-pointer asowp-border-[1px] asowp-border-solid asowp-border-black asowp-rounded-full">
                    <input id="multiplier" type="radio" name="multiplier" class="asowp-sr-only asowp-peer" value="multiplier" v-model="includedOption.price.type">
                    <div class="peer-checked:after:asowp-border-[#016464] peer-checked:after:asowp-border-solid peer-checked:after:asowp-border-[5px] peer-checked:after:asowp-top-[-2px] peer-checked:after:asowp-translate-y-[-15%] asowp-w-10 asowp-h-3 asowp-border asowp-border-[5px] asowp-border-[#016464] asowp-bg-zinc-300 asowp-rounded-full asowp-peer peer-checked:after:asowp-translate-x-[112%] after:asowp-content-[''] after:asowp-absolute after:asowp-top-[-3px] after:asowp-left-[-5px] after:asowp-bg-zinc-300 after:asowp-border-white after:asowp-border-solid after:asowp-translate-y-[-15%] after:asowp-border-[#FFFFFF] after:asowp-border-[5px] after:asowp-rounded-full after:asowp-h-3 after:asowp-w-3 after:asowp-transition-all after:asowp-shadow-lg"></div>
                    </label>
                </div>
            </div>
            <div v-if="includedOption.price.type!='none'">
                <div class="flex flex-col space-y-1 w-10/12 pt-4 pb-8 px-8">
                    <input type="number" class="border rounded p-2 h-[35px]" v-model="includedOption.price.value" @blur="isNaN(includedOption.price.value)? includedOption.price.value=0 : ''">
                    <p class="text-[11px] w-2/3">{{includedOption.price.type == 'base'? __('Additional cost when selected by customer (e.g. $10.00).', 'all-signs-options-pro') : __('Multiply the final price of the sign when selected (e.g. 2 x 100).', 'all-signs-options-pro')}}</p>
                </div>
            </div>
        </div>
    </div>
    <div class="asowp-bg-[#F8F9FB] asowp-flex asowp-space-x-4 asowp-px-4 asowp-py-4 asowp-justify-end asowp-items-end asowp-sticky asowp-z-[999] asowp-bottom-0">
        <div class="asowp-bg-[#007a73] asowp-rounded-[7px] asowp-border asowp-border-solid asowp-border-[#006c67]">
            <button class="asowp-flex asowp-items-center asowp-justify-center asowp-bg-transparent asowp-w-fit asowp-gap-1.5 asowp-h-[30px] asowp-px-3.5 asowp-py-1.5 asowp-border-none asowp-text-white asowp-text-[12px] asowp-font-bold hover:asowp-border-none hover:asowp-text-white hover:asowp-bg-transparent asowp-cursor-pointer" @click="setBack">
                <svg class="asowp-w-4 asowp-h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 12L5 8V11L17.17 11C17.3756 10.414 17.7586 9.90661 18.2657 9.54821C18.7729 9.18981 19.379 8.9982 20 9C20.7956 9 21.5587 9.31607 22.1213 9.87868C22.6839 10.4413 23 11.2044 23 12C23 12.7956 22.6839 13.5587 22.1213 14.1213C21.5587 14.6839 20.7956 15 20 15C18.69 15 17.58 14.17 17.17 13L5 13V16L1 12Z" fill="currentColor"/>
                </svg>

                <div class="asowp-leading-none">{{ __('Back', 'all-signs-options-pro') }}</div>
            </button>
        </div>
        <div :class="`${isLoading ? 'asowp-bg-[#006c67]' : 'asowp-bg-[#007a73]'} asowp-rounded-[7px] asowp-border asowp-border-solid asowp-border-[#006c67]`">
            <button :disabled="isLoading" @click="props.action? updateAdditional(): saveAdditional()" class="asowp-flex asowp-items-center asowp-justify-center asowp-bg-transparent asowp-w-fit asowp-gap-1.5 asowp-h-[30px] asowp-text-white asowp-text-[12px] asowp-font-bold asowp-px-4 asowp-py-1.5 asowp-border-none hover:asowp-border-none hover:asowp-text-white hover:asowp-bg-transparent asowp-cursor-pointer">
                <div class="asowp-flex asowp-items-center">
                    <img src="@/../assets/icons/ic_loading_gray.svg" class="asowp-w-4 asowp-h-4" v-if="isLoading"/>
                    <svg class="asowp-w-4 asowp-h-4" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" v-if="!isLoading">
                        <path d="M2.5 1.25C2.16848 1.25 1.85054 1.3817 1.61612 1.61612C1.3817 1.85054 1.25 2.16848 1.25 2.5V17.5C1.25 17.8315 1.3817 18.1495 1.61612 18.3839C1.85054 18.6183 2.16848 18.75 2.5 18.75H17.5C17.8315 18.75 18.1495 18.6183 18.3839 18.3839C18.6183 18.1495 18.75 17.8315 18.75 17.5V2.5C18.75 2.16848 18.6183 1.85054 18.3839 1.61612C18.1495 1.3817 17.8315 1.25 17.5 1.25H11.875C11.5435 1.25 11.2255 1.3817 10.9911 1.61612C10.7567 1.85054 10.625 2.16848 10.625 2.5V11.6163L13.9325 8.3075C14.0499 8.19014 14.209 8.12421 14.375 8.12421C14.541 8.12421 14.7001 8.19014 14.8175 8.3075C14.9349 8.42486 15.0008 8.58403 15.0008 8.75C15.0008 8.91597 14.9349 9.07514 14.8175 9.1925L10.4425 13.5675C10.3844 13.6257 10.3155 13.6719 10.2395 13.7034C10.1636 13.7349 10.0822 13.7511 10 13.7511C9.91779 13.7511 9.83639 13.7349 9.76046 13.7034C9.68453 13.6719 9.61556 13.6257 9.5575 13.5675L5.1825 9.1925C5.12439 9.13439 5.07829 9.0654 5.04685 8.98948C5.0154 8.91356 4.99921 8.83218 4.99921 8.75C4.99921 8.66782 5.0154 8.58644 5.04685 8.51052C5.07829 8.4346 5.12439 8.36561 5.1825 8.3075C5.24061 8.24939 5.3096 8.20329 5.38552 8.17185C5.46144 8.1404 5.54282 8.12421 5.625 8.12421C5.70718 8.12421 5.78856 8.1404 5.86448 8.17185C5.9404 8.20329 6.00939 8.24939 6.0675 8.3075L9.375 11.6163V2.5C9.375 1.83696 9.63839 1.20107 10.1072 0.732233C10.5761 0.263392 11.212 0 11.875 0L17.5 0C18.163 0 18.7989 0.263392 19.2678 0.732233C19.7366 1.20107 20 1.83696 20 2.5V17.5C20 18.163 19.7366 18.7989 19.2678 19.2678C18.7989 19.7366 18.163 20 17.5 20H2.5C1.83696 20 1.20107 19.7366 0.732233 19.2678C0.263392 18.7989 0 18.163 0 17.5V2.5C0 1.83696 0.263392 1.20107 0.732233 0.732233C1.20107 0.263392 1.83696 0 2.5 0L5.625 0C5.79076 0 5.94973 0.065848 6.06694 0.183058C6.18415 0.300269 6.25 0.45924 6.25 0.625C6.25 0.79076 6.18415 0.949732 6.06694 1.06694C5.94973 1.18415 5.79076 1.25 5.625 1.25H2.5Z" fill="white"/>
                    </svg>
                </div>

                <span class="asowp-leading-none">{{props.action? __('Update', 'all-signs-options-pro') : __('Save', 'all-signs-options-pro') }}</span>
            </button>
        </div>
    </div>
</template>
<script setup>
import {ref,onMounted,defineProps} from 'vue';
import api from '@/admin/Api/api';
import { useRoute } from 'vue-router';
import { __, _x, _n, _nx, sprintf, setLocaleData } from "@wordpress/i18n";
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
    popImg: "",
    price: {
        type: "none",
        value: 0
    }
});
const selectPopupImage = async(e) => {
    e.preventDefault();
    var uploader = wp.media(
        {
            title: __('choose a picture', 'all-signs-options-pro'),
            button: {
                text: __('choose a picture', 'all-signs-options-pro')
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
                            includedOption.value.popImg = (attachment.url);
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
    return option.type == "include-type" ? true : false;
}

onMounted(()=>{
    if(props.data){
        includedOption.value = isValideType(props.data) ? props.data : {
            type: "include-type",
            label:props.data.label,
            popImg:props.data.popImg,
            description:props.data.description,
            price: props.data.price
        };
    }
});

const uploadPopupImage = () => {
    var uploader = wp.media(
        {
            title: __('Please set the picture', 'all-signs-options-pro'),
            button: {
                text: __('Select picture(s)', 'all-signs-options-pro')
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
                        includedOption.value.popImg=attachment.url;
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
    if(includedOption.value.label.trim() == ''){
        emptyLabel.value = true;
        toastMessage(__('Label must not be empty', 'all-signs-options-pro'), 'warning');
    }else{
        isLoading.value = true;
        const op = await api.addCustomAdditional(route.params.configId,includedOption.value);
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
    if(includedOption.value.label.trim() == ''){
        emptyLabel.value = true;
        toastMessage(__('The Label must not be empty', 'all-signs-options-pro'), 'warning');
    }else{
        isLoading.value = true;
        const op = await api.updateCustomAdditional(route.params.configId,props.id,includedOption.value);
        if(op.success){
            emptyLabel.value = true;
            emptyInputsNo.value = true;
            emptyInputsYes.value = true;
            props.changeOpen();
            props.changeAction(false);
            props.changeAdditionals('edit',op.message);
        }else{
            toastMessage(op.message,'error');
        }
        isLoading.value = false;
    }
}
</script>
