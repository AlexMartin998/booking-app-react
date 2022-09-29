import axios from 'axios';

import { getEnvVariables } from './../helpers';

const { VITE_API_URL } = getEnvVariables();

export const bookingApi = axios.create({
  baseURL: VITE_API_URL,
});
