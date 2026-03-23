<template>
    <div>
        <div v-if="isFetching" class="asowp-bg-white asowp-border-solid asowp-border asowp-border-[#D1D1D1] asowp-flex asowp-flex-col asowp-space-y-2 asowp-justify-center asowp-items-center asowp-w-full asowp-h-[306px] p-4">
            <img class="asowp-w-[200px] asowp-h-[200px]" src="../../../../../assets/icons/ic_loading.svg" alt="">
        </div>
        <div v-if="!isFetching" class="asowp-space-y-4 asowp-py-10">
            <div class="asowp-bg-[#F8F9FB] asowp-px-8 asowp-py-2">
                <div class="asowp-flex asowp-flex-col asowp-space-y-3">
                    <label class="asowp-text-[12px] asowp-text-[#444444]">{{ __('Enter the licence key', 'all-signs-options-pro') }}</label>
                    <input type="text" v-model="licenses.product" class="asowp-w-full"/>
                </div>
            </div>
            <div class="asowp-bg-[#F8F9FB] asowp-px-8 asowp-py-4">
                <label class="asowp-flex asowp-items-start asowp-justify-between asowp-gap-4">
                    <div class="asowp-flex asowp-flex-col asowp-space-y-1">
                        <span class="asowp-text-[14px] asowp-font-semibold asowp-text-[#1f2937]">
                            {{ __('Enable plugin auto-updates', 'all-signs-options-pro') }}
                        </span>
                        <span class="asowp-text-[12px] asowp-text-[#6b7280]">
                            {{ __('When enabled, WordPress will automatically install new versions of this plugin when an update is available.', 'all-signs-options-pro') }}
                        </span>
                    </div>
                    <input
                        type="checkbox"
                        v-model="licenses.auto_update"
                        class="asowp-mt-1 asowp-h-4 asowp-w-4 asowp-cursor-pointer"
                    />
                </label>
            </div>
            <div class="asowp-bg-[#F8F9FB] asowp-flex asowp-space-x-4 asowp-px-4 asowp-py-3 asowp-justify-end asowp-items-end">
                <div class="asowp-bg-[#016464] asowp-rounded">
                    <button :disabled="isLoading" @click="updateGlobalLicenses" class="asowp-flex asowp-bg-transparent asowp-w-fit asowp-space-x-2 asowp-h-fit asowp-text-white asowp-px-8 asowp-p-2.5 asowp-rounded asowp-border-none asowp-opacity-90 hover:asowp-opacity-100 hover:asowp-border-none hover:asowp-text-white hover:asowp-bg-[#016464] asowp-cursor-pointer">
                        <div class="asowp-translate-y-1">
                            <img src="../../../../../assets/icons/ic_loading_gray.svg" class="asowp-w-5 asowp-w-5" v-if="isLoading" :disabled="isLoading"/>
                            <svg v-if="!isLoading" class="asowp-w-4 asowp-h-4" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2.5 1.25C2.16848 1.25 1.85054 1.3817 1.61612 1.61612C1.3817 1.85054 1.25 2.16848 1.25 2.5V17.5C1.25 17.8315 1.3817 18.1495 1.61612 18.3839C1.85054 18.6183 2.16848 18.75 2.5 18.75H17.5C17.8315 18.75 18.1495 18.6183 18.3839 18.3839C18.6183 18.1495 18.75 17.8315 18.75 17.5V2.5C18.75 2.16848 18.6183 1.85054 18.3839 1.61612C18.1495 1.3817 17.8315 1.25 17.5 1.25H11.875C11.5435 1.25 11.2255 1.3817 10.9911 1.61612C10.7567 1.85054 10.625 2.16848 10.625 2.5V11.6163L13.9325 8.3075C14.0499 8.19014 14.209 8.12421 14.375 8.12421C14.541 8.12421 14.7001 8.19014 14.8175 8.3075C14.9349 8.42486 15.0008 8.58403 15.0008 8.75C15.0008 8.91597 14.9349 9.07514 14.8175 9.1925L10.4425 13.5675C10.3844 13.6257 10.3155 13.6719 10.2395 13.7034C10.1636 13.7349 10.0822 13.7511 10 13.7511C9.91779 13.7511 9.83639 13.7349 9.76046 13.7034C9.68453 13.6719 9.61556 13.6257 9.5575 13.5675L5.1825 9.1925C5.12439 9.13439 5.07829 9.0654 5.04685 8.98948C5.0154 8.91356 4.99921 8.83218 4.99921 8.75C4.99921 8.66782 5.0154 8.58644 5.04685 8.51052C5.07829 8.4346 5.12439 8.36561 5.1825 8.3075C5.24061 8.24939 5.3096 8.20329 5.38552 8.17185C5.46144 8.1404 5.54282 8.12421 5.625 8.12421C5.70718 8.12421 5.78856 8.1404 5.86448 8.17185C5.9404 8.20329 6.00939 8.24939 6.0675 8.3075L9.375 11.6163V2.5C9.375 1.83696 9.63839 1.20107 10.1072 0.732233C10.5761 0.263392 11.212 0 11.875 0L17.5 0C18.163 0 18.7989 0.263392 19.2678 0.732233C19.7366 1.20107 20 1.83696 20 2.5V17.5C20 18.163 19.7366 18.7989 19.2678 19.2678C18.7989 19.7366 18.163 20 17.5 20H2.5C1.83696 20 1.20107 19.7366 0.732233 19.2678C0.263392 18.7989 0 18.163 0 17.5V2.5C0 1.83696 0.263392 1.20107 0.732233 0.732233C1.20107 0.263392 1.83696 0 2.5 0L5.625 0C5.79076 0 5.94973 0.065848 6.06694 0.183058C6.18415 0.300269 6.25 0.45924 6.25 0.625C6.25 0.79076 6.18415 0.949732 6.06694 1.06694C5.94973 1.18415 5.79076 1.25 5.625 1.25H2.5Z" fill="white"/>
                            </svg>
                        </div>

                        <span class="asowp-font-semibold asowp-text-[16px]">{{ __('Save settings', 'all-signs-options-pro') }}</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import api from '@/admin/Api/api';
