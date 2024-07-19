<template>
  <div class="flex justify-center rounded-md items-center shadow-sm pl-2">
    <p class="mr-2 text-[#0097d3]">Filter:</p>
    <div class="flex items-center rounded-md bg-slate-100">
      <select class="p-2 bg-slate-100 outline-none" name="age" id="age">
        <option class="" disabled selected value="">Age</option>
        <option class="bg-slate-100" value="adult">Adult</option>
        <option class="bg-slate-100" value="child">Child</option>
        <option class="bg-slate-100" value="elderly">Elderly</option>
      </select>
      <select class="p-2 bg-slate-100 outline-none" name="age" id="age">
        <option class="" disabled selected value="">Time</option>
        <option class="bg-slate-100" value="week">this week</option>
        <option class="bg-slate-100" value="month">this month</option>
        <option class="bg-slate-100" value="year">this year</option>
        <option class="bg-slate-100" value="all">all</option>
      </select>
      <select class="p-2 bg-slate-100 outline-none" name="age" id="age">
        <option class="" disabled selected value="">Location</option>
        <option class="bg-slate-100" value="addis-ababa">Addis Ababa</option>
        <option class="bg-slate-100" value="dire-dawa">Dire Dawa</option>
        <option class="bg-slate-100" value="mekele">Mekele</option>
        <option class="bg-slate-100" value="adama">Adama</option>
        <option class="bg-slate-100" value="bahir-dar">Bahir Dar</option>
        <option class="bg-slate-100" value="gonder">Gonder</option>
        <option class="bg-slate-100" value="dessie">Dessie</option>
        <option class="bg-slate-100" value="jimma">Jimma</option>
        <option class="bg-slate-100" value="shashemene">Shashemene</option>
        <option class="bg-slate-100" value="bishoftu">Bishoftu</option>
        <option class="bg-slate-100" value="sodo">Sodo</option>
      </select>
      <select class="p-2 bg-slate-100 outline-none" name="age" id="age">
        <option class="" disabled selected value="">Gender</option>
        <option class="bg-slate-100" value="male">Male</option>
        <option class="bg-slate-100" value="female">Female</option>
      </select>
      <select class="p-2 bg-slate-100 outline-none" name="age" id="age">
        <option class="" disabled selected value="">Health</option>
        <option class="bg-slate-100" value="normal">Normal</option>
        <option class="bg-slate-100" value="other">Other</option>
      </select>
    </div>
  </div>
</template>

<script setup></script>
