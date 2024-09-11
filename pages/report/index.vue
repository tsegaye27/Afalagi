<script setup>
import { useUserStore } from "#imports";

// State to control the toaster
const toasterVisible = ref(false);
const toasterMessage = ref("");
const toasterType = ref("success"); // or 'error'
const toasterDuration = ref(3000);

function showToaster(message, type = "success", duration = 3000) {
  toasterMessage.value = message;
  toasterType.value = type;
  toasterDuration.value = duration;
  toasterVisible.value = true;

  setTimeout(() => {
    toasterVisible.value = false;
  }, duration);
}

const store = useUserStore();
const { $axios } = useNuxtApp();
const postData = ref({
  firstName: "",
  middleName: "",
  lastName: "",
  images: "",
  legalDocs: "",
  description: "",
  lastSeenDate: "",
  languageSpoken: "",
  nationality: "",
  hairColor: "",
  skinColor: "",
  recognizableFeatures: "",
  physicalDisability: "",
  mentalDisability: "",
  medicalIssues: "",
  posterRelation: "",
  gender: "",
  dateOfBirth: "",
  educationalLevel: "",
  videoMessage: "",
  maritalStatus: "",
});

const code = ref("");
const number = ref("");
const phoneNumber = computed(() => `${code.value}${number.value}`);
const lastSeenWearing = ref("");
const height = ref("");

const currentStep = ref(1);

const countries = ref([]);
const nationalityQuery = ref("");
const showCountryList = ref(false);

onMounted(async () => {
  const response = await fetch("https://restcountries.com/v3.1/all");
  countries.value = await response.json();
});

const filteredCountries = computed(() => {
  return countries.value.filter((country) =>
    country.name.common
      .toLowerCase()
      .includes(nationalityQuery.value.toLowerCase())
  );
});

const selectCountry = (country) => {
  postData.value.nationality = country.name.common;
  nationalityQuery.value = `${country.name.common}`;
  showCountryList.value = false;
};

const hideCountryList = () => {
  setTimeout(() => {
    showCountryList.value = false;
  }, 100);
};

const handleLegalDocs = (event) => {
  postData.value.legalDocs = event.target.files[0];
};
const handleImages = (event) => {
  postData.value.images = event.target.files[0];
};
const handleVideoMessage = (event) => {
  postData.value.videoMessage = event.target.files[0];
};

const progressWidth = computed(() => {
  switch (currentStep.value) {
    case 1:
      return "33%";
    case 2:
      return "66%";
    case 3:
      return "100%";
    default:
      return "0%";
  }
});

