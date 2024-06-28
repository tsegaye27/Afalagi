<template>
  <nav class="flex shadow-md px-[2rem] h-[6rem] justify-between pr-[3rem]">
    <div
      class="logo text-[3rem] pl-[3rem] text-[#788DD5] font-[poppins] flex items-center font-semibold"
    >
      Afalagi
    </div>
    <ul class="flex w-[70%] justify-end gap-[2.5rem] items-center">
      <li class="nav-menu"><NuxtLink to="/">Home</NuxtLink></li>
      <li class="nav-menu"><NuxtLink to="/posts">Posts</NuxtLink></li>
      <li class="nav-menu">
        <NuxtLink to="/success-story">Success Story</NuxtLink>
      </li>
      <li v-if="!isLogged" class="nav-menu">
        <NuxtLink to="/auth/signup">Signup</NuxtLink>
      </li>
      <li v-else class="nav-menu">
        <NuxtLink to="/profile">Profile</NuxtLink>
      </li>
      <li class="nav-menu btn"><NuxtLink to="/report">Report Now</NuxtLink></li>
      <select class="p-2 rounded-md outline-none" name="lang" id="lang">
        <option class="rounded-md bg-slate-100" value="English" selected>
          Eng
        </option>
        <option class="rounded-md bg-slate-100" value="አማርኛ">አማ</option>
      </select>
    </ul>
  </nav>
</template>

<script setup>
defineProps({
  isLogged: { type: Boolean, required: true, default: false },
});
</script>
