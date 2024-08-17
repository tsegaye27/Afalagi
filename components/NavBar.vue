<script setup>
import { useUserStore } from "#imports";

const store = useUserStore();
const token = store.token;
const firstName = ref("");
const lastName = ref("");
const { $axios } = useNuxtApp();

const profilePicture = ref(null);

token &&
  onMounted(async () => {
    try {
      const response = await $axios.get("user/profile/me", {
        headers: {
          Authorization: `Bearer ${store.token}`,
        },
      });
      console.log("✅✅success✅✅", response.data.data);
      firstName.value = response.data.data.firstName;
      lastName.value = response.data.data.lastName;
    } catch (error) {
      console.log(
        "❌❌Failed❌❌",
        error.response ? error.response.data : error.message
      );
    }
  });

token &&
  onMounted(async () => {
    try {
      const response = await $axios.get("user/profile/pic", {
        headers: {
          Authorization: `Bearer ${store.refreshToken}`,
        },
      });
      console.log("success", response.data);
      profilePicture.value = `http://localhost:3333/${response.data.imagePath}`;
    } catch (error) {
      console.log(error.response ? error.response.data : error.message);
    }
  });

const isLoggedIn = token ? true : false;
const language = ref("English");
</script>
<template>
  <nav class="flex shadow-md px-[2rem] h-[7rem] justify-between pr-[3rem]">
    <div>
      <NuxtLink to="/">
        <img
          class="logo w-[180px] mt-[0.5rem] ml-[2.5rem] h-[90px] object-contain"
          src="@/assets/img/logo.png"
          alt="reuniteUs_logo"
      /></NuxtLink>
    </div>
    <ul class="flex w-[70%] justify-end gap-[2.5rem] items-center">
      <li class="nav-menu">
        <NuxtLink to="/" class="flex gap-[0.35rem] justify-center items-center"
          ><span class="flex items-center"
            ><Icon name="heroicons-outline:home" size="22px" /></span
          >Home</NuxtLink
        >
      </li>
      <li class="nav-menu">
        <NuxtLink
          class="flex gap-[0.35rem] justify-center items-center"
          to="/posts"
          ><span class="flex items-center"
            ><Icon name="material-symbols:post-add-sharp" size="22px" /></span
          >Posts</NuxtLink
        >
      </li>
      <li class="nav-menu">
        <NuxtLink
          class="flex gap-[0.35rem] justify-center items-center"
          to="/success-story"
          ><span class="flex items-center"
            ><Icon name="material-symbols:history-edu" size="22px" /></span
          >Success Story</NuxtLink
        >
      </li>
      <ReportBtn />
      <select class="p-2 rounded-md outline-none" v-model="language">
        <option class="rounded-md bg-slate-100" value="English">🇬🇧</option>
        <option class="rounded-md bg-slate-100" value="Amharic">🇪🇹</option>
      </select>
      <li v-if="!isLoggedIn" class="nav-menu">
        <NuxtLink
          class="flex gap-[0.35rem] justify-center items-center"
          to="/auth/login"
          ><span class="flex items-center"
            ><Icon name="material-symbols-light:login" size="22px" /></span
          >Login</NuxtLink
        >
      </li>
      <li
        v-else
        class="rounded-full p-2 border border-[var(--secondary-color)] hover:text-[var(--secondary-color)]"
      >
        <NuxtLink
          class="flex gap-[0.35rem] justify-center items-center"
          to="/profile/details"
        >
          <img
            class="w-[50px] h-[50px] rounded-[0.6rem] border-1 border-[#f4f4f4]"
            :src="profilePicture"
            alt="profile-picture"
          />
          <!-- <span class="flex items-center"
            ><Icon name="heroicons-outline:user" size="22px"
          /></span> -->
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
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
