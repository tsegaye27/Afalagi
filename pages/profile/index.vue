<script setup>
definePageMeta({
  layout: "",
});

const accessTokenCookie = useCookie("access_token");
onMounted(() => {
  store.setLoading(true);
  store.setToken(accessTokenCookie.value);
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

  formData.append("profilePicture", profilePictureB.value);
  formData.append("firstName", firstName.value);
  formData.append("middleName", middleName.value);
  formData.append("lastName", lastName.value);
  formData.append("country", country.value);
  formData.append("city", cityQuery.value);
  formData.append("gender", gender.value);
  formData.append("phoneNumber", `${code.value} ${number.value}`);
  formData.append("birthDate", birthDate.value);

  if (!store.token) {
    showToast("Unauthorized", "error");
    return;
  }

  try {
    const response = await $axios.post("/user/profile", formData, {
      headers: {
        Authorization: `Bearer ${store.token}`,
        "Content-Type": "multipart/form-data",
      },
    });

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
const showCityList = ref(false);
const cityQuery = ref("");
const selectedCountry = ref(null);

onMounted(async () => {
  const response = await fetch("https://countriesnow.space/api/v0.1/countries");
  const data = await response.json();
  countries.value = data.data;
});

// Computed property to filter countries based on input
const filteredCountries = computed(() => {
  return countries.value.filter((c) =>
    c.country.toLowerCase().includes(country.value.toLowerCase())
  );
});

// Computed property to filter cities based on input
const filteredCities = computed(() => {
  return selectedCountry.value
    ? selectedCountry.value.cities.filter((city) =>
        city.toLowerCase().includes(cityQuery.value.toLowerCase())
      )
    : [];
});

// Select country from the list
const selectCountry = (c) => {
  country.value = `${c.country}`;
  selectedCountry.value = c;
  showCountryList.value = false;
};

// Hide country list after selecting
const hideCountryList = () => {
  setTimeout(() => {
    showCountryList.value = false;
  }, 100);
};

// Select city from the list
const selectCity = (city) => {
  cityQuery.value = city;
  showCityList.value = false;
};

// Hide city list after selecting
const hideCityList = () => {
  setTimeout(() => {
    showCityList.value = false;
  }, 100);
};

const showPhoneCodeList = ref(false);
const selectedPhoneCode = ref(null);
const countriesPhone = ref([]);
const filteredPhoneCodes = computed(() => {
  return countriesPhone.value.filter((pc) => pc.code.includes(code.value));
});

const fetchPhoneCodes = async () => {
  try {
    const response = await fetch("https://restcountries.com/v3.1/all");
    const countriesData = await response.json();
    countriesPhone.value = countriesData.map((country) => {
      return {
        name: country.name.common,
        code: `${country.idd.root}${
          country.idd.suffixes?.length > 1
            ? country.idd.suffixes[0]
            : country.idd.suffixes
        }`,
        flag: country.flag,
      };
    });
  } catch (error) {
    console.error("Failed to fetch phone codes", error);
  }
};

onMounted(() => {
  fetchPhoneCodes();
});

const handlePhoneCodeClick = (phoneCode) => {
  code.value = phoneCode.code;
  selectedPhoneCode.value = phoneCode;
  showPhoneCodeList.value = false;
};

const hidePhoneCodeList = () => {
  setTimeout(() => {
    showPhoneCodeList.value = false;
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
        <!-- Profile Picture -->
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

        <!-- Form Fields -->
        <div class="flex flex-col gap-3">
          <div class="flex justify-between items-center">
            <label class="text-[var(--primary-color)] font-semibold"
              >First Name:</label
            >
            <input
              class="outline-none w-80 p-2 rounded-lg border text-[var(--primary-color)] border-[var(--primary-color)]"
              type="text"
              placeholder="John"
              v-model="firstName"
            />
          </div>
          <div class="flex justify-between items-center">
            <label class="text-[var(--primary-color)] font-semibold"
              >Middle Name:</label
            >
            <input
              class="outline-none w-80 p-2 rounded-lg border text-[var(--primary-color)] border-[var(--primary-color)]"
              type="text"
              placeholder="Doe"
              v-model="middleName"
            />
          </div>
          <div class="flex justify-between items-center">
            <label class="text-[var(--primary-color)] font-semibold"
              >Last Name:</label
            >
            <input
              class="outline-none w-80 p-2 rounded-lg border text-[var(--primary-color)] border-[var(--primary-color)]"
              type="text"
              placeholder="Doe"
              v-model="lastName"
            />
          </div>
          <div class="flex justify-between items-center">
            <label class="text-[var(--primary-color)] font-semibold"
              >Email:</label
            >
            <input
              class="outline-none w-80 p-2 rounded-lg border text-[var(--primary-color)] border-[var(--primary-color)]"
              type="email"
              :value="email"
              disabled
            />
          </div>

          <!-- Country and City Selection -->
          <div class="flex items-center justify-between">
            <label class="text-[var(--primary-color)] font-semibold"
              >Country:</label
            >
            <div class="w-[320px] flex gap-4">
              <!-- Country Input -->
              <div
                class="relative"
                :class="selectedCountry ? 'w-[150px]' : 'w-[320px]'"
              >
                <input
                  v-model="country"
                  type="text"
                  placeholder="Country"
                  @focus="showCountryList = true"
                  @blur="hideCountryList"
                  :class="selectedCountry ? 'w-[9.5rem]' : 'w-[320px]'"
                  class="outline-none p-2 rounded-lg border text-[var(--primary-color)] border-[var(--primary-color)]"
                />
                <ul
                  v-if="showCountryList && filteredCountries.length > 0"
                  class="absolute top-full left-0 w-full border border-[var(--primary-color)] rounded outline-none text-[var(--primary-color)] mt-1 p-[0.3rem] bg-white z-10 max-h-40 overflow-y-auto"
                >
                  <li
                    v-for="(c, index) in filteredCountries"
                    :key="index"
                    @mousedown="selectCountry(c)"
                    class="cursor-pointer p-[0.2rem] hover:bg-[var(--primary-color)] hover:text-white flex items-center"
                  >
                    <span>{{ c.country }}</span>
                  </li>
                </ul>
              </div>

              <!-- City Input -->
              <div v-if="selectedCountry" class="relative w-[150px]">
                <input
                  v-model="cityQuery"
                  type="text"
                  placeholder="City"
                  @focus="showCityList = true"
                  @blur="hideCityList"
                  class="outline-none w-[9.5rem] p-2 rounded-lg border text-[var(--primary-color)] border-[var(--primary-color)]"
                />
                <ul
                  v-if="showCityList && filteredCities.length > 0"
                  class="absolute top-full left-0 w-full border border-[var(--primary-color)] rounded outline-none text-[var(--primary-color)] mt-1 p-[0.3rem] bg-white z-10 max-h-40 overflow-y-auto"
                >
                  <li
                    v-for="(city, index) in filteredCities"
                    :key="index"
                    @mousedown="selectCity(city)"
                    class="cursor-pointer p-[0.2rem] hover:bg-[var(--primary-color)] hover:text-white flex items-center"
                  >
                    <span>{{ city }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Gender Selection -->
          <div class="flex justify-between items-center">
            <label class="text-[var(--primary-color)] font-semibold"
              >Gender:</label
            >
            <select
              v-model="gender"
              class="outline-none w-80 p-2 rounded-lg border bg-white text-[var(--primary-color)] border-[var(--primary-color)]"
            >
              <option value="" selected disabled>Select gender</option>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
            </select>
          </div>

          <!-- Date of Birth -->
          <div class="flex justify-between items-center">
            <label class="text-[var(--primary-color)] font-semibold"
              >Date of Birth:</label
            >
            <input
              class="outline-none w-80 p-2 rounded-lg border text-[var(--primary-color)] border-[var(--primary-color)]"
              type="date"
              v-model="birthDate"
            />
          </div>

          <!-- Phone Number -->
          <div class="relative flex items-center justify-between gap-4">
            <label class="text-[var(--primary-color)] font-semibold"
              >Phone Number:</label
            >
            <!-- Phone Code Input -->
            <div class="flex gap-2">
              <div class="relative">
                <input
                  class="outline-none w-16 p-2 rounded-lg border text-[var(--primary-color)] border-[var(--primary-color)]"
                  type="text"
                  v-model="code"
                  placeholder="+251"
                  @focus="showPhoneCodeList = true"
                  @blur="hidePhoneCodeList"
                />
                <ul
                  v-if="
                    showPhoneCodeList &&
                    filteredPhoneCodes &&
                    filteredPhoneCodes.length > 0
                  "
                  class="absolute top-full left-0 w-[300px] border border-[var(--primary-color)] rounded outline-none text-[var(--primary-color)] mt-1 p-[0.3rem] bg-white z-10 max-h-24 overflow-x-hidden overflow-y-auto"
                >
                  <li
                    v-for="(phoneCode, index) in filteredPhoneCodes"
                    :key="index"
                    @mousedown="handlePhoneCodeClick(phoneCode)"
                    class="cursor-pointer p-[0.2rem] hover:bg-[var(--primary-color)] hover:text-white flex items-center"
                  >
                    <span>
                      ({{ phoneCode.code }}) {{ phoneCode.flag }}
                      {{ phoneCode.name }}</span
                    >
                  </li>
                </ul>
              </div>

              <!-- Phone Number Input -->
              <div class="w-[248px]">
                <input
                  class="outline-none w-full p-2 rounded-lg border text-[var(--primary-color)] border-[var(--primary-color)]"
                  type="text"
                  v-model="number"
                  placeholder="912-34-5678"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          class="w-full py-3 bg-[var(--primary-color)] text-white rounded-lg mt-4 hover:bg-opacity-80"
        >
          Create Profile
        </button>
      </form>
    </div>
  </div>
</template>
