<script setup>
const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    default: "  ",
  },
  value: {
    type: String,
    default: "",
    unique: true,
  },
  options: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <div class="flex justify-start items-baseline gap-[3rem]">
    <label class="text-[#005782] font-medium">{{ label }}: </label>
    <select
      class="outline-none p-1 rounded bg-whitesmoke text-[#005782] border border-[#005782]"
    >
      <option disabled selected value="">{{ placeholder }}</option>
      <option
        v-for="(option, index) in options"
        :key="index"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
  </div>
</template>
