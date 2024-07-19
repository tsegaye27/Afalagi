<script setup>
definePageMeta({ layout: "profile" });
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
</script>
<template>
  <div class="w-[80%] overflow-y-auto h-[40rem]">
    <h1 class="text-center font-semibold text-[25px] text-[#0097d3] mt-[3rem]">
      My Posts
    </h1>
    <hr class="my-[1rem]" />
    <div class="flex flex-wrap justify-start gap-[3rem] mx-[2rem]">
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
    </div>
  </div>
</template>
