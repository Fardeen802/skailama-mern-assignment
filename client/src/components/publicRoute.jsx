// components/PublicRoute.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ element }) => {
  const [authorized, setAuthorized] = useState(null);
  const SERVER_URL = "https://ques-ai-backend-ka8z.onrender.com";

  const axiosInstance = axios.create({
    baseURL: SERVER_URL,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  });

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        await axiosInstance.get('/api/verify-token');
        setAuthorized(true);
      } catch (error) {
        console.log('Auth verification failed:', error);
        setAuthorized(false);
      }
    };
    verifyAuth();
  }, []);

  if (authorized === null) return <div>Loading...</div>;
  if (authorized) return <Navigate to="/dashboard" replace />;

  return element;
};

export default PublicRoute;
