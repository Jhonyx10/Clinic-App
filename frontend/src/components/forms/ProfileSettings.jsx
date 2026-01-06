import { motion, AnimatePresence } from "motion/react";
import useAppStore from "../store/useAppStore";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AdminProfile, DoctorProfile } from "../util/profileApi";

const ProfileSettings = ({ onClose }) => {
  const { token, user } = useAppStore();
  const isDoctor = user?.role === "doctor";

  const [formData, setFormData] = useState({
    fname: "",
    mname: "",
    lname: "",
    age: "",
    gender: "",
    address: "",
    contact_number: "",
    specialization: "",
    consultation_fee: "",
    photo: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, photo: file }));
  };

  // Dynamic mutation based on role
  const ProfileMutation = useMutation({
    mutationFn: () =>
      isDoctor
        ? DoctorProfile({ token, formData })
        : AdminProfile({ token, formData }),
    onSuccess: () => {
      alert("Profile updated successfully!");
      onClose();
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    ProfileMutation.mutate();
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div className="bg-white mt-10 rounded-lg shadow-lg w-full max-w-md p-6 relative max-h-[85vh] overflow-y-auto">
          <h2 className="text-2xl font-bold text-center text-red-600 mb-6">
            Edit Profile
          </h2>
          <motion.form onSubmit={handleSubmit} className="space-y-4">
            {/* Profile Photo */}
            <div className="flex flex-col items-center gap-3">
              <div className="h-24 w-24 rounded-full border-2 border-red-400 overflow-hidden">
                <img
                  src={
                    formData.photo
                      ? URL.createObjectURL(formData.photo)
                      : user?.photo || "https://via.placeholder.com/96"
                  }
                  alt="Profile"
                  className="h-full w-full object-cover"
                />
              </div>
              <label className="cursor-pointer text-sm text-red-600 hover:underline">
                Change Photo
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="hidden"
                />
              </label>
            </div>

            {/* Name & Age */}
            <div className="flex gap-2">
              <input
                type="text"
                name="fname"
                value={formData.fname}
                onChange={handleChange}
                placeholder="First Name"
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-red-500"
              />
              <input
                type="text"
                name="mname"
                value={formData.mname}
                onChange={handleChange}
                placeholder="Middle Name"
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                name="lname"
                value={formData.lname}
                onChange={handleChange}
                placeholder="Last Name"
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-red-500"
              />
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="Age"
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-red-500"
              />
            </div>

            {/* Gender */}
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-red-500"
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>

            {/* Role-based fields */}
            {isDoctor ? (
              <>
                <input
                  type="text"
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleChange}
                  placeholder="Specialization"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-red-500"
                />
                <input
                  type="number"
                  name="consultation_fee"
                  value={formData.consultation_fee}
                  onChange={handleChange}
                  placeholder="Consultation Fee"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-red-500"
                />
              </>
            ) : (
              <>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Address"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-red-500"
                />
                <input
                  type="text"
                  name="contact_number"
                  value={formData.contact_number}
                  onChange={handleChange}
                  placeholder="Contact Number"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-red-500"
                />
              </>
            )}

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700"
              >
                {ProfileMutation.isPending ? "Saving..." : "Save"}
              </button>
            </div>
          </motion.form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};


export default ProfileSettings;
