<template>
  <div class="hero flex flex-col lg:flex-row w-full justify-between">
    <div
      class="left flex flex-col justify-start mt-[3rem] gap-[20px] lg:mt-[6rem] lg:gap-[30px]"
    >
      <h2
        class="text-[30px] lg:text-[55px] pl-[2rem] lg:pl-[6rem] lg:w-[700px] font-bold text-[var(--secondary-color)]"
      >
        Bringing loved ones together
      </h2>
      <p
        class="text-[16px] lg:text-[20px] lg:w-[700px] pl-[2rem] lg:pl-[6rem] text-[var(--primary-color)]"
      >
        At volutpat diam ut venenatis tellus in. Est ullamcorper eget nulla
        facilisi etiam dignissim. Ut aliquam purus sit amet.At volutpat diam ut
        venenatis tellus in. Est ullamcorper eget nulla facilisi etiam
        dignissim. Ut aliquam purus sit amet.
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
