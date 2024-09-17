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
const profilePictureB = ref(null);
const birthDate = ref("");
const number = ref("");
const code = ref("");

const handleFileChange = (event) => {
  const file = event.target.files[0];
  profilePictureB.value = file;
  console.log(file);
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      profilePicture.value = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};

const createProfile = async () => {
  const formData = new FormData();
  const phoneNumber = `${code.value} ${number.value}`;

  formData.append("profilePicture", profilePictureB.value);
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

// Fetch list of countries for nationality filter
const countries = ref([]);
const showCountryList = ref(false);

onMounted(async () => {
  const response = await fetch("https://restcountries.com/v3.1/all");
  countries.value = await response.json();
});

// Computed property to filter countries based on input
const filteredCountries = computed(() => {
  return countries.value.filter((c) =>
    c.name.common.toLowerCase().includes(country.value.toLowerCase())
  );
});

// Select country from the list
const selectCountry = (c) => {
  country.value = `${c.name.common}`;
  showCountryList.value = false;
};

// Hide country list after selecting
const hideCountryList = () => {
  setTimeout(() => {
    showCountryList.value = false;
  }, 100);
};
</script>

<template>
  <div class="relative min-h-screen flex justify-center items-center">
    <!-- Toaster -->
    <div
      v-if="showToaster"
      :class="toasterType === 'success' ? 'bg-green-500' : 'bg-red-500'"
      class="fixed top-5 right-5 p-4 rounded-lg text-white shadow-lg z-50 transition-all transform ease-out"
    >
      {{ toasterMessage }}
    </div>
    <div
      class="absolute inset-0 bg-gradient-to-r from-[var(--secondary-color)] to-[var(--primary-color)]"
    ></div>
    <div
      class="absolute inset-0 transform -skew-y-24 bg-white w-1/2 flex items-center justify-start pl-4"
      style="z-index: 1"
    >
      <h1
        class="text-[var(--primary-color)] text-center ml-8 text-3xl font-semibold"
      >
        Let's create your profile
      </h1>
    </div>

    <div
      class="relative z-10 flex gap-4 border ring ring-blue-500 rounded-lg bg-white flex-col items-center ml-32 shadow-lg w-[700px] p-8"
    >
      <form
        @submit.prevent="createProfile"
        class="w-full max-w-xl flex flex-col gap-6"
      >
        <div class="flex flex-col gap-3">
          <div class="flex justify-center mb-4">
            <div class="relative w-32 h-32">
              <img
                v-if="profilePicture"
                :src="profilePicture"
                alt="Profile"
                class="w-full h-full rounded-full object-cover border border-[var(--primary-color)]"
              />
              <div
                v-else
                class="w-full h-full rounded-full bg-gray-100 flex items-center justify-center border border-[var(--primary-color)]"
              >
                <span class="text-gray-500">Insert image</span>
              </div>
              <input
                class="absolute inset-0 w-32 h-32 opacity-0 cursor-pointer"
                type="file"
                accept="image/*"
                @change="handleFileChange"
              />
            </div>
          </div>

          <div class="flex justify-between items-center">
            <label class="text-[var(--primary-color)] font-semibold"
              >First Name:
            </label>
            <input
              class="outline-none w-80 p-2 rounded-lg border text-[var(--primary-color)] border-[var(--primary-color)]"
              type="text"
              placeholder="John"
              v-model="firstName"
            />
          </div>
          <div class="flex justify-between items-center">
            <label class="text-[var(--primary-color)] font-semibold"
              >Middle Name:
            </label>
            <input
              class="outline-none w-80 p-2 rounded-lg border text-[var(--primary-color)] border-[var(--primary-color)]"
              type="text"
              placeholder="Doe"
              v-model="middleName"
            />
          </div>
          <div class="flex justify-between items-center">
            <label class="text-[var(--primary-color)] font-semibold"
              >Last Name:
            </label>
            <input
              class="outline-none w-80 p-2 rounded-lg border text-[var(--primary-color)] border-[var(--primary-color)]"
              type="text"
              placeholder="Doe"
              v-model="lastName"
            />
          </div>
          <div class="flex justify-between items-center">
            <label class="text-[var(--primary-color)] font-semibold"
              >Email:
            </label>
            <input
              class="outline-none w-80 p-2 rounded-lg border text-[var(--primary-color)] border-[var(--primary-color)]"
              type="email"
              :value="email"
            />
          </div>
          <div class="flex justify-between items-center">
            <label class="text-[var(--primary-color)] font-semibold"
              >Country:</label
            >
            <!-- Nationality filter with searchable dropdown -->
            <div class="w-[320px]">
              <div class="relative">
                <input
                  v-model="country"
                  type="text"
                  placeholder="Nationality"
                  @focus="showCountryList = true"
                  @blur="hideCountryList"
                  class="w-full p-[0.3rem] border border-[var(--primary-color)] text-[var(--primary-color)] rounded outline-none"
                />
                <ul
                  v-if="showCountryList && filteredCountries.length > 0"
                  class="absolute top-full left-0 w-full border border-[var(--primary-color)] rounded outline-none text-[var(--primary-color)] mt-1 p-[0.3rem] bg-white z-10 max-h-40 overflow-y-auto"
                >
                  <li
                    v-for="c in filteredCountries"
                    :key="c.cca2"
                    @mousedown="selectCountry(c)"
                    class="cursor-pointer p-[0.2rem] hover:bg-[var(--primary-color)] hover:text-white flex items-center"
                  >
                    <span>{{ c.flag }} {{ c.name.common }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div class="flex justify-between items-center">
            <label class="text-[var(--primary-color)] font-semibold"
              >Gender:
            </label>
            <select
              v-model="gender"
              class="outline-none w-80 p-2 rounded-lg border bg-white text-[var(--primary-color)] border-[var(--primary-color)]"
            >
              <option value="" selected disabled>Select gender</option>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
            </select>
          </div>

          <div class="flex justify-between items-center">
            <label class="text-[var(--primary-color)] font-semibold"
              >Date of Birth:
            </label>
            <input
              class="outline-none w-80 p-2 rounded-lg border text-[var(--primary-color)] border-[var(--primary-color)]"
              type="date"
              v-model="birthDate"
            />
          </div>
          <div class="flex justify-between items-center">
            <label class="text-[var(--primary-color)] font-semibold"
              >Phone:
            </label>
            <div class="flex gap-2">
              <select
                v-model="code"
                class="outline-none p-2 rounded-lg border bg-gray-50 border-[var(--primary-color)]"
              >
                <option value="+251">🇪🇹</option>
                <option value="+44">🇬🇧</option>
              </select>
              <input
                class="outline-none w-56 p-2 rounded-lg border text-[var(--primary-color)] border-[var(--primary-color)]"
                type="text"
                v-model="number"
                placeholder="912-34-5678"
              />
            </div>
          </div>
        </div>
        <button
          class="mt-4 py-3 px-4 bg-[var(--primary-color)] text-white rounded-lg hover:bg-[var(--secondary-color)] transition-all"
        >
          Create Profile
        </button>
      </form>
    </div>
  </div>
</template>
