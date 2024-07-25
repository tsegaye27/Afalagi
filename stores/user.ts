import { defineStore } from 'pinia';
import axios from 'axios';
import { ref } from 'vue';

export const useUserStore = defineStore('user', () => {
    const token = ref('');
    const refreshToken = ref('');

    const initializeTokens = () => {
        console.log('initializeTokens');
        
        if (typeof window !== 'undefined' && window.localStorage) {
            token.value = localStorage.getItem('token') || '';
            refreshToken.value = localStorage.getItem('refreshToken') || '';
        }
        console.log(token.value);
        console.log(refreshToken.value);
    };

    const setToken = (data = localStorage.getItem('token')) => {
        console.log('setToken');
        token.value = data || '';
        if (typeof window !== 'undefined' && window.localStorage) {
            if (data) {
                localStorage.setItem('token', data);
            } else {
                localStorage.setItem('token','');
            }
        }
    };

    const setRefreshToken = (data = '') => {
        console.log('setRefreshToken');
        refreshToken.value = data;
        if (typeof window !== 'undefined' && window.localStorage) {
            if (data) {
                localStorage.setItem('refreshToken', data);
            } else {
                localStorage.setItem('refreshToken','');
            }
        }
    };

    const fetchUser = async () => {
        console.log('fetchUser');
        // try {
        //     const response = await axios.get('/user', {
        //         headers: {
        //             Authorization: `Bearer ${token.value}`
        //         }
        //     });
        //     return response.data;
        // } catch (error:any) {
        //     if (error && error.response && error.response.status === 401) {
                await refreshAccessToken();
                // return fetchUser();
        //     }
        //     throw error;
        // }
    };

    const fetchRefreshToken = async () => {
        console.log('fetchRefreshToken');
        try {
            const response = await axios.post('http://localhost:3333/api/auth/refresh', {
                Headers:{
                    'Content-Type': 'application/json',
                    'authorization': 'Barier '+ refreshToken.value
                } 
            });
            setToken(response.data.access_token);
            setRefreshToken(response.data.refresh_token);
        } catch (error) {
            console.error('Failed to refresh token:', error);
            logout();
        }
    };

    const refreshAccessToken = async () => {
        await fetchRefreshToken();
    };

    const logout = () => {
        setToken();
        setRefreshToken();
    };

    // Initialize tokens
    if (typeof window !== 'undefined') {
        initializeTokens();
    }

    return {
        token,
        refreshToken,
        setToken,
        setRefreshToken,
        fetchUser,
        fetchRefreshToken,
        refreshAccessToken,
        initializeTokens,
        logout
    };
});
