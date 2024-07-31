import { defineStore } from "pinia";

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
  const email = ref();
  const token = ref();
  const refreshToken = ref();
  const setEmail = (data?: string) => (email.value = data);
  const setToken = (accessToken?: string) => (token.value = accessToken);
  const setRefreshToken = (refToken?: string) =>
    (refreshToken.value = refToken);

  const logout = () => {
    setToken();
    setRefreshToken();
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
