import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const SERVER_URL = "https://ques-ai-backend-ka8z.onrender.com";

const PublicRoute = ({ element }) => {
  const [authorized, setAuthorized] = useState(null);

  useEffect(() => {
    const verifyAuth = async () => {
      const token = localStorage.getItem('accessToken');

      try {
        console.log('Checking public route auth status...');
        const response = await axios.get(`${SERVER_URL}/api/verify-token`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        });

        console.log('✅ Public route auth verified:', response.data);
        setAuthorized(true);
      } catch (error) {
        console.log('❌ Public route auth verification failed:', {
          status: error.response?.status,
          data: error.response?.data,
        });
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
