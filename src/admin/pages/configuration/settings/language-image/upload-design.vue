<template>
    <div>
            
        <div>
            <div class="ascwo-bg-[#F8F9FB] ascwo-px-8 ascwo-py-8 ascwo-space-y-6 ascwo-translate-y-8">
                <h3 class="ascwo-text-[16px] ascwo-semibold">{{ __('Custom design link', 'all-signs-customizer-for-woocommerce-pro') }}</h3>
                <div class="ascwo-flex ascwo-space-x-3">
                    <div class="ascwo-text-[11px]">{{ __('Enable custom design link', 'all-signs-customizer-for-woocommerce-pro') }}</div>
                    <div class="ascwo-flex ascwo-items-center ascwo-translate-y-0.5">
                        <label for="toggleEnableCustom" class="ascwo-relative ascwo-inline-flex ascwo-items-center ascwo-cursor-pointer ascwo-border-[1px] ascwo-border-solid ascwo-border-black ascwo-rounded-full">
                            <input id="toggleEnableCustom" type="checkbox" name="toggleEnableCustom" class="ascwo-sr-only ascwo-peer" v-model="uploadDesign.activate">
                            <div :class="`peer-checked:after:ascwo-border-[#016464] peer-checked:after:ascwo-border-solid peer-checked:after:ascwo-border-[5px] peer-checked:after:ascwo-top-[-2px] peer-checked:after:ascwo-translate-y-[-15%] ascwo-w-10 ascwo-h-3 ascwo-border ascwo-border-[5px] ascwo-border-[#016464] ascwo-bg-zinc-300 ascwo-rounded-full ascwo-peer peer-checked:after:ascwo-translate-x-[140%] after:ascwo-content-[''] after:ascwo-absolute after:ascwo-top-[-2px] after:ascwo-left-[-5px] after:ascwo-bg-zinc-300 after:ascwo-border-white after:ascwo-border-solid after:ascwo-translate-y-[-15%] after:ascwo-border-[#FFFFFF] after:ascwo-border-[5px] after:ascwo-rounded-full after:ascwo-h-2.5 after:ascwo-w-2.5 after:ascwo-transition-all after:ascwo-shadow-lg`"></div>
                        </label>
                    </div>
                </div>
                <div class="ascwo-text-[11px] ascwo-text-[#444444]">
                    {{ __('Enable this to display a link to direct customers to another page on your site, this will display as one of the first options on desktop and mobile.', 'all-signs-customizer-for-woocommerce-pro') }}
                </div>
                <div class="ascwo-flex ascwo-flex-col ascwo-w-3/5 ascwo-space-y-2" v-if="uploadDesign.activate">
                    <label class="ascwo-text-[12px] ascwo-text-[#444444]">{{ __('Custom Design Link', 'all-signs-customizer-for-woocommerce-pro') }}</label>
                    <input type="text" v-model="uploadDesign.link" class="ascwo-w-full"/>
                    <span class="ascwo-text-[12px] ascwo-text-[#444444]">{{ __('URL to redirect customers on your store that will allow for more complex graphic design quote submissions.', 'all-signs-customizer-for-woocommerce-pro') }}</span>
                </div>
                <div class="ascwo-flex ascwo-flex-col ascwo-w-3/5 ascwo-space-y-2" v-if="uploadDesign.activate">
                    <label class="ascwo-text-[12px] ascwo-text-[#444444]">{{ __('Phrase for link to submit custom design page', 'all-signs-customizer-for-woocommerce-pro') }}</label>
                    <input type="text" v-model="uploadDesign.phraseSubmitCustom" class="ascwo-w-full"/>

                </div>
                
            </div>
            <div class="ascwo-bg-[#F8F9FB] ascwo-px-8 ascwo-pb-8 ascwo-space-y-6 ascwo-translate-y-8">
                <h3 class="ascwo-text-[16px] ascwo-semibold ascwo-m-0">{{ __('The message to be displayed when the help button is clicked', 'all-signs-customizer-for-woocommerce-pro') }}</h3>
                <div class="ascwo-relative ascwo-w-full ascwo-max-h-fit">
                    <div class="ascwo-px-4">
                        <div class="ascwo-px-[10px] ascwo-pt-[5px]">
                            <textarea name="" id="ascwo-admin-tinymce" cols="30" rows="10"></textarea>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="ascwo-bg-[#F8F9FB] ascwo-flex ascwo-space-x-4 ascwo-px-4 ascwo-py-3 ascwo-justify-end ascwo-items-end ascwo-translate-y-12">
            <div class="ascwo-bg-[#016464] ascwo-rounded">
                <button :disabled="isLoading" @click="updateUploadDesignSettings" class="ascwo-rounded ascwo-flex ascwo-bg-transparent ascwo-w-fit ascwo-space-x-2 ascwo-h-fit ascwo-text-white ascwo-px-12 ascwo-p-2.5 ascwo-border-none ascwo-opacity-90 hover:ascwo-opacity-100 hover:ascwo-border-none hover:ascwo-text-white hover:ascwo-bg-[#016464] ascwo-cursor-pointerascwo-flex ascwo-bg-transparent ascwo-w-fit ascwo-space-x-2 ascwo-h-fit ascwo-text-white ascwo-px-12 ascwo-p-2.5 ascwo-border-none ascwo-opacity-90 hover:ascwo-opacity-100 hover:ascwo-border-none hover:ascwo-text-white hover:ascwo-bg-[#016464] ascwo-cursor-pointer">
                    <img src="../../../../../../assets/icons/ic_loading_gray.svg" class="ascwo-w-5 ascwo-w-5" v-if="isLoading" />
                    <div class="ascwo-font-semibold ascwo-text-[16px]">{{ __('Save', 'all-signs-customizer-for-woocommerce-pro') }}</div>
                </button>
            </div>
        </div>
    </div>
</template>
<script setup>
import {ref,defineProps, onMounted, onBeforeUnmount} from 'vue';
import api from '@/admin/Api/api';
import { useRoute } from 'vue-router';
import toastMessage from '@/admin/utils/functions';
import { __, _x, _n, _nx, sprintf, setLocaleData } from "@wordpress/i18n";
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

const tinymceEditorId = 'ascwo-admin-tinymce';
const getTinyMCE = () => window.tinymce ?? null;
const getTinyMCEEditor = () => getTinyMCE()?.get(tinymceEditorId) ?? null;
const setTinyMCEContent = (content = '') => {
    const editor = getTinyMCEEditor();
    if (editor) {
        editor.setContent(content || '');
    }
};
const getTinyMCEContent = () => getTinyMCEEditor()?.getContent() ?? '';
const destroyTinyMCE = () => {
    const editor = getTinyMCEEditor();
    if (editor) {
        editor.remove();
    }
};
const initTinyMCE = (content = '') => {
    const editorApi = getTinyMCE();
    if (!editorApi) {
        return;
    }

    const existingEditor = getTinyMCEEditor();
    if (existingEditor) {
        existingEditor.setContent(content || '');
        return;
    }

    editorApi.init({
        selector: `#${tinymceEditorId}`,
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
                editor.setContent(content || '');
            });
        }
    });
};

onMounted(() => {
    if(props.data){
        uploadDesign.value = {...uploadDesign.value,...props.data}
    }
    initTinyMCE(uploadDesign.value.helpContent);
});

onBeforeUnmount(() => {
    destroyTinyMCE();
});

const updateUploadDesignSettings = async () => {
    isLoading.value = true;
    uploadDesign.value.helpContent = getTinyMCEContent();
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
