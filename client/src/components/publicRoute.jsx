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

  useEffect(() => {
    axiosInstance
      .get('/api/verify-token')
      .then(() => setAuthorized(true))
      .catch(() => setAuthorized(false));
  }, []);

  if (authorized === null) return <div>Loading...</div>;
  if (authorized) return <Navigate to="/dashboard" replace />;

  return element;
};

export default PublicRoute;
