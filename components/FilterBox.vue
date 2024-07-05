<template>
  <div class="flex justify-center rounded-md items-center shadow-sm pl-2">
    <p class="mr-2 text-[#788dd5]">Filter:</p>
    <div class="flex items-center rounded-md bg-slate-100">
      <select class="p-2 bg-slate-100 outline-none" name="age" id="age">
        <option class="" disabled selected value="">Age</option>
        <option class="bg-slate-100" value="adult">Adult</option>
        <option class="bg-slate-100" value="child">Child</option>
        <option class="bg-slate-100" value="elderly">Elderly</option>
      </select>
      <select class="p-2 bg-slate-100 outline-none" name="age" id="age">
        <option class="" disabled selected value="">Time</option>
        <option class="bg-slate-100" value="adult">Adult</option>
        <option class="bg-slate-100" value="child">Child</option>
        <option class="bg-slate-100" value="elderly">Elderly</option>
      </select>
      <select class="p-2 bg-slate-100 outline-none" name="age" id="age">
        <option class="" disabled selected value="">Location</option>
        <option class="bg-slate-100" value="adult">Adult</option>
        <option class="bg-slate-100" value="child">Child</option>
        <option class="bg-slate-100" value="elderly">Elderly</option>
      </select>
    </div>
  </div>
</template>

<script setup></script>
