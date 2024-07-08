<template>
  <div
    class="w-[280px] h-[655px] flex flex-col mt-1 justify-between items-center shadow-md bg-[#f4f4f4]"
  >
    <div class="w-[80px] mt-[5rem] h-[80px] bg-slate-500 rounded-full" />
    <ul class="pt-[5rem] flex flex-col h-[50%] gap-[0.5rem] w-[100%]">
      <nuxt-link class="py-1 w-[100%]" to="/profile">
        <li
          class="border border-slate-300 w-[100%] text-center rounded-md cursor-pointer hover:text-[#788dd5]"
        >
          Profile
        </li>
      </nuxt-link>
      <nuxt-link class="py-1 w-[100%]" to="/profile/posts">
        <li
          class="border border-slate-300 w-[100%] text-center rounded-md cursor-pointer hover:text-[#788dd5]"
        >
          My Posts
        </li>
      </nuxt-link>
      <nuxt-link class="py-1 w-[100%]" to="/profile/messages">
        <li
          class="border border-slate-300 w-[100%] text-center rounded-md cursor-pointer hover:text-[#788dd5]"
        >
          Messages
        </li>
      </nuxt-link>
      <nuxt-link class="py-1 w-[100%]" to="/profile/settings">
        <li
          class="border border-slate-300 w-[100%] text-center rounded-md cursor-pointer hover:text-[#788dd5]"
        >
          Settings
        </li>
      </nuxt-link>
    </ul>
    <button class="w-[100%] mb-[30px] text-red-600">Logout</button>
  </div>
</template>
