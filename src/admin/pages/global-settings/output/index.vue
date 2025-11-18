<template>
    <div>
        <div v-if="isFetching" class="asowp-bg-white asowp-border-solid asowp-border asowp-border-[#D1D1D1] asowp-flex asowp-flex-col asowp-space-y-2 asowp-justify-center asowp-items-center asowp-w-full asowp-h-[306px] p-4">
            <img class="asowp-w-[200px] asowp-h-[200px]" src="../../../../../assets/icons/ic_loading.svg" alt="">
        </div>
        <div class="asowp-space-y-4 asowp-py-6" v-if="!isFetching">
            <div>
                <div class="asowp-bg-[#fff] asowp-flex asowp-flex-col asowp-space-y-3 asowp-px-8 asowp-py-8 asowp-border-solid asowp-border-2 asowp-border-[#D1D1D1] asowp-rounded-[10px]">
                    <div class="asowp-space-y-1">
                        <div class="asowp-flex asowp-space-x-2">
                            <label class="asowp-font-semibold ">Use ider id as zip name</label>
                            <div class="asowp-flex asowp-items-center asowp-translate-x-2 asowp-translate-y-0.5">
                                <label for="toggleZipName" class="asowp-relative asowp-inline-flex asowp-items-center asowp-cursor-pointer asowp-border-[1px] asowp-border-solid asowp-border-black asowp-rounded-full">
                                    <input id="toggleZipName" type="checkbox" name="toggleZipName" class="asowp-sr-only asowp-peer" v-model="output.zipName">
                                    <div :class="`peer-checked:after:asowp-border-[#016464] peer-checked:after:asowp-border-solid peer-checked:after:asowp-border-[5px] peer-checked:after:asowp-top-[-2px] peer-checked:after:asowp-translate-y-[-15%] asowp-w-10 asowp-h-3 asowp-border asowp-border-[5px] asowp-border-[#016464] asowp-bg-zinc-300 asowp-rounded-full asowp-peer peer-checked:after:asowp-translate-x-[140%] after:asowp-content-[''] after:asowp-absolute after:asowp-top-[-2px] after:asowp-left-[-5px] after:asowp-bg-zinc-300 after:asowp-border-white after:asowp-border-solid after:asowp-translate-y-[-15%] after:asowp-border-[#FFFFFF] after:asowp-border-[5px] after:asowp-rounded-full after:asowp-h-2.5 after:asowp-w-2.5 after:asowp-transition-all after:asowp-shadow-lg`"></div>
                                </label>
                            </div>
                        </div>
                        <div class="asowp-text-[14px] asowp-py-2">
                            Use the command id as the name of the zip file that will contain the uploaded files during customization
                        </div>
                    </div>
                    <!-- <div class="asowp-flex asowp-space-x-2">
                        <label>Calculate retina output</label>
                        <div class="asowp-flex asowp-items-center asowp-translate-x-2 asowp-translate-y-0.5">
                            <label for="toggleEnableCalculateOutput" class="asowp-relative asowp-inline-flex asowp-items-center asowp-cursor-pointer asowp-border-[1px] asowp-border-solid asowp-border-black asowp-rounded-full">
                                <input id="toggleEnableCalculateOutput" type="checkbox" name="toggleEnableCalculateOutput" class="asowp-sr-only asowp-peer" v-model="output.calculateOutput">
                                <div :class="`peer-checked:after:asowp-border-[#016464] peer-checked:after:asowp-border-solid peer-checked:after:asowp-border-[5px] peer-checked:after:asowp-top-[-2px] peer-checked:after:asowp-translate-y-[-15%] asowp-w-10 asowp-h-3 asowp-border asowp-border-[5px] asowp-border-[#016464] asowp-bg-zinc-300 asowp-rounded-full asowp-peer peer-checked:after:asowp-translate-x-[140%] after:asowp-content-[''] after:asowp-absolute after:asowp-top-[-2px] after:asowp-left-[-5px] after:asowp-bg-zinc-300 after:asowp-border-white after:asowp-border-solid after:asowp-translate-y-[-15%] after:asowp-border-[#FFFFFF] after:asowp-border-[5px] after:asowp-rounded-full after:asowp-h-2.5 after:asowp-w-2.5 after:asowp-transition-all after:asowp-shadow-lg`"></div>
                            </label>
                        </div>
                    </div> -->
                    <div class="asowp-flex asowp-space-x-8">
                        <div class="asowp-flex asowp-space-x-2">
                            <label class="asowp-font-semibold ">Enable sending mail to customer</label>
                            <div class="asowp-flex asowp-items-center asowp-translate-x-2 asowp-translate-y-0.5">
                                <label for="toggleMailCustomer" class="asowp-relative asowp-inline-flex asowp-items-center asowp-cursor-pointer asowp-border-[1px] asowp-border-solid asowp-border-black asowp-rounded-full">
                                    <input id="toggleMailCustomer" type="checkbox" name="toggleMailCustomer" class="asowp-sr-only asowp-peer" v-model="output.mailCustomer">
                                    <div :class="`peer-checked:after:asowp-border-[#016464] peer-checked:after:asowp-border-solid peer-checked:after:asowp-border-[5px] peer-checked:after:asowp-top-[-2px] peer-checked:after:asowp-translate-y-[-15%] asowp-w-10 asowp-h-3 asowp-border asowp-border-[5px] asowp-border-[#016464] asowp-bg-zinc-300 asowp-rounded-full asowp-peer peer-checked:after:asowp-translate-x-[140%] after:asowp-content-[''] after:asowp-absolute after:asowp-top-[-2px] after:asowp-left-[-5px] after:asowp-bg-zinc-300 after:asowp-border-white after:asowp-border-solid after:asowp-translate-y-[-15%] after:asowp-border-[#FFFFFF] after:asowp-border-[5px] after:asowp-rounded-full after:asowp-h-2.5 after:asowp-w-2.5 after:asowp-transition-all after:asowp-shadow-lg`"></div>
                                </label>
                            </div>
                        </div>
                        <div class="asowp-flex asowp-space-x-2">
                            <label class="asowp-font-semibold ">Enable sending mail to admin</label>
                            <div class="asowp-flex asowp-items-center asowp-translate-x-2 asowp-translate-y-0.5">
                                <label for="toggleMailAdmin" class="asowp-relative asowp-inline-flex asowp-items-center asowp-cursor-pointer asowp-border-[1px] asowp-border-solid asowp-border-black asowp-rounded-full">
                                    <input id="toggleMailAdmin" type="checkbox" name="toggleMailAdmin" class="asowp-sr-only asowp-peer" v-model="output.mailAdmin">
                                    <div :class="`peer-checked:after:asowp-border-[#016464] peer-checked:after:asowp-border-solid peer-checked:after:asowp-border-[5px] peer-checked:after:asowp-top-[-2px] peer-checked:after:asowp-translate-y-[-15%] asowp-w-10 asowp-h-3 asowp-border asowp-border-[5px] asowp-border-[#016464] asowp-bg-zinc-300 asowp-rounded-full asowp-peer peer-checked:after:asowp-translate-x-[140%] after:asowp-content-[''] after:asowp-absolute after:asowp-top-[-2px] after:asowp-left-[-5px] after:asowp-bg-zinc-300 after:asowp-border-white after:asowp-border-solid after:asowp-translate-y-[-15%] after:asowp-border-[#FFFFFF] after:asowp-border-[5px] after:asowp-rounded-full after:asowp-h-2.5 after:asowp-w-2.5 after:asowp-transition-all after:asowp-shadow-lg`"></div>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="asowp-w-full asowp-space-y-2 asowp-text-[12px] asowp-flex asowp-flex-col">
                        <label for="" class="asowp-bold asowp-font-normal">List of mails to send output</label>
                        <input type="text"  class="asowp-rounded asowp-w-full asowp-h-[35px]" style="border-radius: 10px;">
                    </div>

                    <hr class="Polaris-Divider asowp-w-full asowp-translate-y-4" style="border: 1px solid #ebebeb;">
                    <div class="asowp-flex asowp-space-x-4 asowp-px-4 asowp-py-3 asowp-justify-end asowp-items-end">
                        <div class="asowp-bg-[#016464] asowp-rounded">
                            <button :disabled="isLoading" @click="updateGlobalOutput" class="asowp-flex asowp-bg-transparent asowp-w-fit asowp-space-x-2 asowp-h-fit asowp-text-white asowp-px-8 asowp-p-2.5 asowp-rounded asowp-border-none asowp-opacity-90 hover:asowp-opacity-100 hover:asowp-border-none hover:asowp-text-white hover:asowp-bg-[#016464] asowp-cursor-pointer">
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
    </div>
</template>
<script setup>
import { ref,onMounted } from "vue";
import api from "@/admin/Api/api";
import toastMessage from "@/admin/utils/functions";


const isFetching = ref(false);
const isLoading = ref(false);
const output = ref({
    zipName:true,
    calculateOutput:true,
    mailAdmin:true,
    mailCustomer:true
});



onMounted(async () => {
    isFetching.value = true;
    await fetchGlobalOutput();
    isFetching.value = false;
});

const fetchGlobalOutput = async () => {
    const result = await api.getGlobalSettingsOutput();
    if(!result.message){
        output.value = result;
    }

};
const updateGlobalOutput = async () => {
    isLoading.value = true;
    const result = await api.updateGlobalSettingsOutput(output.value);
    if(result.success){
        await fetchGlobalOutput();
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
}
</script>