import {ref, onMounted} from 'vue';
import toastMessage from '@/admin/utils/functions';
import axios from 'axios';
import { __, _x, _n, _nx, sprintf, setLocaleData } from "@wordpress/i18n";
// Import du helper de traduction

const isFetching = ref(false);
const isLoading = ref(false);
const initialProduct = ref("");
const licenses = ref({
    product:"",
    auto_update:false,
});
const productId = asowp_data.author;
onMounted(async() => {
    isFetching.value = true;
    await fetchLicenses();
    isFetching.value = false;
});
const fetchLicenses = async () => {
    const result = await api.getGlobalSettingsProduct();
    licenses.value.product = result?.product || "";
    licenses.value.auto_update = Boolean(result?.auto_update);
    initialProduct.value = licenses.value.product;
};
const updateGlobalLicenses = async () => {
    isLoading.value = true;
    try {
        const result = await api.saveGlobalSettingsProduct(licenses.value);
        if(result.success){
            const shouldActivateLicense = licenses.value.product?.trim() && licenses.value.product !== initialProduct.value;

            if (shouldActivateLicense) {
                await activateLicenseKey();
            } else {
                initialProduct.value = licenses.value.product;
                toastMessage(result.success);
            }
        }else{
            toastMessage(result.message,"error");
        }
    } finally {
        isLoading.value = false;
    }
}
const activateLicenseKey = async () => {
    try {
        const url = 'https://signsdesigner.us/wp-json/vlc/license/?lcde='+ licenses.value.product +"&siteurl="+asowp_data.site_url+"&vertim="+productId;
        const response = await axios.get(url);
        if (response.data.key) {
            licenses.value.valid = response.data.key;
            await api.saveGlobalSettingsProduct(licenses.value);
            initialProduct.value = licenses.value.product;
            toastMessage(__("Activation successful! Your product is ready to use", "all-signs-options-pro"));
            document.location.href = 'admin.php?page=asowp#/'
            document.location.reload(true);
        }else if(response.data.message){
            await api.saveGlobalSettingsProduct(licenses.value);
            toastMessage(response.data.message, 'error');
            document.location.reload(true);
        }else{
            toastMessage(response.data, 'error');
        }
    } catch (error) {
        toastMessage(__('An unknown error occurred.', 'all-signs-options-pro'), "error");
    }
}
</script>
