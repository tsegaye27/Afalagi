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
      class="h-[41px] rounded-[8px_0_0_8px] w-[400px] pl-4 border-2 border-[#0097d3] text-[#005782] outline-none"
      placeholder="Search here..."
      v-model="input"
    />
    <button
      class="p-2 h-[41px] bg-[#0097d3] rounded-[0_8px_8px_0] z-10 text-white"
      @click="handleSearch"
    >
      <span class="flex justify-center items-center"
        ><Icon name="material-symbols:search" size="24px"
      /></span>
    </button>
  </div>
</template>
