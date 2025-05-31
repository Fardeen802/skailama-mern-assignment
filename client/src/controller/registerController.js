import axios from "axios";

const SERVER_URL = "https://ques-ai-backend-ka8z.onrender.com";

const axiosInstance = axios.create({
  baseURL: SERVER_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Add response interceptor for debugging
axiosInstance.interceptors.response.use(
  response => {
    console.log('✅ Response:', {
      status: response.status,
      headers: response.headers,
      cookies: document.cookie
    });
    return response;
  },
  error => {
    console.error('❌ Request failed:', {
      status: error.response?.status,
      data: error.response?.data,
      cookies: document.cookie
    });
    return Promise.reject(error);
  }
);

export const login = async (userData) => {
  try {
    console.log('Attempting login with:', { ...userData, password: '***' });
    const res = await axiosInstance.post('/api/auth/login', userData);
    console.log('Login response:', res.data);
    return res;
  } catch (error) {
    console.error('Login error details:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });
    throw error.response?.data || error;
  }
};

export const logout = async () => {
  try {
    await axiosInstance.post('/api/auth/logout');
    // Clear any local storage or state if needed
    localStorage.clear();
    // Use navigate instead of window.location for better routing
    window.location.href = '/login';
  } catch (error) {
    console.error('Logout failed:', error);
    // Even if the server request fails, redirect to login
    window.location.href = '/login';
  }
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

export const createProject = async (title) => {
  try {
    const response = await axiosInstance.post('/api/auth/create', { title });
    console.log('Project created:', response.data);
    return response;
  } catch (error) {
    console.error('Project creation error:', error.response?.data || error.message);
    throw error;
  }
};

export const fetchUserProjects = async () => {
  try {
    const response = await axiosInstance.get('/api/auth/projectsList');
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
    console.error('Failed to fetch files:', error);
    return [];
  }
};

export const DeleteFilesOfProject = async (_id) => {
  try {
    const response = await axiosInstance.post('/api/files/delete', { _id });
    console.log(response?.data);
    return response.data;
  } catch (error) {
    console.error('Failed to delete file:', error);
    return [];
  }
};

export const CreateFilesByProject = async (payload) => {
  try {
    const response = await axiosInstance.post('/api/files/create', payload);
    console.log("response ", response?.data);
    return response.data;
  } catch (error) {
    console.error('Failed to create file:', error);
    return null;
  }
};

