<template>
  <section
    class="flex justify-center items-center bg-[var(--background-color)] w-full h-full py-10"
  >
    <div class="w-full max-w-[800px]">
      <h2
        class="text-3xl font-semibold text-center mb-8 text-[var(--secondary-color)]"
      >
        Frequently Asked Questions
      </h2>
      <div
        v-for="(faq, index) in faqs"
        :key="index"
        class="mb-4 border-b-[0.1rem] border-[var(--text-color)]"
      >
        <button
          class="w-full text-left py-4 px-6 text-lg font-medium text-[var(--text-color)] hover:text-[var(--secondary-color)] focus:outline-none"
          @click="toggleFaq(index)"
        >
          {{ faq.question }}
        </button>
        <div
          v-show="activeFaq === index"
          class="px-6 py-4 text-[var(--text-color)]"
        >
          {{ faq.answer }}
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";

const activeFaq = ref(null);

const faqs = ref([
  {
    question:
      "How does Afalagi help reconnect missing individuals with their families?",
    answer:
      "Afalagi allows families to create detailed posts about their missing loved ones, including photos, descriptions, and last known locations. These posts are shared publicly, increasing the chances of someone recognizing and reporting a sighting. The platform also provides a way to track progress, share success stories, and connect with authorities or volunteers.",
  },
  {
    question: "Is there a cost to use Afalagi's services?",
    answer:
      "No, Afalagi is completely free to use. Our mission is to help families reunite with their missing loved ones without any financial barriers. The platform is supported through partnerships, donations, and volunteers who share our vision of bringing families back together.",
  },
  {
    question: "What should I do if I find a missing person listed on Afalagi?",
    answer:
      "If you believe you've found someone listed as missing, you can contact the family directly through the platform or notify local authorities. Afalagi also provides a safe space for verified users to communicate and share important information discreetly.",
  },
  {
    question: "How secure is the information I share on Afalagi?",
    answer:
      "Afalagi takes privacy and security seriously. User information and posts are protected with strict data security measures, and sensitive details like contact information are only shared with authorized individuals or authorities when necessary. We ensure that all data is handled responsibly to keep both families and the individuals they're searching for safe",
  },
]);

const toggleFaq = (index) => {
  activeFaq.value = activeFaq.value === index ? null : index;
};
</script>

<style scoped>
/* Add any necessary styles here */
</style>
