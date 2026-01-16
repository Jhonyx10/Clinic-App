import { motion, AnimatePresence } from "motion/react";
import useAppStore from "../store/useAppStore";

const AppointmentModal = ({ onClose, event, openForm }) => {
  const { user } = useAppStore();
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative border-t-4 border-red-500"
          initial={{ opacity: 0, scale: 0.9, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 50 }}
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-6 border-b pb-2 border-gray-200">
            <h2 className="text-2xl font-bold text-red-600">
              Appointment Details
            </h2>
            <button
              onClick={onClose}
              className="text-red-500 font-bold text-xl hover:bg-red-100 rounded-full w-8 h-8 flex items-center justify-center"
            >
              ×
            </button>
          </div>

          {/* Content */}
          <div className="space-y-3">
            {user.role !== "doctor" && (
              <div className="flex justify-between">
                <span className="font-semibold text-gray-700">Doctor:</span>
                <span className="text-gray-900">{event.doctor.name}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="font-semibold text-gray-700">Patient:</span>
              <span className="text-gray-900">{event.patient?.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-gray-700">Date:</span>
              <span className="text-gray-900">{event.appointment_date}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-gray-700">Time:</span>
              <span className="text-gray-900">
                {new Date(
                  `1970-01-01T${event.appointment_time}`
                ).toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-gray-700">Status:</span>
              <span className="text-gray-900">{event.status}</span>
            </div>
            <div>
              <span className="font-semibold text-gray-700">Reason:</span>
              <p className="text-gray-900 mt-1">{event.reason}</p>
            </div>
          </div>

          {/* Footer */}
          {user.role === "doctor" && (
            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={() => {
                  openForm(event);
                  onClose();
                }}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
              >
                Diagnose
              </button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AppointmentModal;
