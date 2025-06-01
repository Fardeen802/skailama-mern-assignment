import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';

const SERVER_URL = "https://ques-ai-backend-ka8z.onrender.com";

const axiosInstance = axios.create({
  baseURL: SERVER_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        console.log('🔍 Checking authentication state...');
        const token = localStorage.getItem('accessToken');
        console.log('🔑 Token present:', !!token);
        
        if (!token) {
          console.log('❌ No token found, redirecting to login');
          navigate('/login');
          return;
        }

        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/verify-token`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        console.log('✅ Token verification response:', response.status);
        setIsAuth(true);
      } catch (error) {
        console.error('❌ Authentication error:', error.response?.status);
        localStorage.removeItem('accessToken');
        navigate('/login');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return isAuth ? children : null;
};

export default ProtectedRoute;
