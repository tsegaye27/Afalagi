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
      class="h-[41px] rounded-[8px_0_0_8px] w-[400px] pl-4 border-2 border-[var(--secondary-color)] text-[var(--primary-color)] outline-none"
      placeholder="Search here..."
      v-model="input"
    />
    <button
      class="p-2 h-[41px] bg-[var(--secondary-color)] rounded-[0_8px_8px_0] z-10 text-white"
      @click="handleSearch"
    >
      <span class="flex justify-center items-center"
        ><Icon name="material-symbols:search" size="24px"
      /></span>
    </button>
  </div>
</template>
