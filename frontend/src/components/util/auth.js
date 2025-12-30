import axios from 'axios'
import useAppStore from '../store/useAppStore';

const base_url = useAppStore.getState().base_url;

export const login = async (formData) => {
  try {
    const res = await axios.post(`${base_url}login`, formData, {
      headers: { "Content-Type": "application/json" },
    });
    return res.data;
  } catch (error) {
    console.error("Login error:", error.response?.data || error.message);
    throw error; 
  }
};

export const logout = async (token) => {
    try {
        const res = await axios.post(`${base_url}logout`, {}, {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json'
            }
        })
    } catch (error) {
         console.error("Login error:", error.response?.data || error.message);
         throw error; 
    }
}