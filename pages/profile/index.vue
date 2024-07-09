<script setup>
definePageMeta({ layout: "profile" });
</script>

<template>
  <div class="w-[1160px] flex justify-center items-center h-[35rem]">
    <form
      class="w-full py-[3rem] border border-[#868686] shadow-md rounded flex-col gap-[0.5rem] flex justify-center items-center"
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
          <select
            class="p-1 border border-[#868686] rounded outline-none"
            name="gender"
            id="gender"
          >
            <option selected disabled value="">Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div class="flex justify-start items-center">
          <label class="mr-[2rem] font-semibold text-[#868686]">Phone: </label>
          <select
            class="outline-none p-1 mr-[1rem] bg-blue-200 rounded"
            name="countryPhoneCode"
            id="countryPhoneCode"
          >
            <option selected value="eth">🇪🇹</option>
            <option value="uk">🇬🇧</option>
          </select>
          <input
            class="p-1 rounded w-[200px] border text-[#868686] border-[#868686] outline-none"
            type="text"
            placeholder="912-34-5678"
          />
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
