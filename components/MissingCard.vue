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
  dateOfBirth: {
    type: String,
    required: true,
  },
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
  status: {
    type: String,
  },
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
function calculateAge(dateOfBirth) {
  const dob = new Date(dateOfBirth);
  const today = new Date();

  let age = today.getFullYear() - dob.getFullYear();
  const monthDiff = today.getMonth() - dob.getMonth();
  const dayDiff = today.getDate() - dob.getDate();
  // If birth month and day haven't occurred yet this year, subtract one from the age
  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age--;
  }

  return age;
}
const age = calculateAge(props.dateOfBirth);

const viewDetails = () => {
  navigateTo(`/posts/details/${props.postId}`);
};
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
  <div
    class="relative w-[350px] gap-1 flex flex-col bg-[#fafafa] rounded-lg border-2 border-[#d2d2d2] items-start"
  >
    <span
      :class="[
        'absolute top-2 right-2 px-3 py-1 rounded-full z-10 text-white font-bold',
        status === 'OPEN' ? 'bg-green-500' : '',
        status === 'UNDER_REVIEW' ? 'bg-orange-300' : '',
        status === 'REJECTED' ? 'bg-red-500' : '',
      ]"
    >
      {{ status }}
    </span>
    <img
      class="w-full h-auto rounded-t-lg"
      src="@/assets/img/missing.webp"
      alt="missing_boy"
    />
    <h1
      class="text-[27px] text-center font-semibold text-[var(--primary-color)] mt-4 w-full"
    >
      {{ `${firstName} ${middleName} ${lastName}` }}
    </h1>
    <p class="text-[var(--primary-color)] pl-4 w-full">Age: {{ age }}</p>
    <p class="text-[var(--primary-color)] pl-4 w-full">
      Last-Seen(Location): {{ lastSeenLocation }}
    </p>
    <p class="text-[var(--primary-color)] pl-4 w-full">
      Last-Seen(Date): {{ formatDate(lastSeenDate) }}
    </p>
    <button @click="viewDetails" class="btn-posts mt-1 w-[349px]">
      {{ status === "OPEN" ? "View Details" : "Edit Post" }}
    </button>
  </div>
</template>
