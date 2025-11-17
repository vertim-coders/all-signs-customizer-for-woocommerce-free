<template>
    <div>
<<<<<<< HEAD
        <div class="asowp-space-y-4 asowp-py-6" v-if="!isNewShapes">
            <div class="asowp-bg-white asowp-border-solid asowp-border-2 asowp-rounded-[10px] asowp-p-2 asowp-border-[#D1D1D1]">
                <div class="asowp-bg-[#F8F9FB] asowp-text-[14px] asowp-font-bold asowp-px-4 asowp-py-4">
=======
        <div class="asowp-space-y-4 asowp-py-10" v-if="!isNewShapes">
            <div>
                <div class="asowp-bg-[#F8F9FB] asowp-text-[14px] asowp-font-bold asowp-px-4 asowp-py-4 asowp-border-solid asowp-border-[1px] asowp-border-[#DDDDDD]">
>>>>>>> 5550fb22cb3f0a2454b4bdd690703964730bfc18
                    List of shapes
                </div>   
                <div class="asowp-relative" id="monTableau" >
                    <table class="asowp-text-center asowp-w-full asowp-border asowp-border-collapse asowp-border-0">
                        <thead class="asowp-bg-[#f0f0f1]">
                            <tr class="">
<<<<<<< HEAD
                                <!--<th scope="col" class="asowp-px-6 asowp-py-3 asowp-text-[14px] asowp-font-semibold">
                                    ID
                                </th>-->
                                <th scope="col" class="asowp-text-left asowp-px-6 asowp-py-3 asowp-text-[14px] asowp-font-semibold">
=======
                                <th scope="col" class="asowp-px-6 asowp-py-3 asowp-text-[14px] asowp-font-semibold">
                                    ID
                                </th>
                                <th scope="col" class="asowp-px-6 asowp-py-3 asowp-text-[14px] asowp-font-semibold">
>>>>>>> 5550fb22cb3f0a2454b4bdd690703964730bfc18
                                    Title
                                </th>
                                <th scope="col" class="asowp-px-6 asowp-py-3 asowp-text-[14px] asowp-font-semibold">
                                    Icon
                                </th>
                                <th scope="col" class="asowp-px-6 asowp-py-3 asowp-text-[14px] asowp-font-semibold">
                                    Action
                                </th>
                                
                            </tr>
                        </thead>
                        <tbody class="asowp-bg-white" >
                            <tr v-if="isFetching">
                                <td colspan="6">
                                    <div class="asowp-bg-white asowp-border-solid asowp-border asowp-border-[#D1D1D1] asowp-flex asowp-flex-col asowp-space-y-2 asowp-justify-center asowp-items-center asowp-w-full asowp-h-[200px] p-4">
                                        <img class="asowp-w-[100px] asowp-h-[100px]" src="../../../../../assets/icons/ic_loading.svg" alt="">
                                    </div>
                                </td>
                            </tr>
                            <tr  v-for="shape, key in manageShapes" :key=key class="asowp-border-t-0 asowp-border-l-0 asowp-border-r-0 asowp-border-b-2 asowp-border-solid asowp-border-[#f0f0f1]">
<<<<<<< HEAD
                                <!--<td>
                                    {{key}}
                                </td>-->
                                <td class="asowp-px-6 asowp-text-[14px] asowp-py-2 asowp-text-left asowp-space-x-2">
=======
                                <td>
                                    {{key}}
                                </td>
                                <td class="asowp-px-6 asowp-text-[14px] asowp-py-2 asowp-text-center asowp-space-x-2">
