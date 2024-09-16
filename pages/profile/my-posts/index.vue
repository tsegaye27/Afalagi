<script setup>
import { useUserStore } from "#imports";
import { ref, onMounted } from "vue";
import { useNuxtApp } from "#app";

definePageMeta({ layout: "profile" });

const myPosts = ref([]);
const store = useUserStore();
const isLoading = ref(false);
const { $axios } = useNuxtApp();
const currentPage = ref(1);
const totalPages = ref(0);
const postsPerPage = 6; // Define how many posts you want per page

// Computed properties to separate posts by status
const underReviewAndOpenPosts = computed(() =>
  myPosts.value.filter((post) => post.status === "OPEN")
);

const closedAndRejectedPosts = computed(() =>
  myPosts.value.filter(
    (post) =>
      post.status === "CLOSED" ||
      post.status === "REJECTED" ||
      post.status === "UNDER_REVIEW"
  )
);

// Function to fetch posts with pagination
const fetchPosts = async () => {
  isLoading.value = true;
  try {
    const res = await $axios.get("/post/me", {
      headers: {
        Authorization: `Bearer ${store.token}`,
      },
      params: {
        page: currentPage.value,
        limit: postsPerPage,
      },
    });

    myPosts.value = res.data.data;
    totalPages.value = res.data.totalPages; // Assuming the backend returns the total number of pages
  } catch (err) {
    console.log(
      "❌❌Failed❌❌",
      err.response ? err.response.data : err.message
    );
  } finally {
    isLoading.value = false;
  }
};

// Fetch posts on component mount
onMounted(fetchPosts);

// Function to go to the next page
const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    fetchPosts();
  }
};

// Function to go to the previous page
const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    fetchPosts();
  }
};
</script>

<template>
  <div>
    <Spinner v-if="isLoading" />
    <div v-else class="overflow-y-auto h-[40rem]">
      <h1
        class="text-center font-semibold text-[25px] text-[var(--secondary-color)] mt-[3rem]"
      >
        My Posts
      </h1>
      <hr class="my-12 border-[var(--primary-color)]" />

      <!-- Display posts with UNDER_REVIEW and OPEN status -->
      <div class="flex flex-wrap justify-start gap-[3rem] mx-[2rem]">
        <MissingCard
          v-for="(post, index) in underReviewAndOpenPosts"
          :key="post.id"
          :postId="post.id"
          :lastSeenWearing="post.lastSeenWearing"
          :lastSeenLocation="post.lastSeenLocation"
          :lastSeenDate="post.lastSeenDate"
          :description="post.description"
          :height="post.height"
          :languageSpoken="post.languageSpoken"
          :nationality="post.nationality"
          :hairColor="post.hairColor"
          :skinColor="post.skinColor"
          :recognizableFeatures="post.recognizableFeatures"
          :maritalStatus="post.maritalStatus"
          :physicalDisability="post.physicalDisability"
          :mentalDisability="post.mentalDisability"
          :medicalIssues="post.medicalIssues"
          :posterRelation="post.posterRelation"
          :gender="post.gender"
          :firstName="post.firstName"
          :middleName="post.middleName"
          :lastName="post.lastName"
          :dateOfBirth="post.dateOfBirth"
          :educationalLevel="post.educationalLevel"
          :images="post.images"
          :status="post.status"
          :closeCase="true"
          :legalDocuments="post.legalDocuments"
          :videoMessage="post.videoMessage"
        />
      </div>

      <!-- Separator -->
      <!-- <hr class="my-8 border-t-2 border-dashed border-[var(--primary-color)]" /> -->

      <!-- Display posts with CLOSED and REJECTED status -->
      <div class="flex flex-wrap justify-start gap-[3rem] mx-[2rem]">
        <MissingCard
          v-for="(post, index) in closedAndRejectedPosts"
          :key="post.id"
          :postId="post.id"
          :lastSeenWearing="post.lastSeenWearing"
          :lastSeenLocation="post.lastSeenLocation"
          :lastSeenDate="post.lastSeenDate"
          :description="post.description"
          :height="post.height"
          :languageSpoken="post.languageSpoken"
          :nationality="post.nationality"
          :hairColor="post.hairColor"
          :skinColor="post.skinColor"
          :recognizableFeatures="post.recognizableFeatures"
          :maritalStatus="post.maritalStatus"
          :physicalDisability="post.physicalDisability"
          :mentalDisability="post.mentalDisability"
          :medicalIssues="post.medicalIssues"
          :posterRelation="post.posterRelation"
          :gender="post.gender"
          :firstName="post.firstName"
          :middleName="post.middleName"
          :lastName="post.lastName"
          :dateOfBirth="post.dateOfBirth"
          :educationalLevel="post.educationalLevel"
          :images="post.images"
          :status="post.status"
          :closeCase="true"
          :legalDocuments="post.legalDocuments"
          :videoMessage="post.videoMessage"
        />
      </div>

      <!-- Pagination Controls -->
      <div class="flex justify-center items-center mt-8">
        <button
          @click="previousPage"
          :disabled="currentPage === 1"
          class="px-4 py-2 mx-2 bg-[var(--background-color)] text-[var(--primary-color)] rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>Page {{ currentPage }} of {{ totalPages }}</span>
        <button
          @click="nextPage"
          :disabled="currentPage === totalPages"
          class="px-4 py-2 mx-2 bg-[var(--background-color)] text-[var(--primary-color)] rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>
