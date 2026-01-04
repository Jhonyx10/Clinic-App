import { useQuery } from "@tanstack/react-query";
import { appointments } from "../util/appointmentApi";
import { useState, useEffect } from "react";
import useAppStore from "../store/useAppStore";
import { Calendar as BigCalendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { format, parse, startOfWeek, getDay, addHours } from "date-fns";
import enUS from "date-fns/locale/en-US";
import AppointmentModal from "../modals/AppointmentModal";

const locales = { "en-US": enUS };
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const Calendar = () => {
  const { token, user } = useAppStore();
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const { data } = useQuery({
    queryKey: ["appointments"],
    queryFn: () => appointments(token),
  });

useEffect(() => {
  if (!data?.appointments) return;

  // 🔹 ROLE-BASED FILTER
  const filteredAppointments = data.appointments.filter((item) => {
    if (user.role === "admin") return true;

    if (user.role === "doctor") {
      return item.doctor_id === user.id;
    }
  });

  const mappedEvents = filteredAppointments.map((item) => {
    const start = new Date(`${item.appointment_date}T${item.appointment_time}`);
    const end = addHours(start, 1);

    return {
      id: item.id,
      title:
        user.role === "doctor"
          ? `Patient: ${item.patient?.name} - ${item.reason}`
          : `${item.doctor?.name ?? "Doctor"} - ${item.reason}`,
      start,
      end,
      raw: item,
    };
  });

  setEvents(mappedEvents);
}, [data, user]);

  const handleSelectEvent = (event) => {
    setSelectedEvent(event.raw); // store full appointment data
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
  };

  return (
    <>
      <BigCalendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500, borderRadius: "0.5rem", padding: "1rem" }}
        selectable
        onSelectEvent={handleSelectEvent} // only open modal if clicked on event
        eventPropGetter={() => ({
          style: {
            backgroundColor: "#f87171",
            color: "white",
            borderRadius: "0.25rem",
            padding: "2px 4px",
          },
        })}
      />
      {selectedEvent && (
        <AppointmentModal onClose={handleCloseModal} event={selectedEvent} />
      )}
    </>
  );
};

export default Calendar;
