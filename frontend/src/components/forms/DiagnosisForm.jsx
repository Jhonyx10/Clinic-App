import { motion, AnimatePresence } from "motion/react";
import useAppStore from "../store/useAppStore";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { doctorsDiagnosis } from "../util/doctorsApi";

const DiagnosisForm = ({ onClose, data }) => {
  const { token } = useAppStore();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    appointment_id: data.id,
    chief_complaint: "",
    findings: "",
    notes: "",
    type: "",
    content: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const mutation = useMutation({
    mutationFn: () => doctorsDiagnosis({ token, formData }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
      onClose();
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate();
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          initial={{ scale: 0.95, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95, y: 20 }}
          className="bg-white w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="flex justify-between items-center px-6 py-4 border-b">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                Diagnosis & Recommendation
              </h2>
              <p className="text-sm text-gray-500">Record medical findings</p>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-100"
            >
              ×
            </button>
          </div>

          {/* Content */}
          <form
            onSubmit={handleSubmit}
            className="p-6 space-y-6 max-h-[75vh] overflow-y-auto"
          >
            {/* Patient Info */}
            <div className="flex items-center gap-3 bg-red-50 border border-red-100 rounded-xl p-4">
              <div className="w-10 h-10 bg-red-500 text-white rounded-full flex items-center justify-center font-semibold">
                {data?.patient?.name?.charAt(0) || "P"}
              </div>
              <div>
                <p className="text-xs text-gray-500">Patient</p>
                <p className="font-medium text-gray-800">
                  {data?.patient?.name}
                </p>
              </div>
            </div>

            {/* Medical Record */}
            <div className="grid gap-4">
              <Field label="Chief Complaint">
                <Textarea
                  name="chief_complaint"
                  onChange={handleChange}
                  placeholder="Describe the primary concern..."
                />
              </Field>

              <Field label="Findings">
                <Textarea
                  name="findings"
                  onChange={handleChange}
                  placeholder="Clinical findings and observations..."
                />
              </Field>

              <Field label="Notes">
                <Textarea
                  name="notes"
                  onChange={handleChange}
                  placeholder="Additional notes..."
                />
              </Field>
            </div>

            {/* Recommendation */}
            <div className="border-t pt-5">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">
                Recommendation
              </h3>

              <div className="grid gap-4">
                <Field label="Type">
                  <select
                    name="type"
                    onChange={handleChange}
                    className="input"
                    required
                  >
                    <option value="">Select type</option>
                    <option value="medication">Medication</option>
                    <option value="advice">Advice</option>
                    <option value="follow_up">Follow Up</option>
                    <option value="lifestyle">Lifestyle</option>
                  </select>
                </Field>

                <Field label="Content">
                  <Textarea
                    name="content"
                    onChange={handleChange}
                    placeholder="Recommendation details..."
                  />
                </Field>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm rounded-lg border hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={mutation.isLoading}
                className="px-5 py-2 text-sm rounded-lg bg-red-500 text-white hover:bg-red-600 disabled:opacity-60"
              >
                {mutation.isLoading ? "Saving..." : "Save Diagnosis"}
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default DiagnosisForm;

/* 🔹 Reusable UI Components */
const Field = ({ label, children }) => (
  <div>
    <label className="block text-xs font-medium text-gray-600 mb-1">
      {label}
    </label>
    {children}
  </div>
);

const Textarea = (props) => (
  <textarea
    {...props}
    rows={3}
    required={props.name !== "notes"}
    className="w-full resize-none rounded-lg border border-gray-300 px-3 py-2 text-sm
               focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-red-400"
  />
);
