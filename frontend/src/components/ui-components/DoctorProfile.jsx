import { motion } from "motion/react";
import useAppStore from "../store/useAppStore";
import { useQuery } from "@tanstack/react-query";
import { doctorProfile } from "../util/profileApi";


const DoctorProfile = ({edit}) => {
     const { user, token } = useAppStore();

     const { data, isLoading, isError } = useQuery({
       queryKey: ["doctor_profile", user.id],
       queryFn: () => doctorProfile(token),
     });

     const profile = data?.profile;
     const placeholder = "https://via.placeholder.com/150?text=Doctor";

     if (isLoading) {
       return (
         <div className="flex justify-center items-center h-screen text-gray-500">
           Loading profile...
         </div>
       );
     }
    return (
      <motion.div
        layout
        className="w-full max-w-md rounded-2xl bg-white shadow-xl p-6"
      >
        {/* Avatar */}
        <div className="flex flex-col items-center">
          {!profile?.photo ? (
            <div className="w-28 h-28 rounded-full bg-red-400 flex items-center justify-center text-white text-4xl font-bold shadow">
              {user?.name?.charAt(0)}
            </div>
          ) : (
            <motion.img
              whileHover={{ scale: 1.05 }}
              src={profile?.photo || placeholder}
              alt="Doctor"
              className="w-28 h-28 rounded-full object-cover border-4 border-red-400 shadow"
              onError={(e) => {
                e.currentTarget.src = placeholder;
              }}
            />
          )}

          {isError ? (
            <h2 className="mt-4 text-xl font-semibold text-gray-800 capitalize">
              Setup your profile.
            </h2>
          ) : (
            <h2 className="mt-4 text-xl font-semibold text-gray-800 capitalize">
              {profile?.fname} {profile?.mname} {profile?.lname}
            </h2>
          )}

          <p className="text-sm text-gray-500 capitalize">
            {profile?.specialization}
          </p>
        </div>

        {/* Divider */}
        <div className="my-6 border-t" />

        {/* Info */}
        <div className="space-y-4 text-sm">
          <InfoRow label="Email" value={user?.email} />
          <InfoRow label="Gender" value={profile?.gender} />
          <InfoRow label="Age" value={profile?.age} />
          <InfoRow
            label="Consultation Fee"
            value={`₱${profile?.consultation_fee}`}
          />
          <InfoRow
            label="Availability"
            value={profile?.availability ? "Available" : "Not Available"}
            highlight
          />
        </div>

        {/* Actions */}
        <div className="mt-6">
          <button
            onClick={edit}
           className="w-full rounded-lg bg-red-500 text-white py-2 font-medium hover:bg-red-600 transition">
            Edit Profile
          </button>
        </div>
      </motion.div>
    );
}

const InfoRow = ({ label, value, highlight }) => (
  <div className="flex justify-between items-center">
    <span className="text-gray-500">{label}</span>
    <span
      className={`font-medium ${
        highlight
          ? value === "Available"
            ? "text-green-600"
            : "text-red-600"
          : "text-gray-800"
      }`}
    >
      {value}
    </span>
  </div>
);

export default DoctorProfile;