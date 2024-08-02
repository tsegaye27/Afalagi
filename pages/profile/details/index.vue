<script setup>
import { useUserStore } from "#imports";
definePageMeta({ layout: "profile" });

const store = useUserStore();
const email = store.email;
const user = ref({
  firstName: "",
  middleName: "",
  lastName: "",
  country: "",
  city: "",
  state: "",
  profilePicture: "",
  gender: "",
  birthDate: "",
});

const { $axios } = useNuxtApp();

onMounted(async () => {
  if (!store.token) navigateTo("/auth/login");
  try {
    const response = await $axios.get("/user/profile/me", {
      headers: {
        Authorization: `Bearer ${store.token}`,
      },
    });
    user.value = response.data.data;
    user.value.birthDate = formatDateToInput(response.data.data.birthDate);
    console.log("success✅", response.data, user.value);
  } catch (error) {
    console.error(
      "failed❌",
      error.response ? error.response.data : error.message
    );
  }
});
function formatDateToInput(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
</script>

<template>
  <div class="w-full flex flex-row-reverse justify-center items-center pt-3">
    <div class="flex gap-[1rem] flex-col justify-center items-center">
      <form
        class="w-[32rem] p-[3rem] border rounded flex-col gap-[0.25rem] flex justify-center items-center"
      >
        <h1 class="text-[#878787] mb-[2rem] text-center text-2xl font-semibold">
          Personal Information
        </h1>
        <div class="flex flex-col gap-[1.5rem]">
          <div class="flex justify-between items-baseline gap-[0.7rem]">
            <label class="text-[var(--primary-color)] font-semibold"
              >First Name:
            </label>
            <input
              class="outline-none p-1 w-[300px] pl-2 rounded text-[var(--primary-color)] border border-[var(--primary-color)]"
              type="text"
              placeholder="Enter your first name here"
              v-model="user.firstName"
            />
          </div>
          <div class="flex justify-between items-baseline gap-[0.7rem]">
            <label class="text-[var(--primary-color)] font-semibold"
              >Middle Name:
            </label>
            <input
              class="outline-none p-1 w-[300px] pl-2 rounded text-[var(--primary-color)] border border-[var(--primary-color)]"
              type="text"
              placeholder="Enter your middle name here"
              v-model="user.middleName"
            />
          </div>
          <div class="flex justify-between items-baseline gap-[0.7rem]">
            <label class="text-[var(--primary-color)] font-semibold"
              >Last Name:
            </label>
            <input
              class="outline-none p-1 w-[300px] pl-2 rounded text-[var(--primary-color)] border border-[var(--primary-color)]"
              type="text"
              placeholder="Enter your last name here"
              v-model="user.lastName"
            />
          </div>

          <div class="flex justify-between items-baseline gap-[0.7rem]">
            <label class="text-[var(--primary-color)] font-semibold"
              >Country:
            </label>
            <input
              class="outline-none p-1 w-[300px] pl-2 rounded text-[var(--primary-color)] border border-[var(--primary-color)]"
              type="text"
              placeholder="Enter your country here"
              v-model="user.country"
            />
          </div>

          <div class="flex justify-start items-baseline gap-[4rem]">
            <label class="text-[var(--primary-color)] font-semibold"
              >Gender:</label
            >
            <select
              v-model="user.gender"
              class="border border-[var(--primary-color)] h-[35px] rounded outline-none text-[var(--primary-color)] p-[0.1rem] w-[300px]"
            >
              <option value="" selected disabled>Select gender</option>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
            </select>
          </div>
          <div class="flex justify-start items-baseline gap-[1.3rem]">
            <label class="text-[var(--primary-color)] font-semibold"
              >Date of Birth:
            </label>
            <input
              class="outline-none w-[300px] p-1 pl-2 rounded text-[#606060] border border-[var(--primary-color)]"
              type="date"
              :value="formatDateToInput(user.birthDate)"
            />
          </div>
          <!-- <div class="flex justify-start items-baseline gap-[4.5rem]">
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
                v-model="phoneNumber"
                placeholder="912-34-5678"
              />
            </div>
          </div> -->
        </div>
        <button class="mt-[2rem] flex justify-center gap-[0.6rem] btn">
          <span class="flex justify-center items-center"
            ><Icon name="mdi:content-save" size="22px" /></span
          >Save
        </button>
      </form>
    </div>
  </div>
</template>
