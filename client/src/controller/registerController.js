import axios from "axios";

const SERVER_URL = "http://localhost:5000";
export const signup = async (userData) => {
  try {
    console.log("trying");
    const res = await axios.post(`${SERVER_URL}/signup/create`, userData, {
      withCredentials: true,
    });

    return res.data;
  } catch (error) {
    console.log(error,error?.message);
  }
};

export const login = async (userData) => {
  try {
    const res = await axios.post(`${SERVER_URL}/login`, userData, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};


export const logout = async () => {
  try {
    const res = await axios.post(`${SERVER_URL}/auth/logout`, {}, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
