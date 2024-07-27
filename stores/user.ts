import { defineStore } from "pinia";

export const useUserStore = defineStore("user", () => {
  const user = ref();
  const token = ref();
  const refreshToken = ref();

  const setToken = (accessToken?: string) => (token.value = accessToken);
  const setUser = (data?: any) => (user.value = data);
  const setRefreshToken = (refToken?: string) =>
    (refreshToken.value = refToken);

  const fetchUser = async () => {};
  const logout = () => {
    setToken();
    setUser();
  };
  // signIn
  return {
    user,
    token,
    refreshToken,
    logout,
    setToken,
    setRefreshToken,
    setUser,
  };
});
