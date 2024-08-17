import { defineStore } from "pinia";
import { ref } from "vue"; // Assuming you're using Vue 3 with Pinia
import { useCookie } from "#app"; // If using Nuxt.js

export const useUserStore = defineStore("user", () => {
  const user = ref({
    firstName: "",
    middleName: "",
    lastName: "",
    birthDate: "",
    state: "",
    city: "",
    country: "",
    gender: "",
  });

  // Initialize with empty strings
  const email = ref("");
  const token = ref("");

  // Ensure useCookie is available and correctly implemented
  const refreshToken = useCookie("afalagiRefreshToken", {
    maxAge: 60 * 60 * 24 * 7,
  });

  const setEmail = (data = "") => (email.value = data);
  const setToken = (accessToken = "") => (token.value = accessToken);

  // Handle refreshToken correctly as it's a reactive reference
  const setRefreshToken = (refToken = "") => {
    refreshToken.value = refToken;
  };

  const logout = () => {
    setToken("");
    setRefreshToken("");
  };

  return {
    user,
    email,
    token,
    refreshToken,
    logout,
    setEmail,
    setToken,
    setRefreshToken,
  };
});
