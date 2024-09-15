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
        class="mb-4 border-b-[0.1rem] border-white"
      >
        <button
          class="w-full text-left py-4 px-6 text-lg font-medium text-white hover:text-[var(--secondary-color)] focus:outline-none"
          @click="toggleFaq(index)"
        >
          {{ faq.question }}
        </button>
        <div v-show="activeFaq === index" class="px-6 py-4 text-white">
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
    question: "How can I reset my password?",
    answer:
      "To reset your password, go to the login page and click on 'Forgot Password'. Follow the instructions to receive a reset link.",
  },
  {
    question: "Where can I view my order history?",
    answer:
      "You can view your order history in your account dashboard under 'Order History'.",
  },
  {
    question: "How do I contact customer support?",
    answer:
      "Customer support can be reached via email or phone. Visit our Contact Us page for more details.",
  },
  {
    question: "What is your return policy?",
    answer:
      "Our return policy allows returns within 30 days of purchase. Please visit our Returns page for more details.",
  },
]);

const toggleFaq = (index) => {
  activeFaq.value = activeFaq.value === index ? null : index;
};
</script>

<style scoped>
/* Add any necessary styles here */
</style>
