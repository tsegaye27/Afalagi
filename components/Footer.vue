<template>
  <div class="flex flex-col bg-[var(--primary-color)]">
    <div
      class="footer flex justify-start items-center w-[100%] h-[200px] bg-[var(--primary-color)]"
    >
      <div>
        <nuxt-link to="/">
          <img
            class="logo w-[200px] h-[130px] object-contain ml-[5rem]"
            src="@/assets/img/logo_white.webp"
            alt="reuniteus_logo"
          />
        </nuxt-link>
      </div>
      <ul class="mr-[6rem] flex flex-col items-start">
        <li class="footer-menu"><NuxtLink to="/">Home</NuxtLink></li>
        <li class="footer-menu"><NuxtLink to="/posts">Posts</NuxtLink></li>
        <li class="footer-menu">
          <NuxtLink to="/success-story">Success Story</NuxtLink>
        </li>
      </ul>
      <ul class="mx-[13rem] flex flex-col items-start pt-[3rem]">
        <li class="text-white text-[18px]">info@afalagi.com</li>
        <li class="text-white text-[18px]">+251 912345678</li>
      </ul>
      <div class="mx-[5rem] pt-[4.5rem]">
        <div class="flex justify-center gap-[3rem] pb-2">
          <span class="flex items-center">
            <Icon name="logos:facebook" size="26px" />
          </span>
          <span class="flex items-center">
            <Icon name="logos:youtube-icon" size="26px" />
          </span>
          <span class="flex items-center">
            <Icon name="logos:tiktok-icon" size="26px" />
          </span>
        </div>
      </div>
    </div>
    <div class="flex justify-center gap-[2rem] pb-2">
      <p class="text-white">Afalagi All Rights Reserved</p>
      <p class="text-white">&copy; Copyright 2024</p>
    </div>
  </div>
</template>
