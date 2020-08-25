import axios from 'axios';
import store from '../store';
import { getAccessToken } from '../utils/auth';

const service = axios.create({
  baseURL: process.env.VUE_APP_APIURI,
  timeout: 5000
});

// request interceptor
service.interceptors.request.use(
  config => {
    if (store.getters["user/getAccessToken"]) {
      config.headers.common['Authorization'] = `Bearer ${getAccessToken()}`;
    }
    return config;
  },
  error => {
    console.log(`request.error=${JSON.stringify(error)}`);
    return Promise.reject(error);
  }
)

export default service;