import { motion } from "framer-motion";
import { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {
  format,
  parse,
  startOfWeek,
  getDay,
  isBefore,
  startOfDay,
} from "date-fns";
import enUS from "date-fns/locale/en-US";

const locales = { "en-US": enUS };

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const Appointments = () => {
  const [events, setEvents] = useState([
    {
      title: "Dentist Appointment",
      start: new Date(2025, 11, 30, 10, 0),
      end: new Date(2025, 11, 30, 11, 0),
    },
    {
      title: "Meeting with Dr. Smith",
      start: new Date(2025, 11, 31, 14, 0),
      end: new Date(2025, 11, 31, 15, 0),
    },
  ]);

  const handleSelectSlot = (slotInfo) => {
    const today = startOfDay(new Date());
    const selectedDate = startOfDay(slotInfo.start);

    if (isBefore(selectedDate, today)) {
      alert("You cannot select past dates!");
      return;
    }

    const title = prompt("Enter appointment title:");
    if (title) {
      setEvents([
        ...events,
        { title, sample, start: slotInfo.start, end: slotInfo.end },
      ]);
    }
  };

  return (
    <motion.div
      layout
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.1 }}
      className="pt-4 pb-6"
    >
      <motion.div
        layout
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.4 }}
        className="mt-10"
      >
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500, borderRadius: "0.5rem", padding: "1rem" }}
          selectable
          onSelectSlot={handleSelectSlot}
          onSelectEvent={(event) => alert(event.title)}
          eventPropGetter={(event, sample, start, end, isSelected) => {
            return {
              style: {
                backgroundColor: "#f87171",
                color: "white",
                borderRadius: "0.25rem",
                padding: "2px 4px",
              },
            };
          }}
          dayPropGetter={(date) => {
            const today = new Date();
            if (
              date.getDate() === today.getDate() &&
              date.getMonth() === today.getMonth() &&
              date.getFullYear() === today.getFullYear()
            ) {
              return { style: { backgroundColor: "#fee2e2" } };
            }
            return {};
          }}
        />
      </motion.div>
    </motion.div>
  );
};

export default Appointments;
