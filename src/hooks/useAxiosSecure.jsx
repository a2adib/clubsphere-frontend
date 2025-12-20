import axios from "axios";
import { useEffect } from "react";


const axiosSecure = axios.create({
  baseURL: 'http://localhost:3000',
});

const useAxiosSecure = () => {
  useEffect(() => {
    const reqInterceptor = axiosSecure.interceptors.request.use((config => {
      config.headers.Authorization = `Bearer ${localStorage.getItem('access-token')}`;
  }, []);
}