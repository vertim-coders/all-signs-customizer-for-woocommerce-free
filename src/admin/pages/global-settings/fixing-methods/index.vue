<template>
    <div>
        <div class="asowp-space-y-4 asowp-py-6" v-if="!isNewFixingMethod">
            <div class="asowp-bg-[#fff] asowp-flex asowp-flex-col asowp-space-y-3 asowp-px-3 asowp-py-8 asowp-border-solid asowp-border-2 asowp-border-[#D1D1D1] asowp-rounded-[10px]">
                <div class="asowp-sticky asowp-z-[998] asowp-top-[105px] asowp-bg-[#F8F9FB] asowp-text-[14px] asowp-font-bold asowp-px-4 asowp-py-4">
                    List of Fixing methods
                </div>   
                <div class="asowp-relative" id="monTableau">
                <table class="asowp-text-center asowp-w-full asowp-border asowp-border-collapse asowp-border-0">
                    <thead class="asowp-bg-[#f0f0f1] asowp-sticky asowp-z-[998] asowp-w-full asowp-top-[150px]">
                        <tr class="">
                            <!--<th scope="col" class="asowp-px-6 asowp-py-3 asowp-text-[14px] asowp-font-semibold">
                                ID
                            </th>-->
                            <th scope="col" class="asowp-px-6 asowp-text-left asowp-py-3 asowp-text-[14px] asowp-font-semibold">
                                Title
                            </th>
                            <th scope="col" class="asowp-px-6 asowp-py-3 asowp-text-[14px] asowp-font-semibold">
                                Description
                            </th>
                            <th scope="col" class="asowp-px-6 asowp-py-3 asowp-text-[14px] asowp-font-semibold">
                                Icons
                            </th>
                            <th scope="col" class="asowp-px-6 asowp-py-3 asowp-text-[14px] asowp-font-semibold">
                                Action
                            </th>
                            
                        </tr>
                    </thead>
                    <tbody class="asowp-bg-white">
                        <tr v-if="isFetching">
                            <td colspan="6">
                                <div class="asowp-bg-white asowp-border-solid asowp-border asowp-border-[#D1D1D1] asowp-flex asowp-flex-col asowp-space-y-2 asowp-justify-center asowp-items-center asowp-w-full asowp-h-[200px] p-4">
                                    <img class="asowp-w-[100px] asowp-h-[100px]" src="../../../../../assets/icons/ic_loading.svg" alt="">
                                </div>
                            </td>
                        </tr>
                        <tr v-for="(fixingMethod, key) in fixingMethods" :key="key" class="asowp-border-t-0 asowp-border-l-0 asowp-border-r-0 asowp-border-b-2 asowp-border-solid asowp-border-[#f0f0f1]">
                            
                            <!--<td>
                                {{ key }}
                            </td>-->
                            <td class="asowp-px-6 asowp-py-2 asowp-flex asowp-justify-left asowp-space-x-2">
                                
                                <span class="asowp-py-1 asowp-text-[14px]">
                                    {{fixingMethod.name}}
                                </span>
                            </td>
                            <td class="asowp-px-6 asowp-py-2 asowp-w-[30%] asowp-text-center asowp-text-[11px]">
                                {{fixingMethod.description}}
                            </td>
                            <td class="asowp-px-6 asowp-justify-center asowp-translate-y-1">
                                <img :src="fixingMethod.icon" class="asowp-w-8 asowp-h-8" v-if="fixingMethod.icon != ''"/>
                            </td>
                            <td class="asowp-px-6 asowp-py-2 asowp-flex asowp-justify-center asowp-space-x-2 asowp-translate-y-2">
                                
                                <button class="asowp-bg-transparent asowp-border-none asowp-text-[#2DD05B] asowp-cursor-pointer" @click="selectFixingMethod(key,fixingMethod)">
                                    <img class="asowp-w-5 asowp-h-5" src="../../../../../assets/icons/ic_edit.svg" alt="">
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            </div>
        </div>
        <div class="asowp-space-y-4 asowp-translate-y-6 asowp-bg-[#fff] asowp-flex asowp-flex-col asowp-space-y-3 asowp-px-4 asowp-py-8 asowp-border-solid asowp-border-2 asowp-border-[#D1D1D1] asowp-rounded-[10px]" v-if="isNewFixingMethod">
            <div class="asowp-text-[16px] asowp-font-bold">
                {{isEdit ? 'Edit Fixing Methods' :'Add new Fixing Method'}}
            </div>
            <hr class="Polaris-Divider asowp-w-full" style="border: 1px solid #ebebeb;">
            <div class="asowp-px-2 asowp-pb-3 asowp-space-y-4">
                <h3 class="asowp-text-[16px]">Edit border</h3>
                <div class="asowp-flex asowp-space-x-2 asowp-justify-between">
                    <div class="asowp-flex asowp-flex-col asowp-w-[50%] asowp-space-y-3">
                        <label class="asowp-text-[12px] asowp-text-[#444444]">Label</label>
                        <input type="text" v-model="fixingMethod.name" class="asowp-w-full asowp-h-[35px]" style="border-radius: 10px;"/>
                    </div>
                    <div class="asowp-w-[50%] asowp-space-y-3 asowp-flex asowp-flex-col asowp-text-[12px]">
                        <label class="asowp-text-[12px] asowp-text-[#444444]">Description</label>
                        <input type="text" v-model="fixingMethod.description" class="asowp-w-full asowp-h-[35px]" style="border-radius: 10px;"/>
                    </div>
                </div>
                <div class="asowp-flex asowp-space-x-2 asowp-justify-between">
                    <div class="asowp-flex asowp-flex-col asowp-w-[50%] asowp-space-y-3">
                        <label class="asowp-text-[12px] asowp-text-[#444444]">Upload icon</label>
                        <div class="asowp-flex asowp-flex-col asowp-space-y-2 asowp-w-full asowp-pt-2 asowp-w-full">
                            <div class="asowp-flex asowp-space-x-2 asowp-justify-between asowp-border asowp-border-1 asowp-border-[#000] asowp-border-solid asowp-rounded-[5px] asowp-p-1">
                                <button @click="selectFixingMethodIcon" class="asowp-bg-[#016464] asowp-border-none asowp-w-fit asowp-h-fit asowp-p-2 asowp-rounded asowp-px-4 asowp-text-white asowp-opacity-90 hover:asowp-opacity-100 asowp-text-[10px] asowp-cursor-pointer">upload Icon</button>
                                <div :class="`asowp-relative asowp-w-[82px] asowp-h-[30px] asowp-rounded-md asowp-overflow-hidden`">
                                    <img v-if="fixingMethod.icon != ''" :src="fixingMethod.icon" alt="" class="asowp-absolute asowp-w-full asowp-h-full">
                                    <button v-if="fixingMethod.icon != ''" @click="()=>{fixingMethod.icon = ''}" :class="`asowp-bg-[#016464] asowp-absolute asowp-bottom-0 asowp-right-0 asowp-text-white asowp-p-1 asowp-rounded-tl-lg asowp-border-none`">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="asowp-w-4 asowp-h-4">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!--<div class="asowp-w-[50%] asowp-space-y-2 asowp-flex asowp-flex-col asowp-text-[12px]">
                        <label class="asowp-text-[12px] asowp-text-[#444444]">PopupImg</label>
                        <div class="asowp-flex asowp-flex-col asowp-space-y-2 asowp-w-full asowp-pt-2 asowp-w-1/2">
                            <div class="asowp-flex asowp-space-x-2">
                                <button @click="closeTnymceModal" class="asowp-bg-[#016464] asowp-border-none asowp-w-fit asowp-h-fit asowp-p-4 asowp-rounded asowp-px-4 asowp-text-white asowp-opacity-90 hover:asowp-opacity-100 asowp-text-[10px] asowp-cursor-pointer">Pop For Example</button>
                            </div>
                        </div>
                    </div>-->
                </div>
                <hr class="Polaris-Divider" style="border: 1px solid #ebebeb;">
                <div class="asowp-flex asowp-font-bold asowp-space-x-4 asowp-px-4 asowp-py-4 asowp-justify-end asowp-items-end">
                    <div class="asowp-bg-[#016464] asowp-rounded">
                        <button :disabled="isLoading" class="asowp-flex asowp-bg-transparent asowp-w-fit asowp-space-x-2 asowp-h-fit asowp-px-8 asowp-p-2 asowp-border-none asowp-text-white asowp-opacity-90 hover:asowp-border-none hover:asowp-text-white hover:asowp-opacity-100 asowp-cursor-pointer" @click="back">
                            <svg class="asowp-w-6 asowp-h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 12L5 8V11L17.17 11C17.3756 10.414 17.7586 9.90661 18.2657 9.54821C18.7729 9.18981 19.379 8.9982 20 9C20.7956 9 21.5587 9.31607 22.1213 9.87868C22.6839 10.4413 23 11.2044 23 12C23 12.7956 22.6839 13.5587 22.1213 14.1213C21.5587 14.6839 20.7956 15 20 15C18.69 15 17.58 14.17 17.17 13L5 13V16L1 12Z" fill="currentColor"/>
                            </svg>

                            <div class="asowp-font-semibold asowp-text-[16px]">Back</div>
                        </button>
                    </div>
                    <div class="asowp-bg-[#016464] asowp-rounded" v-if="!isEdit">
                        <button @click="updateFixingMethod" class="asowp-flex asowp-bg-transparent asowp-w-fit asowp-space-x-2 asowp-h-fit asowp-text-white  asowp-px-12 asowp-p-2.5 asowp-border-none asowp-opacity-90 hover:asowp-border-none hover:asowp-text-white hover:asowp-opacity-100 asowp-cursor-pointer">
                            <div class="asowp-translate-y-1">
                                <img src="../../../../../assets/icons/ic_loading_gray.svg" class="asowp-w-5 asowp-w-5" v-if="isLoading" :disabled="isLoading"/>
                                <svg v-if="!isLoading" class="asowp-w-4 asowp-h-4" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2.5 1.25C2.16848 1.25 1.85054 1.3817 1.61612 1.61612C1.3817 1.85054 1.25 2.16848 1.25 2.5V17.5C1.25 17.8315 1.3817 18.1495 1.61612 18.3839C1.85054 18.6183 2.16848 18.75 2.5 18.75H17.5C17.8315 18.75 18.1495 18.6183 18.3839 18.3839C18.6183 18.1495 18.75 17.8315 18.75 17.5V2.5C18.75 2.16848 18.6183 1.85054 18.3839 1.61612C18.1495 1.3817 17.8315 1.25 17.5 1.25H11.875C11.5435 1.25 11.2255 1.3817 10.9911 1.61612C10.7567 1.85054 10.625 2.16848 10.625 2.5V11.6163L13.9325 8.3075C14.0499 8.19014 14.209 8.12421 14.375 8.12421C14.541 8.12421 14.7001 8.19014 14.8175 8.3075C14.9349 8.42486 15.0008 8.58403 15.0008 8.75C15.0008 8.91597 14.9349 9.07514 14.8175 9.1925L10.4425 13.5675C10.3844 13.6257 10.3155 13.6719 10.2395 13.7034C10.1636 13.7349 10.0822 13.7511 10 13.7511C9.91779 13.7511 9.83639 13.7349 9.76046 13.7034C9.68453 13.6719 9.61556 13.6257 9.5575 13.5675L5.1825 9.1925C5.12439 9.13439 5.07829 9.0654 5.04685 8.98948C5.0154 8.91356 4.99921 8.83218 4.99921 8.75C4.99921 8.66782 5.0154 8.58644 5.04685 8.51052C5.07829 8.4346 5.12439 8.36561 5.1825 8.3075C5.24061 8.24939 5.3096 8.20329 5.38552 8.17185C5.46144 8.1404 5.54282 8.12421 5.625 8.12421C5.70718 8.12421 5.78856 8.1404 5.86448 8.17185C5.9404 8.20329 6.00939 8.24939 6.0675 8.3075L9.375 11.6163V2.5C9.375 1.83696 9.63839 1.20107 10.1072 0.732233C10.5761 0.263392 11.212 0 11.875 0L17.5 0C18.163 0 18.7989 0.263392 19.2678 0.732233C19.7366 1.20107 20 1.83696 20 2.5V17.5C20 18.163 19.7366 18.7989 19.2678 19.2678C18.7989 19.7366 18.163 20 17.5 20H2.5C1.83696 20 1.20107 19.7366 0.732233 19.2678C0.263392 18.7989 0 18.163 0 17.5V2.5C0 1.83696 0.263392 1.20107 0.732233 0.732233C1.20107 0.263392 1.83696 0 2.5 0L5.625 0C5.79076 0 5.94973 0.065848 6.06694 0.183058C6.18415 0.300269 6.25 0.45924 6.25 0.625C6.25 0.79076 6.18415 0.949732 6.06694 1.06694C5.94973 1.18415 5.79076 1.25 5.625 1.25H2.5Z" fill="white"/>
                                </svg>
                            </div>
                            <span class="asowp-font-semibold asowp-text-[16px]">Save</span>
                        </button>
                    </div>
            </div>
            </div>
        </div>
    </div>
    <div v-show="openTnyMce" @click.self="closeTnymceModal" class="asowp-z-[998] asowp-bg-gray-400 asowp-overflow-y-auto asowp-overflow-x-hidden asowp-fixed asowp-top-0 asowp-right-[25%] asowp-left-[75%]  asowp-flex asowp-justify-center asowp-items-center asowp-w-full md:asowp-inset-0 asowp-h-full">
        <div class="asowp-relative asowp-top-[50px] asowp-p-4 asowp-w-full asowp-max-w-[60%] asowp-max-h-fit">
            <div class="asowp-relative asowp-bg-white asowp-rounded-lg asowp-shadow dark:bg-gray-700 asowp-px-4">
                <div class="asowp-px-[10px] asowp-pt-[5px]">
                    <!-- <Editor
                        api-key="02v0ot513pkt9cwnhg3l36u9l13l91z8ux5oyf24nnqlp12j"
                        :init="{
                            toolbar_mode: 'sliding',
                            plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate mentions tableofcontents footnotes mergetags autocorrect typography inlinecss markdown',
                            toolbar: 'undo redo | blocks fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                            ai_request: (request, respondWith) => respondWith.string(() => Promise.reject('See docs to implement AI Assistant')),
                        }"
                        v-model="fixingMethod.popImg"
                    /> -->
                    <textarea name="" id="asowp-admin-tinymce" cols="30" rows="10"></textarea>
                </div>
                <div class="asowp-p-4 md:p-5 asowp-text-center">
                    <button @click="savePopImg" data-modal-hide="popup-modal" type="button" :class="`asowp-border-solid asowp-text-white ${!isLoading ? 'asowp-bg-[#016464] asowp-cursor-pointer' :'asowp-bg-[#016464] asowp-cursor-not-allowed'} hover:asowp-bg-[#016464] focus:ring-4 focus:outline-none asowp-my-2 asowp-border-none  focus:ring-red-300 dark:focus:ring-red-800 asowp-font-medium asowp-rounded-lg asowp-text-sm asowp-inline-flex asowp-items-center asowp-px-5 asowp-py-2.5 asowp-text-center`">
                        <img src="../../../../../assets/icons/ic_loading_gray.svg" class="asowp-w-5 asowp-w-5" v-if="isLoading" :disabled="isLoading"/>
                        Save
                    </button>
                    <button @click.stop="closeTnymceModal" data-modal-hide="popup-modal" type="button" :class="`asowp-border-solid asowp-py-2.5 asowp-px-5 asowp-ms-3 asowp-text-sm asowp-font-medium asowp-text-gray-900 asowp-my-2  asowp-border-gray-500 asowp-border-white focus:outline-none asowp-bg-white asowp-rounded-lg asowp-border asowp-border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 ${isLoading ? 'asowp-cursor-not-allowed' : 'asowp-cursor-pointer'}`">No, cancel</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import api from "@/admin/Api/api";
