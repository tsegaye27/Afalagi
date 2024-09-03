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
const showAllComments = ref(false); // To toggle showing all comments
const parentId = ref(null); // For handling replies
const replyText = ref({}); // To handle multiple reply textareas

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
    imagePath.value = `http://localhost:3333/uploads/post/${response.data.data.images[0]}`;
    store.setLoading(false);
    console.log("Post details fetched successfully:", response.data.data);
  } catch (error) {
    console.error(error.response ? error.response.data : error.message);
    store.setLoading(false);
  }
});

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
  const hours = dateObj.getHours();
  const minutes = String(dateObj.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedHour = hours % 12 || 12;

  return `${month} ${day}, ${year} ${formattedHour}:${minutes} ${ampm}`;
}

const chatReporter = () => {
  store.setLoading(true);
  navigateTo("/profile/messages");
};

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
  } catch (error) {
    console.error(error.response ? error.response.data : error.message);
  }
};

const submitReply = async (commentId) => {
  if (!store.token) {
    navigateTo("/auth/login");
    return;
  }
  if (!replyText.value[commentId]?.trim()) return;

  try {
    const response = await $axios.post(
      `/comment/post`,
      {
        postId,
        commentText: replyText.value[commentId],
        parentId: commentId, // Set parentId to the comment being replied to
      },
      {
        headers: {
          Authorization: `Bearer ${store.token}`,
        },
      }
    );

    comments.value.push(response.data.data);
    console.log("Reply added successfully:", response.data.data);
    replyText.value[commentId] = ""; // Clear reply input after submission
  } catch (error) {
    console.error(error.response ? error.response.data : error.message);
  }
};

function getInitials(firstName, lastName) {
  const firstInitial = firstName ? firstName.charAt(0).toUpperCase() : "";
  const lastInitial = lastName ? lastName.charAt(0).toUpperCase() : "";
  return `${firstInitial}${lastInitial}`;
}

// Show limited or all comments based on the toggle
const visibleComments = computed(() => {
  return showAllComments.value ? comments.value : comments.value.slice(0, 4);
});
</script>

<template>
  <div>
    <div v-if="store.isLoading"><Spinner /></div>
    <div class="flex items-center m-8">
      <button
        @click="previousPage"
        class="flex btn-round justify-center items-center mr-[1rem]"
      >
        <</button
      ><span class="text-[var(--primary-color)] font-regular text-2xl"
        >Back</span
      >
    </div>

    <hr />
    <div class="flex flex-col">
      <div>
        <div class="flex mx-[5rem] my-[2rem] justify-between gap-[5rem]">
          <div class="person-image">
            <img
              class="w-[400px] h-[500px]"
              :src="imagePath"
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
          <button
            class="p-3 bg-[var(--secondary-color)] rounded-lg text-medium text-white"
            @click="chatReporter"
          >
            Chat with the {{ missingPerson.posterRelation?.toLowerCase() }}
          </button>
        </div>
      </div>
      <!-- Comments Section -->
      <div class="comments-section mx-[5rem] my-[2rem]">
        <h2
          class="text-[20px] text-[var(--primary-color)] font-medium mb-[1rem]"
        >
          Comments
        </h2>
        <div v-if="!visibleComments.length" class="text-[var(--primary-color)]">
          No comments yet. Be the first to comment!
        </div>
        <div
          v-for="comment in visibleComments"
          :key="comment.id"
          class="comment mb-[1rem]"
        >
          <div class="flex items-center gap-[1rem]">
            <div
              class="w-10 h-10 rounded-full bg-[var(--primary-color)] text-white flex items-center justify-center text-lg font-bold"
            >
              {{
                getInitials(
                  comment.user?.Profile.firstName,
                  comment.user?.Profile.lastName
                )
              }}
            </div>
            <div class="flex flex-col">
              <p class="text-[var(--primary-color)] font-medium">
                {{ comment.user?.Profile.firstName }}
                {{ comment.user?.Profile.lastName }}
              </p>
              <p class="text-[var(--primary-color)] mt-[0.5rem]">
                {{ comment.commentText }}
              </p>
              <div class="flex items-center gap-2">
                <p class="text-[var(--primary-color)]">
                  {{ formatDate(comment.createdAt) }}
                </p>
                <button @click="parentId = comment.id" class="text-blue-500">
                  Reply
                </button>
              </div>

              <!-- Reply Textarea and Button -->
              <div v-if="parentId === comment.id" class="mt-[1rem]">
                <textarea
                  v-model="replyText[comment.id]"
                  class="w-full p-2 border outline-none text-[var(--primary-color)] rounded"
                  rows="2"
                  placeholder="Write your reply..."
                ></textarea>
                <button
                  @click="submitReply(comment.id)"
                  class="mt-2 px-4 py-2 bg-[var(--secondary-color)] text-white rounded"
                >
                  Submit Reply
                </button>
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
      </div>

      <!-- Add Comment -->
      <div class="add-comment mx-[5rem] my-[2rem]">
        <textarea
          v-model="newComment"
          class="w-2/3 p-2 border outline-none text-[var(--primary-color)] rounded"
          rows="3"
          placeholder="Write your comment..."
        ></textarea>
        <button
          @click="submitComment"
          class="mt-2 px-4 py-2 bg-[var(--secondary-color)] text-white rounded"
        >
          Submit
        </button>
      </div>
    </div>
  </div>
</template>
