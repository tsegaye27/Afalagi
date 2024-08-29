<script setup>
import { useUserStore } from "#imports";
import { ref, watch, onMounted } from "vue";
import { useNuxtApp } from "#app";

const store = useUserStore();
const firstName = ref("");
const lastName = ref("");
const profilePicture = ref("");
const { $axios } = useNuxtApp();

const fetchProfileData = async () => {
  const accessTokenCookie = useCookie("access_token");
  const refreshTokenCookie = useCookie("refresh_token");

  if (accessTokenCookie.value) {
    store.setToken(accessTokenCookie.value);
  }
  if (refreshTokenCookie.value) {
    store.setRefreshToken(refreshTokenCookie.value);
  }
  if (!store.token) {
    navigateTo("/auth/login");
    return;
  }

  store.setLoading(true);
  try {
    const [profileResponse, pictureResponse] = await Promise.all([
      $axios.get("user/profile/me", {
        headers: { Authorization: `Bearer ${store.token}` },
      }),
      $axios.get("user/profile/pic", {
        headers: { Authorization: `Bearer ${store.token}` },
      }),
    ]);

    const profileData = profileResponse.data.data;
    const pictureData = pictureResponse.data.imagePath;

    firstName.value = profileData.firstName;
    lastName.value = profileData.lastName;
    profilePicture.value = `http://localhost:3333/${pictureData}`;
  } catch (error) {
    console.error(
      "❌ Error fetching profile data:",
      error.response ? error.response.data : error.message
    );
  } finally {
    store.setLoading(false);
  }
};

// Watch for changes to isProfileUpdated and refetch data
watch(
  () => store.isProfileUpdated,
  async (newVal) => {
    if (newVal) {
      await fetchProfileData();
      store.setProfileUpdated(false);
    }
  }
);

onMounted(fetchProfileData);

const logoutHandler = () => {
  store.setToken();
  store.setRefreshToken();
  store.setLoading(true);
  const accessTokenCookie = useCookie("access_token");
  const refreshTokenCookie = useCookie("refresh_token");
  const profileCookie = useCookie("profile");
  const verifiedCookie = useCookie("verified");

  accessTokenCookie.value = null;
  refreshTokenCookie.value = null;
  profileCookie.value = null;
  verifiedCookie.value = null;
  navigateTo("/");
};
</script>

<template>
  <div
    class="flex flex-col justify-center gap-[1rem] items-center border-r-2 border-[slate-100] bg-[var(--primary-color)]"
  >
    <div v-if="store.isLoading">
      <Spinner />
    </div>
    <div
      class="w-[200px] h-[200px] flex flex-col gap-[2rem] justify-center items-center"
    >
      <img
        class="w-[80px] h-[80px] rounded-[2.5rem] border-2 border-[#f4f4f4]"
        :src="profilePicture"
        :alt="`${firstName} ${lastName}`"
      />
      <p class="text-xl text-white font-semibold">
        {{ `${firstName} ${lastName}` }}
      </p>
    </div>
    <ul class="pt-[2rem] flex flex-col items-center h-[50%] w-[100%]">
      <nuxt-link class="py-1 flex justify-center w-[60%]" to="/profile/details">
        <div
          class="text-white flex justify-center gap-[0.2rem] py-[0.3rem] border border-white w-[100%] text-center rounded-md cursor-pointer hover:text-[var(--secondary-color)]"
        >
          <span class="flex justify-center items-baseline"
            ><Icon name="humbleicons:user" size="20px"
          /></span>
          Profile
        </div>
      </nuxt-link>
      <nuxt-link
        class="py-1 flex justify-center w-[60%]"
        to="/profile/my-posts"
      >
        <div
          class="text-white flex justify-center gap-[0.2rem] py-[0.3rem] border border-white w-[100%] text-center rounded-md cursor-pointer hover:text-[var(--secondary-color)]"
        >
          <span class="flex justify-center items-baseline"
            ><Icon name="humbleicons:documents" size="20px"
          /></span>
          My Posts
        </div>
      </nuxt-link>
      <div
        class="text-white py-[0.3rem] border border-white w-[60%] text-center rounded-md cursor-pointer hover:text-[var(--secondary-color)]"
      >
        <nuxt-link
          class="flex justify-center gap-[0.2rem]"
          to="/profile/messages"
        >
          <span class="flex justify-center items-baseline"
            ><Icon name="humbleicons:chat" size="20px"
          /></span>
          Messages
        </nuxt-link>
      </div>
      <div
        class="text-white my-1 border border-white w-[60%] text-center rounded-md cursor-pointer hover:text-[var(--secondary-color)]"
      >
        <nuxt-link
          class="flex py-[0.3rem] justify-center gap-[0.2rem]"
          to="/profile/settings"
        >
          <span class="flex justify-center items-baseline"
            ><Icon name="humbleicons:cog" size="20px"
          /></span>
          Settings
        </nuxt-link>
      </div>
    </ul>
    <button
      @click="logoutHandler"
      class="w-[60%] mb-[30px] flex justify-center py-1 gap-[0.35rem] text-white border border-white rounded-md"
    >
      <span class="flex justify-center items-center"
        ><Icon size="22px" name="iconoir:log-out"
      /></span>
      Logout
    </button>
  </div>
</template>

<style scoped>
.router-link-active {
  color: var(--secondary-color);
  transition: all 0.5s;
}
.router-link-exact-active {
  color: var(--secondary-color);
  transition: all 0.5s;
}
</style>
