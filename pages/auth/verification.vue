<script setup>
definePageMeta({ layout: "" });
</script>
<template>
  <div class="h-[100vh] w-[100%] flex justify-center bg-[#f3f3f3] items-center">
    <div
      class="bg-white rounded-md shadow-md h-[65%] px-[2rem] py-[1rem] flex flex-col justify-center gap-[3rem] items-center"
    >
      <h1
        class="text-[var(--primary-color)] font-medium w-[70%] text-center text-[25px] uppercase"
      >
        we've sent a code to your email address please enter it below
      </h1>
      <VerificationCode />
    </div>
  </div>
</template>
