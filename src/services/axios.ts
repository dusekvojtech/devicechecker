import axios, { AxiosError, AxiosRequestConfig } from 'axios';

import * as endpoints from '../constants/endpoints';
import { StorageUserData } from './rest';

declare module 'axios' {
  export interface AxiosRequestConfig {
    retry?: boolean;
  }
}

const api = axios.create({
  headers: { 'Content-Type': 'application/json', accept: 'application/json' },
});

api.interceptors.request.use(async (config: AxiosRequestConfig) => {
  const storageData = localStorage.getItem('@userData');
  if (storageData) {
    const userData = JSON.parse(storageData) as StorageUserData;
    if (config.url !== endpoints.LOGIN && userData.token) {
      config.headers = {
        'Auth-Token': userData.token,
      };
    }
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    //handle refresh token for OAuth 2.0
    return Promise.reject(error.response?.data.error);
  }
);

export default api;
