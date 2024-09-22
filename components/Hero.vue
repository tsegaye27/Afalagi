<template>
  <div class="hero flex flex-col lg:flex-row w-full justify-center gap-40">
    <div class="left flex flex-col justify-start mt-24 gap-4 lg:mt-16 lg:gap-6">
      <h2
        class="text-2xl lg:text-4xl font-bold text-[var(--secondary-color)] px-8 lg:px-24 lg:max-w-2xl"
      >
        Reuniting Loved Ones, One Story at a Time
      </h2>
      <p
        class="text-sm lg:text-lg text-primary-color px-8 lg:px-24 lg:max-w-3xl"
      >
        Have you or someone you know been separated from a loved one? Don’t lose
        hope. Our platform is here to help families reconnect with their missing
        loved ones, bringing you one step closer to a reunion. With every post,
        you have the chance to make a difference, turning heartbreak into hope.
        Join the thousands who have found support, guidance, and the strength to
        keep searching. Because every family deserves to be whole again.
      </p>
      <div class="flex justify-start px-8 lg:px-24">
        <ReportBtn class="w-1/2" />
      </div>
    </div>
    <div class="right mt-8 lg:mt-8 flex justify-center lg:justify-end">
      <img
        class="hidden lg:block w-[300px] h-[300px] lg:w-[650px] lg:h-[630px] rounded-tl-[400px] shadow-inner"
        src="/assets/img/home.webp"
        alt="family_picture"
      />
    </div>
  </div>
</template>

<style scoped>
/* No scoped styles needed as Tailwind will handle responsiveness */
</style>
