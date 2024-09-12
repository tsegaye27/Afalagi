<template>
  <div class="testimonial flex flex-col w-[1580px] h-[500px] items-center">
    <h1
      class="text-[38px] font-[sora] font-semibold text-[var(--secondary-color)] align-center py-[3rem]"
    >
      Testimonials
    </h1>
    <div class="flex justify-center items-center w-[100%]]">
      <button
        class="btn-round-white flex justify-center items-center mr-[3rem]"
      >
        <Icon
          class="text-[var(--secondary-color)]"
          name="material-symbols:arrow-left-alt"
        />
      </button>
      <div>
        <div
          class="w-[700px] h-[340px] flex justify-start gap-[0.75rem] rounded-lg bg-[#f4f4f4]"
        >
          <img
            class="w-[250px] h-[340px]"
            src="/assets/img/testimonial.webp"
            alt="testimonial_picture"
          />
          <div class="flex flex-col justify-start gap-[2rem] px-2 py-5">
            <h2
              class="text-[40px] text-center font-[sora] font-semibold text-[var(--secondary-color)]"
            >
              Eden E.
            </h2>
            <p class="pl-3 text-[var(--primary-color)] font-[sora]">
              <i>
                "At volutpat diam ut venenatis tellus in. Est ullamcorper eget
                nissim. Ut aliquam purt diam ut venenatis tellus in. Est
                ullamcorper eget nulla facilisi etiam dignissim. Ut aliquam
                purus sit amet."
              </i>
            </p>
          </div>
        </div>
      </div>
      <button class="btn-round flex items-center justify-center ml-12">
        <span class="flex items-center"
          ><Icon size="22px" name="material-symbols:arrow-right-alt"
        /></span>
      </button>
    </div>
  </div>
</template>
