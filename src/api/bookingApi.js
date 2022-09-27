import axios from 'axios';

import { getEnvVariables } from './../helpers';

const { VITE_API_URL } = getEnvVariables();

export const bookingApi = axios.create({
  baseURL: VITE_API_URL,
});

// Interceptores - A TODAS las peticiones: q van al back o q regresan
// bookingApi.interceptors.request.use(config => {
//   config.headers = {
//     ...config.headers,
//     Authorization: `Bearer ${localStorage.getItem('token')}`,
//   };

//   return config;
// });
