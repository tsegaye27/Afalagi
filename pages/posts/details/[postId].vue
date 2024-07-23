<script setup>
const props = defineProps({
  fullName: {
    type: String,
    required: true,
  },
  lastSeenLocation: {
    type: String,
    required: true,
  },
  dob: {
    type: String,
    required: true,
  },
  lastSeenWearing: {
    type: String,
  },
  lastSeenDate: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    required: true,
  },
  videoMessage: {
    type: String,
    default: "",
  },
});
const missingPersons = [
  {
    fullName: "John Charles Doe",
    dateOfBirth: "30-03-2000",
    gender: "Male",
    lastSeenLocation: "New York, USA",
    lastSeenWearing: "T-shirt and jeans",
    lastSeenDate: "2024-07-01",
    description:
      "John was last seen near Central Park at around 5 PM on July 1st, 2024. He is 6 feet tall with brown hair and blue eyes. John has a distinctive scar on his left cheek and a tattoo of a dragon on his right arm. He was carrying a black backpack.",
    imgURL: "",
    videoMessage: "",
  },
  {
    fullName: "Jane marko Smith",
    dateOfBirth: "25-03-2000",
    gender: "Female",
    lastSeenLocation: "London, UK",
    lastSeenWearing: "Summer dress",
    lastSeenDate: "2024-07-05",
    description:
      "Jane was last seen in Hyde Park around 3 PM on July 5th, 2024. She is 5 feet 5 inches tall with blonde hair and green eyes. Jane was wearing a light blue summer dress and white sandals. She has a small birthmark on her right wrist and was carrying a red handbag.",
    imgURL: "",
    videoMessage: "",
  },
  {
    fullName: "Alex trey Johnson",
    dateOfBirth: "28-03-2000",
    gender: "Male",
    lastSeenLocation: "Toronto, Canada",
    lastSeenWearing: "Hoodie and shorts",
    lastSeenDate: "2024-07-07",
    description:
      "Alex was last seen near Queen Street at around 8 PM on July 7th, 2024. They are 5 feet 8 inches tall with black hair and brown eyes. Alex was wearing a grey hoodie, black shorts, and white sneakers. They have a nose piercing and a sleeve tattoo on their left arm. Alex was last seen with a friend who reported them missing.",
    imgURL: "",
    videoMessage: "",
  },
];
const previousPage = () => {
  navigateTo("/posts");
};

const route = useRoute();
const postId = route.params.postId;
const missingPerson = missingPersons[postId];
</script>
<template>
  <div>
    <div class="flex items-center m-8">
      <button
        @click="previousPage"
        class="flex btn-round justify-center items-center mr-[1rem]"
      >
        <</button
      ><span class="text-[var(--primary-color)] text-2xl">Back</span>
    </div>

    <hr />
    <div class="flex flex-col">
      <div>
        <div class="flex mx-[5rem] my-[2rem] justify-between gap-[5rem]">
          <div class="person-image">
            <img
              class="w-[400px] h-[500px]"
              src="@/assets/img/missing.png"
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
                <span class="text-[var(--primary-color)]">{{
                  missingPerson.fullName
                }}</span
                ><!-- fullName-->
              </div>
              <div class="flex justify-start">
                <li
                  class="font-medium w-[265px] text-[var(--primary-color)] text-lg"
                >
                  date of Birth:
                </li>
                <!-- Calculate from dob -->
                <span class="text-[var(--primary-color)]">{{
                  missingPerson.dateOfBirth
                }}</span>
              </div>
              <div class="flex justify-start gap-[6rem] wrap">
                <li
                  class="font-medium w-[170px] text-[var(--primary-color)] text-lg"
                >
                  <!-- gender -->
                  Gender:
                </li>
                <span class="text-[var(--primary-color)]">{{
                  missingPerson.gender
                }}</span>
              </div>
              <div class="flex justify-start gap-[6rem] wrap">
                <li
                  class="font-medium w-[180px] text-[var(--primary-color)] text-lg"
                >
                  <!-- lastSeenWearing -->
                  Last-seen Wearing:
                </li>
                <span class="text-[var(--primary-color)]">{{
                  missingPerson.lastSeenWearing
                }}</span>
              </div>
              <div class="flex justify-start gap-[4.25rem] wrap">
                <!-- lastSeenLocation -->
                <li
                  class="font-medium w-[200px] text-[var(--primary-color)] text-lg"
                >
                  Last-seen Location:
                </li>
                <span class="text-[var(--primary-color)]">{{
                  missingPerson.lastSeenLocation
                }}</span>
              </div>
              <div class="flex justify-start gap-[6rem] wrap">
                <!-- lastSeenDate -->
                <li
                  class="font-medium w-[170px] text-[var(--primary-color)] text-lg"
                >
                  Last-seen Date:
                </li>
                <span class="text-[var(--primary-color)]">{{
                  missingPerson.lastSeenDate
                }}</span>
              </div>
              <div class="flex justify-start gap-[10rem] wrap">
                <li
                  class="font-medium w-[170px] text-[var(--primary-color)] text-lg"
                >
                  <!-- Description -->
                  Description:
                </li>
                <span class="text-[var(--primary-color)]">{{
                  missingPerson.description
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
