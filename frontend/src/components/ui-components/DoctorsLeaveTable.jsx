import useAppStore from "../store/useAppStore";
import { motion } from "motion/react";
import { useQuery } from "@tanstack/react-query";
import { leaveList } from "../util/doctorsApi";
import LeaveDetails from "../modals/LeaveDetails";
import { useState, useMemo } from "react";

const DoctorsLeaveTable = () => {
  const { token, user } = useAppStore();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedLeave, setSelectedLeave] = useState(null);

  // Filters
  const [statusFilter, setStatusFilter] = useState("");
  const [doctorFilter, setDoctorFilter] = useState("");

  const { data: leave = [], isLoading } = useQuery({
    queryKey: ["leave-data"],
    queryFn: () => leaveList(token),
  });

  // Apply filters
  const filteredLeave = useMemo(() => {
    return leave.filter((l) => {
      const doctor = l?.user?.doctor_profile;
      const matchesStatus =
        !statusFilter || l.status.toLowerCase() === statusFilter.toLowerCase();
      const matchesDoctor =
        !doctorFilter ||
        `${doctor?.fname} ${doctor?.lname}`
          .toLowerCase()
          .includes(doctorFilter.toLowerCase());
      return matchesStatus && matchesDoctor;
    });
  }, [leave, statusFilter, doctorFilter]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40 text-gray-500">
        Loading leaves...
      </div>
    );
  }
  
  return (
    <div className="mt-6">
      {/* Filter Bar */}
      <div className="flex items-center gap-4 mb-4 w-full">
        {/* Doctor Name Search - takes most of the space */}
        <input
          type="text"
          placeholder="Search doctor..."
          value={doctorFilter}
          onChange={(e) => setDoctorFilter(e.target.value)}
          className="grow px-4 py-2 border border-gray-300 rounded-lg shadow-sm
               focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500
               transition placeholder-gray-400"
        />

        {/* Status Dropdown - aligned to the right */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="ml-auto px-4 py-2 border border-gray-300 rounded-lg shadow-sm
               focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500
               transition text-gray-700 w-40"
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <motion.table className="min-w-full border border-gray-200 rounded-lg overflow-hidden shadow-sm">
          <motion.thead className="bg-red-500 text-white">
            <tr>
              <th className="py-3 px-4 text-left text-sm font-medium">
                Doctor
              </th>
              <th className="py-3 px-4 text-left text-sm font-medium">
                Start Date
              </th>
              <th className="py-3 px-4 text-left text-sm font-medium">
                End Date
              </th>
              <th className="py-3 px-4 text-left text-sm font-medium">
                Reason
              </th>
              <th className="py-3 px-4 text-left text-sm font-medium">
                Status
              </th>
              {user.role === "admin" && (
                <th className="py-3 px-4 text-left text-sm font-medium">
                  Action
                </th>
              )}
            </tr>
          </motion.thead>

          <motion.tbody>
            {filteredLeave.map((leaveItem) => {
              const doctor = leaveItem?.user?.doctor_profile;
              const avatar = doctor?.photo
                ? doctor.photo
                : `https://via.placeholder.com/40?text=${
                    doctor?.fname?.charAt(0) || "D"
                  }`;

              return (
                <motion.tr
                  key={leaveItem.id}
                  className="bg-white hover:bg-gray-50 transition cursor-pointer"
                >
                  <td className="py-3 px-4 text-sm text-gray-700 flex items-center gap-3">
                    <img
                      src={avatar}
                      alt={doctor?.fname}
                      className="h-10 w-10 rounded-full object-cover border-2 border-red-400"
                    />
                    <span>
                      {doctor?.fname} {doctor?.lname}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-700">
                    {leaveItem.start_date}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-700">
                    {leaveItem.end_date}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-700">
                    {leaveItem.reason}
                  </td>
                  <td
                    className={`py-3 px-4 text-sm font-medium ${
                      leaveItem.status === "approved"
                        ? "text-green-600"
                        : leaveItem.status === "rejected"
                        ? "text-red-600"
                        : "text-blue-600"
                    }`}
                  >
                    {leaveItem.status}
                  </td>
                  {user.role === "admin" && (
                    <td className="py-3 px-4 text-sm">
                      <button
                        onClick={() => {
                          if (leaveItem.status === "pending") {
                            setModalOpen(true);
                            setSelectedLeave(leaveItem);
                          }
                        }}
                        className={`px-3 py-1 rounded-lg text-white transition ${
                          leaveItem.status === "pending"
                            ? "bg-red-500 hover:bg-red-600 cursor-pointer"
                            : "bg-gray-500 cursor-not-allowed opacity-60"
                        }`}
                      >
                        {leaveItem.status === "pending" ? "View" : "Locked"}
                      </button>
                    </td>
                  )}
                </motion.tr>
              );
            })}
          </motion.tbody>
        </motion.table>
      </div>

      {modalOpen && selectedLeave && (
        <LeaveDetails
          onClose={() => setModalOpen(false)}
          data={selectedLeave}
        />
      )}
    </div>
  );
};

export default DoctorsLeaveTable;
