<template>
  <nav
    class="flex px-[2rem] h-[7rem] justify-between border-b-[2px] border-[slate-100]"
  >
    <ul class="flex justify-evenly w-full items-center">
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
    </ul>
  </nav>
</template>

<script setup></script>

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
