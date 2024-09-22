<template>
  <div
    class="footer bg-black w-full h-[200px] flex flex-col lg:flex-row justify-between items-center p-8 lg:p-16"
  >
    <!-- Logo Section -->
    <div class="mb-4 lg:mb-0">
      <nuxt-link to="/">
        <img
          class="logo w-[150px] h-[100px] lg:w-[200px] lg:h-[130px] object-contain"
          src="@/assets/img/logo_white.webp"
          alt="reuniteus_logo"
        />
      </nuxt-link>
    </div>

    <!-- Menu Links -->
    <ul class="flex flex-col items-start mb-4 lg:mb-0 lg:mr-16">
      <li class="footer-menu text-white text-sm lg:text-base">
        <NuxtLink to="/">Home</NuxtLink>
      </li>
      <li class="footer-menu text-white text-sm lg:text-base">
        <NuxtLink to="/posts">Posts</NuxtLink>
      </li>
      <li class="footer-menu text-white text-sm lg:text-base">
        <NuxtLink to="/success-story">Success Story</NuxtLink>
      </li>
    </ul>

    <!-- Contact Info -->
    <ul class="flex flex-col items-start mb-4 lg:mb-0 lg:mx-16">
      <li class="text-white text-sm lg:text-lg">info@afalagi.com</li>
      <li class="text-white text-sm lg:text-lg">+251 912345678</li>
    </ul>

    <!-- Social Media & Copyright -->
    <div class="flex flex-col items-center lg:items-start lg:mx-16">
      <div class="flex justify-center gap-4 pb-2">
        <span class="text-white flex items-center">
          <Icon name="logos:facebook" size="26px" />
        </span>
        <span class="text-white flex items-center">
          <Icon name="logos:youtube-icon" size="26px" />
        </span>
        <span class="text-white flex items-center">
          <Icon name="logos:tiktok-icon" size="26px" />
        </span>
      </div>
      <p class="text-white text-xs lg:text-sm">Afalagi All Rights Reserved</p>
      <p class="text-white text-xs lg:text-sm">&copy; Copyright 2024</p>
    </div>
  </div>
</template>
