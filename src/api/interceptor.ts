import axios from 'axios';
import router from '@/router';

import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Message } from '@arco-design/web-vue';
import { useUserStore } from '@/store';
import { getToken } from '@/utils/auth';

export interface HttpResponse<T = unknown> {
  status: number;
  message: string;
  code: number;
  data: T;
}

if (import.meta.env.VITE_API_BASE_URL) {
  axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
}

axios.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // let each request carry token
    // this example using the JWT token
    // Authorization is a custom headers key
    // please modify it according to the actual situation
    const token = getToken();
    if (token) {
      if (!config.headers) {
        config.headers = {};
      }
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // do something
    return Promise.reject(error);
  }
);
// add response interceptors
axios.interceptors.response.use(
  (response: AxiosResponse<HttpResponse>) => {
    const res = response.data;
    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== 200) {
      Message.error({
        content: res.message || 'Error',
        duration: 5 * 1000,
      });
      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (
        [401].includes(res.code) &&
        response.config.url !== '/v1/oauth2/login' &&
        response.config.url !== '/v1/oauth2/refreshToken'
      ) {
        // 清除本地token
        const userStore = useUserStore();
        userStore.logoutCallBack();
        // 跳转loginPage
        router.push('/login');
        // Modal.error({
        //   title: 'Confirm logout',
        //   content:
        //     'You have been logged out, you can cancel to stay on this page, or log in again',
        //   okText: 'Re-Login',
        //   async onOk() {
        //     const userStore = useUserStore();

        //     await userStore.logout();
        //     window.location.reload();
        //   },
        // });
      }
      return Promise.reject(new Error(res.message || '出现错误,请联系管理员'));
    }
    return res;
  },
  (error) => {
    Message.error({
      content: error.message || '请求出错啦',
      duration: 5 * 1000,
    });
    return Promise.reject(error);
  }
);
