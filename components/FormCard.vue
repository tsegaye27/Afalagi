<template>
  <div
    class="bg-white shadow-[0px_0px_4px_1px_#788DD5] w-[729px] h-[55%] rounded-lg"
    v-if="size === 4"
  >
    <form
      class="flex justify-center flex-col items-center gap-[1rem]"
      @submit="handleSubmit"
    >
      <p class="text-center text-[27px] my-[25px]">Create a new account</p>
      <div
        class="field flex pl-[0.85rem] justify-center gap-[3rem] items-center w-[100%] h-[40px]"
      >
        <label class="text-[#6F6F6F]">Name: </label>
        <input
          class="rounded-[7px] w-[352px] h-[40px] px-5 bg-[#F6F6F6] outline-none border border-gray-200 text-[#6f6f6f]"
          type="text"
          name="name"
          :onChange="handleNameChange"
          v-model="name"
          placeholder="Enter your name here"
        />
      </div>
      <div
        class="field flex justify-center gap-[3rem] pl-[1rem] items-center w-[100%] h-[40px]"
      >
        <label class="text-[#6F6F6F]">Email: </label>
        <input
          class="rounded-[7px] w-[352px] h-[40px] px-5 bg-[#F6F6F6] outline-none border border-gray-200 text-[#6f6f6f]"
          type="email"
          name="email"
          :onChange="handleEmailChange"
          v-model="email"
          placeholder="Enter your email here"
        />
      </div>
      <div
        class="field flex justify-center pr-[1rem] gap-[3rem] items-center w-[100%] h-[40px]"
      >
        <label class="text-[#6F6F6F]">Password: </label>
        <input
          class="rounded-[7px] w-[352px] h-[40px] px-5 bg-[#F6F6F6] outline-none border border-gray-200 text-[#6f6f6f]"
          type="password"
          v-model="password"
          name="password"
          :onChange="handlePasswordChange"
          placeholder="Enter your password here"
        />
      </div>
      <div
        class="field flex justify-center pr-[5rem] gap-[3rem] items-center w-[100%] h-[40px]"
      >
        <label class="text-[#6F6F6F]">Confirm Password: </label>
        <input
          class="rounded-[7px] w-[352px] h-[40px] px-5 bg-[#F6F6F6] outline-none border border-gray-200 text-[#6f6f6f]"
          type="password"
          v-model="confirmPassword"
          :onChange="handleConfirmPassword"
          name="confirmPassword"
          placeholder="Enter the password again"
        />
      </div>
      <button
        type="submit"
        class="flex justify-center items-center bg-[#788DD5] text-white w-[10rem] mt-4 h-[2.5rem] rounded-full"
      >
        Submit
      </button>
    </form>
  </div>
  <div
    class="bg-white shadow-[0px_0px_4px_1px_#788DD5] w-[650px] h-[40%] rounded-lg"
    v-if="size === 2"
  >
    <form
      @submit="handleSubmit"
      class="flex justify-center flex-col items-center gap-[1rem]"
    >
      <p class="text-center text-[27px] my-[25px]">Login to your account</p>
      <div
        class="field flex justify-center gap-[3rem] pl-[1rem] items-center w-[100%] h-[40px]"
      >
        <label class="text-[#6F6F6F]">Email: </label>
        <input
          class="rounded-[7px] w-[352px] h-[40px] px-5 bg-[#F6F6F6] outline-none border border-gray-200 text-[#6f6f6f]"
          type="email"
          name="email"
          :onChange="handleEmailChange"
          v-model="email"
          placeholder="Enter your email here"
        />
      </div>
      <div
        class="field flex justify-center pr-[1rem] gap-[3rem] items-center w-[100%] h-[40px]"
      >
        <label class="text-[#6F6F6F]">Password: </label>
        <input
          class="rounded-[7px] w-[352px] h-[40px] px-5 bg-[#F6F6F6] outline-none border border-gray-200 text-[#6f6f6f]"
          type="password"
          v-model="password"
          :onChange="handlePasswordChange"
          name="password"
          placeholder="Enter your password here"
        />
      </div>
      <button
        type="submit"
        class="flex justify-center items-center bg-[#788DD5] text-white w-[10rem] mt-4 h-[2.5rem] rounded-full"
      >
        Submit
      </button>
    </form>
  </div>
</template>

<script setup>
defineProps({
  size: {
    type: Number,
    required: true,
    default: 2,
  },
});

const isValid = ref(false);

const name = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");

watch([name, email, password, confirmPassword], () => {
  if (
    name.value &&
    email.value &&
    password.value &&
    (confirmPassword.value || size !== 4)
  ) {
    if (size === 4 && password.value !== confirmPassword.value) {
      isValid.value = false;
    } else {
      isValid.value = true;
    }
  } else {
    isValid.value = false;
  }
});

const handleSubmit = (e) => {
  e.preventDefault();
  if (!isValid.value) {
    alert("Please fill all the fields correctly");
    return;
  }
  alert("Success");
  // Reset form fields
  name.value = "";
  email.value = "";
  password.value = "";
  confirmPassword.value = "";
};
</script>
