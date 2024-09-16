<script setup>
import { useUserStore } from "#imports";

const store = useUserStore();
const { $axios } = useNuxtApp();
const missingPersons = ref([]);
const searchQuery = ref("");

// Filter options added for gender, nationality, skin color, marital status, hair color, and physical disability
const genderFilter = ref("");
const nationalityFilter = ref("");
const skinColorFilter = ref("");
const maritalStatusFilter = ref("");
const hairColorFilter = ref("");
const physicalDisabilityFilter = ref("");
const mentalDisabilityFilter = ref("");

const showSidebar = ref(false);

const currentPage = ref(1);
const hasMore = ref(true);
const isFetching = ref(false);

// Function to fetch posts from the backend, modified to accept filters
const fetchPosts = async () => {
  if (isFetching.value || !hasMore.value) return;

  store.setLoading(true);
  isFetching.value = true;

  try {
    const response = await $axios.get("/post", {
      headers: {
        Authorization: `Bearer ${store.token}`,
      },
      params: {
        name: searchQuery.value,
        page: currentPage.value,
        per_page: 8,
      },
    });

    if (response.data.data.length < 4) {
      hasMore.value = false;
    }

    missingPersons.value.push(...response.data.data);
    currentPage.value++;

    store.setLoading(false);
    isFetching.value = false;
    // console.log(
    //   response.data.data,
    //   missingPersons.value,
    //   filteredMissingPersons.value
    // );
  } catch (error) {
    console.error(
      "Failed to load posts",
      error.response ? error.response.data : error.message
    );
    store.setLoading(false);
    isFetching.value = false;
  }
};

watch(searchQuery, () => {
  currentPage.value = 1;
  hasMore.value = true;
  missingPersons.value = [];
  fetchPosts();
});

onMounted(fetchPosts);

const filteredMissingPersons = computed(() => {
  return missingPersons.value.filter((person) => {
    const matchesGender =
      !genderFilter.value || person.gender === genderFilter.value;
    const matchesNationality =
      !nationalityFilter.value ||
      person.nationality === nationalityFilter.value;
    const matchesSkinColor =
      !skinColorFilter.value || person.skinColor === skinColorFilter.value;
    const matchesMaritalStatus =
      !maritalStatusFilter.value ||
      person.maritalStatus === maritalStatusFilter.value;
    const matchesHairColor =
      !hairColorFilter.value || person.hairColor === hairColorFilter.value;
    const matchesPhysicalDisability =
      !physicalDisabilityFilter.value ||
      person.physicalDisability.includes(
        physicalDisabilityFilter.value.toLocaleUpperCase()
      );
    const matchesMentalDisability =
      !mentalDisabilityFilter.value ||
      person.mentalDisability.includes(
        mentalDisabilityFilter.value.toLocaleUpperCase()
      );

    // If all filters are empty, show all posts
    return (
      matchesGender &&
      matchesNationality &&
      matchesSkinColor &&
      matchesMaritalStatus &&
      matchesHairColor &&
      matchesPhysicalDisability &&
      matchesMentalDisability
    );
  });
});

// Fetch list of countries for nationality filter
const countries = ref([]);
const showCountryList = ref(false);

onMounted(async () => {
  const response = await fetch("https://restcountries.com/v3.1/all");
  countries.value = await response.json();
});

// Computed property to filter countries based on input
const filteredCountries = computed(() => {
  return countries.value.filter((country) =>
    country.name.common
      .toLowerCase()
      .includes(nationalityFilter.value.toLowerCase())
  );
});

