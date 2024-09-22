<script setup>
import { useUserStore } from "#imports";
import { ref, onMounted, computed, watchEffect } from "vue"; // Import necessary functions

const store = useUserStore();
const firstName = ref("");
const lastName = ref("");
const profilePicture = ref("");
const { $axios } = useNuxtApp();
const accessTokenCookie = useCookie("access_token");
const refreshTokenCookie = useCookie("refresh_token");

const setCookiesToStore = () => {
  if (accessTokenCookie.value && refreshTokenCookie.value) {
    store.setToken(accessTokenCookie.value);
    store.setRefreshToken(refreshTokenCookie.value);
  }
};

watchEffect(() => {
  setCookiesToStore();
});

onMounted(async () => {
  store.setLoading(true);

  setCookiesToStore();

  if (!store.token) {
    store.setLoading(false);
    return;
  }

  try {
    const profileResponse = await $axios.get("user/profile/me", {
      headers: {
        Authorization: `Bearer ${store.token}`,
      },
    });

    firstName.value = profileResponse.data.data.firstName;
    lastName.value = profileResponse.data.data.lastName;
    profilePicture.value = `http://localhost:3333/${picResponse.data.imagePath}`;
  } catch (error) {
    console.error(
      "❌❌Failed❌❌",
      error.response ? error.response.data : error.message
    );
  } finally {
    store.setLoading(false);
  }
});
</script>

<template>
  <nav
    class="flex flex-wrap items-center justify-between px-4 py-2 shadow-md lg:px-8"
  >
    <!-- Menu Items for Desktop -->
    <div class="hidden lg:flex w-full">
      <ul class="flex justify-center gap-12 items-center w-full">
        <li class="nav-menu">
          <NuxtLink
            to="/"
            class="flex items-center gap-1 hover:text-[var(--secondary-color)]"
            ><Icon name="heroicons-outline:home" size="22px" />Home</NuxtLink
          >
        </li>
        <li class="nav-menu">
          <NuxtLink
            to="/posts"
            class="flex items-center gap-1 hover:text-[var(--secondary-color)]"
            ><Icon
              name="material-symbols:post-add-sharp"
              size="22px"
            />Posts</NuxtLink
          >
        </li>
        <li class="nav-menu">
          <NuxtLink
            to="/success-story"
            class="flex items-center gap-1 hover:text-[var(--secondary-color)]"
            ><Icon name="material-symbols:history-edu" size="22px" />Success
            Story</NuxtLink
          >
        </li>
        <ReportBtn />
      </ul>
    </div>
  </nav>
</template>

<style scoped>
.nav-menu {
  font-size: 1rem;
}
@media (min-width: 1024px) {
  .nav-menu {
    font-size: 1.125rem;
  }
}

.router-link-active {
  color: var(--secondary-color);
}
</style>
