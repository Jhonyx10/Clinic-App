import { motion, AnimatePresence } from "motion/react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { statusUpdate } from "../util/doctorsApi";
import useAppStore from "../store/useAppStore";

const LeaveDetails = ({ onClose, data }) => {
  const { token } = useAppStore();
  const qc = useQueryClient();
  const doctor = data?.user?.doctor_profile;
  const avatar = doctor?.photo
    ? doctor.photo
    : `https://via.placeholder.com/60?text=${doctor?.fname?.charAt(0) || "D"}`;

  const mutation = useMutation({
    mutationFn: ({ status }) => statusUpdate({ token, id: data.id, status }),
    onSuccess: () => {
      qc.invalidateQueries({queryKey:["leave-data"]}); 
      onClose(); 
    },
    onError: (err) => {
      console.error(err);
      alert("Failed to update status");
    },
  });

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 relative border-t-4 border-red-500"
          initial={{ opacity: 0, scale: 0.9, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 50 }}
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-6 border-b border-gray-200 pb-2">
            <h2 className="text-2xl font-bold text-red-600">
              Doctor's Leave Details
            </h2>
            <button
              onClick={onClose}
              className="text-red-500 font-bold text-xl hover:bg-red-100 rounded-full w-8 h-8 flex items-center justify-center"
            >
              ×
            </button>
          </div>

          {/* Doctor Info */}
          <div className="flex items-center gap-4 mb-4">
            <img
              src={avatar}
              alt={doctor?.fname}
              className="h-16 w-16 rounded-full object-cover border-2 border-red-400 shadow"
            />
            <div>
              <h3 className="text-gray-800 font-bold text-lg">
                Dr. {doctor?.fname} {doctor?.lname}
              </h3>
              <p className="text-gray-500 text-sm capitalize">
                {doctor?.specialization}
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200 my-4" />

          {/* Leave Details */}
          <div className="space-y-3 text-sm text-gray-700">
            <div className="flex justify-between">
              <span className="font-semibold">Start Date:</span>
              <span>{data.start_date}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">End Date:</span>
              <span>{data.end_date}</span>
            </div>
            <div>
              <span className="font-semibold">Reason:</span>
              <p className="mt-1 text-gray-900">{data.reason}</p>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold">Status:</span>
              <span
                className={`font-medium ${
                  data.status === "approved"
                    ? "text-green-600"
                    : data.status === "rejected"
                    ? "text-red-600"
                    : "text-blue-600"
                }`}
              >
                {data.status.charAt(0).toUpperCase() + data.status.slice(1)}
              </span>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 flex justify-end gap-2">
            <button
              onClick={() => mutation.mutate({ status: "approved" })}
              className="px-5 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 shadow hover:shadow-lg transition"
            >
              Approve
            </button>
            <button
              onClick={() => mutation.mutate({ status: "rejected" })}
              className="px-7 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 shadow hover:shadow-lg transition"
            >
              Reject
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LeaveDetails;
