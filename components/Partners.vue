<template>
  <div
    class="our-partners-container h-[400px] flex flex-col items-center mt-8 gap-20"
  >
    <h2
      class="text-[38px] font-[sora] font-semibold text-[var(--secondary-color)] text-center py-8"
    >
      Our Partners
    </h2>
    <!-- Wrapper for the sliding effect -->
    <div class="slider">
      <div class="slide-track">
        <!-- Image tags for each partner -->
        <div class="slide">
          <img
            src="@/assets/img/afalagi_partner_police.png"
            title="Ethiopian Police"
            alt="Ethiopian Police"
            class="logo-image"
          />
        </div>
        <div class="slide">
          <img
            src="@/assets/img/afalagi_partner_crrsa.png"
            alt="CRRSA"
            title="CRRSA"
            class="logo-image"
          />
        </div>
        <div class="slide">
          <img
            src="@/assets/img/afalagi_partner_csa.png"
            alt="CSA"
            title="CSA"
            class="logo-image"
          />
        </div>
        <div class="slide">
          <img
            src="@/assets/img/afalagi_partner_red_cross.png"
            alt="Red Cross"
            class="logo-image"
            title="Red Cross"
          />
        </div>
        <div class="slide">
          <img
            src="@/assets/img/afalagi_partner_red_crescent.png"
            alt="Partner logo"
            title="Red Crescent"
            class="logo-image"
          />
        </div>
        <!-- Duplicate images for infinite scrolling effect -->
        <div class="slide">
          <img
            src="@/assets/img/afalagi_partner_police.png"
            alt="Ethiopian Police"
            class="logo-image"
          />
        </div>
        <div class="slide">
          <img
            src="@/assets/img/afalagi_partner_crrsa.png"
            alt="CRRSA"
            class="logo-image"
          />
        </div>
        <div class="slide">
          <img
            src="@/assets/img/afalagi_partner_csa.png"
            alt="CSA"
            class="logo-image"
          />
        </div>
        <div class="slide">
          <img
            src="@/assets/img/afalagi_partner_red_cross.png"
            alt="Red Cross"
            class="logo-image"
          />
        </div>
        <div class="slide">
          <img
            src="@/assets/img/afalagi_partner_red_crescent.png"
            alt="Red Crescent"
            class="logo-image"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Styling for the container and title */
.our-partners-container {
  text-align: center;
}

/* Styling for the slider */
.slider {
  overflow: hidden;
  width: 100%;
  position: relative;
}

/* Track that holds the slides */
.slide-track {
  display: flex;
  width: calc(200%); /* 100% for original slides + 100% for duplicated slides */
  animation: scroll 20s linear infinite; /* Adjust duration for speed */
}

/* Individual slide styling */
.slide {
  min-width: 10%; /* Adjust based on the number of logos to fit in the track */
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Image styling */
.logo-image {
  max-width: 250px; /* Increased size */
  max-height: 100px; /* Increased size */
  object-fit: contain;
  transition: all 0.5s;
}

/* Enlarge image on hover */
.logo-image:hover {
  transform: scale(1.2); /* Enlarge by 20% */
  z-index: 1; /* Ensure the enlarged image is on top */
}

/* Keyframes for sliding animation */
@keyframes scroll {
  100% {
    transform: translateX(-50%); /* Shift by 50% to slide the images */
  }
}
</style>
