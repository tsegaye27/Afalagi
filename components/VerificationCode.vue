<script setup>
import { useUserStore } from "@/stores/user";
import { ref } from "vue";

const store = useUserStore();
const { $axios } = useNuxtApp();
const inputs = ref(["", "", "", "", "", ""]);

const focusNext = (index) => {
  if (index < inputs.value.length - 1) {
    const nextInput = document.getElementById(`input-${index + 1}`);
    if (nextInput) {
      nextInput.focus();
    }
  }
};

const verify = async () => {
  const verificationCode = inputs.value.join("") * 1;
  try {
    const response = await $axios.post(
      "/auth/verify-email",
      {
        email: store.email,
        verificationCode,
      },
      {
        headers: {
          Authorization: `Bearer ${store.token}`,
        },
      }
    );
    console.log("verification success", response.data);
    navigateTo("/profile");
  } catch (error) {
    console.error(
      "verification failed",
      error.response ? error.response.data : error.message
    );
  }
};
</script>

<template>
  <div class="flex w-[100%] justify-center gap-[1rem] items-center">
    <input
      v-for="(input, index) in inputs"
      :key="index"
      v-model="inputs[index]"
      type="text"
      :id="`input-${index}`"
      :maxlength="1"
      class="w-[50px] h-[50px] text-center text-[var(--primary-color)] text-[1.75rem] border-2 border-[var(--secondary-color)] outline-none rounded-lg"
      @input="focusNext(index)"
    />
  </div>
  <button
    class="p-3 mt-4 rounded-md text-white bg-[var(--secondary-color)]"
    @click="verify"
  >
    Verify
  </button>
</template>
