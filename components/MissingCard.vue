<script setup>
const props = defineProps({
  name: {
    type: String,
    required: true,
    default: "John Doe",
  },
  location: {
    type: String,
    required: true,
    default: "Ethiopia",
  },
  date: {
    type: String,
    required: true,
    default: "12-07-2024",
  },
  cloth: {
    type: String,
    default: "yellow jacket",
  },
  gender: {
    type: String,
    required: true,
    default: "male",
  },
  age: {
    type: Number,
    required: true,
    default: 25,
  },
  description: {
    type: String,
    required: true,
    default: "skinny tall guy with a mustache",
  },
  videoMessage: {
    type: String,
  },
});
async function getRandomPicture(gender) {
  const url = `https://randomuser.me/api/?gender=${gender}`;
  const { data, error } = await $fetch(url);

  if (error) {
    console.error("Error fetching random picture:", error);
    return null;
  }

  const pictureUrl = data?.results[0]?.picture?.large;
  return pictureUrl;
}

const imageUrl = getRandomPicture(props.gender);
const viewDetails = () => {
  navigateTo("/posts/details");
};
</script>
<template>
  <div
    class="w-[350px] gap-1 flex flex-col bg-[#fafafa] rounded-lg border-2 border-[#f4f4f4] pt-4 items-center"
  >
    <img
      class="w-[280px] h-[230px]"
      src="@/assets/img/missing.png"
      alt="missing_boy"
    />
    <!-- <img
      class="w-[280px] h-[230px]"
      :src="imageUrl === null ? '@/assets/img/missing.png' : imageUrl"
      alt="missing_boy"
    /> -->
    <h1 class="text-[27px] font-semibold text-[#868686]">{{ name }}</h1>
    <p class="w-[247px] text-[#868686]">Last-Seen(Location): {{ location }}</p>
    <p class="w-[247px] text-[#868686]">Last-Seen(Date): {{ date }}</p>
    <button @click="viewDetails" class="btn-posts mt-1 w-[349px]">
      View Details
    </button>
  </div>
</template>
