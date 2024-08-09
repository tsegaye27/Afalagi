<script setup>
import { useUserStore } from "@/stores/user";
definePageMeta({ layout: "" });

const store = useUserStore();
const { $axios } = useNuxtApp();

const email = ref("");
const password = ref("");
const router = useRouter();

const submitForm = async () => {
  try {
    const response = await $axios.post("/auth/local/signin", {
      email: email.value,
      password: password.value,
    });
    console.log("log in successful:", response.data);
    store.setToken(response.data.access_token);
    store.setRefreshToken(response.data.refresh_token);
    navigateTo("/");
  } catch (error) {
    console.error(
      "login failed:",
      error.response ? error.response.data : error.message
    );
  }
};
const loginWithGoogle = () => {
  window.location.href = `${$axios.defaults.baseURL}/auth/google/login`;
  navigateTo("/");
};
</script>
<template>
  <div class="flex w-[100%] h-[100vh] justify-center items-center">
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
      <h1 class="text-[var(--primary-color)] font-semibold text-4xl">Login</h1>
      <!-- <Toast /> -->
      <form
        @submit.prevent="submitForm"
        class="form-card flex flex-col w-[40%] rounded-md py-[3rem] border border-[var(--secondary-color)] justify-start gap-[1rem] items-center"
      >
        <div class="flex flex-col items-center w-[100%] py-[1rem]">
          <input
            type="email"
            v-model="email"
            placeholder="Email"
            required
            class="input outline-none p-2 w-4/5 my-2 text-[var(--primary-color)] border border-[var(--secondary-color)] rounded"
          />
          <input
            type="password"
            v-model="password"
            placeholder="Password"
            required
            class="input outline-none p-2 w-4/5 my-2 text-[var(--primary-color)] border border-[var(--secondary-color)] rounded"
          />
          <nuxt-link
            class="text-[var(--secondary-color)] justify-self-start"
            to="/auth/reset-password"
            >Forgot Password?</nuxt-link
          >
        </div>
        <div class="flex flex-col items-center gap-[1rem] justify-center">
          <button
            type="submit"
            class="px-4 py-2 bg-[var(--secondary-color)] flex gap-[0.5rem] text-white rounded-lg"
          >
            <span class="flex items-center"
              ><Icon name="iconoir:log-in" size="22px"
            /></span>
            Login
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
      <p class="text-center text-[var(--primary-color)] mt-4">
        Don't have an account?
        <NuxtLink class="text-[var(--secondary-color)]" to="/auth/signup"
          >Signup</NuxtLink
        >
      </p>
    </div>
  </div>
</template>
