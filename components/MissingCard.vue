<script setup>
const props = defineProps({
  postId: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
    default: "John Doe",
  },
  lastSeenLocation: {
    type: String,
    required: true,
    default: "Ethiopia",
  },
  dob: {
    type: String,
    required: true,
    default: "12-07-2024",
  },
  lastSeenWearing: {
    type: String,
    default: "yellow jacket",
  },
  lastSeenDate: {
    type: String,
    required: true,
    default: "12-07-2024",
  },
  gender: {
    type: String,
    required: true,
    default: "male",
  },
  imageUrl: {
    type: String,
    default: "",
  },
  videoMessage: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    required: true,
  },
});

const viewDetails = () => {
  navigateTo(`/posts/details/:${props.postId}`);
};
</script>
<template>
  <div
    class="w-[350px] gap-1 flex flex-col bg-[#fafafa] rounded-lg border-2 border-[#d2d2d2] pt-4 items-center"
  >
    <img
      class="w-[280px] h-[230px]"
      src="@/assets/img/missing.png"
      alt="missing_boy"
    />
    <h1 class="text-[27px] font-semibold text-[#868686]">{{ fullName }}</h1>
    <p class="w-[247px] text-[#868686]">
      Last-Seen(Location): {{ lastSeenLocation }}
    </p>
    <p class="w-[247px] text-[#868686]">Last-Seen(Date): {{ lastSeenDate }}</p>
    <button @click="viewDetails" class="btn-posts mt-1 w-[349px]">
      View Details
    </button>
  </div>
</template>
