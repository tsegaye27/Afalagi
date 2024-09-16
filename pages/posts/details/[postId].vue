<script setup>
import { useUserStore } from "#imports";
import { ref, onMounted, computed } from "vue";

const store = useUserStore();
const router = useRouter();
const { $axios } = useNuxtApp();
const route = useRoute();

const imagePath = ref("");
const missingPerson = ref({});
const comments = ref([]);
const newComment = ref("");
const postId = route.params.postId;
const showAllComments = ref(false);
const parentId = ref(null);
const replyText = ref("");
const newReply = ref({});

const previousPage = () => {
  router.go(-1);
};

onMounted(async () => {
  store.setLoading(true);
  try {
    const response = await $axios.get(`/post/${postId}`, {
      headers: {
        Authorization: `Bearer ${store.token}`,
      },
    });
    missingPerson.value = response.data.data;
    comments.value = response.data.data.comments;
    replies.value = comments.value.map((comment) =>
      comment.parentId !== null ? replies.value : replies.value
    );
    imagePath.value = `http://localhost:3333/uploads/post/${response.data.data.images[0]}`;
    store.setLoading(false);
    console.log(
      "Post details fetched successfully:",
      response.data.data,
      replies.value
    );
  } catch (error) {
    console.error(error.response ? error.response.data : error.message);
    store.setLoading(false);
  }
});

const fetchComments = async () => {
  try {
    const response = await $axios.get(`/post/${postId}`, {
      headers: {
        Authorization: `Bearer ${store.token}`,
      },
    });
    comments.value = response.data.data.comments;
    console.log("Comments fetched successfully:", response.data.data.comments);
  } catch (error) {
    console.error(error.response ? error.response.data : error.message);
  }
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

const submitComment = async () => {
  if (!store.token) {
    navigateTo("/auth/login");
    return;
  }
  if (!newComment.value.trim()) return;

  try {
    const response = await $axios.post(
      `/comment/post`,
      {
        postId,
        commentText: newComment.value,
        parentId: parentId.value, // Handle parentId for replies
      },
      {
        headers: {
          Authorization: `Bearer ${store.token}`,
        },
      }
    );

    comments.value.push(response.data.data);
    console.log("Comment added successfully:", response.data.data);
    newComment.value = ""; // Clear input after submission
    parentId.value = null; // Reset parentId after reply submission
    fetchComments();
  } catch (error) {
    console.error(error.response ? error.response.data : error.message);
  }
};

const replyVisible = ref(null);
const replies = ref({});

const toggleReply = (commentId) => {
  replyVisible.value = replyVisible.value === commentId ? null : commentId;
};

const submitReply = async (parentId) => {
  if (!store.token) {
    navigateTo("/auth/login");
    return;
  }

  if (!replyText.value.trim()) return; // Access replyText.value since it's a ref

  try {
    const response = await $axios.post(
      `/comment/post`,
      {
        postId, // Ensure postId is passed correctly
        commentText: replyText.value, // Use replyText.value
        parentId, // Send parentId to link the reply with the comment
      },
      {
        headers: {
          Authorization: `Bearer ${store.token}`,
        },
      }
    );

    // Use the response directly (no need for response.json())
    newReply.value = response.data.data;

    // Push the new reply to the comments array
    comments.value.push(newReply.value);

    replyText.value = ""; // Clear the reply input after submission
    replyVisible.value = null; // Hide the reply textarea
    newReply.value = {}; // Reset the newReply object

    console.log("Reply added successfully:", response.data.data);
    fetchComments(); // Optionally refetch comments after reply submission
  } catch (error) {
    console.error(error.response ? error.response.data : error.message);
  }
};

const getReplies = (parentId) => {
  // Add new reply to the comments array (or send to backend)
  console.log(
    comments.value.filter((comment) => comment.parentId === parentId)
  );
  return comments.value.filter((comment) => comment.parentId === parentId);
};

// Reactive state for managing visibility of replies
const replyVisibility = ref({});

// Toggle reply visibility for a specific comment
const toggleReplies = (commentId) => {
  replyVisibility.value[commentId] = !replyVisibility.value[commentId];
};

// Get top-level comments only
const topLevelComments = computed(() => {
  return comments.value.filter((comment) => comment.parentId === null);
});

function getInitials(firstName, lastName) {
  const firstInitial = firstName ? firstName.charAt(0).toUpperCase() : "";
  const lastInitial = lastName ? lastName.charAt(0).toUpperCase() : "";
  return `${firstInitial}${lastInitial}`;
}

const visibleComments = computed(() => {
  return topLevelComments.value.slice(0, showAllComments.value ? undefined : 4);
});

function timeAgo(date) {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);
  let interval = Math.floor(seconds / 31536000);

  if (interval > 1) {
    return `${interval} years ago`;
  }
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return `${interval} months ago`;
  }
  interval = Math.floor(seconds / 86400);
  if (interval >= 1) {
    return `${interval} ${interval === 1 ? "day ago" : "days ago"}`;
  }
  interval = Math.floor(seconds / 3600);
  if (interval >= 1) {
    return `${interval} ${interval === 1 ? "hour ago" : "hours ago"}`;
  }
  interval = Math.floor(seconds / 60);
  if (interval >= 1) {
    return `${interval} min ago`;
  }
  return `${Math.floor(seconds)} sec ago`;
}
</script>

