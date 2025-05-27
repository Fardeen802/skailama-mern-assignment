import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element }) => {
  const [authorized, setAuthorized] = useState(null); // ← FIXED

  useEffect(() => {
    axios.get('http://localhost:8000/api/verify-token', { withCredentials: true })
    .then(() => setAuthorized(true))
    .catch(() => setAuthorized(false));
  }, []);

  if (authorized === null) return <div>Loading...</div>; // Wait for check
  if (!authorized) return <Navigate to="/login" replace />;

  return element;
};

export default ProtectedRoute;
