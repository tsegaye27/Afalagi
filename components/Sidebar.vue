<script setup>
const logut=async()=>{
  try {
    const response = await $axios.post('/auth/logout');
    console.log('log out successful:', response.data);
    navigateTo('/')
    // Redirect to login page or dashboard after successful signup
  } catch (error) {
    console.error('logout failed:', error.response ? error.response.data : error.message);
   
  }

}

</script>
<template>
  <div
    class="w-[280px] h-[655px] flex flex-col mt-1 justify-center gap-[1rem] items-center shadow-md bg-[#fff]"
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
    <ul class="pt-[2rem] flex flex-col h-[50%] w-[100%]">
      <nuxt-link class="py-1 flex justify-center w-[100%]" to="/profile">
        <div
          class="text-[#868686] flex justify-start pl-[6.25rem] gap-[0.2rem] py-[0.3rem] border border-slate-300 w-[100%] text-center rounded-md cursor-pointer hover:text-[#788dd5]"
        >
          <span class="flex justify-center items-baseline"
            ><Icon name="humbleicons:user" size="20px"
          /></span>
          Profile
        </div>
      </nuxt-link>
      <nuxt-link class="py-1 w-[100%]" to="/profile/my-posts">
        <div
          class="text-[#868686] flex justify-start pl-[6.25rem] gap-[0.2rem] py-[0.3rem] border border-slate-300 w-[100%] text-center rounded-md cursor-pointer hover:text-[#788dd5]"
        >
          <span class="flex justify-center items-baseline"
            ><Icon name="humbleicons:documents" size="20px"
          /></span>
          My Posts
        </div>
      </nuxt-link>
      <nuxt-link class="py-1 w-[100%]" to="/profile/messages">
        <div
          class="text-[#868686] flex justify-start pl-[6.25rem] gap-[0.2rem] py-[0.3rem] border border-slate-300 w-[100%] text-center rounded-md cursor-pointer hover:text-[#788dd5]"
        >
          <span class="flex justify-center items-baseline"
            ><Icon name="humbleicons:chat" size="20px"
          /></span>
          Messages
        </div>
      </nuxt-link>
      <nuxt-link class="py-1 w-[100%]" to="/profile/settings">
        <div
          class="text-[#868686] flex justify-start pl-[6.25rem] gap-[0.2rem] py-[0.3rem] border border-slate-300 w-[100%] text-center rounded-md cursor-pointer hover:text-[#788dd5]"
        >
          <span class="flex justify-center items-baseline"
            ><Icon name="humbleicons:cog" size="20px"
          /></span>
          Settings
        </div>
      </nuxt-link>
    </ul>
    <button
      @click="logut"
      class="w-[100%] mb-[30px] flex justify-center gap-[0.35rem] text-red-600 border border-slate-300 rounded-md"
    >
      <span class="flex justify-center items-center"
        ><Icon size="22px" name="iconoir:log-out"
      /></span>
      Logout
    </button>
  </div>
</template>
