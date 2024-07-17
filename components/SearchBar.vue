<script setup>
const input = ref("");
const handleSearch = () => {
  navigateTo("/posts");
};
</script>
<template>
  <div class="search h-[40px] flex">
    <input
      type="text"
      class="h-[41px] rounded-[18px_0_0_18px] pl-4 border-2 border-[#788dd5] text-[#868686] outline-none"
      placeholder="Search here..."
      v-model="input"
    />
    <button
      class="p-2 h-[41px] px-5 mr-3 bg-[#788DD5] rounded-[0_18px_18px_0] text-white"
      @click="handleSearch"
    >
      ->
    </button>
  </div>
</template>