<template>
  <div>
    <div v-if="store.isLoading"><Spinner /></div>
    <div class="flex items-center m-8">
      <button
        @click="previousPage"
        class="flex text-[var(--primary-color)] justify-center items-center mr-[1rem]"
      >
        <!-- <Icon name="material-symbols:arrow-left-alt" size="20px" /> -->
        <span class="text-[var(--primary-color)] font-regular text-2xl"
          >Back</span
        >
      </button>
    </div>

    <hr />
    <div class="flex flex-col">
      <div>
        <div class="flex mx-[5rem] my-[2rem] justify-between gap-[4rem]">
          <div class="person-image">
            <img
              class="w-[400px] h-[500px]"
              :src="imagePath"
              alt="missing_person"
            />
          </div>
          <div class="w-[900px] justify-start flex mt-[1rem]">
            <ul class="flex flex-col gap-4">
              <div class="flex justify-start gap-[6rem] w-full">
                <li
                  class="font-medium w-[170px] text-[var(--primary-color)] text-lg"
                >
                  Full Name:
                </li>
                <span class="text-[var(--primary-color)] font-regular">{{
                  `${missingPerson.firstName} ${missingPerson.middleName} ${missingPerson.lastName}`
                }}</span>
              </div>
              <div class="flex justify-start">
                <li
                  class="font-medium w-[265px] text-[var(--primary-color)] text-lg"
                >
                  Date of Birth:
                </li>
                <span class="text-[var(--primary-color)] font-regular">{{
                  formatDate(missingPerson.dateOfBirth)
                }}</span>
              </div>
              <div class="flex justify-start gap-[6rem] wrap">
                <li
                  class="font-medium w-[170px] text-[var(--primary-color)] text-lg"
                >
                  Gender:
                </li>
                <span class="text-[var(--primary-color)] font-regular">{{
                  missingPerson.gender?.toLowerCase()
                }}</span>
              </div>
              <div class="flex justify-start gap-[6rem] wrap">
                <li
                  class="font-medium w-[170px] text-[var(--primary-color)] text-lg"
                >
                  Nationality:
                </li>
                <span class="text-[var(--primary-color)] font-regular">{{
                  missingPerson.nationality?.toLowerCase()
                }}</span>
              </div>
              <div class="flex justify-start gap-[6rem] wrap">
                <li
                  class="font-medium w-[170px] text-[var(--primary-color)] text-lg"
                >
                  Hair-Color:
                </li>
                <span class="text-[var(--primary-color)] font-regular">{{
                  missingPerson.hairColor?.toLowerCase()
                }}</span>
              </div>
              <div class="flex justify-start gap-[6rem] wrap">
                <li
                  class="font-medium w-[170px] text-[var(--primary-color)] text-lg"
                >
                  Skin-Color:
                </li>
                <span class="text-[var(--primary-color)] font-regular">{{
                  missingPerson.skinColor?.toLowerCase()
                }}</span>
              </div>
              <div class="flex justify-start gap-[6rem] wrap">
                <li
                  class="font-medium w-[170px] text-[var(--primary-color)] text-lg"
                >
                  Height:
                </li>
                <span class="text-[var(--primary-color)] font-regular">{{
                  missingPerson.height ? missingPerson.height : "Not Specified"
                }}</span>
              </div>
              <div class="flex justify-start gap-[5.5rem] wrap">
                <li
                  class="font-medium w-[180px] text-[var(--primary-color)] text-lg"
                >
                  Last-seen Wearing:
                </li>
                <span class="text-[var(--primary-color)] font-regular">{{
                  missingPerson.lastSeenWearing
                }}</span>
              </div>
              <div class="flex justify-start gap-[4.25rem] wrap">
                <li
                  class="font-medium w-[200px] text-[var(--primary-color)] text-lg"
                >
                  Last-seen Location:
                </li>
                <span class="text-[var(--primary-color)] font-regular">{{
                  missingPerson.lastSeenLocation
                }}</span>
              </div>
              <div class="flex justify-start gap-[6rem] wrap">
                <li
                  class="font-medium w-[170px] text-[var(--primary-color)] text-lg"
                >
                  Last-seen Date:
                </li>
                <span class="text-[var(--primary-color)] font-regular">{{
                  formatDate(missingPerson.lastSeenDate)
                }}</span>
              </div>
              <div class="flex justify-start gap-[6rem] wrap">
                <li
                  class="font-medium w-[170px] text-[var(--primary-color)] text-lg"
                >
                  Description:
                </li>
                <span class="text-[var(--primary-color)] font-regular">{{
                  missingPerson.description
                }}</span>
              </div>
              <div class="flex justify-start gap-[6rem] wrap">
                <li
                  class="font-medium w-[170px] whitespace-nowrap text-[var(--primary-color)] text-lg"
                >
                  Recognizable Features:
                </li>
                <span class="text-[var(--primary-color)] font-regular">{{
                  missingPerson.recognizableFeatures
                }}</span>
              </div>
              <div class="flex justify-start gap-[6rem] wrap">
                <li
                  class="font-medium w-[170px] text-[var(--primary-color)] text-lg"
                >
                  Education:
                </li>
                <span class="text-[var(--primary-color)] font-regular">{{
                  missingPerson.educationalLevel?.toLowerCase()
                }}</span>
              </div>
              <div class="flex justify-start gap-[6rem] wrap">
                <li
                  class="font-medium w-[170px] text-[var(--primary-color)] text-lg"
                >
                  Language Spoken:
                </li>
                <span class="text-[var(--primary-color)] font-regular">{{
                  missingPerson.languageSpoken
                }}</span>
              </div>
              <div class="flex justify-start gap-[6rem] wrap">
                <li
                  class="font-medium w-[170px] text-[var(--primary-color)] text-lg"
                >
                  Marital Status:
                </li>
                <span class="text-[var(--primary-color)] font-regular">{{
                  missingPerson.maritalStatus?.toLowerCase()
                }}</span>
              </div>
              <div class="flex justify-start gap-[6rem] wrap">
                <li
                  class="font-medium w-[170px] whitespace-nowrap text-[var(--primary-color)] text-lg"
                >
                  Physical Disability:
                </li>
                <span class="text-[var(--primary-color)] font-regular">{{
                  missingPerson.physicalDisability
                }}</span>
              </div>
              <div class="flex justify-start gap-[6rem] wrap">
                <li
                  class="font-medium w-[170px] whitespace-nowrap text-[var(--primary-color)] text-lg"
                >
                  Mental Disability:
                </li>
                <span class="text-[var(--primary-color)] font-regular">{{
                  missingPerson.mentalDisability
                }}</span>
              </div>
              <div class="flex justify-start gap-[6rem] wrap">
                <li
                  class="font-medium w-[170px] whitespace-nowrap text-[var(--primary-color)] text-lg"
                >
                  Medical Condition:
                </li>
                <span class="text-[var(--primary-color)] font-regular">{{
                  missingPerson.medicalIssues
                }}</span>
              </div>
              <div
                v-if="missingPerson.height"
                class="flex justify-start gap-[6rem] wrap"
              >
                <li
                  class="font-medium w-[170px] text-[var(--primary-color)] text-lg"
                >
                  Height:
                </li>
                <span class="text-[var(--primary-color)] font-regular">{{
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
            Message from his {{ missingPerson.posterRelation?.toLowerCase() }}
          </h1>
          <video class="w-[600px] h-[400px] rounded-md" controls src=""></video>
        </div>
      </div>
      <!-- Comments Section -->
      <div class="comments-section mx-[5rem] my-[2rem]">
        <h2
          class="text-[20px] text-[var(--primary-color)] font-medium mb-[1rem]"
        >
          Comments ({{ topLevelComments.length }})
        </h2>

        <div
          v-if="!topLevelComments.length"
          class="text-[var(--primary-color)]"
        >
          No comments yet. Be the first to comment!
        </div>

        <div
          v-for="comment in visibleComments"
          :key="comment.id"
          class="my-[1rem]"
        >
          <!-- Comment with Replies -->
          <div
            :class="{
              'border border-[#d2d2d2] w-[35rem] p-[1rem] rounded': true,
            }"
          >
            <div class="flex items-center gap-[1rem]">
              <div
                class="w-11 h-10 rounded-full bg-green-500 text-white flex items-center justify-center text-md font-bold"
              >
                {{
                  getInitials(
                    comment.user?.Profile.firstName,
                    comment.user?.Profile.lastName
                  )
                }}
              </div>
              <div class="flex flex-col w-full">
                <p class="text-[var(--secondary-color)] font-medium">
                  {{ comment.user?.Profile.firstName }}
                  {{ comment.user?.Profile.lastName }}
                </p>
                <p class="text-[var(--primary-color)]">
                  {{ comment.commentText }}
                </p>
                <div class="flex items-center justify-between">
                  <p class="text-[#868686]">{{ timeAgo(comment.createdAt) }}</p>
                  <!-- Added "replyVisible" check for displaying reply textarea and submit button -->

                  <!-- Updated reply icon button with a click event to toggle replyVisible -->
                  <button
                    @click="replyVisible = comment.id"
                    class="flex items-center text-[var(--primary-color)]"
                  >
                    <Icon name="heroicons-solid:reply" size="22px" />
                  </button>
                </div>
                <div
                  v-if="replyVisible === comment.id"
                  class="ml-[2rem] mt-[1rem] flex flex-col"
                >
                  <textarea
                    v-model="replyText"
                    class="w-2/3 p-2 ring ring-[var(--secondary-color)] outline-none bg-[var(--background-color)] text-[var(--primary-color)] rounded"
                    rows="2"
                    placeholder="Write your reply..."
                  ></textarea>
                  <button
                    @click="submitReply(comment.id)"
                    class="px-4 py-2 w-[8rem] bg-[var(--secondary-color)] text-white rounded mt-[0.5rem]"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>

            <!-- Toggle View Replies -->
            <button
              v-if="getReplies(comment.id).length > 0"
              @click="toggleReplies(comment.id)"
              class="text-[var(--primary-color)] mt-[0.5rem]"
            >
              {{
                replyVisibility[comment.id] ? "Hide Replies" : "View Replies"
              }}
              ({{ getReplies(comment.id).length }})
            </button>

            <!-- Display Replies (Hidden by default) -->
            <div v-if="replyVisibility[comment.id]" class="ml-[2rem]">
              <div
                v-for="reply in getReplies(comment.id)"
                :key="reply.id"
                class="my-[0.5rem]"
              >
                <div class="flex items-center gap-[1rem]">
                  <div
                    class="w-10 h-9 rounded-full bg-blue-500 text-white flex items-center justify-center text-md font-bold"
                  >
                    {{
                      getInitials(
                        reply.user?.Profile.firstName,
                        reply.user?.Profile.lastName
                      )
                    }}
                  </div>
                  <div class="flex flex-col w-full">
                    <p class="text-[var(--secondary-color)] font-medium">
                      {{ reply.user?.Profile.firstName }}
                      {{ reply.user?.Profile.lastName }}
                    </p>
                    <p class="text-[var(--primary-color)]">
                      {{ reply.commentText }}
                    </p>
                    <div class="flex items-center justify-between">
                      <p class="text-[#868686]">
                        {{ timeAgo(reply.createdAt) }}
                      </p>
                    </div>
                  </div>
                </div>

                <!-- Add Nested Reply Section -->
                <div
                  v-if="replyVisible === reply.id"
                  class="ml-[2rem] mt-[1rem]"
                >
                  <textarea
                    v-model="replies[reply.id]"
                    class="w-2/3 p-2 ring ring-[var(--secondary-color)] outline-none bg-[var(--background-color)] text-[var(--text-color)] rounded"
                    rows="3"
                    placeholder="Write your reply..."
                  ></textarea>
                  <button
                    @click="submitReply(reply.id)"
                    class="px-4 py-2 w-[8rem] bg-[var(--secondary-color)] text-white rounded mt-[0.5rem]"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Toggle Button -->
        <button
          v-if="comments.length > 4"
          @click="showAllComments = !showAllComments"
          class="text-[var(--primary-color)] mt-4"
        >
          {{ showAllComments ? "View Less" : "View More" }}
        </button>

        <!-- Add Comment -->
        <div class="mt-[2rem]">
          <textarea
            v-model="newComment"
            class="w-full p-2 ring ring-[var(--secondary-color)] outline-none bg-[var(--background-color)] text-[var(--text-color)] rounded"
            rows="3"
            placeholder="Write your comment..."
          ></textarea>
          <button
            @click="submitComment"
            class="px-4 py-2 w-[8rem] bg-[var(--secondary-color)] text-white rounded mt-[0.5rem]"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
