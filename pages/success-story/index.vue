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

    <!-- Success Stories List -->
    <div
      v-for="story in successStories"
      :key="story.id"
      class="blog-post w-full bg-[var(--background-color)] flex flex-col items-center px-[4rem] py-[2rem] mb-[2rem] rounded-lg shadow-md"
    >
      <h2
        class="text-[24px] font-[sora] text-left w-full text-[var(--secondary-color)] my-4"
      >
        {{ story.title }}
      </h2>
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
            <button
              class="share-button flex items-center gap-[0.5rem] text-blue-500"
            >
              <Icon name="heroicons-outline:share" />
              Share
            </button>
          </div>
        </div>

        <!-- Comment Section -->
        <div class="comments mt-4">
          <h3 class="text-lg font-semibold">Comments</h3>
          <div v-for="comment in story.comments" :key="comment.id" class="mb-2">
            <p class="text-sm text-gray-700">
              <strong>{{ comment.user }}</strong
              >: {{ comment.text }}
            </p>
          </div>

          <!-- Add a comment -->
          <div class="add-comment mt-4">
            <textarea
              v-model="newComment"
              class="w-full p-2 border border-gray-300 rounded"
              placeholder="Add a comment..."
            ></textarea>
            <button
              class="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
              @click="addComment(story.id)"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>

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
import { useUserStore } from "#imports"; // Assuming you're using Pinia for authentication and other global states
import { useRouter } from "vue-router"; // For navigation if needed

// State for likes and success stories
const likes = ref({});
const likedPosts = ref(new Set());
const successStories = ref([]);
const newComment = ref("");
const showToaster = ref(false);
const toasterMessage = ref("");
const toasterType = ref("");
const authStore = useUserStore();

// Function to fetch success stories
const fetchSuccessStories = async () => {
  try {
    const { $axios } = useNuxtApp();
    const response = await $axios.get("/success-story", {
      params: {
        title: "reunited",
      },
    });
    successStories.value = response.data.data;
    console.log(response.data.data);
  } catch (error) {
    console.log("Error fetching success stories:", error.message);
  }
};

// Fetch stories on component mount
onMounted(fetchSuccessStories);

// Toaster function
const showToast = (message, type) => {
  toasterMessage.value = message;
  toasterType.value = type;
  showToaster.value = true;
  setTimeout(() => (showToaster.value = false), 5000);
};

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
    console.log("Error liking post:", error.message);
  }
};

// Check if a post is liked
const isLiked = (postId) => likedPosts.value.has(postId);

// Add a comment to a story
const addComment = async (storyId) => {
  if (!newComment.value.trim()) return;

  try {
    const { $axios } = useNuxtApp();
    const response = await $axios.post(`/success-stories/${storyId}/comment`, {
      text: newComment.value,
      user: authStore.user.name,
    });

    const story = successStories.value.find((s) => s.id === storyId);
    story.comments.push(response.data); // Add the new comment to the story
    newComment.value = ""; // Clear the input field
  } catch (error) {
    console.log("Error adding comment:", error.message);
  }
};
</script>

<style scoped>
.blog-container {
  max-width: 1200px;
  margin: 0 auto;
}
.blog-post {
  border: 1px solid #e2e8f0;
}
.stats-section {
  margin-top: 2rem;
  margin-bottom: 2rem;
}
.like-button,
.share-button {
  cursor: pointer;
}
</style>
