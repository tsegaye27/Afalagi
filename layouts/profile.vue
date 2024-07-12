<template>
  <div>
    <NavBar />
    <div class="flex overflow-hidden gap-[2rem]">
      <Sidebar />
      <slot />
    </div>
  </div>
</template>
