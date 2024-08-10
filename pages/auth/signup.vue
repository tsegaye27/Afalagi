<template>
  <div class="signup flex w-[100%] h-[100vh] justify-center items-center">
    <!-- Toaster -->
    <div
      v-for="(toast, index) in toasts"
      :key="index"
      class="fixed top-4 right-4 bg-red-500 text-white py-2 px-4 rounded shadow-lg mt-2"
    >
      {{ toast.message }}
    </div>
    <!-- Signup Content -->
    <div class="w-[38.19%] h-[100%]">
      <h1
        class="fixed font-bold text-[82px] text-white text-center mt-[2rem] w-[30%] h-[96px]"
      >
        Afalagi
      </h1>
      <p
        class="fixed font-[sora] text-center font-semibold text-[36px] text-white mt-[10.5rem] w-[478px] h-[130px] z-1"
      >
        Connecting Hearts, Finding Hope
      </p>
      <img
        class="object-fit w-[500px] h-full"
        src="/assets/img/signup.webp"
        alt="two-people-hugging"
      />
    </div>
    <div
      class="right w-[61.81%] h-[100vh] flex flex-col gap-[2rem] justify-center items-center"
    >
      <h1 class="text-[var(--primary-color)] font-semibold text-4xl">Signup</h1>
      <form
        @submit.prevent="submitForm"
        class="form-card flex flex-col w-[40%] rounded-md py-[3rem] border border-[var(--secondary-color)] justify-start gap-[1.5rem] items-center"
      >
        <div class="flex flex-col items-center w-[100%] py-[1rem]">
          <input
            type="email"
            v-model="email"
            placeholder="Email"
            required
            class="text-[var(--primary-color)] input outline-none p-2 w-4/5 my-2 border border-[var(--secondary-color)] rounded"
          />
          <p v-if="errors.email" class="text-red-500 text-sm">{{ errors.email }}</p>
          <input
            type="password"
            v-model="password"
            placeholder="Password"
            required
            class="text-[var(--primary-color)] input outline-none p-2 w-4/5 my-2 border border-[var(--secondary-color)] rounded"
          />
          <p v-if="errors.password" class="text-red-500 text-sm">{{ errors.password }}</p>
          <input
            type="password"
            v-model="passwordConfirm"
            placeholder="Confirm Password"
            required
            class="text-[var(--primary-color)] input outline-none p-2 w-4/5 my-2 border border-[var(--secondary-color)] rounded"
          />
          <p v-if="errors.passwordConfirm" class="text-red-500 text-sm">{{ errors.passwordConfirm }}</p>
        </div>
        <div class="flex flex-col items-center gap-[1rem] justify-center">
          <button
            type="submit"
            class="px-4 py-2 bg-[var(--secondary-color)] flex gap-[0.5rem] text-white rounded-lg"
          >
            <span class="flex items-center"
              ><Icon name="ri:user-add-line" size="22px"
            /></span>
            Signup
          </button>
        </div>
      </form>
      <button
        class="m-4 px-4 py-2 bg-[var(--primary-color)] flex gap-[0.8rem] justify-center w-[250px] text-white rounded-lg"
        @click="loginWithGoogle"
      >
        <span class="flex items-center"
          ><Icon name="mdi:google" size="22px"
        /></span>
        Continue with Google
      </button>
      <p class="text-center mt-4">
        Already have an account?
        <NuxtLink class="text-blue-500" to="/auth/login">Login</NuxtLink>
      </p>
    </div>
  </div>
</template>

<style></style>

<script setup>
import { ref } from 'vue';
import { useUserStore } from "@/stores/user";
definePageMeta({ layout: "" });

const store = useUserStore();
const { $axios } = useNuxtApp();

const passwordConfirm = ref("");
const email = ref("");
const password = ref("");
const errors = ref({ email: "", password: "", passwordConfirm: "" });
const toasts = ref([]);

const validateForm = () => {
  errors.value.email = "";
  errors.value.password = "";
  errors.value.passwordConfirm = "";

  if (password.value.length <= 6) {
    errors.value.password = "Password must be greater than 6 characters.";
  }

  if (passwordConfirm.value !== password.value) {
    errors.value.passwordConfirm = "Passwords do not match.";
  }

  return !errors.value.password && !errors.value.passwordConfirm;
};

const submitForm = async () => {
  if (!validateForm()) {
    return;
  }

  try {
    const response = await $axios.post("/auth/local/signup", {
      passwordConfirm: passwordConfirm.value,
      email: email.value,
      password: password.value,
    });
    console.log("Signup successful:", response.data);
    store.setEmail(email.value);
    store.setToken(response.data.access_token);
    store.setRefreshToken(response.data.refresh_token);
    navigateTo("/auth/verification");
  } catch (error) {
    console.error(
      "Signup failed:",
      error.response ? error.response.data : error.message
    );
    if (error.response && error.response.data) {
      const messages = error.response.data.message || [error.response.data];
      messages.forEach(msg => showToast(`["${msg}"]`));
    } else {
      showToast(`["${error.message}"]`);
    }
  }
};

const loginWithGoogle = async () => {
  console.log("login with google");
  try {
    await $axios.get("/auth/google/login");
  } catch (error) {
    console.error(
      "login failed:",
      error.response ? error.response.data : error.message
    );
    if (error.response && error.response.data) {
      const messages = error.response.data.message || [error.response.data];
      messages.forEach(msg => showToast(`["${msg}"]`));
    } else {
      showToast(`["${error.message}"]`);
    }
  }
};

const showToast = (message) => {
  toasts.value.push({ message });
  setTimeout(() => {
    toasts.value.shift();
  }, 5000);
};
</script>
