import { motion, AnimatePresence } from "motion/react";
import { useQuery } from "@tanstack/react-query";
import { appointmentDetails } from "../util/appointmentApi";
import useAppStore from "../store/useAppStore";

const AppointmentRecord = ({ onClose, id }) => {
  const { token, user } = useAppStore();

  const { data, isLoading } = useQuery({
    queryKey: ["appointment_details", id],
    queryFn: () => appointmentDetails({ token, id }),
    enabled: !!id,
  });

    const appointment = data?.[0];
    const patient = appointment?.patient?.patient_profile;
    const doctor = appointment?.doctor?.doctor_profile;

    const doctorName = doctor
      ? `${doctor.lname}, ${doctor.fname}`
      : appointment?.doctor?.name || "Unknown Doctor";

    const patientName = patient
        ? `${patient.lname}, ${patient.fname}`
        : appointment?.patient?.name || "Unknown Doctor";

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white rounded-3xl mt-10 shadow-2xl w-full max-w-lg p-6 relative border border-gray-100 h-full overflow-y-auto"
          initial={{ opacity: 0, scale: 0.95, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 40 }}
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">
              Appointment Record
            </h2>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-red-50 text-red-600 font-bold text-lg hover:bg-red-100 transition"
            >
              ×
            </button>
          </div>

          {/* Loading */}
          {isLoading && (
            <div className="py-10 text-center text-gray-500">
              Fetching appointment details...
            </div>
          )}

          {/* Content */}
          {!isLoading && appointment && (
            <div className="space-y-5 text-sm text-gray-700">
              {user.role === "admin" && (
                <div className="bg-gray-50 rounded-xl p-4 border">
                  <h3 className="text-sm font-semibold text-gray-900 mb-2">
                    👤 Assigned Doctor
                  </h3>
                  <div className="flex items-center gap-2">
                    {doctor?.photo ? (
                      <img
                        src={doctor.photo}
                        alt="Patient"
                        className="h-10 w-10 rounded-full object-cover border-2 border-blue-400"
                      />
                    ) : (
                      <div className="w-8 h-8 bg-red-500 rounded-full text-white flex items-center justify-center font-semibold">
                        D
                      </div>
                    )}
                    <div className="flex justify-between w-full">
                      <div>
                        <p className="font-medium">{doctorName}</p>
                        <p className="text-gray-500">
                          {appointment.doctor?.email}
                        </p>
                      </div>
                      <div>
                        <p className="font-medium">
                          age:{" "}
                          <span className="text-gray-500">
                            {appointment.doctor?.doctor_profile?.age || "N/A"}
                          </span>
                        </p>
                        <p className="text-gray-500">
                          gender:{" "}
                          <span className="text-gray-500">
                            {appointment.doctor?.doctor_profile?.gender ||
                              "N/A"}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {/* Patient Card */}
              <div className="bg-gray-50 rounded-xl p-4 border">
                <h3 className="text-sm font-semibold text-gray-900 mb-2">
                  👤 Patient Information
                </h3>
                <div className="flex items-center gap-2">
                  {patient?.photo ? (
                    <img
                      src={patient.photo}
                      alt="Patient"
                      className="h-10 w-10 rounded-full object-cover border-2 border-blue-400"
                    />
                  ) : (
                    <div className="w-8 h-8 bg-red-500 rounded-full text-white flex items-center justify-center font-semibold">
                      P
                    </div>
                  )}
                  <div className="flex justify-between w-full">
                    <div>
                      <p className="font-medium">{patientName}</p>
                      <p className="text-gray-500">
                        {appointment.patient?.email}
                      </p>
                    </div>
                    <div>
                      <p className="font-medium">
                        age:{" "}
                        <span className="text-gray-500">
                          {appointment.patient?.patient_profile?.age || "N/A"}
                        </span>
                      </p>
                      <p className="text-gray-500">
                        gender:{" "}
                        <span className="text-gray-500">
                          {appointment.patient?.patient_profile?.gender ||
                            "N/A"}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Appointment Info */}
              <div className="grid grid-cols-2 gap-3">
                <Info label="Date" value={appointment.appointment_date} />
                <Info
                  label="Time"
                  value={new Date(
                    `1970-01-01T${appointment.appointment_time}`
                  ).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                />
                <Info label="Status">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium
                      ${
                        appointment.status === "completed"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                  >
                    {appointment.status}
                  </span>
                </Info>
                <Info label="Reason" value={appointment.reason} />
              </div>

              {/* Medical Record */}
              {appointment.record && (
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                  <h3 className="text-sm font-semibold text-blue-900 mb-2">
                    🩺 Medical Record
                  </h3>
                  <Field label="Chief Complaint">
                    {appointment.record.chief_complaint}
                  </Field>
                  <Field label="Findings">{appointment.record.findings}</Field>
                  <Field label="Notes">{appointment.record.notes}</Field>
                </div>
              )}

              {/* Recommendation */}
              {appointment.recommendation && (
                <div className="bg-green-50 border border-green-100 rounded-xl p-4">
                  <h3 className="text-sm font-semibold text-green-900 mb-2">
                    💡 Recommendation
                  </h3>
                  <p className="text-xs uppercase text-green-700 font-medium mb-1">
                    {appointment.recommendation.type}
                  </p>
                  <p>{appointment.recommendation.content}</p>
                </div>
              )}
            </div>
          )}

          {/* Empty */}
          {!isLoading && !appointment && (
            <p className="text-center text-gray-500 py-8">
              No appointment record found.
            </p>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

/* Reusable Components */
const Info = ({ label, value, children }) => (
  <div className="bg-white border rounded-xl p-3">
    <p className="text-xs text-gray-500 mb-1">{label}</p>
    <div className="font-medium text-gray-900">{children || value}</div>
  </div>
);

const Field = ({ label, children }) => (
  <div className="mb-2">
    <p className="text-xs text-gray-500">{label}</p>
    <p className="font-medium text-gray-900">{children}</p>
  </div>
);

export default AppointmentRecord;
