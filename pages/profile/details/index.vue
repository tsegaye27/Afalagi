<script setup>
import { useUserStore } from "#imports";
definePageMeta({ layout: "profile" });

const store = useUserStore();
const email = store.email;
const token = store.token;

const user = ref({
  firstName: "",
  middleName: "",
  lastName: "",
  gender: "",
  birthDate: "",
  phoneNumber: "",
  country: "",
  profilePicture: "",
});
</script>

<template>
  <div class="w-full flex flex-row-reverse justify-center items-center pt-3">
    <div class="flex gap-[1rem] flex-col items-center">
      <form
        class="w-[600px] p-[3rem] border rounded flex-col gap-[0.25rem] flex justify-center items-center"
      >
        <h1 class="text-[#878787] text-center text-2xl font-semibold">
          Personal Information
        </h1>
        <div class="flex flex-col gap-[1.5rem]">
          <InputLabel
            label="First Name"
            type="text"
            placeholder="Enter your first name here"
            :value="user.firstName"
          />
          <InputLabel
            label="Middle Name"
            type="text"
            placeholder="Enter your middle name here"
            :value="user.middleName"
          />
          <InputLabel
            label="Last Name"
            type="text"
            placeholder="Enter your last name here"
            :value="user.lastName"
          />
          <InputLabel
            label="Email"
            type="email"
            placeholder="Enter your email here"
            :value="email"
          />
          <InputLabel
            label="Address"
            type="text"
            placeholder="Enter your name here"
            value="user.country"
          />
          <div class="flex justify-start items-baseline gap-[4rem]">
            <label class="text-[var(--primary-color)] font-semibold"
              >Gender:</label
            >
            <select
              v-model="user.gender"
              class="border border-[var(--primary-color)] h-[35px] rounded outline-none text-[var(--primary-color)] p-[0.1rem] w-[320px]"
            >
              <option value="" selected disabled>Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div class="flex justify-start items-baseline gap-[1.3rem]">
            <label class="text-[var(--primary-color)] font-semibold"
              >Date of Birth:
            </label>
            <input
              class="outline-none w-[300px] p-1 pl-2 rounded text-[#606060] border border-[var(--primary-color)]"
              type="date"
              v-model="user.birthDate"
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
                v-model="user.phoneNumber"
                placeholder="912-34-5678"
              />
            </div>
          </div>
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
