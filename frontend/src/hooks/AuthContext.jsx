import React, { createContext, useState, useEffect, useContext } from 'react';
import axiosInstance from '../config/axiosconfig';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authCheck, setAuthCheck] = useState(true);

  const logout=async ()=>{
    try{
      const response=await axiosInstance.post('/auth/logout');
      setIsLoggedIn(false);
    }
    catch(error){
      comsole.log("try again");
    }
  }

  const login=()=>{
    setIsLoggedIn(true);
  }
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {       
        const response = await axiosInstance.get('/auth/check');
        setIsLoggedIn(response.data.isLoggedIn);
      } catch (error) {
        console.error('Error checking auth status', error);
        setIsLoggedIn(false);
      } finally {
        setAuthCheck(false);
      }
    };
    checkAuthStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, logout , login ,authCheck}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
