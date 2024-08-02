<script setup>
import { useUserStore } from "#imports";

const store = useUserStore();
const firstName = ref("");
const profilePicture = ref(null);
const lastName = ref("");
const { $axios } = useNuxtApp();

onMounted(async () => {
  try {
    const response = await $axios.get("user/profile/me", {
      headers: {
        Authorization: `Bearer ${store.token}`,
      },
    });
    console.log("success", response.data.data);
    firstName.value = response.data.data.firstName;
    lastName.value = response.data.data.lastName;
  } catch (error) {
    console.log(
      "Failed❌",
      error.response ? error.response.data : error.message
    );
  }
});

// onMounted(async()=>{
//   try{
//     const response = await $axios.get("user/profile/pic",{
//       headers: {
//         Authorization: `Bearer ${store.token}`
//       }
//     })
//     console.log("success", response.data);
//     profilePicture.value = response.data.imagePath;

//   } catch(error) {
//     console.log(error.response ? error.response.data : error.message);
//   }
// })

const logoutHandler = async () => {
  try {
    const response = await $axios.post("/auth/logout");
    console.log("log out successful:", response.data);
    navigateTo("/");
  } catch (error) {
    console.error(
      "logout failed:",
      error.response ? error.response.data : error.message
    );
  }
};
</script>

<template>
  <div
    class="flex flex-col justify-center gap-[1rem] items-center border-r-2 border-[slate-100] bg-[var(--primary-color)]"
  >
    <div
      class="w-[200px] h-[200px] flex flex-col gap-[2rem] justify-center items-center"
    >
      <img
        class="w-[80px] h-[80px] rounded-[2.5rem] border-2 border-[#f4f4f4]"
        src="@/assets/img/missing.png"
        alt="profile-picture"
      />
      <p class="text-xl text-white font-semibold">
        {{ `${firstName} ${lastName}` }}
      </p>
    </div>
    <ul class="pt-[2rem] flex flex-col items-center h-[50%] w-[100%]">
      <nuxt-link class="py-1 flex justify-center w-[60%]" to="/profile/details">
        <div
          class="text-white flex justify-center gap-[0.2rem] py-[0.3rem] border border-white w-[100%] text-center rounded-md cursor-pointer hover:text-[var(--secondary-color)]"
        >
          <span class="flex justify-center items-baseline"
            ><Icon name="humbleicons:user" size="20px"
          /></span>
          Profile
        </div>
      </nuxt-link>
      <nuxt-link
        class="py-1 flex justify-center w-[60%]"
        to="/profile/my-posts"
      >
        <div
          class="text-white flex justify-center gap-[0.2rem] py-[0.3rem] border border-white w-[100%] text-center rounded-md cursor-pointer hover:text-[var(--secondary-color)]"
        >
          <span class="flex justify-center items-baseline"
            ><Icon name="humbleicons:documents" size="20px"
          /></span>
          My Posts
        </div>
      </nuxt-link>
      <nuxt-link class="py-1 w-[60%]" to="/profile/messages">
        <div
          class="text-white flex justify-center gap-[0.2rem] py-[0.3rem] border border-white w-[100%] text-center rounded-md cursor-pointer hover:text-[var(--secondary-color)]"
        >
          <span class="flex justify-center items-baseline"
            ><Icon name="humbleicons:chat" size="20px"
          /></span>
          Messages
        </div>
      </nuxt-link>
      <nuxt-link class="py-1 w-[60%]" to="/profile/settings">
        <div
          class="text-white flex justify-center gap-[0.2rem] py-[0.3rem] border border-white w-[100%] text-center rounded-md cursor-pointer hover:text-[var(--secondary-color)]"
        >
          <span class="flex justify-center items-baseline"
            ><Icon name="humbleicons:cog" size="20px"
          /></span>
          Settings
        </div>
      </nuxt-link>
    </ul>
    <button
      @click="logoutHandler"
      class="w-[60%] mb-[30px] flex justify-center py-1 gap-[0.35rem] text-white border border-white rounded-md"
    >
      <span class="flex justify-center items-center"
        ><Icon size="22px" name="iconoir:log-out"
      /></span>
      Logout
    </button>
  </div>
</template>

<style scoped>
.router-link-active {
  color: var(--secondary-color);
  border-bottom: 2px solid var(--secondary-color);
  transition: all 0.5s;
}
.router-link-exact-active {
  color: var(--secondary-color);
  border-bottom: 2px solid var(--secondary-color);
  transition: all 0.5s;
}
</style>
