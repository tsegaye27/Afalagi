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
    console.error(
      "❌❌Failed❌❌",
      error.response ? error.response.data : error.message
    );
  } finally {
    store.setLoading(false);
  }
});

const isLoggedIn = computed(() => !!store.token); // Reactive check
const language = ref("English");

const isDarkMode = ref(false);

onMounted(() => {
  if (typeof window !== "undefined") {
    // Check local storage for the dark mode preference
    isDarkMode.value = localStorage.getItem("dark-mode") === true;
  }
});

// Toggle Dark Mode function
const toggleDarkMode = () => {
  if (typeof window !== "undefined") {
    isDarkMode.value = !isDarkMode.value;
    localStorage.setItem("dark-mode", isDarkMode.value);
    document.documentElement.classList.toggle("dark", isDarkMode.value);
  }
};

watchEffect(() => {
  if (typeof window !== "undefined") {
    document.documentElement.classList.toggle("dark", isDarkMode.value);
  }
});

// Function to toggle mobile menu
function toggleMobileMenu() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
}
</script>

<template>
  <nav
    class="flex flex-wrap items-center justify-between px-4 py-2 shadow-md lg:px-8"
  >
    <!-- <div
      class="w-full flex justify-between md:pl-16 sm:pl-2 items-center lg:w-auto"
    > -->
    <!-- <button
          class="block lg:hidden text-2xl text-[var(--primary-color)]"
          @click="toggleMobileMenu"
        >
          <Icon name="heroicons-outline:menu-alt-3" size="24px" />
        </button>
      </div>
    </div> -->
    <!-- 
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
          <button
            class="text-2xl text-[var(--primary-color)]"
            @click="toggleMobileMenu"
          >
            <Icon name="heroicons-outline:x" size="24px" />
          </button> -->

    <!-- <ul class="flex flex-col gap-4 mt-4">
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
          </ul> -->
    <!-- </div> -->
    <!-- </div> -->
    <!-- </div> -->

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

        <!-- Dark Mode Toggle -->
        <button @click="toggleDarkMode">
          <span class="flex items-center" v-if="isDarkMode">
            <Icon name="heroicons-outline:sun" size="24px" />
          </span>
          <span class="flex items-center" v-else>
            <Icon name="heroicons-outline:moon" size="24px" />
          </span>
        </button>
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
