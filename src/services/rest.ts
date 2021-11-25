import axios from './axios';
import { AxiosResponse } from 'axios';

import { User } from '../atoms/user';

import * as endpoints from '../constants/endpoints';

export type StorageUserData = {
  userId: string;
  token: string;
};

export type Device = {
  id: string;
  code: string;
  image?: string;
  model: string;
  os: 'ANDROID' | 'IOS' | 'WINDOWS';
  osVersion?: string;
  vendor: string;
  borrowed?: {
    user: User;
    date: string;
  };
};

export const handleLogin = async (login: string, password: string) => {
  try {
    const res: AxiosResponse<User> = await axios.post(endpoints.LOGIN, {
      login,
      password,
    });
    const { data } = res;
    localStorage.setItem('@userData', JSON.stringify({ token: data.token, userId: data.id }));
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getUser = async () => {
  try {
    const storageData = localStorage.getItem('@userData');
    if (storageData) {
      const userData = JSON.parse(storageData) as StorageUserData;
      if (userData.userId && userData.token) {
        const res: AxiosResponse<User> = await axios.get(`${endpoints.USERS}/${userData.userId}`);
        const { data } = res;
        return data;
      }
    }
  } catch (error) {
    return Promise.reject(error);
  }
  return null;
};

export const handleLogout = () => {
  localStorage.removeItem('@userData');
};

export const getDevices = async () => {
  try {
    const res: AxiosResponse<[Device]> = await axios.get(endpoints.DEVICES);
    const { data } = res;
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const createDevice = async (
  code: string,
  os: string,
  vendor: string,
  model: string,
  osVersion: string,
  image?: string
) => {
  try {
    const res: AxiosResponse<Device> = await axios.post(endpoints.DEVICES, {
      code,
      os,
      vendor,
      model,
      osVersion,
      image,
    });
    const { data } = res;
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const bookDevice = async (userId: string, deviceId: string) => {
  try {
    const res: AxiosResponse<Device> = await axios.post(
      `${endpoints.DEVICES}/${deviceId}${endpoints.BOOK_DEVICE}`,
      {
        id: userId,
      }
    );
    const { data } = res;
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const returnDevice = async (userId: string, deviceId: string) => {
  try {
    const res: AxiosResponse<Device> = await axios.post(
      `${endpoints.DEVICES}/${deviceId}${endpoints.RETURN_DEVICE}`,
      {
        id: userId,
      }
    );
    const { data } = res;
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};
