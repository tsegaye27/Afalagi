<script setup>
const imageDataUrl = ref("");

const previewImage = (event) => {
  const input = event.target;
  if (input.files && input.files[0]) {
    const reader = new FileReader();

    reader.onload = (e) => {
      imageDataUrl.value = e.target.result;
    };

    reader.readAsDataURL(input.files[0]);
  }
};
</script>
<template>
  <div class="p-6 max-w-lg mx-auto bg-white rounded-xl shadow-md space-y-4">
    <form @submit.prevent="submitForm" class="space-y-4">
      <label for="imageUpload" class="block text-sm font-medium text-gray-700"
        >Add a Profile Picture:</label
      >
      <input
        type="file"
        id="imageUpload"
        @change="previewImage"
        accept="image/*"
        class="block w-full text-sm text-gray-900 border border-gray-300 rounded-sm cursor-pointer bg-gray-50 focus:outline-none"
      />

      <div v-if="imageDataUrl" class="mt-4">
        <img
          :src="imageDataUrl"
          alt="Image Preview"
          class="w-full h-auto rounded-lg"
        />
      </div>
      <button
        class="w-full px-4 py-2 text-white bg-[#0097d3] rounded-lg hover:bg-[#786de1] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        type="submit"
      >
        Save
      </button>
    </form>
  </div>
</template>
