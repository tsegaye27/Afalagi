<script setup>
import { useUserStore } from "#imports";

definePageMeta({ layout: "profile" });

const myPosts = ref([]);
const store = useUserStore();
const isLoading = store.isLoading;
const { $axios } = useNuxtApp();

onMounted(async () => {
  store.setLoading(true);
  try {
    const res = await $axios.get("/post/me", {
      headers: {
        Authorization: `Bearer ${store.token}`,
      },
    });
    console.log("✅✅Success✅✅", res.data.data);
    myPosts.value = res.data.data;
  } catch (err) {
    console.log(
      "❌❌Failed❌❌",
      err.response ? err.response.data : err.message
    );
  } finally {
    store.setLoading(false);
  }
});

const title = ref("");
const content = ref("");
const image = ref(null);
const personReunited = ref(false);
const postId = ref("");
const errorMessage = ref("");

const handleFileChange = (event) => {
  image.value = event.target.files[0];
};

const personFound = (id) => {
  postId.value = id;
  console.log("event triggered");
  personReunited.value = !personReunited.value;
};

// Function to validate the form
const validateForm = () => {
  if (!title.value.trim() || !content.value.trim() || !postId.value) {
    errorMessage.value = "All fields are required.";
    return false;
  }
  errorMessage.value = "";
  return true;
};

const closeCase = async () => {
  if (!validateForm()) {
    return;
  }

  console.log(postId.value);

  store.setLoading(true);
  try {
    const formData = new FormData();
    formData.append("title", title.value);
    formData.append("content", content.value);
    formData.append("closeCaseId", postId.value);

    if (image.value) {
      formData.append("images", image.value);
    }

    const response = await $axios.post("/success-story", formData, {
      headers: {
        Authorization: `Bearer ${store.token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("Story submitted successfully", response.data);
    // Reset form and close modal
    personReunited.value = false;
    title.value = "";
    content.value = "";
    image.value = "";
  } catch (error) {
    console.log(error.response ? error.response.data : error.message);
  } finally {
    store.setLoading(false);
  }
};
</script>

<template>
  <div
    v-if="personReunited"
    class="bg-white p-8 shadow-lg rounded-md max-w-lg mx-auto"
  >
    <button
      @click="personFound"
      class="bg-[var(--secondary-color)] text-white px-4 py-2 rounded mb-6 hover:bg-[var(--secondary-color)] transition"
    >
      Back
    </button>
    <form @submit.prevent="closeCase">
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
      <div class="flex flex-col gap-2 mb-6">
        <label class="font-semibold text-[var(--primary-color)]">Image:</label>
        <input
          type="file"
          @change="handleFileChange"
          class="p-2 border border-[var(--primary-color)] rounded w-full outline-none focus:ring-2 focus:ring-[var(--secondary-color)]"
        />
      </div>
      <div v-if="errorMessage" class="text-red-500 mb-4">
        {{ errorMessage }}
      </div>
      <div class="flex justify-end">
        <button
          type="submit"
          class="bg-[var(--primary-color)] text-white px-4 py-2 rounded hover:bg-[var(--secondary-color)] transition"
        >
          Submit
        </button>
      </div>
    </form>
  </div>
  <div v-else>
    <Spinner v-if="isLoading" />
    <div v-else class="overflow-y-auto h-[40rem]">
      <h1
        class="text-center font-semibold text-[25px] text-[var(--secondary-color)] mt-[3rem]"
      >
        My Posts
      </h1>
      <hr class="my-[1rem]" />
      <div class="flex flex-wrap justify-start gap-[3rem] mx-[2rem]">
        <MissingCard
          v-for="(post, index) in myPosts"
          :key="index"
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
          :dateOfBirth="post.birthDate"
          :educationalLevel="post.educationalLevel"
          :images="post.images"
          :status="post.status"
          :closeCase="true"
          :legalDocuments="post.legalDocuments"
          :videoMessage="post.videoMessage"
          @personFound="personFound"
        />
      </div>
    </div>
  </div>
</template>
