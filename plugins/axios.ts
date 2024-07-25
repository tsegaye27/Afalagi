import axios from 'axios';

export default defineNuxtPlugin((nuxtApp) => {
  if (process.client) {
    const token = localStorage.getItem('token');
    nuxtApp.provide('axios', axios.create({
      baseURL: 'http://localhost:3333/api',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    }));
  }
});
