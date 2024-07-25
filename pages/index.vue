<script setup>
import { useUserStore } from "~/stores/user";

const store=useUserStore();

console.log(store ,store.refreshToken)
</script>
<template>
  <div class="overflow-y-auto">
    <Hero />
    <hr class="mb-[3rem]" />
    <MissingReports />
    <hr class="mt-[3rem]" />
    <Visions />
    <Testimonials class="mb-[3rem]" />
    <hr />
    <Contact />
  </div>
</template>
