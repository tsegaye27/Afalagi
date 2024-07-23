<script setup>
definePageMeta({ layout: "profile" });
const props = defineProps({
  firstName: {
    type: String,
    required: true,
    default: "John",
  },
  middleName: {
    type: String,
    required: true,
    default: "Doe",
  },
  lastName: {
    type: String,
    required: true,
    default: "Smith",
  },
  email: {
    type: String,
    required: true,
    default: "",
  },
  gender: {
    type: String,
    required: true,
    default: "male",
  },
  dob: {
    type: String,
    required: true,
    default: "12-07-2024",
  },
  phone: {
    type: String,
    required: true,
    default: "912-34-5678",
  },
  address: {
    type: String,
    required: true,
    default: "Addis Ababa",
  },
});
</script>

<template>
  <div
    class="w-[80%] flex flex-row-reverse justify-evenly items-center overflow-y-auto pt-3 h-[40rem]"
  >
    <div
      class="profile-image-container relative flex flex-col w-full items-center justify-center"
    >
      <ProfileImageInput />
    </div>
    <div class="flex gap-[1rem] flex-col items-center">
      <h1 class="text-[#878787] mt-5 text-center text-2xl font-semibold">
        Personal Information
      </h1>
      <form
        class="w-[600px] p-[3rem] border rounded flex-col gap-[0.25rem] flex justify-center items-center"
      >
        <div class="flex flex-col gap-[1.5rem]">
          <InputLabel
            label="First Name"
            type="text"
            placeholder="Enter your first name here"
            value="Tsegaye"
          />
          <InputLabel
            label="Middle Name"
            type="text"
            placeholder="Enter your middle name here"
            value="Talegngeta"
          />
          <InputLabel
            label="Last Name"
            type="text"
            placeholder="Enter your last name here"
            value="Fereja"
          />
          <InputLabel
            label="Email"
            type="email"
            placeholder="Enter your email here"
            value="ttalegn29@gmail.com"
          />
          <InputLabel
            label="Address"
            type="text"
            placeholder="Enter your name here"
            value="Addis Ababa"
          />
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
          <div class="flex justify-start items-baseline gap-[1.3rem]">
            <label class="text-[var(--primary-color)] font-semibold"
              >Date of Birth:
            </label>
            <input
              class="outline-none w-[300px] p-1 pl-2 rounded text-[#606060] border border-[var(--primary-color)]"
              type="date"
            />
          </div>
          <div class="flex justify-start items-baseline gap-[4.5rem]">
            <label class="text-[var(--primary-color)] font-semibold"
              >Phone:
            </label>
            <div class="flex gap-[1rem]">
              <select
                class="outline-none p-1 bg-whitesmoke rounded border border-[var(--primary-color)]"
              >
                <option>🇪🇹</option>
                <option>🇬🇧</option>
              </select>
              <input
                class="p-1 rounded w-[200px] pl-2 border text-[#606060] border-[var(--primary-color)] outline-none"
                type="text"
                placeholder="912-34-5678"
              />
            </div>
          </div>

          <!-- <div class="flex justify-start items-center">
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
              class="p-1 rounded w-[200px] border text-[#606060] border-[var(--primary-color)] outline-none"
              type="text"
              placeholder="912-34-5678"
            />
          </div> -->
        </div>
      </form>
      <button class="flex justify-center gap-[0.6rem] btn">
        <span class="flex justify-center items-center"
          ><Icon name="mdi:content-save" size="22px" /></span
        >Save
      </button>
    </div>
  </div>
</template>
