<script setup>
const props = defineProps({
  postId: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  middleName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  lastSeenLocation: {
    type: String,
    required: true,
  },
  // dateOfBirth: {
  //   type: String,
  //   required: true,
  // },
  // lastSeenWearing: {
  //   type: String,
  // },
  lastSeenDate: {
    type: String,
    required: true,
  },
  // height: {
  //   type: String,
  //   required: true,
  // },
  // languageSpoken: {
  //   type: String,
  //   required: true,
  // },
  // nationality: {
  //   type: String,
  //   required: true,
  // },
  // hairColor: {
  //   type: String,
  //   required: true,
  // },
  // skinColor: {
  //   type: String,
  //   required: true,
  // },
  // recognizableFeatures: {
  //   type: String,
  //   required: true,
  // },
  // maritalStatus: {
  //   type: String,
  //   required: true,
  // },
  // physicalDisability: {
  //   type: String,
  //   required: true,
  // },
  // mentalDisability: {
  //   type: String,
  //   required: true,
  // },
  // medicalIssues: {
  //   type: String,
  //   required: true,
  // },
  gender: {
    type: String,
    required: true,
  },
  images: {
    type: Array,
  },
  // videoMessage: {
  //   type: String,
  // },
  // description: {
  //   type: String,
  //   required: true,
  // },
});

const viewDetails = () => {
  navigateTo(`/posts/details/${props.postId}`);
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
    <h1
      class="text-[27px] text-center font-semibold text-[var(--primary-color)]"
    >
      {{ `${firstName} ${middleName} ${lastName}` }}
    </h1>
    <p class="w-[247px] text-[var(--primary-color)]">
      Last-Seen(Location): {{ lastSeenLocation }}
    </p>
    <p class="w-[247px] text-[var(--primary-color)]">
      Last-Seen(Date): {{ lastSeenDate }}
    </p>
    <button @click="viewDetails" class="btn-posts mt-1 w-[349px]">
      View Details
    </button>
  </div>
</template>