const reportMissing = async () => {
  store.setLoading(true);
  const formData = new FormData();

  postData.value.maritalStatus = postData.value.maritalStatus.toUpperCase();
  postData.value.medicalIssues = postData.value.medicalIssues.toUpperCase();
  postData.value.physicalDisability =
    postData.value.physicalDisability.toUpperCase();
  postData.value.mentalDisability =
    postData.value.mentalDisability.toUpperCase();
  postData.value.posterRelation = postData.value.posterRelation.toUpperCase();
  postData.value.educationalLevel =
    postData.value.educationalLevel.toUpperCase();
  postData.value.hairColor = postData.value.hairColor.toUpperCase();
  postData.value.skinColor = postData.value.skinColor.toUpperCase();

  formData.append("postImages", postData.value.images);
  formData.append("legalDocs", postData.value.legalDocs);
  // formData.append("videoMessage", postData.value.videoMessage);
  formData.append("dateOfBirth", postData.value.dateOfBirth);
  // formData.append("height", height.value * 1);
  formData.append("maritalStatus", postData.value.maritalStatus.toUpperCase());
  formData.append("medicalIssues", postData.value.medicalIssues.toUpperCase());
  formData.append(
    "physicalDisability",
    postData.value.physicalDisability.toUpperCase()
  );
  formData.append(
    "mentalDisability",
    postData.value.mentalDisability.toUpperCase()
  );
  formData.append(
    "posterRelation",
    postData.value.posterRelation.toUpperCase()
  );
  formData.append(
    "educationalLevel",
    postData.value.educationalLevel.toUpperCase()
  );
  formData.append("hairColor", postData.value.hairColor.toUpperCase());
  formData.append("skinColor", postData.value.skinColor.toUpperCase());
  formData.append("description", postData.value.description);
  formData.append("recognizableFeatures", postData.value.recognizableFeatures);
  formData.append("firstName", postData.value.firstName);
  formData.append("middleName", postData.value.middleName);
  formData.append("lastName", postData.value.lastName);
  formData.append("birthDate", postData.value.birthDate);
  formData.append("gender", postData.value.gender);
  formData.append("phoneNumber", phoneNumber);
  formData.append("nationality", postData.value.nationality);
  formData.append("languageSpoken", postData.value.languageSpoken);
  // formData.append("lastSeenWearing", lastSeenWearing.value);
  formData.append("lastSeenDate", postData.value.lastSeenDate);
  formData.append(
    "lastSeenLocation",
    `${selectedLSLCity.value}, ${selectedLSLCountry.value}`
  );
  formData.append("lastSeenWearing", lastSeenWearing.value);

  try {
    const response = await $axios.post("/post", formData, {
      headers: {
        Authorization: `Bearer ${store.token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("Success✅", response.data.data);
    showToaster("Operation successful", "success");
    navigateTo("/profile/my-posts");
    store.setLoading(false);
  } catch (error) {
    console.log(
      "Failure❌",
      error.response ? error.response.data : error.message,
      postData,
      height.value,
      lastSeenWearing.value,
      phoneNumber
    );
    showToaster(
      error.response ? error.response.data.message : error.message,
      "error"
    );
    store.setLoading(false);
  }
};

// Validator function based on the current step
function validateStep() {
  let hasErrors = false;
  if (currentStep.value === 1) {
    if (!postData.value.firstName) {
      hasErrors = true;
    }
    if (!postData.value.middleName) {
      hasErrors = true;
    }
    if (!postData.value.lastName) {
      hasErrors = true;
    }
    if (!postData.value.gender) {
      hasErrors = true;
    }
    if (!postData.value.dateOfBirth) {
      hasErrors = true;
    }
    if (!postData.value.lastSeenDate) {
      hasErrors = true;
    }
    if (!postData.value.nationality) {
      hasErrors = true;
    }
    if (!selectedLSLCountry.value) {
      hasErrors = true;
    }
    if (!selectedLSLCity.value) {
      hasErrors = true;
    }
  } else if (currentStep.value === 2) {
    if (!lastSeenWearing.value) {
      hasErrors = true;
    }
    if (!postData.value.description) {
      hasErrors = true;
    }
    if (!postData.value.skinColor) {
      hasErrors = true;
    }
    if (!postData.value.hairColor) {
      hasErrors = true;
    }
  } else if (currentStep.value === 3) {
    if (!postData.value.images) {
      hasErrors = true;
    }
    if (!postData.value.legalDocs) {
      hasErrors = true;
    }
  }
  hasErrors ? showToaster("Please fill all the fields", "error") : "";
  return !hasErrors; // Return true if no errors
}

// Function to go to the next step, only if validation passes
const goNext = () => {
  if (validateStep()) {
    if (currentStep.value < 3) currentStep.value += 1;
  }
};

const goBack = () => {
  if (currentStep.value > 1) currentStep.value -= 1;
};

// Reactive variables for country and city search
const lSLCountryQuery = ref("");
const lSLCityQuery = ref("");
const selectedLSLCountry = ref(null);
const selectedLSLCity = ref(null);

// State to show/hide dropdowns
const showLSLCountryList = ref(false);
const showLSLCityList = ref(false);

// Store fetched countries and cities
const lSLCountries = ref([]);
const filteredLSLCountries = computed(() => {
  return lSLCountries.value.filter((country) =>
    country.country.toLowerCase().includes(lSLCountryQuery.value.toLowerCase())
  );
});
const filteredLSLCities = computed(() => {
  if (!selectedLSLCountry.value) return [];
  return selectedLSLCountry.value.cities.filter((city) =>
    city.toLowerCase().includes(lSLCityQuery.value.toLowerCase())
  );
});

// Fetch countries and cities data from the API
const fetchLSLCountries = async () => {
  try {
    const response = await $axios.get(
      "https://countriesnow.space/api/v0.1/countries"
    );
    lSLCountries.value = response.data.data; // API response data
  } catch (error) {
    console.error("Error fetching countries:", error);
  }
};

// Fetch data when component is mounted
onMounted(() => {
  fetchLSLCountries();
});

// Select a country and reset the city
function selectLSLCountry(country) {
  selectedLSLCountry.value = country;
  lSLCountryQuery.value = country.country;
  showLSLCountryList.value = false;
  lSLCityQuery.value = ""; // Reset city query on country change
  selectedLSLCity.value = null; // Reset selected city
}

// Select a city
function selectLSLCity(city) {
  selectedLSLCity.value = city;
  lSLCityQuery.value = city;
  showLSLCityList.value = false;
}

// Hide country and city lists
function hideLSLCountryList() {
  setTimeout(() => (showLSLCountryList.value = false), 100);
}

function hideLSLCityList() {
  setTimeout(() => (showLSLCityList.value = false), 100);
}
</script>

<template>
  <div class="report-form flex flex-col justify-center items-center my-[2rem]">
    <div class="w-[750px] h-[10px] bg-gray-400 rounded my-[1rem] relative">
      <div
        class="h-full bg-[var(--secondary-color)] rounded absolute top-0 left-0 progress-fill"
        :style="{ width: progressWidth }"
      ></div>
    </div>

    <Toaster
      v-if="toasterVisible"
      :message="toasterMessage"
      :type="toasterType"
      :duration="toasterDuration"
    />

    <form
      @submit.prevent="reportMissing"
      class="flex flex-col gap-[3.5rem] px-[2rem] border border-slate-400 py-[2rem] w-[50%] rounded-md justify-start items-start"
    >
      <h1
        class="text-center w-full uppercase text-[var(--secondary-color)] text-3xl font-medium"
      >
        Missing person details
      </h1>

      <!-- Step 1 -->
      <div v-if="currentStep === 1" class="flex flex-col gap-[0.7rem]">
        <div class="flex gap-[1.8rem] justify-between px-[3rem] items-center">
          <label class="text-[var(--primary-color)] text-[1rem] font-medium"
            >First name:
          </label>
          <input
            type="text"
            class="border border-[var(--primary-color)] rounded w-[320px] outline-none text-[var(--primary-color)] p-[0.1rem] pl-[0.5rem]"
            v-model="postData.firstName"
            placeholder="Abraham"
          />
        </div>
        <div class="flex gap-2 justify-between px-[3rem] items-center">
          <label class="text-[var(--primary-color)] text-[1rem] font-medium"
            >Middle name:
          </label>
          <input
            type="text"
            class="border border-[var(--primary-color)] rounded w-[320px] outline-none text-[var(--primary-color)] p-[0.1rem] pl-[0.5rem]"
            v-model="postData.middleName"
            placeholder="Desalegn"
          />
        </div>
        <div class="flex gap-[1.8rem] justify-between px-[3rem] items-center">
          <label class="text-[var(--primary-color)] text-[1rem] font-medium"
            >Last name:
          </label>
          <input
            type="text"
            class="border border-[var(--primary-color)] rounded w-[320px] outline-none text-[var(--primary-color)] p-[0.1rem] pl-[0.5rem]"
            v-model="postData.lastName"
            placeholder="Feleke"
          />
        </div>
        <div class="flex justify-between px-[3rem] items-center">
          <label class="text-[var(--primary-color)] text-[1rem] font-medium"
            >Gender:</label
          >
          <select
            v-model="postData.gender"
            class="border border-[var(--primary-color)] rounded outline-none text-[var(--primary-color)] p-[0.1rem] w-[320px]"
          >
            <option value="" selected disabled>Select gender</option>
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
          </select>
        </div>
        <div class="flex justify-between px-[3rem] items-center">
          <label class="text-[var(--primary-color)] text-[1rem] font-medium"
            >Nationality:</label
          >
          <div class="relative w-[320px]">
            <input
              v-model="nationalityQuery"
              type="text"
              placeholder="Search nationality"
              @focus="showCountryList = true"
              @blur="hideCountryList"
              class="w-full p-[0.3rem] border border-[var(--primary-color)] text-[var(--primary-color)] rounded outline-none"
            />
            <ul
              v-if="showCountryList && filteredCountries.length > 0"
              class="absolute top-full left-0 w-full border border-[var(--primary-color)] rounded outline-none text-[var(--primary-color)] mt-1 p-[0.3rem] bg-white z-10 max-h-40 overflow-y-auto"
            >
              <li
                v-for="country in filteredCountries"
                :key="country.cca2"
                @mousedown="selectCountry(country)"
                class="cursor-pointer p-[0.2rem] hover:bg-[var(--primary-color)] hover:text-white flex items-center"
              >
                <span>{{ country.flag }} {{ country.name.common }}</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="flex gap-[0.9rem] justify-between px-[3rem] items-center">
          <label class="text-[var(--primary-color)] text-[1rem] font-medium"
            >Date of birth:
          </label>
          <input
            type="date"
            class="border border-[var(--primary-color)] w-[320px] rounded outline-none text-[var(--primary-color)] p-[0.1rem] pl-[0.5rem]"
            v-model="postData.dateOfBirth"
          />
        </div>
        <div class="flex gap-[0.9rem] justify-between px-[3rem] items-center">
          <label class="text-[var(--primary-color)] text-[1rem] font-medium"
            >Last Seen Date:
          </label>
          <input
            type="date"
            class="border border-[var(--primary-color)] w-[320px] rounded outline-none text-[var(--primary-color)] p-[0.1rem] pl-[0.5rem]"
            v-model="postData.lastSeenDate"
          />
        </div>
        <div class="flex gap-[1.35rem] px-[3rem] justify-between items-center">
          <label class="text-[var(--primary-color)] text-[1rem] font-medium">
            Last Seen Location:
          </label>

          <!-- Country Input -->
          <div
            class="relative"
            :class="selectedLSLCountry ? 'w-[150px]' : 'w-[320px]'"
          >
            <input
              v-model="lSLCountryQuery"
              type="text"
              placeholder="Search Country"
              @focus="showLSLCountryList = true"
              @blur="hideLSLCountryList"
              class="w-full p-[0.3rem] border border-[var(--primary-color)] text-[var(--primary-color)] rounded outline-none"
            />
            <ul
              v-if="showLSLCountryList && filteredLSLCountries.length > 0"
              class="absolute top-full left-0 w-full border border-[var(--primary-color)] rounded outline-none text-[var(--primary-color)] mt-1 p-[0.3rem] bg-white z-10 max-h-40 overflow-y-auto"
            >
              <li
                v-for="(country, index) in filteredLSLCountries"
                :key="index"
                @mousedown="selectLSLCountry(country)"
                class="cursor-pointer p-[0.2rem] hover:bg-[var(--primary-color)] hover:text-white flex items-center"
              >
                <span>{{ country.country }}</span>
              </li>
            </ul>
          </div>

          <!-- City Input -->
          <div v-if="selectedLSLCountry" class="relative w-[150px]">
            <input
              v-model="lSLCityQuery"
              type="text"
              placeholder="Search City"
              @focus="showLSLCityList = true"
              @blur="hideLSLCityList"
              class="w-full p-[0.3rem] border border-[var(--primary-color)] text-[var(--primary-color)] rounded outline-none"
            />
            <ul
              v-if="showLSLCityList && filteredLSLCities.length > 0"
              class="absolute top-full left-0 w-full border border-[var(--primary-color)] rounded outline-none text-[var(--primary-color)] mt-1 p-[0.3rem] bg-white z-10 max-h-40 overflow-y-auto"
            >
              <li
                v-for="(city, index) in filteredLSLCities"
                :key="index"
                @mousedown="selectLSLCity(city)"
                class="cursor-pointer p-[0.2rem] hover:bg-[var(--primary-color)] hover:text-white flex items-center"
              >
                <span>{{ city }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Step 2 -->
      <div v-if="currentStep === 2" class="flex flex-col gap-[0.7rem]">
        <div class="flex gap-[1.8rem] justify-between px-[3rem] items-center">
          <label class="text-[var(--primary-color)] text-[1rem] font-medium"
            >Last Seen Wearing:
          </label>
          <textarea
            class="border border-[var(--primary-color)] rounded outline-none text-[var(--primary-color)] p-[0.1rem] pt-[0.5rem] pl-[0.5rem] w-[320px]"
            v-model="lastSeenWearing"
            placeholder="yellow jacket, blue jeans..."
          />
        </div>
        <div class="flex gap-[1.8rem] justify-between px-[3rem] items-center">
          <label class="text-[var(--primary-color)] text-[1rem] font-medium"
            >Description:
          </label>
          <textarea
            class="border border-[var(--primary-color)] rounded outline-none text-[var(--primary-color)] p-[0.1rem] pt-[0.5rem] pl-[0.5rem] w-[320px]"
            v-model="postData.description"
            placeholder="write your description here..."
          />
        </div>
        <div class="flex gap-[1.8rem] justify-between px-[3rem] items-center">
          <label class="text-[var(--primary-color)] text-[1rem] font-medium"
            >Height(cm):
          </label>
          <input
            type="text"
            class="border border-[var(--primary-color)] rounded w-[320px] p-[0.1rem] outline-none text-[var(--primary-color)] pl-[0.5rem]"
            v-model="height"
            placeholder="180"
          />
        </div>
        <div class="flex gap-2 justify-between px-[3rem] items-center">
          <label class="text-[var(--primary-color)] text-[1rem] font-medium"
            >Language Spoken:
          </label>
          <input
            type="text"
            class="border border-[var(--primary-color)] rounded w-[320px] outline-none text-[var(--primary-color)] p-[0.1rem] pl-[0.5rem]"
            v-model="postData.languageSpoken"
            placeholder="Amharic"
          />
        </div>
        <div class="flex gap-[1.8rem] justify-between px-[3rem] items-center">
          <label class="text-[var(--primary-color)] text-[1rem] font-medium"
            >Skin Color:
          </label>
          <select
            class="border border-[var(--primary-color)] h-[30px] rounded w-[320px] outline-none text-[var(--primary-color)] p-[0.1rem] pl-[0.5rem]"
            v-model="postData.skinColor"
          >
            <option value="" selected disabled>Select the Skin Color</option>
            <option value="dark">Dark</option>
            <option value="brown">Brown</option>
            <option value="white">White</option>
            <option value="lightskin">light-skin</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div class="flex gap-[1.8rem] justify-between px-[3rem] items-center">
          <label class="text-[var(--primary-color)] text-[1rem] font-medium"
            >Hair Color:
          </label>
          <select
            class="border border-[var(--primary-color)] rounded h-[30px] w-[320px] outline-none text-[var(--primary-color)] p-[0.1rem] pl-[0.5rem]"
            v-model="postData.hairColor"
          >
            <option selected value="" disabled>Select the Hair Color</option>
            <option value="black">Black</option>
            <option value="brown">Brown</option>
            <option value="white">White</option>
            <option value="blonde">Blonde</option>
            <option value="grey">Grey</option>
            <option value="orange">Orange</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div class="flex gap-[1.8rem] justify-between px-[3rem] items-center">
          <label class="text-[var(--primary-color)] text-[1rem] font-medium"
            >Recognizable Feature:
          </label>
          <textarea
            class="border border-[var(--primary-color)] w-[320px] rounded outline-none py-[0.5rem] text-[var(--primary-color)] p-[0.1rem] pl-[0.5rem]"
            v-model="postData.recognizableFeatures"
            placeholder="thick eyebrows, scar on face"
          />
        </div>
      </div>

      <!-- Step 3 -->
      <div v-if="currentStep === 3" class="flex flex-col gap-[0.7rem]">
        <div class="flex gap-[1.8rem] justify-between px-[3rem] items-center">
          <label class="text-[var(--primary-color)] text-[1rem] font-medium"
            >Physical Disability:
          </label>
          <select
            v-model="postData.physicalDisability"
            class="border border-[var(--primary-color)] rounded outline-none h-[30px] text-[var(--primary-color)] p-[0.1rem] w-[320px]"
          >
            <option value="" selected disabled>
              Select Physical Disability
            </option>
            <option value="none">None</option>
            <option value="mobility_issue">Mobility Issue</option>
            <option value="vision_impairment">Vision Impairment</option>
            <option value="hearing_loss">Hearing Loss</option>
            <option value="neurological_condition">
              Neurological Condition
            </option>
            <option value="non_verbal">Non Verbal</option>
            <option value="limb_difference">Limb Difference</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div class="flex gap-[1.8rem] justify-between px-[3rem] items-center">
          <label class="text-[var(--primary-color)] text-[1rem] font-medium"
            >Mental Disability:
          </label>
          <select
            v-model="postData.mentalDisability"
            class="border border-[var(--primary-color)] rounded outline-none h-[30px] text-[var(--primary-color)] p-[0.1rem] w-[320px]"
          >
            <option selected value="" disabled>Select Mental Disability</option>
            <option value="none">None</option>
            <option value="intellectual_disability">
              Intellectual Disability
            </option>
            <option value="autism_spectrum_disorder">
              Autism Spectrum Disorder
            </option>
            <option value="adhd">ADHD</option>
            <option value="schizophrenia">Schizophrenia</option>
            <option value="bipolar_disorder">Bipolar Disorder</option>
            <option value="anxiety_disorder">Anxiety Disorder</option>
            <option value="depression">Depression</option>
            <option value="ocd">OCD</option>
            <option value="ptsd">PTSD</option>
            <option value="dementia">Dementia</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div class="flex gap-[1.8rem] justify-between px-[3rem] items-center">
          <label class="text-[var(--primary-color)] text-[1rem] font-medium"
            >Health Condition:
          </label>
          <select
            v-model="postData.medicalIssues"
            class="border border-[var(--primary-color)] rounded outline-none h-[30px] text-[var(--primary-color)] p-[0.1rem] w-[320px]"
          >
            <option value="" selected disabled>Select Health Condition</option>
            <option value="none">None</option>
            <option value="diabetes">Diabetes</option>
            <option value="asthma">Asthma</option>
            <option value="hypertension">Hypertension</option>
            <option value="heart_disease">Heart Disease</option>
            <option value="autoImmune_disorder">Auto Immune Disorder</option>
            <option value="epilepsy">Epilepsy</option>
            <option value="multiple_sclerosis">Multiple Sclerosis</option>
            <option value="lupus">Lupus</option>
            <option value="crohns_disease">Crohns Disease</option>
            <option value="chronic_kidney_disease">
              Chronic Kidney Disease
            </option>
            <option value="migraine">Migraine</option>
            <option value="fibromyalgia">Fibromyalgia</option>
            <option value="psoriasis">Psoriasis</option>
            <option value="irritable_bowel_syndrome">
              Irritable Bowel Syndrome
            </option>
            <option value="parkinsons_disease">Parkinsons Disease</option>
            <option value="cancer">Cancer</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div class="flex gap-[1.8rem] justify-between px-[3rem] items-center">
          <label class="text-[var(--primary-color)] text-[1rem] font-medium"
            >Education:
          </label>
          <select
            v-model="postData.educationalLevel"
            class="border border-[var(--primary-color)] rounded outline-none h-[30px] text-[var(--primary-color)] p-[0.1rem] w-[320px]"
          >
            <option value="" selected disabled>Select Educational Level</option>
            <option value="none">None</option>
            <option value="primary">Primary School</option>
            <option value="secondary">Secondary School</option>
            <option value="highschool">High School</option>
            <option value="associate">Associate</option>
            <option value="bachelor">Bachelor</option>
            <option value="master">Master</option>
            <option value="doctorate">Doctorate</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div class="flex gap-[1.8rem] justify-between px-[3rem] items-center">
          <label class="text-[var(--primary-color)] text-[1rem] font-medium"
            >Martial Status:
          </label>
          <select
            v-model="postData.maritalStatus"
            class="border border-[var(--primary-color)] rounded outline-none h-[30px] text-[var(--primary-color)] p-[0.1rem] w-[320px]"
          >
            <option value="" disabled selected>
              Select your Marital Status
            </option>
            <option value="single">Single</option>
            <option value="married">Married</option>
            <option value="divorced">Divorced</option>
            <option value="widowed">Widowed</option>
            <option value="engaged">Engaged</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div class="flex gap-[1.8rem] justify-between px-[3rem] items-center">
          <label class="text-[var(--primary-color)] text-[1rem] font-medium"
            >Poster Relation:
          </label>
          <select
            v-model="postData.posterRelation"
            class="border border-[var(--primary-color)] rounded outline-none h-[30px] text-[var(--primary-color)] p-[0.1rem] w-[320px]"
          >
            <option value="" selected disabled>
              Your relation with the person
            </option>
            <option value="parent">Parent</option>
            <option value="partner">Partner</option>
            <option value="sibling">Sibling</option>
            <option value="relative">Relative</option>
            <option value="friend">Friend</option>
            <option value="guardian">Guardian</option>
            <option value="neighbor">Neighbor</option>
            <option value="colleague">Colleague</option>
            <option value="teacher">Teacher</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div class="flex gap-[1.8rem] justify-between px-[3rem] items-center">
          <label class="text-[var(--primary-color)] text-[1rem] font-medium"
            >Image:
          </label>
          <input
            type="file"
            class="border border-[var(--primary-color)] w-[320px] rounded outline-none text-[var(--primary-color)] p-[0.1rem] pl-[0.5rem]"
            @change="handleImages"
            accept=".jpg, .jpeg, .png"
          />
        </div>
        <div class="flex gap-[1.8rem] justify-between px-[3rem] items-center">
          <label class="text-[var(--primary-color)] text-[1rem] font-medium"
            >Video Message:
          </label>
          <input
            type="file"
            class="border border-[var(--primary-color)] w-[320px] rounded outline-none text-[var(--primary-color)] p-[0.1rem] pl-[0.5rem]"
            @change="handleVideoMessage"
            accept="video/*"
          />
        </div>
        <div class="flex gap-[1.8rem] justify-between px-[3rem] items-center">
          <label class="text-[var(--primary-color)] text-[1rem] font-medium"
            >Legal Documents:
          </label>
          <input
            type="file"
            class="border border-[var(--primary-color)] w-[320px] rounded outline-none text-[var(--primary-color)] p-[0.1rem] pl-[0.5rem]"
            @change="handleLegalDocs"
            accept=".pdf,.jpg, .png"
          />
        </div>
      </div>

      <!-- Navigation buttons -->
      <div class="flex justify-end gap-[25rem] w-full px-[3rem] mt-[2rem]">
        <button
          v-if="currentStep > 1"
          type="button"
          class="text-white bg-[var(--primary-color)] py-[0.5rem] px-[2rem] rounded-md"
          @click="goBack"
        >
          Back
        </button>

        <button
          v-if="currentStep < 3"
          type="button"
          class="text-white bg-[var(--secondary-color)] py-[0.5rem] px-[2rem] rounded-md float-right"
          @click="goNext"
        >
          Next
        </button>

        <button
          v-if="currentStep === 3"
          type="submit"
          class="text-white bg-[var(--secondary-color)] py-[0.5rem] px-[2rem] rounded-md"
        >
          Report
        </button>
      </div>
    </form>
  </div>
</template>
<style>
.progress-bar {
  width: 100%;
  height: 10px;
  background-color: #e0e0e0;
  border-radius: 5px;
  margin: 1rem 0;
  position: relative;
}

.progress-fill {
  transition: width 0.3s ease;
}
</style>
