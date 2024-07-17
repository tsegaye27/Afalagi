<template>
  <div
    class="w-[280px] h-[655px] flex flex-col my-1 justify-center gap-[1rem] items-center shadow-md bg-[#fff]"
  >
    <div
      class="w-[200px] h-[200px] flex flex-col gap-[2rem] justify-center items-center"
    >
      <img
        class="w-[80px] h-[80px] rounded-[2.5rem] border-2 border-[#f4f4f4]"
        src="@/assets/img/missing.png"
        alt="profile-picture"
      />
      <p class="text-xl text-[#868686] font-semibold">John Doe</p>
    </div>
    <ul class="pt-[2rem] flex flex-col h-[50%] gap-[0.5rem] w-[100%]">
      <nuxt-link class="py-1 w-[100%]" to="/profile">
        <li
          class="text-[#868686] p-1 border border-slate-300 w-[100%] text-center rounded-md cursor-pointer hover:text-[#788dd5]"
        >
          Profile
        </li>
      </nuxt-link>
      <nuxt-link class="py-1 w-[100%]" to="/profile/my-posts">
        <li
          class="text-[#868686] border border-slate-300 w-[100%] text-center rounded-md cursor-pointer hover:text-[#788dd5]"
        >
          My Posts
        </li>
      </nuxt-link>
      <nuxt-link class="py-1 w-[100%]" to="/profile/messages">
        <li
          class="text-[#868686] border border-slate-300 w-[100%] text-center rounded-md cursor-pointer hover:text-[#788dd5]"
        >
          Messages
        </li>
      </nuxt-link>
      <nuxt-link class="py-1 w-[100%]" to="/profile/settings">
        <li
          class="text-[#868686] border border-slate-300 w-[100%] text-center rounded-md cursor-pointer hover:text-[#788dd5]"
        >
          Settings
        </li>
      </nuxt-link>
    </ul>
    <button
      @click="navigateTo('/auth/login')"
      class="w-[100%] mb-[30px] text-red-600 border border-slate-300 rounded-md"
    >
      Logout
    </button>
  </div>
</template>
