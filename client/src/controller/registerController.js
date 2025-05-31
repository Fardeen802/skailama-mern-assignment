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

// ✅ Optional: Auto redirect on 401
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
    if (error.response?.status === 401) {
      console.warn("⚠️ Unauthorized, redirecting to login...");
      window.location.href = "/login";
    }

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
    console.log('Attempting login for:', userData.email);
    const res = await axiosInstance.post('/api/auth/login', userData);
    console.log('Login response:', res.data);
    return res;
  } catch (error) {
    console.error('Login error:', error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

export const logout = async () => {
  try {
    await axiosInstance.post('/api/auth/logout', {}, { withCredentials: true }); // <-- This is key
    console.log('✅ Logged out');
    localStorage.clear();
    window.location.href = '/login';
  } catch (error) {
    console.error('❌ Logout failed:', error);
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
