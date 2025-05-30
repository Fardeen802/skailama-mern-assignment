// components/PublicRoute.tsx
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const SERVER_URL = "https://ques-ai-backend-ka8z.onrender.com";

const axiosInstance = axios.create({
  baseURL: SERVER_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

const PublicRoute = ({ element }) => {
  const [authorized, setAuthorized] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        console.log('Checking authentication...');
        const response = await axiosInstance.get('/api/verify-token');
        console.log('Auth check response:', response.data);
        setAuthorized(true);
      } catch (error) {
        console.log('Auth check failed:', error.response?.data || error.message);
        setAuthorized(false);
        setError(error.response?.data?.message || 'Authentication failed');
      }
    };

    checkAuth();
  }, []);

  if (authorized === null) {
    return <div>Loading...</div>;
  }

  if (authorized) {
    return <Navigate to="/dashboard" replace />;
  }

  if (error) {
    console.log('Auth error:', error);
  }

  return element;
};

export default PublicRoute;
