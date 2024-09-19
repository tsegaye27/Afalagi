<script setup>
import { useUserStore } from "#imports";

const store = useUserStore();
const title = ref("");
const content = ref("");
// const image = ref(null);
const successStoryErrorMessage = ref("");
const { $axios } = useNuxtApp();

const route = useRoute();
const closedCaseId = ref(route.params.closeCaseId); // Renamed to closedCaseId

// const handleFileChange = (event) => {
//   image.value = event.target.files[0];
// };

const submitSuccessStory = async () => {
  if (!validateSuccessStoryForm()) {
    return;
  }

  store.setLoading(true);
  try {
    const formData = new FormData();
    formData.append("title", title.value);
    formData.append("content", content.value);
    formData.append("closedCaseId", closedCaseId.value); // Ensure correct field name

    // if (image.value) {
    //   formData.append("image", image.value); // Ensure correct field name for image
    // }

    const response = await $axios.post("/success-story", formData, {
      headers: {
        Authorization: `Bearer ${store.token}`,
      },
    });

    title.value = "";
    content.value = "";
    // image.value = null;
    navigateTo("/success-story");
  } catch (error) {
    console.error(error.response ? error.response.data : error.message);
  } finally {
    store.setLoading(false);
  }
};

const validateSuccessStoryForm = () => {
  if (!title.value.trim() || !content.value.trim() || !closedCaseId.value) {
    successStoryErrorMessage.value =
      "All fields are required for the success story.";
    return false;
  }
  successStoryErrorMessage.value = "";
  return true;
};
</script>

<template>
  <div
    class="bg-white p-8 ring ring-[var(--primary-color)] my-8 shadow-lg rounded-md max-w-lg mx-auto"
  >
    <button
      @click="handleBackFromForm"
      class="bg-[var(--secondary-color)] text-white px-2 py-2 flex items-center rounded mb-6 hover:bg-[var(--secondary-color)] transition"
    >
      <Icon name="material-symbols:arrow-left-alt" size="24px" />
      <span
        class="text-[var(--primary-color)] text-lg font-[poppins] ml-[0.5rem]"
        >Back</span
      >
    </button>
    <form @submit.prevent="submitSuccessStory">
      <div class="flex flex-col gap-2 mb-6">
        <label class="font-semibold text-[var(--primary-color)]">Title:</label>
        <input
          type="text"
          v-model="title"
          placeholder="Title for your story"
          class="p-2 border border-[var(--primary-color)] text-[var(--primary-color)] rounded w-full outline-none focus:ring-2 focus:ring-[var(--secondary-color)]"
          required
        />
      </div>
      <div class="flex flex-col gap-2 mb-6">
        <label class="font-semibold text-[var(--primary-color)]">
          Content:
        </label>
        <textarea
          v-model="content"
          placeholder="Content for your story"
          class="p-2 border border-[var(--primary-color)] text-[var(--primary-color)] rounded w-full h-32 resize-none outline-none focus:ring-2 focus:ring-[var(--secondary-color)]"
          required
        />
      </div>
      <!-- <div class="flex flex-col gap-2 mb-6">
        <label class="font-semibold text-[var(--primary-color)]">Image:</label>
        <input
          type="file"
          @change="handleFileChange"
          class="p-2 border border-[var(--primary-color)] rounded w-full outline-none focus:ring-2 focus:ring-[var(--secondary-color)]"
        />
      </div> -->
      <div v-if="successStoryErrorMessage" class="text-red-500 mb-4">
        {{ successStoryErrorMessage }}
      </div>
      <div class="flex justify-center">
        <button
          type="submit"
          class="bg-[var(--primary-color)] text-white px-4 py-2 rounded hover:bg-[#035178] transition"
        >
          Submit Story
        </button>
      </div>
    </form>
  </div>
</template>
