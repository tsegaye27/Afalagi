<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="text-center">
      <h1 class="text-6xl font-bold text-red-500">
        {{ statusCode === 500 ? "500" : statusCode }}
      </h1>
      <p class="text-2xl mt-4">
        {{ statusCode === 500 ? "Internal Server Error" : message }}
      </p>
      <router-link
        to="/"
        class="mt-6 inline-block bg-blue-500 text-white py-2 px-4 rounded"
      >
        Go back home
      </router-link>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  error: Object,
  statusCode: Number,
  message: String,
});

const statusCode = props.statusCode || 500;
const message = props.message || "An error occurred";
</script>

<style scoped>
html,
body {
  margin: 0;
  padding: 0;
}
</style>
