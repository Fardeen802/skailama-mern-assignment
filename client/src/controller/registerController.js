import axios from "axios";

const SERVER_URL = "http://localhost:8000";
const axiosInstance = axios.create({
  baseURL: SERVER_URL,
  withCredentials: true, // ✅ this allows sending cookies
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
    await axios.post('http://localhost:8000/api/logout', {}, { withCredentials: true });
    window.location.href = '/login'; // or use navigate('/login') if using react-router
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


