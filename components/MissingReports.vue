<script setup>
import { useUserStore } from "#imports";
const store = useUserStore();
const { $axios } = useNuxtApp();
const missingPersons = ref([]);

onMounted(async () => {
  store.setLoading(true);
  try {
    const response = await $axios.get("/post", {
      params: {
        limit: 4,
      },
    });
    missingPersons.value = response.data.data;
    store.setLoading(false);
  } catch (error) {
    console.error(
      "failed to load",
      error.response ? error.response.data : error.message
    );
    store.setLoading(false);
  }
});
const showMore = () => {
  store.setLoading(true);
  navigateTo("/posts");
};
</script>
<template>
  <div class="py-[2rem] lg:py-[3rem] bg-[var(--background-color)]">
    <div v-if="store.isLoading">
      <Spinner />
    </div>
    <h1
      class="text-center my-[2rem] text-[28px] lg:text-[38px] font-semibold text-[var(--secondary-color)]"
    >
      Missing Reported
    </h1>
    <div
      v-if="missingPersons.length > 0"
      class="flex justify-center flex-wrap items-center gap-[2rem] lg:gap-[3rem] mx-[1rem]"
    >
      <MissingCard
        v-for="(person, index) in missingPersons"
        :key="index"
        :postId="person.id"
        :lastSeenWearing="person.lastSeenWearing"
        :lastSeenLocationCountry="person.lastSeenLocationCountry"
        :lastSeenLocationCity="person.lastSeenLocationCity"
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
        :dateOfBirth="person.dateOfBirth"
        :educationalLevel="person.educationalLevel"
        :images="person.images"
        :legalDocuments="person.legalDocuments"
        :videoMessage="person.videoMessage"
        :reporterName="`${person.user.Profile?.firstName} ${person.user.Profile?.lastName}`"
        :reporterImgUrl="person.user.Profile?.profilePicture"
        :reporterEmail="person.user.email"
      />
      <button
        @click="showMore"
        title="Show more"
        class="text-[var(--text-white)] p-[0.7rem] btn-round-white ring-[1.1px] ring-[var(--primary-color)] rounded-full bg-[var(--primary-color)] hover:bg-[var(--secondary-color)] hover:text-white font-semibold w-[2.8rem] h-full flex items-center justify-center"
      >
        <span class="flex justify-center items-center"
          ><Icon size="22px" name="material-symbols:arrow-right-alt"
        /></span>
      </button>
    </div>
    <div
      v-else
      class="flex justify-center items-center text-xl gap-[3rem] mx-[1rem] text-[var(--primary-color)]"
    >
      There are no reports available
    </div>
  </div>
</template>
