<script setup></script>
<template>
  <div class="overflow-y-auto">
    <Hero />
    <hr class="text-lg" />
    <MissingReports />
    <hr class="text-lg" />
    <Visions />
    <hr class="text-lg" />
    <ClientOnly>
      <Partners />
    </ClientOnly>
    <hr class="border-[var(--secondary-color)]" />
    <Testimonials class="mb-[3rem]" />
    <FAQ />
    <Contact />
  </div>
</template>
