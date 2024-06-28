<template>
  <div
    class="footer flex justify-start items-center w-[100%] h-[200px] bg-[#b8BDBDBD]"
  >
    <div
      class="logo text-[3rem] pl-[3rem] pt-[1.5rem] h-[100%] text-[#788DD5] font-[poppins] flex flex-col justify-start font-semibold"
    >
      Afalagi
    </div>
    <ul class="mx-[8rem] flex flex-col items-start">
      <li class="nav-menu"><NuxtLink to="/">Home</NuxtLink></li>
      <li class="nav-menu"><NuxtLink to="/posts">Posts</NuxtLink></li>
      <li class="nav-menu">
        <NuxtLink to="/success-story">Success Story</NuxtLink>
      </li>
    </ul>
    <ul class="mx-[13rem] flex flex-col items-start pt-[3rem]">
      <li class="text-[#868686] text-[18px]">info@afalagi.com</li>
      <li class="text-[#868686] text-[18px]">+251 912345678</li>
    </ul>
    <div class="mx-[5rem] pt-[4.5rem]">
      <div class="flex justify-between pb-2">
        <img class="w-[35px] h-[30px]" src="/assets/img/facebook.svg" />
        <img class="w-[35px] h-[30px]" src="/assets/img/youtube.svg" />
        <img class="w-[35px] h-[30px]" src="/assets/img/tiktok.png" />
      </div>
      <p class="text-[#868686]">Afalagi All Rights Reserved</p>
      <p class="text-[#868686]">&copy; Copyright 2024</p>
    </div>
  </div>
</template>
