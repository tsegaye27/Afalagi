export default defineNuxtPlugin(async(nuxtapp)=>{
    const userStore=useUserStore();
    if(!userStore.refreshToken){
        // await userStore.fetchUser();
    }
})