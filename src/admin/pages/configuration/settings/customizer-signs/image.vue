<template>
    <div>
        <div>
            <div class="aso-bg-[#F8F9FB] aso-px-8 aso-py-8 aso-space-y-6">
                
                <div class="aso-flex aso-space-x-3">
                    <div class="aso-text-[16px]">Enable upload Image</div>
                    <div class="aso-flex aso-items-center aso-translate-y-0.5">
                        <label for="aso-toggle" @click="handleEnableUploadImage" class="aso-cursor-pointer aso-bg-[#F8F8FF] aso-border-[1px] aso-border-solid aso-border-black aso-w-6 aso-h-0.5 aso-rounded-full aso-p-1">
                        <div :class="{'aso-translate-x-[100%]': image.enableUploadImage, 'aso-bg-active': image.enableUploadImage }" class="aso-toggle-dot aso-w-2.5 aso-h-2.5 -aso-translate-y-[8px] -aso-translate-x-2 aso-border-[4px] aso-border-solid aso-border-[#008000] aso-bg-white aso-rounded-full aso-shadow-md aso-transform"></div>
                        </label>
                    </div>
                </div>
                <div class="aso-flex aso-flex-col aso-space-y-4">
                    <span class="aso-text-[16px]">File upload script</span>
                    <span class="aso-text-[12px] aso-text-[#444444]">This option allows you to set which file upload script you would like to use</span>
                </div>
                <div class="aso-flex aso-space-x-3">
                    <span class="aso-text-[#444444] aso-text-[12px]">Normal</span>
                    <div class="aso-flex aso-items-center">
                        <label for="aso-toggle" @click="handleFileUploadScript" class="aso-cursor-pointer aso-bg-[#F8F8FF] aso-border-[1px] aso-border-solid aso-border-black aso-w-6 aso-h-0.5 aso-rounded-full aso-p-1">
                        <div :class="{'aso-translate-x-[100%]': image.fileUploadScript.customWithGraphical, 'aso-bg-active': image.fileUploadScript.customWithGraphical }" class="aso-toggle-dot aso-w-2.5 aso-h-2.5 -aso-translate-y-[8px] -aso-translate-x-2 aso-border-[4px] aso-border-solid aso-border-[#008000] aso-bg-white aso-rounded-full aso-shadow-md aso-transform"></div>
                        </label>
                    </div>
                    <span class="aso-text-[#444444] aso-text-[12px]">Custom with graphical enchacements</span>
                </div>
                <div>
                    <div class="aso-flex aso-justify-between aso-space-x-6 aso-space-y-2">
                        <div class="aso-flex aso-flex-col aso-w-2/5 aso-space-y-2">
                            <label class="aso-text-[12px] aso-text-[#444444]">Upload min width (px)</label>
                            <input type="number" v-model="image.fileUploadScript.uploadMinWidth" class="aso-w-full" @blur="()=>{ if(image.fileUploadScript.uploadMinWidth.trim() ==''){image.fileUploadScript.uploadMinWidth=100}}"/>
                        </div>
                        <div class="aso-flex aso-flex-col aso-w-2/5 aso-space-y-2">
                            <label class="aso-text-[12px] aso-text-[#444444]">Upload min height (px)</label>
                            <input type="number" v-model="image.fileUploadScript.uploadMinHeight" class="aso-w-full" @blur="()=>{ if(image.fileUploadScript.uploadMinHeight.trim()==''){image.fileUploadScript.uploadMinHeight = 100}}"/>
                        </div>
                    </div>
                    <div class="aso-flex aso-justify-between aso-space-x-6 aso-space-y-2">
                        <div class="aso-flex aso-flex-col aso-w-2/5 aso-space-y-2">
                            <label class="aso-text-[12px] aso-text-[#444444]">Upload Max width (px)</label>
                            <input type="number" v-model="image.fileUploadScript.uploadMaxWidth" class="aso-w-full" @blur="()=>{ if(image.fileUploadScript.uploadMaxWidth.trim()==''){image.fileUploadScript.uploadMaxWidth =1024}}"/>
                        </div>
                        <div class="aso-flex aso-flex-col aso-w-2/5 aso-space-y-2">
                            <label class="aso-text-[12px] aso-text-[#444444]">Upload Max height (px)</label>
                            <input type="number" v-model="image.fileUploadScript.uploadMaxHeight" class="aso-w-full" @blur="()=>{ if(image.fileUploadScript.uploadMaxHeight.trim()==''){image.fileUploadScript.uploadMaxHeight =1024}}"/>
                        </div>
                    </div>
                    <div class="aso-pt-2">
                        <Multiselect
                            v-model="image.fileUploadScript.allowedUploadsExtentions"
                            placeholder=""
                            :options="allowedUploadsExtentions"
                            label="name"
                            trackBy="name"
                            mode="tags"
                        /> 
                    </div>

                </div> 
                <div class="aso-space-y-3">
                    <div class="aso-flex aso-space-x-3">
                        <div class="aso-text-[16px]">Enable clipart</div>
                        <div class="aso-flex aso-items-center aso-translate-y-0.5">
                            <label for="aso-toggle" @click="handleEnableClipart" class="aso-cursor-pointer aso-bg-[#F8F8FF] aso-border-[1px] aso-border-solid aso-border-black aso-w-6 aso-h-0.5 aso-rounded-full aso-p-1">
                            <div :class="{'aso-translate-x-[100%]': image.enableClipart.active, 'aso-bg-active': image.enableClipart }" class="aso-toggle-dot aso-w-2.5 aso-h-2.5 -aso-translate-y-[8px] -aso-translate-x-2 aso-border-[4px] aso-border-solid aso-border-[#008000] aso-bg-white aso-rounded-full aso-shadow-md aso-transform"></div>
                            </label>
                        </div>
                    </div>
                    <div class="aso-space-y-2" v-if="image.enableClipart.active">
                        <label class="aso-text-[12px] aso-text-[#444444]">Select clipart  group</label>
                        <Multiselect
                            v-model="image.enableClipart.selectedClipartGroups"
                            placeholder=""
                            :options="manageCliparts"
                            label="name"
                            trackBy="name"
                            mode="tags"
                            :loading="isFetching"
                        />
                    </div>
                </div>
                <div>
                    <div class="aso-flex aso-space-x-3">
                        <div class="aso-text-[16px]">Filter</div>
                        <div class="aso-flex aso-items-center aso-translate-y-0.5">
                            <label for="aso-toggle" @click="handleFilter" class="aso-cursor-pointer aso-bg-[#F8F8FF] aso-border-[1px] aso-border-solid aso-border-black aso-w-6 aso-h-0.5 aso-rounded-full aso-p-1">
                            <div :class="{'aso-translate-x-[100%]': image.filter.active, 'aso-bg-active': image.filter }" class="aso-toggle-dot aso-w-2.5 aso-h-2.5 -aso-translate-y-[8px] -aso-translate-x-2 aso-border-[4px] aso-border-solid aso-border-[#008000] aso-bg-white aso-rounded-full aso-shadow-md aso-transform"></div>
                            </label>
                        </div>
                    </div>
                </div>
                <div class="aso-flex aso-space-x-6" v-if="image.filter.active">
                    <div class="aso-text-center aso-space-y-1 aso-flex">
                        <div>
                            <button class="aso-bg-transparent aso-cursor-pointer aso-border aso-border-solid aso-border-[1px] aso-border-[#BBBBBB] aso-w-fit aso-h-fit aso-px-1 aso-py-0.5">
                                <svg class="aso-w-4 aso-h-4" viewBox="0 0 12 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10 11V9H11.61C11.85 9.71 12 10.39 12 11H10ZM9.58 5C9.12 4.29 8.65 3.61 8.2 3H8V5H9.58ZM10 9V7H8V9H10ZM10 5.68V7H10.74C10.5 6.56 10.26 6.11 10 5.68ZM6 13V11H8V9H6V7H8V5H6V3H8V2.73C6.9 1.26 6 0.25 6 0.25C6 0.25 0 7 0 11C0 14.31 2.69 17 6 17V15H8V13H6ZM8 16.65C8.75 16.39 9.42 16 10 15.46V15H8V16.65ZM8 13H10V11H8V13ZM10 15H10.46C11 14.42 11.39 13.75 11.65 13H10V15Z" fill="black"/>
                                </svg>
                            </button>
                            <div class="aso-text-[10px] aso-text-[#3D3D3D] -aso-translate-y-0.5 aso-px-0.5">Greyscale</div>
                        </div>
                        <div class="aso-flex aso-items-center -aso-translate-y-3">
                            <label for="aso-toggle" @click="handleEnableGreyscale" class="aso-cursor-pointer aso-bg-[#F8F8FF] aso-border-[1px] aso-border-solid aso-border-black aso-w-6 aso-h-0.5 aso-rounded-full aso-p-1">
                            <div :class="{'aso-translate-x-[100%]': image.filter.enableGreyscale, 'aso-bg-active': image.filter.enableGreyscale }" class="aso-toggle-dot aso-w-2.5 aso-h-2.5 -aso-translate-y-[8px] -aso-translate-x-2 aso-border-[4px] aso-border-solid aso-border-[#008000] aso-bg-white aso-rounded-full aso-shadow-md aso-transform"></div>
                            </label>
                        </div>

                    </div>
                    <div class="aso-text-center aso-space-y-1 aso-space-x-1 aso-flex">
                        <div>
                            <button class="aso-bg-transparent aso-cursor-pointer aso-border aso-border-solid aso-border-[1px] aso-border-[#BBBBBB] aso-w-fit aso-h-fit aso-px-1 aso-py-0.5">
                                <svg class="aso-w-4 aso-h-4" viewBox="0 0 12 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10 11V9H11.61C11.85 9.71 12 10.39 12 11H10ZM9.58 5C9.12 4.29 8.65 3.61 8.2 3H8V5H9.58ZM10 9V7H8V9H10ZM10 5.68V7H10.74C10.5 6.56 10.26 6.11 10 5.68ZM6 13V11H8V9H6V7H8V5H6V3H8V2.73C6.9 1.26 6 0.25 6 0.25C6 0.25 0 7 0 11C0 14.31 2.69 17 6 17V15H8V13H6ZM8 16.65C8.75 16.39 9.42 16 10 15.46V15H8V16.65ZM8 13H10V11H8V13ZM10 15H10.46C11 14.42 11.39 13.75 11.65 13H10V15Z" fill="black"/>
                                </svg>
                            </button>
                            <div class="aso-text-[10px] aso-text-[#3D3D3D] -aso-translate-y-0.5 aso-px-0.5">Opacity</div>
                        </div>
                        <div class="aso-flex aso-items-center -aso-translate-y-3">
                            <label for="aso-toggle" @click="handleEnableOpacity" class="aso-cursor-pointer aso-bg-[#F8F8FF] aso-border-[1px] aso-border-solid aso-border-black aso-w-6 aso-h-0.5 aso-rounded-full aso-p-1">
                            <div :class="{'aso-translate-x-[100%]': image.filter.enableOpacity, 'aso-bg-active': image.filter.enableOpacity }" class="aso-toggle-dot aso-w-2.5 aso-h-2.5 -aso-translate-y-[8px] -aso-translate-x-2 aso-border-[4px] aso-border-solid aso-border-[#008000] aso-bg-white aso-rounded-full aso-shadow-md aso-transform"></div>
                            </label>
                        </div>
                    </div>
                    <div class="aso-text-center aso-space-y-1 aso-space-x-1 aso-flex">
                        <div>
                            <button class="aso-bg-transparent aso-cursor-pointer aso-border aso-border-solid aso-border-[1px] aso-border-[#BBBBBB] aso-w-fit aso-h-fit aso-px-1 aso-py-0.5">
                                <svg class="aso-w-4 aso-h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11.9995 5.00001C10.7051 5.00009 9.43008 5.31425 8.28382 5.91552C7.13756 6.51679 6.15432 7.38722 5.41847 8.4521C4.68263 9.51698 4.21616 10.7445 4.05911 12.0293C3.90205 13.3142 4.0591 14.6179 4.51677 15.8287C4.97445 17.0394 5.71907 18.1211 6.68675 18.9808C7.65442 19.8404 8.81625 20.4525 10.0725 20.7643C11.3288 21.0762 12.6419 21.0786 13.8993 20.7713C15.1567 20.464 16.3207 19.8562 17.2915 19H11.9995V18H18.2445C18.4975 17.685 18.7265 17.351 18.9295 17H11.9995V16H19.4185C19.5501 15.6743 19.6601 15.3402 19.7475 15H11.9995V14H19.9375C19.9789 13.6683 19.9996 13.3343 19.9995 13H11.9995V12H19.9375C19.8956 11.663 19.8321 11.329 19.7475 11H11.9995V10H19.4185C19.2787 9.65566 19.1149 9.32151 18.9285 9.00001H11.9995V8.00001H18.2445C17.9561 7.63996 17.6373 7.30539 17.2915 7.00001H11.9995V6.00001H15.8755C14.6897 5.34212 13.3556 4.99791 11.9995 5.00001Z" fill="black"/>
                                </svg>
                            </button>
                            <div class="aso-text-[10px] aso-text-[#3D3D3D] -aso-translate-y-0.5 aso-px-0.5">Blur</div>
                        </div>
                        <div class="aso-flex aso-items-center -aso-translate-y-3">
                            <label for="aso-toggle" @click="handleEnableBlur" class="aso-cursor-pointer aso-bg-[#F8F8FF] aso-border-[1px] aso-border-solid aso-border-black aso-w-6 aso-h-0.5 aso-rounded-full aso-p-1">
                            <div :class="{'aso-translate-x-[100%]': image.filter.enableBlur, 'aso-bg-active': image.filter.enableBlur }" class="aso-toggle-dot aso-w-2.5 aso-h-2.5 -aso-translate-y-[8px] -aso-translate-x-2 aso-border-[4px] aso-border-solid aso-border-[#008000] aso-bg-white aso-rounded-full aso-shadow-md aso-transform"></div>
                            </label>
                        </div>
                    </div>
                    <div class="aso-text-center aso-space-y-1 aso-space-x-1 aso-flex">
                        <div>
                            <button class="aso-bg-transparent aso-cursor-pointer aso-border aso-border-solid aso-border-[1px] aso-border-[#BBBBBB] aso-w-fit aso-h-fit aso-px-1 aso-py-0.5">
                                <img class="aso-w-4 aso-h-4" src="../../../../../../assets/icons/ic_triangle.svg" alt="">
                            </button>
                            <div class="aso-text-[10px] aso-text-[#3D3D3D] -aso-translate-y-0.5 aso-px-0.5">Sepia</div>
                        </div>
                        <div class="aso-flex aso-items-center -aso-translate-y-3">
                            <label for="aso-toggle" @click="handleEnableSepia" class="aso-cursor-pointer aso-bg-[#F8F8FF] aso-border-[1px] aso-border-solid aso-border-black aso-w-6 aso-h-0.5 aso-rounded-full aso-p-1">
                            <div :class="{'aso-translate-x-[100%]': image.filter.enableSepia, 'aso-bg-active': image.filter.enableSepia }" class="aso-toggle-dot aso-w-2.5 aso-h-2.5 -aso-translate-y-[8px] -aso-translate-x-2 aso-border-[4px] aso-border-solid aso-border-[#008000] aso-bg-white aso-rounded-full aso-shadow-md aso-transform"></div>
                            </label>
                        </div>
                    </div>
                    <div class="aso-text-center aso-space-y-1 aso-space-x-1 aso-flex">
                        <div>
                            <button class="aso-bg-transparent aso-cursor-pointer aso-border aso-border-solid aso-border-[1px] aso-border-[#BBBBBB] aso-w-fit aso-h-fit aso-px-1 aso-py-0.5">
                                <img class="aso-w-4 aso-h-4" src="../../../../../../assets/icons/ic_triangle.svg" alt="">
                            </button>
                            <div class="aso-text-[10px] aso-text-[#3D3D3D] -aso-translate-y-0.5 aso-px-0.5">sharpen</div>
                        </div>
                        <div class="aso-flex aso-items-center -aso-translate-y-3">
                            <label for="aso-toggle" @click="handleEnableSharpen" class="aso-cursor-pointer aso-bg-[#F8F8FF] aso-border-[1px] aso-border-solid aso-border-black aso-w-6 aso-h-0.5 aso-rounded-full aso-p-1">
                            <div :class="{'aso-translate-x-[100%]': image.filter.enableSharpen, 'aso-bg-active': image.filter.enableSharpen }" class="aso-toggle-dot aso-w-2.5 aso-h-2.5 -aso-translate-y-[8px] -aso-translate-x-2 aso-border-[4px] aso-border-solid aso-border-[#008000] aso-bg-white aso-rounded-full aso-shadow-md aso-transform"></div>
                            </label>
                        </div>
                    </div>
                    <div class="aso-text-center aso-space-y-1 aso-space-x-1 aso-flex">
                        <div>
                            <button class="aso-bg-transparent aso-cursor-pointer aso-border aso-border-solid aso-border-[1px] aso-border-[#BBBBBB] aso-w-fit aso-h-fit aso-px-1 aso-py-0.5">
                                <img class="aso-w-4 aso-h-4" src="../../../../../../assets/icons/ic_triangle.svg" alt="">
                            </button>
                            <div class="aso-text-[10px] aso-text-[#3D3D3D] -aso-translate-y-0.5 aso-px-0.5">Emboss</div>
                        </div>
                        <div class="aso-flex aso-items-center -aso-translate-y-3">
                            <label for="aso-toggle" @click="handleEnableEmbross" class="aso-cursor-pointer aso-bg-[#F8F8FF] aso-border-[1px] aso-border-solid aso-border-black aso-w-6 aso-h-0.5 aso-rounded-full aso-p-1">
                            <div :class="{'aso-translate-x-[100%]': image.filter.enableEmbross, 'aso-bg-active': image.filter.enableEmbross }" class="aso-toggle-dot aso-w-2.5 aso-h-2.5 -aso-translate-y-[8px] -aso-translate-x-2 aso-border-[4px] aso-border-solid aso-border-[#008000] aso-bg-white aso-rounded-full aso-shadow-md aso-transform"></div>
                            </label>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
        <div class="aso-bg-[#F8F9FB] aso-flex aso-space-x-4 aso-px-4 aso-py-3 aso-justify-end aso-items-end">
            <div class="aso-bg-[#016464] aso-rounded">
                <button :disabled="isLoading" @click="updateImageSettings" class="aso-rounded aso-flex aso-bg-transparent aso-w-fit aso-space-x-2 aso-h-fit aso-text-white aso-px-12 aso-p-2.5 aso-border-none aso-opacity-90 hover:aso-opacity-100 hover:aso-border-none hover:aso-text-white hover:aso-bg-[#016464] aso-cursor-pointeraso-flex aso-bg-transparent aso-w-fit aso-space-x-2 aso-h-fit aso-text-white aso-px-12 aso-p-2.5 aso-border-none aso-opacity-90 hover:aso-opacity-100 hover:aso-border-none hover:aso-text-white hover:aso-bg-[#016464] aso-cursor-pointer">
                    <img src="../../../../../../assets/icons/ic_loading_gray.svg" class="aso-w-5 aso-w-5" v-if="isLoading" />
                    <div class="aso-font-semibold aso-text-[16px]">Save</div>
                </button>
            </div>
        </div>
    </div>
