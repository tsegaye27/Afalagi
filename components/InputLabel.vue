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
  <div class="flex justify-between items-baseline gap-[0.7rem]">
    <label class="text-[var(--primary-color)] font-semibold"
      >{{ label }}:
    </label>
    <input
      class="outline-none p-1 w-[300px] pl-2 rounded text-[var(--primary-color)] border border-[var(--primary-color)]"
      :type="type"
      :placeholder="placeholder"
      v-bind="value"
    />
  </div>
</template>
