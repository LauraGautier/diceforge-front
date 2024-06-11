import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api',
});

export function addTokenJwtToAxiosInstance(token: string) {
  axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
}

export function removeTokenJwtFromAxiosInstance() {
  axiosInstance.defaults.headers.common.Authorization = '';
}

export default axiosInstance;
