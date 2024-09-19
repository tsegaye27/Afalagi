<script setup>
import { useUserStore } from "#imports";
const store = useUserStore();
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
  lastSeenLocationCountry: {
    type: String,
    required: true,
  },
  lastSeenLocationCity: {
    type: String,
    required: true,
  },
  reporterName: {
    type: String,
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
  closeCase: {
    type: Boolean,
  },
  posterRelation: {
    type: String,
  },
  reporterImgUrl: {
    type: String,
  },
  reporterEmail: {
    type: String,
  },
});

const sharePost = () => {
  // if (navigator.share) {
  //   navigator
  //     .share({
  //       title: `${props.firstName} ${props.middleName} ${props.lastName}`,
  //       text: `Check out this missing person report: ${props.firstName} ${props.middleName} ${props.lastName}. Last seen at ${props.lastSeenLocation}.`,
  //       url: window.location.href,
  //     })
  //     .then(() => console.log("Post shared successfully"))
  //     .catch((error) => console.error("Error sharing post:", error));
  // } else {
  //   console.log("Share API not supported on this browser.");
  // }
};

const viewDetails = () => {
  store.setLoading(true);
  navigateTo(`/posts/details/${props.postId}`);
};

const navigateToCloseCase = () => {
  store.setLoading(true);
  navigateTo(`/profile/my-posts/${props.postId}`);
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

const handleComment = () => {
  store.setLoading(true);
  navigateTo(`/posts/details/${props.postId}`);
};

const shortName = computed(() => {
  return `${props.firstName} ${props.middleName.charAt(0)}. ${
    props.firstName.length > 7 ? props.lastName.charAt(0) + "." : props.lastName
  }`;
});

const setStatus = (status) => {
  if (status === "OPEN") return "Approved";
  if (status === "UNDER_REVIEW") return "Pending";
  if (status === "REJECTED") return "Rejected";
  if (status === "CLOSED") return "Closed";
};
</script>

<template>
  <div v-if="store.isLoading">
    <MissingCardLoader />
  </div>
  <div
    v-else
    class="relative w-[310px] flex flex-col bg-[var(--background-color)] border border-[var(--secondary-color)] rounded-lg items-start"
  >
    <div class="gap-1 w-full flex flex-col">
      <div
        v-if="reporterName"
        class="p-2 text-[var(--primary-color)] flex font-semibold text-md"
      >
        <img
          class="w-[45px] h-[43px] rounded-[1.5rem] border-2 border-[#f4f4f4] mr-1"
          :src="`http://localhost:3333/uploads/profile/${reporterImgUrl}`"
          :alt="reporterName"
        />
        <div class="flex flex-col justify-center">
          <span class="text-md">
            {{ reporterName }}
          </span>
          <span v-if="reporterEmail" class="text-slate-400 text-sm font-arial">
            {{ reporterEmail }}
          </span>
        </div>
      </div>

      <span
        :class="[
          'absolute top-0 right-0 px-3 py-1 rounded-tr-lg z-10 text-white font-bold',
          status === 'OPEN' ? 'bg-green-500' : '',
          status === 'UNDER_REVIEW' ? 'bg-orange-300' : '',
          status === 'REJECTED' ? 'bg-red-500' : '',
          status === 'CLOSED' ? 'bg-blue-500' : '',
        ]"
      >
        {{ setStatus(status) }}
      </span>
      <img
        class="w-full h-[280px] object-cover rounded-tl-lg rounded-tr-lg"
        :src="`http://localhost:3333/uploads/post/${images[0]}`"
        :alt="shortName"
      />
      <h1
        :title="`${firstName} ${middleName} ${lastName}`"
        class="text-[27px] whitespace-nowrap text-left mx-4 font-semibold text-[var(--text-color)] mt-4 w-full"
      >
        {{ shortName }}
      </h1>
      <p
        class="text-[var(--primary-color)] pl-4 w-full"
        :title="`${lastSeenLocationCity}, ${lastSeenLocationCountry}`"
      >
        Last-Seen(Location):
        {{ lastSeenLocationCity }},
        {{
          lastSeenLocationCountry.length > 10
            ? `${lastSeenLocationCountry}${lastSeenLocationCity}`.slice(0, 3) +
              "..."
            : `${lastSeenLocationCountry}`
        }}
      </p>
      <p class="text-[var(--primary-color)] pl-4 w-full">
        Last-Seen(Date): {{ formatDate(lastSeenDate) }}
      </p>

      <button
        v-if="reporterName"
        @click="handleComment"
        title="Comment on this post"
        class="absolute top-4 right-2 flex justify-center items-center text-[var(--primary-color)] hover:text-[var(--secondary-color)]"
      >
        <!-- Use an icon component here; example icon used -->
        <Icon name="mdi:comment" size="20px" />
      </button>
    </div>
    <button
      v-if="!closeCase"
      @click="sharePost"
      title="Share this post"
      class="absolute top-72 right-2 flex justify-center items-center p-2 rounded-full bg-white text-[var(--secondary-color)] hover:text-[var(--primary-color)]"
    >
      <!-- Use an icon component here; example icon used -->
      <Icon name="heroicons-outline:share" size="20px" />
    </button>

    <button
      @click="viewDetails"
      class="btn-posts rounded-[0px_0px_5px_5px] mt-1 w-full"
    >
      View Details
    </button>
    <button
      v-if="closeCase && status === 'OPEN'"
      @click="navigateToCloseCase"
      class="bg-[var(--primary-color)] p-2 text-white w-full rounded-[0px_0px_5px_5px] hover:bg-[#035178]"
    >
      Found Your {{ posterRelation?.toLowerCase() }}
    </button>
  </div>
</template>
