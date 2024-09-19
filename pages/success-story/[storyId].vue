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

    <!-- Success Story Details -->
    <div
      v-if="story"
      class="blog-post w-full bg-[var(--background-color)] flex flex-col items-center px-[4rem] py-[2rem] mb-[2rem] rounded-lg shadow-md"
    >
      <h2
        class="text-[24px] font-[sora] text-left w-full max-w-[800px] text-[var(--secondary-color)] my-4"
      >
        {{ story.title }}
      </h2>
      <p class="text-[16px] text-[var(--primary-color)] mb-[1rem]">
        Posted by: {{ story.posterName }}
      </p>
      <div class="flex flex-col w-full max-w-[800px] text-left">
        <p class="text-[16px] text-[var(--primary-color)] mb-[1rem]">
          {{ story.content }}
        </p>

        <!-- Video Section (Optional) -->
        <div v-if="story.videoUrl" class="my-4">
          <iframe
            class="mb-[1.5rem] rounded-lg"
            width="560"
            height="315"
            :src="story.videoUrl"
            title="Success Story Video"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        </div>

        <!-- Like and Share Section -->
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
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// State for story details
const story = ref(null);
const likes = ref({});
const likedPosts = ref(new Set());
const showToaster = ref(false);
const toasterMessage = ref("");
const toasterType = ref("");
const authStore = useUserStore();

// Fetch the dynamic story based on storyId
const route = useRoute();
const fetchStoryDetails = async () => {
  try {
    const { $axios } = useNuxtApp();
    const response = await $axios.get(
      `/success-story/${route.params.storyId}`,
      {
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
      }
    );
    story.value = response.data;
  } catch (error) {
    console.error("Error fetching story details:", error.message);
  }
};

// Fetch story details on component mount
onMounted(fetchStoryDetails);

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
