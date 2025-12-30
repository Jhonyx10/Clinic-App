import axios from "axios";
import useAppStore from "../store/useAppStore";

const base_url = useAppStore.getState().base_url;

export const create = async ({formData, token}) => {
    try {
        const res = await axios.post(`${base_url}user`, formData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return res.data.user;
    } catch (error) {
         console.error("Login error:", error.response?.data || error.message);
         throw error; 
    }
}

export const getDoctors = async (token) => {
    try {
        const res = await axios.get(`${base_url}user`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return res.data.doctors
    } catch (error) {
        console.error("Login error:", error.response?.data || error.message);
        throw error; 
    }
}