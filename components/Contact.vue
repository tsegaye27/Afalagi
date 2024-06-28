<template>
  <div
    class="contact-us w-[100%] my-[7rem] h-[400px] flex flex-col justify-center items-center"
  >
    <div class="bg-white border-2 rounded-lg border-[#788dd5] w-[45%] p-[3rem]">
      <h1
        class="text-[38px] font-[poppins] flex justify-center font-semibold text-[#788dd5] py-[2rem]"
      >
        Get in touch
      </h1>
      <div class="flex flex-col items-center justify-center">
        <form
          :onSubmit="handleSubmit"
          class="form w-[100%] flex flex-col items-center"
        >
          <input
            type="text"
            placeholder="Name"
            v-model="name"
            class="w-[100%] h-[40px] border-2 border-[#788dd5] outline-none text-[#868686] rounded-[5px] mb-[1rem] px-[1rem]"
          />
          <input
            type="email"
            placeholder="Email"
            v-model="email"
            class="w-[100%] h-[40px] border-2 border-[#788dd5] outline-none text-[#868686] rounded-[5px] mb-[1rem] px-[1rem]"
          />
          <input
            type="text"
            placeholder="Subject"
            v-model="subject"
            class="w-[100%] h-[40px] border-2 border-[#788dd5] outline-none text-[#868686] rounded-[5px] mb-[1rem] px-[1rem]"
          />
          <textarea
            placeholder="Message"
            v-model="message"
            class="w-[100%] h-[100px] border-2 border-[#788dd5] outline-none text-[#868686] rounded-[5px] mb-[1rem] py-[0.5rem] px-[1rem]"
          ></textarea>
          <button
            class="w-[200px] h-[40px] bg-[#788dd5] text-white rounded-[5px] font-[poppins] font-semibold"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
const name = ref("");
const email = ref("");
const subject = ref("");
const message = ref("");

const handleSubmit = (e) => {
  e.preventDefault();
  if (!name.value || !email.value || !subject.value || !message.value) {
    console.log("Please fill all the fields");
    return;
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) {
      console.log("Please enter a valid email address");
      return;
    }
  }
  console.log("Message sent successfully");
  name.value = "";
  email.value = "";
  subject.value = "";
  message.value = "";
};
</script>
