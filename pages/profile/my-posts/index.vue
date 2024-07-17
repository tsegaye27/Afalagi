<script setup>
definePageMeta({ layout: "profile" });
</script>
<template>
  <div class="w-[80%] overflow-y-auto h-[40rem]">
    <h1 class="text-center font-semibold text-[25px] text-[#788dd5] mt-[3rem]">
      My Posts
    </h1>
    <hr class="my-[1rem]" />
    <div class="flex flex-wrap justify-start gap-[3rem] mx-[2rem]">
      <MissingCard />
      <MissingCard />
      <MissingCard />
      <MissingCard />
      <MissingCard />
    </div>
  </div>
</template>
