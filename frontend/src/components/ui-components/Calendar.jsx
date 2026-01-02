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
  const { token } = useAppStore();
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const { data } = useQuery({
    queryKey: ["appointments"],
    queryFn: () => appointments(token),
  });

  useEffect(() => {
    if (data) {
      const mappedEvents = data?.appointments?.map((item) => {
        const start = new Date(
          `${item.appointment_date}T${item.appointment_time}`
        );
        const end = addHours(start, 1); // assuming 1-hour appointments
        return {
          id: item.id,
          title: `${item.doctor.name} - ${item.reason}`,
          start,
          end,
          raw: item,
        };
      });
      setEvents(mappedEvents);
    }
  }, [data]);

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
