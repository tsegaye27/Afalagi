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

    <!-- Loading Spinner -->
    <div v-if="store.isLoading">
      <Spinner />
    </div>

    <div class="flex w-full h-full">
      <!-- Left Section -->
      <div
        class="hidden lg:flex w-[38%] h-full flex-col justify-center items-center"
      >
        <h1 class="font-bold text-7xl text-white text-center mb-10">Afalagi</h1>
        <p class="font-semibold text-3xl text-white text-center mb-5 w-4/5">
          Connecting Hearts, Finding Hope
        </p>
        <!-- <img
          class="w-80 object-cover rounded-md shadow-lg"
          src="/assets/img/signup.webp"
          alt="two-people-hugging"
        /> -->
      </div>
      <!-- Right Section -->
      <div
        class="w-full lg:w-[62%] h-full bg-white flex flex-col gap-8 justify-center items-center p-8 lg:p-16 rounded-lg shadow-xl"
      >
        <h1 class="text-[var(--primary-color)] font-semibold text-4xl">
          Signup
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
            class="p-3 w-full border border-gray-300 rounded-lg text-[var(--primary-color)] placeholder-gray-400 focus:border-[var(--secondary-color)] focus:ring-2 focus:ring-[var(--secondary-color)] transition-all outline-none"
          />

          <input
            type="password"
            v-model="password"
            placeholder="Password"
            required
            class="p-3 w-full border border-gray-300 rounded-lg text-[var(--primary-color)] placeholder-gray-400 focus:border-[var(--secondary-color)] focus:ring-2 focus:ring-[var(--secondary-color)] transition-all outline-none"
          />
          <input
            type="password"
            v-model="passwordConfirm"
            placeholder="Confirm Password"
            required
            class="p-3 w-full border border-gray-300 rounded-lg text-[var(--primary-color)] placeholder-gray-400 focus:border-[var(--secondary-color)] focus:ring-2 focus:ring-[var(--secondary-color)] transition-all outline-none"
          />

          <button
            type="submit"
            class="w-full py-3 bg-[var(--secondary-color)] text-white rounded-lg shadow-lg hover:bg-blue-500 transition-all"
          >
            Signup
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
          Already have an account?
          <NuxtLink
            class="text-[var(--secondary-color)] font-semibold"
            to="/auth/login"
            >Login</NuxtLink
          >
        </p>
      </div>
    </div>
  </div>
</template>

<style></style>

<script setup>
import { ref } from "vue";
import { useUserStore } from "@/stores/user";
definePageMeta({ layout: "" });

const store = useUserStore();
const { $axios } = useNuxtApp();

const passwordConfirm = ref("");
const email = ref("");
const password = ref("");
const toasts = ref([]);

onMounted(() => {
  store.setLoading(false);
});

const submitForm = async () => {
  store.setLoading(true);
  if (password.value.length <= 6) {
    showToast("Password must be greater than 6 characters.");
    store.setLoading(false);
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
    // Set tokens in cookies
    const accessTokenCookie = useCookie("access_token");
    const refreshTokenCookie = useCookie("refresh_token");
    const profileCookie = useCookie("profile");
    const verifiedCookie = useCookie("verified");
    accessTokenCookie.value = response.data.access_token;
    refreshTokenCookie.value = response.data.refresh_token;
    profileCookie.value = response.data.profile;
    verifiedCookie.value = response.data.verified;
    // showToast("Signup successful", "success");
    navigateTo("/auth/verification");
  } catch (error) {
    showToast(
      error.response ? error.response.data.message : error.message,
      "error"
    );
    console.error(
      "Signup failed:",
      error.response ? error.response.data : error.message
    );
    // const messages = Array.isArray(error.response?.data?.message)
    //   ? error.response.data.message
    //   : [error.response?.data?.message || error.response?.data];
    // messages.forEach((msg) => showToast(msg));
  } finally {
    store.setLoading(false);
  }
};

const loginWithGoogle = () => {
  window.location.href = `${$axios.defaults.baseURL}/auth/google/login`;
};

const showToast = (message) => {
  toasts.value.push({ message });
  setTimeout(() => {
    toasts.value.shift();
  }, 5000);
};
</script>
