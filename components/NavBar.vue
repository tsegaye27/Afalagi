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

// Define the reactive property for mobile menu state
const isMobileMenuOpen = ref(false);

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

// Function to toggle mobile menu
function toggleMobileMenu() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
}
</script>

<template>
  <nav
    class="flex flex-wrap items-center justify-between px-4 py-2 shadow-md lg:px-8"
  >
    <!-- Logo -->
    <div
      class="w-full flex justify-between md:pl-16 sm:pl-2 items-center lg:w-auto"
    >
      <NuxtLink to="/">
        <img
          class="w-16 h-auto object-contain"
          src="@/assets/img/logo.png"
          alt="reuniteUs_logo"
        />
      </NuxtLink>

      <!-- Mobile Menu Button and Profile/Language -->
      <div class="flex items-center gap-4">
        <!-- Language Selector -->
        <select
          class="p-2 rounded-md outline-none lg:hidden"
          v-model="language"
        >
          <option class="bg-slate-100" value="English">🇬🇧</option>
          <option class="bg-slate-100" value="Amharic">🇪🇹</option>
        </select>

        <!-- Profile Picture -->
        <div v-if="isLoggedIn" class="lg:hidden">
          <NuxtLink
            class="flex gap-[0.35rem] justify-center items-center"
            to="/profile/details"
          >
            <img
              class="w-[40px] h-[40px] rounded-full border-1 border-[#f4f4f4]"
              :src="profilePicture"
              alt="profile-picture"
            />
          </NuxtLink>
        </div>

        <!-- Login Button (if not logged in) -->
        <div v-else class="lg:hidden">
          <NuxtLink
            to="/auth/login"
            class="flex items-center gap-1 hover:text-[var(--secondary-color)]"
            ><Icon
              name="material-symbols-light:login"
              size="22px"
            />Login</NuxtLink
          >
        </div>
        <!-- Mobile Menu Button -->
        <button
          class="block lg:hidden text-2xl text-[var(--primary-color)]"
          @click="toggleMobileMenu"
        >
          <Icon name="heroicons-outline:menu-alt-3" size="24px" />
        </button>
      </div>
    </div>

    <!-- Mobile Drawer -->
    <div
      class="fixed top-0 left-0 z-40 w-full h-full bg-black bg-opacity-40"
      v-if="isMobileMenuOpen"
      @click="toggleMobileMenu"
    >
      <div
        class="fixed top-0 left-0 z-50 w-2/3 h-full bg-white shadow-lg transform transition-transform duration-500"
        :class="{
          '-translate-x-full': !isMobileMenuOpen,
          'translate-x-0': isMobileMenuOpen,
        }"
        @click.stop
      >
        <div class="p-4">
          <!-- Close Button -->
          <button
            class="text-2xl text-[var(--primary-color)]"
            @click="toggleMobileMenu"
          >
            <Icon name="heroicons-outline:x" size="24px" />
          </button>

          <!-- Mobile Menu Items -->
          <ul class="flex flex-col gap-4 mt-4">
            <li class="nav-menu">
              <NuxtLink
                to="/"
                class="flex items-center gap-1 hover:text-[var(--secondary-color)]"
                @click="toggleMobileMenu"
                ><Icon
                  name="heroicons-outline:home"
                  size="22px"
                />Home</NuxtLink
              >
            </li>
            <li class="nav-menu">
              <NuxtLink
                to="/posts"
                class="flex items-center gap-1 hover:text-[var(--secondary-color)]"
                @click="toggleMobileMenu"
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
                @click="toggleMobileMenu"
                ><Icon name="material-symbols:history-edu" size="22px" />Success
                Story</NuxtLink
              >
            </li>
            <li class="nav-menu">
              <ReportBtn />
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Menu Items for Desktop -->
    <div class="hidden lg:flex w-full lg:w-auto">
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
}
</style>