</template>
<script setup>
import api from '@/admin/Api/api';
import {ref,defineProps, onMounted} from 'vue';
import { useRoute } from 'vue-router';
import Multiselect from "@vueform/multiselect";
import toastMessage from '@/admin/utils/functions';
const props = defineProps({
    data:Object,
    fetchSettings:Function
   
});

const route = useRoute();
const configId = ref(route.params.configId);
const isLoading =ref(false);
const isFetching = ref(false);
const image = ref({
    enableUploadImage:true,
    fileUploadScript:{
      customWithGraphical:false,
      uploadMinWidth:100,
      uploadMaxWidth:100,
      uploadMinHeight:1024,
      uploadMaxHeight:1024,
      allowedUploadsExtentions:["png","jpeg","webp","svg","gif"],
    },
    enableClipart:{
        active:true,
        selectedClipartGroups:[],
    },
    filter: {
        active:true,
        enableGreyscale:true,
        enableOpacity:true,
        enableEmbross:true,
        enableBlur:true,
        enableSepia:true,
        enableSharpen:true,
    }
});
const allowedUploadsExtentions = [
    {name:"PNG",value:"png"},
    {name:"JPEG",value:"jpeg"},
    {name:"SVG",value:"svg"},
    {name:"WEBP",value:"webp"},
    {name:"GIF",value:"gif"}
];
const manageCliparts = ref([]);
onMounted(async ()=>{
    isFetching.value = true;
    await fetchManageCliparts();
    if(props.data){
        image.value = {...image.value,...props.data}
    }
    isFetching.value = false;
});
const fetchManageCliparts = async () => {
    const result = await api.getManageCliparts();
    if (result.data.length > 0) {
        manageCliparts.value = result.data.map((group,id) => {
            return { name:group.title, value:id };
        });
    } else {
        manageCliparts.value = [];
    }
}
const updateImageSettings = async () => {
    isLoading.value = true;
    const result = await api.updateCustomizerSignsImage(configId.value,image.value);
    if(result.success){
        await props.fetchSettings();
        isLoading.value = false;
        if(result.success == true){
            toastMessage(result.message);
        }else{
            toastMessage(result.message,"warning");
        }
    }else{
        isLoading.value = false;
        toastMessage(result.message,"error");
    }
};
const handleEnableUploadImage = () => {
    image.value.enableUploadImage = !image.value.enableUploadImage;
};
const handleFileUploadScript = () => {
    image.value.fileUploadScript.customWithGraphical = !image.value.fileUploadScript.customWithGraphical;
};
const handleEnableClipart = () => {
    image.value.enableClipart.active = !image.value.enableClipart.active;
};
const handleFilter = () => {
    image.value.filter.active = !image.value.filter.active;
};
const handleEnableGreyscale = () => {
    image.value.filter.enableGreyscale = !image.value.filter.enableGreyscale;
};
const handleEnableOpacity = () => {
    image.value.filter.enableOpacity = !image.value.filter.enableOpacity;
};
const handleEnableBlur = () => {
    image.value.filter.enableBlur = !image.value.filter.enableBlur;
};
const handleEnableSepia = () => {
    image.value.filter.enableSepia = !image.value.filter.enableSepia;
};
const handleEnableSharpen = () => {
    image.value.filter.enableSharpen = !image.value.filter.enableSharpen;
};
const handleEnableEmbross = () => {
    image.value.filter.enableEmbross = !image.value.filter.enableEmbross;
};
</script>
