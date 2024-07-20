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
      <h1 class="text-[#005782] font-semibold text-4xl">Signup</h1>
      <form
        @submit.prevent="submitForm"
        class="form-card flex flex-col w-[40%] rounded-md py-[3rem] border border-[#005782] justify-start gap-[1.5rem] items-center"
      >
        <div class="flex flex-col items-center w-[100%] py-[1rem]">
          <input
            type="email"
            v-model="email"
            placeholder="Email"
            required
            class="input outline-none p-2 w-4/5 my-2 border border-gray-300 rounded"
          />
          <input
            type="password"
            v-model="password"
            placeholder="Password"
            required
            class="input outline-none p-2 w-4/5 my-2 border border-gray-300 rounded"
          />
          <input
            type="password"
            v-model="confirmPassword"
            placeholder="Confrim Password"
            required
            class="input outline-none p-2 w-4/5 my-2 border border-gray-300 rounded"
          />
        </div>
        <div class="flex flex-col items-center gap-[1rem] justify-center">
          <button
            type="submit"
            class="px-4 py-2 bg-[#0097d3] flex gap-[0.5rem] text-white rounded-lg"
          >
            <span class="flex items-center"
              ><Icon name="ri:user-add-line" size="22px"
            /></span>
            Signup
          </button>
          <button
            class="m-4 px-4 py-2 bg-[#b2b2b2] flex gap-[0.8rem] justify-center w-[250px] text-white rounded-lg"
            @click="loginWithGoogle"
          >
            <span class="flex items-center"
              ><Icon name="mdi:google" size="22px"
            /></span>
            Signup with Google
          </button>
        </div>
      </form>
      <p class="text-center mt-4">
        Already have an account?
        <NuxtLink class="text-blue-500" to="/auth/login">Login</NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup>
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
