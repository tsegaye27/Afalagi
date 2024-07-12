<template>
  <div
    class="w-[280px] h-[655px] flex flex-col my-1 justify-center gap-[1rem] items-center shadow-md bg-[#f4f4f4]"
  >
    <div
      class="w-[200px] h-[200px] flex flex-col gap-[2rem] justify-center items-center"
    >
      <img
        class="w-[80px] h-[80px] rounded-[2.5rem]"
        src="@/assets/img/missing.png"
        alt="profile-picture"
      />
      <p class="text-xl font-semibold">John Doe</p>
    </div>
    <ul class="pt-[2rem] flex flex-col h-[50%] gap-[0.5rem] w-[100%]">
      <nuxt-link class="py-1 w-[100%]" to="/profile">
        <li
          class="border border-slate-300 w-[100%] text-center rounded-md cursor-pointer hover:text-[#788dd5]"
        >
          Profile
        </li>
      </nuxt-link>
      <nuxt-link class="py-1 w-[100%]" to="/profile/my-posts">
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
    <button
      @click="navigateTo('/auth/login')"
      class="w-[100%] mb-[30px] text-red-600"
    >
      Logout
    </button>
  </div>
</template>
