<template>
  <div
    class="bg-white shadow-[0px_0px_4px_1px_var(--secondary-color)] w-[729px] p-4 rounded-lg h-fit"
    v-if="formType === 'signup'"
  >
    <form
      class="flex justify-center flex-col items-center gap-[1rem]"
      @submit.prevent="handleSignupSubmit"
    >
      <p class="text-center text-[27px] my-[25px]">Create a new account</p>

      <div
        class="field flex justify-center gap-[3rem] pl-[1rem] items-center w-[100%] h-[40px]"
      >
        <label class="text-[var(--primary-color)]">Email: </label>
        <input
          class="rounded-[7px] w-[352px] h-[40px] px-5 bg-[#F6F6F6] outline-none border border-gray-200 text-[var(--primary-color)]"
          type="email"
          name="email"
          v-model="email"
          @input="validateEmail"
          placeholder="Enter your email here"
        />
      </div>
      <span v-if="emailError" class="text-red-500">{{ emailError }}</span>
      <div
        class="field flex justify-center pr-[1rem] gap-[3rem] items-center w-[100%] h-[40px]"
      >
        <label class="text-[var(--primary-color)]">Password: </label>
        <input
          class="rounded-[7px] w-[352px] h-[40px] px-5 bg-[#F6F6F6] outline-none border border-gray-200 text-[var(--primary-color)]"
          type="password"
          v-model="password"
          @input="validatePassword"
          name="password"
          placeholder="Enter your password here"
        />
      </div>
      <span v-if="passwordError" class="text-red-500">{{ passwordError }}</span>
      <div
        class="field flex justify-center pr-[5rem] gap-[3rem] items-center w-[100%] h-[40px]"
      >
        <label class="text-[var(--primary-color)]">Confirm Password: </label>
        <input
          class="rounded-[7px] w-[352px] h-[40px] px-5 bg-[#F6F6F6] outline-none border border-gray-200 text-[var(--primary-color)]"
          type="password"
          v-model="confirmPassword"
          @input="validateConfirmPassword"
          name="confirmPassword"
          placeholder="Enter the password again"
        />
      </div>
      <span v-if="confirmPasswordError" class="text-red-500">{{
        confirmPasswordError
      }}</span>
      <button
        type="submit"
        class="flex justify-center items-center bg-[var(--secondary-color)] text-white w-[10rem] mt-4 h-[2.5rem] rounded-full"
      >
        Submit
      </button>
    </form>
  </div>
  <div
    class="bg-white shadow-[0px_0px_4px_1px_var(--secondary-color)] w-[650px] pb-6 rounded-lg"
    v-if="formType === 'login'"
  >
    <form
      @submit.prevent="handleSubmit"
      class="flex justify-center flex-col items-center gap-[1rem]"
    >
      <p class="text-center text-[27px] my-[25px]">Login to your account</p>
      <div
        class="field flex justify-center gap-[3rem] pl-[1rem] items-center w-[100%] h-[40px]"
      >
        <label class="text-[var(--primary-color)]">Email: </label>
        <input
          class="rounded-[7px] w-[352px] h-[40px] px-5 bg-[#F6F6F6] outline-none border border-gray-200 text-[var(--primary-color)]"
          type="email"
          name="email"
          v-model="email"
          @input="validateEmail"
          placeholder="Enter your email here"
        />
      </div>
      <span v-if="emailError" class="text-red-500">{{ emailError }}</span>
      <div
        class="field flex justify-center pr-[1rem] gap-[3rem] items-center w-[100%] h-[40px]"
      >
        <label class="text-[var(--primary-color)]">Password: </label>
        <input
          class="rounded-[7px] w-[352px] h-[40px] px-5 bg-[#F6F6F6] outline-none border border-gray-200 text-[var(--primary-color)]"
          type="password"
          v-model="password"
          @input="validatePassword"
          name="password"
          placeholder="Enter your password here"
        />
      </div>
      <span v-if="passwordError" class="text-red-500">{{ passwordError }}</span>
      <button
        type="submit"
        class="flex justify-center items-center bg-[var(--secondary-color)] text-white w-[10rem] mt-4 h-[2.5rem] rounded-full"
      >
        Submit
      </button>
    </form>
  </div>
</template>

<script setup>
const props = defineProps({
  formType: {
    type: String,
    default: "signup",
  },
});
const router = useRouter();

// const name = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");

// const nameError = ref("");
const emailError = ref("");
const passwordError = ref("");
const confirmPasswordError = ref("");

// const validateName = () => {
//   const nameRegex = /^[A-Za-z\s]+$/;
//   if (!name.value) {
//     nameError.value = "Name is required";
//   } else if (!nameRegex.test(name.value)) {
//     nameError.value = "Name should not include numbers";
//   } else {
//     nameError.value = "";
//   }
// };

const validateEmail = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.value) {
    emailError.value = "Email is required";
  } else if (!emailRegex.test(email.value)) {
    emailError.value = "Please enter a valid email address";
  } else {
    emailError.value = "";
  }
};

const validatePassword = () => {
  if (!password.value) {
    passwordError.value = "Password is required";
  } else if (password.value.length < 6) {
    passwordError.value = "Password should be at least 6 characters long";
  } else {
    passwordError.value = "";
  }
};

const validateConfirmPassword = () => {
  if (!confirmPassword.value) {
    confirmPasswordError.value = "Confirm Password is required";
  } else if (password.value !== confirmPassword.value) {
    confirmPasswordError.value = "Passwords do not match";
  } else {
    confirmPasswordError.value = "";
  }
};

const handleSubmit = () => {
  if (props.formType === "login" && (!email.value || !password.value)) {
    validateEmail();
    validatePassword();
    return;
  }
  email.value = "";
  password.value = "";
  router.push("/");
};
const handleSignupSubmit = () => {
  if (props.formType === "signup") {
    // validateName();
    validateEmail();
    validatePassword();
    validateConfirmPassword();
    if (
      // !name.value ||
      !email.value ||
      !password.value ||
      !confirmPassword.value
    ) {
      return;
    }
    // name.value = "";
    email.value = "";
    password.value = "";
    confirmPassword.value = "";

    router.push("/auth/verification");
  }
};
</script>
