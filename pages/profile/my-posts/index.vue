<script setup>
import { useUserStore } from "#imports";
import { ref, onMounted } from "vue";
import { useNuxtApp } from "#app";

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
