import { motion } from "motion/react";
import useAppStore from "../store/useAppStore";
import { useQuery } from "@tanstack/react-query";
import { getDoctors } from "../util/userApi";

const DoctorsCard = () => {
  const { token } = useAppStore();

  const { data, isPending } = useQuery({
    queryKey: ["doctors"],
    queryFn: () => getDoctors(token),
  });

  if (isPending) return <p className="text-center mt-6">Loading doctors...</p>;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {data?.map((doctor, index) => (
        <motion.div
          key={index}
          className="bg-white rounded-xl shadow-md p-4 flex items-center gap-4 hover:shadow-lg transition"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.4 }}
        >
          {/* Placeholder Image */}
          <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
            <span className="text-gray-400 text-sm">Img</span>
          </div>

          {/* Doctor Info */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              {doctor.name}
            </h3>
            <p className="text-gray-500 text-sm">{doctor.email}</p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default DoctorsCard;
