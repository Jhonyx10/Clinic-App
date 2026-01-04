import { motion } from "motion/react";
import DoctorProfile from "../../ui-components/DoctorProfile";
import UserProfile from "../../ui-components/UserProfile";
import useAppStore from "../../store/useAppStore";

const Profile = () => {
    const { user } = useAppStore();

  return (
    <motion.div
      className="min-h-[calc(100vh-4rem)] flex items-start justify-center pt-20"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
    >
    {user.role !== 'admin' ? (
        <DoctorProfile/>
    ): (
       <UserProfile/>
    )}
    </motion.div>
  );
};


export default Profile;
