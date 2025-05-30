import axios from "axios";

const SERVER_URL = "https://skailama-mern-assignment.onrender.com";
const axiosInstance = axios.create({
  baseURL: SERVER_URL,
  withCredentials: true,
})
export const login = async (userData) => {
  try {
    const res = await axios.post(`${SERVER_URL}/api/login`, userData, {
      withCredentials: true,
    });
   
    return res;
  } catch (error) {
    throw error.response?.data || error;
  }
};
export const logout = async () => {
  try {
    await axios.post(`${SERVER_URL}/api/logout`, {}, { withCredentials: true });
    window.location.href = '/login'; 
  } catch (error) {
    console.error('Logout failed:', error);
  }
};
export const signup = async (userData) => {
  try {
    const response = await axios.post(`${SERVER_URL}/api/signup`, userData, {
      withCredentials: true,
    });
    console.log('Signup success:', response.data);
  } catch (error) {
    console.error('Signup error:', error.response?.data || error.message);
  }
};
export const createProject = async (title) => {
  try {
    const response = await axios.post(`${SERVER_URL}/api/auth/create`, {title}, {
      withCredentials: true,
    });
    console.log('Signup success:', response.data);
    return response;
  } catch (error) {
    console.error('Signup error:', error.response?.data || error.message);
  }
};
export const fetchUserProjects = async () => {
  try {
    const response = await axios.get(`${SERVER_URL}/api/auth/projectsList`, {
      withCredentials: true, // required to send cookie
    });
    console.log("Projects:", response.data);
    return response;
  } catch (error) {
    console.error("Failed to fetch projects:", error.response?.data || error.message);
  }
};
export const fetchFilesByProject = async (projectId) => {
  try {
    const response = await axios.post(`${SERVER_URL}/api/files/list`, { projectId },{withCredentials:true});
    return response.data; 
  } catch (error) {
    console.error('Failed to fetch files:', error);
    return [];
  }
};
export const DeleteFilesOfProject = async (_id) => {
  try {
    const response = await axios.post(`${SERVER_URL}/api/files/delete`, { _id },{withCredentials:true});
    console.log(response?.data);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch files:', error);
    return [];
  }
};
export const CreateFilesByProject = async (payload) => {
  try {
    const response = await axios.post(`${SERVER_URL}/api/files/create`, payload, {
      withCredentials: true,
    });
    console.log("response ",response?.data);
    return response.data;
  } catch (error) {
    console.error('Failed to create file:', error);
    return null;
  }
};

