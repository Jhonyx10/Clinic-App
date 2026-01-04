import axios from "axios";
import useAppStore from "../store/useAppStore";

const base_url = useAppStore.getState().base_url;

export const doctorProfile = async (token) => {
    try {
        const res = await axios.get(`${base_url}doctor/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return res.data ?? null;
    } catch (error) {
        console.log(error)
    }
}

export const userProfile = async (token) => {
  try {
    const res = await axios.get(`${base_url}user/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data ?? null;
  } catch (error) {
    console.log(error);
  }
};