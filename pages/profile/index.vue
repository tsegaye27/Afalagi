<script setup>
import { useUserStore } from "@/stores/user";

definePageMeta({
  layout: "",
});

onMounted(() => {
  store.setLoading(true);
  if (!store.token) navigateTo("/auth/signup");
});

//Toster
const showToaster = ref(false);
const toasterMessage = ref("");
const toasterType = ref(""); // success or error

const showToast = (message, type) => {
  toasterMessage.value = message;
  toasterType.value = type;
  showToaster.value = true;

  setTimeout(() => {
    showToaster.value = false;
  }, 5000); // Hide after 5 seconds
};

const store = useUserStore();
const { $axios } = useNuxtApp();

const email = store.email;

const firstName = ref("");
const middleName = ref("");
const lastName = ref("");
const country = ref("");
const gender = ref("");
const profilePicture = ref(null);
const birthDate = ref("");
const number = ref("");
const code = ref("");

const handleFileChange = (event) => {
  profilePicture.value = event.target.files[0];
};

const createProfile = async () => {
  const formData = new FormData();
  const phoneNumber = `${code.value} ${number.value}`;

  formData.append("profilePicture", profilePicture.value);
  formData.append("firstName", firstName.value);
  formData.append("middleName", middleName.value);
  formData.append("lastName", lastName.value);
  formData.append("country", country.value);
  formData.append("gender", gender.value);
  formData.append("phoneNumber", phoneNumber);
  formData.append("birthDate", birthDate.value);

  try {
    const response = await $axios.post("/user/profile", formData, {
      headers: {
        Authorization: `Bearer ${store.token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("✅ Profile Created Successfully!!!", response.data);
    showToast("Profile Created Successfully!!!", "success");
    navigateTo("/");
  } catch (error) {
    showToast("Failed to Create Profile", "error");
    console.error(
      "Failed to Create Profile",
      error.response ? error.response.data : error.message
    );
  }
};
</script>

<template>
  <div class="h-screen bg-[#f3f3f3] flex justify-center items-center">
    <div class="flex gap-[1rem] border rounded bg-white flex-col items-center">
      <form
        @submit.prevent="createProfile"
        class="w-[600px] p-[3rem] flex-col gap-[0.25rem] flex justify-center items-center"
      >
        <h1
          class="text-[var(--primary-color)] mb-[2rem] text-center text-2xl font-semibold"
        >
          Let's create your profile
        </h1>
        <div class="flex flex-col gap-[.5rem]">
          <div class="flex justify-start items-baseline gap-[3.2rem]">
            <label class="text-[var(--primary-color)] font-semibold"
              >First Name:
            </label>
            <input
              class="outline-none w-[300px] p-1 pl-2 rounded text-[var(--primary-color)] border border-[var(--primary-color)]"
              type="text"
              v-model="firstName"
            />
          </div>
          <div class="flex justify-start items-baseline gap-[1.8rem]">
            <label class="text-[var(--primary-color)] font-semibold"
              >Middle Name:
            </label>
            <input
              class="outline-none w-[300px] p-1 pl-2 rounded text-[var(--primary-color)] border border-[var(--primary-color)]"
              type="text"
              v-model="middleName"
            />
          </div>
          <div class="flex justify-start items-baseline gap-[3.25rem]">
            <label class="text-[var(--primary-color)] font-semibold"
              >Last Name:
            </label>
            <input
              class="outline-none w-[300px] p-1 pl-2 rounded text-[var(--primary-color)] border border-[var(--primary-color)]"
              type="text"
              v-model="lastName"
            />
          </div>
          <div class="flex justify-start items-baseline gap-[5.8rem]">
            <label class="text-[var(--primary-color)] font-semibold"
              >Email:
            </label>
            <input
              class="outline-none w-[300px] p-1 pl-2 rounded text-[var(--primary-color)] border border-[var(--primary-color)]"
              type="email"
              :value="email"
            />
          </div>
          <div class="flex justify-start items-baseline gap-[4.4rem]">
            <label class="text-[var(--primary-color)] font-semibold"
              >Country:
            </label>
            <input
              class="outline-none w-[300px] p-1 pl-2 rounded text-[var(--primary-color)] border border-[var(--primary-color)]"
              type="text"
              v-model="country"
            />
          </div>

          <div class="flex justify-start gap-[4.7rem] items-baseline">
            <label class="text-[var(--primary-color)] text-[1rem] font-semibold"
              >Gender:</label
            >
            <select
              v-model="gender"
              class="border border-[var(--primary-color)] bg-white w-[300px] rounded outline-none text-[var(--primary-color)] p-[0.2rem]"
            >
              <option value="" selected disabled>Select gender</option>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
            </select>
          </div>
          <div class="flex justify-start items-baseline gap-[1.3rem]">
            <label class="text-[var(--primary-color)] font-semibold"
              >Profile Picture:
            </label>
            <input
              class="outline-none w-[300px] p-1 pl-2 rounded text-[var(--primary-color)] border border-[var(--primary-color)]"
              type="file"
              @change="handleFileChange"
            />
          </div>
          <div class="flex justify-start items-baseline gap-[2.1rem]">
            <label class="text-[var(--primary-color)] font-semibold"
              >Date of Birth:
            </label>
            <input
              class="outline-none w-[300px] p-1 pl-2 rounded text-[var(--primary-color)] border border-[var(--primary-color)]"
              type="date"
              v-model="birthDate"
            />
          </div>
          <div class="flex justify-start items-baseline gap-[5.3rem]">
            <label class="text-[var(--primary-color)] font-semibold"
              >Phone:
            </label>
            <div class="flex gap-[1rem]">
              <select
                v-model="code"
                class="outline-none p-1 bg-whitesmoke rounded border border-[var(--primary-color)]"
              >
                <option value="+251">🇪🇹</option>
                <option value="+44">🇬🇧</option>
              </select>
              <input
                class="p-1 rounded w-[200px] pl-2 border text-[#606060] border-[var(--primary-color)] outline-none"
                type="text"
                v-model="number"
                placeholder="912-34-5678"
              />
            </div>
          </div>
        </div>
        <button
          class="flex mt-[2rem] justify-center px-[0.5rem] gap-[0.6rem] btn"
        >
          Create Profile
        </button>
      </form>
    </div>
  </div>
</template>