// Select country from the list
const selectCountry = (country) => {
  nationalityFilter.value = `${country.name.common}`;
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
  <div class="mt-[3rem]">
    <div v-if="store.isLoading">
      <Spinner />
    </div>
    <div
      class="flex mx-[2.5rem] mb-[1rem] gap-[7rem] justify-between items-center"
    >
      <div class="flex justify-between w-full items-center">
        <h1
          class="text-[40px] text-[var(--primary-color)] text-center w-full font-[sora] font-semibold"
        >
          Missing Reported
        </h1>
      </div>
    </div>
    <hr />
    <div class="flex justify-center mt-[1rem] gap-[1rem]">
      <SearchBar @search="(query) => (searchQuery = query)" />
      <button @click="showSidebar = !showSidebar" class="btn-filter">
        Filter
      </button>
    </div>

    <div>
      <!-- Filter Button -->

      <!-- Overlay to reduce opacity of the entire page when sidebar is open -->
      <transition name="fade">
        <div
          v-if="showSidebar"
          class="fixed inset-0 bg-black bg-opacity-50 z-40"
          @click="showSidebar = false"
        ></div>
      </transition>

      <!-- Sidebar for filters -->
      <transition name="slide-right">
        <div
          v-if="showSidebar"
          class="fixed right-0 top-0 h-full w-[300px] bg-[var(--background-color)] shadow-lg p-4 z-50"
        >
          <button
            @click="showSidebar = false"
            class="absolute top-2 right-2 text-gray-500 hover:text-[var(--text-color)]"
          >
            ✕
          </button>

          <h2 class="text-lg font-semibold mb-4">Filters</h2>

          <!-- Filter options inside the sidebar -->
          <div class="flex flex-col gap-4">
            <!-- Gender filter -->
            <select
              v-model="genderFilter"
              class="w-full bg-[var(--background-color)] border border-[var(--primary-color)] text-[var(--text-color)] text-sm rounded-lg focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)] block h-[40px] p-[0.5rem] shadow-sm transition outline-none duration-150 ease-in-out"
            >
              <option disabled selected value="">Gender</option>
              <option value="">All</option>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
            </select>

            <!-- Nationality filter with searchable dropdown -->
            <div class="w-full">
              <div class="relative">
                <input
                  v-model="nationalityFilter"
                  type="text"
                  placeholder="Nationality"
                  @focus="showCountryList = true"
                  @blur="hideCountryList"
                  class="w-full p-[0.3rem] border border-[var(--primary-color)] bg-[var(--background-color)] text-[var(--text-color)] rounded outline-none"
                />
                <ul
                  v-if="showCountryList && filteredCountries.length > 0"
                  class="absolute top-full left-0 w-full border border-[var(--primary-color)] rounded outline-none text-[var(--primary-color)] mt-1 p-[0.3rem] bg-[var(--background-color)] z-10 max-h-40 overflow-y-auto"
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

            <!-- Skin color filter -->
            <select
              v-model="skinColorFilter"
              class="w-full bg-[var(--background-color)] border border-[var(--primary-color)] text-[var(--text-color)] text-sm rounded-lg focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)] block h-[40px] p-[0.5rem] shadow-sm transition outline-none duration-150 ease-in-out"
            >
              <option disabled selected value="">Skin Color</option>
              <option value="">All</option>
              <option value="WHITE">White</option>
              <option value="DARK">Dark</option>
              <option value="LIGHTSKIN">Light-Skin</option>
              <option value="BROWN">Brown</option>
              <option value="OTHER">Other</option>
            </select>

            <!-- Marital status filter -->
            <select
              v-model="maritalStatusFilter"
              class="w-full bg-[var(--background-color)] border border-[var(--primary-color)] text-[var(--text-color)] text-sm rounded-lg focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)] block h-[40px] p-[0.5rem] shadow-sm transition outline-none duration-150 ease-in-out"
            >
              <option disabled selected value="">Marital Status</option>
              <option value="">All</option>
              <option value="MARRIED">Married</option>
              <option value="SINGLE">Single</option>
              <option value="DIVORCED">Divorced</option>
              <option value="WIDOWED">Widowed</option>
              <option value="ENGAGED">Engaged</option>
            </select>

            <!-- Hair color filter -->
            <select
              v-model="hairColorFilter"
              class="w-full bg-[var(--background-color)] border border-[var(--primary-color)] text-[var(--text-color)] text-sm rounded-lg focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)] block h-[40px] p-[0.5rem] shadow-sm transition outline-none duration-150 ease-in-out"
            >
              <option disabled selected value="">Hair Color</option>
              <option value="">All</option>
              <option value="BLACK">Black</option>
              <option value="GRAY">Gray</option>
              <option value="BROWN">Brown</option>
              <option value="BLONDE">Blonde</option>
              <option value="WHITE">White</option>
              <option value="ORANGE">Orange</option>
              <option value="OTHER">Other</option>
            </select>

            <!-- Physical disability filter -->
            <select
              v-model="physicalDisabilityFilter"
              class="w-full bg-[var(--background-color)] border border-[var(--primary-color)] text-[var(--text-color)] text-sm rounded-lg focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)] block h-[40px] p-[0.5rem] shadow-sm transition outline-none duration-150 ease-in-out"
            >
              <option disabled selected value="">Physical Disability</option>
              <option value="NONE">None</option>
              <option value="MOBILITY_ISSUE">Mobility Issue</option>
              <option value="VISION_IMPAIRMENT">Vision Impairment</option>
              <option value="HEARING_LOSS">Hearing Loss</option>
              <option value="NEUROLOGICAL_CONDITION">
                Neurological condition
              </option>
              <option value="NON_VERBAL">Non Verbal</option>
              <option value="LIMB_DIFFERENCE">Limb Difference</option>
              <option value="OTHER">Other</option>
            </select>
            <!-- Mental disability filter -->
            <select
              v-model="mentalDisabilityFilter"
              class="w-full bg-[var(--background-color)] border border-[var(--primary-color)] text-[var(--text-color)] text-sm rounded-lg focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)] block h-[40px] p-[0.5rem] shadow-sm transition outline-none duration-150 ease-in-out"
            >
              <option selected disabled value="">Mental Disability</option>
              <option value="NONE">None</option>
              <option value="INTELLECTUAL_DISABILITY">
                Intellectual Disability
              </option>
              <option value="AUTISM_SPECTRUM_DISORDER">
                Autism Spectrum Disorder
              </option>
              <option value="ADHD">ADHD</option>
              <option value="SCHIZOPHRENIA">Schizophrenia</option>
              <option value="BIPOLAR_DISORDER">Bipolar Disorder</option>
              <option value="ANXIETY_DISORDER">Anxiety Disorder</option>
              <option value="DEPRESSION">Depression</option>
              <option value="OCD">OCD</option>
              <option value="PTSD">PTSD</option>
              <option value="DEMENTIA">Dementia</option>
              <option value="OTHER">Other</option>
            </select>
          </div>
        </div>
      </transition>
    </div>

    <div v-if="!filteredMissingPersons.length" class="w-full text-center">
      <p class="text-gray-500 h-64 text-lg py-12">No matching results found.</p>
    </div>

    <div class="grid grid-cols-4 gap-4 px-12 py-4 mt-4 mx-4">
      <MissingCard
        v-for="(person, index) in filteredMissingPersons"
        :key="index"
        :postId="person.id"
        :lastSeenWearing="person.lastSeenWearing"
        :lastSeenLocation="person.lastSeenLocation"
        :lastSeenDate="person.lastSeenDate"
        :description="person.description"
        :height="person.height"
        :languageSpoken="person.languageSpoken"
        :nationality="person.nationality"
        :hairColor="person.hairColor"
        :skinColor="person.skinColor"
        :recognizableFeatures="person.recognizableFeatures"
        :maritalStatus="person.maritalStatus"
        :physicalDisability="person.physicalDisability"
        :mentalDisability="person.mentalDisability"
        :medicalIssues="person.medicalIssues"
        :gender="person.gender"
        :firstName="person.firstName"
        :middleName="person.middleName"
        :lastName="person.lastName"
        :dateOfBirth="person.dateOfBirth"
        :educationalLevel="person.educationalLevel"
        :images="person.images"
        :legalDocuments="person.legalDocuments"
        :videoMessage="person.videoMessage"
        :reporterName="`${person.user.Profile?.firstName} ${person.user.Profile?.lastName}`"
        :reporterImgUrl="person.user.Profile?.profilePicture"
        :reporterEmail="person.user.email"
      />
    </div>
    <button
      v-if="hasMore && !isFetching"
      @click="fetchPosts"
      class="load-more-btn"
    >
      Load More
    </button>
  </div>
</template>
<style>
/* Filter button styling */
.btn-filter {
  padding: 0.5rem 1rem;
  background-color: var(--secondary-color);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-filter:hover {
  background-color: var(--primary-color);
}

/* Slide in transition */
.slide-right-enter-active,
.slide-right-leave-active {
  transition: transform 0.3s ease;
}

.slide-right-enter {
  transform: translateX(100%);
}

.slide-right-leave-to {
  transform: translateX(100%);
}
</style>
