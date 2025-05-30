// components/PublicRoute.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ element }) => {
  const [authorized, setAuthorized] = useState(null);

  useEffect(() => {
    axios
      .get('https://skailama-mern-assignment.onrender.com/api/verify-token', { withCredentials: true })
      .then(() => setAuthorized(true))   // already logged in
      .catch(() => setAuthorized(false)); // not logged in
  }, []);

  if (authorized === null) return <div>Loading...</div>;
  if (authorized) return <Navigate to="/dashboard" replace />;

  return element;
};

export default PublicRoute;
