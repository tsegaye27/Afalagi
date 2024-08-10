<template>
    <div
      v-if="visible"
      :class="['toaster', type === 'success' ? 'bg-green-500' : 'bg-red-500']"
      class="fixed top-5 right-5 px-4 py-2 rounded shadow-lg text-white"
    >
      {{ message }}
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const props = defineProps({
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      default: 'success', // or 'error'
    },
    duration: {
      type: Number,
      default: 3000,
    },
  });
  
  const visible = ref(true);
  
  setTimeout(() => {
    visible.value = false;
  }, props.duration);
  </script>
  
  <style scoped>
  .toaster {
    transition: opacity 0.3s ease-in-out;
  }
  </style>
  