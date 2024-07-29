import { defineStore } from "pinia";

export const useUserStore = defineStore("user", () => {
  const email = ref();
  const token = ref();
  const refreshToken = ref();
  const setEmail = (data?: string) => (email.value = data);
  const setToken = (accessToken?: string) => (token.value = accessToken);
  const setRefreshToken = (refToken?: string) =>
    (refreshToken.value = refToken);

  const fetchUser = async () => {};
  const logout = () => {
    setToken();
    setRefreshToken();
  };
  // signIn
  return {
    email,
    token,
    refreshToken,
    logout,
    setEmail,
    setToken,
    setRefreshToken,
  };
});
