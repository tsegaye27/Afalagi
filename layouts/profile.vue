<template>
  <div>
    <NavBar class="shadow-md px-[2rem] h-[6rem]" />
    <div class="flex overflow-hidden gap-[2rem]">
      <Sidebar />
      <slot />
    </div>
  </div>
</template>
