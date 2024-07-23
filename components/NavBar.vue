<template>
  <nav class="flex shadow-md px-[2rem] h-[7rem] justify-between pr-[3rem]">
    <div>
      <NuxtLink to="/">
        <img
          class="logo w-[180px] mt-[0.5rem] ml-[2.5rem] h-[90px] object-contain"
          src="@/assets/img/logo.png"
          alt="reuniteus_logo"
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
      <select
        class="p-2 rounded-md outline-none"
        @change="handleChange"
        name="lang"
        id="lang"
      >
        <option class="rounded-md bg-slate-100" value="Eng">🇬🇧</option>
        <option class="rounded-md bg-slate-100" value="Amh">🇪🇹</option>
      </select>
      <li v-if="!isLogged" class="nav-menu">
        <NuxtLink
          class="flex gap-[0.35rem] justify-center items-center"
          to="/auth/signup"
          ><span class="flex items-center"
            ><Icon name="material-symbols-light:login" size="22px" /></span
          >Signup</NuxtLink
        >
      </li>
      <li
        v-else
        class="rounded-full p-2 border border-[var(--secondary-color)] hover:text-[var(--secondary-color)]"
      >
        <NuxtLink
          class="flex gap-[0.35rem] justify-center items-center"
          to="/profile"
        >
          <span
            class="text-[var(--primary-color)] flex justify-center items-center"
          >
            <Icon name="humbleicons:user" size="25px" />
          </span>
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<script setup>
defineProps({
  isLogged: { type: Boolean, default: true },
});
const lang = ref("English");

const handleChange = () => {
  lang.value = document.getElementById("lang").value;
  console.log(lang.value);
};
</script>

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
