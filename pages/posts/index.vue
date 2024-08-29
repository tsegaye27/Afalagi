<script setup>
import { useUserStore } from "#imports";
const store = useUserStore();
const { $axios } = useNuxtApp();
const missingPersons = ref([]);
const searchQuery = ref("");

const genderFilter = ref("");
const nationalityFilter = ref("");
const skinColorFilter = ref("");
const maritalStatusFilter = ref("");
const hairColorFilter = ref("");
const physicalDisabilityFilter = ref("");

const fetchPosts = async () => {
  store.setLoading(true);
  try {
    const response = await $axios.get("/post", {
      headers: {
        Authorization: `Bearer ${store.token}`,
      },
      params: {
        name: searchQuery.value,
      },
    });
    missingPersons.value = response.data.data;
    store.setLoading(false);
  } catch (error) {
    console.error(
      "failed to load",
      error.response ? error.response.data : error.message
    );
    store.setLoading(false);
  }
};

watch(searchQuery, fetchPosts);

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
    const matchesHairColorFilter =
      !hairColorFilter.value || person.hairColor === hairColorFilter.value;
    const matchesPhysicalDisabilityFilter =
      !physicalDisabilityFilter.value.toLocaleUpperCase() ||
      person.physicalDisability.includes(
        physicalDisabilityFilter.value.toLocaleUpperCase()
      );

    return (
      matchesGender &&
      matchesNationality &&
      matchesSkinColor &&
      matchesMaritalStatus &&
      matchesHairColorFilter &&
      matchesPhysicalDisabilityFilter
    );
  });
});
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
    </div>

    <div class="flex justify-center mt-[1rem] gap-[1rem]">
      <select
        v-model="genderFilter"
        class="border border-[var(--primary-color)] rounded outline-none h-[30px] text-[var(--primary-color)] p-[0.1rem]"
      >
        <option selected disabled value="">Gender</option>
        <option value="MALE">Male</option>
        <option value="FEMALE">Female</option>
      </select>
      <select
        v-model="nationalityFilter"
        class="border border-[var(--primary-color)] rounded outline-none h-[30px] text-[var(--primary-color)] p-[0.1rem]"
      >
        <option selected disabled value="">Nationality</option>
        <option value="ethiopian">Ethiopian</option>
        <option value="other">Other</option>
      </select>
      <select
        v-model="skinColorFilter"
        class="border border-[var(--primary-color)] rounded outline-none h-[30px] text-[var(--primary-color)] p-[0.1rem]"
      >
        <option selected disabled value="">Skin Color</option>
        <option value="DARK">Dark</option>
        <option value="BROWN">Brown</option>
        <option value="WHITE">White</option>
        <option value="LIGHT_SKIN">light-skin</option>
        <option value="OTHER">Other</option>
      </select>
      <select
        v-model="maritalStatusFilter"
        class="border border-[var(--primary-color)] rounded outline-none h-[30px] text-[var(--primary-color)] p-[0.1rem]"
      >
        <option selected disabled value="">Marital Status</option>
        <option value="SINGLE">Single</option>
        <option value="MARRIED">Married</option>
        <option value="DIVORCED">Divorced</option>
        <option value="WIDOWED">Widowed</option>
        <option value="OTHER">Other</option>
      </select>
      <select
        v-model="hairColorFilter"
        class="border border-[var(--primary-color)] rounded outline-none h-[30px] text-[var(--primary-color)] p-[0.1rem]"
      >
        <option selected disabled value="">Hair Color</option>
        <option value="BLACK">Black</option>
        <option value="BROWN">Brown</option>
        <option value="WHITE">White</option>
        <option value="BLONDE">Blonde</option>
        <option value="GRAY">Grey</option>
        <option value="ORANGE">Orange</option>
        <option value="OTHER">Other</option>
      </select>

      <select
        v-model="physicalDisabilityFilter"
        class="border border-[var(--primary-color)] rounded outline-none h-[30px] text-[var(--primary-color)] p-[0.1rem]"
      >
        <option selected disabled value="">Physical Disability</option>
        <option value="NONE">None</option>
        <option value="mobility_issue">Mobility Issue</option>
        <option value="vision_impairment">Vision Impairment</option>
        <option value="hearing_loss">Hearing Loss</option>
        <option value="neurological_condition">Neurological Condition</option>
        <option value="non_verbal">Non Verbal</option>
        <option value="limb_difference">Limb Difference</option>
        <option value="other">Other</option>
      </select>
    </div>

    <div class="flex flex-wrap justify-start gap-[3rem] ml-[3rem] my-[2rem]">
      <div
        v-if="
          missingPersons.length === 0 || filteredMissingPersons.length === 0
        "
        class="w-full h-[598px] text-center text-gray-500"
      >
        <p>No posts found</p>
      </div>
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
      />
    </div>
  </div>
</template>
<!-- <script setup>
import { useUserStore } from "#imports";
const store = useUserStore();
const { $axios } = useNuxtApp();
const missingPersons = ref([]);
const searchQuery = ref("");

