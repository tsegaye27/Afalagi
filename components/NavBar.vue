<template>
  <nav class="flex justify-between">
    <div
      class="logo text-[3rem] pl-[3rem] text-[#788DD5] font-[poppins] flex items-center font-semibold"
    >
      Afalagi
    </div>
    <ul class="flex w-[70%] justify-end gap-[2.5rem] items-center">
      <li class="nav-menu"><NuxtLink to="/home">Home</NuxtLink></li>
      <li class="nav-menu"><NuxtLink to="/posts">Posts</NuxtLink></li>
      <li class="nav-menu">
        <NuxtLink to="/success-story">Success Story</NuxtLink>
      </li>
      <li class="nav-menu"><NuxtLink to="/auth/signup">Signup</NuxtLink></li>
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

<script setup></script>
