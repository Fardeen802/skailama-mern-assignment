import axios from "axios";

const SERVER_URL = process.env.REACT_APP_API_URL || "https://ques-ai-backend-ka8z.onrender.com";

const axiosInstance = axios.create({
  baseURL: SERVER_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// ✅ Optional: Auto redirect on 401
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


export const login = async (userData) => {
  try {
    const res = await axiosInstance.post('/api/auth/login', userData);
    const token = res.data.token;
    if (token) {
      localStorage.setItem('accessToken', token);
      console.log('✅ Token stored in localStorage:', !!localStorage.getItem('accessToken'));
    }
    return res;
  } catch (error) {
    console.error('Login error:', error.response?.data || error.message);
    throw error.response?.data || error;
  }
};


export const logout = () => {
  console.log('🔑 Token before logout:', !!localStorage.getItem('accessToken'));
  localStorage.removeItem('accessToken');
  console.log('🔑 Token after logout:', !!localStorage.getItem('accessToken'));
  window.location.href = '/login';
};



export const signup = async (userData) => {
  try {
    const response = await axiosInstance.post('/api/signup', userData);
    console.log('Signup success:', response.data);
    return response;
  } catch (error) {
    console.error('Signup error:', error.response?.data || error.message);
    throw error;
  }
};

// ✅ FIXED: Corrected endpoint path
export const createProject = async (title) => {
  try {
    const response = await axiosInstance.post('/api/projects/create', { title });
    console.log('Project created:', response.data);
    return response;
  } catch (error) {
    console.error('Project creation error:', error.response?.data || error.message);
    throw error;
  }
};

// ✅ FIXED: Corrected endpoint path
export const fetchUserProjects = async () => {
  try {
    const response = await axiosInstance.get('/api/projects/projectsList');
    console.log("Projects:", response.data);
    return response;
  } catch (error) {
    console.error("Failed to fetch projects:", error.response?.data || error.message);
    throw error;
  }
};

export const fetchFilesByProject = async (projectId) => {
  try {
    const response = await axiosInstance.post('/api/files/list', { projectId });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch files:', error.response?.data || error.message);
    return [];
  }
};

export const DeleteFilesOfProject = async (_id) => {
  try {
    const response = await axiosInstance.post('/api/files/delete', { _id });
    console.log(response?.data);
    return response.data;
  } catch (error) {
    console.error('Failed to delete file:', error.response?.data || error.message);
    return [];
  }
};

export const CreateFilesByProject = async (payload) => {
  try {
    const response = await axiosInstance.post('/api/files/create', payload);
    console.log("File created:", response?.data);
    return response.data;
  } catch (error) {
    console.error('Failed to create file:', error.response?.data || error.message);
    return null;
  }
};


export const isAuthenticated = () => {
  const hasToken = !!localStorage.getItem('accessToken');
  console.log('🔒 Authentication check:', hasToken);
  return hasToken;
};
