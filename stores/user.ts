import {defineStore} from 'pinia'


export const useUserStore=defineStore('user',()=>{
    const user=ref();
    const token =ref();
    const refreshToken=ref();

    const setToken=(data?:string)=>(token.value=data)
    const setUser=(data?:any)=>(user.value=data)
    const setRefreshToken=(data?:string)=>(refreshToken.value=data)

    const fetchUser=async()=>{
        
    }
    const logout=()=>{
        setToken();
        setUser();
    }
// signIn
    return{ user,token,logout,setRefreshToken,fetchUser}
})