<template>
    <div class="">
        <div class="aso-space-y-1 aso-translate-y-9" v-if="!createFont">
            <div class="aso-bg-[#F8F9FB] aso-text-[16px] aso-space-x-1 aso-px-4 aso-py-4 aso-flex">
                <span class="aso-font-bold">
                    Manage Font
                </span>
            </div>
            <div v-if="!isFetching" class="aso-flex aso-justify-end aso-space-x-2 aso-w-4/4 aso-bg-[#F8F9FB] aso-text-[12px] aso-px-4 aso-py-4 aso-pb-2">
                <button class="aso-flex aso-w-fit aso-h-fit aso-rounded aso-bg-[#016464] aso-px-4 aso-space-x-2 aso-p-1.5 aso-border-none aso-text-white aso-opacity-90 hover:aso-opacity-100 aso-cursor-pointer" @click="addFont">
                    <svg class="aso-w-5 aso-h-5" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="plus-lg">
                        <path id="Vector" fill-rule="evenodd" clip-rule="evenodd" d="M11 2.75C11.1823 2.75 11.3572 2.82243 11.4861 2.95136C11.6151 3.0803 11.6875 3.25516 11.6875 3.4375V10.3125H18.5625C18.7448 10.3125 18.9197 10.3849 19.0486 10.5139C19.1776 10.6428 19.25 10.8177 19.25 11C19.25 11.1823 19.1776 11.3572 19.0486 11.4861C18.9197 11.6151 18.7448 11.6875 18.5625 11.6875H11.6875V18.5625C11.6875 18.7448 11.6151 18.9197 11.4861 19.0486C11.3572 19.1776 11.1823 19.25 11 19.25C10.8177 19.25 10.6428 19.1776 10.5139 19.0486C10.3849 18.9197 10.3125 18.7448 10.3125 18.5625V11.6875H3.4375C3.25516 11.6875 3.0803 11.6151 2.95136 11.4861C2.82243 11.3572 2.75 11.1823 2.75 11C2.75 10.8177 2.82243 10.6428 2.95136 10.5139C3.0803 10.3849 3.25516 10.3125 3.4375 10.3125H10.3125V3.4375C10.3125 3.25516 10.3849 3.0803 10.5139 2.95136C10.6428 2.82243 10.8177 2.75 11 2.75Z" fill="white"/>
                        </g>
                    </svg>
                    <div class="aso-text-[14px]">
                        Add new font
                    </div>
                </button>
            </div>
            
            <div class="aso-relative" id="monTableau" >
                <table class="aso-text-center aso-w-full aso-border aso-border-collapse aso-border-0">
                    <thead class="aso-bg-[#f0f0f1]">
                        <tr class="">
                            <th scope="col" class="aso-px-6 aso-py-3 aso-text-[14px] aso-font-semibold">
                                Label
                            </th>
                            <th scope="col" class="aso-px-6 aso-py-3 aso-text-[14px] aso-font-semibold">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody class="aso-bg-white">
                        <tr v-if="isFetching">
                            <td colspan="2">
                                <div class="aso-bg-white aso-border-solid aso-border aso-border-[#D1D1D1] aso-flex aso-flex-col aso-space-y-2 aso-justify-center aso-items-center aso-w-full aso-h-[306px] p-4">
                                    <img class="aso-w-[200px] aso-h-[200px]" src="../../../../assets/icons/ic_loading.svg" alt="">
                                </div>
                            </td>
                        </tr>
                        <tr  v-if="fonts.length == 0 && !isFetching">
                            <td colspan="2">
                                <div class="aso-bg-white aso-border-solid aso-border aso-border-[#D1D1D1] aso-flex aso-flex-col aso-space-y-12 aso-justify-center aso-items-center aso-py-10 aso-h-[306px]">
                                    <div class="aso-flex aso-flex-col aso-space-y-2 aso-justify-center aso-items-center">
                                        <p class="aso-text-2xl aso-font-bold">{{noFontsFound}}</p>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr v-if="!isFetching" v-for="(font,key) in fonts" :key="key" class="aso-border-t-0 aso-border-l-0 aso-border-r-0 aso-border-b-2 aso-border-solid aso-border-[#f0f0f1]">
                            <td class="aso-px-6 aso-text-[14px] aso-py-2 aso-text-center aso-space-x-2">
                               {{font.label}}
                            </td>
                            <td class="aso-px-6 aso-py-2 aso-flex aso-justify-center aso-space-x-2">
                                <button @click="()=>selectedFont(key,font)" class="aso-bg-transparent aso-border-none aso-text-[#2DD05B] aso-cursor-pointer">
                                    <img class="aso-w-5 aso-h-5" src="../../../../assets/icons/ic_edit.svg" alt="">
                                </button>
                                <button @click="()=>selectedFont(key,font,true)" class="aso-bg-transparent aso-border-none aso-text-[#A00000] aso-cursor-pointer">
                                    <img class="aso-w-5 aso-h-5" src="../../../../assets/icons/ic_delete.svg" alt="">
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="aso-space-y-1 aso-translate-y-9" v-if="createFont">
            <div class="aso-bg-[#F8F9FB] aso-text-[16px] aso-font-bold aso-px-4 aso-py-4 ">
                Add new font
            </div>
            <div class="aso-px-6 aso-translate-y-4 aso-text-[14px]">
                Add a font from Google Font or upload your own
            </div>
            <div class="aso-flex aso-space-x-4 aso-w-full aso-p-8 aso-px-6">
                <div class="aso-flex aso-justify-center aso-items-center aso-space-x-4">
                    <p class="aso-text-md aso-font-medium aso-text-black">Google Font</p>
                    <label for="uploadFont" class="aso-relative aso-inline-flex aso-items-center aso-cursor-pointer">
                        <input id="uploadFont" type="radio" name="upload-font" class="aso-sr-only aso-peer" :value="true" v-model="font.isGoogleFont" :checked="font.isGoogleFont">
                        <div :class="`peer-checked:after:aso-border-[#016464] peer-checked:after:aso-border-solid peer-checked:after:aso-top-[-2px] peer-checked:after:aso-translate-y-[-15%] aso-w-10 aso-h-3.5 aso-border aso-border-[#016464] aso-bg-zinc-300 aso-rounded-full aso-peer peer-checked:after:aso-translate-x-[80%] after:aso-content-[''] after:aso-absolute after:aso-top-[-3px] after:aso-left-[0px] after:aso-bg-zinc-300 after:aso-border-white after:aso-border-solid after:aso-translate-y-[-15%] after:aso-border-[#FFFFFF] after:aso-rounded-full after:aso-h-5 after:aso-w-5 after:aso-transition-all after:aso-shadow-lg`"></div>
                    </label>
                </div>
                
                <div class="aso-flex aso-justify-center aso-items-center aso-space-x-4">
                    <p class="aso-text-md aso-font-medium aso-text-black">Upload Font</p>
                    <label for="uploadFont2" class="aso-relative aso-inline-flex aso-items-center aso-cursor-pointer">
                    <input id="uploadFont2" type="radio" name="upload-font" class="aso-sr-only aso-peer" :value="false" v-model="font.isGoogleFont" :checked="!font.isGoogleFont">
                    <div class="peer-checked:after:aso-border-[#016464] peer-checked:after:aso-border-solid peer-checked:after:aso-top-[-2px] peer-checked:after:aso-translate-y-[-15%] aso-w-10 aso-h-3.5 aso-border aso-border-[#016464] aso-bg-zinc-300 aso-rounded-full aso-peer peer-checked:after:aso-translate-x-[80%] after:aso-content-[''] after:aso-absolute after:aso-top-[-3px] after:aso-left-[0px] after:aso-bg-zinc-300 after:aso-border-white after:aso-border-solid after:aso-translate-y-[-15%] after:aso-border-[#FFFFFF] after:aso-rounded-full after:aso-h-5 after:aso-w-5 after:aso-transition-all after:aso-shadow-lg"></div>
                    </label>
                </div>
            </div>
            <div v-if="font.isGoogleFont" class="aso-px-6 aso-py-6 -aso-translate-y-8">
                <div class="aso-flex aso-justify-between">
                    <div class="aso-w-2/5 aso-py-3 aso-space-y-3">
                        <label class="aso-text-md aso-font-medium aso-text-black">Choose Google font</label>
                        <Multiselect
                            v-model="selectedGoogleFont"
                            placeholder="Select your font"
                            label="name"
                            trackBy="name"
                            :options="allGoogleFonts"
                            :searchable="true"
                            :loading="isFetching"
                            @select="(option)=>{font.label = option[0].label}"
                        >
                            <template v-slot:option="{ option }">
                                {{ option.name }}
                            </template>

                        </Multiselect>
                    </div>
                    <div class="aso-w-2/5 aso-py-3 aso-space-y-3">
                        <label class="aso-text-md aso-font-medium aso-text-black">Choose Google font Variant</label>
                        <Multiselect
                            v-model="font.url"
                            placeholder="Select your variant"
                            label="name"
                            trackBy="name"
                            :options="selectedGoogleFont"
                            :searchable="true"
                        >
                            <template v-slot:option="{ option }">
                                {{ option.name }}
                            </template>
        
                        </Multiselect>
                    </div>
                </div>
                <div :class="`${emptyFontLabel?'aso-border-red-500 aso-text-red-500 aso-border-2':''} aso-flex aso-flex-col aso-space-y-2 aso-w-full aso-py-4`">
                    <label for="file_input" :class="`aso-text-md aso-font-medium aso-text-black`">Font Label</label>
                    <input type="text" v-model="font.label" :class="`aso-w-[40%] aso-h-[35px] ${emptyFontLabel ? 'aso-border-red-500 aso-text-red-500 aso-border-solid ':''} `"/>
                </div>
            </div>
            <div class="aso-space-x-2 -aso-translate-y-6 aso-py-12" v-if="!font.isGoogleFont">
                <div :class="`${emptyFontLabel?'aso-border-red-500 aso-text-red-500':''} aso-flex aso-justify-between aso-px-6`">
                    <div class="aso-space-y-3 aso-w-2/5">
                        <label class="aso-text-md aso-font-medium aso-text-black aso-flex aso-flex-col">Label Font</label>
                        <input type="text" v-model="font.label" :class="`${emptyFontLabel?'aso-border-red-500 aso-text-red-500 aso-border-solid':''} aso-w-full aso-h-[39px]`"/>
                    </div>
                    <div class="aso-w-2/5 aso-space-y-3">
                        <label for="file_input" :class="`aso-text-md aso-font-medium aso-text-black ${emptyFontLabel?'aso-border-red-500 aso-text-red-500 aso-border-solid ':''}`">Upload here your own font</label>
                        <div class="aso-flex aso-space-x-2">
                            <button @click="uploadFontFile" :class="`aso-w-1/3 aso-h-fit aso-p-2.5 aso-px-2 aso-rounded-md aso-shadow-zinc-400 aso-shadow-lg aso-font-medium aso-transition-all aso-ease-in-out aso-duration-1000 aso-border-solid aso-border-[#016464] aso-bg-[#016464] aso-text-white aso-cursor-pointer`">
                                Choose a font
                            </button>
                            <input type="text" name="" id="" class="aso-text-white aso-w-full aso-h-[39px]" readonly v-model="font.url">
                        </div>
                    </div>
                    
                </div>
            </div>
            <div class="aso-bg-[#F8F9FB] aso-flex aso-font-bold aso-space-x-4 aso-px-4 aso-py-4 aso-justify-end aso-items-end">
                <div class="aso-bg-[#016464] aso-rounded">
                    <button class="aso-flex aso-bg-transparent aso-w-fit aso-space-x-2 aso-h-fit aso-px-8 aso-text-white aso-p-2 aso-border-none aso-opacity-90 hover:aso-border-none hover:aso-text-white hover:aso-opacity-100 aso-cursor-pointer" @click="back">
                        <svg class="aso-w-6 aso-h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 12L5 8V11L17.17 11C17.3756 10.414 17.7586 9.90661 18.2657 9.54821C18.7729 9.18981 19.379 8.9982 20 9C20.7956 9 21.5587 9.31607 22.1213 9.87868C22.6839 10.4413 23 11.2044 23 12C23 12.7956 22.6839 13.5587 22.1213 14.1213C21.5587 14.6839 20.7956 15 20 15C18.69 15 17.58 14.17 17.17 13L5 13V16L1 12Z" fill="currentColor"/>
                        </svg>

                        <div class="aso-font-semibold aso-text-[16px]">Back</div>
                    </button>
                </div>
                <div class="aso-bg-[#016464] aso-rounded" v-if="isEdit">
                    <button @click="updateFont" :class="`aso-rounded aso-flex ${!isLoading ? 'aso-bg-amber-400 ' :'aso-bg-amber-500'} aso-w-fit aso-space-x-2 aso-h-fit aso-px-8 aso-text-white aso-p-2 aso-border-none aso-opacity-90 hover:aso-border-none hover:aso-text-white hover:aso-opacity-100 aso-cursor-pointer`">
                        <img src="../../../../assets/icons/ic_loading_gray.svg" class="aso-w-5 aso-w-5" v-if="isLoading" :disabled="isLoading"/>
                        <div class="aso-font-semibold aso-text-[16px]">Update</div>
                    </button>
                </div>
                <div class="aso-bg-[#016464] aso-rounded" v-if="!isEdit">
                    <button @click="addNewFont" class="aso-flex aso-bg-transparent aso-w-fit aso-space-x-2 aso-h-fit aso-text-white aso-px-12 aso-p-2.5 aso-rounded aso-border-none aso-opacity-90 hover:aso-opacity-100 hover:aso-border-none hover:aso-text-white hover:aso-bg-[#016464] aso-cursor-pointer">
                        <img src="../../../../assets/icons/ic_loading_gray.svg" class="aso-w-5 aso-w-5" v-if="isLoading" :disabled="isLoading"/>
                        <div class="aso-font-semibold aso-text-[16px]">Save</div>
                    </button>
                </div>
            </div>
            
        </div>
        <!-- Delete Modal-->
        <div v-if="openModal" @click.self="closeModal" class="aso-bg-gray-400 aso-overflow-y-auto aso-overflow-x-hidden aso-fixed aso-top-0 aso-right-[25%] aso-left-[75%] aso-z-[999] aso-flex aso-justify-center aso-items-center aso-w-full md:aso-inset-0 aso-h-[calc(100%-1rem)] aso-h-[100vh]">
            <div class="aso-relative aso-p-4 aso-w-full aso-max-w-md aso-max-h-full">
                <div class="aso-relative aso-bg-white aso-rounded-lg aso-shadow dark:bg-gray-700">
                    <button @click.stop="closeModal" type="button" :class="`${isLoading ? 'aso-cursor-not-allowed' : 'aso-cursor-pointer'} aso-absolute aso-top-3 aso-end-2.5 aso-text-gray-400 aso-bg-transparent hover:bg-gray-200 hover:text-gray-900 aso-rounded-lg aso-text-sm aso-w-8 aso-h-8 aso-ms-auto aso-inline-flex aso-justify-center aso-items-center dark:hover:bg-gray-600 dark:hover:text-white`" data-modal-hide="popup-modal">
                        <svg class="aso-w-3 aso-h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                        <span class="aso-sr-only">Close modal</span>
                    </button>
                    <div class="aso-p-4 md:p-5 aso-text-center">
                        <svg class="aso-mx-auto aso-mb-4 aso-text-gray-400 aso-w-12 aso-h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                        </svg>
                        <h3 class="aso-mb-5 aso-text-lg aso-font-normal aso-text-gray-500 dark:text-gray-400">Are you sure you want to delete this font?</h3>
                        <input v-model="font.label" readonly class="aso-rounded aso-w-full aso-h-[35px] aso-text-center aso-p-4 aso-my-2 aso-border-none" />
                        <button @click="deleteFont" data-modal-hide="popup-modal" type="button" :class="`aso-border-solid aso-text-white ${!isLoading ? 'aso-bg-red-600 aso-cursor-pointer' :'aso-bg-red-700 aso-cursor-not-allowed'} hover:bg-red-800 focus:ring-4 focus:outline-none aso-my-2 aso-border-none  focus:ring-red-300 dark:focus:ring-red-800 aso-font-medium aso-rounded-lg aso-text-sm aso-inline-flex aso-items-center aso-px-5 aso-py-2.5 aso-text-center`">
                            <img src="../../../../assets/icons/ic_loading_gray.svg" class="aso-w-5 aso-w-5" v-if="isLoading" :disabled="isLoading"/>
                            Yes, I'm sure
                        </button>
                        <button @click.stop="closeModal" data-modal-hide="popup-modal" type="button" :class="`aso-border-solid aso-py-2.5 aso-px-5 aso-ms-3 aso-text-sm aso-font-medium aso-text-gray-900 aso-my-2  aso-border-gray-500 aso-border-white focus:outline-none aso-bg-white aso-rounded-lg aso-border aso-border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 ${isLoading ? 'aso-cursor-not-allowed' : 'aso-cursor-pointer'}`">No, cancel</button>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
  </template>
  
  <script setup>
    import Multiselect from '@vueform/multiselect'
    import api from "@/admin/Api/api";
    import { onMounted, ref } from "vue";
    import toastMessage from '@/admin/utils/functions';

    const openModal = ref(false);
    const listFont = ref(true);
    const createFont = ref(false);
    const fonts = ref([]);
    const noFontsFound = ref('');
    const isFetching = ref(false);
    const allGoogleFonts = ref([]);
    const selectedGoogleFont = ref({});
    const emptyFontLabel = ref(false)
    const isEdit = ref(false);
    const isLoading = ref(false);
    const fontId = ref(null)
    const font = ref({
        label:"",
        url:"",
        isGoogleFont:true
    })

    onMounted( async()=>{
        isFetching.value = true;
        await fetchFonts();
        await getGoogleFonts();
        isFetching.value = false;
    });
    const fetchFonts = async () => {
        const result = await api.getManagefonts();
        if(!result.message) {
            fonts.value = result
        }else{
            fonts.value = [];
            noFontsFound.value = result.message;
        }
    }
    const getGoogleFonts = async () => {
        const data = await api.getGoogleFonts();
        allGoogleFonts.value = data.map(item => {
            return {
                name: item.family,
                value: Object.keys(item.files).map(key => {
                    return {
                        name: key,
                        value: item.files[key],
                        label:item.family
                    }
                })
            }
        });
    }

    const uploadFontFile = (e) => { 
        e.preventDefault();
        var uploader = wp.media(
            {
                title: 'Please set the tff fonts file',
                button: {
                    text: "Select font"
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
                        if(isFontType(attachment.url)){
                            font.value.label =attachment.name;
                            font.value.url=attachment.url;
                        }
                    }
                );
            }
        )
        .open();
    }

    const closeModal = () => {
        openModal.value = !openModal.value;
    }
    const addNewFont = async () => {
        isLoading.value = true;
        if(font.value.label.trim() == ''){
            emptyFontLabel.value = true;
            isLoading.value = false;
            toastMessage("Label must not be empty","warning");
        }else{
            emptyFontLabel.value = false;
            const result = await api.addManagefont({many:false,font:font.value});
            if(result.success){
                await fetchFonts();
                isLoading.value = false;
                createFont.value = false;
                toastMessage(result.message);
                font.value = {
                    label:"",
                    url:"",
                    isGoogleFont:true
                }
            }else{
                isLoading.value = false;
                createFont.value = false;
                font.value = {
                    label:"",
                    url:"",
                    isGoogleFont:true
                }
                toastMessage(result.message,"error");
            }
        }
    }

    const selectedFont = (key, ft,isdelete=false) =>{
        fontId.value = key;
        font.value = ft;
        if(!isdelete){
            isEdit.value = true;
            addFont();
        }else{
            closeModal();
        }
        
    }

    const deleteFont = async () => {
        isLoading.value=true;
        const result = await api.deleteManagefont(fontId.value);
        if(result.success){
            await fetchFonts();
            isLoading.value = false;
            closeModal();
            toastMessage(result.message);
            isEdit.value = false;
            createFont.value = false;
            font.value = {
                label:"",
                url:"",
                isGoogleFont:true
            }
        }else{
            isLoading.value = false;
            closeModal();
            toastMessage(result.message,"error")
            createFont.value = false;
            font.value = {
                label:"",
                url:"",
                isGoogleFont:true
            }
        }
    }

    const updateFont = async () => {
        isLoading.value = true;
        if(font.value.label.trim() == ''){
            emptyFontLabel.value = true;
            isLoading.value = false;
            toastMessage("Label must not be empty","warning");
        }else{
            emptyFontLabel.value = false;
            const result = await api.updateManagefont(fontId.value,font.value);
            if(result.success){
                await fetchFonts(); isEdit.value = false;
                isLoading.value = false;
                createFont.value = false;
                isEdit.value = false;
                fontId.value = null;
                if(result.success == true){
                    toastMessage(result.message);
                }else{
                    toastMessage(result.message,"warning")
                }
                
                font.value = {
                    label:"",
                    url:"",
                    isGoogleFont:true
                }
               
            }else{
                isLoading.value = false;
                createFont.value = false;
                isEdit.value = false;
                fontId.value = null;
                toastMessage(result.message,"error")
                font.value = {
                    label:"",
                    url:"",
                    isGoogleFont:true
                }

            }
        }
    }

    const isFontType = (url) => {
        const fontsType = ['ttf', 'otf', 'woff', 'woff2'];
        const extension = url.split('.').pop().toLowerCase();
        return fontsType.includes(extension);
    }

    const addFont = () => {
        listFont.value = (false);
        createFont.value = (true);
    }
    const back = () => {
        isEdit.value = false;
        fontId.value = null;
        createFont.value = (false);
    }

    const isCheckbox = ref(true);

  </script>
   