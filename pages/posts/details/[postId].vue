<script setup>
import { useUserStore } from "#imports";

const store = useUserStore();
const router = useRouter();
const previousPage = () => {
  router.go(-1);
};
const { $axios } = useNuxtApp();
const route = useRoute();
const postId = route.params.postId;
const missingPerson = ref([]);
onMounted(async () => {
  try {
    const response = await $axios.get(`/post/${postId}`, {
      headers: {
        Authorization: `Bearer ${store.token}`,
      },
    });
    missingPerson.value = response.data.data;
    console.log("missingPerson", missingPerson.value);
  } catch (error) {
    console.error(error.response ? error.response.data : error.message);
  }
});

function formatDate(dateStr) {
  const dateObj = new Date(dateStr);

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const month = monthNames[dateObj.getMonth()];
  const day = String(dateObj.getDate()).padStart(2, "0");
  const year = dateObj.getFullYear();

  return `${month} ${day}, ${year}`;
}
</script>
<template>
  <div>
    <div class="flex items-center m-8">
      <button
        @click="previousPage"
        class="flex btn-round justify-center items-center mr-[1rem]"
      >
        <</button
      ><span class="text-[var(--primary-color)] font-light text-2xl">Back</span>
    </div>

    <hr />
    <div class="flex flex-col">
      <div>
        <div class="flex mx-[5rem] my-[2rem] justify-between gap-[5rem]">
          <div class="person-image">
            <img
              class="w-[400px] h-[500px]"
              :src="missingPerson.images"
              alt="missing_person"
            />
          </div>
          <div class="w-[800px] justify-start flex mt-[2rem]">
            <ul class="flex flex-col gap-4">
              <div class="flex justify-start gap-[6rem]">
                <li
                  class="font-medium w-[170px] text-[var(--primary-color)] text-lg"
                >
                  Full Name:
                </li>
                <span class="text-[var(--primary-color)] font-light">{{
                  `${missingPerson.firstName} ${missingPerson.middleName} ${missingPerson.lastName}`
                }}</span>
              </div>
              <div class="flex justify-start">
                <li
                  class="font-medium w-[265px] text-[var(--primary-color)] text-lg"
                >
                  date of Birth:
                </li>
                <span class="text-[var(--primary-color)] font-light">{{
                  formatDate(missingPerson.dateOfBirth)
                }}</span>
              </div>
              <div class="flex justify-start gap-[6rem] wrap">
                <li
                  class="font-medium w-[170px] text-[var(--primary-color)] text-lg"
                >
                  Gender:
                </li>
                <span class="text-[var(--primary-color)] font-light">{{
                  missingPerson.gender
                }}</span>
              </div>
              <div class="flex justify-start gap-[6rem] wrap">
                <li
                  class="font-medium w-[170px] text-[var(--primary-color)] text-lg"
                >
                  Hair-Color:
                </li>
                <span class="text-[var(--primary-color)] font-light">{{
                  missingPerson.hairColor
                }}</span>
              </div>
              <div class="flex justify-start gap-[6rem] wrap">
                <li
                  class="font-medium w-[170px] text-[var(--primary-color)] text-lg"
                >
                  Skin-Color:
                </li>
                <span class="text-[var(--primary-color)] font-light">{{
                  missingPerson.skinColor
                }}</span>
              </div>
              <div class="flex justify-start gap-[6rem] wrap">
                <li
                  class="font-medium w-[180px] text-[var(--primary-color)] text-lg"
                >
                  Last-seen Wearing:
                </li>
                <span class="text-[var(--primary-color)] font-light">{{
                  missingPerson.lastSeenWearing
                }}</span>
              </div>
              <div class="flex justify-start gap-[4.25rem] wrap">
                <li
                  class="font-medium w-[200px] text-[var(--primary-color)] text-lg"
                >
                  Last-seen Location:
                </li>
                <span class="text-[var(--primary-color)] font-light">{{
                  missingPerson.lastSeenLocation
                }}</span>
              </div>
              <div class="flex justify-start gap-[6rem] wrap">
                <li
                  class="font-medium w-[170px] text-[var(--primary-color)] text-lg"
                >
                  Last-seen Date:
                </li>
                <span class="text-[var(--primary-color)] font-light">{{
                  formatDate(missingPerson.lastSeenDate)
                }}</span>
              </div>
              <div class="flex justify-start gap-[6rem] wrap">
                <li
                  class="font-medium w-[170px] text-[var(--primary-color)] text-lg"
                >
                  Description:
                </li>
                <span class="text-[var(--primary-color)] font-light">{{
                  missingPerson.description
                }}</span>
              </div>
              <div class="flex justify-start gap-[6rem] wrap">
                <li
                  class="font-medium w-[170px] text-[var(--primary-color)] text-lg"
                >
                  Education:
                </li>
                <span class="text-[var(--primary-color)] font-light">{{
                  missingPerson.educationalLevel
                }}</span>
              </div>
              <div class="flex justify-start gap-[6rem] wrap">
                <li
                  class="font-medium w-[170px] text-[var(--primary-color)] text-lg"
                >
                  Language Spoken:
                </li>
                <span class="text-[var(--primary-color)] font-light">{{
                  missingPerson.languageSpoken
                }}</span>
              </div>
              <div class="flex justify-start gap-[6rem] wrap">
                <li
                  class="font-medium w-[170px] text-[var(--primary-color)] text-lg"
                >
                  Marital Status:
                </li>
                <span class="text-[var(--primary-color)] font-light">{{
                  missingPerson.maritalStatus
                }}</span>
              </div>
              <div class="flex justify-start gap-[6rem] wrap">
                <li
                  class="font-medium w-[170px] text-[var(--primary-color)] text-lg"
                >
                  Height:
                </li>
                <span class="text-[var(--primary-color)] font-light">{{
                  missingPerson.height
                }}</span>
              </div>
            </ul>
          </div>
        </div>
      </div>
      <hr class="mb-[2rem]" />
      <div class="video-card">
        <div
          class="flex flex-col items-center justify-center gap-[1rem] mb-[3rem]"
        >
          <h1
            class="text-[30px] text-[var(--primary-color)] font-medium font-[sora]"
          >
            Message from his mother
          </h1>
          <video class="w-[600px] h-[400px] rounded-md" controls src=""></video>
          <button
            class="p-3 bg-[var(--secondary-color)] rounded-lg text-medium text-white"
            @click="navigateTo('/profile/messages')"
          >
            Chat with the reporter
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
