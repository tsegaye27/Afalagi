<template>
  <div class="our-partners-container">
    <h2
      class="text-[38px] font-[sora] font-semibold text-[var(--secondary-color)] align-center py-[2rem]"
    >
      Our Partners
    </h2>
    <div class="slider">
      <div class="slide-track">
        <div class="slide" v-for="(partner, index) in partners" :key="index">
          <img :src="partner" alt="Partner logo" />
        </div>
        <div
          class="slide"
          v-for="(partner, index) in partners"
          :key="`duplicate-${index}`"
        >
          <img :src="partner" alt="Partner logo" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const partners = [
  "https://via.placeholder.com/150x50.png?text=Partner+1",
  "https://via.placeholder.com/150x50.png?text=Partner+2",
  "https://via.placeholder.com/150x50.png?text=Partner+3",
  "https://via.placeholder.com/150x50.png?text=Partner+4",
  "https://via.placeholder.com/150x50.png?text=Partner+5",
  "https://via.placeholder.com/150x50.png?text=Partner+6",
];
</script>

<style scoped>
.our-partners-container {
  text-align: center;
  margin: 2rem auto;
}

.title {
  font-size: 2rem;
  color: var(--primary-color);
  margin-bottom: 1.5rem;
}

.slider {
  overflow: hidden;
  width: 80%;
  margin: 0 auto;
}

.slide-track {
  display: flex;
  width: calc(200%); /* 100% for original slides + 100% for duplicated slides */
  animation: scrollLeft 20s linear infinite;
}

.slide {
  min-width: 16.6666%; /* Ensure 6 slides fit in the container */
  display: flex;
  justify-content: center;
  align-items: center;
}

.slide img {
  max-width: 150px;
  max-height: 50px;
  object-fit: contain;
  filter: grayscale(100%);
  transition: filter 0.5s;
}

.slide img:hover {
  filter: grayscale(0%);
}

@keyframes scrollLeft {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
}
</style>
