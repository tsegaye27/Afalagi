export default defineNuxtPlugin(async (nuxtapp) => {
  const userStore = useUserStore();
  //     if(!userStore.user){
  //         await userStore.fetchUser();
  //     }
  if (userStore.refreshToken) {
    userStore.setRefreshToken(userStore.email);
  }
});
