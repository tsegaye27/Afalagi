<template>
  <div class="blog-container">
    <!-- Toaster -->
    <div
      v-if="showToaster"
      :class="toasterType === 'success' ? 'bg-green-500' : 'bg-red-500'"
      class="fixed top-5 right-5 p-4 rounded text-white shadow-lg z-50"
    >
      {{ toasterMessage }}
    </div>

    <!-- Page Header -->
    <h1
      class="text-[30px] w-full my-[3rem] text-center text-[var(--primary-color)] font-semibold"
    >
      Stories of Lives Impacted by Our Platform
    </h1>
    <hr />

    <div v-if="successStories.length === 0">
      <p class="text-[var(--primary-color)] text-center text-[24px] my-[2rem]">
        No success stories yet. Check back later.
      </p>
    </div>

    <!-- Success Stories List -->
    <div
      v-else
      v-for="story in successStories"
      :key="story.id"
      class="blog-post w-full bg-[var(--background-color)] flex flex-col items-center px-[4rem] py-[2rem] mb-[2rem] rounded-lg shadow-md"
    >
      <h2
        class="text-[24px] font-[sora] text-left w-full max-w-[800px] text-[var(--secondary-color)] my-4"
      >
        {{ story.title }}
      </h2>
      <div class="flex flex-col w-full max-w-[800px] text-left">
        <p class="text-[16px] text-[var(--primary-color)] mb-[1rem]">
          Posted by:
          {{
            `${story.user.Profile?.firstName} ${story.user.Profile?.lastName}`
          }}
        </p>

        <!-- Like and View Details Section -->
        <div class="flex justify-between items-center">
          <div class="flex items-center gap-[1rem]">
            <button
              class="like-button flex items-center gap-[0.5rem]"
              @click="toggleLike(story.id)"
            >
              <Icon
                :name="
                  isLiked(story.id)
                    ? 'heroicons-solid:thumb-up'
                    : 'heroicons-outline:thumb-up'
                "
                :class="isLiked(story.id) ? 'text-blue-500' : 'text-gray-500'"
              />
              <span>{{ likes[story.id] || story.likes }}</span>
            </button>
            <button @click="viewDetails(story.id)" class="text-blue-500">
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
    <hr />

    <!-- Statistics Section -->
    <div
      class="stats-section w-full h-[300px] flex justify-evenly my-[2rem] items-center"
    >
      <div class="flex flex-col items-start">
        <h1 class="text-[var(--primary-color)] text-[70px]">1000+</h1>
        <p class="text-[var(--primary-color)] text-[35px]">Users</p>
      </div>
      <div class="flex flex-col items-start">
        <h1 class="text-[var(--primary-color)] text-[70px]">80+</h1>
        <p class="text-[var(--primary-color)] text-[35px]">Reports</p>
      </div>
      <div class="flex flex-col items-start">
        <h1 class="text-[var(--primary-color)] text-[70px]">50+</h1>
        <p class="text-[var(--primary-color)] text-[35px]">Unions</p>
      </div>
    </div>
    <hr />

    <!-- Contact Section -->
    <Contact />
  </div>
</template>

<script setup>
// Import necessary modules
import { ref, onMounted } from "vue";
import { useUserStore } from "#imports"; // Assuming you're using Pinia for authentication

// State for likes and success stories
const likes = ref({});
const likedPosts = ref(new Set());
const successStories = ref([]);
const showToaster = ref(false);
const toasterMessage = ref("");
const toasterType = ref("");
const authStore = useUserStore();

// Function to fetch success stories
const fetchSuccessStories = async () => {
  try {
    const { $axios } = useNuxtApp();
    const response = await $axios.get("/success-story");
    successStories.value = response.data.data;
  } catch (error) {
    console.error("Error fetching success stories:", error.message);
  }
};

// toaster
const showToast = (message, type) => {
  toasterMessage.value = message;
  toasterType.value = type;
  showToaster.value = true;
  setTimeout(() => {
    showToaster.value = false;
  }, 3000);
};

// Fetch stories on component mount
onMounted(fetchSuccessStories);

// Toggle like state
const toggleLike = async (postId) => {
  if (!authStore.token) {
    showToast("Please log in to react to posts.", "error");
    return;
  }

  if (likedPosts.value.has(postId)) {
    likes.value[postId]--;
    likedPosts.value.delete(postId);
  } else {
    likes.value[postId] = (likes.value[postId] || 0) + 1;
    likedPosts.value.add(postId);
  }

  try {
    const { $axios } = useNuxtApp();
    await $axios.post(`/success-stories/${postId}/like`);
  } catch (error) {
    console.error("Error liking post:", error.message);
  }
};

const viewDetails = (storyId) => {
  // Redirect to the story details page
  navigateTo(`/success-story/${storyId}`);
};

// Check if a post is liked
const isLiked = (postId) => likedPosts.value.has(postId);
</script>

<style scoped>
.blog-container {
  max-width: 1200px;
  margin: 0 auto;
}
.blog-post {
  border: 1px solid #e2e8f0;
}
.like-button {
  cursor: pointer;
}
</style>
