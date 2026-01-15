import { motion } from "motion/react";
import useAppStore from "../store/useAppStore";
import { useQuery } from "@tanstack/react-query";
import { getPatients } from "../util/doctorsApi";
import LeaveDetails from "../modals/LeaveDetails";
import AppointmentRecord from "../modals/AppointmentRecord";
import { useState, useMemo } from "react";

const PatientsList = () => {
  const { token, user } = useAppStore();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("");
  const [doctorFilter, setDoctorFilter] = useState("");

  const { data: appointments = [], isLoading } = useQuery({
    queryKey: ["patients"],
    queryFn: () => getPatients(token),
  });

  const filteredAppointments = useMemo(() => {
    let data = appointments;
    if (user.role === "doctor") {
      data = data.filter((a) => a.doctor?.id === user.id);
    }
    if (statusFilter) {
      data = data.filter(
        (a) => a.status.toLowerCase() === statusFilter.toLowerCase()
      );
    }
    if (user.role === "admin" && doctorFilter) {
      data = data.filter((a) => {
        const doctor = a.doctor?.doctor_profile;
        const name = `${doctor?.fname ?? ""} ${doctor?.lname ?? ""}`;
        return name.toLowerCase().includes(doctorFilter.toLowerCase());
      });
    }
    return data;
  }, [appointments, statusFilter, doctorFilter, user.role, user.id]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40 text-gray-500">
        Loading appointments...
      </div>
    );
  }

  return (
    <div className="mt-10">
      {/* Filter Bar */}
      <div className="flex items-center gap-4 mb-4 w-full">
        {user.role === "admin" && (
          <input
            type="text"
            placeholder="Search doctor..."
            value={doctorFilter}
            onChange={(e) => setDoctorFilter(e.target.value)}
            className="grow px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 transition"
          />
        )}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="ml-auto px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 transition text-gray-700 w-40"
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <motion.table className="min-w-full border border-gray-200 rounded-lg overflow-hidden shadow-sm">
          <motion.thead className="bg-red-500 text-white">
            <tr>
              {/* Column 1: Only for Admin */}
              {user.role === "admin" && (
                <th className="py-3 px-4 text-left text-sm font-medium">
                  Doctor
                </th>
              )}
              <th className="py-3 px-4 text-left text-sm font-medium">
                Patient
              </th>
              <th className="py-3 px-4 text-left text-sm font-medium">Date</th>
              <th className="py-3 px-4 text-left text-sm font-medium">
                Reason
              </th>
              <th className="py-3 px-4 text-left text-sm font-medium">
                Status
              </th>
              <th className="py-3 px-4 text-left text-sm font-medium">
                Record
              </th>
            </tr>
          </motion.thead>

          <motion.tbody>
            {filteredAppointments.map((appt) => {
              const doctor = appt.doctor?.doctor_profile;
              const patient = appt.patient?.patient_profile;

              const doctorAvatar =
                doctor?.photo || "https://via.placeholder.com/150?text=Doctor";
              const patientAvatar =
                patient?.photo ||
                "https://via.placeholder.com/150?text=Patient";

              return (
                <motion.tr
                  key={appt.id}
                  className="bg-white hover:bg-gray-50 transition border-b border-gray-100"
                >
                  {/* Doctor Cell: Only renders if admin */}
                  {user.role === "admin" && (
                    <td className="py-3 px-4 text-sm text-gray-700">
                      <div className="flex items-center gap-3">
                        {doctor?.photo ? (
                          <img
                            src={doctorAvatar}
                            alt="Doctor"
                            className="h-10 w-10 rounded-full object-cover border-2 border-red-400"
                          />
                        ) : (
                          <div className="w-8 h-8 bg-red-500 rounded-full text-white flex items-center justify-center font-semibold">
                            D
                          </div>
                        )}
                        <span>
                          {doctor?.fname} {doctor?.lname}
                        </span>
                      </div>
                    </td>
                  )}

                  {/* Patient Cell: Always visible */}
                  <td className="py-3 px-4 text-sm text-gray-700">
                    <div className="flex items-center gap-3">
                      {patient?.photo ? (
                        <img
                          src={patientAvatar}
                          alt="Patient"
                          className="h-10 w-10 rounded-full object-cover border-2 border-blue-400"
                        />
                      ) : (
                        <div className="w-8 h-8 bg-red-500 rounded-full text-white flex items-center justify-center font-semibold">
                          P
                        </div>
                      )}
                      <span>{appt.patient?.name || "Unknown Patient"}</span>
                    </div>
                  </td>

                  <td className="py-3 px-4 text-sm text-gray-700">
                    <div className="flex flex-col">
                      <span className="font-medium">
                        {new Date(appt.appointment_date).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          }
                        )}
                      </span>
                      <span className="text-xs text-gray-500 font-semibold uppercase">
                        {new Date(
                          `1970-01-01T${appt.appointment_time}`
                        ).toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })}
                      </span>
                    </div>
                  </td>

                  <td className="py-3 px-4 text-sm text-gray-700">
                    {appt.reason}
                  </td>

                  <td
                    className={`py-3 px-4 text-sm font-medium capitalize ${
                      appt.status === "completed"
                        ? "text-green-600"
                        : appt.status === "rejected"
                        ? "text-red-600"
                        : "text-blue-600"
                    }`}
                  >
                    {appt.status}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-700">
                    <button
                      disabled={appt.status === "cancelled"}
                      onClick={() => {
                        if (appt.status === "completed") {
                          setIsModalOpen(true);
                          setSelectedId(appt.id);
                        } else {
                          alert("Appointment is not completed yet.");
                        }
                      }}
                      className="bg-red-500 px-3 py-1 rounded-md hover:cursor-pointer hover:bg-red-700"
                    >
                      <p className="text-sm text-white/90">
                        {appt.status === "completed"
                          ? "Details"
                          : appt.status === "cancelled"
                          ? "Cancelled"
                          : "View"}
                      </p>
                    </button>
                  </td>
                </motion.tr>
              );
            })}
          </motion.tbody>
        </motion.table>
      </div>

      {isModalOpen && (
        <AppointmentRecord
          onClose={() => setIsModalOpen(false)}
          id={selectedId}
        />
      )}
    </div>
  );
};

export default PatientsList;
