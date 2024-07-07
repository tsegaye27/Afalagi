<template>
  <div class="flex w-[100%] h-[100vh] justify-center items-center">
    <div class="w-[38.19%] h-[100%]">
      <h1
        class="fixed font-bold text-[82px] text-white text-center mt-[2rem] w-[30%] h-[96px]"
      >
        Afalagi
      </h1>
      <p
        class="fixed font-[poppins] text-center font-semibold text-[36px] text-white mt-[10.5rem] w-[478px] h-[130px] z-1"
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
      class="right w-[61.81%] h-[100vh] flex flex-col gap-[58px] justify-start items-center"
    >
      <h1
        class="text-center font-semibold mt-[1rem] text-[82px] text-[#676767]"
      >
        Login
      </h1>
      <FormCard formType="login"/>
      <p>
        Don't have an account? <NuxtLink to="/auth/signup">Signup</NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup></script>
