<template>
  <NavBar class="shadow-md px-[2rem] h-[6rem]" />
  <Hero />
  <div
    class="visions flex flex-col w-[100%] bg-[#f6f6f6] h-[500px] justify-start items-center"
  >
    <h1
      class="text-[38px] font-[poppins] font-semibold text-[#788dd5] align-center py-[3rem]"
    >
      Our Vision
    </h1>
    <p class="text-[20px] w-[60%] text-[#9E9E9E]">
      In nulla posuere sollicitudin aliquam ultrices In nulla posuere
      sollicitudin aliquam ultrices.In nulla posuere sollicitudin aliquam
      ultrices In nulla posuere sollicitudin aliquam ultrices.In nulla posuere
      sollicitudin aliquam ultrices In nulla posuere sollicitudin aliquam
      ultrices.In nulla posuere sollicitudin aliquam ultrices In nulla posuere
      sollicitudin aliquam ultrices.In nulla posuere sollicitudin aliquam
      ultrices In nulla posuere sollicitudin aliquam ultrices.In nulla posuere
      sollicitudin aliquam ultriosuere soiquam ultrices.
    </p>
  </div>
  <div class="testimonial flex flex-col w-[1580px] h-[500px] items-center">
    <h1
      class="text-[38px] font-[poppins] font-semibold text-[#788dd5] align-center py-[3rem]"
    >
      Testimonials
    </h1>
    <div class="flex justify-center items-center w-[100%]]">
      <button class="btn-round-white mr-[3rem]"><</button>
      <div>
        <div
          class="w-[650px] h-[340px] flex justify-between rounded-lg bg-slate-200"
        >
          <img
            class="w-[250px] h-[340px]"
            src="/assets/img/testimonial.png"
            alt="testimonial_picture"
          />
          <div class="flex flex-col justify-center">
            <h2
              class="text-[40px] pl-5 font-[poppins] font-semibold text-[#788dd5]"
            >
              Eden E.
            </h2>
            <p class="pl-3 text-[#868686] font-[poppins]">
              "At volutpat diam ut venenatis tellus in. Est ullamcorper eget
              nulla facilisi etiam dignissim. Ut aliquam purus sit amet."
            </p>
          </div>
        </div>
      </div>
      <button class="btn-round ml-[3rem]">></button>
    </div>
  </div>
  <div
    class="contact-us w-[100%] h-[400px] bg-white shadow-lg flex flex-col justify-center items-center"
  >
    <h1
      class="text-[38px] font-[poppins] font-semibold text-[#788dd5] align-center py-[3rem]"
    >
      Get in touch
    </h1>
    <div class=""></div>
  </div>
  <footer>
    <div
      class="footer flex justify-start items-center w-[100%] h-[250px] bg-[#f6f6f6]"
    >
      <div
        class="logo text-[3rem] pl-[3rem] text-[#788DD5] font-[poppins] flex items-center font-semibold"
      >
        Afalagi
      </div>
      <ul class="flex flex-col w-[70%] justify-end items-center">
        <li class="nav-menu"><NuxtLink to="/home">Home</NuxtLink></li>
        <li class="nav-menu"><NuxtLink to="/posts">Posts</NuxtLink></li>
        <li class="nav-menu">
          <NuxtLink to="/success-story">Success Story</NuxtLink>
        </li>
        <li class="nav-menu">
          <NuxtLink to="/auth/signup">Signup</NuxtLink>
        </li>
      </ul>
    </div>
  </footer>
</template>

<style></style>

<script setup></script>
