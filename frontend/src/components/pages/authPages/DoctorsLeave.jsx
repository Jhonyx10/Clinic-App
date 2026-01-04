import { motion } from "motion/react";
import DoctorsLeaveTable from "../../ui-components/DoctorsLeaveTable";
import LeaveModal from "../../forms/LeaveModal";
import { useState } from "react";
import useAppStore from "../../store/useAppStore";

const DoctorsLeave = () => {
    const { user } = useAppStore();
    const [modalOpen, setModalOpen] = useState(false);
  return (
    <motion.div
      layout
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.1 }}
      className="pt-4 pb-6"
    >
      <motion.div
        layout
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.4 }}
        className="mt-10"
      >
        {user.role !== "admin" && (
          <div className="flex justify-end mb-3">
            <motion.button
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              onClick={() => setModalOpen(true)}
              className="bg-red-500 px-3 py-1 rounded hover:bg-red-400 cursor-pointer"
            >
              <p className="text-sm font-bold text-white/90">File Leave</p>
            </motion.button>
          </div>
        )}
        <DoctorsLeaveTable />
      </motion.div>
      {modalOpen && <LeaveModal onClose={() => setModalOpen(false)} />}
    </motion.div>
  );
};

export default DoctorsLeave;
