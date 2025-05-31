import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

const SERVER_URL = "https://ques-ai-backend-ka8z.onrender.com";

const axiosInstance = axios.create({
  baseURL: SERVER_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

const ProtectedRoute = ({ element }) => {
  const [authorized, setAuthorized] = useState(null);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        console.log('Checking auth status...');
        console.log('Current cookies:', document.cookie);
        
        const response = await axiosInstance.get('/api/verify-token');
        console.log('Auth verification response:', response.data);
        console.log('Cookies after verification:', document.cookie);
        
        setAuthorized(true);
      } catch (error) {
        console.error('Auth verification failed:', {
          status: error.response?.status,
          data: error.response?.data,
          cookies: document.cookie
        });
        setAuthorized(false);
      }
    };
    verifyAuth();
  }, []);

  if (authorized === null) return <div>Loading...</div>;
  if (!authorized) return <Navigate to="/login" replace />;

  return element;
};

export default ProtectedRoute;
