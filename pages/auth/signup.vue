<template>
  <div class="flex w-[100%] h-[100vh] justify-center items-center">
    <div class="left w-[38.19%] h-[100%]">
      <h1
        class="fixed font-bold text-[82px] text-white text-center mt-[4.5rem] w-[38.19%] h-[96px] z-0"
      >
        Afalagi
      </h1>
      <p
        class="fixed font-[poppins] text-center font-semibold text-[36px] text-white mt-[13rem] w-[478px] h-[130px] z-1"
      >
        Connecting Hearts, Finding Hope
      </p>
      <img
        class="object-fit w-[500px] h-full"
        src="/assets/img/signup.png"
        alt="two-people-hugging"
      />
    </div>
    <div
      class="right w-[61.81%] h-[680px] flex justify-between mt-[68px] items-center flex-col"
    >
      <h1 class="text-center font-semibold text-[82px] text-[#676767]">Signup</h1>
      <FormCard />
    </div>
  </div>
</template>

<script setup></script>