>>>>>>> 5550fb22cb3f0a2454b4bdd690703964730bfc18
                                    {{shape.name}}
                                </td>
                                <td class="asowp-px-6 asowp-py-2 asowp-text-center asowp-text-[11px]">
                                    <img :src="shape.icon" class="asowp-w-6 asowp-h-6" v-if="shape.icon != ''"/>
                                </td>
                                <td class="asowp-px-6 asowp-py-2 asowp-text-center asowp-space-x-2">
                                    <button class="asowp-bg-transparent asowp-border-none asowp-text-[#2DD05B] asowp-cursor-pointer" @click="selectShapes(key,shape)">
                                        <img class="asowp-w-5 asowp-h-5" src="../../../../../assets/icons/ic_edit.svg" alt="">
                                    </button>
                                    
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
<<<<<<< HEAD
        <div class="asowp-translate-y-5 asowp-bg-white asowp-border-solid asowp-border-2 asowp-rounded-[10px] asowp-p-2 asowp-border-[#D1D1D1]" v-if="isNewShapes">
            <div class="asowp-text-[16px] asowp-font-bold asowp-px-4 asowp-py-4">
                {{isEdit ? 'Edit Shapes' :'Add new shape'}}
            </div>
            <hr class="Polaris-Divider" style="border: 1px solid #ebebeb;">
               
            <div class="asowp-flex asowp-space-x-4 asowp-px-4 asowp-py-8">
                <div class="asowp-flex asowp-flex-col asowp-w-[50%] asowp-space-y-3">
                    <label class="asowp-text-[12px] asowp-text-[#444444]">Label</label>
                    <input type="text" v-model="shape.name" class="asowp-w-full asowp-h-[35px]" style="border-radius: 10px !important;"/>
                </div>
                <div class="asowp-w-[50%] asowp-space-y-2 asowp-flex asowp-flex-col asowp-text-[12px]">
                    <label class="asowp-text-[12px] asowp-text-[#444444]">Upload Icon</label>
                    <div class="asowp-flex asowp-flex-col asowp-space-y-2 asowp-w-full">
                        <div class="asowp-flex asowp-space-x-2 asowp-justify-between asowp-p-1 asowp-border asowp-border-solid asowp-border-[#000] asowp-rounded-[5px]">
                            <button @click="selectShapeIcon" class="asowp-bg-[#016464] asowp-border-none asowp-w-fit asowp-h-fit asowp-p-1 asowp-rounded asowp-px-4 asowp-text-white asowp-opacity-90 hover:asowp-opacity-100 asowp-text-[10px] asowp-cursor-pointer">
                                <svg class="asowp-w-4 asowp-h-4" viewBox="0 0 23 21" fill="none" xmlns="http://www.w3.org/2000/svg">        
                                    <path d="M22.4375 12.2809V18.5309C22.4375 18.9453 22.2729 19.3427 21.9799 19.6357C21.6868 19.9288 21.2894 20.0934 20.875 20.0934H2.125C1.7106 20.0934 1.31317 19.9288 1.02015 19.6357C0.72712 19.3427 0.5625 18.9453 0.5625 18.5309V12.2809C0.5625 11.8665 0.72712 11.4691 1.02015 11.176C1.31317 10.883 1.7106 10.7184 2.125 10.7184H6.8125C7.0197 10.7184 7.21841 10.8007 7.36493 10.9472C7.51144 11.0937 7.59375 11.2924 7.59375 11.4996C7.59375 11.7068 7.51144 11.9056 7.36493 12.0521C7.21841 12.1986 7.0197 12.2809 6.8125 12.2809H2.125V18.5309H20.875V12.2809H16.1875C15.9803 12.2809 15.7816 12.1986 15.6351 12.0521C15.4886 11.9056 15.4062 11.7068 15.4062 11.4996C15.4062 11.2924 15.4886 11.0937 15.6351 10.9472C15.7816 10.8007 15.9803 10.7184 16.1875 10.7184H20.875C21.2894 10.7184 21.6868 10.883 21.9799 11.176C22.2729 11.4691 22.4375 11.8665 22.4375 12.2809ZM7.36523 6.58362L10.7188 3.22913V11.4996C10.7188 11.7068 10.8011 11.9056 10.9476 12.0521C11.0941 12.1986 11.2928 12.2809 11.5 12.2809C11.7072 12.2809 11.9059 12.1986 12.0524 12.0521C12.1989 11.9056 12.2812 11.7068 12.2812 11.4996V3.22913L15.6348 6.58362C15.7814 6.73022 15.9802 6.81257 16.1875 6.81257C16.3948 6.81257 16.5936 6.73022 16.7402 6.58362C16.8868 6.43703 16.9692 6.2382 16.9692 6.03089C16.9692 5.82357 16.8868 5.62475 16.7402 5.47815L12.0527 0.790654C11.9802 0.718016 11.894 0.660392 11.7992 0.621076C11.7043 0.58176 11.6027 0.561523 11.5 0.561523C11.3973 0.561523 11.2957 0.58176 11.2008 0.621076C11.106 0.660392 11.0198 0.718016 10.9473 0.790654L6.25977 5.47815C6.11317 5.62475 6.03082 5.82357 6.03082 6.03089C6.03082 6.2382 6.11317 6.43703 6.25977 6.58362C6.40636 6.73022 6.60518 6.81257 6.8125 6.81257C7.01982 6.81257 7.21864 6.73022 7.36523 6.58362ZM18.5312 15.4059C18.5312 15.1741 18.4625 14.9475 18.3338 14.7548C18.205 14.5621 18.022 14.4119 17.8078 14.3232C17.5937 14.2345 17.3581 14.2113 17.1308 14.2565C16.9034 14.3017 16.6946 14.4134 16.5307 14.5772C16.3668 14.7411 16.2552 14.9499 16.21 15.1773C16.1648 15.4046 16.188 15.6402 16.2767 15.8543C16.3654 16.0685 16.5156 16.2515 16.7083 16.3803C16.901 16.509 17.1276 16.5778 17.3594 16.5778C17.6702 16.5778 17.9682 16.4543 18.188 16.2345C18.4078 16.0148 18.5312 15.7167 18.5312 15.4059Z" fill="white"/>        
                                </svg>
                                upload Icon
                            </button>
                            <div :class="`asowp-relative asowp-w-[82px] asowp-h-[30px] asowp-rounded-md asowp-overflow-hidden`">
