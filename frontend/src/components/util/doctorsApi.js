import axios from "axios";
import useAppStore from "../store/useAppStore";

const base_url = useAppStore.getState().base_url;


export const fileLeave = async ({token, formData}) => {
    try {
        const res = await axios.post(`${base_url}doctors/leave`,
        formData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return res.data;
    } catch (error) {
        console.log(error)
    }
}

export const leaveList = async (token) => {
    try {
        const res = await axios.get(`${base_url}doctors/leave`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return res.data.leave;
    } catch (error) {
        console.log(error)
    }
}

export const statusUpdate = async ({token, status, id}) => {
    try {
         const res = await axios.put(`${base_url}doctors/leave/${id}`,
         { status},
            {
           headers: {
             Authorization: `Bearer ${token}`,
           },
         });
         return res.data;
    } catch (error) {
        console.log(error);
    }
}