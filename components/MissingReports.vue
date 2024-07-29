<script setup>
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
const router = useRouter();
const showMore = () => {
  router.push("/posts");
};
</script>
<template>
  <div class="py-[3rem] bg-slate-100">
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