=======
        <div class="" v-if="isNewShapes">
            <div class="asowp-text-[16px] asowp-font-bold asowp-px-4 asowp-py-4 asowp-bg-[#F8F9FB]">
                {{isEdit ? 'Edit Shapes' :'Add new shape'}}
            </div>
            <div class="asowp-bg-[#F8F9FB] asowp-flex asowp-justify-between asowp-px-8 asowp-py-8">
                <div class="asowp-flex asowp-flex-col asowp-w-2/5 asowp-space-y-3">
                    <label class="asowp-text-[12px] asowp-text-[#444444]">Title</label>
                    <input type="text" v-model="shape.name" class="asowp-w-full"/>
                </div>
                <div class="asowp-w-2/5 asowp-space-y-2 asowp-flex asowp-flex-col asowp-text-[12px]">
                    <label class="asowp-text-[12px] asowp-text-[#444444]">Upload Icon</label>
                    <div class="asowp-flex asowp-flex-col asowp-space-y-2 asowp-w-full asowp-pt-2 asowp-w-1/2">
                        <div class="asowp-flex asowp-space-x-2">
                            <button @click="selectShapeIcon" class="asowp-bg-[#016464] asowp-border-none asowp-w-fit asowp-h-fit asowp-p-4 asowp-rounded asowp-px-4 asowp-text-white asowp-opacity-90 hover:asowp-opacity-100 asowp-text-[10px] asowp-cursor-pointer">upload Icon</button>
                            <div :class="`asowp-relative asowp-w-[82px] asowp-h-[49px] asowp-rounded-md asowp-overflow-hidden`">
>>>>>>> 5550fb22cb3f0a2454b4bdd690703964730bfc18
                                <img v-if="shape.icon != ''" :src="shape.icon" alt="" class="asowp-absolute asowp-w-full asowp-h-full">
                                <button v-if="shape.icon != ''" @click="()=>{shape.icon = ''}" :class="`asowp-bg-[#016464] asowp-absolute asowp-bottom-0 asowp-right-0 asowp-text-white asowp-p-1 asowp-rounded-tl-lg asowp-border-none`">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="asowp-w-4 asowp-h-4">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
