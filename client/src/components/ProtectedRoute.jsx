import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SERVER_URL = process.env.REACT_APP_API_URL || "https://ques-ai-backend-ka8z.onrender.com";

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

        const response = await axios.get(`${SERVER_URL}/api/verify-token`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        console.log('✅ Token verification response:', response.status);
        if (response.status === 200) {
          setIsAuth(true);
        } else {
          throw new Error('Invalid token');
        }
      } catch (error) {
        console.error('❌ Authentication error:', error.response?.status || error.message);
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
