<script setup>
import { useUserStore } from "#imports";
const store = useUserStore();
const { $axios } = useNuxtApp();
const missingPersons = ref([]);

onMounted(async () => {
  try {
    const response = await $axios.get("/post", {
      headers: {
        Authorization: `Bearer ${store.token}`,
      },
    });
    console.log(response.data.data);
    missingPersons.value = response.data.data;
  } catch (error) {
    console.error(
      "failed to load",
      error.response ? error.response.data : error.message
    );
  }
});
const showMore = () => {
  navigateTo("/posts");
};
</script>
<template>
  <div class="py-[3rem] bg-slate-50">
    <h1
      class="text-center my-[2rem] text-[38px] font-semibold text-[var(--secondary-color)]"
    >
      Missing Reported
    </h1>
    <div class="flex justify-center items-center gap-[3rem] mx-[1rem]">
      <MissingCard
        v-for="(person, index) in missingPersons"
        :key="index"
        :postId="index"
        :lastSeenWearing="person.lastSeenWearing"
        :lastSeenLocation="person.lastSeenLocation"
        :lastSeenDate="person.lastSeenDate"
        :description="person.description"
        :gender="person.gender"
        :fullName="person.fullName"
        :dob="person.dateOfBirth"
        :imageUrl="person.imgURL"
        :videoMessage="person.videoMessage"
      />
      <button
        @click="showMore"
        class="text-[#f4f4f4] p-[0.7rem] rounded-full bg-[var(--secondary-color)] font-semibold w-[2.8rem] h-full flex items-center justify-center"
      >
        <span class="flex justify-center items-center"
          ><Icon size="22px" name="material-symbols:arrow-right-alt"
        /></span>
      </button>
    </div>
  </div>
</template>
