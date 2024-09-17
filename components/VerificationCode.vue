<script setup>
import { useUserStore } from "@/stores/user";

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

const focusPrev = (index) => {
  if (index > 0) {
    const prevInput = document.getElementById(`input-${index - 1}`);
    if (prevInput) {
      prevInput.focus();
    }
  }
};

const handleKeydown = (event, index) => {
  if (event.key === "ArrowRight") {
    focusNext(index);
  } else if (event.key === "ArrowLeft") {
    focusPrev(index);
  } else if (event.key === "Backspace") {
    if (inputs.value[index] === "") {
      focusPrev(index);
    }
  }
};

// Toaster
const showToaster = ref(false);
const toasterMessage = ref("");
const toasterType = ref(""); // success or error

const showToast = (message, type) => {
  toasterMessage.value = message;
  toasterType.value = type;
  showToaster.value = true;

  setTimeout(() => {
    showToaster.value = false;
  }, 5000); // Hide after 5 seconds
};

const verify = async () => {
  store.setLoading(true);
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
    showToast("Verification successful", "success");
    console.log("verification success", response.data);

    navigateTo("/profile");
    store.setLoading(false);
  } catch (error) {
    showToast("Verification failed", "error");
    console.error(
      "verification failed",
      error.response ? error.response.data : error.message
    );
    store.setLoading(false);
  }
};
</script>
<template>
  <div class="flex w-[100%] justify-center gap-[1rem] items-center">
    <div v-if="store.isLoading">
      <Spinner />
    </div>
    <div v-if="showToaster" class="fixed top-0 right-0 p-4">
      <div
        class="p-4 bg-[var(--secondary-color)] text-white rounded-md shadow-md"
        :class="toasterType === 'success' ? 'bg-green-500' : 'bg-red-500'"
      >
        {{ toasterMessage }}
      </div>
    </div>
    <input
      v-for="(input, index) in inputs"
      :key="index"
      v-model="inputs[index]"
      type="text"
      :id="`input-${index}`"
      :maxlength="1"
      class="w-[50px] h-[50px] text-center text-[var(--primary-color)] text-[1.75rem] border-2 border-[var(--secondary-color)] outline-none rounded-lg"
      @input="focusNext(index)"
      @keydown="handleKeydown($event, index)"
    />
  </div>
  <button
    class="p-3 mt-4 rounded-md text-white bg-[var(--secondary-color)]"
    @click="verify"
  >
    Verify
  </button>
</template>
