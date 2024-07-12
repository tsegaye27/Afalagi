<script setup>
definePageMeta({ layout: "profile" });
</script>

<template>
  <div class="w-[1360px] overflow-y-scroll pt-3 h-[40rem]">
    <h1 class="text-[#878787] text-2xl my-5 font-semibold">
      Personal Information
    </h1>
    <form
      class="w-fit p-[3rem] border rounded flex-col gap-[0.5rem] flex justify-center items-start"
    >
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

        <div class="flex justify-start items-center">
          <SelectLabel
            label="Phone"
            :options="[
              {
                label: '🇪🇹',
                value: '+251',
              },
              {
                label: '🇰🇪',
                value: '+254',
              },
            ]"
          />
          <input
            class="p-1 rounded w-[200px] border text-[#606060] border-[#868686] outline-none"
            type="text"
            placeholder="912-34-5678"
          />
        </div>
        <SelectLabel
          label="Gender"
          :options="[
            {
              label: 'Male',
              value: 'male',
            },
            {
              label: 'Female',
              value: 'female',
            },
          ]"
          placeholder="Select your Gender"
        />

        <InputLabel
          label="Address"
          type="text"
          placeholder="Enter your name here"
          value="Addis Ababa"
        />
      </div>
    </form>
    <button class="px-4 py-1 mt-3 bg-blue-500 text-white rounded">Save</button>
  </div>
</template>
