import { motion } from "motion/react";
import useAppStore from "../../store/useAppStore";
import { useQuery } from "@tanstack/react-query";
import { doctorProfile, userProfile } from "../../util/profileApi";

const Dashboard = () => {
  const { user, token } = useAppStore();

  // 🚨 Determine query key & function based on role
  const queryKey =
    user?.role === "admin"
      ? ["user_profile", user.id]
      : ["doctor_profile", user.id];

  const queryFn =
    user?.role === "admin"
      ? () => userProfile(token)
      : () => doctorProfile(token);

  const { data, isLoading, isError } = useQuery({
    queryKey,
    queryFn,
    enabled: !!user?.id && !!token,
  });

  if (!user || isLoading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        Loading dashboard...
      </div>
    );
  }

  return (
    <motion.div
      layout
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.1 }}
      className="pt-4 pb-6"
    >
      <motion.h1
        layout
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mt-10 font-medium text-2xl"
      >
        {isError && (
          <span className="text-red-500">Please finish your profile.</span>
        )}

        {!isError && data?.profile && (
          <span className="text-gray-700">
            {user.role === "admin"
              ? `Welcome, ${data.profile.fname} ${data.profile.lname}`
              : `Welcome, Dr. ${data.profile.fname} ${data.profile.lname}`}
          </span>
        )}
      </motion.h1>
    </motion.div>
  );
};

export default Dashboard;
