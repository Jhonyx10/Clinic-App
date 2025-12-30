import { motion } from "motion/react"; 

const Dashboard = () => {
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
        className=" mt-10 font-medium text-2xl"
      >
        Dashboard
      </motion.h1>
      {/* Add more content here */}
    </motion.div>
  );
};

export default Dashboard;
