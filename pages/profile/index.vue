<script setup>
import { useUserStore } from "@/stores/user";
definePageMeta({ layout: "" });
const store = useUserStore();
const email = store.user;
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
  <div class="h-screen flex justify-center items-center">
    <div class="flex gap-[1rem] flex-col items-center">
      <h1
        class="text-[var(--primary-color)] mt-5 text-center text-2xl font-semibold"
      >
        Let's create your profile
      </h1>
      <form
        class="w-[600px] p-[3rem] border rounded flex-col gap-[0.25rem] flex justify-center items-center"
      >
        <div class="flex flex-col gap-[1.5rem]">
          <div class="flex justify-start items-baseline gap-[5rem]">
            <label class="text-[var(--primary-color)] font-semibold"
              >First Name:
            </label>
            <input
              class="outline-none w-[300px] p-1 pl-2 rounded text-[var(--primary-color)] border border-[var(--primary-color)]"
              type="text"
              v-model="user.firstName"
            />
          </div>
          <div class="flex justify-start items-baseline gap-[5rem]">
            <label class="text-[var(--primary-color)] font-semibold"
              >Middle Name:
            </label>
            <input
              class="outline-none w-[300px] p-1 pl-2 rounded text-[var(--primary-color)] border border-[var(--primary-color)]"
              type="text"
              v-model="user.middleName"
            />
          </div>
          <div class="flex justify-start items-baseline gap-[5rem]">
            <label class="text-[var(--primary-color)] font-semibold"
              >Last Name:
            </label>
            <input
              class="outline-none w-[300px] p-1 pl-2 rounded text-[var(--primary-color)] border border-[var(--primary-color)]"
              type="text"
              v-model="user.lastName"
            />
          </div>

          <!-- <InputLabel
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
          /> -->
          <div class="flex justify-start items-baseline gap-[5rem]">
            <label class="text-[var(--primary-color)] font-semibold"
              >Email:
            </label>
            <input
              class="outline-none w-[300px] p-1 pl-2 rounded text-[var(--primary-color)] border border-[var(--primary-color)]"
              type="email"
              :value="email"
            />
          </div>
          <div class="flex justify-start items-baseline gap-[5rem]">
            <label class="text-[var(--primary-color)] font-semibold"
              >Country:
            </label>
            <input
              class="outline-none w-[300px] p-1 pl-2 rounded text-[var(--primary-color)] border border-[var(--primary-color)]"
              type="text"
              v-model="user.country"
            />
          </div>
          <!-- <InputLabel
            label="Country"
            type="text"
            placeholder="Enter your name here"
            value="user.country"
          /> -->
          <div class="flex justify-start gap-[3.85rem] items-baseline">
            <label class="text-[var(--primary-color)] text-[1rem] font-semibold"
              >Gender:</label
            >
            <select
              v-model="user.gender"
              class="border border-[var(--primary-color)] bg-white w-[300px] rounded outline-none text-[var(--primary-color)] p-[0.2rem]"
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
              class="outline-none w-[300px] p-1 pl-2 rounded text-[var(--primary-color)] border border-[var(--primary-color)]"
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
      <button class="flex justify-center px-[0.5rem] gap-[0.6rem] btn">
        Create
      </button>
    </div>
  </div>
</template>
