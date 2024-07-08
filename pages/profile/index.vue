<script setup>
definePageMeta({ layout: "profile" });
</script>

<template>
  <div class="w-full flex justify-center items-center h-[35rem]">
    <form
      class="w-[500px] py-[3rem] border border-[#868686] shadow-md rounded flex-col gap-[0.5rem] flex justify-center items-center"
    >
      <h1 class="text-center text-[#878787] text-2xl mb-5 font-semibold">
        Personal Information
      </h1>
      <div class="flex flex-col gap-[1rem]">
        <InputLabel
          label="Full-Name"
          type="text"
          placeholder="Enter your name here"
          value="Tsegaye Talegngeta"
        />
        <InputLabel
          label="Email"
          type="email"
          placeholder="Enter your email here"
          value="ttalegn29@gmail.com"
        />
        <InputLabel
          label="Age"
          type="number"
          placeholder="Enter your age here"
          value="22"
        />
        <div class="flex gap-[1.65rem]">
          <label class="text-[#868686] font-semibold">Gender: </label>
          <select class="p-1 rounded outline-none" name="gender" id="gender">
            <option selected disabled value="">Select Your Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <InputLabel
          label="Address"
          type="text"
          placeholder="Enter your name here"
          value="Addis Ababa"
        />
      </div>
      <button class="px-4 py-1 mt-3 bg-blue-500 text-white rounded">
        Save
      </button>
    </form>
  </div>
</template>
