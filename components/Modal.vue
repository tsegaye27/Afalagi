<template>
  <div
    v-if="show"
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
    @click="closeModal"
  >
    <div class="bg-white p-6 rounded-lg shadow-lg w-1/3" @click.stop>
      <button
        class="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        @click="closeModal"
      >
        X
      </button>
      <slot />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits(["close"]);

const closeModal = () => {
  emits("close");
};
</script>
