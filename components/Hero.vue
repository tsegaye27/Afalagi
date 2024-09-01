<template>
  <div class="hero flex w-[100%] justify-between">
    <div class="left flex flex-col justify-start mt-[6rem] gap-[30px]">
      <h2
        class="text-[55px] pl-[6rem] w-[700px] font-bold text-[var(--secondary-color)]"
      >
        Bringing loved ones together
      </h2>
      <p class="text-[20px] w-[700px] pl-[6rem] text-[var(--primary-color)]">
        At volutpat diam ut venenatis tellus in. Est ullamcorper eget nulla
        facilisi etiam dignissim. Ut aliquam purus sit amet.At volutpat diam ut
        venenatis tellus in. Est ullamcorper eget nulla facilisi etiam
        dignissim. Ut aliquam purus sit amet.
      </p>
      <div class="flex justify-start ml-[6rem]">
        <ReportBtn class="w-[30%]" />
      </div>
    </div>
    <div class="right mt-[2rem]">
      <img
        class="w-[650px] h-[630px] home rounded-[400px_0_0_0]"
        src="/assets/img/home.webp"
        alt="family_picture"
      />
    </div>
  </div>
</template>

<script setup></script>
<style scoped>
.home {
  box-shadow: inset 0px 4px 10px 0px rgba(0, 0, 0, 0.3);
}
</style>
