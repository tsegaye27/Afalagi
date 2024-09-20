<template>
  <div class="hero flex flex-col lg:flex-row w-full justify-between">
    <div
      class="left flex flex-col justify-start mt-[3rem] gap-[20px] lg:mt-[6rem] lg:gap-[30px]"
    >
      <h2
        class="text-[30px] lg:text-[50px] pl-[2rem] lg:pl-[6rem] lg:w-[700px] font-bold text-[var(--secondary-color)]"
      >
        Reuniting Loved Ones, One Story at a Time
      </h2>
      <p
        class="text-[16px] lg:text-[20px] lg:w-[700px] pl-[2rem] lg:pl-[6rem] text-[var(--primary-color)]"
      >
        Have you or someone you know been separated from a loved one? Don’t lose
        hope. Our platform is here to help families reconnect with their missing
        loved ones, bringing you one step closer to a reunion. With every post,
        you have the chance to make a difference, turning heartbreak into hope.
        Join the thousands who have found support, guidance, and the strength to
        keep searching. Because every family deserves to be whole again.
      </p>
      <div class="flex justify-start pl-[2rem] lg:pl-[6rem]">
        <ReportBtn class="w-[50%] lg:w-[30%]" />
      </div>
    </div>
    <div
      class="right mt-[2rem] lg:mt-[2rem] flex justify-center lg:justify-end"
    >
      <img
        class="w-[300px] h-[300px] lg:w-[650px] lg:h-[630px] home rounded-[400px_0_0_0]"
        src="/assets/img/home.webp"
        alt="family_picture"
      />
    </div>
  </div>
</template>
<style scoped>
/* Add your responsive styles here */
.home {
  box-shadow: inset 0px 4px 10px 0px rgba(0, 0, 0, 0.3);
}

@media (max-width: 1024px) {
  .hero {
    flex-direction: column;
  }

  .hero h2 {
    text-align: center;
    padding-left: 0;
  }

  .hero p {
    text-align: center;
    padding-left: 0;
  }

  .hero .right {
    margin-top: 2rem;
  }
}

@media (max-width: 768px) {
  .nav-menu {
    font-size: 14px;
  }

  .logo {
    width: 150px;
    height: 75px;
  }
}

@media (max-width: 640px) {
  .hero h2 {
    font-size: 28px;
  }

  .hero p {
    font-size: 16px;
  }

  .hero .right img {
    width: 250px;
    height: 250px;
  }
}
</style>
