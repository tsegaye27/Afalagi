<script setup>
import { useUserStore } from "@/stores/user";

const store = useUserStore();

console.log(store);

const inputs = ref(["", "", "", "", "", ""]);
const verify = () => {
  const verificationCode = inputs.value.join("");
};
</script>
<template>
  <div class="flex w-[100%] justify-center gap-[5rem] items-center">
    <input
      v-for="(input, index) in inputs"
      v-model="inputs[index]"
      type="text"
      :maxlength="1"
      class="w-[50px] h-[50px] text-center text-[var(--primary-color)] text-[1.75rem] border-2 border-[var(--secondary-color)] outline-none rounded-lg"
    />
    <!-- <input
    type="text"
      :maxlength="1"
      class="w-[50px] h-[50px] text-center text-[var(--primary-color)] text-[1.75rem] border-2 border-[var(--secondary-color)] outline-none rounded-lg"
    />
    <input
      type="text"
      :maxlength="1"
      class="w-[50px] h-[50px] text-center text-[var(--primary-color)] text-[1.75rem] border-2 border-[var(--secondary-color)] outline-none rounded-lg"
    />
    <input
      type="text"
      :maxlength="1"
      class="w-[50px] h-[50px] text-center text-[var(--primary-color)] text-[1.75rem] border-2 border-[var(--secondary-color)] outline-none rounded-lg"
    />
    <input
      type="text"
      :maxlength="1"
      class="w-[50px] h-[50px] text-center text-[var(--primary-color)] text-[1.75rem] border-2 border-[var(--secondary-color)] outline-none rounded-lg"
    />
    <input
      type="text"
      :maxlength="1"
      class="w-[50px] h-[50px] text-center text-[var(--primary-color)] text-[1.75rem] border-2 border-[var(--secondary-color)] outline-none rounded-lg"
    /> -->
  </div>
  <button
    class="p-3 rounded-md text-white bg-[var(--secondary-color)]"
    @click="verify"
  >
    Verify
  </button>
</template>