import toastMessage from '@/admin/utils/functions';
//import Editor from '@tinymce/tinymce-vue'

//const tinymceSrc = asowp_data.assets_url+'/utilities/asowp-tinymce.js';
const isFetching = ref(false);
const isLoading = ref(false);
const isEdit = ref(false);
const fixingMethodId = ref(null);
const fixingMethods = ref([]);
const fixingMethod = ref({
    name : "",
    description:"",
    icon : '',
    popImg: "",
    type : ''
});
const openTnyMce = ref(false);
onMounted(async ()=>{
    tinymce.init({
        selector: '#asowp-admin-tinymce',
        plugins: 'wordpress paste link image media',
        toolbar: 'undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image media | code| wp_adv',
        relative_urls: false,
        remove_script_host: false,
        convert_urls: true,
        height: 200,
        width: '100%',
        branding: false,
        setup: function(editor) {
            editor.on('init', function() {
                //console.log('TinyMCE initialized.');
            });
        }
    });
    isFetching.value = true;
    await fetchFixingMethods();
    isFetching.value = false;
    /* tinymce.init({
        selector: '#asowp-admin-tinymce',
        plugins: [
            'link image',
            'media paste'
        ],
        toolbar: 'undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image media | code',
        menubar: 'file edit insert format table',
        relative_urls: false,
        remove_script_host: false,
        convert_urls: true,
        height: 200,
        width: '100%',
        branding: false
    }); */
});


