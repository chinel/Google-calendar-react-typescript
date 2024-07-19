import { parse } from "date-fns";
import { Event } from "../context/Events";
import { formatDate } from "../utils/formatDate";
import { cc } from "../utils/joinClasses";

type CalendarEventProps = {
  event: Event;
};
export default function CalendarEvent({ event }: CalendarEventProps) {
  return (
    <button
      className={cc("event", event.color, event.allDay && "all-day-event")}
    >
      {event.allDay ? (
        <div className="event-name">{event.name}</div>
      ) : (
        <>
          <div className={cc("color-dot", event.color)}></div>
          <div className="event-time">
            {formatDate(parse(event.startTime, "HH:mm", event.date), {
              timeStyle: "short",
            })}
          </div>
          <div className="event-name">{event.name}</div>
        </>
      )}
    </button>
  );
}
