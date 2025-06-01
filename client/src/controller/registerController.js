import axios from "axios";

const SERVER_URL = process.env.REACT_APP_API_URL || "https://ques-ai-backend-ka8z.onrender.com";

const axiosInstance = axios.create({
  baseURL: SERVER_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Request interceptor for adding auth token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('accessToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const login = async (userData) => {
  try {
    console.log('🔑 Attempting login...');
    const res = await axiosInstance.post('/api/auth/login', userData);
    console.log('📦 Login response:', res.data);
    
    const token = res.data.token;
    if (!token) {
      console.error('❌ No token received in response');
      throw new Error('No token received');
    }

    localStorage.setItem('accessToken', token);
    console.log('✅ Token stored successfully');
    
    return res;
  } catch (error) {
    console.error('❌ Login error:', error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

export const logout = () => {
  localStorage.removeItem('accessToken');
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
  return !!localStorage.getItem('accessToken');
};
