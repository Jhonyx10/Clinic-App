import { motion } from "framer-motion";
import Calendar from "../../ui-components/Calendar";
const Appointments = () => {
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
        <Calendar/>
      </motion.div>
    </motion.div>
  );
};

export default Appointments;
