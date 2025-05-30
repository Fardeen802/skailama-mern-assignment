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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        console.log('🔍 Checking authentication...');
        console.log('Current cookies:', document.cookie);
        
        const response = await axiosInstance.get('/api/verify-token');
        console.log('✅ Auth check response:', response.data);
        setAuthorized(true);
      } catch (error) {
        console.log('❌ Auth check failed:', {
          status: error.response?.status,
          data: error.response?.data,
          message: error.message
        });
        setAuthorized(false);
        setError(error.response?.data?.message || 'Authentication failed');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return <div>Loading authentication status...</div>;
  }

  if (authorized) {
    console.log('✅ User is authorized, redirecting to dashboard');
    return <Navigate to="/dashboard" replace />;
  }

  if (error) {
    console.log('❌ Auth error:', error);
  }

  console.log('ℹ️ User is not authorized, showing public route');
  return element;
};

export default PublicRoute;
