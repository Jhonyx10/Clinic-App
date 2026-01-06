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
    console.log(error)
  }
};

export const AdminProfile = async ({token, formData}) => {
  try {

    const data = new FormData();

    data.append("fname", formData.fname);
    data.append("mname", formData.mname);
    data.append("lname", formData.lname);
    data.append("age", formData.age);
    data.append("gender", formData.gender);
    data.append("address", formData.address);
    data.append("contact_number", formData.contact_number);
    if (formData.photo) {
      data.append("photo", formData.photo); 
    }

    const res = await axios.post(`${base_url}user/profile`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error)
  }
}

export const DoctorProfile = async ({ token, formData }) => {
  try {
    const data = new FormData();

    data.append("fname", formData.fname);
    data.append("mname", formData.mname);
    data.append("lname", formData.lname);
    data.append("age", formData.age);
    data.append("gender", formData.gender);
    data.append("specialization", formData.specialization);
    data.append("consultation_fee", formData.consultation_fee);
    if (formData.photo) {
      data.append("photo", formData.photo);
    }

    const res = await axios.post(`${base_url}doctor/profile`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};