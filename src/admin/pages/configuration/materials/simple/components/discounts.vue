<template>
    <div class="asowp-translate-y-2 asowp-bg-[#fff] asowp-p-4 asowp-rounded-[10px] asowp-border-[2px] asowp-border-solid asowp-border-[#d9d9d9]">
        <!-- Loading State -->
        <div v-if="isFetching" class="asowp-bg-white asowp-border-solid asowp-border asowp-border-[#D1D1D1] asowp-flex asowp-flex-col asowp-space-y-2 asowp-justify-center asowp-items-center asowp-w-full asowp-h-[306px] p-4">
            <img class="asowp-w-[200px] asowp-h-[200px]" src="../../../../../../../assets/icons/ic_loading.svg" alt="Loading...">
        </div>

        <!-- Main Content -->
        <div class="asowp-space-y-1" v-if="!isFetching">
            <div class=" asowp-px-4 asowp-py-6 asowp-rounded-lg asowp-shadow-sm">
                
                <!-- Header 
                <div class="asowp-mb-6">
                    <h3 class="asowp-text-lg asowp-font-semibold asowp-text-[#333333] asowp-mb-2">{{ __("Discount Configuration", "all-signs-options-pro") }}</h3>
                    <p class="asowp-text-sm asowp-text-[#666666]">{{ __("Set up quantity-based discounts for your products", "all-signs-options-pro") }}</p>
                </div>-->

                <!-- Discounts List or Empty State -->
                <div v-if="!isEdit">
                    <!-- Empty State -->
                    <div v-if="!discounts || !Array.isArray(discounts) || discounts.length === 0" 
                         class="asowp-flex asowp-flex-col asowp-items-center asowp-justify-center asowp-py-12 asowp-text-center">
                        <div class="asowp-mb-4">
                            <svg class="asowp-w-16 asowp-h-16 asowp-text-[#D1D1D1] asowp-mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                            </svg>
                        </div>
                        <h4 class="asowp-text-lg asowp-font-medium asowp-text-[#444444] asowp-mb-2">{{__("Discount is empty", "all-signs-options-pro")}}</h4>
                        <p class="asowp-text-sm asowp-text-[#666666] asowp-mb-6">{{__("No discounts have been configured yet. Add your first discount to get started.", "all-signs-options-pro")}}</p>
                        
                        <button @click="handleAddMaterialDiscount" 
                                :disabled="isLoading"
                                class="asowp-flex asowp-justify-center asowp-items-center asowp-bg-[#016464] asowp-rounded-lg asowp-space-x-2 asowp-text-white asowp-px-6 asowp-py-3 hover:asowp-bg-[#014d4d] asowp-transition-colors asowp-duration-200 disabled:asowp-opacity-50 disabled:asowp-cursor-not-allowed">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="asowp-w-5 asowp-h-5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                            <span class="asowp-font-medium">{{__("Add First Discount", "all-signs-options-pro")}}</span>
                        </button>
                    </div>

                    <!-- Discounts List -->
                    <div v-else class="asowp-space-y-4">
                        <div class="asowp-relative " 
                             v-for="(discount, key) in discounts" :key="key">
                            
                            <!-- Delete Button -->
                            <button @click="handleDeleteDiscount(key)" 
                                    class="asowp-absolute asowp-right-0 asowp-top-0 asowp-p-1 asowp-rounded-full asowp-text-[#666666] hover:asowp-text-red-500 hover:asowp-bg-red-50 asowp-transition-all asowp-duration-200">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="asowp-w-4 asowp-h-4">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>

                            <div class="asowp-grid asowp-grid-cols-1 md:asowp-grid-cols-2 asowp-gap-6 asowp-pr-8">
                                <!-- Quantity Input -->
                                <div class="asowp-space-y-2">
                                    <label class="asowp-block asowp-text-sm asowp-font-medium asowp-text-[#374151]">
                                        {{__("Minimum Quantity Required", "all-signs-options-pro")}}
                                    </label>
                                    <input 
                                        type="number" 
                                        v-model="discounts[key].quantity" 
                                        :placeholder="__('Enter minimum quantity', 'all-signs-options-pro')"
                                        class="asowp-w-full asowp-h-[35px] asowp-px-3 asowp-py-2 asowp-border asowp-text-sm focus:asowp-ring-2 focus:asowp-ring-[#016464] focus:asowp-border-[#016464] asowp-transition-all asowp-duration-200"
                                        :class="{'asowp-border-red-400 focus:asowp-ring-red-400 focus:asowp-border-red-400': errors[key]?.quantity}"
                                        style="border-radius: 5px !important;"
                                        @blur="validateQuantity(key)"
                                        @input="validateQuantity(key)">
                                    <span v-if="errors[key]?.quantity" class="asowp-text-red-500 asowp-text-xs asowp-block">
                                        {{ errors[key].quantity }}
                                    </span>
                                </div>

                                <!-- Discount Percentage Input -->
                                <div class="asowp-space-y-2">
                                    <label class="asowp-block asowp-text-sm asowp-font-medium asowp-text-[#374151]">
                                        {{__("Discount Percentage", "all-signs-options-pro")}}
                                    </label>
                                    <div class="asowp-relative">
                                        <input 
                                            type="number" 
                                            v-model="discounts[key].discountPercentage" 
                                            :placeholder="__('Enter discount percentage', 'all-signs-options-pro')"
                                            min="0" 
                                            max="100"
                                            class="asowp-w-full asowp-h-[35px] asowp-px-3 asowp-py-2 asowp-pr-8 asowp-border asowp-text-sm focus:asowp-ring-2 focus:asowp-ring-[#016464] focus:asowp-border-[#016464] asowp-transition-all asowp-duration-200"
                                            :class="{'asowp-border-red-400 focus:asowp-ring-red-400 focus:asowp-border-red-400': errors[key]?.discountPercentage}"
                                            style="border-radius: 5px !important;"
                                            @blur="validateDiscountPercentage(key)"
                                            @input="validateDiscountPercentage(key)">
                                        <span class="asowp-absolute asowp-right-3 asowp-top-2 asowp-text-[#666666] asowp-text-sm">%</span>
                                    </div>
                                    <span v-if="errors[key]?.discountPercentage" class="asowp-text-red-500 asowp-text-xs asowp-block">
                                        {{ errors[key].discountPercentage }}
                                    </span>
                                </div>
                            </div>

                            <!-- Discount Preview -->
                            <div v-if="discounts[key].quantity > 0 && discounts[key].discountPercentage > 0" 
                                 class="asowp-mt-1 asowp-p-2 asowp-bg-[#F0F9FF] asowp-border asowp-border-[#BAE6FD] asowp-rounded-lg">
                                <p class="asowp-text-sm asowp-text-[#0369A1] asowp-m-0">
                                    <span class="asowp-font-medium">{{__("Preview:", "all-signs-options-pro")}}</span> 
                                    {{__("Customers buying", "all-signs-options-pro")}} {{ discounts[key].quantity }}+ {{__("items will get", "all-signs-options-pro")}} {{ discounts[key].discountPercentage }}% {{__("off", "all-signs-options-pro")}}
                                </p>
                            </div>
                        </div>

                        <!-- Add More Button -->
                        <div class="asowp-pt-4 asowp-border-t asowp-border-[#E5E7EB]">
                            <button @click="handleAddMaterialDiscount" 
                                    :disabled="isLoading"
                                    class="asowp-flex asowp-items-center asowp-cursor-pointer asowp-space-x-2 asowp-border asowp-border-[#016464] asowp-px-4 asowp-py-2 asowp-rounded-lg asowp-bg-[#016464] asowp-text-white asowp-transition-all asowp-duration-200 disabled:asowp-opacity-50 disabled:asowp-cursor-not-allowed">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="asowp-w-4 asowp-h-4">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                                <span class="asowp-font-medium asowp-text-sm">{{__("Add Another Discount", "all-signs-options-pro")}}</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Actions Footer -->
            <div class=" asowp-flex asowp-justify-end asowp-px-4 asowp-py-4 asowp-rounded-lg asowp-shadow-sm">
                <button @click="updateMaterialDiscounts" 
                        :disabled="isLoading || !isFormValid"
                        class="asowp-flex asowp-items-center asowp-space-x-2 asowp-cursor-pointer asowp-bg-[#016464] asowp-text-white asowp-px-6 asowp-py-3 asowp-rounded-lg asowp-font-medium hover:asowp-bg-[#014d4d] asowp-transition-all asowp-duration-200 disabled:asowp-opacity-50 disabled:asowp-cursor-not-allowed"
                        :class="{'asowp-opacity-50 asowp-cursor-not-allowed': !isFormValid}">
                    <div v-if="isLoading" class="asowp-w-4 asowp-h-4">
                        <img src="../../../../../../../assets/icons/ic_loading_gray.svg" class="asowp-w-full asowp-h-full" alt="Loading..."/>
                    </div>
                    <svg v-else class="asowp-w-4 asowp-h-4" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2.5 1.25C2.16848 1.25 1.85054 1.3817 1.61612 1.61612C1.3817 1.85054 1.25 2.16848 1.25 2.5V17.5C1.25 17.8315 1.3817 18.1495 1.61612 18.3839C1.85054 18.6183 2.16848 18.75 2.5 18.75H17.5C17.8315 18.75 18.1495 18.6183 18.3839 18.3839C18.6183 18.1495 18.75 17.8315 18.75 17.5V2.5C18.75 2.16848 18.6183 1.85054 18.3839 1.61612C18.1495 1.3817 17.8315 1.25 17.5 1.25H11.875C11.5435 1.25 11.2255 1.3817 10.9911 1.61612C10.7567 1.85054 10.625 2.16848 10.625 2.5V11.6163L13.9325 8.3075C14.0499 8.19014 14.209 8.12421 14.375 8.12421C14.541 8.12421 14.7001 8.19014 14.8175 8.3075C14.9349 8.42486 15.0008 8.58403 15.0008 8.75C15.0008 8.91597 14.9349 9.07514 14.8175 9.1925L10.4425 13.5675C10.3844 13.6257 10.3155 13.6719 10.2395 13.7034C10.1636 13.7349 10.0822 13.7511 10 13.7511C9.91779 13.7511 9.83639 13.7349 9.76046 13.7034C9.68453 13.6719 9.61556 13.6257 9.5575 13.5675L5.1825 9.1925C5.12439 9.13439 5.07829 9.0654 5.04685 8.98948C5.0154 8.91356 4.99921 8.83218 4.99921 8.75C4.99921 8.66782 5.0154 8.58644 5.04685 8.51052C5.07829 8.4346 5.12439 8.36561 5.1825 8.3075C5.24061 8.24939 5.3096 8.20329 5.38552 8.17185C5.46144 8.1404 5.54282 8.12421 5.625 8.12421C5.70718 8.12421 5.78856 8.1404 5.86448 8.17185C5.9404 8.20329 6.00939 8.24939 6.0675 8.3075L9.375 11.6163V2.5C9.375 1.83696 9.63839 1.20107 10.1072 0.732233C10.5761 0.263392 11.212 0 11.875 0L17.5 0C18.163 0 18.7989 0.263392 19.2678 0.732233C19.7366 1.20107 20 1.83696 20 2.5V17.5C20 18.163 19.7366 18.7989 19.2678 19.2678C18.7989 19.7366 18.163 20 17.5 20H2.5C1.83696 20 1.20107 19.7366 0.732233 19.2678C0.263392 18.7989 0 18.163 0 17.5V2.5C0 1.83696 0.263392 1.20107 0.732233 0.732233C1.20107 0.263392 1.83696 0 2.5 0L5.625 0C5.79076 0 5.94973 0.065848 6.06694 0.183058C6.18415 0.300269 6.25 0.45924 6.25 0.625C6.25 0.79076 6.18415 0.949732 6.06694 1.06694C5.94973 1.18415 5.79076 1.25 5.625 1.25H2.5Z"/>
                    </svg>
                    <span>{{__("Save Changes", "all-signs-options-pro")}}</span>
                </button>
            </div>
        </div>
    </div>
