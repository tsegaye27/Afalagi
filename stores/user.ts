import { defineStore } from "pinia";
import { ref } from "vue"; // Assuming you're using Vue 3 with Pinia
import { useCookie } from "#app"; // If using Nuxt.js

export const useUserStore = defineStore("user", () => {
  const email = ref();
  const token = ref();
  const refreshToken = ref();
  const isLoading = ref(false);

  const setEmail = (data?: string) => (email.value = data);
  const setToken = (accessToken?: string) => (token.value = accessToken);
  const setRefreshToken = (refToken?: string) =>
    (refreshToken.value = refToken);
  const setLoading = (loading: boolean) => (isLoading.value = loading);

  const logout = () => {
    setToken("");
    setRefreshToken("");
  };

  return {
    email,
    token,
    refreshToken,
    isLoading,
    setLoading,
    logout,
    setEmail,
    setToken,
    setRefreshToken,
  };
});
