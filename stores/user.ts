import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore("user", () => {
  const email = ref();
  const token = ref();
  const refreshToken = ref();
  const isLoading = ref(false);
  const isProfileUpdated = ref(false);

  const setEmail = (data?: string) => (email.value = data);
  const setToken = (accessToken?: string) => (token.value = accessToken);
  const setRefreshToken = (refToken?: string) =>
    (refreshToken.value = refToken);
  const setLoading = (loading: boolean) => (isLoading.value = loading);
  const setProfileUpdated = (profileUpdated: boolean) =>
    (isProfileUpdated.value = profileUpdated);
  const logout = () => {
    setToken("");
    setRefreshToken("");
  };

  return {
    email,
    isProfileUpdated,
    token,
    refreshToken,
    isLoading,
    setLoading,
    logout,
    setEmail,
    setProfileUpdated,
    setToken,
    setRefreshToken,
  };
});
