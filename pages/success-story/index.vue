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
    <h1
      class="text-[30px] w-full my-[3rem] text-center text-[var(--primary-color)] font-semibold"
    >
      Stories of Lives Impacted by Our Platform
    </h1>
    <hr />

    <!-- Blog Post 1 -->
    <div
      class="blog-post w-full bg-white flex flex-col items-center px-[4rem] py-[2rem] mb-[2rem] rounded-lg shadow-md"
    >
      <h2
        class="text-[24px] font-[sora] text-left w-full ml-[16.5rem] text-[var(--secondary-color)] my-4"
      >
        Biruk Weldu meets his brother after 10 years
      </h2>

      <div class="flex flex-col w-full max-w-[800px] text-left">
        <p class="text-[16px] text-[var(--primary-color)] mb-[1rem]">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Obcaecati
          minus incidunt consequuntur non delectus quam veritatis excepturi nam
          recusandae quo in reiciendis quia ad harum, repellendus officia,
          deserunt similique esse. Lorem ipsum dolor sit, amet consectetur
          adipisicing elit. Obcaecati minus incidunt consequuntur non delectus
          quam veritatis excepturi nam recusandae quo in reiciendis quia ad
          harum, repellendus officia, deserunt similique esse.
        </p>
        <div class="my-4">
          <iframe
            class="mb-[1.5rem] rounded-lg"
            width="560"
            height="315"
            src="https://www.youtube.com/embed/NtfbWkxJTHw?si=WXzUSrBQPd5OUMNG"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>
        </div>
        <div class="flex justify-end items-center">
          <!-- Like and Share Section -->
          <div class="flex items-center gap-[1rem]">
            <button
              class="like-button flex items-center gap-[0.5rem]"
              @click="toggleLike(1)"
            >
              <Icon
                :name="
                  isLiked(1)
                    ? 'heroicons-solid:thumb-up'
                    : 'heroicons-outline:thumb-up'
                "
                :class="isLiked(1) ? 'text-blue-500' : 'text-gray-500'"
              />
              <span>{{ isLiked(1) ? likes[1] : likes[1] }}</span>
            </button>
            <button
              class="share-button flex items-center gap-[0.5rem] text-blue-500"
            >
              <Icon name="heroicons-outline:share" />
              Share
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Repeat for More Blog Posts -->
    <!-- Blog Post 2 -->
    <div
      class="blog-post w-full bg-white flex flex-col items-center px-[4rem] py-[2rem] mb-[2rem] rounded-lg shadow-md"
    >
      <div class="flex flex-col w-full max-w-[800px] text-left">
        <h2
          class="text-[24px] font-[sora] text-[var(--secondary-color)] mb-[1rem]"
        >
          Biruk Weldu
        </h2>
        <p class="text-[16px] text-[var(--primary-color)] mb-[1rem]">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Obcaecati
          minus incidunt consequuntur non delectus quam veritatis excepturi nam
          recusandae quo in reiciendis quia ad harum, repellendus officia,
          deserunt similique esse. Lorem ipsum dolor sit, amet consectetur
          adipisicing elit. Obcaecati minus incidunt consequuntur non delectus
          quam veritatis excepturi nam recusandae quo in reiciendis quia ad
          harum, repellendus officia, deserunt similique esse.
        </p>
        <div class="my-4">
          <iframe
            class="mb-[1.5rem] rounded-lg"
            width="560"
            height="315"
            src="https://www.youtube.com/embed/xwTub7_we0w?si=9bctIzD4Ci8-yfDc"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>
        </div>
        <div class="flex justify-end items-center">
          <!-- Like and Share Section -->
          <div class="flex items-center gap-[1rem]">
            <button
              class="like-button flex items-center gap-[0.5rem]"
              @click="toggleLike(2)"
            >
              <Icon
                :name="
                  isLiked(2)
                    ? 'heroicons-solid:thumb-up'
                    : 'heroicons-outline:thumb-up'
                "
                :class="isLiked(2) ? 'text-blue-500' : 'text-gray-500'"
              />
              <span>{{ isLiked(2) ? likes[2] : likes[2] }}</span>
            </button>
            <button
              class="share-button flex items-center gap-[0.5rem] text-blue-500"
            >
              <Icon name="heroicons-outline:share" />
              Share
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
// State for likes
const likes = ref({ 1: 10, 2: 15 }); // Initial like counts for each post
const likedPosts = ref(new Set()); // Track liked posts to prevent multiple likes

// Toaster state
const showToaster = ref(false);
const toasterMessage = ref("");
const toasterType = ref("");

// Toaster function
const showToast = (message, type) => {
  toasterMessage.value = message;
  toasterType.value = type;
  showToaster.value = true;

  setTimeout(() => {
    showToaster.value = false;
  }, 5000); // Hide after 5 seconds
};

// Auth store
const authStore = useUserStore();

// Toggle like state
const toggleLike = (postId) => {
  if (!authStore.token) {
    showToast("Please log in to react to posts.", "error");
    return;
  }

  if (likedPosts.value.has(postId)) {
    likes.value[postId]--;
    likedPosts.value.delete(postId);
  } else {
    likes.value[postId]++;
    likedPosts.value.add(postId);
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
.stats-section {
  margin-top: 2rem;
  margin-bottom: 2rem;
}
.like-button,
.share-button {
  cursor: pointer;
}
</style>
