import { motion } from "motion/react";
import { useState } from "react";
import AccountForm from "../../forms/CreateAccount";
import { MagnifyingGlassIcon, PlusCircleIcon } from "@heroicons/react/24/outline";

const Doctors = () => {
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
        transition={{ duration: 0.4 }}
        className=" mt-10"
      >
        <div className="flex gap-2">
          <div className="relative w-full ">
            <input
              type="text"
              placeholder="Search doctors..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
            <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.8 }}
            className="bg-red-500 rounded flex items-center p-1 hover:cursor-pointer hover:bg-red-400 transition"
            onClick={() => setModalOpen(true)}
          >
            <PlusCircleIcon className="w-8 h-8 text-gray-100" />
            <span className="text-sm text-gray-100 font-bold">Account</span>
          </motion.button>
        </div>
      </motion.div>
      {modalOpen && (
        <AccountForm onClose={() => setModalOpen(false)}/>
      )}
    </motion.div>
  );
};

export default Doctors;
