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
    store.setLoading(false);
  } catch (err) {
    console.log(
      "❌❌Failed❌❌",
      err.response ? err.response.data : err.message
    );
    store.setLoading(false);
  }
});

const title = ref("");
const content = ref("");
const image = ref("");

const handleFileChange = (event) => {
  image.value = event.target.files[0];
};

const personReunited = ref(false);

const personFound = () => {
  console.log("event triggered");
  personReunited.value = !personReunited.value;
};
</script>
<template>
  <div v-if="personReunited">
    <button @click="personFound">Back</button>
    <form>
      <div class="flex gap-10">
        <label>Title:</label>
        <input
          type="text"
          v-model="title"
          placeholder="title for your story"
          required
        />
      </div>
      <div class="flex gap-10">
        <label>Content:</label>
        <textarea
          required
          v-model="content"
          placeholder="content for your story"
        />
      </div>
      <div class="flex gap-10">
        <label>Image:</label>
        <input type="file" @change="handleFileChange" />
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
