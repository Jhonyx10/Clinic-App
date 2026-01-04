import { motion, AnimatePresence } from "motion/react";
import useAppStore from "../store/useAppStore";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { fileLeave } from "../util/doctorsApi";
import { useState } from "react";

const LeaveModal = ({ onClose }) => {
  const qc = useQueryClient();
  const { user, token } = useAppStore();
  const [formData, setFormData] = useState({
    start_date: "",
    end_date: "",
    reason: ""
  });
  const doctorQuery = qc.getQueryData(["doctor_profile", user?.id]);
  const profile = doctorQuery?.profile;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const FileLeave = useMutation({
    mutationFn: () => fileLeave({token, formData}),
    onSuccess: () => {
      alert("success"),
      onClose()
    },
    onError: (error) => {
      alert(error)
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    FileLeave.mutate({token, formData})
  }

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 relative"
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 40 }}
          transition={{ duration: 0.25 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">
              File Doctor Leave
            </h2>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-red-50 text-red-500 font-bold hover:bg-red-100 flex items-center justify-center"
            >
              ✕
            </button>
          </div>

          {/* Form */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Doctor Name (readonly) */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Doctor
              </label>
              <input
                type="text"
                value={
                  profile
                    ? `Dr. ${profile.fname} ${profile.mname ?? ""} ${
                        profile.lname
                      }`
                    : ""
                }
                disabled
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm bg-gray-100 text-gray-700"
              />
            </div>

            {/* Dates */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  name="start_date"
                  value={formData.start_date}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-red-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  End Date
                </label>
                <input
                  type="date"
                  name="end_date"
                  value={formData.end_date}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-red-400 focus:outline-none"
                />
              </div>
            </div>

            {/* Reason */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Reason
              </label>
              <textarea
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                rows={3}
                placeholder="Enter reason for leave..."
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm resize-none focus:ring-2 focus:ring-red-400 focus:outline-none"
              />
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-2 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
              >
                {FileLeave.isPending ? "Loading..." : "Submit"}
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LeaveModal;
