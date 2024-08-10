<script setup>
import { useUserStore } from "#imports";
const store = useUserStore();
const { $axios } = useNuxtApp();
const missingPersons = ref([]);
const searchQuery = ref(""); // State to store the search query

// Fetch posts based on the search query
const fetchPosts = async () => {
  try {
    const response = await $axios.get("/post", {
      headers: {
        Authorization: `Bearer ${store.token}`,
      },
      params: {
        name: searchQuery.value, // Pass the search query as a parameter
      },
    });
    missingPersons.value = response.data.data;
  } catch (error) {
    console.error(
      "failed to load",
      error.response ? error.response.data : error.message
    );
  }
};

// Watch for changes in the search query and fetch posts accordingly
watch(searchQuery, fetchPosts);

// Initial fetch when the component mounts
onMounted(fetchPosts);

const showModal = ref(false);
</script>

<template>
  <div class="mt-[3rem]">
    <div class="flex mx-[2.5rem] mb-[1rem] gap-[7rem] justify-between items-center">
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
      <!-- Pass the search query handler to the SearchBar component -->
      <SearchBar @search="(query) => (searchQuery = query)" />
      <button
        @click="showModal = true"
        class="p-2 text-[var(--primary-color)] font-medium rounded-md border border-[#0972d3]"
      >
        Filter
      </button>
    </div>
    <div class="flex flex-wrap justify-start gap-[3rem] ml-[3rem] my-[2rem]">
      <MissingCard
        v-for="(person, index) in missingPersons"
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
      />
    </div>
  </div>
</template>