const genderFilter = ref("");
const nationalityFilter = ref("");
const skinColorFilter = ref("");
const maritalStatusFilter = ref("");
const hairColorFilter = ref("");
const physicalDisabilityFilter = ref("");

const fetchPosts = async () => {
  store.setLoading(true);
  try {
    const response = await $axios.get("/post", {
      headers: {
        Authorization: `Bearer ${store.token}`,
      },
      params: {
        name: searchQuery.value,
      },
    });
    missingPersons.value = response.data.data;
    store.setLoading(false);
  } catch (error) {
    console.error(
      "failed to load",
      error.response ? error.response.data : error.message
    );
    store.setLoading(false);
  }
};

watch(searchQuery, fetchPosts);

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
    const matchesHairColorFilter =
      !hairColorFilter.value || person.hairColor === hairColorFilter.value;
    const matchesPhysicalDisabilityFilter =
      !physicalDisabilityFilter.value.toLocaleUpperCase() ||
      person.physicalDisability.includes(
        physicalDisabilityFilter.value.toLocaleUpperCase()
      );

    return (
      matchesGender &&
      matchesNationality &&
      matchesSkinColor &&
      matchesMaritalStatus &&
      matchesHairColorFilter &&
      matchesPhysicalDisabilityFilter
    );
  });
});
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
    </div>

    <div class="flex justify-center mt-[1rem] gap-[1rem]">
      <select
        v-model="genderFilter"
        class="border border-[var(--primary-color)] rounded outline-none h-[30px] text-[var(--primary-color)] p-[0.1rem]"
      >
        <option selected disabled value="">Gender</option>
        <option value="MALE">Male</option>
        <option value="FEMALE">Female</option>
      </select>
      <select
        v-model="nationalityFilter"
        class="border border-[var(--primary-color)] rounded outline-none h-[30px] text-[var(--primary-color)] p-[0.1rem]"
      >
        <option selected disabled value="">Nationality</option>
        <option value="ethiopian">Ethiopian</option>
        <option value="other">Other</option>
      </select>
      <select
        v-model="skinColorFilter"
        class="border border-[var(--primary-color)] rounded outline-none h-[30px] text-[var(--primary-color)] p-[0.1rem]"
      >
        <option selected disabled value="">Skin Color</option>
        <option value="DARK">Dark</option>
        <option value="BROWN">Brown</option>
        <option value="WHITE">White</option>
        <option value="LIGHT_SKIN">light-skin</option>
        <option value="OTHER">Other</option>
      </select>
      <select
        v-model="maritalStatusFilter"
        class="border border-[var(--primary-color)] rounded outline-none h-[30px] text-[var(--primary-color)] p-[0.1rem]"
      >
        <option selected disabled value="">Marital Status</option>
        <option value="SINGLE">Single</option>
        <option value="MARRIED">Married</option>
        <option value="DIVORCED">Divorced</option>
        <option value="WIDOWED">Widowed</option>
        <option value="OTHER">Other</option>
      </select>
      <select
        v-model="hairColorFilter"
        class="border border-[var(--primary-color)] rounded outline-none h-[30px] text-[var(--primary-color)] p-[0.1rem]"
      >
        <option selected disabled value="">Hair Color</option>
        <option value="BLACK">Black</option>
        <option value="BROWN">Brown</option>
        <option value="WHITE">White</option>
        <option value="BLONDE">Blonde</option>
        <option value="GRAY">Grey</option>
        <option value="ORANGE">Orange</option>
        <option value="OTHER">Other</option>
      </select>

      <select
        v-model="physicalDisabilityFilter"
        class="border border-[var(--primary-color)] rounded outline-none h-[30px] text-[var(--primary-color)] p-[0.1rem]"
      >
        <option selected disabled value="">Physical Disability</option>
        <option value="NONE">None</option>
        <option value="mobility_issue">Mobility Issue</option>
        <option value="vision_impairment">Vision Impairment</option>
        <option value="hearing_loss">Hearing Loss</option>
        <option value="neurological_condition">Neurological Condition</option>
        <option value="non_verbal">Non Verbal</option>
        <option value="limb_difference">Limb Difference</option>
        <option value="other">Other</option>
      </select>
    </div>

    <div class="flex flex-wrap justify-start gap-[3rem] ml-[3rem] my-[2rem]">
      <div
        v-if="
          missingPersons.length === 0 || filteredMissingPersons.length === 0
        "
        class="w-full h-[598px] text-center text-gray-500"
      >
        <p>No posts found</p>
      </div>
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
        :dateOfBirth="person.birthDate"
        :educationalLevel="person.educationalLevel"
        :images="person.images"
        :legalDocuments="person.legalDocuments"
        :videoMessage="person.videoMessage"
        :reporterName="`${person.user.Profile?.firstName} ${person.user.Profile?.lastName}`"
      />
    </div>
  </div>
</template> -->
