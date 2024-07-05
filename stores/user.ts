import { Body } from '#build/components';
import axios from 'axios';
import {defineStore} from 'pinia'


export const useUserStore=defineStore('user',()=>{
    const user=ref();
    const token =useCookie('afalagis_cookie',{
        maxAge:60*60*24*7
    })

    const setToken=(data?:string)=>(token.value=data)
    const setUser=(data?:any)=>(user.value=data)


    const signIn=async(data:any)=>{
        try{
            const res=await axios.post('https://dummyjson.com/auth/login', {
                Headers: {
                  'Content-Type': 'application/json'  
                },
                Body:data
              });

              setToken(res.data.token);
              await fetchUser();
        }
        catch(error){
            setToken();
            setUser();
            console.error(error); 
        }
    }
    const fetchUser=async()=>{
        if(token.value){
            try{
                const res=await axios.post('https://dummyjson.com/users/1');
                setUser(res.data)
            }catch(error){
                setToken();
                setUser();
                console.error(error); 

            }
        }
    }
    const logout=()=>{
        setToken();
        setUser();
    }

    return{ user,token,logout,signIn,fetchUser}
})