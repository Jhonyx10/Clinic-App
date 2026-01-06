import { motion } from "motion/react";
import DoctorProfile from "../../ui-components/DoctorProfile";
import UserProfile from "../../ui-components/UserProfile";
import useAppStore from "../../store/useAppStore";
import ProfileSettings from "../../forms/ProfileSettings";
import { useState } from "react";

const Profile = () => {
    const { user } = useAppStore();
    const [modalOpen, setModalOpen] = useState(false);

  return (
    <motion.div
      className="min-h-[calc(100vh-4rem)] flex items-start justify-center pt-20"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
    >
      {user.role !== "admin" ? (
        <DoctorProfile
          edit={() => setModalOpen(true)}
        />
      ) : (
        <UserProfile edit={() => setModalOpen(true)} />
      )}
      {modalOpen && <ProfileSettings onClose={()=> setModalOpen(false)} />}
    </motion.div>
  );
};


export default Profile;
