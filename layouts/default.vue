<template>
  <div>
    <NavBar class="shadow-md px-[2rem] h-[6rem] md:px-[1rem] md:h-[5rem]" />
    <div class="overflow-hidden">
      <slot />
      <Footer />
    </div>
  </div>
</template>