const fetchFixingMethods = async () => {
    const result = await api.getGlobalFixingMethods();
    if(!result.message){
        fixingMethods.value = result;
    }
};

    
const isNewFixingMethod = ref(false);

const selectFixingMethod = (id,fx) =>{
    fixingMethodId.value = id;
    fixingMethod.value = fx;
    tinymce.activeEditor.setContent(fx.popImg);
    addNewFixingMethod();
}
const addNewFixingMethod = () => {
    isNewFixingMethod.value = !isNewFixingMethod.value;
}

    

const updateFixingMethod = async () => {
    isLoading.value = true;

    const result = await api.updateFixingMethodInGlobalFixingMethods(fixingMethodId.value,fixingMethod.value);
    if(result.success){
        await fetchFixingMethods();
        if(result.success == true ) {
            toastMessage(result.message);
        }else{
            toastMessage(result.message,"warning");
        }
        fixingMethodId.value = null;
        isLoading.value = false;
        isNewFixingMethod.value = false;
        fixingMethod.value = {};
    }else{
        fixingMethodId.value = null;
        isLoading.value = false;
        toastMessage(result.message,"error");
        isNewFixingMethod.value = false;
        fixingMethod.value = {};
    }
};
const selectFixingMethodIcon = async(e) => { 
    e.preventDefault();
    var uploader = wp.media(
        {
            title: "Select Fixing Method icon",
            button: {
                text: "Select Icon"
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
                            fixingMethod.value.icon = (attachment.url);
                        }
                    }
                );
            }
        )
        .open();
}
/* const selectFixingMethodImage = async(e) => { 
    e.preventDefault();
    var uploader = wp.media(
        {
            title: "Select Fixing Method image",
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
                            fixingMethod.value.popImg = (attachment.url);
                        }
                    }
                );
            }
        )
        .open();
} */
const closeTnymceModal = ()=>{
    openTnyMce.value = !openTnyMce.value;
}

const savePopImg = ()=>{
    fixingMethod.value.popImg = tinymce.activeEditor.getContent();
    openTnyMce.value = false;
}
const back = () => {
    isNewFixingMethod.value = false;
    fixingMethodId.value = null;
    fixingMethod.value = {
        name : "",
        description:"",
        icon : '',
        popImg: "",
        type : ''
    };
}
    
</script>