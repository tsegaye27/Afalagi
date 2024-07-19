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
        src="/assets/img/signup.png"
        alt="two-people-hugging"
      />
    </div>
    <div
      class="right w-[61.81%] h-[100vh] flex flex-col gap-[58px] justify-center items-center"
    >
      <!-- <Toast /> -->
      <form @submit.prevent="submitForm" class="form-card">
        <input
          type="email"
          v-model="email"
          placeholder="Email"
          required
          class="input"
        />
        <input
          type="password"
          v-model="password"
          placeholder="Password"
          required
          class="input"
        />
        <input
          type="text"
          v-model="confirmPassword"
          placeholder="confirmPassword"
          required
          class="input"
        />
        <button type="submit" class="btn">Sign Up</button>

        <button class="btn m-4" @click="loginWithGoogle">
          Sign up with Google
        </button>
      </form>
      <p>
        Already have an account?
        <NuxtLink class="text-[#0097d3]" to="/auth/login">Login</NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup>
// import { ToastService } from 'primevue/toastservice';
// import { Toast } from 'primevue/toast';

// const toastService = new ToastService();

definePageMeta({ layout: "" });

const confirmPassword = ref("");
const email = ref("");
const password = ref("");

const { $axios } = useNuxtApp();

const submitForm = async () => {
  try {
    const response = await $axios.post("/auth/local/signup", {
      passwordConfirm: confirmPassword.value,
      email: email.value,
      password: password.value,
    });
    console.log("Signup successful:", response.data);
    // Redirect to login page or dashboard after successful signup
  } catch (error) {
    console.error(
      "Signup failed:",
      error.response ? error.response.data : error.message
    );
    // Handle error, show error message to user

    //   ToastService.add({
    //   severity: 'success',
    //   summary: 'Success!',
    //   detail: error.response.data,
    //   life: 3000 // Adjust duration (optional)
    // });
  }
};

const loginWithGoogle = async () => {
  try {
    const response = await $axios.get("/auth/google/login");
    console.log("log in successful:", response.data);
    router.push("/auth/verification");
    // Redirect to login page or dashboard after successful signup
  } catch (error) {
    console.error(
      "login failed:",
      error.response ? error.response.data : error.message
    );
  }
};
</script>

<style scoped>
.input {
  padding: 0.5rem;
  margin: 0.5rem 0;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.btn {
  padding: 0.5rem 1rem;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.form-card {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
  padding: 2rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
</style>
