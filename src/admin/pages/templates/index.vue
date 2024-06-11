<template>
    <div class="">
        <div v-if="!isFetching" class="aso-space-y-1 aso-sticky aso-top-[80px] aso-z-[999] aso-w-full aso-shadow-md aso-flex aso-justify-center aso-items-center aso-bg-[#F4F4F4] ">
            <div class="aso-bg-[#F4F4F4] aso-p-2 aso-space-x-6 aso-justify-center aso-items-center aso-flex">
                <button @click="state='templates'" :class="`aso-flex aso-text-[14px] aso-px-6 aso-p-2 aso-w-fit aso-h-fit aso-bg-white aso-rounded aso-border-none aso-font-semibold ${ state == 'templates' ?'aso-font-bold aso-text-[#016464] aso-bg-[#E1E1E1]':''} hover:aso-bg-[#E1E1E1] hover:aso-text-[#016464] aso-cursor-pointer`" >Templates</button>
                <button @click="state='category'" :class="`aso-flex aso-text-[14px] aso-px-6 aso-p-2 aso-w-fit aso-h-fit aso-bg-white aso-rounded aso-border-none aso-font-semibold ${ state == 'category' ?'aso-font-bold aso-text-[#016464] aso-bg-[#E1E1E1]':''} hover:aso-bg-[#E1E1E1] hover:aso-text-[#016464] aso-cursor-pointer`" >Categories</button>
            </div>
        </div>
        <div class="aso-py-4">
            <Templates v-if="state == 'templates'"/>
            <Categories v-if="state=='category'"/>
        </div>
    </div>
</template>
<script setup>
import Templates from './templates.vue';
import Categories from './categories.vue'
    import { ref } from "vue";
    const createTemplate = ref(false);
    const state = ref('templates');
    const openModal = ref(false);

    const addTemplate = () =>{
        createTemplate.value = true;
    }
    const back = () =>{
        createTemplate.value = false;
    }
    const closeModal = ()=>{       
        openModal.value = !openModal.value;
    }
    const addCategory = ()=>{
        closeModal();
    }
</script>