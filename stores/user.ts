import { Body } from '#build/components';
import axios from 'axios';
import {defineStore} from 'pinia'


export const useUserStore=defineStore('user',()=>{
    const user=ref();
    const token =useCookie('afalagis_cookie',{
        maxAge:60*9
    })
    const refreshToken=useCookie('afalagis_refresh_cookie',{
        maxAge:60*60*24*7
    })

    const setToken=(data?:string)=>(token.value=data)
    const setUser=(data?:any)=>(user.value=data)
    const setRefreshToken=(data?:string)=>(refreshToken.value=data)


    // const signIn=async(data:any)=>{
    //     try{
    //         const res=await axios.post('https://dummyjson.com/auth/login', {
    //             Headers: {
    //               'Content-Type': 'application/json'  
    //             },
    //             Body:data
    //           });

    //           setToken(res.data.token);
    //           await fetchUser();
    //     }
    //     catch(error){
    //         setToken();
    //         setUser();
    //         console.error(error); 
    //     }
    // }
    const fetchUser=async()=>{
        
    }
    const logout=()=>{
        setToken();
        setUser();
    }
// signIn
    return{ user,token,logout,setRefreshToken,fetchUser}
})