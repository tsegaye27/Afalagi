<script setup></script>
<template>
  <div class="overflow-y-auto">
    <Hero />
    <hr class="border-[var(--secondary-color)]" />
    <MissingReports />
    <hr class="border-[var(--secondary-color)]" />
    <Visions />
    <hr class="border-[var(--secondary-color)]" />
    <ClientOnly>
      <Partners />
    </ClientOnly>
    <hr class="border-[var(--secondary-color)]" />
    <Testimonials class="mb-[3rem]" />
    <hr class="border-[var(--secondary-color)]" />
    <FAQ />
    <hr class="border-[var(--secondary-color)]" />
    <Contact />
  </div>
</template>