<<<<<<< HEAD
            <hr class="Polaris-Divider" style="border: 1px solid #ebebeb;">
            <div class="asowp-flex asowp-font-bold asowp-space-x-4 asowp-px-4 asowp-py-4 asowp-justify-end asowp-items-end">
=======
            <div class="asowp-bg-[#F8F9FB] asowp-flex asowp-font-bold asowp-space-x-4 asowp-px-4 asowp-py-4 asowp-justify-end asowp-items-end">
>>>>>>> 5550fb22cb3f0a2454b4bdd690703964730bfc18
                <div class="asowp-bg-[#016464] asowp-rounded">
                    <button :disabled="isLoading" class="asowp-flex asowp-bg-transparent asowp-w-fit asowp-space-x-2 asowp-h-fit asowp-px-8 asowp-p-2 asowp-border-none asowp-text-white asowp-opacity-90 hover:asowp-border-none hover:asowp-text-white hover:asowp-opacity-100 asowp-cursor-pointer" @click="back">
                        <svg class="asowp-w-6 asowp-h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 12L5 8V11L17.17 11C17.3756 10.414 17.7586 9.90661 18.2657 9.54821C18.7729 9.18981 19.379 8.9982 20 9C20.7956 9 21.5587 9.31607 22.1213 9.87868C22.6839 10.4413 23 11.2044 23 12C23 12.7956 22.6839 13.5587 22.1213 14.1213C21.5587 14.6839 20.7956 15 20 15C18.69 15 17.58 14.17 17.17 13L5 13V16L1 12Z" fill="currentColor"/>
                        </svg>

                        <div class="asowp-font-semibold asowp-text-[16px]">Back</div>
                    </button>
                </div>
                <div class="asowp-bg-[#016464] asowp-rounded" v-if="!isEdit">
                    <button @click="updateShape" class="asowp-flex asowp-bg-transparent asowp-w-fit asowp-space-x-2 asowp-h-fit asowp-text-white  asowp-px-12 asowp-p-2.5 asowp-border-none asowp-opacity-90 hover:asowp-border-none hover:asowp-text-white hover:asowp-opacity-100 asowp-cursor-pointer">
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
</template>
<script setup>
import { ref, onMounted } from "vue";
import api from "@/admin/Api/api";
import toastMessage from '@/admin/utils/functions';


const isFetching = ref(false);
const isLoading = ref(false);
const isEdit = ref(false);
const shapeId = ref(null);
const manageShapes = ref([]);
const shape = ref({});
onMounted(async ()=>{
    isFetching.value = true;
    await fetchShapes();
    isFetching.value = false;
});

const fetchShapes = async () => {
    const result = await api.getGlobalShapes();
    if(!result.message){
        manageShapes.value = result;
    }
};
    
const isNewShapes = ref(false);

const selectShapes = (id,sh) =>{
    shapeId.value = id
    shape.value = sh
    addNewShape();
}
const addNewShape = () => {
    isNewShapes.value = !isNewShapes.value;
}
    

const updateShape = async () => {
    isLoading.value = true;

    const result = await api.updateShapeInGlobalShapes(shapeId.value,shape.value);
    if(result.success){
        await fetchShapes();
        if(result.success == true ) {
            toastMessage(result.message);
        }else{
            toastMessage(result.message,"warning");
        }
        shapeId.value = null;
        isLoading.value = false;
        isNewShapes.value = false;
        shape.value = {};
    }else{
        shapeId.value = null;
        isLoading.value = false;
        toastMessage(result.message,"error");
        isNewShapes.value = false;
        shape.value = {};
    }
};
const selectShapeIcon = async(e) => { 
    e.preventDefault();
    var uploader = wp.media(
        {
            title: "Select Shape icon",
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
                            shape.value.icon = (attachment.url);
                        }
                    }
                );
            }
        )
        .open();
}
const back = () => {
    isNewShapes.value = false;
    shapeId.value = null;
    shape.value = {};
}
    
</script>
