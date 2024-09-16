<script setup>
import { useUserStore } from "@/stores/user";

definePageMeta({ layout: "" });

const store = useUserStore();
const { $axios } = useNuxtApp();

const email = ref("");
const password = ref("");

// Toaster state
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

const submitForm = async () => {
  store.setLoading(true);
  try {
    const response = await $axios.post("/auth/local/signin", {
      email: email.value,
      password: password.value,
    });

    // Set tokens in Pinia store
    store.setToken(response.data.access_token);
    store.setRefreshToken(response.data.refresh_token);

    // Set tokens in cookies
    const accessTokenCookie = useCookie("access_token");
    const refreshTokenCookie = useCookie("refresh_token");
    const profileCookie = useCookie("profile");
    const verifiedCookie = useCookie("verified");
    accessTokenCookie.value = response.data.access_token;
    refreshTokenCookie.value = response.data.refresh_token;
    profileCookie.value = response.data.profile;
    verifiedCookie.value = response.data.verified;

    // Redirect after setting cookies
    if (!response.data.verified) {
      showToast("Please Create your profile", "success");
      navigateTo("/profile"); // Example redirection
    } else {
      navigateTo("/");
    }
  } catch (error) {
    showToast("Login failed", "error");
  } finally {
    store.setLoading(false);
  }
};

const loginWithGoogle = () => {
  window.location.href = `${$axios.defaults.baseURL}/auth/google/login`;
};
</script>

<template>
  <div
    class="flex w-full h-screen bg-gradient-to-r from-blue-500 to-indigo-500 justify-center items-center"
  >
    <!-- Toaster -->
    <div
      v-if="showToaster"
      :class="toasterType === 'success' ? 'bg-green-500' : 'bg-red-500'"
      class="fixed top-5 right-5 p-4 rounded-lg text-white shadow-lg z-50 transition-all transform ease-out"
    >
      {{ toasterMessage }}
    </div>

    <div class="flex w-full h-full">
      <!-- Left Section -->
      <div
        class="hidden lg:flex w-[38%] h-full flex-col justify-center items-center"
      >
        <!-- <img
          class="w-32 mb-4 h-auto object-contain"
          src="/assets/img/logo_white.webp"
          alt="logo"
        /> -->
        <h1 class="font-bold text-7xl text-white text-center mb-10">Afalagi</h1>
        <p class="font-semibold text-3xl text-white text-center mb-5 w-4/5">
          Connecting Hearts, Finding Hope
        </p>
      </div>

      <!-- Right Section -->
      <div
        class="w-full lg:w-[62%] h-full bg-white flex flex-col gap-8 justify-center items-center p-8 lg:p-16 rounded-lg shadow-xl"
      >
        <h1 class="text-[var(--primary-color)] font-semibold text-4xl">
          Login
        </h1>
        <form
          @submit.prevent="submitForm"
          class="flex flex-col w-full max-w-md gap-6"
        >
          <input
            type="email"
            v-model="email"
            placeholder="Email"
            required
            class="p-3 w-full border border-gray-300 rounded-lg text-slate-700 placeholder-gray-400 focus:border-[var(--secondary-color)] focus:ring-2 focus:ring-[var(--secondary-color)] transition-all outline-none"
          />

          <input
            type="password"
            v-model="password"
            placeholder="Password"
            required
            class="p-3 w-full border border-gray-300 rounded-lg text-slate-700 placeholder-gray-400 focus:border-[var(--secondary-color)] focus:ring-2 focus:ring-[var(--secondary-color)] transition-all outline-none"
          />
          <nuxt-link
            class="text-[var(--secondary-color)] self-end mt-1"
            to="/auth/reset-password"
            >Forgot Password?</nuxt-link
          >

          <button
            type="submit"
            class="w-full py-3 bg-[var(--secondary-color)] text-white rounded-lg shadow-lg hover:bg-blue-500 transition-all"
          >
            Login
          </button>
        </form>

        <button
          class="flex items-center justify-center w-full max-w-md py-3 bg-black text-white rounded-lg gap-3 shadow-lg hover:bg-gray-800 transition-all"
          @click="loginWithGoogle"
        >
          <Icon name="logos:google-icon" size="22px" />
          Continue with Google
        </button>

        <p class="text-center text-[var(--primary-color)]">
          Don't have an account?
          <NuxtLink
            class="text-[var(--secondary-color)] font-semibold"
            to="/auth/signup"
            >Signup</NuxtLink
          >
        </p>
      </div>
    </div>
  </div>
</template>
