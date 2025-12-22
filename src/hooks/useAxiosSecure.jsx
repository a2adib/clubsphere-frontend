import axios from "axios";
import { useContext, useEffect } from "react";
import { AuthContext } from "../Provider/AuthProvider";


const axiosSecure = axios.create({
  baseURL: 'https://blood-donation-backend-six.vercel.app/',
});

const useAxiosSecure = () => {

    const {user, logoutUser} = useContext(AuthContext);

    useEffect(() => {
        const reqInterceptor = axiosSecure.interceptors.request.use(async config => {
            const token = await user?.getIdToken();
            config.headers.Authorization = `Bearer ${token}`
            return config
        })
        const resInterceptor = axiosSecure.interceptors.response.use((res) =>  {
            return res;
        }, async (error) => {
            if (error.response && error.response.status === 401 || error.response.status === 403) {
                await logoutUser();
            }
            return Promise.reject(error);
        })
        
        return () => {
            axiosSecure.interceptors.request.eject(reqInterceptor);
            axiosSecure.interceptors.response.eject(resInterceptor);
        }

    }, [user, logoutUser]);

    return axiosSecure;
            
}

export default useAxiosSecure;