<template>
  <div
    class="w-[280px] h-[660px] flex flex-col justify-between items-center shadow-md bg-[#f4f4f4]"
  >
    <ul class="pt-[15rem] flex flex-col h-[50%] gap-[0.2rem] w-[100%]">
      <li
        class="border border-slate-300 py-1 text-center rounded-md w-[100%] cursor-pointer hover:text-[#788dd5]"
      >
        <nuxt-link to="/profile"> Profile </nuxt-link>
      </li>
      <li
        class="border border-slate-300 py-1 text-center rounded-md w-[100%] cursor-pointer hover:text-[#788dd5]"
      >
        <nuxt-link to="/profile/posts"> My Posts </nuxt-link>
      </li>
      <li
        class="border border-slate-300 py-1 text-center rounded-md w-[100%] cursor-pointer hover:text-[#788dd5]"
      >
        <nuxt-link to="/profile/messages"> Messages </nuxt-link>
      </li>
      <li
        class="border border-slate-300 py-1 text-center rounded-md w-[100%] cursor-pointer hover:text-[#788dd5]"
      >
        <nuxt-link to="/profile/settings"> Settings </nuxt-link>
      </li>
    </ul>
    <button class="w-[100%] p-2 text-red-600">Logout</button>
  </div>
</template>
