import axios from 'axios';
import type { RouteRecordNormalized } from 'vue-router';
import { UserState } from '@/store/modules/user/types';

export interface LoginData {
  username: string;
  password: string;
  grandType: string;
}

export interface LoginRes {
  accessToken: string;
}
export function login(data: LoginData) {
  return axios.post<LoginRes>('/oauth2/v1/oauth2/login', data);
}

export function logout() {
  return axios.post<LoginRes>('/oauth2/v1/oauth2/logout');
}

export function getUserInfo() {
  return axios.get<UserState>('/oauth2/v1/user/info');
}

export function getMenuList() {
  return axios.post<RouteRecordNormalized[]>('/oauth2/api/user/menu');
}
