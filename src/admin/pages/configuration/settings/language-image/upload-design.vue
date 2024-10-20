<template>
    <div>
            
        <div>
            <div class="asowp-bg-[#F8F9FB] asowp-px-8 asowp-py-8 asowp-space-y-6 asowp-translate-y-8">
                <h3 class="asowp-text-[16px] asowp-semibold">Custom design link</h3>
                <div class="asowp-flex asowp-space-x-3">
                    <div class="asowp-text-[11px]">Enable custom design link</div>
                    <div class="asowp-flex asowp-items-center asowp-translate-y-0.5">
                        <label for="toggleEnableCustom" class="asowp-relative asowp-inline-flex asowp-items-center asowp-cursor-pointer asowp-border-[1px] asowp-border-solid asowp-border-black asowp-rounded-full">
                            <input id="toggleEnableCustom" type="checkbox" name="toggleEnableCustom" class="asowp-sr-only asowp-peer" v-model="uploadDesign.activate">
                            <div :class="`peer-checked:after:asowp-border-[#016464] peer-checked:after:asowp-border-solid peer-checked:after:asowp-border-[5px] peer-checked:after:asowp-top-[-2px] peer-checked:after:asowp-translate-y-[-15%] asowp-w-10 asowp-h-3 asowp-border asowp-border-[5px] asowp-border-[#016464] asowp-bg-zinc-300 asowp-rounded-full asowp-peer peer-checked:after:asowp-translate-x-[140%] after:asowp-content-[''] after:asowp-absolute after:asowp-top-[-2px] after:asowp-left-[-5px] after:asowp-bg-zinc-300 after:asowp-border-white after:asowp-border-solid after:asowp-translate-y-[-15%] after:asowp-border-[#FFFFFF] after:asowp-border-[5px] after:asowp-rounded-full after:asowp-h-2.5 after:asowp-w-2.5 after:asowp-transition-all after:asowp-shadow-lg`"></div>
                        </label>
                    </div>
                </div>
                <div class="asowp-text-[11px] asowp-text-[#444444]">
                    Enable this to display a link to direct customers to another page on your site, this will display as one of the first options on desktop and mobile.
                </div>
                <div class="asowp-flex asowp-flex-col asowp-w-3/5 asowp-space-y-2" v-if="uploadDesign.activate">
                    <label class="asowp-text-[12px] asowp-text-[#444444]">Custom Design Link</label>
                    <input type="text" v-model="uploadDesign.link" class="asowp-w-full"/>
                    <span class="asowp-text-[12px] asowp-text-[#444444]">URL to redirect customers on your store that will allow for more complex graphic design quote submissions.</span>
                </div>
                <div class="asowp-flex asowp-flex-col asowp-w-3/5 asowp-space-y-2" v-if="uploadDesign.activate">
                    <label class="asowp-text-[12px] asowp-text-[#444444]">Phrase for link to submit custom design page</label>
                    <input type="text" v-model="uploadDesign.phraseSubmitCustom" class="asowp-w-full"/>

                </div>
                
            </div>
            <div class="asowp-bg-[#F8F9FB] asowp-px-8 asowp-pb-8 asowp-space-y-6 asowp-translate-y-8">
                <h3 class="asowp-text-[16px] asowp-semibold asowp-m-0">The message to be displayed when the help button is clicked</h3>
                <div class="asowp-relative asowp-w-full asowp-max-h-fit">
                    <div class="asowp-px-4">
                        <div class="asowp-px-[10px] asowp-pt-[5px]">
                            <textarea name="" id="asowp-admin-tinymce" cols="30" rows="10"></textarea>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="asowp-bg-[#F8F9FB] asowp-flex asowp-space-x-4 asowp-px-4 asowp-py-3 asowp-justify-end asowp-items-end asowp-translate-y-12">
            <div class="asowp-bg-[#016464] asowp-rounded">
                <button :disabled="isLoading" @click="updateUploadDesignSettings" class="asowp-rounded asowp-flex asowp-bg-transparent asowp-w-fit asowp-space-x-2 asowp-h-fit asowp-text-white asowp-px-12 asowp-p-2.5 asowp-border-none asowp-opacity-90 hover:asowp-opacity-100 hover:asowp-border-none hover:asowp-text-white hover:asowp-bg-[#016464] asowp-cursor-pointerasowp-flex asowp-bg-transparent asowp-w-fit asowp-space-x-2 asowp-h-fit asowp-text-white asowp-px-12 asowp-p-2.5 asowp-border-none asowp-opacity-90 hover:asowp-opacity-100 hover:asowp-border-none hover:asowp-text-white hover:asowp-bg-[#016464] asowp-cursor-pointer">
                    <img src="../../../../../../assets/icons/ic_loading_gray.svg" class="asowp-w-5 asowp-w-5" v-if="isLoading" />
                    <div class="asowp-font-semibold asowp-text-[16px]">Save</div>
                </button>
            </div>
        </div>
    </div>
</template>
<script setup>
import {ref,defineProps, onMounted} from 'vue';
import api from '@/admin/Api/api';
import { useRoute } from 'vue-router';
import toastMessage from '@/admin/utils/functions';
const props = defineProps({
    data:Object,
    fetchSettings:Function
});
const route = useRoute();
const isLoading =ref(false);
const configId = ref(route.params.configId);
const uploadDesign = ref({
    activate: false,
    link: "",
    phraseSubmitCustom: "Take a customization",
    helpContent:'',
})


onMounted(() => {
    if(props.data){
        uploadDesign.value = {...uploadDesign.value,...props.data}
    }
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
                editor.setContent(uploadDesign.value.helpContent);
            });
        }
    });
});

const updateUploadDesignSettings = async () => {
    isLoading.value = true;
    uploadDesign.value.helpContent = tinymce.activeEditor.getContent();
    const result = await api.updateLanguageImagesUploadDesign(configId.value,uploadDesign.value);
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
</script> 