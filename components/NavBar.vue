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
    const [profileResponse, picResponse] = await Promise.all([
      $axios.get("user/profile/me", {
        headers: {
          Authorization: `Bearer ${store.token}`,
        },
      }),
      $axios.get("user/profile/pic", {
        headers: {
          Authorization: `Bearer ${store.token}`,
        },
      }),
    ]);

    firstName.value = profileResponse.data.data.firstName;
    lastName.value = profileResponse.data.data.lastName;
    profilePicture.value = `http://localhost:3333/${picResponse.data.imagePath}`;
  } catch (error) {
    console.log(
      "❌❌Failed❌❌",
      error.response ? error.response.data : error.message
    );
  } finally {
    store.setLoading(false);
  }
});

const isLoggedIn = computed(() => !!store.token); // Reactive check
const language = ref("English");
</script>

<template>
  <nav
    class="flex flex-wrap items-center justify-between px-4 py-2 shadow-md lg:px-8"
  >
    <!-- Logo -->
    <div class="w-full flex justify-between pl-16 items-center lg:w-auto">
      <NuxtLink to="/">
        <img
          class="w-16 h-auto object-contain"
          src="@/assets/img/logo.png"
          alt="reuniteUs_logo"
        />
      </NuxtLink>

      <!-- Mobile Menu Button -->
      <button
        class="block lg:hidden text-2xl text-[var(--primary-color)]"
        @click="isMobileMenuOpen = !isMobileMenuOpen"
      >
        <Icon name="heroicons-outline:menu-alt-3" size="24px" />
      </button>
    </div>

    <!-- Menu Items -->
    <div
      :class="[
        'w-full lg:flex lg:w-auto',
        isMobileMenuOpen ? 'block' : 'hidden',
      ]"
    >
      <ul
        class="flex flex-col gap-4 mt-4 lg:mt-0 lg:flex-row lg:gap-8 lg:items-center"
      >
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
        <select class="p-2 rounded-md outline-none" v-model="language">
          <option class="bg-slate-100" value="English">🇬🇧</option>
          <option class="bg-slate-100" value="Amharic">🇪🇹</option>
        </select>
        <li v-if="!isLoggedIn" class="nav-menu">
          <NuxtLink
            to="/auth/login"
            class="flex items-center gap-1 hover:text-[var(--secondary-color)]"
            ><Icon
              name="material-symbols-light:login"
              size="22px"
            />Login</NuxtLink
          >
        </li>
        <li
          v-else
          class="rounded-full border border-[var(--secondary-color)] hover:text-[var(--secondary-color)]"
        >
          <NuxtLink
            class="flex gap-[0.35rem] justify-center items-center"
            to="/profile/details"
          >
            <img
              class="w-[55px] h-[55px] rounded-full border-1 border-[#f4f4f4]"
              :src="profilePicture"
              alt="profile-picture"
            />
          </NuxtLink>
        </li>
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
  border-bottom: 2px solid var(--secondary-color);
  transition: all 0.5s;
}
.router-link-exact-active {
  color: var(--secondary-color);
  border-bottom: 2px solid var(--secondary-color);
  transition: all 0.5s;
}
</style>
