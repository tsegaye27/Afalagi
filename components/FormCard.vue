<template>
  <div
    class="bg-white shadow-[0px_0px_4px_1px_#788DD5] w-[729px] h-[55%] rounded-lg"
    v-if="size === 4"
  >
    <form class="flex justify-center flex-col items-center gap-[1rem]">
      <p class="text-center text-[27px] my-[25px]">Create a new account</p>
      <div
        class="field flex pl-[0.85rem] justify-center gap-[3rem] items-center w-[100%] h-[40px]"
      >
        <label class="text-[#6F6F6F]">Name: </label>
        <input
          class="rounded-[7px] w-[352px] h-[40px] px-5 bg-[#F6F6F6] outline-none border border-gray-200 text-[#6f6f6f]"
          type="text"
          name="name"
          :value="name"
          placeholder="Enter your name here"
        />
      </div>
      <div
        class="field flex justify-center gap-[3rem] pl-[1rem] items-center w-[100%] h-[40px]"
      >
        <label class="text-[#6F6F6F]">Email: </label>
        <input
          class="rounded-[7px] w-[352px] h-[40px] px-5 bg-[#F6F6F6] outline-none border border-gray-200 text-[#6f6f6f]"
          type="email"
          name="email"
          :value="email"
          placeholder="Enter your email here"
        />
      </div>
      <div
        class="field flex justify-center pr-[1rem] gap-[3rem] items-center w-[100%] h-[40px]"
      >
        <label class="text-[#6F6F6F]">Password: </label>
        <input
          class="rounded-[7px] w-[352px] h-[40px] px-5 bg-[#F6F6F6] outline-none border border-gray-200 text-[#6f6f6f]"
          type="password"
          :value="password"
          name="password"
          placeholder="Enter your password here"
        />
      </div>
      <div
        class="field flex justify-center pr-[5rem] gap-[3rem] items-center w-[100%] h-[40px]"
      >
        <label class="text-[#6F6F6F]">Confirm Password: </label>
        <input
          class="rounded-[7px] w-[352px] h-[40px] px-5 bg-[#F6F6F6] outline-none border border-gray-200 text-[#6f6f6f]"
          type="password"
          :value="confirmPassword"
          name="confirmPassword"
          placeholder="Enter the password again"
        />
      </div>
      <button
        :onClick="addUser"
        class="flex justify-center items-center bg-[#788DD5] text-white w-[10rem] mt-4 h-[2.5rem] rounded-full"
      >
        <NuxtLink to="/home"> Submit </NuxtLink>
      </button>
    </form>
  </div>
  <div
    class="bg-white shadow-[0px_0px_4px_1px_#788DD5] w-[650px] h-[40%] rounded-lg"
    v-if="size === 2"
  >
    <form class="flex justify-center flex-col items-center gap-[1rem]">
      <p class="text-center text-[27px] my-[25px]">Login to your account</p>

      <div
        class="field flex justify-center gap-[3rem] pl-[1rem] items-center w-[100%] h-[40px]"
      >
        <label class="text-[#6F6F6F]">Email: </label>
        <input
          class="rounded-[7px] w-[352px] h-[40px] px-5 bg-[#F6F6F6] outline-none border border-gray-200 text-[#6f6f6f]"
          type="email"
          name="email"
          :value="email"
          placeholder="Enter your email here"
        />
      </div>
      <div
        class="field flex justify-center pr-[1rem] gap-[3rem] items-center w-[100%] h-[40px]"
      >
        <label class="text-[#6F6F6F]">Password: </label>
        <input
          class="rounded-[7px] w-[352px] h-[40px] px-5 bg-[#F6F6F6] outline-none border border-gray-200 text-[#6f6f6f]"
          type="password"
          :value="password"
          name="password"
          placeholder="Enter your password here"
        />
      </div>

      <button
        class="flex justify-center items-center bg-[#788DD5] text-white w-[10rem] mt-4 h-[2.5rem] rounded-full"
      >
        <NuxtLink to="/home"> Submit </NuxtLink>
      </button>
    </form>
  </div>
</template>

<script setup>
const size = ref(2);
</script>
