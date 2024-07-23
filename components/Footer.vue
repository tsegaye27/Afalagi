<template>
  <div
    class="footer flex justify-start items-center w-[100%] h-[200px] bg-[#b8BDBDBD]"
  >
    <div>
      <nuxt-link to="/">
        <img
          class="logo w-[200px] h-[130px] object-contain ml-[5rem]"
          src="@/assets/img/logo.png"
          alt="reuniteus_logo"
        />
      </nuxt-link>
    </div>
    <ul class="mr-[6rem] flex flex-col items-start">
      <li class="nav-menu"><NuxtLink to="/">Home</NuxtLink></li>
      <li class="nav-menu"><NuxtLink to="/posts">Posts</NuxtLink></li>
      <li class="nav-menu">
        <NuxtLink to="/success-story">Success Story</NuxtLink>
      </li>
    </ul>
    <ul class="mx-[13rem] flex flex-col items-start pt-[3rem]">
      <li class="text-[var(--primary-color)] text-[18px]">info@afalagi.com</li>
      <li class="text-[var(--primary-color)] text-[18px]">+251 912345678</li>
    </ul>
    <div class="mx-[5rem] pt-[4.5rem]">
      <div class="flex justify-between pb-2">
        <img class="w-[35px] h-[30px]" src="/assets/img/facebook.svg" />
        <img class="w-[35px] h-[30px]" src="/assets/img/youtube.svg" />
        <img class="w-[35px] h-[30px]" src="/assets/img/tiktok.png" />
      </div>
      <p class="text-[var(--primary-color)]">Afalagi All Rights Reserved</p>
      <p class="text-[var(--primary-color)]">&copy; Copyright 2024</p>
    </div>
  </div>
</template>
