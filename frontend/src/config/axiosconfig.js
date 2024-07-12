// axiosInstance.js
import axios from 'axios';
import { useAuth } from '../hooks/AuthContext';
import { useNavigate } from 'react-router-dom';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000', // Adjust the base URL as necessary
  withCredentials: true, // Important to include cookies
});

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === 404) {
      // Handle token expiration
      const originalRequest = error.config;
      if (error.response.data.message === 'Refresh token expired') {
        // Call logout from AuthContext
        const { logout } = useAuth();
        logout();
        console.log("here1");
        return Promise.reject(error);
      }
    }
    console.log(error.response.data);
    return Promise.reject(error);
  }
);

export default axiosInstance;
