<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="text-center">
      <h1 class="text-6xl font-bold text-red-500">
        {{ error.statusCode === 404 ? "404" : "Error" }}
      </h1>
      <p class="text-2xl mt-4">
        {{ error.statusCode === 404 ? "Page Not Found" : error.message }}
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
const error = useError();
</script>

<style scoped>
html,
body {
  margin: 0;
  padding: 0;
}
</style>