</template>
<script setup>
    import { ref, onMounted, computed, watch } from "vue";
    import api from "@/admin/Api/api";
    import { useRoute } from 'vue-router';
    import toastMessage from "@/admin/utils/functions";
import { __, _x, _n, _nx, sprintf, setLocaleData } from "@wordpress/i18n";
const route = useRoute()
    const configID = ref(route.params.configId);
    const materialId = ref(route.params.materialId);
    const discounts = ref([{
        quantity: 0,
        discountPercentage: 0
    }]);
    
    const errors = ref({});

    onMounted(async () => {
        isFetching.value = true;
        await fetchDiscounts();
    });

    const isFetching = ref(false);
    const isLoading = ref(false);

        const isFormValid = computed(() => {
        if (!Array.isArray(discounts.value)) {
            return true;
        }
        return Object.keys(errors.value).length === 0 && 
            (discounts.value || []).every(discount => 
                discount.quantity > 0 && 
                discount.discountPercentage > 0 && 
                discount.discountPercentage <= 100
            );
    });

    // Watcher pour valider automatiquement quand les discounts changent
    watch(discounts, () => {
        validateAllDiscounts();
    }, { deep: true });

    const fetchDiscounts = async () => {
        const result = await api.getMaterialSimpleDiscounts(configID.value, materialId.value);
        console.log("rsultat des  recherches", result);
        if (Array.isArray(result) ) {
            discounts.value = result;
        }
        isFetching.value = false;
        // Valider après le fetch
        validateAllDiscounts();
    }

    const updateMaterialDiscounts = async () => {
        // Validation finale avant envoi
        if (!validateAllDiscounts()) {
            toastMessage("Please correct the errors before saving", "error");
            return;
        }

        isLoading.value = true;
        const result = await api.updateMaterialSimpleDiscount(configID.value, materialId.value, discounts.value);
        if (result.success) {
            isLoading.value = false;
            if (result.success == true) {
                toastMessage(result.message)
            } else {
                toastMessage(result.message, "warning");
            }
        } else {
            isLoading.value = false;
            toastMessage(result.message, "error");
        }
    }

    const handleAddMaterialDiscount = () => {

        const lastDiscount = discounts.value[discounts.value.length - 1];
        const newQuantity = lastDiscount ? lastDiscount.quantity + 1 : 1;
        
        discounts.value.push({ 
            quantity: newQuantity, 
            discountPercentage: 0 
        });
    };

    const handleDeleteDiscount = (index) => {
        discounts.value.splice(index, 1);
        delete errors.value[index];
        
        // Réorganiser les erreurs après suppression
        const newErrors = {};
        Object.keys(errors.value).forEach(key => {
            const numKey = parseInt(key);
            if (numKey > index) {
                newErrors[numKey - 1] = errors.value[key];
            } else if (numKey < index) {
                newErrors[numKey] = errors.value[key];
            }
        });
        errors.value = newErrors;
        
        // Revalider tous les discounts
        validateAllDiscounts();
    };

    // Validation de la quantité
    const validateQuantity = (index) => {
        const currentQuantity = parseFloat(discounts.value[index].quantity);
        
        // Initialiser l'objet d'erreur pour cet index s'il n'existe pas
        if (!errors.value[index]) {
            errors.value[index] = {};
        }

        // Vérifier si c'est un nombre valide
        if (isNaN(currentQuantity) || currentQuantity <= 0) {
            errors.value[index].quantity = "Quantity must be a positive number";
            return false;
        }

        // Vérifier si la quantité est supérieure à la précédente
        if (index > 0) {
            const previousQuantity = parseFloat(discounts.value[index - 1].quantity);
            if (currentQuantity <= previousQuantity) {
                errors.value[index].quantity = `Quantity must be greater than ${previousQuantity}`;
                return false;
            }
        }

        // Vérifier si la quantité suivante est toujours valide
        if (index < discounts.value.length - 1) {
            const nextQuantity = parseFloat(discounts.value[index + 1].quantity);
            if (!isNaN(nextQuantity) && nextQuantity <= currentQuantity) {
                validateQuantity(index + 1); // Revalider la suivante
            }
        }

        // Supprimer l'erreur si tout est OK
        delete errors.value[index].quantity;
        if (Object.keys(errors.value[index]).length === 0) {
            delete errors.value[index];
        }
        
        return true;
    };

    // Validation du pourcentage de discount
    const validateDiscountPercentage = (index) => {
        const currentPercentage = parseFloat(discounts.value[index].discountPercentage);
        
        // Initialiser l'objet d'erreur pour cet index s'il n'existe pas
        if (!errors.value[index]) {
            errors.value[index] = {};
        }

        // Vérifier si c'est un nombre valide
        if (isNaN(currentPercentage) || currentPercentage <= 0) {
            errors.value[index].discountPercentage = "Percentage must be a positive number";
            return false;
        }

        // Vérifier si le pourcentage est <= 100
        if (currentPercentage > 100) {
            errors.value[index].discountPercentage = "Percentage cannot exceed 100%";
            return false;
        }

        // Supprimer l'erreur si tout est OK
        delete errors.value[index].discountPercentage;
        if (Object.keys(errors.value[index]).length === 0) {
            delete errors.value[index];
        }
        
        return true;
    };

    // Validation de tous les discounts
    const validateAllDiscounts = () => {
        let isValid = true;
        if (Array.isArray(discounts.value)) {
            discounts.value.forEach((discount, index) => {
                const quantityValid = validateQuantity(index);
                const percentageValid = validateDiscountPercentage(index);
                
                if (!quantityValid || !percentageValid) {
                    isValid = false;
                }
            });
        }
        
        return isValid;
    };
</script>