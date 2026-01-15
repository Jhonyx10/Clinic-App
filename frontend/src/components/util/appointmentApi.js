import axios from "axios";
import useAppStore from "../store/useAppStore";

const base_url = useAppStore.getState().base_url;

export const appointments = async (token) => {
    try {
        const res = await axios.get(`${base_url}appointment`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return res.data;
    } catch (error) {
        console.log(error)
    }
}

export const appointmentDetails = async ({token, id}) => {
    try {
        const res = await axios.get(`${base_url}appointment/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return res.data.record;
    } catch (error) {
        console.log(error)
    }
}