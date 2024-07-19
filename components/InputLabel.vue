<script setup>
const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: "text",
  },
  placeholder: {
    type: String,
    default: "",
  },
  value: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <div class="flex justify-between items-baseline gap-2">
    <label class="text-[#005782] font-semibold">{{ label }}: </label>
    <input
      class="outline-none p-1 pl-2 rounded text-[#606060] border border-[#005782]"
      :type="type"
      :placeholder="placeholder"
      :value="value"
    />
  </div>
</template>
