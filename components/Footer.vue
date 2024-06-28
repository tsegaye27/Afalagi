<template>
  <div
    class="footer flex justify-start items-center w-[100%] h-[250px] bg-[#f6f6f6]"
  >
    <div
      class="logo text-[3rem] pl-[3rem] text-[#788DD5] font-[poppins] flex items-center font-semibold"
    >
      Afalagi
    </div>
    <ul class="flex flex-col w-[70%] justify-end items-center">
      <li class="nav-menu"><NuxtLink to="/">Home</NuxtLink></li>
      <li class="nav-menu"><NuxtLink to="/posts">Posts</NuxtLink></li>
      <li class="nav-menu">
        <NuxtLink to="/success-story">Success Story</NuxtLink>
      </li>
      <li class="nav-menu">
        <NuxtLink to="/auth/signup">Signup</NuxtLink>
      </li>
    </ul>
  </div>
</template>
