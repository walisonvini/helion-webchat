import VueCookies from 'vue-cookies';
import axios from 'axios';

const apiBaseUrl = 'http://127.0.0.1:8080';

const axiosInstance = axios.create({
  baseURL: apiBaseUrl,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = VueCookies.get('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;