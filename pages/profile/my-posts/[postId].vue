<script setup>
import { useUserStore, useRoute, useRouter } from "#imports";
import { ref } from "vue";

const store = useUserStore();
const { $axios } = useNuxtApp();
const route = useRoute();
const router = useRouter();

const postId = route.params.postId;
const foundCondition = ref("");
const foundThrough = ref("");
const foundDate = ref("");
const foundLocation = ref("");
const description = ref("");
const closeCaseErrorMessage = ref("");
const showStoryPrompt = ref(false);
const closeCaseId = ref("");

onMounted(() => {
  if (!store.token) {
    navigateTo("/auth/login");
  }
});

const validateCloseCaseForm = () => {
  if (
    !foundCondition.value.trim() ||
    !foundThrough.value.trim() ||
    !foundDate.value.trim() ||
    !foundLocation.value.trim()
  ) {
    closeCaseErrorMessage.value = "All fields are required for closing a case.";
    return false;
  }
  closeCaseErrorMessage.value = "";
  return true;
};

function formatDateToInput(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

const closeCase = async () => {
  if (!validateCloseCaseForm()) {
    return;
  }

  store.setLoading(true);
  try {
    const data = {
      foundCondition: foundCondition.value,
      foundThrough: foundThrough.value,
      foundDate: formatDateToInput(foundDate.value),
      foundLocation: `${selectedLSLCity.value}, ${selectedLSLCountry.value.country}`,
      description: description.value,
    };

    const res = await $axios.patch(`/post/close/${postId}`, data, {
      headers: {
        Authorization: `Bearer ${store.token}`,
        "Content-Type": "application/json",
      },
    });

    console.log("Case closed successfully", res.data);
    closeCaseId.value = res.data.data.id;
    showStoryPrompt.value = true; // Show the Yes/No prompt after form submission
  } catch (error) {
    console.log(error.response ? error.response.data : error.message);
    closeCaseErrorMessage.value = error.response
      ? error.response.data.message
      : error.message;
  } finally {
    store.setLoading(false);
  }
};

const goBack = () => {
  router.back();
};

// Function to handle "Yes" response for writing the story
const navigateToSuccessStory = () => {
  router.push(`/success-story/create/${closeCaseId.value}`);
};

// Function to handle "No" response for skipping the story
const closeWithoutStory = () => {
  goBack();
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
    const response = await fetch(
      "https://countriesnow.space/api/v0.1/countries"
    );

    const data = await response.json();
    lSLCountries.value = data.data;
    console.log(lSLCountries.value);
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
  <Spinner v-if="store.isLoading" />
  <div v-else class="container mx-auto p-4">
    <div
      class="bg-white rounded-md w-[42rem] mx-auto text-center border border-[var(--primary-color)]"
    >
      <button
        @click="goBack"
        title="Back"
        class="flex items-center text-[var(--primary-color)] px-4 py-2 mt-4 hover:underline"
      >
        <Icon name="mdi-arrow-left" size="24" class="mr-2" />
      </button>

      <h2 class="text-[var(--primary-color)] text-2xl mb-6">Person Found</h2>
      <!-- Close Case Form -->
      <form class="p-6 w-full" @submit.prevent="closeCase">
        <div class="flex items-center justify-between mb-4">
          <label
            class="text-[var(--primary-color)] font-medium w-1/4 text-right pr-2"
            >Found Condition:</label
          >
          <select
            v-model="foundCondition"
            class="border border-[var(--primary-color)] rounded-md outline-none text-[var(--primary-color)] p-2 w-3/4"
          >
            <option value="" selected disabled>Found Condition</option>
            <option value="ALIVE_WELL">Alive and Well</option>
            <option value="INJURED">Injured</option>
            <option value="SICK">Sick</option>
            <option value="UNRESPONSIVE">Unresponsive</option>
            <option value="DECEASED">Deceased</option>
            <option value="UNKNOWN">Unknown</option>
          </select>
        </div>

        <div class="flex items-center justify-between mb-4">
          <label
            class="text-[var(--primary-color)] font-medium w-1/4 text-right pr-2"
            >Found Through:</label
          >
          <select
            v-model="foundThrough"
            class="border border-[var(--primary-color)] rounded-md outline-none text-[var(--primary-color)] p-2 w-3/4"
          >
            <option value="" selected disabled>Found Through</option>
            <option value="AFALAGI">Afalagi</option>
            <option value="POLICE">Police</option>
            <option value="COMMUNITY_SEARCH">Community Search</option>
            <option value="FAMILY_FRIENDS">Family/Friends</option>
            <option value="RETURNED_ON_OWN">On their own</option>
            <option value="SOCIAL_MEDIA">Social Media</option>
            <option value="MEDICAL_INSTITUTION">Medical Institution</option>
            <option value="OTHER">Other</option>
          </select>
        </div>

        <div class="flex items-center justify-between mb-4">
          <label
            class="text-[var(--primary-color)] font-medium w-1/4 text-right pr-2"
            >Found Date:</label
          >
          <input
            type="date"
            v-model="foundDate"
            class="border border-[var(--primary-color)] rounded-md outline-none text-[var(--primary-color)] p-2 w-3/4"
          />
        </div>

        <div class="flex gap-[1.35rem] px-[3rem] justify-between items-center">
          <label class="text-[var(--primary-color)] text-[1rem] font-medium">
            Found Location:
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
              v-if="
                showLSLCityList &&
                filteredLSLCities &&
                filteredLSLCities.length > 0
              "
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

        <div class="flex items-center justify-between mb-4">
          <label
            class="text-[var(--primary-color)] font-medium w-1/4 text-right pr-2"
            >Description:</label
          >
          <textarea
            v-model="description"
            placeholder="Write your description here..."
            class="border border-[var(--primary-color)] rounded-md outline-none text-[var(--primary-color)] p-2 w-3/4 h-28 resize-none"
          ></textarea>
        </div>

        <div v-if="closeCaseErrorMessage" class="text-red-500 mb-4">
          {{ closeCaseErrorMessage }}
        </div>

        <button
          class="bg-[var(--secondary-color)] text-white px-4 py-2 rounded hover:bg-[#0097e1] transition w-full"
        >
          Close Case
        </button>
      </form>

      <!-- Success Story Prompt (Pop-up) -->
      <div
        v-if="showStoryPrompt"
        class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50"
      >
        <div class="bg-white p-6 rounded-lg text-center shadow-lg">
          <h3 class="text-[var(--primary-color)] text-lg font-semibold mb-4">
            Would you like to write your story?
          </h3>
          <div class="flex justify-center space-x-4">
            <button
              @click="navigateToSuccessStory"
              class="text-[var(--primary-color)] ring-[var(--primary-color)] px-4 py-2 rounded hover:bg-[var(--primary-color)] hover:text-white transition"
            >
              Yes
            </button>
            <button
              @click="closeWithoutStory"
              class="text-[var(--primary-color)] ring-[var(--primary-color)] px-4 py-2 rounded hover:bg-[var(--primary-color)] hover:text-white transition"
            >
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
