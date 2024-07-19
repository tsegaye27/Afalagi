<script setup>
const verificationCode = ref([]);
const verify = () => {
  if (verificationCode.value) {
    navigateTo("/");
  }
};
</script>
<template>
  <div class="flex w-[100%] justify-center gap-[5rem] items-center">
    <input
      type="text"
      :id="1"
      :maxlength="1"
      :value="0"
      class="w-[50px] h-[50px] text-center text-[#868686] text-[1.75rem] border-2 border-[#788dd5] outline-none rounded-lg"
    />
    <input
      type="text"
      :id="2"
      :maxlength="1"
      :value="1"
      class="w-[50px] h-[50px] text-center text-[#868686] text-[1.75rem] border-2 border-[#788dd5] outline-none rounded-lg"
    />
    <input
      type="text"
      :id="3"
      :maxlength="1"
      :value="2"
      class="w-[50px] h-[50px] text-center text-[#868686] text-[1.75rem] border-2 border-[#788dd5] outline-none rounded-lg"
    />
    <input
      type="text"
      :id="4"
      :maxlength="1"
      :value="2"
      class="w-[50px] h-[50px] text-center text-[#868686] text-[1.75rem] border-2 border-[#788dd5] outline-none rounded-lg"
    />
    <input
      type="text"
      :id="5"
      :maxlength="1"
      :value="2"
      class="w-[50px] h-[50px] text-center text-[#868686] text-[1.75rem] border-2 border-[#788dd5] outline-none rounded-lg"
    />
    <input
      type="text"
      :id="4"
      @input="verify"
      :value="verificationCode.value"
      class="w-[50px] h-[50px] text-center text-[#868686] text-[1.75rem] border-2 border-[#788dd5] outline-none rounded-lg"
    />
  </div>
</template>
