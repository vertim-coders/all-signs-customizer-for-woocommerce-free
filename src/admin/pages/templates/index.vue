<template>
<<<<<<< HEAD
    <div class="asowp-mt-2">
        <div v-if="!isFetching" class="asowp-space-y-1 asowp-rounded-xl asowp-sticky asowp-top-[80px] asowp-z-[999] asowp-w-full asowp-shadow-md asowp-flex asowp-justify-center asowp-items-center asowp-bg-[#f9f9f9] asowp-border asowp-border-solid asowp-border-[#e6e6e6]">
            <div class="asowp-p-2 asowp-space-x-6 asowp-justify-center asowp-items-center asowp-flex">
                <button @click="state='templates'" :class="`asowp-flex asowp-text-[14px] asowp-px-6 asowp-p-2 asowp-w-fit asowp-h-fit asowp-bg-white asowp-rounded asowp-border-none asowp-font-semibold ${ state == 'templates' ?'asowp-font-bold asowp-text-[#016464] asowp-bg-[#e5eded]':''} hover:asowp-bg-[#e5eded] hover:asowp-text-[#016464] asowp-cursor-pointer`" >Templates</button>
                <button @click="state='category'" :class="`asowp-flex asowp-text-[14px] asowp-px-6 asowp-p-2 asowp-w-fit asowp-h-fit asowp-bg-white asowp-rounded asowp-border-none asowp-font-semibold ${ state == 'category' ?'asowp-font-bold asowp-text-[#016464] asowp-bg-[#fff]':''} hover:asowp-bg-[#fff] hover:asowp-text-[#016464] asowp-cursor-pointer`" >Categories</button>
=======
    <div class="">
        <div v-if="!isFetching" class="asowp-space-y-1 asowp-sticky asowp-top-[80px] asowp-z-[999] asowp-w-full asowp-shadow-md asowp-flex asowp-justify-center asowp-items-center asowp-bg-[#F4F4F4] ">
            <div class="asowp-bg-[#F4F4F4] asowp-p-2 asowp-space-x-6 asowp-justify-center asowp-items-center asowp-flex">
                <button @click="state='templates'" :class="`asowp-flex asowp-text-[14px] asowp-px-6 asowp-p-2 asowp-w-fit asowp-h-fit asowp-bg-white asowp-rounded asowp-border-none asowp-font-semibold ${ state == 'templates' ?'asowp-font-bold asowp-text-[#016464] asowp-bg-[#E1E1E1]':''} hover:asowp-bg-[#E1E1E1] hover:asowp-text-[#016464] asowp-cursor-pointer`" >Templates</button>
                <button @click="state='category'" :class="`asowp-flex asowp-text-[14px] asowp-px-6 asowp-p-2 asowp-w-fit asowp-h-fit asowp-bg-white asowp-rounded asowp-border-none asowp-font-semibold ${ state == 'category' ?'asowp-font-bold asowp-text-[#016464] asowp-bg-[#E1E1E1]':''} hover:asowp-bg-[#E1E1E1] hover:asowp-text-[#016464] asowp-cursor-pointer`" >Categories</button>
>>>>>>> 5550fb22cb3f0a2454b4bdd690703964730bfc18
            </div>
        </div>
        <div class="asowp-py-4">
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