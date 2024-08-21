<script setup>
import { useUserStore } from "#imports";
const store = useUserStore();
const token = store.token;
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
  reporterName: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: String,
    required: true,
  },
  lastSeenDate: {
    type: String,
    required: true,
  },
  status: {
    type: String,
  },
  gender: {
    type: String,
    required: true,
  },
  images: {
    type: Array,
  },
});

// Function to navigate to post details
const viewDetails = () => {
  navigateTo(`/posts/details/${props.postId}`);
};

// Function to format date
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
const shortName = computed(() => {
  return `${props.firstName} ${props.middleName.charAt(0)}. ${props.lastName}`;
});

const setStatus = (status) => {
  if (status === "OPEN") return "Approved";
  if (status === "UNDER_REVIEW") return "Pending";
  if (status === "REJECTED") return "Rejected";
};
</script>

<template>
  <div
    class="relative w-[300px] gap-1 flex flex-col bg-[#fafafa] rounded-lg border-2 border-[#d2d2d2] items-start"
  >
    <!-- Reporter Name (New) -->
    <div
      v-if="reporterName"
      class="p-4 text-[var(--primary-color)] font-semibold text-md"
    >
      Reported by: {{ `${reporterName}` }}
      <!-- This is new -->
    </div>

    <span
      :class="[
        'absolute top-0 right-0 px-3 py-1 rounded-sm z-10 text-white font-bold',
        status === 'OPEN' ? 'bg-green-500' : '',
        status === 'UNDER_REVIEW' ? 'bg-orange-300' : '',
        status === 'REJECTED' ? 'bg-red-500' : '',
      ]"
    >
      {{ setStatus(status) }}
    </span>
    <img
      class="w-full h-[280px] object-center border-y-[0.15rem] border-[var(--secondary-color)]"
      :src="`http://localhost:3333/uploads/post/${images[0]}`"
      :alt="shortName"
    />
    <h1
      :title="`${firstName} ${middleName} ${lastName}`"
      class="text-[27px] whitespace-nowrap text-center font-semibold text-[var(--primary-color)] mt-4 w-full"
    >
      {{ shortName }}
    </h1>
    <p class="text-[var(--primary-color)] pl-4 w-full">
      Last-Seen(Location): {{ lastSeenLocation }}
    </p>
    <p class="text-[var(--primary-color)] pl-4 w-full">
      Last-Seen(Date): {{ formatDate(lastSeenDate) }}
    </p>

    <!-- Comment Button -->
    <button
      v-if="reporterName"
      @click="handleCommentClick"
      class="absolute top-2 right-2 flex justify-center items-center p-2 rounded-full bg-[var(--secondary-color)] text-white hover:bg-[var(--secondary-color)]"
    >
      <!-- Use an icon component here; example icon used -->
      <Icon name="mdi:comment" size="24px" />
    </button>

    <!-- View Details Button -->
    <button @click="viewDetails" class="btn-posts mt-1 w-full">
      View Details
    </button>
  </div>
</template>
