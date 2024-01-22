<template>
  <div id="vue-demo-site" class="flex justify-center items-center flex-col gap-x-4">
    <h1 class="font-[5em] text-[#800080] m-0">Hello Vue</h1>
    <h2 class="font-[2em] m-0">Counter: {{ count }}</h2>
    <button @click="increment" class="p-x-[25px] p-y-[10px] bg-[#800080] b-0 rounded-[6px] cursor-pointer mt-[50px]">Click Me</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const count = ref(0);

function increment() {
  count.value++;
}
</script>

<style scoped>
  
  
</style>