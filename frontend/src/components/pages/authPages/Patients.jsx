import { motion } from "motion/react";
import PatientsList from "../../ui-components/PatientsTable";

const Patients = () => {
  return (
    <motion.div
      layout
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.1 }}
      className="pt-4 pb-6"
    >
      <PatientsList/>
    </motion.div>
  );
};

export default Patients;
